# Wrenfield Supplies — accountant simulator design

> **Status: Tuesday is built and playable** (§10). Everything beyond it — Wednesday
> to Friday, Level 3, the other four formats — remains planning only. The bug fix in
> §8 is unrelated to the game and stands on its own.

**Date:** August 2026 · **Scope:** a standalone game inside the AAT app, giving hands-on
experience of what an accounts role actually involves day to day, with an office-comedy
tone. Levels 2 and 3.

---

## 1. The brief, and the constraint

The ask: a game with characters and a storyline, incorporating real accounting tasks,
with a humorous tone in the register of *The Office* — quirky colleagues and occasional
unexpected comic events.

The constraint is written into this repository's history. **Ledger Legends** was built and
then deleted (`bb4e2fc`). Reading the deleted source (`git show bb4e2fc^:rpg-demo.js`,
607 lines) it was a Pokémon clone: a 23×25 hand-drawn tile map, D-pad walking, four
badge-gated region gyms with boss monsters — *Papyrus Wyrm* (ITBK), *Adding-Machine Golem*
(POBC), *Cost Chimera* (POC), *Contract Griffin* (BESY) — HP and counter-damage, traits
(`enrage`, `armored`, `regen`, `aegis`), an Elite-Four analogue, and 388 pixel-art sprites
from a bespoke Aseprite pipeline.

The battle mechanic in full: pull questions from `window.ALL_QUESTIONS`; a correct answer
damages the boss, a wrong answer lets it counter.

**The lesson is not "no sprites."** It is that the fiction had nothing to do with the
accounting. Swap AAT questions for capital-city trivia and not one line of that game
changes. The dragon does not care whether you understand double entry — it checks a
boolean. All 388 sprites went into a wrapper around a multiple-choice question.

This gives the test every idea below had to pass:

> **Can you swap the subject matter without changing the game?**
> If yes, it is Ledger Legends again, however good it looks.

---

## 2. The design principle

Two earlier drafts of this design failed that test — the second one quietly. A
story-with-work-beats structure puts the scene and the task next to each other, but if
nothing downstream ever *reads* the work, the accounting is still decorative. Delete it
and the plot still runs.

The fix is a single rule:

> **The numbers you key in are the numbers the story reads back to you.**

Not "complete a task, score marks, resume the plot". The figure you enter *is* the figure
that gets paid, sent or reconciled, and the office reacts to **your** number, right or
wrong.

```
Tue 09:14  WR Ltd's invoice shows £110.25. The order says 16 crates
           at £17.50 less 10% trade. You key what's on the invoice.
Tue 16:02  Your figure goes out on the payment run. Nobody stops you.
Thu 11:47  Deirdre, without looking up: "WR are on the phone. They say
           we've short-paid them. I've put them on hold. I did say."
```

**This is cheap.** Consequences are authored per **outcome bucket** — correct / a specific
named common error / anything else — not simulated. Three short authored replies per task.
No ledger engine, no branch graph, and the coupling is real.

---

## 3. Grounding: what the assessments actually ask for

Five Q2022 mock papers were pulled and text-extracted (MarZar/Acorn): L2 ITBK, L2 POBC,
L3 FAPS, L3 TPFB, L3 MATS.

**L2 ITBK** (11 tasks, 100 marks, 90 min) — identify source documents and build account
codes; the accounting equation; compute a sales invoice from a customer order and enter it
in the sales daybook; spot discrepancies on a credit note against the goods-returned note;
spot discrepancies on a purchase invoice against the purchase order; reconcile a supplier
statement to the payables ledger; enter and total the cash book; petty cash under an
imprest system; set up a recurring entry; post cash book totals to the general ledger;
total and balance ledger accounts.

**L2 POBC** — control accounts; control account reconciliation from a numbered error list;
payment methods; cash book vs bank statement; bank reconciliation; journals; suspense.

**L3 FAPS** — non-current asset register, depreciation and disposals (28 marks); accruals
and prepayments; **extending the trial balance** (24); financial statements for sole
traders and partnerships (24); ratios; incomplete records.

