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
              'They share one feature that the others do not. Each of the three is deciding whether to commit money to the business, or whether to leave money already committed where it is, and none of them can require the business to hand over the information they need. A tax inspector can demand records. A manager already has them. An investor considering a purchase has only what the business chooses to publish, which is why the rules are written to protect that reader in particular.',
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
              'The three decisions pull on different parts of the accounts, which is why both statements exist rather than one.',
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
              'Timeliness and verifiability pull in opposite directions and the tension is real. Waiting for the final invoice makes an accrual verifiable; publishing before the year is stale makes it timely. Neither wins outright, which is why the characteristics are called enhancing rather than mandatory.',
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
  };

  var PATH = [LO1];

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
  ];

  var API = { AAT3_FAPS_PATH: PATH, AAT3_FAPS_PRACTICE: { QUESTIONS: QUESTIONS } };

  if (typeof module === 'object' && module.exports) module.exports = API;
  else { root.AAT3_FAPS_PATH = PATH; root.AAT3_FAPS_PRACTICE = { QUESTIONS: QUESTIONS }; }
}(typeof self !== 'undefined' ? self : this));
