/* ----------------------------------------------------------
   AAT Level 2 -- Question Bank
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


  { id: 'itbk-003', topic: 'itbk', difficulty: 'easy',
    q: 'A business purchases goods on credit. The correct entry is:',
    opts: [
      'Dr Purchases, Cr Trade payables',
      'Dr Trade payables, Cr Purchases',
      'Dr Purchases, Cr Bank and cash',
      'Dr Trade payables, Cr Bank',
    ],
    ans: 0,
    exp: 'Buying on credit means goods arrive now and payment follows later. Purchases (an expense) is debited and Trade payables (a liability) is credited. Bank is untouched until the supplier is actually paid, which is a separate entry: Dr Trade payables, Cr Bank.' },

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
      'Dr Discounts allowed, Cr Trade receivables',
      'Dr Discounts received, Cr Trade receivables',
      'Dr Trade receivables, Cr Discounts allowed',
      'Dr Sales, Cr Bank and cash',
    ],
    ans: 0,
    exp: 'A settlement discount given to a customer is an expense of the seller, so Discounts allowed is debited, and the amount the customer owes falls, so Trade receivables is credited. Discounts received is the mirror item for discounts obtained from suppliers.' },

  { id: 'itbk-006', topic: 'itbk', difficulty: 'easy',
    q: 'A credit balance on a customer\'s account indicates:',
    opts: [
      'The customer has overpaid or been issued a credit note',
      'The customer owes more than their agreed credit limit',
      'A sales invoice has been posted twice to the account',
      'The customer has been charged interest for late payment',
    ],
    ans: 0,
    exp: 'Customers normally have debit balances. A credit balance means the customer has overpaid or has been issued a credit note — the business owes them. Owing beyond a limit, a doubled invoice and interest charged would all push the balance further to the debit side, not into credit.' },

  { id: 'itbk-007', topic: 'itbk', difficulty: 'easy',
    q: 'A debit balance on the rent account represents:',
    opts: [
      'Rent that has been paid — an expense of the business',
      'Rent received in advance from a tenant of the business',
      'A reduction in the rent expense charged for the period',
      'An amount of rent still owed to the business by others',
    ],
    ans: 0,
    exp: 'Expenses increase on the debit side, so a debit balance on Rent is rent paid. Rent received would be income with a credit balance, and an amount owed to the business would be a receivable.' },

  { id: 'itbk-008', topic: 'itbk', difficulty: 'easy',
    q: 'A debit entry in the sales ledger control account (SLCA) most commonly represents:',
    opts: [
      'Credit sales made to customers during the period',
      'Cash received from customers settling their accounts',
      'Discounts received from suppliers for prompt payment',
      'Bank charges levied on the business account',
    ],
    ans: 0,
    exp: 'The SLCA is an asset, so entries increasing what customers owe are debits — principally credit sales, plus dishonoured cheques. Receipts, returns, discounts allowed and irrecoverable debts all reduce the balance and sit on the credit side.' },

  { id: 'itbk-009', topic: 'itbk', difficulty: 'easy',
    q: 'A debit entry to the bank account represents:',
    opts: ['Money leaving the business', 'An increase in money at the bank', 'A liability increasing', 'A decrease in the bank balance'],
    ans: 1,
    exp: 'Bank is an asset account. A debit increases an asset, so a debit to bank means money has been received.' },

  { id: 'itbk-010', topic: 'itbk', difficulty: 'easy',
    q: 'A discount allowed is recorded as:',
    opts: ['Revenue increase', 'Expense increase', 'Liability increase', 'Asset increase'],
    ans: 1,
    exp: 'A discount allowed is given to a customer for prompt settlement, so the business receives less than the invoiced amount. That shortfall is a cost of getting paid early — an expense, debited to Discounts allowed. Discounts received, from suppliers, is the mirror item and is income.' },

  { id: 'itbk-011', topic: 'itbk', difficulty: 'easy',
    q: 'A goods received note (GRN) is used to:',
    opts: [
      'Confirm that ordered goods have been received and checked on delivery',
      'Request goods from a supplier at the prices previously agreed',
      'Request payment from a customer for goods supplied on credit',
      'Record a sale in the accounting records at the point of goods despatch',
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
    exp: 'The SLCA is debited by credit sales, so posting the same invoice twice debits it twice. Trade receivables is overstated, and the control account will no longer agree with the total of the individual customer accounts — which is exactly how the reconciliation catches it.' },

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
    exp: 'A credit note from a supplier reduces what the business owes, so trade payables falls (debit) and the original purchase is reduced (credit). It is the mirror image of the invoice entry. Do not net it off against a later invoice — record it in its own right through the purchases returns day book.' },

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


  { id: 'itbk-019', topic: 'itbk', difficulty: 'easy',
    q: 'The accounting equation is:',
    opts: ['Assets = Capital − Liabilities', 'Assets = Capital + Liabilities', 'Liabilities = Capital + Assets', 'Capital = Assets + Liabilities'],
    ans: 1,
    exp: 'Assets = Capital + Liabilities. Everything the business holds was funded either by the owner or by someone else — there is no third source. It rearranges to Capital = Assets − Liabilities, which is how you find the owner\'s stake when only two figures are given.' },

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
    opts: ['VAT payable over to HMRC in full', 'VAT receivable from HMRC', 'No VAT adjustment', 'Increase in sales'],
    ans: 1,
    exp: 'Where input tax exceeds output tax, the business has reclaimable VAT — HMRC owes a refund to the business.' },

  { id: 'itbk-023', topic: 'itbk', difficulty: 'easy',
    q: 'VAT output tax exceeds input tax. The business will:',
    opts: ['Receive refund from HMRC', 'Owe HMRC VAT', 'Pay no VAT', 'Increase assets'],
    ans: 1,
    exp: 'Output tax is charged on sales and credited to the VAT account; input tax is suffered on purchases and debited to it. A credit balance means output exceeds input, so the difference is payable to HMRC. The reverse — input exceeding output — produces a repayment claim.' },

  { id: 'itbk-024', topic: 'itbk', difficulty: 'easy',
    q: 'What does a debit balance on a bank account represent?',
    opts: [
      'Cash held at the bank, which is an asset of the business',
      'An overdraft, meaning the business owes money to the bank',
      'A liability owed by the business at the reporting date',
      'Revenue earned by the business during the period',
    ],
    ans: 0,
    exp: 'Bank is an asset, and assets increase on the debit side, so a debit balance means money is held. An overdraft is the opposite: a credit balance on the bank account, representing a liability owed to the bank.' },

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
      'An asset representing the cash that the business holds at its bank',
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
    exp: 'A ledger is where the accounts themselves live, as opposed to a book of prime entry, which merely lists documents before posting. The general ledger holds the accounts that make up the trial balance; the sales and purchases ledgers hold individual customer and supplier accounts outside the double entry.' },

  { id: 'itbk-030', topic: 'itbk', difficulty: 'easy',
    q: 'What is petty cash typically used for?',
    opts: [
      'Small day-to-day expenses that are impractical to pay by bank transfer',
      'Settling large supplier invoices as they fall due each month',
      'Recording every transaction passing through the bank account',
      'Paying the monthly employee wages and the associated statutory deductions',
    ],
    ans: 0,
    exp: 'Petty cash covers minor items such as postage, taxi fares and refreshments, usually run on the imprest system so the float is restored to a set amount. Large payments and payroll go through the bank for control and audit-trail reasons.' },

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
    exp: 'Routine transactions reach the ledgers through the day books and cash book. The journal handles everything else — error corrections, year-end adjustments, opening balances, payroll and asset disposals — and every entry carries a narrative so the reason is auditable later.' },

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
    exp: 'Capital is what the business owes its owner, so it behaves like a liability and increases on the credit side. A debit therefore reduces it. The two common causes are drawings taken by the owner and a loss for the period.' },

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
    exp: 'Trade receivables is an asset — money owed to the business — and assets increase on the debit side, so the normal balance is a debit. A credit balance is possible but unusual: it means a customer has overpaid or holds an unused credit note.' },

  { id: 'itbk-038', topic: 'itbk', difficulty: 'easy',
    q: 'What is the purpose of a remittance advice when a payment is made?',
    opts: [
      'It tells the supplier which invoices the payment covers',
      'It requests a refund of an amount overpaid to a supplier',
      'It sets out the credit terms agreed with a supplier',
      'It records the VAT charged on a purchase invoice',
    ],
    ans: 0,
    exp: 'The remittance advice travels from buyer to supplier and says which invoices a payment covers. Without it, a supplier receiving a single lump sum cannot allocate it and may chase invoices that have in fact been paid. The invoice, by contrast, travels the other way and requests payment.' },

  { id: 'itbk-039', topic: 'itbk', difficulty: 'easy',
    q: 'What is the purpose of control accounts?',
    opts: [
      'To provide a summary check on the subsidiary ledgers',
      'To replace the subsidiary ledgers entirely in the system',
      'To record the cash and bank transactions of the business',
      'To calculate the profit the business made in the period',
    ],
    ans: 0,
    exp: 'The control account holds the total of many individual accounts, built from day book totals. The individual accounts are built from single transactions. Because the two are constructed by genuinely different routes, agreement between them is real evidence that the postings are right.' },

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
    exp: 'A trade receivable arises when goods or services are supplied on credit: the revenue is recognised at once, and the amount owed is carried as a current asset until the customer pays. Money owed by the business to a supplier is the mirror item, a trade payable.' },

  { id: 'itbk-043', topic: 'itbk', difficulty: 'easy',
    q: 'When a business pays a supplier, the correct double entry is:',
    opts: ['Dr Bank, Cr Trade Payables', 'Dr Trade Payables, Cr Bank', 'Dr Trade Payables, Cr Sales', 'Dr Purchases, Cr Bank'],
    ans: 1,
    exp: 'Paying a supplier settles an existing obligation. The liability falls, so Trade payables is debited, and money leaves the account, so Bank is credited. Purchases is not touched — the expense was recognised when the goods were bought, not when they were paid for.' },

  { id: 'itbk-044', topic: 'itbk', difficulty: 'easy',
    q: 'Which account is affected when inventory is purchased on credit?',
    opts: [
      'Trade payables, because the amount is owed to the supplier',
      'Bank, because the payment leaves the business account immediately',
      'Sales, because the transaction is recorded as revenue earned',
      'Capital, because the owner\'s investment in the business changes',
    ],
    ans: 0,
    exp: 'Buying on credit creates an obligation, so Trade payables is credited. The debit goes to Purchases (or Inventory, depending on the system). Bank stays out of it entirely until settlement, which is a separate transaction.' },

  { id: 'itbk-045', topic: 'itbk', difficulty: 'easy',
    q: 'Which account is credited when goods are sold on credit?',
    opts: ['Bank', 'Sales', 'Trade Receivables', 'Purchases'],
    ans: 1,
    exp: 'A credit sale recognises revenue when the goods are supplied, not when the money arrives, so Sales is credited and Trade receivables debited. When the customer later pays, the entry moves value between two assets — Dr Bank, Cr Trade receivables — and Sales is not touched again.' },

  { id: 'itbk-046', topic: 'itbk', difficulty: 'easy',
    q: 'Which accounting treatment is required for irrecoverable debts recovered after being written off?',
    opts: [
      'Credit the irrecoverable debts expense account',
      'Credit the sales account for the amount recovered',
      'Credit the trade receivables control account',
      'Debit cash and make no corresponding credit entry',
    ],
    ans: 0,
    exp: 'Recovering a debt already written off reverses part of the earlier expense, so the credit goes to irrecoverable debts (with the debit to bank). Crediting sales would double-count revenue, since the sale was recognised when the invoice was raised.' },

  { id: 'itbk-047', topic: 'itbk', difficulty: 'easy',
    q: 'Which document accompanies goods delivered to a customer?',
    opts: [
      'A delivery note, signed by the customer on receipt',
      'An invoice, requesting payment for the goods supplied',
      'A credit note, reducing the amount the customer owes',
      'A statement, listing the month\'s transactions and balance',
    ],
    ans: 0,
    exp: 'The delivery note travels with the goods and evidences what physically arrived. The invoice follows and requests payment; a credit note reverses part of it; a statement summarises the account at the month end.' },

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
      'A sales invoice',
      'A remittance advice',
      'A credit note',
      'A delivery note',
    ],
    ans: 0,
    exp: 'A sales invoice requests payment from the buyer, showing the amount owed, the payment terms and the due date. A remittance advice travels the other way, with the payment; a credit note reduces what is owed; a delivery note accompanies the goods and asks for nothing.' },

  { id: 'itbk-051', topic: 'itbk', difficulty: 'easy',
    q: 'Which document is used internally to correct errors in the ledger?',
    opts: ['Invoice', 'Credit note', 'Journal', 'Remittance advice'],
    ans: 2,
    exp: 'The journal is used for non-routine entries — including corrections, year-end adjustments and opening balances.' },

  { id: 'itbk-052', topic: 'itbk', difficulty: 'easy',
    q: 'Which document is used to initiate a purchase?',
    opts: ['Sales invoice', 'Purchase order', 'Credit note', 'Statement'],
    ans: 1,
    exp: 'The purchase order is the buyer\'s formal request to the supplier, fixing quantity and price. It is the first document in the order-to-payment trail and the first leg of the three-way match against the goods received note and the invoice.' },

  { id: 'itbk-053', topic: 'itbk', difficulty: 'easy',
    q: 'Which document provides evidence of goods ordered but not yet received?',
    opts: ['Invoice', 'Purchase order', 'Goods received note', 'Remittance advice'],
    ans: 1,
    exp: 'A purchase order evidences that goods have been ordered, but does not by itself confirm that they have arrived.' },

  { id: 'itbk-054', topic: 'itbk', difficulty: 'easy',
    q: 'Which double entry correctly records a cash sale?',
    opts: [
      'Dr Bank, Cr Sales',
      'Dr Trade receivables, Cr Sales',
      'Dr Bank, Cr Trade receivables',
      'Dr Sales, Cr Bank',
    ],
    ans: 0,
    exp: 'A cash sale brings money in immediately, so bank increases (debit) and revenue is recognised (credit). No receivable arises because nothing is owed. The second entry would be a credit sale; the third is the later receipt from one.' },

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


  { id: 'itbk-058', topic: 'itbk', difficulty: 'easy',
    q: 'Which ledger records customer accounts?',
    opts: [
      'The sales ledger, holding one account per credit customer',
      'The purchases ledger, holding one account per credit supplier',
      'The general ledger, holding the accounts for the trial balance',
      'The cash book, recording money received and paid out',
    ],
    ans: 0,
    exp: 'The sales ledger is the memorandum record of individual customer accounts. The general ledger holds only the single sales ledger control account that summarises them, which is what appears in the trial balance.' },

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
      'Every transaction is reflected in the business current bank account',
    ],
    ans: 0,
    exp: 'The dual effect (duality) concept states that every transaction has at least two effects — equal debits and credits — and forms the foundation of double-entry bookkeeping.' },

  { id: 'itbk-064', topic: 'itbk', difficulty: 'easy',
    q: 'Which statement is correct about VAT input tax?',
    opts: ['Charged on sales', 'Charged on purchases', 'Paid to employees', 'Recorded as revenue'],
    ans: 1,
    exp: 'Input tax is VAT the business is charged on what it buys, and a VAT-registered business can generally reclaim it from HMRC. Output tax is what it charges on sales. An unregistered business cannot reclaim input tax, so for it the VAT is simply part of the cost.' },

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
    exp: 'FIFO assumes the oldest units leave first, so whatever remains must be the most recent purchases. In a rising market that means closing inventory is valued at higher prices, cost of sales is lower and reported profit is higher than under AVCO.' },

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
    exp: 'The bank never received the money, so the original receipt must be reversed: Bank is credited and Trade receivables debited, putting the debt back on the customer. Many businesses also recharge any bank fee. The sale itself is unaffected — it was earned when the goods were supplied.' },




  { id: 'itbk-073', topic: 'itbk', difficulty: 'medium',
    q: 'A sales ledger control account and sales ledger differ due to:',
    opts: [
      'Timing differences and errors made when posting entries',
      'Errors made by the bank when processing the transactions',
      'Changes in the rate of VAT applied to sales',
      'The depreciation charged on non-current assets',
    ],
    ans: 0,
    exp: 'Differences between the SLCA and the sum of individual sales ledger balances are caused by posting errors, omissions or timing differences.' },

  { id: 'itbk-074', topic: 'itbk', difficulty: 'medium',
    q: 'A supplier invoice is recorded as £540 in the purchases day book when the correct amount is £450. What type of error is this?',
    opts: ['Complete omission', 'Error of original entry', 'A compensating error', 'Error of principle'],
    ans: 1,
    exp: 'An error of original entry occurs when an incorrect figure is used at the point of entry. Both sides of the double entry are then wrong by the same amount, so the trial balance still balances.' },





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


  { id: 'itbk-081', topic: 'itbk', difficulty: 'medium',
    q: 'What is a contra entry in a cash book?',
    opts: [
      'A transfer of money between the cash account and the bank',
      'Charges levied by the bank on the business current account',
      'A purchase of goods made from a supplier on credit',
      'An adjustment to the VAT recorded for the period',
    ],
    ans: 0,
    exp: 'A contra entry in the cash book transfers money between the bank and cash columns — for example withdrawing cash from the bank: Cr Bank, Dr Cash.' },



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
    opts: ['A contra entry that was posted to the control account but not to the individual customer account', 'A cash receipt that was entered in the cash book but never posted to the individual customer account', 'An error in the bank reconciliation, which affects neither the control account nor the customer accounts', 'A sales invoice entered in the day book but not posted to the individual customer account'],
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
    exp: 'Trade discount is deducted before the invoice is raised, so it never enters the accounting records. Only the net figure actually charged is recorded. Settlement discount behaves differently: it is offered for prompt payment and is recorded when taken.' },

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
      'Dr Irrecoverable debts £240, Cr Trade receivables £240 (no VAT relief)',
      'Dr Trade receivables £240, Cr Irrecoverable debts £240 (gross both ways)',
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
    exp: 'VAT is charged on the net amount: £1,200 × 20% = £240, giving £1,440 gross. To work backwards from a gross figure, divide by 1.2 for the net, or by 6 for the VAT itself — a shortcut worth memorising.' },


  { id: 'itbk-113', topic: 'itbk', difficulty: 'hard',
    q: 'Net assets at year end are £45,000. The owner introduced additional capital of £10,000 during the year, opening capital was £30,000 and there were no drawings. What is the profit for the year?',
    opts: ['£5,000', '£15,000', '£25,000', '£55,000'],
    ans: 0,
    exp: 'Closing capital = opening capital + capital introduced + profit − drawings. £45,000 = £30,000 + £10,000 + profit − £0. Profit = £45,000 − £40,000 = £5,000.' },



  { id: 'itbk-116', topic: 'itbk', difficulty: 'hard',
    q: 'Which of the following is the correct double entry for a credit sale of £500?',
    opts: ['Dr Sales £500, Cr Trade Receivables £500', 'Dr Trade Receivables £500, Cr Sales £500', 'Dr Bank £500, Cr Sales £500', 'Dr Sales £500, Cr Bank £500'],
    ans: 1,
    exp: 'A credit sale recognises revenue at the point of supply. Trade receivables is debited because the customer now owes the money, and Sales is credited because the revenue has been earned. If VAT applied, the receivable would be the gross figure with sales and VAT credited separately.' },


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
    exp: 'The journal handles the non-routine entries that no other book of prime entry covers — corrections, opening balances, irrecoverable debts and the payroll. That is the test: if a transaction fits one of the other books, it belongs there instead.' },

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
    exp: 'Receipts reduce what customers owe, so they are credited to the SLCA. So do sales returns, discounts allowed, irrecoverable debts and contras. Credit sales and dishonoured cheques increase the balance and sit on the debit side.' },

  { id: 'pobc-008', topic: 'pobc', difficulty: 'easy',
    q: 'A suspense account balance remains after correction. What does this indicate?',
    opts: [
      'Further errors remain that have not yet been found and corrected',
      'Every error affecting the trial balance has now been identified',
      'The bank has made an error in processing the business\'s transactions',
      'The VAT charged on sales does not agree with the VAT return',
    ],
    ans: 0,
    exp: 'The suspense account only clears when every error causing the difference has been found and journalled. A balance still sitting there means at least one error remains unidentified, and it must not simply be written off — the accounts would then be knowingly wrong.' },

  { id: 'pobc-009', topic: 'pobc', difficulty: 'easy',
    q: 'A suspense account is cleared by:',
    opts: [
      'Identifying and correcting the bookkeeping errors that caused it',
      'Increasing the revenue that is recorded for the accounting period',
      'Changing the rate of VAT applied to the period\'s sales',
      'Adjusting the wages recorded in the payroll journal',
    ],
    ans: 0,
    exp: 'A suspense account is cleared by identifying the underlying errors and correcting them by journal entry.' },

  { id: 'pobc-010', topic: 'pobc', difficulty: 'easy',
    q: 'A suspense account is cleared when:',
    opts: [
      'The errors causing the difference are identified and corrected',
      'The reported revenue for the period increases sufficiently',
      'The VAT due for the quarter has been paid over to HMRC',
      'The business revalues its non-current assets upwards',
    ],
    ans: 0,
    exp: 'A suspense account is a temporary holding place for a trial balance difference. It clears only when the underlying errors are found and put right by journal. A balance still sitting there at the year end means errors remain unresolved.' },

  { id: 'pobc-011', topic: 'pobc', difficulty: 'easy',
    q: 'A transposition error will:',
    opts: [
      'Usually cause the trial balance to disagree by a multiple of nine',
      'Always leave the trial balance in agreement, whichever side it affects',
      'Have no effect on any of the ledger accounts or on the trial balance',
      'Affect only the VAT control account and no other ledger account',
    ],
    ans: 0,
    exp: 'Transposing digits — £45 recorded as £54 — leaves a difference divisible by nine, which is why a difference that divides by nine points to a transposition. It only agrees if the same error is made on both sides.' },

  { id: 'pobc-012', topic: 'pobc', difficulty: 'easy',
    q: 'An unpresented cheque is:',
    opts: [
      'A cheque written and recorded that has not yet cleared the bank',
      'A direct debit taken by the bank but not recorded in the cash book',
      'A lodgement recorded in the cash book but not yet on the statement',
      'Bank charges appearing on the statement but not in the cash book',
    ],
    ans: 0,
    exp: 'The business has written the cheque and recorded it, but the payee has not yet banked it, so the bank statement is still higher. This is a timing difference: it needs no adjustment and will resolve itself when the cheque clears. Contrast bank charges, which are genuine omissions from the cash book.' },

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
    exp: 'Clearing suspense means locating each error and posting a journal that moves the amount to where it belongs. There is no shortcut: transferring the balance to the income statement would conceal the errors rather than correct them.' },

  { id: 'pobc-015', topic: 'pobc', difficulty: 'easy',
    q: 'Every journal entry must include:',
    opts: [
      'A narrative explaining the reason for the entry',
      'Written approval from a company director',
      'A matching entry in a second separate journal',
      'Confirmation that a new bank account was opened',
    ],
    ans: 0,
    exp: 'The narrative is what makes a journal auditable: without it, nobody reviewing the books later can judge whether the entry was legitimate. Director approval is a control some businesses add, but it is not part of the entry itself.' },

  { id: 'pobc-016', topic: 'pobc', difficulty: 'easy',
    q: 'Net pay equals:',
    opts: [
      'Gross pay less all deductions made from the employee\'s wages',
      'The employer\'s National Insurance contribution for the period',
      'Gross pay plus the employer\'s National Insurance contribution',
      'The income tax deducted from the employee under PAYE',
    ],
    ans: 0,
    exp: 'Net pay is what actually reaches the employee: gross pay less PAYE, employee National Insurance, pension contributions and any other deductions. Employer\'s NIC is not deducted from the employee — it is an additional cost to the employer on top of gross pay.' },

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
    exp: 'The PLCA records what the business owes suppliers, making it a liability, and liabilities carry credit balances. A debit balance is possible but unusual: it means a supplier has been overpaid or a credit note exceeds the amount owed.' },

  { id: 'pobc-020', topic: 'pobc', difficulty: 'easy',
    q: 'The sales ledger control account balance should agree with:',
    opts: [
      'The total of the individual customer balances in the sales ledger',
      'The total of the individual supplier balances in the purchases ledger',
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
    exp: 'Total employment cost is what the employer actually parts with: gross pay plus employer\'s National Insurance plus employer\'s pension contributions. The employee\'s own deductions are inside gross pay, not additional to it — a distinction routinely tested.' },

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
      'Output tax exceeds input tax, so the business owes HMRC',
      'Input tax exceeds output tax, so a refund is due from HMRC',
      'No VAT has been charged or incurred during the period',
      'The business is not registered for VAT and cannot reclaim it',
    ],
    ans: 0,
    exp: 'The VAT control account collects output tax on sales as credits and input tax on purchases as debits. A credit balance therefore means output exceeds input and the difference is payable. A debit balance is the refund position.' },

  { id: 'pobc-025', topic: 'pobc', difficulty: 'easy',
    q: 'What is a journal correction used for?',
    opts: ['Sales recording', 'Error correction', 'Bank deposits', 'Inventory valuation'],
    ans: 1,
    exp: 'The journal handles what the day books cannot: correcting errors, posting year-end adjustments, recording opening balances, payroll and asset disposals. Every entry carries a narrative, without which nobody reviewing the books later can judge whether it was legitimate.' },

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
      'VAT the business has incurred on its purchases',
      'VAT the business has charged on its sales',
      'Income tax deducted from employees under PAYE',
      'National Insurance payable by the employer',
    ],
    ans: 0,
    exp: 'Input VAT is suffered on purchases and is reclaimable if the business is VAT registered. Output VAT is charged on sales. The difference between the two is what is paid to, or reclaimed from, HMRC.' },

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
      'Record the VAT charged on sales and the VAT incurred on purchases',
      'Record movements in the value of inventory held',
    ],
    ans: 0,
    exp: 'The payroll journal records gross wages, employee and employer NICs, PAYE, pension contributions and net pay for the period.' },

  { id: 'pobc-034', topic: 'pobc', difficulty: 'easy',
    q: 'How is a suspense account cleared?',
    opts: [
      'By posting correcting journal entries once the errors are found',
      'By transferring the whole balance to the profit and loss account',
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
      'A reduction in the tax liability that the organisation owes HMRC',
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
    exp: 'When the trial balance does not agree, the difference is parked in a suspense account so the accounts can be prepared while the cause is investigated. It is temporary by design: each error found is journalled out until the balance reaches nil.' },

  { id: 'pobc-038', topic: 'pobc', difficulty: 'easy',
    q: 'What is the purpose of internal controls?',
    opts: [
      'To prevent errors and fraud and detect them when they occur',
      'To increase the profit the business reports for the period',
      'To reduce the amount of tax the business is liable to pay',
      'To increase the wages paid to employees in the business',
    ],
    ans: 0,
    exp: 'Controls exist because people make mistakes, not because they are assumed dishonest. Preventive controls such as authorisation and segregation of duties stop errors occurring; detective controls such as reconciliations and the trial balance find those that slip through.' },

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
    exp: 'Paying wages reduces the bank balance, so Bank is credited. The debit side splits between the wages expense and the liabilities created for PAYE and National Insurance owed to HMRC, which are paid over separately.' },

  { id: 'pobc-041', topic: 'pobc', difficulty: 'easy',
    q: 'Which control account is used for VAT reporting?',
    opts: [
      'The VAT control account',
      'The sales ledger control account',
      'The purchases ledger control account',
      'The cash book covering bank and cash',
    ],
    ans: 0,
    exp: 'The VAT control account collects output tax on sales and input tax on purchases; its balance is what is owed to, or reclaimable from, HMRC at the quarter end. The other accounts track customers, suppliers and money movements.' },

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
      'A transaction omitted from the records entirely',
      'A posting made to one side of the ledger only',
      'A transposition affecting the debit side alone',
      'Unequal debit and credit amounts for one transaction',
    ],
    ans: 0,
    exp: 'An omission leaves both debits and credits reduced by the same amount, so the columns still agree. The other three all leave the two sides unequal and will show up as a difference on the trial balance.' },

  { id: 'pobc-045', topic: 'pobc', difficulty: 'easy',
    q: 'Which is a source document?',
    opts: ['Ledger', 'Invoice', 'Trial balance', 'Profit statement'],
    ans: 1,
    exp: 'Source documents (such as invoices, credit notes and bank statements) provide the original evidence for transactions.' },

  { id: 'pobc-046', topic: 'pobc', difficulty: 'easy',
    q: 'Which item appears in a suspense account temporarily?',
    opts: [
      'An unidentified difference on the trial balance',
      'A correctly recorded and fully balanced transaction',
      'Expenditure on the purchase of a non-current asset',
      'Revenue earned from sales made during the period',
    ],
    ans: 0,
    exp: 'The suspense account is a temporary holding place for a difference whose cause is not yet known. It is cleared by journal once the errors are traced, and any balance remaining at the year end signals unresolved errors.' },

  { id: 'pobc-047', topic: 'pobc', difficulty: 'easy',
    q: 'Which of the following causes the cash book balance to be HIGHER than the bank statement balance?',
    opts: [
      'Outstanding lodgements not yet credited by the bank',
      'Unpresented cheques not yet paid out by the bank',
      'Bank charges appearing only on the bank statement',
      'A direct debit taken but not recorded in the cash book',
    ],
    ans: 0,
    exp: 'A lodgement recorded by the business but not yet by the bank makes the cash book higher. Unpresented cheques leave the cash book lower, and unrecorded charges or direct debits mean the cash book is overstated and needs adjusting.' },

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
      'Instances of fraud committed against the business by staff',
      'Errors made in the calculation of the profit reported for the period',
      'Errors made in the calculation of the VAT return for the quarter',
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
      'Outstanding lodgements the bank has not yet credited',
      'Unpresented cheques the bank has not yet paid out',
      'Bank charges that have not been entered in the cash book',
      'Direct debits taken by the bank and not yet recorded',
    ],
    ans: 0,
    exp: 'A lodgement recorded in the cash book but not yet credited by the bank makes the cash book the higher of the two. Unpresented cheques work the other way, and bank charges or direct debits mean the cash book is too high only because entries are missing — those require adjustment rather than being timing differences.' },

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
      'A payment for motor expenses is posted to the motor vehicles account',
      'A payment is posted to the account of a completely different supplier',
      'The digits in an amount are transposed when it is recorded',
      'The debit and credit entries for a transaction are reversed',
    ],
    ans: 0,
    exp: 'An error of principle posts a transaction to the wrong type of account altogether — an expense treated as an asset. Posting to the wrong supplier is an error of commission, because the type of account was right; transposed digits are an error of original entry.' },

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
      'Mistakes made in calculating the employee wages and deductions',
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
      'A transaction that was posted to an account of an entirely wrong category',
      'A transaction that was never entered into the records at all',
      'A transaction where the totals have been added up incorrectly',
    ],
    ans: 0,
    exp: 'An error of commission occurs when a transaction is posted to the correct type of account but to the wrong specific account.' },

  { id: 'pobc-076', topic: 'pobc', difficulty: 'medium',
    q: 'What is the aim of a bank reconciliation?',
    opts: [
      'Match the cash book against the bank statement and explain any differences',
      'Calculate the profit or loss that the business made during the accounting period',
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
      'Increase the profit reported in the published financial statements',
      'Reduce the wage costs incurred by the finance department each year',
      'Calculate the VAT liability that is payable to HMRC each quarter',
    ],
    ans: 0,
    exp: 'Audit-trail documentation enables every transaction to be traced back to its source document, supporting completeness and accuracy.' },

  { id: 'pobc-079', topic: 'pobc', difficulty: 'medium',
    q: 'What is the purpose of segregation of duties in payroll?',
    opts: [
      'Reduce fraud by splitting responsibilities between different people',
      'Increase the wages paid to the staff working in the payroll department',
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
    exp: 'Passwords and user access rights limit who can enter the system and what they can do once inside. Individual logins matter as much as the password itself: a shared login destroys the audit trail, because no entry can be attributed to a person.' },

  { id: 'pobc-087', topic: 'pobc', difficulty: 'medium',
    q: 'Which is a timing difference?',
    opts: [
      'A cheque written and recorded but not yet presented',
      'The depreciation charged on the non-current assets',
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
    exp: 'A stock reconciliation compares the physical count against the inventory records and investigates any difference — theft, damage, mis-posting or goods received but not recorded. Like every reconciliation, it works by comparing two records built independently.' },

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
    q: 'In the VAT control account, the amount due to HMRC is:',
    opts: ['Output tax minus input tax', 'Input tax minus output tax', 'Total sales divided by 6', 'Total purchases multiplied by 20%'],
    ans: 0,
    exp: 'VAT due to HMRC = output tax (on sales) − input tax (on purchases), which is the balance on the VAT control account. If input tax exceeds output tax the balance is a debit, and HMRC owes the business a refund.' },


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
    exp: 'A step cost holds steady across a range of activity, then jumps when a capacity limit is crossed — a second supervisor, another delivery van, an extra shift. Within each range it behaves like a fixed cost; across ranges it plainly does not.' },


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
      'A fixed element and a variable element',
      'A direct element and an indirect element',
      'A capital element and a revenue element',
      'A material element and a labour element',
    ],
    ans: 0,
    exp: 'Splitting a semi-variable cost separates the standing charge, which is incurred whatever the usage, from the charge that varies with it. Direct against indirect is a different classification altogether, answering a different question about the same cost.' },

  { id: 'poc-011', topic: 'poc', difficulty: 'easy',
    q: 'A semi-variable cost:',
    opts: [
      'Contains both a fixed element and a variable element',
      'Remains constant in total at every level of activity',
      'Changes in direct proportion to the level of activity',
      'Cannot be analysed into its component parts at all',
    ],
    ans: 0,
    exp: 'A semi-variable cost has a standing charge that is incurred regardless of use, plus a usage charge that varies with it — an electricity bill is the standard example. Both elements sit inside one cost, which is why it has to be separated before the cost can be forecast at a new level of output.' },

  { id: 'poc-012', topic: 'poc', difficulty: 'easy',
    q: 'A step cost changes when:',
    opts: [
      'Activity reaches a threshold requiring extra capacity',
      'Activity changes continuously by any small amount',
      'The revenue earned by the business decreases',
      'The fixed costs of the business disappear entirely',
    ],
    ans: 0,
    exp: 'Step costs stay flat within a capacity band and jump when that band is exceeded. Recognising the threshold matters: a decision that looks marginally profitable can become a loss once it pushes activity past the step.' },

  { id: 'poc-013', topic: 'poc', difficulty: 'easy',
    q: 'Absorption costing involves:',
    opts: [
      'Allocating and apportioning overheads to cost centres, then absorbing them into products',
      'Excluding all fixed production overheads from the cost attributed to each unit of product',
      'Charging only the cost of direct materials to each unit of production',
      'Deducting the total cost of production from revenue to arrive at the profit',
    ],
    ans: 0,
    exp: 'Absorption costing: (1) allocate/apportion overheads to cost centres, (2) calculate an OAR for each, (3) absorb overheads into product cost.' },

  { id: 'poc-014', topic: 'poc', difficulty: 'easy',
    q: 'If activity doubles and total cost increases less than proportionally, cost is:',
    opts: [
      'Semi-variable, containing both a fixed and a variable element',
      'Fixed, remaining constant in total whatever the activity level',
      'Variable, changing in direct proportion to the activity',
      'Irrelevant, as it does not change with any decision made',
    ],
    ans: 0,
    exp: 'Total cost rises less than proportionally with output, indicating a semi-variable cost (a mix of fixed and variable elements).' },

  { id: 'poc-015', topic: 'poc', difficulty: 'easy',
    q: 'If production increases but fixed costs remain constant, fixed cost per unit will:',
    opts: [
      'Decrease, as the same total is spread over more units',
      'Increase, as more units consume more of the fixed cost',
      'Stay constant, since fixed costs never change at all',
      'Become a variable cost once output passes a threshold',
    ],
    ans: 0,
    exp: 'Fixed cost is fixed in total, not per unit. Producing 2,000 units instead of 1,000 halves the fixed cost carried by each. This is why cost per unit falls as output rises, and why volume matters so much to unit costing.' },



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
      'Lower reported profit, as the shortfall is charged to the income statement',
      'Higher reported profit, as products were charged too much overhead',
      'No effect on profit at all, since the difference cancels out over the year',
      'Higher reported revenue for the period in which it arises',
    ],
    ans: 0,
    exp: 'Under-absorption means less overhead was charged to products than was actually incurred, so product costs were understated. The shortfall is debited to the income statement, reducing profit. Over-absorption has the opposite effect.' },

  { id: 'poc-024', topic: 'poc', difficulty: 'easy',
    q: 'Variable cost per unit:',
    opts: [
      'Remains constant however many units are produced',
      'Increases as the level of output rises',
      'Decreases as the level of output rises',
      'Is always greater than the fixed cost per unit',
    ],
    ans: 0,
    exp: 'Variable cost per unit is constant — £5 of materials per unit whether you make 10 or 10,000 — while the total rises with output. Fixed cost behaves the opposite way: constant in total, falling per unit.' },

  { id: 'poc-025', topic: 'poc', difficulty: 'easy',
    q: 'What happens to unit fixed cost as output increases?',
    opts: [
      'It decreases, as the fixed total is spread more thinly',
      'It increases in line with the additional output produced',
      'It stays exactly the same regardless of output',
      'It converts into a variable cost as output grows',
    ],
    ans: 0,
    exp: 'Unit fixed cost = total fixed cost ÷ units. The numerator is unchanged, so raising the denominator lowers the result. Total fixed cost is what stays constant.' },

  { id: 'poc-026', topic: 'poc', difficulty: 'easy',
    q: 'What is a cost centre?',
    opts: [
      'An area of the business to which costs are charged and accumulated',
      'A part of the business that is responsible for generating a profit',
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
      'Preparing and filing the annual business tax return with HMRC',
      'Calculating wages and deductions for the payroll run',
      'Reconciling the cash book against the bank statement',
    ],
    ans: 0,
    exp: 'Knowing how a cost behaves is what makes planning possible: you cannot flex a budget, forecast a total cost at a different level of output, or work out a cost per unit without separating what varies with activity from what does not.' },

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
    exp: 'Prime cost is the sum of direct materials, direct labour and direct expenses — everything traceable to the cost unit. Overheads are excluded by definition; adding absorbed production overhead to prime cost gives total production cost.' },

  { id: 'poc-037', topic: 'poc', difficulty: 'easy',
    q: 'How is labour cost classified by traceability?',
    opts: ['Only as fixed', 'As direct or indirect', 'Only as sales-related', 'As capital'],
    ans: 1,
    exp: 'Labour cost is direct when traceable to a specific cost unit (e.g. assembly workers) and indirect when it cannot be (e.g. supervisors, cleaners).' },


  { id: 'poc-039', topic: 'poc', difficulty: 'easy',
    q: 'What is overhead absorption?',
    opts: [
      'Charging a share of production overheads to each unit of output',
      'Ignoring production overheads when arriving at the cost of a unit',
      'Recording only the direct material cost of each unit produced',
      'Deducting overheads from revenue to arrive at the profit for the period',
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
      'Direct materials plus direct labour plus direct expenses',
      'The total of all costs the business incurs in the period',
      'The fixed costs of running the production facility',
      'The indirect production costs absorbed into each unit',
    ],
    ans: 0,
    exp: 'Prime cost is the sum of the three direct elements and deliberately excludes overheads. Adding absorbed production overhead to prime cost gives total production cost.' },

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
    opts: ['Fixed cost', 'Variable cost', 'Stepped cost', 'Indirect cost'],
    ans: 1,
    exp: 'A variable cost rises in total in direct proportion to output — for example raw materials, where double the output uses double the materials.' },


  { id: 'poc-046', topic: 'poc', difficulty: 'easy',
    q: 'Which cost is indirect?',
    opts: ['Materials', 'Factory rent', 'Direct labour', 'Sales commission'],
    ans: 1,
    exp: 'Factory rent benefits all output and cannot be traced to any one unit, making it an indirect cost. It is charged to production by apportionment and absorption rather than attaching directly, which is what separates it from direct materials or direct labour.' },

  { id: 'poc-047', topic: 'poc', difficulty: 'easy',
    q: 'Which cost is not affected by output changes?',
    opts: ['Variable cost', 'Fixed cost', 'Direct cost', 'Semi-variable cost'],
    ans: 1,
    exp: 'A fixed cost stays the same in total whatever the level of output, within the relevant range. Note the qualifier: fixed cost per unit falls as output rises, because the same total is spread more thinly. Confusing total with per-unit behaviour is the standard trap.' },

  { id: 'poc-048', topic: 'poc', difficulty: 'easy',
    q: 'Which cost remains unchanged within a relevant range of activity?',
    opts: ['Variable cost', 'Fixed cost', 'Direct cost', 'Semi-variable cost'],
    ans: 1,
    exp: 'A fixed cost is unchanged in total within the relevant range of activity. Outside that range it may step up or down, which is exactly what a stepped cost does — a fixed cost measured over a wider span of output.' },

  { id: 'poc-049', topic: 'poc', difficulty: 'easy',
    q: 'Which increases variable cost total?',
    opts: ['More output', 'Higher interest rates', 'Lower wages', 'Fixed rent'],
    ans: 0,
    exp: 'Total variable cost increases as more units are produced. Variable cost per unit, however, stays constant.' },

  { id: 'poc-050', topic: 'poc', difficulty: 'easy',
    q: 'Which is a fixed cost?',
    opts: ['Materials', 'Rent', 'Packaging', 'Sales commission'],
    ans: 1,
    exp: 'Rent is contracted for a period and does not move with output, making it fixed in total. Its per-unit effect is the opposite: the more units produced, the smaller the share of rent each one carries.' },

  { id: 'poc-051', topic: 'poc', difficulty: 'easy',
    q: 'Which is direct labour?',
    opts: [
      'A machine operator producing units on the factory production line',
      'A member of the human resources team handling staff recruitment',
      'A cleaner responsible for maintaining the factory and offices',
      'A production manager supervising the factory as a whole',
    ],
    ans: 0,
    exp: 'A machine operator works on the product itself, so their wages can be traced to units of output and are direct labour. Supervisors, cleaners and maintenance staff support production without being traceable to any one unit, making them indirect.' },

  { id: 'poc-052', topic: 'poc', difficulty: 'easy',
    q: 'Which is included in prime cost?',
    opts: [
      'Direct labour worked on the product being manufactured',
      'Production overheads absorbed into the cost of each unit',
      'The rent payable on the factory premises each quarter',
      'The insurance premium covering the business\'s buildings',
    ],
    ans: 0,
    exp: 'Direct labour is one of the three elements of prime cost, alongside direct materials and direct expenses. Rent, insurance and supervision are indirect and reach the product only through overhead absorption.' },

  { id: 'poc-053', topic: 'poc', difficulty: 'easy',
    q: 'Which is indirect labour?',
    opts: ['Assembly worker', 'Cleaner', 'Machine operator', 'Assembler'],
    ans: 1,
    exp: 'A cleaner supports production but cannot be traced to any particular unit, so the cost is indirect labour and forms part of production overhead. The test is always traceability to the cost unit, not how important the role is.' },

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


  { id: 'poc-079', topic: 'poc', difficulty: 'medium',
    q: 'What is the FIFO inventory assumption?',
    opts: ['Newest items are sold first', 'Oldest items are sold first', 'Cost is averaged', 'Items are selected randomly'],
    ans: 1,
    exp: 'FIFO assumes the earliest purchases are issued first, so closing inventory consists of the most recent buys. It is a costing assumption, not an instruction to the warehouse: the physical goods may move in any order.' },





  { id: 'poc-084', topic: 'poc', difficulty: 'medium',
    q: 'Which is a variable cost?',
    opts: [
      'The raw materials consumed in making the product',
      'The rent payable on the premises the business occupies',
      'The insurance premium covering the business\'s assets',
      'The depreciation charged on the business\'s equipment',
    ],
    ans: 0,
    exp: 'Raw materials are consumed in proportion to output, so the total rises with production while the cost per unit stays constant. Rent, insurance and depreciation are fixed in total and fall per unit as output rises.' },

  { id: 'poc-085', topic: 'poc', difficulty: 'medium',
    q: 'Which is NOT part of absorption costing?',
    opts: ['Overhead allocation', 'OAR calculation', 'Direct materials only', 'Overhead absorption'],
    ans: 2,
    exp: 'Absorption costing includes a fair share of production overhead in each unit alongside the direct costs. Charging direct materials alone would understate the cost of production and lead to prices set below true cost.' },

  { id: 'poc-086', topic: 'poc', difficulty: 'medium',
    q: 'Which method averages inventory cost?',
    opts: ['FIFO', 'AVCO', 'LIFO', 'Specific'],
    ans: 1,
    exp: 'AVCO (Average Cost) values inventory using a weighted average of all purchase prices, recalculated after each new purchase.' },

  { id: 'poc-087', topic: 'poc', difficulty: 'medium',
    q: 'Which method spreads overheads using activity levels?',
    opts: [
      'Absorption costing, which charges overheads to products via an absorption rate',
      'Allocation, which charges a whole overhead to the single cost centre that incurred all of it',
      'FIFO, which values closing inventory by assuming the oldest items are sold first',
      'AVCO, which values inventory using a weighted average unit cost',
    ],
    ans: 0,
    exp: 'Overheads are spread across products using a chosen activity base — typically labour hours, machine hours or units produced. Allocation comes earlier in the same process and charges a whole overhead to one centre rather than spreading it.' },

  { id: 'poc-088', topic: 'poc', difficulty: 'medium',
    q: 'Which method values closing inventory at most recent purchases?',
    opts: [
      'FIFO, which issues the oldest units first so the newest remain',
      'AVCO, which values every unit at a running weighted average',
      'LIFO, which issues the newest units first — not permitted under IAS 2',
      'Absorption costing, which charges a share of overhead to each unit',
    ],
    ans: 0,
    exp: 'FIFO assumes the earliest purchases are issued first, so whatever remains in closing inventory is the most recent — and in a rising market, the most expensive. AVCO gives a figure between the two; LIFO is prohibited by IAS 2; absorption costing is a method of charging overheads, not of valuing stock movements.' },

  { id: 'poc-089', topic: 'poc', difficulty: 'medium',
    q: 'Which of the following are recognised methods of inventory valuation?',
    opts: ['FIFO, LIFO and AVCO', 'PAYE, NIC and VAT', 'Fixed, variable and semi-variable', 'Direct, indirect and overhead'],
    ans: 0,
    exp: 'FIFO, LIFO and AVCO are the three classic inventory valuation methods, and the Level 2 syllabus requires all three. LIFO is examined for internal management accounting use only, because it is not permitted for financial reporting under IFRS or UK GAAP.' },


  { id: 'poc-091', topic: 'poc', difficulty: 'hard',
    q: 'A cost increases from £5,000 to £7,000 when output rises from 1,000 to 2,000 units. What type of cost is this?',
    opts: [
      'A semi-variable cost, with a fixed and a variable element',
      'A fixed cost, unchanged in total whatever the output level',
      'A variable cost, moving in direct proportion to output',
      'A stepped cost, fixed in total until output passes a threshold',
    ],
    ans: 0,
    exp: 'Both fixed and variable elements are present: a £2,000 increase for a 1,000-unit increase implies £2/unit variable cost, with the remainder fixed — a semi-variable cost.' },



  { id: 'poc-094', topic: 'poc', difficulty: 'hard',
    q: 'Fixed costs are £10,000; variable cost is £5 per unit; 2,000 units are produced. Total cost is:',
    opts: ['£10,000', '£20,000', '£10,005', '£15,000'],
    ans: 1,
    exp: 'Total cost = fixed + (variable per unit × units) = £10,000 + (£5 × 2,000) = £20,000. Note the per-unit figure: £20,000 ÷ 2,000 = £10, of which £5 is variable and £5 is the fixed cost spread across output.' },

  { id: 'poc-095', topic: 'poc', difficulty: 'hard',
    q: 'Fixed overheads absorbed are £12,000 and actual overheads are £11,200. What is the result?',
    opts: ['Under-absorption of £800', 'Over-absorption of £800', 'No difference', 'Profit reduction of £12,000'],
    ans: 1,
    exp: 'Absorbed £12,000 > actual £11,200, so overheads are over-absorbed by £800. The over-absorption is credited to the income statement.' },




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
    exp: 'Average cost per unit = total cost ÷ units = £50,000 ÷ 5,000 = £10. Be careful using this figure for decisions: it blends fixed and variable cost, so it changes with volume and is not the cost of making one more unit.' },

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
      'They must personally settle all of the company’s remaining debts if it fails',
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
      'Lower prices across the market and reduced profit margins',
      'Higher industry profits as volumes increase for everyone',
      'The immediate formation of a monopoly in the market',
      'No measurable change in the level of competition',
    ],
    ans: 0,
    exp: 'Competing on price alone drives prices down for all participants and compresses margins. It may force weaker firms out over time, but it does not create a monopoly immediately, and it plainly changes the competitive position.' },

  { id: 'besy-019', topic: 'besy', difficulty: 'easy',
    q: 'A primary economic objective of firms is often to:',
    opts: [
      'Maximise profit for the owners of the business',
      'Maximise the tax paid to central government',
      'Minimise the number of customers it serves',
      'Increase the amount of regulation it faces',
    ],
    ans: 0,
    exp: 'Profit maximisation is the standard assumption for a commercial firm, though real businesses also pursue growth, market share, survival and social objectives. Not-for-profit organisations pursue a purpose rather than a return to owners.' },

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
      'Offering its shares for sale to the general public',
      'Borrowing privately from its existing directors only',
      'Reducing the equity already held by its shareholders',
      'Increasing the wages it pays to its own employees',
    ],
    ans: 0,
    exp: 'The defining feature of a plc is that it may offer shares to the public, often through a stock-exchange listing. A private limited company cannot. Reducing equity and raising wages both take money out rather than raise it.' },

  { id: 'besy-022', topic: 'besy', difficulty: 'easy',
    q: 'A recession is typically characterised by:',
    opts: [
      'Negative economic growth over two consecutive quarters',
      'Gross domestic product rising steadily quarter on quarter',
      'Prices remaining broadly stable across the whole economy',
      'Unemployment falling to a historically low level',
    ],
    ans: 0,
    exp: 'The conventional definition is two consecutive quarters of falling GDP. One weak quarter is not a recession, and the label matters commercially because it shapes credit conditions, consumer confidence and government policy.' },

  { id: 'besy-023', topic: 'besy', difficulty: 'easy',
    q: 'A sole trader expanding may incorporate to:',
    opts: [
      'Gain limited liability, capping the owner\'s loss at what they invested',
      'Increase the owner’s personal exposure to the debts of the business',
      'Remove the requirement to charge VAT and account for it to HMRC',
      'Avoid the need to file any information at all on a public register',
    ],
    ans: 0,
    exp: 'Incorporating creates a company with separate legal personality, so the shareholder\'s loss is limited to what they paid or agreed to pay for their shares. VAT registration depends on turnover and is unaffected. The trade-off is the opposite of the last option: a company must file accounts publicly.' },

  { id: 'besy-024', topic: 'besy', difficulty: 'easy',
    q: 'A stakeholder with high power and high interest should be:',
    opts: [
      'Managed closely, with active engagement in decisions',
      'Monitored with minimum effort until their position changes',
      'Kept satisfied without involving them in day-to-day detail',
      'Kept informed of decisions but not consulted about them',
    ],
    ans: 0,
    exp: 'Mendelow\'s power–interest matrix places high-power, high-interest stakeholders in the manage-closely quadrant. High power with low interest means keep satisfied; low power with high interest means keep informed; low on both means monitor.' },

  { id: 'besy-025', topic: 'besy', difficulty: 'easy',
    q: 'A substitute good is one that:',
    opts: [
      'Can be used in place of another to satisfy the same need',
      'Must always be cheaper than the good it competes with',
      'Is consumed alongside another good rather than instead of it',
      'Has no demand of its own at any price level',
    ],
    ans: 0,
    exp: 'Substitutes satisfy the same want — tea and coffee, or rail and coach travel. Price is irrelevant to the definition. Goods consumed together are complements, and cross elasticity of demand between substitutes is positive.' },

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
      'An employee working within the organisation',
      'A customer who buys the organisation\'s products',
      'A supplier providing goods to the organisation',
      'A government department collecting its taxes',
    ],
    ans: 0,
    exp: 'Internal stakeholders are inside the organisation — employees, managers and directors. Customers, suppliers, lenders and government are all external, however closely they deal with the business.' },

  { id: 'besy-028', topic: 'besy', difficulty: 'easy',
    q: 'An implied term in a contract is one which:',
    opts: [
      'It is not expressly stated but is read into the contract by law or custom',
      'It is set out clearly in the written terms agreed between the parties',
      'It is always the subject of express negotiation between the parties',
      'It is recorded in the contract but has no legal effect on either party',
    ],
    ans: 0,
    exp: 'Implied terms are read into a contract without being stated, by statute, by custom in a trade, or by a court making the contract workable. They bind just as express terms do, and some cannot be excluded however the contract is worded.' },

  { id: 'besy-029', topic: 'besy', difficulty: 'easy',
    q: 'An increase in interest rates usually leads to:',
    opts: [
      'Lower borrowing and reduced consumer spending',
      'Higher borrowing as credit becomes more attractive',
      'An immediate and automatic rise in inflation',
      'No measurable effect on economic activity',
    ],
    ans: 0,
    exp: 'Raising rates makes borrowing dearer and saving more attractive, dampening demand. Because higher rates are the standard response to inflation, expecting them to raise it immediately reverses the causation.' },

  { id: 'besy-030', topic: 'besy', difficulty: 'easy',
    q: 'An oligopoly is characterised by:',
    opts: [
      'A small number of large firms dominating the market',
      'A single seller supplying the entire market',
      'A large number of small sellers with no market power',
      'An absence of any competition between the firms present',
    ],
    ans: 0,
    exp: 'An oligopoly is dominated by a few large firms — UK supermarkets and mobile networks are typical. One seller is a monopoly; many small sellers is perfect or monopolistic competition. Oligopolists compete intensely, often on factors other than price.' },

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
      'Increase total revenue, as demand falls proportionately less',
      'Decrease total revenue, as customers stop buying entirely',
      'Leave total revenue completely unchanged',
      'Eliminate demand for the product altogether',
    ],
    ans: 0,
    exp: 'Inelastic demand means quantity falls by proportionately less than price rises, so price × quantity increases. This is why necessities can be priced up. With elastic demand the reverse holds and revenue falls.' },

  { id: 'besy-035', topic: 'besy', difficulty: 'easy',
    q: 'In a general partnership, partners\' liability is:',
    opts: [
      'Unlimited — each partner is personally liable for the firm\'s debts',
      'Limited to the capital each partner originally introduced',
      'Limited to a fixed multiple of each partner\'s profit share',
      'Borne solely by whichever partner happened to incur the particular debt',
    ],
    ans: 0,
    exp: 'An ordinary partnership has no separate legal personality, so partners are jointly liable without limit and a creditor may pursue any one of them for the whole debt. Limiting liability requires incorporation as a company or an LLP.' },

  { id: 'besy-036', topic: 'besy', difficulty: 'easy',
    q: 'Income elasticity of demand measures:',
    opts: [
      'How demand responds to a change in consumer income',
      'How demand responds to a change in the good\'s own price',
      'How the quantity supplied responds to a change in price',
      'How demand responds to a change in the price of another good',
    ],
    ans: 0,
    exp: 'Income elasticity measures responsiveness to income. Responsiveness to the good\'s own price is price elasticity; responsiveness to another good\'s price is cross elasticity. Normal goods have positive income elasticity; inferior goods negative.' },

  { id: 'besy-037', topic: 'besy', difficulty: 'easy',
    q: 'Inflation is:',
    opts: [
      'A general and sustained rise in the level of prices',
      'A reduction in the rate of interest set by the Bank of England',
      'An increase in the proportion of the workforce out of work',
      'A reduction in the total value of goods imported into the country',
    ],
    ans: 0,
    exp: 'Inflation is a sustained rise in the general price level, not a one-off increase in a single product. Its practical effect is that money buys less over time, which is why holding cash through an inflationary period carries a real cost.' },

  { id: 'besy-038', topic: 'besy', difficulty: 'easy',
    q: 'Inflation reduces:',
    opts: [
      'The purchasing power of money held by the business',
      'The rate of interest set by the Bank of England',
      'The level of employment across the whole economy',
      'The volume of goods the country is able to export',
    ],
    ans: 0,
    exp: 'Inflation means each pound buys less than before, which is why holding cash through an inflationary period carries a real cost. Its effects on interest rates, employment and exports are indirect and not automatic.' },

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
      'Reduce consumer spending as borrowing becomes more expensive',
      'Reduce the cost of borrowing for both households and businesses',
      'Cause exports to rise immediately as the currency weakens',
      'Decrease the interest costs faced by businesses with loans',
    ],
    ans: 0,
    exp: 'Higher interest rates reduce consumers\' disposable income (via higher mortgage payments) and increase borrowing costs for businesses, both of which tend to reduce spending.' },

  { id: 'besy-042', topic: 'besy', difficulty: 'easy',
    q: 'Rising interest rates typically cause:',
    opts: [
      'Lower borrowing and a reduction in overall demand',
      'Higher borrowing and an increase in consumer spending',
      'An increase in exports with no other economic effect',
      'No change in the level of demand in the economy',
    ],
    ans: 0,
    exp: 'Higher rates raise the cost of credit and the return on saving, so borrowing-financed spending falls and demand weakens. Exchange rate effects on exports are indirect and not guaranteed.' },

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
      'Borrowing becomes cheaper for both households and for businesses',
      'Saving becomes less attractive relative to spending',
      'Exports cease because the currency becomes too strong',
    ],
    ans: 0,
    exp: 'When interest rates rise, the cost of borrowing for households (e.g. mortgages) and businesses (e.g. loans) increases.' },

  { id: 'besy-050', topic: 'besy', difficulty: 'easy',
    q: 'What is a barrier to entry?',
    opts: [
      'An obstacle that makes it difficult for new competitors to enter a market',
      'A wage level that is high when compared with others in the same industry',
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
      'A wage paid to the staff working in a franchised outlet',
      'A tax charged by HMRC on the profits of franchised businesses',
      'A loan advanced by a bank to fund the opening of a new outlet',
    ],
    ans: 0,
    exp: 'A franchise fee is paid by the franchisee to the franchisor for the right to use the brand and business model.' },

  { id: 'besy-054', topic: 'besy', difficulty: 'easy',
    q: 'What is a mission statement?',
    opts: [
      'A statement of the organisation\'s overall purpose and direction',
      'A report setting out the organisation’s annual financial results',
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
    opts: ['Liability for business debts is limited', 'Unlimited personal liability for business debts', 'Control over the business is shared out', 'A higher amount of start-up capital is required'],
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


  { id: 'besy-060', topic: 'besy', difficulty: 'easy',
    q: 'What is ethical behaviour?',
    opts: [
      'Acting honestly and with integrity, in the spirit as well as the letter of the law',
      'Complying with the bare minimum that the law requires and going no further than that',
      'Maximising profit for the business within whatever rules happen to apply',
      'Following the instructions of a senior colleague without questioning them',
    ],
    ans: 0,
    exp: 'Ethics goes beyond legal compliance: something can be lawful and still be wrong. Deferring to seniority is the opposite of objectivity, which requires that professional judgement is not overridden by others.' },

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
    exp: 'The UK GDPR and Data Protection Act 2018 govern how organisations collect, store, use and share personal data, and give individuals rights over it. Breaches must be assessed and, where serious, reported — concealing one makes the position considerably worse.' },

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
    exp: 'Price elasticity measures how much demand moves in response to a price change. Above 1 demand is elastic and a price rise cuts total revenue; below 1 it is inelastic and a price rise raises revenue. Necessities tend to be inelastic, luxuries elastic.' },

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
      'Only those customers who buy the goods or services that the business sells',
    ],
    ans: 0,
    exp: 'A stakeholder is any individual or group with an interest in the organisation — including shareholders, employees, customers, suppliers, lenders and the wider community.' },

  { id: 'besy-074', topic: 'besy', difficulty: 'easy',
    q: 'Which factors primarily affect supply?',
    opts: [
      'Production costs and the productivity of the resources used',
      'The selling price of the product and nothing else',
      'The level of demand shown by consumers for the product',
      'The tastes and preferences of consumers in the market',
    ],
    ans: 0,
    exp: 'Supply depends primarily on production costs, the productivity of inputs and the prices of related inputs. Consumer demand and tastes shape the demand curve, not the supply curve — and price alone is not the whole story on either side.' },

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
    exp: 'Unemployment reduces household income and dents confidence even among those still in work, so spending falls across the economy. Businesses selling discretionary goods feel it first; those selling essentials are more insulated.' },

  { id: 'besy-078', topic: 'besy', difficulty: 'easy',
    q: 'What is unlimited liability?',
    opts: [
      'The owner is personally responsible for the debts of the business',
      'The business is not permitted to take on any form of debt finance',
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
    q: 'Which of these stakeholders is external to the business?',
    opts: [
      'A supplier providing goods to the business',
      'An employee working in the finance department',
      'A member of the board of directors',
      'A departmental manager within the organisation',
    ],
    ans: 0,
    exp: 'External stakeholders sit outside the organisation — suppliers, customers, lenders, government, the local community. Employees, managers and directors are all internal, whatever their level.' },

  { id: 'besy-086', topic: 'besy', difficulty: 'easy',
    q: 'Which stakeholder is primarily concerned with profit distribution?',
    opts: ['Government', 'Shareholders', 'Customers', 'Suppliers'],
    ans: 1,
    exp: 'Shareholders provide the capital and bear the residual risk, so their return comes from dividends and growth in the value of their shares. Employees are concerned with pay and security, lenders with being repaid, and customers with price and quality.' },


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
    opts: ['Private cost only', 'Benefit to third parties', 'Higher taxes only', 'Reduced supply, and nothing else'],
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
      'Using a dominant market position to exclude smaller competitors',
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
      const dm = window._QH.rs(2000, 9000, 250);
      const dl = window._QH.rs(2000, 9000, 250);
      const de = window._QH.rs(200, 1000, 100);
      const ans = dm + dl + de;
      return {
        q: 'Direct materials cost £' + window._QH.fmt(dm) + ', direct labour £' + window._QH.fmt(dl) + ' and direct expenses £' + window._QH.fmt(de) + '. What is the prime cost?',
        answer: ans,
        steps: [
          'Prime cost = direct materials + direct labour + direct expenses.',
          'Prime cost = £' + window._QH.fmt(dm) + ' + £' + window._QH.fmt(dl) + ' + £' + window._QH.fmt(de) + ' = £' + window._QH.fmt(ans) + '.',
          'The prime cost is £' + window._QH.fmt(ans) + '.'
        ],
        exp: 'Prime cost is the total of the DIRECT costs only: £' + window._QH.fmt(dm) + ' + £' + window._QH.fmt(dl) + ' + £' + window._QH.fmt(de) + ' = £' + window._QH.fmt(ans) + '. Overheads join later, to make production cost.'
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

  { id: 'poc-num-007', topic: 'poc', difficulty: 'medium', type: 'numeric', unit: '£',
    generate: function () {
      const rate = window._QH.pick([10, 12, 14, 16]);
      const basicH = window._QH.r(35, 40);
      const otH = window._QH.r(2, 10);
      const ans = basicH * rate + otH * rate * 1.5;
      return {
        q: 'An employee is paid £' + rate + ' per hour for a basic ' + basicH + '-hour week, with overtime at time-and-a-half. This week they worked ' + (basicH + otH) + ' hours. What is their gross pay for the week?',
        answer: ans,
        steps: [
          'Basic pay = ' + basicH + ' × £' + rate + ' = £' + window._QH.fmt(basicH * rate) + '.',
          'Overtime = ' + otH + ' hours at £' + (rate * 1.5) + ' (time-and-a-half) = £' + window._QH.fmt(otH * rate * 1.5) + '.',
          'Gross pay = £' + window._QH.fmt(basicH * rate) + ' + £' + window._QH.fmt(otH * rate * 1.5) + ' = £' + window._QH.fmt(ans) + '.'
        ],
        exp: 'Basic pay is ' + basicH + ' × £' + rate + ' = £' + window._QH.fmt(basicH * rate) + ', and the ' + otH + ' overtime hours are paid at time-and-a-half, £' + (rate * 1.5) + ' each, adding £' + window._QH.fmt(otH * rate * 1.5) + '. Gross pay is £' + window._QH.fmt(ans) + '.'
      };
    } },

  { id: 'poc-num-008', topic: 'poc', difficulty: 'hard', type: 'numeric', unit: '£',
    generate: function () {
      const oar = window._QH.pick([4, 5, 6, 8, 10]);
      const actH = window._QH.rs(8000, 15000, 500);
      const absorbed = oar * actH;
      const diff = window._QH.rs(2000, 12000, 500);
      const actual = absorbed - diff;
      return {
        q: 'Overheads are absorbed at £' + oar + ' per labour hour. Actual labour hours were ' + window._QH.fmt(actH) + ' and actual overheads came to £' + window._QH.fmt(actual) + '. By how much are overheads over-absorbed?',
        answer: diff,
        steps: [
          'Overheads absorbed = ' + window._QH.fmt(actH) + ' hours × £' + oar + ' = £' + window._QH.fmt(absorbed) + '.',
          'Over-absorption = absorbed − actual = £' + window._QH.fmt(absorbed) + ' − £' + window._QH.fmt(actual) + ' = £' + window._QH.fmt(diff) + '.',
          'Overheads are over-absorbed by £' + window._QH.fmt(diff) + '.'
        ],
        exp: 'Absorbed overhead is the actual hours at the predetermined rate: ' + window._QH.fmt(actH) + ' × £' + oar + ' = £' + window._QH.fmt(absorbed) + '. Actual overheads were £' + window._QH.fmt(actual) + ', so £' + window._QH.fmt(diff) + ' more was charged into production than was really spent — an over-absorption, credited back in the costing records.'
      };
    } },

  { id: 'poc-num-009', topic: 'poc', difficulty: 'hard', type: 'numeric',
    generate: function () {
      const r1 = window._QH.pick([2, 3, 4]);
      const r2 = r1 + 1;
      const n1 = window._QH.rs(100, 200, 25);
      const extra = window._QH.rs(20, 80, 10);
      const total = n1 + extra;
      const ans = n1 * r1 + extra * r2;
      return {
        q: 'A differential piecework scheme pays £' + r1 + ' per unit for the first ' + n1 + ' units in a week and £' + r2 + ' per unit above that. An employee produces ' + total + ' units. What is their gross pay?',
        answer: ans,
        steps: [
          'First ' + n1 + ' units at £' + r1 + ' = £' + window._QH.fmt(n1 * r1) + '.',
          'Remaining ' + extra + ' units at £' + r2 + ' = £' + window._QH.fmt(extra * r2) + '.',
          'Gross pay = £' + window._QH.fmt(n1 * r1) + ' + £' + window._QH.fmt(extra * r2) + ' = £' + window._QH.fmt(ans) + '.'
        ],
        exp: 'Differential piecework pays each band at its own rate — the higher rate applies only to the units ABOVE the band boundary, not to all of them. £' + window._QH.fmt(n1 * r1) + ' for the first ' + n1 + ' units plus £' + window._QH.fmt(extra * r2) + ' for the ' + extra + ' above gives £' + window._QH.fmt(ans) + '.'
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
    exp: 'All four leave the trial balance in balance, so none can be found by checking that the totals agree. Each needs a different check: reconciliation, a review of the source document, or a second person reading the posting.' },

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
      { left: 'Prime cost', right: 'Direct materials + direct labour + direct expenses' },
      { left: 'Overhead absorption rate', right: 'Budgeted overhead ÷ budgeted activity level' },
      { left: 'Cost per unit', right: 'Total cost ÷ number of units' },
      { left: 'Variance as a percentage', right: 'Variance ÷ budgeted figure × 100' },
    ],
    exp: 'Four formulas that between them carry most of the calculation marks in Principles of Costing. Note that cost per unit divides the total by the units — adding the per-unit rates together instead misses the fixed cost per unit entirely.' },

  { id: 'dd-007', topic: 'besy', difficulty: 'easy', type: 'dragdrop',
    q: 'Match each business structure to its liability characteristic.',
    pairs: [
      { left: 'Sole trader', right: 'Unlimited personal liability' },
      { left: 'General partnership', right: 'Joint and several unlimited liability for partners' },
      { left: 'Private limited company (Ltd)', right: 'Limited liability — shares not offered to the public' },
      { left: 'Public limited company (PLC)', right: 'Limited liability — shares may be offered to the public' },
    ],
    exp: 'Incorporation creates a separate legal entity and limits the owners’ liability to the amount paid (or agreed to be paid) for shares.' },


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
    exp: 'Total Dr = 12,000 + 58,000 = 70,000. The credit side must total the same, so the closing balance is 70,000 − 45,000 − 2,000 = 23,000.' },

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
    exp: 'Total Cr = 15,000 + 44,000 = 59,000. The debit side must total the same, so the closing balance is 59,000 − 38,000 − 1,500 = 19,500.' },

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
    exp: 'Cost of goods sold is opening inventory plus purchases less closing inventory: 8,000 + 42,000 − 6,000 = 44,000. Only stock that has actually left the business is a cost of this period; what remains on the shelf is an asset.' },

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


  /* === SCENARIO-BASED MULTI-PART QUESTIONS === */
  { id: 'sc-001', topic: 'itbk', difficulty: 'medium', type: 'scenario',
    setup: 'Bright Sparks Ltd is a small lighting wholesaler registered for VAT. On 1 May it sells goods on credit to Helios Decor for £800 plus VAT at 20%. Helios pays on 28 May. Bright Sparks pays its supplier, Aurora Cables, £1,200 owing from an earlier invoice on 30 May.',
    parts: [
      { type: 'mcq', q: 'What is the correct double entry for the sale to Helios Decor on 1 May (gross)?',
        opts: ['Dr Trade Receivables £960, Cr Sales £800, Cr VAT £160', 'Dr Trade Receivables £800, Cr Sales £800, with no VAT entry', 'Dr Bank £960, Cr Sales £800, Cr VAT £160 on the date of sale', 'Dr Sales £800, Dr VAT £160, Cr Trade Receivables £960'],
        ans: 0, exp: 'The customer owes the gross amount, so £800 × 1.20 = £960 is debited to trade receivables. That splits into £800 of income and £160 of VAT the business is collecting for HMRC — hence two credits against one debit.' },
      { type: 'numeric', q: 'What VAT amount is charged on the sale to Helios Decor?', answer: 160, unit: '£', exp: 'VAT at the standard rate is charged on the net amount: £800 × 20% = £160. At this level VAT is always added to a net figure, never extracted from a gross one.' },
      { type: 'mcq', q: 'What is the double entry to record the payment from Helios Decor on 28 May?',
        opts: ['Dr Bank £960, Cr Trade Receivables £960', 'Dr Sales £960, Cr Bank £960', 'Dr Trade Receivables £960, Cr Bank £960', 'Dr Bank £800, Cr Sales £800'],
        ans: 0, exp: 'Dr Bank and Cr Trade Receivables for the full £960. No VAT is recorded again — it was accounted for when the invoice was raised, and this receipt only converts a receivable into cash.' },
      { type: 'mcq', q: 'What is the double entry to record the payment to Aurora Cables on 30 May?',
        opts: ['Dr Bank, Cr Trade Payables', 'Dr Trade Payables, Cr Bank', 'Dr Purchases, Cr Bank', 'Dr Trade Payables, Cr Purchases'],
        ans: 1, exp: 'Paying a supplier reduces the liability and the bank balance: Dr Trade Payables £1,200, Cr Bank £1,200.' },
    ],
    exp: 'A full sales/receipt/payment cycle with VAT — covers credit sales, output tax, receipt and supplier payment.' },


  { id: 'sc-003', topic: 'pobc', difficulty: 'medium', type: 'scenario',
    setup: 'Pinewood Ltd prepares its bank reconciliation at 31 March. The cash book shows a debit balance of £4,200. The bank statement at the same date shows £3,500. On investigation: unpresented cheques total £900; outstanding lodgements total £1,200; bank charges of £40 appear on the statement but are not in the cash book; a direct debit of £160 also appears on the statement but is missing from the cash book.',
    parts: [
      { type: 'mcq', q: 'How should the bank charges of £40 be treated?',
        opts: ['Enter them as a payment in the cash book, crediting the cash book', 'Enter them as a receipt in the cash book, debiting the cash book', 'Adjust the bank statement balance rather than the cash book', 'Leave them out until the charges appear on the next statement'],
        ans: 0, exp: 'Bank charges reduce the cash book balance — enter as a payment to bring the cash book up to date.' },
      { type: 'numeric', q: 'After updating the cash book for the bank charges and the direct debit, what is the new cash book balance?',
        answer: 4000, unit: '£', exp: 'Bank charges and the direct debit are genuine transactions the bank has processed and the business has not recorded, so both are entered: 4,200 − 40 − 160 = £4,000. These are corrections, unlike timing differences.' },
      { type: 'numeric', q: 'Using the updated cash book balance, what is the bank statement balance reconciled to (cash book + unpresented − outstanding lodgements)?',
        answer: 3700, unit: '£', exp: 'From the corrected cash book, add the outstanding lodgement the bank has not credited and deduct the cheques not yet presented: 4,000 + 900 − 1,200 = £3,700. Timing differences need no entry — they clear themselves.' },
      { type: 'mcq', q: 'The reconciled figure £3,700 does not match the actual statement balance of £3,500. What is the most likely reason?',
        opts: ['Another timing difference or error remains', 'The cash book is correct and the bank is wrong', 'Bank charges are double-counted', 'The reconciliation is complete'],
        ans: 0, exp: 'Every difference between the two records has a cause, so £200 left unexplained means an item is missing or mis-recorded. The right response is to investigate it, never to adjust a figure until the two agree.' },
    ],
    exp: 'A full bank-reconciliation workflow — update the cash book, then reconcile to the statement via timing differences.' },

  { id: 'sc-004', topic: 'besy', difficulty: 'medium', type: 'scenario',
    setup: 'Helen runs a small bakery as a sole trader. The business is growing and she is considering incorporating as a private limited company (Ltd). She also exports to Ireland and is concerned about exchange-rate movements between £ and €.',
    parts: [
      { type: 'mcq', q: 'A defining feature of Helen’s current sole-trader status is:',
        opts: ['Unlimited personal liability for the debts the business incurs', 'Limited liability, capping any loss at the amount she has invested', 'A separate legal personality, distinct from Helen as an individual', 'A requirement to file annual accounts publicly at Companies House'],
        ans: 0, exp: 'Sole traders have unlimited personal liability — there is no legal separation between owner and business.' },
      { type: 'mcq', q: 'A key advantage of incorporating as a Ltd company would be:',
        opts: ['Limited liability, so personal assets are protected from business debts', 'A lower rate of tax charged on every pound of profit that the business earns', 'Freedom from any obligation to prepare and file annual accounts', 'The right to offer shares for sale to the general public'],
        ans: 0, exp: 'Incorporation creates a separate legal entity and limits Helen’s liability to the capital she invested.' },
      { type: 'mcq', q: 'If the £ strengthens against the €, Helen’s exports to Ireland will become:',
        opts: ['More expensive in euro terms, because each euro now buys fewer pounds', 'Cheaper in euro terms, because each euro now buys more pounds', 'Unchanged in price, because exchange rates do not affect export prices', 'Exempt from VAT, because the goods are being sold outside the UK'],
        ans: 0, exp: 'A stronger £ means each £ buys more €, so the £-priced goods cost more euros — exports become less competitive.' },
      { type: 'numeric', q: 'Helen invoices €5,400. At the spot rate £1 = €1.20, what does she expect to receive in £?',
        answer: 4500, unit: '£', exp: 'Divide by the rate when converting from the foreign currency into pounds: €5,400 ÷ 1.20 = £4,500. Multiplying instead would give €6,480 — checking that the answer is smaller than the euro figure catches the slip.' },
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
    exp: 'Assets = Capital + Liabilities. Read it as what the business has on one side and where it came from on the other — the owner, or outsiders it owes. Rearranged, Capital = Assets − Liabilities gives the owner’s stake.' },

  { id: 'gf-004', topic: 'itbk', difficulty: 'medium', type: 'gapfill',
    q: 'Complete the statements about the analysed cash book.',
    template: 'The cash and bank columns hold the full amount that moved, and the analysis columns {0} that amount. VAT is analysed on {1}.',
    gaps: [
      { options: ['break down', 'add to', 'double', 'replace'], answer: 0 },
      { options: ['a cash sale', 'a receipt settling a sales invoice', 'every receipt that is banked', 'a payment of wages'], answer: 0 },
    ],
    exp: 'Analysis columns split an amount rather than adding to it, so each row must add across to the figure in its cash or bank column. VAT is analysed on a cash sale, because the sale was never invoiced; a receipt settling an invoice carries no VAT here, because the output tax went into the sales day book when the invoice was raised.' },

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
    template: 'An overhead absorption rate is budgeted overhead divided by {0}. The full production cost of one unit is prime cost plus {1}.',
    gaps: [
      { options: ['the budgeted activity level', 'the actual activity level', 'total sales revenue', 'the number of cost centres'], answer: 0 },
      { options: ['absorbed production overhead', 'all administrative overhead', 'the selling price of the unit', 'the closing inventory value'], answer: 0 },
    ],
    exp: 'The rate is set from budgeted figures before the period starts, which is what lets a cost be quoted while the work is still being planned. Prime cost is the direct costs; adding the absorbed production overhead gives the full production cost, and non-production overheads stay out of it.' },

  { id: 'gf-009', topic: 'poc', difficulty: 'easy', type: 'gapfill',
    q: 'Complete the statement about fixed cost behaviour.',
    template: 'As output increases, total fixed cost stays {0}, while fixed cost per unit {1}.',
    gaps: [
      { options: ['constant', 'variable', 'higher', 'lower'], answer: 0 },
      { options: ['falls', 'rises', 'stays constant', 'doubles'], answer: 0 },
    ],
    exp: 'Total fixed cost is unchanged within the relevant range; spread over more units, fixed cost per unit falls.' },

  { id: 'gf-010', topic: 'poc', difficulty: 'medium', type: 'gapfill',
    q: 'Complete the statements about reporting variances.',
    template: 'A variance is expressed as a percentage by dividing it by {0}. Under exception reporting, only variances above a threshold set by {1} are reported.',
    gaps: [
      { options: ['the budgeted figure', 'the actual figure', 'the total cost', 'the previous period'], answer: 0 },
      { options: ['the organisation’s own policy', 'the accountant on the day', 'the external auditor', 'the budget holder concerned'], answer: 0 },
    ],
    exp: 'The denominator is always the budget, because the budget is the standard being measured against. And the threshold comes from the organisation’s policy rather than from judgement on the day, which is what makes an exception report consistent from month to month.' },

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
    exp: 'Every transaction changes two accounts by the same amount, one debit and one credit. Work out which account gains value and which gives it up, and the entry follows — the debit is never chosen first and the credit fitted around it.' },

  { id: 'dd-010', topic: 'itbk', difficulty: 'medium', type: 'dragdrop',
    q: 'Match each book of prime entry to what it records.',
    pairs: [
      { left: 'Sales day book', right: 'Credit sales invoices' },
      { left: 'Purchases day book', right: 'Credit purchase invoices' },
      { left: 'Cash book', right: 'Bank and cash receipts and payments' },
      { left: 'Journal', right: 'Non-routine adjustments and corrections' },
    ],
    exp: 'Books of prime entry are where transactions are first recorded before posting to the ledger.' },


  { id: 'dd-012', topic: 'itbk', difficulty: 'easy', type: 'dragdrop',
    q: 'Match each item to the category it belongs to when a bookkeeping system is set up.',
    pairs: [
      { left: 'Motor vehicle', right: 'Asset' },
      { left: 'Trade payables', right: 'Liability' },
      { left: 'Owner’s capital', right: 'Equity' },
      { left: 'Rent paid', right: 'Expense' },
    ],
    exp: 'Five categories cover every account: assets, liabilities, equity, income and expenses. Getting the category right is what decides which side of the ledger a balance sits on, and therefore which column of the trial balance it goes into.' },

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
    exp: 'Each control answers one risk. Segregation of duties stops one person both making and concealing an error; authorisation limits stop unapproved spending; reconciliations catch omissions and duplicates; and physical controls protect assets from theft.' },

  { id: 'dd-016', topic: 'poc', difficulty: 'medium', type: 'dragdrop',
    q: 'Match each cost to whether it is direct or indirect for a furniture manufacturer.',
    pairs: [
      { left: 'Wood used in a table', right: 'Direct cost' },
      { left: 'Wages of the table assembler', right: 'Direct cost' },
      { left: 'Factory rent', right: 'Indirect cost' },
      { left: "Factory supervisor's salary", right: 'Indirect cost' },
    ],
    exp: 'A direct cost can be traced to one unit of output — the timber in a particular table. An indirect cost cannot, even when it is plainly caused by production: factory rent and the supervisor’s salary are incurred whatever number of tables is made.' },

  { id: 'dd-017', topic: 'poc', difficulty: 'medium', type: 'dragdrop',
    q: 'Match each inventory valuation method to its assumption.',
    pairs: [
      { left: 'FIFO', right: 'Oldest items are issued first' },
      { left: 'AVCO', right: 'Issues are valued at a weighted average cost' },
      { left: 'LIFO', right: 'Newest items issued first (not permitted under UK GAAP)' },
      { left: 'Standard cost', right: 'A predetermined cost is used for all issues' },
    ],
    exp: 'FIFO issues the oldest stock first, so closing inventory is valued at the most recent prices. AVCO recalculates a weighted average after each receipt. LIFO issues the newest first and is not permitted under UK GAAP or IFRS.' },

  { id: 'dd-018', topic: 'besy', difficulty: 'medium', type: 'dragdrop',
    q: 'Match each market structure to its key feature.',
    pairs: [
      { left: 'Perfect competition', right: 'Many firms, identical products, price takers' },
      { left: 'Monopolistic competition', right: 'Many firms with differentiated products' },
      { left: 'Oligopoly', right: 'A few large firms dominate the market' },
      { left: 'Monopoly', right: 'A single dominant supplier with price-setting power' },
    ],
    exp: 'The number of suppliers decides who sets the price. Under perfect competition each firm is too small to influence it and must take the market price; a monopoly faces no competitor and sets its own; oligopoly and monopolistic competition sit between the two.' },

  { id: 'dd-019', topic: 'besy', difficulty: 'easy', type: 'dragdrop',
    q: 'Match each stakeholder to their main interest in a business.',
    pairs: [
      { left: 'Shareholders', right: 'Dividends and growth in share value' },
      { left: 'Employees', right: 'Job security, pay and working conditions' },
      { left: 'Suppliers', right: 'Being paid on time and repeat orders' },
      { left: 'Government / HMRC', right: 'Correct payment of taxes and compliance with law' },
    ],
    exp: 'Each group wants something different from the same business: owners want return, employees want pay and security, suppliers want to be paid on time, customers want value, and lenders want evidence the debt can be serviced.' },

  { id: 'dd-020', topic: 'besy', difficulty: 'medium', type: 'dragdrop',
    q: 'Match each economic change to its likely effect on a UK business.',
    pairs: [
      { left: 'Interest rates rise', right: 'Borrowing costs increase; consumer spending tends to fall' },
      { left: 'The pound weakens', right: 'Exports become cheaper abroad; imports cost more' },
      { left: 'Inflation rises', right: 'Input costs and wages tend to rise; purchasing power falls' },
      { left: 'Economy enters recession', right: 'Demand falls as incomes and confidence drop' },
    ],
    exp: 'None of these is under the business’s control, and each transmits differently: a rate rise raises borrowing costs, inflation raises input prices, a weaker pound raises import costs while helping exporters, and recession reduces demand.' }
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
    exp: 'Take the trade discount off first: 2,000 − 200 = 1,800 net. VAT is then charged on what the customer is actually being charged, so 1,800 × 20% = 360, giving 2,160 total. Calculating VAT before the discount overstates both figures.' },


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
    exp: 'Output tax charged on sales less input tax reclaimed on purchases leaves what is owed: 11,200 − 6,400 = 4,800. It is a credit balance because the business is holding HMRC’s money, not its own.' },

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
    exp: 'Work from the statement to the cash book: 3,500 + 1,800 outstanding lodgement − 900 unpresented cheques = 4,400. Both adjustments are timing differences the bank has not yet processed, not errors in either record.' },

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
    exp: 'The absorption rate is set from the budget: 90,000 ÷ 18,000 = £5 per hour. Overhead absorbed then uses the ACTUAL hours worked: £5 × 17,000 = £85,000. Mixing budgeted rate with budgeted hours is the usual error.' },


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
    exp: 'FIFO issues the oldest stock first, so the 250 units come from the 100 at £4 and then 150 of the £5 batch: 400 + 750 = £1,150. The 50 units left are the newest, valued at £5 each, so closing inventory is £250.' },

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
    exp: 'Gross pay is hours times rate: 38 × £12 = £456. The inflation rate is the change in the index over the base: (104 − 100) ÷ 100 = 4%. Note the index measures the change in prices, not the price level itself.' }
);


