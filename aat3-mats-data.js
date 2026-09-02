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
          q: 'Identify whether each statement about this unit is correct.',
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
          ],
        },
        {
          h: 'Where the fixed costs went',
          p: [
            'Notice that fixed costs appear **once, in total, at the bottom** — not spread across the 4,000 units. That is deliberate and it is the marginal costing layout. Fixed costs do not change because one more unit was sold, so attaching a slice of them to each unit tells you something that is not true of the next unit you sell.',
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
          q: 'Identify whether each statement is correct.',
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
     THE PATH
     ══════════════════════════════════════════════════════════════════════════ */

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