**L3 TPFB** — VAT registration and special schemes; valid VAT documents; input tax
recovery and partial exemption; error correction Method 1 vs Method 2; **verifying the VAT
return against the VAT control account**; which box a transaction falls in; deadlines,
penalties, MTD; payroll principles; and reporting VAT and payroll information to a manager.

**L3 MATS** — cost behaviour; overhead allocation, apportionment, reapportionment, OAR and
over/under absorption; marginal costing and limiting factors; budgeting and cash
management; and a live spreadsheet task (out of scope — a formula-evaluating grid is its
own sub-project).

**L3 BUAW** — knowledge-shaped, not simulation-shaped. Not a candidate.

### The observation

The assessments are already document-driven simulations. They are not quizzes *about*
bookkeeping; they are desk tasks with source documents, books of prime entry, ledgers,
reconciliations and statutory returns. The app currently flattens all of that into
isolated MCQs and table-fills. **A simulator is a higher-fidelity rendering of the
assessment itself** — the one thing the current question bank structurally cannot do.

> **Caveat carried forward from `aat-synoptic-audit-and-plan.md` §6.** All of the above is
> from one publisher's mock papers, not AAT's own specification. Do not hard-code mark
> allocations from it. In particular, an earlier draft of this document claimed AAT
> "reuses the mechanic across levels" because FAPS Task 3 and POBC Task 2 share a
> reconciliation scenario with identical figures (£27,042 / £22,044 / £1,000 undercast /
> £240 Streets Ltd / £5,042 M. Smith). Both papers are MarZar. That is evidence about the
> publisher's authoring economics, not about AAT. The claim was withdrawn.

---

## 4. Formats considered

| # | Format | Core verb | Swap test | Build | Verdict |
|---|---|---|---|---|---|
| 01 | **The Desk** — a working day with a queue and a clock | Check, route, key a figure | Passes fully | ~600–800 lines | **Core loop** |
| 02 | **The Inbox** — the whole game is an email client | Write the reply | Passes | ~250 lines | Fold in as a queue item |
| 03 | **Month End** — a five-day campaign shell | Survive to Friday | Passes | ~150 lines | **Wrapper** |
| 04 | **The Finance Helpdesk** — you are the shared inbox | Look it up, answer a human | Passes | ~200 lines | Fold in as a queue item |
| 05 | **The Office Floor** — point-and-click | Walk somewhere | **Fails** | ~2,000+ and art | **Reject** |

Also considered and rejected outright: a **business tycoon** sim (accounting collapses into
a resource number — Ledger Legends in a suit), and a **Sage/Xero clone** (drifts off-spec;
L2 is manual bookkeeping — borrow the vocabulary of coding and recurring entries as
in-tray artefacts instead).

**05 is documented in order to reject it.** It is the shape people picture when they hear
"office game", it is the best pure comedy vehicle, and it is what died last time.
Navigating a room is not accounting; once the map exists the map becomes the work.
`git log -- 'rpg*'` is 39 commits, roughly twenty of them presentation maintenance —
*"Fix invisible player"*, *"Eliminate move flicker"*, *"Fix follow-camera"*, *"Prevent
fullscreen flicker"* — against three that touched anything accounting-facing.

**04 deserves a specific note** against the stated goal of learning what the role entails.
An enormous, undocumented share of a finance assistant's week is being the person other
departments ask things. Nobody mentions that before you start. It is thin as a whole game
and excellent as items inside a day.

### Recommendation

**01 as the core loop, 03 as the shell, with 02 and 04 as item types inside the day.** One
interface — a queue with a workspace — and three kinds of thing in the queue: a document,
an email, a query. One screen to build and three content shapes to write, rather than four
separate games.

---

## 5. The cast

Seven characters, each of whom exists to generate a real accounting decision. That was the
test each had to pass.

