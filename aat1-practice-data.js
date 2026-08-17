/* AAT Level 1 — Bookkeeping Fundamentals: practice question bank.
 *
 * SEPARATE FROM THE LESSON CHECKS, AND DELIBERATELY SO
 *
 * The questions inside a lesson are formative: they follow the teaching
 * immediately and test whether the page just read was understood. These are
 * different work. They assume the lesson is done, they are not sequenced to
 * follow any particular card, and they are meant to be met cold — which is the
 * only condition under which a right answer means anything.
 *
 * No question here repeats a lesson-check stem. scripts/check-aat1-quality.js
 * enforces that across both files, because a "practice" bank that quietly
 * re-asks the lesson measures recall of a page rather than knowledge of a rule.
 *
 * SHAPE
 *
 * Every question carries `lo` (the outcome it belongs to) and `criteria` (the
 * scope items it tests, checked against aat1-syllabus.js). The `lo` field is
 * what the by-outcome picker filters on; a mixed run ignores it.
 *
 * The six types the Level 1 player renders are all used: mcq, truefalse,
 * numeric, gapfill, match and ordering. The mix leans towards match and
 * ordering more heavily than the lesson checks do, because recognition and
 * sequence are what this unit actually asks for — which document, which column,
 * which daybook, in which order — and a four-option multiple choice is a poor
 * instrument for any of those.
 *
 * WEIGHTING
 *
 * Question counts follow the published assessment weightings rather than being
 * spread evenly, so a mixed run is representative: Outcome 4 at 34% carries the
 * most questions and Outcomes 2 and 5 at 10% carry the fewest. An even spread
 * would over-test the two smallest outcomes by a factor of three.
 */
