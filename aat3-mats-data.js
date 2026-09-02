/* AAT Level 3 — Management Accounting Techniques.
 *
 * Teaching content and practice questions for MATS, in its own file for the
 * same reason FAPS has one: three units in one file would be most of a
 * megabyte of course material behind a single load.
 *
 * WHAT IS WRITTEN, AND WHAT IS NOT
 *
 * MATS is 120 guided learning hours and 30% of the qualification — second only
 * to FAPS — so it arrives outcome by outcome, as FAPS did. The path shows all
 * seven outcomes whichever are written, because a reader has to be able to tell
 * a part-built unit from a short specification. Nothing is hidden and nothing
 * is implied.
 *
 * Every lesson declares the key concepts it covers in `criteria`, checked by
 * scripts/check-aat3-coverage.js against the MATS spine in aat3-syllabus.js,
 * which is itself checked against the published specification text by
 * scripts/check-aat3-syllabus-fidelity.js.
 *
 * NO TAX FIGURES, as with FAPS. This unit rests on costing arithmetic, not on a
 * Finance Act, so the money in it is illustrative and will read the same in
 * five years.
 *
 * ONE HONEST LIMIT, STATED HERE AND AGAIN IN THE LESSONS. Outcome 5 is
 * spreadsheet skill — designing a workbook, building a pivot table, formatting
 * a chart axis — and this app has no spreadsheet. That is 15% of the unit. What
 * can be taught here is the knowledge around those skills: which function does
 * what, what absolute referencing is for, which auditing tool answers which
 * question, and how a management accounting spreadsheet should be laid out.
 * The doing has to happen in a real spreadsheet, and the module says so rather
 * than implying that reading about it is enough.
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
      id: 'L3-MATS-0A',
      title: 'Where this unit fits',
      icon: '🧭',
      criteria: [],
      cards: [
        {
          h: 'Accounting for the people inside the business',
          p: [
            'Financial accounting produces one set of statements a year, for people outside the business, in a form the law and the standards dictate. **Management accounting produces whatever the people inside the business need, whenever they need it, in whatever form is useful.** Nobody outside ever sees it and no standard governs it.',
            'That freedom is the whole difficulty of the unit. There is no single right layout for a cost statement, no rule that says which overhead goes where, and no auditor to tell you afterwards. What there is instead is a set of techniques, each with a question it answers well and questions it answers badly, and the skill being assessed is choosing between them and then getting the arithmetic right.',
          ],
        },
        {
          h: 'What the paper actually asks for',
          table: {
            headers: ['', ''],
            rows: [
              ['Assessment', 'Computer based — **partly computer marked, partly human marked**'],
              ['Length', '2 hours 30 minutes'],
              ['Pass mark', '70%'],
              ['Share of the qualification', '**30%** — second only to Financial Accounting'],
              ['Guided learning hours', '120 — double Tax Processes'],
              ['Unit reference', 'D/618/3582'],
            ],
          },
          p: [
            'It is the only Level 3 unit that is **not** computer marked throughout. The human-marked part is most plausibly the spreadsheet work in Outcome 5, which a machine cannot mark for layout or for whether a formula was used rather than a typed figure.',
            'Two and a half hours against 120 guided learning hours makes this a paper you sit rather than one you sprint. The pass mark is the same 70% as every other Level 3 unit, but the arithmetic here is longer than in Tax Processes and less forgiving than in Business Awareness: a transposed figure early in an overhead schedule follows you down the page, and the marks lost are the ones the rest of the task depended on.',
            'AAT publishes no task count for this unit, so none is quoted anywhere in this module. Where a figure is unknown it is left unknown rather than guessed at, because a made-up number a reader plans around is worse than no number at all.',
          ],
        },
        {
          h: 'The seven outcomes, and what each is really about',
          table: {
            headers: ['Outcome', 'The question it answers', 'Weight'],
            rows: [
              ['1 · Purpose and use', 'Why does anyone do this, and what is contribution?', '10%'],
              ['2 · Dealing with costs', 'How much did the materials, labour and overheads cost?', '15%'],
              ['3 · Attributing costs', 'Which of those costs belongs to which product?', '**20%**'],
              ['4 · Deviations from budget', 'We planned X and got Y — where did the difference come from?', '15%'],
              ['5 · Spreadsheets', 'How do you build this so somebody else can check it?', '15%'],
              ['6 · Short-term decisions', 'Should we take this order, at this price, at this volume?', '15%'],
              ['7 · Cash management', 'We are profitable — why is there no money?', '10%'],
            ],
          },
          callout: {
            kind: 'key',
            text: 'Outcome 3 is the largest single slice at 20%, and it is the one with the most arithmetic in it. Overhead attribution is where this unit is passed or failed.',
          },
        },
        {
          h: 'What this app can and cannot give you',
          p: [
            'Six of the seven outcomes are taught and tested here in full. **Outcome 5 is not, and cannot be.** It asks you to design spreadsheets, build pivot tables, apply conditional formatting and format chart axes, and none of that can be done in a question bank.',
            'What is written here for Outcome 5 is the knowledge around the skill — which function to reach for, what absolute referencing does and when it matters, which auditing tool answers which question, how a variance spreadsheet should be laid out so a reviewer can follow it. That is worth having and it is not a substitute. **Open a real spreadsheet and build the things in Outcome 5 yourself.**',
          ],
          examtrap: 'Outcome 5 is 15% of this unit — a seventh of the marks, and more than the pass margin. A student who is fluent in every other outcome and has never built a spreadsheet can still fail.',
        },
      ],
      check: [
        {
          type: 'mcq',
          q: 'What most distinguishes management accounting from financial accounting?',
          opts: [
            'It is produced for people inside the business, in whatever form is useful to them',
            'It is produced once a year in a form the accounting standards prescribe',
            'It deals only with future figures, where financial accounting deals only with past ones',
            'It is audited by an external firm before the directors can rely on it',
          ],
          ans: 0,
          exp: 'The audience is the difference, and everything else follows from it. Reporting to outsiders has to be standardised so that two businesses can be compared; reporting to your own managers does not, so it can be monthly or daily, by product or by region, and laid out however the decision needs. Management accounting uses plenty of past figures — last month\'s costs are the basis of next month\'s budget — and nobody audits it.',
        },
        {
          type: 'truefalse',
          q: 'Identify whether each statement about Management Accounting Techniques is correct.',
          statements: [
            { text: 'It is computer marked throughout, like the other Level 3 units.', answer: false },
            { text: 'Attributing costs to products is the largest single outcome.', answer: true },
            { text: 'The spreadsheet outcome is worth more than the cash management outcome.', answer: true },
          ],
          exp: 'MATS is the one Level 3 unit that is partially human marked, which is why the spreadsheet work can be assessed at all. Outcome 3 is 20%, the largest; Outcome 5 is 15% against Outcome 7\'s 10%.',
        },
      ],
    },
  ];

  /* ══════════════════════════════════════════════════════════════════════════
     OUTCOME 1 — Understand the purpose and use of management accounting (10%)
     ══════════════════════════════════════════════════════════════════════════ */

  var LO1_LESSONS = [
    {
      id: 'L3-MATS-1A',
      title: 'Costing, budgeting and internal reporting',
      icon: '🎯',
      criteria: ['MATS-1.1.1', 'MATS-1.1.2'],
      cards: [
        {
          h: 'Three jobs, one purpose',
          split: {
            left: {
              title: 'What each is for',
              items: [
                '**Costing** — what did this product, job or service actually cost us?',
                '**Budgeting** — what do we expect next period to cost and earn?',
                '**Internal reporting** — how does what happened compare with what we planned?',
              ],
            },
            right: {
              title: 'What they are used for',
              items: [
                '**Planning** — deciding what to do next',
                '**Control** — noticing when it is not going to plan, early enough to act',
                '**Decision making** — choosing between courses of action',
              ],
            },
          },
          p: [
            'The three on the left produce information; the three on the right are what it is for. Every technique in this unit belongs somewhere in that grid, and knowing which cell a technique sits in is usually enough to know when to use it.',
          ],
        },
        {
          h: 'Why accuracy is not a nicety here',
          p: [
            'A financial statement that is wrong gets corrected and restated. A management report that is wrong gets **acted on** — a product is dropped, a price is cut, a supplier is changed — and by the time anyone notices, the decision has already cost money.',
            'That is the specific reason accuracy matters more in management accounting than the absence of an audit would suggest. Nobody checks this work, and it is the work people act on.',
            'It also explains why the assessment cares so much about the small disciplines — labelling a column, stating a basis, checking that a total adds back. A management report carries no notes, no accounting policies and no auditor\'s opinion, so the only thing standing between a figure and a decision is whoever prepared it.',
          ],
          callout: {
            kind: 'key',
            text: 'Unaudited and acted on immediately. Those two facts together are why the ethical principles in this unit are not decoration.',
          },
        },
      ],
      check: [
        {
          type: 'mcq',
          q: 'A production manager wants to know whether last month went as expected. Which of the three activities answers that?',
          opts: [
            'Internal reporting, because it compares what happened with what was planned',
            'Costing, because it establishes what the products cost to make',
            'Budgeting, because the plan is what the question is about',
            'None of them — that is a financial accounting question',
          ],
          ans: 0,
          exp: 'Costing produces the actual figures and budgeting produced the expected ones, so both feed the answer, but the activity that puts them side by side and reports the difference is internal reporting. That comparison is what makes control possible: a variance nobody reports is a variance nobody acts on.',
        },
        {
          type: 'truefalse',
          q: 'Identify whether each use of management accounting information is correctly described.',
          statements: [
            { text: 'Planning is deciding what to do next period.', answer: true },
            { text: 'Control is noticing early that things are not going to plan.', answer: true },
            { text: 'Management accounts must be filed with Companies House.', answer: false },
          ],
          exp: 'Planning looks forward, control looks at the gap while there is still time to close it. Nothing produced by management accounting is filed anywhere — it is internal, which is exactly why it can be shaped to whatever the business needs.',
        },
      ],
    },
    {
      id: 'L3-MATS-1B',
      title: 'Revenue, costs, contribution and profit',
      icon: '➖',
      criteria: ['MATS-1.1.3'],
      cards: [
        {
          h: 'The one subtraction this unit is built on',
          formula: 'Contribution = Revenue − Variable costs · then · Profit = Contribution − Fixed costs',
          p: [
            '**Contribution** is what a sale leaves behind once you have paid the costs that only exist because the sale happened. It is what the sale *contributes* towards the fixed costs of being in business — and, once those are covered, towards profit.',
            'The whole of Outcome 6 rests on it, and so does most of Outcome 1. If you take one thing from this unit, take the habit of separating variable costs from fixed ones before doing anything else.',
            'The reason the subtraction is done in that order is that only the first part changes when volume changes. Sell one more unit and revenue rises by the selling price and variable cost rises by the variable cost per unit; the fixed costs do not move at all. So contribution per unit stays constant while profit per unit does not, and every short-term decision in this unit is easier to reason about in the figure that stays still.',
          ],
        },
        {
          h: 'The same figures, laid out two ways',
          example: {
            title: 'A month at Calder Tools',
            rows: [
              ['', '£'],
              ['Revenue — 4,000 units at £25', '100,000'],
              ['Variable costs — 4,000 units at £14', '(56,000)'],
              ['**Contribution**', '**44,000**'],
              ['Fixed costs', '(31,000)'],
              ['**Profit**', '**13,000**'],
            ],
          },
          p: [
            'Contribution per unit is 25.00 − 14.00 = **£11.00**, and 4,000 × 11.00 = £44,000, which is the same figure reached from the top. Being able to move between the per-unit view and the total view without recalculating from scratch is most of the speed you need in the assessment.',
            'The layout is worth copying exactly. Revenue, then variable costs, then a ruled contribution line, then fixed costs, then profit — with the contribution line drawn even when the question has not asked for it. A statement that stops at profit and never shows contribution cannot be re-used when the next part of the task changes the volume, and re-using it is usually the point.',
          ],
        },
        {
          h: 'Where the fixed costs went',
          p: [
            'Notice that fixed costs appear **once, in total, at the bottom** — not spread across the 4,000 units. That is deliberate and it is the marginal costing layout. Fixed costs do not change because one more unit was sold, so attaching a slice of them to each unit tells you something that is not true of the next unit you sell.',
            'A "profit per unit" of 13,000 ÷ 4,000 = £3.25 is a real enough average of what happened, but it is a dangerous number to plan with: selling one more chisel does not add £3.25, it adds £11.00, because the fixed costs were already paid. That gap between the average and the next one is why the marginal layout exists at all.',
          ],
          examtrap: 'Contribution is not gross profit. Gross profit deducts cost of sales, which under absorption costing includes a share of fixed production overhead. Contribution deducts variable costs only, and the two figures differ whenever any production overhead is fixed.',
        },
      ],
      check: [
        {
          type: 'numeric',
          q: 'A business sells 7,500 units at £18. Variable costs are £11 a unit and fixed costs are £39,000 for the period. What is the contribution?',
          unit: '£',
          answer: 52500,
          exp: 'Contribution is revenue less VARIABLE costs only: 18.00 − 11.00 = £7.00 a unit, and 7,500 × 7.00 = £52,500. The £39,000 of fixed costs comes off after that to give a profit of 52,500 − 39,000 = £13,500, but it is no part of contribution.',
        },
        {
          type: 'numeric',
          q: 'Using the same figures — 7,500 units at £18, variable costs £11 a unit, fixed costs £39,000 — what is the profit for the period?',
          unit: '£',
          answer: 13500,
          exp: 'Contribution of £52,500 less fixed costs of £39,000 = £13,500. Working down in that order is faster and safer than building a cost per unit: fixed costs are a single deduction and never a per-unit figure in this layout.',
        },
        {
          type: 'mcq',
          q: 'Contribution per unit is £6 and the business sells 9,000 units against fixed costs of £48,000. What happens to profit if sales rise by 500 units, with no other change?',
          opts: [
            'It rises by £3,000, the contribution of the extra units',
            'It rises by £3,000 less a share of the fixed costs',
            'It rises by 500 times the full selling price',
            'It cannot be found without the selling price',
          ],
          ans: 0,
          exp: 'This is the reason contribution is worth calculating at all. Fixed costs are already covered by the first 9,000 units, so nothing about them changes when the 9,001st is sold — the whole £6 falls through to profit. 500 × 6.00 = £3,000. Deducting a further share of fixed costs charges them twice.',
        },
      ],
    },
    {
      id: 'L3-MATS-1C',
      title: 'The same figures, product by product',
      icon: '🧩',
      criteria: ['MATS-1.1.4'],
      cards: [
        {
          h: 'One total hides several stories',
          p: [
            'A business making three products has one revenue figure, one cost figure and one profit figure — and none of them tells anybody what to do. **Segmenting** means running the same subtraction separately for each product, so the question stops being "are we profitable?" and becomes "which of these is carrying the others?"',
            'The segments do not have to be products. The same statement is built by region, by customer, by channel or by branch, and the technique is identical: split revenue and variable costs by segment, stop at contribution, and leave the shared fixed costs undivided at the foot of the total column.',
            'Stopping at contribution is the discipline that makes the statement useful. Push on to a profit per product and the answer depends entirely on how the fixed costs were split — a choice made by whoever built the report, not a fact about the product.',
          ],
        },
        {
          h: 'Three products, one month',
          example: {
            title: 'Calder Tools — segmented',
            rows: [
              ['', 'Chisels £', 'Planes £', 'Saws £', 'Total £'],
              ['Revenue', '48,000', '36,000', '16,000', '100,000'],
              ['Variable costs', '(26,400)', '(19,800)', '(9,800)', '(56,000)'],
              ['**Contribution**', '**21,600**', '**16,200**', '**6,200**', '**44,000**'],
              ['Fixed costs', '', '', '', '(31,000)'],
              ['**Profit**', '', '', '', '**13,000**'],
            ],
          },
          p: [
            'Every product contributes, and the three contributions add back to the £44,000 total. Saws contribute least in pounds — but at 6,200 ÷ 16,000 that is a **38.8%** contribution to sales ratio against chisels\' 45.0% and planes\' 45.0%, so the ranking by margin is not the ranking by size.',
            'That difference is what a segmented statement is for. Judged on contribution in pounds, saws look like the product to drop; judged on the ratio, they are simply the smallest line on the page and every pound of saw revenue still leaves 38.8p behind. Which reading matters depends on what is scarce — floor space, machine hours, or nothing at all.',
          ],
        },
        {
          h: 'Why the fixed row stops at the total column',
          p: [
            'The fixed costs are shown once, against the business, and are deliberately **not** split three ways. They could be — an arbitrary split by revenue would give chisels £14,880 of them — and the resulting "profit by product" would then be a figure that changes whenever the split method changes, while nothing about the business changed at all.',
            'That is why segmented reporting stops at contribution. Contribution is a fact about the product; profit after an apportionment of fixed cost is a fact about the apportionment.',
          ],
          examtrap: 'A product showing a loss after fixed costs have been apportioned to it is not automatically a product to drop. If it still makes a positive contribution, dropping it removes the contribution and leaves the fixed costs behind — and total profit falls.',
        },
      ],
      check: [
        {
          type: 'numeric',
          q: 'A product has revenue of £62,000 and variable costs of £37,200. What is its contribution to sales ratio, as a percentage?',
          unit: '%',
          answer: 40,
          exp: 'Contribution is 62,000.00 − 37,200.00 = £24,800.00, and 24,800.00 ÷ 62,000.00 = 0.4, or 40.0%. The ratio is worth having because it is comparable across products of very different sizes, where the contribution in pounds is not.',
        },
        {
          type: 'mcq',
          q: 'Three products each make a positive contribution. After fixed costs are apportioned by revenue, one shows a loss. What follows?',
          opts: [
            'Dropping it would reduce total profit by the contribution lost',
            'Dropping it would raise total profit by the loss now shown',
            'Its variable costs must be greater than its revenue',
            'The apportionment must have been carried out wrongly',
          ],
          ans: 0,
          exp: 'The apportioned loss is an artefact of the split, not a fact about the product. The fixed costs do not disappear when the product does — they are simply reapportioned across the two that remain, which pushes one of those into a loss instead. What actually changes is that the contribution goes, so profit falls by exactly that amount.',
        },
      ],
    },
    {
      id: 'L3-MATS-1D',
      title: 'Product costs and period costs',
      icon: '📦',
      criteria: ['MATS-1.2.1'],
      cards: [
        {
          h: 'The distinction that decides when a cost hits profit',
          split: {
            left: {
              title: 'Product costs',
              items: [
                'Attach to the units made',
                'Sit in inventory until the unit is sold',
                'Reach profit or loss as part of cost of sales',
                'Direct materials, direct labour, production overhead',
              ],
            },
            right: {
              title: 'Period costs',
              items: [
                'Attach to the period, not to any unit',
                'Never enter inventory',
                'Reach profit or loss in the period they arise',
                'Administration, selling and distribution',
              ],
            },
          },
          p: [
            'The consequence is about **timing**. A product cost incurred this month on a unit that is still in the warehouse does not touch this month\'s profit at all — it is sitting in closing inventory, waiting.',
            'Nothing about the cash is different: both were paid when they were paid. What differs is the month in which each one is allowed to reduce reported profit, and for a product cost that month is decided by the customer rather than by the supplier.',
          ],
        },
        {
          h: 'Where the two costing techniques part company',
          p: [
            'Both techniques agree that direct materials and direct labour are product costs. They disagree about **fixed production overhead**.',
            'Under **absorption costing** it is a product cost: a share of it attaches to every unit made, and the share on unsold units is carried forward in the value of closing inventory. Under **marginal costing** only variable costs enter inventory, and the fixed production overhead is written off in full as a period cost of the month it arose.',
          ],
          callout: {
            kind: 'key',
            text: 'One question decides everything that follows: does fixed production overhead go into inventory, or straight to profit or loss? Absorption says into inventory. Marginal says straight through.',
          },
        },
      ],
      check: [
        {
          type: 'picklist',
          q: 'Classify each cost under absorption costing.',
          picklist: {
            title: 'Absorption costing',
            rowHeader: 'Cost',
            choiceHeader: 'Classification',
            options: ['Product cost', 'Period cost'],
            rows: [
              { text: 'Timber used in the units made', answer: 0 },
              { text: 'Wages of the machine operators', answer: 0 },
              { text: 'Rent of the factory', answer: 0 },
              { text: 'Salary of the sales director', answer: 1 },
              { text: 'Advertising in a trade magazine', answer: 1 },
              { text: 'Depreciation of the office photocopier', answer: 1 },
            ],
          },
          exp: 'Under absorption costing everything incurred to MAKE the units is a product cost, fixed production overhead included — so factory rent attaches to the units and is carried in inventory. Everything incurred to sell them or to run the business is a period cost. The factory rent row is the one that would change under marginal costing, where it becomes a period cost.',
        },
        {
          type: 'truefalse',
          q: 'Identify whether each statement about what enters inventory is correct.',
          statements: [
            { text: 'Under marginal costing, fixed production overhead is written off in full in the period it arises.', answer: true },
            { text: 'Under absorption costing, some fixed production overhead can be carried forward in closing inventory.', answer: true },
            { text: 'Selling costs are a product cost under absorption costing.', answer: false },
          ],
          exp: 'The first two are the definitions of the two techniques, and are opposite sides of the same question. The third is the common overreach: absorption costing absorbs PRODUCTION overhead into units, not selling or administrative overhead, which stay period costs under both techniques.',
        },
      ],
    },
    {
      id: 'L3-MATS-1E',
      title: 'Marginal against absorption, and when each is right',
      icon: '⚖️',
      criteria: ['MATS-1.2.2', 'MATS-1.2.3', 'MATS-1.2.4'],
      cards: [
        {
          h: 'The profit difference, and where it comes from',
          formula: 'Difference in profit = Change in inventory units × Fixed production overhead per unit',
          p: [
            'The two techniques report different profits whenever inventory moves, and by exactly that amount. **Inventory rising** means some fixed overhead is carried forward instead of charged, so absorption reports the higher profit. **Inventory falling** means fixed overhead carried in from last period is released into this one, so absorption reports the lower profit.',
            'When inventory is unchanged the two agree exactly, which is a useful check: if a question tells you production equalled sales and your two profits differ, one of the statements is wrong rather than the techniques disagreeing.',
            'Over the life of a product the difference nets to nil, because every unit made is eventually sold and every pound of fixed overhead eventually reaches profit or loss. It is a question of which period bears it, not of how much there is.',
          ],
        },
        {
          h: 'The same month, both ways',
          worked: {
            title: 'Production 5,000 units, sales 4,200 units',
            problem: 'Selling price £30. Variable production cost £16 a unit. Fixed production overhead £40,000 for the month, absorbed on a normal level of 5,000 units. There was no opening inventory.',
            steps: [
              {
                do: 'Fixed overhead per unit: £40,000 ÷ 5,000 = £8.00.',
                why: 'The rate is set on the NORMAL level of activity, not on what was actually made. Here they are the same, which is what keeps this example free of under- or over-absorption.',
              },
              {
                do: 'Closing inventory: 5,000 − 4,200 = 800 units.',
                why: 'This is the number the whole comparison turns on. Nothing else in the question can make the two profits differ.',
              },
              {
                do: 'Marginal: contribution 4,200 × (£30 − £16) = £58,800, less the whole £40,000 of fixed overhead, giving £18,800.',
                why: 'Marginal costing charges the fixed overhead in full in the month it arose, whatever was made or sold. The 800 unsold units carry only their £16 of variable cost.',
              },
              {
                do: 'Absorption: full cost £16 + £8 = £24; gross profit 4,200 × (£30 − £24) = £25,200.',
                why: 'Every unit made absorbed £8 of fixed overhead, so the 4,200 sold carry £33,600 of it into cost of sales and the 800 unsold carry the remaining £6,400 into closing inventory.',
              },
              {
                do: 'Difference: £25,200 − £18,800 = £6,400, and 800 × £8 = £6,400.',
                why: 'The check that proves the working. If the difference is not the change in inventory times the overhead rate, one of the two statements is wrong.',
              },
            ],
            answer: 'Marginal £18,800 · Absorption £25,200 · difference £6,400 = 800 units × £8.00',
            tryIt: {
              q: 'Same business, next month: production 5,000 units, sales 5,400 units. By how much does MARGINAL profit exceed absorption profit?',
              answer: 3200,
              unit: '£',
              hint: 'Work out the change in inventory first, and which way it went.',
              exp: 'Inventory fell by 5,400 − 5,000 = 400 units, so 400 × £8.00 = £3,200 of fixed overhead brought forward from last month is charged this month under absorption costing on top of this month\'s own. Absorption therefore reports £3,200 LESS profit than marginal — the relationship reverses the moment inventory falls.',
            },
          },
        },
        {
          h: 'Short run, long run, and which to use',
          split: {
            left: {
              title: 'Marginal costing suits',
              items: [
                'Short-term decisions — accept the order, drop the product',
                'Break-even and CVP work',
                'Any question where fixed costs will not change',
                'Managers, because it cannot be flattered by producing for stock',
              ],
            },
            right: {
              title: 'Absorption costing suits',
              items: [
                'Valuing inventory for the financial statements — IAS 2 requires it',
                'Setting a price that must cover all costs over time',
                'Long-run profitability, where every cost has to be earned',
                'Reporting to outsiders, who compare against other businesses',
              ],
            },
          },
          p: [
            'Over the **long run** the two agree: across the life of a business every unit made is eventually sold, inventory returns to nothing, and the same fixed costs have been charged either way. The disagreement is entirely a **short-run** timing difference.',
          ],
          examtrap: 'Absorption profit rises when production rises, even if not one extra unit is sold — because more fixed overhead has been parked in inventory. That is why a manager paid on absorption profit can improve their figures by making things nobody wants, and why marginal costing is the safer basis for judging performance.',
        },
      ],
      check: [
        {
          type: 'numeric',
          q: 'Fixed production overhead is £6 a unit. Inventory rose by 1,400 units in the period. By how much does absorption profit exceed marginal profit?',
          unit: '£',
          answer: 8400,
          exp: '1,400 × 6.00 = £8,400. Inventory rising means 1,400 units\' worth of fixed overhead — £8,400 of it — was carried forward in the value of closing inventory under absorption costing instead of being charged this period, so absorption reports that much more profit.',
        },
        {
          type: 'mcq',
          q: 'In a period, sales exceeded production. Which technique reports the higher profit?',
          opts: [
            'Marginal costing, because inventory fell and absorption releases the fixed overhead carried in with it',
            'Absorption costing, because it always reports more profit than marginal costing',
            'Marginal costing, because it excludes fixed overhead from the cost of sales entirely',
            'Neither — the two techniques always agree when the figures are correct',
          ],
          ans: 0,
          exp: 'Selling more than you make means inventory fell, so units carrying last period\'s fixed overhead were sold this period and that overhead is charged now on top of this period\'s own. Absorption therefore reports the LOWER profit. Absorption is only higher when inventory rises; when it falls the relationship reverses, which is why "absorption is always higher" is wrong.',
        },
        {
          type: 'truefalse',
          q: 'Identify whether each statement about choosing a technique is correct.',
          statements: [
            { text: 'Inventory in the published financial statements must be valued on an absorption basis.', answer: true },
            { text: 'Marginal costing is the better basis for a short-term decision about accepting an extra order.', answer: true },
            { text: 'Marginal costing charges less fixed overhead in total than absorption costing does.', answer: false },
          ],
          exp: 'IAS 2 requires inventory to include a share of fixed production overhead, so financial reporting has no choice. Short-term decisions turn on what actually changes, which is variable cost, so marginal is the right tool. But nothing about marginal costing reduces the fixed overhead a business bears: both techniques charge every pound of it eventually, and differ only about when.',
        },
      ],
    },
    {
      id: 'L3-MATS-1F',
      title: 'Prime cost, marginal cost, full absorption cost',
      icon: '🧮',
      criteria: ['MATS-1.2.5'],
      cards: [
        {
          h: 'Three costs, built one on top of another',
          flow: ['Direct materials + direct labour + direct expenses', '= PRIME COST', '+ variable production overhead', '= MARGINAL COST', '+ fixed production overhead', '= FULL ABSORPTION COST'],
          p: [
            'They are cumulative, which makes them easy to build and easy to muddle. **Prime cost** is the direct costs alone. **Marginal cost** adds the overhead that varies with output. **Full absorption cost** adds a share of the overhead that does not.',
            'Notice what none of the three includes: selling, distribution and administration. Every one of these is a cost of MAKING the unit, so a cost incurred after the unit exists stays outside all three however obviously it was caused by the sale. That is why full absorption cost is not the cost of getting a unit to a customer, and quoting it as though it were is how a price ends up too low.',
          ],
        },
        {
          h: 'One unit, three answers',
          example: {
            title: 'Cost card — one Calder chisel',
            rows: [
              ['', '£ per unit', 'Running total'],
              ['Direct materials', '4.20', '4.20'],
              ['Direct labour', '5.10', '9.30'],
              ['Direct expenses — royalty per unit', '0.40', '**9.70 = prime cost**'],
              ['Variable production overhead', '1.80', '**11.50 = marginal cost**'],
              ['Fixed production overhead absorbed', '3.25', '**14.75 = full absorption cost**'],
              ['Selling and distribution', '2.00', '16.75'],
            ],
          },
          p: [
            'The last line is the trap. Selling and distribution is a real cost of £2.00 a unit and it is in **none** of the three figures, because all three are production costs. Full absorption cost is £14.75, not £16.75.',
          ],
          examtrap: 'A per-unit royalty is a DIRECT expense and belongs in prime cost. Direct expenses are rare enough that most students forget the category exists and drop the royalty into overhead, which understates prime cost and leaves the other two totals unchanged — so only one of the three answers is wrong, which makes it hard to spot.',
        },
      ],
      check: [
        {
          type: 'numeric',
          q: 'Direct materials £6.40, direct labour £7.90, direct expenses £0.70, variable production overhead £2.10, fixed production overhead £3.60, selling costs £1.50. What is the prime cost per unit?',
          unit: '£',
          answer: 15,
          exp: 'Prime cost is the direct costs only: 6.40 + 7.90 + 0.70 = £15.00. Every overhead is excluded, variable as well as fixed — the word "prime" means direct, not "everything that varies".',
        },
        {
          type: 'numeric',
          q: 'Direct materials £6.40, direct labour £7.90, direct expenses £0.70, variable production overhead £2.10, fixed production overhead £3.60, selling costs £1.50. What is the full absorption cost per unit?',
          unit: '£',
          answer: 20.7,
          exp: 'Prime cost 15.00 + variable production overhead 2.10 + fixed production overhead 3.60 = £20.70. The £1.50 of selling costs is not a production cost and is excluded — adding it would give £22.20, which is the cost of making AND selling a unit and is not what "full absorption cost" means.',
        },
        {
          type: 'mcq',
          q: 'Which figure does a marginal cost include that a prime cost does not?',
          opts: [
            'Variable production overhead',
            'Fixed production overhead',
            'Direct expenses',
            'Selling and distribution costs',
          ],
          ans: 0,
          exp: 'Marginal cost is prime cost plus the production overhead that varies with output. Fixed production overhead is the next step up, to full absorption cost. Direct expenses are already inside prime cost, and selling costs are in none of the three.',
        },
      ],
    },
  ];

  /* ══════════════════════════════════════════════════════════════════════════
     OUTCOME 2 — Use techniques required for dealing with costs (15%)

     The mechanics of the unit: what a material and an hour actually cost, how
     those costs are posted, how a store is controlled and valued, how a cost
     responds to activity, and which costing system a business should be running
     in the first place. Almost every technique here reappears inside a later
     outcome, which is why it is worth being fluent rather than merely familiar.
     ══════════════════════════════════════════════════════════════════════════ */

  var LO2_LESSONS = [
    {
      id: 'L3-MATS-2A',
      title: 'Materials and labour',
      icon: '🧱',
      criteria: ['MATS-2.1.1'],
      cards: [
        {
          h: 'The three inventory accounts a factory keeps',
          p: [
            'A retailer buys goods and sells them, so one inventory account is enough. A manufacturer buys one thing and sells another, and the transformation takes time, so it keeps **three**: raw materials waiting to be used, work in progress part-way through being made, and finished goods waiting to be sold.',
            'Cost accounting is largely the business of moving value along that chain and being able to say, at any moment, how much is sitting in each account. Every technique later in this outcome is either a way of putting a value on one of those movements or a way of explaining the balance that is left behind.',
          ],
          flow: ['Materials inventory', 'Work in progress', 'Finished goods', 'Cost of sales'],
          table: {
            headers: ['Account', 'What goes in', 'What comes out'],
            rows: [
              ['Materials inventory', 'Purchases from suppliers', 'Issues to production, and indirect issues to overhead'],
              ['Work in progress', 'Direct materials, direct labour, overhead absorbed', 'The cost of units finished in the period'],
              ['Finished goods', 'The cost of units finished', 'The cost of units sold'],
            ],
          },
        },
        {
          h: 'Direct or indirect — the classification everything hangs on',
          split: {
            left: {
              title: 'Direct',
              items: [
                'Traceable to a **specific unit, job or batch**',
                'Materials that end up in the product',
                'The pay of people who work on the product itself',
                'Goes to work in progress',
              ],
            },
            right: {
              title: 'Indirect — overhead',
              items: [
                'Caused by production, but **not by any one unit**',
                'Consumables, lubricants, cleaning materials',
                'Supervisors, maintenance staff, storekeepers',
                'Goes to the production overhead control account',
              ],
            },
          },
          p: [
            'The test is traceability, not size. A £40,000 machine leased for one department is indirect if several products pass through it; £3 of glue is direct if the job card records how much each unit took. **Direct plus direct is prime cost**: direct materials, direct labour and any direct expenses added together, before a penny of overhead.',
          ],
        },
        {
          h: 'What a direct worker actually costs',
          worked: {
            title: 'One direct worker, one week',
            problem: 'Nadia is a direct worker paid £14.00 an hour for a basic 37-hour week, with overtime at time and a half. Last week she was paid for 43 hours, 2 of which were idle time while her machine was repaired. No customer asked for the overtime.',
            steps: [
              {
                do: 'Pay every hour at the basic rate first: 43 × £14.00 = £602.00.',
                why: 'The basic rate is what an hour of her time is worth. The premium has a different cause, so keeping the two apart is what lets each be classified correctly.',
              },
              {
                do: 'Add the overtime premium. She worked 43 − 37 = 6 hours over the basic week, and the premium is half the basic rate: 6 × £7.00 = £42.00. Gross pay is £602.00 + £42.00 = £644.00.',
                why: 'Time and a half is the basic rate plus a half-rate premium. Naming the premium separately is the point of the exercise — it is the half, not the one-and-a-half, that gets different treatment.',
              },
              {
                do: 'Direct labour cost is the productive hours at the basic rate: 43 − 2 = 41 hours, and 41 × £14.00 = £574.00.',
                why: 'Direct means traceable to units. An hour spent watching a broken machine produced nothing, so there is nothing to trace it to.',
              },
              {
                do: 'Everything left is indirect: idle time of 2 × £14.00 = £28.00, plus the premium of £42.00, so £28.00 + £42.00 = £70.00 goes to production overhead.',
                why: 'The premium is indirect because no single job caused it — the week\'s workload did. It would be direct only if a named customer had asked for the overtime, because then one job did cause it.',
              },
              {
                do: 'Check the split rebuilds the pay: £574.00 + £70.00 = £644.00.',
                why: 'Classifying a cost moves it and never changes it. If the two parts do not add back to gross pay, an hour has been counted twice or dropped.',
              },
            ],
            answer: 'Direct labour £574.00 · indirect labour £70.00 · gross pay £644.00',
            tryIt: {
              q: 'A direct worker is paid £12.00 an hour and was paid for 45 hours last week, of which 5 were overtime at time and a third and 3 were idle time. No customer requested the overtime. What is the direct labour cost for the week?',
              answer: 504,
              unit: '£',
              hint: 'Direct labour is the productive hours at the basic rate — nothing else.',
              exp: '45 − 3 = 42 productive hours, and 42 × £12.00 = £504.00. The rest is indirect: the premium is a third of £12.00 on 5 hours, so 5 × £4.00 = £20.00, and idle time is 3 × £12.00 = £36.00. Gross pay of £504.00 + £20.00 + £36.00 = £560.00 splits into exactly those two parts.',
            },
          },
          examtrap: 'The overtime premium is indirect by default and direct only when a specific customer asked for the overtime. Treating the whole of an overtime hour as indirect is the other half of the same mistake — the basic rate for that hour is as direct as any other productive hour.',
        },
      ],
      check: [
        {
          type: 'picklist',
          q: 'Classify each labour cost.',
          picklist: {
            title: 'Labour in a factory',
            rowHeader: 'Cost',
            choiceHeader: 'Classification',
            options: ['Direct labour', 'Indirect labour'],
            rows: [
              { text: 'Basic pay of a machine operator for hours spent making units', answer: 0 },
              { text: 'Overtime premium paid because the factory was busy generally', answer: 1 },
              { text: 'Pay for hours a machine operator spent idle during a power cut', answer: 1 },
              { text: 'Basic pay of the factory maintenance engineer', answer: 1 },
              { text: 'Overtime premium on hours a named customer asked to be worked', answer: 0 },
            ],
          },
          exp: 'Two tests decide every row. Was the person working on the product, and did the hour produce anything? A maintenance engineer keeps the factory running but touches no unit, and an idle hour produced nothing whoever was standing there. The premium follows a third test — what caused it. A busy factory is not a job, so that premium is overhead; a customer demanding a rush is one job, so that premium belongs to it.',
        },
        {
          type: 'numeric',
          q: 'A direct worker is paid £15.00 an hour with overtime at time and a half. She was paid for 44 hours in a basic 38-hour week, and none of the hours were idle. What is the overtime premium for the week?',
          unit: '£',
          answer: 45,
          exp: '44 − 38 = 6 overtime hours, and the premium is the half above the basic rate: half of £15.00 is £7.50, so 6 × £7.50 = £45.00. Gross pay is 44 × £15.00 = £660.00 at the basic rate, and £660.00 + £45.00 = £705.00 in total — of which only the £45.00 premium is treated as overhead.',
        },
        {
          type: 'mcq',
          q: 'Which account is credited when finished units are transferred out of production into the warehouse?',
          opts: [
            'Work in progress',
            'Finished goods',
            'Materials inventory',
            'Cost of sales',
          ],
          ans: 0,
          exp: 'The units are leaving production, so work in progress is credited and finished goods debited. Materials inventory was emptied earlier, when the materials were issued into production. Cost of sales is untouched until the units are actually sold — a warehouse full of finished goods has cost the business cash but has not yet cost it any profit.',
        },
      ],
    },
    {
      id: 'L3-MATS-2B',
      title: 'Equivalent units',
      icon: '⚗️',
      criteria: ['MATS-2.1.1'],
      cards: [
        {
          h: 'The problem half-finished units create',
          p: [
            'A month\'s costs have to be shared between the units that were finished and the units still on the line. Sharing them over the finished units alone overstates every one of them; sharing them over the total number of units pretends a half-built unit cost as much as a finished one. Neither is defensible.',
            'The answer is to convert the unfinished units into the number of **finished** units the same work would have produced. Eight hundred units a quarter of the way through are, in cost terms, two hundred finished units. That figure is an **equivalent unit**, and once every unit is expressed in the same terms the cost can simply be divided.',
          ],
          formula: 'Equivalent units = units completed + (units in closing WIP × their percentage of completion)',
        },
        {
          h: 'Materials and conversion move at different speeds',
          p: [
            'Materials are usually issued in full at the start of a process, so a unit one quarter of the way through is already **100% complete for materials**. Labour and overhead — together called **conversion cost** — accumulate as the unit moves, so the same unit is only 25% complete for those.',
            'That is why the calculation is done twice: one equivalent-unit figure and one cost per equivalent unit for materials, another pair for conversion. Adding the two costs per equivalent unit gives the cost of one completed unit.',
          ],
          worked: {
            title: 'One month of a process, no opening WIP',
            problem: 'A process completed 4,200 units and transferred them out. Closing work in progress is 800 units, complete for materials and 25% complete for conversion. The month\'s costs were materials £61,000 and conversion £44,000. There was no opening work in progress.',
            steps: [
              {
                do: 'Materials equivalent units: 4,200 + 800 = 5,000. Cost per equivalent unit is £61,000 ÷ 5,000 = £12.20.',
                why: 'The whole of the material is already in the unfinished units, so they count in full. A percentage would understate the material genuinely sitting on the factory floor.',
              },
              {
                do: 'Conversion equivalent units: 800 × 25% = 200, so 4,200 + 200 = 4,400. Cost per equivalent unit is £44,000 ÷ 4,400 = £10.00.',
                why: 'Only a quarter of the labour and overhead a finished unit needs has been spent on each of those 800, so they count as 200 finished units and no more.',
              },
              {
                do: 'A completed unit therefore costs £12.20 + £10.00 = £22.20, and the finished output is worth 4,200 × £22.20 = £93,240.',
                why: 'A completed unit has taken 100% of both, so both rates apply in full to it.',
              },
              {
                do: 'Value the closing WIP on the two rates separately: 800 × £12.20 = £9,760 of materials and 200 × £10.00 = £2,000 of conversion, so £9,760 + £2,000 = £11,760.',
                why: 'This is where a single blended rate goes wrong. The WIP is complete for one element and a quarter complete for the other, so it cannot be valued at one figure per unit.',
              },
              {
                do: 'Check: £93,240 + £11,760 = £105,000, and the costs put in were £61,000 + £44,000 = £105,000.',
                why: 'Every pound that entered the process is now either in the output or in the closing WIP. If it is not, a percentage has been applied to the wrong element.',
              },
            ],
            answer: 'Cost per completed unit £22.20 · finished output £93,240 · closing WIP £11,760',
            tryIt: {
              q: 'A process completed 3,000 units. Closing work in progress is 600 units, 50% complete for conversion. Conversion cost for the month was £49,500. What is the conversion cost per equivalent unit?',
              answer: 15,
              unit: '£',
              hint: 'Convert the work in progress into finished-unit terms before dividing.',
              exp: '600 × 50% = 300 equivalent units, so 3,000 + 300 = 3,300 in total, and £49,500 ÷ 3,300 = £15.00. Dividing by 3,600 units treats a half-built unit as finished and gives £13.75; dividing by 3,000 ignores the work in progress entirely and gives £16.50.',
            },
          },
        },
        {
          h: 'Reading the percentages the question gives you',
          table: {
            headers: ['Wording in the question', 'Materials', 'Conversion'],
            rows: [
              ['"Materials are added at the start of the process"', '100% complete', 'Use the stated percentage'],
              ['"60% complete as to conversion"', '100% complete', '60% complete'],
              ['"Materials are added evenly throughout"', 'Same percentage as conversion', 'Use the stated percentage'],
              ['"40% complete", with no element named', 'Treat as 40% for both', '40% complete'],
            ],
          },
          p: [
            'Read those percentages before anything else, because they decide which of the two calculations the closing work in progress enters at full strength and which it enters at a fraction. Everything after that is division.',
          ],
          examtrap: 'The single most common loss of marks here is dividing both cost pools by the same number of equivalent units. Materials and conversion almost never share a figure, and when they do the question has said so. Two divisions, two rates, then add.',
        },
      ],
      check: [
        {
          type: 'numeric',
          q: 'A process completed 7,000 units and has 1,000 units of closing work in progress that are complete for materials. Materials cost for the period was £120,000. What is the materials cost per equivalent unit?',
          unit: '£',
          answer: 15,
          exp: 'The work in progress is complete for materials, so all 1,000 units count in full: 7,000 + 1,000 = 8,000 equivalent units, and £120,000 ÷ 8,000 = £15.00. Using 7,000 units would give £17.14 and charge the finished output with material that is physically sitting in the unfinished units.',
        },
        {
          type: 'truefalse',
          q: 'Identify whether each statement about equivalent units is correct.',
          statements: [
            { text: 'Closing work in progress is usually further advanced for materials than for conversion.', answer: true },
            { text: 'Equivalent units express unfinished work in terms of finished units.', answer: true },
            { text: 'A single cost per equivalent unit is calculated and applied to both materials and conversion.', answer: false },
          ],
          exp: 'Materials generally go in at the start and conversion accrues as the unit moves, which is exactly why the two are handled apart. A single blended rate would value closing work in progress as though it were as far through the labour as it is through the materials, and no process behaves that way. The point of the equivalent unit is to restate part-finished work on the same scale as finished work so that one division becomes possible.',
        },
        {
          type: 'mcq',
          q: 'Closing work in progress of 500 units is 40% complete for conversion. Conversion cost per equivalent unit is £8.00. What conversion cost is carried in closing work in progress?',
          opts: [
            '£1,600',
            '£4,000',
            '£2,000',
            '£3,200',
          ],
          ans: 0,
          exp: '500 × 40% = 200 equivalent units, and 200 × £8.00 = £1,600. The £4,000 answer values all 500 units as though complete; £2,000 applies the percentage to the money rather than to the units, which is a different sum with no meaning; £3,200 uses 400 units, which is 80% of the units rather than 40%.',
        },
      ],
    },
    {
      id: 'L3-MATS-2C',
      title: 'Cost accounting journals',
      icon: '📓',
      criteria: ['MATS-2.2.1', 'MATS-2.2.2'],
      cards: [
        {
          h: 'A second set of books, with its own accounts',
          p: [
            'Cost bookkeeping records the same transactions the financial ledger does, but arranged so that the cost of a unit can be read off at the end. It uses **control accounts** — materials inventory, wages, production overhead, work in progress, finished goods — and every entry is a movement between two of them.',
            'The whole system is driven by one decision made over and over: **is this cost direct or indirect?** Direct costs are debited to work in progress and become part of a unit. Indirect costs are debited to production overhead control and wait there until they are absorbed. Get that one classification right and the journals follow from it mechanically.',
          ],
        },
        {
          h: 'Every journal in the cycle',
          table: {
            headers: ['When', 'Debit', 'Credit'],
            rows: [
              ['Materials bought on credit', 'Materials inventory control', 'Payables'],
              ['Direct materials issued to production', 'Work in progress', 'Materials inventory control'],
              ['Indirect materials issued', 'Production overhead control', 'Materials inventory control'],
              ['Gross wages incurred', 'Wages control', 'Bank and payroll payables'],
              ['Direct labour analysed out', 'Work in progress', 'Wages control'],
              ['Indirect labour analysed out', 'Production overhead control', 'Wages control'],
              ['Other production overheads incurred', 'Production overhead control', 'Bank or payables'],
              ['Overhead absorbed into units', 'Work in progress', 'Production overhead control'],
              ['Units completed', 'Finished goods', 'Work in progress'],
              ['Units sold', 'Cost of sales', 'Finished goods'],
              ['Under-absorbed overhead written off', 'Cost of sales', 'Production overhead control'],
              ['Over-absorbed overhead written back', 'Production overhead control', 'Cost of sales'],
            ],
          },
          callout: {
            kind: 'key',
            text: 'Wages control and production overhead control are both staging posts. Every pound that lands in either one has to leave it again, and the account should be empty at the end of the period — except for the under- or over-absorption, which is the one balance that is deliberately cleared to profit or loss.',
          },
        },
        {
          h: 'A month of postings, in order',
          worked: {
            title: 'Analysing one month into the cost ledger',
            problem: 'In May, materials of £96,000 were issued from stores, of which £11,000 were indirect. Wages of £74,000 were incurred, of which £18,000 were indirect. Other production overheads of £43,000 were paid. Overhead is absorbed at a predetermined rate and £70,000 was absorbed in the month.',
            steps: [
              {
                do: 'Split the materials issue: £96,000 − £11,000 = £85,000 to work in progress and £11,000 to production overhead control, crediting materials inventory with the whole £96,000.',
                why: 'The stores lost £96,000 of stock however it will be used. Only the destination is in question, which is why one credit faces two debits.',
              },
              {
                do: 'Split the wages the same way: £74,000 − £18,000 = £56,000 to work in progress and £18,000 to production overhead control, clearing wages control.',
                why: 'Wages control holds the gross pay for as long as it takes to analyse it. Leaving a balance there means some hours have not been classified.',
              },
              {
                do: 'Post the cash overheads: debit production overhead control with £43,000. The account now holds £11,000 + £18,000 + £43,000 = £72,000.',
                why: 'Overhead arrives from three directions — indirect materials, indirect labour and everything bought directly. The control account is where they are gathered into one figure.',
              },
              {
                do: 'Absorb: debit work in progress and credit production overhead control with £70,000.',
                why: 'Absorption is what moves overhead into the product. The figure is the predetermined rate times actual activity, so it is not expected to equal what was incurred.',
              },
              {
                do: 'Clear what is left: £72,000 − £70,000 = £2,000 remains as a debit, so overhead was under-absorbed. Debit cost of sales and credit production overhead control with £2,000.',
                why: 'A debit balance means more was spent than was charged to units. It cannot stay in an overhead account into the next month, so it goes to profit or loss in the month it arose.',
              },
            ],
            answer: 'Work in progress debited £85,000 + £56,000 + £70,000 = £211,000 · £2,000 under-absorbed, written off to cost of sales',
            tryIt: {
              q: 'Materials of £58,000 were issued from stores in June, of which £7,500 were indirect. How much is debited to work in progress?',
              answer: 50500,
              unit: '£',
              hint: 'Only the direct part reaches a unit.',
              exp: '£58,000 − £7,500 = £50,500 is debited to work in progress, and the £7,500 of indirect materials is debited to production overhead control instead. Materials inventory is credited with the whole £58,000, because the whole £58,000 physically left the stores.',
            },
          },
        },
      ],
      check: [
        {
          type: 'picklist',
          q: 'Identify the account debited by each cost accounting journal.',
          picklist: {
            title: 'The debit side',
            rowHeader: 'Transaction',
            choiceHeader: 'Account debited',
            options: ['Work in progress', 'Production overhead control', 'Finished goods'],
            rows: [
              { text: 'Direct materials issued from stores', answer: 0 },
              { text: 'Indirect labour analysed out of wages control', answer: 1 },
              { text: 'Production overhead absorbed into units', answer: 0 },
              { text: 'Completed units transferred out of production', answer: 2 },
              { text: 'Factory rent paid by bank transfer', answer: 1 },
            ],
          },
          exp: 'Anything that becomes part of a unit is debited to work in progress, and absorbed overhead qualifies — absorption is the moment overhead stops being a factory cost and becomes a unit cost. Anything indirect goes to the overhead control account to wait for that moment. Finished goods is debited only once, when the units leave production complete.',
        },
        {
          type: 'truefalse',
          q: 'Identify whether each statement about cost accounting journals is correct.',
          statements: [
            { text: 'The production overhead control account is credited when overhead is absorbed into units.', answer: true },
            { text: 'Indirect materials are debited to work in progress along with direct materials.', answer: false },
            { text: 'A credit balance on the production overhead control account at the period end means overhead was under-absorbed.', answer: false },
          ],
          exp: 'Absorption takes overhead out of the control account and into work in progress, so the control account is credited. Indirect materials never reach work in progress directly; they arrive later, inside the absorbed figure. And a credit balance means more was absorbed than was incurred, which is over-absorption — the direction that increases reported profit when it is cleared.',
        },
        {
          type: 'mcq',
          q: 'Overhead of £64,000 was incurred and £67,500 was absorbed. Which journal clears the production overhead control account?',
          opts: [
            'Debit production overhead control £3,500, credit cost of sales £3,500',
            'Debit cost of sales £3,500, credit production overhead control £3,500',
            'Debit production overhead control £3,500, credit work in progress £3,500',
            'Debit work in progress £3,500, credit production overhead control £3,500',
          ],
          ans: 0,
          exp: '£67,500 − £64,000 = £3,500 more was absorbed than spent, so the account carries a credit balance and is over-absorbed. Clearing a credit balance needs a debit to the account itself, with the relief going to cost of sales — which reduces cost of sales and raises reported profit. The two work in progress entries would push the difference back into the units, which defeats the purpose of a predetermined rate.',
        },
      ],
    },
    {
      id: 'L3-MATS-2D',
      title: 'Inventory control levels and the EOQ',
      icon: '📦',
      criteria: ['MATS-2.3.1'],
      cards: [
        {
          h: 'Four levels, each answering a different question',
          p: [
            'Holding inventory costs money — capital tied up, space, insurance, and the risk of obsolescence. Running out costs more: idle machines, late deliveries, lost customers. Inventory control levels are the arithmetic that sits between those two, and each level answers one question.',
          ],
          table: {
            headers: ['Level', 'The question it answers', 'How it is found'],
            rows: [
              ['Buffer inventory', 'How much do we hold back for a bad week?', 'Re-order level − (average usage × average lead time)'],
              ['Re-order level', 'At what balance do we place the order?', '(average usage × average lead time) + buffer inventory'],
              ['Minimum re-order quantity', 'What is the least we can sensibly order?', 'Average usage × average lead time'],
              ['Maximum inventory level', 'How high should the balance ever go?', 'Buffer inventory + maximum re-order quantity'],
              ['Maximum re-order quantity', 'What is the most we can sensibly order?', 'Maximum inventory level − buffer inventory'],
            ],
          },
          callout: {
            kind: 'key',
            text: 'The specification says twice that you will be GIVEN one of each pair and asked for the other — either buffer inventory or re-order level, and either maximum inventory level or maximum re-order quantity. So the skill being assessed is rearranging the relationship, not memorising two separate formulas.',
          },
        },
        {
          h: 'Working the levels',
          worked: {
            title: 'One component, one set of levels',
            problem: 'Average usage of a component is 400 kg a week and the average lead time is 3 weeks. The buffer inventory is set at 500 kg and the maximum re-order quantity is 2,400 kg.',
            steps: [
              {
                do: 'Minimum re-order quantity = average usage × average lead time = 400 × 3 = 1,200 kg.',
                why: 'That is what will be consumed while the order is in transit. Order less and the buffer is being eaten into before the delivery even lands.',
              },
              {
                do: 'Re-order level = (400 × 3) + 500, so 1,200 + 500 = 1,700 kg.',
                why: 'Placing the order at 1,700 kg means the usage during the lead time is covered, and on an average week the delivery arrives with the buffer still untouched.',
              },
              {
                do: 'Maximum inventory level = buffer inventory + maximum re-order quantity = 500 + 2,400 = 2,900 kg.',
                why: 'The highest the store should ever hold: a full order arriving on a day the buffer has not been dipped into. Anything above that is cash sitting on a shelf.',
              },
            ],
            answer: 'Minimum re-order quantity 1,200 kg · re-order level 1,700 kg · maximum inventory level 2,900 kg',
            tryIt: {
              q: 'Average usage is 250 units a week, average lead time is 4 weeks and the re-order level is 1,300 units. What is the buffer inventory?',
              answer: 300,
              unit: 'units',
              hint: 'Rearrange the re-order level relationship.',
              exp: 'Usage during the lead time is 250 × 4 = 1,000 units, and the re-order level is that plus the buffer, so the buffer is 1,300 − 1,000 = 300 units. The assessment hands you one side of the pair and asks for the other, which is why the relationship matters more than the formula.',
            },
          },
        },
        {
          h: 'The economic order quantity',
          p: [
            'The levels say **when** to order. The EOQ says **how much**. Two costs pull against each other: every order costs something to place regardless of its size, so large orders are cheap to administer; every unit held costs something to keep, so large orders are expensive to store. The EOQ is the quantity where the two are equal and their total is at its lowest.',
          ],
          formula: 'EOQ = √((2 × annual usage × ordering cost) ÷ inventory holding cost)',
          worked: {
            title: 'Balancing ordering against holding',
            problem: 'A component is used at 40,000 units a year. Placing an order costs £25 whatever its size, and holding one unit for a year costs £0.50.',
            steps: [
              {
                do: 'Work out the top of the fraction: 2 × 40,000 × 25 = 2,000,000.',
                why: 'Annual usage and ordering cost both push the order size up — the more you use and the dearer it is to order, the fewer and larger the orders should be.',
              },
              {
                do: 'Divide by the holding cost: 2,000,000 ÷ 0.50 = 4,000,000.',
                why: 'Holding cost pulls the other way. It sits underneath because a dearer store means smaller, more frequent deliveries.',
              },
              {
                do: 'Take the square root: the root of 4,000,000 is 2,000 units.',
                why: 'The root is what turns the expression into a quantity rather than a cost. Forgetting it leaves an answer in the millions, which is the tell that it has been missed.',
              },
              {
                do: 'Sense-check it against usage: 40,000 ÷ 2,000 = 20 orders a year, or one every two or three weeks.',
                why: 'An EOQ implying two orders a decade, or one a day, usually means the holding cost was entered per month instead of per year — or the other way round.',
              },
            ],
            answer: '2,000 units an order, which is 20 orders a year',
            tryIt: {
              q: 'Annual usage is 45,000 units, each order costs £25 to place and holding one unit for a year costs £1.00. What is the economic order quantity?',
              answer: 1500,
              unit: 'units',
              hint: 'Top of the fraction first, then divide, then take the root.',
              exp: '2 × 45,000 × 25 = 2,250,000, and 2,250,000 ÷ 1.00 = 2,250,000, whose square root is 1,500 units. Notice that doubling the holding cost from £0.50 to £1.00 has not halved the order quantity — the root means the EOQ always moves far less than the costs driving it.',
            },
          },
        },
        {
          h: 'When the policy is being broken',
          split: {
            left: {
              title: 'Signs of a breach',
              items: [
                'The balance was **below the re-order level** and no order had been placed',
                'An order took the balance **above the maximum inventory level**',
                'An order was **smaller than the minimum re-order quantity**',
                'The balance fell **into the buffer** on an ordinary week',
              ],
            },
            right: {
              title: 'What it costs',
              items: [
                'Ordering late risks a **stockout** and idle production',
                'Ordering too much ties up cash and risks obsolescence',
                'Ordering too little multiplies the ordering cost',
                'A buffer used routinely is not a buffer at all',
              ],
            },
          },
          p: [
            'An assessment task will often hand you a stores record and ask whether the policy was complied with. Work down the balances, mark the point each order was placed, and compare it with the levels — the answer is nearly always visible without any arithmetic beyond a subtraction.',
          ],
        },
      ],
      check: [
        {
          type: 'numeric',
          q: 'Average usage of a material is 350 kg a week and the average lead time is 2 weeks. Buffer inventory is 400 kg. What is the re-order level?',
          unit: 'kg',
          answer: 1100,
          exp: 'Usage during the lead time is 350 × 2 = 700 kg, and the re-order level adds the buffer on top: 700 + 400 = 1,100 kg. Ordering at 700 kg would leave nothing spare if the delivery ran a day late, which is precisely the event the buffer exists for.',
        },
        {
          type: 'truefalse',
          q: 'Identify whether each statement about inventory control is correct.',
          statements: [
            { text: 'The economic order quantity is the order size at which total ordering and holding costs are lowest.', answer: true },
            { text: 'The maximum inventory level is the buffer inventory plus the maximum re-order quantity.', answer: true },
            { text: 'A higher cost of placing an order produces a smaller economic order quantity.', answer: false },
          ],
          exp: 'The EOQ is defined as the low point of the two costs added together, which is also where they happen to be equal. The maximum level is what the store holds when a full order lands on an untouched buffer. And a dearer ordering cost pushes the quantity UP, not down — if each order is expensive to place you place fewer and larger ones, which is why ordering cost sits on top of the fraction.',
        },
        {
          type: 'mcq',
          q: 'A business halves the cost of holding one unit for a year. What happens to its economic order quantity?',
          opts: [
            'It rises, but by less than double, because of the square root',
            'It doubles, because the holding cost is halved',
            'It halves, because holding cost drives the quantity down',
            'It is unchanged, because annual usage has not moved',
          ],
          ans: 0,
          exp: 'Holding cost sits underneath the fraction, so halving it doubles what is inside the root — and the root of double is about 1.41, not 2. An EOQ of 2,000 units becomes roughly 2,828. The square root is what makes every EOQ answer less sensitive to its inputs than intuition suggests, and it is the step most often left out.',
        },
      ],
    },
    {
      id: 'L3-MATS-2E',
      title: 'FIFO and AVCO',
      icon: '🗃️',
      criteria: ['MATS-2.3.2', 'MATS-2.3.3'],
      cards: [
        {
          h: 'Two ways to price the same issue',
          split: {
            left: {
              title: 'FIFO — first in, first out',
              items: [
                'Issues are priced at the cost of the **oldest** units held',
                'The store is kept as dated layers',
                'Closing inventory is valued at the **most recent** prices',
                'Permitted by IAS 2 for the financial statements',
              ],
            },
            right: {
              title: 'AVCO — weighted average',
              items: [
                'Issues are priced at the **average** cost of everything held',
                'The average is recalculated on **every receipt**',
                'Closing inventory is valued at that same average',
                'Also permitted by IAS 2',
              ],
            },
          },
          p: [
            'Neither method claims to describe which physical units left the store. They are **pricing** conventions, and the choice between them changes the reported figures without changing a single unit or a single pound of cash. What FIFO assumes is that the oldest cost is used up first; what AVCO assumes is that one unit in the store is indistinguishable from another.',
          ],
        },
        {
          h: 'The same month, both ways',
          example: {
            title: 'Component ledger, May',
            rows: [
              ['Date', 'Movement', 'FIFO balance £', 'AVCO balance £'],
              ['1 May', 'Opening 200 units at £5.00', '1,000', '1,000'],
              ['8 May', 'Receipt 300 units at £6.00', '2,800', '2,800'],
              ['15 May', 'Issue 400 units', '(2,200)', '(2,240)'],
              ['15 May', 'Balance 100 units', '600', '560'],
              ['22 May', 'Receipt 100 units at £7.00', '1,300', '1,260'],
              ['**31 May**', '**Closing 200 units**', '**1,300**', '**1,260**'],
            ],
          },
          p: [
            'FIFO empties the 200 units at £5.00 first and then takes 200 of the £6.00 units, so the issue is 1,000 + 1,200 = **£2,200** and the 100 units left are the newer ones at £6.00.',
            'AVCO averages before it issues: 500 units holding £2,800 is £5.60 each, so the issue is 400 × £5.60 = **£2,240** and the 100 units left are worth £560. Both methods have accounted for the same £3,500 of purchases and opening stock — they have simply drawn the line between issue and balance in different places.',
          ],
        },
        {
          h: 'Working an AVCO issue',
          worked: {
            title: 'Recalculating the average, then issuing',
            problem: 'Opening inventory is 100 units at £4.00. A receipt of 400 units at £5.50 arrives, and 300 units are then issued. The business uses AVCO.',
            steps: [
              {
                do: 'Put values on both sides: 100 × £4.00 = £400 held, and the receipt is 400 × £5.50 = £2,200.',
                why: 'AVCO works on money, not on layers, so both the balance and the receipt have to be expressed as a value before anything can be averaged.',
              },
              {
                do: 'Recompute the average across the whole balance: £400 + £2,200 = £2,600 over 500 units, so £2,600 ÷ 500 = £5.20 a unit.',
                why: 'The average is recalculated on every receipt, not at the month end. An issue made the day before this delivery would have gone out at £4.00.',
              },
              {
                do: 'Price the issue at the new average: 300 × £5.20 = £1,560.',
                why: 'Every unit in the store is now worth the same, which is the practical appeal of AVCO — there are no layers to keep track of and no dates to match.',
              },
              {
                do: 'The balance follows: £2,600 − £1,560 = £1,040, which is 200 × £5.20 = £1,040.',
                why: 'Under AVCO the closing value can always be checked two ways, and they must agree. Under FIFO they cannot, because the remaining units are not all at one price.',
              },
            ],
            answer: 'Issue £1,560 · closing inventory 200 units valued at £1,040',
            tryIt: {
              q: 'The same store — 100 units at £4.00, then a receipt of 400 units at £5.50 — issues 300 units, but under FIFO. What is the value of the issue?',
              answer: 1500,
              unit: '£',
              hint: 'Empty the oldest layer completely before touching the next one.',
              exp: 'FIFO takes all 100 units at £4.00 and then 200 of the newer ones: 100 × £4.00 = £400 and 200 × £5.50 = £1,100, so £400 + £1,100 = £1,500. AVCO charged £1,560 for the identical movement, and that £60 gap is the whole of the argument between the two methods.',
            },
          },
        },
        {
          h: 'What the choice does to the reported figures',
          table: {
            headers: ['When prices are rising', 'FIFO', 'AVCO'],
            rows: [
              ['Cost of the issue', 'Lower — old, cheap units go first', 'Higher — the average has been pulled up'],
              ['Closing inventory value', 'Higher — the newest prices remain', 'Lower — valued at the average'],
              ['Reported gross profit', 'Higher', 'Lower'],
              ['Effect over the life of the inventory', 'None — the difference reverses', 'None — the difference reverses'],
            ],
          },
          examtrap: 'Neither method is more correct than the other, and neither changes the cash. What moves is the split of the same total between this period\'s cost of sales and the balance carried forward, so a business does not become more profitable by switching. Consistency is what matters: IAS 2 requires the same formula for inventories of a similar nature and use, and a change of policy has to be justified as giving better information rather than a better-looking period.',
        },
      ],
      check: [
        {
          type: 'numeric',
          q: 'A store holds 300 units at £9.00 and receives 500 units at £11.00. It then issues 600 units using FIFO. What is the value of the issue?',
          unit: '£',
          answer: 6000,
          exp: 'FIFO empties the oldest layer first: all 300 units at £9.00, then 300 of the newer ones at £11.00. 300 × £9.00 = £2,700 and 300 × £11.00 = £3,300, so £2,700 + £3,300 = £6,000. The 200 units left are all from the newer layer and are valued at £2,200.',
        },
        {
          type: 'numeric',
          q: 'A store holds 300 units at £9.00 and receives 500 units at £11.00. It then issues 600 units using AVCO. What is the value of the issue?',
          unit: '£',
          answer: 6150,
          exp: '300 × £9.00 = £2,700 and 500 × £11.00 = £5,500, so £2,700 + £5,500 = £8,200 across 800 units, and £8,200 ÷ 800 = £10.25 each. The issue is 600 × £10.25 = £6,150, which is £150 more than FIFO charged for exactly the same 600 units — and the closing balance is £150 lower to match.',
        },
        {
          type: 'mcq',
          q: 'Prices have been rising all year. Compared with AVCO, what does FIFO report?',
          opts: [
            'A higher closing inventory and a higher gross profit',
            'A higher closing inventory and a lower gross profit',
            'A lower closing inventory and a higher gross profit',
            'A lower closing inventory and a lower gross profit',
          ],
          ans: 0,
          exp: 'FIFO issues the old, cheap units first, so cost of sales is lower and profit is higher. What is left in the store is the newest and dearest stock, so closing inventory is higher too — the two move together, because whatever is not charged to cost of sales stays in the balance. The effect is a timing difference that reverses once the cheap layer is gone.',
        },
      ],
    },
    {
      id: 'L3-MATS-2F',
      title: 'Cost behaviours and the high-low method',
      icon: '📈',
      criteria: ['MATS-2.4.1', 'MATS-2.4.2'],
      cards: [
        {
          h: 'Four ways a cost responds to activity',
          table: {
            headers: ['Behaviour', 'What it does as output rises', 'Examples'],
            rows: [
              ['Fixed', 'Stays the same in total, whatever is produced', 'Factory rent, insurance, a salaried supervisor'],
              ['Variable', 'Rises in direct proportion to output', 'Direct materials, piece-rate labour, sales commission'],
              ['Semi-variable', 'Rises, but starts above zero', 'A phone bill with a line rental plus call charges'],
              ['Stepped', 'Flat, then jumps, then flat again', 'A supervisor for every 20 machines; a second delivery van'],
            ],
          },
          p: [
            'Every technique in this qualification that forecasts a cost, sets a budget or tests a decision needs to know which of these four it is dealing with. Get the behaviour wrong and the arithmetic afterwards is beside the point.',
            'One warning about **stepped** costs: they are fixed within a range and the range is what matters. Calling them fixed is safe only while output stays inside the current step, which is exactly the assumption a growth plan breaks.',
          ],
        },
        {
          h: 'In total, or per unit — the reversal that catches people',
          table: {
            headers: ['Cost', 'As output rises, in TOTAL', 'As output rises, PER UNIT'],
            rows: [
              ['Fixed', 'Unchanged', 'Falls'],
              ['Variable', 'Rises in proportion', 'Unchanged'],
              ['Semi-variable', 'Rises, but not in proportion', 'Falls, towards the variable rate'],
              ['Stepped', 'Unchanged, then jumps', 'Falls, then jumps, then falls again'],
            ],
          },
          p: [
            'A fixed cost is only fixed **in total**. Spread over more units it falls per unit, and that fall is the whole of what "economies of scale" means in a costing context. A variable cost behaves the other way round: constant per unit, rising in total.',
          ],
          callout: {
            kind: 'key',
            text: 'Read the question twice for the words "in total" and "per unit". A statement that is plainly true of one is usually plainly false of the other, and true/false grids are built out of exactly that pair.',
          },
        },
        {
          h: 'Splitting a semi-variable cost',
          p: [
            'A semi-variable cost has to be separated into its fixed and variable parts before it can be forecast. The **high-low method** does it with two observations: the highest activity level and the lowest. Everything between them is ignored, which is the method\'s weakness and the reason it is quick.',
          ],
          worked: {
            title: 'Two points, two elements',
            problem: 'Maintenance cost was £58,000 at an output of 12,000 units and £82,000 at an output of 20,000 units. Fixed costs did not change between the two levels.',
            steps: [
              {
                do: 'Take both differences: £82,000 − £58,000 = £24,000, across 20,000 − 12,000 = 8,000 units.',
                why: 'The fixed element is the same at both levels, so it cancels out of the subtraction. Whatever is left is entirely variable — that cancellation is the whole idea of the method.',
              },
              {
                do: 'Divide one difference by the other: £24,000 ÷ 8,000 = £3.00 a unit.',
                why: 'This is the variable cost per unit, and it is the only figure the two points hand you directly.',
              },
              {
                do: 'Substitute back at the high point: 20,000 × £3.00 = £60,000 of variable cost, so the fixed cost is £82,000 − £60,000 = £22,000.',
                why: 'Whatever the total is not explained by the variable element has to be the fixed element. Either point works; the high one is habit.',
              },
              {
                do: 'Check at the low point: 12,000 × £3.00 = £36,000, and £58,000 − £36,000 = £22,000.',
                why: 'Both points must give the same fixed cost. When they do not, a figure has been transposed — and this check catches it before a forecast is built on it.',
              },
              {
                do: 'Forecast: at 17,000 units the cost would be 17,000 × £3.00 = £51,000 variable, so £22,000 + £51,000 = £73,000.',
                why: 'The forecast is only reliable inside the range the two observations span. Extrapolating far beyond 20,000 units assumes fixed costs that may already have stepped.',
              },
            ],
            answer: 'Variable £3.00 a unit · fixed £22,000 · forecast at 17,000 units £73,000',
            tryIt: {
              q: 'Costs were £47,000 at an output of 8,000 units and £68,000 at an output of 14,000 units, with fixed costs unchanged between the two. What is the variable cost per unit?',
              answer: 3.5,
              unit: '£',
              hint: 'Difference in cost over difference in units.',
              exp: '£68,000 − £47,000 = £21,000 across 14,000 − 8,000 = 6,000 units, so £21,000 ÷ 6,000 = £3.50 a unit. The fixed element follows from either point: 8,000 × £3.50 = £28,000 of variable cost, and £47,000 − £28,000 = £19,000 fixed.',
            },
          },
        },
        {
          h: 'When the fixed cost steps in the middle',
          p: [
            'High-low assumes the fixed element is identical at both observations. If the question tells you it is not — a second supervisor taken on above a certain output, a bigger unit rented — the difference between the two totals is no longer all variable, and dividing it straight away is wrong.',
            'The repair is to make the two points comparable first: strip the step out of the higher observation, so that both figures carry the same fixed cost, and only then divide.',
          ],
          examtrap: 'With the same £58,000 at 12,000 units and £82,000 at 20,000 units, but fixed costs rising by £6,000 once output passes 15,000: the high point becomes £82,000 − £6,000 = £76,000, so £76,000 − £58,000 = £18,000 and £18,000 ÷ 8,000 = £2.25 a unit. Then 12,000 × £2.25 = £27,000, so the fixed cost below the step is £58,000 − £27,000 = £31,000, and above it £31,000 + £6,000 = £37,000. Forgetting to strip the step first gives £3.00 and a fixed cost that fits neither level.',
        },
      ],
      check: [
        {
          type: 'picklist',
          q: 'Identify the behaviour of each cost.',
          picklist: {
            title: 'Cost behaviour',
            rowHeader: 'Cost',
            choiceHeader: 'Behaviour',
            options: ['Fixed', 'Variable', 'Semi-variable', 'Stepped'],
            rows: [
              { text: 'Direct materials used in production', answer: 1 },
              { text: 'Annual rent of a single factory unit', answer: 0 },
              { text: 'A phone contract with a monthly line charge plus a charge per call', answer: 2 },
              { text: 'Supervisors\' salaries, one supervisor being needed for every 20 machines', answer: 3 },
              { text: 'Sales commission at 4% of revenue', answer: 1 },
            ],
          },
          exp: 'Materials and commission both start at nothing and rise in step with activity, so both are variable even though one is measured in units and the other in pounds of revenue. Rent is fixed within the year whatever the factory produces. The phone bill has a floor it never drops below plus a charge that varies, which is the definition of semi-variable. The supervisors are flat until the twenty-first machine arrives and then jump by a whole salary — a step, not a slope.',
        },
        {
          type: 'numeric',
          q: 'A semi-variable cost was £91,000 at 15,000 units and £119,000 at 22,000 units, with fixed costs unchanged between the two. What is the fixed element?',
          unit: '£',
          answer: 31000,
          exp: '£119,000 − £91,000 = £28,000 across 22,000 − 15,000 = 7,000 units, so £28,000 ÷ 7,000 = £4.00 a unit. Substituting at the high point, 22,000 × £4.00 = £88,000 of variable cost, so £119,000 − £88,000 = £31,000 is fixed. The low point agrees: 15,000 × £4.00 = £60,000, and £91,000 − £60,000 = £31,000.',
        },
        {
          type: 'truefalse',
          q: 'Identify whether each statement about cost behaviour is correct.',
          statements: [
            { text: 'A fixed cost falls per unit as output rises.', answer: true },
            { text: 'A variable cost falls per unit as output rises.', answer: false },
            { text: 'The high-low method uses the highest and lowest cost figures observed.', answer: false },
          ],
          exp: 'The first two are the reversal worth learning cold: fixed in total means falling per unit, and variable per unit means rising in total. The third is a genuine trap in the wording — high-low picks the highest and lowest ACTIVITY levels, and takes whatever cost was recorded at each. Picking on cost instead gives the right answer only when the two happen to coincide, and quietly the wrong one when they do not.',
        },
      ],
    },
    {
      id: 'L3-MATS-2G',
      title: 'Costing systems and waste',
      icon: '🏭',
      criteria: ['MATS-2.5.1', 'MATS-2.5.2', 'MATS-2.5.3'],
      cards: [
        {
          h: 'Four systems, chosen by what is being made',
          table: {
            headers: ['System', 'The cost unit', 'Typical business', 'Cost per unit'],
            rows: [
              ['Job costing', 'One job, made to order', 'Builder, garage, printer', 'The job\'s own costs, collected on a job card'],
              ['Batch costing', 'One batch of identical units', 'Bakery, clothing, pharmaceuticals', 'Batch cost ÷ units in the batch'],
              ['Unit costing', 'One unit of a single product', 'Bricks, cement, bottled water', 'Total cost ÷ units produced'],
              ['Service costing', 'A composite unit', 'Transport, hotels, hospitals', 'Total cost ÷ composite units'],
            ],
          },
          callout: {
            kind: 'key',
            text: 'The system follows the product, not the industry. Anything made to a customer\'s own specification is a job; anything made in identical groups is a batch; anything made continuously and indistinguishably is a unit; anything with no physical output at all is a service. One business can run more than one of them.',
          },
        },
        {
          h: 'Why a service needs two dimensions',
          p: [
            'A haulier that moves one tonne 500 miles and a haulier that moves 50 tonnes 10 miles have both driven, but they have not done the same work. A cost per mile flatters the first and a cost per tonne flatters the second, so service costing multiplies the two into a **composite cost unit** and divides by that instead.',
            'A bus route costing £96,000 a month and carrying 480,000 passenger-miles costs £96,000 ÷ 480,000 = **£0.20 a passenger-mile**, and that figure can be set against another route of a completely different length and loading. A single dimension could not do that: cost per mile rewards an empty bus and cost per passenger rewards a short one.',
            'The same reasoning explains why a hotel counts occupied bed-nights rather than beds, and a hospital patient-days rather than patients. In each case one dimension is capacity and the other is time or distance, and the cost the business is trying to control depends on both.',
          ],
          table: {
            headers: ['Business', 'Composite cost unit'],
            rows: [
              ['Haulage', 'Cost per tonne-mile'],
              ['Bus and rail', 'Cost per passenger-mile'],
              ['Hotel', 'Cost per occupied bed-night'],
              ['Hospital', 'Cost per patient-day'],
              ['College', 'Cost per student-week'],
            ],
          },
        },
        {
          h: 'Waste: expected, and unexpected',
          p: [
            'Almost every process loses some of what goes into it — evaporation, offcuts, units that fail inspection. Costing splits that loss in two, and the split decides where the money lands.',
            '**Normal loss** is the waste the process is known to produce. It is expected, so its cost is absorbed by the units that survive: divide the process cost by the EXPECTED good output, not by the input. **Abnormal loss** is whatever is lost beyond that. It is valued at the same rate as good output and written off separately, so that a bad month appears as a bad month rather than as a quietly higher unit cost.',
          ],
          worked: {
            title: 'Normal and abnormal loss in one process',
            problem: '10,000 kg of material is put into a process at a total cost of £47,500. Normal loss is expected to be 5% of input and has no scrap value. Actual good output was 9,400 kg.',
            steps: [
              {
                do: 'Normal loss is 10,000 × 5% = 500 kg, so expected good output is 10,000 − 500 = 9,500 kg.',
                why: 'Normal loss is a known property of the process. Nobody will be asked to explain it, because it was budgeted for before the month began.',
              },
              {
                do: 'Cost per good kilogram is £47,500 ÷ 9,500 = £5.00.',
                why: 'Dividing by the 10,000 kg that went in would understate every unit and bury the cost of the waste inside the cost card, where no one would see it.',
              },
              {
                do: 'Actual output was 9,400 kg, so abnormal loss is 9,500 − 9,400 = 100 kg, valued at 100 × £5.00 = £500.',
                why: 'Abnormal loss is priced like good output precisely so that the unit cost is not disturbed by it. The failure shows up as a separate charge instead.',
              },
              {
                do: 'Check the cost is all accounted for: good output is 9,400 × £5.00 = £47,000, and £47,000 + £500 = £47,500.',
                why: 'Everything put into the process must end up either in the output or in the abnormal loss. If it does not, the normal loss has been charged twice.',
              },
            ],
            answer: '£5.00 per good kilogram · abnormal loss of £500 written off to profit or loss',
            tryIt: {
              q: 'A process takes in 8,000 litres at a total cost of £38,400. Normal loss is 4% of input and has no scrap value. What is the cost per litre of good output?',
              answer: 5,
              unit: '£',
              hint: 'Divide by what you expect to get out, not by what you put in.',
              exp: 'Normal loss is 8,000 × 4% = 320 litres, so expected good output is 8,000 − 320 = 7,680 litres, and £38,400 ÷ 7,680 = £5.00 a litre. Dividing by the 8,000 litres of input gives £38,400 ÷ 8,000 = £4.80 and quietly moves the cost of the waste off the product.',
            },
          },
          examtrap: 'If normal loss has a scrap value, deduct that value from the process cost before dividing — the business gets some money back, so the good units carry less. The number of expected good units is unaffected by the scrap proceeds.',
        },
      ],
      check: [
        {
          type: 'picklist',
          q: 'Identify the costing system each business would use.',
          picklist: {
            title: 'Choosing a system',
            rowHeader: 'Business',
            choiceHeader: 'System',
            options: ['Job costing', 'Batch costing', 'Unit costing', 'Service costing'],
            rows: [
              { text: 'A builder pricing an extension to one customer\'s house', answer: 0 },
              { text: 'A bakery producing 400 identical loaves at a time', answer: 1 },
              { text: 'A brickworks producing one standard brick continuously', answer: 2 },
              { text: 'A coach operator running scheduled routes', answer: 3 },
              { text: 'A garage repairing a customer\'s gearbox', answer: 0 },
            ],
          },
          exp: 'The question to ask is what the customer is buying. An extension and a gearbox repair are both one-offs specified by the customer, so each is a job with its own card. Four hundred identical loaves are a batch, and the cost per loaf is the batch cost divided by 400. A brick is indistinguishable from the next brick and is made continuously, so the total cost divides by the total bricks. A coach journey leaves nothing behind at all, so the unit has to be composite.',
        },
        {
          type: 'numeric',
          q: 'A batch of 500 identical units cost £3,200 in direct materials, £2,100 in direct labour and £1,700 in absorbed overhead. What is the cost per unit?',
          unit: '£',
          answer: 14,
          exp: '£3,200 + £2,100 + £1,700 = £7,000 for the batch, and £7,000 ÷ 500 = £14.00 a unit. Batch costing collects the batch\'s costs exactly as job costing collects a job\'s, and only then divides — which is why a shorter run of the same product always costs more per unit, since the set-up is shared between fewer of them.',
        },
        {
          type: 'mcq',
          q: 'A process expects to lose 6% of its input and lost 9% this month. How is the extra 3% treated?',
          opts: [
            'Valued at the cost per good unit and written off separately',
            'Absorbed by the good output along with the normal loss',
            'Ignored, because losses vary from month to month',
            'Deducted from the cost of the material put into the process',
          ],
          ans: 0,
          exp: 'The 6% is normal loss and is carried by the surviving units. The extra 3% is abnormal, and the point of separating it is that a failure should be visible: it is priced at the same rate as good output and charged to profit or loss on its own line. Absorbing it would raise the unit cost and hide the problem in a cost card nobody questions.',
        },
      ],
    },
  ];


  /* ══════════════════════════════════════════════════════════════════════════
     OUTCOME 3 — Attribute costs according to organisational requirements (20%)

     The largest single outcome in the unit and the one with the most arithmetic
     in it. Written before Outcome 2 for that reason: a reader working through a
     part-built unit should meet the heaviest material first, not last. It reads
     perfectly well after Outcome 2 now that Outcome 2 exists, and the path
     shows them in syllabus order.
     ══════════════════════════════════════════════════════════════════════════ */

  var LO3_LESSONS = [
    {
      id: 'L3-MATS-3A',
      title: 'Allocation and apportionment',
      icon: '🗺️',
      criteria: ['MATS-3.1.1'],
      cards: [
        {
          h: 'Two ways an overhead reaches a cost centre',
          split: {
            left: {
              title: 'Allocation',
              items: [
                'The whole cost belongs to **one** cost centre',
                'No arithmetic, no judgement, no basis needed',
                'The invoice already says whose it is',
                'Machining department\'s own supervisor · a repair to one department\'s machine',
              ],
            },
            right: {
              title: 'Apportionment',
              items: [
                'The cost is **shared** between several cost centres',
                'A basis has to be chosen, and it is a judgement',
                'Split in proportion to something measurable',
                'Factory rent · buildings insurance · heat and light',
              ],
            },
          },
          p: [
            'The test is simply whether the cost belongs to one centre or to several. **Allocate what you can, apportion what you must** — every apportionment introduces a choice somebody could disagree with, so it is not the first resort.',
          ],
        },
        {
          h: 'Choosing a basis that means something',
          table: {
            headers: ['Overhead', 'Sensible basis', 'Why'],
            rows: [
              ['Rent, rates, buildings insurance', 'Floor area', 'The cost is driven by the space occupied'],
              ['Heat and light', 'Floor area or volume', 'Same driver — bigger space, bigger bill'],
              ['Machine insurance, machine depreciation', 'Carrying amount of machinery', 'The cost follows the value of what is insured'],
              ['Canteen, personnel, welfare', 'Number of employees', 'The cost is driven by headcount'],
              ['Power', 'Machine hours or kilowatt hours', 'The cost follows how hard the machines run'],
            ],
          },
          callout: {
            kind: 'key',
            text: 'A basis is right when the thing being shared genuinely varies with it. Apportioning canteen cost by floor area is arithmetic that produces a number and explains nothing.',
          },
        },
      ],
      check: [
        {
          type: 'picklist',
          q: 'Identify how each overhead reaches the cost centres.',
          picklist: {
            title: 'Reaching a cost centre',
            rowHeader: 'Overhead',
            choiceHeader: 'Method',
            options: ['Allocated', 'Apportioned'],
            rows: [
              { text: 'Salary of the assembly department supervisor', answer: 0 },
              { text: 'Repair to a machine used only by the machining department', answer: 0 },
              { text: 'Rent of the whole factory', answer: 1 },
              { text: 'Insurance of the factory building', answer: 1 },
              { text: 'Indirect materials drawn by the finishing department', answer: 0 },
            ],
          },
          exp: 'Anything whose invoice already names one department is allocated in full, with no basis and no judgement — a supervisor, a repair to one department\'s machine, stores requisitions charged to one department. Anything covering the whole site has to be shared, and sharing means choosing a basis. Allocate what you can and apportion only what you must, because every apportionment is a decision somebody could argue with.',
        },
        {
          type: 'mcq',
          q: 'Which basis is most appropriate for apportioning canteen costs?',
          opts: [
            'Number of employees in each department',
            'Floor area occupied by each department',
            'Carrying amount of machinery in each department',
            'Machine hours worked in each department',
          ],
          ans: 0,
          exp: 'A canteen exists because there are people to feed, so headcount is what drives the cost and headcount is the basis that makes the split defensible. Floor area would work arithmetically and mean nothing: a large, highly automated department with four staff would be charged more canteen cost than a small one with forty.',
        },
      ],
    },
    {
      id: 'L3-MATS-3B',
      title: 'Reapportioning the service centres',
      icon: '🔁',
      criteria: ['MATS-3.1.2'],
      cards: [
        {
          h: 'Why service centres have to be cleared',
          p: [
            'A **production** cost centre makes the product. A **service** cost centre — stores, maintenance, the canteen — exists to support the ones that do. Units pass through production centres and never through stores, so an overhead rate can only be built on a production centre.',
            'Everything sitting in a service centre therefore has to be pushed out into the production centres before any rate can be calculated. That second step is **reapportionment**.',
            'Whether a centre is a production or a service centre is decided by the product, not by how expensive or how busy it is. If a unit physically passes through it and is changed by it, it is a production centre; if it only supports the centres that do, it is a service centre. A question will normally say which is which, and when it does not the list of what happens in each is the tell.',
          ],
          flow: ['Allocate and apportion to ALL centres', 'Reapportion service centres into production centres', 'Calculate a recovery rate per production centre'],
        },
        {
          h: 'The direct method',
          p: [
            'The simplest rule: **ignore the service centres\' use of each other** and push each one straight into the production centres, in proportion to the production centres\' usage only.',
          ],
          worked: {
            title: 'Two production centres, one service centre',
            problem: 'After apportionment: Machining £84,000, Assembly £56,000, Stores £30,000. Stores issues 60% of its requisitions to Machining and 40% to Assembly.',
            steps: [
              {
                do: 'Split the stores total on the given proportions: £30,000 × 60% = £18,000 to Machining, £30,000 × 40% = £12,000 to Assembly.',
                why: 'The basis is what the service centre actually does for each production centre — requisitions here, maintenance hours for a maintenance department, headcount for a canteen.',
              },
              {
                do: 'Add: Machining £84,000 + £18,000 = £102,000. Assembly £56,000 + £12,000 = £68,000.',
                why: 'Every production centre now carries its own overhead plus its share of the support it consumed.',
              },
              {
                do: 'Check the total: £102,000 + £68,000 = £170,000, and £84,000 + £56,000 + £30,000 = £170,000.',
                why: 'Reapportionment MOVES cost, it never creates or destroys any. If the total has changed, a percentage has been applied to the wrong figure.',
              },
            ],
            answer: 'Machining £102,000 · Assembly £68,000 · total unchanged at £170,000',
            tryIt: {
              q: 'Machining £71,000, Assembly £49,000, Maintenance £24,000. Maintenance spends 75% of its hours on Machining and 25% on Assembly. What is Machining\'s total after reapportionment?',
              answer: 89000,
              unit: '£',
              hint: 'Apply the percentage to the service centre total, not to the production centre total.',
              exp: '£24,000 × 75% = £18,000, and £71,000 + £18,000 = £89,000. Assembly takes £24,000 × 25% = £6,000 to reach £55,000, and the two total £144,000 — the same as £71,000 + £49,000 + £24,000.',
            },
          },
        },
        {
          h: 'The step-down method',
          example: {
            title: 'Step-down, two service centres',
            rows: [
              ['', 'Machining £', 'Assembly £', 'Maintenance £', 'Stores £'],
              ['After apportionment', '84,000', '56,000', '18,000', '30,000'],
              ['Close Stores (50 / 30 / 20)', '15,000', '9,000', '6,000', '(30,000)'],
              ['Close Maintenance (70 / 30)', '16,800', '7,200', '(24,000)', '—'],
              ['**Total**', '**115,800**', '**72,200**', '**—**', '**—**'],
            ],
          },
          p: [
            'Service centres often serve each other: stores issues materials to maintenance, maintenance repairs the stores forklift. The **step-down** method deals with this in one direction only. Close the service centre that serves the most other service centres first, spread it across everything it serves — production centres and the remaining service centres — and then close the next one **without sending anything back**.',
            'So stores is closed first and its £30,000 goes to all three centres it serves, maintenance included. Maintenance then holds £18,000 + £6,000 = **£24,000**, and that whole figure is split 70/30 between the two production centres — nothing goes back to stores, which is already closed. Total: 115,800 + 72,200 = **£188,000**, the same as 84,000 + 56,000 + 18,000 + 30,000.',
          ],
          examtrap: 'After the first service centre is closed, the second one is bigger than it started. Splitting the ORIGINAL £18,000 instead of the £24,000 it now holds leaves £6,000 stranded in a closed centre, and the production totals no longer add back to the original total — which is the check that catches it.',
        },
      ],
      check: [
        {
          type: 'numeric',
          q: 'Machining holds £96,000 and Assembly £64,000 after apportionment. Stores holds £45,000 and issues 40% of its requisitions to Machining and 60% to Assembly. Using the direct method, what is Assembly\'s total overhead?',
          unit: '£',
          answer: 91000,
          exp: '£45,000 × 60% = £27,000, and £64,000 + £27,000 = £91,000. Machining takes the other £18,000 to reach £114,000, and the two total £205,000 — which is £96,000 + £64,000 + £45,000, so nothing has been created or lost.',
        },
        {
          type: 'mcq',
          q: 'Under the step-down method, what happens to the second service centre before it is closed?',
          opts: [
            'It grows, because it receives a share of the first service centre that was closed',
            'It shrinks, because part of it was already sent to the first service centre',
            'It is unchanged, because service centres are closed independently of each other',
            'It is split equally between the production centres regardless of its size',
          ],
          ans: 0,
          exp: 'That is the whole point of stepping down: the first centre is spread across everything it serves, and if it serves the second service centre then the second one is larger by that amount when its turn comes. Splitting the figure it started with rather than the figure it now holds strands the difference in a centre that has already been closed.',
        },
        {
          type: 'truefalse',
          q: 'Identify whether each statement about reapportionment is correct.',
          statements: [
            { text: 'Reapportionment moves overhead between centres without changing the total.', answer: true },
            { text: 'Overhead recovery rates are calculated for production cost centres only.', answer: true },
            { text: 'The direct method sends part of each service centre to the other service centres.', answer: false },
          ],
          exp: 'The total is the check to run every time — reapportionment redistributes and never creates. Rates belong to production centres because units pass through those and not through stores. And the direct method is defined by ignoring inter-service work entirely; sending cost between service centres is what the step-down method does.',
        },
      ],
    },
    {
      id: 'L3-MATS-3C',
      title: 'Overhead absorption rates',
      icon: '📐',
      criteria: ['MATS-3.2.1'],
      cards: [
        {
          h: 'One division, decided in advance',
          formula: 'Overhead absorption rate = Budgeted overhead ÷ Budgeted activity',
          p: [
            'Both figures are **budgeted**. The rate is set before the period starts, because a cost card is needed before the year is over — a quotation cannot wait until March to find out what the overhead actually was.',
            'Setting it in advance is also the reason under- and over-absorption exists, which is the next lesson.',
            'The alternative — waiting for the actual figures and dividing those — would give a rate that is arithmetically perfect and commercially useless, because it arrives months after every quotation that needed it. Worse, it would make each unit cost depend on how busy the factory happened to be that year, so the same chisel would carry more overhead in a quiet year than in a busy one. A predetermined rate buys a stable cost card at the price of a difference to clear at the year end.',
          ],
        },
        {
          h: 'Choosing the activity to divide by',
          table: {
            headers: ['Business', 'Sensible basis', 'Why'],
            rows: [
              ['Machine-intensive manufacturer', 'Machine hours', 'Overhead is power, machine depreciation, maintenance — it follows machine running time'],
              ['Labour-intensive manufacturer', 'Direct labour hours', 'Overhead follows the people, so the hours they work is the driver'],
              ['Accountancy practice', 'Chargeable hours', 'Almost every cost supports fee-earning time'],
              ['Haulage business', 'Miles driven or vehicle hours', 'Overhead follows use of the fleet'],
              ['Hotel', 'Occupied room-nights', 'Cost is driven by rooms serviced and occupied'],
            ],
          },
          p: [
            'Each production centre gets **its own** rate, on the basis that fits it. A factory with a machine-driven machining department and a hand-finishing assembly department will properly use machine hours in one and labour hours in the other.',
          ],
        },
        {
          h: 'Two departments, two rates, one product',
          worked: {
            title: 'Absorbing overhead into a job',
            problem: 'Machining: budgeted overhead £102,000, budgeted machine hours 8,500. Assembly: budgeted overhead £68,000, budgeted labour hours 17,000. Job 412 uses 3 machine hours in Machining and 5 labour hours in Assembly.',
            steps: [
              {
                do: 'Machining rate: £102,000 ÷ 8,500 = £12.00 per machine hour.',
                why: 'Machining is where the plant is, so machine hours is the activity that drives its overhead.',
              },
              {
                do: 'Assembly rate: £68,000 ÷ 17,000 = £4.00 per labour hour.',
                why: 'Assembly is hand work. Using machine hours there would divide by an activity the department barely has.',
              },
              {
                do: 'Job 412: (3 × £12.00) + (5 × £4.00) = £36.00 + £20.00 = £56.00.',
                why: 'The job picks up overhead from each department in proportion to what it used there. A job that never enters Assembly picks up none of Assembly\'s overhead.',
              },
            ],
            answer: 'Machining £12.00 per machine hour · Assembly £4.00 per labour hour · Job 412 absorbs £56.00',
            tryIt: {
              q: 'Finishing has budgeted overhead of £94,500 and budgeted labour hours of 13,500. A job spends 7 labour hours there. How much overhead does it absorb in Finishing?',
              answer: 49,
              unit: '£',
              hint: 'Find the rate per hour first, then multiply by the hours the job used.',
              exp: '£94,500 ÷ 13,500 = £7.00 per labour hour, and 7 × £7.00 = £49.00. Dividing the overhead by the job\'s hours instead of the department\'s budgeted hours is the slip to watch for — it produces a large number that is not a rate at all.',
            },
          },
          examtrap: 'A single factory-wide rate is quicker and usually wrong. If one department is machine-driven and another is hand work, one rate charges a hand-finished job for machine overhead it never caused.',
        },
      ],
      check: [
        {
          type: 'numeric',
          q: 'Budgeted overhead for a department is £147,000 and budgeted machine hours are 10,500. What is the overhead absorption rate per machine hour?',
          unit: '£',
          answer: 14,
          exp: '£147,000 ÷ 10,500 = £14.00 per machine hour. Both figures are budgeted: the rate has to exist before the period starts so that jobs can be costed and quoted as they happen.',
        },
        {
          type: 'numeric',
          q: 'A department absorbs overhead at £9.50 per labour hour. A job uses 14 labour hours there. How much overhead does the job absorb?',
          unit: '£',
          answer: 133,
          exp: '14 × £9.50 = £133.00. Absorption is the rate multiplied by the job\'s own activity, so a job that spends no time in a department absorbs none of that department\'s overhead.',
        },
        {
          type: 'mcq',
          q: 'Why is a single factory-wide absorption rate usually a poor choice?',
          opts: [
            'It charges every job the same overhead per hour whatever department it passed through',
            'It cannot be calculated until the actual overhead for the period is known',
            'It always produces a lower total overhead than departmental rates',
            'It is not permitted for inventory valuation under IAS 2',
          ],
          ans: 0,
          exp: 'Departments differ in how much overhead they carry and what drives it. One rate for the whole factory charges a hand-finished job for the machine shop\'s power and depreciation, and undercharges the job that lived in the machine shop. Total overhead absorbed is much the same either way — what changes is which jobs carry it, and therefore which look profitable.',
        },
      ],
    },
    {
      id: 'L3-MATS-3D',
      title: 'Activity-based costing',
      icon: '🎛️',
      criteria: ['MATS-3.3.1', 'MATS-3.3.2'],
      cards: [
        {
          h: 'When hours stop explaining the overhead',
          p: [
            'Traditional absorption assumes overhead is driven by **volume** — more hours, more overhead. Much modern overhead is not: setting up a machine costs the same whether the run is 10 units or 10,000, and a purchase order costs the same for a large delivery as a small one.',
            'Activity-based costing groups overhead into a **cost pool** for each activity, finds the **cost driver** that actually causes it, and charges each product by how much of that driver it consumes.',
          ],
          flow: ['Identify the activity', 'Pool its cost', 'Find the driver that causes it', 'Rate = pool ÷ total driver units', 'Charge each product by its driver usage'],
        },
        {
          h: 'Pools and their drivers',
          table: {
            headers: ['Cost pool', 'Cost driver', ''],
            rows: [
              ['Machine set-ups', 'Number of set-ups', 'Not hours — a set-up costs the same whatever follows it'],
              ['Purchasing', 'Number of purchase orders', 'Raising an order costs the same for any size of order'],
              ['Materials handling', 'Number of material movements', 'Driven by how often, not how much'],
              ['Quality inspection', 'Number of inspections', 'Driven by batches inspected'],
              ['Machine running costs', 'Machine hours', 'Genuinely volume-driven — traditional absorption is right here'],
            ],
          },
          p: [
            'A **cost pool** gathers the cost of one activity, and a **cost driver** is the thing that causes that activity to happen. The pairing is the whole of the technique: choose a driver that genuinely triggers the cost, divide the pool by the total driver units, and charge each product for the driver units it used.',
            'The reason this changes anything is that most of these drivers have nothing to do with volume. A set-up costs the same whether the run that follows is ten units or ten thousand, so a low-volume product that needs as many set-ups as a high-volume one is carrying a cost that machine hours would have handed to its bigger neighbour.',
          ],
          callout: {
            kind: 'key',
            text: 'The last row matters: ABC does not replace hours everywhere. Where a cost really is driven by volume, machine hours IS the right driver.',
          },
        },
        {
          h: 'What ABC changes, and for whom',
          worked: {
            title: 'Set-up cost under two methods',
            problem: 'Set-up costs are £72,000 for the year, and there are 480 set-ups. Product A: 20,000 units in 40 set-ups. Product B: 2,000 units in 40 set-ups. Under traditional absorption, set-up cost is spread over the 22,000 units made.',
            steps: [
              {
                do: 'Traditional: £72,000 ÷ 22,000 units = £3.27 per unit (to the nearest penny), for A and B alike.',
                why: 'Volume-based absorption charges each unit the same, so the 20,000 units of A carry ten times as much set-up cost in total as the 2,000 units of B.',
              },
              {
                do: 'ABC rate: £72,000 ÷ 480 set-ups = £150.00 per set-up.',
                why: 'The pool is divided by the driver — the thing that actually causes the cost — not by units.',
              },
              {
                do: 'Product A: 40 × £150.00 = £6,000, over 20,000 units = £0.30 per unit.',
                why: 'A is made in long runs, so each set-up is spread across a lot of units and the cost per unit is small.',
              },
              {
                do: 'Product B: 40 × £150.00 = £6,000, over 2,000 units = £3.00 per unit.',
                why: 'B causes exactly as many set-ups as A while making a tenth of the units, so it carries ten times the set-up cost per unit — which is the truth traditional absorption was hiding.',
              },
            ],
            answer: 'Traditional £3.27 a unit for both · ABC £0.30 for A and £3.00 for B',
            tryIt: {
              q: 'A purchasing cost pool of £58,500 is driven by 1,300 purchase orders. A product uses 90 orders and makes 4,500 units. What is the purchasing cost per unit?',
              answer: 0.9,
              unit: '£',
              hint: 'Rate per order first, then the product\'s total, then divide by its units.',
              exp: '£58,500 ÷ 1,300 = £45.00 per order. The product takes 90 × £45.00 = £4,050, and £4,050 ÷ 4,500 units = £0.90 a unit.',
            },
          },
          examtrap: 'ABC does not change the total overhead by a penny — the same £72,000 is charged out either way. What it changes is which product carries it, and therefore which product looks profitable. A low-volume, high-complexity product is almost always undercosted by traditional absorption.',
        },
      ],
      check: [
        {
          type: 'numeric',
          q: 'A quality inspection cost pool is £84,000 and there are 2,100 inspections in the period. What is the cost per inspection?',
          unit: '£',
          answer: 40,
          exp: '£84,000 ÷ 2,100 = £40.00 per inspection. The pool is always divided by the number of driver units, never by production volume — dividing by units is what traditional absorption does, and the whole point of ABC is that inspections are not caused by units.',
        },
        {
          type: 'mcq',
          q: 'Which product is most likely to be undercosted by traditional volume-based absorption?',
          opts: [
            'A low-volume product made in many short runs',
            'A high-volume product made in few long runs',
            'A product with high direct material cost and little overhead',
            'A product made entirely by hand with no machine time',
          ],
          ans: 0,
          exp: 'Short runs mean many set-ups, many material movements and many inspections — activities that cost the same however few units follow them. Volume-based absorption charges by units, so a product with few units picks up little overhead however much activity it caused. The high-volume product is overcosted by exactly the amount the low-volume one escapes.',
        },
        {
          type: 'truefalse',
          q: 'Identify whether each statement about activity-based costing is correct.',
          statements: [
            { text: 'ABC reduces the total overhead a business has to absorb.', answer: false },
            { text: 'A cost pool is a group of overheads sharing the same cost driver.', answer: true },
            { text: 'Machine hours can be a legitimate cost driver under ABC.', answer: true },
          ],
          exp: 'ABC redistributes overhead; it does not reduce it, and the same total is charged out under either method. A pool groups costs that share a driver, and where a cost genuinely is caused by machine running time then machine hours is the correct driver — ABC is about finding the real cause, not about abolishing hours.',
        },
      ],
    },
    {
      id: 'L3-MATS-3E',
      title: 'Under- and over-absorption',
      icon: '⚖️',
      criteria: ['MATS-3.4.1'],
      cards: [
        {
          h: 'Why a difference is guaranteed',
          formula: 'Overhead absorbed = Absorption rate × ACTUAL activity',
          p: [
            'The rate was set on budgeted figures before the period began. The activity that actually happened, and the overhead actually incurred, are both known only afterwards — and neither will match the budget exactly.',
            'So the amount **absorbed** into products almost never equals the amount **incurred**. The difference is written off to profit or loss.',
            'There are only ever two causes, and a question that asks you to explain a difference is asking you to name them. **Activity** differed from budget, so a rate built on the budgeted hours was applied to a different number of hours. **Spending** differed from budget, so the overhead incurred was not what the rate was built to recover. Either alone produces a difference; usually both are present at once.',
          ],
          split: {
            left: {
              title: 'Under-absorbed',
              items: [
                'Absorbed **less** than was incurred',
                'Products were undercharged',
                'A further **debit** to profit or loss',
                'Profit falls',
              ],
            },
            right: {
              title: 'Over-absorbed',
              items: [
                'Absorbed **more** than was incurred',
                'Products were overcharged',
                'A **credit** to profit or loss',
                'Profit rises',
              ],
            },
          },
        },
        {
          h: 'Working it out, and reading it',
          worked: {
            title: 'A quarter that went two ways at once',
            problem: 'Budgeted overhead £240,000 on budgeted machine hours of 20,000. Actual overhead came to £249,000 and actual machine hours were 21,500.',
            steps: [
              {
                do: 'Rate: £240,000 ÷ 20,000 = £12.00 per machine hour, fixed before the quarter started.',
                why: 'The rate uses BUDGETED figures on both sides. Recalculating it on actual figures would make under- and over-absorption impossible by construction.',
              },
              {
                do: 'Absorbed: 21,500 × £12.00 = £258,000.',
                why: 'Absorption uses the budgeted RATE and the ACTUAL activity. This is the one line where the two get mixed, and mixing them the other way is the usual error.',
              },
              {
                do: 'Compare: £258,000 absorbed against £249,000 incurred = £9,000 OVER-absorbed.',
                why: 'More was charged into products than the business actually spent, so £9,000 is credited to profit or loss.',
              },
              {
                do: 'Read it: activity ran 1,500 hours above budget (+£18,000 absorbed) while spending ran £9,000 above budget (−£9,000).',
                why: 'Two causes pulling opposite ways. Volume was the larger, so the net position is an over-absorption even though the business overspent.',
              },
            ],
            answer: '£9,000 over-absorbed, credited to profit or loss',
            tryIt: {
              q: 'Budgeted overhead £180,000 on 15,000 labour hours. Actual overhead £176,400 and actual hours 14,200. What is the under- or over-absorption?',
              answer: 6000,
              unit: '£',
              hint: 'Rate first, then absorbed = rate × ACTUAL hours, then compare with actual overhead.',
              exp: 'Rate £180,000 ÷ 15,000 = £12.00. Absorbed 14,200 × £12.00 = £170,400. Incurred £176,400. Absorbed is £6,000 less than incurred, so £6,000 is UNDER-absorbed and debited to profit or loss — activity fell 800 hours short, which cost £9,600 of absorption, and the £3,600 underspend recovered only part of it.',
            },
          },
        },
        {
          h: 'What it means, and what it does not',
          p: [
            'An under- or over-absorption is not a costing error and it is not a saving. It is the arithmetic consequence of setting a rate in advance, and it always has **two possible causes**: activity differed from budget, or spending did, or both.',
            'Its effect on **unit cost** is nil — units were costed at the rate, and the rate is what it is. Its effect on **total profit** is the whole adjustment, which is why a large under-absorption can turn a month that looked fine into a loss.',
          ],
          examtrap: 'Absorbed = budgeted RATE × ACTUAL activity. Using actual overhead ÷ actual hours gives a rate nobody ever used, and using budgeted hours gives the budgeted overhead back — either way the answer is zero difference, which is the tell that the wrong figures went in.',
        },
      ],
      check: [
        {
          type: 'numeric',
          q: 'The absorption rate is £8.00 per machine hour. Actual machine hours were 12,600 and actual overhead was £104,000. What is the under- or over-absorption, as a positive figure?',
          unit: '£',
          answer: 3200,
          exp: 'Absorbed: 12,600 × £8.00 = £100,800. Incurred: £104,000. Absorbed is £3,200 short of incurred, so £3,200 is UNDER-absorbed and debited to profit or loss — the products were charged less overhead than the business actually spent.',
        },
        {
          type: 'mcq',
          q: 'Overhead has been over-absorbed. What is the effect on reported profit?',
          opts: [
            'Profit rises, because the over-absorption is credited to profit or loss',
            'Profit falls, because too much overhead has been charged to products',
            'Profit is unchanged, because the adjustment cancels out in inventory',
            'Profit rises only if inventory levels also rose in the period',
          ],
          ans: 0,
          exp: 'Over-absorption means more overhead was charged into products than the business incurred, so cost of sales has been overstated. Crediting the difference to profit or loss puts that right and profit rises. It looks counter-intuitive because "over" sounds like a cost, but the correction is in the opposite direction to the word.',
        },
        {
          type: 'picklist',
          q: 'Identify the effect of each event on absorption, taken on its own.',
          picklist: {
            title: 'What causes which',
            rowHeader: 'What happened',
            choiceHeader: 'Effect',
            options: ['Tends towards under-absorption', 'Tends towards over-absorption'],
            rows: [
              { text: 'Actual activity was below budget', answer: 0 },
              { text: 'Actual overhead spending was above budget', answer: 0 },
              { text: 'Actual activity was above budget', answer: 1 },
              { text: 'Actual overhead spending was below budget', answer: 1 },
              { text: 'Machines were idle for two weeks after a breakdown', answer: 0 },
            ],
          },
          exp: 'Two levers, each pulling one way. Less activity than budgeted means fewer hours to absorb at the rate, so less is absorbed. More spending than budgeted means more to absorb against. Both push towards under-absorption, and their opposites push the other way — a breakdown is simply an activity shortfall with a reason attached. Where the two levers disagree, the larger one wins.',
        },
      ],
    },
  ];

  /* ══════════════════════════════════════════════════════════════════════════
     THE PATH
     ══════════════════════════════════════════════════════════════════════════ */

  /* ══════════════════════════════════════════════════════════════════════════
     OUTCOME 4 — Investigate deviations from budgets (15%)

     Where the unit stops describing costs and starts judging them. Note the
     scope: the specification asks for TOTAL variances — sales price, material,
     labour, variable overhead and fixed production — and not for the price and
     usage or rate and efficiency splits, which are Level 4 work. Teaching the
     splits here would be teaching the wrong exam, so the module says plainly
     what is in scope and stops there.
     ══════════════════════════════════════════════════════════════════════════ */

  var LO4_LESSONS = [
    {
      id: 'L3-MATS-4A',
      title: 'Standard prices and standard costs',
      icon: '🎯',
      criteria: ['MATS-4.1.1', 'MATS-4.1.2'],
      cards: [
        {
          h: 'A price and a cost decided in advance',
          p: [
            'A **standard** is what one unit ought to cost, and what it ought to sell for, agreed before the period begins. It is not a forecast of what will happen and it is not last year\'s average — it is a considered target built from the quantity of each resource a unit should need and the price that resource should command.',
            'Two numbers make up every line: a **quantity** and a **price**. Two kilograms at £6.00; half an hour at £14.00. Keeping them apart matters, because when the actual cost differs from the standard the question is always which of the two moved.',
          ],
          example: {
            title: 'Standard cost card — one Trentham casting',
            rows: [
              ['', 'Quantity', 'Rate', '£'],
              ['Direct materials', '2 kg', '£6.00', '12.00'],
              ['Direct labour', '0.5 hours', '£14.00', '7.00'],
              ['Variable production overhead', '0.5 hours', '£4.00', '2.00'],
              ['Fixed production overhead', '0.5 hours', '£6.00', '3.00'],
              ['**Standard absorption cost**', '', '', '**24.00**'],
              ['Standard selling price', '', '', '35.00'],
              ['**Standard profit**', '', '', '**11.00**'],
            ],
          },
        },
        {
          h: 'From one card to a whole budget',
          p: [
            'The card describes one unit. Multiply it by the volume the business plans to make and every line of the budget appears — which is the practical reason standards exist at all. **Fixed** production overhead is the one line that is not multiplied: it was a total before the card was written, and £3.00 a unit is what that total works out at when it is spread over the planned volume.',
          ],
          worked: {
            title: 'Building the budget from the card',
            problem: 'Trentham Castings budgets to make and sell 10,000 units on the standard card above. Budgeted fixed production overhead is £30,000 for the period.',
            steps: [
              {
                do: 'Revenue: 10,000 × £35.00 = £350,000.',
                why: 'The standard price is a target as much as the standard cost is. A budget built on last year\'s realised prices bakes last year\'s discounting into this year\'s plan.',
              },
              {
                do: 'Materials: 10,000 × £12.00 = £120,000, which is also 10,000 × 2 = 20,000 kg bought at £6.00.',
                why: 'The budget is needed in both forms. Finance wants the money; the buyer wants the 20,000 kg, because that is what has to be ordered.',
              },
              {
                do: 'Labour 10,000 × £7.00 = £70,000 and variable overhead 10,000 × £2.00 = £20,000.',
                why: 'Both vary with volume, so both are simply the per-unit figure times the number of units.',
              },
              {
                do: 'Fixed production overhead: £30,000, multiplied by nothing.',
                why: 'The £3.00 on the card came FROM this £30,000, as £30,000 ÷ 10,000. Multiplying the £3.00 back up by 10,000 is right only at this one volume, and treating it as a cost per unit at any other volume is the single most common error in this outcome.',
              },
              {
                do: 'Profit: costs of 120,000 + 70,000 + 20,000 + 30,000 = £240,000, so £350,000 − £240,000 = £110,000. Cross-check against the card: 10,000 × £11.00 = £110,000.',
                why: 'The two agree only because the budget volume matches the volume the fixed overhead rate was set on. That is exactly the coincidence the next lesson breaks.',
              },
            ],
            answer: 'Budgeted profit £110,000, on revenue of £350,000 and cost of £240,000',
            tryIt: {
              q: 'The same standard card, but the budget is for 12,000 units. Fixed production overhead is still £30,000 in total. What is the budgeted profit?',
              answer: 138000,
              unit: '£',
              hint: 'Only the variable lines move with volume.',
              exp: 'The variable cost is 12.00 + 7.00 + 2.00 = £21.00, so contribution is 35.00 − 21.00 = £14.00 a unit and 12,000 × 14.00 = £168,000, less fixed costs of £30,000, giving £138,000. Multiplying the £11.00 standard profit by 12,000 gives £132,000 and is wrong: it flexes the fixed overhead as though it grew with output.',
            },
          },
        },
        {
          h: 'Where a standard comes from, and when it goes stale',
          table: {
            headers: ['Type of standard', 'What it assumes', 'What it does to behaviour'],
            rows: [
              ['Ideal', 'Perfect conditions — no waste, no idle time, no breakdowns', 'Always missed, so the variances stop being read'],
              ['Attainable', 'Efficient working with normal, expected levels of loss', 'Demanding but reachable — the usual choice'],
              ['Basic', 'Left unchanged for years as a long-run reference point', 'Drifts out of date and flatters current performance'],
            ],
          },
          p: [
            'A standard is only useful while it is still true. A supplier price rise, a new machine, a change of material — any of these makes the card wrong, and once the card is wrong the variances measure the staleness of the standard rather than the performance of the department.',
            'That is why "revise the standard" is a legitimate answer to a persistent variance. If every month for six months has shown the same adverse material price variance, the price has changed and the card has not.',
          ],
        },
      ],
      check: [
        {
          type: 'numeric',
          q: 'A standard card shows 3 kg of material at £4.50 a kilogram, 0.4 hours of labour at £15.00 an hour and variable overhead at £5.00 a labour hour. What is the standard marginal cost of one unit?',
          unit: '£',
          answer: 21.5,
          exp: '3 × £4.50 = £13.50 of materials, 0.4 × £15.00 = £6.00 of labour and 0.4 × £5.00 = £2.00 of variable overhead, so £13.50 + £6.00 + £2.00 = £21.50. Marginal cost stops there: any fixed production overhead on the card belongs to the absorption cost and not to this figure.',
        },
        {
          type: 'mcq',
          q: 'Why is a standard cost expressed as a quantity and a rate rather than as one figure?',
          opts: [
            'So that a difference can be traced to the amount used or to the price paid',
            'So that the card can be used under marginal and absorption costing alike',
            'Because accounting standards require both figures to be disclosed',
            'Because the quantity is budgeted while the rate is a known fact',
          ],
          ans: 0,
          exp: 'Splitting the line is what makes a variance diagnosable. £12.00 of material becoming £13.20 tells nobody anything; two kilograms at £6.60 instead of £6.00 sends you to the buyer, and 2.2 kilograms at £6.00 sends you to the factory floor. The card is used under both costing techniques, but that is a convenience rather than the reason, and no accounting standard governs a document nobody outside the business sees.',
        },
        {
          type: 'truefalse',
          q: 'Identify whether each statement about standards is correct.',
          statements: [
            { text: 'An attainable standard allows for normal, expected levels of loss.', answer: true },
            { text: 'A persistent variance in the same direction may mean the standard is out of date.', answer: true },
            { text: 'An ideal standard is the most useful basis for motivating a workforce.', answer: false },
          ],
          exp: 'An attainable standard is demanding without being fictional, which is why it is the usual choice. A variance that appears in the same direction month after month is evidence about the card rather than about the department. And an ideal standard assumes perfect conditions that never arrive, so it produces an adverse variance every single period — at which point people stop reading the report, which is the opposite of motivating.',
        },
      ],
    },
    {
      id: 'L3-MATS-4B',
      title: 'Types of budget, and flexing',
      icon: '🪄',
      criteria: ['MATS-4.1.3', 'MATS-4.1.6'],
      cards: [
        {
          h: 'Three kinds of budget',
          table: {
            headers: ['Budget', 'What it is', 'What it is for'],
            rows: [
              ['Fixed', 'Set for one planned level of activity and not changed', 'Planning — deciding what to buy, hire and borrow'],
              ['Flexed', 'Recalculated at the activity that actually happened', 'Control — judging performance without volume in the way'],
              ['Rolling', 'Extended by one period as each period ends', 'Keeping a full year ahead always budgeted'],
            ],
          },
          p: [
            'A **fixed** budget is not a budget of fixed costs; the word means it is not adjusted. It is the plan, and it is the right thing to plan against.',
            'A **rolling** budget — sometimes called a continuous budget — adds a thirteenth month as the first month closes, so the business is never looking at a horizon that shortens as the year goes on. It costs more to prepare, which is the trade-off.',
          ],
        },
        {
          h: 'Why a fixed budget cannot judge performance',
          p: [
            'Trentham budgeted to make 10,000 units at a total cost of £240,000 and actually made 11,500 at a cost of £276,400. Set side by side that is £36,400 of overspend, and a manager reading it would be in trouble.',
            'But 1,500 more units were made, and each of them was always going to cost £21.00 in materials, labour and variable overhead. **1,500 × £21.00 = £31,500** of that £36,400 is volume, not extravagance. The real overspend is £36,400 − £31,500 = **£4,900** — still worth asking about, and under a seventh of what the raw comparison implied.',
          ],
          callout: {
            kind: 'key',
            text: 'Comparing actual cost at one volume with budgeted cost at another measures the difference in volume far more than the difference in performance. Flexing removes the volume so that what is left is performance.',
          },
        },
        {
          h: 'Flexing a budget',
          p: [
            'To flex, take the standard cost card and rebuild the budget at the volume that actually occurred. Every **variable** line is multiplied by the new volume. Every **fixed** line is copied across untouched, because that is what fixed means.',
          ],
          worked: {
            title: 'The Trentham budget flexed to actual output',
            problem: 'The budget was set for 10,000 units. 11,500 units were made and sold. The standard card gives materials £12.00, labour £7.00 and variable overhead £2.00 a unit, with a standard selling price of £35.00. Budgeted fixed production overhead is £30,000.',
            steps: [
              {
                do: 'Flex the revenue: 11,500 × £35.00 = £402,500.',
                why: 'Revenue is flexed as well as cost. Skipping it makes every unit of extra volume look like a sales triumph rather than the plan working.',
              },
              {
                do: 'Flex each variable cost: materials 11,500 × £12.00 = £138,000, labour 11,500 × £7.00 = £80,500, variable overhead 11,500 × £2.00 = £23,000.',
                why: 'Each line is flexed on its own standard, not by scaling the old total up by a percentage. The two happen to give the same answer here and stop doing so the moment a standard has changed mid-year.',
              },
              {
                do: 'Copy the fixed overhead across at £30,000.',
                why: 'Making half as much again does not raise the rent. Flexing it would invent £4,500 of cost the business never faced, and would show as a fixed overhead variance that is purely arithmetic.',
              },
              {
                do: 'Total: 138,000 + 80,500 + 23,000 + 30,000 = £271,500, so flexed profit is £402,500 − £271,500 = £131,000.',
                why: 'This is what the business SHOULD have earned making 11,500 units. It is the only figure the actual result can fairly be set against.',
              },
            ],
            answer: 'Flexed revenue £402,500 · flexed cost £271,500 · flexed profit £131,000',
            tryIt: {
              q: 'A budget was set for 8,000 units at a standard variable cost of £21.00 a unit, with fixed costs of £30,000. Actual output was 9,400 units. What is the flexed budget total cost?',
              answer: 227400,
              unit: '£',
              hint: 'Flex the variable element only.',
              exp: '9,400 × £21.00 = £197,400 of variable cost, and the fixed element is carried across unchanged, so £197,400 + £30,000 = £227,400. Flexing the fixed cost as well would give £30,000 ÷ 8,000 = £3.75 a unit and 9,400 × £3.75 = £35,250, adding £5,250 of cost that nobody ever spent.',
            },
          },
          examtrap: 'Flex on the volume that actually happened, not on the volume that was sold if they differ, and not on some average of the two. And flex the revenue line — a flexed statement that leaves revenue at budget reports the whole of the extra sales as a favourable price variance.',
        },
      ],
      check: [
        {
          type: 'numeric',
          q: 'A budget for 5,000 units shows variable costs of £90,000 and fixed costs of £42,000. Actual output was 6,200 units. What is the total cost in the flexed budget?',
          unit: '£',
          answer: 153600,
          exp: 'The variable cost per unit is £90,000 ÷ 5,000 = £18.00, so the flexed variable cost is 6,200 × £18.00 = £111,600. The fixed £42,000 is carried across untouched, giving £111,600 + £42,000 = £153,600. Scaling the whole £132,000 up in proportion would give £163,680 and charge the business for rent it never paid.',
        },
        {
          type: 'truefalse',
          q: 'Identify whether each statement about budgets is correct.',
          statements: [
            { text: 'A flexed budget is prepared at the level of activity that actually occurred.', answer: true },
            { text: 'A rolling budget adds a further period as each period ends, keeping the horizon constant.', answer: true },
            { text: 'Fixed costs are increased in proportion to volume when a budget is flexed.', answer: false },
          ],
          exp: 'Flexing rebuilds the plan at the actual volume so that like is compared with like, and a rolling budget stops the planning horizon shrinking as the year runs down. The third is the error the whole technique exists to avoid: a fixed cost does not move with volume, so it is copied into the flexed budget unchanged. Scaling it up manufactures a variance out of nothing.',
        },
        {
          type: 'mcq',
          q: 'Actual costs were £310,000 for 12,000 units against a fixed budget of £260,000 for 10,000 units. Standard variable cost is £20.00 a unit. What does the comparison of £50,000 mostly represent?',
          opts: [
            'The cost of making 2,000 units the budget never planned for',
            'Overspending by the production department against its standards',
            'An increase in fixed overhead driven by the higher output',
            'A rise in the standard variable cost during the period',
          ],
          ans: 0,
          exp: '2,000 × £20.00 = £40,000 of the £50,000 is simply the cost of making units the budget never planned for. The flexed budget is £260,000 + £40,000 = £300,000, so the genuine overspend is £310,000 − £300,000 = £10,000 — real, worth asking about, and a fifth of what the raw comparison suggested.',
        },
      ],
    },
    {
      id: 'L3-MATS-4C',
      title: 'Budgets for a multi-product business',
      icon: '🧾',
      criteria: ['MATS-4.1.5'],
      cards: [
        {
          h: 'Six budgets, built in a fixed order',
          table: {
            headers: ['Budget', 'Built from', 'Expressed in'],
            rows: [
              ['Revenue', 'Units of each product × its standard selling price', 'Money'],
              ['Materials', 'Units × kilograms a unit, then × price a kilogram', 'Quantity AND money'],
              ['Labour', 'Units × hours a unit, then × rate an hour', 'Hours AND money'],
              ['Variable overhead', 'Total hours (or units) × the absorption rate', 'Money'],
              ['Fixed production overhead', 'A total agreed in advance', 'Money'],
              ['Non-manufacturing overhead', 'A total agreed in advance', 'Money'],
            ],
          },
          p: [
            'With more than one product the order matters, because the later budgets need the totals from the earlier ones. Work **product by product** down to quantities — kilograms, hours — then add the products together and price the combined quantity once. Two products drawing on the same store and the same workforce share one material budget and one labour budget.',
            'Materials and labour are wanted in quantity as well as in money. The buyer cannot order £190,000; they order 38,000 kilograms. The same is true of the labour budget, which is what tells the business how many people it needs.',
          ],
        },
        {
          h: 'Two products, one budget',
          worked: {
            title: 'Trentham — cast and forged units',
            problem: 'Cast units: 6,000 budgeted, selling at £60, needing 3 kg of material and 1.5 labour hours each. Forged units: 4,000 budgeted, selling at £90, needing 5 kg and 2.0 hours each. Material costs £5.00 a kilogram and labour £12.00 an hour. Variable production overhead is absorbed at £3.00 a labour hour. Fixed production overhead is £60,000 and non-manufacturing overhead £45,000.',
            steps: [
              {
                do: 'Revenue: 6,000 × £60 = £360,000 and 4,000 × £90 = £360,000, so £360,000 + £360,000 = £720,000.',
                why: 'Each product carries its own price, so revenue is the one budget that can never be built from a combined volume.',
              },
              {
                do: 'Materials in kilograms first: 6,000 × 3 = 18,000 kg and 4,000 × 5 = 20,000 kg, giving 18,000 + 20,000 = 38,000 kg. Then price it: 38,000 × £5.00 = £190,000.',
                why: 'Quantity before money. The buyer needs the 38,000 kg to place orders against, and pricing once at the end avoids rounding each product separately.',
              },
              {
                do: 'Labour in hours: 6,000 × 1.5 = 9,000 and 4,000 × 2.0 = 8,000, so 9,000 + 8,000 = 17,000 hours, and 17,000 × £12.00 = £204,000.',
                why: 'The hours figure is the one the business plans headcount from. If the budget covers a year at roughly 1,700 productive hours each, 17,000 hours is ten people.',
              },
              {
                do: 'Variable overhead on those same hours: 17,000 × £3.00 = £51,000.',
                why: 'It is absorbed on labour hours, so the labour budget has to be finished before this one can start — which is why the order is not arbitrary.',
              },
              {
                do: 'Add the two fixed totals as they stand and total the cost: 190,000 + 204,000 + 51,000 + 60,000 + 45,000 = £550,000. Budgeted profit is £720,000 − £550,000 = £170,000.',
                why: 'Non-manufacturing overhead is below the production line but still above the profit, so leaving it out of the cost total overstates the result by the whole £45,000.',
              },
            ],
            answer: 'Revenue £720,000 · cost £550,000 · budgeted profit £170,000, on 38,000 kg and 17,000 hours',
            tryIt: {
              q: 'A third product is added: 2,500 units, each needing 4 kg of the same material at £5.00 a kilogram. What does it add to the materials budget in money?',
              answer: 50000,
              unit: '£',
              hint: 'Quantity first, then price it.',
              exp: '2,500 × 4 = 10,000 kg, and 10,000 × £5.00 = £50,000. The combined materials budget becomes 38,000 + 10,000 = 48,000 kg costing £190,000 + £50,000 = £240,000. Nothing else on the card changes, because the material price is the same whichever product draws on the store.',
            },
          },
        },
        {
          h: 'Where the figures come from',
          split: {
            left: {
              title: 'Given to you in the task',
              items: [
                'Budgeted **units** of each product',
                'The standard **quantity** of each resource a unit',
                'The standard **price or rate** of each resource',
                'Fixed and non-manufacturing overhead **totals**',
              ],
            },
            right: {
              title: 'What you have to build',
              items: [
                'Material quantity, **then** material cost',
                'Labour hours, **then** labour cost',
                'Variable overhead on the hours you just built',
                'A cost total that includes the non-manufacturing line',
              ],
            },
          },
          examtrap: 'The two mistakes that cost most marks here are pricing before adding — working out each product\'s material cost separately and rounding twice — and leaving the non-manufacturing overhead out of the total because it sat below a subtotal on the page. Read what the subtotal is labelled before you decide what belongs above it.',
        },
      ],
      check: [
        {
          type: 'numeric',
          q: 'A business budgets 3,000 units of X, each needing 2.5 labour hours, and 5,000 units of Y, each needing 1.2 labour hours. Labour costs £14.00 an hour. What is the labour budget in money?',
          unit: '£',
          answer: 189000,
          exp: '3,000 × 2.5 = 7,500 hours and 5,000 × 1.2 = 6,000 hours, so 7,500 + 6,000 = 13,500 hours in total, and 13,500 × £14.00 = £189,000. The hours figure is worth writing down on its own: it is what the variable overhead budget is built on and what the headcount plan needs.',
        },
        {
          type: 'entrygrid',
          q: 'Product P needs 4 kg a unit and 6,000 units are budgeted. Product Q needs 7 kg a unit and 2,000 units are budgeted. Material costs £8.00 a kilogram. Complete the materials budget.',
          entrygrid: {
            title: 'Materials budget',
            rowHeader: 'Line',
            columns: ['Kilograms', 'Cost £'],
            rows: [
              { label: 'Product P', cells: { 0: 24000, 1: 192000 } },
              { label: 'Product Q', cells: { 0: 14000, 1: 112000 } },
              { label: 'Total materials budget', cells: { 0: 38000, 1: 304000 } },
            ],
          },
          exp: '6,000 × 4 = 24,000 kg for P and 2,000 × 7 = 14,000 kg for Q, so 24,000 + 14,000 = 38,000 kg altogether. Priced at £8.00 that is 24,000 × 8.00 = £192,000 and 14,000 × 8.00 = £112,000, totalling £304,000 — which is also 38,000 × 8.00 = £304,000, the check that the quantities and the money agree.',
        },
        {
          type: 'mcq',
          q: 'Why is the labour budget prepared before the variable production overhead budget?',
          opts: [
            'Because variable overhead is often absorbed on labour hours',
            'Because labour is a larger cost than variable overhead',
            'Because overhead budgets are always prepared last of all',
            'Because labour hours determine the fixed overhead total',
          ],
          ans: 0,
          exp: 'The overhead budget needs a figure the labour budget produces, so the order follows the dependency rather than the size of the numbers. Where variable overhead is absorbed on machine hours instead, the machine hours budget comes first for exactly the same reason. Fixed overhead is a total agreed in advance and is not driven by hours at all.',
        },
      ],
    },
    {
      id: 'L3-MATS-4D',
      title: 'The operating statement',
      icon: '📋',
      criteria: ['MATS-4.1.4'],
      cards: [
        {
          h: 'A bridge from what should have happened to what did',
          p: [
            'An operating statement starts at the **flexed budget profit** — what the business should have earned at the volume it actually achieved — and works down to the **actual profit**, naming every variance that explains the gap. Read it top to bottom and you have the whole month in one page: the plan, each thing that went differently, and the result.',
            'Its value is that it accounts for the difference **completely**. If the variances listed do not carry you exactly from one profit to the other, something has been missed or double-counted, and that arithmetic check is the first thing to run before reading a word of it.',
          ],
        },
        {
          h: 'Trentham, month to 30 June',
          example: {
            title: 'Operating statement — 11,500 units made and sold',
            rows: [
              ['', '£', ''],
              ['Flexed budget profit', '131,000', ''],
              ['Sales price variance', '(3,500)', 'Adverse'],
              ['Direct materials variance', '(3,700)', 'Adverse'],
              ['Direct labour variance', '1,600', 'Favourable'],
              ['Variable overhead variance', '(1,300)', 'Adverse'],
              ['Fixed production overhead variance', '(1,500)', 'Adverse'],
              ['**Actual profit**', '**122,600**', ''],
            ],
          },
          p: [
            'The gap is 131,000 − 122,600 = **£8,400** adverse, and the five variances net to exactly that: 3,500 + 3,700 + 1,300 + 1,500 = £10,000 adverse against £1,600 favourable. Anyone reading it can see immediately that no single failure caused the month — four modest adverse variances did, and the one department that beat its standard was labour.',
          ],
          callout: {
            kind: 'key',
            text: 'Adverse variances reduce profit and are shown in brackets; favourable variances increase it. That is the only sign convention you need, and it applies to a revenue variance exactly as it does to a cost one.',
          },
        },
        {
          h: 'What it does and does not tell you',
          split: {
            left: {
              title: 'What it shows',
              items: [
                'Which costs and revenues departed from standard',
                'The size of each departure, in pounds',
                'Whether the month was better or worse than it should have been',
                'A complete reconciliation, with nothing unexplained',
              ],
            },
            right: {
              title: 'What it does not show',
              items: [
                'Why any of them happened',
                'Whether the standard itself was right',
                'Whether anybody could have prevented it',
                'The effect of volume — flexing removed that first',
              ],
            },
          },
          examtrap: 'The statement begins at the FLEXED budget profit, not at the original budget profit. Starting from the original leaves the whole effect of the volume difference inside the variances, and the statement stops reconciling — which is the fastest way to spot that the wrong opening figure was used.',
        },
      ],
      check: [
        {
          type: 'numeric',
          q: 'A flexed budget profit is £84,000. The variances are: sales price £2,100 favourable, materials £5,400 adverse, labour £900 adverse and fixed overhead £1,200 favourable. What is the actual profit?',
          unit: '£',
          answer: 81000,
          exp: 'Favourable variances add and adverse ones subtract: 2,100 + 1,200 = £3,300 favourable and 5,400 + 900 = £6,300 adverse, so the net effect is £3,000 adverse. £84,000 − £3,000 = £81,000. The statement is only complete when the variances carry you exactly from the flexed profit to this figure.',
        },
        {
          type: 'picklist',
          q: 'Identify whether each variance is favourable or adverse.',
          picklist: {
            title: 'Reading the sign',
            rowHeader: 'Situation',
            choiceHeader: 'Variance',
            options: ['Favourable', 'Adverse'],
            rows: [
              { text: 'Actual materials cost £141,700 against a flexed budget of £138,000', answer: 1 },
              { text: 'Actual revenue £399,000 against a flexed budget of £402,500', answer: 1 },
              { text: 'Actual labour cost £78,900 against a flexed budget of £80,500', answer: 0 },
              { text: 'Actual variable overhead £24,300 against a flexed budget of £23,000', answer: 1 },
              { text: 'Actual fixed overhead £28,800 against a budget of £30,000', answer: 0 },
            ],
          },
          exp: 'For a cost, spending more than the flexed budget is adverse and spending less is favourable. For revenue it is the other way round in appearance but the same rule underneath: earning less than the flexed budget reduces profit, so it is adverse. Test every line the same way — did this push profit up or down? — and the sign never has to be memorised.',
        },
        {
          type: 'mcq',
          q: 'An operating statement starts at the original budget profit rather than the flexed budget profit. What is the consequence?',
          opts: [
            'The listed variances no longer reconcile to the actual profit',
            'The variances are still correct but their signs are reversed',
            'Only the sales price variance is affected by the change',
            'The statement is unaffected, since the two profits are always equal',
          ],
          ans: 0,
          exp: 'The whole point of the flexed profit is that it already carries the effect of the volume difference. Start from the original and that effect is left over, so the variances cannot bridge the gap and the statement fails its own arithmetic check. The two profits coincide only in the special case where actual volume equalled budgeted volume — which is why testing the technique on such a month proves nothing about it.',
        },
      ],
    },
    {
      id: 'L3-MATS-4E',
      title: 'Calculating the total variances',
      icon: '⚖️',
      criteria: ['MATS-4.2.1', 'MATS-4.2.2', 'MATS-4.2.3'],
      cards: [
        {
          h: 'Favourable or adverse, decided one way',
          p: [
            'A **variance** is the difference between the flexed budget and what actually happened. It is **favourable** when it makes profit higher than the flexed budget said it would be, and **adverse** when it makes profit lower. That is the whole rule, and it works on a revenue line as well as a cost one without any second convention to remember.',
            'For a cost, favourable means spending less than the flexed budget allowed. For revenue, favourable means earning more than the flexed budget expected. Nobody needs to memorise which way round to subtract if the question asked at the end is always the same one: **did this push profit up or down?**',
          ],
          callout: {
            kind: 'key',
            text: 'Favourable is not the same as good, and adverse is not the same as bad. A favourable material variance from buying inferior material that then wasted labour hours is a bad month wearing the wrong label, which is what the next lesson is about.',
          },
        },
        {
          h: 'The five totals this unit asks for',
          table: {
            headers: ['Variance', 'How it is found', 'Favourable when'],
            rows: [
              ['Sales price (total)', 'Actual revenue − flexed budget revenue', 'Actual revenue is higher'],
              ['Raw material (total)', 'Flexed budget cost − actual cost', 'Actual cost is lower'],
              ['Labour (total)', 'Flexed budget cost − actual cost', 'Actual cost is lower'],
              ['Variable overhead (total)', 'Flexed budget cost − actual cost', 'Actual cost is lower'],
              ['Fixed production overhead (total)', 'Budgeted overhead − actual overhead', 'Actual overhead is lower'],
            ],
          },
          p: [
            'Note the last row. Fixed overhead is **not flexed**, so its flexed budget figure is the original budget figure, and the variance is simply what was budgeted against what was spent. Every other line is measured against a budget that has already been rebuilt at the actual volume.',
            'Each of these is a **total**. Splitting a material variance into its price and usage halves, or a labour variance into rate and efficiency, is Level 4 work; this unit asks for the totals and marks them as totals.',
          ],
        },
        {
          h: 'One month, all five',
          worked: {
            title: 'Trentham — flexed budget against actual',
            problem: 'The flexed budget for 11,500 units is: revenue £402,500, materials £138,000, labour £80,500, variable overhead £23,000, fixed overhead £30,000. Actual results were: revenue £399,000, materials £141,700, labour £78,900, variable overhead £24,300, fixed overhead £31,500.',
            steps: [
              {
                do: 'Sales price: revenue fell short by £402,500 − £399,000 = £3,500, so £3,500 adverse.',
                why: 'The volume difference has already been taken out by flexing, so whatever revenue is left over or short must be price — either a discount given or a price rise not achieved.',
              },
              {
                do: 'Materials: £141,700 against £138,000, so £141,700 − £138,000 = £3,700 adverse.',
                why: 'More was spent than the flexed budget allowed for the units actually made, which means either the price paid or the quantity used was above standard.',
              },
              {
                do: 'Labour: £78,900 against £80,500, so £80,500 − £78,900 = £1,600 favourable.',
                why: 'The one line that beat its standard. On its own that is good news; read alongside an adverse material variance it may be the other half of one story.',
              },
              {
                do: 'Variable overhead: £24,300 − £23,000 = £1,300 adverse. Fixed overhead: £31,500 − £30,000 = £1,500 adverse.',
                why: 'The fixed line is measured against the ORIGINAL £30,000, because nothing about making 1,500 extra units was ever going to change it.',
              },
              {
                do: 'Net them: adverse of 3,500 + 3,700 + 1,300 + 1,500 = £10,000 against £1,600 favourable, so £10,000 − £1,600 = £8,400 adverse.',
                why: 'The net must equal the gap between flexed profit and actual profit — £131,000 − £122,600 = £8,400. When it does not, a variance has been signed the wrong way, and this is the check that finds it.',
              },
            ],
            answer: 'Sales price £3,500 A · materials £3,700 A · labour £1,600 F · variable overhead £1,300 A · fixed overhead £1,500 A · net £8,400 adverse',
            tryIt: {
              q: 'The flexed budget allows £96,000 of labour and the actual labour cost was £101,400. How large is the total labour variance?',
              answer: 5400,
              unit: '£',
              hint: 'The size is one question; the direction is the next.',
              exp: '£101,400 − £96,000 = £5,400 more than the flexed budget allowed, so the variance is £5,400 adverse. Subtracting the other way round gives the same size with the opposite sign, which is why the reliable habit is to ask whether profit went up or down rather than to memorise an order of subtraction.',
            },
          },
        },
        {
          h: 'Where the marks are lost',
          split: {
            left: {
              title: 'Do',
              items: [
                'Flex **before** comparing anything',
                'Compare each cost with its own flexed line',
                'Measure fixed overhead against the original budget',
                'Check the variances net to the profit difference',
              ],
            },
            right: {
              title: 'Do not',
              items: [
                'Compare actual with the **original** budget',
                'Flex the fixed overhead line',
                'Report a size without saying favourable or adverse',
                'Assume favourable means the month went well',
              ],
            },
          },
          examtrap: 'A variance stated without a direction is worth nothing: £3,700 could be a saving or an overspend, and the reader cannot tell. Write "£3,700 adverse" every time, even when the answer box only asks for a figure — the direction is usually a separate mark.',
        },
      ],
      check: [
        {
          type: 'numeric',
          q: 'The flexed budget allows £64,800 of materials for the units actually made, and £61,950 was spent. How large is the total materials variance?',
          unit: '£',
          answer: 2850,
          exp: '£64,800 − £61,950 = £2,850 less was spent than the flexed budget allowed, so the variance is £2,850 favourable. It is favourable because it raises profit above the flexed figure — which is the test to apply, rather than remembering that costs work one way and revenues the other.',
        },
        {
          type: 'truefalse',
          q: 'Identify whether each statement about variances is correct.',
          statements: [
            { text: 'A favourable sales price variance means actual revenue exceeded the flexed budget revenue.', answer: true },
            { text: 'The fixed production overhead variance is found by flexing budgeted overhead to actual volume.', answer: false },
            { text: 'A favourable variance always indicates that the department performed well.', answer: false },
          ],
          exp: 'Flexing has already removed the volume from the revenue line, so a favourable balance there is price. Fixed overhead is never flexed, which is precisely why its variance is the budget against the actual spend and nothing else. And favourable describes the direction of the effect on profit, not the quality of the decision behind it — cheap material that then wastes labour hours produces a favourable variance and a worse month.',
        },
        {
          type: 'entrygrid',
          q: 'The flexed budget is: materials £52,000, labour £38,000, variable overhead £11,000. Actual costs were materials £54,600, labour £36,200, variable overhead £11,900. Enter the size of each variance.',
          entrygrid: {
            title: 'Total cost variances',
            rowHeader: 'Cost',
            columns: ['Favourable £', 'Adverse £'],
            rows: [
              { label: 'Direct materials', col: 1, amount: 2600 },
              { label: 'Direct labour', col: 0, amount: 1800 },
              { label: 'Variable overhead', col: 1, amount: 900 },
            ],
          },
          exp: '£54,600 − £52,000 = £2,600 overspent on materials and £11,900 − £11,000 = £900 overspent on variable overhead, both adverse. Labour came in under: £38,000 − £36,200 = £1,800 favourable. Netting them gives 2,600 + 900 = £3,500 adverse against £1,800 favourable, so £1,700 adverse in total — and the actual cost of £102,700 is exactly £1,700 above the flexed £101,000.',
        },
      ],
    },
    {
      id: 'L3-MATS-4F',
      title: 'Investigating and reporting variances',
      icon: '🔎',
      criteria: ['MATS-4.3.1', 'MATS-4.3.2', 'MATS-4.3.3'],
      cards: [
        {
          h: 'What each variance is usually telling you',
          table: {
            headers: ['Variance', 'Likely causes', 'Who would know'],
            rows: [
              ['Materials adverse', 'Supplier price rise · bulk discount lost · poorer quality causing waste · urgent order at a premium', 'Buyer, production manager'],
              ['Materials favourable', 'Cheaper supplier · discount negotiated · a lower grade of material bought', 'Buyer'],
              ['Labour adverse', 'Pay award above standard · overtime worked · unskilled staff taking longer', 'HR, production manager'],
              ['Labour favourable', 'Lower grade of staff used · a genuine efficiency gain · idle time avoided', 'Production manager'],
              ['Sales price adverse', 'Discounting to hold volume · a competitor undercutting · list price not achieved', 'Sales manager'],
              ['Fixed overhead adverse', 'Rent or insurance rise · unbudgeted repair · a standard set too long ago', 'Finance'],
            ],
          },
          p: [
            'None of these is a conclusion, and a report that states one as though it were is doing the same job as a guess. The table narrows the search; the person named at the end of the row settles it.',
          ],
        },
        {
          h: 'Variances do not happen one at a time',
          p: [
            'The most useful thing to know about variance analysis is that one decision often produces two variances with opposite signs. Buying a cheaper grade of material gives a **favourable** material price effect — and then more of it is wasted and the machines jam, so the material total may turn adverse anyway and the labour hours certainly rise.',
            'The pattern repeats everywhere. Cutting the selling price gives an adverse sales price variance and, if it worked, a volume the flexed budget has already absorbed. Using cheaper, less skilled staff gives a favourable labour rate and an adverse efficiency in the hours they take. **Read the variances together or you will congratulate one department for a problem it caused in another.**',
          ],
          examtrap: 'When a question shows one favourable and one adverse variance in the same month, the expected answer is nearly always that they are connected. Saying so is what distinguishes an interpretation from a description.',
        },
        {
          h: 'Which ones are worth investigating',
          table: {
            headers: ['Test', 'The question to ask'],
            rows: [
              ['Size in money', 'Is it large enough to matter to a business this size?'],
              ['Size as a percentage', 'Is £4,000 on £40,000 the same news as £4,000 on £900,000?'],
              ['Trend', 'Is it growing, or has it appeared in the same direction for months?'],
              ['Controllability', 'Could anyone here have prevented it, or is it a market price?'],
              ['Cost against benefit', 'Will investigating cost more than anything it could recover?'],
            ],
          },
          p: [
            'A business normally sets a rule in advance — anything above a stated amount, or above a stated percentage of the budgeted figure, is investigated — because deciding case by case after the event invites the comfortable answer. Both tests are needed: a percentage rule alone chases trivial money on small lines, and a money rule alone ignores a small line that has doubled.',
            'A variance nobody could have controlled is still worth **knowing** about, because it usually means the standard needs revising. It is just not worth investigating as a performance failure.',
          ],
        },
        {
          h: 'Reporting, and what to recommend',
          p: [
            'A variance report that stops at the numbers has done half the job. What is asked for is the size, the likely cause, and what should be done — in that order, briefly, and to someone who can act on it.',
          ],
          split: {
            left: {
              title: 'Remedial action worth proposing',
              items: [
                'Renegotiate with the supplier, or find another',
                'Train or reallocate staff where quality caused rework',
                'Schedule to avoid the overtime that caused the premium',
                'Review the selling price rather than keep discounting',
                'Revise a standard that has been overtaken by events',
              ],
            },
            right: {
              title: 'What makes a report useless',
              items: [
                'A figure with no direction attached',
                'A cause asserted with no evidence behind it',
                'Blame aimed at a manager who controlled nothing',
                'A recommendation that costs more than the variance',
                'Silence about a favourable variance that hid a problem',
              ],
            },
          },
          callout: {
            kind: 'key',
            text: 'Revising the standard is a legitimate recommendation and often the right one. A card that no longer describes reality generates a variance every month that measures nothing but its own age.',
          },
        },
      ],
      check: [
        {
          type: 'mcq',
          q: 'A month shows a favourable materials variance and an adverse labour variance. What is the most likely single explanation?',
          opts: [
            'A cheaper, lower grade of material took longer to work with',
            'A pay award was made at the same time as a supplier discount',
            'The material standard and the labour standard were both wrong',
            'Production volume was higher than the original budget allowed',
          ],
          ans: 0,
          exp: 'One decision producing two variances of opposite sign is the commonest pattern in this outcome, and cheaper material that is harder to machine is its textbook case. The second option is possible but needs two unrelated events on the same page. The last is ruled out by the technique itself: flexing removed the volume difference before any variance was calculated.',
        },
        {
          type: 'truefalse',
          q: 'Identify whether each statement about investigating variances is correct.',
          statements: [
            { text: 'A variance should be judged both in money and as a percentage of the budgeted figure.', answer: true },
            { text: 'Revising an out-of-date standard can be a valid response to a persistent variance.', answer: true },
            { text: 'A variance outside the control of the business is not worth reporting at all.', answer: false },
          ],
          exp: 'Money alone misses a small line that has doubled; a percentage alone chases trivial sums on small lines, so both tests are applied. A standard that no longer describes reality produces a variance every month that measures its own age, and revising it is the fix. An uncontrollable variance is still worth reporting — the business needs to know a market price has moved, even though nobody here is going to be asked to explain it.',
        },
        {
          type: 'picklist',
          q: 'Identify the most likely cause of each variance.',
          picklist: {
            title: 'Cause and effect',
            rowHeader: 'Variance',
            choiceHeader: 'Most likely cause',
            options: ['A purchasing decision', 'A labour decision', 'A selling decision'],
            rows: [
              { text: 'Adverse materials variance after losing a bulk discount', answer: 0 },
              { text: 'Adverse labour variance caused by overtime worked at a premium', answer: 1 },
              { text: 'Adverse sales price variance after discounting to hold market share', answer: 2 },
              { text: 'Favourable materials variance after switching to a cheaper supplier', answer: 0 },
              { text: 'Favourable labour variance after using a lower grade of staff', answer: 1 },
            ],
          },
          exp: 'Attributing a variance to a decision is what turns a number into something a manager can act on. Notice that two of these are favourable and still trace back to a decision worth questioning: a cheaper supplier and a lower grade of staff both save money now and both routinely cost more elsewhere. The question a report should ask of a favourable variance is the same one it asks of an adverse one.',
        },
      ],
    },
  ];


  var PATH = [
    {
      unit: 'mats',
      level: 3,
      title: 'Management Accounting Techniques',
      outcome: 1,
      outcomeTitle: 'Understand the purpose and use of management accounting within organisations',
      weighting: 10,
      lessons: ORIENTATION_LESSONS.concat(LO1_LESSONS),
      cheatsheet: {
        id: 'L3-MATS-1S',
        title: 'Outcome 1 — contribution, and the two techniques',
        icon: '🗂️',
        card: {
          h: 'Everything Outcome 1 asks for, on one page',
          formula: 'Contribution = Revenue − Variable costs · Profit = Contribution − Fixed costs',
          table: {
            headers: ['', 'What it is', 'What it excludes'],
            rows: [
              ['Prime cost', 'Direct materials + direct labour + direct expenses', 'All overhead, variable as well as fixed'],
              ['Marginal cost', 'Prime cost + variable production overhead', 'Fixed production overhead; all selling costs'],
              ['Full absorption cost', 'Marginal cost + fixed production overhead absorbed', 'Selling, distribution and administration'],
              ['Contribution', 'Revenue − all variable costs', 'Fixed costs of every kind'],
            ],
          },
          split: {
            left: {
              title: 'Marginal costing',
              items: [
                'Only variable costs enter inventory',
                'Fixed production overhead written off in full each period',
                'Right for short-term decisions and CVP',
                'Cannot be flattered by producing for stock',
              ],
            },
            right: {
              title: 'Absorption costing',
              items: [
                'A share of fixed production overhead enters inventory',
                'That share is carried forward on unsold units',
                'Required by IAS 2 for the financial statements',
                'Right for long-run pricing and external reporting',
              ],
            },
          },
          p: [
            '**The profit difference, every time:** change in inventory units × fixed production overhead per unit. Inventory up, absorption profit higher. Inventory down, absorption profit lower. Inventory unchanged, the two agree.',
            '**Segmenting** runs the same subtraction per product and stops at contribution, because profit per product depends on how the fixed costs were split and the split is a choice, not a fact.',
          ],
          examtrap: 'Contribution is not gross profit, and full absorption cost is not the cost of getting a unit to a customer. Both mistakes come from adding a line that belongs to a different total.',
        },
      },
    },
    {
      unit: 'mats',
      level: 3,
      title: 'Management Accounting Techniques',
      outcome: 2,
      outcomeTitle: 'Use techniques required for dealing with costs',
      weighting: 15,
      lessons: LO2_LESSONS,
      cheatsheet: {
        id: 'L3-MATS-2S',
        title: 'Outcome 2 — costs, stores and behaviour',
        icon: '🗂️',
        card: {
          h: 'Every technique in Outcome 2, on one page',
          formula: 'EOQ = √((2 × annual usage × ordering cost) ÷ inventory holding cost)',
          table: {
            headers: ['Level', 'How it is found'],
            rows: [
              ['Buffer inventory', 'Re-order level − (average usage × average lead time)'],
              ['Re-order level', '(average usage × average lead time) + buffer inventory'],
              ['Minimum re-order quantity', 'Average usage × average lead time'],
              ['Maximum inventory level', 'Buffer inventory + maximum re-order quantity'],
              ['Maximum re-order quantity', 'Maximum inventory level − buffer inventory'],
            ],
          },
          split: {
            left: {
              title: 'Where a cost is posted',
              items: [
                'Direct materials and labour → **work in progress**',
                'Indirect materials and labour → **production overhead control**',
                'Overhead absorbed → Dr work in progress, Cr overhead control',
                'Units completed → Dr finished goods, Cr work in progress',
                'Under-absorbed → Dr cost of sales; over-absorbed → Cr cost of sales',
              ],
            },
            right: {
              title: 'How a cost behaves',
              items: [
                'Fixed — same in total, **falls** per unit',
                'Variable — same per unit, **rises** in total',
                'Semi-variable — a fixed floor plus a variable slope',
                'Stepped — flat, then a jump, then flat again',
                'High-low: Δcost ÷ Δactivity, then substitute back for fixed',
              ],
            },
          },
          p: [
            '**Equivalent units** — completed units + (closing WIP × its percentage complete), worked out separately for materials and for conversion, because the two are almost never the same percentage. **Normal loss** is carried by the good output, so divide by EXPECTED output; **abnormal loss** is valued at that same rate and written off on its own.',
            '**FIFO** issues the oldest cost first, so when prices rise it reports a lower cost of sales, a higher closing inventory and a higher profit than **AVCO**, which re-averages on every receipt. Neither changes the cash or the total charged over the life of the inventory.',
            '**Costing systems** — job for one-offs made to order, batch for identical groups, unit for a single continuous product, service for anything with no physical output, costed on a composite unit such as cost per passenger-mile.',
          ],
          examtrap: 'Two reversals cause most of the lost marks here. A fixed cost is fixed IN TOTAL and falls per unit. And high-low takes the highest and lowest ACTIVITY levels, not the highest and lowest costs — and if the question says fixed costs step between them, strip the step out of the high point before dividing.',
        },
      },
    },
    {
      unit: 'mats',
      level: 3,
      title: 'Management Accounting Techniques',
      outcome: 3,
      outcomeTitle: 'Attribute costs according to organisational requirements',
      weighting: 20,
      lessons: LO3_LESSONS,
      cheatsheet: {
        id: 'L3-MATS-3S',
        title: 'Outcome 3 — overheads, from invoice to unit',
        icon: '🗂️',
        card: {
          h: 'The whole chain, on one page',
          flow: ['Allocate and apportion to ALL centres', 'Reapportion service centres into production centres', 'Rate = budgeted overhead ÷ budgeted activity', 'Absorb = rate × ACTUAL activity', 'Difference to profit or loss'],
          table: {
            headers: ['Step', 'Rule', 'The check'],
            rows: [
              ['Allocate', 'The whole cost belongs to one centre', 'No basis is needed — the invoice already says whose it is'],
              ['Apportion', 'Share on a basis the cost genuinely varies with', 'The shares add back to the original cost'],
              ['Reapportion', 'Empty every service centre into the production centres', 'The grand total is unchanged'],
              ['Absorb', 'Budgeted rate × actual activity', 'Never actual overhead ÷ actual hours'],
            ],
          },
          split: {
            left: {
              title: 'Bases of apportionment',
              items: [
                'Rent, rates, buildings insurance — **floor area**',
                'Heat and light — **floor area**',
                'Machine insurance and depreciation — **carrying amount of machinery**',
                'Canteen, personnel, welfare — **number of employees**',
                'Power — **machine hours**',
              ],
            },
            right: {
              title: 'Under and over',
              items: [
                'Absorbed **less** than incurred → under-absorbed',
                'Under-absorbed → **debit** profit or loss → profit falls',
                'Absorbed **more** than incurred → over-absorbed',
                'Over-absorbed → **credit** profit or loss → profit rises',
                'Two causes always: activity, and spending',
              ],
            },
          },
          p: [
            '**Direct method** — push each service centre straight into the production centres and ignore the work service centres do for each other. **Step-down** — close the centre serving the most others first, spread it over everything it serves including the other service centres, then close the next one without sending anything back. The second centre is bigger than it started, and splitting the figure it started with is the standard error.',
            '**Activity-based costing** — pool the cost of an activity, divide by the driver that causes it, charge each product by its driver usage. It changes which product carries the overhead, never how much overhead there is.',
          ],
          examtrap: 'Absorbed = budgeted RATE × ACTUAL activity. Actual overhead ÷ actual hours is a rate nobody used; budgeted overhead ÷ budgeted hours hands back the budget. Both give a difference of nil, which is the tell that the wrong figures went in.',
        },
      },
    },
    {
      unit: 'mats',
      level: 3,
      title: 'Management Accounting Techniques',
      outcome: 4,
      outcomeTitle: 'Investigate deviations from budgets',
      weighting: 15,
      lessons: LO4_LESSONS,
      cheatsheet: {
        id: 'L3-MATS-4S',
        title: 'Outcome 4 — flexing, variances and the statement',
        icon: '🗂️',
        card: {
          h: 'Everything Outcome 4 asks for, on one page',
          flow: ['Standard card × budgeted volume = the budget', 'Rebuild it at ACTUAL volume = the flexed budget', 'Flexed against actual = the variances', 'Flexed profit − variances = actual profit'],
          formula: 'Flex the VARIABLE lines · copy the FIXED lines across unchanged',
          table: {
            headers: ['Variance (total)', 'How it is found', 'Favourable when'],
            rows: [
              ['Sales price', 'Actual revenue − flexed budget revenue', 'Actual revenue is higher'],
              ['Raw material', 'Flexed budget cost − actual cost', 'Actual cost is lower'],
              ['Labour', 'Flexed budget cost − actual cost', 'Actual cost is lower'],
              ['Variable overhead', 'Flexed budget cost − actual cost', 'Actual cost is lower'],
              ['Fixed production overhead', 'BUDGETED overhead − actual overhead', 'Actual overhead is lower'],
            ],
          },
          split: {
            left: {
              title: 'Budgets, in the order they are built',
              items: [
                'Revenue — units × each product\'s own price',
                'Materials — **quantity first**, then price it once',
                'Labour — **hours first**, then rate them',
                'Variable overhead — the rate × those hours',
                'Fixed production and non-manufacturing — totals agreed in advance',
              ],
            },
            right: {
              title: 'Which variances to investigate',
              items: [
                'Size **in money** — does it matter to a business this size?',
                'Size **as a percentage** — of the figure it relates to',
                'Trend — the same direction for months means a stale standard',
                'Controllability — could anyone here have prevented it?',
                'Cost against benefit — will the inquiry recover its own cost?',
              ],
            },
          },
          p: [
            '**Favourable** means profit ended higher than the flexed budget said; **adverse** means lower. One test covers costs and revenues alike, so no second convention is needed. A figure with no direction attached is worth nothing — write "£3,700 adverse" every time.',
            '**The operating statement** starts at the FLEXED budget profit, lists every variance, and must land exactly on the actual profit. If it does not, a variance has been signed the wrong way or the original budget profit was used as the opening figure.',
            '**Variances come in pairs.** Cheaper material gives a favourable price and an adverse usage; cheaper staff give a favourable rate and adverse hours. When a question shows one of each in the same month, the expected answer is that they are connected.',
          ],
          examtrap: 'Fixed production overhead is never flexed. Its flexed figure IS the original budget, so the variance is budget against actual spend. Flexing it manufactures a variance out of arithmetic and breaks the reconciliation at the bottom of the statement.',
        },
      },
    },
  ];

  /* ══════════════════════════════════════════════════════════════════════════
     PRACTICE BANK — met cold, and separate from the lesson checks
     ══════════════════════════════════════════════════════════════════════════ */

  var QUESTIONS = [
    /* ── Outcome 1 — purpose and use (10%) ─────────────────────────────── */
    {
      id: 'M-1-01', unitKey: 'mats', lo: 1, criteria: ['MATS-1.1.1'],
      type: 'mcq',
      q: 'Which of these best describes the purpose of internal reporting?',
      opts: [
        'To put planned and actual figures side by side, early enough to act',
        'To present the year\'s results to shareholders in a standard format',
        'To establish what each product cost the business to manufacture',
        'To forecast the revenue and the costs of the coming period',
      ],
      ans: 0,
      exp: 'Costing produces the actual figures, budgeting the expected ones, and internal reporting is what brings the two together. The point of the comparison is timing: a variance reported at the year end is history, and a variance reported in week two is something a manager can still do something about. Presenting results to shareholders is financial accounting and follows a prescribed format; internal reporting follows none.',
    },
    {
      id: 'M-1-02', unitKey: 'mats', lo: 1, criteria: ['MATS-1.1.2'],
      type: 'truefalse',
      q: 'Identify whether each statement about management accounting information is correct.',
      statements: [
        { text: 'It is not audited, so mistakes in it are less serious than mistakes in the financial statements.', answer: false },
        { text: 'It supports planning, control and decision making.', answer: true },
        { text: 'Its format is prescribed by accounting standards.', answer: false },
      ],
      exp: 'The absence of an audit cuts the other way: nobody is going to catch the mistake, and the report is acted on immediately — a product dropped, a price cut, a supplier changed. By the time the error surfaces the decision has been taken. No standard governs the format, which is exactly what lets it be shaped to the decision at hand.',
    },
    {
      id: 'M-1-03', unitKey: 'mats', lo: 1, criteria: ['MATS-1.1.3'],
      type: 'numeric',
      q: 'A business sells 12,400 units at £34. Variable costs are £21.50 a unit. Fixed costs are £118,000. What is the contribution for the period?',
      unit: '£', answer: 155000,
      exp: 'Contribution per unit is 34.00 − 21.50 = £12.50, and 12,400 × 12.50 = £155,000.00. Fixed costs play no part: they come off after contribution to give a profit of 155,000.00 − 118,000.00 = £37,000.00, and deducting them first is the commonest way to turn this into the wrong answer.',
    },
    {
      id: 'M-1-04', unitKey: 'mats', lo: 1, criteria: ['MATS-1.1.3'],
      type: 'numeric',
      q: 'Contribution for the period is £206,400 and fixed costs are £149,700. What is the profit?',
      unit: '£', answer: 56700,
      exp: '206,400.00 − 149,700.00 = £56,700.00. Working from contribution downwards is the layout to keep: fixed costs appear once, in total, and never as a figure per unit.',
    },
    {
      id: 'M-1-05', unitKey: 'mats', lo: 1, criteria: ['MATS-1.1.3'],
      type: 'mcq',
      q: 'Contribution per unit is £9. Sales rise by 700 units and nothing else changes. What happens to profit?',
      opts: [
        'It rises by £6,300, the contribution of the extra units',
        'It rises by £6,300 less a share of the fixed costs',
        'It rises by 700 times the selling price per unit',
        'It cannot be found without the fixed cost total',
      ],
      ans: 0,
      exp: '700 × 9.00 = £6,300.00. The fixed costs were already being met before these units were sold and do not change because of them, so the whole of each unit\'s contribution falls through to profit. Deducting a further share of fixed costs charges the same costs twice, and it is why contribution rather than profit per unit is the figure to reason with.',
    },
    {
      id: 'M-1-06', unitKey: 'mats', lo: 1, criteria: ['MATS-1.1.4'],
      type: 'numeric',
      q: 'A product has revenue of £84,000 and variable costs of £52,080. What is its contribution to sales ratio, as a percentage?',
      unit: '%', answer: 38,
      exp: 'Contribution is 84,000.00 − 52,080.00 = £31,920.00, and 31,920.00 ÷ 84,000.00 = 0.38, or 38.0%. The ratio matters because it compares products of different sizes: a small product with a high ratio can be worth more attention than a large one with a low ratio.',
    },
    {
      id: 'M-1-07', unitKey: 'mats', lo: 1, criteria: ['MATS-1.1.4'],
      type: 'mcq',
      q: 'A segmented statement shows three products, each with a positive contribution. Fixed costs are then apportioned across them by revenue, and one product shows a loss. What is the effect on total profit of discontinuing it?',
      opts: [
        'Total profit falls, by the amount of the contribution that is lost',
        'Total profit rises, by the amount of the loss that is removed',
        'Total profit is unchanged, because the fixed costs move to the other products',
        'Total profit falls, by the amount of the loss that was reported',
      ],
      ans: 0,
      exp: 'The fixed costs do not leave with the product — they are simply reapportioned across the two that remain, which often pushes one of those into a reported loss instead. What genuinely disappears is the contribution, so profit falls by exactly that. The apportioned loss was a fact about the apportionment, never about the product.',
    },
    {
      id: 'M-1-08', unitKey: 'mats', lo: 1, criteria: ['MATS-1.1.4'],
      type: 'gapfill',
      q: 'Complete the sentence about segmented reporting.',
      template: 'A segmented statement is normally taken down to {0} rather than to profit, because a profit figure per product depends on how the {1} were split between them.',
      gaps: [
        { options: ['contribution', 'revenue', 'prime cost'], answer: 0 },
        { options: ['fixed costs', 'variable costs', 'direct materials'], answer: 0 },
      ],
      exp: 'Contribution is a fact about the product: its revenue less the costs that exist only because it was made and sold. Anything below it requires an apportionment of costs the product shares with everything else, and the answer then changes with the apportionment method while nothing about the business has changed.',
    },
    {
      id: 'M-1-09', unitKey: 'mats', lo: 1, criteria: ['MATS-1.2.1'],
      type: 'picklist',
      q: 'Classify each cost under ABSORPTION costing.',
      picklist: {
        title: 'Absorption costing',
        rowHeader: 'Cost', choiceHeader: 'Classification',
        options: ['Product cost', 'Period cost'],
        rows: [
          { text: 'Steel used in the units produced', answer: 0 },
          { text: 'Wages of the assembly line staff', answer: 0 },
          { text: 'Insurance of the factory building', answer: 0 },
          { text: 'Commission paid to the sales team', answer: 1 },
          { text: 'Salary of the finance director', answer: 1 },
          { text: 'Cost of delivering finished goods to customers', answer: 1 },
        ],
      },
      exp: 'Absorption costing treats every cost of MAKING the units as a product cost, fixed production overhead included — so factory insurance attaches to units and sits in inventory until they are sold. Costs of selling the units or running the business are period costs and reach profit or loss immediately. The factory insurance row is the only one that would move under marginal costing, where it becomes a period cost.',
    },
    {
      id: 'M-1-10', unitKey: 'mats', lo: 1, criteria: ['MATS-1.2.1'],
      type: 'entrygrid',
      q: 'A month\'s costs are: direct materials £46,000; direct labour £38,000; factory rent and rates £22,000; sales commission £9,000; head office salaries £17,000. Sort each into the column it belongs in under absorption costing.',
      entrygrid: {
        title: 'Absorption costing, month to 31 May',
        rowHeader: 'Cost',
        columns: ['Product cost £', 'Period cost £'],
        rows: [
          { label: 'Direct materials', col: 0, amount: 46000 },
          { label: 'Direct labour', col: 0, amount: 38000 },
          { label: 'Factory rent and rates', col: 0, amount: 22000 },
          { label: 'Sales commission', col: 1, amount: 9000 },
          { label: 'Head office salaries', col: 1, amount: 17000 },
        ],
      },
      exp: 'Product costs total 46,000.00 + 38,000.00 + 22,000.00 = £106,000.00, and they attach to the units made rather than to the month — so any of them sitting in unsold inventory at 31 May has not touched May\'s profit at all. Period costs of 9,000.00 + 17,000.00 = £26,000.00 reach profit or loss in May whatever happened to production. Factory rent is the row that separates the two techniques: under marginal costing it would move to the second column.',
    },
    {
      id: 'M-1-11', unitKey: 'mats', lo: 1, criteria: ['MATS-1.2.2'],
      type: 'truefalse',
      q: 'Identify whether each statement about the two costing techniques is correct.',
      statements: [
        { text: 'Under marginal costing, inventory is valued at variable production cost only.', answer: true },
        { text: 'Under absorption costing, a share of fixed production overhead is included in the value of inventory.', answer: true },
        { text: 'Under absorption costing, selling costs are included in the value of inventory.', answer: false },
      ],
      exp: 'The first two are the two techniques stated. The third is the overreach: absorption costing absorbs PRODUCTION overhead into units and nothing else. Selling, distribution and administration are period costs under both techniques and never enter inventory — which is also what IAS 2 requires for the financial statements.',
    },
    {
      id: 'M-1-12', unitKey: 'mats', lo: 1, criteria: ['MATS-1.2.3'],
      type: 'numeric',
      q: 'Fixed production overhead is absorbed at £7.50 a unit. During the period inventory rose by 2,100 units. By how much does absorption costing profit exceed marginal costing profit?',
      unit: '£', answer: 15750,
      exp: '2,100 × 7.50 = £15,750.00. Inventory rising means that much fixed overhead was carried forward in the value of closing inventory rather than charged against this period, so absorption reports that much more profit. The whole difference between the two techniques is this one product, every time.',
    },
    {
      id: 'M-1-13', unitKey: 'mats', lo: 1, criteria: ['MATS-1.2.3'],
      type: 'mcq',
      q: 'In a period a business produced 9,000 units and sold 9,600. How do the two profit figures compare?',
      opts: [
        'Absorption profit is lower, because inventory fell and overhead brought forward is charged this period',
        'Absorption profit is higher, because more units were sold than made',
        'They are equal, because production and sales are both above 9,000 units',
        'Absorption profit is higher, because absorption costing always reports the larger figure',
      ],
      ans: 0,
      exp: 'Selling 600 more units than were made means inventory fell by 600. Those units carried fixed overhead in from an earlier period, and selling them releases it into this one on top of the overhead this period generated — so absorption charges more and reports less. "Absorption is always higher" is only true while inventory is rising.',
    },
    {
      id: 'M-1-14', unitKey: 'mats', lo: 1, criteria: ['MATS-1.2.3'],
      type: 'mcq',
      q: 'Why can a manager rewarded on absorption costing profit improve their reported figures without selling anything more?',
      opts: [
        'By producing more units, which parks fixed overhead in closing inventory instead of charging it',
        'By producing fewer units, which reduces the total fixed overhead incurred',
        'By reclassifying selling costs as production costs in the inventory valuation',
        'By switching the inventory valuation from FIFO to AVCO',
      ],
      ans: 0,
      exp: 'Every unit made absorbs a share of fixed overhead, and the share on units that are not sold is carried forward in inventory rather than charged. Making for stock therefore raises this period\'s reported profit even though nothing extra was sold. It is the standard argument for judging managers on marginal costing profit, which cannot be moved this way. Producing fewer units does not reduce fixed overhead — that is what makes it fixed.',
    },
    {
      id: 'M-1-15', unitKey: 'mats', lo: 1, criteria: ['MATS-1.2.4'],
      type: 'picklist',
      q: 'Identify the technique better suited to each purpose.',
      picklist: {
        title: 'Choosing a technique',
        rowHeader: 'Purpose', choiceHeader: 'Better suited',
        options: ['Marginal costing', 'Absorption costing'],
        rows: [
          { text: 'Deciding whether to accept a one-off order at a reduced price', answer: 0 },
          { text: 'Break-even and cost-volume-profit analysis', answer: 0 },
          { text: 'Valuing closing inventory in the published financial statements', answer: 1 },
          { text: 'Setting a long-run price that must recover every cost', answer: 1 },
          { text: 'Judging a production manager on this month\'s reported profit', answer: 0 },
        ],
      },
      exp: 'Short-run questions turn on what actually changes, which is variable cost, so marginal costing answers them — and it is also the fairer basis for judging a manager, because it cannot be improved by producing for stock. Long-run questions and external reporting need every cost to be recovered and compared, which is absorption: IAS 2 gives no choice about the inventory figure in the financial statements.',
    },
    {
      id: 'M-1-16', unitKey: 'mats', lo: 1, criteria: ['MATS-1.2.4'],
      type: 'truefalse',
      q: 'Identify whether each statement about the long run is correct.',
      statements: [
        { text: 'Over the life of a business, the two techniques report the same total profit.', answer: true },
        { text: 'The difference between them is a matter of timing rather than of amount.', answer: true },
        { text: 'Marginal costing charges less fixed overhead in total than absorption costing does.', answer: false },
      ],
      exp: 'Both techniques eventually charge every pound of fixed overhead that was incurred; they disagree only about WHEN. Once inventory returns to nothing — as it must, over the life of a business — the same costs have been charged and the same total profit reported. Nothing about marginal costing reduces the fixed overhead a business bears.',
    },
    {
      id: 'M-1-17', unitKey: 'mats', lo: 1, criteria: ['MATS-1.2.5'],
      type: 'numeric',
      q: 'Direct materials £8.60, direct labour £11.40, direct expenses £1.20, variable production overhead £2.70, fixed production overhead £4.90, distribution £1.80. What is the prime cost per unit?',
      unit: '£', answer: 21.2,
      exp: '8.60 + 11.40 + 1.20 = £21.20. Prime cost is the direct costs only — every overhead is excluded, the variable ones as well as the fixed. "Prime" means direct, not "everything that moves with output".',
    },
    {
      id: 'M-1-18', unitKey: 'mats', lo: 1, criteria: ['MATS-1.2.5'],
      type: 'numeric',
      q: 'A cost card shows direct materials £8.60, direct labour £11.40, direct expenses £1.20, variable production overhead £2.70, fixed production overhead £4.90 and distribution £1.80. What is the marginal cost per unit?',
      unit: '£', answer: 23.9,
      exp: 'Prime cost 21.20 + variable production overhead 2.70 = £23.90. Marginal cost is what one more unit adds, so it takes the variable production overhead and stops there — the fixed overhead of £4.90 does not change when one more unit is made.',
    },
    {
      id: 'M-1-19', unitKey: 'mats', lo: 1, criteria: ['MATS-1.2.5'],
      type: 'numeric',
      q: 'A cost card shows direct materials £8.60, direct labour £11.40, direct expenses £1.20, variable production overhead £2.70, fixed production overhead £4.90 and distribution £1.80. What is the full absorption cost per unit?',
      unit: '£', answer: 28.8,
      exp: 'Marginal cost 23.90 + fixed production overhead 4.90 = £28.80. The £1.80 of distribution is excluded: all three of these figures are PRODUCTION costs, and adding distribution gives £30.60, which is the cost of making and delivering a unit rather than the cost of making it.',
    },
    {
      id: 'M-1-20', unitKey: 'mats', lo: 1, criteria: ['MATS-1.2.5'],
      type: 'mcq',
      q: 'A business pays the designer of a product a royalty of £0.60 for each unit made. Which cost does the royalty first appear in?',
      opts: [
        'Prime cost, as a direct expense',
        'Marginal cost, as variable production overhead',
        'Full absorption cost, as fixed production overhead',
        'None of them — a royalty is a period cost',
      ],
      ans: 0,
      exp: 'A cost that can be traced to each unit made is a DIRECT expense, and direct expenses sit inside prime cost alongside direct materials and direct labour. The category is rare enough to be forgotten, and dropping the royalty into overhead instead leaves marginal and full absorption cost unchanged while understating prime cost — so only one of the three answers goes wrong, which makes it hard to notice.',
    },
    {
      id: 'M-1-21', unitKey: 'mats', lo: 1, criteria: ['MATS-1.2.5', 'MATS-1.1.3'],
      type: 'gapfill',
      q: 'Complete the sentence about the two subtractions.',
      template: 'Contribution deducts {0} from revenue, while gross profit under absorption costing deducts a cost of sales that includes {1}.',
      gaps: [
        { options: ['all variable costs', 'all production costs', 'the prime cost'], answer: 0 },
        { options: ['fixed production overhead', 'distribution costs', 'administration costs'], answer: 0 },
      ],
      exp: 'The two figures look similar and are not the same. Contribution is revenue less everything that varies, wherever in the business it varies — variable selling costs included. Gross profit is revenue less the full production cost of the units sold, which carries a share of fixed production overhead. They coincide only when there is no fixed production overhead and no variable selling cost.',
    },
    {
      id: 'M-1-22', unitKey: 'mats', lo: 1, criteria: ['MATS-1.1.3', 'MATS-1.2.3'],
      type: 'task',
      q: 'Report the month\'s result under both costing techniques.',
      brief: 'There was no opening inventory. Fixed production overhead is absorbed on the normal level of activity, which equals the month\'s production.',
      datasets: [
        {
          title: 'Harlow Instruments — month to 30 April',
          headers: ['Item', 'Amount'],
          rows: [
            ['Units produced', '6,000'],
            ['Units sold', '5,100'],
            ['Selling price per unit', '£42.00'],
            ['Variable production cost per unit', '£23.00'],
            ['Fixed production overhead for the month', '£54,000.00'],
            ['Fixed administration overhead for the month', '£19,500.00'],
          ],
        },
      ],
      parts: [
        {
          label: 'Contribution for the month',
          type: 'numeric', unit: '£', answer: 96900,
          exp: 'Contribution counts the units SOLD, not the units made: 5,100 × (42.00 − 23.00) = 5,100 × 19.00 = £96,900.00. Using 6,000 units gives £114,000.00 and credits the business with contribution from goods still in the warehouse.',
        },
        {
          label: 'Profit for the month under marginal costing',
          type: 'numeric', unit: '£', answer: 23400,
          exp: 'Both fixed costs are written off in full: 96,900.00 − 54,000.00 − 19,500.00 = £23,400.00. Marginal costing puts every fixed cost through profit or loss in the month it arises, whether it is production or administration.',
        },
        {
          label: 'Fixed production overhead absorbed into each unit',
          type: 'numeric', unit: '£', answer: 9,
          exp: '54,000.00 ÷ 6,000 = £9.00 a unit. The rate uses the normal level of activity, which here is the month\'s production, so every unit made carries £9.00 of fixed overhead and there is no under- or over-absorption to deal with.',
        },
        {
          label: 'Profit for the month under absorption costing',
          type: 'numeric', unit: '£', answer: 31500,
          exp: 'Full production cost is 23.00 + 9.00 = £32.00 a unit, so gross profit is 5,100 × (42.00 − 32.00) = £51,000.00, and administration of 19,500.00 comes off to leave £31,500.00. The £19,500.00 is a period cost under both techniques — only the production overhead is treated differently.',
        },
        {
          label: 'The difference between the two profits arises because:',
          type: 'choice',
          options: [
            'inventory rose by 900 units, each carrying £9.00 of fixed production overhead',
            'inventory rose by 900 units, each carrying £32.00 of full production cost',
            'administration overhead is treated differently by the two techniques',
            'the two techniques absorbed different amounts of fixed overhead in total',
          ],
          answer: 0,
          exp: '31,500.00 − 23,400.00 = £8,100.00, and 900 unsold units × £9.00 = £8,100.00 exactly. Only the FIXED production overhead in those units is treated differently; the variable £23.00 sits in inventory under both techniques, and administration is a period cost under both. Both techniques absorbed the same £54,000 — absorption costing has simply carried £8,100 of it forward.',
        },
      ],
      exp: 'One month, two answers, and the gap between them is entirely the fixed production overhead sitting in 900 unsold units. Nothing about the business differs between the two statements: the same units were made, the same units were sold, and the same costs were incurred. Which figure is right depends on what it is for — the financial statements need the absorption one, a decision about next month needs the marginal one.',
    },
    {
      id: 'M-1-23', unitKey: 'mats', lo: 1, criteria: ['MATS-1.1.1', 'MATS-1.1.2'],
      type: 'mcq',
      q: 'A monthly management report is produced three weeks after the month it covers. What is the main consequence?',
      opts: [
        'Control is weakened — less of the period is left in which to act',
        'The figures are less accurate than in a report produced sooner',
        'It can no longer be used for planning, only for costing',
        'It must be restated once the audited figures are available',
      ],
      ans: 0,
      exp: 'Nothing about a three-week delay makes the figures wrong — if anything, a later report has more complete data. What it costs is time to react: a problem in week one of the month is not visible until well into the next one, by which point most of the damage is done. Management reports are not audited and are not restated.',
    },
    {
      id: 'M-1-24', unitKey: 'mats', lo: 1, criteria: ['MATS-1.1.4'],
      type: 'numeric',
      q: 'Three products contribute £41,300, £28,900 and £16,400. Fixed costs for the business are £71,000. What is the profit for the period?',
      unit: '£', answer: 15600,
      exp: 'Total contribution is 41,300.00 + 28,900.00 + 16,400.00 = £86,600.00, and 86,600.00 − 71,000.00 = £15,600.00. The fixed costs are deducted once from the total and are not split across the three products — a segmented statement adds the contributions and stops.',
    },
    {
      id: 'M-1-25', unitKey: 'mats', lo: 1, criteria: ['MATS-1.2.2', 'MATS-1.2.1'],
      type: 'mcq',
      q: 'A business has fixed production overhead but holds no inventory at either the start or the end of the period. What can be said about the two profit figures?',
      opts: [
        'They are equal, because no fixed overhead has been carried into or out of the period',
        'Absorption profit is higher, because it absorbs overhead into units',
        'Marginal profit is higher, because it writes the overhead off immediately',
        'They cannot be compared without knowing the absorption rate',
      ],
      ans: 0,
      exp: 'The difference between the techniques is change in inventory × fixed overhead per unit, and here the change is zero — so the difference is zero however large the overhead or the rate. Everything made was sold, so every pound of fixed production overhead reached profit or loss in this period under both treatments.',
    },
    {
      id: 'M-1-26', unitKey: 'mats', lo: 1, criteria: ['MATS-1.2.5'],
      type: 'picklist',
      q: 'Identify the first of the three production cost figures each item enters.',
      picklist: {
        title: 'Building a cost card',
        rowHeader: 'Cost', choiceHeader: 'First appears in',
        options: ['Prime cost', 'Marginal cost', 'Full absorption cost', 'None of the three'],
        rows: [
          { text: 'Direct materials', answer: 0 },
          { text: 'Power to run the machines, charged by usage', answer: 1 },
          { text: 'Factory supervisor\'s salary', answer: 2 },
          { text: 'Direct labour', answer: 0 },
          { text: 'Delivery of finished goods to customers', answer: 3 },
          { text: 'Straight-line depreciation of factory plant', answer: 2 },
        ],
      },
      exp: 'The three figures are cumulative, so each cost enters at one step and stays in the ones above it. Direct costs enter at prime cost. Overhead that varies with output — power charged by usage — enters at marginal cost. Overhead that does not — the supervisor, straight-line depreciation — waits until full absorption cost. Delivery is not a production cost at all and enters none of the three, however large it is.',
    },
    /* ── Outcome 2 — techniques for dealing with costs (15%) ───────────── */
    {
      id: 'M-2-01', unitKey: 'mats', lo: 2, criteria: ['MATS-2.1.1'],
      type: 'numeric',
      q: 'A job used direct materials of £4,200, direct labour of £3,100 and direct expenses of £600, and £2,400 of production overhead was absorbed into it. What is the prime cost of the job?',
      unit: '£', answer: 7900,
      exp: '£4,200 + £3,100 + £600 = £7,900. Prime cost is the total of the direct costs and stops there — no overhead of any kind belongs in it. Adding the absorbed overhead gives £7,900 + £2,400 = £10,300, which is the full production cost and a different figure with a different use.',
    },
    {
      id: 'M-2-02', unitKey: 'mats', lo: 2, criteria: ['MATS-2.1.1'],
      type: 'numeric',
      q: 'A direct worker is paid £16.00 an hour with overtime at time and a half. He was paid for 46 hours in a basic 40-hour week, of which 4 hours were idle time caused by a machine breakdown. No customer requested the overtime. What is the direct labour cost for the week?',
      unit: '£', answer: 672,
      exp: '46 − 4 = 42 productive hours at the basic rate, so 42 × £16.00 = £672.00 is direct. Everything else is overhead: idle time of 4 × £16.00 = £64.00, and an overtime premium on the 46 − 40 = 6 overtime hours at half the basic rate, so 6 × £8.00 = £48.00.',
    },
    {
      id: 'M-2-03', unitKey: 'mats', lo: 2, criteria: ['MATS-2.1.1'],
      type: 'picklist',
      q: 'Classify each cost in a joinery workshop.',
      picklist: {
        title: 'Direct or indirect',
        rowHeader: 'Cost', choiceHeader: 'Classification',
        options: ['Direct cost', 'Indirect cost'],
        rows: [
          { text: 'Timber built into a customer\'s bookcase', answer: 0 },
          { text: 'Glue and screws used across every job in the workshop', answer: 1 },
          { text: 'Wages of the joiner for the hours spent on the bookcase', answer: 0 },
          { text: 'Salary of the workshop supervisor', answer: 1 },
          { text: 'Depreciation of the workshop saw, used on every job', answer: 1 },
        ],
      },
      exp: 'The test is traceability to one job, not size or importance. The timber and the joiner\'s hours are recorded against the bookcase and would not exist without it. The glue, the supervisor and the saw serve every job in the workshop, and no honest arithmetic says how much of them the bookcase consumed — so they are gathered as overhead and reach the job later, through absorption.',
    },
    {
      id: 'M-2-04', unitKey: 'mats', lo: 2, criteria: ['MATS-2.1.1'],
      type: 'numeric',
      q: 'A process completed 5,600 units. Closing work in progress is 900 units, 40% complete for conversion. Conversion cost for the period was £119,200. What is the conversion cost per equivalent unit?',
      unit: '£', answer: 20,
      exp: '900 × 40% = 360 equivalent units, so the total is 5,600 + 360 = 5,960, and £119,200 ÷ 5,960 = £20.00. Counting the work in progress in full would give 6,500 units and a rate barely over £18.00, charging the finished output with labour and overhead that has not been spent on those units yet.',
    },
    {
      id: 'M-2-05', unitKey: 'mats', lo: 2, criteria: ['MATS-2.1.1'],
      type: 'entrygrid',
      q: 'A process completed 4,000 units and holds 500 units of closing work in progress, complete for materials and 60% complete for conversion. Materials cost £45,000 and conversion cost £43,000. Complete the equivalent-unit statement.',
      entrygrid: {
        title: 'Equivalent units and rates',
        rowHeader: 'Line',
        columns: ['Materials', 'Conversion'],
        rows: [
          { label: 'Equivalent units — units completed', cells: { 0: 4000, 1: 4000 } },
          { label: 'Equivalent units — closing work in progress', cells: { 0: 500, 1: 300 } },
          { label: 'Total equivalent units', cells: { 0: 4500, 1: 4300 } },
          { label: 'Cost per equivalent unit (£)', cells: { 0: 10, 1: 10 } },
        ],
      },
      exp: 'Materials are complete in the work in progress, so all 500 units count: 4,000 + 500 = 4,500 equivalent units, and £45,000 ÷ 4,500 = £10.00. Conversion is only three fifths done, so 500 × 60% = 300 count, giving 4,000 + 300 = 4,300 and £43,000 ÷ 4,300 = £10.00. The two rates matching is a coincidence of these figures; the equivalent-unit counts behind them are not the same and never were.',
    },
    {
      id: 'M-2-06', unitKey: 'mats', lo: 2, criteria: ['MATS-2.2.1'],
      type: 'truefalse',
      q: 'Identify whether each statement about posting costs to the cost ledger is correct.',
      statements: [
        { text: 'Direct labour is debited to work in progress and credited to wages control.', answer: true },
        { text: 'Indirect materials are credited to the production overhead control account when they are issued.', answer: false },
        { text: 'The wages control account is expected to carry a large balance at the end of each period.', answer: false },
      ],
      exp: 'Direct labour becomes part of a unit, so it moves out of wages control and into work in progress. Indirect materials move the other way into the overhead control account — they are DEBITED there, because that account is collecting cost, not giving it away. And wages control is a staging post: every pound of gross pay that lands in it should be analysed out to work in progress or to overhead in the same period, leaving it empty.',
    },
    {
      id: 'M-2-07', unitKey: 'mats', lo: 2, criteria: ['MATS-2.2.2'],
      type: 'picklist',
      q: 'Identify the account credited by each cost accounting journal.',
      picklist: {
        title: 'The credit side',
        rowHeader: 'Transaction', choiceHeader: 'Account credited',
        options: ['Materials inventory control', 'Wages control', 'Production overhead control'],
        rows: [
          { text: 'Direct materials issued to production', answer: 0 },
          { text: 'Indirect labour analysed out of the payroll', answer: 1 },
          { text: 'Overhead absorbed into work in progress', answer: 2 },
          { text: 'Indirect materials issued to the maintenance department', answer: 0 },
          { text: 'Direct labour analysed out of the payroll', answer: 1 },
        ],
      },
      exp: 'The credit says where the cost came FROM, and it does not depend on whether the cost is direct or indirect. Anything leaving the stores credits materials inventory, whichever account is debited. Anything analysed out of the payroll credits wages control, the same way. Absorption is the one entry that empties the overhead control account, so that is where its credit belongs.',
    },
    {
      id: 'M-2-08', unitKey: 'mats', lo: 2, criteria: ['MATS-2.2.1'],
      type: 'mcq',
      q: 'Overtime was worked because the factory was busy generally. How is the overtime premium recorded?',
      opts: [
        'Debit production overhead control, credit wages control',
        'Debit work in progress, credit wages control',
        'Debit wages control, credit production overhead control',
        'Debit work in progress, credit production overhead control',
      ],
      ans: 0,
      exp: 'The premium was caused by the general workload rather than by any one job, so it is indirect and is gathered in the overhead control account with everything else that cannot be traced. It leaves wages control like any other analysed element, which fixes the credit. Had a named customer demanded the overtime, one job would have caused it and the debit would go to work in progress instead.',
    },
    {
      id: 'M-2-09', unitKey: 'mats', lo: 2, criteria: ['MATS-2.2.2'],
      type: 'entrygrid',
      q: 'Materials of £84,000 and wages of £62,000 were analysed in September, of which £9,000 of the materials and £14,000 of the wages were indirect. Complete the analysis.',
      entrygrid: {
        title: 'September analysis',
        rowHeader: 'Element',
        columns: ['Work in progress £', 'Production overhead control £'],
        rows: [
          { label: 'Materials issued', cells: { 0: 75000, 1: 9000 } },
          { label: 'Wages analysed', cells: { 0: 48000, 1: 14000 } },
          { label: 'Total debited', cells: { 0: 123000, 1: 23000 } },
        ],
      },
      exp: '£84,000 − £9,000 = £75,000 of direct materials and £62,000 − £14,000 = £48,000 of direct labour reach work in progress, which is £75,000 + £48,000 = £123,000. The indirect halves are £9,000 + £14,000 = £23,000 and wait in the overhead control account until they are absorbed. The two columns together account for the whole £146,000 issued and paid, because classifying a cost moves it and never changes it.',
    },
    {
      id: 'M-2-10', unitKey: 'mats', lo: 2, criteria: ['MATS-2.3.1'],
      type: 'numeric',
      q: 'Average usage of a component is 620 units a week and the average lead time is 3 weeks. Buffer inventory is 900 units. What is the re-order level?',
      unit: 'units', answer: 2760,
      exp: '620 × 3 = 1,860 units will be consumed while the order is in transit, and the re-order level adds the buffer on top of that: 1,860 + 900 = 2,760 units. Ordering at 1,860 would leave nothing in reserve at all if the delivery slipped by a single day, which is the event the buffer exists to absorb.',
    },
    {
      id: 'M-2-11', unitKey: 'mats', lo: 2, criteria: ['MATS-2.3.1'],
      type: 'numeric',
      q: 'Annual usage of a part is 36,000 units. Each order costs £20 to place and holding one unit for a year costs £1.00. What is the economic order quantity?',
      unit: 'units', answer: 1200,
      exp: '2 × 36,000 × 20 = 1,440,000, and 1,440,000 ÷ 1.00 = 1,440,000, whose square root is 1,200 units. That means 36,000 ÷ 1,200 = 30 orders a year. Leaving the square root out would suggest ordering 1,440,000 units at a time, which is 1,440,000 ÷ 36,000 = 40 years of usage and the clearest sign the step was missed.',
    },
    {
      id: 'M-2-12', unitKey: 'mats', lo: 2, criteria: ['MATS-2.3.1'],
      type: 'numeric',
      q: 'A business sets its maximum inventory level at 4,500 kg and its buffer inventory at 1,200 kg. What is the maximum re-order quantity?',
      unit: 'kg', answer: 3300,
      exp: 'Maximum re-order quantity = maximum inventory level − buffer inventory, so 4,500 − 1,200 = 3,300 kg. Ordering more than that risks pushing the balance above 4,500 kg, because a delivery can arrive on a day when the buffer has not been touched at all — which is precisely the day the maximum level is set for.',
    },
    {
      id: 'M-2-13', unitKey: 'mats', lo: 2, criteria: ['MATS-2.3.1'],
      type: 'mcq',
      q: 'What does the economic order quantity minimise?',
      opts: [
        'The total of ordering costs and holding costs together',
        'The cost of placing orders throughout the year',
        'The cost of holding inventory throughout the year',
        'The purchase price paid for the material itself',
      ],
      ans: 0,
      exp: 'The two costs pull in opposite directions: large orders are cheap to place and dear to store, small ones the reverse. Minimising either one alone gives an absurd answer — one order a year, or one order a day. The EOQ is the size at which their sum is lowest, which is also the size at which the two happen to be equal. Purchase price is outside the model entirely.',
    },
    {
      id: 'M-2-14', unitKey: 'mats', lo: 2, criteria: ['MATS-2.3.1'],
      type: 'gapfill',
      q: 'Complete the sentence about inventory control levels.',
      template: 'The re-order level is the usage expected during the {0}, plus the {1}, so a business that raises its cushion will place its order at a {2} balance than before.',
      gaps: [
        { options: ['average lead time', 'ordering cycle', 'holding period'], answer: 0 },
        { options: ['buffer inventory', 'maximum re-order quantity', 'economic order quantity'], answer: 0 },
        { options: ['higher', 'lower', 'unchanged'], answer: 0 },
      ],
      exp: 'Two things make up the re-order level: what will be consumed while the order is in transit, and the cushion held back for the weeks that go badly. Raising the cushion raises the balance at which the order has to be placed, because the delivery still has to arrive before the cushion is dipped into. The order QUANTITY is a separate decision and the EOQ answers that one.',
    },
    {
      id: 'M-2-15', unitKey: 'mats', lo: 2, criteria: ['MATS-2.3.2'],
      type: 'numeric',
      q: 'A store holds 400 kg at £12.00 and receives 600 kg at £15.00. It then issues 800 kg, valuing issues on a first-in-first-out basis. What is the value of the issue?',
      unit: '£', answer: 10800,
      exp: 'FIFO empties the oldest layer before touching the next: 400 × £12.00 = £4,800, then 400 × £15.00 = £6,000, so £4,800 + £6,000 = £10,800. The 200 kg left are all from the newer layer and are worth 200 × £15.00 = £3,000, which with the issue rebuilds the £13,800 that went into the store.',
    },
    {
      id: 'M-2-16', unitKey: 'mats', lo: 2, criteria: ['MATS-2.3.2'],
      type: 'numeric',
      q: 'The same store — 400 kg at £12.00, then a receipt of 600 kg at £15.00 — issues 800 kg, but values issues at weighted average cost. What is the value of that issue?',
      unit: '£', answer: 11040,
      exp: '400 × £12.00 = £4,800 and 600 × £15.00 = £9,000, so £4,800 + £9,000 = £13,800 across 1,000 kg, and £13,800 ÷ 1,000 = £13.80 a kilogram. The issue is 800 × £13.80 = £11,040, which is £240 more than FIFO charged for the identical 800 kg — and the 200 kg left behind are worth £240 less to match.',
    },
    {
      id: 'M-2-17', unitKey: 'mats', lo: 2, criteria: ['MATS-2.3.2', 'MATS-2.3.3'],
      type: 'truefalse',
      q: 'Identify whether each statement about inventory valuation is correct.',
      statements: [
        { text: 'In a period of rising prices, FIFO reports a higher closing inventory value than AVCO.', answer: true },
        { text: 'Under AVCO the average cost is recalculated each time a receipt is entered.', answer: true },
        { text: 'The choice between FIFO and AVCO changes the total cost charged over the life of the inventory.', answer: false },
      ],
      exp: 'FIFO leaves the newest and dearest units in the store, so when prices rise its closing value is the higher of the two. AVCO recalculates on receipts rather than at the month end, which is why the order of the movements matters. But over the life of the inventory both methods charge exactly what the goods cost — the difference is a timing one that reverses, and no business becomes better off by changing method.',
    },
    {
      id: 'M-2-18', unitKey: 'mats', lo: 2, criteria: ['MATS-2.3.3'],
      type: 'mcq',
      q: 'A stores ledger shows a closing balance that has not moved for eleven months. What does this most likely indicate?',
      opts: [
        'Obsolete inventory that may need to be written down',
        'A material bought from a supplier with a short lead time',
        'An error in the weighted average cost calculation',
        'A buffer inventory level that has been set too low',
      ],
      ans: 0,
      exp: 'A balance that neither falls nor is replaced is not being used, and inventory nobody draws on has to be tested against what it could actually be sold for. A short lead time would produce frequent small movements rather than none at all; a costing error would change the value while the quantity kept moving; and too small a buffer shows up as balances hitting zero, which is the opposite symptom.',
    },
    {
      id: 'M-2-19', unitKey: 'mats', lo: 2, criteria: ['MATS-2.4.1'],
      type: 'picklist',
      q: 'Identify the behaviour of each cost of running a delivery operation.',
      picklist: {
        title: 'Cost behaviour',
        rowHeader: 'Cost', choiceHeader: 'Behaviour',
        options: ['Fixed', 'Variable', 'Semi-variable', 'Stepped'],
        rows: [
          { text: 'Straight-line depreciation of a delivery van', answer: 0 },
          { text: 'Fuel for that van, charged by the mile', answer: 1 },
          { text: 'A vehicle tracker rented at £40 a month plus 5p a mile', answer: 2 },
          { text: 'Warehouse units rented, one more for every 5,000 pallets stored', answer: 3 },
          { text: 'A royalty of 50p paid on each unit delivered', answer: 1 },
        ],
      },
      exp: 'Straight-line depreciation is a function of time, so the van costs the same whether it moves or not. Fuel and the royalty both start at nothing and rise in step with activity. The tracker has a floor it never drops below plus a charge that varies, which is what semi-variable means. The warehouse is flat until the 5,001st pallet arrives and then jumps by a whole unit\'s rent — a step, not a slope.',
    },
    {
      id: 'M-2-20', unitKey: 'mats', lo: 2, criteria: ['MATS-2.4.2'],
      type: 'numeric',
      q: 'Power cost was £24,600 at 9,000 machine hours and £33,000 at 15,000 machine hours, with fixed costs unchanged between the two levels. What is the variable cost per machine hour?',
      unit: '£', answer: 1.4,
      exp: '£33,000 − £24,600 = £8,400 across 15,000 − 9,000 = 6,000 machine hours, so £8,400 ÷ 6,000 = £1.40 an hour. The fixed element follows from either point and both must agree: 9,000 × £1.40 = £12,600 and £24,600 − £12,600 = £12,000, while 15,000 × £1.40 = £21,000 and £33,000 − £21,000 = £12,000.',
    },
    {
      id: 'M-2-21', unitKey: 'mats', lo: 2, criteria: ['MATS-2.4.2'],
      type: 'numeric',
      q: 'A cost was £64,000 at 10,000 units and £96,000 at 18,000 units. Fixed costs rise by £8,000 once output passes 14,000 units. What is the variable cost per unit?',
      unit: '£', answer: 3,
      exp: 'The two totals no longer carry the same fixed cost, so the step has to come out of the higher one before anything is divided: £96,000 − £8,000 = £88,000. Then £88,000 − £64,000 = £24,000 across 18,000 − 10,000 = 8,000 units, so £24,000 ÷ 8,000 = £3.00 a unit. Dividing the unadjusted difference of £32,000 by 8,000 gives £4.00 and a fixed cost that fits neither observation.',
    },
    {
      id: 'M-2-22', unitKey: 'mats', lo: 2, criteria: ['MATS-2.4.1'],
      type: 'mcq',
      q: 'Fixed costs are £150,000 and output rises from 20,000 units to 25,000 units. What happens to the fixed cost per unit?',
      opts: [
        'It falls from £7.50 to £6.00',
        'It rises from £6.00 to £7.50',
        'It stays at £7.50, because the total has not changed',
        'It falls from £7.50 to £7.00',
      ],
      ans: 0,
      exp: '£150,000 ÷ 20,000 = £7.50 and £150,000 ÷ 25,000 = £6.00. The total is unchanged — that is what fixed means — but it is now spread across more units, so each one carries less. Fixed in total and falling per unit are the same fact stated two ways, and the third option mistakes one for the other.',
    },
    {
      id: 'M-2-23', unitKey: 'mats', lo: 2, criteria: ['MATS-2.4.1'],
      type: 'truefalse',
      q: 'Identify whether each statement about how costs respond to activity is correct.',
      statements: [
        { text: 'A stepped cost is fixed within a range of activity and jumps outside it.', answer: true },
        { text: 'The high-low method assumes cost behaves linearly between the two observations.', answer: true },
        { text: 'A semi-variable cost is nil when activity is nil.', answer: false },
      ],
      exp: 'A stepped cost is flat until a threshold forces another supervisor, van or unit of rent, and the range it is flat within is the thing to watch when output is planned. High-low draws a straight line through two points and takes everything between them on trust, which is its weakness as well as its speed. And a semi-variable cost has a fixed floor, so it is still being incurred when nothing at all is produced.',
    },
    {
      id: 'M-2-24', unitKey: 'mats', lo: 2, criteria: ['MATS-2.5.3'],
      type: 'picklist',
      q: 'Identify the composite cost unit each business would use.',
      picklist: {
        title: 'Service costing',
        rowHeader: 'Business', choiceHeader: 'Cost unit',
        options: ['Cost per passenger-mile', 'Cost per occupied bed-night', 'Cost per tonne-mile'],
        rows: [
          { text: 'A city bus operator', answer: 0 },
          { text: 'A hotel chain', answer: 1 },
          { text: 'A freight haulage company', answer: 2 },
          { text: 'A residential care home', answer: 1 },
          { text: 'A long-distance rail operator', answer: 0 },
        ],
      },
      exp: 'A service leaves no unit behind to be counted, so the cost unit has to be built from the two things that together describe the work. Moving people is measured by how many and how far; moving freight by how heavy and how far; providing a bed by how many beds and for how many nights. A single dimension always flatters somebody — cost per mile rewards an empty bus, and cost per bed rewards an empty hotel.',
    },
    {
      id: 'M-2-25', unitKey: 'mats', lo: 2, criteria: ['MATS-2.5.2'],
      type: 'mcq',
      q: 'A process costing £59,000 takes in 10,000 kg and expects a normal loss of 5% of input, which can be sold for scrap at £4 a kg. How are the scrap proceeds dealt with?',
      opts: [
        'Deducted from the process cost before the cost per good kilogram is found',
        'Added to the process cost, because the loss is a cost of running the process',
        'Credited straight to profit or loss and left outside the process account',
        'Ignored, because a normal loss is already expected by the business',
      ],
      ans: 0,
      exp: 'The business recovers 500 × £4 = £2,000 by selling the loss, so the surviving units ought to carry that much less: £59,000 − £2,000 = £57,000, and £57,000 ÷ 9,500 = £6.00 a kilogram. The scrap proceeds change what each good kilogram costs and not how many the process is expected to yield, so the 9,500 kg on the bottom of that division is untouched by them.',
    },
    {
      id: 'M-2-26', unitKey: 'mats', lo: 2, criteria: ['MATS-2.3.2', 'MATS-2.3.3'],
      type: 'task',
      q: 'Value the month\'s issue and closing inventory under both methods.',
      brief: 'Kelbrook Metals holds component KM4. There were no other movements in March.',
      datasets: [
        {
          title: 'Component KM4 — March',
          headers: ['Date', 'Movement', 'Units', 'Cost per unit'],
          rows: [
            ['1 March', 'Opening inventory', '600', '£8.00'],
            ['9 March', 'Receipt', '900', '£10.00'],
            ['18 March', 'Issue', '1,200', '—'],
            ['26 March', 'Receipt', '500', '£11.00'],
          ],
        },
      ],
      parts: [
        {
          label: 'Value of the 18 March issue under FIFO',
          type: 'numeric', unit: '£', answer: 10800,
          exp: 'FIFO takes the whole of the opening layer and then dips into the receipt: 600 × £8.00 = £4,800 and 600 × £10.00 = £6,000, so £4,800 + £6,000 = £10,800. That leaves 300 units, all from the 9 March receipt.',
        },
        {
          label: 'Value of the 18 March issue under AVCO',
          type: 'numeric', unit: '£', answer: 11040,
          exp: 'The average is struck after the 9 March receipt: 600 × £8.00 = £4,800 and 900 × £10.00 = £9,000, so £4,800 + £9,000 = £13,800 across 1,500 units, and £13,800 ÷ 1,500 = £9.20. The issue is 1,200 × £9.20 = £11,040.',
        },
        {
          label: 'Closing inventory at 31 March under FIFO',
          type: 'numeric', unit: '£', answer: 8500,
          exp: 'The 300 units left after the issue are all at £10.00, so 300 × £10.00 = £3,000, and the 26 March receipt adds 500 × £11.00 = £5,500. £3,000 + £5,500 = £8,500 for 800 units. Note the closing figure is NOT one price per unit — FIFO leaves layers behind.',
        },
        {
          label: 'Closing inventory at 31 March under AVCO',
          type: 'numeric', unit: '£', answer: 8260,
          exp: 'After the issue the balance is £13,800 − £11,040 = £2,760 for 300 units, and the receipt adds £5,500, so £2,760 + £5,500 = £8,260 for 800 units. A fresh average of £10.325 would be struck on the next receipt, not now.',
        },
        {
          label: 'Compared with AVCO, using FIFO in March would report:',
          type: 'choice',
          options: [
            'a higher closing inventory and a higher profit',
            'a higher closing inventory and a lower profit',
            'a lower closing inventory and a higher profit',
            'the same closing inventory but a different profit',
          ],
          answer: 0,
          exp: 'FIFO charged £10,800 to production where AVCO charged £11,040, so £11,040 − £10,800 = £240 less cost and £240 more profit. The same £240 is the gap in the closing balances: £8,500 − £8,260 = £240. The two always move together, because whatever is not charged out is what stays in the store.',
        },
      ],
      exp: 'One ledger, two answers, and every figure differs by the same £240. Prices rose through March, so FIFO — issuing the old £8.00 units first — reports the cheaper cost of sales and the dearer closing inventory. Nothing about the business is different: the same 1,200 units were issued, the same 800 remain, and the same £19,300 was spent. Only the line between this month\'s cost and next month\'s asset has moved, and it will move back once the £8.00 layer is gone.',
    },
    /* ── Outcome 3 — attributing costs (20%) ───────────────────────────── */
    {
      id: 'M-3-01', unitKey: 'mats', lo: 3, criteria: ['MATS-3.1.1'],
      type: 'picklist',
      q: 'Identify the method by which each overhead reaches a cost centre.',
      picklist: {
        title: 'Allocation or apportionment',
        rowHeader: 'Overhead', choiceHeader: 'Method',
        options: ['Allocated', 'Apportioned'],
        rows: [
          { text: 'Wages of the machining department\'s own supervisor', answer: 0 },
          { text: 'Indirect materials issued to the finishing department', answer: 0 },
          { text: 'Rates on the whole factory', answer: 1 },
          { text: 'Heat and light for the site', answer: 1 },
          { text: 'Depreciation of a machine used only in assembly', answer: 0 },
        ],
      },
      exp: 'The whole test is whether the cost belongs to one centre or to several. A supervisor employed by one department, materials requisitioned by one department, a machine used by one department — each is allocated in full with no basis and no judgement. Rates and heat cover the whole site and have to be shared, and sharing means choosing a basis somebody could argue with. Allocate what you can; apportion only what you must.',
    },
    {
      id: 'M-3-02', unitKey: 'mats', lo: 3, criteria: ['MATS-3.1.1'],
      type: 'picklist',
      q: 'Identify the most appropriate basis for apportioning each overhead.',
      picklist: {
        title: 'Choosing a basis',
        rowHeader: 'Overhead', choiceHeader: 'Basis',
        options: ['Floor area', 'Number of employees', 'Carrying amount of machinery', 'Machine hours'],
        rows: [
          { text: 'Rent of the factory', answer: 0 },
          { text: 'Canteen subsidy', answer: 1 },
          { text: 'Insurance of plant and machinery', answer: 2 },
          { text: 'Buildings insurance', answer: 0 },
          { text: 'Personnel department costs', answer: 1 },
          { text: 'Power to run the machines', answer: 3 },
        ],
      },
      exp: 'A basis is right when the cost genuinely varies with it. Space-driven costs — rent, buildings insurance — follow floor area. People-driven costs — canteen, personnel — follow headcount. Costs that protect or consume the plant follow the plant: insurance follows what the machines are worth, power follows how hard they run. Apportioning canteen cost by floor area produces a number and explains nothing.',
    },
    {
      id: 'M-3-03', unitKey: 'mats', lo: 3, criteria: ['MATS-3.1.2'],
      type: 'numeric',
      q: 'After apportionment Machining holds £128,000, Assembly £72,000 and Stores £50,000. Stores issues 35% of its requisitions to Machining and 65% to Assembly. Using the direct method, what is Machining\'s total overhead?',
      unit: '£', answer: 145500,
      exp: '£50,000 × 35% = £17,500, and £128,000 + £17,500 = £145,500. Assembly takes the other £32,500 to reach £104,500, and the two total £250,000 — the same as £128,000 + £72,000 + £50,000. Reapportionment moves cost and never creates it, so that total is the check to run every time.',
    },
    {
      id: 'M-3-04', unitKey: 'mats', lo: 3, criteria: ['MATS-3.1.2'],
      type: 'mcq',
      q: 'What distinguishes the direct method of reapportionment from the step-down method?',
      opts: [
        'The direct method ignores the work service centres do for each other',
        'The direct method shares the service centres equally between production centres',
        'The direct method leaves part of each service centre unabsorbed',
        'The direct method is used only where there is a single service centre',
      ],
      ans: 0,
      exp: 'The direct method pushes every service centre straight into the production centres, on the production centres\' usage alone, and takes no account of stores serving maintenance or maintenance serving stores. Step-down deals with that in one direction: close the centre serving the most others first, spread it across everything it serves, then close the next without sending anything back. Neither leaves anything unabsorbed and neither splits equally.',
    },
    {
      id: 'M-3-05', unitKey: 'mats', lo: 3, criteria: ['MATS-3.1.2'],
      type: 'numeric',
      q: 'Under step-down reapportionment, Stores holds £40,000 and Maintenance £26,000. Stores serves Machining, Assembly and Maintenance in the proportions 45%, 35% and 20%. Stores is closed first. What total is then shared out of Maintenance?',
      unit: '£', answer: 34000,
      exp: 'Maintenance receives £40,000 × 20% = £8,000 from Stores, so it holds £26,000 + £8,000 = £34,000 when its turn comes. Splitting the original £26,000 instead would leave £8,000 stranded in a centre that has already been closed, and the production totals would no longer add back to the £66,000 the two service centres started with.',
    },
    {
      id: 'M-3-06', unitKey: 'mats', lo: 3, criteria: ['MATS-3.1.2'],
      type: 'entrygrid',
      q: 'Machining holds £96,000 and Assembly £54,000 after apportionment. Stores holds £36,000 and is reapportioned 60% to Machining and 40% to Assembly by the direct method. Complete the reapportionment.',
      entrygrid: {
        title: 'Direct method reapportionment',
        rowHeader: 'Line',
        columns: ['Machining £', 'Assembly £'],
        rows: [
          { label: 'Overhead after apportionment', cells: { 0: 96000, 1: 54000 } },
          { label: 'Share of stores reapportioned', cells: { 0: 21600, 1: 14400 } },
          { label: 'Total overhead', cells: { 0: 117600, 1: 68400 } },
        ],
      },
      exp: 'Stores splits as £36,000 × 60% = £21,600 and £36,000 × 40% = £14,400, which together are the whole £36,000 — a service centre is emptied, never partly emptied. The totals are £117,600 and £68,400, adding to £186,000, which is exactly £96,000 + £54,000 + £36,000. If that check fails, a percentage has been applied to a production centre total rather than to the service centre.',
    },
    {
      id: 'M-3-07', unitKey: 'mats', lo: 3, criteria: ['MATS-3.2.1'],
      type: 'numeric',
      q: 'A department has budgeted overhead of £192,500 and budgeted machine hours of 13,750. What is the overhead absorption rate per machine hour?',
      unit: '£', answer: 14,
      exp: '£192,500 ÷ 13,750 = £14.00 per machine hour. Both figures are budgeted, because the rate has to exist before the period begins — a quotation cannot wait until the year end to discover what the overhead turned out to be.',
    },
    {
      id: 'M-3-08', unitKey: 'mats', lo: 3, criteria: ['MATS-3.2.1'],
      type: 'numeric',
      q: 'Machining absorbs at £16.00 per machine hour and Assembly at £6.50 per labour hour. A job uses 4 machine hours in Machining and 9 labour hours in Assembly. How much overhead does the job absorb in total?',
      unit: '£', answer: 122.5,
      exp: '(4 × £16.00) + (9 × £6.50) = £64.00 + £58.50 = £122.50. Each department charges the job for what the job used THERE, so a job that never enters a department absorbs none of its overhead — which is the whole reason for having separate departmental rates.',
    },
    {
      id: 'M-3-09', unitKey: 'mats', lo: 3, criteria: ['MATS-3.2.1'],
      type: 'picklist',
      q: 'Identify the most suitable basis of absorption for each business.',
      picklist: {
        title: 'Bases of absorption',
        rowHeader: 'Business', choiceHeader: 'Basis',
        options: ['Machine hours', 'Direct labour hours', 'Chargeable hours', 'Miles driven'],
        rows: [
          { text: 'A highly automated pressing plant', answer: 0 },
          { text: 'A hand-assembly workshop', answer: 1 },
          { text: 'A firm of accountants', answer: 2 },
          { text: 'A haulage contractor', answer: 3 },
          { text: 'A machine shop where overhead is mostly power and plant depreciation', answer: 0 },
        ],
      },
      exp: 'The basis should be whatever the overhead actually follows. Automated work carries power, plant depreciation and maintenance, so machine hours. Hand work carries costs that follow the people, so labour hours. A professional firm exists to sell time, so chargeable hours. A haulier\'s overhead follows the fleet down the road. Choosing a basis the department barely has — machine hours in a hand-assembly shop — divides by a tiny number and produces an absurd rate.',
    },
    {
      id: 'M-3-10', unitKey: 'mats', lo: 3, criteria: ['MATS-3.3.1'],
      type: 'mcq',
      q: 'What is a cost pool in activity-based costing?',
      opts: [
        'A group of overhead costs that share the same cost driver',
        'The total overhead of a single production cost centre',
        'The overhead left over once every service centre has been closed',
        'The difference between overhead absorbed and overhead incurred',
      ],
      ans: 0,
      exp: 'ABC organises overhead by ACTIVITY rather than by department, so a pool gathers the costs caused by one activity — everything to do with setting up machines, or with raising purchase orders — and each pool is divided by its own driver. A departmental total is what traditional absorption uses, and the difference between absorbed and incurred is under- or over-absorption, which ABC does not remove.',
    },
    {
      id: 'M-3-11', unitKey: 'mats', lo: 3, criteria: ['MATS-3.3.1'],
      type: 'picklist',
      q: 'Identify the most appropriate cost driver for each activity.',
      picklist: {
        title: 'Cost drivers',
        rowHeader: 'Activity', choiceHeader: 'Driver',
        options: ['Number of set-ups', 'Number of purchase orders', 'Number of inspections', 'Machine hours'],
        rows: [
          { text: 'Setting up machines between production runs', answer: 0 },
          { text: 'Raising and processing orders with suppliers', answer: 1 },
          { text: 'Quality checking each batch produced', answer: 2 },
          { text: 'Power and routine maintenance of running plant', answer: 3 },
          { text: 'Resetting tooling for a different product', answer: 0 },
        ],
      },
      exp: 'The driver is whatever causes the cost to be incurred. A set-up costs the same whether ten units or ten thousand follow it, so it is driven by the number of set-ups and not by volume. So is an order, and so is an inspection. The last row is the one worth noticing: power and maintenance really are driven by running time, so machine hours is the correct driver — ABC is about finding the true cause, not about abolishing hours.',
    },
    {
      id: 'M-3-12', unitKey: 'mats', lo: 3, criteria: ['MATS-3.3.2'],
      type: 'numeric',
      q: 'A machine set-up cost pool of £96,000 is driven by 640 set-ups in the year. What is the cost per set-up?',
      unit: '£', answer: 150,
      exp: '£96,000 ÷ 640 = £150.00 per set-up. The pool is divided by the number of DRIVER units, never by production volume — dividing by units made is precisely what traditional absorption does, and the reason it undercosts a product made in many short runs.',
    },
    {
      id: 'M-3-13', unitKey: 'mats', lo: 3, criteria: ['MATS-3.3.2'],
      type: 'numeric',
      q: 'The rate is £150 per set-up. A product needs 32 set-ups a year and 3,200 units are made. What is the set-up cost per unit?',
      unit: '£', answer: 1.5,
      exp: '32 × £150.00 = £4,800 of set-up cost for the product, and £4,800 ÷ 3,200 units = £1.50 a unit. A product needing the same 32 set-ups but making 16,000 units would carry only £0.30 a unit — same activity, same total cost, very different cost per unit, and that difference is exactly what volume-based absorption conceals.',
    },
    {
      id: 'M-3-14', unitKey: 'mats', lo: 3, criteria: ['MATS-3.3.1', 'MATS-3.3.2'],
      type: 'mcq',
      q: 'A business moves from traditional absorption to activity-based costing. What happens to the total overhead charged to products?',
      opts: [
        'It is unchanged — the same overhead is shared out on a different basis',
        'It falls, because activity-based costing removes overhead that no activity causes',
        'It rises, because each activity is charged separately',
        'It cannot be determined without knowing the number of cost pools',
      ],
      ans: 0,
      exp: 'ABC redistributes; it does not reduce. Every pound in the pools is charged out under either method, and what changes is WHICH products carry it. That is the point: a low-volume product made in short runs picks up much more, a high-volume product made in long runs much less, and decisions about pricing and product range change accordingly.',
    },
    {
      id: 'M-3-15', unitKey: 'mats', lo: 3, criteria: ['MATS-3.4.1'],
      type: 'numeric',
      q: 'The absorption rate is £11.00 per labour hour. Actual labour hours were 9,400 and actual overhead was £106,700. What is the under- or over-absorption, as a positive figure?',
      unit: '£', answer: 3300,
      exp: 'Absorbed: 9,400 × £11.00 = £103,400. Incurred: £106,700. Absorbed falls £3,300 short, so overhead is UNDER-absorbed by £3,300 and that amount is debited to profit or loss. Products were charged less overhead than the business actually spent, and the shortfall has to reach profit somewhere.',
    },
    {
      id: 'M-3-16', unitKey: 'mats', lo: 3, criteria: ['MATS-3.4.1'],
      type: 'numeric',
      q: 'Budgeted overhead was £360,000 on 24,000 machine hours. Actual overhead was £351,000 and actual machine hours were 24,800. What is the over-absorption?',
      unit: '£', answer: 21000,
      exp: 'Rate: £360,000 ÷ 24,000 = £15.00. Absorbed: 24,800 × £15.00 = £372,000. Incurred: £351,000. Absorbed exceeds incurred by £21,000, so overhead is OVER-absorbed and £21,000 is credited to profit or loss. Both causes pushed the same way here — 800 hours above budget added £12,000 of absorption and £9,000 of underspending added the rest.',
    },
    {
      id: 'M-3-17', unitKey: 'mats', lo: 3, criteria: ['MATS-3.4.1'],
      type: 'mcq',
      q: 'Which figures are used to calculate the overhead absorbed in a period?',
      opts: [
        'The budgeted absorption rate and the actual activity',
        'The actual overhead incurred and the actual activity',
        'The budgeted overhead and the budgeted activity',
        'The actual overhead incurred and the budgeted activity',
      ],
      ans: 0,
      exp: 'The rate was fixed in advance on budgeted figures, and it is applied to whatever activity actually happened. Mixing the two the other way is the standard error and it is self-detecting: actual overhead ÷ actual hours gives a rate nobody ever used, while budgeted overhead ÷ budgeted hours simply hands back the budget, so either produces a difference of nil.',
    },
    {
      id: 'M-3-18', unitKey: 'mats', lo: 3, criteria: ['MATS-3.4.1'],
      type: 'truefalse',
      q: 'Identify whether each statement about under- and over-absorption is correct.',
      statements: [
        { text: 'An over-absorption is credited to profit or loss and increases reported profit.', answer: true },
        { text: 'An under-absorption means products were charged less overhead than the business incurred.', answer: true },
        { text: 'An under-absorption is corrected by recalculating each unit cost at the actual rate.', answer: false },
      ],
      exp: 'The first two are the definitions. The third is what nobody does: units were costed at the rate, the rate is what it is, and the adjustment goes to profit or loss in one figure rather than being pushed back through every unit. That is why an absorption difference changes total profit and leaves unit cost untouched.',
    },
    {
      id: 'M-3-19', unitKey: 'mats', lo: 3, criteria: ['MATS-3.4.1'],
      type: 'gapfill',
      q: 'Complete the sentence about why a difference arises.',
      template: 'An absorption difference arises because the rate is set on {0} figures, and is then applied to the {1} activity of the period.',
      gaps: [
        { options: ['budgeted', 'actual', 'standard'], answer: 0 },
        { options: ['actual', 'budgeted', 'normal'], answer: 0 },
      ],
      exp: 'The rate has to be available before the period starts so that jobs can be costed as they are made, which means it can only be built from budgeted figures. Applying it to what actually happened guarantees a difference unless both activity and spending land exactly on budget, which they never do.',
    },
    {
      id: 'M-3-20', unitKey: 'mats', lo: 3, criteria: ['MATS-3.1.2', 'MATS-3.2.1', 'MATS-3.4.1'],
      type: 'task',
      q: 'Reapportion the service centre, set the absorption rates, and deal with the difference.',
      brief: 'Stores is reapportioned by the direct method: 55% to Machining and 45% to Assembly. Machining absorbs on machine hours and Assembly on labour hours.',
      datasets: [
        {
          title: 'Budget for the year',
          headers: ['', 'Machining', 'Assembly', 'Stores'],
          rows: [
            ['Overhead after apportionment', '£146,000.00', '£88,000.00', '£40,000.00'],
            ['Budgeted machine hours', '14,000', '900', '—'],
            ['Budgeted labour hours', '3,200', '21,200', '—'],
          ],
        },
        {
          title: 'What actually happened in Machining',
          headers: ['', 'Amount'],
          rows: [
            ['Actual overhead', '£171,400.00'],
            ['Actual machine hours', '13,600'],
          ],
        },
      ],
      parts: [
        {
          label: 'Machining overhead after reapportionment',
          type: 'numeric', unit: '£', answer: 168000,
          exp: '£40,000.00 × 55% = £22,000.00 of stores cost, and £146,000.00 + £22,000.00 = £168,000.00. Assembly takes the other £18,000.00 to reach £106,000.00, and the two total £274,000.00 — which is £146,000.00 + £88,000.00 + £40,000.00, so nothing has been created or lost.',
        },
        {
          label: 'Machining absorption rate per machine hour',
          type: 'numeric', unit: '£', answer: 12,
          exp: '£168,000.00 ÷ 14,000 budgeted machine hours = £12.00. Machining is the plant-heavy department, so machine hours is the activity its overhead follows — its 3,200 labour hours are in the table and are not the basis here.',
        },
        {
          label: 'Assembly absorption rate per labour hour',
          type: 'numeric', unit: '£', answer: 5,
          exp: 'Assembly\'s overhead after reapportionment is £88,000.00 + £18,000.00 = £106,000.00, and £106,000.00 ÷ 21,200 budgeted labour hours = £5.00. Assembly is hand work, so labour hours is the activity its overhead follows — its 900 budgeted machine hours are in the table to be passed over, not used.',
        },
        {
          label: 'Overhead absorbed by Machining during the year',
          type: 'numeric', unit: '£', answer: 163200,
          exp: '13,600 actual machine hours × £12.00 budgeted rate = £163,200.00. This is the one line where budgeted and actual figures are deliberately mixed: the RATE is budgeted, the ACTIVITY is actual.',
        },
        {
          label: 'The position on Machining\'s overhead is:',
          type: 'choice',
          options: [
            'under-absorbed by £8,200, debited to profit or loss',
            'over-absorbed by £8,200, credited to profit or loss',
            'under-absorbed by £3,400, debited to profit or loss',
            'over-absorbed by £3,400, credited to profit or loss',
          ],
          answer: 0,
          exp: '£171,400.00 incurred against £163,200.00 absorbed leaves £8,200.00 under-absorbed, debited to profit or loss. Both causes pulled the same way: activity was 400 hours below budget, costing £4,800.00 of absorption, and spending ran £3,400.00 above the £168,000.00 budget. The £3,400.00 distractor is the spending half on its own.',
        },
      ],
      exp: 'Three steps and a diagnosis. The stores figure has to be cleared before any rate can exist, because units pass through Machining and Assembly and never through Stores. Each department then divides by the activity its own overhead follows — Machining\'s labour hours and Assembly\'s machine hours are in the table precisely so that reaching for the wrong row is possible. And the difference at the end has two causes that have to be separated before anybody can be asked to explain it.',
    },
    {
      id: 'M-3-21', unitKey: 'mats', lo: 3, criteria: ['MATS-3.1.2'],
      type: 'truefalse',
      q: 'Identify whether each statement about cost centres is correct.',
      statements: [
        { text: 'Overhead absorption rates are calculated for production cost centres only.', answer: true },
        { text: 'Reapportionment changes the total overhead to be absorbed.', answer: false },
        { text: 'A service cost centre supports production without units passing through it.', answer: true },
      ],
      exp: 'Units pass through production centres and pick up overhead there, so only those can carry a rate. Service centres — stores, maintenance, the canteen — support production without ever touching the product, which is why their cost has to be pushed into the production centres first. And reapportionment only moves cost between centres: if the total changes, something has gone wrong.',
    },
    {
      id: 'M-3-22', unitKey: 'mats', lo: 3, criteria: ['MATS-3.2.1'],
      type: 'mcq',
      q: 'A factory uses one blanket overhead rate across a machine shop and a hand-finishing department. What is the consequence?',
      opts: [
        'Hand-finished jobs are charged for machine overhead they did not cause',
        'The total overhead absorbed across the factory is understated',
        'Under- and over-absorption can no longer arise',
        'The rate cannot be calculated until the period has ended',
      ],
      ans: 0,
      exp: 'A blanket rate charges every job the same overhead per hour whatever department it passed through, so the hand-finishing job carries a share of the machine shop\'s power and plant depreciation and the machine shop\'s jobs carry less than they caused. The factory total absorbed is much the same either way — what changes is which jobs look profitable, which is what the figures are for.',
    },
    {
      id: 'M-3-23', unitKey: 'mats', lo: 3, criteria: ['MATS-3.3.2'],
      type: 'numeric',
      q: 'A materials handling pool of £117,000 is driven by 2,600 material movements. A product uses 145 movements. How much materials handling cost does it carry?',
      unit: '£', answer: 6525,
      exp: '£117,000 ÷ 2,600 = £45.00 per movement, and 145 × £45.00 = £6,525.00. The product carries cost in proportion to the movements it caused, whatever its production volume — which is the difference between ABC and dividing the pool by units made.',
    },
    {
      id: 'M-3-24', unitKey: 'mats', lo: 3, criteria: ['MATS-3.4.1'],
      type: 'mcq',
      q: 'A department reports a large under-absorption. Which pair of circumstances would produce it?',
      opts: [
        'Activity below budget and overhead spending above budget',
        'Activity above budget and overhead spending below budget',
        'Activity above budget and overhead spending above budget by the same proportion',
        'Activity and spending both exactly on budget',
      ],
      ans: 0,
      exp: 'Under-absorption means less was absorbed than was incurred, and the two levers each push one way: fewer hours than budgeted means less absorbed, more spending than budgeted means more to absorb against. Both together give the largest under-absorption. The second option is both levers pushing the other way, and the last is the only case that guarantees no difference at all.',
    },
    {
      id: 'M-3-25', unitKey: 'mats', lo: 3, criteria: ['MATS-3.4.1'],
      type: 'mcq',
      q: 'What effect does an under-absorption of overhead have on the cost per unit already recorded?',
      opts: [
        'None — units were costed at the absorption rate and the adjustment goes to profit or loss',
        'Each unit cost is increased by the under-absorption divided by units produced',
        'Each unit cost is reduced, because too little overhead was charged',
        'Unit costs are restated using the actual overhead incurred',
      ],
      ans: 0,
      exp: 'The rate is what units were costed at, and it stands. The whole difference is taken to profit or loss in one figure, which is why an absorption difference can turn a month that looked fine into a loss while leaving every cost card unchanged. Restating unit costs afterwards would defeat the purpose of having a predetermined rate at all.',
    },
    {
      id: 'M-3-26', unitKey: 'mats', lo: 3, criteria: ['MATS-3.1.1', 'MATS-3.1.2'],
      type: 'numeric',
      q: 'Factory rent of £84,000 is apportioned on floor area. Machining occupies 4,200 square metres, Assembly 2,800 and Stores 1,400. How much rent is apportioned to Machining?',
      unit: '£', answer: 42000,
      exp: 'Total floor area is 4,200 + 2,800 + 1,400 = 8,400 square metres, so Machining takes 4,200 ÷ 8,400 = one half: £84,000 × 0.5 = £42,000.00. Assembly takes £28,000.00 and Stores £14,000.00, and the three add back to £84,000.00 — apportionment shares a cost out in full and never leaves a remainder.',
    },
    /* ── Outcome 4 — investigating deviations from budgets (15%) ────────── */
    {
      id: 'M-4-01', unitKey: 'mats', lo: 4, criteria: ['MATS-4.1.1'],
      type: 'mcq',
      q: 'What is a standard cost?',
      opts: [
        'What one unit ought to cost, agreed before the period begins',
        'What one unit did cost, averaged over the period just ended',
        'The lowest cost at which one unit has ever been produced',
        'The cost of one unit as reported in the financial statements',
      ],
      ans: 0,
      exp: 'A standard is a target set in advance from the quantity of each resource a unit should need and the price that resource should command. Last year\'s average is a record rather than a target, and building next year\'s plan on it locks in whatever went wrong. The lowest cost ever achieved is an ideal standard, which is missed every period and soon ignored.',
    },
    {
      id: 'M-4-02', unitKey: 'mats', lo: 4, criteria: ['MATS-4.1.1'],
      type: 'numeric',
      q: 'A standard card shows 5 kg of material at £3.20 a kilogram, 0.8 labour hours at £15.00 an hour, variable overhead at £6.00 a labour hour and fixed overhead at £9.00 a labour hour. What is the standard absorption cost of one unit?',
      unit: '£', answer: 40,
      exp: '5 × £3.20 = £16.00 of material, 0.8 × £15.00 = £12.00 of labour, 0.8 × £6.00 = £4.80 of variable overhead and 0.8 × £9.00 = £7.20 of fixed overhead. £16.00 + £12.00 + £4.80 + £7.20 = £40.00. Stopping before the fixed line would give the marginal cost of £32.80 instead.',
    },
    {
      id: 'M-4-03', unitKey: 'mats', lo: 4, criteria: ['MATS-4.1.2'],
      type: 'numeric',
      q: 'A standard card shows a selling price of £48.00 and a variable cost of £29.00. Budgeted fixed costs are £84,000 and the budget is for 7,000 units. What is the budgeted profit?',
      unit: '£', answer: 49000,
      exp: 'Contribution is £48.00 − £29.00 = £19.00 a unit, so 7,000 × £19.00 = £133,000, and the fixed costs come off in one figure: £133,000 − £84,000 = £49,000. Spreading the £84,000 over 7,000 units first gives £12.00 a unit and the same answer here — but only at this one volume, which is why it is a habit worth avoiding.',
    },
    {
      id: 'M-4-04', unitKey: 'mats', lo: 4, criteria: ['MATS-4.1.3'],
      type: 'picklist',
      q: 'Identify the type of budget being described.',
      picklist: {
        title: 'Types of budget',
        rowHeader: 'Description', choiceHeader: 'Type',
        options: ['Fixed', 'Flexed', 'Rolling'],
        rows: [
          { text: 'Set for one planned level of activity and not adjusted afterwards', answer: 0 },
          { text: 'Rebuilt at the level of activity that actually occurred', answer: 1 },
          { text: 'Extended by one further month as each month closes', answer: 2 },
          { text: 'The budget against which resources are ordered and staff hired', answer: 0 },
          { text: 'The budget an operating statement starts from', answer: 1 },
        ],
      },
      exp: 'The word "fixed" describes the budget, not its costs: it is the plan, and it is what a business commits resources against. A flexed budget exists for control rather than planning, which is why the operating statement begins there. A rolling budget keeps a constant horizon ahead instead of one that shortens as the year runs down.',
    },
    {
      id: 'M-4-05', unitKey: 'mats', lo: 4, criteria: ['MATS-4.1.3'],
      type: 'mcq',
      q: 'What is the main drawback of a rolling budget?',
      opts: [
        'It takes more time and effort to prepare than an annual budget',
        'It cannot be compared with actual results at the period end',
        'It has to be flexed before any variance can be calculated',
        'It ignores fixed costs, which are only budgeted once a year',
      ],
      ans: 0,
      exp: 'Adding a period every time one closes means budgeting all year rather than once a year, and that cost is the reason many businesses do not do it. Nothing about the technique stops the budget being compared with actual results or being flexed — a rolling budget is flexed for control in exactly the way an annual one is, and it budgets fixed costs like any other.',
    },
    {
      id: 'M-4-06', unitKey: 'mats', lo: 4, criteria: ['MATS-4.1.3', 'MATS-4.1.6'],
      type: 'truefalse',
      q: 'Identify whether each statement about flexing a budget is correct.',
      statements: [
        { text: 'A flexed budget shows what costs should have been at the volume actually achieved.', answer: true },
        { text: 'A fixed budget is one made up entirely of fixed costs.', answer: false },
        { text: 'Revenue is left at its original figure when a budget is flexed.', answer: false },
      ],
      exp: 'Flexing answers one question: at the volume that actually happened, what should this have cost? The word "fixed" in fixed budget means unadjusted, not made of fixed costs — a fixed budget contains plenty of variable ones. And revenue is flexed along with everything else; leaving it at the original figure reports the whole of any extra volume as a favourable price variance, which it plainly is not.',
    },
    {
      id: 'M-4-07', unitKey: 'mats', lo: 4, criteria: ['MATS-4.1.6'],
      type: 'numeric',
      q: 'A budget for 4,000 units shows variable costs of £68,000 and fixed costs of £51,000. Actual output was 5,500 units. What is the total cost in the flexed budget?',
      unit: '£', answer: 144500,
      exp: 'The variable cost per unit is £68,000 ÷ 4,000 = £17.00, so the flexed variable cost is 5,500 × £17.00 = £93,500, and the fixed £51,000 is carried across untouched: £93,500 + £51,000 = £144,500. Scaling the whole £119,000 up in proportion would give £163,625 and charge the business for premises it never rented.',
    },
    {
      id: 'M-4-08', unitKey: 'mats', lo: 4, criteria: ['MATS-4.1.6'],
      type: 'numeric',
      q: 'A standard card shows a selling price of £26.00 and a variable cost of £15.00. Budgeted fixed costs are £72,000. The budget was for 9,000 units but 11,000 were made and sold. What is the flexed budget profit?',
      unit: '£', answer: 49000,
      exp: 'Contribution is £26.00 − £15.00 = £11.00 a unit, so the flexed contribution is 11,000 × £11.00 = £121,000, and the fixed costs stay at £72,000: £121,000 − £72,000 = £49,000. The original budget profit was 9,000 × £11.00 = £99,000 less £72,000, or £27,000 — and the whole £22,000 difference is volume, which is exactly what flexing exists to take out of the comparison.',
    },
    {
      id: 'M-4-09', unitKey: 'mats', lo: 4, criteria: ['MATS-4.1.6'],
      type: 'entrygrid',
      q: 'A budget was set for 6,000 units: materials £54,000, labour £42,000, variable overhead £18,000, fixed overhead £39,000. Actual output was 7,000 units. Complete the flexed budget.',
      entrygrid: {
        title: 'Flexed budget, 7,000 units',
        rowHeader: 'Cost',
        columns: ['Original budget £', 'Flexed budget £'],
        rows: [
          { label: 'Direct materials', cells: { 0: 54000, 1: 63000 } },
          { label: 'Direct labour', cells: { 0: 42000, 1: 49000 } },
          { label: 'Variable overhead', cells: { 0: 18000, 1: 21000 } },
          { label: 'Fixed overhead', cells: { 0: 39000, 1: 39000 } },
        ],
      },
      exp: 'Each variable line is rebuilt on its own rate: £54,000 ÷ 6,000 = £9.00 a unit and 7,000 × £9.00 = £63,000; £42,000 ÷ 6,000 = £7.00 and 7,000 × £7.00 = £49,000; £18,000 ÷ 6,000 = £3.00 and 7,000 × £3.00 = £21,000. The fixed line is copied across at £39,000, because making a sixth more units does not raise the rent.',
    },
    {
      id: 'M-4-10', unitKey: 'mats', lo: 4, criteria: ['MATS-4.1.6'],
      type: 'mcq',
      q: 'Why is a budget flexed before variances are calculated?',
      opts: [
        'So that the difference in volume does not appear as a difference in performance',
        'So that fixed costs can be shared across the units actually produced',
        'So that the original budget can be reported as having been achieved',
        'So that favourable and adverse variances cancel each other out',
      ],
      ans: 0,
      exp: 'Comparing actual cost at one volume with budgeted cost at another measures the volume far more than it measures anyone\'s performance. Flexing rebuilds the plan at the volume that happened, so what is left is spending and pricing. Fixed costs are deliberately NOT shared out during flexing, and nothing about the technique cancels variances or rescues the original budget.',
    },
    {
      id: 'M-4-11', unitKey: 'mats', lo: 4, criteria: ['MATS-4.1.5'],
      type: 'numeric',
      q: 'A business budgets 4,500 units of Product J, needing 6 kg each, and 3,200 units of Product K, needing 2.5 kg each, of the same material. How many kilograms are in the materials budget?',
      unit: 'kg', answer: 35000,
      exp: '4,500 × 6 = 27,000 kg for J and 3,200 × 2.5 = 8,000 kg for K, so 27,000 + 8,000 = 35,000 kg. Building the quantity before the money is the habit worth keeping: the buyer places orders in kilograms, and pricing once at the end avoids rounding each product separately.',
    },
    {
      id: 'M-4-12', unitKey: 'mats', lo: 4, criteria: ['MATS-4.1.5'],
      type: 'numeric',
      q: 'A business budgets 2,800 units of Product L at 1.75 labour hours each and 4,000 units of Product M at 0.9 hours each. Labour costs £13.00 an hour. What is the labour budget in money?',
      unit: '£', answer: 110500,
      exp: '2,800 × 1.75 = 4,900 hours and 4,000 × 0.9 = 3,600 hours, so 4,900 + 3,600 = 8,500 hours, and 8,500 × £13.00 = £110,500. The 8,500 hours is worth recording separately: it is what the variable overhead budget is built on and what the headcount plan needs.',
    },
    {
      id: 'M-4-13', unitKey: 'mats', lo: 4, criteria: ['MATS-4.1.5'],
      type: 'entrygrid',
      q: 'Product R sells for £34.00 and 5,000 units are budgeted. Product S sells for £52.00 and 2,500 units are budgeted. Each R needs 2 kg of material and each S needs 3 kg, at £7.00 a kilogram. Complete the two budgets.',
      entrygrid: {
        title: 'Revenue and materials budgets',
        rowHeader: 'Line',
        columns: ['Product R', 'Product S'],
        rows: [
          { label: 'Revenue budget £', cells: { 0: 170000, 1: 130000 } },
          { label: 'Material required, kg', cells: { 0: 10000, 1: 7500 } },
          { label: 'Materials budget £', cells: { 0: 70000, 1: 52500 } },
        ],
      },
      exp: 'Revenue is 5,000 × £34.00 = £170,000 and 2,500 × £52.00 = £130,000, giving £300,000 in total. Material is 5,000 × 2 = 10,000 kg and 2,500 × 3 = 7,500 kg, which at £7.00 is 10,000 × 7.00 = £70,000 and 7,500 × 7.00 = £52,500. Each product carries its own selling price, so revenue is the one budget that can never be built from a combined volume.',
    },
    {
      id: 'M-4-14', unitKey: 'mats', lo: 4, criteria: ['MATS-4.1.5'],
      type: 'mcq',
      q: 'A business absorbs variable production overhead on machine hours. Which budget must be completed before the variable overhead budget?',
      opts: [
        'The machine hours budget',
        'The labour hours budget',
        'The fixed overhead budget',
        'The non-manufacturing overhead budget',
      ],
      ans: 0,
      exp: 'The overhead budget is the absorption rate multiplied by the activity it is absorbed on, so that activity has to be budgeted first. Where the rate is per labour hour the labour budget comes first; where it is per machine hour, as here, the machine hours budget does. The two fixed totals are agreed in advance and depend on no other budget.',
    },
    {
      id: 'M-4-15', unitKey: 'mats', lo: 4, criteria: ['MATS-4.1.4'],
      type: 'numeric',
      q: 'A flexed budget profit is £96,500. The variances are: sales price £4,200 adverse, materials £1,900 favourable, labour £3,300 adverse and variable overhead £700 favourable. What is the actual profit?',
      unit: '£', answer: 91600,
      exp: 'Favourable variances add and adverse ones subtract: 1,900 + 700 = £2,600 favourable against 4,200 + 3,300 = £7,500 adverse, so the net effect is £4,900 adverse. £96,500 − £4,900 = £91,600. An operating statement is only complete when the listed variances carry you exactly from the flexed profit to the actual one.',
    },
    {
      id: 'M-4-16', unitKey: 'mats', lo: 4, criteria: ['MATS-4.1.4'],
      type: 'mcq',
      q: 'What figure does an operating statement begin with?',
      opts: [
        'The flexed budget profit',
        'The original budget profit',
        'The actual profit for the period',
        'The standard profit per unit',
      ],
      ans: 0,
      exp: 'The statement bridges from what the business should have earned at the volume it actually achieved to what it did earn, naming each variance on the way. Starting from the original budget profit leaves the effect of the volume difference unexplained, so the variances no longer reconcile — which is the quickest way to spot that the wrong opening figure was used.',
    },
    {
      id: 'M-4-17', unitKey: 'mats', lo: 4, criteria: ['MATS-4.2.1'],
      type: 'truefalse',
      q: 'Identify whether each statement about the direction of a variance is correct.',
      statements: [
        { text: 'A variance is only meaningful once it has been labelled favourable or adverse.', answer: true },
        { text: 'Spending less than the flexed budget allowed gives a favourable variance.', answer: true },
        { text: 'Earning less revenue than the flexed budget expected gives a favourable variance.', answer: false },
      ],
      exp: 'A bare figure cannot be read: £3,700 is either a saving or an overspend and the reader has no way to tell, so the direction is part of the answer rather than a decoration on it. The rule behind both of the other statements is the same one — did this push profit above or below the flexed figure? Spending less does; earning less does not.',
    },
    {
      id: 'M-4-18', unitKey: 'mats', lo: 4, criteria: ['MATS-4.2.3'],
      type: 'numeric',
      q: 'The flexed budget revenue is £286,000 and actual revenue was £292,400. How large is the total sales price variance?',
      unit: '£', answer: 6400,
      exp: '£292,400 − £286,000 = £6,400 more revenue than the flexed budget expected, so the variance is £6,400 favourable. Because flexing has already removed the volume difference from the revenue line, whatever is left over can only be price — a rise achieved, or a discount not given.',
    },
    {
      id: 'M-4-19', unitKey: 'mats', lo: 4, criteria: ['MATS-4.2.3'],
      type: 'numeric',
      q: 'A budget for 5,000 units allowed £75,000 of materials. Actual output was 6,400 units and materials cost £98,300. How large is the total materials variance?',
      unit: '£', answer: 2300,
      exp: 'Flex first: £75,000 ÷ 5,000 = £15.00 a unit, and 6,400 × £15.00 = £96,000. Then compare: £98,300 − £96,000 = £2,300 more than the flexed budget allowed, so £2,300 adverse. Comparing the £98,300 with the original £75,000 would report £23,300 adverse, almost all of which is simply the cost of making 1,400 more units.',
    },
    {
      id: 'M-4-20', unitKey: 'mats', lo: 4, criteria: ['MATS-4.2.3'],
      type: 'numeric',
      q: 'Budgeted fixed production overhead was £64,000 for 8,000 units. Actual output was 9,500 units and actual fixed overhead was £61,900. How large is the total fixed production overhead variance?',
      unit: '£', answer: 2100,
      exp: '£64,000 − £61,900 = £2,100 less was spent than budgeted, so the variance is £2,100 favourable. The output figures are there to be ignored: fixed overhead is not flexed, so its flexed budget figure is the original £64,000. Flexing it to 9,500 units would give £76,000 and invent a £14,100 favourable variance out of arithmetic alone.',
    },
    {
      id: 'M-4-21', unitKey: 'mats', lo: 4, criteria: ['MATS-4.2.1'],
      type: 'picklist',
      q: 'Identify whether each result gives a favourable or an adverse variance.',
      picklist: {
        title: 'Direction of the variance',
        rowHeader: 'Result', choiceHeader: 'Variance',
        options: ['Favourable', 'Adverse'],
        rows: [
          { text: 'Labour cost £41,600 against a flexed budget of £44,000', answer: 0 },
          { text: 'Revenue £188,000 against a flexed budget of £195,000', answer: 1 },
          { text: 'Materials cost £73,900 against a flexed budget of £71,200', answer: 1 },
          { text: 'Fixed overhead £29,400 against a budget of £31,000', answer: 0 },
          { text: 'Revenue £212,500 against a flexed budget of £206,000', answer: 0 },
        ],
      },
      exp: 'One test settles every row: did this push profit above the flexed figure or below it? Spending less on a cost pushes it up, and so does earning more revenue; spending more or earning less pushes it down. Applying that question is more reliable than remembering that costs are subtracted one way round and revenues the other.',
    },
    {
      id: 'M-4-22', unitKey: 'mats', lo: 4, criteria: ['MATS-4.2.2'],
      type: 'gapfill',
      q: 'Complete the sentence about flexed budgets.',
      template: 'Flexing multiplies each {0} cost by the volume actually achieved and carries the {1} cost across unchanged, so that what remains when actual results are compared with it is no longer distorted by {2}.',
      gaps: [
        { options: ['variable', 'fixed', 'standard'], answer: 0 },
        { options: ['fixed', 'variable', 'marginal'], answer: 0 },
        { options: ['volume', 'price', 'waste'], answer: 0 },
      ],
      exp: 'The flexed budget is the plan rebuilt at the volume that actually happened, so the variable lines move and the fixed lines do not. What that buys is a fair comparison: with the volume difference already accounted for, the remaining gap between flexed and actual is spending and pricing, which is what a manager can be asked about.',
    },
    {
      id: 'M-4-23', unitKey: 'mats', lo: 4, criteria: ['MATS-4.3.1'],
      type: 'mcq',
      q: 'A month shows a favourable labour rate outcome and an adverse materials variance. Which single explanation covers both?',
      opts: [
        'Less experienced staff were used and wasted more material',
        'A pay freeze coincided with an unexpected supplier price rise',
        'Output was above budget, so more of both resources was used',
        'The material standard was revised part-way through the month',
      ],
      ans: 0,
      exp: 'One decision producing two variances of opposite sign is the pattern this outcome keeps returning to, and cheaper labour that spoils more material is its standard case. The second option needs two unrelated events to land in the same month. Higher output is ruled out by the technique: flexing removed the volume difference before either variance was worked out.',
    },
    {
      id: 'M-4-24', unitKey: 'mats', lo: 4, criteria: ['MATS-4.3.2'],
      type: 'truefalse',
      q: 'Identify whether each statement about selecting variances to investigate is correct.',
      statements: [
        { text: 'A variance is judged both in money and as a percentage of the figure it relates to.', answer: true },
        { text: 'Investigating every variance found is the most efficient use of management time.', answer: false },
        { text: 'A variance the business could not have controlled should be left out of the report.', answer: false },
      ],
      exp: 'Two tests are used because either alone misleads: money alone hides a small line that has doubled, and a percentage alone chases trivial sums. Investigating everything spends more on the inquiry than it recovers, which is why a business sets its rule in advance. And an uncontrollable variance still belongs in the report — a market price that has moved is exactly the news that means the standard needs revising.',
    },
    {
      id: 'M-4-25', unitKey: 'mats', lo: 4, criteria: ['MATS-4.3.3'],
      type: 'mcq',
      q: 'The same adverse material price variance has appeared every month for six months. What is the most appropriate response?',
      opts: [
        'Review the standard price, which may no longer reflect the market',
        'Ask the production manager to explain the current month in writing',
        'Investigate the buyer\'s decisions over the whole six-month period',
        'Treat the variance as uncontrollable and stop reporting it',
      ],
      ans: 0,
      exp: 'A variance in the same direction month after month is evidence about the standard rather than about anybody\'s performance — the price has moved and the card has not. Asking one manager to explain one month of a six-month pattern answers the wrong question, and quietly dropping the line loses the information altogether. Revising a standard that has been overtaken by events is a legitimate recommendation and often the right one.',
    },
    {
      id: 'M-4-26', unitKey: 'mats', lo: 4, criteria: ['MATS-4.1.6', 'MATS-4.2.3', 'MATS-4.1.4'],
      type: 'task',
      q: 'Flex the budget, calculate the variances and reconcile to the actual profit.',
      brief: 'Marden Plastics budgeted for 8,000 units and made and sold 9,000. Everything made was sold, and there was no opening or closing inventory.',
      datasets: [
        {
          title: 'Standard cost card and budget',
          headers: ['Item', 'Amount'],
          rows: [
            ['Standard selling price a unit', '£50.00'],
            ['Standard direct materials a unit', '£12.00'],
            ['Standard direct labour a unit', '£12.00'],
            ['Standard variable overhead a unit', '£6.00'],
            ['Budgeted fixed production overhead', '£48,000.00'],
            ['Budgeted units', '8,000'],
          ],
        },
        {
          title: 'Actual results — 9,000 units',
          headers: ['Item', 'Amount'],
          rows: [
            ['Revenue', '£441,000.00'],
            ['Direct materials', '£110,700.00'],
            ['Direct labour', '£106,200.00'],
            ['Variable overhead', '£55,800.00'],
            ['Fixed production overhead', '£46,500.00'],
          ],
        },
      ],
      parts: [
        {
          label: 'Total cost in the flexed budget',
          type: 'numeric', unit: '£', answer: 318000,
          exp: 'The variable lines flex to 9,000 units: 9,000 × £12.00 = £108,000 of materials, 9,000 × £12.00 = £108,000 of labour and 9,000 × £6.00 = £54,000 of variable overhead. The fixed £48,000 is carried across unchanged, so £108,000 + £108,000 + £54,000 + £48,000 = £318,000.',
        },
        {
          label: 'Profit in the flexed budget',
          type: 'numeric', unit: '£', answer: 132000,
          exp: 'Flexed revenue is 9,000 × £50.00 = £450,000, so £450,000 − £318,000 = £132,000. This is what Marden should have earned making and selling 9,000 units, and it is the only figure the actual result can fairly be measured against.',
        },
        {
          label: 'Total direct materials variance',
          type: 'numeric', unit: '£', answer: 2700,
          exp: '£110,700 − £108,000 = £2,700 more than the flexed budget allowed, so £2,700 adverse. Comparing the actual spend with the original budget of 8,000 × £12.00 = £96,000 would report £14,700 adverse, most of which is simply the cost of the extra 1,000 units.',
        },
        {
          label: 'Total sales price variance',
          type: 'numeric', unit: '£', answer: 9000,
          exp: '£450,000 − £441,000 = £9,000 of revenue that the flexed budget expected and did not arrive, so £9,000 adverse. Volume is already accounted for, so this is price: 9,000 units earned £441,000, which is £49.00 each against a standard of £50.00.',
        },
        {
          label: 'Actual profit for the period',
          type: 'numeric', unit: '£', answer: 121800,
          exp: 'Actual costs are £110,700 + £106,200 + £55,800 + £46,500 = £319,200, so £441,000 − £319,200 = £121,800. The gap from the flexed profit is £132,000 − £121,800 = £10,200 adverse, which the five variances must add back to exactly.',
        },
        {
          label: 'Which costs came in below the flexed budget?',
          type: 'choice',
          options: [
            'Direct labour and fixed production overhead',
            'Direct materials and variable overhead',
            'Direct labour and variable overhead',
            'Fixed production overhead only',
          ],
          answer: 0,
          exp: 'Labour was £108,000 − £106,200 = £1,800 favourable and fixed overhead £48,000 − £46,500 = £1,500 favourable. Materials were £2,700 adverse and variable overhead £55,800 − £54,000 = £1,800 adverse. With the £9,000 adverse on price, the five net to £9,000 + £2,700 + £1,800 = £13,500 adverse against £1,800 + £1,500 = £3,300 favourable, which is £10,200 adverse and exactly the profit gap.',
        },
      ],
      exp: 'Set beside the original budget, Marden looks to have overspent by £319,200 − £288,000 = £31,200. Almost all of that is the cost of 1,000 units the budget never planned for, and flexing removes it: the real story is £10,200 of underperformance, most of which is a selling price of £49.00 where £50.00 was planned. Two departments beat their standards and one modest overspend on materials was more than offset elsewhere. None of that is visible until the budget has been flexed.',
    },
  ];

  /* Grouped for the by-outcome picker. */
  function byOutcome() {
    var out = {};
    QUESTIONS.forEach(function (q) { (out[q.lo] = out[q.lo] || []).push(q); });
    return out;
  }

  var API = { AAT3_MATS_PATH: PATH, AAT3_MATS_PRACTICE: { QUESTIONS: QUESTIONS, byOutcome: byOutcome } };
  if (typeof module === 'object' && module.exports) module.exports = API;
  else { root.AAT3_MATS_PATH = PATH; root.AAT3_MATS_PRACTICE = { QUESTIONS: QUESTIONS, byOutcome: byOutcome }; }
}(typeof self !== 'undefined' ? self : this));
