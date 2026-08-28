/* ----------------------------------------------------------
   AAT Level 2 — cheat sheets, one per skill
   ----------------------------------------------------------
   A cheat sheet REVISES; it does not teach. Everything here has
   already been taught by a lesson in learn-data.js, at length
   and with worked examples. This is the version you open the
   night before: the formula, the rule, and the two things people
   reliably get backwards.

   WHY ONE PER SKILL AND NOT ONE PER UNIT. "Cheat sheets for each
   topic" could mean four pages, one per unit — and a page that
   summarises eighteen lessons is a poster, not a cheat sheet.
   The skill taxonomy in skills.js is already the level at which
   this qualification has topics: VAT calculations, bank
   reconciliation, payroll, overhead absorption. It is also the
   level at which the app already reports weakness, so the sheet
   a reader needs is the one named beside the score that sent
   them looking. Every topic gets its full set; no skill is
   without one.

   A SHEET IS NOT A LESSON. It claims no assessment criteria,
   carries no questions, and cannot be completed — so it stays
   out of LEARN_PATH, which is what feeds lesson numbering, unit
   progress, the unit-complete badge and the coverage check. See
   findSheet() in app.js for the normalisation.

   `card` uses the same vocabulary the lesson player already
   paints: h, p, formula, table, split, flow, callout, examtrap.
   ** ** marks bold in p, table cells, split items, callout and
   examtrap; formula lines are separated by "·".
   ---------------------------------------------------------- */