/* ── EXPANDED CONTENT: additional scenario questions (ITBK / POBC) ── */
window.ALL_QUESTIONS.push(
  { id: 'sc-005', topic: 'itbk', difficulty: 'medium', type: 'scenario',
    setup: 'Maple Joinery is a sole trader. During March it buys timber on credit from Forest Supplies for £600 plus VAT at 20%. It later returns £100 (net) of damaged timber. Maple Joinery is registered for VAT.',
    parts: [
      { type: 'numeric', q: 'What is the total (gross) amount of the original credit purchase invoice?', answer: 720, unit: '£', exp: 'Add VAT to the net figure: £600 + £120 = £720. The gross amount is what the supplier is owed, and it is the figure that goes to the total column of the purchases day book.' },
      { type: 'mcq', q: 'In which book of prime entry is the original purchase invoice recorded?',
        opts: ['Sales day book', 'Purchases day book', 'Cash book', 'Purchases returns day book'],
        ans: 1, exp: 'A purchase invoice received on credit goes in the purchases day book. The name follows the original transaction and who issued the document — anything received from a supplier belongs to the purchases pair of daybooks.' },
      { type: 'mcq', q: 'When the damaged timber is returned, Forest Supplies issues a credit note. Where does Maple Joinery record it?',
        opts: ['The purchases returns day book, because the credit note came from a supplier', 'The sales returns day book, because the goods themselves were physically returned', 'The cash book, because the credit note reduces the amount to be paid', 'The journal, because credit notes are non-routine adjusting entries'],
        ans: 0, exp: 'A credit note received from a supplier goes in the purchases returns day book. Ask who issued the credit note: one we received is a purchases return, one we issued to a customer is a sales return.' },
      { type: 'numeric', q: 'What is the gross value of the credit note for the £100 net return?', answer: 120, unit: '£', exp: 'The credit note reverses part of the invoice, so it carries VAT on the same basis: £100 + £20 = £120 gross. Returning goods reduces the VAT originally charged as well as the net amount.' },
    ],
    exp: 'A credit purchase with VAT, followed by a returns adjustment — covering day books and VAT-inclusive amounts.' },


  { id: 'sc-007', topic: 'itbk', difficulty: 'medium', type: 'scenario',
    setup: 'Crafty Pots started trading on 1 January when the owner paid £20,000 into the business bank account. During the year the business made a profit of £14,000 and the owner took drawings of £9,000.',
    parts: [
      { type: 'mcq', q: 'What is the double entry for the owner paying £20,000 into the business?',
        opts: ['Dr Capital, Cr Bank', 'Dr Bank, Cr Capital', 'Dr Bank, Cr Sales', 'Dr Drawings, Cr Bank'],
        ans: 1, exp: 'Capital introduced increases the bank balance (Dr Bank) and the owner\'s capital (Cr Capital).' },
      { type: 'mcq', q: 'How are the owner\'s drawings of £9,000 classified?',
        opts: ['A reduction in the capital the owner has invested in the business', 'A business expense charged against the reported profit for the period', 'Revenue of the business earned during the accounting period', 'A liability owed by the business to an external third party'],
        ans: 0, exp: 'Drawings are the owner taking value out of the business for personal use, not a cost of trading, so they never appear in profit or loss. They reduce capital, which is what the business owes back to the owner.' },
      { type: 'numeric', q: 'What is the closing capital at the end of the year?', answer: 25000, unit: '£', exp: 'Opening capital plus profit less drawings: 20,000 + 14,000 − 9,000 = £25,000. Profit belongs to the owner so it increases capital; drawings take it out again, which is why neither touches the expense figures.' },
    ],
    exp: 'The capital account: capital introduced, profit and drawings combine to give closing capital.' },

  { id: 'sc-008', topic: 'pobc', difficulty: 'hard', type: 'scenario',
    setup: 'Oakfield Ltd extracted a trial balance that did not balance: the debit column totalled £248,600 and the credit column totalled £247,900. A suspense account was opened. On investigation, a £700 payment for rent had been debited to the rent account but not credited to the bank account.',
    parts: [
      { type: 'numeric', q: 'What is the value of the difference placed in the suspense account?', answer: 700, unit: '£', exp: 'The suspense account holds the difference until it is found: £248,600 − £247,900 = £700. Only errors that unbalance the trial balance produce a suspense entry; the ones that leave it balanced never show up here.' },
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
      { type: 'numeric', q: 'What is the employee\'s net pay for April?', answer: 2030, unit: '£', exp: 'Net pay is gross less the employee’s own deductions: 2,800 − 420 PAYE − 210 employee NIC − 140 pension = £2,030. Employer NIC is never deducted from the employee, so it is not in this calculation.' },
      { type: 'numeric', q: 'What is the total cost of employing this person for April?', answer: 3060, unit: '£', exp: 'The cost to the employer is gross pay plus the employer’s own contributions: £2,800 + £260 = £3,060. Employee deductions are not an extra cost — they are part of the gross pay, just paid to HMRC instead of to the employee.' },
      { type: 'mcq', q: 'Which document is the source record supporting the payroll journal entries?',
        opts: ['Sales invoice', 'Payslip', 'Remittance advice', 'Purchase order'],
        ans: 1, exp: 'The payslip is the source document: it evidences gross pay, each deduction and net pay, which is exactly what the payroll journal needs. Bank records show only the net amount that left the account.' },
    ],
    exp: 'Payroll: distinguishing net pay (to the employee) from total employment cost (to the employer).' },

  { id: 'sc-010', topic: 'pobc', difficulty: 'medium', type: 'scenario',
    setup: 'Harbour Supplies keeps a purchases ledger control account. On 1 May the balance was £18,000 Cr. During May: credit purchases were £47,000, payments to suppliers were £41,000, purchases returns were £1,300, and a contra of £700 was made against the sales ledger.',
    parts: [
      { type: 'numeric', q: 'What is the closing balance on the purchases ledger control account at 31 May?', answer: 22000, unit: '£', exp: 'Start with what was owed, add credit purchases, then deduct everything that reduces the debt: 18,000 + 47,000 − 41,000 payments − 1,300 returns − 700 contra = £22,000. It is a credit balance because the business owes it.' },
      { type: 'mcq', q: 'What should the closing PLCA balance agree with?',
        opts: ['The total of the individual supplier balances in the purchases ledger', 'The balance shown on the bank statement at the end of the month', 'The net VAT figure reported to HMRC on the quarterly return', 'The total of the individual customer balances in the sales ledger'],
        ans: 0, exp: 'The PLCA is a summary account — it must agree with the total of the individual supplier balances.' },
      { type: 'mcq', q: 'The contra entry of £700 means:',
        opts: ['Amounts owed to and by the same business have been set off against each other', 'A customer was overpaid and the excess has since been refunded back to them', 'A supplier issued a cash refund for goods that had been returned as faulty', 'VAT on the month’s purchases has been reclaimed from HMRC'],
        ans: 0, exp: 'A contra offsets a balance where the same business is both a customer and a supplier — Dr PLCA, Cr SLCA.' },
    ],
    exp: 'Reconstructing a control account balance and understanding what it should agree with.' }
);


