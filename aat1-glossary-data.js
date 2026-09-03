/* AAT Level 1 — Bookkeeping Fundamentals: the glossary.
 *
 * WHY A SEPARATE FILE AND NOT A FIELD ON THE LESSONS
 *
 * Twenty of this unit's cards already carry a `terms` list, and those exist to
 * be read in place — a definition arrives beside the paragraph that needs it,
 * which is where a first-time reader wants it. This file is for the other use:
 * looking a word up weeks later, and being drilled on it. Those want every term
 * in one alphabet, searchable, independent of which lesson happened to
 * introduce it.
 *
 * The two must agree, and that is checked rather than hoped for: every term
 * taught on a card appears here, asserted by scripts/check-glossary.js. A
 * glossary that quietly disagreed with the teaching would be worse than none,
 * because the reader would have no way of knowing which to believe.
 *
 * SHAPE
 *
 *   { t: 'Term', d: 'What it means.', lo: 3 }
 *
 * `lo` is the outcome the term belongs to, so the glossary can be read one
 * outcome at a time and so a flashcard run can be drawn to the exam weighting
 * the way every other run in this app is.
 *
 * WHAT A DEFINITION IS FOR HERE. Not a dictionary entry — a sentence that would
 * let a reader answer an exam question about the thing. Where the specification
 * draws a line the definition names it: "Level 2, not here" is more useful to a
 * Level 1 candidate than a fuller definition would be, because the commonest
 * mistake at this level is answering the Level 2 version of the question.
 */