window.AAT2_SHEETS = [

  /* ══ ITBK — Introduction to Bookkeeping ═════════════════════════════════ */

  {
    id: 'S-itbk-de', skill: 'itbk-de', topic: 'itbk', icon: '⚖️',
    title: 'Double entry on one page',
    blurb: 'DEAD CLIC, the five account types, and which side increases which.',
    card: {
      h: 'Double entry essentials',
      p: [
        'Every transaction is recorded **twice**, once as a debit and once as a credit, for the **same amount**. If the two sides do not agree, the entry is wrong — not merely untidy.',
        'Everything a business records is one of **five** types of account, and the type is what decides the side.',
      ],
      table: {
        headers: ['Account type', 'Increased by', 'Decreased by', 'Examples'],
        rows: [
          ['**E**xpenses', 'Debit', 'Credit', 'Rent, wages, purchases, fuel'],
          ['**A**ssets', 'Debit', 'Credit', 'Bank, cash, inventory, receivables, equipment'],
          ['**D**rawings', 'Debit', 'Credit', 'Cash or goods taken by the owner'],
          ['**L**iabilities', 'Credit', 'Debit', 'Payables, loans, VAT owed to HMRC'],
          ['**I**ncome', 'Credit', 'Debit', 'Sales, fees, commission received'],
          ['**C**apital', 'Credit', 'Debit', 'What the owner put in, plus retained profit'],
        ],
      },
      callout: { kind: 'key', text: '**DEAD CLIC** — Debits: Expenses, Assets, Drawings. Credits: Liabilities, Income, Capital. Then ask the second question: what is the business **receiving** (debit) and what is it **giving** (credit)?' },
      split: {
        left: { title: 'A credit sale of £600', items: ['**Dr** Receivables £600 — the asset owed to us rises', '**Cr** Sales £600 — income rises'] },
        right: { title: 'Paying a supplier £400', items: ['**Dr** Payables £400 — the liability falls', '**Cr** Bank £400 — the asset falls'] },
      },
      examtrap: 'Money **in** to the bank is a **debit**, because bank is an asset. Readers who think of a bank statement get this backwards every time — the statement is written from the bank\'s point of view, and your books are written from yours.',
    },
  },

  {
    id: 'S-itbk-tb', skill: 'itbk-tb', topic: 'itbk', icon: '🧮',
    title: 'The trial balance and the accounting equation',
    blurb: 'Which balances go in which column, and why a balanced trial balance still hides six errors.',
    card: {
      h: 'Trial balance and the accounting equation',
      formula: 'Assets = Capital + Liabilities · Closing capital = Opening capital + Capital introduced + Profit − Drawings',
      p: [
        'A trial balance lists every ledger account\'s **balance carried down**, in a debit column or a credit column. The two columns should agree, because every transaction was entered on both sides.',
        'Transfer the **balance**, never the account **total**. An account with £9,000 of debits and £5,000 of credits has a total of £9,000 and a balance of £4,000 Dr — and only the £4,000 belongs in the trial balance.',
      ],
      split: {
        left: { title: 'Debit column', items: ['Assets — bank, cash, inventory, receivables, machinery', 'Expenses — rent, wages, purchases, carriage inwards', 'Drawings', 'Sales returns'] },
        right: { title: 'Credit column', items: ['Liabilities — payables, loans, VAT owed', 'Income — sales, commission received, discounts received', 'Capital', 'Purchases returns'] },
      },
      callout: { kind: 'key', text: 'The accounting equation is why it balances at all: everything the business **has** was funded either by the owner (capital) or by someone else (liabilities).' },
      examtrap: 'A trial balance that agrees does **not** mean the books are right. Six kinds of error leave it agreeing — omission, commission, principle, original entry, reversal and compensating — because each puts an equal figure on both sides. Agreeing only rules out one-sided errors.',
    },
  },

  {
    id: 'S-itbk-vat', skill: 'itbk-vat', topic: 'itbk', icon: '🧾',
    title: 'VAT in four calculations',
    blurb: 'Net, gross and the ÷6 shortcut, plus which discounts come off before VAT.',
    card: {
      h: 'VAT calculations',
      formula: 'VAT = Net × 20% · Gross = Net × 1.20 · Net = Gross ÷ 1.20 · VAT from gross = Gross ÷ 6',
      p: [
        'Decide **which figure you have** before you calculate anything. **Net** is the price before VAT; **gross** is the price including it. Almost every wrong answer in this topic starts by treating one as the other.',
        'The ÷6 shortcut works because at 20%, gross is six fifths of net — so VAT is exactly one sixth of gross. It is a shortcut, not a different rule.',
      ],
      table: {
        headers: ['Rate', 'Applies to', 'Can the business reclaim its input tax?'],
        rows: [
          ['**Standard 20%**', 'Most goods and services', 'Yes'],
          ['**Reduced 5%**', 'Domestic fuel, some energy-saving work', 'Yes'],
          ['**Zero-rated 0%**', 'Most food, books, children\'s clothes', 'Yes — the supply is taxable, just at 0%'],
          ['**Exempt**', 'Insurance, most finance, postage', 'No — this is the difference that matters'],
        ],
      },
      callout: { kind: 'key', text: '**Output tax** is VAT charged on sales; **input tax** is VAT paid on purchases. You pay HMRC the difference, and VAT owed is a **liability** — never income or an expense.' },
      split: {
        left: { title: 'Comes off BEFORE VAT', items: ['**Trade discount** — a standing discount for that customer', '**Bulk discount** — for the size of the order'] },
        right: { title: 'Does NOT come off before VAT', items: ['**Settlement (prompt payment) discount** — VAT is charged on the undiscounted net', 'If the customer then takes it, the supplier issues a **credit note** for the discount and the VAT on it'] },
      },
      examtrap: 'Dividing a gross figure by **5** instead of **6**. £600 gross contains £100 of VAT (600 ÷ 6), not £120 — £120 is the VAT on £600 **net**.',
    },
  },

  {
    id: 'S-itbk-cogs', skill: 'itbk-cogs', topic: 'itbk', icon: '📉',
    title: 'Cost of sales and gross profit',
    blurb: 'What the goods sold actually cost — not what was bought — and where carriage goes.',
    card: {
      h: 'Cost of sales and closing inventory',
      formula: 'Cost of sales = Opening inventory + Purchases + Carriage inwards − Purchases returns − Closing inventory · Gross profit = Revenue − Cost of sales',
      p: [
        'Cost of sales is what the goods **sold** cost, not what was **bought**. Anything still on the shelf at the year end has not been sold, so its cost is taken back out.',
        'Read the formula as a story: you started with some stock, you bought more, some went back to the supplier, and whatever is left over was not sold.',
      ],
      example: {
        title: 'Worked through',
        rows: [
          ['Opening inventory', '£4,000'],
          ['Purchases', '£31,000'],
          ['Carriage inwards', '£800'],
          ['Purchases returns', '(£1,200)'],
          ['Closing inventory', '(£5,500)'],
          ['**Cost of sales**', '**£29,100**'],
          ['Revenue', '£46,000'],
          ['**Gross profit**', '**£16,900**'],
        ],
      },
      callout: { kind: 'key', text: 'Inventory is valued at the **lower of cost and net realisable value**. Stock that can only be sold for less than it cost is written down to what it will fetch.' },
      examtrap: '**Carriage inwards** — the cost of getting goods **in** — is part of cost of sales. **Carriage outwards** — delivering to customers — is a selling expense and never touches cost of sales. Putting outwards in the trading account is the single most common slip in this topic.',
    },
  },

  {
    id: 'S-itbk-docs', skill: 'itbk-docs', topic: 'itbk', icon: '📄',
    title: 'The document trail and the books of prime entry',
    blurb: 'Which document arrives when, and which day book it lands in.',
    card: {
      h: 'Documents and books of prime entry',
      p: [
        'Every transaction leaves a paper trail, and each document does **one** job. Knowing the order is most of this topic.',
      ],
      flow: ['Purchase order', 'Delivery note', 'Invoice', 'Credit note', 'Statement of account', 'Remittance advice'],
      table: {
        headers: ['Document', 'What it says', 'Book of prime entry'],
        rows: [
          ['**Sales invoice**', 'What the customer owes us, and why', 'Sales day book'],
          ['**Credit note issued**', 'We are reducing what the customer owes', 'Sales returns day book'],
          ['**Purchase invoice**', 'What we owe a supplier', 'Purchases day book'],
          ['**Credit note received**', 'A supplier is reducing what we owe', 'Purchases returns day book'],
          ['**Receipt / paying-in slip**', 'Money in', 'Cash book'],
          ['**Cheque stub / BACS report**', 'Money out', 'Cash book'],
          ['**Petty cash voucher**', 'A small cash payment, authorised', 'Petty cash book'],
          ['**Journal voucher**', 'Anything with no other home — corrections, year-end entries', 'The journal'],
        ],
      },
      callout: { kind: 'key', text: 'A book of prime entry is where a transaction is **first listed**, before it reaches the ledger. Nothing is posted straight to a ledger account without passing through one.' },
      examtrap: 'A **statement of account** is a summary of what is already owed, not a new transaction — nothing is entered from it. A **delivery note** proves goods arrived; it carries no prices and is never entered as a purchase. Only the **invoice** does that.',
    },
  },

  {
    id: 'S-itbk-cashbook', skill: 'itbk-cashbook', topic: 'itbk', icon: '💷',
    title: 'The cash book, petty cash and discounts',
    blurb: 'Both a day book and a ledger account, plus the imprest calculation.',
    card: {
      h: 'Cash book, bank and discounts',
      formula: 'Imprest top-up = Float − Cash remaining',
      p: [
        'The cash book is unusual: it is **both** a book of prime entry **and** part of the double entry. It is the bank and cash ledger accounts, so nothing else is posted to them.',
        'Money **in** is debited; money **out** is credited. Bank is an asset, and assets rise on the debit side.',
      ],
      split: {
        left: { title: 'Discounts **allowed** — to our customers', items: ['An **expense** to us', '**Dr** Discounts allowed, **Cr** Sales ledger control', 'Reduces what the customer has to pay'] },
        right: { title: 'Discounts **received** — from our suppliers', items: ['**Income** to us', '**Dr** Purchases ledger control, **Cr** Discounts received', 'Reduces what we have to pay'] },
      },
      table: {
        headers: ['Petty cash — the imprest system', 'How it works'],
        rows: [
          ['The float', 'A fixed sum, say £150, held in the tin'],
          ['During the period', 'Vouchers are paid out and kept in the tin in place of the cash'],
          ['At the top-up', 'Restore the tin to £150 exactly'],
          ['**The top-up figure**', '**£150 − cash remaining**, which always equals the vouchers'],
        ],
      },
      callout: { kind: 'key', text: 'Under the imprest system the tin always holds the same total: cash plus vouchers equals the float. If it does not, something is missing.' },
      examtrap: 'A **dishonoured cheque** reverses the original receipt: the money came in and then went back out, so the customer owes it again. Treating it as a fresh sale double-counts the income.',
    },
  },

  /* ══ POBC — Principles of Bookkeeping Controls ══════════════════════════ */

  {
    id: 'S-pobc-ca', skill: 'pobc-ca', topic: 'pobc', icon: '🔒',
    title: 'Control accounts, side by side',
    blurb: 'Every entry in the sales and purchases ledger control accounts, and which side it goes on.',
    card: {
      h: 'Control accounts',
      p: [
        'A control account is a **summary in the general ledger** of a whole subsidiary ledger. The sales ledger control account holds the total owed by all customers; the individual customer accounts sit outside the double entry and must agree with it.',
        'The two control accounts are mirror images. Learn one properly and the other is its reflection.',
      ],
      split: {
        left: { title: 'Sales ledger control (SLCA) — an asset', items: ['**Dr** Opening balance owed to us', '**Dr** Credit sales', '**Dr** Dishonoured cheques', '**Dr** Interest charged to customers', '**Cr** Receipts from customers', '**Cr** Sales returns (credit notes issued)', '**Cr** Discounts allowed', '**Cr** Irrecoverable debts written off', '**Cr** Contra with the purchases ledger'] },
        right: { title: 'Purchases ledger control (PLCA) — a liability', items: ['**Cr** Opening balance we owe', '**Cr** Credit purchases', '**Cr** Interest charged by suppliers', '**Dr** Payments to suppliers', '**Dr** Purchases returns (credit notes received)', '**Dr** Discounts received', '**Dr** Contra with the sales ledger'] },
      },
      table: {
        headers: ['Reconciling the control account', 'What a difference means'],
        rows: [
          ['Total the individual accounts in the subsidiary ledger', 'This total should equal the control account balance'],
          ['**Difference in the control account**', 'A day book was cast wrongly, or a total was posted wrongly'],
          ['**Difference in the subsidiary ledger**', 'An individual invoice or receipt was posted to the wrong account, or omitted, or entered at the wrong figure'],
          ['**Both need adjusting**', 'Only the control account correction is a journal — the subsidiary ledger is outside the double entry'],
        ],
      },
      callout: { kind: 'key', text: 'A **contra** happens when the same business is both a customer and a supplier. The smaller balance is set off against the larger: **Dr** PLCA, **Cr** SLCA, the same figure in both.' },
      examtrap: '**Cash sales never enter the SLCA.** The control account records what is **owed**, and a cash sale was never owed. The same applies to cash purchases and the PLCA. Also: an irrecoverable debt written off leaves the SLCA, but the VAT on it is a separate adjustment.',
    },
  },

  {
    id: 'S-pobc-bankrec', skill: 'pobc-bankrec', topic: 'pobc', icon: '🏦',
    title: 'Bank reconciliation in two halves',
    blurb: 'Update the cash book first; only timing differences belong in the reconciliation.',
    card: {
      h: 'Bank reconciliation',
      formula: 'Bank statement balance + Unpresented cheques − Outstanding lodgements = Updated cash book balance',
      p: [
        'A reconciliation has **two halves**, and doing them in the wrong order is what goes wrong. First **update the cash book**. Only then reconcile what is left.',
      ],
      split: {
        left: { title: 'Half 1 — update the cash book', items: ['Items the bank knew about and you did not:', 'Bank charges and interest paid', 'Interest received', 'Direct debits and standing orders', 'BACS receipts you had not recorded', 'Dishonoured cheques', '**These are real transactions and are entered in the books**'] },
        right: { title: 'Half 2 — the reconciliation itself', items: ['Items you knew about and the bank did not yet:', '**Unpresented cheques** — written, not yet cleared', '**Outstanding lodgements** — banked, not yet credited', '**These are timing differences only and are never entered in the books**'] },
      },
      callout: { kind: 'key', text: 'The direction follows from what has already happened. You have already taken the unpresented cheques out of the cash book, so the statement is **higher** by that amount; you have already put the lodgements in, so the statement is **lower** by that amount.' },
      examtrap: 'On a **bank statement** a **credit** balance means money in your favour and a **debit** balance means an overdraft — the opposite of your own cash book, because the statement is written from the bank\'s point of view. An error made by the bank is corrected by the bank, not by a journal in your books.',
    },
  },

  {
    id: 'S-pobc-errors', skill: 'pobc-errors', topic: 'pobc', icon: '🔍',
    title: 'The six errors that hide, and the ones that show',
    blurb: 'Which errors leave the trial balance agreeing, and how to name each one.',
    card: {
      h: 'Errors and the trial balance',
      p: [
        'The question is always the same: does this error put an **unequal** figure on the two sides? If it does, the trial balance disagrees and a suspense account appears. If it does not, the trial balance agrees and nothing points at the mistake.',
      ],
      table: {
        headers: ['Error the trial balance CANNOT find', 'What happened'],
        rows: [
          ['**Omission**', 'The transaction was left out completely — both sides missing'],
          ['**Commission**', 'Right type of account, wrong account — a sale posted to the wrong customer'],
          ['**Principle**', 'Wrong **type** of account — a new van posted to Motor expenses instead of Motor vehicles'],
          ['**Original entry**', 'Both sides posted, both wrong by the same amount — £560 entered as £650 twice'],
          ['**Reversal of entries**', 'The debit and the credit were swapped'],
          ['**Compensating**', 'Two separate errors of equal size on opposite sides, cancelling out'],
        ],
      },
      split: {
        left: { title: 'These DO break the trial balance', items: ['**Single-sided entry** — one side posted, the other not', '**Casting error** — an account or column added up wrongly', '**Transposition** — £540 entered as £450 on one side only', '**Posting to the wrong side** of an account', '**Extraction error** — the balance copied into the wrong column'] },
        right: { title: 'How to spot a transposition', items: ['The difference is always divisible by **9**', '£540 − £450 = £90', '£1,872 − £1,782 = £90', 'A difference of £90, £180 or £270 is worth checking for one'] },
      },
      callout: { kind: 'key', text: 'Only the errors that **break** the trial balance ever reach a **suspense account**. The six above leave it agreeing, so there is no difference to hold — and correcting one of them never touches suspense.' },
      examtrap: 'An **error of principle** is the wrong **type** of account — capital spending charged as an expense. An **error of commission** is the right type in the wrong place — the correct kind of account, just not that one. Naming them the other way round is the standard mark lost here.',
    },
  },

  {
    id: 'S-pobc-susp', skill: 'pobc-susp', topic: 'pobc', icon: '❓',
    title: 'Clearing a suspense account',
    blurb: 'Three questions that turn any correction into a journal.',
    card: {
      h: 'Suspense accounts and journals',
      p: [
        'A suspense account is a **temporary holding place** for a difference nobody can yet explain. It goes on whichever side makes the trial balance agree, and it must be cleared before any accounts are prepared.',
        'Every correction answers the same three questions, in this order.',
      ],
      flow: ['What WAS posted?', 'What SHOULD have been posted?', 'Journal the difference'],
      example: {
        title: 'Rent of £430 was posted to the rent account as £340. The debits are £90 short.',
        rows: [
          ['What was posted', 'Dr Rent £340 · Cr Bank £430'],
          ['What should have been posted', 'Dr Rent £430 · Cr Bank £430'],
          ['The difference', 'Rent needs £90 more on the debit side'],
          ['**The journal**', '**Dr Rent £90 · Cr Suspense £90**'],
        ],
      },
      callout: { kind: 'key', text: 'If the trial balance disagreed by £90 with the credits higher, the suspense account was opened with a **£90 debit** — and the correcting journal credits it back to nil. The suspense account should always end at zero.' },
      examtrap: 'An error that did **not** break the trial balance is corrected **without touching suspense**. Correcting an error of commission is Dr the right account, Cr the wrong one — suspense never appears, because nothing was ever out of balance.',
    },
  },

  {
    id: 'S-pobc-tb', skill: 'pobc-tb', topic: 'pobc', icon: '⚖️',
    title: 'Redrafting a trial balance',
    blurb: 'Balance brought down, not the total — and what a journal does to a balance.',
    card: {
      h: 'Trial balances',
      p: [
        'Redrafting is mechanical once two things are settled: **which column** each balance belongs in, and **what each adjustment does** to it.',
      ],
      split: {
        left: { title: 'Debit column', items: ['**E**xpenses', '**A**ssets', '**D**rawings', 'Sales returns', 'A suspense account with a debit balance'] },
        right: { title: 'Credit column', items: ['**L**iabilities', '**I**ncome', '**C**apital', 'Purchases returns', 'A suspense account with a credit balance'] },
      },
      table: {
        headers: ['The journal is on…', 'Effect on the balance'],
        rows: [
          ['The **same** side as the existing balance', 'The balance **increases**'],
          ['The **opposite** side', 'The balance **decreases**'],
          ['The opposite side, by more than the balance', 'The balance **changes column**'],
        ],
      },
      callout: { kind: 'key', text: 'Transfer the **balance brought down**, never the account **total**. The total counts everything that ever went through the account; the balance is what is left.' },
      examtrap: 'A redrafted trial balance that still does not agree usually means an adjustment was applied to only one of its two accounts. Every journal has two lines, and both change a balance in the trial balance.',
    },
  },

  {
    id: 'S-pobc-payroll', skill: 'pobc-payroll', topic: 'pobc', icon: '👥',
    title: 'Payroll — cost to the business, cash to the employee',
    blurb: 'Two different totals, and why deductions are liabilities rather than expenses.',
    card: {
      h: 'Payroll',
      formula: "Net pay = Gross pay − PAYE − Employee's NIC − Employee's pension · Total cost to the business = Gross pay + Employer's NIC + Employer's pension",
      p: [
        'Payroll has **two totals and they are never the same**. What the employee takes home is the gross pay less what is deducted from it. What the business is out of pocket is the gross pay **plus** what the employer pays on top.',
        'Deductions are not the business\'s money and never were. They are **liabilities** owed on to HMRC and the pension provider until they are paid over.',
      ],
      example: {
        title: 'Gross pay £2,400 · PAYE £360 · employee NIC £150 · employee pension £120 · employer NIC £250 · employer pension £180',
        rows: [
          ['Net pay to the employee', '2,400 − 360 − 150 − 120 = **£1,770**'],
          ['Owed to HMRC', '360 + 150 + 250 = **£760**'],
          ['Owed to the pension provider', '120 + 180 = **£300**'],
          ['**Total cost to the business**', '2,400 + 250 + 180 = **£2,830**'],
        ],
      },
      callout: { kind: 'key', text: 'The three figures above add back: £1,770 + £760 + £300 = £2,830. Every penny of the cost is either paid to the employee or owed to somebody on their behalf — which is the check to run on any payroll question.' },
      examtrap: "**Employer's NIC is an extra cost to the business, not a deduction from the employee.** It never reduces net pay. Adding it to the deductions is the mistake this topic is built to catch — and it changes both totals at once.",
    },
  },

  /* ══ POC — Principles of Costing ════════════════════════════════════════ */

  {
    id: 'S-poc-behaviour', skill: 'poc-behaviour', topic: 'poc', icon: '🧱',
    title: 'How costs behave, and the high-low method',
    blurb: 'Fixed, variable, stepped and semi-variable — and splitting a mixed cost in two.',
    card: {
      h: 'Cost classification and behaviour',
      formula: 'Total cost = Fixed element + (Variable per unit × Units) · Variable per unit = (Highest cost − Lowest cost) ÷ (Highest units − Lowest units)',
      p: [
        'Classification always asks the same question: **what happens to this cost when activity changes?** Test it against output, not against time.',
      ],
      table: {
        headers: ['Behaviour', 'Total cost as output rises', 'Cost per unit as output rises', 'Example'],
        rows: [
          ['**Fixed**', 'Stays the same', '**Falls**', 'Factory rent, insurance'],
          ['**Variable**', 'Rises in direct proportion', 'Stays the same', 'Direct materials, piecework labour'],
          ['**Stepped**', 'Jumps at capacity points, flat between', 'Falls, then jumps', 'One supervisor per 20 workers'],
          ['**Semi-variable**', 'Rises, but from a standing start', 'Falls, but never to the variable rate', 'Phone line rental plus call charges'],
        ],
      },
      example: {
        title: 'High-low: 4,000 units cost £26,000; 9,000 units cost £41,000',
        rows: [
          ['Variable per unit', '(41,000 − 26,000) ÷ (9,000 − 4,000) = **£3.00**'],
          ['Variable at 4,000 units', '4,000 × 3.00 = £12,000'],
          ['**Fixed element**', '26,000 − 12,000 = **£14,000**'],
          ['Cost of 7,000 units', '14,000 + (7,000 × 3.00) = **£35,000**'],
        ],
      },
      callout: { kind: 'key', text: '**Direct or indirect** is a different question from **fixed or variable**. Direct means the cost can be traced to one unit of output; indirect means it cannot, and is therefore an overhead. A cost can be direct and fixed, or indirect and variable.' },
      examtrap: '"Fixed cost per unit" is **not** fixed — it falls as output rises, because the same total is spread over more units. A question that gives you a fixed cost per unit at one activity level and asks for the total at another is testing exactly this.',
    },
  },

  {
    id: 'S-poc-inv', skill: 'poc-inv', topic: 'poc', icon: '📦',
    title: 'FIFO, LIFO and AVCO',
    blurb: 'Which cost leaves the store first, and what each method does to profit.',
    card: {
      h: 'Inventory valuation',
      formula: 'AVCO rate = Total cost of inventory held ÷ Total units held, recalculated after every receipt',
      p: [
        'The goods are identical; only the **costs** attached to them differ, because they were bought at different prices. The method decides which cost is charged out with an issue and which is left in stock.',
      ],
      table: {
        headers: ['Method', 'Issues are valued at', 'Closing inventory carries', 'Allowed in published accounts?'],
        rows: [
          ['**FIFO** — first in, first out', 'The **oldest** cost', 'The **newest** prices', 'Yes'],
          ['**LIFO** — last in, first out', 'The **newest** cost', 'The **oldest** prices', '**No** — not permitted under IFRS or UK GAAP'],
          ['**AVCO** — weighted average', 'The average cost at that moment', 'The same average', 'Yes'],
        ],
      },
      example: {
        title: 'Receipts: 100 units at £5, then 100 at £7. Then 120 units are issued.',
        rows: [
          ['FIFO issue', '(100 × 5) + (20 × 7) = **£640** · 80 units left at £7 = £560'],
          ['LIFO issue', '(100 × 7) + (20 × 5) = **£800** · 80 units left at £5 = £400'],
          ['AVCO rate', '(500 + 700) ÷ 200 = **£6.00** per unit'],
          ['AVCO issue', '120 × 6.00 = **£720** · 80 units left at £6 = £480'],
        ],
      },
      callout: { kind: 'key', text: 'When prices are **rising**, FIFO gives the lowest cost of sales and so the **highest** profit and the highest closing inventory; LIFO gives the highest cost of sales and the lowest profit. AVCO sits between them. When prices are falling, it is the other way round.' },
      examtrap: 'AVCO is recalculated **after every receipt**, not once at the end of the period. An issue is valued at the average as it stood when the issue was made — averaging the whole period in one go gives a different, wrong, answer.',
    },
  },

  {
    id: 'S-poc-labour', skill: 'poc-labour', topic: 'poc', icon: '🛠️',
    title: 'Paying for labour',
    blurb: 'Time rate, piecework, bonus — and where overtime premium and idle time go.',
    card: {
      h: 'Labour costs',
      formula: 'Time rate = Hours × Rate (+ Overtime hours × Premium) · Piecework = Units made × Rate per unit · Overtime premium = Overtime rate − Basic rate',
      p: [
        'Find the **pay basis** before you calculate anything: paid for **time**, paid for **output**, or a basic rate topped up by a **bonus**.',
      ],
      table: {
        headers: ['Basis', 'How it is calculated', 'Who carries the risk'],
        rows: [
          ['**Time rate**', 'Hours worked × hourly rate', 'The employer — pay is the same whatever is produced'],
          ['**Piecework**', 'Units produced × rate per unit', 'The employee — a slow day is a small wage'],
          ['**Piecework with a guarantee**', 'The **higher** of piecework and the guaranteed minimum', 'Shared'],
          ['**Bonus scheme**', 'Basic pay + a share of the time or cost saved', 'Shared'],
        ],
      },
      split: {
        left: { title: 'Usually a DIRECT cost', items: ['Basic pay of production workers, for hours spent making the product', 'Piecework pay', 'Overtime premium **when the customer asked for the rush**'] },
        right: { title: 'Usually an INDIRECT cost (overhead)', items: ['**Overtime premium** in the normal course of business', '**Idle time** — paid hours with no output', 'Supervisors, storekeepers, maintenance', 'Holiday and sick pay'] },
      },
      callout: { kind: 'key', text: 'Overtime splits in two. The hours at the **basic** rate are treated like any other hours; only the **premium** — the extra above basic — is separated out, because charging it to whichever job happened to run late would price that job wrongly.' },
      examtrap: '"Time and a half" means the premium is **half** the basic rate, not one and a half times it. At £12 an hour, four overtime hours are £48 basic plus a £24 premium — a total of £72, not £72 of premium.',
    },
  },

  {
    id: 'S-poc-oar', skill: 'poc-oar', topic: 'poc', icon: '📈',
    title: 'Absorbing overheads, and mark-up vs margin',
    blurb: 'Budgeted rate × actual activity — and the two percentages people swap.',
    card: {
      h: 'Overhead absorption and margins',
      formula: 'OAR = Budgeted overheads ÷ Budgeted activity · Absorbed = OAR × ACTUAL activity · Under- or over-absorbed = Absorbed − Incurred',
      p: [
        'Overheads reach a product in three steps, and the words are the marks: **allocate** what belongs wholly to one cost centre, **apportion** what is shared, then **absorb** into units at a rate set in advance.',
      ],
      flow: ['Allocate', 'Apportion', 'Reapportion service centres', 'Absorb into units'],
      example: {
        title: 'Budget: £180,000 of overheads over 12,000 labour hours. Actual: 11,000 hours worked, £172,000 incurred.',
        rows: [
          ['OAR', '180,000 ÷ 12,000 = **£15.00 per labour hour**'],
          ['Absorbed', '11,000 × 15.00 = **£165,000**'],
          ['Incurred', '**£172,000**'],
          ['**Result**', '165,000 − 172,000 = **£7,000 under-absorbed** — charged to profit'],
        ],
      },
      callout: { kind: 'key', text: 'The rate is **budgeted ÷ budgeted**, but it is applied to **actual** activity. Using actual overheads in the rate would defeat the point — the rate exists so a job can be costed before the year\'s real overheads are known.' },
      split: {
        left: { title: '**Mark-up** is a % of COST', items: ['Cost £80, mark-up 25%', 'Profit = 80 × 25% = £20', 'Selling price = **£100**', 'Cost is the 100%'] },
        right: { title: '**Margin** is a % of SALES', items: ['Sales £100, margin 20%', 'Profit = 100 × 20% = £20', 'Cost = **£80**', 'Sales is the 100%'] },
      },
      examtrap: 'A 25% **mark-up** and a 20% **margin** are the **same £20 of profit** — they differ only in what the percentage is taken of. Under-absorbed means too little was charged to production, so profit must be **reduced**; over-absorbed increases it.',
    },
  },

  {
    id: 'S-poc-budget', skill: 'poc-budget', topic: 'poc', icon: '📊',
    title: 'Variances — adverse or favourable',
    blurb: 'One subtraction, then one question: does this make profit higher or lower?',
    card: {
      h: 'Budgets and variances',
      formula: 'Variance = Actual − Budget · Variance % = Variance ÷ Budget × 100',
      p: [
        'The arithmetic is a subtraction. The mark is in the **label**, and the label never depends on the sign — it depends on what the difference does to profit.',
      ],
      table: {
        headers: ['', 'Actual is MORE than budget', 'Actual is LESS than budget'],
        rows: [
          ['**Income / sales**', '**Favourable** — more revenue', '**Adverse** — less revenue'],
          ['**Costs / expenses**', '**Adverse** — spent more', '**Favourable** — spent less'],
        ],
      },
      callout: { kind: 'key', text: 'Ask one question and the label follows: **does this make profit higher or lower?** Higher is favourable, lower is adverse. Nothing else needs remembering.' },
      split: {
        left: { title: 'Reporting a variance', items: ['Give the **amount** and the **direction**', 'Give it as a **% of budget** — £3,000 on a £6,000 budget is serious; on £600,000 it is not', 'Compare against the **significance threshold** the question sets'] },
        right: { title: 'Explaining one', items: ['A price change — paid more or less per unit', 'A usage change — used more or less than planned', 'A volume change — made or sold more or less', 'A budget that was wrong to begin with'] },
      },
      examtrap: 'A **favourable** variance is not automatically good news. Spending less on materials may mean cheaper materials that will fail, and spending less on training may show up as an adverse labour variance next quarter. The label describes the effect on **this period\'s profit**, nothing more.',
    },
  },

  {
    id: 'S-poc-product', skill: 'poc-product', topic: 'poc', icon: '🏗️',
    title: 'Building a product cost, layer by layer',
    blurb: 'Prime cost up to cost of goods sold, with the two inventory adjustments.',
    card: {
      h: 'Product cost and the manufacturing account',
      formula: 'Prime (direct) cost = Direct materials + Direct labour + Direct expenses · Manufacturing cost = Prime cost + Production overhead · Cost of goods manufactured = Manufacturing cost + Opening WIP − Closing WIP · Cost of goods sold = Cost of goods manufactured + Opening finished goods − Closing finished goods',
      p: [
        'The cost is built **upwards** in named layers. Each layer adds exactly one thing, and each has a name the marker is looking for — writing the right number under the wrong heading loses the mark.',
      ],
      example: {
        title: 'The four layers, in order',
        rows: [
          ['Direct materials + direct labour + direct expenses', '= **Prime cost**'],
          ['Prime cost + production overhead', '= **Manufacturing cost**'],
          ['Manufacturing cost + opening WIP − closing WIP', '= **Cost of goods manufactured**'],
          ['Cost of goods manufactured + opening finished goods − closing finished goods', '= **Cost of goods sold**'],
        ],
      },
      callout: { kind: 'key', text: 'Both inventory adjustments work the same way and for the same reason: **add what you started with, take away what you are left with**. Work in progress adjusts the manufacturing layer; finished goods adjusts the selling layer.' },
      examtrap: '**Non-production overheads never enter these layers.** Administration, selling and distribution costs are period costs, deducted after gross profit. Putting the sales manager\'s salary into manufacturing cost overstates the value of every unit in stock.',
    },
  },

  {
    id: 'S-poc-coding', skill: 'poc-coding', topic: 'poc', icon: '🏷️',
    title: 'Coding and the three kinds of centre',
    blurb: 'Cost, profit and investment centres — and what each manager is answerable for.',
    card: {
      h: 'Coding and responsibility centres',
      p: [
        'A **responsibility centre** is a part of the business with somebody answerable for it. Which kind it is depends on **what that person controls** — and therefore on what it is fair to judge them by.',
      ],
      table: {
        headers: ['Centre', 'The manager controls', 'Judged on'],
        rows: [
          ['**Cost centre**', 'Costs only', 'Costs against budget'],
          ['**Profit centre**', 'Costs **and** revenue', 'Profit'],
          ['**Investment centre**', 'Costs, revenue **and** capital spending', 'Return on the capital employed'],
        ],
      },
      split: {
        left: { title: 'What a code does', items: ['Routes each cost to the **centre** that incurred it', 'Records the **type** of cost — materials, labour, overhead', 'Records the **behaviour** — fixed or variable', 'Lets the system total any of those without re-reading the invoices'] },
        right: { title: 'What makes a good code', items: ['Unique — one code, one meaning', 'Consistent in length and format', 'Long enough to expand into', 'Meaningful enough to be checked by eye'] },
      },
      callout: { kind: 'key', text: 'The point of the split is fairness. Charging a cost centre manager with revenue they cannot influence, or an investment they cannot authorise, measures the wrong person.' },
      examtrap: 'A **canteen or maintenance department is a cost centre**, not a profit centre, even though it charges other departments. An internal recharge is not revenue — no money enters the business.',
    },
  },

  {
    id: 'S-poc-systems', skill: 'poc-systems', topic: 'poc', icon: '🗂️',
    title: 'Costing systems and where the figures come from',
    blurb: 'Financial vs management accounting, and which costing system fits which business.',
    card: {
      h: 'Costing systems and information sources',
      p: [
        'The same transactions feed two different jobs. **Financial accounting** reports the past to outsiders, in one total, in a form the law prescribes. **Costing** analyses the same events for insiders, at whatever level of detail a decision needs, using actual **or** budgeted figures.',
      ],
      split: {
        left: { title: 'Financial accounting', items: ['**For** owners, HMRC, lenders, the public', 'Historic only', 'The whole business in one set of figures', 'Format set by law and standards', 'Annual, and late'] },
        right: { title: 'Cost and management accounting', items: ['**For** managers inside the business', 'Historic **and** forecast', 'By product, department, centre or job', 'Any format that helps', 'As often as it is useful'] },
      },
      table: {
        headers: ['Costing system', 'Suits', 'Because'],
        rows: [
          ['**Job costing**', 'A print shop, a garage', 'Each order is different and costed on its own'],
          ['**Batch costing**', 'A bakery, a clothing run', 'Identical items made in groups; cost per unit = batch cost ÷ units'],
          ['**Unit costing**', 'One standard product', 'Every unit is the same'],
          ['**Process costing**', 'Paint, chemicals, food', 'Continuous output — cost per unit is an average over the process'],
          ['**Service costing**', 'A hotel, a haulier', 'The output is not a thing, so a composite unit is used — a bed-night, a tonne-mile'],
        ],
      },
      callout: { kind: 'key', text: 'Information is worth having only if it is **relevant, accurate, timely and complete**, and only if it costs less to produce than the better decisions it leads to.' },
      examtrap: 'Costing figures are **not** governed by accounting standards and need not agree with the financial accounts. A question asking why two profit figures differ is usually testing that, not looking for an error.',
    },
  },

  {
    id: 'S-poc-ss', skill: 'poc-ss', topic: 'poc', icon: '📐',
    title: 'Spreadsheet formulas that get the mark',
    blurb: 'Exact syntax for SUM and the four operators, and when to use a $.',
    card: {
      h: 'Spreadsheets for cost calculations',
      formula: '=SUM(B2:B10) · =B2+C2 · =B2-C2 · =B2*C2 · =B2/C2 · =$B$2*C5',
      p: [
        '**Reference cells; never retype a number.** A typed figure does not update when the input changes, which is the entire reason for using a spreadsheet.',
        'Marks here are given for **exact** syntax, so the punctuation matters as much as the arithmetic.',
      ],
      table: {
        headers: ['Write', 'Not', 'Why'],
        rows: [
          ['`=SUM(B2:B10)`', '`=SUM(B2,B10)`', 'A **colon** means the whole range; a **comma** means only those two cells'],
          ['`=SUM(B2:B10)`', '`SUM(B2:B10)`', 'Every formula begins with **=**'],
          ['`=B2*C2`', '`=B2 x C2`', 'Multiply is **\\***, divide is **/**'],
          ['`=B2+C2`', '`=SUM(B2+C2)`', 'SUM is for ranges; a simple addition does not need it'],
          ['`=$B$2*C5`', '`=B2*C5`', 'A **$** locks the reference so it does not move when the formula is copied'],
        ],
      },
      callout: { kind: 'key', text: 'A **relative** reference (C5) shifts as the formula is copied down; an **absolute** one ($B$2) stays put. A rate or a total that every row must use gets dollars.' },
      examtrap: 'No spaces, no currency symbols and no brackets around a single cell. `=SUM (B2:B10)` and `=SUM(£B2:£B10)` both fail, and so does writing the answer instead of the formula when the question asked for the formula.',
    },
  },

  /* ══ BESY — The Business Environment ════════════════════════════════════ */

  {
    id: 'S-besy-structure', skill: 'besy-structure', topic: 'besy', icon: '🏢',
    title: 'Business types and who is liable',
    blurb: 'The one question that separates them: is the owner legally separate from the business?',
    card: {
      h: 'Business types and organisation',
      p: [
        'Every distinction in this topic follows from one question: **is the business a separate legal person from its owners?** If it is, the owners\' liability is limited to what they put in. If it is not, their own house is at risk.',
      ],
      table: {
        headers: ['Type', 'Separate legal person?', 'Owner\'s liability', 'Accounts filed publicly?'],
        rows: [
          ['**Sole trader**', 'No', '**Unlimited**', 'No'],
          ['**Ordinary partnership**', 'No', '**Unlimited**, and joint', 'No'],
          ['**Limited liability partnership (LLP)**', '**Yes**', 'Limited', 'Yes'],
          ['**Private limited company (Ltd)**', '**Yes**', 'Limited to shares held', 'Yes'],
          ['**Public limited company (plc)**', '**Yes**', 'Limited to shares held', 'Yes, and more of them'],
          ['**Not-for-profit / charity**', 'Usually yes', 'Limited', 'Yes, to its regulator'],
        ],
      },
      split: {
        left: { title: 'The functions of a business', items: ['**Finance** — records, reports, controls the money', '**Operations / production** — makes the thing', '**Sales and marketing** — finds and keeps customers', '**Human resources** — recruits, pays, develops people', '**IT** — the systems everything else runs on', '**Procurement** — buys what the business needs'] },
        right: { title: 'Who wants the accounts', items: ['**Internal** — managers, employees, owners', '**External** — HMRC, lenders, suppliers, customers', 'Investors, for whether to put money in', 'Regulators, because the law says so'] },
      },
      callout: { kind: 'key', text: 'A **plc** may offer its shares to the public; a **Ltd** may not. That, not size, is the legal difference between them.' },
      examtrap: '"Limited liability" limits the **owner\'s** liability, not the **company\'s**. The company itself is liable for everything it owes, without limit — which is precisely why it must be a separate legal person for the arrangement to work at all.',
    },
  },

  {
    id: 'S-besy-finance', skill: 'besy-finance', topic: 'besy', icon: '🏛️',
    title: 'The finance function and who watches it',
    blurb: 'What finance does for everyone else, and which outside body wants what.',
    card: {
      h: 'Finance and the accounting function',
      p: [
        'The finance function does two jobs at once: it **records and reports** what has happened, and it **supports every other function** in deciding what to do next. Questions in this topic almost always ask which of the two is in play.',
      ],
      table: {
        headers: ['Finance does this…', '…for this function'],
        rows: [
          ['Costs a product and sets a price floor', 'Sales and marketing'],
          ['Budgets for materials and monitors usage', 'Operations'],
          ['Runs payroll and forecasts staff costs', 'Human resources'],
          ['Checks a supplier\'s terms and settles invoices', 'Procurement'],
          ['Appraises the cost of a new system', 'IT'],
        ],
      },
      split: {
        left: { title: 'Inside finance', items: ['**Financial accounting** — the statutory record and the annual accounts', '**Management accounting** — budgets, costing, decision support', '**Credit control** — getting the money in', '**Payables** — paying suppliers on terms', '**Payroll** — paying people and HMRC'] },
        right: { title: 'Outside bodies', items: ['**HMRC** — tax and VAT', '**Companies House** — the register and filed accounts', '**The FRC** — accounting and auditing standards', '**AAT and the other professional bodies** — the conduct of members', '**The Information Commissioner** — data protection'] },
      },
      callout: { kind: 'key', text: 'Financial accounting looks **backwards** and outwards, and its form is prescribed. Management accounting looks **forwards** and inwards, and its form is whatever helps.' },
      examtrap: 'Filing accounts at **Companies House** and filing a return with **HMRC** are two separate obligations with different deadlines and different content. A question naming one is not asking about the other.',
    },
  },

  {
    id: 'S-besy-ethics', skill: 'besy-ethics', topic: 'besy', icon: '🌱',
    title: 'The five principles, the threats, and money laundering',
    blurb: 'What each principle asks of you, and the two money-laundering offences.',
    card: {
      h: 'Ethics and sustainability',
      table: {
        headers: ['The five fundamental principles', 'What it asks of you'],
        rows: [
          ['**Integrity**', 'Be straightforward and honest in everything professional'],
          ['**Objectivity**', 'No bias, no conflict of interest, no undue influence from anyone'],
          ['**Professional competence and due care**', 'Could I do this properly — and did I? Keep up to date; act carefully'],
          ['**Confidentiality**', 'What you learn at work stays there, during and after the engagement'],
          ['**Professional behaviour**', 'Obey the law and do nothing that discredits the profession'],
        ],
      },
      split: {
        left: { title: 'Threats to those principles', items: ['**Self-interest** — you gain from the outcome', '**Self-review** — you would be checking your own work', '**Familiarity** — too close to the person involved', '**Intimidation** — pressure, express or implied', '**Advocacy** — you have taken the client\'s side'] },
        right: { title: 'Safeguards', items: ['Consult your supervisor or the ethics helpline', 'Have the work reviewed by someone independent', 'Take the person concerned off the job', 'Document what was decided and why', 'Withdraw or resign, in the last resort'] },
      },
      p: [
        'Money laundering has three stages: **placement** of criminal cash into the system, **layering** to disguise its origin, and **integration** so it can be spent openly.',
      ],
      callout: { kind: 'key', text: 'A suspicion is reported internally to the **Money Laundering Reporting Officer**, who reports on to the **National Crime Agency**. You do not investigate, and you do not need proof — suspicion is the trigger.' },
      examtrap: 'There are **two separate offences** and staying quiet commits one of them: **failing to report** a suspicion, and **tipping off** — telling the person that a report has been made. Doing nothing is not the safe option; it is an offence in itself, and one that can be punished by imprisonment.',
    },
  },

  {
    id: 'S-besy-law', skill: 'besy-law', topic: 'besy', icon: '⚖️',
    title: 'What makes a contract, and the law around it',
    blurb: 'The four elements, why a price tag is not an offer, and the legislation named in the assessment.',
    card: {
      h: 'Contract law and legislation',
      p: [
        'A binding contract needs **four** things. Miss one and there is no contract, however much both sides thought there was.',
      ],
      table: {
        headers: ['Element', 'What it means', 'Where it fails'],
        rows: [
          ['**Offer**', 'A definite promise to be bound on stated terms', 'A vague willingness to discuss is not an offer'],
          ['**Acceptance**', 'Unqualified agreement to those exact terms', 'Changing a term is a **counter-offer**, which destroys the original'],
          ['**Consideration**', 'Each side gives something of value', 'A bare promise to give a gift is not enforceable'],
          ['**Intention to create legal relations**', 'Both meant it to be legally binding', 'Presumed **present** in business, **absent** in social and domestic arrangements'],
        ],
      },
      callout: { kind: 'key', text: 'Goods priced on a shelf or in a catalogue are an **invitation to treat**, not an offer. The **customer** makes the offer at the till, and the shop may accept or refuse it — which is why a mispriced item need not be sold at the wrong price.' },
      split: {
        left: { title: 'Legislation to know by name', items: ['**Consumer Rights Act 2015** — goods of satisfactory quality, fit for purpose, as described', '**UK GDPR and the Data Protection Act 2018** — how personal data may be held and used', '**Health and Safety at Work etc. Act 1974** — duties on employer and employee alike'] },
        right: { title: 'And these', items: ['**Equality Act 2010** — the nine protected characteristics', '**Employment Rights Act 1996** — contracts, notice, unfair dismissal', '**Companies Act 2006** — directors\' duties, filing, accounts'] },
      },
      examtrap: 'Consideration must be **sufficient** but need not be **adequate** — the law asks that each side gives something of value, not that the bargain is a good one. A car sold for £1 is a valid contract.',
    },
  },

  {
    id: 'S-besy-econ', skill: 'besy-econ', topic: 'besy', icon: '💹',
    title: 'Demand, supply and elasticity',
    blurb: 'Move one curve, read off the new price and quantity — and what PED above or below 1 means.',
    card: {
      h: 'The economy and markets',
      formula: 'PED = %Δ quantity demanded ÷ %Δ price (ignore the sign) · Greater than 1 = elastic · Less than 1 = inelastic',
      p: [
        'Sketch the move **first**, then read the answer off the diagram. Trying to reason it out in words is where these questions go wrong.',
      ],
      table: {
        headers: ['What happens', 'Effect on price', 'Effect on quantity traded'],
        rows: [
          ['**Demand rises** (incomes up, substitute dearer)', 'Up', 'Up'],
          ['**Demand falls**', 'Down', 'Down'],
          ['**Supply rises** (costs down, new entrants)', 'Down', 'Up'],
          ['**Supply falls** (costs up, poor harvest)', 'Up', 'Down'],
        ],
      },
      split: {
        left: { title: '**Elastic** demand — PED above 1', items: ['Quantity moves **more** than price, in percentage terms', 'Many substitutes, a luxury, a large share of income', 'A price **cut** raises total revenue'] },
        right: { title: '**Inelastic** demand — PED below 1', items: ['Quantity moves **less** than price', 'Few substitutes, a necessity, a small share of income, addictive', 'A price **rise** raises total revenue'] },
      },
      callout: { kind: 'key', text: 'Market structures run from **perfect competition** (many firms, identical products, no price-setting power) through **monopolistic competition** and **oligopoly** (a few large firms, interdependent) to **monopoly** (one dominant firm, a price maker).' },
      examtrap: 'A change in **price** moves you **along** a demand curve; a change in anything else — income, tastes, the price of a substitute — **shifts the whole curve**. Calling a shift "a change in demand caused by price" is the standard error here.',
    },
  },

  {
    id: 'S-besy-tech', skill: 'besy-tech', topic: 'besy', icon: '💻',
    title: 'Data security — threats and the control that answers each',
    blurb: 'Confidentiality, integrity, availability, and matching the control to the risk.',
    card: {
      h: 'Technology and data security',
      p: [
        'Every control exists to protect one of three things. Name the one at risk and the right control follows.',
      ],
      table: {
        headers: ['Protecting', 'Means', 'Controls'],
        rows: [
          ['**Confidentiality**', 'Only the right people can see it', 'Passwords, access rights, encryption, clear-desk rules, locked files'],
          ['**Integrity**', 'The data is accurate and has not been altered', 'Input validation, authorisation limits, reconciliations, audit trails, version control'],
          ['**Availability**', 'It is there when it is needed', '**Backups**, off-site or cloud copies, tested recovery, uninterruptible power'],
        ],
      },
      split: {
        left: { title: 'Threats', items: ['**Phishing** — a message that tricks you into giving access', '**Malware and ransomware** — software that damages or locks data', '**Social engineering** — persuading a person rather than defeating a system', '**Insider** — someone with legitimate access misusing it', '**Loss** — fire, flood, theft, a laptop on a train'] },
        right: { title: 'What technology is changing', items: ['**Cloud accounting** — always current, accessible anywhere', '**Automation** — bank feeds and invoice scanning remove keying', '**Data analytics** — testing whole populations, not samples', '**Making Tax Digital** — digital records and returns'] },
      },
      callout: { kind: 'key', text: 'A **backup is worthless until it has been restored**. An untested backup is a belief, not a control — and the failed restore is always discovered on the day it is needed.' },
      examtrap: 'A **strong password protects confidentiality, not availability**. If ransomware encrypts the files, no password recovers them — only a backup does. Matching the control to the wrong part of the triad is what these questions test.',
    },
  },

  {
    id: 'S-besy-comms', skill: 'besy-comms', topic: 'besy', icon: '✉️',
    title: 'Choosing the medium, and writing the thing',
    blurb: 'Which format for which audience, and the shape of a business message.',
    card: {
      h: 'Business communication and planning',
      p: [
        'Two decisions, in this order: **who is reading it and why**, then **which format that makes it**. Getting the format right is a mark on its own in the written tasks.',
      ],
      table: {
        headers: ['Format', 'Use it for', 'Register'],
        rows: [
          ['**Email**', 'A routine internal update, a quick external query', 'Businesslike; a clear subject line'],
          ['**Letter**', 'A formal external matter — a complaint, a debt, a contract', 'Formal; addresses, date, a proper sign-off'],
          ['**Memo / note**', 'A short internal record for a group', 'Brief; To, From, Date, Subject'],
          ['**Report**', 'Analysis someone will act on or file', 'Formal; headings, findings, then a recommendation'],
          ['**Face to face or phone**', 'Anything sensitive, or needing discussion', 'Confirm in writing afterwards'],
        ],
      },
      flow: ['Say why you are writing', 'Give the facts and figures', 'Say what happens next, and by when'],
      callout: { kind: 'key', text: 'Open with the **purpose**, not with pleasantries. A reader who cannot tell in one line what the message is for has already stopped reading — and in the assessment, a written task without a stated purpose loses the mark for it.' },
      split: {
        left: { title: 'Planning work', items: ['**SMART** objectives — Specific, Measurable, Achievable, Relevant, Time-bound', 'Break the work into tasks and put them in order', 'Identify what depends on what', 'Agree the deadline before you start'] },
        right: { title: 'When a deadline is at risk', items: ['Say so **early** — the cost of a late warning is borne by someone else', 'Say what has slipped and by how much', 'Propose the options, do not just report the problem', 'Never quietly deliver something incomplete'] },
      },
      examtrap: 'Written tasks are marked on **how** as well as **what**. Answering in note form when a letter was asked for, or omitting the figures the scenario supplied, loses marks that had nothing to do with the bookkeeping.',
    },
  },
];