/* ── EXPANDED CONTENT: additional scenario questions (POC / BESY) ── */
window.ALL_QUESTIONS.push(

  { id: 'sc-012', topic: 'poc', difficulty: 'hard', type: 'scenario',
    setup: 'Delta Manufacturing absorbs production overheads on a labour-hour basis. Budgeted overheads were £150,000 and budgeted labour hours were 30,000. In the period, actual overheads were £148,000 and 29,000 labour hours were actually worked.',
    parts: [
      { type: 'numeric', q: 'What is the overhead absorption rate per labour hour?', answer: 5, unit: '£', exp: 'The absorption rate is set in advance from budgeted figures: £150,000 ÷ 30,000 = £5 per hour. It has to be budgeted, because a price has to be quoted before the actual overhead for the period is known.' },
      { type: 'numeric', q: 'How much overhead was absorbed into production in the period?', answer: 145000, unit: '£', exp: 'Overhead absorbed is the budgeted rate applied to the actual hours worked: £5 × 29,000 = £145,000. The rate stays as budgeted; only the activity level is actual.' },
      { type: 'mcq', q: 'Comparing absorbed (£145,000) with actual (£148,000), the overheads are:',
        opts: ['Over-absorbed by £3,000', 'Under-absorbed by £3,000', 'Correctly absorbed', 'Over-absorbed by £5,000'],
        ans: 1, exp: 'Actual overhead of £148,000 exceeds the £145,000 charged to production, so £3,000 of real cost has not been recovered — under-absorption. Absorbing more than was actually incurred would be over-absorption.' },
      { type: 'mcq', q: 'How is the under-absorption treated?',
        opts: ['Credited to the income statement, increasing profit', 'Debited to the income statement, reducing profit', 'Added to closing inventory', 'Ignored'],
        ans: 1, exp: 'Under-absorption means production was charged less overhead than was actually spent, so the shortfall is debited to profit or loss as an extra cost. Over-absorption is credited back for the same reason in reverse.' },
    ],
    exp: 'Overhead absorption end to end: OAR, overhead absorbed, and the under/over-absorption adjustment.' },

  { id: 'sc-013', topic: 'poc', difficulty: 'medium', type: 'scenario',
    setup: 'Greenleaf Ltd is costing a job before quoting for it. The job needs direct materials of £1,200 and direct labour of £800. Production overheads are absorbed at 50% of direct labour cost.',
    parts: [
      { type: 'numeric', q: 'What is the prime cost of the job?', answer: 2000, unit: '£', exp: 'Prime cost is the total of the direct costs: £1,200 materials + £800 labour = £2,000. Overheads are excluded by definition — prime cost is what can be traced to the job itself.' },
      { type: 'numeric', q: 'What production overhead is absorbed into the job?', answer: 400, unit: '£', exp: 'Overhead is absorbed on the stated basis, here 50% of direct labour: 50% × £800 = £400. The basis matters — absorbing on materials or on prime cost would give a different figure for the same job.' },
      { type: 'numeric', q: 'What is the total production cost of the job?', answer: 2400, unit: '£', exp: 'Total production cost is prime cost plus absorbed overhead: £2,000 + £400 = £2,400. This is the figure a price is built on, since a price covering only prime cost would leave overheads unrecovered.' },
    ],
    exp: 'Job costing in the order the assessment asks for it: prime cost, then absorbed overhead, then total production cost.' },

  { id: 'sc-014', topic: 'besy', difficulty: 'medium', type: 'scenario',
    setup: 'Two friends, Priya and Sam, run a graphic-design business together as a general partnership. They are considering incorporating as a private limited company. They also have a major client who has not paid a £4,000 invoice that is now 90 days overdue.',
    parts: [
      { type: 'mcq', q: 'As a general partnership, Priya and Sam\'s liability for business debts is:',
        opts: ['Limited to their capital contributions', 'Unlimited — they are personally liable', 'Limited by a charge over assets', 'The same as a limited company'],
        ans: 1, exp: 'General partners have unlimited liability and are jointly and severally liable for partnership debts.' },
      { type: 'mcq', q: 'A key advantage of incorporating as a private limited company would be:',
        opts: ['Limited liability, which protects the owners’ personal assets from business debts', 'Freedom from the requirement to keep formal accounting records or file annual accounts', 'Exemption from tax on the trading profits the business earns in each accounting period', 'The right to offer shares for sale to the general public on a stock exchange'],
        ans: 0, exp: 'Incorporation gives the shareholders limited liability — personal assets are protected from business debts.' },
      { type: 'mcq', q: 'The £4,000 overdue invoice is a concern primarily because it affects the business\'s:',
        opts: ['Cash flow and liquidity, where money owed is not yet available to spend', 'Mission statement, which sets out the overall purpose of the organisation', 'Legal structure, which determines who owns and controls the business', 'VAT registration, which depends on the level of taxable turnover'],
        ans: 0, exp: 'Unpaid receivables tie up cash and can threaten the liquidity the business needs to pay its own bills.' },
    ],
    exp: 'Business structures, limited liability, and the cash-flow impact of overdue receivables.' },

  { id: 'sc-015', topic: 'besy', difficulty: 'medium', type: 'scenario',
    setup: 'Coastline Imports buys stock from suppliers in the USA and sells to UK customers. The current exchange rate is £1 = $1.25. The Bank of England has just raised interest rates, and inflation in the UK is rising.',
    parts: [
      { type: 'numeric', q: 'Coastline orders stock costing $10,000. At £1 = $1.25, what is the cost in pounds?', answer: 8000, unit: '£', exp: 'With £1 buying $1.25, divide the dollar cost by the rate: $10,000 ÷ 1.25 = £8,000. If the pound then weakens, the same order costs more in sterling — which is the exchange-rate risk an importer carries.' },
      { type: 'mcq', q: 'If the pound weakens to £1 = $1.10, the same $10,000 order will:',
        opts: ['Cost less in pounds', 'Cost more in pounds', 'Cost the same', 'Become exempt from VAT'],
        ans: 1, exp: 'A weaker pound buys fewer dollars, so $10,000 costs more in pounds ($10,000 ÷ 1.10 ≈ £9,091).' },
      { type: 'mcq', q: 'The rise in UK interest rates is most likely to:',
        opts: ['Increase consumer borrowing and spending', 'Reduce consumer borrowing and spending', 'Have no effect on demand', 'Reduce the cost of imports'],
        ans: 1, exp: 'Higher interest rates raise borrowing costs and mortgage payments, tending to reduce consumer demand.' },
      { type: 'mcq', q: 'Rising inflation is most likely to:',
        opts: ['Increase the business’s input costs and reduce customers’ purchasing power', 'Reduce the business’s input costs while leaving selling prices unchanged', 'Have no effect on the business, because costs and prices rise together', 'Guarantee higher profits, because selling prices rise with the price level'],
        ans: 0, exp: 'Inflation raises the cost of the business’s inputs while reducing what customers’ money will buy, so costs rise and real demand tends to fall. Both effects squeeze margins at once, which is why it is watched so closely.' },
    ],
    exp: 'External economic factors: exchange rates, interest rates and inflation affecting an importer.' },

  { id: 'sc-016', topic: 'besy', difficulty: 'hard', type: 'scenario',
    setup: 'Anya works as an accounting technician at a manufacturing company. Her manager asks her to delay recording several supplier invoices until after the year end so that this year\'s profit looks higher. The company also wants to start reporting on its environmental impact.',
    parts: [
      { type: 'mcq', q: 'Under the AAT Code of Professional Ethics, what should Anya do?',
        opts: ['Refuse to manipulate the records and raise her concerns through the proper channels', 'Follow the instruction given, on the basis that a senior manager has already authorised it', 'Record half of the invoices as a compromise between the two positions', 'Resign from the role immediately without giving any reason for leaving'],
        ans: 0, exp: 'Integrity and objectivity require Anya to refuse to falsify records and to raise the matter through proper channels.' },
      { type: 'mcq', q: 'The fundamental ethical principle most directly at stake here is:',
        opts: ['Confidentiality', 'Integrity', 'Professional competence', 'Courtesy'],
        ans: 1, exp: 'Integrity — being honest and straightforward — is the principle most directly threatened by manipulating the records.' },
      { type: 'mcq', q: 'Reporting on environmental impact is an example of:',
        opts: ['Sustainability reporting, which forms part of corporate social responsibility', 'Tax avoidance, arranging the business’s affairs so as to reduce the tax due', 'A bank reconciliation, agreeing the cash book to the bank statement', 'A control account, summarising the balances in a subsidiary ledger'],
        ans: 0, exp: 'Measuring and reporting environmental impact is part of sustainability and corporate social responsibility.' },
    ],
    exp: 'Professional ethics under pressure from a manager, and the finance function’s role in reporting environmental impact. Both belong to the same job, and a synoptic task will put them in the same scenario.' },

  /* ── Additional scenario questions (Phase 6 expansion) ── */

  { id: 'sc-017', topic: 'itbk', difficulty: 'hard', type: 'scenario',
    setup: 'Blossom Interiors is a sole trader business. At 31 March the trial balance shows: Bank £2,400 Dr; Trade receivables £8,100 Dr; Inventory £3,600 Dr; Premises £45,000 Dr; Trade payables £5,200 Cr; Loan £12,000 Cr; Capital £28,500 Cr; Sales £62,000 Cr; Purchases £32,000 Dr; Wages £9,500 Dr; Rent £4,200 Dr; Drawings £2,900 Dr.',
    parts: [
      { type: 'mcq', q: 'The trial balance total (debit side) is:',
        opts: ['£107,700', '£100,000', '£95,800', '£107,200'],
        ans: 0, exp: 'Add the debit balances: 2,400 + 8,100 + 3,600 + 45,000 + 32,000 + 9,500 + 4,200 + 2,900 = £107,700. Assets and expenses sit on the debit side; income, liabilities and capital sit on the credit side.' },
      { type: 'mcq', q: 'Drawings appear in the trial balance as a debit because:',
        opts: ['Drawings reduce capital, and a reduction in capital is recorded as a debit', 'Drawings are an expense of the business, and expenses are recorded as debits', 'Drawings are an asset of the business, and assets are recorded as debits', 'Drawings increase profit, and increases in profit are recorded as debits'],
        ans: 0, exp: 'Drawings reduce the owner\'s capital. Capital has a credit nature, so reducing it requires a debit entry.' },
      { type: 'mcq', q: 'Which of the following would NOT appear in the trial balance?',
        opts: ['Trade receivables', 'Closing inventory', 'Bank', 'Wages'],
        ans: 1, exp: 'Closing inventory is determined at year end and is NOT in the trial balance — it appears as an adjusting entry and in the financial statements.' },
      { type: 'mcq', q: 'If a sales invoice for £500 was recorded as £50, the trial balance would:',
        opts: ['Not balance — one side is wrong', 'Still balance — both sides are wrong by the same amount', 'Not balance — only the debit side is wrong', 'Show a credit balance of £450 on the suspense account'],
        ans: 1, exp: 'An error of original entry affects both the debit and credit sides equally — so the trial balance still balances.' },
    ],
    exp: 'Trial balance composition, the nature of drawings, closing inventory, and errors of original entry.' },

  { id: 'sc-018', topic: 'itbk', difficulty: 'medium', type: 'scenario',
    setup: 'Priya runs a craft supplies shop. She buys goods from Supplier X on credit. This month: purchases £4,800 net; VAT at 20%; she returns goods of £600 net + VAT and receives a credit note from Supplier X; a £200 trade discount was received (already deducted from the invoice); and she pays £3,000 to Supplier X during the month.',
    parts: [
      { type: 'mcq', q: 'The VAT on the purchase invoice (£4,800 net) is:',
        opts: ['£800', '£960', '£576', '£4,800'],
        ans: 1, exp: 'VAT at the standard rate on the net figure: £4,800 × 20% = £960. The supplier is owed £5,760 gross, and the £960 is input tax the business can reclaim on its return.' },
      { type: 'mcq', q: 'The gross amount of the purchase invoice (after trade discount but before settlement discount) is:',
        opts: ['£5,560', '£5,760', '£5,500', '£6,000'],
        ans: 1, exp: 'Net £4,800 + VAT £960 = £5,760. The trade discount is already reflected in the £4,800 net figure.' },
      { type: 'mcq', q: 'The credit note Priya receives from Supplier X for the returned goods goes in which book of prime entry?',
        opts: ['The purchases returns day book, because the credit note came from a supplier', 'The sales returns day book, which records credit notes issued to customers', 'The purchases day book, alongside the original invoice from the supplier', 'The journal, because credit notes are non-routine adjusting entries'],
        ans: 0, exp: 'A credit note RECEIVED from a supplier for goods returned goes in the purchases returns day book.' },
      { type: 'mcq', q: 'After the purchase, the return and the £3,000 payment, the balance owed to Supplier X is:',
        opts: ['£2,520', '£1,800', '£2,040', '£2,760'],
        ans: 2, exp: 'Purchase gross £5,760. Credit note gross (£600 + £120 VAT) = £720. Payment £3,000. Balance = £5,760 − £720 − £3,000 = £2,040.' },
    ],
    exp: 'VAT on purchases, trade vs settlement discounts, purchases returns day book, and running payable balances.' },

  { id: 'sc-019', topic: 'pobc', difficulty: 'hard', type: 'scenario',
    setup: 'At 30 April, the sales ledger control account (SLCA) shows a closing balance of £18,400 Dr. The list of individual trade receivable balances totals £17,950. Investigation reveals: (1) The sales returns day book was undercast by £300, and the wrong total was posted. (2) A customer payment of £150 was posted to the wrong customer\'s account (the total posted was correct). (3) A credit note of £150 was posted twice to one customer\'s individual account; the day book entry itself was correct.',
    parts: [
      { type: 'mcq', q: 'Which of the three errors would cause the SLCA not to agree with the individual ledger list?',
        opts: ['Error 1 only', 'Error 3 only', 'Errors 1 and 3', 'Error 2 only'],
        ans: 2, exp: 'Error 1 lives in the day book TOTAL, which only the SLCA is posted from, so the SLCA credit was £300 short. Error 3 lives in an individual account, which only the list picks up, so the list is £150 short. Error 2 moves £150 between two accounts inside the list — its total, and the SLCA, both stay right.' },
      { type: 'mcq', q: 'After correcting error 1 (the £300 undercast), the SLCA balance becomes:',
        opts: ['£18,100', '£18,700', '£18,400', '£17,650'],
        ans: 0, exp: 'The missing £300 of sales returns is posted: debit sales returns, credit SLCA. New SLCA: £18,400 − £300 = £18,100.' },
      { type: 'mcq', q: 'Error 2 (payment posted to wrong customer account) is an example of:',
        opts: ['Error of omission', 'Error of commission', 'Error of principle', 'Compensating error'],
        ans: 1, exp: 'Posting to the wrong account of the same type (trade receivable) is an error of commission.' },
      { type: 'mcq', q: 'What correction does error 3 need, and where does that leave the two records?',
        opts: ['Add £150 back to the customer\'s individual account; the SLCA needs no entry', 'Credit the SLCA £150 so it matches the individual account', 'Debit suspense £150; credit SLCA £150', 'No correction needed — it self-corrects at the next posting'],
        ans: 0, exp: 'The duplicate exists only in the individual account — the double entry in the ledger was never wrong, so only the memorandum record is corrected. Removing the extra credit note takes the list to £17,950 + £150 = £18,100, which agrees with the corrected SLCA of £18,100: the £450 difference was £300 on one side and £150 on the other.' },
    ],
    exp: 'Sales ledger control account reconciliation, error types, and correction journal entries.' },

  { id: 'sc-020', topic: 'pobc', difficulty: 'medium', type: 'scenario',
    setup: 'Callum earns a basic salary of £28,000 per year and worked 12 overtime hours this month at time-and-a-half. His hourly rate is £13.50. PAYE deducted this month: £320. Employee NIC: £198. Employer NIC rate: 15% on earnings above £416.67/month.',
    parts: [
      { type: 'mcq', q: 'Callum\'s overtime pay for the month is:',
        opts: ['£162', '£243', '£216', '£324'],
        ans: 1, exp: 'Time-and-a-half means the hourly rate is multiplied by 1.5, so each overtime hour is worth £20.25 and 12 hours give £243. The premium applies to the overtime hours only, not to basic pay.' },
      { type: 'mcq', q: 'Callum\'s gross pay this month (basic + overtime) is:',
        opts: ['£2,575.67', '£2,576.33', '£2,566.67', '£2,243'],
        ans: 1, exp: 'An annual salary is spread evenly over the year, so basic pay is £28,000 ÷ 12 = £2,333.33 a month. Adding the £243 of overtime gives gross pay of £2,576.33 before any deductions.' },
      { type: 'mcq', q: 'Callum\'s net pay this month is:',
        opts: ['£2,058.33', '£2,376.33', '£2,178.33', '£1,858.33'],
        ans: 0, exp: 'Net pay is gross less the employee’s deductions: £2,576.33 − £320 PAYE − £198 NIC = £2,058.33. Employer NIC is a cost to the employer and never reduces the employee’s pay.' },
      { type: 'mcq', q: 'The employer\'s NIC for the month (on earnings above £416.67) at 15% is approximately:',
        opts: ['£323.95', '£386.45', '£257.40', '£293.05'],
        ans: 0, exp: '(£2,576.33 − £416.67) × 15% = £2,159.66 × 15% ≈ £323.95. The employer pays this on top of gross pay.' },
    ],
    exp: 'Payroll: overtime calculation, gross pay, net pay and employer NIC cost.' },

  { id: 'sc-021', topic: 'poc', difficulty: 'hard', type: 'scenario',
    setup: 'A factory produces one product. Budgeted fixed production overhead is £84,000 for the month and budgeted production is 8,000 units. Actual production was 7,500 units. The overhead absorption rate is based on units produced.',
    parts: [
      { type: 'mcq', q: 'Based on budgeted production, the overhead absorption rate per unit is:',
        opts: ['£10.50', '£11.20', '£10.00', '£12.00'],
        ans: 0, exp: 'Absorbing on a per-unit basis divides budgeted overhead by budgeted units: £84,000 ÷ 8,000 = £10.50. Both figures are budgeted, which is what lets a unit cost be quoted before the period is over.' },
      { type: 'mcq', q: 'Given actual production of 7,500 units, the overhead position is:',
        opts: ['Over-absorbed by £5,250', 'Under-absorbed by £5,250', 'Over-absorbed by £4,500', 'Under-absorbed by £4,500'],
        ans: 1, exp: 'Absorbed = 7,500 × £10.50 = £78,750. Actual fixed costs = £84,000. Under-absorption = £84,000 − £78,750 = £5,250.' },
    ],
    exp: 'Overhead absorption: setting the rate from budgeted figures, then finding the under- or over-absorption once actual output is known.' },

  { id: 'sc-022', topic: 'poc', difficulty: 'medium', type: 'scenario',
    setup: 'Meridian Co uses AVCO to value inventory. At 1 May: 200 units @ £5.00 each. Purchased 6 May: 300 units @ £6.50 each. Sold 10 May: 350 units. Purchased 15 May: 150 units @ £7.00 each. Sold 20 May: 200 units.',
    parts: [
      { type: 'mcq', q: 'After the 6 May purchase, the weighted average cost per unit is:',
        opts: ['£5.90', '£6.00', '£5.75', '£6.50'],
        ans: 0, exp: 'Total value: (200 × £5.00) + (300 × £6.50) = £1,000 + £1,950 = £2,950. Total units: 500. AVCO = £2,950 ÷ 500 = £5.90.' },
      { type: 'mcq', q: 'The cost of the 350 units sold on 10 May (using AVCO at £5.90) is:',
        opts: ['£2,065', '£1,750', '£2,275', '£1,925'],
        ans: 0, exp: 'Under AVCO the issue is valued at the current weighted average: 350 × £5.90 = £2,065. The average is recalculated after each receipt, so it changes over time while FIFO would use the oldest batch price instead.' },
      { type: 'mcq', q: 'After the 10 May sale, how many units remain and at what total value?',
        opts: ['150 units, £885', '150 units, £750', '150 units, £975', '150 units, £1,050'],
        ans: 0, exp: '150 units remain, valued at the same weighted average of £5.90, giving £885. Under AVCO the units issued and the units remaining are valued identically — that is what distinguishes it from FIFO.' },
      { type: 'mcq', q: 'After the 15 May purchase (150 units @ £7.00), the new AVCO per unit is:',
        opts: ['£6.45', '£6.50', '£6.00', '£7.00'],
        ans: 0, exp: 'Total value: £885 + (150 × £7.00) = £885 + £1,050 = £1,935. Total units: 300. AVCO = £1,935 ÷ 300 = £6.45.' },
    ],
    exp: 'AVCO inventory valuation: recalculating weighted average after every purchase.' },

  { id: 'sc-023', topic: 'besy', difficulty: 'medium', type: 'scenario',
    setup: 'Stella is considering leaving employment to set up her own business selling handmade ceramics. She is deciding between operating as a sole trader or incorporating as a private limited company (Ltd). She expects revenues of £90,000 in year 1 and a net profit of £35,000.',
    parts: [
      { type: 'mcq', q: 'As a sole trader, Stella\'s personal liability if the business fails would be:',
        opts: ['Unlimited, so her personal assets could be used to pay the business debts', 'Limited to the amount of capital she originally invested in the business', 'Limited to £35,000, being the profit the business made in its first year', 'Zero, because a sole trader is a separate legal person from the business'],
        ans: 0, exp: 'Sole traders have unlimited liability — there is no legal separation between owner and business.' },
      { type: 'mcq', q: 'As a private limited company (Ltd), who can hold shares in the business?',
        opts: ['Only those offered them directly — a private company cannot advertise shares', 'Anyone at all, because the shares can be traded on a stock exchange', 'The general public, once the company has obtained a stock market listing', 'Only the sole director, since a private company can have just one member'],
        ans: 0, exp: 'An Ltd cannot offer shares to the general public. Shares are issued privately to invited individuals or organisations.' },
      { type: 'mcq', q: 'Which statement about a limited company is correct?',
        opts: ['The company and the owner are the same legal entity', 'The company is a separate legal entity from its owner(s)', 'All profits must be distributed to shareholders each year', 'An Ltd must have at least two directors'],
        ans: 1, exp: 'Incorporation creates a separate legal entity — the company can own assets, incur debts and sue/be sued in its own name.' },
      { type: 'mcq', q: 'One disadvantage of incorporation (setting up a Ltd) compared to a sole trader is:',
        opts: ['A greater administrative burden — accounts must be filed at Companies House', 'The owner becomes personally liable for all of the business’s debts', 'Profits become subject to a higher rate of tax than that which a sole trader pays', 'The business loses the ability to employ staff under a contract'],
        ans: 0, exp: 'Limited companies must file annual accounts with Companies House and comply with the Companies Act — this creates more administrative work than a sole trader.' },
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
        ans: 0, exp: 'Cross-price elasticity is the change in demand for one good over the change in the price of another: +15% ÷ +20% = +0.75. A positive figure means the two are substitutes — B raising its price sends customers to A.' },
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
    { type: 'mcq', q: 'Hartley faces a large claim from a customer. As a sole trader:',
      opts: ['Liability is limited to the capital invested in the business', 'Personal assets can be seized to pay business debts', 'Liability is capped at the annual turnover figure', 'A sole trader cannot be sued — only the business entity is liable'],
      ans: 1, exp: 'Sole traders have unlimited liability. There is no legal separation between owner and business — creditors can pursue the owner\'s personal assets.' },
  ],
  exp: 'Cross-unit scenario covering VAT calculation (itbk), the sales ledger control account (pobc) and sole trader liability (besy) — three units assessed from one set of transactions.' },



