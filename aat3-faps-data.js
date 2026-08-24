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
            opts: ['An acquisition was posted to the ledger and never added to the register', 'A disposal was removed from the register and never posted to the ledger', 'The depreciation charge was computed on the wrong useful life', 'The depreciation journal was posted twice in the same period'],
            ans: 0,
            exp: 'The ledger holding more cost than the register means the register is short of an asset, which points at an acquisition that reached the double entry and not the memorandum record. A disposal removed only from the register would leave the register short too, but of an asset the ledger still carries — the difference is which record is behind.',
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
  };

  var PATH = [LO1, LO3, LO4];

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
  ];

  var API = { AAT3_FAPS_PATH: PATH, AAT3_FAPS_PRACTICE: { QUESTIONS: QUESTIONS } };

  if (typeof module === 'object' && module.exports) module.exports = API;
  else { root.AAT3_FAPS_PATH = PATH; root.AAT3_FAPS_PRACTICE = { QUESTIONS: QUESTIONS }; }
}(typeof self !== 'undefined' ? self : this));
