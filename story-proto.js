/* Wrenfield — prototype desk.
   ────────────────────────────────────────────────────────────────────────────
   A test of one idea, on one item: are the *atoms* the reason story mode still
   reads as a quiz?

   The full version asks you to tick discrepancies, type figures into labelled
   fields and press a button called "File it". Those are quiz atoms wearing a
   costume. This version has no prompts, no marks, no submit, and no options
   list. It has an invoice, a pen, a daybook and three trays.

   The same three decisions are still in here — query it, post it as billed, or
   post it at the figures you worked out — but none of them is a radio button.
   They emerge from what you physically do with the paper.

   Nothing tells you that checking the invoice against the order is the job.
   Knowing that IS the thing being learned, and announcing it is what makes a
   game feel like a test. */
(function () {
  'use strict';

  window.AAT_STORY_PROTO = {
    id: 'wr-desk',
    title: 'WR Limited',
    sub: 'came in this morning’s post',

    /* The two documents, clipped together the way they arrived. */
    order: {
      name: 'WRENFIELD SUPPLIES', sub: 'Purchase Order',
      ref: 'PO 8811', date: '6 May 20XX',
      rows: [
        { l: 'To: WR Limited' },
        { l: '16 crates, product DBZ' },
        { l: 'Unit price', a: '£17.50' },
        { l: 'Trade discount', a: '10%' },
      ],
      foot: ['Terms agreed: 2% prompt payment discount', 'if paid within 7 days of invoice date.'],
    },
    invoice: {
      name: 'WR LIMITED', sub: '26 Hall St, Wingleford',
      ref: 'INVOICE 000231', date: '12 May 20XX',
      rows: [
        { l: '16 crates DBZ @ £7.50', hot: 'price', a: '120.00' },
        { l: 'Trade discount', hot: 'trade', a: '—', muted: true },
        { l: 'VAT @ 20%', hot: 'vatrate', a: '24.00' },
        { l: 'Total', a: '144.00', hotA: 'total', total: true },
      ],
      foot: [
        { t: 'Terms: payment within 30 days', hot: 'terms' },
        { t: 'VAT reg 123 6790 01 · A/c WRE004', hot: 'acct' },
      ],
    },

    /* What is actually wrong, for the after-the-fact debrief only. Never shown
       up front, and never as a count. */
    wrong: {
      price: 'They have billed £7.50 a crate. The order says £17.50.',
      trade: 'The 10% trade discount on the order has not been taken off.',
      terms: 'The terms say 30 days. You agreed 2% for payment within 7.',
    },
    fine: {
      vatrate: 'VAT at 20% is right for the figures they used.',
      total:   'The total adds up — to their wrong figures, but it adds up.',
      acct:    'The VAT number and the account code both match.',
    },

    /* The daybook only cares about three numbers. What you write in it is the
       decision — there is no "post it corrected" button anywhere. */
    correct: { net: 252.00, vat: 50.40, total: 302.40 },
    billed:  { net: 120.00, vat: 24.00, total: 144.00 },

    trays: [
      { id: 'post',  label: 'Post',  hint: 'into the purchase daybook' },
      { id: 'query', label: 'Query', hint: 'back to the supplier' },
      { id: 'hold',  label: 'Hold',  hint: 'deal with it later' },
    ],

    /* Consequences, not scores. Wednesday morning is the mark scheme. */
    outcomes: {
      query: {
        tone: 'ok', who: 'deirdre',
        text: 'Good. It’s the price — they’ve dropped the one. They do it about twice a year and they’ve never once spotted it themselves.',
        dir: 'She takes it off you, writes QUERIED and the date across the top in biro, and puts it in her own tray. Which is, from Deirdre, a standing ovation.',
        wed: 'WR send a corrected invoice on Thursday. £302.40. It matches your figures.',
        marks: 8,
      },
      billed: {
        tone: 'bad', who: 'gavin',
        text: 'See? Nothing to it.',
        dir: 'It goes through. Nobody stops you. The rest of the day is completely fine.',
        wed: 'Wednesday: nothing. Friday, when you agree WR’s statement, it will balance perfectly — because you and WR now agree on a figure that is wrong. Nothing in the numbers will ever tell you.',
        marks: 3,
      },
      corrected: {
        tone: 'mid', who: 'deirdre',
        text: 'Where did three-oh-two-forty come from? That’s not on anything. You can’t just *decide* what they’ve invoiced us, love. That’s not bookkeeping, that’s creative writing.',
        dir: 'The arithmetic was perfect. The figure appears on no document in existence.',
        wed: 'Friday: WR’s statement is out by £158.40 and it takes you the best part of an hour to work out that the difference is you.',
        marks: 5,
      },
      odd: {
        tone: 'bad', who: 'deirdre',
        text: 'That’s not what it says and it’s not what it should say. Where has that come from?',
        dir: 'A figure that matches neither the invoice nor the order is the one thing worse than either.',
        wed: 'Friday: the statement is out by an amount nobody can explain, including you.',
        marks: 0,
      },
      hold: {
        tone: 'mid', who: 'nigel',
        text: 'The WR one — is that still — no, it’s fine, it’s just that Trevor rang. Twice. Not a problem. Only if you could.',
        dir: 'It sits in the hold tray. It is still there on Thursday. It is still there on Friday.',
        wed: 'Nothing gets paid, nothing gets queried, and WR ring on Thursday to ask why.',
        marks: 1,
      },
    },
  };
}());