{ id: 'sc-028', topic: 'poc', difficulty: 'medium', type: 'scenario',
  setup: 'Birch Furniture buys and sells chairs. April inventory: Opening 20 units @ £45. Purchase 1 (5 Apr): 30 units @ £50. Purchase 2 (20 Apr): 50 units @ £54. Sale (25 Apr): 60 units at £90 each. All purchases are on credit.',
  parts: [
    { type: 'mcq', q: 'Weighted average cost per unit after both purchases:',
      opts: ['£49.00', '£51.00', '£52.00', '£54.00'],
      ans: 1, exp: 'Total units = 100. Cost = (20×£45)+(30×£50)+(50×£54) = £900+£1,500+£2,700 = £5,100. AVCO = £5,100÷100 = £51.00.' },
    { type: 'mcq', q: 'Cost of the 60 units sold (AVCO):',
      opts: ['£3,000', '£3,240', '£3,060', '£2,700'],
      ans: 2, exp: 'Under AVCO every issue is valued at the weighted average cost at that date, here £51.00, so 60 × £51.00 = £3,060. The average is recalculated after each purchase, which is what distinguishes AVCO from FIFO.' },
    { type: 'mcq', q: 'The 30-unit credit purchase on 5 April affects the PLCA as:',
      opts: ['Debit PLCA £1,500', 'Credit PLCA £1,500', 'Debit PLCA £1,800', 'No effect — the PLCA only records cash payments'],
      ans: 1, exp: 'Credit purchases create a liability. Cr PLCA £1,500 / Dr Purchases £1,500. The PLCA credit represents the amount owed to the supplier (30 × £50).' },
  ],
  exp: 'Cross-unit scenario covering AVCO inventory valuation and the cost of an issue (poc), with the payables ledger control account entry for the same purchase (pobc).' },

