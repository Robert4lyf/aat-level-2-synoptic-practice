/* ----------------------------------------------------------
   AAT Level 2 Synoptic Practice -- Question Bank
   ----------------------------------------------------------
   AUDIT NOTES (v3):
   - Question IDs are consistently formatted as <topic>-NNN
     (zero-padded, sequential within each topic).
   - Each question has a `difficulty` tag: easy | medium | hard.
     Determined heuristically from numerical content, NOT/except
     phrasing, scenario length, and conceptual complexity.
   - Near-duplicate questions (Jaccard > 0.85) collapsed to the
     highest-quality version (longer or clearer explanation).
   - Examiner voice; explanations terminated with a full stop and
     capitalised; question stems end with `?`, `:` or `.`.
   - LIFO is flagged as not permitted under IFRS / UK GAAP where
     mentioned.
   ---------------------------------------------------------- */

window.TOPICS = [
  {
    "id": "itbk",
    "name": "Introduction to Bookkeeping",
    "short": "Bookkeeping",
    "icon": "📒",
    "desc": "Double-entry, ledgers, invoices, cash book"
  },
  {
    "id": "pobc",
    "name": "Principles of Bookkeeping Controls",
    "short": "Controls",
    "icon": "🔒",
    "desc": "Control accounts, journals, bank reconciliation"
  },
  {
    "id": "poc",
    "name": "Principles of Costing",
    "short": "Costing",
    "icon": "📐",
    "desc": "Cost classification, coding, costing systems"
  },
  {
    "id": "besy",
    "name": "The Business Environment",
    "short": "Business Env.",
    "icon": "🏢",
    "desc": "Business types, contract law, economics"
  }
];

window.ALL_QUESTIONS = [

  /* -- INTRODUCTION TO BOOKKEEPING (ITBK) -- */
  { id: 'itbk-001', topic: 'itbk', difficulty: 'easy',
    q: 'A business issues a credit note to a customer. The double entry is:',
    opts: ['Dr Sales Returns, Cr Trade Receivables', 'Dr Trade Receivables, Cr Sales Returns', 'Dr Bank, Cr Sales Returns', 'Dr Sales, Cr Bank'],
    ans: 0,
    exp: 'Dr Sales Returns (reducing revenue), Cr Trade Receivables (reducing the amount owed by the customer).' },

  { id: 'itbk-002', topic: 'itbk', difficulty: 'easy',
    q: 'A business issues shares at a premium. What does the share premium represent?',
    opts: [
      'The amount received for shares above their nominal value',
      'The profit the company has earned since it began trading',
      'The dividend paid out to shareholders during the period',
      'The interest charged on money the company has borrowed',
    ],
    ans: 0,
    exp: 'Share premium is the excess over nominal value of shares issued.' },

  { id: 'itbk-003', topic: 'itbk', difficulty: 'easy',
    q: 'A business purchases goods on credit. The correct entry is:',
    opts: [
      'Dr Purchases, Cr Trade payables',
      'Dr Trade payables, Cr Purchases',
      'Dr Purchases, Cr Bank and cash',
      'Dr Trade payables, Cr Bank',
    ],
    ans: 0,
    exp: 'Credit purchases increase liabilities (trade payables).' },

  { id: 'itbk-004', topic: 'itbk', difficulty: 'easy',
    q: 'A business receives a credit note from a supplier. In which book of prime entry is it recorded?',
    opts: [
      'The purchases returns day book',
      'The purchases day book for the period',
      'The sales returns day book for the period',
      'The cash book covering bank and cash',
    ],
    ans: 0,
    exp: 'A credit note received from a supplier is recorded in the purchases returns day book. It reduces the amount owed to that supplier.' },

  { id: 'itbk-005', topic: 'itbk', difficulty: 'easy',
    q: 'A cash discount allowed to a customer is recorded as:',
    opts: [
      'The sales day book listing credit invoices issued',
      'The purchases day book listing invoices received',
      'The cash book recording bank and cash movements',
      'The journal recording adjustments and corrections',
    ],
    ans: 0,
    exp: 'Discounts Allowed is an expense (debit). Trade Receivables is reduced (credit) when the discount is granted to the customer.' },

  { id: 'itbk-006', topic: 'itbk', difficulty: 'easy',
    q: 'A credit balance on a customer\'s account indicates:',
    opts: [
      'A document reducing the amount a customer owes',
      'A document requesting payment from a credit customer',
      'A document ordering goods from a chosen supplier',
      'A document confirming goods have arrived and been checked',
    ],
    ans: 0,
    exp: 'Customers normally have debit balances. A credit balance means the customer has overpaid or has been issued a credit note — the business owes them.' },

  { id: 'itbk-007', topic: 'itbk', difficulty: 'easy',
    q: 'A debit balance on the rent account represents:',
    opts: [
      'A document confirming goods have been received and checked',
      'A document requesting goods from a chosen supplier',
      'A document requesting payment from a credit customer',
      'A document reducing the amount owed by a customer',
    ],
    ans: 0,
    exp: 'Rent paid is an expense. Expense accounts have debit balances.' },

  { id: 'itbk-008', topic: 'itbk', difficulty: 'easy',
    q: 'A debit entry in the sales ledger control account (SLCA) most commonly represents:',
    opts: [
      'A document telling the supplier which invoices are being paid',
      'A document requesting goods from a chosen supplier',
      'A document confirming that goods have been delivered',
      'A document requesting payment from a credit customer',
    ],
    ans: 0,
    exp: 'Credit sales increase the amount owed by customers, which is debited to the SLCA. Other less-common debit entries include dishonoured cheques and interest charged to customers.' },

  { id: 'itbk-009', topic: 'itbk', difficulty: 'easy',
    q: 'A debit entry to the bank account represents:',
    opts: ['Money leaving the business', 'An increase in money at the bank', 'A liability increasing', 'A decrease in the bank balance'],
    ans: 1,
    exp: 'Bank is an asset account. A debit increases an asset, so a debit to bank means money has been received.' },

  { id: 'itbk-010', topic: 'itbk', difficulty: 'easy',
    q: 'A discount allowed is recorded as:',
    opts: ['Revenue increase', 'Expense increase', 'Liability increase', 'Asset increase'],
    ans: 1,
    exp: 'Discounts allowed reduce profit as an expense.' },

  { id: 'itbk-011', topic: 'itbk', difficulty: 'easy',
    q: 'A goods received note (GRN) is used to:',
    opts: [
      'Confirm that ordered goods have been received and checked on delivery',
      'Request goods from a supplier at the prices previously agreed',
      'Request payment from a customer for goods supplied on credit',
      'Record a sale in the accounting records at the point of despatch',
    ],
    ans: 0,
    exp: 'A GRN is an internal document confirming the quantity and condition of goods received. It is matched against the purchase order and supplier invoice before payment.' },

  { id: 'itbk-012', topic: 'itbk', difficulty: 'easy',
    q: 'A purchase return occurs when:',
    opts: [
      'Goods bought from a supplier are returned to that supplier',
      'Goods sold to a customer are returned by that customer',
      'A refund of overpaid tax is received from HMRC',
      'Cash is withdrawn from the business bank account',
    ],
    ans: 0,
    exp: 'A purchase return is when the business sends goods back to a supplier. The supplier then issues a credit note.' },

  { id: 'itbk-013', topic: 'itbk', difficulty: 'easy',
    q: 'A remittance advice is sent by:',
    opts: [
      'The buyer, to notify the seller of a payment made',
      'The seller, to request payment of an outstanding invoice',
      'HMRC, to confirm that a tax payment has been received',
      'The bank, to confirm that a transaction has been processed',
    ],
    ans: 0,
    exp: 'The buyer sends a remittance advice to the supplier to advise which invoices are being paid, helping the supplier allocate the payment correctly.' },

  { id: 'itbk-014', topic: 'itbk', difficulty: 'easy',
    q: 'A sales invoice is posted twice to the sales ledger control account. The effect is:',
    opts: ['Overstated receivables', 'Understated receivables', 'No effect', 'Overstated liabilities'],
    ans: 0,
    exp: 'Posting a sales invoice twice debits the SLCA twice, overstating trade receivables.' },

  { id: 'itbk-015', topic: 'itbk', difficulty: 'easy',
    q: 'A supplier invoice is received but not recorded at year end. What is the effect?',
    opts: [
      'Both expenses and liabilities are understated at the year end',
      'Reported profit for the year is understated by the amount',
      'Liabilities are understated but expenses are correctly stated',
      'The assets recorded at the year end are overstated',
    ],
    ans: 0,
    exp: 'Failing to record a supplier invoice at year end omits the expense (understating purchases/expenses) and the related liability (understating trade payables).' },

  { id: 'itbk-016', topic: 'itbk', difficulty: 'easy',
    q: 'A supplier issues a credit note after an invoice has been recorded. What is the correct adjustment?',
    opts: [
      'Decrease purchases and decrease trade payables',
      'Increase purchases and increase trade payables',
      'Increase the revenue recorded for the period',
      'Decrease the cash held by the business only',
    ],
    ans: 0,
    exp: 'A credit note reduces the amount owed to the supplier.' },

  { id: 'itbk-017', topic: 'itbk', difficulty: 'easy',
    q: 'A trade discount is:',
    opts: [
      'A price reduction given to trade customers at the time of sale',
      'A reduction offered to a customer for settling their invoice early',
      'Interest charged to a customer who pays their invoice late',
      'A refund given to a customer after goods have been returned',
    ],
    ans: 0,
    exp: 'A trade discount is deducted at the point of sale. Only the net (post-discount) amount is recorded in the books.' },

  { id: 'itbk-018', topic: 'itbk', difficulty: 'easy',
    q: 'An accrued expense is recorded in which way at year end?',
    opts: ['Dr expense, Cr liability', 'Dr liability, Cr expense', 'Dr asset, Cr expense', 'Dr expense, Cr asset'],
    ans: 0,
    exp: 'Accruals increase expenses and create a liability.' },

  { id: 'itbk-019', topic: 'itbk', difficulty: 'easy',
    q: 'The accounting equation is:',
    opts: ['Assets = Capital − Liabilities', 'Assets = Capital + Liabilities', 'Liabilities = Capital + Assets', 'Capital = Assets + Liabilities'],
    ans: 1,
    exp: 'Assets = Capital + Liabilities. This can be rearranged as Capital = Assets − Liabilities.' },

  { id: 'itbk-020', topic: 'itbk', difficulty: 'easy',
    q: 'The purpose of coding in accounting systems is to:',
    opts: [
      'Allocate transactions to the correct ledger account for later analysis',
      'Make transactions harder to trace back to their source documents',
      'Prevent fraud by concealing the nature of each recorded transaction',
      'Reduce the total number of transactions the business has to record',
    ],
    ans: 0,
    exp: 'Coding assigns a unique identifier to each transaction so it is posted to the correct account, cost centre or department — enabling accurate analysis and reporting.' },

  { id: 'itbk-021', topic: 'itbk', difficulty: 'easy',
    q: 'The trial balance is prepared to:',
    opts: [
      'Check that total debits equal total credits across the ledgers',
      'Calculate the profit or loss made during the accounting period',
      'Show the amount of cash and bank the business holds',
      'List the assets and liabilities held at the reporting date',
    ],
    ans: 0,
    exp: 'The trial balance is an arithmetic check. If debits equal credits the ledger is likely correct, although certain errors (e.g. omission, principle) will not be detected.' },

  { id: 'itbk-022', topic: 'itbk', difficulty: 'easy',
    q: 'VAT input tax exceeds output tax. What is the outcome?',
    opts: ['VAT payable to HMRC', 'VAT receivable from HMRC', 'No VAT adjustment', 'Increase in sales'],
    ans: 1,
    exp: 'Where input tax exceeds output tax, the business has reclaimable VAT — HMRC owes a refund to the business.' },

  { id: 'itbk-023', topic: 'itbk', difficulty: 'easy',
    q: 'VAT output tax exceeds input tax. The business will:',
    opts: ['Receive refund from HMRC', 'Owe HMRC VAT', 'Pay no VAT', 'Increase assets'],
    ans: 1,
    exp: 'Where output tax exceeds input tax, the business owes the net difference to HMRC.' },

  { id: 'itbk-024', topic: 'itbk', difficulty: 'easy',
    q: 'What does a debit balance on a bank account represent?',
    opts: [
      'Cash held at the bank, which is an asset of the business',
      'An overdraft, meaning the business owes money to the bank',
      'A liability owed by the business at the reporting date',
      'Revenue earned by the business during the period',
    ],
    ans: 0,
    exp: 'A debit balance indicates money held in the bank account (asset).' },

  { id: 'itbk-025', topic: 'itbk', difficulty: 'easy',
    q: 'What is a bad debt?',
    opts: [
      'A receivable that is considered irrecoverable and written off',
      'An amount a customer has paid over and above what was owed',
      'A reduction offered to a customer for prompt settlement',
      'An asset representing amounts owed by credit customers',
    ],
    ans: 0,
    exp: 'A bad debt is a trade receivable considered irrecoverable. It is written off as an expense and removed from receivables.' },

  { id: 'itbk-026', topic: 'itbk', difficulty: 'easy',
    q: 'What is a remittance advice used for?',
    opts: ['Request payment', 'Confirm payment sent', 'Issue invoice', 'Record inventory'],
    ans: 1,
    exp: 'A remittance advice is sent by the buyer to the supplier confirming the payment made and the invoices it relates to.' },

  { id: 'itbk-027', topic: 'itbk', difficulty: 'easy',
    q: 'What is a bank overdraft?',
    opts: [
      'A negative bank balance where the business owes money to the bank',
      'An asset representing cash the business holds at the bank',
      'Income earned from interest paid by the bank',
      'An expense representing bank charges for the period',
    ],
    ans: 0,
    exp: 'A bank overdraft is a negative bank balance — money owed to the bank. It is classified as a current liability.' },

  { id: 'itbk-028', topic: 'itbk', difficulty: 'easy',
    q: 'What does the double-entry principle state?',
    opts: [
      'Every transaction has an equal debit entry and credit entry',
      'Every transaction is recorded once, in a single ledger account',
      'Only transactions involving cash or bank need to be recorded',
      'Only transactions affecting reported profit need to be recorded',
    ],
    ans: 0,
    exp: 'Every transaction is recorded with equal debit and credit amounts, keeping the accounting equation in balance.' },

  { id: 'itbk-029', topic: 'itbk', difficulty: 'easy',
    q: 'What is a ledger?',
    opts: [
      'A collection of the accounts in which transactions are recorded',
      'A source document evidencing that a transaction has occurred',
      'An invoice issued to a customer requesting payment for goods',
      'A statement issued by the bank listing account transactions',
    ],
    ans: 0,
    exp: 'A ledger is a collection of accounts in which all transactions of the business are recorded.' },

  { id: 'itbk-030', topic: 'itbk', difficulty: 'easy',
    q: 'What is petty cash typically used for?',
    opts: [
      'A statement listing every ledger balance in debit and credit columns',
      'A summary of the cash and bank transactions for the period',
      'A document issued to a customer requesting payment for goods',
      'A report showing the value of the inventory held at year end',
    ],
    ans: 0,
    exp: 'Petty cash covers small miscellaneous expenses such as stamps and taxi fares — items too small to pay by BACS or cheque.' },

  { id: 'itbk-031', topic: 'itbk', difficulty: 'easy',
    q: 'What is a purchases return?',
    opts: [
      'Goods returned by the business to the supplier who sold them',
      'Goods sold by the business to one of its credit customers',
      'Cash received into the business from a credit customer',
      'A discount received for settling a supplier invoice early',
    ],
    ans: 0,
    exp: 'A purchases return is when the business returns previously purchased goods to a supplier. The supplier issues a credit note.' },

  { id: 'itbk-032', topic: 'itbk', difficulty: 'easy',
    q: 'What is recorded in the journal?',
    opts: [
      'Non-routine adjustments not covered by other books of prime entry',
      'Routine cash sales made by the business during the period',
      'The transactions listed on the statement received from the bank',
      'Only the sales invoices issued to credit customers',
    ],
    ans: 0,
    exp: 'The journal records adjustments and non-routine entries.' },

  { id: 'itbk-033', topic: 'itbk', difficulty: 'easy',
    q: 'What is a sales return?',
    opts: [
      'Goods returned to the business by one of its credit customers',
      'Goods bought by the business from one of its credit suppliers',
      'A sale made by the business and settled immediately in cash',
      'A credit note received by the business from one of its suppliers',
    ],
    ans: 0,
    exp: 'A sales return is when a customer returns goods previously sold to them. The business issues a credit note.' },

  { id: 'itbk-034', topic: 'itbk', difficulty: 'easy',
    q: 'What is the accounting treatment of drawings?',
    opts: [
      'A reduction in the owner\'s capital in the business',
      'An expense charged against the profit for the period',
      'Revenue earned by the business during the period',
      'An asset held by the business at the reporting date',
    ],
    ans: 0,
    exp: 'Drawings represent cash or goods withdrawn by the owner for personal use. They reduce the owner\'s capital, not profit.' },

  { id: 'itbk-035', topic: 'itbk', difficulty: 'easy',
    q: 'What is the effect of a debit entry to capital?',
    opts: ['Increases capital', 'Decreases capital', 'Increases profit', 'No effect'],
    ans: 1,
    exp: 'Capital has a credit balance. A debit entry reduces capital — for example drawings or losses.' },

  { id: 'itbk-036', topic: 'itbk', difficulty: 'easy',
    q: 'What is the effect of writing off a bad debt?',
    opts: [
      'Trade receivables and reported profit both decrease',
      'Reported profit increases for the current period',
      'The total assets of the business increase',
      'The total liabilities of the business increase',
    ],
    ans: 0,
    exp: 'Writing off a bad debt reduces trade receivables (an asset) and recognises a bad-debt expense, which reduces profit.' },

  { id: 'itbk-037', topic: 'itbk', difficulty: 'easy',
    q: 'What is the normal balance of trade receivables?',
    opts: ['Credit', 'Debit', 'Zero', 'Negative'],
    ans: 1,
    exp: 'Assets like receivables have debit balances.' },

  { id: 'itbk-038', topic: 'itbk', difficulty: 'easy',
    q: 'What is the purpose of a remittance advice when a payment is made?',
    opts: [
      'It tells the supplier which invoices the payment covers',
      'It requests a refund of an amount overpaid to a supplier',
      'It sets out the credit terms agreed with a supplier',
      'It records the VAT charged on a purchase invoice',
    ],
    ans: 0,
    exp: 'It informs the supplier which invoices are being settled.' },

  { id: 'itbk-039', topic: 'itbk', difficulty: 'easy',
    q: 'What is the purpose of control accounts?',
    opts: [
      'To provide a summary check on the subsidiary ledgers',
      'To replace the subsidiary ledgers entirely in the system',
      'To record the cash and bank transactions of the business',
      'To calculate the profit the business made in the period',
    ],
    ans: 0,
    exp: 'Control accounts summarise ledger totals for verification.' },

  { id: 'itbk-040', topic: 'itbk', difficulty: 'easy',
    q: 'What is the purpose of the sales day book?',
    opts: [
      'List all credit sales invoices before they are posted to the ledger',
      'Record only the cash sales made by the business during the period',
      'Reconcile the bank account against the balance on the cash book',
      'Record the purchases made by the business from its credit suppliers',
    ],
    ans: 0,
    exp: 'The sales day book is a book of prime entry — it lists credit sales invoices before they are posted to the sales ledger and the SLCA.' },

  { id: 'itbk-041', topic: 'itbk', difficulty: 'easy',
    q: 'What is a trade discount?',
    opts: [
      'A reduction from the list price given at the point of sale',
      'A reduction offered for settling the invoice early',
      'A refund of tax received from HMRC after a claim',
      'A reduction in the interest charged on a business loan',
    ],
    ans: 0,
    exp: 'A trade discount is a price reduction given at the point of sale to trade customers. It is deducted before the invoice is raised and is not recorded separately in the ledger.' },

  { id: 'itbk-042', topic: 'itbk', difficulty: 'easy',
    q: 'What is a trade receivable?',
    opts: [
      'An amount owed to the business by a credit customer',
      'An amount owed by the business to a credit supplier',
      'An amount borrowed by the business from its bank',
      'The capital invested in the business by its owner',
    ],
    ans: 0,
    exp: 'A trade receivable is an amount owed to the business by a customer who has bought on credit.' },

  { id: 'itbk-043', topic: 'itbk', difficulty: 'easy',
    q: 'When a business pays a supplier, the correct double entry is:',
    opts: ['Dr Bank, Cr Trade Payables', 'Dr Trade Payables, Cr Bank', 'Dr Trade Payables, Cr Sales', 'Dr Purchases, Cr Bank'],
    ans: 1,
    exp: 'Paying a supplier reduces the liability (Dr Trade Payables) and reduces the bank balance (Cr Bank).' },

  { id: 'itbk-044', topic: 'itbk', difficulty: 'easy',
    q: 'Which account is affected when inventory is purchased on credit?',
    opts: [
      'Trade payables, because the amount is owed to the supplier',
      'Bank, because the payment leaves the business account immediately',
      'Sales, because the transaction is recorded as revenue earned',
      'Capital, because the owner\'s investment in the business changes',
    ],
    ans: 0,
    exp: 'Buying inventory on credit increases the liability owed to the supplier — Cr Trade Payables.' },

  { id: 'itbk-045', topic: 'itbk', difficulty: 'easy',
    q: 'Which account is credited when goods are sold on credit?',
    opts: ['Bank', 'Sales', 'Trade Receivables', 'Purchases'],
    ans: 1,
    exp: 'Selling goods on credit recognises revenue: Dr Trade Receivables, Cr Sales.' },

  { id: 'itbk-046', topic: 'itbk', difficulty: 'easy',
    q: 'Which accounting treatment is required for irrecoverable debts recovered after being written off?',
    opts: [
      'A book of prime entry listing credit sales invoices issued',
      'A ledger account recording the amount owed by each customer',
      'A statement sent to a customer listing the month\'s transactions',
      'A note issued to a customer reducing the amount they owe',
    ],
    ans: 0,
    exp: 'When a previously written-off debt is recovered, the recovery is credited to the bad-debts expense account, reducing the expense (or it can be credited to a separate "Bad Debts Recovered" income account).' },

  { id: 'itbk-047', topic: 'itbk', difficulty: 'easy',
    q: 'Which document accompanies goods delivered to a customer?',
    opts: [
      'A reduction in the amount owed by a credit customer',
      'An increase in the amount owed by a credit customer',
      'A record of the cash a customer has paid into the bank',
      'An invoice issued to a customer for goods supplied',
    ],
    ans: 0,
    exp: 'A delivery note accompanies goods and confirms what has been physically delivered. The customer signs it on receipt.' },

  { id: 'itbk-048', topic: 'itbk', difficulty: 'easy',
    q: 'Which document confirms goods have been ordered from a supplier?',
    opts: ['Invoice', 'Purchase order', 'Credit note', 'Remittance advice'],
    ans: 1,
    exp: 'A purchase order is issued by the buyer to the supplier to request goods or services. It specifies what is being ordered and on what terms.' },

  { id: 'itbk-049', topic: 'itbk', difficulty: 'easy',
    q: 'Which document confirms that ordered goods have been delivered and checked against the order?',
    opts: [
      'A goods received note raised when the delivery is checked',
      'A purchase order sent to the supplier requesting the goods',
      'An invoice received from the supplier requesting payment',
      'A remittance advice sent when the invoice is settled',
    ],
    ans: 0,
    exp: 'A goods received note (GRN) is an internal document confirming that ordered goods have been received and checked. It is matched against the purchase order and supplier invoice before payment.' },

  { id: 'itbk-050', topic: 'itbk', difficulty: 'easy',
    q: 'Which document is sent by a seller to request payment?',
    opts: [
      'The amount owed to suppliers for goods bought on credit',
      'The amount owed by customers for goods sold on credit',
      'The value of the inventory held at the reporting date',
      'The capital invested in the business by its owner',
    ],
    ans: 0,
    exp: 'A sales invoice requests payment from the buyer, showing the amount owed, the payment terms and the due date.' },

  { id: 'itbk-051', topic: 'itbk', difficulty: 'easy',
    q: 'Which document is used internally to correct errors in the ledger?',
    opts: ['Invoice', 'Credit note', 'Journal', 'Remittance advice'],
    ans: 2,
    exp: 'The journal is used for non-routine entries — including corrections, year-end adjustments and opening balances.' },

  { id: 'itbk-052', topic: 'itbk', difficulty: 'easy',
    q: 'Which document is used to initiate a purchase?',
    opts: ['Sales invoice', 'Purchase order', 'Credit note', 'Statement'],
    ans: 1,
    exp: 'A purchase order is the formal document used to initiate a purchase from a supplier.' },

  { id: 'itbk-053', topic: 'itbk', difficulty: 'easy',
    q: 'Which document provides evidence of goods ordered but not yet received?',
    opts: ['Invoice', 'Purchase order', 'Goods received note', 'Remittance advice'],
    ans: 1,
    exp: 'A purchase order evidences that goods have been ordered, but does not by itself confirm that they have arrived.' },

  { id: 'itbk-054', topic: 'itbk', difficulty: 'easy',
    q: 'Which double entry correctly records a cash sale?',
    opts: [
      'A book of prime entry listing credit purchase invoices',
      'A ledger account recording amounts owed to each supplier',
      'A statement received from a supplier listing transactions',
      'A document requesting goods from a supplier at agreed prices',
    ],
    ans: 0,
    exp: 'A cash sale: Dr Bank (asset increases as money is received), Cr Sales (revenue increases). No receivable arises because payment is immediate.' },

  { id: 'itbk-055', topic: 'itbk', difficulty: 'easy',
    q: 'Which is posted to the credit side of the sales ledger control account (SLCA)?',
    opts: [
      'Cash received from credit customers during the period',
      'Credit sales invoices issued to customers in the period',
      'Cheques from customers dishonoured by the bank',
      'Discounts received from suppliers for prompt payment',
    ],
    ans: 0,
    exp: 'The SLCA is debited with sales and credited when customers pay (reducing the balance owed). Credit sales invoices and dishonoured cheques are debits; discounts received relates to the PLCA.' },

  { id: 'itbk-056', topic: 'itbk', difficulty: 'easy',
    q: 'Which is posted to the debit side of the telephone expense account?',
    opts: ['Payment received from a customer', 'A telephone bill paid', 'A refund from the telephone provider', 'A reduction in the telephone bill'],
    ans: 1,
    exp: 'Paying a telephone bill increases an expense (debit) and reduces the bank balance (credit): Dr Telephone Expense, Cr Bank.' },

  { id: 'itbk-057', topic: 'itbk', difficulty: 'easy',
    q: 'Which item is classified as a non-current asset?',
    opts: ['Inventory', 'Trade receivables', 'Motor vehicle', 'Cash'],
    ans: 2,
    exp: 'Non-current assets are long-term resources such as vehicles.' },

  { id: 'itbk-058', topic: 'itbk', difficulty: 'easy',
    q: 'Which ledger records customer accounts?',
    opts: [
      'An amount deducted from the list price at the point of sale',
      'An amount deducted if the customer settles the invoice early',
      'Interest charged when a customer pays their invoice late',
      'A refund made after the customer has returned the goods',
    ],
    ans: 0,
    exp: 'Sales ledger contains customer accounts.' },

  { id: 'itbk-059', topic: 'itbk', difficulty: 'easy',
    q: 'Which of the following appears on the credit side of the VAT control account?',
    opts: ['VAT on purchases (input tax)', 'VAT on sales (output tax)', 'VAT refund received from HMRC', 'VAT paid to HMRC'],
    ans: 1,
    exp: 'Output tax (VAT charged on sales) is a liability and is credited to the VAT control account. Input tax is debited. A credit balance represents the net amount owed to HMRC.' },

  { id: 'itbk-060', topic: 'itbk', difficulty: 'easy',
    q: 'Which of the following is a book of prime entry?',
    opts: ['Trial balance', 'General ledger', 'Purchases day book', 'Statement of financial position'],
    ans: 2,
    exp: 'Books of prime entry (day books, cash book, journal) are where transactions are first recorded before being posted to the ledger.' },

  { id: 'itbk-061', topic: 'itbk', difficulty: 'easy',
    q: 'Which of the following is capital expenditure?',
    opts: ['Purchasing stationery', 'Paying wages', 'Buying a new delivery van', 'Paying the electricity bill'],
    ans: 2,
    exp: 'Capital expenditure is spending on long-term assets used over more than one accounting period. The other options are revenue expenditure.' },

  { id: 'itbk-062', topic: 'itbk', difficulty: 'easy',
    q: 'Which of the following would reduce the balance on the purchases ledger control account?',
    opts: [
      'Both returns made to suppliers and payments made to suppliers',
      'Purchases of goods made from suppliers on credit terms',
      'Goods returned to suppliers, but not payments made to them',
      'Payments made to suppliers, but not goods returned to them',
    ],
    ans: 0,
    exp: 'The PLCA credit balance is reduced by both payments to suppliers (Dr PLCA, Cr Bank) and returns to suppliers (Dr PLCA, Cr Purchases Returns). Each reduces the liability.' },

  { id: 'itbk-063', topic: 'itbk', difficulty: 'easy',
    q: 'Which statement correctly describes the dual effect of transactions?',
    opts: [
      'Every transaction has equal and opposite effects on two accounts',
      'Every transaction affects one ledger account and no others',
      'Every transaction must involve a movement of cash or bank',
      'Every transaction is reflected in the business bank account',
    ],
    ans: 0,
    exp: 'The dual effect (duality) concept states that every transaction has at least two effects — equal debits and credits — and forms the foundation of double-entry bookkeeping.' },

  { id: 'itbk-064', topic: 'itbk', difficulty: 'easy',
    q: 'Which statement is correct about VAT input tax?',
    opts: ['Charged on sales', 'Charged on purchases', 'Paid to employees', 'Recorded as revenue'],
    ans: 1,
    exp: 'Input tax is the VAT charged to the business on purchases. It can usually be reclaimed from HMRC.' },

  { id: 'itbk-065', topic: 'itbk', difficulty: 'easy',
    q: 'Which statement is correct about VAT registered businesses?',
    opts: [
      'They collect VAT on behalf of HMRC and pay it over',
      'They are not required to charge VAT on their sales',
      'They are unable to reclaim the input VAT they incur',
      'They treat the VAT they charge as a business expense',
    ],
    ans: 0,
    exp: 'VAT-registered businesses charge VAT on taxable sales and collect it on behalf of HMRC. They reclaim VAT on eligible purchases and pay the net difference to HMRC.' },

  { id: 'itbk-066', topic: 'itbk', difficulty: 'easy',
    q: 'Which transaction is entered as a receipt in the cash book?',
    opts: ['A payment to a trade payable', 'A customer paying their invoice by BACS', 'Purchasing goods on credit', 'Issuing a credit note to a customer'],
    ans: 1,
    exp: 'Receipts represent money coming in. A customer paying by BACS increases the bank balance and is recorded on the receipts (debit) side of the cash book.' },

  { id: 'itbk-067', topic: 'itbk', difficulty: 'medium',
    q: 'A business maintains inventory records using FIFO. Closing inventory contains the most recent purchases because:',
    opts: [
      'The newest purchases are assumed to remain unsold at the year end',
      'The oldest purchases are assumed to remain unsold at the year end',
      'A weighted average cost is applied across all units purchased',
      'Inventory is revalued to market price at the end of each month',
    ],
    ans: 0,
    exp: 'FIFO assumes earliest items are used first, leaving latest purchases in closing inventory.' },

  { id: 'itbk-068', topic: 'itbk', difficulty: 'medium',
    q: 'A business receives a cheque from a customer that is subsequently dishonoured by the bank. Which entry reverses the original receipt?',
    opts: ['Dr Bank, Cr Trade Receivables', 'Dr Trade Receivables, Cr Bank', 'Dr Trade Receivables, Cr Sales', 'Dr Bank, Cr Sales'],
    ans: 1,
    exp: 'A dishonoured cheque reverses the original receipt: Dr Trade Receivables (re-instating the debt), Cr Bank (removing the amount from the bank).' },

  { id: 'itbk-069', topic: 'itbk', difficulty: 'medium',
    q: 'A cheque from a customer is later returned by the bank unpaid. The double entry to record this is:',
    opts: [
      'Dr Trade receivables, Cr Bank',
      'Dr Bank, Cr Trade receivables',
      'Dr Sales returns, Cr Trade receivables',
      'Dr Irrecoverable debts, Cr Bank',
    ],
    ans: 0,
    exp: 'The original receipt is reversed: Dr Trade Receivables, Cr Bank.' },

  { id: 'itbk-070', topic: 'itbk', difficulty: 'medium',
    q: 'A prepayment is shown in the financial statements as:',
    opts: [
      'Dr Bank, Cr Trade receivables',
      'Dr Trade receivables, Cr Bank',
      'Dr Sales, Cr Trade receivables',
      'Dr Bank, Cr Sales',
    ],
    ans: 0,
    exp: 'A prepayment is an expense paid in advance — the benefit has not yet been received, so it is classified as a current asset.' },

  { id: 'itbk-071', topic: 'itbk', difficulty: 'medium',
    q: 'A prepayment occurs when:',
    opts: ['An expense is incurred but not yet paid', 'An expense is paid in advance', 'Revenue is received late', 'A liability is written off'],
    ans: 1,
    exp: 'Prepayments are advance payments for future expenses.' },

  { id: 'itbk-072', topic: 'itbk', difficulty: 'medium',
    q: 'A prepayment of insurance exists at year end. What is the adjustment?',
    opts: ['Dr expense, Cr prepayment', 'Dr prepayment, Cr expense', 'Dr liability, Cr expense', 'Dr expense, Cr liability'],
    ans: 1,
    exp: 'Prepayments are carried forward as current assets: Dr Prepayments (asset), Cr Expense (reducing the period charge).' },

  { id: 'itbk-073', topic: 'itbk', difficulty: 'medium',
    q: 'A sales ledger control account and sales ledger differ due to:',
    opts: [
      'Timing differences and errors made when posting entries',
      'Errors made by the bank in processing transactions',
      'Changes in the rate of VAT applied to sales',
      'The depreciation charged on non-current assets',
    ],
    ans: 0,
    exp: 'Differences between the SLCA and the sum of individual sales ledger balances are caused by posting errors, omissions or timing differences.' },

  { id: 'itbk-074', topic: 'itbk', difficulty: 'medium',
    q: 'A supplier invoice is recorded as £540 in the purchases day book when the correct amount is £450. What type of error is this?',
    opts: ['Complete omission', 'Error of original entry', 'Compensating error', 'Error of principle'],
    ans: 1,
    exp: 'An error of original entry occurs when an incorrect figure is used at the point of entry. Both sides of the double entry are then wrong by the same amount, so the trial balance still balances.' },

  { id: 'itbk-075', topic: 'itbk', difficulty: 'medium',
    q: 'An accrual is best described as:',
    opts: [
      'An expense incurred in the period but not yet invoiced or paid',
      'An expense paid in advance of the period to which it relates',
      'Income received in advance of the period it relates to',
      'A reduction in the carrying value of a non-current asset',
    ],
    ans: 0,
    exp: 'An accrual is an expense incurred in the current period but not yet invoiced or paid. It is shown as a current liability on the statement of financial position.' },

  { id: 'itbk-076', topic: 'itbk', difficulty: 'medium',
    q: 'An accrual is omitted. What is the effect on profit?',
    opts: ['Overstated', 'Understated', 'No effect', 'Neutralised'],
    ans: 0,
    exp: 'An omitted accrual understates expenses, which overstates profit (and understates liabilities).' },

  { id: 'itbk-077', topic: 'itbk', difficulty: 'medium',
    q: 'Depreciation is charged on non-current assets to comply with which accounting concept?',
    opts: [
      'The matching (accruals) concept, spreading cost over the useful life',
      'The prudence concept, writing the asset off in full when acquired',
      'The requirements set by HMRC for calculating taxable profits',
      'The going concern concept, assuming the business will continue trading',
    ],
    ans: 0,
    exp: 'The matching (accruals) concept requires the cost of a non-current asset to be spread over the periods that benefit from its use — achieved through depreciation.' },

  { id: 'itbk-078', topic: 'itbk', difficulty: 'medium',
    q: 'Depreciation is recorded to:',
    opts: [
      'Match the cost of the asset against the periods that benefit',
      'Increase the carrying value of the asset in the accounts',
      'Increase the cash flowing into the business each period',
      'Reduce the amount of VAT the business must pay to HMRC',
    ],
    ans: 0,
    exp: 'Depreciation spreads the cost of a non-current asset over its useful life, matching the cost to the periods that benefit from its use.' },

  { id: 'itbk-079', topic: 'itbk', difficulty: 'medium',
    q: 'The imprest system of petty cash means:',
    opts: [
      'Petty cash is restored to a fixed float at regular intervals',
      'All of the business\'s expenses are paid out of petty cash',
      'There is no upper limit on the amount held in petty cash',
      'Petty cash is used exclusively for paying employee wages',
    ],
    ans: 0,
    exp: 'Under the imprest system the float is restored to a fixed amount each period — reimbursed by the total of vouchers paid out since the last top-up.' },

  { id: 'itbk-080', topic: 'itbk', difficulty: 'medium',
    q: 'The prudence concept in accounting means:',
    opts: [
      'Revenue is recognised only when reasonably certain, but losses as soon as anticipated',
      'All income is recognised immediately at the point at which it is earned',
      'Assets are always restated to their current market value at each year end',
      'Financial statements are prepared on a cash rather than an accruals basis',
    ],
    ans: 0,
    exp: 'Prudence (conservatism) means not overstating assets or income, and not understating liabilities or expenses. Anticipated losses are recognised immediately; gains only when realised.' },

  { id: 'itbk-081', topic: 'itbk', difficulty: 'medium',
    q: 'What is a contra entry in a cash book?',
    opts: [
      'A transfer of money between the cash account and the bank',
      'Charges levied by the bank on the business account',
      'A purchase of goods made from a supplier on credit',
      'An adjustment to the VAT recorded for the period',
    ],
    ans: 0,
    exp: 'A contra entry in the cash book transfers money between the bank and cash columns — for example withdrawing cash from the bank: Cr Bank, Dr Cash.' },

  { id: 'itbk-082', topic: 'itbk', difficulty: 'medium',
    q: 'What is an accrual?',
    opts: [
      'An expense that has been incurred but not yet paid',
      'An expense that has been paid but not yet incurred',
      'An asset representing amounts owed to the business',
      'Revenue that has been earned during the period',
    ],
    ans: 0,
    exp: 'An accrual is an expense that has been incurred during the period but not yet invoiced or paid. It is recognised by debiting the expense and crediting accruals (a liability).' },

  { id: 'itbk-083', topic: 'itbk', difficulty: 'medium',
    q: 'What is a prepayment?',
    opts: [
      'An expense paid in advance of the period to which it relates',
      'An expense incurred in the period but not yet paid or invoiced',
      'Revenue earned by the business during the current accounting period',
      'Capital introduced into the business by its owner during the period',
    ],
    ans: 0,
    exp: 'A prepayment is an expense paid in advance of the period to which it relates. It is recognised as a current asset until consumed.' },

  { id: 'itbk-084', topic: 'itbk', difficulty: 'medium',
    q: 'What is the effect of a contra entry between SLCA and PLCA?',
    opts: [
      'It reduces both trade receivables and trade payables',
      'It increases the liabilities recorded by the business',
      'It increases the sales recorded for the period',
      'It has no effect on either receivables or payables',
    ],
    ans: 0,
    exp: 'A contra between the SLCA and PLCA offsets mutual balances when the same business is both a customer and a supplier — reducing both receivables and payables by the same amount.' },

  { id: 'itbk-085', topic: 'itbk', difficulty: 'medium',
    q: 'Which accounting concept requires that the same accounting methods are used from one period to the next?',
    opts: ['Going concern', 'Accruals', 'Consistency', 'Materiality'],
    ans: 2,
    exp: 'The consistency concept requires the same accounting policies and methods to be applied from period to period, enabling meaningful comparison over time.' },

  { id: 'itbk-086', topic: 'itbk', difficulty: 'medium',
    q: 'Which accounting principle requires expenses to be matched with the revenue they help generate?',
    opts: [
      'The matching (accruals) concept, aligning expense with revenue',
      'The prudence concept, recognising losses as soon as anticipated',
      'The consistency concept, applying the same policies year to year',
      'The materiality concept, disregarding items too small to matter',
    ],
    ans: 0,
    exp: 'The matching principle ensures expenses are recognised in the same period as related revenue.' },

  { id: 'itbk-087', topic: 'itbk', difficulty: 'medium',
    q: 'Which adjustment ensures income is recorded in the correct accounting period?',
    opts: [
      'Accruals and prepayments, which move income into the right period',
      'Depreciation, which spreads the cost of an asset over its life',
      'Drawings, which record amounts withdrawn by the owner',
      'Discounts, which adjust the amount received from a customer',
    ],
    ans: 0,
    exp: 'Accruals and prepayments ensure matching of income and expenses.' },

  { id: 'itbk-088', topic: 'itbk', difficulty: 'medium',
    q: 'Which adjustment ensures matching of revenue and expenses?',
    opts: [
      'Accruals and prepayments applied at the end of the period',
      'A reconciliation of the cash book against the bank statement',
      'The depreciation charged on non-current assets each period',
      'The trial balance extracted at the end of the period',
    ],
    ans: 0,
    exp: 'Accruals and prepayments apply the matching (accruals) concept, ensuring revenue and expenses are recognised in the period to which they relate.' },

  { id: 'itbk-089', topic: 'itbk', difficulty: 'medium',
    q: 'Which adjustment ensures non-current assets are stated at carrying value?',
    opts: ['Accruals', 'Depreciation', 'Revaluation of inventory', 'Bank reconciliation'],
    ans: 1,
    exp: 'Depreciation reduces an asset’s carrying amount over time to reflect its consumption or wear and tear.' },

  { id: 'itbk-090', topic: 'itbk', difficulty: 'medium',
    q: 'Which adjustment is required when insurance is paid in advance?',
    opts: [
      'An increase in an asset is recorded as a debit entry',
      'An increase in an asset is recorded as a credit entry',
      'An increase in a liability is recorded as a debit entry',
      'An increase in income is recorded as a debit entry',
    ],
    ans: 0,
    exp: 'Insurance paid in advance is a prepayment — an expense paid before the period it covers.' },

  { id: 'itbk-091', topic: 'itbk', difficulty: 'medium',
    q: 'Which adjustment is required when rent is paid quarterly in arrears and the year end falls mid-quarter?',
    opts: ['Prepayment only', 'Accrual only', 'Both accrual and prepayment', 'No adjustment needed'],
    ans: 1,
    exp: 'Rent owed but not yet paid at year end requires an accrual.' },

  { id: 'itbk-092', topic: 'itbk', difficulty: 'medium',
    q: 'Which entry records depreciation?',
    opts: [
      'Dr Depreciation expense, Cr Accumulated depreciation',
      'Dr Non-current asset, Cr Depreciation expense',
      'Dr Bank, Cr Non-current asset at carrying value',
      'Dr Accumulated depreciation, Cr Depreciation expense',
    ],
    ans: 0,
    exp: 'Depreciation is recorded as an expense with a credit to accumulated depreciation.' },

  { id: 'itbk-093', topic: 'itbk', difficulty: 'medium',
    q: 'Which of the following best describes the going concern concept?',
    opts: [
      'The business is assumed to continue trading for the foreseeable future',
      'Assets are recorded at the amount they would realise if sold now',
      'Expenses are recognised only at the point at which cash is paid',
      'The same accounting policies are applied from one year to the next',
    ],
    ans: 0,
    exp: 'The going concern concept assumes the business will continue to operate for the foreseeable future, justifying recording assets at cost rather than break-up value.' },

  { id: 'itbk-094', topic: 'itbk', difficulty: 'medium',
    q: 'Which of the following is an example of a contra entry within a three-column cash book?',
    opts: [
      'Cash is withdrawn from the bank and placed in the petty cash tin',
      'A credit customer settles their outstanding balance by BACS transfer',
      'A supplier is paid the amount owing to them by cheque',
      'A cash sale is made and the proceeds are banked the same day',
    ],
    ans: 0,
    exp: 'A cash book contra arises when cash moves between the bank and cash columns — e.g. withdrawing cash from the bank: Cr Bank column, Dr Cash column.' },

  { id: 'itbk-095', topic: 'itbk', difficulty: 'medium',
    q: 'Which of the following is NOT a valid reason for a difference between the sales ledger control account and the list of sales ledger balances?',
    opts: ['A contra entry posted to the control account but not to the individual customer account', 'A cash receipt entered in the cash book but not posted to the individual customer account', 'An error in the bank reconciliation', 'A sales invoice entered in the day book but not posted to the individual customer account'],
    ans: 2,
    exp: 'A bank reconciliation reconciles the cash book to the bank statement — it has no impact on the sales ledger or its control account.' },

  { id: 'itbk-096', topic: 'itbk', difficulty: 'medium',
    q: 'Which statement best describes a control account reconciliation?',
    opts: [
      'Matching the control account total with the individual ledger balances',
      'Matching the cash book balance against the bank statement balance',
      'Matching the profit and loss account against the statement of financial position',
      'Matching the VAT charged on sales against the VAT return submitted',
    ],
    ans: 0,
    exp: 'A control account reconciliation compares the control account balance with the total of the individual balances in the subsidiary ledger to confirm they agree.' },

  { id: 'itbk-097', topic: 'itbk', difficulty: 'hard',
    q: 'A business accrues rent expense of £1,500 at year end. What is the correct journal entry?',
    opts: ['Dr Rent expense, Cr Accruals', 'Dr Accruals, Cr Rent expense', 'Dr Bank, Cr Rent expense', 'Dr Rent expense, Cr Bank'],
    ans: 0,
    exp: 'An accrual increases the expense and creates a liability: Dr Rent Expense, Cr Accruals.' },

  { id: 'itbk-098', topic: 'itbk', difficulty: 'hard',
    q: 'A business fails to record an accrual of £500. What is the effect on profit?',
    opts: ['Overstated profit', 'Understated profit', 'No effect', 'Overstated liabilities'],
    ans: 0,
    exp: 'Expenses are understated, so profit is overstated.' },

  { id: 'itbk-099', topic: 'itbk', difficulty: 'hard',
    q: 'A business has opening inventory of £8,000, purchases of £42,000 and closing inventory of £6,000. Cost of goods sold is:',
    opts: ['£44,000', '£56,000', '£36,000', '£50,000'],
    ans: 0,
    exp: 'Cost of goods sold = opening inventory + purchases − closing inventory = £8,000 + £42,000 − £6,000 = £44,000.' },

  { id: 'itbk-100', topic: 'itbk', difficulty: 'hard',
    q: 'A business purchases goods for £1,000 less 10% trade discount. What is recorded in the purchase ledger?',
    opts: ['£1,000', '£900', '£100', '£1,100'],
    ans: 1,
    exp: 'Trade discounts are deducted before invoicing and never appear in the ledger: only the net £900 (after £100 discount) is recorded.' },

  { id: 'itbk-101', topic: 'itbk', difficulty: 'hard',
    q: 'A business receives an invoice for £2,400 including VAT at 20% but records it as £2,400 net. What type of error is this?',
    opts: ['Error of principle', 'Error of commission', 'Compensating error', 'Error of original entry'],
    ans: 0,
    exp: 'VAT (£400) should sit in the VAT control account, but the full gross £2,400 has been posted to purchases — putting an item in the wrong type of account, an error of principle.' },

  { id: 'itbk-102', topic: 'itbk', difficulty: 'hard',
    q: 'A business receives goods with a value of £800 but only £720 is invoiced due to trade discount. What is recorded?',
    opts: ['£800 purchase', '£720 purchase', '£80 discount income', '£800 liability'],
    ans: 1,
    exp: 'Trade discounts are deducted at the point of sale. Only the net invoiced amount (£720) is recorded.' },

  { id: 'itbk-103', topic: 'itbk', difficulty: 'hard',
    q: 'A business sells goods on credit for £600 plus VAT at 20%. Which amount is recorded against the invoice in the sales day book?',
    opts: ['£600', '£720', '£120', '£480'],
    ans: 1,
    exp: 'The sales day book records the gross (VAT-inclusive) invoice amount: £600 + £120 VAT = £720. The net and VAT elements are then analysed within the day book.' },

  { id: 'itbk-104', topic: 'itbk', difficulty: 'hard',
    q: 'A business writes off £300 bad debt previously recorded. Which entry is correct?',
    opts: [
      'Dr Irrecoverable debts, Cr Trade receivables',
      'Dr Irrecoverable debts, Cr Sales revenue',
      'Dr Bank and cash, Cr Trade receivables',
      'Dr Sales revenue, Cr Bank and cash',
    ],
    ans: 0,
    exp: 'Writing off a bad debt reduces trade receivables and recognises a bad-debts expense: Dr Bad Debts, Cr Trade Receivables.' },

  { id: 'itbk-105', topic: 'itbk', difficulty: 'hard',
    q: 'A business writes off a bad debt of £240 (including VAT of £40). Which entry is correct?',
    opts: [
      'Dr Irrecoverable debts £200, Dr VAT £40, Cr Trade receivables £240',
      'Dr Irrecoverable debts £240, Cr Trade receivables £240',
      'Dr Trade receivables £240, Cr Irrecoverable debts £240',
      'Dr Irrecoverable debts £240, Cr Bank and cash £240',
    ],
    ans: 0,
    exp: 'Where the strict VAT bad-debt-relief conditions are met, the VAT element can be reclaimed: Dr Bad Debts £200 (net), Dr VAT £40 (reclaimed), Cr Trade Receivables £240 (gross).' },

  { id: 'itbk-106', topic: 'itbk', difficulty: 'hard',
    q: 'A customer pays £490 in full settlement of a £500 debt. The £10 difference is:',
    opts: [
      'A settlement discount, posted to discounts allowed',
      'A trade discount, posted to the discounts allowed account',
      'A trade discount, which is never recorded in the ledgers',
      'A settlement discount, posted to the sales returns account',
    ],
    ans: 0,
    exp: 'A settlement (cash) discount IS recorded in the ledger: Dr Discounts Allowed £10, Cr Trade Receivables £10. Trade discounts are never posted to the ledger.' },

  { id: 'itbk-107', topic: 'itbk', difficulty: 'hard',
    q: 'A sole trader\'s drawings of £500 in cash should be recorded as:',
    opts: ['Dr Drawings, Cr Sales', 'Dr Drawings, Cr Bank', 'Dr Capital, Cr Bank', 'Dr Expenses, Cr Bank'],
    ans: 1,
    exp: 'Drawings represent money taken out of the business by the owner. Dr Drawings £500 (reduces capital ultimately), Cr Bank £500. Drawings are not an expense.' },

  { id: 'itbk-108', topic: 'itbk', difficulty: 'hard',
    q: 'A supplier invoice for £1,000 net plus 20% VAT (£1,200 gross) is recorded by debiting purchases with the full £1,200. What is the effect?',
    opts: [
      'Purchases are overstated by £200 and the input VAT is not recorded',
      'Trade payables are understated by the VAT element of the invoice',
      'There is no effect, because the debit and credit entries still balance',
      'Revenue for the period is understated by the amount of the VAT',
    ],
    ans: 0,
    exp: 'Purchases should have been £1,000 net with £200 debited separately to VAT control. Posting the gross £1,200 to purchases overstates expenses by £200 and means no input VAT is reclaimable from HMRC.' },

  { id: 'itbk-109', topic: 'itbk', difficulty: 'hard',
    q: 'A trade payable balance of £3,600 is settled by issuing a cheque for £3,528 in full and final settlement. The £72 difference is:',
    opts: [
      'A settlement discount received, credited to discounts received',
      'A trade discount, which is never recorded in the ledgers',
      'A purchase return, credited to the purchases returns account',
      'A refund from the supplier, debited to the bank account',
    ],
    ans: 0,
    exp: 'Paying less than the full balance in settlement of a debt creates a discount received: Dr Trade Payables £3,600, Cr Bank £3,528, Cr Discounts Received £72.' },

  { id: 'itbk-110', topic: 'itbk', difficulty: 'hard',
    q: 'A trial balance shows the debit total exceeding the credit total by £180. Which of the following could be the cause?',
    opts: ['A purchase of £90 posted as a debit to purchases AND a debit to bank', 'A sales invoice of £180 posted only to the credit of trade receivables', 'A payment of £90 to a supplier posted as a debit to trade payables and a credit to bank', 'A £180 receipt from a customer posted only as a credit to bank'],
    ans: 0,
    exp: 'Two debits of £90 (Purchases and Bank) total £180 with no corresponding credit, so debits exceed credits by exactly £180. Option B would give a credit excess; Option C is correctly balanced; Option D would also create a credit excess.' },

  { id: 'itbk-111', topic: 'itbk', difficulty: 'hard',
    q: 'An invoice is issued for £1,200 plus VAT at 20%. The total payable is:',
    opts: ['£1,200', '£1,440', '£1,020', '£960'],
    ans: 1,
    exp: 'VAT = £1,200 × 20% = £240. Total = £1,200 + £240 = £1,440.' },

  { id: 'itbk-112', topic: 'itbk', difficulty: 'hard',
    q: 'At the year end, electricity accrued is £300. Which journal entry is required?',
    opts: ['Dr Electricity £300, Cr Prepayments £300', 'Dr Accruals £300, Cr Electricity £300', 'Dr Electricity £300, Cr Accruals £300', 'Dr Bank £300, Cr Electricity £300'],
    ans: 2,
    exp: 'An accrual increases the expense (Dr Electricity) and creates a current liability (Cr Accruals), matching the expense to the correct period.' },

  { id: 'itbk-113', topic: 'itbk', difficulty: 'hard',
    q: 'Net assets at year end are £45,000. The owner introduced additional capital of £10,000 during the year, opening capital was £30,000 and there were no drawings. What is the profit for the year?',
    opts: ['£5,000', '£15,000', '£25,000', '£55,000'],
    ans: 0,
    exp: 'Closing capital = opening capital + capital introduced + profit − drawings. £45,000 = £30,000 + £10,000 + profit − £0. Profit = £45,000 − £40,000 = £5,000.' },

  { id: 'itbk-114', topic: 'itbk', difficulty: 'hard',
    q: 'Rent of £1,200 is paid quarterly in advance on 1 January, 1 April, 1 July and 1 October. The financial year end is 31 January. What is the prepayment at the year end?',
    opts: ['£0', '£400', '£800', '£1,200'],
    ans: 2,
    exp: 'The 1 January payment of £1,200 covers January, February and March. By 31 January only one month (January) has been used; February and March (2 months) relate to the next financial year. Prepayment = 2/3 × £1,200 = £800.' },

  { id: 'itbk-115', topic: 'itbk', difficulty: 'hard',
    q: 'Using the straight-line method, an asset costs £10,000, has a residual value of £1,000 and a useful life of 3 years. Annual depreciation is:',
    opts: ['£3,333', '£3,000', '£1,000', '£10,000'],
    ans: 1,
    exp: 'Straight-line depreciation = (cost − residual value) ÷ useful life = (£10,000 − £1,000) ÷ 3 = £9,000 ÷ 3 = £3,000 per year.' },

  { id: 'itbk-116', topic: 'itbk', difficulty: 'hard',
    q: 'Which of the following is the correct double entry for a credit sale of £500?',
    opts: ['Dr Sales £500, Cr Trade Receivables £500', 'Dr Trade Receivables £500, Cr Sales £500', 'Dr Bank £500, Cr Sales £500', 'Dr Sales £500, Cr Bank £500'],
    ans: 1,
    exp: 'A credit sale increases trade receivables and recognises revenue: Dr Trade Receivables, Cr Sales.' },


  /* -- PRINCIPLES OF BOOKKEEPING CONTROLS (POBC) -- */
  { id: 'pobc-001', topic: 'pobc', difficulty: 'easy',
    q: 'A control account reconciles with:',
    opts: ['Bank statement', 'Individual ledger balances', 'Profit and loss account', 'Cash flow statement'],
    ans: 1,
    exp: 'A control account holds the total of a subsidiary ledger, so the two are reconciled by matching the control account balance to the total of the individual balances.' },

  { id: 'pobc-002', topic: 'pobc', difficulty: 'easy',
    q: 'A correction of an error requires:',
    opts: ['Ignoring the error', 'Journal entry', 'Bank payment', 'VAT adjustment only'],
    ans: 1,
    exp: 'Errors identified during a reconciliation are corrected by raising a journal entry with a clear narrative.' },

  { id: 'pobc-003', topic: 'pobc', difficulty: 'easy',
    q: 'A credit balance on the VAT control account means:',
    opts: ['HMRC owes the business money', 'The business owes HMRC money', 'Input tax exceeds output tax', 'The business has overclaimed VAT'],
    ans: 1,
    exp: 'A credit balance means output tax (on sales) exceeds input tax (on purchases) — the business owes the difference to HMRC.' },

  { id: 'pobc-004', topic: 'pobc', difficulty: 'easy',
    q: 'A direct debit on the bank statement that is not in the cash book requires:',
    opts: ['Adjustment to the bank statement', 'Entry as a payment in the cash book', 'Entry as a receipt in the cash book', 'No adjustment'],
    ans: 1,
    exp: 'Unrecorded direct debits must be entered as payments (credits) in the cash book to bring it up to date.' },

  { id: 'pobc-005', topic: 'pobc', difficulty: 'easy',
    q: 'A journal entry is used to:',
    opts: [
      'Make adjustments that are not covered by any other book of prime entry',
      'Record the cash and bank receipts the business collects each day',
      'List the credit purchase invoices received from suppliers in the period',
      'Record the small cash payments made out of the petty cash float',
    ],
    ans: 0,
    exp: 'The journal handles non-routine entries — corrections, opening balances, accruals, prepayments and bad debt write-offs.' },

  { id: 'pobc-006', topic: 'pobc', difficulty: 'easy',
    q: 'A normal reason for the cash book and bank statement to differ is:',
    opts: [
      'Timing differences such as cheques written but not yet presented',
      'An error made by the accountant when writing up the cash book',
      'The business having too many suppliers to reconcile accurately',
      'The financial year coming to an end during the period',
    ],
    ans: 0,
    exp: 'Timing differences — for example unpresented cheques and outstanding lodgements — are the normal reason for differences between the cash book and the bank statement.' },

  { id: 'pobc-007', topic: 'pobc', difficulty: 'easy',
    q: 'A sales ledger control account is reduced by:',
    opts: [
      'Cash received from credit customers settling their accounts',
      'Credit sales made to customers during the accounting period',
      'Credit purchases made from suppliers during the period',
      'Goods returned by the business to its credit suppliers',
    ],
    ans: 0,
    exp: 'Cash received from customers reduces the balance owed and is credited to the SLCA.' },

  { id: 'pobc-008', topic: 'pobc', difficulty: 'easy',
    q: 'A suspense account balance remains after correction. What does this indicate?',
    opts: [
      'Further errors remain that have not yet been found and corrected',
      'Every error affecting the trial balance has now been identified',
      'The bank has made an error in processing the business\'s transactions',
      'The VAT charged on sales does not agree with the VAT return',
    ],
    ans: 0,
    exp: 'A remaining suspense balance shows that further errors have not yet been identified or corrected.' },

  { id: 'pobc-009', topic: 'pobc', difficulty: 'easy',
    q: 'A suspense account is cleared by:',
    opts: [
      'Identifying and correcting the bookkeeping errors that caused it',
      'Increasing the revenue recorded for the accounting period',
      'Changing the rate of VAT applied to the period\'s sales',
      'Adjusting the wages recorded in the payroll journal',
    ],
    ans: 0,
    exp: 'A suspense account is cleared by identifying the underlying errors and correcting them by journal entry.' },

  { id: 'pobc-010', topic: 'pobc', difficulty: 'easy',
    q: 'A suspense account is cleared when:',
    opts: [
      'A cheque paid in but returned unpaid by the bank',
      'A cheque written to a supplier that has cleared normally',
      'A standing order paid on the date it fell due',
      'A bank transfer received from a credit customer',
    ],
    ans: 0,
    exp: 'Suspense accounts exist until errors are identified and corrected.' },

  { id: 'pobc-011', topic: 'pobc', difficulty: 'easy',
    q: 'A transposition error will:',
    opts: [
      'A deposit recorded in the cash book but not yet on the statement',
      'A cheque written and recorded but not yet cleared by the bank',
      'A bank charge appearing on the statement but not the cash book',
      'A direct debit taken by the bank and not yet recorded',
    ],
    ans: 0,
    exp: 'A transposition error (e.g. recording £45 as £54) means one side is wrong by a multiple of nine, so total debits typically no longer equal total credits and the trial balance disagrees.' },

  { id: 'pobc-012', topic: 'pobc', difficulty: 'easy',
    q: 'An unpresented cheque is:',
    opts: [
      'A cheque written and recorded that has not yet cleared the bank',
      'A direct debit taken by the bank but not recorded in the cash book',
      'A lodgement recorded in the cash book but not yet on the statement',
      'Bank charges appearing on the statement but not in the cash book',
    ],
    ans: 0,
    exp: 'An unpresented cheque has been recorded in the cash book but has not yet cleared through the bank.' },

  { id: 'pobc-013', topic: 'pobc', difficulty: 'easy',
    q: 'Bank charges shown on the bank statement but not in the cash book should be:',
    opts: [
      'Entered in the cash book as a payment out of the account',
      'Added to the receipts side of the cash book for the period',
      'Ignored, because they are a timing difference that reverses',
      'Added to the balance shown on the bank statement',
    ],
    ans: 0,
    exp: 'Bank charges reduce the bank balance — enter them as a payment (credit) in the cash book to bring it up to date.' },

  { id: 'pobc-014', topic: 'pobc', difficulty: 'easy',
    q: 'Clearing a suspense account requires:',
    opts: [
      'Identifying the errors that caused it and posting corrections',
      'Increasing the reported profit by the amount of the balance',
      'Adjusting the rate of VAT applied to the period\'s sales',
      'Adjusting the value at which closing inventory is recorded',
    ],
    ans: 0,
    exp: 'Errors must be located and corrected to clear suspense.' },

  { id: 'pobc-015', topic: 'pobc', difficulty: 'easy',
    q: 'Every journal entry must include:',
    opts: [
      'Gross pay less income tax and National Insurance deductions',
      'Gross pay before any deductions have been made from it',
      'Gross pay plus the employer\'s National Insurance charge',
      'The total cost to the employer of employing the person',
    ],
    ans: 0,
    exp: 'Journal entries always require a narrative for the audit trail — explaining the nature, reason and date of the entry.' },

  { id: 'pobc-016', topic: 'pobc', difficulty: 'easy',
    q: 'Net pay equals:',
    opts: [
      'Gross pay less all deductions made from the employee\'s wages',
      'The employer\'s National Insurance contribution for the period',
      'Gross pay plus the employer\'s National Insurance contribution',
      'The income tax deducted from the employee under PAYE',
    ],
    ans: 0,
    exp: 'Net pay = gross pay − PAYE − employee NIC − pension contributions − other deductions.' },

  { id: 'pobc-017', topic: 'pobc', difficulty: 'easy',
    q: 'Outstanding lodgements are:',
    opts: [
      'Deposits recorded in the cash book but not yet on the bank statement',
      'Cheques written and sent to suppliers that have not yet cleared',
      'Bank charges appearing on the statement but not in the cash book',
      'Direct debits taken by the bank and not recorded in the cash book',
    ],
    ans: 0,
    exp: 'Outstanding lodgements are deposits the business has made and recorded in the cash book, but which have not yet appeared on the bank statement.' },

  { id: 'pobc-018', topic: 'pobc', difficulty: 'easy',
    q: 'The payroll journal records:',
    opts: [
      'Gross wages, National Insurance, deductions and net pay',
      'All payments made out of the business bank account',
      'Only the transactions passing through the bank account',
      'The invoices received from the business\'s suppliers',
    ],
    ans: 0,
    exp: 'The payroll journal records gross pay, PAYE, employee and employer NICs, pension deductions and net pay.' },

  { id: 'pobc-019', topic: 'pobc', difficulty: 'easy',
    q: 'The purchases ledger control account normally has:',
    opts: [
      'A credit balance representing the amounts owed to suppliers',
      'A debit balance representing amounts prepaid to suppliers',
      'A nil balance once all supplier invoices have been recorded',
      'A debit balance equal to the total purchases made in the period',
    ],
    ans: 0,
    exp: 'The PLCA represents trade payables — a liability — and therefore normally has a credit balance.' },

  { id: 'pobc-020', topic: 'pobc', difficulty: 'easy',
    q: 'The sales ledger control account balance should agree with:',
    opts: [
      'The total of the individual customer balances in the sales ledger',
      'The total of the supplier balances in the purchases ledger',
      'The balance shown on the statement received from the bank',
      'The total of the journal entries posted during the period',
    ],
    ans: 0,
    exp: 'The SLCA is a summary account — its balance must equal the total of all individual customer balances in the sales ledger.' },

  { id: 'pobc-021', topic: 'pobc', difficulty: 'easy',
    q: 'Total employment cost to the employer is:',
    opts: [
      'Gross pay plus employer\'s National Insurance and pension contributions',
      'The net pay actually received by the employee after all deductions',
      'The gross pay agreed with the employee before any deductions are made',
      'Net pay plus the income tax deducted from the employee under PAYE',
    ],
    ans: 0,
    exp: 'Total employment cost = gross pay + employer\'s NIC + employer\'s pension contributions.' },

  { id: 'pobc-022', topic: 'pobc', difficulty: 'easy',
    q: 'What causes a transposition error?',
    opts: ['Missing entry', 'Digits reversed', 'Wrong account type', 'Wrong VAT rate'],
    ans: 1,
    exp: 'A transposition error occurs when digits are reversed when recording a figure — for example writing £54 instead of £45.' },

  { id: 'pobc-023', topic: 'pobc', difficulty: 'easy',
    q: 'What does a control account help detect?',
    opts: ['Marketing errors', 'Ledger discrepancies', 'Sales strategy issues', 'HR problems'],
    ans: 1,
    exp: 'Control accounts summarise the total of subsidiary ledgers, so any discrepancy between the control account and the underlying ledger points to a posting error or omission.' },

  { id: 'pobc-024', topic: 'pobc', difficulty: 'easy',
    q: 'What does a credit balance on VAT control mean?',
    opts: [
      'Amounts deducted from gross pay before net pay is calculated',
      'Amounts added to gross pay to arrive at total employment cost',
      'The employer\'s National Insurance contribution for the period',
      'The total cost of employing the workforce for the period',
    ],
    ans: 0,
    exp: 'A credit balance on the VAT control account means output tax exceeds input tax — the business owes the difference to HMRC.' },

  { id: 'pobc-025', topic: 'pobc', difficulty: 'easy',
    q: 'What is a journal correction used for?',
    opts: ['Sales recording', 'Error correction', 'Bank deposits', 'Inventory valuation'],
    ans: 1,
    exp: 'A journal correction is used to correct bookkeeping errors and post any non-routine adjustments.' },

  { id: 'pobc-026', topic: 'pobc', difficulty: 'easy',
    q: 'What is a suspense account used for?',
    opts: [
      'To hold a difference on the trial balance until it is resolved',
      'To record the profit the business has made in the period',
      'To record the cash receipts collected from credit customers',
      'To record the VAT reclaimed from HMRC on the quarterly return',
    ],
    ans: 0,
    exp: 'A suspense account holds the difference temporarily when the trial balance does not balance, pending investigation.' },

  { id: 'pobc-027', topic: 'pobc', difficulty: 'easy',
    q: 'What is a cash book?',
    opts: [
      'A record of the money received into and paid out of bank and cash',
      'A ledger account used solely to record credit sales to customers',
      'A book in which purchase invoices are listed before being posted',
      'A record kept purely for the purpose of completing the VAT return',
    ],
    ans: 0,
    exp: 'The cash book is a book of prime entry that records all bank and cash transactions, acting as both a day book and part of the ledger.' },

  { id: 'pobc-028', topic: 'pobc', difficulty: 'easy',
    q: 'What is the main purpose of a control account?',
    opts: [
      'To summarise a subsidiary ledger in a single ledger balance',
      'To record the VAT charged on sales and incurred on purchases',
      'To calculate and pay the wages due to employees each month',
      'To calculate the tax the business owes on its taxable profits',
    ],
    ans: 0,
    exp: 'A control account holds the total of a subsidiary ledger, allowing the ledger to be verified by comparing the two.' },

  { id: 'pobc-029', topic: 'pobc', difficulty: 'easy',
    q: 'What is employer\'s National Insurance contribution (NIC)?',
    opts: [
      'A payroll cost borne by the employer in addition to gross wages',
      'A deduction taken from the employee\'s pay under the PAYE system',
      'A tax charged on the goods and services the business sells',
      'A charge levied by the bank for operating the business account',
    ],
    ans: 0,
    exp: 'Employer\'s NIC is an additional employment cost paid by the employer to HMRC based on each employee\'s earnings above the secondary threshold.' },

  { id: 'pobc-030', topic: 'pobc', difficulty: 'easy',
    q: 'What is input VAT?',
    opts: [
      'Amounts the employer must pay over to HMRC after each payroll',
      'Amounts the employee receives in their bank account as net pay',
      'The gross wages agreed with the employee before deductions',
      'The pension contribution the employee chooses to make',
    ],
    ans: 0,
    exp: 'Input VAT is the VAT charged to the business on purchases of goods and services. It is generally reclaimable from HMRC.' },

  { id: 'pobc-031', topic: 'pobc', difficulty: 'easy',
    q: 'What is labour turnover?',
    opts: [
      'The rate at which employees leave and have to be replaced',
      'The total amount of wages paid to employees in the period',
      'The volume of output produced by each employee per hour',
      'The number of hours each employee works during the period',
    ],
    ans: 0,
    exp: 'Labour turnover measures the rate at which employees leave and need replacing. High turnover increases recruitment and training costs.' },

  { id: 'pobc-032', topic: 'pobc', difficulty: 'easy',
    q: 'What is PAYE?',
    opts: [
      'Income tax deducted from employees\' wages by the employer',
      'A tax charged on the sale of goods and services',
      'A tax charged on the profits of a limited company',
      'A tax charged on the value added at each stage of supply',
    ],
    ans: 0,
    exp: 'PAYE (Pay As You Earn) is income tax deducted at source from employees’ wages by the employer and paid to HMRC.' },

  { id: 'pobc-033', topic: 'pobc', difficulty: 'easy',
    q: 'What is the purpose of the payroll journal?',
    opts: [
      'Record gross wages, deductions and the net pay due to employees',
      'Record credit sales made to customers during the period',
      'Record the VAT charged on sales and incurred on purchases',
      'Record movements in the value of inventory held',
    ],
    ans: 0,
    exp: 'The payroll journal records gross wages, employee and employer NICs, PAYE, pension contributions and net pay for the period.' },

  { id: 'pobc-034', topic: 'pobc', difficulty: 'easy',
    q: 'How is a suspense account cleared?',
    opts: [
      'By posting correcting journal entries once the errors are found',
      'By transferring the balance to the profit and loss account',
      'By writing the balance off against sales for the period',
      'By paying the amount out of the business bank account',
    ],
    ans: 0,
    exp: 'A suspense account is cleared by identifying the underlying errors and posting correcting journal entries.' },

  { id: 'pobc-035', topic: 'pobc', difficulty: 'easy',
    q: 'What is the main benefit of internal audit?',
    opts: [
      'An independent review of the organisation\'s internal controls',
      'An increase in the revenue the organisation generates',
      'A reduction in the tax liability the organisation owes',
      'The preparation of budgets for the forthcoming year',
    ],
    ans: 0,
    exp: 'Internal audit provides an independent, objective review of the organisation’s internal controls, risk management and governance processes.' },

  { id: 'pobc-036', topic: 'pobc', difficulty: 'easy',
    q: 'What is the main purpose of internal controls?',
    opts: [
      'To prevent errors and fraud and to detect them when they occur',
      'To increase the profit the business reports for the period',
      'To reduce the amount of tax the business has to pay',
      'To increase the volume of sales the business achieves',
    ],
    ans: 0,
    exp: 'Internal controls are designed to safeguard assets, ensure the accuracy and completeness of records, and prevent and detect errors and fraud.' },

  { id: 'pobc-037', topic: 'pobc', difficulty: 'easy',
    q: 'What is the purpose of a suspense account?',
    opts: [
      'To hold a difference on the trial balance until it is investigated',
      'To hold cash temporarily before it is paid into the bank account',
      'To record the credit sales made by the business in the period',
      'To record the value of the inventory the business holds',
    ],
    ans: 0,
    exp: 'Suspense accounts hold temporary differences until corrected.' },

  { id: 'pobc-038', topic: 'pobc', difficulty: 'easy',
    q: 'What is the purpose of internal controls?',
    opts: [
      'To prevent errors and fraud and detect them when they occur',
      'To increase the profit the business reports for the period',
      'To reduce the amount of tax the business is liable to pay',
      'To increase the wages paid to employees in the business',
    ],
    ans: 0,
    exp: 'Internal controls safeguard assets and reduce the risk of error and fraud.' },

  { id: 'pobc-039', topic: 'pobc', difficulty: 'easy',
    q: 'What is the purpose of sequential document numbering?',
    opts: [
      'To ensure completeness and allow documents to be traced',
      'To increase the speed at which documents are processed',
      'To reduce the cost of producing accounting documents',
      'To increase the profit reported for the period',
    ],
    ans: 0,
    exp: 'Sequential numbering of invoices, credit notes and cheques means missing or duplicated documents are quickly spotted, improving completeness controls.' },

  { id: 'pobc-040', topic: 'pobc', difficulty: 'easy',
    q: 'Which account is credited for wages paid?',
    opts: ['Wages expense', 'Bank', 'Capital', 'Revenue'],
    ans: 1,
    exp: 'Wages paid reduce the bank balance, so Bank is credited (Dr Wages Expense, Cr Bank).' },

  { id: 'pobc-041', topic: 'pobc', difficulty: 'easy',
    q: 'Which control account is used for VAT reporting?',
    opts: [
      'Amounts owed by credit customers at the reporting date',
      'Amounts owed to credit suppliers at the reporting date',
      'The balance of cash held in the business bank account',
      'The value of inventory held at the end of the period',
    ],
    ans: 0,
    exp: 'The VAT control account summarises output tax (on sales) and input tax (on purchases); its balance is the amount due to or from HMRC.' },

  { id: 'pobc-042', topic: 'pobc', difficulty: 'easy',
    q: 'Which control account reconciles suppliers?',
    opts: [
      'The total of the individual balances in the subsidiary ledger',
      'The balance shown on the statement received from the bank',
      'The profit calculated for the accounting period just ended',
      'The value of the closing inventory counted at the year end',
    ],
    ans: 0,
    exp: 'The purchases ledger control account (PLCA) summarises supplier balances and is used to verify the purchases ledger.' },

  { id: 'pobc-043', topic: 'pobc', difficulty: 'easy',
    q: 'Which document supports payroll entries?',
    opts: ['Invoice', 'Payslip', 'Statement', 'Credit note'],
    ans: 1,
    exp: 'Payslips are the source documents that evidence the gross pay, deductions and net pay recorded in the payroll journal.' },

  { id: 'pobc-044', topic: 'pobc', difficulty: 'easy',
    q: 'Which error would still allow the trial balance to agree?',
    opts: [
      'Recording a capital item as a revenue expense, or vice versa',
      'Posting an entry to the wrong account of the correct type',
      'Omitting a transaction from the accounting records entirely',
      'Transposing the digits within an amount that is recorded',
    ],
    ans: 0,
    exp: 'An omission of a transaction means both the debit and credit entries are completely missing, so total debits and credits are reduced by the same amount and the trial balance still agrees.' },

  { id: 'pobc-045', topic: 'pobc', difficulty: 'easy',
    q: 'Which is a source document?',
    opts: ['Ledger', 'Invoice', 'Trial balance', 'Profit statement'],
    ans: 1,
    exp: 'Source documents (such as invoices, credit notes and bank statements) provide the original evidence for transactions.' },

  { id: 'pobc-046', topic: 'pobc', difficulty: 'easy',
    q: 'Which item appears in a suspense account temporarily?',
    opts: [
      'Errors that do not affect the equality of debits and credits',
      'Errors that always cause the trial balance to disagree',
      'Errors that can only be found by reconciling the bank account',
      'Errors that arise solely from incorrect VAT calculations',
    ],
    ans: 0,
    exp: 'A suspense account temporarily holds unidentified differences until the underlying errors have been located and corrected.' },

  { id: 'pobc-047', topic: 'pobc', difficulty: 'easy',
    q: 'Which of the following causes the cash book balance to be HIGHER than the bank statement balance?',
    opts: [
      'The total of the purchases day book for the period',
      'The total of the sales day book for the period',
      'The balance held in the business bank account',
      'The value of the inventory counted at year end',
    ],
    ans: 0,
    exp: 'Outstanding lodgements have been recorded in the cash book but not yet on the bank statement — so the cash book balance is higher.' },

  { id: 'pobc-048', topic: 'pobc', difficulty: 'easy',
    q: 'Which reduces trade receivables control account?',
    opts: ['Credit sales', 'Cash received', 'Purchases', 'Capital'],
    ans: 1,
    exp: 'Cash received from customers reduces the amount owed and is therefore credited to the trade receivables (SLCA) account.' },

  { id: 'pobc-049', topic: 'pobc', difficulty: 'easy',
    q: 'Which type of error IS detected by a trial balance?',
    opts: [
      'Different debit and credit amounts entered for one transaction',
      'A transaction that has been omitted from the records entirely',
      'A posting made to the wrong account but on the correct side',
      'A transaction that has been entered into the records twice',
    ],
    ans: 0,
    exp: 'A trial balance only detects arithmetic imbalances. Posting different debit and credit amounts will leave the totals unequal.' },

  { id: 'pobc-050', topic: 'pobc', difficulty: 'medium',
    q: 'A bank reconciliation identifies:',
    opts: [
      'Differences between the cash book balance and the bank statement',
      'Instances of fraud committed against the business',
      'Errors made in the calculation of reported profit',
      'Errors made in the calculation of the VAT return',
    ],
    ans: 0,
    exp: 'A bank reconciliation identifies and explains the differences between the cash book balance and the bank statement balance — typically timing differences or unrecorded items.' },

  { id: 'pobc-051', topic: 'pobc', difficulty: 'medium',
    q: 'A bank reconciliation is used to:',
    opts: [
      'Reconcile the cash book balance with the balance on the bank statement',
      'Calculate the profit or loss the business made during the period',
      'Check that every supplier invoice received has been paid in full',
      'Reconcile the VAT charged on sales with the VAT reclaimed on purchases',
    ],
    ans: 0,
    exp: 'A bank reconciliation identifies and explains timing differences between the cash book balance and the bank statement balance.' },

  { id: 'pobc-052', topic: 'pobc', difficulty: 'medium',
    q: 'A bank reconciliation shows adjusted cash book higher than bank statement. This suggests:',
    opts: [
      'A debit balance representing amounts owed by credit customers',
      'A credit balance representing amounts owed to credit suppliers',
      'A nil balance once all customer invoices have been settled',
      'A credit balance equal to the total sales made in the period',
    ],
    ans: 0,
    exp: 'Outstanding lodgements increase cash book relative to bank.' },

  { id: 'pobc-053', topic: 'pobc', difficulty: 'medium',
    q: 'A compensating error occurs when:',
    opts: ['Two errors cancel each other out', 'The bank makes a posting error', 'The trial balance is incorrect', 'An auditor finds an error'],
    ans: 0,
    exp: 'A compensating error occurs when two unrelated errors of equal value on opposite sides offset each other, leaving the trial balance balanced.' },

  { id: 'pobc-054', topic: 'pobc', difficulty: 'medium',
    q: 'A contra entry between control accounts occurs when:',
    opts: [
      'A customer is also a supplier and the amounts owed are offset against each other',
      'The cash book balance is reconciled against the balance on the bank statement',
      'Input VAT incurred on purchases is reclaimed from HMRC on the VAT return',
      'A journal is posted to correct an error found after the trial balance',
    ],
    ans: 0,
    exp: 'A contra nets off amounts owed to and by the same business that is both a customer and a supplier — Dr PLCA, Cr SLCA.' },

  { id: 'pobc-055', topic: 'pobc', difficulty: 'medium',
    q: 'A contra entry between control accounts results in:',
    opts: ['No net effect overall', 'Increase in liabilities', 'Increase in assets', 'Increase in revenue'],
    ans: 0,
    exp: 'A contra entry offsets amounts owed by a customer who is also a supplier — reducing both the SLCA and the PLCA by the same amount with no overall change.' },

  { id: 'pobc-056', topic: 'pobc', difficulty: 'medium',
    q: 'A corrected error that balances the trial balance may still be:',
    opts: ['Error of omission', 'Error of transposition', 'Compensating error', 'Bank error'],
    ans: 2,
    exp: 'Compensating errors are two errors of equal value on opposite sides that offset each other, so the trial balance still balances.' },

  { id: 'pobc-057', topic: 'pobc', difficulty: 'medium',
    q: 'A correcting journal entry is used to:',
    opts: ['Record cash sales', 'Correct accounting errors', 'Prepare budgets', 'Calculate depreciation'],
    ans: 1,
    exp: 'A correcting journal entry is the standard mechanism for posting adjustments to fix errors identified after initial recording.' },

  { id: 'pobc-058', topic: 'pobc', difficulty: 'medium',
    q: 'A difference in a control account and subsidiary ledger is most likely caused by:',
    opts: [
      'Timing differences or errors made when postings were recorded',
      'Postings that were made correctly to both of the records',
      'The depreciation charged on the business\'s non-current assets',
      'A misstatement of the gross profit reported for the period',
    ],
    ans: 0,
    exp: 'Differences between a control account and its subsidiary ledger are typically caused by posting errors, omissions or timing differences.' },

  { id: 'pobc-059', topic: 'pobc', difficulty: 'medium',
    q: 'A payment is posted to the wrong supplier account. This is an example of:',
    opts: ['Error of omission', 'Error of commission', 'Error of principle', 'Compensating error'],
    ans: 1,
    exp: 'Posting to the correct type of account but the wrong specific account (e.g. wrong supplier) is an error of commission.' },

  { id: 'pobc-060', topic: 'pobc', difficulty: 'medium',
    q: 'A suspense account is opened when:',
    opts: [
      'The trial balance does not balance and the cause is unknown',
      'All of the accounts in the ledger balance as expected',
      'A compensating error has cancelled itself out exactly',
      'A new non-current asset has been purchased by the business',
    ],
    ans: 0,
    exp: 'A suspense account temporarily holds the difference when a trial balance does not balance, while errors are traced and corrected.' },

  { id: 'pobc-061', topic: 'pobc', difficulty: 'medium',
    q: 'Which type of error will NOT be revealed by a trial balance?',
    opts: ['Transposition error (digits reversed)', 'A complete omission of a transaction', 'A single-sided entry', 'Unequal debit and credit amounts'],
    ans: 1,
    exp: 'A complete omission affects neither the debit nor the credit side, so the trial balance still balances and the error remains undetected by it.' },

  { id: 'pobc-062', topic: 'pobc', difficulty: 'medium',
    q: 'An audit trail allows:',
    opts: [
      'Transactions to be traced back to their source documents',
      'Reported profit to be adjusted to a more favourable figure',
      'Tax liabilities to be reduced below the amount properly due',
      'Budgets to be prepared for the forthcoming financial year',
    ],
    ans: 0,
    exp: 'An audit trail links every accounting entry back to its source document, providing the evidence needed for review, audit and investigation.' },

  { id: 'pobc-063', topic: 'pobc', difficulty: 'medium',
    q: 'An error of commission occurs when:',
    opts: [
      'A transaction is posted to the wrong account of the correct type',
      'A transaction is omitted from the accounting records altogether',
      'A transaction is recorded using the wrong monetary amount throughout',
      'The debit and credit entries for a transaction are reversed',
    ],
    ans: 0,
    exp: 'Error of commission: correct account type but wrong specific account — for example posted to the wrong supplier account.' },

  { id: 'pobc-064', topic: 'pobc', difficulty: 'medium',
    q: 'An error of original entry occurs when:',
    opts: [
      'The wrong figure is used for both the debit and the credit',
      'A transaction is posted to the wrong account of the right type',
      'A transaction is omitted from the records entirely',
      'The debit and credit entries for a transaction are reversed',
    ],
    ans: 0,
    exp: 'In an error of original entry the wrong figure is entered for both sides — the trial balance still balances, but the amount is wrong.' },

  { id: 'pobc-065', topic: 'pobc', difficulty: 'medium',
    q: 'An error of principle occurs when:',
    opts: [
      'Capital expenditure is recorded as a revenue repair expense',
      'A payment is posted to the account of the wrong supplier',
      'The digits in an amount are transposed when it is recorded',
      'The debit and credit entries for a transaction are reversed',
    ],
    ans: 0,
    exp: 'Error of principle: the transaction is posted to the wrong type of account — for example treating capital expenditure as revenue expenditure.' },

  { id: 'pobc-066', topic: 'pobc', difficulty: 'medium',
    q: 'A reversal of entries (debits and credits swapped) is recorded for a transaction. What is the effect on the trial balance?',
    opts: [
      'The trial balance still balances, but the accounts hold the wrong figures',
      'The total of the debit column no longer equals the total of the credits',
      'There is no effect on either the accounts or the trial balance totals',
      'Only the asset accounts in the statement of financial position are affected',
    ],
    ans: 0,
    exp: 'A reversal of entries swaps the debit and credit sides. Total debits still equal total credits, so the trial balance balances — but the wrong accounts have been debited and credited, leaving each at twice the error.' },

  { id: 'pobc-067', topic: 'pobc', difficulty: 'medium',
    q: 'In a bank reconciliation, an unrecorded bank charge should be:',
    opts: ['Added to cash book receipts', 'Deducted in the cash book', 'Ignored until next period', 'Added to bank statement balance'],
    ans: 1,
    exp: 'Bank charges shown on the bank statement reduce the bank balance, so they must be entered as a payment (credit) in the cash book to bring it up to date.' },

  { id: 'pobc-068', topic: 'pobc', difficulty: 'medium',
    q: 'Segregation of duties reduces:',
    opts: ['Efficiency', 'Fraud risk', 'Profit', 'Revenue'],
    ans: 1,
    exp: 'Splitting duties between different staff (e.g. authorising, recording and paying) reduces the opportunity for fraud or undetected error.' },

  { id: 'pobc-069', topic: 'pobc', difficulty: 'medium',
    q: 'The purpose of a control account is to:',
    opts: [
      'Provide a summary total that can be reconciled to the ledger',
      'Replace the individual ledger accounts held for each customer',
      'Record only the cash and bank transactions of the business',
      'Calculate the profit or loss made during the accounting period',
    ],
    ans: 0,
    exp: 'Control accounts summarise the totals of the subsidiary ledgers, providing a single figure that can be reconciled to confirm the underlying ledger is accurate.' },

  { id: 'pobc-070', topic: 'pobc', difficulty: 'medium',
    q: 'What does a bank reconciliation identify?',
    opts: [
      'Differences between the cash book balance and the bank statement',
      'Errors made in calculating the profit for the period',
      'Amounts of tax owed to HMRC at the reporting date',
      'Mistakes made in calculating employee wages and deductions',
    ],
    ans: 0,
    exp: 'A bank reconciliation identifies differences between the cash book and the bank statement — primarily timing differences and unrecorded items.' },

  { id: 'pobc-071', topic: 'pobc', difficulty: 'medium',
    q: 'What does a debit balance on PLCA mean?',
    opts: [
      'An overpayment or prepayment made to a supplier',
      'An amount currently owed by the business to suppliers',
      'Profit earned by the business during the period',
      'Sales made by the business during the period',
    ],
    ans: 0,
    exp: 'The PLCA normally has a credit balance (a liability). A debit balance indicates an overpayment to suppliers — the supplier now owes the business.' },

  { id: 'pobc-072', topic: 'pobc', difficulty: 'medium',
    q: 'What does reconciliation ensure?',
    opts: [
      'That the business\'s records agree with an independent external record',
      'That the profit for the accounting period is correctly calculated',
      'That the tax payable by the business is reduced where possible',
      'That the payroll figures for the period are accurately calculated',
    ],
    ans: 0,
    exp: 'Reconciliation provides assurance that internal records agree with an independent external source, such as the bank statement or a supplier statement.' },

  { id: 'pobc-073', topic: 'pobc', difficulty: 'medium',
    q: 'What is a key control over inventory?',
    opts: ['Depreciation', 'Stock counts', 'Bank loans', 'Profit margins'],
    ans: 1,
    exp: 'Physical stock counts compared with inventory records verify the existence and accuracy of recorded inventory, highlighting losses, theft or recording errors.' },

  { id: 'pobc-074', topic: 'pobc', difficulty: 'medium',
    q: 'What is a key purpose of segregation of duties?',
    opts: ['Increase efficiency', 'Reduce fraud risk', 'Reduce costs', 'Improve marketing'],
    ans: 1,
    exp: 'Segregation of duties spreads responsibility across different people, reducing the risk that one individual can both commit and conceal fraud.' },

  { id: 'pobc-075', topic: 'pobc', difficulty: 'medium',
    q: 'What is an error of commission?',
    opts: [
      'A transaction posted to the wrong account within the correct category',
      'A transaction posted to an account of an entirely wrong category',
      'A transaction that was never entered into the records at all',
      'A transaction where the totals have been added up incorrectly',
    ],
    ans: 0,
    exp: 'An error of commission occurs when a transaction is posted to the correct type of account but to the wrong specific account.' },

  { id: 'pobc-076', topic: 'pobc', difficulty: 'medium',
    q: 'What is the aim of a bank reconciliation?',
    opts: [
      'Match the cash book against the bank statement and explain any differences',
      'Calculate the profit or loss the business made during the period',
      'Work out the wages and statutory deductions due to employees',
      'Determine the VAT payable to HMRC for the quarter',
    ],
    ans: 0,
    exp: 'A bank reconciliation aims to ensure the cash book balance agrees with the bank statement balance after explaining timing differences and adjusting for unrecorded items.' },

  { id: 'pobc-077', topic: 'pobc', difficulty: 'medium',
    q: 'What is the impact of a timing difference in bank reconciliation?',
    opts: [
      'It is a temporary difference that resolves in a later period',
      'It is a permanent error requiring a correcting journal entry',
      'It is an indicator that fraud may have taken place',
      'It shows a transaction has been omitted from the ledger',
    ],
    ans: 0,
    exp: 'Timing differences (such as unpresented cheques and outstanding lodgements) are temporary — they resolve once the items clear the bank.' },

  { id: 'pobc-078', topic: 'pobc', difficulty: 'medium',
    q: 'What is the purpose of audit trail documentation?',
    opts: [
      'Allow every accounting entry to be traced back to its source document',
      'Increase the profit reported in the financial statements',
      'Reduce the wage costs incurred by the finance department',
      'Calculate the VAT liability payable to HMRC each quarter',
    ],
    ans: 0,
    exp: 'Audit-trail documentation enables every transaction to be traced back to its source document, supporting completeness and accuracy.' },

  { id: 'pobc-079', topic: 'pobc', difficulty: 'medium',
    q: 'What is the purpose of segregation of duties in payroll?',
    opts: [
      'Reduce fraud by splitting responsibilities between different people',
      'Increase the wages paid to staff in the payroll department',
      'Reduce the amount of tax the business has to pay',
      'Increase the volume of sales the business achieves',
    ],
    ans: 0,
    exp: 'In payroll, segregation of duties between staff who set up new employees, authorise pay and process payments reduces the risk that one person can commit fraud and conceal it.' },

  { id: 'pobc-080', topic: 'pobc', difficulty: 'medium',
    q: 'Which action helps prevent errors in bookkeeping systems?',
    opts: ['Reducing audit trail', 'Segregation of duties', 'Ignoring reconciliations', 'Manual duplication'],
    ans: 1,
    exp: 'Segregation of duties spreads recording, authorising and reviewing across different people, making errors and fraud easier to detect.' },

  { id: 'pobc-081', topic: 'pobc', difficulty: 'medium',
    q: 'Which control reduces the risk of theft of cash?',
    opts: [
      'Segregating the duties of handling and recording cash',
      'Reconciling the cash book against the bank statement',
      'Charging depreciation on the business\'s non-current assets',
      'Preparing budgets for the forthcoming financial year',
    ],
    ans: 0,
    exp: 'Splitting cash-handling duties (receipts, banking, recording, reconciliation) means no single person controls all aspects of the cash cycle, reducing the opportunity for theft.' },

  { id: 'pobc-082', topic: 'pobc', difficulty: 'medium',
    q: 'Which type of error affects only one side of the trial balance?',
    opts: ['Compensating error', 'A single-sided posting', 'Complete omission of a transaction', 'Error of principle'],
    ans: 1,
    exp: 'A single-sided posting records the debit but not the credit (or vice versa), causing the trial balance totals to disagree.' },

  { id: 'pobc-083', topic: 'pobc', difficulty: 'medium',
    q: 'Which type of error would cause the trial balance to disagree?',
    opts: ['Compensating error', 'A single-sided posting', 'Complete omission of a transaction', 'Correct posting of a transaction'],
    ans: 1,
    exp: 'A single-sided posting leaves only one half of the double entry recorded, so total debits do not equal total credits.' },

  { id: 'pobc-084', topic: 'pobc', difficulty: 'medium',
    q: 'Which of the following errors will NOT cause the trial balance to disagree?',
    opts: [
      'A posting made to the wrong account on the correct side',
      'A posting made to one side of the ledger only',
      'A transposition error affecting only one side of the entry',
      'Unequal debit and credit amounts entered for one transaction',
    ],
    ans: 0,
    exp: 'Posting to the wrong account on the correct side does not unbalance the trial balance — total debits still equal total credits, even though the analysis is wrong.' },

  { id: 'pobc-085', topic: 'pobc', difficulty: 'medium',
    q: 'Which error would require a journal correction rather than ledger reposting?',
    opts: ['Transposition error', 'Error of principle', 'Bank omission', 'Casting error'],
    ans: 1,
    exp: 'An error of principle (posting to the wrong type of account) cannot be fixed by a simple reposting on the same side; it must be reclassified by journal.' },

  { id: 'pobc-086', topic: 'pobc', difficulty: 'medium',
    q: 'Which internal control prevents unauthorised access to accounting systems?',
    opts: ['Password controls', 'Depreciation policy', 'Cost centres', 'Bank reconciliation'],
    ans: 0,
    exp: 'Access controls restrict system entry to authorised users.' },

  { id: 'pobc-087', topic: 'pobc', difficulty: 'medium',
    q: 'Which is a timing difference?',
    opts: [
      'A cheque written and recorded but not yet presented',
      'The depreciation charged on non-current assets',
      'The purchase of a non-current asset for cash',
      'The wages paid to employees during the period',
    ],
    ans: 0,
    exp: 'An unpresented cheque is a payment recorded in the cash book that has not yet cleared the bank — a typical bank-reconciliation timing difference.' },

  { id: 'pobc-088', topic: 'pobc', difficulty: 'medium',
    q: 'Which item appears on bank reconciliation?',
    opts: [
      'Cheques written and recorded but not yet presented to the bank',
      'Sales invoices issued to credit customers during the period',
      'The wages ledger recording amounts due to each employee',
      'The depreciation charged on the business\'s non-current assets',
    ],
    ans: 0,
    exp: 'Unpresented cheques are timing differences that appear on the bank reconciliation until they clear through the bank.' },

  { id: 'pobc-089', topic: 'pobc', difficulty: 'medium',
    q: 'Which of the following would NOT appear in a bank reconciliation statement?',
    opts: [
      'Bank charges that have already been entered in the cash book',
      'Cheques written and recorded in the cash book but not yet presented',
      'Lodgements recorded in the cash book but not yet credited by the bank',
      'Timing differences arising between the two records at the reporting date',
    ],
    ans: 0,
    exp: 'Items already recorded in the cash book are reflected in its balance — only unrecorded items or timing differences appear in the reconciliation.' },

  { id: 'pobc-090', topic: 'pobc', difficulty: 'medium',
    q: 'Which reconciliation compares physical stock to records?',
    opts: ['Bank reconciliation', 'Stock reconciliation', 'Control account reconciliation', 'VAT reconciliation'],
    ans: 1,
    exp: 'Stock reconciliation ensures inventory records match physical stock.' },

  { id: 'pobc-091', topic: 'pobc', difficulty: 'medium',
    q: 'Which type of error is NOT revealed by a trial balance?',
    opts: ['A transposition causing imbalance', 'A single-sided entry', 'An error of omission', 'An arithmetic error in casting a ledger'],
    ans: 2,
    exp: 'An error of omission affects neither side, so the trial balance still balances and the error remains undetected by it.' },

  { id: 'pobc-092', topic: 'pobc', difficulty: 'hard',
    q: 'A cash book is overcast by £200. The effect is:',
    opts: ['Profit overstated', 'Bank balance overstated', 'Liabilities understated', 'Inventory overstated'],
    ans: 1,
    exp: 'Overcasting a cash book column overstates the cash book balance by the same amount, so the bank balance is overstated until the error is corrected.' },

  { id: 'pobc-093', topic: 'pobc', difficulty: 'hard',
    q: 'A control account shows £2,000 credit but the ledger shows £1,800. What is most likely?',
    opts: [
      'A posting error or an omission from one of the records',
      'Expenses have been overstated in the period just ended',
      'The depreciation charge has been calculated incorrectly',
      'A refund of VAT has been received from HMRC',
    ],
    ans: 0,
    exp: 'A discrepancy between a control account and the underlying ledger is normally caused by a posting error, omission or transposition rather than any external factor.' },

  { id: 'pobc-094', topic: 'pobc', difficulty: 'hard',
    q: 'A payment of £600 is recorded as £60 in the cash book. What type of error is this?',
    opts: ['Transposition error', 'Error of original entry', 'Error of commission', 'Complete omission'],
    ans: 1,
    exp: 'An error of original entry occurs when an incorrect figure is entered at the point of recording (here, £60 instead of £600). Both sides of the double entry use the wrong figure so the trial balance still balances.' },

  { id: 'pobc-095', topic: 'pobc', difficulty: 'hard',
    q: 'A supplier is overpaid by £100. How should this be recorded?',
    opts: ['Dr expense, Cr bank', 'Dr trade receivables, Cr bank', 'Dr trade payables, Cr bank', 'Dr bank, Cr sales'],
    ans: 2,
    exp: 'An overpayment to a supplier reduces both the trade payables balance and the bank balance: Dr Trade Payables £100, Cr Bank £100.' },

  { id: 'pobc-096', topic: 'pobc', difficulty: 'hard',
    q: 'A suspense account shows a debit balance of £150. What does this indicate?',
    opts: ['Credits exceed debits by £150', 'Debits exceed credits by £150', 'No errors exist', 'Cash is missing'],
    ans: 0,
    exp: 'A debit balance on the suspense account means the original trial balance had credits exceeding debits — the suspense Dr is needed to make the two sides equal.' },

  { id: 'pobc-097', topic: 'pobc', difficulty: 'hard',
    q: 'On a VAT return, the amount due to HMRC is:',
    opts: ['Output tax minus input tax', 'Input tax minus output tax', 'Total sales divided by 6', 'Total purchases multiplied by 20%'],
    ans: 0,
    exp: 'VAT due to HMRC = output tax (on sales) − input tax (on purchases). If input tax exceeds output tax, HMRC owes the business a refund.' },


  /* -- PRINCIPLES OF COSTING (POC) -- */
  { id: 'poc-001', topic: 'poc', difficulty: 'easy',
    q: 'A basic wage plus a bonus per unit produced is an example of:',
    opts: ['A fixed cost', 'A variable cost', 'A semi-variable cost', 'An indirect cost'],
    ans: 2,
    exp: 'Basic wage (fixed) + per-unit bonus (variable) = a semi-variable cost with both fixed and variable elements.' },

  { id: 'poc-002', topic: 'poc', difficulty: 'easy',
    q: 'A cost centre is:',
    opts: [
      'A department or location to which costs are charged and controlled',
      'The product on which the business earns its highest profit margin',
      'A budget setting out planned expenditure on non-current assets',
      'A measure of the revenue generated by a part of the business',
    ],
    ans: 0,
    exp: 'A cost centre is a department, location or activity to which costs are accumulated for the purposes of management control.' },

  { id: 'poc-003', topic: 'poc', difficulty: 'easy',
    q: 'A cost driver is:',
    opts: [
      'A factor that causes the cost of an activity to change',
      'A cost that stays the same regardless of activity levels',
      'A type of revenue earned from the sale of products',
      'A liability owed by the business at the reporting date',
    ],
    ans: 0,
    exp: 'A cost driver is any factor whose change causes a cost to change — for example machine hours driving maintenance cost or sales volume driving delivery cost.' },

  { id: 'poc-004', topic: 'poc', difficulty: 'easy',
    q: 'A cost increases in steps at certain activity levels. This is called:',
    opts: ['Variable cost', 'Step cost', 'Fixed cost', 'Direct cost'],
    ans: 1,
    exp: 'Step costs remain fixed within ranges but increase in steps.' },

  { id: 'poc-005', topic: 'poc', difficulty: 'easy',
    q: 'A cost that cannot be recovered once incurred is:',
    opts: ['Fixed cost', 'Sunk cost', 'Variable cost', 'Marginal cost'],
    ans: 1,
    exp: 'Sunk costs are irrelevant for decision-making.' },

  { id: 'poc-006', topic: 'poc', difficulty: 'easy',
    q: 'A cost unit is:',
    opts: [
      'A unit of product or service for which costs are measured',
      'The total production cost incurred across the whole period',
      'The rate at which production overheads are absorbed into products',
      'The fixed cost attributed to each department in the business',
    ],
    ans: 0,
    exp: 'A cost unit is a quantitative measure of product or service for which costs are ascertained — for example one tonne of steel or one hotel night.' },

  { id: 'poc-007', topic: 'poc', difficulty: 'easy',
    q: 'A limiting factor in production is:',
    opts: [
      'A resource whose scarcity restricts the output achievable',
      'Demand for the product that is effectively unlimited',
      'A reduction in the fixed costs the business incurs',
      'An increase in the profit the business is able to earn',
    ],
    ans: 0,
    exp: 'A limiting (or "key") factor is a resource that constrains the maximum output a business can achieve — for example skilled labour or machine capacity.' },

  { id: 'poc-008', topic: 'poc', difficulty: 'easy',
    q: 'A limiting factor is:',
    opts: [
      'A scarce resource that restricts the level of output achievable',
      'A resource available in unlimited quantity to the business',
      'A cost that remains fixed regardless of the level of activity',
      'A restriction placed on the revenue the business may earn',
    ],
    ans: 0,
    exp: 'A limiting factor is a scarce resource that restricts output and therefore restricts profit. Decisions usually aim to maximise contribution per unit of the limiting factor.' },

  { id: 'poc-009', topic: 'poc', difficulty: 'easy',
    q: 'A profit centre is:',
    opts: [
      'A part of the business responsible for both revenue and costs',
      'A part of the business responsible for its costs but not revenue',
      'A part of the business that records the inventory it holds',
      'The human resources department within the wider business',
    ],
    ans: 0,
    exp: 'A profit centre is responsible for both generating revenue and controlling costs, so its profitability can be measured directly.' },

  { id: 'poc-010', topic: 'poc', difficulty: 'easy',
    q: 'A semi-variable cost is split into:',
    opts: [
      'A cost that can be traced directly to a single cost unit',
      'A cost that cannot be traced to any single cost unit',
      'A cost that stays constant in total whatever the output',
      'A cost already incurred that cannot now be recovered',
    ],
    ans: 0,
    exp: 'A semi-variable cost contains both a fixed element (incurred regardless of activity) and a variable element (which changes with activity).' },

  { id: 'poc-011', topic: 'poc', difficulty: 'easy',
    q: 'A semi-variable cost:',
    opts: [
      'Costs that cannot be traced directly to a single cost unit',
      'Costs that can be traced directly to a single cost unit',
      'Costs that vary in direct proportion to the level of output',
      'Costs that have been incurred and cannot now be recovered',
    ],
    ans: 0,
    exp: 'A semi-variable cost has a fixed element (standing charge) and a variable element (usage charge) — for example a phone bill.' },

  { id: 'poc-012', topic: 'poc', difficulty: 'easy',
    q: 'A step cost changes when:',
    opts: [
      'Activity reaches a threshold requiring extra capacity',
      'Activity changes continuously by any small amount',
      'The revenue earned by the business decreases',
      'The fixed costs of the business disappear entirely',
    ],
    ans: 0,
    exp: 'Step costs remain fixed within ranges but jump at thresholds.' },

  { id: 'poc-013', topic: 'poc', difficulty: 'easy',
    q: 'Absorption costing involves:',
    opts: [
      'Allocating and apportioning overheads to cost centres, then absorbing them into products',
      'Excluding all fixed production costs from the cost attributed to each product',
      'Charging only the cost of direct materials to each unit of production',
      'Deducting the variable cost of sales from revenue to arrive at contribution',
    ],
    ans: 0,
    exp: 'Absorption costing: (1) allocate/apportion overheads to cost centres, (2) calculate an OAR for each, (3) absorb overheads into product cost.' },

  { id: 'poc-014', topic: 'poc', difficulty: 'easy',
    q: 'If activity doubles and total cost increases less than proportionally, cost is:',
    opts: [
      'Semi-variable, containing both a fixed and a variable element',
      'Fixed, remaining constant in total whatever the activity',
      'Variable, changing in direct proportion to the activity',
      'Irrelevant, as it does not change with any decision made',
    ],
    ans: 0,
    exp: 'Total cost rises less than proportionally with output, indicating a semi-variable cost (a mix of fixed and variable elements).' },

  { id: 'poc-015', topic: 'poc', difficulty: 'easy',
    q: 'If production increases but fixed costs remain constant, fixed cost per unit will:',
    opts: [
      'A cost that changes only when activity crosses a threshold',
      'A cost that changes in direct proportion to activity levels',
      'A cost that stays the same in total whatever the activity',
      'A cost incurred in the past that cannot now be recovered',
    ],
    ans: 0,
    exp: 'Total fixed cost is unchanged, so spreading it over more units reduces the fixed cost charged to each unit.' },

  { id: 'poc-016', topic: 'poc', difficulty: 'easy',
    q: 'If selling price is reduced but variable cost remains constant, contribution will:',
    opts: [
      'Charging overheads to cost centres that clearly incur them',
      'Sharing overheads between cost centres on a fair basis',
      'Absorbing overheads into the cost of individual units',
      'Removing overheads from the product cost calculation',
    ],
    ans: 0,
    exp: 'Contribution per unit = selling price − variable cost. A lower selling price (variable cost unchanged) reduces contribution per unit.' },

  { id: 'poc-017', topic: 'poc', difficulty: 'easy',
    q: 'If variable costs rise but selling price remains constant, contribution will:',
    opts: [
      'Overheads charged to the cost centre that incurred them',
      'Overheads shared between cost centres on a fair basis',
      'Overheads absorbed into the cost of each unit produced',
      'Overheads excluded from the product costing entirely',
    ],
    ans: 0,
    exp: 'Contribution per unit = selling price − variable cost. Higher variable costs (selling price unchanged) reduce contribution per unit.' },

  { id: 'poc-018', topic: 'poc', difficulty: 'easy',
    q: 'Labour costs that can be directly traced to a specific product are:',
    opts: [
      'The wages of employees working directly on the product',
      'The salary of the manager supervising the whole factory',
      'The cost of the materials consumed in making the product',
      'The rent payable on the premises the business occupies',
    ],
    ans: 0,
    exp: 'Direct labour can be specifically identified with a particular product — for example machine operators on a specific job.' },

  { id: 'poc-019', topic: 'poc', difficulty: 'easy',
    q: 'Labour turnover refers to:',
    opts: [
      'The rate at which employees leave the business and are replaced',
      'The total amount of wages paid to employees in the period',
      'The number of hours employees worked in excess of their contract',
      'The volume of output each employee produces in an hour',
    ],
    ans: 0,
    exp: 'Labour turnover measures how frequently employees leave and need replacing. High turnover increases recruitment and training costs.' },

  { id: 'poc-020', topic: 'poc', difficulty: 'easy',
    q: 'Marginal costing means:',
    opts: [
      'Only variable costs are charged to products; fixed costs are period costs',
      'Both fixed and variable production costs are absorbed into product cost',
      'The total cost incurred is averaged evenly across all products made',
      'Production overheads are allocated to products using machine hours',
    ],
    ans: 0,
    exp: 'Marginal costing values inventory at variable production cost only. Fixed costs are treated as period costs and written off in full when incurred.' },

  { id: 'poc-021', topic: 'poc', difficulty: 'easy',
    q: 'Overheads are:',
    opts: [
      'Indirect costs that cannot be attributed to a specific cost unit',
      'Direct costs that can be traced to a specific unit of production',
      'The cost of the raw materials consumed in making the product',
      'The wages paid to the workers operating the production line',
    ],
    ans: 0,
    exp: 'Overheads are indirect costs — for example factory rent, supervisor wages and utilities — that cannot be traced to specific units.' },

  { id: 'poc-022', topic: 'poc', difficulty: 'easy',
    q: 'Prime cost is:',
    opts: [
      'Direct materials plus direct labour plus direct expenses',
      'Total production overheads plus the direct materials used',
      'The fixed costs of the business plus its variable costs',
      'The selling price of the product less the gross profit',
    ],
    ans: 0,
    exp: 'Prime cost = direct materials + direct labour + direct expenses — the total direct cost before any overheads.' },

  { id: 'poc-023', topic: 'poc', difficulty: 'easy',
    q: 'Under-absorbed overhead results in:',
    opts: [
      'Costs that vary in direct proportion to the level of output',
      'Costs that remain constant in total whatever the output',
      'Costs that contain a fixed and a variable element',
      'Costs already incurred that cannot now be recovered',
    ],
    ans: 0,
    exp: 'Under-absorption means the absorbed overheads charged to products are less than actual overheads. The shortfall is debited to the income statement, reducing profit.' },

  { id: 'poc-024', topic: 'poc', difficulty: 'easy',
    q: 'Variable cost per unit:',
    opts: [
      'Costs that cannot be traced to a specific cost unit',
      'Costs that can be traced to a specific cost unit',
      'Costs that change in proportion to the level of output',
      'Costs that have been incurred and cannot be recovered',
    ],
    ans: 0,
    exp: 'Variable costs vary in total with output, but the cost per unit remains constant — for example £5 of materials per unit regardless of volume.' },

  { id: 'poc-025', topic: 'poc', difficulty: 'easy',
    q: 'What happens to unit fixed cost as output increases?',
    opts: [
      'A rate used to charge overheads to units of production',
      'A rate used to calculate the interest due on borrowings',
      'A rate used to value the closing inventory at the year end',
      'A rate used to calculate the tax due on taxable profits',
    ],
    ans: 0,
    exp: 'Fixed cost per unit falls as output rises.' },

  { id: 'poc-026', topic: 'poc', difficulty: 'easy',
    q: 'What is a cost centre?',
    opts: [
      'An area of the business to which costs are charged and accumulated',
      'A part of the business responsible for generating a profit',
      'A part of the business measured on the revenue it produces',
      'A ledger account recording the cash held by the business',
    ],
    ans: 0,
    exp: 'A cost centre is a location, department or activity to which costs are accumulated for management control.' },

  { id: 'poc-027', topic: 'poc', difficulty: 'easy',
    q: 'What is a profit centre?',
    opts: [
      'A part of the business responsible for both revenue and costs',
      'A part of the business responsible for costs but not revenue',
      'A part of the business used to calculate the tax charge',
      'A part of the business where inventory is held and counted',
    ],
    ans: 0,
    exp: 'A profit centre is responsible for both revenue and costs, so its profitability can be measured directly.' },

  { id: 'poc-028', topic: 'poc', difficulty: 'easy',
    q: 'What is a sunk cost?',
    opts: [
      'A cost already incurred that cannot now be recovered by any decision',
      'A cost that will be incurred in the future as a result of a decision',
      'A cost that varies in direct proportion to the level of activity',
      'A cost incurred in running the business that is not traceable to units',
    ],
    ans: 0,
    exp: 'A sunk cost is a cost already incurred that cannot be recovered. It is irrelevant to future decisions.' },

  { id: 'poc-029', topic: 'poc', difficulty: 'easy',
    q: 'On what basis can overheads be absorbed?',
    opts: ['Units or hours', 'Tax rate', 'Sales value', 'Profit margin'],
    ans: 0,
    exp: 'Overheads are typically absorbed using an activity measure — most commonly labour hours, machine hours or units produced.' },

  { id: 'poc-030', topic: 'poc', difficulty: 'easy',
    q: 'What is absorption costing?',
    opts: [
      'Including a share of overheads in the cost of each product',
      'Excluding overheads entirely from the cost of each product',
      'Including only material costs in the cost of each product',
      'Including only labour costs in the cost of each product',
    ],
    ans: 0,
    exp: 'Absorption costing values products at the full cost of production — direct materials, direct labour, direct expenses and a share of production overheads.' },

  { id: 'poc-031', topic: 'poc', difficulty: 'easy',
    q: 'What is cost behaviour analysis used for?',
    opts: [
      'Planning future activity and supporting management decisions',
      'Preparing and filing the business tax return with HMRC',
      'Calculating wages and deductions for the payroll run',
      'Reconciling the cash book against the bank statement',
    ],
    ans: 0,
    exp: 'Understanding cost behaviour supports budgeting, pricing and other management decisions.' },

  { id: 'poc-032', topic: 'poc', difficulty: 'easy',
    q: 'What is cost behaviour?',
    opts: [
      'How total costs change as the level of activity changes',
      'How much profit the business earns at each level of output',
      'How sales volumes change as the selling price changes',
      'How tax rates change as taxable profits increase',
    ],
    ans: 0,
    exp: 'Cost behaviour describes how a cost changes (or does not change) with the level of activity — fixed, variable or semi-variable.' },

  { id: 'poc-033', topic: 'poc', difficulty: 'easy',
    q: 'What is a cost unit?',
    opts: [
      'The unit of product or service for which cost is measured',
      'The department within which costs are incurred and controlled',
      'The profit earned on each item the business sells',
      'The tax charged on each item the business sells',
    ],
    ans: 0,
    exp: 'A cost unit is a quantitative unit of a product or service for which costs are ascertained — for example one tonne of steel.' },

  { id: 'poc-034', topic: 'poc', difficulty: 'easy',
    q: 'What is a direct cost?',
    opts: [
      'A cost that can be traced directly to a specific cost unit',
      'A cost that cannot be traced to any specific cost unit',
      'A cost incurred in running the business as a whole',
      'A charge made by HMRC on the profits of the business',
    ],
    ans: 0,
    exp: 'A direct cost is a cost that can be traced directly to a specific cost unit — for example raw materials in a finished product.' },

  { id: 'poc-035', topic: 'poc', difficulty: 'easy',
    q: 'As output increases, what happens to fixed cost per unit?',
    opts: ['It increases', 'It decreases', 'It stays constant', 'It becomes variable'],
    ans: 1,
    exp: 'Total fixed cost is unchanged but is spread over more units, so fixed cost per unit falls as output rises.' },

  { id: 'poc-036', topic: 'poc', difficulty: 'easy',
    q: 'What is included in prime cost?',
    opts: [
      'Direct materials and direct labour used in production',
      'Production overheads absorbed into the cost of each unit',
      'The fixed costs incurred in running the factory premises',
      'The costs of selling and distributing the finished goods',
    ],
    ans: 0,
    exp: 'Prime cost includes direct materials, direct labour and direct expenses. Overheads are excluded.' },

  { id: 'poc-037', topic: 'poc', difficulty: 'easy',
    q: 'How is labour cost classified by traceability?',
    opts: ['Only as fixed', 'As direct or indirect', 'Only as sales-related', 'As capital'],
    ans: 1,
    exp: 'Labour cost is direct when traceable to a specific cost unit (e.g. assembly workers) and indirect when it cannot be (e.g. supervisors, cleaners).' },

  { id: 'poc-038', topic: 'poc', difficulty: 'easy',
    q: 'What is marginal cost?',
    opts: [
      'The cost of producing one additional unit of output',
      'The total cost of producing all units in the period',
      'The fixed cost the business incurs over a full year',
      'The cost of selling and distributing the finished product',
    ],
    ans: 0,
    exp: 'Marginal cost is the additional cost of producing one extra unit — essentially the variable cost per unit at normal activity levels.' },

  { id: 'poc-039', topic: 'poc', difficulty: 'easy',
    q: 'What is overhead absorption?',
    opts: [
      'Charging a share of production overheads to each unit of output',
      'Ignoring production overheads when arriving at the cost of a unit',
      'Recording only the direct material cost of each unit produced',
      'Deducting overheads from revenue to arrive at the contribution earned',
    ],
    ans: 0,
    exp: 'Overhead absorption charges indirect costs to cost units using a predetermined absorption rate (OAR).' },

  { id: 'poc-040', topic: 'poc', difficulty: 'easy',
    q: 'What is an overhead?',
    opts: ['Direct material', 'Indirect cost', 'Sales', 'Cash'],
    ans: 1,
    exp: 'An overhead is an indirect cost of production that cannot be traced directly to a specific cost unit — for example factory rent or utilities.' },

  { id: 'poc-041', topic: 'poc', difficulty: 'easy',
    q: 'What is prime cost?',
    opts: [
      'A cost that changes in direct proportion to activity levels',
      'A cost that stays the same in total whatever the activity level',
      'A cost that has already been incurred and cannot be recovered',
      'A cost that contains both a fixed and a variable element',
    ],
    ans: 0,
    exp: 'Prime cost = direct materials + direct labour + direct expenses. It excludes overheads.' },

  { id: 'poc-042', topic: 'poc', difficulty: 'easy',
    q: 'What is the effect of under-absorbing overheads?',
    opts: ['Profit increases', 'Profit decreases', 'No impact', 'Sales increase'],
    ans: 1,
    exp: 'Under-absorbing overheads charges the shortfall to the income statement as an additional expense, reducing reported profit.' },

  { id: 'poc-043', topic: 'poc', difficulty: 'easy',
    q: 'Which classification of costs is based on how costs behave with changes in output?',
    opts: ['By nature', 'By function', 'By behaviour', 'By responsibility'],
    ans: 2,
    exp: 'Cost behaviour classification (fixed, variable, semi-variable) examines how total costs change as activity changes.' },

  { id: 'poc-044', topic: 'poc', difficulty: 'easy',
    q: 'Which cost increases directly with production volume?',
    opts: ['Fixed cost', 'Variable cost', 'Sunk cost', 'Opportunity cost'],
    ans: 1,
    exp: 'A variable cost rises in total in direct proportion to output — for example raw materials, where double the output uses double the materials.' },

  { id: 'poc-045', topic: 'poc', difficulty: 'easy',
    q: 'Which cost is included in marginal costing inventory valuation?',
    opts: [
      'A basis used to share overheads between different cost centres',
      'A method of valuing the inventory held at the reporting date',
      'A charge made for the use of borrowed capital in the business',
      'A measure of the profit earned on each unit that is sold',
    ],
    ans: 0,
    exp: 'Under marginal costing, inventory is valued at variable production cost only. Fixed production overheads are treated as period costs.' },

  { id: 'poc-046', topic: 'poc', difficulty: 'easy',
    q: 'Which cost is indirect?',
    opts: ['Materials', 'Factory rent', 'Direct labour', 'Sales commission'],
    ans: 1,
    exp: 'Factory rent is an indirect cost (overhead) — it cannot be traced to a specific cost unit.' },

  { id: 'poc-047', topic: 'poc', difficulty: 'easy',
    q: 'Which cost is not affected by output changes?',
    opts: ['Variable cost', 'Fixed cost', 'Direct cost', 'Marginal cost'],
    ans: 1,
    exp: 'A fixed cost (e.g. rent) is constant in total within the relevant range regardless of output.' },

  { id: 'poc-048', topic: 'poc', difficulty: 'easy',
    q: 'Which cost remains unchanged within a relevant range of activity?',
    opts: ['Variable cost', 'Fixed cost', 'Direct cost', 'Marginal cost'],
    ans: 1,
    exp: 'Fixed costs remain unchanged within the relevant range of activity. Outside that range they may step up or down.' },

  { id: 'poc-049', topic: 'poc', difficulty: 'easy',
    q: 'Which increases variable cost total?',
    opts: ['More output', 'Higher interest rates', 'Lower wages', 'Fixed rent'],
    ans: 0,
    exp: 'Total variable cost increases as more units are produced. Variable cost per unit, however, stays constant.' },

  { id: 'poc-050', topic: 'poc', difficulty: 'easy',
    q: 'Which is a fixed cost?',
    opts: ['Materials', 'Rent', 'Packaging', 'Sales commission'],
    ans: 1,
    exp: 'Rent stays constant in total regardless of output, making it a fixed cost.' },

  { id: 'poc-051', topic: 'poc', difficulty: 'easy',
    q: 'Which is direct labour?',
    opts: [
      'A machine operator producing units on the factory production line',
      'A member of the human resources team handling staff recruitment',
      'A cleaner responsible for maintaining the factory and offices',
      'A production manager supervising the factory as a whole',
    ],
    ans: 0,
    exp: 'A machine operator is directly involved in production and so is classified as direct labour.' },

  { id: 'poc-052', topic: 'poc', difficulty: 'easy',
    q: 'Which is included in prime cost?',
    opts: [
      'Direct labour worked on the product being manufactured',
      'Production overheads absorbed into the cost of each unit',
      'The rent payable on the factory premises each quarter',
      'The insurance premium covering the business\'s buildings',
    ],
    ans: 0,
    exp: 'Direct labour is part of prime cost. Overheads, rent and insurance are not.' },

  { id: 'poc-053', topic: 'poc', difficulty: 'easy',
    q: 'Which is indirect labour?',
    opts: ['Assembly worker', 'Cleaner', 'Machine operator', 'Assembler'],
    ans: 1,
    exp: 'A cleaner supports production indirectly and is therefore classified as indirect labour.' },

  { id: 'poc-054', topic: 'poc', difficulty: 'easy',
    q: 'Which is semi-variable?',
    opts: [
      'An electricity bill with a standing charge plus a usage element',
      'Rent payable on the factory premises under a fixed-term lease',
      'Raw materials consumed in direct proportion to units produced',
      'Sales revenue generated from the units sold in the period',
    ],
    ans: 0,
    exp: 'An electricity bill typically has a fixed standing charge plus a usage charge — a semi-variable cost.' },

  { id: 'poc-055', topic: 'poc', difficulty: 'easy',
    q: 'Which of the following is a direct cost?',
    opts: [
      'Raw materials consumed directly in making the product',
      'The rent payable on the factory premises each quarter',
      'The salary paid to the production supervisor each month',
      'The electricity used in lighting and heating the building',
    ],
    ans: 0,
    exp: 'Direct costs are directly traceable to a specific product — for example raw materials used in making it.' },

  { id: 'poc-056', topic: 'poc', difficulty: 'easy',
    q: 'Which of the following is a production overhead?',
    opts: ['Sales commission', 'Delivery costs to customers', 'Factory rent', 'Directors\' fees'],
    ans: 2,
    exp: 'Production overheads are indirect costs related to manufacturing. Factory rent relates directly to the production facility.' },

  { id: 'poc-057', topic: 'poc', difficulty: 'easy',
    q: 'Which of the following is an indirect cost?',
    opts: ['Wood used to make furniture', 'Assembly line workers\' wages', 'The factory manager\'s salary', 'Product-specific packaging'],
    ans: 2,
    exp: 'Indirect costs cannot be traced to a specific unit. The factory manager oversees the whole facility, not a single product.' },

  { id: 'poc-058', topic: 'poc', difficulty: 'easy',
    q: 'Which statement about absorption costing is correct?',
    opts: [
      'It allocates and absorbs overheads into the cost of products',
      'It excludes production overheads from the product cost entirely',
      'It includes only the variable costs incurred in production',
      'It disregards the value of inventory held at the period end',
    ],
    ans: 0,
    exp: 'Absorption costing allocates and apportions overheads to cost centres and then absorbs them into product cost using an absorption rate (the OAR).' },

  { id: 'poc-059', topic: 'poc', difficulty: 'easy',
    q: 'Which statement about variable costs is correct?',
    opts: ['They are constant in total', 'They are constant per unit', 'They never change', 'They are fixed per unit'],
    ans: 1,
    exp: 'Variable cost is constant per unit but varies in total as output changes — for example £5 of materials in every unit produced.' },

  { id: 'poc-060', topic: 'poc', difficulty: 'medium',
    q: 'A break-even chart shows:',
    opts: [
      'The relationship between costs, revenue and profit at each output level',
      'The movement in the bank balance over the course of the year',
      'The VAT liability owed to HMRC at each point in the quarter',
      'The cash flowing into and out of the business each month',
    ],
    ans: 0,
    exp: 'A break-even chart plots total costs and total revenues against output, with the break-even point at their intersection.' },

  { id: 'poc-061', topic: 'poc', difficulty: 'medium',
    q: 'A higher contribution margin ratio indicates:',
    opts: [
      'More of each pound of revenue is available to cover fixed costs',
      'Less profit is generated from each pound of revenue earned',
      'A greater proportion of the cost base is fixed rather than variable',
      'Production overheads have increased relative to direct costs',
    ],
    ans: 0,
    exp: 'A higher contribution margin ratio means a greater proportion of every sales £ remains after variable costs to cover fixed costs and contribute to profit.' },

  { id: 'poc-062', topic: 'poc', difficulty: 'medium',
    q: 'Absorbed overhead is compared to actual overhead to determine:',
    opts: [
      'Whether overheads have been under-absorbed or over-absorbed',
      'The profit margin the business earns on each unit sold',
      'The sales revenue generated during the accounting period',
      'The level of inventory held at the end of the period',
    ],
    ans: 0,
    exp: 'If absorbed overheads exceed actual overheads, there is over-absorption; if actual overheads exceed absorbed, there is under-absorption.' },

  { id: 'poc-063', topic: 'poc', difficulty: 'medium',
    q: 'AVCO values inventory at:',
    opts: [
      'A weighted average of all the purchase prices paid',
      'The price paid for the earliest units purchased',
      'The price paid for the most recent units purchased',
      'The lowest price paid for any units purchased',
    ],
    ans: 0,
    exp: 'AVCO recalculates a weighted average cost after each purchase. Inventory issues are valued at this running average.' },

  { id: 'poc-064', topic: 'poc', difficulty: 'medium',
    q: 'Break-even point occurs when:',
    opts: [
      'Total revenue is exactly equal to total costs incurred',
      'Profit is at the maximum level the business can achieve',
      'Variable costs are greater than the sales revenue earned',
      'The business incurs no fixed costs in the period at all',
    ],
    ans: 0,
    exp: 'Break-even is where no profit or loss is made.' },

  { id: 'poc-065', topic: 'poc', difficulty: 'medium',
    q: 'Break-even point occurs where:',
    opts: [
      'Sales revenue less the variable costs of making the product',
      'Sales revenue less all of the costs incurred by the business',
      'The profit remaining after fixed costs have been deducted',
      'The total of the fixed costs incurred during the period',
    ],
    ans: 0,
    exp: 'At break-even, revenue equals total cost (no profit or loss).' },

  { id: 'poc-066', topic: 'poc', difficulty: 'medium',
    q: 'Contribution margin ratio is used to:',
    opts: [
      'Measure how much of each pound of revenue covers fixed costs',
      'Calculate the VAT payable to HMRC on the period\'s sales',
      'Determine the balance held in the business bank account',
      'Set the annual depreciation charge on non-current assets',
    ],
    ans: 0,
    exp: 'The contribution margin ratio (contribution ÷ sales) shows the proportion of each £ of sales available to cover fixed costs and provide profit.' },

  { id: 'poc-067', topic: 'poc', difficulty: 'medium',
    q: 'FIFO compared to AVCO typically results in:',
    opts: [
      'Higher closing inventory when purchase prices are rising',
      'Lower closing inventory whatever direction prices move in',
      'No difference at all between the two valuation methods',
      'Higher reported liabilities at the end of the period',
    ],
    ans: 0,
    exp: 'Under FIFO, closing inventory consists of the most recent purchases. In a period of rising prices these are the highest-priced, so closing inventory is valued higher than under AVCO.' },

  { id: 'poc-068', topic: 'poc', difficulty: 'medium',
    q: 'FIFO inventory valuation assumes:',
    opts: ['Newest items sold first', 'Oldest items sold first', 'Average cost applied', 'Random selection'],
    ans: 1,
    exp: 'FIFO (First In, First Out) assumes the earliest items purchased are issued or sold first, leaving the most recent purchases in closing inventory.' },

  { id: 'poc-069', topic: 'poc', difficulty: 'medium',
    q: 'Fixed costs are best described as:',
    opts: [
      'Costs that remain constant in total regardless of output',
      'Costs that vary in direct proportion to the level of output',
      'Costs that remain constant per unit as output changes',
      'Costs that can be traced directly to a specific product',
    ],
    ans: 0,
    exp: 'Fixed costs (such as rent and insurance) remain constant in total regardless of output. Fixed cost per unit falls as output increases.' },

  { id: 'poc-070', topic: 'poc', difficulty: 'medium',
    q: 'If break-even point increases, it indicates:',
    opts: [
      'Fixed costs have risen, or the contribution per unit has fallen',
      'Fixed costs have fallen while contribution per unit is unchanged',
      'Revenue has increased with no change in the cost structure',
      'Variable costs per unit have fallen with fixed costs unchanged',
    ],
    ans: 0,
    exp: 'Break-even rises if fixed costs increase (more contribution needed to cover them) or if contribution per unit falls (each unit covers less of the fixed cost).' },

  { id: 'poc-071', topic: 'poc', difficulty: 'medium',
    q: 'If contribution per unit increases, break-even point will:',
    opts: ['Increase', 'Decrease', 'Stay the same', 'Become infinite'],
    ans: 1,
    exp: 'Break-even = fixed costs ÷ contribution per unit. A higher contribution per unit means fewer units are needed to cover the fixed costs.' },

  { id: 'poc-072', topic: 'poc', difficulty: 'medium',
    q: 'If fixed costs increase, break-even point will:',
    opts: [
      'The point at which total revenue exactly equals total cost',
      'The point at which the business achieves its target profit',
      'The point at which fixed costs are fully recovered by revenue',
      'The point at which variable cost per unit begins to fall',
    ],
    ans: 0,
    exp: 'Break-even = fixed costs ÷ contribution per unit. Higher fixed costs require more units of contribution to cover them, raising the break-even point.' },

  { id: 'poc-073', topic: 'poc', difficulty: 'medium',
    q: 'Over-absorption of overheads occurs when:',
    opts: ['Actual overheads exceed absorbed overheads', 'Absorbed overheads exceed actual overheads', 'Output is below budget', 'Fixed costs rise unexpectedly'],
    ans: 1,
    exp: 'Over-absorption: overheads absorbed (using the OAR) exceed the actual overheads incurred. The over-absorption is credited to the income statement.' },

  { id: 'poc-074', topic: 'poc', difficulty: 'medium',
    q: 'The FIFO method of inventory valuation assumes that:',
    opts: ['The newest items are used first', 'The oldest items are used first', 'An average cost is used', 'Market price is used'],
    ans: 1,
    exp: 'FIFO (First In, First Out) assumes the earliest inventory purchased is used or sold first. Closing inventory is therefore valued at the most recent prices.' },

  { id: 'poc-075', topic: 'poc', difficulty: 'medium',
    q: 'Under-absorption of overheads means:',
    opts: [
      'Insufficient overhead has been charged, so profit is overstated',
      'Too much overhead has been charged to the products made',
      'Reported profit turns out higher than the business expected',
      'The fixed costs incurred by the business have decreased',
    ],
    ans: 0,
    exp: 'Under-absorption: actual overheads exceed absorbed overheads. The shortfall is debited to the income statement (i.e. profit is reduced).' },

  { id: 'poc-076', topic: 'poc', difficulty: 'medium',
    q: 'What happens in over-absorption?',
    opts: [
      'Absorbed overhead exceeds the overhead actually incurred',
      'Overhead actually incurred exceeds the amount absorbed',
      'No production overheads have been incurred in the period',
      'The business has made no profit during the accounting period',
    ],
    ans: 0,
    exp: 'Over-absorption occurs when absorbed overheads (based on the OAR) exceed actual overheads incurred. The surplus is credited to the income statement.' },

  { id: 'poc-077', topic: 'poc', difficulty: 'medium',
    q: 'When is the AVCO average inventory cost recalculated?',
    opts: ['After each sale only', 'After each purchase', 'Only at year end', 'When cash is paid'],
    ans: 1,
    exp: 'AVCO recalculates a weighted average cost after each new purchase. Subsequent issues are valued at this updated average.' },

  { id: 'poc-078', topic: 'poc', difficulty: 'medium',
    q: 'What is contribution per unit used for?',
    opts: [
      'Calculating profit under marginal costing and break-even analysis',
      'Setting the selling price at which products are offered',
      'Reporting the taxable profits of the business to HMRC',
      'Reconciling the cash book against the bank statement',
    ],
    ans: 0,
    exp: 'Contribution per unit (selling price − variable cost) is used to calculate break-even, target-profit volumes and profit under marginal costing.' },

  { id: 'poc-079', topic: 'poc', difficulty: 'medium',
    q: 'What is the FIFO inventory assumption?',
    opts: ['Newest items are sold first', 'Oldest items are sold first', 'Cost is averaged', 'Items are selected randomly'],
    ans: 1,
    exp: 'FIFO (First In, First Out) assumes the earliest items purchased are used or sold first.' },

  { id: 'poc-080', topic: 'poc', difficulty: 'medium',
    q: 'Which cost is most relevant for special order decisions?',
    opts: ['Sunk cost', 'Opportunity cost', 'Depreciation', 'Historical cost'],
    ans: 1,
    exp: 'Opportunity cost — the value of the next best alternative foregone — is a relevant cost in special-order and accept/reject decisions.' },

  { id: 'poc-081', topic: 'poc', difficulty: 'medium',
    q: 'Which cost is most relevant in decision making?',
    opts: ['Sunk cost', 'Relevant cost', 'Fixed overhead', 'Historical cost'],
    ans: 1,
    exp: 'Relevant costs are future, incremental cash flows that change as a result of a decision. Sunk costs and committed costs are not relevant.' },

  { id: 'poc-082', topic: 'poc', difficulty: 'medium',
    q: 'Which cost is NOT relevant to decision making?',
    opts: ['Future incremental cost', 'Opportunity cost', 'Sunk cost', 'Variable cost'],
    ans: 2,
    exp: 'A sunk cost has already been incurred and cannot be recovered, so it is irrelevant to any future decision.' },

  { id: 'poc-083', topic: 'poc', difficulty: 'medium',
    q: 'Which costing method ignores fixed overheads in inventory valuation?',
    opts: ['Absorption costing', 'Marginal costing', 'FIFO', 'AVCO'],
    ans: 1,
    exp: 'Under marginal costing, fixed production overheads are treated as period costs and excluded from inventory valuation.' },

  { id: 'poc-084', topic: 'poc', difficulty: 'medium',
    q: 'Which is a variable cost?',
    opts: [
      'The raw materials consumed in making the product',
      'The rent payable on the premises the business occupies',
      'The insurance premium covering the business\'s assets',
      'The depreciation charged on the business\'s equipment',
    ],
    ans: 0,
    exp: 'Raw materials vary with output.' },

  { id: 'poc-085', topic: 'poc', difficulty: 'medium',
    q: 'Which is NOT part of absorption costing?',
    opts: ['Overhead allocation', 'OAR calculation', 'Direct materials only', 'Overhead absorption'],
    ans: 2,
    exp: 'Absorption costing includes overheads as well as direct costs.' },

  { id: 'poc-086', topic: 'poc', difficulty: 'medium',
    q: 'Which method averages inventory cost?',
    opts: ['FIFO', 'AVCO', 'LIFO', 'Specific'],
    ans: 1,
    exp: 'AVCO (Average Cost) values inventory using a weighted average of all purchase prices, recalculated after each new purchase.' },

  { id: 'poc-087', topic: 'poc', difficulty: 'medium',
    q: 'Which method spreads overheads using activity levels?',
    opts: [
      'Absorption costing, which charges overheads to products via an absorption rate',
      'Marginal costing, which charges only variable costs to each product',
      'FIFO, which values inventory assuming the oldest items are sold first',
      'AVCO, which values inventory using a weighted average unit cost',
    ],
    ans: 0,
    exp: 'Absorption costing spreads overheads across products using a chosen activity base — typically labour hours, machine hours or units.' },

  { id: 'poc-088', topic: 'poc', difficulty: 'medium',
    q: 'Which method values closing inventory at most recent purchases?',
    opts: [
      'A cost that stays the same in total regardless of activity levels',
      'A cost that varies in direct proportion to the level of activity',
      'A cost that contains both a fixed element and a variable element',
      'A cost that has already been incurred and cannot be recovered',
    ],
    ans: 0,
    exp: 'FIFO assumes the earliest items are issued first, so the most recent (and usually highest-priced) purchases remain in closing inventory.' },

  { id: 'poc-089', topic: 'poc', difficulty: 'medium',
    q: 'Which of the following are recognised methods of inventory valuation?',
    opts: ['FIFO, LIFO and AVCO', 'PAYE, NIC and VAT', 'Fixed, variable and semi-variable', 'Direct, indirect and overhead'],
    ans: 0,
    exp: 'FIFO, LIFO and AVCO are the three classic inventory valuation methods. Note: LIFO is not permitted under IFRS or UK GAAP.' },

  { id: 'poc-090', topic: 'poc', difficulty: 'medium',
    q: 'Which of the following is relevant in decision making?',
    opts: [
      'Future incremental costs that change as a result of the decision',
      'Sunk costs already incurred before the decision was made',
      'Historical costs recorded in previous accounting periods',
      'The depreciation charged on existing non-current assets',
    ],
    ans: 0,
    exp: 'Only future relevant costs affect decisions.' },

  { id: 'poc-091', topic: 'poc', difficulty: 'hard',
    q: 'A cost increases from £5,000 to £7,000 when output rises from 1,000 to 2,000 units. What type of cost is this?',
    opts: [
      'A semi-variable cost, with a fixed and a variable element',
      'A fixed cost, unchanged in total whatever the output level',
      'A variable cost, moving in direct proportion to output',
      'A sunk cost, already incurred and no longer recoverable',
    ],
    ans: 0,
    exp: 'Both fixed and variable elements are present: a £2,000 increase for a 1,000-unit increase implies £2/unit variable cost, with the remainder fixed — a semi-variable cost.' },

  { id: 'poc-092', topic: 'poc', difficulty: 'hard',
    q: 'Contribution per unit is calculated as:',
    opts: ['Selling price − fixed cost', 'Selling price − variable cost', 'Variable cost − selling price', 'Fixed cost ÷ units'],
    ans: 1,
    exp: 'Contribution measures surplus after variable costs.' },

  { id: 'poc-093', topic: 'poc', difficulty: 'hard',
    q: 'Contribution per unit is:',
    opts: ['Selling price − fixed cost', 'Selling price − variable cost', 'Fixed cost − variable cost', 'Total cost ÷ units'],
    ans: 1,
    exp: 'Contribution = revenue minus variable cost.' },

  { id: 'poc-094', topic: 'poc', difficulty: 'hard',
    q: 'Fixed costs are £10,000; variable cost is £5 per unit; 2,000 units are produced. Total cost is:',
    opts: ['£10,000', '£20,000', '£10,005', '£15,000'],
    ans: 1,
    exp: 'Total cost = £10,000 + (£5 × 2,000) = £10,000 + £10,000 = £20,000.' },

  { id: 'poc-095', topic: 'poc', difficulty: 'hard',
    q: 'Fixed overheads absorbed are £12,000 and actual overheads are £11,200. What is the result?',
    opts: ['Under-absorption of £800', 'Over-absorption of £800', 'No difference', 'Profit reduction of £12,000'],
    ans: 1,
    exp: 'Absorbed £12,000 > actual £11,200, so overheads are over-absorbed by £800. The over-absorption is credited to the income statement.' },

  { id: 'poc-096', topic: 'poc', difficulty: 'hard',
    q: 'If fixed costs are £12,000 and contribution per unit is £4, break-even units are:',
    opts: ['2,000', '3,000', '4,000', '6,000'],
    ans: 1,
    exp: '12,000 ÷ 4 = 3,000 units.' },

  { id: 'poc-097', topic: 'poc', difficulty: 'hard',
    q: 'If selling price is £20 and variable cost is £12, contribution is:',
    opts: ['£8', '£32', '£12', '£20'],
    ans: 0,
    exp: 'Contribution = selling price − variable cost = £20 − £12 = £8 per unit.' },

  { id: 'poc-098', topic: 'poc', difficulty: 'hard',
    q: 'Margin of safety is calculated as:',
    opts: ['Actual sales − break-even sales', 'Fixed costs ÷ contribution', 'Sales ÷ profit', 'Contribution − fixed costs'],
    ans: 0,
    exp: 'Margin of safety = budgeted sales − break-even sales. It measures how far sales can fall before the business makes a loss.' },

  { id: 'poc-099', topic: 'poc', difficulty: 'hard',
    q: 'The overhead absorption rate (OAR) is calculated as:',
    opts: ['Actual overheads ÷ actual activity', 'Budgeted overheads ÷ budgeted activity', 'Actual overheads ÷ budgeted activity', 'Budgeted overheads ÷ actual activity'],
    ans: 1,
    exp: 'OAR = budgeted overheads ÷ budgeted activity level. It is calculated in advance to absorb overheads into product costs.' },

  { id: 'poc-100', topic: 'poc', difficulty: 'hard',
    q: 'Total cost function is C = 8,000 + 3x. What is fixed cost?',
    opts: ['3x', '8,000', '11,000', 'Variable cost'],
    ans: 1,
    exp: 'In the total-cost function C = a + bx, "a" is the fixed cost (£8,000) and "b" is the variable cost per unit (£3).' },

  { id: 'poc-101', topic: 'poc', difficulty: 'hard',
    q: 'Total cost is £50,000 and units are 5,000. Average cost per unit is:',
    opts: ['£5', '£10', '£15', '£20'],
    ans: 1,
    exp: '£50,000 ÷ 5,000 = £10 per unit.' },

  { id: 'poc-102', topic: 'poc', difficulty: 'hard',
    q: 'When machine hours are the OAR basis, the rate is:',
    opts: ['Budgeted overheads ÷ budgeted labour hours', 'Budgeted overheads ÷ budgeted machine hours', 'Actual overheads ÷ actual machine hours', 'Total costs ÷ units produced'],
    ans: 1,
    exp: 'OAR (machine-hour basis) = budgeted overheads ÷ budgeted machine hours. Products are then charged based on the machine hours they use.' },


  /* -- THE BUSINESS ENVIRONMENT (BESY) -- */
  { id: 'besy-001', topic: 'besy', difficulty: 'easy',
    q: '"Consideration" in contract law is:',
    opts: [
      'Something of value given by each party to the agreement',
      'The amount of thought given before the contract is signed',
      'The length of time for which the contract will remain in force',
      'A clause setting out the penalty for failing to perform',
    ],
    ans: 0,
    exp: 'Consideration is something of value exchanged by each party — a payment, service or promise to act or refrain from acting.' },

  { id: 'besy-002', topic: 'besy', difficulty: 'easy',
    q: '"Limited liability" for shareholders means:',
    opts: [
      'Their loss is limited to the amount they paid or agreed to pay for shares',
      'They must personally settle all of the company\'s debts if it fails',
      'They have no liability of any kind in respect of the company',
      'They must personally guarantee the company\'s bank borrowings',
    ],
    ans: 0,
    exp: 'Limited liability protects shareholders\' personal assets — their loss is capped at the amount paid (or agreed to be paid) for their shares.' },

  { id: 'besy-003', topic: 'besy', difficulty: 'easy',
    q: 'A business operating in perfect competition is characterised by:',
    opts: ['Many buyers and sellers', 'Single seller', 'High barriers to entry', 'Price control by firms'],
    ans: 0,
    exp: 'Perfect competition is a theoretical market structure with many buyers and sellers, homogeneous products and free entry — firms are price takers.' },

  { id: 'besy-004', topic: 'besy', difficulty: 'easy',
    q: 'A characteristic of monopolistic competition is:',
    opts: [
      'Many sellers offering differentiated but similar products',
      'A single seller supplying the whole of the market',
      'No competition between the firms operating in the market',
      'Government ownership of the firms in the market',
    ],
    ans: 0,
    exp: 'Monopolistic competition has many firms selling differentiated (but similar) products — for example restaurants or hairdressers.' },

  { id: 'besy-005', topic: 'besy', difficulty: 'easy',
    q: 'A conflict between stakeholders occurs when:',
    opts: [
      'Different stakeholder groups pursue objectives that clash',
      'All stakeholder groups pursue exactly the same objectives',
      'The organisation makes neither a profit nor a loss',
      'All of the organisation\'s costs are fixed in nature',
    ],
    ans: 0,
    exp: 'Stakeholder conflict arises when different stakeholders pursue competing objectives — for example shareholders seeking dividends vs employees seeking pay rises.' },

  { id: 'besy-006', topic: 'besy', difficulty: 'easy',
    q: 'Which of the following would cause demand for a normal good to fall?',
    opts: ['A rise in consumer income', 'A decrease in the price of substitutes', 'A decrease in the price of complements', 'A larger market population'],
    ans: 1,
    exp: 'When a close substitute becomes cheaper, consumers switch away from this good toward the cheaper alternative — reducing demand for this good. The other options would each tend to raise demand.' },

  { id: 'besy-007', topic: 'besy', difficulty: 'easy',
    q: 'A defining feature of a sole trader is:',
    opts: ['Limited liability', 'Shares traded on a stock exchange', 'Unlimited personal liability for business debts', 'Separate legal personality registered at Companies House'],
    ans: 2,
    exp: 'A sole trader has unlimited liability — personal assets can be used to meet business debts. There is no legal separation between the owner and the business.' },

  { id: 'besy-008', topic: 'besy', difficulty: 'easy',
    q: 'A fall in exchange rate typically makes exports:',
    opts: ['More expensive abroad', 'Cheaper abroad', 'Unchanged', 'Illegal'],
    ans: 1,
    exp: 'A weaker domestic currency makes exports cheaper to foreign buyers, improving export competitiveness.' },

  { id: 'besy-009', topic: 'besy', difficulty: 'easy',
    q: 'A fiscal policy tool is:',
    opts: [
      'Taxation and public spending decided by the government',
      'Interest rates set by the Bank of England each month',
      'The exchange rate at which the currency is traded',
      'The level of wages negotiated with trade unions',
    ],
    ans: 0,
    exp: 'Fiscal policy is the use of government spending and taxation to influence aggregate demand and economic activity.' },

  { id: 'besy-010', topic: 'besy', difficulty: 'easy',
    q: 'A franchise is:',
    opts: [
      'An arrangement where one party licenses its brand and business model to another',
      'A business that is owned and operated by a department of government',
      'A company whose shares are traded publicly on a recognised stock exchange',
      'An arrangement where two or more sole traders trade as a single partnership',
    ],
    ans: 0,
    exp: 'A franchisee operates under the franchisor\'s brand and business model, typically paying initial fees and ongoing royalties.' },

  { id: 'besy-011', topic: 'besy', difficulty: 'easy',
    q: 'A key economic factor for businesses trading internationally is:',
    opts: [
      'Fluctuations in the exchange rate between currencies',
      'The colour scheme chosen for the company logo',
      'The personal preferences held by the chief executive',
      'The style of furniture used in the company\'s offices',
    ],
    ans: 0,
    exp: 'Exchange rate movements affect import costs and export competitiveness — a critical factor for any business trading across borders.' },

  { id: 'besy-012', topic: 'besy', difficulty: 'easy',
    q: 'A key reason governments regulate businesses is to:',
    opts: [
      'To protect consumers and maintain competition in markets',
      'To increase the monopoly power held by established firms',
      'To reduce the level of consumer demand in the economy',
      'To increase the general rate of inflation in the economy',
    ],
    ans: 0,
    exp: 'Regulation is used to protect consumers, ensure fair competition and prevent the abuse of market power.' },

  { id: 'besy-013', topic: 'besy', difficulty: 'easy',
    q: 'A limited company\'s separate legal personality means it:',
    opts: [
      'It can own property and sue or be sued in its own name',
      'It is unable to enter into contracts in its own name',
      'Its shareholders are personally liable for all of its debts',
      'It is owned and controlled by a department of government',
    ],
    ans: 0,
    exp: 'A limited company has separate legal personality — it can own assets, enter contracts and sue or be sued in its own name, independently of its shareholders.' },

  { id: 'besy-014', topic: 'besy', difficulty: 'easy',
    q: 'A mission statement describes:',
    opts: [
      'The organisation\'s overall purpose, values and long-term aims',
      'The detailed financial targets set for the coming financial year',
      'The tax obligations the organisation owes to HMRC each year',
      'The reporting lines between departments shown on an organisation chart',
    ],
    ans: 0,
    exp: 'A mission statement summarises the organisation\'s purpose, core values and strategic aims, providing direction for decision-making.' },

  { id: 'besy-015', topic: 'besy', difficulty: 'easy',
    q: 'A monopoly firm typically:',
    opts: ['Is price taker', 'Sets its own prices', 'Has no control over output', 'Has infinite competitors'],
    ans: 1,
    exp: 'A monopolist is the sole or dominant supplier in its market, with the power to set prices (subject to consumer demand and any regulation).' },

  { id: 'besy-016', topic: 'besy', difficulty: 'easy',
    q: 'A not-for-profit organisation:',
    opts: [
      'Exists primarily to fulfil a social, charitable or community purpose',
      'Makes a loss in every accounting period as a matter of course',
      'Is never required to pay any form of tax on its activities',
      'Reinvests all of the surplus it generates into marketing activity',
    ],
    ans: 0,
    exp: 'Not-for-profit organisations (charities, social enterprises) exist to serve a social or community purpose rather than to generate profit for owners.' },

  { id: 'besy-017', topic: 'besy', difficulty: 'easy',
    q: 'A PLC differs from a Ltd company because it:',
    opts: [
      'It can offer its shares to the public, including on a stock exchange',
      'Its shareholders have unlimited liability for the company\'s debts',
      'It is restricted to a maximum of fifty registered shareholders',
      'It is owned and controlled by a department of central government',
    ],
    ans: 0,
    exp: 'A PLC can sell shares to the general public to raise larger amounts of capital and may be listed on a stock exchange. A Ltd company cannot do this.' },

  { id: 'besy-018', topic: 'besy', difficulty: 'easy',
    q: 'A price war usually leads to:',
    opts: [
      'Its members\' liability is limited while it retains partnership flexibility',
      'Its members have unlimited personal liability for its debts',
      'It is prohibited from filing accounts at Companies House',
      'It is treated in law as identical to an ordinary partnership',
    ],
    ans: 0,
    exp: 'Aggressive price-cutting by competitors lowers prices across the market and reduces profit margins.' },

  { id: 'besy-019', topic: 'besy', difficulty: 'easy',
    q: 'A primary economic objective of firms is often to:',
    opts: [
      'It is owned by its members and run for their benefit',
      'It is owned by shareholders seeking a return on capital',
      'It is owned and controlled by a government department',
      'It is owned by a single individual trading on their own',
    ],
    ans: 0,
    exp: 'Most commercial firms are profit-driven, although they also pursue growth, market share and other goals.' },

  { id: 'besy-020', topic: 'besy', difficulty: 'easy',
    q: 'A primary objective of a not-for-profit organisation is:',
    opts: [
      'Providing a social, charitable or community benefit',
      'Maximising the dividends paid out to its shareholders',
      'Minimising the amount of tax it is required to pay',
      'Increasing the share of the market that it holds',
    ],
    ans: 0,
    exp: 'Not-for-profit organisations exist to deliver a social, charitable or community benefit rather than to maximise returns to owners.' },

  { id: 'besy-021', topic: 'besy', difficulty: 'easy',
    q: 'A public limited company raises capital by:',
    opts: [
      'An expression of willingness to contract on stated terms',
      'An invitation for others to make an offer to the seller',
      'A binding agreement that neither party may withdraw from',
      'A statement of the price at which goods are advertised',
    ],
    ans: 0,
    exp: 'A public limited company (PLC) raises capital primarily by issuing shares to the public, often via a stock exchange listing.' },

  { id: 'besy-022', topic: 'besy', difficulty: 'easy',
    q: 'A recession is typically characterised by:',
    opts: [
      'Negative economic growth over two consecutive quarters',
      'Gross domestic product rising steadily quarter on quarter',
      'Prices remaining broadly stable across the whole economy',
      'Unemployment falling to a historically low level',
    ],
    ans: 0,
    exp: 'A recession is conventionally defined as two consecutive quarters of negative GDP growth.' },

  { id: 'besy-023', topic: 'besy', difficulty: 'easy',
    q: 'A sole trader expanding may incorporate to:',
    opts: [
      'An offer that is accepted without qualification forms a binding agreement',
      'An offer remains open indefinitely until the offeror chooses to withdraw it',
      'An offer may be accepted by remaining silent and taking no further action',
      'An offer becomes binding only once it has been put into writing',
    ],
    ans: 0,
    exp: 'Incorporating as a limited company gives owners limited liability — protecting their personal assets from business debts.' },

  { id: 'besy-024', topic: 'besy', difficulty: 'easy',
    q: 'A stakeholder with high power and high interest should be:',
    opts: [
      'Something of value given by each party to the agreement',
      'A written record of the terms the parties have agreed',
      'An intention to be legally bound by the agreement made',
      'An unqualified acceptance of the terms that were offered',
    ],
    ans: 0,
    exp: 'Mendelow’s power–interest matrix recommends "manage closely" for stakeholders with both high power and high interest.' },

  { id: 'besy-025', topic: 'besy', difficulty: 'easy',
    q: 'A substitute good is one that:',
    opts: [
      'It is an invitation for customers to make an offer to buy',
      'It is a firm offer the customer is entitled to accept',
      'It creates a binding contract as soon as it is displayed',
      'It has no legal significance of any kind for either party',
    ],
    ans: 0,
    exp: 'A substitute good satisfies the same need or want as another and can replace it (e.g. tea for coffee).' },

  { id: 'besy-026', topic: 'besy', difficulty: 'easy',
    q: 'An ethical issue for an accountant would be:',
    opts: [
      'Being asked to falsify entries in the financial records',
      'Choosing which supplier provides the office stationery',
      'Deciding which accounting software package to adopt',
      'Arranging which meeting rooms are booked for the week',
    ],
    ans: 0,
    exp: 'Accountants must act with integrity. The AAT Code of Professional Ethics requires honesty, objectivity and professional behaviour at all times.' },

  { id: 'besy-027', topic: 'besy', difficulty: 'easy',
    q: 'An example of internal stakeholder is:',
    opts: [
      'An agreement is reached and both parties intend to be bound',
      'One party makes a statement about the quality of the goods',
      'The parties begin negotiating the terms they might agree',
      'A price is advertised in a catalogue sent to customers',
    ],
    ans: 0,
    exp: 'Employees work within the organisation and are therefore internal stakeholders. Customers, suppliers and government are external.' },

  { id: 'besy-028', topic: 'besy', difficulty: 'easy',
    q: 'An implied term in a contract is one which:',
    opts: [
      'It is not expressly stated but is read into the contract by law or custom',
      'It is set out clearly in the written terms agreed between the parties',
      'It is always the subject of express negotiation between the parties',
      'It is recorded in the contract but has no legal effect on either party',
    ],
    ans: 0,
    exp: 'Implied terms are included automatically by statute (e.g. the Consumer Rights Act) or custom and are legally binding even though not written into the contract.' },

  { id: 'besy-029', topic: 'besy', difficulty: 'easy',
    q: 'An increase in interest rates usually leads to:',
    opts: [
      'The agreement is not legally binding on either party',
      'The agreement binds both parties to its stated terms',
      'The agreement may only be enforced by the court',
      'The agreement takes effect once it is put in writing',
    ],
    ans: 0,
    exp: 'Higher borrowing costs reduce consumer spending and business investment, dampening demand.' },

  { id: 'besy-030', topic: 'besy', difficulty: 'easy',
    q: 'An oligopoly is characterised by:',
    opts: [
      'A term the parties have expressly agreed and stated',
      'A term read into the contract by statute or by custom',
      'A term with no legal effect on either of the parties',
      'A term that only takes effect once the contract ends',
    ],
    ans: 0,
    exp: 'An oligopoly is dominated by a small number of large firms (e.g. UK supermarkets, mobile networks).' },

  { id: 'besy-031', topic: 'besy', difficulty: 'easy',
    q: 'Breach of contract means:',
    opts: [
      'The innocent party may claim damages or, in some cases, terminate',
      'The contract automatically renews on the same terms for a further period',
      'Both parties are required to renegotiate the terms of the agreement',
      'No legal remedy is available once the contract has been signed',
    ],
    ans: 0,
    exp: 'A breach entitles the innocent party to damages (compensation) and, where the breach is sufficiently serious, to treat the contract as terminated.' },

  { id: 'besy-032', topic: 'besy', difficulty: 'easy',
    q: 'Cross price elasticity of demand measures:',
    opts: [
      'How demand for one good responds to a change in the price of another',
      'How demand for a good responds to a change in consumer income',
      'How the quantity supplied responds to a change in production costs',
      'How the tax charged on a good affects the revenue government collects',
    ],
    ans: 0,
    exp: 'Cross price elasticity of demand (XED) measures how the demand for one good responds to a change in the price of another (substitute or complement).' },

  { id: 'besy-033', topic: 'besy', difficulty: 'easy',
    q: 'GDP measures:',
    opts: [
      'The total value of goods and services produced in an economy',
      'The total number of people living and working in a country',
      'The total amount the government has borrowed and owes',
      'The rate at which prices are rising across the economy',
    ],
    ans: 0,
    exp: 'Gross Domestic Product (GDP) measures the total value of goods and services produced in an economy over a period.' },

  { id: 'besy-034', topic: 'besy', difficulty: 'easy',
    q: 'If demand is price inelastic, a price increase will:',
    opts: [
      'An increase in the general level of prices across the economy',
      'A reduction in the total output produced by the economy',
      'An increase in the number of people out of work',
      'A reduction in the amount the government has borrowed',
    ],
    ans: 0,
    exp: 'When demand is price inelastic, demand falls proportionately less than price rises, so total revenue (price × quantity) increases.' },

  { id: 'besy-035', topic: 'besy', difficulty: 'easy',
    q: 'In a general partnership, partners\' liability is:',
    opts: [
      'Government policy on taxation and public spending, set by the Treasury',
      'Bank of England policy on interest rates and the money supply',
      'The rules that govern how businesses trade across national borders',
      'The accounting standards applied in preparing published accounts',
    ],
    ans: 0,
    exp: 'General partners have unlimited liability and are jointly and severally liable for all partnership debts.' },

  { id: 'besy-036', topic: 'besy', difficulty: 'easy',
    q: 'Income elasticity of demand measures:',
    opts: [
      'Bank of England policy on interest rates and the supply of money',
      'Government policy on the level of taxation and public expenditure',
      'The regulations covering the sale of goods and services to consumers',
      'The framework of standards used in preparing financial statements',
    ],
    ans: 0,
    exp: 'Income elasticity of demand (IED) measures how the quantity demanded responds to a change in consumer income.' },

  { id: 'besy-037', topic: 'besy', difficulty: 'easy',
    q: 'Inflation is:',
    opts: [
      'A general and sustained rise in the level of prices',
      'A reduction in the rate of interest set by the Bank of England',
      'An increase in the proportion of the workforce out of work',
      'A reduction in the total value of goods imported into the country',
    ],
    ans: 0,
    exp: 'Inflation is a sustained rise in the general price level of goods and services over time.' },

  { id: 'besy-038', topic: 'besy', difficulty: 'easy',
    q: 'Inflation reduces:',
    opts: [
      'The total spending on goods and services across the economy',
      'The total output produced by a single firm in the economy',
      'The total amount of tax collected by government in a year',
      'The total value of goods a country sells to other countries',
    ],
    ans: 0,
    exp: 'Inflation reduces the purchasing power of money — each pound buys fewer goods than before.' },

  { id: 'besy-039', topic: 'besy', difficulty: 'easy',
    q: 'Market segmentation involves:',
    opts: [
      'Dividing a market into distinct groups of similar customers',
      'Combining all customers into one single undifferentiated group',
      'Reducing selling prices to attract additional customers',
      'Increasing production volumes to meet anticipated demand',
    ],
    ans: 0,
    exp: 'Market segmentation divides a market into distinct groups (by demographics, behaviour, geography, etc.) so marketing can be targeted effectively.' },

  { id: 'besy-040', topic: 'besy', difficulty: 'easy',
    q: 'Price elasticity of demand measures:',
    opts: [
      'How responsive demand is to a change in the selling price',
      'How responsive supply is to a change in the selling price',
      'The total revenue a business generates from its sales',
      'How production costs change over the course of a period',
    ],
    ans: 0,
    exp: 'Price elasticity of demand (PED) measures the percentage change in quantity demanded relative to the percentage change in price.' },

  { id: 'besy-041', topic: 'besy', difficulty: 'easy',
    q: 'Rising interest rates tend to:',
    opts: [
      'Reduce consumer spending, because borrowing costs more',
      'Reduce the cost of borrowing for households and businesses',
      'Cause exports to rise immediately as the currency weakens',
      'Decrease the interest costs faced by businesses with loans',
    ],
    ans: 0,
    exp: 'Higher interest rates reduce consumers\' disposable income (via higher mortgage payments) and increase borrowing costs for businesses, both of which tend to reduce spending.' },

  { id: 'besy-042', topic: 'besy', difficulty: 'easy',
    q: 'Rising interest rates typically cause:',
    opts: [
      'A rise in the general price level across the whole economy',
      'A fall in the total output produced by the whole economy',
      'A rise in the proportion of the workforce that is unemployed',
      'A fall in the amount the government has borrowed in the year',
    ],
    ans: 0,
    exp: 'Higher interest rates increase the cost of borrowing and the returns on saving, reducing borrowing-financed spending and demand.' },

  { id: 'besy-043', topic: 'besy', difficulty: 'easy',
    q: 'The accounting function\'s role regarding sustainability includes:',
    opts: [
      'Recording environmental costs and helping measure the carbon footprint',
      'Excluding environmental costs from the accounting records entirely',
      'Reporting only on profit without regard to any other measure',
      'Declining to trade with businesses that have environmental policies',
    ],
    ans: 0,
    exp: 'Modern finance functions measure and report sustainability and environmental costs, helping organisations manage and reduce their environmental impact.' },

  { id: 'besy-044', topic: 'besy', difficulty: 'easy',
    q: 'The Consumer Rights Act 2015 requires goods to be:',
    opts: [
      'Of satisfactory quality, fit for purpose and as described to the buyer',
      'The cheapest equivalent goods available anywhere in the market',
      'Sold only through retailers formally registered with a trade body',
      'Guaranteed by the seller for a minimum period of five years',
    ],
    ans: 0,
    exp: 'Goods must be of satisfactory quality, fit for purpose and match any description given. Consumers can seek repair, replacement or refund where these standards are not met.' },

  { id: 'besy-045', topic: 'besy', difficulty: 'easy',
    q: 'The Equality Act 2010 protects workers from discrimination based on:',
    opts: [
      'Protected characteristics such as age, sex, race and disability',
      'The performance ratings given to employees in appraisals',
      'The level of formal qualifications an employee holds',
      'The number of people the employer has on its payroll',
    ],
    ans: 0,
    exp: 'The Equality Act protects nine characteristics: age, disability, gender reassignment, marriage and civil partnership, pregnancy and maternity, race, religion or belief, sex, and sexual orientation.' },

  { id: 'besy-046', topic: 'besy', difficulty: 'easy',
    q: 'The essential elements of a legally binding contract include:',
    opts: [
      'Offer, acceptance, consideration and intention to be bound',
      'A verbal agreement between the parties and nothing more',
      'A written document signed by each of the parties involved',
      'The signature of a qualified solicitor acting for both sides',
    ],
    ans: 0,
    exp: 'A contract requires an offer, an acceptance, consideration (something of value exchanged) and an intention to create legal relations.' },

  { id: 'besy-047', topic: 'besy', difficulty: 'easy',
    q: 'The finance function primarily:',
    opts: [
      'Records and reports financial information to support decision-making',
      'Promotes the organisation\'s products through advertising and social media',
      'Designs and develops the organisation\'s new products',
      'Recruits, trains and manages the organisation\'s employees',
    ],
    ans: 0,
    exp: 'The finance function maintains records, prepares financial reports, manages cash flow, supports budgeting and provides information for decisions.' },

  { id: 'besy-048', topic: 'besy', difficulty: 'easy',
    q: 'The UK GDPR / Data Protection Act 2018:',
    opts: [
      'Regulates how organisations collect, hold and use personal data',
      'Governs how businesses calculate and pay tax on their profits',
      'Sets the minimum hourly wage rates employers must pay staff',
      'Requires all limited companies to have their accounts audited',
    ],
    ans: 0,
    exp: 'The UK GDPR / DPA 2018 gives individuals rights over their personal data and requires organisations to handle it lawfully, fairly and securely.' },

  { id: 'besy-049', topic: 'besy', difficulty: 'easy',
    q: 'What happens when interest rates rise?',
    opts: [
      'Borrowing becomes more expensive for households and businesses',
      'Borrowing becomes cheaper for households and businesses',
      'Saving becomes less attractive relative to spending',
      'Exports cease because the currency becomes too strong',
    ],
    ans: 0,
    exp: 'When interest rates rise, the cost of borrowing for households (e.g. mortgages) and businesses (e.g. loans) increases.' },

  { id: 'besy-050', topic: 'besy', difficulty: 'easy',
    q: 'What is a barrier to entry?',
    opts: [
      'An obstacle that makes it difficult for new competitors to enter a market',
      'A wage level that is high compared with others in the same industry',
      'A level of profit that attracts new competitors into a market',
      'A rate of inflation low enough to encourage new investment',
    ],
    ans: 0,
    exp: 'Barriers to entry — for example high capital costs, regulation, patents or strong incumbent brands — prevent or slow new firms from entering a market.' },

  { id: 'besy-051', topic: 'besy', difficulty: 'easy',
    q: 'What is a consequence of a weak currency?',
    opts: ['Cheaper imports', 'More expensive imports', 'Lower inflation always', 'No trade impact'],
    ans: 1,
    exp: 'A weaker domestic currency means more domestic currency is needed to buy the same foreign goods, making imports more expensive.' },

  { id: 'besy-052', topic: 'besy', difficulty: 'easy',
    q: 'Which of the following is required for a contract to be legally binding?',
    opts: ['A profit element', 'Consideration', 'A tax certificate', 'An auditor’s signature'],
    ans: 1,
    exp: 'Consideration — something of value exchanged by each party — is one of the essential elements of a binding contract, alongside offer, acceptance and intention to create legal relations.' },

  { id: 'besy-053', topic: 'besy', difficulty: 'easy',
    q: 'What is a franchise fee?',
    opts: [
      'A payment made for the right to trade under an established brand',
      'A wage paid to staff working in a franchised outlet',
      'A tax charged by HMRC on franchised businesses',
      'A loan advanced by a bank to open a new outlet',
    ],
    ans: 0,
    exp: 'A franchise fee is paid by the franchisee to the franchisor for the right to use the brand and business model.' },

  { id: 'besy-054', topic: 'besy', difficulty: 'easy',
    q: 'What is a mission statement?',
    opts: [
      'A statement of the organisation\'s overall purpose and direction',
      'A report setting out the organisation\'s financial results',
      'A form submitted to HMRC declaring taxable profits',
      'A plan setting out expected income and expenditure',
    ],
    ans: 0,
    exp: 'A mission statement sets out the organisation\'s purpose, values and aims, providing strategic direction.' },

  { id: 'besy-055', topic: 'besy', difficulty: 'easy',
    q: 'What is a monopoly?',
    opts: ['Many sellers', 'One dominant seller', 'No sellers', 'Government-only market'],
    ans: 1,
    exp: 'A monopoly is a market with a single dominant supplier, giving that firm significant power to set prices and restrict output.' },

  { id: 'besy-056', topic: 'besy', difficulty: 'easy',
    q: 'What is a key advantage of a public limited company (PLC)?',
    opts: [
      'It can raise large amounts of capital by offering shares to the public',
      'Its shareholders have unlimited liability for the company\'s debts',
      'It is free from the regulation that applies to private companies',
      'It is not required to publish its annual accounts at Companies House',
    ],
    ans: 0,
    exp: 'A PLC can offer shares to the public, including via a stock exchange, allowing it to raise substantial capital from a wide investor base.' },

  { id: 'besy-057', topic: 'besy', difficulty: 'easy',
    q: 'What is a disadvantage of operating as a sole trader?',
    opts: ['Limited liability for business debts', 'Unlimited personal liability for business debts', 'Loss of control over the business', 'Higher start-up capital required'],
    ans: 1,
    exp: 'A sole trader has unlimited personal liability — personal assets can be used to settle business debts.' },

  { id: 'besy-058', topic: 'besy', difficulty: 'easy',
    q: 'What is a stakeholder conflict?',
    opts: [
      'Different stakeholder groups pursuing objectives that clash',
      'Different stakeholder groups pursuing the same objectives',
      'An increase in the profit the organisation reports',
      'An increase in the size of the market the organisation serves',
    ],
    ans: 0,
    exp: 'Stakeholder conflict occurs when different groups have competing objectives — for example shareholders favouring profit and employees favouring higher wages.' },

  { id: 'besy-059', topic: 'besy', difficulty: 'easy',
    q: 'What does UK consumer rights legislation primarily protect?',
    opts: [
      'The quality and accuracy of goods and services sold to consumers',
      'The terms and conditions on which employees are engaged',
      'The way businesses calculate and pay tax to HMRC',
      'The arrangements between businesses and their banks',
    ],
    ans: 0,
    exp: 'The Consumer Rights Act 2015 requires goods to be of satisfactory quality, fit for purpose and as described, with statutory remedies if they are not.' },

  { id: 'besy-060', topic: 'besy', difficulty: 'easy',
    q: 'What is ethical behaviour?',
    opts: [
      'The rate at which the general level of prices is rising',
      'The total value of goods and services produced in an economy',
      'The proportion of the workforce that is currently out of work',
      'The amount the government has borrowed and not yet repaid',
    ],
    ans: 0,
    exp: 'Ethical behaviour means acting honestly and with integrity, complying with the spirit as well as the letter of the law.' },

  { id: 'besy-061', topic: 'besy', difficulty: 'easy',
    q: 'What is exchange rate risk?',
    opts: [
      'The risk that movements in currency values affect the business',
      'The risk that general price inflation erodes the value of cash held',
      'The risk that the business becomes unable to pay its debts as they fall due',
      'The risk that the government increases the rate of tax on profits',
    ],
    ans: 0,
    exp: 'Exchange rate risk is the risk that movements in currency rates will adversely affect the value of foreign-currency receipts, payments or investments.' },

  { id: 'besy-062', topic: 'besy', difficulty: 'easy',
    q: 'Which of the following is an external stakeholder?',
    opts: ['A line manager', 'A supplier', 'An employee', 'A director'],
    ans: 1,
    exp: 'Suppliers are outside the organisation and therefore external stakeholders. Managers, employees and directors are internal.' },

  { id: 'besy-063', topic: 'besy', difficulty: 'easy',
    q: 'What is fiscal policy?',
    opts: [
      'Government decisions on taxation and public spending levels',
      'Bank of England decisions on interest rates and money supply',
      'Official intervention to control the value of the currency',
      'Negotiations between employers and unions over pay levels',
    ],
    ans: 0,
    exp: 'Fiscal policy is the use of government taxation and spending to influence the level of activity in the economy.' },

  { id: 'besy-064', topic: 'besy', difficulty: 'easy',
    q: 'What is GDP?',
    opts: [
      'The total value of goods and services produced in an economy',
      'The government\'s plan for repaying the money it has borrowed',
      'The total tax revenue the government collects in a year',
      'The rate of interest set by the Bank of England',
    ],
    ans: 0,
    exp: 'Gross Domestic Product (GDP) is the total value of goods and services produced in an economy in a given period.' },

  { id: 'besy-065', topic: 'besy', difficulty: 'easy',
    q: 'What is the UK GDPR / Data Protection Act 2018 primarily about?',
    opts: ['Taxation of digital services', 'Protection of personal data', 'Setting wage rates', 'Preparing statutory accounts'],
    ans: 1,
    exp: 'The UK GDPR / DPA 2018 governs how organisations collect, use, store and share personal data.' },

  { id: 'besy-066', topic: 'besy', difficulty: 'easy',
    q: 'What is the main purpose of the UK GDPR?',
    opts: [
      'To protect personal data and give individuals rights over how it is used',
      'To set the rules under which businesses trade across international borders',
      'To determine how much tax businesses must collect and pay over to HMRC',
      'To prescribe the accounting standards used in preparing financial statements',
    ],
    ans: 0,
    exp: 'The UK GDPR protects personal data and gives individuals rights to access, correct and restrict the use of their data.' },

  { id: 'besy-067', topic: 'besy', difficulty: 'easy',
    q: 'What is inflation?',
    opts: [
      'A general and sustained rise in the level of prices',
      'A general and sustained fall in the level of prices',
      'A period in which the level of prices remains stable',
      'A reduction in the wages paid across the economy',
    ],
    ans: 0,
    exp: 'Inflation is a general and sustained rise in the price level of goods and services across the economy.' },

  { id: 'besy-068', topic: 'besy', difficulty: 'easy',
    q: 'What is a typical effect of a rise in interest rates on consumer spending?',
    opts: [
      'Spending falls, because borrowing becomes more expensive',
      'Spending rises, because saving becomes less attractive',
      'Spending is unaffected, because rates do not influence consumers',
      'Exports rise immediately, because the currency weakens',
    ],
    ans: 0,
    exp: 'Higher interest rates raise borrowing costs and mortgage payments, reducing disposable income and so reducing consumer spending.' },

  { id: 'besy-069', topic: 'besy', difficulty: 'easy',
    q: 'What is limited liability?',
    opts: ['Unlimited personal debt', 'Loss limited to investment', 'No responsibility', 'Government guarantee'],
    ans: 1,
    exp: 'Limited liability means shareholders\' loss is limited to the amount they have invested (or agreed to pay) for their shares — personal assets are protected.' },

  { id: 'besy-070', topic: 'besy', difficulty: 'easy',
    q: 'Which of the following is a macroeconomic factor?',
    opts: [
      'An economy-wide influence such as inflation, GDP growth or interest rates',
      'An internal staffing issue arising within one department of the business',
      'A dispute with one particular supplier over the terms of a contract',
      'A complaint received from a single customer about a product or service',
    ],
    ans: 0,
    exp: 'Macroeconomic factors operate at the level of the whole economy — for example inflation, GDP growth, unemployment and interest rates.' },

  { id: 'besy-071', topic: 'besy', difficulty: 'easy',
    q: 'What is price elasticity of demand used to measure?',
    opts: [
      'How responsive demand is to a change in the selling price',
      'How production costs change as output volumes increase',
      'How much profit a business earns on each unit it sells',
      'How tax rates change as taxable profits increase',
    ],
    ans: 0,
    exp: 'Price elasticity of demand (PED) measures how sensitive demand is to a change in price.' },

  { id: 'besy-072', topic: 'besy', difficulty: 'easy',
    q: 'What does "separate legal personality" mean for a limited company?',
    opts: [
      'It is treated in law as an entity separate from its own shareholders',
      'It is exempt from the requirement to prepare annual financial statements',
      'It is not liable to pay corporation tax on the profits it earns',
      'It bears no liability at all for the debts it incurs in trading',
    ],
    ans: 0,
    exp: 'A limited company has a legal existence separate from its shareholders. It can own assets, enter contracts and sue or be sued in its own name.' },

  { id: 'besy-073', topic: 'besy', difficulty: 'easy',
    q: 'Who is a stakeholder?',
    opts: [
      'Any individual or group with an interest in, or affected by, the business',
      'Only the people who legally own the shares in the business',
      'Only the managers responsible for running the business day to day',
      'Only the customers who buy the goods or services the business sells',
    ],
    ans: 0,
    exp: 'A stakeholder is any individual or group with an interest in the organisation — including shareholders, employees, customers, suppliers, lenders and the wider community.' },

  { id: 'besy-074', topic: 'besy', difficulty: 'easy',
    q: 'Which factors primarily affect supply?',
    opts: [
      'Production costs and the productivity of the resources used',
      'The selling price of the product and nothing else',
      'The level of demand shown by consumers for the product',
      'The wage rates paid to the workers producing the product',
    ],
    ans: 0,
    exp: 'Supply depends primarily on production costs, the productivity of inputs and the prices of related inputs.' },

  { id: 'besy-075', topic: 'besy', difficulty: 'easy',
    q: 'What is sustainability reporting?',
    opts: [
      'Reporting the organisation\'s environmental and social impact',
      'Reporting the tax the organisation has paid to HMRC',
      'Reporting the wages and deductions processed through payroll',
      'Reporting the sales the organisation achieved in the period',
    ],
    ans: 0,
    exp: 'Sustainability reporting communicates an organisation’s environmental, social and governance (ESG) performance and impact.' },

  { id: 'besy-076', topic: 'besy', difficulty: 'easy',
    q: 'What is the purpose of stakeholder analysis?',
    opts: [
      'To identify each stakeholder\'s interests and their influence',
      'To calculate the amount of tax the organisation must pay',
      'To reduce the costs the organisation incurs on its inputs',
      'To calculate the profit the organisation earned in the period',
    ],
    ans: 0,
    exp: 'Stakeholder analysis identifies stakeholders, their interests and their influence, so the organisation can prioritise communication and management accordingly.' },

  { id: 'besy-077', topic: 'besy', difficulty: 'easy',
    q: 'What is the typical effect of higher unemployment on consumer demand?',
    opts: ['Higher overall demand', 'Lower overall demand', 'Higher inflation always', 'No effect'],
    ans: 1,
    exp: 'Higher unemployment reduces aggregate income and confidence, lowering consumer demand.' },

  { id: 'besy-078', topic: 'besy', difficulty: 'easy',
    q: 'What is unlimited liability?',
    opts: [
      'The owner is personally responsible for the debts of the business',
      'The business is not permitted to take on any debt finance',
      'The business is exempt from paying tax on its profits',
      'The business is not required to keep accounting records',
    ],
    ans: 0,
    exp: 'Unlimited liability means the owner is personally responsible for all the debts of the business. Personal assets can be used to settle business debts.' },

  { id: 'besy-079', topic: 'besy', difficulty: 'easy',
    q: 'Which business structure offers all members limited liability?',
    opts: [
      'A private limited company registered at Companies House',
      'A sole trader operating under a registered business name',
      'A general partnership governed by the Partnership Act 1890',
      'An unlimited partnership with no cap on member liability',
    ],
    ans: 0,
    exp: 'A private limited company provides limited liability — shareholders can lose only the amount they have invested in or agreed to pay for their shares.' },

  { id: 'besy-080', topic: 'besy', difficulty: 'easy',
    q: 'Which factor is external to a business?',
    opts: ['Management style', 'Employee skills', 'Government policy', 'Production method'],
    ans: 2,
    exp: 'Government policy (tax, regulation, spending) is an external (PESTLE) factor that the business does not control but must respond to.' },

  { id: 'besy-081', topic: 'besy', difficulty: 'easy',
    q: 'Which factor reduces demand?',
    opts: ['Income increase', 'Price decrease', 'Substitute price increase', 'Complement price increase'],
    ans: 3,
    exp: 'A rise in the price of a complementary good (e.g. petrol for cars) makes the joint purchase more expensive, reducing demand for the related good.' },

  { id: 'besy-082', topic: 'besy', difficulty: 'easy',
    q: 'Which is a microeconomic factor?',
    opts: [
      'The prices charged by a business\'s direct competitors',
      'The rate of inflation across the economy as a whole',
      'The exchange rate between sterling and other currencies',
      'The rate at which gross domestic product is growing',
    ],
    ans: 0,
    exp: 'Microeconomic factors operate at the level of individual firms and markets — for example competitor pricing, consumer preferences and input costs.' },

  { id: 'besy-083', topic: 'besy', difficulty: 'easy',
    q: 'Which of the following is a feature of a PLC?',
    opts: [
      'It can offer its shares for sale to the general public',
      'It is prohibited from issuing any shares to investors',
      'It has no owners, being controlled by its directors alone',
      'It is not required to publish its annual accounts',
    ],
    ans: 0,
    exp: 'A PLC can offer shares to the public, including listing on a stock exchange. A private limited company cannot.' },

  { id: 'besy-084', topic: 'besy', difficulty: 'easy',
    q: 'Which of the following is a macroeconomic factor affecting business?',
    opts: ['A competitor launching a new product', 'The unemployment rate', 'A key employee resigning', 'Moving to new premises'],
    ans: 1,
    exp: 'Macroeconomic factors (unemployment, inflation, interest rates, GDP) are economy-wide influences largely outside the control of any individual business.' },

  { id: 'besy-085', topic: 'besy', difficulty: 'easy',
    q: 'Which of the following is an external stakeholder?',
    opts: [
      'The rules governing how employers must treat their staff',
      'The rules governing goods and services sold to consumers',
      'The rules governing how companies must file their accounts',
      'The rules governing how personal data may be processed',
    ],
    ans: 0,
    exp: 'External stakeholders are outside the business — for example customers, suppliers, government and banks. Internal stakeholders include employees and managers.' },

  { id: 'besy-086', topic: 'besy', difficulty: 'easy',
    q: 'Which stakeholder is primarily concerned with profit distribution?',
    opts: ['Government', 'Shareholders', 'Customers', 'Suppliers'],
    ans: 1,
    exp: 'Shareholders invest capital in the company and receive a share of profits in the form of dividends.' },

  { id: 'besy-087', topic: 'besy', difficulty: 'easy',
    q: 'Which UK legislation sets minimum hourly pay?',
    opts: [
      'The National Minimum Wage Act, which sets minimum hourly pay',
      'The Data Protection Act, which governs the use of personal data',
      'The Consumer Rights Act, which governs goods sold to consumers',
      'The Equality Act, which prohibits discrimination at work',
    ],
    ans: 0,
    exp: 'The National Minimum Wage Act (and National Living Wage regulations) set legal minimum hourly rates depending on the worker’s age.' },

  { id: 'besy-088', topic: 'besy', difficulty: 'medium',
    q: 'A depreciation of the domestic currency will:',
    opts: ['Make exports cheaper', 'Make imports cheaper', 'Have no effect on trade', 'Reduce inflation immediately'],
    ans: 0,
    exp: 'A weaker domestic currency makes exports cheaper to foreign buyers and imports more expensive — generally improving the trade balance.' },

  { id: 'besy-089', topic: 'besy', difficulty: 'medium',
    q: 'A negative externality leads to:',
    opts: [
      'A cost falling on third parties outside the transaction',
      'A benefit accruing privately to the business alone',
      'An increase in the demand for the product concerned',
      'An automatic reduction in the tax the business pays',
    ],
    ans: 0,
    exp: 'A negative externality is a cost imposed on third parties not involved in a transaction — for example pollution.' },

  { id: 'besy-090', topic: 'besy', difficulty: 'medium',
    q: 'A positive externality results in:',
    opts: ['Private cost only', 'Benefit to third parties', 'Higher taxes only', 'Reduced supply only'],
    ans: 1,
    exp: 'A positive externality is a benefit that spills over to third parties not directly involved in a transaction — for example education improving wider society.' },

  { id: 'besy-091', topic: 'besy', difficulty: 'medium',
    q: 'An external cost (negative externality) is:',
    opts: [
      'A cost imposed on third parties who are not part of the transaction',
      'The profit earned privately by the business making the decision',
      'A reduction in the tax the business is required to pay',
      'An improvement in the efficiency of the business\'s own operations',
    ],
    ans: 0,
    exp: 'An external cost (negative externality) is a cost imposed on third parties who are not part of the transaction.' },

  { id: 'besy-092', topic: 'besy', difficulty: 'medium',
    q: 'What is an example of CSR?',
    opts: [
      'Publishing a report on the organisation\'s environmental impact',
      'Arranging the organisation\'s affairs to evade tax due',
      'Agreeing prices with competitors to keep prices high',
      'Using a dominant market position to exclude competitors',
    ],
    ans: 0,
    exp: 'Corporate Social Responsibility (CSR) includes voluntary actions such as environmental reporting, ethical sourcing and community engagement.' },

  { id: 'besy-093', topic: 'besy', difficulty: 'medium',
    q: 'Which policy tool directly affects money supply?',
    opts: ['Fiscal policy', 'Monetary policy', 'CSR policy', 'Marketing policy'],
    ans: 1,
    exp: 'Monetary policy uses the Bank of England\'s interest rate and asset purchases to influence the money supply and overall economic activity.' },

  { id: 'besy-094', topic: 'besy', difficulty: 'medium',
    q: 'Which situation is most likely during economic recession?',
    opts: ['Rising demand', 'Falling demand', 'Stable exports', 'Currency appreciation'],
    ans: 1,
    exp: 'During a recession, falling incomes and weaker consumer confidence reduce demand for most goods and services.' },


  /* ── Helpers for numeric question generators (realistic random bounds) ── */
];

(function () {
  function r(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
  function rs(min, max, step) { const n = Math.floor((max - min) / step) + 1; return min + step * Math.floor(Math.random() * n); }
  function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
  function fmt(n) { return Number(n).toLocaleString('en-GB'); }
  function round2(n) { return Math.round(n * 100) / 100; }
  function round4(n) { return Math.round(n * 10000) / 10000; }
  window._QH = { r: r, rs: rs, pick: pick, fmt: fmt, round2: round2, round4: round4 };
})();

window.ALL_QUESTIONS.push(

  /* -- INTRODUCTION TO BOOKKEEPING (ITBK) -- */
  { id: 'itbk-num-001', topic: 'itbk', difficulty: 'easy', type: 'numeric', unit: '£',
    generate: function () {
      const net = window._QH.rs(150, 4000, 50);
      const ans = window._QH.round2(net * 0.20);
      return {
        q: 'A sale is invoiced at £' + window._QH.fmt(net) + ' net. What is the VAT charged at 20%?',
        answer: ans,
        steps: [
          'Identify the net (VAT-exclusive) amount: £' + window._QH.fmt(net) + '.',
          'VAT = net × 20% = £' + window._QH.fmt(net) + ' × 0.20 = £' + window._QH.fmt(ans) + '.',
          'The VAT charged is £' + window._QH.fmt(ans) + '.'
        ],
        exp: 'VAT = £' + window._QH.fmt(net) + ' × 20% = £' + window._QH.fmt(ans) + '.'
      };
    } },

  { id: 'itbk-num-002', topic: 'itbk', difficulty: 'easy', type: 'numeric', unit: '£',
    generate: function () {
      const net = window._QH.rs(100, 3000, 50);
      const vat = window._QH.round2(net * 0.20);
      const total = window._QH.round2(net + vat);
      return {
        q: 'Goods are sold for £' + window._QH.fmt(net) + ' net plus 20% VAT. What is the total invoice value?',
        answer: total,
        steps: [
          'VAT = £' + window._QH.fmt(net) + ' × 20% = £' + window._QH.fmt(vat) + '.',
          'Total = net + VAT = £' + window._QH.fmt(net) + ' + £' + window._QH.fmt(vat) + ' = £' + window._QH.fmt(total) + '.',
          'The total invoice value is £' + window._QH.fmt(total) + '.'
        ],
        exp: 'Total = £' + window._QH.fmt(net) + ' + (£' + window._QH.fmt(net) + ' × 20%) = £' + window._QH.fmt(net) + ' + £' + window._QH.fmt(vat) + ' = £' + window._QH.fmt(total) + '.'
      };
    } },

  { id: 'itbk-num-003', topic: 'itbk', difficulty: 'medium', type: 'numeric', unit: '£',
    generate: function () {
      const opening = window._QH.rs(3000, 12000, 500);
      const purchases = window._QH.rs(25000, 80000, 1000);
      const closing = window._QH.rs(2000, Math.min(15000, opening + 4000), 500);
      const ans = opening + purchases - closing;
      return {
        q: 'Cost of goods sold: opening inventory £' + window._QH.fmt(opening) + ', purchases £' + window._QH.fmt(purchases) + ', closing inventory £' + window._QH.fmt(closing) + '. What is COGS?',
        answer: ans,
        steps: [
          'Opening inventory + purchases = £' + window._QH.fmt(opening) + ' + £' + window._QH.fmt(purchases) + ' = £' + window._QH.fmt(opening + purchases) + '.',
          'Deduct closing inventory: £' + window._QH.fmt(opening + purchases) + ' − £' + window._QH.fmt(closing) + ' = £' + window._QH.fmt(ans) + '.',
          'COGS is £' + window._QH.fmt(ans) + '.'
        ],
        exp: 'COGS = opening + purchases − closing = £' + window._QH.fmt(opening) + ' + £' + window._QH.fmt(purchases) + ' − £' + window._QH.fmt(closing) + ' = £' + window._QH.fmt(ans) + '.'
      };
    } },

  { id: 'itbk-num-004', topic: 'itbk', difficulty: 'medium', type: 'numeric', unit: '£',
    generate: function () {
      const gross = window._QH.rs(1800, 4500, 100);
      const paye = Math.round(gross * window._QH.pick([0.15, 0.17, 0.18, 0.20, 0.22]) / 10) * 10;
      const nic = Math.round(gross * window._QH.pick([0.07, 0.08, 0.09]) / 10) * 10;
      const net = gross - paye - nic;
      return {
        q: 'An employee has gross pay of £' + window._QH.fmt(gross) + ', PAYE of £' + window._QH.fmt(paye) + ' and employee NIC of £' + window._QH.fmt(nic) + '. What is the net pay?',
        answer: net,
        steps: [
          'Total deductions = PAYE + employee NIC = £' + window._QH.fmt(paye) + ' + £' + window._QH.fmt(nic) + ' = £' + window._QH.fmt(paye + nic) + '.',
          'Net pay = gross − deductions = £' + window._QH.fmt(gross) + ' − £' + window._QH.fmt(paye + nic) + ' = £' + window._QH.fmt(net) + '.',
          'Net pay is £' + window._QH.fmt(net) + '.'
        ],
        exp: 'Net pay = gross − PAYE − employee NIC = £' + window._QH.fmt(gross) + ' − £' + window._QH.fmt(paye) + ' − £' + window._QH.fmt(nic) + ' = £' + window._QH.fmt(net) + '.'
      };
    } },

  { id: 'itbk-num-005', topic: 'itbk', difficulty: 'hard', type: 'numeric', unit: '£',
    generate: function () {
      // Pre-tested clean combinations of cost, residual, life, depreciable/life integer
      const combos = [
        { cost: 20000, res: 2000, life: 5 },
        { cost: 25000, res: 5000, life: 5 },
        { cost: 18000, res: 3000, life: 5 },
        { cost: 30000, res: 6000, life: 6 },
        { cost: 24000, res: 4000, life: 4 },
        { cost: 22000, res: 2000, life: 5 },
        { cost: 35000, res: 5000, life: 6 },
        { cost: 12000, res: 2000, life: 5 },
        { cost: 40000, res: 4000, life: 4 },
        { cost: 50000, res: 10000, life: 8 },
        { cost: 16000, res: 1000, life: 5 },
        { cost: 28000, res: 4000, life: 6 }
      ];
      const c = window._QH.pick(combos);
      const dep = c.cost - c.res;
      const ans = dep / c.life;
      return {
        q: 'Straight-line depreciation: a machine costs £' + window._QH.fmt(c.cost) + ' with a residual value of £' + window._QH.fmt(c.res) + ' and a useful life of ' + c.life + ' years. What is the annual depreciation charge?',
        answer: ans,
        steps: [
          'Depreciable amount = cost − residual = £' + window._QH.fmt(c.cost) + ' − £' + window._QH.fmt(c.res) + ' = £' + window._QH.fmt(dep) + '.',
          'Annual depreciation = depreciable amount ÷ useful life = £' + window._QH.fmt(dep) + ' ÷ ' + c.life + ' = £' + window._QH.fmt(ans) + '.',
          'The annual depreciation charge is £' + window._QH.fmt(ans) + '.'
        ],
        exp: '(Cost − residual) ÷ life = (£' + window._QH.fmt(c.cost) + ' − £' + window._QH.fmt(c.res) + ') ÷ ' + c.life + ' = £' + window._QH.fmt(dep) + ' ÷ ' + c.life + ' = £' + window._QH.fmt(ans) + ' per year.'
      };
    } },

  { id: 'itbk-num-006', topic: 'itbk', difficulty: 'hard', type: 'numeric', unit: '£',
    generate: function () {
      const cv = window._QH.rs(4000, 25000, 500);
      const rate = window._QH.pick([10, 15, 20, 25, 30, 40]);
      const ans = window._QH.round2(cv * rate / 100);
      return {
        q: 'A fixed asset has a carrying value of £' + window._QH.fmt(cv) + ' at the start of the year and is depreciated at ' + rate + '% reducing balance. What is the depreciation charge for the year?',
        answer: ans,
        steps: [
          'Identify the carrying value at the start of the year: £' + window._QH.fmt(cv) + '.',
          'Depreciation = carrying value × rate = £' + window._QH.fmt(cv) + ' × ' + rate + '% = £' + window._QH.fmt(ans) + '.',
          'The depreciation charge for the year is £' + window._QH.fmt(ans) + '.'
        ],
        exp: 'Reducing balance = carrying value × rate = £' + window._QH.fmt(cv) + ' × ' + rate + '% = £' + window._QH.fmt(ans) + '.'
      };
    } },

  { id: 'itbk-num-007', topic: 'itbk', difficulty: 'hard', type: 'numeric', unit: '£', tolerance: 0.05,
    generate: function () {
      // Annual insurance paid in advance covering 12 months from start month; year end 31 Dec
      const months = ['January','February','March','April','May','June','July','August','September','October','November'];
      const startIdx = window._QH.r(1, 11); // start month 1=Feb..11=Dec, never Jan so always some prepayment
      const monthName = ['January','February','March','April','May','June','July','August','September','October','November','December'][startIdx];
      const annual = window._QH.rs(1200, 3600, 120); // divisible by 12
      const prepaidMonths = startIdx; // 1..11
      const usedMonths = 12 - startIdx;
      const monthlyAmount = annual / 12;
      const ans = window._QH.round2(monthlyAmount * prepaidMonths);
      return {
        q: 'Insurance of £' + window._QH.fmt(annual) + ' is paid on 1 ' + monthName + ' covering the next 12 months. The financial year ends 31 December. What is the prepayment at year end?',
        answer: ans,
        steps: [
          'Monthly cost = £' + window._QH.fmt(annual) + ' ÷ 12 = £' + window._QH.fmt(monthlyAmount) + ' per month.',
          'By 31 December, ' + usedMonths + ' month' + (usedMonths === 1 ? '' : 's') + ' of cover ' + (usedMonths === 1 ? 'has' : 'have') + ' been used, leaving ' + prepaidMonths + ' month' + (prepaidMonths === 1 ? '' : 's') + ' prepaid.',
          'Prepayment = ' + prepaidMonths + ' × £' + window._QH.fmt(monthlyAmount) + ' = £' + window._QH.fmt(ans) + '.'
        ],
        exp: 'By 31 December, ' + usedMonths + ' month' + (usedMonths === 1 ? '' : 's') + ' have been used. The remaining ' + prepaidMonths + ' month' + (prepaidMonths === 1 ? '' : 's') + ' is prepaid: ' + prepaidMonths + '/12 × £' + window._QH.fmt(annual) + ' = £' + window._QH.fmt(ans) + '.'
      };
    } },

  { id: 'itbk-num-008', topic: 'itbk', difficulty: 'easy', type: 'numeric', unit: '£',
    generate: function () {
      const units = window._QH.rs(25, 200, 5);
      const price = window._QH.r(8, 60);
      const ans = units * price;
      return {
        q: 'A business sells ' + window._QH.fmt(units) + ' units at £' + price + ' each. What is the total sales revenue?',
        answer: ans,
        steps: [
          'Revenue = units sold × selling price = ' + window._QH.fmt(units) + ' × £' + price + ' = £' + window._QH.fmt(ans) + '.',
          'Total sales revenue is £' + window._QH.fmt(ans) + '.'
        ],
        exp: window._QH.fmt(units) + ' × £' + price + ' = £' + window._QH.fmt(ans) + '.'
      };
    } },


  /* -- PRINCIPLES OF BOOKKEEPING CONTROLS (POBC) -- */
  { id: 'pobc-num-001', topic: 'pobc', difficulty: 'easy', type: 'numeric', unit: '£',
    generate: function () {
      const output = window._QH.rs(5000, 25000, 100);
      const input = window._QH.rs(1000, output - 500, 100);
      const ans = output - input;
      return {
        q: 'Output VAT for the quarter is £' + window._QH.fmt(output) + ' and input VAT is £' + window._QH.fmt(input) + '. How much VAT is due to HMRC?',
        answer: ans,
        steps: [
          'Identify output VAT £' + window._QH.fmt(output) + ' (on sales) and input VAT £' + window._QH.fmt(input) + ' (on purchases).',
          'VAT due = output VAT − input VAT = £' + window._QH.fmt(output) + ' − £' + window._QH.fmt(input) + ' = £' + window._QH.fmt(ans) + '.',
          'VAT due to HMRC is £' + window._QH.fmt(ans) + '.'
        ],
        exp: 'VAT due = output − input = £' + window._QH.fmt(output) + ' − £' + window._QH.fmt(input) + ' = £' + window._QH.fmt(ans) + '.'
      };
    } },

  { id: 'pobc-num-002', topic: 'pobc', difficulty: 'easy', type: 'numeric', unit: '£',
    generate: function () {
      const credits = window._QH.rs(80000, 200000, 100);
      const diff = window._QH.rs(100, 1500, 50);
      const debits = credits + diff;
      return {
        q: 'A trial balance shows debits of £' + window._QH.fmt(debits) + ' and credits of £' + window._QH.fmt(credits) + '. What is the suspense account balance required to make it agree?',
        answer: diff,
        steps: [
          'Difference = debits − credits = £' + window._QH.fmt(debits) + ' − £' + window._QH.fmt(credits) + ' = £' + window._QH.fmt(diff) + '.',
          'Debits exceed credits, so a credit entry of £' + window._QH.fmt(diff) + ' is needed in the suspense account.',
          'The suspense account balance is £' + window._QH.fmt(diff) + '.'
        ],
        exp: 'Suspense = |debits − credits| = £' + window._QH.fmt(debits) + ' − £' + window._QH.fmt(credits) + ' = £' + window._QH.fmt(diff) + ' (credit balance to make the trial balance agree).'
      };
    } },

  { id: 'pobc-num-003', topic: 'pobc', difficulty: 'medium', type: 'numeric', unit: '£',
    generate: function () {
      const opening = window._QH.rs(10000, 25000, 500);
      const purchases = window._QH.rs(30000, 70000, 500);
      const payments = window._QH.rs(25000, Math.min(60000, purchases + opening - 5000), 500);
      const returns = window._QH.rs(500, 2500, 100);
      const contras = window._QH.rs(300, 1500, 100);
      const ans = opening + purchases - payments - returns - contras;
      return {
        q: 'PLCA: opening balance £' + window._QH.fmt(opening) + ' Cr, credit purchases £' + window._QH.fmt(purchases) + ', payments to suppliers £' + window._QH.fmt(payments) + ', returns to suppliers £' + window._QH.fmt(returns) + ', contras £' + window._QH.fmt(contras) + '. What is the closing balance?',
        answer: ans,
        steps: [
          'Opening balance + credit purchases = £' + window._QH.fmt(opening) + ' + £' + window._QH.fmt(purchases) + ' = £' + window._QH.fmt(opening + purchases) + '.',
          'Total deductions = payments + returns + contras = £' + window._QH.fmt(payments) + ' + £' + window._QH.fmt(returns) + ' + £' + window._QH.fmt(contras) + ' = £' + window._QH.fmt(payments + returns + contras) + '.',
          'Closing PLCA = £' + window._QH.fmt(opening + purchases) + ' − £' + window._QH.fmt(payments + returns + contras) + ' = £' + window._QH.fmt(ans) + ' Cr.'
        ],
        exp: 'Closing PLCA = ' + window._QH.fmt(opening) + ' + ' + window._QH.fmt(purchases) + ' − ' + window._QH.fmt(payments) + ' − ' + window._QH.fmt(returns) + ' − ' + window._QH.fmt(contras) + ' = £' + window._QH.fmt(ans) + ' Cr.'
      };
    } },

  { id: 'pobc-num-004', topic: 'pobc', difficulty: 'medium', type: 'numeric', unit: '£',
    generate: function () {
      const cb = window._QH.rs(3000, 9000, 100);
      const unpresented = window._QH.rs(500, 2000, 50);
      const lodgements = window._QH.rs(800, 2500, 50);
      const ans = cb + unpresented - lodgements;
      return {
        q: 'Bank reconciliation: cash book balance £' + window._QH.fmt(cb) + ' Dr, unpresented cheques £' + window._QH.fmt(unpresented) + ', outstanding lodgements £' + window._QH.fmt(lodgements) + '. What is the bank statement balance?',
        answer: ans,
        steps: [
          'Add unpresented cheques to the cash book balance: £' + window._QH.fmt(cb) + ' + £' + window._QH.fmt(unpresented) + ' = £' + window._QH.fmt(cb + unpresented) + '.',
          'Deduct outstanding lodgements: £' + window._QH.fmt(cb + unpresented) + ' − £' + window._QH.fmt(lodgements) + ' = £' + window._QH.fmt(ans) + '.',
          'The bank statement balance is £' + window._QH.fmt(ans) + '.'
        ],
        exp: 'Bank statement = cash book + unpresented − outstanding lodgements = £' + window._QH.fmt(cb) + ' + £' + window._QH.fmt(unpresented) + ' − £' + window._QH.fmt(lodgements) + ' = £' + window._QH.fmt(ans) + '.'
      };
    } },

  { id: 'pobc-num-005', topic: 'pobc', difficulty: 'hard', type: 'numeric', unit: '£', tolerance: 0.10,
    generate: function () {
      const salary = window._QH.rs(20000, 60000, 1000);
      const threshold = 5000;
      const rate = 0.15;
      const taxable = salary - threshold;
      const ans = window._QH.round2(taxable * rate);
      return {
        q: 'An employee earns £' + window._QH.fmt(salary) + ' per year. Employer NIC is 15% on earnings above the £' + window._QH.fmt(threshold) + ' secondary threshold. What is the annual employer NIC?',
        answer: ans,
        steps: [
          'Earnings above the secondary threshold = £' + window._QH.fmt(salary) + ' − £' + window._QH.fmt(threshold) + ' = £' + window._QH.fmt(taxable) + '.',
          'Employer NIC = £' + window._QH.fmt(taxable) + ' × 15% = £' + window._QH.fmt(ans) + '.',
          'The annual employer NIC is £' + window._QH.fmt(ans) + '.'
        ],
        exp: 'Employer NIC = (£' + window._QH.fmt(salary) + ' − £' + window._QH.fmt(threshold) + ') × 15% = £' + window._QH.fmt(taxable) + ' × 0.15 = £' + window._QH.fmt(ans) + '.'
      };
    } },

  { id: 'pobc-num-006', topic: 'pobc', difficulty: 'medium', type: 'numeric', unit: '£',
    generate: function () {
      const net = window._QH.rs(1500, 3500, 50);
      const paye = window._QH.rs(150, 550, 10);
      const nic = window._QH.rs(120, 320, 10);
      const ans = net + paye + nic;
      return {
        q: 'An employee has net pay of £' + window._QH.fmt(net) + ' after PAYE of £' + window._QH.fmt(paye) + ' and employee NIC of £' + window._QH.fmt(nic) + '. What is the gross pay?',
        answer: ans,
        steps: [
          'Total deductions = PAYE + employee NIC = £' + window._QH.fmt(paye) + ' + £' + window._QH.fmt(nic) + ' = £' + window._QH.fmt(paye + nic) + '.',
          'Gross pay = net pay + deductions = £' + window._QH.fmt(net) + ' + £' + window._QH.fmt(paye + nic) + ' = £' + window._QH.fmt(ans) + '.',
          'Gross pay is £' + window._QH.fmt(ans) + '.'
        ],
        exp: 'Gross pay = net + deductions = £' + window._QH.fmt(net) + ' + £' + window._QH.fmt(paye) + ' + £' + window._QH.fmt(nic) + ' = £' + window._QH.fmt(ans) + '.'
      };
    } },


  /* -- PRINCIPLES OF COSTING (POC) -- */
  { id: 'poc-num-001', topic: 'poc', difficulty: 'easy', type: 'numeric', unit: '£',
    generate: function () {
      const fc = window._QH.rs(4000, 25000, 500);
      const vc = window._QH.r(2, 12);
      const units = window._QH.rs(500, 3000, 100);
      const ans = fc + vc * units;
      return {
        q: 'Fixed costs are £' + window._QH.fmt(fc) + ' and variable cost is £' + vc + ' per unit. What is the total cost when ' + window._QH.fmt(units) + ' units are produced?',
        answer: ans,
        steps: [
          'Total variable cost = £' + vc + ' × ' + window._QH.fmt(units) + ' units = £' + window._QH.fmt(vc * units) + '.',
          'Total cost = fixed costs + variable costs = £' + window._QH.fmt(fc) + ' + £' + window._QH.fmt(vc * units) + ' = £' + window._QH.fmt(ans) + '.',
          'Total cost is £' + window._QH.fmt(ans) + '.'
        ],
        exp: 'Total cost = FC + (VC × units) = £' + window._QH.fmt(fc) + ' + (£' + vc + ' × ' + window._QH.fmt(units) + ') = £' + window._QH.fmt(fc) + ' + £' + window._QH.fmt(vc * units) + ' = £' + window._QH.fmt(ans) + '.'
      };
    } },

  { id: 'poc-num-002', topic: 'poc', difficulty: 'easy', type: 'numeric', unit: '£', tolerance: 0.01,
    generate: function () {
      const perUnit = window._QH.pick([4, 5, 6, 7, 8, 10, 12, 15]);
      const units = window._QH.pick([500, 1000, 2000, 3000, 4000, 5000, 6000, 8000, 10000]);
      const total = perUnit * units;
      return {
        q: 'Total cost is £' + window._QH.fmt(total) + ' for ' + window._QH.fmt(units) + ' units. What is the average cost per unit?',
        answer: perUnit,
        steps: [
          'Average cost = total cost ÷ number of units = £' + window._QH.fmt(total) + ' ÷ ' + window._QH.fmt(units) + ' = £' + perUnit + '.',
          'The average cost per unit is £' + perUnit + '.'
        ],
        exp: '£' + window._QH.fmt(total) + ' ÷ ' + window._QH.fmt(units) + ' = £' + perUnit + ' per unit.'
      };
    } },

  { id: 'poc-num-003', topic: 'poc', difficulty: 'easy', type: 'numeric', unit: '£',
    generate: function () {
      const vc = window._QH.r(5, 30);
      const sp = vc + window._QH.r(3, 20);
      const ans = sp - vc;
      return {
        q: 'Selling price is £' + sp + ' per unit and variable cost is £' + vc + ' per unit. What is the contribution per unit?',
        answer: ans,
        steps: [
          'Contribution per unit = selling price − variable cost = £' + sp + ' − £' + vc + ' = £' + ans + '.',
          'The contribution per unit is £' + ans + '.'
        ],
        exp: 'Contribution = selling price − variable cost = £' + sp + ' − £' + vc + ' = £' + ans + ' per unit.'
      };
    } },

  { id: 'poc-num-004', topic: 'poc', difficulty: 'medium', type: 'numeric', unit: '£',
    generate: function () {
      const rate = window._QH.pick([3, 4, 5, 6, 7, 8, 10, 12, 15]);
      const hours = window._QH.rs(8000, 30000, 1000);
      const overheads = rate * hours;
      return {
        q: 'Budgeted overheads are £' + window._QH.fmt(overheads) + ' and budgeted labour hours are ' + window._QH.fmt(hours) + '. What is the overhead absorption rate per labour hour?',
        answer: rate,
        steps: [
          'OAR = budgeted overheads ÷ budgeted labour hours.',
          'OAR = £' + window._QH.fmt(overheads) + ' ÷ ' + window._QH.fmt(hours) + ' = £' + rate + '.',
          'The overhead absorption rate is £' + rate + ' per labour hour.'
        ],
        exp: 'OAR = budgeted overheads ÷ budgeted activity = £' + window._QH.fmt(overheads) + ' ÷ ' + window._QH.fmt(hours) + ' = £' + rate + ' per hour.'
      };
    } },

  { id: 'poc-num-005', topic: 'poc', difficulty: 'medium', type: 'numeric', unit: '£',
    generate: function () {
      const oar = window._QH.r(3, 12);
      const hours = window._QH.rs(8000, 30000, 500);
      const ans = oar * hours;
      return {
        q: 'OAR is £' + oar + ' per hour. Actual labour hours worked are ' + window._QH.fmt(hours) + '. How much overhead was absorbed?',
        answer: ans,
        steps: [
          'Overhead absorbed = OAR × actual hours = £' + oar + ' × ' + window._QH.fmt(hours) + ' = £' + window._QH.fmt(ans) + '.',
          'The overhead absorbed is £' + window._QH.fmt(ans) + '.'
        ],
        exp: 'Absorbed = OAR × actual hours = £' + oar + ' × ' + window._QH.fmt(hours) + ' = £' + window._QH.fmt(ans) + '.'
      };
    } },

  { id: 'poc-num-006', topic: 'poc', difficulty: 'medium', type: 'numeric', unit: '£',
    generate: function () {
      const absorbed = window._QH.rs(80000, 200000, 1000);
      const diff = window._QH.rs(2000, 12000, 500);
      const actual = absorbed + diff;
      return {
        q: 'Absorbed overheads are £' + window._QH.fmt(absorbed) + '; actual overheads are £' + window._QH.fmt(actual) + '. What is the under-absorption?',
        answer: diff,
        steps: [
          'Compare actual overheads £' + window._QH.fmt(actual) + ' with absorbed overheads £' + window._QH.fmt(absorbed) + '.',
          'Under-absorption = actual − absorbed = £' + window._QH.fmt(actual) + ' − £' + window._QH.fmt(absorbed) + ' = £' + window._QH.fmt(diff) + '.',
          'The under-absorption is £' + window._QH.fmt(diff) + '.'
        ],
        exp: 'Under-absorption = actual − absorbed = £' + window._QH.fmt(actual) + ' − £' + window._QH.fmt(absorbed) + ' = £' + window._QH.fmt(diff) + '.'
      };
    } },

  { id: 'poc-num-007', topic: 'poc', difficulty: 'medium', type: 'numeric',
    generate: function () {
      const contrib = window._QH.pick([4, 5, 6, 8, 10, 12]);
      const beUnits = window._QH.rs(1500, 6000, 500);
      const fc = contrib * beUnits;
      return {
        q: 'Fixed costs are £' + window._QH.fmt(fc) + ' and contribution per unit is £' + contrib + '. What is the break-even point in units?',
        answer: beUnits,
        steps: [
          'Break-even units = fixed costs ÷ contribution per unit.',
          'Break-even = £' + window._QH.fmt(fc) + ' ÷ £' + contrib + ' = ' + window._QH.fmt(beUnits) + '.',
          'The break-even point is ' + window._QH.fmt(beUnits) + ' units.'
        ],
        exp: 'Break-even units = fixed costs ÷ contribution per unit = £' + window._QH.fmt(fc) + ' ÷ £' + contrib + ' = ' + window._QH.fmt(beUnits) + ' units.'
      };
    } },

  { id: 'poc-num-008', topic: 'poc', difficulty: 'hard', type: 'numeric',
    generate: function () {
      const beUnits = window._QH.rs(2000, 5000, 250);
      const margin = window._QH.rs(500, 3000, 250);
      const budgeted = beUnits + margin;
      return {
        q: 'Budgeted sales are ' + window._QH.fmt(budgeted) + ' units and break-even is ' + window._QH.fmt(beUnits) + ' units. What is the margin of safety in units?',
        answer: margin,
        steps: [
          'Margin of safety = budgeted sales − break-even sales.',
          'Margin of safety = ' + window._QH.fmt(budgeted) + ' − ' + window._QH.fmt(beUnits) + ' = ' + window._QH.fmt(margin) + '.',
          'The margin of safety is ' + window._QH.fmt(margin) + ' units.'
        ],
        exp: 'Margin of safety = budgeted − break-even = ' + window._QH.fmt(budgeted) + ' − ' + window._QH.fmt(beUnits) + ' = ' + window._QH.fmt(margin) + ' units.'
      };
    } },

  { id: 'poc-num-009', topic: 'poc', difficulty: 'hard', type: 'numeric',
    generate: function () {
      const contrib = window._QH.pick([4, 5, 6, 8, 10]);
      const reqUnits = window._QH.rs(3000, 8000, 500);
      const fc = window._QH.rs(8000, 30000, 1000);
      let targetProfit = contrib * reqUnits - fc;
      if (targetProfit <= 1000) {
        const safeFc = Math.max(4000, contrib * reqUnits - window._QH.rs(8000, 20000, 1000));
        targetProfit = contrib * reqUnits - safeFc;
        return {
          q: 'Fixed costs £' + window._QH.fmt(safeFc) + ', contribution per unit £' + contrib + '. How many units must be sold to achieve a target profit of £' + window._QH.fmt(targetProfit) + '?',
          answer: reqUnits,
          steps: [
            'Add target profit to fixed costs: £' + window._QH.fmt(safeFc) + ' + £' + window._QH.fmt(targetProfit) + ' = £' + window._QH.fmt(safeFc + targetProfit) + '.',
            'Divide by contribution per unit: £' + window._QH.fmt(safeFc + targetProfit) + ' ÷ £' + contrib + ' = ' + window._QH.fmt(reqUnits) + '.',
            'The business must sell ' + window._QH.fmt(reqUnits) + ' units.'
          ],
          exp: 'Required units = (fixed costs + target profit) ÷ contribution per unit = (£' + window._QH.fmt(safeFc) + ' + £' + window._QH.fmt(targetProfit) + ') ÷ £' + contrib + ' = ' + window._QH.fmt(reqUnits) + ' units.'
        };
      }
      return {
        q: 'Fixed costs £' + window._QH.fmt(fc) + ', contribution per unit £' + contrib + '. How many units must be sold to achieve a target profit of £' + window._QH.fmt(targetProfit) + '?',
        answer: reqUnits,
        steps: [
          'Add target profit to fixed costs: £' + window._QH.fmt(fc) + ' + £' + window._QH.fmt(targetProfit) + ' = £' + window._QH.fmt(fc + targetProfit) + '.',
          'Divide by contribution per unit: £' + window._QH.fmt(fc + targetProfit) + ' ÷ £' + contrib + ' = ' + window._QH.fmt(reqUnits) + '.',
          'The business must sell ' + window._QH.fmt(reqUnits) + ' units.'
        ],
        exp: 'Required units = (fixed costs + target profit) ÷ contribution per unit = (£' + window._QH.fmt(fc) + ' + £' + window._QH.fmt(targetProfit) + ') ÷ £' + contrib + ' = ' + window._QH.fmt(reqUnits) + ' units.'
      };
    } },

  { id: 'poc-num-010', topic: 'poc', difficulty: 'hard', type: 'numeric', unit: '£',
    generate: function () {
      const openingUnits = window._QH.rs(80, 200, 20);
      const p1 = window._QH.r(3, 6);
      const purchaseUnits = window._QH.rs(150, 350, 50);
      const p2 = p1 + window._QH.r(1, 3);
      const minSell = openingUnits + 50;
      const maxSell = openingUnits + purchaseUnits - 30;
      const sold = window._QH.rs(minSell, maxSell, 10);
      const fromPurchases = sold - openingUnits;
      const closingUnits = purchaseUnits - fromPurchases;
      const ans = closingUnits * p2;
      return {
        q: 'FIFO: opening inventory ' + openingUnits + ' units at £' + p1 + '. Buy ' + purchaseUnits + ' at £' + p2 + '. Sell ' + sold + '. What is the closing inventory value?',
        answer: ans,
        steps: [
          'FIFO sells oldest stock first: all ' + openingUnits + ' opening units at £' + p1 + ' are sold, plus ' + fromPurchases + ' units from the purchase at £' + p2 + ' (total sold = ' + sold + ').',
          'Closing inventory = ' + purchaseUnits + ' − ' + fromPurchases + ' = ' + closingUnits + ' units, all from the purchase at £' + p2 + '.',
          'Closing inventory value = ' + closingUnits + ' × £' + p2 + ' = £' + window._QH.fmt(ans) + '.'
        ],
        exp: 'FIFO sells oldest first. ' + openingUnits + ' opening @ £' + p1 + ' + ' + fromPurchases + ' newer @ £' + p2 + ' = ' + sold + ' sold. Closing = ' + closingUnits + ' units × £' + p2 + ' = £' + window._QH.fmt(ans) + '.'
      };
    } },


  /* -- THE BUSINESS ENVIRONMENT (BESY) -- */
  { id: 'besy-num-001', topic: 'besy', difficulty: 'easy', type: 'numeric', unit: '%', tolerance: 0.05,
    generate: function () {
      const base = window._QH.pick([100, 102, 104, 105, 108, 110, 112, 115, 118, 120]);
      const rise = window._QH.r(2, 12);
      const newIdx = base + rise;
      const ans = window._QH.round2((rise / base) * 100);
      return {
        q: 'CPI rises from ' + base + ' to ' + newIdx + ' over the year. What is the rate of inflation (in %)?',
        answer: ans,
        steps: [
          'Rise in the index = ' + newIdx + ' − ' + base + ' = ' + rise + ' points.',
          'Inflation = rise ÷ original index × 100 = ' + rise + ' ÷ ' + base + ' × 100 = ' + ans + '%.',
          'The rate of inflation is ' + ans + '%.'
        ],
        exp: 'Inflation = (' + newIdx + ' − ' + base + ') ÷ ' + base + ' × 100 = ' + ans + '%.'
      };
    } },

  { id: 'besy-num-002', topic: 'besy', difficulty: 'easy', type: 'numeric', unit: '$', tolerance: 0.05,
    generate: function () {
      const rate = window._QH.pick([1.10, 1.15, 1.20, 1.22, 1.25, 1.28, 1.30, 1.35, 1.40]);
      const gbp = window._QH.rs(50, 1000, 50);
      const ans = window._QH.round2(gbp * rate);
      return {
        q: 'The exchange rate is £1 = $' + rate.toFixed(2) + '. How many dollars do you receive for £' + window._QH.fmt(gbp) + '?',
        answer: ans,
        steps: [
          'Each £1 buys $' + rate.toFixed(2) + ', so multiply the pounds by the exchange rate.',
          '£' + window._QH.fmt(gbp) + ' × ' + rate.toFixed(2) + ' = $' + window._QH.fmt(ans) + '.',
          'You receive $' + window._QH.fmt(ans) + '.'
        ],
        exp: '£' + window._QH.fmt(gbp) + ' × ' + rate.toFixed(2) + ' = $' + window._QH.fmt(ans) + '.'
      };
    } },

  { id: 'besy-num-003', topic: 'besy', difficulty: 'medium', type: 'numeric', tolerance: 0.05,
    generate: function () {
      const incomePct = window._QH.pick([4, 5, 8, 10, 12]);
      const factor = window._QH.pick([1.5, 2, 2.5, 3]);
      const demandPct = window._QH.round2(incomePct * factor);
      const ans = factor;
      return {
        q: 'Income rises ' + incomePct + '% and demand for a good rises ' + demandPct + '%. What is the income elasticity of demand?',
        answer: ans,
        steps: [
          'Income elasticity of demand = % change in demand ÷ % change in income.',
          'IED = ' + demandPct + '% ÷ ' + incomePct + '% = ' + ans + '.',
          'The income elasticity of demand is ' + ans + '.'
        ],
        exp: 'IED = % change in demand ÷ % change in income = ' + demandPct + '% ÷ ' + incomePct + '% = ' + ans + (ans > 1 ? ' (luxury good)' : ' (normal/necessity)') + '.'
      };
    } },

  { id: 'besy-num-004', topic: 'besy', difficulty: 'medium', type: 'numeric', tolerance: 0.05,
    generate: function () {
      const pricePct = window._QH.pick([4, 5, 8, 10]);
      const factor = window._QH.pick([0.6, 0.8, 1.2, 1.5, 1.6, 2]);
      const demandPct = window._QH.round2(pricePct * factor);
      const ans = factor;
      return {
        q: 'Price rises ' + pricePct + '% and demand falls ' + demandPct + '%. What is the price elasticity of demand (absolute value)?',
        answer: ans,
        steps: [
          'Price elasticity of demand = % change in demand ÷ % change in price (ignore the sign).',
          'PED = ' + demandPct + '% ÷ ' + pricePct + '% = ' + ans + '.',
          'The price elasticity of demand is ' + ans + '.'
        ],
        exp: 'PED = |% change in demand ÷ % change in price| = ' + demandPct + '% ÷ ' + pricePct + '% = ' + ans + (ans > 1 ? ' (price-elastic)' : ' (price-inelastic)') + '.'
      };
    } },

  { id: 'besy-num-005', topic: 'besy', difficulty: 'hard', type: 'numeric', unit: '£',
    generate: function () {
      const oldUnits = window._QH.rs(500, 2000, 100);
      const oldPrice = window._QH.r(15, 30);
      const priceRise = window._QH.pick([2, 3, 4, 5]);
      const newPrice = oldPrice + priceRise;
      const fallPct = window._QH.pick([5, 10, 12, 15, 20, 25]);
      const newUnits = Math.round(oldUnits * (100 - fallPct) / 100 / 10) * 10;
      const oldRev = oldUnits * oldPrice;
      const newRev = newUnits * newPrice;
      const ans = newRev - oldRev;
      return {
        q: 'A firm sells ' + window._QH.fmt(oldUnits) + ' units at £' + oldPrice + ' each. It raises the price to £' + newPrice + ' and sales fall to ' + window._QH.fmt(newUnits) + ' units. What is the change in total revenue?',
        answer: ans,
        steps: [
          'Old revenue = ' + window._QH.fmt(oldUnits) + ' × £' + oldPrice + ' = £' + window._QH.fmt(oldRev) + '.',
          'New revenue = ' + window._QH.fmt(newUnits) + ' × £' + newPrice + ' = £' + window._QH.fmt(newRev) + '.',
          'Change in revenue = new − old = £' + window._QH.fmt(newRev) + ' − £' + window._QH.fmt(oldRev) + ' = £' + window._QH.fmt(ans) + (ans < 0 ? ' (revenue falls)' : ' (revenue rises)') + '.'
        ],
        exp: 'Old revenue = ' + window._QH.fmt(oldUnits) + ' × £' + oldPrice + ' = £' + window._QH.fmt(oldRev) + '. New revenue = ' + window._QH.fmt(newUnits) + ' × £' + newPrice + ' = £' + window._QH.fmt(newRev) + '. Change = £' + window._QH.fmt(newRev) + ' − £' + window._QH.fmt(oldRev) + ' = £' + window._QH.fmt(ans) + (ans < 0 ? ' (revenue falls)' : ' (revenue rises)') + '.'
      };
    } },

  { id: 'besy-num-006', topic: 'besy', difficulty: 'easy', type: 'numeric', unit: '£', tolerance: 0.05,
    generate: function () {
      // UK National Minimum/Living Wage rates from April 2026
      const rate = window._QH.pick([8.00, 10.85, 12.71]);
      const hours = window._QH.r(20, 40);
      const ans = window._QH.round2(hours * rate);
      return {
        q: 'An employee works ' + hours + ' hours a week at the National Minimum/Living Wage of £' + rate.toFixed(2) + ' per hour. What is the weekly gross pay?',
        answer: ans,
        steps: [
          'Weekly gross pay = hours worked × hourly rate = ' + hours + ' × £' + rate.toFixed(2) + ' = £' + window._QH.fmt(ans) + '.',
          'The weekly gross pay is £' + window._QH.fmt(ans) + '.'
        ],
        exp: hours + ' × £' + rate.toFixed(2) + ' = £' + window._QH.fmt(ans) + '.'
      };
    } }

);


/* -- GLOSSARY -- */
window.GLOSSARY = [
  { term: 'Asset', def: 'Something the business owns or is owed — bank, inventory, equipment, money due from customers.' },
  { term: 'Liability', def: 'An amount the business owes to someone else — trade payables, a bank loan, VAT due to HMRC.' },
  { term: 'Capital', def: 'The owner\'s stake in the business: what they put in, plus retained profit, less drawings.' },
  { term: 'Drawings', def: 'Value taken out of the business by the owner for personal use. It reduces capital and is never an expense.' },
  { term: 'Accounting equation', def: 'Assets = Capital + Liabilities. Everything the business holds was funded either by the owner or by someone else.' },
  { term: 'Debit', def: 'An entry on the left-hand side of an account. Increases assets, expenses and drawings.' },
  { term: 'Credit', def: 'An entry on the right-hand side of an account. Increases liabilities, income and capital.' },
  { term: 'DEAD CLIC', def: 'Mnemonic for the debit/credit rules: Debits — Expenses, Assets, Drawings; Credits — Liabilities, Income, Capital.' },
  { term: 'Dual effect', def: 'The principle that every transaction affects at least two accounts by equal and opposite amounts.' },
  { term: 'Ledger account', def: 'The record holding every entry for one account, traditionally drawn as a T with debits left and credits right.' },
  { term: 'General ledger', def: 'The ledger containing every account needed for the trial balance. This is where double entry happens.' },
  { term: 'Sales ledger', def: 'A memorandum ledger holding one account per credit customer. It sits outside the double entry.' },
  { term: 'Purchases ledger', def: 'A memorandum ledger holding one account per credit supplier. It sits outside the double entry.' },
  { term: 'Book of prime entry', def: 'The first record a transaction enters before posting to the ledgers — day books, cash book and journal.' },
  { term: 'Day book', def: 'A listing of one type of document before posting: sales, purchases, sales returns or purchases returns.' },
  { term: 'Journal', def: 'The book of prime entry for non-routine items: corrections, adjustments, opening balances and payroll.' },
  { term: 'Narrative', def: 'The explanation accompanying a journal entry, recording why the entry was made.' },
  { term: 'Source document', def: 'Evidence that a transaction occurred and for how much — invoice, credit note, goods received note.' },
  { term: 'Purchase order', def: 'A document sent by a buyer to a supplier requesting goods at an agreed price.' },
  { term: 'Goods received note (GRN)', def: 'An internal document confirming that goods arrived and were checked against the order.' },
  { term: 'Delivery note', def: 'A document accompanying goods on delivery, listing what has been sent.' },
  { term: 'Invoice', def: 'A document issued by a seller requesting payment for goods or services supplied.' },
  { term: 'Credit note', def: 'A document issued by a seller reducing the amount a customer owes, typically for returns or overcharges.' },
  { term: 'Remittance advice', def: 'A document sent by a buyer telling the supplier which invoices a payment covers.' },
  { term: 'Statement of account', def: 'A summary sent by a supplier listing the period\'s transactions and the closing balance.' },
  { term: 'Three-way match', def: 'The control of checking a purchase invoice against the purchase order and the goods received note before authorising payment.' },
  { term: 'Trade discount', def: 'A reduction from list price given at the point of sale. Deducted before VAT is calculated.' },
  { term: 'Settlement discount', def: 'A reduction offered for paying within a stated period. Also called a prompt payment or cash discount.' },
  { term: 'Bulk discount', def: 'A reduction given for ordering above a stated quantity.' },
  { term: 'Output VAT', def: 'VAT charged by a business on the goods and services it sells.' },
  { term: 'Input VAT', def: 'VAT incurred by a business on the goods and services it buys, reclaimable if VAT registered.' },
  { term: 'Net amount', def: 'The value of goods or services before VAT is added.' },
  { term: 'Gross amount', def: 'The value of goods or services including VAT.' },
  { term: 'Cash book', def: 'The record of money received into and paid out of bank and cash. It is both a book of prime entry and part of the ledger.' },
  { term: 'Petty cash', def: 'A small cash float used for minor expenses, usually operated on the imprest system.' },
  { term: 'Contra entry', def: 'An entry offsetting two accounts — either a cash/bank transfer, or a customer who is also a supplier.' },
  { term: 'Balance carried down (c/d)', def: 'The figure inserted on the smaller side of an account to make both sides total the same.' },
  { term: 'Balance brought down (b/d)', def: 'The balance carried down, brought back in below the totals on the opposite side. This is the account\'s balance.' },
  { term: 'Accrual', def: 'An expense incurred in the period but not yet invoiced or paid.' },
  { term: 'Prepayment', def: 'An expense paid in advance of the period to which it relates.' },
  { term: 'Depreciation', def: 'The systematic allocation of the cost of a non-current asset over its useful life.' },
  { term: 'Carrying value', def: 'The cost of a non-current asset less the accumulated depreciation charged to date.' },
  { term: 'Straight-line depreciation', def: 'Depreciation spread evenly: (cost − residual value) ÷ useful life.' },
  { term: 'Reducing balance depreciation', def: 'Depreciation charged as a fixed percentage of the asset\'s carrying value each year.' },
  { term: 'Non-current asset', def: 'An asset held for use in the business over more than one accounting period.' },
  { term: 'Current asset', def: 'An asset expected to be converted to cash within twelve months — inventory, receivables, bank.' },
  { term: 'Inventory', def: 'Goods held for resale or for use in production, valued at the lower of cost and net realisable value.' },
  { term: 'Irrecoverable debt', def: 'A trade receivable considered uncollectable and written off as an expense.' },
  { term: 'Accruals concept', def: 'Income and expenses are recognised in the period they are earned or incurred, not when cash moves.' },
  { term: 'Prudence concept', def: 'Revenue and profits are recognised only when reasonably certain; losses are recognised as soon as anticipated.' },
  { term: 'Going concern', def: 'The assumption that the business will continue trading for the foreseeable future.' },
  { term: 'Consistency concept', def: 'The same accounting policies are applied from one period to the next so results are comparable.' },
  { term: 'Materiality', def: 'An item is material if omitting or misstating it could influence a user\'s decision.' },
  { term: 'Control account', def: 'A general ledger account holding the total of many individual accounts, checked against the sum of those accounts.' },
  { term: 'Sales ledger control account (SLCA)', def: 'The general ledger account holding the total owed by all credit customers.' },
  { term: 'Purchases ledger control account (PLCA)', def: 'The general ledger account holding the total owed to all credit suppliers.' },
  { term: 'Reconciliation', def: 'Comparing two records built by different routes and explaining any difference between them.' },
  { term: 'Unpresented cheque', def: 'A cheque written and recorded in the cash book that has not yet cleared the bank. A timing difference.' },
  { term: 'Outstanding lodgement', def: 'A deposit recorded in the cash book that the bank has not yet credited. A timing difference.' },
  { term: 'Timing difference', def: 'An item correctly recorded in the cash book that the bank has not yet processed, or vice versa.' },
  { term: 'Dishonoured cheque', def: 'A cheque paid in but returned unpaid by the bank, reinstating the amount owed by the customer.' },
  { term: 'Standing order', def: 'A regular fixed payment made by the bank on the business\'s instruction.' },
  { term: 'Direct debit', def: 'A payment collected from the business\'s account by a third party under an authorised mandate.' },
  { term: 'Error of omission', def: 'A transaction never recorded at all. The trial balance still agrees.' },
  { term: 'Error of original entry', def: 'The wrong amount used on both sides of the entry. The trial balance still agrees.' },
  { term: 'Error of reversal', def: 'Debit and credit posted the wrong way round. Correcting it needs twice the original amount.' },
  { term: 'Compensating error', def: 'Two separate errors that happen to cancel each other out exactly.' },
  { term: 'Transposition error', def: 'Digits recorded in the wrong order — £540 written as £450. Detectable if it affects one side only.' },
  { term: 'Segregation of duties', def: 'Splitting a task so no single person can both cause an error or fraud and conceal it.' },
  { term: 'Internal control', def: 'Any routine designed to prevent errors and fraud, or to detect them once they have occurred.' },
  { term: 'Audit trail', def: 'The ability to trace any accounting entry back to its source document and to the person who made it.' },
  { term: 'Gross pay', def: 'An employee\'s total pay before any deductions are made.' },
  { term: 'Net pay', def: 'Gross pay less all deductions — the amount the employee actually receives.' },
  { term: 'PAYE', def: 'Pay As You Earn: income tax deducted from wages by the employer and paid to HMRC.' },
  { term: 'Employee\'s NIC', def: 'Class 1 primary National Insurance deducted from the employee\'s gross pay.' },
  { term: 'Employer\'s NIC', def: 'Class 1 secondary National Insurance, an additional cost borne by the employer on top of gross pay.' },
  { term: 'Total employment cost', def: 'Gross pay plus employer\'s National Insurance and employer\'s pension contributions.' },
  { term: 'Cost unit', def: 'The unit of product or service for which cost is measured — one car, one meal, one patient treated.' },
  { term: 'Cost coding', def: 'Assigning a structured code to each cost so it can be analysed by cost centre and by cost type.' },
  { term: 'Direct cost', def: 'A cost that can be traced to a specific cost unit — direct materials, direct labour, direct expenses.' },
  { term: 'Indirect cost', def: 'A cost that cannot be traced to a single cost unit. Also called an overhead.' },
  { term: 'Overhead', def: 'An indirect cost — factory rent, supervision, machine depreciation — shared across cost units.' },
  { term: 'Stepped fixed cost', def: 'A cost that stays fixed over a range of activity, then jumps when a capacity threshold is crossed.' },
  { term: 'Allocation', def: 'Charging a whole overhead to the single cost centre that incurred it.' },
  { term: 'Apportionment', def: 'Sharing an overhead between several cost centres on a basis that reflects what drives the cost.' },
  { term: 'Absorption', def: 'Charging a cost centre\'s overheads into the units passing through it, using an absorption rate.' },
  { term: 'Absorption costing', def: 'A costing method that includes a share of production overhead in the cost of each unit.' },
  { term: 'Marginal costing', def: 'A costing method charging only variable costs to units; fixed costs are treated as period costs.' },
  { term: 'Under-absorption', def: 'Overhead absorbed is less than overhead incurred. Products were undercharged, so profit is reduced.' },
  { term: 'Over-absorption', def: 'Overhead absorbed exceeds overhead incurred. Products were overcharged, so profit is increased.' },
  { term: 'Contribution', def: 'Sales revenue less variable costs. What is left to cover fixed costs and then generate profit.' },
  { term: 'Contribution per unit', def: 'Selling price per unit less variable cost per unit.' },
  { term: 'Break-even point', def: 'The level of activity at which total revenue exactly equals total cost, so profit is nil.' },
  { term: 'Margin of safety', def: 'The amount by which actual or budgeted sales exceed the break-even point.' },
  { term: 'Contribution to sales (C/S) ratio', def: 'Contribution expressed as a proportion of sales revenue.' },
  { term: 'High-low method', def: 'A technique separating a semi-variable cost into its fixed and variable elements using the highest and lowest activity levels.' },
  { term: 'Limiting factor', def: 'A scarce resource that restricts the level of output a business can achieve.' },
  { term: 'Sunk cost', def: 'A cost already incurred that cannot be recovered, and is therefore irrelevant to a decision.' },
  { term: 'Relevant cost', def: 'A future cash cost that changes as a result of a decision, and is therefore relevant to it.' },
  { term: 'Reorder level', def: 'The stock balance at which a new order is triggered: maximum usage × maximum lead time.' },
  { term: 'Lead time', def: 'The time between placing an order with a supplier and receiving the goods.' },
  { term: 'Budget', def: 'A financial plan for a future period, used both to plan and as a benchmark for control.' },
  { term: 'Variance', def: 'The difference between an actual result and the budgeted or standard figure.' },
  { term: 'Favourable variance', def: 'A variance where the actual outcome is better than budget — lower cost, or higher revenue.' },
  { term: 'Adverse variance', def: 'A variance where the actual outcome is worse than budget — higher cost, or lower revenue.' },
  { term: 'Labour turnover', def: 'The rate at which employees leave the business and have to be replaced.' },
  { term: 'Common law', def: 'Law developed by judges through their decisions in individual cases, built on precedent.' },
  { term: 'Statute law', def: 'Law made by Parliament. It overrides case law wherever the two conflict.' },
  { term: 'Delegated legislation', def: 'Law made under a power granted by an Act, allowing detail to change without a new Act.' },
  { term: 'Criminal law', def: 'Law concerning offences against the state, prosecuted by the state, proved beyond reasonable doubt.' },
  { term: 'Civil law', def: 'Law governing disputes between private parties, proved on the balance of probabilities.' },
  { term: 'Offer', def: 'A definite statement of the terms on which one party is willing to contract.' },
  { term: 'Acceptance', def: 'Unqualified agreement to the exact terms of an offer. Any change creates a counter-offer.' },
  { term: 'Invitation to treat', def: 'An invitation for others to make an offer — goods on display, catalogues, most advertisements.' },
  { term: 'Counter-offer', def: 'A reply that changes a term of the offer. It destroys the original offer.' },
  { term: 'Intention to create legal relations', def: 'The requirement that parties meant to be legally bound. Presumed in business, not in social arrangements.' },
  { term: 'Express term', def: 'A term the parties actually stated, in writing or verbally.' },
  { term: 'Implied term', def: 'A term not stated but read into a contract by statute, custom or the courts.' },
  { term: 'Breach of contract', def: 'Failure to perform a contractual obligation without lawful excuse, entitling the innocent party to damages.' },
  { term: 'Damages', def: 'Money awarded to put the innocent party in the position performance would have achieved.' },
  { term: 'Separate legal personality', def: 'The principle that a company is a legal person distinct from its shareholders.' },
  { term: 'Perpetual succession', def: 'A company\'s continued existence regardless of changes in its ownership.' },
  { term: 'Unlimited liability', def: 'The owner is personally responsible for all the debts of the business, without limit.' },
  { term: 'Ordinary partnership', def: 'Two or more people trading together with unlimited, joint liability and no separate legal personality.' },
  { term: 'Limited liability partnership (LLP)', def: 'A partnership with separate legal personality, giving its members limited liability.' },
  { term: 'Private limited company (Ltd)', def: 'An incorporated company that may not offer its shares to the general public.' },
  { term: 'Public limited company (plc)', def: 'An incorporated company that may offer its shares to the public and may be stock-exchange listed.' },
  { term: 'Companies House', def: 'The registrar holding the public record of UK companies, including their annual accounts.' },
  { term: 'Charity Commission', def: 'The body that registers and regulates charities in England and Wales.' },
  { term: 'Not-for-profit organisation', def: 'An organisation existing for a social, community or member purpose rather than to enrich owners.' },
  { term: 'Corporate social responsibility (CSR)', def: 'A business\'s voluntary commitment to act in the interests of society and the environment.' },
  { term: 'Sustainability', def: 'Meeting present needs without compromising the ability of future generations to meet their own.' },
  { term: 'Triple bottom line', def: 'Measuring performance against three dimensions: people, planet and profit.' },
  { term: 'Integrity', def: 'The ethical principle of being straightforward and honest in all professional relationships.' },
  { term: 'Objectivity', def: 'The ethical principle of not letting bias, conflict of interest or undue influence override judgement.' },
  { term: 'Professional competence and due care', def: 'The ethical principle of maintaining knowledge and skill, and working carefully.' },
  { term: 'Confidentiality', def: 'The ethical principle of not disclosing information gained at work without authority or legal duty.' },
  { term: 'Professional behaviour', def: 'The ethical principle of complying with law and avoiding anything that discredits the profession.' },
  { term: 'Self-interest threat', def: 'A threat to objectivity where a financial or other interest could influence judgement.' },
  { term: 'Familiarity threat', def: 'A threat to objectivity arising from a close relationship making one too sympathetic to another\'s interests.' },
  { term: 'Money laundering', def: 'The process of disguising the proceeds of crime as legitimate funds.' },
  { term: 'Finance function', def: 'The part of an organisation that records financial information and turns it into information others can act on.' },
  { term: 'Financial accounting', def: 'Accounting directed at external users, in a regulated format, reporting on a completed period.' },
  { term: 'Management accounting', def: 'Accounting directed at internal users, in any useful format, often forward-looking. No statutory format applies.' },
  { term: 'Credit control', def: 'The function that monitors customer balances against agreed limits and pursues overdue amounts.' },
  { term: 'Credit limit', def: 'The maximum amount a customer is permitted to owe at any one time.' },
  { term: 'Internal information', def: 'Information generated by the organisation\'s own systems — day books, payroll, output records.' },
  { term: 'External information', def: 'Information from outside the organisation — interest rates, inflation data, competitor pricing.' },
  { term: 'Timeliness', def: 'The quality of information being available early enough to influence the decision it relates to.' },
  { term: 'Fiscal policy', def: 'Government policy on taxation and public spending, used to influence economic activity.' },
  { term: 'Monetary policy', def: 'Bank of England policy on interest rates and money supply, used to influence economic activity.' },
  { term: 'Gross domestic product (GDP)', def: 'The total value of goods and services produced in an economy over a period.' },
  { term: 'Recession', def: 'Conventionally, two consecutive quarters of falling gross domestic product.' },
  { term: 'Price elasticity of demand', def: 'How responsive demand is to a change in price. Above 1 is elastic; below 1 is inelastic.' },
  { term: 'Barrier to entry', def: 'An obstacle making it difficult for new competitors to enter a market.' },
  { term: 'Externality', def: 'A cost or benefit falling on third parties who are not part of the transaction.' },
  { term: 'Phishing', def: 'An attempt to deceive a person into revealing credentials or making a payment, usually by email.' },
  { term: 'Mandate fraud', def: 'A fraud in which a business is deceived into redirecting a payment to a criminal\'s bank account.' },
  { term: 'Cloud accounting', def: 'Accounting software hosted by a provider and accessed over the internet rather than installed locally.' },
  { term: 'Making Tax Digital (MTD)', def: 'The HMRC requirement for affected businesses to keep digital records and file using compatible software.' },
  { term: 'Personal data', def: 'Information relating to an identified or identifiable living individual, protected by data protection law.' },
  { term: 'Synoptic assessment', def: 'An assessment drawing on knowledge from across a qualification. At Level 2 this is The Business Environment.' },
  { term: 'Double-entry bookkeeping', def: 'Every transaction is recorded in at least two accounts — a debit in one and a credit in another of equal value.' },
  { term: 'Trade receivables', def: 'Amounts owed to the business by customers who bought on credit (debtors).' },
  { term: 'Trade payables', def: 'Amounts owed by the business to suppliers for goods or services bought on credit (creditors).' },
  { term: 'Trial balance', def: 'A list of all ledger account balances, used to check that total debits equal total credits.' },
  { term: 'Bank reconciliation', def: 'A process that compares the cash book balance with the bank statement balance to identify and explain differences.' },
  { term: 'Suspense account', def: 'A temporary account used to hold a difference in the trial balance while errors are being investigated.' },
  { term: 'Capital expenditure', def: 'Spending on long-term assets (e.g. machinery, buildings) that benefit the business for more than one accounting period.' },
  { term: 'Revenue expenditure', def: 'Day-to-day running costs (e.g. wages, rent, stationery) that are expensed in the period in which they are incurred.' },
  { term: 'VAT (Value Added Tax)', def: 'A tax collected by businesses on behalf of HMRC. Output tax (on sales) − input tax (on purchases) = amount payable to HMRC.' },
  { term: 'Imprest system', def: 'A petty cash system in which the float is restored to a fixed amount at the end of each period.' },
  { term: 'FIFO', def: 'First In, First Out — assumes the earliest inventory purchased is used or sold first.' },
  { term: 'AVCO', def: 'Average Cost — inventory is valued at a weighted average of all purchase prices.' },
  { term: 'Overhead absorption rate (OAR)', def: 'Budgeted overheads ÷ budgeted activity level. Used to charge overheads to products.' },
  { term: 'Prime cost', def: 'Direct materials + direct labour + direct expenses. The total direct cost before overheads.' },
  { term: 'Fixed cost', def: 'A cost that remains constant in total regardless of the level of output (e.g. rent).' },
  { term: 'Variable cost', def: 'A cost that varies in total in direct proportion to output, but is constant per unit (e.g. raw materials).' },
  { term: 'Semi-variable cost', def: 'A cost with both a fixed element and a variable element (e.g. a phone bill with a standing charge plus usage).' },
  { term: 'Limited liability', def: "Shareholders' financial exposure is limited to the amount they invested — personal assets are protected." },
  { term: 'Consideration', def: 'Something of value given by each party to a contract — essential for a contract to be legally binding.' },
  { term: 'Sole trader', def: 'A business owned and run by one person who has unlimited personal liability for all business debts.' },
  { term: 'Inflation', def: 'A general sustained rise in the price level of goods and services, reducing the purchasing power of money.' },
  { term: 'Stakeholder', def: 'Any person or group with an interest in a business — internal (employees, managers) or external (customers, suppliers).' },
  { term: 'Cost centre', def: 'A department or section to which costs are charged and accumulated for management control.' },
  { term: 'Profit centre', def: 'A department responsible for both generating revenue and controlling costs — its profitability is measured directly.' },
  { term: 'Error of commission', def: 'A transaction posted to the correct type of account but to the wrong specific account.' },
  { term: 'Error of principle', def: 'A transaction posted to the wrong type of account (e.g. capital expenditure treated as revenue expenditure).' },
];


/* ── NEW QUESTION TYPES (drag-drop / table-fill / scenario) ── */
window.ALL_QUESTIONS.push(

  /* === DRAG-DROP / MATCHING === */
  { id: 'dd-001', topic: 'itbk', difficulty: 'easy', type: 'dragdrop',
    q: 'Match each source document to its primary purpose.',
    pairs: [
      { left: 'Purchase order', right: 'Sent by buyer to request goods from a supplier' },
      { left: 'Goods received note', right: 'Confirms goods have been delivered and checked' },
      { left: 'Sales invoice', right: 'Requests payment from the customer' },
      { left: 'Remittance advice', right: 'Tells the supplier which invoices are being paid' },
    ],
    exp: 'These four documents track the order-to-pay cycle: PO → GRN → invoice → remittance advice on payment.' },

  { id: 'dd-003', topic: 'pobc', difficulty: 'medium', type: 'dragdrop',
    q: 'Match each type of error to its description.',
    pairs: [
      { left: 'Error of omission', right: 'Transaction completely missed' },
      { left: 'Error of commission', right: 'Posted to the wrong account of the correct type' },
      { left: 'Error of principle', right: 'Posted to the wrong type of account (e.g. capital vs revenue)' },
      { left: 'Error of original entry', right: 'Wrong figure used for both debit and credit' },
    ],
    exp: 'All four leave the trial balance balanced — they cannot be detected by the TB alone.' },

  { id: 'dd-004', topic: 'pobc', difficulty: 'medium', type: 'dragdrop',
    q: 'Match each bank-reconciliation item to its meaning.',
    pairs: [
      { left: 'Unpresented cheque', right: 'Issued by the business but not yet cleared by the bank' },
      { left: 'Outstanding lodgement', right: 'Deposited by the business but not yet on the bank statement' },
      { left: 'Direct debit not in cash book', right: 'Bank-initiated payment that must be added to the cash book' },
      { left: 'Bank charge not in cash book', right: 'Fee on the statement that reduces the cash book balance' },
    ],
    exp: 'Timing differences (cheques, lodgements) are reflected on the reconciliation; missing entries (DDs, charges) are added to the cash book first.' },

  { id: 'dd-005', topic: 'poc', difficulty: 'easy', type: 'dragdrop',
    q: 'Match each cost to its behaviour classification.',
    pairs: [
      { left: 'Factory rent', right: 'Fixed cost' },
      { left: 'Raw materials', right: 'Variable cost' },
      { left: 'Mobile phone bill (line rental + minutes)', right: 'Semi-variable cost' },
      { left: 'Supervisor salary (one extra needed every 50 staff)', right: 'Step cost' },
    ],
    exp: 'Cost behaviour: fixed (constant in total), variable (proportional to output), semi-variable (mixed), step (jumps at thresholds).' },

  { id: 'dd-006', topic: 'poc', difficulty: 'medium', type: 'dragdrop',
    q: 'Match each costing term to its formula.',
    pairs: [
      { left: 'Prime cost', right: 'Direct materials + Direct labour + Direct expenses' },
      { left: 'Contribution per unit', right: 'Selling price − Variable cost' },
      { left: 'Break-even units', right: 'Fixed costs ÷ Contribution per unit' },
      { left: 'Margin of safety (units)', right: 'Budgeted sales − Break-even sales' },
    ],
    exp: 'These four are the AAT Level 2 costing formulas most often examined.' },

  { id: 'dd-007', topic: 'besy', difficulty: 'easy', type: 'dragdrop',
    q: 'Match each business structure to its liability characteristic.',
    pairs: [
      { left: 'Sole trader', right: 'Unlimited personal liability' },
      { left: 'General partnership', right: 'Joint and several unlimited liability for partners' },
      { left: 'Private limited company (Ltd)', right: 'Limited liability — shares not offered to the public' },
      { left: 'Public limited company (PLC)', right: 'Limited liability — shares may be offered to the public' },
    ],
    exp: 'Incorporation creates a separate legal entity and limits the owners’ liability to the amount paid (or agreed to be paid) for shares.' },

  { id: 'dd-008', topic: 'besy', difficulty: 'medium', type: 'dragdrop',
    q: 'Match each piece of legislation to what it primarily governs.',
    pairs: [
      { left: 'Consumer Rights Act 2015', right: 'Goods must be of satisfactory quality and fit for purpose' },
      { left: 'Equality Act 2010', right: 'Protects nine protected characteristics from discrimination' },
      { left: 'UK GDPR / Data Protection Act 2018', right: 'Lawful handling of personal data' },
      { left: 'National Minimum Wage Act 1998', right: 'Sets minimum hourly pay by age band' },
    ],
    exp: 'These four are the most-tested pieces of UK legislation in the Business Environment paper.' },

  /* === TABLE-COMPLETION === */
  { id: 'tf-001', topic: 'pobc', difficulty: 'medium', type: 'tablefill',
    q: 'Complete the sales ledger control account (SLCA) by calculating the missing balance.',
    table: {
      title: 'Sales ledger control account',
      columns: ['Debit entries', '£', 'Credit entries', '£'],
      rows: [
        ['Opening balance b/d', '12,000', 'Bank (cash received)', '45,000'],
        ['Credit sales', '58,000', 'Sales returns', '2,000'],
        ['', '', 'Closing balance c/d', '?'],
      ],
      blanks: [{ row: 2, col: 3, answer: 23000 }]
    },
    exp: 'Total Dr (12,000 + 58,000) = 70,000. Total Cr to balance = 70,000. Less 45,000 + 2,000 = 23,000 closing balance.' },

  { id: 'tf-002', topic: 'pobc', difficulty: 'medium', type: 'tablefill',
    q: 'Complete the purchases ledger control account (PLCA) by calculating the missing balance.',
    table: {
      title: 'Purchases ledger control account',
      columns: ['Debit entries', '£', 'Credit entries', '£'],
      rows: [
        ['Bank (paid to suppliers)', '38,000', 'Opening balance b/d', '15,000'],
        ['Purchases returns', '1,500', 'Credit purchases', '44,000'],
        ['Closing balance c/d', '?', '', ''],
      ],
      blanks: [{ row: 2, col: 1, answer: 19500 }]
    },
    exp: 'Total Cr (15,000 + 44,000) = 59,000. Total Dr to balance = 59,000. Less 38,000 + 1,500 = 19,500 closing balance.' },

  { id: 'tf-003', topic: 'itbk', difficulty: 'medium', type: 'tablefill',
    q: 'Complete the VAT calculation for these three invoices (VAT at 20%).',
    table: {
      title: 'Invoice analysis',
      columns: ['Invoice', 'Net £', 'VAT £', 'Gross £'],
      rows: [
        ['001', '400', '?', '?'],
        ['002', '750', '?', '?'],
        ['003', '1,250', '?', '?'],
      ],
      blanks: [
        { row: 0, col: 2, answer: 80 }, { row: 0, col: 3, answer: 480 },
        { row: 1, col: 2, answer: 150 }, { row: 1, col: 3, answer: 900 },
        { row: 2, col: 2, answer: 250 }, { row: 2, col: 3, answer: 1500 },
      ]
    },
    exp: 'VAT = Net × 20%; Gross = Net + VAT. So 400×20% = 80, gross 480; 750×20% = 150, gross 900; 1,250×20% = 250, gross 1,500.' },

  { id: 'tf-004', topic: 'poc', difficulty: 'medium', type: 'tablefill',
    q: 'Complete the cost of sales calculation.',
    table: {
      title: 'Cost of sales',
      columns: ['Item', '£'],
      rows: [
        ['Opening inventory', '8,000'],
        ['Add: Purchases', '42,000'],
        ['Less: Closing inventory', '6,000'],
        ['Cost of sales', '?'],
      ],
      blanks: [{ row: 3, col: 1, answer: 44000 }]
    },
    exp: 'COGS = Opening + Purchases − Closing = 8,000 + 42,000 − 6,000 = 44,000.' },

  { id: 'tf-005', topic: 'pobc', difficulty: 'hard', type: 'tablefill',
    q: 'Complete the payroll summary for one employee.',
    table: {
      title: 'Payroll',
      columns: ['Item', '£'],
      rows: [
        ['Gross pay', '2,500'],
        ['PAYE income tax', '400'],
        ['Employee NIC', '180'],
        ['Net pay (to employee)', '?'],
        ["Employer's NIC", '230'],
        ['Total employment cost', '?'],
      ],
      blanks: [
        { row: 3, col: 1, answer: 1920 },
        { row: 5, col: 1, answer: 2730 },
      ]
    },
    exp: 'Net pay = 2,500 − 400 − 180 = 1,920. Total employment cost = gross + employer NIC = 2,500 + 230 = 2,730.' },

  { id: 'tf-006', topic: 'poc', difficulty: 'hard', type: 'tablefill',
    q: 'Complete the break-even and contribution analysis.',
    table: {
      title: 'Break-even analysis',
      columns: ['Item', '£ or units'],
      rows: [
        ['Selling price per unit', '20'],
        ['Variable cost per unit', '12'],
        ['Contribution per unit', '?'],
        ['Fixed costs', '24,000'],
        ['Break-even (units)', '?'],
        ['Budgeted sales (units)', '5,000'],
        ['Margin of safety (units)', '?'],
      ],
      blanks: [
        { row: 2, col: 1, answer: 8 },
        { row: 4, col: 1, answer: 3000 },
        { row: 6, col: 1, answer: 2000 },
      ]
    },
    exp: 'Contribution = 20 − 12 = 8. BE = 24,000 ÷ 8 = 3,000 units. Margin of safety = 5,000 − 3,000 = 2,000 units.' },

  /* === SCENARIO-BASED MULTI-PART QUESTIONS === */
  { id: 'sc-001', topic: 'itbk', difficulty: 'medium', type: 'scenario',
    setup: 'Bright Sparks Ltd is a small lighting wholesaler registered for VAT. On 1 May it sells goods on credit to Helios Decor for £800 plus VAT at 20%. Helios pays on 28 May. Bright Sparks pays its supplier, Aurora Cables, £1,200 owing from an earlier invoice on 30 May.',
    parts: [
      { type: 'mcq', q: 'What is the correct double entry for the sale to Helios Decor on 1 May (gross)?',
        opts: ['Dr Trade Receivables £800, Cr Sales £800', 'Dr Trade Receivables £960, Cr Sales £800, Cr VAT £160', 'Dr Bank £960, Cr Sales £960', 'Dr Sales £800, Cr Trade Receivables £800'],
        ans: 1, exp: 'Gross = £800 × 1.20 = £960. Dr Trade Receivables £960; Cr Sales £800 + Cr VAT £160.' },
      { type: 'numeric', q: 'What VAT amount is charged on the sale to Helios Decor?', answer: 160, unit: '£', exp: '£800 × 20% = £160.' },
      { type: 'mcq', q: 'What is the double entry to record the payment from Helios Decor on 28 May?',
        opts: ['Dr Bank £960, Cr Trade Receivables £960', 'Dr Sales £960, Cr Bank £960', 'Dr Trade Receivables £960, Cr Bank £960', 'Dr Bank £800, Cr Sales £800'],
        ans: 0, exp: 'Receipt from customer: Dr Bank, Cr Trade Receivables, for the gross amount £960.' },
      { type: 'mcq', q: 'What is the double entry to record the payment to Aurora Cables on 30 May?',
        opts: ['Dr Bank, Cr Trade Payables', 'Dr Trade Payables, Cr Bank', 'Dr Purchases, Cr Bank', 'Dr Trade Payables, Cr Purchases'],
        ans: 1, exp: 'Paying a supplier reduces the liability and the bank balance: Dr Trade Payables £1,200, Cr Bank £1,200.' },
    ],
    exp: 'A full sales/receipt/payment cycle with VAT — covers credit sales, output tax, receipt and supplier payment.' },

  { id: 'sc-002', topic: 'poc', difficulty: 'hard', type: 'scenario',
    setup: 'Northern Knits manufactures one product. Fixed costs for the year are £36,000. The product sells for £25 each and has a variable cost of £15. The company budgets to sell 5,000 units.',
    parts: [
      { type: 'numeric', q: 'What is the contribution per unit (in £)?', answer: 10, unit: '£', exp: '25 − 15 = £10 contribution per unit.' },
      { type: 'numeric', q: 'How many units must be sold to break even?', answer: 3600, exp: '36,000 ÷ 10 = 3,600 break-even units.' },
      { type: 'numeric', q: 'What is the margin of safety in units?', answer: 1400, exp: '5,000 − 3,600 = 1,400 units margin of safety.' },
      { type: 'mcq', q: 'If fixed costs increased by £4,000 and contribution per unit was unchanged, the break-even point would:',
        opts: ['Decrease', 'Stay the same', 'Increase by 400 units', 'Increase by 4,000 units'],
        ans: 2, exp: 'Extra £4,000 fixed cost ÷ £10 contribution = 400 extra break-even units.' },
    ],
    exp: 'A standard break-even sensitivity scenario — contribution, break-even, margin of safety, and a what-if change.' },

  { id: 'sc-003', topic: 'pobc', difficulty: 'medium', type: 'scenario',
    setup: 'Pinewood Ltd prepares its bank reconciliation at 31 March. The cash book shows a debit balance of £4,200. The bank statement at the same date shows £3,500. On investigation: unpresented cheques total £900; outstanding lodgements total £1,200; bank charges of £40 appear on the statement but are not in the cash book; a direct debit of £160 also appears on the statement but is missing from the cash book.',
    parts: [
      { type: 'mcq', q: 'How should the bank charges of £40 be treated?',
        opts: ['Add to cash book receipts', 'Enter as a payment in the cash book (Cr cash book)', 'Adjust the bank statement', 'Ignore until next period'],
        ans: 1, exp: 'Bank charges reduce the cash book balance — enter as a payment to bring the cash book up to date.' },
      { type: 'numeric', q: 'After updating the cash book for the bank charges and the direct debit, what is the new cash book balance?',
        answer: 4000, unit: '£', exp: '4,200 − 40 − 160 = £4,000 updated cash book balance.' },
      { type: 'numeric', q: 'Using the updated cash book balance, what is the bank statement balance reconciled to (cash book + unpresented − outstanding lodgements)?',
        answer: 3700, unit: '£', exp: '4,000 + 900 − 1,200 = £3,700 — the bank statement balance after timing differences.' },
      { type: 'mcq', q: 'The reconciled figure £3,700 does not match the actual statement balance of £3,500. What is the most likely reason?',
        opts: ['Another timing difference or error remains', 'The cash book is correct and the bank is wrong', 'Bank charges are double-counted', 'The reconciliation is complete'],
        ans: 0, exp: 'A £200 unexplained difference suggests another unrecorded item or error to investigate.' },
    ],
    exp: 'A full bank-reconciliation workflow — update the cash book, then reconcile to the statement via timing differences.' },

  { id: 'sc-004', topic: 'besy', difficulty: 'medium', type: 'scenario',
    setup: 'Helen runs a small bakery as a sole trader. The business is growing and she is considering incorporating as a private limited company (Ltd). She also exports to Ireland and is concerned about exchange-rate movements between £ and €.',
    parts: [
      { type: 'mcq', q: 'A defining feature of Helen’s current sole-trader status is:',
        opts: ['Limited liability', 'Separate legal personality from the owner', 'Unlimited personal liability for business debts', 'Required to publish annual accounts'],
        ans: 2, exp: 'Sole traders have unlimited personal liability — there is no legal separation between owner and business.' },
      { type: 'mcq', q: 'A key advantage of incorporating as a Ltd company would be:',
        opts: ['Lower tax rates only', 'Limited liability — personal assets protected from business debts', 'No need to file accounts', 'Ability to issue shares to the public'],
        ans: 1, exp: 'Incorporation creates a separate legal entity and limits Helen’s liability to the capital she invested.' },
      { type: 'mcq', q: 'If the £ strengthens against the €, Helen’s exports to Ireland will become:',
        opts: ['Cheaper to Irish customers', 'More expensive to Irish customers in euro terms', 'Unchanged in price', 'Exempt from VAT'],
        ans: 1, exp: 'A stronger £ means each £ buys more €, so the £-priced goods cost more euros — exports become less competitive.' },
      { type: 'numeric', q: 'Helen invoices €5,400. At the spot rate £1 = €1.20, what does she expect to receive in £?',
        answer: 4500, unit: '£', exp: '€5,400 ÷ 1.20 = £4,500.' },
    ],
    exp: 'A mixed scenario integrating business structures, limited liability and exchange-rate impact on exports.' },

);


/* ── GAP-FILL / PICKLIST QUESTIONS ── */
window.ALL_QUESTIONS.push(
  { id: 'gf-001', topic: 'itbk', difficulty: 'easy', type: 'gapfill',
    q: 'Complete the double entry by selecting the correct account for each gap.',
    template: 'When goods are sold on credit, the double entry is Dr {0} and Cr {1}.',
    gaps: [
      { options: ['Trade receivables', 'Bank', 'Sales', 'Purchases'], answer: 0 },
      { options: ['Trade receivables', 'Bank', 'Sales', 'Purchases'], answer: 2 },
    ],
    exp: 'A credit sale increases the amount owed by customers (Dr Trade receivables) and recognises revenue (Cr Sales).' },

  { id: 'gf-002', topic: 'itbk', difficulty: 'easy', type: 'gapfill',
    q: 'Complete the double entry for paying a supplier.',
    template: 'A business pays a supplier by bank transfer. The double entry is Dr {0} and Cr {1}.',
    gaps: [
      { options: ['Trade payables', 'Bank', 'Purchases', 'Sales'], answer: 0 },
      { options: ['Trade payables', 'Bank', 'Purchases', 'Sales'], answer: 1 },
    ],
    exp: 'Paying a supplier reduces the liability owed (Dr Trade payables) and the bank balance (Cr Bank).' },

  { id: 'gf-003', topic: 'itbk', difficulty: 'easy', type: 'gapfill',
    q: 'Complete the accounting equation.',
    template: 'The accounting equation states that assets equal {0} plus {1}.',
    gaps: [
      { options: ['capital', 'liabilities', 'expenses', 'drawings'], answer: 0 },
      { options: ['capital', 'liabilities', 'income', 'revenue'], answer: 1 },
    ],
    exp: 'Assets = Capital + Liabilities. This can be rearranged as Capital = Assets − Liabilities.' },

  { id: 'gf-004', topic: 'itbk', difficulty: 'medium', type: 'gapfill',
    q: 'Complete the statement about year-end adjustments.',
    template: 'An expense incurred but not yet paid at the year end is called {0}, and is shown in the statement of financial position as a {1}.',
    gaps: [
      { options: ['an accrual', 'a prepayment', 'a provision', 'a reserve'], answer: 0 },
      { options: ['current asset', 'current liability', 'non-current asset', 'non-current liability'], answer: 1 },
    ],
    exp: 'An accrual is an expense incurred but unpaid; it is recognised as a current liability.' },

  { id: 'gf-005', topic: 'pobc', difficulty: 'medium', type: 'gapfill',
    q: 'Complete the statement about the VAT control account.',
    template: 'A credit balance on the VAT control account means {0} tax exceeds {1} tax, so the business owes HMRC.',
    gaps: [
      { options: ['output', 'input', 'income', 'corporation'], answer: 0 },
      { options: ['output', 'input', 'sales', 'purchase'], answer: 1 },
    ],
    exp: 'Output tax (on sales) exceeding input tax (on purchases) gives a credit balance — the net amount owed to HMRC.' },

  { id: 'gf-006', topic: 'pobc', difficulty: 'easy', type: 'gapfill',
    q: 'Select the correct bank-reconciliation term.',
    template: 'A cheque written by the business and recorded in the cash book, but not yet cleared by the bank, is called {0}.',
    gaps: [
      { options: ['an unpresented cheque', 'an outstanding lodgement', 'a direct debit', 'a standing order'], answer: 0 },
    ],
    exp: 'An unpresented cheque has been entered in the cash book but has not yet been processed by the bank — a timing difference.' },

  { id: 'gf-007', topic: 'pobc', difficulty: 'medium', type: 'gapfill',
    q: 'Identify the type of error.',
    template: 'Posting a payment to the wrong supplier account, but still within trade payables, is an error of {0}. This type of error {1} the trial balance.',
    gaps: [
      { options: ['commission', 'principle', 'omission', 'original entry'], answer: 0 },
      { options: ['does not affect', 'unbalances', 'doubles', 'reverses'], answer: 0 },
    ],
    exp: 'An error of commission is posting to the wrong account of the correct type. Both debit and credit are still recorded, so the trial balance still balances.' },

  { id: 'gf-008', topic: 'poc', difficulty: 'medium', type: 'gapfill',
    q: 'Complete the costing formulas.',
    template: 'Contribution per unit is calculated as selling price minus {0}. The break-even point in units equals fixed costs divided by {1}.',
    gaps: [
      { options: ['variable cost', 'fixed cost', 'total cost', 'prime cost'], answer: 0 },
      { options: ['contribution per unit', 'variable cost', 'fixed cost', 'selling price'], answer: 0 },
    ],
    exp: 'Contribution per unit = selling price − variable cost. Break-even units = fixed costs ÷ contribution per unit.' },

  { id: 'gf-009', topic: 'poc', difficulty: 'easy', type: 'gapfill',
    q: 'Complete the statement about fixed cost behaviour.',
    template: 'As output increases, total fixed cost stays {0}, while fixed cost per unit {1}.',
    gaps: [
      { options: ['constant', 'variable', 'higher', 'lower'], answer: 0 },
      { options: ['falls', 'rises', 'stays constant', 'doubles'], answer: 0 },
    ],
    exp: 'Total fixed cost is unchanged within the relevant range; spread over more units, fixed cost per unit falls.' },

  { id: 'gf-010', topic: 'poc', difficulty: 'medium', type: 'gapfill',
    q: 'Select the correct costing method.',
    template: 'Under {0} costing, fixed production overheads are treated as period costs and excluded from inventory valuation.',
    gaps: [
      { options: ['marginal', 'absorption', 'standard', 'historical'], answer: 0 },
    ],
    exp: 'Marginal costing values inventory at variable production cost only; fixed overheads are written off as period costs.' },

  { id: 'gf-011', topic: 'besy', difficulty: 'easy', type: 'gapfill',
    q: 'Complete the statement about business structures and liability.',
    template: 'A {0} has unlimited personal liability, whereas the shareholders of a {1} have limited liability.',
    gaps: [
      { options: ['sole trader', 'public limited company', 'private limited company', 'charity'], answer: 0 },
      { options: ['sole trader', 'limited company', 'partnership', 'franchise'], answer: 1 },
    ],
    exp: 'A sole trader bears unlimited liability; incorporation gives a company\'s shareholders limited liability — losses capped at the amount invested.' },

  { id: 'gf-012', topic: 'besy', difficulty: 'medium', type: 'gapfill',
    q: 'Complete the statement about price elasticity of demand.',
    template: 'If demand for a good is price {0}, a rise in price will {1} total revenue.',
    gaps: [
      { options: ['inelastic', 'elastic', 'unit elastic', 'perfectly elastic'], answer: 0 },
      { options: ['increase', 'decrease', 'not change', 'eliminate'], answer: 0 },
    ],
    exp: 'When demand is price inelastic (PED < 1), quantity falls proportionately less than the price rise, so total revenue increases.' }
);


/* ── EXPANDED CONTENT: additional drag-drop questions ── */
window.ALL_QUESTIONS.push(
  { id: 'dd-009', topic: 'itbk', difficulty: 'easy', type: 'dragdrop',
    q: 'Match each transaction to its correct double entry.',
    pairs: [
      { left: 'Cash sale of goods', right: 'Dr Bank, Cr Sales' },
      { left: 'Owner introduces capital', right: 'Dr Bank, Cr Capital' },
      { left: 'Buy a van by bank transfer', right: 'Dr Motor vehicles, Cr Bank' },
      { left: 'Owner takes cash drawings', right: 'Dr Drawings, Cr Bank' },
    ],
    exp: 'Each transaction affects two accounts with equal debit and credit entries.' },

  { id: 'dd-010', topic: 'itbk', difficulty: 'medium', type: 'dragdrop',
    q: 'Match each book of prime entry to what it records.',
    pairs: [
      { left: 'Sales day book', right: 'Credit sales invoices' },
      { left: 'Purchases day book', right: 'Credit purchase invoices' },
      { left: 'Cash book', right: 'Bank and cash receipts and payments' },
      { left: 'Journal', right: 'Non-routine adjustments and corrections' },
    ],
    exp: 'Books of prime entry are where transactions are first recorded before posting to the ledger.' },

  { id: 'dd-011', topic: 'itbk', difficulty: 'medium', type: 'dragdrop',
    q: 'Match each accounting concept to its meaning.',
    pairs: [
      { left: 'Going concern', right: 'The business will continue for the foreseeable future' },
      { left: 'Accruals (matching)', right: 'Income and expenses recognised in the period they relate to' },
      { left: 'Prudence', right: 'Do not overstate assets or income; recognise losses early' },
      { left: 'Consistency', right: 'Use the same accounting methods from period to period' },
    ],
    exp: 'These fundamental concepts underpin the preparation of financial statements.' },

  { id: 'dd-012', topic: 'itbk', difficulty: 'easy', type: 'dragdrop',
    q: 'Match each item to its classification in the financial statements.',
    pairs: [
      { left: 'Motor vehicle', right: 'Non-current asset' },
      { left: 'Inventory', right: 'Current asset' },
      { left: 'Trade payables', right: 'Current liability' },
      { left: 'Bank loan repayable in 5 years', right: 'Non-current liability' },
    ],
    exp: 'Assets and liabilities are split into current (within 12 months) and non-current (longer term).' },

  { id: 'dd-013', topic: 'pobc', difficulty: 'medium', type: 'dragdrop',
    q: 'Match each control account entry to the side it appears on in the sales ledger control account.',
    pairs: [
      { left: 'Credit sales', right: 'Debit side of SLCA' },
      { left: 'Cash received from customers', right: 'Credit side of SLCA' },
      { left: 'Sales returns', right: 'Credit side of SLCA' },
      { left: 'Dishonoured cheque', right: 'Debit side of SLCA' },
    ],
    exp: 'The SLCA is debited with amounts that increase what customers owe, and credited with amounts that reduce it.' },

  { id: 'dd-014', topic: 'pobc', difficulty: 'medium', type: 'dragdrop',
    q: 'Match each payroll item to its description.',
    pairs: [
      { left: 'Gross pay', right: 'Total earnings before any deductions' },
      { left: 'PAYE', right: 'Income tax deducted from the employee' },
      { left: 'Employee NIC', right: 'National Insurance deducted from the employee' },
      { left: "Employer's NIC", right: 'An additional employment cost paid by the employer' },
    ],
    exp: 'Net pay = gross pay − PAYE − employee NIC − other deductions. Employer NIC is an extra cost on top of gross pay.' },

  { id: 'dd-015', topic: 'pobc', difficulty: 'easy', type: 'dragdrop',
    q: 'Match each internal control to the risk it primarily addresses.',
    pairs: [
      { left: 'Segregation of duties', right: 'Fraud by a single individual' },
      { left: 'Bank reconciliation', right: 'Errors or omissions in the cash book' },
      { left: 'Sequential numbering of documents', right: 'Missing or duplicated documents' },
      { left: 'Password / access controls', right: 'Unauthorised access to the system' },
    ],
    exp: 'Internal controls are designed to prevent and detect specific errors and fraud risks.' },

  { id: 'dd-016', topic: 'poc', difficulty: 'medium', type: 'dragdrop',
    q: 'Match each cost to whether it is direct or indirect for a furniture manufacturer.',
    pairs: [
      { left: 'Wood used in a table', right: 'Direct cost' },
      { left: 'Wages of the table assembler', right: 'Direct cost' },
      { left: 'Factory rent', right: 'Indirect cost' },
      { left: "Factory supervisor's salary", right: 'Indirect cost' },
    ],
    exp: 'Direct costs are traceable to a specific cost unit; indirect costs (overheads) are not.' },

  { id: 'dd-017', topic: 'poc', difficulty: 'medium', type: 'dragdrop',
    q: 'Match each inventory valuation method to its assumption.',
    pairs: [
      { left: 'FIFO', right: 'Oldest items are issued first' },
      { left: 'AVCO', right: 'Issues are valued at a weighted average cost' },
      { left: 'LIFO', right: 'Newest items issued first (not permitted under UK GAAP)' },
      { left: 'Standard cost', right: 'A predetermined cost is used for all issues' },
    ],
    exp: 'FIFO and AVCO are permitted under UK GAAP and IFRS; LIFO is not.' },

  { id: 'dd-018', topic: 'besy', difficulty: 'medium', type: 'dragdrop',
    q: 'Match each market structure to its key feature.',
    pairs: [
      { left: 'Perfect competition', right: 'Many firms, identical products, price takers' },
      { left: 'Monopolistic competition', right: 'Many firms with differentiated products' },
      { left: 'Oligopoly', right: 'A few large firms dominate the market' },
      { left: 'Monopoly', right: 'A single dominant supplier with price-setting power' },
    ],
    exp: 'Market structures range from many small price-takers to a single price-setting supplier.' },

  { id: 'dd-019', topic: 'besy', difficulty: 'easy', type: 'dragdrop',
    q: 'Match each stakeholder to their main interest in a business.',
    pairs: [
      { left: 'Shareholders', right: 'Dividends and growth in share value' },
      { left: 'Employees', right: 'Job security, pay and working conditions' },
      { left: 'Suppliers', right: 'Being paid on time and repeat orders' },
      { left: 'Government / HMRC', right: 'Correct payment of taxes and compliance with law' },
    ],
    exp: 'Different stakeholder groups have different — sometimes competing — objectives.' },

  { id: 'dd-020', topic: 'besy', difficulty: 'medium', type: 'dragdrop',
    q: 'Match each economic change to its likely effect on a UK business.',
    pairs: [
      { left: 'Interest rates rise', right: 'Borrowing costs increase; consumer spending tends to fall' },
      { left: 'The pound weakens', right: 'Exports become cheaper abroad; imports cost more' },
      { left: 'Inflation rises', right: 'Input costs and wages tend to rise; purchasing power falls' },
      { left: 'Economy enters recession', right: 'Demand falls as incomes and confidence drop' },
    ],
    exp: 'Macroeconomic changes are external factors a business must monitor and respond to.' }
);


/* ── EXPANDED CONTENT: additional table-completion questions ── */
window.ALL_QUESTIONS.push(
  { id: 'tf-007', topic: 'itbk', difficulty: 'medium', type: 'tablefill',
    q: 'Complete the trial balance extract by calculating the missing total.',
    table: {
      title: 'Trial balance (extract)',
      columns: ['Account', 'Debit £', 'Credit £'],
      rows: [
        ['Bank', '14,000', ''],
        ['Trade receivables', '9,000', ''],
        ['Trade payables', '', '7,500'],
        ['Capital', '', '15,500'],
        ['Totals', '?', '?'],
      ],
      blanks: [
        { row: 4, col: 1, answer: 23000 },
        { row: 4, col: 2, answer: 23000 },
      ]
    },
    exp: 'Total debits = 14,000 + 9,000 = 23,000. Total credits = 7,500 + 15,500 = 23,000. A trial balance must balance.' },

  { id: 'tf-008', topic: 'itbk', difficulty: 'medium', type: 'tablefill',
    q: 'Complete the calculation of the amount owed on a credit purchase.',
    table: {
      title: 'Supplier invoice',
      columns: ['Item', '£'],
      rows: [
        ['List price', '2,000'],
        ['Less: trade discount 10%', '200'],
        ['Net amount', '?'],
        ['Add: VAT at 20%', '?'],
        ['Total amount owed', '?'],
      ],
      blanks: [
        { row: 2, col: 1, answer: 1800 },
        { row: 3, col: 1, answer: 360 },
        { row: 4, col: 1, answer: 2160 },
      ]
    },
    exp: 'Net = 2,000 − 200 = 1,800. VAT = 1,800 × 20% = 360. Total = 1,800 + 360 = 2,160.' },

  { id: 'tf-009', topic: 'itbk', difficulty: 'hard', type: 'tablefill',
    q: 'Complete the statement of profit or loss extract.',
    table: {
      title: 'Statement of profit or loss (extract)',
      columns: ['Item', '£'],
      rows: [
        ['Sales revenue', '120,000'],
        ['Less: cost of sales', '72,000'],
        ['Gross profit', '?'],
        ['Less: expenses', '31,000'],
        ['Profit for the year', '?'],
      ],
      blanks: [
        { row: 2, col: 1, answer: 48000 },
        { row: 4, col: 1, answer: 17000 },
      ]
    },
    exp: 'Gross profit = 120,000 − 72,000 = 48,000. Profit for the year = 48,000 − 31,000 = 17,000.' },

  { id: 'tf-010', topic: 'pobc', difficulty: 'medium', type: 'tablefill',
    q: 'Complete the VAT control account by calculating the amount due to HMRC.',
    table: {
      title: 'VAT control account',
      columns: ['Debit entries', '£', 'Credit entries', '£'],
      rows: [
        ['Input tax (purchases)', '6,400', 'Output tax (sales)', '11,200'],
        ['Balance c/d (due to HMRC)', '?', '', ''],
      ],
      blanks: [{ row: 1, col: 1, answer: 4800 }]
    },
    exp: 'Output tax 11,200 − input tax 6,400 = 4,800 owed to HMRC (a credit balance carried down).' },

  { id: 'tf-011', topic: 'pobc', difficulty: 'hard', type: 'tablefill',
    q: 'Complete the bank reconciliation statement.',
    table: {
      title: 'Bank reconciliation statement',
      columns: ['Item', '£'],
      rows: [
        ['Balance per bank statement', '3,500'],
        ['Add: outstanding lodgements', '1,800'],
        ['Less: unpresented cheques', '900'],
        ['Balance per cash book', '?'],
      ],
      blanks: [{ row: 3, col: 1, answer: 4400 }]
    },
    exp: 'Cash book balance = 3,500 + 1,800 − 900 = 4,400.' },

  { id: 'tf-012', topic: 'poc', difficulty: 'medium', type: 'tablefill',
    q: 'Complete the overhead absorption calculation.',
    table: {
      title: 'Overhead absorption',
      columns: ['Item', '£ or hours'],
      rows: [
        ['Budgeted overheads', '90,000'],
        ['Budgeted labour hours', '18,000'],
        ['Overhead absorption rate (per hour)', '?'],
        ['Actual labour hours worked', '17,000'],
        ['Overhead absorbed', '?'],
      ],
      blanks: [
        { row: 2, col: 1, answer: 5 },
        { row: 4, col: 1, answer: 85000 },
      ]
    },
    exp: 'OAR = 90,000 ÷ 18,000 = £5 per hour. Absorbed = £5 × 17,000 = £85,000.' },

  { id: 'tf-013', topic: 'poc', difficulty: 'hard', type: 'tablefill',
    q: 'Complete the marginal costing profit statement.',
    table: {
      title: 'Marginal costing statement',
      columns: ['Item', '£'],
      rows: [
        ['Sales (4,000 units)', '80,000'],
        ['Less: variable costs', '48,000'],
        ['Contribution', '?'],
        ['Less: fixed costs', '20,000'],
        ['Profit', '?'],
      ],
      blanks: [
        { row: 2, col: 1, answer: 32000 },
        { row: 4, col: 1, answer: 12000 },
      ]
    },
    exp: 'Contribution = 80,000 − 48,000 = 32,000. Profit = 32,000 − 20,000 = 12,000.' },

  { id: 'tf-014', topic: 'poc', difficulty: 'hard', type: 'tablefill',
    q: 'Complete the FIFO stores record. 100 units are held at £4, then 200 are bought at £5, then 250 units are issued.',
    table: {
      title: 'FIFO inventory',
      columns: ['Item', 'Units', '£'],
      rows: [
        ['Opening balance', '100', '400'],
        ['Purchase', '200', '1,000'],
        ['Issue (250 units)', '250', '?'],
        ['Closing balance', '50', '?'],
      ],
      blanks: [
        { row: 2, col: 2, answer: 1150 },
        { row: 3, col: 2, answer: 250 },
      ]
    },
    exp: 'FIFO issue = 100 @ £4 + 150 @ £5 = 400 + 750 = £1,150. Closing = 50 @ £5 = £250.' },

  { id: 'tf-015', topic: 'besy', difficulty: 'medium', type: 'tablefill',
    q: 'Complete the calculation of weekly gross pay and the inflation rate.',
    table: {
      title: 'Pay and inflation',
      columns: ['Item', 'Value'],
      rows: [
        ['Hours worked per week', '38'],
        ['Hourly rate (£)', '12'],
        ['Weekly gross pay (£)', '?'],
        ['CPI at start of year', '100'],
        ['CPI at end of year', '104'],
        ['Inflation rate (%)', '?'],
      ],
      blanks: [
        { row: 2, col: 1, answer: 456 },
        { row: 5, col: 1, answer: 4 },
      ]
    },
    exp: 'Gross pay = 38 × £12 = £456. Inflation = (104 − 100) ÷ 100 × 100 = 4%.' }
);


/* ── EXPANDED CONTENT: additional scenario questions (ITBK / POBC) ── */
window.ALL_QUESTIONS.push(
  { id: 'sc-005', topic: 'itbk', difficulty: 'medium', type: 'scenario',
    setup: 'Maple Joinery is a sole trader. During March it buys timber on credit from Forest Supplies for £600 plus VAT at 20%. It later returns £100 (net) of damaged timber. Maple Joinery is registered for VAT.',
    parts: [
      { type: 'numeric', q: 'What is the total (gross) amount of the original credit purchase invoice?', answer: 720, unit: '£', exp: '£600 + (£600 × 20%) = £600 + £120 = £720.' },
      { type: 'mcq', q: 'In which book of prime entry is the original purchase invoice recorded?',
        opts: ['Sales day book', 'Purchases day book', 'Cash book', 'Purchases returns day book'],
        ans: 1, exp: 'A credit purchase invoice is recorded in the purchases day book.' },
      { type: 'mcq', q: 'When the damaged timber is returned, Forest Supplies issues a credit note. Where does Maple Joinery record it?',
        opts: ['Sales returns day book', 'Purchases returns day book', 'Cash book', 'Journal'],
        ans: 1, exp: 'A credit note received from a supplier is recorded in the purchases returns day book.' },
      { type: 'numeric', q: 'What is the gross value of the credit note for the £100 net return?', answer: 120, unit: '£', exp: '£100 + (£100 × 20%) = £120 gross.' },
    ],
    exp: 'A credit purchase with VAT, followed by a returns adjustment — covering day books and VAT-inclusive amounts.' },

  { id: 'sc-006', topic: 'itbk', difficulty: 'hard', type: 'scenario',
    setup: 'Riverside Cafe prepares accounts to 31 December. On 1 October it paid £1,800 for a 12-month insurance policy. At 31 December the electricity bill of £240 for October–December has been received but not yet paid.',
    parts: [
      { type: 'numeric', q: 'How many months of the insurance policy are prepaid at 31 December?', answer: 9, exp: 'The policy runs Oct–Sep. By 31 December 3 months are used; 9 months (Jan–Sep) are prepaid.' },
      { type: 'numeric', q: 'What is the insurance prepayment at 31 December?', answer: 1350, unit: '£', exp: '9/12 × £1,800 = £1,350 prepaid.' },
      { type: 'mcq', q: 'How is the unpaid electricity of £240 treated at the year end?',
        opts: ['As a prepayment (current asset)', 'As an accrual (current liability)', 'As capital expenditure', 'Ignored until paid'],
        ans: 1, exp: 'An expense incurred but not yet paid is an accrual — a current liability.' },
      { type: 'mcq', q: 'What is the journal entry for the electricity accrual?',
        opts: ['Dr Accruals, Cr Electricity', 'Dr Electricity, Cr Accruals', 'Dr Electricity, Cr Bank', 'Dr Bank, Cr Electricity'],
        ans: 1, exp: 'An accrual increases the expense (Dr Electricity) and creates a liability (Cr Accruals).' },
    ],
    exp: 'Year-end adjustments: a prepayment and an accrual applied through the matching concept.' },

  { id: 'sc-007', topic: 'itbk', difficulty: 'medium', type: 'scenario',
    setup: 'Crafty Pots started trading on 1 January when the owner paid £20,000 into the business bank account. During the year the business made a profit of £14,000 and the owner took drawings of £9,000.',
    parts: [
      { type: 'mcq', q: 'What is the double entry for the owner paying £20,000 into the business?',
        opts: ['Dr Capital, Cr Bank', 'Dr Bank, Cr Capital', 'Dr Bank, Cr Sales', 'Dr Drawings, Cr Bank'],
        ans: 1, exp: 'Capital introduced increases the bank balance (Dr Bank) and the owner\'s capital (Cr Capital).' },
      { type: 'mcq', q: 'How are the owner\'s drawings of £9,000 classified?',
        opts: ['A business expense', 'A reduction in capital', 'Revenue', 'A liability'],
        ans: 1, exp: 'Drawings are not an expense — they reduce the owner\'s capital.' },
      { type: 'numeric', q: 'What is the closing capital at the end of the year?', answer: 25000, unit: '£', exp: 'Closing capital = opening 20,000 + profit 14,000 − drawings 9,000 = £25,000.' },
    ],
    exp: 'The capital account: capital introduced, profit and drawings combine to give closing capital.' },

  { id: 'sc-008', topic: 'pobc', difficulty: 'hard', type: 'scenario',
    setup: 'Oakfield Ltd extracted a trial balance that did not balance: the debit column totalled £248,600 and the credit column totalled £247,900. A suspense account was opened. On investigation, a £700 payment for rent had been debited to the rent account but not credited to the bank account.',
    parts: [
      { type: 'numeric', q: 'What is the value of the difference placed in the suspense account?', answer: 700, unit: '£', exp: 'Difference = £248,600 − £247,900 = £700.' },
      { type: 'mcq', q: 'The rent payment was debited but not credited to bank. This is an example of:',
        opts: ['An error of principle', 'A single-sided entry', 'A compensating error', 'An error of commission'],
        ans: 1, exp: 'Only one side of the double entry was recorded — a single-sided entry, which unbalances the trial balance.' },
      { type: 'mcq', q: 'What journal entry corrects the error and clears the suspense account?',
        opts: ['Dr Bank £700, Cr Suspense £700', 'Dr Suspense £700, Cr Bank £700', 'Dr Rent £700, Cr Suspense £700', 'Dr Suspense £700, Cr Rent £700'],
        ans: 1, exp: 'The missing credit to bank is posted, and the suspense account is debited to clear it: Dr Suspense £700, Cr Bank £700.' },
    ],
    exp: 'A trial balance difference, a suspense account, and the correcting journal for a single-sided error.' },

  { id: 'sc-009', topic: 'pobc', difficulty: 'medium', type: 'scenario',
    setup: 'Belmont Trading runs monthly payroll. For one employee in April: gross pay is £2,800, PAYE is £420, employee NIC is £210, and the employee pays £140 into a pension. The employer\'s NIC for the month is £260.',
    parts: [
      { type: 'numeric', q: 'What is the employee\'s net pay for April?', answer: 2030, unit: '£', exp: 'Net pay = 2,800 − 420 − 210 − 140 = £2,030.' },
      { type: 'numeric', q: 'What is the total cost of employing this person for April?', answer: 3060, unit: '£', exp: 'Total employment cost = gross pay £2,800 + employer NIC £260 = £3,060.' },
      { type: 'mcq', q: 'Which document is the source record supporting the payroll journal entries?',
        opts: ['Sales invoice', 'Payslip', 'Remittance advice', 'Purchase order'],
        ans: 1, exp: 'The payslip evidences gross pay, deductions and net pay for the payroll journal.' },
    ],
    exp: 'Payroll: distinguishing net pay (to the employee) from total employment cost (to the employer).' },

  { id: 'sc-010', topic: 'pobc', difficulty: 'medium', type: 'scenario',
    setup: 'Harbour Supplies keeps a purchases ledger control account. On 1 May the balance was £18,000 Cr. During May: credit purchases were £47,000, payments to suppliers were £41,000, purchases returns were £1,300, and a contra of £700 was made against the sales ledger.',
    parts: [
      { type: 'numeric', q: 'What is the closing balance on the purchases ledger control account at 31 May?', answer: 22000, unit: '£', exp: 'Closing PLCA = 18,000 + 47,000 − 41,000 − 1,300 − 700 = £22,000 Cr.' },
      { type: 'mcq', q: 'What should the closing PLCA balance agree with?',
        opts: ['The bank statement', 'The total of individual supplier balances in the purchases ledger', 'The VAT return', 'Total credit sales'],
        ans: 1, exp: 'The PLCA is a summary account — it must agree with the total of the individual supplier balances.' },
      { type: 'mcq', q: 'The contra entry of £700 means:',
        opts: ['A customer was overpaid', 'Amounts owed to and by the same business were offset', 'A supplier issued a refund', 'VAT was reclaimed'],
        ans: 1, exp: 'A contra offsets a balance where the same business is both a customer and a supplier — Dr PLCA, Cr SLCA.' },
    ],
    exp: 'Reconstructing a control account balance and understanding what it should agree with.' }
);


/* ── EXPANDED CONTENT: additional scenario questions (POC / BESY) ── */
window.ALL_QUESTIONS.push(
  { id: 'sc-011', topic: 'poc', difficulty: 'medium', type: 'scenario',
    setup: 'Summit Sportswear makes one product. The selling price is £40 per unit and the variable cost is £24 per unit. Fixed costs for the year are £96,000. The company budgets to sell 8,000 units.',
    parts: [
      { type: 'numeric', q: 'What is the contribution per unit?', answer: 16, unit: '£', exp: 'Contribution = selling price − variable cost = £40 − £24 = £16.' },
      { type: 'numeric', q: 'How many units must be sold to break even?', answer: 6000, exp: 'Break-even = fixed costs ÷ contribution per unit = £96,000 ÷ £16 = 6,000 units.' },
      { type: 'numeric', q: 'What is the budgeted profit at 8,000 units?', answer: 32000, unit: '£', exp: 'Profit = (8,000 × £16) − £96,000 = £128,000 − £96,000 = £32,000.' },
      { type: 'mcq', q: 'The margin of safety of 2,000 units tells the business:',
        opts: ['How much profit it will make', 'How far sales can fall before a loss is made', 'Its total fixed costs', 'Its contribution ratio'],
        ans: 1, exp: 'Margin of safety (budgeted 8,000 − break-even 6,000 = 2,000 units) shows how far sales can fall before a loss.' },
    ],
    exp: 'A complete marginal-costing scenario: contribution, break-even, profit and margin of safety.' },

  { id: 'sc-012', topic: 'poc', difficulty: 'hard', type: 'scenario',
    setup: 'Delta Manufacturing absorbs production overheads on a labour-hour basis. Budgeted overheads were £150,000 and budgeted labour hours were 30,000. In the period, actual overheads were £148,000 and 29,000 labour hours were actually worked.',
    parts: [
      { type: 'numeric', q: 'What is the overhead absorption rate per labour hour?', answer: 5, unit: '£', exp: 'OAR = budgeted overheads ÷ budgeted hours = £150,000 ÷ 30,000 = £5 per hour.' },
      { type: 'numeric', q: 'How much overhead was absorbed into production in the period?', answer: 145000, unit: '£', exp: 'Absorbed = OAR × actual hours = £5 × 29,000 = £145,000.' },
      { type: 'mcq', q: 'Comparing absorbed (£145,000) with actual (£148,000), the overheads are:',
        opts: ['Over-absorbed by £3,000', 'Under-absorbed by £3,000', 'Correctly absorbed', 'Over-absorbed by £5,000'],
        ans: 1, exp: 'Actual £148,000 exceeds absorbed £145,000, so overheads are under-absorbed by £3,000.' },
      { type: 'mcq', q: 'How is the under-absorption treated?',
        opts: ['Credited to the income statement, increasing profit', 'Debited to the income statement, reducing profit', 'Added to closing inventory', 'Ignored'],
        ans: 1, exp: 'Under-absorption is debited to the income statement as an extra cost, reducing profit.' },
    ],
    exp: 'Overhead absorption end to end: OAR, overhead absorbed, and the under/over-absorption adjustment.' },

  { id: 'sc-013', topic: 'poc', difficulty: 'medium', type: 'scenario',
    setup: 'Greenleaf Ltd is preparing a quotation. The job needs direct materials of £1,200 and direct labour of £800. Production overheads are absorbed at 50% of direct labour cost. The company adds a mark-up of 25% to total cost to set the price.',
    parts: [
      { type: 'numeric', q: 'What is the prime cost of the job?', answer: 2000, unit: '£', exp: 'Prime cost = direct materials + direct labour = £1,200 + £800 = £2,000.' },
      { type: 'numeric', q: 'What production overhead is absorbed into the job?', answer: 400, unit: '£', exp: 'Overhead = 50% × direct labour = 50% × £800 = £400.' },
      { type: 'numeric', q: 'What is the total production cost of the job?', answer: 2400, unit: '£', exp: 'Total cost = prime cost £2,000 + overhead £400 = £2,400.' },
      { type: 'numeric', q: 'What price should be quoted, after the 25% mark-up?', answer: 3000, unit: '£', exp: 'Price = £2,400 × 1.25 = £3,000.' },
    ],
    exp: 'Job costing: prime cost, overhead absorption, total cost and mark-up pricing.' },

  { id: 'sc-014', topic: 'besy', difficulty: 'medium', type: 'scenario',
    setup: 'Two friends, Priya and Sam, run a graphic-design business together as a general partnership. They are considering incorporating as a private limited company. They also have a major client who has not paid a £4,000 invoice that is now 90 days overdue.',
    parts: [
      { type: 'mcq', q: 'As a general partnership, Priya and Sam\'s liability for business debts is:',
        opts: ['Limited to their capital contributions', 'Unlimited — they are personally liable', 'Limited by a charge over assets', 'The same as a limited company'],
        ans: 1, exp: 'General partners have unlimited liability and are jointly and severally liable for partnership debts.' },
      { type: 'mcq', q: 'A key advantage of incorporating as a private limited company would be:',
        opts: ['No need to keep accounting records', 'Limited liability protecting their personal assets', 'Exemption from tax', 'Ability to sell shares to the public'],
        ans: 1, exp: 'Incorporation gives the shareholders limited liability — personal assets are protected from business debts.' },
      { type: 'mcq', q: 'The £4,000 overdue invoice is a concern primarily because it affects the business\'s:',
        opts: ['Cash flow and liquidity', 'Mission statement', 'Legal structure', 'VAT registration'],
        ans: 0, exp: 'Unpaid receivables tie up cash and can threaten the liquidity the business needs to pay its own bills.' },
    ],
    exp: 'Business structures, limited liability, and the cash-flow impact of overdue receivables.' },

  { id: 'sc-015', topic: 'besy', difficulty: 'medium', type: 'scenario',
    setup: 'Coastline Imports buys stock from suppliers in the USA and sells to UK customers. The current exchange rate is £1 = $1.25. The Bank of England has just raised interest rates, and inflation in the UK is rising.',
    parts: [
      { type: 'numeric', q: 'Coastline orders stock costing $10,000. At £1 = $1.25, what is the cost in pounds?', answer: 8000, unit: '£', exp: '$10,000 ÷ 1.25 = £8,000.' },
      { type: 'mcq', q: 'If the pound weakens to £1 = $1.10, the same $10,000 order will:',
        opts: ['Cost less in pounds', 'Cost more in pounds', 'Cost the same', 'Become exempt from VAT'],
        ans: 1, exp: 'A weaker pound buys fewer dollars, so $10,000 costs more in pounds ($10,000 ÷ 1.10 ≈ £9,091).' },
      { type: 'mcq', q: 'The rise in UK interest rates is most likely to:',
        opts: ['Increase consumer borrowing and spending', 'Reduce consumer borrowing and spending', 'Have no effect on demand', 'Reduce the cost of imports'],
        ans: 1, exp: 'Higher interest rates raise borrowing costs and mortgage payments, tending to reduce consumer demand.' },
      { type: 'mcq', q: 'Rising inflation is most likely to:',
        opts: ['Reduce the business\'s input costs', 'Increase input costs and reduce customers\' purchasing power', 'Have no effect on the business', 'Guarantee higher profits'],
        ans: 1, exp: 'Inflation pushes up input costs and erodes the purchasing power of customers\' money.' },
    ],
    exp: 'External economic factors: exchange rates, interest rates and inflation affecting an importer.' },

  { id: 'sc-016', topic: 'besy', difficulty: 'hard', type: 'scenario',
    setup: 'Anya works as an accounting technician at a manufacturing company. Her manager asks her to delay recording several supplier invoices until after the year end so that this year\'s profit looks higher. The company also wants to start reporting on its environmental impact.',
    parts: [
      { type: 'mcq', q: 'Recording the invoices in the wrong period would mainly breach which accounting concept?',
        opts: ['Going concern', 'The accruals (matching) concept', 'Consistency', 'Materiality'],
        ans: 1, exp: 'The accruals concept requires expenses to be recorded in the period they relate to, regardless of when paid.' },
      { type: 'mcq', q: 'Under the AAT Code of Professional Ethics, what should Anya do?',
        opts: ['Follow the instruction — the manager is senior', 'Refuse to manipulate the records and raise her concerns appropriately', 'Record half the invoices as a compromise', 'Resign immediately without explanation'],
        ans: 1, exp: 'Integrity and objectivity require Anya to refuse to falsify records and to raise the matter through proper channels.' },
      { type: 'mcq', q: 'The fundamental ethical principle most directly at stake here is:',
        opts: ['Confidentiality', 'Integrity', 'Professional competence', 'Courtesy'],
        ans: 1, exp: 'Integrity — being honest and straightforward — is the principle most directly threatened by manipulating the records.' },
      { type: 'mcq', q: 'Reporting on environmental impact is an example of:',
        opts: ['Tax avoidance', 'Sustainability / corporate social responsibility reporting', 'A bank reconciliation', 'A control account'],
        ans: 1, exp: 'Measuring and reporting environmental impact is part of sustainability and corporate social responsibility.' },
    ],
    exp: 'Professional ethics, the accruals concept, and the finance function\'s sustainability role.' },

  /* ── Additional scenario questions (Phase 6 expansion) ── */

  { id: 'sc-017', topic: 'itbk', difficulty: 'hard', type: 'scenario',
    setup: 'Blossom Interiors is a sole trader business. At 31 March the trial balance shows: Bank £2,400 Dr; Trade receivables £8,100 Dr; Inventory £3,600 Dr; Premises £45,000 Dr; Trade payables £5,200 Cr; Loan £12,000 Cr; Capital £28,500 Cr; Sales £62,000 Cr; Purchases £32,000 Dr; Wages £9,500 Dr; Rent £4,200 Dr; Drawings £2,900 Dr.',
    parts: [
      { type: 'mcq', q: 'The trial balance total (debit side) is:',
        opts: ['£107,700', '£100,000', '£95,800', '£107,200'],
        ans: 0, exp: '2,400 + 8,100 + 3,600 + 45,000 + 32,000 + 9,500 + 4,200 + 2,900 = £107,700.' },
      { type: 'mcq', q: 'Drawings appear in the trial balance as a debit because:',
        opts: ['Drawings is an expense of the business', 'Drawings reduce capital (owner\'s equity) and are recorded as a debit', 'Drawings are an asset of the business', 'Drawings increase profit'],
        ans: 1, exp: 'Drawings reduce the owner\'s capital. Capital has a credit nature, so reducing it requires a debit entry.' },
      { type: 'mcq', q: 'Which of the following would NOT appear in the trial balance?',
        opts: ['Trade receivables', 'Closing inventory', 'Bank', 'Wages'],
        ans: 1, exp: 'Closing inventory is determined at year end and is NOT in the trial balance — it appears as an adjusting entry and in the financial statements.' },
      { type: 'mcq', q: 'If a sales invoice for £500 was recorded as £50, the trial balance would:',
        opts: ['Not balance — one side is wrong', 'Still balance — both sides are wrong by the same amount', 'Not balance — only the debit side is wrong', 'Show a credit balance on the suspense account'],
        ans: 1, exp: 'An error of original entry affects both the debit and credit sides equally — so the trial balance still balances.' },
    ],
    exp: 'Trial balance composition, the nature of drawings, closing inventory, and errors of original entry.' },

  { id: 'sc-018', topic: 'itbk', difficulty: 'medium', type: 'scenario',
    setup: 'Priya runs a craft supplies shop. She buys goods from Supplier X on credit. This month: purchases £4,800 net; VAT at 20%; she also issues a credit note for returned goods of £600 net + VAT; she pays a £200 trade discount (already deducted from the invoice); and she pays £3,000 to Supplier X during the month.',
    parts: [
      { type: 'mcq', q: 'The VAT on the purchase invoice (£4,800 net) is:',
        opts: ['£800', '£960', '£576', '£4,800'],
        ans: 1, exp: '£4,800 × 20% = £960 VAT.' },
      { type: 'mcq', q: 'The gross amount of the purchase invoice (after trade discount but before settlement discount) is:',
        opts: ['£5,560', '£5,760', '£5,500', '£6,000'],
        ans: 1, exp: 'Net £4,800 + VAT £960 = £5,760. The trade discount is already reflected in the £4,800 net figure.' },
      { type: 'mcq', q: 'The credit note Priya issues for returned goods goes in which book of prime entry?',
        opts: ['Sales returns day book', 'Purchases returns day book', 'Sales day book', 'Journal'],
        ans: 1, exp: 'A credit note RECEIVED from a supplier for goods returned goes in the purchases returns day book.' },
      { type: 'mcq', q: 'After the purchase, the return and the £3,000 payment, the balance owed to Supplier X is:',
        opts: ['£2,520', '£1,800', '£2,040', '£2,760'],
        ans: 2, exp: 'Purchase gross £5,760. Credit note gross (£600 + £120 VAT) = £720. Payment £3,000. Balance = £5,760 − £720 − £3,000 = £2,040.' },
    ],
    exp: 'VAT on purchases, trade vs settlement discounts, purchases returns day book, and running payable balances.' },

  { id: 'sc-019', topic: 'pobc', difficulty: 'hard', type: 'scenario',
    setup: 'At 30 April, the sales ledger control account (SLCA) shows a closing balance of £18,400 Dr. The list of individual trade receivable balances totals £17,950. Investigation reveals: (1) A credit note of £300 issued to a customer was omitted from the sales returns day book. (2) A customer payment of £150 was posted to the wrong customer account (correct total). (3) A sales invoice of £500 was entered twice in the sales day book.',
    parts: [
      { type: 'mcq', q: 'Which of the three errors would cause the SLCA not to agree with the individual ledger list?',
        opts: ['Error 1 only', 'Error 3 only', 'Errors 1 and 3', 'Error 2 only'],
        ans: 2, exp: 'Error 1 (omission from day book) affects the SLCA only. Error 3 (duplicate invoice) overestimates the SLCA. Error 2 (wrong customer account) affects only the individual ledger — the total and SLCA are both correct.' },
      { type: 'mcq', q: 'After correcting error 1 (the omitted credit note of £300), the SLCA balance becomes:',
        opts: ['£18,100', '£18,700', '£18,400', '£17,650'],
        ans: 0, exp: 'The SLCA needs a debit to the sales returns account and a credit to the SLCA of £300. New SLCA: £18,400 − £300 = £18,100.' },
      { type: 'mcq', q: 'Error 2 (payment posted to wrong customer account) is an example of:',
        opts: ['Error of omission', 'Error of commission', 'Error of principle', 'Compensating error'],
        ans: 1, exp: 'Posting to the wrong account of the same type (trade receivable) is an error of commission.' },
      { type: 'mcq', q: 'After correcting all three errors, the SLCA should equal the individual ledger list. What correction is needed for error 3?',
        opts: ['Debit SLCA £500; credit sales £500', 'Credit SLCA £500; debit sales £500', 'No correction needed — it self-corrects', 'Debit suspense £500; credit SLCA £500'],
        ans: 1, exp: 'The duplicate posting inflated the SLCA by £500. To correct: credit SLCA £500 and debit sales £500, reversing the duplicate.' },
    ],
    exp: 'Sales ledger control account reconciliation, error types, and correction journal entries.' },

  { id: 'sc-020', topic: 'pobc', difficulty: 'medium', type: 'scenario',
    setup: 'Callum earns a basic salary of £28,000 per year and worked 12 overtime hours this month at time-and-a-half. His hourly rate is £13.50. PAYE deducted this month: £320. Employee NIC: £198. Employer NIC rate: 15% on earnings above £416.67/month.',
    parts: [
      { type: 'mcq', q: 'Callum\'s overtime pay for the month is:',
        opts: ['£162', '£243', '£216', '£324'],
        ans: 1, exp: '12 hours × £13.50 × 1.5 = 12 × £20.25 = £243.' },
      { type: 'mcq', q: 'Callum\'s gross pay this month (basic + overtime) is:',
        opts: ['£2,575.67', '£2,576.33', '£2,566.67', '£2,243'],
        ans: 1, exp: 'Basic: £28,000 ÷ 12 = £2,333.33. Overtime: £243. Gross = £2,333.33 + £243 = £2,576.33.' },
      { type: 'mcq', q: 'Callum\'s net pay this month is:',
        opts: ['£2,058.33', '£2,376.33', '£2,178.33', '£1,858.33'],
        ans: 0, exp: 'Gross £2,576.33 − PAYE £320 − Employee NIC £198 = £2,058.33.' },
      { type: 'mcq', q: 'The employer\'s NIC for the month (on earnings above £416.67) at 15% is approximately:',
        opts: ['£323.95', '£386.45', '£257.40', '£293.05'],
        ans: 0, exp: '(£2,576.33 − £416.67) × 15% = £2,159.66 × 15% ≈ £323.95. The employer pays this on top of gross pay.' },
    ],
    exp: 'Payroll: overtime calculation, gross pay, net pay and employer NIC cost.' },

  { id: 'sc-021', topic: 'poc', difficulty: 'hard', type: 'scenario',
    setup: 'A factory produces one product. Fixed costs: £84,000 per month. Variable cost per unit: £18. Selling price: £30 per unit. Budgeted production: 8,000 units. Actual production: 7,500 units. The overhead absorption rate is based on units produced.',
    parts: [
      { type: 'mcq', q: 'The contribution per unit is:',
        opts: ['£12', '£18', '£30', '£48'],
        ans: 0, exp: 'Contribution per unit = Selling price − Variable cost = £30 − £18 = £12.' },
      { type: 'mcq', q: 'The break-even point (units) is:',
        opts: ['7,000', '4,667', '2,800', '5,600'],
        ans: 0, exp: 'Break-even = Fixed costs ÷ Contribution per unit = £84,000 ÷ £12 = 7,000 units.' },
      { type: 'mcq', q: 'Based on budgeted production, the overhead absorption rate per unit is:',
        opts: ['£10.50', '£11.20', '£10.00', '£12.00'],
        ans: 0, exp: 'OAR = £84,000 ÷ 8,000 units = £10.50 per unit.' },
      { type: 'mcq', q: 'Given actual production of 7,500 units, the overhead position is:',
        opts: ['Over-absorbed by £5,250', 'Under-absorbed by £5,250', 'Over-absorbed by £4,500', 'Under-absorbed by £4,500'],
        ans: 1, exp: 'Absorbed = 7,500 × £10.50 = £78,750. Actual fixed costs = £84,000. Under-absorption = £84,000 − £78,750 = £5,250.' },
    ],
    exp: 'CVP analysis: contribution, break-even, OAR and overhead absorption with actual vs budgeted production.' },

  { id: 'sc-022', topic: 'poc', difficulty: 'medium', type: 'scenario',
    setup: 'Meridian Co uses AVCO to value inventory. At 1 May: 200 units @ £5.00 each. Purchased 6 May: 300 units @ £6.50 each. Sold 10 May: 350 units. Purchased 15 May: 150 units @ £7.00 each. Sold 20 May: 200 units.',
    parts: [
      { type: 'mcq', q: 'After the 6 May purchase, the weighted average cost per unit is:',
        opts: ['£5.90', '£6.00', '£5.75', '£6.50'],
        ans: 0, exp: 'Total value: (200 × £5.00) + (300 × £6.50) = £1,000 + £1,950 = £2,950. Total units: 500. AVCO = £2,950 ÷ 500 = £5.90.' },
      { type: 'mcq', q: 'The cost of the 350 units sold on 10 May (using AVCO at £5.90) is:',
        opts: ['£2,065', '£1,750', '£2,275', '£1,925'],
        ans: 0, exp: '350 × £5.90 = £2,065.' },
      { type: 'mcq', q: 'After the 10 May sale, how many units remain and at what total value?',
        opts: ['150 units, £885', '150 units, £750', '150 units, £975', '150 units, £1,050'],
        ans: 0, exp: '500 − 350 = 150 units. 150 × £5.90 = £885.' },
      { type: 'mcq', q: 'After the 15 May purchase (150 units @ £7.00), the new AVCO per unit is:',
        opts: ['£6.45', '£6.50', '£6.00', '£7.00'],
        ans: 0, exp: 'Total value: £885 + (150 × £7.00) = £885 + £1,050 = £1,935. Total units: 300. AVCO = £1,935 ÷ 300 = £6.45.' },
    ],
    exp: 'AVCO inventory valuation: recalculating weighted average after every purchase.' },

  { id: 'sc-023', topic: 'besy', difficulty: 'medium', type: 'scenario',
    setup: 'Stella is considering leaving employment to set up her own business selling handmade ceramics. She is deciding between operating as a sole trader or incorporating as a private limited company (Ltd). She expects revenues of £90,000 in year 1 and a net profit of £35,000.',
    parts: [
      { type: 'mcq', q: 'As a sole trader, Stella\'s personal liability if the business fails would be:',
        opts: ['Limited to the amount she invested in the business', 'Unlimited — her personal assets could be used to pay business debts', 'Limited to £35,000 (the year 1 profit)', 'Zero — sole traders cannot be personally liable'],
        ans: 1, exp: 'Sole traders have unlimited liability — there is no legal separation between owner and business.' },
      { type: 'mcq', q: 'As a private limited company (Ltd), who can hold shares in the business?',
        opts: ['Anyone — shares can be listed on the Stock Exchange', 'Only private individuals and institutional investors who are offered them directly', 'The general public via a stock market listing', 'Only the sole director'],
        ans: 1, exp: 'An Ltd cannot offer shares to the general public. Shares are issued privately to invited individuals or organisations.' },
      { type: 'mcq', q: 'Which statement about a limited company is correct?',
        opts: ['The company and the owner are the same legal entity', 'The company is a separate legal entity from its owner(s)', 'All profits must be distributed to shareholders each year', 'An Ltd must have at least two directors'],
        ans: 1, exp: 'Incorporation creates a separate legal entity — the company can own assets, incur debts and sue/be sued in its own name.' },
      { type: 'mcq', q: 'One disadvantage of incorporation (setting up a Ltd) compared to a sole trader is:',
        opts: ['The owner has unlimited liability', 'Greater administrative burden — accounts must be filed at Companies House', 'Profits are taxed at a lower rate', 'The business cannot hire employees'],
        ans: 1, exp: 'Limited companies must file annual accounts with Companies House and comply with the Companies Act — this creates more administrative work than a sole trader.' },
    ],
    exp: 'Business structures: sole trader vs private limited company — liability, share issuance and compliance.' },

  { id: 'sc-024', topic: 'besy', difficulty: 'hard', type: 'scenario',
    setup: 'A coffee shop currently sells 600 cups per day at £3.00 each. Market research shows a 10% price increase would reduce demand to 480 cups per day. Meanwhile, a rival coffee shop increases its price by 20%, and demand for Bella\'s shop rises by 15%.',
    parts: [
      { type: 'mcq', q: 'The price elasticity of demand (PED) for the coffee shop\'s own product is:',
        opts: ['2.0', '0.5', '1.5', '3.0'],
        ans: 0, exp: 'PED = |% change in demand ÷ % change in price|. % change in demand = (480−600)/600 = −20%. PED = |−20% ÷ 10%| = 2.0.' },
      { type: 'mcq', q: 'With PED = 2.0, the demand is:',
        opts: ['Inelastic — a price rise will increase total revenue', 'Elastic — a price rise will reduce total revenue', 'Unit elastic — a price rise will leave total revenue unchanged', 'Perfectly inelastic — demand does not respond to price'],
        ans: 1, exp: 'PED > 1 means demand is elastic. When price rises by 10%, quantity falls by 20% — total revenue falls from £1,800 to £1,440 per day.' },
      { type: 'mcq', q: 'The cross-price elasticity of demand (XED) between the two shops is:',
        opts: ['+0.75', '−0.75', '+1.33', '−1.33'],
        ans: 0, exp: 'XED = % change in demand for shop A ÷ % change in price of shop B = +15% ÷ +20% = +0.75.' },
      { type: 'mcq', q: 'The positive XED value indicates that the two coffee shops are:',
        opts: ['Complementary goods', 'Substitute goods', 'Inferior goods', 'Luxury goods'],
        ans: 1, exp: 'A positive XED means when one product\'s price rises, demand for the other increases — they are substitutes (customers switch between them).' },
    ],
    exp: 'PED (own-price elasticity), revenue implications, and cross-price elasticity (XED) between substitute goods.' }
,

{ id: 'sc-025', topic: 'synoptic', difficulty: 'medium', type: 'scenario',
  setup: 'Hartley & Co is a sole trader selling office supplies. In March: credit sales £5,000 net (20% VAT standard-rated); credit purchases £3,000 net (20% VAT); fixed costs £800 paid cash; no payments received or made to suppliers/customers yet.',
  parts: [
    { type: 'mcq', q: 'VAT payable to HMRC for March?',
      opts: ['£1,600', '£600', '£400', '£1,000'],
      ans: 2, exp: 'Output VAT = £5,000 × 20% = £1,000. Input VAT = £3,000 × 20% = £600. Net VAT = £1,000 − £600 = £400.' },
    { type: 'mcq', q: 'After recording the credit sales (gross), the SLCA balance is:',
      opts: ['£5,000 debit', '£6,000 debit', '£3,000 credit', '£3,600 credit'],
      ans: 1, exp: 'SLCA is debited with the gross invoice amount = £5,000 + £1,000 VAT = £6,000. This represents total trade receivables.' },
    { type: 'mcq', q: 'Contribution for March (net sales minus variable cost of purchases):',
      opts: ['£1,200', '£2,000', '£800', '£1,400'],
      ans: 1, exp: 'Contribution = Net sales £5,000 − Variable cost of purchases £3,000 = £2,000. Fixed costs (£800) are excluded from contribution.' },
    { type: 'mcq', q: 'Hartley faces a large claim from a customer. As a sole trader:',
      opts: ['Liability is limited to the capital invested in the business', 'Personal assets can be seized to pay business debts', 'Liability is capped at the annual turnover figure', 'A sole trader cannot be sued — only the business entity is liable'],
      ans: 1, exp: 'Sole traders have unlimited liability. There is no legal separation between owner and business — creditors can pursue the owner\'s personal assets.' },
  ],
  exp: 'Cross-unit scenario covering VAT calculation (itbk), SLCA entries (pobc), contribution analysis (poc), and sole trader liability (besy).' },

{ id: 'sc-026', topic: 'synoptic', difficulty: 'hard', type: 'scenario',
  setup: 'Petrov Plumbing reaches its year end on 31 December. Events to account for: (1) A van purchased 1 July for £12,000 — depreciation policy: 20% reducing balance, pro-rated. (2) Insurance £1,200 paid 1 October, covering 12 months from that date. (3) An electricity bill of £300 for December not yet received. (4) Bank interest of £45 on the bank statement not entered in the cashbook.',
  parts: [
    { type: 'mcq', q: 'Van depreciation charge for the year (6 months):',
      opts: ['£2,400', '£1,200', '£600', '£1,800'],
      ans: 1, exp: 'Annual depreciation = £12,000 × 20% = £2,400. Pro-rated 6/12: £2,400 × 6/12 = £1,200.' },
    { type: 'mcq', q: 'Insurance prepayment at 31 December:',
      opts: ['£1,200', '£300', '£900', '£600'],
      ans: 2, exp: 'Insurance covers 12 months from 1 Oct. By 31 Dec, 3 months used. Prepayment = £1,200 × 9/12 = £900 (9 months remaining).' },
    { type: 'mcq', q: 'Journal for the December electricity bill:',
      opts: ['Dr Bank £300 / Cr Electricity £300', 'Dr Electricity £300 / Cr Accruals payable £300', 'Dr Prepayments £300 / Cr Electricity £300', 'Dr Accruals £300 / Cr Electricity £300'],
      ans: 1, exp: 'Unpaid expense = accrual. Dr Electricity expense (increases expense on IS) / Cr Accruals payable (creates current liability on SFP).' },
    { type: 'mcq', q: 'To update the cashbook for the £45 bank interest:',
      opts: ['Credit cashbook £45 (reduce balance)', 'Debit cashbook £45 (increase balance)', 'Record only in reconciliation statement, not cashbook', 'Debit bank statement £45'],
      ans: 1, exp: 'Bank interest is a receipt — increases the bank balance. Dr Cashbook £45 / Cr Interest received £45. Update cashbook first, then reconcile.' },
  ],
  exp: 'Cross-unit scenario covering depreciation, prepayments, accruals (itbk), and bank reconciliation updates (pobc).' },

{ id: 'sc-027', topic: 'poc', difficulty: 'hard', type: 'scenario',
  setup: 'Crafter Ltd considers launching BrightPen. Selling price £8.00/unit. Variable cost £3.20/unit. Fixed costs £19,200/year. Budgeted sales 6,000 units/year.',
  parts: [
    { type: 'mcq', q: 'Contribution per unit and CMR:',
      opts: ['£4.80 and 60%', '£3.20 and 40%', '£4.80 and 40%', '£5.00 and 62.5%'],
      ans: 0, exp: 'Contribution = £8.00 − £3.20 = £4.80. CMR = £4.80/£8.00 = 60%.' },
    { type: 'mcq', q: 'Break-even in units:',
      opts: ['5,000', '6,000', '4,000', '3,200'],
      ans: 2, exp: 'Break-even = £19,200 ÷ £4.80 = 4,000 units.' },
    { type: 'mcq', q: 'Margin of safety at 6,000 units as a % of budgeted sales:',
      opts: ['25%', '40%', '33%', '67%'],
      ans: 2, exp: 'MoS = (6,000 − 4,000) ÷ 6,000 = 2,000/6,000 = 33.3% ≈ 33%.' },
    { type: 'mcq', q: 'BrightPen\'s market has many sellers with slightly differentiated products. This is:',
      opts: ['A monopoly — one dominant seller', 'An oligopoly — a small number of large firms', 'Monopolistic competition — many sellers, differentiated products', 'Perfect competition — identical homogeneous products'],
      ans: 2, exp: 'Monopolistic competition: many buyers and sellers, products are differentiated (brand, features) but close substitutes. Most consumer goods markets fit this structure.' },
  ],
  exp: 'Cross-unit scenario covering contribution margin ratio, break-even, margin of safety (poc), and market structure classification (besy).' },

{ id: 'sc-028', topic: 'poc', difficulty: 'medium', type: 'scenario',
  setup: 'Birch Furniture buys and sells chairs. April inventory: Opening 20 units @ £45. Purchase 1 (5 Apr): 30 units @ £50. Purchase 2 (20 Apr): 50 units @ £54. Sale (25 Apr): 60 units at £90 each. All purchases are on credit.',
  parts: [
    { type: 'mcq', q: 'Weighted average cost per unit after both purchases:',
      opts: ['£49.00', '£51.00', '£52.00', '£54.00'],
      ans: 1, exp: 'Total units = 100. Cost = (20×£45)+(30×£50)+(50×£54) = £900+£1,500+£2,700 = £5,100. AVCO = £5,100÷100 = £51.00.' },
    { type: 'mcq', q: 'Cost of the 60 units sold (AVCO):',
      opts: ['£3,000', '£3,240', '£3,060', '£2,700'],
      ans: 2, exp: 'Cost of sales = 60 × £51.00 = £3,060.' },
    { type: 'mcq', q: 'Gross profit on the April sale:',
      opts: ['£2,100', '£2,400', '£2,340', '£5,400'],
      ans: 2, exp: 'Revenue = 60 × £90 = £5,400. Cost of sales (AVCO) = £3,060. Gross profit = £5,400 − £3,060 = £2,340.' },
    { type: 'mcq', q: 'The 30-unit credit purchase on 5 April affects the PLCA as:',
      opts: ['Debit PLCA £1,500', 'Credit PLCA £1,500', 'Debit PLCA £1,800', 'No effect — the PLCA only records cash payments'],
      ans: 1, exp: 'Credit purchases create a liability. Cr PLCA £1,500 / Dr Purchases £1,500. The PLCA credit represents the amount owed to the supplier (30 × £50).' },
  ],
  exp: 'Cross-unit scenario covering AVCO inventory valuation, cost of sales (itbk), gross profit (poc), and PLCA entries for credit purchases (pobc).' },

{ id: 'sc-029', topic: 'poc', difficulty: 'medium', type: 'scenario',
  setup: 'Meadow Bakery (sole trader, Sarah). Current position: 8,000 units/year at £6.00 each; variable cost £3.50/unit; fixed costs £12,000/year. Sarah is considering a £15,000 bank loan at 8% annual interest to buy equipment that would cut variable cost by £1.50/unit.',
  parts: [
    { type: 'mcq', q: 'Current annual contribution and profit:',
      opts: ['Contribution £2.50/unit; profit £8,000', 'Contribution £2.50/unit; profit £20,000', 'Contribution £3.50/unit; profit £16,000', 'Contribution £2.50/unit; profit £12,000'],
      ans: 0, exp: 'Contribution = £6.00 − £3.50 = £2.50/unit. Total contribution = 8,000 × £2.50 = £20,000. Profit = £20,000 − £12,000 = £8,000.' },
    { type: 'mcq', q: 'Annual profit after the investment (8,000 units):',
      opts: ['£12,000', '£16,800', '£18,800', '£20,000'],
      ans: 2, exp: 'New variable cost = £3.50 − £1.50 = £2.00. Contribution = £4.00/unit × 8,000 = £32,000. New fixed costs = £12,000 + (£15,000 × 8%) = £13,200. Profit = £32,000 − £13,200 = £18,800.' },
    { type: 'mcq', q: 'The bank loan is an example of:',
      opts: ['Equity finance (share capital)', 'Internal finance (retained profits)', 'External debt finance', 'Trade credit from suppliers'],
      ans: 2, exp: 'A bank loan is external debt finance — borrowed from outside the business with interest, requiring repayment. It does not dilute ownership unlike equity finance.' },
    { type: 'mcq', q: 'By using a loan rather than a business partner, Sarah:',
      opts: ['Gains limited liability protection automatically', 'Retains full control and all profits but bears unlimited personal liability for the loan', 'Must register as a limited company to borrow more than £10,000', 'Avoids all personal liability as the loan is a business debt'],
      ans: 1, exp: 'As a sole trader, Sarah keeps 100% control and profits but has unlimited liability — the bank can pursue her personal assets if the loan is not repaid.' },
  ],
  exp: 'Cross-unit scenario covering contribution and profit analysis (poc), types of business finance, and sole trader unlimited liability (besy).' },

{ id: 'sc-030', topic: 'synoptic', difficulty: 'hard', type: 'scenario',
  setup: 'Whitmore Ltd\'s bookkeeper finds three errors after the trial balance: (1) Office equipment £2,500 posted as Dr Office expenses / Cr Bank — should be Dr Equipment / Cr Bank. (2) A credit sale of £800 entered in the sales day book as £80. (3) Bank charges £120 on the bank statement not in the cashbook.',
  parts: [
    { type: 'mcq', q: 'Error 1 (equipment posted to office expenses) is:',
      opts: ['Error of omission', 'Error of original entry', 'Error of commission', 'Error of principle'],
      ans: 3, exp: 'An error of principle is posting to the wrong class of account — a capital/asset item (equipment) posted to a revenue/expense account (office expenses). This breaks the capital vs revenue distinction.' },
    { type: 'mcq', q: 'Journal to correct Error 1:',
      opts: ['Dr Equipment £2,500 / Cr Bank £2,500', 'Dr Office expenses £2,500 / Cr Equipment £2,500', 'Dr Equipment £2,500 / Cr Office expenses £2,500', 'Dr Bank £2,500 / Cr Equipment £2,500'],
      ans: 2, exp: 'Reverse the wrong debit and post to the correct account: Dr Equipment (the asset) / Cr Office expenses (removing the wrong posting). Bank was correctly credited.' },
    { type: 'mcq', q: 'Error 2 (£800 sale entered as £80) means the trial balance:',
      opts: ['Does not balance — debit total exceeds credit by £720', 'Does not balance — credit total exceeds debit by £720', 'Balances, but SLCA and Sales are both understated by £720', 'Balances, but SLCA is overstated and Sales is understated'],
      ans: 2, exp: 'The same wrong amount (£80) posts to both SLCA (Dr) and Sales (Cr). The TB still balances, but both accounts are understated by £720 (£800 − £80). This is an error of original entry.' },
    { type: 'mcq', q: 'To update the cashbook for Error 3 (bank charges £120):',
      opts: ['Debit cashbook £120 (increase balance)', 'Credit cashbook £120 (reduce balance)', 'Add £120 to bank statement balance in reconciliation', 'Ignore until next period\'s statement'],
      ans: 1, exp: 'Bank charges are a payment from the account — they reduce the cash balance. Cr Cashbook £120 / Dr Bank charges expense £120. Update the cashbook first, then prepare the reconciliation.' },
  ],
  exp: 'Cross-unit scenario covering error types and correction journals (pobc), trial balance effects, and bank reconciliation cashbook updates (pobc/itbk).' }

);

/* ── EXPANDED CONTENT: harder MCQs, scenario, and table-fill questions ── */
window.ALL_QUESTIONS.push(

  // ── ITBK additional hard questions ──────────────────────────────────────

  { id: 'itbk-200', topic: 'itbk', difficulty: 'hard', type: 'mcq',
    q: 'The imprest petty cash fund is set at £150. At month-end, receipts total £112 and cash remaining in the tin is £38. What is the reimbursement cheque raised?',
    opts: ['£38', '£112', '£150', '£74'],
    ans: 1,
    exp: 'Under the imprest system the reimbursement always equals total vouchers (£112), restoring the fund to £150. Check: £38 + £112 = £150 ✓.' },

  { id: 'itbk-201', topic: 'itbk', difficulty: 'hard', type: 'mcq',
    q: 'A supplier sends a credit note for £200 net (plus VAT at 20%). How is this recorded in the BUYER\'s books?',
    opts: [
      'Dr PLCA £240, Cr Purchase returns £200, Cr VAT £40',
      'Dr Purchase returns £200, Dr VAT £40, Cr PLCA £240',
      'Dr PLCA £200, Cr Purchase returns £200',
      'Dr Purchase returns £240, Cr PLCA £240'],
    ans: 0,
    exp: 'A credit note from a supplier reduces what is owed: Dr PLCA £240 (gross). The credit note net reduces Purchase returns (Cr £200) and input VAT is recovered (Cr VAT £40). Debits must equal credits: £240 = £240.' },

  { id: 'itbk-202', topic: 'itbk', difficulty: 'hard', type: 'mcq',
    q: 'A contra (set-off) is used where a business owes a supplier £600 (PLCA) and is also owed £600 by the same party as a customer (SLCA). What is the double entry?',
    opts: [
      'Dr PLCA £600, Cr SLCA £600',
      'Dr SLCA £600, Cr PLCA £600',
      'Dr Bank £600, Cr PLCA £600 and separately Dr SLCA £600, Cr Bank £600',
      'No entries needed — debts cancel automatically'],
    ans: 0,
    exp: 'A contra: Dr PLCA £600 (remove the payable) / Cr SLCA £600 (remove the receivable). No cash moves. The entry must also appear in the individual personal accounts for both the payables and receivables ledger.' },

  { id: 'itbk-203', topic: 'itbk', difficulty: 'hard', type: 'mcq',
    q: 'At 1 April the SLCA has a Dr balance of £3,200. During April: credit sales £12,000; customer receipts £10,500; sales returns £400; discounts allowed £150; bad debt written off £200. What is the closing SLCA balance?',
    opts: ['£4,150', '£3,950', '£3,750', '£4,350'],
    ans: 1,
    exp: 'Dr side: £3,200 + £12,000 = £15,200. Cr side: £10,500 + £400 + £150 + £200 = £11,250. Closing balance: £15,200 − £11,250 = £3,950 Dr.' },

  { id: 'itbk-204', topic: 'itbk', difficulty: 'hard', type: 'mcq',
    q: 'Which of the following items appears on the CREDIT (payments) side of the cash book?',
    opts: [
      'Cash received from a credit customer',
      'BACS receipt from a customer',
      'Standing order payment to a supplier',
      'Opening bank balance (in credit)'],
    ans: 2,
    exp: 'The credit side records PAYMENTS out of the bank. A standing order to a supplier is a payment. All receipts (options A, B) appear on the debit side. An opening balance in credit would be a debit opening entry.' },

  { id: 'itbk-205', topic: 'itbk', difficulty: 'hard', type: 'mcq',
    q: 'A customer settles their balance of £2,000 within the discount period, paying £1,960. What is the double entry for the DISCOUNT ALLOWED?',
    opts: [
      'Dr Discounts allowed £40, Cr SLCA £40',
      'Dr SLCA £40, Cr Discounts allowed £40',
      'Dr Bank £1,960, Cr SLCA £2,000; no separate entry for discount',
      'Dr Discounts allowed £40, Cr Bank £40'],
    ans: 0,
    exp: '2% discount = £40. Expense: Dr Discounts allowed £40 / Cr SLCA £40. Plus separately Dr Bank £1,960 / Cr SLCA £1,960. In a three-column cash book the discount column is a memorandum; at month-end the total is posted Dr Discounts allowed / Cr SLCA.' },

  { id: 'itbk-206', topic: 'itbk', difficulty: 'hard', type: 'mcq',
    q: 'In a three-column cash book, discounts RECEIVED appear:',
    opts: [
      'On the debit (receipts) side in the discount column',
      'On the credit (payments) side in the discount column',
      'On the credit side as income received',
      'Only in the general ledger — not in the cash book'],
    ans: 1,
    exp: 'Discounts received reduce amounts paid to suppliers. They appear on the credit (payments) side memo column. At month-end the column total is posted: Dr PLCA / Cr Discounts received — the income entry enters the general ledger at that point.' },

  { id: 'itbk-207', topic: 'itbk', difficulty: 'hard', type: 'mcq',
    q: 'The SLCA shows £22,500 but the total of the sales ledger listing is £21,900 (SLCA is higher by £600). Which error would cause this?',
    opts: [
      'A sales invoice of £600 posted to the SLCA but NOT to the individual customer account',
      'Cash of £600 received from a customer posted to the individual account but NOT to the SLCA',
      'A credit note of £600 posted to the individual account but not to the SLCA',
      'Discounts allowed of £300 entered twice in the SLCA'],
    ans: 0,
    exp: 'Option A: Dr SLCA £600 (increases the control account) but the individual customer account is not updated — the listing stays the same. SLCA is therefore £600 higher than the listing ✓. This is the standard textbook cause: invoice posted to the control account but omitted from the personal ledger.' },

  { id: 'itbk-208', topic: 'itbk', difficulty: 'hard', type: 'mcq',
    q: 'When a business receives a credit note from a supplier (gross £480, VAT £80), which account is CREDITED?',
    opts: [
      'PLCA (reduces the liability)',
      'Purchase returns (reduces expense)',
      'VAT control (input VAT recovered)',
      'Bank (cash refund expected)'],
    ans: 1,
    exp: 'Dr PLCA £480 / Cr Purchase returns £400 / Cr VAT control £80. The PLCA is debited (reducing the creditor). Purchase returns and VAT control are credited.' },

  { id: 'itbk-209', topic: 'itbk', difficulty: 'hard', type: 'mcq',
    q: 'A bad debt of £840 is written off. The customer was VAT-registered and the original invoice included VAT at 20%. What is the VAT element that can be reclaimed (if the business uses the standard VAT accounting scheme)?',
    opts: ['£840', '£700', '£140', '£168'],
    ans: 2,
    exp: '£840 gross ÷ 6 = £140 VAT (the "VAT fraction" for 20% is 1/6). Net = £700. The business can reclaim £140 output VAT as bad debt relief from HMRC (subject to 6-month rule). Journal: Dr Bad debt expense £700, Dr VAT £140, Cr SLCA £840.' },

  // ── POBC additional hard questions ──────────────────────────────────────

  { id: 'pobc-200', topic: 'pobc', difficulty: 'hard', type: 'mcq',
    q: 'Which of the following is a TIMING DIFFERENCE in a bank reconciliation (i.e., it appears on the bank statement but NOT in the cash book, or vice versa)?',
    opts: [
      'A direct debit for rent that the bookkeeper forgot to enter in the cash book',
      'An unpresented cheque written and recorded in the cash book but not yet cleared the bank',
      'Bank charges omitted from the cash book',
      'A standing order payment recorded in neither the cash book nor the bank statement'],
    ans: 1,
    exp: 'An unpresented (uncleared) cheque: the business recorded it in the cash book when it was written, but the bank has not yet processed it — a classic timing difference. Options A and C are errors/omissions requiring cash book updates. Option D has not yet occurred in either record.' },

  { id: 'pobc-201', topic: 'pobc', difficulty: 'hard', type: 'mcq',
    q: 'Which error would cause the debit side of the trial balance to exceed the credit side by £400 (requiring a credit entry to a suspense account of £400)?',
    opts: [
      'A credit sale of £400 omitted from all ledgers',
      'A purchase invoice for £400 posted Dr Purchases £400, Cr PLCA £400 (both correct)',
      'Rent of £400 debited to the rent account but no credit entry made',
      'A sales receipt of £400 posted Dr Bank £400, Cr Bank £400'],
    ans: 2,
    exp: 'Option C: Dr Rent £400 with no corresponding credit creates a debit excess of £400. A credit suspense entry of £400 is opened to restore balance. Option A is a complete omission (both sides missing — no imbalance). Options B and D are correctly balanced double entries.' },

  { id: 'pobc-202', topic: 'pobc', difficulty: 'hard', type: 'mcq',
    q: 'A purchase of equipment for £3,000 is posted to the office expenses account. What type of error is this?',
    opts: [
      'Error of omission',
      'Error of commission',
      'Error of principle',
      'Error of original entry'],
    ans: 2,
    exp: 'An error of principle occurs when a transaction is posted to the correct side but the WRONG CLASS of account — here, a capital/non-current asset (equipment) is recorded as a revenue expense (office expenses). The capital vs revenue distinction is violated.' },

  { id: 'pobc-203', topic: 'pobc', difficulty: 'hard', type: 'mcq',
    q: 'A transposition error occurs when rent of £450 is posted as £540. The trial balance total shows debits exceed credits by:',
    opts: ['£90', '£45', '£450', '£540'],
    ans: 0,
    exp: '£540 − £450 = £90. The same single amount is wrong on one side, creating a £90 imbalance. Transposition errors always produce a difference divisible by 9 (here 90 ÷ 9 = 10 — a useful check). A suspense account of £90 Cr would be opened to restore balance.' },

  { id: 'pobc-204', topic: 'pobc', difficulty: 'hard', type: 'mcq',
    q: 'On a standard UK VAT return, Box 1 represents:',
    opts: [
      'Total input tax reclaimed',
      'VAT due on EC acquisitions',
      'VAT charged on sales (output tax)',
      'Net VAT payable or reclaimable'],
    ans: 2,
    exp: 'Box 1 = VAT due on sales and other outputs (output tax). Box 4 = input tax reclaimed. Box 5 = net: Box 1 minus Box 4. If Box 5 is positive, the business pays HMRC; if negative, HMRC refunds the business.' },

  { id: 'pobc-205', topic: 'pobc', difficulty: 'hard', type: 'mcq',
    q: 'A business has output VAT of £18,400 and input VAT of £11,750 for the quarter. What amount is payable to HMRC?',
    opts: ['£18,400', '£11,750', '£6,650', '£30,150'],
    ans: 2,
    exp: 'Net VAT = Output VAT − Input VAT = £18,400 − £11,750 = £6,650 payable to HMRC (entered in Box 5 of the VAT return).' },

  { id: 'pobc-206', topic: 'pobc', difficulty: 'hard', type: 'mcq',
    q: 'The PLCA balance is £13,600 but the total of individual supplier balances is £14,200. The list is higher than the PLCA by £600. Which error would explain this?',
    opts: [
      'A purchase invoice of £600 posted to the PLCA but not to the individual supplier account',
      'A payment of £600 posted to the PLCA (Dr) but not to the individual account',
      'A purchase return of £600 posted to both the PLCA and individual account correctly',
      'A contra entry of £600 entered twice in the PLCA'],
    ans: 1,
    exp: 'If a payment of £600 was Dr PLCA (reducing it) but the individual account was NOT updated, the PLCA balance falls by £600 while the listing stays the same — list becomes £600 higher than PLCA ✓. Option A would make PLCA higher (Cr PLCA, no matching individual entry). Option C correctly matches — no difference. Option D would reduce PLCA twice.' },

  { id: 'pobc-207', topic: 'pobc', difficulty: 'hard', type: 'mcq',
    q: 'Which of the following errors does NOT affect the trial balance agreement?',
    opts: [
      'A purchase of £750 debited to both the purchases account and the PLCA (two debits, no credit)',
      'Rent of £600 debited to the rent account but the bank was credited with only £540',
      'A credit sale of £400 not recorded anywhere in the ledger',
      'A debit of £200 to wages with no corresponding credit entry'],
    ans: 2,
    exp: 'Option C is a complete omission — both the Dr (SLCA) and the Cr (Sales) entries are missing. Both sides are equally understated so the TB still agrees. Option A has two debits but no credit (Dr excess). Option B has Dr £600 and Cr £540 (£60 imbalance). Option D has only a debit and no credit — all three create TB imbalances.' },

  { id: 'pobc-208', topic: 'pobc', difficulty: 'hard', type: 'mcq',
    q: 'A bank reconciliation shows: cash book balance £5,100; unpresented cheques £850; outstanding lodgements £1,200. What should the bank statement balance be?',
    opts: ['£5,100', '£4,750', '£5,450', '£6,150'],
    ans: 1,
    exp: 'Bank statement balance = Cash book balance + Unpresented cheques − Outstanding lodgements = £5,100 + £850 − £1,200 = £4,750. (Cheques written but not cleared inflate the cash book; lodgements paid in but not shown yet inflate the statement.)' },

  { id: 'pobc-209', topic: 'pobc', difficulty: 'hard', type: 'mcq',
    q: 'After updating the cash book, the balance is £3,800 Dr. Unpresented cheques total £650 and outstanding lodgements total £420. The bank statement should show:',
    opts: ['£3,800', '£4,030', '£3,570', '£4,870'],
    ans: 1,
    exp: 'Statement balance = £3,800 + £650 − £420 = £4,030. The bank has not yet processed the unpresented cheques (so its balance is higher) and has not yet shown the lodgements (so its balance is lower than the cash book after lodgements).' },

  // ── POC additional hard questions ───────────────────────────────────────

  { id: 'poc-200', topic: 'poc', difficulty: 'hard', type: 'mcq',
    q: 'Using the high-low method: at 900 units total cost is £7,400; at 400 units total cost is £4,400. What is the variable cost per unit?',
    opts: ['£6', '£5', '£8', '£3'],
    ans: 0,
    exp: 'Variable cost per unit = (High cost − Low cost) ÷ (High units − Low units) = (£7,400 − £4,400) ÷ (900 − 400) = £3,000 ÷ 500 = £6 per unit.' },

  { id: 'poc-201', topic: 'poc', difficulty: 'hard', type: 'mcq',
    q: 'Using the high-low data (900 units, £7,400; 400 units, £4,400 and variable cost £6/unit), what is the total FIXED cost?',
    opts: ['£1,600', '£3,000', '£2,000', '£4,400'],
    ans: 2,
    exp: 'Fixed cost = Total cost − (Variable cost × units). Using the high point: £7,400 − (£6 × 900) = £7,400 − £5,400 = £2,000. Verified at low point: £4,400 − (£6 × 400) = £4,400 − £2,400 = £2,000 ✓.' },

  { id: 'poc-202', topic: 'poc', difficulty: 'hard', type: 'mcq',
    q: 'Budgeted factory overheads are £54,000 and budgeted machine hours are 9,000. Actual overheads incurred were £56,200 and actual machine hours worked were 9,000. What is the overhead absorption rate (OAR)?',
    opts: ['£6.00 per machine hour', '£6.24 per machine hour', '£54,000 in total', '£56,200 in total'],
    ans: 0,
    exp: 'OAR = Budgeted overheads ÷ Budgeted activity = £54,000 ÷ 9,000 = £6.00 per machine hour. The OAR is ALWAYS calculated using budgeted figures, not actual.' },

  { id: 'poc-203', topic: 'poc', difficulty: 'hard', type: 'mcq',
    q: 'Using the OAR of £6 per machine hour: actual machine hours worked were 9,000 but actual overheads incurred were £56,200. What is the absorption outcome?',
    opts: [
      'Over-absorbed by £2,200 — credit P&L',
      'Under-absorbed by £2,200 — debit P&L',
      'Over-absorbed by £2,200 — debit P&L',
      'Under-absorbed by £2,200 — credit P&L'],
    ans: 1,
    exp: 'Absorbed = 9,000 × £6 = £54,000. Actual = £56,200. Absorbed < Actual → under-absorbed by £2,200. Under-absorption means costs were understated in product costs, so the shortfall is charged to P&L (debited as additional cost).' },

  { id: 'poc-204', topic: 'poc', difficulty: 'hard', type: 'mcq',
    q: 'A product sells for £40. Direct materials £12, direct labour £8, variable overhead £5, fixed overhead £6. What is the contribution per unit?',
    opts: ['£15', '£9', '£25', '£21'],
    ans: 0,
    exp: 'Contribution = Selling price − ALL variable costs = £40 − £12 − £8 − £5 = £15. Fixed overhead is excluded from marginal costing contribution calculations (it is a period cost).' },

  { id: 'poc-205', topic: 'poc', difficulty: 'hard', type: 'mcq',
    q: 'Fixed costs are £45,000, contribution per unit is £15, budgeted sales are 5,000 units. What is the margin of safety as a percentage of budgeted sales?',
    opts: ['28%', '40%', '60%', '12%'],
    ans: 1,
    exp: 'Break-even = £45,000 ÷ £15 = 3,000 units. Margin of safety = 5,000 − 3,000 = 2,000 units. MoS% = (2,000 ÷ 5,000) × 100 = 40%.' },

  { id: 'poc-206', topic: 'poc', difficulty: 'hard', type: 'mcq',
    q: 'Which of the following is a DIRECT cost?',
    opts: [
      'Factory manager\'s salary',
      'Depreciation of production machinery',
      'Timber used in manufacturing chairs',
      'Factory rent and rates'],
    ans: 2,
    exp: 'A direct cost is directly traceable to a specific unit of output. Timber used in a chair can be measured per chair — it is a direct material. Factory manager salary, depreciation and rent cannot be traced to individual units; they are indirect (overhead) costs.' },

  { id: 'poc-207', topic: 'poc', difficulty: 'hard', type: 'mcq',
    q: 'Inventory records using AVCO: opening balance 200 units at £4.00. Purchase: 300 units at £5.00. What is the new weighted average cost per unit (to 2 d.p.)?',
    opts: ['£4.50', '£4.60', '£4.00', '£5.00'],
    ans: 1,
    exp: 'New AVCO = Total cost ÷ Total units = ((200 × £4.00) + (300 × £5.00)) ÷ (200 + 300) = (£800 + £1,500) ÷ 500 = £2,300 ÷ 500 = £4.60 per unit.' },

  { id: 'poc-208', topic: 'poc', difficulty: 'hard', type: 'mcq',
    q: 'Under marginal costing, fixed production overheads are:',
    opts: [
      'Absorbed into each unit of production',
      'Carried forward in closing inventory valuation',
      'Written off in full as a period cost in the period incurred',
      'Allocated to cost centres based on machine hours'],
    ans: 2,
    exp: 'Marginal costing treats ALL fixed costs as period costs — they are charged in full to the P&L in the period incurred, regardless of production volume. This contrasts with absorption costing where fixed overheads are included in unit costs and therefore carried forward in inventory.' },

  { id: 'poc-209', topic: 'poc', difficulty: 'hard', type: 'mcq',
    q: 'A job requires 15 kg of material at £8/kg, 6 hours of direct labour at £12/hr, and overheads absorbed at £5 per labour hour. What is the total job cost?',
    opts: ['£282', '£252', '£222', '£312'],
    ans: 2,
    exp: 'Material: 15 × £8 = £120. Labour: 6 × £12 = £72. Overhead: 6 × £5 = £30. Total: £120 + £72 + £30 = £222.' },

  // ── BESY additional hard questions ──────────────────────────────────────

  { id: 'besy-200', topic: 'besy', difficulty: 'hard', type: 'mcq',
    q: 'Current assets: inventory £14,000; trade receivables £22,000; bank £8,000. Current liabilities: trade payables £18,000; accruals £4,000. What is the current ratio?',
    opts: ['2:1', '1.5:1', '1.1:1', '2.5:1'],
    ans: 0,
    exp: 'Current assets = £14,000 + £22,000 + £8,000 = £44,000. Current liabilities = £18,000 + £4,000 = £22,000. Current ratio = £44,000 ÷ £22,000 = 2:1.' },

  { id: 'besy-201', topic: 'besy', difficulty: 'hard', type: 'mcq',
    q: 'Using the same data (inventory £14,000; receivables £22,000; bank £8,000; CL £22,000), what is the acid test (quick) ratio?',
    opts: ['2:1', '1.36:1', '1.5:1', '0.64:1'],
    ans: 1,
    exp: 'Quick assets = Current assets − Inventory = £44,000 − £14,000 = £30,000. Acid test = £30,000 ÷ £22,000 = 1.36:1 (to 2 d.p.). Inventory is excluded because it may not be quickly convertible to cash.' },

  { id: 'besy-202', topic: 'besy', difficulty: 'hard', type: 'mcq',
    q: 'A company had retained earnings of £28,000 at the start of the year. Profit after tax for the year is £15,000. Dividends paid are £6,000. What are the closing retained earnings?',
    opts: ['£43,000', '£37,000', '£22,000', '£49,000'],
    ans: 1,
    exp: 'Closing retained earnings = Opening £28,000 + Profit £15,000 − Dividends £6,000 = £37,000.' },

  { id: 'besy-203', topic: 'besy', difficulty: 'hard', type: 'mcq',
    q: 'A business does not include future anticipated sales as income until goods have been delivered and the performance obligation met. Which accounting concept does this reflect?',
    opts: [
      'Accruals (matching), recognising income when it is earned',
      'Prudence, recognising losses as soon as they are anticipated',
      'Going concern, assuming the business continues to trade',
      'Consistency, applying the same policies from year to year',
    ],
    ans: 0,
    exp: 'The accruals (or matching) concept requires income to be recognised when earned — when performance obligations are met — not when cash is received or orders placed. This aligns income recognition with the period of economic activity.' },

  { id: 'besy-204', topic: 'besy', difficulty: 'hard', type: 'mcq',
    q: 'A non-current asset costs £24,000 with a residual value of £4,000. Using the straight-line method over 5 years, what is the annual depreciation charge?',
    opts: ['£4,800', '£4,000', '£5,000', '£3,200'],
    ans: 1,
    exp: 'SL depreciation = (Cost − Residual value) ÷ Useful life = (£24,000 − £4,000) ÷ 5 = £20,000 ÷ 5 = £4,000 per year.' },

  { id: 'besy-205', topic: 'besy', difficulty: 'hard', type: 'mcq',
    q: 'A company\'s capital structure: £100,000 ordinary share capital, £40,000 retained earnings, £60,000 long-term loan. What is the gearing ratio (debt ÷ equity)?',
    opts: ['37.5%', '42.9%', '60%', '150%'],
    ans: 1,
    exp: 'Equity = £100,000 + £40,000 = £140,000. Debt = £60,000. Gearing = £60,000 ÷ £140,000 = 42.9% (to 1 d.p.). A ratio above 50% is generally considered high gearing.' },

  { id: 'besy-206', topic: 'besy', difficulty: 'hard', type: 'mcq',
    q: 'Revenue is £180,000; trade receivables are £30,000. What are the receivables collection days (to the nearest day)?',
    opts: ['61 days', '45 days', '90 days', '30 days'],
    ans: 0,
    exp: 'Receivables days = (Trade receivables ÷ Revenue) × 365 = (£30,000 ÷ £180,000) × 365 = 60.8 ≈ 61 days.' },

  { id: 'besy-207', topic: 'besy', difficulty: 'hard', type: 'mcq',
    q: 'Cost of sales is £96,000; closing inventory is £16,000. What are inventory days (to the nearest day)?',
    opts: ['61 days', '73 days', '45 days', '37 days'],
    ans: 0,
    exp: 'Inventory days = (Inventory ÷ Cost of sales) × 365 = (£16,000 ÷ £96,000) × 365 = 60.8 ≈ 61 days.' },

  { id: 'besy-208', topic: 'besy', difficulty: 'hard', type: 'mcq',
    q: 'Revenue is £200,000; gross profit is £70,000. What is the gross profit margin?',
    opts: ['35%', '30%', '42%', '65%'],
    ans: 0,
    exp: 'Gross profit margin = (Gross profit ÷ Revenue) × 100 = (£70,000 ÷ £200,000) × 100 = 35%.' },

  { id: 'besy-209', topic: 'besy', difficulty: 'hard', type: 'mcq',
    q: 'Which item would reduce the NET PROFIT MARGIN but NOT the gross profit margin?',
    opts: [
      'An increase in the cost of materials',
      'Higher direct labour costs',
      'An increase in administrative salaries',
      'A fall in selling price'],
    ans: 2,
    exp: 'Gross profit = Revenue − Cost of sales (direct costs). Net profit = Gross profit − Operating expenses. Administrative salaries are operating (indirect) expenses: they appear below gross profit, so they reduce net profit margin but do not affect gross profit margin.' },

  // ── SCENARIO QUESTIONS ───────────────────────────────────────────────────

  { id: 'sc-031', topic: 'itbk', difficulty: 'hard', type: 'scenario',
    setup: 'Kelsey & Co keeps a three-column cash book. On 30 June the cash book shows a debit (bank) balance of £4,850. The bank statement at the same date shows £4,200. On checking: (i) a BACS receipt of £620 from a customer appears on the statement but not in the cash book; (ii) unpresented cheques total £1,300; (iii) a direct debit for business rates of £370 appears on the statement but not in the cash book; (iv) outstanding lodgements total £400.',
    parts: [
      { type: 'mcq', q: 'Which items require an UPDATE to the cash book before reconciling?',
        opts: [
          'Unpresented cheques and outstanding lodgements only',
          'BACS receipt and the direct debit only',
          'All four items',
          'Only the direct debit'],
        ans: 1,
        exp: 'Cash book updates are needed for items on the bank statement NOT yet in the cash book: (i) BACS receipt £620 Dr cash book, and (iii) direct debit £370 Cr cash book. Unpresented cheques and outstanding lodgements are timing differences — they appear in the reconciliation statement but do NOT change the cash book.' },
      { type: 'numeric', q: 'After updating the cash book for the BACS receipt and direct debit, what is the revised cash book balance (£)?',
        answer: 5100, unit: '£',
        exp: '£4,850 + £620 (BACS receipt, Dr) − £370 (direct debit, Cr) = £5,100.' },
      { type: 'numeric', q: 'Using the bank statement balance of £4,200, calculate the reconciled figure after adding unpresented cheques and deducting outstanding lodgements (£).',
        answer: 5100, unit: '£',
        exp: 'Statement £4,200 + unpresented cheques £1,300 − outstanding lodgements £400 = £5,100. This should equal the updated cash book balance — the reconciliation agrees ✓.' },
      { type: 'mcq', q: 'Unpresented cheques in the bank reconciliation are treated as:',
        opts: [
          'An addition to the cash book balance',
          'A deduction from the cash book balance',
          'An addition to the bank statement balance',
          'A deduction from the bank statement balance'],
        ans: 2,
        exp: 'Unpresented cheques have been recorded in the cash book (reducing it) but not yet cleared the bank (so the bank balance is still higher by that amount). When reconciling from bank statement to cash book: Statement + Unpresented − Lodgements = Cash book balance.' },
    ],
    exp: 'A full bank reconciliation workflow — cash book updates for bank-only items, then timing-difference reconciliation.' },

  { id: 'sc-032', topic: 'poc', difficulty: 'hard', type: 'scenario',
    setup: 'Oakwood Furniture Ltd has the following inventory movements for timber in March: Opening balance 100 units @ £10.00. Purchase 1: 200 units @ £11.00. Issue to production: 150 units. Purchase 2: 100 units @ £12.00. Issue to production: 180 units.',
    parts: [
      { type: 'numeric', q: 'Using FIFO, what is the cost of the first issue of 150 units (£)?',
        answer: 1550, unit: '£',
        exp: 'FIFO — oldest stock first. First issue 150 units: 100 units from opening @ £10 = £1,000; 50 units from Purchase 1 @ £11 = £550. Total = £1,550.' },
      { type: 'numeric', q: 'After the first issue (FIFO), what is the value of inventory remaining before Purchase 2?',
        answer: 1650, unit: '£',
        exp: 'After issue: 150 units from Purchase 1 remain @ £11 = £1,650. (200 − 50 = 150 units left from Purchase 1.)' },
      { type: 'mcq', q: 'Under AVCO, which statement is correct about the effect on profits compared to FIFO during a period of rising prices?',
        opts: [
          'AVCO gives higher closing inventory and higher profit than FIFO',
          'FIFO gives higher closing inventory and higher profit than AVCO',
          'AVCO and FIFO always give the same profit',
          'FIFO gives lower cost of sales and lower profit than AVCO'],
        ans: 1,
        exp: 'When prices are rising, FIFO issues older (cheaper) stock first, leaving newer (more expensive) stock in closing inventory. This gives HIGHER closing inventory value and LOWER cost of sales, resulting in HIGHER profit than AVCO.' },
      { type: 'mcq', q: 'Which inventory valuation method gives a closing inventory value closest to current replacement cost when prices are rising?',
        opts: ['FIFO', 'AVCO', 'LIFO', 'Standard cost'],
        ans: 0,
        exp: 'Under FIFO, closing inventory consists of the most recently purchased units — at the most current prices. This gives a closing inventory value closest to current replacement cost.' },
    ],
    exp: 'Inventory valuation using FIFO and AVCO, and their comparative impact on profit during price changes.' },

  { id: 'sc-033', topic: 'besy', difficulty: 'hard', type: 'scenario',
    setup: 'Hartley Retail Ltd reports: Revenue £240,000; Cost of sales £144,000; Operating expenses £52,000. Statement of financial position: Non-current assets £85,000; Inventory £18,000; Receivables £36,000; Cash £6,000; Trade payables £24,000; Long-term loan £40,000; Share capital £50,000; Retained earnings £31,000.',
    parts: [
      { type: 'numeric', q: 'What is the gross profit (£)?',
        answer: 96000, unit: '£',
        exp: 'Gross profit = Revenue − Cost of sales = £240,000 − £144,000 = £96,000.' },
      { type: 'numeric', q: 'What is the net profit (£)?',
        answer: 44000, unit: '£',
        exp: 'Net profit = Gross profit − Operating expenses = £96,000 − £52,000 = £44,000.' },
      { type: 'numeric', q: 'What is the current ratio (to 2 d.p.)?',
        answer: 2.50, unit: ':1',
        exp: 'Current assets = £18,000 + £36,000 + £6,000 = £60,000. Current liabilities = £24,000. Current ratio = £60,000 ÷ £24,000 = 2.50:1.' },
      { type: 'mcq', q: 'The net profit margin for Hartley Retail Ltd is closest to:',
        opts: ['40%', '18.3%', '16.7%', '22.5%'],
        ans: 1,
        exp: 'Net profit margin = (Net profit ÷ Revenue) × 100 = (£44,000 ÷ £240,000) × 100 = 18.3%.' },
    ],
    exp: 'Ratio analysis and financial statement reading — gross profit, net profit, and current ratio from given data.' },

  { id: 'sc-034', topic: 'pobc', difficulty: 'hard', type: 'scenario',
    setup: 'Finch & Partners\' trial balance does not agree. A suspense account has been opened with a credit balance of £630. Investigation reveals three errors: (1) A sales invoice for £270 was entered as a debit to both the Sales account AND the SLCA. (2) Rent paid £900 was entered in the cash book correctly but posted to the Rent account as £990. (3) A purchase of stationery for £180 was completely omitted from the ledger.',
    parts: [
      { type: 'mcq', q: 'Error 1 (invoice debited to Sales AND SLCA) — what type of error is this?',
        opts: ['Error of principle', 'Error of commission', 'Error of reversal of entries', 'Compensating error'],
        ans: 2,
        exp: 'The correct entry should be Dr SLCA £270 / Cr Sales £270. Instead, both Sales and SLCA were debited — the credit entry for Sales was replaced by a debit. This is an error of reversal of entries (complete reversal), creating a Dr excess of £540 (Dr SLCA £270 + Dr Sales £270, with no corresponding Cr).' },
      { type: 'mcq', q: 'What is the journal to correct Error 2 (rent posted as £990 instead of £900)?',
        opts: [
          'Dr Rent £90, Cr Suspense £90',
          'Dr Suspense £90, Cr Rent £90',
          'Dr Rent £990, Cr Rent £900, Cr Suspense £90',
          'Dr Cash £90, Cr Rent £90'],
        ans: 1,
        exp: 'Rent was over-debited by £90 (£990 − £900). Correct by reducing the rent account: Dr Suspense £90 / Cr Rent £90. The cash book Cr was correct at £900 — only the rent ledger posting was wrong, creating a £90 Dr excess that the suspense correction reverses.' },
      { type: 'mcq', q: 'Which of the three errors contributed to the trial balance difference (the £630 suspense balance)?',
        opts: [
          'Errors 1 and 2 only',
          'Error 2 only',
          'Errors 1, 2 and 3',
          'Error 3 only'],
        ans: 0,
        exp: 'Error 1 creates a Dr excess of £540 (two debits, no credit). Error 2 creates a Dr excess of £90 (rent over-debited). Together: £540 + £90 = £630 ✓ — matching the suspense Cr balance. Error 3 is a complete omission (both Dr and Cr missing) so it does NOT affect the trial balance.' },
      { type: 'mcq', q: 'Error 3 (stationery £180 completely omitted) — does this affect the trial balance?',
        opts: [
          'Yes — the debit side is understated by £180',
          'Yes — the credit side is understated by £180',
          'No — both sides are equally affected (both missing)',
          'No — stationery is a small amount and can be ignored'],
        ans: 2,
        exp: 'A complete omission affects both sides equally — neither the Dr (Stationery expense) nor the Cr (Bank/PLCA) entry was made. The trial balance remains in agreement; this error is only discovered by checking source documents against ledger entries.' },
    ],
    exp: 'Error identification and correction journals — reversal, transposition, omission, and the suspense account.' },

  // ── TABLE-FILL QUESTIONS ─────────────────────────────────────────────────

  { id: 'tf-016', topic: 'itbk', difficulty: 'medium', type: 'tablefill',
    q: 'Complete the SLCA for the month. All figures in £.',
    table: {
      title: 'Sales Ledger Control Account',
      columns: ['Debit entries', '£', 'Credit entries', '£'],
      rows: [
        ['Balance b/d', '8,400', 'Bank (receipts)', '32,600'],
        ['Credit sales', '41,200', 'Sales returns', '1,800'],
        ['', '', 'Discounts allowed', '950'],
        ['', '', 'Bad debts written off', '400'],
        ['', '', 'Balance c/d', '?'],
      ],
      blanks: [{ row: 4, col: 3, answer: 13850 }]
    },
    exp: 'Total Dr: £8,400 + £41,200 = £49,600. Total Cr: £32,600 + £1,800 + £950 + £400 + balance c/d = £49,600. Balance c/d = £49,600 − £35,750 = £13,850.' },

  { id: 'tf-017', topic: 'poc', difficulty: 'medium', type: 'tablefill',
    q: 'Complete the job cost card for Job 47. OAR = £8 per labour hour.',
    table: {
      title: 'Job Cost Card — Job 47',
      columns: ['Cost element', '£'],
      rows: [
        ['Direct materials (40 kg @ £6.50)', '260'],
        ['Direct labour (12 hrs @ £10.00)', '?'],
        ['Production overhead (12 hrs @ OAR)', '?'],
        ['Total production cost', '?'],
      ],
      blanks: [
        { row: 1, col: 1, answer: 120 },
        { row: 2, col: 1, answer: 96 },
        { row: 3, col: 1, answer: 476 },
      ]
    },
    exp: 'Labour: 12 × £10 = £120. Overhead: 12 × £8 = £96. Total: £260 + £120 + £96 = £476.' },

  { id: 'tf-018', topic: 'besy', difficulty: 'hard', type: 'tablefill',
    q: 'Complete the working capital analysis table for Midway Ltd.',
    table: {
      title: 'Working Capital Analysis',
      columns: ['Item', '£'],
      rows: [
        ['Inventory', '21,000'],
        ['Trade receivables', '34,000'],
        ['Cash and bank', '5,000'],
        ['Total current assets', '?'],
        ['Trade payables', '18,000'],
        ['Accruals', '3,500'],
        ['Total current liabilities', '?'],
        ['Net working capital', '?'],
      ],
      blanks: [
        { row: 3, col: 1, answer: 60000 },
        { row: 6, col: 1, answer: 21500 },
        { row: 7, col: 1, answer: 38500 },
      ]
    },
    exp: 'Current assets: £21,000 + £34,000 + £5,000 = £60,000. Current liabilities: £18,000 + £3,500 = £21,500. Net working capital: £60,000 − £21,500 = £38,500.' },

  { id: 'tf-019', topic: 'pobc', difficulty: 'hard', type: 'tablefill',
    q: 'A trial balance has a debit excess of £860 (suspense account: credit balance £860). Two correcting journals are processed. Complete the suspense account.',
    table: {
      title: 'Suspense Account',
      columns: ['Debit entries', '£', 'Credit entries', '£'],
      rows: [
        ['Error 1: rent under-credited — bank Cr missed', '360', 'Balance b/f (TB debit excess)', '860'],
        ['Error 2: wages over-debited correction', '?', '', ''],
      ],
      blanks: [{ row: 1, col: 1, answer: 500 }]
    },
    exp: 'Total credits = £860 (the opening suspense balance). Total debits must also equal £860. Error 1 corrects £360. Error 2 = £860 − £360 = £500. When both corrections are posted the suspense account clears to zero.' }

);
/* ────────────────────────────────────────────────────────────────────────
   WRITTEN RESPONSE TASKS  (synoptic Tasks 4 and 7)

   In the real Business Environment synoptic, Tasks 4 and 7 are marked by a
   human, not the computer — they ask the student to draft an email, explain a
   discrepancy or advise a colleague. Together they carry ~32 of the 100 marks,
   so an app with no free-text practice leaves a third of the paper untouched.

   These cannot be auto-marked, so each carries a `rubric`: the marks an
   examiner would award, point by point. The student writes their answer, then
   reveals the model answer and marks themselves against the rubric. Self-
   assessed marks are tracked separately from objective ones throughout.
   ──────────────────────────────────────────────────────────────────────── */
window.ALL_QUESTIONS.push(

  /* ── Task 4 shape: process a transaction, then communicate it ── */
  { id: 'wr-001', topic: 'besy', difficulty: 'medium', type: 'written', skill: 'besy-comms', marks: 8, minWords: 70,
    setup: 'You are an accounts assistant at Pemberton Blinds Ltd. A customer, Halewood Interiors, has emailed to say their statement shows £2,880 outstanding but their own records show £2,400. You check the sales ledger and find that invoice 4471 for £480 was issued on 28 June for a made-to-measure blind that Halewood cancelled on 26 June. The cancellation was never processed.',
    task: 'Draft an email to Halewood Interiors explaining the difference and what you will do about it.',
    rubric: [
      { point: 'Uses an appropriate subject line and professional greeting', marks: 1 },
      { point: 'States the difference clearly as £480 (£2,880 − £2,400)', marks: 2 },
      { point: 'Explains the cause: invoice 4471 was raised after the order was cancelled', marks: 2 },
      { point: 'States the corrective action — a credit note for £480 will be issued', marks: 2 },
      { point: 'Professional, apologetic-but-not-grovelling tone with a clear close', marks: 1 },
    ],
    modelAnswer: 'Subject: Your account — difference of £480 on the June statement\n\nDear Halewood Interiors,\n\nThank you for getting in touch about your statement.\n\nI have checked your account and the difference is £480: our statement shows £2,880 outstanding, while your records show £2,400.\n\nThe cause is invoice 4471, raised on 28 June for £480. This related to a made-to-measure blind that you cancelled on 26 June. The cancellation was not processed at our end, so the invoice was issued in error.\n\nI will raise a credit note for £480 today, which will bring your balance in line with your own records at £2,400. You will receive a copy by email once it has been posted.\n\nI am sorry for the confusion. Please contact me if anything else on the statement does not look right.\n\nKind regards,\nAccounts Assistant, Pemberton Blinds Ltd',
    exp: 'The marks are for identifying the figure, explaining the cause and stating a concrete action — not for length. Always quantify the difference and name the document that caused it.' },

  { id: 'wr-002', topic: 'besy', difficulty: 'medium', type: 'written', skill: 'besy-comms', marks: 6, minWords: 60,
    setup: 'You work in the finance team at Ardley Tools Ltd. The sales manager has asked why a large credit customer, Crowther Fixings, has been placed on stop, which is blocking a new order worth £6,000. Crowther Fixings has an agreed credit limit of £5,000 and a balance of £7,200, of which £3,100 is more than 60 days overdue.',
    task: 'Draft a short email to the sales manager explaining why the account is on stop and what would need to happen for the order to be released.',
    rubric: [
      { point: 'Explains the account exceeds its £5,000 credit limit (balance £7,200)', marks: 2 },
      { point: 'Notes that £3,100 is over 60 days overdue', marks: 1 },
      { point: 'States what would release the order — payment of the overdue amount, or an authorised limit increase', marks: 2 },
      { point: 'Tone is collaborative rather than obstructive; offers to help', marks: 1 },
    ],
    modelAnswer: 'Subject: Crowther Fixings — account on stop\n\nHi,\n\nCrowther Fixings is on stop for two reasons. Their balance is £7,200 against an agreed credit limit of £5,000, so they are £2,200 over the limit. Of that balance, £3,100 is more than 60 days overdue.\n\nTo release the £6,000 order we would need either payment of the £3,100 overdue amount, which brings the account back within terms, or a credit limit increase authorised by the finance manager.\n\nHappy to chase the overdue invoices today if that helps — let me know if you would like me to contact them directly.\n\nThanks,\nFinance team',
    exp: 'Credit control questions want the specific figures and a route forward. Naming who can authorise an exception (the finance manager) shows you understand the control, not just the rule.' },

  { id: 'wr-003', topic: 'besy', difficulty: 'medium', type: 'written', skill: 'besy-comms', marks: 6, minWords: 60,
    setup: 'You are an accounts assistant at Vellacott Catering Supplies. A colleague in the warehouse has emailed asking you to "just pay" a supplier invoice for £1,450 from Northgate Produce because the supplier is chasing. There is no purchase order on file and no goods received note, and the invoice is addressed to a slightly different company name.',
    task: 'Draft a reply explaining why you cannot process the payment yet and what you need.',
    rubric: [
      { point: 'States clearly that the invoice cannot be paid as it stands', marks: 1 },
      { point: 'Identifies the missing purchase order and goods received note', marks: 2 },
      { point: 'Raises the mismatched company name as a concern to check', marks: 2 },
      { point: 'Constructive close — says what would let the payment proceed', marks: 1 },
    ],
    modelAnswer: 'Subject: Northgate Produce invoice £1,450 — on hold pending checks\n\nHi,\n\nI am not able to process this one yet. Three things need resolving first.\n\nThere is no purchase order on file, so I cannot confirm the goods were ordered or at what price. There is also no goods received note, so I cannot confirm the goods actually arrived and were checked.\n\nThe invoice is also addressed to a slightly different company name from ours. That may be a simple error, but it can also be a sign of a fraudulent or misdirected invoice, so I need to verify it before any payment goes out.\n\nIf you can send me the purchase order number and the GRN, and confirm the delivery took place, I will get this paid in the next payment run.\n\nThanks,\nAccounts',
    exp: 'The three-way match — purchase order, goods received note, invoice — is the core purchases control. A mismatched company name is a classic invoice-fraud indicator and should always be flagged rather than assumed to be a typo.' },

  { id: 'wr-004', topic: 'besy', difficulty: 'hard', type: 'written', skill: 'besy-comms', marks: 8, minWords: 80,
    setup: 'You work at Redmayne Joinery Ltd. You have completed the bank reconciliation for October. The cash book shows a balance of £14,320 but the bank statement shows £11,905. You have identified: unpresented cheques of £3,150; an outstanding lodgement of £900; bank charges of £45 not yet in the cash book; and a direct debit for insurance of £320 not yet in the cash book.',
    task: 'Draft a note to the finance manager explaining the reconciliation and what needs to be adjusted in the cash book.',
    rubric: [
      { point: 'Identifies the two items requiring cash book adjustment: bank charges £45 and direct debit £320', marks: 2 },
      { point: 'States the corrected cash book balance of £13,955 (£14,320 − £45 − £320)', marks: 2 },
      { point: 'Explains unpresented cheques and outstanding lodgements are timing differences, not errors', marks: 2 },
      { point: 'Shows the reconciliation agrees: £11,905 − £3,150 + £900 = £13,655... and identifies the remaining £300 difference needs investigation', marks: 1 },
      { point: 'Clear structure with a recommendation or next step', marks: 1 },
    ],
    modelAnswer: 'Note: October bank reconciliation — Redmayne Joinery Ltd\n\nTwo items need posting to the cash book because they are genuine transactions the bank has processed and we have not recorded: bank charges of £45 and the insurance direct debit of £320. Once posted, the corrected cash book balance is £14,320 − £45 − £320 = £13,955.\n\nThe unpresented cheques of £3,150 and the outstanding lodgement of £900 are timing differences, not errors. They are correctly in our cash book and will clear the bank shortly, so no adjustment is made for them.\n\nReconciling from the statement: £11,905 less unpresented cheques £3,150 plus the outstanding lodgement £900 gives £13,655. That leaves £300 against the corrected cash book balance of £13,955, which does not reconcile. I recommend we review October cash book postings for a transposition or an omitted item before signing off.\n\nAccounts Assistant',
    exp: 'The distinction that earns marks is between items needing a cash book adjustment (bank charges, direct debits, standing orders, interest) and timing differences (unpresented cheques, outstanding lodgements). Noting that the reconciliation does not fully agree — rather than forcing it — is what a real assistant should do.' },

  { id: 'wr-005', topic: 'besy', difficulty: 'medium', type: 'written', skill: 'besy-comms', marks: 6, minWords: 60,
    setup: 'You are an accounts assistant at Thornbury Print. A junior colleague has posted a purchase of stationery for £240 (net) plus VAT of £48 as: Dr Stationery £288, Cr Bank £288. The business is VAT registered and the payment was made by bank transfer.',
    task: 'Draft a short message to your colleague explaining what is wrong with the entry and how to correct it.',
    rubric: [
      { point: 'Identifies that VAT has not been separated out', marks: 2 },
      { point: 'States the correct entry: Dr Stationery £240, Dr VAT £48, Cr Bank £288', marks: 2 },
      { point: 'Explains why it matters — input VAT is reclaimable and the expense is overstated by £48', marks: 1 },
      { point: 'Helpful, non-critical tone appropriate to a colleague', marks: 1 },
    ],
    modelAnswer: 'Hi,\n\nSmall fix needed on the stationery purchase. The total of £288 has gone entirely to Stationery, but £48 of that is VAT.\n\nThe entry should be:\nDr Stationery £240\nDr VAT £48\nCr Bank £288\n\nIt matters for two reasons. As we are VAT registered, the £48 input VAT is reclaimable from HMRC, and posting it to Stationery means we lose it. It also overstates the stationery expense by £48, which will distort the cost figures.\n\nEasy one to miss — give me a shout if you want to go through the VAT postings together.\n\nThanks',
    exp: 'Always split gross into net and VAT for a registered business. The double entry has three lines: two debits (expense and VAT) and one credit (bank), and it still balances at £288.' },

  { id: 'wr-006', topic: 'besy', difficulty: 'medium', type: 'written', skill: 'besy-comms', marks: 6, minWords: 60,
    setup: 'You work at Calder Fabrications Ltd. The sales ledger control account shows a balance of £48,600 but the total of the sales ledger individual accounts is £48,150. You have found that a credit note for £450 was posted to the customer\'s individual account but not to the control account.',
    task: 'Draft a note explaining the difference and the correcting entry required.',
    rubric: [
      { point: 'States the difference is £450 (£48,600 − £48,150)', marks: 2 },
      { point: 'Identifies that the control account is the side needing correction', marks: 1 },
      { point: 'States the correcting entry: Dr Sales returns / Cr SLCA £450 — or equivalent Cr to the control account', marks: 2 },
      { point: 'Notes the two records will then agree at £48,150', marks: 1 },
    ],
    modelAnswer: 'Note: SLCA reconciliation difference\n\nThe sales ledger control account shows £48,600 and the total of the individual customer accounts is £48,150 — a difference of £450.\n\nThe cause is a credit note for £450 posted to the customer\'s individual account but omitted from the control account. The individual accounts are therefore correct and the control account is overstated.\n\nThe correction is to credit the sales ledger control account with £450 (with the corresponding debit to sales returns). Once posted, the control account will show £48,150 and agree with the list of individual balances.\n\nAccounts Assistant',
    exp: 'Work out which side is wrong before writing the journal. Here the subsidiary ledger was right, so the control account moves — a credit reduces the receivables balance to match.' },

  { id: 'wr-007', topic: 'besy', difficulty: 'hard', type: 'written', skill: 'besy-comms', marks: 8, minWords: 80,
    setup: 'You are an accounts assistant at Levenshulme Foods Ltd. Your manager has asked you to explain to a new trainee why the business keeps both a sales day book and a sales ledger control account, as the trainee thinks it is "doing the same job twice".',
    task: 'Draft an explanation for the trainee covering what each record does and why both are needed.',
    rubric: [
      { point: 'Explains the sales day book is a book of prime entry — it lists invoices before posting', marks: 2 },
      { point: 'Explains the SLCA is a general ledger account showing total receivables', marks: 2 },
      { point: 'Explains the control function — SLCA total is checked against the sum of individual accounts', marks: 2 },
      { point: 'Gives the practical benefit: errors are localised and the trial balance is protected', marks: 1 },
      { point: 'Pitched appropriately for a trainee, no unexplained jargon', marks: 1 },
    ],
    modelAnswer: 'Hi,\n\nGood question — they look similar but they do different jobs.\n\nThe sales day book is a book of prime entry. It is the first place a credit sale is written down: date, customer, invoice number, net, VAT and gross. Nothing is posted to the ledgers until it goes through here, so it is a listing rather than an account.\n\nThe sales ledger control account is a real account in the general ledger. It holds the total owed by all credit customers in one figure, so the trial balance has a single receivables balance rather than hundreds of them.\n\nThe reason we keep both is control. Each customer also has their own account in the sales ledger. At month end we add up all those individual balances and compare the total to the control account. If the two agree, the postings are very likely right. If they do not, we know there is an error and we can find it before it reaches the financial statements.\n\nSo the day book captures, the control account summarises, and the comparison between the control account and the individual accounts is what catches mistakes.\n\nHope that helps',
    exp: 'Books of prime entry capture; ledger accounts record; control accounts verify. The point of the control account is that it is built from a different route than the individual accounts, so agreement between them is meaningful evidence.' },

  { id: 'wr-008', topic: 'besy', difficulty: 'medium', type: 'written', skill: 'besy-comms', marks: 6, minWords: 60,
    setup: 'You work at Ormskirk Garden Centre. A supplier has phoned to say an invoice for £1,260 is overdue. You check and find the invoice was received but is still awaiting authorisation by the department head, who has been on leave for three weeks.',
    task: 'Draft a reply to the supplier. You must not disclose internal staffing matters.',
    rubric: [
      { point: 'Acknowledges the invoice has been received and is in the system', marks: 2 },
      { point: 'Explains it is awaiting internal authorisation without disclosing staffing details', marks: 2 },
      { point: 'Gives a specific commitment — a date or next payment run', marks: 1 },
      { point: 'Professional tone that maintains the supplier relationship', marks: 1 },
    ],
    modelAnswer: 'Subject: Invoice 8842 — £1,260\n\nDear Supplier,\n\nThank you for your call about invoice 8842 for £1,260.\n\nI can confirm we have received the invoice and it is in our system. It is currently going through our internal authorisation process, which is the final step before payment.\n\nI am escalating it today and expect it to be cleared for our next payment run on Friday. I will email you to confirm once payment has been released.\n\nI am sorry for the delay and thank you for your patience.\n\nKind regards,\nAccounts, Ormskirk Garden Centre',
    exp: 'Confidentiality applies to internal matters as well as customer data. "Awaiting internal authorisation" is honest and sufficient; naming an absent colleague is neither necessary nor appropriate.' },

  /* ── Task 7 shape: bookkeeping systems, receipts, payments, data security ── */
  { id: 'wr-009', topic: 'besy', difficulty: 'medium', type: 'written', skill: 'besy-tech', marks: 8, minWords: 70,
    setup: 'You work at Haslingden Supplies Ltd. A colleague has emailed you a spreadsheet containing the full customer list — names, addresses, phone numbers and bank details — to their personal webmail account so they can "work on it at home this weekend". They have asked you to do the same with the supplier list.',
    task: 'Draft a reply explaining why you will not do this and what the risks are.',
    rubric: [
      { point: 'Declines clearly and without ambiguity', marks: 1 },
      { point: 'Identifies this as a personal data breach risk under data protection law', marks: 2 },
      { point: 'Names at least two specific risks (unencrypted transfer, no control over personal accounts, loss of the device)', marks: 2 },
      { point: 'States the correct alternative — approved remote access or company systems', marks: 2 },
      { point: 'Advises reporting the email already sent', marks: 1 },
    ],
    modelAnswer: 'Hi,\n\nI am not able to send you the supplier list that way, and I would ask you not to send any more of our data to a personal account.\n\nThe customer list contains personal data — names, addresses, phone numbers — plus bank details. Sending it to a personal webmail account is a data breach risk under data protection law, and we could be liable for it.\n\nThe specific problems are that the transfer is not encrypted or controlled by us; once it is in a personal account we have no way of knowing who can access it or how long it is retained; and if the home device is lost, stolen or shared, that data goes with it.\n\nIf you need to work at the weekend, please use the approved remote access to our systems, where the data stays on company servers and access is logged.\n\nOne more thing: the email you have already sent should be reported to our data protection lead so it can be assessed and, if necessary, recorded. I would rather flag it now than have it found later.\n\nThanks',
    exp: 'Data security answers should name the risk, the specific harms and the compliant alternative. Reporting a breach that has already happened is part of the answer — concealing it makes the position worse.' },

  { id: 'wr-010', topic: 'besy', difficulty: 'medium', type: 'written', skill: 'besy-tech', marks: 6, minWords: 60,
    setup: 'You are an accounts assistant at Brindley Motors. An email has arrived, apparently from a regular supplier, saying their bank details have changed and asking that the £4,800 payment due this week be sent to a new account. The email address is very similar to the supplier\'s usual one but not identical, and the message stresses urgency.',
    task: 'Draft a note to your manager setting out your concerns and what you propose to do.',
    rubric: [
      { point: 'Identifies this as a likely mandate / invoice redirection fraud attempt', marks: 2 },
      { point: 'Names at least two warning signs (near-miss email address, urgency, unprompted bank change)', marks: 2 },
      { point: 'Proposes verification by phone using a known number, not one from the email', marks: 1 },
      { point: 'States that payment should be held until verified', marks: 1 },
    ],
    modelAnswer: 'Note to manager — suspected mandate fraud\n\nWe have received an email asking us to redirect this week\'s £4,800 payment to a new bank account. I think this is a mandate fraud attempt.\n\nThree things concern me. The sender\'s address is very close to the supplier\'s usual one but is not identical. The request stresses urgency, which is a standard pressure tactic. And a change of bank details has arrived unprompted, immediately before a known payment falls due.\n\nI propose we hold the payment until we have verified the change. I will telephone the supplier on the number we already hold on file — not any number given in the email — and speak to a known contact to confirm whether the request is genuine.\n\nI will not amend the supplier record until that call is made.\n\nAccounts Assistant',
    exp: 'The rule is: never verify a change of bank details using contact details supplied in the same message. Independent verification against records you already hold is the control that defeats this fraud.' },

  { id: 'wr-011', topic: 'besy', difficulty: 'medium', type: 'written', skill: 'besy-tech', marks: 6, minWords: 60,
    setup: 'You work at Dunham Textiles Ltd, which is moving its bookkeeping from a desktop package to a cloud accounting system. Your manager has asked you to summarise the benefits and the risks for a short briefing.',
    task: 'Draft a summary covering the main benefits and the main risks of the move.',
    rubric: [
      { point: 'Gives at least two benefits (access anywhere, automatic backups, automatic updates, bank feeds, multi-user)', marks: 2 },
      { point: 'Gives at least two risks (internet dependency, data held by a third party, subscription cost, access control)', marks: 2 },
      { point: 'Mentions a specific control or mitigation', marks: 1 },
      { point: 'Balanced and clearly structured', marks: 1 },
    ],
    modelAnswer: 'Cloud accounting — briefing summary\n\nBenefits. The data is accessible from any location with an internet connection, which suits remote and multi-site working. Backups and software updates are handled by the provider, so we are always on the current version and no longer depend on someone remembering to back up. Bank feeds import transactions automatically, which cuts manual entry and keying errors. Several people can work in the system at once.\n\nRisks. We become dependent on our internet connection — no connection means no access to the ledgers. Our data is held on a third party\'s servers, so we are relying on their security and their continuity. It moves us from a one-off licence to an ongoing subscription cost. And because the system is reachable from anywhere, weak passwords or over-generous access rights are more dangerous than they were on a desktop system.\n\nMitigations. I would recommend multi-factor authentication for all users, access rights set by role rather than given in full to everyone, and a check of the provider\'s data location and retention terms before we commit.\n\nAccounts Assistant',
    exp: 'A balanced answer earns more than an enthusiastic one. The examiner is looking for genuine risks alongside the benefits, and at least one concrete control.' },

  { id: 'wr-012', topic: 'besy', difficulty: 'medium', type: 'written', skill: 'besy-tech', marks: 6, minWords: 60,
    setup: 'You are an accounts assistant at Kirkstall Engineering. The business has one shared login for the accounting system, and the password — written on a note by the printer — has not been changed for two years. Everyone in the office uses it, including temporary staff.',
    task: 'Draft a note to your manager explaining the risks and recommending improvements.',
    rubric: [
      { point: 'Identifies loss of audit trail — no way to know who posted what', marks: 2 },
      { point: 'Identifies the physical exposure of the written password and the stale password age', marks: 2 },
      { point: 'Recommends individual logins with access rights by role', marks: 1 },
      { point: 'Recommends a password policy and prompt removal of leavers/temps', marks: 1 },
    ],
    modelAnswer: 'Note: access controls on the accounting system\n\nWe currently have one shared login. I think this needs to change.\n\nThe most serious problem is that we have no audit trail. Every posting looks identical in the system, so if an entry is wrong — or deliberately falsified — there is no way to establish who made it. That removes both accountability and any real deterrent.\n\nThe password is also written on a note by the printer, so anyone passing through the office can read it, including visitors. It has not been changed in two years, and temporary staff who have long since left still know it.\n\nI recommend individual logins for every user, with access rights set by role so that staff can only reach the parts of the system their job requires. We should adopt a password policy with periodic changes, remove the written note, and make deactivating a login part of the leaver process for permanent and temporary staff alike.\n\nAccounts Assistant',
    exp: 'Shared logins destroy the audit trail, which is the point examiners want. Segregation of duties and accountability both depend on knowing which individual made each entry.' },

  { id: 'wr-013', topic: 'besy', difficulty: 'hard', type: 'written', skill: 'besy-ethics', marks: 8, minWords: 80,
    setup: 'You are an accounts assistant at Netherfield Ltd. Two days before the year end, your manager asks you to date three sales invoices totalling £27,000 as 31 March rather than 3 April, "so the figures land in the right year". The goods were despatched on 3 April.',
    task: 'Draft a note setting out your position and what you intend to do.',
    rubric: [
      { point: 'Identifies this as misdating / falsifying records, not a presentational choice', marks: 2 },
      { point: 'Names the ethical principles breached — integrity and objectivity', marks: 2 },
      { point: 'Explains the accounting point: revenue belongs to the period in which it was earned (3 April)', marks: 2 },
      { point: 'States a clear course of action — decline and escalate internally', marks: 1 },
      { point: 'Professional tone; does not accuse, but does not comply', marks: 1 },
    ],
    modelAnswer: 'Note: request to date April invoices as 31 March\n\nI am not able to date these invoices 31 March. The goods were despatched on 3 April, so the sales were earned in the new financial year and belong in it. Dating them 31 March would overstate this year\'s revenue by £27,000 and understate next year\'s by the same amount.\n\nThis is not a presentational judgement. Recording a transaction on a date it did not occur is falsification of the accounting records, and it would mislead anyone relying on the financial statements.\n\nIt also puts me in breach of two fundamental ethical principles. Integrity requires me to be straightforward and honest, and not to be knowingly associated with information that is materially false or misleading. Objectivity requires that my professional judgement is not overridden by pressure from others.\n\nI will therefore process the three invoices with their correct date of 3 April. If there is a commercial reason this year\'s figures need to be understood differently, I am happy to help prepare a note explaining the timing. If the request stands, I will need to raise it with the finance director.\n\nAccounts Assistant',
    exp: 'Ethics answers need the principle named and the action stated. Declining is not enough on its own — the expected response is to decline, explain, offer a legitimate alternative, and escalate if the pressure continues.' },

  { id: 'wr-014', topic: 'besy', difficulty: 'medium', type: 'written', skill: 'besy-ethics', marks: 6, minWords: 60,
    setup: 'You work at Sandbach Interiors. A supplier you deal with regularly has offered you a weekend break worth around £400 "as a thank you for the smooth working relationship". You are the person who decides which supplier gets the next contract.',
    task: 'Draft a reply to the supplier and note what you will do internally.',
    rubric: [
      { point: 'Declines the gift', marks: 1 },
      { point: 'Identifies the self-interest and familiarity threats to objectivity', marks: 2 },
      { point: 'Notes the value is not trivial and the timing is significant', marks: 2 },
      { point: 'States that the offer will be declared internally', marks: 1 },
    ],
    modelAnswer: 'Dear Supplier,\n\nThank you for the kind offer, which I am afraid I have to decline.\n\nI am the person who decides which supplier is awarded the next contract. Accepting a gift of this value from you while that decision is pending would create a clear threat to my objectivity, and it would be reasonable for anyone looking at it from outside to question whether the decision had been influenced.\n\nA small token of nominal value would be a different matter, but at around £400 this is not trivial, and the timing makes it more difficult still.\n\nI value the working relationship and it will not be affected by this. I will record the offer in our gifts and hospitality register and mention it to my manager, which is our normal process.\n\nKind regards,\nSandbach Interiors',
    exp: 'The test is whether an informed third party would consider objectivity compromised. Value and timing both matter, and declaring the offer — not just refusing it — is what the register exists for.' },

  { id: 'wr-015', topic: 'besy', difficulty: 'medium', type: 'written', skill: 'besy-finance', marks: 6, minWords: 60,
    setup: 'You work in the finance function at Padgate Ltd. The operations manager has asked why the finance team needs their weekly output figures, saying "you do the money, we do the making".',
    task: 'Draft a reply explaining how the finance function uses operational information and why it benefits operations.',
    rubric: [
      { point: 'Explains finance needs operational data to cost output accurately', marks: 2 },
      { point: 'Gives at least two specific uses (budgeting, variance analysis, pricing, inventory valuation)', marks: 2 },
      { point: 'Explains the benefit flowing back to operations', marks: 1 },
      { point: 'Collaborative tone that does not talk down to the reader', marks: 1 },
    ],
    modelAnswer: 'Hi,\n\nFair question — here is why we ask.\n\nWe cannot cost what you produce without knowing how much of it there is. Weekly output figures let us work out the cost per unit, which feeds directly into the price we quote and the margin we make.\n\nThey are also used in a few other places. We use them to build and flex the budget, so that when we compare actual against budget we are comparing like with like rather than penalising you for producing more. They drive variance analysis, which tells us whether a cost movement came from price or from volume. And they underpin the inventory valuation in the year-end accounts.\n\nThe benefit is not one-way. Better output data means the budget you are measured against is realistic, and it means that when you ask for investment we can evidence the case with real numbers rather than estimates.\n\nHappy to walk through what we do with them if that would be useful.\n\nThanks,\nFinance',
    exp: 'The finance function is a service function. Answers score best when they show the two-way flow — finance needs operational data, and operations gets better budgets and evidence in return.' },

  { id: 'wr-016', topic: 'besy', difficulty: 'medium', type: 'written', skill: 'besy-finance', marks: 6, minWords: 60,
    setup: 'You are an accounts assistant at Wetherby Components Ltd, a limited company. A new colleague has asked why the business has to file accounts at Companies House when "the tax people already get everything they need".',
    task: 'Draft an explanation covering who receives what and why.',
    rubric: [
      { point: 'Distinguishes Companies House (public filing) from HMRC (tax)', marks: 2 },
      { point: 'Explains the public-record purpose — separate legal personality and limited liability', marks: 2 },
      { point: 'Notes that the two submissions serve different purposes and are not interchangeable', marks: 1 },
      { point: 'Clear and accurate throughout', marks: 1 },
    ],
    modelAnswer: 'Hi,\n\nThey are two different bodies wanting two different things.\n\nHMRC receives our corporation tax return and computation. Their interest is how much tax the company owes, and what they receive is not published.\n\nCompanies House receives our annual accounts and confirmation statement, and what they receive goes on the public register where anyone can look at it.\n\nThe reason for the public filing goes back to what a limited company is. The company is a separate legal person from its owners, and the shareholders\' liability is limited to what they have paid for their shares. If the company fails, its creditors generally cannot pursue the shareholders personally. In exchange for that protection, the law requires the company\'s financial position to be publicly visible so that anyone dealing with it — suppliers, lenders, customers — can see who they are trading with.\n\nSo it is not duplication. One filing is about tax, the other is the price of limited liability.\n\nThanks',
    exp: 'Public filing is the trade-off for limited liability: a sole trader has unlimited liability and files nothing publicly. Keeping the two filings distinct is a frequent examiner point.' }

);

/* ────────────────────────────────────────────────────────────────────────
   TRUE/FALSE STATEMENT GRIDS

   "Identify whether the following statements are true or false" is the single
   most common answer format in the Business Environment synoptic — Task 1 and
   Task 6 both open with one. Each statement is worth one mark, so a four-
   statement grid is a 4-mark item and partial credit applies.
   ──────────────────────────────────────────────────────────────────────── */
window.ALL_QUESTIONS.push(

  { id: 'tfq-001', topic: 'besy', difficulty: 'easy', type: 'truefalse', skill: 'besy-structure',
    q: 'Identify whether the following statements about charities are true or false.',
    statements: [
      { text: 'A charity exists for public benefit, such as for religious, educational or scientific purposes.', answer: true },
      { text: 'A charity pays corporation tax on any profits that it earns.', answer: false },
      { text: 'The Charity Commission is the body that registers and regulates charities in England and Wales.', answer: true },
      { text: 'A charity may generate a surplus, provided it is applied to its charitable purposes.', answer: true },
    ],
    exp: 'Charities are generally exempt from corporation tax on income applied to charitable purposes — that is the false statement. They may run a surplus; what they cannot do is distribute it to owners, because they have none.' },

  { id: 'tfq-002', topic: 'besy', difficulty: 'medium', type: 'truefalse', skill: 'besy-structure',
    q: 'Identify whether the following statements about limited companies are true or false.',
    statements: [
      { text: 'A limited company has a separate legal personality from its shareholders.', answer: true },
      { text: 'The shareholders of a limited company have unlimited liability for the company\'s debts.', answer: false },
      { text: 'A limited company must file its annual accounts at Companies House, where they become publicly available.', answer: true },
      { text: 'A limited company continues to exist even if all of its original shareholders sell their shares.', answer: true },
    ],
    exp: 'Limited liability is the defining feature: shareholders risk only what they paid for their shares. Separate legal personality also gives the company perpetual succession — it survives changes of ownership.' },

  { id: 'tfq-003', topic: 'besy', difficulty: 'medium', type: 'truefalse', skill: 'besy-structure',
    q: 'Identify whether the following statements about sole traders and partnerships are true or false.',
    statements: [
      { text: 'A sole trader is personally liable for the debts of the business without limit.', answer: true },
      { text: 'An ordinary partnership has a legal identity separate from its partners.', answer: false },
      { text: 'A limited liability partnership (LLP) must file accounts at Companies House.', answer: true },
      { text: 'In an ordinary partnership without a written agreement, profits are shared equally between the partners.', answer: true },
    ],
    exp: 'An ordinary partnership is not a separate legal person — that is the false statement. An LLP is, which is why it files publicly. Absent an agreement, the Partnership Act 1890 default is equal profit sharing.' },

  { id: 'tfq-004', topic: 'besy', difficulty: 'medium', type: 'truefalse', skill: 'besy-law',
    q: 'Identify whether the following statements about contract law are true or false.',
    statements: [
      { text: 'Goods displayed in a shop window with a price ticket constitute an offer that the customer can accept.', answer: false },
      { text: 'Consideration means that each party must give something of value under the contract.', answer: true },
      { text: 'A contract requires an intention to create legal relations.', answer: true },
      { text: 'Acceptance of an offer must be unqualified — introducing new terms creates a counter-offer instead.', answer: true },
    ],
    exp: 'Goods on display are an invitation to treat, not an offer: the customer makes the offer at the till and the retailer may decline it. That is the classic trap in this topic.' },

  { id: 'tfq-005', topic: 'besy', difficulty: 'medium', type: 'truefalse', skill: 'besy-law',
    q: 'Identify whether the following statements about the English legal system are true or false.',
    statements: [
      { text: 'Common law is developed by judges through their decisions in individual cases.', answer: true },
      { text: 'Statute law is created by Parliament and takes precedence over case law.', answer: true },
      { text: 'Criminal law is primarily concerned with resolving disputes between private individuals.', answer: false },
      { text: 'Delegated legislation allows detailed changes to the law without a new Act of Parliament.', answer: true },
    ],
    exp: 'Criminal law concerns offences against the state and is prosecuted by the state; disputes between private parties are civil law. Statute always beats case law where the two conflict.' },

  { id: 'tfq-006', topic: 'besy', difficulty: 'medium', type: 'truefalse', skill: 'besy-ethics',
    q: 'Identify whether the following statements about professional ethics are true or false.',
    statements: [
      { text: 'Confidentiality means client information may never be disclosed under any circumstances.', answer: false },
      { text: 'Integrity requires an accountant to be straightforward and honest in all professional relationships.', answer: true },
      { text: 'A self-interest threat arises where a financial interest could inappropriately influence judgement.', answer: true },
      { text: 'Professional competence and due care requires an accountant to keep their knowledge up to date.', answer: true },
    ],
    exp: 'Confidentiality has limits: disclosure is required where there is a legal or professional duty, such as a suspicion of money laundering. Treating it as absolute is the common error.' },

  { id: 'tfq-007', topic: 'besy', difficulty: 'medium', type: 'truefalse', skill: 'besy-ethics',
    q: 'Identify whether the following statements about sustainability and corporate social responsibility are true or false.',
    statements: [
      { text: 'Sustainable development meets the needs of the present without compromising the ability of future generations to meet their own needs.', answer: true },
      { text: 'The triple bottom line considers people, planet and profit.', answer: true },
      { text: 'Corporate social responsibility is a legal requirement for all UK companies.', answer: false },
      { text: 'The finance function can contribute to sustainability by measuring and reporting environmental costs.', answer: true },
    ],
    exp: 'CSR is voluntary — it is a business choice, not a statutory obligation, though some reporting requirements do apply to larger companies. Do not confuse a widely adopted practice with a legal duty.' },

  { id: 'tfq-008', topic: 'besy', difficulty: 'medium', type: 'truefalse', skill: 'besy-finance',
    q: 'Identify whether the following statements about the finance function are true or false.',
    statements: [
      { text: 'The finance function provides information that supports decision-making across the whole organisation.', answer: true },
      { text: 'Financial accounting is primarily directed at external users such as shareholders and lenders.', answer: true },
      { text: 'Management accounting reports must follow a prescribed statutory format.', answer: false },
      { text: 'Segregation of duties reduces the risk that one person can both commit and conceal an error or fraud.', answer: true },
    ],
    exp: 'Management accounts are internal, so their format is whatever management finds useful — no statutory format applies. Financial accounts are the ones bound by law and standards.' },

  { id: 'tfq-009', topic: 'besy', difficulty: 'medium', type: 'truefalse', skill: 'besy-finance',
    q: 'Identify whether the following statements about the finance function\'s information sources are true or false.',
    statements: [
      { text: 'Internal information includes payroll records, sales day books and production output data.', answer: true },
      { text: 'External information includes interest rates, inflation data and competitor pricing.', answer: true },
      { text: 'Information is only useful to the finance function if it is expressed in monetary terms.', answer: false },
      { text: 'Information should be timely — a report produced too late to influence a decision has little value.', answer: true },
    ],
    exp: 'Non-financial information such as output volumes, staff turnover and customer complaints matters just as much; the finance function converts it into cost and performance measures.' },

  { id: 'tfq-010', topic: 'besy', difficulty: 'medium', type: 'truefalse', skill: 'besy-tech',
    q: 'Identify whether the following statements about data security are true or false.',
    statements: [
      { text: 'A shared login used by several staff removes the audit trail showing who made each entry.', answer: true },
      { text: 'Backing up data protects its availability if the original is lost or corrupted.', answer: true },
      { text: 'Phishing is a technique that attacks hardware rather than attempting to deceive a person.', answer: false },
      { text: 'Access rights should be granted according to what a role requires, not given in full to every user.', answer: true },
    ],
    exp: 'Phishing is social engineering — it deceives a person into revealing credentials or making a payment. The technical controls are secondary to the human one.' },

  { id: 'tfq-011', topic: 'besy', difficulty: 'medium', type: 'truefalse', skill: 'besy-tech',
    q: 'Identify whether the following statements about accounting software and technology are true or false.',
    statements: [
      { text: 'Cloud accounting allows several users to work in the same ledgers at the same time.', answer: true },
      { text: 'A bank feed imports transactions automatically, reducing manual keying errors.', answer: true },
      { text: 'Moving to cloud accounting removes the need to control who has access to the data.', answer: false },
      { text: 'Making Tax Digital requires affected businesses to keep digital records and file returns using compatible software.', answer: true },
    ],
    exp: 'Cloud systems make access control more important, not less: the ledgers are reachable from anywhere, so weak passwords and over-broad rights carry more risk than on an isolated desktop machine.' },

  { id: 'tfq-012', topic: 'besy', difficulty: 'medium', type: 'truefalse', skill: 'besy-comms',
    q: 'Identify whether the following statements about business communication are true or false.',
    statements: [
      { text: 'An email to an external customer about an account discrepancy should state the amount in question.', answer: true },
      { text: 'Technical accounting jargon should be used freely when writing to non-finance colleagues.', answer: false },
      { text: 'A formal letter is generally more appropriate than an instant message for a legal notice.', answer: true },
      { text: 'Confidential internal matters, such as which colleague is absent, should not be disclosed to suppliers.', answer: true },
    ],
    exp: 'Match the register to the audience. Writing to a non-finance colleague means explaining terms rather than assuming them — clarity is what earns the communication marks.' },

  { id: 'tfq-013', topic: 'besy', difficulty: 'medium', type: 'truefalse', skill: 'besy-econ',
    q: 'Identify whether the following statements about the external business environment are true or false.',
    statements: [
      { text: 'The Bank of England is responsible for monetary policy, including setting the base rate.', answer: true },
      { text: 'Fiscal policy — taxation and government spending — is set by the Bank of England.', answer: false },
      { text: 'A recession is conventionally defined as two consecutive quarters of falling GDP.', answer: true },
      { text: 'If demand for a product is price inelastic, a price rise causes a proportionately smaller fall in quantity demanded.', answer: true },
    ],
    exp: 'Monetary policy is the Bank of England; fiscal policy is the government. Swapping these two is the most frequently penalised error in this topic.' },

  { id: 'tfq-014', topic: 'itbk', difficulty: 'easy', type: 'truefalse', skill: 'itbk-docs',
    q: 'Identify whether the following statements about source documents are true or false.',
    statements: [
      { text: 'A purchase order is sent by the buyer to the supplier to request goods.', answer: true },
      { text: 'A goods received note is sent to the customer to request payment.', answer: false },
      { text: 'A credit note reduces the amount a customer owes.', answer: true },
      { text: 'A remittance advice tells the supplier which invoices a payment covers.', answer: true },
    ],
    exp: 'A goods received note is an internal document confirming that goods arrived and were checked. The document requesting payment is the sales invoice.' },

  { id: 'tfq-015', topic: 'itbk', difficulty: 'medium', type: 'truefalse', skill: 'itbk-vat',
    q: 'Identify whether the following statements about VAT are true or false.',
    statements: [
      { text: 'Output VAT is charged on sales; input VAT is incurred on purchases.', answer: true },
      { text: 'VAT of 20% on a gross (VAT-inclusive) amount is found by dividing the gross by 6.', answer: true },
      { text: 'A business that is not registered for VAT can reclaim input VAT on its purchases.', answer: false },
      { text: 'When a VAT-registered business buys goods, the net amount goes to the expense account and the VAT to the VAT account.', answer: true },
    ],
    exp: 'Only registered businesses reclaim input VAT. For an unregistered business the VAT is simply part of the cost. Gross ÷ 6 works because gross = net × 1.2, so VAT = gross × (0.2/1.2).' },

  { id: 'tfq-016', topic: 'pobc', difficulty: 'medium', type: 'truefalse', skill: 'pobc-control',
    q: 'Identify whether the following statements about control accounts are true or false.',
    statements: [
      { text: 'The sales ledger control account total should agree with the sum of the individual customer balances.', answer: true },
      { text: 'An error in one customer\'s individual account will always cause the trial balance to disagree.', answer: false },
      { text: 'A contra entry reduces both the sales ledger and purchase ledger control accounts.', answer: true },
      { text: 'An irrecoverable debt written off is credited to the sales ledger control account.', answer: true },
    ],
    exp: 'The subsidiary ledgers sit outside the double entry, so an error there does not unbalance the trial balance — that is exactly why the control account reconciliation exists.' },

  { id: 'tfq-017', topic: 'pobc', difficulty: 'medium', type: 'truefalse', skill: 'pobc-bank',
    q: 'Identify whether the following statements about bank reconciliation are true or false.',
    statements: [
      { text: 'Unpresented cheques are a timing difference and need no adjustment in the cash book.', answer: true },
      { text: 'Bank charges appearing on the statement require an adjustment to the cash book.', answer: true },
      { text: 'An outstanding lodgement means money the business has recorded but the bank has not yet credited.', answer: true },
      { text: 'A direct debit shown on the bank statement but missing from the cash book is a timing difference.', answer: false },
    ],
    exp: 'A direct debit the business has not recorded is an omission, not a timing difference — it needs posting to the cash book. Timing differences are items already correctly in the cash book that the bank has yet to process.' }

);

/* ────────────────────────────────────────────────────────────────────────
   MULTI-SELECT  ("Which TWO of the following…")

   The second format the current bank could not express. All-or-nothing:
   selecting one right answer and one wrong one scores zero, exactly as in
   the real assessment.
   ──────────────────────────────────────────────────────────────────────── */
window.ALL_QUESTIONS.push(

  { id: 'ms-001', topic: 'besy', difficulty: 'medium', type: 'multiselect', skill: 'besy-law', selectCount: 2,
    q: 'Which TWO of the following statements about common law are NOT correct?',
    opts: [
      'It is the body of law developed by judges through their determination of individual cases',
      'It is law created by Parliament through the passing of primary legislation',
      'It is the system of law that emerged following the Norman Conquest in 1066',
      'Where common law conflicts with statute law, the common law position prevails',
    ],
    answers: [1, 3],
    exp: 'Law created by Parliament is statute law, not common law. And where the two conflict, statute always prevails — the courts cannot question the validity of an Act of Parliament.' },

  { id: 'ms-002', topic: 'besy', difficulty: 'medium', type: 'multiselect', skill: 'besy-law', selectCount: 2,
    q: 'Which TWO of the following are essential elements required for a legally binding contract?',
    opts: [
      'Consideration passing between the parties to the agreement',
      'An intention by both parties to create legal relations',
      'A written document signed by both parties in the presence of a witness',
      'Approval of the agreement by a solicitor before it takes effect',
    ],
    answers: [0, 1],
    exp: 'Offer, acceptance, consideration and intention to create legal relations are the essentials. Most contracts need no writing, witness or legal approval at all — a verbal agreement can bind.' },

  { id: 'ms-003', topic: 'besy', difficulty: 'medium', type: 'multiselect', skill: 'besy-ethics', selectCount: 2,
    q: 'Which TWO of the following are fundamental principles in the AAT Code of Professional Ethics?',
    opts: [
      'Objectivity — not allowing bias or undue influence to override professional judgement',
      'Professional competence and due care — maintaining knowledge and skill at the required level',
      'Profitability — ensuring the client achieves the highest possible return on capital',
      'Seniority — deferring to the judgement of the most senior person in the organisation',
    ],
    answers: [0, 1],
    exp: 'The five principles are integrity, objectivity, professional competence and due care, confidentiality, and professional behaviour. Deferring to seniority is the opposite of objectivity.' },

  { id: 'ms-004', topic: 'besy', difficulty: 'medium', type: 'multiselect', skill: 'besy-ethics', selectCount: 2,
    q: 'An accountant is offered a significant gift by a supplier whose contract they are about to review. Which TWO threats to the fundamental principles does this most clearly create?',
    opts: [
      'A self-interest threat, because a financial benefit could influence the accountant\'s judgement',
      'A familiarity threat, because a close relationship may make the accountant too sympathetic to the supplier',
      'An advocacy threat, because the accountant would be promoting the supplier\'s position to a regulator',
      'A self-review threat, because the accountant would be evaluating their own previous professional judgement',
    ],
    answers: [0, 1],
    exp: 'Advocacy concerns promoting a client\'s position; self-review concerns reassessing your own earlier work. Neither applies to accepting a gift — the threats here are self-interest and familiarity.' },

  { id: 'ms-005', topic: 'besy', difficulty: 'medium', type: 'multiselect', skill: 'besy-structure', selectCount: 2,
    q: 'Which TWO of the following business types give their owners limited liability?',
    opts: [
      'A private limited company incorporated at Companies House',
      'A limited liability partnership registered under the LLP Act 2000',
      'A sole trader operating under a registered trading name',
      'An ordinary partnership governed by the Partnership Act 1890',
    ],
    answers: [0, 1],
    exp: 'Limited liability requires incorporation. A trading name changes nothing about a sole trader\'s legal position, and ordinary partners remain jointly liable without limit.' },

  { id: 'ms-006', topic: 'besy', difficulty: 'medium', type: 'multiselect', skill: 'besy-tech', selectCount: 2,
    q: 'Which TWO of the following are the strongest indicators that an email requesting a change of supplier bank details may be fraudulent?',
    opts: [
      'The sender\'s address is very similar to the supplier\'s usual address but not identical',
      'The message stresses urgency and asks that the change be made before the next payment run',
      'The email arrives during normal working hours on a weekday',
      'The email refers to an invoice number that matches one genuinely outstanding on the account',
    ],
    answers: [0, 1],
    exp: 'A near-miss sender address and manufactured urgency are the classic mandate-fraud signals. Arriving in working hours is unremarkable, and quoting a genuine invoice number is easily done from a compromised mailbox — it is not reassurance.' },

  { id: 'ms-007', topic: 'besy', difficulty: 'medium', type: 'multiselect', skill: 'besy-finance', selectCount: 2,
    q: 'Which TWO of the following are internal sources of information for the finance function?',
    opts: [
      'The payroll records showing hours worked and wages paid in the period',
      'The sales day book listing credit invoices issued to customers',
      'The Bank of England base rate announced by the Monetary Policy Committee',
      'Competitor price lists published on their public websites',
    ],
    answers: [0, 1],
    exp: 'Internal information is generated by the organisation\'s own systems. Base rates and competitor pricing come from outside it, however routinely they are monitored.' },

  { id: 'ms-008', topic: 'besy', difficulty: 'medium', type: 'multiselect', skill: 'besy-econ', selectCount: 2,
    q: 'Which TWO of the following would normally be expected during a period of rising inflation?',
    opts: [
      'Suppliers increase their prices, raising the cost of the business\'s purchases',
      'Employees seek higher wages to maintain their real spending power',
      'The purchasing power of a fixed sum of cash held by the business increases',
      'The Bank of England reduces the base rate to encourage further borrowing',
    ],
    answers: [0, 1],
    exp: 'Inflation erodes the purchasing power of cash rather than increasing it, and the usual monetary response to rising inflation is to raise the base rate, not cut it.' },

  { id: 'ms-009', topic: 'besy', difficulty: 'medium', type: 'multiselect', skill: 'besy-comms', selectCount: 2,
    q: 'You must tell a credit customer that their account has exceeded its limit. Which TWO of the following should the email do?',
    opts: [
      'State the current balance and the agreed credit limit so the customer can see the difference',
      'Set out clearly what the customer needs to do for the account to be brought back within terms',
      'Explain which member of staff authorised the original limit and why they set it at that level',
      'Copy in the customer\'s other suppliers so they are aware of the payment position',
    ],
    answers: [0, 1],
    exp: 'Give the figures and the route forward. Naming internal decision-makers is unnecessary, and disclosing a customer\'s payment position to third parties breaches confidentiality.' },

  { id: 'ms-010', topic: 'itbk', difficulty: 'medium', type: 'multiselect', skill: 'itbk-docs', selectCount: 2,
    q: 'Which TWO documents should be matched against a purchase invoice before it is authorised for payment?',
    opts: [
      'The purchase order confirming the goods were ordered and at what price',
      'The goods received note confirming the goods arrived and were checked',
      'The remittance advice showing which invoices a previous payment covered',
      'The supplier statement listing all transactions on the account for the month',
    ],
    answers: [0, 1],
    exp: 'This is the three-way match: purchase order, goods received note and invoice. A remittance advice relates to payments already made, and a statement is a reconciliation tool rather than an authorisation control.' },

  { id: 'ms-011', topic: 'pobc', difficulty: 'medium', type: 'multiselect', skill: 'pobc-errors', selectCount: 2,
    q: 'Which TWO of the following errors would cause the trial balance to disagree?',
    opts: [
      'A purchase of £450 debited to the purchases account but not credited to the payables account',
      'A sale of £270 recorded in the sales account as £720 while the receivable is recorded at £270',
      'A purchase of stationery correctly double-entered but posted to the office equipment account',
      'A sales invoice for £180 completely omitted from the accounting records',
    ],
    answers: [0, 1],
    exp: 'One-sided entries and transposition on one side only break the balance. An error of principle (right amount, wrong account) and a complete omission both leave the debits and credits equal.' },

  { id: 'ms-012', topic: 'pobc', difficulty: 'medium', type: 'multiselect', skill: 'pobc-bank', selectCount: 2,
    q: 'Which TWO items require an adjustment to the cash book during a bank reconciliation?',
    opts: [
      'Bank charges shown on the statement that have not been recorded in the cash book',
      'A standing order paid by the bank that has not been recorded in the cash book',
      'Cheques written and recorded in the cash book that have not yet been presented',
      'A lodgement recorded in the cash book that the bank has not yet credited',
    ],
    answers: [0, 1],
    exp: 'Adjust the cash book for items the bank has processed and the business has not recorded. Unpresented cheques and outstanding lodgements are timing differences already correctly recorded.' }

);

/* ────────────────────────────────────────────────────────────────────────
   BESY REBALANCE — the finance function and business communication

   The audit found these two areas carried 5 and 6 questions respectively while
   representing ~13 and ~22 marks in the real paper. These questions close that
   gap. Distractors are deliberately built at comparable length to the key and
   drawn from real misconceptions, so the answer cannot be inferred from shape.
   ──────────────────────────────────────────────────────────────────────── */
window.ALL_QUESTIONS.push(

  { id: 'besy-301', topic: 'besy', difficulty: 'medium', skill: 'besy-finance',
    q: 'What is the primary purpose of the finance function within an organisation?',
    opts: [
      'To record financial transactions and provide information that supports decision-making',
      'To maximise the reported profit figure disclosed in the published financial statements',
      'To ensure that every department spends the full budget allocated to it each year',
      'To negotiate the purchase prices agreed with the organisation\'s main suppliers',
    ],
    ans: 0,
    exp: 'Finance is a service function: it records what happened and turns it into information others can act on. Maximising reported profit is not its purpose, and purchasing negotiation belongs to procurement.' },

  { id: 'besy-302', topic: 'besy', difficulty: 'medium', skill: 'besy-finance',
    q: 'Which of the following best distinguishes financial accounting from management accounting?',
    opts: [
      'Financial accounting reports to external users in a regulated format; management accounting reports internally in any useful format',
      'Financial accounting deals with future forecasts; management accounting deals only with historic transactions',
      'Financial accounting is prepared monthly; management accounting is prepared once at the end of the year',
      'Financial accounting covers cash movements only; management accounting covers profit and loss only',
    ],
    ans: 0,
    exp: 'The split is audience and regulation. Financial accounts serve shareholders, lenders and HMRC in a prescribed form; management accounts serve internal decision-makers in whatever form helps.' },

  { id: 'besy-303', topic: 'besy', difficulty: 'medium', skill: 'besy-finance',
    q: 'Why does the finance function need non-financial information such as production output volumes?',
    opts: [
      'Because costs cannot be attributed to units of output without knowing how many units were produced',
      'Because non-financial information is legally required to be disclosed in the published accounts',
      'Because output volumes replace the need to maintain conventional double-entry records',
      'Because HMRC requires production volumes to be submitted alongside the VAT return',
    ],
    ans: 0,
    exp: 'Unit costing, budget flexing and inventory valuation all depend on volume data. It is an input to the numbers, not a disclosure requirement or a substitute for the ledgers.' },

  { id: 'besy-304', topic: 'besy', difficulty: 'medium', skill: 'besy-finance',
    q: 'What is the main control benefit of segregating duties within the finance function?',
    opts: [
      'No single individual can both perpetrate an error or fraud and conceal it in the normal course of their work',
      'It reduces the total number of staff the finance department needs to employ',
      'It removes the need for the organisation to carry out any bank reconciliations',
      'It guarantees that the trial balance will always agree at the end of each period',
    ],
    ans: 0,
    exp: 'Segregation works by requiring collusion. It typically needs more people rather than fewer, and it complements reconciliations rather than replacing them.' },

  { id: 'besy-305', topic: 'besy', difficulty: 'medium', skill: 'besy-finance',
    q: 'A business submits its annual accounts to Companies House. What is the primary purpose of this filing?',
    opts: [
      'To place the company\'s financial position on the public record in exchange for limited liability',
      'To calculate and settle the corporation tax liability for the accounting period',
      'To obtain approval from the registrar before the company may continue trading',
      'To register the company\'s employees for PAYE and National Insurance purposes',
    ],
    ans: 0,
    exp: 'Companies House filings are the public-transparency counterpart of limited liability. Tax is settled with HMRC, and PAYE registration is a separate HMRC process.' },

  { id: 'besy-306', topic: 'besy', difficulty: 'medium', skill: 'besy-finance',
    q: 'Which of the following best describes the relationship between the finance function and other departments?',
    opts: [
      'Finance depends on operational data from other departments and returns analysis those departments can act on',
      'Finance operates independently and requires no information from other departments to do its work',
      'Finance has authority over other departments and directs their day-to-day operational decisions',
      'Finance provides information only to the board and does not communicate with other departments',
    ],
    ans: 0,
    exp: 'The flow runs both ways. Finance cannot cost or budget without operational data, and the departments supplying it get realistic budgets and evidence in return.' },

  { id: 'besy-307', topic: 'besy', difficulty: 'easy', skill: 'besy-finance',
    q: 'Which external body is responsible for collecting corporation tax and VAT from UK businesses?',
    opts: [
      'HM Revenue and Customs, the UK government department responsible for tax collection',
      'Companies House, the registrar that maintains the public register of companies',
      'The Financial Conduct Authority, which regulates financial services firms',
      'The Bank of England, which sets monetary policy and issues banknotes',
    ],
    ans: 0,
    exp: 'HMRC collects tax. Companies House registers companies, the FCA regulates financial services, and the Bank of England runs monetary policy — none of them collect tax.' },

  { id: 'besy-308', topic: 'besy', difficulty: 'medium', skill: 'besy-finance',
    q: 'The finance function produces a monthly report three weeks after the month end. What quality of useful information does this most clearly fail?',
    opts: [
      'Timeliness — information produced too late to influence a decision has little practical value',
      'Accuracy — a delay in production necessarily introduces arithmetical errors into the figures',
      'Completeness — a three-week delay means transactions will have been omitted from the report',
      'Confidentiality — the longer a report takes to produce, the more people will have seen it',
    ],
    ans: 0,
    exp: 'Timeliness is the failing: the figures may be entirely accurate and complete, but if the decision has already been made the report cannot influence it.' },

  { id: 'besy-309', topic: 'besy', difficulty: 'medium', skill: 'besy-finance',
    q: 'Why is a budget prepared before the start of an accounting period?',
    opts: [
      'To set a financial plan against which actual performance can later be compared',
      'To establish the figures that will be reported to shareholders as the final results',
      'To calculate the corporation tax that will become payable for the period',
      'To satisfy a legal requirement that all UK companies must publish a budget',
    ],
    ans: 0,
    exp: 'A budget is a plan and a control benchmark. It is not the reported result, not a tax computation, and not a legal publication requirement.' },

  { id: 'besy-310', topic: 'besy', difficulty: 'medium', skill: 'besy-finance',
    q: 'Which of the following is a responsibility of the credit control function within finance?',
    opts: [
      'Monitoring customer balances against agreed limits and pursuing amounts that fall overdue',
      'Deciding the selling prices at which the organisation\'s products are offered to the market',
      'Recording the depreciation charge on the organisation\'s non-current assets each period',
      'Preparing the payroll and calculating statutory deductions for the organisation\'s employees',
    ],
    ans: 0,
    exp: 'Credit control manages the receivables risk. Pricing is a commercial decision, and depreciation and payroll sit elsewhere in the finance function.' },

  { id: 'besy-311', topic: 'besy', difficulty: 'medium', skill: 'besy-comms',
    q: 'You need to explain a bookkeeping discrepancy to a colleague outside the finance team. Which approach is most appropriate?',
    opts: [
      'Explain the cause and the effect in plain language, defining any technical terms you must use',
      'Use standard accounting terminology throughout, as it is the most precise way to describe the issue',
      'Send the relevant ledger extracts without commentary and let the colleague draw their own conclusion',
      'Keep the explanation brief by omitting the underlying cause and stating only the corrected figure',
    ],
    ans: 0,
    exp: 'Communication marks are awarded for being understood. Unexplained jargon, raw data and omitted causes all fail that test even when the underlying accounting is right.' },

  { id: 'besy-312', topic: 'besy', difficulty: 'medium', skill: 'besy-comms',
    q: 'A supplier telephones to chase an invoice that is awaiting internal authorisation. What should you tell them?',
    opts: [
      'That the invoice has been received and is going through authorisation, with a realistic date for payment',
      'That the invoice has been lost, so that the supplier sends a replacement copy for processing',
      'The name of the manager who has not yet authorised it and the reason for their absence',
      'Nothing at all, as supplier payment queries should be referred only to the finance director',
    ],
    ans: 0,
    exp: 'Be honest and specific without disclosing internal staffing matters. Inventing a lost invoice is dishonest, and naming an absent colleague breaches confidentiality unnecessarily.' },

  { id: 'besy-313', topic: 'besy', difficulty: 'medium', skill: 'besy-comms',
    q: 'Which communication medium is most appropriate for formally notifying a customer that legal proceedings may follow non-payment?',
    opts: [
      'A formal letter, which creates a dated written record appropriate to the seriousness of the notice',
      'An instant message, which reaches the customer\'s account contact most quickly',
      'A telephone call, which allows the matter to be discussed without creating a written record',
      'A note added to the customer\'s next monthly statement of account',
    ],
    ans: 0,
    exp: 'Match the medium to the gravity and to the need for evidence. A formal notice needs a dated, retrievable written record; the other three either lack formality or lack proof of service.' },

  { id: 'besy-314', topic: 'besy', difficulty: 'medium', skill: 'besy-comms',
    q: 'What should an email reporting a month-end variance to a department manager contain?',
    opts: [
      'The size of the variance, its likely cause, and what action is proposed or requested',
      'A full listing of every transaction posted to the department\'s accounts during the month',
      'The variance figure alone, so the manager can investigate the cause independently',
      'A comparison against the equivalent figures reported by the organisation\'s competitors',
    ],
    ans: 0,
    exp: 'Figure, cause, action is the structure that earns communication marks. A transaction dump shifts the analytical work back onto the reader.' },

  { id: 'besy-315', topic: 'besy', difficulty: 'medium', skill: 'besy-comms',
    q: 'When writing to an external customer about an error made by your own organisation, what tone is most appropriate?',
    opts: [
      'Professional and factual, acknowledging the error and stating clearly how it will be put right',
      'Defensive, setting out the circumstances that made the error difficult to avoid',
      'Highly informal, to reassure the customer that the matter is not being treated as serious',
      'Impersonal and passive, avoiding any statement about who will resolve the matter',
    ],
    ans: 0,
    exp: 'Acknowledge, quantify, commit. Defensiveness and vagueness both damage the relationship the communication is meant to protect.' },

  { id: 'besy-316', topic: 'besy', difficulty: 'medium', skill: 'besy-comms',
    q: 'Why should an email about an account discrepancy state the specific amount in question?',
    opts: [
      'It allows the recipient to identify the transaction and check it against their own records',
      'It is a legal requirement that all business correspondence includes monetary amounts',
      'It ensures that the email will be retained for the statutory record-keeping period',
      'It transfers responsibility for resolving the discrepancy to the recipient',
    ],
    ans: 0,
    exp: 'Precision makes the message actionable — the recipient can find the item. None of the other three describe a real effect of stating a figure.' },

  { id: 'besy-317', topic: 'besy', difficulty: 'medium', skill: 'besy-tech',
    q: 'What is the main risk created by staff sharing a single login to the accounting system?',
    opts: [
      'The audit trail cannot identify which individual made any given entry in the ledgers',
      'The accounting system will process transactions more slowly under a shared account',
      'The organisation will be unable to produce a trial balance at the end of the period',
      'The software licence cost increases in proportion to the number of people sharing it',
    ],
    ans: 0,
    exp: 'Accountability is the casualty. Without individual logins there is no way to attribute an entry, which undermines both segregation of duties and any investigation.' },

  { id: 'besy-318', topic: 'besy', difficulty: 'medium', skill: 'besy-tech',
    q: 'A business backs up its accounting data daily to a separate location. Which aspect of information security does this primarily protect?',
    opts: [
      'Availability — the data can still be recovered and used if the original is lost or corrupted',
      'Confidentiality — the data cannot be read by anyone who is not authorised to see it',
      'Integrity — the data cannot be altered without that alteration being detected',
      'Authenticity — the identity of the person who created each record can be verified',
    ],
    ans: 0,
    exp: 'Backups address availability. Confidentiality is handled by access controls and encryption; integrity by validation and audit trails.' },

  { id: 'besy-319', topic: 'besy', difficulty: 'medium', skill: 'besy-tech',
    q: 'What is phishing?',
    opts: [
      'An attempt to deceive a person into revealing credentials or making a payment, usually by email',
      'A fault in accounting software that causes transactions to be posted to the wrong account',
      'A method of encrypting sensitive financial data before it is transmitted over a network',
      'The automatic import of bank transactions into the accounting system via a secure feed',
    ],
    ans: 0,
    exp: 'Phishing is social engineering — it targets the person, not the system, which is why staff awareness is the primary control against it.' },

  { id: 'besy-320', topic: 'besy', difficulty: 'medium', skill: 'besy-tech',
    q: 'Which of the following is a genuine risk of moving from a desktop accounting package to a cloud system?',
    opts: [
      'Access to the ledgers depends on an internet connection and on a third party\'s continuity',
      'Data can no longer be shared between more than one user at the same time',
      'The business becomes unable to produce statutory financial statements from the system',
      'Transactions must be entered twice, once locally and once in the cloud system',
    ],
    ans: 0,
    exp: 'Dependency on connectivity and on the provider is the real trade-off. Multi-user access and statutory reporting are things cloud systems do well, not things they remove.' }

);

/* ────────────────────────────────────────────────────────────────────────
   SYNOPTIC CROSS-UNIT SCENARIOS

   The real synoptic integrates the bookkeeping units with The Business
   Environment: a transaction is processed, then explained to someone. These
   replace the three costing scenarios that used to sit here — Principles of
   Costing is a unit assessment only and is never assessed in the synoptic.
   ──────────────────────────────────────────────────────────────────────── */
window.ALL_QUESTIONS.push(

  { id: 'sc-051', topic: 'synoptic', difficulty: 'medium', type: 'scenario', skill: 'besy-comms',
    setup: 'You are an accounts assistant at Foxglove Interiors Ltd, a VAT-registered company. On 12 May the business sells goods on credit to Marchmont Design for £1,600 plus VAT at 20%. On 19 May Marchmont returns goods with a net value of £200 and a credit note is issued. On 30 May Marchmont pays the balance in full by bank transfer.',
    parts: [
      { type: 'mcq', q: 'What is the double entry for the sale on 12 May?',
        opts: [
          'Dr Trade receivables £1,920, Cr Sales £1,600, Cr VAT £320',
          'Dr Trade receivables £1,600, Cr Sales £1,600',
          'Dr Sales £1,600, Dr VAT £320, Cr Trade receivables £1,920',
          'Dr Bank £1,920, Cr Sales £1,600, Cr VAT £320',
        ], ans: 0,
        exp: 'Gross = £1,600 × 1.20 = £1,920. The receivable is recorded gross; sales and VAT are credited separately.' },
      { type: 'numeric', q: 'What is the gross value of the credit note issued on 19 May?', answer: 240, unit: '£',
        exp: '£200 net × 1.20 = £240 gross, comprising £200 sales returns and £40 VAT.' },
      { type: 'numeric', q: 'What amount does Marchmont pay on 30 May?', answer: 1680, unit: '£',
        exp: '£1,920 − £240 = £1,680.' },
      { type: 'mcq', q: 'Marchmont emails asking why their statement shows £1,680 rather than the £1,920 on the original invoice. What should your reply do?',
        opts: [
          'Explain that a credit note for £240 was issued for the returned goods, reducing the balance to £1,680',
          'Ask Marchmont to pay the original £1,920 and treat the return as a separate matter later',
          'Explain that the difference arises from the VAT treatment of the original invoice',
          'Send a copy of the sales ledger account without commentary so they can work it out',
        ], ans: 0,
        exp: 'Name the document, the amount and the reason. The difference is entirely the £240 credit note — nothing to do with VAT treatment.' },
    ],
    exp: 'This mirrors synoptic Task 4: process the transactions correctly, then explain the resulting balance to the customer in plain terms.' },

  { id: 'sc-052', topic: 'synoptic', difficulty: 'hard', type: 'scenario', skill: 'besy-comms',
    setup: 'You work at Glenmore Supplies Ltd. The purchase ledger control account shows £32,400 at 31 July. The total of the individual supplier accounts is £33,150. Investigation finds that a purchase invoice for £750 was entered in the purchase day book and posted to the supplier\'s individual account, but the day book total posted to the control account was understated by the same amount.',
    parts: [
      { type: 'numeric', q: 'What is the difference between the control account and the list of supplier balances?', answer: 750, unit: '£',
        exp: '£33,150 − £32,400 = £750.' },
      { type: 'mcq', q: 'Which record requires correction?',
        opts: [
          'The purchase ledger control account, because the day book total posted to it was understated',
          'The individual supplier account, because the invoice should not have been posted to it',
          'Both records, because the invoice was entered twice in the purchase day book',
          'Neither record, because the difference is a timing difference that will reverse next month',
        ], ans: 0,
        exp: 'The individual account is right; the control account is understated by the amount the day book total was short.' },
      { type: 'mcq', q: 'What is the correcting entry?',
        opts: [
          'Dr Purchases £750, Cr Purchase ledger control account £750',
          'Dr Purchase ledger control account £750, Cr Purchases £750',
          'Dr Suspense £750, Cr Purchase ledger control account £750',
          'Dr Purchase ledger control account £750, Cr Bank £750',
        ], ans: 0,
        exp: 'Crediting the control account increases the payables balance to £33,150, matching the list. The debit completes the understated purchases figure.' },
      { type: 'mcq', q: 'Your manager asks for a note explaining the reconciliation. What must the note include to be useful?',
        opts: [
          'The difference, its cause, the correcting journal and the agreed balance after correction',
          'The corrected balance only, since the manager does not need the underlying detail',
          'A full listing of every invoice posted to the purchase ledger during July',
          'A statement that the accounts now balance, without identifying which record was wrong',
        ], ans: 0,
        exp: 'Figure, cause, action, outcome. Omitting which record was wrong makes the note unauditable.' },
    ],
    exp: 'Synoptic Task 5 shape combined with Task 4 communication: reconcile the control account, then report the reconciliation clearly.' },

  { id: 'sc-053', topic: 'synoptic', difficulty: 'medium', type: 'scenario', skill: 'besy-tech',
    setup: 'You are an accounts assistant at Rowan Fabrications Ltd. While processing the weekly payment run you notice that a supplier record was amended two days ago to change the bank account details. The amendment was made using the shared office login, and there is no supporting documentation on file. A payment of £8,400 to that supplier is due today.',
    parts: [
      { type: 'mcq', q: 'What is the most appropriate immediate action?',
        opts: [
          'Hold the payment and verify the change with the supplier using contact details already on file',
          'Release the payment, as the supplier record has already been updated in the system',
          'Release the payment but email the supplier afterwards to confirm it was received',
          'Amend the bank details back to the previous account and release the payment',
        ], ans: 0,
        exp: 'Verify before paying, using contact details you already hold — never those supplied with the change request.' },
      { type: 'mcq', q: 'Why does the use of a shared login make this situation harder to resolve?',
        opts: [
          'There is no audit trail identifying which individual made the amendment',
          'Shared logins prevent the accounting system from recording supplier bank details',
          'The payment run cannot be processed while a shared login is in use',
          'Shared logins automatically reverse any amendment made to a supplier record',
        ], ans: 0,
        exp: 'The amendment cannot be attributed to anyone, so it cannot be confirmed as legitimate or investigated properly.' },
      { type: 'mcq', q: 'Which control would most directly prevent a recurrence?',
        opts: [
          'Individual logins with amendments to bank details requiring separate authorisation',
          'Increasing the frequency of the payment run from weekly to daily',
          'Storing supplier bank details in a spreadsheet outside the accounting system',
          'Requiring all suppliers to be paid by cheque rather than bank transfer',
        ], ans: 0,
        exp: 'Attribution plus authorisation is the control pair. The other three either do not address the risk or introduce new ones.' },
    ],
    exp: 'Synoptic Task 7 shape: bookkeeping systems, payments and data security assessed together in a workplace situation.' }

);
