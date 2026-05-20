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
    opts: ['Profit earned', 'Amount above nominal value', 'Dividend paid', 'Loan interest'],
    ans: 1,
    exp: 'Share premium is the excess over nominal value of shares issued.' },

  { id: 'itbk-003', topic: 'itbk', difficulty: 'easy',
    q: 'A business purchases goods on credit. The correct entry is:',
    opts: ['Dr Purchases, Cr Bank', 'Dr Purchases, Cr Trade Payables', 'Dr Bank, Cr Sales', 'Dr Cash, Cr Purchases'],
    ans: 1,
    exp: 'Credit purchases increase liabilities (trade payables).' },

  { id: 'itbk-004', topic: 'itbk', difficulty: 'easy',
    q: 'A business receives a credit note from a supplier. In which book of prime entry is it recorded?',
    opts: ['Purchases day book', 'Sales returns day book', 'Purchases returns day book', 'Cash book'],
    ans: 2,
    exp: 'A credit note received from a supplier is recorded in the purchases returns day book. It reduces the amount owed to that supplier.' },

  { id: 'itbk-005', topic: 'itbk', difficulty: 'easy',
    q: 'A cash discount allowed to a customer is recorded as:',
    opts: ['Dr Discounts Received, Cr Trade Receivables', 'Dr Discounts Allowed, Cr Trade Receivables', 'Dr Sales, Cr Bank', 'Dr Trade Payables, Cr Discounts Allowed'],
    ans: 1,
    exp: 'Discounts Allowed is an expense (debit). Trade Receivables is reduced (credit) when the discount is granted to the customer.' },

  { id: 'itbk-006', topic: 'itbk', difficulty: 'easy',
    q: 'A credit balance on a customer\'s account indicates:',
    opts: ['The customer owes money to the business', 'The business owes money to the customer', 'The customer has not yet been invoiced', 'The account is in error'],
    ans: 1,
    exp: 'Customers normally have debit balances. A credit balance means the customer has overpaid or has been issued a credit note — the business owes them.' },

  { id: 'itbk-007', topic: 'itbk', difficulty: 'easy',
    q: 'A debit balance on the rent account represents:',
    opts: ['Rent received in advance', 'Rent paid — an expense', 'A reduction in rent expense', 'Rent owed to the business'],
    ans: 1,
    exp: 'Rent paid is an expense. Expense accounts have debit balances.' },

  { id: 'itbk-008', topic: 'itbk', difficulty: 'easy',
    q: 'A debit entry in the sales ledger control account (SLCA) most commonly represents:',
    opts: ['Cash received', 'Credit sales', 'Discount received', 'Bank charges'],
    ans: 1,
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
    opts: ['Request goods from a supplier', 'Confirm that ordered goods have been received and checked', 'Request payment from a customer', 'Record a sale'],
    ans: 1,
    exp: 'A GRN is an internal document confirming the quantity and condition of goods received. It is matched against the purchase order and supplier invoice before payment.' },

  { id: 'itbk-012', topic: 'itbk', difficulty: 'easy',
    q: 'A purchase return occurs when:',
    opts: ['Goods sold to a customer are returned', 'Goods bought from a supplier are returned to them', 'A tax refund is received', 'Cash is withdrawn from the bank'],
    ans: 1,
    exp: 'A purchase return is when the business sends goods back to a supplier. The supplier then issues a credit note.' },

  { id: 'itbk-013', topic: 'itbk', difficulty: 'easy',
    q: 'A remittance advice is sent by:',
    opts: ['The seller, to request payment', 'The buyer, to notify the seller of a payment', 'HMRC, to confirm tax paid', 'The bank, to confirm a transaction'],
    ans: 1,
    exp: 'The buyer sends a remittance advice to the supplier to advise which invoices are being paid, helping the supplier allocate the payment correctly.' },

  { id: 'itbk-014', topic: 'itbk', difficulty: 'easy',
    q: 'A sales invoice is posted twice to the sales ledger control account. The effect is:',
    opts: ['Overstated receivables', 'Understated receivables', 'No effect', 'Overstated liabilities'],
    ans: 0,
    exp: 'Posting a sales invoice twice debits the SLCA twice, overstating trade receivables.' },

  { id: 'itbk-015', topic: 'itbk', difficulty: 'easy',
    q: 'A supplier invoice is received but not recorded at year end. What is the effect?',
    opts: ['Overstated profit', 'Understated liabilities', 'Understated expenses and liabilities', 'Overstated assets only'],
    ans: 2,
    exp: 'Failing to record a supplier invoice at year end omits the expense (understating purchases/expenses) and the related liability (understating trade payables).' },

  { id: 'itbk-016', topic: 'itbk', difficulty: 'easy',
    q: 'A supplier issues a credit note after an invoice has been recorded. What is the correct adjustment?',
    opts: ['Increase purchases and liabilities', 'Decrease purchases and trade payables', 'Increase revenue', 'Decrease cash only'],
    ans: 1,
    exp: 'A credit note reduces the amount owed to the supplier.' },

  { id: 'itbk-017', topic: 'itbk', difficulty: 'easy',
    q: 'A trade discount is:',
    opts: ['A discount for early payment', 'A price reduction given at the time of sale to trade customers', 'Interest charged on late payments', 'A refund after goods are returned'],
    ans: 1,
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
    opts: ['Make transactions harder to trace', 'Allocate transactions to the correct ledger account for analysis', 'Prevent fraud', 'Reduce the number of transactions'],
    ans: 1,
    exp: 'Coding assigns a unique identifier to each transaction so it is posted to the correct account, cost centre or department — enabling accurate analysis and reporting.' },

  { id: 'itbk-021', topic: 'itbk', difficulty: 'easy',
    q: 'The trial balance is prepared to:',
    opts: ['Calculate profit', 'Check that total debits equal total credits', 'Show the cash position', 'List all assets and liabilities'],
    ans: 1,
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
    opts: ['Overdraft', 'Positive cash at bank', 'Liability', 'Revenue'],
    ans: 1,
    exp: 'A debit balance indicates money held in the bank account (asset).' },

  { id: 'itbk-025', topic: 'itbk', difficulty: 'easy',
    q: 'What is a bad debt?',
    opts: ['Overpayment', 'Irrecoverable receivable', 'Discount', 'Asset'],
    ans: 1,
    exp: 'A bad debt is a trade receivable considered irrecoverable. It is written off as an expense and removed from receivables.' },

  { id: 'itbk-026', topic: 'itbk', difficulty: 'easy',
    q: 'What is a remittance advice used for?',
    opts: ['Request payment', 'Confirm payment sent', 'Issue invoice', 'Record inventory'],
    ans: 1,
    exp: 'A remittance advice is sent by the buyer to the supplier confirming the payment made and the invoices it relates to.' },

  { id: 'itbk-027', topic: 'itbk', difficulty: 'easy',
    q: 'What is a bank overdraft?',
    opts: ['Asset', 'Negative bank balance', 'Income', 'Expense'],
    ans: 1,
    exp: 'A bank overdraft is a negative bank balance — money owed to the bank. It is classified as a current liability.' },

  { id: 'itbk-028', topic: 'itbk', difficulty: 'easy',
    q: 'What does the double-entry principle state?',
    opts: ['Each transaction is recorded once', 'Each transaction has equal debit and credit entries', 'Only cash is recorded', 'Only profit is recorded'],
    ans: 1,
    exp: 'Every transaction is recorded with equal debit and credit amounts, keeping the accounting equation in balance.' },

  { id: 'itbk-029', topic: 'itbk', difficulty: 'easy',
    q: 'What is a ledger?',
    opts: ['Source document', 'Collection of accounts', 'Invoice', 'Bank statement'],
    ans: 1,
    exp: 'A ledger is a collection of accounts in which all transactions of the business are recorded.' },

  { id: 'itbk-030', topic: 'itbk', difficulty: 'easy',
    q: 'What is petty cash typically used for?',
    opts: ['Paying large supplier invoices', 'Recording all bank transactions', 'Small day-to-day expenses paid in cash', 'Paying employee wages'],
    ans: 2,
    exp: 'Petty cash covers small miscellaneous expenses such as stamps and taxi fares — items too small to pay by BACS or cheque.' },

  { id: 'itbk-031', topic: 'itbk', difficulty: 'easy',
    q: 'What is a purchases return?',
    opts: ['Goods sold', 'Goods returned to supplier', 'Cash receipt', 'Discount received'],
    ans: 1,
    exp: 'A purchases return is when the business returns previously purchased goods to a supplier. The supplier issues a credit note.' },

  { id: 'itbk-032', topic: 'itbk', difficulty: 'easy',
    q: 'What is recorded in the journal?',
    opts: ['Routine cash sales', 'Non-routine adjustments', 'Bank statements', 'Invoices only'],
    ans: 1,
    exp: 'The journal records adjustments and non-routine entries.' },

  { id: 'itbk-033', topic: 'itbk', difficulty: 'easy',
    q: 'What is a sales return?',
    opts: ['Goods bought', 'Goods returned by customer', 'Cash sale', 'Credit note received'],
    ans: 1,
    exp: 'A sales return is when a customer returns goods previously sold to them. The business issues a credit note.' },

  { id: 'itbk-034', topic: 'itbk', difficulty: 'easy',
    q: 'What is the accounting treatment of drawings?',
    opts: ['Expense', 'Reduction in capital', 'Revenue', 'Asset'],
    ans: 1,
    exp: 'Drawings represent cash or goods withdrawn by the owner for personal use. They reduce the owner\'s capital, not profit.' },

  { id: 'itbk-035', topic: 'itbk', difficulty: 'easy',
    q: 'What is the effect of a debit entry to capital?',
    opts: ['Increases capital', 'Decreases capital', 'Increases profit', 'No effect'],
    ans: 1,
    exp: 'Capital has a credit balance. A debit entry reduces capital — for example drawings or losses.' },

  { id: 'itbk-036', topic: 'itbk', difficulty: 'easy',
    q: 'What is the effect of writing off a bad debt?',
    opts: ['Increase profit', 'Decrease trade receivables and profit', 'Increase assets', 'Increase liabilities'],
    ans: 1,
    exp: 'Writing off a bad debt reduces trade receivables (an asset) and recognises a bad-debt expense, which reduces profit.' },

  { id: 'itbk-037', topic: 'itbk', difficulty: 'easy',
    q: 'What is the normal balance of trade receivables?',
    opts: ['Credit', 'Debit', 'Zero', 'Negative'],
    ans: 1,
    exp: 'Assets like receivables have debit balances.' },

  { id: 'itbk-038', topic: 'itbk', difficulty: 'easy',
    q: 'What is the purpose of a remittance advice when a payment is made?',
    opts: ['Request a refund', 'Notify supplier of payment details', 'Approve credit terms', 'Record VAT'],
    ans: 1,
    exp: 'It informs the supplier which invoices are being settled.' },

  { id: 'itbk-039', topic: 'itbk', difficulty: 'easy',
    q: 'What is the purpose of control accounts?',
    opts: ['To replace ledgers', 'To provide a summary check on subsidiary ledgers', 'To record cash only', 'To calculate profit'],
    ans: 1,
    exp: 'Control accounts summarise ledger totals for verification.' },

  { id: 'itbk-040', topic: 'itbk', difficulty: 'easy',
    q: 'What is the purpose of the sales day book?',
    opts: ['To record cash sales only', 'To list all credit sales invoices before posting to the ledger', 'To reconcile the bank account', 'To record purchases from suppliers'],
    ans: 1,
    exp: 'The sales day book is a book of prime entry — it lists credit sales invoices before they are posted to the sales ledger and the SLCA.' },

  { id: 'itbk-041', topic: 'itbk', difficulty: 'easy',
    q: 'What is a trade discount?',
    opts: ['Early payment reduction', 'Immediate sale reduction', 'Tax refund', 'Loan discount'],
    ans: 1,
    exp: 'A trade discount is a price reduction given at the point of sale to trade customers. It is deducted before the invoice is raised and is not recorded separately in the ledger.' },

  { id: 'itbk-042', topic: 'itbk', difficulty: 'easy',
    q: 'What is a trade receivable?',
    opts: ['Supplier owed', 'Customer owed amount', 'Bank loan', 'Capital'],
    ans: 1,
    exp: 'A trade receivable is an amount owed to the business by a customer who has bought on credit.' },

  { id: 'itbk-043', topic: 'itbk', difficulty: 'easy',
    q: 'When a business pays a supplier, the correct double entry is:',
    opts: ['Dr Bank, Cr Trade Payables', 'Dr Trade Payables, Cr Bank', 'Dr Trade Payables, Cr Sales', 'Dr Purchases, Cr Bank'],
    ans: 1,
    exp: 'Paying a supplier reduces the liability (Dr Trade Payables) and reduces the bank balance (Cr Bank).' },

  { id: 'itbk-044', topic: 'itbk', difficulty: 'easy',
    q: 'Which account is affected when inventory is purchased on credit?',
    opts: ['Bank', 'Trade Payables', 'Sales', 'Capital'],
    ans: 1,
    exp: 'Buying inventory on credit increases the liability owed to the supplier — Cr Trade Payables.' },

  { id: 'itbk-045', topic: 'itbk', difficulty: 'easy',
    q: 'Which account is credited when goods are sold on credit?',
    opts: ['Bank', 'Sales', 'Trade Receivables', 'Purchases'],
    ans: 1,
    exp: 'Selling goods on credit recognises revenue: Dr Trade Receivables, Cr Sales.' },

  { id: 'itbk-046', topic: 'itbk', difficulty: 'easy',
    q: 'Which accounting treatment is required for irrecoverable debts recovered after being written off?',
    opts: ['Credit sales account', 'Credit bad debts expense', 'Credit trade receivables control account', 'Debit cash only'],
    ans: 1,
    exp: 'When a previously written-off debt is recovered, the recovery is credited to the bad-debts expense account, reducing the expense (or it can be credited to a separate "Bad Debts Recovered" income account).' },

  { id: 'itbk-047', topic: 'itbk', difficulty: 'easy',
    q: 'Which document accompanies goods delivered to a customer?',
    opts: ['Invoice', 'Delivery note', 'Credit note', 'Statement'],
    ans: 1,
    exp: 'A delivery note accompanies goods and confirms what has been physically delivered. The customer signs it on receipt.' },

  { id: 'itbk-048', topic: 'itbk', difficulty: 'easy',
    q: 'Which document confirms goods have been ordered from a supplier?',
    opts: ['Invoice', 'Purchase order', 'Credit note', 'Remittance advice'],
    ans: 1,
    exp: 'A purchase order is issued by the buyer to the supplier to request goods or services. It specifies what is being ordered and on what terms.' },

  { id: 'itbk-049', topic: 'itbk', difficulty: 'easy',
    q: 'Which document confirms that ordered goods have been delivered and checked against the order?',
    opts: ['Purchase order', 'Goods received note', 'Invoice', 'Remittance advice'],
    ans: 1,
    exp: 'A goods received note (GRN) is an internal document confirming that ordered goods have been received and checked. It is matched against the purchase order and supplier invoice before payment.' },

  { id: 'itbk-050', topic: 'itbk', difficulty: 'easy',
    q: 'Which document is sent by a seller to request payment?',
    opts: ['Credit note', 'Remittance advice', 'Purchase order', 'Sales invoice'],
    ans: 3,
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
    opts: ['Dr Trade Receivables, Cr Sales', 'Dr Bank, Cr Trade Receivables', 'Dr Bank, Cr Sales', 'Dr Sales, Cr Bank'],
    ans: 2,
    exp: 'A cash sale: Dr Bank (asset increases as money is received), Cr Sales (revenue increases). No receivable arises because payment is immediate.' },

  { id: 'itbk-055', topic: 'itbk', difficulty: 'easy',
    q: 'Which is posted to the credit side of the sales ledger control account (SLCA)?',
    opts: ['Credit sales invoices', 'Cash received from customers', 'Dishonoured cheques', 'Discounts received'],
    ans: 1,
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
    opts: ['Sales ledger', 'Purchases ledger', 'Nominal ledger', 'Cash book'],
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
    opts: ['Credit purchases', 'Returns to suppliers', 'Payments to suppliers', 'Both returns to suppliers AND payments to suppliers'],
    ans: 3,
    exp: 'The PLCA credit balance is reduced by both payments to suppliers (Dr PLCA, Cr Bank) and returns to suppliers (Dr PLCA, Cr Purchases Returns). Each reduces the liability.' },

  { id: 'itbk-063', topic: 'itbk', difficulty: 'easy',
    q: 'Which statement correctly describes the dual effect of transactions?',
    opts: ['Every transaction affects only one account', 'Every transaction has equal and opposite effects on at least two accounts', 'Every transaction must involve cash', 'Every transaction affects the bank account'],
    ans: 1,
    exp: 'The dual effect (duality) concept states that every transaction has at least two effects — equal debits and credits — and forms the foundation of double-entry bookkeeping.' },

  { id: 'itbk-064', topic: 'itbk', difficulty: 'easy',
    q: 'Which statement is correct about VAT input tax?',
    opts: ['Charged on sales', 'Charged on purchases', 'Paid to employees', 'Recorded as revenue'],
    ans: 1,
    exp: 'Input tax is the VAT charged to the business on purchases. It can usually be reclaimed from HMRC.' },

  { id: 'itbk-065', topic: 'itbk', difficulty: 'easy',
    q: 'Which statement is correct about VAT registered businesses?',
    opts: ['They do not charge VAT', 'They act as collectors of VAT for HMRC', 'They never reclaim VAT', 'VAT is a business expense'],
    ans: 1,
    exp: 'VAT-registered businesses charge VAT on taxable sales and collect it on behalf of HMRC. They reclaim VAT on eligible purchases and pay the net difference to HMRC.' },

  { id: 'itbk-066', topic: 'itbk', difficulty: 'easy',
    q: 'Which transaction is entered as a receipt in the cash book?',
    opts: ['A payment to a trade payable', 'A customer paying their invoice by BACS', 'Purchasing goods on credit', 'Issuing a credit note to a customer'],
    ans: 1,
    exp: 'Receipts represent money coming in. A customer paying by BACS increases the bank balance and is recorded on the receipts (debit) side of the cash book.' },

  { id: 'itbk-067', topic: 'itbk', difficulty: 'medium',
    q: 'A business maintains inventory records using FIFO. Closing inventory contains the most recent purchases because:',
    opts: ['Oldest items are sold first', 'Newest items are assumed to remain unsold', 'Average cost is applied', 'Inventory is revalued each month'],
    ans: 1,
    exp: 'FIFO assumes earliest items are used first, leaving latest purchases in closing inventory.' },

  { id: 'itbk-068', topic: 'itbk', difficulty: 'medium',
    q: 'A business receives a cheque from a customer that is subsequently dishonoured by the bank. Which entry reverses the original receipt?',
    opts: ['Dr Bank, Cr Trade Receivables', 'Dr Trade Receivables, Cr Bank', 'Dr Trade Receivables, Cr Sales', 'Dr Bank, Cr Sales'],
    ans: 1,
    exp: 'A dishonoured cheque reverses the original receipt: Dr Trade Receivables (re-instating the debt), Cr Bank (removing the amount from the bank).' },

  { id: 'itbk-069', topic: 'itbk', difficulty: 'medium',
    q: 'A cheque from a customer is later returned by the bank unpaid. The double entry to record this is:',
    opts: ['Dr Bank, Cr Sales', 'Dr Trade Receivables, Cr Bank', 'Dr Cash, Cr Bank', 'Dr Expenses, Cr Bank'],
    ans: 1,
    exp: 'The original receipt is reversed: Dr Trade Receivables, Cr Bank.' },

  { id: 'itbk-070', topic: 'itbk', difficulty: 'medium',
    q: 'A prepayment is shown in the financial statements as:',
    opts: ['A current liability', 'A long-term liability', 'A current asset', 'A capital expense'],
    ans: 2,
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
    opts: ['Bank errors', 'Timing and posting errors', 'VAT rates', 'Depreciation'],
    ans: 1,
    exp: 'Differences between the SLCA and the sum of individual sales ledger balances are caused by posting errors, omissions or timing differences.' },

  { id: 'itbk-074', topic: 'itbk', difficulty: 'medium',
    q: 'A supplier invoice is recorded as £540 in the purchases day book when the correct amount is £450. What type of error is this?',
    opts: ['Complete omission', 'Error of original entry', 'Compensating error', 'Error of principle'],
    ans: 1,
    exp: 'An error of original entry occurs when an incorrect figure is used at the point of entry. Both sides of the double entry are then wrong by the same amount, so the trial balance still balances.' },

  { id: 'itbk-075', topic: 'itbk', difficulty: 'medium',
    q: 'An accrual is best described as:',
    opts: ['An expense paid in advance of the period it relates to', 'Income received in advance', 'An expense incurred in the period but not yet invoiced or paid', 'A reduction in the value of an asset'],
    ans: 2,
    exp: 'An accrual is an expense incurred in the current period but not yet invoiced or paid. It is shown as a current liability on the statement of financial position.' },

  { id: 'itbk-076', topic: 'itbk', difficulty: 'medium',
    q: 'An accrual is omitted. What is the effect on profit?',
    opts: ['Overstated', 'Understated', 'No effect', 'Neutralised'],
    ans: 0,
    exp: 'An omitted accrual understates expenses, which overstates profit (and understates liabilities).' },

  { id: 'itbk-077', topic: 'itbk', difficulty: 'medium',
    q: 'Depreciation is charged on non-current assets to comply with which accounting concept?',
    opts: ['The matching (accruals) concept — spreading cost over the useful life', 'The prudence concept — writing assets off immediately', 'HMRC requirements', 'The going concern concept'],
    ans: 0,
    exp: 'The matching (accruals) concept requires the cost of a non-current asset to be spread over the periods that benefit from its use — achieved through depreciation.' },

  { id: 'itbk-078', topic: 'itbk', difficulty: 'medium',
    q: 'Depreciation is recorded to:',
    opts: ['Increase asset value', 'Match cost with usage over time', 'Increase cash flow', 'Reduce VAT'],
    ans: 1,
    exp: 'Depreciation spreads the cost of a non-current asset over its useful life, matching the cost to the periods that benefit from its use.' },

  { id: 'itbk-079', topic: 'itbk', difficulty: 'medium',
    q: 'The imprest system of petty cash means:',
    opts: ['Petty cash is restored to a fixed float at regular intervals', 'All expenses are paid from petty cash', 'There is no spending limit', 'Petty cash is only used for wages'],
    ans: 0,
    exp: 'Under the imprest system the float is restored to a fixed amount each period — reimbursed by the total of vouchers paid out since the last top-up.' },

  { id: 'itbk-080', topic: 'itbk', difficulty: 'medium',
    q: 'The prudence concept in accounting means:',
    opts: ['Revenue and profits are only recognised when reasonably certain; losses are recognised as soon as they are anticipated', 'All income is recorded immediately it is earned', 'Assets are always recorded at market value', 'Accounts are prepared on a cash basis'],
    ans: 0,
    exp: 'Prudence (conservatism) means not overstating assets or income, and not understating liabilities or expenses. Anticipated losses are recognised immediately; gains only when realised.' },

  { id: 'itbk-081', topic: 'itbk', difficulty: 'medium',
    q: 'What is a contra entry in a cash book?',
    opts: ['Bank charges', 'Transfer between cash and bank', 'Credit purchase', 'VAT adjustment'],
    ans: 1,
    exp: 'A contra entry in the cash book transfers money between the bank and cash columns — for example withdrawing cash from the bank: Cr Bank, Dr Cash.' },

  { id: 'itbk-082', topic: 'itbk', difficulty: 'medium',
    q: 'What is an accrual?',
    opts: ['Prepaid expense', 'Incurred unpaid expense', 'Asset', 'Revenue'],
    ans: 1,
    exp: 'An accrual is an expense that has been incurred during the period but not yet invoiced or paid. It is recognised by debiting the expense and crediting accruals (a liability).' },

  { id: 'itbk-083', topic: 'itbk', difficulty: 'medium',
    q: 'What is a prepayment?',
    opts: ['Future expense paid now', 'Outstanding invoice', 'Revenue', 'Capital'],
    ans: 0,
    exp: 'A prepayment is an expense paid in advance of the period to which it relates. It is recognised as a current asset until consumed.' },

  { id: 'itbk-084', topic: 'itbk', difficulty: 'medium',
    q: 'What is the effect of a contra entry between SLCA and PLCA?',
    opts: ['Increases liabilities', 'Reduces both receivables and payables', 'Increases sales', 'Has no effect'],
    ans: 1,
    exp: 'A contra between the SLCA and PLCA offsets mutual balances when the same business is both a customer and a supplier — reducing both receivables and payables by the same amount.' },

  { id: 'itbk-085', topic: 'itbk', difficulty: 'medium',
    q: 'Which accounting concept requires that the same accounting methods are used from one period to the next?',
    opts: ['Going concern', 'Accruals', 'Consistency', 'Materiality'],
    ans: 2,
    exp: 'The consistency concept requires the same accounting policies and methods to be applied from period to period, enabling meaningful comparison over time.' },

  { id: 'itbk-086', topic: 'itbk', difficulty: 'medium',
    q: 'Which accounting principle requires expenses to be matched with the revenue they help generate?',
    opts: ['Prudence', 'Matching (accruals)', 'Consistency', 'Materiality'],
    ans: 1,
    exp: 'The matching principle ensures expenses are recognised in the same period as related revenue.' },

  { id: 'itbk-087', topic: 'itbk', difficulty: 'medium',
    q: 'Which adjustment ensures income is recorded in the correct accounting period?',
    opts: ['Depreciation', 'Accruals and prepayments', 'Drawings', 'Capital introduced'],
    ans: 1,
    exp: 'Accruals and prepayments ensure matching of income and expenses.' },

  { id: 'itbk-088', topic: 'itbk', difficulty: 'medium',
    q: 'Which adjustment ensures matching of revenue and expenses?',
    opts: ['Bank reconciliation', 'Accruals and prepayments', 'Depreciation only', 'Trial balance'],
    ans: 1,
    exp: 'Accruals and prepayments apply the matching (accruals) concept, ensuring revenue and expenses are recognised in the period to which they relate.' },

  { id: 'itbk-089', topic: 'itbk', difficulty: 'medium',
    q: 'Which adjustment ensures non-current assets are stated at carrying value?',
    opts: ['Accruals', 'Depreciation', 'Revaluation of inventory', 'Bank reconciliation'],
    ans: 1,
    exp: 'Depreciation reduces an asset’s carrying amount over time to reflect its consumption or wear and tear.' },

  { id: 'itbk-090', topic: 'itbk', difficulty: 'medium',
    q: 'Which adjustment is required when insurance is paid in advance?',
    opts: ['Accrual', 'Depreciation', 'Prepayment', 'Provision'],
    ans: 2,
    exp: 'Insurance paid in advance is a prepayment — an expense paid before the period it covers.' },

  { id: 'itbk-091', topic: 'itbk', difficulty: 'medium',
    q: 'Which adjustment is required when rent is paid quarterly in arrears and the year end falls mid-quarter?',
    opts: ['Prepayment only', 'Accrual only', 'Both accrual and prepayment', 'No adjustment needed'],
    ans: 1,
    exp: 'Rent owed but not yet paid at year end requires an accrual.' },

  { id: 'itbk-092', topic: 'itbk', difficulty: 'medium',
    q: 'Which entry records depreciation?',
    opts: ['Dr Asset, Cr Expense', 'Dr Depreciation Expense, Cr Accumulated Depreciation', 'Dr Cash, Cr Asset', 'Dr Liability, Cr Expense'],
    ans: 1,
    exp: 'Depreciation is recorded as an expense with a credit to accumulated depreciation.' },

  { id: 'itbk-093', topic: 'itbk', difficulty: 'medium',
    q: 'Which of the following best describes the going concern concept?',
    opts: ['Assets are recorded at their net realisable value', 'The business is assumed to continue operating for the foreseeable future', 'All expenses are recognised when cash is paid', 'Accounts must be prepared consistently each year'],
    ans: 1,
    exp: 'The going concern concept assumes the business will continue to operate for the foreseeable future, justifying recording assets at cost rather than break-up value.' },

  { id: 'itbk-094', topic: 'itbk', difficulty: 'medium',
    q: 'Which of the following is an example of a contra entry within a three-column cash book?',
    opts: ['A customer pays by BACS', 'Cash is withdrawn from the bank and placed in the petty cash tin', 'A supplier is paid by cheque', 'A cash sale is made'],
    ans: 1,
    exp: 'A cash book contra arises when cash moves between the bank and cash columns — e.g. withdrawing cash from the bank: Cr Bank column, Dr Cash column.' },

  { id: 'itbk-095', topic: 'itbk', difficulty: 'medium',
    q: 'Which of the following is NOT a valid reason for a difference between the sales ledger control account and the list of sales ledger balances?',
    opts: ['A contra entry posted to the control account but not to the individual customer account', 'A cash receipt entered in the cash book but not posted to the individual customer account', 'An error in the bank reconciliation', 'A sales invoice entered in the day book but not posted to the individual customer account'],
    ans: 2,
    exp: 'A bank reconciliation reconciles the cash book to the bank statement — it has no impact on the sales ledger or its control account.' },

  { id: 'itbk-096', topic: 'itbk', difficulty: 'medium',
    q: 'Which statement best describes a control account reconciliation?',
    opts: ['Matching bank and cash book', 'Matching control account totals with individual ledger balances', 'Matching profit and loss accounts', 'Matching VAT returns'],
    ans: 1,
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
    opts: ['Dr Bad debts Cr Sales', 'Dr Bad debts Cr Trade receivables', 'Dr Cash Cr Trade receivables', 'Dr Revenue Cr Bank'],
    ans: 1,
    exp: 'Writing off a bad debt reduces trade receivables and recognises a bad-debts expense: Dr Bad Debts, Cr Trade Receivables.' },

  { id: 'itbk-105', topic: 'itbk', difficulty: 'hard',
    q: 'A business writes off a bad debt of £240 (including VAT of £40). Which entry is correct?',
    opts: ['Dr Bad Debts £240, Cr Trade Receivables £240', 'Dr Bad Debts £200, Dr VAT £40, Cr Trade Receivables £240', 'Dr Trade Receivables £240, Cr Bad Debts £240', 'Dr Bad Debts £240, Cr Bank £240'],
    ans: 1,
    exp: 'Where the strict VAT bad-debt-relief conditions are met, the VAT element can be reclaimed: Dr Bad Debts £200 (net), Dr VAT £40 (reclaimed), Cr Trade Receivables £240 (gross).' },

  { id: 'itbk-106', topic: 'itbk', difficulty: 'hard',
    q: 'A customer pays £490 in full settlement of a £500 debt. The £10 difference is:',
    opts: ['A trade discount, posted to discounts allowed', 'A settlement discount, posted to discounts allowed and trade receivables', 'A trade discount, not recorded in the ledger', 'A settlement discount, posted to sales returns'],
    ans: 1,
    exp: 'A settlement (cash) discount IS recorded in the ledger: Dr Discounts Allowed £10, Cr Trade Receivables £10. Trade discounts are never posted to the ledger.' },

  { id: 'itbk-107', topic: 'itbk', difficulty: 'hard',
    q: 'A sole trader\'s drawings of £500 in cash should be recorded as:',
    opts: ['Dr Drawings, Cr Sales', 'Dr Drawings, Cr Bank', 'Dr Capital, Cr Bank', 'Dr Expenses, Cr Bank'],
    ans: 1,
    exp: 'Drawings represent money taken out of the business by the owner. Dr Drawings £500 (reduces capital ultimately), Cr Bank £500. Drawings are not an expense.' },

  { id: 'itbk-108', topic: 'itbk', difficulty: 'hard',
    q: 'A supplier invoice for £1,000 net plus 20% VAT (£1,200 gross) is recorded by debiting purchases with the full £1,200. What is the effect?',
    opts: ['Purchases (expenses) are overstated and input VAT is missing', 'Trade payables are understated', 'No effect — both sides balance', 'Revenue is understated'],
    ans: 0,
    exp: 'Purchases should have been £1,000 net with £200 debited separately to VAT control. Posting the gross £1,200 to purchases overstates expenses by £200 and means no input VAT is reclaimable from HMRC.' },

  { id: 'itbk-109', topic: 'itbk', difficulty: 'hard',
    q: 'A trade payable balance of £3,600 is settled by issuing a cheque for £3,528 in full and final settlement. The £72 difference is:',
    opts: ['A trade discount — not recorded', 'A settlement discount received — credited to discounts received', 'A purchase return — credited to purchases returns', 'A refund — debited to bank'],
    ans: 1,
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
    opts: ['Record cash receipts', 'Make adjustments not covered by other books of prime entry', 'List credit purchases', 'Record petty cash transactions'],
    ans: 1,
    exp: 'The journal handles non-routine entries — corrections, opening balances, accruals, prepayments and bad debt write-offs.' },

  { id: 'pobc-006', topic: 'pobc', difficulty: 'easy',
    q: 'A normal reason for the cash book and bank statement to differ is:',
    opts: ['Accountant error', 'Timing differences such as unpresented cheques', 'Too many suppliers', 'The financial year ending'],
    ans: 1,
    exp: 'Timing differences — for example unpresented cheques and outstanding lodgements — are the normal reason for differences between the cash book and the bank statement.' },

  { id: 'pobc-007', topic: 'pobc', difficulty: 'easy',
    q: 'A sales ledger control account is reduced by:',
    opts: ['Credit sales', 'Cash received from customers', 'Credit purchases', 'Purchase returns'],
    ans: 1,
    exp: 'Cash received from customers reduces the balance owed and is credited to the SLCA.' },

  { id: 'pobc-008', topic: 'pobc', difficulty: 'easy',
    q: 'A suspense account balance remains after correction. What does this indicate?',
    opts: ['All errors found', 'Further errors still exist', 'Bank error', 'VAT mismatch'],
    ans: 1,
    exp: 'A remaining suspense balance shows that further errors have not yet been identified or corrected.' },

  { id: 'pobc-009', topic: 'pobc', difficulty: 'easy',
    q: 'A suspense account is cleared by:',
    opts: ['Increasing revenue', 'Correcting bookkeeping errors', 'Changing VAT rate', 'Adjusting wages'],
    ans: 1,
    exp: 'A suspense account is cleared by identifying the underlying errors and correcting them by journal entry.' },

  { id: 'pobc-010', topic: 'pobc', difficulty: 'easy',
    q: 'A suspense account is cleared when:',
    opts: ['Revenue increases', 'Errors are corrected', 'VAT is paid', 'Assets are revalued'],
    ans: 1,
    exp: 'Suspense accounts exist until errors are identified and corrected.' },

  { id: 'pobc-011', topic: 'pobc', difficulty: 'easy',
    q: 'A transposition error will:',
    opts: ['Always balance the trial balance', 'Always cause imbalance', 'Never affect accounts', 'Only affect VAT'],
    ans: 1,
    exp: 'A transposition error (e.g. recording £45 as £54) means one side is wrong by a multiple of nine, so total debits typically no longer equal total credits and the trial balance disagrees.' },

  { id: 'pobc-012', topic: 'pobc', difficulty: 'easy',
    q: 'An unpresented cheque is:',
    opts: ['A cheque sent to a supplier that has not yet cleared the bank', 'A direct debit not in the cash book', 'A deposit not on the bank statement', 'Bank charges not recorded'],
    ans: 0,
    exp: 'An unpresented cheque has been recorded in the cash book but has not yet cleared through the bank.' },

  { id: 'pobc-013', topic: 'pobc', difficulty: 'easy',
    q: 'Bank charges shown on the bank statement but not in the cash book should be:',
    opts: ['Added to cash book receipts', 'Entered as a payment in the cash book', 'Ignored', 'Added to the bank statement'],
    ans: 1,
    exp: 'Bank charges reduce the bank balance — enter them as a payment (credit) in the cash book to bring it up to date.' },

  { id: 'pobc-014', topic: 'pobc', difficulty: 'easy',
    q: 'Clearing a suspense account requires:',
    opts: ['Increasing profit', 'Identifying and correcting errors', 'Changing VAT rates', 'Adjusting inventory'],
    ans: 1,
    exp: 'Errors must be located and corrected to clear suspense.' },

  { id: 'pobc-015', topic: 'pobc', difficulty: 'easy',
    q: 'Every journal entry must include:',
    opts: ['Director approval', 'A narrative explaining the entry', 'Two separate journal entries', 'A new bank account'],
    ans: 1,
    exp: 'Journal entries always require a narrative for the audit trail — explaining the nature, reason and date of the entry.' },

  { id: 'pobc-016', topic: 'pobc', difficulty: 'easy',
    q: 'Net pay equals:',
    opts: ['Employer\'s NIC', 'Gross pay minus employee deductions', 'Total employment cost', 'PAYE only'],
    ans: 1,
    exp: 'Net pay = gross pay − PAYE − employee NIC − pension contributions − other deductions.' },

  { id: 'pobc-017', topic: 'pobc', difficulty: 'easy',
    q: 'Outstanding lodgements are:',
    opts: ['Cheques sent to suppliers that have not yet cleared', 'Deposits recorded in the cash book but not yet on the bank statement', 'Bank charges not in the cash book', 'Unrecorded direct debits'],
    ans: 1,
    exp: 'Outstanding lodgements are deposits the business has made and recorded in the cash book, but which have not yet appeared on the bank statement.' },

  { id: 'pobc-018', topic: 'pobc', difficulty: 'easy',
    q: 'The payroll journal records:',
    opts: ['All cash payments', 'Gross wages, NICs, deductions and net pay', 'Bank transactions only', 'Supplier invoices'],
    ans: 1,
    exp: 'The payroll journal records gross pay, PAYE, employee and employer NICs, pension deductions and net pay.' },

  { id: 'pobc-019', topic: 'pobc', difficulty: 'easy',
    q: 'The purchases ledger control account normally has:',
    opts: ['A debit balance', 'A credit balance representing amounts owed to suppliers', 'A nil balance', 'A debit balance equal to total purchases'],
    ans: 1,
    exp: 'The PLCA represents trade payables — a liability — and therefore normally has a credit balance.' },

  { id: 'pobc-020', topic: 'pobc', difficulty: 'easy',
    q: 'The sales ledger control account balance should agree with:',
    opts: ['Total supplier balances in the purchases ledger', 'Total individual customer balances in the sales ledger', 'The bank statement balance', 'Total journal entries'],
    ans: 1,
    exp: 'The SLCA is a summary account — its balance must equal the total of all individual customer balances in the sales ledger.' },

  { id: 'pobc-021', topic: 'pobc', difficulty: 'easy',
    q: 'Total employment cost to the employer is:',
    opts: ['The employee\'s net pay', 'The employee\'s gross pay', 'Gross pay plus employer\'s NIC and employer\'s pension contributions', 'Net pay plus income tax'],
    ans: 2,
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
    opts: ['Refund due', 'Owed to HMRC', 'No VAT', 'Input exceeds output'],
    ans: 1,
    exp: 'A credit balance on the VAT control account means output tax exceeds input tax — the business owes the difference to HMRC.' },

  { id: 'pobc-025', topic: 'pobc', difficulty: 'easy',
    q: 'What is a journal correction used for?',
    opts: ['Sales recording', 'Error correction', 'Bank deposits', 'Inventory valuation'],
    ans: 1,
    exp: 'A journal correction is used to correct bookkeeping errors and post any non-routine adjustments.' },

  { id: 'pobc-026', topic: 'pobc', difficulty: 'easy',
    q: 'What is a suspense account used for?',
    opts: ['Profit recording', 'Trial balance difference', 'Cash receipts', 'VAT claims'],
    ans: 1,
    exp: 'A suspense account holds the difference temporarily when the trial balance does not balance, pending investigation.' },

  { id: 'pobc-027', topic: 'pobc', difficulty: 'easy',
    q: 'What is a cash book?',
    opts: ['Ledger only', 'Record of bank and cash', 'Invoice book', 'VAT record'],
    ans: 1,
    exp: 'The cash book is a book of prime entry that records all bank and cash transactions, acting as both a day book and part of the ledger.' },

  { id: 'pobc-028', topic: 'pobc', difficulty: 'easy',
    q: 'What is the main purpose of a control account?',
    opts: ['Record VAT', 'Summarise ledger', 'Pay wages', 'Calculate tax'],
    ans: 1,
    exp: 'A control account holds the total of a subsidiary ledger, allowing the ledger to be verified by comparing the two.' },

  { id: 'pobc-029', topic: 'pobc', difficulty: 'easy',
    q: 'What is employer\'s National Insurance contribution (NIC)?',
    opts: ['Employee tax', 'Business payroll cost', 'Sales tax', 'Bank charge'],
    ans: 1,
    exp: 'Employer\'s NIC is an additional employment cost paid by the employer to HMRC based on each employee\'s earnings above the secondary threshold.' },

  { id: 'pobc-030', topic: 'pobc', difficulty: 'easy',
    q: 'What is input VAT?',
    opts: ['VAT on sales', 'VAT on purchases', 'Income tax', 'Payroll tax'],
    ans: 1,
    exp: 'Input VAT is the VAT charged to the business on purchases of goods and services. It is generally reclaimable from HMRC.' },

  { id: 'pobc-031', topic: 'pobc', difficulty: 'easy',
    q: 'What is labour turnover?',
    opts: ['Wages paid', 'Employee replacement rate', 'Output per worker', 'Hours worked'],
    ans: 1,
    exp: 'Labour turnover measures the rate at which employees leave and need replacing. High turnover increases recruitment and training costs.' },

  { id: 'pobc-032', topic: 'pobc', difficulty: 'easy',
    q: 'What is PAYE?',
    opts: ['Sales tax', 'Income tax deducted from wages', 'VAT', 'Corporation tax'],
    ans: 1,
    exp: 'PAYE (Pay As You Earn) is income tax deducted at source from employees’ wages by the employer and paid to HMRC.' },

  { id: 'pobc-033', topic: 'pobc', difficulty: 'easy',
    q: 'What is the purpose of the payroll journal?',
    opts: ['Sales', 'Record wages and deductions', 'VAT', 'Inventory'],
    ans: 1,
    exp: 'The payroll journal records gross wages, employee and employer NICs, PAYE, pension contributions and net pay for the period.' },

  { id: 'pobc-034', topic: 'pobc', difficulty: 'easy',
    q: 'How is a suspense account cleared?',
    opts: ['Profit', 'Correction entries', 'Sales', 'Cash'],
    ans: 1,
    exp: 'A suspense account is cleared by identifying the underlying errors and posting correcting journal entries.' },

  { id: 'pobc-035', topic: 'pobc', difficulty: 'easy',
    q: 'What is the main benefit of internal audit?',
    opts: ['Increase revenue', 'Independent review of internal controls', 'Reduce tax liability', 'Prepare budgets'],
    ans: 1,
    exp: 'Internal audit provides an independent, objective review of the organisation’s internal controls, risk management and governance processes.' },

  { id: 'pobc-036', topic: 'pobc', difficulty: 'easy',
    q: 'What is the main purpose of internal controls?',
    opts: ['Increase profit', 'Prevent and detect errors and fraud', 'Reduce tax', 'Increase sales'],
    ans: 1,
    exp: 'Internal controls are designed to safeguard assets, ensure the accuracy and completeness of records, and prevent and detect errors and fraud.' },

  { id: 'pobc-037', topic: 'pobc', difficulty: 'easy',
    q: 'What is the purpose of a suspense account?',
    opts: ['Store cash temporarily', 'Record trial balance differences', 'Record sales', 'Record inventory'],
    ans: 1,
    exp: 'Suspense accounts hold temporary differences until corrected.' },

  { id: 'pobc-038', topic: 'pobc', difficulty: 'easy',
    q: 'What is the purpose of internal controls?',
    opts: ['Increase profit', 'Prevent errors and fraud', 'Reduce tax', 'Increase wages'],
    ans: 1,
    exp: 'Internal controls safeguard assets and reduce the risk of error and fraud.' },

  { id: 'pobc-039', topic: 'pobc', difficulty: 'easy',
    q: 'What is the purpose of sequential document numbering?',
    opts: ['Increase speed', 'Ensure completeness and traceability', 'Reduce costs', 'Increase profit'],
    ans: 1,
    exp: 'Sequential numbering of invoices, credit notes and cheques means missing or duplicated documents are quickly spotted, improving completeness controls.' },

  { id: 'pobc-040', topic: 'pobc', difficulty: 'easy',
    q: 'Which account is credited for wages paid?',
    opts: ['Wages expense', 'Bank', 'Capital', 'Revenue'],
    ans: 1,
    exp: 'Wages paid reduce the bank balance, so Bank is credited (Dr Wages Expense, Cr Bank).' },

  { id: 'pobc-041', topic: 'pobc', difficulty: 'easy',
    q: 'Which control account is used for VAT reporting?',
    opts: ['Sales ledger control account', 'VAT control account', 'Purchases ledger control account', 'Cash book'],
    ans: 1,
    exp: 'The VAT control account summarises output tax (on sales) and input tax (on purchases); its balance is the amount due to or from HMRC.' },

  { id: 'pobc-042', topic: 'pobc', difficulty: 'easy',
    q: 'Which control account reconciles suppliers?',
    opts: ['SLCA', 'PLCA', 'VAT account', 'Cash book'],
    ans: 1,
    exp: 'The purchases ledger control account (PLCA) summarises supplier balances and is used to verify the purchases ledger.' },

  { id: 'pobc-043', topic: 'pobc', difficulty: 'easy',
    q: 'Which document supports payroll entries?',
    opts: ['Invoice', 'Payslip', 'Statement', 'Credit note'],
    ans: 1,
    exp: 'Payslips are the source documents that evidence the gross pay, deductions and net pay recorded in the payroll journal.' },

  { id: 'pobc-044', topic: 'pobc', difficulty: 'easy',
    q: 'Which error would still allow the trial balance to agree?',
    opts: ['Single entry error', 'Transposition error affecting both sides equally', 'Omission of transaction', 'Posting to wrong account type'],
    ans: 1,
    exp: 'Equal and opposite errors on the two sides offset each other, so the trial balance still agrees and the errors are not detected.' },

  { id: 'pobc-045', topic: 'pobc', difficulty: 'easy',
    q: 'Which is a source document?',
    opts: ['Ledger', 'Invoice', 'Trial balance', 'Profit statement'],
    ans: 1,
    exp: 'Source documents (such as invoices, credit notes and bank statements) provide the original evidence for transactions.' },

  { id: 'pobc-046', topic: 'pobc', difficulty: 'easy',
    q: 'Which item appears in a suspense account temporarily?',
    opts: ['Correct transactions', 'Unidentified differences', 'Capital expenditure', 'Sales revenue'],
    ans: 1,
    exp: 'A suspense account temporarily holds unidentified differences until the underlying errors have been located and corrected.' },

  { id: 'pobc-047', topic: 'pobc', difficulty: 'easy',
    q: 'Which of the following causes the cash book balance to be HIGHER than the bank statement balance?',
    opts: ['Unpresented cheques', 'Outstanding lodgements', 'Bank charges not in the cash book', 'Unrecorded direct debit'],
    ans: 1,
    exp: 'Outstanding lodgements have been recorded in the cash book but not yet on the bank statement — so the cash book balance is higher.' },

  { id: 'pobc-048', topic: 'pobc', difficulty: 'easy',
    q: 'Which reduces trade receivables control account?',
    opts: ['Credit sales', 'Cash received', 'Purchases', 'Capital'],
    ans: 1,
    exp: 'Cash received from customers reduces the amount owed and is therefore credited to the trade receivables (SLCA) account.' },

  { id: 'pobc-049', topic: 'pobc', difficulty: 'easy',
    q: 'Which type of error IS detected by a trial balance?',
    opts: ['A transaction completely omitted', 'A posting to the wrong account but on the correct side', 'Different debit and credit amounts entered for the same transaction', 'A transaction entered twice'],
    ans: 2,
    exp: 'A trial balance only detects arithmetic imbalances. Posting different debit and credit amounts will leave the totals unequal.' },

  { id: 'pobc-050', topic: 'pobc', difficulty: 'medium',
    q: 'A bank reconciliation identifies:',
    opts: ['Only fraud', 'Differences between cash book and bank statement', 'Only profit errors', 'Only VAT errors'],
    ans: 1,
    exp: 'A bank reconciliation identifies and explains the differences between the cash book balance and the bank statement balance — typically timing differences or unrecorded items.' },

  { id: 'pobc-051', topic: 'pobc', difficulty: 'medium',
    q: 'A bank reconciliation is used to:',
    opts: ['Calculate profit', 'Reconcile the cash book balance with the bank statement balance', 'Check that all invoices have been paid', 'Reconcile VAT'],
    ans: 1,
    exp: 'A bank reconciliation identifies and explains timing differences between the cash book balance and the bank statement balance.' },

  { id: 'pobc-052', topic: 'pobc', difficulty: 'medium',
    q: 'A bank reconciliation shows adjusted cash book higher than bank statement. This suggests:',
    opts: ['Unpresented cheques', 'Outstanding lodgements', 'Bank errors favouring business', 'No transactions recorded'],
    ans: 1,
    exp: 'Outstanding lodgements increase cash book relative to bank.' },

  { id: 'pobc-053', topic: 'pobc', difficulty: 'medium',
    q: 'A compensating error occurs when:',
    opts: ['Two errors cancel each other out', 'The bank makes a posting error', 'The trial balance is incorrect', 'An auditor finds an error'],
    ans: 0,
    exp: 'A compensating error occurs when two unrelated errors of equal value on opposite sides offset each other, leaving the trial balance balanced.' },

  { id: 'pobc-054', topic: 'pobc', difficulty: 'medium',
    q: 'A contra entry between control accounts occurs when:',
    opts: ['A customer is also a supplier and amounts are offset against each other', 'The bank account is reconciled', 'VAT is reclaimed', 'A journal error is corrected'],
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
    opts: ['Correct postings', 'Timing differences or posting errors', 'Depreciation', 'Gross profit misstatement'],
    ans: 1,
    exp: 'Differences between a control account and its subsidiary ledger are typically caused by posting errors, omissions or timing differences.' },

  { id: 'pobc-059', topic: 'pobc', difficulty: 'medium',
    q: 'A payment is posted to the wrong supplier account. This is an example of:',
    opts: ['Error of omission', 'Error of commission', 'Error of principle', 'Compensating error'],
    ans: 1,
    exp: 'Posting to the correct type of account but the wrong specific account (e.g. wrong supplier) is an error of commission.' },

  { id: 'pobc-060', topic: 'pobc', difficulty: 'medium',
    q: 'A suspense account is opened when:',
    opts: ['All accounts balance', 'A compensating error exists', 'The trial balance does not balance', 'A new asset is purchased'],
    ans: 2,
    exp: 'A suspense account temporarily holds the difference when a trial balance does not balance, while errors are traced and corrected.' },

  { id: 'pobc-061', topic: 'pobc', difficulty: 'medium',
    q: 'Which type of error will NOT be revealed by a trial balance?',
    opts: ['Transposition error (digits reversed)', 'A complete omission of a transaction', 'A single-sided entry', 'Unequal debit and credit amounts'],
    ans: 1,
    exp: 'A complete omission affects neither the debit nor the credit side, so the trial balance still balances and the error remains undetected by it.' },

  { id: 'pobc-062', topic: 'pobc', difficulty: 'medium',
    q: 'An audit trail allows:',
    opts: ['Profit manipulation', 'Tracing transactions to source documents', 'Tax avoidance', 'Budget creation'],
    ans: 1,
    exp: 'An audit trail links every accounting entry back to its source document, providing the evidence needed for review, audit and investigation.' },

  { id: 'pobc-063', topic: 'pobc', difficulty: 'medium',
    q: 'An error of commission occurs when:',
    opts: ['A transaction is completely omitted', 'A transaction is posted to the wrong specific account of the correct type', 'The wrong amount is used', 'Debit and credit are reversed'],
    ans: 1,
    exp: 'Error of commission: correct account type but wrong specific account — for example posted to the wrong supplier account.' },

  { id: 'pobc-064', topic: 'pobc', difficulty: 'medium',
    q: 'An error of original entry occurs when:',
    opts: ['A transaction is posted to the wrong account', 'The wrong figure is used for both the debit and the credit', 'A transaction is omitted', 'Debit and credit are reversed'],
    ans: 1,
    exp: 'In an error of original entry the wrong figure is entered for both sides — the trial balance still balances, but the amount is wrong.' },

  { id: 'pobc-065', topic: 'pobc', difficulty: 'medium',
    q: 'An error of principle occurs when:',
    opts: ['Capital expenditure is recorded as a repair expense', 'A payment is posted to the wrong supplier', 'Digits are transposed', 'A transaction is omitted'],
    ans: 0,
    exp: 'Error of principle: the transaction is posted to the wrong type of account — for example treating capital expenditure as revenue expenditure.' },

  { id: 'pobc-066', topic: 'pobc', difficulty: 'medium',
    q: 'A reversal of entries (debits and credits swapped) is recorded for a transaction. What is the effect on the trial balance?',
    opts: ['It causes total debits and credits to be unequal', 'The trial balance still balances, but the accounts contain the wrong figures', 'It produces no effect at all', 'It only affects the asset section'],
    ans: 1,
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
    opts: ['Replace ledger accounts', 'Provide a summary total for reconciliation', 'Record cash transactions only', 'Calculate profit'],
    ans: 1,
    exp: 'Control accounts summarise the totals of the subsidiary ledgers, providing a single figure that can be reconciled to confirm the underlying ledger is accurate.' },

  { id: 'pobc-070', topic: 'pobc', difficulty: 'medium',
    q: 'What does a bank reconciliation identify?',
    opts: ['Profit errors', 'Differences between cash book and bank statement', 'Tax liabilities', 'Payroll errors'],
    ans: 1,
    exp: 'A bank reconciliation identifies differences between the cash book and the bank statement — primarily timing differences and unrecorded items.' },

  { id: 'pobc-071', topic: 'pobc', difficulty: 'medium',
    q: 'What does a debit balance on PLCA mean?',
    opts: ['Owed to suppliers', 'Prepayment to suppliers', 'Profit', 'Sales'],
    ans: 1,
    exp: 'The PLCA normally has a credit balance (a liability). A debit balance indicates an overpayment to suppliers — the supplier now owes the business.' },

  { id: 'pobc-072', topic: 'pobc', difficulty: 'medium',
    q: 'What does reconciliation ensure?',
    opts: ['Profit calculation', 'Records match external statements', 'Tax reduction', 'Payroll accuracy only'],
    ans: 1,
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
    opts: ['Wrong account type', 'Wrong account within same type', 'No entry made', 'Wrong totals'],
    ans: 1,
    exp: 'An error of commission occurs when a transaction is posted to the correct type of account but to the wrong specific account.' },

  { id: 'pobc-076', topic: 'pobc', difficulty: 'medium',
    q: 'What is the aim of a bank reconciliation?',
    opts: ['Profit', 'Match cash book and bank statement', 'Payroll', 'Tax'],
    ans: 1,
    exp: 'A bank reconciliation aims to ensure the cash book balance agrees with the bank statement balance after explaining timing differences and adjusting for unrecorded items.' },

  { id: 'pobc-077', topic: 'pobc', difficulty: 'medium',
    q: 'What is the impact of a timing difference in bank reconciliation?',
    opts: ['Permanent error', 'Temporary difference only', 'Fraud indicator', 'Ledger omission'],
    ans: 1,
    exp: 'Timing differences (such as unpresented cheques and outstanding lodgements) are temporary — they resolve once the items clear the bank.' },

  { id: 'pobc-078', topic: 'pobc', difficulty: 'medium',
    q: 'What is the purpose of audit trail documentation?',
    opts: ['Increase profit', 'Track all accounting entries back to source documents', 'Reduce wages', 'Calculate VAT'],
    ans: 1,
    exp: 'Audit-trail documentation enables every transaction to be traced back to its source document, supporting completeness and accuracy.' },

  { id: 'pobc-079', topic: 'pobc', difficulty: 'medium',
    q: 'What is the purpose of segregation of duties in payroll?',
    opts: ['Increase wages', 'Prevent fraud by splitting responsibilities', 'Reduce tax', 'Improve sales'],
    ans: 1,
    exp: 'In payroll, segregation of duties between staff who set up new employees, authorise pay and process payments reduces the risk that one person can commit fraud and conceal it.' },

  { id: 'pobc-080', topic: 'pobc', difficulty: 'medium',
    q: 'Which action helps prevent errors in bookkeeping systems?',
    opts: ['Reducing audit trail', 'Segregation of duties', 'Ignoring reconciliations', 'Manual duplication'],
    ans: 1,
    exp: 'Segregation of duties spreads recording, authorising and reviewing across different people, making errors and fraud easier to detect.' },

  { id: 'pobc-081', topic: 'pobc', difficulty: 'medium',
    q: 'Which control reduces the risk of theft of cash?',
    opts: ['Bank reconciliation', 'Segregation of duties', 'Depreciation', 'Budgeting'],
    ans: 1,
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
    opts: ['A single-sided posting', 'Posting to the wrong account on the correct side', 'A transposition error on one side only', 'Unequal debit and credit amounts'],
    ans: 1,
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
    opts: ['Depreciation', 'Unpresented cheque', 'Capital purchase', 'Wages'],
    ans: 1,
    exp: 'An unpresented cheque is a payment recorded in the cash book that has not yet cleared the bank — a typical bank-reconciliation timing difference.' },

  { id: 'pobc-088', topic: 'pobc', difficulty: 'medium',
    q: 'Which item appears on bank reconciliation?',
    opts: ['Sales invoices', 'Unpresented cheques', 'Wages ledger', 'Depreciation'],
    ans: 1,
    exp: 'Unpresented cheques are timing differences that appear on the bank reconciliation until they clear through the bank.' },

  { id: 'pobc-089', topic: 'pobc', difficulty: 'medium',
    q: 'Which of the following would NOT appear in a bank reconciliation statement?',
    opts: ['Unpresented cheques', 'Outstanding lodgements', 'Bank charges that have already been entered in the cash book', 'Timing differences'],
    ans: 2,
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
    opts: ['Overstated expenses', 'Posting error or omission', 'Depreciation error', 'VAT refund'],
    ans: 1,
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
    opts: ['The most profitable product', 'A department or location to which costs are charged', 'A capital expenditure budget', 'A measure of revenue'],
    ans: 1,
    exp: 'A cost centre is a department, location or activity to which costs are accumulated for the purposes of management control.' },

  { id: 'poc-003', topic: 'poc', difficulty: 'easy',
    q: 'A cost driver is:',
    opts: ['A fixed cost', 'A factor that causes costs to change', 'A type of revenue', 'A liability account'],
    ans: 1,
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
    opts: ['Total production cost', 'A unit of product or service for which costs are measured', 'The overhead absorption rate', 'Fixed cost per department'],
    ans: 1,
    exp: 'A cost unit is a quantitative measure of product or service for which costs are ascertained — for example one tonne of steel or one hotel night.' },

  { id: 'poc-007', topic: 'poc', difficulty: 'easy',
    q: 'A limiting factor in production is:',
    opts: ['Unlimited demand', 'Resource restricting output', 'Fixed cost reduction', 'Profit increase'],
    ans: 1,
    exp: 'A limiting (or "key") factor is a resource that constrains the maximum output a business can achieve — for example skilled labour or machine capacity.' },

  { id: 'poc-008', topic: 'poc', difficulty: 'easy',
    q: 'A limiting factor is:',
    opts: ['Unlimited resource', 'Scarce resource restricting output', 'Fixed cost only', 'Revenue constraint only'],
    ans: 1,
    exp: 'A limiting factor is a scarce resource that restricts output and therefore restricts profit. Decisions usually aim to maximise contribution per unit of the limiting factor.' },

  { id: 'poc-009', topic: 'poc', difficulty: 'easy',
    q: 'A profit centre is:',
    opts: ['A department with costs only', 'A department responsible for both revenue and costs', 'A department recording inventory only', 'The HR department'],
    ans: 1,
    exp: 'A profit centre is responsible for both generating revenue and controlling costs, so its profitability can be measured directly.' },

  { id: 'poc-010', topic: 'poc', difficulty: 'easy',
    q: 'A semi-variable cost is split into:',
    opts: ['Fixed and revenue elements', 'Fixed and variable elements', 'Direct and indirect elements', 'Capital and revenue elements'],
    ans: 1,
    exp: 'A semi-variable cost contains both a fixed element (incurred regardless of activity) and a variable element (which changes with activity).' },

  { id: 'poc-011', topic: 'poc', difficulty: 'easy',
    q: 'A semi-variable cost:',
    opts: ['Is fixed at all activity levels', 'Increases proportionately with output', 'Has both a fixed element and a variable element', 'Cannot be classified'],
    ans: 2,
    exp: 'A semi-variable cost has a fixed element (standing charge) and a variable element (usage charge) — for example a phone bill.' },

  { id: 'poc-012', topic: 'poc', difficulty: 'easy',
    q: 'A step cost changes when:',
    opts: ['Activity changes continuously', 'Activity reaches certain thresholds', 'Revenue decreases', 'Fixed costs disappear'],
    ans: 1,
    exp: 'Step costs remain fixed within ranges but jump at thresholds.' },

  { id: 'poc-013', topic: 'poc', difficulty: 'easy',
    q: 'Absorption costing involves:',
    opts: ['Excluding all fixed costs', 'Allocating and apportioning overheads to cost centres, then absorbing them into products', 'Charging only direct materials', 'Deducting variable costs from sales'],
    ans: 1,
    exp: 'Absorption costing: (1) allocate/apportion overheads to cost centres, (2) calculate an OAR for each, (3) absorb overheads into product cost.' },

  { id: 'poc-014', topic: 'poc', difficulty: 'easy',
    q: 'If activity doubles and total cost increases less than proportionally, cost is:',
    opts: ['Fixed', 'Variable', 'Semi-variable', 'Irrelevant'],
    ans: 2,
    exp: 'Total cost rises less than proportionally with output, indicating a semi-variable cost (a mix of fixed and variable elements).' },

  { id: 'poc-015', topic: 'poc', difficulty: 'easy',
    q: 'If production increases but fixed costs remain constant, fixed cost per unit will:',
    opts: ['Increase', 'Decrease', 'Stay constant', 'Become variable'],
    ans: 1,
    exp: 'Total fixed cost is unchanged, so spreading it over more units reduces the fixed cost charged to each unit.' },

  { id: 'poc-016', topic: 'poc', difficulty: 'easy',
    q: 'If selling price is reduced but variable cost remains constant, contribution will:',
    opts: ['Increase', 'Decrease', 'Stay unchanged', 'Become zero automatically'],
    ans: 1,
    exp: 'Contribution per unit = selling price − variable cost. A lower selling price (variable cost unchanged) reduces contribution per unit.' },

  { id: 'poc-017', topic: 'poc', difficulty: 'easy',
    q: 'If variable costs rise but selling price remains constant, contribution will:',
    opts: ['Increase', 'Decrease', 'Remain unchanged', 'Become fixed'],
    ans: 1,
    exp: 'Contribution per unit = selling price − variable cost. Higher variable costs (selling price unchanged) reduce contribution per unit.' },

  { id: 'poc-018', topic: 'poc', difficulty: 'easy',
    q: 'Labour costs that can be directly traced to a specific product are:',
    opts: ['Indirect labour', 'Direct labour', 'Overhead labour', 'Standard labour'],
    ans: 1,
    exp: 'Direct labour can be specifically identified with a particular product — for example machine operators on a specific job.' },

  { id: 'poc-019', topic: 'poc', difficulty: 'easy',
    q: 'Labour turnover refers to:',
    opts: ['Total wages paid', 'The rate at which employees leave and are replaced', 'Hours worked overtime', 'Worker productivity'],
    ans: 1,
    exp: 'Labour turnover measures how frequently employees leave and need replacing. High turnover increases recruitment and training costs.' },

  { id: 'poc-020', topic: 'poc', difficulty: 'easy',
    q: 'Marginal costing means:',
    opts: ['All fixed and variable costs are absorbed into product cost', 'Only variable costs are included in product cost; fixed costs are written off as period costs', 'Costs are averaged across all products', 'Overheads are allocated by machine hours'],
    ans: 1,
    exp: 'Marginal costing values inventory at variable production cost only. Fixed costs are treated as period costs and written off in full when incurred.' },

  { id: 'poc-021', topic: 'poc', difficulty: 'easy',
    q: 'Overheads are:',
    opts: ['Direct costs of production', 'Indirect costs not attributable to a specific product', 'The cost of raw materials', 'Production workers\' wages'],
    ans: 1,
    exp: 'Overheads are indirect costs — for example factory rent, supervisor wages and utilities — that cannot be traced to specific units.' },

  { id: 'poc-022', topic: 'poc', difficulty: 'easy',
    q: 'Prime cost is:',
    opts: ['Direct materials + direct labour + direct expenses', 'Total overheads + direct materials', 'Fixed costs + variable costs', 'Selling price − gross profit'],
    ans: 0,
    exp: 'Prime cost = direct materials + direct labour + direct expenses — the total direct cost before any overheads.' },

  { id: 'poc-023', topic: 'poc', difficulty: 'easy',
    q: 'Under-absorbed overhead results in:',
    opts: ['Higher reported profit', 'Lower reported profit', 'No change in profit', 'Higher revenue'],
    ans: 1,
    exp: 'Under-absorption means the absorbed overheads charged to products are less than actual overheads. The shortfall is debited to the income statement, reducing profit.' },

  { id: 'poc-024', topic: 'poc', difficulty: 'easy',
    q: 'Variable cost per unit:',
    opts: ['Increases as output rises', 'Remains constant per unit', 'Decreases as output rises', 'Always exceeds fixed cost'],
    ans: 1,
    exp: 'Variable costs vary in total with output, but the cost per unit remains constant — for example £5 of materials per unit regardless of volume.' },

  { id: 'poc-025', topic: 'poc', difficulty: 'easy',
    q: 'What happens to unit fixed cost as output increases?',
    opts: ['Increases', 'Decreases', 'Remains constant', 'Becomes variable'],
    ans: 1,
    exp: 'Fixed cost per unit falls as output rises.' },

  { id: 'poc-026', topic: 'poc', difficulty: 'easy',
    q: 'What is a cost centre?',
    opts: ['Profit generator', 'Revenue unit', 'Area of cost accumulation', 'Cash account'],
    ans: 2,
    exp: 'A cost centre is a location, department or activity to which costs are accumulated for management control.' },

  { id: 'poc-027', topic: 'poc', difficulty: 'easy',
    q: 'What is a profit centre?',
    opts: ['Cost only', 'Revenue and cost responsibility', 'Tax unit', 'Inventory unit'],
    ans: 1,
    exp: 'A profit centre is responsible for both revenue and costs, so its profitability can be measured directly.' },

  { id: 'poc-028', topic: 'poc', difficulty: 'easy',
    q: 'What is a sunk cost?',
    opts: ['Future cost', 'Irrecoverable past cost', 'Variable cost', 'Overhead'],
    ans: 1,
    exp: 'A sunk cost is a cost already incurred that cannot be recovered. It is irrelevant to future decisions.' },

  { id: 'poc-029', topic: 'poc', difficulty: 'easy',
    q: 'On what basis can overheads be absorbed?',
    opts: ['Units or hours', 'Tax rate', 'Sales value', 'Profit margin'],
    ans: 0,
    exp: 'Overheads are typically absorbed using an activity measure — most commonly labour hours, machine hours or units produced.' },

  { id: 'poc-030', topic: 'poc', difficulty: 'easy',
    q: 'What is absorption costing?',
    opts: ['Ignoring overheads', 'Including overheads in product cost', 'Only materials', 'Only labour'],
    ans: 1,
    exp: 'Absorption costing values products at the full cost of production — direct materials, direct labour, direct expenses and a share of production overheads.' },

  { id: 'poc-031', topic: 'poc', difficulty: 'easy',
    q: 'What is cost behaviour analysis used for?',
    opts: ['Tax filing', 'Planning and decision making', 'Payroll', 'Banking'],
    ans: 1,
    exp: 'Understanding cost behaviour supports budgeting, pricing and other management decisions.' },

  { id: 'poc-032', topic: 'poc', difficulty: 'easy',
    q: 'What is cost behaviour?',
    opts: ['Profit levels', 'How costs change with activity', 'Sales levels', 'Tax rates'],
    ans: 1,
    exp: 'Cost behaviour describes how a cost changes (or does not change) with the level of activity — fixed, variable or semi-variable.' },

  { id: 'poc-033', topic: 'poc', difficulty: 'easy',
    q: 'What is a cost unit?',
    opts: ['Department', 'Unit measured for cost', 'Profit', 'Tax'],
    ans: 1,
    exp: 'A cost unit is a quantitative unit of a product or service for which costs are ascertained — for example one tonne of steel.' },

  { id: 'poc-034', topic: 'poc', difficulty: 'easy',
    q: 'What is a direct cost?',
    opts: ['Cannot trace', 'Traceable to product', 'Overhead', 'Tax'],
    ans: 1,
    exp: 'A direct cost is a cost that can be traced directly to a specific cost unit — for example raw materials in a finished product.' },

  { id: 'poc-035', topic: 'poc', difficulty: 'easy',
    q: 'As output increases, what happens to fixed cost per unit?',
    opts: ['It increases', 'It decreases', 'It stays constant', 'It becomes variable'],
    ans: 1,
    exp: 'Total fixed cost is unchanged but is spread over more units, so fixed cost per unit falls as output rises.' },

  { id: 'poc-036', topic: 'poc', difficulty: 'easy',
    q: 'What is included in prime cost?',
    opts: ['Overheads only', 'Direct materials and labour', 'Fixed costs only', 'Selling costs'],
    ans: 1,
    exp: 'Prime cost includes direct materials, direct labour and direct expenses. Overheads are excluded.' },

  { id: 'poc-037', topic: 'poc', difficulty: 'easy',
    q: 'How is labour cost classified by traceability?',
    opts: ['Only as fixed', 'As direct or indirect', 'Only as sales-related', 'As capital'],
    ans: 1,
    exp: 'Labour cost is direct when traceable to a specific cost unit (e.g. assembly workers) and indirect when it cannot be (e.g. supervisors, cleaners).' },

  { id: 'poc-038', topic: 'poc', difficulty: 'easy',
    q: 'What is marginal cost?',
    opts: ['Total cost', 'Cost of producing one additional unit', 'Fixed cost per year', 'Selling cost'],
    ans: 1,
    exp: 'Marginal cost is the additional cost of producing one extra unit — essentially the variable cost per unit at normal activity levels.' },

  { id: 'poc-039', topic: 'poc', difficulty: 'easy',
    q: 'What is overhead absorption?',
    opts: ['Ignoring overheads', 'Charging overheads to products', 'Only materials', 'Only labour'],
    ans: 1,
    exp: 'Overhead absorption charges indirect costs to cost units using a predetermined absorption rate (OAR).' },

  { id: 'poc-040', topic: 'poc', difficulty: 'easy',
    q: 'What is an overhead?',
    opts: ['Direct material', 'Indirect cost', 'Sales', 'Cash'],
    ans: 1,
    exp: 'An overhead is an indirect cost of production that cannot be traced directly to a specific cost unit — for example factory rent or utilities.' },

  { id: 'poc-041', topic: 'poc', difficulty: 'easy',
    q: 'What is prime cost?',
    opts: ['Total cost', 'Direct costs only', 'Fixed costs', 'Overheads'],
    ans: 1,
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
    opts: ['Fixed production overheads', 'Variable production costs only', 'Selling costs', 'Administrative costs'],
    ans: 1,
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
    opts: ['HR staff', 'Machine operator', 'Cleaner', 'Manager'],
    ans: 1,
    exp: 'A machine operator is directly involved in production and so is classified as direct labour.' },

  { id: 'poc-052', topic: 'poc', difficulty: 'easy',
    q: 'Which is included in prime cost?',
    opts: ['Overheads', 'Direct labour', 'Rent', 'Insurance'],
    ans: 1,
    exp: 'Direct labour is part of prime cost. Overheads, rent and insurance are not.' },

  { id: 'poc-053', topic: 'poc', difficulty: 'easy',
    q: 'Which is indirect labour?',
    opts: ['Assembly worker', 'Cleaner', 'Machine operator', 'Assembler'],
    ans: 1,
    exp: 'A cleaner supports production indirectly and is therefore classified as indirect labour.' },

  { id: 'poc-054', topic: 'poc', difficulty: 'easy',
    q: 'Which is semi-variable?',
    opts: ['Rent', 'Electricity bill', 'Raw materials', 'Sales'],
    ans: 1,
    exp: 'An electricity bill typically has a fixed standing charge plus a usage charge — a semi-variable cost.' },

  { id: 'poc-055', topic: 'poc', difficulty: 'easy',
    q: 'Which of the following is a direct cost?',
    opts: ['Factory rent', 'Supervisor\'s salary', 'Raw materials used in production', 'Building electricity'],
    ans: 2,
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
    opts: ['Excludes overheads', 'Includes only variable costs', 'Allocates overheads to products', 'Ignores inventory'],
    ans: 2,
    exp: 'Absorption costing allocates and apportions overheads to cost centres and then absorbs them into product cost using an absorption rate (the OAR).' },

  { id: 'poc-059', topic: 'poc', difficulty: 'easy',
    q: 'Which statement about variable costs is correct?',
    opts: ['They are constant in total', 'They are constant per unit', 'They never change', 'They are fixed per unit'],
    ans: 1,
    exp: 'Variable cost is constant per unit but varies in total as output changes — for example £5 of materials in every unit produced.' },

  { id: 'poc-060', topic: 'poc', difficulty: 'medium',
    q: 'A break-even chart shows:',
    opts: ['Bank balance over time', 'Cost, revenue and profit relationships', 'VAT liability', 'Cash flow only'],
    ans: 1,
    exp: 'A break-even chart plots total costs and total revenues against output, with the break-even point at their intersection.' },

  { id: 'poc-061', topic: 'poc', difficulty: 'medium',
    q: 'A higher contribution margin ratio indicates:',
    opts: ['Lower profitability', 'Greater proportion of fixed costs', 'More revenue available to cover fixed costs', 'Higher overheads'],
    ans: 2,
    exp: 'A higher contribution margin ratio means a greater proportion of every sales £ remains after variable costs to cover fixed costs and contribute to profit.' },

  { id: 'poc-062', topic: 'poc', difficulty: 'medium',
    q: 'Absorbed overhead is compared to actual overhead to determine:',
    opts: ['Profit margin', 'Under or over absorption', 'Sales revenue', 'Inventory levels'],
    ans: 1,
    exp: 'If absorbed overheads exceed actual overheads, there is over-absorption; if actual overheads exceed absorbed, there is under-absorption.' },

  { id: 'poc-063', topic: 'poc', difficulty: 'medium',
    q: 'AVCO values inventory at:',
    opts: ['The earliest purchase price', 'The most recent purchase price', 'A weighted average of all purchase prices', 'The lowest price paid'],
    ans: 2,
    exp: 'AVCO recalculates a weighted average cost after each purchase. Inventory issues are valued at this running average.' },

  { id: 'poc-064', topic: 'poc', difficulty: 'medium',
    q: 'Break-even point occurs when:',
    opts: ['Total revenue equals total costs', 'Profit is maximised', 'Variable costs exceed sales', 'Fixed costs are zero'],
    ans: 0,
    exp: 'Break-even is where no profit or loss is made.' },

  { id: 'poc-065', topic: 'poc', difficulty: 'medium',
    q: 'Break-even point occurs where:',
    opts: ['Total revenue equals total costs', 'Fixed costs are zero', 'Variable costs exceed revenue', 'Profit is maximised'],
    ans: 0,
    exp: 'At break-even, revenue equals total cost (no profit or loss).' },

  { id: 'poc-066', topic: 'poc', difficulty: 'medium',
    q: 'Contribution margin ratio is used to:',
    opts: ['Calculate VAT', 'Measure profit per unit of revenue', 'Determine bank balance', 'Set depreciation'],
    ans: 1,
    exp: 'The contribution margin ratio (contribution ÷ sales) shows the proportion of each £ of sales available to cover fixed costs and provide profit.' },

  { id: 'poc-067', topic: 'poc', difficulty: 'medium',
    q: 'FIFO compared to AVCO typically results in:',
    opts: ['Higher closing inventory in rising prices', 'Lower closing inventory always', 'No difference ever', 'Higher liabilities'],
    ans: 0,
    exp: 'Under FIFO, closing inventory consists of the most recent purchases. In a period of rising prices these are the highest-priced, so closing inventory is valued higher than under AVCO.' },

  { id: 'poc-068', topic: 'poc', difficulty: 'medium',
    q: 'FIFO inventory valuation assumes:',
    opts: ['Newest items sold first', 'Oldest items sold first', 'Average cost applied', 'Random selection'],
    ans: 1,
    exp: 'FIFO (First In, First Out) assumes the earliest items purchased are issued or sold first, leaving the most recent purchases in closing inventory.' },

  { id: 'poc-069', topic: 'poc', difficulty: 'medium',
    q: 'Fixed costs are best described as:',
    opts: ['Costs that vary with output', 'Costs that are constant in total regardless of output', 'Costs that are constant per unit', 'Costs directly traceable to a product'],
    ans: 1,
    exp: 'Fixed costs (such as rent and insurance) remain constant in total regardless of output. Fixed cost per unit falls as output increases.' },

  { id: 'poc-070', topic: 'poc', difficulty: 'medium',
    q: 'If break-even point increases, it indicates:',
    opts: ['Lower fixed costs', 'Higher fixed costs or lower contribution', 'Higher revenue only', 'Lower variable costs only'],
    ans: 1,
    exp: 'Break-even rises if fixed costs increase (more contribution needed to cover them) or if contribution per unit falls (each unit covers less of the fixed cost).' },

  { id: 'poc-071', topic: 'poc', difficulty: 'medium',
    q: 'If contribution per unit increases, break-even point will:',
    opts: ['Increase', 'Decrease', 'Stay the same', 'Become infinite'],
    ans: 1,
    exp: 'Break-even = fixed costs ÷ contribution per unit. A higher contribution per unit means fewer units are needed to cover the fixed costs.' },

  { id: 'poc-072', topic: 'poc', difficulty: 'medium',
    q: 'If fixed costs increase, break-even point will:',
    opts: ['Decrease', 'Increase', 'Stay the same', 'Become zero'],
    ans: 1,
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
    opts: ['Too much overhead has been charged to products', 'Insufficient overhead has been charged; profit is overstated', 'Profit is higher than expected', 'Fixed costs have decreased'],
    ans: 1,
    exp: 'Under-absorption: actual overheads exceed absorbed overheads. The shortfall is debited to the income statement (i.e. profit is reduced).' },

  { id: 'poc-076', topic: 'poc', difficulty: 'medium',
    q: 'What happens in over-absorption?',
    opts: ['Costs too low', 'Absorbed > actual', 'No overheads', 'No profit'],
    ans: 1,
    exp: 'Over-absorption occurs when absorbed overheads (based on the OAR) exceed actual overheads incurred. The surplus is credited to the income statement.' },

  { id: 'poc-077', topic: 'poc', difficulty: 'medium',
    q: 'When is the AVCO average inventory cost recalculated?',
    opts: ['After each sale only', 'After each purchase', 'Only at year end', 'When cash is paid'],
    ans: 1,
    exp: 'AVCO recalculates a weighted average cost after each new purchase. Subsequent issues are valued at this updated average.' },

  { id: 'poc-078', topic: 'poc', difficulty: 'medium',
    q: 'What is contribution per unit used for?',
    opts: ['Pricing decisions', 'Profit calculation under marginal costing', 'Tax reporting', 'Bank reconciliation'],
    ans: 1,
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
    opts: ['Rent', 'Raw materials', 'Insurance', 'Depreciation'],
    ans: 1,
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
    opts: ['Absorption costing', 'Marginal costing', 'FIFO', 'AVCO'],
    ans: 0,
    exp: 'Absorption costing spreads overheads across products using a chosen activity base — typically labour hours, machine hours or units.' },

  { id: 'poc-088', topic: 'poc', difficulty: 'medium',
    q: 'Which method values closing inventory at most recent purchases?',
    opts: ['FIFO', 'AVCO', 'LIFO', 'Absorption costing'],
    ans: 0,
    exp: 'FIFO assumes the earliest items are issued first, so the most recent (and usually highest-priced) purchases remain in closing inventory.' },

  { id: 'poc-089', topic: 'poc', difficulty: 'medium',
    q: 'Which of the following are recognised methods of inventory valuation?',
    opts: ['FIFO, LIFO and AVCO', 'PAYE, NIC and VAT', 'Fixed, variable and semi-variable', 'Direct, indirect and overhead'],
    ans: 0,
    exp: 'FIFO, LIFO and AVCO are the three classic inventory valuation methods. Note: LIFO is not permitted under IFRS or UK GAAP.' },

  { id: 'poc-090', topic: 'poc', difficulty: 'medium',
    q: 'Which of the following is relevant in decision making?',
    opts: ['Sunk costs', 'Future incremental costs', 'Historical costs only', 'Depreciation only'],
    ans: 1,
    exp: 'Only future relevant costs affect decisions.' },

  { id: 'poc-091', topic: 'poc', difficulty: 'hard',
    q: 'A cost increases from £5,000 to £7,000 when output rises from 1,000 to 2,000 units. What type of cost is this?',
    opts: ['Fixed cost', 'Variable cost', 'Semi-variable cost', 'Sunk cost'],
    ans: 2,
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
    opts: ['Thought given before signing', 'Something of value given by each party', 'The length of the contract', 'A penalty clause'],
    ans: 1,
    exp: 'Consideration is something of value exchanged by each party — a payment, service or promise to act or refrain from acting.' },

  { id: 'besy-002', topic: 'besy', difficulty: 'easy',
    q: '"Limited liability" for shareholders means:',
    opts: ['They must personally pay all company debts', 'Their financial loss is limited to the amount they invested or agreed to pay for shares', 'They have no liability at all', 'They must guarantee company bank loans'],
    ans: 1,
    exp: 'Limited liability protects shareholders\' personal assets — their loss is capped at the amount paid (or agreed to be paid) for their shares.' },

  { id: 'besy-003', topic: 'besy', difficulty: 'easy',
    q: 'A business operating in perfect competition is characterised by:',
    opts: ['Many buyers and sellers', 'Single seller', 'High barriers to entry', 'Price control by firms'],
    ans: 0,
    exp: 'Perfect competition is a theoretical market structure with many buyers and sellers, homogeneous products and free entry — firms are price takers.' },

  { id: 'besy-004', topic: 'besy', difficulty: 'easy',
    q: 'A characteristic of monopolistic competition is:',
    opts: ['Single seller', 'Many sellers with differentiated products', 'No competition', 'Government ownership'],
    ans: 1,
    exp: 'Monopolistic competition has many firms selling differentiated (but similar) products — for example restaurants or hairdressers.' },

  { id: 'besy-005', topic: 'besy', difficulty: 'easy',
    q: 'A conflict between stakeholders occurs when:',
    opts: ['All stakeholders agree', 'Different stakeholder objectives clash', 'Profit is zero', 'Costs are fixed'],
    ans: 1,
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
    opts: ['Interest rates', 'Government taxation', 'Exchange rates', 'Wage levels'],
    ans: 1,
    exp: 'Fiscal policy is the use of government spending and taxation to influence aggregate demand and economic activity.' },

  { id: 'besy-010', topic: 'besy', difficulty: 'easy',
    q: 'A franchise is:',
    opts: ['A government-owned business', 'An arrangement where one party licenses its brand and business model to another to operate', 'A type of PLC', 'A partnership between sole traders'],
    ans: 1,
    exp: 'A franchisee operates under the franchisor\'s brand and business model, typically paying initial fees and ongoing royalties.' },

  { id: 'besy-011', topic: 'besy', difficulty: 'easy',
    q: 'A key economic factor for businesses trading internationally is:',
    opts: ['Logo colour', 'Exchange rate fluctuations', 'CEO personal preferences', 'Office furniture'],
    ans: 1,
    exp: 'Exchange rate movements affect import costs and export competitiveness — a critical factor for any business trading across borders.' },

  { id: 'besy-012', topic: 'besy', difficulty: 'easy',
    q: 'A key reason governments regulate businesses is to:',
    opts: ['Increase monopoly power', 'Protect consumers and competition', 'Reduce demand', 'Increase inflation'],
    ans: 1,
    exp: 'Regulation is used to protect consumers, ensure fair competition and prevent the abuse of market power.' },

  { id: 'besy-013', topic: 'besy', difficulty: 'easy',
    q: 'A limited company\'s separate legal personality means it:',
    opts: ['Cannot enter contracts', 'Has shareholders personally liable for all debts', 'Can own property and sue or be sued in its own name', 'Is government owned'],
    ans: 2,
    exp: 'A limited company has separate legal personality — it can own assets, enter contracts and sue or be sued in its own name, independently of its shareholders.' },

  { id: 'besy-014', topic: 'besy', difficulty: 'easy',
    q: 'A mission statement describes:',
    opts: ['Detailed financial targets', 'The organisation\'s purpose, values and aims', 'Tax obligations', 'The organisational chart'],
    ans: 1,
    exp: 'A mission statement summarises the organisation\'s purpose, core values and strategic aims, providing direction for decision-making.' },

  { id: 'besy-015', topic: 'besy', difficulty: 'easy',
    q: 'A monopoly firm typically:',
    opts: ['Is price taker', 'Sets its own prices', 'Has no control over output', 'Has infinite competitors'],
    ans: 1,
    exp: 'A monopolist is the sole or dominant supplier in its market, with the power to set prices (subject to consumer demand and any regulation).' },

  { id: 'besy-016', topic: 'besy', difficulty: 'easy',
    q: 'A not-for-profit organisation:',
    opts: ['Makes losses every year', 'Exists primarily to fulfil a social or charitable purpose', 'Never pays tax', 'Reinvests all profits into marketing'],
    ans: 1,
    exp: 'Not-for-profit organisations (charities, social enterprises) exist to serve a social or community purpose rather than to generate profit for owners.' },

  { id: 'besy-017', topic: 'besy', difficulty: 'easy',
    q: 'A PLC differs from a Ltd company because it:',
    opts: ['Has unlimited liability', 'Can offer shares to the public, including on a stock exchange', 'Cannot have more than 50 shareholders', 'Is government owned'],
    ans: 1,
    exp: 'A PLC can sell shares to the general public to raise larger amounts of capital and may be listed on a stock exchange. A Ltd company cannot do this.' },

  { id: 'besy-018', topic: 'besy', difficulty: 'easy',
    q: 'A price war usually leads to:',
    opts: ['Higher industry profits', 'Lower prices and reduced profit margins', 'Monopoly formation immediately', 'No competition change'],
    ans: 1,
    exp: 'Aggressive price-cutting by competitors lowers prices across the market and reduces profit margins.' },

  { id: 'besy-019', topic: 'besy', difficulty: 'easy',
    q: 'A primary economic objective of firms is often to:',
    opts: ['Maximise tax', 'Maximise profit', 'Reduce population', 'Increase regulation'],
    ans: 1,
    exp: 'Most commercial firms are profit-driven, although they also pursue growth, market share and other goals.' },

  { id: 'besy-020', topic: 'besy', difficulty: 'easy',
    q: 'A primary objective of a not-for-profit organisation is:',
    opts: ['Maximising shareholder dividends', 'Minimising tax', 'Providing social or community benefit', 'Increasing market share'],
    ans: 2,
    exp: 'Not-for-profit organisations exist to deliver a social, charitable or community benefit rather than to maximise returns to owners.' },

  { id: 'besy-021', topic: 'besy', difficulty: 'easy',
    q: 'A public limited company raises capital by:',
    opts: ['Private loans only', 'Selling shares to the public', 'Reducing equity', 'Increasing wages'],
    ans: 1,
    exp: 'A public limited company (PLC) raises capital primarily by issuing shares to the public, often via a stock exchange listing.' },

  { id: 'besy-022', topic: 'besy', difficulty: 'easy',
    q: 'A recession is typically characterised by:',
    opts: ['Rising GDP', 'Negative economic growth', 'Stable prices', 'Low unemployment only'],
    ans: 1,
    exp: 'A recession is conventionally defined as two consecutive quarters of negative GDP growth.' },

  { id: 'besy-023', topic: 'besy', difficulty: 'easy',
    q: 'A sole trader expanding may incorporate to:',
    opts: ['Increase liability', 'Gain limited liability', 'Reduce revenue', 'Avoid VAT'],
    ans: 1,
    exp: 'Incorporating as a limited company gives owners limited liability — protecting their personal assets from business debts.' },

  { id: 'besy-024', topic: 'besy', difficulty: 'easy',
    q: 'A stakeholder with high power and high interest should be:',
    opts: ['Ignored', 'Kept satisfied', 'Managed closely', 'Monitored occasionally'],
    ans: 2,
    exp: 'Mendelow’s power–interest matrix recommends "manage closely" for stakeholders with both high power and high interest.' },

  { id: 'besy-025', topic: 'besy', difficulty: 'easy',
    q: 'A substitute good is one that:',
    opts: ['Is always cheaper', 'Can replace another good', 'Is used with another good', 'Has no market demand'],
    ans: 1,
    exp: 'A substitute good satisfies the same need or want as another and can replace it (e.g. tea for coffee).' },

  { id: 'besy-026', topic: 'besy', difficulty: 'easy',
    q: 'An ethical issue for an accountant would be:',
    opts: ['Choosing office stationery', 'Being asked to falsify financial records', 'Deciding which software to use', 'Booking meeting rooms'],
    ans: 1,
    exp: 'Accountants must act with integrity. The AAT Code of Professional Ethics requires honesty, objectivity and professional behaviour at all times.' },

  { id: 'besy-027', topic: 'besy', difficulty: 'easy',
    q: 'An example of internal stakeholder is:',
    opts: ['Customer', 'Supplier', 'Employee', 'Government'],
    ans: 2,
    exp: 'Employees work within the organisation and are therefore internal stakeholders. Customers, suppliers and government are external.' },

  { id: 'besy-028', topic: 'besy', difficulty: 'easy',
    q: 'An implied term in a contract is one which:',
    opts: ['Is written clearly in the contract', 'Is not explicitly stated but is read into the contract by law or custom', 'Is always negotiated between the parties', 'Has no legal effect'],
    ans: 1,
    exp: 'Implied terms are included automatically by statute (e.g. the Consumer Rights Act) or custom and are legally binding even though not written into the contract.' },

  { id: 'besy-029', topic: 'besy', difficulty: 'easy',
    q: 'An increase in interest rates usually leads to:',
    opts: ['Higher borrowing and spending', 'Lower borrowing and spending', 'Higher inflation immediately', 'No economic impact'],
    ans: 1,
    exp: 'Higher borrowing costs reduce consumer spending and business investment, dampening demand.' },

  { id: 'besy-030', topic: 'besy', difficulty: 'easy',
    q: 'An oligopoly is characterised by:',
    opts: ['Many sellers', 'Few dominant firms', 'Single seller', 'No competition'],
    ans: 1,
    exp: 'An oligopoly is dominated by a small number of large firms (e.g. UK supermarkets, mobile networks).' },

  { id: 'besy-031', topic: 'besy', difficulty: 'easy',
    q: 'Breach of contract means:',
    opts: ['The contract auto-renews', 'The innocent party may claim damages or terminate the contract', 'Both parties must renegotiate', 'No legal remedy is available'],
    ans: 1,
    exp: 'A breach entitles the innocent party to damages (compensation) and, where the breach is sufficiently serious, to treat the contract as terminated.' },

  { id: 'besy-032', topic: 'besy', difficulty: 'easy',
    q: 'Cross price elasticity of demand measures:',
    opts: ['Change in demand due to income', 'Response of demand to price of another good', 'Change in supply', 'Tax effect'],
    ans: 1,
    exp: 'Cross price elasticity of demand (XED) measures how the demand for one good responds to a change in the price of another (substitute or complement).' },

  { id: 'besy-033', topic: 'besy', difficulty: 'easy',
    q: 'GDP measures:',
    opts: ['Population size', 'Total value of goods and services produced', 'Government debt', 'Inflation only'],
    ans: 1,
    exp: 'Gross Domestic Product (GDP) measures the total value of goods and services produced in an economy over a period.' },

  { id: 'besy-034', topic: 'besy', difficulty: 'easy',
    q: 'If demand is price inelastic, a price increase will:',
    opts: ['Increase total revenue', 'Decrease total revenue', 'Have no effect', 'Eliminate demand'],
    ans: 0,
    exp: 'When demand is price inelastic, demand falls proportionately less than price rises, so total revenue (price × quantity) increases.' },

  { id: 'besy-035', topic: 'besy', difficulty: 'easy',
    q: 'In a general partnership, partners\' liability is:',
    opts: ['Limited to their initial investment', 'Unlimited — partners are personally liable for all debts', 'Limited by a charge over property', 'The same as in a limited company'],
    ans: 1,
    exp: 'General partners have unlimited liability and are jointly and severally liable for all partnership debts.' },

  { id: 'besy-036', topic: 'besy', difficulty: 'easy',
    q: 'Income elasticity of demand measures:',
    opts: ['Response of demand to income changes', 'Response of supply to price', 'Change in costs', 'Tax impact'],
    ans: 0,
    exp: 'Income elasticity of demand (IED) measures how the quantity demanded responds to a change in consumer income.' },

  { id: 'besy-037', topic: 'besy', difficulty: 'easy',
    q: 'Inflation is:',
    opts: ['A fall in interest rates', 'A general sustained rise in the price level', 'A rise in unemployment', 'A fall in import values'],
    ans: 1,
    exp: 'Inflation is a sustained rise in the general price level of goods and services over time.' },

  { id: 'besy-038', topic: 'besy', difficulty: 'easy',
    q: 'Inflation reduces:',
    opts: ['Money purchasing power', 'Interest rates always', 'Employment always', 'Exports always'],
    ans: 0,
    exp: 'Inflation reduces the purchasing power of money — each pound buys fewer goods than before.' },

  { id: 'besy-039', topic: 'besy', difficulty: 'easy',
    q: 'Market segmentation involves:',
    opts: ['Combining all customers', 'Dividing a market into distinct groups', 'Reducing prices only', 'Increasing production only'],
    ans: 1,
    exp: 'Market segmentation divides a market into distinct groups (by demographics, behaviour, geography, etc.) so marketing can be targeted effectively.' },

  { id: 'besy-040', topic: 'besy', difficulty: 'easy',
    q: 'Price elasticity of demand measures:',
    opts: ['Change in supply due to price', 'Responsiveness of demand to price changes', 'Total revenue only', 'Cost changes over time'],
    ans: 1,
    exp: 'Price elasticity of demand (PED) measures the percentage change in quantity demanded relative to the percentage change in price.' },

  { id: 'besy-041', topic: 'besy', difficulty: 'easy',
    q: 'Rising interest rates tend to:',
    opts: ['Reduce borrowing costs', 'Reduce consumer spending due to higher mortgage costs', 'Immediately boost exports', 'Decrease costs for businesses with loans'],
    ans: 1,
    exp: 'Higher interest rates reduce consumers\' disposable income (via higher mortgage payments) and increase borrowing costs for businesses, both of which tend to reduce spending.' },

  { id: 'besy-042', topic: 'besy', difficulty: 'easy',
    q: 'Rising interest rates typically cause:',
    opts: ['Higher borrowing and higher spending', 'Lower borrowing and reduced demand', 'No change in demand', 'Higher exports only'],
    ans: 1,
    exp: 'Higher interest rates increase the cost of borrowing and the returns on saving, reducing borrowing-financed spending and demand.' },

  { id: 'besy-043', topic: 'besy', difficulty: 'easy',
    q: 'The accounting function\'s role regarding sustainability includes:',
    opts: ['Ignoring environmental costs', 'Recording environmental costs and helping measure the carbon footprint', 'Focusing only on profit maximisation', 'Refusing to work with eco-conscious firms'],
    ans: 1,
    exp: 'Modern finance functions measure and report sustainability and environmental costs, helping organisations manage and reduce their environmental impact.' },

  { id: 'besy-044', topic: 'besy', difficulty: 'easy',
    q: 'The Consumer Rights Act 2015 requires goods to be:',
    opts: ['The cheapest available', 'Of satisfactory quality, fit for purpose and as described', 'Sold by registered retailers only', 'Guaranteed for 5 years'],
    ans: 1,
    exp: 'Goods must be of satisfactory quality, fit for purpose and match any description given. Consumers can seek repair, replacement or refund where these standards are not met.' },

  { id: 'besy-045', topic: 'besy', difficulty: 'easy',
    q: 'The Equality Act 2010 protects workers from discrimination based on:',
    opts: ['Performance ratings', 'Protected characteristics such as age, sex, race and disability', 'Level of qualifications', 'Employer size'],
    ans: 1,
    exp: 'The Equality Act protects nine characteristics: age, disability, gender reassignment, marriage and civil partnership, pregnancy and maternity, race, religion or belief, sex, and sexual orientation.' },

  { id: 'besy-046', topic: 'besy', difficulty: 'easy',
    q: 'The essential elements of a legally binding contract include:',
    opts: ['Verbal agreement only', 'Offer, acceptance and consideration', 'Written documentation only', 'A solicitor\'s signature'],
    ans: 1,
    exp: 'A contract requires an offer, an acceptance, consideration (something of value exchanged) and an intention to create legal relations.' },

  { id: 'besy-047', topic: 'besy', difficulty: 'easy',
    q: 'The finance function primarily:',
    opts: ['Manages social media', 'Records and reports financial information to support decision-making', 'Develops new products', 'Handles staff recruitment'],
    ans: 1,
    exp: 'The finance function maintains records, prepares financial reports, manages cash flow, supports budgeting and provides information for decisions.' },

  { id: 'besy-048', topic: 'besy', difficulty: 'easy',
    q: 'The UK GDPR / Data Protection Act 2018:',
    opts: ['Governs business taxation', 'Regulates how organisations handle personal data', 'Sets minimum wage rates', 'Requires annual audits'],
    ans: 1,
    exp: 'The UK GDPR / DPA 2018 gives individuals rights over their personal data and requires organisations to handle it lawfully, fairly and securely.' },

  { id: 'besy-049', topic: 'besy', difficulty: 'easy',
    q: 'What happens when interest rates rise?',
    opts: ['Borrowing becomes cheaper', 'Saving decreases', 'Borrowing becomes more expensive', 'Exports stop'],
    ans: 2,
    exp: 'When interest rates rise, the cost of borrowing for households (e.g. mortgages) and businesses (e.g. loans) increases.' },

  { id: 'besy-050', topic: 'besy', difficulty: 'easy',
    q: 'What is a barrier to entry?',
    opts: ['High wages', 'Obstacles preventing new competitors entering a market', 'High profits', 'Low inflation'],
    ans: 1,
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
    opts: ['Wage', 'Payment to use brand', 'Tax', 'Loan'],
    ans: 1,
    exp: 'A franchise fee is paid by the franchisee to the franchisor for the right to use the brand and business model.' },

  { id: 'besy-054', topic: 'besy', difficulty: 'easy',
    q: 'What is a mission statement?',
    opts: ['Accounts report', 'Organisational purpose', 'Tax form', 'Budget'],
    ans: 1,
    exp: 'A mission statement sets out the organisation\'s purpose, values and aims, providing strategic direction.' },

  { id: 'besy-055', topic: 'besy', difficulty: 'easy',
    q: 'What is a monopoly?',
    opts: ['Many sellers', 'One dominant seller', 'No sellers', 'Government-only market'],
    ans: 1,
    exp: 'A monopoly is a market with a single dominant supplier, giving that firm significant power to set prices and restrict output.' },

  { id: 'besy-056', topic: 'besy', difficulty: 'easy',
    q: 'What is a key advantage of a public limited company (PLC)?',
    opts: ['Unlimited liability for shareholders', 'Ability to raise large amounts of capital by offering shares to the public', 'Freedom from regulation', 'No requirement to publish accounts'],
    ans: 1,
    exp: 'A PLC can offer shares to the public, including via a stock exchange, allowing it to raise substantial capital from a wide investor base.' },

  { id: 'besy-057', topic: 'besy', difficulty: 'easy',
    q: 'What is a disadvantage of operating as a sole trader?',
    opts: ['Limited liability for business debts', 'Unlimited personal liability for business debts', 'Loss of control over the business', 'Higher start-up capital required'],
    ans: 1,
    exp: 'A sole trader has unlimited personal liability — personal assets can be used to settle business debts.' },

  { id: 'besy-058', topic: 'besy', difficulty: 'easy',
    q: 'What is a stakeholder conflict?',
    opts: ['Shared goals', 'Different stakeholder objectives', 'Profit increase', 'Market growth'],
    ans: 1,
    exp: 'Stakeholder conflict occurs when different groups have competing objectives — for example shareholders favouring profit and employees favouring higher wages.' },

  { id: 'besy-059', topic: 'besy', difficulty: 'easy',
    q: 'What does UK consumer rights legislation primarily protect?',
    opts: ['Employment terms', 'The quality and accuracy of goods and services sold to consumers', 'Tax payments', 'Banking arrangements'],
    ans: 1,
    exp: 'The Consumer Rights Act 2015 requires goods to be of satisfactory quality, fit for purpose and as described, with statutory remedies if they are not.' },

  { id: 'besy-060', topic: 'besy', difficulty: 'easy',
    q: 'What is ethical behaviour?',
    opts: ['Max profit', 'Honest conduct', 'Avoid tax', 'Ignore rules'],
    ans: 1,
    exp: 'Ethical behaviour means acting honestly and with integrity, complying with the spirit as well as the letter of the law.' },

  { id: 'besy-061', topic: 'besy', difficulty: 'easy',
    q: 'What is exchange rate risk?',
    opts: ['Risk of inflation', 'Risk from currency value fluctuations', 'Risk of bankruptcy', 'Risk of tax increase'],
    ans: 1,
    exp: 'Exchange rate risk is the risk that movements in currency rates will adversely affect the value of foreign-currency receipts, payments or investments.' },

  { id: 'besy-062', topic: 'besy', difficulty: 'easy',
    q: 'Which of the following is an external stakeholder?',
    opts: ['A line manager', 'A supplier', 'An employee', 'A director'],
    ans: 1,
    exp: 'Suppliers are outside the organisation and therefore external stakeholders. Managers, employees and directors are internal.' },

  { id: 'besy-063', topic: 'besy', difficulty: 'easy',
    q: 'What is fiscal policy?',
    opts: ['Bank lending rates', 'Government taxation and spending', 'Exchange rate control', 'Wage negotiation'],
    ans: 1,
    exp: 'Fiscal policy is the use of government taxation and spending to influence the level of activity in the economy.' },

  { id: 'besy-064', topic: 'besy', difficulty: 'easy',
    q: 'What is GDP?',
    opts: ['Government debt plan', 'Total value of goods and services produced', 'Tax revenue', 'Interest rate'],
    ans: 1,
    exp: 'Gross Domestic Product (GDP) is the total value of goods and services produced in an economy in a given period.' },

  { id: 'besy-065', topic: 'besy', difficulty: 'easy',
    q: 'What is the UK GDPR / Data Protection Act 2018 primarily about?',
    opts: ['Taxation of digital services', 'Protection of personal data', 'Setting wage rates', 'Preparing statutory accounts'],
    ans: 1,
    exp: 'The UK GDPR / DPA 2018 governs how organisations collect, use, store and share personal data.' },

  { id: 'besy-066', topic: 'besy', difficulty: 'easy',
    q: 'What is the main purpose of the UK GDPR?',
    opts: ['To collect tax', 'To protect personal data and give individuals rights over its use', 'To set trade rules', 'To prescribe accounting standards'],
    ans: 1,
    exp: 'The UK GDPR protects personal data and gives individuals rights to access, correct and restrict the use of their data.' },

  { id: 'besy-067', topic: 'besy', difficulty: 'easy',
    q: 'What is inflation?',
    opts: ['Price decrease', 'Price stability', 'General rise in prices', 'Wage reduction'],
    ans: 2,
    exp: 'Inflation is a general and sustained rise in the price level of goods and services across the economy.' },

  { id: 'besy-068', topic: 'besy', difficulty: 'easy',
    q: 'What is a typical effect of a rise in interest rates on consumer spending?',
    opts: ['Spending increases', 'Spending falls because borrowing becomes more expensive', 'Spending is unchanged', 'Exports immediately rise'],
    ans: 1,
    exp: 'Higher interest rates raise borrowing costs and mortgage payments, reducing disposable income and so reducing consumer spending.' },

  { id: 'besy-069', topic: 'besy', difficulty: 'easy',
    q: 'What is limited liability?',
    opts: ['Unlimited personal debt', 'Loss limited to investment', 'No responsibility', 'Government guarantee'],
    ans: 1,
    exp: 'Limited liability means shareholders\' loss is limited to the amount they have invested (or agreed to pay) for their shares — personal assets are protected.' },

  { id: 'besy-070', topic: 'besy', difficulty: 'easy',
    q: 'Which of the following is a macroeconomic factor?',
    opts: ['An internal staffing issue', 'An economy-wide influence such as inflation or GDP growth', 'A specific supplier dispute', 'A single customer complaint'],
    ans: 1,
    exp: 'Macroeconomic factors operate at the level of the whole economy — for example inflation, GDP growth, unemployment and interest rates.' },

  { id: 'besy-071', topic: 'besy', difficulty: 'easy',
    q: 'What is price elasticity of demand used to measure?',
    opts: ['Cost changes', 'Responsiveness of demand to price changes', 'Profit levels', 'Tax rates'],
    ans: 1,
    exp: 'Price elasticity of demand (PED) measures how sensitive demand is to a change in price.' },

  { id: 'besy-072', topic: 'besy', difficulty: 'easy',
    q: 'What does "separate legal personality" mean for a limited company?',
    opts: ['It is exempt from preparing accounts', 'It is treated in law as a separate legal entity from its owners', 'It pays no tax', 'It has no liability for its own debts'],
    ans: 1,
    exp: 'A limited company has a legal existence separate from its shareholders. It can own assets, enter contracts and sue or be sued in its own name.' },

  { id: 'besy-073', topic: 'besy', difficulty: 'easy',
    q: 'Who is a stakeholder?',
    opts: ['Only the owners of the business', 'Any individual or group with an interest in, or affected by, the business', 'Only managers', 'Only customers'],
    ans: 1,
    exp: 'A stakeholder is any individual or group with an interest in the organisation — including shareholders, employees, customers, suppliers, lenders and the wider community.' },

  { id: 'besy-074', topic: 'besy', difficulty: 'easy',
    q: 'Which factors primarily affect supply?',
    opts: ['Only the selling price', 'Only consumer demand', 'Production costs and productivity', 'Only wages'],
    ans: 2,
    exp: 'Supply depends primarily on production costs, the productivity of inputs and the prices of related inputs.' },

  { id: 'besy-075', topic: 'besy', difficulty: 'easy',
    q: 'What is sustainability reporting?',
    opts: ['Tax report', 'Environmental impact reporting', 'Payroll report', 'Sales report'],
    ans: 1,
    exp: 'Sustainability reporting communicates an organisation’s environmental, social and governance (ESG) performance and impact.' },

  { id: 'besy-076', topic: 'besy', difficulty: 'easy',
    q: 'What is the purpose of stakeholder analysis?',
    opts: ['Increase tax', 'Identify stakeholder interests and influence', 'Reduce costs only', 'Calculate profit'],
    ans: 1,
    exp: 'Stakeholder analysis identifies stakeholders, their interests and their influence, so the organisation can prioritise communication and management accordingly.' },

  { id: 'besy-077', topic: 'besy', difficulty: 'easy',
    q: 'What is the typical effect of higher unemployment on consumer demand?',
    opts: ['Higher overall demand', 'Lower overall demand', 'Higher inflation always', 'No effect'],
    ans: 1,
    exp: 'Higher unemployment reduces aggregate income and confidence, lowering consumer demand.' },

  { id: 'besy-078', topic: 'besy', difficulty: 'easy',
    q: 'What is unlimited liability?',
    opts: ['No debt', 'Personal responsibility for debts', 'Tax exemption', 'No accounting'],
    ans: 1,
    exp: 'Unlimited liability means the owner is personally responsible for all the debts of the business. Personal assets can be used to settle business debts.' },

  { id: 'besy-079', topic: 'besy', difficulty: 'easy',
    q: 'Which business structure offers all members limited liability?',
    opts: ['Sole trader', 'General partnership', 'Private limited company (Ltd)', 'Unlimited partnership'],
    ans: 2,
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
    opts: ['Inflation rate', 'Exchange rate', 'Competitor pricing', 'GDP growth'],
    ans: 2,
    exp: 'Microeconomic factors operate at the level of individual firms and markets — for example competitor pricing, consumer preferences and input costs.' },

  { id: 'besy-083', topic: 'besy', difficulty: 'easy',
    q: 'Which of the following is a feature of a PLC?',
    opts: ['Cannot issue shares', 'Can offer its shares to the public', 'Has no owners', 'Does not publish accounts'],
    ans: 1,
    exp: 'A PLC can offer shares to the public, including listing on a stock exchange. A private limited company cannot.' },

  { id: 'besy-084', topic: 'besy', difficulty: 'easy',
    q: 'Which of the following is a macroeconomic factor affecting business?',
    opts: ['A competitor launching a new product', 'The unemployment rate', 'A key employee resigning', 'Moving to new premises'],
    ans: 1,
    exp: 'Macroeconomic factors (unemployment, inflation, interest rates, GDP) are economy-wide influences largely outside the control of any individual business.' },

  { id: 'besy-085', topic: 'besy', difficulty: 'easy',
    q: 'Which of the following is an external stakeholder?',
    opts: ['The board of directors', 'Employees', 'A supplier', 'A department manager'],
    ans: 2,
    exp: 'External stakeholders are outside the business — for example customers, suppliers, government and banks. Internal stakeholders include employees and managers.' },

  { id: 'besy-086', topic: 'besy', difficulty: 'easy',
    q: 'Which stakeholder is primarily concerned with profit distribution?',
    opts: ['Government', 'Shareholders', 'Customers', 'Suppliers'],
    ans: 1,
    exp: 'Shareholders invest capital in the company and receive a share of profits in the form of dividends.' },

  { id: 'besy-087', topic: 'besy', difficulty: 'easy',
    q: 'Which UK legislation sets minimum hourly pay?',
    opts: ['Data Protection Act', 'Consumer Rights Act', 'National Minimum Wage Act', 'Equality Act'],
    ans: 2,
    exp: 'The National Minimum Wage Act (and National Living Wage regulations) set legal minimum hourly rates depending on the worker’s age.' },

  { id: 'besy-088', topic: 'besy', difficulty: 'medium',
    q: 'A depreciation of the domestic currency will:',
    opts: ['Make exports cheaper', 'Make imports cheaper', 'Have no effect on trade', 'Reduce inflation immediately'],
    ans: 0,
    exp: 'A weaker domestic currency makes exports cheaper to foreign buyers and imports more expensive — generally improving the trade balance.' },

  { id: 'besy-089', topic: 'besy', difficulty: 'medium',
    q: 'A negative externality leads to:',
    opts: ['Private benefit only', 'External cost to third parties', 'Higher demand', 'Lower taxes automatically'],
    ans: 1,
    exp: 'A negative externality is a cost imposed on third parties not involved in a transaction — for example pollution.' },

  { id: 'besy-090', topic: 'besy', difficulty: 'medium',
    q: 'A positive externality results in:',
    opts: ['Private cost only', 'Benefit to third parties', 'Higher taxes only', 'Reduced supply only'],
    ans: 1,
    exp: 'A positive externality is a benefit that spills over to third parties not directly involved in a transaction — for example education improving wider society.' },

  { id: 'besy-091', topic: 'besy', difficulty: 'medium',
    q: 'An external cost (negative externality) is:',
    opts: ['Private profit', 'Cost imposed on third parties', 'Tax benefit', 'Internal efficiency gain'],
    ans: 1,
    exp: 'An external cost (negative externality) is a cost imposed on third parties who are not part of the transaction.' },

  { id: 'besy-092', topic: 'besy', difficulty: 'medium',
    q: 'What is an example of CSR?',
    opts: ['Tax evasion', 'Environmental reporting', 'Price fixing', 'Monopoly behaviour'],
    ans: 1,
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
        exp: 'Reducing balance = carrying value × rate = £' + window._QH.fmt(cv) + ' × ' + rate + '% = £' + window._QH.fmt(ans) + '.'
      };
    } },

  { id: 'itbk-num-007', topic: 'itbk', difficulty: 'hard', type: 'numeric', unit: '£', tolerance: 0.05,
    generate: function () {
      // Annual insurance paid in advance covering 12 months from start month; year end 31 Dec
      const months = ['January','February','March','April','May','June','July','August','September','October','November'];
      const startIdx = window._QH.r(1, 11); // start month 1=Feb..11=Dec, never Jan so always some prepayment
      const startName = months[startIdx - 1] === undefined ? 'February' : ['January','February','March','April','May','June','July','August','September','October','November','December'][startIdx];
      const monthsUsed = 12 - startIdx; // months from start to Dec inclusive when starting after Jan? Let me recompute.
      // Clarify: payment on 1 of (startIdx+1)-th month covers 12 months.
      // Months used by 31 Dec = 12 - startIdx (if startIdx is 0 = January, used = 12; startIdx 1 = Feb, used = 11, prepaid = 1, ...)
      // Use startIdx 1..11 → at 31 Dec, used = 12 - startIdx, prepaid = startIdx
      const monthName = ['January','February','March','April','May','June','July','August','September','October','November','December'][startIdx];
      const annual = window._QH.rs(1200, 3600, 120); // divisible by 12
      const prepaidMonths = startIdx; // 1..11
      const usedMonths = 12 - startIdx;
      const monthlyAmount = annual / 12;
      const ans = window._QH.round2(monthlyAmount * prepaidMonths);
      return {
        q: 'Insurance of £' + window._QH.fmt(annual) + ' is paid on 1 ' + monthName + ' covering the next 12 months. The financial year ends 31 December. What is the prepayment at year end?',
        answer: ans,
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
          exp: 'Required units = (fixed costs + target profit) ÷ contribution per unit = (£' + window._QH.fmt(safeFc) + ' + £' + window._QH.fmt(targetProfit) + ') ÷ £' + contrib + ' = ' + window._QH.fmt(reqUnits) + ' units.'
        };
      }
      return {
        q: 'Fixed costs £' + window._QH.fmt(fc) + ', contribution per unit £' + contrib + '. How many units must be sold to achieve a target profit of £' + window._QH.fmt(targetProfit) + '?',
        answer: reqUnits,
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
        exp: hours + ' × £' + rate.toFixed(2) + ' = £' + window._QH.fmt(ans) + '.'
      };
    } }

);


/* -- GLOSSARY -- */
window.GLOSSARY = [
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
    exp: 'Professional ethics, the accruals concept, and the finance function\'s sustainability role.' }
);