(function (root) {
  'use strict';

  var F = (typeof require === 'function' && typeof module === 'object')
    ? require('./aat1-syllabus.js').FACTS
    : root.AAT1_FACTS;

  var VAT = F.vat.standardRate.label;

  var QUESTIONS = [

    /* ── Outcome 1 — the role of the bookkeeper (17%) ───────────────────── */
    {
      id: 'P1-01', lo: 1, criteria: ['BKFN-1.1.1'],
      type: 'mcq',
      q: 'Which of these is a named duty of a bookkeeper?',
      opts: [
        'Preparing information used by managers in making decisions',
        'Deciding the selling price of the business’s products',
        'Approving which suppliers the business trades with',
        'Setting the business’s payment terms for customers',
      ],
      ans: 0,
      exp: 'The specification names preparing information used in decisions as a duty — the bookkeeper produces the figures, other people act on them. Setting prices, choosing suppliers and setting payment terms are management decisions, not bookkeeping ones.',
    },
    {
      id: 'P1-02', lo: 1, criteria: ['BKFN-1.2.1'],
      type: 'mcq',
      q: 'A sales invoice for £820 is recorded in the sales daybook as £280. What happens to the reported figures?',
      opts: [
        'Income is understated, so profit is understated too',
        'Income is overstated, so profit is overstated too',
        'Income is understated but profit is unaffected',
        'Only the customer’s balance is affected; the totals are unchanged',
      ],
      ans: 0,
      exp: 'Recording £280 instead of £820 makes income £540 too low — understated. Profit is income less expenses, so it falls by the same £540. The customer’s balance is wrong as well, but the totals are certainly affected: an error in a daybook flows into every figure built from it.',
    },
    {
      id: 'P1-03', lo: 1, criteria: ['BKFN-1.2.1', 'BKFN-1.2.2'],
      type: 'truefalse',
      q: 'Identify whether each consequence follows mainly from information being late rather than from it being wrong.',
      labels: ['Mainly lateness', 'Mainly inaccuracy'],
      statements: [
        { text: 'A compliance deadline is missed.', answer: true },
        { text: 'A customer is chased for an invoice they have already paid.', answer: false },
        { text: 'A supplier is overpaid by £400.', answer: false },
        { text: 'A report describes the business as it was three weeks ago.', answer: true },
      ],
      exp: 'Missed deadlines and out-of-date reports are lateness consequences — nothing was miscalculated. Chasing a paid invoice and overpaying a supplier are accuracy consequences: both come from a figure or an entry being wrong rather than from a delay.',
    },
    {
      id: 'P1-04', lo: 1, criteria: ['BKFN-1.2.3'],
      type: 'mcq',
      q: 'A bookkeeper is asked to process a transaction of a kind they have not met before. Which named action applies?',
      opts: [
        'Discuss the item with their supervisor first',
        'Process it as best they can and note the uncertainty',
        'Leave it until the end of the period and process it then',
        'Ask a colleague at the same level how they would treat it',
      ],
      ans: 0,
      exp: 'The specification names discussing an item with your supervisor when you are not sure how to process it. Guessing produces exactly the errors the whole topic is about, and deferring it turns an accuracy problem into a timeliness one.',
    },
    {
      id: 'P1-05', lo: 1, criteria: ['BKFN-1.2.3'],
      type: 'match',
      q: 'Match each action to the group of safeguards it belongs to.',
      left: [
        'Identify how long each item of work requires',
        'Do not take on work beyond your ability',
        'Check that totals agree to expectation',
        'Have a second person review the work',
      ],
      right: [
        'Planning the work',
        'Knowing your limits',
        'Checking the output',
        'Using the help available',
      ],
      exp: 'The fourteen named actions fall into four groups, and identifying the group is usually enough to reach the right answer. Estimating durations is planning; declining work beyond your ability is a limit; a size check on a total is a check; and a second reviewer is help you bring in.',
    },
    {
      id: 'P1-06', lo: 1, criteria: ['BKFN-1.3.1'],
      type: 'mcq',
      q: 'A bookkeeper claims on a job application to hold a qualification they have not completed. Which principle does this breach most directly?',
      opts: [
        'Integrity',
        'Objectivity',
        'Confidentiality',
        'Professional competence and due care',
      ],
      ans: 0,
      exp: 'Integrity requires being straightforward and honest in professional relationships, and a false claim about a qualification is a plain dishonesty. Professional behaviour is also engaged, since it covers conduct that discredits the profession — but the direct breach is of integrity.',
    },
    {
      id: 'P1-07', lo: 1, criteria: ['BKFN-1.3.1'],
      type: 'gapfill',
      q: 'Complete the description of a fundamental principle.',
      template: 'The principle of {0} requires that judgement is not overridden by bias, conflict of interest or the influence of others, while {1} requires compliance with relevant laws and regulations.',
      gaps: [
        { options: ['objectivity', 'integrity', 'confidentiality'], answer: 0 },
        { options: ['professional behaviour', 'due care', 'objectivity'], answer: 0 },
      ],
      exp: 'Objectivity is the principle about influence displacing judgement. Professional behaviour is the broadest of the five and carries legal and regulatory compliance, which is why data protection and the anti-money-laundering framework sit under it.',
    },
    {
      id: 'P1-08', lo: 1, criteria: ['BKFN-1.3.2'],
      type: 'truefalse',
      q: 'A bookkeeper discusses a client’s financial difficulties with a friend at a social event. Identify what this may amount to.',
      labels: ['Yes', 'No'],
      statements: [
        { text: 'Unauthorised sharing of information.', answer: true },
        { text: 'A breach of the AAT Code of Professional Ethics.', answer: true },
        { text: 'A possible breach of their employment contract.', answer: true },
        { text: 'Acceptable, provided the client is not named.', answer: false },
      ],
      exp: 'Discussing a client’s affairs with somebody who has no right to the information is unauthorised sharing, and breaches both the ethical code and the confidentiality term in most employment contracts. Withholding the name is no defence where the client is identifiable from the circumstances.',
    },
    {
      id: 'P1-09', lo: 1, criteria: ['BKFN-1.3.3'],
      type: 'mcq',
      q: 'Which safeguard best addresses the risk of confidential information being overheard?',
      opts: [
        'Not discussing confidential matters where others may hear',
        'Using a locking screensaver on every machine',
        'Encrypting files stored on a laptop',
        'Installing anti-virus software on every machine',
      ],
      ans: 0,
      exp: 'The specification names the visual and audible routes separately: not leaving information where it can be seen, and not discussing it where it can be heard. Screensavers, encryption and anti-virus all protect data at rest or in transit, not a conversation in an open-plan office or a lift.',
    },
    {
      id: 'P1-10', lo: 1, criteria: ['BKFN-1.3.3'],
      type: 'match',
      q: 'Match each situation to the safeguard that addresses it.',
      left: [
        'A colleague wants to use your login while you are away',
        'Files are held on a laptop that may be stolen',
        'Staff work from home over their own broadband',
        'Paper records are kept in an unlocked office',
      ],
      right: [
        'Not sharing passwords',
        'Encryption',
        'Using a secure network',
        'Physical access restrictions',
      ],
      exp: 'Each has a specific answer. Sharing a login also attributes everything done with it to you. Encryption makes a stolen file unreadable. A secure network protects data crossing a connection nobody in the business controls. And hard-copy records need physical restrictions, since no software protects a filing cabinet.',
    },
    {
      id: 'P1-11', lo: 1, criteria: ['BKFN-1.4.1'],
      type: 'mcq',
      q: 'A bookkeeper suspects money laundering and mentions it to the client to give them a chance to explain. Why is this wrong?',
      opts: [
        'Alerting the person concerned is a separate offence',
        'The client will simply deny it, so the conversation is pointless',
        'The suspicion should be raised with the client only in writing',
        'It is only wrong if the suspicion turns out to be correct',
      ],
      ans: 0,
      exp: 'Tipping off the subject of a suspicion is an offence in its own right, and establishing what happened belongs to people with the powers for it. The duty is to report through the proper channel — recognise, report, hand over — whether or not the suspicion is later borne out.',
    },
    {
      id: 'P1-12', lo: 1, criteria: ['BKFN-1.4.1'],
      type: 'gapfill',
      q: 'Complete the statement of the money laundering obligations.',
      template: 'Bookkeeping is an {0} for these purposes, and failing to report a suspicion of money laundering is itself a {1}.',
      gaps: [
        { options: ['accountancy service', 'audit activity', 'exempt activity'], answer: 0 },
        { options: ['criminal offence', 'regulatory breach', 'disciplinary matter'], answer: 0 },
      ],
      exp: 'Being an accountancy service is what brings bookkeeping inside the regulated sector. And the failure to report is a crime rather than merely a rule breach — which is why staying out of it is the punishable option rather than the cautious one.',
    },
    {
      id: 'P1-13', lo: 1, criteria: ['BKFN-1.1.1', 'BKFN-1.2.1'],
      type: 'mcq',
      q: 'Why is a bookkeeper’s work described as carrying particular responsibility even when the individual errors are small?',
      opts: [
        'Other people act on the output and cannot verify it',
        'Bookkeepers are personally liable for the tax the business pays',
        'Every entry is checked by an external auditor',
        'Small errors accumulate into large ones over a year',
      ],
      ans: 0,
      exp: 'The owner, the accountant, HMRC and the suppliers all treat the figures as fact, and none of them can check them independently. There is no personal liability for the tax, and there is usually no external check at all — which is precisely the point.',
    },

    /* ── Outcome 2 — understand financial transactions (10%) ─────────────── */
    {
      id: 'P2-01', lo: 2, criteria: ['BKFN-2.1.1'],
      type: 'match',
      q: 'Classify each of these into one of the six kinds of item.',
      left: [
        'Stock held for resale',
        'A loan from the bank',
        'Interest received on the bank balance',
        'Insurance paid for the year',
      ],
      right: ['Asset', 'Liability', 'Income', 'Expense'],
      exp: 'Stock is owned, so an asset. A loan is owed, so a liability. Interest received is earned — income, even though it does not come from sales. Insurance is consumed in the course of trading, so an expense.',
    },
    {
      id: 'P2-02', lo: 2, criteria: ['BKFN-2.1.1'],
      type: 'truefalse',
      q: 'Identify whether each item is a liability of the business.',
      labels: ['Liability', 'Not a liability'],
      statements: [
        { text: 'VAT owed to HMRC.', answer: true },
        { text: 'A bank overdraft.', answer: true },
        { text: 'Money owed by a customer.', answer: false },
        { text: 'Shop fittings owned by the business.', answer: false },
      ],
      exp: 'VAT owed and an overdraft are both amounts the business owes, so both are liabilities. Money owed *by* a customer is a receivable and therefore an asset, and shop fittings are owned. The direction of the obligation is what decides it.',
    },
    {
      id: 'P2-03', lo: 2, criteria: ['BKFN-2.1.3'],
      type: 'mcq',
      q: 'A business receives an electricity bill and pays it immediately from the bank. What are the two effects?',
      opts: [
        'Bank decreases; an expense increases',
        'Bank decreases; a liability decreases',
        'Bank decreases; capital decreases',
        'An expense increases; a liability increases',
      ],
      ans: 0,
      exp: 'Money leaves the bank and an expense arises — the electricity has been consumed and nothing of value remains. There is no liability step because the bill was paid at once; had it been left unpaid, a liability would have arisen first and been settled later.',
    },
    {
      id: 'P2-04', lo: 2, criteria: ['BKFN-2.1.3'],
      type: 'mcq',
      q: 'A business sells goods for £700 on credit. What are the two effects?',
      opts: [
        'A receivable increases £700; sales increase £700',
        'Bank increases £700; sales income increases £700',
        'A receivable increases £700; bank decreases £700',
        'Sales income increases £700; a payable increases £700',
      ],
      ans: 0,
      exp: 'On credit, no money moves yet — the business gains a right to be paid, which is an asset, and records the income. The cash version of the same sale would increase the bank instead of creating a receivable; the income is identical either way.',
    },
    {
      id: 'P2-05', lo: 2, criteria: ['BKFN-2.2.1', 'BKFN-2.2.2'],
      type: 'mcq',
      q: 'A business has assets of £26,000 and capital of £15,000. What must its liabilities be?',
      opts: [
        '£11,000',
        '£41,000',
        '£15,000',
        'It cannot be determined',
      ],
      ans: 0,
      exp: 'Assets = liabilities + capital, so liabilities are £26,000 − £15,000 = £11,000. Note that this level asks you to understand the relationship rather than to calculate missing entries from it — but reading the direction of it correctly is fair game.',
    },
    {
      id: 'P2-06', lo: 2, criteria: ['BKFN-2.2.2'],
      type: 'gapfill',
      q: 'Complete the sentence about profit and capital.',
      template: 'Profit belongs to the {0}, so making a profit {1} capital.',
      gaps: [
        { options: ['owner', 'business', 'bank'], answer: 0 },
        { options: ['increases', 'decreases', 'does not change'], answer: 0 },
      ],
      exp: 'Accounting treats the business as separate from its owner, and profit is the owner’s. So earning it increases what the business owes back to them, which is capital. A loss reduces capital by the same logic.',
    },
    {
      id: 'P2-07', lo: 2, criteria: ['BKFN-2.2.3'],
      type: 'mcq',
      q: 'A set of records does not balance. What does this tell you?',
      opts: [
        'Something has been recorded incorrectly',
        'The business has made a loss for the period',
        'A transaction has affected only one item',
        'Capital needs adjusting to bring the two sides into line',
      ],
      ans: 0,
      exp: 'Because every transaction changes at least two items in a way that keeps both sides equal, the equation balances automatically. So a failure to balance is proof of an error, not a fact about the business — and adjusting capital to force it would hide the error rather than fix it.',
    },
    {
      id: 'P2-08', lo: 2, criteria: ['BKFN-2.1.3'],
      type: 'truefalse',
      q: 'Identify whether each transaction changes two items on the same side of the accounting equation.',
      labels: ['Same side', 'Both sides'],
      statements: [
        { text: 'Buying a computer for cash.', answer: true },
        { text: 'A customer settling an invoice.', answer: true },
        { text: 'Taking out a bank loan.', answer: false },
        { text: 'The owner paying money into the business.', answer: false },
      ],
      exp: 'Buying for cash and receiving payment both swap one asset for another, so both changes are on the assets side and the totals do not move. A loan raises assets and liabilities, and an owner’s investment raises assets and capital — both cross the equation.',
    },

    /* ── Outcome 3 — customer and supplier transactions (29%) ────────────── */
    {
      id: 'P3-01', lo: 3, criteria: ['BKFN-3.1.1'],
      type: 'mcq',
      q: 'A business buys stock and pays the supplier at the time of collection. What has arisen?',
      opts: [
        'A cash purchase, creating no payable',
        'A credit purchase, creating a payable',
        'A cash sale, creating no receivable',
        'A credit purchase, creating a receivable',
      ],
      ans: 0,
      exp: 'Paid at the time makes it a cash purchase, and nothing is left outstanding — so no payable arises. Only credit trading leaves an amount owed, and a purchase could never create a receivable, which is money owed *to* the business.',
    },
    {
      id: 'P3-02', lo: 3, criteria: ['BKFN-3.1.2'],
      type: 'mcq',
      q: 'Which document does a business send to a supplier to instruct them to supply goods?',
      opts: [
        'A purchase order',
        'A sales order',
        'A quotation',
        'A goods received note',
      ],
      ans: 0,
      exp: 'The buyer raises a purchase order. The seller records the same event as a sales order in their own records. A quotation states a price before anybody commits, and a goods received note is made after the delivery arrives.',
    },
    {
      id: 'P3-03', lo: 3, criteria: ['BKFN-3.1.2'],
      type: 'match',
      q: 'Match each document to its purpose.',
      left: [
        'Quotation',
        'Delivery note',
        'Goods returned note',
        'Cash receipt',
      ],
      right: [
        'States a price before the customer commits to anything',
        'Travels with the goods and is signed on arrival',
        'Records goods sent back, supporting a request for a credit note',
        'Confirms that a payment has been received',
      ],
      exp: 'Only two of the nine documents change what is owed — the invoice and the credit note. These four are all evidence or acknowledgement: a price offered, a delivery made, goods returned, money received.',
    },
    {
      id: 'P3-04', lo: 3, criteria: ['BKFN-3.1.2'],
      type: 'ordering',
      q: 'Put these in the order they arise for one credit purchase.',
      items: [
        'The business sends a purchase order to the supplier',
        'The goods arrive and a goods received note is raised',
        'The supplier’s purchase invoice arrives',
        'The invoice is checked against the order and the goods received note',
        'The supplier is paid, with a remittance advice',
      ],
      exp: 'Order, receive, be invoiced, check, pay. The check comes after the invoice arrives and before any money moves — which is the whole point of raising a purchase order and a goods received note in the first place.',
    },
    {
      id: 'P3-05', lo: 3, criteria: ['BKFN-3.2.1'],
      type: 'mcq',
      q: 'A customer was quoted £14.00 a unit, but the current price list shows £16.00. Which price should the sales invoice use?',
      opts: [
        '£14.00 — the price agreed with this customer',
        '£16.00 — the price list is the current price',
        '£15.00 — the average of the two',
        '£16.00, with a credit note for the difference',
      ],
      ans: 0,
      exp: 'A quotation is a price agreed with that customer, and it takes precedence over the list price, which is the default for everybody else. Invoicing £16.00 would be a straightforward dispute — and issuing a credit note to fix it is work that need not have arisen.',
    },
    {
      id: 'P3-06', lo: 3, criteria: ['BKFN-3.2.2'],
      type: 'mcq',
      q: 'What is the customer reference on a sales invoice for?',
      opts: [
        'It lets the customer match the invoice to their order',
        'It identifies the invoice within the seller’s numbering sequence',
        'It records which member of staff raised the invoice',
        'It identifies the product being charged for',
      ],
      ans: 0,
      exp: 'The customer reference exists for the customer’s benefit — a business receiving fifty invoices a week matches each to its own order with it. The invoice number is the seller’s identifier, and the product code identifies the item.',
    },
    {
      id: 'P3-07', lo: 3, criteria: ['BKFN-3.2.3'],
      type: 'numeric',
      q: 'A customer buys 22 units at £7.50 each, with no discount. What is the total including VAT at the standard rate, in pounds?',
      answer: 198, unit: '£',
      exp: '22 × £7.50 = £165.00 net. VAT at ' + VAT + ' is a fifth: £33.00. Total £198.00 — or directly, £165.00 × 1.2 = £198.00.',
    },
    {
      id: 'P3-08', lo: 3, criteria: ['BKFN-3.2.3'],
      type: 'numeric',
      q: 'An invoice line extends to £480.00 before a 15% quantity discount. What is the net amount, in pounds?',
      answer: 408, unit: '£',
      exp: '15% of £480.00 is £72.00, so the net is £408.00. VAT would then be £81.60 on the discounted figure — calculating it on £480.00 would overstate both the VAT and the total, because VAT is charged on what the customer is actually charged.',
    },
    {
      id: 'P3-09', lo: 3, criteria: ['BKFN-3.2.3'],
      type: 'numeric',
      q: 'An invoice has two lines: 30 units at £4.00 and 12 units at £9.50. There is no discount. What is the VAT at the standard rate, in pounds?',
      answer: 46.8, unit: '£',
      exp: '30 × £4.00 = £120.00 and 12 × £9.50 = £114.00, so the net is £234.00. VAT is a fifth of that: £46.80. The total would be £280.80.',
    },
    {
      id: 'P3-10', lo: 3, criteria: ['BKFN-3.2.3'],
      type: 'ordering',
      q: 'Put the steps for completing the amounts on a sales invoice in the correct order.',
      items: [
        'Extend each line: quantity × unit price',
        'Deduct any quantity discount the order qualifies for',
        'Total the lines to give the net amount',
        'Calculate VAT on the net amount',
        'Add net and VAT to reach the total',
      ],
      exp: 'The one step whose position genuinely matters is the discount: it must come before the VAT, because VAT is charged on the amount the customer is actually being charged. Calculating VAT first overstates both the VAT and the total.',
    },
    {
      id: 'P3-11', lo: 3, criteria: ['BKFN-3.2.2', 'BKFN-3.2.3'],
      type: 'truefalse',
      q: 'Identify whether each statement about preparing a sales invoice is true.',
      statements: [
        { text: 'The quantity billed comes from the delivery note.', answer: true },
        { text: 'The invoice date is the date the invoice is raised.', answer: true },
        { text: 'A credit note uses the same numbering sequence as invoices.', answer: false },
        { text: 'VAT is calculated before any quantity discount is deducted.', answer: false },
      ],
      exp: 'Bill what was delivered, not what was ordered, and date the invoice when it is raised. Credit notes run in their own unbroken sequence, which is why the specification names the credit note number as a separate field. And VAT follows the discount.',
    },
    {
      id: 'P3-12', lo: 3, criteria: ['BKFN-3.3.1'],
      type: 'match',
      q: 'Match each check on a purchase invoice to the document used for it.',
      left: [
        'Were these goods actually received, and how many?',
        'Did we order this, from this supplier?',
        'Was this the price we agreed?',
        'Was anything returned that should have been credited?',
      ],
      right: [
        'Goods received note',
        'Purchase order',
        'Quotation',
        'Goods returned note',
      ],
      exp: 'The four documents scope item 3.3.1 names each answer a different question. Notice that quantities are checked against the goods received note rather than the purchase order — an invoice can match the order exactly and still bill for goods that never arrived.',
    },
    {
      id: 'P3-13', lo: 3, criteria: ['BKFN-3.3.2'],
      type: 'numeric',
      q: 'A purchase invoice line reads: 16 units at £3.75, amount £63.00. What should the amount be, in pounds?',
      answer: 60, unit: '£',
      exp: '16 × £3.75 = £60.00, so the extension overstates the line by £3.00. This is an arithmetical error visible on the invoice alone — no other document is needed to catch it.',
    },
    {
      id: 'P3-14', lo: 3, criteria: ['BKFN-3.3.2'],
      type: 'mcq',
      q: 'A purchase invoice bills 24 units, the purchase order was for 24, and the goods received note records 21. What is wrong?',
      opts: [
        'The invoice overcharges for 3 units that were never delivered',
        'Nothing — the invoice agrees with the purchase order',
        'The goods received note must be wrong, since the order was for 24',
        'The supplier should have issued a credit note before invoicing',
      ],
      ans: 0,
      exp: 'The invoice must bill what arrived, and the goods received note is the record of that. Agreement with the purchase order proves only that the right goods were wanted. The supplier had no way of knowing about the shortfall, so the action is to query it and expect a credit note.',
    },
    {
      id: 'P3-15', lo: 3, criteria: ['BKFN-3.3.2'],
      type: 'mcq',
      q: 'A price list offers 12% off orders of 100 units or more. A purchase invoice for 140 units shows no discount. What should happen?',
      opts: [
        'Query it — the order qualifies for the discount',
        'Pay it in full, since discounts are at the supplier’s discretion',
        'Deduct the discount and pay the reduced amount',
        'Nothing — discounts apply only when claimed on the order',
      ],
      ans: 0,
      exp: 'A discount applies when its condition is met, and 140 units clears the 100-unit threshold. An omitted discount is a named error to look for. But the response is to query it and obtain a credit note — deducting it yourself leaves the two businesses holding documents that disagree.',
    },
    {
      id: 'P3-16', lo: 3, criteria: ['BKFN-3.4.1'],
      type: 'mcq',
      q: 'A business issues a credit note to a customer for goods returned. Which daybook records it?',
      opts: [
        'Sales returns daybook',
        'Purchases returns daybook',
        'Sales daybook',
        'Purchases daybook',
      ],
      ans: 0,
      exp: 'Ask who issued the credit note. We issued this one, to a customer, so it is a sales return. A credit note received from a supplier would go to the purchases returns daybook. Reasoning from which way the goods travelled is where these two get swapped.',
    },
    {
      id: 'P3-17', lo: 3, criteria: ['BKFN-3.4.2'],
      type: 'gapfill',
      q: 'Complete the description of the daybook columns.',
      template: 'Each daybook row carries the {0} date, the customer or supplier name, the document number, and three amounts: net, {1} and total.',
      gaps: [
        { options: ['document’s', 'entry’s', 'payment’s'], answer: 0 },
        { options: ['VAT', 'discount', 'balance'], answer: 0 },
      ],
      exp: 'The date column takes the document date, not the date of entry — the record describes when the transaction happened. And VAT gets its own column because it is money held for HMRC rather than the business’s own, a split that cannot be recovered later if only the total is recorded.',
    },
    {
      id: 'P3-18', lo: 3, criteria: ['BKFN-3.4.4', 'BKFN-3.4.5'],
      type: 'numeric',
      q: 'A purchases daybook has a net column totalling £1,285.00 and a VAT column totalling £257.00. What should the total column come to, in pounds?',
      answer: 1542, unit: '£',
      exp: 'Cross casting: £1,285.00 + £257.00 = £1,542.00. Note also that £257.00 is a fifth of £1,285.00, exactly as the standard rate requires — so the two checks agree.',
    },
    {
      id: 'P3-19', lo: 3, criteria: ['BKFN-3.4.5'],
      type: 'numeric',
      q: 'A daybook row reads: net £340.00, VAT £68.00, total £398.00. What should the total be, in pounds?',
      answer: 408, unit: '£',
      exp: '£340.00 + £68.00 = £408.00, so the row is understated by £10.00. Cross casting row by row locates the error; cross casting only the column totals would tell you the daybook was £10 out somewhere without saying where.',
    },
    {
      id: 'P3-20', lo: 3, criteria: ['BKFN-3.4.3', 'BKFN-3.4.5'],
      type: 'truefalse',
      q: 'Identify whether cross casting a daybook would detect each of these.',
      labels: ['Detected', 'Not detected'],
      statements: [
        { text: 'The total column has been added up wrongly.', answer: true },
        { text: 'An invoice for £560 has been entered as £650 throughout.', answer: false },
        { text: 'A credit note has been entered in the sales daybook by mistake.', answer: false },
        { text: 'A row appears in the VAT column but was left out of the total column.', answer: true },
      ],
      exp: 'Cross casting tests only whether net plus VAT equals total. A figure entered wrongly but consistently, or a document in the wrong book, leaves that arithmetic intact and passes. A mis-added column or a row missing from one column does not.',
    },
    {
      id: 'P3-21', lo: 3, criteria: ['BKFN-3.4.1', 'BKFN-3.4.2'],
      type: 'match',
      q: 'Match each document to the daybook it is entered in.',
      left: [
        'A purchase invoice from a supplier',
        'A credit note received from a supplier',
        'A sales invoice issued to a customer',
        'A credit note issued to a customer',
      ],
      right: [
        'Purchases daybook',
        'Purchases returns daybook',
        'Sales daybook',
        'Sales returns daybook',
      ],
      exp: 'Two questions place any document: are we selling or buying, and is it an invoice or a credit note? Anything we issued goes in the sales pair; anything we received goes in the purchases pair.',
    },

    /* ── Outcome 4 — process receipts and payments (34%) ─────────────────── */
    {
      id: 'P4-01', lo: 4, criteria: ['BKFN-4.1.1'],
      type: 'mcq',
      q: 'Bank charges of £22.00 are taken by the bank. Where do they belong in the cash book?',
      opts: [
        'Payments side, bank column',
        'Receipts side, bank column',
        'Payments side, cash column',
        'They are not entered in the cash book at all',
      ],
      ans: 0,
      exp: 'Money has left the account, so the payments side, bank column. Bank charges are entered even though the business never initiated them and has no document for them — the statement is where they are discovered, which is why the statement is itself a source of cash book entries.',
    },
    {
      id: 'P4-02', lo: 4, criteria: ['BKFN-4.1.2'],
      type: 'mcq',
      q: 'Till takings of £288.00 are received in cash, of which £48.00 is VAT. How should this be analysed?',
      opts: [
        '£240.00 to cash sales and £48.00 to VAT',
        '£288.00 to cash sales and a further £48.00 to VAT',
        '£288.00 in full to receivables',
        '£240.00 to receivables and £48.00 to VAT',
      ],
      ans: 0,
      exp: 'The analysis columns break the receipt down and must add back to the amount received. Receivables would be wrong because nobody was invoiced — this is a cash sale, which is exactly when VAT is analysed.',
    },
    {
      id: 'P4-03', lo: 4, criteria: ['BKFN-4.1.2'],
      type: 'mcq',
      q: 'A customer pays £360.00 to settle an invoice raised last month. Why is no VAT analysed on this receipt?',
      opts: [
        'The VAT was recorded when the invoice was raised',
        'Receipts from customers never include VAT',
        'VAT is only analysed on payments, not on receipts',
        'The VAT will be analysed when the money reaches the bank',
      ],
      ans: 0,
      exp: 'The sale — and its VAT — was recorded when the invoice was raised. This receipt settles that invoice rather than making a new sale, so analysing VAT again would count it twice. VAT is analysed on a cash sale, not on a receipt from a credit customer.',
    },
    {
      id: 'P4-04', lo: 4, criteria: ['BKFN-4.1.3'],
      type: 'match',
      q: 'Match each source document to what it evidences.',
      left: [
        'Paying-in book',
        'Cheque stub',
        'Remittance advice received',
        'Bank statement',
      ],
      right: [
        'Amounts banked by the business',
        'A cheque the business has written',
        'Which invoices a customer’s payment covers',
        'Entries the business did not initiate, such as charges and interest',
      ],
      exp: 'The paying-in book and cheque stubs are the business’s own records of money in and out. A remittance advice comes with a payment and allocates it. And the bank statement is where charges and interest are found, since nobody in the business had a document for them.',
    },
    {
      id: 'P4-05', lo: 4, criteria: ['BKFN-4.2.1'],
      type: 'numeric',
      q: 'Opening cash in hand £174.00. Cash receipts £892.00. Cash payments £615.00. What is the closing cash in hand, in pounds?',
      answer: 451, unit: '£',
      exp: '£174.00 + £892.00 = £1,066.00, less £615.00 = £451.00. Opening, plus receipts, less payments — using only the cash column, since cash in hand and cash at the bank are worked separately.',
    },
    {
      id: 'P4-06', lo: 4, criteria: ['BKFN-4.2.2'],
      type: 'numeric',
      q: 'Opening bank £4,215.00. Bank receipts £1,940.00. Bank payments £2,688.00. What is the closing amount at the bank, in pounds?',
      answer: 3467, unit: '£',
      exp: '£4,215.00 + £1,940.00 = £6,155.00, less £2,688.00 = £3,467.00. Payments exceeded receipts, so the balance has fallen — a quick check that the answer is moving the right way.',
    },
    {
      id: 'P4-07', lo: 4, criteria: ['BKFN-4.2.1', 'BKFN-4.2.2'],
      type: 'numeric',
      q: 'A cash book shows: cash receipts £340.00, bank receipts £1,120.00, cash payments £185.00, bank payments £990.00. Opening cash in hand was £62.00. What is the closing cash in hand, in pounds?',
      answer: 217, unit: '£',
      exp: '£62.00 + £340.00 = £402.00, less £185.00 = £217.00. The bank figures are irrelevant to this calculation — including them is the standard error, and it produces a combined figure that answers neither question.',
    },
    {
      id: 'P4-08', lo: 4, criteria: ['BKFN-4.1.4'],
      type: 'numeric',
      q: 'Three bank payments are made: £412.00, £168.00 (including £28.00 VAT) and £75.00. What is the total of the bank payments column, in pounds?',
      answer: 655, unit: '£',
      exp: '£412.00 + £168.00 + £75.00 = £655.00. The £28.00 VAT is an analysis of the £168.00, not an addition to it — adding it separately would give £683.00 and count that VAT twice.',
    },
    {
      id: 'P4-09', lo: 4, criteria: ['BKFN-4.2.1'],
      type: 'mcq',
      q: 'A closing cash in hand calculation produces negative £38.00. What is the most likely explanation?',
      opts: [
        'An error — cash in hand cannot go below nothing',
        'The till has become overdrawn',
        'Cash payments genuinely exceeded the cash available',
        'The opening figure should be treated as negative',
      ],
      ans: 0,
      exp: 'You cannot take more notes out of a till than are in it, so a negative cash in hand is proof of an error. An overdraft is a bank concept and does not apply to physical cash — and overdrawn amounts are excluded at this level in any case.',
    },
    {
      id: 'P4-10', lo: 4, criteria: ['BKFN-4.3.1'],
      type: 'truefalse',
      q: 'For each bank statement entry, is money coming in or going out?',
      labels: ['Money in', 'Money out'],
      statements: [
        { text: 'BACS received from a customer', answer: true },
        { text: 'Cash withdrawal', answer: false },
        { text: 'Debit card payment', answer: false },
        { text: 'Counter credit', answer: true },
      ],
      exp: 'A BACS receipt and a counter credit both bring money in. A cash withdrawal takes money out of the account, and a debit card payment takes it at the point of purchase. Getting the direction right matters more than the mechanism.',
    },
    {
      id: 'P4-11', lo: 4, criteria: ['BKFN-4.3.1'],
      type: 'match',
      q: 'Match each bank statement entry to its description.',
      left: [
        'Bank interest received',
        'Bank charges',
        'Cheque',
        'Faster Payments',
      ],
      right: [
        'Earned on the account balance, and credited by the bank',
        'The bank’s own fees, taken from the account',
        'Presented by whoever the account holder wrote it to',
        'An electronic transfer arriving within minutes',
      ],
      exp: 'The first two are the entries the business never initiated, so neither is in the cash book until the statement reveals it. A cheque leaves the account when the recipient banks it, which is why it can appear days or weeks after being written.',
    },
    {
      id: 'P4-12', lo: 4, criteria: ['BKFN-4.3.2'],
      type: 'mcq',
      q: 'Where on a bank statement is the closing balance found?',
      opts: [
        'The last figure in the balance column',
        'The largest figure in the balance column',
        'The balance shown against the final payment',
        'The opening balance less total payments',
      ],
      ans: 0,
      exp: 'The balance column updates after every entry, so the closing balance is simply the last figure in it. It is not necessarily the largest, and not the balance against the last payment if a receipt followed it — which is exactly how an interest credit on the final day catches people out.',
    },
    {
      id: 'P4-13', lo: 4, criteria: ['BKFN-4.3.3'],
      type: 'mcq',
      q: 'A cheque received from a customer was recorded in the cash book but has not yet been banked. What is the effect?',
      opts: [
        'The cash book figure is higher than the statement balance',
        'The statement balance is higher than the cash book figure',
        'Both records are unaffected',
        'The cash book entry should be reversed',
      ],
      ans: 0,
      exp: 'The cash book has already added money that never reached the bank, so it shows the higher figure. Note that this is the opposite direction from an unpresented cheque we wrote — differences do not all run one way, and saying which way is the skill being tested.',
    },
    {
      id: 'P4-14', lo: 4, criteria: ['BKFN-4.3.3', 'BKFN-4.3.4'],
      type: 'truefalse',
      q: 'Sort each item into the correct category.',
      labels: ['Cash book only', 'Statement only'],
      statements: [
        { text: 'A cheque written to a supplier last week that has not cleared', answer: true },
        { text: 'Interest credited by the bank on the last day of the month', answer: false },
        { text: 'A standing order that went out automatically and was not entered', answer: false },
        { text: 'Cash paid in on the final day of the statement period', answer: true },
      ],
      exp: 'Items the business recorded but the bank has not processed are in the cash book only — unpresented cheques and a late paying-in. Items the bank applied without the business having a document are on the statement only, which covers interest and any automatic payment nobody recorded.',
    },
    {
      id: 'P4-15', lo: 4, criteria: ['BKFN-4.3.4'],
      type: 'mcq',
      q: 'A Direct Debit for £64.00 appears on the bank statement but is not in the cash book. What should happen?',
      opts: [
        'It should be entered on the cash book payments side',
        'Nothing — it will resolve itself once it clears',
        'The bank should be asked to reverse it',
        'The statement balance should be adjusted by £64.00',
      ],
      ans: 0,
      exp: 'It is a genuine payment the business has not yet recorded, so it needs entering. That is the opposite of a timing item such as an unpresented cheque, which needs no action because it will clear on its own.',
    },
    {
      id: 'P4-16', lo: 4, criteria: ['BKFN-4.3.3'],
      type: 'numeric',
      q: 'A cash book shows £1,880.00 at the bank; the statement closing balance is £2,045.00. An unpresented cheque for £165.00 is identified. How much of the difference, in pounds, remains unexplained?',
      answer: 0, unit: '£',
      exp: '£2,045.00 − £1,880.00 = £165.00, and the unpresented cheque accounts for all of it — so nothing remains unexplained. The cash book deducted a payment the bank still holds, which is exactly what an unpresented cheque does.',
    },
    {
      id: 'P4-17', lo: 4, criteria: ['BKFN-4.4.3', 'BKFN-4.4.5'],
      type: 'numeric',
      q: 'A customer owed £410.00 at the start of the month. Invoices of £625.00 were issued, a credit note of £55.00 was raised, and £410.00 was received. What is owed at month end, in pounds?',
      answer: 570, unit: '£',
      exp: '£410.00 + £625.00 = £1,035.00, less £55.00 = £980.00, less £410.00 = £570.00. Invoices increase the balance; credit notes and receipts both reduce it.',
    },
    {
      id: 'P4-18', lo: 4, criteria: ['BKFN-4.4.4', 'BKFN-4.4.5'],
      type: 'numeric',
      q: 'A supplier was owed £288.00 at the start of the month. Purchase invoices of £744.00 were received, a credit note of £96.00 was received, and £288.00 was paid. What is owed at month end, in pounds?',
      answer: 648, unit: '£',
      exp: '£288.00 + £744.00 = £1,032.00, less £96.00 = £936.00, less £288.00 = £648.00. The supplier calculation follows the same pattern as the customer one, with the documents coming from the other direction.',
    },
    {
      id: 'P4-19', lo: 4, criteria: ['BKFN-4.4.3'],
      type: 'numeric',
      q: 'A customer with no opening balance is invoiced £312.00 and £198.00, receives a credit note for £42.00, and pays £312.00. What is still owed, in pounds?',
      answer: 156, unit: '£',
      exp: '£312.00 + £198.00 = £510.00, less £42.00 = £468.00, less £312.00 = £156.00. The payment settled the first invoice exactly, leaving the second less the credit note.',
    },
    {
      id: 'P4-20', lo: 4, criteria: ['BKFN-4.4.3'],
      type: 'mcq',
      q: 'In calculating what a customer owes, a bookkeeper adds a £70.00 credit note instead of subtracting it. By how much is the balance wrong?',
      opts: [
        '£140.00 too high',
        '£70.00 too high',
        '£70.00 too low',
        'The balance is unaffected',
      ],
      ans: 0,
      exp: 'The figure moves the wrong way by twice the credit note: £70.00 that should have come off has gone on instead. That doubling is what makes this the most expensive routine error in the calculation, as well as the most common.',
    },
    {
      id: 'P4-21', lo: 4, criteria: ['BKFN-4.4.1'],
      type: 'mcq',
      q: 'A customer with four outstanding invoices pays a single amount. Which document tells you which invoices it settled?',
      opts: [
        'The remittance advice',
        'The bank statement for the period',
        'The sales daybook',
        'The paying-in book',
      ],
      ans: 0,
      exp: 'Only the remittance advice, sent with the payment, allocates it. The total owed drops by the amount paid either way, but knowing which invoices remain outstanding is what chasing and an aged analysis depend on — and no bank record contains that.',
    },
    {
      id: 'P4-22', lo: 4, criteria: ['BKFN-4.4.1'],
      type: 'mcq',
      q: 'What does an aged payables analysis show?',
      opts: [
        'What is owed to suppliers, split by age',
        'The total owed to all suppliers',
        'Which suppliers offer the longest credit terms',
        'The age of each supplier account',
      ],
      ans: 0,
      exp: 'The ageing is the information. Two businesses can owe the same total while one is paying on time and the other has invoices four months overdue — and only the split by age distinguishes them.',
    },
    {
      id: 'P4-23', lo: 4, criteria: ['BKFN-4.4.2'],
      type: 'match',
      q: 'Match each record to what it contributes to a supplier’s balance.',
      left: [
        'Purchases daybook',
        'Purchases returns daybook',
        'Cash book, payments side',
        'Opening amount owed',
      ],
      right: [
        'Invoices received, which increase what is owed',
        'Credit notes received, which reduce it',
        'Payments made, which reduce it',
        'What was outstanding at the start of the period',
      ],
      exp: 'Three records supply the movements and the opening balance supplies the starting point — which is not zero, and forgetting it is a straightforward way to understate what is owed.',
    },
    {
      id: 'P4-24', lo: 4, criteria: ['BKFN-4.1.1', 'BKFN-4.1.2'],
      type: 'gapfill',
      q: 'Complete the description of the cash book.',
      template: 'A cash book has a receipts side and a {0} side, and holds separate columns for cash and {1}, because the business keeps money in two different places.',
      gaps: [
        { options: ['payments', 'balances', 'returns'], answer: 0 },
        { options: ['bank', 'VAT', 'sales'], answer: 0 },
      ],
      exp: 'Two sides for direction, and separate cash and bank columns because physical cash and the bank account are genuinely different resources — one can be plentiful while the other is short, and each gets its own closing calculation.',
    },

    /* ── Outcome 5 — accounting software (10%) ───────────────────────────── */
    {
      id: 'P5-01', lo: 5, criteria: ['BKFN-5.1.1'],
      type: 'mcq',
      q: 'What is a bank feed?',
      opts: [
        'A live connection that imports bank transactions',
        'A monthly statement emailed by the bank as a PDF',
        'A report of bank payments for a chosen period',
        'A scheduled instruction to pay suppliers automatically',
      ],
      ans: 0,
      exp: 'A feed imports transactions as data, as they happen — including the charges and interest nobody in the business initiated. An emailed PDF still needs somebody to read and enter it, so it is not an import in this sense.',
    },
    {
      id: 'P5-02', lo: 5, criteria: ['BKFN-5.1.2'],
      type: 'truefalse',
      q: 'Identify whether each is a benefit the specification attributes to integrating, importing and exporting data.',
      labels: ['Named benefit', 'Not named'],
      statements: [
        { text: 'Receiving information in real time', answer: true },
        { text: 'Reducing reliance on paper communication', answer: true },
        { text: 'Eliminating the risk of human error', answer: false },
        { text: 'Easy access to information from a single system', answer: true },
      ],
      exp: 'Real-time information, less paper and single-system access are all named. The specification says integration *reduces* the risk of human error, not eliminates it — importing removes mistyping but not miscoding, and not errors made further upstream.',
    },
    {
      id: 'P5-03', lo: 5, criteria: ['BKFN-5.1.4'],
      type: 'mcq',
      q: 'Which report shows everything relating to one customer — invoices, credit notes, receipts and the balance?',
      opts: [
        'An individual customer report',
        'A receivables report for all customers',
        'An aged receivables analysis',
        'A bank receipts analysis',
      ],
      ans: 0,
      exp: 'The individual customer report is one customer in full — the automated version of the calculation done by hand in Outcome 4. A receivables report covers all customers, and an aged analysis adds the split by how long amounts have been outstanding.',
    },
    {
      id: 'P5-04', lo: 5, criteria: ['BKFN-5.1.5'],
      type: 'mcq',
      q: 'Which software feature removes the risk of invoicing a list price when a lower price had been quoted?',
      opts: [
        'Automatic conversion of quotations into invoices',
        'Recurring invoicing schedules for regular customers',
        'Automated emailing of invoices to customers',
        'Duplicating a previously raised invoice',
      ],
      ans: 0,
      exp: 'If the invoice is generated from the quotation, the quoted price carries across and cannot be overridden by the list price in error. Recurring schedules and duplication both repeat an existing document, and emailing addresses delay rather than price.',
    },
    {
      id: 'P5-05', lo: 5, criteria: ['BKFN-5.1.7'],
      type: 'mcq',
      q: 'Which of these is one of the two disadvantages of accounting software the specification names?',
      opts: [
        'Errors when a recurring entry’s amount or frequency changes',
        'Software is more expensive than manual bookkeeping',
        'Cloud software cannot produce aged analyses',
        'Reports produced by software are not accepted by HMRC',
      ],
      ans: 0,
      exp: 'The two named disadvantages are errors when a recurring entry’s amount or frequency changes, and manual errors at the initial point of entry still occurring. Cost, capability and acceptability are not among them — and note that system crashes belong to the security threats, not here.',
    },
    {
      id: 'P5-06', lo: 5, criteria: ['BKFN-5.2.1'],
      type: 'truefalse',
      q: 'Identify whether each characteristic describes off-the-shelf software or bespoke software.',
      labels: ['Off-the-shelf', 'Bespoke'],
      statements: [
        { text: 'No development period — usable immediately', answer: true },
        { text: 'Fits the business’s requirements exactly', answer: false },
        { text: 'Supported by a large base of trained users', answer: true },
        { text: 'Only its original developer fully understands it', answer: false },
      ],
      exp: 'The trade-off is fit against everything else. Bespoke software does exactly what was asked for; off-the-shelf costs a fraction as much, works today, updates itself and can be supported by anybody who has used it — and a bespoke developer ceasing to trade is a real risk, not just an inconvenience.',
    },
    {
      id: 'P5-07', lo: 5, criteria: ['BKFN-5.2.2'],
      type: 'truefalse',
      q: 'Identify whether each statement about cloud accounting software is true.',
      statements: [
        { text: 'It requires an internet connection to be used at all.', answer: true },
        { text: 'It can normally be accessed from multiple devices, including mobiles.', answer: true },
        { text: 'Updates are applied by the provider rather than installed manually.', answer: true },
        { text: 'It cannot integrate with third party apps.', answer: false },
      ],
      exp: 'The internet dependency is cloud software’s one absolute weakness. Multi-device access, automatic updates and strong integration are its main advantages — and that integration is largely why cloud software has displaced traditional installations.',
    },
    {
      id: 'P5-08', lo: 5, criteria: ['BKFN-5.3.1'],
      type: 'mcq',
      q: 'An employee receives a convincing email appearing to be from the bank, asking them to confirm their login details. What threat is this?',
      opts: [
        'Phishing',
        'Hacking',
        'A virus',
        'Employee fraud',
      ],
      ans: 0,
      exp: 'Phishing impersonates a trusted sender to trick somebody into giving up credentials or data. It is the threat that defeats technical safeguards — a firewall stops an intruder but does nothing when a person is persuaded to hand over the password themselves.',
    },
  ];

  var AAT1_PRACTICE = { QUESTIONS: QUESTIONS };

  if (typeof module === 'object' && module.exports) module.exports = { AAT1_PRACTICE: AAT1_PRACTICE };
  else root.AAT1_PRACTICE = AAT1_PRACTICE;
}(typeof self !== 'undefined' ? self : this));