{ id: 'sc-029', topic: 'poc', difficulty: 'medium', type: 'scenario',
  setup: 'Meadow Bakery is a sole trader run by Sarah. She is considering a £15,000 bank loan at 8% annual interest to buy equipment that would reduce her cost per unit. She has ruled out taking on a business partner.',
  parts: [
    { type: 'mcq', q: 'The bank loan is an example of:',
      opts: ['Equity finance (share capital)', 'Internal finance (retained profits)', 'External debt finance', 'Trade credit from suppliers'],
      ans: 2, exp: 'A bank loan is external debt finance — borrowed from outside the business with interest, requiring repayment. It does not dilute ownership unlike equity finance.' },
    { type: 'mcq', q: 'By using a loan rather than a business partner, Sarah:',
      opts: ['Keeps full control and all the profits, but is personally liable for the loan', 'Automatically gains limited liability protection over her personal assets', 'Must incorporate as a limited company before borrowing more than £10,000', 'Avoids personal liability entirely, because the loan is the business’s debt'],
      ans: 0, exp: 'As a sole trader, Sarah keeps 100% control and profits but has unlimited liability — the bank can pursue her personal assets if the loan is not repaid.' },
  ],
  exp: 'Sources of business finance and the unlimited liability of a sole trader (besy), assessed through a financing decision the owner actually has to make.' },

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
      'A standing order payment that was recorded in neither the cash book nor the bank statement'],
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


  { id: 'pobc-205', topic: 'pobc', difficulty: 'hard', type: 'mcq',
    q: 'A business has output VAT of £18,400 and input VAT of £11,750 for the quarter. What amount is payable to HMRC?',
    opts: ['£18,400', '£11,750', '£6,650', '£30,150'],
    ans: 2,
    exp: 'Net VAT = output tax − input tax = £18,400 − £11,750 = £6,650 payable to HMRC. That figure is the credit balance left on the VAT control account once the quarter’s entries are complete, and it is settled by payment.' },

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



  { id: 'poc-206', topic: 'poc', difficulty: 'hard', type: 'mcq',
    q: 'Which of these is a direct cost of production?',
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


  { id: 'poc-209', topic: 'poc', difficulty: 'hard', type: 'mcq',
    q: 'A job requires 15 kg of material at £8/kg, 6 hours of direct labour at £12/hr, and overheads absorbed at £5 per labour hour. What is the total job cost?',
    opts: ['£282', '£252', '£222', '£312'],
    ans: 2,
    exp: 'Material: 15 × £8 = £120. Labour: 6 × £12 = £72. Overhead: 6 × £5 = £30. Total: £120 + £72 + £30 = £222.' },

  // ── BESY additional hard questions ──────────────────────────────────────











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
        exp: 'Both items are genuine transactions the bank has processed and the cash book has not recorded, so both are entered: £4,850 + £620 − £370 = £5,100. These are corrections, unlike timing differences, which need no entry.' },
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


  { id: 'sc-034', topic: 'pobc', difficulty: 'hard', type: 'scenario',
    setup: 'Finch & Partners\' trial balance does not agree. A suspense account has been opened with a credit balance of £630. Investigation reveals three errors: (1) A sales invoice for £270 was entered as a debit to both the Sales account AND the SLCA. (2) Rent paid £900 was entered in the cash book correctly but posted to the Rent account as £990. (3) A purchase of stationery for £180 was completely omitted from the ledger.',
    parts: [
      { type: 'mcq', q: 'Error 1 (invoice debited to Sales AND SLCA) — what type of error is this?',
        opts: ['A posting error — both halves went in as debits, so the two sides no longer agree', 'An error of reversal, where the debit and credit entries were posted the wrong way round', 'An error of principle, where an item went into the wrong type of account entirely', 'An error of commission, where the wrong account of the right type was used'],
        ans: 0,
        exp: 'The correct entry is Dr SLCA £270 / Cr Sales £270. Here Sales was debited instead of credited, so the transaction went in as two debits and no credit — a Dr excess of £540. Note the contrast with a true reversal (Dr Sales / Cr SLCA): that would put the right amounts on the wrong sides but still leave total debits equal to total credits, so the trial balance would agree and no suspense account would arise.' },
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
    exp: 'A job cost card totals the direct costs then adds absorbed overhead. Labour is 12 × £10 = £120 and overhead 12 × £8 = £96, so with £260 of materials the total production cost is £476.' },


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
    setup: 'You work at Redmayne Joinery Ltd. You have completed the bank reconciliation for October. The cash book shows a balance of £14,320 but the bank statement shows £11,905. You have identified: unpresented cheques of £3,150; an outstanding lodgement of £4,900; bank charges of £45 not yet in the cash book; and a direct debit for insurance of £320 not yet in the cash book.',
    task: 'Draft a note to the finance manager explaining the reconciliation and what needs to be adjusted in the cash book.',
    rubric: [
      { point: 'Identifies the two items requiring cash book adjustment: bank charges £45 and direct debit £320', marks: 2 },
      { point: 'States the corrected cash book balance of £13,955 (£14,320 − £45 − £320)', marks: 2 },
      { point: 'Explains unpresented cheques and outstanding lodgements are timing differences, not errors', marks: 2 },
      { point: 'Reconciles from the statement (£11,905 + £4,900 − £3,150 = £13,655) and identifies that the £300 difference against the corrected cash book needs investigation', marks: 1 },
      { point: 'Clear structure with a recommendation or next step', marks: 1 },
    ],
    modelAnswer: 'Note: October bank reconciliation — Redmayne Joinery Ltd\n\nTwo items need posting to the cash book because they are genuine transactions the bank has processed and we have not recorded: bank charges of £45 and the insurance direct debit of £320. Once posted, the corrected cash book balance is £14,320 − £45 − £320 = £13,955.\n\nThe unpresented cheques of £3,150 and the outstanding lodgement of £4,900 are timing differences, not errors. They are correctly in our cash book and will clear the bank shortly, so no adjustment is made for them.\n\nReconciling from the statement: £11,905 plus the outstanding lodgement £4,900 less unpresented cheques £3,150 gives £13,655. That leaves £300 against the corrected cash book balance of £13,955, which does not reconcile. I recommend we review October cash book postings for a transposition or an omitted item before signing off.\n\nAccounts Assistant',
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
      { text: 'A charity must distribute any surplus it generates to its trustees.', answer: false },
    ],
    exp: 'Two of these are false. Charities are generally exempt from corporation tax on income applied to charitable purposes, so the tax statement is wrong. And a charity may certainly run a surplus — what it must not do is distribute it to trustees or members, because the surplus has to be applied to the charitable purposes.' },

  { id: 'tfq-002', topic: 'besy', difficulty: 'medium', type: 'truefalse', skill: 'besy-structure',
    q: 'Identify whether the following statements about limited companies are true or false.',
    statements: [
      { text: 'A limited company has a separate legal personality from its shareholders.', answer: true },
      { text: 'The shareholders of a limited company have unlimited liability for the company\'s debts.', answer: false },
      { text: 'A limited company must file its annual accounts at Companies House, where they become publicly available.', answer: true },
      { text: 'A limited company is dissolved automatically once its original shareholders sell their shares.', answer: false },
    ],
    exp: 'Two are false. Shareholders have LIMITED liability: they risk only what they paid for their shares. And separate legal personality gives the company perpetual succession — it continues to exist however often its shares change hands, which is exactly what makes shares saleable.' },

  { id: 'tfq-003', topic: 'besy', difficulty: 'medium', type: 'truefalse', skill: 'besy-structure',
    q: 'Identify whether the following statements about sole traders and partnerships are true or false.',
    statements: [
      { text: 'A sole trader is personally liable for the debts of the business without limit.', answer: true },
      { text: 'An ordinary partnership has a legal identity separate from its partners.', answer: false },
      { text: 'A limited liability partnership (LLP) must file accounts at Companies House.', answer: true },
      { text: 'In an ordinary partnership without a written agreement, profits are shared in proportion to the capital each partner contributed.', answer: false },
    ],
    exp: 'Two are false. An ordinary partnership is not a separate legal person, which is why its partners are personally liable; an LLP is, which is why it must file accounts publicly. And with no written agreement the Partnership Act 1890 shares profits EQUALLY, regardless of what each partner put in.' },

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
      { text: 'Delegated legislation requires a new Act of Parliament each time it is used.', answer: false },
    ],
    exp: 'Two are false. Criminal law concerns offences against the state and is prosecuted by the state, whereas disputes between private parties are civil law. And delegated legislation exists precisely to AVOID a new Act each time: Parliament grants authority for the detail to be set by statutory instrument.' },

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
      { text: 'Segregation of duties means one person should handle a transaction from start to finish.', answer: false },
    ],
    exp: 'Two are false. Management accounts are internal, so their format is whatever management finds useful — no statutory format applies to them. And segregation of duties is the opposite of one person handling a transaction throughout: splitting the work is what stops a single person both causing an error and concealing it.' },

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
      { text: 'Access rights should be granted in full to every user so that work is never blocked.', answer: false },
    ],
    exp: 'Two are false. Phishing is social engineering — it deceives a person into revealing credentials rather than attacking hardware. And access should follow least privilege, granted according to what a role actually requires: blanket access for everyone removes the protection altogether.' },

  { id: 'tfq-011', topic: 'besy', difficulty: 'medium', type: 'truefalse', skill: 'besy-tech',
    q: 'Identify whether the following statements about accounting software and technology are true or false.',
    statements: [
      { text: 'Cloud accounting allows several users to work in the same ledgers at the same time.', answer: true },
      { text: 'A bank feed imports transactions automatically, reducing manual keying errors.', answer: true },
      { text: 'Moving to cloud accounting removes the need to control who has access to the data.', answer: false },
      { text: 'Keeping regular backups protects against losing data but not against somebody reading it.', answer: true },
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
      { text: 'If demand for a product is price inelastic, a price rise causes a proportionately larger fall in quantity demanded.', answer: false },
    ],
    exp: 'Two are false. Monetary policy is the Bank of England’s and fiscal policy the government’s — swapping the two is the most frequently penalised error in this topic. And inelastic demand means quantity responds LESS than proportionately to a price change, which is why a price rise increases total revenue.' },

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

  { id: 'tfq-016', topic: 'pobc', difficulty: 'medium', type: 'truefalse', skill: 'pobc-ca',
    q: 'Identify whether the following statements about control accounts are true or false.',
    statements: [
      { text: 'The sales ledger control account total should agree with the sum of the individual customer balances.', answer: true },
      { text: 'An error in one customer\'s individual account will always cause the trial balance to disagree.', answer: false },
      { text: 'A contra entry increases both the sales ledger and purchase ledger control accounts.', answer: false },
      { text: 'An irrecoverable debt written off is credited to the sales ledger control account.', answer: true },
    ],
    exp: 'Two are false. The subsidiary ledgers sit outside the double entry, so an error in one customer’s account does not unbalance the trial balance — which is precisely why the control account reconciliation exists. And a contra entry offsets a party who is both customer and supplier, so it REDUCES both control accounts.' },

  { id: 'tfq-017', topic: 'pobc', difficulty: 'medium', type: 'truefalse', skill: 'pobc-bankrec',
    q: 'Identify whether the following statements about bank reconciliation are true or false.',
    statements: [
      { text: 'Unpresented cheques are a timing difference and need no adjustment in the cash book.', answer: true },
      { text: 'Bank charges appearing on the statement require an adjustment to the cash book.', answer: true },
      { text: 'An outstanding lodgement is money the bank has credited that the business has not yet recorded.', answer: false },
      { text: 'A direct debit shown on the bank statement but missing from the cash book is a timing difference.', answer: false },
    ],
    exp: 'Two are false. A direct debit the business has not recorded is an omission rather than a timing difference, so it must be posted to the cash book. And an outstanding lodgement runs the other way round: the business has recorded the receipt and the bank has not yet credited it.' }

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

  { id: 'ms-012', topic: 'pobc', difficulty: 'medium', type: 'multiselect', skill: 'pobc-bankrec', selectCount: 2,
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
      'Financial accounting deals with future forecasts and projections; management accounting deals only with historic recorded transactions',
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
      'It reduces the total number of staff that the finance department needs to employ, lowering the payroll cost',
      'It removes the need for the organisation to carry out bank or control account reconciliations at all',
      'It guarantees that the trial balance will agree at the end of each period without adjustment',
    ],
    ans: 0,
    exp: 'Segregation works by requiring collusion. It typically needs more people rather than fewer, and it complements reconciliations rather than replacing them.' },

  { id: 'besy-305', topic: 'besy', difficulty: 'medium', skill: 'besy-finance',
    q: 'A business submits its annual accounts to Companies House. What is the primary purpose of this filing?',
    opts: [
      'To place the company\'s financial position on the public record in exchange for limited liability',
      'To calculate and settle the corporation tax liability arising for the accounting period',
      'To obtain formal approval from the registrar of companies before the business may continue trading',
      'To register the company’s employees for PAYE and National Insurance contribution purposes',
    ],
    ans: 0,
    exp: 'Companies House filings are the public-transparency counterpart of limited liability. Tax is settled with HMRC, and PAYE registration is a separate HMRC process.' },

  { id: 'besy-306', topic: 'besy', difficulty: 'medium', skill: 'besy-finance',
    q: 'Which of the following best describes the relationship between the finance function and other departments?',
    opts: [
      'Finance depends on operational data from other departments and returns analysis those departments can act on',
      'Finance operates independently and requires no information at all from other departments in order to do its work',
      'Finance has authority over other departments and directs their day-to-day operational decisions',
      'Finance provides information only to the board and does not communicate with other departments',
    ],
    ans: 0,
    exp: 'The flow runs both ways. Finance cannot cost or budget without operational data, and the departments supplying it get realistic budgets and evidence in return.' },

  { id: 'besy-307', topic: 'besy', difficulty: 'easy', skill: 'besy-finance',
    q: 'Which external body is responsible for collecting corporation tax and VAT from UK businesses?',
    opts: [
      'HM Revenue and Customs, the UK government department responsible for tax collection',
      'Companies House, the registrar which maintains the public register of UK companies',
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
      'That the invoice appears to have been lost, so that the supplier sends a replacement copy for processing',
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
      'A telephone call, which allows the matter to be discussed at once without creating any written record',
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
      'Highly informal, so as to reassure the customer that the matter is not being treated as serious',
      'Impersonal and passive, avoiding any statement about who will resolve the matter',
    ],
    ans: 0,
    exp: 'Acknowledge, quantify, commit. Defensiveness and vagueness both damage the relationship the communication is meant to protect.' },

  { id: 'besy-316', topic: 'besy', difficulty: 'medium', skill: 'besy-comms',
    q: 'Why should an email about an account discrepancy state the specific amount in question?',
    opts: [
      'It allows the recipient to identify the transaction and check it against their own records',
      'It is a legal requirement that all business correspondence should include the monetary amounts',
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
      'Confidentiality — the data cannot be read or copied by anyone who is not authorised to see it',
      'Integrity — the data cannot be altered without that alteration being detected',
      'Authenticity — the identity of the person who created each record can be verified',
    ],
    ans: 0,
    exp: 'Backups address availability. Confidentiality is handled by access controls and encryption; integrity by validation and audit trails.' },

  { id: 'besy-319', topic: 'besy', difficulty: 'medium', skill: 'besy-tech',
    q: 'What is phishing?',
    opts: [
      'An attempt to deceive a person into revealing credentials or making a payment, usually by email',
      'A fault in the accounting software that causes transactions to be posted to the wrong account',
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
        exp: 'A credit note reverses part of the invoice on the same basis, so VAT goes with it: £200 × 1.20 = £240 gross, being £200 of sales returns and £40 of VAT no longer chargeable to the customer.' },
      { type: 'numeric', q: 'What amount does Marchmont pay on 30 May?', answer: 1680, unit: '£',
        exp: 'The customer pays the invoice less the credit note: £1,920 − £240 = £1,680. Nothing in the bank statement would explain that figure on its own, which is why the remittance advice matters for allocating it.' },
      { type: 'mcq', q: 'Marchmont emails asking why their statement shows £1,680 rather than the £1,920 on the original invoice. What should your reply do?',
        opts: [
          'Explain that a credit note for £240 was issued for the returned goods, reducing the balance to £1,680',
          'Ask Marchmont to pay the original £1,920 in full and treat the returned goods as a separate matter later',
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
        exp: 'The difference is £33,150 − £32,400 = £750. A control account and the list of individual balances are built from the same transactions, so any gap between them proves an error in one or the other and must be found.' },
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
          'Release the payment, since the supplier record has already been updated in the accounting system',
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
          'Storing the supplier bank details in a spreadsheet held outside the accounting system',
          'Requiring all suppliers to be paid by cheque rather than bank transfer',
        ], ans: 0,
        exp: 'Attribution plus authorisation is the control pair. The other three either do not address the risk or introduce new ones.' },
    ],
    exp: 'Synoptic Task 7 shape: bookkeeping systems, payments and data security assessed together in a workplace situation.' }

);

