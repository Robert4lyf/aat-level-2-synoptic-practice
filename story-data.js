/* Wrenfield Supplies — story mode content.
   See docs/wrenfield-game-design.md for the design and the arithmetic audit.

   Shape:
     window.AAT_STORY = { business, cast, days: [ { beats: [...] } ] }

   A beat is either a `scene` (dialogue, no marks) or an `item` (marked work).
   Items carry `docs` to read and `steps` to complete. Every step is one of:
     flags   — tick all that apply; marked per row, wrong ticks cancel right ones
     choice  — pick one
     figures — type numbers; marked per field
     written — free text, self-marked against a rubric (never counts as objective)

   Branching is declarative and shallow by design: an item may `setFlag` from a
   step's answer, and a later beat may vary on that flag via `variants`. There is
   no branch graph — one flag, read by at most two later beats. */
(function () {
  'use strict';

  /* Item 1's decision is the one the day hangs on. Item 6 reads it back. */
  var WR_A = 'queried', WR_B = 'billed', WR_C = 'corrected';

  window.AAT_STORY = {
    id: 'wrenfield',
    name: 'Wrenfield Supplies',
    blurb: 'A week on the accounts desk at a builders’ merchant. Real documents, real month end, colleagues who want things at the wrong moment.',
    business: {
      name: 'Wrenfield Supplies Ltd',
      trade: 'Builders’ merchant',
      vatRate: 20,
      vatReg: '418 2290 55',
      imprest: 250.00,
      pettyLimit: 30.00,
    },
    cast: [
      { id: 'nigel',   name: 'Nigel Prewitt',   role: 'Finance Manager',       initials: 'NP', tone: 'n' },
      { id: 'deirdre', name: 'Deirdre Ashcombe', role: 'Purchase Ledger, 31 yrs', initials: 'DA', tone: 'd' },
      { id: 'gavin',   name: 'Gavin Trell',     role: 'Sales Manager',         initials: 'GT', tone: 'g' },
      { id: 'priya',   name: 'Priya Raval',     role: 'Credit Control',        initials: 'PR', tone: 'p' },
      { id: 'barry',   name: 'Barry Ogden',     role: 'Warehouse',             initials: 'BO', tone: 'b' },
      { id: 'karen',   name: 'Karen Sillitoe',  role: 'Office Manager',        initials: 'KS', tone: 'k' },
      { id: 'you',     name: 'You',             role: 'Accounts Assistant',    initials: 'YOU', tone: 'y' },
    ],

    days: [{
      id: 'tue',
      title: 'Tuesday, 14 May',
      subtitle: 'Day 2 of month-end week',
      summary: 'Nine things in the tray, a supplier statement that won’t agree, and a fire alarm.',
      minutes: 14,
      totalMarks: 34,

      beats: [

        /* ── 08:52 ─────────────────────────────────────────────────── */
        { kind: 'scene', at: '08:52', title: 'You sit down',
          lines: [
            { dir: 'Nine things in the tray. PRINTER-2 is making the noise again — the one it makes for about a week before it stops making any noise at all.' },
            { who: 'deirdre', text: 'Morning. I’ve been through the tray. The WR one’s on top.' },
            { dir: 'She does not say why the WR one is on top. This is either helpful or a test.' },
          ] },

        /* ── 09:12 ─────────────────────────────────────────────────── */
        { kind: 'scene', at: '09:12', title: 'Calendar invite',
          lines: [
            { who: 'nigel', text: 'quick chat' },
            { dir: 'Fifteen minutes, 15:00, no agenda, no location. He has done this before. It has never once been bad news. It is never once *not* felt like bad news.' },
          ] },

        /* ── 09:20 · ITEM 1 ────────────────────────────────────────── */
        { kind: 'item', at: '09:20', id: 'wr-invoice', topic: 'itbk', marks: 8,
          title: 'The invoice that’s too cheap',
          stage: 'A purchase invoice from WR Limited, with the purchase order clipped behind it. Check one against the other before it goes anywhere near the ledger.',
          docs: [
            { kind: 'doc', title: 'WRENFIELD SUPPLIES', sub: 'Purchase Order', ref: 'PO 8811', date: '6 May 20XX',
              rows: [
                { label: 'To: WR Limited' },
                { label: '16 crates, product DBZ' },
                { label: 'Unit price', amount: '£17.50' },
                { label: 'Trade discount', amount: '10%' },
              ],
              foot: 'Terms agreed: 2% prompt payment discount if paid within 7 days of invoice date.' },
            /* The invoice is the hotspot document (index 1). Anything carrying a
               `hot`/`hotAmt` id becomes tappable — three real discrepancies and
               three decoys that are perfectly correct. Nothing is listed for the
               player until after they have committed. */
            { kind: 'doc', title: 'WR LIMITED', sub: '26 Hall St, Wingleford', ref: 'INVOICE 000231', date: '12 May 20XX',
              rows: [
                { label: '16 crates DBZ @ £7.50', hot: 'price', amount: '120.00' },
                { label: 'Trade discount', hot: 'trade', amount: '—', muted: true },
                { label: 'VAT @ 20%', hot: 'vatrate', amount: '24.00' },
                { label: 'Total', amount: '144.00', hotAmt: 'total', total: true },
              ],
              foot: [
                { text: 'Terms: payment within 30 days', hot: 'terms' },
                { text: 'VAT reg 123 6790 01 · A/c WRE004', hot: 'acct' },
              ] },
          ],
          steps: [
            { type: 'hotspot', marks: 3, doc: 1,
              prompt: 'Three things on this invoice do not match the order. Find them.',
              targets: [
                { id: 'price',   ok: true, label: 'The unit price — £7.50 charged, £17.50 on the order' },
                { id: 'trade',   ok: true, label: 'The 10% trade discount has not been applied' },
                { id: 'terms',   ok: true, label: 'The payment terms — 30 days, not the agreed 2% within 7 days' },
                { id: 'vatrate', label: 'VAT at 20% is correct — 20% of the £120.00 they billed is £24.00' },
                { id: 'total',   label: 'The total is right for the figures they used — £120.00 + £24.00' },
                { id: 'acct',    label: 'The VAT registration and account code both match our records' },
              ] },
            { type: 'figures', marks: 3,
              prompt: 'What should the invoice have said? Enter the figures to two decimal places.',
              help: 'Trade discount comes off before VAT is calculated. The prompt payment discount is not deducted here — it is applied at the point of payment and reduces the gross, with the supplier issuing a credit note when it is taken.',
              fields: [
                { id: 'net',   label: 'Net after trade discount', answer: 252.00 },
                { id: 'vat',   label: 'VAT',                      answer: 50.40 },
                { id: 'total', label: 'Invoice total',            answer: 302.40 },
              ] },
            { type: 'choice', marks: 2,
              prompt: 'What do you do with it?',
              options: [
                { id: WR_A, label: 'Query it with WR Limited. Do not post it.', ok: true },
                { id: WR_B, label: 'Post it as billed — £144.00. They undercharged us; that is their problem.' },
                { id: WR_C, label: 'Post it at the corrected £302.40 so the ledger is right.' },
              ],
              setFlag: 'wr.posted' },
          ],
          why: 'You do not silently correct a supplier’s document, and you do not process one you know is wrong because the error happens to favour you. Query it, and post what they eventually send.',
          buckets: {
            queried: { tone: 'ok', who: 'deirdre',
              text: 'Good. It’s the price — they’ve dropped the one. They do it about twice a year and they’ve never once spotted it themselves.',
              dir: 'She returns to her lever-arch file without further comment, which from Deirdre is a standing ovation.' },
            billed: { tone: 'bad', who: 'gavin',
              text: 'See? Nothing to it.',
              dir: 'The day proceeds smoothly. Suspiciously smoothly. Remember this at half past three.' },
            corrected: { tone: 'mid', who: 'deirdre',
              text: 'Where did three-oh-two-forty come from? That’s not on anything. You can’t just *decide* what they’ve invoiced us, love. That’s not bookkeeping, that’s creative writing.',
              dir: 'The arithmetic was perfect. The figure appears on no document in existence.' },
          } },

        /* ── 10:05 ─────────────────────────────────────────────────── */
        { kind: 'scene', at: '10:05', title: 'Gavin, at your desk',
          variants: { on: 'wr.posted', cases: {
            queried: { lines: [
              { who: 'gavin', text: 'Quick one. You doing the WR invoice? Just whack it through. They’re a good account, I’ve known Trevor there fifteen years.' },
              { who: 'you',   text: 'It’s under-priced. I’m querying it.' },
              { who: 'gavin', text: 'Under-priced. Right. So they’ve charged us *less*. And you want to ring them up and tell them.' },
              { who: 'you',   text: 'Yes.' },
              { dir: 'A pause of roughly two seconds, in which several things are reconsidered.' },
              { who: 'gavin', text: '…Fair play, actually. Priya said you’d say that.' },
            ] },
            billed: { lines: [
              { who: 'gavin', text: 'Quick one. You done the WR invoice? Whacked it through? Good lad.' },
              { dir: 'He is already walking away. You have not told him what it said. He has not asked.' },
              { who: 'deirdre', dir: 'not looking up', text: 'Did you check that against the order.' },
              { dir: 'It is not a question. It does not have a question mark. You answer it anyway.' },
            ] },
            corrected: { lines: [
              { who: 'gavin', text: 'Quick one. WR invoice — all sorted?' },
              { who: 'you',   text: 'Sorted. I put the right figure on.' },
              { who: 'gavin', text: 'The right figure. Not their figure.' },
              { who: 'you',   text: '…The right one.' },
              { who: 'gavin', text: 'Right. Well. That sounds like a Deirdre conversation and I’ve got a call.' },
            ] },
          } } },

        /* ── 10:20 · ITEM 2 ────────────────────────────────────────── */
        { kind: 'item', at: '10:20', id: 'hexfield', topic: 'itbk', marks: 6,
          title: 'Barry’s thumb',
          stage: 'An invoice from Hexfield Fasteners for goods delivered last week. Before it is paid it has to be matched to what was ordered and what actually turned up.',
          docs: [
            { kind: 'email', from: 'barry', at: '10:15', subject: 'del note',
              body: 'sent it thru. cant find the other one, think it might of gone in the skip when we had the clear out. that hexfield lot were short anyway i told dave',
              attach: 'IMG_4471.jpg — 2.1 MB' },
            { kind: 'photo', caption: 'A goods received note, photographed at an angle, in poor light. A thumb obscures the quantity column. In the top-left corner, out of focus, is a mug.' },
            { kind: 'doc', title: 'HEXFIELD FASTENERS', ref: 'INVOICE 77140', date: '9 May 20XX',
              rows: [
                { label: '40 boxes P-clips @ £4.25', amount: '170.00' },
                { label: 'VAT @ 20%', amount: '34.00' },
                { label: 'Total', amount: '204.00', total: true },
              ],
              foot: 'Our order PO 8798: 40 boxes' },
          ],
          steps: [
            { type: 'choice', marks: 2,
              prompt: 'Where does the received quantity come from?',
              options: [
                { id: 'file', label: 'The file copy of the goods received note — ask Deirdre', ok: true },
                { id: 'inv',  label: 'The invoice. It says 40, and the order said 40.' },
                { id: 'barry', label: 'Ask Barry to send it again, and wait.' },
                { id: 'guess', label: 'It looks like a 4 and something. Post 40 and move on.' },
              ],
              setFlag: 'hex.source' },
            { type: 'figures', marks: 4,
              prompt: 'The file copy of GRN 1123 shows **36 boxes** received. Enter what Hexfield should be paid, and what is in dispute.',
              help: 'Pay for goods received, not goods ordered or goods invoiced. That is the entire reason a goods received note exists.',
              fields: [
                { id: 'net',   label: 'Net payable',      answer: 153.00 },
                { id: 'vat',   label: 'VAT payable',      answer: 30.60 },
                { id: 'total', label: 'Total to pay',     answer: 183.60 },
                { id: 'query', label: 'Amount to query (incl VAT)', answer: 20.40 },
              ] },
          ],
          why: 'Ordered 40, received 36, invoiced 40. Pay for the 36 and query the 4 — £17.00 plus £3.40 VAT — and expect a credit note. Three-way matching is the single most common thing a purchase ledger clerk does, and almost nobody outside finance knows it exists.',
          outcomeFrom: 'hex.source',
          buckets: {
            file: { tone: 'ok', who: 'deirdre',
              text: 'Thirty-six. It’s always thirty-six with Hexfield, they can’t count past a pallet. I keep the file copies because *this* happens.',
              dir: 'She places a photocopy on your desk, squared to the edge. “I’ve been saying it since before you were born.”' },
            inv: { tone: 'bad', who: 'nigel',
              text: 'So the stock count’s out by four boxes and the — sorry, where did the forty come from? Only Barry reckons it was thirty-six, and Barry’s not usually — well. He’s not usually *right*, but he’s usually *there*.',
              dir: 'Thursday. You have paid for four boxes of P-clips that are not in the building.' },
            guess: { tone: 'bad', who: 'nigel',
              text: 'So the stock count’s out by four boxes and the — sorry, where did the forty come from?',
              dir: 'The honest answer is that you guessed. There is no good way to say that out loud on a Thursday.' },
            barry: { tone: 'mid', who: 'barry',
              text: 'yeah still looking. deffo in the skip',
              dir: 'Correct instinct, incomplete follow-through. The invoice ages, the payment run misses it, and Hexfield put Wrenfield on stop on Friday morning — the one day you cannot have a supplier on stop.' },
          } },

        /* ── 11:15 ─────────────────────────────────────────────────── */
        { kind: 'scene', at: '11:15', title: 'Twelve minutes in the car park',
          lines: [
            { dir: 'The alarm goes. Everyone files out and stands in the car park in the specific silence of people who work together but have never socialised.' },
            { who: 'karen',   text: 'It’s the toaster. It’s not *faulty*, it’s that people put the crumpets in on setting six.' },
            { who: 'deirdre', text: 'It’s a five-crumpet toaster and there are eleven of us.' },
            { dir: 'Gavin is on the phone forty yards away, gesturing at the building as though it has personally let him down.' },
            { who: 'nigel',   text: 'Right. Well. That’s — everyone’s out, so that’s the main — is Priya out? Has anyone — Priya’s out. Good. Good.' },
            { dir: 'Priya is standing directly beside him.' },
          ] },

        /* ── 11:40 · ITEM 3 ────────────────────────────────────────── */
        { kind: 'item', at: '11:40', id: 'karen-vat', topic: 'itbk', marks: 3,
          title: '“How much of this can we claim back?”',
          stage: 'A query from Karen. Short, answerable, and the sort of thing you are asked six times a week and expected to know without going away and coming back.',
          docs: [
            { kind: 'email', from: 'karen', at: '11:34', subject: 'Staff lunch — VAT?',
              body: 'Hi,\n\nThe staff lunch on Friday came to £48.60 including VAT. Nigel needs the net and the VAT separately for the budget. Receipt attached.\n\nThere’s also a £3.60 meal deal on there which is mine, sorry, I’ll put that back in the tin.\n\nK',
              attach: 'receipt.jpg — a photograph of a receipt, taken at 4pm, on a desk, next to a different receipt\nSECRET_SANTA_v6_FINAL.xlsx — not requested' },
          ],
          steps: [
            { type: 'choice', marks: 1,
              prompt: 'To take the VAT out of a VAT-inclusive figure at 20%, you multiply by:',
              options: [
                { id: 'sixth', label: 'One sixth', ok: true },
                { id: 'fifth', label: 'One fifth' },
                { id: 'pct',   label: '20%' },
                { id: 'eighth', label: 'One eighth' },
              ] },
            { type: 'figures', marks: 2,
              prompt: 'The lunch came to £48.60 including VAT. Split it.',
              fields: [
                { id: 'vat', label: 'VAT', answer: 8.10 },
                { id: 'net', label: 'Net', answer: 40.50 },
              ] },
          ],
          why: '£48.60 ÷ 6 = £8.10 VAT, leaving £40.50 net — and £40.50 × 1.20 checks back to £48.60. The common wrong answer is 20% of £48.60 = £9.72, which treats the gross as though it were the net.',
          buckets: {
            pass: { tone: 'ok', who: 'karen',
              text: 'Perfect, thank you. You’re much quicker than the last one, he used to go away and come back on Wednesday.' },
            fail: { tone: 'bad', who: 'deirdre',
              text: 'One sixth. Twenty per cent of the *net*, one sixth of the *gross*. It’s on the card.',
              dir: 'She does not turn round. The card is laminated. The card has been laminated twice.' },
          } },

        /* ── 13:15 · ITEM 4 ────────────────────────────────────────── */
        { kind: 'item', at: '13:15', id: 'crowther', topic: 'besy', marks: 6,
          title: 'Crowther, and a favour',
          stage: 'The day’s judgment call. Gavin’s email arrived at 09:02 and you have been putting it off. Priya forwarded it back to you at 11:03 with two words.',
          docs: [
            { kind: 'email', from: 'gavin', at: '09:02', subject: 'crowther — quick favour',
              body: 'morning mate just need crowther taking off stop for the one order its a big account and theyve been with us years. its 6k and i’ve basically already told them its going out today. can you sort it thanks in advance' },
            { kind: 'email', from: 'priya', at: '11:03', subject: 'FW: crowther — quick favour',
              body: 'Row 42. Don’t.' },
            { kind: 'panel', title: 'Crowther Fixings — account summary',
              rows: [
                { label: 'Agreed credit limit', amount: '£5,000.00' },
                { label: 'Current balance', amount: '£7,200.00' },
                { label: 'Over the limit by', amount: '£2,200.00', bad: true },
                { label: 'Of which more than 60 days overdue', amount: '£3,100.00', bad: true },
                { label: 'New order requested', amount: '£6,000.00', total: true },
              ] },
          ],
          steps: [
            { type: 'written', marks: 6, minWords: 60,
              prompt: 'Reply to Gavin.',
              placeholder: 'Hi Gavin,…',
              rubric: [
                { point: 'States the account is over its £5,000 limit (balance £7,200)', marks: 1 },
                { point: 'Notes that £3,100 is more than 60 days overdue', marks: 1 },
                { point: 'States what would release the order — payment of the overdue £3,100, or a properly authorised credit limit increase', marks: 2 },
                { point: 'Does not release it, and does not promise to', marks: 1 },
                { point: 'Collaborative tone — offers to chase, rather than simply refusing', marks: 1 },
              ],
              modelAnswer: 'Hi Gavin,\n\nI can’t release the Crowther order at the moment, and I want to explain why rather than just block it.\n\nTheir balance is £7,200 against an agreed credit limit of £5,000, so they are £2,200 over. Of that balance, £3,100 is more than 60 days overdue. Adding a £6,000 order would take them to £13,200 on a £5,000 limit.\n\nTwo things would release it: payment of the £3,100 overdue, which brings the account back within terms, or a credit limit increase authorised by Nigel.\n\nI’m happy to ring Crowther this afternoon and chase the overdue invoices — if they clear them we can get the order away this week. Let me know if you’d rather make that call yourself given you know them.\n\nThanks,\nAccounts' },
          ],
          why: 'The commonest failure here is a reply that is correct and unhelpful. Refusing is worth less than refusing while offering to fix the underlying problem — which is how the real mark scheme is weighted too.',
          selfAssessed: true,
          buckets: {
            pass: { tone: 'ok', who: 'gavin',
              text: 'yeah no i get it. can you have a go at chasing the 3100 then. and dont tell priya i said thanks',
              dir: 'Priya, 13:44: “Noted. You’re off the list.” You did not know you were on a list.' },
            fail: { tone: 'mid', who: 'priya',
              text: 'Row 42.',
              dir: 'Worth re-reading the model answer. The marks are not for saying no — they are for saying no with the figures attached and a way forward.' },
          } },

        /* ── 13:50 ─────────────────────────────────────────────────── */
        { kind: 'scene', at: '13:50', title: 'The Secret Santa apportionment dispute',
          lines: [
            { who: 'karen', text: 'It’s five pounds *per head*. Not five pounds per department. Per HEAD, Gavin. It’s in cell B4.' },
            { who: 'gavin', text: 'Right, but Sales is four people and Finance is three, so if we’re splitting the buffet *and* the Santa, Sales is subsidising Finance. That’s — mate, that’s just maths.' },
            { who: 'karen', text: 'It’s not maths, it’s Christmas.' },
            { who: 'gavin', text: 'It should go on revenue. Sales brings in the revenue, Sales should get more Santa.' },
            { who: 'deirdre', dir: 'not looking up', text: 'It’s staff entertaining. It’s not allowable for tax and you can’t reclaim the VAT on the client half. So you’re arguing about how to split something we can’t have anyway.' },
            { dir: 'A silence.' },
            { who: 'gavin', text: '…I still think it should go on revenue.' },
            { dir: 'What you have just watched is an overhead apportionment argument — per head, or by department revenue — conducted by two people who do not know that is what it is called.' },
          ] },

        /* ── 14:30 · ITEM 5 ────────────────────────────────────────── */
        { kind: 'item', at: '14:30', id: 'petty-cash', topic: 'itbk', marks: 4,
          title: 'The toner, and the £30 limit',
          stage: 'PRINTER-2 has stopped making the noise, which is worse. Karen has been out and bought a toner cartridge and would like the money back. She has filled the voucher in correctly, because of course she has.',
          docs: [
            { kind: 'doc', title: 'PETTY CASH VOUCHER', ref: 'No. 0142', date: '14 May 20XX',
              rows: [
                { label: 'Toner cartridge, PRINTER-2', amount: '41.94' },
                { label: '(including VAT)', muted: true },
                { label: 'Claimed', amount: '41.94', total: true },
              ],
              foot: 'Signed: K. Sillitoe\nReceipt attached — PLEASE DO NOT REMOVE THE PAPERCLIP' },
            { kind: 'panel', title: 'Petty cash — position today',
              rows: [
                { label: 'Imprest level', amount: '£250.00' },
                { label: 'Vouchers paid this month', amount: '£83.16' },
                { label: 'This voucher', amount: '£41.94' },
                { label: 'Authorisation limit for petty cash', amount: '£30.00', total: true },
              ] },
          ],
          steps: [
            { type: 'figures', marks: 3,
              prompt: 'Split the voucher for the petty cash book, and work out what should be in the tin.',
              fields: [
                { id: 'vat',  label: 'VAT on the voucher', answer: 6.99 },
                { id: 'net',  label: 'Net',                answer: 34.95 },
                { id: 'cash', label: 'Cash remaining in the tin', answer: 124.90 },
              ] },
            { type: 'choice', marks: 1,
              prompt: 'And then?',
              options: [
                { id: 'auth', label: 'It is over the £30 limit — get Nigel to authorise it before it is paid', ok: true },
                { id: 'pay',  label: 'Pay it. It is a toner, and Karen has done the voucher properly.' },
                { id: 'split', label: 'Split it across two vouchers to stay under the limit' },
                { id: 'refuse', label: 'Refuse it — it is over the limit and cannot be claimed' },
              ],
              setFlag: 'petty.action' },
          ],
          why: '£41.94 ÷ 6 = £6.99 VAT and £34.95 net. £250.00 − £83.16 − £41.94 leaves £124.90 in the tin, so £125.10 restores the imprest at month end. But the arithmetic is the easy half — £41.94 is over the £30 authorisation limit, so it needs signing off before it is paid.',
          outcomeFrom: 'petty.action',
          buckets: {
            auth: { tone: 'ok', who: 'karen',
              text: 'Over the limit? It’s a *toner*. The printer doesn’t know about the limit.',
              dir: 'A pause. “Fine. But I’m not filling the form in again, it’s got the paperclip on it.”' },
            pay: { tone: 'mid', who: 'nigel',
              text: 'No, that’s — I’d have signed it, obviously, it’s a toner. It’s just that the whole point of the limit is that I sign it *before*, which is — otherwise the limit is just a number we’ve written down. Which. Yes.',
              dir: 'Nigel being mildly disappointed is, it turns out, considerably worse than Deirdre being sharp.' },
            split: { tone: 'bad', who: 'deirdre',
              text: 'Splitting an invoice to get under an authorisation limit. Do you know what that’s called? It’s got a name.',
              dir: 'It has a name.' },
            refuse: { tone: 'bad', who: 'karen',
              text: 'So I’m forty-two pounds down for a toner for a printer that isn’t mine. Lovely. I’ll put it on the noticeboard.',
              dir: 'Over the limit means it needs authorising, not that it cannot be claimed.' },
          } },

        /* ── 15:00 ─────────────────────────────────────────────────── */
        { kind: 'scene', at: '15:00', title: 'The quick chat',
          lines: [
            { dir: 'Nigel’s office. He has printed something out, which is itself concerning, because PRINTER-2 is dead and this means he went downstairs.' },
            { who: 'nigel', text: 'Nothing to worry about. It’s just — the board see the sales figure Thursday, and April’s gone *down*, and they’ll ask, and I’ll be in Warrington.' },
            { who: 'you',   text: 'It hasn’t gone down. We credited the Halewood order.' },
            { who: 'nigel', text: 'Yes! Yes. That’s — say that. To the board. On Thursday.' },
            { who: 'you',   text: '…to the board?' },
            { who: 'nigel', text: 'It’s four people and one of them is my brother-in-law. You’ll be fine. You’re a star.' },
            { dir: 'He has already stood up. The chat took ninety seconds. It was in the diary for fifteen minutes and the dread has been running since 09:12.' },
          ] },

        /* ── 15:30 · ITEM 6 ────────────────────────────────────────── */
        { kind: 'item', at: '15:30', id: 'wr-statement', topic: 'itbk', marks: 7,
          title: 'WR Limited’s statement',
          stage: 'WR’s statement has to be agreed to their account in the payables ledger before anything is paid. Their account contains whatever you did at twenty past nine.',
          docs: [
            { kind: 'doc', title: 'WR LIMITED', sub: 'Statement of account', ref: 'To 14 May 20XX', date: 'A/c WRE004',
              rows: [
                { label: '1 May · Balance b/f',      amount: '1,410.00' },
                { label: '3 May · Invoice 000198',    amount: '642.00' },
                { label: '6 May · Invoice 000205',    amount: '318.00' },
                { label: '7 May · Credit note 041',   amount: '(96.00)' },
                { label: '9 May · Payment received',  amount: '(1,410.00)' },
                { label: '12 May · Invoice 000231',   amount: '144.00' },
                { label: 'Balance due', amount: '1,008.00', total: true },
              ] },
          ],
          variants: { on: 'wr.posted', cases: {

            queried: {
              docsExtra: [{ kind: 'doc', title: 'PAYABLES LEDGER', sub: 'WR Limited — our account', ref: 'at 14 May',
                rows: [
                  { label: '1 May · Balance b/f',    amount: '1,410.00' },
                  { label: '3 May · Invoice 000198',  amount: '642.00' },
                  { label: '7 May · Credit note 041', amount: '(96.00)' },
                  { label: '9 May · Bank',            amount: '(1,410.00)' },
                  { label: 'Invoice 000231 — queried, not posted', muted: true },
                ] }],
              steps: [
                { type: 'figures', marks: 3, prompt: 'Agree the two. Enter our ledger balance and the difference.',
                  fields: [
                    { id: 'ledger', label: 'Our ledger balance', answer: 546.00 },
                    { id: 'diff',   label: 'Difference',         answer: 462.00 },
                  ] },
                { type: 'flags', marks: 2, prompt: 'What explains the difference?',
                  options: [
                    { id: 'notrec', label: 'Invoice 000205, £318.00 — never reached us', ok: true },
                    { id: 'query',  label: 'Invoice 000231, £144.00 — under query, correctly not posted', ok: true },
                    { id: 'cn',     label: 'Credit note 041 has not been recorded by WR' },
                    { id: 'bank',   label: 'Our payment on 9 May has not reached them' },
                  ] },
                { type: 'figures', marks: 2, prompt: 'What do you pay WR this month?',
                  fields: [{ id: 'pay', label: 'Payment', answer: 546.00 }] },
              ],
              why: 'Two differences, both explainable, both written down: £318.00 for an invoice that never arrived (request a copy) and £144.00 for the invoice under query. Pay the £546.00 that is agreed and undisputed.',
              bucket: { tone: 'ok', who: 'deirdre',
                text: 'Two differences, both explainable, both written down. That’s a reconciliation. Some people just put the difference in and move on.',
                dir: 'It is unclear who “some people” is. It is extremely clear who “some people” is.' },
            },

            billed: {
              docsExtra: [{ kind: 'doc', title: 'PAYABLES LEDGER', sub: 'WR Limited — our account', ref: 'at 14 May',
                rows: [
                  { label: '1 May · Balance b/f',    amount: '1,410.00' },
                  { label: '3 May · Invoice 000198',  amount: '642.00' },
                  { label: '7 May · Credit note 041', amount: '(96.00)' },
                  { label: '9 May · Bank',            amount: '(1,410.00)' },
                  { label: '12 May · Invoice 000231', amount: '144.00' },
                ] }],
              steps: [
                { type: 'figures', marks: 3, prompt: 'Agree the two. Enter our ledger balance and the difference.',
                  fields: [
                    { id: 'ledger', label: 'Our ledger balance', answer: 690.00 },
                    { id: 'diff',   label: 'Difference',         answer: 318.00 },
                  ] },
                { type: 'flags', marks: 2, prompt: 'What explains the difference?',
                  options: [
                    { id: 'notrec', label: 'Invoice 000205, £318.00 — never reached us', ok: true },
                    { id: 'query',  label: 'Invoice 000231 is under query' },
                    { id: 'cn',     label: 'Credit note 041 has not been recorded by WR' },
                    { id: 'bank',   label: 'Our payment on 9 May has not reached them' },
                  ] },
                { type: 'figures', marks: 2, prompt: 'What do you pay WR this month?',
                  fields: [{ id: 'pay', label: 'Payment', answer: 690.00 }] },
              ],
              why: 'One clean difference, fully explained by the invoice that never arrived. It looks like a perfect reconciliation — and it is the worst of the three outcomes, because agreeing to a figure is not the same as the figure being right, and nothing in the numbers will ever tell you.',
              bucket: { tone: 'bad', who: 'deirdre',
                text: 'It agrees. I know. It agrees to *their* mistake. That’s the thing nobody tells you — a reconciliation only proves the two of you think the same thing. It doesn’t prove either of you is right.',
                dir: 'She puts the pink copy squarely on the desk. The unit price is circled. It has been circled since about half past nine.' },
            },

            corrected: {
              docsExtra: [{ kind: 'doc', title: 'PAYABLES LEDGER', sub: 'WR Limited — our account', ref: 'at 14 May',
                rows: [
                  { label: '1 May · Balance b/f',    amount: '1,410.00' },
                  { label: '3 May · Invoice 000198',  amount: '642.00' },
                  { label: '7 May · Credit note 041', amount: '(96.00)' },
                  { label: '9 May · Bank',            amount: '(1,410.00)' },
                  { label: '12 May · Invoice 000231', amount: '302.40' },
                ] }],
              steps: [
                { type: 'figures', marks: 3, prompt: 'Agree the two. Enter our ledger balance and the difference.',
                  fields: [
                    { id: 'ledger', label: 'Our ledger balance', answer: 848.40 },
                    { id: 'diff',   label: 'Difference',         answer: 159.60 },
                  ] },
                { type: 'flags', marks: 2, prompt: 'What explains the difference?',
                  options: [
                    { id: 'notrec', label: 'Invoice 000205, £318.00 — never reached us', ok: true },
                    { id: 'mine',   label: 'Your posting of invoice 000231 is £158.40 higher than the invoice WR raised', ok: true },
                    { id: 'cn',     label: 'Credit note 041 has not been recorded by WR' },
                    { id: 'bank',   label: 'Our payment on 9 May has not reached them' },
                  ] },
                { type: 'figures', marks: 2, prompt: 'What does our ledger say we owe?',
                  fields: [{ id: 'pay', label: 'Ledger balance to settle', answer: 848.40 }] },
              ],
              why: 'One net difference of £159.60 concealing two separate causes pulling opposite ways: £318.00 for an invoice never received, less £158.40 of your own correction. Entirely self-inflicted, and finding it is the best hour of bookkeeping in the day.',
              bucket: { tone: 'mid', who: 'deirdre',
                text: 'Two errors in opposite directions and one number to show for it. That’s why you don’t improve a supplier’s invoice, love. You query it and you post what they send.',
                dir: 'She is not cross. She is worse than cross. She is *interested*.' },
            },
          } } },

      ],

      /* End-of-day copy. `carry` items are the loaded guns for Wednesday onward. */
      outro: {
        title: 'Sixteen forty-five',
        /* Deirdre's sign-off is graded. A line that contradicts the score reads as
           a bug in the fiction, and she is not a woman who says "not bad" to a
           day that went badly. `minPct`/`maxPct` filter on the day's percentage. */
        lines: [
          { dir: 'You put the tray straight, which does not help but feels like it does. Deirdre left at half four. Gavin is still on the phone.' },
          { who: 'deirdre', dir: 'on her way past, coat on', minPct: 85,
            text: 'That’s a proper day’s work, that. Wednesday’s the chasing. Bring a thick skin and a list.' },
          { who: 'deirdre', dir: 'on her way past, coat on', minPct: 50, maxPct: 84,
            text: 'Not bad. Few things to tidy. Wednesday’s the chasing — bring a thick skin and a list.' },
          { who: 'deirdre', dir: 'pausing, coat half on', maxPct: 49,
            text: 'Right. Well. Everybody has one of those, and anyone who says they haven’t is fibbing.' },
          { who: 'deirdre', dir: 'already at the door', maxPct: 49,
            text: 'Do the WR one again tomorrow before you touch anything else. And read the order first. Always the order first.' },
        ],
        carry: [
          { when: 'Wednesday', text: 'Chase Crowther’s £3,100 — you offered.', ifFlag: 'crowther.pass' },
          { when: 'Thursday',  text: 'Explain to the board why the sales figure fell. It didn’t — it was a credit note.' },
        ],
      },
    }],
  };
}());