| Who | Role | The joke | The accounting it generates |
|---|---|---|---|
| **Nigel Prewitt** | Finance Manager | Your boss. Four jobs, three done badly, all cheerfully. Sentences trail off around the second clause. | Authorisation limits, delegated work, explaining finance to non-finance |
| **Deirdre Ashcombe** | Purchase Ledger, 31 years | Laminated VAT card, parallel paper ledger, refuses to acknowledge the new system, never wrong | Valid VAT invoices, file copies, the VAT fraction, why controls exist |
| **Gavin Trell** | Sales Manager | Lower case, no punctuation, "thanks in advance" as a pressure tactic | Credit limits, aged debt, related-party expenses, professional behaviour |
| **Priya Raval** | Credit Control | Deadpan. Maintains a spreadsheet called *Things Gavin Has Promised Customers*. It has 41 rows. | Credit control, the ethics beat delivered in two words |
| **Barry Ogden** | Warehouse | Communicates entirely in photographs of documents. Blurry, at an angle, thumb in shot. | Goods received notes, three-way matching, short deliveries |
| **Karen Sillitoe** | Office Manager | Enforces the birthday cake rota with the rigour of a tax authority | VAT extraction, petty cash, overhead apportionment |
| **PRINTER-2** | Antagonist | An HP LaserJet with opinions. Eats remittance advices on deadline day. | Petty cash, the authorisation limit |

**The comedy rule: the joke has to be made of accounting.** Karen's Secret Santa dispute
*is* overhead apportionment — per head or by department revenue, settled by Deirdre
pointing out it is not allowable for tax anyway. Barry's thumb covers **the quantity**, so
"just guess" is a genuinely wrong answer with a consequence. *If a gag would still work in
a game about dentistry, it gets cut.*

---

## 6. Tuesday, 14 May — the pilot day

One day, written in full, as the cheapest possible test of the riskiest part (the writing).
Six items, three interruptions, 34 marks, ~14 minutes.

**Standing facts.** Wrenfield Supplies Ltd, builders' merchant. VAT 20%, reg 418 2290 55.
Petty cash imprest £250.00, authorisation limit £30.00. You are the accounts assistant,
six weeks in. Day 2 of month-end week.

```
08:52  Nine things in the tray. PRINTER-2 is making the noise again.
09:12  Nigel sends a calendar invite: "quick chat". No agenda.        [seed]
09:20  ITEM 1 — WR Limited invoice vs the purchase order              [8 marks]
10:05  Gavin arrives at your desk about the WR invoice                [pressure]
10:20  ITEM 2 — Barry's photograph, and the three-way match           [6 marks]
11:15  Fire alarm. Not a drill. Karen's toaster. Twelve minutes.      [gag]
11:40  ITEM 3 — Karen's staff lunch: how much VAT?                    [3 marks]
13:15  ITEM 4 — Gavin's email: take Crowther off stop                 [6 marks]
13:50  Secret Santa: £5 per head or per department?                   [gag]
14:30  ITEM 5 — petty cash for the toner Karen bought                 [4 marks]
15:00  The quick chat. It is about the sales figure.                  [payoff]
15:30  ITEM 6 — WR Limited's statement won't agree                    [7 marks]
16:45  End of day. What you left behind.
```

### Item 1 — the invoice that's too cheap · 09:20 · 8 marks

**PO 8811** (6 May): 16 crates product DBZ, unit £17.50, trade discount 10%. Terms agreed:
2% prompt payment discount if paid within 7 days.

**Invoice 000231** from WR Limited (12 May): `16 crates DBZ @ £7.50 = £120.00`, no trade
discount shown, `VAT @ 20% = £24.00`, `Total £144.00`. Terms: payment within 30 days.

Three discrepancies — unit price, trade discount omitted, payment terms — and the invoice
is in Wrenfield's favour, which is the point of the item.

**Correct treatment: flag all three and query it with the supplier. Do not post.** You do
not silently correct a supplier's document, and you do not process one you know is wrong
because the error favours you.

```
16 × £17.50                    =  £280.00
less trade discount 10%        =  −£28.00
Net (VAT is charged on this)   =  £252.00
VAT @ 20%                      =   £50.40
Invoice should total           =  £302.40
WR have billed                 =  £144.00
Undercharge                    =  £158.40
```

The 2% PPD is **not** deducted here. It is applied at the point of payment and reduces the
gross figure; the supplier issues a credit note when it is taken.

