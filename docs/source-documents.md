# Source documents — design note

The three AAT courses spend most of their length teaching a reader to work from
a piece of paper: an invoice, a credit note, a supplier statement, a payslip, a
bank statement, a VAT return. Before this they showed one **four times, all in
Level 1**. Level 2 discussed source documents across forty-one of its
sixty-eight lessons and never once put one in front of the reader. An
assessment does not work that way — it prints the document and asks for a
figure off it.

## Where the renderer came from

Level 1 had already solved the problem, in a local `docHtml()` inside
`aat1-ui.js`. Nothing else could reach it. That function is now `doc-figure.js`,
shared by all three levels and by the lesson player in `app.js`, with the parts
the other levels needed added: a stamp, authorisation lines, per-column
alignment, and annotations.

| Where | How it gets there |
| --- | --- |
| Level 1 | `aat1-ui.js` calls it with `stem: 'a1-doc'`, so its four existing documents look exactly as they did |
| Level 2, French, Code de la Route | `app.js` renders `card.doc` in the lesson player |
| Level 3 | `aat3-ui.js` renders `c.doc` |

Level 1 keeps its own class names because its document design is built out of
`--a1-*` tokens that exist only in `aat1-styles.css`. Everything else uses
`.doc-*` in `styles.css`. `doc-figure.js` names every class in one place, and
`classes(stem)` reports them, so both `check-subject-styles.js` and
`check-doc-figures.js` can ask the module what it can emit instead of guessing
at it with a regular expression.

## Two decisions worth writing down

**A document is data, not markup.** `app.js`'s lesson cards already accept a
`visual` field that takes raw HTML, and it would have been quicker to write the
invoices into it. It would also have made them uncheckable. Nobody can ask an
HTML invoice whether its VAT is 20% of its net, whether its lines add to its
total, or whether a statement's running balance actually runs.
`scripts/check-doc-figures.js` asks exactly those questions of all 19 documents
on every build:

- a line extends — quantity × unit price = amount
- a line with a VAT split — net + VAT = total
- the totals block chains — subtotals agree, bracketed lines come off, a VAT
  line is the percentage printed in its own label, and the last line equals the
  running figure
- a statement runs — every balance is the one before it, plus the charge and
  less the payment on that row
- rows worked out from other rows, declared as `derived` — a VAT return's box 3
  is boxes 1 and 2, and its box 5 is box 3 less box 4

Three fields exist only for that check and the renderer ignores all of them:
`running` says which way a statement's columns move its balance (a bank
statement's "paid out" reduces it; a supplier statement's "charges" increases
what is owed — same shape, opposite signs), `derived` says which rows come from
which others, and a total's third slot says what its percentage is worked on,
or `'memo'` for a line that is stated rather than added.

**Some documents are wrong on purpose, and have to say so.** Two of the
nineteen carry faults the reader is asked to find. Each has a `planted` note
saying what is wrong with it, and for those the check inverts: the arithmetic
failures are expected, and it is a document with a `planted` note and *nothing*
wrong with it that fails the build. A note cannot outlive the errors it
describes, and a real mistake cannot hide behind one.

## Annotations are the point

A picture of an invoice is decoration. An invoice with "① the invoice number —
unique, unbroken, and the reference the customer quotes on their remittance
advice" printed beneath it is the lesson. Marks are written into the document's
own text as ①②③ and explained in a numbered legend under it. Sixteen of the
nineteen documents carry one. The check requires the two sets to match in both
directions and the legend to run in order, because a legend pointing at a mark
nobody can find is worse than no legend at all.

## What is where

| Course | Documents |
| --- | --- |
| Level 1 | sales invoice (annotated, stamped COPY), credit note, a purchase invoice that is wrong on purpose, bank statement |
| Level 2 | sales invoice, goods received note, credit note, VAT invoice, daybook invoice, petty cash voucher, remittance advice, an invoice with three faults, a purchase invoice that is right but disagrees with its GRN, supplier statement, payslip, bank statement |
| Level 3 | full mixed-rated VAT invoice, the VAT return, payroll summary |

The Level 2 set tells one story where it can: the goods received note in
"The three-way match" is the note for the order the faulty invoice in "Checking
a supplier invoice" bills for, and the supplier statement in
"Paying suppliers" is the one the worked example two cards later reconciles.

## Known gaps

- **Nothing outside AAT.** French road signs, the Aseprite interface and the
  CIPS diagrams are all still absent; this covers accounting documents only.
- **No purchase order, delivery note or paying-in slip** is drawn, though all
  three are named in the tables that describe them. `KINDS` has room.
- **Nothing checks a document against its card's prose.** The figures inside a
  document are checked against each other and, where a worked example shares
  them, they were matched by hand. A card edited later could drift from the
  document beside it and no check would notice.
