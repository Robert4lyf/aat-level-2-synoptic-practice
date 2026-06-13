#!/usr/bin/env python3

filepath = '/home/user/aat-level-2-synoptic-practice/data.js'

with open(filepath, 'r') as f:
    content = f.read()

# The scenarios to insert — note \' is escaped apostrophe inside JS single-quoted strings
new_scenarios = """
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

{ id: 'sc-027', topic: 'synoptic', difficulty: 'hard', type: 'scenario',
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

{ id: 'sc-028', topic: 'synoptic', difficulty: 'medium', type: 'scenario',
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

{ id: 'sc-029', topic: 'synoptic', difficulty: 'medium', type: 'scenario',
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
"""

# Find the last occurrence of ");" and replace it with new content + ");"
# The anchor is the very last line which is just ");"
last_closing = content.rfind('\n);')
if last_closing == -1:
    raise ValueError("Could not find closing );")

new_content = content[:last_closing] + new_scenarios + '\n);'

with open(filepath, 'w') as f:
    f.write(new_content)

print("Done! Scenarios sc-025 to sc-030 appended successfully.")
