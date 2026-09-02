/* AAT Level 3 — Financial Accounting: Preparing Financial Statements.
 *
 * Teaching content and practice questions for FAPS, kept in its own file. TPFB
 * lives in aat3-learn-data.js and is already 380KB; a single file holding both
 * units would be most of a megabyte of course material behind one lazy load.
 *
 * WHAT IS WRITTEN, AND WHAT IS NOT
 *
 * FAPS is the largest unit in the qualification — 150 guided learning hours and
 * 40% of the grade, against TPFB's 60 and 15% — so it arrives outcome by
 * outcome rather than all at once, the way TPFB did. Whichever outcomes are
 * written, the path shows all nine, because a reader has to be able to tell a
 * part-built unit from a short specification. Nothing here is hidden and
 * nothing is implied.
 *
 * Every lesson declares the key concepts it covers in `criteria`, checked by
 * scripts/check-aat3-coverage.js against the FAPS spine in aat3-syllabus.js,
 * which is itself checked against the published specification by
 * scripts/check-aat3-syllabus-fidelity.js.
 *
 * NO TAX FIGURES. Unlike TPFB this unit carries no Finance Act: it is built on
 * IAS 2, IAS 16 and double entry, none of which is rolled annually. Money in
 * these lessons is illustrative — a machine costing £24,000 — and can be read
 * in five years without checking a rate table.
 *
 * Card vocabulary is the one the Level 3 player renders: h, p, split, table,
 * example, formula, callout, examtrap, flow, worked.
 */
(function (root) {
  'use strict';

  /* ══════════════════════════════════════════════════════════════════════════
     ORIENTATION — no syllabus coverage claimed
     ══════════════════════════════════════════════════════════════════════════ */

  /* Sits at the head of Outcome 1's track rather than in a section of its own.
     The path is driven by the syllabus, so a group whose outcome matches no
     outcome in the specification is not rendered at all — which is how a first
     draft of this file made the orientation lesson invisible. */
  var ORIENTATION_LESSONS = [
      {
        id: 'L3-FAPS-0A',
        title: 'Where this unit fits',
        icon: '🧭',
        criteria: [],
        cards: [
          {
            h: 'What this unit asks you to produce',
            p: [
              'Every other Level 3 unit asks you to understand something. This one asks you to **build** something: a statement of profit or loss and a statement of financial position, starting from a trial balance somebody hands you and ending with figures a bank manager could read.',
              'That difference runs through the whole unit. A question here rarely asks what depreciation is. It gives you a machine, a purchase date, a policy and a year end, and asks for the charge. Then it asks where the charge goes, what it does to profit, and what the asset is now worth on the face of the accounts.',
              'The chain has a fixed shape, and every outcome in this unit is one link in it. Transactions go into daybooks. Daybooks post to ledgers. Ledger balances make a trial balance. The trial balance is adjusted for the things that happened but were never a payment — depreciation, accruals, closing inventory, debts that will not be paid. The adjusted figures become the two statements. Ratios then say whether the result is any good.',
              'If a link is weak the whole chain gives way somewhere later, usually in a way that is hard to trace. A prepayment posted on the wrong side does not announce itself; it comes out as a profit figure that is wrong by twice the adjustment, three tasks further on.',
            ],
            callout: { kind: 'key', text: 'Nine outcomes, one chain: source documents → ledgers → trial balance → adjustments → financial statements → interpretation.' },
          },
          {
            h: 'How the unit is assessed',
            table: {
              headers: ['', ''],
              rows: [
                ['Assessment', 'Computer based, computer marked'],
                ['Length', '2 hours 30 minutes'],
                ['Pass mark', '70%'],
                ['Share of the qualification', '**40%** — the largest of the four units'],
                ['Guided learning hours', '150 — two and a half times Tax Processes'],
                ['Unit reference', 'R/618/3580'],
              ],
            },
            p: [
              'The weighting is the number to take seriously. This unit is worth more than Business Awareness and Tax Processes combined, and a Level 3 grade is a weighted average across all four. Forty per cent of the grade sits on the material below.',
              'The outcome weightings are published, and they are lopsided in a useful way. Producing the financial statements is 20%, extending the trial balance is 15%, and the whole of the opening theory — users, principles, qualitative characteristics — is 5%. The theory is worth knowing because it explains why the rest works, not because it carries marks.',
            ],
            examtrap: 'Computer marked means no partial credit for a good method. A depreciation charge worked out correctly and entered in the wrong column scores nothing, where a human marker would have given most of it.',
          },
          {
            h: 'What you are assumed to already know',
            split: {
              left: {
                title: 'Brought from Level 2',
                items: [
                  'Debits and credits, and which way round they go',
                  'The books of prime entry and what each records',
                  'Posting from a daybook to the general ledger',
                  'Receivables and payables control accounts',
                  'Bank reconciliation',
                  'VAT on a sales or purchase invoice',
                ],
              },
              right: {
                title: 'New at Level 3',
                items: [
                  'Accruals and prepayments, both ways round',
                  'Depreciation, by two methods',
                  'Disposals and part-exchange',
                  'Irrecoverable debts and allowances',
                  'Inventory at the lower of cost and net realisable value',
                  'The extended trial balance',
                  'Partnership accounts',
                  'Profitability ratios',
                  'Working back from incomplete records',
                ],
              },
            },
            p: [
              'The left-hand column is assumed rather than retaught. Outcome 2 revisits double entry, but it revisits it at speed and adds to it; it does not start from what a debit is.',
              'If the left-hand column feels shaky, the Level 2 units in this app — Introduction to Bookkeeping and Principles of Bookkeeping Controls — cover all six items, and an afternoon there will save a great deal of confusion later. Depreciation is hard enough without also being unsure which side of the ledger it lands on.',
            ],
          },
          {
            h: 'What this material is, and what it is not',
            p: [
              'This is an independent study tool. It is not produced by AAT, not endorsed by AAT, and not checked by anybody with a qualification to check it. The syllabus spine it is built on is encoded from the published specification and verified against it automatically, so the coverage claims are honest; the teaching itself is written from scratch and carries no such guarantee.',
              'Covering a syllabus point is not the same as being ready to sit the exam. The specification says what must be taught, not how well you must be able to do it under time pressure with a calculator and no notes. Treat full coverage as the floor.',
              'Where the specification excludes something, this material says so rather than teaching it anyway. Two exclusions apply to this unit: the VAT treatment of part-exchanges, and completing an extended trial balance for a partnership. Both come up in their own lessons.',
            ],
            callout: { kind: 'warn', text: 'Not affiliated with, endorsed by, or officially associated with AAT. Nothing here has been reviewed by a qualified accountant.' },
          },
        ],
        check: [
          {
            type: 'mcq',
            q: 'What share of the Level 3 qualification grade does this unit carry?',
            opts: ['40%, the largest of the four units', '15%, the same as Tax Processes', '25%, an equal quarter share', '20%, the second largest share'],
            ans: 0,
            exp: 'Financial Accounting carries 40%. Business Awareness and Tax Processes carry 15% each and Management Accounting Techniques 30%, so this unit outweighs the other two smaller units put together.',
          },
          {
            type: 'truefalse',
            q: 'Identify whether each statement about this unit is correct.',
            statements: [
              { text: 'The assessment is computer marked, so a correct method entered in the wrong place still scores nothing.', answer: true },
              { text: 'Producing the financial statements carries more marks than the opening theory on users and principles.', answer: true },
              { text: 'The unit is based on a Finance Act and is reissued every year.', answer: false },
              { text: 'Depreciation and accruals are assumed knowledge carried over from Level 2.', answer: false },
            ],
            exp: 'Computer marking gives no credit for method. Outcome 7 is 20% against Outcome 1\'s 5%. The Finance Act governs Tax Processes, not this unit, which rests on IAS 2, IAS 16 and double entry. Depreciation and accruals are new at Level 3 — Level 2 supplies debits, credits, daybooks and control accounts.',
          },
        ],
      },
  ];

  /* ══════════════════════════════════════════════════════════════════════════
     OUTCOME 1 — Understand the accounting principles underlying final accounts
     preparation. 5% of the assessment, and the smallest outcome in the unit.
     ══════════════════════════════════════════════════════════════════════════ */

  var LO1 = {
    unit: 'faps',
    level: 3,
    title: 'Financial Accounting: Preparing Financial Statements',
    outcome: 1,
    outcomeTitle: 'Understand the accounting principles underlying final accounts preparation',
    weighting: 5,
    lessons: ORIENTATION_LESSONS.concat([
      {
        id: 'L3-FAPS-1A',
        title: 'Who the accounts are for',
        icon: '👥',
        criteria: ['FAPS-1.1.1', 'FAPS-1.1.2'],
        cards: [
          {
            h: 'Three groups, named on purpose',
            p: [
              'Accounts have many readers. A supplier deciding whether to offer credit, a journalist writing about a takeover, an employee wondering whether the firm will still exist next year, a tax inspector — all of them read the same document, and all of them want different things from it.',
              'The framework accounting rests on does not try to serve them all equally. It names three groups as the **primary users** and writes the rules for them: existing and potential **investors**, **lenders**, and **other creditors**.',
              'They share one feature that the others do not. Each of the three is deciding whether to commit money to the business, or whether to leave money already committed where it is, and none of them can require the business to hand over the information they need. A tax inspector can demand records. A manager already has them. An investor considering a purchase has only what the business chooses to publish. The rules are written to protect that reader in particular.',
            ],
            callout: { kind: 'key', text: 'Primary users: existing and potential investors, lenders, and other creditors. All three are outsiders committing money, and none can demand more than they are given.' },
          },
          {
            h: 'What each of them is trying to decide',
            table: {
              headers: ['User', 'The decision', 'What they look at hardest'],
              rows: [
                ['Existing and potential investors', 'Buy, sell or hold a stake in the business', 'Profitability, and whether it is rising or falling'],
                ['Lenders', 'Grant a loan, extend one, or call it in', 'Whether the business can service the interest and repay the capital'],
                ['Other creditors', 'Supply on credit, and on what terms', 'Whether the business pays its short-term debts on time'],
              ],
            },
            p: [
              'The three decisions pull on different parts of the accounts. Both statements exist for that reason rather than one.',
              'An investor is asking a question about the future and reads the statement of profit or loss for a trend. A lender is asking about capacity and reads the statement of financial position for what could be sold and what is already owed. A supplier weighing up thirty days\' credit cares about neither the trend nor the long term, only whether there is enough in the bank and enough coming in from customers to cover the invoice.',
              'A fourth use cuts across all three: **stewardship**. Owners who are not managers use the accounts to judge how well the managers have looked after what was entrusted to them. That is a backward-looking question about the year just gone, and it is the one that most needs the figures to be honest rather than flattering.',
            ],
          },
          {
            h: 'Why the definition is narrow',
            p: [
              'Naming three groups looks exclusionary, and the framework is explicit that it is. Financial statements are not directed at employees, customers, government or the public, and are not designed to give any of them what they most want.',
              'The reason is practical. A set of accounts that tried to answer every reasonable question from every interested party would be enormous, late, and expensive to produce — and the questions genuinely conflict. An employee wants to know whether their site will close. A competitor would like the margin on each product line. Publishing either would harm the business without helping an investor decide anything.',
              'So the framework picks the readers whose needs overlap most, serves those, and accepts that others will use the accounts for purposes they were not built for. General purpose financial statements, in the framework\'s phrase, are general purpose only within that population.',
            ],
            examtrap: 'Management is not a primary user. Managers can obtain whatever internal information they need on demand, so the published accounts are not written for them — a question offering "management" among the primary users is offering a distractor.',
          },
        ],
        check: [
          {
            type: 'mcq',
            q: 'Which of these is **not** one of the primary users of a set of final accounts?',
            opts: ['The management of the business itself', 'A bank considering extending an overdraft', 'A supplier deciding whether to offer credit terms', 'A person thinking about buying a stake in the business'],
            ans: 0,
            exp: 'Management can obtain any internal information it wants on demand, so the published accounts are not written for it. The other three — lenders, other creditors, and existing and potential investors — are the three primary users, and each is an outsider committing money on the strength of what the business chooses to publish.',
          },
          {
            type: 'mcq',
            q: 'A supplier is deciding whether to allow a new customer thirty days to pay. Which question is the supplier really asking of the accounts?',
            opts: ['Can this business settle a short-term debt when it falls due?', 'Is this business more profitable than it was three years ago?', 'Will this business still be trading in ten years from now?', 'How much would this business be worth if it were sold today?'],
            ans: 0,
            exp: 'A creditor offering thirty days is exposed for thirty days. The long-term trend and the sale value belong to an investor\'s decision and the ten-year question to a long-term lender\'s; the supplier needs to know about cash and receivables over the next month.',
          },
          {
            type: 'gapfill',
            q: 'Complete the description of who final accounts are prepared for.',
            template: 'The primary users are existing and potential investors, {0} and other creditors. Financial statements are {1} written for management, because managers can {2} whatever information they need.',
            gaps: [
              { options: ['lenders', 'employees', 'regulators'], answer: 0 },
              { options: ['not', 'chiefly', 'also'], answer: 0 },
              { options: ['obtain internally', 'request from auditors', 'infer from ratios'], answer: 0 },
            ],
            exp: 'Investors, lenders and other creditors are the three named groups. Management is excluded precisely because it has internal access — the published accounts exist for readers who have no other route to the information.',
          },
        ],
      },

      {
        id: 'L3-FAPS-1B',
        title: 'The seven accounting principles',
        icon: '⚖️',
        criteria: ['FAPS-1.2.1'],
        cards: [
          {
            h: 'Why any of this is needed',
            p: [
              'Two bookkeepers given the same shoebox of invoices can produce different profit figures, both defensible, without either of them doing anything dishonest. One might record a sale when the order arrives, the other when the money does. One might write a £40 stapler off as an expense, the other add it to the fixtures and depreciate it over five years.',
              'Neither is lying. They are answering questions the transactions themselves do not answer: **when** does this belong, and **whose** is it, and **how much detail is worth the trouble**. The seven principles below are the settled answers to those questions, and their value is that they are settled. Accounts become comparable when everyone applies the same rules, not when everyone is careful.',
            ],
          },
          {
            h: 'The seven, and what each one rules out',
            table: {
              headers: ['Principle', 'What it says', 'What it stops you doing'],
              rows: [
                ['**Accruals**', 'Record a transaction in the period it happens, not the period the cash moves', 'Delaying an expense by delaying payment of the invoice'],
                ['**Going concern**', 'Assume the business will keep trading for the foreseeable future', 'Valuing a factory at what it would fetch in a forced sale'],
                ['**Business entity**', 'The business is separate from its owner', 'Putting the owner\'s holiday through as a business expense'],
                ['**Materiality**', 'Information matters if leaving it out could change a reader\'s decision', 'Spending an afternoon depreciating a £9 kettle'],
                ['**Consistency**', 'Treat the same item the same way from period to period', 'Switching depreciation method in a bad year to flatter the profit'],
                ['**Prudence**', 'Be cautious when uncertain: do not overstate what you own or earn', 'Booking a doubtful debt at full value because it might yet be paid'],
                ['**Money measurement**', 'Record only what can be measured reliably in money', 'Putting a value on the workforce\'s skill or the brand\'s reputation'],
              ],
            },
            p: [
              'The third column is the one to learn. A principle stated as a definition is easy to nod along to and hard to apply; a principle stated as a thing you are not allowed to do is testable against a scenario.',
            ],
          },
          {
            h: 'Accruals, which the rest of the unit runs on',
            p: [
              'The accruals principle earns its own card because five separate outcomes later in this unit are applications of it, and the specification says so each time.',
              'Depreciation exists because a machine bought for cash in one year is used up over eight, and the accruals principle puts the cost in the years that used it. An accrual for an unpaid electricity bill exists because the electricity was burned in this year whatever the bill\'s date. An allowance for doubtful receivables exists because the risk of non-payment arose from this year\'s sales. Closing inventory is held back out of cost of sales because the goods have not been sold yet.',
              'Every one of those adjustments is the same move: separate **when the cash moved** from **when the economic event happened**, and report the second. A student who understands that once does not have to memorise four rules.',
            ],
            callout: { kind: 'key', text: 'Depreciation, accruals and prepayments, allowances for doubtful receivables, and inventory are all the accruals principle applied to four different problems.' },
          },
          {
            h: 'Prudence and going concern, which get misread',
            split: {
              left: {
                title: 'Prudence is not pessimism',
                items: [
                  'It applies to **uncertainty**, not to every figure',
                  'It says: do not overstate assets or income, do not understate liabilities or expenses',
                  'It does not license deliberately understating profit — a hidden reserve is a misstatement in the other direction',
                  'Where a figure is known, prudence has nothing to say about it',
                ],
              },
              right: {
                title: 'Going concern is an assumption, not a promise',
                items: [
                  'It holds unless the business intends to cease trading, or has no realistic alternative',
                  'It is what allows a non-current asset to sit at cost less depreciation rather than at break-up value',
                  'If it fails, the whole basis of the accounts changes, not one figure',
                  'The foreseeable future is conventionally read as at least twelve months from the reporting date',
                ],
              },
            },
            p: [
              'Prudence and the accruals principle can appear to pull against each other, and questions are built on the tension. Accruals says recognise the revenue when the sale happens; prudence says do not recognise revenue that may never arrive. The resolution is that prudence governs the **measurement** of an uncertain amount, not whether the event is recorded at all: the sale goes in, and the doubt about collection is dealt with by an allowance.',
            ],
          },
        ],
        check: [
          {
            type: 'mcq',
            q: 'A business owner pays for a family holiday from the business bank account. Which principle does recording it as a business expense breach?',
            opts: ['Business entity', 'Money measurement', 'Consistency', 'Going concern'],
            ans: 0,
            exp: 'The business entity principle treats the business as separate from its owner. Money taken by the owner for personal use is drawings, which reduce capital, and never an expense of the business — so the profit figure is unaffected by it.',
          },
          {
            type: 'mcq',
            q: 'A company changes from straight-line to diminishing balance depreciation in a year when profits are unusually high, with no change in how the assets are used. Which principle is most directly breached?',
            opts: ['Consistency', 'Materiality', 'Money measurement', 'Business entity'],
            ans: 0,
            exp: 'Consistency requires the same treatment period to period so that the figures can be compared. A method change is permitted when the pattern of use genuinely changes, but changing it to alter the reported result — with the assets used exactly as before — removes the comparability the principle exists to protect.',
          },
          {
            type: 'truefalse',
            q: 'Identify whether each application of a principle is correct.',
            statements: [
              { text: 'Recording an electricity bill in the period the electricity was used, not the period it was paid, applies the accruals principle.', answer: true },
              { text: 'Prudence permits deliberately understating profit to build a cushion for a bad year.', answer: false },
              { text: 'The skill of a business\'s workforce is left out of the accounts under money measurement.', answer: true },
              { text: 'Going concern means the business has guaranteed it will continue trading.', answer: false },
              { text: 'Materiality allows a very small item to be expensed rather than capitalised and depreciated.', answer: true },
            ],
            exp: 'Accruals separates the event from the cash. Prudence guards against overstatement in conditions of uncertainty and equally forbids the hidden reserve that understating creates. Workforce skill cannot be measured reliably in money. Going concern is an assumption about the foreseeable future, not a guarantee. Materiality is what stops a £9 item being depreciated over five years.',
          },
          {
            type: 'mcq',
            q: 'A customer owing £3,000 has entered a payment plan and may not pay in full. Applying prudence, what happens to the original sale?',
            opts: ['It stays recorded, and the doubt is dealt with by an allowance', 'It is removed, because the revenue may never arrive at all', 'It is halved, to reflect the balance of probability fairly', 'It is deferred, until the payment plan has run its course'],
            ans: 0,
            exp: 'Prudence governs the measurement of an uncertain amount, not whether the event is recognised. The sale happened and stays in revenue under the accruals principle; the risk of non-collection is reflected separately by an allowance for doubtful receivables, which keeps both facts visible.',
          },
        ],
      },

      {
        id: 'L3-FAPS-1C',
        title: 'What makes financial information useful',
        icon: '🔍',
        criteria: ['FAPS-1.3.1', 'FAPS-1.3.2'],
        cards: [
          {
            h: 'Two that are essential, four that help',
            p: [
              'The principles in the previous lesson say how to record things. The qualitative characteristics say what the finished product has to be like before it is worth reading, and they come in two ranks.',
              'The **fundamental** characteristics are relevance and faithful representation. Information that lacks either is not useful at all, and no amount of the others rescues it. A perfectly accurate figure for something nobody is deciding about is useless; so is a highly relevant figure that is wrong.',
              'The **enhancing** characteristics — comparability, verifiability, timeliness and understandability — make useful information more useful. They cannot make useless information useful, and they are traded off against each other and against cost.',
            ],
            flow: ['Relevant?', 'Faithfully represented?', 'Useful', 'Then: comparable, verifiable, timely, understandable', 'More useful'],
          },
          {
            h: 'The two fundamental characteristics',
            split: {
              left: {
                title: 'Relevance',
                items: [
                  'Capable of making a difference to a decision',
                  'Has **predictive value** — helps a reader forecast',
                  'Or **confirmatory value** — confirms or corrects an earlier expectation',
                  'Often both: this year\'s revenue confirms last year\'s forecast and informs next year\'s',
                  '**Materiality** is relevance judged for one specific business, which is why it is entity-specific and has no fixed threshold',
                ],
              },
              right: {
                title: 'Faithful representation',
                items: [
                  '**Complete** — everything a reader needs to understand the item',
                  '**Neutral** — not slanted, weighted or presented to produce a reaction',
                  '**Free from error** — no errors in the description or the process, which is not the same as perfectly accurate',
                  'An estimate can faithfully represent, provided it is described as an estimate and arrived at properly',
                ],
              },
            },
            p: [
              'Free from error is the one most often misread. It does not mean every number is exact — most of the interesting numbers in a set of accounts are estimates, and depreciation is an estimate resting on two more. It means the process was sound and the result is not misdescribed.',
            ],
          },
          {
            h: 'The four enhancing characteristics',
            table: {
              headers: ['Characteristic', 'What it means', 'What it costs'],
              rows: [
                ['**Comparability**', 'Like can be compared with like, across periods and between businesses', 'Rules out changing a method whenever a different one would look better'],
                ['**Verifiability**', 'Independent observers could agree the figure is a faithful representation', 'Pushes towards evidence that can be checked, away from unsupported judgement'],
                ['**Timeliness**', 'Available while it can still influence a decision', 'Trades against accuracy: a perfect figure that arrives late has lost its value'],
                ['**Understandability**', 'Classified, characterised and presented clearly', 'Does not license leaving out complex items — the reader is assumed to have reasonable diligence'],
              ],
            },
            p: [
              'Timeliness and verifiability pull in opposite directions and the tension is real. Waiting for the final invoice makes an accrual verifiable; publishing before the year is stale makes it timely. Neither wins outright. The framework calls these characteristics enhancing rather than mandatory for exactly that reason.',
              'Understandability carries a warning in the framework itself. A transaction that is genuinely complicated may not be left out to make the accounts easier to read — that would sacrifice relevance and completeness for a characteristic ranked below both.',
            ],
            examtrap: 'Comparability is not uniformity. Two businesses in the same trade may legitimately depreciate at different rates if their assets are genuinely used differently. What comparability requires is that the difference is disclosed, so a reader can see it and allow for it.',
          },
        ],
        check: [
          {
            type: 'mcq',
            q: 'Which pair are the fundamental qualitative characteristics?',
            opts: ['Relevance and faithful representation', 'Comparability and verifiability', 'Timeliness and understandability', 'Materiality and completeness'],
            ans: 0,
            exp: 'Relevance and faithful representation are fundamental: information lacking either is not useful, whatever else is true of it. Comparability, verifiability, timeliness and understandability are the four enhancing characteristics. Materiality is an aspect of relevance and completeness an aspect of faithful representation, so the last pair are components rather than characteristics in their own right.',
          },
          {
            type: 'mcq',
            q: 'A set of accounts is published nine months after the year end. Which characteristic has been lost?',
            opts: ['Timeliness', 'Verifiability', 'Understandability', 'Neutrality'],
            ans: 0,
            exp: 'Timeliness means information reaches the reader while it can still influence a decision. Nine-month-old figures may be complete, checkable and clearly set out, and still be too late to act on — which is why timeliness is traded against accuracy rather than always losing to it.',
          },
          {
            type: 'truefalse',
            q: 'Identify whether each statement about the qualitative characteristics is correct.',
            statements: [
              { text: 'An estimate can be a faithful representation, provided it is described as one and properly arrived at.', answer: true },
              { text: 'A complex transaction may be omitted so that the accounts are easier to understand.', answer: false },
              { text: 'Materiality is an entity-specific aspect of relevance, with no universal threshold.', answer: true },
              { text: 'Verifiability requires that every figure can be independently confirmed to the penny.', answer: false },
            ],
            exp: 'Free from error refers to the process and the description, not to perfect accuracy, so estimates qualify. Omitting a complex item sacrifices relevance and completeness — both ranked above understandability. Materiality depends on the size and circumstances of the particular business. Verifiability asks that independent observers could reach consensus that a figure faithfully represents, which for an estimate means agreeing the method and inputs rather than the penny.',
          },
        ],
      },

      {
        id: 'L3-FAPS-1D',
        title: 'Misstatement, ethics and scepticism',
        icon: '🛡️',
        criteria: ['FAPS-1.3.3', 'FAPS-1.3.4'],
        cards: [
          {
            h: 'What material misstatement means',
            p: [
              'A misstatement is any difference between what the accounts say and what they should say. It becomes **material** when it could reasonably be expected to influence a decision one of the primary users makes on the strength of those accounts.',
              'That is a definition with no number in it, and deliberately so. A £5,000 error is trivial in a business turning over £40 million and fatal in one turning over £60,000. Materiality depends on size relative to the business, and on nature: an error that turns a profit into a loss, or that takes a covenant through its limit, is material at any size because of what it changes rather than how big it is.',
              'Misstatement covers both error and omission, and both intentional and unintentional. A figure left out entirely misstates the accounts as surely as a figure put in wrongly.',
            ],
            callout: { kind: 'key', text: 'Material means "could change a primary user\'s decision" — judged on size relative to the business and on the nature of what the error does, never on an absolute amount.' },
          },
          {
            h: 'Why preparing accounts is an ethical activity',
            p: [
              'The accounts a business publishes are prepared by people who work for it, or are paid by it. Those people have the information, the access and the discretion; the readers have none of the three. Every rule about ethics in this unit follows from that imbalance.',
              'The discretion is larger than it looks from outside. Almost every period-end adjustment involves a judgement that could reasonably go two ways — how long a machine will last, how much of a debt will be collected, whether inventory can still be sold at cost. Each judgement moves profit, and a run of them all taken at the optimistic end moves it a great deal, without any single decision being obviously wrong.',
            ],
            split: {
              left: {
                title: 'The five fundamental principles',
                items: [
                  '**Integrity** — straightforward and honest',
                  '**Objectivity** — no bias, conflict of interest or undue influence',
                  '**Professional competence and due care** — the skill the work requires, and the care to apply it',
                  '**Confidentiality** — information acquired at work is not used for personal advantage',
                  '**Professional behaviour** — comply with the law and avoid discrediting the profession',
                ],
              },
              right: {
                title: 'Where each one bites here',
                items: [
                  'Refusing to book a sale that has not happened',
                  'Setting a depreciation rate on how the asset is used, not on the profit wanted',
                  'Knowing that inventory is valued at the lower of cost and net realisable value, per item',
                  'Not passing a customer\'s payment history to a friend in the trade',
                  'Not signing off figures you believe to be wrong',
                ],
              },
            },
          },
          {
            h: 'Professional scepticism, in practice',
            p: [
              'Professional scepticism is a questioning mind: alertness to conditions that may indicate misstatement, and a critical assessment of evidence rather than acceptance of it.',
              'It is not suspicion, and it does not assume dishonesty. It assumes that plausible things are sometimes wrong, and that a figure which arrives with an explanation attached deserves the same look as one that does not.',
              'In this unit it usually means noticing when something does not fit: a receivables balance that has not moved in eight months, an accrual identical to last year\'s to the pound, an inventory line still held at cost when the same goods are on sale at half price, a machine with no depreciation in a year everything else was depreciated.',
            ],
            examtrap: 'Scepticism applies hardest to figures produced by software. "The system calculated it" is not evidence that the inputs were right — a depreciation routine will happily run on a wrong in-service date, and produce a clean, plausible, wrong figure every year until somebody looks.',
          },
          {
            h: 'When the pressure comes from your own side',
            p: [
              'The uncomfortable cases are not the ones where somebody asks for fraud. They are the ones where a manager who is not lying wants a judgement taken at the end of the range that suits them, and has a reason that sounds fine.',
              'The three pressures the specification names are time, the wish for a favourable result, and authority — and they usually arrive together, at the year end, from somebody senior, with a deadline. That combination is what makes a small concession feel reasonable.',
              'The defence is to keep the question technical. Not "is my manager entitled to ask me this", which is a question about the hierarchy, but "what does the evidence support" — a question with an answer that does not change according to who is asking. If the evidence supports a four-year life, it supports a four-year life whoever would prefer six.',
            ],
          },
        ],
        check: [
          {
            type: 'mcq',
            q: 'An error of £4,000 is found in the accounts of a business with revenue of £70,000 and a reported profit of £3,500. Is it material?',
            opts: ['Yes, because it is large relative to the business and turns the profit into a loss', 'No, because £4,000 is a small absolute amount in any set of accounts', 'Only if the error was made deliberately rather than by mistake', 'Only if the auditors decide to raise it as a point in their report'],
            ans: 0,
            exp: 'Materiality is judged on size relative to the business and on the nature of what the error does. £4,000 against £70,000 of revenue is large, and it takes a reported profit of £3,500 into a loss — a change of sign that would plainly affect a lender\'s or investor\'s decision. Intent does not enter into whether a misstatement is material, and it is material whether or not anyone raises it.',
          },
          {
            type: 'mcq',
            q: 'At the year end a senior manager asks you to extend the useful life of the delivery fleet from four years to six, so that the depreciation charge falls. The vehicles are being used exactly as before. What does objectivity require?',
            opts: ['Set the life on how the assets are used, whoever prefers a different figure', 'Accept the instruction, since the manager carries the authority for that policy', 'Split the difference at five years, which no reader could call unreasonable', 'Make the change, and note in the file that it was requested by a manager'],
            ans: 0,
            exp: 'Objectivity means no bias or undue influence. The useful life is an estimate of how long the assets will serve the business, and nothing about their use has changed — so the evidence still supports four years. Compromising at five, or complying and documenting it, both let the seniority of the request change a technical answer.',
          },
          {
            type: 'truefalse',
            q: 'Identify whether each statement about scepticism and misstatement is correct.',
            statements: [
              { text: 'A figure produced automatically by accounting software still needs its inputs checked.', answer: true },
              { text: 'A misstatement can arise from leaving something out as well as from putting something in wrongly.', answer: true },
              { text: 'Professional scepticism means assuming that colleagues are being dishonest.', answer: false },
              { text: 'An error is material only once it passes a fixed percentage of revenue set by the profession.', answer: false },
            ],
            exp: 'Software applies a rule to whatever it is given, so a wrong in-service date yields a clean and wrong charge indefinitely. Omission misstates as surely as error. Scepticism is a questioning mind rather than suspicion of dishonesty. No fixed threshold exists — materiality is judged by whether the item could change a primary user\'s decision, on size relative to the business and on nature.',
          },
        ],
      },
    ]),
    cheatsheet: {
      id: 'L3-FAPS-1S',
      title: 'The principles on one card',
      icon: '🗂️',
      card: {
        h: 'Outcome 1 at a glance',
        p: [
          'Five per cent of the assessment, and the reasoning the other 95% runs on. Everything here answers one question: who are the accounts for, and what does that oblige the preparer to do?',
        ],
        table: {
          headers: ['The seven principles', 'In one line'],
          rows: [
            ['Accruals', 'Report the period the event happened in, not the period the cash moved'],
            ['Going concern', 'Assume trading continues for the foreseeable future'],
            ['Business entity', 'The business is separate from its owner'],
            ['Materiality', 'It matters if leaving it out could change a reader\'s decision'],
            ['Consistency', 'Same item, same treatment, period to period'],
            ['Prudence', 'Caution under uncertainty — do not overstate what you own or earn'],
            ['Money measurement', 'Record only what money can measure reliably'],
          ],
        },
        split: {
          left: {
            title: 'Who the accounts are for',
            items: [
              'Existing and potential investors',
              'Lenders, and other creditors',
              'All three are outsiders committing money',
              'Management is excluded — it can ask for anything it wants',
            ],
          },
          right: {
            title: 'What makes the information useful',
            items: [
              'Fundamental: relevance, faithful representation',
              'Enhancing: comparability, verifiability, timeliness, understandability',
              'Enhancing characteristics improve useful information',
              'They cannot rescue information that is neither relevant nor faithful',
            ],
          },
        },
        callout: { kind: 'key', text: 'Material means it could change a primary user\'s decision — judged on size relative to this business and on what the error does, never on an absolute amount.' },
        examtrap: 'Prudence is caution under uncertainty, not pessimism: deliberately understating an asset is as much a misstatement as overstating it. And going concern is an assumption to be tested, not a promise.',
      },
    },
  };

  /* ══════════════════════════════════════════════════════════════════════════
     OUTCOME 2 — Understand the principles of advanced double-entry bookkeeping.
     10% of the assessment.

     This outcome carries more Level 2 in it than any other in the unit, and the
     specification says so by listing Introduction to Bookkeeping and Principles
     of Bookkeeping Controls among the units it links with. It is written on the
     assumption the reader has met debits, credits and daybooks, and spends its
     length on what Level 3 adds: the equation as a tool rather than a fact,
     control accounts as reconciliations rather than as ledger accounts, and the
     period end as a routine with an order to it.
     ══════════════════════════════════════════════════════════════════════════ */

  var LO2 = {
    unit: 'faps',
    level: 3,
    title: 'Financial Accounting: Preparing Financial Statements',
    outcome: 2,
    outcomeTitle: 'Understand the principles of advanced double-entry bookkeeping',
    weighting: 10,
    lessons: [
      {
        id: 'L3-FAPS-2A',
        title: 'The accounting equation',
        icon: '⚖️',
        criteria: ['FAPS-2.1.1', 'FAPS-2.1.2', 'FAPS-2.1.3'],
        cards: [
          {
            h: 'Why double entry works at all',
            formula: 'Assets = Liabilities + Capital · or · Capital = Assets − Liabilities',
            p: [
              'Everything a business controls was paid for by somebody. Either an outsider put the money in and is owed it back — a **liability** — or the owner put it in and has a claim on what is left, called **capital**. Add the two claims together and you have accounted for every asset the business holds.',
              'That is the accounting equation entire, and it is why double entry balances rather than a rule that it must. Every transaction changes two things, and it changes them in a way that keeps the two sides equal — because a transaction that genuinely left them unequal would be describing an asset nobody paid for.',
              'A trial balance that does not balance is that equation failing. Something has been recorded on one side and not the other, and the difference is the size of what is missing.',
            ],
            callout: { kind: 'key', text: 'Assets = Liabilities + Capital. Double entry keeps that true after every transaction, which is why the books balance rather than a rule that they must.' },
          },
          {
            h: 'Four transactions, and what each one moves',
            table: {
              headers: ['Transaction', 'Assets', 'Liabilities', 'Capital'],
              rows: [
                ['Owner pays £10,000 into the business bank account', '+10,000', 'no change', '+10,000'],
                ['Buy a £4,000 machine, paying by bank transfer', '+4,000 machine, −4,000 bank', 'no change', 'no change'],
                ['Buy £900 of goods on credit', '+900', '+900', 'no change'],
                ['Owner takes £600 for personal use', '−600', 'no change', '−600'],
              ],
            },
            p: [
              'The second row is the one to look at twice. Both changes are to assets, and they cancel: the business owns a machine it did not before and holds less cash by the same amount. Nothing on the right-hand side moved, because nobody\'s claim on the business changed.',
              'The fourth is the business entity principle at work. Drawings reduce the owner\'s claim rather than the business\'s profit, so they come off capital and never appear as an expense.',
            ],
          },
          {
            h: 'Finding the figure you were not given',
            worked: {
              title: 'Opening capital, and then what a year does to it',
              problem: 'A sole trader\'s business holds assets of £84,000 and owes £31,000. During the year the owner pays in a further £10,000, the business makes a profit of £22,000, and the owner withdraws £15,000. What is capital at the start of the year, and at the end?',
              steps: [
                { do: 'Rearrange the equation: Capital = Assets − Liabilities.', why: 'Capital is the residual — what would be left for the owner once everybody else had been paid. It is rarely given directly, and it is almost always the figure a question wants.' },
                { do: 'Opening capital: £84,000 − £31,000 = £53,000.', why: 'This is the owner\'s claim on the business at the start of the year, whether or not anybody ever wrote it down.' },
                { do: 'Add what the owner put in and what the business earned: £53,000 + £10,000 + £22,000 = £85,000.', why: 'Capital introduced increases the owner\'s claim directly. Profit does too — it belongs to the owner even when it stays in the business.' },
                { do: 'Take out the drawings: £85,000 − £15,000 = £70,000.', why: 'Drawings reduce the claim. They are not an expense, so they never touched the £22,000 profit figure and have to be dealt with here instead.' },
                { do: 'Check the shape of it: closing capital = opening capital + capital introduced + profit − drawings.', why: 'That chain is the whole of the capital account, and it is the one Outcome 7 asks you to write out in full. Recognising it here saves learning it twice.' },
              ],
              answer: 'Opening capital £53,000, closing capital £70,000.',
              tryIt: {
                q: 'A business holds assets of £96,500 and has liabilities of £38,200. What is the capital balance?',
                answer: 58300,
                unit: '£',
                hint: 'Capital is what is left once the liabilities are met.',
                exp: 'Capital = Assets − Liabilities, so £96,500 − £38,200 = £58,300. That is the owner\'s residual claim: what the books say would be left if every outside creditor were paid in full and every asset realised at its carrying amount.',
              },
            },
          },
        ],
        check: [
          {
            type: 'mcq',
            q: 'A business buys a £4,000 machine and pays for it immediately by bank transfer. What happens to the accounting equation?',
            opts: ['Assets rise and fall by £4,000, and nothing else moves', 'Assets rise by £4,000 and capital rises by the same', 'Assets rise by £4,000 and liabilities rise by the same', 'Capital falls by £4,000 and liabilities rise by the same'],
            ans: 0,
            exp: 'One asset replaces another: the business owns a machine it did not, and holds £4,000 less in the bank. Nobody\'s claim on the business changed, so neither side of the equation moved overall — which is why both entries land on the left-hand side.',
          },
          {
            type: 'numeric',
            q: 'A business has assets of £71,300 and liabilities of £24,800. What is its capital?',
            answer: 46500,
            unit: '£',
            exp: 'Capital is the residual claim: Assets − Liabilities, so £71,300 − £24,800 = £46,500. It is what the books say would be left for the owner once every outside creditor had been paid.',
          },
          {
            type: 'truefalse',
            q: 'Identify whether each statement about the accounting equation is correct.',
            statements: [
              { text: 'Drawings reduce capital rather than reducing profit.', answer: true },
              { text: 'Profit increases capital even when it is left in the business.', answer: true },
              { text: 'Buying goods on credit leaves total assets unchanged.', answer: false },
              { text: 'A trial balance that does not balance means the equation has been broken somewhere.', answer: true },
            ],
            exp: 'Drawings are the owner taking back part of their claim, so they come off capital and never touch the expenses. Profit belongs to the owner whether or not it is withdrawn. Buying on credit raises inventory and raises payables, so assets do move. And an out-of-balance trial balance is exactly the equation failing — something was entered once instead of twice.',
          },
        ],
      },

      {
        id: 'L3-FAPS-2B',
        title: 'Classifying every account',
        icon: '🗂️',
        criteria: ['FAPS-2.2.1'],
        cards: [
          {
            h: 'Five classes, and why the label decides everything',
            p: [
              'Every account in the general ledger belongs to exactly one of five classes. The class decides which side its balance normally sits on, which statement it ends up in, and — the reason this lesson exists — what happens to it at the period end.',
              'A misclassified account is not a small error. Call a liability an expense and profit falls by the whole amount and the statement of financial position no longer balances; call an expense an asset and you have capitalised something that should have gone to profit, the error Outcome 3 spends a card on.',
            ],
            table: {
              headers: ['Class', 'Normal balance', 'Ends up in', 'Examples'],
              rows: [
                ['**Assets** — non-current', 'Debit', 'Statement of financial position', 'Land and buildings, plant, vehicles (tangible); goodwill, patents, software licences (intangible)'],
                ['**Assets** — current', 'Debit', 'Statement of financial position', 'Inventory, receivables, prepayments, bank, cash'],
                ['**Liabilities** — non-current', 'Credit', 'Statement of financial position', 'A bank loan repayable after more than twelve months'],
                ['**Liabilities** — current', 'Credit', 'Statement of financial position', 'Payables, accruals, overdraft, VAT owed to HMRC'],
                ['**Equity (capital)**', 'Credit', 'Statement of financial position', 'Capital introduced, less drawings, plus profit for the year'],
                ['**Income**', 'Credit', 'Statement of profit or loss', 'Sales revenue, discounts received, rent received'],
                ['**Expenses**', 'Debit', 'Statement of profit or loss', 'Purchases, wages, rent, depreciation, discounts allowed'],
              ],
            },
          },
          {
            h: 'The line that moves, and the one that does not',
            split: {
              left: {
                title: 'Current or non-current',
                items: [
                  'Decided by **twelve months** from the reporting date',
                  'A loan with fourteen months to run is non-current',
                  'The same loan a year later is current',
                  'A loan repayable in instalments is split between the two',
                  'It is about the date, not about the size',
                ],
              },
              right: {
                title: 'Tangible or intangible',
                items: [
                  'Tangible: physical — buildings, machines, vehicles',
                  'Intangible: no physical substance — goodwill, patents, licences',
                  'Both are non-current assets and both are depreciated or amortised',
                  'The distinction is a disclosure one rather than a treatment one',
                  'Inventory is never a non-current asset, however slowly it sells',
                ],
              },
            },
            p: [
              'Two accounts sit awkwardly and should be named now, because Outcome 6 returns to them. **Bank** is an asset when in funds and a liability when overdrawn, and it can be either at a year end. **VAT** is a liability when output tax exceeds input tax and an asset when the business is owed a repayment.',
            ],
            examtrap: 'Drawings is not an expense. It is a reduction of capital, so it appears in the capital account rather than in the statement of profit or loss, and posting it as an expense understates profit by the whole amount.',
          },
        ],
        check: [
          {
            type: 'truefalse',
            q: 'Identify whether each account is classified correctly.',
            statements: [
              { text: 'A bank loan repayable in fourteen months is a non-current liability.', answer: true },
              { text: 'A patent held by the business is an intangible non-current asset.', answer: true },
              { text: 'Drawings are an expense of the business.', answer: false },
              { text: 'Inventory is a non-current asset where it has been held for over a year.', answer: false },
              { text: 'Discounts allowed are an expense.', answer: true },
            ],
            exp: 'Twelve months from the reporting date is the line, so fourteen months out is non-current. A patent has no physical substance and is intangible. Drawings reduce the owner\'s claim rather than the business\'s profit. Inventory is a current asset however slowly it moves, because it is held to be sold. And discounts allowed are given to customers, so they are a cost to the business.',
          },
          {
            type: 'mcq',
            q: 'A business is overdrawn at the year end. How does the bank account appear in the statement of financial position?',
            opts: ['As a current liability', 'As a current asset shown in brackets', 'As a non-current liability', 'As a reduction of capital'],
            ans: 0,
            exp: 'An overdraft is money owed to the bank and repayable on demand, so it is a current liability. Bank is one of the few accounts that can carry either a debit or a credit balance, and the class it falls into follows the balance rather than the account name.',
          },
          {
            type: 'gapfill',
            q: 'Complete the rule for classifying a liability.',
            template: 'A liability is {0} where it falls due more than {1} after the reporting date. The same loan becomes {2} as that date approaches.',
            gaps: [
              { options: ['non-current', 'current', 'contingent'], answer: 0 },
              { options: ['twelve months', 'six months', 'three years'], answer: 0 },
              { options: ['current', 'non-current', 'equity'], answer: 0 },
            ],
            exp: 'The split turns on twelve months from the reporting date, so a classification is a statement about timing rather than about the size or kind of the debt. A loan therefore migrates from non-current to current as it runs down, and one repayable in instalments is split across both.',
          },
        ],
      },

      {
        id: 'L3-FAPS-2C',
        title: 'The books of prime entry',
        icon: '📚',
        criteria: ['FAPS-2.3.1', 'FAPS-2.3.2'],
        cards: [
          {
            h: 'Why anything sits between the invoice and the ledger',
            p: [
              'A business issuing four hundred sales invoices a month could post each one straight to the ledger. That would be eight hundred entries, and the sales account would be an unreadable column of small numbers.',
              'The **books of prime entry** — the daybooks — are the list that sits in between. Documents are entered in a daybook as they arrive, the daybook is totalled at the end of the period, and the totals are posted to the ledger. Four hundred invoices become one posting.',
              'The daybook is not part of the double entry. It is a list, and it does the same job for transactions that the asset register does for assets: holds the detail so the ledger can hold the summary.',
            ],
            callout: { kind: 'key', text: 'Documents → daybook (a list) → totals posted to the general ledger (the double entry). The daybook holds the detail so the ledger can hold the summary.' },
          },
          {
            h: 'The eight, and what each one lists',
            table: {
              headers: ['Book of prime entry', 'What goes in it'],
              rows: [
                ['Sales daybook', 'Invoices issued to credit customers'],
                ['Sales returns daybook', 'Credit notes issued to credit customers'],
                ['Purchases daybook', 'Invoices received from credit suppliers'],
                ['Purchases returns daybook', 'Credit notes received from credit suppliers'],
                ['Discounts allowed daybook', 'Settlement discounts taken by customers'],
                ['Discounts received daybook', 'Settlement discounts taken from suppliers'],
                ['Cash book', 'Money in and out, through bank and cash'],
                ['Journal', 'Everything else, each entry with a narrative'],
              ],
            },
            p: [
              'The first six all record **credit** transactions — a promise now, money later. The cash book records the money actually moving. A single sale on credit therefore touches the sales daybook when the invoice goes out and the cash book when the customer pays.',
              'The **journal** is the one that matters most at Level 3, because every period-end adjustment in this unit arrives through it: depreciation, accruals, prepayments, irrecoverable debts, closing inventory, corrections of error. None of those has an invoice, and the journal is how a transaction with no document gets into the books.',
            ],
          },
          {
            h: 'What a daybook line carries, and why the narrative matters',
            example: {
              title: 'Two lines of a sales daybook',
              rows: [
                ['Date', 'Invoice', 'Customer', 'Net', 'VAT', 'Total'],
                ['14 Mar', '4471', 'Hollis Joinery', '£1,200', '£240', '£1,440'],
                ['16 Mar', '4472', 'Marden Interiors', '£640', '£128', '£768'],
              ],
            },
            p: [
              'Three money columns, and each one goes to a different account. The net column becomes sales, the VAT column becomes VAT, and the total becomes the amount the customer owes. The next lesson does that posting.',
              'The journal has a column the others do not: a **narrative**, saying what the entry is for. Every other book of prime entry is backed by a document that explains itself — an invoice says who and what and why. A journal entry has no document behind it, so without a narrative nobody reading the ledger in a year can tell what happened or check whether it was right. A journal without a narrative is an unexplained movement in the accounts, and that is what a person concealing something would also produce.',
            ],
            examtrap: 'Settlement discounts have their own daybooks and are easy to post backwards. **Discounts allowed** are given by the business to its customers, so they are an expense. **Discounts received** are given to the business by its suppliers, so they are income.',
          },
        ],
        check: [
          {
            type: 'mcq',
            q: 'A business records the depreciation charge for the year. Which book of prime entry does it go through?',
            opts: ['The journal', 'The cash book', 'The purchases daybook', 'The sales daybook'],
            ans: 0,
            exp: 'Depreciation has no invoice and no money moves, so none of the document-driven daybooks fits. The journal exists for exactly that: entries with no source document, each carrying a narrative saying what it is for. Every period-end adjustment in this unit arrives the same way.',
          },
          {
            type: 'truefalse',
            q: 'Identify whether each statement about the books of prime entry is correct.',
            statements: [
              { text: 'A daybook is a list rather than part of the double entry.', answer: true },
              { text: 'Discounts allowed are an expense of the business.', answer: true },
              { text: 'Credit notes received from suppliers go in the sales returns daybook.', answer: false },
              { text: 'A journal entry may be posted without a narrative where the amount is small.', answer: false },
            ],
            exp: 'Daybooks hold detail so the ledger can hold totals; the double entry happens when the totals are posted. Discounts allowed are given to customers and cost the business money. Credit notes from suppliers belong in the purchases returns daybook — sales returns is for credit notes issued. And the narrative is what makes a document-less entry checkable, so it is required whatever the amount.',
          },
          {
            type: 'mcq',
            q: 'Why does the journal require a narrative when the other books of prime entry do not?',
            opts: ['Its entries have no source document to explain them', 'Its entries are always larger than those in other daybooks', 'It is the only book posted directly into the general ledger', 'It is the only book that records both a debit and a credit'],
            ans: 0,
            exp: 'An invoice or a credit note explains itself — who, what and how much. A journal entry has nothing behind it, so the narrative is the only record of what happened and the only way a reader can judge whether it was right. Size does not come into it, and the other daybooks are posted to the ledger too.',
          },
        ],
      },

      {
        id: 'L3-FAPS-2D',
        title: 'From daybook to ledger, with VAT',
        icon: '➡️',
        criteria: ['FAPS-2.3.3'],
        cards: [
          {
            h: 'Three columns, three accounts',
            p: [
              'Posting a daybook is the same move every time. Total the three money columns, then send each total to the account it belongs to. The net column is the trading figure, the VAT column is money held for HMRC, and the gross column is what the customer owes or what the business owes the supplier.',
              'The direction reverses between sales and purchases because VAT reverses. On a sale the business has **collected** tax it must hand over, so VAT is credited. On a purchase it has **paid** tax it can reclaim, so VAT is debited. The same account carries both, and the balance is what is owed to HMRC or owed back by them.',
            ],
            callout: { kind: 'key', text: 'Net → sales or purchases. VAT → the VAT account, credited on sales and debited on purchases. Gross → the receivables or payables control account.' },
          },
          {
            h: 'A month of daybooks, posted',
            worked: {
              title: 'Sales £8,000 net, purchases £5,000 net, sales returns £400 net, VAT at 20%',
              problem: 'At the end of a month the sales daybook totals £8,000 net, the purchases daybook £5,000 net, and the sales returns daybook £400 net. VAT is 20% throughout. Post the totals, and say what the VAT account then shows.',
              steps: [
                { do: 'Sales daybook: VAT is £8,000 × 20% = £1,600, so the gross total is £8,000 + £1,600 = £9,600.', why: 'The daybook would already carry all three columns; recomputing one from another is the check that it was added up correctly.' },
                { do: 'Post it: debit receivables control £9,600, credit sales £8,000, credit VAT £1,600.', why: 'Customers owe the whole invoice including the tax, so the gross figure is the debit. The business keeps only the net as revenue — the VAT was never its money.' },
                { do: 'Purchases daybook: VAT is £5,000 × 20% = £1,000 and the gross total is £5,000 + £1,000 = £6,000.', why: 'The same arithmetic on the other side of the business.' },
                { do: 'Post it: debit purchases £5,000, debit VAT £1,000, credit payables control £6,000.', why: 'VAT is debited here because the business has paid it and can reclaim it. The supplier is owed the gross.' },
                { do: 'Sales returns: VAT is £400 × 20% = £80 and the gross is £400 + £80 = £480. Debit sales returns £400, debit VAT £80, credit receivables control £480.', why: 'A return reverses a sale, so every entry reverses too — including the VAT, which the business no longer owes HMRC because the sale did not stand.' },
                { do: 'The VAT account now shows £1,600 credited against £1,000 + £80 = £1,080 debited, leaving £1,600 − £1,080 = £520 as a credit balance.', why: 'A credit balance on VAT is money held for HMRC and is a current liability. Had the debits been larger the balance would be a debit — an asset, being a repayment due.' },
              ],
              answer: 'VAT stands at £520 credit, owed to HMRC.',
              tryIt: {
                q: 'A purchases daybook totals £7,400 net with VAT at 20%. What is the gross total posted to the payables control account?',
                answer: 8880,
                unit: '£',
                hint: 'The supplier is owed the net plus the tax.',
                exp: 'VAT is £7,400 × 20% = £1,480, so the gross is £7,400 + £1,480 = £8,880. That whole figure is credited to payables control, while purchases takes the £7,400 and VAT takes the £1,480 as a debit the business can reclaim.',
              },
            },
          },
          {
            h: 'Where the individual invoices go',
            p: [
              'The posting above moved three totals into the general ledger and said nothing about which customer owes what. That detail is not lost — it goes to the **memorandum ledgers** at the same time.',
              'Every invoice in the sales daybook is also posted to that customer\'s own account in the receivables ledger, at its gross amount. Nothing about that is double entry: it is a second, parallel record kept so the business can answer "how much does Hollis Joinery owe" without reading a year of daybooks.',
              'So the total of all the customer accounts should equal the receivables control account balance, and a difference between them means something reached one record and not the other. The next two lessons are about that.',
            ],
            examtrap: 'The control account takes the **gross** figure and the memorandum ledger takes the **gross** figure. Only the general ledger splits the invoice into net and VAT, because only the general ledger has a VAT account to split it into.',
          },
        ],
        check: [
          {
            type: 'numeric',
            q: 'A sales daybook totals £12,500 net with VAT at 20%. What amount is debited to the receivables control account?',
            answer: 15000,
            unit: '£',
            exp: 'Customers owe the whole invoice, so the control account takes the gross: VAT is £12,500 × 20% = £2,500 and £12,500 + £2,500 = £15,000. Sales takes only the £12,500, because the VAT was never the business\'s revenue.',
          },
          {
            type: 'mcq',
            q: 'Why is VAT credited when a sales daybook is posted but debited when a purchases daybook is posted?',
            opts: ['Tax collected on sales is owed to HMRC; tax paid on purchases is reclaimable', 'Sales are always larger than purchases, so the balance must be a credit', 'The sales daybook is posted at the period end and purchases as they arise', 'Customers pay VAT at a different rate from the one suppliers charge'],
            ans: 0,
            exp: 'The one VAT account holds both sides. Output tax on sales is money the business has collected on HMRC\'s behalf, so it is credited; input tax on purchases is money it has paid and can reclaim, so it is debited. The balance is whichever way round the two come out.',
          },
          {
            type: 'truefalse',
            q: 'Identify whether each statement about posting daybooks is correct.',
            statements: [
              { text: 'The receivables control account is debited with the gross total of the sales daybook.', answer: true },
              { text: 'The sales account is credited with the net total.', answer: true },
              { text: 'A credit balance on the VAT account is an amount owed to HMRC.', answer: true },
              { text: 'Individual customer accounts in the receivables ledger form part of the double entry.', answer: false },
            ],
            exp: 'Customers owe the tax as well as the goods, so the control account takes the gross. Revenue is the net — the VAT was never the business\'s money. A credit balance means more output tax collected than input tax paid, so HMRC is owed. And the memorandum ledgers are a parallel record of detail, outside the double entry.',
          },
        ],
      },

      {
        id: 'L3-FAPS-2E',
        title: 'Three ledgers, and how they fit',
        icon: '🗄️',
        criteria: ['FAPS-2.3.4'],
        cards: [
          {
            h: 'One does the accounting, two hold the detail',
            flow: ['Daybooks', 'General ledger — the double entry', 'Memorandum ledgers — receivables and payables detail'],
            p: [
              'The **general ledger** is the accounting system. Every account in the five classes lives there, every entry in it is half of a pair, and the trial balance is drawn from it. It contains the receivables and payables **control accounts**, which hold one total each for everything owed to and by the business.',
              'The **receivables ledger** holds one account per customer, and the **payables ledger** one per supplier. Neither is part of the double entry. They exist because the control account can tell you that customers owe £44,400 and cannot tell you which of them, or for how long, or whether one of them stopped paying four months ago.',
              'Both are called memorandum or subsidiary ledgers, and the two words mean the same thing: a record kept alongside the books rather than in them.',
            ],
            callout: { kind: 'key', text: 'General ledger: the double entry, one control account per class of debt. Memorandum ledgers: one account per customer or supplier, outside the double entry.' },
          },
          {
            h: 'What each one is asked',
            split: {
              left: {
                title: 'Questions for the general ledger',
                items: [
                  'What is the total owed to us?',
                  'What is our revenue for the year?',
                  'Does the trial balance balance?',
                  'What goes in the financial statements?',
                ],
              },
              right: {
                title: 'Questions for the memorandum ledgers',
                items: [
                  'How much does this customer owe?',
                  'Which invoices are still unpaid?',
                  'Who should get a statement this month?',
                  'Whose balance should we chase, or write off?',
                ],
              },
            },
            p: [
              'The split is why an invoice is posted to both. The general ledger gets it inside a monthly total; the customer\'s own account gets it individually, at the gross figure, on the day.',
              'Two records built from the same documents should agree, and checking that they do is the **reconciliation** the next lesson covers. When they disagree, the fault is nearly always a posting that reached one and not the other.',
            ],
          },
        ],
        check: [
          {
            type: 'mcq',
            q: 'What is the receivables ledger for?',
            opts: ['Holding a separate account for each credit customer', 'Holding the total owed by all customers, as part of the double entry', 'Recording sales invoices before they are posted anywhere', 'Listing the VAT charged on each sale for the VAT return'],
            ans: 0,
            exp: 'It is a memorandum ledger of one account per customer, outside the double entry. The total owed by everybody sits in the receivables control account in the general ledger, and invoices are first listed in the sales daybook.',
          },
          {
            type: 'truefalse',
            q: 'Identify whether each statement about the ledgers is correct.',
            statements: [
              { text: 'The receivables control account is in the general ledger.', answer: true },
              { text: 'The payables ledger forms part of the double entry.', answer: false },
              { text: 'Memorandum and subsidiary mean the same thing here.', answer: true },
              { text: 'A sales invoice is recorded in the general ledger and in the receivables ledger.', answer: false },
            ],
            exp: 'The control accounts are general ledger accounts and carry the totals. The memorandum ledgers sit alongside the books rather than in them, and the two names are interchangeable. The last statement is the near-miss: an individual invoice goes to the customer\'s account immediately, but it reaches the general ledger only inside the daybook total posted at the period end.',
          },
        ],
      },

      {
        id: 'L3-FAPS-2F',
        title: 'Control accounts',
        icon: '🔗',
        criteria: ['FAPS-2.3.5', 'FAPS-2.3.6'],
        cards: [
          {
            h: 'A total that can be checked against something',
            p: [
              'A control account holds the total of a group of individual balances kept somewhere else. Its value is that the two are built from the same documents by different routes, so agreeing them tests both.',
              'The specification names four. **Receivables ledger control** and **payables ledger control** are checked against the memorandum ledgers. **VAT control** is checked against the VAT return. **Wages and salaries control** is checked against the payroll and should clear to nil once everybody has been paid.',
            ],
            table: {
              headers: ['Control account', 'Checked against', 'What a difference means'],
              rows: [
                ['Receivables ledger', 'Total of the customer accounts', 'A posting reached one record and not the other'],
                ['Payables ledger', 'Total of the supplier accounts', 'The same, on the buying side'],
                ['VAT', 'The VAT return for the period', 'Output or input tax recorded wrongly, or a missing adjustment'],
                ['Wages and salaries', 'The payroll for the period', 'A deduction not paid over, or gross pay posted net'],
              ],
            },
          },
          {
            h: 'Which side each entry falls',
            split: {
              left: {
                title: 'Receivables control — debits',
                items: [
                  'Opening balance',
                  'Credit sales (gross)',
                  'Dishonoured cheques',
                  'Interest charged on overdue accounts',
                ],
              },
              right: {
                title: 'Receivables control — credits',
                items: [
                  'Receipts from customers',
                  'Sales returns (gross)',
                  'Discounts allowed',
                  'Irrecoverable debts written off',
                  'Contra with the payables ledger',
                ],
              },
            },
            p: [
              'The **contra** is the entry people miss. Where the same business is both a customer and a supplier, the two balances can be set against each other rather than each paying the other in full. It reduces receivables and payables together, so it is a credit here and a debit in the payables control account.',
              'The payables control account is the mirror of this one: opening balance and credit purchases on the credit side; payments, purchases returns, discounts received and the contra on the debit side.',
            ],
          },
          {
            h: 'A receivables ledger control account, drawn up',
            worked: {
              title: 'Opening £42,600; sales £128,400; receipts £119,750; returns £3,200; discounts £1,450; debt written off £900; contra £1,300',
              problem: 'At the start of the year customers owed £42,600. During the year credit sales were £128,400 and receipts from customers £119,750. Sales returns came to £3,200, discounts allowed to £1,450, one debt of £900 was written off, and £1,300 was set off against the payables ledger. What is the closing balance?',
              steps: [
                { do: 'Put the debits together: £42,600 + £128,400 = £171,000.', why: 'Only two things increase what customers owe — what they already owed, and what was sold to them on credit.' },
                { do: 'Put the credits together: £119,750 + £3,200 + £1,450 + £900 + £1,300 = £126,600.', why: 'Five different reasons a balance falls, and only one of them is a payment. The other four reduce the debt without any money arriving.' },
                { do: 'Take one from the other: £171,000 − £126,600 = £44,400.', why: 'The account is a debit balance, because customers owe the business rather than the other way round.' },
                { do: 'Check the written-off debt is on the credit side and not left out.', why: 'Writing a debt off removes it from receivables — the business has decided it will not be paid. Leaving it in overstates both receivables and, once the expense is missed, profit.' },
                { do: 'Check the contra appears here as a credit and in the payables control account as a debit.', why: 'A contra is one transaction touching two control accounts. Entering it in only one is a common error, and it leaves both reconciliations out by the same £1,300.' },
              ],
              answer: 'A closing debit balance of £44,400 owed by customers.',
              tryIt: {
                q: 'A payables ledger control account opens at £28,900. Credit purchases are £76,500, payments to suppliers £71,200, purchases returns £2,100, discounts received £840 and a contra £1,300. What is the closing balance?',
                answer: 29960,
                unit: '£',
                hint: 'Opening balance and purchases increase it; everything else reduces it.',
                exp: 'The credits are £28,900 + £76,500 = £105,400 and the debits are £71,200 + £2,100 + £840 + £1,300 = £75,440, leaving £105,400 − £75,440 = £29,960 as a credit balance owed to suppliers.',
              },
            },
          },
          {
            h: 'What software changes, and what it does not',
            p: [
              'In accounting software the control accounts are not written up by anybody. Posting a sales invoice updates the customer\'s account and the receivables control account in the same operation, so the two cannot disagree.',
              'That removes the commonest cause of a reconciling difference and leaves the ones it cannot see. An invoice posted to the wrong customer reconciles perfectly — the control total is right and one account is overstated while another is understated. So does an invoice posted twice, once the duplicate has updated both records. So does an invoice entered with the wrong date, which puts a real transaction in the wrong period.',
              'The reconciliation was never the only reason to keep a control account. The other reason is that it localises an error: a difference tells you which group of accounts to look in, and a business that has stopped reconciling has lost that even when its software cannot make the arithmetic wrong.',
            ],
            examtrap: 'A control account reconciliation that agrees does not mean the receivables figure is right. It means the two records agree, which is a different and weaker claim — and one that software makes almost automatic.',
          },
        ],
        check: [
          {
            type: 'numeric',
            q: 'A receivables ledger control account opens at £31,200. Credit sales are £94,600, receipts £88,300, sales returns £1,900 and discounts allowed £640. What is the closing balance?',
            answer: 34960,
            unit: '£',
            exp: 'Debits are £31,200 + £94,600 = £125,800 and credits are £88,300 + £1,900 + £640 = £90,840, so the balance is £125,800 − £90,840 = £34,960 owed by customers.',
          },
          {
            type: 'mcq',
            q: 'The same business is both a customer and a supplier, and the two balances are set against each other. How is that recorded?',
            opts: ['Credit receivables control and debit payables control', 'Debit receivables control and credit payables control', 'Credit both control accounts by the same amount', 'Debit both control accounts by the same amount'],
            ans: 0,
            exp: 'A contra reduces what is owed to the business and what it owes, together. Receivables fall, so that control account is credited; payables fall, so that one is debited. Entering it in only one leaves both reconciliations out by the same amount.',
          },
          {
            type: 'truefalse',
            q: 'Identify whether each entry belongs on the credit side of the receivables ledger control account.',
            statements: [
              { text: 'An irrecoverable debt written off.', answer: true },
              { text: 'A cheque from a customer that has been dishonoured.', answer: false },
              { text: 'Discounts allowed to customers.', answer: true },
              { text: 'Credit sales for the period.', answer: false },
            ],
            exp: 'Writing a debt off and allowing a discount both reduce what customers owe, so both are credits. A dishonoured cheque puts the debt back — the payment that was credited did not happen — so it is a debit, as are credit sales.',
          },
          {
            type: 'mcq',
            q: 'A sales invoice is posted to the wrong customer\'s account in accounting software. What does the control account reconciliation show?',
            opts: ['Nothing — the total is right and the two records still agree', 'A difference equal to the invoice, on the receivables side', 'A difference equal to the VAT on the invoice only', 'A difference that appears in the payables reconciliation instead'],
            ans: 0,
            exp: 'One customer is overstated and another understated by the same amount, so the total is unchanged and both records still agree. It is the class of error a reconciliation cannot see, and the reason a reconciliation that agrees is a weaker claim than it looks.',
          },
        ],
      },

      {
        id: 'L3-FAPS-2G',
        title: 'Writing up a ledger account',
        icon: '✍️',
        criteria: ['FAPS-2.3.7'],
        cards: [
          {
            h: 'The shape of every account',
            p: [
              'A ledger account is two columns with a line down the middle. Debits on the left, credits on the right, each entry dated and labelled with the account its other half went to. That label is what makes a ledger navigable: reading "Bank" on the credit side of the purchases account tells you where to go to find the matching entry.',
              'The rules that decide which side are the ones from Level 2, and they follow from the classification in lesson 2B. **Debit** to increase an asset or an expense, or to reduce a liability, income or capital. **Credit** to do the opposite.',
            ],
            formula: 'Debit: increase an asset or expense, decrease a liability, income or capital · Credit: the reverse',
          },
          {
            h: 'Balancing off, step by step',
            worked: {
              title: 'A bank account for the month',
              problem: 'A bank account opens the month with a debit balance of £12,400. Receipts from customers during the month total £47,900 and payments out total £41,650. Balance the account off and state the closing balance.',
              steps: [
                { do: 'Enter the opening balance as a debit of £12,400, labelled "Balance b/d".', why: 'A debit balance on bank means the business has money. It arrives as the closing balance of the previous period, brought down.' },
                { do: 'Add the debits: £12,400 + £47,900 = £60,300.', why: 'Money coming in increases an asset, so receipts are debits. Nothing else on this account is a debit.' },
                { do: 'Total the credits: £41,650.', why: 'Payments out reduce the asset. The two totals will not match, and the difference is the whole point of balancing.' },
                { do: 'Find the difference: £60,300 − £41,650 = £18,650, and enter it on the SMALLER side as "Balance c/d".', why: 'The credits are smaller, so the balance carried down goes on the credit side. That is what makes both columns total £60,300 and lets the account be ruled off.' },
                { do: 'Bring it down on the opposite side, below the total, as "Balance b/d" £18,650 debit.', why: 'The account is a debit balance of £18,650 — an asset. Carried down on one side and brought down on the other is the same figure written twice, which is what carries the balance into the next period.' },
              ],
              answer: 'A closing debit balance of £18,650.',
              tryIt: {
                q: 'A payables account opens with a credit balance of £9,300. Purchases on credit during the month are £24,700 and payments to the supplier are £21,450. What is the closing balance?',
                answer: 12550,
                unit: '£',
                hint: 'Opening balance and purchases are credits; payments are debits.',
                exp: 'The credits are £9,300 + £24,700 = £34,000 and the debits are £21,450, so the balance is £34,000 − £21,450 = £12,550. It is a credit balance, because the business owes the supplier.',
              },
            },
          },
          {
            h: 'Two habits that catch errors early',
            split: {
              left: {
                title: 'Label the other side',
                items: [
                  'Every entry names the account its pair went to',
                  '"Bank" on the credit of purchases means the debit is in bank',
                  'An entry labelled with its own account name is a mistake',
                  'An unlabelled entry cannot be traced or checked',
                ],
              },
              right: {
                title: 'Check the side against the class',
                items: [
                  'Assets and expenses: debit to increase',
                  'Liabilities, income and capital: credit to increase',
                  'A debit balance on an income account is worth a second look',
                  'A credit balance on an expense account usually means a reversal or an error',
                ],
              },
            },
            p: [
              'The right-hand column is the faster of the two checks and it does not need the other account. Sales carrying a debit balance, or rent carrying a credit one, is either a genuine reversal — a refund, a correction — or something posted the wrong way round, and either way it deserves a look before the trial balance is drawn.',
            ],
            examtrap: 'Balance c/d goes on the SMALLER side and balance b/d on the opposite side underneath. Putting them both on the same side is the error that makes an account fail to balance while looking as though it does.',
          },
        ],
        check: [
          {
            type: 'numeric',
            q: 'A receivables account opens with a debit balance of £5,600. Credit sales in the month are £18,200 and receipts from the customer are £16,900. What is the closing balance?',
            answer: 6900,
            unit: '£',
            exp: 'Debits are £5,600 + £18,200 = £23,800 and credits are £16,900, so the balance is £23,800 − £16,900 = £6,900. It is a debit balance, because the customer still owes the business.',
          },
          {
            type: 'mcq',
            q: 'When an account is balanced off, on which side does the balance carried down go?',
            opts: ['The side with the smaller total, so both columns then agree', 'The side with the larger total, matching the balance type', 'The debit side, whatever the balance turns out to be', 'The credit side, whatever the balance turns out to be'],
            ans: 0,
            exp: 'The balance carried down is the figure that makes the two columns equal, so it goes on the smaller side. It is then brought down on the opposite side underneath the total, which is where the account\'s real balance sits going into the next period.',
          },
          {
            type: 'truefalse',
            q: 'Identify whether each statement about writing up ledger accounts is correct.',
            statements: [
              { text: 'Each entry is labelled with the account holding its other half.', answer: true },
              { text: 'A credit balance on an expense account is always an error.', answer: false },
              { text: 'Debiting an account increases an asset or an expense.', answer: true },
              { text: 'Balance c/d and balance b/d are entered on the same side.', answer: false },
            ],
            exp: 'The label is what lets an entry be traced to its pair. A credit balance on an expense account is unusual and worth investigating, but a refund or a correction can produce one legitimately. Debits increase assets and expenses. And the two halves of the balance go on opposite sides — that is what carries it into the next period.',
          },
        ],
      },

      {
        id: 'L3-FAPS-2H',
        title: 'The period end, account by account',
        icon: '🔚',
        criteria: ['FAPS-2.4.1', 'FAPS-2.4.2', 'FAPS-2.4.4'],
        cards: [
          {
            h: 'Two fates, decided by the class',
            p: [
              'At the period end every account in the general ledger is dealt with, and there are only two things that can happen to one. Which happens is decided entirely by the class it was given in lesson 2B.',
              '**Income and expense accounts are transferred out.** Their balances go to the statement of profit or loss and the accounts are left at nil, ready to start the next period from zero. Sales for the year just gone has nothing to do with sales for the year ahead, so carrying the figure forward would be meaningless — and would count the same revenue twice.',
              '**Asset, liability and capital accounts are carried down.** Their balances stay where they are, become the statement of financial position, and are brought down as the opening balances of the next period. A machine the business owned on 31 December is still owned on 1 January.',
            ],
            callout: { kind: 'key', text: 'Income and expenses are transferred out and start again at nil. Assets, liabilities and capital are carried down and continue. The class decides, every time.' },
          },
          {
            h: 'The same distinction, seen from the statements',
            table: {
              headers: ['Class', 'At the period end', 'Because'],
              rows: [
                ['Income', 'Transferred to the SPL; account left at nil', 'It measures a period, and the period has ended'],
                ['Expenses', 'Transferred to the SPL; account left at nil', 'The same'],
                ['Assets', 'Carried down and brought down', 'It measures a position, and the position persists'],
                ['Liabilities', 'Carried down and brought down', 'The same'],
                ['Capital', 'Carried down, after profit and drawings are put through it', 'The owner\'s claim continues, adjusted for the year'],
              ],
            },
            p: [
              'The third column is the reason for the rule. The statement of profit or loss covers a **period** — a year of trading, which ends. The statement of financial position describes a **moment** — what is held and owed on one date, which the next day inherits.',
              'So the two statements are not just different reports. They are different kinds of thing, and the period-end treatment of an account follows from which of the two it belongs in.',
            ],
          },
          {
            h: 'What the software does with all of this',
            p: [
              'Accounting software runs the period end as a routine. It transfers the income and expense balances to the profit figure, rolls the asset, liability and capital balances forward, and locks the closed period so nothing can be posted into it by accident.',
              'The judgements stay with the person. Software knows which class each account was given, and applies the rule perfectly to that; it does not know whether the class was right. An account set up as an expense when it should have been an asset is emptied to profit every year without complaint, and the routine that does it is the same routine that would have been correct had the class been right.',
              'The period lock is the part that shows up in practice. It is what stops an entry being backdated into a year already reported, and it is why an adjustment found after the close goes into the current period rather than into the one it relates to.',
            ],
            examtrap: 'Drawings is a capital-class account, and its balance is never transferred to the statement of profit or loss. It is closed off against capital instead, which is why it never touches the profit figure.',
          },
        ],
        check: [
          {
            type: 'truefalse',
            q: 'Identify whether each account is transferred to the statement of profit or loss at the period end.',
            statements: [
              { text: 'Rent paid.', answer: true },
              { text: 'Motor vehicles at cost.', answer: false },
              { text: 'Sales revenue.', answer: true },
              { text: 'Payables control.', answer: false },
              { text: 'Discounts received.', answer: true },
            ],
            exp: 'Rent, sales and discounts received all measure a period that has ended, so they are transferred out and start again at nil. Vehicles and payables describe a position on a date, so they are carried down and brought down as opening balances — the business still owns the vehicles and still owes the suppliers on the first day of the new year.',
          },
          {
            type: 'mcq',
            q: 'Why are expense accounts left at nil after the period end while asset accounts are not?',
            opts: ['An expense measures a period that has ended; an asset describes a position that continues', 'An expense is always smaller than an asset and is not worth carrying forward', 'An expense has already been paid, whereas an asset may still be owed for', 'An expense appears in only one of the two financial statements'],
            ans: 0,
            exp: 'The statement of profit or loss covers a span of time, which finishes; the statement of financial position describes a moment, which the next day inherits. Carrying an expense forward would count last year\'s cost again this year.',
          },
          {
            type: 'mcq',
            q: 'An account was set up in the wrong class three years ago. What does the software\'s period-end routine do about it?',
            opts: ['Applies the rule for the class it was given, correctly and every year', 'Reclassifies it once the balance behaves unlike others in its class', 'Refuses to close the period until the classification is confirmed', 'Transfers it to suspense so that somebody has to look at it'],
            ans: 0,
            exp: 'The routine knows which class each account carries and applies the right rule to it. It has no way to know the class itself was wrong, so a misclassification is applied faithfully year after year — which is the class of error automation makes harder to notice rather than easier.',
          },
        ],
      },

      {
        id: 'L3-FAPS-2I',
        title: 'Verifying a balance, and judging what belongs',
        icon: '🔎',
        criteria: ['FAPS-2.4.3', 'FAPS-2.4.5'],
        cards: [
          {
            h: 'A balance is a claim, and claims get checked',
            p: [
              'A ledger balance is an assertion: the business holds this, or owes this. Before it goes into financial statements somebody should have a reason to believe it beyond the fact that it is what the ledger says.',
              'Most of those reasons come from outside the ledger, and their being outside it is what makes them worth anything. A balance checked against another part of the same system proves only that the system is self-consistent.',
            ],
            table: {
              headers: ['Balance', 'Checked against', 'The kind of evidence'],
              rows: [
                ['Bank', 'The bank statement, via a reconciliation', 'A third party who has no reason to agree with you'],
                ['Payables ledger', 'Supplier statements', 'A third party, on the buying side'],
                ['Receivables control', 'Total of the memorandum ledger accounts', 'A second, parallel record from the same documents'],
                ['Payables control', 'Total of the memorandum ledger accounts', 'The same'],
                ['Inventory', 'A physical count, and the inventory records', 'The goods themselves'],
                ['Non-current assets', 'The asset register, and physical verification', 'The register, then the assets themselves'],
              ],
            },
          },
          {
            h: 'How strong each check is',
            split: {
              left: {
                title: 'Strong — external or physical',
                items: [
                  'Bank statement: prepared by somebody else entirely',
                  'Supplier statement: the same, and it disagrees when you are wrong',
                  'Physical count: the goods are there or they are not',
                  'Seeing the asset: it exists or it does not',
                ],
              },
              right: {
                title: 'Weaker — internal',
                items: [
                  'Control account against the memorandum ledger',
                  'Register against the general ledger',
                  'Both compare two records built from the same documents',
                  'A document wrong at source is wrong in both',
                ],
              },
            },
            p: [
              'Neither column makes the other pointless. The internal checks are cheap, run over everything, and localise an error to a group of accounts. The external and physical ones are the only ones that can find a transaction that never happened, or an asset that no longer exists.',
              'A business relying only on the right-hand column can have every record agreeing with every other record and still be wrong about the world.',
            ],
          },
          {
            h: 'Is this transaction genuine, and does it belong here?',
            p: [
              'Verifying a balance assumes the entries underneath it were real. The specification asks separately for the judgement that they were, and it is a different question with a different set of tests.',
              'Four are worth having in mind. Is there **evidence** — an invoice, a contract, a delivery note? Was it **authorised** by somebody with the authority for that amount? Is it the **business\'s** expense rather than the owner\'s, which is the business entity principle in operational form? And does it fall in **this period**, rather than the last or the next?',
              'The uncomfortable one in practice is the third. An invoice addressed to the business, properly authorised, correctly dated and genuinely paid can still be for the owner\'s private spending — and it is the only one of the four that a document cannot settle.',
            ],
            examtrap: 'A transaction can be genuine and still not belong in this period, or belong in this period and still not be the business\'s. The four tests are separate, and a scenario often satisfies three of them.',
          },
        ],
        check: [
          {
            type: 'mcq',
            q: 'Which of these gives the strongest evidence that a bank balance is correct?',
            opts: ['A reconciliation to the bank statement', 'A recount of the entries in the cash book', 'Agreement with the figure in last year\'s accounts', 'A check that the trial balance balances'],
            ans: 0,
            exp: 'The bank statement is prepared by a third party who has no reason to agree with the business, so agreement is real evidence. The other three all check the business\'s own records against themselves, and a consistent system can be consistently wrong.',
          },
          {
            type: 'truefalse',
            q: 'Identify whether each check would detect the problem described.',
            statements: [
              { text: 'A physical inventory count would detect goods recorded but no longer held.', answer: true },
              { text: 'A control account reconciliation would detect an invoice posted to the wrong customer.', answer: false },
              { text: 'A supplier statement reconciliation would detect an invoice the business never recorded.', answer: true },
              { text: 'Agreeing the asset register to the general ledger would detect an asset that has been scrapped and recorded nowhere.', answer: false },
            ],
            exp: 'A count finds the gap between the records and the goods. A wrong-customer posting leaves the total unchanged, so the reconciliation is silent. A supplier statement is external, so it shows an invoice the business missed. And an asset scrapped with no entry anywhere is still in both records, which agree with each other — only physical verification finds it.',
          },
          {
            type: 'mcq',
            q: 'An invoice is addressed to the business, authorised by a director and correctly dated, but the goods were delivered to the director\'s home for personal use. What is it?',
            opts: ['Drawings, because the business entity principle makes it the owner\'s', 'A valid business expense, because it was properly authorised', 'A valid business expense, because the invoice names the business', 'An accrual, because the benefit falls outside the accounting period'],
            ans: 0,
            exp: 'Three of the four tests are satisfied and the fourth is not: the spending is the owner\'s rather than the business\'s. Authorisation and paperwork cannot make a private purchase a business expense, and treating it as one overstates expenses and understates drawings.',
          },
        ],
      },
    ],
    cheatsheet: {
      id: 'L3-FAPS-2S',
      title: 'Double entry on one card',
      icon: '🗂️',
      card: {
        h: 'Outcome 2 at a glance',
        p: [
          'The route a transaction takes: document, daybook, ledger, balance. Get the class of the account right and the side follows from it every time.',
        ],
        formula: 'Assets = Liabilities + Capital · Debit: up an asset or expense, down a liability, income or capital · Credit: the reverse',
        table: {
          headers: ['Class', 'Normal balance', 'Ends up in'],
          rows: [
            ['Assets, current and non-current', 'Debit', 'Statement of financial position'],
            ['Liabilities, current and non-current', 'Credit', 'Statement of financial position'],
            ['Equity (capital)', 'Credit', 'Statement of financial position'],
            ['Income', 'Credit', 'Statement of profit or loss'],
            ['Expenses', 'Debit', 'Statement of profit or loss'],
          ],
        },
        split: {
          left: {
            title: 'Daybook to ledger',
            items: [
              'Eight books of prime entry, including the cash book and the journal',
              'Net → sales or purchases',
              'VAT → the VAT account: credited on sales, debited on purchases',
              'Gross → the receivables or payables control account',
            ],
          },
          right: {
            title: 'Three ledgers, one doing the accounting',
            items: [
              'General ledger holds the double entry and the control accounts',
              'Receivables and payables ledgers hold one account per customer or supplier',
              'Those two sit outside the double entry — memoranda',
              'Reconciling control to memorandum is what proves the detail',
            ],
          },
        },
        examtrap: 'At the period end the class decides the fate: income and expenses are transferred out and restart at nil, while assets, liabilities and capital are carried down. Drawings is capital-class, so it is carried down — it is not an expense and never reaches the profit statement.',
      },
    },
  };

  /* ══════════════════════════════════════════════════════════════════════════
     OUTCOME 3 — Implement procedures for the acquisition and disposal of
     non-current assets. 10% of the assessment.
     ══════════════════════════════════════════════════════════════════════════ */

  var LO3 = {
    unit: 'faps',
    level: 3,
    title: 'Financial Accounting: Preparing Financial Statements',
    outcome: 3,
    outcomeTitle: 'Implement procedures for the acquisition and disposal of non-current assets',
    weighting: 10,
    lessons: [
      {
        id: 'L3-FAPS-3A',
        title: 'Authorising capital spending',
        icon: '🔑',
        criteria: ['FAPS-3.1.1', 'FAPS-3.1.2'],
        cards: [
          {
            h: 'Why capital spending is authorised separately',
            p: [
              'Most businesses let a buyer order stationery without asking anyone. Almost none let the same buyer order a £40,000 machine.',
              'The difference is not the amount alone, though the amount is part of it. Capital expenditure commits the business for years: the machine has to be paid for, housed, insured, maintained and eventually disposed of, and until it is disposed of the cash spent on it cannot be spent on anything else. A decision that ties up cash for eight years should be made by somebody who knows what else the cash was for.',
              'It also lands on the accounts differently. Revenue expenditure hits this year\'s profit and is gone. Capital expenditure sits on the statement of financial position and releases into profit slowly, through depreciation, for as long as the asset lasts. Somebody choosing to capitalise is choosing where profit appears for several years. That choice is not left to whoever happens to be signing.',
            ],
            callout: { kind: 'key', text: 'Authorisation exists because capital spending commits cash for years, and because capitalising an item moves cost out of this year\'s profit and into several later ones.' },
          },
          {
            h: 'Who authorises what',
            table: {
              headers: ['Level of spend', 'Typically authorised by', 'What the control is for'],
              rows: [
                ['Below the capitalisation threshold', 'Departmental budget holder', 'Keeping spend inside an agreed budget'],
                ['Routine, within an approved budget', 'Department head or finance manager', 'Confirming the item is what the budget was for'],
                ['Large, or outside the budget', 'Finance director or board', 'Weighing it against everything else the cash could do'],
                ['Land, buildings, anything long-lived', 'Board, often with a formal business case', 'A commitment that outlasts most of the people making it'],
              ],
            },
            p: [
              'The exact levels differ by business and no figure here is a rule. What holds everywhere is the shape: authority rises with the size and the length of the commitment, and the person authorising is senior enough to see what else the money was for.',
              'Two related controls usually travel with it. Spending is authorised **before** the order goes out rather than after the invoice arrives, because an approval sought afterwards is not a decision. And the person who authorises is not the person who records the purchase, so an unauthorised asset cannot be quietly added to the register by the one person who would notice.',
            ],
            examtrap: 'A question may show an invoice for an asset with no authorisation, or authorisation by somebody below the stated limit. The answer is not to post it and mention it — an unauthorised commitment is referred upwards before it enters the records.',
          },
        ],
        check: [
          {
            type: 'mcq',
            q: 'Why does capital expenditure normally need authorisation at a higher level than revenue expenditure?',
            opts: ['It commits cash for years and shifts cost out of this year\'s profit', 'It is always for a larger amount than any revenue expenditure', 'It is the only kind of spending that appears on the trial balance', 'It cannot be reversed once the supplier has issued the invoice'],
            ans: 0,
            exp: 'Capitalising ties up cash for the life of the asset and moves the cost off this year\'s profit into later years through depreciation. Some revenue items are larger than some capital ones, both kinds reach the trial balance, and either can be returned or credited.',
          },
          {
            type: 'truefalse',
            q: 'Identify whether each control over capital expenditure is sound.',
            statements: [
              { text: 'Authorisation is obtained before the order is placed rather than after the invoice arrives.', answer: true },
              { text: 'The person who authorises the purchase also records it in the asset register.', answer: false },
              { text: 'Authority limits rise with the size and length of the commitment.', answer: true },
              { text: 'An invoice authorised below the stated limit may be posted, provided a note is left on file.', answer: false },
            ],
            exp: 'Approval sought after the event is not a decision. Separating authorisation from recording is what stops one person adding an unauthorised asset unnoticed. Limits rise with commitment because a longer tie-up of cash deserves a wider view. An invoice authorised below the limit is referred upwards rather than posted with a note.',
          },
        ],
      },

      {
        id: 'L3-FAPS-3B',
        title: 'Capital or revenue',
        icon: '✂️',
        criteria: ['FAPS-3.2.1', 'FAPS-3.2.3', 'FAPS-3.2.4', 'FAPS-3.2.5', 'FAPS-3.2.7'],
        cards: [
          {
            h: 'The test, and where it comes from',
            p: [
              'The standard governing non-current assets is **IAS 16, Property, Plant and Equipment**, and the test it sets for what may be added to the cost of an asset is short: the purchase price, plus any cost **directly attributable to bringing the asset to the location and condition necessary for it to be capable of operating in the way management intends**.',
              'Read that clause slowly, because every borderline case turns on it. Delivery is directly attributable — the machine cannot operate in the warehouse if it is still on a lorry. Installation is directly attributable. So is the fee paid to the engineer who commissions it, and the cost of preparing the floor it stands on.',
              'The moment the asset is capable of operating as intended, capitalisation stops. Everything after that point is revenue expenditure, however large and however closely connected to the asset.',
            ],
            callout: { kind: 'key', text: 'Capitalise up to the point the asset is capable of operating as management intends. After that point, expense it.' },
          },
          {
            h: 'The usual suspects',
            split: {
              left: {
                title: 'Capital — added to the asset',
                items: [
                  'Purchase price, net of trade discount',
                  'Delivery and handling to site',
                  'Installation, assembly and site preparation',
                  'Professional fees to acquire or commission it',
                  'Testing to confirm it works as intended',
                  'Signwriting a vehicle in company livery',
                  'A later improvement that raises capacity or extends the life',
                ],
              },
              right: {
                title: 'Revenue — charged to profit this year',
                items: [
                  'Road fund licence and insurance',
                  'Fuel, consumables and materials',
                  'Repairs and routine maintenance',
                  'Staff training to use the asset',
                  'Advertising the product the asset makes',
                  'General administration and overheads',
                  'The cost of moving the asset to a new site later',
                ],
              },
            },
            p: [
              'Two of the revenue items catch people out. **Staff training** is directly connected to the machine and is still revenue, because it changes what the staff can do rather than what the machine can do. And **moving the asset later** is revenue even though the identical cost was capital first time round: the first delivery brought the asset to the condition necessary to operate, and the second merely relocated an asset already operating.',
            ],
          },
          {
            h: 'Splitting an invoice',
            example: {
              title: 'A delivery vehicle invoice, and where each line goes',
              rows: [
                ['Line', 'Amount', 'Treatment'],
                ['Vehicle list price', '£19,500', 'Capital'],
                ['Delivery to premises', '£250', 'Capital'],
                ['Signwriting in company livery', '£600', 'Capital'],
                ['Road fund licence, 12 months', '£320', 'Revenue'],
                ['Insurance, 12 months', '£780', 'Revenue'],
                ['Fuel on collection', '£60', 'Revenue'],
                ['**Invoice total**', '**£21,510**', ''],
              ],
            },
            p: [
              'Capitalised: £19,500 + £250 + £600 = £20,350. Charged to profit this year: £320 + £780 + £60 = £1,160. The two together are the invoice total, and £20,350 + £1,160 = £21,510 is the check worth doing every time.',
              'Notice what separates the two columns. The licence, the insurance and the fuel all buy twelve months of something, and the vehicle would drive perfectly well without any of them. The signwriting is capital because the business wants a liveried van, and the van is not the asset management intended until it carries the livery.',
            ],
            examtrap: 'A single invoice mixing capital and revenue lines is one of the most reliable shapes in this unit. Post the whole invoice to the vehicle account and the asset is overstated by £1,160, profit is overstated by the same amount, and every depreciation charge for the next several years is wrong too.',
          },
          {
            h: 'The capitalisation threshold',
            p: [
              'A business also sets a **capitalisation policy**: a level below which an item is expensed however long it will last. A £45 desk fan may serve for a decade and still be written off on the day it is bought.',
              'That is materiality doing its job. Tracking a £45 fan through an asset register for ten years, depreciating it, verifying it in a stock count and eventually recording its disposal costs far more than the accuracy it buys, and no reader of the accounts would decide anything differently either way.',
              'The policy has to be applied consistently in both directions. An item above the threshold is capitalised even in a year when the business would rather have the expense; an item below it is expensed even when capitalising would flatter the profit. A threshold applied only when it suits is not a policy.',
            ],
          },
        ],
        check: [
          {
            type: 'mcq',
            q: 'A machine is bought for £30,000. Which of these costs is **not** capitalised as part of it?',
            opts: ['Training the operators to use the machine safely', 'Preparing the concrete base the machine stands on', 'Delivering the machine from the supplier to the site', 'Commissioning fees paid to the installing engineer'],
            ans: 0,
            exp: 'Capitalise costs directly attributable to bringing the asset to the location and condition necessary to operate as intended. Site preparation, delivery and commissioning all do that. Training changes what the staff can do rather than what the machine can do, so it is revenue expenditure.',
          },
          {
            type: 'numeric',
            q: 'An invoice for a van shows: list price £19,500, delivery £250, signwriting £600, road fund licence £320, insurance £780 and fuel £60. What amount is capitalised?',
            answer: 20350,
            unit: '£',
            exp: 'The list price, delivery and signwriting all bring the van to the condition management intends: £19,500 + £250 + £600 = £20,350. The licence, insurance and fuel each buy twelve months of running the van and are charged to profit this year.',
          },
          {
            type: 'truefalse',
            q: 'Identify whether each item is capital expenditure.',
            statements: [
              { text: 'The cost of moving a machine to a different factory two years after it was installed.', answer: false },
              { text: 'Legal fees paid on the purchase of a warehouse.', answer: true },
              { text: 'An extension that increases the capacity of an existing building.', answer: true },
              { text: 'Repainting an office in its existing colours.', answer: false },
              { text: 'A £45 desk fan, where the capitalisation policy threshold is £500.', answer: false },
            ],
            exp: 'The first delivery brought the asset to the condition needed to operate; a later move relocates an asset already operating, so it is revenue. Legal fees on acquisition are directly attributable. An extension raises capacity and is capital, while repainting in the same colours restores rather than improves. The fan falls below the threshold and is expensed however long it lasts.',
          },
          {
            type: 'gapfill',
            q: 'Complete the IAS 16 test for what may be capitalised.',
            template: 'Cost includes the purchase price plus any cost {0} to bringing the asset to the location and condition necessary for it to be capable of {1}. Once that point is reached, further spending on it is {2}.',
            gaps: [
              { options: ['directly attributable', 'reasonably connected', 'commercially justified'], answer: 0 },
              { options: ['operating as management intends', 'generating a positive return', 'being insured for its full value'], answer: 0 },
              { options: ['revenue expenditure', 'capitalised at cost', 'held in suspense'], answer: 0 },
            ],
            exp: 'Directly attributable is the phrase that decides borderline cases: delivery and installation qualify, general overheads and training do not. Capitalisation stops at the moment the asset is capable of operating as intended, however large the later spending is.',
          },
        ],
      },

      {
        id: 'L3-FAPS-3C',
        title: 'Five definitions, and what capitalising does',
        icon: '📐',
        criteria: ['FAPS-3.2.2', 'FAPS-3.2.6'],
        cards: [
          {
            h: 'The five words the rest of this unit uses',
            table: {
              headers: ['Term', 'What it means'],
              rows: [
                ['**Cost**', 'What was paid to acquire the asset, including everything capitalised with it'],
                ['**Useful life**', 'How long the asset is expected to be available for use **by this business** — not how long it could physically last'],
                ['**Residual value**', 'What the business expects to get for it at the end of that life, after disposal costs'],
                ['**Depreciable amount**', 'Cost less residual value: the part that will be charged to profit over the life'],
                ['**Carrying amount**', 'Cost less accumulated depreciation: what the asset stands at in the accounts today'],
              ],
            },
            p: [
              'Useful life is the one most often misread. A van may run for fifteen years, but a business that replaces its fleet every four has a useful life of four — the question is how long the asset serves **this** business, not how long it would survive.',
              'That is also why two businesses can depreciate identical vans over different lives without either being wrong, and why the estimate is a judgement that has to be made honestly rather than to suit a profit target.',
            ],
          },
          {
            h: 'What capitalising does to the two statements',
            p: [
              'Take £20,000 spent on a machine with a five-year life and no residual value, and follow it two ways.',
              '**Expensed:** profit this year falls by £20,000. Nothing appears on the statement of financial position. In years two to five the machine costs nothing at all, and profit in each of those years is higher than the trading actually justified.',
              '**Capitalised:** profit this year falls by the first depreciation charge of £4,000, and £20,000 − £4,000 = £16,000 sits under non-current assets. Each of the next four years carries another £4,000, and the carrying amount falls to nil as the machine reaches the end of its life.',
              'Over five years both routes charge £20,000 to profit. What changes is **which years** carry it — and since the machine earns revenue in all five, only the second route matches the cost to the periods that benefit. That match is the accruals principle, and depreciation is how it is applied to a non-current asset.',
            ],
            callout: { kind: 'key', text: 'Capitalising changes the timing of the charge, not its total. Over the asset\'s life the same cost reaches profit either way.' },
          },
          {
            h: 'Getting it wrong, in both directions',
            split: {
              left: {
                title: 'Expensing something capital',
                items: [
                  'Profit this year understated',
                  'Non-current assets understated on the SFP',
                  'Later years\' profits overstated, because no depreciation follows',
                  'Capital employed understated for the rest of the asset\'s life',
                ],
              },
              right: {
                title: 'Capitalising something revenue',
                items: [
                  'Profit this year overstated',
                  'Non-current assets overstated on the SFP',
                  'Later years carry depreciation on something that was never an asset',
                  'The error persists for the whole assumed life rather than one year',
                ],
              },
            },
            p: [
              'The right-hand column is the more serious of the two, and it is the direction in which pressure usually runs. Capitalising a repair improves this year\'s profit and puts an asset on the statement of financial position, and both effects are what somebody under pressure to report a good year would want. It also takes several years to unwind, so it is not a mistake that corrects itself.',
            ],
          },
        ],
        check: [
          {
            type: 'mcq',
            q: 'An asset cost £30,000 and accumulated depreciation on it stands at £11,500. What is its carrying amount?',
            opts: ['£18,500', '£30,000', '£11,500', '£41,500'],
            ans: 0,
            exp: 'Carrying amount is cost less accumulated depreciation: £30,000 − £11,500 = £18,500. It is the figure the asset stands at in the accounts today, and it is not the same as what the asset would sell for.',
          },
          {
            type: 'mcq',
            q: 'A repair costing £8,000 is wrongly capitalised. What is the effect on this year\'s financial statements?',
            opts: ['Profit is overstated and non-current assets are overstated', 'Profit is understated and non-current assets are overstated', 'Profit is overstated and non-current assets are understated', 'Profit is unaffected and non-current assets are overstated'],
            ans: 0,
            exp: 'Capitalising takes the £8,000 out of this year\'s expenses, so profit rises, and adds it to the asset account, so non-current assets rise. The error then persists: depreciation is charged in later years on something that was never an asset.',
          },
          {
            type: 'truefalse',
            q: 'Identify whether each statement about the five terms is correct.',
            statements: [
              { text: 'Useful life is how long the asset will serve this business, not how long it could physically last.', answer: true },
              { text: 'Depreciable amount is cost less residual value.', answer: true },
              { text: 'Carrying amount is what the asset would fetch if it were sold today.', answer: false },
              { text: 'Two businesses must apply the same useful life to identical assets.', answer: false },
            ],
            exp: 'Useful life is entity-specific, which is why a fleet replaced every four years has a four-year life whatever the vans would survive. Depreciable amount is the portion charged over the life. Carrying amount is an accounting figure — cost less accumulated depreciation — and market value has no part in it. Identical assets used differently may properly carry different lives.',
          },
        ],
      },

      {
        id: 'L3-FAPS-3D',
        title: 'The non-current asset register',
        icon: '📒',
        criteria: ['FAPS-3.3.1', 'FAPS-3.3.4', 'FAPS-3.3.6'],
        cards: [
          {
            h: 'A record that sits outside the double entry',
            p: [
              'The general ledger knows that the business holds £480,000 of plant and machinery with £215,000 of accumulated depreciation against it. It does not know that £24,000 of that is a press bought in March, standing in the Leeds workshop, four years into an eight-year life.',
              'The **non-current asset register** holds the detail. It is a memorandum record — outside the double entry, carrying no debits or credits — with one line per asset, and it is the only place the business can answer a question about a particular thing it owns.',
            ],
            table: {
              headers: ['Field', 'What it is for'],
              rows: [
                ['Description and unique reference', 'Matching the record to the physical item'],
                ['Location and person responsible', 'Finding it, and knowing who to ask'],
                ['Acquisition date and cost', 'The starting point for every depreciation calculation'],
                ['Depreciation method and rate', 'So the charge can be recomputed and checked'],
                ['Charge for the year, and accumulated', 'The line that has to agree with the general ledger'],
                ['Carrying amount', 'What this asset stands at today'],
                ['Disposal date and proceeds', 'Closing the record, and computing the gain or loss'],
              ],
            },
          },
          {
            h: 'What the register is actually used for',
            flow: ['Physical verification', 'Reconciliation to the general ledger', 'Supporting the depreciation charge', 'Computing gains and losses on disposal'],
            p: [
              '**Physical verification** works in both directions, and both matter. Register to floor asks whether everything recorded still exists — an asset scrapped two years ago and never written out is carrying depreciation and inflating the accounts. Floor to register asks whether everything that exists is recorded, which is how an unauthorised purchase or an asset acquired with a business surfaces.',
              '**Reconciliation to the general ledger** is the one an assessment asks for most. Total cost per the register should equal the cost balance in the general ledger, and total accumulated depreciation per the register should equal the accumulated depreciation balance. Where they differ, something has been posted to one and not the other.',
              'The usual causes are worth knowing in advance: an acquisition posted to the ledger and never added to the register, a disposal removed from the register and never posted, a private-use adjustment made in one place only, or an asset written off physically with no entry anywhere.',
            ],
            examtrap: 'The register carries no debits or credits and is not part of the double entry. A question asking for the journal to "correct the register" is testing whether you know that — the correction is made in the ledger, in the register, or in both, depending on which one is wrong.',
          },
          {
            h: 'Where the register lives',
            p: [
              'A register may be a module inside accounting software, or a spreadsheet kept alongside it. Both are common and the specification names both.',
              'Software keeps the register and the ledger in step automatically, which removes the commonest cause of a reconciling difference and introduces a subtler one: if the acquisition is entered with the wrong date, cost or life, the software will depreciate it wrongly, consistently, and without complaint for the whole of its life. Nothing in the reconciliation will show it, because both sides agree — they agree on the wrong figure.',
              'A spreadsheet has the opposite profile. Every difference between it and the ledger is visible at the year end, and every formula is somebody\'s to get right. The risks are a dragged formula that skips a row, a total that does not include the newest line, and a file that two people have edited.',
            ],
          },
        ],
        check: [
          {
            type: 'mcq',
            q: 'What is the primary purpose of reconciling the non-current asset register to the general ledger?',
            opts: ['To find assets recorded in one place and not the other', 'To recalculate the useful life of every asset held', 'To value the assets at what they would fetch if sold', 'To transfer the register balances into the double entry'],
            ans: 0,
            exp: 'Total cost and total accumulated depreciation per the register should equal the corresponding general ledger balances. A difference points at something posted to one and not the other — commonly an acquisition never added to the register, or a disposal never posted. The register carries no balances into the double entry.',
          },
          {
            type: 'truefalse',
            q: 'Identify whether each statement about the asset register is correct.',
            statements: [
              { text: 'It is a memorandum record and forms no part of the double entry.', answer: true },
              { text: 'Checking the floor against the register can reveal assets the business owns but has never recorded.', answer: true },
              { text: 'Where the register is kept in accounting software, a wrong acquisition date will show up in the reconciliation.', answer: false },
              { text: 'An asset scrapped and never written out of the register keeps attracting depreciation.', answer: true },
            ],
            exp: 'The register holds detail rather than balances. Verification runs both ways, and floor to register is what surfaces an unrecorded asset. Software keeps both sides in step, so a wrong date produces a wrong charge that reconciles perfectly — which is why scepticism applies hardest to figures a system produced. An asset left in the register goes on being depreciated.',
          },
        ],
      },

      {
        id: 'L3-FAPS-3E',
        title: 'Recording an acquisition, and the VAT on it',
        icon: '🧾',
        criteria: ['FAPS-3.3.7', 'FAPS-3.3.8'],
        cards: [
          {
            h: 'The entries',
            p: [
              'An acquisition on credit is two entries and a note. Debit the relevant non-current asset cost account with the capitalised amount, debit VAT if it is recoverable, and credit the payables account with the total owed. Then add the asset to the register, which is not part of the double entry and is the step most often forgotten.',
              'The cost account is chosen by class — motor vehicles, plant and machinery, fixtures and fittings, land and buildings — because depreciation policies differ by class and the statement of financial position discloses them separately.',
            ],
            example: {
              title: 'Machine bought on credit for £12,000 plus VAT at 20%, business VAT registered',
              rows: [
                ['Account', 'Debit', 'Credit'],
                ['Plant and machinery — cost', '£12,000', ''],
                ['VAT', '£2,400', ''],
                ['Payables', '', '£14,400'],
              ],
            },
          },
          {
            h: 'VAT follows the registration status',
            p: [
              'A **VAT-registered** business recovers the input tax on the purchase, so the VAT is not a cost to it. The asset is capitalised **net**: £12,000 × 20% = £2,400 goes to the VAT account and the machine stands at £12,000.',
              'A business that is **not registered** cannot recover anything. The VAT is part of what it had to pay to get the machine, so it is directly attributable, and the asset is capitalised **gross** at £12,000 + £2,400 = £14,400. Every depreciation charge for the rest of that machine\'s life is then computed on £14,400.',
              'One case sits outside the pattern and is worth knowing because it is common. Input tax on a **car** is normally blocked, so even a registered business cannot recover it unless the car is used exclusively for business — a taxi or a driving-school vehicle. Where the VAT cannot be recovered it is capitalised with the car, exactly as it would be for an unregistered business. The rule the specification states for this unit is registration status; the car block belongs to Tax Processes and is mentioned here because a scenario can raise it.',
            ],
            callout: { kind: 'key', text: 'Recoverable VAT goes to the VAT account and the asset is capitalised net. Irrecoverable VAT is part of the cost of getting the asset, so it is capitalised with it.' },
          },
          {
            h: 'Getting the register entry right',
            p: [
              'The register line is written at acquisition and everything afterwards depends on it. Four fields do the damage if they are wrong.',
              'The **cost** determines every depreciation charge, and a cost that wrongly includes the road fund licence overstates the charge for the whole life. The **acquisition date** determines the first charge where the policy is pro-rata, and a date a month out changes the first year and every carrying amount after it. The **method and rate** have to match the policy for that class, not the last asset entered. The **class** decides which policy applies at all.',
              'None of these is caught by a reconciliation, because the register and the ledger can agree perfectly on a wrong figure. They are caught by somebody reading the register line against the invoice, which is the check worth building in.',
            ],
          },
        ],
        check: [
          {
            type: 'numeric',
            q: 'A business that is not VAT registered buys equipment for £12,000 plus VAT at 20%. What amount is capitalised?',
            answer: 14400,
            unit: '£',
            exp: 'An unregistered business cannot recover input tax, so the VAT is part of what it had to pay to obtain the asset and is directly attributable to it. The equipment is capitalised gross: £12,000 + £2,400 = £14,400, and every depreciation charge is computed on that figure.',
          },
          {
            type: 'mcq',
            q: 'A VAT-registered business buys a machine for £20,000 plus recoverable VAT. How is the VAT treated?',
            opts: ['Debited to the VAT account, and the machine stands at £20,000', 'Added to the machine, which then stands at £24,000 in total', 'Charged to profit as an expense of the year of purchase', 'Held in a suspense account until the VAT return is filed'],
            ans: 0,
            exp: 'Recoverable input tax is not a cost to the business — it is reclaimed from HMRC — so it goes to the VAT account rather than into the asset. The machine is capitalised net at £20,000, which is also the figure depreciation is computed on.',
          },
          {
            type: 'truefalse',
            q: 'Identify whether each statement about recording an acquisition is correct.',
            statements: [
              { text: 'The asset is added to the non-current asset register as well as to the general ledger.', answer: true },
              { text: 'Assets are posted to a cost account for their class, because depreciation policies differ by class.', answer: true },
              { text: 'A wrong acquisition date will be picked up when the register is reconciled to the ledger.', answer: false },
              { text: 'Irrecoverable VAT on an asset is charged to profit in the year of purchase.', answer: false },
            ],
            exp: 'The register is a separate memorandum record and updating it is a distinct step. Class drives the policy and the disclosure. A wrong date produces a wrong charge that both sides agree on, so the reconciliation is silent — only reading the register against the invoice finds it. Irrecoverable VAT is part of the cost of obtaining the asset and is capitalised with it.',
          },
        ],
      },

      {
        id: 'L3-FAPS-3F',
        title: 'Disposals',
        icon: '📤',
        criteria: ['FAPS-3.3.2', 'FAPS-3.3.5', 'FAPS-3.3.7'],
        cards: [
          {
            h: 'Three entries into one account',
            p: [
              'Selling an asset means removing two figures from the ledger — its original cost and the accumulated depreciation charged against it — and bringing in whatever was received. A **disposals account** collects all three so the result can be seen in one place.',
              'The order does not matter and the three entries always look the same. Move the cost in: debit disposals, credit the asset cost account. Move the accumulated depreciation in: debit accumulated depreciation, credit disposals. Bring in the proceeds: debit bank or receivables, credit disposals.',
              'What is left is the answer. The cost went in as a debit and the depreciation and proceeds came in as credits, so a **credit balance is a gain** and a **debit balance is a loss**. The balance is then transferred to the statement of profit or loss.',
            ],
            callout: { kind: 'key', text: 'Disposals account: cost in on the debit side, accumulated depreciation and proceeds in on the credit side. Credit balance = gain, debit balance = loss.' },
          },
          {
            h: 'A machine sold at a loss',
            worked: {
              title: 'Cost £18,000, accumulated depreciation £13,500, sold for £3,200',
              problem: 'A machine that cost £18,000 has accumulated depreciation of £13,500 at the date of disposal. It is sold for £3,200 cash. Work out the gain or loss and set out the entries.',
              steps: [
                { do: 'Find the carrying amount: £18,000 − £13,500 = £4,500.', why: 'This is what the asset stands at in the accounts on the day it leaves. The gain or loss is the difference between that and what was received for it.' },
                { do: 'Compare with the proceeds: £4,500 − £3,200 = £1,300.', why: 'The business received less than the accounts said the machine was worth, so the difference is a loss.' },
                { do: 'Debit disposals £18,000, credit plant and machinery cost £18,000.', why: 'The asset has gone, so its cost leaves the cost account. The disposals account takes it on the debit side.' },
                { do: 'Debit accumulated depreciation £13,500, credit disposals £13,500.', why: 'The depreciation charged against this machine relates to an asset the business no longer holds, so it leaves too — and it offsets the cost already sitting in disposals.' },
                { do: 'Debit bank £3,200, credit disposals £3,200.', why: 'The proceeds arrive in the bank and go into the disposals account, where they meet the carrying amount.' },
                { do: 'Balance the account: debits £18,000 against credits £13,500 + £3,200 = £16,700, leaving a debit balance of £1,300.', why: 'A debit balance is a loss, and it agrees with the figure worked out in step two — which is the check that the entries were made correctly.' },
              ],
              answer: 'A loss on disposal of £1,300, transferred to the statement of profit or loss.',
              tryIt: {
                q: 'A vehicle that cost £21,000 has accumulated depreciation of £16,800 and is sold for £5,000. What is the gain on disposal?',
                answer: 800,
                unit: '£',
                hint: 'Carrying amount first, then compare it with the proceeds.',
                exp: 'Carrying amount is £21,000 − £16,800 = £4,200. The vehicle fetched £5,000, which is £800 more than the accounts said it was worth, so there is a gain of £800 and the disposals account is left with a credit balance.',
              },
            },
          },
          {
            h: 'What a gain or loss actually is',
            p: [
              'A gain on disposal is not a profit the business made by trading, and a loss is not money it lost on the day. Both are corrections.',
              'Depreciation spreads cost over an estimated life to an estimated residual value. Both estimates are made years before the asset is sold, and neither is going to be exactly right. If the asset was depreciated faster than it lost value, the carrying amount is below what it fetches and the difference appears as a gain; if it was depreciated too slowly, a loss appears.',
              'So a business that regularly reports large gains on disposal is telling you its useful lives are too short, and one reporting persistent losses is telling you they are too long. That is a real signal and an assessment can ask you to read it.',
            ],
            examtrap: 'Use the accumulated depreciation **at the date of disposal**, which means applying the depreciation policy for the final period first — a part-year charge under pro-rata, or none at all where the policy charges nothing in the year of disposal. Reaching for last year\'s figure without asking what the policy requires is the commonest error in a disposal question.',
          },
        ],
        check: [
          {
            type: 'numeric',
            q: 'An asset that cost £40,000 has accumulated depreciation of £28,500. It is sold for £9,000. What is the loss on disposal?',
            answer: 2500,
            unit: '£',
            exp: 'The carrying amount is £40,000 − £28,500 = £11,500. Proceeds of £9,000 are £2,500 below that, so £11,500 − £9,000 = £2,500 is a loss and the disposals account is left with a debit balance.',
          },
          {
            type: 'mcq',
            q: 'After all three entries have been made, the disposals account shows a credit balance. What does that mean?',
            opts: ['A gain, because proceeds exceeded the carrying amount', 'A loss, because proceeds fell short of the carrying amount', 'An error, because the account should always balance to nil', 'Nothing yet, until the asset register has also been updated'],
            ans: 0,
            exp: 'Cost enters on the debit side and accumulated depreciation and proceeds both enter on the credit side. Credits exceeding the debit means the proceeds and the depreciation together exceed the original cost, which is the same as proceeds exceeding the carrying amount — a gain.',
          },
          {
            type: 'mcq',
            q: 'A business consistently reports large gains on the disposal of its vehicles. What does that most likely indicate?',
            opts: ['Its estimated useful lives are shorter than the vehicles actually serve', 'Its estimated useful lives are longer than the vehicles actually serve', 'Its vehicles are being sold before they have been depreciated at all', 'Its depreciation has been posted to the wrong side of the ledger'],
            ans: 0,
            exp: 'A gain means the carrying amount had fallen below what the asset would fetch, so depreciation was charged faster than the vehicle lost value. Lives that are too short produce exactly that. Persistent losses would point the other way.',
          },
        ],
      },

      {
        id: 'L3-FAPS-3G',
        title: 'Part-exchange',
        icon: '🔄',
        criteria: ['FAPS-3.3.3', 'FAPS-3.3.7'],
        cards: [
          {
            h: 'A disposal and an acquisition at once',
            p: [
              'Trading an old van in against a new one looks like one transaction and is two. The old van is disposed of, and the new van is acquired; the part-exchange allowance is simply the form the proceeds take.',
              'The specification puts it as part-exchange being **a different form of funding** to cash or credit. The business is paying for the new asset partly with an old asset instead of entirely with money, and the accounting treats that old asset exactly as it would treat any other disposal.',
              'So the allowance is the proceeds, it goes into the disposals account like any other proceeds, and the gain or loss is worked out the same way. What differs is where the money goes: instead of arriving in the bank, it goes straight into the cost of the new asset.',
            ],
            callout: { kind: 'key', text: 'The part-exchange allowance is the proceeds of the old asset. Cost of the new asset = the allowance + whatever cash is paid on top.' },
          },
          {
            h: 'A van traded in',
            worked: {
              title: 'Old van cost £16,000, accumulated depreciation £11,200; new van £22,000 with a £5,500 allowance',
              problem: 'A van that cost £16,000 has accumulated depreciation of £11,200. It is part-exchanged against a new van priced at £22,000, with the dealer allowing £5,500 for the old one. The balance is paid from the bank. Work out the gain or loss and set out the entries.',
              steps: [
                { do: 'Carrying amount of the old van: £16,000 − £11,200 = £4,800.', why: 'The old van is being disposed of, so the first job is what it stands at in the accounts.' },
                { do: 'The allowance is the proceeds: £5,500 − £4,800 = £700 gain.', why: 'The dealer gave £5,500 of value for something the accounts carried at £4,800, so the business is £700 better off than the books said.' },
                { do: 'Cash to pay: £22,000 − £5,500 = £16,500.', why: 'The allowance covers part of the price and the bank covers the rest.' },
                { do: 'Debit disposals £16,000, credit motor vehicles cost £16,000; debit accumulated depreciation £11,200, credit disposals £11,200.', why: 'The two standard disposal entries, exactly as they would be for a cash sale.' },
                { do: 'Debit motor vehicles cost £5,500, credit disposals £5,500.', why: 'This is the entry that makes part-exchange different. The proceeds do not go to the bank — they go into the cost of the new van, because that is what they bought.' },
                { do: 'Debit motor vehicles cost £16,500, credit bank £16,500.', why: 'The cash side of the purchase. The new van now stands at £5,500 + £16,500 = £22,000, which is its price.' },
                { do: 'Balance disposals: debits £16,000 against credits £11,200 + £5,500 = £16,700, a credit balance of £700.', why: 'A credit balance is a gain, and it agrees with step two — the check that both halves of the transaction were entered correctly.' },
              ],
              answer: 'A gain on disposal of £700, and the new van capitalised at £22,000.',
              tryIt: {
                q: 'A machine that cost £14,000 has accumulated depreciation of £9,500. It is part-exchanged for a new machine costing £20,000, with £4,000 allowed against it. What is the loss on disposal?',
                answer: 500,
                unit: '£',
                hint: 'Carrying amount, then compare it with the allowance.',
                exp: 'The carrying amount is £14,000 − £9,500 = £4,500. The dealer allowed £4,000, which is £500 less, so £4,500 − £4,000 = £500 is a loss on disposal. The new machine is still capitalised at its full £20,000.',
              },
            },
          },
          {
            h: 'Two things not to do',
            split: {
              left: {
                title: 'Wrong',
                items: [
                  'Capitalising the new asset at the cash paid only',
                  'Netting the old asset off against the new and posting the difference',
                  'Treating the allowance as a discount on the new asset',
                  'Leaving the old asset in the register because no money changed hands for it',
                ],
              },
              right: {
                title: 'Right',
                items: [
                  'New asset at allowance plus cash: its full price',
                  'Two separate transactions, both fully recorded',
                  'Allowance treated as proceeds of the old asset',
                  'Old asset removed from the register with its disposal date and proceeds',
                ],
              },
            },
            p: [
              'The first error is the common one, and it does lasting damage. A new van capitalised at £16,500 rather than £22,000 is understated by the whole allowance, every depreciation charge for its life is too small, and the gain on the old van never appears in profit at all.',
            ],
            examtrap: 'The specification excludes **the VAT treatment of part exchanges** from this unit. A part-exchange question will not require you to deal with VAT on the trade-in, and working figures out net of VAT is a way to get the wrong answer to a question that never asked.',
          },
        ],
        check: [
          {
            type: 'numeric',
            q: 'A car costing £26,000 is bought by part-exchanging an old one, with £7,200 allowed against it and the balance paid by cheque. At what amount is the new car capitalised?',
            answer: 26000,
            unit: '£',
            exp: 'The new asset is capitalised at its full price of £26,000, made up of the £7,200 allowance and £18,800 paid by cheque. Capitalising only the cash paid would understate the asset by the whole allowance and understate every later depreciation charge with it.',
          },
          {
            type: 'mcq',
            q: 'In a part-exchange, what is the part-exchange allowance treated as?',
            opts: ['The proceeds of disposal of the old asset', 'A trade discount reducing the new asset\'s cost', 'A reduction of the accumulated depreciation brought forward', 'A separate item of income in the statement of profit or loss'],
            ans: 0,
            exp: 'Part-exchange is a different form of funding, not a different kind of transaction. The allowance is what the old asset fetched, so it goes into the disposals account as proceeds and determines the gain or loss there — it does not reduce the price of the new asset.',
          },
          {
            type: 'truefalse',
            q: 'Identify whether each statement about part-exchange is correct.',
            statements: [
              { text: 'The new asset is capitalised at the allowance plus the cash paid.', answer: true },
              { text: 'The old asset is removed from the non-current asset register.', answer: true },
              { text: 'The VAT treatment of part-exchanges is assessed in this unit.', answer: false },
              { text: 'A part-exchange is recorded as one transaction rather than a disposal and an acquisition.', answer: false },
            ],
            exp: 'The allowance and the cash together are the price of the new asset. The old asset leaves the register with its disposal date and proceeds, as any disposal would. The specification excludes the VAT treatment of part-exchanges from this unit. And it is two transactions — the accounting records both in full rather than netting them.',
          },
        ],
      },
    ],
    cheatsheet: {
      id: 'L3-FAPS-3S',
      title: 'Non-current assets on one card',
      icon: '🗂️',
      card: {
        h: 'Outcome 3 at a glance',
        p: [
          'One question runs through the whole outcome: does this cost belong to the asset or to this year? Capitalise up to the point the asset can operate as management intends, and expense everything after it.',
        ],
        split: {
          left: {
            title: 'Capital — added to the asset',
            items: [
              'The purchase price itself',
              'Delivery and installation',
              'Testing, and professional fees on acquisition',
              'Improvements that raise what the asset can do',
            ],
          },
          right: {
            title: 'Revenue — charged to this year',
            items: [
              'Repairs and servicing',
              'Insurance, fuel and road tax',
              'Training staff to use it',
              'Anything after it is ready for use',
            ],
          },
        },
        table: {
          headers: ['', 'The entries'],
          rows: [
            ['Acquisition', 'Dr the asset at cost · Cr bank or payables'],
            ['VAT on it', 'Recoverable → the VAT account · irrecoverable → capitalised with the asset'],
            ['Disposal', 'Cost in on the debit · depreciation and proceeds on the credit'],
            ['The result', 'Credit balance on disposals = a gain · debit balance = a loss'],
            ['Part-exchange', 'The allowance IS the proceeds · new cost = allowance + cash'],
          ],
        },
        callout: { kind: 'key', text: 'The asset register carries no debits or credits and is not part of the double entry. Correcting it is never done by journal.' },
        examtrap: 'Use the accumulated depreciation at the DATE of disposal, which means applying the policy for the final period first. And the specification excludes the VAT treatment of part exchanges from this unit.',
      },
    },
  };

  /* ══════════════════════════════════════════════════════════════════════════
     OUTCOME 4 — Prepare and record depreciation calculations. 10%.
     ══════════════════════════════════════════════════════════════════════════ */

  var LO4 = {
    unit: 'faps',
    level: 3,
    title: 'Financial Accounting: Preparing Financial Statements',
    outcome: 4,
    outcomeTitle: 'Prepare and record depreciation calculations',
    weighting: 10,
    lessons: [
      {
        id: 'L3-FAPS-4A',
        title: 'What depreciation is for',
        icon: '📉',
        criteria: ['FAPS-4.1.1', 'FAPS-4.1.2', 'FAPS-4.1.3'],
        cards: [
          {
            h: 'Not a valuation, and not a fund',
            p: [
              'Two things depreciation is regularly mistaken for, and it is neither.',
              'It is **not an attempt to value the asset**. A machine carried at £15,360 is not being claimed to be worth £15,360; the figure is what is left of a cost after some of it has been charged to profit. A three-year-old van whose market value collapsed after a recall carries on depreciating on its original schedule, because the schedule was never about market value. A permanent fall below the carrying amount is dealt with separately, by impairment, which this unit does not assess.',
              'It is **not money set aside**. Charging £4,000 of depreciation puts nothing in the bank and funds no replacement. The credit goes to accumulated depreciation, which is a contra-asset sitting against cost, not a pot of cash.',
              'What depreciation does is allocate. The **depreciable amount** — cost less residual value — is spread across the periods the asset serves, so each year carries a share of the cost of the asset it used. That is the accruals principle applied to something that was paid for once and consumed slowly.',
            ],
            callout: { kind: 'key', text: 'Depreciation allocates cost across the periods that benefit. It does not value the asset and it sets no money aside.' },
          },
          {
            h: 'The two decisions behind every charge',
            split: {
              left: {
                title: 'How long — useful life',
                items: [
                  'How long the asset will serve **this** business',
                  'Shaped by replacement policy as much as by wear',
                  'A fleet replaced every four years has a four-year life',
                  'Shortening it raises the charge and lowers profit',
                ],
              },
              right: {
                title: 'What is left — residual value',
                items: [
                  'What the business expects to get at the end of that life',
                  'After the costs of disposing of it',
                  'Often nil, and often nil because estimating it is not worth the trouble',
                  'Raising it lowers the depreciable amount and the charge',
                ],
              },
            },
            p: [
              'Both are estimates, both are made years before the truth is known, and both move profit. That combination is why the specification attaches professional scepticism to this area: a life quietly extended or a residual value quietly raised improves reported profit every year until the asset is sold, and neither change looks like anything on the face of the accounts.',
              'When either estimate turns out wrong, the correction arrives as a gain or loss on disposal — which is why persistent gains or losses are a signal about the estimates rather than about the sale.',
            ],
          },
          {
            h: 'Where the charge is computed',
            p: [
              'Accounting software will hold the method, the rate and the in-service date, calculate the charge every period, post it, and update both the ledger and the register. A spreadsheet will do the same arithmetic and leave a journal to be entered by hand.',
              'Both are normal and the specification names both. The difference that matters is where the risk sits.',
              'Software cannot get the arithmetic wrong and cannot forget an asset. What it can do is apply the right method to the wrong inputs — an in-service date a month out, a life copied from the previous line, a class that carries someone else\'s policy — and go on doing it, cleanly and consistently, for the whole of the asset\'s life. A reconciliation will not find it, because the register and the ledger agree. Only somebody reading the register line against the invoice will.',
            ],
            examtrap: 'Depreciation begins when the asset is **available for use**, which is not always the date on the invoice. A machine delivered in March and commissioned in May starts depreciating in May, and a pro-rata policy computes from then.',
          },
        ],
        check: [
          {
            type: 'mcq',
            q: 'Which of these best describes what depreciation does?',
            opts: ['Allocates the cost of an asset over the periods that use it', 'Restates the asset at what it would fetch on the open market', 'Sets aside cash so the asset can be replaced when it wears out', 'Records the fall in the asset\'s value during the period concerned'],
            ans: 0,
            exp: 'Depreciation spreads the depreciable amount — cost less residual value — across the asset\'s useful life, so each period carries a share of the cost of what it used. It is an allocation, not a valuation and not a fund: the credit goes to accumulated depreciation, which holds no cash.',
          },
          {
            type: 'truefalse',
            q: 'Identify whether each statement about depreciation is correct.',
            statements: [
              { text: 'Charging depreciation is an application of the accruals principle.', answer: true },
              { text: 'Accumulated depreciation is a sum of money held to replace the asset.', answer: false },
              { text: 'Depreciation begins when the asset becomes available for use.', answer: true },
              { text: 'Extending an estimated useful life raises the annual charge.', answer: false },
            ],
            exp: 'Accruals puts the cost in the periods that benefit, which is exactly what depreciation does. Accumulated depreciation is a contra-asset against cost and holds no cash. Availability for use, not the invoice date, starts the clock. Extending a life spreads the same depreciable amount over more years, so the annual charge falls.',
          },
        ],
      },

      {
        id: 'L3-FAPS-4B',
        title: 'Straight line',
        icon: '📏',
        criteria: ['FAPS-4.1.4'],
        cards: [
          {
            h: 'The same amount every year',
            formula: 'Annual charge = (Cost − Residual value) ÷ Useful life · or · Annual charge = Cost × the given percentage',
            p: [
              'Straight line charges an equal amount to every year of the asset\'s life, and it is the right choice where the asset is consumed evenly — a building, office furniture, a fixture that works as hard in year six as in year one.',
              'A policy states it in one of two ways and the two are not interchangeable. **By useful life**, where the depreciable amount is divided by the number of years. **By percentage**, where a stated rate is applied to **cost** every year. Read the policy: a rate applied to cost is straight line, and the same rate applied to the carrying amount is the other method entirely.',
            ],
          },
          {
            h: 'A machine over five years',
            worked: {
              title: 'Cost £24,000, residual value £4,000, useful life 5 years',
              problem: 'A machine costs £24,000. It is expected to serve for five years and to be sold for about £4,000 at the end of them. The policy is straight line. What is the annual charge, and what is the carrying amount after two years?',
              steps: [
                { do: 'Find the depreciable amount: £24,000 − £4,000 = £20,000.', why: 'Only the part of the cost the business will not get back is spread over the life. The residual value is expected to come back on disposal, so charging it to profit would overstate the cost of using the machine.' },
                { do: 'Divide by the useful life: £20,000 ÷ 5 = £4,000 a year.', why: 'Straight line spreads the depreciable amount evenly, so every one of the five years carries the same share.' },
                { do: 'After two years, accumulated depreciation is £4,000 × 2 = £8,000.', why: 'Two years at the same charge. Accumulated depreciation is the running total of every charge made against this asset.' },
                { do: 'Carrying amount: £24,000 − £8,000 = £16,000.', why: 'Cost less accumulated depreciation. It is not what the machine would fetch — it is what is left of the cost still to be charged, plus the residual value.' },
                { do: 'Sanity check the end point: after five years accumulated depreciation is £4,000 × 5 = £20,000, leaving £24,000 − £20,000 = £4,000.', why: 'The carrying amount at the end of the life should equal the residual value. If it does not, one of the earlier steps is wrong.' },
              ],
              answer: '£4,000 a year, and a carrying amount of £16,000 after two years.',
              tryIt: {
                q: 'A van costs £18,500, has an estimated residual value of £2,900 and a useful life of four years. What is the annual straight-line charge?',
                answer: 3900,
                unit: '£',
                hint: 'Depreciable amount first, then divide by the life.',
                exp: 'The depreciable amount is £18,500 − £2,900 = £15,600, and £15,600 ÷ 4 = £3,900 a year. After four years the accumulated depreciation is £15,600 and the carrying amount is back down to the £2,900 residual value.',
              },
            },
          },
          {
            h: 'Full year, or pro-rata',
            p: [
              'A policy also says how the year of acquisition is treated, and the two conventions give different answers to the same question.',
              'A **full year in the year of acquisition and none in the year of disposal** is the simpler convention. An asset bought on any date in the year takes a whole year\'s charge; the year it is sold takes none. No apportionment is needed and the policy does the work.',
              '**Pro-rata** charges by the months the asset was available for use. The £4,000 machine above, available from 1 October with a 31 December year end, is charged for three months: £4,000 × 3 ÷ 12 = £1,000. The following year takes the full £4,000.',
              'Which convention applies is stated in the question, and applying the wrong one is a way of getting a correctly-calculated figure marked wrong.',
            ],
            examtrap: 'Pro-rata months run from when the asset was **available for use**, not from the invoice date and not from the date it was paid for. Where a question gives a delivery date and a commissioning date, the commissioning date is the one that starts the clock.',
          },
        ],
        check: [
          {
            type: 'numeric',
            q: 'Equipment costs £31,000, has a residual value of £3,000 and a useful life of seven years. What is the annual straight-line charge?',
            answer: 4000,
            unit: '£',
            exp: 'The depreciable amount is £31,000 − £3,000 = £28,000, spread evenly over seven years: £28,000 ÷ 7 = £4,000 a year. After seven years the carrying amount is back to the £3,000 residual value.',
          },
          {
            type: 'numeric',
            q: 'A machine has a straight-line charge of £6,000 for a full year. It became available for use on 1 September and the year end is 31 December. Under a pro-rata policy, what is the charge for that first year?',
            answer: 2000,
            unit: '£',
            exp: 'September to December is four months of availability, so the charge is £6,000 × 4 ÷ 12 = £2,000. The following year, with the machine available throughout, carries the full £6,000.',
          },
          {
            type: 'mcq',
            q: 'A policy reads "20% per annum on cost". Which method is that?',
            opts: ['Straight line, charging the same amount every year', 'Diminishing balance, charging less in each later year', 'Straight line, but only until the residual value is reached', 'Diminishing balance, but reverting to cost after five years'],
            ans: 0,
            exp: 'A rate applied to cost gives the same figure every year, which is straight line. The same rate applied to the carrying amount would fall each year, and that is diminishing balance — reading which base the percentage attaches to is what separates the two.',
          },
          {
            type: 'truefalse',
            q: 'Identify whether each statement about straight-line depreciation is correct.',
            statements: [
              { text: 'The carrying amount at the end of the useful life should equal the residual value.', answer: true },
              { text: 'Residual value is deducted before the cost is spread over the life.', answer: true },
              { text: 'Under a full-year policy, an asset bought in December takes one month of depreciation.', answer: false },
              { text: 'Pro-rata months run from the invoice date rather than from availability for use.', answer: false },
            ],
            exp: 'Only the depreciable amount is charged, so what is left at the end is the residual value — a useful check on any calculation. A full-year policy charges a whole year whenever in the year the asset arrived, which is what makes it simpler than pro-rata. And the clock starts when the asset is available for use, which may be later than the invoice.',
          },
        ],
      },

      {
        id: 'L3-FAPS-4C',
        title: 'Diminishing balance',
        icon: '📊',
        criteria: ['FAPS-4.1.5'],
        cards: [
          {
            h: 'A percentage of what is left',
            formula: 'Annual charge = Carrying amount at the start of the year × the given percentage',
            p: [
              'Diminishing balance applies a fixed percentage to the **carrying amount** rather than to cost. Because the carrying amount falls every year, so does the charge: large early, small later, and never quite reaching nil.',
              'That pattern suits assets that give most of their service early or lose most of their value early — vehicles, computers, anything that is worth markedly less the moment it is a year old. It also roughly offsets the fact that repair costs rise as an asset ages, so the total annual cost of owning it stays steadier than either figure alone.',
              'The specification asks for this method **for a full year with a given percentage**, so no residual value is deducted and no pro-rata apportionment is needed. The percentage does all the work.',
            ],
            callout: { kind: 'key', text: 'Straight line applies the rate to cost. Diminishing balance applies it to the carrying amount, so the charge falls every year.' },
          },
          {
            h: 'Three years at 20%',
            worked: {
              title: 'Cost £30,000, 20% diminishing balance, full years',
              problem: 'An asset costs £30,000 and is depreciated at 20% per annum on the diminishing balance, charging a full year each year. Work out the charge and the carrying amount for each of the first three years.',
              steps: [
                { do: 'Year 1: the carrying amount is the cost, so £30,000 × 20% = £6,000.', why: 'Nothing has been charged yet, so the opening carrying amount and the cost are the same figure. This is the only year in which the two methods give the same answer for the same rate.' },
                { do: 'Carry down: £30,000 − £6,000 = £24,000.', why: 'This is the base for next year. Under this method every year starts from what is left, which is what makes the charge fall.' },
                { do: 'Year 2: £24,000 × 20% = £4,800, leaving £24,000 − £4,800 = £19,200.', why: 'The same 20%, applied to a smaller base. The charge has dropped by a fifth because the base did.' },
                { do: 'Year 3: £19,200 × 20% = £3,840, leaving £19,200 − £3,840 = £15,360.', why: 'The pattern continues. Each year the charge is 80% of the year before, so the asset is never fully written off by this method alone.' },
                { do: 'Compare: accumulated depreciation is £6,000 + £4,800 + £3,840 = £14,640 against £30,000 − £14,640 = £15,360 carried.', why: 'Straight line at 20% of cost would have charged £6,000 × 3 = £18,000 and left £30,000 − £18,000 = £12,000 — so the same rate on the same asset gives a carrying amount over £3,000 higher after only three years.' },
              ],
              answer: 'Charges of £6,000, £4,800 and £3,840, and a carrying amount of £15,360 after three years.',
              tryIt: {
                q: 'Equipment costs £16,000 and is depreciated at 25% per annum on the diminishing balance. What is the charge for the second year?',
                answer: 3000,
                unit: '£',
                hint: 'Work out year one first — year two needs the carrying amount it leaves behind.',
                exp: 'Year one is £16,000 × 25% = £4,000, leaving a carrying amount of £16,000 − £4,000 = £12,000. Year two is then £12,000 × 25% = £3,000. Applying 25% to cost again would give £4,000 and is the commonest error in this calculation.',
              },
            },
          },
          {
            h: 'Choosing between the two',
            table: {
              headers: ['', 'Straight line', 'Diminishing balance'],
              rows: [
                ['Base for the charge', 'Cost', 'Carrying amount at the start of the year'],
                ['Pattern of charges', 'Equal every year', 'Falling every year'],
                ['Residual value', 'Deducted before spreading', 'Not deducted; the rate handles it'],
                ['Reaches nil?', 'Yes, at the end of the useful life', 'No — it approaches nil without arriving'],
                ['Suits', 'Buildings, fixtures, even use', 'Vehicles, computers, front-loaded use'],
              ],
            },
            p: [
              'The method is chosen to match how the asset is consumed, and once chosen the consistency principle keeps it. A change is permitted when the pattern of use genuinely changes; a change made because a different method would report a better number is the example the ethics material uses.',
              'A question can give either method, or both for different classes in the same business, and the class is what tells you which. Vehicles on diminishing balance and buildings on straight line in one trial balance is an ordinary arrangement rather than a trick.',
            ],
          },
        ],
        check: [
          {
            type: 'numeric',
            q: 'A vehicle costs £25,000 and is depreciated at 30% per annum on the diminishing balance. What is the charge for the second year?',
            answer: 5250,
            unit: '£',
            exp: 'Year one is £25,000 × 30% = £7,500, leaving a carrying amount of £25,000 − £7,500 = £17,500. Year two applies the same rate to that reduced figure: £17,500 × 30% = £5,250.',
          },
          {
            type: 'mcq',
            q: 'Under diminishing balance, why does the annual charge fall each year?',
            opts: ['The percentage is applied to a carrying amount that keeps reducing', 'The percentage itself is reduced by the same proportion each year', 'The residual value is deducted again at the start of every year', 'The useful life is recalculated at the end of each accounting period'],
            ans: 0,
            exp: 'The rate is fixed; the base is not. Each year starts from the carrying amount left by the last one, so applying the same percentage to a smaller figure gives a smaller charge — which is what produces the front-loaded pattern the method exists for.',
          },
          {
            type: 'truefalse',
            q: 'Identify whether each statement comparing the two methods is correct.',
            statements: [
              { text: 'In the first year, both methods at the same rate give the same charge.', answer: true },
              { text: 'Diminishing balance writes an asset down to nil at the end of its useful life.', answer: false },
              { text: 'Residual value is deducted before applying a diminishing balance percentage.', answer: false },
              { text: 'A business may use different methods for different classes of asset.', answer: true },
            ],
            exp: 'In year one the carrying amount is the cost, so the two coincide. After that diminishing balance falls away and approaches nil without reaching it. The rate is applied to the carrying amount with no residual value deducted. And methods are chosen per class to match how each kind of asset is consumed, so vehicles and buildings commonly differ.',
          },
        ],
      },

      {
        id: 'L3-FAPS-4D',
        title: 'Recording it, and proving it',
        icon: '🧮',
        criteria: ['FAPS-4.2.1', 'FAPS-4.2.2'],
        cards: [
          {
            h: 'One journal, two accounts, and the register',
            p: [
              'The charge for the period is entered by journal: **debit depreciation expense**, **credit accumulated depreciation**. The debit is an expense and reaches the statement of profit or loss. The credit builds up in a contra-asset account that sits against cost.',
              'What the entry does **not** touch is the asset cost account. Cost stays at cost for the whole life of the asset, and the reduction is shown separately. That is why the statement of financial position can present all three figures — cost, accumulated depreciation and carrying amount — and why the register carries all three too.',
              'Then the register: the charge is written against each individual asset\'s line, its accumulated depreciation is increased and its carrying amount recomputed. The journal moves one total; the register accounts for it asset by asset.',
            ],
            example: {
              title: 'The year-end journal for a £4,000 charge',
              rows: [
                ['Account', 'Debit', 'Credit'],
                ['Depreciation expense', '£4,000', ''],
                ['Accumulated depreciation — plant and machinery', '', '£4,000'],
              ],
            },
          },
          {
            h: 'Proving the register against the ledger',
            p: [
              'The reconciliation is two comparisons, and both have to hold.',
              'Total **cost** across every open line in the register should equal the cost balance in the general ledger. Total **accumulated depreciation** across the same lines should equal the accumulated depreciation balance. Where either differs, something reached one record and not the other.',
              'The causes are a short list, and knowing it turns a hunt into a check.',
            ],
            table: {
              headers: ['Symptom', 'Usual cause'],
              rows: [
                ['Register cost exceeds the ledger', 'A disposal posted in the ledger and never removed from the register'],
                ['Ledger cost exceeds the register', 'An acquisition posted and never added to the register'],
                ['Accumulated depreciation differs, cost agrees', 'The charge computed on a different figure in one of the two records'],
                ['Both differ by the same amount', 'A whole asset missing from one side'],
                ['Both agree, and the charge still looks wrong', 'A wrong life, rate or in-service date — agreed by both, and wrong in both'],
              ],
            },
            examtrap: 'The last row is the one a reconciliation cannot find. Two records agreeing on a figure derived from a wrong input agree perfectly, which is why the register line is also read against the original invoice rather than only against the ledger.',
          },
          {
            h: 'The order at the year end',
            flow: ['Bring assets sold up to date, as the policy requires', 'Work out the gain or loss on those disposals', 'Charge depreciation on everything still held', 'Update the register line by line', 'Reconcile register totals to the ledger'],
            p: [
              'Doing these out of order produces answers that are individually correct and collectively wrong.',
              'Assets being sold are dealt with **first**, because the gain or loss compares the proceeds with the carrying amount at the date of disposal, and that carrying amount is not right until the policy has been applied for the final period. Under pro-rata that means a part-year charge; under a full-year policy it means no charge at all in the year of sale. Either way the figure comes from the policy, and reaching for last year\'s accumulated depreciation instead is the commonest error in a disposal question.',
              'The reconciliation comes **last**, because it is the check rather than a step. Running it before the disposals have been written out of the register produces a difference that is not a fault, and chasing it wastes the time that should have gone on the real one.',
            ],
          },
        ],
        check: [
          {
            type: 'mcq',
            q: 'What is the journal entry to record the depreciation charge for the year?',
            opts: ['Debit depreciation expense, credit accumulated depreciation', 'Debit accumulated depreciation, credit depreciation expense', 'Debit depreciation expense, credit the asset cost account', 'Debit the asset cost account, credit accumulated depreciation'],
            ans: 0,
            exp: 'The debit is an expense reaching the statement of profit or loss and the credit builds in a contra-asset account against cost. The asset cost account is untouched — cost stays at cost for the whole life, which is what lets the statement of financial position show cost, accumulated depreciation and carrying amount separately.',
          },
          {
            type: 'mcq',
            q: 'Total cost in the general ledger exceeds total cost in the asset register. What is the most likely cause?',
            opts: ['An acquisition was posted to the ledger and never added to the register', 'A disposal was posted to the ledger and never removed from the register', 'The depreciation charge was computed on the wrong useful life', 'The depreciation journal was posted twice in the same period'],
            ans: 0,
            exp: 'The ledger holding more cost than the register means the register is short of an asset, which points at an acquisition that reached the double entry and not the memorandum record. A disposal posted only in the ledger produces the opposite symptom — the cost has left the ledger while the register still carries the asset, so the register exceeds the ledger. A wrong life or a doubled charge moves depreciation, not cost.',
          },
          {
            type: 'truefalse',
            q: 'Identify whether each statement about recording depreciation is correct.',
            statements: [
              { text: 'The asset cost account is unchanged by the depreciation journal.', answer: true },
              { text: 'The accumulated depreciation used in a disposal includes whatever charge the policy requires for the final period.', answer: true },
              { text: 'A reconciliation that agrees proves the depreciation charge was computed correctly.', answer: false },
              { text: 'Accumulated depreciation is presented as an expense in the statement of profit or loss.', answer: false },
            ],
            exp: 'Cost stays at cost and the reduction is held separately. The carrying amount used in a disposal must include the final part-period charge. A reconciliation only proves the two records agree, and both can agree on a figure derived from a wrong life or date. What the disposal needs is the carrying amount after the policy has been applied for the final period. Accumulated depreciation is a contra-asset on the statement of financial position; the year\'s charge is the expense.',
          },
        ],
      },
    ],
    cheatsheet: {
      id: 'L3-FAPS-4S',
      title: 'Depreciation on one card',
      icon: '🗂️',
      card: {
        h: 'Outcome 4 at a glance',
        p: [
          'Depreciation spreads the cost of an asset across the periods that get the use of it. It is not a valuation of the asset and it sets no money aside, which are the two things it is most often mistaken for.',
        ],
        formula: 'Straight line = (Cost − Residual value) ÷ Useful life · Diminishing balance = Carrying amount at the start of the year × the rate',
        table: {
          headers: ['', 'Straight line', 'Diminishing balance'],
          rows: [
            ['Rate applied to', 'Cost', 'Carrying amount'],
            ['Charge over time', 'The same every year', 'Falls every year'],
            ['Residual value', 'Deducted before dividing', 'Not deducted — it is where the writing down stops'],
            ['Suits', 'Assets used evenly, such as premises', 'Assets losing most value early, such as vehicles'],
          ],
        },
        split: {
          left: {
            title: 'Recording it',
            items: [
              'Dr depreciation charge · Cr accumulated depreciation',
              'The cost account is never touched',
              'The charge is an expense; the credit sits against cost',
              'Then write it against each line of the asset register',
            ],
          },
          right: {
            title: 'The year-end order',
            items: [
              'Disposals first — the gain or loss needs a final charge',
              'Then the charge on everything still held',
              'Then reconcile register to ledger: cost and depreciation separately',
              'The reconciliation is the check, not a step',
            ],
          },
        },
        examtrap: 'Depreciation starts when the asset is available for use, not on the invoice date. A full-year policy gives a whole year in the year of purchase and none in the year of sale; pro-rata counts months from availability.',
      },
    },
  };


  /* ══════════════════════════════════════════════════════════════════════════
     OUTCOME 5 — Record period end adjustments. 10% of the assessment, and 25
     key concepts: more than any other outcome in the unit.

     It is also the one Outcomes 6 and 7 consume. Every adjustment written here
     is a line in the adjustments column of the extended trial balance and a
     figure in the statements that follow, so a reader who leaves this outcome
     shaky does not find out until two outcomes later.
     ══════════════════════════════════════════════════════════════════════════ */

  var LO5 = {
    unit: 'faps',
    level: 3,
    title: 'Financial Accounting: Preparing Financial Statements',
    outcome: 5,
    outcomeTitle: 'Record period end adjustments',
    weighting: 10,
    lessons: [
      {
        id: 'L3-FAPS-5A',
        title: 'Why the year end needs adjusting',
        icon: '📅',
        criteria: ['FAPS-5.1.1', 'FAPS-5.1.2'],
        cards: [
          {
            h: 'The ledger records payments; the accounts report periods',
            p: [
              'By the last day of the year the ledger holds an honest record of what was paid and received. It does not yet hold an honest record of what the year **cost** and what the year **earned**, and those are different questions.',
              'An electricity bill covering October to December arrives in January. The electricity was burned in this year; the payment falls in the next. A twelve-month insurance premium paid in October buys three months of this year and nine months of the next, out of one cheque. Rent from a tenant for December arrives in January. In each case the cash and the economic event have come apart.',
              'The **accruals principle** says report the event. So the year end is where the ledger is adjusted from a record of cash into a record of the period — expenses moved into the year that consumed them, income into the year that earned it.',
            ],
            callout: { kind: 'key', text: 'Every adjustment in this outcome does one job: separate when the cash moved from when the economic event happened, and report the second.' },
          },
          {
            h: 'Four adjustments, one idea',
            table: {
              headers: ['Adjustment', 'The cash', 'The event'],
              rows: [
                ['**Accrued expense**', 'Not yet paid at the year end', 'Consumed during the year'],
                ['**Prepaid expense**', 'Paid during the year', 'Partly consumed next year'],
                ['**Accrued income**', 'Not yet received at the year end', 'Earned during the year'],
                ['**Prepaid income**', 'Received during the year', 'Partly earned next year'],
              ],
            },
            p: [
              'The four are the two directions of the same idea applied to the two sides of the profit statement. The vocabulary varies — prepaid income is also called deferred income, and an accrued expense is often just called an accrual — and the treatment does not.',
              'Two more adjustments in this outcome are the same principle wearing different clothes. An **allowance for doubtful receivables** recognises, in the year that made the sales, the risk that some of those sales will never be collected. **Closing inventory** is held back out of this year\'s cost of sales because the goods have not been sold yet, so their cost belongs to the year that sells them.',
            ],
          },
          {
            h: 'Which way profit moves',
            split: {
              left: {
                title: 'Raises profit',
                items: [
                  'Prepaid expense — cost pushed into next year',
                  'Accrued income — revenue pulled into this year',
                  'Higher closing inventory — cost of sales falls',
                  'A reduction in the allowance for doubtful receivables',
                ],
              },
              right: {
                title: 'Lowers profit',
                items: [
                  'Accrued expense — cost pulled into this year',
                  'Prepaid income — revenue pushed into next year',
                  'Lower closing inventory — cost of sales rises',
                  'An increase in the allowance, or a debt written off',
                ],
              },
            },
            p: [
              'Reading those two columns as a list of levers is the point of the ethics material at the end of this outcome. Each adjustment rests on a judgement, each judgement moves profit in a known direction, and a run of them all taken at the favourable end moves it a long way without any single decision being obviously wrong.',
            ],
            examtrap: 'A question can give the adjustment and ask for the effect on profit, or give the effect and ask which adjustment produces it. Learning the direction of each one is worth more than learning the journal, because the journal follows from the direction.',
          },
        ],
        check: [
          {
            type: 'mcq',
            q: 'Which principle requires the year end adjustments in this outcome?',
            opts: ['Accruals', 'Going concern', 'Consistency', 'Money measurement'],
            ans: 0,
            exp: 'The accruals principle records a transaction in the period the economic event happens rather than the period the cash moves. Every adjustment here — accruals, prepayments, allowances, closing inventory — separates those two and reports the event.',
          },
          {
            type: 'truefalse',
            q: 'Identify whether each adjustment raises the reported profit for the year.',
            statements: [
              { text: 'Recognising a prepaid expense at the year end.', answer: true },
              { text: 'Recognising an accrued expense at the year end.', answer: false },
              { text: 'Recognising income earned but not yet received.', answer: true },
              { text: 'Increasing the allowance for doubtful receivables.', answer: false },
            ],
            exp: 'A prepayment removes cost from this year, and accrued income adds revenue to it, so both raise profit. An accrual adds cost, and an increase in the allowance is charged as an expense, so both lower it. The direction of each adjustment is worth knowing before the journal, because the journal follows from it.',
          },
        ],
      },

      {
        id: 'L3-FAPS-5B',
        title: 'Accrued and prepaid expenses',
        icon: '⏳',
        criteria: ['FAPS-5.1.3', 'FAPS-5.1.4', 'FAPS-5.1.6', 'FAPS-5.1.7'],
        cards: [
          {
            h: 'The two journals, and where the other half goes',
            table: {
              headers: ['', 'Journal', 'On the SFP'],
              rows: [
                ['**Accrued expense**', 'Dr the expense · Cr Accruals', 'Current liability — owed and not yet paid'],
                ['**Prepaid expense**', 'Dr Prepayments · Cr the expense', 'Current asset — paid for and not yet had'],
              ],
            },
            p: [
              'Both journals move an amount into or out of the expense account so that what remains is the cost of **this** year. The balancing figure is not lost: it sits on the statement of financial position until the period it belongs to arrives.',
              'The classification is worth taking seriously rather than memorising. An accrual is a liability because the business has had the benefit and still owes for it. A prepayment is an asset because the business has paid and is still owed the benefit. Read that way, neither can be put on the wrong side.',
            ],
            callout: { kind: 'key', text: 'Accrual = had it, not paid = liability. Prepayment = paid, not had it = asset.' },
          },
          {
            h: 'An expense paid in advance',
            worked: {
              title: 'Insurance of £2,400 paid on 1 October for twelve months, year end 31 December',
              problem: 'A business pays £2,400 on 1 October for twelve months of insurance cover to 30 September. Its year end is 31 December. What is the charge for the year, what is the adjustment, and where does the balance sit?',
              steps: [
                { do: 'Count the months of cover falling in this year: October, November and December — three.', why: 'The adjustment turns on how much of what was bought has actually been consumed by the year end. Counting months is the whole calculation.' },
                { do: 'Charge for the year: £2,400 × 3 ÷ 12 = £600.', why: 'Three months of a twelve-month policy. That is the cost of insuring this year, and it is the only part that belongs in this year\'s profit.' },
                { do: 'Prepayment: £2,400 × 9 ÷ 12 = £1,800.', why: 'The other nine months have been paid for and not yet had. The business is owed cover, which makes the amount an asset rather than a cost.' },
                { do: 'Journal: debit prepayments £1,800, credit insurance £1,800.', why: 'The credit takes the nine months back out of the expense account; the debit parks it on the statement of financial position until next year.' },
                { do: 'Check: £600 + £1,800 = £2,400.', why: 'The two pieces must add back to what was paid. If they do not, the months have been counted wrongly — which is the only place this calculation goes wrong.' },
              ],
              answer: 'An insurance charge of £600 for the year, and a prepayment of £1,800 shown as a current asset.',
              tryIt: {
                q: 'A business pays £7,200 on 1 September for a twelve-month software licence to 31 August. Its year end is 31 December. What is the prepayment at the year end?',
                answer: 4800,
                unit: '£',
                hint: 'Count the months that fall after the year end.',
                exp: 'September to December is four months used, leaving eight months paid for and not yet had: £7,200 × 8 ÷ 12 = £4,800. The charge for the year is the other £2,400, and the prepayment is a current asset.',
              },
            },
          },
          {
            h: 'An expense incurred and not yet billed',
            worked: {
              title: 'Electricity paid £4,200 in the year, with £950 estimated as unbilled at the year end',
              problem: 'A business has paid £4,200 for electricity during the year. At the year end the supply for the final period has not been billed, and the amount is estimated at £950. What is the charge for the year and what is the adjustment?',
              steps: [
                { do: 'Start with what has been paid: £4,200 sits in the electricity account.', why: 'The ledger records payments. It is the starting point, not the answer.' },
                { do: 'Add the electricity used and not yet billed: £4,200 + £950 = £5,150.', why: 'The supply was consumed in this year, so its cost belongs to this year whatever date the invoice carries.' },
                { do: 'Journal: debit electricity £950, credit accruals £950.', why: 'The debit brings the charge up to what the year actually used; the credit records that the business still owes for it.' },
                { do: 'The £950 is a current liability on the statement of financial position.', why: 'The benefit has been taken and the money has not been paid, which is what a liability is.' },
                { do: 'An estimate is acceptable here, provided it is a reasonable one made on the best evidence available.', why: 'Faithful representation asks that the process is sound and the figure is not misdescribed, not that every number is exact. A meter reading or the previous quarter\'s bill is the usual evidence.' },
              ],
              answer: 'An electricity charge of £5,150 for the year, and an accrual of £950 shown as a current liability.',
              tryIt: {
                q: 'A business has paid £11,400 in telephone charges during the year. At the year end £1,260 of usage has not been billed. What is the telephone expense for the year?',
                answer: 12660,
                unit: '£',
                hint: 'The unbilled usage happened in this year.',
                exp: 'The usage belongs to the year that consumed it, whatever date the invoice carries: £11,400 + £1,260 = £12,660. The £1,260 is credited to accruals and shown as a current liability.',
              },
            },
          },
        ],
        check: [
          {
            type: 'numeric',
            q: 'A business pays £3,600 on 1 November for twelve months of rent to 31 October. Its year end is 31 December. What is the prepayment at the year end?',
            answer: 3000,
            unit: '£',
            exp: 'November and December are the two months used, leaving ten paid for and not yet had: £3,600 × 10 ÷ 12 = £3,000. The rent charged to this year is the remaining £600.',
          },
          {
            type: 'mcq',
            q: 'How is an accrued expense shown on the statement of financial position?',
            opts: ['As a current liability, because the benefit has been had and not paid for', 'As a current asset, because the payment is still owed to the supplier', 'As a deduction from the relevant expense in the profit statement', 'As a reduction of capital, because the owner bears the eventual cost'],
            ans: 0,
            exp: 'An accrual is an amount the business owes for something it has already consumed, which is the definition of a liability. A prepayment is the mirror image — paid for and not yet had — and is a current asset.',
          },
          {
            type: 'gapfill',
            q: 'Complete the two journals.',
            template: 'To record an accrued expense: {0} the expense account and credit accruals. To record a prepaid expense: debit prepayments and {1} the expense account. The prepayment is shown as a {2}.',
            gaps: [
              { options: ['debit', 'credit', 'reverse'], answer: 0 },
              { options: ['credit', 'debit', 'clear'], answer: 0 },
              { options: ['current asset', 'current liability', 'reduction of capital'], answer: 0 },
            ],
            exp: 'An accrual adds cost to the year, so the expense is debited and the amount owed is credited to accruals. A prepayment takes cost back out, so the expense is credited and the amount is parked as a current asset until the period it belongs to.',
          },
        ],
      },

      {
        id: 'L3-FAPS-5C',
        title: 'Accrued and prepaid income',
        icon: '📨',
        criteria: ['FAPS-5.1.4', 'FAPS-5.1.6', 'FAPS-5.1.7'],
        cards: [
          {
            h: 'The same idea, with the signs the other way round',
            p: [
              'Income adjustments trip people up because the instinct built on expenses points the wrong way. On an expense, money paid in advance is an asset. On income, money **received** in advance is a liability — the business owes a service it has not yet provided.',
              'So the two rules are mirrors rather than copies. Income earned and not yet received is an asset, because somebody owes the business. Income received and not yet earned is a liability, because the business owes somebody.',
            ],
            table: {
              headers: ['', 'Journal', 'On the SFP'],
              rows: [
                ['**Accrued income**', 'Dr Accrued income · Cr the income account', 'Current asset — earned and not yet received'],
                ['**Prepaid (deferred) income**', 'Dr the income account · Cr Prepaid income', 'Current liability — received and not yet earned'],
              ],
            },
            callout: { kind: 'key', text: 'Accrued income = earned it, not received = asset. Prepaid income = received it, not earned = liability.' },
          },
          {
            h: 'Rent from a tenant',
            worked: {
              title: 'Sublet at £900 a month, £9,900 received by the year end',
              problem: 'A business sublets part of its premises for £900 a month. By the year end it has received £9,900 in rent for the year. What is the rental income for the year and what is the adjustment?',
              steps: [
                { do: 'Work out what the year earned: £900 × 12 = £10,800.', why: 'The tenant had the use of the premises for twelve months, so the business earned twelve months of rent whether or not the money arrived.' },
                { do: 'Compare with what was received: £10,800 − £9,900 = £900.', why: 'One month is outstanding. The income was earned in this year, so it belongs in this year.' },
                { do: 'Journal: debit accrued income £900, credit rental income £900.', why: 'The credit brings the income up to what the year earned; the debit records that the tenant owes it.' },
                { do: 'The £900 is a current asset on the statement of financial position.', why: 'Somebody owes the business money for something already provided, which is what a receivable is.' },
              ],
              answer: 'Rental income of £10,800 for the year, and accrued income of £900 shown as a current asset.',
              tryIt: {
                q: 'A business charges £400 a month for maintenance contracts. By the year end it has received £5,600 covering the twelve months of the year. What is the deferred income at the year end?',
                answer: 800,
                unit: '£',
                hint: 'Compare what the year earned with what came in.',
                exp: 'The year earned £400 × 12 = £4,800 and £5,600 arrived, so £5,600 − £4,800 = £800 has been received for service not yet provided. That is deferred income, and it is a current liability rather than an asset.',
              },
            },
          },
          {
            h: 'Telling the four apart under pressure',
            flow: ['Is it income or expense?', 'Has the cash moved yet?', 'Asset or liability follows'],
            p: [
              'Under time pressure the reliable route is two questions rather than four memorised rules.',
              'First: **has the business had the benefit, or given it?** An expense the business has had is a cost of this year. Income the business has earned is revenue of this year. That settles the profit statement without thinking about cash at all.',
              'Second: **has the cash moved?** If the event happened and the cash has not, somebody owes somebody — an accrued expense is a liability, accrued income an asset. If the cash moved and the event has not, the same logic reversed — a prepaid expense is an asset, prepaid income a liability.',
            ],
            examtrap: 'The word "prepaid" describes who paid early, and that changes which side it lands on. Prepaid expense: the business paid early, so the business is owed — asset. Prepaid income: the customer paid early, so the business owes — liability.',
          },
        ],
        check: [
          {
            type: 'numeric',
            q: 'A business rents out a workshop for £750 a month. By the year end it has received £8,250 for the year. What is the accrued income at the year end?',
            answer: 750,
            unit: '£',
            exp: 'The year earned £750 × 12 = £9,000 and £8,250 arrived, so £9,000 − £8,250 = £750 is earned and not yet received. It is credited to rental income and shown as a current asset.',
          },
          {
            type: 'mcq',
            q: 'A customer pays in December for a service the business will provide in February. How is the amount treated at the 31 December year end?',
            opts: ['Deferred income, shown as a current liability', 'Accrued income, shown as a current asset', 'Revenue of the year, because the cash has been received', 'A prepayment, shown as a current asset'],
            ans: 0,
            exp: 'The money has arrived and the service has not been provided, so the business owes it — a liability. It is taken out of income this year and recognised in February, when it is earned. A prepayment is the expense-side mirror of this and sits on the other side.',
          },
          {
            type: 'truefalse',
            q: 'Identify whether each classification is correct.',
            statements: [
              { text: 'Income earned but not yet received is a current asset.', answer: true },
              { text: 'Income received but not yet earned is a current asset.', answer: false },
              { text: 'An expense paid but not yet consumed is a current asset.', answer: true },
              { text: 'An expense consumed but not yet paid is a current asset.', answer: false },
            ],
            exp: 'Earned and not received means somebody owes the business — an asset. Received and not earned means the business owes a service — a liability. Paid and not consumed means the business is owed the benefit — an asset. Consumed and not paid means the business owes for it — a liability.',
          },
        ],
      },

      {
        id: 'L3-FAPS-5D',
        title: 'Reversing last year\'s adjustments',
        icon: '🔁',
        criteria: ['FAPS-5.1.5', 'FAPS-5.1.8'],
        cards: [
          {
            h: 'An adjustment that is never reversed is counted twice',
            p: [
              'Last year ended with an accrual of £950 for unbilled electricity. In February the bill arrives and is paid, and the payment goes to the electricity account like every other payment.',
              'If nothing else happens, that £950 has been charged to profit twice: once last year as the accrual, and again this year as part of the payment. The reversal is what stops it.',
              'At the start of the new period the previous adjustment is put back the other way: **debit accruals £950, credit electricity £950**. The electricity account now opens with a £950 credit, so when the payment arrives the two cancel and only the part belonging to this year is left.',
            ],
            callout: { kind: 'key', text: 'Every accrual and prepayment is reversed at the start of the next period. Without the reversal the amount lands in profit in both years.' },
          },
          {
            h: 'An expense account across a year end',
            example: {
              title: 'Electricity: the £950 accrued last year, £4,600 paid this year, £1,100 accrued this year',
              rows: [
                ['', 'Debit', 'Credit'],
                ['Reversal of last year\'s accrual', '', '£950'],
                ['Payments made during the year', '£4,600', ''],
                ['This year\'s accrual', '£1,100', ''],
                ['**Charge to this year\'s profit**', '**£4,750**', ''],
              ],
            },
            p: [
              'The charge is £4,600 − £950 + £1,100 = £4,750, and each of the three lines earns its place. The payments include an amount that belonged to last year, so the reversal takes it out. The supply used at the end of this year has not been paid for, so the new accrual puts it in.',
              'A prepayment runs the same way with the signs swapped. Last year\'s prepayment is reversed by debiting the expense — the cover was paid for last year and consumed in this one, so this year carries it.',
            ],
          },
          {
            h: 'What accounting software does, and does not, do',
            p: [
              'Software will hold a recurring journal and post the reversal automatically on the first day of the new period, which removes the commonest cause of a double count. The specification names this and it is worth knowing why it matters.',
              'What it does not do is decide whether the adjustment was right. A recurring accrual set up three years ago at £950 a quarter will go on posting £950 a quarter after the supplier has changed the tariff, after the premises have been given up, and after the contract has ended. Both sides of the entry are correct, the reversal happens on time, and the figure is wrong.',
              'An accrual identical to last year\'s to the pound is the standard example of something professional scepticism is meant to notice. It is not evidence of anything by itself; it is a reason to look at the underlying bill.',
            ],
            examtrap: 'A question giving an opening accrual, the payments in the year and a closing accrual is asking for the charge, not for the closing balance. Payments, less the opening adjustment, plus the closing one.',
          },
        ],
        check: [
          {
            type: 'numeric',
            q: 'An expense account has an opening accrual of £1,300 brought forward. Payments in the year were £9,800, and £1,750 is accrued at the year end. What is the charge to this year\'s profit?',
            answer: 10250,
            unit: '£',
            exp: 'The payments include £1,300 that belonged to last year, and this year has used £1,750 it has not paid for: £9,800 − £1,300 + £1,750 = £10,250. Forgetting the opening reversal charges last year\'s cost twice.',
          },
          {
            type: 'mcq',
            q: 'What happens if last year\'s accrual is never reversed?',
            opts: ['The amount is charged to profit in both years', 'The amount is charged to profit in neither year', 'The statement of financial position balances but profit is understated', 'Nothing, provided the same amount is accrued again this year'],
            ans: 0,
            exp: 'The accrual charged the cost to last year. When the payment is made it goes to the expense account and charges it again, so the same cost reaches profit twice. The reversal removes the first charge as the payment replaces it.',
          },
          {
            type: 'truefalse',
            q: 'Identify whether each statement about reversals is correct.',
            statements: [
              { text: 'Reversing last year\'s accrual credits the expense account at the start of the new period.', answer: true },
              { text: 'An accrual identical to last year\'s to the pound is a reason to check the underlying bill.', answer: true },
              { text: 'Accounting software that posts reversals automatically also confirms the amount is still right.', answer: false },
              { text: 'A prepayment brought forward is reversed by crediting the expense account.', answer: false },
            ],
            exp: 'The reversal is the opposite of the original entry, so an accrual that debited the expense is reversed by crediting it. An unchanged figure is not proof of error and is worth a look. Software applies the rule it was given and will post a stale figure indefinitely. A prepayment credited the expense originally, so its reversal debits it — this year consumes what last year paid for.',
          },
        ],
      },
      {
        id: 'L3-FAPS-5E',
        title: 'Irrecoverable debts',
        icon: '❌',
        criteria: ['FAPS-5.2.2', 'FAPS-5.2.3', 'FAPS-5.2.5'],
        cards: [
          {
            h: 'Writing a debt off',
            p: [
              'A customer has gone into liquidation, or has simply stopped answering, and the business accepts the money is not coming. The debt is **irrecoverable** and it is written off.',
              'Writing off does two things at once. It removes the receivable, because the business no longer has anything worth calling an asset. And it charges the loss to profit, because the sale was recognised as revenue when it was made and something has to undo that.',
              'The customer\'s own account in the memorandum receivables ledger is cleared to match, so the two records stay in step. The write-off is made by journal, and the journal carries a narrative — which customer, which invoices, and on what evidence. A write-off is a decision to give up on money the business is owed, and it should be traceable to whoever made it.',
            ],
            example: {
              title: 'Writing off £1,400 owed by a customer in liquidation',
              rows: [
                ['Account', 'Debit', 'Credit'],
                ['Irrecoverable debts expense', '£1,400', ''],
                ['Sales ledger control account', '', '£1,400'],
              ],
            },
            callout: { kind: 'key', text: 'Write-off: debit irrecoverable debts expense, credit the sales ledger control account. The asset goes and the loss reaches profit.' },
          },
          {
            h: 'When a written-off debt is paid after all',
            p: [
              'Occasionally a debt written off in a previous year is paid — a liquidator makes a distribution, or a customer who vanished reappears. The receivable no longer exists in the ledger, so the receipt cannot be posted against it.',
              'The entry is **debit bank, credit irrecoverable debts**. The credit goes back to the expense account, reducing the charge for the year in which the money actually turned up.',
              'This is not a correction of an earlier error, and the previous year is not reopened. The write-off was a reasonable judgement on the evidence available at the time, and the recovery is new information belonging to the year it arrived in. Some businesses present the credit separately as irrecoverable debts recovered rather than netting it against the charge; both are met in practice.',
            ],
          },
          {
            h: 'Three things that are not the same',
            split: {
              left: {
                title: 'The distinctions the specification asks for',
                items: [
                  '**Irrecoverable debt** — accepted as lost, removed from receivables',
                  '**Specific allowance** — a named customer looks doubtful, and the debt stays',
                  '**General allowance** — a proportion of the rest will not pay, based on experience',
                ],
              },
              right: {
                title: 'What changes between them',
                items: [
                  'A write-off reduces receivables; an allowance never does',
                  'A write-off is certain; an allowance is an estimate of risk',
                  'An allowance is shown as a deduction from receivables, which stay at full value underneath',
                  'A doubtful debt that later goes bad is written off then — and the allowance against it is released',
                ],
              },
            },
            p: [
              'The line between a write-off and an allowance is the line between a fact and a forecast, and the accounting keeps them apart on purpose. A reader can see how much the business has given up on and, separately, how much of what remains it expects to lose.',
            ],
            examtrap: 'An allowance never touches the receivables ledger. The customer still owes the money and will still be chased for it — the allowance is the business\'s own estimate of what it will collect, not a message to the customer.',
          },
        ],
        check: [
          {
            type: 'mcq',
            q: 'What is the journal to write off an irrecoverable debt of £2,300?',
            opts: ['Debit irrecoverable debts expense, credit sales ledger control account', 'Debit sales ledger control account, credit irrecoverable debts expense', 'Debit allowance for doubtful receivables, credit sales ledger control account', 'Debit irrecoverable debts expense, credit allowance for doubtful receivables'],
            ans: 0,
            exp: 'The debit charges the loss to profit and the credit removes the receivable, because the business no longer holds anything worth calling an asset. The allowance account is not involved in a write-off — that is the separate estimate against the debts still expected to be collected.',
          },
          {
            type: 'mcq',
            q: 'A debt written off two years ago is unexpectedly paid. How is the receipt recorded?',
            opts: ['Debit bank, credit irrecoverable debts', 'Debit bank, credit sales ledger control account', 'Debit bank, credit sales revenue for the year', 'Reopen the earlier year and reverse the original write-off'],
            ans: 0,
            exp: 'The receivable no longer exists, so the receipt cannot be posted against it, and the sale was recognised as revenue years ago. Crediting irrecoverable debts reduces the charge in the year the money actually arrived. The original write-off was a reasonable judgement on the evidence then available and is not an error to correct.',
          },
          {
            type: 'truefalse',
            q: 'Identify whether each statement is correct.',
            statements: [
              { text: 'An allowance for doubtful receivables reduces the balance on the sales ledger control account.', answer: false },
              { text: 'A write-off removes the debt from receivables.', answer: true },
              { text: 'A customer covered by a specific allowance is still pursued for payment.', answer: true },
              { text: 'A general allowance is based on experience of how much of the remaining balance will not be collected.', answer: true },
            ],
            exp: 'An allowance sits in its own account and is shown as a deduction from receivables on the face of the statement; the control account is untouched and the customer still owes the money. A write-off is different — the debt is gone from the records. And a general allowance is exactly what its name says: an estimate applied to the balance as a whole.',
          },
        ],
      },

      {
        id: 'L3-FAPS-5F',
        title: 'Allowances for doubtful receivables',
        icon: '⚖️',
        criteria: ['FAPS-5.2.1', 'FAPS-5.2.4', 'FAPS-5.2.5'],
        cards: [
          {
            h: 'Only the movement reaches profit',
            p: [
              'The allowance is a running balance, not a yearly charge. It sits against receivables and is carried forward from one year to the next, and what reaches the statement of profit or loss each year is only the **change** in it.',
              'That is the single most important thing about this calculation and the place most marks are lost. A business with an opening allowance of £2,100 that now requires £5,600 does not charge £5,600. It charges the £3,500 by which the allowance has to rise.',
              'The reasoning is the accruals principle again. The risk on last year\'s sales was already charged to last year. Charging the whole allowance every year would charge the same risk repeatedly for as long as the customer kept owing.',
            ],
            formula: 'Charge (or credit) to profit = Allowance required at the year end − Allowance brought forward',
            callout: { kind: 'key', text: 'Work out the allowance required, compare it with the one brought forward, and put only the difference through profit.' },
          },
          {
            h: 'A specific and a general allowance together',
            worked: {
              title: 'Receivables £84,000, one doubtful debt of £4,000, general allowance 2%, opening allowance £2,100',
              problem: 'At the year end trade receivables are £84,000. One customer owing £4,000 is in dispute and the whole amount is considered doubtful. Policy is a general allowance of 2% of the remaining receivables. The allowance brought forward is £2,100. What is the adjustment?',
              steps: [
                { do: 'Take the specific allowance first: £4,000.', why: 'A named doubtful debt is dealt with in full and on its own evidence. It is then removed from the population the general allowance is applied to, or it would be counted twice.' },
                { do: 'Find the remaining receivables: £84,000 − £4,000 = £80,000.', why: 'The general allowance is an estimate about the debts that carry no specific concern, so the specifically doubtful one is taken out first.' },
                { do: 'Apply the general rate: £80,000 × 2% = £1,600.', why: 'Policy applied to the rest of the balance. The rate comes from the organisation\'s own experience of what it collects.' },
                { do: 'Total allowance required: £4,000 + £1,600 = £5,600.', why: 'This is the balance that must stand on the allowance account at the year end — not the amount charged.' },
                { do: 'Compare with the allowance brought forward: £5,600 − £2,100 = £3,500.', why: 'Only the movement reaches profit. The £2,100 was charged in an earlier year and is not charged again.' },
                { do: 'Journal: debit adjustment to allowance for doubtful receivables £3,500, credit allowance for doubtful receivables £3,500.', why: 'The debit is the expense for the year; the credit raises the allowance to the required £5,600.' },
              ],
              answer: 'A charge of £3,500 to profit, and an allowance of £5,600 shown as a deduction from receivables.',
              tryIt: {
                q: 'Receivables are £60,000, of which £2,000 is specifically doubtful. The general allowance is 3% of the remainder and the allowance brought forward is £3,000. What is the charge to profit for the year?',
                answer: 740,
                unit: '£',
                hint: 'Required allowance first, then compare with the one brought forward.',
                exp: 'The remainder is £60,000 − £2,000 = £58,000, and 3% of that is £1,740. The allowance required is £2,000 + £1,740 = £3,740, against £3,000 brought forward, so £3,740 − £3,000 = £740 is charged.',
              },
            },
          },
          {
            h: 'When the allowance falls',
            p: [
              'A required allowance smaller than the one brought forward reverses the journal. Debit the allowance, credit the adjustment account — and the credit reduces expenses, raising profit.',
              'A business collecting better than it expected should report that, and this is how. What it must not do is set the rate to produce the result: a general allowance quietly cut from 3% to 1% releases two thirds of the balance into profit in a single year, and nothing on the face of the accounts announces it.',
              'On the statement of financial position the allowance is presented as a deduction from trade receivables, so a reader sees both figures. Receivables of £84,000 less an allowance of £5,600 gives £84,000 − £5,600 = £78,400 as the net figure, with the gross amount still visible above it.',
            ],
            examtrap: 'A question giving "the allowance is to be 4% of receivables" is telling you the required balance, not the charge. Read what the opening allowance is before writing anything down — if it is not given, look for it in the trial balance rather than assuming it is nil.',
          },
        ],
        check: [
          {
            type: 'numeric',
            q: 'Receivables at the year end are £120,000, none specifically doubtful. Policy is a general allowance of 2.5%. The allowance brought forward is £2,400. What is the charge to profit for the year?',
            answer: 600,
            unit: '£',
            exp: 'The allowance required is £120,000 × 2.5% = £3,000, against £2,400 brought forward, so only the movement of £3,000 − £2,400 = £600 is charged. Charging the whole £3,000 would charge last year\'s risk a second time.',
          },
          {
            type: 'mcq',
            q: 'The allowance required at the year end is £1,800 and the allowance brought forward is £2,500. What is the effect on this year\'s profit?',
            opts: ['Profit rises by £700, as the allowance is reduced', 'Profit falls by £700, as the allowance is adjusted', 'Profit rises by £1,800, as the allowance is released', 'Profit falls by £1,800, as the allowance is recreated'],
            ans: 0,
            exp: 'The allowance has to fall by £2,500 − £1,800 = £700. The journal debits the allowance and credits the adjustment account, and a credit to an expense account reduces expenses — so profit rises by the movement, not by the whole balance.',
          },
          {
            type: 'truefalse',
            q: 'Identify whether each statement about allowances is correct.',
            statements: [
              { text: 'Only the movement in the allowance is charged or credited to profit.', answer: true },
              { text: 'A specifically doubtful debt is excluded before the general percentage is applied.', answer: true },
              { text: 'The allowance is shown on the statement of financial position as a deduction from trade receivables.', answer: true },
              { text: 'An allowance brought forward of nil means the whole required allowance is charged this year.', answer: true },
              { text: 'Raising an allowance increases the reported profit for the year.', answer: false },
            ],
            exp: 'The balance is carried forward, so only the change is this year\'s cost. Excluding the specific debt first stops it being covered twice. The gross receivables and the allowance are both shown, so a reader can see each. With nothing brought forward the movement is the whole balance. And raising an allowance is an expense, so it lowers profit.',
          },
        ],
      },

      {
        id: 'L3-FAPS-5G',
        title: 'Valuing inventory',
        icon: '📦',
        criteria: ['FAPS-5.3.1', 'FAPS-5.3.2', 'FAPS-5.3.3', 'FAPS-5.3.4', 'FAPS-5.3.5', 'FAPS-5.3.6'],
        cards: [
          {
            h: 'Why closing inventory is an adjustment at all',
            p: [
              'Purchases are charged to the profit statement as they are made. At the year end some of what was bought is still on the shelf, unsold, and its cost belongs to the year that sells it rather than the year that bought it.',
              'Closing inventory is how that cost is held back. It is deducted in arriving at cost of sales and appears as a current asset, and next year it becomes the opening inventory and is charged then.',
              'The arithmetic makes the effect on profit direct and worth committing to memory: **cost of sales = opening inventory + net purchases − closing inventory**. A higher closing inventory means a lower cost of sales and a higher profit. Overstate the closing figure and profit is overstated by exactly the same amount.',
            ],
            callout: { kind: 'key', text: 'Closing inventory is deducted from cost of sales, so it and profit move together, pound for pound.' },
          },
          {
            h: 'The rule, and what goes into cost',
            p: [
              'The standard is **IAS 2, Inventories**, and its rule is that inventory is measured at the **lower of cost and net realisable value**.',
              '**Cost** is what it took to get the goods to their present location and condition: the purchase price net of trade discount, import duties and irrecoverable taxes, carriage inwards, and for manufactured goods the costs of conversion — direct labour and an appropriate share of production overheads.',
              '**Net realisable value** is what the goods will fetch less what it will cost to finish and sell them: estimated selling price, less costs of completion, less selling costs.',
            ],
            split: {
              left: {
                title: 'Included in cost',
                items: [
                  'Purchase price, net of trade discount',
                  'Import duties and irrecoverable taxes',
                  'Carriage inwards',
                  'Direct labour on manufactured goods',
                  'Production overheads properly attributable',
                ],
              },
              right: {
                title: 'Excluded from cost',
                items: [
                  'Selling and distribution costs',
                  'Carriage outwards',
                  'Administrative overheads',
                  'Storage, unless the production process requires it',
                  'Abnormal waste and rectification',
                ],
              },
            },
            examtrap: 'Carriage inwards is part of cost and carriage outwards is not. Inwards brought the goods to the business, which is part of getting them into a saleable condition; outwards is a cost of selling them and belongs in expenses.',
          },
          {
            h: 'Item by item, and why it matters',
            example: {
              title: 'Three lines, compared two ways',
              rows: [
                ['Item', 'Units', 'Cost each', 'NRV each', 'Lower', 'Value'],
                ['A', '200', '£12', '£15', '£12', '£2,400'],
                ['B', '150', '£20', '£17', '£17', '£2,550'],
                ['C', '300', '£8', '£8', '£8', '£2,400'],
                ['**Item by item**', '', '', '', '', '**£7,350**'],
                ['Totals compared', '', '£7,800', '£7,950', '£7,800', '£7,800'],
              ],
            },
            p: [
              'The comparison of cost with net realisable value is made **on an individual item basis**, and this is not a technicality — the two methods give different answers, and comparing totals always gives the higher one.',
              'Item by item gives £2,400 + £2,550 + £2,400 = £7,350. Comparing the totals gives £7,800, because item A\'s unrealised gain of £600 has been allowed to hide item B\'s real loss of £450.',
              'The difference of £7,800 − £7,350 = £450 is exactly the loss on B, and prudence is what forbids it being netted off. A fall in value that has happened is recognised; a rise that has not been realised is not.',
              'Accounting software will hold quantities, run the valuation and produce the figure. It cannot tell that line B is now unsaleable at cost, because nothing in the system knows the market moved — somebody has to enter the new net realisable value.',
            ],
          },
        ],
        check: [
          {
            type: 'numeric',
            q: 'Inventory has three lines. A: 100 units, cost £30, NRV £34. B: 80 units, cost £25, NRV £19. C: 50 units, cost £40, NRV £44. What is the closing inventory value?',
            answer: 6520,
            unit: '£',
            exp: 'Each line is taken at the lower of cost and net realisable value: A at cost 100 × £30 = £3,000, B at NRV 80 × £19 = £1,520, C at cost 50 × £40 = £2,000. The total is £3,000 + £1,520 + £2,000 = £6,520.',
          },
          {
            type: 'mcq',
            q: 'Closing inventory is overstated by £5,000. What is the effect on the reported results?',
            opts: ['Profit is overstated by £5,000 and current assets are overstated', 'Profit is understated by £5,000 and current assets are overstated', 'Profit is overstated by £5,000 and current assets are unaffected', 'Profit is unaffected and only the statement of financial position is wrong'],
            ans: 0,
            exp: 'Closing inventory is deducted in arriving at cost of sales, so an overstatement reduces cost of sales and raises profit pound for pound. The same figure is the current asset on the statement of financial position, so both are overstated by £5,000.',
          },
          {
            type: 'truefalse',
            q: 'Identify whether each cost may be included in the value of inventory.',
            statements: [
              { text: 'Carriage inwards on goods bought for resale.', answer: true },
              { text: 'Carriage outwards on goods delivered to customers.', answer: false },
              { text: 'Import duty paid on goods brought in from abroad.', answer: true },
              { text: 'The sales team\'s commission on the goods.', answer: false },
              { text: 'Direct labour used in manufacturing the goods.', answer: true },
            ],
            exp: 'Cost is what it took to bring the goods to their present location and condition, so carriage inwards, import duty and direct labour all qualify. Carriage outwards and sales commission are costs of selling and are charged as expenses of the period — they are deducted in arriving at net realisable value, not added to cost.',
          },
          {
            type: 'gapfill',
            q: 'Complete the IAS 2 rule.',
            template: 'Inventory is measured at the lower of cost and {0}, compared on {1}. Net realisable value is the estimated selling price less the costs of completion and the costs {2}.',
            gaps: [
              { options: ['net realisable value', 'replacement cost', 'original invoice price'], answer: 0 },
              { options: ['an individual item basis', 'the total of the inventory', 'a category-by-category basis'], answer: 0 },
              { options: ['to sell', 'of storage', 'of administration'], answer: 0 },
            ],
            exp: 'Comparing totals lets an unrealised gain on one line hide a real loss on another, which is why the comparison is made item by item. Net realisable value looks forward to what the goods will actually fetch, after what it will cost to finish and sell them.',
          },
        ],
      },

      {
        id: 'L3-FAPS-5H',
        title: 'Recording closing inventory',
        icon: '🧾',
        criteria: ['FAPS-5.3.7', 'FAPS-5.3.8'],
        cards: [
          {
            h: 'One figure, two places',
            p: [
              'Closing inventory is the one adjustment that appears twice in the financial statements at the same value: once as a deduction in arriving at cost of sales, and once as a current asset.',
              'The journal says so directly. **Debit inventory (asset), credit inventory (cost of sales)** — one figure, one debit, one credit, and both halves land where they are needed.',
              'Next year the same balance is the **opening** inventory and is charged, which is what closes the loop: the cost is held back for exactly one year and then meets the revenue it helped produce. That is why the opening figure appears as a cost in the statement of profit or loss while the closing figure appears as a deduction — they are the same goods, entering and leaving.',
            ],
            example: {
              title: 'Recording closing inventory of £7,350',
              rows: [
                ['Account', 'Debit', 'Credit'],
                ['Inventory — statement of financial position', '£7,350', ''],
                ['Inventory — cost of sales', '', '£7,350'],
              ],
            },
            callout: { kind: 'key', text: 'Debit the asset, credit cost of sales — the same figure, appearing on both statements at once.' },
          },
          {
            h: 'Determining the figure in the first place',
            flow: ['Count what is physically there', 'Value each line at the lower of cost and NRV', 'Adjust for goods in transit and on sale or return', 'Journal it in'],
            p: [
              'The count comes before the valuation, and it is a physical count rather than a report from the system. What the system holds is what it was told; what the count finds is what is there.',
              'Three adjustments are commonly needed once the count is done. **Goods in transit** are included if the risks and rewards have passed to the business, which turns on the delivery terms rather than on where the lorry is. **Goods on sale or return** held by a customer are still the business\'s inventory until the customer accepts them. And **goods held for others** on consignment are excluded, however much of the warehouse they occupy.',
              'A count taken a few days either side of the year end is workable provided the movements between the count date and the year end are added back or taken out. What is not workable is using last year\'s figure with a percentage on it.',
            ],
            examtrap: 'A question giving a count total and then a list of adjustments is asking for the corrected figure. Work through the list rather than reaching for the total — the adjustments are where the marks are.',
          },
        ],
        check: [
          {
            type: 'mcq',
            q: 'What is the journal to record closing inventory of £9,400?',
            opts: ['Debit inventory (asset) £9,400, credit inventory (cost of sales) £9,400', 'Debit inventory (cost of sales) £9,400, credit inventory (asset) £9,400', 'Debit purchases £9,400, credit inventory (asset) £9,400', 'Debit inventory (asset) £9,400, credit purchases £9,400'],
            ans: 0,
            exp: 'One figure lands in both statements: the debit creates the current asset and the credit deducts the amount in arriving at cost of sales. Next year the same balance becomes opening inventory and is charged then.',
          },
          {
            type: 'truefalse',
            q: 'Identify whether each item is included in the closing inventory of the business counting it.',
            statements: [
              { text: 'Goods held by a customer on sale or return, not yet accepted.', answer: true },
              { text: 'Goods held in the warehouse on consignment for another business.', answer: false },
              { text: 'Goods in transit where the risks and rewards have already passed to the business.', answer: true },
              { text: 'Goods sold and invoiced but awaiting collection by the customer.', answer: false },
            ],
            exp: 'Sale or return stock remains the seller\'s until the customer accepts it. Consignment stock belongs to whoever owns it, not whoever stores it. Goods in transit turn on the delivery terms rather than on physical location. And goods sold and invoiced have passed to the customer even if they are still on the premises.',
          },
        ],
      },

      {
        id: 'L3-FAPS-5I',
        title: 'The pressure at the period end',
        icon: '🧭',
        criteria: ['FAPS-5.4.1', 'FAPS-5.4.2', 'FAPS-5.4.3', 'FAPS-5.4.4'],
        cards: [
          {
            h: 'Every adjustment in this outcome is a judgement',
            p: [
              'Look back over the outcome and count what has actually been decided rather than calculated. How much unbilled electricity to accrue. Whether a customer is doubtful, and at what percentage. What the general allowance rate should be. Whether a line of inventory will still fetch cost.',
              'None of those has a right answer printed on an invoice, and each of them moves profit. Taken one at a time, each can be argued either way inside a range a reviewer would accept. Taken together, and all at the same end of their ranges, they move the reported result a long way.',
              'That is what makes the period end the point in the accounting year where the scope to affect the reported results is widest, and it is why the specification attaches ethics to this outcome specifically rather than leaving it in Outcome 1.',
            ],
            callout: { kind: 'key', text: 'Period end adjustments are where estimates concentrate, so it is where a run of individually defensible judgements can add up to a materially misleading result.' },
          },
          {
            h: 'Dates, and what software will not question',
            p: [
              'The specification singles out one mechanical risk alongside the judgemental ones: accounting software requires the user to enter dates accurately.',
              'An invoice dated into the wrong period lands in the wrong year, and nothing in the system objects. A recurring accrual with the wrong start date reverses in the wrong month. A cut-off that puts three days of January sales into December inflates revenue and receivables together, and the trial balance still balances perfectly.',
              'None of these produces an error message, because none of them is an error in arithmetic. They are errors about **when**, and the year end is the one moment in the calendar when when matters most.',
            ],
            examtrap: 'Cut-off is a favourite scenario: goods despatched on 2 January invoiced as 31 December, or a December purchase invoice entered in January. Ask which period the underlying event falls in, not which period the paperwork says.',
          },
          {
            h: 'What follows from getting it wrong',
            split: {
              left: {
                title: 'The consequences the specification names',
                items: [
                  'Non-compliance with regulations',
                  'Misinformed decisions by the users of the accounts',
                  'A lender advancing money against a profit that was not earned',
                  'An investor buying into a business on figures that flatter it',
                ],
              },
              right: {
                title: 'What is expected of the preparer',
                items: [
                  '**Professional scepticism** — question figures that arrive with an explanation attached',
                  '**Integrity** — do not sign off what you believe to be wrong',
                  '**Objectivity** — let the evidence set the figure, whoever would prefer another',
                  'Say so in writing, and escalate, when the answer is not accepted',
                ],
              },
            },
            p: [
              'The consequences are worth stating plainly because they are what makes this more than a matter of tidiness. Somebody outside the business acts on these figures with their own money, and they have no way of checking the judgements behind them.',
            ],
          },
          {
            h: 'The three pressures, and a way through them',
            table: {
              headers: ['Pressure', 'How it arrives', 'What it is asking you to do'],
              rows: [
                ['**Time**', 'The deadline is fixed and the work is not finished', 'Accept an estimate you have not evidenced'],
                ['**A favourable result**', 'A covenant, a bonus, a funding round', 'Take every judgement at the helpful end of its range'],
                ['**Authority**', 'The request comes from somebody senior', 'Treat their preference as the answer'],
              ],
            },
            p: [
              'They usually arrive together — at the year end, from somebody senior, with a deadline — and that combination is what makes a small concession feel reasonable.',
              'The defence is to keep the question technical. Not "is this person entitled to ask me", which is a question about the hierarchy and has no good answer, but "what does the evidence support", which has the same answer whoever is asking. If the evidence supports an allowance of £5,600, it supports £5,600 whether the request came from a colleague or a director.',
              'Where the answer is not accepted, the next steps are ordinary rather than dramatic: put the position and the reasoning in writing, escalate within the organisation, and take advice from your professional body. Resignation is the last resort, not the first.',
            ],
          },
        ],
        check: [
          {
            type: 'mcq',
            q: 'Why does the specification attach ethical considerations to period end adjustments in particular?',
            opts: ['They concentrate estimates, so several judgements can move profit a long way', 'They are the only entries a bookkeeper makes without a supporting document', 'They are the only adjustments accounting software cannot calculate', 'They are the last entries made, so there is no time to review them'],
            ans: 0,
            exp: 'Accruals, allowances and inventory valuations all rest on judgement, and each moves profit in a known direction. Taken together at the favourable end of their ranges they can produce a materially misleading result without any single decision being obviously wrong.',
          },
          {
            type: 'mcq',
            q: 'Goods are despatched on 2 January and the invoice is dated 31 December, the year end. What should happen?',
            opts: ['The sale belongs to the new year, whatever the invoice says', 'The sale belongs to the old year, because the invoice is dated in it', 'The sale is split between the two years on a time basis', 'The sale is recorded twice and one entry reversed later'],
            ans: 0,
            exp: 'The underlying event is the despatch, and that falls in the new year. Recognising it in December overstates both revenue and receivables, and the trial balance still balances — which is why a cut-off error is not caught by arithmetic and has to be caught by asking which period the event falls in.',
          },
          {
            type: 'truefalse',
            q: 'Identify whether each response to period end pressure is appropriate.',
            statements: [
              { text: 'Holding an allowance at the figure the evidence supports after a request to reduce it.', answer: true },
              { text: 'Accepting an unevidenced estimate because the reporting deadline is fixed.', answer: false },
              { text: 'Putting the position and the reasoning in writing when it is not accepted.', answer: true },
              { text: 'Resigning immediately on the first disagreement about an estimate.', answer: false },
            ],
            exp: 'Objectivity keeps the figure with the evidence whoever prefers otherwise. A deadline is a reason to work faster, not to report something unsupported. Writing the position down and escalating is the ordinary next step. Resignation is the last resort after the internal routes and professional advice have been exhausted, not the first move.',
          },
        ],
      },
    ],
    cheatsheet: {
      id: 'L3-FAPS-5S',
      title: 'Period end adjustments on one card',
      icon: '🗂️',
      card: {
        h: 'Outcome 5 at a glance',
        p: [
          'Every adjustment here does one job: separate the moment the cash moved from the moment the economic event happened, and report the event.',
        ],
        table: {
          headers: ['Adjustment', 'Journal', 'On the position statement'],
          rows: [
            ['Accrued expense', 'Dr the expense · Cr accruals', 'Current liability — had it, not paid'],
            ['Prepaid expense', 'Dr prepayments · Cr the expense', 'Current asset — paid, not had it'],
            ['Accrued income', 'Dr accrued income · Cr the income', 'Current asset — earned, not received'],
            ['Prepaid income', 'Dr the income · Cr deferred income', 'Current liability — received, not earned'],
            ['Irrecoverable debt', 'Dr irrecoverable debts · Cr receivables control', 'The asset goes'],
            ['Allowance movement', 'Dr the adjustment · Cr the allowance', 'Shown against receivables, ledger untouched'],
            ['Closing inventory', 'Dr inventory · Cr cost of sales', 'Current asset, and a deduction from cost'],
          ],
        },
        formula: 'Charge (or credit) to profit = Allowance required at the year end − Allowance brought forward · Inventory = lower of cost and net realisable value, item by item',
        split: {
          left: {
            title: 'Raises profit',
            items: [
              'A prepaid expense — cost pushed into next year',
              'Accrued income — revenue pulled into this year',
              'Higher closing inventory',
              'A fall in the allowance',
            ],
          },
          right: {
            title: 'Lowers profit',
            items: [
              'An accrued expense — cost pulled into this year',
              'Prepaid income — revenue pushed into next year',
              'Lower closing inventory',
              'A rise in the allowance, or a debt written off',
            ],
          },
        },
        examtrap: 'Every accrual and prepayment is reversed at the start of the next period; without the reversal the amount reaches profit in both years. And an allowance stated as a percentage of receivables is the required BALANCE, not the charge — only the movement goes through profit.',
      },
    },
  };

  /* ══════════════════════════════════════════════════════════════════════════
     OUTCOME 7 — Produce financial statements for sole traders and partnerships.
     20% of the assessment, the largest outcome in the unit, and the one every
     earlier outcome has been feeding. Outcomes 3, 4 and 5 produce the figures;
     this is where they are laid out and read.
     ══════════════════════════════════════════════════════════════════════════ */

  var LO7 = {
    unit: 'faps',
    level: 3,
    title: 'Financial Accounting: Preparing Financial Statements',
    outcome: 7,
    outcomeTitle: 'Produce financial statements for sole traders and partnerships',
    weighting: 20,
    lessons: [
      {
        id: 'L3-FAPS-7A',
        title: 'What the two statements are for',
        icon: '📑',
        criteria: ['FAPS-7.1.1', 'FAPS-7.1.2', 'FAPS-7.1.3', 'FAPS-7.1.4'],
        cards: [
          {
            h: 'Two statements, two different questions',
            table: {
              headers: ['', 'Statement of profit or loss', 'Statement of financial position'],
              rows: [
                ['Asks', 'How did the business do?', 'Where has the business got to?'],
                ['Covers', 'A period — usually the twelve months just ended', 'A single date — the last day of that period'],
                ['Holds', 'Income and expenses', 'Assets, liabilities and capital'],
                ['At the year end', 'Its balances are closed off to capital', 'Its balances are carried forward as next year\'s opening figures'],
              ],
            },
            p: [
              'The bottom row is the one that explains the other three. Income and expense accounts are emptied at the year end, which is all that closing them off to capital amounts to, so a sales figure describes twelve months and then starts again at nil. Asset and liability accounts are not emptied, so a bank balance describes one moment and carries straight on into the next year.',
              'That is why a business can report a healthy profit and still be unable to pay its suppliers. Profit is measured over a year; the ability to pay is measured on a day. Both statements are needed because neither question answers the other.',
              'A lender reads them in that order and for different reasons: the profit statement to judge whether the business can service a loan out of trading, the position statement to judge what could be recovered if it cannot.',
            ],
          },
          {
            h: 'The accounting equation, laid out down the page',
            formula: 'Assets − Liabilities = Capital',
            p: [
              'The statement of financial position is that equation with the three terms stacked instead of written in a line. Assets are listed and totalled, liabilities are deducted, and the figure that survives is called **net assets**. Underneath, the capital section is built up separately and must arrive at that same figure.',
              'It does so because of how the two sides are built. Every transaction was recorded twice, so the ledger already balances; the statement of financial position is a rearrangement of balances that were equal before anybody laid them out. Agreement is a symptom of the bookkeeping, not a coincidence to be grateful for.',
              'This shape — net assets on top, capital underneath — is the **net assets presentation**, and it is the one AAT assesses. An older layout put assets on the left of the page and capital and liabilities on the right; it presents identical information and is not the layout the assessment asks for.',
            ],
            callout: { kind: 'key', text: 'Net assets and closing capital are two routes to the same figure. When they disagree, something has been posted once instead of twice, or entered on the wrong side.' },
          },
          {
            h: 'Where the two statements meet',
            flow: [
              'Profit for the year, from the statement of profit or loss',
              'Added to the capital account',
              'Closing capital, on the statement of financial position',
            ],
            p: [
              'One figure crosses from the first statement to the second: profit for the year. Nothing else makes the journey — not the revenue, not the expense totals, not the gross profit.',
              'The reason is ownership. A profit belongs to the owner from the moment it is earned, whether or not any of it is drawn out. So it increases what the business owes its owner, and the capital balance is the measure of that debt, and it does so through the capital account rather than by appearing on the position statement in its own right.',
              'A loss travels the same road in the opposite direction, reducing capital. Drawings reduce capital too, and for the same reason: they are the owner taking back part of what the business owes them. Neither drawings nor capital introduced ever touches the profit statement.',
            ],
            examtrap: 'Drawings are the classic misplacement. They look like money going out, so they get written among the expenses, where they reduce profit as well as capital and the two halves of the position statement then differ by exactly the drawings figure.',
          },
        ],
        check: [
          {
            type: 'mcq',
            q: 'Which figure passes from the statement of profit or loss to the statement of financial position?',
            opts: ['Profit for the year, which is added to the capital account', 'Gross profit, which is added to the capital account', 'Sales revenue, which is shown as a receivable', 'Total expenses, which are shown as liabilities'],
            ans: 0,
            exp: 'Profit for the year is the single crossing point, and it goes into the capital account because a profit increases what the business owes its owner. Gross profit is an intermediate subtotal that stops at the profit statement, and sales and expenses are period figures that are closed off rather than carried across.',
          },
          {
            type: 'truefalse',
            q: 'Identify whether each statement about the two financial statements is correct.',
            statements: [
              { text: 'The statement of financial position reports a position at a single date.', answer: true },
              { text: 'Income and expense balances are carried forward into the following year.', answer: false },
              { text: 'Drawings are deducted in arriving at profit for the year.', answer: false },
              { text: 'Net assets and closing capital should arrive at the same figure.', answer: true },
              { text: 'A business reporting a profit must therefore be able to pay its suppliers.', answer: false },
            ],
            exp: 'The position statement is dated on one day, while the profit statement covers a period, and income and expense balances are closed off to capital rather than carried forward. Drawings reduce capital and never appear among expenses. Net assets and closing capital are two routes to one number. And profit is measured over a year while the ability to pay is measured on a day, so the two can point in opposite directions.',
          },
        ],
      },

      {
        id: 'L3-FAPS-7B',
        title: 'The words the trading section uses',
        icon: '🔤',
        criteria: ['FAPS-7.1.5'],
        cards: [
          {
            h: 'Three definitions that have to be exact',
            table: {
              headers: ['Term', 'Built from'],
              rows: [
                ['**Sales revenue**', 'Sales − sales returns'],
                ['**Net purchases**', 'Purchases − purchases returns + carriage inwards'],
                ['**Cost of sales**', 'Opening inventory + net purchases − closing inventory'],
              ],
            },
            p: [
              'A trial balance hands you sales, sales returns, purchases, purchases returns and two carriage figures as separate accounts. None of them is a line in the finished statement. Each finished line is built from two or three of them, and the marks are for the building.',
              'Returns are deducted from the figure they reverse, which sounds obvious until the two returns accounts are next to each other in a trial balance and both get taken off sales. Sales returns are goods customers sent back, so they reduce revenue. Purchases returns are goods sent back to suppliers, so they reduce what was bought.',
              'The two inventory figures are the least intuitive part. Opening inventory is added because those goods were bought last year and sold this year, so their cost belongs in this year. Closing inventory is deducted because those goods have been bought and not yet sold, so their cost waits for next year.',
            ],
          },
          {
            h: 'Carriage inwards and carriage outwards',
            split: {
              left: {
                title: 'Carriage inwards — into cost of sales',
                items: [
                  'Delivery charged to the business on goods it buys',
                  'Part of what it cost to get the goods onto the shelf',
                  'Added within net purchases, above gross profit',
                  'Raising it reduces gross profit and profit alike',
                ],
              },
              right: {
                title: 'Carriage outwards — an expense',
                items: [
                  'Delivery the business pays on goods it sells',
                  'A cost of selling, incurred after the goods are ready',
                  'Listed among the expenses, below gross profit',
                  'Raising it leaves gross profit untouched and reduces profit',
                ],
              },
            },
            p: [
              'Both are delivery costs and both are paid by the business, so the names are no help at all. The direction is the test: inwards goods are arriving, outwards goods are leaving.',
              'Getting it wrong costs two marks rather than one, because gross profit and every ratio built on it move as well. A question that gives both figures and asks for gross profit is testing this distinction and nothing else.',
            ],
            examtrap: 'Carriage inwards belongs to the goods; carriage outwards belongs to the sale. If the payment was needed before the goods could be sold, it is inwards.',
          },
          {
            h: 'Working through to cost of sales',
            worked: {
              title: 'Building cost of sales from a trial balance extract',
              problem: 'A trial balance shows opening inventory £14,200, purchases £86,500, purchases returns £2,300 and carriage inwards £1,150. Closing inventory has been valued at £16,800. What is the cost of sales?',
              steps: [
                {
                  do: 'Start with purchases and take off what went back: £86,500 − £2,300 + £1,150 = £85,350.',
                  why: 'Purchases returns reduce what was bought, and carriage inwards adds to it, because the delivery was part of getting the goods in. The three together are net purchases.',
                },
                {
                  do: 'Add the opening inventory: £14,200 + £85,350 = £99,550.',
                  why: 'This is everything available to sell during the year — what was already on the shelf plus what came in.',
                },
                {
                  do: 'Deduct the closing inventory: £99,550 − £16,800 = £82,750.',
                  why: 'What is still on the shelf was not sold, so its cost is held back. Next year it becomes the opening inventory and is charged then.',
                },
                {
                  do: 'Sense-check the direction: cost of sales is lower than goods available.',
                  why: 'Closing inventory can only reduce the charge. A cost of sales larger than opening inventory plus net purchases means the closing figure has been added instead of deducted.',
                },
              ],
              answer: 'Cost of sales is £82,750.',
              tryIt: {
                q: 'Opening inventory is £9,400, purchases £52,000, purchases returns £1,600, carriage inwards £700 and closing inventory £11,300. What is the cost of sales?',
                answer: 49200,
                unit: '£',
                hint: 'Build net purchases first, then add opening and deduct closing inventory.',
                exp: 'Net purchases are £52,000 − £1,600 + £700 = £51,100. Adding opening inventory and deducting closing gives £9,400 + £51,100 − £11,300 = £49,200.',
              },
            },
          },
        ],
        check: [
          {
            type: 'numeric',
            q: 'Sales are £186,000, sales returns £4,200 and purchases returns £3,100. What is sales revenue?',
            answer: 181800,
            unit: '£',
            exp: 'Sales revenue is sales less sales returns only: £186,000 − £4,200 = £181,800. Purchases returns reduce purchases, not sales, and putting them here is the commonest way this figure goes wrong.',
          },
          {
            type: 'truefalse',
            q: 'Identify whether each cost belongs in cost of sales rather than in expenses.',
            statements: [
              { text: 'Carriage inwards on goods bought for resale.', answer: true },
              { text: 'Carriage outwards on goods delivered to customers.', answer: false },
              { text: 'Purchases returns, deducted from purchases.', answer: true },
              { text: 'Wages paid to the sales assistants.', answer: false },
            ],
            exp: 'Cost of sales holds what it cost to obtain the goods that were sold: net purchases, adjusted for the inventory at each end. Carriage inwards is part of obtaining them and purchases returns reduce them. Delivery to customers and shop wages are costs of running the business, so they sit below gross profit among the expenses.',
          },
        ],
      },

      {
        id: 'L3-FAPS-7C',
        title: 'Preparing the statement of profit or loss',
        icon: '📈',
        criteria: ['FAPS-7.1.6'],
        cards: [
          {
            h: 'The running order, and why it is fixed',
            example: {
              title: 'The shape of a sole trader\'s statement of profit or loss',
              rows: [
                ['', 'Working', '£'],
                ['Sales revenue', '', 'X'],
                ['Opening inventory', 'X', ''],
                ['Net purchases', 'X', ''],
                ['Less closing inventory', '(X)', ''],
                ['Cost of sales', '', '(X)'],
                ['**Gross profit**', '', '**X**'],
                ['Sundry income — discounts received, rent received', '', 'X'],
                ['Expenses — wages, rent, motor, carriage outwards, depreciation, irrecoverable debts', '', '(X)'],
                ['**Profit for the year**', '', '**X**'],
              ],
            },
            p: [
              'Two subtotals, and they measure different things. **Gross profit** is what the trading itself earned: revenue less what the goods sold actually cost. **Profit for the year** is what survives after the costs of running the business.',
              'A statement that keeps them apart can be diagnosed; one that merges them cannot. A business whose gross profit is falling has a problem with its pricing or its buying. A business whose gross profit holds up while profit for the year falls has a problem with its overheads. Merge the two and neither diagnosis is available.',
              'The inner column is a working, not a result. Opening inventory, net purchases and closing inventory are shown there so the reader can see how cost of sales was arrived at, and only the total moves out to the outer column to be deducted.',
            ],
          },
          {
            h: 'A statement built end to end',
            worked: {
              title: 'Year ended 31 December, from an adjusted trial balance',
              problem: 'Sales £318,000, sales returns £6,000, opening inventory £21,000, purchases £173,000, purchases returns £3,500, carriage inwards £2,400, discounts received £900. Expenses: wages £62,000, rent and rates £18,500, motor expenses £7,400, carriage outwards £3,200, depreciation £9,800, irrecoverable debts £1,600. Closing inventory is £19,600. Prepare the statement down to profit for the year.',
              steps: [
                {
                  do: 'Sales revenue: £318,000 − £6,000 = £312,000.',
                  why: 'Sales returns come off here and nowhere else. The figure that heads the statement is what customers kept, not what they were invoiced.',
                },
                {
                  do: 'Net purchases: £173,000 − £3,500 + £2,400 = £171,900.',
                  why: 'Returns out, carriage inwards in. Carriage outwards stays clear of this working — it is waiting in the expenses.',
                },
                {
                  do: 'Cost of sales: £21,000 + £171,900 − £19,600 = £173,300.',
                  why: 'Opening inventory joins what was bought; closing inventory is held back for next year.',
                },
                {
                  do: 'Gross profit: £312,000 − £173,300 = £138,700.',
                  why: 'The trading result, before any cost of running the business has been touched.',
                },
                {
                  do: 'Total the expenses: £62,000 + £18,500 + £7,400 + £3,200 + £9,800 + £1,600 = £102,500.',
                  why: 'Depreciation and irrecoverable debts sit in this list alongside the cash costs. Neither was a payment this year, and both are costs of the year all the same.',
                },
                {
                  do: 'Profit for the year: £138,700 + £900 − £102,500 = £37,100.',
                  why: 'Discounts received are income earned by paying suppliers early, so they are added after gross profit rather than netted against purchases.',
                },
              ],
              answer: 'Gross profit £138,700 and profit for the year £37,100.',
              tryIt: {
                q: 'Sales £164,000, sales returns £3,000, opening inventory £12,000, purchases £91,000, purchases returns £1,500, carriage inwards £800, closing inventory £13,400. What is the gross profit?',
                answer: 72100,
                unit: '£',
                hint: 'Sales revenue first, then net purchases, then cost of sales.',
                exp: 'Sales revenue is £164,000 − £3,000 = £161,000. Net purchases are £91,000 − £1,500 + £800 = £90,300, so cost of sales is £12,000 + £90,300 − £13,400 = £88,900. Gross profit is £161,000 − £88,900 = £72,100.',
              },
            },
          },
          {
            h: 'The four figures that get put in the wrong place',
            table: {
              headers: ['Figure', 'Where it goes', 'Where it gets put'],
              rows: [
                ['Carriage outwards', 'Expenses, below gross profit', 'Net purchases, above it'],
                ['Discounts received', 'Income, after gross profit', 'Deducted from purchases'],
                ['Discounts allowed', 'Expenses', 'Deducted from sales'],
                ['Drawings', 'The capital account, on the other statement', 'Expenses'],
              ],
            },
            p: [
              'The first three change gross profit without changing profit for the year, so a check that the bottom line agrees will not find them. The fourth changes both.',
              'Discounts repay a closer look, because the wrong treatment is superficially reasonable. A discount received does reduce what was paid to the supplier — but it was earned by settling early rather than by buying well, so it is reported as income of the period in which it was earned and left out of the cost of the goods.',
              'Drawings have their own lesson later in this outcome. For now the rule is enough: money the owner takes out is a return of capital, and no return of capital ever passes through the profit statement.',
            ],
            examtrap: 'When a computer-marked task asks for gross profit and profit for the year separately, a misplaced discount loses the first mark and keeps the second. Marks are not awarded for a figure being consistent with an earlier mistake.',
          },
        ],
        check: [
          {
            type: 'numeric',
            q: 'Sales revenue is £212,000, cost of sales £129,500, expenses £61,300 and discounts received £2,400. What is the profit for the year?',
            answer: 23600,
            unit: '£',
            exp: 'Gross profit is £212,000 − £129,500 = £82,500. Sundry income is added and expenses deducted after that: £82,500 + £2,400 − £61,300 = £23,600.',
          },
          {
            type: 'mcq',
            q: 'A business has treated carriage outwards as part of net purchases. What is the effect on the reported figures?',
            opts: ['Gross profit is understated and profit for the year is correct', 'Both gross profit and profit for the year are understated', 'Gross profit is overstated and profit for the year is correct', 'Both gross profit and profit for the year are overstated'],
            ans: 0,
            exp: 'Adding it to net purchases raises cost of sales, so gross profit falls. The same amount is then missing from the expenses, so profit for the year comes out unchanged, and the bottom line gives no sign of anything wrong.',
          },
        ],
      },

      {
        id: 'L3-FAPS-7D',
        title: 'Preparing the statement of financial position',
        icon: '⚖️',
        criteria: ['FAPS-7.1.7'],
        cards: [
          {
            h: 'The net assets presentation, in order',
            example: {
              title: 'The shape of a sole trader\'s statement of financial position',
              rows: [
                ['', 'Working', '£'],
                ['Non-current assets, at carrying amount', '', 'X'],
                ['Current assets — inventory, receivables less allowance, prepayments, bank', 'X', ''],
                ['Current liabilities — payables, accruals, overdraft', '(X)', ''],
                ['**Net current assets**', '', 'X'],
                ['**Total assets less current liabilities**', '', '**X**'],
                ['Non-current liabilities — loans repayable after more than a year', '', '(X)'],
                ['**Net assets**', '', '**X**'],
                ['Capital — opening, plus capital introduced, plus profit, less drawings', '', '**X**'],
              ],
            },
            p: [
              'Non-current assets are shown at their carrying amount, with cost and accumulated depreciation set out in columns to its left so a reader can tell new assets from nearly-written-off ones. Every asset in the statement is listed in order of how hard it would be to turn into cash, starting with the hardest, which is why the non-current assets head the page at all. Premises come before inventory; inventory comes before receivables, which are one step from cash; the bank comes last. Liabilities run that ordering in reverse, with whatever is due soonest shown first.',
              'The ordering carries information. **Net current assets** — current assets less current liabilities, also called working capital — is what the business has available to meet the next twelve months out of resources that will be cash within the same twelve months. A negative figure there is a warning that no profit figure can cancel.',
              'Non-current liabilities are deducted after that subtotal because they are not a call on the coming year. A loan repayable in four years does not compete with next month\'s suppliers.',
            ],
          },
          {
            h: 'A statement of financial position built end to end',
            worked: {
              title: 'The same business as the previous lesson, at 31 December',
              problem: 'Premises cost £150,000 with accumulated depreciation £24,000. Fixtures have a carrying amount of £17,500 and vehicles £16,800. Inventory £19,600, trade receivables £28,000 against which the allowance is £1,400, prepayments £1,300, bank £4,700. Trade payables £21,400, accruals £2,100. A bank loan of £45,000 is repayable in five years. Capital at 1 January was £130,000, the owner paid in a further £5,000, profit for the year was £37,100 and drawings were £28,100.',
              steps: [
                {
                  do: 'Premises carrying amount: £150,000 − £24,000 = £126,000. Non-current assets: £126,000 + £17,500 + £16,800 = £160,300.',
                  why: 'Cost and accumulated depreciation are both shown, because a reader needs to know whether the assets are new or nearly written off. Only the carrying amount enters the running total.',
                },
                {
                  do: 'Receivables net of the allowance: £28,000 − £1,400 = £26,600.',
                  why: 'The allowance is a deduction on the face of the statement, not a write-off. The ledger balance is untouched and the customers are still being pursued.',
                },
                {
                  do: 'Current assets: £19,600 + £26,600 + £1,300 + £4,700 = £52,200. Current liabilities: £21,400 + £2,100 = £23,500.',
                  why: 'Accruals belong here because they will be paid within the year. So would an overdraft, which is repayable on demand however long it has been running.',
                },
                {
                  do: 'Net current assets: £52,200 − £23,500 = £28,700. Total assets less current liabilities: £160,300 + £28,700 = £189,000.',
                  why: 'Working capital is comfortably positive, so the business can meet the coming year out of what will turn into cash within it.',
                },
                {
                  do: 'Net assets: £189,000 − £45,000 = £144,000.',
                  why: 'The loan is deducted last because it is not due within the year. Deducting it earlier would understate working capital and misdescribe the position.',
                },
                {
                  do: 'Capital: £130,000 + £5,000 + £37,100 − £28,100 = £144,000.',
                  why: 'Built from the other end and landing on the same figure. Agreement here is the check that the year\'s work has been recorded twice throughout.',
                },
              ],
              answer: 'Net assets of £144,000, matched by closing capital of £144,000.',
              tryIt: {
                q: 'Non-current assets have a carrying amount of £96,000. Inventory is £14,000, receivables £22,000 and the bank balance £3,500. Trade payables are £17,200 and accruals £900. A loan of £30,000 is repayable in four years. What are the net assets?',
                answer: 87400,
                unit: '£',
                hint: 'Work down: current assets, current liabilities, then the loan last.',
                exp: 'Current assets are £14,000 + £22,000 + £3,500 = £39,500 and current liabilities £17,200 + £900 = £18,100, so net current assets are £39,500 − £18,100 = £21,400. Adding the non-current assets gives £96,000 + £21,400 = £117,400, and deducting the loan gives £117,400 − £30,000 = £87,400.',
              },
            },
          },
          {
            h: 'When the two halves disagree',
            p: [
              'A difference between net assets and closing capital means an entry has gone in once, or twice on the same side, or been picked up from the trial balance on the wrong side. The size of the difference narrows the search considerably.',
              'If the difference equals a figure in the question, that figure has been omitted from one half. If it equals **twice** a figure, that figure is on the wrong side — reversing it moves the total by double the amount, which is why doubling is the signature of a reversal rather than an omission. If it equals the drawings, drawings have probably been deducted twice or not at all.',
              'A difference that matches nothing is usually a casting error, and re-adding the columns finds it faster than re-reading the entries. None of this rescues a computer-marked task on its own — but knowing that the halves must agree, and checking, catches an error while there is still time to correct it.',
            ],
            callout: { kind: 'warn', text: 'A difference of exactly twice some figure in the question means that figure is on the wrong side, not that it is missing.' },
          },
        ],
        check: [
          {
            type: 'numeric',
            q: 'Current assets are £64,000 and current liabilities £41,500. Non-current assets have a carrying amount of £188,000 and a loan of £60,000 is repayable in six years. What are the net assets?',
            answer: 150500,
            unit: '£',
            exp: 'Net current assets are £64,000 − £41,500 = £22,500. Adding non-current assets gives £188,000 + £22,500 = £210,500, and the loan is deducted after that subtotal: £210,500 − £60,000 = £150,500.',
          },
          {
            type: 'truefalse',
            q: 'Identify whether each item is shown as a current liability.',
            statements: [
              { text: 'A bank overdraft at the year end.', answer: true },
              { text: 'A loan repayable in three years\' time.', answer: false },
              { text: 'Accrued electricity owed at the year end.', answer: true },
              { text: 'A prepaid insurance premium.', answer: false },
            ],
            exp: 'A current liability falls due within twelve months. An overdraft is repayable on demand and an accrual is owed now, so both qualify. A three-year loan is non-current and is deducted after the working capital subtotal. A prepayment is an asset — the business has paid and is still owed the benefit.',
          },
        ],
      },

      {
        id: 'L3-FAPS-7E',
        title: 'The capital account of a sole trader',
        icon: '🏦',
        criteria: ['FAPS-7.2.1', 'FAPS-7.2.2'],
        cards: [
          {
            h: 'What moves the balance, and in which direction',
            split: {
              left: {
                title: 'Increases capital — credits',
                items: [
                  'Opening balance brought forward',
                  'Capital introduced during the year, in cash or in kind',
                  'Profit for the year',
                ],
              },
              right: {
                title: 'Reduces capital — debits',
                items: [
                  'Drawings of cash',
                  'Drawings of goods, taken at cost',
                  'Personal costs the business has settled',
                  'A loss for the year',
                ],
              },
            },
            p: [
              'Capital is what the business owes its owner, which is why it sits on the credit side and why the two columns above run the way they do. Anything the owner puts in increases the debt; anything they take out reduces it.',
              'Four movements is the whole list, and a question that asks for a missing figure will give three of them. Rearranging is the skill being tested: closing capital is often supplied and the profit for the year has to be worked back to.',
              'An asset introduced instead of cash still counts. An owner who brings a van worth £8,000 into the business has increased capital by £8,000 as surely as if they had paid it into the bank, and it is recorded at what the asset is worth on the day it comes in.',
            ],
            formula: 'Closing capital = Opening capital + capital introduced + profit − drawings',
          },
          {
            h: 'Drawings that never touch the bank',
            table: {
              headers: ['What the owner takes', 'Journal', 'Valued at'],
              rows: [
                ['Cash from the till or bank', 'Dr Drawings · Cr Bank', 'The amount taken'],
                ['Goods from inventory', 'Dr Drawings · Cr Purchases', 'Cost, not selling price'],
                ['A personal bill the business paid', 'Dr Drawings · Cr the expense account', 'The amount paid'],
              ],
            },
            p: [
              'Goods are the row that gets misread. The credit goes to purchases rather than to sales, because nothing was sold — the goods left the business without a customer and without revenue. Crediting sales would invent a sale that never happened and put a profit margin on the owner\'s own groceries.',
              'Cost rather than selling price follows from the same reasoning. The business has lost what the goods cost it; it has not lost the profit it might have made, because that profit was never earned.',
              'The last row covers services and personal expenses: a shop that pays the owner\'s home broadband has paid a private cost out of business money. Leaving it among the expenses understates profit and overstates the business\'s costs, and moving it to drawings puts both right in one entry.',
            ],
            examtrap: 'Goods drawn are credited to purchases at cost. Crediting sales at selling price overstates revenue, overstates gross profit and leaves the capital account short by the margin.',
          },
          {
            h: 'Completing the capital account',
            worked: {
              title: 'Working from opening capital to closing capital',
              problem: 'A sole trader started the year with capital of £68,000. In July she paid a further £10,000 into the business. Profit for the year was £41,500. She drew £26,000 in cash, took goods costing £1,800 for her own use, and the business paid £950 towards her home insurance. What is her capital at the year end?',
              steps: [
                {
                  do: 'Add the credits: £68,000 + £10,000 + £41,500 = £119,500.',
                  why: 'Opening capital, capital introduced and profit all increase what the business owes her, so they all sit on the same side.',
                },
                {
                  do: 'Total the drawings: £26,000 + £1,800 + £950 = £28,750.',
                  why: 'Three shapes of one withdrawal — cash, goods at cost and a private bill settled from business funds. All three are withdrawals of capital rather than costs of trading.',
                },
                {
                  do: 'Closing capital: £119,500 − £28,750 = £90,750.',
                  why: 'This is the figure that must equal net assets on the statement of financial position, and it is the opening capital for next year.',
                },
                {
                  do: 'Check what did not move: the date the £10,000 came in.',
                  why: 'Capital introduced part-way through the year is not time-apportioned. A sole trader earns no interest on capital, so July and January are worth the same.',
                },
              ],
              answer: 'Closing capital of £90,750.',
              tryIt: {
                q: 'Opening capital was £54,000. The owner paid in a further £6,000, drew £31,200 in cash and took goods costing £900. Closing capital is £61,700. What was the profit for the year?',
                answer: 33800,
                unit: '£',
                hint: 'Rearrange the formula — the profit is the figure that makes the account balance.',
                exp: 'Capital introduced brings the opening figure to £54,000 + £6,000 = £60,000, and drawings total £31,200 + £900 = £32,100. Working backwards, profit is £61,700 + £32,100 − £60,000 = £33,800.',
              },
            },
          },
        ],
        check: [
          {
            type: 'mcq',
            q: 'A sole trader takes goods that cost £700 and would have sold for £1,150. How is this recorded?',
            opts: ['Dr Drawings £700, Cr Purchases £700', 'Dr Drawings £1,150, Cr Sales £1,150', 'Dr Purchases £700, Cr Drawings £700', 'Dr Drawings £1,150, Cr Purchases £1,150'],
            ans: 0,
            exp: 'The goods left without being sold, so no revenue arises and the credit reverses part of what was bought. Cost is the right amount because the business has given up what the goods cost it, not the margin it never earned.',
          },
          {
            type: 'numeric',
            q: 'Opening capital was £47,500, the owner introduced £12,000, drawings were £29,400 and closing capital is £58,600. What was the profit for the year?',
            answer: 28500,
            unit: '£',
            exp: 'Closing capital equals opening capital plus capital introduced plus profit less drawings, so profit is £58,600 + £29,400 − £47,500 − £12,000 = £28,500.',
          },
        ],
      },

      {
        id: 'L3-FAPS-7F',
        title: 'What changes when there is more than one owner',
        icon: '🤝',
        criteria: ['FAPS-7.3.1', 'FAPS-7.3.2', 'FAPS-7.3.3', 'FAPS-7.4.1'],
        cards: [
          {
            h: 'The agreement decides how the profit is split',
            table: {
              headers: ['The agreement sets', 'What it does'],
              rows: [
                ['Interest on capital', 'Rewards the partner who has more money tied up in the business'],
                ['Partners\' salaries or commission', 'Rewards the partner who does more of the work'],
                ['Interest on drawings', 'Discourages taking money out early, and charges those who do'],
                ['The profit-sharing ratio', 'Splits whatever is left over'],
              ],
            },
            p: [
              'A sole trader keeps the profit, so no rules are needed. Two or more owners have to agree how to divide it, and the four devices above are how a partnership agreement usually does it. Each is a way of recognising that partners contribute different things — capital, effort, patience — before the residue is shared.',
              'Where there is no written agreement the Partnership Act 1890 supplies terms: profits and losses shared equally, no interest on capital, and no salary for any partner. Those defaults are rarely what a real partnership wants, which is why agreements exist.',
              'In this unit the interest and salary figures are given to you. The calculation of interest on capital and interest on drawings is outside the assessment — what is assessed is knowing where each figure goes and what it does to the split.',
            ],
            callout: { kind: 'key', text: 'Interest and salaries are not expenses of the business. They are ways of dividing a profit that has already been arrived at.' },
          },
          {
            h: 'The profit statement, with one section added',
            flow: [
              'Trading, exactly as for a sole trader',
              'Profit for the year',
              'Appropriation account — divide it among the partners',
            ],
            p: [
              'Everything above profit for the year is identical to a sole trader\'s statement. Revenue, cost of sales, gross profit, expenses: same lines, same order, same rules about carriage and discounts. A partnership buys and sells in exactly the way a sole trader does.',
              'Underneath, where a sole trader\'s statement stops, a partnership adds the **appropriation account**. It takes the profit for the year and distributes it: interest on capital to each partner, salaries to any partner entitled to one, interest on drawings charged back, and the residue split in the profit-sharing ratio.',
              'The link between the two is a single figure. Profit for the year is the last line of the trading statement and the first line of the appropriation account, and no other figure makes the crossing. So a partner\'s salary never appears among the expenses — putting it there would reduce the profit before the division and give the other partners a share of their colleague\'s pay cut.',
            ],
            examtrap: 'A partner\'s salary is an appropriation, not a wage. An employee\'s wage is an expense above profit for the year; a partner\'s salary is a share of the profit below it.',
          },
          {
            h: 'The position statement, with one section split',
            p: [
              'The top half is identical too. Non-current assets, working capital, non-current liabilities, net assets — a partnership reaches that figure by the route the previous two lessons set out, and the net assets presentation serves both.',
              'The change is underneath. A sole trader has one capital balance; a partnership has two accounts for each partner. **Capital accounts** hold the long-term stake each partner has put in and are left alone from year to year. **Current accounts** hold the year-to-year traffic: the appropriations earned and the drawings taken.',
              'So the financed-by section lists the capital accounts, lists the current accounts, and totals both. That total must still equal net assets, exactly as one closing capital figure does for a sole trader. Splitting the balance in two changes how it is presented and not what it comes to.',
            ],
            split: {
              left: {
                title: 'Sole trader — financed by',
                items: [
                  'One capital account',
                  'Opening capital, capital introduced, profit, drawings',
                  'Closing capital = net assets',
                ],
              },
              right: {
                title: 'Partnership — financed by',
                items: [
                  'A capital account for each partner',
                  'A current account for each partner',
                  'Capital totals + current totals = net assets',
                ],
              },
            },
          },
        ],
        check: [
          {
            type: 'mcq',
            q: 'Where does a partner\'s salary of £18,000 appear in the financial statements?',
            opts: ['In the appropriation account, below profit for the year', 'In the expenses, above profit for the year', 'In the trading section, within cost of sales', 'In the statement of financial position, as a liability'],
            ans: 0,
            exp: 'A partner\'s salary divides a profit that has already been calculated, so it sits in the appropriation account. Treating it as an expense would reduce profit for the year before the division, so the other partners would end up bearing a share of it.',
          },
          {
            type: 'truefalse',
            q: 'Identify whether each statement about partnership accounts is correct.',
            statements: [
              { text: 'The trading section of the statement of profit or loss is prepared the same way as for a sole trader.', answer: true },
              { text: 'Interest on capital is an expense of the business.', answer: false },
              { text: 'Where there is no agreement, the Partnership Act 1890 shares profits equally.', answer: true },
              { text: 'The net assets figure is calculated differently for a partnership.', answer: false },
              { text: 'Candidates are expected to calculate the interest on capital themselves.', answer: false },
            ],
            exp: 'A partnership buys and sells as a sole trader does, so everything down to profit for the year is unchanged, and so is the calculation of net assets. Interest on capital and salaries divide profit rather than reduce it. The Act supplies equal sharing where no agreement says otherwise. And the interest figures are given in this assessment, not calculated.',
          },
        ],
      },

      {
        id: 'L3-FAPS-7G',
        title: 'The appropriation account',
        icon: '➗',
        criteria: ['FAPS-7.3.4', 'FAPS-7.3.5', 'FAPS-7.3.6'],
        cards: [
          {
            h: 'The running order, and the one item that is added',
            example: {
              title: 'Appropriation account for the year ended 31 December',
              rows: [
                ['', 'Working', '£'],
                ['Profit for the year', '', '96,000'],
                ['Add interest on drawings — Ahmed £600, Bea £900', '', '1,500'],
                ['**Profit available for appropriation**', '', '**97,500**'],
                ['Less salary — Bea', '(14,000)', ''],
                ['Less interest on capital — Ahmed £4,000, Bea £2,500', '(6,500)', ''],
                ['', '', '(20,500)'],
                ['**Residual profit**', '', '**77,000**'],
                ['Share — Ahmed, three fifths', '46,200', ''],
                ['Share — Bea, two fifths', '30,800', ''],
                ['', '', '**77,000**'],
              ],
            },
            p: [
              'Three of the four items are deducted and one is added. Interest on capital and salaries are amounts the partnership hands to individual partners, so they come out of the pot before it is shared. Interest on drawings runs the other way: the partner is being charged for taking money out early, so the charge goes back into the pot and enlarges what everybody shares.',
              'That is why the second line increases the total. A partner who has drawn heavily pays interest, the residue everybody shares grows by that amount, and they take their usual fraction of the enlarged residue — so part of the charge comes back to them and the rest reaches the other partners. The charge costs the payer more than it returns whatever the ratio, and that difference is where the deterrent lies.',
              'The last line of the account must equal the residual profit above it. Whatever is shared out has to be exactly what was there to share.',
            ],
          },
          {
            h: 'Dividing the profit',
            worked: {
              title: 'Ahmed and Bea, sharing three to two',
              problem: 'Ahmed and Bea share profits 3:2. Profit for the year is £96,000. The agreement gives interest on capital of £4,000 to Ahmed and £2,500 to Bea, and a salary of £14,000 to Bea. Interest on drawings is charged at £600 to Ahmed and £900 to Bea. Prepare the appropriation.',
              steps: [
                {
                  do: 'Add the interest on drawings: £96,000 + £600 + £900 = £97,500.',
                  why: 'The partners are being charged, so the partnership is better off by the same amount. The charge enlarges the pot before anything is taken out of it.',
                },
                {
                  do: 'Deduct the salary: £97,500 − £14,000 = £83,500.',
                  why: 'Bea is being paid for doing more of the work. It comes off the top so that the reward reaches her rather than being shared out.',
                },
                {
                  do: 'Deduct the interest on capital: £4,000 + £2,500 = £6,500, leaving £83,500 − £6,500 = £77,000.',
                  why: 'Each partner is rewarded for the capital tied up before the residue is divided. This £77,000 is the residual profit, and it is the only figure the ratio touches.',
                },
                {
                  do: 'Share in the ratio: £77,000 × 3 ÷ 5 = £46,200 to Ahmed and £77,000 × 2 ÷ 5 = £30,800 to Bea.',
                  why: 'A 3:2 ratio has five parts, so the denominator is 5. Dividing by the number of partners instead of by the parts is the commonest slip here.',
                },
                {
                  do: 'Check: £46,200 + £30,800 = £77,000.',
                  why: 'The shares must add back to the residual profit. If they do not, the ratio has been applied to the wrong subtotal.',
                },
              ],
              answer: 'Residual profit of £77,000, shared £46,200 to Ahmed and £30,800 to Bea.',
              tryIt: {
                q: 'C and D share profits 2:1. Profit for the year is £72,000. Interest on capital is £3,000 to C and £2,000 to D, D has a salary of £11,000, and interest on drawings is £400 for C and £600 for D. What is C\'s share of the residual profit?',
                answer: 38000,
                unit: '£',
                hint: 'Get to the residual profit first. A 2:1 ratio has three parts.',
                exp: 'Adding the interest on drawings gives £72,000 + £400 + £600 = £73,000. Taking out the salary and the interest on capital leaves £73,000 − £11,000 − £5,000 = £57,000. C takes two of the three parts: £57,000 × 2 ÷ 3 = £38,000.',
              },
            },
          },
          {
            h: 'Ratios, losses and missing partners',
            p: [
              'The parts of the ratio are added to get the denominator. Three to two means five parts, so the fractions are three fifths and two fifths; two to one means three parts. A ratio written as a fraction — "one third to Ahmed" — needs no such step, and a ratio written as percentages needs none either.',
              'A loss goes through the appropriation account unaltered. Interest on capital and salaries are still credited to the partners who are entitled to them, which usually makes the residue a larger loss than the loss the business made, and that larger figure is then shared in the ratio. Nothing about the method changes because the sign has.',
              'Not every item applies to every partner. An agreement may give a salary to one partner and none to the other, or charge interest on drawings to neither. An item that is absent is simply left out of the column, and a blank is not the same as an error.',
            ],
            examtrap: 'The profit-sharing ratio applies to the residual profit only — after salaries and interest on capital have come out and interest on drawings has gone in. Applying it to profit for the year gives every figure in the task the wrong value.',
          },
        ],
        check: [
          {
            type: 'numeric',
            q: 'Profit for the year is £54,000. Interest on capital totals £7,500, salaries total £9,000 and interest on drawings totals £1,200. What is the residual profit available for sharing?',
            answer: 38700,
            unit: '£',
            exp: 'Interest on drawings is added and the other two are deducted: £54,000 + £1,200 − £7,500 − £9,000 = £38,700. Deducting the interest on drawings instead of adding it puts every later figure in the task out.',
          },
          {
            type: 'mcq',
            q: 'Residual profit is £84,000 and three partners share it 4:2:1. What does the partner on two parts receive?',
            opts: ['£24,000, being two sevenths of the residue', '£28,000, being one third of the residue', '£16,800, being one fifth of the residue', '£42,000, being one half of the residue'],
            ans: 0,
            exp: 'The parts add to seven, so each part is £84,000 ÷ 7 = £12,000 and two parts are £24,000. Dividing by the number of partners rather than by the number of parts gives the £28,000 distractor.',
          },
        ],
      },

      {
        id: 'L3-FAPS-7H',
        title: 'Partners\' capital and current accounts',
        icon: '📒',
        criteria: ['FAPS-7.4.2', 'FAPS-7.4.3', 'FAPS-7.4.4', 'FAPS-7.4.5'],
        cards: [
          {
            h: 'Two accounts for each partner, doing two jobs',
            table: {
              headers: ['', 'Capital account', 'Current account'],
              rows: [
                ['Holds', 'The long-term stake agreed on joining', 'The year-to-year traffic'],
                ['Moves when', 'A partner brings in or withdraws capital, by agreement', 'Every appropriation and every drawing'],
                ['In a typical year', 'Does not move at all', 'Several entries on each side'],
                ['Interest on capital', 'Calculated on this balance', 'Credited here'],
                ['A debit balance means', 'Rare, and a matter for the agreement', 'The partner has drawn more than they have earned'],
              ],
            },
            p: [
              'Splitting one balance into two is a device for keeping the agreed stake visible. Interest on capital is calculated on the capital account, so if drawings and profit shares ran through the same account the figure interest was charged on would drift every month and the agreement would become unworkable.',
              'This arrangement is called **fixed capital**, and it is the one AAT assesses. The alternative — one account per partner, everything in it — is called fluctuating capital and is not examined here.',
              'A debit balance on a current account is information, not an error to be chased. It says the partner has taken out more than the year credited to them, so they owe the partnership. It appears in the financed-by section as a deduction, and it does not stop the section totalling to net assets.',
            ],
          },
          {
            h: 'What lands on each side, and where it came from',
            split: {
              left: {
                title: 'Debit — reduces what the partner is owed',
                items: [
                  'Drawings of cash',
                  'Drawings of goods, taken at cost',
                  'Personal expenses the partnership has settled',
                  'Interest charged on drawings',
                  'Share of a loss',
                ],
              },
              right: {
                title: 'Credit — increases what the partner is owed',
                items: [
                  'Balance brought forward, where it is a credit',
                  'Interest on capital',
                  'Salary or commission',
                  'Share of residual profit',
                ],
              },
            },
            p: [
              'Every entry on the credit side arrives from the appropriation account, and the two are easy to confuse because they carry the same numbers. The appropriation account is part of the profit statement: it divides one year\'s profit and then it is finished. The current account is a ledger account: it takes those divided amounts, sets the partner\'s drawings against them, and carries a running balance into the next year.',
              'So the same £14,000 salary appears twice — once as a deduction in the appropriation account, dividing the profit, and once as a credit in Bea\'s current account, recording what she is owed. One entry says how the profit was split; the other says what each partner has left.',
              'Drawings reach the debit side in the three forms a sole trader\'s do: cash, goods at cost, and private bills paid out of partnership money. Goods are credited to purchases here as they are for a sole trader, and the debit goes to that partner\'s own current account, so what each of them has taken stays separately identifiable all year.',
            ],
            examtrap: 'Interest on drawings is deducted from the partner in their current account and added to the pot in the appropriation account. Same figure, opposite directions, and both entries are needed.',
          },
          {
            h: 'Completing the current accounts',
            worked: {
              title: 'Ahmed and Bea, continuing from the appropriation account',
              problem: 'Ahmed\'s current account opened with £3,200 credit and Bea\'s with £1,100 debit. The appropriation gave interest on capital of £4,000 and £2,500, a salary of £14,000 to Bea, and residual shares of £46,200 and £30,800. Interest on drawings was £600 and £900. Ahmed drew £44,000 in cash; Bea drew £38,000 in cash and took goods costing £1,500. What are the closing balances?',
              steps: [
                {
                  do: 'Ahmed\'s credits: £3,200 + £4,000 + £46,200 = £53,400.',
                  why: 'The opening credit balance plus everything the appropriation account awarded him. He has no salary, so that line is simply absent.',
                },
                {
                  do: 'Ahmed\'s debits: £600 + £44,000 = £44,600, so the balance carried down is £53,400 − £44,600 = £8,800 credit.',
                  why: 'The year credited him with £50,200 and charged him £44,600 once the interest on drawings is counted, so the balance rises. The £8,800 is what the partnership still owes him.',
                },
                {
                  do: 'Bea\'s credits: £2,500 + £14,000 + £30,800 = £47,300.',
                  why: 'Her salary and interest on capital are both credits here, having been deductions in the appropriation account. One statement divides the profit; the other records what the division leaves her owed.',
                },
                {
                  do: 'Bea\'s debits: £1,100 + £900 + £38,000 + £1,500 = £41,500.',
                  why: 'Her opening balance was a debit, so it joins the drawings rather than offsetting them. The goods are debited at the £1,500 they cost, with the credit going to purchases.',
                },
                {
                  do: 'Bea\'s balance carried down: £47,300 − £41,500 = £5,800 credit.',
                  why: 'She started the year owing the partnership and ends it being owed. A year of earning more than was drawn turns a debit balance round.',
                },
              ],
              answer: 'Ahmed £8,800 credit and Bea £5,800 credit.',
              tryIt: {
                q: 'A partner\'s current account opens with a credit balance of £2,400. During the year she is credited with interest on capital of £1,800, a salary of £9,000 and a profit share of £21,600, and is charged interest on drawings of £500. Her drawings were £30,000. What is the closing balance?',
                answer: 4300,
                unit: '£',
                hint: 'Total the credits, total the debits, and take one from the other.',
                exp: 'The credits come to £2,400 + £1,800 + £9,000 + £21,600 = £34,800 and the debits to £500 + £30,000 = £30,500, leaving £34,800 − £30,500 = £4,300 credit.',
              },
            },
          },
        ],
        check: [
          {
            type: 'truefalse',
            q: 'Identify whether each entry belongs on the credit side of a partner\'s current account.',
            statements: [
              { text: 'The partner\'s share of the residual profit.', answer: true },
              { text: 'Interest charged on the partner\'s drawings.', answer: false },
              { text: 'Goods the partner took for personal use.', answer: false },
              { text: 'A salary the agreement awards the partner.', answer: true },
              { text: 'A private telephone bill the partnership paid for the partner.', answer: false },
            ],
            exp: 'The credit side records what the partnership owes the partner: profit share, salary and interest on capital. The debit side records what reduces that — drawings in any form, interest charged on those drawings, and private costs the partnership has settled. Goods and a private bill are both drawings by another name.',
          },
          {
            type: 'numeric',
            q: 'A partner opens the year with a current account balance of £900 debit, is credited with £26,400 in total appropriations, is charged £700 interest on drawings and draws £22,000. What is the closing balance?',
            answer: 2800,
            unit: '£',
            exp: 'The debits are the opening balance plus the interest and the drawings: £900 + £700 + £22,000 = £23,600. Against credits of £26,400 that leaves £26,400 − £23,600 = £2,800 credit.',
          },
        ],
      },

      {
        id: 'L3-FAPS-7I',
        title: 'The partnership statement of financial position',
        icon: '🧮',
        criteria: ['FAPS-7.4.6'],
        cards: [
          {
            h: 'The financed-by section, partner by partner',
            example: {
              title: 'How the bottom of the statement is laid out',
              rows: [
                ['', 'Ahmed', 'Bea', 'Total'],
                ['Capital accounts', '80,000', '50,000', '130,000'],
                ['Current accounts', '8,800', '5,800', '14,600'],
                ['**Total**', '**88,800**', '**55,800**', '**144,600**'],
              ],
            },
            p: [
              'Everything above this section is prepared exactly as for a sole trader, down to and including net assets. The net assets presentation, the ordering of the assets, the deduction of non-current liabilities after working capital — all unchanged.',
              'Below it, one figure becomes four. Each partner has a capital balance and a current balance, and the grand total of the four must equal net assets. Where a current account has a debit balance it is shown in brackets and deducted, which reduces that partner\'s column and the total alike.',
              'The partner columns are worth completing even when the assessment asks only for the total. Carrying two current account balances across to the wrong partners leaves the grand total exactly right and both partner columns wrong, so agreement with net assets says nothing about it. Only reading each balance back against the account it came from will catch it.',
            ],
          },
          {
            h: 'Putting the two halves together',
            worked: {
              title: 'Ahmed and Bea at 31 December',
              problem: 'Non-current assets have a carrying amount of £118,000. Inventory is £24,000, trade receivables £31,500, prepayments £900 and the bank balance £6,200. Trade payables are £25,600 and accruals £1,400. A loan of £9,000 is repayable in three years. Capital accounts stand at £80,000 for Ahmed and £50,000 for Bea, and the current accounts closed at £8,800 and £5,800 credit. Show that the statement balances.',
              steps: [
                {
                  do: 'Current assets: £24,000 + £31,500 + £900 + £6,200 = £62,600.',
                  why: 'Listed hardest to realise first — inventory, then receivables, then prepayments, then the bank.',
                },
                {
                  do: 'Current liabilities: £25,600 + £1,400 = £27,000, so net current assets are £62,600 − £27,000 = £35,600.',
                  why: 'Working capital measures the cushion for the coming year, and a partnership calculates it by the sole trader\'s method without amendment.',
                },
                {
                  do: 'Total assets less current liabilities: £118,000 + £35,600 = £153,600. Net assets: £153,600 − £9,000 = £144,600.',
                  why: 'The loan is deducted after the working capital subtotal because it is not due within the year.',
                },
                {
                  do: 'Capital accounts: £80,000 + £50,000 = £130,000. Current accounts: £8,800 + £5,800 = £14,600.',
                  why: 'The two rows of the financed-by section, each totalled across the partners.',
                },
                {
                  do: 'Check: £130,000 + £14,600 = £144,600, which is the net assets figure.',
                  why: 'The four balances between them account for the whole of the net assets — the agreement a sole trader gets from one capital figure, arrived at by four.',
                },
              ],
              answer: 'Net assets of £144,600, financed by capital of £130,000 and current accounts of £14,600.',
              tryIt: {
                q: 'Two partners have capital accounts of £60,000 and £40,000. Their current accounts close at £7,300 credit and £2,100 debit. What must the net assets total?',
                answer: 105200,
                unit: '£',
                hint: 'A debit balance on a current account is deducted.',
                exp: 'The capital accounts come to £60,000 + £40,000 = £100,000. The credit current account is added and the debit one deducted: £100,000 + £7,300 − £2,100 = £105,200.',
              },
            },
          },
          {
            h: 'Reading the statement once it is built',
            p: [
              'The four balances say different things about the same two people. Comparing the capital accounts shows who put more in at the outset. Comparing the current accounts shows who has been drawing ahead of their earnings since — and a partner whose current account has fallen year on year is taking out more than the business is crediting them, whatever the profit statement says.',
              'That is a conversation for the partners rather than a correction for the bookkeeper. A current account can run into debit without anything being wrong in the accounts, and the accounts are not the place to fix it.',
              'What does belong to the bookkeeper is the agreement between the halves. If the financed-by total does not equal net assets, the appropriation has gone astray, a current account has been mis-added, or a balance has been shown on the wrong side. Working back through the current accounts before re-reading the asset listing is usually faster, because the current accounts are where the year\'s new entries are.',
            ],
            examtrap: 'A current account with a debit balance is deducted in the financed-by section. Adding it makes the two halves differ by exactly twice that balance, which is the signature of a figure on the wrong side.',
          },
        ],
        check: [
          {
            type: 'numeric',
            q: 'Capital accounts total £145,000 and the two current accounts stand at £11,400 credit and £3,900 debit. What are the net assets?',
            answer: 152500,
            unit: '£',
            exp: 'The financed-by section totals to net assets, with a debit current account deducted: £145,000 + £11,400 − £3,900 = £152,500.',
          },
          {
            type: 'mcq',
            q: 'A partnership\'s financed-by section exceeds net assets by exactly £7,200, and one partner\'s current account has a debit balance of £3,600. What has most likely happened?',
            opts: ['The debit balance has been added instead of deducted', 'The debit balance has been left out of the section', 'The capital accounts have been totalled twice over', 'A profit share of £7,200 has been credited to the wrong partner'],
            ans: 0,
            exp: 'A figure on the wrong side moves the total by twice its value, and £3,600 doubled is the £7,200 difference. Omitting it would give a difference of £3,600, and crediting the wrong partner leaves the total unchanged because both partners are inside it.',
          },
        ],
      },
    ],
    cheatsheet: {
      id: 'L3-FAPS-7S',
      title: 'The financial statements on one card',
      icon: '🗂️',
      card: {
        h: 'Outcome 7 at a glance',
        p: [
          'One figure crosses between the two statements: profit for the year, which goes to the capital account. Nothing else makes the journey.',
        ],
        formula: 'Sales revenue = sales − sales returns · Net purchases = purchases − purchases returns + carriage inwards · Cost of sales = opening inventory + net purchases − closing inventory · Closing capital = opening capital + capital introduced + profit − drawings',
        table: {
          headers: ['', 'Sole trader', 'Partnership'],
          rows: [
            ['Down to profit for the year', 'Identical', 'Identical'],
            ['Then', 'Straight to the capital account', 'The appropriation account divides it first'],
            ['Financed by', 'One capital balance', 'A capital AND a current account per partner'],
            ['Appropriation order', '—', 'Add interest on drawings, deduct salaries and interest on capital, share the rest'],
          ],
        },
        split: {
          left: {
            title: 'Above gross profit',
            items: [
              'Carriage inwards, inside net purchases',
              'Opening and closing inventory',
              'Sales and purchases returns',
            ],
          },
          right: {
            title: 'Below it',
            items: [
              'Carriage outwards — a cost of selling',
              'Discounts received, as income; discounts allowed, as an expense',
              'Depreciation, irrecoverable debts, the allowance movement',
            ],
          },
        },
        examtrap: 'Drawings never appear among the expenses — they reduce capital on the other statement. Goods drawn are credited to purchases at COST. And the profit-sharing ratio applies only to the residual profit, after the salaries and interest on capital have come out.',
      },
    },
  };

  /* ══════════════════════════════════════════════════════════════════════════
     OUTCOME 6 — Produce and extend the trial balance. 15% of the assessment,
     and the hinge of the unit: Outcome 5 fills its adjustments columns and
     Outcome 7 reads its output.
     ══════════════════════════════════════════════════════════════════════════ */

  var LO6 = {
    unit: 'faps',
    level: 3,
    title: 'Financial Accounting: Preparing Financial Statements',
    outcome: 6,
    outcomeTitle: 'Produce and extend the trial balance',
    weighting: 15,
    lessons: [
      {
        id: 'L3-FAPS-6A',
        title: 'Why the trial balance is drawn up',
        icon: '📋',
        criteria: ['FAPS-6.1.2', 'FAPS-6.1.4'],
        cards: [
          {
            h: 'A list of balances, totalled twice',
            p: [
              'Every account in the general ledger is balanced off, and each balance is written into one of two columns according to the side it falls on. The columns are then totalled. If double entry has been kept, the totals agree, because every debit that was ever posted had a credit posted with it.',
              'Agreement earns its place for a reason that has nothing to do with tidiness: it means the statements built on these figures will balance too. Preparing a whole statement of financial position and only then discovering that the two halves differ by £4,370 wastes the work as well as the time. The trial balance moves that discovery to the cheapest point in the process.',
              'It is also a working document rather than a published one. Nobody outside the business ever sees it, so it can be laid out however is convenient, and the extended version later in this outcome depends on that freedom.',
            ],
            callout: { kind: 'key', text: 'A trial balance that agrees proves the arithmetic of double entry held. It proves nothing about whether the entries went to the right accounts.' },
          },
          {
            h: 'What the software does, and what that changes',
            p: [
              'In a computerised system the transfer from the ledger to the trial balance is automatic. The software holds every posting, so it can total the two columns on demand, and it will not accept a journal whose debits and credits differ — the entry is refused before it is saved.',
              'A trial balance produced by software therefore agrees every time. That is not a sign the bookkeeping is right; it is a consequence of the software refusing to record the mistakes that would have made it disagree. The value has moved rather than disappeared, and it has moved to the errors listed two lessons from now, which a computer is no better at spotting than a ledger clerk was.',
              'The assessment still asks you to build one by hand, from a list of balances or from written descriptions of transactions. Doing it manually keeps the classification visible — which side an account falls on, and why — and that judgement is the same whether a machine or a person carries out the addition.',
            ],
            examtrap: '"The software will catch it" is wrong for every error in lesson 6C. Those errors leave a balanced ledger, and a balanced ledger is precisely what the software is checking for.',
          },
          {
            h: 'Where it sits in the year end',
            flow: [
              'Ledger accounts, balanced off',
              'Initial trial balance',
              'Errors corrected, suspense cleared',
              'Adjustments entered',
              'Extended trial balance',
              'The two financial statements',
            ],
            p: [
              'Six steps, and the trial balance is the middle three of them. The initial one is a check on the bookkeeping; the adjusted one carries the period end work from Outcome 5; the extended one sorts every figure into the statement it belongs to.',
              'The order matters more than it looks. Adjustments are entered after the errors have been corrected, because an adjustment calculated on a wrong balance is wrong too — an allowance for doubtful receivables worked out as a percentage of a receivables figure that is later corrected has to be worked out again.',
              'Each step also narrows what can still go wrong. By the time the extended trial balance is complete, the figures are fixed and the remaining work is presentation: laying the same numbers out in the order a reader expects.',
            ],
          },
        ],
        check: [
          {
            type: 'mcq',
            q: 'Why does a trial balance produced by accounting software always agree?',
            opts: ['The software refuses any journal whose two sides differ', 'The software checks each posting against the source document', 'The software corrects errors of principle as it posts', 'The software posts every transaction to a suspense account first'],
            ans: 0,
            exp: 'The one-sided entries that used to make a trial balance disagree are never recorded, because the entry is refused before it can be saved. Agreement is therefore a property of the software rather than evidence about the bookkeeping, and errors of principle, commission and omission all survive it untouched. Nothing in the software reads a source document or corrects a misclassification.',
          },
          {
            type: 'truefalse',
            q: 'Identify whether each statement about the trial balance is correct.',
            statements: [
              { text: 'It is an internal working document rather than a published statement.', answer: true },
              { text: 'Agreement proves each entry reached the right account.', answer: false },
              { text: 'Adjustments are entered before the errors are corrected.', answer: false },
              { text: 'A trial balance that agrees means the financial statements will balance.', answer: true },
              { text: 'Preparing one by hand is no longer part of the assessment.', answer: false },
            ],
            exp: 'Nobody outside the business sees a trial balance, so its layout can be whatever suits the work. Agreement is about arithmetic, not about classification — the entries could all be in the wrong accounts. Corrections come first, because an adjustment worked out on a balance that later changes has to be worked out again. And the assessment does ask you to build one from a list of balances.',
          },
        ],
      },

      {
        id: 'L3-FAPS-6B',
        title: 'Which column each balance goes in',
        icon: '↔️',
        criteria: ['FAPS-6.1.1', 'FAPS-6.1.5'],
        cards: [
          {
            h: 'Five classes, two columns',
            table: {
              headers: ['Class', 'Column', 'Examples'],
              rows: [
                ['Assets', 'Debit', 'Premises, equipment, inventory, receivables, prepayments'],
                ['Expenses', 'Debit', 'Purchases, wages, rent, depreciation charge, carriage'],
                ['Drawings', 'Debit', 'Cash, goods at cost, private bills the business paid'],
                ['Liabilities', 'Credit', 'Payables, accruals, loans, accumulated depreciation'],
                ['Capital and income', 'Credit', 'Capital, sales, discounts received, rent received'],
              ],
            },
            p: [
              'Accumulated depreciation is the row that catches people, because the asset it relates to is a debit. It sits on the credit side because it is not an asset at all — it is the part of the asset\'s cost already used up, held separately so that both the original cost and the amount written off stay visible.',
              'The allowance for doubtful receivables is built on the identical logic: a credit balance sitting against a debit balance, reducing it on the face of the statement without touching the ledger account underneath.',
              'The rest of the table is the accounting equation set out in two columns. Assets and expenses are things the business has or has consumed, and they are debits; capital, liabilities and income are claims on the business, and they are credits.',
            ],
          },
          {
            h: 'Five balances that can fall either way',
            table: {
              headers: ['Account', 'Debit balance means', 'Credit balance means'],
              rows: [
                ['**VAT control**', 'HMRC owes the business a repayment', 'The business owes HMRC — the usual case'],
                ['**Disposals**', 'A loss on disposal', 'A profit on disposal'],
                ['**Bank**', 'Money in the account', 'An overdraft'],
                ['**Irrecoverable debts**', 'Write-offs during the year — the usual case', 'Recoveries exceeded write-offs'],
                ['**Suspense**', 'Credits exceeded debits in the trial balance', 'Debits exceeded credits'],
              ],
            },
            p: [
              'These are the balances a question puts in to see whether you are classifying or pattern-matching. A candidate who has learned "bank is an asset, so debit" puts an overdraft in the wrong column and throws the whole trial balance out by twice its value.',
              'The way through is to read what the balance says rather than what the account is usually called. A disposals account holding £700 on the debit side is telling you the asset was sold for £700 less than it was worth on the books, and a loss is an expense, so a debit is where it belongs.',
              'The last row is the subject of lesson 6D. It is on this list because a suspense balance appears in a trial balance like any other, and a question that gives you one expects it to be placed correctly.',
            ],
            examtrap: 'A balance put in the wrong column moves the totals apart by twice the amount, not once. Half a difference is often a faster clue to what went wrong than the difference itself.',
          },
          {
            h: 'Building one from a list of balances',
            worked: {
              title: 'Nine debits, seven credits, one total to prove',
              problem: 'Premises £95,000, equipment at cost £60,000, inventory at 1 January £20,000, trade receivables £22,400, purchases £108,000, wages £41,200, rent £12,000, drawings £19,500. Sales £196,000, trade payables £15,800, accumulated depreciation £24,000, capital £134,700. The bank account is £3,100 overdrawn, £4,900 of VAT is owed to HMRC, the disposals account shows a loss of £700, and recoveries of irrecoverable debts exceeded write-offs by £300. What does each column total?',
              steps: [
                {
                  do: 'Assets first: £95,000 + £60,000 + £20,000 + £22,400 = £197,400.',
                  why: 'Opening inventory is an asset balance carried in from last year end and stays a debit until the closing figure replaces it.',
                },
                {
                  do: 'Expenses: £108,000 + £41,200 + £12,000 = £161,200.',
                  why: 'Purchases is an expense rather than an asset. What was bought and not yet sold is dealt with by the inventory figures, not by moving purchases.',
                },
                {
                  do: 'Place the four that swing: the overdraft is a credit, the VAT owed is a credit, the disposal loss is a debit, the net recovery is a credit.',
                  why: 'Each is decided by what the balance says. A loss is an expense so it is a debit; the other three are amounts the business owes or has gained, so they are credits.',
                },
                {
                  do: 'Debit total: £197,400 + £161,200 + £700 + £19,500 = £378,800.',
                  why: 'Assets, expenses, the disposal loss and drawings. Drawings sit here rather than being deducted from capital, because the trial balance lists balances as the ledger holds them.',
                },
                {
                  do: 'Credit total: £196,000 + £15,800 + £3,100 + £4,900 + £24,000 + £300 + £134,700 = £378,800.',
                  why: 'The two agree, so the ledger has been kept in double entry. Nothing here says the entries reached the right accounts.',
                },
              ],
              answer: 'Both columns total £378,800.',
              tryIt: {
                q: 'Drawings £14,000, a bank overdraft of £2,600, a disposals account showing a profit of £1,500, a VAT repayment of £3,900 due from HMRC, and purchases of £71,000. What is the debit total?',
                answer: 88900,
                unit: '£',
                hint: 'Three of the five are debits. Read what each balance says, not what the account is usually called.',
                exp: 'Drawings and purchases are debits as always, and a repayment due from HMRC is money owed to the business, so it is a debit too: £14,000 + £3,900 + £71,000 = £88,900. The overdraft and the disposal profit are both credits.',
              },
            },
          },
        ],
        check: [
          {
            type: 'truefalse',
            q: 'Identify whether each balance belongs in the debit column.',
            statements: [
              { text: 'A disposals account showing a loss of £400.', answer: true },
              { text: 'Accumulated depreciation of £18,000.', answer: false },
              { text: 'A bank overdraft of £2,200.', answer: false },
              { text: 'An allowance for doubtful receivables of £750.', answer: false },
              { text: 'Prepaid rent of £1,100.', answer: true },
            ],
            exp: 'A loss on disposal is an expense, and a prepayment is an asset — the business has paid and is still owed the benefit. Accumulated depreciation and the allowance are both credit balances shown against the debit balances they reduce, and an overdraft is money owed to the bank.',
          },
          {
            type: 'numeric',
            q: 'Debits total £214,600 excluding capital. Credits total £166,900 excluding capital. What is the capital balance?',
            answer: 47700,
            unit: '£',
            exp: 'Capital is the credit balance that makes the two columns agree: £214,600 − £166,900 = £47,700. A trial balance question that withholds one figure is asking you to work back from the requirement that the totals match.',
          },
        ],
      },

      {
        id: 'L3-FAPS-6C',
        title: 'The errors a trial balance cannot see',
        icon: '🕳️',
        criteria: ['FAPS-6.1.3', 'FAPS-6.1.6'],
        cards: [
          {
            h: 'Six ways to be wrong and still balance',
            table: {
              headers: ['Error', 'What happened', 'Example'],
              rows: [
                ['**Omission**', 'The transaction never went in at all', 'A credit note for £215 was filed and never entered'],
                ['**Commission**', 'Right amount, right side, wrong account of the right type', '£320 from A Patel credited to A Patil'],
                ['**Principle**', 'Right amount, right side, wrong type of account', 'A £900 office chair debited to purchases, not fixtures'],
                ['**Original entry**', 'The wrong figure was used for both sides', 'An invoice for £742 entered in the daybook as £472'],
                ['**Reversal**', 'The right accounts, the wrong way round', 'Paying a supplier £480 recorded as Dr Bank, Cr Payables'],
                ['**Compensating**', 'Two separate errors of equal size on opposite sides', 'Purchases undercast £500 and sales undercast £500'],
              ],
            },
            p: [
              'All six leave a ledger in which total debits equal total credits, so all six survive a trial balance without a mark. Between them they cover most of what actually goes wrong in practice, which is why the check has the reputation it does.',
              'Commission and principle are the pair that get confused. Both put a figure in the wrong account; the difference is whether the wrong account is the same **kind** of account. A Patel for A Patil is commission, and receivables are still receivables. Purchases for fixtures is principle, because an expense has been recorded as an asset and the profit is now wrong.',
              'That distinction carries more than the vocabulary suggests. An error of commission leaves both financial statements right in total and one customer\'s balance wrong. An error of principle understates profit and overstates assets, and goes on doing so through every year the asset is depreciated over.',
            ],
          },
          {
            h: 'Correcting them, and the one that needs doubling',
            example: {
              title: 'The journal for each',
              rows: [
                ['Error', 'Correcting journal'],
                ['Omission — credit note £215', 'Dr Sales returns £215 · Cr Receivables £215'],
                ['Commission — £320 to the wrong customer', 'Dr A Patil £320 · Cr A Patel £320'],
                ['Principle — £900 chair in purchases', 'Dr Fixtures £900 · Cr Purchases £900'],
                ['Original entry — £742 entered as £472', 'Dr Receivables £270 · Cr Sales £270'],
                ['Reversal — £480 payment the wrong way round', 'Dr Payables £960 · Cr Bank £960'],
                ['Compensating — two £500 undercasts', 'Dr Purchases £500 · Cr Sales £500'],
              ],
            },
            p: [
              'Every journal in that list has equal debits and credits, which is the point: the ledger balanced before the correction and balances after it. None of these corrections touches a suspense account, because there was never a difference for a suspense account to hold.',
              'The reversal repays slowing down for. The payment should have been Dr Payables £480 and Cr Bank £480; it went in as the exact opposite. Payables is therefore £480 too high **and** short of the £480 debit it should have received, so it is out by £960 — and the same on the bank. Correcting a reversal always takes twice the original figure, and using the original figure once leaves the accounts wrong by the same amount in the opposite direction.',
              'The original entry error takes only the difference. £742 − £472 = £270 was missing from both sides, so adding £270 to each is enough; reversing the whole entry and reposting it gets to the same place with more writing.',
            ],
            examtrap: 'Reversal corrections are doubled. Original entry corrections are not — there you post the difference. Applying the wrong rule to either leaves the ledger balanced and wrong, so nothing downstream will flag it.',
          },
          {
            h: 'What a disagreement does tell you',
            split: {
              left: {
                title: 'The trial balance catches these',
                items: [
                  'A one-sided entry — one half posted, the other forgotten',
                  'Different amounts on the two sides of one transaction',
                  'A balance entered in the wrong column',
                  'A column added up wrongly',
                  'A ledger balance left off the listing altogether',
                ],
              },
              right: {
                title: 'And misses these',
                items: [
                  'Omission of the whole transaction',
                  'Commission — wrong account, right type',
                  'Principle — wrong type of account',
                  'Original entry — wrong figure on both sides',
                  'Reversal of the two entries',
                  'Compensating errors that cancel out',
                ],
              },
            },
            p: [
              'Read as a pair, the two columns say what the check is for. It tests whether each transaction was recorded twice for the same amount on opposite sides. Anything that satisfies that test passes, however wrong it is.',
              'So the left-hand column is the set of errors that produce a difference, and a suspense account is opened to hold exactly that difference. That is the next lesson. The right-hand column produces no difference at all, and those errors are found by reconciliations, by the control accounts from Outcome 2, and by somebody noticing that a figure looks wrong.',
            ],
          },
        ],
        check: [
          {
            type: 'mcq',
            q: 'A payment of £650 to a supplier was recorded as a debit to bank and a credit to payables. What entry corrects it?',
            opts: ['Dr Payables £1,300 · Cr Bank £1,300', 'Dr Payables £650 · Cr Bank £650', 'Dr Bank £1,300 · Cr Payables £1,300', 'Dr Suspense £1,300 · Cr Bank £1,300'],
            ans: 0,
            exp: 'The entry went in exactly backwards, so each account is wrong by £650 twice over — once for the entry it should not have had and once for the entry it never got. Correcting a reversal always takes double the original figure. No suspense account is involved, because the reversed entry balanced and the trial balance never disagreed.',
          },
          {
            type: 'truefalse',
            q: 'Identify whether each error would be revealed by the trial balance.',
            statements: [
              { text: 'A purchase invoice omitted from the books entirely.', answer: false },
              { text: 'A sales balance entered in the debit column.', answer: true },
              { text: 'Repairs to a van debited to the motor vehicles account.', answer: false },
              { text: 'A cheque debited to the bank but never credited to the customer.', answer: true },
              { text: 'An invoice for £852 entered in the daybook as £582.', answer: false },
            ],
            exp: 'A wrong column and a missing half both leave the totals apart, so both show. An omitted invoice, a repair capitalised as an asset and a figure transposed before it entered the daybook all leave debits equal to credits — the first is an error of omission, the second of principle, the third of original entry.',
          },
        ],
      },

      {
        id: 'L3-FAPS-6D',
        title: 'The suspense account',
        icon: '⚖️',
        criteria: ['FAPS-6.1.7'],
        cards: [
          {
            h: 'A holding account for a difference nobody has explained yet',
            p: [
              'When the two columns do not agree, the difference is entered as a **suspense account** balance on whichever side is short. The trial balance then agrees, and the work of finding out why can start without the rest of the year end being held up.',
              'Which side follows from the arithmetic alone. If the credits come to more than the debits, the debit column needs the difference, so the suspense balance is a debit. If the debits come to more, it is a credit. Reading it as though suspense were an asset or a liability puts it on the wrong side half the time.',
              'It is a temporary account and has to be gone by the time the financial statements are prepared. A suspense balance still sitting in the ledger at the year end means an error is still in there, unexplained, somewhere among figures that are about to be published.',
            ],
            formula: 'Suspense balance = the difference, on the side that is short',
            callout: { kind: 'warn', text: 'A suspense account never appears in a statement of profit or loss or a statement of financial position. If one is left, the difference has been hidden rather than found.' },
          },
          {
            h: 'Finding the errors and clearing the account',
            worked: {
              title: 'A difference of £4,370, and the three entries behind it',
              problem: 'A trial balance shows debits of £312,180 and credits of £316,550. Three errors are then found. The sales daybook total of £8,400 was credited to sales correctly but posted to the receivables control account as £4,800. Discounts received of £520 were debited to the discounts received account instead of credited to it. And the insurance account balance of £1,810 was left off the listing altogether. Clear the suspense account.',
              steps: [
                {
                  do: 'Open suspense with the difference: £316,550 − £312,180 = £4,370, and the debit column is the short one, so it is a debit balance.',
                  why: 'Credits exceed debits, so a debit of £4,370 brings the two columns level. Nothing has been explained yet — the balance is a placeholder for three faults not yet identified.',
                },
                {
                  do: 'Error one: receivables are short by £8,400 − £4,800 = £3,600. Dr Receivables control £3,600, Cr Suspense £3,600.',
                  why: 'One side of the posting used the right figure and the other did not, so the ledger is out by the difference. The credit half of the correction goes to suspense because that is where the missing £3,600 was parked.',
                },
                {
                  do: 'Error two: the £520 is on the wrong side, so it is out by £520 + £520 = £1,040. Dr Suspense £1,040, Cr Discounts received £1,040.',
                  why: 'A figure on the wrong side is doubly wrong — it is where it should not be and absent from where it should be. Correcting it takes twice the amount, exactly as a reversal does.',
                },
                {
                  do: 'Error three: Dr Insurance £1,810, Cr Suspense £1,810.',
                  why: 'The ledger account was always right; the listing missed it. Adding it puts the debit column up by £1,810 and takes the same amount out of suspense.',
                },
                {
                  do: 'Prove it: debits £4,370 + £1,040 = £5,410 against credits £3,600 + £1,810 = £5,410.',
                  why: 'The account closes to nil, which is the test that all three errors have been found. A remaining balance means at least one more is still out there.',
                },
              ],
              answer: 'The suspense account clears exactly, so the three errors between them account for the whole £4,370.',
              tryIt: {
                q: 'A trial balance shows debits of £248,900 and credits of £247,400. What is the suspense account balance?',
                answer: 1500,
                unit: '£',
                hint: 'Work out the difference, then ask which column needs it.',
                exp: 'The difference is £248,900 − £247,400 = £1,500. The debits are the larger side, so the credit column is short and the suspense balance is a credit of £1,500.',
              },
            },
          },
          {
            h: 'Which errors reach suspense, and what they do to profit',
            table: {
              headers: ['', 'Goes through suspense?', 'Why'],
              rows: [
                ['One side of an entry missing', 'Yes', 'The ledger is out by the amount'],
                ['A figure on the wrong side', 'Yes', 'Out by twice the amount'],
                ['Different figures on the two sides', 'Yes', 'Out by the difference'],
                ['A balance omitted from the listing', 'Yes', 'The listing is out, though the ledger is not'],
                ['Omission, commission, principle', 'No', 'The ledger balanced before and after'],
                ['Reversal, original entry, compensating', 'No', 'Both sides moved together'],
              ],
            },
            p: [
              'The test is simply whether the ledger was out of balance. A correcting journal with one leg in suspense is putting back an amount that suspense was holding; a journal with both legs in real accounts is moving a figure that was never missing.',
              'Corrections change profit as well as clearing suspense, and the assessment often asks for the revised figure. Two of the three errors above touch the profit statement. Moving £520 of discounts received from the debit side to the credit side adds £1,040 of income, and bringing in the omitted insurance adds £1,810 of expense. So profit falls by £1,810 − £1,040 = £770, while the receivables correction changes nothing at all because both accounts it touches sit on the statement of financial position.',
            ],
            examtrap: 'Work out the effect on profit account by account rather than from the suspense entries. A correction can clear a large suspense balance and change profit by nothing, or clear none of it and change profit by a great deal.',
          },
        ],
        check: [
          {
            type: 'mcq',
            q: 'A trial balance has debits of £184,300 and credits of £186,900. How is the suspense account opened?',
            opts: ['A debit balance of £2,600', 'A credit balance of £2,600', 'A debit balance of £5,200', 'A credit balance of £371,200'],
            ans: 0,
            exp: 'Credits exceed debits by £186,900 − £184,300 = £2,600, so the debit column is the short one and a debit of £2,600 brings them level. Doubling applies to correcting a figure on the wrong side, not to opening the account.',
          },
          {
            type: 'truefalse',
            q: 'Identify whether each correction would involve the suspense account.',
            statements: [
              { text: 'A rent payment debited to rent and never credited to bank.', answer: true },
              { text: 'A van repair debited to the motor vehicles account.', answer: false },
              { text: 'Discounts allowed of £90 credited rather than debited.', answer: true },
              { text: 'A sales invoice posted to the wrong customer account.', answer: false },
              { text: 'A supplier payment recorded the right accounts but the wrong way round.', answer: false },
            ],
            exp: 'A missing half and a figure on the wrong side both leave the ledger out of balance, so both were held in suspense. Capitalising a repair, posting to the wrong customer and reversing a pair of entries all leave debits equal to credits, so there was never a difference for suspense to hold and the correction moves figures between real accounts.',
          },
        ],
      },

      {
        id: 'L3-FAPS-6E',
        title: 'The adjustments columns',
        icon: '➕',
        criteria: ['FAPS-6.2.1', 'FAPS-6.2.2'],
        cards: [
          {
            h: 'Two more columns, under the same rule',
            p: [
              'Once the errors are out, the period end work from Outcome 5 goes in. Rather than rewriting the ledger balances, the adjusted trial balance sets two further columns beside them — adjustments debit and adjustments credit — and each adjustment is entered as the double entry it is.',
              'So the adjustments columns have to total the same as each other, for the same reason the ledger columns do. Every adjustment has two halves, and if the halves have all been entered the two totals match. A difference between them means an adjustment went in once, or twice on the same side.',
              'Keeping the original balances visible is the point of the layout. A reader can see what the ledger held, what was added at the year end, and what the two come to, all on one line, so an error in the adjustment stays traceable instead of being absorbed into a figure nobody can take apart.',
            ],
            callout: { kind: 'key', text: 'Two totals to prove, not one. The ledger columns agree with each other and the adjustments columns agree with each other, and neither says anything about the other.' },
          },
          {
            h: 'What each adjustment does to the two columns',
            table: {
              headers: ['Adjustment', 'Debit', 'Credit'],
              rows: [
                ['Closing inventory', 'Inventory — asset', 'Inventory — cost of sales'],
                ['Accrued expense', 'The expense', 'Accruals'],
                ['Prepaid expense', 'Prepayments', 'The expense'],
                ['Accrued income', 'Accrued income', 'The income account'],
                ['Prepaid income', 'The income account', 'Deferred income'],
                ['Depreciation for the year', 'Depreciation charge', 'Accumulated depreciation'],
                ['Irrecoverable debt written off', 'Irrecoverable debts', 'Trade receivables'],
                ['Increase in the allowance', 'Allowance adjustment', 'Allowance for doubtful receivables'],
                ['Correction of an error', 'Whatever the journal says', 'Whatever the journal says'],
                ['Disposal of a non-current asset', 'Disposals with the cost, accumulated depreciation, and bank with the proceeds', 'The asset at cost, and disposals with both the depreciation and the proceeds'],
              ],
            },
            p: [
              'Nothing in that table is new. Every line is a journal from Outcome 3, 4 or 5, written into two columns instead of into a ledger account — which is why an assessment can hand you the adjustments as a list of sentences and expect them placed without further explanation.',
              'Closing inventory is the row that looks wrong and is not. It carries a debit and a credit of the same amount, to two different accounts that share a name: the asset that will appear on the statement of financial position, and the deduction that reduces cost of sales. Outcome 5 sets out why one figure does both jobs.',
              'A reduction in the allowance runs the other way from the row above — debit the allowance, credit the adjustment account — and only the movement is entered either way, never the whole allowance.',
            ],
          },
          {
            h: 'Placing a set of adjustments',
            worked: {
              title: 'Six adjustments, and a column total to prove',
              problem: 'Closing inventory is £21,000. Fixtures cost £30,000 and are depreciated at 10% straight line; motor vehicles cost £24,000 with accumulated depreciation of £9,600 and are depreciated at 25% diminishing balance. Wages of £1,200 are accrued and insurance of £900 is prepaid. A debt of £1,000 is to be written off, and the allowance for doubtful receivables is to be 4% of the receivables that remain — trade receivables stand at £26,000 and the allowance brought forward is £900. What does each adjustments column total?',
              steps: [
                {
                  do: 'Closing inventory: debit £21,000 and credit £21,000.',
                  why: 'One figure, both columns, two different accounts. It is the only adjustment that appears on both sides of its own line.',
                },
                {
                  do: 'Depreciation: fixtures £30,000 × 10% = £3,000; vehicles on a carrying amount of £24,000 − £9,600 = £14,400, so £14,400 × 25% = £3,600. Debit the charge with £3,000 + £3,600 = £6,600.',
                  why: 'Straight line runs on cost and diminishing balance on the carrying amount, so the accumulated depreciation is subtracted for one method and ignored for the other. The credits go to the two accumulated depreciation accounts separately.',
                },
                {
                  do: 'Accrual and prepayment: debit wages £1,200 and credit accruals; debit prepayments £900 and credit insurance.',
                  why: 'The expense rises for the accrual and falls for the prepayment. Each half lands in a different column, so the two totals stay level.',
                },
                {
                  do: 'Write off £1,000, then set the allowance: receivables become £26,000 − £1,000 = £25,000, and £25,000 × 4% = £1,000 is required against £900 brought forward, so the increase is £1,000 − £900 = £100.',
                  why: 'The write-off comes first, because the percentage is applied to what is left after it. Only the movement of £100 is entered — putting in the whole £1,000 would charge the allowance twice over.',
                },
                {
                  do: 'Debit column: £21,000 + £6,600 + £1,200 + £900 + £1,000 + £100 = £30,800. Credit column: £21,000 + £3,000 + £3,600 + £1,200 + £900 + £1,000 + £100 = £30,800.',
                  why: 'The credit side has one more entry than the debit side, because the single depreciation charge is credited to two accounts. The totals still agree, which is the only test the columns have to pass.',
                },
              ],
              answer: 'Both adjustments columns total £30,800.',
              tryIt: {
                q: 'Closing inventory £14,500, depreciation for the year £5,200, an accrual for electricity of £700, prepaid rates of £1,300 and an irrecoverable debt of £450. What does the adjustments debit column total?',
                answer: 22150,
                unit: '£',
                hint: 'Every adjustment puts something in the debit column. Ask what each one debits.',
                exp: 'Closing inventory debits the asset, depreciation debits the charge, the accrual debits the expense, the prepayment debits prepayments and the write-off debits irrecoverable debts: £14,500 + £5,200 + £700 + £1,300 + £450 = £22,150.',
              },
            },
          },
          {
            h: 'What the software does with all of this',
            p: [
              'A computerised system does not use adjustment columns. Each adjustment is posted as an ordinary journal, the affected balances change the moment it is saved, and asking for the trial balance again returns the recalculated figures. There is no intermediate document because there is nothing to hold in suspense between one step and the next.',
              'What that removes is the audit trail across the page. On paper the ledger balance and the adjustment sit side by side, so a reviewer can see both; on screen the balance has simply changed, and reconstructing what it was means reading the journal history. Software makes the recalculation instant and makes the working invisible.',
              'The assessment tests the paper version, and knowing it earns more than the marks. It lets you say where a figure in a computerised system came from, which is the question anybody reviewing the accounts will actually ask.',
            ],
            examtrap: 'A task may give an adjustment already reflected in the ledger balances. Entering it again in the adjustments columns charges it twice, and the columns still agree — so nothing about the layout will warn you.',
          },
        ],
        check: [
          {
            type: 'numeric',
            q: 'Adjustments are closing inventory £18,000, depreciation £7,400, an accrual of £950 and a prepayment of £600. What does the adjustments credit column total?',
            answer: 26950,
            unit: '£',
            exp: 'Every adjustment credits something: inventory credits cost of sales, depreciation credits accumulated depreciation, the accrual credits accruals and the prepayment credits the expense. £18,000 + £7,400 + £950 + £600 = £26,950, and the debit column comes to the same.',
          },
          {
            type: 'truefalse',
            q: 'Identify whether each statement about the adjustments columns is correct.',
            statements: [
              { text: 'The two adjustments columns must total the same as each other.', answer: true },
              { text: 'The adjustments columns must total the same as the ledger columns.', answer: false },
              { text: 'Closing inventory is entered in both adjustments columns.', answer: true },
              { text: 'The whole allowance for doubtful receivables is entered, not just the movement.', answer: false },
              { text: 'The allowance percentage is applied before any debt is written off.', answer: false },
            ],
            exp: 'Each adjustment is a double entry, so the two adjustment totals agree with each other — and they have no relationship at all with the ledger totals, which are a different set of figures. Closing inventory debits the asset and credits cost of sales. Only the movement in the allowance ever reaches the columns, and it is worked out on the receivables that survive the write-off.',
          },
        ],
      },

      {
        id: 'L3-FAPS-6F',
        title: 'Extending to the profit and position columns',
        icon: '📤',
        criteria: ['FAPS-6.3.1', 'FAPS-6.3.3'],
        cards: [
          {
            h: 'Why the trial balance is extended at all',
            p: [
              'A trial balance with adjustments in it holds every figure the financial statements need, and holds them in one undifferentiated list. Extending it adds four more columns — profit or loss debit and credit, financial position debit and credit — and puts each line into the pair it belongs to.',
              'Once that is done, preparing the two statements is transcription. Every figure in the profit columns goes into the statement of profit or loss and every figure in the position columns into the statement of financial position, in the order Outcome 7 sets out. No arithmetic is left to do and nothing has to be classified twice.',
              'It also localises mistakes. A figure sent to the wrong pair of columns shows up as two column totals that will not reconcile, at a point where one line can still be traced. Discovering the same fault while drafting the statements means going back through everything to find which line moved.',
            ],
            callout: { kind: 'key', text: 'Extend the combined figure, not the ledger balance. Ledger balance and adjustment are netted first, and the single result crosses the page.' },
          },
          {
            h: 'Which line goes into which pair',
            example: {
              title: 'Nine lines from an extended trial balance',
              rows: [
                ['Account', 'Ledger', 'Adjustment', 'Goes to', 'Figure'],
                ['Premises', '120,000 Dr', '—', 'SFP debit', '120,000'],
                ['Sales', '265,000 Cr', '—', 'SPL credit', '265,000'],
                ['Opening inventory', '18,000 Dr', '—', 'SPL debit', '18,000'],
                ['Wages', '48,000 Dr', '1,200 Dr', 'SPL debit', '49,200'],
                ['Insurance', '3,600 Dr', '900 Cr', 'SPL debit', '2,700'],
                ['Trade receivables', '26,000 Dr', '1,000 Cr', 'SFP debit', '25,000'],
                ['Accumulated depreciation', '12,000 Cr', '3,000 Cr', 'SFP credit', '15,000'],
                ['Closing inventory', '—', '21,000 Dr and Cr', 'Both pairs', '21,000 each'],
                ['Drawings', '27,000 Dr', '—', 'SFP debit', '27,000'],
              ],
            },
            p: [
              'Income and expense accounts go to the profit columns; assets, liabilities, capital and drawings go to the position columns. That is the whole classification, and it is the one from lesson 2B rather than anything new.',
              'The side is carried over unchanged. A debit stays a debit and a credit stays a credit — extending a figure moves it across the page, never across the columns. So wages of £48,000 + £1,200 = £49,200 goes to the profit **debit** column, and insurance of £3,600 − £900 = £2,700 goes to the same column having been reduced rather than moved.',
              'Two lines repay a second reading. Accumulated depreciation is a credit that grows: £12,000 + £3,000 = £15,000 to the position credit column, while the charge that created it sits in the profit debit column as a separate line. And receivables of £26,000 − £1,000 = £25,000 shows an adjustment credit reducing a debit balance, which is the shape most write-offs and prepayment reversals take.',
            ],
          },
          {
            h: 'Closing inventory, the line that goes to both',
            p: [
              'Closing inventory has no ledger balance at all — it comes into existence as an adjustment — and it is extended to two different places. The debit goes to the position columns, because unsold goods are an asset the business owns on the last day of the year. The credit goes to the profit columns, where it reduces cost of sales, because goods still on the shelf were not sold and their cost belongs to next year.',
              'Both halves carry the same figure, and neither is a duplicate of the other. They are the two consequences of one fact, recorded in the two statements that report it.',
              'Extending only one of them is a common enough slip to name. Miss the credit and the profit is understated by the whole closing inventory; miss the debit and the position statement loses an asset. Either way the column totals stop agreeing, which at least means the error announces itself.',
            ],
            examtrap: 'Opening inventory goes only to the profit debit column. It is last year\'s closing figure, already an asset in last year\'s statement, and this year it is a cost of the goods sold, and only that.',
          },
        ],
        check: [
          {
            type: 'numeric',
            q: 'An expense account shows a ledger balance of £8,900 debit and an adjustments credit of £1,400. What figure is extended to the profit or loss debit column?',
            answer: 7500,
            unit: '£',
            exp: 'The two are netted before anything crosses the page: £8,900 − £1,400 = £7,500. The adjustment reduces the expense rather than moving it, so the figure stays in the debit column and only its size changes.',
          },
          {
            type: 'truefalse',
            q: 'Identify whether each line is extended to the statement of financial position columns.',
            statements: [
              { text: 'Drawings.', answer: true },
              { text: 'The depreciation charge for the year.', answer: false },
              { text: 'Accumulated depreciation.', answer: true },
              { text: 'Opening inventory.', answer: false },
              { text: 'Discounts received.', answer: false },
            ],
            exp: 'Drawings reduce capital and accumulated depreciation is a credit sitting against an asset, so both belong to the position columns. The depreciation charge is this year\'s cost and the opening inventory is part of the cost of goods sold, so both go to the profit columns, as does discounts received — on the credit side, being income.',
          },
        ],
      },

      {
        id: 'L3-FAPS-6G',
        title: 'Balancing off, and where the profit goes',
        icon: '🏁',
        criteria: ['FAPS-6.3.4'],
        cards: [
          {
            h: 'The profit is whatever is missing',
            p: [
              'When every line has been extended, all four columns are totalled and none of the four pairs agrees. The profit columns are apart because income exceeded expenses; the position columns are apart by exactly the same amount, because a business that earned more than it spent holds assets it does not owe to anybody but its owner.',
              'That difference is the profit for the year, and it is entered twice to close both pairs. It goes into the profit **debit** column, where it balances the excess of income over expenses, and into the position **credit** column, where it increases what the business owes its owner.',
              'A loss reverses both. Expenses exceed income, so the balancing figure goes into the profit credit column, and it reduces capital, so its other half goes into the position debit column. Nothing about the method changes — the figure lands on the other side of each pair.',
            ],
            formula: 'Profit = profit-column credits − profit-column debits = position-column debits − position-column credits',
          },
          {
            h: 'Totalling and closing the four columns',
            worked: {
              title: 'The last step of an extended trial balance',
              problem: 'After every line has been extended, the profit or loss columns total £239,800 debit and £287,400 credit. The statement of financial position columns total £255,300 debit and £207,700 credit. Balance the extended trial balance off.',
              steps: [
                {
                  do: 'Profit columns: £287,400 − £239,800 = £47,600.',
                  why: 'Income of £287,400 against costs of £239,800. A larger credit side is how a profit presents itself at this stage.',
                },
                {
                  do: 'Position columns: £255,300 − £207,700 = £47,600.',
                  why: 'The same figure, arrived at from unrelated numbers. Agreement is the check — two different differences would mean a line went to the wrong pair of columns.',
                },
                {
                  do: 'Enter £47,600 in the profit debit column: £239,800 + £47,600 = £287,400.',
                  why: 'The pair now agrees. The entry is on the debit side because the profit is being taken out of the profit statement and handed to the owner.',
                },
                {
                  do: 'Enter £47,600 in the position credit column: £207,700 + £47,600 = £255,300.',
                  why: 'And that pair agrees too. A credit, because the profit increases what the business owes its owner — the same entry the capital account receives in Outcome 7.',
                },
                {
                  do: 'Label it. A profit for the year of £47,600.',
                  why: 'One figure appears in two columns on opposite sides of the page. Entering it twice on the same side is the mistake this step invites, and it leaves both pairs further apart than before.',
                },
              ],
              answer: 'A profit of £47,600, closing the profit columns at £287,400 and the position columns at £255,300.',
              tryIt: {
                q: 'The profit or loss columns of an extended trial balance total £96,400 debit and £118,900 credit. What is the profit for the year?',
                answer: 22500,
                unit: '£',
                hint: 'Which side is larger, and by how much?',
                exp: 'Income exceeds expenses by £118,900 − £96,400 = £22,500, so that is the profit. It is entered in the profit debit column to close the pair, and in the position credit column, where it raises capital.',
              },
            },
          },
          {
            h: 'Proving it against the capital account',
            p: [
              'The profit figure can be checked against the owner\'s capital before anything is drafted, and doing it while the working is still in front of you costs a minute. In the example above the ledger held capital of £156,000 and drawings of £27,000, so closing capital is £156,000 + £47,600 − £27,000 = £176,600.',
              'Net assets should come to the same. Take the drawings out of the position debit column, because drawings are not an asset: £255,300 − £27,000 = £228,300. Take the capital out of the position credit column, because capital is not a liability: £207,700 − £156,000 = £51,700. Net assets are then £228,300 − £51,700 = £176,600, matching the capital account.',
              'Two routes, one figure, and the second route uses none of the arithmetic of the first. When they disagree, the profit is wrong or a line was extended to the wrong pair, and both are far cheaper to find here than in a finished statement.',
            ],
            examtrap: 'A loss is entered in the profit credit column and the position debit column. Reaching for the profit positions out of habit puts both pairs further out, by twice the loss.',
          },
        ],
        check: [
          {
            type: 'mcq',
            q: 'The profit or loss columns total £164,200 debit and £151,800 credit. What is entered, and where?',
            opts: ['A loss of £12,400 in the profit credit and position debit columns', 'A loss of £12,400 in the profit debit and position credit columns', 'A profit of £12,400 in the profit debit and position credit columns', 'A loss of £24,800 in the profit credit and position debit columns'],
            ans: 0,
            exp: 'Expenses of £164,200 exceed income of £151,800 by £12,400, which is a loss. It closes the profit columns from the credit side and reduces capital, so its other half is a debit in the position columns. The figure is entered once in each pair, never doubled.',
          },
          {
            type: 'numeric',
            q: 'The statement of financial position columns total £310,600 debit and £268,900 credit. What is the profit for the year?',
            answer: 41700,
            unit: '£',
            exp: 'The position columns are apart by the profit just as the profit columns are: £310,600 − £268,900 = £41,700. The debit side being larger means assets exceed what is owed, which is the residue a profitable year leaves.',
          },
        ],
      },

      {
        id: 'L3-FAPS-6H',
        title: 'What changes for a partnership',
        icon: '🚧',
        criteria: ['FAPS-6.3.2'],
        cards: [
          {
            h: 'The same document, a different bottom half',
            table: {
              headers: ['', 'Sole trader', 'Partnership'],
              rows: [
                ['Ledger and adjustments columns', 'Identical', 'Identical'],
                ['Profit and loss columns', 'Identical', 'Identical'],
                ['Capital in the position columns', 'One balance', 'One capital account per partner'],
                ['Also in the position columns', '—', 'One current account per partner'],
                ['Drawings', 'One balance', 'One per partner, or debited straight to their current accounts'],
                ['Where the profit goes', 'Straight to the position credit column', 'To the appropriation account first'],
              ],
            },
            p: [
              'Everything above the profit figure is the same document. A partnership trades, adjusts and extends exactly as a sole trader does, because the trading is the same activity and the adjustments are the same adjustments.',
              'The bottom half is where two owners show. Instead of one capital balance the position columns carry four balances for two partners — a capital account and a current account each — and each of those is extended like any other credit balance.',
              'The last row is the one that changes the method rather than the layout, and the next card is about it.',
            ],
          },
          {
            h: 'Why the profit cannot simply be extended',
            p: [
              'A sole trader\'s profit belongs to one person, so it can go straight into the position credit column and be done with. A partnership\'s profit belongs to two or more people in proportions their agreement sets, and the extended trial balance has no column that can express that.',
              'So the figure leaves the profit columns and goes to the **appropriation account** — interest on capital and any salaries out, interest on drawings in, the residue split in the profit-sharing ratio — and it is each partner\'s share, not the profit, that reaches their current account and the position columns.',
              'A profit of £60,000 in a partnership where one partner has a salary of £10,000 and the residue is split equally leaves £60,000 − £10,000 = £50,000 to share, so £50,000 ÷ 2 = £25,000 each. One partner\'s current account is credited with £25,000 and the other\'s with £10,000 + £25,000 = £35,000, and £25,000 + £35,000 = £60,000 arrives in the position columns as two figures rather than one. Outcome 7 works the appropriation account through in full.',
            ],
            callout: { kind: 'key', text: 'The difference is not the layout but the step in the middle: a partnership divides the profit before any of it reaches the position columns.' },
          },
          {
            h: 'What the specification asks of you here',
            split: {
              left: {
                title: 'Assessed',
                items: [
                  'Knowing why a partnership ETB differs from a sole trader\'s',
                  'That the difference lies in the capital and current accounts',
                  'That the profit is appropriated before it is credited',
                  'Completing and balancing an ETB for a sole trader',
                ],
              },
              right: {
                title: 'Excluded',
                items: [
                  'Completing the extended trial balance for a partnership',
                ],
              },
            },
            p: [
              'The specification excludes **completion of the ETB for partnerships** from this outcome. You will not be asked to extend one, total it and enter the appropriated shares, and practising that is time spent on a task the assessment does not set.',
              'Knowing the difference is assessed, which is a different thing and needs separating. A question can ask what changes and why; it will not hand you a partnership trial balance and ask for it filled in.',
              'The partnership work that is assessed lives in Outcome 7 — the appropriation account, the capital and current accounts, and the statement of financial position that presents them. What is excluded is bringing those into this particular document.',
            ],
            examtrap: 'Two exclusions apply to this unit. This is one; the VAT treatment of part-exchanges in Outcome 3 is the other. Both are stated in the specification, and neither is a hint that the underlying idea is unimportant — only that this unit does not test it.',
          },
        ],
        check: [
          {
            type: 'mcq',
            q: 'What is the main difference between an extended trial balance for a partnership and one for a sole trader?',
            opts: ['The profit is appropriated between the partners before it is credited', 'The adjustments columns are totalled separately for each partner', 'The trading section is prepared on a different basis', 'The profit and loss columns are extended in the opposite direction'],
            ans: 0,
            exp: 'Everything down to the profit figure is the same document, because the trading and the adjustments are the same. What changes is that a partnership divides the profit through the appropriation account first, so it reaches the position columns as a share in each partner\'s current account rather than as one credit to capital.',
          },
          {
            type: 'truefalse',
            q: 'Identify whether each statement about partnership extended trial balances is correct.',
            statements: [
              { text: 'The position columns carry a capital and a current account for each partner.', answer: true },
              { text: 'Completing an ETB for a partnership is assessed in this unit.', answer: false },
              { text: 'The adjustments are worked out differently from a sole trader\'s.', answer: false },
              { text: 'Knowing why the two differ is assessed in this unit.', answer: true },
              { text: 'A partner\'s salary is extended to the profit and loss debit column.', answer: false },
            ],
            exp: 'Fixed capital gives each partner two balances, and both sit in the position columns. The specification excludes completing a partnership ETB while still asking you to know why it differs. Adjustments are the same adjustments — depreciation and accruals do not change because there are two owners. And a partner\'s salary is an appropriation of profit, so it never appears among the expenses.',
          },
        ],
      },
    ],
    cheatsheet: {
      id: 'L3-FAPS-6S',
      title: 'The trial balance on one card',
      icon: '🗂️',
      card: {
        h: 'Outcome 6 at a glance',
        p: [
          'A trial balance that agrees proves the arithmetic of double entry held. It proves nothing about whether the entries reached the right accounts — which is what the six errors below are.',
        ],
        split: {
          left: {
            title: 'It catches these',
            items: [
              'One side of an entry missing',
              'Different amounts on the two sides',
              'A balance in the wrong column — out by twice',
              'A column cast wrongly',
              'A balance left off the listing',
            ],
          },
          right: {
            title: 'It misses these six',
            items: [
              'Omission — the transaction never went in',
              'Commission — wrong account, right type',
              'Principle — wrong TYPE of account',
              'Original entry — wrong figure on both sides',
              'Reversal — right accounts, wrong way round',
              'Compensating — two errors that cancel',
            ],
          },
        },
        table: {
          headers: ['Step', 'The rule'],
          rows: [
            ['Suspense', 'Goes on whichever side is SHORT · credits larger → a debit'],
            ['Correcting a reversal', 'Takes twice the original figure'],
            ['Correcting an original entry', 'Takes the difference only'],
            ['Adjustments columns', 'Agree with each other · unrelated to the ledger totals'],
            ['Extending', 'Net balance and adjustment first, then carry one figure'],
            ['Closing inventory', 'Debit the position pair · credit the profit pair'],
            ['Profit', 'Profit DEBIT and position CREDIT · a loss reverses both'],
          ],
        },
        examtrap: 'A suspense balance left at the year end means an error is still unfound, sitting among figures about to be published. And completion of the extended trial balance for a partnership is excluded from this unit — knowing why it differs is not.',
      },
    },
  };

  /* ══════════════════════════════════════════════════════════════════════════
     OUTCOME 8 — Interpret financial statements using profitability ratios.
     10% of the assessment. The first outcome that does not ask you to build
     anything: the statements already exist, and the question is what they say.
     ══════════════════════════════════════════════════════════════════════════ */

  var LO8 = {
    unit: 'faps',
    level: 3,
    title: 'Financial Accounting: Preparing Financial Statements',
    outcome: 8,
    outcomeTitle: 'Interpret financial statements using profitability ratios',
    weighting: 10,
    lessons: [
      {
        id: 'L3-FAPS-8A',
        title: 'What a ratio is for',
        icon: '🔍',
        criteria: ['FAPS-8.1.1', 'FAPS-8.1.3', 'FAPS-8.2.1'],
        cards: [
          {
            h: 'A figure on its own says almost nothing',
            p: [
              'A business made £40,000 profit last year. Is that good?',
              'The honest answer is that you cannot tell. £40,000 on sales of £80,000 is remarkable. The same £40,000 on sales of £4 million is close to breaking even. The same £40,000 earned on capital of £2 million would be better left in a savings account.',
              'A **ratio** fixes that by putting the figure next to the thing that produced it. Every profitability ratio in this outcome is one number divided by another and multiplied by a hundred, and the whole skill is knowing which second number makes the first one mean something.',
            ],
            callout: { kind: 'key', text: 'A ratio is a profit figure divided by whatever generated it. On its own a profit is a number; against sales or capital it becomes a rate you can compare.' },
          },
          {
            h: 'Where the two statements meet',
            p: [
              'Profitability ratios pull from both statements at once, and the join between them is one figure: **profit for the year**.',
              'The statement of profit or loss works that figure out — revenue, less cost of sales, less expenses. The statement of financial position then receives it, because profit belongs to the owner and is added to capital. The same number ends one statement and moves the other.',
              'That is why a ratio can take its top line from the SPL and its bottom line from the SFP without any sleight of hand. ROCE does exactly that: this year\'s profit over the capital that was available to earn it.',
            ],
            split: {
              left: { title: 'Statement of profit or loss', items: ['Revenue', 'Cost of sales', 'Gross profit', 'Expenses', '**Profit for the year**'] },
              right: { title: 'Statement of financial position', items: ['Assets', 'Liabilities', 'Capital at start', '**Add profit for the year**', 'Less drawings → capital at end'] },
            },
            examtrap: 'Profit for the year appears in both statements and is not double counted. It is calculated in one and appropriated in the other — a question that offers "profit is recorded twice" as a criticism is offering a distractor.',
          },
          {
            h: 'Why anyone bothers',
            p: [
              'Ratios exist to support three things: **planning**, **decision making** and **control**.',
              'Planning is forward looking. A business that knows its gross profit margin has held at 40% for three years can price next year\'s work and forecast what a 10% rise in volume would produce.',
              'Decision making is a choice between options. A lender comparing two applicants reads their ROCE. An owner deciding whether to drop a product line reads what that line does to the margin.',
              'Control is the quiet one and the most useful. A margin that falls from 40% to 34% with no change in prices is a signal that something has gone wrong — theft, waste, a supplier increase absorbed rather than passed on, or goods sold at a discount nobody authorised. The ratio does not say which. It says look.',
            ],
            callout: { kind: 'note', text: 'A ratio never explains anything. It narrows where to look, and the explanation always comes from asking about the business.' },
          },
        ],
        check: [
          {
            type: 'mcq',
            q: 'Which figure links the statement of profit or loss to the statement of financial position?',
            opts: ['Profit for the year', 'Sales revenue', 'Cost of sales', 'Closing inventory'],
            ans: 0,
            exp: 'Profit for the year is calculated at the foot of the statement of profit or loss and then added to capital in the statement of financial position. Closing inventory does appear in both, but as an asset and as a deduction within cost of sales rather than as the link between the two statements.',
          },
          {
            type: 'truefalse',
            q: 'Identify whether each statement about profitability ratios is correct.',
            statements: [
              { text: 'A profit figure on its own cannot show whether a business performed well.', answer: true },
              { text: 'A ratio explains why performance changed.', answer: false },
              { text: 'Ratios support planning, decision making and control.', answer: true },
              { text: 'A falling gross profit margin always means prices were cut.', answer: false },
            ],
            exp: 'A ratio measures; it does not diagnose. A margin that falls could be a price cut, but it could equally be higher supplier costs, wastage, theft, or a change in the mix of what was sold. The ratio tells you where to ask the question.',
          },
        ],
      },

      {
        id: 'L3-FAPS-8B',
        title: 'The four ratios',
        icon: '🧮',
        criteria: ['FAPS-8.1.2', 'FAPS-8.1.4'],
        cards: [
          {
            h: 'Four formulas, and one thing they share',
            p: [
              'The assessment asks for four profitability ratios. Three of them divide by **sales revenue** and one divides by **capital employed**, and knowing which is which is most of the battle.',
            ],
            table: {
              headers: ['Ratio', 'Formula', 'What it answers'],
              rows: [
                ['Gross profit margin', 'Gross profit ÷ sales revenue × 100', 'Of every £100 sold, how much is left after paying for the goods?'],
                ['Net profit margin', 'Profit for the year ÷ sales revenue × 100', 'Of every £100 sold, how much is left after everything?'],
                ['Expense / sales revenue', 'A specified expense ÷ sales revenue × 100', 'What share of sales does this one cost eat?'],
                ['ROCE', 'Profit for the year ÷ capital employed × 100', 'What rate is the money invested in the business earning?'],
              ],
            },
            formula: 'Capital employed = capital + non-current liabilities',
            callout: { kind: 'key', text: 'Capital employed is not just the owner\'s capital. It is capital PLUS non-current liabilities — every pound of long-term funding the business had to work with, whoever it came from.' },
          },
          {
            h: 'Margin and mark-up are the same profit over different bases',
            p: [
              'Gross profit can be expressed against either of the two figures that make it. Against **sales** it is the margin. Against **cost of sales** it is the mark-up. The pound figure of gross profit does not change; only what it is compared with does.',
              'Because sales are always larger than cost of sales, the mark-up percentage is always the larger of the two. If a question gives you one and asks for the other, that is the check: a mark-up smaller than its margin has been worked out upside down.',
            ],
            formula: 'Margin = gross profit ÷ sales × 100 · Mark-up = gross profit ÷ cost of sales × 100',
            table: {
              headers: ['If sales are 100', 'Cost of sales', 'Gross profit', 'Margin', 'Mark-up'],
              rows: [
                ['100', '80', '20', '20%', '25%'],
                ['100', '75', '25', '25%', '33.3%'],
                ['100', '66.7', '33.3', '33.3%', '50%'],
                ['100', '60', '40', '40%', '66.7%'],
              ],
            },
            examtrap: 'Mark-up is applied to cost, margin is taken out of price. "A 25% mark-up" on goods costing £80 gives a selling price of £100, not £106.67 — the 25% is 25% of the £80, not of the answer.',
          },
          {
            h: 'Working a full set',
            worked: {
              title: 'Four ratios from one set of statements',
              problem: 'A sole trader reports sales revenue of £250,000, cost of sales of £150,000 and expenses of £60,000. The statement of financial position shows capital of £120,000 and a bank loan repayable in five years of £80,000. Calculate the gross profit margin, the net profit margin, cost of sales as a percentage of revenue, and ROCE.',
              steps: [
                { do: 'Gross profit = £250,000 − £150,000 = £100,000.', why: 'Every margin needs gross profit first, and it is rarely handed over — the statement gives revenue and cost of sales and expects you to take one from the other.' },
                { do: 'Gross profit margin = £100,000 ÷ £250,000 × 100 = 40%.', why: 'Of every £100 sold, £40 survives paying for the goods. This is the ratio a buying or pricing change moves first.' },
                { do: 'Profit for the year = £100,000 − £60,000 = £40,000.', why: 'Expenses come out of gross profit, not out of revenue. Taking them off revenue instead is the commonest way this calculation goes wrong.' },
                { do: 'Net profit margin = £40,000 ÷ £250,000 × 100 = 16%.', why: 'The same £100 of sales, now after everything. The gap between 40% and 16% is what the expenses cost — 24 pence in every pound.' },
                { do: 'Cost of sales percentage = £150,000 ÷ £250,000 × 100 = 60%.', why: 'The expense/revenue ratio applied to cost of sales. It must be the complement of the gross margin: 60% + 40% = 100%, which is a free check on both.' },
                { do: 'Capital employed = £120,000 + £80,000 = £200,000. ROCE = £40,000 ÷ £200,000 × 100 = 20%.', why: 'The loan is a non-current liability, so it is part of the funding the business had to work with. Leaving it out would give £40,000 ÷ £120,000 = 33.3% and flatter the business by half again.' },
              ],
              answer: 'Gross profit margin 40%, net profit margin 16%, cost of sales 60% of revenue, ROCE 20%.',
              tryIt: {
                q: 'Sales revenue is £180,000 and cost of sales is £117,000. What is the gross profit margin, as a percentage?',
                answer: 35,
                unit: '%',
                hint: 'Find gross profit first, then divide by revenue.',
                exp: 'Gross profit = £180,000 − £117,000 = £63,000. Margin = £63,000 ÷ £180,000 × 100 = 35%. As a check, cost of sales is £117,000 ÷ £180,000 = 65%, and 35% + 65% = 100%.',
              },
            },
          },
        ],
        check: [
          {
            type: 'numeric',
            q: 'Capital is £90,000, non-current liabilities are £60,000 and profit for the year is £30,000. What is ROCE, as a percentage?',
            answer: 20,
            unit: '%',
            exp: 'Capital employed = £90,000 + £60,000 = £150,000. ROCE = £30,000 ÷ £150,000 × 100 = 20%. The non-current liability belongs in capital employed because the business had that money to work with all year, whoever lent it.',
          },
          {
            type: 'numeric',
            q: 'Goods cost £80,000 and are sold at a mark-up of 25%. What is the gross profit margin, as a percentage?',
            answer: 20,
            unit: '%',
            exp: 'Mark-up is on cost: gross profit = £80,000 × 25% = £20,000, so sales are £80,000 + £20,000 = £100,000. Margin = £20,000 ÷ £100,000 × 100 = 20%. A 25% mark-up is always a 20% margin, whatever the figures.',
          },
          {
            type: 'mcq',
            q: 'Which of these is included in capital employed?',
            opts: ['A bank loan repayable in four years', 'Trade payables', 'A bank overdraft', 'Accrued expenses'],
            ans: 0,
            exp: 'Capital employed is capital plus NON-CURRENT liabilities. A four-year loan is non-current; payables, overdrafts and accruals are all current liabilities and are excluded, because they are not long-term funding the business could deploy.',
          },
        ],
      },

      {
        id: 'L3-FAPS-8C',
        title: 'Reading the answer',
        icon: '⚖️',
        criteria: ['FAPS-8.2.2', 'FAPS-8.2.3', 'FAPS-8.2.4'],
        cards: [
          {
            h: 'Better or worse needs something to compare with',
            p: [
              'A gross profit margin of 32% is not good or bad. It is only better or worse than something else, and the assessment recognises three somethings.',
            ],
            table: {
              headers: ['Compare with', 'What it tells you', 'What to watch'],
              rows: [
                ['A different time period', 'Whether this business is improving', 'A one-off event in either year distorts the trend'],
                ['A different organisation', 'How this business stands against a rival', 'Different sizes, ages and accounting policies'],
                ['An industry standard', 'Whether the whole sector does better', 'The average may hide two very different halves'],
              ],
            },
            callout: { kind: 'key', text: 'For every profitability ratio in this outcome, higher is better. More profit from the same sales, or from the same capital, is an improvement — the only exception is the expense/revenue ratio, where lower is better because it is a cost.' },
          },
          {
            h: 'What moves a ratio',
            p: [
              'When a ratio changes, the cause is almost always one of a short list, and a question will usually expect you to name a plausible one rather than prove it.',
            ],
            split: {
              left: { title: 'A gross profit margin falls when', items: ['Selling prices are cut or discounted', 'Suppliers raise their prices and it is absorbed', 'Wastage, damage or theft rises', 'The mix shifts toward lower-margin goods', 'Closing inventory is understated'] },
              right: { title: 'A net profit margin falls when', items: ['Gross margin falls, and it carries straight through', 'Expenses rise — rent, wages, energy', 'A one-off cost lands in the year', 'Expansion is paid for before it earns'] },
            },
            examtrap: 'A gross margin that holds while the net margin falls localises the problem completely: buying and selling are unchanged, so the cause is in the expenses. That pairing is worth more marks than either ratio alone.',
          },
          {
            h: 'Professional scepticism',
            p: [
              'Scepticism is not suspicion. It is the habit of not accepting a figure just because it is presented tidily, and it belongs in interpretation as much as in preparation.',
              'A ratio is only as good as the statements underneath it. If closing inventory is overstated, cost of sales falls, gross profit rises and the margin improves — and nothing about the ratio itself looks wrong. If the two businesses being compared value inventory differently, or one owns its premises while the other rents, the comparison is not like for like however carefully the arithmetic was done.',
              'So the questions to hold are: where did these figures come from, is anything in them a one-off, are the two sides comparable, and does the answer agree with what else I know about this business?',
            ],
            callout: { kind: 'warn', text: 'Software produces ratios instantly and will produce them from wrong figures just as fast. A percentage carried to two decimal places is not evidence that the inputs were right.' },
          },
        ],
        check: [
          {
            type: 'mcq',
            q: 'A business reports the same gross profit margin as last year but a lower net profit margin. Where is the most likely cause?',
            opts: ['In the expenses', 'In its selling prices', 'In its purchase prices', 'In its inventory valuation'],
            ans: 0,
            exp: 'An unchanged gross margin means the relationship between selling prices and the cost of goods held steady, so buying, pricing and inventory are all behaving. Everything between gross profit and profit for the year is expenses, so that is what moved.',
          },
          {
            type: 'truefalse',
            q: 'Identify whether each statement about interpreting ratios is correct.',
            statements: [
              { text: 'A higher ROCE is better than a lower one.', answer: true },
              { text: 'A higher expenses-to-revenue percentage is better than a lower one.', answer: false },
              { text: 'Two businesses can be compared fairly whatever their accounting policies.', answer: false },
              { text: 'Overstating closing inventory improves the gross profit margin.', answer: true },
            ],
            exp: 'Profit ratios improve as they rise; an expense ratio improves as it falls. Different accounting policies — inventory valuation, depreciation method, owning against renting — make a straight comparison unsafe. And overstating closing inventory reduces cost of sales, which raises gross profit and the margin with it, which is exactly why the figure attracts scrutiny.',
          },
        ],
      },
    ],
    cheatsheet: {
      id: 'L3-FAPS-8S',
      title: 'Ratios on one card',
      icon: '🗂️',
      card: {
        h: 'Outcome 8 at a glance',
        p: [
          'Ten per cent of the assessment, and the only outcome that reads the statements rather than building them. Four formulas, one comparison rule, and the discipline not to trust a tidy number.',
        ],
        formula: 'Capital employed = capital + non-current liabilities',
        table: {
          headers: ['Ratio', 'Formula', 'Direction'],
          rows: [
            ['Gross profit margin', 'Gross profit ÷ sales revenue × 100', 'Higher is better'],
            ['Net profit margin', 'Profit for the year ÷ sales revenue × 100', 'Higher is better'],
            ['Expense ÷ sales revenue', 'That expense ÷ sales revenue × 100', 'Lower is better'],
            ['ROCE', 'Profit for the year ÷ capital employed × 100', 'Higher is better'],
          ],
        },
        split: {
          left: { title: 'Margin against mark-up', items: ['Margin is on SALES', 'Mark-up is on COST', 'Mark-up is always the bigger number', '20% margin = 25% mark-up', '25% margin = 33.3% mark-up', '33.3% margin = 50% mark-up'] },
          right: { title: 'Compare against', items: ['A different period — is it improving?', 'A different business — how does it stand?', 'An industry standard — does the sector do better?', 'Never against nothing at all'] },
        },
        callout: { kind: 'key', text: 'Gross margin unchanged and net margin down puts the cause in the expenses. Gross margin down puts it in pricing, purchase costs, wastage or inventory. That single comparison earns marks nothing else does.' },
      },
    },
  };

  /* ══════════════════════════════════════════════════════════════════════════
     OUTCOME 9 — Prepare accounting records from incomplete information.
     10% of the assessment. Everything the unit has taught, run backwards: the
     answer is given and a figure in the middle of the working is missing.
     ══════════════════════════════════════════════════════════════════════════ */

  var LO9 = {
    unit: 'faps',
    level: 3,
    title: 'Financial Accounting: Preparing Financial Statements',
    outcome: 9,
    outcomeTitle: 'Prepare accounting records from incomplete information',
    weighting: 10,
    lessons: [
      {
        id: 'L3-FAPS-9A',
        title: 'When the records are incomplete',
        icon: '🧩',
        criteria: ['FAPS-9.1.1'],
        cards: [
          {
            h: 'Why a business arrives with half its books',
            p: [
              'Small businesses do not always keep double entry. A sole trader may have a bank statement, a folder of invoices, a till roll and no ledgers at all. Something is always missing — a stolen cash book, a year of takings never written down, a purchases figure nobody totalled.',
              'The accounts still have to be prepared. This outcome is the set of techniques for getting a complete set of statements out of an incomplete set of records, and every one of them works the same way: build the account you would have kept, put in everything you do know, and the gap is the answer.',
            ],
            callout: { kind: 'key', text: 'The method never changes. Draw the account, enter what is known on both sides, and the missing figure is whatever makes it balance.' },
          },
          {
            h: 'Profit without a profit and loss account',
            p: [
              'If no records of income and expenses survive at all, profit can still be found — from the two things a trader always knows, what the business owned and owed at each end of the year.',
              'Capital rises with profit and with money the owner puts in. It falls with drawings. So the change in capital across the year, adjusted for the owner\'s own movements, IS the profit.',
            ],
            formula: 'Profit = closing capital − opening capital + drawings − capital introduced',
            examtrap: 'The two adjustments pull opposite ways and it is easy to sign them wrongly. Drawings are ADDED back, because they reduced capital without being a cost of trading. Capital introduced is TAKEN OFF, because it raised capital without being earned.',
          },
          {
            h: 'Working it through',
            worked: {
              title: 'Profit from the change in capital',
              problem: 'A sole trader kept no ledgers. At the start of the year the business held assets of £52,000 and owed £19,000. At the end it held assets of £71,500 and owed £22,500. During the year the owner withdrew £16,000 and paid in a further £4,000 from a personal account. What was the profit for the year?',
              steps: [
                { do: 'Opening capital = £52,000 − £19,000 = £33,000.', why: 'Capital is always assets less liabilities. Neither figure has to have been written down as capital for this to hold.' },
                { do: 'Closing capital = £71,500 − £22,500 = £49,000.', why: 'The same calculation at the other end of the year. The two together bracket everything that happened in between.' },
                { do: 'The increase is £49,000 − £33,000 = £16,000.', why: 'This is the movement to be explained. It is NOT the profit yet, because two of the things that moved capital had nothing to do with trading.' },
                { do: 'Add back the drawings: £16,000 + £16,000 = £32,000.', why: 'The owner took £16,000 out. That reduced capital but was not an expense, so the business must have earned it before it could be withdrawn.' },
                { do: 'Take off the capital introduced: £32,000 − £4,000 = £28,000.', why: 'The £4,000 raised capital without the business earning it. Leaving it in would report the owner\'s own money as profit.' },
              ],
              answer: 'Profit for the year £28,000.',
              tryIt: {
                q: 'Opening capital is £41,000 and closing capital is £58,000. The owner withdrew £21,000 during the year and introduced nothing. What was the profit?',
                answer: 38000,
                unit: '£',
                hint: 'The drawings have to be added back.',
                exp: 'Capital rose by £58,000 − £41,000 = £17,000, and the owner also took £21,000 out along the way. So the business earned £17,000 + £21,000 = £38,000. Nothing was introduced, so there is nothing to deduct.',
              },
            },
          },
        ],
        check: [
          {
            type: 'numeric',
            q: 'Opening capital is £62,000, closing capital is £70,000, drawings were £24,000 and the owner introduced £6,000. What was the profit for the year?',
            answer: 26000,
            unit: '£',
            exp: 'Profit = £70,000 − £62,000 + £24,000 − £6,000 = £26,000. Capital only rose £8,000, but £24,000 was taken out and only £6,000 of the rise came from the owner, so trading produced £26,000.',
          },
          {
            type: 'truefalse',
            q: 'Identify whether each statement about incomplete records is correct.',
            statements: [
              { text: 'Drawings are added back when profit is found from the change in capital.', answer: true },
              { text: 'Capital introduced is added in the same way as drawings.', answer: false },
              { text: 'Capital can be found from assets and liabilities even when no capital account exists.', answer: true },
              { text: 'A business with no ledgers cannot have its profit calculated.', answer: false },
            ],
            exp: 'Drawings reduced capital without being a cost, so they come back; capital introduced raised capital without being earned, so it comes off. Capital is assets less liabilities whether or not anybody recorded it, which is what makes the whole method work.',
          },
        ],
      },

      {
        id: 'L3-FAPS-9B',
        title: 'Reconstructing an account',
        icon: '🔧',
        criteria: ['FAPS-9.1.1'],
        cards: [
          {
            h: 'The account you would have kept',
            p: [
              'Most incomplete-records questions do not ask for profit directly. They ask for one figure — credit sales, credit purchases, the VAT paid over, cash banked — and give you everything around it.',
              'The technique is to draw the ledger account that figure would have passed through, enter every known amount, and read off the balancing figure. Four accounts carry almost all of it.',
            ],
            table: {
              headers: ['Reconstruct', 'To find', 'Built from'],
              rows: [
                ['Receivables ledger control', 'Credit sales', 'Opening and closing receivables, receipts, discounts allowed, irrecoverable debts, sales returns'],
                ['Payables ledger control', 'Credit purchases', 'Opening and closing payables, payments, discounts received, purchases returns'],
                ['VAT control', 'VAT paid to or reclaimed from HMRC', 'Output tax on sales, input tax on purchases, opening and closing balances'],
                ['Bank / cash', 'Takings, or cash drawings', 'Opening and closing balances, receipts, payments, amounts banked'],
              ],
            },
            callout: { kind: 'key', text: 'Receivables and payables both work the same way: opening balance, plus what was added during the year, less everything that cleared it, equals the closing balance. Only one of those five is ever unknown.' },
          },
          {
            h: 'Finding credit sales',
            worked: {
              title: 'The receivables ledger control account, run backwards',
              problem: 'At the start of the year customers owed £24,600 and at the end they owed £27,300. During the year the business received £198,400 from credit customers, wrote off £1,200 as irrecoverable and allowed £900 of settlement discounts. What were the credit sales for the year?',
              steps: [
                { do: 'Start from what is owed at the end: £27,300.', why: 'Working toward the closing balance rather than from the opening one keeps every term positive and avoids a sign error.' },
                { do: 'Add back everything that reduced the debt: receipts £198,400, the write-off £1,200 and discounts allowed £900.', why: 'Each of those three took a customer balance down without any goods coming back. They must all have been sold before they could be cleared.' },
                { do: '£27,300 + £198,400 + £1,200 + £900 = £227,800.', why: 'This is everything the customers owed at any point in the year: what is still outstanding plus everything already settled or removed.' },
                { do: 'Take off what was already owed at the start: £227,800 − £24,600 = £203,200.', why: 'The opening balance was last year\'s sales, not this year\'s. Leaving it in would count it twice.' },
                { do: 'Check the shape: credit sales = closing + receipts + write-offs + discounts − opening.', why: 'The same arrangement handles payables with the words swapped, which is why it is worth learning as a shape rather than as five separate rules.' },
              ],
              answer: 'Credit sales for the year were £203,200.',
              tryIt: {
                q: 'Opening payables were £18,400 and closing payables £21,300. The business paid suppliers £142,600 and received £700 of settlement discounts. What were the credit purchases?',
                answer: 146200,
                unit: '£',
                hint: 'The same shape: closing, plus what cleared the debt, less opening.',
                exp: 'Credit purchases = £21,300 + £142,600 + £700 − £18,400 = £146,200. Payments and discounts received both reduced what was owed, so both are added back; the opening balance belongs to last year and comes off.',
              },
            },
          },
          {
            h: 'Adjusting for VAT',
            p: [
              'A figure taken from a bank statement is gross. A figure that belongs in the statement of profit or loss is net. Somewhere in most reconstructions the two have to be reconciled, and the VAT control account is where it happens.',
              'Output tax on sales is credited; input tax on purchases is debited; payments to HMRC are debited. The balancing figure is whichever of those the question has withheld.',
            ],
            example: {
              title: 'VAT control account, with the payment as the missing figure',
              rows: [
                ['', 'Debit £', 'Credit £'],
                ['Opening balance owed to HMRC', '', '4,200'],
                ['Output tax on sales', '', '40,640'],
                ['Input tax on purchases', '29,240', ''],
                ['Paid to HMRC (balancing figure)', '10,500', ''],
                ['Closing balance owed to HMRC', '5,100', ''],
                ['', '44,840', '44,840'],
              ],
            },
            examtrap: 'Sales in a VAT-registered business are recorded NET in the statement of profit or loss, while the receivables control account carries the GROSS. Mixing the two is the single most common error in this outcome — read whether a figure is stated as including VAT before it goes anywhere.',
          },
        ],
        check: [
          {
            type: 'numeric',
            q: 'Opening receivables were £31,000 and closing receivables £28,500. Receipts from customers were £164,000 and £2,000 of debts were written off. What were the credit sales?',
            answer: 163500,
            unit: '£',
            exp: 'Credit sales = £28,500 + £164,000 + £2,000 − £31,000 = £163,500. The receipts and the write-off both cleared customer balances, so both are added back; the opening balance was last year\'s selling and comes off.',
          },
          {
            type: 'mcq',
            q: 'Which figure is the balancing figure in a reconstructed payables ledger control account?',
            opts: ['Credit purchases', 'Cash sales', 'Drawings', 'Closing inventory'],
            ans: 0,
            exp: 'The payables control account records what is owed to suppliers, so the entries in it are purchases on credit, payments, returns and discounts received. Cash sales never touch it, drawings belong to capital, and inventory is valued separately.',
          },
        ],
      },

      {
        id: 'L3-FAPS-9C',
        title: 'Mark-up and margin as tools',
        icon: '📐',
        criteria: ['FAPS-9.2.1', 'FAPS-9.2.2', 'FAPS-9.2.3'],
        cards: [
          {
            h: 'Two percentages, two bases',
            p: [
              'Outcome 8 uses margin and mark-up to describe performance. Here they do something different: they **supply a figure nobody recorded**. If a trader always marks goods up by a known percentage, then knowing any one of cost of sales, gross profit or sales gives you the other two.',
              'The difference between them is only what the percentage is a percentage OF.',
            ],
            formula: 'Mark-up % is on COST OF SALES · Margin % is on SALES',
            split: {
              left: { title: 'Mark-up of 25%', items: ['Cost of sales 100', 'Gross profit 25', 'Sales 125', 'Margin is 25/125 = 20%'] },
              right: { title: 'Margin of 25%', items: ['Sales 100', 'Gross profit 25', 'Cost of sales 75', 'Mark-up is 25/75 = 33.3%'] },
            },
            callout: { kind: 'key', text: 'Set the base to 100 and read off the rest. Mark-up starts from cost at 100; margin starts from sales at 100. Getting that first line right makes the other two arithmetic.' },
          },
          {
            h: 'Cost of sales is the bridge',
            p: [
              'The other half of this outcome is the cost of sales calculation, which links inventory and purchases to the trading account and can be rearranged for whichever term is missing.',
            ],
            formula: 'Cost of sales = opening inventory + purchases − closing inventory',
            table: {
              headers: ['If what is missing is', 'Rearrange to'],
              rows: [
                ['Purchases', 'Cost of sales − opening inventory + closing inventory'],
                ['Closing inventory', 'Opening inventory + purchases − cost of sales'],
                ['Opening inventory', 'Cost of sales − purchases + closing inventory'],
              ],
            },
            examtrap: 'Closing inventory destroyed in a fire is the classic version: sales and the mark-up give cost of sales, opening inventory and purchases are known, and the inventory that should have been there is the balancing figure. The insurance claim is that number.',
          },
          {
            h: 'Working it through',
            worked: {
              title: 'Sales from a mark-up and an inventory movement',
              problem: 'A business marks all goods up by 25% on cost. Opening inventory was £18,000, purchases for the year were £124,000 and closing inventory was £22,000. What were the sales for the year, and what gross profit margin does that represent?',
              steps: [
                { do: 'Cost of sales = £18,000 + £124,000 − £22,000 = £120,000.', why: 'Only the goods actually sold are a cost. What is still on the shelf at the year end is an asset, so it comes back out.' },
                { do: 'Gross profit = £120,000 × 25% = £30,000.', why: 'The mark-up is a percentage OF COST, so it is applied to the £120,000 rather than to the sales figure that does not exist yet.' },
                { do: 'Sales = £120,000 + £30,000 = £150,000.', why: 'Cost of sales plus gross profit is sales, by definition. This is the figure the question wanted.' },
                { do: 'Margin = £30,000 ÷ £150,000 × 100 = 20%.', why: 'The same £30,000 of profit, now expressed against sales rather than cost. A 25% mark-up is always a 20% margin.' },
              ],
              answer: 'Sales £150,000, a gross profit margin of 20%.',
              tryIt: {
                q: 'Sales were £96,000 and the business works to a gross profit margin of 25%. What was the cost of sales?',
                answer: 72000,
                unit: '£',
                hint: 'The margin is a share of sales, not of cost.',
                exp: 'Gross profit = £96,000 × 25% = £24,000, so cost of sales = £96,000 − £24,000 = £72,000. Applying the 25% to cost instead would give £76,800 and overstate the goods by £4,800.',
              },
            },
          },
        ],
        check: [
          {
            type: 'numeric',
            q: 'Opening inventory was £14,000, closing inventory £11,000 and cost of sales £98,000. What were the purchases?',
            answer: 95000,
            unit: '£',
            exp: 'Purchases = cost of sales − opening inventory + closing inventory = £98,000 − £14,000 + £11,000 = £95,000. Inventory fell by £3,000 over the year, so £3,000 of what was sold came off the shelf rather than being bought.',
          },
          {
            type: 'numeric',
            q: 'Goods costing £60,000 are sold at a mark-up of 40%. What are the sales?',
            answer: 84000,
            unit: '£',
            exp: 'The mark-up is on cost: gross profit = £60,000 × 40% = £24,000, so sales = £60,000 + £24,000 = £84,000. The margin this represents is £24,000 ÷ £84,000 × 100 = 28.57%, which is smaller — as a margin always is.',
          },
          {
            type: 'truefalse',
            q: 'Identify whether each statement about mark-up and margin is correct.',
            statements: [
              { text: 'Mark-up is calculated on cost of sales.', answer: true },
              { text: 'For the same goods, the margin percentage is larger than the mark-up percentage.', answer: false },
              { text: 'A margin of 20% is the same as a mark-up of 25%.', answer: true },
              { text: 'Closing inventory is added when cost of sales is calculated.', answer: false },
            ],
            exp: 'Mark-up divides by cost and margin divides by the larger sales figure, so the margin is always the smaller percentage. Twenty per cent of sales and 25% of cost describe the same profit. And closing inventory is DEDUCTED — it is goods not yet sold.',
          },
        ],
      },

      {
        id: 'L3-FAPS-9D',
        title: 'Is that figure reasonable?',
        icon: '🤔',
        criteria: ['FAPS-9.3.1', 'FAPS-9.3.2', 'FAPS-9.3.3', 'FAPS-9.3.4'],
        cards: [
          {
            h: 'A balancing figure is not the same as a fact',
            p: [
              'Every technique in this outcome produces its answer by subtraction, and subtraction always produces an answer. If two of the inputs are wrong, the missing figure absorbs both errors and comes out looking exactly as confident as a correct one.',
              'So the last step of any reconstruction is to ask whether the number is believable. That is a judgement about the business, not about the arithmetic.',
            ],
            table: {
              headers: ['A figure looks wrong when', 'Because'],
              rows: [
                ['Takings imply a margin far from the usual one', 'The trader knows their own mark-up; a large swing needs a reason'],
                ['Drawings would not support a household', 'A sole trader lives on the drawings — an implausibly small figure suggests cash taken and not recorded'],
                ['Purchases move sharply while sales do not', 'Goods were bought and not sold, or not all sales were recorded'],
                ['A calculated cash balance is negative', 'Cash cannot be less than nothing; something has been missed or double counted'],
              ],
            },
            callout: { kind: 'key', text: 'Test a balancing figure against what the business is, not against the working that produced it. The working will always balance — that is what makes it a balancing figure.' },
          },
          {
            h: 'Why a calculated balance and an actual one differ',
            p: [
              'A reconstructed cash balance can be compared with what is actually in the till, and the two rarely agree exactly. The difference is information, and there is a short list of what causes it.',
            ],
            split: {
              left: { title: 'Honest explanations', items: ['Cash drawings the owner did not record', 'Goods taken for personal use', 'Expenses paid straight out of takings', 'A till float never treated as business cash', 'Timing — takings banked after the count'] },
              right: { title: 'Explanations to escalate', items: ['Theft of cash', 'Sales deliberately not recorded', 'Fictitious expenses', 'A pattern of small unexplained shortfalls'] },
            },
            examtrap: 'The question is usually "suggest a reason", and a plausible innocent explanation earns the mark as readily as a dishonest one. What loses marks is answering "the figures are wrong" — that restates the problem instead of explaining it.',
          },
          {
            h: 'Software and scepticism',
            p: [
              'Most small businesses now keep records in software rather than on paper, which changes what goes missing. Ledgers are rarely lost; instead a bank feed misses a fortnight, a transaction is posted to the wrong account, or an opening balance was never entered when the system was set up.',
              'Software output looks authoritative and is only as good as what was entered. A report that reconciles is evidence the software added correctly, not that the underlying entries were right.',
              '**Professional scepticism** is the habit of checking rather than assuming, and it applies in both directions: do not accept a figure because it is neat, and do not assume dishonesty because a figure is odd. Ask the client, corroborate against something independent, and record what you were told.',
            ],
            callout: { kind: 'warn', text: 'Scepticism is not distrust. It is declining to treat a presentation as evidence — including a presentation your own working produced.' },
          },
        ],
        check: [
          {
            type: 'mcq',
            q: 'A reconstruction produces a cash balance of negative £800. What does that tell you?',
            opts: ['Something has been omitted or double counted', 'The business made a loss', 'The owner took too much in drawings', 'The bank account is overdrawn'],
            ans: 0,
            exp: 'A cash balance cannot be below zero — the business cannot hold less than no money. It is a signal that a receipt is missing or a payment has been counted twice, and it says nothing directly about profit, drawings or the bank.',
          },
          {
            type: 'truefalse',
            q: 'Identify whether each statement about checking incomplete records is correct.',
            statements: [
              { text: 'A balancing figure is reliable because the account balances.', answer: false },
              { text: 'Unrecorded cash drawings can explain a shortfall between calculated and actual cash.', answer: true },
              { text: 'A report produced by accounting software still needs checking.', answer: true },
              { text: 'Professional scepticism means assuming the client is being dishonest.', answer: false },
            ],
            exp: 'A balancing figure balances by construction, whatever errors are in the inputs. Unrecorded drawings are among the commonest innocent causes of a cash difference. Software adds up correctly and cannot tell whether what was entered was right. And scepticism is a questioning mind, not an accusation.',
          },
        ],
      },
    ],
    cheatsheet: {
      id: 'L3-FAPS-9S',
      title: 'Incomplete records on one card',
      icon: '🗂️',
      card: {
        h: 'Outcome 9 at a glance',
        p: [
          'Ten per cent of the assessment, and every technique is the same move: build the account, enter what you know, read the gap.',
        ],
        formula: 'Profit = closing capital − opening capital + drawings − capital introduced',
        table: {
          headers: ['To find', 'Reconstruct', 'Shape'],
          rows: [
            ['Credit sales', 'Receivables control', 'Closing + receipts + write-offs + discounts allowed − opening'],
            ['Credit purchases', 'Payables control', 'Closing + payments + discounts received − opening'],
            ['VAT paid over', 'VAT control', 'Opening + output tax − input tax − closing'],
            ['Cost of sales', 'Trading account', 'Opening inventory + purchases − closing inventory'],
          ],
        },
        split: {
          left: { title: 'Mark-up and margin', items: ['Mark-up is on COST', 'Margin is on SALES', 'Set the base to 100 and read the rest', '25% mark-up = 20% margin', '40% mark-up = 28.6% margin'] },
          right: { title: 'Before you submit the figure', items: ['Does the margin match the trade?', 'Could the owner live on those drawings?', 'Is any balance negative?', 'Does anything need corroborating?'] },
        },
        callout: { kind: 'key', text: 'Receivables carry GROSS amounts including VAT; the statement of profit or loss carries NET. Check which a figure is before it goes anywhere near a calculation.' },
      },
    },
  };

  var PATH = [LO1, LO2, LO3, LO4, LO5, LO6, LO7, LO8, LO9];

  /* ══════════════════════════════════════════════════════════════════════════
     PRACTICE BANK — met cold, and separate from the lesson checks.
     ══════════════════════════════════════════════════════════════════════════ */

  var QUESTIONS = [
    {
      id: 'F-1-01', unitKey: 'faps', lo: 1, criteria: ['FAPS-1.1.1'],
      type: 'truefalse',
      q: 'Identify whether each party is a primary user of a set of final accounts.',
      statements: [
        { text: 'A bank considering a loan to the business.', answer: true },
        { text: 'The finance director of the business.', answer: false },
        { text: 'A wholesaler deciding whether to supply on credit.', answer: true },
        { text: 'A local newspaper writing about the business.', answer: false },
      ],
      exp: 'The primary users are existing and potential investors, lenders and other creditors — outsiders committing money who cannot demand information. The finance director already has internal access, and a newspaper is not committing money to the business at all.',
    },
    {
      id: 'F-1-02', unitKey: 'faps', lo: 1, criteria: ['FAPS-1.2.1'],
      type: 'mcq',
      q: 'A sole trader takes goods costing £400 from inventory for personal use. Which principle determines that this is not a business expense?',
      opts: ['Business entity', 'Prudence', 'Materiality', 'Timeliness'],
      ans: 0,
      exp: 'The business entity principle separates the business from its owner, so goods taken for personal use are drawings and reduce capital rather than profit. Prudence deals with uncertainty, materiality with whether an item is worth reporting separately, and timeliness is a qualitative characteristic rather than a principle.',
    },
    {
      id: 'F-1-03', unitKey: 'faps', lo: 1, criteria: ['FAPS-1.2.1'],
      type: 'mcq',
      q: 'Which principle explains why a machine bought outright in one year is charged to profit across several years?',
      opts: ['Accruals', 'Consistency', 'Money measurement', 'Business entity'],
      ans: 0,
      exp: 'The accruals principle records a transaction in the period the economic event happens rather than the period the cash moves. The machine is used up over its life, so the cost is spread across the years that consume it — which is exactly what depreciation does.',
    },
    {
      id: 'F-1-04', unitKey: 'faps', lo: 1, criteria: ['FAPS-1.2.1'],
      type: 'gapfill',
      q: 'Complete the statement of the going concern principle.',
      template: 'Accounts are prepared on the assumption that the business will {0} for the foreseeable future. If that assumption fails, {1} changes rather than a single figure, because assets would then be measured at {2}.',
      gaps: [
        { options: ['continue trading', 'grow steadily', 'remain profitable'], answer: 0 },
        { options: ['the whole basis of the accounts', 'only the depreciation charge', 'only the inventory valuation'], answer: 0 },
        { options: ['break-up value', 'original cost', 'replacement cost'], answer: 0 },
      ],
      exp: 'Going concern is what allows a non-current asset to sit at cost less accumulated depreciation. Remove it and the assets are worth what they would fetch in a forced sale, which changes the basis on which every figure is measured rather than adjusting one of them.',
    },
    {
      id: 'F-1-05', unitKey: 'faps', lo: 1, criteria: ['FAPS-1.3.1', 'FAPS-1.3.2'],
      type: 'mcq',
      q: 'Which of these is an **enhancing** qualitative characteristic rather than a fundamental one?',
      opts: ['Verifiability', 'Relevance', 'Faithful representation', 'Predictive value'],
      ans: 0,
      exp: 'Verifiability is one of the four enhancing characteristics, alongside comparability, timeliness and understandability. Relevance and faithful representation are the two fundamental ones, and predictive value is a component of relevance rather than a characteristic in its own right.',
    },
    {
      id: 'F-1-06', unitKey: 'faps', lo: 1, criteria: ['FAPS-1.3.1'],
      type: 'mcq',
      q: 'A depreciation charge rests on two estimates: useful life and residual value. Can the resulting figure be a faithful representation?',
      opts: ['Yes, if the estimates are properly made and described as estimates', 'No, because a faithful representation must be free from any error', 'No, because an estimate can never be verified by an independent observer', 'Yes, but only where the estimates prove correct once the asset is sold'],
      ans: 0,
      exp: 'Free from error refers to the description and the process, not to perfect accuracy. Most of the interesting figures in a set of accounts are estimates; what faithful representation asks is that the method is sound, the inputs are reasonable and the nature of the figure is not misdescribed.',
    },
    {
      id: 'F-1-07', unitKey: 'faps', lo: 1, criteria: ['FAPS-1.3.3'],
      type: 'mcq',
      q: 'A business with revenue of £2.4 million has a £6,000 error in its accounts. Which consideration would most readily make it material?',
      opts: ['The error takes a loan covenant through its limit', 'The error arose from a manual entry rather than software', 'The error was found after the year end rather than before', 'The error relates to an expense rather than to revenue'],
      ans: 0,
      exp: 'Materiality is judged by size relative to the business and by nature. £6,000 against £2.4 million is small in size, but an error that breaches a covenant changes what a lender would decide, which is the test. How the error arose, when it was found and which line it sits on do not bear on that.',
    },
    {
      id: 'F-1-08', unitKey: 'faps', lo: 1, criteria: ['FAPS-1.3.4'],
      type: 'truefalse',
      q: 'Identify whether each response to year-end pressure is consistent with the fundamental ethical principles.',
      statements: [
        { text: 'Holding a four-year useful life because that is what the evidence supports, after a request to extend it.', answer: true },
        { text: 'Agreeing a valuation you believe is wrong, on the basis that a senior manager instructed it.', answer: false },
        { text: 'Declining to take on a task you are not competent to complete, and saying so.', answer: true },
        { text: 'Releasing a customer\'s payment history to a contact at another firm.', answer: false },
      ],
      exp: 'Objectivity keeps the answer technical whoever is asking. Complying with an instruction you believe to be wrong breaches integrity, and seniority does not transfer responsibility. Professional competence and due care requires declining work beyond your skill rather than attempting it. Confidentiality forbids passing on information acquired at work.',
    },
    {
      id: 'F-1-09', unitKey: 'faps', lo: 1, criteria: ['FAPS-1.3.4'],
      type: 'mcq',
      q: 'Which of these best describes professional scepticism when preparing final accounts?',
      opts: ['A questioning mind that assesses evidence critically rather than accepting it', 'A working assumption that colleagues will misstate figures if unsupervised', 'A requirement to obtain third-party confirmation of every material balance', 'A policy of recording the lowest defensible figure wherever a range exists'],
      ans: 0,
      exp: 'Scepticism is alertness to conditions that may indicate misstatement, applied to evidence. It does not assume dishonesty, it does not demand external confirmation of everything, and it is not the same as always choosing the lowest figure — that would breach neutrality just as overstatement does.',
    },
    {
      id: 'F-1-10', unitKey: 'faps', lo: 1, criteria: ['FAPS-1.2.1', 'FAPS-1.3.2'],
      type: 'mcq',
      q: 'Two businesses in the same trade depreciate similar vehicles over different lives. What does comparability require?',
      opts: ['That the difference in treatment is disclosed, so a reader can allow for it', 'That both businesses adopt the shorter of the two useful lives', 'That the accounts are restated onto a single industry-wide basis', 'That the business with the longer life justifies it to the other'],
      ans: 0,
      exp: 'Comparability is not uniformity. Assets genuinely used differently may properly be depreciated differently, and forcing a single treatment would make the figures less faithful rather than more comparable. What the characteristic requires is that a reader can see the difference and adjust for it.',
    },
    {
      id: 'F-2-01', unitKey: 'faps', lo: 2, criteria: ['FAPS-2.1.3'],
      type: 'numeric',
      q: 'A business holds assets of £63,400 and owes £27,900. What is its capital?',
      answer: 35500,
      unit: '£',
      exp: 'Capital is the residual claim, so Assets − Liabilities gives £63,400 − £27,900 = £35,500. It is what the books say would be left for the owner once every outside creditor had been paid in full.',
    },
    {
      id: 'F-2-02', unitKey: 'faps', lo: 2, criteria: ['FAPS-2.1.2'],
      type: 'truefalse',
      q: 'Identify whether each transaction leaves total assets unchanged.',
      statements: [
        { text: 'Paying a supplier £800 from the bank account.', answer: false },
        { text: 'Receiving £1,500 from a credit customer.', answer: true },
        { text: 'Buying a £3,000 vehicle by bank transfer.', answer: true },
        { text: 'The owner introducing £5,000 of capital.', answer: false },
      ],
      exp: 'Receiving from a customer swaps receivables for bank, and buying a vehicle for cash swaps bank for vehicle — one asset for another in both cases. Paying a supplier reduces bank and reduces a liability, and capital introduced raises bank and raises the owner\'s claim, so both change the total.',
    },
    {
      id: 'F-2-03', unitKey: 'faps', lo: 2, criteria: ['FAPS-2.1.3'],
      type: 'numeric',
      q: 'A business opens the year with capital of £41,000. The owner introduces £9,000, the business makes a profit of £18,000, and the owner withdraws £12,000. What is closing capital?',
      answer: 56000,
      unit: '£',
      exp: 'Closing capital is opening capital plus capital introduced plus profit less drawings: £41,000 + £9,000 + £18,000 − £12,000 = £56,000. Drawings reduce the owner\'s claim rather than the profit, which is why they are dealt with here and not in the statement of profit or loss.',
    },
    {
      id: 'F-2-04', unitKey: 'faps', lo: 2, criteria: ['FAPS-2.2.1'],
      type: 'truefalse',
      q: 'Decide whether each of these accounts has been put in the right class.',
      statements: [
        { text: 'Goodwill is an intangible non-current asset.', answer: true },
        { text: 'A bank overdraft at the year end is a current liability.', answer: true },
        { text: 'Prepayments are a liability.', answer: false },
        { text: 'Discounts received are an expense.', answer: false },
      ],
      exp: 'Goodwill has no physical substance and is held long term. An overdraft is repayable on demand. A prepayment is a cost paid in advance, so the business is owed a service and it is a current asset. And discounts received are given to the business by its suppliers, so they are income.',
    },
    {
      id: 'F-2-05', unitKey: 'faps', lo: 2, criteria: ['FAPS-2.3.1', 'FAPS-2.3.2'],
      type: 'mcq',
      q: 'A business writes off an irrecoverable debt. Which book of prime entry does the entry pass through?',
      opts: ['The journal', 'The sales returns daybook', 'The cash book', 'The purchases daybook'],
      ans: 0,
      exp: 'No document arrives and no money moves, so none of the document-driven daybooks applies. The journal takes entries with no source document, each carrying a narrative — which is how every period-end adjustment in this unit reaches the ledger.',
    },
    {
      id: 'F-2-06', unitKey: 'faps', lo: 2, criteria: ['FAPS-2.3.3'],
      type: 'numeric',
      q: 'A sales daybook totals £6,200 net with VAT at 20%. What amount is debited to the receivables control account?',
      answer: 7440,
      unit: '£',
      exp: 'Customers owe the whole invoice, so the control account takes the gross figure: VAT is £6,200 × 20% = £1,240 and £6,200 + £1,240 = £7,440. Sales is credited with the net £6,200 only, because the VAT was never the business\'s revenue.',
    },
    {
      id: 'F-2-07', unitKey: 'faps', lo: 2, criteria: ['FAPS-2.3.3'],
      type: 'gapfill',
      q: 'Complete the posting of a purchases daybook.',
      template: 'Purchases is {0} with the net total, VAT is {1} because the tax can be reclaimed, and the payables control account is {2} with the gross total.',
      gaps: [
        { options: ['debited', 'credited', 'left unchanged'], answer: 0 },
        { options: ['debited', 'credited', 'left unchanged'], answer: 0 },
        { options: ['credited', 'debited', 'left unchanged'], answer: 0 },
      ],
      exp: 'Input tax on purchases is money the business has paid and can reclaim, so VAT is debited — the reverse of a sale, where the tax collected is credited. The supplier is owed the gross, so that is the figure credited to payables control.',
    },
    {
      id: 'F-2-08', unitKey: 'faps', lo: 2, criteria: ['FAPS-2.3.4'],
      type: 'mcq',
      q: 'Where does the total owed by all credit customers appear?',
      opts: ['In the receivables control account, in the general ledger', 'In the receivables ledger, as part of the double entry', 'In the sales daybook, once it has been totalled', 'In the memorandum ledger, as a single combined account'],
      ans: 0,
      exp: 'The control account holds the total and is a general ledger account, so it is part of the double entry. The receivables ledger holds one account per customer and sits outside the double entry, and the sales daybook lists invoices rather than balances.',
    },
    {
      id: 'F-2-09', unitKey: 'faps', lo: 2, criteria: ['FAPS-2.3.5'],
      type: 'numeric',
      q: 'A receivables ledger control account opens at £18,500. Credit sales are £62,300, receipts £57,400, sales returns £2,600, discounts allowed £780 and irrecoverable debts written off £1,150. What is the closing balance?',
      answer: 18870,
      unit: '£',
      exp: 'Debits are £18,500 + £62,300 = £80,800. Credits are £57,400 + £2,600 + £780 + £1,150 = £61,930. The balance is £80,800 − £61,930 = £18,870 owed by customers — a debit balance, since only two things increase what customers owe and five reduce it.',
    },
    {
      id: 'F-2-10', unitKey: 'faps', lo: 2, criteria: ['FAPS-2.3.5', 'FAPS-2.3.6'],
      type: 'mcq',
      q: 'A business posts its sales invoices twice by accident, into both the customer accounts and the control account. What does the reconciliation show?',
      opts: ['No difference at all in the reconciliation', 'A difference equal to the duplicated invoices', 'A difference equal to the VAT on those invoices', 'A difference visible only after the bank reconciliation'],
      ans: 0,
      exp: 'A reconciliation compares two records against each other, so an error that lands in both leaves them agreeing. It is the limit of the check: agreement proves the records match, which is a weaker claim than the receivables figure being right.',
    },
    {
      id: 'F-2-11', unitKey: 'faps', lo: 2, criteria: ['FAPS-2.3.7'],
      type: 'numeric',
      q: 'A bank account opens with a debit balance of £4,300. Receipts in the period are £11,800 and payments £9,750. What is the closing balance?',
      answer: 6350,
      unit: '£',
      exp: 'Debits are £4,300 + £11,800 = £16,100 and credits are £9,750, so the balance is £16,100 − £9,750 = £6,350. It is a debit balance, meaning the business is in funds rather than overdrawn.',
    },
    {
      id: 'F-2-12', unitKey: 'faps', lo: 2, criteria: ['FAPS-2.4.1', 'FAPS-2.4.4'],
      type: 'truefalse',
      q: 'Identify whether each account\'s balance is transferred to the statement of profit or loss at the period end.',
      statements: [
        { text: 'Inventory.', answer: false },
        { text: 'Wages.', answer: true },
        { text: 'Capital.', answer: false },
        { text: 'Sales revenue.', answer: true },
        { text: 'Drawings.', answer: false },
      ],
      exp: 'Wages and sales revenue measure a period that has ended, so their balances are transferred to the statement of profit or loss and the accounts start again at nil. Inventory and capital describe a position on a date and are carried down instead. Drawings is the trap: its balance does leave the account, but it is closed off against capital, not against profit — it never touches the statement of profit or loss.',
    },
    {
      id: 'F-2-13', unitKey: 'faps', lo: 2, criteria: ['FAPS-2.4.3'],
      type: 'mcq',
      q: 'Which check would reveal a purchase invoice the business never recorded at all?',
      opts: ['Reconciling the payables ledger to supplier statements', 'Reconciling the payables control account to the payables ledger', 'Recalculating the totals of the purchases daybook', 'Confirming the trial balance balances'],
      ans: 0,
      exp: 'The supplier statement comes from outside the business and shows an invoice the business has no record of. Every other option compares the business\'s own records against each other, and an invoice missing from all of them is missing consistently.',
    },
    {
      id: 'F-2-14', unitKey: 'faps', lo: 2, criteria: ['FAPS-2.4.5'],
      type: 'truefalse',
      q: 'Identify whether each transaction should be included in the business\'s records.',
      statements: [
        { text: 'A supplier invoice for goods received before the year end but unpaid at it.', answer: true },
        { text: 'Fuel for the owner\'s private car, invoiced to the business.', answer: false },
        { text: 'A payment with no invoice, contract or delivery note behind it.', answer: false },
        { text: 'A purchase authorised at the correct level and supported by a delivery note.', answer: true },
      ],
      exp: 'Goods received before the year end belong to that year whether or not they have been paid for. Private fuel is the owner\'s spending, so it is drawings however the invoice is addressed. A payment with no evidence cannot be shown to be genuine. And an authorised, documented purchase satisfies every test.',
    },
    {
      id: 'F-3-01', unitKey: 'faps', lo: 3, criteria: ['FAPS-3.2.3', 'FAPS-3.2.7'],
      type: 'truefalse',
      q: 'A business buys a packing machine. Identify whether each cost is capitalised with it.',
      statements: [
        { text: 'Strengthening the floor so the machine can stand on it.', answer: true },
        { text: 'A three-year maintenance contract taken out at the same time.', answer: false },
        { text: 'The engineer\'s fee for commissioning and testing the machine.', answer: true },
        { text: 'Advertising the products the new machine will make.', answer: false },
        { text: 'Delivery of the machine from the supplier to the factory.', answer: true },
      ],
      exp: 'Capitalise costs directly attributable to bringing the asset to the location and condition necessary to operate as intended: site preparation, delivery and commissioning all qualify. A maintenance contract buys future servicing and advertising promotes a product, so both are revenue expenditure of the periods they relate to.',
    },
    {
      id: 'F-3-02', unitKey: 'faps', lo: 3, criteria: ['FAPS-3.2.7'],
      type: 'numeric',
      q: 'A machine is invoiced at £45,000, with delivery of £1,800, installation of £2,400 and a first-year service contract of £900. What amount is capitalised?',
      answer: 49200,
      unit: '£',
      exp: 'Delivery and installation bring the machine to the condition needed to operate, so £45,000 + £1,800 + £2,400 = £49,200 is capitalised. The service contract buys future maintenance rather than readying the asset, and is charged to profit over the period it covers.',
    },
    {
      id: 'F-3-03', unitKey: 'faps', lo: 3, criteria: ['FAPS-3.3.8'],
      type: 'numeric',
      q: 'A business that is not registered for VAT buys equipment for £9,000 plus VAT at 20%. At what amount is the equipment capitalised?',
      answer: 10800,
      unit: '£',
      exp: 'An unregistered business cannot recover input tax, so the VAT is part of what it had to pay to obtain the asset: £9,000 + £1,800 = £10,800. A registered business recovering the VAT would capitalise £9,000 and post £1,800 to the VAT account.',
    },
    {
      id: 'F-3-04', unitKey: 'faps', lo: 3, criteria: ['FAPS-3.2.6'],
      type: 'mcq',
      q: 'A business capitalises a £12,000 repair in error. What happens to profit in the years after the one in which the error was made?',
      opts: ['They are reduced, by depreciation on something that was never an asset', 'They are raised, because the repair cost never reaches the accounts at all', 'They are unaffected, since the whole error falls in the year of the repair', 'They are reduced, but only until the next physical verification finds it'],
      ans: 0,
      exp: 'Capitalising moves the £12,000 out of the first year\'s expenses and onto the statement of financial position, so that year\'s profit is overstated. The amount then unwinds through depreciation, charging later years for an asset that does not exist — which is why the error persists rather than correcting itself.',
    },
    {
      id: 'F-3-05', unitKey: 'faps', lo: 3, criteria: ['FAPS-3.3.2', 'FAPS-3.3.7'],
      type: 'numeric',
      q: 'A machine that cost £35,000 has accumulated depreciation of £24,500 at the date of disposal. It is sold for £11,000. What is the gain on disposal?',
      answer: 500,
      unit: '£',
      exp: 'The carrying amount is £35,000 − £24,500 = £10,500, and the machine fetched £11,000. That is £500 more than the accounts carried it at, so there is a gain of £500 and the disposals account is left with a credit balance.',
    },
    {
      id: 'F-3-06', unitKey: 'faps', lo: 3, criteria: ['FAPS-3.3.3', 'FAPS-3.3.7'],
      type: 'numeric',
      q: 'A van that cost £28,000 has accumulated depreciation of £19,600. It is part-exchanged, with £6,000 allowed against it. What is the loss on disposal?',
      answer: 2400,
      unit: '£',
      exp: 'The carrying amount is £28,000 − £19,600 = £8,400 and the allowance is the proceeds. £8,400 − £6,000 = £2,400 is a loss, and it is dealt with in the disposals account exactly as a loss on a cash sale would be.',
    },
    {
      id: 'F-3-07', unitKey: 'faps', lo: 3, criteria: ['FAPS-3.3.7'],
      type: 'numeric',
      q: 'A new machine is acquired by part-exchange. The dealer allows £9,500 for the old one and the business pays £27,500 by bank transfer. At what amount is the new machine capitalised?',
      answer: 37000,
      unit: '£',
      exp: 'The allowance and the cash together are what the business gave for the new machine: £9,500 + £27,500 = £37,000. Capitalising only the £27,500 paid would understate the asset by the whole allowance and understate every later depreciation charge with it.',
    },
    {
      id: 'F-3-08', unitKey: 'faps', lo: 3, criteria: ['FAPS-3.3.1', 'FAPS-3.3.6'],
      type: 'mcq',
      q: 'Total accumulated depreciation per the asset register is higher than the accumulated depreciation balance in the general ledger, and total cost agrees. What does that point at?',
      opts: ['A charge computed on a different figure in one of the two records', 'An acquisition that reached the ledger and never reached the register', 'A disposal that was removed from the register and never posted', 'An asset held at a location that has not yet been verified'],
      ans: 0,
      exp: 'Cost agreeing rules out an asset present in one record and missing from the other, because that would move both totals. A difference confined to accumulated depreciation means the two records charged different amounts against the same assets.',
    },
    {
      id: 'F-3-09', unitKey: 'faps', lo: 3, criteria: ['FAPS-3.1.1', 'FAPS-3.1.2'],
      type: 'mcq',
      q: 'An invoice for a £30,000 machine arrives authorised by a manager whose limit is £10,000. What is the right response?',
      opts: ['Refer it upwards for authorisation at the proper level', 'Post it, and note the breach in the file for the auditors', 'Post it to a suspense account until the year end', 'Split it across three entries within the manager\'s limit'],
      ans: 0,
      exp: 'Authority limits exist so that a commitment of this size is weighed by somebody who can see what else the cash was for. Posting it with a note records a decision nobody with the authority made, suspense hides it, and splitting it defeats the control outright.',
    },
    {
      id: 'F-3-10', unitKey: 'faps', lo: 3, criteria: ['FAPS-3.2.2'],
      type: 'gapfill',
      q: 'Complete the definitions used throughout non-current asset accounting.',
      template: 'The {0} amount is cost less residual value, and it is what gets spread over the useful life. The {1} amount is cost less accumulated depreciation, and it is what the asset stands at today. Useful life is how long the asset will serve {2}.',
      gaps: [
        { options: ['depreciable', 'carrying', 'residual'], answer: 0 },
        { options: ['carrying', 'depreciable', 'recoverable'], answer: 0 },
        { options: ['this business', 'any owner', 'its manufacturer'], answer: 0 },
      ],
      exp: 'Depreciable amount is what will be charged to profit across the life; carrying amount is what is left in the accounts at a point in time. Useful life is entity-specific, which is why a fleet replaced every four years carries a four-year life whatever the vehicles would physically survive.',
    },
    {
      id: 'F-4-01', unitKey: 'faps', lo: 4, criteria: ['FAPS-4.1.4'],
      type: 'numeric',
      q: 'An asset costs £52,000, has an estimated residual value of £4,000 and a useful life of eight years. What is the annual straight-line charge?',
      answer: 6000,
      unit: '£',
      exp: 'The depreciable amount is £52,000 − £4,000 = £48,000, spread evenly across eight years: £48,000 ÷ 8 = £6,000 a year. After eight years the carrying amount is back down to the £4,000 residual value, which is the check worth making.',
    },
    {
      id: 'F-4-02', unitKey: 'faps', lo: 4, criteria: ['FAPS-4.1.4'],
      type: 'numeric',
      q: 'A machine with a full-year straight-line charge of £6,000 becomes available for use on 1 July. The year end is 31 December and the policy is pro-rata. What is the charge for that first year?',
      answer: 3000,
      unit: '£',
      exp: 'July to December is six months of availability, so the charge is £6,000 × 6 ÷ 12 = £3,000. Pro-rata months run from when the asset became available for use, which may be later than the invoice date.',
    },
    {
      id: 'F-4-03', unitKey: 'faps', lo: 4, criteria: ['FAPS-4.1.5'],
      type: 'numeric',
      q: 'Equipment costing £12,000 is depreciated at 40% per annum on the diminishing balance. What is the charge for the second year?',
      answer: 2880,
      unit: '£',
      exp: 'Year one is £12,000 × 40% = £4,800, leaving a carrying amount of £12,000 − £4,800 = £7,200. Year two applies the same rate to that reduced base: £7,200 × 40% = £2,880. Applying 40% to cost a second time would give £4,800 and is the usual error here.',
    },
    {
      id: 'F-4-04', unitKey: 'faps', lo: 4, criteria: ['FAPS-4.1.4', 'FAPS-4.1.5'],
      type: 'mcq',
      q: 'A depreciation policy reads "25% per annum on the carrying amount". Which method is that, and what happens to the charge over time?',
      opts: ['Diminishing balance, and the charge falls each year', 'Straight line, and the charge stays the same each year', 'Diminishing balance, and the charge rises each year', 'Straight line, and the charge falls once the residual value is met'],
      ans: 0,
      exp: 'A rate applied to the carrying amount is diminishing balance. The rate is fixed but the base shrinks every year as depreciation accumulates, so the charge falls — which is the front-loaded pattern the method exists to produce.',
    },
    {
      id: 'F-4-05', unitKey: 'faps', lo: 4, criteria: ['FAPS-4.2.1'],
      type: 'mcq',
      q: 'Which pair of accounts does the year-end depreciation journal use?',
      opts: ['Depreciation expense and accumulated depreciation', 'Depreciation expense and the asset cost account', 'Accumulated depreciation and the asset cost account', 'Depreciation expense and the disposals account'],
      ans: 0,
      exp: 'Debit depreciation expense, credit accumulated depreciation. The asset cost account is untouched — cost stays at cost for the whole life — which is what allows the statement of financial position to show cost, accumulated depreciation and carrying amount as three separate figures.',
    },
    {
      id: 'F-4-06', unitKey: 'faps', lo: 4, criteria: ['FAPS-4.1.1', 'FAPS-4.1.2'],
      type: 'truefalse',
      q: 'Identify whether each statement about the purpose of depreciation is correct.',
      statements: [
        { text: 'It allocates the depreciable amount across the periods the asset serves.', answer: true },
        { text: 'It restates the asset at what it would fetch on the open market.', answer: false },
        { text: 'It is an application of the accruals principle.', answer: true },
        { text: 'It accumulates cash with which to replace the asset.', answer: false },
      ],
      exp: 'Depreciation spreads cost less residual value over the useful life, which is the accruals principle applied to something paid for once and used slowly. It makes no claim about market value, and accumulated depreciation is a contra-asset against cost rather than a fund holding money.',
    },
    {
      id: 'F-4-07', unitKey: 'faps', lo: 4, criteria: ['FAPS-4.2.2'],
      type: 'truefalse',
      q: 'Identify whether each statement about reconciling the register to the ledger is correct.',
      statements: [
        { text: 'A reconciliation that agrees proves the depreciation charge was computed on the right useful life.', answer: false },
        { text: 'An asset scrapped but left in the register goes on attracting depreciation.', answer: true },
        { text: 'Under a policy charging nothing in the year of disposal, no depreciation is added before the gain or loss is worked out.', answer: true },
        { text: 'The reconciliation is run before disposals have been written out of the register.', answer: false },
      ],
      exp: 'Both records can agree perfectly on a figure derived from a wrong life or in-service date, which is why the register line is also read against the invoice. An asset left in the register keeps being depreciated. Where the policy charges nothing in the year of disposal, the carrying amount is already up to date and no further charge is made — under pro-rata a part-year charge would be. And the reconciliation is the last step, because running it early produces differences that are not faults.',
    },
    {
      id: 'F-4-08', unitKey: 'faps', lo: 4, criteria: ['FAPS-4.1.3'],
      type: 'mcq',
      q: 'Depreciation is calculated automatically by accounting software. Which risk does that leave?',
      opts: ['A wrong in-service date produces a wrong charge that reconciles perfectly', 'The arithmetic may be performed inconsistently between one period and the next', 'The charge may be omitted altogether for assets acquired late in the year', 'The journal may be posted to the asset cost account rather than to expense'],
      ans: 0,
      exp: 'Software applies the rule it is given to the inputs it is given, so it cannot get the arithmetic wrong or forget an asset. What it will do is depreciate a wrong date, life or class cleanly and consistently for the whole life — and because the register and ledger both come from the same wrong input, the reconciliation agrees.',
    },
    {
      id: 'F-4-09', unitKey: 'faps', lo: 4, criteria: ['FAPS-4.1.4'],
      type: 'numeric',
      q: 'A depreciation policy reads "15% per annum straight line on cost". An asset cost £45,000. What is the annual charge?',
      answer: 6750,
      unit: '£',
      exp: 'Straight line applies the rate to cost, so the charge is £45,000 × 15% = £6,750 and it is the same every year. The same rate on the carrying amount would be diminishing balance and would give £6,750 only in the first year.',
    },
    {
      id: 'F-4-10', unitKey: 'faps', lo: 4, criteria: ['FAPS-4.1.4'],
      type: 'mcq',
      q: 'A policy charges a full year in the year of acquisition and none in the year of disposal. An asset is bought on 30 November and the year end is 31 December. What is charged in that first year?',
      opts: ['A full year, whatever the date of acquisition', 'One month, apportioned from the date of acquisition', 'Nothing, because the asset was held for under a month', 'Half a year, as the convention for a late acquisition'],
      ans: 0,
      exp: 'The convention does the apportioning so nobody has to: an asset bought on any date in the year takes a whole year, and the year it is sold takes none. Pro-rata would give one month here, which is why the policy has to be read before any figure is worked out.',
    },
    {
      id: 'F-5-01', unitKey: 'faps', lo: 5, criteria: ['FAPS-5.1.6'],
      type: 'numeric',
      q: 'A business pays £9,600 on 1 August for twelve months of maintenance cover to 31 July. Its year end is 31 December. What is the prepayment at the year end?',
      answer: 5600,
      unit: '£',
      exp: 'August to December is five months used, leaving seven months paid for and not yet had: £9,600 × 7 ÷ 12 = £5,600. That is the prepayment, shown as a current asset. The charge to this year is the other £4,000.',
    },
    {
      id: 'F-5-02', unitKey: 'faps', lo: 5, criteria: ['FAPS-5.1.6', 'FAPS-5.1.7'],
      type: 'numeric',
      q: 'A business has paid £15,800 for gas during the year. At the year end £2,400 of supply has been used and not yet billed. What is the gas expense for the year?',
      answer: 18200,
      unit: '£',
      exp: 'The supply was consumed in this year, so its cost belongs to this year whatever date the invoice carries: £15,800 + £2,400 = £18,200. The £2,400 is credited to accruals and shown as a current liability.',
    },
    {
      id: 'F-5-03', unitKey: 'faps', lo: 5, criteria: ['FAPS-5.1.4', 'FAPS-5.1.6'],
      type: 'numeric',
      q: 'A business sublets a unit for £1,200 a month. By the year end it has received £13,200 of rent for the year. What is the accrued income at the year end?',
      answer: 1200,
      unit: '£',
      exp: 'The year earned £1,200 × 12 = £14,400 and £13,200 arrived, so £14,400 − £13,200 = £1,200 is earned and not yet received. It is credited to rental income and shown as a current asset, because the tenant owes it.',
    },
    {
      id: 'F-5-04', unitKey: 'faps', lo: 5, criteria: ['FAPS-5.1.8'],
      type: 'numeric',
      q: 'An expense account has an opening accrual of £900. Payments during the year were £7,400 and £1,150 is accrued at the year end. What is the charge to this year\'s profit?',
      answer: 7650,
      unit: '£',
      exp: 'The payments include £900 that belonged to last year, and this year has consumed £1,150 it has not paid for: £7,400 − £900 + £1,150 = £7,650. Omitting the opening reversal would charge last year\'s cost a second time.',
    },
    {
      id: 'F-5-05', unitKey: 'faps', lo: 5, criteria: ['FAPS-5.2.4'],
      type: 'numeric',
      q: 'Receivables are £96,000, of which £6,000 is specifically doubtful. The general allowance is 2% of the remainder and the allowance brought forward is £5,200. What is the charge to profit?',
      answer: 2600,
      unit: '£',
      exp: 'The remainder is £96,000 − £6,000 = £90,000 and 2% of that is £1,800, so the allowance required is £6,000 + £1,800 = £7,800. Against £5,200 brought forward, only the movement of £7,800 − £5,200 = £2,600 is charged.',
    },
    {
      id: 'F-5-06', unitKey: 'faps', lo: 5, criteria: ['FAPS-5.2.4'],
      type: 'mcq',
      q: 'Receivables are £45,000 and the allowance is to be 4%. The allowance brought forward is £2,300. What reaches the statement of profit or loss?',
      opts: ['A credit of £500, because the allowance falls', 'A charge of £500, because the allowance is adjusted', 'A charge of £1,800, being the whole allowance required', 'A credit of £2,300, being the allowance released'],
      ans: 0,
      exp: 'The allowance required is £45,000 × 4% = £1,800, which is less than the £2,300 brought forward. The allowance falls by £500, so the adjustment account is credited and profit rises. Only the movement ever reaches profit.',
    },
    {
      id: 'F-5-07', unitKey: 'faps', lo: 5, criteria: ['FAPS-5.3.4', 'FAPS-5.3.7'],
      type: 'numeric',
      q: 'Inventory: X, 120 units at cost £22 and NRV £27. Y, 90 units at cost £18 and NRV £15. Z, 60 units at cost £31 and NRV £35. What is the closing inventory value?',
      answer: 5850,
      unit: '£',
      exp: 'Each line is taken at the lower of cost and net realisable value, item by item: X at cost 120 × £22 = £2,640, Y at NRV 90 × £15 = £1,350, Z at cost 60 × £31 = £1,860. The total is £2,640 + £1,350 + £1,860 = £5,850.',
    },
    {
      id: 'F-5-08', unitKey: 'faps', lo: 5, criteria: ['FAPS-5.3.2'],
      type: 'numeric',
      q: 'Opening inventory is £18,000, net purchases £94,000 and closing inventory £21,000. What is the cost of sales?',
      answer: 91000,
      unit: '£',
      exp: 'Cost of sales is opening inventory plus net purchases less closing inventory: £18,000 + £94,000 − £21,000 = £91,000. The closing figure is held back because those goods have not been sold, and it is charged next year as the opening inventory.',
    },
    {
      id: 'F-5-09', unitKey: 'faps', lo: 5, criteria: ['FAPS-5.2.2', 'FAPS-5.2.3'],
      type: 'truefalse',
      q: 'Identify whether each statement about irrecoverable debts and allowances is correct.',
      statements: [
        { text: 'Writing off a debt removes it from the sales ledger control account.', answer: true },
        { text: 'An allowance for doubtful receivables reduces the receivables balance in the ledger.', answer: false },
        { text: 'A debt written off in an earlier year and later paid is credited to irrecoverable debts.', answer: true },
        { text: 'A specific allowance is included in the balance the general percentage is applied to.', answer: false },
      ],
      exp: 'A write-off removes the asset because the business has given up on it. An allowance is a separate estimate shown as a deduction on the face of the statement, and the customer is still pursued. A later recovery is credited to the expense account in the year the money arrived. And the specifically doubtful debt is taken out before the general rate is applied, or it is covered twice.',
    },
    {
      id: 'F-5-10', unitKey: 'faps', lo: 5, criteria: ['FAPS-5.3.5'],
      type: 'truefalse',
      q: 'Identify whether each cost forms part of the cost of inventory.',
      statements: [
        { text: 'Carriage inwards on goods purchased.', answer: true },
        { text: 'Storage of finished goods awaiting sale.', answer: false },
        { text: 'Production overheads properly attributable to the goods.', answer: true },
        { text: 'The cost of delivering the goods to customers.', answer: false },
      ],
      exp: 'Cost is what it took to bring the goods to their present location and condition. Carriage inwards and attributable production overheads qualify. Storage after production is finished does not, unless the process itself requires it, and delivery to customers is a cost of selling that is deducted in arriving at net realisable value.',
    },
    {
      id: 'F-5-11', unitKey: 'faps', lo: 5, criteria: ['FAPS-5.4.1', 'FAPS-5.4.4'],
      type: 'mcq',
      q: 'A director asks you to reduce the general allowance rate from 3% to 1% at the year end, with no change in how customers are paying. What does objectivity require?',
      opts: ['Hold the rate the collection experience supports, whoever prefers otherwise', 'Apply the requested rate, since setting policy is a matter for the directors', 'Use 2%, which is defensible and satisfies both positions', 'Apply the requested rate and disclose the change in a note'],
      ans: 0,
      exp: 'The rate is an estimate of how much of the balance will not be collected, and nothing about collection has changed — so the evidence still supports 3%. Splitting the difference and complying-with-disclosure both let the seniority of the request change a technical answer, which is what objectivity forbids.',
    },
    {
      id: 'F-5-12', unitKey: 'faps', lo: 5, criteria: ['FAPS-5.1.4'],
      type: 'gapfill',
      q: 'Complete the classification of the four adjustments.',
      template: 'An expense consumed but not yet paid is a {0}. An expense paid but not yet consumed is a {1}. Income received but not yet earned is a {2}.',
      gaps: [
        { options: ['current liability', 'current asset', 'reduction of capital'], answer: 0 },
        { options: ['current asset', 'current liability', 'non-current asset'], answer: 0 },
        { options: ['current liability', 'current asset', 'item of revenue'], answer: 0 },
      ],
      exp: 'Had it and not paid means the business owes — a liability. Paid and not had it means the business is owed the benefit — an asset. Received and not earned means the business owes a service — a liability, and the mirror image of a prepaid expense rather than a copy of it.',
    },
    {
      id: 'F-7-01', unitKey: 'faps', lo: 7, criteria: ['FAPS-7.1.5'],
      type: 'numeric',
      q: 'Opening inventory is £16,500, purchases £108,000, purchases returns £4,200, carriage inwards £1,900 and closing inventory £15,100. What is the cost of sales?',
      answer: 107100,
      unit: '£',
      exp: 'Net purchases are £108,000 − £4,200 + £1,900 = £105,700. Cost of sales is then opening inventory plus net purchases less closing inventory: £16,500 + £105,700 − £15,100 = £107,100.',
    },
    {
      id: 'F-7-02', unitKey: 'faps', lo: 7, criteria: ['FAPS-7.1.5'],
      type: 'mcq',
      q: 'A wholesaler pays £3,400 to have goods delivered in from its supplier and £2,900 to deliver goods out to its customers. How are the two treated?',
      opts: ['£3,400 within net purchases and £2,900 among the expenses', '£2,900 within net purchases and £3,400 among the expenses', 'Both within net purchases, adding £6,300 to cost of sales', 'Both among the expenses, adding £6,300 below gross profit'],
      ans: 0,
      exp: 'Carriage inwards is part of getting the goods onto the shelf, so it belongs in net purchases and above gross profit. Carriage outwards is a cost of selling that arises after the goods are ready, so it sits among the expenses below gross profit.',
    },
    {
      id: 'F-7-03', unitKey: 'faps', lo: 7, criteria: ['FAPS-7.1.6'],
      type: 'numeric',
      q: 'Sales are £276,000, sales returns £8,000, opening inventory £19,000, purchases £152,000, carriage inwards £3,000, carriage outwards £4,500 and closing inventory £22,400. What is the gross profit?',
      answer: 116400,
      unit: '£',
      exp: 'Sales revenue is £276,000 − £8,000 = £268,000 and net purchases £152,000 + £3,000 = £155,000, so cost of sales is £19,000 + £155,000 − £22,400 = £151,600. Gross profit is £268,000 − £151,600 = £116,400. Carriage outwards belongs below gross profit and takes no part in this calculation.',
    },
    {
      id: 'F-7-04', unitKey: 'faps', lo: 7, criteria: ['FAPS-7.1.2', 'FAPS-7.1.3'],
      type: 'mcq',
      q: 'What does a statement of financial position report?',
      opts: ['The assets, liabilities and capital of the business at one date', 'The income and expenses of the business over a period', 'The cash received and paid by the business over a period', 'The assets the business expects to be holding next year'],
      ans: 0,
      exp: 'It is the accounting equation set out down the page at a single date: assets less liabilities equals capital. Income and expenses belong to the statement of profit or loss, which covers a period rather than a moment, and neither statement is a forecast.',
    },
    {
      id: 'F-7-05', unitKey: 'faps', lo: 7, criteria: ['FAPS-7.1.7'],
      type: 'numeric',
      q: 'Non-current assets have a carrying amount of £212,000. Inventory is £31,000, trade receivables £44,000 against an allowance of £2,200, prepayments £1,800 and there is a bank overdraft of £5,400. Trade payables are £38,700 and accruals £2,900. A loan of £75,000 is repayable in seven years. What are the net assets?',
      answer: 164600,
      unit: '£',
      exp: 'Receivables net of the allowance are £44,000 − £2,200 = £41,800, so current assets are £31,000 + £41,800 + £1,800 = £74,600. The overdraft joins the current liabilities: £5,400 + £38,700 + £2,900 = £47,000, leaving net current assets of £74,600 − £47,000 = £27,600. Adding non-current assets gives £212,000 + £27,600 = £239,600, and the loan is deducted last: £239,600 − £75,000 = £164,600.',
    },
    {
      id: 'F-7-06', unitKey: 'faps', lo: 7, criteria: ['FAPS-7.1.1', 'FAPS-7.1.4'],
      type: 'truefalse',
      q: 'Identify whether each statement about where a figure appears is correct.',
      statements: [
        { text: 'Drawings appear among the expenses in the statement of profit or loss.', answer: false },
        { text: 'Closing inventory appears in both financial statements.', answer: true },
        { text: 'Depreciation for the year appears in the statement of profit or loss.', answer: true },
        { text: 'Capital introduced during the year appears in the statement of profit or loss.', answer: false },
        { text: 'An accrual is shown as a current asset.', answer: false },
      ],
      exp: 'Drawings and capital introduced are movements on the capital account and stay off the profit statement altogether. Closing inventory does appear twice — deducted in arriving at cost of sales and listed as a current asset. Depreciation is a cost of the year even though nothing was paid. An accrual is money owed, so it is a current liability.',
    },
    {
      id: 'F-7-07', unitKey: 'faps', lo: 7, criteria: ['FAPS-7.2.2'],
      type: 'numeric',
      q: 'Opening capital was £82,000. The owner introduced £15,000, profit for the year was £46,300, cash drawings were £38,500 and goods costing £2,200 were taken for personal use. What is the closing capital?',
      answer: 102600,
      unit: '£',
      exp: 'Capital rises by what is put in and by the profit, and falls by everything taken out in any form: £82,000 + £15,000 + £46,300 − £38,500 − £2,200 = £102,600. The goods are taken at cost, not at what they would have sold for.',
    },
    {
      id: 'F-7-08', unitKey: 'faps', lo: 7, criteria: ['FAPS-7.2.2'],
      type: 'mcq',
      q: 'A sole trader has taken goods costing £1,300, which would have sold for £2,050, and no entry has been made. What is the effect on the accounts as they stand?',
      opts: ['Cost of sales is overstated by £1,300 and drawings understated by £1,300', 'Cost of sales is overstated by £2,050 and drawings understated by £2,050', 'Sales are understated by £2,050 and drawings understated by £1,300', 'Profit is overstated by £750, being the margin on the goods taken'],
      ans: 0,
      exp: 'The £1,300 is sitting in purchases, and the goods are not in the closing inventory count because they have gone, so cost of sales carries a charge for goods that were never sold. The correcting entry debits drawings and credits purchases with the cost. No sale took place, so revenue and margin do not come into it.',
    },
    {
      id: 'F-7-09', unitKey: 'faps', lo: 7, criteria: ['FAPS-7.2.1', 'FAPS-7.2.2'],
      type: 'numeric',
      q: 'A sole trader began the year with capital of £39,600 and introduced no further capital. Drawings were £27,300 and closing capital is £48,900. What was the profit for the year?',
      answer: 36600,
      unit: '£',
      exp: 'Closing capital equals opening capital plus profit less drawings, so the profit is the figure that makes it balance: £48,900 + £27,300 − £39,600 = £36,600. Capital grew by £9,300 even though £27,300 was withdrawn, which only a profit of that size can explain.',
    },
    {
      id: 'F-7-10', unitKey: 'faps', lo: 7, criteria: ['FAPS-7.3.4'],
      type: 'numeric',
      q: 'Profit for the year is £118,000. Interest on capital totals £9,400, partners\' salaries total £22,000 and interest on drawings totals £2,100. What is the residual profit available for sharing?',
      answer: 88700,
      unit: '£',
      exp: 'Interest on drawings is a charge to the partners, so it is added to the pot; interest on capital and salaries are paid out of it, so they are deducted: £118,000 + £2,100 − £9,400 − £22,000 = £88,700.',
    },
    {
      id: 'F-7-11', unitKey: 'faps', lo: 7, criteria: ['FAPS-7.3.5'],
      type: 'numeric',
      q: 'Residual profit of £97,200 is shared between three partners in the ratio 5:3:1. What does the partner on three parts receive?',
      answer: 32400,
      unit: '£',
      exp: 'The parts add to nine, so one part is £97,200 ÷ 9 = £10,800 and three parts are £10,800 × 3 = £32,400. Dividing by the number of partners instead of by the number of parts is the usual error.',
    },
    {
      id: 'F-7-12', unitKey: 'faps', lo: 7, criteria: ['FAPS-7.3.1', 'FAPS-7.3.2'],
      type: 'truefalse',
      q: 'Identify whether each statement about the appropriation account is correct.',
      statements: [
        { text: 'A partner\'s salary is deducted in arriving at profit for the year.', answer: false },
        { text: 'Interest on drawings increases the profit available for appropriation.', answer: true },
        { text: 'The profit-sharing ratio is applied to profit for the year.', answer: false },
        { text: 'Interest on capital is deducted in the appropriation account.', answer: true },
        { text: 'Where a partnership makes a loss, no appropriation account is prepared.', answer: false },
      ],
      exp: 'A partner\'s salary divides the profit rather than reducing it, so it appears below profit for the year, and the ratio is applied to what is left after the salaries and interest on capital have come out. Interest charged on drawings goes back into the pot. A loss is appropriated by exactly the same method, which usually leaves a residual loss larger than the loss the business made.',
    },
    {
      id: 'F-7-13', unitKey: 'faps', lo: 7, criteria: ['FAPS-7.4.5'],
      type: 'numeric',
      q: 'A partner\'s current account opens with a credit balance of £4,700. She is credited with interest on capital of £2,100, a salary of £12,000 and a profit share of £18,900, and charged interest on drawings of £850. Her drawings were £34,000. What is the closing balance?',
      answer: 2850,
      unit: '£',
      exp: 'The credits total £4,700 + £2,100 + £12,000 + £18,900 = £37,700 and the debits £850 + £34,000 = £34,850, so the balance carried down is £37,700 − £34,850 = £2,850 credit.',
    },
    {
      id: 'F-7-14', unitKey: 'faps', lo: 7, criteria: ['FAPS-7.4.3'],
      type: 'mcq',
      q: 'What distinguishes a partner\'s capital account from their current account?',
      opts: ['The capital account holds the agreed long-term stake and rarely moves', 'The capital account holds the drawings taken during the year', 'The capital account receives the partner\'s share of residual profit', 'The capital account is opened only when a partner joins or leaves'],
      ans: 0,
      exp: 'Capital accounts record the stake each partner agreed to put in, and are left alone so that interest on capital has a stable balance to be calculated on. Drawings, profit shares, salaries and interest all run through the current account, which is why it moves several times a year and the capital account usually does not move at all.',
    },
    {
      id: 'F-7-15', unitKey: 'faps', lo: 7, criteria: ['FAPS-7.4.6'],
      type: 'numeric',
      q: 'Two partners have capital accounts of £95,000 and £65,000. Their current accounts close at £12,600 credit and £4,300 debit. What must the net assets total?',
      answer: 168300,
      unit: '£',
      exp: 'The financed-by section totals to net assets, and a debit balance on a current account is deducted rather than added: £95,000 + £65,000 + £12,600 − £4,300 = £168,300.',
    },
    {
      id: 'F-7-16', unitKey: 'faps', lo: 7, criteria: ['FAPS-7.1.5'],
      type: 'gapfill',
      q: 'Complete the three definitions the trading section rests on.',
      template: 'Sales less sales returns is {0}. Purchases less purchases returns plus carriage inwards is {1}. Opening inventory plus net purchases less closing inventory is {2}.',
      gaps: [
        { options: ['sales revenue', 'gross profit', 'net purchases'], answer: 0 },
        { options: ['net purchases', 'cost of sales', 'sales revenue'], answer: 0 },
        { options: ['cost of sales', 'gross profit', 'net purchases'], answer: 0 },
      ],
      exp: 'Each returns figure is deducted from the account it reverses, so sales returns reduce revenue and purchases returns reduce purchases. Carriage inwards is added because delivery was part of obtaining the goods. The two inventory figures then move the cost of goods into the year that sold them.',
    },
    {
      id: 'F-6-01', unitKey: 'faps', lo: 6, criteria: ['FAPS-6.1.5'],
      type: 'numeric',
      q: 'Premises £140,000, purchases £96,500, wages £38,200, drawings £16,400, opening inventory £11,900, and a disposals account showing a loss of £2,300. What do these six balances come to in the debit column?',
      answer: 305300,
      unit: '£',
      exp: 'All six are debits: assets, expenses, drawings and a loss on disposal, which is an expense however the account is titled. £140,000 + £96,500 + £38,200 + £16,400 + £11,900 + £2,300 = £305,300.',
    },
    {
      id: 'F-6-02', unitKey: 'faps', lo: 6, criteria: ['FAPS-6.1.1'],
      type: 'mcq',
      q: 'The VAT control account shows a debit balance at the year end. What does that mean?',
      opts: ['HMRC owes the business a repayment', 'The business owes HMRC the amount shown', 'Output tax exceeded input tax for the quarter', 'The account has been posted on the wrong side'],
      ans: 0,
      exp: 'VAT usually sits as a credit, being money collected for HMRC and not yet paid over. A debit balance reverses that: input tax has exceeded output tax, so the business has paid more VAT than it has charged and is owed the difference.',
    },
    {
      id: 'F-6-03', unitKey: 'faps', lo: 6, criteria: ['FAPS-6.1.3'],
      type: 'truefalse',
      q: 'Identify whether each error would leave the trial balance still agreeing.',
      statements: [
        { text: 'A purchase invoice never entered in the books.', answer: true },
        { text: 'A rent balance entered in the credit column.', answer: false },
        { text: 'A payment to J Cole debited to J Coles.', answer: true },
        { text: 'A sales daybook total added up wrongly.', answer: false },
        { text: 'A cheque credited to bank but never debited to the supplier.', answer: false },
      ],
      exp: 'An omitted invoice and a posting to a similarly named account are errors of omission and of commission, and both leave debits equal to credits. A balance in the wrong column, a casting error and a missing half all move the totals apart, which is what a trial balance exists to detect.',
    },
    {
      id: 'F-6-04', unitKey: 'faps', lo: 6, criteria: ['FAPS-6.1.6'],
      type: 'mcq',
      q: 'A payment for servicing a van was debited to the motor vehicles account. What kind of error is this?',
      opts: ['An error of principle', 'An error of commission', 'An error of original entry', 'A compensating error'],
      ans: 0,
      exp: 'A service is an expense and the motor vehicles account is an asset, so a cost has been recorded as an asset — the wrong type of account, which makes it principle rather than commission. Profit is understated this year and the asset is overstated for as long as it is depreciated.',
    },
    {
      id: 'F-6-05', unitKey: 'faps', lo: 6, criteria: ['FAPS-6.1.6'],
      type: 'numeric',
      q: 'A payment of £740 to a supplier was recorded as a debit to bank and a credit to trade payables. What amount must be debited to trade payables to correct it?',
      answer: 1480,
      unit: '£',
      exp: 'Payables carries a £740 credit it should not have and is missing the £740 debit it should have received, so it is out by £740 + £740 = £1,480. Correcting a reversal always takes double the original figure.',
    },
    {
      id: 'F-6-06', unitKey: 'faps', lo: 6, criteria: ['FAPS-6.1.7'],
      type: 'numeric',
      q: 'A trial balance shows debits of £427,150 and credits of £431,900. What is the suspense account balance?',
      answer: 4750,
      unit: '£',
      exp: 'The difference is £431,900 − £427,150 = £4,750. Credits are the larger side, so the debit column is short and the suspense balance is a debit of £4,750.',
    },
    {
      id: 'F-6-07', unitKey: 'faps', lo: 6, criteria: ['FAPS-6.1.7'],
      type: 'mcq',
      q: 'A trial balance has a suspense account with a credit balance of £600. Which single error would account for it?',
      opts: ['A £600 credit entry that was never posted', 'A £600 debit entry that was never posted', 'A £300 debit entry posted as a credit', 'A £600 invoice omitted from the books entirely'],
      ans: 0,
      exp: 'A credit balance in suspense means the debits came to more than the credits, so a credit entry is the one that went missing. A missing debit or a £300 debit posted as a credit would both leave credits the larger side and put suspense on the debit side, and an omitted invoice moves neither total.',
    },
    {
      id: 'F-6-08', unitKey: 'faps', lo: 6, criteria: ['FAPS-6.1.5'],
      type: 'numeric',
      q: 'Excluding capital, the debit column of a trial balance totals £268,400 and the credit column £191,750. What is the capital balance?',
      answer: 76650,
      unit: '£',
      exp: 'Capital is the credit balance that brings the two columns level: £268,400 − £191,750 = £76,650. A trial balance question that withholds one figure is asking you to work back from the requirement that the totals agree.',
    },
    {
      id: 'F-6-09', unitKey: 'faps', lo: 6, criteria: ['FAPS-6.1.2', 'FAPS-6.1.4'],
      type: 'truefalse',
      q: 'Identify whether each statement about producing a trial balance is correct.',
      statements: [
        { text: 'It is prepared before the period end adjustments are entered.', answer: true },
        { text: 'Accounting software transfers the balances into it automatically.', answer: true },
        { text: 'A trial balance produced by software is evidence the bookkeeping is right.', answer: false },
        { text: 'It is published alongside the financial statements.', answer: false },
      ],
      exp: 'The initial trial balance comes first, so the adjustments are worked out on corrected figures. Software does compile it, and refuses any journal whose two sides differ — which is why it always agrees and why agreement says nothing about the entries. It is a working document and is never published.',
    },
    {
      id: 'F-6-10', unitKey: 'faps', lo: 6, criteria: ['FAPS-6.2.2'],
      type: 'numeric',
      q: 'Adjustments are: closing inventory £23,400, depreciation £8,900, accrued wages £1,150, prepaid insurance £2,050, an irrecoverable debt of £780 and a £340 increase in the allowance for doubtful receivables. What does the adjustments debit column total?',
      answer: 36620,
      unit: '£',
      exp: 'Every one of the six debits something — the inventory asset, the depreciation charge, the wages expense, prepayments, irrecoverable debts and the allowance adjustment account: £23,400 + £8,900 + £1,150 + £2,050 + £780 + £340 = £36,620. The credit column comes to the same.',
    },
    {
      id: 'F-6-11', unitKey: 'faps', lo: 6, criteria: ['FAPS-6.2.2'],
      type: 'mcq',
      q: 'Receivables after write-offs are £48,000, the allowance is to be 2.5% and £1,450 is brought forward. What goes in the adjustments columns?',
      opts: ['A debit of £250 to the allowance and a credit of £250 to the adjustment account', 'A credit of £250 to the allowance and a debit of £250 to the adjustment account', 'A debit of £1,200 to the allowance and a credit of £1,200 to the adjustment account', 'A credit of £1,450 to the allowance and a debit of £1,450 to the adjustment account'],
      ans: 0,
      exp: 'The allowance required is £48,000 × 2.5% = £1,200 against £1,450 brought forward, so it falls by £250. A falling allowance is debited, and only the movement is ever entered — never the whole allowance and never the brought-forward figure.',
    },
    {
      id: 'F-6-12', unitKey: 'faps', lo: 6, criteria: ['FAPS-6.3.3'],
      type: 'numeric',
      q: 'An expense account shows a ledger balance of £14,600 debit and an adjustments debit of £2,300. What figure is extended to the profit or loss columns?',
      answer: 16900,
      unit: '£',
      exp: 'Ledger balance and adjustment are netted before anything crosses the page, and here both are debits, so they add: £14,600 + £2,300 = £16,900. It goes to the profit or loss debit column, an expense being a debit throughout.',
    },
    {
      id: 'F-6-13', unitKey: 'faps', lo: 6, criteria: ['FAPS-6.3.3'],
      type: 'mcq',
      q: 'Closing inventory of £19,400 is extended. Where does it appear?',
      opts: ['A debit in the position columns and a credit in the profit columns', 'A credit in the position columns and a debit in the profit columns', 'A debit in the position columns and a debit in the profit columns', 'A debit in the position columns and nowhere else'],
      ans: 0,
      exp: 'Unsold goods are an asset on the last day of the year, which is the debit, and their cost is held back out of cost of sales, which is the credit. Both halves carry the same figure and neither duplicates the other — they are the two consequences of one fact.',
    },
    {
      id: 'F-6-14', unitKey: 'faps', lo: 6, criteria: ['FAPS-6.3.4'],
      type: 'numeric',
      q: 'The profit or loss columns of an extended trial balance total £182,700 debit and £176,400 credit. What figure is entered to balance them?',
      answer: 6300,
      unit: '£',
      exp: 'Expenses exceed income by £182,700 − £176,400 = £6,300, so the year made a loss of that size. It is entered in the profit or loss credit column to close the pair, and in the position debit column, because a loss reduces capital.',
    },
    {
      id: 'F-6-15', unitKey: 'faps', lo: 6, criteria: ['FAPS-6.3.4'],
      type: 'mcq',
      q: 'A sole trader\'s extended trial balance shows a profit for the year. Where is the profit figure entered?',
      opts: ['The profit and loss debit column and the position credit column', 'The profit and loss credit column and the position debit column', 'The profit and loss debit column and the position debit column', 'The position credit column and nowhere else'],
      ans: 0,
      exp: 'A profit means the income column is the larger, so the debit side needs the difference to close the pair. Its other half is a credit in the position columns, because the profit increases what the business owes its owner — the same entry the capital account receives.',
    },
    {
      id: 'F-6-16', unitKey: 'faps', lo: 6, criteria: ['FAPS-6.3.2'],
      type: 'truefalse',
      q: 'Identify whether each statement about a partnership\'s extended trial balance is correct.',
      statements: [
        { text: 'The position columns carry a capital and a current account for each partner.', answer: true },
        { text: 'The profit is appropriated before any of it reaches the position columns.', answer: true },
        { text: 'The adjustments are calculated differently from a sole trader\'s.', answer: false },
        { text: 'Completing one is assessed in this unit.', answer: false },
        { text: 'A partner\'s salary is extended to the profit and loss debit column.', answer: false },
      ],
      exp: 'Fixed capital gives each partner two balances, both in the position columns, and the profit is divided through the appropriation account before any share reaches them. Depreciation and accruals do not change because there are two owners. The specification excludes completing a partnership ETB while still asking why it differs, and a partner\'s salary divides profit rather than reducing it.',
    },
    {
      id: 'F-6-17', unitKey: 'faps', lo: 6, criteria: ['FAPS-6.1.7'],
      type: 'gapfill',
      q: 'Complete the three rules about the suspense account.',
      template: 'If the credit column totals more than the debit column, the suspense balance is a {0}. Correcting a figure entered on the wrong side takes {1} the amount. A suspense balance still there at the year end means {2}.',
      gaps: [
        { options: ['debit', 'credit', 'liability'], answer: 0 },
        { options: ['twice', 'half', 'exactly'], answer: 0 },
        { options: ['an error is still unfound', 'the accounts are ready to publish', 'the adjustment has been posted'] , answer: 0 },
      ],
      exp: 'The suspense balance goes on whichever side is short, so a heavy credit column calls for a debit. A figure on the wrong side is doubly wrong — absent from where it belongs and present where it does not — so putting it right takes double. And the account is temporary: anything left in it is an unexplained difference sitting among figures about to be published.',
    },
    /* ── Entry grids and pick lists ───────────────────────────────────────────
       The formats where the reader decides WHERE a figure belongs, not just
       what it is. FAPS asks for exactly this in three places — 2.3.7 prepare
       ledger accounts, 5.2.5 use the journal, 6.2.2 place adjustments into the
       right columns of the extended trial balance — and until now the module
       could only ask about them in prose. */
    {
      id: 'F-2-90', unitKey: 'faps', lo: 2, criteria: ['FAPS-2.3.7'],
      type: 'entrygrid',
      q: 'A credit customer is invoiced £4,800 plus VAT at 20%. Record the entry in the general ledger.',
      entrygrid: {
        title: 'General ledger',
        rowHeader: 'Account',
        columns: ['Debit £', 'Credit £'],
        rows: [
          { label: 'Sales ledger control account', col: 0, amount: 5760 },
          { label: 'Sales', col: 1, amount: 4800 },
          { label: 'VAT control', col: 1, amount: 960 },
        ],
      },
      exp: 'The customer owes the full invoice, so SLCA is debited with the GROSS £5,760. The business has earned the net £4,800 and owes HMRC the £960, so both are credits. The entry balances at £5,760 each side — and it is the gross figure on the debit side that makes it balance, which is the step most often got wrong by debiting the net.',
    },
    {
      id: 'F-5-90', unitKey: 'faps', lo: 5, criteria: ['FAPS-5.2.5'],
      type: 'entrygrid',
      q: 'A debt of £744 including VAT at 20%, more than six months past its due date, is written off as irrecoverable. Record the journal.',
      entrygrid: {
        title: 'Journal',
        rowHeader: 'Account',
        columns: ['Debit £', 'Credit £'],
        rows: [
          { label: 'Irrecoverable debts', col: 0, amount: 620 },
          { label: 'VAT control', col: 0, amount: 124 },
          { label: 'Sales ledger control account', col: 1, amount: 744 },
        ],
      },
      exp: 'The whole £744 comes out of receivables, so SLCA is credited with the gross. The debt is over six months past its due date, so the VAT of £744 ÷ 6 = £124 may be reclaimed: that DEBITS the VAT control account and reduces what is owed to HMRC, leaving the net £620 as the real cost. Writing the full £744 to irrecoverable debts overstates the expense by the VAT and forgets a reclaim the business is entitled to — and the six months is what makes that reclaim available, which is why the question says so.',
    },
    {
      id: 'F-6-90', unitKey: 'faps', lo: 6, criteria: ['FAPS-6.2.2'],
      type: 'entrygrid',
      q: 'Rent of £12,000 was paid for the year to 31 March. The year end is 31 December. Place the year-end adjustment in the adjustments columns.',
      entrygrid: {
        title: 'Adjustments',
        rowHeader: 'Account',
        columns: ['Debit £', 'Credit £'],
        rows: [
          { label: 'Prepayments', col: 0, amount: 3000 },
          { label: 'Rent', col: 1, amount: 3000 },
        ],
      },
      exp: 'Three months of the year to 31 March — January to March — fall after the year end, so £12,000 × 3/12 = £3,000 has been paid in advance. A prepayment is an ASSET, so it is debited, and the rent expense is credited to take the £3,000 back out of this year’s charge. Reversing the two would double the error: the expense would rise by £3,000 rather than fall by it.',
    },
    {
      id: 'F-2-91', unitKey: 'faps', lo: 2, criteria: ['FAPS-2.2.1'],
      type: 'picklist',
      q: 'Classify each general ledger account.',
      picklist: {
        title: 'Ledger accounts',
        rowHeader: 'Account',
        choiceHeader: 'Classification',
        options: ['Asset', 'Liability', 'Income', 'Expense', 'Capital'],
        rows: [
          { text: 'Motor vehicles at cost', answer: 0 },
          { text: 'Bank loan repayable in three years', answer: 1 },
          { text: 'Discounts received', answer: 2 },
          { text: 'Drawings', answer: 4 },
          { text: 'Discounts allowed', answer: 3 },
          { text: 'Accrued expenses', answer: 1 },
        ],
      },
      exp: 'Discounts received and discounts allowed are the pair most often reversed: received is income to the buyer, allowed is an expense of selling. Drawings sit with capital rather than being an expense, because the owner is taking back what they put in and not incurring a cost of trading. And a loan repayable in three years is still a liability — being due after more than a year makes it non-current, not something other than a debt.',
    },
    {
      id: 'F-6-91', unitKey: 'faps', lo: 6, criteria: ['FAPS-6.3.3'],
      type: 'picklist',
      q: 'On the extended trial balance, which pair of columns does each balance extend into?',
      picklist: {
        title: 'Extending the trial balance',
        rowHeader: 'Balance',
        choiceHeader: 'Extends to',
        options: ['Statement of profit or loss', 'Statement of financial position'],
        rows: [
          { text: 'Depreciation charge for the year', answer: 0 },
          { text: 'Purchases', answer: 0 },
          { text: 'Accumulated depreciation', answer: 1 },
          { text: 'Discounts received', answer: 0 },
          { text: 'Bank overdraft', answer: 1 },
          { text: 'Drawings', answer: 1 },
        ],
      },
      exp: 'The depreciation pair is the trap: the CHARGE is this year’s expense and goes to profit or loss, while ACCUMULATED depreciation is every year’s charge added together and sits against the asset on the statement of financial position. Drawings are not an expense, so they never reach profit or loss however large they are. Closing inventory is deliberately absent from this list — it is the one balance that extends into BOTH statements, as an asset and as a credit within cost of sales, so it has no single answer to give.',
    },

    /* ── Outcome 8 · profitability ratios ─────────────────────────────────── */
    {
      id: 'F-8-01', unitKey: 'faps', lo: 8, criteria: ['FAPS-8.1.1'],
      type: 'mcq',
      q: 'Which figure appears in both the statement of profit or loss and the statement of financial position?',
      opts: ['Profit for the year', 'Sales revenue', 'Expenses', 'Cost of sales'],
      ans: 0,
      exp: 'Profit for the year is calculated at the foot of the statement of profit or loss and then added to capital in the statement of financial position. Revenue, expenses and cost of sales all stop at the profit and loss account.',
    },
    {
      id: 'F-8-02', unitKey: 'faps', lo: 8, criteria: ['FAPS-8.1.4'],
      type: 'numeric',
      q: 'Sales revenue is £420,000 and cost of sales is £252,000. What is the gross profit margin, as a percentage?',
      answer: 40, unit: '%',
      exp: 'Gross profit = £420,000 − £252,000 = £168,000. Margin = £168,000 ÷ £420,000 × 100 = 40%. Cost of sales is the other 60%, and the two must add to 100%.',
    },
    {
      id: 'F-8-03', unitKey: 'faps', lo: 8, criteria: ['FAPS-8.1.4'],
      type: 'numeric',
      q: 'Profit for the year is £54,000 and sales revenue is £360,000. What is the net profit margin, as a percentage?',
      answer: 15, unit: '%',
      exp: 'Net profit margin = £54,000 ÷ £360,000 × 100 = 15%. Fifteen pence of every pound sold survives both the cost of the goods and every expense.',
    },
    {
      id: 'F-8-04', unitKey: 'faps', lo: 8, criteria: ['FAPS-8.1.4'],
      type: 'numeric',
      q: 'Capital is £140,000, non-current liabilities are £60,000 and profit for the year is £36,000. What is ROCE, as a percentage?',
      answer: 18, unit: '%',
      exp: 'Capital employed = £140,000 + £60,000 = £200,000, and ROCE = £36,000 ÷ £200,000 × 100 = 18%. Omitting the non-current liability would give 25.7% and overstate the return by more than a third.',
    },
    {
      id: 'F-8-05', unitKey: 'faps', lo: 8, criteria: ['FAPS-8.1.4'],
      type: 'mcq',
      q: 'Which of these forms part of capital employed?',
      opts: ['A mortgage repayable over ten years', 'Trade payables', 'A bank overdraft repayable on demand', 'Accrued wages'],
      ans: 0,
      exp: 'Capital employed is capital plus non-current liabilities. A ten-year mortgage is non-current funding the business had available all year. Payables, overdrafts and accruals are current liabilities and are excluded.',
    },
    {
      id: 'F-8-06', unitKey: 'faps', lo: 8, criteria: ['FAPS-8.1.2'],
      type: 'numeric',
      q: 'A business buys goods for £150,000 and sells them at a mark-up of 20%. What is the gross profit margin, as a percentage, to the nearest whole number?',
      answer: 17, unit: '%',
      exp: 'Mark-up is on cost: gross profit = £150,000 × 20% = £30,000, so sales are £180,000. Margin = £30,000 ÷ £180,000 × 100 = 16.67%, which is 17% to the nearest whole number. The margin is always the smaller of the two percentages.',
    },
    {
      id: 'F-8-07', unitKey: 'faps', lo: 8, criteria: ['FAPS-8.1.2'],
      type: 'numeric',
      q: 'A business works to a gross profit margin of 30%. What mark-up on cost does that represent, as a percentage, to one decimal place?',
      answer: 42.9, unit: '%',
      exp: 'Set sales at 100: gross profit is 30 and cost of sales is 70. Mark-up = 30 ÷ 70 × 100 = 42.857%, which is 42.9% to one decimal place. Dividing by the sales figure instead would simply return the 30% you started with.',
    },
    {
      id: 'F-8-08', unitKey: 'faps', lo: 8, criteria: ['FAPS-8.1.4'],
      type: 'numeric',
      q: 'Sales revenue is £500,000 and wages are £85,000. What is the wages-to-revenue percentage?',
      answer: 17, unit: '%',
      exp: 'The expense/revenue ratio is that expense ÷ sales revenue × 100, so £85,000 ÷ £500,000 × 100 = 17%. Seventeen pence in every pound of sales goes on wages.',
    },
    {
      id: 'F-8-09', unitKey: 'faps', lo: 8, criteria: ['FAPS-8.2.3'],
      type: 'truefalse',
      q: 'Identify whether each statement about comparing ratios is correct.',
      statements: [
        { text: 'A higher return on capital employed is better than a lower one.', answer: true },
        { text: 'A higher expenses-to-revenue percentage is better than a lower one.', answer: false },
        { text: 'A ratio can be compared with the same ratio for a previous period.', answer: true },
        { text: 'A ratio is meaningful without anything to compare it against.', answer: false },
      ],
      exp: 'Profit ratios improve as they rise and expense ratios improve as they fall. The three valid comparisons are a different period, a different organisation and an industry standard — a single ratio with nothing beside it says almost nothing.',
    },
    {
      id: 'F-8-10', unitKey: 'faps', lo: 8, criteria: ['FAPS-8.2.2'],
      type: 'mcq',
      q: 'A business reports an unchanged gross profit margin and a fallen net profit margin. Which explanation fits?',
      opts: ['Rent and insurance costs rose during the year', 'Selling prices were discounted', 'Suppliers increased their prices', 'Closing inventory was understated'],
      ans: 0,
      exp: 'An unchanged gross margin means selling prices, purchase costs and inventory are all behaving — every one of the other three options would have moved it. The fall must come from what sits between gross profit and profit for the year, which is the expenses.',
    },
    {
      id: 'F-8-11', unitKey: 'faps', lo: 8, criteria: ['FAPS-8.2.2'],
      type: 'truefalse',
      q: 'Identify whether each of these would reduce a business\'s gross profit margin.',
      statements: [
        { text: 'Goods were sold at a discount during a clearance sale.', answer: true },
        { text: 'A supplier price rise was absorbed rather than passed on.', answer: true },
        { text: 'The rent of the premises rose.', answer: false },
        { text: 'A long-term loan was taken out during the year.', answer: false },
      ],
      exp: 'Gross profit margin is set by selling price against the cost of the goods, so discounting and an absorbed supplier increase both squeeze it. Rent sits below gross profit and moves only the net margin; a loan affects capital employed and interest, and never reaches gross profit at all.',
    },
    {
      id: 'F-8-12', unitKey: 'faps', lo: 8, criteria: ['FAPS-8.2.4'],
      type: 'mcq',
      q: 'What does professional scepticism require when interpreting a set of ratios?',
      opts: ['Questioning where the underlying figures came from', 'Assuming the preparer has been dishonest', 'Recalculating every ratio by hand', 'Accepting figures produced by accounting software'],
      ans: 0,
      exp: 'Scepticism is a questioning mind, not an accusation and not a full recalculation. It means not treating a presentation as evidence — asking what the figures rest on, whether anything is a one-off, and whether the two things being compared are comparable.',
    },
    {
      id: 'F-8-13', unitKey: 'faps', lo: 8, criteria: ['FAPS-8.1.4'],
      type: 'numeric',
      q: 'Sales revenue is £280,000, cost of sales is £182,000 and expenses are £56,000. What is the net profit margin, as a percentage?',
      answer: 15, unit: '%',
      exp: 'Gross profit = £280,000 − £182,000 = £98,000, and profit for the year = £98,000 − £56,000 = £42,000. Margin = £42,000 ÷ £280,000 × 100 = 15%. Expenses come out of gross profit, not out of revenue.',
    },
    {
      id: 'F-8-14', unitKey: 'faps', lo: 8, criteria: ['FAPS-8.1.3'],
      type: 'picklist',
      q: 'Which figure is the denominator of each ratio?',
      picklist: {
        title: 'Profitability ratios', rowHeader: 'Ratio', choiceHeader: 'Divided by',
        options: ['Sales revenue', 'Capital employed', 'Cost of sales'],
        rows: [
          { text: 'Gross profit margin', answer: 0 },
          { text: 'Return on capital employed', answer: 1 },
          { text: 'Mark-up', answer: 2 },
          { text: 'Net profit margin', answer: 0 },
          { text: 'Expense percentage', answer: 0 },
        ],
      },
      exp: 'Three of the four assessed ratios divide by sales revenue; only ROCE divides by capital employed. Mark-up is the odd one out and divides by cost of sales, which is what makes it larger than the margin on the same profit.',
    },
    {
      id: 'F-8-15', unitKey: 'faps', lo: 8, criteria: ['FAPS-8.2.3'],
      type: 'mcq',
      q: 'A business has a net profit margin of 9% against an industry standard of 14%. What does the comparison show?',
      opts: ['The business keeps less of each pound of sales than its sector', 'The business sells less than its sector', 'The business has more capital than its sector', 'The business has a lower gross profit margin than its sector'],
      ans: 0,
      exp: 'A net profit margin is profit as a share of sales, so a lower figure means less of each pound survives. It says nothing about the size of the business, its capital, or which part of the statement the shortfall came from — the gross margin would have to be examined separately.',
    },
    {
      id: 'F-8-16', unitKey: 'faps', lo: 8, criteria: ['FAPS-8.1.4'],
      type: 'numeric',
      q: 'A business has capital of £96,000, a five-year loan of £54,000, trade payables of £18,000 and profit for the year of £22,500. What is ROCE, as a percentage?',
      answer: 15, unit: '%',
      exp: 'Capital employed = £96,000 + £54,000 = £150,000; the trade payables are a current liability and are excluded. ROCE = £22,500 ÷ £150,000 × 100 = 15%. Including the payables would give 13.4% and understate the return.',
    },
    {
      id: 'F-8-17', unitKey: 'faps', lo: 8, criteria: ['FAPS-8.2.1'],
      type: 'truefalse',
      q: 'Identify whether each use of ratio analysis is one the specification recognises.',
      statements: [
        { text: 'Planning what next year\'s results might look like.', answer: true },
        { text: 'Making a decision between two courses of action.', answer: true },
        { text: 'Controlling the business by investigating what has changed.', answer: true },
        { text: 'Proving why a change in performance happened.', answer: false },
      ],
      exp: 'Ratios support planning, decision making and control. What they cannot do is prove a cause: a margin that has fallen six points identifies where to look, and the explanation always comes from asking about the business itself.',
    },
    {
      id: 'F-8-18', unitKey: 'faps', lo: 8, criteria: ['FAPS-8.1.2'],
      type: 'gapfill',
      q: 'Complete the relationship between the two percentages.',
      template: 'Mark-up is gross profit as a percentage of {0}, while margin is gross profit as a percentage of {1}. For the same goods, the {2} percentage is always the larger.',
      gaps: [
        { options: ['cost of sales', 'sales revenue', 'capital employed'], answer: 0 },
        { options: ['sales revenue', 'cost of sales', 'gross profit'], answer: 0 },
        { options: ['mark-up', 'margin'], answer: 0 },
      ],
      exp: 'Both express the same pound figure of gross profit. Mark-up divides it by the smaller cost figure and margin by the larger sales figure, so the mark-up percentage is always the bigger of the two.',
    },
    {
      id: 'F-8-19', unitKey: 'faps', lo: 8, criteria: ['FAPS-8.2.2'],
      type: 'mcq',
      q: 'Two businesses in the same trade report very different ROCE figures. Which difference between them would make the comparison unsafe?',
      opts: ['One owns its premises and the other rents', 'One was founded more recently than the other', 'One has more employees than the other', 'One trades in a different town'],
      ans: 0,
      exp: 'Owning premises puts a large asset into capital employed and removes rent from expenses; renting does the reverse. That changes both halves of the ratio, so the two ROCE figures are not measuring the same thing. Age, staffing and location may explain a difference but do not make the arithmetic incomparable.',
    },
    {
      id: 'F-8-20', unitKey: 'faps', lo: 8, criteria: ['FAPS-8.1.4'],
      type: 'numeric',
      q: 'Gross profit is £96,000 and the gross profit margin is 32%. What is the sales revenue?',
      answer: 300000, unit: '£',
      exp: 'The margin is gross profit ÷ sales, so sales = gross profit ÷ margin = £96,000 ÷ 0.32 = £300,000. Multiplying by 32% instead would give £30,720, which is smaller than the gross profit and cannot be a sales figure.',
    },
    {
      id: 'F-8-21', unitKey: 'faps', lo: 8, criteria: ['FAPS-8.2.4'],
      type: 'truefalse',
      q: 'Identify whether each statement about relying on figures is correct.',
      statements: [
        { text: 'A ratio calculated to two decimal places is more reliable than one rounded to a whole number.', answer: false },
        { text: 'Overstating closing inventory improves the reported gross profit margin.', answer: true },
        { text: 'Software that reconciles has proved the entries behind it were correct.', answer: false },
        { text: 'A one-off event in either year can distort a comparison between two periods.', answer: true },
      ],
      exp: 'Precision is not accuracy — a ratio is only as good as its inputs however many decimals it carries. Overstating closing inventory reduces cost of sales and raises gross profit, which is why the figure attracts scrutiny. And software checks its own arithmetic, not the truth of what was entered.',
    },
    {
      id: 'F-8-22', unitKey: 'faps', lo: 8, criteria: ['FAPS-8.1.4'],
      type: 'numeric',
      q: 'Sales revenue is £640,000, gross profit is £224,000 and expenses are £147,200. What is the expenses-to-revenue percentage?',
      answer: 23, unit: '%',
      exp: 'The expense ratio divides the expense by sales revenue: £147,200 ÷ £640,000 × 100 = 23%. The gross profit figure is not needed — a common trap is to divide the expenses by gross profit instead, which would give 65.7%.',
    },
    {
      id: 'F-8-23', unitKey: 'faps', lo: 8, criteria: ['FAPS-8.1.1'],
      type: 'mcq',
      q: 'How does profit for the year reach the statement of financial position?',
      opts: ['It is added to capital', 'It is shown as a current asset', 'It is added to non-current liabilities', 'It is deducted from drawings'],
      ans: 0,
      exp: 'Profit belongs to the owner, so it increases the owner\'s claim on the business and is added to capital — whether or not any of it is withdrawn. Drawings are then deducted from capital separately.',
    },
    {
      id: 'F-8-24', unitKey: 'faps', lo: 8, criteria: ['FAPS-8.2.2'],
      type: 'truefalse',
      q: 'Identify whether each change would increase return on capital employed.',
      statements: [
        { text: 'Earning more profit from the same capital employed.', answer: true },
        { text: 'Taking out a further long-term loan with profit unchanged.', answer: false },
        { text: 'Earning the same profit from less capital employed.', answer: true },
        { text: 'The owner introducing further capital with profit unchanged.', answer: false },
      ],
      exp: 'ROCE is profit over capital employed, so it rises when the top grows or the bottom shrinks. A further long-term loan and a capital injection both enlarge capital employed without adding any profit, so both push the ratio down — more money to work with, and nothing more earned on it.',
    },
    {
      id: 'F-8-25', unitKey: 'faps', lo: 8, criteria: ['FAPS-8.1.4'],
      type: 'numeric',
      q: 'Cost of sales is £315,000 and the gross profit margin is 25%. What is the sales revenue?',
      answer: 420000, unit: '£',
      exp: 'A 25% margin leaves cost of sales at 75% of revenue, so revenue = £315,000 ÷ 0.75 = £420,000. Gross profit is then £105,000, which is 25% of £420,000 as required.',
    },
    {
      id: 'F-8-26', unitKey: 'faps', lo: 8, criteria: ['FAPS-8.2.3'],
      type: 'picklist',
      q: 'For each ratio, does a higher figure mean better or worse performance?',
      picklist: {
        title: 'Direction of travel', rowHeader: 'Ratio', choiceHeader: 'A higher figure is',
        options: ['Better', 'Worse'],
        rows: [
          { text: 'Gross profit margin', answer: 0 },
          { text: 'Return on capital employed', answer: 0 },
          { text: 'Expenses as a percentage of revenue', answer: 1 },
          { text: 'Net profit margin', answer: 0 },
          { text: 'Cost of sales as a percentage of revenue', answer: 1 },
        ],
      },
      exp: 'The three profit ratios improve as they rise: more kept from each pound of sales, or more earned on the funding. The two expense ratios are costs, so a rise means more of every pound being consumed and the business keeping less.',
    },

    /* ── Outcome 9 · incomplete records ───────────────────────────────────── */
    {
      id: 'F-9-01', unitKey: 'faps', lo: 9, criteria: ['FAPS-9.1.1'],
      type: 'numeric',
      q: 'Opening capital was £48,000 and closing capital £61,000. The owner withdrew £19,000 during the year and introduced nothing. What was the profit for the year?',
      answer: 32000, unit: '£',
      exp: 'Profit = closing capital − opening capital + drawings = £61,000 − £48,000 + £19,000 = £32,000. Capital rose only £13,000, but £19,000 was taken out along the way and had to be earned first.',
    },
    {
      id: 'F-9-02', unitKey: 'faps', lo: 9, criteria: ['FAPS-9.1.1'],
      type: 'numeric',
      q: 'Opening capital was £55,000 and closing capital £74,000. Drawings were £22,000 and the owner introduced £9,000 of personal savings. What was the profit for the year?',
      answer: 32000, unit: '£',
      exp: 'Profit = £74,000 − £55,000 + £22,000 − £9,000 = £32,000. The drawings are added back because they reduced capital without being a cost; the capital introduced is deducted because it raised capital without being earned.',
    },
    {
      id: 'F-9-03', unitKey: 'faps', lo: 9, criteria: ['FAPS-9.1.1'],
      type: 'numeric',
      q: 'A business held assets of £88,000 and owed £31,000 at the year end. What was its closing capital?',
      answer: 57000, unit: '£',
      exp: 'Capital = assets − liabilities = £88,000 − £31,000 = £57,000. This holds whether or not a capital account was ever written up, which is what makes the capital-comparison method work on records that do not exist.',
    },
    {
      id: 'F-9-04', unitKey: 'faps', lo: 9, criteria: ['FAPS-9.1.1'],
      type: 'numeric',
      q: 'Opening receivables were £22,400 and closing receivables £26,100. Receipts from credit customers were £186,300, discounts allowed £800 and £1,400 was written off as irrecoverable. What were the credit sales?',
      answer: 192200, unit: '£',
      exp: 'Credit sales = closing + receipts + discounts + write-offs − opening = £26,100 + £186,300 + £800 + £1,400 − £22,400 = £192,200. Everything that cleared a customer balance is added back, because it must have been sold before it could be cleared.',
    },
    {
      id: 'F-9-05', unitKey: 'faps', lo: 9, criteria: ['FAPS-9.1.1'],
      type: 'numeric',
      q: 'Opening payables were £16,700 and closing payables £14,900. The business paid suppliers £128,400 and received £600 of settlement discounts. What were the credit purchases?',
      answer: 127200, unit: '£',
      exp: 'Credit purchases = £14,900 + £128,400 + £600 − £16,700 = £127,200. Payables fell over the year, so the business paid for slightly more than it bought.',
    },
    {
      id: 'F-9-06', unitKey: 'faps', lo: 9, criteria: ['FAPS-9.2.1'],
      type: 'mcq',
      q: 'What distinguishes mark-up from margin?',
      opts: ['Mark-up is a percentage of cost, margin is a percentage of sales', 'Mark-up is a percentage of sales, margin is a percentage of cost', 'Mark-up includes VAT and margin excludes it', 'Mark-up applies to services and margin to goods'],
      ans: 0,
      exp: 'Both express the same gross profit; only the base differs. Mark-up divides by cost of sales and margin by the larger sales figure, which is why the mark-up percentage is always the higher of the two.',
    },
    {
      id: 'F-9-07', unitKey: 'faps', lo: 9, criteria: ['FAPS-9.2.3'],
      type: 'numeric',
      q: 'Opening inventory was £21,000, purchases £158,000 and closing inventory £24,500. What was the cost of sales?',
      answer: 154500, unit: '£',
      exp: 'Cost of sales = £21,000 + £158,000 − £24,500 = £154,500. Only goods that left the business are a cost; what is still on the shelf at the year end is an asset and comes back out.',
    },
    {
      id: 'F-9-08', unitKey: 'faps', lo: 9, criteria: ['FAPS-9.2.3'],
      type: 'numeric',
      q: 'Cost of sales was £96,000, opening inventory £12,500 and closing inventory £15,300. What were the purchases?',
      answer: 98800, unit: '£',
      exp: 'Rearranging the cost of sales calculation: purchases = cost of sales − opening inventory + closing inventory = £96,000 − £12,500 + £15,300 = £98,800. Inventory rose by £2,800, so more was bought than sold.',
    },
    {
      id: 'F-9-09', unitKey: 'faps', lo: 9, criteria: ['FAPS-9.2.2'],
      type: 'numeric',
      q: 'Goods costing £84,000 are sold at a mark-up of 25%. What are the sales?',
      answer: 105000, unit: '£',
      exp: 'The mark-up is a percentage of cost: gross profit = £84,000 × 25% = £21,000, so sales = £84,000 + £21,000 = £105,000. Applying the 25% to the sales figure instead is the standard error and would understate the answer.',
    },
    {
      id: 'F-9-10', unitKey: 'faps', lo: 9, criteria: ['FAPS-9.2.2'],
      type: 'numeric',
      q: 'Sales were £220,000 and the business works to a gross profit margin of 35%. What was the cost of sales?',
      answer: 143000, unit: '£',
      exp: 'The margin is a share of sales: gross profit = £220,000 × 35% = £77,000, so cost of sales = £220,000 − £77,000 = £143,000. Cost of sales is the remaining 65% of revenue.',
    },
    {
      id: 'F-9-11', unitKey: 'faps', lo: 9, criteria: ['FAPS-9.2.2', 'FAPS-9.2.3'],
      type: 'numeric',
      q: 'Opening inventory was £16,000, purchases £119,000 and closing inventory £15,000. The business marks all goods up by 30%. What were the sales?',
      answer: 156000, unit: '£',
      exp: 'Cost of sales = £16,000 + £119,000 − £15,000 = £120,000. Gross profit = £120,000 × 30% = £36,000, so sales = £120,000 + £36,000 = £156,000.',
    },
    {
      id: 'F-9-12', unitKey: 'faps', lo: 9, criteria: ['FAPS-9.3.1'],
      type: 'mcq',
      q: 'A reconstruction produces a closing cash balance of negative £600. What does that indicate?',
      opts: ['A receipt has been omitted or a payment counted twice', 'The business traded at a loss', 'The owner withdrew too much', 'The bank account is overdrawn'],
      ans: 0,
      exp: 'A cash balance cannot fall below zero — the business cannot physically hold less than no money. It is a signal that the working is incomplete, and says nothing directly about profit, drawings or the bank account.',
    },
    {
      id: 'F-9-13', unitKey: 'faps', lo: 9, criteria: ['FAPS-9.3.2'],
      type: 'truefalse',
      q: 'A reconstructed cash figure is higher than the cash actually counted. Identify whether each could explain the difference.',
      statements: [
        { text: 'The owner took cash drawings and did not record them.', answer: true },
        { text: 'Expenses were paid out of takings before the money was banked.', answer: true },
        { text: 'The bank charged interest on the business overdraft.', answer: false },
        { text: 'Closing inventory was overstated.', answer: false },
      ],
      exp: 'Both unrecorded drawings and expenses paid straight out of the till remove cash the reconstruction never knew had gone. Bank interest never touches the till, and inventory is a separate valuation that does not enter the cash count at all.',
    },
    {
      id: 'F-9-14', unitKey: 'faps', lo: 9, criteria: ['FAPS-9.1.1'],
      type: 'entrygrid',
      q: 'A receivables ledger control account is being reconstructed. Opening receivables were £19,800, receipts from customers £142,500, discounts allowed £700 and closing receivables £23,400. Enter the four known figures on the correct sides.',
      entrygrid: {
        title: 'Receivables ledger control account', rowHeader: 'Item', columns: ['Debit £', 'Credit £'],
        rows: [
          { label: 'Balance brought down', col: 0, amount: 19800 },
          { label: 'Receipts from customers', col: 1, amount: 142500 },
          { label: 'Discounts allowed', col: 1, amount: 700 },
          { label: 'Balance carried down', col: 1, amount: 23400 },
          { label: 'Credit sales (the missing figure)', col: 0, amount: 146800 },
        ],
      },
      exp: 'What customers owe is an asset, so the opening balance and the credit sales are debits, while everything that clears the debt — receipts, discounts allowed and the balance carried down — sits on the credit side. Credit sales is the balancing figure: £23,400 + £142,500 + £700 − £19,800 = £146,800, and the account then totals £166,600 each way.',
    },
    {
      id: 'F-9-15', unitKey: 'faps', lo: 9, criteria: ['FAPS-9.1.1'],
      type: 'numeric',
      q: 'A VAT control account shows an opening balance owed to HMRC of £3,800, output tax of £37,200 and input tax of £26,400. The closing balance owed is £4,600. How much was paid to HMRC during the year?',
      answer: 10000, unit: '£',
      exp: 'Paid = opening + output tax − input tax − closing = £3,800 + £37,200 − £26,400 − £4,600 = £10,000. Output tax increases what is owed and input tax reduces it; the payment is whatever makes the account close on the stated balance.',
    },
    {
      id: 'F-9-16', unitKey: 'faps', lo: 9, criteria: ['FAPS-9.3.3'],
      type: 'mcq',
      q: 'A business keeps its records in accounting software and the year-end reports reconcile. What does that establish?',
      opts: ['That the software has added up what was entered correctly', 'That every transaction has been recorded', 'That the figures are suitable for the financial statements', 'That no transaction has been posted to the wrong account'],
      ans: 0,
      exp: 'Reconciliation is a test of internal consistency, not of completeness or accuracy. A transaction never entered, or entered against the wrong account, leaves the reports reconciling perfectly — which is why software output still has to be checked against something independent.',
    },
    {
      id: 'F-9-17', unitKey: 'faps', lo: 9, criteria: ['FAPS-9.3.4'],
      type: 'truefalse',
      q: 'Identify whether each statement about professional scepticism is correct.',
      statements: [
        { text: 'It means keeping a questioning mind about the information provided.', answer: true },
        { text: 'It means assuming the client has something to hide.', answer: false },
        { text: 'It includes corroborating an explanation against independent evidence.', answer: true },
        { text: 'It can be set aside once a client has been known for several years.', answer: false },
      ],
      exp: 'Scepticism is a questioning attitude, not an accusation, and a long relationship makes it more important rather than less — familiarity is exactly the condition under which explanations stop being tested.',
    },
    {
      id: 'F-9-18', unitKey: 'faps', lo: 9, criteria: ['FAPS-9.2.2'],
      type: 'numeric',
      q: 'A business sells goods at a margin of 40%. Sales were £185,000. What was the gross profit?',
      answer: 74000, unit: '£',
      exp: 'The margin is a percentage of sales, so gross profit = £185,000 × 40% = £74,000 and cost of sales is the remaining £111,000. Treating 40% as a mark-up on cost instead would give a different and smaller gross profit.',
    },
    {
      id: 'F-9-19', unitKey: 'faps', lo: 9, criteria: ['FAPS-9.1.1'],
      type: 'numeric',
      q: 'A trader banks £164,000 of takings. Expenses of £9,400 were paid out of the till before banking and the owner took £11,200 in cash drawings. Cash held rose by £300 over the year. What were the total cash sales?',
      answer: 184900, unit: '£',
      exp: 'Everything that left the till plus the increase in what remains must equal what came in: £164,000 banked + £9,400 expenses + £11,200 drawings + £300 increase in cash held = £184,900. Cash paid out before banking is the reason takings are almost never the same as the amount deposited.',
    },
    {
      id: 'F-9-20', unitKey: 'faps', lo: 9, criteria: ['FAPS-9.3.1'],
      type: 'mcq',
      q: 'A sole trader\'s reconstructed accounts show drawings of £3,200 for the year. Why would an accountant question this?',
      opts: ['It is unlikely to be enough for the owner to live on', 'It is too large a proportion of profit', 'Drawings should not appear in incomplete records', 'Drawings cannot be calculated without a cash book'],
      ans: 0,
      exp: 'A sole trader normally lives on the drawings, so a figure that could not support a household suggests cash was taken and never recorded. Testing a balancing figure against what you know about the business is the whole point of the reasonableness check.',
    },
    {
      id: 'F-9-21', unitKey: 'faps', lo: 9, criteria: ['FAPS-9.2.1'],
      type: 'gapfill',
      q: 'Complete the conversion between the two percentages.',
      template: 'Goods costing £100 sold at a mark-up of 25% have a selling price of £{0}, a gross profit of £{1}, and therefore a margin of {2}.',
      gaps: [
        { options: ['125', '133', '120'], answer: 0 },
        { options: ['25', '33', '20'], answer: 0 },
        { options: ['20%', '25%', '33.3%'], answer: 0 },
      ],
      exp: 'Setting cost at 100 makes the conversion arithmetic: a 25% mark-up adds £25, giving a price of £125, and that same £25 against the £125 selling price is a margin of 20%. A 25% mark-up is always a 20% margin.',
    },
    {
      id: 'F-9-22', unitKey: 'faps', lo: 9, criteria: ['FAPS-9.2.3'],
      type: 'numeric',
      q: 'Opening inventory was £27,000 and purchases £142,000. The business works to a margin of 25% and sales were £180,000. What was the closing inventory?',
      answer: 34000, unit: '£',
      exp: 'A 25% margin makes cost of sales 75% of sales: £180,000 × 75% = £135,000. Closing inventory = opening inventory + purchases − cost of sales = £27,000 + £142,000 − £135,000 = £34,000. This is the shape an insurance claim for destroyed inventory takes.',
    },
    {
      id: 'F-9-23', unitKey: 'faps', lo: 9, criteria: ['FAPS-9.1.1'],
      type: 'picklist',
      q: 'Which account would you reconstruct to find each missing figure?',
      picklist: {
        title: 'Finding the figure', rowHeader: 'Missing figure', choiceHeader: 'Reconstruct',
        options: ['Receivables ledger control account', 'Payables ledger control account', 'VAT control account', 'Cash account'],
        rows: [
          { text: 'Credit sales for the year', answer: 0 },
          { text: 'Amount paid over to HMRC', answer: 2 },
          { text: 'Credit purchases for the year', answer: 1 },
          { text: 'Cash takings before banking', answer: 3 },
          { text: 'Discounts received not yet totalled', answer: 1 },
          { text: 'Irrecoverable debts written off', answer: 0 },
        ],
      },
      exp: 'Each figure passes through exactly one account, and naming it is most of the work. Customer transactions — sales, receipts, write-offs, discounts allowed — all run through the receivables control; supplier transactions run through the payables control; tax through the VAT control; and physical money through the cash account.',
    },
    {
      id: 'F-9-24', unitKey: 'faps', lo: 9, criteria: ['FAPS-9.1.1'],
      type: 'mcq',
      q: 'Sales in a VAT-registered business are recorded in the receivables ledger control account at which amount?',
      opts: ['The gross amount including VAT', 'The net amount excluding VAT', 'The VAT only', 'Whichever the trader prefers'],
      ans: 0,
      exp: 'The customer owes the whole invoice, so the control account carries the gross. The statement of profit or loss then reports the net, because the VAT was never the business\'s revenue. Mixing the two is the commonest error in reconstructing sales from receivables.',
    },
    {
      id: 'F-9-25', unitKey: 'faps', lo: 9, criteria: ['FAPS-9.3.2'],
      type: 'truefalse',
      q: 'Identify whether each explanation for a difference between calculated and actual cash is plausible.',
      statements: [
        { text: 'Goods were taken by the owner for personal use.', answer: true },
        { text: 'Invoices were issued to credit customers during the year.', answer: false },
        { text: 'Takings were banked after the cash was counted.', answer: true },
        { text: 'Cash was stolen.', answer: true },
      ],
      exp: 'Goods taken for own use, timing between the count and the banking, and theft all move the two figures apart. Credit sales do not: no cash changes hands when the invoice is issued, so nothing about them reaches the till either way.',
    },
    {
      id: 'F-9-26', unitKey: 'faps', lo: 9, criteria: ['FAPS-9.1.1'],
      type: 'numeric',
      q: 'Opening receivables were £30,200 and closing receivables £26,800. Credit sales for the year were £198,000 and £900 was written off as irrecoverable. What did customers pay during the year?',
      answer: 200500, unit: '£',
      exp: 'Receipts = opening + credit sales − write-offs − closing = £30,200 + £198,000 − £900 − £26,800 = £200,500. The same account with a different unknown: everything that entered the balance, less what was removed by other means, less what is still outstanding.',
    },

    /* ── Outcome 1 · principles ───────────────────────────────────────────── */
    {
      id: 'F-1-11', unitKey: 'faps', lo: 1, criteria: ['FAPS-1.3.1'],
      type: 'mcq',
      q: 'Which pair are the fundamental qualitative characteristics of useful financial information?',
      opts: ['Relevance and faithful representation', 'Comparability and timeliness', 'Verifiability and understandability', 'Prudence and consistency'],
      ans: 0,
      exp: 'Relevance and faithful representation are the two fundamental characteristics — information has to matter to a decision and has to depict what it claims to. Comparability, verifiability, timeliness and understandability are the four enhancing characteristics, which improve information that is already relevant and faithful.',
    },
    {
      id: 'F-1-12', unitKey: 'faps', lo: 1, criteria: ['FAPS-1.3.2'],
      type: 'picklist',
      q: 'Classify each qualitative characteristic.',
      picklist: {
        title: 'Qualities of useful information', rowHeader: 'Characteristic', choiceHeader: 'Type',
        options: ['Fundamental', 'Enhancing'],
        rows: [
          { text: 'Relevance', answer: 0 },
          { text: 'Comparability', answer: 1 },
          { text: 'Faithful representation', answer: 0 },
          { text: 'Timeliness', answer: 1 },
          { text: 'Verifiability', answer: 1 },
        ],
      },
      exp: 'There are only two fundamental characteristics — relevance and faithful representation — and information that lacks either is not useful at all. The four enhancing characteristics make useful information more useful; they cannot rescue information that was never relevant.',
    },
    {
      id: 'F-1-13', unitKey: 'faps', lo: 1, criteria: ['FAPS-1.3.4'],
      type: 'truefalse',
      q: 'Identify whether each statement about the accountant\'s ethical principles is correct.',
      statements: [
        { text: 'Objectivity means not letting bias or undue influence override professional judgement.', answer: true },
        { text: 'Integrity means being straightforward and honest in professional relationships.', answer: true },
        { text: 'Professional scepticism means assuming the figures presented are wrong.', answer: false },
        { text: 'Confidentiality prevents disclosure of client information without proper authority.', answer: true },
      ],
      exp: 'Scepticism is a questioning mind, not a presumption of error — it means not treating a presentation as evidence, while remaining open to the possibility that the figures are perfectly correct. The other three are stated as the fundamental principles define them.',
    },

    /* ── Outcome 2 · advanced double entry ────────────────────────────────── */
    {
      id: 'F-2-20', unitKey: 'faps', lo: 2, criteria: ['FAPS-2.1.3'],
      type: 'numeric',
      q: 'A business holds assets of £128,400 and owes £47,900. What is its capital?',
      answer: 80500, unit: '£',
      exp: 'Capital = assets − liabilities = £128,400 − £47,900 = £80,500. Capital is the residual: what the books say would be left for the owner once every outside claim had been met.',
    },
    {
      id: 'F-2-21', unitKey: 'faps', lo: 2, criteria: ['FAPS-2.1.2'],
      type: 'mcq',
      q: 'A business buys inventory on credit for £3,000. What happens to the accounting equation?',
      opts: ['Assets rise £3,000 and liabilities rise £3,000', 'Assets rise £3,000 and capital rises £3,000', 'Assets fall £3,000 and liabilities fall £3,000', 'Capital falls £3,000 and liabilities rise £3,000'],
      ans: 0,
      exp: 'The business owns £3,000 more inventory and owes £3,000 more to a supplier. Both sides of the equation rise by the same amount, so it still balances and the owner\'s claim is untouched — buying on credit does not make anybody better or worse off.',
    },
    {
      id: 'F-2-22', unitKey: 'faps', lo: 2, criteria: ['FAPS-2.2.1'],
      type: 'picklist',
      q: 'Which classification does each of these ledger accounts take?',
      picklist: {
        title: 'General ledger accounts', rowHeader: 'Account', choiceHeader: 'Classification',
        options: ['Asset', 'Liability', 'Income', 'Expense', 'Capital'],
        rows: [
          { text: 'Office equipment at cost', answer: 0 },
          { text: 'Rent payable', answer: 3 },
          { text: 'Sales', answer: 2 },
          { text: 'Drawings', answer: 4 },
          { text: 'Prepayments', answer: 0 },
          { text: 'Accruals', answer: 1 },
        ],
      },
      exp: 'A prepayment is money paid for a benefit not yet received, so the business is owed something — an asset. An accrual is a benefit received but not yet paid for, so the business owes — a liability. Drawings sit with capital because the owner is taking back their own claim rather than incurring a cost of trading.',
    },
    {
      id: 'F-2-23', unitKey: 'faps', lo: 2, criteria: ['FAPS-2.3.4'],
      type: 'mcq',
      q: 'Where is the individual account of a credit customer kept?',
      opts: ['In the memorandum sales ledger', 'In the general ledger', 'In the sales daybook', 'In the trial balance'],
      ans: 0,
      exp: 'The individual customer accounts are memorandum records in the subsidiary sales ledger and are not part of the double entry. The general ledger holds the receivables control account, whose balance should equal the total of all the memorandum accounts.',
    },
    {
      id: 'F-2-24', unitKey: 'faps', lo: 2, criteria: ['FAPS-2.3.5'],
      type: 'numeric',
      q: 'A receivables control account shows £84,600. The list of individual customer balances totals £84,150. A credit note for £450 was entered in the control account but not in the customer\'s memorandum account. What is the corrected total of the individual balances?',
      answer: 83700, unit: '£',
      exp: 'The credit note reduces what the customer owes, so the memorandum account is £450 too high: £84,150 − £450 = £83,700. That does not yet agree with the control account, which tells you at least one further difference remains to be found — a reconciliation is not finished because one error has been explained.',
    },
    {
      id: 'F-2-25', unitKey: 'faps', lo: 2, criteria: ['FAPS-2.3.1', 'FAPS-2.3.2'],
      type: 'picklist',
      q: 'Which daybook records each document?',
      picklist: {
        title: 'Books of prime entry', rowHeader: 'Document', choiceHeader: 'Daybook',
        options: ['Sales daybook', 'Sales returns daybook', 'Purchases daybook', 'Purchases returns daybook', 'Discounts allowed daybook'],
        rows: [
          { text: 'An invoice raised for a credit customer', answer: 0 },
          { text: 'A credit note received from a supplier', answer: 3 },
          { text: 'An invoice received from a supplier', answer: 2 },
          { text: 'A settlement discount given to a customer', answer: 4 },
          { text: 'A credit note issued to a customer', answer: 1 },
        ],
      },
      exp: 'The test for a credit note is who issued it: one the business sends cancels its own sale and belongs in the sales returns daybook, while one received cancels a purchase. Settlement discounts given to customers have a daybook of their own rather than being netted off the sales figure.',
    },
    {
      id: 'F-2-26', unitKey: 'faps', lo: 2, criteria: ['FAPS-2.4.1', 'FAPS-2.4.4'],
      type: 'truefalse',
      q: 'Identify whether each statement about balancing off at the period end is correct.',
      statements: [
        { text: 'Income and expense accounts are transferred to the profit and loss account and start the next period at nil.', answer: true },
        { text: 'Asset and liability accounts carry their balances down into the next period.', answer: true },
        { text: 'The drawings account is carried down like an asset.', answer: false },
        { text: 'A capital account carries its balance down into the next period.', answer: true },
      ],
      exp: 'Income and expenses measure a period, so they are cleared to profit and loss and begin again at nil. Assets, liabilities and capital measure a position at a date, so they carry down. Drawings belong to the period too and are transferred to capital at the year end rather than carried forward.',
    },
    {
      id: 'F-2-27', unitKey: 'faps', lo: 2, criteria: ['FAPS-2.4.5'],
      type: 'mcq',
      q: 'A purchase invoice arrives for goods the business has no record of ordering or receiving. What should happen before it is posted?',
      opts: ['The transaction is queried and its validity established', 'It is posted and reversed if the supplier complains', 'It is posted to suspense until the year end', 'It is paid to preserve the supplier relationship'],
      ans: 0,
      exp: 'Only genuine and valid transactions belong in the records. An invoice with no order and no goods received note may be a duplicate, a mistake or a fraud, and posting it first and asking afterwards puts a liability in the accounts that may not exist.',
    },
    {
      id: 'F-2-28', unitKey: 'faps', lo: 2, criteria: ['FAPS-2.3.3'],
      type: 'numeric',
      q: 'A sales daybook shows net sales of £14,500 for the month. VAT is charged at 20%. What amount is debited to the receivables ledger control account?',
      answer: 17400, unit: '£',
      exp: 'Customers owe the gross: £14,500 + (£14,500 × 20% = £2,900) = £17,400. The £14,500 is credited to sales and the £2,900 to VAT, so the entry balances at £17,400 each way.',
    },
    {
      id: 'F-2-29', unitKey: 'faps', lo: 2, criteria: ['FAPS-2.3.6', 'FAPS-2.4.2'],
      type: 'truefalse',
      q: 'Identify whether each statement about accounting software is correct.',
      statements: [
        { text: 'Software can post daybook totals to the control accounts automatically.', answer: true },
        { text: 'Software can run the period end routine automatically.', answer: true },
        { text: 'Automatic posting removes the need to check that transactions are valid.', answer: false },
        { text: 'A reconciliation produced by software proves the underlying entries were correct.', answer: false },
      ],
      exp: 'Automation moves data quickly and moves wrong data just as quickly. It handles the posting and the routine; deciding whether a transaction should have been entered at all, and whether what was entered was right, stays with the bookkeeper.',
    },

    /* ── Outcome 3 · non-current assets ───────────────────────────────────── */
    {
      id: 'F-3-11', unitKey: 'faps', lo: 3, criteria: ['FAPS-3.2.3'],
      type: 'numeric',
      q: 'A machine has a list price of £46,000, delivery costs £1,400, installation £2,600 and a first-year maintenance contract of £900. The business is VAT registered and all figures are net. What amount is capitalised?',
      answer: 50000, unit: '£',
      exp: 'Cost includes everything needed to bring the asset to the location and condition for use: £46,000 + £1,400 + £2,600 = £50,000. The maintenance contract is a service consumed over the year and is revenue expenditure, so it goes to the statement of profit or loss.',
    },
    {
      id: 'F-3-12', unitKey: 'faps', lo: 3, criteria: ['FAPS-3.2.7'],
      type: 'picklist',
      q: 'Classify each item of expenditure on a delivery van.',
      picklist: {
        title: 'Expenditure on a van', rowHeader: 'Item', choiceHeader: 'Classification',
        options: ['Capital expenditure', 'Revenue expenditure'],
        rows: [
          { text: 'The purchase price of the van', answer: 0 },
          { text: 'Signwriting the business name on the side when new', answer: 0 },
          { text: 'Road tax for the first year', answer: 1 },
          { text: 'Replacing a windscreen after a stone chip', answer: 1 },
          { text: 'Fitting a refrigeration unit that the business needs to trade', answer: 0 },
          { text: 'Fuel', answer: 1 },
        ],
      },
      exp: 'Capital expenditure brings the asset into the condition needed for use or enhances what it can do; revenue expenditure keeps it running. Signwriting and the refrigeration unit change what the van is; tax, fuel and a replacement windscreen simply keep it on the road.',
    },
    {
      id: 'F-3-13', unitKey: 'faps', lo: 3, criteria: ['FAPS-3.2.2'],
      type: 'gapfill',
      q: 'Complete the definitions used for non-current assets.',
      template: 'The {0} is the cost of an asset less its residual value. The {1} is cost less accumulated depreciation. The {2} is the period over which the asset is expected to be available for use.',
      gaps: [
        { options: ['depreciable amount', 'carrying amount', 'residual value'], answer: 0 },
        { options: ['carrying amount', 'depreciable amount', 'cost'], answer: 0 },
        { options: ['useful life', 'accounting period', 'depreciation charge'], answer: 0 },
      ],
      exp: 'The depreciable amount is what will actually be charged away over the asset\'s life; the carrying amount is what is left on the statement of financial position at any date. The two are different figures and questions rely on the distinction.',
    },
    {
      id: 'F-3-14', unitKey: 'faps', lo: 3, criteria: ['FAPS-3.2.5'],
      type: 'mcq',
      q: 'A business has a capitalisation policy of £500. It buys a printer for £380. How is the printer treated?',
      opts: ['Charged to profit or loss as revenue expenditure', 'Capitalised and depreciated over its useful life', 'Capitalised but not depreciated', 'Recorded in the asset register but not in the ledger'],
      ans: 0,
      exp: 'Expenditure below the policy threshold is expensed even though the printer will last several years. The threshold exists because tracking and depreciating small items costs more than the accuracy it buys — a materiality judgement the business makes once and applies consistently.',
    },
    {
      id: 'F-3-15', unitKey: 'faps', lo: 3, criteria: ['FAPS-3.2.6'],
      type: 'truefalse',
      q: 'A repair costing £4,000 is wrongly capitalised. Identify whether each consequence follows.',
      statements: [
        { text: 'Profit for the year is overstated.', answer: true },
        { text: 'Non-current assets are overstated.', answer: true },
        { text: 'The error will be found by the trial balance.', answer: false },
        { text: 'Depreciation for future years will be overstated.', answer: true },
      ],
      exp: 'The £4,000 stays on the statement of financial position instead of reducing profit, so both profit and assets are too high. The entry still balances, so the trial balance agrees — this is an error of principle. And the inflated asset is depreciated in later years, spreading the error forward.',
    },
    {
      id: 'F-3-16', unitKey: 'faps', lo: 3, criteria: ['FAPS-3.3.8'],
      type: 'numeric',
      q: 'A VAT-registered business buys a machine for £24,000 plus VAT at 20%. What amount is recorded in the machinery at cost account?',
      answer: 24000, unit: '£',
      exp: 'A VAT-registered business reclaims the input tax, so only the net £24,000 is capitalised and the £4,800 of VAT is debited to the VAT control account. A business that could not reclaim it would capitalise the full £28,800, because for that business the tax is genuinely part of what the machine cost.',
    },
    {
      id: 'F-3-17', unitKey: 'faps', lo: 3, criteria: ['FAPS-3.3.2'],
      type: 'mcq',
      q: 'A disposals account is left with a credit balance after an asset is sold. What does that represent?',
      opts: ['A gain on disposal', 'A loss on disposal', 'The carrying amount of the asset', 'Depreciation not yet charged'],
      ans: 0,
      exp: 'The disposals account is debited with the cost and credited with the accumulated depreciation and the proceeds. A credit balance means the proceeds and depreciation together exceeded the cost, so the asset was sold for more than its carrying amount — a gain, which is credited to profit or loss.',
    },
    {
      id: 'F-3-18', unitKey: 'faps', lo: 3, criteria: ['FAPS-3.3.7'],
      type: 'numeric',
      q: 'A machine cost £30,000 and has accumulated depreciation of £22,000. It is sold for £5,500. What is the loss on disposal?',
      answer: 2500, unit: '£',
      exp: 'Carrying amount = £30,000 − £22,000 = £8,000. Proceeds of £5,500 are £2,500 below that, so there is a loss of £2,500. A loss on disposal means depreciation charged over the asset\'s life turned out to have been too little.',
    },
    {
      id: 'F-3-19', unitKey: 'faps', lo: 3, criteria: ['FAPS-3.3.3', 'FAPS-3.3.7'],
      type: 'numeric',
      q: 'A van with a carrying amount of £7,200 is part-exchanged against a new van costing £26,000. The part-exchange allowance is £8,000 and the balance is paid by bank transfer. What is the gain on disposal?',
      answer: 800, unit: '£',
      exp: 'The part-exchange allowance is the proceeds: £8,000 against a carrying amount of £7,200 gives a gain of £800. The £18,000 paid by transfer is the rest of the purchase price and has nothing to do with the disposal — a common trap is to net the two and lose the gain entirely.',
    },
    {
      id: 'F-3-20', unitKey: 'faps', lo: 3, criteria: ['FAPS-3.3.1'],
      type: 'truefalse',
      q: 'Identify whether each statement about the non-current asset register is correct.',
      statements: [
        { text: 'It supports physical verification of the assets the business owns.', answer: true },
        { text: 'It records each asset\'s cost, depreciation and carrying amount individually.', answer: true },
        { text: 'It forms part of the double entry.', answer: false },
        { text: 'It should be reconciled to the general ledger balances.', answer: true },
      ],
      exp: 'The register is a memorandum record: it carries the detail the general ledger cannot hold at asset level, and is reconciled against the ledger rather than posted to it. A difference between the two means an acquisition, a disposal or a depreciation charge is recorded in one place and not the other.',
    },
    {
      id: 'F-3-21', unitKey: 'faps', lo: 3, criteria: ['FAPS-3.1.1', 'FAPS-3.1.2'],
      type: 'mcq',
      q: 'Why must capital expenditure be authorised before it is committed?',
      opts: ['The sums are large and commit the business for years', 'It is required by IAS 16', 'Otherwise VAT cannot be reclaimed', 'To ensure the asset register balances'],
      ans: 0,
      exp: 'Capital expenditure is generally large, hard to reverse and ties up funds that could have been used elsewhere, so it is authorised at a level in the organisation that can weigh those things — typically a director or budget holder rather than the person raising the order.',
    },
    {
      id: 'F-3-22', unitKey: 'faps', lo: 3, criteria: ['FAPS-3.3.5'],
      type: 'mcq',
      q: 'Where does a gain on disposal appear in the financial statements?',
      opts: ['As income in the statement of profit or loss', 'As an addition to non-current assets', 'As an increase in capital only', 'It is not reported separately'],
      ans: 0,
      exp: 'A gain on disposal is the correction of depreciation that turned out to be too generous, and it is reported as income in the statement of profit or loss for the period the asset was sold. It reaches capital only through profit, like every other item of income.',
    },
    {
      id: 'F-3-23', unitKey: 'faps', lo: 3, criteria: ['FAPS-3.2.4'],
      type: 'numeric',
      q: 'A building is bought for £180,000. Legal fees on purchase are £2,700, a survey costs £800 and the first year\'s buildings insurance is £1,900. What amount is capitalised?',
      answer: 183500, unit: '£',
      exp: 'Legal fees and the survey are costs of acquiring the building and are capitalised: £180,000 + £2,700 + £800 = £183,500. Insurance covers a period of use rather than acquisition, so it is revenue expenditure however necessary it is.',
    },
    {
      id: 'F-3-24', unitKey: 'faps', lo: 3, criteria: ['FAPS-3.3.6'],
      type: 'mcq',
      q: 'An asset is scrapped with no proceeds. What is recorded in the non-current asset register?',
      opts: ['The disposal date, with cost and accumulated depreciation removed', 'Nothing, because no money changed hands', 'The asset is left in place until the end of its useful life', 'Only the loss on disposal'],
      ans: 0,
      exp: 'The register must reflect what the business actually holds, so a scrapped asset is removed whether or not anything was received for it. Leaving it there would overstate what a physical verification should find and would keep charging depreciation on an asset that no longer exists.',
    },
    {
      id: 'F-3-25', unitKey: 'faps', lo: 3, criteria: ['FAPS-3.2.1'],
      type: 'mcq',
      q: 'Which standard governs the accounting treatment of property, plant and equipment?',
      opts: ['IAS 16', 'IAS 2', 'IAS 1', 'IAS 7'],
      ans: 0,
      exp: 'IAS 16 Property, Plant and Equipment sets out what may be included in cost, how depreciation is applied and how disposals are treated. IAS 2 deals with inventories, IAS 1 with presentation and IAS 7 with cash flow statements.',
    },
    {
      id: 'F-3-26', unitKey: 'faps', lo: 3, criteria: ['FAPS-3.3.4'],
      type: 'truefalse',
      q: 'Identify whether each statement about how the asset register is held is correct.',
      statements: [
        { text: 'It can be a module within accounting software.', answer: true },
        { text: 'It can be held independently on a spreadsheet.', answer: true },
        { text: 'A software register removes the need for physical verification.', answer: false },
        { text: 'A spreadsheet register still needs reconciling to the ledger.', answer: true },
      ],
      exp: 'The register can live anywhere; what it cannot do is tell you an asset is still there. Physical verification exists precisely because a record and a reality can diverge — through theft, damage or a disposal nobody recorded — and no amount of automation closes that gap.',
    },
    /* ── Outcome 4 · depreciation ─────────────────────────────────────────── */
    {
      id: 'F-4-11', unitKey: 'faps', lo: 4, criteria: ['FAPS-4.1.4'],
      type: 'numeric',
      q: 'A machine costs £48,000, has an estimated residual value of £6,000 and a useful life of seven years. What is the annual straight-line depreciation charge?',
      answer: 6000, unit: '£',
      exp: 'The depreciable amount is £48,000 − £6,000 = £42,000, spread evenly: £42,000 ÷ 7 = £6,000 a year. Forgetting the residual value would spread the whole £48,000 over the seven years and depreciate the asset below what it is expected to be worth at the end of them.',
    },
    {
      id: 'F-4-12', unitKey: 'faps', lo: 4, criteria: ['FAPS-4.1.4'],
      type: 'numeric',
      q: 'Equipment costs £27,500 with no residual value and a useful life of five years. What is the annual straight-line charge?',
      answer: 5500, unit: '£',
      exp: 'With no residual value the whole cost is the depreciable amount: £27,500 ÷ 5 = £5,500 a year. After five years the accumulated depreciation is £27,500 and the carrying amount is nil.',
    },
    {
      id: 'F-4-13', unitKey: 'faps', lo: 4, criteria: ['FAPS-4.1.5'],
      type: 'numeric',
      q: 'A van costs £40,000 and is depreciated at 25% on the diminishing balance. What is the charge in the second year of ownership?',
      answer: 7500, unit: '£',
      exp: 'Year one: £40,000 × 25% = £10,000, leaving a carrying amount of £30,000. Year two: £30,000 × 25% = £7,500. The rate is applied to what is left, not to the original cost, so the charge falls every year.',
    },
    {
      id: 'F-4-14', unitKey: 'faps', lo: 4, criteria: ['FAPS-4.1.5'],
      type: 'numeric',
      q: 'A van costs £40,000 and is depreciated at 25% on the diminishing balance. What is its carrying amount after three years?',
      answer: 16875, unit: '£',
      exp: 'Year one leaves £30,000, year two £22,500 and year three £22,500 − £5,625 = £16,875. A diminishing balance never reaches nil, which is why it suits assets that keep some value however long they are held.',
    },
    {
      id: 'F-4-15', unitKey: 'faps', lo: 4, criteria: ['FAPS-4.1.2'],
      type: 'mcq',
      q: 'Which depreciation method best matches an asset that loses most of its value in its early years?',
      opts: ['Diminishing balance', 'Straight line', 'Either method gives the same charge', 'Neither method may be used'],
      ans: 0,
      exp: 'The diminishing balance charges most in year one and less every year after, which matches an asset whose value falls fastest when new — a vehicle is the standard example. Straight line spreads the same amount over every year and suits assets used evenly.',
    },
    {
      id: 'F-4-16', unitKey: 'faps', lo: 4, criteria: ['FAPS-4.1.1'],
      type: 'truefalse',
      q: 'Identify whether each statement about what depreciation is for is correct.',
      statements: [
        { text: 'Depreciation applies the accruals principle by matching cost to the periods that benefit.', answer: true },
        { text: 'Depreciation sets money aside to replace the asset.', answer: false },
        { text: 'Depreciation is a non-cash charge.', answer: true },
        { text: 'Depreciation attempts to show the asset\'s market value.', answer: false },
      ],
      exp: 'Depreciation allocates a cost already incurred across the periods that use the asset. No money moves and no fund is created — a business wanting to replace an asset must save separately. And the carrying amount is cost less what has been charged away, which is not the same thing as what the asset would fetch.',
    },
    {
      id: 'F-4-17', unitKey: 'faps', lo: 4, criteria: ['FAPS-4.1.4'],
      type: 'numeric',
      q: 'Fixtures cost £60,000 and are depreciated at 20% per year on the straight-line basis. What is the annual charge?',
      answer: 12000, unit: '£',
      exp: 'A straight-line rate is applied to cost every year: £60,000 × 20% = £12,000. The asset is fully depreciated after five years, which is what a 20% straight-line rate means.',
    },
    {
      id: 'F-4-18', unitKey: 'faps', lo: 4, criteria: ['FAPS-4.2.1'],
      type: 'entrygrid',
      q: 'The depreciation charge on office equipment for the year is £4,300. Record the year-end journal.',
      entrygrid: {
        title: 'Journal', rowHeader: 'Account', columns: ['Debit £', 'Credit £'],
        rows: [
          { label: 'Depreciation charge', col: 0, amount: 4300 },
          { label: 'Accumulated depreciation — office equipment', col: 1, amount: 4300 },
        ],
      },
      exp: 'The charge is an expense of the year and is debited; the credit goes to accumulated depreciation rather than to the asset at cost, so the original cost stays visible on the face of the register and the statement of financial position shows both figures.',
    },
    {
      id: 'F-4-19', unitKey: 'faps', lo: 4, criteria: ['FAPS-4.1.4'],
      type: 'numeric',
      q: 'A machine costing £36,000 with no residual value and a four-year life is bought on 1 July. The year end is 31 December and the business charges depreciation monthly from the date of purchase. What is the charge for the year?',
      answer: 4500, unit: '£',
      exp: 'A full year would be £36,000 ÷ 4 = £9,000. The machine was owned for six of the twelve months, so the charge is £9,000 × 6/12 = £4,500. A business with a full-year policy instead would charge the whole £9,000 however late in the year the asset arrived.',
    },
    {
      id: 'F-4-20', unitKey: 'faps', lo: 4, criteria: ['FAPS-4.2.1'],
      type: 'mcq',
      q: 'Where does accumulated depreciation appear?',
      opts: ['Deducted from cost in the statement of financial position', 'As an expense in the statement of profit or loss', 'As a liability in the statement of financial position', 'It does not appear in the financial statements'],
      ans: 0,
      exp: 'Accumulated depreciation is every year\'s charge added together and is deducted from cost to give the carrying amount. Only this year\'s charge is an expense; treating the accumulated figure as one would report several years of cost in a single period.',
    },
    {
      id: 'F-4-21', unitKey: 'faps', lo: 4, criteria: ['FAPS-4.2.2'],
      type: 'numeric',
      q: 'The non-current asset register totals a carrying amount of £84,600. The general ledger shows cost of £142,000 and accumulated depreciation of £56,300. What is the difference to be investigated?',
      answer: 1100, unit: '£',
      exp: 'The ledger carrying amount is £142,000 − £56,300 = £85,700, against £84,600 in the register — a difference of £1,100. A gap like this usually means a disposal recorded in one place and not the other, or a depreciation charge posted to the ledger but never entered against the individual asset.',
    },
    {
      id: 'F-4-22', unitKey: 'faps', lo: 4, criteria: ['FAPS-4.1.3'],
      type: 'truefalse',
      q: 'Identify whether each statement about calculating depreciation is correct.',
      statements: [
        { text: 'Accounting software can calculate the charge automatically from the asset record.', answer: true },
        { text: 'Software selects the useful life and residual value on the business\'s behalf.', answer: false },
        { text: 'A charge produced by software should still be reviewed for reasonableness.', answer: true },
        { text: 'Depreciation can be calculated independently on a spreadsheet.', answer: true },
      ],
      exp: 'Software calculates but does not judge. The method, the useful life and the residual value are estimates the business makes and can get wrong, and a wrong estimate produces a wrong charge perfectly quickly — which is why a figure the system produced still has to be looked at.',
    },
    {
      id: 'F-4-23', unitKey: 'faps', lo: 4, criteria: ['FAPS-4.1.4'],
      type: 'numeric',
      q: 'A machine cost £52,000 with a residual value of £4,000 and an eight-year life, depreciated on the straight line. What is its carrying amount after three years?',
      answer: 34000, unit: '£',
      exp: 'The annual charge is (£52,000 − £4,000) ÷ 8 = £6,000, so three years accumulate £18,000. Carrying amount = £52,000 − £18,000 = £34,000, which is still well above the £4,000 residual value the asset is expected to reach after eight.',
    },
    {
      id: 'F-4-24', unitKey: 'faps', lo: 4, criteria: ['FAPS-4.1.4', 'FAPS-4.1.5'],
      type: 'picklist',
      q: 'Which method does each description fit?',
      picklist: {
        title: 'Depreciation methods', rowHeader: 'Description', choiceHeader: 'Method',
        options: ['Straight line', 'Diminishing balance'],
        rows: [
          { text: 'The same charge every year', answer: 0 },
          { text: 'The residual value is deducted before the calculation', answer: 0 },
          { text: 'The rate is applied to the carrying amount', answer: 1 },
          { text: 'The charge falls each year', answer: 1 },
          { text: 'The asset can be fully written off by the end of its life', answer: 0 },
        ],
      },
      exp: 'Straight line takes the residual off first and divides what is left evenly, so it can reach nil exactly. Diminishing balance applies a percentage to whatever is left each year, so the charge shrinks and the carrying amount approaches but never reaches zero.',
    },
    {
      id: 'F-4-25', unitKey: 'faps', lo: 4, criteria: ['FAPS-4.1.2'],
      type: 'mcq',
      q: 'What is the depreciable amount of an asset costing £18,000 with an expected residual value of £3,000?',
      opts: ['£15,000', '£18,000', '£3,000', '£21,000'],
      ans: 0,
      exp: 'The depreciable amount is cost less residual value: £18,000 − £3,000 = £15,000. That is the part of the cost the business expects to consume; the £3,000 is expected to be recovered when the asset is sold and is not charged away.',
    },
    {
      id: 'F-4-26', unitKey: 'faps', lo: 4, criteria: ['FAPS-4.2.1'],
      type: 'mcq',
      q: 'Which account is credited with the annual depreciation charge?',
      opts: ['Accumulated depreciation', 'The asset at cost', 'Disposals', 'Capital'],
      ans: 0,
      exp: 'The credit goes to accumulated depreciation, a separate account that builds up year on year. Crediting the asset at cost would erase the original cost from the records and make the register impossible to reconcile.',
    },

    /* ── Outcome 5 · period end adjustments ───────────────────────────────── */
    {
      id: 'F-5-20', unitKey: 'faps', lo: 5, criteria: ['FAPS-5.1.6'],
      type: 'numeric',
      q: 'Insurance of £7,200 was paid on 1 October for the twelve months to the following 30 September. The year end is 31 December. What is the prepayment at the year end?',
      answer: 5400, unit: '£',
      exp: 'Nine of the twelve months fall after the year end: £7,200 × 9/12 = £5,400. That is a benefit paid for and not yet received, so it is an asset at the year end and comes out of this year\'s expense.',
    },
    {
      id: 'F-5-21', unitKey: 'faps', lo: 5, criteria: ['FAPS-5.1.6'],
      type: 'numeric',
      q: 'A business pays rent of £2,400 a quarter in arrears. At the 31 December year end the quarter to 31 January has not been paid. What accrual is needed at the year end?',
      answer: 1600, unit: '£',
      exp: 'Two of the three months of that quarter — November and December — fall in this year: £2,400 × 2/3 = £1,600. The benefit has been received and not paid for, so it is a liability and is added to this year\'s expense.',
    },
    {
      id: 'F-5-22', unitKey: 'faps', lo: 5, criteria: ['FAPS-5.1.4'],
      type: 'picklist',
      q: 'Classify each period end balance.',
      picklist: {
        title: 'Year-end balances', rowHeader: 'Balance', choiceHeader: 'Classification',
        options: ['Asset', 'Liability'],
        rows: [
          { text: 'Prepaid expenses', answer: 0 },
          { text: 'Accrued income', answer: 0 },
          { text: 'Accrued expenses', answer: 1 },
          { text: 'Prepaid income (income received in advance)', answer: 1 },
        ],
      },
      exp: 'Follow who owes whom. A prepaid expense means the business has paid for something it has not had, so something is owed to it — an asset. Income received in advance means the business has been paid for something it has not yet delivered, so it owes — a liability.',
    },
    {
      id: 'F-5-23', unitKey: 'faps', lo: 5, criteria: ['FAPS-5.2.4'],
      type: 'numeric',
      q: 'Receivables at the year end are £96,000. A specific allowance of £2,000 is required and a general allowance of 3% on the remainder. What is the total allowance for doubtful receivables?',
      answer: 4820, unit: '£',
      exp: 'The specific allowance is taken first: £96,000 − £2,000 = £94,000 remains, and 3% of that is £2,820. The total allowance is £2,000 + £2,820 = £4,820. Applying the 3% to the whole £96,000 would double-count the debt already provided for specifically.',
    },
    {
      id: 'F-5-24', unitKey: 'faps', lo: 5, criteria: ['FAPS-5.2.4'],
      type: 'numeric',
      q: 'The allowance for doubtful receivables was £3,400 last year and needs to be £4,100 this year. What amount is charged to the statement of profit or loss?',
      answer: 700, unit: '£',
      exp: 'Only the movement is charged: £4,100 − £3,400 = £700. The allowance is a balance carried forward, so charging the full £4,100 would report last year\'s allowance a second time.',
    },
    {
      id: 'F-5-25', unitKey: 'faps', lo: 5, criteria: ['FAPS-5.2.2'],
      type: 'truefalse',
      q: 'Identify whether each statement about writing off a debt and allowing for one is correct.',
      statements: [
        { text: 'An irrecoverable debt is removed from receivables entirely.', answer: true },
        { text: 'An allowance for doubtful receivables reduces receivables without removing any specific balance.', answer: true },
        { text: 'A specific allowance is made against a named customer.', answer: true },
        { text: 'Writing off a debt and making an allowance have the same effect on the receivables ledger.', answer: false },
      ],
      exp: 'A write-off removes the balance from the customer\'s account and from the control account; an allowance leaves every balance intact and sets a separate credit against the total. The distinction matters because a debt that is merely doubtful may still be collected.',
    },
    {
      id: 'F-5-26', unitKey: 'faps', lo: 5, criteria: ['FAPS-5.3.4'],
      type: 'numeric',
      q: 'Inventory has three lines. A cost £4,200 with a net realisable value of £4,800; B cost £3,100 with an NRV of £2,600; C cost £1,900 with an NRV of £2,050. At what total should inventory be valued?',
      answer: 8700, unit: '£',
      exp: 'IAS 2 requires the lower of cost and net realisable value line by line: A at cost £4,200, B at NRV £2,600, C at cost £1,900, totalling £8,700. Comparing the totals instead would give £9,200 against £9,450 and value B at a figure it will never realise.',
    },
    {
      id: 'F-5-27', unitKey: 'faps', lo: 5, criteria: ['FAPS-5.3.2'],
      type: 'mcq',
      q: 'Closing inventory is overstated by £5,000. What is the effect on the reported figures?',
      opts: ['Profit is overstated by £5,000 and assets are overstated by £5,000', 'Profit is understated by £5,000 and assets are overstated by £5,000', 'Profit is overstated by £5,000 and assets are unaffected', 'Neither profit nor assets is affected'],
      ans: 0,
      exp: 'Closing inventory is deducted in arriving at cost of sales, so overstating it reduces cost of sales and raises gross profit by £5,000. The same figure is carried as a current asset, so both statements are overstated by the same amount — which is why inventory attracts scrutiny at every year end.',
    },
    {
      id: 'F-5-28', unitKey: 'faps', lo: 5, criteria: ['FAPS-5.3.5'],
      type: 'truefalse',
      q: 'Identify whether each cost may be included in the valuation of inventory.',
      statements: [
        { text: 'The purchase price of the goods.', answer: true },
        { text: 'Carriage inwards on the goods.', answer: true },
        { text: 'The cost of storing finished goods before sale.', answer: false },
        { text: 'Selling and distribution costs.', answer: false },
      ],
      exp: 'Inventory is valued at the cost of bringing it to its present location and condition, which covers purchase price and carriage inwards. Storage of finished goods and the costs of selling them are incurred after that point and belong to the period, not to the asset.',
    },
    {
      id: 'F-5-29', unitKey: 'faps', lo: 5, criteria: ['FAPS-5.1.8'],
      type: 'mcq',
      q: 'How is last year\'s accrual dealt with at the start of the current year?',
      opts: ['It is reversed, so the expense is not counted twice', 'It is carried forward unchanged', 'It is written off to capital', 'It is added to this year\'s accrual'],
      ans: 0,
      exp: 'The accrual charged last year\'s profit with an expense that will be paid this year. Reversing it means that when the payment is made this year it does not become a second charge for the same cost.',
    },
    {
      id: 'F-5-30', unitKey: 'faps', lo: 5, criteria: ['FAPS-5.2.3'],
      type: 'entrygrid',
      q: 'A debt of £1,860 including VAT at 20%, more than six months past its due date, is written off as irrecoverable. Record the journal.',
      entrygrid: {
        title: 'Journal', rowHeader: 'Account', columns: ['Debit £', 'Credit £'],
        rows: [
          { label: 'Irrecoverable debts', col: 0, amount: 1550 },
          { label: 'VAT control', col: 0, amount: 310 },
          { label: 'Sales ledger control account', col: 1, amount: 1860 },
        ],
      },
      exp: 'The whole £1,860 comes out of receivables, so the control account is credited with the gross. Because the debt is over six months past due the VAT of £1,860 ÷ 6 = £310 can be reclaimed, which debits the VAT control account and leaves the net £1,550 as the real cost to the business.',
    },
    {
      id: 'F-5-31', unitKey: 'faps', lo: 5, criteria: ['FAPS-5.4.2', 'FAPS-5.4.4'],
      type: 'mcq',
      q: 'A director asks for the closing inventory valuation to be raised so the year\'s profit meets a bank covenant. What should the accountant do?',
      opts: ['Value the inventory at the lower of cost and net realisable value', 'Raise the valuation because the director has asked for it', 'Raise the valuation and disclose the change in a note', 'Raise the valuation provided the bank is not informed'],
      ans: 0,
      exp: 'Integrity and objectivity require the figure to be the one the evidence supports, and IAS 2 fixes what that figure is. Pressure from a period end or a covenant is exactly the circumstance the ethical principles exist for — a valuation chosen to reach a target is a misstatement whether or not it is disclosed.',
    },
    {
      id: 'F-5-32', unitKey: 'faps', lo: 5, criteria: ['FAPS-5.1.2'],
      type: 'gapfill',
      q: 'Complete the reason an adjustment is needed.',
      template: 'An expense paid in advance is a {0} at the year end and is {1} the expense for the year. An expense incurred but unpaid is a {2} at the year end.',
      gaps: [
        { options: ['prepayment', 'accrual', 'provision'], answer: 0 },
        { options: ['deducted from', 'added to', 'unrelated to'], answer: 0 },
        { options: ['accrual', 'prepayment', 'reserve'], answer: 0 },
      ],
      exp: 'The accruals principle reports the period the benefit belongs to, not the period the money moved. Paying early creates an asset and takes cost out of this year; using something before paying creates a liability and brings cost in.',
    },
    /* ── Outcome 6 · trial balance and ETB ────────────────────────────────── */
    {
      id: 'F-6-20', unitKey: 'faps', lo: 6, criteria: ['FAPS-6.1.3'],
      type: 'picklist',
      q: 'Would the initial trial balance reveal each error?',
      picklist: {
        title: 'Errors and the trial balance', rowHeader: 'Error', choiceHeader: 'Revealed?',
        options: ['Yes — the trial balance will not agree', 'No — the trial balance still agrees'],
        rows: [
          { text: 'A purchase invoice never entered at all', answer: 1 },
          { text: 'A sale posted as £780 instead of £870 on both sides', answer: 1 },
          { text: 'A payment debited to the bank instead of credited', answer: 0 },
          { text: 'Rent posted to the rates account', answer: 1 },
          { text: 'A single entry made with no matching second entry', answer: 0 },
        ],
      },
      exp: 'The trial balance only proves the debits equal the credits. An omission, a transposition applied to both sides, and a posting to the wrong account of the same class all leave it agreeing perfectly. Only a one-sided entry or an entry on the wrong side breaks the equality.',
    },
    {
      id: 'F-6-21', unitKey: 'faps', lo: 6, criteria: ['FAPS-6.1.6'],
      type: 'mcq',
      q: 'A payment of £620 for motor expenses was posted to the motor vehicles account. What type of error is this?',
      opts: ['Error of principle', 'Error of commission', 'Error of original entry', 'Compensating error'],
      ans: 0,
      exp: 'An expense has been posted to an asset — the wrong class of account altogether, which is an error of principle. Commission would be the right class and the wrong account within it, such as one expense account instead of another.',
    },
    {
      id: 'F-6-22', unitKey: 'faps', lo: 6, criteria: ['FAPS-6.1.7'],
      type: 'numeric',
      q: 'A trial balance has debits of £486,300 and credits of £484,900. What amount must be entered in a suspense account to make it agree?',
      answer: 1400, unit: '£',
      exp: 'Debits exceed credits by £486,300 − £484,900 = £1,400, so a credit of £1,400 is placed in a suspense account to make the trial balance agree. The suspense account is a holding position, not an answer: it stays until the underlying error is found and corrected.',
    },
    {
      id: 'F-6-23', unitKey: 'faps', lo: 6, criteria: ['FAPS-6.1.1'],
      type: 'picklist',
      q: 'Which balance can each of these accounts carry?',
      picklist: {
        title: 'Accounts that can go either way', rowHeader: 'Account', choiceHeader: 'Normal position',
        options: ['Debit or credit, depending on circumstances', 'Debit only', 'Credit only'],
        rows: [
          { text: 'VAT control account', answer: 0 },
          { text: 'Bank', answer: 0 },
          { text: 'Purchases', answer: 1 },
          { text: 'Disposals', answer: 0 },
          { text: 'Sales', answer: 2 },
        ],
      },
      exp: 'VAT is a liability when output tax exceeds input tax and an asset when it does not; the bank is an asset in funds and a liability overdrawn; disposals show a gain or a loss depending on the proceeds. Purchases and sales only ever move one way.',
    },
    {
      id: 'F-6-24', unitKey: 'faps', lo: 6, criteria: ['FAPS-6.1.7'],
      type: 'entrygrid',
      q: 'A payment of £900 for rent was credited to the bank account, but the matching debit was never posted to the rent account. Record the journal to correct the error and clear the suspense account.',
      entrygrid: {
        title: 'Journal', rowHeader: 'Account', columns: ['Debit £', 'Credit £'],
        rows: [
          { label: 'Rent', col: 0, amount: 900 },
          { label: 'Suspense', col: 1, amount: 900 },
        ],
      },
      exp: 'One side was posted and the other was not, so the debits fell £900 short and a suspense account was opened with a debit balance of £900 to make the trial balance agree. Supplying the missing debit to rent and crediting suspense corrects the expense and clears the holding account in one entry.',
    },
    {
      id: 'F-6-25', unitKey: 'faps', lo: 6, criteria: ['FAPS-6.2.2'],
      type: 'picklist',
      q: 'On the extended trial balance, which side of the adjustments columns does each entry go?',
      picklist: {
        title: 'Adjustments columns', rowHeader: 'Adjustment', choiceHeader: 'Side',
        options: ['Debit', 'Credit'],
        rows: [
          { text: 'The depreciation charge for the year', answer: 0 },
          { text: 'The prepayment carried forward', answer: 0 },
          { text: 'Accumulated depreciation for the year\'s charge', answer: 1 },
          { text: 'The accrual carried forward', answer: 1 },
          { text: 'An irrecoverable debt written off', answer: 0 },
        ],
      },
      exp: 'Each adjustment is a journal and appears twice, once on each side. The expense side of a depreciation charge or a write-off is a debit; the balance it creates — accumulated depreciation, an accrual — is a credit. A prepayment is the exception among these: it creates an asset, so it is the debit.',
    },
    {
      id: 'F-6-26', unitKey: 'faps', lo: 6, criteria: ['FAPS-6.3.4'],
      type: 'numeric',
      q: 'On an extended trial balance the statement of profit or loss columns total £312,000 of debits and £358,000 of credits. What is the profit for the year?',
      answer: 46000, unit: '£',
      exp: 'Income exceeds expenses by £358,000 − £312,000 = £46,000, so the business made a profit of £46,000. The figure is entered as a debit in the profit or loss columns to balance them, and as a credit in the statement of financial position columns where it increases capital.',
    },
    {
      id: 'F-6-27', unitKey: 'faps', lo: 6, criteria: ['FAPS-6.3.4'],
      type: 'mcq',
      q: 'On the extended trial balance, a loss for the year is entered in the statement of profit or loss columns as which entry?',
      opts: ['A credit', 'A debit', 'It is not entered in those columns', 'Either, depending on the software'],
      ans: 0,
      exp: 'A loss means the expense debits exceed the income credits, so a credit is needed to balance the profit or loss columns. The matching debit goes into the statement of financial position columns, where it reduces capital.',
    },
    {
      id: 'F-6-28', unitKey: 'faps', lo: 6, criteria: ['FAPS-6.3.3'],
      type: 'numeric',
      q: 'A trial balance shows purchases of £248,000. Opening inventory is £19,000 and closing inventory is £23,500. What is the cost of sales figure extended into the statement of profit or loss columns?',
      answer: 243500, unit: '£',
      exp: 'Cost of sales = £19,000 + £248,000 − £23,500 = £243,500. Closing inventory is the balance the ETB adjusts for twice: as a credit within cost of sales and as a debit asset carried into the statement of financial position.',
    },
    {
      id: 'F-6-29', unitKey: 'faps', lo: 6, criteria: ['FAPS-6.1.2'],
      type: 'truefalse',
      q: 'Identify whether each statement about the initial trial balance is correct.',
      statements: [
        { text: 'It proves the debits recorded equal the credits recorded.', answer: true },
        { text: 'It proves every transaction has been recorded.', answer: false },
        { text: 'It is the starting point for preparing the financial statements.', answer: true },
        { text: 'It proves each transaction has been posted to the right account.', answer: false },
      ],
      exp: 'The trial balance is an arithmetic check on the double entry and nothing more. Six named error types leave it agreeing — omission, commission, principle, original entry, reversal and compensating — which is exactly why the limitations are examined alongside the technique.',
    },
    {
      id: 'F-6-30', unitKey: 'faps', lo: 6, criteria: ['FAPS-6.1.5'],
      type: 'picklist',
      q: 'In which column of the initial trial balance does each balance belong?',
      picklist: {
        title: 'Balances to place', rowHeader: 'Balance', choiceHeader: 'Column',
        options: ['Debit', 'Credit'],
        rows: [
          { text: 'Motor vehicles at cost', answer: 0 },
          { text: 'Drawings', answer: 0 },
          { text: 'Capital', answer: 1 },
          { text: 'Accumulated depreciation', answer: 1 },
          { text: 'Carriage inwards', answer: 0 },
          { text: 'Discounts received', answer: 1 },
        ],
      },
      exp: 'Assets and expenses are debits; liabilities, income and capital are credits. Drawings are the awkward one: they belong to capital but reduce it, so they sit on the debit side. Accumulated depreciation is a credit because it is deducted from an asset rather than being one.',
    },
    {
      id: 'F-6-31', unitKey: 'faps', lo: 6, criteria: ['FAPS-6.1.6'],
      type: 'entrygrid',
      q: 'A payment of £340 for stationery was posted to the electricity account. The trial balance agreed. Record the journal to correct the error.',
      entrygrid: {
        title: 'Journal', rowHeader: 'Account', columns: ['Debit £', 'Credit £'],
        rows: [
          { label: 'Stationery', col: 0, amount: 340 },
          { label: 'Electricity', col: 1, amount: 340 },
        ],
      },
      exp: 'Only the two expense accounts move, because the bank side was correct and the trial balance still agreed — this is an error of commission. No suspense account is involved: a suspense account is only needed where the debits and credits do not already match.',
    },
    {
      id: 'F-6-32', unitKey: 'faps', lo: 6, criteria: ['FAPS-6.3.1'],
      type: 'mcq',
      q: 'What is the extended trial balance for?',
      opts: ['Taking adjusted balances into the two financial statements', 'Checking that the ledger accounts balance', 'Recording transactions during the year', 'Replacing the general ledger'],
      ans: 0,
      exp: 'The ETB takes the initial trial balance, applies the period end adjustments in dedicated columns, and extends each adjusted balance into either the profit or loss columns or the financial position columns. It is a working paper for preparing the statements, not a book of account.',
    },
    {
      id: 'F-6-33', unitKey: 'faps', lo: 6, criteria: ['FAPS-6.3.2'],
      type: 'truefalse',
      q: 'Identify whether each difference between a sole trader\'s ETB and a partnership\'s is correct.',
      statements: [
        { text: 'A partnership ETB carries a capital account for each partner.', answer: true },
        { text: 'A partnership ETB carries a current account for each partner.', answer: true },
        { text: 'A partnership\'s profit is appropriated between the partners.', answer: true },
        { text: 'A sole trader\'s ETB has an appropriation account.', answer: false },
      ],
      exp: 'A sole trader has one capital account and takes the whole profit. A partnership divides the profit between the partners through an appropriation account, and needs a capital and a current account for each of them, which is what makes the two extended trial balances differ.',
    },
    {
      id: 'F-6-34', unitKey: 'faps', lo: 6, criteria: ['FAPS-6.2.1', 'FAPS-6.1.4'],
      type: 'truefalse',
      q: 'Identify whether each statement about software and the trial balance is correct.',
      statements: [
        { text: 'Software transfers ledger balances into the trial balance automatically.', answer: true },
        { text: 'Software recalculates balances once adjustments are posted.', answer: true },
        { text: 'A trial balance produced by software cannot contain an error of principle.', answer: false },
        { text: 'Software decides which period end adjustments are needed.', answer: false },
      ],
      exp: 'Automation removes the transcription and the arithmetic, which are the errors a trial balance would have caught anyway. The errors it leaves untouched are the ones about judgement — which account a transaction belongs in, and which adjustments the year end requires.',
    },
    {
      id: 'F-6-35', unitKey: 'faps', lo: 6, criteria: ['FAPS-6.1.7'],
      type: 'numeric',
      q: 'A suspense account was opened with a credit balance of £560. Investigation shows a purchase of £560 was debited to purchases but never credited to the payables control account. After the correction, what balance remains on the suspense account?',
      answer: 0, unit: '£',
      exp: 'The missing credit is supplied to the payables control account and the suspense account is debited with £560, clearing it exactly. A suspense account that does not clear means at least one further error has still to be found.',
    },
    {
      id: 'F-6-36', unitKey: 'faps', lo: 6, criteria: ['FAPS-6.3.3'],
      type: 'mcq',
      q: 'Which balance is extended into BOTH the statement of profit or loss and the statement of financial position columns of the ETB?',
      opts: ['Closing inventory', 'Opening inventory', 'Purchases', 'Sales'],
      ans: 0,
      exp: 'Closing inventory is credited within cost of sales, because those goods were not sold, and debited as a current asset, because the business still holds them. Opening inventory, purchases and sales each belong to one statement only.',
    },
    {
      id: 'F-6-37', unitKey: 'faps', lo: 6, criteria: ['FAPS-6.1.6'],
      type: 'mcq',
      q: 'Sales were overcast by £400 and purchases were overcast by £400. What is this called?',
      opts: ['A compensating error', 'An error of commission', 'An error of omission', 'A reversal of entries'],
      ans: 0,
      exp: 'Two independent errors of the same size on opposite sides cancel each other out in the trial balance, which is what a compensating error means. Both figures are wrong and the totals agree, so nothing about the trial balance signals the problem.',
    },
    {
      id: 'F-6-38', unitKey: 'faps', lo: 6, criteria: ['FAPS-6.2.2'],
      type: 'numeric',
      q: 'The trial balance shows rent of £24,000. A prepayment of £2,000 is required at the year end. What rent figure is extended into the statement of profit or loss columns?',
      answer: 22000, unit: '£',
      exp: 'The prepayment takes cost out of this year: £24,000 − £2,000 = £22,000 is the rent for the period. The £2,000 is extended into the statement of financial position columns instead, as a current asset.',
    },
    {
      id: 'F-6-39', unitKey: 'faps', lo: 6, criteria: ['FAPS-6.2.2'],
      type: 'numeric',
      q: 'The trial balance shows wages of £86,400. An accrual of £3,100 is required at the year end. What wages figure is extended into the statement of profit or loss columns?',
      answer: 89500, unit: '£',
      exp: 'The accrual brings unpaid cost into this year: £86,400 + £3,100 = £89,500. The £3,100 also appears in the statement of financial position columns as a current liability, because the business owes it at the year end.',
    },

    /* ── Outcome 7 · financial statements ─────────────────────────────────── */
    {
      id: 'F-7-20', unitKey: 'faps', lo: 7, criteria: ['FAPS-7.1.1', 'FAPS-7.1.2'],
      type: 'truefalse',
      q: 'Identify whether each statement about the purpose of the two financial statements is correct.',
      statements: [
        { text: 'The statement of profit or loss reports performance over a period.', answer: true },
        { text: 'The statement of financial position reports the position at a single date.', answer: true },
        { text: 'The statement of financial position reports performance over a period.', answer: false },
        { text: 'The statement of profit or loss reports what the business owns.', answer: false },
      ],
      exp: 'One is a film and the other a photograph. The statement of profit or loss covers a stretch of time and asks how the business did; the statement of financial position fixes on one date and asks what it holds and owes.',
    },
    {
      id: 'F-7-21', unitKey: 'faps', lo: 7, criteria: ['FAPS-7.1.6'],
      type: 'numeric',
      q: 'Sales are £412,000, opening inventory £26,000, purchases £268,000, closing inventory £31,000 and expenses £94,000. What is the profit for the year?',
      answer: 55000, unit: '£',
      exp: 'Cost of sales = £26,000 + £268,000 − £31,000 = £263,000. Gross profit = £412,000 − £263,000 = £149,000, and profit for the year = £149,000 − £94,000 = £55,000.',
    },
    {
      id: 'F-7-22', unitKey: 'faps', lo: 7, criteria: ['FAPS-7.2.2'],
      type: 'numeric',
      q: 'Opening capital is £74,000. Profit for the year is £38,500, the owner introduced £6,000 and drawings were £27,200. What is the closing capital?',
      answer: 91300, unit: '£',
      exp: 'Closing capital = £74,000 + £38,500 + £6,000 − £27,200 = £91,300. Profit and capital introduced both increase the owner\'s claim; drawings reduce it.',
    },
    {
      id: 'F-7-23', unitKey: 'faps', lo: 7, criteria: ['FAPS-7.1.7'],
      type: 'numeric',
      q: 'A business has non-current assets with a carrying amount of £118,000, current assets of £46,500, current liabilities of £29,300 and a long-term loan of £40,000. What are the net assets?',
      answer: 95200, unit: '£',
      exp: 'Net assets = £118,000 + £46,500 − £29,300 − £40,000 = £95,200. Under the net assets presentation this figure equals closing capital, which is the accounting equation stated as a layout.',
    },
    {
      id: 'F-7-24', unitKey: 'faps', lo: 7, criteria: ['FAPS-7.2.2'],
      type: 'mcq',
      q: 'A sole trader takes goods that cost £900 from inventory for personal use. How is this recorded?',
      opts: ['Debit drawings, credit purchases', 'Debit drawings, credit sales', 'Debit purchases, credit drawings', 'Debit sales, credit drawings'],
      ans: 0,
      exp: 'The goods leave the business without being sold, so they come out of purchases at cost and are charged to the owner\'s drawings. Crediting sales instead would report a profit on a transaction with the owner, which the business entity principle does not permit.',
    },
    {
      id: 'F-7-25', unitKey: 'faps', lo: 7, criteria: ['FAPS-7.3.5'],
      type: 'numeric',
      q: 'Two partners share residual profits 3:2. The residual profit after appropriations is £85,000. What is the larger partner\'s share?',
      answer: 51000, unit: '£',
      exp: 'The ratio has 3 + 2 = 5 parts, so one part is £85,000 ÷ 5 = £17,000. The partner taking three parts receives £51,000 and the other £34,000, which together account for the whole residual.',
    },
    {
      id: 'F-7-26', unitKey: 'faps', lo: 7, criteria: ['FAPS-7.3.4'],
      type: 'numeric',
      q: 'A partnership makes a profit of £120,000. Partner A takes a salary of £22,000 and interest on capital of £4,500; Partner B takes interest on capital of £3,500. What residual profit remains to be shared?',
      answer: 90000, unit: '£',
      exp: 'Appropriations come out of profit before any sharing: £120,000 − £22,000 − £4,500 − £3,500 = £90,000. A partner\'s salary is an appropriation of profit, not an expense of the business, so it never reaches the statement of profit or loss.',
    },
    {
      id: 'F-7-27', unitKey: 'faps', lo: 7, criteria: ['FAPS-7.3.1'],
      type: 'mcq',
      q: 'What is the difference between a partnership\'s statement of profit or loss and a sole trader\'s?',
      opts: ['The partnership appropriates its profit between the partners', 'The partnership excludes cost of sales from its calculation', 'The partnership treats partners\' salaries as a trading expense', 'The partnership reports its expenses before its gross profit'],
      ans: 0,
      exp: 'The trading part is identical — the same revenue, cost of sales and expenses. What follows differs: a partnership divides the profit between the partners in an appropriation account, and partners\' salaries and interest on capital are divisions of profit rather than costs of trading.',
    },
    {
      id: 'F-7-28', unitKey: 'faps', lo: 7, criteria: ['FAPS-7.4.3'],
      type: 'truefalse',
      q: 'Identify whether each statement about partners\' accounts is correct.',
      statements: [
        { text: 'The capital account records the partner\'s long-term investment in the firm.', answer: true },
        { text: 'The current account records the year-to-year movements: share of profit, salary, interest and drawings.', answer: true },
        { text: 'Drawings are debited to the capital account.', answer: false },
        { text: 'A current account can carry a debit balance.', answer: true },
      ],
      exp: 'Drawings go to the current account, which is what keeps the capital account stable at the agreed investment. A debit balance on a current account means that partner has drawn more than has been credited to them, and is shown as a deduction in the statement of financial position.',
    },
    {
      id: 'F-7-29', unitKey: 'faps', lo: 7, criteria: ['FAPS-7.4.5'],
      type: 'numeric',
      q: 'A partner\'s current account opens with a credit balance of £4,200. During the year they are credited with a salary of £18,000, interest on capital of £1,600 and a profit share of £26,400, and they draw £42,000. What is the closing balance?',
      answer: 8200, unit: '£',
      exp: 'Credits total £4,200 + £18,000 + £1,600 + £26,400 = £50,200, against drawings of £42,000, leaving a credit balance of £8,200. The partner has left £8,200 of their entitlement in the business.',
    },
    {
      id: 'F-7-30', unitKey: 'faps', lo: 7, criteria: ['FAPS-7.4.5'],
      type: 'numeric',
      q: 'A partner\'s current account opens with a credit balance of £1,800. They are credited with a profit share of £19,500 and draw £24,000 during the year. What is the closing balance?',
      answer: 2700, unit: '£',
      exp: 'Credits total £1,800 + £19,500 = £21,300 against drawings of £24,000, so the account closes with a DEBIT balance of £2,700. The partner has drawn more than they were entitled to and owes the firm the difference.',
    },
    {
      id: 'F-7-31', unitKey: 'faps', lo: 7, criteria: ['FAPS-7.1.4'],
      type: 'mcq',
      q: 'How does the statement of profit or loss connect to the statement of financial position?',
      opts: ['Profit for the year is added to capital', 'Sales revenue is shown as a current asset', 'Expenses are shown as current liabilities', 'Cost of sales is deducted from non-current assets'],
      ans: 0,
      exp: 'The one figure that crosses between the statements is profit for the year, which increases the owner\'s claim on the business. Every other line of the statement of profit or loss is closed off at the year end and starts again at nil.',
    },
    {
      id: 'F-7-32', unitKey: 'faps', lo: 7, criteria: ['FAPS-7.1.5'],
      type: 'picklist',
      q: 'Where does each item appear in the financial statements?',
      picklist: {
        title: 'Placing the figures', rowHeader: 'Item', choiceHeader: 'Statement',
        options: ['Statement of profit or loss', 'Statement of financial position'],
        rows: [
          { text: 'Carriage inwards', answer: 0 },
          { text: 'Carriage outwards', answer: 0 },
          { text: 'Accumulated depreciation', answer: 1 },
          { text: 'Allowance for doubtful receivables', answer: 1 },
          { text: 'Discounts received', answer: 0 },
          { text: 'Prepaid expenses', answer: 1 },
        ],
      },
      exp: 'Both carriages are expenses, but they sit in different places: carriage inwards is part of cost of sales because it is a cost of getting goods in, while carriage outwards is a distribution expense. The accumulated depreciation and the allowance are both deducted from assets rather than being charges of the year in their own right.',
    },
    {
      id: 'F-7-33', unitKey: 'faps', lo: 7, criteria: ['FAPS-7.1.6'],
      type: 'numeric',
      q: 'Sales are £286,000 and returns inwards £6,000. Opening inventory is £22,400, purchases £174,000, returns outwards £3,400 and closing inventory £19,800. What is the gross profit?',
      answer: 106800, unit: '£',
      exp: 'Net sales = £286,000 − £6,000 = £280,000. Cost of sales = £22,400 + £174,000 − £3,400 − £19,800 = £173,200. Gross profit = £280,000 − £173,200 = £106,800. Returns inwards reduce sales; returns outwards reduce purchases.',
    },
    {
      id: 'F-7-34', unitKey: 'faps', lo: 7, criteria: ['FAPS-7.2.1'],
      type: 'truefalse',
      q: 'Identify whether each event increases a sole trader\'s capital balance.',
      statements: [
        { text: 'The business makes a profit.', answer: true },
        { text: 'The owner pays personal savings into the business bank account.', answer: true },
        { text: 'The owner takes goods for personal use.', answer: false },
        { text: 'The business buys a machine on credit.', answer: false },
      ],
      exp: 'Profit and capital introduced both raise the owner\'s claim. Goods taken for personal use are drawings and reduce it. Buying on credit raises an asset and a liability equally and leaves capital exactly where it was.',
    },
    {
      id: 'F-7-35', unitKey: 'faps', lo: 7, criteria: ['FAPS-7.4.6'],
      type: 'numeric',
      q: 'A partnership has net assets of £164,000. Partners\' capital accounts total £120,000. Partner A\'s current account has a credit balance of £31,500. What is Partner B\'s current account balance?',
      answer: 12500, unit: '£',
      exp: 'Net assets equal the total of the capital and current accounts, so the two current accounts together are £164,000 − £120,000 = £44,000. Partner B holds £44,000 − £31,500 = £12,500 as a credit balance.',
    },
    {
      id: 'F-7-36', unitKey: 'faps', lo: 7, criteria: ['FAPS-7.3.2'],
      type: 'mcq',
      q: 'Which of these is NOT an appropriation of partnership profit?',
      opts: ['Wages paid to the firm\'s employees', 'A partner\'s salary', 'Interest on a partner\'s capital', 'A partner\'s share of residual profit'],
      ans: 0,
      exp: 'Employees\' wages are a cost of trading and are charged in arriving at profit. A partner\'s salary, interest on their capital and their profit share are all ways of dividing the profit once it has been calculated, and belong in the appropriation account.',
    },
    {
      id: 'F-7-37', unitKey: 'faps', lo: 7, criteria: ['FAPS-7.3.5'],
      type: 'numeric',
      q: 'Three partners share residual profits 4:3:1. The residual profit is £64,000. What does the partner with the smallest share receive?',
      answer: 8000, unit: '£',
      exp: 'The ratio has 4 + 3 + 1 = 8 parts, so one part is £64,000 ÷ 8 = £8,000. The three shares are £32,000, £24,000 and £8,000, which together account for the whole £64,000.',
    },
    {
      id: 'F-7-38', unitKey: 'faps', lo: 7, criteria: ['FAPS-7.1.3'],
      type: 'mcq',
      q: 'Under the net assets presentation, what must the net assets figure equal?',
      opts: ['Closing capital', 'Profit for the year', 'Total assets', 'Non-current liabilities'],
      ans: 0,
      exp: 'Net assets are assets less all liabilities, which is the accounting equation rearranged — and the residual belongs to the owner. If the two halves of the statement do not agree, an adjustment has been made on one side and not the other.',
    },
    {
      id: 'F-7-39', unitKey: 'faps', lo: 7, criteria: ['FAPS-7.2.2'],
      type: 'numeric',
      q: 'Closing capital is £88,000, profit for the year was £41,000, drawings were £33,000 and the owner introduced £5,000. What was the opening capital?',
      answer: 75000, unit: '£',
      exp: 'Rearranging: opening capital = closing capital − profit − capital introduced + drawings = £88,000 − £41,000 − £5,000 + £33,000 = £75,000. The same chain read backwards, which is exactly the technique Outcome 9 uses on incomplete records.',
    },
    {
      id: 'F-7-40', unitKey: 'faps', lo: 7, criteria: ['FAPS-7.4.1'],
      type: 'mcq',
      q: 'What appears in a partnership\'s statement of financial position that does not appear in a sole trader\'s?',
      opts: ['A capital and a current account for each partner', 'A single capital account for the whole business', 'A separate statement for each partner\'s assets', 'A drawings account presented as a liability'],
      ans: 0,
      exp: 'Everything above the funding section is the same. The difference is how the owners\' claim is presented: one capital account for a sole trader, against a capital account and a current account for every partner in the firm.',
    },
    {
      id: 'F-7-41', unitKey: 'faps', lo: 7, criteria: ['FAPS-7.1.6'],
      type: 'numeric',
      q: 'Gross profit is £142,000. Expenses are wages £58,000, rent £21,000, depreciation £9,400 and an increase in the allowance for doubtful receivables of £1,200. What is the profit for the year?',
      answer: 52400, unit: '£',
      exp: 'Every one of the four is an expense of the year: £142,000 − £58,000 − £21,000 − £9,400 − £1,200 = £52,400. The increase in the allowance is charged even though no money moved, because the accruals principle reports the cost in the period the doubt arose.',
    },
    {
      id: 'F-7-42', unitKey: 'faps', lo: 7, criteria: ['FAPS-7.4.4'],
      type: 'mcq',
      q: 'A partner takes goods from inventory for personal use. Which account is debited?',
      opts: ['That partner\'s current account', 'The partnership capital account', 'The appropriation account', 'Purchases'],
      ans: 0,
      exp: 'Drawings in any form — cash, goods or services — are debited to the current account of the partner who took them, with the credit going to purchases at cost. Charging the capital account would disturb the agreed long-term investment.',
    },
    {
      id: 'F-7-43', unitKey: 'faps', lo: 7, criteria: ['FAPS-7.3.6'],
      type: 'numeric',
      q: 'A partnership makes a profit of £96,000. Partner A takes a salary of £30,000; interest on capital is £2,400 for A and £1,600 for B. Residual profits are shared equally. What is B\'s total share of the profit?',
      answer: 32600, unit: '£',
      exp: 'Residual profit = £96,000 − £30,000 − £2,400 − £1,600 = £62,000, so each partner takes £31,000. B\'s total is £1,600 interest + £31,000 residual = £32,600. A takes £30,000 + £2,400 + £31,000 = £63,400, and the two together account for the whole £96,000.',
    },
    {
      id: 'F-7-44', unitKey: 'faps', lo: 7, criteria: ['FAPS-7.4.2'],
      type: 'truefalse',
      q: 'Identify whether each statement about what the appropriation account does is correct.',
      statements: [
        { text: 'It shows how the profit is divided between the partners.', answer: true },
        { text: 'It is prepared before the profit for the year is calculated.', answer: false },
        { text: 'The amounts it allocates are credited to the partners\' current accounts.', answer: true },
        { text: 'It appears in the statement of financial position.', answer: false },
      ],
      exp: 'The appropriation account picks up where the statement of profit or loss finishes: profit is calculated first and then divided. What it allocates goes to the current accounts, which is where the statement of financial position then reports it.',
    },
    {
      id: 'F-7-45', unitKey: 'faps', lo: 7, criteria: ['FAPS-7.1.7'],
      type: 'numeric',
      q: 'Non-current assets cost £210,000 with accumulated depreciation of £74,000. Inventory is £28,400, receivables £33,100 less an allowance of £1,900, and the bank is overdrawn by £4,600. Payables are £26,000. What are the net assets?',
      answer: 165000, unit: '£',
      exp: 'Non-current assets carry at £210,000 − £74,000 = £136,000. Current assets are £28,400 + (£33,100 − £1,900) = £59,600. Current liabilities are the £4,600 overdraft plus £26,000 payables = £30,600. Net assets = £136,000 + £59,600 − £30,600 = £165,000. The allowance is deducted from receivables rather than being an expense here, and the overdraft is a liability rather than a negative asset.',
    },
    {
      id: 'F-7-46', unitKey: 'faps', lo: 7, criteria: ['FAPS-7.1.5'],
      type: 'gapfill',
      q: 'Complete the terminology used in the financial statements.',
      template: 'Amounts owed by credit customers are shown as {0}. Amounts owed to credit suppliers are shown as {1}. Assets held for use over more than one year are {2}.',
      gaps: [
        { options: ['receivables', 'payables', 'accruals'], answer: 0 },
        { options: ['payables', 'receivables', 'prepayments'], answer: 0 },
        { options: ['non-current assets', 'current assets', 'net assets'], answer: 0 },
      ],
      exp: 'The terms describe direction: receivables are amounts the business will receive, payables are amounts it will pay. Non-current means held for use rather than for resale within the year, which is what separates a delivery van from the stock in it.',
    },
    {
      id: 'F-7-47', unitKey: 'faps', lo: 7, criteria: ['FAPS-7.2.1'],
      type: 'numeric',
      q: 'A sole trader\'s capital rose from £52,000 to £61,000 over the year. Drawings were £29,000 and no capital was introduced. What was the profit for the year?',
      answer: 38000, unit: '£',
      exp: 'Capital rose £9,000 and £29,000 was withdrawn along the way, so the business earned £9,000 + £29,000 = £38,000. This is the capital account read as an equation, which is the same reasoning Outcome 9 applies when no ledgers survive at all.',
    },
    {
      id: 'F-7-48', unitKey: 'faps', lo: 7, criteria: ['FAPS-7.1.6'],
      type: 'mcq',
      q: 'Where does carriage inwards appear in the statement of profit or loss?',
      opts: ['Within cost of sales', 'Within expenses below gross profit', 'As a deduction from sales', 'It does not appear'],
      ans: 0,
      exp: 'Carriage inwards is the cost of getting purchased goods to the business, so it is part of what those goods cost and belongs in cost of sales. Carriage outwards is the cost of delivering to customers and sits below gross profit with the other expenses.',
    },
    {
      id: 'F-7-49', unitKey: 'faps', lo: 7, criteria: ['FAPS-7.3.3'],
      type: 'numeric',
      q: 'A partnership\'s statement of profit or loss shows a profit of £74,000 before appropriations. Interest on drawings of £2,000 is charged to the partners. What total is available for appropriation?',
      answer: 76000, unit: '£',
      exp: 'Interest charged on drawings is a debit to the partners and a credit to the appropriation account, so it increases what there is to divide: £74,000 + £2,000 = £76,000. It is a transfer between the partners and the firm, not income from trading.',
    },
    {
      id: 'F-7-50', unitKey: 'faps', lo: 7, criteria: ['FAPS-7.1.2'],
      type: 'picklist',
      q: 'Classify each item for the statement of financial position.',
      picklist: {
        title: 'Statement of financial position', rowHeader: 'Item', choiceHeader: 'Classification',
        options: ['Non-current asset', 'Current asset', 'Current liability', 'Non-current liability'],
        rows: [
          { text: 'Delivery van at carrying amount', answer: 0 },
          { text: 'Inventory', answer: 1 },
          { text: 'Bank loan repayable in four years', answer: 3 },
          { text: 'Trade payables', answer: 2 },
          { text: 'Prepaid insurance', answer: 1 },
          { text: 'Accrued electricity', answer: 2 },
        ],
      },
      exp: 'The dividing line is twelve months. A four-year loan is non-current; payables and accruals fall due within the year. Prepayments are current assets because the benefit will be received within the year, which is the mirror image of the accrual beside it.',
    },
    {
      id: 'F-7-51', unitKey: 'faps', lo: 7, criteria: ['FAPS-7.1.6'],
      type: 'numeric',
      q: 'Sales are £198,000 with a gross profit margin of 30%. Expenses are £41,600. What is the profit for the year?',
      answer: 17800, unit: '£',
      exp: 'Gross profit = £198,000 × 30% = £59,400, and profit for the year = £59,400 − £41,600 = £17,800. Expenses come out of gross profit rather than out of revenue.',
    },
    {
      id: 'F-7-52', unitKey: 'faps', lo: 7, criteria: ['FAPS-7.4.5'],
      type: 'entrygrid',
      q: 'A partner is credited with a profit share of £24,000 for the year. Record the entry in the appropriation account and the partner\'s current account.',
      entrygrid: {
        title: 'Appropriation of profit', rowHeader: 'Account', columns: ['Debit £', 'Credit £'],
        rows: [
          { label: 'Appropriation account', col: 0, amount: 24000 },
          { label: 'Partner\'s current account', col: 1, amount: 24000 },
        ],
      },
      exp: 'The appropriation account is debited as the profit is allocated away from it, and the partner\'s current account is credited because the firm now owes them that share. The capital account is untouched: it holds the agreed long-term investment and does not move with each year\'s result.',
    },
    {
      id: 'F-7-53', unitKey: 'faps', lo: 7, criteria: ['FAPS-7.1.6'],
      type: 'numeric',
      q: 'A business reports gross profit of £88,000 and a net loss of £6,500. What were the total expenses?',
      answer: 94500, unit: '£',
      exp: 'Expenses exceeded gross profit by the amount of the loss: £88,000 + £6,500 = £94,500. A loss simply means the expenses were larger than the gross profit available to absorb them.',
    },
    {
      id: 'F-7-54', unitKey: 'faps', lo: 7, criteria: ['FAPS-7.4.6'],
      type: 'truefalse',
      q: 'Identify whether each statement about a partnership statement of financial position is correct.',
      statements: [
        { text: 'The net assets figure equals the total of the capital and current accounts.', answer: true },
        { text: 'A debit balance on a current account is deducted in arriving at the total.', answer: true },
        { text: 'Partners\' salaries appear as a liability.', answer: false },
        { text: 'The capital accounts change with each year\'s profit.', answer: false },
      ],
      exp: 'Salaries are appropriated through the current accounts rather than sitting as a separate liability, and the capital accounts stay at the agreed investment — it is the current accounts that absorb each year\'s profit and drawings. A partner who has overdrawn shows a debit balance, which reduces the total.',
    },
    {
      id: 'F-7-55', unitKey: 'faps', lo: 7, criteria: ['FAPS-7.2.2'],
      type: 'numeric',
      q: 'A sole trader\'s drawings for the year were cash of £24,000 and goods costing £3,400. Opening capital was £68,000 and profit for the year £45,000. What is the closing capital?',
      answer: 85600, unit: '£',
      exp: 'Goods taken are drawings at cost, so total drawings are £24,000 + £3,400 = £27,400. Closing capital = £68,000 + £45,000 − £27,400 = £85,600.',
    },

    /* ── Multi-part tasks ────────────────────────────────────────────────────
       WHY THEY ARE HERE. FAPS is a 150-minute paper, the longest on this level,
       and it is built out of extended tasks: take a set of balances, decide
       what each one is, and carry it through to a figure. This bank was 260
       questions with not one of them — every question a single step, when the
       thing the assessment tests is the chain.

       WHAT MAKES A TASK A TASK, rather than a numeric question wearing a table:
       at least one figure asked for must NOT be the plain total of a dataset
       column, so the reader has to decide which rows count. Several of the
       datasets below therefore carry rows that belong nowhere in the answer —
       training costs among the capital ones, drawings among the expenses — and
       that is deliberate. scripts/check-aat3-quality.js enforces it. */
    {
      id: 'F-2-92', unitKey: 'faps', lo: 2, criteria: ['FAPS-2.3.3', 'FAPS-2.3.4'],
      type: 'task',
      q: 'Post the month’s day books to the general ledger.',
      brief: 'Halden Ltd had no balance outstanding at 1 March and has paid nothing during the month.',
      datasets: [
        {
          title: 'Sales day book — March',
          headers: ['Date', 'Customer', 'Document', 'Net £', 'VAT £', 'Total £'],
          rows: [
            ['3 Mar', 'Halden Ltd', 'Invoice 2041', '2,400.00', '480.00', '2,880.00'],
            ['9 Mar', 'Prewitt & Co', 'Invoice 2042', '1,750.00', '350.00', '2,100.00'],
            ['24 Mar', 'Ashgrove plc', 'Invoice 2043', '3,120.00', '624.00', '3,744.00'],
          ],
        },
        {
          title: 'Sales returns day book — March',
          headers: ['Date', 'Customer', 'Document', 'Net £', 'VAT £', 'Total £'],
          rows: [
            ['17 Mar', 'Halden Ltd', 'Credit note 118', '300.00', '60.00', '360.00'],
          ],
        },
      ],
      parts: [
        {
          label: 'Amount debited to the sales ledger control account for the month',
          type: 'numeric', unit: '£', answer: 8724,
          exp: 'The sales day book total, gross: 2,880.00 + 2,100.00 + 3,744.00 = £8,724.00. The control account is debited with what customers owe, which is the VAT-inclusive figure — the customer owes the VAT as much as the goods.',
        },
        {
          label: 'Amount credited to the sales ledger control account for the month',
          type: 'numeric', unit: '£', answer: 360,
          exp: 'The sales returns day book total, gross: £360.00. Returns reduce what customers owe, so they go on the opposite side of the control account from invoices, and they go there gross for the same reason invoices do.',
        },
        {
          label: 'Amount credited to the sales account for the month',
          type: 'numeric', unit: '£', answer: 7270,
          exp: 'The business has earned the NET of the invoices, and the returns come off it: 2,400.00 + 1,750.00 + 3,120.00 = 7,270.00 of sales, against which the 300.00 net return is posted to sales returns rather than netted here. The sales account is credited with £7,270.00.',
        },
        {
          label: 'Balance owed by Halden Ltd at 31 March',
          type: 'numeric', unit: '£', answer: 2520,
          exp: 'Only Halden’s own two documents touch its account: 2,880.00 invoiced less 360.00 credited = £2,520.00. This is the figure no column total gives you — reading the day books as two lists of totals answers the first three parts and not this one.',
        },
        {
          label: 'The double entry for the sales returns day book total is:',
          type: 'choice',
          options: [
            'Debit sales returns and VAT control, credit sales ledger control',
            'Debit sales ledger control, credit sales returns and VAT control',
            'Debit sales returns only, credit sales ledger control',
            'Debit sales and VAT control, credit bank',
          ],
          answer: 0,
          exp: 'A credit note reverses an invoice, so every side of the original entry flips. The invoice debited the control account and credited sales and VAT; the credit note debits sales returns and VAT control and credits the control account. Leaving the VAT out — the third option — is the common version of this error, and it leaves the VAT control account overstating what is owed to HMRC by the VAT on goods that came back.',
        },
      ],
      exp: 'Day books are totalled and posted in one go, which is the point of them, but three of the four figures asked for here are totals and one is not. A reader who works only in totals can post the ledger and still not know what any individual customer owes — and the customer balance is what a query, a statement or a credit control call actually needs.',
    },
    {
      id: 'F-3-27', unitKey: 'faps', lo: 3, criteria: ['FAPS-3.2.2', 'FAPS-3.3.5'],
      type: 'task',
      q: 'Deal with the machine bought this year and the one it replaced.',
      brief: 'The new machine was bought on 1 January. The old machine was given in part exchange on the same day.',
      datasets: [
        {
          title: 'Amounts paid in connection with the new machine',
          headers: ['Item', 'Amount £'],
          rows: [
            ['Purchase price of the machine', '24,000.00'],
            ['Delivery to site', '680.00'],
            ['Installation and commissioning', '1,450.00'],
            ['Training the operators to use it', '900.00'],
            ['First year’s maintenance contract', '1,200.00'],
            ['Replacement guard fitted after an accident in month eight', '340.00'],
          ],
        },
        {
          title: 'The machine it replaced',
          headers: ['Item', 'Amount £'],
          rows: [
            ['Original cost', '15,000.00'],
            ['Accumulated depreciation to the date of disposal', '11,250.00'],
            ['Part-exchange allowance given by the supplier', '2,900.00'],
          ],
        },
      ],
      parts: [
        {
          label: 'Amount capitalised as the cost of the new machine',
          type: 'numeric', unit: '£', answer: 26130,
          exp: 'Capital expenditure is everything spent BRINGING THE ASSET INTO USE, and stops there: 24,000.00 + 680.00 delivery + 1,450.00 installation = £26,130.00. Delivery and installation are capitalised even though nothing tangible was bought with them, because without them there is no working machine.',
        },
        {
          label: 'Amount charged to the statement of profit or loss as revenue expenditure',
          type: 'numeric', unit: '£', answer: 2440,
          exp: 'Everything that is a cost of USING the machine rather than of acquiring it: 900.00 training + 1,200.00 maintenance + 340.00 replacement guard = £2,440.00. The guard is the one that looks capital — it is a physical part of the machine — but it restores the machine to the condition it was already in rather than improving it, so it is revenue.',
        },
        {
          label: 'Operator training is revenue expenditure because:',
          type: 'choice',
          options: [
            'it is a cost of using the asset rather than of bringing it into use',
            'it is a cost of bringing the asset into its working condition',
            'it was paid to a third party rather than to the supplier',
            'it falls below the business’s capitalisation limit',
          ],
          answer: 0,
          exp: 'The test is what the spending achieved, not who was paid or how much. Training makes the people able to use the machine; the machine works whether or not they have been trained, so the cost is not part of getting it into working condition. It is also why training is repeated for every new operator while the machine is capitalised once.',
        },
        {
          label: 'Loss on disposal of the old machine',
          type: 'numeric', unit: '£', answer: 850,
          exp: 'Carrying amount is 15,000.00 − 11,250.00 = £3,750.00. The part exchange allowance of 2,900.00 is the proceeds, so 3,750.00 − 2,900.00 = £850.00 lost. A part exchange is a disposal with the proceeds taken in kind — the fact that no cash changed hands makes no difference to any of this.',
        },
        {
          label: 'That result is reported as:',
          type: 'choice',
          options: [
            'a loss, charged to the statement of profit or loss',
            'a profit, credited to the statement of profit or loss',
            'a loss, added to the cost of the new machine',
            'a profit, deducted from the cost of the new machine',
          ],
          answer: 0,
          exp: 'A profit or loss on disposal is not really a gain or a loss on selling — it is the correction of depreciation charged over the asset’s life, recognised in the year the truth is known. It belongs in profit or loss for that year. Rolling it into the cost of the replacement, which the third and fourth options do, would hide a past mis-estimate inside a new asset and carry it forward for years more.',
        },
      ],
      exp: 'Two decisions and one arithmetic step. Both decisions are about the same question — what did this spending buy? — and both are answered by looking at what changed rather than at what the invoice said. Adding up the first table gives £28,570.00, a figure that is right about nothing.',
    },
    {
      id: 'F-4-27', unitKey: 'faps', lo: 4, criteria: ['FAPS-4.1.2', 'FAPS-4.1.3'],
      type: 'task',
      q: 'Calculate the depreciation charge for the year to 31 December.',
      brief: 'All three assets were held for the whole year and a full year’s depreciation is charged on each.',
      datasets: [
        {
          title: 'Non-current assets at 1 January',
          headers: ['Asset', 'Cost £', 'Accumulated depreciation £', 'Method'],
          rows: [
            ['Delivery van', '28,000.00', '12,600.00', 'Reducing balance, 25%'],
            ['Packing machine', '16,500.00', '6,600.00', 'Straight line, 5 years, no residual value'],
            ['Office fit-out', '9,000.00', '3,600.00', 'Straight line, 5 years, no residual value'],
          ],
        },
      ],
      parts: [
        {
          label: 'Depreciation charge on the delivery van',
          type: 'numeric', unit: '£', answer: 3850,
          exp: 'Reducing balance applies the rate to the CARRYING AMOUNT: 28,000.00 − 12,600.00 = 15,400.00, and 15,400.00 × 25% = £3,850.00. Applying 25% to the 28,000.00 cost gives 7,000.00, which is what this asset was charged in its first year and never again.',
        },
        {
          label: 'Depreciation charge on the packing machine',
          type: 'numeric', unit: '£', answer: 3300,
          exp: 'Straight line applies the rate to COST, and ignores what has been charged so far: 16,500.00 ÷ 5 = £3,300.00, the same figure every year until the asset is fully written down.',
        },
        {
          label: 'Total depreciation charge for the year',
          type: 'numeric', unit: '£', answer: 8950,
          exp: 'The office fit-out is 9,000.00 ÷ 5 = 1,800.00, so 3,850.00 + 3,300.00 + 1,800.00 = £8,950.00. Neither column of the table totals to this: the charge has to be worked out asset by asset, because the method differs by asset and not by business.',
        },
        {
          label: 'The van’s charge falls every year and the machine’s does not because:',
          type: 'choice',
          options: [
            'reducing balance applies the rate to the carrying amount, which falls each year',
            'reducing balance applies the rate to the cost, which falls each year',
            'straight line applies the rate to the carrying amount, which is constant',
            'the van is nearer the end of its useful life than the machine is',
          ],
          answer: 0,
          exp: 'The rate is fixed under both methods; what differs is what it is applied TO. Reducing balance charges a constant percentage of a shrinking base, so the charge shrinks with it — which suits an asset that loses most of its value early, like a vehicle. Straight line charges a constant fraction of a fixed cost, which suits an asset consumed evenly. Cost never falls, so the second option describes something that cannot happen.',
        },
      ],
      exp: 'One year, three assets, two methods — and the whole task turns on remembering which base each method uses. Total the cost column and you get 53,500.00; total the depreciation column and you get 22,800.00; neither is a step towards any of these answers.',
    },
    {
      id: 'F-5-91', unitKey: 'faps', lo: 5, criteria: ['FAPS-5.1.2', 'FAPS-5.1.4', 'FAPS-5.2.3'],
      type: 'task',
      q: 'Make the period end adjustments and state the figures that reach the financial statements.',
      brief: 'The year ended 31 December. Rent is £1,500 a month and eleven months have been paid. The insurance premium covers the year to 31 March. The electricity bill for the quarter to 31 January, £1,860.00, arrived after the year end and is accrued on a time basis. A customer owing £1,600.00 has gone into liquidation and the debt is to be written off. The allowance for doubtful receivables is then to be set at 2% of what remains.',
      datasets: [
        {
          title: 'Trial balance extract at 31 December, before adjustments',
          headers: ['Account', 'Debit £', 'Credit £'],
          rows: [
            ['Rent paid', '16,500.00', '—'],
            ['Insurance paid', '4,800.00', '—'],
            ['Electricity paid', '5,240.00', '—'],
            ['Trade receivables', '42,600.00', '—'],
            ['Allowance for doubtful receivables', '—', '1,100.00'],
          ],
        },
      ],
      parts: [
        {
          label: 'Rent charged to the statement of profit or loss',
          type: 'numeric', unit: '£', answer: 18000,
          exp: 'Eleven months have been paid and twelve have been used, so one month is accrued: 16,500.00 + 1,500.00 = £18,000.00. The accrual is a credit balance carried forward as a liability — the landlord is owed December.',
        },
        {
          label: 'Insurance charged to the statement of profit or loss',
          type: 'numeric', unit: '£', answer: 3600,
          exp: 'The premium covers to 31 March, so three of its twelve months belong to next year: 4,800.00 × 3 ÷ 12 = 1,200.00 prepaid, leaving 4,800.00 − 1,200.00 = £3,600.00. The prepayment is a debit balance carried forward as an asset — cover already bought.',
        },
        {
          label: 'Electricity charged to the statement of profit or loss',
          type: 'numeric', unit: '£', answer: 6480,
          exp: 'Two of the three months in the quarter to 31 January fall before the year end: 1,860.00 × 2 ÷ 3 = 1,240.00 accrued, so 5,240.00 + 1,240.00 = £6,480.00. Accruing the whole 1,860.00 would charge January’s electricity to the year that ended in December.',
        },
        {
          label: 'The allowance for doubtful receivables at 31 December',
          type: 'numeric', unit: '£', answer: 820,
          exp: 'The allowance is set on what is LEFT after the write-off, never on the original figure: 42,600.00 − 1,600.00 = 41,000.00, and 41,000.00 × 2% = £820.00. Applying 2% to 42,600.00 would provide against a debt already removed in full.',
        },
        {
          label: 'Amount by which the allowance is reduced',
          type: 'numeric', unit: '£', answer: 280,
          exp: 'Only the MOVEMENT reaches profit or loss: 1,100.00 − 820.00 = £280.00. The allowance is a standing balance that is adjusted to the figure now required, not an expense recreated from nothing each year — charging the whole 820.00 would double-count the 1,100.00 already provided.',
        },
        {
          label: 'The reduction in the allowance is:',
          type: 'choice',
          options: [
            'credited to the statement of profit or loss, reducing the expense',
            'debited to the statement of profit or loss, increasing the expense',
            'credited to trade receivables, reducing the asset',
            'debited to capital, reducing the owner’s investment',
          ],
          answer: 0,
          exp: 'The allowance is a credit balance sitting against receivables. Reducing it means debiting the allowance account, and the other side of that entry is a credit to profit or loss — a release, which reduces the irrecoverable debts expense for the year and can turn it negative. The asset itself is untouched: the allowance is presented against receivables but is a separate account.',
        },
      ],
      exp: 'Five adjustments, and each one asks the same question in a different disguise: does this belong to the year that has ended? The two that catch people are the ORDER of the write-off and the allowance — the allowance is set on what survives the write-off — and the fact that only the movement on an allowance is an expense. The write-off itself is a separate £1,600.00 charge to irrecoverable debts.',
    },
    {
      id: 'F-6-92', unitKey: 'faps', lo: 6, criteria: ['FAPS-6.2.1', 'FAPS-6.3.2'],
      type: 'task',
      q: 'Complete the extended trial balance.',
      brief: 'Closing inventory has been counted and valued at £11,900.00. It has not yet been entered.',
      datasets: [
        {
          title: 'Extract from the extended trial balance',
          headers: ['Account', 'Ledger Dr £', 'Ledger Cr £', 'Adjustment Dr £', 'Adjustment Cr £'],
          rows: [
            ['Inventory at 1 January', '14,300.00', '—', '—', '—'],
            ['Purchases', '96,400.00', '—', '—', '—'],
            ['Rent', '16,500.00', '—', '1,500.00', '—'],
            ['Accruals', '—', '—', '—', '1,500.00'],
            ['Trade receivables', '42,600.00', '—', '—', '1,600.00'],
            ['Irrecoverable debts', '—', '—', '1,600.00', '—'],
          ],
        },
      ],
      parts: [
        {
          label: 'Adjusted balance on the rent account',
          type: 'numeric', unit: '£', answer: 18000,
          exp: 'A debit balance with a debit adjustment gets larger: 16,500.00 + 1,500.00 = £18,000.00. The matching credit sits on the accruals line, which is what keeps the adjustment columns equal to one another.',
        },
        {
          label: 'Adjusted balance on trade receivables',
          type: 'numeric', unit: '£', answer: 41000,
          exp: 'A debit balance with a credit adjustment gets smaller: 42,600.00 − 1,600.00 = £41,000.00. Its other side is the irrecoverable debts line, so the same 1,600.00 appears once as a reduction in an asset and once as an expense.',
        },
        {
          label: 'Closing inventory is entered on the extended trial balance as:',
          type: 'choice',
          options: [
            'a debit in the statement of financial position and a credit in the statement of profit or loss',
            'a credit in the statement of financial position and a debit in the statement of profit or loss',
            'a debit in both the statement of financial position and the statement of profit or loss',
            'a credit in both the statement of financial position and the statement of profit or loss',
          ],
          answer: 0,
          exp: 'Closing inventory is the one figure that appears twice, on opposite sides, and is the reason it has no ledger balance to adjust. It is an asset the business still holds, so it is a debit in the statement of financial position; and it is stock bought but not sold, so it is credited in profit or loss to take it back out of cost of sales. Two entries, two statements, one figure.',
        },
        {
          label: 'Cost of sales for the year',
          type: 'numeric', unit: '£', answer: 98800,
          exp: 'Opening inventory plus purchases less closing inventory: 14,300.00 + 96,400.00 − 11,900.00 = £98,800.00. Nothing in the adjustment columns touches it — the rent accrual and the write-off are both expenses of other kinds — so a reader who adds the adjustment column into cost of sales has moved £3,100.00 into the wrong line.',
        },
      ],
      exp: 'An extended trial balance is a working paper, and the only rule it obeys is that every adjustment has two sides: the adjustment debit column and the adjustment credit column each total £3,100.00 here, which is the check to make before extending anything. Closing inventory is the exception that proves it — it has no ledger balance at all, and it is entered as two new lines rather than as an adjustment to an old one.',
    },
    {
      id: 'F-7-56', unitKey: 'faps', lo: 7, criteria: ['FAPS-7.1.2', 'FAPS-7.2.1'],
      type: 'task',
      q: 'Prepare the sole trader’s results for the year to 31 December.',
      brief: 'There were no non-current assets, no receivables and no payables at either year end.',
      datasets: [
        {
          title: 'Balances at 31 December',
          headers: ['Account', 'Amount £'],
          rows: [
            ['Revenue', '214,500.00'],
            ['Inventory at 1 January', '14,300.00'],
            ['Purchases', '128,700.00'],
            ['Inventory at 31 December', '16,900.00'],
            ['Distribution costs', '21,400.00'],
            ['Administrative expenses', '33,600.00'],
            ['Drawings', '18,000.00'],
            ['Capital at 1 January', '62,400.00'],
          ],
        },
      ],
      parts: [
        {
          label: 'Cost of sales',
          type: 'numeric', unit: '£', answer: 126100,
          exp: 'Opening inventory plus purchases less closing inventory: 14,300.00 + 128,700.00 − 16,900.00 = £126,100.00. Closing inventory is deducted because it was bought but not sold, so its cost belongs to next year’s sales rather than this year’s.',
        },
        {
          label: 'Gross profit',
          type: 'numeric', unit: '£', answer: 88400,
          exp: 'Revenue less cost of sales: 214,500.00 − 126,100.00 = £88,400.00. Nothing else reaches this line — gross profit measures the trade itself, before any of the cost of running the business.',
        },
        {
          label: 'Profit for the year',
          type: 'numeric', unit: '£', answer: 33400,
          exp: 'Gross profit less the operating expenses: 88,400.00 − 21,400.00 − 33,600.00 = £33,400.00. Drawings are not among them, which is what the fourth part turns on.',
        },
        {
          label: 'Capital at 31 December',
          type: 'numeric', unit: '£', answer: 77800,
          exp: 'Opening capital plus profit less drawings: 62,400.00 + 33,400.00 − 18,000.00 = £77,800.00. This is the figure no column total gives — the £ column adds to 509,800.00, which is a mixture of income, expenses, assets and capital and means nothing at all.',
        },
        {
          label: 'Drawings do not appear in the statement of profit or loss because:',
          type: 'choice',
          options: [
            'they are the owner taking back capital, not a cost of trading',
            'they are a cost of trading that is charged to capital instead',
            'they are an expense deducted after the profit has been struck',
            'they are drawn out of profit, so they reduce revenue instead',
          ],
          answer: 0,
          exp: 'A sole trader’s business is not a separate legal person, but it IS a separate accounting entity — that is the whole basis on which a set of accounts for it can be prepared. Money the owner takes out is the entity returning what the owner put in, not a cost the entity incurred in trading. Treating drawings as an expense would understate the profit the business actually made and, in a bad year, make a profitable trade look like a loss.',
        },
      ],
      exp: 'Four figures in a chain, each feeding the next, and one decision at the end that decides where a fifth belongs. The dataset is deliberately not in the order the statement uses: closing inventory sits above two expenses that have nothing to do with cost of sales, and capital and drawings sit at the bottom among the trading figures.',
    },
    {
      id: 'F-7-57', unitKey: 'faps', lo: 7, criteria: ['FAPS-7.3.2', 'FAPS-7.3.4'],
      type: 'task',
      q: 'Appropriate the partnership’s profit for the year to 30 June.',
      brief: 'Rowe and Fenn share residual profits and losses 3:2. Salaries and interest on capital are appropriations, not expenses.',
      datasets: [
        {
          title: 'Rowe and Fenn — year to 30 June',
          headers: ['Item', 'Amount £'],
          rows: [
            ['Profit for the year', '96,000.00'],
            ['Rowe — partner’s salary', '14,000.00'],
            ['Fenn — partner’s salary', '9,000.00'],
            ['Rowe — interest on capital', '3,200.00'],
            ['Fenn — interest on capital', '2,400.00'],
            ['Rowe — drawings', '26,000.00'],
            ['Fenn — drawings', '21,000.00'],
          ],
        },
      ],
      parts: [
        {
          label: 'Profit available to share after salaries and interest on capital',
          type: 'numeric', unit: '£', answer: 67400,
          exp: 'Take the appropriations off the profit before the ratio is applied: 96,000.00 − 14,000.00 − 9,000.00 − 3,200.00 − 2,400.00 = £67,400.00. Salaries and interest are not expenses of the partnership — they are the first slices of its profit, which is why they never touch the statement of profit or loss.',
        },
        {
          label: 'Rowe’s share of the residual profit',
          type: 'numeric', unit: '£', answer: 40440,
          exp: 'Three fifths of what is left: 67,400.00 × 3 ÷ 5 = £40,440.00. Fenn takes the other two fifths, 26,960.00, and the two add back to 67,400.00 — the check worth making every time, because a ratio applied to the wrong base is the commonest error in this task.',
        },
        {
          label: 'Fenn’s total share of profit for the year',
          type: 'numeric', unit: '£', answer: 38360,
          exp: 'Everything Fenn is entitled to: 9,000.00 salary + 2,400.00 interest + 26,960.00 residual = £38,360.00. Drawings are not part of it — what a partner takes out during the year has no bearing on what they have earned.',
        },
        {
          label: 'Movement on Rowe’s current account for the year',
          type: 'numeric', unit: '£', answer: 31640,
          exp: 'Credited with everything earned and debited with everything taken: 14,000.00 + 3,200.00 + 40,440.00 − 26,000.00 = £31,640.00 increase. Rowe has earned £57,640.00 and drawn £26,000.00, so the difference stays in the business.',
        },
        {
          label: 'Interest on capital is:',
          type: 'choice',
          options: [
            'debited to the appropriation account and credited to the partner’s current account',
            'debited to the appropriation account and credited to the partner’s capital account',
            'charged as an expense in the partnership’s statement of profit or loss',
            'credited to the appropriation account and debited to the partner’s current account',
          ],
          answer: 0,
          exp: 'Capital accounts hold what a partner has agreed to invest and change only when that agreement changes; current accounts hold the running score of earnings and drawings. Interest on capital is an earning, so it belongs in the current account — putting it in the capital account would grow the base on which next year’s interest is calculated and compound something the partners never agreed to.',
        },
      ],
      exp: 'A partnership’s profit is not shared until the agreement has been honoured — salaries first, then interest on capital, then the ratio on what is left. Drawings appear in the dataset and belong in none of the appropriation arithmetic; they are there because a reader who sweeps up every row gets 171,600.00 and a reader who reads the agreement gets four right answers.',
    },
    {
      id: 'F-8-27', unitKey: 'faps', lo: 8, criteria: ['FAPS-8.1.1', 'FAPS-8.2.1'],
      type: 'task',
      q: 'Calculate the profitability ratios for Year 2 and say what they show.',
      brief: 'Give each percentage to one decimal place.',
      datasets: [
        {
          title: 'Two years compared',
          headers: ['Item', 'Year 1 £', 'Year 2 £'],
          rows: [
            ['Revenue', '420,000.00', '486,000.00'],
            ['Cost of sales', '252,000.00', '311,040.00'],
            ['Distribution and administrative expenses', '109,200.00', '126,360.00'],
            ['Capital employed', '290,000.00', '320,000.00'],
          ],
        },
      ],
      parts: [
        {
          label: 'Gross profit margin for Year 2, as a percentage',
          type: 'numeric', unit: '%', answer: 36,
          exp: 'Gross profit is 486,000.00 − 311,040.00 = 174,960.00, and the margin is that over revenue: 174,960.00 ÷ 486,000.00 = 0.36, or 36.0%. In Year 1 it was 168,000.00 ÷ 420,000.00 = 0.4, or 40.0%, so the margin has fallen even though revenue rose.',
        },
        {
          label: 'Operating profit margin for Year 2, as a percentage',
          type: 'numeric', unit: '%', answer: 10,
          exp: 'Operating profit is 174,960.00 − 126,360.00 = 48,600.00, so the margin is 48,600.00 ÷ 486,000.00 = 0.1, or 10.0%. Year 1 was 58,800.00 ÷ 420,000.00 = 0.14, or 14.0% — the fall is larger than the fall in gross margin, because expenses grew as well.',
        },
        {
          label: 'Return on capital employed for Year 2, as a percentage',
          type: 'numeric', unit: '%', answer: 15.2,
          exp: 'Operating profit over capital employed: 48,600.00 ÷ 320,000.00 = 0.151875, which is 15.2% to one decimal place. Year 1 was 58,800.00 ÷ 290,000.00 = 0.202758, or 20.3%. More money is invested in the business and it is earning less on it.',
        },
        {
          label: 'The fall in gross profit margin from Year 1 to Year 2 shows that:',
          type: 'choice',
          options: [
            'each £1 of revenue is producing less gross profit than it did',
            'each £1 of revenue is producing more gross profit than it did',
            'the business sold fewer goods than it did in the previous year',
            'expenses other than cost of sales rose faster than revenue did',
          ],
          answer: 0,
          exp: 'A margin is a rate, not an amount: it says what each pound of revenue leaves behind, and it can fall while gross profit in pounds rises — which is exactly what happened, since gross profit grew from 168,000.00 to 174,960.00. The third option confuses a rate with a volume, and the fourth describes what the operating margin would show, not the gross one.',
        },
      ],
      exp: 'Every ratio here is a fraction whose numerator has to be built before it can be used, and the numerator is never a row of the table. Reading revenue and capital employed straight off the dataset and dividing one by the other produces a number, and it is not a profitability ratio.',
    },
    {
      id: 'F-9-27', unitKey: 'faps', lo: 9, criteria: ['FAPS-9.1.1', 'FAPS-9.2.2'],
      type: 'task',
      q: 'Reconstruct the missing figures for the year.',
      brief: 'The owner keeps no sales records. All sales are made at a mark-up of 40% on cost. There were no trade receivables at the start of the year.',
      datasets: [
        {
          title: 'What is known',
          headers: ['Item', 'Amount £'],
          rows: [
            ['Inventory at 1 January', '12,400.00'],
            ['Purchases for the year', '88,000.00'],
            ['Inventory at 31 December', '15,600.00'],
            ['Cash from sales banked during the year', '96,300.00'],
            ['Cash taken from the till by the owner', '4,200.00'],
          ],
        },
      ],
      parts: [
        {
          label: 'Cost of sales for the year',
          type: 'numeric', unit: '£', answer: 84800,
          exp: 'The one figure that can be built from records the owner did keep: 12,400.00 + 88,000.00 − 15,600.00 = £84,800.00. Incomplete records work backwards from whatever is complete, and inventory and purchases usually are, because both leave paperwork behind.',
        },
        {
          label: 'Revenue for the year',
          type: 'numeric', unit: '£', answer: 118720,
          exp: 'A MARK-UP is a percentage of COST, so revenue is cost of sales plus 40% of it: 84,800.00 × 1.4 = £118,720.00. The £96,300.00 banked is not revenue — it is what reached the bank, which is a different question.',
        },
        {
          label: 'Owed by credit customers at 31 December',
          type: 'numeric', unit: '£', answer: 18220,
          exp: 'Everything sold, less everything collected in cash, whether banked or taken: 118,720.00 − 96,300.00 − 4,200.00 = £18,220.00. Forgetting the money the owner took from the till before banking overstates receivables by that £4,200.00 — takings that never reached the bank were still takings.',
        },
        {
          label: 'A colleague calculates revenue as cost of sales ÷ 0.6. They have:',
          type: 'choice',
          options: [
            'treated the 40% as a margin on revenue rather than a mark-up on cost',
            'treated the 40% as a mark-up on cost rather than a margin on revenue',
            'applied the percentage to gross profit rather than to cost of sales',
            'applied the percentage to opening inventory rather than to purchases',
          ],
          answer: 0,
          exp: 'Dividing by 0.6 assumes cost is 60% of revenue, which is what a 40% MARGIN means. A 40% mark-up means gross profit is 40% of COST, so cost is 100/140 of revenue and the multiplier is 1.4. The two give very different answers from the same percentage, which is why the wording of the question matters more here than the arithmetic.',
        },
        {
          label: 'Revenue if the 40% had been a margin instead',
          type: 'numeric', unit: '£', answer: 141333.33,
          exp: '84,800.00 ÷ 0.6 = £141,333.33. That is £22,613.33 more than the mark-up gives, on the same cost of sales and the same percentage — the size of the gap is the reason the distinction is worth being certain about.',
        },
      ],
      exp: 'Incomplete records is a chain of inference and every link has to hold: inventory and purchases give cost of sales, the mark-up gives revenue, and revenue against cash gives what is still owed. The two cash rows are the ones a reader is most likely to misuse — banked cash looks like revenue and is not, and the owner’s takings look irrelevant and are not.',
    },
  ];

  var API = { AAT3_FAPS_PATH: PATH, AAT3_FAPS_PRACTICE: { QUESTIONS: QUESTIONS } };

  if (typeof module === 'object' && module.exports) module.exports = API;
  else { root.AAT3_FAPS_PATH = PATH; root.AAT3_FAPS_PRACTICE = { QUESTIONS: QUESTIONS }; }
}(typeof self !== 'undefined' ? self : this));
