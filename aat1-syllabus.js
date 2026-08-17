/* AAT Level 1 syllabus — machine-readable spine.
 *
 * Source: AAT Level 1 Award in Bookkeeping Qualification Specification,
 * QN 610/0818/7, version 2.1, published 23 September 2025. The extracted text
 * this file was transcribed from is kept at
 * docs/reference/aat-l1-spec-v2.1-extracted.txt so any claim below can be
 * checked against the words it came from.
 *
 * WHY THIS FILE EXISTS
 *
 * Same reason as aat3-syllabus.js: "follows the AAT syllabus" is an
 * unverifiable claim until the syllabus is data. With it encoded,
 * scripts/check-aat1-coverage.js fails the build when a lesson claims a scope
 * item that does not exist, or when a shipped outcome leaves one uncovered.
 *
 * STRUCTURE
 *
 *   outcome (1)  →  topic area (1.1)  →  scope item (1.1.1)  →  indicative content
 *
 * Level 1's specification calls the third level "scope of content" rather than
 * "key concepts", and it is unusually literal: most items are a single sentence
 * followed by a bulleted list that the spec says "must be covered in teaching".
 * Those bullets are `indicative`, and they are where the teaching load actually
 * sits — 1.2.1 alone carries twelve of them.
 *
 * `tier` records the specification's own framing:
 *   'know' — "learners need to know"
 *   'do'   — "learners need to be able to"
 * Level 1 uses only those two; there is no "understand" tier at this level, and
 * the two verbs are used strictly (a topic that needs both splits into a
 * know-item and a do-item, which is why 3.2 and 3.3 look lopsided).
 *
 * `excluded` records what the specification explicitly places out of scope.
 * These matter more at Level 1 than anywhere else, because the natural
 * temptation is to teach the Level 2 version of the same topic: debits and
 * credits, ledger accounts, VAT from a gross figure, bank reconciliations. All
 * four are named exclusions here, and teaching them would make a beginner's
 * first exposure harder for no assessed benefit.
 *
 * VERSIONING
 *
 * The specification records its own change history: v1.1 amended 3.2.3 and
 * 3.3.2, v2.0 amended 1.2.1. Identifiers have otherwise been stable since first
 * publication in May 2022, which is a much calmer picture than TPFB's. Even so,
 * `specVersion` is recorded here and the coverage checker reports tags matching
 * nothing, so a future amendment surfaces as a failing build rather than as
 * quietly wrong teaching.
 *
 * This is a personal, non-commercial study tool. AAT permits reproduction of
 * this material for personal and educational use.
 */