(function (root) {
  'use strict';

  var TERMS = [
    /* ── Outcome 1 · The role of the bookkeeper ─────────────────────────── */
    { t: 'Bookkeeper', d: 'The person who records and checks a business’s financial transactions and prepares the documentation behind them. Records and checks; does not decide — anything outside the routine goes to a supervisor.', lo: 1 },
    { t: 'Transaction', d: 'A single piece of business involving money — one sale, one purchase, one payment. The unit of everything you record.', lo: 1 },
    { t: 'Financial documentation', d: 'The paperwork that evidences transactions: invoices, credit notes, orders, delivery notes, receipts and remittance advices.', lo: 1 },
    { t: 'Timely', d: 'Available in time to be acted on. Information that is perfectly accurate but arrives after the decision has been made is of no use, which is why timeliness is assessed alongside accuracy rather than after it.', lo: 1 },
    { t: 'Overstatement', d: 'Recording an amount as larger than it really is. Overstated sales inflate reported profit and the tax due on it.', lo: 1 },
    { t: 'Understatement', d: 'Recording an amount as smaller than it really is. Understated purchases inflate reported profit just as surely as overstated sales do.', lo: 1 },
    { t: 'Goodwill', d: 'The willingness of a customer or supplier to keep dealing with you. Lost by chasing money that was already paid, by paying late, or by getting their paperwork wrong — and much slower to rebuild than to lose.', lo: 1 },
    { t: 'Compliance deadline', d: 'A date fixed by law or by a regulator — a VAT return, a payroll submission, a set of accounts. Missing one is a matter of penalties rather than of inconvenience.', lo: 1 },
    { t: 'Duplicated payment', d: 'Paying the same supplier invoice twice, usually because it was entered twice or because a payment was not marked as made. The money leaves the business and has to be asked for back.', lo: 1 },
    { t: 'Code of Professional Ethics', d: 'AAT’s rulebook for its members, built on five fundamental principles. Breaching it is a disciplinary matter whether or not any law was broken.', lo: 1 },
    { t: 'Integrity', d: 'Being straightforward and honest in all professional and business relationships. The principle breached by saying something you know to be untrue, or by letting something untrue stand.', lo: 1 },
    { t: 'Objectivity', d: 'Not letting bias, conflict of interest or pressure from anyone override your professional judgement.', lo: 1 },
    { t: 'Professional competence and due care', d: 'Keeping your knowledge current, and doing the work carefully. It is the principle that requires you to refuse work you are not able to do.', lo: 1 },
    { t: 'Confidentiality', d: 'Not disclosing information gained at work, and not using it for your own advantage. It applies to employers and clients, current and former, and it does not end when the job does.', lo: 1 },
    { t: 'Professional behaviour', d: 'Complying with relevant laws and regulations, and avoiding conduct that would discredit the profession — including conduct outside work.', lo: 1 },
    { t: 'General Data Protection Regulation (GDPR)', d: 'The data-protection law governing personal information. Sharing a customer’s details without authority breaches it as well as breaching confidentiality.', lo: 1 },
    { t: 'Encryption', d: 'Scrambling data so that it can only be read by someone holding the key. Protects information that is stolen or intercepted, rather than preventing the theft.', lo: 1 },
    { t: 'Firewall', d: 'A barrier between a network and the outside, allowing only permitted traffic through. Keeps intruders out; does nothing about a password written on a note.', lo: 1 },
    { t: 'Authentication', d: 'Proving you are who you claim to be before a system lets you in — a password, a code sent to a phone, a fingerprint.', lo: 1 },
    { t: 'Anti-virus software', d: 'Software that detects and removes malicious programs. Useful only while it is kept up to date, because it recognises threats it has been told about.', lo: 1 },
    { t: 'Phishing', d: 'A message pretending to come from someone trusted, designed to make you hand over a password or make a payment. The attack that firewalls and anti-virus software do not stop, because the person lets it in.', lo: 1 },
    { t: 'Money laundering', d: 'Handling the proceeds of crime so that they appear legitimate. A criminal offence, and so is failing to report a suspicion of it.', lo: 1 },
    { t: 'Accountancy service', d: 'Work of the kind bookkeeping is. Providing it externally means registering for anti-money-laundering supervision.', lo: 1 },
    { t: 'Suspicious activity report', d: 'The report a bookkeeper makes when they suspect money laundering. Making one is required; telling the client you have made one is a separate offence.', lo: 1 },
    { t: 'Supervisor', d: 'The person work is referred to when it falls outside what you are authorised or able to do. Referring upwards is a duty, not an admission.', lo: 1 },

    /* ── Outcome 2 · Financial transactions ─────────────────────────────── */
    { t: 'Asset', d: 'Something the business owns or is owed — cash, a van, inventory, money due from customers.', lo: 2 },
    { t: 'Liability', d: 'Something the business owes to someone else — a supplier, a bank, HMRC.', lo: 2 },
    { t: 'Income', d: 'Value earned by the business, chiefly from sales. Increases profit and so increases capital.', lo: 2 },
    { t: 'Expense', d: 'Value used up in running the business — rent, wages, fuel. Reduces profit and so reduces capital.', lo: 2 },
    { t: 'Capital', d: 'The owner’s stake in the business: what they put in, plus profits earned, less anything taken out.', lo: 2 },
    { t: 'Profit', d: 'Income greater than expenses over a period. Increases capital.', lo: 2 },
    { t: 'Loss', d: 'Expenses greater than income over a period. Reduces capital.', lo: 2 },
    { t: 'Drawings', d: 'Value taken out of the business by the owner for personal use. Reduces capital, and is never an expense — the owner is not a cost of trading.', lo: 2 },
    { t: 'Accounting equation', d: 'Assets = Capital + Liabilities. Everything the business holds was funded either by the owner or by someone else, so the two sides can never disagree.', lo: 2 },
    { t: 'Dual effect', d: 'Every transaction changes at least two items in the records, by equal amounts. It is why the accounting equation still balances after each one.', lo: 2 },
    { t: 'Bookkeeping system', d: 'The set of records a business keeps its transactions in. At this level: books of prime entry and the cash book. Ledger accounts, debits and credits are Level 2.', lo: 2 },

    /* ── Outcome 3 · Customer and supplier transactions ─────────────────── */
    { t: 'Customer', d: 'Someone who buys from the business.', lo: 3 },
    { t: 'Supplier', d: 'Someone the business buys from.', lo: 3 },
    { t: 'Cash sale', d: 'A sale paid for at the time. Nothing is owed afterwards, so no receivable arises — “cash” here means “not on credit”, and includes card payments.', lo: 3 },
    { t: 'Credit sale', d: 'A sale where the customer pays later. Creates a receivable, and an invoice is what records it.', lo: 3 },
    { t: 'Cash purchase', d: 'A purchase paid for at the time. Creates no payable.', lo: 3 },
    { t: 'Credit purchase', d: 'A purchase where the business pays later. Creates a payable.', lo: 3 },
    { t: 'Receivable', d: 'Money owed to the business by a credit customer. An asset.', lo: 3 },
    { t: 'Payable', d: 'Money the business owes to a credit supplier. A liability.', lo: 3 },
    { t: 'Quotation', d: 'A price offered before any order is placed. Not a sale, and not a document anything is recorded from — but the price it names is what a later invoice should be checked against.', lo: 3 },
    { t: 'Sales order', d: 'The customer’s instruction to supply, recorded by the seller. Says what was agreed, so an invoice can be checked against it.', lo: 3 },
    { t: 'Purchase order', d: 'The business’s own instruction to a supplier to supply. The document a purchase invoice is checked against for price and quantity.', lo: 3 },
    { t: 'Delivery note', d: 'Sent with the goods, saying what is in the parcel. Evidence of what left the seller — not evidence of what arrived.', lo: 3 },
    { t: 'Goods received note (GRN)', d: 'Raised by the buyer on receiving goods, saying what actually arrived and in what condition. The document that catches a short delivery, because it is written by the person who opened the box.', lo: 3 },
    { t: 'Goods returned note', d: 'Records goods sent back to a supplier. The document a purchase credit note is checked against.', lo: 3 },
    { t: 'Invoice', d: 'The demand for payment on a credit transaction. States what was supplied, the net amount, the VAT and the total, and is the document the day books are written from.', lo: 3 },
    { t: 'Credit note', d: 'Reduces an amount already invoiced — for a return, a shortage or an overcharge. Never a second invoice, and never used to cancel an unpaid invoice that was simply wrong in a way a corrected invoice would fix.', lo: 3 },
    { t: 'Cash receipt', d: 'Evidence that money was handed over at the time of sale.', lo: 3 },
    { t: 'Remittance advice', d: 'Sent by a payer to say which invoices a payment covers. It is what lets the receiver allocate the money to the right invoices instead of guessing.', lo: 3 },
    { t: 'Net', d: 'The amount before VAT. Discounts come off this figure, and it is the figure VAT is then calculated on.', lo: 3 },
    { t: 'VAT', d: 'Value Added Tax, charged on the net amount at the standard rate. Collected from the customer on HMRC’s behalf; it is never the seller’s income.', lo: 3 },
    { t: 'Standard rate', d: 'The main rate of VAT. At this level VAT is always calculated forwards from the net amount — working backwards from a gross figure is Level 2.', lo: 3 },
    { t: 'Total', d: 'Net plus VAT: the amount actually payable.', lo: 3 },
    { t: 'Bulk discount', d: 'A reduction for buying a large quantity, taken off the net amount before VAT is calculated. Applying VAT first and discounting after gives the wrong VAT.', lo: 3 },
    { t: 'Unit price', d: 'The price of one item. Multiplied by the quantity to give the line net amount, which is where a miscount shows up first.', lo: 3 },
    { t: 'Product code', d: 'The reference identifying what was supplied. Checked against the order: a right description with a wrong code is still the wrong item.', lo: 3 },
    { t: 'Invoice number', d: 'The seller’s unique reference for one invoice. What a remittance advice quotes, and what a credit note refers back to.', lo: 3 },
    { t: 'Customer reference', d: 'The number the customer asked to see on the invoice — usually their own purchase order number. Wrong or missing, and the invoice may sit unpaid without anyone disputing it.', lo: 3 },
    { t: 'Book of prime entry', d: 'The first place a transaction is written down, before anything else happens to it. At this level: the four day books and the cash book.', lo: 3 },
    { t: 'Sales day book', d: 'Lists sales invoices raised, with net, VAT and total columns.', lo: 3 },
    { t: 'Purchases day book', d: 'Lists purchase invoices received.', lo: 3 },
    { t: 'Sales returns day book', d: 'Lists sales credit notes issued — goods customers sent back.', lo: 3 },
    { t: 'Purchases returns day book', d: 'Lists purchase credit notes received — goods the business sent back.', lo: 3 },
    { t: 'Cast', d: 'To add a column down to its total.', lo: 3 },
    { t: 'Cross cast', d: 'To check across the totals: net plus VAT must equal total. Catches a figure entered in the wrong column, which casting down each column separately never would.', lo: 3 },

    /* ── Outcome 4 · Receipts and payments ──────────────────────────────── */
    { t: 'Cash book', d: 'The book of prime entry for money in and money out, with a receipts side and a payments side. At this level it is a listing; it is not part of the double-entry system, which is Level 2.', lo: 4 },
    { t: 'Receipts side', d: 'The side of the cash book recording money coming in.', lo: 4 },
    { t: 'Payments side', d: 'The side of the cash book recording money going out.', lo: 4 },
    { t: 'Analysis column', d: 'A column splitting each entry into what it was for — cash sales, receivables, VAT, expenses. Lets the total for one kind of item be read off without going through every line.', lo: 4 },
    { t: 'Cash in hand', d: 'Notes and coins the business physically holds.', lo: 4 },
    { t: 'Cash at bank', d: 'Money in the business’s bank account.', lo: 4 },
    { t: 'Opening amount', d: 'What was held at the start of the period. Closing = opening + received − paid; forget the opening figure and every closing figure after it is wrong by the same amount.', lo: 4 },
    { t: 'Closing amount', d: 'What is held at the end of the period, after the period’s receipts and payments.', lo: 4 },
    { t: 'Paying-in book', d: 'The record of what was paid into the bank and when — the stub is the evidence a receipt reached the account.', lo: 4 },
    { t: 'Cheque stub', d: 'The part of a cheque kept when the cheque is torn out, recording who it was to and for how much.', lo: 4 },
    { t: 'Standing order', d: 'An instruction from the payer to the bank to pay a fixed amount on fixed dates. The payer controls it, so the amount only changes if the payer changes it.', lo: 4 },
    { t: 'Direct Debit', d: 'An authority for the payee to collect varying amounts on varying dates. The payee controls it — which is what makes it right for a bill that changes and wrong for a fixed payment you want to control.', lo: 4 },
    { t: 'BACS', d: 'A bank transfer that takes about three working days to clear. Cheap, and used for wages and supplier runs.', lo: 4 },
    { t: 'Faster Payments', d: 'A bank transfer that arrives within minutes, subject to a limit. Used when the money has to be there today.', lo: 4 },
    { t: 'Debit card payment', d: 'Money taken from the bank account at the time of purchase. Appears on the bank statement as a payment, not as a cash withdrawal.', lo: 4 },
    { t: 'Counter credit', d: 'Money paid in over the counter or through a paying-in machine, shown as a receipt on the bank statement.', lo: 4 },
    { t: 'Bank charges', d: 'What the bank takes for running the account. Usually first seen on the statement rather than in the cash book, because nobody wrote them down.', lo: 4 },
    { t: 'Bank interest received', d: 'Interest the bank pays on a credit balance. A receipt, and another item that reaches the cash book from the statement rather than the other way round.', lo: 4 },
    { t: 'Bank statement', d: 'The bank’s own record of the account. Compared with the cash book to see what one has that the other does not.', lo: 4 },
    { t: 'Bank feed', d: 'An automatic link that pulls bank transactions into accounting software as they happen, without anyone typing them.', lo: 4 },
    { t: 'Timing difference', d: 'An item in one record and not yet in the other — a cheque written but not presented, a receipt paid in but not cleared. The commonest reason the two closing figures differ, and not an error.', lo: 4 },
    { t: 'Unpresented cheque', d: 'A cheque written and entered in the cash book that the payee has not yet paid in, so the bank has not taken the money.', lo: 4 },
    { t: 'Outstanding lodgement', d: 'Money paid in and entered in the cash book that the bank has not yet credited.', lo: 4 },
    { t: 'Opening amount owed', d: 'What a customer owed, or what was owed to a supplier, at the start of the period — before any of this period’s invoices, credit notes or payments. Leave it out and every balance calculated afterwards is short by it.', lo: 4 },
    { t: 'Amounts owed by customers', d: 'What each credit customer still owes: opening amount, plus invoices, less credit notes, less receipts.', lo: 4 },
    { t: 'Amounts owed to suppliers', d: 'What the business still owes each credit supplier: opening amount, plus invoices, less credit notes, less payments.', lo: 4 },
    { t: 'Aged receivables analysis', d: 'A report splitting what customers owe by how long it has been outstanding. It answers “who should I chase first”, which a total owed cannot.', lo: 4 },
    { t: 'Aged payables analysis', d: 'The same report for what the business owes, splitting payables by age.', lo: 4 },
    { t: 'Allocation', d: 'Matching a receipt or payment to the invoices it settles. An unallocated payment leaves the customer looking as though they owe money they have already paid.', lo: 4 },

    /* ── Outcome 5 · Accounting software ────────────────────────────────── */
    { t: 'Accounting software', d: 'A program that records transactions and produces reports from them. It changes how entries are made and how quickly they can be read back; it does not change what an invoice or a receipt is.', lo: 5 },
    { t: 'CSV file', d: 'A plain text file of rows and columns that almost any system can read or write. The usual way data moves between programs that were not built to talk to each other.', lo: 5 },
    { t: 'Import', d: 'Bringing data into the software from elsewhere — a bank feed, a CSV file, another app.', lo: 5 },
    { t: 'Export', d: 'Sending data out of the software in a form something else can read.', lo: 5 },
    { t: 'Integrate', d: 'To connect two systems so data passes between them without being retyped. Saves time and removes the errors that retyping introduces.', lo: 5 },
    { t: 'Real time', d: 'Reflecting the position now rather than at the last time somebody updated it. What makes a software report worth running today.', lo: 5 },
    { t: 'Pro-forma', d: 'A template with the standing details already filled in, ready to be completed — what the software raises a document from rather than the finished document. A pro-forma invoice is a draft sent before the sale is final, to request payment in advance or to show what the invoice will say; it is not a demand for payment of a completed sale.', lo: 5 },
    { t: 'Recurring invoice', d: 'An invoice the software raises again on a schedule. The saving is real and so is the risk: if the amount or the frequency changes and nobody changes the schedule, it keeps raising the old one.', lo: 5 },
    { t: 'Automated matching', d: 'The software suggesting which invoice a bank receipt settles, learning from what was matched before. A suggestion, which still has to be right before it is accepted.', lo: 5 },
    { t: 'Off-the-shelf software', d: 'Software sold ready-made to many businesses. Cheaper, available now, well supported — and only does what it was built to do.', lo: 5 },
    { t: 'Bespoke software', d: 'Software written for one business. Fits exactly, and costs more, takes longer to build and depends on whoever wrote it for support.', lo: 5 },
    { t: 'Cloud software', d: 'Software run on the provider’s servers and reached through a browser. Updates itself, works from any device, and needs an internet connection to work at all.', lo: 5 },
    { t: 'Traditional accounting software', d: 'Software installed on the business’s own computers. Works without the internet, and has to be updated and backed up by the business.', lo: 5 },
    { t: 'Subscription', d: 'Paying for software periodically rather than buying it once. Spreads the cost and keeps the software current; stop paying and access stops.', lo: 5 },
    { t: 'Backup', d: 'A second copy of the data kept somewhere else. The only protection against a system crash, a corrupt file or an accidental deletion — all of which are threats no password prevents.', lo: 5 },
    { t: 'Hacking', d: 'Unauthorised access to a system. A threat to data security, guarded against by strong passwords, authentication and firewalls.', lo: 5 },
    { t: 'Employee fraud', d: 'Dishonesty by someone who is supposed to have access. The reason access is restricted to what each person needs, rather than granted to everyone who works there.', lo: 5 },
  ];

  var AAT1_GLOSSARY = { TERMS: TERMS };

  if (typeof module === 'object' && module.exports) module.exports = { AAT1_GLOSSARY: AAT1_GLOSSARY };
  else root.AAT1_GLOSSARY = AAT1_GLOSSARY;
}(typeof self !== 'undefined' ? self : this));
