/* AAT Level 2 Synoptic Practice — Learning Journey content */
window.LEARN_PATH = [
  {
    unit: 'itbk',
    title: 'Introduction to Bookkeeping',
    lessons: [
      {
        id: 'L-itbk-1',
        title: 'The story of a transaction',
        icon: '📄',
        skills: ['itbk-docs'],
        cards: [
          {
            h: 'Every sale leaves a paper trail',
            p: [
              'A credit sale is not one document — it is a chain of them. Each document has a job, and the order matters.',
              'The buyer sends a **purchase order** to say what they want. The seller delivers the goods with a **delivery note**, then sends an **invoice** asking for payment.',
              'If something is wrong — damaged goods, an overcharge — the seller issues a **credit note** to reduce the amount owed.',
            ],
            flow: ['Purchase order', 'Delivery note', 'Invoice', 'Credit note', 'Statement', 'Remittance advice'],
          },
          {
            h: 'Statements and remittance advice',
            p: [
              'At the end of the month the seller sends a **statement of account** — a summary of all invoices, credit notes and payments, showing what is still owed.',
              'When the buyer pays, they send a **remittance advice** listing exactly which invoices the payment covers. It helps the seller match the money to the right invoices.',
            ],
          },
          {
            h: 'Books of prime entry',
            p: [
              'Documents are first recorded in a **book of prime entry** (a day book) before anything touches the ledgers. This keeps the ledgers tidy.',
              'Sales invoices go in the **sales day book**. Credit notes you issue go in the **sales returns day book**. Purchase invoices go in the **purchases day book**, and credit notes you receive go in the **purchases returns day book**.',
              'Money in and out goes through the **cash book**, small cash payments through the **petty cash book**, and anything unusual through the **journal**.',
            ],
          },
          {
            h: 'Which document, which book?',
            p: [
              'A quick test: ask **whose document is it** and **which direction is it going**.',
              'An invoice you send is a sales invoice — sales day book. An invoice you receive is a purchase invoice — purchases day book. The same logic works for credit notes.',
            ],
            example: {
              title: 'Document to day book',
              rows: [
                ['Sales invoice issued', 'Sales day book'],
                ['Credit note issued', 'Sales returns day book'],
                ['Purchase invoice received', 'Purchases day book'],
                ['Credit note received', 'Purchases returns day book'],
              ],
            },
          },
        ],
        check: [
          {
            q: 'Which document does the buyer send to start a credit purchase?',
            opts: ['Delivery note', 'Purchase order', 'Statement', 'Invoice'],
            ans: 1,
            exp: 'The purchase order comes first — it tells the seller what the buyer wants.',
          },
          {
            q: 'A seller overcharged a customer on an invoice. Which document corrects this?',
            opts: ['Remittance advice', 'Statement', 'Delivery note', 'Credit note'],
            ans: 3,
            exp: 'A credit note reduces the amount the customer owes.',
          },
          {
            q: 'In which book of prime entry is a credit note received from a supplier recorded?',
            opts: ['Purchases returns day book', 'Sales returns day book', 'Purchases day book', 'Cash book'],
            ans: 0,
            exp: 'Credit notes received relate to goods you returned to suppliers, so they go in the purchases returns day book.',
          },
          {
            q: 'What does a remittance advice tell the seller?',
            opts: ['What goods were delivered', 'The total owed at month end', 'Which invoices a payment covers', 'The price agreed before delivery'],
            ans: 2,
            exp: 'A remittance advice lists the invoices and credit notes a payment relates to.',
          },
        ],
      },
      {
        id: 'L-itbk-2',
        title: 'Debits and credits',
        icon: '⚖️',
        skills: ['itbk-de'],
        cards: [
          {
            h: 'The dual effect',
            p: [
              'Every transaction affects **two things**. Buy a van with cash: you gain a van, you lose cash. That is the dual effect, and it is why double entry exists.',
              'For every transaction, the total debits must equal the total credits. Always.',
            ],
          },
          {
            h: 'DEAD CLIC',
            p: [
              'Use the mnemonic **DEAD CLIC** to remember which accounts increase on which side.',
              '**DEAD**: Debits increase Expenses, Assets and Drawings. **CLIC**: Credits increase Liabilities, Income and Capital.',
              'To decrease an account, just use the opposite side.',
            ],
            split: {
              left: { title: 'DEBIT increases', items: ['Expenses', 'Assets', 'Drawings'] },
              right: { title: 'CREDIT increases', items: ['Liabilities', 'Income', 'Capital'] },
            },
          },
          {
            h: 'Putting it to work',
            p: [
              'Pay rent of £500 from the bank: rent is an **expense**, so debit Rent £500. Bank (an asset) goes down, so credit Bank £500.',
              'Make a cash sale of £300: bank goes up, so debit Bank £300. Sales is **income**, so credit Sales £300.',
              'Say each entry out loud: which account goes up, which goes down, and which side does each need?',
            ],
          },
          {
            h: 'Trade receivables and payables',
            p: [
              'Sell on credit and the customer owes you money — a **trade receivable**, which is an asset. So a credit sale is: debit Receivables, credit Sales.',
              'Buy on credit and you owe the supplier — a **trade payable**, a liability. So a credit purchase is: debit Purchases, credit Payables.',
            ],
          },
        ],
        check: [
          {
            q: 'In DEAD CLIC, what does the D in CLIC... wait — which items increase with a CREDIT entry?',
            opts: ['Expenses, assets, drawings', 'Assets, income, capital', 'Liabilities, income, capital', 'Liabilities, expenses, drawings'],
            ans: 2,
            exp: 'CLIC: credits increase Liabilities, Income and Capital.',
          },
          {
            q: 'The owner takes £200 cash from the business for personal use. What is the double entry?',
            opts: ['Debit Drawings £200, credit Bank £200', 'Debit Bank £200, credit Drawings £200', 'Debit Capital £200, credit Drawings £200', 'Debit Wages £200, credit Bank £200'],
            ans: 0,
            exp: 'Drawings increase with a debit, and bank (an asset) decreases with a credit.',
          },
          {
            q: 'A business sells goods on credit for £450. Which entry is correct?',
            opts: ['Debit Sales, credit Bank', 'Debit Bank, credit Sales', 'Debit Sales, credit Receivables', 'Debit Receivables, credit Sales'],
            ans: 3,
            exp: 'The customer now owes money (debit the asset, receivables) and sales income increases with a credit.',
          },
          {
            q: 'Why must total debits always equal total credits?',
            opts: ['Because HMRC requires it', 'Because every transaction has a dual effect', 'Because banks process payments in pairs', 'Because invoices come in duplicate'],
            ans: 1,
            exp: 'Each transaction affects two accounts equally, so the two sides always balance.',
          },
        ],
      },
      {
        id: 'L-itbk-3',
        title: 'VAT on sales and purchases',
        icon: '🧾',
        skills: ['itbk-vat'],
        cards: [
          {
            h: 'Net, VAT and gross',
            p: [
              'A VAT invoice has three amounts. The **net** is the price of the goods. The **VAT** is the tax added on top. The **gross** is the total: net plus VAT.',
              'The UK standard rate is **20%**. So VAT is the net amount multiplied by 20%, and gross is the net multiplied by 1.2.',
            ],
          },
          {
            h: 'The gross divided by 6 shortcut',
            p: [
              'Sometimes you only know the gross figure. At 20%, the VAT is exactly **one sixth of the gross** — so just divide the gross by 6.',
              'Gross of £240? VAT is £240 divided by 6, which is £40. The net is the rest: £200.',
            ],
          },
          {
            h: 'A worked invoice',
            p: ['Goods are sold for £350 net of VAT. Build the invoice step by step.'],
            example: {
              title: 'Invoice for goods at £350 net',
              rows: [
                ['Net amount', '£350.00'],
                ['VAT at 20%', '£70.00'],
                ['Gross (invoice total)', '£420.00'],
                ['Check: £420 divided by 6', '£70.00'],
              ],
            },
          },
          {
            h: 'Output tax, input tax and the control account',
            p: [
              'VAT you charge on sales is **output tax** — you owe it to HMRC, so it is credited to the VAT control account.',
              'VAT you pay on purchases is **input tax** — you can reclaim it, so it is debited to the VAT control account.',
              'The balance on the **VAT control account** is usually a credit: the amount due to HMRC. If input tax is bigger, HMRC owes you a refund.',
            ],
          },
        ],
        check: [
          {
            q: 'Goods cost £600 net. What is the VAT at the standard rate?',
            opts: ['£120', '£100', '£60', '£144'],
            ans: 0,
            exp: '20% of £600 is £120.',
          },
          {
            q: 'An invoice total (gross) is £540. How much VAT does it include?',
            opts: ['£108', '£54', '£90', '£100'],
            ans: 2,
            exp: 'At 20%, VAT is the gross divided by 6: £540 divided by 6 is £90.',
          },
          {
            q: 'VAT charged to customers on sales is known as what?',
            opts: ['Input tax', 'Output tax', 'Net tax', 'Capital tax'],
            ans: 1,
            exp: 'VAT on sales is output tax, which is owed to HMRC.',
          },
          {
            q: 'A business has output tax of £4,000 and input tax of £2,500. What does the VAT control account show?',
            opts: ['A debit balance of £1,500 owed by HMRC', 'A credit balance of £6,500 due to HMRC', 'A debit balance of £6,500 owed by HMRC', 'A credit balance of £1,500 due to HMRC'],
            ans: 3,
            exp: 'Output tax exceeds input tax by £1,500, so £1,500 is due to HMRC — a credit balance.',
          },
        ],
      },
      {
        id: 'L-itbk-4',
        title: 'The cash book and discounts',
        icon: '💷',
        skills: ['itbk-cashbook'],
        cards: [
          {
            h: 'The cash book wears two hats',
            p: [
              'The cash book records all money in and out of the bank. It is unusual because it is **both** a book of prime entry **and** part of the double entry — it acts as the bank ledger account.',
              'Money received is recorded on the **debit** side. Money paid out is recorded on the **credit** side.',
            ],
          },
          {
            h: 'Petty cash and the imprest system',
            p: [
              'Petty cash covers small expenses — stamps, milk, taxi fares. Under the **imprest system**, the float is restored to a fixed amount each period.',
              'If the imprest amount is £150 and vouchers for the week total £62.40, you top up with exactly **£62.40** to bring the float back to £150.',
              'At any moment: cash remaining plus vouchers should equal the imprest amount.',
            ],
          },
          {
            h: 'Prompt payment discounts',
            p: [
              'A **prompt payment discount** (also called a cash or settlement discount) rewards paying early — for example, 2% off if paid within 10 days.',
              'A **discount allowed** is one you give to your customers. You receive less money, so it is an **expense** — debit Discounts allowed.',
              'A **discount received** is one a supplier gives you. You pay less, so it is **income** — credit Discounts received.',
            ],
            split: {
              left: { title: 'Discount ALLOWED', items: ['Given to customers', 'An expense', 'Debit entry', 'Credit the SLCA'] },
              right: { title: 'Discount RECEIVED', items: ['Given by suppliers', 'Income', 'Credit entry', 'Debit the PLCA'] },
            },
          },
          {
            h: 'Discounts in action',
            p: [
              'A customer owes £400 and takes a 2% prompt payment discount, paying £392.',
              'The entries: debit Bank £392, debit Discounts allowed £8, and credit the sales ledger control account £400 to clear the full debt.',
            ],
          },
        ],
        check: [
          {
            q: 'Why is the cash book special among the books of prime entry?',
            opts: ['It only records VAT', 'It is updated once a year', 'It is kept by HMRC', 'It is also part of the double entry system'],
            ans: 3,
            exp: 'The cash book is both a book of prime entry and the bank ledger account.',
          },
          {
            q: 'A petty cash imprest is £100. Vouchers total £37.50. How much cash restores the float?',
            opts: ['£100.00', '£37.50', '£62.50', '£137.50'],
            ans: 1,
            exp: 'You reimburse exactly what was spent — £37.50 — to return the float to £100.',
          },
          {
            q: 'How is a discount received from a supplier treated?',
            opts: ['As an asset', 'As an expense', 'As income', 'As drawings'],
            ans: 2,
            exp: 'Paying less than the full amount owed is a benefit to the business, so it is income.',
          },
          {
            q: 'A customer owing £250 pays within the discount period and takes a 4% discount. How much money is banked?',
            opts: ['£240', '£250', '£260', '£10'],
            ans: 0,
            exp: 'The discount is £10 (4% of £250), so the customer pays £240.',
          },
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
        ],
        check: [
          {
            q: 'When balancing off an account, where is the balance c/d entered?',
            opts: ['On the larger side', 'On the side with the smaller total', 'Always on the debit side', 'Below the totals'],
            ans: 1,
            exp: 'The balance c/d goes on the smaller side so that both column totals agree.',
          },
          {
            q: 'Which of these would normally appear in the DEBIT column of a trial balance?',
            opts: ['Motor vehicles', 'Sales', 'Capital', 'Bank loan'],
            ans: 0,
            exp: 'Motor vehicles are an asset, and assets carry debit balances.',
          },
          {
            q: 'A business has assets of £50,000 and liabilities of £18,000. What is its capital?',
            opts: ['£68,000', '£50,000', '£18,000', '£32,000'],
            ans: 3,
            exp: 'Capital = assets minus liabilities: £50,000 minus £18,000 is £32,000.',
          },
          {
            q: 'A trial balance agrees. What does that prove?',
            opts: ['Every transaction was recorded', 'No entries went to the wrong account', 'Total debits equal total credits', 'The business made a profit'],
            ans: 2,
            exp: 'Agreement only proves arithmetic equality — some errors do not affect it.',
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
        ],
        check: [
          {
            q: 'What is the main purpose of depreciation?',
            opts: ['To save up cash to replace the asset', 'To show the asset at market value', 'To spread the cost of the asset over its useful life', 'To reduce the VAT due'],
            ans: 2,
            exp: 'Depreciation matches the cost of an asset to the periods that benefit from it.',
          },
          {
            q: 'Equipment cost £12,000 with a residual value of £2,000 and a 5-year life. What is the annual straight-line charge?',
            opts: ['£2,400', '£12,000', '£2,800', '£2,000'],
            ans: 3,
            exp: '(£12,000 minus £2,000) divided by 5 is £2,000 per year.',
          },
          {
            q: 'A van cost £20,000 and is depreciated at 25% reducing balance. What is the year 2 charge?',
            opts: ['£3,750', '£5,000', '£15,000', '£2,500'],
            ans: 0,
            exp: 'Year 1 is £5,000, leaving £15,000; year 2 is 25% of £15,000, which is £3,750.',
          },
          {
            q: 'Rent of £1,200 paid in March covers April. At the 31 March year end this is a what?',
            opts: ['An accrual', 'A prepayment', 'A drawing', 'A depreciation charge'],
            ans: 1,
            exp: 'It is paid in advance of the period it relates to, so it is a prepayment — an asset.',
          },
        ],
      },
    ],
  },
  {
    unit: 'pobc',
    title: 'Principles of Bookkeeping Controls',
    lessons: [
      {
        id: 'L-pobc-1',
        title: 'Why controls exist',
        icon: '🛡️',
        skills: ['pobc-ca'],
        cards: [
          {
            h: 'Control accounts: the big picture',
            p: [
              'A business may have hundreds of customers. Each has a memorandum account in the sales ledger, but the general ledger holds just one summary account: the **sales ledger control account (SLCA)**.',
              'The SLCA shows total trade receivables. Its mirror image for suppliers is the **purchases ledger control account (PLCA)**, showing total trade payables.',
              'Control accounts act as a check: the control account total should equal the sum of the individual customer or supplier balances.',
            ],
          },
          {
            h: 'SLCA: which side?',
            p: [
              'The SLCA is an **asset** account, so it normally has a debit balance.',
              '**Debit** entries increase what customers owe: credit sales (gross, including VAT).',
              '**Credit** entries reduce it: money received, sales returns, discounts allowed, irrecoverable debts written off, and contras.',
            ],
            split: {
              left: { title: 'SLCA debit side', items: ['Balance b/d', 'Credit sales (gross)', 'Dishonoured cheques'] },
              right: { title: 'SLCA credit side', items: ['Receipts from customers', 'Sales returns', 'Discounts allowed', 'Irrecoverable debts', 'Contra entries'] },
            },
          },
          {
            h: 'PLCA: which side?',
            p: [
              'The PLCA is a **liability** account, so it normally has a credit balance — the opposite way round to the SLCA.',
              '**Credit** entries increase what you owe: credit purchases (gross). **Debit** entries reduce it: payments to suppliers, purchases returns, discounts received, and contras.',
            ],
          },
          {
            h: 'Contras: settling both ways',
            p: [
              'Sometimes a business both buys from and sells to the same person. Rather than swap cheques, the two balances can be set off against each other — a **contra**.',
              'The contra entry is: **debit PLCA, credit SLCA**, reducing both the receivable and the payable.',
            ],
          },
        ],
        check: [
          {
            q: 'What balance does the SLCA normally carry?',
            opts: ['A debit balance, because receivables are an asset', 'A credit balance, because customers owe money', 'No balance — it is memorandum only', 'A debit balance, because it records expenses'],
            ans: 0,
            exp: 'Trade receivables are an asset, and assets have debit balances.',
          },
          {
            q: 'On which side of the SLCA are sales returns recorded?',
            opts: ['Debit, because they increase receivables', 'Credit, because they reduce what customers owe', 'They are not recorded in the SLCA', 'Debit, because returns are an expense'],
            ans: 1,
            exp: 'Returns reduce the amount owed by customers, so they are credited to the SLCA.',
          },
          {
            q: 'An irrecoverable debt is written off. What is the entry in the control accounts?',
            opts: ['Debit SLCA', 'Credit PLCA', 'Debit PLCA', 'Credit SLCA'],
            ans: 3,
            exp: 'Writing off a debt removes it from receivables, so the SLCA is credited.',
          },
          {
            q: 'What is the double entry for a contra of £150?',
            opts: ['Debit SLCA £150, credit PLCA £150', 'Debit Bank £150, credit SLCA £150', 'Debit PLCA £150, credit SLCA £150', 'Debit PLCA £150, credit Bank £150'],
            ans: 2,
            exp: 'A contra reduces both balances: debit the PLCA and credit the SLCA.',
          },
        ],
      },
      {
        id: 'L-pobc-2',
        title: 'Reconciling the control accounts',
        icon: '🔍',
        skills: ['pobc-ca'],
        cards: [
          {
            h: 'Two records, one truth',
            p: [
              'The SLCA balance should equal the total of the individual customer balances in the sales ledger. The same goes for the PLCA and the supplier balances.',
              'A **control account reconciliation** compares the two. If they differ, an error exists somewhere — and the difference is your clue.',
            ],
          },
          {
            h: 'Errors on the control account side',
            p: [
              'Some errors live in the **control account**, because it is built from day book totals. An undercast sales day book means the SLCA debit was too small.',
              'Fix these with an adjustment to the control account itself: add or subtract from the control account balance.',
              'Typical culprits: day book totals miscast, a discount or contra entered once but not in the control account, or posted to the wrong side.',
            ],
          },
          {
            h: 'Errors on the list of balances side',
            p: [
              'Other errors live in the **individual accounts**: an invoice posted to the wrong customer, a balance missed off the list, or a balance listed as a debit when it is a credit.',
              'Fix these by adjusting the **list of balances**, not the control account.',
              'Ask one question for every difference you find: did the mistake happen in a day book total (control side) or an individual account (list side)?',
            ],
          },
          {
            h: 'A reconciliation in practice',
            p: ['Suppose the SLCA shows £14,720 but the list of customer balances totals £14,560.'],
            example: {
              title: 'SLCA reconciliation',
              rows: [
                ['SLCA balance', '£14,720'],
                ['List of balances', '£14,560'],
                ['Difference to explain', '£160'],
                ['Found: invoice £160 missed off one customer account', 'Add £160 to the list'],
                ['Revised list total', '£14,720 — agreed'],
              ],
            },
          },
        ],
        check: [
          {
            q: 'The sales day book was overcast by £100. What needs adjusting?',
            opts: ['The list of customer balances', 'Nothing — totals do not matter', 'An individual customer account', 'The SLCA, reduced by £100'],
            ans: 3,
            exp: 'Day book totals are posted to the control account, so the SLCA must be reduced.',
          },
          {
            q: 'An invoice was posted to A Smith instead of B Smith. What does this affect?',
            opts: ['The SLCA balance', 'The VAT control account', 'Individual accounts only — the list total is unchanged', 'The bank balance'],
            ans: 2,
            exp: 'The error sits within the individual accounts; the overall list total and SLCA are unaffected.',
          },
          {
            q: 'A credit balance of £80 in the sales ledger was listed as a debit. What is the effect on the list total?',
            opts: ['List is £80 too low', 'List is £160 too high', 'List is £80 too high', 'No effect'],
            ans: 1,
            exp: 'Listing a credit as a debit swings the total by twice the amount: £160 too high.',
          },
          {
            q: 'Why do businesses prepare control account reconciliations regularly?',
            opts: ['To detect and correct errors promptly', 'To calculate VAT due', 'To replace the trial balance', 'To work out depreciation'],
            ans: 0,
            exp: 'Comparing the control account with the list of balances catches errors early.',
          },
        ],
      },
      {
        id: 'L-pobc-3',
        title: 'Bank reconciliation',
        icon: '🏦',
        skills: ['pobc-bankrec'],
        cards: [
          {
            h: 'Two views of the same money',
            p: [
              'Your cash book and the bank statement record the same account, but they rarely agree on a given day. A **bank reconciliation** explains the difference.',
              'Watch the signs: in **your** cash book, money is a debit balance. On the **bank statement**, the same money shows as a credit, because the bank owes it to you.',
            ],
          },
          {
            h: 'Step 1: update the cash book',
            p: [
              'Some items appear on the statement before you know about them: **bank charges**, **direct debits**, **standing orders**, **BACS receipts** from customers, and interest.',
              'These are real transactions you simply had not recorded. Enter them in the cash book **first** — receipts on the debit side, payments on the credit side.',
            ],
            flow: ['Compare statement with cash book', 'Tick matching items', 'Enter statement-only items in cash book', 'Balance the cash book', 'Reconcile the timing differences'],
          },
          {
            h: 'Step 2: timing differences',
            p: [
              'What remains are items in the cash book that the bank has not processed yet.',
              '**Unpresented cheques**: payments you have written that have not yet cleared. **Outstanding lodgements**: money you have paid in that the bank has not yet credited.',
              'These need no correction — time will clear them. They go on the reconciliation statement instead.',
            ],
          },
          {
            h: 'The reconciliation statement',
            p: ['The logic: statement balance = updated cash book balance + unpresented cheques − outstanding lodgements.'],
            example: {
              title: 'Reconciliation at 30 June',
              rows: [
                ['Updated cash book balance', '£1,000'],
                ['Add: unpresented cheques', '£250'],
                ['Less: outstanding lodgements', '£400'],
                ['Balance per bank statement', '£850'],
              ],
            },
          },
        ],
        check: [
          {
            q: 'Bank charges appear on the statement but not in the cash book. What do you do?',
            opts: ['List them as a timing difference', 'Enter them on the credit side of the cash book', 'Ignore them until next month', 'Enter them on the debit side of the cash book'],
            ans: 1,
            exp: 'Charges are a real payment the business missed, so the cash book is credited.',
          },
          {
            q: 'What is an unpresented cheque?',
            opts: ['A cheque a customer paid in that bounced', 'A cheque recorded by the bank but not the business', 'A cheque the business has lost', 'A cheque written by the business that has not yet cleared the bank'],
            ans: 3,
            exp: 'It is recorded in the cash book but has not yet appeared on the bank statement.',
          },
          {
            q: 'Updated cash book balance £2,300; unpresented cheques £500; outstanding lodgements £800. What should the statement show?',
            opts: ['£2,600', '£3,600', '£2,000', '£1,000'],
            ans: 2,
            exp: '£2,300 plus £500 minus £800 is £2,000.',
          },
          {
            q: 'Why do timing differences NOT require entries in the cash book?',
            opts: ['The cash book is already correct — the bank just has not caught up', 'They are errors made by the bank', 'They are too small to matter', 'The auditor adjusts them at year end'],
            ans: 0,
            exp: 'The business recorded them correctly; the bank will process them in time.',
          },
        ],
      },
      {
        id: 'L-pobc-4',
        title: 'Errors and the trial balance',
        icon: '🚫',
        skills: ['pobc-errors'],
        cards: [
          {
            h: 'Errors the trial balance cannot see',
            p: [
              'Six types of error keep debits equal to credits, so the trial balance still agrees and the error hides.',
              '**Omission**: a transaction missed entirely. **Commission**: right type of account, wrong account — rent posted to rates. **Principle**: wrong type of account — a van posted to motor expenses instead of motor vehicles.',
              '**Original entry**: the wrong amount used on both sides. **Reversal**: debit and credit swapped. **Compensating**: two unrelated errors that happen to cancel out.',
            ],
          },
          {
            h: 'Errors that break the trial balance',
            p: [
              'Other errors hit one side only, so the trial balance disagrees and a suspense account is needed.',
              '**Single-sided entry**: only the debit or only the credit posted. **Casting errors**: an account added up wrongly. **Transposition on one side**: £540 posted instead of £450 in one account only.',
              'A two-side-same-side error counts too: posting both entries as debits, for example.',
            ],
            split: {
              left: { title: 'TB still agrees', items: ['Omission', 'Commission', 'Principle', 'Original entry', 'Reversal', 'Compensating'] },
              right: { title: 'TB disagrees', items: ['Single-sided entry', 'Casting error', 'One-sided transposition', 'Two debits or two credits'] },
            },
          },
          {
            h: 'Telling commission and principle apart',
            p: [
              'Both put an entry in the wrong account. The difference is the **type** of account.',
              'Commission: same class — one expense for another expense. Principle: different class — an expense instead of an asset, or vice versa. Principle errors distort the financial statements more seriously.',
            ],
          },
          {
            h: 'A transposition tip',
            p: [
              'If a trial balance difference is exactly divisible by **9**, suspect a transposition error — £540 versus £450 gives a difference of £90.',
              'It is not proof, but it is a fast place to start looking.',
            ],
          },
        ],
        check: [
          {
            q: 'A new computer is debited to office expenses instead of office equipment. What error is this?',
            opts: ['Error of commission', 'Error of original entry', 'Error of principle', 'Error of omission'],
            ans: 2,
            exp: 'An asset was treated as an expense — a different class of account — so it is an error of principle.',
          },
          {
            q: 'Which error will cause the trial balance to disagree?',
            opts: ['A casting error in the rent account', 'A reversal of entries', 'A compensating error', 'An invoice missed out completely'],
            ans: 0,
            exp: 'A casting error affects one account only, putting the trial balance out.',
          },
          {
            q: 'An invoice for £670 was entered in the day book as £760 and posted from there. What error is this?',
            opts: ['Error of principle', 'Error of original entry', 'Single-sided entry', 'Compensating error'],
            ans: 1,
            exp: 'The wrong amount went through both sides of the double entry, so it is an error of original entry.',
          },
          {
            q: 'A trial balance difference is £270. Which error is worth checking first?',
            opts: ['An error of omission', 'An error of principle', 'A compensating error', 'A transposition error, since £270 divides exactly by 9'],
            ans: 3,
            exp: 'Differences divisible by 9 often point to transposed digits.',
          },
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
        ],
        check: [
          {
            q: 'Debit balances total £30,400 and credit balances total £30,150. The suspense account opens with what?',
            opts: ['A credit balance of £250', 'A debit balance of £250', 'A credit balance of £550', 'A debit balance of £125'],
            ans: 0,
            exp: 'Credits are £250 short, so suspense takes a £250 credit to make the trial balance agree.',
          },
          {
            q: 'Which error would NOT involve the suspense account when corrected?',
            opts: ['A single-sided entry', 'A casting error in one account', 'An amount posted to one side only', 'Rent posted in error to the rates account'],
            ans: 3,
            exp: 'A commission error keeps debits equal to credits, so suspense is never involved.',
          },
          {
            q: 'In the WAS / SHOULD HAVE BEEN method, what does the correcting journal do?',
            opts: ['Reverses the whole transaction and starts again', 'Posts the difference to drawings', 'Converts what was posted into what should have been posted', 'Records the entry in the day book again'],
            ans: 2,
            exp: 'The journal bridges the gap between the wrong posting and the correct one.',
          },
          {
            q: 'Why must the suspense account be cleared before the year end?',
            opts: ['Because HMRC charges interest on it', 'Because the financial statements must not contain unexplained balances', 'Because the bank requires it', 'Because it earns no interest'],
            ans: 1,
            exp: 'Suspense is a temporary holding account; final accounts must reflect corrected, explained figures.',
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
        ],
        check: [
          {
            q: 'Which of these is a cost to the employer on top of gross pay?',
            opts: ['Employee pension contributions', 'PAYE income tax', 'Employee NIC', 'Employer\'s NIC'],
            ans: 3,
            exp: 'Employer\'s NIC is paid by the business in addition to gross pay.',
          },
          {
            q: 'Gross pay £1,800; PAYE £160; employee NIC £110; employee pension £90. What is net pay?',
            opts: ['£1,800', '£1,440', '£1,530', '£1,640'],
            ans: 1,
            exp: '£1,800 minus £160 minus £110 minus £90 is £1,440.',
          },
          {
            q: 'Until PAYE deducted from employees is paid over, how is it shown in the accounts?',
            opts: ['As a liability owed to HMRC', 'As income of the business', 'As an asset of the business', 'As drawings'],
            ans: 0,
            exp: 'Deductions are held on behalf of HMRC, so they are a liability until paid.',
          },
          {
            q: 'After all payroll amounts are paid out, the wages control account should show what?',
            opts: ['A debit balance equal to net pay', 'A credit balance equal to employer\'s NIC', 'A nil balance', 'A balance equal to gross pay'],
            ans: 2,
            exp: 'Wages control is cleared by the payments; a remaining balance signals an error or an unpaid amount.',
          },
        ],
      },
    ],
  },
  {
    unit: 'poc',
    title: 'Principles of Costing',
    lessons: [
      {
        id: 'L-poc-1',
        title: 'What costing is for',
        icon: '🎯',
        skills: ['poc-behaviour'],
        cards: [
          {
            h: 'Two kinds of accounting',
            p: [
              '**Financial accounting** looks backwards and outwards: statutory accounts, in a required format, for external users like HMRC and lenders.',
              '**Management accounting** looks forwards and inwards: costings, budgets and forecasts, in any format that helps, for managers making decisions.',
              'Costing belongs to management accounting. There are no legal rules about how to do it — only useful and less useful ways.',
            ],
          },
          {
            h: 'Classifying by element',
            p: [
              'Every cost can be sorted by **element** — what kind of resource it is.',
              '**Materials**: the stuff products are made from, like flour in a bakery. **Labour**: pay for the people doing the work. **Overheads**: everything else needed to operate, like rent, insurance and power.',
            ],
          },
          {
            h: 'Direct or indirect?',
            p: [
              'A cost is **direct** if it can be traced to a specific unit of output: the wood in one table, the wages of the carpenter who built it.',
              'A cost is **indirect** if it cannot: the factory rent, the supervisor\'s salary. Indirect costs are also called overheads.',
              'Direct materials plus direct labour (plus any direct expenses) make up **prime cost**.',
            ],
          },
          {
            h: 'Classifying by function',
            p: [
              'Costs can also be grouped by the **function** of the business that incurs them: production, administration, selling and distribution, and finance.',
              'One cost, three labels. Factory glue is a material (element), indirect (nature), and production (function). Exam questions love asking for all three.',
            ],
            example: {
              title: 'Three ways to classify factory glue',
              rows: [
                ['By element', 'Materials'],
                ['By nature', 'Indirect'],
                ['By function', 'Production'],
              ],
            },
          },
        ],
        check: [
          {
            q: 'Which statement best describes management accounting?',
            opts: ['It must follow a format set by law', 'It produces forward-looking information for internal decision making', 'It is prepared mainly for HMRC', 'It only records past transactions'],
            ans: 1,
            exp: 'Management accounting serves internal managers and looks ahead, with no prescribed format.',
          },
          {
            q: 'The wages of a machine operator who works on each product are classified as what?',
            opts: ['Indirect labour', 'An overhead', 'Direct labour', 'Direct materials'],
            ans: 2,
            exp: 'Their work can be traced to specific units of output, so it is direct labour.',
          },
          {
            q: 'Factory rent is best described as which of these?',
            opts: ['A direct expense', 'A selling cost', 'Direct materials', 'An indirect cost (overhead)'],
            ans: 3,
            exp: 'Rent cannot be traced to individual units, so it is an indirect cost.',
          },
          {
            q: 'Which costs make up prime cost?',
            opts: ['Direct materials, direct labour and direct expenses', 'All production costs including overheads', 'Administration and finance costs', 'Indirect materials and indirect labour'],
            ans: 0,
            exp: 'Prime cost is the total of all direct costs.',
          },
        ],
      },
      {
        id: 'L-poc-2',
        title: 'How costs behave',
        icon: '📈',
        skills: ['poc-behaviour'],
        cards: [
          {
            h: 'Fixed and variable',
            p: [
              '**Fixed costs** stay the same in total whatever the output — rent is the classic example. Make one unit or one thousand, the rent does not move.',
              '**Variable costs** rise in direct proportion to output — materials, for instance. Double the units, double the materials cost.',
            ],
            split: {
              left: { title: 'FIXED cost', items: ['Total: constant', 'Per unit: falls as output rises', 'Example: factory rent'] },
              right: { title: 'VARIABLE cost', items: ['Total: rises with output', 'Per unit: constant', 'Example: raw materials'] },
            },
          },
          {
            h: 'The per-unit twist',
            p: [
              'Here is the bit that catches people out. Per unit, the behaviours flip.',
              'A fixed cost **per unit falls** as output rises, because the same total is spread over more units. A variable cost **per unit stays constant**.',
              '£10,000 rent over 1,000 units is £10 each; over 2,000 units it is £5 each.',
            ],
          },
          {
            h: 'Stepped and semi-variable',
            p: [
              'A **stepped cost** is fixed over a range, then jumps. One supervisor can manage up to 10 staff; hire an 11th and you need a second supervisor.',
              'A **semi-variable cost** mixes both: a fixed element plus a variable element. A phone contract with a standing charge plus a price per call is semi-variable.',
            ],
          },
          {
            h: 'Splitting a semi-variable cost',
            p: ['You can separate the fixed and variable parts by comparing two activity levels — the high-low idea.'],
            example: {
              title: 'Electricity: 1,000 units costs £3,500; 2,000 units costs £5,500',
              rows: [
                ['Extra cost for extra 1,000 units', '£2,000'],
                ['Variable cost per unit', '£2,000 divided by 1,000 = £2'],
                ['Variable cost at 1,000 units', '£2,000'],
                ['Fixed element', '£3,500 minus £2,000 = £1,500'],
              ],
            },
          },
        ],
        check: [
          {
            q: 'As output increases, what happens to the fixed cost per unit?',
            opts: ['It falls', 'It rises', 'It stays the same', 'It becomes variable'],
            ans: 0,
            exp: 'The same total fixed cost is spread over more units, so the cost per unit falls.',
          },
          {
            q: 'A cost of £4 per unit at every level of output, with no fixed element, is a what?',
            opts: ['Fixed cost', 'Stepped cost', 'Semi-variable cost', 'Variable cost'],
            ans: 3,
            exp: 'A constant cost per unit that rises in total with output is a variable cost.',
          },
          {
            q: 'Warehouse rent doubles when a second warehouse is needed at higher output. This is a what?',
            opts: ['Variable cost', 'Stepped cost', 'Semi-variable cost', 'Direct cost'],
            ans: 1,
            exp: 'It is fixed within a range of output, then steps up — a stepped cost.',
          },
          {
            q: 'A machine costs £1,000 to rent plus £3 per unit produced. Total cost for 500 units?',
            opts: ['£1,500', '£3,000', '£2,500', '£1,000'],
            ans: 2,
            exp: '£1,000 fixed plus 500 times £3 (£1,500) gives £2,500.',
          },
        ],
      },
      {
        id: 'L-poc-3',
        title: 'Coding and centres',
        icon: '🏷️',
        skills: ['poc-coding'],
        cards: [
          {
            h: 'Responsibility centres',
            p: [
              'Organisations split themselves into centres so managers can be held responsible for what they control.',
              'A **cost centre** incurs costs only — like the maintenance department. A **profit centre** earns revenue as well as costs — like a branch shop. An **investment centre** also controls its own assets and investment decisions — like a whole division.',
            ],
          },
          {
            h: 'Why code transactions?',
            p: [
              'A **code** is a short label — letters, numbers or both — attached to every transaction so it can be sorted, totalled and reported automatically.',
              'Good coding means managers can see exactly what their centre spent, budgets can be compared with actuals, and nothing gets lost in a vague "sundries" pile.',
              'Common systems: numeric (4100), alphabetic (SAL), or alphanumeric (SAL-4100).',
            ],
          },
          {
            h: 'Reading a coding structure',
            p: ['Many businesses combine a centre code with a cost-type code. Once you know the pattern, you can code anything.'],
            example: {
              title: 'Coding: first part = centre, second part = expense type',
              rows: [
                ['Centre codes', 'PR = Production, AD = Admin, SD = Sales'],
                ['Expense codes', '100 = Materials, 200 = Labour, 300 = Overheads'],
                ['Glue for the factory', 'PR-100'],
                ['Office manager\'s salary', 'AD-200'],
                ['Delivery van insurance', 'SD-300'],
              ],
            },
          },
          {
            h: 'Coding errors matter',
            p: [
              'A miscoded invoice puts cost in the wrong centre. The wrong manager gets blamed, the budget comparison is misleading, and decisions are made on bad numbers.',
              'If you cannot tell where a cost belongs, ask — never guess a code.',
            ],
          },
        ],
        check: [
          {
            q: 'A department that incurs costs but earns no revenue is a what?',
            opts: ['Profit centre', 'Investment centre', 'Cost centre', 'Revenue centre'],
            ans: 2,
            exp: 'Cost centres are responsible for costs only.',
          },
          {
            q: 'What extra responsibility does an investment centre manager have compared with a profit centre manager?',
            opts: ['Responsibility for revenue', 'Control over assets and investment decisions', 'Responsibility for costs', 'Setting the VAT rate'],
            ans: 1,
            exp: 'Investment centres control costs, revenues and the capital invested.',
          },
          {
            q: 'Using the system PR/AD/SD plus 100/200/300, how would you code wages of a production worker?',
            opts: ['PR-200', 'PR-100', 'AD-200', 'SD-300'],
            ans: 0,
            exp: 'Production centre (PR) plus labour (200) gives PR-200.',
          },
          {
            q: 'What is the most likely consequence of a miscoded cost?',
            opts: ['The trial balance will not agree', 'HMRC will issue a fine automatically', 'The bank statement will not reconcile', 'A manager\'s reports show costs they did not incur'],
            ans: 3,
            exp: 'Miscoding sends the cost to the wrong centre, distorting that manager\'s reports.',
          },
        ],
      },
      {
        id: 'L-poc-4',
        title: 'Valuing inventory',
        icon: '📦',
        skills: ['poc-inv'],
        cards: [
          {
            h: 'Same goods, different prices',
            p: [
              'Buy identical materials at different prices over time, and a question appears: when you issue some to production, **which price do you use**?',
              'Two methods are allowed at Level 2: **FIFO** (first in, first out) and **AVCO** (weighted average cost).',
              '**LIFO** (last in, first out) is **not permitted** under IFRS or UK GAAP, so you will only ever see it as a wrong answer.',
            ],
          },
          {
            h: 'FIFO mechanics',
            p: [
              'FIFO assumes the **oldest** inventory is issued first. Issues are priced at the earliest prices; closing inventory carries the **most recent** prices.',
              'Work through issues layer by layer: use up the oldest batch, then move on to the next.',
            ],
            example: {
              title: 'FIFO: 10 units at £5, then 10 units at £6 bought. Issue 15 units.',
              rows: [
                ['First 10 issued', '10 at £5 = £50'],
                ['Next 5 issued', '5 at £6 = £30'],
                ['Cost of issue', '£80'],
                ['Closing inventory', '5 at £6 = £30'],
              ],
            },
          },
          {
            h: 'AVCO mechanics',
            p: [
              'AVCO recalculates a **weighted average cost** after each purchase: total value in stock divided by total units in stock.',
              'Using the same data: 20 units worth £110 gives an average of £5.50. Issuing 15 units costs 15 times £5.50, which is £82.50, leaving closing inventory of £27.50.',
              'AVCO smooths out price changes; FIFO tracks them through in order.',
            ],
          },
          {
            h: 'Effect on profit',
            p: [
              'When prices are **rising**, FIFO charges older, cheaper costs to production — so cost of issues is lower, closing inventory is higher, and reported **profit is higher** than under AVCO.',
              'When prices are falling, the effect reverses. Over the whole life of the inventory the methods even out — the difference is timing.',
            ],
          },
        ],
        check: [
          {
            q: 'Which inventory valuation method is NOT permitted under IFRS or UK GAAP?',
            opts: ['FIFO', 'AVCO', 'Weighted average', 'LIFO'],
            ans: 3,
            exp: 'LIFO is prohibited; only FIFO and average cost methods are allowed.',
          },
          {
            q: 'Under FIFO, closing inventory is valued at which prices?',
            opts: ['The most recent purchase prices', 'The oldest purchase prices', 'The average of all prices', 'Selling prices'],
            ans: 0,
            exp: 'FIFO issues the oldest units first, so what remains is the newest, at recent prices.',
          },
          {
            q: 'Opening stock 20 units at £4; purchase 20 units at £6. Under AVCO, what is the cost per unit?',
            opts: ['£4', '£6', '£5', '£10'],
            ans: 2,
            exp: 'Total value £200 divided by 40 units gives £5 per unit.',
          },
          {
            q: 'In a period of rising prices, which is true of FIFO compared with AVCO?',
            opts: ['Profit is lower under FIFO', 'Profit is higher under FIFO', 'Closing inventory is lower under FIFO', 'There is never any difference'],
            ans: 1,
            exp: 'FIFO charges older, cheaper costs to issues, leaving higher closing inventory and higher profit.',
          },
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
        ],
        check: [
          {
            q: 'What is the overtime premium for 5 hours at double time, basic rate £10 per hour?',
            opts: ['£100', '£50', '£25', '£10'],
            ans: 1,
            exp: 'Double time pays £20 per hour; the premium is the extra £10 per hour, so 5 hours is £50.',
          },
          {
            q: 'A worker is paid £0.80 per unit and makes 460 units. What is their piecework pay?',
            opts: ['£460', '£575', '£368', '£80'],
            ans: 2,
            exp: '460 units times £0.80 is £368.',
          },
          {
            q: 'What is the main drawback of a pure time rate scheme?',
            opts: ['It gives no incentive to produce more in the time worked', 'It is illegal in the UK', 'Pay varies wildly each week', 'It cannot be used for overtime'],
            ans: 0,
            exp: 'Pay depends only on hours, not output, so there is no built-in productivity incentive.',
          },
          {
            q: 'Why do many piecework schemes include a guaranteed minimum wage?',
            opts: ['To increase the overtime premium', 'To reduce the employer\'s NIC', 'To make all workers earn the same', 'To protect workers when output is low for reasons beyond their control'],
            ans: 3,
            exp: 'A guaranteed minimum ensures fair pay when machine breakdowns or shortages limit output.',
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
        ],
        check: [
          {
            q: 'Actual rent was £5,200 against a budget of £5,000. What is the variance?',
            opts: ['£200 adverse', '£200 favourable', '£5,200 adverse', 'No variance'],
            ans: 0,
            exp: 'Spending £200 more than budgeted on a cost reduces profit, so it is adverse.',
          },
          {
            q: 'Sales revenue came in £900 above budget. How is this variance described?',
            opts: ['Adverse, because budgets should be exact', 'Favourable, because higher income increases profit', 'Neutral', 'Adverse, because costs will also rise'],
            ans: 1,
            exp: 'Income above budget increases profit, which makes the variance favourable.',
          },
          {
            q: 'What is the purpose of exception reporting?',
            opts: ['To report every variance no matter how small', 'To hide adverse variances', 'To focus management attention on significant variances only', 'To replace the budget'],
            ans: 2,
            exp: 'It filters out trivial differences so managers investigate only what matters.',
          },
          {
            q: 'A product sells for £15 with variable costs of £9 per unit. What is the contribution per unit?',
            opts: ['£15', '£9', '£24', '£6'],
            ans: 3,
            exp: 'Contribution is selling price minus variable cost: £15 minus £9 is £6.',
          },
        ],
      },
    ],
  },
  {
    unit: 'besy',
    title: 'The Business Environment',
    lessons: [
      {
        id: 'L-besy-1',
        title: 'Types of business',
        icon: '🏢',
        skills: ['besy-structure'],
        cards: [
          {
            h: 'Unincorporated businesses',
            p: [
              'A **sole trader** is one person in business. Simple to set up, full control, but **unlimited liability**: the owner\'s personal assets are at risk for business debts.',
              'A **partnership** is two or more people in business together, sharing profits and decisions. Ordinary partners also have unlimited liability, and the business is not legally separate from its owners.',
            ],
          },
          {
            h: 'Incorporated businesses',
            p: [
              'A company is a **separate legal entity**: it can own assets, sue and be sued in its own name, and it carries on regardless of who its owners are.',
              'A **private limited company (Ltd)** has shareholders with **limited liability** — they can only lose what they invested. Its shares cannot be offered to the general public.',
              'A **public limited company (PLC)** can offer shares to the public, often on a stock exchange. An **LLP** (limited liability partnership) gives partnership-style flexibility with limited liability and separate legal status.',
            ],
            split: {
              left: { title: 'Unincorporated', items: ['Sole trader', 'Ordinary partnership', 'Unlimited liability', 'Not a separate legal entity'] },
              right: { title: 'Incorporated', items: ['Ltd', 'PLC', 'LLP', 'Limited liability', 'Separate legal entity'] },
            },
          },
          {
            h: 'Not just for profit',
            p: [
              '**Not-for-profit organisations** — charities, clubs, public bodies — exist to pursue a purpose rather than to enrich owners.',
              'Any surplus is reinvested in the cause. They still need proper accounting: in some ways more so, because they answer to donors, members and regulators.',
            ],
          },
          {
            h: 'Choosing a structure',
            p: [
              'The trade-offs: companies offer limited liability and easier access to finance, but face more regulation — filing accounts at **Companies House**, for example.',
              'Sole traders keep things private and simple but carry all the risk personally.',
            ],
          },
        ],
        check: [
          {
            q: 'What does limited liability mean for a shareholder?',
            opts: ['They cannot be sued', 'The company\'s debts become theirs', 'They can lose only the amount they invested', 'They pay no tax on dividends'],
            ans: 2,
            exp: 'Shareholders\' losses are capped at their investment; personal assets are protected.',
          },
          {
            q: 'Which business type has unlimited liability?',
            opts: ['A PLC', 'An LLP', 'A private limited company', 'A sole trader'],
            ans: 3,
            exp: 'A sole trader is personally liable for all business debts without limit.',
          },
          {
            q: 'What does it mean that a company is a separate legal entity?',
            opts: ['Its accounts never need filing', 'It exists in law independently of its owners', 'It cannot employ staff', 'Its shareholders manage it directly'],
            ans: 1,
            exp: 'A company can own assets, make contracts and be sued in its own name, separate from its shareholders.',
          },
          {
            q: 'Which is a key difference between an Ltd and a PLC?',
            opts: ['A PLC can offer its shares to the general public', 'An Ltd has unlimited liability', 'A PLC is not a separate legal entity', 'An Ltd cannot employ more than 50 people'],
            ans: 0,
            exp: 'Only public limited companies may offer shares to the public, often via a stock exchange.',
          },
        ],
      },
      {
        id: 'L-besy-2',
        title: 'Inside the organisation',
        icon: '🧩',
        skills: ['besy-structure'],
        cards: [
          {
            h: 'Stakeholders',
            p: [
              'A **stakeholder** is anyone with an interest in how a business performs.',
              '**Internal** stakeholders: owners, managers, employees. **External** stakeholders: customers, suppliers, lenders, HMRC, the local community.',
              'Different stakeholders want different things — lenders care about repayment, employees about job security — and the same accounts must serve them all honestly.',
            ],
          },
          {
            h: 'Functions of a business',
            p: [
              'Most organisations divide work into functions: **operations or production** makes the product, **sales and marketing** finds and keeps customers, **human resources** manages people, **IT** keeps systems running — and **finance** manages the money.',
              'No function works alone. Sales needs credit checks from finance; production needs purchasing; HR needs payroll.',
            ],
          },
          {
            h: 'What the finance function does',
            p: [
              'The finance function records transactions, pays suppliers and staff, collects money from customers, prepares financial and management reports, manages cash, and supports budgeting and decisions across the business.',
              'It also looks after compliance: VAT returns, payroll submissions and statutory accounts.',
            ],
            flow: ['Record transactions', 'Pay and collect', 'Report results', 'Support decisions', 'Stay compliant'],
          },
          {
            h: 'Finance as a service',
            p: [
              'Think of every other department as a **customer** of finance. They need accurate, timely information presented clearly — not jargon.',
              'Solvency matters too: finance watches that the business can pay its debts as they fall due. Plenty of profitable businesses have failed simply because they ran out of cash.',
            ],
          },
        ],
        check: [
          {
            q: 'Which of these is an INTERNAL stakeholder?',
            opts: ['A supplier', 'HMRC', 'A lender', 'An employee'],
            ans: 3,
            exp: 'Employees work within the organisation, making them internal stakeholders.',
          },
          {
            q: 'Which task belongs to the finance function?',
            opts: ['Preparing the VAT return', 'Designing the product packaging', 'Recruiting new staff', 'Writing advertising copy'],
            ans: 0,
            exp: 'VAT compliance is a core responsibility of the finance function.',
          },
          {
            q: 'A bank deciding whether to lend to a business is most interested in what?',
            opts: ['Staff holiday entitlements', 'The ability of the business to repay with interest', 'The brand colours', 'The number of departments'],
            ans: 1,
            exp: 'Lenders focus on solvency and the ability to service and repay debt.',
          },
          {
            q: 'Why might a profitable business still fail?',
            opts: ['Because profit is taxed', 'Because it has too many customers', 'Because it runs out of cash to pay debts as they fall due', 'Because it files accounts on time'],
            ans: 2,
            exp: 'Solvency is about cash, not profit — without cash, bills cannot be paid.',
          },
        ],
      },
      {
        id: 'L-besy-3',
        title: 'Contract law essentials',
        icon: '🤝',
        skills: ['besy-law'],
        cards: [
          {
            h: 'Four ingredients of a contract',
            p: [
              'A binding contract needs **offer**, **acceptance**, **consideration** and **intention to create legal relations**.',
              'Miss any one and there is no contract. The parties must also have **capacity** — broadly, be adults of sound mind (and companies acting within their powers).',
            ],
            flow: ['Offer', 'Acceptance', 'Consideration', 'Intention', 'Binding contract'],
          },
          {
            h: 'Offer or invitation to treat?',
            p: [
              'An **offer** is a definite promise to be bound on stated terms. An **invitation to treat** is just an invitation for others to make offers.',
              'Goods on a shop shelf, items in a shop window, advertisements and price lists are invitations to treat. The **customer** makes the offer at the till; the shop accepts or refuses it.',
              'That is why a mispriced item on the shelf does not force the shop to sell at that price.',
            ],
          },
          {
            h: 'Acceptance, consideration and intention',
            p: [
              '**Acceptance** must be unconditional — change the terms and you have made a **counter-offer**, which kills the original offer.',
              '**Consideration** is what each side gives: money, goods, services or a promise. It must have some value but need not be a fair price.',
              '**Intention**: commercial agreements are presumed legally binding; social and domestic arrangements are presumed not to be.',
            ],
          },
          {
            h: 'Breach and remedies',
            p: [
              'A **breach of contract** happens when a party fails to perform their side without lawful excuse.',
              'The main remedy is **damages** — money to put the injured party in the position they would have been in had the contract been performed. Courts can sometimes order **specific performance**, requiring the contract to be carried out, but this is rare.',
            ],
          },
        ],
        check: [
          {
            q: 'Goods displayed on a supermarket shelf are legally a what?',
            opts: ['A binding offer to sell at that price', 'An invitation to treat', 'An acceptance', 'A counter-offer'],
            ans: 1,
            exp: 'The display invites customers to make an offer, which the shop may accept or refuse.',
          },
          {
            q: 'Which list contains the four essential elements of a contract?',
            opts: ['Offer, acceptance, consideration, intention', 'Offer, payment, delivery, receipt', 'Invitation, negotiation, signature, witness', 'Acceptance, capacity, damages, intention'],
            ans: 0,
            exp: 'A contract requires offer, acceptance, consideration and intention to create legal relations.',
          },
          {
            q: 'A buyer responds to an offer of £500 by saying they will pay £450. What has happened?',
            opts: ['The contract is formed at £450', 'The contract is formed at £500', 'Nothing — silence follows', 'They have made a counter-offer, ending the original offer'],
            ans: 3,
            exp: 'Changing the terms is a counter-offer, which destroys the original offer.',
          },
          {
            q: 'What is the usual remedy for breach of contract?',
            opts: ['Imprisonment', 'A fine paid to HMRC', 'Damages — financial compensation', 'Automatic cancellation of all contracts'],
            ans: 2,
            exp: 'Damages aim to put the injured party where they would have been if the contract had been performed.',
          },
        ],
      },
      {
        id: 'L-besy-4',
        title: 'The economy around you',
        icon: '🌍',
        skills: ['besy-econ'],
        cards: [
          {
            h: 'Demand and supply',
            p: [
              '**Demand** is how much buyers want at each price — generally, the lower the price, the more is demanded.',
              '**Supply** is how much sellers will offer at each price — generally, the higher the price, the more is supplied.',
              'Demand shifts with income, tastes, and the prices of substitutes and complements. Supply shifts with production costs and technology.',
            ],
          },
          {
            h: 'Equilibrium price',
            p: [
              'The **equilibrium price** is where demand equals supply — the market clears, with no shortage and no surplus.',
              'Price above equilibrium? Surplus: unsold goods push the price down. Price below equilibrium? Shortage: competing buyers bid the price up.',
            ],
            example: {
              title: 'Finding equilibrium',
              rows: [
                ['At £10: demand 500, supply 200', 'Shortage — price rises'],
                ['At £14: demand 350, supply 350', 'Equilibrium'],
                ['At £18: demand 200, supply 500', 'Surplus — price falls'],
              ],
            },
          },
          {
            h: 'Price elasticity of demand',
            p: [
              '**PED** measures how strongly demand responds to a price change.',
              '**Elastic** demand: a small price change causes a big change in quantity — common where substitutes are plentiful. Raising the price loses you revenue.',
              '**Inelastic** demand: quantity barely moves when price changes — think essentials like fuel. Raising the price increases revenue.',
            ],
          },
          {
            h: 'Inflation and interest rates',
            p: [
              '**Inflation** is a sustained rise in the general level of prices — each pound buys less. In the UK it is measured by indices such as the **CPI**, and the Bank of England targets 2%.',
              'The Bank\'s main tool is the **interest rate**. Higher rates make borrowing dearer and saving more attractive, cooling spending and inflation; lower rates do the opposite. For a business, higher rates mean costlier loans and customers with less to spend.',
            ],
          },
        ],
        check: [
          {
            q: 'What happens at the equilibrium price?',
            opts: ['Quantity demanded equals quantity supplied', 'There is always a surplus', 'Demand is at its maximum', 'Suppliers make no profit'],
            ans: 0,
            exp: 'Equilibrium is the price at which the market clears with no shortage or surplus.',
          },
          {
            q: 'If the market price sits above equilibrium, what would you expect?',
            opts: ['A shortage, pushing prices higher', 'Demand and supply both rise', 'A surplus of unsold goods, pushing prices down', 'No change at all'],
            ans: 2,
            exp: 'Above equilibrium, supply exceeds demand, so unsold goods force prices down.',
          },
          {
            q: 'Demand for a product barely changes when its price rises sharply. Demand is...',
            opts: ['Elastic', 'In equilibrium', 'Perfectly elastic', 'Inelastic'],
            ans: 3,
            exp: 'When quantity responds only weakly to price changes, demand is inelastic.',
          },
          {
            q: 'How does a rise in interest rates typically affect a business?',
            opts: ['Its existing fixed-rate loans get cheaper', 'Borrowing costs rise and customer spending tends to fall', 'Inflation immediately doubles', 'Its VAT rate increases'],
            ans: 1,
            exp: 'Higher rates raise the cost of borrowing and leave customers with less disposable income.',
          },
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
        ],
        check: [
          {
            q: 'Keeping your technical knowledge up to date supports which fundamental principle?',
            opts: ['Confidentiality', 'Integrity', 'Professional competence and due care', 'Objectivity'],
            ans: 2,
            exp: 'Competence and due care requires maintaining the knowledge and skill to serve properly.',
          },
          {
            q: 'Your manager pressures you to overstate sales figures or face dismissal. Which threat is this?',
            opts: ['Self-review threat', 'Intimidation threat', 'Familiarity threat', 'Advocacy threat'],
            ans: 1,
            exp: 'Pressure backed by a threat to your job is an intimidation threat.',
          },
          {
            q: 'When may an accountant disclose confidential client information?',
            opts: ['Whenever a friend asks', 'When it would win new business', 'Never, under any circumstances', 'When there is a legal duty or proper authority to disclose'],
            ans: 3,
            exp: 'Confidentiality can be overridden by law (for example, money laundering reporting) or proper authorisation.',
          },
          {
            q: 'What are the three elements of the triple bottom line?',
            opts: ['Profit, people, planet', 'Price, product, promotion', 'Assets, liabilities, capital', 'Cash, credit, capital'],
            ans: 0,
            exp: 'The triple bottom line balances economic, social and environmental performance.',
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
        ],
        check: [
          {
            q: 'Which is a key benefit of cloud accounting software?',
            opts: ['It works without any internet connection', 'It removes the need for passwords', 'It makes data security unnecessary', 'Authorised users can access live data from anywhere'],
            ans: 3,
            exp: 'Cloud systems hold data centrally so authorised users can work from any location.',
          },
          {
            q: 'Under UK GDPR, how long may personal data be kept?',
            opts: ['Forever, once collected', 'Exactly seven years in all cases', 'No longer than necessary for its purpose', 'Until the customer asks twice'],
            ans: 2,
            exp: 'The storage limitation principle says data is kept only as long as needed for its stated purpose.',
          },
          {
            q: 'An email claiming to be from your bank urgently asks you to confirm your login details. What is this likely to be?',
            opts: ['A phishing attempt', 'A routine bank statement', 'A GDPR notice', 'A software update'],
            ans: 0,
            exp: 'Urgency plus a request for credentials are classic signs of phishing.',
          },
          {
            q: 'Why should access to accounting systems be restricted by role?',
            opts: ['To slow the system down for safety', 'So staff see and change only the data their job requires', 'To avoid paying for software licences', 'Because GDPR bans all shared systems'],
            ans: 1,
            exp: 'Role-based access limits both accidental errors and deliberate misuse of data.',
          },
        ],
      },
    ],
  },
];
