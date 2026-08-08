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

    /* Consequences, not scores — and what you circled is what you queried.
       You cannot ring a supplier and say "this is wrong" without saying what is
       wrong with it, so the circles are the content of the query. Getting only
       some of them means only some of them come back fixed, which is a better
       lesson than any mark. */
    outcomes: {
      query: { by: {

        full: {
          tone: 'ok', who: 'deirdre',
          text: 'Good. All three. It’s the price mainly — they’ve dropped the one — but the discount and the terms would both have cost us.',
          dir: 'She writes QUERIED and the date across the top in biro, lists your three points underneath, and puts it in her own tray.',
          wed: 'Thursday: WR send a corrected invoice. £252.00 net, £50.40 VAT, £302.40, terms 2% within 7 days. It matches your figures exactly and it goes straight through.',
          marks: 8,
        },

        partial: {
          tone: 'mid', who: 'deirdre',
          text: 'Right. And is that all that’s wrong with it?',
          dir: 'She reads it again over your shoulder for slightly longer than is comfortable, then queries what you gave her and nothing else.',
          wed: 'Thursday: WR fix exactly what you told them about, and nothing else. The corrected invoice arrives with the rest still on it, so it has to go back a second time — and Trevor is a good deal less friendly about it. A query is one phone call if you check the whole document first, and three if you don’t.',
          marks: 4,
        },

        noisy: {
          tone: 'mid', who: 'gavin',
          text: 'Trevor’s just rung me. Says you reckon their VAT rate’s wrong.',
          dir: 'It is twenty per cent. It has been twenty per cent since two thousand and eleven. The three real ones get fixed, and the corrected invoice is right — but somebody at WR is now telling people about it.',
          wed: 'Thursday: the corrected invoice arrives at £302.40 and is perfectly fine. Trevor mentions the VAT rate again. He will mention it in August.',
          marks: 6,
        },

        blind: {
          tone: 'bad', who: 'deirdre',
          text: 'Queried what?',
          dir: 'A beat. "You have to tell them what’s wrong with it, love. They’re not going to work it out on their own — they’re the ones who got it wrong in the first place."',
          wed: 'It comes straight back into your tray with nothing done to it, and you have lost the morning. Querying an invoice is not a feeling about it; it is a list.',
          marks: 2,
        },
      } },

      billed: { by: {
        checked: {
          tone: 'bad', who: 'deirdre',
          text: 'You’d marked it up. You could see what was wrong with it. And you put it through anyway.',
          dir: 'That is the one she will remember. Not getting it wrong — knowing, and filing it regardless.',
          wed: 'Friday, when you agree WR’s statement, it balances perfectly — because you and WR now agree on a figure that is wrong. Nothing in the numbers will ever tell you.',
          marks: 2,
        },
        unchecked: {
          tone: 'bad', who: 'gavin',
          text: 'See? Nothing to it.',
          dir: 'It goes through. Nobody stops you. The rest of the day is completely fine.',
          wed: 'Friday, when you agree WR’s statement, it balances perfectly — because you and WR now agree on a figure that is wrong. Nothing in the numbers will ever tell you.',
          marks: 3,
        },
      } },

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

      hold: { by: {
        checked: {
          tone: 'mid', who: 'nigel',
          text: 'The WR one — is that still — no, it’s fine, it’s just that Trevor rang. Twice. Not a problem. Only if you could.',
          dir: 'You marked up what was wrong with it and then did nothing with it, which is the most annoying possible outcome for everyone including you.',
          wed: 'Nothing gets paid and nothing gets queried. On Thursday you do the work again from the beginning, because by then you cannot remember which of the circles you were sure about.',
          marks: 3,
        },
        unchecked: {
          tone: 'mid', who: 'nigel',
          text: 'The WR one — is that still — no, it’s fine, it’s just that Trevor rang. Twice. Not a problem. Only if you could.',
          dir: 'It sits in the hold tray. It is still there on Thursday. It is still there on Friday.',
          wed: 'Nothing gets paid, nothing gets queried, and WR ring on Thursday to ask why.',
          marks: 1,
        },
      } },
    },
  };
}());
