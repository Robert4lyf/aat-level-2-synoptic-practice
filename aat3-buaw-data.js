/* AAT Level 3 — Business Awareness.
 *
 * Teaching content and practice questions for BUAW, in its own file for the
 * same reason FAPS and MATS have one: four units in a single file would be
 * most of a megabyte of course material behind one load.
 *
 * THE UNIT WITH NO ARITHMETIC IN IT, and the one this app was least shaped
 * for. The other three Level 3 units are built out of figures that are right or
 * wrong; this one is built out of judgements — which stakeholder has power
 * here, which ethical threat is this, what would PESTLE say about that. The
 * whole scope of content contains one calculation, and it is the effect of a
 * price change on revenue.
 *
 * WHAT FOLLOWS FROM THAT
 *
 * Written tasks matter more here than anywhere else in the qualification. BUAW
 * is "partially computer/partially human marked", and the specification says in
 * terms that "some tasks will require extended written responses". A bank made
 * only of multiple choice would rehearse the recognisable half of a paper whose
 * assessed half is prose — so this unit carries the most written tasks of any,
 * and they are exam rehearsal rather than a study technique.
 *
 * The multiple-choice questions are also written differently. In a costing unit
 * a distractor is a wrong number; here it has to be a DEFENSIBLE wrong
 * judgement — the answer a reader would give if they had the right idea and the
 * wrong distinction. A distractor nobody would pick teaches nothing, and this
 * unit has no arithmetic to hide behind.
 *
 * NO TAX FIGURES AND NO STATUTE NUMBERS. The specification names laws by what
 * they do rather than by section, and the assessment follows it. Where a
 * threshold or a period would date, the material says what the rule is for
 * rather than quoting a figure that a Finance Act can move.
 *
 * Every lesson declares the key concepts it covers in `criteria`, checked by
 * scripts/check-aat3-coverage.js against the BUAW spine in aat3-syllabus.js,
 * which is itself checked against the published specification text by
 * scripts/check-aat3-syllabus-fidelity.js.
 *
 * Card vocabulary is the one the Level 3 player renders: h, p, split, table,
 * example, formula, callout, examtrap, flow, worked.
 */