/* ────────────────────────────────────────────────────────────────────────
   ITBK COVERAGE GAPS

   A per-criterion probe of the bank found four ITBK criteria with almost
   nothing behind them, and one — 4.1, entering receipts and payments into an
   analysed cash book — with nothing at all. Topic area 4 is a quarter of the
   Introduction to Bookkeeping assessment, and coding (1.3) is one of its
   named skills. All four have had lessons since v1.15.0; they had no
   practice.

   Every question below carries a `criteria` tag so the coverage guard in
   check-aat2-quality.js can prove the gap stays closed.
   ──────────────────────────────────────────────────────────────────────── */
window.ALL_QUESTIONS.push(

  /* ── ITBK-4.1  Enter receipts and payments into an analysed cash book ── */

  { id: 'itbk-401', topic: 'itbk', difficulty: 'medium', skill: 'itbk-cashbook', criteria: ['ITBK-4.1'],
    q: 'Till takings of £504, including VAT at 20%, are banked. Which figures are entered in the analysed cash book?',
    opts: [
      'Bank £504.00, cash sales £420.00, VAT £84.00',
      'Bank £504.00, cash sales £504.00, VAT £100.80',
      'Bank £420.00, cash sales £420.00, VAT £84.00',
      'Bank £588.00, cash sales £504.00, VAT £84.00',
    ], ans: 0,
    exp: 'The bank column takes the full £504 that moved. The analysis splits it: £504 ÷ 1.2 = £420 net to cash sales and £84 to VAT, which add across to £504. A cash sale creates its VAT at the moment the money arrives, because no invoice was raised earlier.' },

  { id: 'itbk-402', topic: 'itbk', difficulty: 'medium', skill: 'itbk-cashbook', criteria: ['ITBK-4.1'],
    q: 'A payment of £930 settles a purchase invoice for goods on which £155 of VAT had been charged. How is the payment analysed?',
    opts: [
      'The full £930 to a payables column, with no VAT analysed',
      'The full £930 to a purchases column, with no VAT analysed',
      '£775 to a payables column and £155 to the VAT column',
      '£775 to a purchases column and £155 to the VAT column',
    ], ans: 0,
    exp: 'The input tax went into the purchases day book when the invoice was entered. Analysing it again here would record the same VAT twice. The payment only converts a payable into cash, so it is analysed in full to payables — not to purchases, which was debited when the invoice arrived.' },

  { id: 'itbk-403', topic: 'itbk', difficulty: 'easy', skill: 'itbk-cashbook', criteria: ['ITBK-4.1'],
    q: 'Why does an analysed cash book keep a cash column and a bank column separate?',
    opts: [
      'They are two different resources, held in two places and counted in different ways',
      'The cash column records receipts and the bank column records payments',
      'Only the bank column is analysed; the cash column is entered in total',
      'VAT is analysed on movements through the bank account but never on movements of cash in hand',
    ], ans: 0,
    exp: 'Notes in a till and a balance at the bank are genuinely different resources. One can be plentiful while the other is short, each is verified differently, and a single combined figure answers neither question. Both sides of the book carry both columns, and both are analysed.' },

  { id: 'itbk-404', topic: 'itbk', difficulty: 'easy', skill: 'itbk-cashbook', criteria: ['ITBK-4.1'],
    q: 'Which document is the evidence behind an entry for cash and cheques taken to the bank?',
    opts: ['The paying-in slip', 'The cheque stub', 'The remittance advice', 'The goods received note'], ans: 0,
    exp: 'A paying-in slip is the business’s own record of what it banked. A cheque stub evidences a cheque written, a remittance advice arrives with a receipt and says which invoices it covers, and a goods received note belongs to the purchasing cycle rather than the cash book.' },

  { id: 'itbk-405', topic: 'itbk', difficulty: 'medium', skill: 'itbk-cashbook', criteria: ['ITBK-4.1'],
    q: 'A bookkeeper adds a row’s analysis columns together and enters the result in the bank column. What has gone wrong?',
    opts: [
      'The analysis breaks the payment down, so adding it to the payment doubles the entry',
      'The analysis columns should be entered before the bank column, not after it',
      'Nothing at all, provided that the VAT column has been excluded from the addition first',
      'Nothing, provided the row is later cross cast against the payments side',
    ], ans: 0,
    exp: 'Analysis columns split an amount; they never add to it. A payment of £144 analysed as £120 and £24 is one payment described in two parts, so the bank column shows £144. Adding the analysis to it records £288, and the row will not cross cast.' },

  { id: 'itbk-num-009', topic: 'itbk', difficulty: 'easy', type: 'numeric', unit: '£', skill: 'itbk-cashbook', criteria: ['ITBK-4.1'],
    q: 'A bank payment of £372 is analysed as £310 to motor expenses and the remainder to VAT. What figure, in £, goes in the VAT analysis column?',
    answer: 62,
    exp: '£372 − £310 = £62. The analysis columns must add across to the figure in the bank column, so the VAT column takes whatever is left once the net expense has been analysed.' },

  { id: 'tfq-018', topic: 'itbk', difficulty: 'medium', type: 'truefalse', skill: 'itbk-cashbook', criteria: ['ITBK-4.1'],
    q: 'Identify whether the following statements about the analysed cash book are true or false.',
    statements: [
      { text: 'VAT is analysed on a cash sale but not on a receipt settling a sales invoice.', answer: true },
      { text: 'The bank column holds the gross amount of a payment, VAT included.', answer: true },
      { text: 'A direct debit is entered in the cash book only once an invoice for it has arrived.', answer: false },
      { text: 'The analysis columns of a row should add across to the cash or bank figure for that row.', answer: true },
      { text: 'Wages paid by bank transfer are analysed between a net figure and VAT.', answer: false },
    ],
    exp: 'Two are false. A direct debit is recorded from the standing schedule or from the bank statement, because nothing arrives to prompt it — that is what makes it a recurring transaction. And wages are outside the scope of VAT, so there is nothing to split: the whole amount is analysed to wages.' },

  /* ── ITBK-4.3  Total and balance the cash book and petty cash book ───── */

  { id: 'itbk-406', topic: 'itbk', difficulty: 'medium', skill: 'itbk-cashbook', criteria: ['ITBK-4.3'],
    q: 'A three-column cash book cross casts exactly. What has this proved?',
    opts: [
      'That the columns have been added correctly, and nothing about which entries were made',
      'That every receipt and payment in the period has been entered in the book',
      'That each entry in the book has been analysed to the correct column on the correct side',
      'That the closing bank balance will agree with the bank statement',
    ], ans: 0,
    exp: 'Cross casting adds the same figures in a different order, so agreement proves the columns were added correctly and nothing more. It cannot see a receipt entered on the payments side, a figure transcribed wrongly, an entry against the wrong account, or a document left out — each of those leaves a set of internally consistent figures.' },

  { id: 'itbk-407', topic: 'itbk', difficulty: 'medium', skill: 'itbk-cashbook', criteria: ['ITBK-4.3'],
    q: 'A cash book fails to cross cast by £288, and £288 is the exact amount of one payment in the book. What is the most likely cause?',
    opts: [
      'That payment was entered in the bank column but omitted from the analysis',
      'That payment was entered on the receipts side instead of the payments side',
      'Two digits of that payment were transposed when it was written down',
      'The opening balance was brought down on the wrong side of the book',
    ], ans: 0,
    exp: 'A difference equal to one entry points at that entry appearing in one column and not another. A wrong-side entry shows as twice the amount, £576 here; a transposition gives a difference divisible by nine; and an opening balance is not part of the cross cast at all.' },

  { id: 'itbk-408', topic: 'itbk', difficulty: 'medium', skill: 'itbk-cashbook', criteria: ['ITBK-4.3'],
    q: 'A cash book fails to cross cast by £270. What does the size of that difference suggest?',
    opts: [
      'Two digits have been transposed somewhere, since the difference divides by nine',
      'An entry has been posted on the wrong side, since the difference divides by two',
      'An entry has been omitted entirely, since the difference is a round figure',
      'The VAT analysis has been calculated at the wrong rate on one row',
    ], ans: 0,
    exp: '£270 ÷ 9 = £30, and a difference divisible by nine is the signature of transposed digits: £1,240 written as £1,420 differs by £180, which also divides by nine. It is only a clue, not a proof, but it tells you which kind of error to look for first.' },

  { id: 'itbk-num-010', topic: 'itbk', difficulty: 'medium', type: 'numeric', unit: '£', skill: 'itbk-cashbook', criteria: ['ITBK-4.3'],
    q: 'A cash book shows opening cash in hand £112, cash receipts £638, cash payments £405, and separately opening bank £2,900 with bank receipts £1,450. What is the closing cash in hand, in £?',
    answer: 345,
    exp: '£112 + £638 = £750, less £405 = £345. Cash in hand is balanced from the cash column alone — the bank figures in the question belong to a separate calculation, and including them is the standard error in this task.' },

  { id: 'ms-013', topic: 'itbk', difficulty: 'hard', type: 'multiselect', selectCount: 2, skill: 'itbk-cashbook', criteria: ['ITBK-4.3'],
    q: 'Which TWO of the following errors would still be present in a cash book that cross casts perfectly?',
    opts: [
      'A supplier payment of £460 recorded on the receipts side of the book',
      'A sales invoice that was never entered in the cash book at all',
      'An analysis column that was added down incorrectly by £50',
      'A row whose analysis figures were written in the wrong two columns',
    ], answers: [0, 1],
    exp: 'Cross casting tests whether the analysis adds across to the cash and bank columns. A wrong-side entry and a wholly omitted document both leave that relationship intact, so neither shows up. A mis-added column breaks the cross cast, and so does a figure moved between columns on the same row.' },

  /* ── ITBK-4.4  Process recurring receipts and payments ───────────────── */

  { id: 'itbk-409', topic: 'itbk', difficulty: 'medium', skill: 'itbk-cashbook', criteria: ['ITBK-4.4'],
    q: 'A regular monthly payment to an energy supplier is a different amount every month. Which arrangement is this most likely to be, and why?',
    opts: [
      'A direct debit, because the recipient collects an amount that can vary',
      'A standing order, because the payer instructs the bank afresh each month',
      'A standing order, because the amount is reviewed before each collection',
      'A direct debit, because the payer authorises each collection individually',
    ], ans: 0,
    exp: 'A direct debit is an authority for the recipient to collect, and the amount they collect can vary. A standing order is an instruction from the payer for a fixed amount at set intervals, so a changing figure on one would be a genuine anomaly rather than a normal month.' },

  { id: 'itbk-410', topic: 'itbk', difficulty: 'medium', skill: 'itbk-cashbook', criteria: ['ITBK-4.4'],
    q: 'A direct debit was cancelled in June, but the accounting software has generated the monthly entry ever since. How does this normally come to light?',
    opts: [
      'The cash book will not agree with the bank statement, by the value of the entries',
      'The software will refuse to generate an entry once the mandate is cancelled',
      'The trial balance will fail to balance by the total value of the entries generated since June',
      'The supplier will issue a credit note for each payment not collected',
    ], ans: 0,
    exp: 'A generated entry is a prediction; the bank statement is the evidence. The cash book stays internally consistent and the trial balance still balances, because the entry was posted to both accounts — so the difference surfaces only at the bank reconciliation.' },

  { id: 'itbk-411', topic: 'itbk', difficulty: 'medium', skill: 'itbk-cashbook', criteria: ['ITBK-4.4'],
    q: 'Why is a coding error on a recurring entry treated as more serious than the same error on a one-off payment?',
    opts: [
      'It is reproduced every period until someone notices, and each copy looks legitimate',
      'It cannot be corrected by journal once the entry has been generated automatically',
      'It affects the figure in the bank column rather than only the analysis columns beside it',
      'It prevents the software from generating any further entries on that schedule',
    ], ans: 0,
    exp: 'The schedule is the defect, so it keeps producing the same wrong coding on time and in the right format every month. That is why the review of recurring transactions belongs on the setup — the amount, the coding and above all the end date — rather than on each generated entry.' },

  { id: 'itbk-num-011', topic: 'itbk', difficulty: 'medium', type: 'numeric', unit: '£', skill: 'itbk-cashbook', criteria: ['ITBK-4.4'],
    q: 'A monthly standing order for insurance is recorded at £240 in the cash book, but the bank has been paying £275 for the last five months. By how much, in £, is the insurance expense understated?',
    answer: 175,
    exp: '£275 − £240 = £35 a month, and 5 × £35 = £175. The cash book also overstates the bank balance by £175, which is where the error will surface. Correcting the five entries is only half the job: the schedule itself has to be amended or next month repeats it.' },

  /* ── ITBK-1.3  Create and use coding systems ─────────────────────────── */

  { id: 'itbk-412', topic: 'itbk', difficulty: 'medium', skill: 'itbk-docs', criteria: ['ITBK-1.3'],
    q: 'What does a general ledger code tell you that a customer account code does not?',
    opts: [
      'Which kind of transaction it was, and therefore which nominal account it lands in',
      'Which of the two ledgers the account belongs to, sales or purchases',
      'Which item was sold, so that sales by product line can be analysed',
      'Which member of staff entered the transaction, and the date on which they entered it',
    ], ans: 0,
    exp: 'A customer code says who owes the money; a general ledger code says what kind of transaction it was. A single sales invoice needs both. Identifying the item sold is the job of a product code, which is a third question again.' },

  { id: 'itbk-413', topic: 'itbk', difficulty: 'medium', skill: 'itbk-docs', criteria: ['ITBK-1.3'],
    q: 'A business wants supplier codes that show at a glance which ledger an account sits in and are still guaranteed unique. Which scheme meets both requirements?',
    opts: [
      'Alphanumerical, because letters carry the meaning and digits guarantee uniqueness',
      'Alphabetical, because the letters are taken directly from the supplier’s name',
      'Numerical, because a plain sequence can never produce two identical codes',
      'Alphabetical, because a readable code makes a miscoded entry considerably easier to spot',
    ], ans: 0,
    exp: 'Only the alphanumerical scheme does both jobs: SL-THO-04 announces the ledger and the name, and the digits stop two accounts colliding. Alphabetical codes cluster and break when a customer rebrands; numerical codes are unique but carry no information at all.' },

  { id: 'itbk-414', topic: 'itbk', difficulty: 'hard', skill: 'itbk-docs', criteria: ['ITBK-1.3'],
    q: 'A sales invoice for £840 is posted to the wrong customer account code. Why will the trial balance still agree?',
    opts: [
      'Two customer accounts are wrong by £840 in opposite directions, so the total is unchanged',
      'The error affects the receivables ledger, which is not part of the trial balance',
      'The general ledger code was correct, so the sales figure absorbs the difference',
      'A coding error is a one-sided entry, and every one-sided entry is cleared through the suspense account',
    ], ans: 0,
    exp: 'One customer is overstated by £840 and another understated by the same amount, so total receivables is untouched. That is why the error is invisible from any total, and why it surfaces only when the wrong customer is chased for money they never owed.' },

  { id: 'itbk-415', topic: 'itbk', difficulty: 'easy', skill: 'itbk-docs', criteria: ['ITBK-1.3'],
    q: 'Which record uses supplier account codes rather than customer account codes?',
    opts: [
      'The discounts received day book',
      'The discounts allowed day book',
      'The sales returns day book',
      'The receivables ledger and the individual accounts inside it',
    ], ans: 0,
    exp: 'The sales side and the purchases side mirror each other exactly. Discounts received, purchases, purchases returns and the payables ledger use supplier codes; discounts allowed, sales, sales returns and the receivables ledger use customer codes. Ask who issued the document and the side follows.' },

  { id: 'dd-021', topic: 'itbk', difficulty: 'medium', type: 'dragdrop', skill: 'itbk-docs', criteria: ['ITBK-1.3'],
    q: 'Match each type of code to what it identifies.',
    pairs: [
      { left: 'Customer account code', right: 'One credit customer' },
      { left: 'Supplier account code', right: 'One credit supplier' },
      { left: 'Product code', right: 'One item bought or sold' },
      { left: 'General ledger code', right: 'One nominal account, such as motor expenses' },
    ],
    exp: 'Four codes answering four different questions: who owes us, who we owe, which item, and what kind of transaction. A single sales invoice can carry three of them at once, and each one directs a different part of the entry.' }

);

/* ────────────────────────────────────────────────────────────────────────
   POBC COVERAGE GAPS — the trial balance

   Learning outcome 4 of Principles of Bookkeeping Controls is extracting an
   initial trial balance and redrafting it after adjustments. The bank had two
   questions on 4.1 and none at all on 4.2, while carrying twenty-two on the
   types of error — the diagnosis was well practised and the two tasks either
   side of it were not.
   ──────────────────────────────────────────────────────────────────────── */
window.ALL_QUESTIONS.push(

  /* ── POBC-4.1  Extract an initial trial balance ──────────────────────── */

  { id: 'pobc-401', topic: 'pobc', difficulty: 'easy', skill: 'pobc-tb', criteria: ['POBC-4.1'],
    q: 'What kind of document is a trial balance?',
    opts: [
      'A working schedule extracted from the ledger, outside the double entry itself',
      'A financial statement presented to the owners alongside the profit figure',
      'A book of prime entry in which balances are first recorded before posting',
      'A ledger account in its own right, which is opened and closed at each period end',
    ], ans: 0,
    exp: 'It is a two-column list of the general ledger balances at a date, drawn up to prove the ledger adds up. Nothing is posted to it and nothing is posted from it, which is why an error can exist in the ledger while the trial balance agrees perfectly.' },

  { id: 'pobc-402', topic: 'pobc', difficulty: 'medium', skill: 'pobc-tb', criteria: ['POBC-4.1'],
    q: 'In which column of the trial balance does the sales returns account appear?',
    opts: [
      'Debit, because a return reverses part of an entry that was originally a credit',
      'Credit, because sales returns belong to exactly the same category of account as sales',
      'Debit, because sales returns reduce the amount owed by the credit customer',
      'Credit, because the account records income that the business has given back',
    ], ans: 0,
    exp: 'Sales are income and carry a credit balance, so reducing them takes a debit — sales returns is a debit balance even though sales is a credit. Drawings work the same way: they reduce capital, and reducing a credit balance takes a debit.' },

  { id: 'pobc-403', topic: 'pobc', difficulty: 'medium', skill: 'pobc-tb', criteria: ['POBC-4.1'],
    q: 'The sales ledger control account has a credit balance of £340 because two customers have overpaid. How is it entered in the trial balance?',
    opts: [
      '£340 in the credit column, because a balance is entered where it actually is',
      '£340 in the debit column, because the account is an asset by its nature',
      'As £340 shown in brackets in the debit column, to signal that it has reversed',
      'It is omitted, because a control account cannot carry a credit balance',
    ], ans: 0,
    exp: 'Put the balance where it is, not where it usually sits. The sales ledger control account is normally a debit, but customer overpayments can turn it into a credit, and it then belongs in the credit column as an ordinary positive figure. Never enter a negative or a bracketed number.' },

  { id: 'pobc-404', topic: 'pobc', difficulty: 'medium', skill: 'pobc-tb', criteria: ['POBC-4.1'],
    q: 'While extracting a trial balance, a bookkeeper copies the £96,400 total of the purchases account instead of its £18,200 balance brought down. What is the consequence?',
    opts: [
      'The debit column is overstated by £78,200 and the trial balance will not agree',
      'The trial balance still agrees, because both sides of the account totalled £96,400',
      'The purchases figure is right but the period it belongs to is wrong',
      'Nothing, provided the same treatment is applied to every other ledger account',
    ], ans: 0,
    exp: '£96,400 − £18,200 = £78,200 too much in the debit column. The total of an account is just the sum of the entries on one side and means nothing outside the account; only the balance brought down belongs in a trial balance. Copying the total is the commonest error in this task.' },

  { id: 'pobc-num-007', topic: 'pobc', difficulty: 'medium', type: 'numeric', unit: '£', skill: 'pobc-tb', criteria: ['POBC-4.1'],
    q: 'An initial trial balance has debits of £186,450 and credits of £187,290. What balancing figure, in £, must be entered as suspense so the trial balance can be completed?',
    answer: 840,
    exp: '£187,290 − £186,450 = £840, entered in the smaller column — here the debit column — and described as suspense. That lets the trial balance be completed and the work carried on, and the balance is then investigated and cleared by journal.' },

  { id: 'tfq-019', topic: 'pobc', difficulty: 'medium', type: 'truefalse', skill: 'pobc-tb', criteria: ['POBC-4.1'],
    q: 'Identify whether the following statements about extracting an initial trial balance are true or false.',
    statements: [
      { text: 'An account showing a nil balance is left out of the trial balance.', answer: true },
      { text: 'A trial balance that agrees proves every transaction was posted to the correct account.', answer: false },
      { text: 'The figure taken into the trial balance is the balance brought down, not the account total.', answer: true },
      { text: 'A credit balance may be entered as a negative figure in the debit column.', answer: false },
      { text: 'An initial trial balance is drawn up before any corrections are made.', answer: true },
    ],
    exp: 'Two are false. Agreement proves only that each debit posted had an equal credit, which is why errors of commission, principle and omission survive it untouched. And a credit balance is entered as a positive figure in the credit column — negative numbers and brackets both lose the mark in a computer-marked task.' },

  /* ── POBC-4.2  Redraft the trial balance following adjustments ───────── */

  { id: 'pobc-405', topic: 'pobc', difficulty: 'medium', skill: 'pobc-tb', criteria: ['POBC-4.2'],
    q: 'Wages has a debit balance of £31,450. A journal credits wages with £900. What is the redrafted balance?',
    opts: [
      '£30,550 debit, because a credit journal is on the opposite side to the balance',
      '£32,350 debit, because the journal is added to the balance already in the account',
      '£900 credit, because the journal replaces the balance that was there before',
      '£30,550 credit, because the side of the balance follows the side of the journal',
    ], ans: 0,
    exp: '£31,450 − £900 = £30,550, still a debit. A journal on the same side as the balance increases it and one on the opposite side decreases it, and that single rule holds for every account type. The balance only changes sides if the journal is larger than the balance.' },

  { id: 'pobc-406', topic: 'pobc', difficulty: 'hard', skill: 'pobc-tb', criteria: ['POBC-4.2'],
    q: 'The VAT control account has a credit balance of £1,780 and a journal debits it with £2,140. How does it appear in the redrafted trial balance?',
    opts: [
      '£360 in the debit column, because the journal exceeded the balance it reduced',
      '£360 in the credit column, because a control account keeps the side it started on',
      '£3,920 in the credit column, because the debit journal adds to the liability',
      'It is omitted, because a debit balance on a VAT account cannot arise',
    ], ans: 0,
    exp: '£2,140 − £1,780 = £360, and the debit has overtaken the credit, so the balance crosses over and moves to the other column. A VAT debit balance is perfectly ordinary — it means HMRC owes the business a refund. Forcing the figure back to the side it started on is the error to avoid.' },

  { id: 'pobc-407', topic: 'pobc', difficulty: 'medium', skill: 'pobc-tb', criteria: ['POBC-4.2'],
    q: 'A redrafted trial balance still shows a suspense balance of £250. What does this tell you?',
    opts: [
      'An error has not been found, or a journal has been posted to one account only',
      'The suspense account has been correctly cleared and £250 is the rounding',
      'The financial statements may be prepared, provided that the £250 is disclosed in them',
      'The initial trial balance must be extracted again from the ledger accounts',
    ], ans: 0,
    exp: 'A correctly redrafted trial balance contains no suspense at all. A live suspense balance is an admission that something is still unexplained, and it is the first thing a reviewer or auditor looks for. Relabelling the difference rather than finding it leaves the error in the accounts.' },

  { id: 'pobc-408', topic: 'pobc', difficulty: 'hard', skill: 'pobc-tb', criteria: ['POBC-4.2'],
    q: 'A redrafted trial balance is out by exactly the amount of one of the journals given. What is the most likely cause?',
    opts: [
      'That journal was posted to one of its two accounts and not to the other',
      'That journal was applied to the wrong side of the account it affected',
      'Two digits were transposed while copying an untouched balance across the page',
      'The suspense account was cleared before the journals had been applied',
    ], ans: 0,
    exp: 'A one-sided posting throws the redraft out by exactly the journal amount. Applying a journal to the wrong side throws it out by exactly twice that amount, which is the other recognisable signature, and a transposition gives a difference divisible by nine.' },

  { id: 'pobc-num-008', topic: 'pobc', difficulty: 'medium', type: 'numeric', unit: '£', skill: 'pobc-tb', criteria: ['POBC-4.2'],
    q: 'The purchases ledger control account has a credit balance of £24,600. Two journals affect it: one credits it with £1,150 and one debits it with £480. What is the redrafted balance, in £?',
    answer: 25270,
    exp: '£24,600 + £1,150 = £25,750, then − £480 = £25,270 credit. The credit journal is on the same side as the balance so it increases it; the debit journal is on the opposite side so it reduces it. Apply the journals one at a time and write down each new figure.' },

  { id: 'ms-014', topic: 'pobc', difficulty: 'medium', type: 'multiselect', selectCount: 2, skill: 'pobc-tb', criteria: ['POBC-4.2'],
    q: 'A redrafted trial balance does not agree. Which TWO checks should be made first?',
    opts: [
      'That every journal was posted to both of the accounts it names',
      'That each journal was applied to the correct side of the account it affects',
      'That the initial trial balance was extracted from the correct ledger accounts',
      'That the suspense balance in the initial trial balance was entered in the smaller column',
    ], answers: [0, 1],
    exp: 'The journals you were given were balanced when you received them, so a redraft that disagrees is a fault in your own working. Both halves posted, and each half on the right side, account for nearly every case. The initial trial balance and its suspense figure were settled before the redraft began.' },

  { id: 'sc-054', topic: 'pobc', difficulty: 'hard', type: 'scenario', skill: 'pobc-tb', criteria: ['POBC-4.1', 'POBC-4.2'],
    setup: 'Halstead Joinery is a sole trader. At 31 May the general ledger shows these balances: Bank £3,140 debit; Sales ledger control account £22,480 debit; Purchases £51,900 debit; Wages £28,650 debit; Drawings £7,200 debit; Purchases ledger control account £14,720 credit; VAT control account £3,860 credit; Sales £70,000 credit; Capital £25,000 credit. Two errors are then found: a page of the wages account was undercast by £180, and the credit side of the VAT control account was overcast by £30.',
    parts: [
      { type: 'mcq', q: 'What balancing figure must be entered to complete the initial trial balance?',
        opts: [
          '£210 in the debit column, described as suspense',
          '£210 in the credit column, described as suspense',
          '£420 in the debit column, described as suspense',
          'None — the two columns already agree at £113,370',
        ], ans: 0,
        exp: 'Debits total £113,370 and credits £113,580, so credits exceed debits by £210. The balancing figure goes in the smaller column — the debit column — and the trial balance is completed at £113,580.' },
      { type: 'mcq', q: 'Which journal corrects the undercast wages account?',
        opts: [
          'Dr Wages £180, Cr Suspense £180',
          'Cr Wages £180, Dr Suspense £180',
          'Dr Wages £180, Cr Bank £180',
          'Dr Suspense £180, Cr Bank £180',
        ], ans: 0,
        exp: 'An undercast debit balance is too small, so it needs a further debit of £180. The other half goes to suspense, because the original error was one-sided and suspense is where that missing side has been parked.' },
      { type: 'numeric', q: 'What is the redrafted balance on the wages account?', answer: 28830, unit: '£',
        exp: '£28,650 + £180 = £28,830 debit. The journal debits wages, which is the same side as the existing balance, so the balance increases.' },
      { type: 'numeric', q: 'What is the redrafted balance on the VAT control account?', answer: 3830, unit: '£',
        exp: '£3,860 − £30 = £3,830 credit. The credit side was overcast by £30, so the correcting journal debits VAT control — the opposite side to the balance — and reduces it.' },
      { type: 'numeric', q: 'What is the total of each column of the redrafted trial balance?', answer: 113550, unit: '£',
        exp: 'Debits become £3,140 + £22,480 + £51,900 + £28,830 + £7,200 = £113,550. Credits become £14,720 + £3,830 + £70,000 + £25,000 = £113,550. The two agree and suspense has cleared to nil, which is the signal that both corrections were complete.' },
      { type: 'mcq', q: 'Why is the redrafted total lower than the initial total of £113,580?',
        opts: [
          'The suspense figure was never a real balance, and it is no longer in the list',
          'Two of the corrections reduced expenses, so the debit column had to fall',
          'The drawings account is excluded from a redrafted trial balance',
          'The redrafted trial balance is stated after deducting the profit for the period',
        ], ans: 0,
        exp: 'The initial total included £210 of suspense, which existed only to make the columns agree. Once the errors are corrected the suspense line disappears, so the redrafted total is not expected to match the initial one.' },
    ],
    exp: 'The whole of Principles of Bookkeeping Controls outcome 4 in one task: extract, balance with suspense, journal the corrections, recalculate each affected account, and redraft with suspense at nil.' }

);

