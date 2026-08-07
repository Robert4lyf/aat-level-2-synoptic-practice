/* AAT Level 2 Synoptic Practice — Learning Journey content */
window.LEARN_PATH = [
  {
    unit: 'itbk',
    level: 2,
    title: 'Introduction to Bookkeeping',
    lessons: [
      /* ── FOUNDATIONS (1–4) ──────────────────────────────────────────────
         Level 2 is the entry qualification: most students arrive with no
         accounting background at all. These four lessons assume nothing. */
      {
        id: 'L-itbk-1',
        title: 'What bookkeeping is for',
        icon: '🌱',
        skills: ['itbk-de'],
        cards: [
          {
            h: 'Start here',
            p: [
              'You do not need any accounting background for this lesson. We will build everything from the beginning.',
              '**Bookkeeping** is the process of recording every financial transaction a business makes, in a consistent way, so that at any point you can answer three questions: what does the business own, what does it owe, and did it make a profit?',
              'A **transaction** is any exchange of value — a sale, a purchase, paying wages, buying a van. If money or value moves, it gets recorded.',
            ],
          },
          {
            h: 'Why not just look at the bank account?',
            p: [
              'The bank balance only tells you about cash that has actually moved. It cannot tell you that a customer owes you £4,000, that you owe a supplier £2,500, or that the van you bought will last five years.',
              'Bookkeeping captures **obligations and resources**, not just cash. That is why a business can be profitable and still run out of money, or hold plenty of cash while making a loss.',
            ],
            callout: { kind: 'key', text: 'Profit is not cash. They are two different questions, and bookkeeping is what lets you answer both.' },
          },
          {
            h: 'The five types of account',
            p: [
              'Everything a business records falls into one of five categories. Learn these now — every rule that follows depends on them.',
              '**Assets** — things the business owns or is owed: bank, cash, inventory, equipment, money owed by customers.',
              '**Liabilities** — what the business owes to others: money owed to suppliers, bank loans, VAT owed to HMRC.',
              '**Capital** — what the owner has put into the business, plus profits kept in it. In effect, what the business owes its owner.',
              '**Income** — value earned from trading: sales, fees, commission received.',
              '**Expenses** — the costs of trading: rent, wages, fuel, insurance, purchases of goods for resale.',
            ],
          },
          {
            h: 'Sorting things into the five types',
            p: [
              'Classification is the whole job. Once you know which of the five types an item is, the debit-or-credit decision follows automatically — and if you classify it wrongly, every entry after it is wrong too.',
              'The distinction that catches people out is **asset versus expense**. A van is an asset because the business still has it next year; the fuel put in it is an expense because it is gone.',
              'Watch the two that look like their opposites: purchases of goods for resale are an **expense**, not an asset, and drawings reduce **capital** rather than being an expense of the business.',
            ],
            split: {
              left: { title: 'Common assets & expenses', items: [
                'Bank and cash — **asset**',
                'Money owed by customers (trade receivables) — **asset**',
                'Delivery van — **asset**',
                'Rent paid — **expense**',
                'Wages paid — **expense**',
                'Goods bought for resale (purchases) — **expense**',
              ] },
              right: { title: 'Common liabilities, capital & income', items: [
                'Money owed to suppliers (trade payables) — **liability**',
                'Bank loan — **liability**',
                'VAT owed to HMRC — **liability**',
                'Owner\'s investment — **capital**',
                'Sales — **income**',
                'Commission received — **income**',
              ] },
            },
          },
          {
            h: 'The accounting equation',
            p: [
              'These five types are connected by one equation that always holds:',
              '**Assets = Capital + Liabilities**',
              'Read it as: everything the business has (assets) was funded either by the owner (capital) or by someone else (liabilities). There is no third source.',
              'If a business owns £50,000 of assets and owes £18,000 to others, the owner\'s stake must be £32,000. Not roughly — exactly.',
            ],
            formula: 'Assets = Capital + Liabilities · Capital = Assets − Liabilities · Liabilities = Assets − Capital',
          },
          {
            h: 'Using the equation',
            p: [
              'The accounting equation is not just a fact to memorise — it is a tool. Give it any two of assets, liabilities and capital and it produces the third.',
              'Rearrange it rather than guessing: Assets = Capital + Liabilities, so Capital = Assets − Liabilities and Liabilities = Assets − Capital.',
            ],
            worked: {
              title: 'Finding the missing figure',
              problem: 'A business has assets of £64,000 and liabilities of £27,500. What is the owner\'s capital?',
              steps: [
                { do: 'Write down the equation: **Assets = Capital + Liabilities**.', why: 'Always start from the equation rather than trying to remember a rearrangement.' },
                { do: 'Substitute what you know: **£64,000 = Capital + £27,500**.', why: 'Two of the three figures are given, so only one is unknown.' },
                { do: 'Rearrange to isolate capital: **Capital = £64,000 − £27,500**.', why: 'Move the known liability figure across the equals sign; it changes sign.' },
                { do: 'Calculate: **Capital = £36,500**.', why: 'The owner\'s stake is what is left of the assets after everyone else has been paid.' },
              ],
              answer: '£36,500',
              tryIt: {
                q: 'A business has assets of £81,200 and capital of £45,700. What are its liabilities, in £?',
                answer: 35500, unit: '£',
                hint: 'Liabilities = Assets − Capital. Take the capital away from the assets.',
                exp: '£81,200 − £45,700 = £35,500. The equation must balance exactly.',
              },
            },
          },
        ],
        check: [
          { q: 'Which of the following is a liability?', opts: [
              'Money owed to a supplier for goods bought on credit',
              'Money owed by a customer for goods sold on credit',
              'The delivery van the business uses to make deliveries',
              'The rent the business paid for its premises last month'],
            ans: 0, exp: 'A liability is what the business owes. Money owed BY a customer is an asset; the van is an asset; rent paid is an expense.' },
          { type: 'numeric', q: 'A business has assets of £52,000 and liabilities of £19,400. What is the capital, in £?',
            answer: 32600, unit: '£',
            steps: ['Assets = Capital + Liabilities.', '£52,000 = Capital + £19,400.', 'Capital = £52,000 − £19,400 = £32,600.'],
            exp: 'Capital is the owner\'s residual stake once liabilities are deducted from assets.' },
          { type: 'truefalse', q: 'Identify whether the following statements are true or false.',
            statements: [
              { text: 'A profitable business can still run out of cash.', answer: true },
              { text: 'The bank balance on its own tells you whether the business made a profit.', answer: false },
              { text: 'Capital represents what the business owes to its owner.', answer: true },
              { text: 'Purchases of goods for resale are classified as an asset.', answer: false },
            ],
            exp: 'Profit and cash are different questions. Purchases are an expense — the goods become inventory (an asset) only while unsold.' },
          { q: 'The accounting equation states that:', opts: [
              'Assets equal capital plus liabilities',
              'Assets equal capital minus liabilities',
              'Capital equals assets plus liabilities',
              'Liabilities equal capital plus assets'],
            ans: 0, exp: 'Everything the business holds was funded either by the owner or by someone else — so assets = capital + liabilities.' },
        ],
      },
      {
        id: 'L-itbk-2',
        title: 'Debits and credits',
        icon: '⚖️',
        skills: ['itbk-de'],
        cards: [
          {
            h: 'Every transaction has two sides',
            p: [
              'This is the idea the whole subject rests on. Every transaction affects **at least two accounts**, and the total recorded on one side always equals the total on the other.',
              'The two sides are called **debit** (left) and **credit** (right). They are just names for positions — debit does not mean good and credit does not mean bad.',
              'If you buy a van for £12,000 cash, you gain a van and lose cash. Two accounts move, by the same amount, in opposite directions. That is the **dual effect**.',
            ],
            callout: { kind: 'warning', text: 'Forget the everyday meaning of "credit". In bookkeeping, debit means the left-hand side and credit means the right-hand side. Nothing more.' },
          },
          {
            h: 'DEAD CLIC — the rule to memorise',
            p: [
              'You need to know which side increases each type of account. The standard mnemonic is **DEAD CLIC**.',
              '**DEAD** — things that increase on the **Debit** side: **E**xpenses, **A**ssets, **D**rawings.',
              '**CLIC** — things that increase on the **Credit** side: **L**iabilities, **I**ncome, **C**apital.',
              'To decrease any of them, you use the opposite side.',
            ],
            formula: 'Debit increases: Expenses · Assets · Drawings — Credit increases: Liabilities · Income · Capital',
          },
          {
            h: 'The rule as a table',
            p: [
              'This table is the whole of double entry compressed into six lines. Every posting you will ever make is one row used twice — once on the debit side, once on the credit.',
              'The mnemonic **DEAD CLIC** encodes it: **D**ebits increase **E**xpenses, **A**ssets and **D**rawings; **C**redits increase **L**iabilities, **I**ncome and **C**apital.',
              'Note the symmetry — the "decrease" column is simply the mirror of the "increase" column, so there is really only one rule to learn, not twelve.',
            ],
            table: {
              headers: ['Account type', 'Increase', 'Decrease'],
              rows: [
                ['Asset', 'Debit', 'Credit'],
                ['Expense', 'Debit', 'Credit'],
                ['Drawings', 'Debit', 'Credit'],
                ['Liability', 'Credit', 'Debit'],
                ['Income', 'Credit', 'Debit'],
                ['Capital', 'Credit', 'Debit'],
              ],
            },
          },
          {
            h: 'Working out a double entry',
            p: [
              'Use the same three questions every time: which two accounts are affected, is each one going up or down, and what type of account is each?',
              'Only then apply the rule. Trying to feel your way to "debit bank or credit bank?" without naming the account type is how errors creep in.',
            ],
            worked: {
              title: 'A cash purchase of equipment',
              problem: 'A business buys office equipment for £3,400, paying immediately by bank transfer. What is the double entry?',
              steps: [
                { do: 'Identify the **two accounts** affected: Office equipment, and Bank.', why: 'Ask what the business received and what it gave up. It received equipment; it gave up money in the bank.' },
                { do: 'Classify each one. Office equipment is an **asset**. Bank is also an **asset**.', why: 'You cannot apply DEAD CLIC until you know the account type.' },
                { do: 'Decide the direction. Equipment **increases**; bank **decreases**.', why: 'The business now owns equipment it did not own before, and has less money.' },
                { do: 'Apply DEAD CLIC. Assets increase on the debit side, so **Dr Office equipment £3,400**. Assets decrease on the credit side, so **Cr Bank £3,400**.', why: 'Both sides are £3,400, so the entry balances.' },
              ],
              answer: 'Dr Office equipment £3,400 · Cr Bank £3,400',
              tryIt: {
                q: 'The business pays rent of £850 by bank transfer. The rent expense account is debited. By how much is the bank account credited, in £?',
                answer: 850, unit: '£',
                hint: 'The two sides of any double entry are always equal. If one side is £850, so is the other.',
                exp: 'Dr Rent £850 (an expense increases on the debit side), Cr Bank £850 (an asset decreases on the credit side). Every double entry balances.',
              },
            },
          },
          {
            h: 'Four transactions worked through',
            p: [
              'Read each line as a pair of decisions rather than a single fact. The account type drives the side; the direction of change drives which column it lands in.',
              'The last row is the one to study: drawings are debited even though the business is paying money out, because drawings **reduce capital** and capital is reduced by a debit.',
            ],
            example: {
              title: 'Applying DEAD CLIC',
              rows: [
                ['**Transaction**', '**Debit**', '**Credit**'],
                ['Owner pays £10,000 into the business', 'Bank (asset ↑)', 'Capital (capital ↑)'],
                ['Buys goods for resale, £2,000, on credit', 'Purchases (expense ↑)', 'Trade payables (liability ↑)'],
                ['Sells goods for £900 cash', 'Bank (asset ↑)', 'Sales (income ↑)'],
                ['Owner takes £400 for personal use', 'Drawings (drawings ↑)', 'Bank (asset ↓)'],
              ],
            },
          },
          {
            h: 'Two questions that get you there every time',
            p: [
              'When you are stuck, work through these in order:',
              '**1. Which two accounts are involved?** Name them before you think about sides.',
              '**2. What type is each, and is it going up or down?** Then DEAD CLIC gives you the side automatically.',
              'Resist the urge to memorise entries transaction by transaction. There are hundreds of transactions and only six account types.',
            ],
            examtrap: 'Drawings are **not** an expense. Money the owner takes out reduces capital — it is not a cost of trading, and it never appears in the profit calculation.',
          },
        ],
        check: [
          { q: 'A business pays a supplier £1,200 that it owed. The correct double entry is:', opts: [
              'Dr Trade payables £1,200, Cr Bank £1,200',
              'Dr Bank £1,200, Cr Trade payables £1,200',
              'Dr Purchases £1,200, Cr Bank £1,200',
              'Dr Trade payables £1,200, Cr Purchases £1,200'],
            ans: 0, exp: 'The liability falls (debit reduces a liability) and the bank falls (credit reduces an asset). Purchases were already recorded when the goods were bought.' },
          { type: 'truefalse', q: 'Identify whether the following statements are true or false.',
            statements: [
              { text: 'Assets increase on the debit side.', answer: true },
              { text: 'Income increases on the debit side.', answer: false },
              { text: 'Every transaction affects at least two accounts.', answer: true },
              { text: 'A credit entry always means something bad has happened.', answer: false },
            ],
            exp: 'DEAD CLIC: income increases on the CREDIT side. Debit and credit are positions — left and right — not judgements.' },
          { type: 'gapfill', q: 'Complete the double entry for a credit sale.',
            template: 'When goods are sold on credit, the entry is Dr {0} and Cr {1}.',
            gaps: [
              { options: ['Trade receivables', 'Trade payables', 'Bank', 'Purchases'], answer: 0 },
              { options: ['Trade receivables', 'Sales', 'Bank', 'Capital'], answer: 1 },
            ],
            exp: 'A credit sale increases what customers owe (Dr Trade receivables, an asset) and recognises the income (Cr Sales).' },
          { q: 'Which of the following increases on the credit side?', opts: [
              'A bank loan taken out by the business',
              'The inventory held by the business',
              'The wages paid to the business\'s employees',
              'The drawings taken by the owner'],
            ans: 0, exp: 'A bank loan is a liability, and liabilities increase on the credit side. Inventory is an asset, wages an expense, drawings a reduction of capital — all debits.' },
        ],
      },
      {
        id: 'L-itbk-3',
        title: 'Ledger accounts and the T-account',
        icon: '📒',
        skills: ['itbk-de'],
        cards: [
          {
            h: 'Where entries actually go',
            p: [
              'Each account — Bank, Sales, Rent, Trade receivables and so on — has its own record called a **ledger account**. All the entries for that account collect in one place.',
              'The traditional layout is drawn as a **T**: the account name across the top, debits on the left, credits on the right. Hence "T-account".',
              'Real software does not draw a T, but every assessment does, and thinking in T-accounts is how you keep double entry straight.',
            ],
          },
          {
            h: 'The shape of a T-account',
            p: [
              'The T is only a layout, but the layout carries meaning: the left column is always debits and the right column is always credits, in every account without exception.',
              'Each line records the amount and the **name of the other account** in the entry — the cross-reference that lets anyone trace the matching half.',
              'The balance is the difference between the two sides. An account with a bigger debit side carries a debit balance, and vice versa.',
            ],
            example: {
              title: 'Bank account',
              rows: [
                ['**Debit (left)**', '**£**', '**Credit (right)**', '**£**'],
                ['Capital introduced', '10,000', 'Rent paid', '850'],
                ['Cash sales', '900', 'Equipment purchased', '3,400'],
                ['', '', 'Drawings', '400'],
              ],
            },
            callout: { kind: 'tip', text: 'Money coming IN to the bank goes on the debit side. Money going OUT goes on the credit side. The bank is an asset, so DEAD CLIC applies as normal.' },
          },
          {
            h: 'What goes in each entry',
            p: [
              'Each line in a T-account records **the name of the other account** in the double entry, plus the amount.',
              'So if you pay rent from the bank, the Bank account\'s credit side says "Rent" and the Rent account\'s debit side says "Bank". Each account points at its partner.',
              'That cross-referencing is what lets you trace any transaction from either direction — a habit that becomes essential when you start hunting errors.',
            ],
          },
          {
            h: 'The three ledgers',
            p: [
              'Accounts are grouped into three ledgers:',
              '**General ledger** (sometimes called the nominal ledger) — every account needed for the trial balance and the financial statements. This is the ledger where double entry actually happens.',
              '**Sales ledger** — one account per credit customer, showing what each individual customer owes.',
              '**Purchases ledger** — one account per credit supplier, showing what is owed to each one.',
            ],
            examtrap: 'The sales and purchases ledgers sit **outside** the double entry. They are memorandum records. This is exactly why an error in one customer\'s account does not unbalance the trial balance — a point tested constantly in Bookkeeping Controls.',
          },
          {
            h: 'Posting a transaction into T-accounts',
            p: [
              'Post one transaction at a time, and finish it completely before starting the next. Half-posted transactions are the single most common cause of a trial balance that will not balance.',
              'Notice what happens across the two dates: the sale creates a receivable, and the receipt clears it. The sale is recognised when it is made, not when the money arrives.',
            ],
            worked: {
              title: 'A credit sale, then the receipt',
              problem: 'Willow Crafts sells goods on credit to a customer for £1,500 on 4 May. The customer pays in full by bank transfer on 28 May. Show the entries.',
              steps: [
                { do: 'On 4 May, identify the accounts: **Trade receivables** and **Sales**.', why: 'The sale is on credit, so no money has moved yet — the customer owes it.' },
                { do: 'Post: **Dr Trade receivables £1,500** (asset up), **Cr Sales £1,500** (income up).', why: 'The business is owed £1,500 and has earned £1,500 of revenue.' },
                { do: 'On 28 May, identify the accounts: **Bank** and **Trade receivables**.', why: 'The receipt does not create new income — the sale was already recorded on 4 May.' },
                { do: 'Post: **Dr Bank £1,500** (asset up), **Cr Trade receivables £1,500** (asset down).', why: 'The debt is settled, so trade receivables returns to nil for this customer.' },
              ],
              answer: '4 May: Dr Trade receivables / Cr Sales £1,500. 28 May: Dr Bank / Cr Trade receivables £1,500.',
              tryIt: {
                q: 'After both entries above, what is the balance remaining on the Trade receivables account for this customer, in £?',
                answer: 0, unit: '£',
                hint: 'One entry put £1,500 on the debit side; the other put £1,500 on the credit side.',
                exp: 'Debits of £1,500 less credits of £1,500 leaves nil. The customer has paid in full, so nothing is outstanding.',
              },
            },
          },
          {
            h: 'The single most common beginner error',
            p: [
              'Recording income twice. When a credit customer pays, it is tempting to credit Sales again — but the sale was recognised when the goods went out, not when the money arrived.',
              'The receipt only moves the amount from one asset (trade receivables) to another (bank). Income is untouched.',
            ],
            callout: { kind: 'warning', text: 'Ask yourself: has the business earned anything new? If the answer is no, Sales does not move.' },
          },
        ],
        check: [
          { q: 'In a T-account, entries on the left-hand side are:', opts: [
              'Debits',
              'Credits',
              'Always increases, whatever the account type',
              'Always decreases, whatever the account type'],
            ans: 0, exp: 'Left is debit, right is credit. Whether that is an increase or a decrease depends on the account type — DEAD CLIC decides.' },
          { q: 'Which ledger contains one account for each individual credit customer?', opts: [
              'The sales ledger',
              'The general ledger',
              'The purchases ledger',
              'The cash book'],
            ans: 0, exp: 'The sales ledger holds an account per credit customer. The general ledger holds the single sales ledger control account that summarises them all.' },
          { type: 'truefalse', q: 'Identify whether the following statements are true or false.',
            statements: [
              { text: 'The sales and purchases ledgers sit outside the double entry.', answer: true },
              { text: 'When a credit customer pays, the Sales account is credited again.', answer: false },
              { text: 'Money paid into the bank is recorded on the debit side of the bank account.', answer: true },
              { text: 'Each T-account entry names the other account in the double entry.', answer: true },
            ],
            exp: 'Recording sales twice — once at invoice and again at receipt — is the classic beginner error. The receipt moves value between two assets.' },
          { type: 'numeric', q: 'A Bank T-account has debits of £14,600 and credits of £9,250. What is the balance, in £?',
            answer: 5350, unit: '£',
            steps: ['Total the debit side: £14,600.', 'Total the credit side: £9,250.', 'Balance = £14,600 − £9,250 = £5,350 debit.'],
            exp: 'Debits exceed credits, so the bank has a debit balance of £5,350 — a positive balance, since bank is an asset.' },
        ],
      },
      {
        id: 'L-itbk-4',
        title: 'Source documents and the paper trail',
        icon: '📄',
        skills: ['itbk-docs'],
        cards: [
          {
            h: 'Nothing is recorded without evidence',
            p: [
              'Every entry in the ledgers must be supported by a **source document** — a piece of evidence that the transaction happened and for how much.',
              'This is not bureaucracy. It is what makes the records checkable: by a manager, by an auditor, or by HMRC. If you cannot evidence an entry, you cannot defend it.',
            ],
          },
          {
            h: 'The order-to-payment trail',
            p: [
              'For a credit purchase, the documents appear in a fixed sequence. Knowing the order is worth marks on its own.',
            ],
            flow: ['Purchase order', 'Goods received note', 'Purchase invoice', 'Statement', 'Remittance advice', 'Payment'],
          },
          {
            h: 'What each document does',
            p: [
              'Each document answers a different question, and that is how you tell them apart: who asked for what, what actually arrived, and what is owed.',
              'A delivery note is never a demand for money, and an invoice is never proof of delivery. Confusing the two is the most common error in this task.',
            ],
            table: {
              headers: ['Document', 'Who sends it', 'What it does'],
              rows: [
                ['Purchase order', 'Buyer → supplier', 'Requests goods at an agreed price'],
                ['Delivery note', 'Supplier → buyer', 'Accompanies the goods on delivery'],
                ['Goods received note (GRN)', 'Internal', 'Confirms goods arrived and were checked'],
                ['Invoice', 'Seller → buyer', 'Requests payment for goods supplied'],
                ['Credit note', 'Seller → buyer', 'Reduces the amount the buyer owes'],
                ['Statement of account', 'Seller → buyer', 'Lists the month\'s transactions and balance'],
                ['Remittance advice', 'Buyer → seller', 'Says which invoices a payment covers'],
              ],
            },
          },
          {
            h: 'The three-way match',
            p: [
              'Before a purchase invoice is authorised for payment, it is checked against two other documents:',
              '**Purchase order** — were these goods actually ordered, at this price?',
              '**Goods received note** — did they actually arrive, and were they checked?',
              'If all three agree, the invoice is authorised. If any disagree, it is queried. This single control stops most duplicate payments and a good deal of fraud.',
            ],
            callout: { kind: 'key', text: 'Three-way match: purchase order + goods received note + invoice. If you remember one control from this unit, make it this one.' },
          },
          {
            h: 'Invoice or credit note?',
            p: [
              'A credit note is not a cancelled invoice. It is a separate document that reduces a balance already recorded, and the original invoice stays in the records.',
              'Issue one when goods are returned, when an overcharge is found, or when a price is reduced after the event.',
            ],
            split: {
              left: { title: 'Invoice', items: [
                'Issued when goods or services are supplied',
                'Increases the amount the customer owes',
                'Seller: Dr Trade receivables, Cr Sales',
                'Recorded in the sales day book',
              ] },
              right: { title: 'Credit note', items: [
                'Issued for returns, overcharges or damaged goods',
                'Decreases the amount the customer owes',
                'Seller: Dr Sales returns, Cr Trade receivables',
                'Recorded in the sales returns day book',
              ] },
            },
          },
          {
            h: 'Checking an invoice',
            p: [
              'Check in a fixed order — quantities against the goods received note, prices against the purchase order, then trade and settlement discounts, then the VAT. A fixed order is what stops something being missed.',
            ],
            worked: {
              title: 'Does the invoice add up?',
              problem: 'An invoice shows 40 units at £12.50 each, less a 10% trade discount, plus VAT at 20%. The supplier has billed a total of £540.00. Is that right?',
              steps: [
                { do: 'Calculate the list price: **40 × £12.50 = £500.00**.', why: 'Always start from quantity × unit price before any discount.' },
                { do: 'Deduct the trade discount: **£500.00 × 10% = £50.00**, so net = **£450.00**.', why: 'Trade discount is deducted before VAT is calculated — it reduces the amount actually charged.' },
                { do: 'Calculate VAT on the net figure: **£450.00 × 20% = £90.00**.', why: 'VAT is always charged on the discounted (net) amount, never on the list price.' },
                { do: 'Total the invoice: **£450.00 + £90.00 = £540.00**.', why: 'This matches the supplier\'s figure, so the invoice is arithmetically correct and can be passed for authorisation.' },
              ],
              answer: 'Yes — £540.00 is correct',
              tryIt: {
                q: 'An invoice shows 25 units at £16.00, less 20% trade discount, plus VAT at 20%. What is the total, in £?',
                answer: 384, unit: '£',
                hint: 'List price first, then take off the trade discount, then add VAT to the discounted figure.',
                exp: '25 × £16.00 = £400.00. Less 20% = £320.00 net. VAT = £320.00 × 20% = £64.00. Total = £384.00.',
              },
            },
          },
        ],
        check: [
          { q: 'Which document confirms that goods have arrived and been checked against the order?', opts: [
              'The goods received note raised when the delivery is checked',
              'The purchase order sent to the supplier requesting the goods',
              'The invoice received from the supplier requesting payment',
              'The remittance advice sent when the invoice is settled'],
            ans: 0, exp: 'The GRN is the internal record that the goods physically arrived and were inspected — the second leg of the three-way match.' },
          { type: 'numeric', q: 'An invoice shows 30 units at £20.00, less 25% trade discount, plus VAT at 20%. What is the invoice total, in £?',
            answer: 540, unit: '£',
            steps: ['List price: 30 × £20.00 = £600.00.', 'Less 25% trade discount: £600.00 − £150.00 = £450.00 net.', 'VAT: £450.00 × 20% = £90.00.', 'Total: £450.00 + £90.00 = £540.00.'],
            exp: 'Trade discount comes off before VAT is calculated. VAT is never charged on the list price.' },
          { type: 'truefalse', q: 'Identify whether the following statements about source documents are true or false.',
            statements: [
              { text: 'A credit note reduces the amount a customer owes.', answer: true },
              { text: 'A remittance advice is sent by the seller to request payment.', answer: false },
              { text: 'The three-way match compares the purchase order, goods received note and invoice.', answer: true },
              { text: 'Every ledger entry should be supported by a source document.', answer: true },
            ],
            exp: 'A remittance advice goes the other way — buyer to seller — telling the supplier which invoices a payment covers. The seller requests payment with an invoice.' },
          { q: 'A supplier invoice arrives with no purchase order and no goods received note on file. What should happen?', opts: [
              'The invoice is queried and held until both documents can be produced',
              'The invoice is paid, because the supplier would not invoice without cause',
              'The invoice is paid in part, with the balance held back until next month',
              'The invoice is destroyed and the supplier asked to issue a fresh one'],
            ans: 0, exp: 'Without the purchase order there is no evidence the goods were ordered at that price; without the GRN there is no evidence they arrived. Paying regardless defeats the control.' },
        ],
      },
      {
        id: 'L-itbk-5',
        title: 'Balancing off and the trial balance',
        icon: '📊',
        skills: ['itbk-tb'],
        cards: [
          {
            h: 'Balancing an account',
            p: [
              'To balance off an account: total both sides, find the difference, and insert it on the **smaller side** as the **balance carried down (c/d)**.',
              'Then bring the same figure down on the **opposite side** below the totals as the **balance brought down (b/d)**. The b/d balance is the figure you use.',
              'A b/d balance on the debit side means a debit balance — typical for assets and expenses. A credit b/d balance is typical for liabilities, income and capital.',
            ],
          },
          {
            h: 'Building the trial balance',
            p: [
              'The **trial balance** lists every ledger balance in two columns: debits and credits. If the double entry has been done arithmetically correctly, the columns agree.',
              'Think DEAD CLIC: expenses, assets and drawings sit in the debit column; liabilities, income and capital sit in the credit column.',
            ],
            example: {
              title: 'Mini trial balance',
              rows: [
                ['Bank (asset)', 'Debit £3,200'],
                ['Trade payables', 'Credit £1,400'],
                ['Sales', 'Credit £9,800'],
                ['Purchases', 'Debit £5,500'],
                ['Capital', 'Credit £2,000'],
                ['Rent expense', 'Debit £4,500'],
                ['Totals', '£13,200 each side'],
              ],
            },
          },
          {
            h: 'What the trial balance proves — and what it does not',
            p: [
              'An agreeing trial balance proves the **arithmetic** of the double entry: every debit had an equal credit.',
              'It does **not** prove the entries are correct. A transaction missed entirely, or posted to the wrong account, still balances. You will meet these hidden errors in Bookkeeping Controls.',
            ],
          },
          {
            h: 'The accounting equation',
            p: [
              'Behind everything sits the accounting equation: **Assets = Liabilities + Capital**.',
              'Capital itself grows with profit and shrinks with drawings: capital equals what the owner put in, plus profit, minus drawings.',
            ],
          },
          {
            h: 'Accounting equation formulas',
            p: [
              'These three rearrangements cover every accounting equation question.',
            ],
            formula: 'Assets = Capital + Liabilities · Capital = Assets − Liabilities · Closing capital = Opening capital + Profit − Drawings',
          },
          {
            h: 'The trial balance is a checkpoint, not a guarantee',
            p: [
              'Agreement of a trial balance is a necessary check but not a sufficient one.',
            ],
            callout: {
              kind: 'key',
              text: 'A trial balance that agrees only proves that total debits equal total credits — it does not prove every transaction was recorded correctly. Six types of error leave the trial balance in perfect balance while hiding mistakes in the accounts.',
            },
          },
        ],
        check: [
          {
            q: 'When balancing off an account, where is the balance c/d entered?',
            opts: ['On the larger side', 'On the side with the smaller total', 'Always on the debit side', 'Below the totals'],
            ans: 1,
            exp: 'The balance c/d goes on the smaller side so that both column totals agree. The b/d then opens on the opposite side.',
          },
          {
            q: 'Which of these would normally appear in the DEBIT column of a trial balance?',
            opts: ['Motor vehicles', 'Sales', 'Capital', 'Bank loan'],
            ans: 0,
            exp: 'Motor vehicles are an asset, and assets carry debit balances per DEAD CLIC.',
          },
          {
            q: 'A business has assets of £50,000 and liabilities of £18,000. What is its capital?',
            opts: ['£68,000', '£50,000', '£18,000', '£32,000'],
            ans: 3,
            exp: 'Capital = Assets − Liabilities: £50,000 − £18,000 = £32,000.',
          },
          {
            q: 'A trial balance agrees. What does that prove?',
            opts: ['Every transaction was recorded', 'No entries went to the wrong account', 'Total debits equal total credits', 'The business made a profit'],
            ans: 2,
            exp: 'Agreement only proves arithmetic equality — some errors, such as errors of omission or commission, do not disturb the balance.',
          },
          {
            q: 'A business has opening capital of £15,000, made a profit of £8,000 and the owner withdrew drawings of £3,000. What is closing capital?',
            opts: ['£20,000', '£26,000', '£10,000', '£23,000'],
            ans: 0,
            exp: 'Closing capital = £15,000 + £8,000 − £3,000 = £20,000. Profit increases capital; drawings reduce it.',
          },
          {
            q: 'The debit column of a trial balance totals £48,600 and the credit column totals £48,200. What is the most appropriate immediate action?',
            opts: ['Delete all entries and start again', 'Open a suspense account with a £400 credit entry', 'Open a suspense account with a £400 debit entry', 'Assume the difference will resolve itself'],
            ans: 1,
            exp: 'Debits (£48,600) exceed credits (£48,200) by £400. To balance the trial balance temporarily, a £400 credit is entered in a suspense account while the error is investigated.',
          },
          {
            q: 'Which of the following would appear as a CREDIT balance on the trial balance?',
            opts: ['Trade receivables', 'Drawings', 'Sales revenue', 'Motor vehicles'],
            ans: 2,
            exp: 'Sales revenue is income — it has a credit balance (CLIC: Credits = Liabilities, Income, Capital). Trade receivables, drawings and motor vehicles are assets/expenses with debit balances.',
          },
        ],
      },
      {
        id: 'L-itbk-6',
        title: 'Spreading and matching costs',
        icon: '📉',
        skills: ['itbk-adjust'],
        cards: [
          {
            h: 'Why depreciate?',
            p: [
              'A machine bought for £10,000 helps you earn money for years. Charging all £10,000 against the first year would be misleading.',
              '**Depreciation** spreads the cost of a non-current asset over its useful life, matching the cost to the periods that benefit.',
            ],
          },
          {
            h: 'Straight-line depreciation',
            p: [
              'The **straight-line** method charges the same amount every year: cost minus residual value, divided by useful life.',
              'It suits assets that wear out evenly over time, like fixtures and fittings.',
            ],
            example: {
              title: 'Straight-line: machine £10,000, residual £2,000, 4-year life',
              rows: [
                ['Depreciable amount', '£10,000 minus £2,000 = £8,000'],
                ['Annual charge', '£8,000 divided by 4 = £2,000'],
                ['Charge in every year', '£2,000'],
              ],
            },
          },
          {
            h: 'Reducing balance depreciation',
            p: [
              'The **reducing balance** method applies a fixed percentage to the **carrying amount** (cost minus depreciation so far). The charge gets smaller each year.',
              'It suits assets that lose most value early, like vehicles and computers.',
            ],
            example: {
              title: 'Reducing balance: machine £10,000 at 20%',
              rows: [
                ['Year 1 charge', '20% of £10,000 = £2,000'],
                ['Carrying amount end of year 1', '£8,000'],
                ['Year 2 charge', '20% of £8,000 = £1,600'],
                ['Carrying amount end of year 2', '£6,400'],
              ],
            },
          },
          {
            h: 'Accruals and prepayments',
            p: [
              'The same matching idea applies to running costs. An **accrual** is an expense you have used but not yet been billed for — like electricity used in March, invoiced in April. Add it to the expense; it is a liability.',
              'A **prepayment** is the opposite: you have paid in advance, like a year of insurance covering part of next year. Take it out of the expense; it is an asset.',
            ],
          },
          {
            h: 'Depreciation and adjustments formulas',
            p: [
              'These formulas cover all the standard calculations for this topic.',
            ],
            formula: 'Straight-line charge = (Cost − Residual) ÷ Useful life · Reducing balance charge = Carrying value × Rate% · Carrying value = Cost − Accumulated depreciation · Prepayment = Months unused ÷ 12 × Annual cost',
          },
          {
            h: 'Matching is the core principle',
            p: [
              'Accruals and prepayments both serve the same goal as depreciation.',
            ],
            callout: {
              kind: 'key',
              text: 'The matching (accruals) concept requires that expenses are recognised in the period they are incurred, not when the cash is paid. Depreciation, accruals and prepayments all apply this concept — never show more or less expense than was actually used in the period.',
            },
          },
        ],
        check: [
          {
            q: 'What is the main purpose of depreciation?',
            opts: ['To save up cash to replace the asset', 'To show the asset at market value', 'To spread the cost of the asset over its useful life', 'To reduce the VAT due'],
            ans: 2,
            exp: 'Depreciation applies the matching concept by allocating the cost of an asset to the periods that benefit from its use.',
          },
          {
            q: 'Equipment cost £12,000 with a residual value of £2,000 and a 5-year life. What is the annual straight-line charge?',
            opts: ['£2,400', '£12,000', '£2,800', '£2,000'],
            ans: 3,
            exp: '(£12,000 − £2,000) ÷ 5 = £10,000 ÷ 5 = £2,000 per year.',
          },
          {
            q: 'A van cost £20,000 and is depreciated at 25% reducing balance. What is the year 2 charge?',
            opts: ['£3,750', '£5,000', '£15,000', '£2,500'],
            ans: 0,
            exp: 'Year 1 charge: 25% × £20,000 = £5,000. Carrying value: £15,000. Year 2 charge: 25% × £15,000 = £3,750.',
          },
          {
            q: 'Rent of £1,200 paid in March covers April. At the 31 March year end this is a what?',
            opts: ['An accrual', 'A prepayment', 'A drawing', 'A depreciation charge'],
            ans: 1,
            exp: 'It is paid in advance of the period it relates to, so it is a prepayment — treated as an asset at the year end.',
          },
          {
            q: 'Electricity used in December costs £300 but the bill arrives in January. At the 31 December year end, how should this be treated?',
            opts: ['Ignore it until the bill arrives', 'Record it as a prepayment asset of £300', 'Record it as an accrual — add £300 to the expense and show £300 as a liability', 'Debit the bank account £300'],
            ans: 2,
            exp: 'An accrual is needed because the expense was incurred in December even though payment comes later. It is added to the period\'s expenses and shown as a current liability.',
          },
          {
            q: 'A van costs £20,000 and is depreciated at 20% reducing balance. It has been owned for 2 full years. What is the depreciation charge in year 3?',
            opts: ['£4,000', '£3,200', '£2,560', '£12,800'],
            ans: 2,
            exp: 'Year 1: 20% × £20,000 = £4,000. CV after yr 1 = £16,000. Year 2: 20% × £16,000 = £3,200. CV after yr 2 = £12,800. Year 3: 20% × £12,800 = £2,560.',
          },
          {
            q: 'Insurance of £1,800 is paid on 1 October, covering 12 months to 30 September. At the 31 December year end, what is the prepayment?',
            opts: ['£1,800', '£450', '£1,350', '£600'],
            ans: 2,
            exp: 'The insurance covers October to September = 12 months. By 31 December, 3 months have been used (Oct, Nov, Dec). Remaining (prepayment) = 9/12 × £1,800 = £1,350.',
          },
        ],
      },
      {
        id: 'L-itbk-7',
        title: 'Capital vs revenue expenditure',
        icon: '🏗️',
        skills: ['itbk-docs'],
        cards: [
          {
            h: 'Capital expenditure (CapEx)',
            p: [
              '**Capital expenditure** buys or improves long-term assets that will benefit the business for more than one accounting period.',
              'Examples: buying a van, purchasing a building, installing new machinery, or extending a factory.',
              'CapEx is recorded on the **balance sheet** as a non-current asset, then depreciated over its useful life.',
            ],
          },
          {
            h: 'Revenue expenditure (RevEx)',
            p: [
              '**Revenue expenditure** is day-to-day spending that benefits only the current accounting period.',
              'Examples: repairs, fuel, wages, rent, insurance, and routine maintenance.',
              'RevEx is charged directly to the **income statement** in the period it arises.',
            ],
          },
          {
            h: 'Capital vs Revenue — side by side',
            p: [
              'The quickest test is to ask what the money bought: a *thing* the business will still own next year, or a *service consumed* this year.',
              'A second test settles most exam cases — did the spending **increase** what the asset can do, or merely **maintain** what it already did? Enhancement is capital; upkeep is revenue.',
              'Receipts split the same way. Selling a delivery van is a capital receipt; selling the goods it carried is a revenue receipt.',
            ],
            split: {
              left: { title: 'Capital expenditure', items: ['Buys or improves assets', 'Benefit spans > 1 year', 'Goes to balance sheet', 'Depreciated over time', 'E.g. new van £15,000'] },
              right: { title: 'Revenue expenditure', items: ['Day-to-day running cost', 'Benefit ≤ 1 year', 'Goes to income statement', 'Expensed immediately', 'E.g. van repair £300'] },
            },
          },
          {
            h: 'Borderline examples',
            p: [
              'The hard cases nearly always involve money spent on a non-current asset *after* it was bought.',
              'Anything needed to **get the asset ready for its first use** is capital, even when it looks like an expense: delivery, installation, legal fees on a building, testing before it goes into service.',
              'Anything that only **keeps it working** is revenue: servicing, replacing a worn part, road tax, insurance, cleaning.',
            ],
            example: {
              title: 'CapEx or RevEx?',
              rows: [
                ['Transaction', 'Type', 'Reason'],
                ['Buy delivery van £20,000', 'CapEx', 'Long-term asset'],
                ['Service the van £400', 'RevEx', 'Maintenance only'],
                ['Install a new engine £4,000', 'CapEx', 'Extends useful life'],
                ['Repaint the van £500', 'RevEx', 'Maintains condition'],
              ],
            },
          },
          {
            h: 'Why the classification matters',
            p: [
              'Treating CapEx as RevEx **understates profit** (too much expense charged) and **understates assets**.',
              'Treating RevEx as CapEx **overstates profit** and **overstates assets**.',
            ],
            callout: { kind: 'warning', text: '**Exam trap:** Replacing a broken window is RevEx (restoring to original condition). Adding a new floor to a building is CapEx (enhancing the asset). The key test: does it extend the asset\'s life or improve its capability?' },
          },
        ],
        check: [
          {
            q: 'A business buys new computer equipment for £5,000. How should this be classified?',
            opts: ['Revenue expenditure — charge to income statement', 'Capital expenditure — record as non-current asset', 'Revenue expenditure if under £10,000', 'Capital expenditure — charge to income statement'],
            ans: 1,
            exp: 'Computer equipment is a long-term asset used over several years, so it is capital expenditure recorded on the balance sheet.',
          },
          {
            q: 'A plumber charges £200 to fix a leaking pipe. This is best classified as:',
            opts: ['Capital expenditure', 'Revenue expenditure', 'Capital expenditure if over 5 years old', 'Neither — record as a liability'],
            ans: 1,
            exp: 'Repairing a fault restores the asset to its original condition — that is revenue expenditure, charged immediately to the income statement.',
          },
          {
            q: 'If a business incorrectly treats capital expenditure as revenue expenditure, what is the effect on reported profit?',
            opts: ['Profit is overstated', 'Profit is understated', 'No effect on profit', 'Assets are overstated'],
            ans: 1,
            exp: 'Treating CapEx as RevEx charges too much expense in the period, so profit is understated. Assets are also understated.',
          },
          {
            q: 'Which of the following is capital expenditure?',
            opts: ['Annual insurance premium £1,200', 'Monthly wages £8,000', 'Extension to the factory building £30,000', 'Replacement of broken windows £600'],
            ans: 2,
            exp: 'Extending a building enhances a long-term asset — capital expenditure. Insurance and wages are running costs (RevEx), and replacing broken windows merely restores the original condition (RevEx).',
          },
          {
            q: 'Which accounting principle supports the distinction between CapEx and RevEx?',
            opts: ['Prudence', 'Matching (accruals)', 'Entity', 'Going concern'],
            ans: 1,
            exp: 'The matching principle requires costs to be charged in the period their benefit is received. RevEx benefits one period; CapEx benefits several, so it is spread via depreciation.',
          },
        ],
      },
      {
        id: 'L-itbk-8',
        title: 'VAT: records and the return',
        icon: '🧾',
        skills: ['itbk-docs'],
        cards: [
          {
            h: 'What is VAT?',
            p: [
              '**Value Added Tax (VAT)** is collected by VAT-registered businesses on behalf of HMRC.',
              'The standard rate is **20%**. Businesses charge VAT on sales (**output VAT**) and reclaim VAT on purchases (**input VAT**).',
              'Only the **net difference** is paid to (or refunded by) HMRC.',
            ],
            formula: 'Output VAT (on sales) − Input VAT (on purchases) = VAT payable · If Input VAT > Output VAT → HMRC refunds the difference',
          },
          {
            h: 'Calculating VAT',
            p: [
              '**Net to gross:** Net × 1.20 = Gross; VAT = Net × 20%.',
              '**Gross to net:** Gross ÷ 1.20 = Net; VAT = Gross ÷ 6.',
            ],
            example: {
              title: 'VAT calculations',
              rows: [
                ['Given', 'Formula', 'Result'],
                ['Net £500', '× 20%', 'VAT = £100; Gross = £600'],
                ['Gross £720', '÷ 6', 'VAT = £120; Net = £600'],
              ],
            },
          },
          {
            h: 'VAT control account',
            p: [
              'The VAT control account brings both sides of VAT together so that only the **net** amount is ever settled with HMRC.',
              'It is normally a liability, so a credit balance means VAT is owed to HMRC and a debit balance means a refund is due. Input VAT sits on the debit side because it is recoverable.',
            ],
            split: {
              left: { title: 'Debit side (input VAT)', items: ['VAT on purchases', 'VAT on expenses', 'VAT refunds from HMRC', 'Reduces what is owed'] },
              right: { title: 'Credit side (output VAT)', items: ['VAT on sales', 'VAT on other income', 'Increases what is owed', 'Credit balance = owe HMRC'] },
            },
          },
          {
            h: 'VAT records and daybooks',
            p: [
              'Businesses record VAT in the **sales daybook** and **purchases daybook** — each has columns for net, VAT, and gross.',
              'The VAT figures from these books are posted to the **VAT control account** in the general ledger.',
              'The balance on the VAT control account shows how much is owed to (or owed by) HMRC.',
            ],
          },
          {
            h: 'VAT returns',
            p: [
              'Most businesses file VAT returns **quarterly** via HMRC\'s Making Tax Digital (MTD) portal.',
              'A credit balance on the VAT control account means the business owes HMRC; a debit balance means HMRC owes a refund.',
            ],
            callout: { kind: 'key', text: '**Key rule:** VAT is a **balance sheet item** — it is a creditor or debtor, NOT income or expense. Only the net (ex-VAT) amounts pass through the income statement.' },
          },
        ],
        check: [
          {
            q: 'A business charges £3,000 net + VAT on a sale and pays £1,200 net + VAT on a purchase. What VAT is payable to HMRC?',
            opts: ['£600', '£360', '£240', '£420'],
            ans: 1,
            exp: 'Output VAT = £3,000 × 20% = £600. Input VAT = £1,200 × 20% = £240. VAT payable = £600 − £240 = £360.',
          },
          {
            q: 'A customer pays £480 including VAT at 20%. What is the VAT element?',
            opts: ['£96', '£80', '£100', '£400'],
            ans: 1,
            exp: 'VAT = £480 ÷ 6 = £80. Alternatively: net = £480 ÷ 1.20 = £400; VAT = £480 − £400 = £80.',
          },
          {
            q: 'In the VAT control account, where is input VAT (VAT on purchases) recorded?',
            opts: ['Credit side', 'Debit side', 'Both sides equally', 'It is not recorded in the VAT control account'],
            ans: 1,
            exp: 'Input VAT reduces what the business owes HMRC, so it is a debit entry in the VAT control account.',
          },
          {
            q: 'A business\'s VAT control account shows input VAT of £2,100 and output VAT of £1,750. What does this mean?',
            opts: ['The business owes HMRC £350', 'HMRC owes the business £350', 'The business breaks even on VAT', 'The business must charge more output VAT'],
            ans: 1,
            exp: 'Input VAT (£2,100) exceeds output VAT (£1,750), so there is a net refund of £350 from HMRC.',
          },
          {
            q: 'VAT on sales appears in which column of the sales daybook?',
            opts: ['Net column', 'VAT column', 'Gross column', 'Discount column'],
            ans: 1,
            exp: 'The sales daybook has three amount columns — net, VAT, and gross. VAT on each sale goes in the VAT column.',
          },
        ],
      },
      {
        id: 'L-itbk-9',
        title: 'Day books and source documents',
        icon: '📋',
        skills: ['itbk-docs'],
        cards: [
          {
            h: 'The document trail',
            p: [
              'Every business transaction starts with a **source document**. The chain is: Purchase Order → Delivery Note → Invoice → (Credit Note if needed) → Statement of Account → Remittance Advice.',
              'Source documents provide the evidence to record transactions. Without them, there is no audit trail.',
            ],
            flow: ['Purchase order', 'Delivery note', 'Invoice (or credit note)', 'Statement of account', 'Remittance advice'],
          },
          {
            h: 'Which document does what?',
            p: [
              'The documents fall into three jobs: **requesting** goods, **evidencing** their movement, and **demanding or acknowledging** money.',
              'A statement of account is a periodic summary, not a fresh charge. Treating it as a new liability — or paying against it instead of the individual invoices — is a classic error.',
            ],
            example: {
              title: 'Key source documents',
              rows: [
                ['Document', 'Sent by', 'Purpose'],
                ['Purchase order', 'Buyer', 'Request to supplier for goods/services'],
                ['Delivery note', 'Supplier', 'Confirms goods dispatched; signed on receipt'],
                ['Invoice', 'Supplier', 'Demands payment — the basis for recording'],
                ['Credit note', 'Supplier', 'Reduces amount owed (returns or overcharges)'],
                ['Statement', 'Supplier', 'Summary of all transactions in the period'],
                ['Remittance advice', 'Buyer', 'Tells supplier which invoices payment covers'],
              ],
            },
          },
          {
            h: 'Books of prime entry',
            p: [
              'Transactions are first recorded in a **book of prime entry** (also called a daybook or journal). These are NOT part of the double-entry system — they are just listing records.',
              'From the daybook, totals are posted into the ledger accounts.',
            ],
            split: {
              left: { title: 'Sales side', items: ['Sales daybook — credit sales', 'Sales returns daybook — credit notes sent to customers', 'Cash receipts section of cash book'] },
              right: { title: 'Purchases side', items: ['Purchases daybook — credit purchases', 'Purchases returns daybook — credit notes received from suppliers', 'Cash payments section of cash book'] },
            },
          },
          {
            h: 'Inside the sales daybook',
            p: [
              'The daybook lists each invoice across net, VAT and gross columns. Only the **totals** are posted to the ledger, which is exactly what makes daybooks efficient.',
              'Cross-cast before posting: net plus VAT must equal gross on every line and in the totals, and the gross total is the figure that goes to the SLCA.',
            ],
            example: {
              title: 'Sales daybook — example entries',
              rows: [
                ['Date', 'Customer', 'Invoice no.', 'Gross (£)', 'VAT (£)', 'Net (£)'],
                ['1 Jun', 'Ahmed Ltd', 'SL001', '1,200.00', '200.00', '1,000.00'],
                ['3 Jun', 'Baker Co', 'SL002', '600.00', '100.00', '500.00'],
                ['Totals posted to ledger →', 'Dr SLCA', '£1,800', 'Cr VAT', '£300', 'Cr Sales £1,500'],
              ],
            },
          },
          {
            h: 'Purchases returns and credit notes',
            p: [
              'When goods are **returned to a supplier**, the supplier issues a **credit note** — reducing what the buyer owes.',
              'Credit notes received are recorded in the **purchases returns daybook**: Dr PLCA, Cr Purchases returns, Cr VAT.',
              'When goods are **returned by a customer**, the seller issues a credit note. These go in the **sales returns daybook**: Dr Sales returns, Dr VAT, Cr SLCA.',
            ],
            callout: { kind: 'key', text: '**Key rule:** A debit note is sometimes used by the BUYER to formally request a credit note from the supplier. It is not a standard source document — the supplier\'s credit note is the one that matters.' },
          },
        ],
        check: [
          {
            q: 'A business purchases goods on credit. What document does the SUPPLIER send to request payment?',
            opts: ['Purchase order', 'Delivery note', 'Invoice', 'Remittance advice'],
            ans: 2,
            exp: 'The supplier sends an invoice to request payment. The purchase order came from the buyer; the delivery note confirms dispatch; the remittance advice is sent by the buyer with payment.',
          },
          {
            q: 'A customer returns faulty goods. What document does the SELLER send?',
            opts: ['Invoice', 'Credit note', 'Debit note', 'Purchase order'],
            ans: 1,
            exp: 'The seller sends a credit note to reduce the amount owed by the customer for the returned goods.',
          },
          {
            q: 'In which book of prime entry are credit purchases recorded?',
            opts: ['Sales daybook', 'Cash book', 'Purchases daybook', 'Petty cash book'],
            ans: 2,
            exp: 'Credit purchases (goods bought on credit from suppliers) are listed in the purchases daybook.',
          },
          {
            q: 'The VAT totals column from the purchases daybook is posted as a debit to which account?',
            opts: ['Sales account', 'VAT control account', 'SLCA', 'Purchases returns'],
            ans: 1,
            exp: 'Input VAT (on purchases) is debited to the VAT control account, reducing the amount owed to HMRC.',
          },
          {
            q: 'A credit note received from a supplier is recorded in which book of prime entry?',
            opts: ['Sales returns daybook', 'Purchases daybook', 'Purchases returns daybook', 'Cash book'],
            ans: 2,
            exp: 'Credit notes RECEIVED from suppliers (when goods are returned to the supplier) go in the purchases returns daybook.',
          },
          {
            q: 'A statement of account is sent by the SUPPLIER to the buyer. Its purpose is to:',
            opts: ['Confirm an order has been placed', 'List all transactions between the two parties in the period', 'Prove goods have been received', 'Authorise payment'],
            ans: 1,
            exp: 'A statement of account is a periodic summary of invoices, credit notes and payments, used by the buyer to reconcile against their own purchase ledger records.',
          },
          {
            q: 'The net column total from the sales daybook is posted as a credit to which account?',
            opts: ['SLCA', 'Bank', 'Sales returns', 'Sales account'],
            ans: 3,
            exp: 'The net (ex-VAT) total of credit sales is credited to the Sales account. The gross total is debited to the SLCA; the VAT total is credited to the VAT control account.',
          },
        ],
      },
      {
        id: 'L-itbk-10',
        title: 'Ledger accounts in practice',
        icon: '📒',
        skills: ['itbk-de', 'itbk-cashbook'],
        cards: [
          {
            h: 'Three levels of ledger',
            p: [
              'The **general (nominal) ledger** contains all the double-entry accounts: assets, liabilities, income, expenses, capital. It is the heart of the accounting system.',
              'The **sales ledger** holds individual customer accounts (memorandum accounts — not part of double entry). The SLCA in the general ledger is the summary.',
              'The **purchase ledger** holds individual supplier accounts. The PLCA in the general ledger is the summary.',
            ],
          },
          {
            h: 'Posting from the sales daybook',
            p: [
              'Daybook postings happen **in total** for the general ledger and **individually** for the personal ledgers.',
              'From the sales daybook totals: **Dr SLCA** (gross total), **Cr Sales** (net total), **Cr VAT control** (VAT total).',
              'Individually: each customer\'s account in the sales ledger is debited with the gross invoice amount.',
            ],
            example: {
              title: 'Posting the sales daybook',
              rows: [
                ['General ledger', 'Dr', 'Cr'],
                ['SLCA (control)', '1,800', ''],
                ['Sales account', '', '1,500'],
                ['VAT control', '', '300'],
                ['Sales ledger (memorandum)', 'Dr', ''],
                ['Ahmed Ltd', '1,200', ''],
                ['Baker Co', '600', ''],
              ],
            },
          },
          {
            h: 'Posting from the purchases daybook',
            p: [
              'From the purchases daybook totals: **Dr Purchases** (net total), **Dr VAT control** (VAT total), **Cr PLCA** (gross total).',
              'Individually: each supplier\'s account in the purchase ledger is credited with the gross invoice amount.',
            ],
          },
          {
            h: 'Contra entries',
            p: [
              'A **contra entry** (or set-off) arises when a business is BOTH a customer AND a supplier.',
              'Instead of paying each other separately, the two balances are offset: **Dr PLCA, Cr SLCA** for the agreed amount.',
              'The net amount is then settled in cash. Contra entries reduce balances on BOTH control accounts.',
            ],
            callout: { kind: 'tip', text: '**Exam tip:** Contras appear in BOTH the SLCA and PLCA reconciliations. They reduce customer balances (Cr SLCA) and supplier balances (Dr PLCA) by the same amount.' },
          },
          {
            h: 'From transaction to trial balance',
            p: [
              'Everything in bookkeeping runs along this one chain, and every task in the assessment sits somewhere on it. Knowing where you are on the chain usually tells you what the question wants.',
              'Note where the double entry actually starts. The daybook is a **listing** record and is not part of the double entry; the entry begins when the daybook totals are posted to the ledger.',
            ],
            flow: ['Source document', 'Book of prime entry (daybook)', 'Ledger account (general + personal)', 'Trial balance (all general ledger balances)'],
          },
        ],
        check: [
          {
            q: 'Individual customer account balances are kept in which ledger?',
            opts: ['General ledger', 'Purchase ledger', 'Sales ledger', 'Cash book'],
            ans: 2,
            exp: 'The sales ledger contains individual customer accounts. The SLCA in the general ledger is the summary control account.',
          },
          {
            q: 'The gross total of the sales daybook is posted to which account in the general ledger?',
            opts: ['Dr Sales account', 'Cr SLCA', 'Dr SLCA', 'Dr VAT control'],
            ans: 2,
            exp: 'The SLCA (Sales Ledger Control Account) is debited with the gross total from the sales daybook, representing total amounts owed by credit customers.',
          },
          {
            q: 'When the purchases daybook totals are posted, which account is CREDITED?',
            opts: ['Purchases account', 'VAT control account', 'PLCA', 'SLCA'],
            ans: 2,
            exp: 'The PLCA (Purchase Ledger Control Account) is credited with the gross total, representing amounts owed to credit suppliers.',
          },
          {
            q: 'A contra entry between a customer and a supplier involves which journal entries?',
            opts: ['Dr SLCA, Cr Bank', 'Dr PLCA, Cr SLCA', 'Dr SLCA, Cr PLCA', 'Dr Bank, Cr PLCA'],
            ans: 1,
            exp: 'A contra reduces what is owed to the supplier (Dr PLCA) and what the customer owes to us (Cr SLCA). The net amount is settled separately.',
          },
          {
            q: 'The SLCA balance on the trial balance should equal:',
            opts: ['The total of individual sales invoices', 'The sum of all individual customer balances in the sales ledger', 'The total cash received from customers', 'The balance of the bank account'],
            ans: 1,
            exp: 'The SLCA is a control account. Its balance should agree with the total of all individual customer balances in the memorandum sales ledger.',
          },
          {
            q: 'Why are daybook totals posted to the general ledger rather than individual entries?',
            opts: ['It is a legal requirement', 'It saves time while maintaining double-entry completeness', 'Individual entries go directly to ledger accounts', 'Daybooks are only used for VAT'],
            ans: 1,
            exp: 'Posting totals (rather than every individual transaction) maintains double-entry but reduces the volume of ledger postings. Individual entries go to personal (memorandum) accounts.',
          },
          {
            q: 'Which ledger is NOT part of the double-entry bookkeeping system?',
            opts: ['General ledger', 'Personal (sales and purchase) ledgers', 'Both are part of double entry', 'Neither is part of double entry'],
            ans: 1,
            exp: 'Personal ledgers (sales ledger and purchase ledger) are MEMORANDUM records — they are NOT part of double-entry. The SLCA and PLCA in the general ledger ARE part of double-entry.',
          },
        ],
      },
      {
        id: 'L-itbk-11',
        title: 'Accruals and prepayments',
        icon: '⏱️',
        skills: ['itbk-adjust'],
        cards: [
          {
            h: 'The accruals concept in action',
            p: [
              'Income and expenses must be recognised in the period they relate to — not when cash moves. This is the **accruals (matching) concept**, one of the fundamental accounting principles.',
              'At year end, we must make adjustments so that the financial statements reflect what has genuinely been earned or incurred during the period — regardless of whether cash has been received or paid.',
              'Two key adjustments arise: an **accrual** (expense incurred but not yet paid — e.g. an electricity bill not yet received) and a **prepayment** (expense paid in advance, benefit not yet received — e.g. insurance paid for future months).',
            ],
          },
          {
            h: 'Recording an accrual',
            p: [
              'An accrual arises when an expense has been incurred in the period but no invoice or payment has yet been processed. We must add the amount to the expense account and create a corresponding current liability.',
            ],
            formula: 'Accrual entry: Dr Expense account, Cr Accruals (liability)·Effect: increases expense on income statement, creates current liability on SFP·Reversal at start of next year: Dr Accruals, Cr Expense',
            example: {
              title: 'Accrual example',
              rows: [
                ['Scenario', 'Electricity bill £400 for Dec not yet received'],
                ['Adjustment (31 Dec)', 'Dr Electricity £400 / Cr Accruals £400'],
                ['Effect', 'Adds £400 to expense this year; creates £400 liability'],
              ],
            },
          },
          {
            h: 'Recording a prepayment',
            p: [
              'A prepayment arises when a business has paid in advance for a benefit that extends beyond the current accounting period. The portion relating to future periods must be removed from the expense account and shown as a current asset.',
            ],
            formula: 'Prepayment entry: Dr Prepayments (asset), Cr Expense·Effect: reduces expense on income statement, creates current asset on SFP·Amount remaining = months paid × monthly rate',
            example: {
              title: 'Prepayment example',
              rows: [
                ['Scenario', 'Insurance £1,200 paid 1 Oct, covering 12 months'],
                ['At 31 Dec (3 months used)', 'Expense = 3/12 × £1,200 = £300'],
                ['Prepayment (asset)', '9/12 × £1,200 = £900'],
                ['Adjustment', 'Dr Prepayments £900 / Cr Insurance £900'],
              ],
            },
          },
          {
            h: 'Adjusting the trial balance',
            p: [
              'The trial balance shows balances before adjustments. After calculating accruals and prepayments, we adjust the relevant expense accounts. The adjusted figures go into the income statement (profit and loss account).',
            ],
            split: {
              left: {
                title: 'Accruals increase expenses',
                items: [
                  'Add accrual to the expense balance',
                  'Create a liability in current liabilities',
                  'Example: Rent accrued £500 → Dr Rent £500, Cr Accruals £500',
                ],
              },
              right: {
                title: 'Prepayments reduce expenses',
                items: [
                  'Deduct prepayment from the expense balance',
                  'Create an asset in current assets',
                  'Example: Insurance prepaid £200 → Dr Prepayments £200, Cr Insurance £200',
                ],
              },
            },
          },
          {
            h: 'Accrued income and deferred income',
            p: [
              'Accrued income is income earned but not yet received (e.g. rent receivable owed at year end): Dr Accrued income (asset), Cr Income.',
              'Deferred income is cash received for income not yet earned (e.g. a subscription received in advance): Dr Income, Cr Deferred income (liability).',
            ],
            callout: { kind: 'key', text: 'The accruals concept ensures that financial statements show economic reality — not just cash movements.' },
          },
        ],
        check: [
          {
            q: 'A business receives an electricity bill for £600 relating to December but does not pay it until January. What is the correct adjustment at 31 December?',
            opts: ['No adjustment needed — pay in January', 'Dr Electricity £600; Cr Accruals £600', 'Dr Accruals £600; Cr Electricity £600', 'Dr Bank £600; Cr Electricity £600'],
            ans: 1,
            exp: 'An expense incurred but not yet paid is an accrual. Debit the expense account to recognise the cost; credit the accruals liability.',
          },
          {
            q: 'A business pays £2,400 for rent on 1 October, covering the next 12 months. At 31 December (3 months later) what is the prepayment?',
            opts: ['£600', '£1,800', '£2,400', '£200'],
            ans: 1,
            exp: '3 months used (Oct–Dec); 9 months remain. Prepayment = 9/12 × £2,400 = £1,800.',
          },
          {
            q: 'A prepayment appears in the statement of financial position as:',
            opts: ['A current liability', 'A non-current asset', 'A current asset', 'Capital'],
            ans: 2,
            exp: 'A prepayment is money paid in advance — it is a benefit still to be received, so it is a current asset.',
          },
          {
            q: 'Which accounting concept requires accruals and prepayments?',
            opts: ['The going concern concept', 'The accruals (matching) concept', 'The consistency concept', 'The prudence concept'],
            ans: 1,
            exp: 'The accruals (matching) concept requires income and expenses to be recognised in the period they relate to, not when cash is received or paid.',
          },
          {
            q: 'Rent of £1,200 is received on 1 December for the next 3 months. At 31 December, the deferred income balance is:',
            opts: ['£400', '£800', '£1,200', '£600'],
            ans: 1,
            exp: '1 month used (December); 2 months still deferred. Deferred income = 2/3 × £1,200 = £800.',
          },
        ],
      },
      {
        id: 'L-itbk-12',
        title: 'The Statement of Financial Position',
        icon: '📋',
        skills: ['itbk-tb', 'itbk-adjust'],
        cards: [
          {
            h: 'What the SFP tells you',
            p: [
              'The statement of financial position (SFP, formerly the balance sheet) shows what a business owns (assets), what it owes (liabilities), and how it is funded (capital/equity) at a specific point in time.',
              'It is a snapshot, not a period summary. The accounting equation that underpins it: **Assets = Capital + Liabilities**.',
            ],
            flow: ['Non-current assets', 'Current assets', 'TOTAL ASSETS', 'Capital', 'Non-current liabilities', 'Current liabilities', 'TOTAL CAPITAL + LIABILITIES'],
          },
          {
            h: 'Non-current assets',
            p: [
              'Non-current assets (also called fixed assets) are resources owned for more than one year and used in the business — not for resale. They are shown at **carrying value** (cost less accumulated depreciation).',
            ],
            example: {
              title: 'Non-current assets section',
              rows: [
                ['Asset', 'Cost', 'Acc. Dep\'n', 'Carrying value'],
                ['Premises', '£50,000', '—', '£50,000'],
                ['Motor vehicles', '£18,000', '£6,000', '£12,000'],
                ['Equipment', '£8,000', '£3,200', '£4,800'],
                ['Total NCAs', '', '', '£66,800'],
              ],
            },
          },
          {
            h: 'Current assets and liabilities',
            p: [
              'Current assets are assets that will convert to cash within 12 months: inventory (stock), trade receivables, prepayments, and bank/cash. Current liabilities are amounts due for payment within 12 months: trade payables, accruals, bank overdraft, and VAT payable.',
            ],
            split: {
              left: {
                title: 'Current assets',
                items: ['Inventory (closing stock)', 'Trade receivables', 'Prepayments', 'Bank / cash'],
              },
              right: {
                title: 'Current liabilities',
                items: ['Trade payables', 'Accruals', 'Bank overdraft', 'VAT payable'],
              },
            },
          },
          {
            h: 'The capital section',
            p: [
              'For a sole trader, the capital section shows: opening capital + profit for the year + capital introduced − drawings = closing capital.',
            ],
            example: {
              title: 'Capital section',
              rows: [
                ['Opening capital', '£28,400'],
                ['Add: Profit for the year', '£11,600'],
                ['Add: Capital introduced', '£5,000'],
                ['Less: Drawings', '(£4,200)'],
                ['Closing capital', '£40,800'],
              ],
            },
          },
          {
            h: 'Putting it all together',
            p: [
              'The SFP always balances because Assets = Capital + Liabilities.',
            ],
            callout: { kind: 'key', text: 'Total assets must always equal total capital + liabilities. If they do not agree, there is an error somewhere.' },
            examtrap: 'Bank OVERDRAFT is a current LIABILITY (credit balance in bank account), not an asset. Check which side the bank balance sits on before placing it.',
          },
        ],
        check: [
          {
            q: 'Which of the following is a non-current asset?',
            opts: ['Trade receivables', 'Closing inventory', 'A delivery van used in the business', 'Cash in the till'],
            ans: 2,
            exp: 'A delivery van used in the business for more than one year is a non-current (fixed) asset. Trade receivables and inventory are current assets.',
          },
          {
            q: 'A business has a bank overdraft of £1,500. Where does this appear on the SFP?',
            opts: ['Current assets', 'Non-current assets', 'Current liabilities', 'Capital'],
            ans: 2,
            exp: 'A bank overdraft is money owed to the bank — it is a current liability, not an asset.',
          },
          {
            q: 'Net assets (net worth) of a business equals:',
            opts: ['Total assets only', 'Total assets minus total liabilities', 'Capital minus drawings', 'Non-current assets only'],
            ans: 1,
            exp: 'Net assets = Total assets − Total liabilities. By the accounting equation, this equals the owner\'s capital (equity).',
          },
          {
            q: 'A carrying value of £12,000 for a motor vehicle means:',
            opts: ['The vehicle cost £12,000', 'The vehicle is worth £12,000 on the open market', 'Cost minus accumulated depreciation equals £12,000', 'The vehicle was bought this year for £12,000'],
            ans: 2,
            exp: 'Carrying value = Cost − Accumulated depreciation. It reflects the net book value, not the market value.',
          },
          {
            q: 'Prepayments appear in the SFP as:',
            opts: ['A non-current asset', 'A current asset', 'A current liability', 'Part of capital'],
            ans: 1,
            exp: 'Prepayments are amounts paid in advance for a benefit still to be received — they are current assets.',
          },
        ],
      },

      {
        id: 'L-itbk-13',
        title: 'The Extended Trial Balance',
        icon: '📊',
        skills: ['itbk-tb', 'itbk-adjust'],
        cards: [
          {
            h: 'What is the Extended Trial Balance?',
            p: [
              'The **extended trial balance (ETB)** is a working paper that adjusts the initial trial balance figures before producing the final financial statements. It has columns for the original TB balances, adjustments (accruals, prepayments, depreciation), and the adjusted figures split into income statement and balance sheet columns.',
              'The ETB sits between the unadjusted trial balance and the finished financial statements. It is the most important worksheet in accounts preparation.',
            ],
          },
          {
            h: 'Adjustment columns',
            p: [
              'The adjustment columns capture every year-end change. Each adjustment must use debits and credits that balance each other.',
            ],
            formula: 'Accrual: Dr Expense / Cr Accruals payable·Prepayment: Dr Prepayments / Cr Expense·Depreciation: Dr Depreciation expense / Cr Accumulated depreciation',
            example: {
              title: 'Adjustment examples',
              rows: [
                ['Adjustment', 'Debit', 'Credit'],
                ['Accrued electricity £300', 'Electricity expense £300', 'Accruals payable £300'],
                ['Prepaid insurance £600', 'Prepayments £600', 'Insurance expense £600'],
                ['Depreciation £2,000', 'Depreciation expense £2,000', 'Accum. depreciation £2,000'],
              ],
            },
          },
          {
            h: 'Income statement columns',
            p: [
              'Revenue and expense account balances (after adjustments) are extended into the income statement columns — expenses on the debit side, revenues on the credit side.',
              'The net difference between the credit total (revenues) and the debit total (expenses) is the profit or loss for the year. Assets, liabilities, and capital accounts are NOT extended into these columns.',
            ],
          },
          {
            h: 'Balance sheet (SFP) columns',
            p: [
              'Asset, liability, and capital account balances are extended into the statement of financial position columns. Accumulated depreciation is a credit. Closing inventory (if separately given) appears as a debit here.',
              'Revenue and expense accounts are NOT extended into these columns — they have already been captured in the income statement columns.',
            ],
          },
          {
            h: 'Profit as the balancing figure',
            p: [
              'Once the income statement columns are totalled, the profit is the excess of credits over debits. This profit figure is inserted as a debit in the income statement columns (to make them balance) and as a credit in the balance sheet columns (because profit increases capital).',
              'If both sets of columns now balance (Dr = Cr in each), the ETB is complete. A loss would be inserted as a credit in the income statement and a debit in the balance sheet.',
            ],
          },
        ],
        check: [
          {
            q: 'What is the main purpose of the extended trial balance?',
            opts: ['To replace the general ledger', 'To prepare adjusted figures and extract income statement and balance sheet columns', 'To record all transactions for the accounting period', 'To calculate VAT owed to HMRC'],
            ans: 1,
            exp: 'The ETB adjusts the initial TB for year-end items (accruals, prepayments, depreciation) and then separates the adjusted balances into income statement and balance sheet columns.',
          },
          {
            q: 'Depreciation of £2,000 is entered on the ETB as:',
            opts: ['Dr Accumulated depreciation £2,000 / Cr Depreciation expense £2,000', 'Dr Depreciation expense £2,000 / Cr Accumulated depreciation £2,000', 'Dr Asset £2,000 / Cr Depreciation expense £2,000', 'No entry — the asset value is simply reduced'],
            ans: 1,
            exp: 'Depreciation: Dr Depreciation expense (increases the expense) / Cr Accumulated depreciation (increases the contra-asset). This reduces the net book value without removing the cost from the asset account.',
          },
          {
            q: 'A prepayment of £600 insurance (covering future periods) is adjusted on the ETB as:',
            opts: ['Dr Insurance expense £600 / Cr Prepayments £600', 'Dr Prepayments (asset) £600 / Cr Insurance expense £600', 'Dr Accruals £600 / Cr Insurance expense £600', 'Dr Insurance £600 / Cr Bank £600'],
            ans: 1,
            exp: 'A prepayment reduces the current period expense. Dr Prepayments (creates a current asset on the SFP) / Cr Insurance expense (reduces the expense charged to the income statement).',
          },
          {
            q: 'On the ETB, revenue account balances are extended into:',
            opts: ['Balance sheet columns — credit side', 'Income statement columns — credit side', 'Income statement columns — debit side', 'Adjustment columns — debit side'],
            ans: 1,
            exp: 'Revenue is a credit balance on the trial balance, so it is extended into the income statement columns on the credit side. Expenses are extended on the debit side.',
          },
          {
            q: 'The ETB shows that total income statement credits (revenues) exceed debits (expenses) by £15,000. How is profit entered to complete the ETB?',
            opts: ['Dr Balance sheet £15,000 / Cr Income statement £15,000', 'Dr Income statement £15,000 / Cr Balance sheet £15,000', 'Dr Income statement £15,000 only', 'No entry needed — the profit is shown as a note'],
            ans: 1,
            exp: 'The £15,000 profit is a debit in the income statement columns (making them balance) and a credit in the balance sheet columns (increasing capital). This links both sides of the ETB.',
          },
        ],
      },
      {
        id: 'L-itbk-14',
        title: 'Bridge to Level 3 — Financial Accounting',
        icon: '🌉',
        skills: ['itbk-tb', 'itbk-adjust'],
        l3Bridge: true,
        cards: [
          {
            h: 'Where Level 3 begins',
            p: [
              'The AAT Level 3 Diploma in Accounting has **four** mandatory units and, unlike Level 2, **no synoptic assessment**. The one most directly linked to ITBK is **Financial Accounting: Preparing Financial Statements (FAPS)**, which under Q2022 combines what used to be two separate units. At Level 3, double-entry bookkeeping and the trial balance are assumed knowledge — you go straight into more complex scenarios.',
              'Think of Level 2 ITBK as learning to drive in a car park. Level 3 FAPS is taking that skill onto a motorway: same rules, more complexity.',
            ],
          },
          {
            h: 'What FAPS adds to your bookkeeping',
            p: [
              'FAPS extends everything in ITBK. You will: produce and interpret an extended trial balance; account for complex depreciation scenarios (straight-line and reducing balance in the same year; part-year depreciation; disposal of non-current assets); handle accruals and prepayments for income as well as expenses; and use journals to correct a wider range of errors.',
              'The disposal of non-current assets is a key new topic: Dr Disposal account with cost, Cr Asset; Dr Accumulated depreciation, Cr Disposal; then record proceeds and the profit or loss on disposal.',
            ],
          },
          {
            h: 'From trial balance to financial statements',
            p: [
              'The second half of FAPS takes the ETB and turns it into financial statements for sole traders and — new at Level 3 — **partnerships**. For partnerships, you prepare an **appropriation account** that shows how profit is shared between partners using: partners\' salaries, interest on capital, and a profit-sharing ratio (PSR).',
              'Each partner has two ledger accounts: a **capital account** (permanent investment) and a **current account** (running balance of share of profit, drawings, interest, and salary).',
            ],
          },
          {
            h: 'Tax Processes for Businesses (TPFB) at Level 3',
            p: [
              'ITBK\'s VAT knowledge feeds directly into TPFB at Level 3. You will complete the VAT 100 return, deal with different VAT schemes (cash accounting, annual accounting, flat rate), and tackle import VAT and reverse charge scenarios.',
              'TPFB also introduces **income tax for sole traders** — calculating taxable trading profit after allowable expenses, applying the personal allowance, and computing the income tax liability at basic and higher rate.',
            ],
          },
          {
            h: 'The foundations you have already mastered',
            p: [
              'Every skill from ITBK reappears at Level 3: DEAD CLIC for debit and credit rules, double-entry for every transaction, the trial balance as a check, VAT calculations, the accounting equation, and accruals and prepayments.',
              'Level 3 adds depth and complexity — not new foundations. You are better prepared than you might think. The extended trial balance is the single biggest new concept, and you have just learned it.',
            ],
          },
        ],
        check: [
          {
            q: 'Which Level 3 unit most directly extends your ITBK double-entry skills?',
            opts: ['Management Accounting Techniques (MATS)', 'Business Awareness (BUAW)', 'Financial Accounting: Preparing Financial Statements (FAPS)', 'Tax Processes for Businesses (TPFB)'],
            ans: 2,
            exp: 'Financial Accounting: Preparing Financial Statements (FAPS) is the direct Level 3 extension of ITBK. Under Q2022 it absorbed the old Advanced Bookkeeping and Final Accounts Preparation units, and it builds on double-entry, journals, the trial balance, adjustments and depreciation — all covered at Level 2.',
          },
          {
            q: 'At Level 3, a partnership appropriation account is used to:',
            opts: ['Record depreciation of non-current assets', 'Reconcile the sales ledger control account', 'Share profit between partners according to their agreement', 'Calculate the VAT liability for the period'],
            ans: 2,
            exp: 'The appropriation account allocates net profit to partners using their salaries, interest on capital, and profit-sharing ratio (PSR). It is unique to partnership accounts.',
          },
          {
            q: 'Final Accounts Preparation at Level 3 covers financial statements for:',
            opts: ['Limited companies only', 'Sole traders and partnerships', 'Public limited companies and charities', 'Manufacturing businesses with work-in-progress only'],
            ans: 1,
            exp: 'FAPS covers producing financial statements (income statement + SFP) for sole traders and partnerships. Limited company accounts are not examined at Level 3.',
          },
          {
            q: 'The Level 3 unit that extends ITBK VAT knowledge to include completing VAT returns and income tax is:',
            opts: ['Financial Accounting: Preparing Financial Statements (FAPS)', 'Management Accounting Techniques (MATS)', 'Business Awareness (BUAW)', 'Tax Processes for Businesses (TPFB)'],
            ans: 3,
            exp: 'Tax Processes for Businesses (TPFB) covers VAT returns (VAT 100), different VAT schemes, and introduces income tax for sole traders — all building on the VAT foundation from Level 2 ITBK.',
          },
          {
            q: 'At Level 3, what is treated as assumed knowledge from Level 2?',
            opts: ['Standard costing and variance analysis', 'Partnership law and appropriation accounts', 'Double-entry bookkeeping and trial balance preparation', 'Income tax calculation for sole traders'],
            ans: 2,
            exp: 'Double-entry bookkeeping and trial balance preparation are Level 2 skills assumed at Level 3. You are expected to use them fluently without re-learning the basics.',
          },
        ],
      },
    ],
  },
  {
    unit: 'pobc',
    level: 2,
    title: 'Principles of Bookkeeping Controls',
    lessons: [
      /* ── FOUNDATIONS (1–4) ──────────────────────────────────────────────
         POBC used to open on suspense accounts, which only make sense once
         you know what a control account is and how errors behave. These four
         lessons supply that. */
      {
        id: 'L-pobc-1',
        title: 'Why controls exist',
        icon: '🛡️',
        skills: ['pobc-ca'],
        cards: [
          {
            h: 'Bookkeeping is done by people',
            p: [
              'Introduction to Bookkeeping showed you how entries should be made. This unit is about what happens when they are not — because people transpose digits, post to the wrong account, record something twice, or miss it altogether.',
              'A **control** is any routine designed to prevent an error, or to catch one that has already happened. Controls do not assume dishonesty; they assume fallibility.',
            ],
          },
          {
            h: 'The three main controls at this level',
            p: [
              '**Control accounts** — a single general ledger account holding the total of many individual accounts, checked against the sum of those individual accounts.',
              '**Reconciliations** — comparing the business\'s own record against an independent one, most commonly the bank statement.',
              '**The journal** — a formal, documented way of making entries that do not arise from a day book, including corrections.',
            ],
            callout: { kind: 'key', text: 'Every control works the same way: build a figure by two independent routes, then compare them. If they agree, both are probably right.' },
          },
          {
            h: 'Prevent, detect, correct',
            p: [
              'Controls do three different jobs, and a system needs all three. Preventive controls stop an error happening, detective controls find it afterwards, and corrective controls put it right.',
              'No preventive control is perfect, which is why detection matters — and detection is worthless without a correction routine, which is where journals and suspense accounts come in.',
              'When an assessment asks you to "identify a control", say **what it prevents or detects**, not just what it is. That is where the mark sits.',
            ],
            split: {
              left: { title: 'Preventive controls', items: [
                'Authorisation limits before payments go out',
                'Segregation of duties between roles',
                'Sequential numbering of documents',
                'The three-way match on purchase invoices',
              ] },
              right: { title: 'Detective controls', items: [
                'Control account reconciliations',
                'Bank reconciliations',
                'The trial balance',
                'Reviewing exception reports',
              ] },
            },
          },
          {
            h: 'Segregation of duties',
            p: [
              'The most important preventive control is splitting a task so that **no single person can both cause an error and hide it**.',
              'The person who authorises a payment should not be the person who sets up the supplier. The person who banks the cash should not be the person who records it.',
              'Segregation does not stop a determined pair of colleagues colluding — but it converts a one-person problem into a two-person conspiracy, which is far rarer and far easier to detect.',
            ],
            examtrap: 'Segregation of duties usually needs **more** staff, not fewer. Answers claiming it saves money are wrong.',
          },
          {
            h: 'What the trial balance can and cannot catch',
            p: [
              'The trial balance is a detective control, but a weak one. It proves only that total debits equal total credits.',
              'It will catch a one-sided entry, or a transposition on one side only.',
              'It will **not** catch a transaction omitted entirely, posted to the wrong account of the right type, entered twice, or recorded at the wrong amount on both sides.',
            ],
            callout: { kind: 'warning', text: 'An agreeing trial balance is not proof the books are right. That gap is exactly why this unit exists.' },
          },
        ],
        check: [
          { q: 'What is the main benefit of segregating duties?', opts: [
              'No single person can both cause an error or fraud and conceal it',
              'The business can operate with fewer members of finance staff',
              'The trial balance is guaranteed to agree at the period end',
              'Bank reconciliations no longer need to be performed'],
            ans: 0, exp: 'Segregation forces collusion, which is rarer and easier to spot. It typically needs more people, and it complements rather than replaces reconciliations.' },
          { type: 'truefalse', q: 'Identify whether the following statements are true or false.',
            statements: [
              { text: 'An agreeing trial balance proves the entries are in the correct accounts.', answer: false },
              { text: 'A control account is checked against the total of the individual accounts.', answer: true },
              { text: 'A transaction omitted entirely will still leave the trial balance in balance.', answer: true },
              { text: 'Reconciliation compares the business\'s record against an independent one.', answer: false },
            ],
            exp: 'The last is a trick: bank reconciliation does compare against an independent record, but a control account reconciliation compares two of the business\'s own records built by different routes. Both count as reconciliations.' },
          { q: 'Which of the following is a preventive rather than a detective control?', opts: [
              'Requiring a manager to authorise payments above a set limit',
              'Reconciling the cash book against the bank statement each month',
              'Comparing the control account with the list of individual balances',
              'Extracting a trial balance at the end of the period'],
            ans: 0, exp: 'Authorisation stops the error happening. The other three all look for errors after the event.' },
        ],
      },
      {
        id: 'L-pobc-2',
        title: 'Control accounts explained',
        icon: '🔗',
        skills: ['pobc-ca'],
        cards: [
          {
            h: 'The problem control accounts solve',
            p: [
              'A business with 300 credit customers has 300 accounts in the sales ledger. Putting all 300 into the trial balance would be unmanageable.',
              'Instead, the general ledger holds **one** account — the **sales ledger control account (SLCA)** — carrying the total owed by all customers. That single figure goes into the trial balance.',
              'The same applies to suppliers, via the **purchases ledger control account (PLCA)**.',
            ],
          },
          {
            h: 'Two routes to the same number',
            p: [
              'The control account is built from **day book totals**: total credit sales, total receipts, total returns.',
              'The individual customer accounts are built from **individual transactions**, one customer at a time.',
              'Because the two are built by genuinely different routes, agreement between them is real evidence. That is the whole point.',
            ],
            flow: ['Day book totals', 'Control account', 'compare', 'List of individual balances'],
          },
          {
            h: 'What goes into the SLCA',
            p: [
              'Every item here is something that changes what customers owe **in total**. If it does not change the total owed by customers, it does not belong in this account.',
              'Sort each item by asking whether it increases or decreases the debt. Increases go on the debit side, decreases on the credit side — the same rule as any other asset account.',
              'The two most-missed credit items are the **contra** with the PLCA and a **dishonoured cheque**, which goes the other way and increases the debt again.',
            ],
            example: {
              title: 'Sales ledger control account',
              rows: [
                ['**Debit side (increases)**', '**£**', '**Credit side (decreases)**', '**£**'],
                ['Opening balance b/d', 'X', 'Cash/bank received from customers', 'X'],
                ['Credit sales', 'X', 'Sales returns', 'X'],
                ['Dishonoured cheques', 'X', 'Discounts allowed', 'X'],
                ['', '', 'Irrecoverable debts written off', 'X'],
                ['', '', 'Contra with PLCA', 'X'],
                ['', '', 'Closing balance c/d', 'X'],
              ],
            },
          },
          {
            h: 'The PLCA is the mirror image',
            p: [
              'The purchases ledger control account works the same way with the sides reversed, because it records a **liability** rather than an asset.',
              'Credit purchases and the opening balance sit on the **credit** side. Payments to suppliers, purchases returns, discounts received and contras sit on the **debit** side.',
            ],
            callout: { kind: 'tip', text: 'If you can build the SLCA, you can build the PLCA — flip every side. The SLCA is an asset; the PLCA is a liability.' },
          },
          {
            h: 'Building a control account',
            p: [
              'Build it as an account rather than as a sum. Opening balance and increases on the debit side, decreases on the credit side, then balance it off.',
              'Doing it that way makes the arithmetic self-checking and matches the layout the assessment asks for.',
            ],
            worked: {
              title: 'Finding the closing balance',
              problem: 'At 1 June the SLCA showed £18,400. During June: credit sales £52,000; receipts from customers £47,300; sales returns £1,900; irrecoverable debts written off £600. What is the closing balance?',
              steps: [
                { do: 'Start with the opening balance on the **debit** side: **£18,400**.', why: 'Trade receivables is an asset, so its balance sits on the debit side.' },
                { do: 'Add credit sales to the debit side: **£18,400 + £52,000 = £70,400**.', why: 'Credit sales increase what customers owe.' },
                { do: 'Total the credit side: receipts £47,300 + returns £1,900 + irrecoverable debts £600 = **£49,800**.', why: 'All three reduce what customers owe, so all three are credits.' },
                { do: 'Closing balance = **£70,400 − £49,800 = £20,600** debit.', why: 'The debit total less the credit total gives the amount still outstanding at the month end.' },
              ],
              answer: '£20,600 debit',
              tryIt: {
                q: 'A PLCA opens at £11,200. Credit purchases £34,500; payments to suppliers £30,800; purchases returns £1,400; discounts received £300. What is the closing balance, in £?',
                answer: 13200, unit: '£',
                hint: 'The PLCA is a liability, so opening balance and purchases are credits; payments, returns and discounts are debits.',
                exp: 'Credits: £11,200 + £34,500 = £45,700. Debits: £30,800 + £1,400 + £300 = £32,500. Closing balance = £45,700 − £32,500 = £13,200 credit.',
              },
            },
          },
          {
            h: 'When the two do not agree',
            p: [
              'A difference tells you an error exists and roughly where to look. Work out **which side** is wrong before writing any journal.',
              'If the individual accounts are right and the control account is wrong, the correction is a journal in the general ledger. If the control account is right, the individual account is amended instead — and no journal is needed, because the sales ledger sits outside the double entry.',
            ],
            examtrap: 'A credit balance on the SLCA is not automatically an error. It usually means a customer has overpaid or holds a credit note — genuinely possible, and often tested.',
          },
        ],
        check: [
          { type: 'numeric', q: 'An SLCA opens at £22,000. Credit sales £61,000; receipts £55,400; sales returns £2,100. What is the closing balance, in £?',
            answer: 25500, unit: '£',
            steps: ['Debits: opening £22,000 + credit sales £61,000 = £83,000.', 'Credits: receipts £55,400 + returns £2,100 = £57,500.', 'Closing balance = £83,000 − £57,500 = £25,500 debit.'],
            exp: 'Sales increase the balance; receipts and returns reduce it.' },
          { q: 'Which entry appears on the CREDIT side of the sales ledger control account?', opts: [
              'Cash received from credit customers during the period',
              'Credit sales made to customers during the period',
              'The opening balance brought down at the start of the period',
              'A cheque from a customer returned unpaid by the bank'],
            ans: 0, exp: 'Receipts reduce what customers owe, so they are credits. Sales, the opening balance and dishonoured cheques all increase the balance and sit on the debit side.' },
          { type: 'truefalse', q: 'Identify whether the following statements are true or false.',
            statements: [
              { text: 'The PLCA normally has a credit balance.', answer: true },
              { text: 'An error in one customer\'s individual account will unbalance the trial balance.', answer: false },
              { text: 'A contra entry reduces both the SLCA and the PLCA.', answer: true },
              { text: 'The control account and the individual accounts are built from the same source.', answer: false },
            ],
            exp: 'The two records are deliberately built by different routes — day book totals versus individual transactions — which is what makes their agreement meaningful.' },
          { q: 'The SLCA total does not agree with the list of customer balances. What does this tell you?', opts: [
              'An error exists in one of the two records and must be located',
              'The trial balance will definitely fail to agree as a result',
              'The bank statement must contain an error that needs correcting',
              'The difference will reverse itself in the following period'],
            ans: 0, exp: 'The disagreement proves an error but says nothing about the trial balance, which can balance perfectly while the subsidiary ledger is wrong.' },
        ],
      },
      {
        id: 'L-pobc-3',
        title: 'Types of error',
        icon: '🔍',
        skills: ['pobc-errors'],
        cards: [
          {
            h: 'Two families of error',
            p: [
              'Errors split into those the trial balance **will** reveal and those it will not. Getting this distinction right is worth more marks than anything else in this unit.',
              'The test is simple: does the error leave total debits equal to total credits? If yes, the trial balance stays silent.',
            ],
          },
          {
            h: 'Errors the trial balance does NOT reveal',
            p: [
              'Every error below leaves total debits equal to total credits, which is precisely why the trial balance cannot see them. Something was posted — just not the right something.',
              'That makes them the dangerous family: the accounts *look* correct. Only a reconciliation, a supplier statement or a physical check will bring them out.',
              'Learn the six as a set — omission, commission, principle, compensating, original entry, reversal — because the exam asks you to name the type, not just spot the mistake.',
            ],
            table: {
              headers: ['Error', 'What happened', 'Example'],
              rows: [
                ['Omission', 'The transaction was never recorded at all', 'An invoice for £180 lost before entry'],
                ['Commission', 'Right amount, right type, wrong account', 'Rent posted to Insurance'],
                ['Principle', 'Right amount, wrong TYPE of account', 'A van posted to Motor expenses'],
                ['Original entry', 'Wrong amount used on BOTH sides', '£450 entered as £540 throughout'],
                ['Reversal', 'Debit and credit the wrong way round', 'Dr Sales / Cr Bank instead of the reverse'],
                ['Compensating', 'Two errors that cancel out exactly', 'One side £100 over, the other £100 over'],
              ],
            },
          },
          {
            h: 'Commission vs principle',
            p: [
              'These two are confused more often than any other pair, and assessments exploit that.',
              'Ask one question: **was it posted to the right *type* of account?** Right type but wrong individual account is commission. Wrong type altogether is principle.',
              'Commission stays inside one class — one receivable instead of another. Principle crosses classes — an asset recorded as an expense.',
            ],
            split: {
              left: { title: 'Error of commission', items: [
                'Wrong account, but of the **correct type**',
                'Rent expense posted to Insurance expense',
                'A payment posted to the wrong supplier',
                'Profit is unaffected — both are expenses',
              ] },
              right: { title: 'Error of principle', items: [
                'Wrong **type** of account entirely',
                'A van (asset) posted to Motor expenses',
                'A repair (expense) posted to a non-current asset',
                'Profit **is** affected — this one matters more',
              ] },
            },
            callout: { kind: 'key', text: 'Commission = wrong drawer, right cabinet. Principle = wrong cabinet altogether.' },
          },
          {
            h: 'Errors the trial balance DOES reveal',
            p: [
              'These leave the two columns unequal, so the difference shows up immediately:',
              '**Single-sided entry** — only one half of the double entry was posted.',
              '**Transposition on one side only** — £540 posted as £450 on the debit side but correctly on the credit side.',
              '**Two debits or two credits** — both halves posted to the same side.',
              '**Casting error** — a column added up incorrectly.',
            ],
          },
          {
            h: 'Classifying an error',
            p: [
              'Work through every error in the same order: what was actually posted, what should have been posted, and are the two sides still equal?',
              'Only the third question tells you whether a suspense account is involved — and that is usually the mark on offer.',
            ],
            worked: {
              title: 'Which error is it, and does the trial balance agree?',
              problem: 'A business buys a new laptop for £900 and posts: Dr Office expenses £900, Cr Bank £900. Classify the error and state whether the trial balance will agree.',
              steps: [
                { do: 'Check the arithmetic: one debit of £900 and one credit of £900.', why: 'Both sides are equal, so the trial balance is undisturbed.' },
                { do: 'Check the account types. The laptop should be a **non-current asset**; it has gone to **Office expenses**, which is an expense.', why: 'Different types of account, not just different accounts.' },
                { do: 'That makes it an **error of principle**.', why: 'Commission would be expense-to-expense; here the type itself is wrong.' },
                { do: 'State the effect: profit is **understated by £900** and non-current assets are **understated by £900**.', why: 'The cost was charged against this year\'s profit instead of being capitalised and depreciated over the laptop\'s life.' },
              ],
              answer: 'Error of principle — the trial balance still agrees',
              tryIt: {
                q: 'A sale of £370 is recorded in the sales account as £730, while trade receivables is correctly recorded at £370. By how much do the trial balance columns differ, in £?',
                answer: 360, unit: '£',
                hint: 'Only one side was wrong. Find the difference between the two figures on that side.',
                exp: '£730 − £370 = £360. Because the transposition affected only the credit side, the credit column exceeds the debit column by £360 and the trial balance fails to agree.',
              },
            },
          },
        ],
        check: [
          { q: 'Rent of £400 is correctly credited to bank but debited to the insurance account. This is an error of:', opts: [
              'Commission — the wrong account, but of the correct type',
              'Principle — the wrong type of account entirely',
              'Omission — the transaction was never recorded',
              'Original entry — the wrong amount was used throughout'],
            ans: 0, exp: 'Rent and insurance are both expenses, so the type is right and only the account is wrong. That is commission.' },
          { type: 'truefalse', q: 'Identify whether the following errors would be revealed by the trial balance.',
            statements: [
              { text: 'A transaction omitted from the records entirely.', answer: false },
              { text: 'Only one side of a transaction posted.', answer: true },
              { text: 'A purchase of a machine posted to repairs expense.', answer: false },
              { text: 'A debit column added up incorrectly.', answer: true },
            ],
            exp: 'Omission and error of principle both leave debits equal to credits. One-sided postings and casting errors do not.' },
          { type: 'gapfill', q: 'Complete the description of an error of principle.',
            template: 'An error of principle records a transaction in the wrong {0} of account, and the trial balance will {1}.',
            gaps: [
              { options: ['type', 'column', 'day book', 'ledger'], answer: 0 },
              { options: ['fail to agree', 'still agree', 'show a suspense balance', 'be reversed'], answer: 1 },
            ],
            exp: 'Both entries are still equal and opposite, so the trial balance agrees — the error is in classification, not arithmetic.' },
          { type: 'numeric', q: 'A payment of £620 is debited correctly but credited to bank as £260. By how much do the trial balance columns differ, in £?',
            answer: 360, unit: '£',
            steps: ['The debit side is correct at £620.', 'The credit side is understated at £260.', 'Difference = £620 − £260 = £360.'],
            exp: 'A transposition affecting one side only leaves the columns unequal by the difference between the two figures.' },
        ],
      },
      {
        id: 'L-pobc-4',
        title: 'The journal',
        icon: '✍️',
        skills: ['pobc-errors'],
        cards: [
          {
            h: 'What the journal is for',
            p: [
              'Most entries reach the ledgers through a day book — sales, purchases, returns, cash. The **journal** handles everything else.',
              'It is the book of prime entry for transactions that are **not routine**: corrections of errors, opening balances, year-end adjustments, writing off irrecoverable debts, payroll, and the disposal of assets.',
              'Every journal entry is dated, shows the accounts to be debited and credited, and carries a **narrative** explaining why.',
            ],
          },
          {
            h: 'The layout',
            p: [
              'A journal has a fixed shape, and marks are given for using it: date, the account debited first, the account credited underneath, the two amounts in separate columns, then a narrative.',
              'The **narrative** is not decoration. It is the audit trail explaining why a non-routine entry was made, and an assessment that asks for a journal usually expects one.',
            ],
            example: {
              title: 'Journal entry',
              rows: [
                ['**Date**', '**Account**', '**Dr £**', '**Cr £**'],
                ['30 Jun', 'Motor vehicles', '9,600', ''],
                ['', 'Motor expenses', '', '9,600'],
                ['', '*Being correction of a van purchase posted in error to motor expenses*', '', ''],
              ],
            },
            callout: { kind: 'tip', text: 'The narrative is not optional decoration. Without it, nobody reviewing the books later can tell whether the entry was legitimate.' },
          },
          {
            h: 'Correcting an error in three moves',
            p: [
              'Correction questions become straightforward once you always do the same three things:',
              '**1. What was posted?** Write out the entry that was actually made.',
              '**2. What should have been posted?** Write out the correct entry.',
              '**3. What journal moves you from one to the other?** That difference is your answer.',
              'Do not try to leap straight to the correcting journal. Writing out both entries takes ten seconds and prevents almost every mistake.',
            ],
          },
          {
            h: 'Correcting an error of principle',
            p: [
              'Correcting an error is a three-part thought, not a single entry: what was posted, what should have been posted, and what entry moves you from one to the other.',
              'Here both sides of the original entry were equal, so the trial balance balanced and no suspense account is involved — only the wrong account needs moving.',
            ],
            worked: {
              title: 'From wrong to right in one journal',
              problem: 'A van costing £9,600 was posted: Dr Motor expenses £9,600, Cr Bank £9,600. Correct it.',
              steps: [
                { do: '**What was posted:** Dr Motor expenses £9,600, Cr Bank £9,600.', why: 'Write it down exactly as it stands, however wrong it looks.' },
                { do: '**What should have been posted:** Dr Motor vehicles £9,600, Cr Bank £9,600.', why: 'The van is a non-current asset, so it is capitalised rather than expensed. The bank side was always correct.' },
                { do: 'Compare. The bank entry is identical in both, so it needs no correction. Only the debit is in the wrong account.', why: 'Never journal an entry that was already right — a common way to turn one error into two.' },
                { do: 'Journal: **Dr Motor vehicles £9,600, Cr Motor expenses £9,600**.', why: 'This removes the amount from the expense account and puts it into the asset account, leaving bank untouched.' },
              ],
              answer: 'Dr Motor vehicles £9,600 · Cr Motor expenses £9,600',
              tryIt: {
                q: 'Rent of £740 was posted to Insurance in error; the bank side was correct. What amount is credited to Insurance in the correcting journal, in £?',
                answer: 740, unit: '£',
                hint: 'The full amount must come out of the wrong account and go into the right one.',
                exp: 'Dr Rent £740, Cr Insurance £740. The bank entry was correct and is left alone.',
              },
            },
          },
          {
            h: 'Reversal errors need double the amount',
            p: [
              'If the debit and credit were posted the wrong way round, the correcting journal must be for **twice** the original amount.',
              'One times the amount only cancels the wrong entry, leaving nothing recorded. The second cancels it again in the right direction.',
              'A £300 reversal therefore needs a £600 journal.',
            ],
            examtrap: 'Reversal corrections at double the amount are one of the most reliably missed marks in this unit. If a question says the entries were reversed, double it.',
          },
        ],
        check: [
          { q: 'Which of the following would be recorded through the journal?', opts: [
              'The correction of an error found after the trial balance',
              'A credit sale to a regular customer on normal terms',
              'A payment received from a credit customer by bank transfer',
              'A credit purchase of goods for resale from a supplier'],
            ans: 0, exp: 'Routine transactions go through the day books and cash book. The journal is for non-routine items — corrections, adjustments, opening balances and payroll.' },
          { type: 'numeric', q: 'A receipt of £450 was posted as Dr Sales / Cr Bank, exactly reversing the correct entry. What amount is used in the correcting journal, in £?',
            answer: 900, unit: '£',
            steps: ['Reversing the wrong entry needs £450.', 'Recording the correct entry needs a further £450.', 'Total journal amount = £450 × 2 = £900.'],
            exp: 'A reversal correction is always double the original amount — once to cancel, once to record it correctly.' },
          { type: 'truefalse', q: 'Identify whether the following statements about the journal are true or false.',
            statements: [
              { text: 'Every journal entry should carry a narrative explaining it.', answer: true },
              { text: 'The journal is used for routine credit sales.', answer: false },
              { text: 'A correcting journal should not disturb entries that were already correct.', answer: true },
              { text: 'The journal is a book of prime entry.', answer: true },
            ],
            exp: 'The journal is a book of prime entry for non-routine items. Re-journalling a correct entry creates a second error.' },
          { type: 'gapfill', q: 'Complete the correcting entry.',
            template: 'A machine posted to repairs expense in error is corrected by Dr {0} and Cr {1}.',
            gaps: [
              { options: ['Non-current assets', 'Repairs expense', 'Bank', 'Suspense'], answer: 0 },
              { options: ['Non-current assets', 'Repairs expense', 'Bank', 'Suspense'], answer: 1 },
            ],
            exp: 'The amount moves out of the expense account (credit) and into the asset account (debit). The bank side was correct and is untouched.' },
        ],
      },
      {
        id: 'L-pobc-5',
        title: 'The suspense account',
        icon: '❓',
        skills: ['pobc-susp'],
        cards: [
          {
            h: 'A temporary home for a difference',
            p: [
              'When the trial balance does not agree, the difference is parked in a **suspense account** so work can continue while the errors are found.',
              'The suspense balance goes on **whichever side is smaller**, to force the trial balance to agree. If debits total £50,000 and credits total £49,800, suspense opens with a £200 **credit**.',
              'Suspense is always temporary. It must be cleared to nil before the financial statements are prepared.',
            ],
          },
          {
            h: 'The WAS / SHOULD HAVE BEEN method',
            p: [
              'To correct an error, write down two things. **WAS**: what was actually posted. **SHOULD HAVE BEEN**: what the correct entry looks like.',
              'The correcting journal is whatever turns WAS into SHOULD HAVE BEEN. If one side of the original entry was missing or wrong, suspense fills the gap.',
            ],
          },
          {
            h: 'Worked example',
            p: ['Rent of £450 was paid. The bank was credited £450 correctly, but the rent account was debited £540.'],
            example: {
              title: 'Correcting a one-sided transposition',
              rows: [
                ['WAS', 'Debit Rent £540, credit Bank £450'],
                ['SHOULD HAVE BEEN', 'Debit Rent £450, credit Bank £450'],
                ['Suspense opened with', '£90 credit balance'],
                ['Correcting journal', 'Debit Suspense £90, credit Rent £90'],
                ['Suspense balance now', 'Nil'],
              ],
            },
          },
          {
            h: 'Journals need narratives',
            p: [
              'Every correcting journal should carry a short **narrative** explaining why it exists — for example, "Correction of transposition error in rent account".',
              'Remember: only errors that caused a one-sided difference go through suspense. A reversal or commission error is corrected by journal **without** touching suspense.',
            ],
          },
          {
            h: 'Suspense is always temporary',
            p: [
              'A remaining suspense balance at the year end signals unresolved errors that must be found.',
            ],
            callout: {
              kind: 'key',
              text: 'The suspense account is never a permanent account. Its only purpose is to hold the trial balance difference while errors are investigated and corrected. Once all errors are cleared, the suspense balance must be exactly zero. Any remaining balance means at least one error is still unresolved.',
            },
          },
        ],
        check: [
          {
            q: 'Debit balances total £30,400 and credit balances total £30,150. The suspense account opens with what?',
            opts: ['A credit balance of £250', 'A debit balance of £250', 'A credit balance of £550', 'A debit balance of £125'],
            ans: 0,
            exp: 'Credits are £250 short, so suspense takes a £250 credit to make the trial balance agree. The difference goes on the side that is smaller.',
          },
          {
            q: 'Which error would NOT involve the suspense account when corrected?',
            opts: ['A single-sided entry', 'A casting error in one account', 'An amount posted to one side only', 'Rent posted in error to the rates account'],
            ans: 3,
            exp: 'A commission error keeps debits equal to credits — no trial balance difference, so no suspense is needed. The correction is a straightforward journal between the two accounts.',
          },
          {
            q: 'In the WAS / SHOULD HAVE BEEN method, what does the correcting journal do?',
            opts: ['Reverses the whole transaction and starts again', 'Posts the difference to drawings', 'Converts what was posted into what should have been posted', 'Records the entry in the day book again'],
            ans: 2,
            exp: 'The journal bridges the gap between the wrong posting and the correct one, touching suspense only where a one-sided imbalance caused the error.',
          },
          {
            q: 'Why must the suspense account be cleared before the year end?',
            opts: ['Because HMRC charges interest on it', 'Because the financial statements must not contain unexplained balances', 'Because the bank requires it', 'Because it earns no interest'],
            ans: 1,
            exp: 'The financial statements must reflect corrected, explained figures. A suspense balance means errors remain unresolved.',
          },
          {
            q: 'A purchase of £320 was correctly credited to the bank but no debit entry was made. How is the suspense account opened, and what journal clears it?',
            opts: ['Suspense debit £320; journal: debit Purchases £320, credit Suspense £320', 'Suspense credit £320; journal: debit Suspense £320, credit Purchases £320', 'Suspense debit £320; journal: debit Suspense £320, credit Bank £320', 'No suspense needed — correct the bank account only'],
            ans: 0,
            exp: 'The credit existed but the debit was missing, so debits are short — suspense opens with a debit of £320. The journal completes the double entry by debiting Purchases and crediting Suspense.',
          },
        ],
      },
      {
        id: 'L-pobc-6',
        title: 'Payroll',
        icon: '💼',
        skills: ['pobc-payroll'],
        cards: [
          {
            h: 'From gross to net',
            p: [
              '**Gross pay** is what an employee earns. **Net pay** is what lands in their bank account after deductions.',
              'The main deductions are **income tax (PAYE)**, **employee National Insurance contributions (NIC)**, and often **employee pension contributions**.',
              'The employer deducts these at source and pays them over on the employee\'s behalf — so until paid, they are **liabilities**.',
            ],
          },
          {
            h: 'The employer pays more than gross pay',
            p: [
              'On top of gross pay, the employer must pay **employer\'s NIC** and usually **employer pension contributions**.',
              'These are an **extra cost** to the business — they never come out of the employee\'s pay.',
              'Total payroll cost = gross pay + employer\'s NIC + employer pension contributions.',
            ],
          },
          {
            h: 'A payroll calculation',
            p: ['Meet Priya. Her gross pay this month is £2,000.'],
            example: {
              title: 'Priya\'s payslip and the true cost',
              rows: [
                ['Gross pay', '£2,000'],
                ['Less: PAYE income tax', '£190'],
                ['Less: employee NIC', '£120'],
                ['Less: employee pension', '£100'],
                ['Net pay to Priya', '£1,590'],
                ['Employer NIC', '£200'],
                ['Employer pension', '£60'],
                ['Total cost to employer', '£2,260'],
              ],
            },
          },
          {
            h: 'The wages control account',
            p: [
              'Payroll runs through a **wages control account** to keep the entries tidy and checkable.',
              'The total cost is debited to the wages expense account and credited to wages control. Then wages control is debited as each amount is paid out: net pay to employees, PAYE and NIC to **HMRC**, and contributions to the pension provider.',
              'When every liability has been settled, the wages control account balance returns to nil — that is the check working.',
            ],
          },
          {
            h: 'Payroll formulas',
            p: [
              'Two formulas capture the full payroll picture.',
            ],
            formula: 'Net pay = Gross − PAYE − Employee NIC − Employee pension · Total employer cost = Gross + Employer NIC + Employer pension',
          },
        ],
        check: [
          {
            q: 'Which of these is a cost to the employer on top of gross pay?',
            opts: ['Employee pension contributions', 'PAYE income tax', 'Employee NIC', 'Employer\'s NIC'],
            ans: 3,
            exp: 'Employer\'s NIC is paid by the business in addition to gross pay — it never appears on the employee\'s payslip.',
          },
          {
            q: 'Gross pay £1,800; PAYE £160; employee NIC £110; employee pension £90. What is net pay?',
            opts: ['£1,800', '£1,440', '£1,530', '£1,640'],
            ans: 1,
            exp: '£1,800 − £160 − £110 − £90 = £1,440.',
          },
          {
            q: 'Until PAYE deducted from employees is paid over, how is it shown in the accounts?',
            opts: ['As a liability owed to HMRC', 'As income of the business', 'As an asset of the business', 'As drawings'],
            ans: 0,
            exp: 'Deductions are held on behalf of HMRC. Until paid, they are a liability of the employer.',
          },
          {
            q: 'After all payroll amounts are paid out, the wages control account should show what?',
            opts: ['A debit balance equal to net pay', 'A credit balance equal to employer\'s NIC', 'A nil balance', 'A balance equal to gross pay'],
            ans: 2,
            exp: 'Wages control is cleared by the payments to employees, HMRC and pension provider. A remaining balance signals an error or an unpaid amount.',
          },
          {
            q: 'An employee\'s gross pay is £2,500. PAYE is £300, employee NIC is £180, employee pension is £125, employer NIC is £250 and employer pension is £75. What is the total cost to the employer?',
            opts: ['£2,500', '£2,825', '£1,895', '£3,130'],
            ans: 1,
            exp: 'Total employer cost = gross + employer NIC + employer pension = £2,500 + £250 + £75 = £2,825. Employee deductions reduce net pay but do not change the employer\'s total cost.',
          },
        ],
      },
      {
        id: 'L-pobc-7',
        title: 'Correcting errors with journals',
        icon: '✏️',
        skills: ['pobc-errors'],
        cards: [
          {
            h: 'Six types of bookkeeping error',
            p: [
              '**Omission** — a transaction is not recorded at all.',
              '**Commission** — recorded in the correct type of account but the wrong individual account (e.g. debited supplier A instead of supplier B).',
              '**Principle** — recorded in the wrong type of account (e.g. a capital purchase debited to an expense account).',
              '**Original entry** — the wrong amount is entered in both accounts (e.g. £290 instead of £920).',
              '**Reversal of entries** — the correct accounts are used but debit and credit are swapped.',
              '**Compensating** — two separate errors cancel each other out.',
            ],
          },
          {
            h: 'Which errors affect the trial balance?',
            p: [
              'The dividing line is whether debits still equal credits after the mistake. If they do, the trial balance stays silent and no suspense account arises.',
              'That matters practically: only the errors in the right-hand column will ever be caught by the trial balance, so the others need a different control — a reconciliation or a physical check — to surface them.',
            ],
            split: {
              left: { title: 'Do NOT affect TB', items: ['Omission', 'Commission', 'Principle', 'Original entry', 'Reversal', 'Compensating'] },
              right: { title: 'DO affect TB', items: ['Single-sided entry', 'Wrong amount on one side only', 'Posted to wrong side of one account', 'These create a suspense account'] },
            },
          },
          {
            h: 'The suspense account',
            p: [
              'When the trial balance does not balance, the difference is placed in a **suspense account** — a temporary holding account.',
              'Journal entries are made to correct errors; each correction also removes the entry from suspense.',
              'Once all errors are corrected the suspense account balance is nil.',
            ],
            callout: { kind: 'tip', text: 'A suspense account is not a real balance-sheet item. If it still has a balance at year-end, there is an error still to find.' },
          },
          {
            h: 'Writing a journal entry',
            p: [
              'A journal has: **date**, **account to debit**, **account to credit**, **amount**, and a **narrative** explaining the correction.',
              'Always think: what was originally posted? What should have been posted? The journal is the difference.',
            ],
            example: {
              title: 'Correcting a reversal error',
              rows: [
                ['Error', 'Sales receipt £500 debited to sales and credited to bank'],
                ['Correct entry', 'Dr Bank £500, Cr Sales £500'],
                ['Correction journal', 'Dr Sales £1,000 (reverse wrong Dr + add correct Cr side)'],
                ['', 'Cr Bank £1,000'],
                ['Narrative', 'Correct reversal of entries on receipt from customer'],
              ],
            },
          },
          {
            h: 'Correcting errors: the rule',
            p: [
              'This sequence works for every correction, including the ones that look unfamiliar. Never try to write the correcting journal straight from the description of the error.',
              'One case needs care: a **reversal**, where the entry went in the right accounts but on the wrong sides. Correcting it takes **double** the original amount — once to cancel the wrong entry and once to make the right one.',
            ],
            formula: 'Step 1: Identify what was posted · Step 2: Identify what should have been posted · Step 3: Journal the difference to move from wrong to right',
            callout: { kind: 'key', text: '**Key:** To reverse a wrong debit, credit the same account for the same amount. Then post the correct entry. Alternatively, use a single net journal that achieves both steps at once.' },
          },
        ],
        check: [
          {
            q: 'A business forgot to record a cash sale of £400. What type of error is this?',
            opts: ['Error of commission', 'Error of omission', 'Error of principle', 'Reversal of entries'],
            ans: 1,
            exp: 'An error of omission occurs when a transaction is not recorded at all. The trial balance may or may not be affected depending on whether both sides are missing.',
          },
          {
            q: 'A purchase of office furniture (a capital item) is debited to the office expenses account (a revenue account). This is an error of:',
            opts: ['Omission', 'Commission', 'Principle', 'Original entry'],
            ans: 2,
            exp: 'An error of principle occurs when a transaction is posted to the wrong type of account — here CapEx is treated as RevEx.',
          },
          {
            q: 'The trial balance shows debits exceed credits by £540. Where is this difference placed temporarily?',
            opts: ['Retained earnings', 'Suspense account', 'Capital account', 'Error correction account'],
            ans: 1,
            exp: 'The difference is placed in a suspense account — a temporary account used while the error is located and corrected.',
          },
          {
            q: 'A payment to supplier Ahmed (£200) was correctly debited to Ahmed\'s account but credited to supplier Patel\'s account. This is an error of:',
            opts: ['Principle', 'Omission', 'Commission', 'Reversal'],
            ans: 2,
            exp: 'An error of commission uses the correct type of account (both are supplier accounts) but the wrong individual account.',
          },
          {
            q: 'Which element must every correcting journal entry include?',
            opts: ['A reference to the original invoice number', 'A narrative explaining the nature of the correction', 'The signature of the managing director', 'A credit to the suspense account'],
            ans: 1,
            exp: 'A narrative (description) is required on every journal entry to explain why the adjustment is being made — it provides an audit trail.',
          },
        ],
      },
      {
        id: 'L-pobc-8',
        title: 'Payroll: the full journal',
        icon: '💳',
        skills: ['pobc-payroll'],
        cards: [
          {
            h: 'Payroll components',
            p: [
              '**Gross pay** = basic pay + overtime + bonuses. This is the total cost before deductions.',
              '**Employee deductions**: PAYE income tax, employee National Insurance (NIC), employee pension contributions.',
              '**Net pay** = gross pay minus all employee deductions.',
              '**Employer costs**: employer NIC and employer pension are additional costs ABOVE gross pay.',
            ],
          },
          {
            h: 'The employer\'s total payroll cost',
            p: [
              'The figure charged to the income statement is **not** the amount employees receive. It is gross pay plus the employer’s own contributions.',
              'Employee deductions are not an extra cost — they are part of gross pay, simply redirected to HMRC or the pension scheme instead of to the employee.',
              'Employer NIC and employer pension sit **on top** of gross pay, which is why total payroll cost always exceeds the payroll’s gross figure.',
            ],
            formula: 'Total employer cost = Gross pay + Employer NIC + Employer pension · Net pay = Gross pay − PAYE − Employee NIC − Employee pension',
          },
          {
            h: 'Journal 1: recording the payroll',
            p: [
              'When payroll is processed, the business recognises the full expense and creates a liability (wages control).',
            ],
            example: {
              title: 'Payroll journal — example: gross £10,000; PAYE £1,500; Emp NIC £800; Emp pension £300; Er NIC £1,100; Er pension £400',
              rows: [
                ['Account', 'Dr', 'Cr'],
                ['Wages expense (gross + er NIC + er pension)', '£11,500', ''],
                ['Wages control', '', '£11,500'],
                ['Narrative: Record gross pay and employer costs per payroll'],
              ],
            },
          },
          {
            h: 'Journal 2: paying out',
            p: [
              'The first journal recognised the expense; this one settles the liabilities that journal created. Nothing new is charged to profit here.',
              'Each payment is a debit to the relevant liability or control account and a credit to bank: net pay to the employees, PAYE and NIC to HMRC, pension contributions to the scheme.',
            ],
            example: {
              title: 'Payment journals — clearing wages control',
              rows: [
                ['Payment', 'Dr', 'Cr'],
                ['Net pay to employees £7,400', 'Wages control', 'Bank'],
                ['PAYE + employee NIC to HMRC £2,300', 'Wages control', 'Bank'],
                ['Employer NIC to HMRC £1,100', 'Wages control', 'Bank'],
                ['Total pension £700', 'Wages control', 'Bank'],
              ],
            },
          },
          {
            h: 'The wages control account',
            p: [
              'After all payments, the wages control account should have a **nil balance** — it is cleared by each payment.',
              'A remaining balance signals an unpaid amount or a posting error.',
            ],
            callout: { kind: 'key', text: '**Key:** Wages control is a **clearing account** (like a bucket). It fills from the payroll journal and empties via the payment journals. Zero balance = all paid.' },
            examtrap: 'Students often confuse **employer NIC** (a cost to the employer, above gross) with **employee NIC** (deducted from gross — a cost to the employee). Both go through wages control, but only employer NIC increases the employer\'s total cost beyond gross pay.',
          },
        ],
        check: [
          {
            q: 'Gross pay is £5,000. PAYE is £700, employee NIC is £400, employee pension is £150. What is net pay?',
            opts: ['£5,000', '£3,750', '£4,300', '£3,600'],
            ans: 1,
            exp: 'Net pay = Gross − PAYE − Employee NIC − Employee pension = £5,000 − £700 − £400 − £150 = £3,750.',
          },
          {
            q: 'In the wages journal, which account is credited to record the total payroll liability?',
            opts: ['Bank', 'HMRC account', 'Wages control', 'Wages expense'],
            ans: 2,
            exp: 'The wages control account is credited to record the total liability when payroll is processed. It is then debited as payments are made.',
          },
          {
            q: 'Employer NIC of £800 is paid to HMRC. How is this recorded in the wages control account?',
            opts: ['Dr Wages control; Cr Bank', 'Dr Bank; Cr Wages control', 'Dr Wages expense; Cr Bank', 'Dr HMRC; Cr Bank'],
            ans: 0,
            exp: 'Each payment clears part of the wages control liability: Dr Wages control (reducing the liability) and Cr Bank (paying the cash).',
          },
          {
            q: 'After all payroll payments are made, the wages control account should show:',
            opts: ['A debit balance equal to employer NIC', 'A credit balance equal to gross pay', 'A nil balance', 'A debit balance equal to net pay'],
            ans: 2,
            exp: 'Wages control is a clearing account. Once all payments are made to employees, HMRC, and pension providers, the account should clear to zero.',
          },
          {
            q: 'Gross pay is £4,000. Employer NIC is £500. Employer pension is £200. What is the total cost to the employer?',
            opts: ['£4,000', '£4,500', '£4,700', '£3,300'],
            ans: 2,
            exp: 'Total employer cost = Gross + Employer NIC + Employer pension = £4,000 + £500 + £200 = £4,700.',
          },
        ],
      },
      {
        id: 'L-pobc-9',
        title: 'Irrecoverable debts',
        icon: '💔',
        skills: ['pobc-ca'],
        cards: [
          {
            h: 'What is an irrecoverable debt?',
            p: [
              'An **irrecoverable debt** (also called a bad debt) is a debt owed by a customer that the business is certain cannot be collected — for example, if the customer has become insolvent.',
              'The debt must be **removed from the SLCA** and recognised as an expense. This follows the **prudence principle** — do not overstate assets.',
            ],
          },
          {
            h: 'Writing off an irrecoverable debt',
            p: [
              'The journal to write off a bad debt of £500 (net of VAT): **Dr Irrecoverable debts expense £500; Cr SLCA £500**.',
              'If the original invoice included VAT, the VAT can often be reclaimed from HMRC: **Dr VAT control £100; Cr SLCA £100** (for the VAT portion).',
              'The SLCA is reduced by the gross amount of the debt.',
            ],
            example: {
              title: 'Writing off: customer owes £600 gross (£500 net + £100 VAT)',
              rows: [
                ['Account', 'Dr', 'Cr'],
                ['Irrecoverable debts expense', '500', ''],
                ['VAT control (bad debt relief)', '100', ''],
                ['SLCA', '', '600'],
                ['Net effect: SLCA falls by £600; expense charged £500'],
              ],
            },
          },
          {
            h: 'Effect on the control account',
            p: [
              'When a debt is written off, it appears as a **deduction from the SLCA** in the control account reconciliation.',
              'The SLCA formula: Closing = Opening + Credit sales − Receipts − Returns − **Irrecoverable debts** − Discounts − Contras.',
            ],
          },
          {
            h: 'Allowance for doubtful debts',
            p: [
              'Unlike a write-off (specific debt confirmed bad), an **allowance for doubtful debts** is an estimate of what might not be collected.',
              'It does NOT affect the SLCA directly — the receivables balance stays at full value, but the allowance is deducted on the balance sheet.',
              'Journal to create/increase an allowance: **Dr Irrecoverable debts expense; Cr Allowance for doubtful debts**.',
            ],
          },
          {
            h: 'Write-off vs allowance',
            p: [
              'The difference is certainty. A write-off deals with a specific debt you now know will not be paid; an allowance covers the general risk that some of the remaining debts will not be.',
              'That is why only the write-off touches the SLCA. An allowance is an estimate about receivables in general, so it sits in its own account and the receivables ledger stays intact.',
              'Both are charged to the same expense, so profit falls either way — but only the write-off changes the amount an individual customer is shown as owing.',
            ],
            split: {
              left: { title: 'Irrecoverable debt write-off', items: ['Specific debt confirmed uncollectable', 'Dr Irrecoverable debts expense', 'Cr SLCA (removes debt)', 'Reduces the SLCA balance', 'Affects actual receivables figure'] },
              right: { title: 'Allowance for doubtful debts', items: ['Estimated % of receivables uncertain', 'Dr Irrecoverable debts expense', 'Cr Allowance account (not SLCA)', 'SLCA unchanged', 'Shown net of allowance on balance sheet'] },
            },
          },
        ],
        check: [
          {
            q: 'A customer becomes insolvent and their debt of £800 is written off. Which account is DEBITED?',
            opts: ['SLCA', 'Bank', 'Irrecoverable debts expense', 'Allowance for doubtful debts'],
            ans: 2,
            exp: 'Writing off a bad debt: Dr Irrecoverable debts expense (recognising the loss); Cr SLCA (removing the asset).',
          },
          {
            q: 'Writing off a debt of £600 will have what effect on the SLCA?',
            opts: ['Increase the SLCA by £600', 'Decrease the SLCA by £600', 'No effect on the SLCA', 'Increase the SLCA by £100 (VAT only)'],
            ans: 1,
            exp: 'The SLCA is credited with the gross amount of the debt written off, reducing the balance by £600.',
          },
          {
            q: 'An allowance for doubtful debts is created for £500. What is the correct journal?',
            opts: ['Dr SLCA £500; Cr Irrecoverable debts expense £500', 'Dr Bank £500; Cr Irrecoverable debts expense £500', 'Dr Irrecoverable debts expense £500; Cr Allowance for doubtful debts £500', 'Dr Allowance for doubtful debts £500; Cr SLCA £500'],
            ans: 2,
            exp: 'Creating an allowance: Dr Irrecoverable debts expense (cost) and Cr Allowance for doubtful debts (contra asset). The SLCA is NOT touched.',
          },
          {
            q: 'Where does the allowance for doubtful debts appear on the balance sheet?',
            opts: ['As a liability', 'As a deduction from trade receivables', 'Added to trade receivables', 'As an expense in the income statement'],
            ans: 1,
            exp: 'The allowance is a contra-asset: it is deducted from trade receivables to show a more prudent net realisable value.',
          },
          {
            q: 'A debt previously written off as irrecoverable is unexpectedly recovered. What entries are needed?',
            opts: ['Dr Bank; Cr Irrecoverable debts expense (one entry only)', 'Dr SLCA; Cr Irrecoverable debts expense (reinstate), then Dr Bank; Cr SLCA (receipt)', 'Dr Irrecoverable debts; Cr Bank', 'No entry needed'],
            ans: 1,
            exp: 'Reinstate the debt (Dr SLCA, Cr Irrecoverable debts expense), then record receipt (Dr Bank, Cr SLCA). The two-step approach correctly reverses the write-off.',
          },
          {
            q: 'Which accounting principle supports creating an allowance for doubtful debts?',
            opts: ['Going concern', 'Accruals', 'Prudence', 'Consistency'],
            ans: 2,
            exp: 'Prudence requires that assets are not overstated. Creating an allowance reduces the carrying value of receivables to a realistic amount.',
          },
          {
            q: 'Irrecoverable debts written off appear in the SLCA reconciliation as:',
            opts: ['An addition to the opening balance', 'A deduction from the closing balance', 'Neither — they do not appear in the SLCA', 'An addition to credit sales'],
            ans: 1,
            exp: 'Irrecoverable debts are one of the deductions in the SLCA: Closing = Opening + Credit sales − Receipts − Returns − Irrecoverable debts − Discounts − Contras.',
          },
        ],
      },
      {
        id: 'L-pobc-10',
        title: 'The SLCA in full',
        icon: '🔒',
        skills: ['pobc-ca'],
        cards: [
          {
            h: 'All items in the SLCA',
            p: [
              'The **Sales Ledger Control Account (SLCA)** summarises all activity with credit customers. Every item that changes what customers owe must pass through it.',
            ],
            formula: 'Closing SLCA = Opening balance + Credit sales − Cash/cheque received − Sales returns − Irrecoverable debts − Discounts allowed − Contras',
          },
          {
            h: 'The full SLCA reconciliation',
            p: [
              'Lay it out as an account, not a list. Anything that **increases** what customers owe goes on the debit side; anything that **reduces** it goes on the credit side.',
              'The closing balance you arrive at is the figure that must agree with the total of the memorandum sales ledger.',
            ],
            example: {
              title: 'SLCA workthrough',
              rows: [
                ['Item', 'Dr (£)', 'Cr (£)'],
                ['Opening balance', '12,000', ''],
                ['Credit sales', '30,000', ''],
                ['Cash/cheques received', '', '26,000'],
                ['Sales returns (credit notes)', '', '1,500'],
                ['Irrecoverable debts written off', '', '800'],
                ['Discounts allowed', '', '300'],
                ['Contra entries', '', '200'],
                ['**Closing balance**', '', '**13,200**'],
              ],
            },
          },
          {
            h: 'Cash discounts in the SLCA',
            p: [
              '**Discounts allowed** are early-payment discounts given to customers. When allowed: **Dr Discounts allowed expense, Cr SLCA** — reducing what the customer owes.',
              '**Discounts received** from suppliers work the opposite way in the PLCA: **Dr PLCA, Cr Discounts received income**.',
            ],
            callout: { kind: 'key', text: '**Key distinction:** Discounts allowed are an expense (Cr SLCA). Discounts received are income (Dr PLCA). Both ultimately reduce the debt between the parties.' },
          },
          {
            h: 'Reconciling the memorandum ledger',
            p: [
              'The **memorandum sales ledger** lists individual customer balances. Its total should equal the SLCA balance.',
              'If they disagree, an error has been made — either in the SLCA or in posting to individual accounts.',
              'Common causes: transaction posted to SLCA but not to individual account; transposition errors; incorrect amounts.',
            ],
          },
          {
            h: 'The PLCA follows the same logic',
            p: [
              'The Purchases Ledger Control Account is the mirror image. It is a **liability**, so its normal balance is a credit and every side swaps over.',
              'Credit purchases increase the balance (credit); payments, returns outwards and discounts received reduce it (debit).',
              'A **contra** — where the same party is both customer and supplier — hits both accounts at once: Dr PLCA, Cr SLCA, settling the two balances against each other.',
            ],
            split: {
              left: { title: 'SLCA (customers owe us)', items: ['Dr: Opening, Credit sales', 'Cr: Receipts, Returns, Bad debts, Discounts allowed, Contras', 'Balance = total owed by customers'] },
              right: { title: 'PLCA (we owe suppliers)', items: ['Cr: Opening, Credit purchases', 'Dr: Payments, Returns, Discounts received, Contras', 'Balance = total owed to suppliers'] },
            },
          },
        ],
        check: [
          {
            q: 'Opening SLCA balance is £8,000. Credit sales £22,000. Cash received £19,000. Returns £1,200. Discounts allowed £400. Closing balance = ?',
            opts: ['£9,400', '£10,200', '£8,600', '£9,800'],
            ans: 0,
            exp: '£8,000 + £22,000 − £19,000 − £1,200 − £400 = £9,400.',
          },
          {
            q: 'A discount of £150 is allowed to a credit customer. What is the journal entry?',
            opts: ['Dr Bank £150; Cr SLCA £150', 'Dr Discounts allowed £150; Cr SLCA £150', 'Dr SLCA £150; Cr Discounts allowed £150', 'Dr Discounts received £150; Cr SLCA £150'],
            ans: 1,
            exp: 'Discounts allowed: Dr Discounts allowed expense (cost), Cr SLCA (reducing what the customer owes).',
          },
          {
            q: 'The SLCA balance is £14,500 but the sum of individual customer balances is £14,200. What is a likely cause?',
            opts: ['A receipt was posted to SLCA but not to the individual customer account', 'A sale was posted to the individual account but not to the SLCA', 'The VAT rate was calculated incorrectly', 'Both figures are correct'],
            ans: 1,
            exp: 'If a sale was posted to the individual customer account but NOT to the SLCA, the SLCA would be understated relative to the individual accounts. The scenario shows SLCA > individual total, suggesting a receipt was posted to SLCA but missed from the individual account.',
          },
          {
            q: 'A contra entry of £600 is agreed between a customer and a supplier. What entries are made?',
            opts: ['Dr SLCA £600; Cr PLCA £600', 'Dr PLCA £600; Cr SLCA £600', 'Dr Bank £600; Cr SLCA £600', 'Dr SLCA £600; Cr Bank £600'],
            ans: 1,
            exp: 'A contra reduces both control accounts: Dr PLCA (reducing what we owe to the supplier) and Cr SLCA (reducing what the customer owes to us).',
          },
          {
            q: 'Which item INCREASES the SLCA balance?',
            opts: ['Receipts from customers', 'Credit sales', 'Discounts allowed', 'Irrecoverable debts'],
            ans: 1,
            exp: 'Credit sales increase the SLCA (Dr SLCA). All other options — receipts, discounts, and bad debts — reduce the SLCA (Cr SLCA).',
          },
          {
            q: 'Discounts received from suppliers appear in which account and on which side?',
            opts: ['Dr SLCA', 'Cr PLCA', 'Dr PLCA', 'Cr SLCA'],
            ans: 2,
            exp: 'Discounts received from suppliers reduce what the business owes to its suppliers: Dr PLCA (reducing the liability), Cr Discounts received (recognising income).',
          },
          {
            q: 'Which item does NOT appear in the SLCA?',
            opts: ['Credit sales invoices', 'Irrecoverable debts', 'Purchases from credit suppliers', 'Discounts allowed to customers'],
            ans: 2,
            exp: 'Purchases from credit suppliers go through the PLCA, not the SLCA. The SLCA only contains transactions affecting amounts owed BY customers.',
          },
        ],
      },
      {
        id: 'L-pobc-11',
        title: 'Journal entries — corrections and non-routine items',
        icon: '📓',
        skills: ['pobc-errors', 'pobc-susp'],
        cards: [
          {
            h: 'What the journal is used for',
            p: [
              'The journal (or general journal) records transactions that do not belong in any other book of prime entry: opening entries, year-end adjustments (accruals, depreciation, bad debts), correction of errors, and writing off irrecoverable debts.',
              'Every journal entry has a debit and a credit and must include a **narrative** explaining the reason.',
            ],
            flow: ['Identify the error or non-routine item', 'Determine the correct double entry', 'Write the journal entry with a narrative', 'Post to the relevant ledger accounts'],
          },
          {
            h: 'Structure of a journal entry',
            p: [
              'A journal entry always shows: Date, Account debited (with amount), Account credited (with amount), and a Narrative.',
            ],
            example: {
              title: 'Journal entry format',
              rows: [
                ['Date', 'Account', 'Dr £', 'Cr £'],
                ['31 Mar', 'Electricity expense', '600', ''],
                ['', 'Accruals', '', '600'],
                ['', 'Accrual of Dec electricity bill', '', ''],
              ],
            },
          },
          {
            h: 'Correcting errors using the journal',
            p: [
              'When an error is discovered that caused the trial balance to not balance, a suspense account is opened. The journal is used to clear the suspense account.',
              'When an error is found that did not affect the TB balance, the journal corrects it by reversing the wrong entry and posting the correct one.',
            ],
            example: {
              title: 'Error correction examples',
              rows: [
                ['Error type', 'Journal correction'],
                ['Error of omission (both sides missing)', 'Dr correct account / Cr correct account'],
                ['Error of commission (wrong account)', 'Dr correct account / Cr wrong account (reverse)'],
                ['Error of principle (wrong type)', 'Dr correct account / Cr wrong account (reverse)'],
                ['Reversal error', 'Double the correct amount on both sides'],
              ],
            },
          },
          {
            h: 'Clearing a suspense account',
            p: [
              'A suspense account is opened when the trial balance does not balance. It holds the difference temporarily. Once the error(s) are found, the journal clears the suspense account. The suspense account balance must reach zero.',
            ],
            example: {
              title: 'Suspense account clearance',
              rows: [
                ['Opening suspense balance (Dr)', '£400', ''],
                ['Error found: Cr side £400 understated', '', ''],
                ['Journal: Dr Creditors £400 / Cr Suspense £400', '', '£400'],
                ['Closing suspense balance', '£0', ''],
              ],
            },
          },
          {
            h: 'Non-routine journal entries',
            p: [
              'The journal is also used for: depreciation charges (Dr Depreciation expense, Cr Accumulated depreciation), irrecoverable (bad) debt write-offs (Dr Bad debt expense, Cr Trade receivables), and opening entries when a new set of books is started.',
            ],
            callout: { kind: 'warning', text: 'Every journal entry must include a narrative (description). Without one, the purpose of the entry cannot be understood — this is an exam requirement.' },
          },
        ],
        check: [
          {
            q: 'Which of the following would be recorded in the journal?',
            opts: ['A credit sale of goods', 'A payment to a supplier', 'Year-end depreciation charge', 'A cash purchase'],
            ans: 2,
            exp: 'The journal is used for non-routine entries like depreciation. Credit sales go in the sales day book; payments go in the cash book.',
          },
          {
            q: 'A £500 payment to a supplier was posted to the correct side but to the wrong supplier\'s account. What type of error is this?',
            opts: ['Error of omission', 'Error of commission', 'Error of principle', 'Error of original entry'],
            ans: 1,
            exp: 'Posting to the wrong account of the same type (wrong supplier — both are trade payables) is an error of commission.',
          },
          {
            q: 'The trial balance shows a debit excess of £250. A suspense account is opened. The suspense account balance is:',
            opts: ['£250 debit', '£250 credit', 'Zero', '£500 debit'],
            ans: 1,
            exp: 'To make the trial balance balance, the suspense account is credited £250 (the missing credit-side amount), so it has a credit balance.',
          },
          {
            q: 'Which journal entry correctly records a bad debt write-off of £300?',
            opts: ['Dr Trade receivables £300; Cr Bank £300', 'Dr Bad debt expense £300; Cr Trade receivables £300', 'Dr Bank £300; Cr Bad debt expense £300', 'Dr Trade receivables £300; Cr Bad debt expense £300'],
            ans: 1,
            exp: 'Writing off a bad debt: Dr Bad debt expense (increase expenses); Cr Trade receivables (remove the asset we no longer expect to collect).',
          },
          {
            q: 'A journal entry is posted to reverse an error of reversal. Sales of £800 were debited to sales and credited to trade receivables. The correction is:',
            opts: ['Dr Trade receivables £800; Cr Sales £800', 'Dr Sales £1,600; Cr Trade receivables £1,600', 'Dr Trade receivables £1,600; Cr Sales £1,600', 'Dr Sales £800; Cr Trade receivables £800'],
            ans: 2,
            exp: 'The original wrong entry was Dr Sales £800 / Cr Receivables £800. To fully reverse and re-enter correctly: debit Receivables £1,600 and credit Sales £1,600 (cancels the wrong Dr Sales and adds the correct Dr Receivables).',
          },
        ],
      },
      {
        id: 'L-pobc-12',
        title: 'VAT reconciliation and the VAT return',
        icon: '🧾',
        skills: ['itbk-vat', 'pobc-ca'],
        cards: [
          {
            h: 'How VAT works in the books',
            p: [
              'VAT-registered businesses collect VAT on sales (**output tax**) and reclaim VAT on purchases (**input tax**). The difference is paid to (or reclaimed from) HMRC. The business acts as a collector of tax, not a bearer of it.',
              'The net amount of VAT due = Output tax − Input tax.',
            ],
            flow: ['Record sales + output VAT in the sales day book', 'Record purchases + input VAT in the purchases day book', 'Total output tax from SDB', 'Total input tax from PDB', 'Calculate VAT due: Output − Input', 'Complete and submit the VAT return'],
          },
          {
            h: 'The VAT return — key boxes',
            p: [
              'The VAT return (now submitted via Making Tax Digital) has several key boxes.',
            ],
            example: {
              title: 'VAT return key boxes',
              rows: [
                ['Box 1', 'VAT due on sales (output tax)'],
                ['Box 4', 'VAT reclaimed on purchases (input tax)'],
                ['Box 5', 'Net VAT due to HMRC (Box 1 minus Box 4)'],
                ['Box 6', 'Total value of sales (net of VAT)'],
                ['Box 7', 'Total value of purchases (net of VAT)'],
              ],
            },
          },
          {
            h: 'Reconciling the VAT account',
            p: [
              'The VAT control account in the general ledger should agree with the VAT return. Debit entries: input VAT on purchases, VAT paid to HMRC. Credit entries: output VAT on sales. The closing balance is the amount owed to HMRC (credit balance) or due back (debit balance).',
            ],
            example: {
              title: 'VAT control account',
              rows: [
                ['Dr side (input tax + payments)', 'Cr side (output tax)'],
                ['Input VAT on purchases: £4,200', 'Output VAT on sales: £6,800'],
                ['VAT paid to HMRC: £2,600', ''],
                ['Balance c/d: £0', ''],
                ['Total: £6,800', 'Total: £6,800'],
              ],
            },
          },
          {
            h: 'Common VAT errors and adjustments',
            p: [
              'Common errors include: applying the wrong VAT rate, treating a VAT-exempt supply as standard-rated, not recording a credit note, and posting the gross figure instead of splitting net and VAT.',
            ],
            callout: { kind: 'warning', text: 'Gross = Net × 1.20. Net = Gross ÷ 1.20. VAT = Gross ÷ 6. Confusing these is one of the most common calculation errors on the VAT return.' },
          },
          {
            h: 'VAT schemes and special rules',
            p: [
              'Small businesses can use the **VAT Flat Rate Scheme** (pay a fixed % of gross turnover, keeping the difference). The **Annual Accounting Scheme** allows one payment per year. The **Cash Accounting Scheme** only accounts for VAT when money is actually received or paid — useful for businesses with slow-paying customers.',
            ],
            examtrap: 'VAT is a BALANCE SHEET item (owed to HMRC = liability) between return periods, not an income statement item. Only the net payment to HMRC affects profit indirectly through reduced cash.',
          },
        ],
        check: [
          {
            q: 'Output tax is:',
            opts: ['VAT reclaimed on purchases', 'VAT charged on sales to customers', 'The net VAT paid to HMRC', 'VAT on imports'],
            ans: 1,
            exp: 'Output tax is the VAT a business charges its customers on sales. Input tax is the VAT paid on purchases that can be reclaimed.',
          },
          {
            q: 'VAT due to HMRC = Output tax £8,400 minus Input tax £5,100. The amount due is:',
            opts: ['£13,500', '£3,300', '£2,700', '£8,400'],
            ans: 1,
            exp: 'VAT due = £8,400 − £5,100 = £3,300.',
          },
          {
            q: 'In the VAT control account, output VAT on sales appears on the:',
            opts: ['Debit side', 'Credit side', 'Neither — it goes straight to HMRC', 'Both sides equally'],
            ans: 1,
            exp: 'Output VAT (charged to customers) is a liability owed to HMRC, so it is credited in the VAT account.',
          },
          {
            q: 'A business buys goods for £960 gross (VAT inclusive at 20%). The input VAT it can reclaim is:',
            opts: ['£192', '£160', '£96', '£960'],
            ans: 1,
            exp: 'Input VAT = Gross ÷ 6 = £960 ÷ 6 = £160. (Or: Net = £960 ÷ 1.20 = £800; VAT = £800 × 20% = £160.)',
          },
          {
            q: 'Under the Cash Accounting Scheme for VAT, when is output tax accounted for?',
            opts: ['When the invoice is issued', 'When cash is actually received from the customer', 'At the end of the VAT quarter regardless of payment', 'When the goods are delivered'],
            ans: 1,
            exp: 'The Cash Accounting Scheme accounts for VAT when money changes hands — output tax when cash is received; input tax when cash is paid.',
          },
        ],
      },

      {
        id: 'L-pobc-13',
        title: 'Bank Reconciliation in Depth',
        icon: '🏦',
        skills: ['pobc-bankrec'],
        cards: [
          {
            h: 'Why bank reconciliations matter',
            p: [
              'The cashbook records receipts and payments from the business\'s point of view. The bank statement records the same events from the bank\'s perspective. At any moment the two will disagree — due to **timing differences** (items in one record not yet processed in the other) and **errors**.',
              'A bank reconciliation proves the two records are consistent after allowing for these differences. It is a key internal control — businesses that skip it risk undetected fraud, errors, and an inaccurate cash position.',
            ],
          },
          {
            h: 'Timing differences: unpresented cheques and outstanding lodgements',
            p: [
              'An **unpresented cheque** is a payment the business has recorded in the cashbook (credit entry), but the payee has not yet presented it to the bank — so it does not yet appear on the bank statement. The bank statement balance is therefore higher than the cashbook balance by this amount.',
              'An **outstanding lodgement** (deposit in transit) is a receipt the business has recorded in the cashbook (debit entry), but the bank has not yet processed it — so it does not yet appear on the bank statement. The bank statement balance is lower than the cashbook balance by this amount.',
            ],
            example: {
              title: 'Timing differences at a glance',
              rows: [
                ['Type', 'In cashbook?', 'On bank statement?', 'Effect on statement balance vs cashbook'],
                ['Unpresented cheque', 'Yes (Cr)', 'Not yet', 'Statement higher than cashbook'],
                ['Outstanding lodgement', 'Yes (Dr)', 'Not yet', 'Statement lower than cashbook'],
              ],
            },
          },
          {
            h: 'Items on the bank statement not in the cashbook',
            p: [
              'Direct debits, standing orders, bank charges, bank interest credited, and BACS receipts may appear on the bank statement before they are entered in the cashbook. When discovered, the cashbook must be **updated** before the reconciliation statement is prepared.',
              'To update: receipts (bank interest, BACS customer payments) are debited in the cashbook; payments (direct debits, standing orders, bank charges) are credited in the cashbook.',
            ],
          },
          {
            h: 'Updating the cashbook',
            p: [
              'Step 1: Compare the bank statement to the cashbook line by line. Tick every matching item.',
              'Step 2: List all unticked items on the bank statement — these must be added to the cashbook.',
              'Step 3: Add receipts as debits (Dr cashbook) and payments as credits (Cr cashbook), recording the corresponding expense or income account on the other side.',
              'Step 4: Calculate the updated (revised) cashbook balance.',
            ],
            formula: 'Direct debit not in cashbook: Dr Expense / Cr Cashbook (reduces balance)·Bank interest not in cashbook: Dr Cashbook / Cr Interest received (increases balance)',
          },
          {
            h: 'The reconciliation statement',
            p: [
              'With the cashbook updated, prepare the reconciliation statement. Start with the **bank statement balance**, then adjust for timing differences only (items in the cashbook not yet on the bank statement):',
            ],
            formula: 'Bank statement balance·PLUS: Outstanding lodgements·LESS: Unpresented cheques·= Updated cashbook balance',
            example: {
              title: 'Reconciliation statement',
              rows: [
                ['', '£'],
                ['Balance per bank statement', '4,250'],
                ['Add: Outstanding lodgement', '780'],
                ['Less: Unpresented cheques', '(390)'],
                ['= Balance per updated cashbook', '4,640'],
              ],
            },
          },
        ],
        check: [
          {
            q: 'An unpresented cheque is one that:',
            opts: ['The business received but has not yet deposited', 'The business wrote and recorded in the cashbook, but the bank has not yet processed it', 'Was returned unpaid (bounced) by the bank', 'Is awaiting a signature before payment can be made'],
            ans: 1,
            exp: 'An unpresented cheque is a payment already credited in the cashbook but not yet appearing on the bank statement. The bank statement balance is higher than the cashbook by this amount.',
          },
          {
            q: 'An outstanding lodgement in a bank reconciliation means:',
            opts: ['A payment in the cashbook but not yet on the bank statement', 'A receipt in the cashbook but not yet on the bank statement', 'A direct debit not recorded in the cashbook', 'A bank error that reduced the balance'],
            ans: 1,
            exp: 'An outstanding lodgement (deposit in transit) is a receipt already debited in the cashbook but not yet processed by the bank. The bank statement balance is lower than the cashbook by this amount.',
          },
          {
            q: 'Bank interest of £45 appears on the bank statement but has not been entered in the cashbook. To update the cashbook you:',
            opts: ['Credit the cashbook £45 (reducing the balance)', 'Debit the cashbook £45 (increasing the balance)', 'Ignore it — bank interest is not a business transaction', 'Debit the bank statement £45'],
            ans: 1,
            exp: 'Bank interest is a receipt — it increases the bank balance. Dr Cashbook £45 / Cr Interest received £45. This updates the cashbook to reflect the income.',
          },
          {
            q: 'In the reconciliation statement, you start with the bank statement balance and then:',
            opts: ['Deduct outstanding lodgements and add unpresented cheques', 'Add unpresented cheques and deduct outstanding lodgements', 'Add outstanding lodgements and deduct unpresented cheques', 'Add both outstanding lodgements and unpresented cheques'],
            ans: 2,
            exp: 'Start with the bank statement balance: ADD outstanding lodgements (receipts in cashbook but not on statement — statement is too low) and DEDUCT unpresented cheques (payments in cashbook but not on statement — statement is too high). The result equals the updated cashbook balance.',
          },
          {
            q: 'A standing order of £250 for insurance appears on the bank statement but has not been entered in the cashbook. The correct update is:',
            opts: ['Dr Cashbook £250 / Cr Insurance £250', 'Dr Insurance £250 / Cr Cashbook £250', 'Dr Bank statement £250 / Cr Cashbook £250', 'No adjustment needed until the next period'],
            ans: 1,
            exp: 'The standing order is a payment from the bank account not yet in the cashbook. Dr Insurance expense £250 (the cost incurred) / Cr Cashbook £250 (the payment reduces the bank balance). This reduces the cashbook balance.',
          },
        ],
      },
      {
        id: 'L-pobc-14',
        title: 'Bridge to Level 3 — Final Accounts & Tax',
        icon: '🌉',
        skills: ['pobc-ca', 'pobc-errors'],
        l3Bridge: true,
        cards: [
          {
            h: 'Building on POBC at Level 3',
            p: [
              'Your POBC knowledge — control accounts, bank reconciliations, journals for error correction, and suspense accounts — all continue at Level 3. The difference is complexity: you will encounter more errors, more correction methods, and more involved scenarios. The logic is identical; the questions are harder.',
              'The key skill that POBC builds — thinking in debits and credits, and understanding how errors affect the trial balance — is the skill Level 3 examiners test most heavily.',
            ],
          },
          {
            h: 'What FAPS extends from POBC',
            p: [
              'At Level 3, you will clear suspense accounts using journals (not just identify the error type as in POBC). You will also post journals for complex scenarios: dishonoured (bounced) cheques, capital introduced mid-year, contra entries between the SLCA and PLCA, and the disposal of non-current assets.',
              'A **contra entry** arises when a customer is also a supplier — the two balances are offset: Dr PLCA / Cr SLCA. This removes the double counting from both control accounts.',
            ],
          },
          {
            h: 'Partnership accounts in Final Accounts Preparation (FAPS)',
            p: [
              'Once you can prepare an ETB, FAPS adds **partnerships**. A partnership appropriation account allocates net profit: first deducting partners\' salaries and interest on capital; the remainder is divided by the **profit-sharing ratio (PSR)**.',
              'Each partner has two accounts: a **capital account** (fixed investment, rarely changes) and a **current account** (running total of salary, interest, profit share, less drawings). The current account balance carries to the balance sheet.',
            ],
          },
          {
            h: 'VAT returns and payroll in Tax Processes for Businesses (TPFB)',
            p: [
              'At Level 3, you complete the **VAT 100 form**, deal with different VAT schemes (cash accounting, flat rate, annual accounting), and handle import VAT and partial exemption. This extends ITBK and POBC VAT knowledge significantly.',
              'TPFB also covers PAYE and National Insurance: **Class 1 primary NIC** is deducted from the employee\'s gross pay; **Class 1 secondary NIC** is an additional cost for the employer. Both are remitted to HMRC alongside income tax deducted under PAYE.',
            ],
          },
          {
            h: 'Why POBC gives you the biggest advantage at Level 3',
            p: [
              'The ability to spot errors, correct them with journals, reconcile control accounts, understand suspense accounts, and think fluently in debits and credits — this is what separates high-scoring Level 3 students from those who struggle.',
              'POBC gives you that foundation. At Level 3, these are not new skills — they are extended skills applied to more complex scenarios. Every hour spent mastering POBC now pays compound interest at Level 3.',
            ],
          },
        ],
        check: [
          {
            q: 'At Level 3, a suspense account is opened when:',
            opts: ['The business cannot find a missing invoice', 'The trial balance does not balance due to a posting error', 'A customer disputes their balance on the sales ledger', 'The bank statement and cashbook disagree after reconciliation'],
            ans: 1,
            exp: 'A suspense account is a temporary account used when the trial balance does not balance (a one-sided or incorrect entry has been made). The error is identified and a journal is used to clear the suspense account.',
          },
          {
            q: 'In a partnership appropriation account, profit is shared after deducting:',
            opts: ['Bank interest and depreciation charges', 'Partners\' drawings and capital repayments', 'Partners\' salaries and interest on capital', 'Tax and national insurance contributions'],
            ans: 2,
            exp: 'The appropriation account first deducts partners\' salaries (if agreed) and interest on capital (on their capital account balances). The remaining profit is then shared in the profit-sharing ratio (PSR).',
          },
          {
            q: 'A contra entry between the SLCA and PLCA is used when:',
            opts: ['The business writes off a bad debt', 'A customer is also a supplier and the balances are offset against each other', 'An error is corrected using a suspense account', 'Bank interest is recorded in both control accounts'],
            ans: 1,
            exp: 'A contra entry offsets a customer balance (in the SLCA) against a supplier balance (in the PLCA) when the same entity is both a customer and a supplier. Entry: Dr PLCA / Cr SLCA.',
          },
          {
            q: 'Class 1 secondary NIC (employer\'s contribution) is:',
            opts: ['Deducted from the employee\'s gross pay before they receive it', 'An additional cost paid by the employer on top of gross wages', 'Paid directly to HMRC by the employee from their net pay', 'Only payable on earnings above £50,270'],
            ans: 1,
            exp: 'Class 1 secondary NIC is the employer\'s contribution — a percentage of the employee\'s gross earnings above the secondary threshold, paid by the employer in addition to the gross wage. It is not deducted from the employee.',
          },
          {
            q: 'Which of the following is covered in Level 3 TPFB but goes beyond Level 2 VAT knowledge?',
            opts: ['Calculating 20% VAT on standard-rated supplies', 'Completing the VAT 100 return and handling the flat rate scheme', 'Recording input and output VAT in the ledger', 'Calculating VAT from a gross (inclusive) amount'],
            ans: 1,
            exp: 'Completing the VAT 100 return and dealing with VAT schemes such as the flat rate scheme are Level 3 TPFB topics. Basic VAT arithmetic and ledger entries are already covered at Level 2.',
          },
        ],
      },
    ],
  },
  {
    unit: 'poc',
    level: 2,
    title: 'Principles of Costing',
    lessons: [
      /* ── FOUNDATIONS (1–4) ──────────────────────────────────────────────
         Costing used to open on labour payment methods, which presumes cost
         classification and cost behaviour are already understood. They are
         the foundation of every calculation in the unit. */
      {
        id: 'L-poc-1',
        title: 'What costing is for',
        icon: '🌱',
        skills: ['poc-behaviour', 'poc-coding'],
        cards: [
          {
            h: 'A different audience',
            p: [
              'Bookkeeping produces information for people **outside** the business: HMRC, lenders, Companies House. The rules are fixed and the deadlines are statutory.',
              '**Costing** — the start of management accounting — produces information for people **inside** the business. There are no prescribed formats, no filing deadlines and no statutory rules. The only test is whether the information helps someone make a better decision.',
            ],
            callout: { kind: 'key', text: 'No statutory format applies to management information. If an exam option claims management accounts must follow a prescribed layout, it is wrong.' },
          },
          {
            h: 'The three questions costing answers',
            p: [
              '**What did it cost?** Attributing costs to a product, a service, a department or a job.',
              '**What should it cost?** Setting budgets and standards to plan against.',
              '**What do we do next?** Supporting decisions — what to make, what to charge, whether to accept an order.',
            ],
          },
          {
            h: 'Cost units and cost centres',
            p: [
              'The two are easy to confuse because both collect costs. The difference is **what** versus **where**: a cost unit is the thing being costed, a cost centre is the place costs are gathered before being charged on.',
              'They work together. Overheads are collected in cost centres first, then absorbed into cost units — which is the whole basis of absorption costing later in the unit.',
            ],
            split: {
              left: { title: 'Cost unit', items: [
                'The **thing** whose cost you are measuring',
                'One car; one hotel room-night; one meal',
                'One tonne of gravel; one patient treated',
                'Costs are collected **for** the cost unit',
              ] },
              right: { title: 'Cost centre', items: [
                'The **place** where costs are incurred',
                'The assembly department; the canteen',
                'A vehicle; a machine; a sales region',
                'Costs are collected **in** the cost centre',
              ] },
            },
            callout: { kind: 'tip', text: 'Cost unit answers "cost of what?"; cost centre answers "cost incurred where?". Mixing them up is a reliable way to lose easy marks.' },
          },
          {
            h: 'Profit centres and investment centres',
            p: [
              'A **cost centre** is measured on its costs alone — the canteen has no revenue of its own.',
              'A **profit centre** is responsible for both revenue and costs, so it can be measured on the profit it generates — a retail branch, for example.',
              'An **investment centre** goes further still, being responsible for the capital invested in it as well as its profit.',
            ],
          },
          {
            h: 'Coding costs',
            p: [
              'Every cost is given a **code** so it can be sorted and analysed. A typical code has segments identifying the cost centre and the type of cost.',
              'If maintenance wages are coded 300/420, the 300 might be the maintenance department (cost centre) and 420 the wages code (cost type).',
              'Coding is what allows the same £900 wage payment to be reported both as "maintenance department costs" and as "total wages" without recording it twice.',
            ],
            worked: {
              title: 'Reading a cost code',
              problem: 'A business uses codes in the form CCC/TTT, where CCC is the cost centre and TTT the cost type. Cost centres: 100 Production, 200 Stores, 300 Maintenance. Types: 410 Materials, 420 Labour, 430 Overheads. Code the purchase of lubricating oil used by the maintenance department.',
              steps: [
                { do: 'Identify the **cost centre**: the oil is used by maintenance, so **300**.', why: 'The first segment always answers "where was this cost incurred?".' },
                { do: 'Identify the **cost type**: oil is a material, so **410**.', why: 'The second segment answers "what kind of cost is it?".' },
                { do: 'Combine them: **300/410**.', why: 'Cost centre first, then cost type — the order matters and is given in the question.' },
              ],
              answer: '300/410',
              tryIt: {
                q: 'Using the same scheme, wages paid to a stores assistant would be coded 200/xxx. What is the three-digit cost type, as a number?',
                answer: 420, unit: '',
                hint: 'Wages are a labour cost. Look up the labour code in the list.',
                exp: 'Stores is cost centre 200 and labour is type 420, giving the full code 200/420.',
              },
            },
          },
        ],
        check: [
          { q: 'A cost unit is best described as:', opts: [
              'The unit of product or service for which cost is measured',
              'The department within which costs are incurred and controlled',
              'The total production cost incurred during the period',
              'The rate at which overheads are charged to production'],
            ans: 0, exp: 'A cost unit is the thing being costed — one car, one meal, one patient. The department is a cost centre.' },
          { type: 'truefalse', q: 'Identify whether the following statements are true or false.',
            statements: [
              { text: 'Management accounting reports must follow a statutory format.', answer: false },
              { text: 'A profit centre is responsible for both revenue and costs.', answer: true },
              { text: 'Cost codes allow the same cost to be analysed in more than one way.', answer: true },
              { text: 'Costing information is prepared mainly for HMRC.', answer: false },
            ],
            exp: 'Management information is internal, so its format is whatever is useful. HMRC receives financial, not management, information.' },
          { q: 'The canteen in a factory is best described as:', opts: [
              'A cost centre, because it incurs costs but generates no revenue',
              'A profit centre, because it is responsible for revenue and costs',
              'A cost unit, because its cost can be measured per meal',
              'An investment centre, because capital is tied up in its equipment'],
            ans: 0, exp: 'The canteen incurs costs without external revenue, making it a cost centre. A meal could be a cost unit, but the canteen itself is the centre.' },
        ],
      },
      {
        id: 'L-poc-2',
        title: 'Classifying costs',
        icon: '🗂️',
        skills: ['poc-behaviour'],
        cards: [
          {
            h: 'Two ways to slice the same cost',
            p: [
              'Every cost can be classified in two independent ways, and you need both:',
              '**By traceability** — can this cost be traced to a specific cost unit? That gives **direct** and **indirect**.',
              '**By behaviour** — what happens to this cost when activity changes? That gives **fixed**, **variable** and **semi-variable**.',
              'The two are not the same question. A cost can be direct and variable, or indirect and fixed, or any other combination.',
            ],
          },
          {
            h: 'Direct and indirect',
            p: [
              'The test for a direct cost is **traceability, not size**. A cost can be enormous and still indirect: factory rent belongs to no single unit.',
              'Prime cost totals the direct costs only. Add absorbed production overhead to prime cost and you have the full production cost per unit.',
            ],
            split: {
              left: { title: 'Direct costs', items: [
                'Traceable to a single cost unit',
                'Direct materials — the timber in a table',
                'Direct labour — the joiner assembling it',
                'Direct expenses — a royalty per unit made',
                'Together these are **prime cost**',
              ] },
              right: { title: 'Indirect costs (overheads)', items: [
                'Cannot be traced to one cost unit',
                'Factory rent, heating, insurance',
                'Supervisors\' and cleaners\' wages',
                'Depreciation of factory machinery',
                'Shared across units by absorption',
              ] },
            },
            formula: 'Prime cost = Direct materials + Direct labour + Direct expenses',
          },
          {
            h: 'Cost behaviour',
            p: [
              'Behaviour is always described **in total** and only within the **relevant range** — the band of activity over which current capacity and the existing cost structure hold.',
              'Watch the total-versus-per-unit flip: a fixed cost is constant in total but falls per unit as output rises, while a variable cost is constant per unit but rises in total.',
            ],
            table: {
              headers: ['Type', 'Total cost as activity rises', 'Cost per unit as activity rises', 'Example'],
              rows: [
                ['Variable', 'Rises in proportion', 'Stays the same', 'Raw materials'],
                ['Fixed', 'Stays the same', 'Falls', 'Factory rent'],
                ['Semi-variable', 'Rises, but not proportionally', 'Falls', 'Electricity with a standing charge'],
                ['Stepped fixed', 'Jumps at capacity thresholds', 'Falls, then jumps', 'A second supervisor'],
              ],
            },
            callout: { kind: 'warning', text: 'The classic trap: fixed cost is fixed in TOTAL, not per unit. Fixed cost per unit falls as output rises. Variable cost is the other way round — constant per unit, rising in total.' },
          },
          {
            h: 'Why the distinction earns its keep',
            p: [
              'Because it changes the answer. If you are deciding whether to accept a one-off order, the factory rent is irrelevant — it will be paid either way. Only the costs that actually change with the decision matter.',
              'Fixed costs behaving as though they were variable is the most expensive misunderstanding in costing, and it is why marginal costing exists.',
            ],
          },
          {
            h: 'Classifying and calculating',
            p: [
              'Read each cost twice — once asking "can I trace it to a unit?" and once asking "does it change when output changes?" The two answers are independent of each other.',
            ],
            worked: {
              title: 'Total cost at two activity levels',
              problem: 'A workshop has fixed costs of £18,000 per month and variable costs of £7.50 per unit. What is the total cost at 2,000 units, and what is the cost per unit?',
              steps: [
                { do: 'Calculate the variable cost: **2,000 × £7.50 = £15,000**.', why: 'Variable cost per unit is constant, so total variable cost is simply units × rate.' },
                { do: 'Add the fixed cost, which does not change with output: **£15,000 + £18,000 = £33,000**.', why: 'Fixed cost stays at £18,000 whether the workshop makes 1 unit or 5,000.' },
                { do: 'Calculate cost per unit: **£33,000 ÷ 2,000 = £16.50**.', why: 'This is £7.50 variable plus £9.00 of fixed cost spread over the 2,000 units.' },
                { do: 'Note what happens at 3,000 units: total = £22,500 + £18,000 = £40,500, so cost per unit falls to **£13.50**.', why: 'The same £18,000 of fixed cost now spreads over more units — this is why cost per unit falls as output rises.' },
              ],
              answer: 'Total £33,000 · £16.50 per unit',
              tryIt: {
                q: 'Same workshop, 4,000 units. What is the total cost, in £?',
                answer: 48000, unit: '£',
                hint: 'Variable cost is 4,000 × £7.50. Fixed cost is unchanged at £18,000.',
                exp: 'Variable: 4,000 × £7.50 = £30,000. Fixed: £18,000. Total = £48,000, or £12.00 per unit.',
              },
            },
          },
        ],
        check: [
          { q: 'Which of the following is a direct cost for a furniture maker?', opts: [
              'The timber used in making a specific table',
              'The rent payable on the workshop premises',
              'The salary paid to the production supervisor',
              'The insurance covering the workshop machinery'],
            ans: 0, exp: 'Timber can be traced to the individual table, making it a direct material. Rent, supervision and insurance are shared across all output.' },
          { type: 'numeric', q: 'Fixed costs are £24,000 and variable costs £6.00 per unit. What is the total cost of producing 5,000 units, in £?',
            answer: 54000, unit: '£',
            steps: ['Variable cost: 5,000 × £6.00 = £30,000.', 'Fixed cost is unchanged at £24,000.', 'Total = £30,000 + £24,000 = £54,000.'],
            exp: 'Only the variable element scales with output; the fixed element is the same at every activity level.' },
          { type: 'truefalse', q: 'Identify whether the following statements about cost behaviour are true or false.',
            statements: [
              { text: 'Fixed costs stay the same in total as output changes.', answer: true },
              { text: 'Variable cost per unit falls as output rises.', answer: false },
              { text: 'Fixed cost per unit falls as output rises.', answer: true },
              { text: 'A semi-variable cost contains both a fixed and a variable element.', answer: true },
            ],
            exp: 'Variable cost per unit is constant — it is the total that rises. Fixed cost is the reverse: constant in total, falling per unit.' },
          { type: 'gapfill', q: 'Complete the definition of prime cost.',
            template: 'Prime cost is the total of direct materials, direct {0} and direct expenses, and it excludes all {1}.',
            gaps: [
              { options: ['labour', 'overheads', 'rent', 'depreciation'], answer: 0 },
              { options: ['direct costs', 'overheads', 'materials', 'revenues'], answer: 1 },
            ],
            exp: 'Prime cost is the sum of the three direct cost elements. Indirect costs — overheads — are added afterwards under absorption costing.' },
        ],
      },
      {
        id: 'L-poc-3',
        title: 'Materials and inventory control',
        icon: '📦',
        skills: ['poc-inv'],
        cards: [
          {
            h: 'Materials are usually the biggest cost',
            p: [
              'For most manufacturers, direct materials are the single largest cost, so how they are ordered, stored and valued has a direct effect on profit.',
              'Two questions matter: **how much to hold**, and **what value to put on it**.',
            ],
          },
          {
            h: 'Inventory control levels',
            p: [
              '**Reorder level** — the balance at which a new order is triggered. Set high enough to cover demand during the lead time.',
              '**Minimum level** — the buffer below which stock should not fall, protecting against unexpected delays.',
              '**Maximum level** — the ceiling, avoiding cash tied up and the risk of obsolescence.',
              'Holding too much wastes cash and storage; holding too little risks stopping production. Control levels manage that trade-off.',
            ],
            formula: 'Reorder level = Maximum usage × Maximum lead time · Minimum level = Reorder level − (Average usage × Average lead time)',
          },
          {
            h: 'Calculating a reorder level',
            p: [
              'Control levels are built from usage and lead time, so identify which version of each figure the question gives you — maximum, minimum or average — before substituting anything.',
              'The reorder level uses the **maximum** of both because its job is to survive the worst case: heaviest usage during the longest delay.',
            ],
            worked: {
              title: 'When should we order?',
              problem: 'A component is used at a maximum rate of 400 units per week. The maximum lead time from the supplier is 3 weeks. Average usage is 300 units per week and average lead time is 2 weeks. Calculate the reorder level and the minimum level.',
              steps: [
                { do: 'Reorder level = **maximum usage × maximum lead time** = 400 × 3 = **1,200 units**.', why: 'Always use the worst case for the reorder level — highest usage, longest wait — so stock cannot run out.' },
                { do: 'Calculate expected usage during a normal wait: **average usage × average lead time** = 300 × 2 = **600 units**.', why: 'This is what you would normally consume between ordering and delivery.' },
                { do: 'Minimum level = **reorder level − expected usage** = 1,200 − 600 = **600 units**.', why: 'The minimum level is the buffer that remains if everything goes to plan — the safety stock.' },
              ],
              answer: 'Reorder level 1,200 units · Minimum level 600 units',
              tryIt: {
                q: 'Maximum usage 250 units/week, maximum lead time 4 weeks. What is the reorder level, in units?',
                answer: 1000, unit: 'units',
                hint: 'Reorder level uses the maximum figures only: usage × lead time.',
                exp: '250 × 4 = 1,000 units. Ordering at this level means even the worst combination of high usage and slow delivery will not cause a stock-out.',
              },
            },
          },
          {
            h: 'Valuing what is issued and what remains',
            p: [
              'When identical items were bought at different prices, you need a rule for which cost to use when stock is issued.',
              '**FIFO (first in, first out)** — assume the oldest items go first. Closing inventory is therefore valued at the most recent prices.',
              '**AVCO (weighted average)** — recalculate a weighted average cost after each receipt, and value every issue at that running average.',
              'The physical goods may move in any order; these are **costing assumptions**, not warehouse instructions.',
            ],
            examtrap: 'LIFO (last in, first out) is **not permitted** under IAS 2 for financial reporting. If it appears as an option in a question about acceptable methods, it is the wrong answer.',
          },
          {
            h: 'The effect of rising prices',
            p: [
              'The whole comparison holds only while prices are **rising**. Reverse the direction of prices and every row reverses with it.',
              'The reason is mechanical: FIFO issues the old cheap costs and leaves the new dear ones in stock, while AVCO blends the two — which is why it always lands between.',
            ],
            table: {
              headers: ['When prices are rising', 'FIFO', 'AVCO'],
              rows: [
                ['Cost of issues (cost of sales)', 'Lower', 'In between'],
                ['Closing inventory value', 'Higher', 'In between'],
                ['Reported profit', 'Higher', 'In between'],
              ],
            },
            callout: { kind: 'tip', text: 'FIFO issues the old, cheap stock first, so cost of sales is low and profit looks higher. Remember the direction and you can reason out any variant of this question.' },
          },
        ],
        check: [
          { type: 'numeric', q: 'Maximum usage is 180 units per week and the maximum lead time is 5 weeks. What is the reorder level, in units?',
            answer: 900, unit: 'units',
            steps: ['Reorder level = maximum usage × maximum lead time.', '180 × 5 = 900 units.'],
            exp: 'The reorder level always uses the worst case so that stock cannot run out during an unusually long wait.' },
          { q: 'Under FIFO, closing inventory is valued at:', opts: [
              'The most recent purchase prices paid',
              'The earliest purchase prices paid',
              'A weighted average of all prices paid',
              'The lowest price paid during the period'],
            ans: 0, exp: 'FIFO issues the oldest units first, so whatever remains is the most recently purchased — and therefore valued at recent prices.' },
          { type: 'truefalse', q: 'Identify whether the following statements are true or false.',
            statements: [
              { text: 'LIFO is permitted for financial reporting under IAS 2.', answer: false },
              { text: 'AVCO recalculates the average cost after each receipt.', answer: true },
              { text: 'When prices are rising, FIFO gives a higher closing inventory value than AVCO.', answer: true },
              { text: 'Inventory valuation methods dictate the physical order goods leave the store.', answer: false },
            ],
            exp: 'These are costing assumptions, not warehouse rules. LIFO is prohibited by IAS 2.' },
          { type: 'numeric', q: 'Opening stock 100 units at £5.00. A receipt of 100 units at £7.00 follows. Under AVCO, what is the new average cost per unit, in £?',
            answer: 6, unit: '£',
            steps: ['Total cost: (100 × £5.00) + (100 × £7.00) = £500 + £700 = £1,200.', 'Total units: 100 + 100 = 200.', 'Average = £1,200 ÷ 200 = £6.00 per unit.'],
            exp: 'AVCO weights by quantity. Here the quantities are equal, so the average sits midway between £5.00 and £7.00.' },
        ],
      },
      {
        id: 'L-poc-4',
        title: 'Overheads and absorption',
        icon: '🏭',
        skills: ['poc-behaviour'],
        cards: [
          {
            h: 'The overhead problem',
            p: [
              'Direct costs attach themselves to a cost unit automatically — you know how much timber went into the table.',
              'Overheads do not. Nobody can say how much of the factory rent belongs to one table. But if you ignore overheads, you will price below cost and lose money on every sale.',
              '**Absorption costing** is the mechanism for getting a fair share of overhead into each unit.',
            ],
          },
          {
            h: 'Three stages',
            p: [
              '**Allocation** — charge a whole overhead to the one cost centre that incurred it. The maintenance department\'s own wages go straight to maintenance.',
              '**Apportionment** — share an overhead that benefits several cost centres, on a sensible basis. Factory rent might be apportioned on floor area.',
              '**Absorption** — charge the cost centre\'s total overhead into the units passing through it, using an absorption rate.',
            ],
            flow: ['Allocate', 'Apportion', 'Absorb into units'],
          },
          {
            h: 'Choosing an apportionment basis',
            p: [
              'A basis is defensible when it reflects **what causes the cost to be incurred**. Rent is caused by occupying floor space; canteen costs are caused by the number of people.',
              'There is rarely one right answer, but there is a wrong one: a basis with no causal link to the cost distorts every unit cost that flows out of it.',
            ],
            table: {
              headers: ['Overhead', 'Sensible basis'],
              rows: [
                ['Rent, rates, heating, lighting', 'Floor area occupied'],
                ['Machine insurance and depreciation', 'Machine value or machine hours'],
                ['Canteen and personnel costs', 'Number of employees'],
                ['Stores and materials handling', 'Value or volume of materials'],
              ],
            },
            callout: { kind: 'key', text: 'The basis should reflect what actually drives the cost. Apportioning canteen costs on floor area rather than headcount is a classic wrong answer.' },
          },
          {
            h: 'The overhead absorption rate',
            p: [
              'The **OAR** is set in advance, from budgeted figures, so that products can be costed during the year without waiting for actual results.',
              'The basis is usually labour hours or machine hours — whichever better reflects how the cost centre consumes overhead. A machine-intensive department uses machine hours.',
            ],
            formula: 'OAR = Budgeted overheads ÷ Budgeted activity · Overhead absorbed = OAR × Actual activity',
          },
          {
            h: 'Calculating an OAR and absorbing overhead',
            p: [
              'Two separate calculations at two different times: the rate is set from **budgeted** figures before the period, then overhead is absorbed using **actual** activity during it.',
            ],
            worked: {
              title: 'Setting the rate and applying it',
              problem: 'A department budgets overheads of £48,000 and 6,000 labour hours. Actual hours worked were 6,200 and actual overheads £49,000. Calculate the OAR, the overhead absorbed, and the under- or over-absorption.',
              steps: [
                { do: 'Calculate the OAR from **budgeted** figures: **£48,000 ÷ 6,000 = £8.00 per labour hour**.', why: 'The rate is always set in advance from budget, never from actuals — that is the whole point of a predetermined rate.' },
                { do: 'Calculate overhead absorbed using **actual** activity: **£8.00 × 6,200 = £49,600**.', why: 'Products are charged at the predetermined rate for the hours they actually consumed.' },
                { do: 'Compare absorbed with actual: **£49,600 absorbed − £49,000 actual = £600**.', why: 'Absorbed exceeds actual, so more overhead has been charged to products than was really incurred.' },
                { do: 'That is **over-absorption of £600**, which increases profit.', why: 'Product costs were overstated, so profit was understated during the year and the £600 is credited back.' },
              ],
              answer: 'OAR £8.00/hour · absorbed £49,600 · over-absorbed £600',
              tryIt: {
                q: 'Budgeted overheads £60,000 over 5,000 machine hours. What is the OAR, in £ per machine hour?',
                answer: 12, unit: '£',
                hint: 'OAR = budgeted overheads ÷ budgeted activity.',
                exp: '£60,000 ÷ 5,000 = £12.00 per machine hour. Always divide budget by budget.',
              },
            },
          },
          {
            h: 'Under- and over-absorption',
            p: [
              'Compare absorbed overhead with actual overhead and let the direction tell you the name: absorbed more than actual is over-absorption, absorbed less is under-absorption.',
              'Because absorbed overhead is OAR × **actual** activity, the difference can come from the overhead figure, the activity figure, or both.',
            ],
            split: {
              left: { title: 'Under-absorption', items: [
                'Absorbed **less than** actual overhead',
                'Products were undercharged',
                'Profit is **overstated** and must be reduced',
                'Caused by lower activity or higher costs than budget',
              ] },
              right: { title: 'Over-absorption', items: [
                'Absorbed **more than** actual overhead',
                'Products were overcharged',
                'Profit is **understated** and is increased',
                'Caused by higher activity or lower costs than budget',
              ] },
            },
            examtrap: 'Under-absorption means profit was overstated during the year and must now be reduced. Students routinely get this the wrong way round — work it through from "were products charged too much or too little?" rather than memorising it.',
          },
        ],
        check: [
          { type: 'numeric', q: 'Budgeted overheads are £75,000 and budgeted labour hours 6,250. What is the overhead absorption rate, in £ per hour?',
            answer: 12, unit: '£',
            steps: ['OAR = budgeted overheads ÷ budgeted activity.', '£75,000 ÷ 6,250 = £12.00 per labour hour.'],
            exp: 'The rate is predetermined from budgeted figures so products can be costed before actual results are known.' },
          { q: 'Which basis is most appropriate for apportioning canteen costs?', opts: [
              'The number of employees in each cost centre',
              'The floor area occupied by each cost centre',
              'The value of machinery in each cost centre',
              'The value of materials issued to each cost centre'],
            ans: 0, exp: 'Canteen cost is driven by how many people use it. Floor area suits rent and heating; machine value suits machine insurance.' },
          { type: 'numeric', q: 'The OAR is £9.00 per hour. Actual hours were 4,000 and actual overheads £37,500. By how much is overhead UNDER-absorbed, in £?',
            answer: 1500, unit: '£',
            steps: ['Overhead absorbed = OAR × actual hours = £9.00 × 4,000 = £36,000.', 'Actual overhead incurred = £37,500.', 'Absorbed is less than actual, so overhead is under-absorbed.', 'Under-absorption = £37,500 − £36,000 = £1,500.'],
            exp: 'Products were charged £36,000 of overhead but £37,500 was actually incurred. Profit was therefore overstated by £1,500 and must be reduced.' },
          { type: 'truefalse', q: 'Identify whether the following statements are true or false.',
            statements: [
              { text: 'The overhead absorption rate is calculated from budgeted figures.', answer: true },
              { text: 'Under-absorption means profit has been overstated and must be reduced.', answer: true },
              { text: 'Allocation shares one overhead across several cost centres.', answer: false },
              { text: 'Overhead absorbed is the OAR multiplied by actual activity.', answer: true },
            ],
            exp: 'Allocation charges a whole overhead to a single cost centre; apportionment is what shares a cost across several.' },
        ],
      },
      {
        id: 'L-poc-5',
        title: 'Paying for labour',
        icon: '⏱️',
        skills: ['poc-labour'],
        cards: [
          {
            h: 'Time rate',
            p: [
              'The simplest scheme: pay per hour worked. Gross pay equals hours worked multiplied by the hourly rate.',
              'Time rate is fair and predictable, but it does not reward working faster — an employee earns the same whether they make 5 units or 50.',
            ],
          },
          {
            h: 'Overtime and the premium',
            p: [
              'Hours beyond the basic week are often paid at a higher rate, like **time and a half**.',
              'Split the overtime pay in two: the basic rate part, and the **overtime premium** — the extra bit above basic rate. At time and a half on £12 per hour, the premium is £6 per hour.',
              'Costing often treats the premium separately, because it is the extra cost of working beyond normal hours.',
            ],
          },
          {
            h: 'Piecework and bonuses',
            p: [
              '**Piecework** pays per unit made: fast workers earn more. Many schemes include a guaranteed minimum so a slow week still pays a fair wage.',
              'A **bonus scheme** mixes the two ideas: time rate as the base, plus a bonus for beating a target — for example, sharing the value of time saved.',
            ],
          },
          {
            h: 'A full weekly wage',
            p: ['Sam works a 38-hour basic week at £12 per hour, plus 4 hours overtime at time and a half.'],
            example: {
              title: 'Sam\'s gross pay',
              rows: [
                ['Basic: 38 hours at £12', '£456'],
                ['Overtime: 4 hours at £18', '£72'],
                ['Gross pay', '£528'],
                ['Of which overtime premium: 4 at £6', '£24'],
              ],
            },
          },
          {
            h: 'Labour pay formulas',
            p: [
              'Three pay bases cover all standard labour cost questions.',
            ],
            formula: 'Time-rate pay = Hours worked × Hourly rate · Overtime premium = Overtime hours × (Overtime rate − Basic rate) · Piecework pay = Units produced × Rate per unit · Guaranteed minimum applies if piecework pay falls below it',
          },
        ],
        check: [
          {
            q: 'What is the overtime premium for 5 hours at double time, basic rate £10 per hour?',
            opts: ['£100', '£50', '£25', '£10'],
            exp: 'Double time pays £20 per hour; the premium is the extra above basic rate = £10 per hour × 5 hours = £50.',
            ans: 1,
          },
          {
            q: 'A worker is paid £0.80 per unit and makes 460 units. What is their piecework pay?',
            opts: ['£460', '£575', '£368', '£80'],
            ans: 2,
            exp: '460 × £0.80 = £368.',
          },
          {
            q: 'What is the main drawback of a pure time rate scheme?',
            opts: ['It gives no incentive to produce more in the time worked', 'It is illegal in the UK', 'Pay varies wildly each week', 'It cannot be used for overtime'],
            ans: 0,
            exp: 'Pay depends only on hours, not output — so there is no built-in productivity incentive.',
          },
          {
            q: 'Why do many piecework schemes include a guaranteed minimum wage?',
            opts: ['To increase the overtime premium', 'To reduce the employer\'s NIC', 'To make all workers earn the same', 'To protect workers when output is low for reasons beyond their control'],
            ans: 3,
            exp: 'A guaranteed minimum ensures fair pay when machine breakdowns or material shortages limit output through no fault of the worker.',
          },
          {
            q: 'An employee works 40 basic hours at £11 per hour and 6 overtime hours at time and a quarter. What is total gross pay?',
            opts: ['£440', '£522.50', '£506', '£484'],
            ans: 1,
            exp: 'Basic: 40 × £11 = £440. Overtime rate = £11 × 1.25 = £13.75. Overtime pay: 6 × £13.75 = £82.50. Total = £440 + £82.50 = £522.50.',
          },
        ],
      },
      {
        id: 'L-poc-6',
        title: 'Budgets and variances',
        icon: '🧭',
        skills: ['poc-budget'],
        cards: [
          {
            h: 'Why budget at all?',
            p: [
              'A **budget** is a financial plan for a future period. It forces managers to plan ahead, coordinates departments, sets targets, and gives a yardstick to measure performance against.',
              'Without a budget, you only find out something went wrong when the money has already gone.',
            ],
          },
          {
            h: 'Variances: actual versus budget',
            p: [
              'A **variance** is the difference between the budgeted figure and the actual figure.',
              'A variance is **favourable (F)** when it makes profit higher than planned: costs below budget, or income above budget. It is **adverse (A)** when it makes profit lower: costs above budget, or income below budget.',
            ],
            example: {
              title: 'Variance practice',
              rows: [
                ['Materials: budget £8,000, actual £8,600', '£600 Adverse'],
                ['Sales revenue: budget £20,000, actual £21,500', '£1,500 Favourable'],
                ['Wages: budget £5,000, actual £4,700', '£300 Favourable'],
              ],
            },
          },
          {
            h: 'Exception reporting',
            p: [
              'Managers do not have time to investigate every tiny difference. **Exception reporting** flags only **significant** variances — usually those above a set percentage or money value.',
              'A £20 variance on a £50,000 budget is noise. A 10% adverse materials variance is a conversation.',
            ],
          },
          {
            h: 'A first look at contribution',
            p: [
              '**Contribution** is selling price minus **variable** cost per unit. It is what each unit contributes towards covering fixed costs — and after those are covered, towards profit.',
              'Sell at £20 with variable costs of £12 and each unit contributes **£8**. With fixed costs of £4,000, you need 500 units just to break even.',
            ],
          },
          {
            h: 'Budget and CVP formulas',
            p: [
              'These formulas link variances, contribution and break-even analysis.',
            ],
            formula: 'Variance = Actual − Budget (adverse if cost actual > budget, or income actual < budget) · Contribution per unit = Selling price − Variable cost per unit · Break-even units = Fixed costs ÷ Contribution per unit · Target profit units = (Fixed costs + Target profit) ÷ Contribution per unit',
          },
          {
            h: 'Break-even worked example',
            p: [
              'The steps run in a fixed order because each depends on the one above. Contribution per unit comes first; nothing else can be calculated until it is known.',
              'The target-profit line uses the same formula as break-even with the profit simply added to fixed costs — treat the profit as one more cost that contribution has to cover.',
            ],
            example: {
              title: 'Selling price £25/unit · Variable cost £15/unit · Fixed costs £48,000 · Target profit £12,000',
              rows: [
                ['Step', 'Working', 'Result'],
                ['Contribution per unit', '£25 − £15', '£10 per unit'],
                ['Break-even units', '£48,000 ÷ £10', '4,800 units'],
                ['Break-even revenue', '4,800 × £25', '£120,000'],
                ['Units for target profit', '(£48,000 + £12,000) ÷ £10', '6,000 units'],
                ['Margin of safety (if selling 6,500)', '6,500 − 4,800', '1,700 units'],
              ],
            },
          },
        ],
        check: [
          {
            q: 'Actual rent was £5,200 against a budget of £5,000. What is the variance?',
            opts: ['£200 adverse', '£200 favourable', '£5,200 adverse', 'No variance'],
            ans: 0,
            exp: 'Spending £200 more than budgeted on a cost reduces profit relative to plan — adverse.',
          },
          {
            q: 'Sales revenue came in £900 above budget. How is this variance described?',
            opts: ['Adverse, because budgets should be exact', 'Favourable, because higher income increases profit', 'Neutral', 'Adverse, because costs will also rise'],
            ans: 1,
            exp: 'Income above budget increases profit, making the variance favourable.',
          },
          {
            q: 'What is the purpose of exception reporting?',
            opts: ['To report every variance no matter how small', 'To hide adverse variances', 'To focus management attention on significant variances only', 'To replace the budget'],
            ans: 2,
            exp: 'Exception reporting filters out trivial differences so managers investigate only what materially affects the business.',
          },
          {
            q: 'A product sells for £15 with variable costs of £9 per unit. What is the contribution per unit?',
            opts: ['£15', '£9', '£24', '£6'],
            ans: 3,
            exp: 'Contribution = selling price − variable cost per unit = £15 − £9 = £6.',
          },
          {
            q: 'Fixed costs are £18,000. Contribution per unit is £6. How many units are needed to break even?',
            opts: ['3,000', '1,800', '6,000', '108,000'],
            ans: 0,
            exp: 'Break-even units = fixed costs ÷ contribution per unit = £18,000 ÷ £6 = 3,000 units.',
          },
          {
            q: 'Budgeted sales: 800 units at £20 each (£16,000). Actual sales: 750 units at £22 each (£16,500). What is the overall sales variance?',
            opts: ['£500 adverse', '£500 favourable', '£1,000 adverse', 'No variance'],
            ans: 1,
            exp: 'Actual revenue (£16,500) exceeds budgeted revenue (£16,000) by £500. Revenue above budget = favourable variance.',
          },
          {
            q: 'Labour budget: 200 hours at £12/hour = £2,400. Actual: 210 hours at £11.50/hour = £2,415. Is this variance adverse or favourable?',
            opts: ['Favourable — fewer hours worked', 'Adverse — more hours worked', 'Adverse — actual cost £15 over budget', 'Favourable — lower hourly rate'],
            ans: 2,
            exp: 'Actual labour cost (£2,415) exceeds budget (£2,400) by £15. A cost above budget = adverse variance, because profit is reduced.',
          },
        ],
      },
      {
        id: 'L-poc-7',
        title: 'Absorption costing and OARs',
        icon: '🏭',
        skills: ['poc-cvp'],
        cards: [
          {
            h: 'What is absorption costing?',
            p: [
              '**Absorption costing** charges all manufacturing costs — direct and indirect (overheads) — to each unit produced.',
              'This gives a **full cost per unit** used for inventory valuation and setting selling prices.',
              'Overheads are absorbed using a pre-determined **Overhead Absorption Rate (OAR)**.',
            ],
          },
          {
            h: 'Calculating the OAR',
            p: [
              'The rate must be fixed **before** the period starts, because a job costed in March cannot wait until December for the actual overhead figure.',
              'That is why both inputs are budgeted. The choice of basis matters too: machine hours in an automated department, labour hours in a labour-intensive one — whichever actually drives the overhead.',
            ],
            formula: 'OAR = Budgeted overheads ÷ Budgeted activity level · Common bases: machine hours, labour hours, units produced',
            example: {
              title: 'OAR example',
              rows: [
                ['Budgeted overheads', '£120,000'],
                ['Budgeted machine hours', '40,000'],
                ['OAR', '£120,000 ÷ 40,000 = £3 per machine hour'],
                ['Product uses 2 machine hours', 'Absorbed overhead = 2 × £3 = £6 per unit'],
              ],
            },
          },
          {
            h: 'Under and over absorption',
            p: [
              'Because the OAR is based on **budgeted** figures, actual absorption rarely equals actual overheads.',
              '**Under-absorption**: actual overheads > absorbed overheads → additional charge to income statement (reduces profit).',
              '**Over-absorption**: actual overheads < absorbed overheads → credit to income statement (increases profit).',
            ],
            formula: 'Under/over absorption = Overheads absorbed − Actual overheads · Positive = over-absorbed; Negative = under-absorbed',
          },
          {
            h: 'Under vs over absorption',
            p: [
              'Under- and over-absorption exist only because the OAR was an estimate. If budget and actual ever matched exactly, neither would arise.',
              'Either input can cause it — actual overheads differing from budget, actual activity differing from budget, or both at once.',
              'The adjustment does not change the unit cost already charged to products. It is a single period-end correction in the income statement.',
            ],
            split: {
              left: { title: 'Under-absorption', items: ['Absorbed < Actual overheads', 'Not enough overheads charged', 'Debit to income statement', 'Reduces profit'] },
              right: { title: 'Over-absorption', items: ['Absorbed > Actual overheads', 'Too many overheads charged', 'Credit to income statement', 'Increases profit'] },
            },
          },
          {
            h: 'Building the full unit cost',
            p: [
              'Absorption costing builds the unit cost in layers: direct costs first, then variable overhead, then fixed overhead brought in through the OAR.',
              'The result is the figure used to value closing inventory in the financial statements, and the long-run floor below which a selling price makes a loss.',
            ],
            example: {
              title: 'Full cost per unit',
              rows: [
                ['Cost element', 'Per unit'],
                ['Direct materials', '£8.00'],
                ['Direct labour', '£5.00'],
                ['Variable overheads', '£2.00'],
                ['Fixed overheads (OAR)', '£6.00'],
                ['**Full (absorbed) cost**', '**£21.00**'],
              ],
            },
            callout: { kind: 'warning', text: '**Exam trap:** OAR is calculated using BUDGETED figures, not actual. Under/over absorption is only known after the period ends when actual figures are available.' },
          },
        ],
        check: [
          {
            q: 'Budgeted overheads are £80,000 and budgeted labour hours are 16,000. What is the OAR per labour hour?',
            opts: ['£0.20', '£5.00', '£8.00', '£4.00'],
            ans: 1,
            exp: 'OAR = £80,000 ÷ 16,000 = £5 per labour hour.',
          },
          {
            q: 'A product takes 3 labour hours to produce. The OAR is £5 per labour hour. What overheads are absorbed per unit?',
            opts: ['£3', '£5', '£15', '£8'],
            ans: 2,
            exp: 'Overheads absorbed = 3 hours × £5 = £15 per unit.',
          },
          {
            q: 'Actual overheads are £95,000. Absorbed overheads are £88,000. What is the result?',
            opts: ['Over-absorption of £7,000', 'Under-absorption of £7,000', 'Over-absorption of £95,000', 'Under-absorption of £183,000'],
            ans: 1,
            exp: 'Absorbed (£88,000) < Actual (£95,000) → under-absorption of £7,000. This is an additional debit to the income statement, reducing profit.',
          },
          {
            q: 'Over-absorption of overheads has what effect on profit?',
            opts: ['Reduces profit', 'Increases profit', 'No effect on profit', 'Increases assets only'],
            ans: 1,
            exp: 'Over-absorption means more overheads were charged to products than actually incurred. The excess is credited back to the income statement, increasing reported profit.',
          },
          {
            q: 'The OAR is calculated using which figures?',
            opts: ['Actual overheads and actual activity', 'Budgeted overheads and actual activity', 'Budgeted overheads and budgeted activity', 'Actual overheads and budgeted activity'],
            ans: 2,
            exp: 'OAR = Budgeted overheads ÷ Budgeted activity. Both figures are budgeted because the rate must be set before the period starts.',
          },
        ],
      },
      {
        id: 'L-poc-8',
        title: 'Inventory: FIFO and AVCO step by step',
        icon: '📦',
        skills: ['poc-inv'],
        cards: [
          {
            h: 'Two main inventory valuation methods',
            p: [
              '**FIFO (First In, First Out)** assumes the oldest stock is issued first. Remaining inventory is valued at the most recent purchase prices.',
              '**AVCO (Average Cost)** calculates a new weighted average cost every time new stock arrives. All issues are at the current average.',
              'Both are acceptable under UK GAAP; the method affects both closing inventory value and cost of sales.',
            ],
          },
          {
            h: 'FIFO step by step',
            p: [
              'FIFO is an assumption about **cost flow, not physical movement**. The stores may hand over whichever box is nearest; the valuation still charges the oldest cost first.',
              'Work the stores record one line at a time and keep the balance split into price layers. The layer you use up first is always the oldest one.',
            ],
            example: {
              title: 'FIFO: 10 units at £4, then 10 at £5; issue 8 units',
              rows: [
                ['Date', 'Receipt', 'Issue', 'Balance'],
                ['1 Jan', '10 × £4 = £40', '', '10u @ £4 = £40'],
                ['15 Jan', '10 × £5 = £50', '', '10u@£4 + 10u@£5'],
                ['20 Jan', '', '8 units (oldest first)', '2u@£4 + 10u@£5 = £58'],
                ['Issue cost', '', '8 × £4 = £32', ''],
              ],
            },
          },
          {
            h: 'AVCO step by step',
            p: [
              'Under AVCO the balance is never split into layers — there is only ever one figure, the current weighted average.',
              'Recalculate it on every **receipt**: total value ÷ total units. Issues never change the average; they simply remove units at the rate already in force.',
            ],
            example: {
              title: 'AVCO: same data — recalculate average on each receipt',
              rows: [
                ['Date', 'Receipt', 'Avg cost', 'Balance'],
                ['1 Jan', '10 × £4', '£4.00', '£40'],
                ['15 Jan', '10 × £5', '(£40+£50)÷20 = £4.50', '£90'],
                ['20 Jan', '', '£4.50', 'Issue: 8×£4.50=£36; Balance: 12×£4.50=£54'],
              ],
            },
          },
          {
            h: 'FIFO vs AVCO — comparison',
            p: [
              'Neither method is "more correct". They divide the same total cost differently between cost of sales and closing inventory, and over the life of the stock the two converge.',
              'The choice matters in the short run because it shifts profit between periods — which is why a business must apply its chosen method consistently.',
            ],
            split: {
              left: { title: 'FIFO', items: ['Oldest stock issued first', 'Closing stock at latest prices', 'Higher closing stock in inflation', 'Lower COGS in inflation → higher profit'] },
              right: { title: 'AVCO', items: ['Issues at average price', 'Recalculate average each receipt', 'Smooths price fluctuations', 'Profit between FIFO and LIFO'] },
            },
          },
          {
            h: 'Effect of rising prices on profit',
            p: [
              'When prices are **rising (inflation)**: FIFO → lower cost of sales → **higher profit** and **higher closing inventory**.',
              'AVCO produces a cost of sales and closing inventory value between FIFO results.',
            ],
            callout: { kind: 'key', text: '**UK rule:** LIFO (Last In, First Out) is NOT permitted under UK GAAP or IFRS. Only FIFO and AVCO are allowed. FIFO and AVCO will give the same total cost of sales over the lifetime of all inventory.' },
          },
        ],
        check: [
          {
            q: 'Under FIFO, which units are assumed to be issued first?',
            opts: ['The most recently purchased units', 'The oldest (earliest purchased) units', 'The cheapest units', 'Units chosen at random'],
            ans: 1,
            exp: 'FIFO — First In, First Out — assumes the oldest stock is sold or used first.',
          },
          {
            q: 'A business buys 20 units at £6 then 20 units at £8. It issues 25 units under FIFO. What is the cost of the issue?',
            opts: ['£175', '£150', '£160', '£200'],
            ans: 2,
            exp: 'FIFO: 20 units × £6 = £120, then 5 units × £8 = £40. Total cost of issue = £160.',
          },
          {
            q: 'Under AVCO, when is the average cost recalculated?',
            opts: ['After every issue', 'After every receipt of new inventory', 'Once at the end of the month', 'Only when prices change'],
            ans: 1,
            exp: 'AVCO recalculates the weighted average cost each time new inventory is received, blending old stock value with the new purchase.',
          },
          {
            q: 'In a period of rising prices, which method gives the higher closing inventory value?',
            opts: ['AVCO', 'FIFO', 'Both give the same result', 'It depends on the quantity issued'],
            ans: 1,
            exp: 'FIFO leaves the most recently purchased (more expensive) units in closing stock, giving a higher inventory value when prices are rising.',
          },
          {
            q: 'Which inventory valuation method is NOT permitted under UK GAAP?',
            opts: ['FIFO', 'AVCO', 'LIFO', 'Standard cost'],
            ans: 2,
            exp: 'LIFO (Last In, First Out) is not permitted under UK GAAP or IFRS. Only FIFO and AVCO are acceptable.',
          },
        ],
      },
      {
        id: 'L-poc-9',
        title: 'Break-even and margin of safety',
        icon: '📐',
        skills: ['poc-cvp'],
        cards: [
          {
            h: 'Contribution per unit and C/S ratio',
            p: [
              '**Contribution per unit** = Selling price − Variable cost per unit.',
              'Contribution pays off fixed costs first; any remaining contribution is profit.',
              'The **contribution to sales (C/S) ratio** = Contribution per unit ÷ Selling price. It shows what fraction of every £1 of sales is contribution.',
            ],
            formula: 'Contribution per unit = SP − VC per unit · C/S ratio = Contribution per unit ÷ Selling price · Total contribution = Contribution per unit × Units sold',
          },
          {
            h: 'Break-even point',
            p: [
              'At the **break-even point**, total contribution exactly equals fixed costs — profit is zero.',
            ],
            formula: 'Break-even units = Fixed costs ÷ Contribution per unit · Break-even revenue = Fixed costs ÷ C/S ratio · (Or: Break-even units × Selling price)',
          },
          {
            h: 'Margin of safety',
            p: [
              'The **margin of safety** is how far above break-even the business expects to operate. It measures the buffer before losses begin.',
            ],
            formula: 'Margin of safety (units) = Budgeted sales − Break-even sales · Margin of safety (%) = Margin of safety units ÷ Budgeted sales × 100',
          },
          {
            h: 'Target profit',
            p: [
              'To earn a **specific profit**, treat the target profit as an additional fixed cost to cover.',
            ],
            formula: 'Units for target profit = (Fixed costs + Target profit) ÷ Contribution per unit · Revenue for target profit = (Fixed costs + Target profit) ÷ C/S ratio',
          },
          {
            h: 'Worked example',
            p: [
              'Take the figures strictly in order: contribution per unit, then break-even, then margin of safety. Each line feeds the next, so an early slip carries all the way down.',
              'Sense-check the answer. Margin of safety can never exceed budgeted sales, and break-even units round **up** — a part unit does not cover the fixed costs.',
            ],
            example: {
              title: 'Break-even analysis: SP £25, VC £15, FC £48,000, budgeted 6,000 units',
              rows: [
                ['Calculation', 'Working', 'Result'],
                ['Contribution per unit', '£25 − £15', '£10'],
                ['C/S ratio', '£10 ÷ £25', '40%'],
                ['Break-even units', '£48,000 ÷ £10', '4,800 units'],
                ['Break-even revenue', '£48,000 ÷ 40%', '£120,000'],
                ['Margin of safety', '6,000 − 4,800', '1,200 units (20%)'],
                ['Target profit £12,000', '(£48,000 + £12,000) ÷ £10', '6,000 units'],
              ],
            },
          },
        ],
        check: [
          {
            q: 'Selling price is £30 and variable cost per unit is £18. What is the contribution per unit?',
            opts: ['£30', '£18', '£12', '£48'],
            ans: 2,
            exp: 'Contribution per unit = SP − VC = £30 − £18 = £12.',
          },
          {
            q: 'Contribution per unit is £8 and fixed costs are £40,000. What is the break-even point in units?',
            opts: ['5,000', '4,000', '8,000', '320,000'],
            ans: 0,
            exp: 'Break-even units = Fixed costs ÷ Contribution per unit = £40,000 ÷ £8 = 5,000 units.',
          },
          {
            q: 'Break-even is 4,000 units. Budgeted sales are 5,500 units. What is the margin of safety?',
            opts: ['4,000 units', '1,500 units (27.3%)', '5,500 units', '500 units (9.1%)'],
            ans: 1,
            exp: 'Margin of safety = 5,500 − 4,000 = 1,500 units. As a %: 1,500 ÷ 5,500 × 100 = 27.3%.',
          },
          {
            q: 'Fixed costs £60,000, contribution per unit £15, target profit £30,000. Units needed?',
            opts: ['4,000', '6,000', '2,000', '8,000'],
            ans: 1,
            exp: 'Units = (Fixed costs + Target profit) ÷ Contribution per unit = (£60,000 + £30,000) ÷ £15 = 6,000 units.',
          },
          {
            q: 'Selling price £40, variable cost £24. What is the C/S ratio?',
            opts: ['60%', '40%', '24%', '16%'],
            ans: 1,
            exp: 'Contribution per unit = £40 − £24 = £16. C/S ratio = £16 ÷ £40 = 40%.',
          },
          {
            q: 'Fixed costs are £72,000 and the C/S ratio is 45%. What is the break-even revenue?',
            opts: ['£32,400', '£160,000', '£72,000', '£45,000'],
            ans: 1,
            exp: 'Break-even revenue = Fixed costs ÷ C/S ratio = £72,000 ÷ 0.45 = £160,000.',
          },
          {
            q: 'Which of the following changes would REDUCE the break-even point?',
            opts: ['Increase fixed costs', 'Reduce selling price', 'Reduce variable cost per unit', 'Increase variable cost per unit'],
            ans: 2,
            exp: 'Reducing variable cost per unit increases contribution per unit. A higher contribution per unit means fewer units are needed to cover fixed costs, so break-even falls.',
          },
        ],
      },
      {
        id: 'L-poc-10',
        title: 'The high-low method',
        icon: '📏',
        skills: ['poc-behaviour'],
        cards: [
          {
            h: 'Why we need to split semi-variable costs',
            p: [
              '**Semi-variable costs** have both a fixed element (unchanged regardless of activity) and a variable element (changes with output).',
              'To plan and budget accurately, we need to know the fixed and variable parts separately.',
              'The **high-low method** uses the two extremes of activity data to split the cost — it is simple but requires only two data points.',
            ],
          },
          {
            h: 'Step 1 — calculate variable cost per unit',
            p: [
              'The logic is simple: between the highest and lowest activity levels the fixed cost has not moved at all, so the **whole** change in total cost must be variable.',
              'Choose the two rows by **activity level, not by cost**. The dearest month is not always the busiest, and picking on cost is the most common way to lose these marks.',
            ],
            formula: 'Variable cost per unit = (Total cost at highest activity − Total cost at lowest activity) ÷ (Units at highest − Units at lowest)',
          },
          {
            h: 'Step 2 — calculate the fixed cost',
            p: [
              'Once the variable cost per unit is known, substitute back into either the high or low data point.',
            ],
            formula: 'Fixed cost = Total cost at that level − (Variable cost per unit × Units at that level)',
          },
          {
            h: 'Step 3 — the cost equation and prediction',
            p: [
              'With both elements found: **Total cost = Fixed cost + (Variable cost per unit × units)**.',
              'Use this equation to estimate costs at ANY activity level (within the relevant range).',
            ],
          },
          {
            h: 'Worked example',
            p: [
              'Set the two data points one above the other and subtract, so the arithmetic stays visible and a transposition is easy to spot.',
              'Once the cost equation is built, test it against the other data point — substituting the low activity level should reproduce the low total cost exactly.',
            ],
            example: {
              title: 'High-low: find fixed and variable elements',
              rows: [
                ['Period', 'Units produced', 'Total cost'],
                ['Highest', '5,000', '£22,000'],
                ['Lowest', '2,000', '£13,000'],
                ['Difference', '3,000', '£9,000'],
                ['VC/unit = £9,000 ÷ 3,000', '', '= £3 per unit'],
                ['FC = £22,000 − (£3 × 5,000)', '', '= £7,000'],
                ['Cost at 4,000 units = £7,000 + (£3 × 4,000)', '', '= £19,000'],
              ],
            },
            callout: { kind: 'warning', text: '**Exam trap:** Always check that the question has not included an abnormal or exceptional data point. If a month\'s cost is clearly an outlier (e.g. due to a one-off repair), it should be excluded before applying high-low.' },
          },
        ],
        check: [
          {
            q: 'The high-low method is used to split which type of cost?',
            opts: ['Fixed costs', 'Variable costs', 'Semi-variable costs', 'Direct costs'],
            ans: 2,
            exp: 'Semi-variable costs have both a fixed and variable element. The high-low method separates the two so each can be planned and budgeted independently.',
          },
          {
            q: 'Highest activity: 8,000 units, cost £38,000. Lowest: 3,000 units, cost £23,000. Variable cost per unit = ?',
            opts: ['£3.00', '£4.75', '£7.67', '£2.00'],
            ans: 0,
            exp: 'VC/unit = (£38,000 − £23,000) ÷ (8,000 − 3,000) = £15,000 ÷ 5,000 = £3 per unit.',
          },
          {
            q: 'Using the high point (8,000 units, cost £38,000) and VC = £3/unit, what is the fixed cost?',
            opts: ['£14,000', '£24,000', '£38,000', '£11,000'],
            ans: 0,
            exp: 'Fixed cost = Total cost − (VC/unit × units) = £38,000 − (£3 × 8,000) = £38,000 − £24,000 = £14,000.',
          },
          {
            q: 'Fixed cost = £14,000 and VC = £3/unit. Total cost at 6,000 units = ?',
            opts: ['£32,000', '£18,000', '£44,000', '£28,000'],
            ans: 0,
            exp: 'Total cost = Fixed + (VC × units) = £14,000 + (£3 × 6,000) = £14,000 + £18,000 = £32,000.',
          },
          {
            q: 'The high-low method assumes that the variable cost per unit is:',
            opts: ['Decreasing as volume rises', 'Constant at all activity levels', 'Only relevant at the break-even point', 'Calculated using an average of all periods'],
            ans: 1,
            exp: 'The high-low method assumes a linear cost function — variable cost per unit is constant across the relevant range of activity.',
          },
          {
            q: 'Which data points does the high-low method use?',
            opts: ['The most recent and the oldest', 'The highest and lowest activity levels', 'The average of all periods', 'The two periods with the largest cost difference'],
            ans: 1,
            exp: 'The high-low method selects the periods with the HIGHEST and LOWEST levels of activity (not cost), and uses those two data points to calculate the variable rate.',
          },
          {
            q: 'A key limitation of the high-low method is that:',
            opts: ['It requires complex calculations', 'It uses only two data points and may be distorted by outliers', 'It cannot be used for fixed costs', 'It requires activity to be measured in units only'],
            ans: 1,
            exp: 'High-low ignores all data points except two extremes. If either extreme is abnormal (an outlier), the resulting cost split will be inaccurate.',
          },
        ],
      },
      {
        id: 'L-poc-11',
        title: 'Budget variances — calculating and interpreting',
        icon: '📉',
        skills: ['poc-budget'],
        cards: [
          {
            h: 'What is a variance?',
            p: [
              'A variance is the difference between actual performance and what was budgeted. Managers use variance analysis to identify where performance has deviated from plan and investigate why.',
              'A **favourable (F)** variance improves profit; an **adverse (A)** variance reduces profit.',
            ],
            formula: 'Variance = Budget − Actual (for costs), or Actual − Budget (for revenue)·Favourable (F): actual costs < budget, or actual revenue > budget·Adverse (A): actual costs > budget, or actual revenue < budget',
          },
          {
            h: 'Direct material variances',
            p: [
              'The total direct material variance compares the actual cost of materials used with the standard (budgeted) cost of actual production. It can be broken into a **price variance** (paying more or less than standard) and a **usage variance** (using more or less than standard).',
            ],
            example: {
              title: 'Material variance example',
              rows: [
                ['Standard material cost', '2 kg × £5 per kg = £10 per unit'],
                ['Actual material cost', '2.2 kg × £4.80 per kg = £10.56 per unit'],
                ['Material price variance', '(£5.00 − £4.80) × 2.2 kg = £0.44 F per unit'],
                ['Material usage variance', '(2.0 − 2.2) kg × £5.00 = £1.00 A per unit'],
                ['Total material variance', '£0.56 A per unit'],
              ],
            },
          },
          {
            h: 'Direct labour variances',
            p: [
              'Similar to materials, the labour variance splits into a **rate variance** (paid more or less per hour than standard) and an **efficiency variance** (took more or fewer hours than standard).',
            ],
            example: {
              title: 'Labour variance example',
              rows: [
                ['Standard labour cost', '3 hrs × £12/hr = £36 per unit'],
                ['Actual labour cost', '3.5 hrs × £11.50/hr = £40.25 per unit'],
                ['Labour rate variance', '(£12.00 − £11.50) × 3.5 hrs = £1.75 F'],
                ['Labour efficiency variance', '(3.0 − 3.5) hrs × £12.00 = £6.00 A'],
                ['Total labour variance', '£4.25 A per unit'],
              ],
            },
          },
          {
            h: 'Fixed overhead and sales variances',
            p: [
              'The fixed overhead variance compares absorbed overheads with actual overhead. A sales price variance shows whether the actual selling price differed from budget. A sales volume variance shows the profit impact of selling more or fewer units than budgeted.',
            ],
            callout: { kind: 'key', text: 'For the exam, always state whether each variance is Favourable (F) or Adverse (A) — a correct figure without the label loses marks.' },
          },
          {
            h: 'Complete variance statement',
            p: [
              'Read a variance statement line by line and label each one before interpreting anything. **Favourable** means better than budget — higher revenue or lower cost; **adverse** means worse.',
              'The direction is not the same on both sides: costs above budget are adverse, but revenue above budget is favourable. Reading a cost variance as though it were revenue is the classic error here.',
              'A variance is a prompt to investigate, not a verdict. A favourable materials variance may simply mean cheaper, poorer material was bought — which shows up later as waste.',
            ],
            example: {
              title: 'Budgeted output 1,000 units · Actual output 1,000 units',
              rows: [
                ['Item', 'Budget £', 'Actual £', 'Variance'],
                ['Sales revenue', '50,000', '52,000', '£2,000 F'],
                ['Direct materials', '18,000', '19,200', '£1,200 A'],
                ['Direct labour', '12,000', '11,400', '£600 F'],
                ['Fixed overheads', '8,000', '8,500', '£500 A'],
                ['Total costs', '38,000', '39,100', '£1,100 A'],
                ['Profit', '12,000', '12,900', '£900 F'],
              ],
            },
          },
          {
            h: 'Interpreting variances',
            p: [
              'Variances do not just need calculating — they need explaining. Possible causes: price changes, efficiency improvements, production problems, measurement errors, or an unrealistic budget. Managers investigate significant variances (materiality).',
            ],
            examtrap: 'A favourable variance is not always good news. Buying cheaper materials might cause an adverse usage variance if quality is poor. Always consider the knock-on effects.',
          },
        ],
        check: [
          {
            q: 'Actual material cost is £18,000. Budgeted material cost for actual production is £16,500. The variance is:',
            opts: ['£1,500 Favourable', '£1,500 Adverse', '£34,500 Adverse', '£1,500 — cannot tell without more information'],
            ans: 1,
            exp: 'Actual cost (£18,000) > Budget (£16,500) for a cost — this is Adverse. Variance = £16,500 − £18,000 = −£1,500 A.',
          },
          {
            q: 'Actual revenue is £92,000. Budgeted revenue was £85,000. The sales variance is:',
            opts: ['£7,000 Adverse', '£7,000 Favourable', '£177,000 Favourable', '£7,000 — cannot tell'],
            ans: 1,
            exp: 'Actual revenue (£92,000) > Budget (£85,000) — more revenue than planned is Favourable for profit.',
          },
          {
            q: 'Standard material: 4 kg @ £6.00. Actual: 4.5 kg @ £5.50. The material usage variance is:',
            opts: ['£2.00 Adverse', '£3.00 Adverse', '£2.25 Adverse', '£3.00 Favourable'],
            ans: 1,
            exp: 'Usage variance = (Standard qty − Actual qty) × Standard price = (4 − 4.5) × £6.00 = −0.5 × £6.00 = −£3.00. Adverse (used more than standard).',
          },
          {
            q: 'Which of the following would cause a favourable labour rate variance?',
            opts: ['Employees working faster than standard', 'Paying employees a lower hourly rate than standard', 'Using more hours than standard', 'Paying employees a higher rate than standard'],
            ans: 1,
            exp: 'A favourable rate variance means the actual hourly rate paid was lower than the standard rate. More hours used would be an adverse efficiency variance.',
          },
          {
            q: 'The fixed overhead absorbed is £42,000. Actual fixed overhead incurred is £45,000. The variance is:',
            opts: ['£3,000 Favourable (over-absorbed)', '£3,000 Adverse (under-absorbed)', '£87,000', '£3,000 — cannot tell without knowing activity levels'],
            ans: 1,
            exp: 'Absorbed (£42,000) < Actual (£45,000) means under-absorption of £3,000. Under-absorption is adverse — not enough overhead was charged to products.',
          },
        ],
      },
      {
        id: 'L-poc-12',
        title: 'Decision-making with cost information',
        icon: '⚖️',
        skills: ['poc-cvp', 'poc-behaviour'],
        cards: [
          {
            h: 'Relevant costs and decision-making',
            p: [
              'For decision-making, only **RELEVANT** costs matter. A relevant cost is a future, incremental, cash cost that changes as a direct result of the decision. Sunk costs (already spent), committed costs, and non-cash items (depreciation) are NOT relevant to the decision.',
            ],
            split: {
              left: {
                title: 'Relevant costs',
                items: ['Future costs that change with the decision', 'Incremental variable costs', 'Opportunity costs (benefits foregone)'],
              },
              right: {
                title: 'NOT relevant',
                items: ['Sunk costs (already spent)', 'Depreciation (non-cash)', 'Fixed costs that do not change', 'Committed costs'],
              },
            },
          },
          {
            h: 'Accepting a special order',
            p: [
              'A special order is a one-off request, often below normal selling price. Accept if the contribution is positive (revenue exceeds variable costs) AND spare capacity exists. Fixed costs are usually irrelevant as they are already being paid.',
            ],
            example: {
              title: 'Special order decision',
              rows: [
                ['Normal selling price', '£20 per unit'],
                ['Special order price', '£14 per unit'],
                ['Variable cost per unit', '£11'],
                ['Contribution at special price', '£3 per unit (Accept — positive contribution)'],
                ['Caveat', 'Only if spare capacity exists; beware of cannibalisation'],
              ],
            },
          },
          {
            h: 'Make-or-buy decisions',
            p: [
              'Should the business make a component internally or buy it from an outside supplier? Compare the relevant (variable) cost of making with the purchase price. If the purchase price is lower than the marginal (variable) cost of making, buy it — unless making uses a scarce resource needed elsewhere.',
            ],
            formula: 'Relevant cost of making = Variable cost per unit (exclude fixed costs already committed)·Buy if: Purchase price < Variable cost of making·Also consider: quality, reliability, strategic importance',
          },
          {
            h: 'Limiting factors',
            p: [
              'When a resource is in short supply (scarce), the business must decide how to allocate it to maximise profit. Rank products by **contribution per unit of limiting factor** (not by total contribution).',
            ],
            example: {
              title: 'Limiting factor ranking',
              rows: [
                ['Product', 'Contribution/unit', 'Machine hrs/unit', 'Contribution per machine hr'],
                ['A', '£12', '3 hrs', '£4.00'],
                ['B', '£9', '2 hrs', '£4.50'],
                ['Ranking', '', '', 'B first (£4.50), then A'],
              ],
            },
          },
          {
            h: 'Shut-down decisions',
            p: [
              'Should a product line or department be closed? Compare the contribution it makes with the **avoidable** fixed costs. If contribution > avoidable fixed costs, keep it open — even if it appears to be making a loss after shared fixed cost allocation.',
            ],
            callout: { kind: 'warning', text: 'Allocated (shared) fixed costs do NOT disappear if a product line closes — they get reallocated. Only avoidable fixed costs are relevant to a shut-down decision.' },
            examtrap: 'A product showing a net loss may still be worth keeping if it has a positive contribution that covers avoidable fixed costs. The decision is about contribution, not profit after fixed cost allocation.',
          },
        ],
        check: [
          {
            q: 'A company has spare capacity. A customer offers £16 per unit for a special order. Variable cost is £13. The fixed overhead absorption rate is £6. Should the company accept?',
            opts: ['No — selling price is below total cost', 'Yes — contribution of £3 per unit is positive', 'No — contribution is negative', 'Yes — but only if the customer pays upfront'],
            ans: 1,
            exp: 'Contribution = £16 − £13 = +£3. With spare capacity, fixed costs are irrelevant (already covered). Accept.',
          },
          {
            q: 'Variable cost of making a component: £8. Purchase price from supplier: £7. There is no spare capacity issue. The correct decision is:',
            opts: ['Make — always better to keep production in-house', 'Buy — purchase price (£7) is less than variable cost of making (£8)', 'Make — fixed costs need to be covered', 'Cannot decide without knowing the selling price'],
            ans: 1,
            exp: 'The relevant cost of making is £8 (variable). Buying at £7 saves £1 per unit. Buy from the supplier.',
          },
          {
            q: 'A product has a contribution of £6 per unit and requires 2 machine hours per unit. Another product has a contribution of £8 per unit and requires 4 machine hours. Machine time is the limiting factor. Which product should be prioritised?',
            opts: ['Product 2 — higher contribution per unit', 'Product 1 — higher contribution per machine hour (£3 vs £2)', 'Product 2 — higher total contribution', 'Neither — both are equally attractive'],
            ans: 1,
            exp: 'With a limiting factor, rank by contribution per unit of the scarce resource. Product 1: £6÷2 = £3/hr. Product 2: £8÷4 = £2/hr. Prioritise Product 1.',
          },
          {
            q: 'Sunk costs are:',
            opts: ['Future costs that change with the decision', 'Already spent costs that cannot be recovered', 'Costs allocated from shared overheads', 'Variable costs in a special order'],
            ans: 1,
            exp: 'Sunk costs are past costs that have already been incurred and cannot be recovered — they are irrelevant to future decisions.',
          },
          {
            q: 'A department has a contribution of £25,000 and is allocated £30,000 of fixed overheads (of which £8,000 are avoidable). Should it close?',
            opts: ['Yes — it is making a net loss of £5,000', 'No — contribution (£25,000) exceeds avoidable fixed costs (£8,000)', 'Yes — it does not cover its fixed costs', 'Cannot decide — need more information'],
            ans: 1,
            exp: 'Only avoidable costs are relevant. Contribution £25,000 > avoidable fixed costs £8,000. Closing would reduce profit by £25,000 − £8,000 = £17,000. Keep it open.',
          },
        ],
      },

      {
        id: 'L-poc-13',
        title: 'Marginal vs Absorption Costing',
        icon: '⚖️',
        skills: ['poc-behaviour', 'poc-budget'],
        cards: [
          {
            h: 'Two approaches to product costing',
            p: [
              '**Marginal costing** and **absorption costing** are the two main methods for assigning costs to products. They produce the same total profit over the lifetime of a business, but can give different profit figures in a single period when inventory levels change.',
              'The key difference: how each method treats **fixed production overheads**.',
            ],
          },
          {
            h: 'Marginal costing',
            p: [
              'Under marginal costing, only **variable production costs** are included in the unit cost: direct materials, direct labour, and variable overheads.',
              '**Fixed production overheads** are treated as a **period cost** — charged in full to the income statement in the period they are incurred, regardless of how many units are produced or sold. Fixed costs never enter inventory under marginal costing.',
            ],
            formula: 'Marginal unit cost = Direct materials + Direct labour + Variable overhead·Contribution = Selling price − Marginal cost·Fixed overheads → income statement in full (period cost)',
          },
          {
            h: 'Absorption costing',
            p: [
              'Under absorption costing, **all production costs** are absorbed into the unit cost — including fixed production overheads. The fixed overhead absorbed per unit is calculated using the **overhead absorption rate (OAR)**:',
            ],
            formula: 'OAR = Budgeted fixed overhead ÷ Budgeted activity level (units or hours)·Absorption unit cost = Variable cost + (OAR × standard hours per unit)·Fixed overheads enter inventory if closing stock > opening stock',
            example: {
              title: 'Absorption vs marginal unit cost',
              rows: [
                ['Cost element', 'Marginal costing', 'Absorption costing'],
                ['Direct materials £10', '£10', '£10'],
                ['Direct labour £8', '£8', '£8'],
                ['Variable overhead £4', '£4', '£4'],
                ['Fixed overhead absorbed £6', '—', '£6'],
                ['Total unit cost', '£22', '£28'],
              ],
            },
          },
          {
            h: 'Profit difference between the two methods',
            p: [
              'When **closing inventory > opening inventory** (more produced than sold): absorption costing gives a **higher profit** — some fixed overheads are carried forward in inventory rather than charged to the income statement.',
              'When **closing inventory < opening inventory** (more sold than produced): marginal costing gives a **higher profit** — absorption costing charges more fixed overhead to the income statement (releasing from prior periods\' inventory).',
              'When **closing = opening inventory**: both methods give **identical profit**.',
            ],
            formula: 'Difference in profit = Change in inventory units × Fixed overhead per unit (OAR)',
          },
          {
            h: 'When to use each method',
            p: [
              '**Marginal costing** is preferred for short-term decisions: contribution analysis, break-even, special orders, and limiting factor problems. It clearly shows the impact of volume changes without distortion from fixed cost absorption.',
              '**Absorption costing** is required for **external financial reporting** under UK GAAP (FRS 102) and IFRS — inventory must include a fair share of fixed production overhead. It is also used in standard costing at Level 3.',
            ],
          },
        ],
        check: [
          {
            q: 'Under marginal costing, how are fixed production overheads treated?',
            opts: ['Included in the unit cost and carried forward in closing inventory', 'Charged in full as a period cost in the income statement', 'Excluded from the income statement entirely', 'Added to the OAR for the next period only'],
            ans: 1,
            exp: 'Under marginal costing, fixed production overheads are period costs — charged in full to the income statement when incurred, regardless of production or sales volume. They are never held in inventory.',
          },
          {
            q: 'Under absorption costing, which costs are included in the unit product cost?',
            opts: ['Variable production costs only', 'Variable production costs plus absorbed fixed production overhead', 'All costs including selling, distribution and administration', 'Direct materials and direct labour only'],
            ans: 1,
            exp: 'Absorption costing includes all production costs in the unit cost: direct materials + direct labour + variable overheads + a share of fixed production overhead (calculated using the OAR).',
          },
          {
            q: 'In a period where closing inventory exceeds opening inventory, which costing method gives the higher reported profit?',
            opts: ['Marginal costing', 'Absorption costing', 'Both give the same profit', 'It depends on the selling price per unit'],
            ans: 1,
            exp: 'When closing inventory > opening inventory, absorption costing carries forward some fixed overhead in inventory (not charged to the income statement). This gives a higher profit than marginal costing in that period.',
          },
          {
            q: 'A product has a variable production cost of £18 per unit and absorbed fixed overhead of £6 per unit. Under marginal costing, the inventory value per unit is:',
            opts: ['£24', '£18', '£6', '£12'],
            ans: 1,
            exp: 'Under marginal costing, inventory is valued at variable production cost only: £18 per unit. The £6 fixed overhead is charged as a period cost — it is not included in inventory.',
          },
          {
            q: 'Which financial reporting standard requires absorption costing for inventory valuation?',
            opts: ['Neither — both methods are acceptable for external reporting', 'Marginal costing only, as it separates fixed costs clearly', 'UK GAAP (FRS 102) and IFRS — inventory must include a share of fixed production overhead', 'Only IFRS — UK GAAP allows marginal costing for listed companies'],
            ans: 2,
            exp: 'Both UK GAAP (FRS 102) and IFRS require that inventory includes a fair share of fixed production overhead — i.e. absorption costing. Marginal costing is fine for internal management reports but not for statutory accounts.',
          },
        ],
      },
      {
        id: 'L-poc-14',
        title: 'Bridge to Level 3 — Management Accounting',
        icon: '🌉',
        skills: ['poc-cvp', 'poc-budget'],
        l3Bridge: true,
        cards: [
          {
            h: 'Management Accounting Techniques (MATS) at Level 3',
            p: [
              'MATS is the direct Level 3 extension of Principles of Costing. It covers **standard costing and variance analysis**, activity-based costing, advanced budgeting techniques, and performance measurement ratios.',
              'Every topic from POC underpins MATS: cost behaviour, overhead absorption, CVP analysis, contribution, and budget preparation. At Level 3, these are assumed — you apply them in more complex, integrated scenarios.',
            ],
          },
          {
            h: 'Standard costing at Level 3',
            p: [
              'A **standard cost** is a predetermined expected cost for each element of production. The **standard cost card** sets out: standard material cost (standard price × standard quantity per unit), standard labour cost (standard rate × standard hours per unit), and standard overhead cost (OAR × standard hours).',
              'Standards are set from past performance, engineering specifications, and market prices. They provide a benchmark against which actual costs are compared.',
            ],
            example: {
              title: 'Standard cost card (per unit)',
              rows: [
                ['Element', 'Standard', 'Cost'],
                ['Materials', '5 kg × £4/kg', '£20'],
                ['Labour', '2 hrs × £12/hr', '£24'],
                ['Variable overhead', '2 hrs × £3/hr', '£6'],
                ['Fixed overhead', '2 hrs × £5/hr', '£10'],
                ['Standard cost per unit', '', '£60'],
              ],
            },
          },
          {
            h: 'Variance analysis at Level 3',
            p: [
              'A **variance** is the difference between the actual cost and the standard cost. **Favourable (F)**: actual cost < standard cost (good news — cost less than expected). **Adverse (A)**: actual cost > standard cost (bad news — cost more than expected).',
              'At Level 3, you calculate: materials price variance and usage variance; labour rate variance and efficiency variance; and overhead variances. Each variance identifies a specific aspect of performance and points management to areas for investigation.',
            ],
            formula: 'Materials price variance = (Standard price − Actual price) × Actual quantity purchased·Materials usage variance = (Standard quantity for actual output − Actual quantity used) × Standard price·Labour rate variance = (Standard rate − Actual rate) × Actual hours paid·Labour efficiency variance = (Standard hours for actual output − Actual hours worked) × Standard rate',
          },
          {
            h: 'Flexible budgeting at Level 3',
            p: [
              'A **fixed budget** is set at the start of the period and does not change with volume. A **flexible budget** is adjusted to the actual output level achieved — variable costs are scaled proportionally, fixed costs remain unchanged.',
              'Comparing actual results to the **flexed budget** gives meaningful variances. Comparing to the original fixed budget when output has changed is misleading: the volume difference alone could create apparent variances that are not about efficiency at all.',
            ],
            formula: 'Flexed budget variable cost = (Actual units ÷ Budgeted units) × Budgeted variable cost·Flexed budget fixed cost = Budgeted fixed cost (unchanged)·Volume variance = (Actual units − Budgeted units) × Standard contribution per unit',
          },
          {
            h: 'How POC prepares you for MATS',
            p: [
              'OAR calculations, overhead absorption and over/under absorption, marginal vs absorption costing, CVP analysis (contribution, break-even, margin of safety), budget preparation, and limiting factors from POC all carry directly into MATS.',
              'At Level 3, you add variance analysis and flexible budgeting on top of this foundation. Students who mastered POC find MATS is a natural progression. The hardest new skill — variance analysis — is just comparing actual to standard using the same arithmetic you have been using throughout Level 2.',
            ],
          },
        ],
        check: [
          {
            q: 'A standard cost card sets out:',
            opts: ['The actual cost of production for the previous period', 'The maximum cost allowed under perfect conditions', 'The predetermined expected cost per unit for each cost element', 'The selling price and target profit margin per unit'],
            ans: 2,
            exp: 'A standard cost card shows the expected (standard) cost per unit for materials, labour, and overheads. It is the benchmark against which actual costs are compared to calculate variances.',
          },
          {
            q: 'An adverse materials usage variance means:',
            opts: ['The business paid more per kg than the standard price', 'The business used more kg of material per unit than the standard allowed', 'The business produced fewer units than budgeted', 'The actual fixed overhead was higher than the absorbed amount'],
            ans: 1,
            exp: 'An adverse usage variance arises when more material was used than the standard quantity for the actual output. This adds to cost (adverse). It could indicate wastage, poor quality material, or inefficient processes.',
          },
          {
            q: 'A flexible budget differs from a fixed budget because it:',
            opts: ['Has no fixed costs included in the calculation', 'Is prepared using marginal costing only, ignoring fixed overheads', 'Is adjusted to the actual level of activity achieved before comparing to actual results', 'Is set at the beginning of the year and reviewed monthly'],
            ans: 2,
            exp: 'A flexible budget re-calculates the expected costs at the actual output level. Variable costs are scaled to actual output; fixed costs stay the same. This makes the variance analysis meaningful — comparing like with like.',
          },
          {
            q: 'Budgeted production is 1,000 units with fixed overheads £20,000 and variable cost £15 per unit. Actual production is 1,200 units. The flexed budget total cost is:',
            opts: ['£35,000', '£38,000', '£42,000', '£20,000'],
            ans: 1,
            exp: 'Flexed variable cost = 1,200 × £15 = £18,000. Fixed cost unchanged = £20,000. Total flexed budget = £18,000 + £20,000 = £38,000.',
          },
          {
            q: 'Which Level 3 unit is the direct extension of Principles of Costing?',
            opts: ['Financial Accounting: Preparing Financial Statements (FAPS)', 'Business Awareness (BUAW)', 'Tax Processes for Businesses (TPFB)', 'Management Accounting Techniques (MATS)'],
            ans: 3,
            exp: 'Management Accounting Techniques (MATS) directly extends POC: standard costing, variance analysis, flexible budgeting, and performance measurement all build on the overhead absorption, CVP, and budgeting skills developed in POC.',
          },
        ],
      },
    ],
  },
  {
    unit: 'besy',
    level: 2,
    title: 'The Business Environment',
    lessons: [
      /* ── FOUNDATIONS (1–4) ──────────────────────────────────────────────
         BESY used to open on professional ethics, leaving the legal system,
         contract law and business types — Tasks 1 and 6 of the synoptic,
         worth 17 marks between them — with no lesson at all. */
      {
        id: 'L-besy-1',
        title: 'The English legal system',
        icon: '⚖️',
        skills: ['besy-law'],
        cards: [
          {
            h: 'Why an accountant studies law',
            p: [
              'You will spend your working life inside a framework of rules you did not write: contracts with customers and suppliers, employment law, consumer protection, data protection, company law.',
              'You are not being trained as a lawyer. You are being trained to **recognise when something has legal consequences** — and to know when to stop and take advice.',
            ],
          },
          {
            h: 'Two sources of law',
            p: [
              'English law is not written down in one place. It comes from Parliament and from the accumulated decisions of judges, and both are binding.',
              'Where the two conflict, statute wins. Parliament can pass an Act that overturns a decided case; a court cannot overturn an Act.',
            ],
            split: {
              left: { title: 'Case law (common law)', items: [
                'Made by **judges** deciding individual cases',
                'Developed over centuries through precedent',
                'Emerged after the Norman Conquest of 1066',
                'A lower court must follow a higher court\'s decision',
              ] },
              right: { title: 'Statute law', items: [
                'Made by **Parliament** through legislation',
                'Acts of Parliament (primary legislation)',
                'Statutory instruments (delegated legislation)',
                'Overrides case law wherever the two conflict',
              ] },
            },
            callout: { kind: 'key', text: 'Where statute and case law conflict, statute wins. The courts cannot question the validity of an Act of Parliament.' },
          },
          {
            h: 'Delegated legislation',
            p: [
              'Parliament cannot pass a full Act every time a detail needs updating — a fee level, a threshold, a technical schedule.',
              '**Delegated legislation** lets a minister or body make those changes, provided the original Act granted the power. It is law, and it binds, but it did not go through the full parliamentary process.',
            ],
          },
          {
            h: 'Criminal law and civil law',
            p: [
              'The row that carries most marks is the **standard of proof**. Criminal cases must be proved beyond reasonable doubt; civil cases only on the balance of probabilities.',
              'That difference explains why the same facts can fail as a prosecution and still succeed as a civil claim — the claimant has a lower bar to clear.',
              'Notice the language too. Criminal cases are *prosecuted* and end in *punishment*; civil cases are *sued* and end in a *remedy*.',
            ],
            table: {
              headers: ['', 'Criminal law', 'Civil law'],
              rows: [
                ['Concerns', 'Offences against the state', 'Disputes between private parties'],
                ['Brought by', 'The state (prosecution)', 'The wronged party (claimant)'],
                ['Standard of proof', 'Beyond reasonable doubt', 'On the balance of probabilities'],
                ['Outcome', 'Punishment — fine, imprisonment', 'Remedy — damages, injunction'],
                ['Example', 'Theft, fraud, bribery', 'Breach of contract, negligence'],
              ],
            },
            examtrap: 'Criminal law is not "serious law" and civil law is not "minor law". The distinction is who brings the action and what the court is being asked to do — punish, or put right.',
          },
          {
            h: 'Classifying a situation',
            p: [
              'A single set of facts can give rise to both. If an employee steals £40,000 from their employer, the state may prosecute them for theft (criminal), and the employer may separately sue to recover the money (civil).',
              'The two proceed independently, with different standards of proof — which is why someone can be acquitted in a criminal court and still lose the civil case.',
            ],
            callout: { kind: 'tip', text: 'Ask two questions: who is bringing this, and what do they want? The state seeking punishment is criminal. A private party seeking compensation is civil.' },
          },
        ],
        check: [
          { q: 'Where statute law and case law conflict, which prevails?', opts: [
              'Statute law, because the courts cannot override an Act of Parliament',
              'Case law, because it reflects centuries of judicial reasoning',
              'Whichever came later in time takes precedence over the other',
              'Neither — the conflict is resolved by a referendum'],
            ans: 0, exp: 'Parliament is sovereign. The courts interpret statute but cannot question the validity of an Act.' },
          { type: 'truefalse', q: 'Identify whether the following statements are true or false.',
            statements: [
              { text: 'Common law is developed by judges deciding individual cases.', answer: true },
              { text: 'Criminal cases are brought by the wronged private individual.', answer: false },
              { text: 'The civil standard of proof is the balance of probabilities.', answer: true },
              { text: 'Delegated legislation allows detail to be changed without a new Act.', answer: true },
            ],
            exp: 'Criminal proceedings are brought by the state. A private individual brings a civil claim.' },
          { q: 'A supplier sues a customer for an unpaid invoice. This is:', opts: [
              'A civil matter, with the supplier seeking a remedy',
              'A criminal matter, because non-payment is theft',
              'A criminal matter, because the state has an interest in trade',
              'Neither civil nor criminal — it is an administrative matter'],
            ans: 0, exp: 'A dispute between two private parties, with the claimant seeking compensation, is civil. Non-payment of a debt is not a criminal offence.' },
        ],
      },
      {
        id: 'L-besy-2',
        title: 'Contract law essentials',
        icon: '📜',
        skills: ['besy-law'],
        cards: [
          {
            h: 'Contracts are everywhere',
            p: [
              'Every sale, purchase, employment relationship and supply arrangement your business enters is a contract. Most are never written down and none the less bind.',
              'A **contract** is an agreement the law will enforce. What separates it from a mere promise is the presence of four essential elements.',
            ],
          },
          {
            h: 'The four essentials',
            p: [
              '**Offer** — a definite statement of the terms on which one party is willing to contract.',
              '**Acceptance** — unqualified agreement to those exact terms. Introduce a new term and you have made a counter-offer, not an acceptance.',
              '**Consideration** — each party must give something of value. A promise for nothing in return is not enforceable.',
              '**Intention to create legal relations** — presumed in business dealings; presumed absent in purely social or domestic arrangements.',
            ],
            formula: 'Offer + Acceptance + Consideration + Intention = a binding contract',
          },
          {
            h: 'Offer or invitation to treat?',
            p: [
              'This is the single most tested point in the topic.',
              'An **invitation to treat** is an invitation for someone else to make an offer. Goods displayed in a shop or advertised at a price are invitations to treat — **not** offers.',
              'The customer makes the offer at the till. The retailer may accept it or decline it. That is why a shop is not obliged to sell you an item that was mispriced on the shelf.',
            ],
            examtrap: 'Goods on display, price lists, catalogues and most advertisements are invitations to treat. Calling any of them an "offer" is the classic wrong answer.',
          },
          {
            h: 'Express and implied terms',
            p: [
              'A contract contains more than the parties wrote down. Terms implied by statute apply whether or not anyone mentioned them, and cannot usually be excluded in a consumer contract.',
              'That is the practical point for a business: agreeing nothing about quality does not mean there is no quality obligation — the legislation supplies one.',
            ],
            split: {
              left: { title: 'Express terms', items: [
                'Actually stated by the parties',
                'Written into the contract or agreed verbally',
                'Price, delivery date, quantity, specification',
                'What the parties consciously negotiated',
              ] },
              right: { title: 'Implied terms', items: [
                'Not stated, but read into the contract',
                'Implied by statute — e.g. the Consumer Rights Act',
                'Implied by custom in a particular trade',
                'Implied by the courts to give the contract effect',
              ] },
            },
          },
          {
            h: 'Working out whether a contract exists',
            p: [
              'Test the four elements in order: offer, acceptance, consideration, and intention to create legal relations. If any one is missing there is no contract.',
              'Acceptance must be **unqualified**. A reply that changes any term is a counter-offer, which destroys the original offer rather than accepting it.',
            ],
            worked: {
              title: 'Applying the four essentials',
              problem: 'A wholesaler emails a retailer: "We can supply 200 units at £15 each, delivery next Friday." The retailer replies: "Agreed, but we need delivery on Wednesday." The wholesaler does not respond. Is there a contract?',
              steps: [
                { do: 'Identify the **offer**: the wholesaler\'s email states definite terms — 200 units, £15 each, Friday delivery.', why: 'It is specific enough to be accepted as it stands, so it is an offer rather than an invitation to treat.' },
                { do: 'Examine the reply. The retailer has changed a term — Wednesday instead of Friday.', why: 'Acceptance must be **unqualified**. Any change to the terms is not acceptance.' },
                { do: 'Classify the reply as a **counter-offer**, which destroys the original offer.', why: 'Once a counter-offer is made, the original offer is no longer open for acceptance — a point students routinely miss.' },
                { do: 'The wholesaler has not responded, so the counter-offer has not been accepted. **There is no contract.**', why: 'Silence is not acceptance. Without acceptance, no agreement has been formed.' },
              ],
              answer: 'No contract — the reply was a counter-offer, and it was never accepted',
              tryIt: {
                q: 'A contract needs four essential elements. If offer, acceptance and consideration are all present but intention to create legal relations is absent, how many of the four essentials are satisfied?',
                answer: 3, unit: '',
                hint: 'Count the elements that are present. All four are needed for a binding contract.',
                exp: 'Three of four. That is not enough — all four essentials must be present, which is why purely social arrangements are generally unenforceable.',
              },
            },
          },
          {
            h: 'When a contract is broken',
            p: [
              '**Breach of contract** occurs when a party fails to perform an obligation without lawful excuse.',
              'The innocent party may claim **damages** — money to put them in the position they would have been in had the contract been performed.',
              'Where the breach goes to the heart of the contract, they may also **terminate** and treat themselves as released from their own obligations.',
            ],
            callout: { kind: 'warning', text: 'Damages compensate; they do not punish. The aim is to put the innocent party where they would have been, not to penalise the party in breach.' },
          },
        ],
        check: [
          { q: 'Goods displayed in a shop window with a price ticket are:', opts: [
              'An invitation to treat, inviting the customer to make an offer',
              'An offer that the customer accepts by taking the goods to the till',
              'A binding contract as soon as the customer sees the display',
              'An express term of a contract already in existence'],
            ans: 0, exp: 'The display invites offers. The customer offers at the till and the retailer may accept or decline — which is why a mispriced item need not be sold.' },
          { type: 'truefalse', q: 'Identify whether the following statements about contract law are true or false.',
            statements: [
              { text: 'Consideration means each party must give something of value.', answer: true },
              { text: 'A reply that changes a term of the offer is a valid acceptance.', answer: false },
              { text: 'Intention to create legal relations is presumed in business agreements.', answer: true },
              { text: 'A contract must be in writing to be enforceable.', answer: false },
            ],
            exp: 'Changing a term creates a counter-offer, which destroys the original offer. Most contracts need no writing at all.' },
          { type: 'gapfill', q: 'Complete the statement about contract formation.',
            template: 'An agreement becomes binding when offer, acceptance, consideration and {0} are all present; goods on display are an invitation to {1}.',
            gaps: [
              { options: ['intention to create legal relations', 'a written document', 'a witness signature', 'legal advice'], answer: 0 },
              { options: ['treat', 'accept', 'terminate', 'perform'], answer: 0 },
            ],
            exp: 'All four essentials are required. Goods on display invite the customer to make an offer.' },
          { q: 'A party breaches a contract. The usual remedy available to the innocent party is:', opts: [
              'Damages, to put them in the position performance would have achieved',
              'A criminal prosecution brought by the state against the other party',
              'An automatic renewal of the contract on the same terms',
              'A requirement that both parties renegotiate the agreement'],
            ans: 0, exp: 'Breach of contract is a civil matter and the primary remedy is compensatory damages. It is not a criminal offence.' },
        ],
      },
      {
        id: 'L-besy-3',
        title: 'Types of business',
        icon: '🏢',
        skills: ['besy-structure'],
        cards: [
          {
            h: 'The question that decides everything',
            p: [
              'When you meet any business structure, ask one question first: **is the business a separate legal person from its owners?**',
              'If yes, the business can own property, enter contracts and be sued in its own name — and the owners\' liability is limited.',
              'If no, the owner and the business are legally the same thing, and the owner is personally liable for everything the business owes.',
            ],
            callout: { kind: 'key', text: 'Separate legal personality is the dividing line. Everything else — filing requirements, taxation, how easily ownership transfers — follows from it.' },
          },
          {
            h: 'The four main structures',
            p: [
              'Two columns do most of the work. **Separate legal personality** determines whether the business can own property and be sued in its own name, and **liability** determines whether the owner\'s personal assets are at risk.',
              'The two travel together: separate legal personality is what makes limited liability possible, because the debts belong to the company and not to its members.',
              'Public filing is the price of that protection — limited companies and LLPs must file accounts at Companies House, where anyone can read them.',
            ],
            table: {
              headers: ['Structure', 'Separate legal person?', 'Owner liability', 'Public filing?'],
              rows: [
                ['Sole trader', 'No', 'Unlimited', 'No'],
                ['Ordinary partnership', 'No', 'Unlimited, joint', 'No'],
                ['Limited liability partnership (LLP)', 'Yes', 'Limited', 'Yes'],
                ['Limited company (Ltd or plc)', 'Yes', 'Limited', 'Yes'],
              ],
            },
          },
          {
            h: 'Sole traders and partnerships',
            p: [
              'Neither structure is separate from its owners in law, so in both cases the owner\'s personal assets stand behind the business debts.',
              'The partnership default matters in assessments: with no partnership agreement, the Partnership Act 1890 applies — profits shared **equally** regardless of what each partner put in.',
              '"Jointly liable" is stronger than it sounds. A creditor can pursue one partner for the whole debt, leaving that partner to recover from the others.',
            ],
            split: {
              left: { title: 'Sole trader', items: [
                'One owner, in business on their own account',
                'Simple and cheap to set up — no registration',
                '**Unlimited liability** — personal assets at risk',
                'Keeps all the profit; bears all the risk',
                'Accounts are private',
              ] },
              right: { title: 'Ordinary partnership', items: [
                'Two or more people trading together',
                'Governed by the Partnership Act 1890 by default',
                '**Unlimited liability**, and partners are jointly liable',
                'Without an agreement, profits are shared **equally**',
                'Accounts are private',
              ] },
            },
            examtrap: 'A partner can be pursued for the whole of the partnership\'s debts, not just their share. That is what "joint liability" means, and it is why partnership agreements matter.',
          },
          {
            h: 'Limited companies',
            p: [
              'A company is created by incorporation at **Companies House** and exists as a legal person distinct from its shareholders.',
              '**Limited liability** means a shareholder risks only what they paid, or agreed to pay, for their shares. If the company fails, creditors generally cannot pursue them personally.',
              'The price of that protection is **transparency**: the company must file annual accounts and a confirmation statement on the public register, where anyone can inspect them.',
              'A company also has **perpetual succession** — it continues to exist regardless of who owns the shares.',
            ],
          },
          {
            h: 'Private and public companies',
            p: [
              'A **private limited company (Ltd)** cannot offer its shares to the general public. Most UK companies are Ltd.',
              'A **public limited company (plc)** may offer shares to the public and may be listed on a stock exchange. It faces higher minimum capital requirements and stricter reporting.',
              'Both have limited liability and separate legal personality; the difference is how they may raise capital.',
            ],
          },
          {
            h: 'Not-for-profit organisations and charities',
            p: [
              'Not every organisation exists to make a profit for owners. A **not-for-profit** exists to fulfil a social, community or member purpose. It may generate a surplus — what it cannot do is distribute that surplus to owners, because it has none.',
              'A **charity** must exist for **public benefit** for recognised charitable purposes, and in England and Wales is registered with and regulated by the **Charity Commission**.',
              'Charities are generally exempt from corporation tax on income applied to their charitable purposes.',
            ],
            worked: {
              title: 'Choosing a structure',
              problem: 'Two friends want to start a business together. They expect to borrow £60,000 and are worried about personal risk. They want the simplest structure that protects their personal assets. Which structure fits, and why?',
              steps: [
                { do: 'Rule out **sole trader** — there are two of them.', why: 'A sole trader is by definition a single owner.' },
                { do: 'Rule out an **ordinary partnership** — it offers no protection.', why: 'Partners have unlimited, joint liability, so the £60,000 borrowing would put both of their personal assets at risk. That is exactly what they want to avoid.' },
                { do: 'Consider **LLP** and **limited company** — both give separate legal personality and limited liability.', why: 'Either would protect personal assets beyond the amount invested.' },
                { do: 'A **private limited company** is the usual choice for a small trading business, accepting the obligation to file accounts publicly.', why: 'It is well understood by lenders, straightforward to incorporate, and the public filing requirement is the accepted trade-off for limited liability.' },
              ],
              answer: 'A private limited company (Ltd) — limited liability, with public filing as the trade-off',
              tryIt: {
                q: 'Of the four main structures — sole trader, ordinary partnership, LLP and limited company — how many give their owners limited liability?',
                answer: 2, unit: '',
                hint: 'Limited liability requires incorporation. Which structures are incorporated?',
                exp: 'Two: the LLP and the limited company. Sole traders and ordinary partners both have unlimited liability.',
              },
            },
          },
        ],
        check: [
          { q: 'Which structure gives its owners limited liability?', opts: [
              'A private limited company registered at Companies House',
              'A sole trader operating under a registered business name',
              'An ordinary partnership governed by the Partnership Act 1890',
              'A self-employed contractor working through an agency'],
            ans: 0, exp: 'Limited liability requires incorporation. Trading names and agency arrangements change nothing about legal liability.' },
          { type: 'truefalse', q: 'Identify whether the following statements are true or false.',
            statements: [
              { text: 'A limited company continues to exist when its shareholders change.', answer: true },
              { text: 'An ordinary partnership has a legal identity separate from its partners.', answer: false },
              { text: 'A charity may generate a surplus provided it is applied to its purposes.', answer: true },
              { text: 'A sole trader must file annual accounts at Companies House.', answer: false },
            ],
            exp: 'An ordinary partnership is not a separate legal person. Sole traders file nothing publicly — that privacy is the flip side of unlimited liability.' },
          { q: 'Why must a limited company file its accounts on the public register?', opts: [
              'It is the transparency trade-off for shareholders having limited liability',
              'It allows HMRC to calculate the corporation tax the company owes',
              'It is required before the company is permitted to continue trading',
              'It registers the company\'s employees for PAYE and National Insurance'],
            ans: 0, exp: 'Anyone dealing with a company whose owners cannot be pursued personally is entitled to see its financial position. Tax is settled separately with HMRC.' },
          { type: 'numeric', q: 'A partnership of three has no written agreement and makes a profit of £84,000. Under the Partnership Act 1890 default, what is each partner\'s share, in £?',
            answer: 28000, unit: '£',
            steps: ['Without an agreement, the Partnership Act 1890 default applies.', 'That default is equal sharing between the partners.', '£84,000 ÷ 3 = £28,000 each.'],
            exp: 'Absent a written agreement, profits are shared equally regardless of capital contributed or hours worked — which is precisely why partnership agreements are worth having.' },
        ],
      },
      {
        id: 'L-besy-4',
        title: 'The synoptic assessment explained',
        icon: '🎯',
        skills: ['besy-structure'],
        cards: [
          {
            h: 'What you are actually sitting',
            p: [
              'The Level 2 Certificate in Accounting has four units but only **three end-of-unit exams**. The fourth assessment is the **synoptic**, and the synoptic *is* The Business Environment.',
              'It is **2 hours, 8 tasks, 100 marks**, and the pass mark is 70%.',
              'It draws on the whole qualification — The Business Environment in full, plus the parts of Introduction to Bookkeeping and Principles of Bookkeeping Controls it needs.',
            ],
          },
          {
            h: 'What is NOT in the synoptic',
            p: [
              '**Principles of Costing does not appear in the synoptic at all.** The AAT assessment specification states it plainly: Principles of Costing is a unit assessment only.',
              'That matters for how you revise. Costing needs your full attention for its own 90-minute exam — and none of it for this one.',
            ],
            callout: { kind: 'warning', text: 'Revising costing "for the synoptic" is wasted effort. It cannot be examined there. Revise it for its own paper instead.' },
          },
          {
            h: 'The eight tasks',
            p: [
              'Two tasks are **human-marked extended written response** — task 4 in part and task 7 — and together they carry around a third of the paper. Practising the calculations alone leaves those marks untouched.',
              'Notice the spread. No single unit dominates: the paper draws on the business environment material heavily, with bookkeeping and control account work threaded through it.',
              'Use the mark allocation to budget your time. In a two-hour paper, a 22-mark task deserves roughly a quarter of your time and a 7-mark task considerably less.',
            ],
            table: {
              headers: ['Task', 'Marks', 'Content'],
              rows: [
                ['1', '10', 'Business types and their functions'],
                ['2', '13', 'The finance function and its information'],
                ['3', '14', 'CSR, ethics and sustainability'],
                ['4', '**22**', 'Bookkeeping transactions **and communicating information**'],
                ['5', '10', 'Control accounts, reconciliations and journals'],
                ['6', '7', 'The principles of contract law'],
                ['7', '10', 'Bookkeeping systems, receipts, payments and data security'],
                ['8', '14', 'The external business environment'],
              ],
            },
          },
          {
            h: 'Two tasks are marked by a human',
            p: [
              '**Tasks 4 and 7 are not computer-marked.** They ask you to write — an email explaining a discrepancy, a note advising a colleague, a recommendation on data security.',
              'Between them they carry around **32 of the 100 marks**, which is why your results are not released immediately.',
              'You cannot pass these by recognising the right option. You have to produce clear, specific prose.',
            ],
            examtrap: 'Task 4 alone is 22 marks — the largest single task in the paper. A candidate who has only ever answered multiple-choice questions walks into it unprepared.',
          },
          {
            h: 'What earns the written marks',
            p: [
              'Examiners are not looking for length or elegance. Almost every written task rewards the same four things:',
              '**Figure** — state the specific amount. "A difference of £480", not "a discrepancy".',
              '**Cause** — name the document or event responsible. "Invoice 4471 was raised after the order was cancelled."',
              '**Action** — say concretely what will happen. "I will issue a credit note for £480 today."',
              '**Tone** — professional, appropriate to the reader, and free of unexplained jargon.',
            ],
            flow: ['Figure', 'Cause', 'Action', 'Professional close'],
          },
          {
            h: 'Planning your revision',
            p: [
              'Weight your effort to the marks. The Business Environment supplies the majority of the paper, so its topics — business types, the finance function, ethics and sustainability, contract law, the external environment — deserve the bulk of your time.',
              'The bookkeeping content that appears is the **foundation** material, not the advanced end: processing transactions, control accounts, reconciliations, receipts and payments.',
              'And practise **writing**. It is the one skill you cannot acquire by reading.',
            ],
            callout: { kind: 'tip', text: 'Use this app\'s Synoptic Mock for the real 8-task, 100-mark shape, and the separate Unit Assessments for the three 90-minute exams.' },
          },
        ],
        check: [
          { q: 'Which unit is NOT assessed as part of the Level 2 synoptic assessment?', opts: [
              'Principles of Costing, which is a unit assessment only',
              'The Business Environment, which has no separate exam',
              'Introduction to Bookkeeping, which is fully assumed knowledge',
              'Principles of Bookkeeping Controls, which is examined separately'],
            ans: 0, exp: 'The AAT assessment specification states that Principles of Costing is a unit assessment only and is not assessed in the synoptic.' },
          { type: 'numeric', q: 'The synoptic assessment is 8 tasks totalling how many marks?',
            answer: 100, unit: 'marks',
            steps: ['The Business Environment synoptic is a 2-hour assessment.', 'It contains 8 independent tasks.', 'The tasks total 100 marks.'],
            exp: 'Eight tasks, 100 marks, 2 hours, 70% pass mark.' },
          { type: 'truefalse', q: 'Identify whether the following statements about the synoptic are true or false.',
            statements: [
              { text: 'Two of the eight tasks are marked by a human rather than the computer.', answer: true },
              { text: 'The Business Environment has its own separate end-of-unit exam.', answer: false },
              { text: 'The written tasks carry roughly a third of the total marks.', answer: true },
              { text: 'Results are released immediately at the end of the assessment.', answer: false },
            ],
            exp: 'The Business Environment is assessed in the synoptic only. Because Tasks 4 and 7 need human marking, results are not immediate.' },
          { q: 'A written task asks you to explain an account discrepancy to a customer. What should the answer contain?', opts: [
              'The specific amount, its cause, and what you will do about it',
              'A full listing of every transaction posted to the account',
              'An apology, without reference to the underlying figures',
              'The relevant ledger extracts, with no accompanying commentary'],
            ans: 0, exp: 'Figure, cause, action. Raw data shifts the work back onto the reader, and an apology without a figure resolves nothing.' },
        ],
      },
      {
        id: 'L-besy-5',
        title: 'Acting professionally',
        icon: '🧭',
        skills: ['besy-ethics'],
        cards: [
          {
            h: 'The five fundamental principles',
            p: [
              'Professional accountants follow five fundamental ethical principles.',
              '**Integrity**: be straightforward and honest. **Objectivity**: do not let bias, conflicts of interest or pressure override judgement. **Professional competence and due care**: keep your knowledge up to date and work carefully.',
              '**Confidentiality**: do not disclose or use information gained through work without proper authority (unless there is a legal duty to disclose). **Professional behaviour**: comply with laws and avoid anything that discredits the profession.',
            ],
          },
          {
            h: 'Threats to the principles',
            p: [
              'Five threats can compromise your ethics. **Self-interest**: a financial or other stake clouds judgement. **Self-review**: checking your own earlier work. **Familiarity**: being too close to someone to stay sceptical.',
              '**Intimidation**: pressure or threats — "approve this or lose your job". **Advocacy**: promoting a client\'s position so hard that objectivity is lost.',
            ],
          },
          {
            h: 'Safeguards',
            p: [
              'When a threat appears, apply **safeguards**: follow firm policies, consult your supervisor or a senior colleague, get a second review of the work, or contact the **AAT ethics helpline**.',
              'If no safeguard reduces the threat to an acceptable level, decline or withdraw from the task. Never just go along with it.',
            ],
            flow: ['Spot the threat', 'Assess how serious it is', 'Apply safeguards', 'Escalate if needed', 'Withdraw if unresolved'],
          },
          {
            h: 'Sustainability and the triple bottom line',
            p: [
              'Sustainable business means meeting today\'s needs without compromising future generations.',
              'The **triple bottom line** measures success three ways: **profit** (economic), **people** (social) and **planet** (environmental). Finance professionals support all three — for example, by reporting energy use as well as cost.',
            ],
          },
          {
            h: 'The five fundamental principles are non-negotiable',
            p: [
              'Every professional accountant is bound by these principles regardless of who their employer is.',
            ],
            callout: {
              kind: 'key',
              text: 'The five fundamental principles — Integrity, Objectivity, Professional competence and due care, Confidentiality, Professional behaviour — underpin all professional conduct. No instruction from a manager or client can override them. When a threat cannot be reduced to an acceptable level, the right response is to withdraw from the engagement.',
            },
          },
        ],
        check: [
          {
            q: 'Keeping your technical knowledge up to date supports which fundamental principle?',
            opts: ['Confidentiality', 'Integrity', 'Professional competence and due care', 'Objectivity'],
            ans: 2,
            exp: 'Professional competence and due care requires maintaining the knowledge and skills necessary to provide a proper service to clients and employers.',
          },
          {
            q: 'Your manager pressures you to overstate sales figures or face dismissal. Which threat is this?',
            opts: ['Self-review threat', 'Intimidation threat', 'Familiarity threat', 'Advocacy threat'],
            ans: 1,
            exp: 'Pressure backed by a threat to your employment is an intimidation threat to objectivity and integrity.',
          },
          {
            q: 'When may an accountant disclose confidential client information?',
            opts: ['Whenever a friend asks', 'When it would win new business', 'Never, under any circumstances', 'When there is a legal duty or proper authority to disclose'],
            ans: 3,
            exp: 'Confidentiality can be overridden by a legal obligation — for example, a Suspicious Activity Report under money laundering legislation — or proper authorisation.',
          },
          {
            q: 'What are the three elements of the triple bottom line?',
            opts: ['Profit, people, planet', 'Price, product, promotion', 'Assets, liabilities, capital', 'Cash, credit, capital'],
            ans: 0,
            exp: 'The triple bottom line balances economic (profit), social (people) and environmental (planet) performance.',
          },
          {
            q: 'An accountant suspects a colleague is involved in money laundering. What should they do?',
            opts: ['Ignore it — it is not their responsibility', 'Tell the colleague they have been spotted', 'Report it internally via the firm\'s procedures or to the National Crime Agency', 'Destroy any evidence to protect the firm'],
            ans: 2,
            exp: 'Money laundering reporting is a legal obligation. Suspicion must be reported through the firm\'s Money Laundering Reporting Officer or directly to the NCA. Tipping off the suspect is itself a criminal offence.',
          },
        ],
      },
      {
        id: 'L-besy-6',
        title: 'Technology and keeping data safe',
        icon: '🔐',
        skills: ['besy-tech'],
        cards: [
          {
            h: 'Accounting software and the cloud',
            p: [
              'Modern bookkeeping runs on software: transactions post to the ledgers automatically, reports appear at a click, and bank feeds pull statement data straight in.',
              '**Cloud accounting** keeps the software and data on remote servers. Benefits: access from anywhere, automatic backups and updates, and several users at once. Watch-outs: you need internet access, and you must trust the provider\'s security.',
            ],
          },
          {
            h: 'Automation and AI',
            p: [
              '**Automation** handles repetitive tasks — scanning invoices, matching payments, chasing late payers — faster and with fewer errors than humans.',
              '**Artificial intelligence** goes further, spotting patterns: flagging unusual transactions or forecasting cash flow.',
              'Technology shifts the accountant\'s job from data entry towards checking, interpreting and advising. The judgement still has to be human.',
            ],
          },
          {
            h: 'Keeping data secure',
            p: [
              'Good security is mostly good habits.',
              'Use **strong, unique passwords** and never share them. Limit access so people see only what their job requires. Take regular **backups** and store them separately. Lock screens, encrypt portable devices, and install software updates promptly.',
            ],
            split: {
              left: { title: 'DO', items: ['Strong unique passwords', 'Restrict access by role', 'Regular backups', 'Lock your screen', 'Apply updates'] },
              right: { title: 'DO NOT', items: ['Share login details', 'Click unexpected links', 'Use public Wi-Fi for client data', 'Leave papers on desks', 'Ignore software updates'] },
            },
          },
          {
            h: 'GDPR and phishing',
            p: [
              'Under **UK GDPR**, personal data must be processed lawfully and fairly, kept accurate and secure, held no longer than necessary, and used only for the stated purpose. Serious breaches must be reported to the **ICO**, and penalties can be severe.',
              '**Phishing** is a fake message — usually an email — that imitates a trusted sender to steal logins or money. Red flags: urgency, unexpected attachments, requests for credentials, and sender addresses that do not quite match. When in doubt, do not click — verify by another route.',
            ],
          },
          {
            h: 'The CIA triad',
            p: [
              'All information security controls aim to protect one or more of these three properties.',
            ],
            callout: {
              kind: 'key',
              text: 'The CIA triad underpins data security: Confidentiality (only authorised people can access data), Integrity (data is accurate and has not been altered without authorisation), and Availability (data and systems are accessible when needed). Match every security control to the threat it addresses using this framework.',
            },
          },
        ],
        check: [
          {
            q: 'Which is a key benefit of cloud accounting software?',
            opts: ['It works without any internet connection', 'It removes the need for passwords', 'It makes data security unnecessary', 'Authorised users can access live data from anywhere'],
            ans: 3,
            exp: 'Cloud systems hold data centrally so authorised users can work from any location with an internet connection.',
          },
          {
            q: 'Under UK GDPR, how long may personal data be kept?',
            opts: ['Forever, once collected', 'Exactly seven years in all cases', 'No longer than necessary for its purpose', 'Until the customer asks twice'],
            ans: 2,
            exp: 'The storage limitation principle requires that data is kept only as long as needed for the purpose for which it was collected.',
          },
          {
            q: 'An email claiming to be from your bank urgently asks you to confirm your login details. What is this likely to be?',
            opts: ['A phishing attempt', 'A routine bank statement', 'A GDPR notice', 'A software update'],
            ans: 0,
            exp: 'Urgency plus a request for credentials are classic signs of phishing. Do not click — verify the request through an independent channel.',
          },
          {
            q: 'Why should access to accounting systems be restricted by role?',
            opts: ['To slow the system down for safety', 'So staff see and change only the data their job requires', 'To avoid paying for software licences', 'Because GDPR bans all shared systems'],
            ans: 1,
            exp: 'Role-based access limits both accidental errors and deliberate misuse, protecting confidentiality and integrity.',
          },
          {
            q: 'Which element of the CIA triad is protected by taking regular backups of data?',
            opts: ['Confidentiality', 'Integrity', 'Availability', 'Authentication'],
            ans: 2,
            exp: 'Backups protect Availability — if data is lost or systems fail, backups allow the business to restore access quickly.',
          },
        ],
      },
      {
        id: 'L-besy-7',
        title: 'Ethics: threats and safeguards',
        icon: '⚖️',
        skills: ['besy-ethics'],
        cards: [
          {
            h: 'The five fundamental principles (AAT Code)',
            p: [
              '**Integrity** — be straightforward and honest in all professional relationships.',
              '**Objectivity** — do not let bias, conflict of interest or undue influence override your judgement.',
              '**Professional competence and due care** — maintain knowledge and skills; act diligently.',
              '**Confidentiality** — do not disclose information without proper authority (unless legally required).',
              '**Professional behaviour** — comply with relevant laws and avoid actions that discredit the profession.',
            ],
          },
          {
            h: 'Threats to the fundamental principles (SLAMIC)',
            p: [
              '**S**elf-interest — financial or other interests that influence judgement.',
              '**L**ong familiarity (familiarity) — too close a relationship with a client undermines objectivity.',
              '**A**dvocacy — promoting a client\'s position to the point of compromising objectivity.',
              '**M**anagement threat — making decisions that should be management\'s responsibility.',
              '**I**ntimidation — threatened or actual pressure from a client or employer.',
              '**C**omplacency (self-review) — reviewing your own prior work without sufficient scepticism.',
            ],
          },
          {
            h: 'Safeguards',
            p: [
              'Safeguards come from two directions, and an answer that names only one side is only half an answer.',
              'Match the safeguard to the threat. A self-review threat is answered by independent review; a familiarity threat by rotating staff; an intimidation threat by escalating within the firm.',
              'Where no safeguard can reduce a threat to an acceptable level, the correct answer is to **decline or withdraw** from the engagement.',
            ],
            split: {
              left: { title: 'Created by the profession', items: ['CPD requirements', 'AAT Code of Ethics', 'Disciplinary procedures', 'Regulatory oversight'] },
              right: { title: 'In the work environment', items: ['Internal policies and procedures', 'Independent review', 'Audit committees', 'Rotation of staff on engagements'] },
            },
          },
          {
            h: 'Ethical dilemmas in practice',
            p: [
              'If you face a conflict between following instructions and acting ethically, you should first try to resolve it internally — speak to a supervisor or compliance officer.',
              'If internal resolution fails, you may need to seek legal advice or report to a regulator.',
              'You should **not** simply go along with unethical instructions to protect your job.',
            ],
            callout: { kind: 'warning', text: '**Exam trap:** Confidentiality is not absolute. You MAY (or must) disclose information if required by law (e.g. money-laundering suspicion under the Proceeds of Crime Act 2002).' },
          },
          {
            h: 'Bribery and money laundering',
            p: [
              'The **Bribery Act 2010** makes it illegal to offer, receive, or facilitate bribes.',
              'Under the **Proceeds of Crime Act 2002**, accounting professionals must report suspicions of money laundering to a Nominated Officer (MLRO) — tipping off the suspect is a criminal offence.',
              'AAT members have professional duty to report and must not ignore warning signs (red flags).',
            ],
          },
        ],
        check: [
          {
            q: 'Your manager asks you to record a transaction in a way you believe is misleading. Which fundamental principle is most directly threatened?',
            opts: ['Professional competence', 'Confidentiality', 'Integrity', 'Professional behaviour'],
            ans: 2,
            exp: 'Integrity requires honesty and straightforwardness. Recording a transaction in a misleading way violates integrity.',
          },
          {
            q: 'A client threatens to take their business elsewhere unless you agree to their preferred (but incorrect) accounting treatment. Which threat is this?',
            opts: ['Self-interest', 'Familiarity', 'Intimidation', 'Advocacy'],
            ans: 2,
            exp: 'Intimidation occurs when a client or employer uses actual or threatened pressure to influence professional judgement.',
          },
          {
            q: 'You suspect a client is laundering money. What should you do first?',
            opts: ['Tell the client that you suspect them', 'Do nothing until you are certain', 'Report to the Nominated Officer (MLRO) internally', 'Call the police directly'],
            ans: 2,
            exp: 'The correct first step is to report your suspicion internally to the Nominated Officer (MLRO). Telling the client would be "tipping off", which is a criminal offence.',
          },
          {
            q: 'Which of the following is a safeguard created in the work environment?',
            opts: ['The AAT Code of Ethics', 'CPD requirements', 'An internal independent review process', 'Disciplinary procedures by the regulator'],
            ans: 2,
            exp: 'Internal review processes are safeguards created within the work environment. The AAT Code, CPD, and disciplinary procedures are profession-level safeguards.',
          },
          {
            q: 'Confidentiality means a professional accountant should NEVER disclose client information. Is this statement correct?',
            opts: ['Yes, confidentiality is absolute', 'No — disclosure is required when a legal duty overrides it', 'Yes, except to other accountants', 'No — any third party may request disclosure'],
            ans: 1,
            exp: 'Confidentiality is a fundamental principle but not absolute. Legal obligations (e.g. money-laundering reporting, court orders) override confidentiality.',
          },
        ],
      },
      {
        id: 'L-besy-8',
        title: 'Economic indicators: reading the data',
        icon: '📈',
        skills: ['besy-econ'],
        cards: [
          {
            h: 'Key economic indicators',
            p: [
              '**GDP (Gross Domestic Product)** — the total value of goods and services produced in a country. Rising GDP = economic growth; falling GDP = recession.',
              '**Inflation** — a general rise in prices, measured by the **Consumer Price Index (CPI)**. High inflation reduces purchasing power.',
              '**Interest rates** — set by the Bank of England. Higher rates increase borrowing costs but can reduce inflation.',
              '**Unemployment** — the percentage of the workforce without a job. High unemployment reduces consumer spending.',
            ],
          },
          {
            h: 'How inflation is measured',
            p: [
              'The **CPI** tracks a basket of typical consumer goods and services each month.',
              'The **RPI (Retail Price Index)** is an older measure that includes housing costs. It is generally higher than CPI.',
              'The Bank of England\'s inflation target is **2% CPI**. If inflation is higher, the Bank typically raises interest rates.',
            ],
            formula: 'Inflation rate = ((Price this year − Price last year) ÷ Price last year) × 100',
          },
          {
            h: 'Interest rates and business',
            p: [
              'The Bank of England’s base rate feeds through to two different things at once: what a business pays to borrow, and what its customers can afford to spend.',
              'A rate rise therefore squeezes from both sides — a dearer overdraft or loan, and weaker demand as households have less left after mortgage costs.',
            ],
            split: {
              left: { title: 'Higher interest rates', items: ['Borrowing more expensive', 'Reduced consumer spending', 'Investment may fall', 'Currency often strengthens'] },
              right: { title: 'Lower interest rates', items: ['Cheaper borrowing', 'More consumer spending', 'Investment encouraged', 'Currency may weaken'] },
            },
          },
          {
            h: 'The economic cycle',
            p: [
              'The economy moves through recurring phases rather than growing in a straight line, and each phase calls for a different response from a business.',
              'Two consecutive quarters of falling GDP is the conventional definition of a recession — a definition that is worth knowing verbatim.',
            ],
            flow: ['Expansion (boom)', 'Peak', 'Contraction (recession)', 'Trough', 'Recovery'],
          },
          {
            h: 'Impact on business decisions',
            p: [
              'Businesses monitor economic indicators to make decisions about pricing, investment, staffing, and stock levels.',
              '**Boom:** demand high, prices rise, businesses may expand and hire more staff.',
              '**Recession:** demand falls, businesses cut costs, may reduce staff or delay investment.',
            ],
            callout: { kind: 'tip', text: '**Exam tip:** You do not need detailed macroeconomic theory at Level 2. Focus on the **direction of change** — e.g. if interest rates rise, borrowing costs rise, consumer spending tends to fall, and businesses may invest less.' },
          },
        ],
        check: [
          {
            q: 'Which indicator measures the total value of goods and services produced in a country?',
            opts: ['CPI', 'RPI', 'GDP', 'Interest rate'],
            ans: 2,
            exp: 'GDP (Gross Domestic Product) measures the total economic output of a country. Rising GDP indicates economic growth.',
          },
          {
            q: 'The Bank of England raises interest rates. What is the most likely immediate effect on businesses?',
            opts: ['Borrowing becomes cheaper', 'Consumer spending increases', 'Business investment is encouraged', 'Borrowing costs increase'],
            ans: 3,
            exp: 'Higher interest rates increase the cost of borrowing for both businesses and consumers, typically reducing investment and consumer spending.',
          },
          {
            q: 'CPI is 3% against a target of 2%. What action might the Bank of England take?',
            opts: ['Cut interest rates to stimulate spending', 'Raise interest rates to reduce inflation', 'Print more money', 'Reduce government spending directly'],
            ans: 1,
            exp: 'When inflation is above target, the Bank of England typically raises interest rates to reduce spending and bring inflation back down.',
          },
          {
            q: 'Which phase of the economic cycle is characterised by falling GDP for two or more consecutive quarters?',
            opts: ['Boom', 'Recovery', 'Recession', 'Peak'],
            ans: 2,
            exp: 'A recession is technically defined as two consecutive quarters of negative GDP growth (falling output).',
          },
          {
            q: 'Which measure of inflation includes housing costs and is generally higher than CPI?',
            opts: ['GDP deflator', 'RPI', 'CPI', 'PPI'],
            ans: 1,
            exp: 'The Retail Price Index (RPI) includes housing costs such as mortgage interest payments. It is typically higher than CPI, which is why CPI is the official inflation target measure.',
          },
        ],
      },
      {
        id: 'L-besy-9',
        title: 'Sources of finance (Level 3 preview)',
        icon: '💰',
        skills: ['besy-finance'],
        cards: [
          {
            h: 'Short-term vs long-term finance',
            p: [
              'The governing principle is **matching**: finance a long-life asset with long-term finance, and short-term working capital needs with short-term finance.',
              'Funding a building on an overdraft is the classic mismatch — the overdraft is repayable on demand while the asset takes years to pay for itself.',
              'Each source carries a different cost and a different loss of control. Borrowing must be repaid with interest; issuing shares need not be repaid but dilutes the owners.',
            ],
            split: {
              left: { title: 'Short-term (< 1 year)', items: ['Bank overdraft', 'Trade credit (credit from suppliers)', 'Invoice finance (factoring/discounting)', 'Short-term bank loan'] },
              right: { title: 'Long-term (> 1 year)', items: ['Bank loan (term loan)', 'Hire purchase', 'Leasing', 'Share capital (companies only)', 'Retained profits', 'Grants'] },
            },
          },
          {
            h: 'Debt finance',
            p: [
              '**Bank loan** — borrowed for a fixed term, repaid with interest. Suitable for long-term assets. May require security.',
              '**Bank overdraft** — flexible short-term borrowing; expensive per £ borrowed but only used when needed.',
              '**Hire purchase** — pay in instalments; business owns the asset at the end.',
              '**Finance lease** — pay to use the asset; the lessor retains ownership throughout.',
            ],
            callout: { kind: 'tip', text: '**Key difference:** Hire purchase → business OWNS the asset at the end. Finance lease → business does NOT own it (it is returned or re-leased).' },
          },
          {
            h: 'Equity finance',
            p: [
              '**Share capital** (limited companies only): raise money by issuing ordinary shares. Shareholders receive dividends. No repayment obligation — but ownership is diluted.',
              '**Retained profits**: profits not paid as dividends, reinvested in the business. The most common internal source of finance. Free of interest.',
              '**Owner\'s capital** (sole traders/partnerships): the owner introduces personal funds into the business.',
            ],
          },
          {
            h: 'Invoice finance',
            p: [
              '**Factoring**: the business sells its invoices to a factoring company, which advances up to 85% of the value immediately and collects the debts itself. Fee charged as a % of invoice value.',
              '**Invoice discounting**: similar advance against invoices, but the business continues to collect its own debts. More confidential.',
              'Both improve **cash flow** for businesses with large amounts tied up in trade receivables.',
            ],
          },
          {
            h: 'Matching finance to the need',
            p: [
              'The **matching principle** for finance: use long-term finance for long-term assets and short-term finance for short-term needs.',
              'Using a short-term overdraft to buy a building creates **liquidity risk** — the overdraft may need to be repaid before the asset generates returns.',
            ],
            formula: 'Long-term asset → long-term finance (bank loan, HP, share capital) · Short-term working capital → short-term finance (overdraft, trade credit, factoring)',
          },
        ],
        check: [
          {
            q: 'A business needs funds for the next 3 months to cover a seasonal gap in cash. Which source is MOST appropriate?',
            opts: ['10-year bank loan', 'Share capital issue', 'Bank overdraft', 'Hire purchase'],
            ans: 2,
            exp: 'A bank overdraft is a short-term, flexible source of finance — ideal for covering a temporary gap. A long-term loan would be inappropriate and costly for a short-term need.',
          },
          {
            q: 'Which source of finance does NOT require repayment to an external party?',
            opts: ['Bank overdraft', 'Hire purchase', 'Retained profits', 'Trade credit'],
            ans: 2,
            exp: 'Retained profits are internal funds — the business reinvests its own earnings. No external party requires repayment, and no interest is charged.',
          },
          {
            q: 'Under invoice factoring, who collects the debts from customers?',
            opts: ['The business itself', 'The factoring company', 'HMRC', 'The customer\'s bank'],
            ans: 1,
            exp: 'With factoring, the factoring company purchases the invoices and collects the debts. Invoice discounting is different — the business continues to collect its own debts.',
          },
          {
            q: 'A company buys a machine, pays monthly instalments over 3 years, and owns it outright at the end. This is:',
            opts: ['Finance lease', 'Bank overdraft', 'Hire purchase', 'Invoice discounting'],
            ans: 2,
            exp: 'Hire purchase: pay in instalments; ownership transfers to the buyer at the end of the agreement. A finance lease keeps ownership with the lessor.',
          },
          {
            q: 'Which source of finance is ONLY available to limited companies (not sole traders)?',
            opts: ['Bank loan', 'Retained profits', 'Share capital', 'Bank overdraft'],
            ans: 2,
            exp: 'Shares can only be issued by limited companies. Sole traders have unlimited liability and cannot issue shares — they use owner\'s capital instead.',
          },
          {
            q: 'The matching principle for finance states that:',
            opts: ['All finance should be raised by issuing shares', 'Long-term assets should be funded by long-term finance', 'Overdrafts should never be used', 'Interest rates must match inflation'],
            ans: 1,
            exp: 'The matching principle: align the term of the finance to the duration of the asset or need. Using short-term finance for long-term assets creates refinancing (rollover) risk.',
          },
          {
            q: 'Retained profits are an example of which type of finance?',
            opts: ['Debt finance', 'External finance', 'Internal equity finance', 'Short-term finance'],
            ans: 2,
            exp: 'Retained profits are internal (generated within the business) and equity (no repayment obligation). They represent reinvested earnings and are the most common source of business finance.',
          },
        ],
      },
      {
        id: 'L-besy-10',
        title: 'Employment and consumer law',
        icon: '⚖️',
        skills: ['besy-law'],
        cards: [
          {
            h: 'Key employment rights',
            p: [
              '**National Minimum Wage (NMW)**: employers must pay at least the legal minimum per hour. Rates vary by age; the National Living Wage applies to workers aged 21+.',
              '**Working Time Regulations 1998**: maximum 48 hours per week (averaged over 17 weeks), unless the worker opts out in writing. Minimum 5.6 weeks paid holiday per year.',
              '**Written statement of employment**: must be given within 2 months of starting; sets out key terms (pay, hours, job title, notice periods, holiday).',
              '**Unfair dismissal**: employees with 2+ years\' service may claim unfair dismissal if dismissed without a fair reason or fair procedure.',
            ],
          },
          {
            h: 'Protection from discrimination',
            p: [
              'The **Equality Act 2010** protects workers from discrimination on nine protected characteristics: age, sex, race, disability, religion or belief, sexual orientation, gender reassignment, pregnancy/maternity, marriage/civil partnership.',
              '**Direct discrimination**: treating someone less favourably because of a protected characteristic.',
              '**Indirect discrimination**: applying a practice or policy that puts people with a protected characteristic at a disadvantage.',
            ],
          },
          {
            h: 'Consumer rights',
            p: [
              'The **Consumer Rights Act 2015** covers contracts between businesses and consumers for goods, services, and digital content.',
              '**Goods** must be: of satisfactory quality; fit for purpose; as described.',
              '**Services** must be provided with reasonable care and skill, within a reasonable time, and at a reasonable price if not agreed in advance.',
              '**Remedies**: short-term right to reject (30 days); right to repair or replacement; right to a price reduction or final rejection.',
            ],
          },
          {
            h: 'Data protection (UK GDPR)',
            p: [
              'Under **UK GDPR** (retained after Brexit), personal data must be: processed lawfully, fairly and transparently; collected for specified explicit purposes; adequate, relevant and not excessive; accurate; kept only as long as necessary; kept securely.',
              'Key rights of data subjects: right of access; right to rectification; right to erasure (right to be forgotten); right to data portability.',
              'Organisations with 250+ employees (or processing sensitive data) must appoint a **Data Protection Officer (DPO)**.',
            ],
          },
          {
            h: 'Health and Safety at Work Act 1974',
            p: [
              '**Employer duties**: provide a safe workplace; safe equipment; safe systems of work; adequate information, instruction, training and supervision; a safe working environment.',
              '**Employee duties**: take reasonable care of their own and others\' health and safety; cooperate with employer; not misuse safety equipment.',
            ],
            callout: { kind: 'key', text: '**Exam tip:** The key pieces of legislation to know are: Equality Act 2010, Working Time Regulations 1998, Consumer Rights Act 2015, UK GDPR, Health and Safety at Work Act 1974. Know which protects WORKERS, which protects CONSUMERS, and which protects personal DATA.' },
          },
        ],
        check: [
          {
            q: 'Under the Working Time Regulations 1998, the maximum weekly working hours are:',
            opts: ['40 hours with no exceptions', '48 hours per week (averaged over 17 weeks) unless opted out', '60 hours if the employer requires it', '35 hours for all workers'],
            ans: 1,
            exp: 'The Working Time Regulations set a 48-hour limit, averaged over a reference period (typically 17 weeks). Workers can opt out in writing.',
          },
          {
            q: 'A new employee must receive their written statement of employment particulars within:',
            opts: ['1 week of starting', '1 month of starting', '2 months of starting', '6 months of starting'],
            ans: 2,
            exp: 'Employers must provide a written statement of employment particulars within 2 months of the employee\'s start date.',
          },
          {
            q: 'Under the Consumer Rights Act 2015, goods must satisfy three conditions. Which of the following is NOT one of them?',
            opts: ['Of satisfactory quality', 'Fit for purpose', 'As described', 'Delivered within 24 hours'],
            ans: 3,
            exp: 'The three statutory requirements are: satisfactory quality, fit for purpose, and as described. There is no automatic 24-hour delivery requirement.',
          },
          {
            q: 'Under UK GDPR, which right allows a data subject to have their data deleted?',
            opts: ['Right to rectification', 'Right to portability', 'Right to erasure', 'Right to access'],
            ans: 2,
            exp: 'The right to erasure (also called the right to be forgotten) allows individuals to request deletion of their personal data in certain circumstances.',
          },
          {
            q: 'Which legislation protects workers from discrimination based on age, sex, and disability?',
            opts: ['Working Time Regulations 1998', 'Equality Act 2010', 'Health and Safety at Work Act 1974', 'Consumer Rights Act 2015'],
            ans: 1,
            exp: 'The Equality Act 2010 protects workers and others from discrimination on nine protected characteristics, including age, sex, and disability.',
          },
          {
            q: 'An employee has worked for 3 years and is dismissed without being given a reason. What may they claim?',
            opts: ['Wrongful dismissal only (no unfair dismissal rights until 5 years)', 'Unfair dismissal (qualifying period is 2 years)', 'Nothing — employees have no rights regarding dismissal', 'Redundancy payment only'],
            ans: 1,
            exp: 'The qualifying period for unfair dismissal is 2 years. After 2 years\' service, employees can claim unfair dismissal if dismissed without a fair reason or procedure.',
          },
          {
            q: 'Under the Health and Safety at Work Act 1974, who has primary responsibility for ensuring a safe workplace?',
            opts: ['The government', 'The employees', 'The employer', 'The Health and Safety Executive (HSE) directly'],
            ans: 2,
            exp: 'The employer has primary responsibility for health and safety. Employees also have duties (to take reasonable care and cooperate), but the main duty lies with the employer.',
          },
        ],
      },
      {
        id: 'L-besy-11',
        title: 'The external economic environment',
        icon: '🌍',
        skills: ['besy-econ', 'besy-finance'],
        cards: [
          {
            h: 'Macroeconomic factors affecting business',
            p: [
              'Businesses operate in a wider economic environment they cannot control. Key macroeconomic factors include: the business cycle, inflation, interest rates, exchange rates, and government policy.',
              'Understanding these helps predict costs, sales, and the availability of finance.',
            ],
            flow: ['Business cycle (boom/recession)', 'Inflation (rising prices)', 'Interest rates (cost of borrowing)', 'Exchange rates (import/export costs)', 'Government fiscal policy (tax/spend)'],
          },
          {
            h: 'The business cycle',
            p: [
              'The economy moves in cycles: **boom** (growth, low unemployment, rising prices), **downturn** (growth slowing), **recession** (falling output, rising unemployment), **recovery** (growth returning).',
              'During a boom, demand rises and businesses expand; during a recession, demand falls, businesses contract or fail.',
            ],
            callout: { kind: 'key', text: 'Recession is defined as two consecutive quarters of negative GDP growth. A business should have contingency plans for downturns.' },
          },
          {
            h: 'Inflation and interest rates',
            p: [
              'Inflation is a general rise in the price level, measured by the Consumer Price Index (CPI). It raises input costs, erodes purchasing power, and can lead to wage pressure. The Bank of England sets the base interest rate to control inflation.',
              'Higher interest rates: reduce borrowing and spending, cool demand, but increase the cost of loans for businesses.',
            ],
            split: {
              left: {
                title: 'High inflation effects',
                items: ['Input costs rise', 'Customer purchasing power falls', 'Wage pressure increases', 'Uncertainty grows'],
              },
              right: {
                title: 'High interest rate effects',
                items: ['Borrowing is more expensive', 'Mortgage costs rise (less consumer spend)', 'Business investment falls', 'Currency may strengthen'],
              },
            },
          },
          {
            h: 'Exchange rates and international trade',
            p: [
              'An exchange rate is the price of one currency in terms of another. If sterling (£) weakens: imports cost more (inflationary), exports become cheaper for overseas buyers (good for exporters). If sterling strengthens: imports become cheaper, exports become more expensive for buyers abroad.',
            ],
            example: {
              title: 'Exchange rate impact',
              rows: [
                ['£ weakens (e.g. £1 = $1.15 → £1 = $1.05)', 'Imports dearer; exports cheaper overseas'],
                ['£ strengthens (e.g. £1 = $1.15 → £1 = $1.30)', 'Imports cheaper; exports dearer overseas'],
                ['Importer of raw materials', 'Hurt by weak pound; helped by strong pound'],
                ['Exporter of finished goods', 'Helped by weak pound; hurt by strong pound'],
              ],
            },
          },
          {
            h: 'Government economic policy',
            p: [
              'Governments use **fiscal policy** (taxation and public spending) and rely on the Bank of England for **monetary policy** (interest rates). Higher corporation tax reduces business profits. Incentives such as R&D tax credits or enterprise zones can stimulate investment. Government spending on infrastructure benefits businesses in those areas.',
            ],
            examtrap: 'Do not confuse monetary policy (interest rates — set by the Bank of England) with fiscal policy (tax and government spending — set by the government). They are separate tools with different purposes.',
          },
        ],
        check: [
          {
            q: 'A recession is defined as:',
            opts: ['A period of high inflation', 'Two or more consecutive quarters of negative GDP growth', 'Unemployment above 5%', 'A fall in the exchange rate'],
            ans: 1,
            exp: 'A recession is technically defined as two consecutive quarters of negative GDP (economic output) growth.',
          },
          {
            q: 'If the pound sterling weakens against the euro, a UK-based importer of goods from France will:',
            opts: ['Pay less in pounds for the same goods', 'Pay more in pounds for the same goods', 'Be unaffected — the goods price in euros stays the same', 'Benefit — their exports become cheaper'],
            ans: 1,
            exp: 'A weaker pound means more pounds are needed to buy the same amount of euros (or dollars). Imports become more expensive in sterling terms.',
          },
          {
            q: 'The Bank of England raises interest rates. Which effect on business is most likely?',
            opts: ['Businesses find it cheaper to borrow', 'Consumer spending tends to increase', 'Business borrowing costs increase and investment may fall', 'Exports become more expensive overseas'],
            ans: 2,
            exp: 'Higher interest rates increase the cost of borrowing for businesses and consumers, which tends to reduce spending and business investment.',
          },
          {
            q: 'Fiscal policy refers to:',
            opts: ['Setting interest rates to control inflation', 'Government decisions on taxation and public spending', 'The exchange rate mechanism', 'The Bank of England\'s base rate'],
            ans: 1,
            exp: 'Fiscal policy is the government\'s use of taxation and public spending to influence the economy. Monetary policy (interest rates) is a separate tool.',
          },
          {
            q: 'Inflation in the UK rises from 2% to 6%. Which of the following is the most likely immediate impact on a manufacturing business?',
            opts: ['Revenue automatically increases by 6%', 'Input costs (materials, energy) rise, putting pressure on margins', 'The business can reduce its prices to attract more customers', 'The business\'s fixed costs fall in real terms'],
            ans: 1,
            exp: 'Rising inflation increases the cost of inputs (materials, energy, wages). Unless selling prices can be raised by the same amount, profit margins are squeezed.',
          },
        ],
      },
      {
        id: 'L-besy-12',
        title: 'Technology, sustainability and stakeholders',
        icon: '💡',
        skills: ['besy-tech', 'besy-ethics'],
        cards: [
          {
            h: 'Technology in the finance function',
            p: [
              'Digital tools have transformed bookkeeping and accounting. Accounting software (e.g. Sage, Xero, QuickBooks) automates data entry, bank feeds, invoicing, and reporting. Cloud accounting allows real-time access from anywhere.',
              '**Making Tax Digital (MTD)** requires most VAT-registered businesses to keep digital records and file returns digitally.',
            ],
            flow: ['Manual bookkeeping', 'Desktop accounting software', 'Cloud accounting + bank feeds', 'Real-time dashboards + AI analysis', 'Making Tax Digital compliance'],
          },
          {
            h: 'Cybersecurity and data protection',
            p: [
              'Digital systems create cybersecurity risks: phishing, malware, ransomware, and data breaches. The **UK GDPR** and **Data Protection Act 2018** require businesses to protect personal data.',
              'Key principles: data minimisation (collect only what is needed), accuracy, storage limitation, and security.',
            ],
            callout: { kind: 'warning', text: 'Under UK GDPR, individuals have rights including: the right to access their data, the right to erasure (right to be forgotten), and the right to rectification (correction of errors). Businesses must have a Data Protection Officer if processing large amounts of sensitive data.' },
          },
          {
            h: 'Stakeholders and their interests',
            p: [
              'A stakeholder is anyone with an interest in the business.',
            ],
            example: {
              title: 'Key stakeholders',
              rows: [
                ['Stakeholder', 'Primary interest'],
                ['Owners/shareholders', 'Profit and return on investment'],
                ['Employees', 'Job security, fair pay, good conditions'],
                ['Customers', 'Quality, value, reliability'],
                ['Suppliers', 'Prompt payment, long-term relationship'],
                ['Government', 'Tax compliance, regulation, employment'],
                ['Community', 'Local employment, environmental impact'],
                ['Lenders (banks)', 'Interest payments, repayment of debt'],
              ],
            },
          },
          {
            h: 'Sustainability and CSR',
            p: [
              '**Corporate social responsibility (CSR)** means businesses taking responsibility for their impact on society and the environment, beyond legal requirements. **Sustainability** means meeting today\'s needs without compromising future generations.',
              'The finance function plays a key role: measuring, reporting, and managing environmental costs (carbon footprint, waste, energy use).',
            ],
            callout: { kind: 'key', text: 'The triple bottom line: People (social impact), Planet (environmental impact), Profit (economic performance). A sustainable business balances all three.' },
          },
          {
            h: 'Integrated reporting and the finance function\'s role',
            p: [
              'Increasingly, businesses produce integrated reports covering financial AND non-financial performance (environmental, social, governance — ESG). The finance function is responsible for data accuracy across all these areas.',
              'Accountants may help measure carbon costs, analyse supply chain ethics, and report on workforce diversity.',
            ],
            examtrap: 'Do not confuse CSR (voluntary actions beyond legal requirements) with compliance (meeting the law). A business that only does what the law requires is compliant — it is not necessarily demonstrating CSR.',
          },
        ],
        check: [
          {
            q: 'Making Tax Digital (MTD) requires VAT-registered businesses to:',
            opts: ['File paper VAT returns quarterly', 'Keep digital records and file VAT returns digitally using approved software', 'Pay VAT monthly instead of quarterly', 'Submit accounts to Companies House digitally'],
            ans: 1,
            exp: 'MTD requires businesses above the VAT threshold to maintain digital records and submit VAT returns using HMRC-approved software.',
          },
          {
            q: 'Under UK GDPR, a customer\'s right to have their personal data deleted is called:',
            opts: ['Right to portability', 'Right to rectification', 'Right to erasure', 'Right to access'],
            ans: 2,
            exp: 'The right to erasure (also called the right to be forgotten) allows individuals to request that their personal data is deleted.',
          },
          {
            q: 'A stakeholder group primarily interested in prompt payment is:',
            opts: ['Shareholders', 'Employees', 'Suppliers', 'The government'],
            ans: 2,
            exp: 'Suppliers\' primary interest is being paid on time (prompt payment) and maintaining a long-term trading relationship.',
          },
          {
            q: 'The "triple bottom line" framework measures business performance in terms of:',
            opts: ['Revenue, cost and profit', 'People, planet and profit', 'Input, process and output', 'Assets, liabilities and capital'],
            ans: 1,
            exp: 'The triple bottom line measures: People (social impact), Planet (environmental impact) and Profit (financial performance). All three matter for sustainable business.',
          },
          {
            q: 'Which of the following is an example of CSR (corporate social responsibility) rather than just legal compliance?',
            opts: ['Filing the VAT return on time', 'Paying the National Living Wage', 'Voluntarily reducing carbon emissions beyond legal requirements', 'Registering with Companies House'],
            ans: 2,
            exp: 'CSR involves actions taken beyond legal requirements. Voluntarily cutting carbon emissions (when not legally required) is a CSR initiative, not just compliance.',
          },
        ],
      },

      {
        id: 'L-besy-13',
        title: 'Business Law Basics',
        icon: '⚖️',
        skills: ['besy-structure', 'besy-ethics'],
        cards: [
          {
            h: 'Contract law — formation',
            p: [
              'A legally binding contract requires four elements: (1) **Offer** — a proposal to be bound by specific terms; (2) **Acceptance** — unqualified agreement to the exact terms of the offer; (3) **Consideration** — something of value exchanged by each party (money, goods, services, or a promise); (4) **Intention to create legal relations** — assumed in commercial contracts.',
              'All four elements must be present. A counter-offer destroys the original offer. Acceptance must be communicated to be effective.',
            ],
          },
          {
            h: 'Contract terms, breach and remedies',
            p: [
              'A **condition** is a fundamental term — breach by one party entitles the other to terminate the contract and claim damages. A **warranty** is a less important term — breach gives a right to damages only, not termination.',
              '**Misrepresentation** is a false statement of fact that induced the other party to enter the contract. It may allow rescission (unwinding the contract) and/or damages, depending on the type (fraudulent, negligent, or innocent).',
            ],
            example: {
              title: 'Breach remedies at a glance',
              rows: [
                ['Term type', 'Effect of breach'],
                ['Condition', 'Terminate + claim damages'],
                ['Warranty', 'Claim damages only (cannot terminate)'],
                ['Misrepresentation', 'Rescission and/or damages'],
              ],
            },
          },
          {
            h: 'Employment law essentials',
            p: [
              'Employees have statutory rights from day one: the right to a written statement of employment particulars, the national living wage (or minimum wage), and protection from unlawful discrimination (Equality Act 2010).',
              '**Wrongful dismissal** = dismissal without giving the notice period required by the contract (a contractual remedy). **Unfair dismissal** = dismissal without a fair reason (e.g. conduct, capability, redundancy) or without following a fair procedure — employees must usually have two years\' continuous service to claim unfair dismissal.',
            ],
          },
          {
            h: 'Company law and director duties',
            p: [
              'Directors owe statutory duties to the company under the Companies Act 2006: (1) act within powers; (2) promote the success of the company; (3) exercise independent judgement; (4) exercise reasonable care, skill and diligence; (5) avoid conflicts of interest; (6) not accept benefits from third parties; (7) declare interests in transactions.',
              'A private limited company (Ltd) must file annual accounts and a confirmation statement at Companies House. Failure to do so is a criminal offence by the directors.',
            ],
          },
          {
            h: 'Data protection — UK GDPR principles',
            p: [
              'Personal data must be processed in accordance with the UK GDPR (retained from EU GDPR post-Brexit). The six data protection principles require that data is: (1) **Lawful, fair and transparent**; (2) collected for a **specified, explicit purpose** (purpose limitation); (3) **adequate, relevant and limited** to what is necessary (data minimisation); (4) **accurate** and kept up to date; (5) not kept **longer than necessary** (storage limitation); (6) kept **secure** (integrity and confidentiality).',
              'Individuals have rights including access to their data (Subject Access Request), rectification, erasure (right to be forgotten), and objection to processing.',
            ],
          },
        ],
        check: [
          {
            q: 'Which of the following is NOT a required element for a valid contract?',
            opts: ['Offer', 'Acceptance', 'The agreement must be in writing', 'Consideration'],
            ans: 2,
            exp: 'Most contracts do not need to be in writing to be legally binding. The four required elements are: offer, acceptance, consideration, and intention to create legal relations. Writing is a formality only required for specific contracts (e.g. land sales).',
          },
          {
            q: 'A condition in a contract is:',
            opts: ['A minor term whose breach gives a right to damages only', 'A fundamental term whose breach allows the innocent party to terminate and claim damages', 'Any clause relating to the price payable under the contract', 'A term implied by the Sale of Goods Act only'],
            ans: 1,
            exp: 'A condition is a fundamental term going to the root of the contract. Breach by one party allows the innocent party to treat the contract as terminated and also claim damages. A warranty breach gives damages only.',
          },
          {
            q: 'Under the UK GDPR, the principle of data minimisation means:',
            opts: ['Personal data should be encrypted at all times using approved software', 'Only data that is necessary for the specified purpose should be collected', 'Data should be stored for the minimum possible number of years', 'Individuals must give explicit consent before any data is processed'],
            ans: 1,
            exp: 'Data minimisation requires that personal data collected is adequate, relevant, and limited to what is necessary for the purpose. Collecting more data than needed is a breach of this principle.',
          },
          {
            q: 'Wrongful dismissal occurs when:',
            opts: ['An employee is dismissed for whistleblowing about illegal activity', 'The employer dismisses without giving the notice period required by the contract', 'The employer dismisses without following the statutory dismissal procedure', 'An employee is dismissed within two years of starting employment'],
            ans: 1,
            exp: 'Wrongful dismissal is a breach of the employment contract — specifically, dismissing without giving the contractual (or statutory minimum) notice. It is a contractual claim, not a statutory one. Unfair dismissal is the separate statutory claim requiring a fair reason and fair process.',
          },
          {
            q: 'A director who uses confidential company information to make a personal profit is primarily breaching:',
            opts: ['The Companies Act requirement to file annual accounts on time', 'The UK GDPR data minimisation principle', 'Their duty to avoid conflicts of interest and not accept benefits from third parties', 'The requirement to exercise independent judgement only'],
            ans: 2,
            exp: 'Using company information for personal gain breaches the director\'s duty to avoid conflicts of interest and the duty not to accept benefits from third parties (Companies Act 2006, ss.175-176). This is also a potential breach of fiduciary duty.',
          },
        ],
      },
      {
        id: 'L-besy-14',
        title: 'Bridge to Level 3 — Tax & Business Awareness',
        icon: '🌉',
        skills: ['besy-structure', 'besy-ethics'],
        l3Bridge: true,
        cards: [
          {
            h: 'Business Awareness (BUAW) at Level 3',
            p: [
              'BUAW extends the Business Environment from Level 2. At Level 3, you will: analyse macro-economic factors using frameworks such as PESTLE; evaluate sources of business finance (equity, debt, retained profits, crowdfunding); consider the impact of digitalisation and emerging technology on business models; and apply ethical frameworks to complex business decisions.',
              'The BESY groundwork — types of business, stakeholders, economic concepts, ethics, sustainability — carries directly into BUAW. You will use those concepts in more analytical, case-study-style tasks.',
            ],
          },
          {
            h: 'Tax Processes for Businesses (TPFB) — a new unit at Level 3',
            p: [
              'There is no direct TPFB equivalent at Level 2, but your ITBK and POBC VAT knowledge feeds straight in. TPFB covers: completing the VAT 100 return; VAT schemes (cash accounting, annual accounting, flat rate scheme for small businesses); import VAT and reverse charge; and partial exemption basics.',
              'TPFB also introduces **income tax for sole traders and employees** — calculating taxable trading profit, allowable expenses, the personal allowance, and the income tax liability. This is brand-new territory for Level 2 students but builds logically on the business and accounting knowledge you already have.',
            ],
          },
          {
            h: 'Income tax for sole traders at Level 3',
            p: [
              'A sole trader pays income tax on their **taxable trading profit**: turnover less allowable business expenses (incurred wholly and exclusively for the trade). Capital allowances (writing-down allowances on assets) are also deducted.',
              'After calculating trading profit, the **personal allowance** (£12,570 for 2024/25) is deducted. Income tax is then charged at: 20% on income in the basic rate band (up to £50,270 including the personal allowance); 40% on income in the higher rate band; 45% on income above £125,140.',
            ],
            formula: 'Taxable trading profit = Revenue − Allowable expenses − Capital allowances·Taxable income = Taxable profit − Personal allowance·Income tax = Basic rate band × 20% + Higher rate band × 40%',
          },
          {
            h: 'PAYE, NIC and payroll at Level 3',
            p: [
              'Employers operate **PAYE** (Pay As You Earn) — deducting income tax and employee NIC from gross pay and remitting to HMRC monthly. **Class 1 primary NIC** (employee\'s contribution) is deducted from gross pay at 8% (2024/25) on earnings between the primary and upper thresholds.',
              '**Class 1 secondary NIC** (employer\'s contribution) is an additional cost of 13.8% on the employee\'s gross earnings above the secondary threshold. Both employer NIC and the employer\'s share of income tax remittances are business costs. Your Level 2 POBC payroll knowledge gives you the conceptual framework for this.',
            ],
            example: {
              title: 'PAYE and NIC flow',
              rows: [
                ['Step', 'Who pays?', 'Where?'],
                ['Gross salary £3,000', '—', 'Agreed in contract'],
                ['Less: income tax £280', 'Employee bears', 'Deducted from gross pay'],
                ['Less: Class 1 primary NIC £130', 'Employee bears', 'Deducted from gross pay'],
                ['= Net pay £2,590', 'Employee receives', 'Paid to employee'],
                ['Class 1 secondary NIC £265', 'Employer pays extra', 'Additional employer cost'],
                ['Total employer cost £3,265', 'Employer', 'Gross pay + employer NIC'],
              ],
            },
          },
          {
            h: 'Why BESY is your secret weapon at Level 3',
            p: [
              'Many students underestimate BESY — but Business Awareness at Level 3 carries significant assessment weight, and students who found BESY easy at Level 2 have a major advantage.',
              'Every concept from BESY reappears: types of business structure (sole trader, partnership, Ltd — with legal consequences), economic analysis (supply and demand, market structures), ethics (AAT Code of Professional Ethics: integrity, objectivity, confidentiality, professional competence, professional behaviour), stakeholder analysis, and sustainability. Level 3 BUAW applies these to business strategy scenarios. The students who read the BESY material carefully at Level 2 are the ones who breeze through BUAW.',
            ],
          },
        ],
        check: [
          {
            q: 'For income tax purposes, a sole trader\'s taxable trading profit is calculated as:',
            opts: ['Gross turnover before any deductions', 'Revenue minus allowable business expenses (and capital allowances)', 'Drawings taken from the business during the year', 'The balance on the sole trader\'s capital account at year end'],
            ans: 1,
            exp: 'Taxable trading profit = Revenue − allowable business expenses − capital allowances. Allowable expenses must be incurred wholly and exclusively for the purpose of the trade. Drawings are not an allowable expense.',
          },
          {
            q: 'Class 1 primary National Insurance Contributions are paid by:',
            opts: ['The employer, as an additional cost on top of gross wages', 'The employee, deducted from gross pay before they receive it', 'HMRC, directly from tax revenues collected', 'Both employer and employee in equal shares'],
            ans: 1,
            exp: 'Class 1 primary NIC is the employee\'s contribution — deducted from gross pay by the employer under PAYE before the employee receives their net pay. The employer then remits it to HMRC along with the income tax deducted.',
          },
          {
            q: 'A business expense is allowable for income tax purposes if it is:',
            opts: ['Approved by HMRC in writing before it is incurred', 'Incurred wholly and exclusively for the purposes of the trade', 'Under £500 in value and paid in the same tax year', 'Paid by bank transfer rather than cash or credit'],
            ans: 1,
            exp: 'The test for an allowable trading expense is: incurred wholly and exclusively for the purposes of the trade (ITTOIA 2005, s.34). HMRC pre-approval is not required; the size or payment method are not the determining factors.',
          },
          {
            q: 'Business Awareness at Level 3 (BUAW) builds most directly on which Level 2 unit?',
            opts: ['Introduction to Bookkeeping (ITBK)', 'Principles of Costing (POC)', 'The Business Environment (BESY)', 'Principles of Bookkeeping Controls (POBC)'],
            ans: 2,
            exp: 'BUAW at Level 3 extends the content from BESY at Level 2 — business structures, economic analysis, ethics, stakeholders, sustainability, and sources of finance. It applies these concepts in more complex, strategy-focused scenarios.',
          },
          {
            q: 'Which of the following is covered in Tax Processes for Businesses (TPFB) at Level 3 but is NOT covered at Level 2?',
            opts: ['Calculating 20% VAT on standard-rated supplies', 'Knowing the difference between input and output VAT', 'Calculating income tax on a sole trader\'s taxable profit', 'Recording VAT in the VAT control account'],
            ans: 2,
            exp: 'Income tax calculation for sole traders is first examined in TPFB at Level 3. VAT arithmetic, input/output VAT distinctions, and VAT ledger entries are all covered at Level 2 (ITBK and POBC).',
          },
        ],
      },
      {
        id: 'L-besy-15',
        title: 'Business communication and planning',
        icon: '✉️',
        skills: ['besy-comms'],
        cards: [
          {
            h: 'Why communication carries marks',
            p: [
              'The synoptic assessment has two human-marked tasks. Between them they carry roughly **a third of the paper**, and most of those marks are for explaining something clearly to someone else — a customer, a supplier, a colleague outside finance.',
              'The accounting can be perfect and still score badly. The marks are for whether the reader ends up understanding the position and knowing what happens next.',
            ],
          },
          {
            h: 'Match the medium to the message',
            p: [
              '**Email** — routine internal updates and most external account queries. Fast, creates a record, appropriate for the great majority of finance correspondence.',
              '**Formal letter** — serious or legal matters: a final demand, a notice of proceedings, a contractual notification. It carries weight and creates a dated, retrievable record.',
              '**Report** — analysis for a decision, where the reader needs structure, figures and a recommendation.',
              '**Telephone** — quick clarification and relationship repair, but it leaves no record. Follow up in writing when anything was agreed.',
            ],
          },
          {
            h: 'The structure that earns the marks',
            p: [
              'Almost every written task in the synoptic answers to the same four-part shape: **figure, cause, action, close.**',
              '**Figure** — state the specific amount in question. "There is a difference of £480" is worth marks; "there is a discrepancy" is not.',
              '**Cause** — name the document or event that caused it. "Invoice 4471 was raised after the order was cancelled."',
              '**Action** — say what you will do, concretely. "I will raise a credit note for £480 today."',
              '**Close** — a professional sign-off, and an invitation to come back if anything is still unclear.',
            ],
            example: {
              title: 'Figure, cause, action',
              rows: [
                ['Weak', '"There seems to be a problem with your account which we are looking into."'],
                ['Strong', '"Your statement shows £2,880 and your records show £2,400 — a difference of £480. Invoice 4471 was raised after you cancelled the order. I will issue a credit note for £480 today."'],
              ],
            },
          },
          {
            h: 'Writing for a non-finance reader',
            p: [
              'Assume the reader does not know what a control account is, and do not make them ask. Either avoid the term or define it in the same sentence.',
              'Write "the total we are owed by all credit customers" rather than "the SLCA balance". Write "an invoice we raised in error" rather than "an erroneous posting to the sales ledger".',
              'This is not dumbing down — it is the difference between a message that resolves the issue and one that generates three more emails.',
            ],
          },
          {
            h: 'Confidentiality in correspondence',
            p: [
              'Confidentiality applies to internal matters as well as customer data. A supplier chasing payment is entitled to know the invoice is being processed. They are not entitled to know which manager is on leave.',
              '"The invoice is going through our internal authorisation process and I expect it to clear in Friday\'s payment run" is honest, useful and discloses nothing it should not.',
              'Never disclose one customer\'s payment position to another party, and never copy third parties into an account dispute.',
            ],
          },
          {
            h: 'Planning tools you should recognise',
            p: [
              'The synoptic may ask about how a business plans, not just how it records. **Budgets** set a financial plan to measure actual performance against. **Business plans** set out objectives, market and financial forecasts, usually for lenders or investors.',
              '**SWOT** analyses strengths, weaknesses, opportunities and threats. **PESTLE** analyses the external environment: political, economic, social, technological, legal and environmental factors.',
              'A **mission statement** states the organisation\'s overall purpose — not its financial targets, which is the distinction most often tested.',
            ],
          },
        ],
      },
      {
        id: 'L-besy-16',
        title: 'The finance function and its information',
        icon: '🏛️',
        skills: ['besy-finance'],
        cards: [
          {
            h: 'What the finance function is for',
            p: [
              'The finance function exists to **record what happened and turn it into information other people can act on**. It is a service function, not a controlling one.',
              'It does not set prices, choose products or run operations. It gives the people who do those things the numbers they need, and it makes sure the organisation meets its legal reporting obligations.',
            ],
          },
          {
            h: 'Financial accounting vs management accounting',
            p: [
              '**Financial accounting** serves people outside the organisation — shareholders, lenders, suppliers, HMRC. It is regulated: statutory formats, accounting standards, statutory deadlines. It looks backwards at a completed period.',
              '**Management accounting** serves people inside the organisation. There is **no prescribed format** — a management report looks however it is most useful. It is often forward-looking: budgets, forecasts, decision support.',
              'The examiner\'s favourite trap is claiming management accounts must follow a statutory format. They must not, and need not.',
            ],
            example: {
              title: 'Two audiences',
              rows: [
                ['Financial', 'External · regulated format · historic · statutory deadlines'],
                ['Management', 'Internal · any useful format · often forward-looking · no deadline but the decision'],
              ],
            },
          },
          {
            h: 'Where the information comes from',
            p: [
              '**Internal sources** are generated by the organisation\'s own systems: the sales and purchase day books, payroll records, production output figures, inventory counts, timesheets.',
              '**External sources** come from outside: interest rates and inflation data, competitor pricing, supplier price lists, industry statistics, tax legislation.',
              'Crucially, information does not have to be financial to matter. Output volumes, staff turnover and customer complaints are all inputs the finance function converts into cost and performance measures.',
            ],
          },
          {
            h: 'What makes information useful',
            p: [
              '**Accurate** — right enough for the decision being made. **Complete** — nothing material missing. **Relevant** — bears on the decision at hand.',
              '**Timely** — this is the one most often tested. A report that is perfectly accurate and arrives after the decision has been made has almost no value. Speed and precision are a genuine trade-off, and the right balance depends on the decision.',
              '**Understandable** — pitched at the reader. **Cost-effective** — worth more than it costs to produce.',
            ],
          },
          {
            h: 'How finance works with the rest of the business',
            p: [
              'The flow runs **both ways**, and answers that show this score better than answers that do not.',
              'Finance needs operational data — it cannot cost a unit without knowing how many were made, cannot flex a budget without volumes, cannot value inventory without a count.',
              'In return, operations gets budgets built on real figures rather than guesses, variance analysis that separates price effects from volume effects, and evidence to support a case for investment.',
            ],
          },
          {
            h: 'Roles within the function, and why they are split',
            p: [
              '**Accounts receivable and credit control** — invoicing customers, monitoring balances against limits, chasing overdue amounts. **Accounts payable** — checking supplier invoices against orders and delivery notes, authorising and making payments.',
              '**Payroll** — gross pay, deductions, net pay and reporting to HMRC. **Management accounting** — budgets, costing and analysis. **Financial accounting** — statutory accounts and external filings.',
              'The split is deliberate. **Segregation of duties** means no single person can both cause an error or fraud and conceal it — the person who authorises a payment should not be the person who sets up the supplier.',
            ],
          },
          {
            h: 'Who the finance function answers to',
            p: [
              '**HMRC** receives tax returns and payments — corporation tax, VAT, PAYE. What it receives is not published.',
              '**Companies House** receives annual accounts and the confirmation statement, and those go on the **public register**. That public visibility is the trade-off for limited liability: a sole trader has unlimited liability and files nothing publicly.',
              'These are two different bodies wanting two different things. It is not duplication, and saying so earns marks.',
            ],
          },
        ],
      },
    ],
  },

  /* ══════════════════════════════════════════════════════════
     AAT LEVEL 3 — INTRODUCTORY UNITS
     ══════════════════════════════════════════════════════════ */
  {
    unit: 'faps',
    level: 3,
    preview: true,
    title: 'Financial Accounting: Preparing Financial Statements',
    lessons: [
      {
        id: 'L-avbk-1',
        title: 'The Extended Trial Balance',
        icon: '📋',
        skills: [],
        cards: [
          {
            h: 'What is the ETB?',
            p: [
              'The **extended trial balance (ETB)** is a working paper used at Level 3 to apply year-end adjustments before producing final accounts. It has four pairs of Dr/Cr columns: Trial Balance, Adjustments, Statement of Profit or Loss (P&L), and Statement of Financial Position (SFP).',
              'Each adjusted balance is carried into either the P&L columns (income and expense accounts) or the SFP columns (assets, liabilities, equity). Never both.',
              'The P&L columns will not balance on their own — the difference is the profit or loss, which is then transferred into the SFP equity column.',
            ],
          },
          {
            h: 'Accruals and Prepayments in the ETB',
            p: [
              '**Accruals** (expenses incurred but unpaid): debit the expense in P&L columns; credit a current liability in SFP columns.',
              '**Prepayments** (expenses paid in advance): credit the expense in P&L columns (reducing it); debit a current asset in SFP columns.',
              'Accrued income follows the same logic in reverse: credit income in P&L; debit a current asset in SFP.',
            ],
            callout: { kind: 'key', text: 'Accrual: expense ↑ P&L debit + SFP liability credit. Prepayment: expense ↓ P&L credit + SFP asset debit.' },
          },
          {
            h: 'Depreciation and Completing the ETB',
            p: [
              'The **depreciation charge** for the year is a P&L debit (expense). The **accumulated depreciation** sits in the SFP as a credit contra-asset, reducing the non-current asset to its carrying value.',
              'At Level 3 you must apply both straight-line (SL) and reducing balance (RB) methods. SL: (Cost − Residual) ÷ Life. RB: Carrying value × Rate%.',
              'Once all adjustments are in, total the P&L columns. The larger side determines profit (credit side larger = profit; debit the P&L shortfall, credit SFP capital). The SFP must then balance.',
            ],
            formula: 'SL = (Cost − Residual) ÷ Life · RB = Carrying value × Rate% · Carrying value = Cost − Accumulated depreciation',
          },
        ],
        check: [
          {
            q: 'An accrued expense of £800 at year end appears in the ETB as:',
            opts: [
              'Debit P&L expense column; credit SFP current liability column',
              'Credit P&L expense column; debit SFP current asset column',
              'Debit SFP current asset; credit P&L income column',
              'Only in the adjustments columns — it does not flow to final accounts',
            ],
            ans: 0,
            exp: 'An accrual increases the expense (P&L debit) and creates a current liability (SFP credit). Both the P&L and SFP columns are affected.',
          },
          {
            q: 'Straight-line depreciation on an asset costing £20,000 with a £2,000 residual value and 6-year life is:',
            opts: ['£3,000 per year', '£3,333 per year', '£18,000 per year', '£2,000 per year'],
            ans: 0,
            exp: '(£20,000 − £2,000) ÷ 6 = £18,000 ÷ 6 = £3,000 per year.',
          },
          {
            q: 'When the ETB P&L credit column total exceeds the debit column total, the difference represents:',
            opts: [
              'A loss, transferred as a debit to the SFP equity column',
              'A profit, transferred as a debit to the P&L columns and a credit to SFP equity',
              'A balancing error — both columns must always agree',
              'Accumulated depreciation carried forward',
            ],
            ans: 1,
            exp: 'Credits > debits in P&L = profit. The profit is the balancing debit in the P&L columns and the same figure is credited to SFP equity (retained earnings / capital). SFP columns then balance.',
          },
          {
            q: 'Accumulated depreciation in the SFP columns of the ETB is shown as:',
            opts: [
              'A debit (asset) reducing the non-current asset cost',
              'A credit (contra-asset) reducing the non-current asset to carrying value',
              'A P&L expense in the income column',
              'A current liability owed to HMRC',
            ],
            ans: 1,
            exp: 'Accumulated depreciation is a credit balance in the SFP — it is a contra-asset set against the non-current asset cost to show the carrying value (net book value).',
          },
        ],
      },
      {
        id: 'L-avbk-2',
        title: 'Incomplete Records & Asset Disposals',
        icon: '🔍',
        skills: [],
        cards: [
          {
            h: 'Incomplete Records',
            p: [
              'When full double-entry records do not exist, use available information to reconstruct figures. The **capital comparison method** finds profit without a P&L: Profit = Closing net assets − Opening net assets + Drawings − Capital introduced.',
              'You also use mark-up or margin to find missing sales or COGS values when only one is known.',
            ],
            formula: 'Profit = Closing NA − Opening NA + Drawings − Capital introduced · COGS = Opening inventory + Purchases − Closing inventory',
            callout: { kind: 'warning', text: '**Mark-up** is profit as % of cost. **Margin** is profit as % of selling price. A 25% mark-up = a 20% gross margin — these are not interchangeable.' },
          },
          {
            h: 'Asset Disposal Account',
            p: [
              'To remove a sold or scrapped asset from the books, open a **disposal account**:',
              '1. Transfer cost: Dr Disposal, Cr Non-current asset at cost.',
              '2. Transfer accumulated depreciation: Dr Accumulated depreciation, Cr Disposal.',
              '3. Record proceeds: Dr Bank (or new asset for part-exchange), Cr Disposal.',
              '4. Balance = profit on disposal (credit balance) or loss (debit balance) — transfer to P&L.',
            ],
          },
          {
            h: 'Part-Exchange Transactions',
            p: [
              'In a **part-exchange**, the old asset\'s agreed trade-in value is credited to the disposal account (as deemed proceeds) and debited to the new asset account as a deposit. The remaining balance is paid in cash.',
              'The disposal account still produces a profit or loss comparing the trade-in value to the old asset\'s carrying value — treated identically to a cash sale.',
            ],
            callout: { kind: 'key', text: 'Part-exchange allowance → credited to Disposal account (same as cash proceeds). New asset account is debited for the full cost; disposal handles the old asset separately.' },
          },
        ],
        check: [
          {
            q: 'Opening net assets £35,000; closing net assets £48,000; drawings £12,000; no new capital. Profit for the year is:',
            opts: ['£13,000', '£25,000', '£1,000', '£60,000'],
            ans: 1,
            exp: 'Profit = £48,000 − £35,000 + £12,000 = £25,000. Drawings are added back because they reduced net assets but were not a business expense.',
          },
          {
            q: 'A machine cost £25,000; accumulated depreciation £16,000; sold for £7,500. Result on disposal:',
            opts: [
              'Profit of £7,500',
              'Loss of £1,500',
              'Profit of £1,500',
              'Loss of £7,500',
            ],
            ans: 1,
            exp: 'Carrying value = £25,000 − £16,000 = £9,000. Proceeds £7,500. Loss = £9,000 − £7,500 = £1,500 adverse.',
          },
          {
            q: 'A trader applies a 331⁄3% mark-up on cost. Cost of goods sold was £60,000. Sales revenue was:',
            opts: ['£80,000', '£90,000', '£45,000', '£75,000'],
            ans: 0,
            exp: 'Mark-up 331⁄3% on cost: Sales = £60,000 × 4/3 = £80,000.',
          },
          {
            q: 'In a part-exchange transaction, the trade-in allowance on the old asset is recorded in the disposal account as:',
            opts: [
              'A debit, increasing the cost of the new asset',
              'A credit, representing deemed proceeds for the old asset',
              'A debit, writing off the remaining carrying value',
              'It is not recorded in the disposal account for a part-exchange',
            ],
            ans: 1,
            exp: 'The part-exchange allowance is credited to the disposal account — it is treated as non-cash proceeds received for the old asset. The same amount is debited to the new asset account.',
          },
        ],
      },
      {
        id: 'L-faps-1',
        title: 'Sole Trader Financial Statements',
        icon: '📑',
        skills: [],
        cards: [
          {
            h: 'Statement of Profit or Loss',
            p: [
              'The **statement of profit or loss (SPL)** shows Revenue − Cost of goods sold = **Gross profit**, then Gross profit − Expenses = **Net profit**.',
              'COGS = Opening inventory + Purchases − Closing inventory. Expenses include depreciation, wages, rent — all charged on an accruals basis.',
              'Inventory is valued at the **lower of cost and net realisable value (NRV)**. If NRV falls below cost, write inventory down to NRV — a key Level 3 concept.',
            ],
            formula: 'COGS = Opening inventory + Purchases − Closing inventory · Gross profit = Revenue − COGS · Net profit = Gross profit − Expenses',
          },
          {
            h: 'Statement of Financial Position',
            p: [
              'The **SFP** is a snapshot of assets, liabilities and equity at the period end.',
              'Non-current assets appear at carrying value (cost − accumulated depreciation). Current assets include inventory, receivables, prepayments, and bank/cash. Current liabilities include payables, accruals, and bank overdraft.',
              '**Net assets = Total assets − Total liabilities = Equity (capital)**.',
            ],
          },
          {
            h: 'Equity and Drawings',
            p: [
              'Equity reconciliation: Opening capital + Net profit − Drawings = Closing capital.',
              '**Drawings are never an expense** — they reduce equity in the SFP, not profit in the P&L.',
              'Additional capital introduced during the year is added to opening capital before deducting drawings.',
            ],
            example: {
              title: 'Equity section',
              rows: [['Item','£'],['Opening capital','42,000'],['Add: Net profit','16,800'],['Less: Drawings','(11,200)'],['Closing capital','47,600']],
            },
          },
        ],
        check: [
          {
            q: 'Opening inventory £8,000; purchases £74,000; closing inventory £11,000; sales £120,000. What is gross profit?',
            opts: ['£49,000', '£46,000', '£71,000', '£120,000'],
            ans: 0,
            exp: 'COGS = £8,000 + £74,000 − £11,000 = £71,000. Gross profit = £120,000 − £71,000 = £49,000.',
          },
          {
            q: 'Inventory costing £4,000 has an estimated selling price of £3,500 and selling costs of £200. It should be valued at:',
            opts: ['£4,000 (cost)', '£3,500 (selling price)', '£3,300 (NRV)', '£3,700 (selling price less half the costs)'],
            ans: 2,
            exp: 'NRV = £3,500 − £200 = £3,300. Since NRV (£3,300) < cost (£4,000), inventory is written down to £3,300 (lower of cost and NRV).',
          },
          {
            q: 'Opening capital £28,000; profit £14,500; drawings £9,000. Closing capital is:',
            opts: ['£33,500', '£51,500', '£23,500', '£42,500'],
            ans: 0,
            exp: '£28,000 + £14,500 − £9,000 = £33,500.',
          },
          {
            q: 'Non-current assets appear in the SFP at:',
            opts: [
              'Original cost',
              'Current market value',
              'Cost less accumulated depreciation (carrying value)',
              'Replacement cost',
            ],
            ans: 2,
            exp: 'Non-current assets are carried at historical cost less accumulated depreciation — the carrying value (net book value). Market or replacement cost is not used under historical cost accounting.',
          },
        ],
      },
      {
        id: 'L-faps-2',
        title: 'Partnership Accounts',
        icon: '🤝',
        skills: [],
        cards: [
          {
            h: 'Partnership Basics and the 1890 Act',
            p: [
              'A **partnership** is two or more people carrying on business in common with a view to profit. If there is no partnership agreement, the **Partnership Act 1890** applies: profits shared equally, no salaries, no interest on capital, 5% interest on loans.',
              'A partnership agreement overrides the Act on all points it covers — always check which applies before dividing profit.',
            ],
            callout: { kind: 'key', text: 'PA 1890 default: equal profit share regardless of capital. A very common exam trap is assuming profits split by capital ratio.' },
          },
          {
            h: 'Appropriation Account',
            p: [
              'After the P&L arrives at net profit, the **appropriation account** divides that profit among partners.',
              'Order: (1) Deduct partners\' salaries. (2) Deduct interest on capital. (3) Add back interest on drawings (these reduce the partner\'s allocation). (4) Share residual profit in the profit-sharing ratio (PSR).',
              'Salaries and interest on capital are credits to partners\' current accounts. Interest on drawings is a debit to current accounts.',
            ],
          },
          {
            h: 'Current Accounts and Goodwill',
            p: [
              'Each partner has a fixed **capital account** and a fluctuating **current account**. The current account receives salary, interest on capital, and profit share; it is debited for drawings and interest on drawings.',
              'A debit balance on a current account means the partner has overdrawn — shown as an asset (amount owed to the firm) in the SFP.',
              'On admission or retirement, **goodwill** is raised in the old PSR (Cr capital accounts) then immediately written off in the new PSR (Dr capital accounts), so no goodwill remains on the SFP.',
            ],
          },
        ],
        check: [
          {
            q: 'No partnership agreement exists. How is profit shared under the Partnership Act 1890?',
            opts: [
              'In proportion to each partner\'s capital balance',
              'Equally between all partners',
              'In proportion to hours worked',
              'Two-thirds to the senior partner, one-third to the junior',
            ],
            ans: 1,
            exp: 'The Partnership Act 1890 default is equal profit sharing. Salaries, interest on capital, and interest on drawings do not apply unless the partnership agreement says so.',
          },
          {
            q: 'Partners\' salaries in the appropriation account are:',
            opts: [
              'An expense in the main P&L, reducing net profit',
              'An appropriation of profit, deducted before sharing the residual',
              'Treated the same as drawings and not deducted in the appropriation account',
              'Only applicable if partners work full-time in the business',
            ],
            ans: 1,
            exp: 'Partners\' salaries are an appropriation — they come out of profit in the appropriation account, not as an expense in the P&L.',
          },
          {
            q: 'When a new partner joins and goodwill is £30,000, existing partners A and B share profits 3:2. How much goodwill is credited to A\'s capital?',
            opts: ['£15,000', '£18,000', '£10,000', '£30,000'],
            ans: 1,
            exp: 'Goodwill is raised in the OLD ratio (3:2). A\'s share = 3/5 × £30,000 = £18,000.',
          },
          {
            q: 'A partner\'s current account shows a debit balance. This means:',
            opts: [
              'The firm owes the partner money',
              'The partner has over-drawn and owes money to the firm',
              'The partner\'s capital has increased beyond their opening investment',
              'No significance — debit balances are normal for current accounts',
            ],
            ans: 1,
            exp: 'A debit balance on a current account is an overdrawn account — the partner has taken more than they have been allocated. It appears as an asset in the SFP (debtor).',
          },
        ],
      },
    ],
  },
  {
    unit: 'mats',
    level: 3,
    preview: true,
    title: 'Management Accounting Techniques',
    lessons: [
      {
        id: 'L-mats-1',
        title: 'Overhead Absorption & Recovery',
        icon: '🏭',
        skills: [],
        cards: [
          {
            h: 'Overhead Absorption Rates',
            p: [
              'Overheads are indirect costs that cannot be directly traced to a product. They are shared between cost centres through **allocation and apportionment**, then charged to products using an **overhead absorption rate (OAR)**.',
              'OAR = Budgeted overheads ÷ Budgeted activity. Common bases: labour hours, machine hours, or units of output. Machine hours suit automated factories; labour hours suit labour-intensive production.',
              'Overhead absorbed into a product = OAR × Actual activity achieved.',
            ],
            formula: 'OAR = Budgeted overheads ÷ Budgeted activity · Absorbed overhead = OAR × Actual activity',
            callout: { kind: 'key', text: 'OAR is calculated using BUDGETED figures. Actual overhead spend is only known at year end. You absorb at the pre-determined OAR throughout the year.' },
          },
          {
            h: 'Under and Over Absorption',
            p: [
              'At year end compare: **Overhead absorbed** (OAR × actual activity) vs **Overhead incurred** (actual spend).',
              '**Over-absorbed**: absorbed > incurred → credit to P&L (profit improves — too much was charged to products, so we reverse the excess).',
              '**Under-absorbed**: absorbed < incurred → debit to P&L (profit reduces — not enough was charged to products, so the remaining cost hits P&L).',
            ],
            formula: 'Over-absorption = Absorbed − Incurred (positive → credit P&L) · Under-absorption = Incurred − Absorbed (positive → debit P&L)',
          },
          {
            h: 'Marginal vs Absorption Costing',
            p: [
              'Under **absorption costing**: fixed overheads are included in unit cost and carried in inventory valuation. When inventory rises, some fixed overhead is deferred in stock — profit is higher than under marginal costing.',
              'Under **marginal costing**: fixed overheads are period costs, expensed in full regardless of production volume. Only variable costs go into inventory.',
              'Reconciliation: Absorption profit − Marginal profit = Change in inventory units × Fixed OAR per unit.',
            ],
            callout: { kind: 'tip', text: 'If production > sales (inventory builds), absorption profit > marginal profit. If production < sales (inventory falls), absorption profit < marginal profit.' },
          },
        ],
        check: [
          {
            q: 'Budgeted overheads £216,000; budgeted labour hours 54,000. OAR is:',
            opts: ['£4.00 per hour', '£54.00 per hour', '£0.25 per hour', '£216.00 per hour'],
            ans: 0,
            exp: 'OAR = £216,000 ÷ 54,000 = £4.00 per labour hour.',
          },
          {
            q: 'Overhead incurred £88,000; overhead absorbed £94,500. The result is:',
            opts: [
              'Under-absorption £6,500 — debit P&L',
              'Over-absorption £6,500 — credit P&L',
              'Over-absorption £6,500 — debit P&L',
              'Under-absorption £6,500 — credit P&L',
            ],
            ans: 1,
            exp: 'Absorbed (£94,500) > Incurred (£88,000) = over-absorbed by £6,500. Over-absorption is a credit to P&L — we charged products more than was actually spent.',
          },
          {
            q: 'Under marginal costing, fixed production overheads are:',
            opts: [
              'Included in inventory values and deferred until units are sold',
              'Charged entirely as period costs in the current accounting period',
              'Absorbed using a machine hour OAR',
              'Split equally between units produced and units sold',
            ],
            ans: 1,
            exp: 'Marginal costing treats fixed overheads as period costs — expensed in full when incurred, regardless of units produced. Only variable costs appear in inventory values.',
          },
          {
            q: 'When inventory levels rise between periods, which statement is correct?',
            opts: [
              'Marginal costing profit exceeds absorption costing profit',
              'Absorption costing profit exceeds marginal costing profit',
              'Both methods always produce the same profit',
              'The difference depends only on variable costs per unit',
            ],
            ans: 1,
            exp: 'Rising inventory means more fixed overhead is carried forward in stock under absorption costing (deferred, not yet in P&L). Marginal costing expenses all fixed overhead immediately, so marginal profit is lower.',
          },
        ],
      },
      {
        id: 'L-mats-2',
        title: 'Variance Analysis',
        icon: '📊',
        skills: [],
        cards: [
          {
            h: 'What Are Variances?',
            p: [
              'A **variance** is the difference between a standard (budgeted) cost or revenue and the actual outcome.',
              '**Favourable (F)**: actual cost < standard (good for profit) or actual revenue > budget.',
              '**Adverse (A)**: actual cost > standard (bad for profit) or actual revenue < budget.',
              'Variance analysis helps management identify where and why performance deviated from plan.',
            ],
          },
          {
            h: 'Material Variances',
            p: [
              '**Price variance**: (Standard price − Actual price) × Actual quantity purchased.',
              '**Usage variance**: (Standard quantity for actual output − Actual quantity used) × Standard price.',
              '**Total material variance** = Price variance + Usage variance.',
            ],
            formula: 'Price = (SP − AP) × AQ · Usage = (SQ − AQ) × SP',
            callout: { kind: 'warning', text: 'Price variance uses ACTUAL quantity purchased. Usage variance uses STANDARD price. Mixing these is the most common exam error at Level 3.' },
          },
          {
            h: 'Labour Variances and Interdependencies',
            p: [
              '**Rate variance**: (Standard rate − Actual rate) × Actual hours paid.',
              '**Efficiency variance**: (Standard hours for actual output − Actual hours worked) × Standard rate.',
              'Variances are often interdependent: cheaper materials (favourable price) may cause higher wastage (adverse usage). Cheaper labour (favourable rate) may be less skilled, causing slower output (adverse efficiency).',
            ],
            formula: 'Rate = (SR − AR) × AH · Efficiency = (SH − AH) × SR',
          },
        ],
        check: [
          {
            q: 'Standard price £4.00/kg; actual price £4.35/kg; actual quantity purchased 600 kg. Material price variance:',
            opts: ['£210 adverse', '£210 favourable', '£2,400 adverse', '£2,610 favourable'],
            ans: 0,
            exp: '(£4.00 − £4.35) × 600 = −£0.35 × 600 = −£210 = £210 adverse (paid more than standard).',
          },
          {
            q: 'Standard hours for actual output: 720 hours. Actual hours worked: 780 hours. Standard rate £10/hr. Labour efficiency variance:',
            opts: ['£600 adverse', '£600 favourable', '£7,200 adverse', '£7,800 favourable'],
            ans: 0,
            exp: '(720 − 780) × £10 = −60 × £10 = −£600 = £600 adverse (worked more hours than standard).',
          },
          {
            q: 'A favourable material price variance alongside an adverse usage variance most likely indicates:',
            opts: [
              'A fall in market prices for the material, with no quality change',
              'Cheaper material was purchased which resulted in higher wastage',
              'More units were produced than budgeted',
              'Labour worked more efficiently, using material faster',
            ],
            ans: 1,
            exp: 'Buying cheaper (favourable price) but lower-quality material often results in more waste in production (adverse usage). This is a classic interdependency that an examiner will ask you to explain.',
          },
          {
            q: 'The total material variance equals:',
            opts: [
              'Material price variance only',
              'Material usage variance only',
              'Material price variance plus material usage variance',
              'Standard cost of actual output divided by actual cost',
            ],
            ans: 2,
            exp: 'Total material variance = Price variance + Usage variance. It can also be calculated directly as (Standard cost of actual output) − (Actual cost of actual output).',
          },
        ],
      },
    ],
  },
  {
    unit: 'tpfb',
    level: 3,
    preview: true,
    title: 'Tax Processes for Businesses',
    lessons: [
      {
        id: 'L-tpfb-1',
        title: 'VAT Schemes & Returns',
        icon: '🧾',
        skills: [],
        cards: [
          {
            h: 'VAT Registration and Rates',
            p: [
              'Businesses must register for VAT when taxable turnover exceeds the threshold (£90,000 from April 2024). Voluntary registration is allowed below this threshold and allows input VAT recovery.',
              '**Standard rate 20%** (most goods/services). **Reduced rate 5%** (domestic fuel, child car seats). **Zero rate 0%** (food, books, children\'s clothes) — taxable at 0%, input VAT reclaimable. **Exempt** (financial services, education) — outside VAT, input VAT NOT reclaimable.',
            ],
            callout: { kind: 'warning', text: 'Zero-rated ≠ Exempt. Zero-rated businesses CAN reclaim input VAT on costs. Exempt businesses CANNOT. This distinction is heavily tested.' },
          },
          {
            h: 'VAT Schemes',
            p: [
              '**Cash accounting**: account for VAT when cash is received/paid (not on invoice). Protects against bad debts. Threshold: taxable turnover ≤ £1.35m.',
              '**Annual accounting**: one VAT return per year; pay 9 monthly or 3 quarterly instalments (based on prior year); balancing payment with return. Threshold ≤ £1.35m.',
              '**Flat rate**: pay a fixed sector % of gross (VAT-inclusive) turnover to HMRC. No separate input/output VAT calculation. Threshold ≤ £150,000.',
            ],
          },
          {
            h: 'Completing a VAT Return',
            p: [
              'Key boxes: **Box 1** = output VAT; **Box 4** = input VAT; **Box 5** = VAT payable (Box 1 − Box 4); **Box 6** = net sales; **Box 7** = net purchases.',
              'Returns are submitted quarterly online via Making Tax Digital (MTD) software. Payment is due one month and seven days after the end of the VAT period.',
            ],
            callout: { kind: 'key', text: 'Box 5 = Box 1 − Box 4. Positive = pay HMRC. Negative = HMRC repays you.' },
          },
        ],
        check: [
          {
            q: 'Which VAT scheme accounts for VAT only when cash is received from customers?',
            opts: ['Annual accounting scheme', 'Flat rate scheme', 'Cash accounting scheme', 'Standard VAT accounting'],
            ans: 2,
            exp: 'The cash accounting scheme uses cash receipt/payment dates rather than invoice dates. It helps businesses avoid paying VAT on invoices that customers have not yet paid.',
          },
          {
            q: 'Output VAT £18,400; input VAT £11,600. VAT payable to HMRC is:',
            opts: ['£30,000', '£11,600', '£18,400', '£6,800'],
            ans: 3,
            exp: 'Box 5 = £18,400 − £11,600 = £6,800 payable to HMRC.',
          },
          {
            q: 'Children\'s school uniforms are zero-rated. A retailer selling only these can:',
            opts: [
              'Not register for VAT at all — zero-rated means outside the VAT system',
              'Register (or voluntarily register) and reclaim input VAT on costs',
              'Charge 5% VAT on sales as the reduced rate applies',
              'Only reclaim input VAT if turnover exceeds the registration threshold',
            ],
            ans: 1,
            exp: 'Zero-rated supplies are taxable at 0%. The business can register for VAT and reclaim input VAT on all business purchases. This is one of the main benefits of zero-rating over exempt status.',
          },
          {
            q: 'Under the flat rate scheme, VAT is calculated as:',
            opts: [
              'Output VAT minus input VAT as normal',
              'A fixed sector percentage of gross (VAT-inclusive) turnover',
              'A fixed sector percentage of net (VAT-exclusive) turnover',
              'Cash received from customers multiplied by 20%',
            ],
            ans: 1,
            exp: 'The flat rate scheme applies a fixed % (set per business sector) to gross turnover (including VAT). This simplifies administration and may produce a profit if the flat rate is lower than the effective standard rate.',
          },
        ],
      },
      {
        id: 'L-tpfb-2',
        title: 'Payroll: employer duties and RTI',
        icon: '💷',
        skills: [],
        cards: [
          {
            h: 'What payroll actually asks of an employer',
            p: [
              'Payroll is operated by anyone who employs staff, and **HMRC is the tax authority for it**. Registering as an employer is required before the first payday, not after it.',
              'HMRC can compel compliance on registration, record keeping, submitting returns and paying what is due — and it has rights of **inspection of records and visits**.',
              'Records must be kept in a prescribed form, held for the required retention period, and — because they are employee personal data — handled under data protection principles.',
            ],
            callout: { kind: 'key', text: 'At Level 3 you are examined on the **employer\'s obligations and the process**, not on computing the tax itself. That distinction is what the whole outcome turns on.' },
          },
          {
            h: 'The four pay figures, and why they differ',
            p: [
              '**Gross pay** is everything earned before any deduction.',
              '**Taxable gross pay** is gross pay after deductions that reduce taxable earnings — most commonly an occupational pension contribution.',
              '**Taxable pay** is the figure PAYE is actually applied to.',
              '**Net pay** is what reaches the employee once every deduction has been taken.',
            ],
            split: {
              left: { title: 'Statutory deductions', items: ['Pay As You Earn (PAYE)', 'National Insurance contributions', 'Student loan repayments', 'Pension contributions'] },
              right: { title: 'Non-statutory deductions', items: ['Trade union subscriptions', 'Charitable giving via payroll', 'Season ticket or other loan repayments', 'Attachment of earnings, where ordered'] },
            },
            examtrap: 'Statutory deductions are required by law; non-statutory ones need the employee\'s agreement. Being asked to sort a list into the two is a standard task.',
          },
          {
            h: 'Reconciling gross to net',
            p: [
              'The assessment gives you the figures and asks you to **reconcile** them — work down from gross pay to net pay, or across to taxable gross pay, showing that the deductions account for the difference.',
              'The amount due to HMRC is not the same as the deductions from the employee: it is employee PAYE and NIC **plus the employer\'s own NIC**, which never appears on the payslip.',
            ],
            formula: 'Net pay = Gross pay − PAYE − Employee NIC − Student loan − Pension · Due to HMRC = PAYE + Employee NIC + Employer NIC + Student loan',
            callout: { kind: 'warning', text: '**Excluded from this unit:** calculating Income Tax, National Insurance or student loan repayments. You will always be *given* those figures. Marks are for handling and reconciling them, not deriving them.' },
          },
          {
            h: 'The forms, and who gets which',
            table: {
              headers: ['Form', 'Purpose', 'When'],
              rows: [
                ['Starter checklist', 'Collects details for a new employee with no P45', 'Before the first payday'],
                ['Payslip', 'Shows gross pay, deductions and net pay', 'On or before every payday'],
                ['P45', 'Issued when an employee leaves', 'On leaving'],
                ['P60', 'End-of-year summary of pay and deductions', 'After the tax year end'],
                ['P11D', 'Reports expenses and benefits provided', 'After the tax year end'],
                ['P11D(b)', 'Employer\'s declaration and Class 1A NIC due on those benefits', 'With the P11D'],
              ],
            },
            p: [
              'Employers must not only produce these but **distribute them within the required time period** — a late P60 is a compliance failure in its own right.',
              'Benefits can be handled two ways: reported after the year on a **P11D**, or **payrolled** — taxed through the payroll as they are provided, so no P11D is needed for those benefits. The P11D(b) and its Class 1A charge still apply.',
            ],
          },
          {
            h: 'Real Time Information',
            p: [
              'Payroll is reported to HMRC under **Real Time Information (RTI)** — submissions happen on or before each payday, not once a year.',
              'A **Full Payment Submission (FPS)** reports what each employee was paid and what was deducted. An **Employer Payment Summary (EPS)** reports adjustments that the FPS cannot carry, such as statutory pay recovered or a nil-payment month.',
              'Employee changes — starters, leavers, changes of circumstance — must also be reported within the required timescale.',
            ],
            callout: { kind: 'warning', text: 'Late returns and late payment both carry consequences. Know that penalties exist and what triggers them; the unit tests the obligation and the deadline, not a penalty computation.' },
          },
        ],
        check: [
          {
            q: 'Which of these is a NON-statutory deduction from gross pay?',
            opts: [
              'A trade union subscription the employee has agreed to',
              'Pay As You Earn (PAYE) income tax',
              'Employee National Insurance contributions',
              'Student loan repayments collected through payroll',
            ],
            ans: 0,
            exp: 'Statutory deductions are required by law: PAYE, NIC, student loan repayments and pension contributions. A union subscription is deducted only because the employee has agreed to it, which makes it non-statutory.',
          },
          {
            q: 'Gross pay is £2,400. PAYE is £280, employee NIC £142, and pension £120. What is net pay?',
            opts: ['£1,858', '£1,978', '£2,120', '£1,738'],
            ans: 0,
            exp: 'Net pay = £2,400 − £280 − £142 − £120 = £1,858. Note that employer NIC is not deducted from the employee and so plays no part in this figure.',
          },
          {
            q: 'Which form is issued to an employee when they leave part-way through a tax year?',
            opts: ['A P45', 'A P60', 'A P11D', 'A starter checklist'],
            ans: 0,
            exp: 'A P45 is issued on leaving. A P60 summarises a full tax year for someone still employed at the year end; a P11D reports benefits; a starter checklist is completed by a new employee who has no P45.',
          },
          {
            q: 'Under RTI, what does an Employer Payment Summary (EPS) do that a Full Payment Submission cannot?',
            opts: [
              'Report adjustments such as statutory pay recovered, or a month with no payments to employees',
              'Report the pay and deductions for each individual employee on a payday',
              'Replace the requirement to issue payslips to employees',
              'Calculate the income tax and National Insurance due for each employee',
            ],
            ans: 0,
            exp: 'The FPS reports what each employee was paid and what was deducted. The EPS carries what the FPS cannot — recovered statutory payments and nil-payment periods. Neither calculates anybody\'s tax; payroll software does that from figures the employer supplies.',
          },
          {
            type: 'truefalse',
            q: 'Decide whether each statement about employer payroll duties is true or false.',
            statements: [
              { text: 'HMRC has the right to inspect payroll records and to visit business premises.', answer: true },
              { text: 'Payroll records may be destroyed as soon as the tax year ends.', answer: false },
              { text: 'Employee payroll data is personal data and is subject to data protection principles.', answer: true },
              { text: 'Employers must register with HMRC before the first payday.', answer: true },
            ],
            exp: 'HMRC can inspect and visit; records must be retained for the required period rather than destroyed at the year end; employee data is personal data; and registration comes before the first payday, not after it.',
          },
        ],
      },
    ],
  },
  {
    unit: 'buaw',
    level: 3,
    preview: true,
    title: 'Business Awareness',
    lessons: [
      {
        id: 'L-buaw-1',
        title: 'Corporate Governance & Company Law',
        icon: '🏛️',
        skills: [],
        cards: [
          {
            h: 'The Companies Act 2006',
            p: [
              'The **Companies Act 2006** governs UK companies. A company is a **separate legal entity** — it can enter contracts, own property, and sue/be sued in its own name, distinct from its shareholders.',
              '**Private limited company (Ltd)**: cannot offer shares to the public. **Public limited company (PLC)**: can list shares on a stock exchange; minimum share capital £50,000; annual accounts filed within 6 months.',
              'Every company needs at least one director and one shareholder. Accounts and an annual confirmation statement must be filed at Companies House.',
            ],
          },
          {
            h: 'Directors\' Duties (CA 2006)',
            p: [
              'Seven statutory duties under CA 2006:',
              '1. Act within powers. 2. **Promote the success of the company** (s.172 — must consider employees, suppliers, community, environment, long-term consequences). 3. Exercise independent judgement. 4. Exercise reasonable care, skill and diligence. 5. Avoid conflicts of interest. 6. Not accept third-party benefits. 7. Declare interests in transactions.',
              'Directors can face personal liability for breach of duty, wrongful trading, or fraudulent trading.',
            ],
            callout: { kind: 'key', text: 's.172 "promote the success" is broader than profit maximisation — it explicitly includes employees, business relationships, community and environmental impact. Scenarios at Level 3 will test this.' },
          },
          {
            h: 'Corporate Governance and Stakeholders',
            p: [
              '**Corporate governance** = systems and processes directing and controlling a company. The UK Corporate Governance Code (listed PLCs) covers board leadership, effectiveness, accountability, and remuneration.',
              'Key structures: independent **non-executive directors (NEDs)**, audit committee, remuneration committee.',
              '**Principal-agent problem**: managers (agents) may act in their own interest, not shareholders\' (principals). Governance structures — including NEDs and performance pay — aim to align incentives.',
              '**Stakeholders**: anyone affected by the company — shareholders, employees, customers, suppliers, lenders, community, government. CSR means managing the business ethically with regard to all stakeholders.',
            ],
          },
        ],
        check: [
          {
            q: 'Which statement correctly distinguishes a Ltd from a PLC?',
            opts: [
              'A Ltd can offer shares to the public; a PLC cannot',
              'A PLC can offer shares to the public; a Ltd cannot',
              'Only a Ltd has limited liability; a PLC has unlimited liability',
              'A PLC must have fewer shareholders than a Ltd',
            ],
            ans: 1,
            exp: 'A PLC can offer shares to the general public and list on a stock exchange. A private limited company (Ltd) cannot offer shares to the public — that is the key distinction.',
          },
          {
            q: 'The duty under s.172 CA 2006 to "promote the success of the company" requires directors to consider:',
            opts: [
              'Only the financial returns to majority shareholders',
              'Long-term consequences, employees, community, and the environment',
              'Maximising short-term profit and dividend payments',
              'The personal financial interests of the directors',
            ],
            ans: 1,
            exp: 's.172 requires regard for a wide range of factors including employees, business relationships, the community, and environmental impact — not just profit for shareholders.',
          },
          {
            q: 'The principal-agent problem in corporate governance refers to:',
            opts: [
              'Disputes between the company\'s solicitors and auditors',
              'The risk that managers act in their own interest rather than shareholders\'',
              'Conflict between the CEO and the board chairperson',
              'Difficulty appointing qualified non-executive directors',
            ],
            ans: 1,
            exp: 'Shareholders (principals) delegate control to managers (agents). If managers pursue personal goals rather than maximising shareholder value, a principal-agent problem exists. Governance structures aim to align incentives.',
          },
          {
            q: 'An independent non-executive director (NED) primarily provides:',
            opts: [
              'Day-to-day operational management',
              'Objective challenge and oversight of executive management',
              'External audit services',
              'Legal advice on all board decisions',
            ],
            ans: 1,
            exp: 'NEDs are independent of management. They challenge executive decisions, serve on audit and remuneration committees, and protect shareholder interests — they do not manage operations.',
          },
        ],
      },
      {
        id: 'L-buaw-2',
        title: 'The Economic Environment',
        icon: '🌐',
        skills: [],
        cards: [
          {
            h: 'Macroeconomic Indicators',
            p: [
              '**GDP**: total value of all goods and services produced. Two consecutive quarters of negative GDP growth = **recession**.',
              '**Inflation**: general rise in price levels; measured by CPI. Bank of England targets 2% CPI. High inflation erodes purchasing power and squeezes business margins.',
              '**Unemployment**: affects consumer spending and labour costs. **Interest rates** (set by the Bank of England) affect borrowing costs for businesses and consumers.',
            ],
          },
          {
            h: 'Fiscal and Monetary Policy',
            p: [
              '**Fiscal policy** (government): taxation and public spending. Expansionary fiscal policy (cut taxes/increase spending) stimulates demand. Contractionary policy reduces demand to control inflation.',
              '**Monetary policy** (Bank of England): base rate changes. Raising rates increases borrowing costs → reduces spending and investment → dampens inflation. Lowering rates stimulates the economy.',
              '**Quantitative easing (QE)**: Bank of England creates money to buy bonds, expanding money supply and stimulating lending.',
            ],
            split: {
              left: { title: 'Fiscal (Government)', items: ['Tax changes', 'Public spending', 'Budget surplus/deficit'] },
              right: { title: 'Monetary (Bank of England)', items: ['Base interest rate', 'CPI target 2%', 'Quantitative easing'] },
            },
          },
          {
            h: 'Competition and Globalisation',
            p: [
              '**Porter\'s Five Forces**: threat of new entrants, bargaining power of suppliers, bargaining power of buyers, threat of substitutes, competitive rivalry. Used to analyse industry attractiveness.',
              '**Business cycle**: expansion → peak → contraction/recession → trough → recovery.',
              '**Globalisation** gives access to wider markets and lower-cost inputs, but increases competition and supply chain risk. Technology (cloud accounting, AI, automation) is reshaping the finance function.',
            ],
            callout: { kind: 'tip', text: 'Exam scenarios often link economic events to business decisions. Rising interest rates → higher loan costs → reduced capital investment. Recession → falling consumer demand → lower sales forecasts.' },
          },
        ],
        check: [
          {
            q: 'The Bank of England raises the base rate from 4.5% to 5.25%. The most likely immediate effect is:',
            opts: [
              'Borrowing becomes cheaper, encouraging more investment',
              'The cost of variable-rate borrowing increases for businesses',
              'Government spending automatically rises to offset the impact',
              'Consumer prices fall immediately as businesses absorb costs',
            ],
            ans: 1,
            exp: 'Higher base rates increase the cost of borrowing for businesses with variable-rate debt and make new loans more expensive. This typically reduces investment and spending — the intended mechanism to reduce inflation.',
          },
          {
            q: 'A recession is defined as:',
            opts: [
              'A single quarter of falling GDP',
              'Two consecutive quarters of negative GDP growth',
              'Annual inflation above 5%',
              'Unemployment above 10% of the workforce',
            ],
            ans: 1,
            exp: 'A recession is technically two consecutive quarters of negative GDP growth. One bad quarter is a contraction but not a recession.',
          },
          {
            q: 'Which of the following is a fiscal policy tool?',
            opts: [
              'The Bank of England cutting its base interest rate',
              'The government increasing income tax rates',
              'Quantitative easing by the central bank',
              'A fall in the pound\'s exchange rate',
            ],
            ans: 1,
            exp: 'Fiscal policy involves government decisions on taxation and public spending. Increasing income tax is a contractionary fiscal measure. Interest rates and QE are monetary policy tools managed by the Bank of England.',
          },
          {
            q: 'Porter\'s Five Forces is used to:',
            opts: [
              'Calculate overhead absorption rates',
              'Analyse competitive intensity within an industry',
              'Assess a company\'s liquidity position',
              'Set the optimal price for a new product',
            ],
            ans: 1,
            exp: 'Porter\'s Five Forces analyses the structural attractiveness of an industry by examining five sources of competitive pressure: existing rivalry, new entrants, substitutes, buyer power, and supplier power.',
          },
        ],
      },
    ],
  },
];