(function (root) {
  'use strict';

  /* ══════════════════════════════════════════════════════════════════════════
     ORIENTATION — no syllabus coverage claimed
     ══════════════════════════════════════════════════════════════════════════ */

  /* Sits at the head of Outcome 1's track rather than in a group of its own:
     the path is driven by the syllabus, so a group whose outcome matches no
     outcome in the specification is never rendered. */
  var ORIENTATION_LESSONS = [
    {
      id: 'L3-BUAW-0A',
      title: 'Where this unit fits',
      icon: '🧭',
      criteria: [],
      cards: [
        {
          h: 'The unit about everything around the numbers',
          p: [
            'Tax Processes, Financial Accounting and Management Accounting all ask you to produce a figure and be right about it. Business Awareness asks something different: **why is this business shaped the way it is, who has a claim on it, what could go wrong, and what would you do if someone asked you to look the other way.**',
            'It is 15% of the Level 3 qualification, 70 guided learning hours, and a **two-and-a-half hour** paper — the same length as the FAPS and MATS papers on a much smaller body of content, which tells you something about how much writing is expected.',
          ],
          callout: {
            kind: 'key',
            text: 'The assessment is partially computer marked and partially human marked. The human-marked half is the half you write, and it is where the marks are hardest to pick up by recognition.',
          },
        },
        {
          h: 'The five outcomes, and what each is really asking',
          table: {
            headers: ['Outcome', 'Weight', 'The question behind it'],
            rows: [
              ['1 · Business types, structures and governance', '25%', 'Who owns this, who runs it, who can they be made to answer to?'],
              ['2 · External and internal environment', '20%', 'What is happening outside the business that will change its numbers?'],
              ['3 · Professional ethics', '20%', 'What do you do when doing your job properly costs somebody something?'],
              ['4 · New technologies and data security', '15%', 'What is changing about the job, and what new ways are there to lose data?'],
              ['5 · Communicating to stakeholders', '20%', 'You have found something out. Who needs it, in what form, and how soon?'],
            ],
          },
          p: ['Outcome 1 is the largest and it underpins the rest: stakeholders reappear in outcome 5, risk reappears in outcome 4, and the finance function’s relationship with the other functions reappears everywhere.'],
        },
        {
          h: 'How to answer a question in this unit',
          flow: [
            'Read what the business actually is',
            'Ask who is affected',
            'Name the concept',
            'Say what follows for this business',
          ],
          p: [
            'Almost every question here is a scenario. The marks are not for naming the concept — they are for **applying it to the business in front of you**. "Rising interest rates are an economic factor" is worth little; "rising interest rates raise the cost of Ashgrove’s overdraft, which it uses every month between paying suppliers and being paid" is worth the mark.',
            'In a written task, the number of marks tells you how many separate points are wanted. Four marks is four points, not one point said four ways.',
          ],
          examtrap: 'Listing the PESTLE letters, or the five ethical principles, without applying any of them. Recall is the cheap half of every question in this unit.',
        },
        {
          h: 'What this module does not do',
          p: [
            'This is an independent study tool. It is not AAT material, it has no sample assessment behind it, and the wording of a real BUAW task will not match the wording here.',
            'Where the specification names something and gives no detail — the exact stages of the ethical conflict resolution process, for instance — the material teaches the shape AAT’s own guidance uses and says that it is doing so, rather than inventing a numbered list and presenting it as the list.',
          ],
          callout: {
            kind: 'warning',
            text: 'Not affiliated with, endorsed by, or officially associated with AAT.',
          },
        },
      ],
      check: [
        {
          type: 'mcq',
          q: 'What makes Business Awareness different in kind from the other three Level 3 units?',
          opts: [
            'Most of its marks are for judgement applied to a scenario, not for a figure being right',
            'It is the only Level 3 unit with a timed computer based assessment',
            'It is assessed at a lower pass mark than the other units',
            'It carries the largest share of the Level 3 qualification grade',
          ],
          ans: 0,
          exp: 'Every Level 3 unit is a timed computer based assessment at 70%, and BUAW is the joint-smallest at 15%. What sets it apart is that its content contains almost no arithmetic: the marks come from applying a concept to the business described, which is also why so much of it is human marked.',
        },
        {
          type: 'truefalse',
          q: 'Decide whether each statement about this unit is true.',
          statements: [
            { text: 'Some BUAW tasks require extended written responses.', answer: true },
            { text: 'Naming the five PESTLE factors is usually enough to earn the marks in a PESTLE question.', answer: false },
            { text: 'BUAW is worth 15% of the Level 3 qualification.', answer: true },
          ],
          exp: 'The specification states that some tasks require extended written responses, and that is the human-marked half. Naming the factors is recall; the marks are for what each factor does to the business in the scenario. The 15% figure is from the qualification structure — the same as Tax Processes, half of MATS.',
        },
      ],
    },
  ];

  /* ══════════════════════════════════════════════════════════════════════════
     OUTCOME 1 — Business types, structures and governance (25%)
     ══════════════════════════════════════════════════════════════════════════ */

  var LO1_LESSONS = [
    {
      id: 'L3-BUAW-1A',
      title: 'The types of business',
      icon: '🏢',
      criteria: ['BUAW-1.1.1', 'BUAW-1.1.2'],
      cards: [
        {
          h: 'Six shapes a business can take',
          p: ['The differences that matter are **who owns it**, **who is liable for its debts**, and **what it has to publish**. Everything else follows from those three.'],
          table: {
            headers: ['Type', 'Owned by', 'Liability', 'Must publish accounts?'],
            rows: [
              ['Sole trader', 'One person', 'Unlimited — personal assets at risk', 'No'],
              ['Partnership', 'Two or more partners', 'Unlimited, and joint', 'No'],
              ['Limited liability partnership (LLP)', 'Members', 'Limited to what each put in', 'Yes'],
              ['Private limited company (Ltd)', 'Shareholders', 'Limited to the amount unpaid on shares', 'Yes'],
              ['Public limited company (plc)', 'Shareholders, shares tradable publicly', 'Limited', 'Yes, and more of them'],
              ['Not-for-profit / public sector', 'Members, trustees or the state', 'Varies with the legal form', 'Usually yes, to its own regulator'],
            ],
          },
          examtrap: 'A partnership and a limited partnership are not the same thing. In an ordinary partnership every partner has unlimited liability; a **limited partnership** has at least one general partner with unlimited liability and limited partners who may not take part in management.',
        },
        {
          h: 'Unlimited liability is the thing to be clear about',
          p: [
            'A sole trader and their business are the same legal person. If the business owes £40,000 it cannot pay, the creditors can pursue the owner’s house.',
            'A company is a **separate legal person**. It owns its own assets, owes its own debts, and can be sued in its own name. A shareholder who has paid for their shares in full owes nothing more, however badly the company fails.',
          ],
          callout: {
            kind: 'key',
            text: 'Limited liability is a protection for the OWNERS, not for the business. The company still owes what it owes; it is the owners’ other money that is out of reach.',
          },
        },
        {
          h: 'Separation of ownership from control',
          p: [
            'In a sole trader the owner is the manager. There is no gap between the person whose money is at stake and the person deciding how to spend it, so there is nothing to govern.',
            'In a plc, thousands of shareholders own the business and a board of directors runs it. That gap is what governance exists to manage — the whole apparatus of directors’ duties, reporting and audit is there because the people making the decisions are spending somebody else’s money.',
          ],
          split: {
            left: {
              title: 'Little or no separation',
              items: ['Sole trader', 'Small partnership', 'Owner-managed Ltd', 'Governance is largely informal'],
            },
            right: {
              title: 'Wide separation',
              items: ['Public limited company', 'Large not-for-profit', 'Public sector body', 'Governance is formal and externally checked'],
            },
          },
        },
        {
          h: 'Not-for-profit is not the same as making no surplus',
          p: [
            'A charity, a housing association or an NHS trust may well take in more than it spends. What makes it not-for-profit is that the surplus cannot be **distributed to owners** — it is reinvested in the purpose.',
            'Its accountability runs to a different audience. A plc reports to shareholders on profit; a charity reports to its regulator and its donors on whether the money was spent on what it was given for.',
          ],
          examtrap: 'A question that asks about a not-for-profit’s "objectives" is not asking about profit. Value for money, service delivery and the beneficiaries’ interests are the answer.',
        },
      ],
      check: [
        {
          type: 'mcq',
          q: 'Two friends run a shop together with no written agreement, sharing everything. The shop owes a supplier £18,000 and cannot pay. What is the supplier’s position?',
          opts: [
            'It can pursue either partner personally for the whole £18,000',
            'It can pursue each partner for £9,000 and no more',
            'It can only pursue the business assets, not the partners',
            'It must first apply to have the partnership dissolved',
          ],
          ans: 0,
          exp: 'An ordinary partnership has unlimited and **joint** liability. Each partner is liable for the whole debt, not for a share of it — the supplier can pursue whichever partner has money, and it is then for that partner to recover from the other. The absence of a written agreement changes nothing about liability to third parties.',
        },
        {
          type: 'picklist',
          q: 'Match each business to the liability its owners carry.',
          picklist: {
            rowHeader: 'Business',
            choiceHeader: 'Owners’ liability',
            options: ['Unlimited', 'Limited'],
            rows: [
            { text: 'A sole trader plumber', answer: 0 },
            { text: 'A limited liability partnership of solicitors', answer: 1 },
            { text: 'A private limited company with two shareholders', answer: 1 },
            { text: 'A four-partner firm with no LLP registration', answer: 0 },
            ],
          },
          exp: 'Liability follows the legal form, not the size. Two shareholders in an Ltd have limited liability; four partners in an ordinary partnership do not, whatever the firm is worth. An LLP exists precisely to give partners the protection a company’s shareholders have.',
        },
      ],
    },
    {
      id: 'L3-BUAW-1B',
      title: 'Funding, and what businesses have in common',
      icon: '💰',
      criteria: ['BUAW-1.1.3', 'BUAW-1.1.4', 'BUAW-1.1.5'],
      cards: [
        {
          h: 'Four ways to fund a business',
          table: {
            headers: ['Source', 'What it is', 'What it costs'],
            rows: [
              ['New capital introduced', 'The owners put more in', 'A share of future profits, and possibly control'],
              ['Retained profit', 'Profit kept in the business rather than drawn out', 'Nothing to a lender; the owners forgo the cash now'],
              ['Lending', 'A loan, overdraft or finance lease', 'Interest, and usually security over assets'],
              ['Working capital', 'Managing inventory, receivables and payables to free cash', 'Supplier goodwill, and the risk of running short'],
            ],
          },
          p: ['The last is the one readers under-rate. Collecting from customers a week sooner and paying suppliers a week later releases cash without anybody lending anything — and it is the source a finance function can actually influence.'],
        },
        {
          h: 'Matching the funding to the need',
          p: ['Short-term needs take short-term funding; long-term assets take long-term funding. Buying a ten-year machine on an overdraft is the classic error: the overdraft is repayable on demand, and the machine cannot be sold to repay it.'],
          callout: {
            kind: 'tip',
            text: 'Ask how long the money will be tied up. A month of extra stock is an overdraft; a building is a mortgage or new capital.',
          },
        },
        {
          h: 'What every organisation has in common',
          p: ['Whatever its legal form, an organisation is a structure of interrelated people working towards **common objectives**. The specification lists the features that make one:'],
          flow: [
            'Groups of interrelated individuals',
            'Common objectives — goal congruence',
            'Co-operative relationships',
            'Defined responsibility and authority',
            'Teams',
            'Division of work',
          ],
          callout: {
            kind: 'key',
            text: '**Goal congruence** is the one worth learning by name: the alignment of what individuals and departments are pulling towards with what the organisation as a whole wants. It fails when a sales team paid on volume sells at a price the business loses money on.',
          },
        },
        {
          h: 'Manufacturing and service businesses are not the same problem',
          split: {
            left: {
              title: 'Manufacturing',
              items: [
                'Inventory to count and value',
                'Costs traceable to physical units',
                'Internal information is rich — materials, labour hours, machine time',
                'Output can be made now and sold later',
              ],
            },
            right: {
              title: 'Service',
              items: [
                'Little or no inventory',
                'Cost per unit is mostly labour time',
                'Internal information depends on timesheets being kept honestly',
                'Output is consumed as it is produced and cannot be stored',
              ],
            },
          },
          p: ['The reporting consequence is real: a manufacturer’s statement of financial position carries a large inventory figure that has to be valued and audited, and a service business’s does not.'],
          examtrap: 'Do not say a service business "has no costs to trace". It has: they are hours, and a service business that cannot say which client absorbed which hours cannot price its work.',
        },
      ],
      check: [
        {
          type: 'mcq',
          q: 'A growing distributor needs £120,000 to buy a warehouse it will use for fifteen years. Which funding source is least appropriate?',
          opts: [
            'A bank overdraft',
            'A fifteen-year mortgage secured on the warehouse',
            'New capital introduced by the owners',
            'A long-term bank loan',
          ],
          ans: 0,
          exp: 'An overdraft is repayable on demand and priced for short-term use. Funding a fifteen-year asset with it leaves the business owing money it cannot repay without selling the warehouse — the mismatch between the life of the asset and the life of the funding is the error.',
        },
        {
          type: 'truefalse',
          q: 'Decide whether each statement is true.',
          statements: [
            { text: 'Retained profit is a source of funding.', answer: true },
            { text: 'Goal congruence means every employee has the same job description.', answer: false },
            { text: 'A service business generally holds less inventory than a manufacturer.', answer: true },
          ],
          exp: 'Profit kept in the business funds it as surely as a loan does, and costs no interest. Goal congruence is about **objectives** pulling the same way, not about jobs being identical. Services are consumed as they are produced, so there is little to hold.',
        },
      ],
    },
    {
      id: 'L3-BUAW-1C',
      title: 'The legal framework: companies',
      icon: '⚖️',
      criteria: ['BUAW-1.2.1'],
      cards: [
        {
          h: 'What companies legislation is for',
          p: [
            'A company is a legal person that nobody can meet. Legislation exists to make that person accountable: it governs **how a company is formed**, **what its directors must do**, and **what it must report** to the people who cannot see inside it.',
            'The specification asks for three things: the rights and roles of shareholders, the role and duties of directors, and the fact that the legislation regulates formation and reporting. It does not ask for section numbers.',
          ],
        },
        {
          h: 'Shareholders own; directors run',
          split: {
            left: {
              title: 'Shareholders can',
              items: [
                'Vote at general meetings',
                'Appoint and remove directors',
                'Receive dividends when declared',
                'Receive the annual accounts',
                'Approve major transactions the law reserves to them',
              ],
            },
            right: {
              title: 'Shareholders cannot',
              items: [
                'Instruct directors on day-to-day decisions',
                'Take assets out of the company at will',
                'Demand a dividend the directors have not declared',
                'Bind the company to a contract',
              ],
            },
          },
          callout: {
            kind: 'key',
            text: 'The shareholders’ power is the power to CHANGE THE DIRECTORS, not to run the company. That is the whole design: ownership and control are separated on purpose, and the vote is the corrective.',
          },
        },
        {
          h: 'What a director owes the company',
          table: {
            headers: ['Duty', 'What it means in practice'],
            rows: [
              ['Act within powers', 'Do what the constitution allows, for the purpose it allows it for'],
              ['Promote the success of the company', 'Decide for the company’s long-term benefit, having regard to employees, suppliers, customers, the community and the environment'],
              ['Exercise independent judgement', 'Do not simply do as a dominant shareholder says'],
              ['Exercise reasonable care, skill and diligence', 'Judged both by what a reasonable director would do and by what THIS director’s own expertise makes possible'],
              ['Avoid conflicts of interest', 'Do not put yourself where your interest competes with the company’s'],
              ['Not accept benefits from third parties', 'No inducements for acting as a director'],
              ['Declare an interest in a transaction', 'Say so before the company commits, not afterwards'],
            ],
          },
          examtrap: 'The care and skill duty has **two** standards, and the higher one wins. A director who happens to be a qualified accountant is judged as an accountant, not as a general director.',
        },
        {
          h: 'Formation and reporting',
          p: [
            'Forming a company means registering it — the constitution, the registered office, the first directors and the shareholding — and it exists from the moment it is registered, not from the moment it starts trading.',
            'Reporting means filing accounts and a confirmation statement each year, and telling the registrar when the registered details change. The filings are public: anybody can look them up, which is exactly the point.',
          ],
          callout: {
            kind: 'tip',
            text: 'Limited liability is a privilege granted in exchange for transparency. That trade — protection for the owners, disclosure to everybody else — explains most of what companies legislation requires.',
          },
        },
      ],
      check: [
        {
          type: 'mcq',
          q: 'A shareholder holding 30% of a company disagrees with the board’s decision to close a depot. What can they actually do?',
          opts: [
            'Vote to remove the directors at a general meeting',
            'Instruct the directors to reverse the decision',
            'Prevent the closure by refusing to approve the accounts',
            'Take assets of equivalent value out of the company',
          ],
          ans: 0,
          exp: 'Shareholders do not manage. Their power over an operational decision they dislike is indirect and blunt: change the people making the decisions. Approving accounts is a separate matter and would not stop a closure, and shareholders have no right to take assets out.',
        },
        {
          type: 'picklist',
          q: 'For each situation, decide which directors’ duty is most in question.',
          picklist: {
            rowHeader: 'Situation',
            choiceHeader: 'Duty',
            options: ['Avoid conflicts of interest', 'Exercise reasonable care, skill and diligence', 'Exercise independent judgement'],
            rows: [
            { text: 'A director awards a supply contract to a company her husband owns, without telling the board', answer: 0 },
            { text: 'A director who is a chartered engineer signs off a structural report he has not read', answer: 1 },
            { text: 'A director always votes as the majority shareholder privately tells him to', answer: 2 },
            ],
          },
          exp: 'The first is a competing interest that had to be declared. The second engages the care and skill duty at the higher standard, because his own expertise raises what can be expected of him. The third is the independent judgement duty: a director may listen to a shareholder but may not simply act on instruction.',
        },
      ],
    },
    {
      id: 'L3-BUAW-1D',
      title: 'The legal framework: partnerships',
      icon: '🤝',
      criteria: ['BUAW-1.2.2'],
      cards: [
        {
          h: 'What a partnership agreement contains',
          p: ['A partnership agreement is a private contract between the partners. It is not filed anywhere and nobody outside needs to see it, but it decides almost everything about how the partners deal with each other.'],
          table: {
            headers: ['Typically covers', 'Why it matters'],
            rows: [
              ['Capital each partner contributes', 'And whether interest is paid on it'],
              ['How profits and losses are shared', 'The single commonest source of partnership disputes'],
              ['Salaries to partners', 'An appropriation of profit, not an expense of the business'],
              ['Interest on drawings', 'Discourages taking money out early'],
              ['Admitting and retiring partners', 'What happens to goodwill, and how a leaver is paid out'],
              ['Decision making and dispute resolution', 'What needs unanimity and what needs a majority'],
            ],
          },
        },
        {
          h: 'When there is no agreement',
          p: [
            'Many partnerships never write one down. The law then supplies default terms, and they are rarely what the partners assumed:',
          ],
          split: {
            left: {
              title: 'The defaults',
              items: [
                'Profits and losses shared EQUALLY',
                'No salaries to any partner',
                'No interest on capital',
                'No interest on drawings',
                'Every partner may take part in management',
              ],
            },
            right: {
              title: 'What partners assume',
              items: [
                'Shares in proportion to capital put in',
                'The one who works full time is paid for it',
                'The one who put in most earns a return on it',
                'The one who took most out is charged for it',
                'The senior partner decides',
              ],
            },
          },
          examtrap: 'Equal shares regardless of capital is the default that surprises people. A partner who contributed £90,000 against another’s £10,000 takes half the profit unless the agreement says otherwise.',
        },
        {
          h: 'Goodwill, and why a change of partner raises it',
          p: [
            '**Goodwill** is the value of the business above its identifiable net assets — its reputation, its customer relationships, its trained staff, the fact that the phone rings.',
            'It matters at a change of partner because it has been built by the existing partners and a new one would otherwise share it for nothing. The usual treatment is to introduce goodwill into the accounts in the OLD profit-sharing ratio, then write it out again in the NEW one — which leaves each partner credited or debited with exactly the change in their share of it.',
          ],
          callout: {
            kind: 'key',
            text: 'Goodwill is normally not left in the books afterwards. Carrying an internally generated intangible at a figure nobody paid for is not something financial statements will accept, so it goes in and comes straight back out.',
          },
        },
        {
          h: 'What a change of partner does to the partnership',
          flow: [
            'The old partnership ends',
            'Profits are split at the date of change',
            'Goodwill is adjusted between old and new ratios',
            'A new partnership begins',
          ],
          p: ['Legally, admitting or losing a partner dissolves the old partnership and creates a new one, even where the name over the door and the staff are the same. That is why the profit for the year has to be apportioned at the date of the change rather than shared across the whole year in one ratio.'],
        },
      ],
      check: [
        {
          type: 'mcq',
          q: 'Two partners have no written agreement. One contributed £80,000 and works full time; the other contributed £20,000 and works one day a week. How is profit shared?',
          opts: [
            'Equally, regardless of capital or hours worked',
            'In the ratio 80:20, following the capital contributed',
            'In proportion to the hours each partner works',
            'A salary to the full-time partner, then the rest equally',
          ],
          ans: 0,
          exp: 'With no agreement, the statutory default applies: profits are shared equally, with no salaries and no interest on capital. Neither the money nor the hours change it. This is precisely why the agreement is worth writing.',
        },
        {
          type: 'truefalse',
          q: 'Decide whether each statement about goodwill in a partnership is true.',
          statements: [
            { text: 'Goodwill is adjusted when a partner joins or leaves.', answer: true },
            { text: 'Goodwill is normally left in the accounts after the adjustment.', answer: false },
            { text: 'Goodwill is the value of the business above its identifiable net assets.', answer: true },
          ],
          exp: 'The adjustment exists so that a new partner does not acquire a share of value the existing partners built. It goes in at the old ratio and out at the new one, leaving nothing on the statement of financial position — an internally generated intangible is not carried there.',
        },
      ],
    },
  ];

  var LO1_LESSONS_B = [
    {
      id: 'L3-BUAW-1E',
      title: 'Stakeholders: who has a claim',
      icon: '👥',
      criteria: ['BUAW-1.3.1', 'BUAW-1.3.2', 'BUAW-1.3.3', 'BUAW-1.3.4'],
      cards: [
        {
          h: 'A stakeholder is anyone affected by what the business does',
          p: ['Not only the people who own it. The specification names eight, and a scenario question will usually turn on one whose interest a reader forgot.'],
          table: {
            headers: ['Stakeholder', 'What they want', 'What they contribute'],
            rows: [
              ['Customers', 'Quality, price, availability, fair treatment', 'Revenue — and the reason the business exists'],
              ['Suppliers', 'To be paid in full and on time; repeat orders', 'Goods, services and trade credit'],
              ['Finance providers', 'Interest and capital repaid; security', 'The money the business could not raise from owners'],
              ['Owners', 'Return on their investment; growth in its value', 'Capital and, in a small business, the work'],
              ['Government', 'Tax paid, law obeyed, employment created', 'Infrastructure, legal system, sometimes grants'],
              ['Employees', 'Pay, security, conditions, development', 'Labour and skill'],
              ['Regulatory and professional bodies', 'Compliance with standards and codes', 'Licence to operate and public credibility'],
              ['The general public', 'Responsible behaviour, local employment, no harm done', 'Tolerance, reputation, a workforce'],
            ],
          },
        },
        {
          h: 'Their objectives conflict, and that is the point',
          p: [
            'Every interesting stakeholder question is about a **conflict**. Employees want higher wages; owners want higher profit. Customers want lower prices; suppliers want higher ones. The finance provider wants security over assets the owners would rather keep unencumbered.',
            'The answer is never that one of them is wrong. It is to identify whose interest is affected, in which direction, and how strongly.',
          ],
          example: {
            title: 'One decision, four stakeholders',
            rows: [
              ['Decision', 'Move production offshore to cut unit cost by 18%'],
              ['Owners', 'Favourable — margin rises'],
              ['Employees', 'Adverse — redundancies at the existing plant'],
              ['Customers', 'Mixed — lower price possible, longer lead times likely'],
              ['General public / local community', 'Adverse — local employment falls, reputation risk'],
            ],
          },
        },
        {
          h: 'Not every stakeholder matters equally',
          p: ['Significance is a function of **power** — how much they can do about it — and **interest** — how much they care. A bank with a charge over the premises has both; a member of the public who has heard of the company has neither.'],
          split: {
            left: {
              title: 'High power',
              items: [
                'Major shareholders',
                'Lenders with security',
                'Regulators who can withdraw a licence',
                'A customer who is 40% of revenue',
              ],
            },
            right: {
              title: 'Low power',
              items: [
                'Small individual shareholders',
                'One supplier among fifty',
                'The general public, individually',
                'A customer who buys once a year',
              ],
            },
          },
          examtrap: 'Power is about **dependence**, not size. A small supplier of the one component nobody else makes has more power over a large manufacturer than a large supplier of something available anywhere.',
        },
        {
          h: 'Attitudes to risk differ too',
          p: [
            'Owners of a growing business often accept risk, because they share in the upside. A lender does not: the best outcome for a lender is being repaid, so any extra risk is downside with no matching gain. That is why lenders impose covenants and take security.',
            'Employees are usually risk-averse about the business itself — their income depends on one employer, and unlike a shareholder they cannot diversify.',
          ],
          callout: {
            kind: 'key',
            text: 'A stakeholder’s attitude to risk follows from whether they share in the upside. Those who do tolerate risk; those who only carry downside resist it.',
          },
        },
      ],
      check: [
        {
          type: 'mcq',
          q: 'A manufacturer plans to fund expansion by borrowing heavily against its factory. Which stakeholder is most likely to resist, and why?',
          opts: [
            'The lender, whose risk rises while its return cannot',
            'Customers, who may find the factory has been sold',
            'The government, since interest is tax deductible',
            'Employees, whose job security expansion reduces',
          ],
          ans: 0,
          exp: 'A lender receives interest and its capital back and nothing more, so it carries the downside of extra risk without sharing the upside. More debt against the same asset weakens its security. Expansion generally improves job security, and customers are unaffected by how the expansion is funded.',
        },
        {
          type: 'picklist',
          q: 'Match each stakeholder to what they principally contribute to the business.',
          picklist: {
            rowHeader: 'Stakeholder',
            choiceHeader: 'Contribution',
            options: ['Trade credit and supplies', 'Labour and skill', 'Capital and risk-bearing', 'Legal system and infrastructure'],
            rows: [
            { text: 'Suppliers', answer: 0 },
            { text: 'Employees', answer: 1 },
            { text: 'Owners', answer: 2 },
            { text: 'Government', answer: 3 },
            ],
          },
          exp: 'Contribution is the other half of the stakeholder relationship, and the half readers skip. Suppliers do not just sell — by giving credit they fund the business between delivery and payment. Government is a stakeholder because it provides the conditions the business trades in, not only because it taxes it.',
        },
      ],
    },
    {
      id: 'L3-BUAW-1F',
      title: 'Structure, governance and the finance function',
      icon: '🏗️',
      criteria: ['BUAW-1.4.1', 'BUAW-1.4.2', 'BUAW-1.4.3', 'BUAW-1.4.4'],
      cards: [
        {
          h: 'Three ways to draw an organisation',
          table: {
            headers: ['Structure', 'Grouped by', 'Strength', 'Weakness'],
            rows: [
              ['Functional', 'What people do — finance, sales, production', 'Deep expertise; no duplication', 'Departments pull apart; slow across boundaries'],
              ['Divisional', 'Product, region or market', 'Close to the customer; accountable for its own result', 'Duplicated functions; divisions compete'],
              ['Matrix', 'Both at once — a function AND a project', 'Expertise applied where it is needed', 'Two managers, and conflicting instructions'],
            ],
          },
          examtrap: 'A matrix structure’s weakness is not "complexity" in the abstract. It is specific: an employee reports to two people, and when those two want different things there is no rule about who wins.',
        },
        {
          h: 'Span of control: tall or flat',
          split: {
            left: {
              title: 'Narrow span → tall',
              items: [
                'Few people per manager',
                'Many layers between top and bottom',
                'Close supervision; clear progression',
                'Slow decisions; expensive in managers',
              ],
            },
            right: {
              title: 'Wide span → flat',
              items: [
                'Many people per manager',
                'Few layers',
                'Fast decisions; cheaper',
                'Less supervision; managers stretched',
              ],
            },
          },
          p: ['The two are the same fact seen twice: widen the span and the organisation gets flatter, because the same number of people fit under fewer managers.'],
        },
        {
          h: 'Governance is how the organisation is held to account',
          p: [
            'Governance is the system of rules, practices and relationships by which an organisation is **directed and controlled** — who decides, who checks, and to whom they answer.',
            'Size and structure change what it has to look like. A sole trader needs none: there is nobody to hold to account but themselves. A plc needs a board, non-executive directors, an audit committee and a published report, because the owners are absent and numerous.',
          ],
          callout: {
            kind: 'key',
            text: 'The more ownership is separated from control, the more formal governance has to be. That single sentence answers most governance questions in this unit.',
          },
        },
        {
          h: 'Centralised or decentralised',
          split: {
            left: {
              title: 'Centralised',
              items: [
                'Decisions made at the top',
                'Consistent across the organisation',
                'Economies of scale in buying and systems',
                'Slow; local knowledge wasted',
              ],
            },
            right: {
              title: 'Decentralised',
              items: [
                'Decisions pushed down to divisions or sites',
                'Responsive to local conditions',
                'Develops managers',
                'Inconsistent; harder to control; duplicated effort',
              ],
            },
          },
        },
        {
          h: 'Three levels, three kinds of decision',
          table: {
            headers: ['Level', 'Horizon', 'Typical decision', 'Information needed'],
            rows: [
              ['Operational', 'Days and weeks', 'Which order to run next; whether to release a delivery', 'Detailed, internal, frequent, exact'],
              ['Managerial (tactical)', 'Months', 'How to hit this year’s budget; whether to add a shift', 'Summarised, mostly internal, monthly'],
              ['Corporate / strategic', 'Years', 'Which markets to enter; whether to acquire', 'Highly summarised, much of it external, uncertain'],
            ],
          },
          examtrap: 'The information gets **less** detailed and **more** external as you go up. A board paper full of individual invoice lines is information at the wrong level.',
        },
        {
          h: 'What the finance function does for everybody else',
          table: {
            headers: ['Function', 'What finance provides'],
            rows: [
              ['Operations / production', 'Costings, budgets, variance reports, capital appraisal for new plant'],
              ['Sales and marketing', 'Margin analysis by product and customer, credit limits, pricing support'],
              ['Human resources', 'Payroll, the cost of a pay award, headcount budgets'],
              ['Information technology', 'The business case for a system, and the controls it must have'],
              ['Distribution and logistics', 'Cost per delivery, inventory holding cost, the case for a depot'],
            ],
          },
          p: ['The through-line is that finance turns other people’s plans into money, and money back into decisions. A finance function that only produces statutory accounts is doing a fraction of the job the specification describes.'],
        },
      ],
      check: [
        {
          type: 'mcq',
          q: 'A company reorganises so that each manager supervises fourteen people instead of five. What follows?',
          opts: [
            'The organisation becomes flatter, with fewer management layers',
            'The organisation becomes taller, with more management layers',
            'The span of control narrows',
            'Decisions take longer because more people are involved',
          ],
          ans: 0,
          exp: 'Widening the span of control means each manager covers more people, so the same workforce fits under fewer managers and fewer layers — a flatter organisation. Flatter structures usually decide faster, not slower, because there are fewer levels for a decision to climb.',
        },
        {
          type: 'picklist',
          q: 'Match each decision to the level of the organisation that makes it.',
          picklist: {
            rowHeader: 'Decision',
            choiceHeader: 'Level',
            options: ['Operational', 'Managerial (tactical)', 'Corporate / strategic'],
            rows: [
            { text: 'Whether to release a delivery to a customer near its credit limit', answer: 0 },
            { text: 'Whether to add a second shift to meet this year’s budgeted output', answer: 1 },
            { text: 'Whether to acquire a competitor in another country', answer: 2 },
            ],
          },
          exp: 'The horizon is the clue. A delivery decision is today and needs exact detail; a shift is this year and needs summarised internal figures; an acquisition is years out and needs external, uncertain information. Getting this wrong in an exam usually means matching by how important the decision sounds rather than by its time horizon.',
        },
      ],
    },
    {
      id: 'L3-BUAW-1G',
      title: 'Risk, and what to do about it',
      icon: '⚠️',
      criteria: ['BUAW-1.4.5'],
      cards: [
        {
          h: 'Risk is not uncertainty',
          split: {
            left: {
              title: 'Risk',
              items: [
                'The outcomes are known',
                'Their probabilities can be estimated',
                'It can be measured, priced and insured',
                'Example: 2% of deliveries arrive damaged',
              ],
            },
            right: {
              title: 'Uncertainty',
              items: [
                'The outcomes may not all be known',
                'No probability can be attached',
                'It can only be judged, not calculated',
                'Example: how a new competitor will price next year',
              ],
            },
          },
          callout: {
            kind: 'key',
            text: 'If you can put a number on the chance of it, it is risk. If you cannot, it is uncertainty — and management techniques that assume probabilities do not apply.',
          },
        },
        {
          h: 'Four kinds of risk the specification names',
          table: {
            headers: ['Type', 'What it is', 'Example'],
            rows: [
              ['Business risk', 'The risk inherent in the trade itself', 'Demand for the product falls'],
              ['Financial risk', 'Risk arising from how the business is funded and manages money', 'Interest rates rise on a variable loan; a large customer does not pay'],
              ['Strategic risk', 'Risk to the long-term direction', 'A technology change makes the main product obsolete'],
              ['Operational risk', 'Risk from internal processes, people and systems failing', 'A cyberattack; a fire; a supplier failing; reputational damage'],
            ],
          },
          p: ['**Cyber risk** and **reputational risk** sit under operational risk in this specification, and both are worth naming explicitly: a data breach is an operational failure whose largest cost is usually the reputational one.'],
        },
        {
          h: 'Four things you can do about a risk',
          flow: [
            'Avoid — stop doing the thing',
            'Reduce — make it less likely or less costly',
            'Transfer — insure it or contract it away',
            'Accept — carry it knowingly',
          ],
          table: {
            headers: ['Response', 'When it fits', 'Example'],
            rows: [
              ['Avoid', 'High likelihood AND high impact', 'Withdraw from a market where payment cannot be secured'],
              ['Reduce', 'Impact or likelihood can be cut cost-effectively', 'Backups, training, dual suppliers, credit checks'],
              ['Transfer', 'Low likelihood, high impact, and somebody will price it', 'Insurance; a fixed-price contract; factoring receivables'],
              ['Accept', 'Low impact, or the cost of acting exceeds the exposure', 'Absorb small stock losses rather than install a guard'],
            ],
          },
          examtrap: '"Transfer" does not make the risk disappear. Insurance pays the money; it does not restore the customers who left, and the reputational half of the loss usually stays with the business.',
        },
        {
          h: 'Accepting a risk is a decision, not an omission',
          p: [
            'The difference between accepting a risk and ignoring one is that acceptance is **recorded**. Somebody has identified it, judged the exposure, decided the cost of acting exceeds it, and said so.',
            'A risk nobody has written down has not been accepted. It has been missed, and it will surface at the worst moment as a surprise.',
          ],
          callout: {
            kind: 'tip',
            text: 'In a scenario question, look for the risk that has never been named by anyone in the business. That is usually where the marks are.',
          },
        },
      ],
      check: [
        {
          type: 'picklist',
          q: 'Match each risk to its type.',
          picklist: {
            rowHeader: 'Risk',
            choiceHeader: 'Type',
            options: ['Business risk', 'Financial risk', 'Strategic risk', 'Operational risk'],
            rows: [
            { text: 'A key customer, 35% of revenue, goes into administration owing money', answer: 1 },
            { text: 'Consumers switch away from the product category entirely', answer: 0 },
            { text: 'Ransomware encrypts the accounting system for four days', answer: 3 },
            { text: 'A competitor’s new technology makes the main product obsolete within five years', answer: 2 },
            ],
          },
          exp: 'A customer failing to pay is a credit exposure and so financial. A shift in demand for what the business sells is the risk of being in that trade at all. Ransomware is a systems and process failure, which is operational — cyber risk sits there. Obsolescence over five years threatens the direction of the business, which is strategic.',
        },
        {
          type: 'mcq',
          q: 'A distributor faces a 1-in-200 chance each year of a warehouse fire that would cost £2m. Insurance costs £14,000 a year. Which risk response does buying it represent?',
          opts: [
            'Transfer',
            'Reduce',
            'Avoid',
            'Accept',
          ],
          ans: 0,
          exp: 'Insurance moves the financial consequence to somebody else, which is transfer. Reducing would mean sprinklers or fire doors — making the fire less likely or less damaging. Avoiding would mean not holding stock in a warehouse at all. Accepting would mean carrying the £2m exposure knowingly.',
        },
      ],
    },
  ];

  /* ══════════════════════════════════════════════════════════════════════════
     OUTCOME 2 — The external and internal environment (20%)
     ══════════════════════════════════════════════════════════════════════════ */

  var LO2_LESSONS = [
    {
      id: 'L3-BUAW-2A',
      title: 'PESTLE: reading the outside world',
      icon: '🌍',
      criteria: ['BUAW-2.1.1', 'BUAW-2.1.2', 'BUAW-2.1.3'],
      cards: [
        {
          h: 'Six letters for the things a business cannot control',
          p: ['PESTLE is a checklist for the **macro** environment — the forces that act on every business in a market, which no single business can change. Its value is not the letters; it is that a checklist stops you noticing only the factor you were already worried about.'],
          table: {
            headers: ['Letter', 'Covers', 'Examples the specification names'],
            rows: [
              ['Political', 'Government action', 'Government policy, taxation, imports and exports, public spending'],
              ['Economic', 'The economy', 'Interest rates, exchange rates, disposable income, business cycles, inflation'],
              ['Social', 'People and society', 'Demographic change, trends, unemployment'],
              ['Technological', 'Technology', 'Changes in technology, impact on structure'],
              ['Legal', 'Law and regulation', 'Trade regulations, changes in law and regulations'],
              ['Environmental', 'The natural world', 'Environmental change, sustainability'],
            ],
          },
          examtrap: 'Political and Legal overlap and are not the same. A government **deciding** to raise duty is political; the **statute** that requires a business to report its emissions is legal. If it is a policy choice, call it political; if it is a rule you must obey, call it legal.',
        },
        {
          h: 'Political factors',
          p: [
            'Government policy sets the conditions a business trades in: what is taxed, what is subsidised, what is spent on, and how easily goods cross a border.',
            'Public spending is the one readers under-use. A business selling to the NHS, to schools or to local authorities has one customer whose budget is set politically — a spending review changes its revenue without anything happening in its market.',
          ],
          example: {
            title: 'One political change, several effects',
            rows: [
              ['Change', 'Duty on imported components rises'],
              ['Cost', 'Input cost per unit rises'],
              ['Price', 'Either margin falls or the selling price rises'],
              ['Sourcing', 'Domestic suppliers become relatively cheaper'],
              ['Working capital', 'More cash tied up in the same stock'],
            ],
          },
        },
        {
          h: 'Economic factors',
          table: {
            headers: ['Factor', 'What it does to a business'],
            rows: [
              ['Interest rates rise', 'Borrowing costs more; customers with mortgages have less to spend; investment is deferred'],
              ['Exchange rate — sterling weakens', 'Imports cost more; exports become more competitive'],
              ['Disposable income falls', 'Demand for luxuries falls faster than for necessities'],
              ['Business cycle turns down', 'Volumes fall, bad debts rise, and they rise fastest for businesses selling to other businesses'],
            ],
          },
          callout: {
            kind: 'key',
            text: 'The same economic change helps and hurts different businesses. A weak pound is bad news for an importer and good news for the exporter next door — so an exam answer must say **which** business is being talked about.',
          },
        },
        {
          h: 'Two kinds of inflation, and they are not interchangeable',
          split: {
            left: {
              title: 'Demand-pull',
              items: [
                'Too much money chasing too few goods',
                'Demand exceeds what the economy can supply',
                'Prices rise because buyers compete',
                'Usually accompanies a strong economy',
              ],
            },
            right: {
              title: 'Cost-push',
              items: [
                'Input costs rise — wages, energy, materials',
                'Supply becomes more expensive to provide',
                'Prices rise because sellers must recover cost',
                'Can happen while demand is weak',
              ],
            },
          },
          examtrap: 'Cost-push inflation with weak demand is the hard case: costs rise and the business cannot pass them on, so margin is squeezed from both ends. A question describing rising energy prices and falling volumes is describing exactly that.',
        },
      ],
      check: [
        {
          type: 'picklist',
          q: 'Classify each factor under PESTLE.',
          picklist: {
            rowHeader: 'Factor',
            choiceHeader: 'PESTLE letter',
            options: ['Political', 'Economic', 'Social', 'Technological', 'Legal', 'Environmental'],
            rows: [
            { text: 'The government announces a rise in public spending on school buildings', answer: 0 },
            { text: 'The Bank of England raises the base rate', answer: 1 },
            { text: 'The average age of the population in the region rises sharply', answer: 2 },
            { text: 'New regulations require emissions to be reported annually', answer: 4 },
            ],
          },
          exp: 'Public spending is a policy choice, so political. A base rate change is economic. An ageing population is a demographic change, so social. A reporting requirement is a rule that must be obeyed, so legal — the fact that it concerns emissions does not make it environmental; environmental factors are changes in the natural world and in sustainability itself.',
        },
        {
          type: 'mcq',
          q: 'A UK furniture maker buys its timber from Sweden and sells almost entirely in the UK. Sterling weakens sharply. What is the immediate effect?',
          opts: [
            'Input costs rise, squeezing margin unless prices are raised',
            'Input costs fall, improving margin',
            'Revenue rises because exports become more competitive',
            'There is no effect, because it sells only in the UK',
          ],
          ans: 0,
          exp: 'A weaker pound buys less foreign currency, so imported timber costs more in sterling. Selling only in the UK is exactly what makes this bad: an exporter would gain competitiveness to offset the cost, and this business has no export revenue to offset anything.',
        },
      ],
    },
    {
      id: 'L3-BUAW-2B',
      title: 'PESTLE: the rest, and using it',
      icon: '🔭',
      criteria: ['BUAW-2.1.4', 'BUAW-2.1.5', 'BUAW-2.1.6', 'BUAW-2.1.7', 'BUAW-2.1.8', 'BUAW-2.1.9'],
      cards: [
        {
          h: 'Social factors',
          p: [
            '**Demographic change** — the age, size and location of the population — moves demand slowly and predictably, which is what makes ignoring it expensive. An ageing local population changes what a retailer should stock and how it should be reached.',
            '**Trends** move faster and less predictably: what people eat, how they shop, whether they want to own or subscribe.',
            '**Unemployment** works in two directions at once: high unemployment means weaker consumer demand, and also a cheaper, more available workforce.',
          ],
        },
        {
          h: 'Technological factors change structure, not just tools',
          p: ['The specification asks for the **impact on structure**, and that is the part readers skip. Technology that automates a process removes the people who did it, flattens a layer of supervision, and moves the remaining work to a different skill set — the organisation chart changes, not only the equipment.'],
          callout: {
            kind: 'tip',
            text: 'A technological factor answer that stops at "they could use software" has not earned the mark. Say what it does to cost, to headcount, to where the work is done, or to what the finance function spends its time on.',
          },
        },
        {
          h: 'Legal and environmental',
          table: {
            headers: ['Factor', 'Typical effect'],
            rows: [
              ['Trade regulations', 'Customs paperwork, delays at borders, cost of compliance'],
              ['New employment law', 'Higher wage cost, more administration, changed contracts'],
              ['Data protection rules', 'Systems and training cost; penalties for breach'],
              ['Environmental change', 'Disrupted supply, higher insurance, physical risk to sites'],
              ['Sustainability expectations', 'Customer and investor pressure; reporting obligations; supply chain scrutiny'],
            ],
          },
        },
        {
          h: 'Using PESTLE rather than reciting it',
          flow: [
            'Identify the factor',
            'Say which direction it pushes',
            'Say what it does to THIS business',
            'Say what the business could do',
          ],
          p: ['The specification separates "identify PESTLE factors" from "recognise the impact of PESTLE factors", and the marks follow that split. Identification is worth little on its own; the impact is where the answer is.'],
          example: {
            title: 'The same three sentences, applied',
            rows: [
              ['Factor', 'Interest rates rise by two percentage points (economic)'],
              ['Direction', 'Cost of borrowing up; consumer spending down'],
              ['This business', 'Hartley Joinery funds stock on a £200,000 overdraft and sells fitted kitchens, a deferrable purchase'],
              ['Effect', 'Finance cost rises and demand falls at the same time — the two do not offset'],
              ['Response', 'Reduce stock held; extend supplier terms; consider fixing part of the borrowing'],
            ],
          },
          examtrap: 'Answering with a factor that has no effect on the business described. If the scenario’s business has no debt, interest rates matter to its customers rather than to it — and saying so is the better answer.',
        },
      ],
      check: [
        {
          type: 'mcq',
          q: 'Which of these is the best answer to "explain the impact of a technological factor on Redlow Ltd, a payroll bureau"?',
          opts: [
            'Automating data entry cuts headcount per client, shifting cost from labour to subscription',
            'Technology is changing rapidly and Redlow should keep abreast of it',
            'Redlow could buy new computers and software for its bureau staff',
            'Technological factors are one of the six factors making up PESTLE',
          ],
          ans: 0,
          exp: 'The mark is for the impact on this business: what changes, in which direction, and what follows. The other three are, in order, an exhortation, an action with no stated effect, and a definition — none of them says anything about Redlow.',
        },
        {
          type: 'truefalse',
          q: 'Decide whether each statement is true.',
          statements: [
            { text: 'High unemployment can both reduce demand and reduce the cost of hiring.', answer: true },
            { text: 'A new law requiring emissions reporting is best classified as an environmental factor.', answer: false },
            { text: 'Demographic change usually acts on a business more slowly than a consumer trend does.', answer: true },
          ],
          exp: 'Unemployment cuts both ways and a good answer says so. A reporting requirement is a rule to obey, so it is legal — the subject matter does not decide the letter. Demographics shift over years and are largely predictable; trends can turn in a season.',
        },
      ],
    },
    {
      id: 'L3-BUAW-2C',
      title: 'Supply, demand and the price mechanism',
      icon: '📈',
      criteria: ['BUAW-2.2.1', 'BUAW-2.2.2'],
      cards: [
        {
          h: 'Two curves, and where they cross',
          p: [
            '**Demand** falls as price rises: fewer people will buy at £30 than at £20. **Supply** rises as price rises: more producers will make it if it pays better.',
            'Where the two cross is the **equilibrium** — the price at which the quantity buyers want equals the quantity sellers will provide. Above it there is a surplus and price falls; below it there is a shortage and price rises.',
          ],
          formula: 'Equilibrium: supply = demand',
        },
        {
          h: 'Moving ALONG a curve is not the same as moving the curve',
          split: {
            left: {
              title: 'Along the curve — the price mechanism',
              items: [
                'The price itself changed',
                'Quantity demanded or supplied adjusts',
                'The relationship is unchanged',
                'Example: price rises, so fewer are bought',
              ],
            },
            right: {
              title: 'A shift of the curve — market forces',
              items: [
                'Something other than price changed',
                'The whole willingness to buy or sell moves',
                'A new equilibrium at a new price AND quantity',
                'Example: incomes rise, so more are bought at every price',
              ],
            },
          },
          callout: {
            kind: 'key',
            text: 'If the cause is the price, you move along. If the cause is anything else — income, taste, input costs, the number of producers — the curve shifts.',
          },
          examtrap: 'A rise in the cost of materials shifts the SUPPLY curve, not the demand curve. Buyers have not changed their minds about anything; producers have become less willing to supply at each price.',
        },
        {
          h: 'Four kinds of good, and how demand behaves',
          table: {
            headers: ['Type', 'What it means', 'Behaviour'],
            rows: [
              ['Normal', 'Demand rises as income rises', 'Most goods; restaurant meals, new cars'],
              ['Necessity', 'Needed whatever the price', 'Demand changes little with price — bread, electricity, prescription medicines'],
              ['Substitute', 'Can be used instead of another', 'A rise in one raises demand for the other — butter and margarine'],
              ['Complementary', 'Used together with another', 'A rise in one REDUCES demand for the other — printers and cartridges'],
            ],
          },
          p: ['The two that get confused are substitutes and complements, and the test is simple: if the price of A rises and people buy more B, they are substitutes; if they buy less B, they are complements.'],
        },
      ],
      check: [
        {
          type: 'mcq',
          q: 'The price of coffee beans rises sharply. What happens in the market for tea?',
          opts: [
            'Demand for tea rises, because tea is a substitute for coffee',
            'Demand for tea falls, because tea is a complement to coffee',
            'The supply curve for tea shifts left',
            'Nothing, because the two markets are unrelated',
          ],
          ans: 0,
          exp: 'Tea and coffee are substitutes: a rise in the price of one sends buyers to the other, so the demand curve for tea shifts right. Note the curve **shifts** — the price of tea has not changed, something other than its own price has.',
        },
        {
          type: 'picklist',
          q: 'For each event, say what happens to the market for garden furniture.',
          picklist: {
            rowHeader: 'Event',
            choiceHeader: 'Effect',
            options: ['Movement along the demand curve', 'Shift of the demand curve', 'Shift of the supply curve'],
            rows: [
            { text: 'Retailers cut the price in an end-of-season sale', answer: 0 },
            { text: 'A long hot summer is forecast', answer: 1 },
            { text: 'The price of imported teak doubles', answer: 2 },
            ],
          },
          exp: 'A price cut is the price itself moving, so buyers move along the curve. A forecast changes how much people want at every price, so demand shifts. A materials cost rise changes how willing producers are to supply at every price, so supply shifts.',
        },
      ],
    },
    {
      id: 'L3-BUAW-2D',
      title: 'Price changes and competition',
      icon: '🏷️',
      criteria: ['BUAW-2.2.3', 'BUAW-2.2.4'],
      cards: [
        {
          h: 'A price change moves volume, and the two fight',
          p: [
            'Revenue is price × volume, and a price change moves them in opposite directions. Whether revenue rises or falls depends on which moves more — which is the whole of what price elasticity means, though the specification does not require the term.',
            'Cut the price of something people must have and volume barely moves, so revenue falls. Cut the price of something with close substitutes and volume can move a great deal, so revenue rises.',
          ],
          worked: {
            title: 'A 10% price cut, two different products',
            problem: 'Bread sells at £1.20, 5,000 loaves a week. Garden chairs sell at £60, 400 a month. Both prices are cut by 10%. Bread volume rises 3%; chair volume rises 25%. What happens to revenue in each case?',
            steps: [
              { do: 'Bread now: 5,000 × £1.20 = £6,000 a week.',
                why: 'The starting point. Everything after this is a comparison against it.' },
              { do: 'Bread after: price £1.08, volume 5,150. 5,150 × £1.08 = £5,562 — a fall of £438.',
                why: 'Volume rose only 3% against a 10% price cut, so the price given away was not recovered. Bread is a necessity: people do not buy more of it because it is cheaper.' },
              { do: 'Chairs now: 400 × £60 = £24,000 a month.',
                why: 'The same starting point for the second product.' },
              { do: 'Chairs after: price £54, volume 500. 500 × £54 = £27,000 — a rise of £3,000.',
                why: 'Volume rose 25% against a 10% price cut, so the extra units more than paid for the lower price. Chairs are discretionary and shoppable, so buyers respond to price.' },
            ],
            answer: 'Bread revenue falls by £438; chair revenue rises by £3,000. The same percentage cut, and opposite results — because the two products have completely different volume responses.',
            tryIt: {
              q: 'A supplier cuts the price of a component from £25 to £22 and monthly volume rises from 800 to 1,000 units. What is the new monthly revenue, in £?',
              answer: 22000,
              exp: '1,000 × £22 = £22,000, against £20,000 before (800 × £25). The cut raised revenue because volume rose 25% while price fell 12%.',
            },
          },
        },
        {
          h: 'And costs move too',
          p: [
            'Volume rising is not free. Variable costs rise with it, and at some point a step in fixed costs arrives — another shift, another vehicle, another supervisor.',
            'So a price cut that raises revenue can still reduce profit. The figure to watch is **contribution**: price less variable cost, times volume.',
          ],
          examtrap: 'Answering a "what happens to profitability" question with what happens to revenue. They are different questions, and a price cut affects them differently.',
        },
        {
          h: 'What makes a market competitive',
          table: {
            headers: ['Influence', 'More competition when…', 'Less competition when…'],
            rows: [
              ['Product features', 'Products are near-identical', 'Products are differentiated or branded'],
              ['Number of sellers and buyers', 'Many of both', 'Few sellers, or one dominant buyer'],
              ['Barriers to entry', 'Cheap and easy to start', 'Licences, heavy set-up cost, scarce expertise'],
              ['Location', 'Buyers can easily reach alternatives', 'The seller is the only one within reach'],
              ['Availability of information', 'Buyers can compare prices instantly', 'Prices are opaque or hard to compare'],
            ],
          },
          callout: {
            kind: 'key',
            text: 'Barriers to entry are what protect a profitable market. Where there are none, a business earning good margins is advertising an opportunity to everybody who can read its accounts.',
          },
        },
      ],
      check: [
        {
          type: 'numeric',
          q: 'A retailer sells 2,400 units a month at £15. It cuts the price to £13 and volume rises to 3,000 units. What is the change in monthly revenue, in £? Enter a negative number if revenue falls.',
          answer: 3000,
          tolerance: 0,
          exp: 'Before: 2,400 × £15 = £36,000. After: 3,000 × £13 = £39,000. Revenue rises by £3,000 — volume rose 25% while price fell 13.3%, so the volume gain more than covered the price given away.',
        },
        {
          type: 'mcq',
          q: 'A town has one pharmacy, which requires a licence to operate. Which influence on competition is doing most of the work here?',
          opts: [
            'Barriers to entry, in the form of the licence',
            'Availability of information to buyers',
            'Product features, because medicines are differentiated',
            'The number of buyers in the market',
          ],
          ans: 0,
          exp: 'A regulatory licence is a barrier to entry: however profitable the pharmacy is, a competitor cannot simply open next door. Location reinforces it, but the licence is what makes entry impossible rather than merely inconvenient.',
        },
      ],
    },
    {
      id: 'L3-BUAW-2E',
      title: 'Sustainability',
      icon: '🌱',
      criteria: ['BUAW-2.3.1', 'BUAW-2.3.2', 'BUAW-2.3.3'],
      cards: [
        {
          h: 'The definition worth learning',
          p: ['Sustainability is **meeting the needs of the present without compromising the ability of future generations to meet their own needs**. It is not a synonym for environmentalism, and the specification is explicit that it has three aspects.'],
          split: {
            left: {
              title: 'The three aspects',
              items: [
                'Social — people, communities, working conditions',
                'Ecological / environmental — resources, emissions, waste',
                'Economic / financial — the business must still be viable',
              ],
            },
            right: {
              title: 'What each rules out',
              items: [
                'Cheap goods made in unsafe conditions',
                'Profit taken by exhausting a resource',
                'A "sustainable" plan the business cannot afford',
                'Any one aspect pursued alone',
              ],
            },
          },
          examtrap: 'The economic aspect is the one readers forget. A business that runs out of money helps nobody, so financial viability is part of sustainability rather than the thing sustainability is opposed to.',
        },
        {
          h: 'What it asks of an organisation',
          table: {
            headers: ['Principle', 'What it looks like in practice'],
            rows: [
              ['Take a long-term view', 'Judge a decision on decades, not on this quarter’s result'],
              ['Consider wider stakeholders', 'Not just owners: employees, community, supply chain, the public'],
              ['Manage resources responsibly', 'Use less, waste less, and account for what is used'],
              ['Operate sustainably throughout', 'Products, customers, employees, the workplace, the supply chain, and the processes themselves'],
            ],
          },
          p: ['Note the last row: the specification asks for sustainability **across business functions and processes**, not as a separate initiative bolted on to the side.'],
        },
        {
          h: 'The accountant’s public interest duty',
          p: [
            'The specification names this directly, and it is the part that connects sustainability to outcome 3. An accountant’s duty is not only to the employer or the client: it is to **protect society as a whole**, and that includes the organisation’s own sustainability.',
            'In practice that means an accountant who sees the business trading in a way that cannot continue — depleting a resource, deferring maintenance, hiding an environmental cost — has a professional interest in saying so, not merely a personal opinion about it.',
          ],
          callout: {
            kind: 'key',
            text: 'Acting in the public interest is what distinguishes a profession from a trade. It is why the ethical code binds an accountant even when the employer would prefer otherwise.',
          },
        },
      ],
      check: [
        {
          type: 'truefalse',
          q: 'Decide whether each statement about sustainability is true.',
          statements: [
            { text: 'Sustainability has social, environmental and economic aspects.', answer: true },
            { text: 'A plan that is environmentally excellent but bankrupts the business is sustainable.', answer: false },
            { text: 'An accountant’s public interest duty extends to protecting society as a whole.', answer: true },
          ],
          exp: 'Three aspects, and all three have to hold: a plan that fails financially fails as a sustainability plan, because the organisation will not be there to carry it out. The public interest duty is stated in the specification and is the bridge between this outcome and professional ethics.',
        },
        {
          type: 'mcq',
          q: 'Which action best demonstrates sustainability across business processes, rather than as a separate initiative?',
          opts: [
            'Weighing supplier conditions and emissions in every contract award',
            'Sponsoring a tree-planting scheme and publicising it widely',
            'Appointing a sustainability manager who reports to the board',
            'Switching the head office and depot to renewable electricity',
          ],
          ans: 0,
          exp: 'Embedding it in how contracts are awarded changes what the business does every day, throughout the supply chain. The other three are real but bounded: a sponsorship, a post, and one site’s energy. The specification asks for sustainability in products, customers, employees, the workplace, the supply chain and the processes themselves.',
        },
      ],
    },
  ];

  /* ══════════════════════════════════════════════════════════════════════════
     OUTCOME 3 — Professional ethics (20%)
     ══════════════════════════════════════════════════════════════════════════ */

  var LO3_LESSONS = [
    {
      id: 'L3-BUAW-3A',
      title: 'The five fundamental principles',
      icon: '⚖️',
      criteria: ['BUAW-3.1.1', 'BUAW-3.1.2', 'BUAW-3.1.3', 'BUAW-3.1.4', 'BUAW-3.1.5'],
      cards: [
        {
          h: 'Five principles, and what each actually forbids',
          table: {
            headers: ['Principle', 'Requires', 'Breached by'],
            rows: [
              ['Integrity', 'Being straightforward and honest', 'Signing off figures you know to be misleading — or letting them stand'],
              ['Objectivity', 'Not letting bias, conflict or pressure override judgement', 'Auditing a system you designed; taking a fee that depends on the answer'],
              ['Professional competence and due care', 'Current knowledge, and careful work', 'Taking on work you cannot do; letting your knowledge lapse'],
              ['Confidentiality', 'Not disclosing or using what you learn at work', 'Telling a friend about a client’s takeover; using it to trade'],
              ['Professional behaviour', 'Obeying the law and not discrediting the profession', 'Conduct outside work that brings the profession into disrepute'],
            ],
          },
          examtrap: 'Integrity and objectivity get confused. Integrity is about **honesty** — saying what is true. Objectivity is about **independence** — not letting something bend your judgement. A person can be entirely honest and still not objective.',
        },
        {
          h: 'Integrity: being associated with misleading information',
          p: [
            'An accountant breaches integrity not only by writing something false but by being **knowingly associated** with information that is misleading — including by omission, and including by staying silent while somebody else presents it.',
            'The values behind it are honesty, transparency and fairness, and they apply to clients, suppliers and colleagues alike.',
          ],
          callout: {
            kind: 'warning',
            text: 'Integrity is threatened by self-interest ("my bonus depends on this number") and by familiarity ("I have known this client fifteen years and they would not mislead me").',
          },
        },
        {
          h: 'Objectivity: appearing as well as being',
          p: [
            'A **conflict of interest** exists where a person has an interest that competes with the duty they owe. It includes financial interests, and compensation or incentives linked to financial reporting or to a decision.',
            'It is not enough to be objective. An accountant must also **appear** objective, because a reader who cannot see inside the accountant’s head can only judge by the circumstances. A bonus tied to the reported profit compromises objectivity whether or not the accountant is in fact swayed by it.',
          ],
          examtrap: 'Compromised objectivity is what leads to accusations of bribery or fraud even where none occurred — which is the reason "I was not actually influenced" is not a defence.',
        },
        {
          h: 'Competence, confidentiality and behaviour',
          split: {
            left: {
              title: 'Professional competence',
              items: [
                'Keep technical knowledge current — CPD',
                'Refuse work beyond your ability',
                'Ask when unsure rather than guessing',
                'Failing it can mean breach of contract or negligence claims',
              ],
            },
            right: {
              title: 'Confidentiality',
              items: [
                'Applies during and after the relationship',
                'Applies to employers and clients alike',
                'Interacts with data protection law',
                'Never used for personal advantage',
              ],
            },
          },
          p: ['**Professional behaviour** is the widest of the five: complying with law and regulation is a **minimum**, and an act that the law permits is not automatically ethical. Bringing the profession into disrepute can lead to disciplinary action by the professional body even where no law was broken.'],
        },
        {
          h: 'Professional scepticism',
          p: [
            'Assessing information **critically, with a questioning mind, and alert to possible misstatement due to error or fraud**. It is not suspicion of everybody; it is refusing to accept an explanation simply because it was offered by someone plausible.',
            'It applies to recording transactions and to financial reporting, and it is what turns an unusual figure into a question rather than into a number typed in.',
          ],
          callout: {
            kind: 'tip',
            text: 'In a scenario, professional scepticism is called for when something does not fit: a supplier nobody has heard of, a round-number invoice, a customer paying early for no reason, a director explaining a variance without evidence.',
          },
        },
      ],
      check: [
        {
          type: 'picklist',
          q: 'Which fundamental principle is most directly at stake in each situation?',
          picklist: {
            rowHeader: 'Situation',
            choiceHeader: 'Principle',
            options: ['Integrity', 'Objectivity', 'Professional competence and due care', 'Confidentiality'],
            rows: [
            { text: 'An accountant prepares a forecast she knows overstates likely sales, and says nothing', answer: 0 },
            { text: 'An accountant reviews a control system he designed himself last year', answer: 1 },
            { text: 'An accountant accepts a pension advice engagement despite no training in it', answer: 2 },
            { text: 'An accountant mentions a client’s planned acquisition to a friend', answer: 3 },
            ],
          },
          exp: 'The first is dishonesty by association and omission. The second is a self-review threat — his judgement is not independent of his own earlier work, however honest he is. The third is taking on work beyond his competence. The fourth is disclosure of information gained at work, whether or not anyone acts on it.',
        },
        {
          type: 'mcq',
          q: 'A finance manager’s bonus depends on reported profit exceeding a target. He believes he judged a provision fairly. What is the position?',
          opts: [
            'Objectivity is compromised by the incentive, influenced or not',
            'There is no issue, since he judged the provision fairly',
            'It is a confidentiality matter rather than an objectivity one',
            'It is acceptable provided the bonus is disclosed in the accounts',
          ],
          ans: 0,
          exp: 'The specification is explicit that appearing objective matters as much as being objective. An incentive linked to the reported figure is a self-interest threat on its face, and a reader who cannot see inside his head can only judge by the circumstances. Disclosure helps but does not remove the threat.',
        },
      ],
    },
    {
      id: 'L3-BUAW-3B',
      title: 'Threats, safeguards, and what to do',
      icon: '🛡️',
      criteria: ['BUAW-3.1.6', 'BUAW-3.1.7', 'BUAW-3.1.8', 'BUAW-3.1.9', 'BUAW-3.1.10', 'BUAW-3.1.11', 'BUAW-3.1.12', 'BUAW-3.1.13', 'BUAW-3.1.14', 'BUAW-3.1.15', 'BUAW-3.1.16', 'BUAW-3.1.17'],
      cards: [
        {
          h: 'Five threats, and how to tell them apart',
          table: {
            headers: ['Threat', 'The accountant…', 'Example'],
            rows: [
              ['Self-interest', 'stands to gain or lose personally', 'A bonus tied to profit; a shareholding in the client'],
              ['Self-review', 'is judging their own earlier work', 'Reviewing a system, valuation or set of accounts they prepared'],
              ['Advocacy', 'is promoting a position to the point of losing objectivity', 'Acting for the client in a dispute, or promoting its shares'],
              ['Familiarity', 'is too close or too sympathetic to accept things at face value', 'A long relationship; a relative in the finance team'],
              ['Intimidation', 'is deterred by pressure, real or perceived', 'A threat of dismissal, of losing the client, or of litigation'],
            ],
          },
          examtrap: 'Self-review and self-interest get swapped. Ask what the accountant would lose by being right: if it is money or position, it is self-interest; if it is having to admit an earlier mistake, it is self-review.',
        },
        {
          h: 'Principles-based, not rules-based',
          split: {
            left: {
              title: 'A principles-based code',
              items: [
                'States what must be achieved',
                'Requires judgement in each case',
                'Covers situations nobody anticipated',
                'Harder to argue your way around',
              ],
            },
            right: {
              title: 'A rules-based code',
              items: [
                'Lists what is and is not permitted',
                'Certain and easy to test',
                'Silent about anything not listed',
                'Invites "it does not say I cannot"',
              ],
            },
          },
          callout: {
            kind: 'key',
            text: 'The accountancy codes are principles-based on purpose. A rulebook can be complied with to the letter by someone acting badly; a principle cannot, because the question is always whether the principle has been upheld.',
          },
        },
        {
          h: 'Safeguards',
          p: ['A safeguard reduces a threat to an acceptable level. The specification asks both for the types that exist and for **documented organisational policies** as a way of preventing threats from arising at all.'],
          table: {
            headers: ['Safeguard', 'Addresses'],
            rows: [
              ['A second person reviews the work', 'Self-review, self-interest'],
              ['Rotating who works on an assignment', 'Familiarity'],
              ['Declaring an interest, and standing aside', 'Self-interest, conflicts'],
              ['A written policy on gifts and hospitality', 'Self-interest, before it arises'],
              ['Separating the person who prepares from the person who approves', 'Self-review'],
              ['Consulting the professional body’s ethics helpline', 'Any threat where the right course is unclear'],
              ['Declining or resigning from the engagement', 'Anything that cannot be reduced otherwise'],
            ],
          },
        },
        {
          h: 'When a threat cannot be reduced',
          flow: [
            'Identify the threat',
            'Evaluate how serious it is',
            'Apply a safeguard',
            'If it cannot be reduced to an acceptable level — decline, withdraw, or resign',
          ],
          p: ['That last step is the answer the specification wants and the one readers avoid giving. If no safeguard brings the threat to an acceptable level, the accountant must not continue: refuse the work, withdraw from the assignment, or in an employment situation, ultimately resign.'],
          examtrap: '"Document it and carry on" is not a safeguard. Documenting is how you evidence what you did; it does nothing to the threat itself.',
        },
        {
          h: 'Confidentiality: when it can, must, and must not be broken',
          table: {
            headers: ['Position', 'When'],
            rows: [
              ['MAY disclose', 'The client or employer authorises it; or it is permitted by law and there is a professional duty or right to do so'],
              ['MUST disclose', 'Required by law — a court order, or a money laundering report'],
              ['MUST NOT disclose', 'Anywhere else, including to a prospective employer, a friend, or on social media — and including after the relationship has ended'],
            ],
          },
          callout: {
            kind: 'warning',
            text: 'Threats to confidentiality are usually accidental: discussing a client in a public place, leaving a screen visible, sending a document to the wrong recipient, or a social media post that identifies who the work was for.',
          },
        },
      ],
      check: [
        {
          type: 'picklist',
          q: 'Identify the threat in each case.',
          picklist: {
            rowHeader: 'Situation',
            choiceHeader: 'Threat',
            options: ['Self-interest', 'Self-review', 'Advocacy', 'Familiarity', 'Intimidation'],
            rows: [
            { text: 'An accountant is told she will be "let go" unless the accruals are reduced', answer: 4 },
            { text: 'An accountant checks the year-end journals he posted himself', answer: 1 },
            { text: 'An accountant’s brother is the credit controller whose ledger she is reviewing', answer: 3 },
            { text: 'An accountant represents the company at a tax tribunal, arguing its case forcefully', answer: 2 },
            ],
          },
          exp: 'Pressure to change a figure under threat is intimidation. Checking your own work is self-review. A family relationship in the area under review is familiarity. Arguing a client’s case can shade into advocacy, where the accountant becomes committed to a position rather than assessing it.',
        },
        {
          type: 'mcq',
          q: 'An accountant identifies a serious self-interest threat. Every available safeguard has been applied and the threat remains at an unacceptable level. What must she do?',
          opts: [
            'Decline or withdraw from the engagement',
            'Document the threat and continue with the work',
            'Disclose the threat to the client and continue',
            'Apply the same safeguards a second time',
          ],
          ans: 0,
          exp: 'The code is explicit: where a threat cannot be eliminated or reduced to an acceptable level, the accountant must not continue. Documenting evidences what was done but changes nothing about the threat, and disclosure with the client’s blessing does not make an unacceptable threat acceptable.',
        },
      ],
    },
    {
      id: 'L3-BUAW-3C',
      title: 'Ethical conflicts and speaking up',
      icon: '📣',
      criteria: ['BUAW-3.2.1', 'BUAW-3.2.2', 'BUAW-3.2.3', 'BUAW-3.2.4', 'BUAW-3.2.5', 'BUAW-3.2.6', 'BUAW-3.2.7', 'BUAW-3.2.8'],
      cards: [
        {
          h: 'How ethical conflicts arise',
          p: [
            'A conflict arises when two of the fundamental principles pull in different directions, or when what the employer wants and what the principles require are not the same thing.',
            'The commonest shapes: pressure to report a figure a particular way; being asked to keep quiet about something that should be disclosed; being asked to do work outside your competence because there is nobody else.',
          ],
        },
        {
          h: 'Deciding whether behaviour is unethical',
          flow: [
            'What are the facts?',
            'Which principles are engaged?',
            'Who is affected, and how?',
            'What alternatives are there?',
            'Would you be comfortable if it were public?',
          ],
          p: ['The last question is the practical test. Behaviour that could not be explained to a regulator, a journalist or the person it affects is usually the behaviour in question.'],
          callout: {
            kind: 'key',
            text: 'Legal and ethical are not the same. Compliance with the law is a minimum, and an act the law permits may still breach professional behaviour.',
          },
        },
        {
          h: 'Organisational values in practice',
          table: {
            headers: ['Value', 'What it looks like'],
            rows: [
              ['Transparency with customers and suppliers', 'Clear terms; no hidden charges; honest lead times'],
              ['Clear, timely reporting', 'Financial and regulatory information filed on time and understandable'],
              ['Gifts and hospitality', 'A written policy, a value threshold, and a register — because the difficulty is proportion, not principle'],
              ['Paying suppliers fairly and on time', 'Not using size to impose terms a small supplier cannot survive'],
              ['Fair treatment of employees', 'Decent wages, safe conditions, no discrimination'],
              ['Use of social media', 'Nothing that identifies a client, and nothing that discredits the profession'],
            ],
          },
          examtrap: 'A gift is not automatically a bribe and not automatically fine. The questions are its value, its timing relative to a decision, whether it was declared, and whether the policy permits it.',
        },
        {
          h: 'The resolution process',
          flow: [
            'Establish the facts',
            'Raise it internally — line manager, or above if they are involved',
            'Follow the internal procedure, including whistle-blowing routes',
            'Take confidential advice — professional body, helpline, or your own legal adviser',
            'Consider external disclosure, with advice, if nothing else works',
            'Resign if the conflict cannot be resolved',
          ],
          p: [
            'The order matters. Internal routes come first: raising it with a manager, or with someone above them if the manager is part of the problem. Confidential advice is available at every stage and does not breach confidentiality when taken through the proper channel.',
            'External disclosure is last, and should be taken only after third-party advice.',
          ],
        },
        {
          h: 'What follows unethical conduct',
          split: {
            left: {
              title: 'From the professional body',
              items: [
                'Disciplinary proceedings for misconduct',
                'Reprimand, fine, or conditions on membership',
                'Exclusion from membership',
                'Publication of the finding',
              ],
            },
            right: {
              title: 'From the employer',
              items: [
                'Internal disciplinary procedure',
                'Warning, demotion, or dismissal',
                'Claims for breach of contract',
                'Professional negligence claims where competence failed',
              ],
            },
          },
          p: ['The link between competence and negligence is one the specification draws directly: a failure of professional competence and due care is what a breach of contract or negligence claim is built on. **Professional indemnity insurance** exists to meet those claims, and holding it is a requirement of practice.'],
        },
        {
          h: 'Whistle-blowing',
          p: [
            'Reporting should follow the organisation’s formal internal **whistle-blowing** or "speak-out" procedure where one exists. Advice can be sought confidentially from managers or from a professional helpline first.',
            'Where disclosure is made externally in the public interest about certain illegal or unethical acts by an employer, statutory **public interest disclosure protection** may be available — but it is conditional, and the specification is clear that third-party advice should be taken before blowing the whistle externally.',
          ],
          callout: {
            kind: 'warning',
            text: 'Protection is not automatic. It depends on what was disclosed, to whom, and whether the disclosure was in the public interest — which is exactly why advice comes before the disclosure rather than after it.',
          },
        },
      ],
      check: [
        {
          type: 'mcq',
          q: 'An accountant is instructed by her manager to delay recognising a large expense until next year. She has raised it with him and he has refused to change it. What is the appropriate next step?',
          opts: [
            'Raise it with someone more senior, following the internal procedure',
            'Disclose it to the press in the public interest',
            'Post the entry as instructed and note her objection in her diary',
            'Resign immediately',
          ],
          ans: 0,
          exp: 'The process escalates internally before it goes anywhere else: the manager is part of the problem, so the next step is above him. External disclosure is a last resort and requires advice first. Posting the entry under protest is still posting a misleading entry, and resigning skips the steps that might resolve it.',
        },
        {
          type: 'truefalse',
          q: 'Decide whether each statement is true.',
          statements: [
            { text: 'An act permitted by law is always ethical.', answer: false },
            { text: 'Statutory protection for external whistle-blowing is automatic in all cases.', answer: false },
            { text: 'A failure of professional competence can support a professional negligence claim.', answer: true },
          ],
          exp: 'Compliance with law is the minimum, not the standard. Public interest disclosure protection is conditional on what was disclosed and how, which is why advice is taken beforehand. The link between competence and negligence claims is stated directly in the specification, and is why professional indemnity insurance is required.',
        },
      ],
    },
    {
      id: 'L3-BUAW-3D',
      title: 'Money laundering',
      icon: '🔍',
      criteria: ['BUAW-3.3.1', 'BUAW-3.3.2'],
      cards: [
        {
          h: 'Three stages',
          flow: [
            'Placement — criminal cash enters the system',
            'Layering — moved through transactions to obscure its origin',
            'Integration — emerges looking legitimate',
          ],
          table: {
            headers: ['Stage', 'What it looks like'],
            rows: [
              ['Placement', 'Cash paid into accounts, bought into chips, or mixed with the takings of a cash business'],
              ['Layering', 'Transfers between accounts and countries, loans to and from connected companies, invoices for services nobody received'],
              ['Integration', 'Property, a business, or a salary — the money now has a story'],
            ],
          },
          examtrap: 'The order is placement, layering, integration. Learn it by what it does: get it in, move it around, bring it out clean.',
        },
        {
          h: 'The offences an accountant can commit',
          table: {
            headers: ['Offence', 'What it is'],
            rows: [
              ['Failure to disclose', 'Suspecting money laundering in the course of regulated work and not reporting it'],
              ['Tipping off', 'Telling the suspect, or anyone else, that a report has been made or an investigation is under way'],
              ['Prejudicing an investigation', 'Any person falsifying, concealing or destroying relevant documents, or making a disclosure that could prejudice an investigation'],
            ],
          },
          callout: {
            kind: 'warning',
            text: 'Failing to report is an offence in itself. The accountant does not have to have handled a penny of the money, and does not have to be sure — a **suspicion** is enough to trigger the duty.',
          },
        },
        {
          h: 'The protection reporting gives',
          split: {
            left: {
              title: 'Protected disclosure',
              items: [
                'A report made by an employee to their nominated officer, or to the authorities',
                'Protects the discloser from breach of confidentiality',
                'Made because a suspicion arose in the course of work',
              ],
            },
            right: {
              title: 'Authorised disclosure',
              items: [
                'A report made BEFORE doing an act that might otherwise be an offence',
                'Seeks consent to proceed',
                'Protects the discloser from the principal money laundering offences',
              ],
            },
          },
          p: ['Both exist because the duty to report would otherwise collide with the duty of confidentiality. Reporting a genuine suspicion through the proper channel is not a breach of confidentiality — it is required.'],
        },
        {
          h: 'Who is regulated, and what a report contains',
          p: [
            'All accountants providing services in scope are supervised for anti-money-laundering purposes, either by their professional body or by HMRC. Bookkeeping and accountancy are accountancy services, so this is not confined to auditors.',
            'A report — internal to the nominated officer, or a suspicious activity report to the authorities — should identify the **person or business suspected**, **what is suspected and why**, the **information the suspicion rests on**, and the **whereabouts of the laundered property** where known.',
          ],
          callout: {
            kind: 'key',
            text: 'Report **as soon as practicable** after the suspicion arises. Delay is itself a failure, and continuing to act on the matter while sitting on a suspicion can turn an omission into an offence.',
          },
        },
      ],
      check: [
        {
          type: 'picklist',
          q: 'Match each act to the money laundering stage or offence it represents.',
          picklist: {
            rowHeader: 'Act',
            choiceHeader: 'Stage or offence',
            options: ['Placement', 'Layering', 'Integration', 'Tipping off'],
            rows: [
            { text: 'Criminal cash is mixed into the takings of a car wash', answer: 0 },
            { text: 'The money is moved through six company accounts in three countries', answer: 1 },
            { text: 'A flat is bought with the proceeds and let out', answer: 2 },
            { text: 'The accountant mentions to the client that a report has been made', answer: 3 },
            ],
          },
          exp: 'Placement gets the cash into the system, layering obscures where it came from, and integration gives it a legitimate appearance. Telling the client about the report is tipping off — an offence in its own right, and one committed by an accountant who thought they were being fair.',
        },
        {
          type: 'mcq',
          q: 'A bookkeeper suspects a client is laundering money but is not certain. What must she do?',
          opts: [
            'Report the suspicion as soon as practicable, without telling the client',
            'Gather more evidence until she is certain, then report',
            'Tell the client her concerns and give them a chance to explain',
            'Resign from the engagement and take no further action',
          ],
          ans: 0,
          exp: 'Suspicion is the threshold, not certainty — waiting for proof is failure to disclose. Telling the client is tipping off. Resigning without reporting leaves the failure to disclose in place, and adds nothing.',
        },
      ],
    },
  ];

  /* ══════════════════════════════════════════════════════════════════════════
     OUTCOME 4 — New technologies and data security (15%)
     ══════════════════════════════════════════════════════════════════════════ */

  var LO4_LESSONS = [
    {
      id: 'L3-BUAW-4A',
      title: 'What is changing about the job',
      icon: '🤖',
      criteria: ['BUAW-4.1.1', 'BUAW-4.1.2', 'BUAW-4.1.3'],
      cards: [
        {
          h: 'Six technologies the specification names',
          table: {
            headers: ['Technology', 'What it does to accounting'],
            rows: [
              ['Automation of processes', 'Removes repetitive keying — bank feeds, recurring journals, invoice capture'],
              ['AI and machine learning', 'Suggests codings from past behaviour; flags anomalies a rule would miss'],
              ['Blockchain', 'A shared, append-only record: entries cannot be altered once written, and every party sees the same one'],
              ['Electronic filing of documents', 'Documents stored and retrieved digitally, and filed with authorities online'],
              ['Electronic signing', 'Approval evidenced without paper, and timestamped'],
              ['Data analytics', 'Testing whole populations rather than samples, and finding patterns in them'],
            ],
          },
          examtrap: 'Blockchain’s point is **immutability and shared visibility**, not speed and not encryption. An answer that says "it makes transactions faster" has described a payment system, not a distributed ledger.',
        },
        {
          h: 'What it does to the accountant’s role',
          split: {
            left: {
              title: 'Less of',
              items: [
                'Keying transactions',
                'Reconciling by hand',
                'Chasing paper for approval',
                'Producing routine reports',
              ],
            },
            right: {
              title: 'More of',
              items: [
                'Reviewing what the machine did, and why',
                'Interpreting and advising',
                'Designing and testing controls',
                'Explaining figures to people who are not accountants',
              ],
            },
          },
          p: ['The work does not disappear; it moves up. What automation cannot do is decide whether the answer is sensible, which is why professional scepticism becomes more important rather than less.'],
          callout: {
            kind: 'key',
            text: 'Automation removes the keying, not the responsibility. An accountant who accepts a machine’s coding without review has delegated a judgement they still own.',
          },
        },
        {
          h: 'Outsourcing and offshoring',
          table: {
            headers: ['', 'Outsourcing', 'Offshoring'],
            rows: [
              ['What it is', 'Another organisation does the work', 'The work is done in another country'],
              ['Can be both?', 'Yes — an outsourced function located abroad', 'Yes — an in-house team located abroad'],
              ['Driver', 'Cost, and access to expertise the business lacks', 'Labour cost, and time zones'],
            ],
          },
          p: [
            'Technology is what made both practical: a bookkeeping team three time zones away can work in the same cloud system as the business, in real time, on the same records.',
            'The specification asks for the impact on **cost structure, markets and locations**. Cost structure shifts from fixed in-house salaries to a variable contract price; markets open up because a business can serve customers it could not previously reach; locations become a choice rather than a constraint.',
          ],
          examtrap: 'The risks are the other half of the answer: loss of direct control, dependence on a provider, data protection where information crosses a border, and communication across time zones.',
        },
      ],
      check: [
        {
          type: 'mcq',
          q: 'Which best describes what blockchain offers an accounting system?',
          opts: [
            'A shared record that cannot be altered once written',
            'Faster processing of payments between banks and customers',
            'Stronger encryption of accounting data held at rest',
            'Automatic coding of transactions based on past behaviour',
          ],
          ans: 0,
          exp: 'Blockchain is a distributed, append-only ledger: its value is that nobody can quietly amend an earlier entry and everybody sees the same record. Faster payments describe a payment rail, encryption is a security control, and automatic coding is machine learning.',
        },
        {
          type: 'truefalse',
          q: 'Decide whether each statement is true.',
          statements: [
            { text: 'Offshoring and outsourcing mean the same thing.', answer: false },
            { text: 'Automation reduces the accountant’s responsibility for the figures produced.', answer: false },
            { text: 'Data analytics allows whole populations to be tested rather than samples.', answer: true },
          ],
          exp: 'Outsourcing is about WHO does the work; offshoring is about WHERE it is done, and a task can be one, both or neither. Automation moves the work, not the accountability. Testing entire populations rather than sampling is one of the genuine changes analytics has brought.',
        },
      ],
    },
    {
      id: 'L3-BUAW-4B',
      title: 'Cloud accounting',
      icon: '☁️',
      criteria: ['BUAW-4.1.4', 'BUAW-4.1.5'],
      cards: [
        {
          h: 'The six key features',
          table: {
            headers: ['Feature', 'What it means'],
            rows: [
              ['Access from anywhere', 'A browser and a connection, not a particular machine'],
              ['Remote data storage', 'The provider holds and backs up the data, so the business does not'],
              ['Automation capabilities', 'Bank feeds, recurring invoices, automated reminders'],
              ['Apps, plug-ins and add-ins', 'A marketplace of tools that connect to the same ledger'],
              ['Interaction with stakeholders', 'The accountant, the client and the bookkeeper in the same records at once'],
              ['Real-time data', 'The position now, not at the last month end'],
            ],
          },
        },
        {
          h: 'Benefits, and the limitations that come with them',
          split: {
            left: {
              title: 'Benefits',
              items: [
                'No server to buy or maintain',
                'Updates arrive automatically',
                'Accountant and client see the same data',
                'Scales up and down with the business',
                'Cost is predictable and monthly',
              ],
            },
            right: {
              title: 'Limitations',
              items: [
                'Nothing works without an internet connection',
                'Data is held by a third party, in a location you may not choose',
                'Subscription never ends — the total cost can exceed a licence',
                'Updates arrive whether or not you wanted them',
                'Moving to another provider can be hard',
              ],
            },
          },
          examtrap: 'The strongest limitation answers are the ones that are the flip side of a benefit. "Remote storage means no backups to run" and "your data is on somebody else’s server in a country you did not choose" are the same fact.',
        },
        {
          h: 'Off-the-shelf, bespoke, traditional, cloud',
          table: {
            headers: ['', 'Cost', 'Support', 'Updates', 'Fit'],
            rows: [
              ['Off-the-shelf', 'Low', 'Wide user base, forums, publisher', 'Regular', 'Only what it was built to do'],
              ['Bespoke', 'High, and slow to build', 'Depends on the developer', 'Only when commissioned', 'Exact'],
              ['Traditional (installed)', 'Licence up front', 'The business maintains it', 'Manual, sometimes chargeable', 'Works offline'],
              ['Cloud', 'Subscription, ongoing', 'Included in the subscription', 'Automatic', 'Needs a connection'],
            ],
          },
          callout: {
            kind: 'tip',
            text: 'The two axes are independent: software can be off-the-shelf and cloud, off-the-shelf and installed, bespoke and cloud, or bespoke and installed. A question asking about "cloud versus bespoke" is comparing two different things.',
          },
        },
      ],
      check: [
        {
          type: 'picklist',
          q: 'Classify each as a benefit or a limitation of cloud accounting.',
          picklist: {
            rowHeader: 'Statement',
            choiceHeader: 'Benefit or limitation',
            options: ['Benefit', 'Limitation'],
            rows: [
            { text: 'The accountant and the client can work in the same records at the same time', answer: 0 },
            { text: 'The subscription continues for as long as the software is used', answer: 1 },
            { text: 'Nothing can be accessed when the internet connection fails', answer: 1 },
            { text: 'Software updates are applied by the provider without the business doing anything', answer: 0 },
            ],
          },
          exp: 'Shared real-time access and automatic updates are the two features that changed how accountants work with clients. Dependence on connectivity and an unending subscription are the costs of the same model — and both are the flip side of a benefit rather than separate problems.',
        },
        {
          type: 'mcq',
          q: 'A small charity wants software that works in a rural office where the connection drops several times a day. Which is most appropriate?',
          opts: [
            'Traditional installed software',
            'A cloud accounting subscription',
            'Bespoke cloud software',
            'A cloud package with more add-ins',
          ],
          ans: 0,
          exp: 'Cloud software needs a connection to do anything, and the whole difficulty here is that the connection is unreliable. Installed software keeps the data and the program on the machine, which is the one thing that solves this. The other options are all cloud, so all share the same failure.',
        },
      ],
    },
    {
      id: 'L3-BUAW-4C',
      title: 'Data protection and information security',
      icon: '🔐',
      criteria: ['BUAW-4.2.1', 'BUAW-4.2.2', 'BUAW-4.2.3'],
      cards: [
        {
          h: 'Seven data protection principles',
          table: {
            headers: ['Principle', 'What it requires'],
            rows: [
              ['Lawfulness, fairness and transparency', 'A lawful basis, no deception, and people told what is happening'],
              ['Purpose limitation', 'Collected for a stated purpose, and not reused for an unrelated one'],
              ['Data minimisation', 'Only what is needed — not everything that might be handy'],
              ['Accuracy', 'Kept correct and up to date; corrected when wrong'],
              ['Storage limitation', 'Not kept longer than the purpose requires'],
              ['Integrity and confidentiality (security)', 'Protected against unauthorised access, loss and damage'],
              ['Accountability', 'The organisation must be able to DEMONSTRATE compliance, not merely assert it'],
            ],
          },
          examtrap: 'Accountability is the one readers leave out, and it is the one that changes behaviour: it is not enough to comply, you must be able to show you comply — policies, records, training logs.',
        },
        {
          h: 'What a breach costs',
          split: {
            left: {
              title: 'To the individual',
              items: [
                'Identity theft and fraud',
                'Financial loss',
                'Distress, and loss of privacy',
                'Harm from sensitive information becoming known',
              ],
            },
            right: {
              title: 'To the business',
              items: [
                'Regulatory fines',
                'Compensation claims',
                'Cost of investigation and remediation',
                'Reputational damage, and customers lost',
                'Management time diverted for months',
              ],
            },
          },
          callout: {
            kind: 'warning',
            text: 'The largest cost of a data breach is usually not the fine. It is the customers who leave and the ones who never arrive — which is why cyber risk sits under reputational risk as well as operational.',
          },
        },
        {
          h: 'Three kinds of control',
          table: {
            headers: ['Control', 'What it does', 'Example'],
            rows: [
              ['Access levels', 'Limits what each user can see and do', 'A sales clerk can raise an invoice but not change a bank detail'],
              ['Security controls', 'Keeps intruders out', 'Firewalls, anti-virus, multi-factor authentication, encryption'],
              ['Integrity controls', 'Makes sure the data itself is right', 'Input, processing and output controls'],
            ],
          },
          p: [
            '**Input controls** stop bad data getting in — validation rules, range checks, required fields, and a second person approving a new supplier.',
            '**Processing controls** check the system did what it should — batch totals, reconciliations, exception reports.',
            '**Output controls** check what comes out — distribution lists, review before issue, and confirmation that reports reached only the people entitled to them.',
          ],
        },
      ],
      check: [
        {
          type: 'picklist',
          q: 'Match each failure to the data protection principle it breaches.',
          picklist: {
            rowHeader: 'Failure',
            choiceHeader: 'Principle',
            options: ['Purpose limitation', 'Data minimisation', 'Storage limitation', 'Accuracy'],
            rows: [
            { text: 'Customer emails collected for order updates are sold to a marketing firm', answer: 0 },
            { text: 'A job application form asks for the applicant’s marital status and number of children', answer: 1 },
            { text: 'Payroll records for staff who left twelve years ago are still held', answer: 2 },
            { text: 'A customer’s address is known to be wrong and is not corrected', answer: 3 },
            ],
          },
          exp: 'Reuse for an unrelated purpose breaches purpose limitation. Collecting information not needed for the decision breaches minimisation. Holding records long past the purpose breaches storage limitation. Knowing data is wrong and leaving it breaches accuracy — the principle requires correction, not just good intentions at collection.',
        },
        {
          type: 'mcq',
          q: 'A system requires a second person to approve any change to a supplier’s bank details. Which kind of control is this?',
          opts: [
            'An input control',
            'A processing control',
            'An output control',
            'A security control',
          ],
          ans: 0,
          exp: 'It acts on data as it enters the system, so it is an input control — and it is the specific control that defends against invoice redirection fraud. Processing controls check what the system did with the data; output controls check what comes out and who gets it.',
        },
      ],
    },
    {
      id: 'L3-BUAW-4D',
      title: 'Cybersecurity and cyber risk',
      icon: '🛡️',
      criteria: ['BUAW-4.2.4', 'BUAW-4.2.5'],
      cards: [
        {
          h: 'What an attack actually looks like',
          table: {
            headers: ['Attack', 'How it works', 'What it costs'],
            rows: [
              ['Phishing', 'A message that appears to come from someone trusted, asking for credentials or a payment', 'Money paid away; credentials handed over'],
              ['Ransomware', 'Data encrypted and held to ransom', 'Operations stop for days; data may be lost even if paid'],
              ['Malware generally', 'Software that steals, damages or spies', 'Data loss, and a long clean-up'],
              ['Denial of service', 'Systems flooded so they cannot be used', 'Trading stops; customers go elsewhere'],
              ['Insider misuse', 'Someone with legitimate access abusing it', 'Hard to detect, and often the largest single loss'],
            ],
          },
          examtrap: 'Phishing is the attack that firewalls and anti-virus do not stop, because nothing was forced: an authorised person opened the door. That is why training is a security control and not a soft extra.',
        },
        {
          h: 'The risks are to data AND to operations',
          split: {
            left: {
              title: 'Risks to data',
              items: [
                'Confidential information stolen',
                'Records altered without trace',
                'Data lost or corrupted',
                'Personal data exposed, with the regulatory consequences that follow',
              ],
            },
            right: {
              title: 'Risks to operations',
              items: [
                'Systems unavailable — nothing can be invoiced or paid',
                'Supply chain interrupted',
                'Staff idle while the business is down',
                'Recovery cost, and the diverted management time',
              ],
            },
          },
          p: ['A question asking about the risk of a cyberattack that answers only "data could be stolen" has covered half of it. For most businesses the operational half — being unable to trade for a week — is the larger loss.'],
        },
        {
          h: 'What cybersecurity is for',
          flow: [
            'Prevent — controls, patching, training',
            'Detect — monitoring and alerts',
            'Respond — a plan people have practised',
            'Recover — backups that have been tested',
          ],
          callout: {
            kind: 'key',
            text: 'A backup nobody has ever restored from is not a backup; it is a hope. Testing the restore is the control, and it is the one businesses discover they skipped on the day they need it.',
          },
        },
      ],
      check: [
        {
          type: 'mcq',
          q: 'An employee receives an email that appears to be from a supplier, giving new bank details for future payments. Which control most directly prevents the loss?',
          opts: [
            'Verifying the change on a number already held on file',
            'A firewall between the network and the internet',
            'Anti-virus software, kept up to date automatically',
            'Encryption of the accounting database at rest',
          ],
          ans: 0,
          exp: 'Nothing was hacked: an authorised person was persuaded. Firewalls, anti-virus and encryption defend against intrusion and interception, and none of them examines whether a legitimate-looking instruction is genuine. Calling back on a number already held is the control that does.',
        },
        {
          type: 'truefalse',
          q: 'Decide whether each statement is true.',
          statements: [
            { text: 'A ransomware attack risks both data and the ability to operate.', answer: true },
            { text: 'A backup that has never been test-restored is adequate protection.', answer: false },
            { text: 'Anti-virus software prevents an employee from being deceived by a phishing email.', answer: false },
          ],
          exp: 'Ransomware encrypts the data and stops the business using it, so both halves are hit. An untested backup is an assumption, and the assumption fails at the worst moment. Phishing works on people rather than on software, which is why training and verification procedures are the defences that apply.',
        },
      ],
    },
  ];

  /* ══════════════════════════════════════════════════════════════════════════
     OUTCOME 5 — Communicating information to stakeholders (20%)
     ══════════════════════════════════════════════════════════════════════════ */

  var LO5_LESSONS = [
    {
      id: 'L3-BUAW-5A',
      title: 'What makes information good',
      icon: '📋',
      criteria: ['BUAW-5.1.1', 'BUAW-5.1.2'],
      cards: [
        {
          h: 'The attributes of good quality information',
          table: {
            headers: ['Attribute', 'Fails when'],
            rows: [
              ['Accurate', 'It is wrong — but note that accurate enough for the decision is the real standard'],
              ['Complete', 'Something that would change the decision is missing'],
              ['Relevant', 'It is about something the reader cannot act on'],
              ['Timely', 'It arrives after the decision has been made'],
              ['Understandable', 'The reader cannot follow it — jargon, or the wrong level of detail'],
              ['Reliable', 'The reader cannot trust where it came from'],
              ['Cost-effective', 'Producing it cost more than the better decision is worth'],
              ['Accessible', 'The person who needs it cannot get at it'],
            ],
          },
          examtrap: 'Accuracy and cost pull against each other, and the specification expects that to be recognised. A figure accurate to the penny, produced three weeks late at great expense, is worse information than an approximate figure available on the day.',
        },
        {
          h: 'Different levels want different information',
          table: {
            headers: ['Level', 'Purpose', 'Characteristics'],
            rows: [
              ['Operational', 'Run today’s work', 'Detailed, internal, frequent, exact, short horizon'],
              ['Managerial / tactical', 'Deliver this year’s plan', 'Summarised, mostly internal, monthly, some comparison'],
              ['Corporate / strategic', 'Set direction', 'Highly summarised, much of it external, infrequent, uncertain'],
            ],
          },
          p: ['The same underlying data serves all three, at different degrees of aggregation. A board seeing individual invoice lines and an order picker seeing an annual summary are the same mistake in opposite directions.'],
          callout: {
            kind: 'key',
            text: 'As you go up: less detail, longer horizon, more external content, and more tolerance of uncertainty.',
          },
        },
      ],
      check: [
        {
          type: 'mcq',
          q: 'A monthly board pack lists every purchase invoice over £50. What is the principal fault?',
          opts: [
            'It is at the wrong level for the audience, and too detailed to use',
            'It is not accurate enough for a board to rely on',
            'It arrives too late for the board to act on it',
            'It comes from a source the board cannot rely on',
          ],
          ans: 0,
          exp: 'Nothing here is wrong, late or unreliable — there is simply far too much of it for the decisions a board makes. Strategic information should be highly summarised, and an unsummarised list makes the important items harder to see rather than easier.',
        },
        {
          type: 'picklist',
          q: 'Which attribute of good information is failing in each case?',
          picklist: {
            rowHeader: 'Case',
            choiceHeader: 'Attribute failing',
            options: ['Timely', 'Complete', 'Understandable', 'Cost-effective'],
            rows: [
            { text: 'The variance report for March is issued in late May', answer: 0 },
            { text: 'The margin analysis omits the largest customer', answer: 1 },
            { text: 'The report is written in accounting terms the operations manager does not use', answer: 2 },
            { text: 'A £9,000 study is commissioned to refine a £1,200 decision', answer: 3 },
            ],
          },
          exp: 'Each fails a different attribute, and they are worth telling apart because the remedy differs: report sooner, include everything material, write for the reader, and stop spending more than the decision is worth.',
        },
      ],
    },
    {
      id: 'L3-BUAW-5B',
      title: 'Big data',
      icon: '📊',
      criteria: ['BUAW-5.1.3', 'BUAW-5.1.4', 'BUAW-5.1.5', 'BUAW-5.1.6', 'BUAW-5.1.7'],
      cards: [
        {
          h: 'Five Vs',
          table: {
            headers: ['V', 'What it means'],
            rows: [
              ['Volume', 'How much there is — far more than a spreadsheet holds'],
              ['Velocity', 'How fast it arrives, and how fast it must be used'],
              ['Variety', 'How many forms it takes — numbers, text, images, sensor readings, clicks'],
              ['Veracity', 'How far it can be trusted: accuracy, bias, and gaps'],
              ['Value', 'Whether anything useful can actually be got out of it'],
            ],
          },
          examtrap: 'Veracity and value are the two that carry the marks, because they are the two that can be **absent**. Volume, velocity and variety describe what the data is; veracity and value ask whether it is any good and whether it is worth the effort.',
        },
        {
          h: 'Where it comes from',
          split: {
            left: {
              title: 'Internal sources',
              items: [
                'Transaction records from the accounting system',
                'Point-of-sale and till data',
                'Website and app activity',
                'Sensors on equipment and vehicles',
                'Customer service records',
              ],
            },
            right: {
              title: 'External sources',
              items: [
                'Social media',
                'Government and industry statistics',
                'Credit reference and market data',
                'Weather and traffic feeds',
                'Purchased consumer datasets',
              ],
            },
          },
        },
        {
          h: 'Benefits and limitations',
          table: {
            headers: ['Benefits', 'Limitations'],
            rows: [
              ['Patterns invisible in a sample become visible', 'Cost of storage, tools and the skills to use them'],
              ['Decisions on evidence rather than intuition', 'Data protection obligations, especially for personal data'],
              ['Whole populations can be tested, not samples', 'Correlation mistaken for causation'],
              ['Faster response — near real time', 'Bias in the data becomes bias in the decision'],
              ['New questions can be asked of data already held', 'Volume can obscure rather than reveal'],
            ],
          },
        },
        {
          h: 'Professional scepticism applies to data too',
          p: [
            'The specification asks for scepticism **in relation to big data** specifically, and it is asking about veracity. Where did this come from? Who collected it, and for what? What is missing from it, and would the gap change the answer?',
            'Data bought from an external source is the sharpest case: the buyer did not see it collected, cannot check it, and inherits whatever bias was in it. Analytics from an external source is useful and is not evidence in the way an internal reconciliation is.',
          ],
          callout: {
            kind: 'warning',
            text: 'A large dataset is not a reliable one. Volume makes a wrong conclusion look better supported, which is exactly why scepticism matters more as the data gets bigger, not less.',
          },
        },
      ],
      check: [
        {
          type: 'picklist',
          q: 'Which characteristic of big data does each statement describe?',
          picklist: {
            rowHeader: 'Statement',
            choiceHeader: 'Characteristic',
            options: ['Volume', 'Velocity', 'Variety', 'Veracity'],
            rows: [
            { text: 'The dataset holds four billion rows', answer: 0 },
            { text: 'Readings arrive from vehicle sensors every second', answer: 1 },
            { text: 'It combines transactions, photographs and free-text complaints', answer: 2 },
            { text: 'Roughly 8% of the postcodes in it are known to be wrong', answer: 3 },
            ],
          },
          exp: 'The first three describe the shape of the data — how much, how fast, how many forms. The fourth is about whether it can be trusted, which is veracity: the characteristic that decides whether any conclusion drawn from it is safe.',
        },
        {
          type: 'mcq',
          q: 'An analysis of a purchased consumer dataset shows customers who buy product A rarely buy product B. What should the accountant do first?',
          opts: [
            'Ask how the data was collected and what is missing from it',
            'Recommend discontinuing product B on the strength of it',
            'Recommend bundling A and B together at a discount price',
            'Accept the finding, the dataset being large enough to rely on',
          ],
          ans: 0,
          exp: 'Professional scepticism applies to data as much as to explanations. The dataset was bought, so nobody in the business saw it collected — its coverage, its age and its bias are all unknown, and size does not fix any of them. Acting on a finding before testing its veracity is the error the specification names.',
        },
      ],
    },
    {
      id: 'L3-BUAW-5C',
      title: 'Visualising information',
      icon: '📉',
      criteria: ['BUAW-5.2.1', 'BUAW-5.2.2', 'BUAW-5.2.3', 'BUAW-5.2.4', 'BUAW-5.2.5'],
      cards: [
        {
          h: 'Pick the form that answers the question',
          table: {
            headers: ['Form', 'Best for', 'Poor for'],
            rows: [
              ['Line graph', 'A trend over time', 'Comparing unrelated categories'],
              ['Bar chart', 'Comparing categories', 'Showing a continuous trend'],
              ['Pie chart', 'Parts of one whole, with few slices', 'Comparison over time, or more than about six slices'],
              ['Table', 'Exact figures the reader must read off', 'Showing a shape or a trend at a glance'],
              ['Matrix', 'Two dimensions at once — product against region', 'A single series'],
              ['Diagram or image', 'A process or a relationship', 'Quantities'],
            ],
          },
          examtrap: 'A pie chart cannot show change over time, and a series of pie charts is a bad way to try. If the question is "what happened over the year", the answer is a line.',
        },
        {
          h: 'What a chart is for',
          p: [
            'Visualisation exists to make **patterns and anomalies** visible — a trend, a seasonal shape, a step change, an outlier. A table of the same numbers holds all the information and shows none of it.',
            'It also exists to reach people who do not read accounts. A dashboard is how accounting software puts a position in front of a non-technical stakeholder without asking them to interpret a trial balance.',
          ],
          example: {
            title: 'Reading a chart',
            rows: [
              ['Pattern', 'Revenue rises every quarter but Q4 rises fastest — seasonality'],
              ['Anomaly', 'One month’s cost is triple its neighbours — investigate, do not smooth'],
              ['Relationship', 'Overtime cost tracks output with a one-month lag'],
              ['Trend', 'Margin has fallen a point a year for four years, though profit rose'],
            ],
          },
        },
        {
          h: 'Choosing badly is a way of misleading',
          split: {
            left: {
              title: 'Honest choices',
              items: [
                'An axis starting at zero for a bar chart',
                'A scale that does not change mid-chart',
                'All the relevant periods shown',
                'The chart type that fits the question',
              ],
            },
            right: {
              title: 'Choices that mislead',
              items: [
                'A truncated axis exaggerating a small change',
                'Selecting only the periods that suit',
                'Three dimensions where two would do',
                'Colour used to draw the eye to the wrong series',
              ],
            },
          },
          callout: {
            kind: 'warning',
            text: 'Presenting a chart chosen to create an impression the figures do not support is an integrity issue, not a presentation preference. The accountant is associated with information that misleads.',
          },
        },
      ],
      check: [
        {
          type: 'mcq',
          q: 'A manager wants to see how monthly sales have moved across three years. Which form is most appropriate?',
          opts: [
            'A line graph',
            'A pie chart for each year',
            'A table of the 36 monthly figures',
            'A single bar per year',
          ],
          ans: 0,
          exp: 'The question is about movement over time, which is what a line does. Pie charts show composition at a moment and cannot show a trend. The table holds every figure and shows no shape. One bar per year hides everything that happened inside each year, including seasonality.',
        },
        {
          type: 'truefalse',
          q: 'Decide whether each statement is true.',
          statements: [
            { text: 'A bar chart whose axis starts at 80 rather than 0 can exaggerate a small difference.', answer: true },
            { text: 'Dashboards are chiefly used to communicate with non-technical stakeholders.', answer: true },
            { text: 'Choosing a chart that overstates an improvement is a presentation preference rather than an ethical issue.', answer: false },
          ],
          exp: 'A truncated axis makes a 3% difference look like a doubling, which is the commonest way a chart misleads without stating anything false. Dashboards exist to put a position in front of people who do not read accounts. Choosing a form to create an impression the figures do not support means being associated with misleading information, which engages integrity.',
        },
      ],
    },
    {
      id: 'L3-BUAW-5D',
      title: 'Communicating it',
      icon: '✉️',
      criteria: ['BUAW-5.3.1', 'BUAW-5.3.2'],
      cards: [
        {
          h: 'Choosing the medium',
          table: {
            headers: ['Medium', 'Fits', 'Does not fit'],
            rows: [
              ['Email', 'A record; something that can be read later; attachments', 'Anything sensitive to the wrong recipient; a discussion'],
              ['Report', 'Analysis, a recommendation, an audience who will read', 'Anything urgent'],
              ['Meeting or call', 'Discussion, negotiation, anything contentious', 'Anything needing a record, unless minuted'],
              ['Presentation', 'Persuading a group; showing a shape', 'Detailed figures to be checked'],
              ['Dashboard', 'A position, continuously, for people who will not read a report', 'Explanation of why'],
              ['Formal letter', 'External, legal, or where a record matters', 'Routine internal matters'],
            ],
          },
          p: ['The principles behind the choice: **who the audience is**, **how urgent it is**, **how complex it is**, **whether a record is needed**, and **how sensitive it is**.'],
        },
        {
          h: 'What makes communication professional',
          split: {
            left: {
              title: 'It does',
              items: [
                'Meet the stakeholder’s actual requirement',
                'Use a medium suited to the outcome wanted',
                'Convey valid, checkable information',
                'Respect confidentiality',
                'Use language the reader uses',
              ],
            },
            right: {
              title: 'It does not',
              items: [
                'Send everything to everybody',
                'Bury the point on page four',
                'Assume the reader is an accountant',
                'Include information the recipient is not entitled to',
                'Use a medium chosen for the sender’s convenience',
              ],
            },
          },
          examtrap: 'Confidentiality is part of choosing the medium, not a separate consideration. Discussing a redundancy list on a call from a train, or copying a whole distribution list on a message about one employee, is the commonest way it goes wrong.',
        },
        {
          h: 'Different stakeholders, different needs',
          table: {
            headers: ['Stakeholder', 'Wants', 'Best served by'],
            rows: [
              ['The board', 'The position, the risks, the decision needed', 'A short report with a clear recommendation'],
              ['An operations manager', 'What to do differently this week', 'A one-page exception report, or a dashboard'],
              ['A lender', 'Whether the covenant holds and the cash is there', 'Formal reporting on the agreed schedule'],
              ['A supplier', 'When they will be paid', 'A remittance advice, on time'],
              ['A regulator', 'Compliance, evidenced', 'The prescribed form, by the deadline'],
            ],
          },
          callout: {
            kind: 'key',
            text: 'Start from what the recipient has to DO with the information. That decides the length, the level of detail, the medium and the deadline — all four at once.',
          },
        },
      ],
      check: [
        {
          type: 'mcq',
          q: 'A finance manager must tell the operations director that a supplier will miss a delivery, affecting tomorrow’s production. Which medium fits best?',
          opts: [
            'A phone call, followed by a short email confirming it',
            'A detailed report circulated at the end of the week',
            'A note added to next month’s board pack',
            'An update on the operations dashboard',
          ],
          ans: 0,
          exp: 'It is urgent, simple, and needs both immediate action and a record. A call achieves the first and an email the second. The report and the board pack arrive far too late, and a dashboard shows a position rather than pushing an alert to the person who has to act tonight.',
        },
        {
          type: 'picklist',
          q: 'Match each stakeholder to the communication that best meets their requirement.',
          picklist: {
            rowHeader: 'Stakeholder',
            choiceHeader: 'Communication',
            options: ['A short report with a recommendation', 'A one-page weekly exception report', 'A remittance advice', 'The prescribed return, by the deadline'],
            rows: [
            { text: 'The board, deciding whether to open a second site', answer: 0 },
            { text: 'A production manager who needs to act on overspends', answer: 1 },
            { text: 'A supplier asking which invoices a payment covers', answer: 2 },
            { text: 'A regulator requiring evidence of compliance', answer: 3 },
            ],
          },
          exp: 'Each is decided by what the recipient must do. The board decides, so it needs a recommendation. The production manager acts weekly, so exceptions only. The supplier needs to allocate a payment. The regulator needs the form it prescribed, on time — the content is not for the sender to choose.',
        },
      ],
    },
  ];

  /* ══════════════════════════════════════════════════════════════════════════
     PRACTICE BANK
     ══════════════════════════════════════════════════════════════════════════

     Drawn to the exam weighting by the player, so the counts here follow the
     outcome percentages rather than the amount of content. Every question
     declares the criteria it tests, checked against the syllabus.

     ON DISTRACTORS IN A UNIT WITH NO ARITHMETIC. Elsewhere a wrong option is a
     wrong number and needs no defending. Here it has to be a judgement a reader
     would actually make — the answer they would give with the right idea and
     the wrong distinction. Zero-rated against exempt; integrity against
     objectivity; political against legal; self-review against self-interest.
     A distractor nobody would choose teaches nothing, and this unit has no
     arithmetic to hide behind.                                              */

  var QUESTIONS = [
    /* ── Outcome 1 · Business types, structures and governance ───────────── */
    { id: 'B-1-01', unitKey: 'buaw', lo: 1, criteria: ['BUAW-1.1.1'], type: 'mcq',
      q: 'Which business type gives its owners limited liability while remaining a partnership in form?',
      opts: ['A private limited company', 'A limited liability partnership', 'An ordinary partnership', 'A sole trader'],
      ans: 1,
      exp: 'An LLP is a partnership whose members have the liability protection a company’s shareholders have. An ordinary partnership gives none, a sole trader none, and a private limited company gives the protection but is not a partnership.' },
    { id: 'B-1-02', unitKey: 'buaw', lo: 1, criteria: ['BUAW-1.1.1'], type: 'mcq',
      q: 'What most clearly distinguishes a public limited company from a private one?',
      opts: ['Its shares can be offered to the public', 'Its owners have limited liability', 'It must keep accounting records', 'It is a separate legal person'],
      ans: 0,
      exp: 'Limited liability, record keeping and separate legal personality apply to both. What makes a company public is that it may offer its shares to the public, which is why the reporting and governance requirements on it are heavier.' },
    { id: 'B-1-03', unitKey: 'buaw', lo: 1, criteria: ['BUAW-1.1.1'], type: 'truefalse',
      q: 'Decide whether each statement about not-for-profit organisations is true.',
      statements: [
        { text: 'A not-for-profit organisation may generate a surplus.', answer: true },
        { text: 'Its surplus may be distributed to owners.', answer: false },
        { text: 'Public sector bodies fall within the not-for-profit category.', answer: true },
      ],
      exp: 'A surplus is allowed and often necessary; what is not allowed is distributing it to owners, because there are none in that sense. The specification groups public sector organisations here explicitly.' },
    { id: 'B-1-04', unitKey: 'buaw', lo: 1, criteria: ['BUAW-1.1.2'], type: 'mcq',
      q: 'In which organisation is the separation of ownership from control widest?',
      opts: ['A sole trader', 'A two-person partnership', 'An owner-managed private limited company', 'A public limited company'],
      ans: 3,
      exp: 'A plc’s shareholders are numerous, dispersed and take no part in management, so the gap between the people whose money is at stake and the people spending it is at its widest. That gap is what governance exists to bridge, which is why plcs carry the heaviest governance requirements.' },
    { id: 'B-1-05', unitKey: 'buaw', lo: 1, criteria: ['BUAW-1.1.3'], type: 'picklist',
      q: 'Classify each as a source of funding for a business.',
      picklist: {
        rowHeader: 'Item',
        choiceHeader: 'Is it a funding source?',
        options: ['Yes', 'No'],
        rows: [
        { text: 'Profit retained rather than drawn out', answer: 0 },
        { text: 'Extending the time taken to pay suppliers', answer: 0 },
        { text: 'Revaluing the premises upwards in the accounts', answer: 1 },
        { text: 'Depreciation charged on the delivery vans', answer: 1 },
        ],
      },
      exp: 'Retained profit and working capital management both put money at the business’s disposal. Depreciation and an upward revaluation are book entries: they change reported figures and move no cash, so neither funds anything. Lending, new capital, retained profit and working capital are the four sources the specification names.' },
    { id: 'B-1-06', unitKey: 'buaw', lo: 1, criteria: ['BUAW-1.1.3'], type: 'mcq',
      q: 'A wholesaler releases cash by cutting the stock it holds from eight weeks to five. Which funding source is it using?',
      opts: ['Working capital', 'Lending', 'New capital introduced', 'Retained profit'],
      ans: 0,
      exp: 'Managing inventory, receivables and payables to release cash is working capital as a funding source — nobody has lent anything and no owner has put anything in. It is the source the finance function can most directly influence.' },
    { id: 'B-1-07', unitKey: 'buaw', lo: 1, criteria: ['BUAW-1.1.4'], type: 'mcq',
      q: 'A sales team paid on volume sells at prices below full cost to hit its target. Which feature of organisation has failed?',
      opts: ['Division of work', 'Goal congruence', 'Defined authority', 'Co-operative relationships'],
      ans: 1,
      exp: 'Goal congruence is the alignment of what individuals are pulling towards with what the organisation wants. Here the incentive rewards volume while the business needs margin, so the team can succeed on its own terms while the business loses money.' },
    { id: 'B-1-08', unitKey: 'buaw', lo: 1, criteria: ['BUAW-1.1.5'], type: 'picklist',
      q: 'Which type of business does each statement describe?',
      picklist: {
        rowHeader: 'Statement',
        choiceHeader: 'Type',
        options: ['Manufacturing', 'Service'],
        rows: [
        { text: 'Output cannot be stored and is consumed as it is produced', answer: 1 },
        { text: 'Costs are traced to physical units through materials and machine hours', answer: 0 },
        { text: 'A large inventory figure has to be counted and valued at the year end', answer: 0 },
        { text: 'Cost per unit is largely labour time recorded on timesheets', answer: 1 },
        ],
      },
      exp: 'The presence of inventory is the fault line: it gives a manufacturer rich internal cost information and a valuation problem, and gives a service business neither. A service business still traces costs — to hours rather than to units.' },
    { id: 'B-1-09', unitKey: 'buaw', lo: 1, criteria: ['BUAW-1.1.5'], type: 'truefalse',
      q: 'Decide whether each statement is true.',
      statements: [
        { text: 'A service business generally has less internal cost information available than a manufacturer.', answer: true },
        { text: 'A service business has no costs that can be traced to what it sells.', answer: false },
        { text: 'A manufacturer’s reporting includes an inventory valuation a service business generally avoids.', answer: true },
      ],
      exp: 'Manufacturing generates materials, labour and machine data as a by-product of making things; a service business has to record time deliberately. It does have traceable costs, and a service business that cannot say which client absorbed which hours cannot price its work.' },
    { id: 'B-1-10', unitKey: 'buaw', lo: 1, criteria: ['BUAW-1.2.1'], type: 'mcq',
      q: 'A director is a qualified engineer. She approves a structural report without reading it and it is wrong. How is her conduct judged?',
      opts: ['By what a reasonable director would do, and by her own expertise', 'By what a reasonable director with no expertise would do', 'By whether she acted honestly and in good faith', 'By whether the company suffered a loss as a result'],
      ans: 0,
      exp: 'The duty of care, skill and diligence has two standards and the higher applies. A director with relevant expertise is judged by it — the fact that a non-engineer director might reasonably have relied on the report does not help her.' },
    { id: 'B-1-11', unitKey: 'buaw', lo: 1, criteria: ['BUAW-1.2.1'], type: 'picklist',
      q: 'Decide whether each is something shareholders can do.',
      picklist: {
        rowHeader: 'Action',
        choiceHeader: 'Can shareholders do it?',
        options: ['Yes', 'No'],
        rows: [
        { text: 'Vote to remove a director', answer: 0 },
        { text: 'Take company assets for personal use', answer: 1 },
        { text: 'Instruct the board which supplier to use', answer: 1 },
        { text: 'Receive the annual accounts', answer: 0 },
        ],
      },
      exp: 'Shareholders own but do not manage. Their power is to appoint and remove the people who manage, and to receive information — not to direct operations or to help themselves to assets, which belong to the company as a separate legal person.' },
    { id: 'B-1-12', unitKey: 'buaw', lo: 1, criteria: ['BUAW-1.2.1'], type: 'mcq',
      q: 'Which is NOT among a company director’s statutory duties?',
      opts: ['To exercise independent judgement', 'To declare an interest in a proposed transaction', 'To guarantee the company’s debts personally', 'To avoid conflicts of interest'],
      ans: 2,
      exp: 'Personal guarantee is a commercial arrangement a lender may ask for; it is not a duty of office. The other three are duties, and the separation between the company’s debts and the director’s own money is the point of incorporation.' },
    { id: 'B-1-13', unitKey: 'buaw', lo: 1, criteria: ['BUAW-1.2.2'], type: 'mcq',
      q: 'Three partners have no written agreement. One dies. What is the effect on the partnership?',
      opts: ['The existing partnership ends and any continuing business is a new partnership', 'The partnership continues unchanged with two partners', 'The partnership continues, with the deceased partner’s share held in trust', 'Nothing changes until the accounts are next prepared'],
      ans: 0,
      exp: 'A change in the partners dissolves the old partnership and creates a new one, even where the trade, the name and the premises are the same. That is why profit for the year has to be apportioned at the date of change rather than shared across the whole year in one ratio.' },
    { id: 'B-1-14', unitKey: 'buaw', lo: 1, criteria: ['BUAW-1.2.2'], type: 'truefalse',
      q: 'Decide whether each statement about partnership agreements is true.',
      statements: [
        { text: 'A partnership agreement must be filed publicly.', answer: false },
        { text: 'With no agreement, profits are shared equally regardless of capital contributed.', answer: true },
        { text: 'A partnership agreement typically covers interest on capital and on drawings.', answer: true },
      ],
      exp: 'The agreement is a private contract between the partners and is filed nowhere. The statutory default of equal shares is what makes writing one worthwhile — it ignores both capital and effort. Interest on capital and on drawings are among the terms it usually settles.' },
    { id: 'B-1-15', unitKey: 'buaw', lo: 1, criteria: ['BUAW-1.2.2'], type: 'mcq',
      q: 'Why is goodwill adjusted when a new partner is admitted?',
      opts: ['So value built by the existing partners is not given away', 'Because companies legislation requires the adjustment', 'To increase the total capital employed by the firm', 'Because goodwill must appear on the statement of financial position'],
      ans: 0,
      exp: 'Goodwill is the value above identifiable net assets, and the existing partners built it. The adjustment credits it in the old ratio and removes it in the new one, so each partner is credited or charged with exactly the change in their share. It is normally written straight back out rather than left in the books.' },
    { id: 'B-1-16', unitKey: 'buaw', lo: 1, criteria: ['BUAW-1.3.1', 'BUAW-1.3.2'], type: 'picklist',
      q: 'Match each stakeholder to what they principally want from the business.',
      picklist: {
        rowHeader: 'Stakeholder',
        choiceHeader: 'Principal objective',
        options: ['Interest and capital repaid, with security', 'Pay, security and good conditions', 'Tax paid and law obeyed', 'Return on investment and growth in its value'],
        rows: [
        { text: 'A bank with a charge over the premises', answer: 0 },
        { text: 'Employees', answer: 1 },
        { text: 'Government', answer: 2 },
        { text: 'Owners', answer: 3 },
        ],
      },
      exp: 'A lender wants to be repaid and nothing more, which is why it resists extra risk. Employees want the relationship to continue on good terms. Government wants compliance and revenue. Owners want a return, and are the only group here that shares in the upside of risk.' },
    { id: 'B-1-17', unitKey: 'buaw', lo: 1, criteria: ['BUAW-1.3.3'], type: 'mcq',
      q: 'What do suppliers contribute to a business beyond the goods themselves?',
      opts: ['Trade credit, funding the gap between delivery and payment', 'Capital, repaid over time together with interest', 'Labour and skill applied to making the product', 'Regulatory approval for the business to trade at all'],
      ans: 0,
      exp: 'A supplier that invoices on 30-day terms has funded the business for a month at no interest. It is easy to miss because nobody calls it lending, but it is one of the largest sources of finance most businesses use.' },
    { id: 'B-1-18', unitKey: 'buaw', lo: 1, criteria: ['BUAW-1.3.4'], type: 'mcq',
      q: 'Which stakeholder has the most power over a large manufacturer?',
      opts: ['The sole supplier of a component nobody else makes', 'A supplier of packaging available from twenty sources', 'An individual holding 40 of the company’s 8 million shares', 'A member of the public who has heard of the company'],
      ans: 0,
      exp: 'Power comes from dependence, not from size. A monopoly supplier of an essential component can halt production; a large supplier of a commodity cannot, because it can be replaced. Neither the tiny shareholder nor the passer-by has any leverage at all.' },
    { id: 'B-1-19', unitKey: 'buaw', lo: 1, criteria: ['BUAW-1.3.4'], type: 'mcq',
      q: 'Why is a lender typically more risk-averse than an owner?',
      opts: ['A lender carries the downside of risk but not the upside', 'A lender has less information about how the business trades', 'A lender’s return is taxed more heavily than an owner’s', 'A lender cannot take security over the business’s assets'],
      ans: 0,
      exp: 'The best outcome for a lender is being repaid in full, so additional risk can only make things worse for it. An owner shares in a good outcome as well as a bad one. That asymmetry, not information or tax, is what produces covenants and security.' },
    { id: 'B-1-20', unitKey: 'buaw', lo: 1, criteria: ['BUAW-1.4.1'], type: 'picklist',
      q: 'Match each organisational structure to its characteristic weakness.',
      picklist: {
        rowHeader: 'Structure',
        choiceHeader: 'Weakness',
        options: ['Departments pull apart and cross-boundary work is slow', 'Functions are duplicated and divisions compete with each other', 'An employee reports to two managers who may want different things'],
        rows: [
        { text: 'Functional', answer: 0 },
        { text: 'Divisional', answer: 1 },
        { text: 'Matrix', answer: 2 },
        ],
      },
      exp: 'Each weakness is the direct cost of the corresponding strength. Grouping by function builds expertise and silos together; grouping by division brings accountability and duplication together; a matrix applies expertise where it is needed at the price of two lines of command.' },
    { id: 'B-1-21', unitKey: 'buaw', lo: 1, criteria: ['BUAW-1.4.1'], type: 'truefalse',
      q: 'Decide whether each statement about span of control is true.',
      statements: [
        { text: 'A wider span of control tends to produce a flatter organisation.', answer: true },
        { text: 'A tall organisation generally makes decisions more quickly than a flat one.', answer: false },
        { text: 'A narrow span of control allows closer supervision.', answer: true },
      ],
      exp: 'Widening the span fits the same people under fewer managers, so layers disappear. More layers means a decision has further to climb, so tall structures are slower. Close supervision is the benefit a narrow span buys, and its cost is the extra management.' },
    { id: 'B-1-22', unitKey: 'buaw', lo: 1, criteria: ['BUAW-1.4.2'], type: 'mcq',
      q: 'Why does a plc need more formal governance than an owner-managed company?',
      opts: ['Its owners are absent, so those spending the money must answer for it', 'It is larger, and large organisations are inherently harder to manage', 'Its directors are less trustworthy than those of a private company', 'It pays more tax and so answers to more public scrutiny'],
      ans: 0,
      exp: 'Governance exists to bridge the separation of ownership from control. Where the owner is the manager there is nothing to bridge; where thousands of shareholders take no part in management, the whole apparatus of boards, committees and published reporting is what stands in for their supervision.' },
    { id: 'B-1-23', unitKey: 'buaw', lo: 1, criteria: ['BUAW-1.4.2'], type: 'picklist',
      q: 'Classify each as a feature of centralised or decentralised control.',
      picklist: {
        rowHeader: 'Feature',
        choiceHeader: 'Which',
        options: ['Centralised', 'Decentralised'],
        rows: [
        { text: 'Purchasing negotiated once for the whole group', answer: 0 },
        { text: 'Branch managers approve local spending up to a limit', answer: 1 },
        { text: 'Each site sets its own opening hours', answer: 1 },
        { text: 'One standard pricing policy applied everywhere', answer: 0 },
        ],
      },
      exp: 'Centralisation buys consistency and scale and pays for it in speed and local fit. Decentralisation buys responsiveness and management development and pays for it in consistency and control. Neither is right in the abstract.' },
    { id: 'B-1-24', unitKey: 'buaw', lo: 1, criteria: ['BUAW-1.4.3'], type: 'mcq',
      q: 'As you move from operational to strategic level, how does the information needed change?',
      opts: ['Less detailed, longer horizon, and more of it from outside the business', 'More detailed, longer horizon, and more of it from inside the business', 'Less detailed, shorter horizon, and more of it from inside the business', 'More detailed, shorter horizon, and more of it from outside the business'],
      ans: 0,
      exp: 'Strategic decisions are about years and about the world outside, so they need summary and external content. Operational decisions are about today and about this business, so they need detail and internal exactness. Getting this backwards produces board packs full of invoice lines.' },
    { id: 'B-1-25', unitKey: 'buaw', lo: 1, criteria: ['BUAW-1.4.4'], type: 'picklist',
      q: 'Match each business function to what the finance function most directly provides it.',
      picklist: {
        rowHeader: 'Function',
        choiceHeader: 'What finance provides',
        options: ['Cost per delivery and the case for a new depot', 'Margin analysis by customer, and credit limits', 'The cost of a proposed pay award', 'The business case for a new system'],
        rows: [
        { text: 'Distribution and logistics', answer: 0 },
        { text: 'Sales and marketing', answer: 1 },
        { text: 'Human resources', answer: 2 },
        { text: 'Information technology', answer: 3 },
        ],
      },
      exp: 'The pattern is the same each time: finance turns another function’s plan into money and money back into a decision. A finance function producing only statutory accounts is doing a fraction of what the specification describes.' },
    { id: 'B-1-26', unitKey: 'buaw', lo: 1, criteria: ['BUAW-1.4.5'], type: 'mcq',
      q: 'What distinguishes risk from uncertainty?',
      opts: ['With risk the possible outcomes are known and probabilities can be estimated', 'Risk is always financial, while uncertainty is operational', 'Risk can be insured and uncertainty can be avoided', 'Risk affects the business and uncertainty affects its stakeholders'],
      ans: 0,
      exp: 'The distinction is measurability. If a probability can be attached, it is risk and can be priced, insured and modelled. If it cannot — how a new competitor will price next year — it is uncertainty, and techniques that assume probabilities do not apply to it.' },
    { id: 'B-1-27', unitKey: 'buaw', lo: 1, criteria: ['BUAW-1.4.5'], type: 'picklist',
      q: 'Classify each risk.',
      picklist: {
        rowHeader: 'Risk',
        choiceHeader: 'Type',
        options: ['Business risk', 'Financial risk', 'Strategic risk', 'Operational risk'],
        rows: [
        { text: 'Interest rates rise on a large variable-rate loan', answer: 1 },
        { text: 'A fire destroys the only warehouse', answer: 3 },
        { text: 'Demand for the whole product category declines', answer: 0 },
        { text: 'A rival’s new platform will make the main service redundant in four years', answer: 2 },
        ],
      },
      exp: 'Financial risk arises from how the business is funded and manages money. Operational risk is internal processes, people and systems failing — including fire, cyberattack and reputational damage. Business risk is inherent in the trade. Strategic risk threatens the long-term direction.' },
    { id: 'B-1-28', unitKey: 'buaw', lo: 1, criteria: ['BUAW-1.4.5'], type: 'mcq',
      q: 'A business decides to stop trading in a country where payment cannot be secured. Which risk response is this?',
      opts: ['Avoid', 'Reduce', 'Transfer', 'Accept'],
      ans: 0,
      exp: 'Ceasing the activity removes the exposure entirely, which is avoidance. Reducing would mean tighter credit checks or advance payment; transferring would mean credit insurance; accepting would mean trading on and carrying the losses knowingly.' },
    { id: 'B-1-29', unitKey: 'buaw', lo: 1, criteria: ['BUAW-1.4.5'], type: 'truefalse',
      q: 'Decide whether each statement about risk management is true.',
      statements: [
        { text: 'Insuring a risk removes it entirely from the business.', answer: false },
        { text: 'Accepting a risk should be a documented decision.', answer: true },
        { text: 'Cyber risk is treated as a form of operational risk.', answer: true },
      ],
      exp: 'Insurance transfers the financial consequence; it does not restore lost customers or a damaged reputation. Acceptance that nobody wrote down is not acceptance — it is an oversight that will surface as a surprise. The specification places cyber and reputational risk under operational risk.' },
    { id: 'B-1-30', unitKey: 'buaw', lo: 1, criteria: ['BUAW-1.1.1', 'BUAW-1.1.2'], type: 'mcq',
      q: 'A sole trader’s business fails owing £60,000. What is the position of the owner?',
      opts: ['Personally liable for the whole amount, with personal assets at risk', 'Liable only up to the capital originally introduced', 'Liable only for the business’s remaining assets', 'Not liable, because the debts belong to the business'],
      ans: 0,
      exp: 'A sole trader and the business are the same legal person, so there is no boundary between business debts and personal assets. The three wrong answers all assume a separation that only incorporation creates.' },
    /* ── Outcome 2 · External and internal environment ───────────────────── */
    { id: 'B-2-01', unitKey: 'buaw', lo: 2, criteria: ['BUAW-2.1.1'], type: 'mcq',
      q: 'What is PESTLE used to analyse?',
      opts: ['The macro environment the business cannot control', 'The internal strengths and weaknesses of the business', 'The competitive position of a single product', 'The financial performance of the business over time'],
      ans: 0,
      exp: 'PESTLE is a checklist for the forces acting on every business in a market, which no single business can change. Internal strengths, product position and financial performance are all analysed by other means.' },
    { id: 'B-2-02', unitKey: 'buaw', lo: 2, criteria: ['BUAW-2.1.2'], type: 'mcq',
      q: 'A company sells almost entirely to local authorities. A government spending review cuts council budgets by 8%. Which PESTLE factor is this?',
      opts: ['Political', 'Economic', 'Legal', 'Social'],
      ans: 0,
      exp: 'Public spending is a policy choice made by government, which makes it political. It is easy to call it economic because it affects revenue — but the test is what caused it, and the cause here is a political decision rather than a movement in the economy.' },
    { id: 'B-2-03', unitKey: 'buaw', lo: 2, criteria: ['BUAW-2.1.3'], type: 'mcq',
      q: 'Sterling strengthens sharply. Which business benefits most directly?',
      opts: ['An importer of Italian tiles selling in the UK', 'An exporter of machinery to Germany', 'A UK retailer buying and selling entirely in the UK', 'A UK hotel serving overseas visitors'],
      ans: 0,
      exp: 'A stronger pound buys more foreign currency, so imports become cheaper. The exporter and the hotel both become more expensive to overseas buyers, and the purely domestic retailer is largely unaffected.' },
    { id: 'B-2-04', unitKey: 'buaw', lo: 2, criteria: ['BUAW-2.1.3'], type: 'mcq',
      q: 'Energy and wage costs rise sharply while consumer demand is falling. What is this?',
      opts: ['Cost-push inflation', 'Demand-pull inflation', 'A movement along the demand curve', 'Deflation'],
      ans: 0,
      exp: 'Prices are rising because supplying has become more expensive, not because buyers are competing for scarce goods — that is cost-push. It is the hard case for a business, because costs rise at exactly the moment there is no demand to pass them on to.' },
    { id: 'B-2-05', unitKey: 'buaw', lo: 2, criteria: ['BUAW-2.1.3'], type: 'truefalse',
      q: 'Decide whether each statement about interest rate rises is true.',
      statements: [
        { text: 'They increase the cost of servicing variable-rate borrowing.', answer: true },
        { text: 'They tend to increase consumer spending on deferrable purchases.', answer: false },
        { text: 'They can make businesses defer investment decisions.', answer: true },
      ],
      exp: 'Higher rates raise the cost of debt directly. They reduce spending, particularly on things buyers can put off, because mortgage and credit costs take a larger share of income. And they raise the return an investment must clear to be worthwhile, so projects are deferred.' },
    { id: 'B-2-06', unitKey: 'buaw', lo: 2, criteria: ['BUAW-2.1.4'], type: 'mcq',
      q: 'The proportion of the local population aged over 70 rises steadily over a decade. Which factor is this, and what should a retailer take from it?',
      opts: ['Social — it should shape what is stocked and how buyers are reached', 'Economic — an older population has less disposable income to spend', 'Political — the government will respond by changing pension policy', 'Environmental — an ageing population consumes fewer resources'],
      ans: 0,
      exp: 'Demographic change is a social factor. The reason it matters is that it is slow and predictable, so ignoring it is a choice: what people want and how they prefer to buy it both shift, and a retailer has years of warning.' },
    { id: 'B-2-07', unitKey: 'buaw', lo: 2, criteria: ['BUAW-2.1.5'], type: 'mcq',
      q: 'Which best describes the impact of a technological factor on an organisation’s structure?',
      opts: ['Automating a process removes both the doers and their supervisors', 'The business will need to purchase new equipment and software', 'Technology changes quickly and is hard for a business to predict', 'Staff will require training before they can use the new system'],
      ans: 0,
      exp: 'The specification asks for the impact on structure specifically. Equipment and training are costs of the change; the structural point is that a layer of the organisation chart disappears and the remaining work moves to a different skill set.' },
    { id: 'B-2-08', unitKey: 'buaw', lo: 2, criteria: ['BUAW-2.1.6'], type: 'picklist',
      q: 'Classify each as a political or a legal factor.',
      picklist: {
        rowHeader: 'Factor',
        choiceHeader: 'PESTLE letter',
        options: ['Political', 'Legal'],
        rows: [
        { text: 'The government announces a rise in corporation tax in the Budget', answer: 0 },
        { text: 'A change in consumer law extends the period for returning goods', answer: 1 },
        { text: 'New regulations require every employer to report its gender pay gap', answer: 1 },
        { text: 'A minister announces increased spending on rail infrastructure', answer: 0 },
        ],
      },
      exp: 'The test is whether it is a policy choice or a rule that must be obeyed. Tax announcements and spending decisions are political; regulations and statutes that impose obligations are legal. The two overlap because policy becomes law, and the exam distinguishes them by which stage the scenario is describing.' },
    { id: 'B-2-09', unitKey: 'buaw', lo: 2, criteria: ['BUAW-2.1.7'], type: 'mcq',
      q: 'A food producer’s harvests are increasingly disrupted by unusual weather. Under PESTLE this is:',
      opts: ['Environmental', 'Economic', 'Social', 'Technological'],
      ans: 0,
      exp: 'Changes in the natural world are environmental factors, and this one has direct commercial consequences: supply becomes unpredictable, insurance costs rise, and sourcing has to be diversified.' },
    { id: 'B-2-10', unitKey: 'buaw', lo: 2, criteria: ['BUAW-2.1.8', 'BUAW-2.1.9'], type: 'mcq',
      q: 'Which answer best "recognises the impact" of a PESTLE factor, as opposed to identifying it?',
      opts: ['Rising rates raise Marlow’s overdraft cost and cut demand at once', 'Rising interest rates are an economic factor within the PESTLE model', 'Economic factors include interest and exchange rates, and inflation', 'Marlow should monitor movements in interest rates carefully'],
      ans: 0,
      exp: 'Identification is naming the factor; impact is saying what it does to this business and in which direction. Only the first does that, and it earns extra credit by noticing that the two effects compound rather than offset.' },
    { id: 'B-2-11', unitKey: 'buaw', lo: 2, criteria: ['BUAW-2.2.1'], type: 'mcq',
      q: 'At a price above the equilibrium, what happens in a market?',
      opts: ['Supply exceeds demand, producing a surplus that pushes the price down', 'Demand exceeds supply, producing a shortage that pushes the price up', 'Supply and demand are equal and the price is stable', 'Producers leave the market immediately'],
      ans: 0,
      exp: 'Above equilibrium, more is offered than is wanted. The unsold surplus is what forces the price back down; below equilibrium the shortage forces it up. The equilibrium is simply the price at which neither pressure exists.' },
    { id: 'B-2-12', unitKey: 'buaw', lo: 2, criteria: ['BUAW-2.2.2'], type: 'picklist',
      q: 'For each event in the market for bicycles, say what happens.',
      picklist: {
        rowHeader: 'Event',
        choiceHeader: 'Effect',
        options: ['Movement along the demand curve', 'Shift of the demand curve', 'Shift of the supply curve'],
        rows: [
        { text: 'A retailer runs a 20% off promotion', answer: 0 },
        { text: 'Fuel prices rise sharply, making commuting by car expensive', answer: 1 },
        { text: 'The cost of imported frames falls', answer: 2 },
        { text: 'A new government cycling subsidy is announced', answer: 1 },
        ],
      },
      exp: 'If the cause is the price of the good itself, buyers move along the curve. If the cause is anything else — the price of a substitute, a subsidy, incomes, tastes — the demand curve shifts. A change in input costs shifts supply, because producers’ willingness at each price has changed.' },
    { id: 'B-2-13', unitKey: 'buaw', lo: 2, criteria: ['BUAW-2.2.2'], type: 'picklist',
      q: 'Classify each pair of goods.',
      picklist: {
        rowHeader: 'Pair',
        choiceHeader: 'Relationship',
        options: ['Substitutes', 'Complements'],
        rows: [
        { text: 'Printers and ink cartridges', answer: 1 },
        { text: 'Butter and margarine', answer: 0 },
        { text: 'Cinema tickets and streaming subscriptions', answer: 0 },
        { text: 'Cars and petrol', answer: 1 },
        ],
      },
      exp: 'The test is what happens to demand for B when the price of A rises. If people buy more B they are substitutes; if they buy less B they are complements, because the two are used together and one becoming dearer reduces use of both.' },
    { id: 'B-2-14', unitKey: 'buaw', lo: 2, criteria: ['BUAW-2.2.2'], type: 'mcq',
      q: 'Demand for bread barely changes when its price rises 15%. What kind of good is it?',
      opts: ['A necessity', 'A substitute', 'A complementary good', 'An inferior good'],
      ans: 0,
      exp: 'A necessity is bought whatever the price within reason, so demand moves little. That is why a price cut on a necessity reduces revenue: volume does not rise enough to make up for the price given away.' },
    { id: 'B-2-15', unitKey: 'buaw', lo: 2, criteria: ['BUAW-2.2.3'], type: 'numeric',
      q: 'A business sells 1,500 units a month at £40. It raises the price to £44 and volume falls to 1,300. What is the new monthly revenue, in £?',
      answer: 57200,
      tolerance: 0,
      exp: '1,300 × £44 = £57,200, against £60,000 before. The 10% price rise cost 13% of the volume, so revenue fell by £2,800 — a rise in price does not automatically raise revenue.' },
    { id: 'B-2-16', unitKey: 'buaw', lo: 2, criteria: ['BUAW-2.2.3'], type: 'numeric',
      q: 'A café sells 900 lunches a week at £8.50. Cutting the price to £7.50 raises volume to 1,120. By how much does weekly revenue change, in £? Enter a negative number if it falls.',
      answer: 750,
      tolerance: 0,
      exp: 'Before: 900 × £8.50 = £7,650. After: 1,120 × £7.50 = £8,400. Revenue rises by £750. Note this says nothing about profit: 220 extra lunches carry 220 lots of variable cost.' },
    { id: 'B-2-17', unitKey: 'buaw', lo: 2, criteria: ['BUAW-2.2.3'], type: 'mcq',
      q: 'A price cut raises revenue. What can be concluded about profit?',
      opts: ['Nothing yet — extra volume brings extra variable cost, perhaps a step', 'Profit must have risen along with the revenue it produced', 'Profit must have fallen along with the price that was cut', 'Profit is unchanged, the volume having compensated exactly'],
      ans: 0,
      exp: 'Revenue and profit are different questions. Selling more units means incurring their variable costs, and enough extra volume can trigger another vehicle, shift or supervisor. The figure that answers the profit question is contribution, not revenue.' },
    { id: 'B-2-18', unitKey: 'buaw', lo: 2, criteria: ['BUAW-2.2.4'], type: 'picklist',
      q: 'For each market feature, say whether it makes competition stronger or weaker.',
      picklist: {
        rowHeader: 'Feature',
        choiceHeader: 'Effect on competition',
        options: ['Stronger', 'Weaker'],
        rows: [
        { text: 'Buyers can compare every seller’s price instantly online', answer: 0 },
        { text: 'Setting up requires £4m of specialist equipment', answer: 1 },
        { text: 'Operating requires a licence that is rarely granted', answer: 1 },
        { text: 'The products are near-identical across all sellers', answer: 0 },
        ],
      },
      exp: 'Information and product similarity make it easy for buyers to switch, which sharpens competition. Licences and heavy set-up costs are barriers to entry, which protect whoever is already in the market — and that protection is what allows a margin to persist.' },
    { id: 'B-2-19', unitKey: 'buaw', lo: 2, criteria: ['BUAW-2.2.4'], type: 'mcq',
      q: 'Why do barriers to entry matter to a business earning good margins?',
      opts: ['Without them the margin advertises the opportunity to entrants', 'They reduce the business’s own costs of production', 'They allow the business to raise its prices without any limit', 'They remove the need to differentiate the product'],
      ans: 0,
      exp: 'A profitable market with no barriers attracts entrants, and entry drives the margin down. Barriers are what allow a good return to persist. They do not reduce costs, and they do not remove the discipline of what customers will pay.' },
    { id: 'B-2-20', unitKey: 'buaw', lo: 2, criteria: ['BUAW-2.3.1', 'BUAW-2.3.2'], type: 'mcq',
      q: 'Which is the best statement of what sustainability means?',
      opts: ['Meeting present needs without compromising future generations', 'Reducing the environmental impact of the business as far as it can', 'Maintaining the profitability of the business over the long term', 'Complying with the environmental regulations that apply'],
      ans: 0,
      exp: 'That is the definition the specification uses, and it is deliberately wider than the environment: sustainability has social, environmental AND economic aspects. Reducing impact and staying profitable are each one aspect; compliance is a floor rather than a definition.' },
    { id: 'B-2-21', unitKey: 'buaw', lo: 2, criteria: ['BUAW-2.3.2'], type: 'picklist',
      q: 'Which aspect of sustainable performance does each action serve most directly?',
      picklist: {
        rowHeader: 'Action',
        choiceHeader: 'Aspect',
        options: ['Social', 'Ecological / environmental', 'Economic / financial'],
        rows: [
        { text: 'Paying a living wage across the supply chain', answer: 0 },
        { text: 'Cutting packaging waste by 40%', answer: 1 },
        { text: 'Building reserves so the organisation survives a downturn', answer: 2 },
        { text: 'Improving safety conditions at supplier factories', answer: 0 },
        ],
      },
      exp: 'All three aspects have to hold. The economic one is the one readers forget: an organisation that runs out of money helps nobody, so financial viability is part of sustainability rather than something opposed to it.' },
    { id: 'B-2-22', unitKey: 'buaw', lo: 2, criteria: ['BUAW-2.3.3'], type: 'mcq',
      q: 'What does the accountant’s public interest duty require in relation to sustainability?',
      opts: ['To protect society as a whole, and the organisation’s sustainability', 'To prepare an environmental report for publication each year', 'To refuse to work for any business with an environmental impact', 'To follow the employer’s instructions on sustainability matters'],
      ans: 0,
      exp: 'The specification states the duty in those terms, and it is what makes accountancy a profession rather than a trade: the duty runs beyond the employer or client. It does not prescribe a report, and it certainly does not reduce to doing as instructed.' },
    { id: 'B-2-23', unitKey: 'buaw', lo: 2, criteria: ['BUAW-2.3.3'], type: 'truefalse',
      q: 'Decide whether each statement about sustainable operation is true.',
      statements: [
        { text: 'Sustainability should extend into the supply chain, not stop at the organisation’s own boundary.', answer: true },
        { text: 'A short-term view is compatible with sustainable management of resources.', answer: false },
        { text: 'Wider stakeholders’ needs are part of what sustainability asks an organisation to consider.', answer: true },
      ],
      exp: 'The specification lists the supply chain explicitly, along with products, customers, employees, the workplace and business processes. Taking a long-term view is the first principle it names, and considering wider stakeholders the second.' },
    { id: 'B-2-24', unitKey: 'buaw', lo: 2, criteria: ['BUAW-2.1.2', 'BUAW-2.1.3'], type: 'mcq',
      q: 'A UK manufacturer imports 60% of its materials and exports 70% of its output. Sterling weakens. What is the net effect?',
      opts: ['Mixed — import costs rise, but exports become more competitive', 'Wholly adverse, materials having become dearer', 'Wholly favourable, exports having become more competitive', 'Neutral, the two effects cancelling exactly'],
      ans: 0,
      exp: 'Both effects are real and they pull in opposite directions, so the answer depends on the relative sizes and the margins involved. What a weak answer does is notice only the half it thought of first; what an exact "they cancel" answer does is assert a coincidence.' },
    /* ── Outcome 3 · Professional ethics ─────────────────────────────────── */
    { id: 'B-3-01', unitKey: 'buaw', lo: 3, criteria: ['BUAW-3.1.1'], type: 'mcq',
      q: 'An accountant knows a colleague’s cash flow forecast is materially over-optimistic. He says nothing when it goes to the bank. Which principle has he breached?',
      opts: ['Integrity', 'Confidentiality', 'Professional competence and due care', 'Objectivity'],
      ans: 0,
      exp: 'Integrity is breached by being knowingly associated with misleading information, and that includes by omission and by silence. He did not write the forecast, but he let it go to a lender knowing what it was.' },
    { id: 'B-3-02', unitKey: 'buaw', lo: 3, criteria: ['BUAW-3.1.1'], type: 'truefalse',
      q: 'Decide whether each statement about integrity is true.',
      statements: [
        { text: 'Integrity can be breached by omission as well as by statement.', answer: true },
        { text: 'Integrity is threatened by self-interest and familiarity threats.', answer: true },
        { text: 'Integrity concerns independence of judgement rather than honesty.', answer: false },
      ],
      exp: 'Integrity is the honesty principle: being straightforward, and not being associated with misleading information whether by writing it or by letting it stand. Independence of judgement is objectivity — the two are commonly swapped.' },
    { id: 'B-3-03', unitKey: 'buaw', lo: 3, criteria: ['BUAW-3.1.2'], type: 'mcq',
      q: 'Why is it not enough for an accountant to be objective in fact?',
      opts: ['Readers cannot see inside her head and can only judge by the circumstances', 'Objectivity is impossible to achieve in practice', 'The code requires disclosure of every interest held', 'Appearing objective is a legal requirement rather than an ethical one'],
      ans: 0,
      exp: 'The specification asks for the importance of appearing objective as well as being objective. Anyone assessing the work sees the circumstances, not the intention — which is why an incentive tied to the reported figure compromises objectivity regardless of whether it actually swayed anyone.' },
    { id: 'B-3-04', unitKey: 'buaw', lo: 3, criteria: ['BUAW-3.1.3'], type: 'mcq',
      q: 'An arrangement is legal but would embarrass the profession if it became public. What does professional behaviour require?',
      opts: ['That the accountant does not proceed, because legality is a minimum rather than a standard', 'That the accountant proceeds, since nothing unlawful is involved', 'That the accountant proceeds if the client consents in writing', 'That the accountant seeks a legal opinion and then proceeds'],
      ans: 0,
      exp: 'The specification says directly that compliance with law is a minimum requirement and that an act permitted by law is not necessarily ethical. Bringing the profession into disrepute is itself a disciplinary matter, and a legal opinion answers a different question.' },
    { id: 'B-3-05', unitKey: 'buaw', lo: 3, criteria: ['BUAW-3.1.4'], type: 'mcq',
      q: 'What supports the principle of professional competence and due care?',
      opts: ['Keeping knowledge current, and declining work beyond your ability', 'Holding professional indemnity insurance at all times', 'Keeping client information confidential during and after', 'Declaring any interest held in a proposed transaction'],
      ans: 0,
      exp: 'Competence is maintained by keeping knowledge current and by not taking on what you cannot do. Insurance meets a claim after the failure; confidentiality and declaring interests serve other principles entirely.' },
    { id: 'B-3-06', unitKey: 'buaw', lo: 3, criteria: ['BUAW-3.1.5', 'BUAW-3.1.15'], type: 'picklist',
      q: 'For each situation, decide the accountant’s position on disclosure.',
      picklist: {
        rowHeader: 'Situation',
        choiceHeader: 'Position',
        options: ['Must disclose', 'May disclose', 'Must not disclose'],
        rows: [
        { text: 'A court order requires production of the client’s records', answer: 0 },
        { text: 'The client authorises disclosure to its new bank', answer: 1 },
        { text: 'A friend asks what the client is planning', answer: 2 },
        { text: 'A suspicion of money laundering arises in the course of the work', answer: 0 },
        ],
      },
      exp: 'Disclosure is required where the law requires it, permitted where authorised or where a professional duty allows it, and forbidden everywhere else — including after the engagement ends. A money laundering suspicion is a required disclosure, not an optional one.' },
    { id: 'B-3-07', unitKey: 'buaw', lo: 3, criteria: ['BUAW-3.1.5'], type: 'truefalse',
      q: 'Decide whether each statement about confidentiality is true.',
      statements: [
        { text: 'The duty ends when the accountant leaves the employer.', answer: false },
        { text: 'Information learned at work may not be used for the accountant’s own advantage.', answer: true },
        { text: 'Confidentiality obligations interact with data protection law.', answer: true },
      ],
      exp: 'The duty survives the relationship — a former employer’s information is still confidential. Using it for personal advantage is a breach even where nothing is disclosed to anybody. And where the information is personal data, the two regimes apply together.' },
    { id: 'B-3-08', unitKey: 'buaw', lo: 3, criteria: ['BUAW-3.1.6', 'BUAW-3.1.16'], type: 'mcq',
      q: 'A supplier nobody in the finance team recognises invoices a round £24,000 for "consultancy", approved by one director. What does professional scepticism require?',
      opts: ['Asking for evidence of what was supplied before the invoice is processed', 'Processing it, since a director has approved it', 'Processing it and raising it at the next audit', 'Refusing to process it and reporting the director'],
      ans: 0,
      exp: 'Scepticism is assessing information critically and being alert to possible misstatement due to error or fraud. Several things here do not fit — the unknown supplier, the round figure, the vague description, the single approval — so the response is to ask, not to assume and not yet to accuse.' },
    { id: 'B-3-09', unitKey: 'buaw', lo: 3, criteria: ['BUAW-3.1.7'], type: 'mcq',
      q: 'What is the principal advantage of a principles-based ethical code over a rules-based one?',
      opts: ['It covers situations nobody anticipated when the code was written', 'It is easier to test compliance with, case by case', 'It removes the need for professional judgement altogether', 'It provides certainty about exactly what conduct is permitted'],
      ans: 0,
      exp: 'Certainty and testability are what a rules-based code buys, and it pays for them by being silent about anything not listed — which invites "it does not say I cannot". A principles-based code requires judgement, which is the cost, and cannot be complied with to the letter by someone acting badly, which is the benefit.' },
    { id: 'B-3-10', unitKey: 'buaw', lo: 3, criteria: ['BUAW-3.1.8', 'BUAW-3.1.9'], type: 'mcq',
      q: 'A firm introduces a written policy setting a value limit on gifts and requiring them to be recorded in a register. What is this?',
      opts: ['A safeguard that prevents the threat from arising', 'A safeguard applied after a threat has arisen', 'A statutory requirement on all firms', 'An integrity control over accounting data'],
      ans: 0,
      exp: 'The specification asks specifically how documented organisational policies prevent threats and ethical conflicts from arising. Setting the limit in advance means nobody has to judge in the moment whether a particular gift is acceptable.' },
    { id: 'B-3-11', unitKey: 'buaw', lo: 3, criteria: ['BUAW-3.1.10'], type: 'mcq',
      q: 'A threat has been identified, safeguards applied, and it remains unacceptable. What must the accountant do?',
      opts: ['Decline or withdraw from the engagement, or ultimately resign', 'Record the threat in the working papers and continue', 'Reduce the fee to reflect the risk', 'Ask the client to confirm they are content'],
      ans: 0,
      exp: 'This is the answer the code requires and the one readers avoid. Documenting evidences what was done and changes nothing; a lower fee is irrelevant; and a client’s consent cannot make an unacceptable threat acceptable, because the duty is not owed only to the client.' },
    { id: 'B-3-12', unitKey: 'buaw', lo: 3, criteria: ['BUAW-3.1.11', 'BUAW-3.1.12'], type: 'picklist',
      q: 'Identify the threat in each case.',
      picklist: {
        rowHeader: 'Situation',
        choiceHeader: 'Threat',
        options: ['Self-interest', 'Self-review', 'Advocacy', 'Familiarity', 'Intimidation'],
        rows: [
        { text: 'The accountant holds shares in the client whose accounts he is preparing', answer: 0 },
        { text: 'The accountant is asked to review the valuation model she built last year', answer: 1 },
        { text: 'The finance director says the accountant’s contract will not be renewed unless a figure changes', answer: 4 },
        { text: 'The accountant and the client’s owner have holidayed together for a decade', answer: 3 },
        ],
      },
      exp: 'Ask what the accountant would lose by being right. Money or position is self-interest; having to admit an earlier error is self-review; a relationship is familiarity; a threat is intimidation. Advocacy is the odd one out — it is losing objectivity by promoting a position.' },
    { id: 'B-3-13', unitKey: 'buaw', lo: 3, criteria: ['BUAW-3.1.13', 'BUAW-3.1.14'], type: 'mcq',
      q: 'An accountant has not undertaken any CPD for three years and is asked to advise on a new reporting standard. What is the position?',
      opts: ['A competence threat — she should not advise until she is current', 'No issue, as she is a qualified and experienced accountant', 'A confidentiality threat, the standard being newly published', 'An advocacy threat, since she would be promoting a position'],
      ans: 0,
      exp: 'Competence is not a qualification held once; it is current knowledge, maintained. The specification asks for recognition of areas where up-to-date technical knowledge is critical and what follows from not maintaining CPD — and a new reporting standard is exactly such an area.' },
    { id: 'B-3-14', unitKey: 'buaw', lo: 3, criteria: ['BUAW-3.1.17'], type: 'picklist',
      q: 'Match each threat to the safeguard that most directly addresses it.',
      picklist: {
        rowHeader: 'Threat',
        choiceHeader: 'Safeguard',
        options: ['Rotate who works on the assignment', 'Have a second person review the work', 'Declare the interest and stand aside', 'Consult the professional body’s ethics helpline'],
        rows: [
        { text: 'Familiarity from a long-standing client relationship', answer: 0 },
        { text: 'Self-review of work the accountant prepared', answer: 1 },
        { text: 'A financial interest in the outcome', answer: 2 },
        { text: 'A situation where the right course of action is genuinely unclear', answer: 3 },
        ],
      },
      exp: 'The safeguard has to act on the mechanism of the threat. Rotation breaks a relationship that has become too comfortable; independent review supplies the judgement the preparer cannot bring to their own work; standing aside removes the interest; and the helpline exists for the cases where none of the above obviously applies.' },
    { id: 'B-3-15', unitKey: 'buaw', lo: 3, criteria: ['BUAW-3.2.1', 'BUAW-3.2.2'], type: 'mcq',
      q: 'Which question is the most useful practical test of whether behaviour is ethical?',
      opts: ['Would you be comfortable explaining this in public?', 'Is there a rule that expressly forbids doing it?', 'Has anyone objected to it so far this year?', 'Is it common practice elsewhere in the industry?'],
      ans: 0,
      exp: 'Behaviour that cannot be explained to a regulator, a journalist or the person it affects is usually the behaviour in question. The other three are the reasoning that gets people into difficulty: no express rule, no complaint yet, and everybody does it.' },
    { id: 'B-3-16', unitKey: 'buaw', lo: 3, criteria: ['BUAW-3.2.3'], type: 'picklist',
      q: 'Classify each practice as consistent or inconsistent with sound organisational values.',
      picklist: {
        rowHeader: 'Practice',
        choiceHeader: 'Assessment',
        options: ['Consistent', 'Inconsistent'],
        rows: [
        { text: 'Publishing clear terms with no hidden charges', answer: 0 },
        { text: 'Posting about a client’s difficulties on social media', answer: 1 },
        { text: 'Using size to impose 120-day terms on a small supplier', answer: 1 },
        { text: 'Recording all gifts received in a register', answer: 0 },
        ],
      },
      exp: 'The specification names transparency with customers and suppliers, paying suppliers fairly and on time, a considered position on gifts and hospitality, and the use of social media. The last is a confidentiality breach as well as a values failure.' },
    { id: 'B-3-17', unitKey: 'buaw', lo: 3, criteria: ['BUAW-3.2.4'], type: 'mcq',
      q: 'What is the correct first step when an ethical conflict arises at work?',
      opts: ['Establish the facts, then raise it internally above the manager', 'Report it externally to the relevant professional regulator', 'Resign at once, to avoid being associated with it', 'Take no action until the year end audit raises it'],
      ans: 0,
      exp: 'The process escalates from inside outwards: facts first, then internally, then confidential advice, then — with advice — external disclosure, and only ultimately resignation. Going straight outside skips steps that might resolve it and can forfeit protection.' },
    { id: 'B-3-18', unitKey: 'buaw', lo: 3, criteria: ['BUAW-3.2.5'], type: 'truefalse',
      q: 'Decide whether each statement about the consequences of unethical conduct is true.',
      statements: [
        { text: 'A professional body may exclude a member for misconduct.', answer: true },
        { text: 'An employer may take internal disciplinary action for the same conduct.', answer: true },
        { text: 'Disciplinary action requires that a criminal offence has been committed.', answer: false },
      ],
      exp: 'The two routes run in parallel and are independent of each other. Neither depends on a crime having been committed: the professional body’s standard is misconduct, and the employer’s is the contract of employment.' },
    { id: 'B-3-19', unitKey: 'buaw', lo: 3, criteria: ['BUAW-3.2.6', 'BUAW-3.2.7'], type: 'mcq',
      q: 'A client suffers loss because an accountant applied a rule he had not kept up with. What is the likely legal consequence, and what meets it?',
      opts: ['A negligence or breach of contract claim, met by indemnity cover', 'A criminal prosecution, defended by the professional body', 'A money laundering report, handled by the nominated officer', 'A data protection penalty, met by the employer instead'],
      ans: 0,
      exp: 'The specification draws the link directly between a failure of professional competence and due care and claims for breach of contract and professional negligence — and requires professional indemnity insurance because such claims are foreseeable.' },
    { id: 'B-3-20', unitKey: 'buaw', lo: 3, criteria: ['BUAW-3.2.8'], type: 'mcq',
      q: 'Before making an external disclosure in the public interest, what should an accountant do?',
      opts: ['Seek third-party advice, since the statutory protection is conditional', 'Notify the employer of the intention to disclose externally', 'Resign first, to avoid an apparent conflict of interest', 'Publish the concern at once so that it cannot be suppressed'],
      ans: 0,
      exp: 'Public interest disclosure protection depends on what was disclosed, to whom, and whether it was genuinely in the public interest. That is precisely why the specification says to take third-party advice before disclosing externally, rather than afterwards.' },
    { id: 'B-3-21', unitKey: 'buaw', lo: 3, criteria: ['BUAW-3.2.8'], type: 'truefalse',
      q: 'Decide whether each statement about reporting unethical behaviour is true.',
      statements: [
        { text: 'Where a formal internal whistle-blowing procedure exists, it should be used.', answer: true },
        { text: 'Confidential advice can be sought from a professional helpline.', answer: true },
        { text: 'Statutory protection covers any external disclosure about an employer.', answer: false },
      ],
      exp: 'Internal routes come first and exist to be used. Advice through a proper channel does not breach confidentiality. Protection, though, is conditional — it is not a blanket licence to disclose anything about an employer to anyone.' },
    { id: 'B-3-22', unitKey: 'buaw', lo: 3, criteria: ['BUAW-3.3.1'], type: 'picklist',
      q: 'Match each act to the stage of money laundering.',
      picklist: {
        rowHeader: 'Act',
        choiceHeader: 'Stage',
        options: ['Placement', 'Layering', 'Integration'],
        rows: [
        { text: 'Criminal cash is paid into a series of small bank deposits', answer: 0 },
        { text: 'Funds pass through five companies in three jurisdictions', answer: 1 },
        { text: 'A holiday let is bought and rented out commercially', answer: 2 },
        ],
      },
      exp: 'Get it in, move it around, bring it out clean. Placement is the riskiest stage for the launderer, which is why it uses cash businesses and small deposits; integration is the point at which the money has an explanation.' },
    { id: 'B-3-23', unitKey: 'buaw', lo: 3, criteria: ['BUAW-3.3.1'], type: 'mcq',
      q: 'An accountant tells a client that a suspicious activity report has been made about them. What offence is this?',
      opts: ['Tipping off', 'Failure to disclose', 'Prejudicing an investigation', 'Breach of confidentiality only'],
      ans: 0,
      exp: 'Tipping off is telling the suspect, or anyone else, that a report has been made or an investigation is under way. It is a distinct offence, and it is often committed by an accountant who believed they were being straight with a client.' },
    { id: 'B-3-24', unitKey: 'buaw', lo: 3, criteria: ['BUAW-3.3.1'], type: 'mcq',
      q: 'What protection does an accountant get from making a protected disclosure?',
      opts: ['Protection from a breach of confidentiality claim over it', 'Immunity from professional disciplinary action of any kind', 'A guarantee of continued employment afterwards', 'Exemption from anti-money-laundering supervision thereafter'],
      ans: 0,
      exp: 'The disclosure regime exists because the duty to report would otherwise collide with the duty of confidentiality. It resolves that collision and does nothing else — it is not a general immunity, and it is not job protection.' },
    { id: 'B-3-25', unitKey: 'buaw', lo: 3, criteria: ['BUAW-3.3.2'], type: 'mcq',
      q: 'Which of these should a suspicious activity report contain?',
      opts: ['Who is suspected, what is suspected, and on what information', 'A legal conclusion that money laundering has in fact occurred', 'The client’s own written explanation of the transactions', 'Confirmation that the client has been told of the report'],
      ans: 0,
      exp: 'The report sets out the suspicion and what it rests on — it is not a finding, and the accountant is not required to prove anything. Asking the client for an explanation risks tipping off, and telling them is an offence.' },
    { id: 'B-3-26', unitKey: 'buaw', lo: 3, criteria: ['BUAW-3.3.2'], type: 'truefalse',
      q: 'Decide whether each statement about money laundering reporting is true.',
      statements: [
        { text: 'Certainty is required before a report must be made.', answer: false },
        { text: 'A report should be made as soon as practicable after the suspicion arises.', answer: true },
        { text: 'Bookkeeping is an accountancy service for anti-money-laundering purposes.', answer: true },
      ],
      exp: 'Suspicion is the threshold — waiting for proof is itself failure to disclose. Timeliness matters because continuing to act while sitting on a suspicion can turn an omission into an offence. And the regime covers accountancy services generally, not only audit.' },
    /* ── Outcome 4 · New technologies and data security ──────────────────── */
    { id: 'B-4-01', unitKey: 'buaw', lo: 4, criteria: ['BUAW-4.1.1'], type: 'mcq',
      q: 'What is the defining characteristic of a blockchain?',
      opts: ['A shared record whose entries cannot be altered once written', 'A database held on a single secure server', 'A method of encrypting accounting data at rest', 'A system that codes transactions automatically'],
      ans: 0,
      exp: 'Distribution and immutability are the point: every participant holds the same record and nobody can quietly amend an earlier entry. A single server is the opposite of distributed, encryption is a different control, and automatic coding is machine learning.' },
    { id: 'B-4-02', unitKey: 'buaw', lo: 4, criteria: ['BUAW-4.1.1'], type: 'picklist',
      q: 'Match each technology to what it does in an accounting context.',
      picklist: {
        rowHeader: 'Technology',
        choiceHeader: 'What it does',
        options: ['Suggests codings by learning from past behaviour', 'Removes repetitive keying from routine processes', 'Tests whole populations rather than samples', 'Evidences approval without paper, with a timestamp'],
        rows: [
        { text: 'Machine learning', answer: 0 },
        { text: 'Automation of processes', answer: 1 },
        { text: 'Data analytics', answer: 2 },
        { text: 'Electronic signing', answer: 3 },
        ],
      },
      exp: 'They are easy to blur because they arrive together in the same software. Automation applies a rule; machine learning infers one; analytics interrogates the whole dataset; electronic signing solves an approval and evidence problem rather than a processing one.' },
    { id: 'B-4-03', unitKey: 'buaw', lo: 4, criteria: ['BUAW-4.1.3'], type: 'mcq',
      q: 'Automation takes over transaction coding in a finance team. What happens to the accountant’s responsibility for the coding?',
      opts: ['It remains with the accountant, who must review the result', 'It transfers to the software supplier that built it', 'It ends, no person having made the decision at all', 'It transfers to whoever configured the system originally'],
      ans: 0,
      exp: 'Automation moves the work, not the accountability. An accountant who accepts a machine’s coding without review has delegated a judgement they still own — which is why professional scepticism becomes more important as automation increases, not less.' },
    { id: 'B-4-04', unitKey: 'buaw', lo: 4, criteria: ['BUAW-4.1.3'], type: 'truefalse',
      q: 'Decide whether each statement about the changing role of the accountant is true.',
      statements: [
        { text: 'Less time is spent keying and reconciling.', answer: true },
        { text: 'More time is spent interpreting and advising.', answer: true },
        { text: 'Professional scepticism matters less once processes are automated.', answer: false },
      ],
      exp: 'The work moves up rather than disappearing. What automation cannot do is decide whether an answer is sensible — so the judgement that remains is exactly the part scepticism applies to.' },
    { id: 'B-4-05', unitKey: 'buaw', lo: 4, criteria: ['BUAW-4.1.2'], type: 'mcq',
      q: 'A business moves its bookkeeping to a team it employs directly in another country. This is:',
      opts: ['Offshoring but not outsourcing', 'Outsourcing but not offshoring', 'Both outsourcing and offshoring', 'Neither'],
      ans: 0,
      exp: 'Outsourcing is about WHO does the work — another organisation. Offshoring is about WHERE it is done. Employing the team directly means it is still in-house, so the work has moved location without changing hands.' },
    { id: 'B-4-06', unitKey: 'buaw', lo: 4, criteria: ['BUAW-4.1.2'], type: 'picklist',
      q: 'Classify each as a benefit or a risk of outsourcing a finance function.',
      picklist: {
        rowHeader: 'Consideration',
        choiceHeader: 'Benefit or risk',
        options: ['Benefit', 'Risk'],
        rows: [
        { text: 'Fixed salary cost becomes a variable contract price', answer: 0 },
        { text: 'Loss of direct control over how the work is done', answer: 1 },
        { text: 'Personal data is processed in another jurisdiction', answer: 1 },
        { text: 'Access to expertise the business does not have in-house', answer: 0 },
        ],
      },
      exp: 'The specification asks for the impact on cost structure, markets and locations; the risks are the other half of the answer. Data protection across a border and loss of direct control are the two that most often go unmentioned.' },
    { id: 'B-4-07', unitKey: 'buaw', lo: 4, criteria: ['BUAW-4.1.4'], type: 'picklist',
      q: 'Which of these are key features of cloud accounting?',
      picklist: {
        rowHeader: 'Feature',
        choiceHeader: 'Is it a key feature?',
        options: ['Yes', 'No'],
        rows: [
        { text: 'Data can be reached from any device with a connection', answer: 0 },
        { text: 'The business chooses the country its data is stored in', answer: 1 },
        { text: 'It works fully when the internet connection is unavailable', answer: 1 },
        { text: 'The provider stores the data, so the business runs no backups', answer: 0 },
        ],
      },
      exp: 'Access from anywhere, remote storage, automation, add-ins, stakeholder interaction and real-time data are the six features named. Working offline is precisely what cloud software cannot do. Nor does the customer generally choose where the data sits — that is one of the costs of remote storage rather than one of its features, and it matters most when personal data crosses a border.' },
    { id: 'B-4-08', unitKey: 'buaw', lo: 4, criteria: ['BUAW-4.1.5'], type: 'mcq',
      q: 'Which is a genuine limitation of cloud accounting rather than a benefit stated backwards?',
      opts: ['The business does not control where its data is physically stored', 'Software updates are applied automatically by the provider', 'The accountant can see the same records as the client', 'Costs are spread evenly across the year'],
      ans: 0,
      exp: 'Automatic updates, shared access and predictable cost are benefits. Losing control of where the data sits is a real cost of remote storage — and it becomes concrete the moment personal data crosses a border.' },
    { id: 'B-4-09', unitKey: 'buaw', lo: 4, criteria: ['BUAW-4.1.5'], type: 'mcq',
      q: 'A business needs software that fits an unusual process no package supports, and has budget and time. What suits it best?',
      opts: ['Bespoke software', 'Off-the-shelf cloud software', 'Off-the-shelf installed software', 'A spreadsheet'],
      ans: 0,
      exp: 'Bespoke software is written for one business, so it fits exactly. It costs more and takes longer, which is why it is only the right answer where the process genuinely cannot be served by a package — as here.' },
    { id: 'B-4-10', unitKey: 'buaw', lo: 4, criteria: ['BUAW-4.2.1'], type: 'picklist',
      q: 'Match each failure to the data protection principle breached.',
      picklist: {
        rowHeader: 'Failure',
        choiceHeader: 'Principle',
        options: ['Data minimisation', 'Storage limitation', 'Accountability', 'Lawfulness, fairness and transparency'],
        rows: [
        { text: 'A form collects information the business has no use for', answer: 0 },
        { text: 'Records are kept indefinitely with no review', answer: 1 },
        { text: 'The business complies in practice but has no policies or records to show it', answer: 2 },
        { text: 'Customers are not told what their data will be used for', answer: 3 },
        ],
      },
      exp: 'Accountability is the principle readers omit and the one that changes behaviour: it is not enough to comply, the organisation must be able to demonstrate compliance. The other three are about what is collected, how long it is kept, and whether people were told.' },
    { id: 'B-4-11', unitKey: 'buaw', lo: 4, criteria: ['BUAW-4.2.1'], type: 'mcq',
      q: 'Customer contact details collected to fulfil orders are later used for an unrelated marketing campaign. Which principle is breached?',
      opts: ['Purpose limitation', 'Data minimisation', 'Accuracy', 'Integrity and confidentiality'],
      ans: 0,
      exp: 'Data collected for one stated purpose may not be reused for an unrelated one. Minimisation is about collecting too much in the first place; accuracy about whether it is right; integrity and confidentiality about keeping it secure.' },
    { id: 'B-4-12', unitKey: 'buaw', lo: 4, criteria: ['BUAW-4.2.2'], type: 'mcq',
      q: 'What is usually the largest cost to a business of a serious data breach?',
      opts: ['Reputational damage and the customers lost as a result', 'The regulatory fine', 'The cost of the forensic investigation', 'The cost of replacing the affected hardware'],
      ans: 0,
      exp: 'Fines and investigation costs are large and finite; customers who leave and customers who never arrive are neither. That is why cyber risk is classified as reputational as well as operational.' },
    { id: 'B-4-13', unitKey: 'buaw', lo: 4, criteria: ['BUAW-4.2.2'], type: 'truefalse',
      q: 'Decide whether each statement about the impact of a data breach is true.',
      statements: [
        { text: 'Individuals may suffer identity theft and financial loss.', answer: true },
        { text: 'The consequences for the business are limited to any fine imposed.', answer: false },
        { text: 'Management time diverted to the response is a real cost of a breach.', answer: true },
      ],
      exp: 'The harm runs to individuals and to the business at once. For the business it includes compensation claims, remediation, lost customers and months of diverted management attention — the fine is one item among several.' },
    { id: 'B-4-14', unitKey: 'buaw', lo: 4, criteria: ['BUAW-4.2.3'], type: 'picklist',
      q: 'Classify each control.',
      picklist: {
        rowHeader: 'Control',
        choiceHeader: 'Type',
        options: ['Access level', 'Security control', 'Integrity control'],
        rows: [
        { text: 'A purchase ledger clerk can post invoices but cannot approve payments', answer: 0 },
        { text: 'A firewall between the network and the internet', answer: 1 },
        { text: 'A batch total reconciled after a payroll run', answer: 2 },
        { text: 'Multi-factor authentication on the accounting system', answer: 1 },
        ],
      },
      exp: 'Access levels decide who can do what. Security controls keep intruders out. Integrity controls check that the data itself is right, at input, during processing and on output — a batch total is a processing control.' },
    { id: 'B-4-15', unitKey: 'buaw', lo: 4, criteria: ['BUAW-4.2.3'], type: 'mcq',
      q: 'A report is checked and its distribution list reviewed before it is issued. Which kind of integrity control is this?',
      opts: ['An output control', 'An input control', 'A processing control', 'An access control'],
      ans: 0,
      exp: 'It acts on what leaves the system and on who receives it, which is what output controls are for — and the distribution half of it is a confidentiality control as much as an accuracy one.' },
    { id: 'B-4-16', unitKey: 'buaw', lo: 4, criteria: ['BUAW-4.2.4'], type: 'mcq',
      q: 'Which defence most directly addresses phishing?',
      opts: ['Training, and verifying on a channel already held', 'A firewall at the network perimeter', 'Encryption of the data held at rest', 'Restriction of administrator rights'],
      ans: 0,
      exp: 'Phishing works on people: nothing was forced, an authorised person was persuaded. Firewalls, encryption and privilege restrictions all defend against intrusion, and none of them examines whether a legitimate-looking instruction is genuine.' },
    { id: 'B-4-17', unitKey: 'buaw', lo: 4, criteria: ['BUAW-4.2.5'], type: 'picklist',
      q: 'Classify each consequence of a ransomware attack.',
      picklist: {
        rowHeader: 'Consequence',
        choiceHeader: 'Risk to',
        options: ['Data', 'Operations'],
        rows: [
        { text: 'Customer records are encrypted and may not be recoverable', answer: 0 },
        { text: 'Deliveries stop because the despatch system is unavailable', answer: 1 },
        { text: 'Nothing can be invoiced or paid for four days', answer: 1 },
        { text: 'Personal data is exfiltrated and published', answer: 0 },
        ],
      },
      exp: 'An answer that covers only the data half has covered half the question. For most businesses the operational half — being unable to trade for a week — is the larger immediate loss, and the specification asks for the risks to data AND operations.' },
    { id: 'B-4-18', unitKey: 'buaw', lo: 4, criteria: ['BUAW-4.2.5'], type: 'mcq',
      q: 'Why is an untested backup inadequate protection?',
      opts: ['Nobody knows whether it can actually be restored until it is needed', 'It takes up storage the business could use for other purposes', 'It cannot be encrypted', 'Regulations require backups to be tested monthly'],
      ans: 0,
      exp: 'A backup that has never been restored from is a hope rather than a control, and the discovery that it does not work comes on the one day it matters. Testing the restore is the control, and it is the step businesses most often skip.' },
    { id: 'B-4-19', unitKey: 'buaw', lo: 4, criteria: ['BUAW-4.1.1', 'BUAW-4.2.4'], type: 'mcq',
      q: 'A finance team adopts AI to flag unusual transactions. What must accompany it?',
      opts: ['Review of what it flags and of what it does not, in both directions', 'A guarantee from the supplier that the model is accurate enough', 'Removal of the existing manual controls, to avoid duplication', 'Public disclosure of the model used in the financial statements'],
      ans: 0,
      exp: 'A model produces false positives and false negatives, and the second is the dangerous one because nothing appears. Removing manual controls on the strength of a new model is exactly how an automated system’s blind spot becomes an unnoticed loss.' },
    /* ── Outcome 5 · Communicating information to stakeholders ───────────── */
    { id: 'B-5-01', unitKey: 'buaw', lo: 5, criteria: ['BUAW-5.1.1'], type: 'picklist',
      q: 'Which attribute of good quality information is failing in each case?',
      picklist: {
        rowHeader: 'Case',
        choiceHeader: 'Attribute failing',
        options: ['Timely', 'Relevant', 'Understandable', 'Cost-effective'],
        rows: [
        { text: 'The February report is issued in late April', answer: 0 },
        { text: 'A branch manager receives group-wide figures she cannot act on', answer: 1 },
        { text: 'The commentary uses accounting terms the recipient does not know', answer: 2 },
        { text: '£12,000 is spent analysing a decision worth £2,000', answer: 3 },
        ],
      },
      exp: 'Each failure has a different remedy, which is why telling them apart matters: report sooner, send what the reader can act on, write in the reader’s language, and stop spending more than the decision is worth.' },
    { id: 'B-5-02', unitKey: 'buaw', lo: 5, criteria: ['BUAW-5.1.1'], type: 'mcq',
      q: 'A figure accurate to the penny arrives three weeks after the decision was taken. What does this illustrate?',
      opts: ['That accuracy and timeliness trade off, and late is worthless', 'That accuracy is the most important attribute information has', 'That the information was not relevant to the decision', 'That the information was not produced cost-effectively'],
      ans: 0,
      exp: 'Accuracy is a means, not an end: the standard is accurate enough for the decision, in time for the decision. An approximate figure available on the day beats an exact one that arrives after the choice has been made.' },
    { id: 'B-5-03', unitKey: 'buaw', lo: 5, criteria: ['BUAW-5.1.2'], type: 'picklist',
      q: 'Match each piece of information to the level of the organisation it suits.',
      picklist: {
        rowHeader: 'Information',
        choiceHeader: 'Level',
        options: ['Operational', 'Managerial (tactical)', 'Corporate / strategic'],
        rows: [
        { text: 'Today’s outstanding picking list', answer: 0 },
        { text: 'This month’s departmental variances against budget', answer: 1 },
        { text: 'A five-year market forecast for the sector', answer: 2 },
        ],
      },
      exp: 'The horizon and the source decide it. Operational information is detailed, internal and about today; tactical is summarised, internal and monthly; strategic is highly summarised, largely external and uncertain.' },
    { id: 'B-5-04', unitKey: 'buaw', lo: 5, criteria: ['BUAW-5.1.2'], type: 'mcq',
      q: 'Which characteristic increases as information moves from operational to strategic level?',
      opts: ['The proportion of it drawn from outside the business', 'The level of detail', 'The frequency with which it is produced', 'The precision of each figure'],
      ans: 0,
      exp: 'Strategic decisions are about the world the business operates in, so external content rises. Detail, frequency and precision all fall — which is why a board pack of individual invoice lines is information at the wrong level.' },
    { id: 'B-5-05', unitKey: 'buaw', lo: 5, criteria: ['BUAW-5.1.3'], type: 'picklist',
      q: 'Which characteristic of big data does each describe?',
      picklist: {
        rowHeader: 'Description',
        choiceHeader: 'Characteristic',
        options: ['Volume', 'Velocity', 'Variety', 'Veracity', 'Value'],
        rows: [
        { text: 'The data arrives continuously from sensors', answer: 1 },
        { text: 'A tenth of the records are known to be inaccurate', answer: 3 },
        { text: 'It mixes transactions, images and free text', answer: 2 },
        { text: 'Nothing useful can be extracted despite the effort', answer: 4 },
        ],
      },
      exp: 'Volume, velocity and variety describe the data’s shape; veracity and value ask whether it can be trusted and whether it is worth having. The last two carry the marks, because they are the two that can be absent.' },
    { id: 'B-5-06', unitKey: 'buaw', lo: 5, criteria: ['BUAW-5.1.4'], type: 'picklist',
      q: 'Classify each as a benefit or a limitation of big data.',
      picklist: {
        rowHeader: 'Statement',
        choiceHeader: 'Benefit or limitation',
        options: ['Benefit', 'Limitation'],
        rows: [
        { text: 'Whole populations can be tested rather than samples', answer: 0 },
        { text: 'Correlation is easily mistaken for causation', answer: 1 },
        { text: 'Bias in the data becomes bias in the decision', answer: 1 },
        { text: 'Patterns invisible in a sample become visible', answer: 0 },
        ],
      },
      exp: 'The benefits come from scale, and so do the limitations: more data makes a wrong conclusion look better supported, and it does nothing about a bias that was in the collection. Cost and data protection obligations are the other two limitations worth naming.' },
    { id: 'B-5-07', unitKey: 'buaw', lo: 5, criteria: ['BUAW-5.1.5'], type: 'picklist',
      q: 'Classify each source of big data.',
      picklist: {
        rowHeader: 'Source',
        choiceHeader: 'Internal or external',
        options: ['Internal', 'External'],
        rows: [
        { text: 'Point-of-sale transaction records', answer: 0 },
        { text: 'A purchased consumer behaviour dataset', answer: 1 },
        { text: 'Government population statistics', answer: 1 },
        { text: 'Telemetry from the business’s own delivery vans', answer: 0 },
        ],
      },
      exp: 'The distinction matters because of veracity: internal data was generated by processes the business controls and can check, and external data was not. An external dataset arrives with whatever bias and gaps were in its collection, unseen.' },
    { id: 'B-5-08', unitKey: 'buaw', lo: 5, criteria: ['BUAW-5.1.6', 'BUAW-5.1.7'], type: 'mcq',
      q: 'An external analytics provider reports a strong relationship between two variables in a purchased dataset. What does professional scepticism require first?',
      opts: ['Asking how it was collected, what is missing, and whether it is causal', 'Acting on the finding, the provider being a specialist in the field', 'Rejecting the finding, since external data can never be relied on', 'Repeating the analysis over the same purchased dataset'],
      ans: 0,
      exp: 'Scepticism is not refusal, and it is not deference. The questions are about provenance, coverage and whether a relationship explains anything — and repeating the analysis on the same data answers none of them.' },
    { id: 'B-5-09', unitKey: 'buaw', lo: 5, criteria: ['BUAW-5.1.6'], type: 'truefalse',
      q: 'Decide whether each statement about the reliability of data is true.',
      statements: [
        { text: 'A larger dataset is automatically a more reliable one.', answer: false },
        { text: 'Veracity concerns the trustworthiness of the data.', answer: true },
        { text: 'Professional scepticism applies to data as well as to explanations from people.', answer: true },
      ],
      exp: 'Volume and reliability are independent: size makes a conclusion look better supported without making it more likely to be right. Veracity is the characteristic that asks whether it can be trusted, and the specification calls for scepticism about big data specifically.' },
    { id: 'B-5-10', unitKey: 'buaw', lo: 5, criteria: ['BUAW-5.2.1', 'BUAW-5.2.3'], type: 'picklist',
      q: 'Match each communication task to the most appropriate visual form.',
      picklist: {
        rowHeader: 'Task',
        choiceHeader: 'Form',
        options: ['Line graph', 'Bar chart', 'Pie chart', 'Table'],
        rows: [
        { text: 'Show how monthly sales have moved over three years', answer: 0 },
        { text: 'Compare revenue across six unrelated branches', answer: 1 },
        { text: 'Show how this year’s costs split between four categories', answer: 2 },
        { text: 'Let a manager read off exact figures for reconciliation', answer: 3 },
        ],
      },
      exp: 'Time is a line; category comparison is a bar; parts of one whole with few slices is a pie; exact figures to be read off are a table. A pie chart cannot show change over time, and a series of them is a poor way to try.' },
    { id: 'B-5-11', unitKey: 'buaw', lo: 5, criteria: ['BUAW-5.2.2', 'BUAW-5.2.5'], type: 'mcq',
      q: 'A cost line runs steadily at about £40,000 a month, then shows £118,000 in one month and £39,000 in the next. What should the accountant do?',
      opts: ['Treat it as an anomaly and investigate it before concluding', 'Smooth the series so that the trend is easier to read', 'Exclude the month, on the basis that it is clearly wrong', 'Report the average for the period, which absorbs the effect'],
      ans: 0,
      exp: 'Recognising anomalies is one of the things visualisation is for, and an anomaly is a question rather than a nuisance. Smoothing, excluding or averaging all hide the one figure that most needs explaining — and doing so knowingly engages integrity.' },
    { id: 'B-5-12', unitKey: 'buaw', lo: 5, criteria: ['BUAW-5.2.3'], type: 'mcq',
      q: 'A bar chart of branch revenue starts its axis at £95,000 rather than zero, making a 4% difference look enormous. How should this be regarded?',
      opts: ['As misleading presentation, engaging integrity', 'As acceptable, since no figure stated is false', 'As a failure of relevance to the reader', 'As a failure of timeliness in reporting'],
      ans: 0,
      exp: 'Nothing stated is untrue, which is exactly what makes it effective and what makes it an integrity matter: the accountant is associated with information that creates an impression the figures do not support.' },
    { id: 'B-5-13', unitKey: 'buaw', lo: 5, criteria: ['BUAW-5.2.4'], type: 'mcq',
      q: 'What is a dashboard in accounting software principally for?',
      opts: ['Putting the position in front of people who will not read a report', 'Replacing the statutory financial statements entirely', 'Storing the detailed underlying transaction records', 'Providing a full audit trail of changes made to the ledger'],
      ans: 0,
      exp: 'A dashboard communicates a position continuously to non-technical stakeholders. It does not explain why, it does not replace statutory reporting, and it is a view of the data rather than the record itself.' },
    { id: 'B-5-14', unitKey: 'buaw', lo: 5, criteria: ['BUAW-5.2.5'], type: 'mcq',
      q: 'A chart shows revenue rising each year for four years while gross margin percentage falls each year. What does it indicate?',
      opts: ['The business is growing by selling more at a lower margin', 'The business is becoming more profitable each year', 'Revenue and margin are unrelated in this business', 'The chart must contain an error'],
      ans: 0,
      exp: 'Both series are consistent and both matter: volume is up and the margin on each pound of sales is down. Whether profit rose depends on which moved further, which is precisely why the two are plotted together.' },
    { id: 'B-5-15', unitKey: 'buaw', lo: 5, criteria: ['BUAW-5.3.1'], type: 'mcq',
      q: 'What should principally decide the medium used to communicate something?',
      opts: ['The audience, urgency, complexity, need for a record, sensitivity', 'Whichever medium the sender happens to find quickest', 'The medium used for similar messages in the past year', 'Whichever medium reaches the largest number of recipients'],
      ans: 0,
      exp: 'Those five are the principles the specification asks for. Convenience to the sender and habit are the two reasons the wrong medium usually gets chosen, and reaching the largest audience is the opposite of what confidentiality requires.' },
    { id: 'B-5-16', unitKey: 'buaw', lo: 5, criteria: ['BUAW-5.3.1'], type: 'picklist',
      q: 'Match each message to the most appropriate medium.',
      picklist: {
        rowHeader: 'Message',
        choiceHeader: 'Medium',
        options: ['A phone call followed by a confirming email', 'A formal written report', 'A remittance advice', 'A face-to-face meeting'],
        rows: [
        { text: 'An urgent supplier failure affecting tomorrow’s production', answer: 0 },
        { text: 'Analysis and a recommendation on opening a second site', answer: 1 },
        { text: 'Telling a supplier which invoices a payment settles', answer: 2 },
        { text: 'Discussing a proposed restructure with the affected team', answer: 3 },
        ],
      },
      exp: 'Urgency needs immediacy plus a record; a complex recommendation needs a report that can be read and re-read; a routine allocation needs the standard document; and anything contentious or personal needs a conversation rather than a message.' },
    { id: 'B-5-17', unitKey: 'buaw', lo: 5, criteria: ['BUAW-5.3.2'], type: 'truefalse',
      q: 'Decide whether each statement about professional communication is true.',
      statements: [
        { text: 'Confidentiality is part of choosing how to communicate, not a separate matter.', answer: true },
        { text: 'Sending information to everyone who might conceivably want it is good practice.', answer: false },
        { text: 'The medium should be chosen for the outcome wanted, not for the sender’s convenience.', answer: true },
      ],
      exp: 'Who receives a message is a confidentiality decision every time it is sent. Copying widely is how information reaches people not entitled to it, and choosing by convenience is how an urgent matter ends up in a monthly report.' },
    { id: 'B-5-18', unitKey: 'buaw', lo: 5, criteria: ['BUAW-5.3.2'], type: 'mcq',
      q: 'What should the length and detail of a communication be determined by?',
      opts: ['What the recipient has to do with the information', 'How much work went into producing it', 'How much the sender knows about the subject', 'The standard format used by the organisation'],
      ans: 0,
      exp: 'Starting from the recipient’s action settles the length, the detail, the medium and the deadline at once. The other three are why reports get longer than they need to be, and length is what stops them being read.' },
    { id: 'B-5-19', unitKey: 'buaw', lo: 5, criteria: ['BUAW-5.1.1', 'BUAW-5.3.2'], type: 'mcq',
      q: 'A regulator requires a return in a prescribed format by a fixed date. What is the accountant’s scope to vary it?',
      opts: ['None on format or deadline — the requirement is the regulator’s to set', 'Full discretion, provided the information is accurate', 'Discretion over format but not over the deadline', 'Discretion over the deadline if the format is followed exactly'],
      ans: 0,
      exp: 'Where a stakeholder prescribes the form and the timing, meeting their requirement means meeting it exactly. Judgement about format and length applies to communications the sender designs, not to a return somebody else has specified.' },

    /* ── Multi-part tasks ─────────────────────────────────────────────────
       THE SHAPE THE PAPER IS BUILT FROM, and in this unit that is not a table
       of figures to add up. A BUAW task hands the reader a business and asks
       several judgements about it at once — which stakeholder, which risk,
       which threat, which safeguard — with the scenario still on screen while
       they work. Selecting and classifying is the assessed skill here, exactly
       as it is in the numerate units; only the material is different.        */
    { id: 'B-1-T1', unitKey: 'buaw', lo: 1, criteria: ['BUAW-1.1.1', 'BUAW-1.3.1', 'BUAW-1.3.4', 'BUAW-1.4.5'],
      type: 'task',
      q: 'Answer the questions about Brantwood Foods.',
      brief: 'Read the summary and answer each part. Not every row is relevant to every part.',
      datasets: [
        {
          title: 'Brantwood Foods — summary',
          headers: ['Item', 'Detail'],
          rows: [
            ['Legal form', 'Private limited company, two shareholders who are also the directors'],
            ['Employees', '38, at one site'],
            ['Bank', 'Loan of £750,000 secured on the freehold premises'],
            ['Customers', 'Two supermarket groups, together 80% of revenue'],
            ['Suppliers', 'Eleven growers, none more than 15% of purchases'],
            ['Systems', 'Orders, stock and accounts on one cloud package'],
            ['Insurance', 'Buildings and stock insured; no business interruption cover'],
          ],
          note: 'The company has never documented the risks it faces.',
        },
      ],
      parts: [
        { label: 'The shareholders’ liability for the company’s debts is:', type: 'choice',
          options: ['Limited to the amount unpaid on their shares', 'Unlimited, since they are also the directors', 'Limited to the value of the freehold premises'],
          answer: 0,
          exp: 'The company is a separate legal person, and being a director as well as a shareholder does not change that. Directors can become personally liable in specific circumstances, but simply holding both roles is not one of them.' },
        { label: 'Which stakeholder has the most power over Brantwood?', type: 'choice',
          options: ['The two supermarket groups, taking 80% of revenue', 'The eleven growers who supply it', 'The 38 employees at the site'],
          answer: 0,
          exp: 'Power comes from dependence. Losing one supermarket would remove a large share of revenue at a stroke; no single grower is more than 15% of purchases, so any of them could be replaced.' },
        { label: 'A fire that closes the site for six weeks is principally which type of risk?', type: 'choice',
          options: ['Operational risk', 'Financial risk', 'Strategic risk'],
          answer: 0,
          exp: 'Operational risk is internal processes, people, premises and systems failing. It becomes a financial problem, but the risk itself is operational — and the absence of business interruption cover is what turns a six-week closure into a solvency question.' },
        { label: 'The absence of business interruption cover is best described as:', type: 'choice',
          options: ['A risk never documented, and so never actually accepted', 'A deliberate decision to accept and carry the risk', 'A transfer of the risk to the buildings insurer'],
          answer: 0,
          exp: 'The company has never documented its risks, so nobody has weighed this exposure and decided to carry it. Accepting a risk is a recorded decision; a gap nobody has looked at is a risk that has been missed.' },
      ],
      exp: 'Four judgements about one business, which is the shape a BUAW task takes. The dataset carries rows that matter to one part and not to others — the insurance row decides parts three and four and is irrelevant to the first two, and the supplier concentration row exists to be compared against the customer concentration row.' },
    { id: 'B-3-T1', unitKey: 'buaw', lo: 3, criteria: ['BUAW-3.1.12', 'BUAW-3.1.17', 'BUAW-3.1.10', 'BUAW-3.2.4'],
      type: 'task',
      q: 'Answer the questions about each situation at Sedgeworth LLP.',
      brief: 'Each row describes a separate situation. Answer each part in respect of the row it names.',
      datasets: [
        {
          title: 'Sedgeworth LLP — four situations',
          headers: ['Ref', 'Situation'],
          rows: [
            ['A', 'The manager reviewing the year-end file prepared most of the journals in it'],
            ['B', 'A partner is told the engagement will be moved elsewhere unless a valuation is revised'],
            ['C', 'A senior has worked on the same client for eleven years and knows the family well'],
            ['D', 'An assistant holds shares in a client whose accounts she is preparing'],
          ],
        },
      ],
      parts: [
        { label: 'Situation A is which threat?', type: 'choice',
          options: ['Self-review', 'Advocacy', 'Intimidation'],
          answer: 0,
          exp: 'Reviewing your own earlier work is self-review: the reviewer cannot bring independent judgement to it, however honest they are, because finding a problem means admitting a mistake.' },
        { label: 'Situation B is which threat?', type: 'choice',
          options: ['Intimidation', 'Familiarity', 'Self-review'],
          answer: 0,
          exp: 'A threat to move the work unless a figure changes is pressure applied to professional judgement, which is intimidation. It is the threat that most often goes unnamed because it feels like a commercial conversation.' },
        { label: 'The safeguard that best fits situation C is:', type: 'choice',
          options: ['Rotating who works on the engagement', 'Documenting the relationship in the file', 'Obtaining the client’s consent to continue'],
          answer: 0,
          exp: 'Familiarity is addressed by breaking the relationship that has become too comfortable. Documenting it evidences the threat without reducing it, and the client’s consent cannot cure a threat to the accountant’s own objectivity.' },
        { label: 'If no safeguard reduces the threat in situation D to an acceptable level, the assistant must:', type: 'choice',
          options: ['Not continue with the work', 'Disclose the shareholding and carry on', 'Have a second person review her work'],
          answer: 0,
          exp: 'A second review and a disclosure are both safeguards, and the part says they have failed. Where a threat cannot be eliminated or reduced to an acceptable level, the code requires that the accountant does not continue — the answer readers avoid giving.' },
      ],
      exp: 'The four parts move from identifying threats to choosing a safeguard to knowing when no safeguard is enough, which is the sequence the specification sets out. Note that the last part rules out the two answers that would otherwise be right: a safeguard that has already failed is not the answer to a question about what happens when safeguards fail.' },
    { id: 'B-5-T1', unitKey: 'buaw', lo: 5, criteria: ['BUAW-5.1.1', 'BUAW-5.1.2', 'BUAW-5.2.3', 'BUAW-5.3.1'],
      type: 'task',
      q: 'Answer the questions about reporting at Kelbrook Ltd.',
      brief: 'Each part concerns a different recipient or a different piece of information.',
      datasets: [
        {
          title: 'Kelbrook Ltd — who needs what',
          headers: ['Recipient', 'Decision they face', 'When'],
          rows: [
            ['Warehouse supervisor', 'Which orders to pick first today', 'Now'],
            ['Board', 'Whether to close a loss-making depot', 'In three weeks'],
            ['Bank', 'Whether the loan covenant is met', 'Quarterly, on a fixed date'],
            ['Regulator', 'Compliance with a statutory return', 'By a statutory deadline'],
          ],
        },
      ],
      parts: [
        { label: 'Information for the warehouse supervisor should be:', type: 'choice',
          options: ['Detailed, internal and available now', 'Highly summarised and largely external', 'Summarised monthly against budget'],
          answer: 0,
          exp: 'Operational decisions need detail, internal sources and immediacy. Summarised or external information is at the wrong level: it cannot tell him which order to pick.' },
        { label: 'The best way to show the board how the depot’s margin has moved over 18 months is:', type: 'choice',
          options: ['A line graph', 'A pie chart for each month', 'A table of the 18 monthly figures'],
          answer: 0,
          exp: 'The question is about movement over time, which is what a line shows. Pie charts show composition at a moment; a table holds every figure and shows no shape.' },
        { label: 'The format and timing of the regulator’s return are decided by:', type: 'choice',
          options: ['The regulator, and Kelbrook has no discretion over either', 'Kelbrook, provided the information is accurate', 'Kelbrook’s auditors'],
          answer: 0,
          exp: 'Where a stakeholder prescribes the form and the date, meeting their requirement means meeting it exactly. Judgement about format applies to communications the sender designs.' },
        { label: 'The depot analysis reaches the board best as:', type: 'choice',
          options: ['A short report with a recommendation, sent out beforehand', 'A verbal update given at the meeting itself', 'A dashboard the directors can consult when they wish'],
          answer: 0,
          exp: 'The board has a decision to make, so it needs analysis it can read and re-read, with a recommendation, in time to think about it. A verbal update leaves no record and no time to consider; a dashboard shows a position rather than making a case.' },
      ],
      exp: 'Every part is decided by what the recipient has to DO. That single question settles the level of detail, the visual form, the medium and the deadline — and it is why the dataset lists the decision each recipient faces rather than their job title alone.' },

    /* ── Written tasks ────────────────────────────────────────────────────
       MORE OF THEM HERE THAN IN ANY OTHER UNIT, and that is the specification’s
       doing rather than a preference. BUAW is partially human marked, and AAT
       states that some of its tasks require extended written responses. In the
       other three units a written task is a study technique; here it is
       rehearsal of the format the marks actually come in.                    */
    { id: 'B-1-W1', unitKey: 'buaw', lo: 1, criteria: ['BUAW-1.3.1', 'BUAW-1.3.2', 'BUAW-1.3.4'],
      type: 'written', minWords: 90,
      setup: 'Fenwick Joinery is a private limited company employing 40 people in a small town. It is the town’s third largest employer. It owes £600,000 to a bank secured on its premises, buys timber from four suppliers, and sells 45% of its output to one national retailer. The board is considering closing the town workshop and moving production 200 miles to a larger site.',
      q: 'Identify THREE stakeholders affected by the proposed move, state what each wants from Fenwick, and say how the move affects them. For one of them, explain why they have particular power over the decision.',
      rubric: [
        { point: 'Names three of the employees, the bank, the retailer and the suppliers', marks: 1 },
        { point: 'States what each of the three wants — pay and job security, repayment and security over the premises, continuity of supply', marks: 2 },
        { point: 'Says how the move affects each: redundancy for employees, weakened security for the bank, interrupted supply for the retailer', marks: 3 },
        { point: 'Identifies the bank, with its charge over the premises, or the retailer taking 45% of output, as having particular power', marks: 1 },
        { point: 'Explains that power as resting on the legal claim or on dependence, rather than on size', marks: 1 },
      ],
      modelAnswer: 'Employees want pay, job security and reasonable conditions. The move is adverse for them: 40 jobs go from the town, and few will relocate 200 miles, so most face redundancy.\n\nThe bank wants its interest and capital repaid and holds security over the premises. The move is adverse: the workshop it has a charge over will stop being used for production, which weakens the value and saleability of its security, and the disruption puts short-term trading at risk.\n\nThe national retailer wants continuity of supply at an agreed price and quality. The move is mixed: lower costs may eventually mean better prices, but any interruption during the transfer threatens its own supply, and it takes 45% of Fenwick’s output.\n\nThe bank has particular power because its consent is likely to be needed. Its security is over the specific premises the board proposes to leave, and it can attach conditions or withhold agreement. Its power comes from that legal claim rather than from its size — and the retailer has power for a comparable reason, that Fenwick depends on it for nearly half its revenue.',
      exp: 'Three marks of the eight are for the DIRECTION of the effect on each stakeholder, which is what separates an answer that lists stakeholders from one that analyses them. The power mark turns on dependence: the bank has a legal claim over the asset being abandoned, and the retailer accounts for 45% of revenue. Naming a stakeholder as powerful because it is "big" earns nothing.' },
    { id: 'B-1-W2', unitKey: 'buaw', lo: 1, criteria: ['BUAW-1.4.5'],
      type: 'written', minWords: 80,
      setup: 'Aldermere Ltd distributes medical supplies from a single leased warehouse. Its entire stock, worth about £900,000, is held there. It has no written record of the risks it faces. The finance director has asked you to look at the position.',
      q: 'Identify TWO risks Aldermere faces, classify each by type, and recommend a response to each from avoid, reduce, transfer and accept. Explain why the response you recommend fits the risk.',
      rubric: [
        { point: 'Identifies two distinct risks arising from the scenario', marks: 2 },
        { point: 'Classifies each correctly as business, financial, strategic or operational', marks: 2 },
        { point: 'Recommends a response for each from the four named', marks: 1 },
        { point: 'Justifies each response by reference to likelihood and impact', marks: 2 },
        { point: 'Notes that a risk not written down has not been accepted, it has been missed', marks: 1 },
      ],
      modelAnswer: 'The first risk is the loss of the single warehouse to fire, flood or a similar event. This is an operational risk: it arises from the business’s own premises and processes. The likelihood is low but the impact is severe, because £900,000 of stock and all distribution capacity sit in one building. Low likelihood with high impact is the classic case for TRANSFER, so the response is insurance covering both the stock and business interruption — noting that insurance restores money, not customers.\n\nThe second is dependence on that single site continuing to be available: the warehouse is leased, and the lease can end. This is a strategic risk, because it threatens whether Aldermere can operate at all rather than how well it operates this year. The response is REDUCE — securing a longer lease, or identifying and pre-qualifying an alternative site — because the exposure can be cut at modest cost, whereas avoiding it would mean not holding stock at all and transferring it is not something an insurer will price.\n\nAldermere has no written record of its risks. That matters: a risk nobody has documented has not been accepted, it has been missed, and it will surface as a surprise rather than as a decision.',
      exp: 'The eight marks are spread deliberately: two for identifying, two for classifying, one for choosing, two for JUSTIFYING, and one for the point about documentation. Choosing a response without saying why it fits the likelihood and impact profile forfeits two of them, and it is the commonest way this question is half-answered.' },
    { id: 'B-2-W1', unitKey: 'buaw', lo: 2, criteria: ['BUAW-2.1.8', 'BUAW-2.1.9', 'BUAW-2.1.3'],
      type: 'written', minWords: 90,
      setup: 'Calder Coach Hire runs 22 coaches on school contracts and private tours. It funds its fleet on variable-rate finance of £1.4m. Diesel is its largest single cost. The Bank of England has raised the base rate three times in a year, fuel prices have risen 30%, and the local council has announced a reduction in its home-to-school transport budget.',
      q: 'Using PESTLE, analyse the position facing Calder. Identify the factors at work, and explain the impact of each on the business. Conclude with what the combination means.',
      rubric: [
        { point: 'Identifies interest rate rises as an economic factor', marks: 1 },
        { point: 'Identifies the fuel price rise as economic, and recognises it as cost-push pressure', marks: 1 },
        { point: 'Identifies the council budget reduction as a political factor, being a public spending decision', marks: 1 },
        { point: 'Explains the impact of the rate rise on Calder specifically — the cost of £1.4m of variable-rate fleet finance', marks: 2 },
        { point: 'Explains the impact of fuel on the largest single cost, and the difficulty of passing it on under contract', marks: 2 },
        { point: 'Explains the impact of the council decision on contract revenue', marks: 1 },
        { point: 'Concludes that costs rise and revenue falls together, so the effects compound rather than offset', marks: 2 },
      ],
      modelAnswer: 'Three PESTLE factors are at work, two economic and one political.\n\nInterest rate rises are an ECONOMIC factor. Calder funds £1.4m of fleet on variable-rate finance, so its finance cost rises directly and immediately with each increase, with no action by the business. It also raises the return any new coach must earn, so replacement is likely to be deferred.\n\nThe 30% fuel rise is also ECONOMIC, and it is cost-push: the cost of supplying has risen rather than demand having grown. Diesel is Calder’s largest single cost, so this is the largest of the three effects. School contracts are usually fixed for a term, so the increase cannot be passed on until they are renegotiated, and private tour pricing is constrained by competition.\n\nThe council’s budget reduction is POLITICAL, because it is a public spending decision rather than a movement in the economy. It reduces the volume of school contract work available, which is Calder’s more predictable revenue stream.\n\nThe combination is what matters. Two of the three raise costs and the third reduces revenue, and none of them offsets another: Calder is squeezed from both ends at once. Its immediate options are to renegotiate contracts where it can, to consider fixing part of the finance, and to protect margin on the tour work that is not contractually fixed.',
      exp: 'Ten marks, and only three of them are for identifying the factors — the rest are for impact on THIS business and for the conclusion. The conclusion mark is the one most often lost: two costs up and one revenue down do not offset, and saying so is worth two marks on its own. Note also that the council decision is political rather than economic, because the cause is a policy choice.' },
    { id: 'B-2-W2', unitKey: 'buaw', lo: 2, criteria: ['BUAW-2.3.1', 'BUAW-2.3.2', 'BUAW-2.3.3'],
      type: 'written', minWords: 80,
      setup: 'Threlkeld Textiles buys cotton from a supplier that pays below the local living wage and discharges dye into a river. The cotton is 20% cheaper than any alternative. A director argues that the business is not breaking any law and that the savings keep 90 UK jobs.',
      q: 'Respond to the director. Explain what sustainability requires here, and what the accountant’s own duty is.',
      rubric: [
        { point: 'States that sustainability has three aspects — social, environmental and economic', marks: 1 },
        { point: 'Applies the social aspect to the supplier’s wages', marks: 1 },
        { point: 'Applies the environmental aspect to the river discharge', marks: 1 },
        { point: 'Acknowledges the economic aspect — the 90 jobs and the business’s viability are genuinely part of it', marks: 2 },
        { point: 'States that legality is a minimum and does not settle whether conduct is ethical', marks: 2 },
        { point: 'Identifies the accountant’s public interest duty to protect society as a whole', marks: 1 },
      ],
      modelAnswer: 'Sustainability has three aspects — social, environmental and economic — and all three have to hold. The director is right that the third is real: 90 UK jobs and the viability of the business are part of sustainable performance, not something opposed to it. An answer that dismisses the cost saving has missed a third of the concept.\n\nBut the other two fail. Paying below a living wage is a social failure in the supply chain, and the specification asks for sustainability across the supply chain rather than at the organisation’s own boundary. Discharging dye into a river is an environmental failure, and it is the kind that attracts regulatory and reputational consequences later even where it is lawful now.\n\nThe argument that no law is broken does not settle the question. Compliance with the law is a minimum requirement; an act permitted by law is not necessarily ethical, and conduct that would discredit the profession is a disciplinary matter whether or not it is lawful.\n\nAs an accountant I have a public interest duty to protect society as a whole and the organisation’s own sustainability. In practice that means putting the position to the board with the risks stated — supply interruption if the supplier is closed down, reputational damage if the practice becomes public, and the cost of switching under pressure rather than by choice — rather than treating a 20% saving as the whole of the case.',
      exp: 'Two of the eight marks are for taking the director’s point seriously. The economic aspect IS part of sustainability, and an answer that treats the 90 jobs as irrelevant is as incomplete as one that ignores the river. Two more are for the legal-versus-ethical distinction, which the specification states directly.' },
    { id: 'B-3-W1', unitKey: 'buaw', lo: 3, criteria: ['BUAW-3.1.11', 'BUAW-3.1.12', 'BUAW-3.1.17', 'BUAW-3.1.10'],
      type: 'written', minWords: 90,
      setup: 'You are the management accountant at Rowsley Ltd. The sales director, who chairs the bonus committee that will decide your own bonus, asks you to defer £180,000 of costs into next year so that this year’s profit meets the target. He says it is "only timing" and that everyone does it. He adds that your position is under review in the next restructure.',
      q: 'Identify the ethical threats in this situation, name the fundamental principles at risk, and set out what you should do.',
      rubric: [
        { point: 'Identifies the intimidation threat — the reference to the restructure', marks: 1 },
        { point: 'Identifies the self-interest threat — the sales director chairs the committee deciding the bonus', marks: 1 },
        { point: 'Names integrity as the principle at risk, because the accounts would be misleading', marks: 2 },
        { point: 'Names objectivity, because judgement is exposed to pressure and personal interest', marks: 1 },
        { point: 'Rejects the "only timing" argument: deferring cost that belongs to this year misstates both years', marks: 2 },
        { point: 'Sets out the response — establish the facts, refuse to make the entry, raise it internally above the director', marks: 2 },
        { point: 'States that if the threat cannot be reduced to an acceptable level the accountant must not continue, and may ultimately have to resign', marks: 1 },
      ],
      modelAnswer: 'There are two threats. The reference to the restructure is an INTIMIDATION threat: my judgement is being exposed to pressure through my job security. The fact that the sales director chairs the committee that decides my bonus is a SELF-INTEREST threat, because I stand to gain or lose personally from how I respond.\n\nTwo principles are at risk. INTEGRITY is the first: deferring £180,000 of costs that belong to this year would make the financial statements misleading, and being knowingly associated with misleading information breaches integrity whether I prepare it or merely allow it. OBJECTIVITY is the second, because both the pressure and my own interest bear on a judgement that should be made on the facts alone.\n\nThe "only timing" argument does not hold. Costs belong to the period in which they are incurred, so moving them misstates this year’s profit upwards and next year’s downwards — two wrong sets of accounts rather than one, and the users of both are misled. That others may do it is not a safeguard and not a defence.\n\nWhat I should do: establish the facts, including exactly which costs are in question and when they were incurred. Refuse to make the entry, and say so to the sales director, giving the reason. Because he is the source of the pressure, escalate above him — to the finance director, and if necessary to the board or audit committee — using the organisation’s internal procedure. I can seek confidential advice from my professional body’s ethics helpline at any point, and doing so does not breach confidentiality.\n\nIf no safeguard reduces the threat to an acceptable level, I must not continue to act. In an employment situation that means, ultimately, resigning rather than making an entry I know to be wrong.',
      exp: 'Ten marks. Two are for rejecting "only timing" with a reason — that it misstates BOTH years — rather than merely asserting that it is wrong. Two more are for the response being specific: refuse, then escalate ABOVE the person applying the pressure. The final mark is the one readers avoid: where a threat cannot be reduced, the accountant must not continue.' },
    { id: 'B-3-W2', unitKey: 'buaw', lo: 3, criteria: ['BUAW-3.3.1', 'BUAW-3.3.2'],
      type: 'written', minWords: 80,
      setup: 'You keep the books for Marchbank Autos, a used car dealer. Over three months, six customers have paid in cash amounts just under £9,000 each for cars, and in four cases a different person collected the vehicle. The owner explains that "cash is normal in this trade" and asks you not to make a fuss.',
      q: 'Explain what you must do, what you must not do, and why. Identify the offences you would commit by getting this wrong.',
      rubric: [
        { point: 'States that a suspicion, not certainty, is the threshold for reporting', marks: 2 },
        { point: 'States that a report must be made as soon as practicable — internally to the nominated officer or as a suspicious activity report', marks: 2 },
        { point: 'States that the owner must not be told, and names tipping off as the offence', marks: 2 },
        { point: 'Names failure to disclose as the offence committed by not reporting', marks: 1 },
        { point: 'Identifies what the report should contain — who, what is suspected and why, and the information it rests on', marks: 1 },
        { point: 'Notes that the disclosure does not breach confidentiality, being a protected disclosure', marks: 1 },
      ],
      modelAnswer: 'I must report. The threshold is SUSPICION, not certainty or proof: several features here are suspicious taken together — repeated cash payments structured just below a round figure, and vehicles collected by someone other than the payer. I do not need to establish that money laundering has occurred, and waiting until I could would itself be a failure.\n\nThe report must be made as soon as practicable after the suspicion arises. In a firm that means an internal report to the nominated officer; where there is no such officer, a suspicious activity report to the authorities. It should identify who is suspected, what is suspected and why, and the information the suspicion rests on. Delay matters, because continuing to act on the matter while sitting on a suspicion can turn an omission into an offence.\n\nI must NOT tell the owner, or anyone else, that a report has been made or that an investigation may follow. Doing so is the offence of TIPPING OFF, and it is committed just as easily by an accountant trying to be fair to a client as by one trying to help them.\n\nThe offence I would commit by saying nothing is FAILURE TO DISCLOSE. Falsifying, concealing or destroying relevant records — or making a disclosure that could prejudice an investigation — would be prejudicing an investigation, which any person can commit.\n\nReporting does not breach my duty of confidentiality. A report made through the proper channel is a protected disclosure, and the regime exists precisely because the duty to report would otherwise collide with the duty to keep the client’s affairs private.',
      exp: 'Nine marks, and the shape of them matters: two for suspicion as the threshold, two for reporting promptly through the right channel, and two for NOT telling the client. The last pair is where an instinct to be straightforward with a client becomes an offence, and it is the point the task exists to rehearse.' },
    { id: 'B-4-W1', unitKey: 'buaw', lo: 4, criteria: ['BUAW-4.2.1', 'BUAW-4.2.2', 'BUAW-4.2.3'],
      type: 'written', minWords: 80,
      setup: 'Larchfield Care Ltd holds staff and service-user records on a shared network drive that every employee can open. Leavers’ records going back fourteen years are still held. A recruitment form asks applicants for their marital status. There are no written data protection policies, though the office manager says "we are careful in practice".',
      q: 'Identify the data protection failings, naming the principle breached in each case, and recommend one control for each.',
      rubric: [
        { point: 'Identifies unrestricted access, breaching integrity and confidentiality (security)', marks: 2 },
        { point: 'Identifies fourteen years of leavers’ records, breaching storage limitation', marks: 2 },
        { point: 'Identifies the marital status question, breaching data minimisation', marks: 2 },
        { point: 'Identifies the absence of policies, breaching accountability — compliance must be demonstrable', marks: 2 },
        { point: 'Recommends an appropriate control for each failing', marks: 2 },
      ],
      modelAnswer: 'There are four failings.\n\nEvery employee can open the shared drive holding staff and service-user records. This breaches INTEGRITY AND CONFIDENTIALITY: personal data must be protected against unauthorised access, and in a care setting the records are particularly sensitive. The control is access levels — restricting each folder to the roles that need it, and reviewing the list when people change job.\n\nLeavers’ records from fourteen years ago are still held. This breaches STORAGE LIMITATION: data must not be kept longer than the purpose requires. The control is a written retention schedule with defined periods, and a scheduled review that actually deletes.\n\nThe recruitment form asks for marital status, which has no bearing on whether someone can do the job. This breaches DATA MINIMISATION, and risks discrimination as well. The control is to review the form and remove every field not needed for the recruitment decision.\n\nThere are no written policies. This breaches ACCOUNTABILITY, which requires the organisation to be able to DEMONSTRATE compliance rather than assert it. Being careful in practice is not evidence. The control is a documented data protection policy, a record of processing, and a training log showing that staff have been briefed.',
      exp: 'Ten marks, two per failing plus two for the controls. The accountability point is the one most often missed, and it is the one that answers the office manager: careful practice that cannot be evidenced does not satisfy the principle, because the principle is about demonstrability.' },
    { id: 'B-5-W1', unitKey: 'buaw', lo: 5, criteria: ['BUAW-5.1.1', 'BUAW-5.2.3', 'BUAW-5.3.1', 'BUAW-5.3.2'],
      type: 'written', minWords: 80,
      setup: 'You have found that one product line at Ashbourne Ltd has been loss-making for seven months. The operations manager needs to change the production schedule this week. The board meets in three weeks and will decide whether to discontinue the line. The sales director, whose team promoted the line, will be at the board meeting.',
      q: 'Set out how you would communicate this finding. For each recipient, say what they need, in what form, and when — and explain your choices.',
      rubric: [
        { point: 'Distinguishes the two recipients and their different needs', marks: 2 },
        { point: 'Gives the operations manager something short and immediate, because he must act this week', marks: 2 },
        { point: 'Gives the board a report with analysis and a recommendation, in time for the meeting', marks: 2 },
        { point: 'Chooses an appropriate visual form and justifies it — a line showing the monthly margin over the seven months', marks: 2 },
        { point: 'Handles the sales director point: the finding is presented on the evidence, not softened, and he is told before the meeting rather than surprised at it', marks: 2 },
      ],
      modelAnswer: 'Two recipients, two different requirements.\n\nThe operations manager has to change the schedule this week, so he needs something short, immediate and actionable: a call today, followed by a one-page note confirming which line is affected, the figures behind it, and what I am asking him to hold or change pending the board decision. The call gives immediacy and the note gives a record. He does not need the full analysis, because his decision is about this week’s schedule rather than about the product’s future.\n\nThe board decides whether to discontinue, so it needs a written report with the analysis, the options and a clear recommendation, circulated with the papers rather than tabled at the meeting so that it can be read. It should be short and lead with the recommendation.\n\nFor the visual, I would use a line graph of monthly contribution or margin across the seven months. The question is how the position has moved over time, which is what a line shows; a pie chart cannot show change over time, and a table of the same figures holds every number and shows no trend. I would start the axis at zero, so the scale does not overstate the movement.\n\nOn the sales director: the finding goes to the board as the evidence supports it, without softening. But I would tell him what I have found and share the figures before the papers go out. That is not a courtesy — it lets him check the numbers, and it means the board hears a disagreement about the facts, if there is one, before rather than during the meeting. Springing it on him would make the discussion about the surprise rather than about the product.',
      exp: 'Ten marks, and the last two are the interesting pair. Telling the sales director first is not softening the finding — the finding goes to the board unchanged. It is about the quality of the board’s decision: a factual dispute is better resolved before the meeting than in it. An answer that either suppresses the finding or ambushes him loses both marks.' },
  ];

  /* ══════════════════════════════════════════════════════════════════════════
     THE PATH
     ══════════════════════════════════════════════════════════════════════════ */

  var PATH = [
    {
      unit: 'buaw',
      level: 3,
      title: 'Business Awareness',
      outcome: 1,
      outcomeTitle: 'Understand business types, structures and governance, and the legal framework in which they operate',
      weighting: 25,
      lessons: ORIENTATION_LESSONS.concat(LO1_LESSONS, LO1_LESSONS_B),
      cheatsheet: {
        id: 'L3-BUAW-1S',
        title: 'Outcome 1 — types, duties, stakeholders, structure, risk',
        icon: '🗂️',
        card: {
          h: 'Everything Outcome 1 asks for, on one page',
          table: {
            headers: ['Business type', 'Liability', 'Publishes accounts?', 'Ownership separated from control?'],
            rows: [
              ['Sole trader', 'Unlimited', 'No', 'Not at all'],
              ['Partnership', 'Unlimited and joint', 'No', 'Barely'],
              ['LLP', 'Limited', 'Yes', 'Partly'],
              ['Private limited company', 'Limited', 'Yes', 'Often little, if owner-managed'],
              ['Public limited company', 'Limited', 'Yes, and more', 'Widely'],
              ['Not-for-profit / public sector', 'Varies with the form', 'Usually, to its regulator', 'Widely'],
            ],
          },
          split: {
            left: {
              title: 'Directors’ duties',
              items: [
                'Act within powers',
                'Promote the success of the company',
                'Exercise independent judgement',
                'Reasonable care, skill and diligence — two standards, higher wins',
                'Avoid conflicts of interest',
                'Not accept benefits from third parties',
                'Declare an interest in a transaction',
              ],
            },
            right: {
              title: 'Partnership defaults, with no agreement',
              items: [
                'Profits and losses shared EQUALLY',
                'No salaries',
                'No interest on capital',
                'No interest on drawings',
                'Every partner may manage',
                'A change of partner ends the old partnership',
              ],
            },
          },
          flow: ['Avoid', 'Reduce', 'Transfer', 'Accept'],
          formula: 'Risk = outcomes known, probability estimable · Uncertainty = neither',
          callout: {
            kind: 'key',
            text: 'Stakeholder significance = power × interest, and power comes from DEPENDENCE rather than size. Governance formality follows the separation of ownership from control.',
          },
          examtrap: 'Business risk is inherent in the trade; financial risk comes from funding and money management; strategic risk threatens the direction; operational risk is processes, people and systems — including cyber and reputational.',
        },
      },
    },
    {
      unit: 'buaw',
      level: 3,
      title: 'Business Awareness',
      outcome: 2,
      outcomeTitle: 'Understand the impact of the external and internal environment on businesses, their performance and decisions',
      weighting: 20,
      lessons: LO2_LESSONS,
      cheatsheet: {
        id: 'L3-BUAW-2S',
        title: 'Outcome 2 — PESTLE, markets, sustainability',
        icon: '🗂️',
        card: {
          h: 'Everything Outcome 2 asks for, on one page',
          table: {
            headers: ['Letter', 'Covers', 'Test for it'],
            rows: [
              ['Political', 'Government policy, taxation, imports and exports, public spending', 'Is it a policy CHOICE?'],
              ['Economic', 'Interest rates, exchange rates, disposable income, cycles, inflation', 'Is it a movement in the economy?'],
              ['Social', 'Demographics, trends, unemployment', 'Is it about people and society?'],
              ['Technological', 'Changes in technology, impact on structure', 'Does it change how the work is done?'],
              ['Legal', 'Trade regulations, changes in law', 'Is it a RULE that must be obeyed?'],
              ['Environmental', 'Environmental change, sustainability', 'Is it about the natural world?'],
            ],
          },
          split: {
            left: {
              title: 'Along the curve vs a shift',
              items: [
                'The price itself changed → move ALONG',
                'Anything else changed → the curve SHIFTS',
                'Input costs → supply shifts',
                'Incomes, tastes, substitutes → demand shifts',
              ],
            },
            right: {
              title: 'Types of good',
              items: [
                'Normal — demand rises with income',
                'Necessity — demand barely moves with price',
                'Substitutes — A dearer, so more B',
                'Complements — A dearer, so less B',
              ],
            },
          },
          formula: 'Revenue = price × volume · A price cut raises revenue only if volume rises by more, in percentage terms',
          callout: {
            kind: 'key',
            text: 'Sustainability = meeting present needs without compromising future generations’. THREE aspects: social, ecological/environmental, economic/financial. The economic one is not optional.',
          },
          examtrap: 'Demand-pull inflation is buyers competing; cost-push is supplying becoming dearer. Cost-push with weak demand is the squeeze that cannot be passed on.',
        },
      },
    },
    {
      unit: 'buaw',
      level: 3,
      title: 'Business Awareness',
      outcome: 3,
      outcomeTitle: 'Understand how businesses and accountants comply with principles of professional ethics',
      weighting: 20,
      lessons: LO3_LESSONS,
      cheatsheet: {
        id: 'L3-BUAW-3S',
        title: 'Outcome 3 — principles, threats, conflicts, laundering',
        icon: '🗂️',
        card: {
          h: 'Everything Outcome 3 asks for, on one page',
          table: {
            headers: ['Principle', 'One line', 'Breached by'],
            rows: [
              ['Integrity', 'Honesty', 'Association with misleading information, including by silence'],
              ['Objectivity', 'Independence of judgement', 'Bias, conflict of interest, or pressure'],
              ['Professional competence and due care', 'Current knowledge, careful work', 'Work beyond your ability; lapsed CPD'],
              ['Confidentiality', 'Do not disclose or use it', 'Disclosure without authority, during or after'],
              ['Professional behaviour', 'Obey the law; do not discredit the profession', 'Conduct that brings the profession into disrepute'],
            ],
          },
          split: {
            left: {
              title: 'Five threats',
              items: [
                'Self-interest — you gain or lose personally',
                'Self-review — judging your own earlier work',
                'Advocacy — promoting a position too far',
                'Familiarity — too close to question it',
                'Intimidation — deterred by pressure',
              ],
            },
            right: {
              title: 'Money laundering',
              items: [
                'Placement → layering → integration',
                'Failure to disclose — not reporting a suspicion',
                'Tipping off — telling the suspect',
                'Prejudicing an investigation — any person',
                'SUSPICION is the threshold, not proof',
              ],
            },
          },
          flow: ['Establish the facts', 'Raise internally', 'Take confidential advice', 'External disclosure, with advice', 'Resign'],
          callout: {
            kind: 'key',
            text: 'Where a threat cannot be reduced to an acceptable level, the accountant must NOT continue: decline, withdraw, or ultimately resign. Documenting it is not a safeguard.',
          },
          examtrap: 'Compliance with the law is a MINIMUM. An act permitted by law is not necessarily ethical, and the professional body can act where no law was broken.',
        },
      },
    },
    {
      unit: 'buaw',
      level: 3,
      title: 'Business Awareness',
      outcome: 4,
      outcomeTitle: 'Understand the impact of new technologies in accounting and the risks associated with data security',
      weighting: 15,
      lessons: LO4_LESSONS,
      cheatsheet: {
        id: 'L3-BUAW-4S',
        title: 'Outcome 4 — technology, cloud, data protection, cyber',
        icon: '🗂️',
        card: {
          h: 'Everything Outcome 4 asks for, on one page',
          table: {
            headers: ['Principle of data protection', 'Requires'],
            rows: [
              ['Lawfulness, fairness and transparency', 'A lawful basis, and people told'],
              ['Purpose limitation', 'Not reused for an unrelated purpose'],
              ['Data minimisation', 'Only what is needed'],
              ['Accuracy', 'Kept correct, and corrected'],
              ['Storage limitation', 'Not kept longer than needed'],
              ['Integrity and confidentiality', 'Protected against unauthorised access and loss'],
              ['Accountability', 'Compliance must be DEMONSTRABLE'],
            ],
          },
          split: {
            left: {
              title: 'Cloud accounting',
              items: [
                'Access from anywhere',
                'Remote storage — no business backups',
                'Automation capabilities',
                'Apps, plug-ins and add-ins',
                'Interaction with stakeholders',
                'Real-time data',
                'And: nothing works without a connection',
              ],
            },
            right: {
              title: 'Controls',
              items: [
                'Access levels — who can do what',
                'Security controls — firewalls, MFA, encryption',
                'Integrity controls — input, processing, output',
                'Backups, TESTED by restoring',
                'Training — the only defence against phishing',
              ],
            },
          },
          callout: {
            kind: 'key',
            text: 'Blockchain = shared and immutable. Automation moves the work, not the accountability. Outsourcing is WHO; offshoring is WHERE.',
          },
          examtrap: 'A cyberattack risks data AND operations. An answer that covers only stolen data has covered half of it, and usually the smaller half.',
        },
      },
    },
    {
      unit: 'buaw',
      level: 3,
      title: 'Business Awareness',
      outcome: 5,
      outcomeTitle: 'Communicate information to stakeholders',
      weighting: 20,
      lessons: LO5_LESSONS,
      cheatsheet: {
        id: 'L3-BUAW-5S',
        title: 'Outcome 5 — good information, big data, charts, communication',
        icon: '🗂️',
        card: {
          h: 'Everything Outcome 5 asks for, on one page',
          table: {
            headers: ['Level', 'Detail', 'Horizon', 'Source'],
            rows: [
              ['Operational', 'High, exact', 'Days', 'Internal'],
              ['Managerial / tactical', 'Summarised', 'Months', 'Mostly internal'],
              ['Corporate / strategic', 'Highly summarised', 'Years', 'Much of it external'],
            ],
          },
          split: {
            left: {
              title: 'Big data — five Vs',
              items: [
                'Volume — how much',
                'Velocity — how fast',
                'Variety — how many forms',
                'Veracity — can it be trusted',
                'Value — is anything useful in it',
              ],
            },
            right: {
              title: 'Choosing a form',
              items: [
                'Trend over time → line',
                'Comparing categories → bar',
                'Parts of one whole, few slices → pie',
                'Exact figures to read off → table',
                'Two dimensions → matrix',
                'A process → diagram',
              ],
            },
          },
          flow: ['Who is it for?', 'What must they DO?', 'How urgent?', 'Is a record needed?', 'How sensitive?'],
          callout: {
            kind: 'key',
            text: 'Good information: accurate, complete, relevant, timely, understandable, reliable, cost-effective, accessible. Accuracy and timeliness trade off — accurate enough, in time, is the standard.',
          },
          examtrap: 'A truncated axis exaggerating a small change is misleading presentation, and being associated with it engages INTEGRITY. It is not a matter of taste.',
        },
      },
    },
  ];

  function byOutcome() {
    var out = {};
    QUESTIONS.forEach(function (q) { (out[q.lo] = out[q.lo] || []).push(q); });
    return out;
  }

  var API = { AAT3_BUAW_PATH: PATH, AAT3_BUAW_PRACTICE: { QUESTIONS: QUESTIONS, byOutcome: byOutcome } };
  if (typeof module === 'object' && module.exports) module.exports = API;
  else { root.AAT3_BUAW_PATH = PATH; root.AAT3_BUAW_PRACTICE = { QUESTIONS: QUESTIONS, byOutcome: byOutcome }; }
}(typeof self !== 'undefined' ? self : this));
