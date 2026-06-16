/* AAT Level 2 Synoptic Practice — Learning Journey content */
window.LEARN_PATH = [
  {
    unit: 'itbk',
    title: 'Introduction to Bookkeeping',
    lessons: [
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
            split: {
              left: { title: 'Capital expenditure', items: ['Buys or improves assets', 'Benefit spans > 1 year', 'Goes to balance sheet', 'Depreciated over time', 'E.g. new van £15,000'] },
              right: { title: 'Revenue expenditure', items: ['Day-to-day running cost', 'Benefit ≤ 1 year', 'Goes to income statement', 'Expensed immediately', 'E.g. van repair £300'] },
            },
          },
          {
            h: 'Borderline examples',
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
        skills: ['itbk-de'],
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
        title: 'Bridge to Level 3 — Advanced Bookkeeping',
        icon: '🌉',
        skills: ['itbk-tb', 'itbk-adjust'],
        l3Bridge: true,
        cards: [
          {
            h: 'Where Level 3 begins',
            p: [
              'AAT Level 3 Certificate in Accounting has five mandatory units. The most directly linked to Level 2 ITBk are **Advanced Bookkeeping (AVBK)** and **Final Accounts Preparation (FAPS)**. At Level 3, double-entry bookkeeping and the trial balance are assumed knowledge — you go straight into more complex scenarios.',
              'Think of Level 2 ITBk as learning to drive in a car park. Level 3 AVBK is taking that skill onto a motorway: same rules, more complexity.',
            ],
          },
          {
            h: 'Advanced Bookkeeping (AVBK) at Level 3',
            p: [
              'AVBK extends everything in ITBk. You will: produce and interpret an extended trial balance; account for complex depreciation scenarios (straight-line and reducing balance in the same year; part-year depreciation; disposal of non-current assets); handle accruals and prepayments for income as well as expenses; and use journals to correct a wider range of errors.',
              'The disposal of non-current assets is a key new topic: Dr Disposal account with cost, Cr Asset; Dr Accumulated depreciation, Cr Disposal; then record proceeds and the profit or loss on disposal.',
            ],
          },
          {
            h: 'Final Accounts Preparation (FAPS) at Level 3',
            p: [
              'FAPS takes the ETB and turns it into financial statements for sole traders and — new at Level 3 — **partnerships**. For partnerships, you prepare an **appropriation account** that shows how profit is shared between partners using: partners\' salaries, interest on capital, and a profit-sharing ratio (PSR).',
              'Each partner has two ledger accounts: a **capital account** (permanent investment) and a **current account** (running balance of share of profit, drawings, interest, and salary).',
            ],
          },
          {
            h: 'Tax Processes for Business (TPFB) at Level 3',
            p: [
              'ITBk\'s VAT knowledge feeds directly into TPFB at Level 3. You will complete the VAT 100 return, deal with different VAT schemes (cash accounting, annual accounting, flat rate), and tackle import VAT and reverse charge scenarios.',
              'TPFB also introduces **income tax for sole traders** — calculating taxable trading profit after allowable expenses, applying the personal allowance, and computing the income tax liability at basic and higher rate.',
            ],
          },
          {
            h: 'The foundations you have already mastered',
            p: [
              'Every skill from ITBk reappears at Level 3: DEAD CLIC for debit and credit rules, double-entry for every transaction, the trial balance as a check, VAT calculations, the accounting equation, and accruals and prepayments.',
              'Level 3 adds depth and complexity — not new foundations. You are better prepared than you might think. The extended trial balance is the single biggest new concept, and you have just learned it.',
            ],
          },
        ],
        check: [
          {
            q: 'Which Level 3 unit most directly extends your ITBk double-entry skills?',
            opts: ['Management Accounting Techniques (MATS)', 'Business Awareness (BUAW)', 'Advanced Bookkeeping (AVBK)', 'Indirect Tax'],
            ans: 2,
            exp: 'Advanced Bookkeeping (AVBK) is the direct Level 3 extension of ITBk. It builds on double-entry, journals, the trial balance, adjustments, and depreciation — all covered at Level 2.',
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
            q: 'The Level 3 unit that extends ITBk VAT knowledge to include completing VAT returns and income tax is:',
            opts: ['Advanced Bookkeeping (AVBK)', 'Management Accounting Techniques (MATS)', 'Business Awareness (BUAW)', 'Tax Processes for Business (TPFB)'],
            ans: 3,
            exp: 'Tax Processes for Business (TPFB) covers VAT returns (VAT 100), different VAT schemes, and introduces income tax for sole traders — all building on the VAT foundation from Level 2 ITBk.',
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
    title: 'Principles of Bookkeeping Controls',
    lessons: [
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
        skills: ['pobc-ca'],
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
            h: 'Advanced Bookkeeping (AVBK) extensions from POBC',
            p: [
              'At Level 3, you will clear suspense accounts using journals (not just identify the error type as in POBC). You will also post journals for complex scenarios: dishonoured (bounced) cheques, capital introduced mid-year, contra entries between the SLCA and PLCA, and the disposal of non-current assets.',
              'A **contra entry** arises when a customer is also a supplier — the two balances are offset: Dr PLCA / Cr SLCA. This removes the double counting from both control accounts.',
            ],
          },
          {
            h: 'Partnership accounts in Final Accounts Preparation (FAPS)',
            p: [
              'Once you can prepare an ETB, FAPS at Level 3 adds **partnerships**. A partnership appropriation account allocates net profit: first deducting partners\' salaries and interest on capital; the remainder is divided by the **profit-sharing ratio (PSR)**.',
              'Each partner has two accounts: a **capital account** (fixed investment, rarely changes) and a **current account** (running total of salary, interest, profit share, less drawings). The current account balance carries to the balance sheet.',
            ],
          },
          {
            h: 'VAT returns and payroll in Tax Processes for Business (TPFB)',
            p: [
              'At Level 3, you complete the **VAT 100 form**, deal with different VAT schemes (cash accounting, flat rate, annual accounting), and handle import VAT and partial exemption. This extends ITBk and POBC VAT knowledge significantly.',
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
    title: 'Principles of Costing',
    lessons: [
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
            split: {
              left: { title: 'Under-absorption', items: ['Absorbed < Actual overheads', 'Not enough overheads charged', 'Debit to income statement', 'Reduces profit'] },
              right: { title: 'Over-absorption', items: ['Absorbed > Actual overheads', 'Too many overheads charged', 'Credit to income statement', 'Increases profit'] },
            },
          },
          {
            h: 'Building the full unit cost',
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
            opts: ['Advanced Bookkeeping (AVBK)', 'Final Accounts Preparation (FAPS)', 'Tax Processes for Business (TPFB)', 'Management Accounting Techniques (MATS)'],
            ans: 3,
            exp: 'Management Accounting Techniques (MATS) directly extends POC: standard costing, variance analysis, flexible budgeting, and performance measurement all build on the overhead absorption, CVP, and budgeting skills developed in POC.',
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
            split: {
              left: { title: 'Higher interest rates', items: ['Borrowing more expensive', 'Reduced consumer spending', 'Investment may fall', 'Currency often strengthens'] },
              right: { title: 'Lower interest rates', items: ['Cheaper borrowing', 'More consumer spending', 'Investment encouraged', 'Currency may weaken'] },
            },
          },
          {
            h: 'The economic cycle',
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
        title: 'Sources of finance',
        icon: '💰',
        skills: ['besy-finance'],
        cards: [
          {
            h: 'Short-term vs long-term finance',
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
            h: 'Tax Processes for Business (TPFB) — a new unit at Level 3',
            p: [
              'There is no direct TPFB equivalent at Level 2, but your ITBk and POBC VAT knowledge feeds straight in. TPFB covers: completing the VAT 100 return; VAT schemes (cash accounting, annual accounting, flat rate scheme for small businesses); import VAT and reverse charge; and partial exemption basics.',
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
            opts: ['Introduction to Bookkeeping (ITBk)', 'Principles of Costing (POC)', 'The Business Environment (BESY)', 'Principles of Bookkeeping Controls (POBC)'],
            ans: 2,
            exp: 'BUAW at Level 3 extends the content from BESY at Level 2 — business structures, economic analysis, ethics, stakeholders, sustainability, and sources of finance. It applies these concepts in more complex, strategy-focused scenarios.',
          },
          {
            q: 'Which of the following is covered in Tax Processes for Business (TPFB) at Level 3 but is NOT covered at Level 2?',
            opts: ['Calculating 20% VAT on standard-rated supplies', 'Knowing the difference between input and output VAT', 'Calculating income tax on a sole trader\'s taxable profit', 'Recording VAT in the VAT control account'],
            ans: 2,
            exp: 'Income tax calculation for sole traders is first examined in TPFB at Level 3. VAT arithmetic, input/output VAT distinctions, and VAT ledger entries are all covered at Level 2 (ITBk and POBC).',
          },
        ],
      },
    ],
  },

  /* ══════════════════════════════════════════════════════════
     AAT LEVEL 3 — INTRODUCTORY UNITS
     ══════════════════════════════════════════════════════════ */
  {
    unit: 'avbk',
    title: 'Advanced Bookkeeping',
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
    ],
  },
  {
    unit: 'faps',
    title: 'Final Accounts Preparation',
    lessons: [
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
    title: 'Management Accounting: Costing',
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
        title: 'Income Tax for Sole Traders',
        icon: '💷',
        skills: [],
        cards: [
          {
            h: 'Computing Taxable Trading Profit',
            p: [
              'Start with **accounting net profit**, then adjust for tax:',
              '**Add back** disallowable expenses (depreciation, drawings, private costs, fines).',
              '**Deduct** capital allowances (the tax equivalent of depreciation).',
              'The result is **taxable trading profit** — the figure HMRC taxes.',
            ],
            formula: 'Taxable profit = Accounting profit + Disallowable expenses − Capital allowances',
            callout: { kind: 'warning', text: 'Depreciation is ALWAYS disallowable — add it back to accounting profit in every question. Replace it with capital allowances.' },
          },
          {
            h: 'Capital Allowances',
            p: [
              '**Annual Investment Allowance (AIA)**: 100% first-year deduction for qualifying plant and machinery (up to the annual limit, currently £1 million). Claimed in full in the year of purchase.',
              '**Writing Down Allowance (WDA)**: 18% per year on the reducing balance of the main pool; 6% for the special rate pool (long-life assets, integral building features).',
              'On disposal: if the pool is extinguished with remaining value, a **balancing allowance** gives full relief; if sale proceeds exceed the pool, a **balancing charge** claws back over-claimed relief.',
            ],
            formula: 'AIA = 100% of cost (up to limit) · WDA main = 18% × Tax written-down value · WDA special = 6% × TWDV',
          },
          {
            h: 'Income Tax Rates and Payment Dates',
            p: [
              'Once taxable trading profit is established, deduct the **personal allowance** (£12,570 for 2024/25) to get taxable income. Rates: **20% basic** (up to £37,700); **40% higher** (£37,701–£125,140); **45% additional** (above £125,140).',
              'Sole traders pay tax via **Self Assessment**. Two payments on account: **31 January** in the tax year and **31 July** after the tax year (each 50% of prior year\'s liability). Balancing payment due **31 January** after the tax year end.',
            ],
            callout: { kind: 'key', text: 'Payment on account dates: 31 Jan (in year) and 31 Jul (after year). Balancing payment: 31 Jan after year end. Online Self Assessment return also due 31 January.' },
          },
        ],
        check: [
          {
            q: 'Accounting profit £64,000; depreciation charged £8,500; capital allowances £11,200. Taxable profit is:',
            opts: ['£61,300', '£52,800', '£72,500', '£64,000'],
            ans: 0,
            exp: '£64,000 + £8,500 (add back depreciation) − £11,200 (capital allowances) = £61,300.',
          },
          {
            q: 'Which of the following is an allowable trading expense for income tax purposes?',
            opts: [
              'The owner\'s drawings from the business',
              'Depreciation on business equipment',
              'Wages paid to a member of staff',
              'A speeding fine incurred while making a delivery',
            ],
            ans: 2,
            exp: 'Staff wages are allowable — wholly and exclusively for trade. Drawings, depreciation, and fines are all disallowable.',
          },
          {
            q: 'The Annual Investment Allowance provides:',
            opts: [
              '18% reducing balance allowance each year on plant purchases',
              '100% first-year deduction for qualifying plant and machinery up to the limit',
              'A flat £5,000 deduction available to all businesses',
              '25% accelerated depreciation in year one',
            ],
            ans: 1,
            exp: 'The AIA gives 100% tax relief in the year of purchase for most plant and machinery, up to the annual limit (£1m for 2024/25). This accelerates tax relief compared to the 18% WDA.',
          },
          {
            q: 'A sole trader\'s tax liability for 2023/24 was £10,000. The first payment on account for 2024/25 is due:',
            opts: ['31 July 2024', '31 January 2025', '31 October 2024', '31 January 2026'],
            ans: 1,
            exp: 'The first payment on account for 2024/25 is due 31 January 2025 (during the tax year). It is 50% of the prior year liability = £5,000.',
          },
        ],
      },
    ],
  },
  {
    unit: 'buaw',
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