(function (root) {
  'use strict';

  var BKFN = {
    unit: 'bkfn',
    code: 'BKFN',
    title: 'Bookkeeping Fundamentals',
    unitReference: 'F/650/2401',
    glh: 75,
    /* The single mandatory unit, so it is the whole of the qualification. */
    qualificationWeighting: 100,
    assessment: {
      method: 'Computer based assessment',
      marking: 'Computer marked',
      durationMinutes: 90,
      /* The specification states only that the qualification is ungraded and
         that students must pass one mandatory assessment. It publishes no pass
         percentage, so none is asserted here — see PASS_MARK_NOTE. */
      graded: false,
      taskCount: null,
      totalMarks: null
    },
    excluded: [],
    outcomes: [
      {
        n: 1,
        title: 'Understand the role of the bookkeeper',
        weighting: 17,
        topics: [
          {
            id: '1.1',
            title: 'Duties and responsibilities of a bookkeeper',
            concepts: [
              { id: '1.1.1', tier: 'know', text: 'The duties and responsibilities of a bookkeeper',
                indicative: ['record and check financial transactions', 'prepare and check financial documentation', 'prepare information that is timely and accurate', 'prepare information that may be used by managers or business owners in making decisions', 'required to follow ethical principles', 'must refer to a supervisor or seek authorisation where appropriate', 'have money laundering obligations'] }
            ]
          },
          {
            id: '1.2',
            title: 'The importance of timely and accurate information',
            concepts: [
              { id: '1.2.1', tier: 'know', text: 'The potential effect of inaccurate information',
                indicative: ['incorrect chasing of customers', 'delayed receipts from customers', 'incorrect payments to suppliers: overpayment, underpayment', 'duplicated payment to suppliers', 'delayed receipt of goods from suppliers', 'loss of customer or supplier goodwill', 'incorrect accounting records: overstatement, understatement', 'incorrect profit or loss reported', 'incorrect tax payments to authorities', 'incorrect information on external or internal reports leading to incorrect management or client decision making', 'time spent tracing and correcting errors', 'loss of reputation with managers or clients'] },
              { id: '1.2.2', tier: 'know', text: 'The potential effects of untimely information',
                indicative: ['missed accounting and other compliance deadlines', 'delayed receipts from customers', 'delayed payments to suppliers', 'delayed receipt of goods from suppliers', 'loss of customer or supplier goodwill', 'out of date information in external or internal reports leading to incorrect management or client decision making', 'loss of reputation with managers or clients'] },
              { id: '1.2.3', tier: 'know', text: 'Actions that can be taken to ensure information is timely and accurate',
                indicative: ['take time when processing entries', 'identify deadlines', 'identify how long is required for each item of work', 'prioritise work to ensure deadlines can be met', 'plan work using diaries, calendars or planning software', 'review own work', 'check understanding of task with supervisor or client', 'do not take on more work than is possible in the time available', 'discuss workload and priorities with your supervisor', 'do not take on work beyond your ability', 'discuss with your supervisor if you are not sure how to process an item', 'check that totals agree to expectation', 'use internal checks within software to identify errors', 'have a second person review when appropriate'] }
            ]
          },
          {
            id: '1.3',
            title: 'Ethical principles',
            concepts: [
              { id: '1.3.1', tier: 'know', text: 'The five fundamental principles of ethics',
                indicative: ['confidentiality', 'professional behaviour', 'professional competence and due care', 'integrity', 'objectivity'] },
              { id: '1.3.2', tier: 'know', text: 'The potential effect of not keeping information confidential',
                indicative: ['unauthorised sharing of information', 'breach of data protection / General Data Protection Regulations', 'breach of the AAT Code of Professional Ethics', 'breach of employment contract', 'loss of business or personal reputation'] },
              { id: '1.3.3', tier: 'know', text: 'Ways to keep information confidential and secure',
                indicative: ['use of strong passwords and not sharing passwords', 'screensavers', 'encryption', 'firewalls', 'use of a secure network for remote or hybrid working', 'storage of hard-copy records and physical access restrictions', 'storage of soft-copy records: cloud storage, archives, secure back-ups, restricted access, cybersecurity', 'authentication required to access cloud-based information', 'not sharing laptops or computers with others', 'not leaving confidential information where non-authorised personnel may see it, and not working in a public space', 'not discussing confidential information where non-authorised personnel may hear', 'anti-virus software', 'cookies and privacy settings', 'the importance of only sharing information with authorised personnel', 'checking the correct recipient before sending required information'],
                excluded: ['creating passwords'] }
            ]
          },
          {
            id: '1.4',
            title: 'Money laundering obligations',
            concepts: [
              { id: '1.4.1', tier: 'know', text: 'Key money laundering obligations',
                indicative: ['bookkeeping is an accountancy service', 'bookkeepers must register for anti-money laundering supervision if they provide external bookkeeping services', 'money laundering is a criminal offence', 'reports of suspicious activity should be made', 'failure to report a suspicion of money laundering is a criminal offence'] }
            ]
          }
        ]
      },
      {
        n: 2,
        title: 'Understand financial transactions',
        weighting: 10,
        topics: [
          {
            id: '2.1',
            title: 'The dual effect of transactions',
            concepts: [
              { id: '2.1.1', tier: 'know', text: 'That items can be classified as assets, liabilities, income, expenses, capital, and profit or loss',
                indicative: ['assets', 'liabilities', 'income', 'expenses', 'capital', 'profit or loss'] },
              { id: '2.1.2', tier: 'know', text: 'That items can be recorded in the bookkeeping system' },
              { id: '2.1.3', tier: 'know', text: 'That each transaction changes the records of at least two items in the bookkeeping system, and that item amounts may increase and/or decrease',
                excluded: ['making entries in ledger accounts', 'debits and credits', 'transactions including VAT', 'transactions including more than two items'] }
            ]
          },
          {
            id: '2.2',
            title: 'The accounting equation',
            concepts: [
              { id: '2.2.1', tier: 'know', text: 'The accounting equation' },
              { id: '2.2.2', tier: 'know', text: 'That profits result in increases in capital and losses result in decreases in capital' },
              { id: '2.2.3', tier: 'know', text: 'That the accounting equation will always balance',
                excluded: ['calculations of missing entries using the accounting equation'] }
            ]
          }
        ]
      },
      {
        n: 3,
        title: 'Process customer and supplier transactions',
        weighting: 29,
        topics: [
          {
            id: '3.1',
            title: 'The buying and selling process',
            concepts: [
              { id: '3.1.1', tier: 'know', text: 'The difference between trading for cash and trading on credit',
                indicative: ['cash sales', 'cash purchases', 'credit sales', 'credit purchases', 'customers', 'suppliers', 'receivables', 'payables'] },
              { id: '3.1.2', tier: 'know', text: 'The relevant documents and how they are used',
                indicative: ['sales and purchase invoices', 'sales and purchase credit notes', 'quotation', 'sales and purchase orders', 'delivery note', 'goods received note', 'goods returned note', 'cash receipt', 'remittance advice'] }
            ]
          },
          {
            id: '3.2',
            title: 'Preparing sales invoices and credit notes',
            concepts: [
              { id: '3.2.1', tier: 'know', text: 'The documents used to prepare sales invoices and credit notes',
                indicative: ['quotation', 'delivery note', 'price list', 'sales order'] },
              { id: '3.2.2', tier: 'do', text: 'Complete sales invoice and credit note details',
                indicative: ['customer name', 'customer address', 'customer reference', 'invoice number', 'invoice date', 'credit note number', 'credit note date', 'product description', 'product code'] },
              { id: '3.2.3', tier: 'do', text: 'Complete sales invoice and credit note amounts',
                indicative: ['unit price, number of units and price for multiple units', 'discounts for buying large quantities', 'amounts: net, VAT at standard rate, total'],
                excluded: ['calculation of VAT from VAT-inclusive amounts'] }
            ]
          },
          {
            id: '3.3',
            title: 'Check purchase invoices and credit notes',
            concepts: [
              { id: '3.3.1', tier: 'know', text: 'The documents used to check purchase invoices and credit notes',
                indicative: ['quotation', 'purchase order', 'goods received note', 'goods returned note'] },
              { id: '3.3.2', tier: 'do', text: 'Recognise errors on a purchase invoice or credit note',
                indicative: ['customer name', 'customer address', 'customer reference', 'invoice number', 'invoice date', 'credit note number', 'credit note date', 'product description', 'product code', 'unit price, number of units and price for multiple units', 'discounts for buying large quantities', 'amounts: net, VAT at standard rate, total'],
                excluded: ['calculation of VAT from VAT-inclusive amounts'] }
            ]
          },
          {
            id: '3.4',
            title: 'Record sales and purchase invoices and credit notes in the books of prime entry',
            concepts: [
              { id: '3.4.1', tier: 'know', text: 'The books of prime entry',
                indicative: ['sales daybook', 'purchases daybook', 'sales returns daybook', 'purchases returns daybook'] },
              { id: '3.4.2', tier: 'know', text: 'The columns within the books of prime entry',
                indicative: ['date', 'customer or supplier name', 'customer or supplier invoice number / credit note number', 'amounts (net, VAT and total)'] },
              { id: '3.4.3', tier: 'do', text: 'Make entries in the books of prime entry' },
              { id: '3.4.4', tier: 'do', text: 'Total columns in the books of prime entry' },
              { id: '3.4.5', tier: 'do', text: 'Cross cast columns in the books of prime entry',
                excluded: ['analysis columns in books of prime entry'] }
            ]
          }
        ]
      },
      {
        n: 4,
        title: 'Process receipts and payments',
        weighting: 34,
        topics: [
          {
            id: '4.1',
            title: 'Enter receipts and payments into a cash book',
            concepts: [
              { id: '4.1.1', tier: 'know', text: 'The format of the cash book',
                indicative: ['receipts side', 'payments side'] },
              { id: '4.1.2', tier: 'know', text: 'The columns within the cash book',
                indicative: ['date', 'customer or supplier', 'cash and/or bank', 'analysis columns, including a VAT analysis column'] },
              { id: '4.1.3', tier: 'know', text: 'The resources and documents used',
                indicative: ['cash receipts', 'cheque stubs and paying-in book', 'remittance advices', 'lists of receipts and/or payments', 'lists of Direct Debits and/or standing orders', 'lists of Faster Payments and/or BACS', 'bank statements', 'automatic bank feeds'] },
              { id: '4.1.4', tier: 'do', text: 'Make entries in the cash book, total columns and cross cast columns',
                indicative: ['receipts', 'payments', 'total columns in the cash book', 'cross cast columns in the cash book'],
                excluded: ['opening and closing balances in the cash book', 'the cash book as part of the double-entry system'] }
            ]
          },
          {
            id: '4.2',
            title: 'Use the cash book to calculate closing amounts of cash in hand and cash in the bank',
            concepts: [
              { id: '4.2.1', tier: 'do', text: 'Calculate the closing amount of cash in hand from the opening amount, amounts received and amounts paid' },
              { id: '4.2.2', tier: 'do', text: 'Calculate the closing amount of cash in the bank from the opening amount, amounts received and amounts paid',
                excluded: ['overdrawn amounts', 'bank reconciliations'] }
            ]
          },
          {
            id: '4.3',
            title: 'Check the closing amount of cash in the bank against the closing balance in the bank statement',
            concepts: [
              { id: '4.3.1', tier: 'do', text: 'Recognise receipts and payments on the bank statement',
                indicative: ['counter credits', 'cash withdrawals', 'standing orders', 'Direct Debits', 'debit card payments', 'cheques', 'BACS', 'Faster Payments', 'bank charges', 'bank interest received'] },
              { id: '4.3.2', tier: 'do', text: 'Recognise balances on the bank statement' },
              { id: '4.3.3', tier: 'do', text: 'Recognise items in the cash book that are not on the bank statement' },
              { id: '4.3.4', tier: 'do', text: 'Recognise items on the bank statement that are not in the cash book',
                excluded: ['overdrawn amounts', 'bank reconciliations'] }
            ]
          },
          {
            id: '4.4',
            title: 'Identify outstanding amounts for individual customers and suppliers',
            concepts: [
              { id: '4.4.1', tier: 'know', text: 'The documents used to identify outstanding amounts',
                indicative: ['sales and purchase invoices', 'sales and purchase credit notes', 'lists of invoices and/or credit notes', 'cash receipts', 'cheque stubs and paying-in book', 'remittance advices', 'lists of receipts and/or payments', 'bank statements and bank feeds', 'software reports: individual customer reports, individual supplier reports, receivables reports, payables reports, aged receivables analysis, aged payables analysis'] },
              { id: '4.4.2', tier: 'know', text: 'The records used to identify outstanding amounts',
                indicative: ['sales daybook', 'purchases daybook', 'sales returns daybook', 'purchases returns daybook', 'cash book'] },
              { id: '4.4.3', tier: 'do', text: 'Calculate amounts owed by customers' },
              { id: '4.4.4', tier: 'do', text: 'Calculate amounts owed to suppliers' },
              { id: '4.4.5', tier: 'do', text: 'Use an opening amount owed',
                excluded: ['sales, purchase, receivables and payables ledger accounts'] }
            ]
          }
        ]
      },
      {
        n: 5,
        title: 'Understand the benefits and risks of using accounting software to complete bookkeeping tasks',
        weighting: 10,
        topics: [
          {
            id: '5.1',
            title: 'Features and benefits of accounting software compared to manual bookkeeping',
            concepts: [
              { id: '5.1.1', tier: 'know', text: 'That digital systems can import transactions from a number of sources',
                indicative: ['bank records', 'csv files', 'third party software and apps'] },
              { id: '5.1.2', tier: 'know', text: 'The benefits of being able to integrate, import and export data to and from other sources',
                indicative: ['receive information in real time: live bank feeds, wider accessibility', 'save time', 'reduce reliance on paper communication', 'communicate information in various formats', 'to work with data more flexibly', 'reduce risk of human error', 'easy access to information from a single system'] },
              { id: '5.1.3', tier: 'know', text: 'That digital systems can produce real-time reports' },
              { id: '5.1.4', tier: 'know', text: 'That reports may be produced in accounting software',
                indicative: ['real-time financial position', 'analysis of income and expenses', 'individual customer reports', 'individual supplier reports', 'receivables reports', 'payables reports', 'aged receivables analysis', 'aged payables analysis', 'bank payments analysis for a specified time period', 'bank receipts analysis for a specified time period'] },
              { id: '5.1.5', tier: 'know', text: 'That accounting software can provide benefits to processing customer and supplier transactions',
                indicative: ['pro-forma invoices', 'automated calculations', 'automated emailing of invoices', 'automated updates of changes to invoices', 'pro-forma purchase orders', 'automatic conversion of quotes to sales invoices', 'recurring invoicing schedules', 'duplicate previously raised invoices', 'automatic checks for accuracy'] },
              { id: '5.1.6', tier: 'know', text: 'That accounting software can provide benefits to processing receipts and payments',
                indicative: ['match bank receipts to sales invoices', 'match bank payments to purchase invoices', 'software learning to suggest automated matching based on previous transactions', 'automatic identification of differences in amounts paid or received to expectation', 'automated allocation of amount received to cash book and customer account', 'automated remittance advice', 'automated reminders of when payments are due', 'automated payment set up for due dates', 'automatic checks for accuracy', 'customer statements in real time to show amounts outstanding', 'supplier statements in real time to show amounts outstanding'] },
              { id: '5.1.7', tier: 'know', text: 'That accounting software can have disadvantages',
                indicative: ['can create errors when the amount or frequency of a recurring entry changes', 'manual errors at the initial point of entry may still occur'] }
            ]
          },
          {
            id: '5.2',
            title: 'Advantages and disadvantages to users of different types of accounting software',
            concepts: [
              { id: '5.2.1', tier: 'know', text: 'The differences between off-the-shelf and bespoke software',
                indicative: ['cost', 'levels of support for users', 'timeframe for development', 'range of functions used by business', 'frequency and ease of updates', 'level of training required to use software', 'type of subscription'] },
              { id: '5.2.2', tier: 'know', text: 'The differences between traditional accounting software and cloud software',
                indicative: ['cost', 'levels of support for users', 'range of functions used by business', 'frequency and ease of updates', 'upgrade capacity', 'level of training required to use software', 'access from multiple devices', 'access and usability from mobile devices', 'ability to integrate with third party software and apps', 'type of subscription', 'access to internet'] }
            ]
          },
          {
            id: '5.3',
            title: 'Accounting software security',
            concepts: [
              { id: '5.3.1', tier: 'know', text: 'Potential threats to data security',
                indicative: ['viruses', 'hacking', 'phishing', 'system crashes', 'employee fraud', 'corrupt files', 'natural disasters', 'accidental deletion'] }
            ]
          }
        ]
      }
    ]
  };

  var SYLLABUS = {
    qualification: 'AAT Level 1 Award in Bookkeeping',
    qualificationNumber: '610/0818/7',
    specVersion: '2.1',
    specPublished: '2025-09-23',
    glh: 75,
    tqt: 110,
    /* "This qualification is not graded. To pass the qualification, students
       must pass one mandatory assessment." — specification §8.1. */
    graded: false,
    units: { bkfn: BKFN }
  };

  /* The specification publishes no pass percentage for an ungraded
     qualification. Training providers widely quote 70%, and that is where the
     figure students see comes from — but it is not in the specification, so the
     app must not present it as though it were. Anything user-facing that wants
     to mention a pass mark uses this string. */
  var PASS_MARK_NOTE = 'The qualification is ungraded — you either pass the assessment or you do not. ' +
    'The specification publishes no pass percentage; the 70% widely quoted by training providers is not an AAT figure.';

  /* The only rate the material needs. Level 1 works exclusively at the standard
     rate and never from a VAT-inclusive figure, both of which the specification
     fixes (3.2.3 and its exclusion). Kept as data so a rate change is one edit,
     and so scripts/check-aat1-quality.js can fail prose that hardcodes it. */
  var FACTS = {
    vat: {
      standardRate: { value: 20, label: '20%' },
      /* Net → VAT is × 20/100; the reverse direction is explicitly excluded at
         this level, so the material must never teach ÷ 6. */
      excludedDirection: 'calculation of VAT from VAT-inclusive amounts'
    }
  };

  /* ── Helpers used by the coverage checker and by the app ─────────────────── */
  function concepts(unitKey) {
    var u = SYLLABUS.units[unitKey];
    if (!u) return [];
    var out = [];
    u.outcomes.forEach(function (o) {
      o.topics.forEach(function (t) {
        t.concepts.forEach(function (c) {
          out.push({
            tag: u.code + '-' + c.id,
            id: c.id, text: c.text, tier: c.tier,
            indicative: c.indicative || [],
            excluded: c.excluded || [],
            topicId: t.id, topicTitle: t.title,
            outcome: o.n, outcomeTitle: o.title, outcomeWeighting: o.weighting
          });
        });
      });
    });
    return out;
  }

  /* Teaching-load estimate. A 'do' item costs several times a 'know' one, and
     every indicative bullet is a thing the specification says must be covered. */
  function loadUnits(concept) {
    var base = concept.tier === 'do' ? 4 : 1;
    return base + (concept.indicative ? concept.indicative.length : 0);
  }

  function unitSummary(unitKey) {
    var u = SYLLABUS.units[unitKey];
    if (!u) return null;
    var cs = concepts(unitKey);
    return {
      code: u.code, title: u.title,
      outcomes: u.outcomes.length,
      topics: u.outcomes.reduce(function (s, o) { return s + o.topics.length; }, 0),
      concepts: cs.length,
      indicative: cs.reduce(function (s, c) { return s + c.indicative.length; }, 0),
      doConcepts: cs.filter(function (c) { return c.tier === 'do'; }).length,
      load: cs.reduce(function (s, c) { return s + loadUnits(c); }, 0),
      exclusions: cs.reduce(function (s, c) { return s + c.excluded.length; }, u.excluded.length)
    };
  }

  var API = {
    SYLLABUS: SYLLABUS,
    FACTS: FACTS,
    PASS_MARK_NOTE: PASS_MARK_NOTE,
    concepts: concepts,
    unitSummary: unitSummary,
    loadUnits: loadUnits
  };

  if (typeof module === 'object' && module.exports) module.exports = API;
  else {
    root.AAT1_SYLLABUS = SYLLABUS;
    root.AAT1_FACTS = FACTS;
    root.AAT1_SYLLABUS_API = API;
  }
}(typeof self !== 'undefined' ? self : this));