| Bucket | What happens |
|---|---|
| **A · queried, not posted** *(correct)* | Deirdre: *"Good. It's the price — they've dropped the one. They do it about twice a year and they've never once spotted it themselves."* |
| **B · posted as billed (£144.00)** | The day goes suspiciously smoothly. Item 6's reconciliation will **agree perfectly**, which is the trap. |
| **C · posted corrected (£302.40)** | Deirdre: *"Where did three-oh-two-forty come from? That's not on anything. You can't just* decide *what they've invoiced us, love. That's not bookkeeping, that's creative writing."* |

**Interruption · 10:05 · Gavin.** *"Quick one. You doing the WR invoice? Just whack it
through. They're a good account, I've known Trevor there fifteen years."* → *"Under-priced.
Right. So they've charged us* less*. And you want to ring them up and tell them."* → *(a
pause of roughly two seconds, in which several things are reconsidered)* → *"...Fair play,
actually. Priya said you'd say that."*

The pressure has to arrive *while* the calculation is on screen.

### Item 2 — Barry's thumb · 10:20 · 6 marks

Barry emails a photograph of the goods received note. It is at an angle, in poor light,
with his thumb over the quantity column and a mug out of focus in the corner. *"sent it
thru. cant find the other one, think it might of gone in the skip when we had the clear
out. that hexfield lot were short anyway i told dave"*

**Invoice 77140** from Hexfield Fasteners: `40 boxes P-clips @ £4.25 = £170.00`,
`VAT £34.00`, `Total £204.00`. Our order PO 8798 was for 40 boxes.