/* ────────────────────────────────────────────────────────────────────────
   POC COVERAGE GAPS

   Six of the fifteen Principles of Costing criteria had one or two questions
   behind them, and two had none. The worst of it was learning outcome 4,
   spreadsheets, which is a tenth of the assessment and is marked mechanically
   on the contents of the cells: the bank contained nothing on it whatever.
   Labour payments (2.2) is a calculation criterion and had a single question.
   ──────────────────────────────────────────────────────────────────────── */
window.ALL_QUESTIONS.push(

  /* ── POC-2.2  Calculate labour payments ─────────────────────────────── */

  { id: 'poc-401', topic: 'poc', difficulty: 'easy', skill: 'poc-labour', criteria: ['POC-2.2'],
    q: 'An employee is paid a basic rate of £14 per hour and overtime is paid at time and a half. What is the overtime premium per hour?',
    opts: [
      '£7, the extra paid above the basic rate',
      '£21, the whole of the rate paid for an overtime hour',
      '£14, the basic rate that applies to every hour worked',
      '£3.50, half of the difference between the two rates paid',
    ], ans: 0,
    exp: 'Time and a half on £14 gives an overtime rate of £21, made up of £14 of basic pay and a £7 premium. The premium is the extra above basic, not the whole overtime rate, and it is multiplied by overtime hours only.' },

  { id: 'poc-num-011', topic: 'poc', difficulty: 'medium', type: 'numeric', unit: '£', skill: 'poc-labour', criteria: ['POC-2.2'],
    q: 'An employee works a basic week of 37 hours at £13 per hour, plus 6 hours of overtime paid at time and a half. What is the gross pay, in £?',
    answer: 598,
    exp: 'Basic: 37 × £13 = £481. Overtime rate is £13 × 1.5 = £19.50, so 6 × £19.50 = £117. Gross pay is £481 + £117 = £598, of which £39 is overtime premium (6 × £6.50). Set each element out separately, because marks are usually available for each.' },

  { id: 'poc-num-012', topic: 'poc', difficulty: 'medium', type: 'numeric', unit: '£', skill: 'poc-labour', criteria: ['POC-2.2'],
    q: 'A worker is paid £1.15 per unit under a piecework scheme with a guaranteed minimum weekly wage of £460. In a week when 380 units are produced, what is the wage payable, in £?',
    answer: 460,
    exp: 'Piecework earnings are 380 × £1.15 = £437, which is below the guaranteed minimum. The employee receives the higher of the two figures, so the wage is £460. A question that gives you a guaranteed minimum is testing whether you calculated both and compared them.' },

  { id: 'poc-num-013', topic: 'poc', difficulty: 'hard', type: 'numeric', unit: '£', skill: 'poc-labour', criteria: ['POC-2.2'],
    q: 'A differential piecework scheme pays £0.90 per unit for the first 200 units in a week and £1.20 per unit for every unit above 200. An employee produces 260 units. What is their pay, in £?',
    answer: 252,
    exp: 'The first 200 units earn 200 × £0.90 = £180, and the 60 units above the threshold earn 60 × £1.20 = £72. Total pay is £252. Applying the higher rate to all 260 units would give £312, and that is the error the scheme description is written to catch.' },

  { id: 'poc-402', topic: 'poc', difficulty: 'medium', skill: 'poc-labour', criteria: ['POC-2.2'],
    q: 'In a differential piecework scheme, how is the higher rate per unit applied?',
    opts: [
      'Only to the units produced above the threshold',
      'To every unit produced once the threshold has been passed',
      'To every unit produced, but only in weeks when the threshold is met',
      'To the units below the threshold, with the lower rate applied above it',
    ], ans: 0,
    exp: 'The scheme rewards output beyond a target, so only the units beyond it earn the higher rate. Applying it retrospectively to the whole week overstates the wage, and it is the commonest and most expensive error in this calculation.' },

  { id: 'poc-403', topic: 'poc', difficulty: 'hard', skill: 'poc-labour', criteria: ['POC-2.2'],
    q: 'A production worker’s wage includes basic pay, overtime basic pay and an overtime premium. Which element is normally treated as an overhead rather than a direct cost?',
    opts: [
      'The overtime premium, but not the basic pay for the overtime hours',
      'The overtime premium together with the basic pay for the overtime hours',
      'The whole of the overtime payment, the premium and the basic pay alike',
      'None of it, since a production worker’s wage is a direct cost throughout',
    ], ans: 0,
    exp: 'Basic pay for overtime hours is a direct cost like any other hour worked. The premium is usually treated as a production overhead, because it arises from the general need to meet demand rather than from the particular job that happened to be running late.' },

  { id: 'poc-404', topic: 'poc', difficulty: 'hard', skill: 'poc-labour', criteria: ['POC-2.2'],
    q: 'A customer asks for a rush order and agrees to pay for the overtime it requires. How is the overtime premium treated?',
    opts: [
      'As a direct cost of that job, because it is traceable to it',
      'As a production overhead, because premiums are always indirect costs',
      'As an administrative overhead, because the customer requested it in writing',
      'As a direct cost of the period, spread over every job worked on that week',
    ], ans: 0,
    exp: 'This is the exception to the usual treatment. Where overtime was worked at a customer’s specific request, the premium is caused by that job and can be traced to it, so it is a direct cost of the job rather than an overhead of the factory.' },

  { id: 'poc-405', topic: 'poc', difficulty: 'medium', skill: 'poc-labour', criteria: ['POC-2.2'],
    q: 'For costing purposes, what is the important difference between time-rate pay and piecework?',
    opts: [
      'Time rate varies with hours worked; piecework varies with units produced',
      'Time rate is a fixed cost, whereas piecework is a variable cost of output',
      'Time rate is a direct cost, whereas piecework is always an indirect cost',
      'Time rate is paid weekly and piecework is paid at the end of the month',
    ], ans: 0,
    exp: 'Time-rate pay is variable with the hours worked but not with output — two employees on the same rate for the same hours cost the same whether one made twice as much. Piecework makes labour a genuinely variable cost of output, because the payment follows the units.' },

  { id: 'tfq-020', topic: 'poc', difficulty: 'medium', type: 'truefalse', skill: 'poc-labour', criteria: ['POC-2.2'],
    q: 'Identify whether the following statements about labour payments are true or false.',
    statements: [
      { text: 'A guaranteed minimum means the employee receives the higher of their piecework pay and the minimum.', answer: true },
      { text: 'The overtime premium is calculated on all hours worked in the week.', answer: false },
      { text: 'A time-rate scheme gives no direct financial incentive to produce more units.', answer: true },
      { text: 'A team bonus is shared between the members of the team.', answer: true },
      { text: 'Piecework removes the need to record the hours an employee worked.', answer: false },
    ],
    exp: 'Two are false. The premium is multiplied by overtime hours only — applying it to the whole week is exactly what the formula is written to prevent. And hours are still recorded under piecework: they are needed for the guaranteed minimum comparison, for absorbing overheads on a labour-hour basis, and to comply with working-time records.' },

  /* ── POC-1.3  Costing and financial accounting systems ──────────────── */

  { id: 'poc-406', topic: 'poc', difficulty: 'medium', skill: 'poc-systems', criteria: ['POC-1.3'],
    q: 'A business reports a unit cost of £14.00 internally but values the same inventory at a different figure in its published accounts. What is the correct explanation?',
    opts: [
      'Both figures are right, because the two systems answer different questions under different rules',
      'The internal figure is wrong, because published accounts are prepared to a statutory standard',
      'The published figure is wrong, because the costing system holds the more detailed analysis',
      'One of the two systems must have failed to record a transaction that the other one has already recorded',
    ], ans: 0,
    exp: 'The two systems record the same transactions and then do different things with them. Financial accounting must follow prescribed rules for an external audience; costing analyses the same costs however a decision requires. Neither figure is wrong, and the transactions behind them are identical.' },

  { id: 'poc-407', topic: 'poc', difficulty: 'medium', skill: 'poc-systems', criteria: ['POC-1.3'],
    q: 'Which of the two systems may work with budgeted figures as well as actual ones?',
    opts: [
      'Costing only, because financial accounting is restricted to historic cost',
      'Financial accounting only, because a statutory format requires a comparative',
      'Both, provided the budgeted figures are clearly labelled as estimates',
      'Neither, because a cost must be evidenced by a document before it is recorded',
    ], ans: 0,
    exp: 'Financial accounting uses historic cost only — published accounts describing what a business hoped to spend would be worthless. Costing may use actual, standard or budgeted figures, which is what lets it quote a price before the work has been done. An answer of "both" is wrong.' },

  { id: 'poc-408', topic: 'poc', difficulty: 'medium', skill: 'poc-systems', criteria: ['POC-1.3'],
    q: 'Why must the costing records and the financial ledger reconcile to each other?',
    opts: [
      'They analyse the same transactions, so a difference proves an inconsistent classification',
      'Accounting standards require a reconciliation statement to be filed each year',
      'The costing system posts its totals into the financial ledger at each period end',
      'A management report has to be signed off by the external auditor before it can be issued to managers',
    ], ans: 0,
    exp: 'A business does not record its transactions twice. The same invoices, payslips and bank entries feed both systems, so total costs analysed in the costing records should agree with total costs in the ledger. A gap means something has been classified one way in one system and another way in the other.' },

  { id: 'poc-409', topic: 'poc', difficulty: 'medium', skill: 'poc-systems', criteria: ['POC-1.3'],
    q: 'Which statement correctly contrasts the output of the two systems?',
    opts: [
      'Financial accounting has a prescribed annual format; costing has whatever format is useful',
      'Financial accounting reports monthly; costing reports once at the end of the year',
      'Financial accounting analyses costs by product, whereas costing analyses them by whole entity',
      'Financial accounting is optional for a sole trader; costing is required by statute',
    ], ans: 0,
    exp: 'Financial accounting is external, statutory, historic and prescribed in format, and it treats the business as a single entity. Costing is internal, voluntary in form, produced as often as managers want it, and analyses down to products, jobs, centres and units.' },

  { id: 'poc-410', topic: 'poc', difficulty: 'hard', skill: 'poc-systems', criteria: ['POC-1.3'],
    q: 'A job carries a budgeted cost of £2,400 and an actual cost of £2,650. What is the £250 difference called, and when was each figure determined?',
    opts: [
      'A variance — the budget was set before the work, the actual after it',
      'A variance — both figures are determined after the work has been completed',
      'A timing difference — the actual figure will catch up in the next period',
      'A rounding difference — a budgeted cost is never expected to be exact',
    ], ans: 0,
    exp: 'The budget comes first in time and is agreed in advance, which is what makes it a standard to measure against. The actual is what the job genuinely cost once the figures were in. The difference between the two is a variance, and it is the basis of cost control.' },

  /* ── POC-1.4  Sources of information on income and expenditure ──────── */

  { id: 'poc-411', topic: 'poc', difficulty: 'easy', skill: 'poc-systems', criteria: ['POC-1.4'],
    q: 'Which document shows the quantity of materials issued to a particular job and what those materials cost?',
    opts: [
      'The materials requisition, supported by the stores record',
      'The supplier statement, supported by the remittance advice',
      'The purchase order, supported by the supplier’s price list',
      'The goods received note, supported by the delivery note',
    ], ans: 0,
    exp: 'A materials requisition is the authority to take materials out of stores for a job, so it records quantity and destination, and the stores record carries the cost at which they were issued. A purchase order and a goods received note concern buying materials, not issuing them to work.' },

  { id: 'poc-412', topic: 'poc', difficulty: 'medium', skill: 'poc-systems', criteria: ['POC-1.4'],
    q: 'Where would you establish the total production overhead for a period?',
    opts: [
      'From the invoices, standing orders and direct debits that pay the indirect costs',
      'From the timesheets and job cards completed by production employees',
      'From the materials requisitions raised by the production department',
      'From the approved budget, because indirect overheads cannot be measured after the event',
    ], ans: 0,
    exp: 'Production overhead is built from the documents behind each indirect cost — the invoices for rent, rates, power and insurance, and the standing orders and direct debits that pay them. Timesheets and requisitions evidence direct labour and direct materials instead, and the budget records what was expected rather than what happened.' },

  { id: 'poc-413', topic: 'poc', difficulty: 'medium', skill: 'poc-systems', criteria: ['POC-1.4'],
    q: 'A manager asks what a job was quoted at and what it was invoiced for. Which sources answer the two halves of that question?',
    opts: [
      'The quotation for the first, and the sales invoice or sales day book for the second',
      'The published price list for the first, and the customer’s remittance advice for the second',
      'The job card for the first, and the materials requisition for the second',
      'The approved budget for the first, and the bank statement for the second',
    ], ans: 0,
    exp: 'A quotation records what was promised to the customer, which is why it matters where a job is priced individually. What was actually charged comes from the sales invoice, and the sales day book if you want the period total. A remittance advice only evidences payment.' },

  { id: 'poc-414', topic: 'poc', difficulty: 'medium', skill: 'poc-systems', criteria: ['POC-1.4'],
    q: 'Which statement about a budgeted cost is correct?',
    opts: [
      'It is agreed in advance and is not revised once the period has started',
      'It is a forecast prepared after the period using the actual figures',
      'It becomes the historic cost once the period has closed and been recorded',
      'It must be evidenced by a supplier document before it can be used',
    ], ans: 0,
    exp: 'A budgeted cost is what the business expected, agreed before the period began. That is precisely what makes it a standard to measure performance against — a figure adjusted during the period would measure nothing. It is the actual cost that becomes the historic cost once recorded.' },

  { id: 'poc-415', topic: 'poc', difficulty: 'medium', skill: 'poc-systems', criteria: ['POC-1.4'],
    q: 'Asked for the direct labour cost of job 417, a trainee answers "the payroll". Why is that not good enough?',
    opts: [
      'The payroll gives total pay, not the hours attributed to any individual job',
      'The payroll is a confidential record that the costing system may not access',
      'The payroll is prepared monthly, and job costs must be calculated weekly',
      'The payroll excludes overtime, which is where most job labour cost arises',
    ], ans: 0,
    exp: 'The question asks for a named document that ties hours to a job — the job card or the timesheet. The payroll records what each employee was paid in total, which is the right source for gross pay and the wrong source for the labour cost of one job.' },

  { id: 'dd-022', topic: 'poc', difficulty: 'medium', type: 'dragdrop', skill: 'poc-systems', criteria: ['POC-1.4'],
    q: 'Match each cost or income figure to the source that evidences it.',
    pairs: [
      { left: 'Direct materials issued to a job', right: 'Materials requisition' },
      { left: 'Direct labour hours on a job', right: 'Timesheet or job card' },
      { left: 'Rent charged for the period', right: 'Supplier invoice' },
      { left: 'Revenue earned and from whom', right: 'Sales invoice' },
    ],
    exp: 'Nothing in a costing system is invented; every figure traces back to a document. Naming the right one is what a task means by identifying a source of information, and "the payroll" or "the ledger" is too broad to earn the mark.' },

  /* ── POC-3.2  Exception reporting ────────────────────────────────────── */

  { id: 'poc-416', topic: 'poc', difficulty: 'medium', skill: 'poc-budget', criteria: ['POC-3.2'],
    q: 'Who decides which variances are significant enough to appear on an exception report?',
    opts: [
      'The organisation, through a policy the accountant then applies consistently',
      'The accountant, using judgement about each variance as it arises',
      'The budget holder whose department the variance has arisen in',
      'The external auditor, as part of the annual review of the statutory accounts and records',
    ], ans: 0,
    exp: 'The specification wording is "identify significant variances according to an organisation’s policy". A task will give you the policy and expect you to apply it consistently, including to variances you might personally think unimportant. Deciding case by case is exactly what a policy exists to prevent.' },

  { id: 'poc-num-014', topic: 'poc', difficulty: 'medium', type: 'numeric', unit: '%', skill: 'poc-budget', criteria: ['POC-3.2'],
    q: 'Materials were budgeted at £64,000 and cost £67,200. What is the variance as a percentage of budget?',
    answer: 5,
    exp: 'The variance is £67,200 − £64,000 = £3,200 adverse, and £3,200 ÷ £64,000 × 100 = 5%. The denominator is always the budget, because the budget is the standard being measured against — dividing by the actual gives a different answer and is marked wrong.' },

  { id: 'poc-417', topic: 'poc', difficulty: 'medium', skill: 'poc-budget', criteria: ['POC-3.2'],
    q: 'Why does exception reporting use percentages rather than pound amounts?',
    opts: [
      'A single threshold can then be applied across departments of very different sizes',
      'Percentages are easier to calculate than the underlying pound variances',
      'A percentage removes the need to state whether a variance is adverse',
      'Pound variances cannot be compared with a budgeted figure once the period has closed',
    ], ans: 0,
    exp: 'A £1,800 variance is trivial against a £400,000 budget and alarming against a £6,000 one, so a policy of investigating anything over 5% cannot be applied to pound figures. The percentage makes the rule portable — and the adverse or favourable label still has to be attached.' },

  { id: 'poc-418', topic: 'poc', difficulty: 'hard', skill: 'poc-budget', criteria: ['POC-3.2'],
    q: 'A business investigates any variance above 5% of budget. Rent was budgeted at £12,000 and cost £12,900. What should happen?',
    opts: [
      'It is investigated, because the variance is 7.5% of budget',
      'It is not investigated, because the variance is 7.0% of budget',
      'It is not investigated, because £900 is small in relation to total costs',
      'It is investigated, because any adverse variance breaches the policy',
    ], ans: 0,
    exp: '£12,900 − £12,000 = £900 adverse, and £900 ÷ £12,000 × 100 = 7.5%, which is above the threshold. The size of the pound figure is irrelevant once a percentage policy is in force, and a favourable variance above the threshold would be investigated too.' },

  { id: 'poc-419', topic: 'poc', difficulty: 'hard', skill: 'poc-budget', criteria: ['POC-3.2'],
    q: 'What is the main weakness of reporting only variances above a threshold?',
    opts: [
      'A small variance repeated every month, or two that offset, can pass unnoticed',
      'It takes longer to prepare than a report showing every variance in full',
      'It cannot be applied where a budget has been flexed to actual activity',
      'It reports favourable variances that managers have no particular reason to investigate',
    ], ans: 0,
    exp: 'Each month the variance is below the threshold, so nothing is reported, and a persistent problem accumulates unseen. A pair of offsetting variances can hide the same way. That is why a good exception report shows trends as well as single periods.' },

  { id: 'ms-015', topic: 'poc', difficulty: 'hard', type: 'multiselect', selectCount: 2, skill: 'poc-budget', criteria: ['POC-3.2'],
    q: 'A business investigates any variance above 5% of budget. Which TWO of the following would appear on the exception report?',
    opts: [
      'Materials: budget £48,000, actual £50,600',
      'Rent: budget £12,000, actual £12,900',
      'Labour: budget £36,000, actual £34,700',
      'Power: budget £4,000, actual £4,180',
    ], answers: [0, 1],
    exp: 'Materials is £2,600 adverse, 5.4% of budget, and rent is £900 adverse, 7.5% — both above the threshold. Labour is £1,300 favourable at 3.6% and power £180 adverse at 4.5%, so neither is reported. Calculate every percentage first, then apply the rule.' },

  /* ── POC-4.1  Enter and format data ─────────────────────────────────── */

  { id: 'poc-420', topic: 'poc', difficulty: 'easy', skill: 'poc-ss', criteria: ['POC-4.1'],
    q: 'A task says to enter the budgeted material cost in cell D7 and you enter it correctly in cell D8. What is the result?',
    opts: [
      'No mark, because the outcome is marked on the contents of the specified cell',
      'Full marks, because the figure entered is arithmetically correct',
      'Partial marks, provided that all of the surrounding column headings are correct',
      'No mark, but only if a formula elsewhere refers to cell D7',
    ], ans: 0,
    exp: 'Learning outcome 4 is marked by the computer against what is actually in the cells named by the task. Accuracy in the right cell is the whole mark, and a correct figure in the wrong cell scores nothing however sound the working behind it.' },

  { id: 'poc-421', topic: 'poc', difficulty: 'medium', skill: 'poc-ss', criteria: ['POC-4.1'],
    q: 'A figure of four thousand two hundred pounds is typed into a cell as "£4,200". What has gone wrong?',
    opts: [
      'The entry becomes text, so it cannot be added and every dependent formula fails',
      'The entry is rounded to the nearest thousand and displays as £4,000',
      'Nothing, provided the cell is later formatted with a thousand separator',
      'Nothing, provided the currency symbol matches the one used in the column headings',
    ], ans: 0,
    exp: 'Type the number and nothing else: 4200. A currency symbol or a thousand separator typed into the cell makes the entry text rather than a number, and a text entry breaks every calculation that references it. Both are formats, applied to the cell afterwards.' },

  { id: 'poc-422', topic: 'poc', difficulty: 'hard', skill: 'poc-ss', criteria: ['POC-4.1'],
    q: 'A cell contains the value 3.5, being a variance the task asked for as a percentage. Percentage format is then applied. What does the cell display?',
    opts: [
      '350%, because percentage format multiplies the underlying value by 100',
      '3.5%, because percentage format simply adds a per-cent sign to the value',
      '0.035%, because percentage format divides the underlying value by 100',
      '35%, because percentage format shifts the decimal point one place',
    ], ans: 0,
    exp: 'Percentage format displays the value × 100, so the cell must hold the ratio 0.035 rather than the percentage 3.5. Calculate the ratio and let the format do the multiplication, or the schedule reports a 350% variance where 3.5% was meant.' },

  { id: 'poc-423', topic: 'poc', difficulty: 'medium', skill: 'poc-ss', criteria: ['POC-4.1'],
    q: 'How should a negative figure be entered into a cell?',
    opts: [
      'With a minus sign, since brackets are a format rather than typed characters',
      'In brackets, since that is the convention every set of accounts follows',
      'As a positive figure, with the negative applied by accountancy format',
      'With a minus sign and brackets together, so that the sign cannot be missed by a reader',
    ], ans: 0,
    exp: 'Type −4200. Brackets round a negative are a display convention applied to the cell by accountancy format, not characters you type in. Typing them makes the entry text, which is the same defect as typing a currency symbol.' },

  { id: 'poc-424', topic: 'poc', difficulty: 'easy', skill: 'poc-ss', criteria: ['POC-4.1'],
    q: 'A task asks you to make the title of a cost schedule span columns A to D and centre it. Which format does this?',
    opts: [
      'Merge, which joins the selected cells into one',
      'Wrap text, which spreads a long label across the columns',
      'Fill colour, which shades the range so it reads as a heading',
      'Borders, which draws a line around the whole range of cells',
    ], ans: 0,
    exp: 'Merge joins cells so a heading spans several columns, and "merge cells A1 to D1 and centre the title" is the wording a task uses. Wrap text does something different: it makes a long label display on several lines inside its own cell.' },

  { id: 'poc-425', topic: 'poc', difficulty: 'medium', skill: 'poc-ss', criteria: ['POC-4.1'],
    q: 'What does accountancy format do to the cells it is applied to?',
    opts: [
      'Aligns the currency symbol left and the digits right, and brackets negatives',
      'Adds a thousand separator and rounds the underlying value to the nearest whole pound',
      'Converts the entry to text so the alignment cannot be disturbed later',
      'Applies bold to totals and a single border above them automatically',
    ], ans: 0,
    exp: 'Accountancy format is the convention every set of accounts uses: the symbol sits at the left of the cell, the digits at the right, and negatives appear in brackets. Like every format it changes the display only — the underlying number is untouched.' },

  { id: 'poc-426', topic: 'poc', difficulty: 'medium', skill: 'poc-ss', criteria: ['POC-4.1'],
    q: 'A row is inserted immediately below the last row of a range that a SUM formula adds. What should be checked?',
    opts: [
      'Whether the total still covers the new row, since the range may not have expanded',
      'Whether the inserted row inherited its number format, since formats do not always copy',
      'Whether the references in the rows below shifted down, since insertion moves them',
      'Whether the formula became a typed value, since inserting a row rewrites the cell',
    ], ans: 0,
    exp: 'A row inserted inside a range is usually picked up; one inserted immediately below the last row of it often is not. After any structural change, look at every total and ask whether it still covers each row it should — a schedule that totals the wrong range looks perfectly right.' },

  { id: 'tfq-021', topic: 'poc', difficulty: 'medium', type: 'truefalse', skill: 'poc-ss', criteria: ['POC-4.1'],
    q: 'Identify whether the following statements about entering and formatting spreadsheet data are true or false.',
    statements: [
      { text: 'Formatting a cell changes how a value is displayed but not the value itself.', answer: true },
      { text: 'Setting a cell to two decimal places rounds the stored number to two decimals.', answer: false },
      { text: 'Copy and paste duplicates a formula as well as a displayed value.', answer: true },
      { text: 'A cell should be selected before a format is applied to it.', answer: true },
      { text: 'A thousand separator should be typed in so the figure reads clearly.', answer: false },
    ],
    exp: 'Two are false. Setting decimals is a display change: the full precision is retained underneath, so later calculations are unaffected by the rounding you can see. And a thousand separator is applied as a format, never typed — typing it makes the entry text and breaks every formula that references it.' },

  /* ── POC-4.2  Use formulas to support cost calculations ─────────────── */

  { id: 'poc-427', topic: 'poc', difficulty: 'medium', skill: 'poc-ss', criteria: ['POC-4.2'],
    q: 'Which of these formulas would NOT be credited for adding the range B2 to B10?',
    opts: [
      '=SUM(B2,B10)',
      '=SUM(B2:B10)',
      '=SUM(B2:B9)+B10',
      '=B2+B3+B4+B5+B6+B7+B8+B9+B10',
    ], ans: 0,
    exp: 'A comma means "and these two cells"; a colon means "through". =SUM(B2,B10) adds only the two named cells and misses the seven in between. The other three all reach the right total: a split range and a long addition are inelegant rather than wrong, and neither contains a redundant reference.' },

  { id: 'poc-428', topic: 'poc', difficulty: 'medium', skill: 'poc-ss', criteria: ['POC-4.2'],
    q: 'Units are in B4, kilograms per unit in B5, price per kilogram in B6, and a delivery charge in B7. Which formula gives the total material cost including delivery?',
    opts: [
      '=B4*B5*B6+B7',
      '=B4*B5*(B6+B7)',
      '=B4+B5+B6+B7',
      '=SUM(B4:B7)',
    ], ans: 0,
    exp: 'Multiplication is performed before addition, so =B4*B5*B6+B7 costs the material and then adds the delivery once. The bracketed version adds the delivery charge to the price of every kilogram, and the two addition formulas add quantities to prices, which means nothing at all.' },

  { id: 'poc-429', topic: 'poc', difficulty: 'medium', skill: 'poc-ss', criteria: ['POC-4.2'],
    q: 'Total cost is in B12 and the number of units in B4. Which formula gives the cost per unit?',
    opts: [
      '=B12/B4',
      '=B4/B12',
      '=SUM(B12/B4)',
      '=B12/B4*100',
    ], ans: 0,
    exp: 'Cost per unit is total cost divided by units, and the forward slash is the division operator. SUM around a single calculation is a redundant bracket that loses the mark, and multiplying by 100 turns a cost into something that is not a cost at all.' },

  { id: 'poc-430', topic: 'poc', difficulty: 'medium', skill: 'poc-ss', criteria: ['POC-4.2'],
    q: 'A cell shows the correct total but contains a typed number rather than a formula. What happens?',
    opts: [
      'No mark, because the marker inspects the formula rather than the displayed result',
      'Full marks, because the displayed figure is the one that a manager would actually read',
      'No mark, because a typed number is stored as text and cannot be added',
      'Partial marks, provided the arithmetic behind the typed figure was correct',
    ], ans: 0,
    exp: 'The mark is for the formula. A cell showing the right figure with nothing behind it earns nothing, and it also fails to update when an input changes — which is the whole point of building a schedule on cell references. A typed number is still a number, not text.' },

  { id: 'poc-431', topic: 'poc', difficulty: 'medium', skill: 'poc-ss', criteria: ['POC-4.2'],
    q: 'A formula in the budget column is copied across into the actual column. What happens to its cell references?',
    opts: [
      'They shift to the new column, which is the behaviour the schedule needs',
      'They stay pointing at the budget column, so the copy must be edited',
      'They are converted to values, so the copied cell no longer recalculates',
      'They shift by one row rather than one column, and the copy must be re-entered',
    ], ans: 0,
    exp: 'Relative references move with the formula: a formula summing column B, pasted into column C, sums column C. Write the formula once and copy it across. It is still worth clicking one pasted cell to confirm the references shifted the way you expected.' },

  { id: 'ms-016', topic: 'poc', difficulty: 'hard', type: 'multiselect', selectCount: 2, skill: 'poc-ss', criteria: ['POC-4.2'],
    q: 'Which TWO of the following formulas would NOT be credited?',
    opts: [
      '=SUM(B1+B2+B3)',
      '=+C11-B11',
      '=(B4+B5)*B6',
      '=B7/B8',
    ], answers: [0, 1],
    exp: 'Brackets round single cells inside SUM are redundant — =SUM(B1:B3) is the credited form — and an unnecessary leading plus sign is rejected where =C11-B11 is correct. Brackets that genuinely change the order of operations are fine, and simple division needs nothing added to it.' },

  { id: 'gf-013', topic: 'poc', difficulty: 'medium', type: 'gapfill', skill: 'poc-ss', criteria: ['POC-4.2'],
    q: 'Complete the statements about spreadsheet formulas.',
    template: 'Every formula must begin with {0}. Multiplication is written using {1}, and to add a whole range of cells you separate the first and last cell with {2}.',
    gaps: [
      { options: ['an equals sign', 'a plus sign', 'the word SUM', 'a bracket'], answer: 0 },
      { options: ['an asterisk', 'the letter x', 'the word PRODUCT', 'a full stop'], answer: 0 },
      { options: ['a colon', 'a comma', 'a semicolon', 'a hyphen'], answer: 0 },
    ],
    exp: 'Without an equals sign the cell displays the formula as text, which loses the mark completely. Multiplication uses an asterisk, not the letter x and not PRODUCT. And a colon means "through", so =SUM(B2:B10) covers every cell in between while a comma would name only two.' }

);

/* ────────────────────────────────────────────────────────────────────────
   BESY COVERAGE GAPS

   The Business Environment carried a hundred and eighteen questions and still
   left six criteria almost untested. The law criteria were the thinnest: 1.1
   names three pairs of classifications and the bank tested one of them, 1.2
   had three questions and 1.4 — remedies for breach — had one. Criterion 5.3,
   how the finance team contributes to the success of an organisation, had
   none, because the lesson covering it had no check questions either.
   ──────────────────────────────────────────────────────────────────────── */
window.ALL_QUESTIONS.push(

  /* ── BESY-1.1  The different classifications of law ─────────────────── */

  { id: 'besy-401', topic: 'besy', difficulty: 'medium', skill: 'besy-law', criteria: ['BESY-1.1'],
    q: 'What survives today of the distinction between common law and equity?',
    opts: [
      'The remedies: damages are available as of right, equitable remedies at the court’s discretion',
      'The courts: common law is heard in the County Court and equity in the High Court',
      'The parties: common law governs businesses and equity governs private individuals',
      'The procedure: a common-law claim is heard by a jury and an equitable claim by a judge sitting alone',
    ], ans: 0,
    exp: 'The two systems were merged into one court structure in the 1870s, so the same court now applies both. What is left of the split is the remedies: damages are a common-law right once breach is proved, while specific performance, an injunction and rescission are equitable and discretionary.' },

  { id: 'besy-402', topic: 'besy', difficulty: 'medium', skill: 'besy-law', criteria: ['BESY-1.1'],
    q: 'A dispute between a business and its supplier over an unpaid invoice falls into which classification?',
    opts: [
      'Private law, because it is a dispute between two parties rather than with the state',
      'Public law, because the courts enforcing the contract are an organ of the state',
      'Public law, because unpaid debts are ultimately a matter of regulatory concern',
      'Private law, because the amount at stake is too small for the state to take an interest',
    ], ans: 0,
    exp: 'Private law governs disputes between individuals and organisations — contract, tort, company law, employment. Public law governs the relationship between the individual and the state, which for an accountant mostly means tax and regulation. The identity of the court does not decide the classification.' },

  { id: 'besy-403', topic: 'besy', difficulty: 'hard', skill: 'besy-law', criteria: ['BESY-1.1'],
    q: 'Which statement about the three pairs of legal classifications is correct?',
    opts: [
      'Criminal law is part of public law, but not every civil claim is part of private law',
      'Criminal law and public law describe exactly the same body of rules by two names',
      'Civil law and private law describe exactly the same body of rules by two names',
      'Equity replaced the common law entirely once the two separate court systems were merged',
    ], ans: 0,
    exp: 'The pairs cut across each other, which is what the question tests. Criminal law is a branch of public law, but a judicial review of a government decision is a civil claim brought in public law — so civil and private are not synonyms. Equity supplemented the common law rather than replacing it.' },

  { id: 'besy-404', topic: 'besy', difficulty: 'medium', skill: 'besy-law', criteria: ['BESY-1.1'],
    q: 'The same set of facts leads to a prosecution that fails and a civil claim that succeeds. What explains this?',
    opts: [
      'The claimant only had to prove the case on the balance of probabilities',
      'The civil court was not bound by the finding the criminal court had made',
      'The civil claim was heard by a more senior judge than the prosecution',
      'The defendant chose not to defend the civil claim after the acquittal',
    ], ans: 0,
    exp: 'A criminal charge must be proved beyond reasonable doubt; a civil claim need only be proved on the balance of probabilities. The claimant therefore has a lower bar to clear, which is exactly why the two proceedings can reach different conclusions on identical facts.' },

  { id: 'tfq-022', topic: 'besy', difficulty: 'medium', type: 'truefalse', skill: 'besy-law', criteria: ['BESY-1.1', 'BESY-1.2'],
    q: 'Identify whether the following statements about legal classifications and precedent are true or false.',
    statements: [
      { text: 'A criminal prosecution is brought by the state rather than by the injured party.', answer: true },
      { text: 'Equitable remedies are granted as of right once a breach has been proved.', answer: false },
      { text: 'A decision of a higher court binds lower courts in later cases with similar facts.', answer: true },
      { text: 'Tax disputes are heard in the Crown Court.', answer: false },
      { text: 'Parliament can pass an Act that overturns a decided case.', answer: true },
    ],
    exp: 'Two are false. Equitable remedies are discretionary and granted only where damages would be inadequate — that is what distinguishes them from damages, which are a common-law right. And tax disputes go to the First-tier Tribunal (Tax Chamber); the Crown Court hears serious criminal cases.' },

  /* ── BESY-1.2  The main sources of law ──────────────────────────────── */

  { id: 'besy-405', topic: 'besy', difficulty: 'medium', skill: 'besy-law', criteria: ['BESY-1.2'],
    q: 'What does the doctrine of judicial precedent require?',
    opts: [
      'A lower court must follow the decision of a higher court on materially similar facts',
      'A court must follow the most recent decision on the point, whichever court made it',
      'A court must apply the interpretation of a statute preferred by the minister',
      'A court must give reasons that Parliament has already approved before it decides a case',
    ], ans: 0,
    exp: 'Precedent is what makes case law work as a source of law and what makes the law predictable enough to plan around. Seniority decides, not recency: a recent decision of a lower court does not displace an older decision of a higher one.' },

  { id: 'besy-406', topic: 'besy', difficulty: 'medium', skill: 'besy-law', criteria: ['BESY-1.2'],
    q: 'Why does an Act of Parliament frequently create a power for a minister to make detailed rules?',
    opts: [
      'Parliament has neither the time nor the technical knowledge to legislate on every detail',
      'An Act of Parliament cannot lawfully contain figures such as rates and thresholds',
      'Rules made by a minister take effect more slowly, giving businesses longer to prepare',
      'Delegated rules cannot be challenged in the courts at all, so they are more certain in effect',
    ], ans: 0,
    exp: 'Delegated legislation exists for speed, detail and flexibility: a National Insurance threshold can be changed without a new Act. It can be challenged as **ultra vires** if it goes beyond the power the Act granted, which is the main check on it — and a judicial one rather than a parliamentary one.' },

  { id: 'besy-407', topic: 'besy', difficulty: 'medium', skill: 'besy-law', criteria: ['BESY-1.2'],
    q: 'What is the main disadvantage of law made by statutory instrument rather than by Act?',
    opts: [
      'It receives far less parliamentary scrutiny, and there is a great deal of it',
      'It binds only the government department that made it, not the general public',
      'It lapses automatically at the end of each parliamentary session unless renewed',
      'It cannot deal with figures such as rates, thresholds or technical schedules',
    ], ans: 0,
    exp: 'A statutory instrument gets nothing like the attention a Bill receives, and thousands are made each year. It is nonetheless law and it binds everyone. The trade-off — democratic scrutiny given up for speed and detail — is what the specification asks you to be able to state.' },

  /* ── BESY-1.4  Remedies available for breach of contract ────────────── */

  { id: 'besy-408', topic: 'besy', difficulty: 'medium', skill: 'besy-law', criteria: ['BESY-1.4'],
    q: 'What is the purpose of an award of damages for breach of contract?',
    opts: [
      'To put the injured party in the position they would have been in had the contract been performed',
      'To penalise the party in breach so that others are discouraged from behaving in the same way',
      'To return both parties to the positions they occupied before the contract was entered into',
      'To transfer to the injured party the whole of the profit that the party in breach made by breaching',
    ], ans: 0,
    exp: 'Damages compensate; they do not punish. A claim for more than the actual loss will fail, and so will a claim framed as a penalty. Returning both parties to their pre-contract positions is rescission, which is an equitable remedy and a different thing altogether.' },

  { id: 'besy-409', topic: 'besy', difficulty: 'hard', skill: 'besy-law', criteria: ['BESY-1.4'],
    q: 'A seller refuses to complete the sale of a specific piece of land. Which remedy is the buyer most likely to seek, and why?',
    opts: [
      'Specific performance, because damages cannot replace unique subject matter',
      'Damages, because a court will not order a party to perform a contract of sale',
      'An injunction, because the seller must be stopped from selling the land at all',
      'Rescission, because the contract is void once one party refuses to perform it',
    ], ans: 0,
    exp: 'Specific performance orders a party to do what they promised, and it is granted where damages would be inadequate — which is the standard position with land, since no other plot is the same. An injunction stops someone doing something, and rescission unwinds the contract rather than enforcing it.' },

  { id: 'besy-410', topic: 'besy', difficulty: 'medium', skill: 'besy-law', criteria: ['BESY-1.4'],
    q: 'A supplier delivers goods two days late, causing minor inconvenience. What can the buyer do?',
    opts: [
      'Claim damages for the loss, while remaining bound to perform their own side',
      'Treat the contract as at an end and refuse to pay anything for the goods',
      'Claim damages and also recover the whole of the price that has already been paid',
      'Do nothing, because a delay in delivery is never a breach of contract',
    ], ans: 0,
    exp: 'Only a material breach — one going to the heart of the agreement — lets the injured party treat the contract as ended. A minor breach gives a right to damages while leaving the contract alive, so the buyer must still pay. That is the condition-and-warranty distinction deciding the remedy.' },

  { id: 'ms-017', topic: 'besy', difficulty: 'medium', type: 'multiselect', selectCount: 2, skill: 'besy-law', criteria: ['BESY-1.4'],
    q: 'Which TWO of the following are equitable remedies for breach of contract?',
    opts: [
      'Specific performance, ordering a party to do what they promised to do',
      'An injunction, ordering a party to stop doing something they should not',
      'Damages, compensating the injured party for the loss the breach caused',
      'Discharge by performance, where both parties do everything they promised',
    ], answers: [0, 1],
    exp: 'Equitable remedies are discretionary and are granted only where damages would be inadequate; specific performance, injunctions and rescission are the three the specification names. Damages are a common-law right, and discharge by performance is not a remedy at all — it is a contract ending normally.' },

  /* ── BESY-3.4  The need to act ethically ────────────────────────────── */

  { id: 'besy-411', topic: 'besy', difficulty: 'medium', skill: 'besy-ethics', criteria: ['BESY-3.4'],
    q: 'Why does an AAT member owe a duty to the public interest as well as to their employer?',
    opts: [
      'Because the profession’s value rests on work others can rely on without checking it',
      'Because an employer has no legal standing to give instructions to a qualified member',
      'Because the public interest duty replaces the duty owed to the employer entirely',
      'Because AAT membership is a contract between the member and the general public',
    ], ans: 0,
    exp: 'A professional qualification is a signal that the work can be relied upon, and that signal is worth nothing if members simply do as they are told. The duty sits on top of the duty to the employer rather than replacing it, which is why an instruction from a manager is not the final answer to an ethical question.' },

  { id: 'besy-412', topic: 'besy', difficulty: 'medium', skill: 'besy-ethics', criteria: ['BESY-3.4'],
    q: 'You have raised an ethical concern internally and it has not been resolved. What does the AAT Code contemplate next?',
    opts: [
      'Escalating further — to governance, to the professional body, or ultimately resigning',
      'Complying with the instruction, since the concern has now been properly recorded on file',
      'Reporting the matter directly to the police before taking any other step',
      'Resigning immediately, because internal escalation has already been exhausted',
    ], ans: 0,
    exp: 'The route runs upwards: supervisor, then senior management or those charged with governance, then the professional body. Resignation is the last resort and the Code does contemplate it, but it may not discharge a reporting obligation — leaving does not unreport a suspicion of money laundering.' },

  { id: 'besy-413', topic: 'besy', difficulty: 'medium', skill: 'besy-ethics', criteria: ['BESY-3.4'],
    q: 'Why is documenting an ethical decision worth the time it takes?',
    opts: [
      'It is the evidence, later, that the judgement was made properly rather than conveniently',
      'It transfers responsibility for the decision from the member to their employer',
      'It is required before the AAT ethics advice line will discuss a case at all',
      'It prevents the matter from ever being reopened once the file note has been signed and dated',
    ], ans: 0,
    exp: 'A file note recording the threat identified, the safeguard applied and the reasoning is the evidence, later, that the judgement was made properly rather than conveniently. Nothing about writing it down moves responsibility elsewhere or closes the matter off.' },

  { id: 'besy-414', topic: 'besy', difficulty: 'hard', skill: 'besy-ethics', criteria: ['BESY-3.4'],
    q: 'A junior colleague says the unethical instruction came from a manager, so the responsibility is the manager’s. Why is that wrong?',
    opts: [
      'Each member is personally accountable for their own compliance with the Code',
      'A manager’s instruction is only binding if it has been confirmed in writing',
      'Responsibility passes to the manager only where the member is AAT qualified',
      'The manager and the member are jointly liable, so neither can be blamed alone',
    ], ans: 0,
    exp: 'Going along with an unethical instruction to protect your job is not a defence — the Code holds each member personally accountable. That is precisely why it sets out a route for raising a concern, and why "I was told to" is the answer that loses the marks.' },

  /* ── BESY-5.3  How the finance team contributes to success ──────────── */

  { id: 'besy-415', topic: 'besy', difficulty: 'medium', skill: 'besy-finance', criteria: ['BESY-5.3'],
    q: 'Why is remaining solvent described as essential to an organisation’s survival?',
    opts: [
      'A business that cannot pay its debts on the due date can be forced to stop trading',
      'Solvency is the figure Companies House uses to decide whether accounts may be filed',
      'An insolvent business loses the limited liability its shareholders would otherwise have',
      'Solvency is what determines the rate of corporation tax the business will pay',
    ], ans: 0,
    exp: 'Solvency is the ability to pay debts on the due date, and a business that cannot do so may be forced to stop trading however profitable it looked on paper. Managing funds effectively is therefore part of what the finance function contributes, not an administrative extra.' },

  { id: 'besy-416', topic: 'besy', difficulty: 'medium', skill: 'besy-finance', criteria: ['BESY-5.3'],
    q: 'The specification names four things the actions of finance staff support. Which set is correct?',
    opts: [
      'Efficient working practices, solvency, legal and regulatory compliance, and long-term stability',
      'Sales growth, market share, customer satisfaction, and the strength of the brand in its own market',
      'Recruitment, staff training, appraisal, and the retention of experienced employees',
      'Product design, production scheduling, quality control, and distribution planning',
    ], ans: 0,
    exp: 'Efficient working practices, solvency, legal and regulatory compliance and long-term financial stability are the four, and a well-run finance function protects all of them while a poorly run one puts all four at risk. The other three lists describe what sales, human resources and operations contribute — real enough, but not what this criterion asks about.' },

  { id: 'besy-417', topic: 'besy', difficulty: 'medium', skill: 'besy-finance', criteria: ['BESY-5.3'],
    q: 'A finance assistant is bound by an authorisation limit and also by the organisation’s code of conduct. What distinguishes the two?',
    opts: [
      'One is a policy specific to the finance function; the other applies organisation-wide',
      'One is a legal requirement; the other is guidance the assistant may choose to follow',
      'One applies to qualified members only; the other applies to every member of staff',
      'One is set by the finance director; the other is set by the organisation’s external auditor',
    ], ans: 0,
    exp: 'The specification distinguishes finance-function-specific policies — an authorisation limit, a credit policy — from organisation-wide ones such as a code of conduct or a data policy. A finance member is bound by both, and neither is optional.' },

  { id: 'besy-418', topic: 'besy', difficulty: 'medium', skill: 'besy-finance', criteria: ['BESY-5.3'],
    q: 'What does effective communication by a finance team require, according to the specification?',
    opts: [
      'Content that is clear, complete, accurate, timely and concise, in a medium suited to the recipient',
      'Content that includes every figure available, leaving the reader to reach their own conclusion about it',
      'Content circulated to every department, putting it beyond dispute that everyone was told',
      'Content phrased in technical accounting language, placing its meaning beyond any dispute',
    ], ans: 0,
    exp: 'Five properties of the content, plus a medium chosen to suit the recipient and the setting. Sending everything to everyone is not communication, and technical language pitched above the reader defeats the purpose — meeting the needs of the recipient is part of the standard.' },

  { id: 'besy-419', topic: 'besy', difficulty: 'medium', skill: 'besy-finance', criteria: ['BESY-5.3'],
    q: 'What is the finance function’s role in corporate social responsibility reporting?',
    opts: [
      'It measures and reports the data behind the claims the organisation makes',
      'It decides which social and environmental commitments the organisation will adopt',
      'It has no role, because CSR reporting is a matter for the marketing function',
      'It audits the report independently before the directors are permitted to publish it',
    ], ans: 0,
    exp: 'CSR reporting needs measurement, and finance is the function that measures and reports the data behind the claims an organisation makes. Choosing the commitments is a board decision; auditing them independently is by definition not a job for the function that prepared the figures.' },

  { id: 'tfq-023', topic: 'besy', difficulty: 'medium', type: 'truefalse', skill: 'besy-finance', criteria: ['BESY-5.3', 'BESY-5.2'],
    q: 'Identify whether the following statements about how the finance team works are true or false.',
    statements: [
      { text: 'Outsourcing the payroll transfers responsibility for what is filed and paid to the provider.', answer: false },
      { text: 'Segregation of duties means no one person can both cause an error and conceal it.', answer: true },
      { text: 'Establishing effective working relationships across the business is part of the finance role.', answer: true },
      { text: 'A management report must follow the statutory format used for published accounts.', answer: false },
      { text: 'Finance depends on operational data it does not generate itself.', answer: true },
    ],
    exp: 'Two are false. Outsourcing adds a relationship to manage and data to share securely, but the business remains accountable for what is filed and paid. And a management report has no prescribed format at all — it looks however is most useful, which is the examiner’s favourite trap in this topic.' },

  /* ── BESY-6.1  Sources of information ───────────────────────────────── */

  { id: 'besy-420', topic: 'besy', difficulty: 'medium', skill: 'besy-comms', criteria: ['BESY-6.1'],
    q: 'A supplier price list you collected by ringing round suppliers yourself is which kind of source?',
    opts: [
      'Primary, because you gathered it first hand for your own purpose',
      'Secondary, because the prices were set by the suppliers rather than by you',
      'Secondary, because a price list is a published document rather than raw data',
      'Primary, because a supplier is a party you already have a relationship with',
    ], ans: 0,
    exp: 'What makes a source primary is that you gathered it yourself, for the question you are actually asking. It fits the question exactly, it is as current as you made it, and you know how it was collected — at the cost of the time it took.' },

  { id: 'besy-421', topic: 'besy', difficulty: 'medium', skill: 'besy-comms', criteria: ['BESY-6.1'],
    q: 'What is the main limitation of a secondary source?',
    opts: [
      'It was collected for somebody else’s purpose, so it may not fit the question',
      'It is more expensive and slower to obtain than gathering the data yourself',
      'It cannot be cited in a report, because the original researcher owns the figures',
      'It is always less accurate than data the organisation collects for itself',
    ], ans: 0,
    exp: 'Secondary information is cheap, quick and often available at a scale no small business could reach. The trade-off is control: it was defined for someone else’s question, may not match the definition you need, and may be out of date. Cheapness is the advantage, not the drawback.' },

  { id: 'besy-422', topic: 'besy', difficulty: 'hard', skill: 'besy-comms', criteria: ['BESY-6.1'],
    q: 'Two websites give the same figure for average sector wages. On investigation both cite the same original survey. What follows?',
    opts: [
      'They are not independent sources, so the figure has not actually been corroborated',
      'The figure is confirmed, because two separate publishers have both reported it',
      'The figure should be discarded, because a survey is never an authoritative source',
      'The more recently updated of the two websites should be treated as the primary source',
    ], ans: 0,
    exp: 'Corroboration only works between sources that gathered their information independently. Two sites tracing back to one survey add nothing to its reliability, however different they looked. A practical minimum for anything consequential is two independent sources, at least one authoritative.' },

  { id: 'besy-423', topic: 'besy', difficulty: 'medium', skill: 'besy-comms', criteria: ['BESY-6.1'],
    q: 'A competitor’s press release claims their new product is the cheapest in the sector. How should it be treated?',
    opts: [
      'As weak evidence of the truth but good evidence of what they want the market to believe',
      'As a valid source, because a company is legally accountable for what it publishes',
      'As an invalid source that should not be referred to in a report under any circumstances',
      'As a primary source, because the company generated the information about itself',
    ], ans: 0,
    exp: 'A press release is weak evidence of the truth and good evidence of what the competitor wants the market to believe, which may be exactly what you need to know. "Treat with caution" is not the same as "never use" — but the caution has to be stated when you report it.' },

  { id: 'besy-424', topic: 'besy', difficulty: 'medium', skill: 'besy-comms', criteria: ['BESY-6.1'],
    q: 'Given more information than the question needs, what is the right approach?',
    opts: [
      'Work backwards from the decision and use only what is relevant, current and reliable',
      'Include every figure supplied, since leaving one out risks losing a mark for omission',
      'Use the most recent figures supplied and ignore anything published earlier',
      'Use the figures from the most authoritative publisher and disregard the others',
    ], ans: 0,
    exp: 'Work backwards from the decision: assessment tasks supply surplus material deliberately, to see whether you can select. Test each candidate figure for relevance, currency and reliability, and say why anything was left out — including everything is not thoroughness but a failure to choose.' },

  { id: 'besy-425', topic: 'besy', difficulty: 'medium', skill: 'besy-comms', criteria: ['BESY-6.1'],
    q: 'A statistic comes from a reliable body but carries no publication date. What is the main concern?',
    opts: [
      'It may be badly out of date, and staleness is the commonest failure in practice',
      'It may have been altered after publication without the change being recorded',
      'It cannot be attributed, so the publisher cannot be named in a report',
      'It was probably gathered for a different sector from the one that is being examined',
    ], ans: 0,
    exp: 'A perfectly reliable statistic from four years ago can be badly wrong today, which is why the date matters as much as the publisher. The commonest failure in practice is not fabrication but staleness, and an undated figure is one you cannot defend.' }

);