**Correct treatment:** don't post from a document you can't read, and don't post from the
invoice on the assumption it's right — that is the entire reason a goods received note
exists. Ask Barry (he can't find it), then check the file copy. Deirdre has one.
**36 boxes were received.**

```
Ordered  (PO 8798)    40 boxes
Received (GRN 1123)   36 boxes   ← short delivery
Invoiced (INV 77140)  40 boxes

Payable: 36 × £4.25            =  £153.00
VAT @ 20%                      =   £30.60
Pay                            =  £183.60
Query: 4 × £4.25 = £17.00 + £3.40 VAT = £20.40  (expect a credit note)
```

| Bucket | What happens |
|---|---|
| **A · found the file copy** *(correct)* | Deirdre, placing a photocopy squared to the desk edge: *"Thirty-six. It's always thirty-six with Hexfield, they can't count past a pallet."* |
| **B · posted 40 per the invoice** | Thursday, Nigel: *"So the stock count's out by four boxes and the — sorry, where did the forty come from?"* |
| **C · asked Barry and stopped** | The invoice ages, the payment run misses it, Hexfield put Wrenfield on stop on Friday. Barry, 16:20: *"yeah still looking. deffo in the skip"* |

Three-way matching — order, goods received note, invoice — is the single most common thing
a purchase ledger clerk does, and almost nobody outside finance knows it exists.

**Interruption · 11:15 · the fire alarm.** Karen: *"It's the toaster. It's not* faulty*,
it's that people put the crumpets in on setting six."* Deirdre: *"It's a five-crumpet
toaster and there are eleven of us."* Nigel: *"Right. Well. That's — everyone's out, so
that's the main — is Priya out? Has anyone — Priya's out. Good. Good."* Priya is standing
directly beside him. Twelve minutes off the clock, no decision, no marks.

### Item 3 — "how much of this can we claim back?" · 11:40 · 3 marks

Karen: the staff lunch came to **£48.60 including VAT**; Nigel needs net and VAT split for
the budget. Attached: a photograph of a receipt taken at 4pm next to a different receipt,
and `SECRET_SANTA_v6_FINAL.xlsx`, which nobody asked for.

```
Gross                  =  £48.60
VAT fraction at 20%    =  1/6
VAT   = £48.60 ÷ 6     =   £8.10
Net   = £48.60 − £8.10 =  £40.50      check: £40.50 × 1.20 = £48.60 ✓
```

The common wrong answer is `£48.60 × 20% = £9.72`, which treats the gross as the net.
Deirdre, without turning round: *"One sixth. Twenty per cent of the* net*, one sixth of the*
gross*. It's on the card."* The card is laminated. The card has been laminated twice.

### Item 4 — Crowther, and a favour · 13:15 · 6 marks · written reply

Gavin, 09:02: *"morning mate just need crowther taking off stop for the one order its a big
account and theyve been with us years. its 6k and i've basically already told them its
going out today. can you sort it thanks in advance"*

Priya forwards it back at 11:03 with two words: **"Row 42. Don't."**

Crowther Fixings: credit limit £5,000, balance £7,200 (over by £2,200), of which £3,100 is
more than 60 days overdue. New order £6,000.

Reuses the existing `written` flow — free text, word count, model answer, rubric
self-assessment.

| Marks | Rubric |
|---:|---|
| 1 | States the account is over its £5,000 limit (balance £7,200) |
| 1 | Notes £3,100 is more than 60 days overdue |
| 2 | States what would release the order — payment of the overdue £3,100, or a properly authorised limit increase |
| 1 | Does not release it, and does not promise to |
| 1 | Collaborative tone — offers to chase rather than simply refusing |

The commonest failure is a reply that is *correct and unhelpful*.

| Bucket | What happens |
|---|---|
| **A · held the line** | Gavin: *"yeah no i get it. can you have a go at chasing the 3100 then. and dont tell priya i said thanks"* · Priya: *"Noted. You're off the list."* (You did not know you were on a list.) |
| **B · released it** | Gavin: *"legend"* · Friday, Nigel: *"Crowther's gone into administration. Which — I mean, nobody could have — well. Priya says the order went out Tuesday. Did we — was that authorised by someone, or...?"* |
| **C · escalated without answering** | Nigel: *"Yes — no — you were right to flag it, only I've got the — is it alright if you just — you know the position better than I do at this point, if I'm honest."* |

**Interruption · 13:50 · the Secret Santa apportionment dispute.** Karen: *"It's five pounds*
per head*. Not five pounds per department. It's in cell B4."* Gavin: *"Sales is four people
and Finance is three, so Sales is subsidising Finance. That's just maths."* Karen: *"It's
not maths, it's Christmas."* Gavin: *"It should go on revenue. Sales brings in the revenue,
Sales should get more Santa."* Deirdre, not looking up: *"It's staff entertaining. It's not
allowable for tax and you can't reclaim the VAT on the client half. So you're arguing about
how to split something we can't have anyway."* A silence. Gavin: *"...I still think it
should go on revenue."*

Overhead apportionment, argued by two people who don't know that's what they're doing.

### Item 5 — the toner, and the £30 limit · 14:30 · 4 marks

Karen has bought a toner cartridge for PRINTER-2 and wants the money back. Voucher 0142,
£41.94 including VAT, receipt attached — *"PLEASE DO NOT REMOVE THE PAPERCLIP"*. Vouchers
paid this month so far: £83.16.

```
Voucher gross           =  £41.94
VAT   = £41.94 ÷ 6      =   £6.99
Net                     =  £34.95      check: £34.95 × 1.20 = £41.94 ✓

Imprest                 = £250.00
less vouchers to date   = −£83.16
less this voucher       = −£41.94
Cash remaining in tin   = £124.90
Restore at month end    = £125.10      check: £124.90 + £125.10 = £250.00 ✓

Control: £41.94 > £30.00 limit → needs authorising before payment.
```

The control is the point; the arithmetic is the easy half. Karen: *"Over the limit? It's a*
toner*. The printer doesn't know about the limit."* If paid anyway, Nigel: *"No, that's —
I'd have signed it, obviously, it's a toner. It's just that the whole point of the limit is
that I sign it* before*, which is — otherwise the limit is just a number we've written
down. Which. Yes."* Nigel mildly disappointed is calibrated to be worse than Deirdre sharp.

**Interruption · 15:00 · the quick chat pays off.** It is about the sales figure: April has
gone *down*, the board see it Thursday, and Nigel will be in Warrington. It hasn't gone
down — the Halewood order was credited. *"Yes! Yes. That's — say that. To the board. On
Thursday."* → *"...to the board?"* → *"It's four people and one of them is my brother-in-law.
You'll be fine. You're a star."* The chat took ninety seconds; the dread ran from 09:12.
It plants Thursday's task: explaining to non-finance people why a credit note makes revenue
fall.

### Item 6 — WR Limited's statement · 15:30 · 7 marks · **reads item 1**

The item that makes the design work. WR's statement must be agreed to their account in the
payables ledger before anything is paid — and their account contains whatever you did at
09:20.

**Statement to 14 May:** balance b/f £1,410.00 · Inv 000198 £642.00 · Inv 000205 £318.00 ·
CN 041 (£96.00) · payment received (£1,410.00) · Inv 000231 £144.00 → **£1,008.00**

**Our ledger** has the same entries *except* invoice 000205, which never reached us, and
invoice 000231, which is whatever you posted.

| At 09:20 you… | Ledger | Difference | Outcome |
|---|---:|---:|---|
| **A** queried it | £546.00 | £462.00 | £318.00 invoice never received + £144.00 under query. Both explainable. **Pay £546.00.** |
| **B** posted £144.00 | £690.00 | £318.00 | One clean difference. It reconciles perfectly. **The worst of the three.** |
| **C** posted £302.40 | £848.40 | £159.60 | £318.00 not received *less* £158.40 of your own correction — one net difference concealing two causes. |

Bucket B is the payload. Deirdre, 16:10, placing the pink copy squarely on the desk:

> *"It agrees. I know. It agrees to* their *mistake. That's the thing nobody tells you. A
> reconciliation only proves the two of you think the same thing. It doesn't prove either
> of you is right."*

**Same statement, three different afternoons, and the branch was set at 09:20 by an
accounting decision — not a dialogue option. Delete the accounting and item 6 does not
exist.** That is the test the two earlier drafts failed.

### End of day

A marks tally per item, mapped to `skills.js` skill tags, with a *"worth revising"* panel
linking into the question bank — so a bad day sends the student **into** revision rather
than away from it — and a *"hanging over you"* panel listing unresolved decisions with the
day they will land on.

### Arithmetic audit

| Item | Figure | Value | Rule |
|---|---|---:|---|
| 1 | Gross before discount | £280.00 | 16 × £17.50 |
| 1 | Trade discount | £28.00 | 10%, deducted **before** VAT is calculated |
| 1 | Net | £252.00 | £280.00 − £28.00 |
| 1 | VAT | £50.40 | 20% of the post-trade-discount net |
| 1 | Invoice total | £302.40 | £252.00 + £50.40 |
| 1 | Prompt payment discount | not deducted | Applied at the point of payment, reducing the gross; supplier issues a credit note when taken |
| 2 | Payable quantity | 36 boxes | Pay for goods *received* (GRN), not ordered or invoiced |
| 2 | Net / VAT / total | £153.00 / £30.60 / £183.60 | 36 × £4.25, then 20% |
| 2 | Queried | £20.40 | 4 × £4.25 = £17.00 + £3.40 VAT |
| 3 | VAT in £48.60 gross | £8.10 | VAT fraction at 20% = 1/6 of the gross |
| 3 | Net | £40.50 | £48.60 − £8.10 · check £40.50 × 1.2 = £48.60 |
| 4 | Over limit by | £2,200.00 | £7,200 balance − £5,000 limit |
| 5 | VAT in £41.94 | £6.99 | £41.94 ÷ 6 · net £34.95 × 1.2 = £41.94 |
| 5 | Cash remaining | £124.90 | £250.00 − £83.16 − £41.94 |
| 5 | Restoration | £125.10 | Imprest £250.00 − cash held £124.90 |
| 6 | Statement balance | £1,008.00 | 1,410 + 642 + 318 − 96 − 1,410 + 144 |
| 6 | Ledger — bucket A | £546.00 | 1,410 + 642 − 96 − 1,410 · difference £462.00 |
| 6 | Ledger — bucket B | £690.00 | £546.00 + £144.00 · difference £318.00 |
| 6 | Ledger — bucket C | £848.40 | £546.00 + £302.40 · difference £159.60 |

---

## 7. Feasibility

For scale: `app.js` is 7,127 lines. The largest comparable self-contained feature — the
DELF mock subsystem — is ~620 lines plus ~250 of CSS plus a 911-line data file, and it is
linear with no queue, no branching and no consequence tracking.

| Component | Estimate |
|---|---:|
| Queue, workspace and document renderer | ~350 lines |
| Interruption and consequence system (outcome buckets, flags) | ~200 lines |
| Email and helpdesk item types (reusing the `written` flow) | ~150 lines |
| Month-end shell and day summary | ~150 lines |
| CSS (document stock, queue, tickets, responsive stacking below 700px) | ~350 lines |
| Validator (`scripts/validate-story-data.js`) | ~60 lines |
| Refactor: make the `written` flow reusable | ~20 lines |
| **Engine total** | **~1,280 lines + data file** |

**The writing is the real cost, at roughly two days per in-game day** — eight or nine
items, each with a document, a correct treatment, two authored wrong-outcome consequences,
and the jokes. A five-day week is about two weeks of engine plus two weeks of writing, and
the writing does not compress.

### Integration notes

- A **mode card inside the existing Practice tab**, not a seventh nav tab. `.nav-tabs` is
  `overflow-x: auto` with a hidden scrollbar (`styles.css:1472`), so a seventh tab silently
  disappears at 375px with no affordance.
- All form inputs must follow the `tfDraft` pattern (`app.js:6472`) — write to draft state
  on `input`, never call `render()`. Note that the T-account playground does the opposite
  (`taPost()` calls `render()`, `app.js:3129`) and is **not** a model to copy here: a full
  `innerHTML` swap would nuke every uncommitted input in a partly-filled daybook.
- `submitWritten()` / `finishWritten()` currently open with
  `State.questions[State.current]` and `finishWritten()` ends by calling `nextPractice()`.
  They need a `(q, ctx)` signature before a story screen can call them.
- `sw.js`: add the data file to `CORE_ASSETS` and bump `CACHE_VERSION`.
- CSP unaffected — no new inline scripts, no external resources.
- **Must remain removable in one commit**: one data file, one render function, one `State`
  key, one `Storage` key, one mode card. That was Ledger Legends' only virtue and it is
  worth keeping.

### De-risking

Build **Tuesday only** — one day, six items, one interruption, and a consequence that fires
*within the same day* (item 1 → item 6) so the loop proves itself without a week of content.

---

## 8. What actually shipped with this document

One bug fix, unrelated to the game and worth making regardless.

**Self-assessed marks were inflating every attainment figure in the app.**
`finishWritten()` computed a pass/fail from the student's *own* rubric ticks and passed it
to `Storage.recordAnswer()`, which writes `stats.topics[].correct/attempts` — and
`calcReadinessScore()` draws **60 of its 100 points** from that accuracy. `finishMock()`
did the same via `gradeResponse()`. The `selfAssessed: true` flag was set on the results
row but never reached the scoring path. Ticking every box on your own prose raised the
"Exam Ready" meter through the same channel as an objective multiple-choice answer.

The fix:

- `recordAnswer(question, correct, opts)` takes `opts.selfAssessed` and tallies those
  answers into parallel `selfAttempts` / `selfCorrect` counters on both the question and
  topic records.
- A new `objAcc(rec)` helper returns total-less-self attempts and correct. Every displayed
  attainment percentage now goes through it: `calcReadinessScore()`, `getGlobalProgress()`,
  `getWeakTopics()`, both `topicMastery()` definitions, `skillAccuracy()`, the progress
  screen topic rows, and the learn-path unit accuracy.
- A self-scored answer no longer extends or breaks the objective answer streak.
- Self-assessed answers still count as seen, and still drive spaced repetition, the mistake
  notebook, XP and daily activity — they are engagement, not attainment.

Backwards compatible: records saved before this change carry no `self*` fields and read as
fully objective, which is the only honest reading available for them. `objAcc()` clamps at
zero so a corrupt record cannot produce a negative.

Measured on a simulated bank: a topic at 60% objective accuracy (6 of 10) jumped to 78%
after eight full-marks self-assessments before the fix, and holds at 60% after it.

Also corrected: the subject registry advertised `515 questions`; the bank is 631.

---

## 9. Open questions

1. **Level 3 is content-first, not simulator-first.** The app has zero L3 questions and
   zero L3 lessons — `L3_BRIDGE` (`app.js:681`) is a signpost. A Level 3 game would be the
   app's first L3 feature and its report card would say "revise depreciation" with nowhere
   to go. The correct first L3 feature is a question bank and learn path. A TPFB VAT-return
   day is the best eventual candidate, because completing a VAT return from the ledger and
   verifying it against the VAT control account is the most simulation-shaped task in the
   whole qualification.
2. **Mark allocations must not be hard-coded** from the publisher mocks (§3 caveat).
3. **This is not exam coverage.** An office game teaches the job and the professional
   judgment. It does not drill the bank. It must sit beside revision, must be labelled as
   practice rather than assessment, and — per §8 — its self-assessed marks must stay out of
   the readiness meter.
4. **The comedy is the highest risk and no architecture mitigates it.** Ledger Legends
   failed on design; this would fail on craft. The only mitigation is writing one day and
   being genuinely willing to bin it.

---

## 10. What shipped — Tuesday

Tuesday is built and playable from a **mode card in the Practice tab** ("A Day at
Wrenfield"). Not a seventh nav tab, for the reason in §7.

| File | What it holds |
|---|---|
| `story-data.js` | All of Tuesday — six items, six scenes, every consequence branch |
| `app.js` | The engine (~470 lines) under a `/* ── STORY MODE ── */` banner |
| `styles.css` | ~200 lines under a `/* ── STORY MODE (Wrenfield) ── */` banner |
| `scripts/validate-story-data.js` | Structural validator, wired into `npm test` and CI |

**Step primitives.** Four, and no more: `flags` (tick all that apply — wrong ticks cancel
right ones), `choice` (pick one), `figures` (typed numbers, tolerance 0.005), `written`
(free text, self-marked against a rubric). Every item is a stack of these, marked in one
pass. Adding a new item is a data change, not a code change.

**Branching is one flat flag map.** A step may `setFlag` from its chosen option; a later
beat may declare `variants: { on: '<flag>', cases: {...} }`. Tuesday uses exactly one such
flag — `wr.posted` — read by two later beats. There is no branch graph and no reachability
problem to reason about.

**The coupling works.** Item 1's decision sets `wr.posted`; item 6 resolves against it and
serves a different ledger, different correct answers and a different closing line:

| Item 1 decision | Item 6 ledger | Difference | Payment |
|---|---:|---:|---:|
| Queried, not posted | £546.00 | £462.00 | £546.00 |
| Posted as billed £144.00 | £690.00 | £318.00 | £690.00 |
| Posted corrected £302.40 | £848.40 | £159.60 | £848.40 |

All three verified end to end in Chromium: each branch plays to the outro, each scores its
variant's figures correctly, and the Gavin scene at 10:05 serves the matching variant.

**Story marks are quarantined.** The engine never calls `Storage.recordAnswer()`. Playing
the whole day leaves `stats.topics` as `{}` — confirmed in the browser test. Progress lives
in `Storage.data.story`, versioned so a content rewrite resets the record rather than
showing a score for a day that no longer exists in that form. The end-of-day screen says so
in plain words, and links the weakest item into topic practice so a bad day sends the
student *into* revision.

**Verified rather than assumed:**
- All three branches played to completion in Chromium; a fully correct run scores 34/34.
- No console errors on any branch.
- No horizontal overflow at 375 px; documents stack below 700 px.
- Dark mode holds — the paper stock stays paper, everything else takes app tokens.
- The validator was proven to fire by breaking three things in turn: an item's marks total,
  a variant's flag name, and a written rubric's sum. Each produced the specific error.
- Draft state survives typing (inputs write to state without re-rendering), so a
  part-filled form is not wiped mid-item.

**Still open on the content:** the accounting is hand-checked against §6's audit table, not
machine-checked — the validator can prove a rubric sums to its marks and a bucket is
reachable, but nothing can prove £252.00 is the right net. That remains a human read.
