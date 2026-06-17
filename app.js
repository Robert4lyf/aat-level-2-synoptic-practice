/* AAT Level 2 Synoptic Practice — App Logic (rebuilt with numeric Q + calculator) */
(function () {
  'use strict';

  /* ── CONSTANTS ── */
  const STORAGE_KEY = 'aatPrep_v2';
  const SUBJECT_STORE_KEY = 'multisubject_active';
  let _activeSubjectId = localStorage.getItem(SUBJECT_STORE_KEY) || 'aat';
  function getStorageKey() { return _activeSubjectId === 'aat' ? STORAGE_KEY : 'prep_v2_' + _activeSubjectId; }
  function subjectStorageKey(id) { return id === 'aat' ? STORAGE_KEY : 'prep_v2_' + id; }

  const SUBJECT_REGISTRY = [
    {
      id: 'aat', name: 'AAT Level 2 Synoptic', short: 'AAT', flag: '🧮', color: '#2563EB',
      desc: 'Prepare for the AQ2022 Business Environment Synoptic Assessment',
      meta: '515 questions · Mock exams · T-Accounts',
      tabs: ['learn','home','tools','glossary','progress','howto'],
      activate() { window.TOPICS = window.AAT_TOPICS; window.ALL_QUESTIONS = window.AAT_QUESTIONS; window.LEARN_PATH = window.AAT_LEARN_PATH; window.SKILLS = window.AAT_SKILLS; }
    },
    {
      id: 'french', name: 'Français', short: 'Français', flag: '🇫🇷', color: '#003189',
      desc: 'Apprenez le vocabulaire, la grammaire et la conversation française',
      meta: '180+ questions · 37 leçons · A1–B1 + histoires + examens',
      tabs: ['learn','home','progress'],
      activate() { window.TOPICS = window.FR_TOPICS; window.ALL_QUESTIONS = window.FR_QUESTIONS; window.LEARN_PATH = window.FR_LEARN_PATH; window.SKILLS = { defs: [] }; }
    },
    {
      id: 'lsf', name: 'Langue des Signes Française', short: 'LSF', flag: '🤟', color: '#7c3aed',
      desc: 'Découvrez les bases de la LSF — la langue des signes française',
      meta: '50+ questions · 4 leçons · débutant',
      tabs: ['learn','home','progress'],
      activate() { window.TOPICS = window.LSF_TOPICS; window.ALL_QUESTIONS = window.LSF_QUESTIONS; window.LEARN_PATH = window.LSF_LEARN_PATH; window.SKILLS = { defs: [] }; }
    },
    {
      id: 'code-route', name: 'Code de la Route', short: 'Code de la Route', flag: '🚗', color: '#dc2626',
      desc: 'Préparez votre permis de conduire — théorie et panneaux',
      meta: '80+ questions · 5 leçons · examen officiel',
      tabs: ['learn','home','progress'],
      activate() { window.TOPICS = window.CR_TOPICS; window.ALL_QUESTIONS = window.CR_QUESTIONS; window.LEARN_PATH = window.CR_LEARN_PATH; window.SKILLS = { defs: [] }; }
    },
  ];
  function getSubject(id) { return SUBJECT_REGISTRY.find(s => s.id === id) || SUBJECT_REGISTRY[0]; }

  /* Maps a French question ID (fr-NNN) to its CEFR level string.
     A1 = beginner basics, A2 = elementary grammar/vocab, B1 = intermediate structures. */
  function frQuestionLevel(id) {
    const n = parseInt(id.replace('fr-', ''), 10);
    if (isNaN(n)) return null;
    // A1 — Débutant
    if (n >= 1   && n <= 17)  return 'A1'; // greetings
    if (n >= 27  && n <= 33)  return 'A1'; // basic family/food vocab
    if (n >= 35  && n <= 51)  return 'A1'; // gender, articles, negation, possession, questions
    if (n >= 62  && n <= 65)  return 'A1'; // time and seasons
    if (n >= 69  && n <= 76)  return 'A1'; // basic daily life
    if (n >= 86  && n <= 89)  return 'A1'; // présent être/avoir/-ER/-IR
    if (n >= 121 && n <= 132) return 'A1'; // extended greetings and basic vocab
    if (n === 136 || n === 137) return 'A1'; // family/seasons dragdrops
    if (n >= 152 && n <= 157) return 'A1'; // telling the time
    if (n >= 160 && n <= 167) return 'A1'; // café, restaurant, basic directions
    if (n === 168 || n === 179 || n === 181) return 'A1'; // être/avoir conjugation drills
    if (n >= 183 && n <= 200) return 'A1'; // pronunciation/accents + basic body parts
    if (n >= 253 && n <= 262) return 'A1'; // transport and directions
    if (n >= 271 && n <= 290) return 'A1'; // plurals, negation, adjectives, aller/faire
    if (n >= 312 && n <= 331) return 'A1'; // -ER verb conjugation, nationalities/countries, weather
    if (n >= 378 && n <= 422) return 'A1'; // thematic vocab: numbers, family, food
    if (n >= 447 && n <= 458) return 'A1'; // thematic vocab: weather
    if (n >= 471 && n <= 505) return 'A1'; // conjugation drills: être/avoir/aller + regular -ER/-IR/-RE
    if (n >= 527 && n <= 543) return 'A1'; // dialogue/scenario: basic real-world conversations
    if (n >= 576 && n <= 591) return 'A1'; // pronunciation: vowels, silent letters, basic sounds
    if (n >= 618 && n <= 633) return 'A1'; // word order: basic SVO sentences
    if (n >= 653 && n <= 662) return 'A1'; // listen: greetings and basic phrases
    // B1 — Intermédiaire
    if (n >= 561 && n <= 575) return 'B1'; // dialogue/scenario: formal and complex situations
    if (n >= 606 && n <= 617) return 'B1'; // pronunciation: register, intonation, schwa
    if (n >= 646 && n <= 652) return 'B1'; // word order: relative clauses, subjunctive, complex
    if (n >= 669 && n <= 672) return 'B1'; // listen: complex sentences, proverbs
    if (n === 115 || n === 116) return 'B1'; // COD/COI pronouns intro
    if (n === 174 || n === 175 || n === 176) return 'B1'; // conditionnel si, subjonctif, reflexive agreement
    if (n >= 238 && n <= 252) return 'B1'; // COD/COI/y/en/dont/subjonctif/past hypothetical
    if (n >= 361 && n <= 377) return 'B1'; // relative pronouns dont/où; Y/EN pronouns
    // A2 — Élémentaire (everything else)
    return 'A2';
  }
  /* Returns true if the given CEFR level (A1/A2/B1) is unlocked for the French course.
     A1 is always open; A2 requires all A1 lessons done + A1 unit quiz passed;
     B1 requires all A2 lessons done + A2 unit quiz passed. */
  function frLevelUnlocked(cefrLevel) {
    if (_activeSubjectId !== 'french') return true;
    if (!cefrLevel || cefrLevel === 'A1') return true;
    const prereqLevel  = cefrLevel === 'B1' ? 'A2' : 'A1';
    const prereqUnitId = cefrLevel === 'B1' ? 'fr-a2' : 'fr-a1';
    const prereqUnit   = (window.LEARN_PATH || []).find(u => (u.unit || u.id) === prereqUnitId);
    if (!prereqUnit) return false;
    if (!prereqUnit.lessons.every(L => isLessonDone(L.id))) return false;
    const unitTest = (Storage.data.learn.unitTests || {})[prereqUnitId];
    return !!(unitTest && unitTest.passed);
  }

  /* Unit-level unlock gate for non-French subjects.
     First unit is always open; each subsequent unit requires the previous one to
     have every lesson done AND its unit quiz passed — mirroring frLevelUnlocked(). */
  function isUnitUnlocked(unitId) {
    if (_activeSubjectId === 'french') return true; // French uses frLevelUnlocked instead
    const lp = window.LEARN_PATH || [];
    const key = u => u.unit || u.id;
    const idx = lp.findIndex(u => key(u) === unitId);
    if (idx <= 0) return true; // first unit, single-unit subjects, or unknown topic
    const prereq = lp[idx - 1];
    const prereqId = key(prereq);
    if (!prereq.lessons.every(L => isLessonDone(L.id))) return false;
    const unitTest = (Storage.data.learn.unitTests || {})[prereqId];
    return !!(unitTest && unitTest.passed);
  }

  const PASS_MARK = 70;
  const UNIT_QUIZ_PASS_MARK = 80;
  const PRACTICE_LENGTH = 15;
  /* Mock exam blueprint — task-based, even topic weighting, difficulty progression.
     Mirrors the structure of the AAT Level 2 synoptic: each unit appears as a
     "foundations" task (easy) and an "applied" task (medium/hard). */
  const MOCK_BLUEPRINT = [
    { title: 'Introduction to Bookkeeping — foundations', topics: ['itbk'], difficulties: ['easy'], count: 7 },
    { title: 'Introduction to Bookkeeping — applied', topics: ['itbk'], difficulties: ['medium', 'hard'], count: 7 },
    { title: 'Principles of Bookkeeping Controls — foundations', topics: ['pobc'], difficulties: ['easy'], count: 7 },
    { title: 'Principles of Bookkeeping Controls — applied', topics: ['pobc'], difficulties: ['medium', 'hard'], count: 7 },
    { title: 'Principles of Costing — foundations', topics: ['poc'], difficulties: ['easy'], count: 7 },
    { title: 'Principles of Costing — applied', topics: ['poc'], difficulties: ['medium', 'hard'], count: 7 },
    { title: 'The Business Environment — foundations', topics: ['besy'], difficulties: ['easy'], count: 7 },
    { title: 'The Business Environment — applied', topics: ['besy'], difficulties: ['medium', 'hard'], count: 6 },
  ];
  const MOCK_LENGTH = MOCK_BLUEPRINT.reduce((s, t) => s + t.count, 0);
  const MOCK_DURATION_MS = 120 * 60 * 1000;
  const MOCK_WARN_MS = 10 * 60 * 1000;
  const MOCK_DANGER_MS = 2 * 60 * 1000;
  const HISTORY_LIMIT = 20;
  const LETTERS = ['A', 'B', 'C', 'D'];

  const reducedMotion = window.matchMedia
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false;
  const prefersDark = () => !!(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);

  /* ── REFERENCE MATERIAL (always-accessible side drawer) ── */
  const REFERENCE = {
    sections: [
      { title: 'Debit & Credit rules', items: [
        'Assets: increase on the Debit side, decrease on the Credit side.',
        'Liabilities: increase on the Credit side, decrease on the Debit side.',
        'Capital: increase on the Credit side, decrease on the Debit side.',
        'Income (revenue): increase on the Credit side.',
        'Expenses: increase on the Debit side.',
        'Mnemonic — DEAD CLIC: Debits = Expenses, Assets, Drawings. Credits = Liabilities, Income, Capital.',
      ]},
      { title: 'Accounting equation', items: [
        'Assets = Capital + Liabilities',
        'Capital = Assets − Liabilities',
        'Closing capital = Opening capital + Capital introduced + Profit − Drawings',
      ]},
      { title: 'VAT (standard rate 20%)', items: [
        'VAT on net = Net × 20%',
        'Gross = Net × 1.20',
        'Net from gross = Gross ÷ 1.20',
        'VAT from gross = Gross ÷ 6',
        'VAT due to HMRC = Output tax − Input tax',
      ]},
      { title: 'Inventory & cost of sales', items: [
        'COGS = Opening inventory + Purchases − Closing inventory',
        'Gross profit = Revenue − COGS',
        'FIFO: oldest items sold first; newest remain in closing inventory',
        'AVCO: weighted-average cost, recalculated after each purchase',
        'LIFO: not permitted under IFRS or UK GAAP',
      ]},
      { title: 'Depreciation', items: [
        'Straight-line = (Cost − Residual) ÷ Useful life',
        'Reducing balance = Carrying value × Rate %',
        'Journal: Dr Depreciation expense, Cr Accumulated depreciation',
      ]},
      { title: 'Accruals & prepayments', items: [
        'Accrual (incurred, not yet paid): Dr Expense, Cr Accruals (liability)',
        'Prepayment (paid in advance): Dr Prepayments (asset), Cr Expense',
        'Apply the matching (accruals) concept to recognise in the correct period',
      ]},
      { title: 'Costing formulas', items: [
        'Prime cost = Direct materials + Direct labour + Direct expenses',
        'Contribution per unit = Selling price − Variable cost',
        'Contribution margin ratio = Contribution ÷ Sales',
        'Break-even (units) = Fixed costs ÷ Contribution per unit',
        'Break-even (£) = Fixed costs ÷ Contribution margin ratio',
        'Margin of safety (units) = Budgeted sales − Break-even sales',
        'Target-profit units = (Fixed costs + Target profit) ÷ Contribution per unit',
        'OAR = Budgeted overheads ÷ Budgeted activity',
        'Over/Under-absorption = Absorbed overheads − Actual overheads',
      ]},
      { title: 'Payroll & NIC (2026/27 rates)', items: [
        'Net pay = Gross pay − PAYE − Employee NIC − Pension − Other deductions',
        "Total employment cost = Gross pay + Employer's NIC + Employer pension",
        "Employer NIC = (Gross pay − £5,000 secondary threshold) × 15%",
        'National Living Wage (21+) from April 2026: £12.71/hr; 18–20: £10.85; 16–17 & apprentice: £8.00',
      ]},
      { title: 'Elasticity', items: [
        'PED = |% change demand ÷ % change price|; >1 elastic, <1 inelastic',
        'IED = % change demand ÷ % change income; >1 luxury, 0–1 normal, <0 inferior',
        'XED = % change demand of A ÷ % change price of B; +ve substitutes, −ve complements',
      ]},
      { title: 'Business structures', items: [
        'Sole trader: unlimited liability, no legal separation',
        'Partnership: unlimited (general) or limited (LLP)',
        'Private limited (Ltd): limited liability, shares NOT to the public',
        'Public limited (PLC): limited liability, shares to the public',
      ]},
      { title: 'Types of error', items: [
        'Omission — transaction missed entirely (TB still balances)',
        'Commission — wrong account, same type (TB balances)',
        'Principle — wrong type of account, e.g. capital vs revenue (TB balances)',
        'Original entry — wrong figure on both sides (TB balances)',
        'Reversal — Dr/Cr swapped (TB balances)',
        'Compensating — two errors cancel out (TB balances)',
        'Single-sided / casting / transposition — TB does NOT balance',
      ]},
      { title: 'Partnership Act 1890 defaults', items: [
        'Profits and losses shared EQUALLY (not by capital ratio)',
        'No partners\' salaries (unless agreement says otherwise)',
        'No interest on capital (unless agreement says otherwise)',
        'No interest on drawings (unless agreement says otherwise)',
        'Interest on loans to the firm: 5% per annum',
        'Appropriation order: salaries → interest on capital → add back interest on drawings → residual in PSR',
        'Goodwill: raise in OLD ratio, write off in NEW ratio — must not remain on SFP',
      ]},
      { title: 'VAT schemes (thresholds 2024)', items: [
        'Standard accounting: VAT on invoice date (default)',
        'Cash accounting: VAT on cash receipt/payment date — threshold ≤ £1.35m',
        'Annual accounting: 1 return/yr, 9 monthly or 3 quarterly payments — threshold ≤ £1.35m',
        'Flat rate: fixed sector % × gross (VAT-inclusive) turnover — threshold ≤ £150,000',
        'Zero-rated (0%): food, books, children\'s clothing — input VAT IS reclaimable',
        'Exempt: financial services, education, insurance — input VAT NOT reclaimable',
        'Box 5 = Box 1 − Box 4. Positive → pay HMRC. Negative → HMRC refunds',
      ]},
      { title: 'Variance formulas (L3 MATS)', items: [
        'Material price = (Standard price − Actual price) × Actual qty purchased',
        'Material usage = (Standard qty for actual output − Actual qty used) × Standard price',
        'Labour rate = (Standard rate − Actual rate) × Actual hours paid',
        'Labour efficiency = (Standard hours for actual output − Actual hours worked) × Standard rate',
        'Adverse (A) = actual cost > standard · Favourable (F) = actual cost < standard',
        'Total material variance = Price + Usage variances',
        'OAR = Budgeted overheads ÷ Budgeted activity',
        'Over-absorption (absorbed > incurred) → credit P&L · Under-absorption → debit P&L',
      ]},
      { title: 'Income tax — sole trader (L3 TPFB)', items: [
        'Taxable profit = Accounting profit + Disallowable expenses − Capital allowances',
        'Always disallowable: depreciation, drawings, private expenses, fines',
        'AIA: 100% first-year on qualifying plant & machinery (limit £1m 2024/25)',
        'WDA main pool: 18% reducing balance · WDA special rate pool: 6%',
        'Personal allowance: £12,570 · Basic rate 20% up to £37,700 · Higher rate 40%',
        'Payments on account: 31 Jan (in year) and 31 Jul (after year) — each 50% of prior year',
        'Balancing payment + Self Assessment return: 31 Jan after year end',
      ]},
      { title: 'ETB column guide (L3 AVBK)', items: [
        'Four column pairs: Trial Balance → Adjustments → P&L → SFP',
        'Accrual: Dr P&L expense / Cr SFP current liability',
        'Prepayment: Cr P&L expense / Dr SFP current asset',
        'Depreciation charge: Dr P&L · Accumulated dep: Cr SFP contra-asset',
        'Profit = P&L balancing debit → same figure credited to SFP equity column',
        'SFP columns balance after transferring profit/loss',
      ]},
    ],
  };

  /* ── UNIT REVISION NOTES ── */
  const UNIT_REVISION = [
    {
      unit: 'itbk', title: 'Introduction to Bookkeeping', icon: '📒',
      sections: [
        { heading: 'DEAD CLIC — the debit/credit rule', items: [
          'Debits increase: Expenses, Assets, Drawings',
          'Credits increase: Liabilities, Income, Capital',
          'Every double-entry transaction: total debits = total credits',
          'A debit entry is always on the LEFT side of a T-account',
        ]},
        { heading: 'Document chain (credit sale)', items: [
          'Purchase order → Delivery note → Invoice → Credit note → Statement → Remittance advice',
          'Sales invoices issued → Sales day book',
          'Credit notes issued → Sales returns day book',
          'Purchase invoices received → Purchases day book',
          'Credit notes received → Purchases returns day book',
          'The journal records non-routine entries (corrections, opening entries)',
        ]},
        { heading: 'VAT calculations (standard rate 20%)', items: [
          'Net → VAT amount: Net × 20%',
          'Net → Gross: Net × 1.20',
          'Gross → Net: Gross ÷ 1.20',
          'VAT from gross (the quick method): Gross ÷ 6',
          'VAT due to HMRC = Output tax − Input tax',
        ]},
        { heading: 'Trial balance', items: [
          'DEBIT balances: Assets, Expenses, Drawings',
          'CREDIT balances: Liabilities, Capital, Revenue/Income',
          'Total debits must equal total credits',
          'Closing inventory: CREDIT in the trial balance, DEBIT in the statement of financial position',
        ]},
      ],
      traps: [
        'VAT from gross = Gross ÷ 6 (not ÷ 1.2 — dividing by 1.2 gives you the net, not the VAT).',
        'Drawings is a DEBIT entry and reduces capital — it is not an expense and does not reduce profit.',
        'Trade discount reduces the invoice price before VAT. Settlement discount only applies if paid within the agreed period.',
        'The journal is a book of prime entry (not a ledger account) — use it for corrections and non-routine items.',
      ],
    },
    {
      unit: 'pobc', title: 'Principles of Bookkeeping Controls', icon: '🔍',
      sections: [
        { heading: 'Payroll calculations', items: [
          'Gross pay = Basic pay + Overtime + Bonus',
          'Net pay = Gross pay − PAYE − Employee NIC − Employee pension − Other deductions',
          "Total employment cost = Gross pay + Employer's NIC + Employer pension contribution",
          "Employer's NIC (2026/27): (Gross pay − £5,000 secondary threshold) × 15%",
        ]},
        { heading: 'Bank reconciliation', items: [
          'Start from BANK STATEMENT balance',
          '+ Deposits in transit (cash book recorded; bank has not yet)',
          '− Outstanding cheques/payments (cash book recorded; bank has not yet)',
          '= Adjusted bank balance — must equal the CASH BOOK balance',
          'Bank errors are corrected in the bank rec (not in the cash book)',
        ]},
        { heading: 'Control accounts', items: [
          'Sales ledger control = total of all individual trade receivable (customer) accounts',
          'Purchases ledger control = total of all individual trade payable (supplier) accounts',
          'Post daily totals from day books to the control account in the general ledger',
          'The control account total must agree with the sum of the subsidiary ledger balances',
        ]},
        { heading: 'Types of bookkeeping error', items: [
          'Omission — transaction not recorded at all (TB still balances)',
          'Commission — correct amount, wrong account, same type (TB balances)',
          'Principle — correct amount, wrong type of account (TB balances)',
          'Original entry — wrong amount on both sides (TB balances)',
          'Reversal — debit and credit swapped (TB balances)',
          'Single-sided / casting / transposition — TB does NOT balance → use suspense account',
        ]},
      ],
      traps: [
        "Employer's NIC is NOT deducted from the employee's pay — it is an additional cost paid by the employer on top of gross pay.",
        'Timing differences (deposits in transit, outstanding cheques) are not errors — they appear in the bank rec, not as corrections.',
        'A suspense account is temporary — it must be fully cleared (reduced to zero) once the error is found and corrected.',
        'Trade receivables = money owed TO the business (debit balance). Trade payables = money owed BY the business (credit balance).',
      ],
    },
    {
      unit: 'poc', title: 'Principles of Costing', icon: '📊',
      sections: [
        { heading: 'Cost classification', items: [
          'Prime cost = Direct materials + Direct labour + Direct expenses',
          'Variable cost: changes in TOTAL as output changes; stays constant per unit',
          'Fixed cost: stays the same in TOTAL; decreases per unit as output rises',
          'Semi-variable (mixed) cost: has a fixed element + a variable element',
          'Production overhead = indirect materials + indirect labour + indirect expenses',
        ]},
        { heading: 'CVP / break-even analysis', items: [
          'Contribution per unit = Selling price − Variable cost per unit',
          'Contribution margin ratio (CMR) = Contribution per unit ÷ Selling price',
          'Break-even (units) = Fixed costs ÷ Contribution per unit',
          'Break-even (£) = Fixed costs ÷ CMR',
          'Margin of safety (units) = Budgeted sales − Break-even units',
          'Target profit (units) = (Fixed costs + Target profit) ÷ Contribution per unit',
        ]},
        { heading: 'Overhead absorption', items: [
          'OAR = Budgeted overheads ÷ Budgeted activity level',
          'Absorbed overhead = OAR × Actual activity',
          'Over-absorption: absorbed > actual overhead incurred (positive for profit)',
          'Under-absorption: absorbed < actual overhead incurred (reduces profit)',
          'Common bases: machine hours, direct labour hours, units produced',
        ]},
        { heading: 'Inventory valuation (FIFO and AVCO)', items: [
          'FIFO: oldest units sold first; closing inventory = most recent purchases',
          'AVCO: recalculate weighted-average cost after every purchase batch',
          'LIFO is NOT permitted under UK GAAP or IFRS',
          'Higher COGS → lower gross profit; lower COGS → higher gross profit',
        ]},
      ],
      traps: [
        'Fixed cost per unit falls as volume rises — the total fixed cost stays the same.',
        'Margin of safety uses BUDGETED sales (not actual): Budgeted sales − Break-even sales.',
        'AVCO must be recalculated after every purchase — not just at the period end.',
        'Over-absorption means too much overhead was charged to products (absorbed > actual) — this is favourable (boosts profit).',
      ],
    },
    {
      unit: 'besy', title: 'The Business Environment', icon: '🌐',
      sections: [
        { heading: 'Business structures', items: [
          'Sole trader: unlimited personal liability; simplest to set up',
          'Partnership: unlimited liability (general) or limited (LLP); shared profit/loss',
          'Private limited (Ltd): limited liability; shares NOT offered to the general public',
          'Public limited company (PLC): limited liability; shares CAN be offered on the Stock Exchange',
          'Not-for-profit / mutual: surplus reinvested for members or community benefit',
        ]},
        { heading: 'Elasticity', items: [
          'PED = |% change in quantity demanded ÷ % change in price|',
          'PED > 1 → elastic: demand sensitive to price; price ↑ → total revenue ↓',
          'PED < 1 → inelastic: demand insensitive to price; price ↑ → total revenue ↑',
          'IED = % change in demand ÷ % change in income; >1 luxury, 0–1 normal, <0 inferior good',
          'XED: positive = substitutes (e.g. butter/margarine); negative = complements (e.g. cars/petrol)',
        ]},
        { heading: 'Employment law essentials', items: [
          'National Living Wage (21+, 2026/27): £12.71 per hour',
          '18–20: £10.85; 16–17 and apprentices: £8.00',
          'Rights from day 1: discrimination protection, NMW entitlement, written terms',
          'Statutory notice and redundancy rights require qualifying service (2 years for redundancy)',
          'PAYE operates through the employer — income tax and NICs deducted at source',
        ]},
        { heading: 'AAT ethics — 5 fundamental principles', items: [
          'Integrity — honest and straightforward in all professional relationships',
          'Objectivity — no bias; do not allow conflicts of interest',
          'Professional competence and due care — maintain skills; act with diligence',
          'Confidentiality — do not disclose information without proper authority',
          'Professional behaviour — comply with laws; avoid discrediting the profession',
          'Raise concerns through appropriate channels — not directly to external parties unless legally required',
        ]},
      ],
      traps: [
        'Elastic demand (PED > 1): increasing price REDUCES total revenue because quantity falls more than price rises.',
        'Ltd vs PLC: the critical difference is whether shares can be offered to the general public — both words include "limited".',
        'AAT members must follow ethical guidance even if instructed otherwise by management or a client.',
        'Sustainability reporting (environmental/social impact) is part of the broader finance function role — it is a professional duty, not just PR.',
      ],
    },

    /* ── Level 3 units ── */
    {
      unit: 'avbk', title: 'Advanced Bookkeeping', icon: '📗',
      sections: [
        { heading: 'Extended Trial Balance', items: [
          'Four column pairs: Trial Balance → Adjustments → P&L → SFP',
          'Accrual: Dr expense (P&L), Cr current liability (SFP)',
          'Prepayment: Cr expense (P&L), Dr current asset (SFP)',
          'Depreciation charge: Dr P&L expense. Accumulated dep: Cr SFP contra-asset',
          'Profit = P&L balancing debit → same figure credited to SFP equity',
        ]},
        { heading: 'Incomplete Records', items: [
          'Capital comparison: Profit = Closing NA − Opening NA + Drawings − Capital introduced',
          'Mark-up on cost vs margin on selling price (25% mark-up = 20% margin)',
          'COGS = Opening inventory + Purchases − Closing inventory',
        ]},
        { heading: 'Asset Disposals', items: [
          '1) Dr Disposal / Cr Asset at cost. 2) Dr Acc. dep. / Cr Disposal. 3) Dr Bank (or new asset for part-ex) / Cr Disposal. 4) Balance = profit or loss to P&L',
          'Part-exchange: trade-in value credited to Disposal (deemed proceeds); debited to new asset account',
        ]},
      ],
      traps: [
        'Accruals/prepayments affect BOTH P&L and SFP — missing the SFP entry is a common slip.',
        'Profit in the ETB P&L columns is a DEBIT (balancing the credit-heavy income side) — students often put it on the wrong side.',
        'In incomplete records: mark-up is on COST, margin is on SELLING PRICE. A 25% mark-up ≠ 25% margin.',
        'Part-exchange: the disposal account still operates normally — the trade-in allowance is the proceeds credit, not cash.',
      ],
    },
    {
      unit: 'faps', title: 'Final Accounts Preparation', icon: '📘',
      sections: [
        { heading: 'Sole Trader Accounts', items: [
          'COGS = Opening inventory + Purchases − Closing inventory',
          'Inventory: lower of cost and NRV. Write down if NRV < cost',
          'Equity: Opening capital + Net profit − Drawings = Closing capital',
          'Non-current assets in SFP at carrying value (cost − accumulated depreciation)',
          'Drawings are NOT a P&L expense — they reduce equity only',
        ]},
        { heading: 'Partnership Appropriation', items: [
          'No agreement → Partnership Act 1890: equal profit share, no salaries, no interest on capital, 5% on loans',
          'Appropriation order: net profit → salaries → interest on capital → add back interest on drawings → residual in PSR',
          'Credits to current account: salary, int. on capital, profit share. Debits: drawings, int. on drawings',
          'Debit current account balance = partner owes firm (shown as SFP asset)',
        ]},
        { heading: 'Goodwill on Change', items: [
          'Raise goodwill: Dr Goodwill / Cr existing partners\' capitals in OLD ratio',
          'Write off: Dr partners\' capitals in NEW ratio / Cr Goodwill',
          'Goodwill must not remain on SFP unless the question says so',
        ]},
      ],
      traps: [
        'PA 1890 default = EQUAL shares, NOT capital ratio — the most common partnership trap.',
        'Partners\' salaries are appropriations, not P&L expenses — they appear after net profit in the appropriation account.',
        'Drawings are never deducted in the P&L or appropriation account — only in the equity/current account section.',
        'Goodwill: raised in OLD ratio, written off in NEW ratio — confusing these wipes out the purpose of the adjustment.',
      ],
    },
    {
      unit: 'mats', title: 'Management Accounting: Costing', icon: '🏭',
      sections: [
        { heading: 'Overhead Absorption', items: [
          'OAR = Budgeted overheads ÷ Budgeted activity (calculated BEFORE the year starts)',
          'Absorbed = OAR × Actual activity',
          'Over-absorbed (absorbed > incurred): credit to P&L. Under-absorbed: debit to P&L',
          'Labour-intensive: labour hour OAR. Automated: machine hour OAR',
        ]},
        { heading: 'Marginal vs Absorption Costing', items: [
          'Absorption: fixed OH in unit cost and inventory value. Marginal: fixed OH = period cost',
          'Inventory rising → absorption profit > marginal profit (OH deferred in stock)',
          'Reconciliation: difference = inventory change × fixed OAR per unit',
        ]},
        { heading: 'Variances', items: [
          'Material price = (SP − AP) × AQ purchased',
          'Material usage = (SQ − AQ used) × SP',
          'Labour rate = (SR − AR) × AH paid',
          'Labour efficiency = (SH for actual output − AH worked) × SR',
          'F = actual cost < standard. A = actual cost > standard',
        ]},
      ],
      traps: [
        'OAR uses BUDGETED not actual overhead — actual is only known at year end.',
        'Material price variance: use AQ PURCHASED (not used). Usage: use SP (not actual). Swapping these is the most common error.',
        'Cheap material → favourable price but often adverse usage (more wastage) — always consider interdependencies.',
        'Absorption profit > marginal profit when inventory RISES. Reverse when inventory falls.',
      ],
    },
    {
      unit: 'tpfb', title: 'Tax Processes for Businesses', icon: '🧾',
      sections: [
        { heading: 'VAT', items: [
          'Registration threshold: £90,000 taxable turnover (2024)',
          'Zero-rated: taxable at 0%, input VAT RECLAIMABLE. Exempt: outside VAT, input VAT NOT reclaimable',
          'Box 5 = Output VAT − Input VAT. Positive → pay HMRC. Negative → HMRC repays',
          'Cash accounting ≤ £1.35m. Annual accounting ≤ £1.35m. Flat rate ≤ £150,000',
          'Flat rate: fixed % × GROSS (VAT-inclusive) turnover',
        ]},
        { heading: 'Income Tax — Taxable Profit', items: [
          'Taxable profit = Accounting profit + Disallowable expenses − Capital allowances',
          'Always add back: depreciation, drawings, private expenses, fines',
          'AIA: 100% first-year on qualifying plant (limit £1m). WDA main pool 18% RB. WDA special rate 6% RB',
        ]},
        { heading: 'Payment Dates', items: [
          'Payments on account: 31 January (in year) and 31 July (after year end) — each = 50% prior year liability',
          'Balancing payment: 31 January after year end',
          'Online Self Assessment return: 31 January after year end',
        ]},
      ],
      traps: [
        'Zero-rated ≠ exempt. Zero-rated = input VAT recoverable. Exempt = not recoverable. The exam tests this constantly.',
        'Depreciation is ALWAYS disallowable — add back every time, even if buried in a scenario.',
        'Flat rate scheme uses GROSS turnover, not net. Students applying the % to net sales lose marks.',
        'Drawings cannot be a tax deduction for a sole trader — they are not a business expense.',
      ],
    },
    {
      unit: 'buaw', title: 'Business Awareness', icon: '🌐',
      sections: [
        { heading: 'Company Law', items: [
          'Ltd: cannot offer shares to public. PLC: can; minimum £50,000 share capital',
          'Company = separate legal entity → limited liability for shareholders',
          'Seven duties under CA 2006. s.172 "promote success" includes employees, community, environment, long term',
          'Director breach → personal liability. Wrongful trading (knew company insolvent, continued) → personal liability',
        ]},
        { heading: 'Corporate Governance', items: [
          'UK Corporate Governance Code: listed PLCs only',
          'NEDs: independent, challenge executives, sit on audit/remuneration committees',
          'Principal-agent problem: managers may not act in shareholders\' interests',
          'CSR: ethical management considering all stakeholders',
        ]},
        { heading: 'Economic Environment', items: [
          'Recession = 2 consecutive quarters of negative GDP growth',
          'Bank of England: monetary policy (base rate, QE), targeting 2% CPI inflation',
          'Government: fiscal policy (tax and spend)',
          'Business cycle: expansion → peak → contraction → trough → recovery',
          "Porter's Five Forces: rivalry, new entrants, substitutes, buyer power, supplier power",
        ]},
      ],
      traps: [
        'Bank of England controls MONETARY policy. The GOVERNMENT controls FISCAL policy. Never swap these.',
        '"Promote the success" (s.172) is not just profit — it explicitly covers employees, community, environment and long-term consequences.',
        'A recession is two consecutive quarters negative GDP — one bad quarter is not a recession.',
        "Porter's Five Forces is an industry analysis tool — not a costing or pricing model.",
      ],
    },
  ];

  /* ── LEVEL 3 BRIDGE — "What's next" preview data ── */
  const L3_BRIDGE = [
    {
      unit: 'AVBK', title: 'Advanced Bookkeeping', icon: '📗',
      buildsOn: ['ITBk'], topicIds: ['itbk'],
      exam: 'Computer-based', time: '2h 30min', tasks: 5, passmark: 70,
      desc: 'Extended trial balance, incomplete records and complex asset transactions in a professional bookkeeping context.',
      entrySkills: ['Double-entry to trial balance', 'Accruals & prepayments', 'Depreciation (SL & reducing balance)', 'Bank reconciliation'],
      topics: ['Extended trial balance', 'Incomplete records', 'Asset disposals & part-exchange', 'Revaluation of assets', 'Accounting adjustments'],
    },
    {
      unit: 'FAPS', title: 'Final Accounts Preparation', icon: '📘',
      buildsOn: ['ITBk', 'POBC'], topicIds: ['itbk', 'pobc'],
      exam: 'Computer-based', time: '2h', tasks: 4, passmark: 70,
      desc: 'Produce financial statements for sole traders and partnerships from an adjusted trial balance.',
      entrySkills: ['Adjusted trial balance', 'SLCA & PLCA control accounts', 'Partnership profit-sharing basics', 'Interpreting account balances'],
      topics: ['Sole trader income statement & SoFP', 'Partnership appropriation account', 'Partner capital & current accounts', 'Incomplete records', 'Interpreting accounts'],
    },
    {
      unit: 'MATS', title: 'Management Accounting: Costing', icon: '📙',
      buildsOn: ['POC'], topicIds: ['poc'],
      exam: 'Computer-based', time: '2h', tasks: 5, passmark: 70,
      desc: 'Standard costing, variance analysis, flexible budgets and performance measurement for management decisions.',
      entrySkills: ['Marginal vs absorption costing', 'Break-even & contribution analysis', 'Cost classification & coding', 'Budget preparation basics'],
      topics: ['Standard cost cards', 'Material, labour & overhead variances', 'Flexible budgets', 'Activity-based costing overview', 'Performance indicators & ratios'],
    },
    {
      unit: 'TPFB', title: 'Tax Processes for Businesses', icon: '📕',
      buildsOn: ['ITBk', 'POBC'], topicIds: ['itbk', 'pobc'],
      exam: 'Computer-based', time: '1h 30min', tasks: 4, passmark: 70,
      desc: 'Complete VAT returns, income tax computations, PAYE and National Insurance in a professional context.',
      entrySkills: ['VAT accounting (standard & cash)', 'Payroll basics & deductions', 'Business structure awareness', 'Record-keeping principles'],
      topics: ['VAT 100 return completion', 'Income tax for sole traders', 'PAYE & NIC calculations', 'Corporation tax overview', 'Making Tax Digital (MTD)'],
    },
    {
      unit: 'BUAW', title: 'Business Awareness', icon: '📓',
      buildsOn: ['BESY'], topicIds: ['besy'],
      exam: 'Computer-based', time: '1h 30min', tasks: 5, passmark: 70,
      desc: 'Business strategy, digital transformation, sources of finance and professional ethics at Level 3.',
      entrySkills: ['Business structures & types', 'AAT Code of Professional Ethics', 'Business law fundamentals', 'Stakeholder concepts'],
      topics: ['PESTLE & SWOT analysis', 'Sources of finance (short & long-term)', 'Digital transformation in accounting', 'Corporate social responsibility', 'Sustainability in business'],
    },
    {
      unit: 'PSYA', title: 'Professional Synoptic Assessment', icon: '🎓',
      buildsOn: ['AVBK', 'FAPS', 'MATS', 'TPFB', 'BUAW'], topicIds: ['itbk', 'pobc', 'poc', 'besy'],
      exam: 'Synoptic', time: '3h', tasks: 6, passmark: 70,
      desc: 'The culminating Level 3 assessment integrating all units in a realistic professional accountancy context.',
      entrySkills: ['All five L3 units completed', 'Strong double-entry foundations', 'Tax, costing & financial reporting', 'Professional ethics in practice'],
      topics: ['Integrated bookkeeping scenarios', 'Ethics & professional judgement', 'Financial statement preparation', 'Payroll & tax compliance tasks', 'Management reporting tasks'],
    },
  ];

  const UNIT_EXAM_WEIGHT = { itbk: 40, pobc: 30, poc: 15, besy: 15 };

  function renderReferencePanel() {
    const panel = document.getElementById('referencePanel');
    if (!panel) return;
    const html = `<div class="ref-inner">
      <div class="ref-header">
        <h3>📘 Reference</h3>
        <button class="ref-close" id="referenceClose" type="button" aria-label="Close reference">✕</button>
      </div>
      <div class="ref-body">
        ${REFERENCE.sections.map(s => `<details class="ref-section" open>
          <summary>${escapeHtml(s.title)}</summary>
          <ul>${s.items.map(it => '<li>' + escapeHtml(it) + '</li>').join('')}</ul>
        </details>`).join('')}
      </div>
    </div>`;
    panel.innerHTML = html;
    panel.classList.toggle('is-open', State.referenceOpen);
    panel.setAttribute('aria-hidden', State.referenceOpen ? 'false' : 'true');
    document.body.classList.toggle('reference-open', State.referenceOpen);
    const closeBtn = document.getElementById('referenceClose');
    if (closeBtn) closeBtn.addEventListener('click', () => { State.referenceOpen = false; Storage.data.settings.refOpen = false; Storage.save(); renderReferencePanel(); updateRefToggleBtn(); });
  }
  function updateRefToggleBtn() {
    const btn = document.getElementById('referenceToggle');
    if (btn) {
      btn.setAttribute('aria-pressed', State.referenceOpen ? 'true' : 'false');
      btn.textContent = State.referenceOpen ? '📕 Hide ref' : '📘 Ref';
    }
  }
  function toggleReference() {
    State.referenceOpen = !State.referenceOpen;
    Storage.data.settings.refOpen = State.referenceOpen;
    Storage.save();
    renderReferencePanel();
    updateRefToggleBtn();
  }

  /* ── STORAGE ── */
  const SR_INTERVALS_MS = [
    24 * 60 * 60 * 1000,        // box 1: 1 day
    3 * 24 * 60 * 60 * 1000,    // box 2: 3 days
    7 * 24 * 60 * 60 * 1000,    // box 3: 7 days
    14 * 24 * 60 * 60 * 1000,   // box 4: 14 days
    30 * 24 * 60 * 60 * 1000,   // box 5: 30 days
  ];
  const SR_MAX_BOX = 5;
  const defaultData = () => ({
    settings: { darkMode: null, soundOn: true, seenSplash: false, refOpen: false, flipMode: false },
    stats: {
      questions: {}, topics: {},
      streak: { current: 0, best: 0, lastCorrectAt: 0 },
    },
    flagged: {},
    confident: {},
    sr: {},
    history: [], session: null,
    learn: { lessons: {}, xp: 0, flashReviews: 0, taDone: {}, unitTests: {}, bestCombo: 0 },
    flash: {},
    mistakes: {},
    planner: { examDate: null, dailyGoalXp: 30 },
    badges: {},
    daily: {},
  });
  const todayKey = () => new Date().toISOString().slice(0, 10);
  const Storage = {
    data: defaultData(),
    load() {
      try {
        const raw = localStorage.getItem(getStorageKey());
        if (!raw) return;
        const parsed = JSON.parse(raw);
        const d = defaultData();
        this.data = Object.assign(d, parsed);
        this.data.settings = Object.assign(d.settings, this.data.settings || {});
        this.data.stats = Object.assign(d.stats, this.data.stats || {});
        this.data.stats.questions = this.data.stats.questions || {};
        this.data.stats.topics = this.data.stats.topics || {};
        this.data.stats.streak = Object.assign({ current: 0, best: 0, lastCorrectAt: 0 }, this.data.stats.streak || {});
        this.data.flagged = (this.data.flagged && typeof this.data.flagged === 'object') ? this.data.flagged : {};
        this.data.sr = (this.data.sr && typeof this.data.sr === 'object') ? this.data.sr : {};
        this.data.history = Array.isArray(this.data.history) ? this.data.history : [];
        this.data.learn = Object.assign(d.learn, (this.data.learn && typeof this.data.learn === 'object') ? this.data.learn : {});
        this.data.learn.lessons = this.data.learn.lessons || {};
        this.data.learn.taDone = this.data.learn.taDone || {};
        this.data.learn.unitTests = this.data.learn.unitTests || {};
        this.data.learn.bestCombo = this.data.learn.bestCombo || 0;
        this.data.flash = (this.data.flash && typeof this.data.flash === 'object') ? this.data.flash : {};
        this.data.mistakes = (this.data.mistakes && typeof this.data.mistakes === 'object') ? this.data.mistakes : {};
        this.data.planner = Object.assign(d.planner, this.data.planner || {});
        this.data.badges = (this.data.badges && typeof this.data.badges === 'object') ? this.data.badges : {};
        this.data.daily = (this.data.daily && typeof this.data.daily === 'object') ? this.data.daily : {};
        // Keep only the most recent 60 days of daily activity
        const dayKeys = Object.keys(this.data.daily).sort();
        while (dayKeys.length > 60) delete this.data.daily[dayKeys.shift()];
      } catch (e) { this.data = defaultData(); }
    },
    save() { try { localStorage.setItem(getStorageKey(), JSON.stringify(this.data)); } catch (e) {} },
    recordAnswer(question, correct) {
      const qs = this.data.stats.questions[question.id] || { attempts: 0, correct: 0, lastSeen: null };
      qs.attempts++; qs.seen = true;
      if (correct) qs.correct++;
      else qs.lastWrong = Date.now();
      qs.lastSeen = Date.now();
      this.data.stats.questions[question.id] = qs;
      const ts = this.data.stats.topics[question.topic] || { attempts: 0, correct: 0 };
      ts.attempts++; if (correct) ts.correct++;
      this.data.stats.topics[question.topic] = ts;
      const st = this.data.stats.streak;
      if (correct) { st.current++; if (st.current > st.best) st.best = st.current; st.lastCorrectAt = Date.now(); }
      else { st.current = 0; }
      // Spaced-repetition Leitner update
      const sr = this.data.sr[question.id] || { box: 0, dueAt: 0 };
      if (correct) sr.box = Math.min(SR_MAX_BOX, sr.box + 1);
      else sr.box = 1;
      sr.dueAt = Date.now() + SR_INTERVALS_MS[sr.box - 1];
      sr.lastResult = !!correct;
      this.data.sr[question.id] = sr;
      // Mistake notebook: log wrong answers; redeem on a later correct answer
      if (!correct) {
        const m = this.data.mistakes[question.id] || { count: 0 };
        m.count++; m.lastAt = Date.now(); m.cleared = false;
        this.data.mistakes[question.id] = m;
      } else if (this.data.mistakes[question.id] && !this.data.mistakes[question.id].cleared) {
        this.data.mistakes[question.id].cleared = true;
        this.data.mistakes[question.id].clearedAt = Date.now();
      }
      // XP + daily activity
      this.day().answered++;
      if (correct) this.addXp(2);
    },
    day() {
      const k = todayKey();
      if (!this.data.daily[k]) this.data.daily[k] = { xp: 0, answered: 0 };
      return this.data.daily[k];
    },
    addXp(n) {
      if (!n) return;
      const prevLevel = Math.floor(this.data.learn.xp / 100) + 1;
      this.data.learn.xp += n;
      this.day().xp += n;
      const newLevel = Math.floor(this.data.learn.xp / 100) + 1;
      if (newLevel > prevLevel) {
        setTimeout(() => showLevelUp(newLevel), 400);
      }
    },
    studyDayStreak() {
      let streak = 0;
      const d = new Date();
      for (;;) {
        const k = d.toISOString().slice(0, 10);
        const rec = this.data.daily[k];
        if (rec && (rec.xp > 0 || rec.answered > 0)) { streak++; d.setDate(d.getDate() - 1); }
        else if (streak === 0 && k === todayKey()) { d.setDate(d.getDate() - 1); } // today not studied yet — look at yesterday
        else break;
        if (streak > 366) break;
      }
      return streak;
    },
    activeMistakeIds() {
      return Object.keys(this.data.mistakes).filter(id => !this.data.mistakes[id].cleared);
    },
    clearedMistakeCount() {
      return Object.keys(this.data.mistakes).filter(id => this.data.mistakes[id].cleared).length;
    },
    lessonRec(id) { return this.data.learn.lessons[id] || null; },
    completeLesson(id, stars, pct) {
      const existing = this.data.learn.lessons[id];
      const r = existing || { firstAt: Date.now(), best: 0, stars: 0 };
      if (pct > r.best) r.best = pct;
      if (stars > r.stars) r.stars = stars;
      r.lastAt = Date.now();
      this.data.learn.lessons[id] = r;
      this.addXp(existing ? 10 : 20);
      return !existing;
    },
    flashDueTerms() {
      const now = Date.now();
      return (window.GLOSSARY || []).filter(g => {
        const r = this.data.flash[g.term];
        return r && r.dueAt <= now;
      }).map(g => g.term);
    },
    flashNewTerms(limit) {
      return (window.GLOSSARY || []).filter(g => !this.data.flash[g.term]).slice(0, Math.max(0, limit)).map(g => g.term);
    },
    gradeFlash(term, ok) {
      const r = this.data.flash[term] || { box: 0 };
      r.box = ok ? Math.min(SR_MAX_BOX, r.box + 1) : 1;
      r.dueAt = Date.now() + SR_INTERVALS_MS[r.box - 1];
      this.data.flash[term] = r;
      this.data.learn.flashReviews++;
      this.addXp(1);
    },
    srDueIds() {
      const now = Date.now();
      return Object.keys(this.data.sr).filter(id => {
        const r = this.data.sr[id];
        return r && r.box >= 1 && r.dueAt <= now;
      });
    },
    recordResult(result) {
      this.data.history.unshift(result);
      if (this.data.history.length > HISTORY_LIMIT) this.data.history.length = HISTORY_LIMIT;
    },
    toggleFlag(id) {
      if (!id) return;
      if (this.data.flagged[id]) delete this.data.flagged[id];
      else this.data.flagged[id] = Date.now();
      this.save();
    },
    isFlagged(id) { return !!this.data.flagged[id]; },
    flaggedIds() { return Object.keys(this.data.flagged); },
    toggleConfident(id) {
      if (!id) return;
      if (!this.data.confident) this.data.confident = {};
      if (this.data.confident[id]) delete this.data.confident[id];
      else this.data.confident[id] = Date.now();
      this.save();
    },
    isConfident(id) { return !!(this.data.confident && this.data.confident[id]); },
    confidentIds() { return Object.keys(this.data.confident || {}); },
    isDarkActive() {
      const s = this.data.settings.darkMode;
      return s == null ? prefersDark() : !!s;
    },
    clearAll() { try { localStorage.removeItem(getStorageKey()); } catch (e) {} this.data = defaultData(); },
  };

  /* ── SKILLS ── */
  function ensureSkillTags() {
    if (!window.SKILLS || typeof window.SKILLS.tag !== 'function') return;
    for (const q of window.ALL_QUESTIONS) {
      if (!q.skill) q.skill = window.SKILLS.tag(q);
    }
  }
  function skillById(id) { return (window.SKILLS && typeof window.SKILLS.byId === 'function' && id) ? window.SKILLS.byId(id) : null; }
  function skillAccuracy() {
    // Per-skill lifetime accuracy from the question-level stats
    const out = {};
    for (const [id, s] of Object.entries(Storage.data.stats.questions)) {
      const q = questionById(id);
      if (!q || !q.skill) continue;
      const rec = out[q.skill] || (out[q.skill] = { attempts: 0, correct: 0 });
      rec.attempts += s.attempts; rec.correct += s.correct;
    }
    return out;
  }
  function lessonForSkill(skillId) {
    if (!window.LEARN_PATH) return null;
    for (const unit of window.LEARN_PATH) {
      for (const L of unit.lessons) {
        if (L.skills && L.skills.indexOf(skillId) !== -1) return L;
      }
    }
    return null;
  }
  function allLessons() {
    if (!window.LEARN_PATH) return [];
    return window.LEARN_PATH.reduce((acc, u) => acc.concat(u.lessons), []);
  }
  function findLesson(id) {
    for (const unit of (window.LEARN_PATH || [])) {
      const L = unit.lessons.find(x => x.id === id);
      if (L) return { unit, lesson: L };
    }
    return null;
  }
  function isLessonDone(id) {
    const r = Storage.lessonRec(id);
    return !!(r && r.best >= 50);
  }
  function setLabel(topicId) {
    if (topicId === 'all') return 'Mixed';
    if (topicId === 'smart') return 'Smart practice';
    if (topicId === 'mistakes') return 'Mistakes';
    if (topicId === 'flagged') return 'Flagged';
    if (topicId === 'review-wrong') return 'Weak spots';
    if (topicId === 'sr-due') return 'Review due';
    if (topicId && topicId.indexOf('skill:') === 0) {
      const s = skillById(topicId.slice(6));
      return s ? s.name : 'Skill drill';
    }
    const t = window.TOPICS.find(x => x.id === topicId);
    return t ? t.short : (topicId || '');
  }

  /* ── BADGES ── */
  const BADGES = [
    { id: 'first-lesson', icon: '🐣', name: 'First steps', desc: 'Complete your first lesson', hint: 'Complete 1 lesson' },
    { id: 'ten-lessons', icon: '📚', name: 'Bookworm', desc: 'Complete 10 lessons', hint: 'Complete 10 lessons' },
    { id: 'path-complete', icon: '🗺️', name: 'Trailblazer', desc: 'Complete the whole journey', hint: 'Complete all lessons' },
    { id: 'hundred-q', icon: '💯', name: 'Century', desc: 'Answer 100 questions', hint: '100 questions answered' },
    { id: 'questions-250', icon: '🔢', name: 'Grinder', desc: 'Answer 250 questions', hint: '250 questions answered' },
    { id: 'streak-15', icon: '🎯', name: 'Sharpshooter', desc: 'Get 15 answers right in a row', hint: '15-question correct streak' },
    { id: 'mock-pass', icon: '🏅', name: 'Exam ready', desc: 'Pass a mock exam (70%+)', hint: 'Pass a mock exam' },
    { id: 'mock-90', icon: '🌟', name: 'Distinction', desc: 'Score 90%+ on a mock exam', hint: '90%+ on a mock exam' },
    { id: 'perfect-lesson', icon: '💎', name: 'Flawless', desc: 'Score 100% on a lesson quiz', hint: '100% on any lesson check' },
    { id: 'three-star-five', icon: '⭐', name: 'Star collector', desc: 'Earn 3 stars on 5 lessons', hint: '3-star 5 lessons' },
    { id: 'mistakes-10', icon: '🔁', name: 'Comeback', desc: 'Clear 10 mistakes from your notebook', hint: 'Clear 10 mistakes' },
    { id: 'flash-50', icon: '🃏', name: 'Card shark', desc: 'Review 50 flashcards', hint: 'Review 50 flashcards' },
    { id: 'days-7', icon: '🔥', name: '7-day habit', desc: 'Study on 7 days in a row', hint: '7-day study streak' },
    { id: 'xp-500', icon: '⚡', name: 'Power learner', desc: 'Earn 500 XP', hint: '500 XP earned' },
    { id: 'xp-1000', icon: '⚡⚡', name: 'XP champion', desc: 'Earn 1,000 XP', hint: '1,000 XP earned' },
    { id: 'ta-all', icon: '🧰', name: 'Ledger legend', desc: 'Finish every guided T-account exercise', hint: 'All T-account exercises done' },
    { id: 'daily-7', icon: '📅', name: '7-day challenger', desc: 'Complete 7 daily challenges', hint: '7 daily challenges' },
    { id: 'unit-complete', icon: '🏆', name: 'Unit master', desc: 'Pass all 4 unit quizzes', hint: 'All 4 unit quizzes passed' },
    { id: 'combo-5', icon: '🔥', name: 'On fire', desc: 'Get 5 answers correct in a row in one practice session', hint: '5-answer combo in practice' },
    { id: 'perfect-practice', icon: '🎖️', name: 'Perfection', desc: 'Score 100% on a practice session of 10+ questions', hint: '100% on 10+ question session' },
    { id: 'unit-itbk', icon: '🧮', name: 'ITBK Master', desc: 'Complete all Introduction to Bookkeeping lessons', hint: 'All ITBK lessons done' },
    { id: 'unit-pobc', icon: '📊', name: 'POBC Master', desc: 'Complete all Principles of Bookkeeping lessons', hint: 'All POBC lessons done' },
    { id: 'unit-poc', icon: '💸', name: 'POC Master', desc: 'Complete all Principles of Costing lessons', hint: 'All POC lessons done' },
    { id: 'unit-besy', icon: '🏢', name: 'BESY Master', desc: 'Complete all Business Environment lessons', hint: 'All BESY lessons done' },
    { id: 'all-units', icon: '👑', name: 'Grand Master', desc: 'Complete every lesson in every unit', hint: 'All 56 lessons done' },
  ];
  function badgeEarnedTest(id) {
    const d = Storage.data;
    const lessonsDone = Object.keys(d.learn.lessons).length;
    switch (id) {
      case 'first-lesson': return lessonsDone >= 1;
      case 'ten-lessons': return lessonsDone >= 10;
      case 'path-complete': {
        const all = allLessons();
        return all.length > 0 && all.every(L => isLessonDone(L.id));
      }
      case 'hundred-q': return Object.values(d.stats.questions).reduce((s, q) => s + q.attempts, 0) >= 100;
      case 'questions-250': return Object.values(d.stats.questions).reduce((s, q) => s + q.attempts, 0) >= 250;
      case 'streak-15': return (d.stats.streak && d.stats.streak.best >= 15);
      case 'mock-pass': return d.history.some(h => h.mode === 'mock' && h.pct >= PASS_MARK);
      case 'mock-90': return d.history.some(h => h.mode === 'mock' && h.pct >= 90);
      case 'mistakes-10': return Storage.clearedMistakeCount() >= 10;
      case 'flash-50': return d.learn.flashReviews >= 50;
      case 'days-7': return Storage.studyDayStreak() >= 7;
      case 'xp-500': return d.learn.xp >= 500;
      case 'xp-1000': return d.learn.xp >= 1000;
      case 'perfect-lesson': return Object.values(d.learn.lessons).some(r => r.best >= 100);
      case 'three-star-five': return Object.values(d.learn.lessons).filter(r => r.stars >= 3).length >= 5;
      case 'combo-5': return !!(d.learn.bestCombo && d.learn.bestCombo >= 5);
      case 'perfect-practice': return d.history.some(h => h.mode === 'practice' && h.total >= 10 && h.pct === 100);
      case 'ta-all': return TA_EXERCISES.every(ex => d.learn.taDone[ex.id]);
      case 'daily-7': return Object.values(d.daily).filter(day => day.challenge && day.challenge.done).length >= 7;
      case 'unit-complete': {
        const ut = d.learn.unitTests || {};
        return window.LEARN_PATH && window.LEARN_PATH.length > 0 && window.LEARN_PATH.every(u => ut[u.unit] && ut[u.unit].passed);
      }
      case 'unit-itbk': return !!((window.LEARN_PATH||[]).find(u=>u.unit==='itbk')?.lessons.every(l=>isLessonDone(l.id)));
      case 'unit-pobc': return !!((window.LEARN_PATH||[]).find(u=>u.unit==='pobc')?.lessons.every(l=>isLessonDone(l.id)));
      case 'unit-poc':  return !!((window.LEARN_PATH||[]).find(u=>u.unit==='poc')?.lessons.every(l=>isLessonDone(l.id)));
      case 'unit-besy': return !!((window.LEARN_PATH||[]).find(u=>u.unit==='besy')?.lessons.every(l=>isLessonDone(l.id)));
      case 'all-units': {
        const all = allLessons();
        return all.length > 0 && all.every(L => isLessonDone(L.id));
      }
    }
    return false;
  }
  function checkBadges() {
    const earned = [];
    for (const b of BADGES) {
      if (Storage.data.badges[b.id]) continue;
      if (badgeEarnedTest(b.id)) { Storage.data.badges[b.id] = Date.now(); earned.push(b); }
    }
    if (earned.length) {
      Storage.save();
      const names = earned.map(b => b.icon + ' ' + b.name).join(' · ');
      showToast('🏅 Badge earned: ' + names, 'success');
    }
    return earned;
  }

  function badgeProgress(id) {
    const d = Storage.data;
    const totalAttempts = () => Object.values(d.stats.questions).reduce((s, q) => s + q.attempts, 0);
    const lessonsDone = Object.keys(d.learn.lessons).length;
    switch (id) {
      case 'first-lesson':  return { cur: Math.min(1, lessonsDone), max: 1 };
      case 'ten-lessons':   return { cur: Math.min(10, lessonsDone), max: 10 };
      case 'path-complete': { const all = allLessons(); return { cur: all.filter(L => isLessonDone(L.id)).length, max: all.length }; }
      case 'hundred-q':     return { cur: Math.min(100, totalAttempts()), max: 100 };
      case 'questions-250': return { cur: Math.min(250, totalAttempts()), max: 250 };
      case 'streak-15':     return { cur: Math.min(15, (d.stats.streak && d.stats.streak.best) || 0), max: 15 };
      case 'mock-pass':     return { cur: d.history.some(h => h.mode === 'mock' && h.pct >= PASS_MARK) ? 1 : 0, max: 1 };
      case 'mock-90':       return { cur: d.history.some(h => h.mode === 'mock' && h.pct >= 90) ? 1 : 0, max: 1 };
      case 'perfect-lesson':return { cur: Object.values(d.learn.lessons).some(r => r.best >= 100) ? 1 : 0, max: 1 };
      case 'three-star-five':return { cur: Math.min(5, Object.values(d.learn.lessons).filter(r => r.stars >= 3).length), max: 5 };
      case 'mistakes-10':   return { cur: Math.min(10, Storage.clearedMistakeCount()), max: 10 };
      case 'flash-50':      return { cur: Math.min(50, d.learn.flashReviews), max: 50 };
      case 'days-7':        return { cur: Math.min(7, Storage.studyDayStreak()), max: 7 };
      case 'xp-500':        return { cur: Math.min(500, d.learn.xp), max: 500 };
      case 'xp-1000':       return { cur: Math.min(1000, d.learn.xp), max: 1000 };
      case 'ta-all':        return { cur: TA_EXERCISES.filter(ex => d.learn.taDone[ex.id]).length, max: TA_EXERCISES.length };
      case 'daily-7':       return { cur: Math.min(7, Object.values(d.daily).filter(day => day.challenge && day.challenge.done).length), max: 7 };
      case 'unit-complete': { const ut = d.learn.unitTests || {}; return { cur: (window.LEARN_PATH || []).filter(u => ut[u.unit] && ut[u.unit].passed).length, max: (window.LEARN_PATH || []).length || 4 }; }
      case 'combo-5':       return { cur: Math.min(5, d.learn.bestCombo || 0), max: 5 };
      case 'perfect-practice': return { cur: d.history.some(h => h.mode === 'practice' && h.total >= 10 && h.pct === 100) ? 1 : 0, max: 1 };
      case 'unit-itbk': { const u = (window.LEARN_PATH||[]).find(u=>u.unit==='itbk'); return u ? { cur: u.lessons.filter(l=>isLessonDone(l.id)).length, max: u.lessons.length } : { cur: 0, max: 14 }; }
      case 'unit-pobc': { const u = (window.LEARN_PATH||[]).find(u=>u.unit==='pobc'); return u ? { cur: u.lessons.filter(l=>isLessonDone(l.id)).length, max: u.lessons.length } : { cur: 0, max: 14 }; }
      case 'unit-poc':  { const u = (window.LEARN_PATH||[]).find(u=>u.unit==='poc');  return u ? { cur: u.lessons.filter(l=>isLessonDone(l.id)).length, max: u.lessons.length } : { cur: 0, max: 14 }; }
      case 'unit-besy': { const u = (window.LEARN_PATH||[]).find(u=>u.unit==='besy'); return u ? { cur: u.lessons.filter(l=>isLessonDone(l.id)).length, max: u.lessons.length } : { cur: 0, max: 14 }; }
      case 'all-units': { const all = allLessons(); return { cur: all.filter(L => isLessonDone(L.id)).length, max: all.length }; }
      default: return { cur: 0, max: 1 };
    }
  }

  function showLevelUp(level) {
    const el = document.createElement('div');
    el.className = 'level-up-banner';
    el.innerHTML = `<div class="level-up-inner"><span class="level-up-icon">⚡</span><div><div class="level-up-title">Level Up!</div><div class="level-up-sub">You reached Level ${level}</div></div><span class="level-up-icon">⚡</span></div>`;
    document.body.appendChild(el);
    setTimeout(() => el.classList.add('level-up-show'), 20);
    setTimeout(() => { el.classList.remove('level-up-show'); setTimeout(() => el.remove(), 500); }, 2500);
    if (!reducedMotion) confetti();
  }

  /* ── COMBO SYSTEM ── */
  function updateCombo(correct) {
    if (State.mode !== 'practice') return;
    if (correct) {
      State.combo++;
      if (State.combo > (Storage.data.learn.bestCombo || 0)) {
        Storage.data.learn.bestCombo = State.combo;
      }
      if (State.combo >= 3) {
        Storage.addXp(1); // bonus XP per answer while on combo
        if (State.combo === 3) showToast('🔥 3-answer combo! +1 bonus XP per correct answer', 'success');
        if (State.combo === 5) showToast('🔥🔥 5-answer combo! You\'re on fire!', 'success');
        if (State.combo === 10) showToast('🔥🔥🔥 10-answer combo! Unstoppable!', 'success');
      }
    } else {
      if (State.combo >= 3) showToast(`Combo broken at ${State.combo}. Keep going!`, 'info');
      State.combo = 0;
    }
  }

  /* ── UNIT QUIZ ── */
  function buildWeightedUnitQuiz(unitId) {
    // French units use CEFR levels (fr-a1/fr-a2/fr-b1); non-French use topic field matching unitId.
    const frCefrMap = { 'fr-a1': 'A1', 'fr-a2': 'A2', 'fr-b1': 'B1' };
    const pool = (_activeSubjectId === 'french' && frCefrMap[unitId])
      ? (window.ALL_QUESTIONS || []).filter(q => frQuestionLevel(q.id) === frCefrMap[unitId])
      : (window.ALL_QUESTIONS || []).filter(q => q.topic === unitId);
    // Draw from the full pool — no difficulty bucketing or confidence filtering.
    return applyFlipMode(shuffle(pool).slice(0, 40).map(presentQuestion));
  }
  function startUnitQuiz(unitId) {
    if (!Storage.data.learn.unitTests) Storage.data.learn.unitTests = {};
    State.unitQuizId = unitId;
    const picked = buildWeightedUnitQuiz(unitId);
    if (!picked.length) { showToast('No questions available for this unit.', 'warn'); return; }
    playClick();
    Object.assign(State, {
      screen: 'quiz', mode: 'practice', selectedTopic: unitId, questions: picked,
      current: 0, answered: null, answers: [], score: 0, results: [],
      showReview: false, reviewFilter: 'all', timedOut: false, numericDraft: '',
      ddSelectedLeft: null, ddMap: {}, tfDraft: {}, scDraft: {}, gfDraft: {}, woDraft: [],
      hintLevel: 0, hintElim: null, combo: 0, unitQuizPassMark: UNIT_QUIZ_PASS_MARK,
    });
    Calc.reset(); render();
  }

  /* ── UNIT REVISION NOTES ── */
  function startRevision(unitId) {
    const rev = UNIT_REVISION.find(r => r.unit === unitId);
    if (!rev) { showToast('Revision notes not available.', 'warn'); return; }
    playClick();
    State.screen = 'revision';
    State.revisionUnit = unitId;
    render();
  }

  /* ── TTS (French pronunciation via Web Speech API) ── */
  let _frVoice = null;
  function getFrenchVoice() {
    if (_frVoice) return _frVoice;
    const voices = (window.speechSynthesis && window.speechSynthesis.getVoices) ? window.speechSynthesis.getVoices() : [];
    _frVoice = voices.find(v => v.lang === 'fr-FR') || voices.find(v => v.lang.startsWith('fr')) || null;
    return _frVoice;
  }
  function speakFrench(text, onPlay, onDone) {
    if (!window.speechSynthesis || !text) return;
    window.speechSynthesis.cancel();
    const utt = new SpeechSynthesisUtterance(text);
    utt.lang = 'fr-FR';
    utt.rate = 0.85;
    const voice = getFrenchVoice();
    if (voice) utt.voice = voice;
    if (onPlay) onPlay();
    const finish = () => { if (onDone) onDone(); };
    utt.onend = finish;
    utt.onerror = finish;
    window.speechSynthesis.speak(utt);
  }
  function stopSpeech() { if (window.speechSynthesis) window.speechSynthesis.cancel(); }
  if (typeof window !== 'undefined' && window.speechSynthesis && 'onvoiceschanged' in window.speechSynthesis) {
    window.speechSynthesis.onvoiceschanged = () => { _frVoice = null; };
  }

  /* ── AUDIO ── */
  let audioCtx = null;
  function ensureAudio() {
    if (!Storage.data.settings.soundOn) return null;
    if (!audioCtx) { try { const C = window.AudioContext || window.webkitAudioContext; if (C) audioCtx = new C(); } catch (e) { audioCtx = null; } }
    if (audioCtx && audioCtx.state === 'suspended') { try { audioCtx.resume(); } catch (e) {} }
    return audioCtx;
  }
  function playTone(freq, type, dur, vol = 0.3) {
    const ctx = ensureAudio(); if (!ctx) return;
    try {
      const o = ctx.createOscillator(), g = ctx.createGain();
      o.connect(g); g.connect(ctx.destination);
      o.type = type; o.frequency.value = freq;
      g.gain.setValueAtTime(vol, ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur);
      o.start(); o.stop(ctx.currentTime + dur);
    } catch (e) {}
  }
  const playCorrect = () => { playTone(523,'sine',0.12); setTimeout(()=>playTone(659,'sine',0.15),100); setTimeout(()=>playTone(784,'sine',0.20),200); };
  const playWrong = () => playTone(220, 'square', 0.30, 0.20);
  const playClick = () => playTone(440, 'sine', 0.07, 0.15);

  function confetti() {
    if (reducedMotion) return;
    const cols = ['#3b62e3','#16a34a','#d97706','#dc2626','#805ad5','#5b81f5'];
    const frag = document.createDocumentFragment(), pieces = [];
    for (let i=0; i<60; i++) {
      const el = document.createElement('div');
      el.className = 'confetti-piece';
      el.style.cssText = `left:${Math.random()*100}vw;top:-20px;background:${cols[Math.floor(Math.random()*cols.length)]};transform:rotate(${Math.random()*360}deg);animation-delay:${Math.random()*0.8}s;animation-duration:${2+Math.random()}s;width:${6+Math.random()*8}px;height:${6+Math.random()*8}px;`;
      frag.appendChild(el); pieces.push(el);
    }
    document.body.appendChild(frag);
    setTimeout(() => pieces.forEach(p => p.remove()), 3500);
  }

  /* ── HELPERS ── */
  function shuffle(arr) {
    const a = arr.slice();
    for (let i=a.length-1; i>0; i--) { const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; }
    return a;
  }
  function formatMMSS(ms) {
    const total = Math.max(0, Math.floor(ms/1000));
    return `${String(Math.floor(total/60)).padStart(2,'0')}:${String(total%60).padStart(2,'0')}`;
  }
  function scoreClass(pct) { return pct >= 70 ? 'great' : pct >= 50 ? 'ok' : 'low'; }
  function escapeHtml(s) {
    if (s == null) return '';
    return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  }

  let QUESTION_INDEX = null;
  function questionById(id) {
    if (!QUESTION_INDEX) { QUESTION_INDEX = Object.create(null); for (const q of window.ALL_QUESTIONS) QUESTION_INDEX[q.id] = q; }
    return QUESTION_INDEX[id];
  }
  function getGlobalProgress() {
    const stats = Storage.data.stats.questions, total = window.ALL_QUESTIONS.length;
    const seen = Object.keys(stats).length;
    const correct = Object.values(stats).filter(q => q.correct > 0).length;
    return { total, seen, correct,
      seenPct: total ? Math.round((seen/total)*100) : 0,
      masteryPct: total ? Math.round((correct/total)*100) : 0 };
  }

  function getWeakTopics() {
    const stats = Storage.data.stats.topics;
    return (window.TOPICS || [])
      .map(t => {
        const s = stats[t.id] || { attempts: 0, correct: 0 };
        const acc = s.attempts >= 5 ? Math.round(s.correct / s.attempts * 100) : null;
        return { id: t.id, name: t.name, short: t.short, icon: t.icon, acc, attempts: s.attempts };
      })
      .filter(t => t.acc !== null)
      .sort((a, b) => a.acc - b.acc);
  }

  function isNumeric(q) { return q && q.type === 'numeric'; }
  function isDragDrop(q) { return q && q.type === 'dragdrop'; }
  function isTableFill(q) { return q && q.type === 'tablefill'; }
  function isScenario(q) { return q && q.type === 'scenario'; }
  function isGapFill(q) { return q && q.type === 'gapfill'; }
  function isWordOrder(q) { return q && q.type === 'wordorder'; }
  function isListen(q) { return q && q.type === 'listen'; }
  function isSimpleMcq(q) { return q && (!q.type || q.type === 'mcq'); }

  // Flip mode helpers (French only): detect FR→EN MCQ and reverse direction
  function isFrToEnMcq(q) {
    if (!q || q.type !== 'mcq') return false;
    return /^(what does\s+"[^"]+"|"[^"]+"\s+(means?\??|is\??))/i.test(q.q.trim());
  }
  function extractFrenchTerm(q) {
    const m = q.q.match(/"([^"]+)"/);
    return m ? m[1] : null;
  }
  function applyFlipMode(questions) {
    if (!Storage.data.settings.flipMode || _activeSubjectId !== 'french') return questions;
    const distPool = {};
    (window.ALL_QUESTIONS || []).forEach(orig => {
      if (!isFrToEnMcq(orig)) return;
      const term = extractFrenchTerm(orig);
      if (!term) return;
      if (!distPool[orig.topic]) distPool[orig.topic] = [];
      if (!distPool[orig.topic].includes(term)) distPool[orig.topic].push(term);
    });
    const allTerms = Object.values(distPool).flat();
    return questions.map(q => {
      if (!isFrToEnMcq(q)) return q;
      const frTerm = extractFrenchTerm(q);
      if (!frTerm) return q;
      const englishMeaning = q.opts[q.ans];
      const topicTerms = (distPool[q.topic] || []).filter(t => t !== frTerm);
      const fallbackTerms = allTerms.filter(t => t !== frTerm && !topicTerms.includes(t));
      const combined = [...topicTerms, ...fallbackTerms];
      if (combined.length < 3) return q;
      const distractors = shuffle(combined.slice()).slice(0, 3);
      const opts = shuffle([frTerm, ...distractors]);
      return { ...q, q: `How do you say "${englishMeaning}" in French?`, opts, ans: opts.indexOf(frTerm), _flipped: true };
    });
  }
  function presentQuestion(q) {
    if (isNumeric(q)) {
      if (typeof q.generate === 'function') {
        try {
          const gen = q.generate();
          if (gen && typeof gen === 'object' && Number.isFinite(gen.answer)) return { ...q, ...gen };
        } catch (e) { /* fall through to static */ }
      }
      return { ...q };
    }
    if (isDragDrop(q)) {
      const shuffledRights = shuffle(q.pairs.map((_, i) => i));
      return { ...q, shuffledRights };
    }
    if (isTableFill(q)) {
      return { ...q };
    }
    if (isScenario(q)) {
      return { ...q, parts: (q.parts || []).map(presentQuestion) };
    }
    if (isGapFill(q)) {
      return { ...q, gaps: q.gaps.map(g => {
        const order = shuffle(g.options.map((_, i) => i));
        return { options: order.map(i => g.options[i]), answer: order.indexOf(g.answer) };
      }) };
    }
    // simple MCQ
    const order = shuffle([0,1,2,3]);
    return { ...q, opts: order.map(i => q.opts[i]), ans: order.indexOf(q.ans) };
  }
  function parseNumericInput(s) {
    if (s == null) return NaN;
    const c = String(s).replace(/[£$€,\s%]/g,'').trim();
    if (c === '' || c === '-' || c === '.') return NaN;
    const v = Number(c);
    return Number.isFinite(v) ? v : NaN;
  }
  function isNumericCorrect(q, value) {
    if (!Number.isFinite(value)) return false;
    const tol = q.tolerance != null ? q.tolerance : 0.01;
    return Math.abs(value - q.answer) <= tol;
  }
  function formatNumericValue(q, value) {
    if (!Number.isFinite(value)) return '— not answered —';
    const isInt = Math.abs(value - Math.round(value)) < 1e-9;
    const n = isInt ? Math.round(value).toLocaleString('en-GB')
                    : value.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 4 });
    if (!q.unit) return n;
    if (q.unit === '%') return n + '%';
    if (value < 0) return '-' + q.unit + n.replace(/^-/, '');
    return q.unit + n;
  }

  /* ── CALCULATOR ── */
  const Calc = {
    display: '0', prev: null, pending: null, justEvaled: false, errored: false, memory: 0,
    reset() { this.display='0'; this.prev=null; this.pending=null; this.justEvaled=false; this.errored=false; this._refresh(); },
    memoryClear() { this.memory = 0; this._refresh(); },
    memoryRecall() { if (this.errored) this.reset(); this.display = String(this._round(this.memory)); this.justEvaled = true; this._refresh(); },
    memoryAdd() { if (this.errored) return; const v = Number(this.display); if (Number.isFinite(v)) { this.memory = this._round(this.memory + v); this._refresh(); } },
    memorySub() { if (this.errored) return; const v = Number(this.display); if (Number.isFinite(v)) { this.memory = this._round(this.memory - v); this._refresh(); } },
    sqrt() {
      if (this.errored) return;
      const v = Number(this.display);
      if (!Number.isFinite(v) || v < 0) { this._setError(); return; }
      this.display = String(this._round(Math.sqrt(v))); this.justEvaled = true; this._refresh();
    },
    inputDigit(d) {
      if (this.errored) this.reset();
      if (this.justEvaled) { this.display = d; this.justEvaled = false; }
      else this.display = this.display === '0' ? d : this.display + d;
      this._refresh();
    },
    inputDecimal() {
      if (this.errored) this.reset();
      if (this.justEvaled) { this.display = '0.'; this.justEvaled = false; }
      else if (!this.display.includes('.')) this.display += '.';
      this._refresh();
    },
    backspace() {
      if (this.errored) { this.reset(); return; }
      if (this.justEvaled) { this.reset(); return; }
      this.display = this.display.length > 1 ? this.display.slice(0,-1) : '0';
      if (this.display === '-' || this.display === '-0') this.display = '0';
      this._refresh();
    },
    toggleSign() {
      if (this.errored || this.display === '0' || this.display === 'Error') return;
      this.display = this.display.startsWith('-') ? this.display.slice(1) : '-' + this.display;
      this._refresh();
    },
    applyOp(op) {
      if (this.errored) return;
      const cur = Number(this.display);
      if (!Number.isFinite(cur)) { this._setError(); return; }
      if (this.pending && !this.justEvaled) {
        const r = this._compute(this.prev, cur, this.pending);
        if (!Number.isFinite(r)) { this._setError(); return; }
        this.prev = r;
      } else this.prev = cur;
      this.pending = op; this.justEvaled = true;
      this.display = String(this._round(this.prev));
      this._refresh();
    },
    evaluate() {
      if (this.errored || this.pending == null) return;
      const cur = Number(this.display);
      const r = this._compute(this.prev, cur, this.pending);
      if (!Number.isFinite(r)) { this._setError(); return; }
      this.display = String(this._round(r));
      this.prev = null; this.pending = null; this.justEvaled = true;
      this._refresh();
    },
    percent() {
      if (this.errored) return;
      const cur = Number(this.display);
      if (!Number.isFinite(cur)) return;
      const base = (this.pending && this.prev != null) ? this.prev : 1;
      const r = this._round(cur * base / 100);
      this.display = String(r); this.justEvaled = true; this._refresh();
    },
    _setError() { this.display = 'Error'; this.errored = true; this.pending = null; this.prev = null; this.justEvaled = true; this._refresh(); },
    _compute(a,b,op) { switch(op){case '+': return a+b; case '-': return a-b; case '*': return a*b; case '/': return b===0?Infinity:a/b;} return b; },
    _round(n) { return Math.round(n * 1e10) / 1e10; },
    _refresh() {
      const el = document.getElementById('calcDisplay');
      if (el) { el.textContent = this.display; el.classList.toggle('is-error', this.errored); }
      const m = document.getElementById('calcMemoryIndicator');
      if (m) m.textContent = this.memory !== 0 ? 'M' : '';
    },
  };

  /* ── STATE ── */
  const State = {
    screen: 'splash', activeTab: 'learn', mode: 'practice', selectedTopic: null,
    questions: [], current: 0, answered: null, answers: [], score: 0, results: [],
    showReview: false, reviewFilter: 'all',
    mockEndTime: 0, mockTimerInterval: null, confirmModal: null,
    timedOut: false, numericDraft: '',
    glossaryQuery: '', toast: null, toastTimer: null, collapsedUnits: {},
    ddSelectedLeft: null, ddMap: {},        // drag-drop UI state
    tfDraft: {},                            // table-fill blank inputs
    scDraft: {},                            // scenario sub-answers
    gfDraft: {},                            // gap-fill dropdown selections
    woDraft: [],                            // word-order placed word indices
    referenceOpen: false,
    taEntries: [],                          // T-account playground postings
    taForm: { desc: '', amount: '', dr: '', cr: '' },
    taExercise: null, taCheck: null,        // guided T-account exercise state
    hintLevel: 0, hintElim: null,           // progressive hints (practice mode)
    lesson: null,                           // lesson player state
    flash: null,                            // flashcard session state
    revisionUnit: null,                     // unit revision notes screen
    combo: 0,                               // consecutive correct answers in practice
  };

  /* Common ledger accounts for the T-account playground */
  const TA_ACCOUNTS = [
    'Bank', 'Cash', 'Sales', 'Sales returns', 'Purchases', 'Purchases returns',
    'Trade receivables', 'Trade payables', 'Capital', 'Drawings', 'VAT',
    'Rent', 'Wages', 'Motor expenses', 'Office expenses',
    'Non-current assets', 'Loan', 'Discounts allowed', 'Discounts received',
  ];
  // Accounts whose "natural" balance sits on the debit side
  const TA_DEBIT_NATURE = {
    'Bank': 1, 'Cash': 1, 'Sales returns': 1, 'Purchases': 1, 'Trade receivables': 1,
    'Drawings': 1, 'Rent': 1, 'Wages': 1, 'Motor expenses': 1, 'Office expenses': 1,
    'Non-current assets': 1, 'Discounts allowed': 1,
  };

  /* Guided T-account exercises — post the entries, then check against the model answer */
  const TA_EXERCISES = [
    { id: 'tae-1', title: 'Capital & first purchase', brief: '1) The owner pays £8,000 of personal money into the business bank account. 2) The business buys goods for resale for £2,500, paying by bank transfer.',
      expected: [{ dr: 'Bank', cr: 'Capital', amount: 8000 }, { dr: 'Purchases', cr: 'Bank', amount: 2500 }] },
    { id: 'tae-2', title: 'Credit sales & receipts', brief: '1) Sell goods on credit to a customer for £1,200. 2) The customer later pays £700 by bank transfer.',
      expected: [{ dr: 'Trade receivables', cr: 'Sales', amount: 1200 }, { dr: 'Bank', cr: 'Trade receivables', amount: 700 }] },
    { id: 'tae-3', title: 'Credit purchases & payments', brief: '1) Buy goods for resale on credit for £3,000. 2) Pay the supplier the full £3,000 by bank transfer.',
      expected: [{ dr: 'Purchases', cr: 'Trade payables', amount: 3000 }, { dr: 'Trade payables', cr: 'Bank', amount: 3000 }] },
    { id: 'tae-4', title: 'Expenses & drawings', brief: '1) Pay rent of £650 from the bank. 2) Pay wages of £1,400 from the bank. 3) The owner takes £300 from the bank for personal use.',
      expected: [{ dr: 'Rent', cr: 'Bank', amount: 650 }, { dr: 'Wages', cr: 'Bank', amount: 1400 }, { dr: 'Drawings', cr: 'Bank', amount: 300 }] },
    { id: 'tae-5', title: 'Returns both ways', brief: '1) A credit customer returns goods worth £200. 2) The business returns goods worth £450 to a credit supplier.',
      expected: [{ dr: 'Sales returns', cr: 'Trade receivables', amount: 200 }, { dr: 'Trade payables', cr: 'Purchases returns', amount: 450 }] },
    { id: 'tae-6', title: 'A loan and an asset', brief: '1) Receive a £5,000 bank loan. 2) Buy a delivery van (a non-current asset) for £4,200, paying from the bank.',
      expected: [{ dr: 'Bank', cr: 'Loan', amount: 5000 }, { dr: 'Non-current assets', cr: 'Bank', amount: 4200 }] },
    { id: 'tae-7', title: 'A prompt-payment discount', brief: 'A credit customer owing £500 settles early: they pay £490 into the bank and take a £10 prompt-payment discount. Record BOTH the receipt and the discount.',
      expected: [{ dr: 'Bank', cr: 'Trade receivables', amount: 490 }, { dr: 'Discounts allowed', cr: 'Trade receivables', amount: 10 }] },
    { id: 'tae-8', title: 'Putting it all together', brief: '1) Owner introduces £10,000 capital by bank. 2) Buy goods on credit for £4,000. 3) Make bank sales of £2,600. 4) Pay the supplier the £4,000 owed. 5) Pay motor expenses of £180.',
      expected: [{ dr: 'Bank', cr: 'Capital', amount: 10000 }, { dr: 'Purchases', cr: 'Trade payables', amount: 4000 }, { dr: 'Bank', cr: 'Sales', amount: 2600 }, { dr: 'Trade payables', cr: 'Bank', amount: 4000 }, { dr: 'Motor expenses', cr: 'Bank', amount: 180 }] },
  ];

  function showToast(message, kind) {
    State.toast = { message, kind: kind || 'info' };
    if (State.toastTimer) clearTimeout(State.toastTimer);
    State.toastTimer = setTimeout(() => { State.toast = null; const el = document.getElementById('toast'); if (el) el.remove(); }, 2200);
    const existing = document.getElementById('toast');
    if (existing) existing.remove();
    const node = document.createElement('div');
    node.id = 'toast';
    node.className = 'toast toast-' + State.toast.kind;
    node.setAttribute('role', 'status');
    node.textContent = message;
    document.body.appendChild(node);
  }

  /* ── ACTIONS ── */
  function startPractice(topicId) {
    playClick();
    let pool;
    if (topicId === 'all') pool = window.ALL_QUESTIONS;
    else if (topicId === 'flagged') pool = window.ALL_QUESTIONS.filter(q => Storage.isFlagged(q.id));
    else if (topicId === 'review-wrong') {
      const wrongIds = Object.entries(Storage.data.stats.questions)
        .filter(([id, s]) => s.attempts > 0 && s.correct === 0).map(([id]) => id);
      pool = window.ALL_QUESTIONS.filter(q => wrongIds.includes(q.id));
    }
    else if (topicId === 'sr-due') {
      const dueIds = Storage.srDueIds();
      pool = window.ALL_QUESTIONS.filter(q => dueIds.indexOf(q.id) !== -1);
    }
    else if (topicId === 'mistakes') {
      const ids = Storage.activeMistakeIds();
      pool = window.ALL_QUESTIONS.filter(q => ids.indexOf(q.id) !== -1);
    }
    else if (topicId && topicId.indexOf('skill:') === 0) {
      const sid = topicId.slice(6);
      pool = window.ALL_QUESTIONS.filter(q => q.skill === sid);
    }
    else if (topicId && topicId.indexOf('level:') === 0) {
      const lvl = topicId.slice(6);
      pool = window.ALL_QUESTIONS.filter(q => frQuestionLevel(q.id) === lvl);
    }
    else pool = window.ALL_QUESTIONS.filter(q => q.topic === topicId);
    // Gate questions to only those from unlocked units / CEFR levels.
    // Curated sets (flagged, sr-due, review-wrong, mistakes) bypass these gates.
    const GATE_EXEMPT = new Set(['flagged', 'sr-due', 'review-wrong', 'mistakes']);
    if (!GATE_EXEMPT.has(topicId)) {
      if (_activeSubjectId === 'french') {
        if (topicId && topicId.indexOf('level:') === 0) {
          const requestedLevel = topicId.slice(6);
          if (!frLevelUnlocked(requestedLevel)) {
            const prereq = requestedLevel === 'B1' ? 'A2' : 'A1';
            showToast('Complete all ' + prereq + ' lessons and pass the ' + prereq + ' unit quiz to unlock ' + requestedLevel + '.', 'warn');
            return;
          }
        } else {
          pool = pool.filter(q => frLevelUnlocked(frQuestionLevel(q.id)));
        }
        // Only surface questions from lessons the user has already completed.
        // Questions without a lesson field are general-level practice and always available.
        pool = pool.filter(q => !q.lesson || isLessonDone(q.lesson));
      } else {
        // For non-French subjects: gate topic-specific practice if the unit is locked.
        const isSpecificTopic = topicId && topicId !== 'all' && topicId.indexOf('skill:') !== 0;
        if (isSpecificTopic && !isUnitUnlocked(topicId)) {
          showToast('Complete the previous unit and pass its quiz to unlock this topic.', 'warn');
          return;
        }
        // Remove questions from locked units regardless of pool type.
        pool = pool.filter(q => isUnitUnlocked(q.topic));
      }
    }
    const poolSizeAfterLevelFilter = pool.length;

    // Exclude questions the user has marked as confident from all regular pools.
    // Curated lists (flagged, sr-due, review-wrong, mistakes) are left untouched.
    const CONFIDENT_EXEMPT = new Set(['flagged', 'sr-due', 'review-wrong', 'mistakes']);
    if (!CONFIDENT_EXEMPT.has(topicId)) pool = pool.filter(q => !Storage.isConfident(q.id));
    if (!pool.length) {
      const empty = {
        'flagged': 'No flagged questions yet — star questions during practice.',
        'sr-due': 'No questions are due for review right now. Come back later!',
        'mistakes': 'Your mistake notebook is empty — nothing to clear. 🎉',
      };
      const levelLocked = poolSizeAfterLevelFilter === 0;
      showToast(empty[topicId] || (levelLocked
        ? 'These questions are locked. Finish the prerequisite level lessons and quiz first.'
        : 'No questions left — you\'ve marked all as confident!'), 'warn');
      return;
    }
    const picked = applyFlipMode(shuffle(pool).slice(0, Math.min(PRACTICE_LENGTH, pool.length)).map(presentQuestion));
    if (picked.length === 0) { goHome(); return; }
    Object.assign(State, {
      screen:'quiz', mode:'practice', selectedTopic:topicId, questions:picked,
      current:0, answered:null, answers:[], score:0, results:[],
      showReview:false, reviewFilter:'all', timedOut:false, numericDraft:'',
      ddSelectedLeft:null, ddMap:{}, tfDraft:{}, scDraft:{}, gfDraft:{}, woDraft:[],
      hintLevel:0, hintElim:null, combo:0,
    });
    Calc.reset(); saveSession(); render();
  }

  /* Adaptive "smart practice": weights weak skills, due reviews and unseen questions,
     and eases the difficulty mix while overall accuracy is low. */
  function startSmartPractice() {
    playClick();
    const acc = skillAccuracy();
    const now = Date.now();
    const attempts = Object.values(Storage.data.stats.questions).reduce((s, q) => s + q.attempts, 0);
    const corrects = Object.values(Storage.data.stats.questions).reduce((s, q) => s + q.correct, 0);
    const overallAcc = attempts ? corrects / attempts : 0;
    const weighted = window.ALL_QUESTIONS
      .filter(q => !Storage.isConfident(q.id))
      .filter(q => frLevelUnlocked(frQuestionLevel(q.id)) && isUnitUnlocked(q.topic))
      .map(q => {
      let w = 1;
      const s = acc[q.skill];
      if (s && s.attempts >= 3 && (s.correct / s.attempts) < 0.7) w *= 3;       // weak skill
      const sr = Storage.data.sr[q.id];
      if (sr && sr.box >= 1 && sr.dueAt <= now) w *= 2;                          // due for review
      const qs = Storage.data.stats.questions[q.id];
      if (!qs) w *= 1.5;                                                         // never seen
      else if (qs.attempts > 0 && qs.correct === 0) w *= 2;                      // never got right
      if (qs && qs.lastWrong) {
        const age = now - qs.lastWrong;
        if (age < 3600000)   w *= 4;    // wrong in last hour — resurface immediately
        else if (age < 86400000) w *= 2.5; // wrong in last 24 h
        else if (age < 604800000) w *= 1.5; // wrong in last week
      }
      // Difficulty ladder: while accuracy is low, favour easier questions
      if (attempts >= 10 && overallAcc < 0.6 && q.difficulty === 'hard') w *= 0.4;
      if (attempts >= 10 && overallAcc >= 0.8 && q.difficulty === 'easy') w *= 0.5;
      return { q, w };
    });
    const picked = [];
    const pool = weighted.slice();
    while (picked.length < PRACTICE_LENGTH && pool.length) {
      let total = 0;
      for (const item of pool) total += item.w;
      let roll = Math.random() * total;
      let idx = 0;
      for (; idx < pool.length - 1; idx++) { roll -= pool[idx].w; if (roll <= 0) break; }
      picked.push(presentQuestion(pool[idx].q));
      pool.splice(idx, 1);
    }
    const smartPicked = applyFlipMode(picked);
    Object.assign(State, {
      screen:'quiz', mode:'practice', selectedTopic:'smart', questions:smartPicked,
      current:0, answered:null, answers:[], score:0, results:[],
      showReview:false, reviewFilter:'all', timedOut:false, numericDraft:'',
      ddSelectedLeft:null, ddMap:{}, tfDraft:{}, scDraft:{}, gfDraft:{}, woDraft:[],
      hintLevel:0, hintElim:null,
    });
    Calc.reset(); saveSession(); render();
  }

  function startFocusPractice() {
    playClick();
    const weakTopics = getWeakTopics();
    if (!weakTopics.length) { showToast('Answer 5+ questions in each topic to unlock Focus Mode.', 'warn'); return; }
    const topicIds = weakTopics.slice(0, 3).map(t => t.id);
    const allQ = (window.ALL_QUESTIONS || []).filter(q => topicIds.includes(q.topic) && isUnitUnlocked(q.topic) && frLevelUnlocked(frQuestionLevel(q.id)));
    const mistakeIds = new Set(Storage.activeMistakeIds());
    const wrongIds = new Set(
      Object.entries(Storage.data.stats.questions)
        .filter(([, s]) => s.attempts > 0 && s.correct === 0).map(([id]) => id)
    );
    const tier1 = shuffle(allQ.filter(q => mistakeIds.has(q.id)));
    const tier1Ids = new Set(tier1.map(q => q.id));
    const tier2 = shuffle(allQ.filter(q => wrongIds.has(q.id) && !tier1Ids.has(q.id)));
    const tier12Ids = new Set([...tier1Ids, ...tier2.map(q => q.id)]);
    const tier3 = shuffle(allQ.filter(q => ['hard', 'medium'].includes(q.difficulty) && !tier12Ids.has(q.id)));
    const tier123Ids = new Set([...tier12Ids, ...tier3.map(q => q.id)]);
    const tier4 = shuffle(allQ.filter(q => !tier123Ids.has(q.id)));
    const pool = [...tier1, ...tier2, ...tier3, ...tier4];
    const picked = applyFlipMode(pool.slice(0, PRACTICE_LENGTH).map(presentQuestion));
    if (!picked.length) { showToast('No questions available for your weak topics.', 'warn'); return; }
    Object.assign(State, {
      screen: 'quiz', mode: 'practice', selectedTopic: 'focus',
      questions: picked, current: 0, answered: null, answers: [], score: 0, results: [],
      showReview: false, reviewFilter: 'all', timedOut: false, numericDraft: '',
      ddSelectedLeft: null, ddMap: {}, tfDraft: {}, scDraft: {}, gfDraft: {}, woDraft: [],
      hintLevel: 0, hintElim: null, combo: 0,
    });
    Calc.reset(); saveSession(); render();
  }

  function startMultiSkillDrill(skillsCsv) {
    const skills = (skillsCsv || '').split(',').map(s => s.trim()).filter(Boolean);
    const pool = (window.ALL_QUESTIONS || []).filter(q => skills.includes(q.skill));
    if (!pool.length) return;
    const picked = applyFlipMode(shuffle(pool.slice()).slice(0, Math.min(10, pool.length)).map(presentQuestion));
    Object.assign(State, {
      screen: 'quiz', mode: 'practice', selectedTopic: 'lesson',
      questions: picked, current: 0, answered: null, answers: [], score: 0, results: [],
      showReview: false, reviewFilter: 'all', timedOut: false, numericDraft: '',
      ddSelectedLeft: null, ddMap: {}, tfDraft: {}, scDraft: {}, gfDraft: {}, woDraft: [],
      hintLevel: 0, hintElim: null, combo: 0,
    });
    render();
  }

  /* Progressive hints (practice mode): level 1 = skill strategy, level 2 = formula or 50/50-style elimination */
  function useHint() {
    if (State.answered !== null || State.mode !== 'practice') return;
    if (State.hintLevel >= 2) return;
    State.hintLevel++;
    const q = State.questions[State.current];
    if (State.hintLevel === 2 && isSimpleMcq(q) && State.hintElim == null) {
      State.hintElim = (q.ans + 1) % q.opts.length;  // cross out one wrong option
    }
    playClick();
    render();
  }
  function buildMockFromBlueprint() {
    const out = [];
    MOCK_BLUEPRINT.forEach((task, taskIdx) => {
      const pool = window.ALL_QUESTIONS.filter(q => {
        const type = q.type || 'mcq';
        if (type !== 'mcq' && type !== 'numeric') return false;  // mock supports MCQ + numeric entry
        if (task.topics.indexOf(q.topic) === -1) return false;
        if (task.difficulties && task.difficulties.indexOf(q.difficulty) === -1) return false;
        return true;
      });
      shuffle(pool).slice(0, task.count).forEach(q => {
        const pq = presentQuestion(q);
        pq._task = taskIdx;
        out.push(pq);
      });
    });
    return out;
  }
  function startMock() {
    playClick();
    const picked = buildMockFromBlueprint();
    if (!picked.length) { showToast('Could not build the mock exam — question bank unavailable.', 'error'); return; }
    Object.assign(State, {
      screen:'quiz', mode:'mock', selectedTopic:'all', questions:picked,
      current:0, answered:null, answers:new Array(picked.length).fill(null),
      score:0, results:[], showReview:false, reviewFilter:'all', timedOut:false, numericDraft:'',
      mockEndTime: Date.now() + MOCK_DURATION_MS,
    });
    Storage.data.session = null; Storage.save();
    Calc.reset(); startMockTimer(); render();
  }
  function startMockTimer() {
    stopMockTimer();
    State.mockTimerInterval = setInterval(() => {
      if (State.mode !== 'mock' || State.screen !== 'quiz') { stopMockTimer(); return; }
      const remaining = State.mockEndTime - Date.now();
      if (remaining <= 0) { stopMockTimer(); finishMock(true); }
      else updateTimerDisplay(remaining);
    }, 1000);
  }
  function stopMockTimer() {
    if (State.mockTimerInterval) { clearInterval(State.mockTimerInterval); State.mockTimerInterval = null; }
  }
  function updateTimerDisplay(remaining) {
    const el = document.getElementById('mockTimer'); if (!el) return;
    el.textContent = '⏱ ' + formatMMSS(remaining);
    el.className = 'timer-pill' + (remaining < MOCK_DANGER_MS ? ' danger' : remaining < MOCK_WARN_MS ? ' warn' : '');
  }

  /* ── LESSON PLAYER (learning journey) ── */
  function startLesson(id) {
    const found = findLesson(id);
    if (!found) { showToast('Lesson not found.', 'error'); return; }
    playClick();
    State.screen = 'lesson';
    const existingRec = Storage.lessonRec(found.lesson.id);
    State.lesson = { unit: found.unit, def: found.lesson, phase: 'teach', cardIdx: 0, qIdx: 0, qAnswered: null, qScore: 0, prevStars: existingRec ? (existingRec.stars || 0) : 0 };
    render();
    // Block the Continue button briefly to prevent ghost-clicks on mobile
    // where the tap that opened the lesson can fire again on the newly rendered button.
    const player = document.querySelector('.lesson-player');
    if (player) {
      player.classList.add('lesson-just-started');
      setTimeout(() => player.classList.remove('lesson-just-started'), 400);
    }
  }
  function lessonContinue() {
    const L = State.lesson; if (!L) return;
    if (L.phase === 'teach') {
      if (L.cardIdx + 1 < L.def.cards.length) { L.cardIdx++; }
      else { L.phase = 'transition'; }
      render();
    } else if (L.phase === 'transition') {
      L.phase = 'quiz'; L.qIdx = 0; L.qAnswered = null; L.qScore = 0; L.wrongIdxs = [];
      render();
    } else if (L.phase === 'quiz' && L.qAnswered !== null) {
      if (L.qIdx + 1 < L.def.check.length) { L.qIdx++; L.qAnswered = null; render(); }
      else finishLesson();
    }
  }
  function lessonBack() {
    const L = State.lesson; if (!L) return;
    if (L.phase === 'transition') { L.phase = 'teach'; render(); return; }
    if (L.phase !== 'teach' || L.cardIdx === 0) return;
    L.cardIdx--; render();
  }
  function lessonAnswer(idx) {
    const L = State.lesson; if (!L || L.phase !== 'quiz' || L.qAnswered !== null) return;
    const q = L.def.check[L.qIdx];
    L.qAnswered = idx;
    const correct = idx === q.ans;
    if (correct) { L.qScore++; Storage.addXp(2); playCorrect(); }
    else { if (!L.wrongIdxs) L.wrongIdxs = []; L.wrongIdxs.push(L.qIdx); playWrong(); }
    Storage.save();
    render();
  }
  function finishLesson() {
    const L = State.lesson; if (!L) return;
    const total = L.def.check.length;
    const pct = total ? Math.round((L.qScore / total) * 100) : 0;
    const stars = pct >= 100 ? 3 : pct >= 75 ? 2 : pct >= 50 ? 1 : 0;
    L.phase = 'done'; L.pct = pct; L.stars = stars;
    L.isPersonalBest = pct >= 50 && stars > (L.prevStars || 0);
    if (pct >= 50) {
      L.firstTime = Storage.completeLesson(L.def.id, stars, pct);
      Storage.save();
      checkBadges();
      if (stars === 3) setTimeout(confetti, 300);
      // Unit completion celebration
      const unitDef = (window.LEARN_PATH || []).find(u => u.unit === L.unit);
      L.unitComplete = unitDef && unitDef.lessons.every(l => isLessonDone(l.id));
      if (L.unitComplete && !Storage.data.badges['unit-' + L.unit]) {
        Storage.data.badges['unit-' + L.unit] = Date.now();
        Storage.addXp(50);
        Storage.save();
        setTimeout(() => { confetti(); showToast('🏆 Unit complete! +50 bonus XP', 'success'); }, 600);
      }
    }
    render();
  }
  function lessonRetryQuiz() {
    const L = State.lesson; if (!L) return;
    L.phase = 'quiz'; L.qIdx = 0; L.qAnswered = null; L.qScore = 0;
    render();
  }
  function goLearn() {
    stopMockTimer();
    State.screen = 'home'; State.activeTab = 'learn'; State.confirmModal = null;
    State.lesson = null; State.flash = null; State.revisionUnit = null;
    render();
  }

  /* ── FLASHCARDS (glossary + Leitner scheduling) ── */
  function startFlashcards() {
    const due = Storage.flashDueTerms();
    const fresh = Storage.flashNewTerms(Math.max(0, 12 - due.length));
    const terms = shuffle(due.concat(fresh)).slice(0, 20);
    if (!terms.length) { showToast('No cards due — you are all caught up! 🎉', 'success'); return; }
    playClick();
    State.screen = 'flash';
    State.flash = { terms, idx: 0, flipped: false, got: 0 };
    render();
  }
  function flashFlip() {
    const F = State.flash; if (!F || F.flipped || F.idx >= F.terms.length) return;
    F.flipped = true; playClick(); render();
  }
  function flashGrade(ok) {
    const F = State.flash; if (!F || !F.flipped || F.idx >= F.terms.length) return;
    Storage.gradeFlash(F.terms[F.idx], ok);
    if (ok) { F.got++; playCorrect(); } else { playWrong(); }
    F.idx++; F.flipped = false;
    Storage.save();
    if (F.idx >= F.terms.length) checkBadges();
    render();
  }

  function nextLessonToDo() {
    const frCefrMap = { 'fr-a1': 'A1', 'fr-a2': 'A2', 'fr-b1': 'B1' };
    for (const unit of (window.LEARN_PATH || [])) {
      const unitId = unit.unit || unit.id;
      if (_activeSubjectId === 'french') {
        if (!frLevelUnlocked(frCefrMap[unitId] || 'A1')) continue;
      } else {
        if (!isUnitUnlocked(unitId)) continue;
      }
      for (const L of unit.lessons) {
        if (!isLessonDone(L.id)) return { unit, lesson: L };
      }
    }
    return null;
  }

  /* ── GUIDED T-ACCOUNT EXERCISES ── */
  function startTaExercise(id) {
    const ex = TA_EXERCISES.find(e => e.id === id);
    if (!ex) return;
    playClick();
    State.taExercise = id; State.taCheck = null;
    State.taEntries = [];
    State.taForm = { desc: '', amount: '', dr: '', cr: '' };
    render();
  }
  function exitTaExercise() {
    State.taExercise = null; State.taCheck = null;
    render();
  }
  function checkTaExercise() {
    const ex = TA_EXERCISES.find(e => e.id === State.taExercise);
    if (!ex) return;
    const used = new Array(State.taEntries.length).fill(false);
    const perExpected = ex.expected.map(exp => {
      for (let i = 0; i < State.taEntries.length; i++) {
        if (used[i]) continue;
        const e = State.taEntries[i];
        if (e.dr === exp.dr && e.cr === exp.cr && Math.abs(e.amount - exp.amount) <= 0.01) {
          used[i] = true;
          return { ...exp, ok: true };
        }
      }
      return { ...exp, ok: false };
    });
    const extras = used.filter(u => !u).length;
    const allOk = perExpected.every(p => p.ok) && extras === 0;
    State.taCheck = { perExpected, extras, allOk };
    if (allOk) {
      playCorrect();
      if (!Storage.data.learn.taDone[ex.id]) {
        Storage.data.learn.taDone[ex.id] = Date.now();
        Storage.addXp(15);
        Storage.save();
        checkBadges();
      }
      setTimeout(confetti, 200);
    } else playWrong();
    render();
  }

  function answerPractice(idx) {
    if (State.answered !== null) return;
    const q = State.questions[State.current];
    const correct = idx === q.ans;
    State.answered = idx;
    if (correct) { State.score++; playCorrect(); } else { playWrong(); }
    updateCombo(correct);
    Storage.recordAnswer(q, correct); Storage.save();
    State.results.push({ id:q.id, q:q.q, correct, chosen:q.opts[idx], correctOpt:q.opts[q.ans], exp:q.exp, topic:q.topic, skill:q.skill });
    saveSession(); render();
  }
  function selectDragLeft(idx) {
    if (State.answered !== null) return;
    State.ddSelectedLeft = (State.ddSelectedLeft === idx) ? null : idx;
    render();
  }
  function selectDragRight(idx) {
    if (State.answered !== null) return;
    if (State.ddSelectedLeft == null) { showToast('First click an item on the left.', 'info'); return; }
    // Remove any other left that was paired to this right
    for (const k of Object.keys(State.ddMap)) {
      if (State.ddMap[k] === idx) delete State.ddMap[k];
    }
    State.ddMap[State.ddSelectedLeft] = idx;
    State.ddSelectedLeft = null;
    render();
  }
  function clearDragPair(leftIdx) {
    if (State.answered !== null) return;
    delete State.ddMap[leftIdx];
    render();
  }
  function submitDragDrop() {
    if (State.answered !== null) return;
    const q = State.questions[State.current];
    const totalPairs = q.pairs.length;
    const mapped = Object.keys(State.ddMap).length;
    if (mapped < totalPairs) {
      showToast('Match every item on the left before submitting.', 'warn');
      return;
    }
    let correct = 0;
    const perPair = q.pairs.map((p, leftIdx) => {
      const chosenShuffledIdx = State.ddMap[leftIdx];
      const chosenRight = q.shuffledRights[chosenShuffledIdx];
      // Compare right-side values rather than original indices so that questions
      // with duplicate right values (e.g. two pairs both mapping to "avoir") accept
      // either matching slot as correct.
      const ok = q.pairs[chosenRight].right === p.right;
      if (ok) correct++;
      return { leftIdx, chosenRight, ok };
    });
    const allRight = correct === totalPairs;
    State.answered = { kind: 'dragdrop', correct: allRight, perPair, score: correct, total: totalPairs };
    if (allRight) { State.score++; playCorrect(); } else { playWrong(); }
    updateCombo(allRight);
    Storage.recordAnswer(q, allRight); Storage.save();
    const chosenSummary = q.pairs.map((p, i) => p.left + ' → ' + q.pairs[q.shuffledRights[State.ddMap[i]]].right).join('; ');
    const correctSummary = q.pairs.map(p => p.left + ' → ' + p.right).join('; ');
    State.results.push({ id:q.id, q:q.q, correct:allRight, chosen: chosenSummary, correctOpt: correctSummary, exp:q.exp, topic:q.topic, skill:q.skill });
    saveSession(); render();
  }

  function submitTableFill() {
    if (State.answered !== null) return;
    const q = State.questions[State.current];
    const blanks = q.table.blanks;
    let correct = 0;
    const tolerance = q.tolerance != null ? q.tolerance : 0.5;
    const perBlank = blanks.map((b, i) => {
      const raw = State.tfDraft[i];
      const val = parseNumericInput(raw);
      const ok = Number.isFinite(val) && Math.abs(val - b.answer) <= tolerance;
      if (ok) correct++;
      return { blankIdx: i, expected: b.answer, entered: Number.isFinite(val) ? val : null, ok };
    });
    const allRight = correct === blanks.length;
    State.answered = { kind: 'tablefill', correct: allRight, perBlank, score: correct, total: blanks.length };
    if (allRight) { State.score++; playCorrect(); } else { playWrong(); }
    updateCombo(allRight);
    Storage.recordAnswer(q, allRight); Storage.save();
    const chosenSummary = perBlank.map(b => b.entered == null ? '—' : b.entered).join(', ');
    const correctSummary = blanks.map(b => b.answer).join(', ');
    State.results.push({ id:q.id, q:q.q, correct:allRight, chosen: chosenSummary, correctOpt: correctSummary, exp:q.exp, topic:q.topic, skill:q.skill });
    saveSession(); render();
  }

  function submitScenario() {
    if (State.answered !== null) return;
    const q = State.questions[State.current];
    const parts = q.parts;
    let correct = 0;
    const perPart = parts.map((part, i) => {
      const draft = State.scDraft[i];
      let ok = false, chosenText = '— not answered —', correctText;
      if (isNumeric(part)) {
        const v = parseNumericInput(draft);
        ok = Number.isFinite(v) && isNumericCorrect(part, v);
        chosenText = Number.isFinite(v) ? formatNumericValue(part, v) : '— not answered —';
        correctText = formatNumericValue(part, part.answer);
      } else {
        // MCQ part
        ok = (draft != null && Number(draft) === part.ans);
        chosenText = (draft == null) ? '— not answered —' : part.opts[Number(draft)];
        correctText = part.opts[part.ans];
      }
      if (ok) correct++;
      return { partIdx: i, ok, chosenText, correctText };
    });
    const allRight = correct === parts.length;
    State.answered = { kind: 'scenario', correct: allRight, perPart, score: correct, total: parts.length };
    if (allRight) { State.score++; playCorrect(); } else { playWrong(); }
    updateCombo(allRight);
    Storage.recordAnswer(q, allRight); Storage.save();
    const chosenSummary = perPart.map((p, i) => 'Part ' + (i+1) + ': ' + p.chosenText).join(' | ');
    const correctSummary = perPart.map((p, i) => 'Part ' + (i+1) + ': ' + p.correctText).join(' | ');
    State.results.push({ id:q.id, q:q.q, correct:allRight, chosen: chosenSummary, correctOpt: correctSummary, exp:q.exp, topic:q.topic, skill:q.skill });
    saveSession(); render();
  }

  function submitGapFill() {
    if (State.answered !== null) return;
    const q = State.questions[State.current];
    const total = q.gaps.length;
    const filled = q.gaps.filter((g, i) => State.gfDraft[i] != null && State.gfDraft[i] !== '').length;
    if (filled < total) { showToast('Fill in every gap before submitting.', 'warn'); return; }
    let correct = 0;
    const perGap = q.gaps.map((g, i) => {
      const sel = State.gfDraft[i];
      const ok = sel != null && Number(sel) === g.answer;
      if (ok) correct++;
      return { gapIdx: i, ok, chosen: sel != null ? g.options[Number(sel)] : null, correctText: g.options[g.answer] };
    });
    const allRight = correct === total;
    State.answered = { kind: 'gapfill', correct: allRight, perGap, score: correct, total: total };
    if (allRight) { State.score++; playCorrect(); } else { playWrong(); }
    updateCombo(allRight);
    Storage.recordAnswer(q, allRight); Storage.save();
    const chosenSummary = perGap.map(g => g.chosen == null ? '—' : g.chosen).join(' / ');
    const correctSummary = perGap.map(g => g.correctText).join(' / ');
    State.results.push({ id:q.id, q:q.q || 'Gap-fill', correct:allRight, chosen: chosenSummary, correctOpt: correctSummary, exp:q.exp, topic:q.topic, skill:q.skill });
    saveSession(); render();
  }

  function submitWordOrder() {
    if (State.answered !== null) return;
    const q = State.questions[State.current];
    if (State.woDraft.length < q.words.length) { showToast('Place all words before submitting.', 'warn'); return; }
    const sentence = State.woDraft.map(i => q.words[i]);
    const allRight = sentence.every((w, i) => w === q.answer[i]);
    State.answered = { kind: 'wordorder', correct: allRight };
    if (allRight) { State.score++; playCorrect(); } else { playWrong(); }
    updateCombo(allRight);
    Storage.recordAnswer(q, allRight); Storage.save();
    State.results.push({ id: q.id, q: q.q, correct: allRight, chosen: sentence.join(' '), correctOpt: q.answer.join(' '), exp: q.exp, topic: q.topic, skill: q.skill });
    saveSession(); render();
  }

  function submitNumericPractice() {
    if (State.answered !== null) return;
    const q = State.questions[State.current];
    const raw = (document.getElementById('numericAnswer') || {}).value;
    const value = parseNumericInput(raw);
    if (!Number.isFinite(value)) {
      const err = document.getElementById('numericError');
      if (err) err.textContent = 'Please enter a valid number.';
      return;
    }
    State.numericDraft = String(raw);
    State.answered = value;
    const correct = isNumericCorrect(q, value);
    if (correct) { State.score++; playCorrect(); } else { playWrong(); }
    updateCombo(correct);
    Storage.recordAnswer(q, correct); Storage.save();
    State.results.push({ id:q.id, q:q.q, correct,
      chosen: formatNumericValue(q, value),
      correctOpt: formatNumericValue(q, q.answer),
      exp:q.exp, topic:q.topic, skill:q.skill, steps:q.steps });
    saveSession(); render();
  }
  function selectMockOption(idx) {
    if (State.mode !== 'mock') return;
    State.answers[State.current] = idx;
    document.querySelectorAll('.options [data-opt]').forEach(b => {
      const i = +b.dataset.opt;
      b.classList.toggle('selected', i === idx);
      b.setAttribute('aria-checked', i === idx ? 'true' : 'false');
    });
    const counter = document.getElementById('answeredCount');
    if (counter) {
      const n = State.answers.filter(a => a !== null).length;
      counter.textContent = `${n} of ${State.questions.length} answered`;
    }
    saveSession();
  }
  function setMockNumeric(text) {
    if (State.mode !== 'mock') return;
    State.answers[State.current] = (text === '' || text == null) ? null : String(text);
    const counter = document.getElementById('answeredCount');
    if (counter) {
      const n = State.answers.filter(a => a !== null).length;
      counter.textContent = `${n} of ${State.questions.length} answered`;
    }
  }
  function nextPractice() {
    stopSpeech();
    if (State.current + 1 >= State.questions.length) finishPractice();
    else {
      State.current++; State.answered = null; State.numericDraft = '';
      State.ddSelectedLeft = null; State.ddMap = {}; State.tfDraft = {}; State.scDraft = {}; State.gfDraft = {}; State.woDraft = [];
      State.hintLevel = 0; State.hintElim = null;
      Calc.reset(); saveSession(); render();
    }
  }
  function nextMock() {
    if (State.current + 1 >= State.questions.length) finishMock(false);
    else { State.current++; Calc.reset(); render(); }
  }
  function prevMock() { if (State.current > 0) { State.current--; Calc.reset(); render(); } }

  function finishPractice() {
    State.screen = 'score';
    Storage.data.session = null;
    const pct = State.questions.length ? Math.round((State.score / State.questions.length) * 100) : 0;
    Storage.recordResult({ mode:'practice', topic:State.selectedTopic, score:State.score, total:State.questions.length, pct, timestamp:Date.now() });
    Storage.addXp(5);   // session-completion bonus
    // Daily challenge bonus
    if (State.isDailyChallenge) {
      const today = todayKey();
      if (!Storage.data.daily[today]) Storage.data.daily[today] = { xp: 0, answered: 0 };
      if (!(Storage.data.daily[today].challenge && Storage.data.daily[today].challenge.done)) {
        const correct = State.score > 0;
        Storage.addXp(correct ? 10 : 3);
        Storage.data.daily[today].challenge = { done: true, correct, qId: State.questions[0] ? State.questions[0].id : null };
        showToast(correct ? '📅 Daily challenge complete! +10 XP' : '📅 Daily challenge done. +3 XP. Try again tomorrow!', correct ? 'success' : 'info');
      }
      State.isDailyChallenge = false;
    }
    // Unit quiz bonus
    if (State.unitQuizId) {
      const unitId = State.unitQuizId;
      State.unitQuizId = null;
      const passed = pct >= UNIT_QUIZ_PASS_MARK;
      if (!Storage.data.learn.unitTests) Storage.data.learn.unitTests = {};
      const existing = Storage.data.learn.unitTests[unitId];
      if (!existing || pct > (existing.pct || 0)) {
        Storage.data.learn.unitTests[unitId] = { passed, pct, timestamp: Date.now() };
        if (passed && (!existing || !existing.passed)) { Storage.addXp(50); showToast('🏆 Unit quiz passed! +50 XP', 'success'); }
      }
    }
    Storage.save();
    checkBadges();
    const effectivePassMark = State.unitQuizPassMark || PASS_MARK;
    if (pct >= effectivePassMark) setTimeout(confetti, 300);
    render();
  }
  function finishMock(timedOut) {
    stopMockTimer();
    let score = 0;
    State.results = State.questions.map((q, i) => {
      const response = State.answers[i];
      let correct = false, chosenText;
      if (isNumeric(q)) {
        const value = response == null ? NaN : parseNumericInput(response);
        correct = isNumericCorrect(q, value);
        chosenText = response == null ? '— not answered —' : formatNumericValue(q, value);
      } else {
        correct = response === q.ans;
        chosenText = response == null ? '— not answered —' : q.opts[response];
      }
      if (response !== null) Storage.recordAnswer(q, correct);
      if (correct) score++;
      return { id:q.id, q:q.q, correct, chosen:chosenText,
        correctOpt: isNumeric(q) ? formatNumericValue(q, q.answer) : q.opts[q.ans],
        exp:q.exp, topic:q.topic, skill:q.skill, steps: isNumeric(q) ? q.steps : undefined };
    });
    State.score = score; State.screen = 'score'; State.timedOut = !!timedOut;
    const pct = State.questions.length ? Math.round((score / State.questions.length) * 100) : 0;
    Storage.recordResult({ mode:'mock', topic:'all', score, total:State.questions.length, pct, timestamp:Date.now(), timedOut: !!timedOut });
    Storage.addXp(25);  // mock-completion bonus
    Storage.save();
    checkBadges();
    if (pct >= PASS_MARK) setTimeout(confetti, 300);
    render();
  }
  function exitQuiz() {
    if (State.screen === 'lesson' || State.screen === 'flash') { goLearn(); return; }
    if (State.screen === 'quiz' && State.mode === 'mock') {
      openConfirm({ title:'Exit mock exam?', message:'Your progress will be lost. Mock exam attempts cannot be resumed.', confirmLabel:'Exit exam',
        onConfirm: () => { stopMockTimer(); closeConfirm(); goHome(); } });
    } else goHome();
  }
  function goHome() { stopMockTimer(); State.screen='home'; State.activeTab='home'; State.confirmModal=null; render(); }

  function switchSubject(id) {
    const subj = getSubject(id);
    _activeSubjectId = id;
    localStorage.setItem(SUBJECT_STORE_KEY, id);
    if (id !== 'aat' && State.referenceOpen) { State.referenceOpen = false; }
    subj.activate();
    Storage.data = defaultData();
    Storage.load();
    // Reset all transient state
    State.screen = 'home';
    State.activeTab = subj.tabs[0];
    State.lesson = null; State.flash = null; State.questions = []; State.revisionUnit = null;
    State.confirmModal = null;
    render();
  }
  function renderSubjectPicker() {
    const cards = SUBJECT_REGISTRY.map(s => `
      <button class="subject-card ${s.id === _activeSubjectId ? 'subject-active' : ''}" type="button" data-switch-subject="${escapeHtml(s.id)}">
        <div class="sc-flag">${s.flag}</div>
        <div class="sc-info">
          <div class="sc-name">${escapeHtml(s.name)}</div>
          <div class="sc-desc">${escapeHtml(s.desc)}</div>
          <div class="sc-meta">${escapeHtml(s.meta)}</div>
        </div>
        ${s.id === _activeSubjectId ? '<span class="sc-active-chip">Active</span>' : ''}
      </button>`).join('');
    return `<div class="subject-picker">
      <div class="sp-header">
        <h2 class="sp-title">Choose a subject</h2>
        <p class="sp-sub">Your progress is saved separately for each subject.</p>
      </div>
      <div class="subject-cards">${cards}</div>
      ${_activeSubjectId ? `<button class="btn-secondary sp-back" id="subjectPickerBack" type="button">← Back</button>` : ''}
    </div>`;
  }

  function openConfirm(modal) { State.confirmModal = modal; render(); }
  function closeConfirm() { State.confirmModal = null; render(); }

  function saveSession() {
    if (State.mode === 'mock') return;
    Storage.data.session = { mode:State.mode, selectedTopic:State.selectedTopic,
      questionIds: State.questions.map(q => q.id),
      current: State.current, score: State.score, results: State.results,
      numericDraft: State.numericDraft || '', timestamp: Date.now() };
    Storage.save();
  }
  function resumeSession() {
    const s = Storage.data.session; if (!s) return;
    const questions = s.questionIds.map(questionById).filter(Boolean).map(presentQuestion);
    if (questions.length !== s.questionIds.length) { Storage.data.session = null; Storage.save(); render(); return; }
    const results = Array.isArray(s.results) ? s.results : [];
    const firstUnansweredIdx = questions.findIndex(q => !results.some(r => r.id === q.id));
    Object.assign(State, { screen:'quiz', mode:s.mode, selectedTopic:s.selectedTopic, questions,
      current: firstUnansweredIdx >= 0 ? firstUnansweredIdx : 0,
      answered:null, score: s.score || 0, results,
      showReview:false, reviewFilter:'all', timedOut:false, numericDraft: s.numericDraft || '' });
    Calc.reset(); render();
  }
  function dismissSession() { Storage.data.session = null; Storage.save(); render(); }

  /* ── RENDER ── */
  const app = () => document.getElementById('app');
  function render() {
    const el = app();
    let html = '';
    if (State.screen === 'splash')      html = renderSplash();
    else if (State.screen === 'subjects') html = `<div class="container fade-in">${renderSubjectPicker()}</div>`;
    else if (State.screen === 'home')   html = renderMain();
    else if (State.screen === 'quiz')   html = renderQuiz();
    else if (State.screen === 'score')  html = renderScore();
    else if (State.screen === 'lesson')   html = renderLesson();
    else if (State.screen === 'flash')    html = renderFlash();
    else if (State.screen === 'revision') html = renderRevision();
    if (State.confirmModal) html += renderModal(State.confirmModal);
    el.innerHTML = html;
    attachEvents();
    const isDark = Storage.isDarkActive();
    document.body.classList.toggle('dark', isDark);
    document.body.setAttribute('data-subject', _activeSubjectId || 'aat');
    const dt = document.getElementById('darkToggle');
    if (dt) { dt.textContent = isDark ? '☀️ Light' : '🌙 Dark'; dt.setAttribute('aria-pressed', isDark ? 'true' : 'false'); }
    const sb = document.getElementById('subjectSwitcherBtn');
    if (sb) { const subj = getSubject(_activeSubjectId); sb.textContent = subj.flag + ' ' + subj.short + ' ▾'; }
    if (State.confirmModal) { const mc = document.getElementById('modalConfirm'); if (mc) mc.focus(); }
    const ni = document.getElementById('numericAnswer');
    if (ni && !ni.disabled && State.screen === 'quiz') {
      try { ni.focus(); if (State.mode === 'practice' && State.numericDraft) ni.setSelectionRange(ni.value.length, ni.value.length); } catch (e) {}
    }
    if (State.screen === 'home' && State.activeTab === 'progress') animateCounters();
    if (State.screen === 'quiz' && State.answered !== null) {
      const nextBtn = document.getElementById('nextBtn');
      if (nextBtn) nextBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    if (State.screen === 'lesson' && State.lesson && State.lesson.phase === 'quiz' && State.lesson.qAnswered !== null) {
      const lessonNextBtn = document.getElementById('lessonNextBtn');
      if (lessonNextBtn) lessonNextBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }

  function renderSplash() {
    return `<div class="splash fade-in">
      <div class="splash-logo" aria-hidden="true">📊</div>
      <h2>AAT Level 2 Synoptic Practice</h2>
      <p>Prepare with confidence for the AQ2022 Business Environment Synoptic Assessment. ${window.ALL_QUESTIONS.length} audited practice questions across all four topic areas, with instant feedback, timed mock exams and persistent progress tracking.</p>
      <div class="splash-features">
        <div class="feat"><div class="fi" aria-hidden="true">📝</div><strong>${window.ALL_QUESTIONS.length} Questions</strong><br>Across all topics</div>
        <div class="feat"><div class="fi" aria-hidden="true">⏱</div><strong>Mock Exam</strong><br>${MOCK_LENGTH} questions, ${Math.round(MOCK_DURATION_MS / 60000)} min</div>
        <div class="feat"><div class="fi" aria-hidden="true">🧮</div><strong>Numeric Qs</strong><br>With on-screen calculator</div>
        <div class="feat"><div class="fi" aria-hidden="true">🎯</div><strong>${PASS_MARK}% Pass Mark</strong><br>AAT aligned</div>
        <div class="feat"><div class="fi" aria-hidden="true">📖</div><strong>Glossary</strong><br>Key terms explained</div>
      </div>
      <button class="start-btn" id="startBtn" type="button">Get Started →</button>
      <p class="disclaimer">⚠️ This app is an independent study tool and is not affiliated with, endorsed by, or officially associated with AAT (Association of Accounting Technicians).</p>
    </div>`;
  }

  function renderMain() {
    const ALL_TABS = { learn:'🗺️ Learn', home:'🎯 Practice', tools:'🧰 T-Accounts', glossary:'📖 Glossary', progress:'📈 Progress', howto:'ℹ️ How to Use' };
    const subjectTabs = getSubject(_activeSubjectId).tabs;
    const tabs = subjectTabs.map(id => ({ id, label: ALL_TABS[id] }));
    // Ensure activeTab is valid for this subject
    if (!subjectTabs.includes(State.activeTab)) State.activeTab = subjectTabs[0];
    let content = '';
    if (State.activeTab === 'learn') content = renderLearningJourney();
    else if (State.activeTab === 'home') content = renderHomeTab();
    else if (State.activeTab === 'tools') content = renderTAccountPlayground();
    else if (State.activeTab === 'glossary') content = renderGlossary();
    else if (State.activeTab === 'progress') content = renderProgress();
    else if (State.activeTab === 'howto') content = renderHowTo();
    return `<div class="container fade-in">
      <div class="nav-tabs" role="tablist">
        ${tabs.map(t => `<button class="nav-tab ${State.activeTab === t.id ? 'active' : ''}" type="button" role="tab" aria-selected="${State.activeTab === t.id}" data-tab="${t.id}">${t.label}</button>`).join('')}
      </div>
      ${content}
    </div>`;
  }

  /* ── T-ACCOUNT PLAYGROUND ── */
  function taPost() {
    const f = State.taForm;
    const amount = parseNumericInput(f.amount);
    if (!f.desc || !f.desc.trim()) { showToast('Enter a description for the transaction.', 'warn'); return; }
    if (!Number.isFinite(amount) || amount <= 0) { showToast('Enter a valid positive amount.', 'warn'); return; }
    if (!f.dr || !f.cr) { showToast('Choose both a debit and a credit account.', 'warn'); return; }
    if (f.dr === f.cr) { showToast('Debit and credit accounts must be different.', 'warn'); return; }
    State.taEntries.push({ desc: f.desc.trim(), amount: amount, dr: f.dr, cr: f.cr });
    State.taForm = { desc: '', amount: '', dr: f.dr, cr: f.cr };
    playClick();
    render();
  }
  function taRemove(idx) {
    State.taEntries.splice(idx, 1);
    render();
  }
  function taReset() {
    State.taEntries = [];
    State.taForm = { desc: '', amount: '', dr: '', cr: '' };
    render();
  }
  function taLoadExample() {
    State.taEntries = [
      { desc: 'Owner introduces capital', amount: 10000, dr: 'Bank', cr: 'Capital' },
      { desc: 'Buy goods for resale on credit', amount: 3000, dr: 'Purchases', cr: 'Trade payables' },
      { desc: 'Cash sale of goods', amount: 1800, dr: 'Bank', cr: 'Sales' },
      { desc: 'Pay rent by bank transfer', amount: 600, dr: 'Rent', cr: 'Bank' },
      { desc: 'Pay supplier part of amount owed', amount: 2000, dr: 'Trade payables', cr: 'Bank' },
      { desc: 'Owner takes drawings in cash', amount: 500, dr: 'Drawings', cr: 'Bank' },
    ];
    render();
  }
  function renderTAccountPlayground() {
    if (!State.taExercise) {
      const doneCount = TA_EXERCISES.filter(e => Storage.data.learn.taDone[e.id]).length;
      const exerciseList = TA_EXERCISES.map((ex, i) => {
        const done = !!Storage.data.learn.taDone[ex.id];
        return `<div class="ta-exercise-card ${done ? 'ta-ex-done' : ''}">
          <div class="ta-ex-header">
            <span class="ta-ex-num">${i + 1}</span>
            <strong class="ta-ex-title">${escapeHtml(ex.title)}</strong>
            ${done ? '<span class="ta-ex-badge">✓ Done</span>' : ''}
          </div>
          <p class="ta-ex-brief">${escapeHtml(ex.brief)}</p>
          <button class="btn-primary ta-start-btn" type="button" data-ta-ex="${escapeHtml(ex.id)}">${done ? '🔁 Redo' : '▶ Start'}</button>
        </div>`;
      }).join('');
      return `<h2 class="section-title">T-Account Playground</h2>
        <p class="ta-intro">Free-form playground to post any double-entry and watch T-accounts update live. Or work through a guided exercise below.</p>
        <div style="margin-bottom:24px">
          <h3 class="section-title" style="font-size:1rem;margin-bottom:12px">Guided Exercises (${doneCount}/${TA_EXERCISES.length} done)</h3>
          <div class="ta-exercise-list">${exerciseList}</div>
        </div>
        <h3 class="section-title" style="font-size:1rem;margin-bottom:0">Free-Form Playground</h3>
        ${renderTAccountFreeForm()}`;
    }
    /* Guided exercise mode */
    const ex = TA_EXERCISES.find(e => e.id === State.taExercise);
    if (!ex) { State.taExercise = null; return renderTAccountPlayground(); }
    const check = State.taCheck;
    let checkHtml = '';
    if (check) {
      checkHtml = `<div class="ta-check-result ${check.allOk ? 'ta-check-ok' : 'ta-check-bad'}">
        ${check.allOk ? '<strong>✅ Perfect! All entries correct.</strong>' : '<strong>❌ Not quite. Check the results below.</strong>'}
        <ul class="ta-check-list">${check.perExpected.map(p => `<li class="${p.ok ? 'ta-ok' : 'ta-miss'}">
          ${p.ok ? '✓' : '✗'} Dr <strong>${escapeHtml(p.dr)}</strong> / Cr <strong>${escapeHtml(p.cr)}</strong> · £${p.amount.toLocaleString('en-GB')}
        </li>`).join('')}</ul>
        ${check.extras > 0 ? `<p style="color:var(--wrong-text)">${check.extras} extra entr${check.extras===1?'y':'ies'} — remove any entries not required.</p>` : ''}
      </div>`;
    }
    return `<div class="ta-exercise-header">
      <button class="back-btn" id="taExitBtn" type="button">← Back to exercises</button>
      <h2 class="section-title" style="margin-top:12px">${escapeHtml(ex.title)}</h2>
      <div class="ta-exercise-brief">${escapeHtml(ex.brief)}</div>
    </div>
    ${checkHtml}
    ${renderTAccountFreeForm()}
    <div class="ta-exercise-footer">
      <button class="btn-primary" id="taCheckBtn" type="button">✓ Check my entries</button>
      <button class="btn-secondary" id="taExitBtn2" type="button">← Back to exercises</button>
    </div>`;
  }

  function renderTAccountFreeForm() {
    const entries = State.taEntries;
    // Build per-account ledgers
    const ledgers = {};
    function ensure(a) { if (!ledgers[a]) ledgers[a] = { dr: [], cr: [] }; return ledgers[a]; }
    entries.forEach((e, i) => {
      ensure(e.dr).dr.push({ desc: e.cr, amount: e.amount, idx: i });
      ensure(e.cr).cr.push({ desc: e.dr, amount: e.amount, idx: i });
    });
    const accountNames = Object.keys(ledgers).sort();
    let totalDr = 0, totalCr = 0;
    const accountCards = accountNames.map(name => {
      const l = ledgers[name];
      const drTotal = l.dr.reduce((s, x) => s + x.amount, 0);
      const crTotal = l.cr.reduce((s, x) => s + x.amount, 0);
      const bal = drTotal - crTotal;
      const balSide = bal >= 0 ? 'Dr' : 'Cr';
      const balAbs = Math.abs(bal);
      if (bal >= 0) totalDr += balAbs; else totalCr += balAbs;
      const rows = Math.max(l.dr.length, l.cr.length, 1);
      let bodyRows = '';
      for (let r = 0; r < rows; r++) {
        const d = l.dr[r], c = l.cr[r];
        bodyRows += `<tr>
          <td class="ta-desc">${d ? escapeHtml(d.desc) : ''}</td>
          <td class="ta-amt">${d ? '£' + d.amount.toLocaleString('en-GB') : ''}</td>
          <td class="ta-desc">${c ? escapeHtml(c.desc) : ''}</td>
          <td class="ta-amt">${c ? '£' + c.amount.toLocaleString('en-GB') : ''}</td>
        </tr>`;
      }
      const natural = TA_DEBIT_NATURE[name] ? 'Dr' : 'Cr';
      const balClass = balSide === natural ? 'ta-bal-normal' : 'ta-bal-unusual';
      return `<div class="ta-account">
        <div class="ta-account-name">${escapeHtml(name)}</div>
        <table class="ta-table">
          <thead><tr><th colspan="2">Debit</th><th colspan="2">Credit</th></tr></thead>
          <tbody>${bodyRows}</tbody>
          <tfoot>
            <tr class="ta-totals">
              <td class="ta-desc">Total</td><td class="ta-amt">£${drTotal.toLocaleString('en-GB')}</td>
              <td class="ta-desc">Total</td><td class="ta-amt">£${crTotal.toLocaleString('en-GB')}</td>
            </tr>
            <tr class="ta-balance ${balClass}">
              <td colspan="4">Balance ${balAbs ? balSide : ''}: £${balAbs.toLocaleString('en-GB')}${balAbs && balSide !== natural ? ' <span class="ta-warn">⚠ unusual side</span>' : ''}</td>
            </tr>
          </tfoot>
        </table>
      </div>`;
    }).join('');
    const tbBalanced = totalDr === totalCr;
    const entriesList = entries.length ? entries.map((e, i) => `<li>
      <span class="ta-entry-desc">${escapeHtml(e.desc)}</span>
      <span class="ta-entry-detail">Dr ${escapeHtml(e.dr)} / Cr ${escapeHtml(e.cr)} · £${e.amount.toLocaleString('en-GB')}</span>
      <button class="ta-entry-remove" type="button" data-ta-remove="${i}" aria-label="Remove transaction">✕</button>
    </li>`).join('') : '<li class="ta-empty">No transactions posted yet. Use the form above, or load the worked example.</li>';
    const accountOptions = (selected) => TA_ACCOUNTS.map(a => `<option value="${escapeHtml(a)}" ${a === selected ? 'selected' : ''}>${escapeHtml(a)}</option>`).join('');
    return `<h2 class="section-title">Interactive T-Account Playground</h2>
      <p class="ta-intro">Post any double entry and watch the ledger accounts and trial balance update live. Every transaction has equal debits and credits — the trial balance below should always balance.</p>
      <div class="ta-form">
        <div class="ta-field ta-field-desc">
          <label for="taDesc">Description</label>
          <input type="text" id="taDesc" value="${escapeHtml(State.taForm.desc)}" placeholder="e.g. Cash sale of goods" autocomplete="off">
        </div>
        <div class="ta-field ta-field-amt">
          <label for="taAmount">Amount (£)</label>
          <input type="text" id="taAmount" value="${escapeHtml(State.taForm.amount)}" inputmode="decimal" placeholder="0.00" autocomplete="off">
        </div>
        <div class="ta-field">
          <label for="taDr">Debit account</label>
          <select id="taDr"><option value="">— select —</option>${accountOptions(State.taForm.dr)}</select>
        </div>
        <div class="ta-field">
          <label for="taCr">Credit account</label>
          <select id="taCr"><option value="">— select —</option>${accountOptions(State.taForm.cr)}</select>
        </div>
        <button class="btn-primary ta-post-btn" id="taPostBtn" type="button">Post entry →</button>
      </div>
      <div class="ta-toolbar">
        <button class="btn-secondary action-btn" id="taExampleBtn" type="button">📋 Load worked example</button>
        <button class="danger-btn" id="taResetBtn" type="button" style="margin-top:0">🗑 Clear all</button>
      </div>
      <div class="ta-transactions">
        <div class="breakdown-title">Posted transactions (${entries.length})</div>
        <ul class="ta-entry-list">${entriesList}</ul>
      </div>
      ${accountNames.length ? `<div class="ta-accounts-grid">${accountCards}</div>
      <div class="ta-trial-balance ${tbBalanced ? 'tb-ok' : 'tb-bad'}">
        <span>Trial balance check</span>
        <span class="tb-figures">Total Dr £${totalDr.toLocaleString('en-GB')} &nbsp;·&nbsp; Total Cr £${totalCr.toLocaleString('en-GB')}</span>
        <span class="tb-status">${tbBalanced ? '✓ Balanced' : '✗ Does not balance'}</span>
      </div>` : ''}`;
  }

  function calcReadinessScore() {
    const stats = Storage.data.stats;
    const allQ = window.ALL_QUESTIONS || [];
    const topics = window.TOPICS || [];
    const accs = topics.map(t => {
      const s = stats.topics[t.id] || {};
      return (s.attempts >= 5) ? s.correct / s.attempts : null;
    }).filter(a => a !== null);
    const avgAcc = accs.length ? accs.reduce((a, b) => a + b, 0) / accs.length : 0;
    const accScore = avgAcc * 60;
    const attempted = Object.values(stats.questions || {}).filter(s => s.attempts > 0).length;
    const coverageScore = Math.min(attempted / Math.max(allQ.length, 1), 1) * 25;
    const streak = Storage.studyDayStreak ? Storage.studyDayStreak() : (stats.streak || {}).current || 0;
    const streakScore = Math.min(streak / 7, 1) * 10;
    const mocks = (Storage.data.history || []).filter(h => h.mode === 'mock');
    const bestMock = mocks.length ? Math.max(...mocks.map(m => m.pct)) : null;
    const mockScore = bestMock !== null ? (bestMock / 100) * 5 : 0;
    return Math.min(Math.round(accScore + coverageScore + streakScore + mockScore), 100);
  }

  function renderReadinessMeter(score) {
    const r = 36, circ = +(2 * Math.PI * r).toFixed(1);
    const offset = +((1 - score / 100) * circ).toFixed(1);
    const cls = scoreClass(score);
    const label = score >= 80 ? 'Exam Ready' : score >= 60 ? 'Almost There' : score >= 40 ? 'Getting There' : 'Early Stage';
    return `<div class="readiness-meter">
      <div class="readiness-ring-wrap">
        <svg viewBox="0 0 88 88" width="88" height="88" aria-hidden="true">
          <circle class="ring-track" cx="44" cy="44" r="${r}" fill="none" stroke-width="7"/>
          <circle class="ring-fill ring-${cls}" cx="44" cy="44" r="${r}" fill="none" stroke-width="7"
            stroke-dasharray="${circ}" stroke-dashoffset="${offset}"
            stroke-linecap="round" transform="rotate(-90 44 44)"/>
        </svg>
        <div class="readiness-score-overlay">
          <span class="readiness-score-num">${score}</span>
          <span class="readiness-score-denom">/100</span>
        </div>
      </div>
      <div class="readiness-label readiness-${cls}">${label}</div>
    </div>`;
  }

  function renderHomeTab() {
    const counts = {};
    const prog = getGlobalProgress();
    const streak = Storage.data.stats.streak || { current: 0, best: 0 };
    const flaggedCount = Storage.flaggedIds().length;
    const wrongIds = Object.entries(Storage.data.stats.questions).filter(([,s]) => s.attempts > 0 && s.correct === 0).map(([id]) => id);
    const wrongCount = wrongIds.length;
    const srDueCount = Storage.srDueIds().length;
    const session = Storage.data.session;
    const sessionBanner = session ? `<div class="resume-banner" role="status">
      <span>📌 You have a practice session in progress (Q${(session.current || 0) + 1} of ${session.questionIds.length}).</span>
      <span><button id="resumeBtn" type="button">Resume</button>
      <button class="dismiss" id="dismissSessionBtn" type="button">Dismiss</button></span>
    </div>` : '';
    const readinessScore = calcReadinessScore();
    const mocks = (Storage.data.history || []).filter(h => h.mode === 'mock');
    const bestMock = mocks.length ? Math.max(...mocks.map(m => m.pct)) : null;
    const liveStreak = Storage.studyDayStreak ? Storage.studyDayStreak() : streak.current;
    const progressBlock = `<div class="dashboard-hero">
      <div class="dashboard-left">
        ${renderReadinessMeter(readinessScore)}
        <div class="readiness-tip">accuracy · coverage · streak</div>
      </div>
      <div class="dashboard-right">
        <div class="dash-stat-grid">
          <div class="dash-stat">
            <div class="dash-stat-val ${scoreClass(prog.masteryPct)}">${prog.masteryPct}%</div>
            <div class="dash-stat-label">Mastery</div>
          </div>
          <div class="dash-stat">
            <div class="dash-stat-val">${prog.seen}<span class="dash-stat-sub"> / ${prog.total}</span></div>
            <div class="dash-stat-label">Seen</div>
          </div>
          <div class="dash-stat">
            <div class="dash-stat-val">🔥 ${liveStreak}</div>
            <div class="dash-stat-label">Day streak</div>
          </div>
          <div class="dash-stat">
            <div class="dash-stat-val ${bestMock !== null ? scoreClass(bestMock) : ''}">${bestMock !== null ? bestMock + '%' : '—'}</div>
            <div class="dash-stat-label">Best mock</div>
          </div>
        </div>
      </div>
    </div>`;

    window.TOPICS.forEach(t => { counts[t.id] = window.ALL_QUESTIONS.filter(q => q.topic === t.id).length; });
    const seenByTopic = {};
    (window.ALL_QUESTIONS || []).forEach(q => {
      const s = Storage.data.stats.questions[q.id];
      if (s && s.attempts > 0) seenByTopic[q.topic] = (seenByTopic[q.topic] || 0) + 1;
    });
    const topicMastery = (id) => {
      const ts = Storage.data.stats.topics[id];
      if (!ts || !ts.attempts) return null;
      return Math.round((ts.correct / ts.attempts) * 100);
    };

    const weakTopics = getWeakTopics();
    const synopticCount = (window.ALL_QUESTIONS || []).filter(q => q.topic === 'synoptic').length;

    // Focus mode card
    const focusCard = weakTopics.length >= 2
      ? `<div class="focus-mode-card">
          <div class="focus-mode-header">
            <div class="focus-icon-wrap" aria-hidden="true">🎯</div>
            <div class="focus-mode-text">
              <div class="focus-mode-title">Focus Mode</div>
              <div class="focus-mode-sub">Targeting your ${Math.min(3, weakTopics.length)} weakest areas</div>
            </div>
            <button class="focus-start-btn" id="focusModeBtn" type="button">Start →</button>
          </div>
          <div class="focus-topic-list">
            ${weakTopics.slice(0, 3).map(t => `<div class="focus-topic-row">
              <span class="focus-topic-icon" aria-hidden="true">${t.icon}</span>
              <span class="focus-topic-name">${escapeHtml(t.short)}</span>
              <div class="focus-topic-bar-bg" role="progressbar" aria-valuenow="${t.acc}" aria-valuemin="0" aria-valuemax="100">
                <div class="focus-topic-bar" style="width:${t.acc}%"></div>
              </div>
              <span class="focus-topic-pct ${scoreClass(t.acc)}">${t.acc}%</span>
            </div>`).join('')}
          </div>
        </div>`
      : `<div class="focus-mode-card focus-mode-locked">
          <span class="focus-icon-wrap" aria-hidden="true">🎯</span>
          <div>
            <div class="focus-mode-title">Focus Mode</div>
            <div class="focus-mode-sub">Answer 5+ questions in each topic to unlock personalised targeting</div>
          </div>
        </div>`;

    // Mode grid cards
    const isAAT = _activeSubjectId === 'aat';
    const modeDefs = [
      { id: 'smartPracticeBtn', icon: '🧠', title: 'Smart Practice', desc: 'Adapts to your skill gaps', cls: '' },
      { topic: 'all', icon: '🎯', title: 'Mixed Practice', desc: `${PRACTICE_LENGTH} random questions`, cls: '' },
      ...(isAAT ? [{ id: 'mockBtn', icon: '⏱', title: 'Mock Exam', desc: `${MOCK_LENGTH}Q · ${Math.round(MOCK_DURATION_MS / 60000)} min timed`, cls: 'mode-mock' }] : []),
      ...(isAAT ? [{ id: 'flashcardsBtn', icon: '🃏', title: 'Flashcards', desc: 'Glossary term review', cls: '' }] : []),
      ...(synopticCount ? [{ topic: 'synoptic', icon: '🔗', title: 'Synoptic Practice', desc: `${synopticCount} cross-unit scenarios`, cls: 'mode-synoptic' }] : []),
      ...(srDueCount > 0 ? [{ topic: 'sr-due', icon: '⏰', title: 'Due for Review', desc: `${srDueCount} spaced-rep cards`, cls: '' }] : []),
      ...(flaggedCount > 0 ? [{ topic: 'flagged', icon: '⭐', title: 'Flagged Questions', desc: `${flaggedCount} starred for revision`, cls: '' }] : []),
      ...(wrongCount > 0 ? [{ topic: 'review-wrong', icon: '🔁', title: 'Never Got Right', desc: `${wrongCount} questions to crack`, cls: '' }] : []),
      ...(Storage.activeMistakeIds().length > 0 ? [{ topic: 'mistakes', icon: '📝', title: 'Mistake Notebook', desc: `${Storage.activeMistakeIds().length} to clear`, cls: '' }] : []),
    ];
    const modeGrid = modeDefs.map(m => {
      const attr = m.id ? `id="${escapeHtml(m.id)}"` : `data-topic="${escapeHtml(m.topic)}"`;
      return `<button class="mode-card ${m.cls}" type="button" ${attr}>
        <span class="mode-card-icon" aria-hidden="true">${m.icon}</span>
        <div class="mode-card-info">
          <div class="mode-card-title">${escapeHtml(m.title)}</div>
          <div class="mode-card-desc">${escapeHtml(m.desc)}</div>
        </div>
      </button>`;
    }).join('');

    const isFrench = _activeSubjectId === 'french';
    const CEFR_LEVELS = [
      { id: 'A1', sublabel: 'Débutant',       icon: '🌱', color: '#059669', desc: 'Greetings, pronunciation, basic vocab & présent tense' },
      { id: 'A2', sublabel: 'Élémentaire',    icon: '📗', color: '#2563EB', desc: 'Passé composé, grammar rules, shopping & work vocab' },
      { id: 'B1', sublabel: 'Intermédiaire',  icon: '📘', color: '#7C3AED', desc: 'Object pronouns, subjonctif & complex structures' },
    ];
    const levelSection = isFrench ? `
      <h2 class="section-title" style="margin-top:0">Practice by Level <span class="section-title-sub">CEFR — A1 · A2 · B1</span></h2>
      <div class="home-grid">
        ${CEFR_LEVELS.map(lv => {
          const unlocked = frLevelUnlocked(lv.id);
          const lvPool = window.ALL_QUESTIONS.filter(q => frQuestionLevel(q.id) === lv.id);
          const lvTotal = lvPool.length;
          const lvHidden = lvPool.filter(q => Storage.isConfident(q.id)).length;
          if (!unlocked) {
            const prereqLevel = lv.id === 'B1' ? 'A2' : 'A1';
            return `<div class="topic-card topic-card-locked fade-in" style="border-top-color:${lv.color}" aria-label="${escapeHtml(lv.id)} locked">
              <div class="level-card-lbl" aria-hidden="true">🔒 ${escapeHtml(lv.id)}</div>
              <h3>${escapeHtml(lv.sublabel)}</h3>
              <p class="lock-reason">Finish all ${escapeHtml(prereqLevel)} lessons and pass the ${escapeHtml(prereqLevel)} unit quiz to unlock</p>
              <div class="topic-card-footer">
                <span class="count"><span class="topic-count-sep">${lvTotal} questions locked${lvHidden > 0 ? ` · ${lvHidden} hidden` : ''}</span></span>
              </div>
            </div>`;
          }
          const lvSeen  = lvPool.filter(q => { const s = Storage.data.stats.questions[q.id]; return s && s.attempts > 0; }).length;
          const lvAttempts = lvPool.reduce((s, q) => s + ((Storage.data.stats.questions[q.id] || {}).attempts || 0), 0);
          const lvCorrect  = lvPool.reduce((s, q) => s + ((Storage.data.stats.questions[q.id] || {}).correct  || 0), 0);
          const lvAvailable = lvPool.filter(q => !Storage.isConfident(q.id) && (!q.lesson || isLessonDone(q.lesson))).length;
          const lvLocked = lvPool.filter(q => q.lesson && !isLessonDone(q.lesson) && !Storage.isConfident(q.id)).length;
          const seenPct = lvTotal ? Math.round(lvSeen / lvTotal * 100) : 0;
          const m = lvAttempts > 0 ? Math.round(lvCorrect / lvAttempts * 100) : null;
          const badge = m != null ? `<span class="mastery-badge ${scoreClass(m)}">${m}%</span>` : '';
          return `<button class="topic-card fade-in" type="button" data-topic="${escapeHtml('level:' + lv.id)}" style="border-top-color:${lv.color}" aria-label="Practice ${lv.id} ${escapeHtml(lv.sublabel)} — ${lvSeen} of ${lvTotal} seen">
            ${badge}
            <div class="level-card-lbl" aria-hidden="true">${escapeHtml(lv.icon)} ${escapeHtml(lv.id)}</div>
            <h3>${escapeHtml(lv.sublabel)}</h3>
            <p>${escapeHtml(lv.desc)}</p>
            <div class="topic-card-footer">
              <span class="count">${lvSeen} <span class="topic-count-sep">of</span> ${lvTotal} seen</span>
              <div class="topic-seen-bar"><div class="topic-seen-fill" style="width:${seenPct}%"></div></div>
            </div>
            <div class="topic-available">${lvAvailable} <span class="topic-count-sep">available to practise</span>${lvLocked > 0 ? ` · <span class="topic-count-sep">${lvLocked} locked</span>` : ''}${lvHidden > 0 ? ` · <span class="topic-count-sep">${lvHidden} hidden</span>` : ''}</div>
          </button>`;
        }).join('')}
      </div>` : '';

    return `${sessionBanner}${progressBlock}
      <div class="sound-row">
        <label for="soundToggle" style="cursor:pointer">🔊 Sound effects</label>
        <label class="toggle-switch"><input type="checkbox" id="soundToggle" ${Storage.data.settings.soundOn ? 'checked' : ''} aria-label="Sound effects"><span class="toggle-slider" aria-hidden="true"></span></label>
      </div>
      ${isFrench ? `<div class="sound-row">
        <span style="cursor:default">🔄 Flip mode <span class="flip-mode-hint">show English, type French</span></span>
        <label class="toggle-switch"><input type="checkbox" id="flipModeToggle" ${Storage.data.settings.flipMode ? 'checked' : ''} aria-label="English to French flip mode"><span class="toggle-slider" aria-hidden="true"></span></label>
      </div>` : ''}
      ${levelSection}
      <h2 class="section-title"${isFrench ? ' style="margin-top:24px"' : ' style="margin-top:0"'}>Practice by Topic <span class="section-title-sub">${PRACTICE_LENGTH} questions · instant feedback</span></h2>
      <div class="home-grid">
        ${window.TOPICS.map(t => {
          const totalN = counts[t.id];
          if (!isUnitUnlocked(t.id)) {
            return `<div class="topic-card topic-card-locked fade-in" aria-label="${escapeHtml(t.name)} locked">
              <div class="icon" aria-hidden="true">🔒</div>
              <h3>${escapeHtml(t.name)}</h3>
              <p class="lock-reason">Complete the previous unit and pass its quiz to unlock</p>
              <div class="topic-card-footer">
                <span class="count"><span class="topic-count-sep">${totalN} questions locked</span></span>
              </div>
            </div>`;
          }
          const m = topicMastery(t.id);
          const badge = m == null ? '' : `<span class="mastery-badge ${scoreClass(m)}" title="Topic mastery">${m}%</span>`;
          const seenN = seenByTopic[t.id] || 0;
          const seenPct = totalN ? Math.round(seenN / totalN * 100) : 0;
          const availableN = (window.ALL_QUESTIONS || []).filter(q => q.topic === t.id && !Storage.isConfident(q.id) && frLevelUnlocked(frQuestionLevel(q.id)) && (!q.lesson || isLessonDone(q.lesson))).length;
          if (isFrench && availableN === 0 && totalN > 0) {
            return `<div class="topic-card topic-card-locked fade-in" aria-label="${escapeHtml(t.name)} locked">
              <div class="icon" aria-hidden="true">${t.icon}</div>
              <h3>${escapeHtml(t.name)}</h3>
              <p class="lock-reason">Complete the prerequisite level lessons and unit quiz to unlock</p>
              <div class="topic-card-footer"><span class="count"><span class="topic-count-sep">${totalN} questions locked</span></span></div>
            </div>`;
          }
          return `<button class="topic-card fade-in" type="button" data-topic="${t.id}" data-topic-color="${t.id}" aria-label="Practice ${escapeHtml(t.name)} — ${seenN} of ${totalN} seen">
            ${badge}
            <div class="icon" aria-hidden="true">${t.icon}</div>
            <h3>${escapeHtml(t.name)}</h3>
            <p>${escapeHtml(t.desc)}</p>
            <div class="topic-card-footer">
              <span class="count">${seenN} <span class="topic-count-sep">of</span> ${totalN} seen</span>
              <div class="topic-seen-bar"><div class="topic-seen-fill" style="width:${seenPct}%"></div></div>
            </div>
            <div class="topic-available">${availableN} <span class="topic-count-sep">available to practise</span></div>
          </button>`;
        }).join('')}
      </div>
      ${focusCard}
      <h2 class="section-title" style="margin-top:24px">More Practice Modes</h2>
      <div class="mode-card-grid">${modeGrid}</div>`;
  }

  function renderGlossary() {
    const q = (State.glossaryQuery || '').trim().toLowerCase();
    const items = !q ? window.GLOSSARY : window.GLOSSARY.filter(g =>
      g.term.toLowerCase().includes(q) || g.def.toLowerCase().includes(q));
    const highlight = (text) => {
      if (!q) return escapeHtml(text);
      const safe = escapeHtml(text);
      const re = new RegExp('(' + q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'ig');
      return safe.replace(re, '<mark>$1</mark>');
    };
    const grid = items.length ? `<div class="glossary-grid fade-in">
        ${items.map(g => `<div class="gloss-card">
          <div class="gloss-term">${highlight(g.term)}</div>
          <div class="gloss-def">${highlight(g.def)}</div>
        </div>`).join('')}
      </div>` : `<div class="empty-state">No matches for "${escapeHtml(q)}".</div>`;
    return `<h2 class="section-title">Key Terms Glossary <span style="font-weight:400;color:var(--subtext);font-size:.8rem">(${window.GLOSSARY.length} terms)</span></h2>
      <div class="search-row">
        <span class="search-icon" aria-hidden="true">🔎</span>
        <input id="glossarySearch" type="search" class="search-input" placeholder="Search terms or definitions…" value="${escapeHtml(State.glossaryQuery || '')}" autocomplete="off" aria-label="Search glossary">
        ${q ? '<button id="clearSearch" class="search-clear" type="button" aria-label="Clear search">✕</button>' : ''}
      </div>
      ${grid}`;
  }

  function renderHowTo() {
    const steps = [
      ['Choose a topic or mode', 'Pick one of the four topic areas, run a mixed-practice round, or take the timed mock exam. Flagged questions, questions you have never got right, and cards "due for review" each unlock a dedicated practice set.'],
      ['Question types', 'As well as multiple choice and numeric-entry questions, you will meet matching (drag-drop), table-completion, and multi-part scenario questions — the formats used in the real AAT computer-based assessment.'],
      ['Practice mode', 'Receive instant feedback after every answer, with a detailed explanation. Star a question (⭐) to revisit it later.'],
      ['Mock exam mode', `A ${MOCK_LENGTH}-question paper sat in ${Math.round(MOCK_DURATION_MS / 60000)} minutes with no feedback until the end. It is built from a fixed blueprint of ${MOCK_BLUEPRINT.length} tasks — two per unit, progressing from foundations to applied — with the four topic areas evenly weighted. Use Previous/Next or the task-grouped navigator to move around.`],
      ['Spaced repetition', 'Every answer is scheduled for review using a Leitner system: get it right and it returns later (1, 3, 7, 14 then 30 days); get it wrong and it comes back tomorrow. The home screen shows how many cards are due.'],
      ['Reference panel', 'Open the 📘 Ref button (top right) at any time for formulas, double-entry rules and key definitions — mirroring the reference material provided in the real exam.'],
      ['Calculator', 'Numeric, table and scenario questions show an on-screen calculator with memory keys (MC, MR, M−, M+), square root and percentage. Click "Use this value" to drop the result into the answer box.'],
      ['T-Account playground', 'Use the 🧰 T-Accounts tab to post any double entry and watch the ledger accounts and trial balance update live — a sandbox for practising debits and credits.'],
      ['Review your score', `${PASS_MARK}% or above is a pass. Filter the review to "wrong only" to focus on weak areas, and flag any question for revision.`],
      ['Track your progress', 'Lifetime stats, streaks and accuracy by topic are saved on this device under the Progress tab.'],
      ['Keyboard shortcuts', 'Press A–D to choose an MCQ option, F to flag, Enter or Space to advance, ←/→ to navigate in mock mode, Esc to close dialogs or the reference panel.'],
    ];
    return `<div style="max-width:600px;margin:0 auto" class="fade-in">
      <h2 class="section-title">How to Use This App</h2>
      <div class="how-card">
        ${steps.map(([h, p], i) => `<div class="how-step">
          <div class="how-num" aria-hidden="true">${i + 1}</div>
          <div class="how-text"><h4>${escapeHtml(h)}</h4><p>${escapeHtml(p)}</p></div>
        </div>`).join('')}
        <p style="font-size:.75rem;color:var(--subtext);margin-top:16px;line-height:1.5">⚠️ Independent study tool, not affiliated with AAT.</p>
      </div>
    </div>`;
  }

  function renderProgress() {
    const stats = Storage.data.stats;
    const totalAttempts = Object.values(stats.questions).reduce((s, q) => s + q.attempts, 0);
    const totalCorrect = Object.values(stats.questions).reduce((s, q) => s + q.correct, 0);
    const accuracy = totalAttempts ? Math.round((totalCorrect / totalAttempts) * 100) : 0;
    const streak = stats.streak || { current: 0, best: 0 };
    if (totalAttempts === 0) return `<h2 class="section-title">Your Progress</h2>
      <div class="progress-empty">
        <div class="progress-empty-icon">📊</div>
        <p class="progress-empty-title">Nothing tracked yet</p>
        <p class="progress-empty-sub">Complete a practice round to start seeing your accuracy and streaks here.</p>
        <div class="progress-empty-steps">
          <div class="progress-empty-step"><span class="progress-empty-step-num">1</span>Go to Practice and choose a topic</div>
          <div class="progress-empty-step"><span class="progress-empty-step-num">2</span>Answer at least 10 questions</div>
          <div class="progress-empty-step"><span class="progress-empty-step-num">3</span>Come back here to track your score</div>
        </div>
      </div>`;
    const topicRows = window.TOPICS.map(t => {
      const ts = stats.topics[t.id] || { attempts:0, correct:0 };
      const pct = ts.attempts ? Math.round((ts.correct / ts.attempts) * 100) : 0;
      const cls = scoreClass(pct);
      return `<div class="breakdown-row">
        <span class="bl">${t.icon} ${escapeHtml(t.short)}</span>
        <div class="breakdown-bar-bg" role="progressbar" aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100"><div class="breakdown-bar ${cls}" style="width:${pct}%"></div></div>
        <span class="breakdown-pct">${ts.attempts ? pct + '%' : '—'}</span>
      </div>`;
    }).join('');
    // Skill map
    const skillAcc = skillAccuracy();
    const skillMapHtml = window.SKILLS ? window.SKILLS.defs.map(sk => {
      const acc = skillAcc[sk.id];
      const pct = acc && acc.attempts ? Math.round(acc.correct / acc.attempts * 100) : null;
      const cls = pct === null ? 'skill-gray' : pct >= 70 ? 'skill-green' : pct >= 50 ? 'skill-amber' : 'skill-red';
      return `<button class="skill-map-cell ${cls}" type="button" data-start-skill="${escapeHtml(sk.id)}" title="${escapeHtml(sk.name)}: ${pct !== null ? pct + '%' : 'no data'}">
        <span class="skill-map-icon">${sk.icon}</span>
        <span class="skill-map-name">${escapeHtml(sk.name)}</span>
        <span class="skill-map-pct">${pct !== null ? pct + '%' : '—'}</span>
      </button>`;
    }).join('') : '';

    // Badge showcase
    const xp = Storage.data.learn.xp || 0;
    const level = Math.floor(xp / 100) + 1;
    const levelXp = xp % 100;
    const earnedBadgesList = BADGES.filter(b => Storage.data.badges[b.id]);
    const unearnedBadges = BADGES.filter(b => !Storage.data.badges[b.id]);
    const badgeShowcase = `<div class="badge-showcase">
      <div class="badge-showcase-header">
        <div class="badge-level-pill">⚡ Level ${level} <span class="badge-level-xp">${levelXp}/100 XP to next</span></div>
        <div class="badge-level-bar"><div class="badge-level-fill" style="width:${levelXp}%"></div></div>
      </div>
      ${earnedBadgesList.length ? `<div class="badge-grid-title">🏅 Earned badges (${earnedBadgesList.length}/${BADGES.length})</div>
      <div class="badge-grid">${earnedBadgesList.map(b => `<div class="badge-card badge-earned" title="${escapeHtml(b.desc)}">
        <div class="badge-icon">${b.icon}</div>
        <div class="badge-name">${escapeHtml(b.name)}</div>
      </div>`).join('')}</div>` : ''}
      <div class="badge-grid-title">🔒 Locked badges</div>
      <div class="badge-grid">${unearnedBadges.map(b => {
        const p = badgeProgress(b.id);
        const pct = p.max > 0 ? Math.round((p.cur / p.max) * 100) : 0;
        return `<div class="badge-card badge-locked" title="${escapeHtml(b.desc)}">
          <div class="badge-icon badge-icon-locked">${b.icon}</div>
          <div class="badge-name">${escapeHtml(b.name)}</div>
          <div class="badge-hint">${escapeHtml(b.hint)}</div>
          <div class="badge-prog-bg"><div class="badge-prog-fill" style="width:${pct}%"></div></div>
          <div class="badge-prog-label">${p.cur}/${p.max}</div>
        </div>`;
      }).join('')}</div>
    </div>`;

    return `<h2 class="section-title">Your Progress</h2>
      ${badgeShowcase}
      <div class="stats-grid">
        <div class="stat-card"><div class="stat-num" data-count="${totalAttempts}">${totalAttempts}</div><div class="stat-label">Questions answered</div></div>
        <div class="stat-card"><div class="stat-num" data-count="${accuracy}" data-suffix="%">${accuracy}%</div><div class="stat-label">Lifetime accuracy</div></div>
        <div class="stat-card"><div class="stat-num" data-count="${Object.keys(stats.questions).length}">${Object.keys(stats.questions).length}</div><div class="stat-label">Unique questions seen</div></div>
        <div class="stat-card"><div class="stat-num" data-count="${streak.current}">${streak.current}</div><div class="stat-label">🔥 Current streak</div></div>
        <div class="stat-card"><div class="stat-num" data-count="${streak.best}">${streak.best}</div><div class="stat-label">🏆 Best streak</div></div>
        <div class="stat-card"><div class="stat-num" data-count="${Storage.data.learn.bestCombo || 0}">${Storage.data.learn.bestCombo || 0}</div><div class="stat-label">🔥 Best combo</div></div>
        <div class="stat-card"><div class="stat-num" data-count="${Storage.data.learn.xp || 0}">${Storage.data.learn.xp || 0}</div><div class="stat-label">⚡ Total XP</div></div>
      </div>
      <div class="breakdown" style="background:var(--card);border:1px solid var(--border);padding:16px;border-radius:11px;margin-bottom:20px">
        <div class="breakdown-title">Accuracy by topic</div>${topicRows}
      </div>
      ${skillMapHtml ? `<div class="skill-map-section">
        <div class="skill-map-title">Skill map <span class="skill-map-legend"><span class="sml sml-green"></span>70%+ <span class="sml sml-amber"></span>50–69% <span class="sml sml-red"></span>&lt;50% <span class="sml sml-gray"></span>no data</span></div>
        <div class="skill-map-grid">${skillMapHtml}</div>
      </div>` : ''}
      <div class="reset-courses-section">
        <h3 class="reset-courses-heading">Reset progress by course</h3>
        <div class="reset-courses-btns">
          ${SUBJECT_REGISTRY.map(s => {
            const hasData = !!localStorage.getItem(subjectStorageKey(s.id));
            return `<button class="reset-course-btn${hasData ? '' : ' no-data'}" type="button" data-reset-subject="${escapeHtml(s.id)}"${hasData ? '' : ' disabled'}>
              <span class="rcb-flag">${escapeHtml(s.flag)}</span>
              <span class="rcb-name">${escapeHtml(s.name)}</span>
              <span class="rcb-status">${hasData ? '🗑 Reset' : 'No data'}</span>
            </button>`;
          }).join('')}
        </div>
      </div>`;
  }

  function animateCounters() {
    if (reducedMotion) return;
    document.querySelectorAll('.stat-num[data-count]').forEach(el => {
      const target = +el.dataset.count;
      const suffix = el.dataset.suffix || '';
      if (!Number.isFinite(target) || target === 0) return;
      const dur = 600, start = performance.now();
      function step(now) {
        const p = Math.min(1, (now - start) / dur);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * eased) + suffix;
        if (p < 1) requestAnimationFrame(step);
        else el.textContent = target + suffix;
      }
      el.textContent = '0' + suffix;
      requestAnimationFrame(step);
    });
  }

  /* ── QUIZ + CALCULATOR + KEYBOARD HINT ── */
  function renderKeyboardHintMCQ(answered) {
    return `<div class="kbd-hint" aria-hidden="true">
      <span><kbd>A</kbd>–<kbd>D</kbd> select</span><span class="kbd-sep">·</span>
      <span><kbd>Enter</kbd> or <kbd>Space</kbd> ${answered ? 'next' : 'to advance once answered'}</span>
    </div>`;
  }
  function renderCalculatorSidebar() {
    return `<aside class="calc-sidebar" aria-label="On-screen calculator">
      <div class="calc-title">🧮 Calculator</div>
      <div class="calc-display-wrap">
        <span class="calc-memory" id="calcMemoryIndicator" aria-hidden="true">${Calc.memory !== 0 ? 'M' : ''}</span>
        <div class="calc-display" id="calcDisplay" role="status" aria-live="polite">${escapeHtml(Calc.display)}</div>
      </div>
      <div class="calc-keys">
        <button class="calc-key calc-mem" data-calc="mc" type="button" aria-label="Memory clear">MC</button>
        <button class="calc-key calc-mem" data-calc="mr" type="button" aria-label="Memory recall">MR</button>
        <button class="calc-key calc-mem" data-calc="msub" type="button" aria-label="Memory subtract">M−</button>
        <button class="calc-key calc-mem" data-calc="madd" type="button" aria-label="Memory add">M+</button>
        <button class="calc-key calc-fn" data-calc="clear" type="button">C</button>
        <button class="calc-key calc-fn" data-calc="back" type="button" aria-label="Backspace">⌫</button>
        <button class="calc-key calc-fn" data-calc="pct" type="button">%</button>
        <button class="calc-key calc-fn" data-calc="sqrt" type="button" aria-label="Square root">√</button>
        <button class="calc-key" data-calc="num" data-val="7" type="button">7</button>
        <button class="calc-key" data-calc="num" data-val="8" type="button">8</button>
        <button class="calc-key" data-calc="num" data-val="9" type="button">9</button>
        <button class="calc-key calc-op" data-calc="op" data-val="/" type="button">÷</button>
        <button class="calc-key" data-calc="num" data-val="4" type="button">4</button>
        <button class="calc-key" data-calc="num" data-val="5" type="button">5</button>
        <button class="calc-key" data-calc="num" data-val="6" type="button">6</button>
        <button class="calc-key calc-op" data-calc="op" data-val="*" type="button">×</button>
        <button class="calc-key" data-calc="num" data-val="1" type="button">1</button>
        <button class="calc-key" data-calc="num" data-val="2" type="button">2</button>
        <button class="calc-key" data-calc="num" data-val="3" type="button">3</button>
        <button class="calc-key calc-op" data-calc="op" data-val="-" type="button">−</button>
        <button class="calc-key calc-fn" data-calc="sign" type="button" aria-label="Toggle sign">±</button>
        <button class="calc-key" data-calc="num" data-val="0" type="button">0</button>
        <button class="calc-key" data-calc="dot" type="button">.</button>
        <button class="calc-key calc-op" data-calc="op" data-val="+" type="button">+</button>
        <button class="calc-key calc-eq calc-eq-wide" data-calc="eq" type="button">=</button>
      </div>
      <button class="calc-use" id="calcUse" type="button">↳ Use this value</button>
      <p class="calc-hint">Result drops into the answer box.</p>
    </aside>`;
  }

  function renderQuiz() { return State.mode === 'mock' ? renderMockQuiz() : renderPracticeQuiz(); }

  function renderPracticeQuiz() {
    const q = State.questions[State.current];
    if (isDragDrop(q)) return renderDragDropQuiz(q);
    if (isTableFill(q)) return renderTableFillQuiz(q);
    if (isScenario(q)) return renderScenarioQuiz(q);
    if (isGapFill(q)) return renderGapFillQuiz(q);
    if (isWordOrder(q)) return renderWordOrderQuiz(q);
    if (isListen(q)) return renderListenQuiz(q);
    return renderPracticeMcqOrNumeric(q);
  }

  function renderPracticeMcqOrNumeric(q) {
    const total = State.questions.length;
    const pct = ((State.current + 1) / total * 100).toFixed(0);
    const topic = window.TOPICS.find(t => t.id === q.topic);
    const numeric = isNumeric(q);
    let bodyHtml = '', feedbackHtml = '';

    if (numeric) {
      const answered = State.answered !== null;
      const correct = answered && isNumericCorrect(q, State.answered);
      const draftValue = answered ? formatNumericValue(q, State.answered) : escapeHtml(State.numericDraft || '');
      bodyHtml = `<div class="numeric-input-wrap">
        <label for="numericAnswer" class="numeric-label">Your answer${q.unit ? ` (in ${escapeHtml(q.unit)})` : ''}:</label>
        <div class="numeric-input-row">
          <input type="text" id="numericAnswer" class="numeric-input ${answered ? (correct ? 'is-correct' : 'is-wrong') : ''}"
                 inputmode="decimal" autocomplete="off" spellcheck="false"
                 value="${draftValue}" ${answered ? 'disabled' : ''}
                 placeholder="Type or use the calculator →" aria-describedby="numericError">
          ${answered ? '' : `<button class="next-btn" id="submitNumericBtn" type="button">Submit ✓</button>`}
        </div>
        <div class="numeric-error" id="numericError" role="alert"></div>
        <div class="kbd-hint" aria-hidden="true">
          <span><kbd>0</kbd>–<kbd>9</kbd> type</span><span class="kbd-sep">·</span>
          <span><kbd>Enter</kbd> ${answered ? 'next' : 'submit'}</span>
        </div>
      </div>`;
      if (answered) {
        const steps = q.steps && q.steps.length ? q.steps : null;
        const stepsHtml = steps ? `<details class="worked-steps">
          <summary>📐 Show working</summary>
          <ol class="steps-list">${steps.map(s => `<li>${escapeHtml(s)}</li>`).join('')}</ol>
        </details>` : '';
        feedbackHtml = `<div class="feedback ${correct ? 'correct' : 'wrong'} fade-in" role="status" aria-live="polite">
          <strong>${correct ? '✅ Correct' : '❌ Incorrect'}</strong><br>
          ${!correct ? `<span>Your answer: ${escapeHtml(formatNumericValue(q, State.answered))}</span><br><span>Correct answer: ${escapeHtml(formatNumericValue(q, q.answer))}</span><br><br>` : ''}
          <em>${escapeHtml(q.exp)}</em>
        </div>
        ${stepsHtml}
        <button class="next-btn" id="nextBtn" type="button">${State.current + 1 >= total ? 'See Results ✓' : 'Next Question →'}</button>`;
      }
    } else {
      const answered = State.answered !== null;
      bodyHtml = `<div class="options" role="radiogroup" aria-label="Answer options">
        ${q.opts.map((opt, i) => {
          let cls = '';
          if (answered) {
            if (i === q.ans) cls = 'correct';
            else if (i === State.answered && State.answered !== q.ans) cls = 'wrong';
          }
          return `<button class="option-btn ${cls}" type="button" data-opt="${i}" ${answered ? 'disabled' : ''} role="radio" aria-checked="${State.answered === i}">
            <span class="option-label" aria-hidden="true">${LETTERS[i]}</span><span>${escapeHtml(opt)}</span>
          </button>`;
        }).join('')}
      </div>${renderKeyboardHintMCQ(answered)}`;
      if (answered) {
        const correct = State.answered === q.ans;
        feedbackHtml = `<div class="feedback ${correct ? 'correct' : 'wrong'} fade-in" role="status" aria-live="polite">
          <strong>${correct ? '✅ Correct' : '❌ Incorrect'}</strong><br>
          ${!correct ? `<span>Your answer: ${escapeHtml(q.opts[State.answered])}</span><br><span>Correct answer: ${escapeHtml(q.opts[q.ans])}</span><br><br>` : ''}
          <em>${escapeHtml(q.exp)}</em>
        </div>
        <button class="next-btn" id="nextBtn" type="button">${State.current + 1 >= total ? 'See Results ✓' : 'Next Question →'}</button>`;
      }
    }

    const flagged = Storage.isFlagged(q.id);
    const confident = Storage.isConfident(q.id);
    const comboEl = (State.combo >= 3 && State.mode === 'practice') ? `<span class="combo-pill combo-${Math.min(State.combo, 10) >= 10 ? 'mega' : State.combo >= 5 ? 'hot' : 'warm'}">🔥 ${State.combo}x combo</span>` : '';
    return `<div class="container">
      <button class="back-btn" id="exitBtn" type="button">← Back to topics</button>
      <div class="quiz-layout ${numeric ? 'has-calc' : ''}">
        <div class="quiz-container slide-in">
          <div class="quiz-header">
            <span class="topic-pill">${topic.icon} ${escapeHtml(topic.short)}</span>
            ${numeric ? '<span class="numeric-pill">🧮 Numeric</span>' : ''}
            ${q._flipped ? '<span class="flip-pill">🔄 EN→FR</span>' : ''}
            ${comboEl}
            <button class="flag-btn ${flagged ? 'is-flagged' : ''}" id="flagBtn" type="button" aria-pressed="${flagged}" aria-label="${flagged ? 'Unflag this question' : 'Flag this question for review'}" title="${flagged ? 'Flagged — click to remove' : 'Flag for review'}">${flagged ? '⭐' : '☆'}</button>
            <button class="confident-btn${confident ? ' is-confident' : ''}" id="confidentBtn" type="button" aria-pressed="${confident}" aria-label="${confident ? 'Unmark as confident' : 'Mark as confident'}" title="${confident ? 'Confident — click to unmark' : 'Mark as confident — hides from future practice'}">✓</button>
            <div class="progress-wrap">
              <div class="progress-bar-bg" role="progressbar" aria-valuenow="${State.current + 1}" aria-valuemin="0" aria-valuemax="${total}"><div class="progress-bar" style="width:${pct}%"></div></div>
              <div class="progress-label">${State.current + 1} of ${total} completed</div>
            </div>
            <span class="q-counter">Q${State.current + 1}/${total}</span>
          </div>
          <div class="question-text">${escapeHtml(q.q)}</div>
          ${_activeSubjectId === 'french' && isFrToEnMcq(q) ? `<button class="tts-q-btn" id="ttsQBtn" type="button" aria-label="Hear French pronunciation" title="Listen to pronunciation">🔊 ${escapeHtml(extractFrenchTerm(q) || '')}</button>` : ''}
          ${(() => {
            if (State.mode !== 'practice' || State.answered !== null) return '';
            const sk = skillById(q.skill);
            if (!sk) return '';
            const h1 = State.hintLevel >= 1 ? `<div class="hint-text"><strong>${escapeHtml(sk.name)}</strong>: ${escapeHtml(sk.hint)}</div>` : '';
            const h2 = State.hintLevel >= 2 && sk.formula ? `<div class="hint-formula">📐 ${escapeHtml(sk.formula)}</div>` : '';
            return `<div class="hint-area">${h1}${h2}${State.hintLevel < 2 ? `<button class="hint-btn" id="hintBtn" type="button">💡 ${State.hintLevel === 0 ? 'Show hint' : 'Show formula'}</button>` : ''}</div>`;
          })()}
          ${bodyHtml}${feedbackHtml}
        </div>
        ${numeric && _activeSubjectId === 'aat' ? renderCalculatorSidebar() : ''}
      </div>
    </div>`;
  }

  function renderDragDropQuiz(q) {
    const total = State.questions.length;
    const pct = ((State.current + 1) / total * 100).toFixed(0);
    const topic = window.TOPICS.find(t => t.id === q.topic) || { icon: '🧩', short: 'Mixed' };
    const answered = State.answered !== null;
    const flagged = Storage.isFlagged(q.id);
    const confident = Storage.isConfident(q.id);
    const matchedCount = Object.keys(State.ddMap).length;
    const totalPairs = q.pairs.length;
    // right shuffled-index → which left item it is assigned to
    const rightAssignedTo = {};
    for (const leftIdx of Object.keys(State.ddMap)) {
      rightAssignedTo[State.ddMap[leftIdx]] = +leftIdx;
    }
    const leftBoxes = q.pairs.map((p, leftIdx) => {
      const isSel = State.ddSelectedLeft === leftIdx;
      const paired = State.ddMap[leftIdx];
      const isPaired = paired != null;
      let resultCls = '';
      if (answered) resultCls = State.answered.perPair[leftIdx].ok ? ' is-correct' : ' is-wrong';
      const colourCls = (isPaired && !answered) ? ' dd-c' + (leftIdx % 6) : '';
      const pairedText = isPaired ? q.pairs[q.shuffledRights[paired]].right : '';
      return `<button class="dd-left${isSel ? ' is-selected' : ''}${isPaired ? ' is-paired' : ''}${colourCls}${resultCls}" type="button" data-dd-left="${leftIdx}" ${answered ? 'disabled' : ''} aria-pressed="${isSel}">
        <div class="dd-left-main">
          <span class="dd-tag">${leftIdx + 1}</span>
          <span class="dd-text">${escapeHtml(p.left)}</span>
          ${!isPaired && !answered ? `<span class="dd-hint-tag">${isSel ? 'now pick a match →' : 'tap to select'}</span>` : ''}
        </div>
        ${isPaired ? `<div class="dd-pair-line">
          <span class="dd-pair-arrow" aria-hidden="true">↳ matched with</span>
          <span class="dd-pair-text">${escapeHtml(pairedText)}</span>
          ${!answered ? `<span class="dd-clear" data-dd-clear="${leftIdx}" title="Clear this match" aria-hidden="true">✕</span>` : ''}
        </div>` : ''}
      </button>`;
    }).join('');
    const rightBoxes = q.shuffledRights.map((origLeftIdx, shufIdx) => {
      const usedByLeft = rightAssignedTo[shufIdx];
      const isUsed = usedByLeft !== undefined;
      let resultCls = '';
      if (answered && isUsed) resultCls = State.answered.perPair[usedByLeft].ok ? ' is-correct' : ' is-wrong';
      const colourCls = (isUsed && !answered) ? ' dd-c' + (usedByLeft % 6) : '';
      const badge = isUsed
        ? `<span class="dd-right-badge" aria-label="Matched with item ${usedByLeft + 1}">${usedByLeft + 1}</span>`
        : `<span class="dd-right-badge dd-right-badge-empty" aria-hidden="true"></span>`;
      return `<button class="dd-right${isUsed ? ' is-used' : ''}${colourCls}${resultCls}" type="button" data-dd-right="${shufIdx}" ${answered ? 'disabled' : ''}>
        <span class="dd-right-text">${escapeHtml(q.pairs[origLeftIdx].right)}</span>
        ${badge}
      </button>`;
    }).join('');
    let feedbackHtml = '';
    if (answered) {
      const ok = State.answered.correct;
      feedbackHtml = `<div class="feedback ${ok ? 'correct' : 'wrong'} fade-in" role="status" aria-live="polite">
        <strong>${ok ? '✅ All correct' : '❌ ' + State.answered.score + ' of ' + State.answered.total + ' correct'}</strong><br>
        ${!ok ? '<span>Review matches above (green = correct, red = wrong).</span><br><br>' : ''}
        <em>${escapeHtml(q.exp)}</em>
      </div>
      <button class="next-btn" id="nextBtn" type="button">${State.current + 1 >= total ? 'See Results ✓' : 'Next Question →'}</button>`;
    }
    const statusLine = answered ? '' : `<div class="dd-status">
      <span class="dd-status-count">${matchedCount} of ${totalPairs} matched</span>
      <span class="dd-status-hint">Click an item on the left, then click its match on the right. Matched pairs share a colour and number.</span>
    </div>`;
    return `<div class="container">
      <button class="back-btn" id="exitBtn" type="button">← Back to topics</button>
      <div class="quiz-layout">
        <div class="quiz-container slide-in">
          <div class="quiz-header">
            <span class="topic-pill">${topic.icon} ${escapeHtml(topic.short)}</span>
            <span class="dd-pill">🔗 Match</span>
            <button class="flag-btn ${flagged ? 'is-flagged' : ''}" id="flagBtn" type="button" aria-pressed="${flagged}" aria-label="${flagged ? 'Unflag' : 'Flag for review'}">${flagged ? '⭐' : '☆'}</button>
            <button class="confident-btn${confident ? ' is-confident' : ''}" id="confidentBtn" type="button" aria-pressed="${confident}" aria-label="${confident ? 'Unmark as confident' : 'Mark as confident'}" title="${confident ? 'Confident — click to unmark' : 'Mark as confident — hides from future practice'}">✓</button>
            <div class="progress-wrap">
              <div class="progress-bar-bg" role="progressbar" aria-valuenow="${State.current + 1}" aria-valuemin="0" aria-valuemax="${total}"><div class="progress-bar" style="width:${pct}%"></div></div>
              <div class="progress-label">${State.current + 1} of ${total} completed</div>
            </div>
            <span class="q-counter">Q${State.current + 1}/${total}</span>
          </div>
          <div class="question-text">${escapeHtml(q.q)}</div>
          ${statusLine}
          <div class="dd-grid">
            <div class="dd-col">
              <div class="dd-col-title">Items</div>
              ${leftBoxes}
            </div>
            <div class="dd-col">
              <div class="dd-col-title">Match to…</div>
              ${rightBoxes}
            </div>
          </div>
          ${!answered ? `<button class="next-btn" id="submitDragDropBtn" type="button">Submit matches ✓</button>` : ''}
          ${feedbackHtml}
        </div>
      </div>
    </div>`;
  }

  function renderTableFillQuiz(q) {
    const total = State.questions.length;
    const pct = ((State.current + 1) / total * 100).toFixed(0);
    const topic = window.TOPICS.find(t => t.id === q.topic) || { icon: '📐', short: 'Mixed' };
    const answered = State.answered !== null;
    const flagged = Storage.isFlagged(q.id);
    const confident = Storage.isConfident(q.id);
    const table = q.table;
    const blankByCell = {};
    table.blanks.forEach((b, i) => { blankByCell[b.row + '|' + b.col] = i; });
    const tableHtml = `<table class="tf-table">
      ${table.columns ? `<thead><tr>${table.columns.map(c => `<th>${escapeHtml(c)}</th>`).join('')}</tr></thead>` : ''}
      <tbody>
        ${table.rows.map((row, ri) => `<tr>${row.map((cell, ci) => {
          const blankIdx = blankByCell[ri + '|' + ci];
          if (blankIdx == null) return `<td>${escapeHtml(String(cell))}</td>`;
          if (answered) {
            const r = State.answered.perBlank[blankIdx];
            const cls = r.ok ? 'tf-ok' : 'tf-wrong';
            const entered = r.entered == null ? '—' : Number(r.entered).toLocaleString('en-GB');
            return `<td class="${cls}">${entered}${!r.ok ? `<div class="tf-correct">✓ ${Number(r.expected).toLocaleString('en-GB')}</div>` : ''}</td>`;
          }
          const val = State.tfDraft[blankIdx] != null ? String(State.tfDraft[blankIdx]) : '';
          return `<td class="tf-blank"><input type="text" class="tf-input" inputmode="decimal" autocomplete="off" data-tf-blank="${blankIdx}" value="${escapeHtml(val)}" aria-label="Blank ${blankIdx + 1}" placeholder="?"></td>`;
        }).join('')}</tr>`).join('')}
      </tbody>
    </table>`;
    let feedbackHtml = '';
    if (answered) {
      const ok = State.answered.correct;
      feedbackHtml = `<div class="feedback ${ok ? 'correct' : 'wrong'} fade-in" role="status" aria-live="polite">
        <strong>${ok ? '✅ All correct' : '❌ ' + State.answered.score + ' of ' + State.answered.total + ' correct'}</strong><br>
        <em>${escapeHtml(q.exp)}</em>
      </div>
      <button class="next-btn" id="nextBtn" type="button">${State.current + 1 >= total ? 'See Results ✓' : 'Next Question →'}</button>`;
    }
    return `<div class="container">
      <button class="back-btn" id="exitBtn" type="button">← Back to topics</button>
      <div class="quiz-layout has-calc">
        <div class="quiz-container slide-in">
          <div class="quiz-header">
            <span class="topic-pill">${topic.icon} ${escapeHtml(topic.short)}</span>
            <span class="tf-pill">📋 Table</span>
            <button class="flag-btn ${flagged ? 'is-flagged' : ''}" id="flagBtn" type="button" aria-pressed="${flagged}" aria-label="${flagged ? 'Unflag' : 'Flag for review'}">${flagged ? '⭐' : '☆'}</button>
            <button class="confident-btn${confident ? ' is-confident' : ''}" id="confidentBtn" type="button" aria-pressed="${confident}" aria-label="${confident ? 'Unmark as confident' : 'Mark as confident'}" title="${confident ? 'Confident — click to unmark' : 'Mark as confident — hides from future practice'}">✓</button>
            <div class="progress-wrap">
              <div class="progress-bar-bg" role="progressbar" aria-valuenow="${State.current + 1}" aria-valuemin="0" aria-valuemax="${total}"><div class="progress-bar" style="width:${pct}%"></div></div>
              <div class="progress-label">${State.current + 1} of ${total} completed</div>
            </div>
            <span class="q-counter">Q${State.current + 1}/${total}</span>
          </div>
          <div class="question-text">${escapeHtml(q.q)}</div>
          ${table.title ? `<div class="tf-title">${escapeHtml(table.title)}</div>` : ''}
          ${tableHtml}
          ${!answered ? `<button class="next-btn" id="submitTableFillBtn" type="button">Submit answers ✓</button>` : ''}
          ${feedbackHtml}
        </div>
        ${_activeSubjectId === 'aat' ? renderCalculatorSidebar() : ''}
      </div>
    </div>`;
  }

  function renderScenarioQuiz(q) {
    const total = State.questions.length;
    const pct = ((State.current + 1) / total * 100).toFixed(0);
    const topic = window.TOPICS.find(t => t.id === q.topic) || { icon: '📚', short: 'Scenario' };
    const answered = State.answered !== null;
    const flagged = Storage.isFlagged(q.id);
    const confident = Storage.isConfident(q.id);
    const partsHtml = q.parts.map((part, i) => {
      const draft = State.scDraft[i];
      let body = '';
      const partResult = answered ? State.answered.perPart[i] : null;
      if (isNumeric(part)) {
        const dispVal = answered ? (partResult.chosenText) : (draft != null ? draft : '');
        const cls = answered ? (partResult.ok ? 'is-correct' : 'is-wrong') : '';
        body = `<div class="sc-part-body">
          <label class="numeric-label">Your answer${part.unit ? ' (in ' + escapeHtml(part.unit) + ')' : ''}:</label>
          <input type="text" class="numeric-input ${cls}" inputmode="decimal" autocomplete="off" data-sc-part="${i}" value="${escapeHtml(String(dispVal))}" ${answered ? 'disabled' : ''} placeholder="Enter a number">
          ${answered && !partResult.ok ? `<div class="sc-correct">Correct answer: ${escapeHtml(partResult.correctText)}</div>` : ''}
        </div>`;
      } else {
        const sel = draft != null ? Number(draft) : null;
        body = `<div class="sc-part-body options" role="radiogroup">
          ${part.opts.map((opt, oi) => {
            let cls = '';
            if (answered) {
              if (oi === part.ans) cls = 'correct';
              else if (sel === oi && sel !== part.ans) cls = 'wrong';
            } else if (sel === oi) cls = 'selected';
            return `<button class="option-btn ${cls}" type="button" data-sc-opt="${i}-${oi}" ${answered ? 'disabled' : ''} role="radio" aria-checked="${sel === oi}">
              <span class="option-label" aria-hidden="true">${LETTERS[oi]}</span><span>${escapeHtml(opt)}</span>
            </button>`;
          }).join('')}
        </div>`;
      }
      return `<div class="sc-part ${answered ? (partResult.ok ? 'sc-ok' : 'sc-wrong') : ''}">
        <div class="sc-part-head">
          <span class="sc-part-num">Part ${i + 1}</span>
          ${answered ? `<span class="sc-part-result">${partResult.ok ? '✓ Correct' : '✗ Incorrect'}</span>` : ''}
        </div>
        <div class="sc-part-question">${escapeHtml(part.q)}</div>
        ${body}
      </div>`;
    }).join('');
    let feedbackHtml = '';
    if (answered) {
      const ok = State.answered.correct;
      feedbackHtml = `<div class="feedback ${ok ? 'correct' : 'wrong'} fade-in" role="status" aria-live="polite">
        <strong>${ok ? '✅ All parts correct' : '📋 Scored ' + State.answered.score + ' of ' + State.answered.total}</strong><br>
        <em>${escapeHtml(q.exp || 'Each part is marked individually above.')}</em>
      </div>
      <button class="next-btn" id="nextBtn" type="button">${State.current + 1 >= total ? 'See Results ✓' : 'Next Question →'}</button>`;
    }
    return `<div class="container">
      <button class="back-btn" id="exitBtn" type="button">← Back to topics</button>
      <div class="quiz-layout has-calc">
        <div class="quiz-container slide-in">
          <div class="quiz-header">
            <span class="topic-pill">${topic.icon} ${escapeHtml(topic.short)}</span>
            <span class="sc-pill">📖 Scenario</span>
            <button class="flag-btn ${flagged ? 'is-flagged' : ''}" id="flagBtn" type="button" aria-pressed="${flagged}" aria-label="${flagged ? 'Unflag' : 'Flag for review'}">${flagged ? '⭐' : '☆'}</button>
            <button class="confident-btn${confident ? ' is-confident' : ''}" id="confidentBtn" type="button" aria-pressed="${confident}" aria-label="${confident ? 'Unmark as confident' : 'Mark as confident'}" title="${confident ? 'Confident — click to unmark' : 'Mark as confident — hides from future practice'}">✓</button>
            <div class="progress-wrap">
              <div class="progress-bar-bg" role="progressbar" aria-valuenow="${State.current + 1}" aria-valuemin="0" aria-valuemax="${total}"><div class="progress-bar" style="width:${pct}%"></div></div>
              <div class="progress-label">${State.current + 1} of ${total} completed</div>
            </div>
            <span class="q-counter">Q${State.current + 1}/${total}</span>
          </div>
          <div class="sc-setup">
            <div class="sc-setup-label">Scenario</div>
            <div class="sc-setup-body">${escapeHtml(q.setup)}</div>
          </div>
          ${q.q ? `<div class="question-text">${escapeHtml(q.q)}</div>` : ''}
          <div class="sc-parts">${partsHtml}</div>
          ${!answered ? `<button class="next-btn" id="submitScenarioBtn" type="button">Submit all parts ✓</button>` : ''}
          ${feedbackHtml}
        </div>
        ${_activeSubjectId === 'aat' ? renderCalculatorSidebar() : ''}
      </div>
    </div>`;
  }

  function renderGapFillQuiz(q) {
    const total = State.questions.length;
    const pct = ((State.current + 1) / total * 100).toFixed(0);
    const topic = window.TOPICS.find(t => t.id === q.topic) || { icon: '✏️', short: 'Mixed' };
    const answered = State.answered !== null;
    const flagged = Storage.isFlagged(q.id);
    const confident = Storage.isConfident(q.id);
    // Build the sentence, splitting the template on {N} gap markers
    const parts = q.template.split(/(\{\d+\})/);
    const sentence = parts.map(part => {
      const m = part.match(/^\{(\d+)\}$/);
      if (!m) return escapeHtml(part);
      const gapIdx = +m[1];
      const gap = q.gaps[gapIdx];
      const sel = State.gfDraft[gapIdx];
      if (answered) {
        const r = State.answered.perGap[gapIdx];
        const chosenText = (sel != null && sel !== '') ? gap.options[Number(sel)] : '—';
        return `<span class="gf-result ${r.ok ? 'gf-ok' : 'gf-wrong'}">${escapeHtml(chosenText)}${!r.ok ? ' <span class="gf-correct">(' + escapeHtml(gap.options[gap.answer]) + ')</span>' : ''}</span>`;
      }
      return `<select class="gf-select" data-gf-gap="${gapIdx}" aria-label="Gap ${gapIdx + 1}">
        <option value="">— choose —</option>
        ${gap.options.map((o, i) => `<option value="${i}" ${String(sel) === String(i) ? 'selected' : ''}>${escapeHtml(o)}</option>`).join('')}
      </select>`;
    }).join('');
    let feedbackHtml = '';
    if (answered) {
      const ok = State.answered.correct;
      feedbackHtml = `<div class="feedback ${ok ? 'correct' : 'wrong'} fade-in" role="status" aria-live="polite">
        <strong>${ok ? '✅ All gaps correct' : '❌ ' + State.answered.score + ' of ' + State.answered.total + ' correct'}</strong><br>
        <em>${escapeHtml(q.exp)}</em>
      </div>
      <button class="next-btn" id="nextBtn" type="button">${State.current + 1 >= total ? 'See Results ✓' : 'Next Question →'}</button>`;
    }
    return `<div class="container">
      <button class="back-btn" id="exitBtn" type="button">← Back to topics</button>
      <div class="quiz-layout">
        <div class="quiz-container slide-in">
          <div class="quiz-header">
            <span class="topic-pill">${topic.icon} ${escapeHtml(topic.short)}</span>
            <span class="gf-pill">✏️ Fill the gaps</span>
            <button class="flag-btn ${flagged ? 'is-flagged' : ''}" id="flagBtn" type="button" aria-pressed="${flagged}" aria-label="${flagged ? 'Unflag' : 'Flag for review'}">${flagged ? '⭐' : '☆'}</button>
            <button class="confident-btn${confident ? ' is-confident' : ''}" id="confidentBtn" type="button" aria-pressed="${confident}" aria-label="${confident ? 'Unmark as confident' : 'Mark as confident'}" title="${confident ? 'Confident — click to unmark' : 'Mark as confident — hides from future practice'}">✓</button>
            <div class="progress-wrap">
              <div class="progress-bar-bg" role="progressbar" aria-valuenow="${State.current + 1}" aria-valuemin="0" aria-valuemax="${total}"><div class="progress-bar" style="width:${pct}%"></div></div>
              <div class="progress-label">${State.current + 1} of ${total} completed</div>
            </div>
            <span class="q-counter">Q${State.current + 1}/${total}</span>
          </div>
          ${q.q ? `<div class="question-text">${escapeHtml(q.q)}</div>` : ''}
          <div class="gf-sentence">${sentence}</div>
          ${!answered ? `<button class="next-btn" id="submitGapFillBtn" type="button">Submit answers ✓</button>` : ''}
          ${feedbackHtml}
        </div>
      </div>
    </div>`;
  }

  function renderWordOrderQuiz(q) {
    const total = State.questions.length;
    const pct = ((State.current + 1) / total * 100).toFixed(0);
    const topic = window.TOPICS.find(t => t.id === q.topic) || { icon: '🔀', short: 'Ordre' };
    const answered = State.answered !== null;
    const flagged = Storage.isFlagged(q.id);
    const confident = Storage.isConfident(q.id);
    const placed = State.woDraft;
    const placedSet = new Set(placed);
    const bankIndices = q.words.map((w, i) => i).filter(i => !placedSet.has(i));
    const answerHtml = Array.from({ length: q.words.length }, (_, pos) => {
      if (pos < placed.length) {
        const wordIdx = placed[pos];
        const word = q.words[wordIdx];
        let cls = 'wo-word wo-placed';
        if (answered) cls += q.answer[pos] === word ? ' wo-correct' : ' wo-wrong';
        return `<button class="${cls}" type="button" data-wo-placed="${pos}" ${answered ? 'disabled' : ''}>${escapeHtml(word)}</button>`;
      }
      return `<div class="wo-slot">___</div>`;
    }).join('');
    const bankHtml = bankIndices.length
      ? bankIndices.map(i => `<button class="wo-word wo-bank-word" type="button" data-wo-bank="${i}" ${answered ? 'disabled' : ''}>${escapeHtml(q.words[i])}</button>`).join('')
      : (answered ? '' : '<span class="wo-bank-empty">All words placed</span>');
    let feedbackHtml = '';
    if (answered) {
      const ok = State.answered.correct;
      feedbackHtml = `<div class="feedback ${ok ? 'correct' : 'wrong'} fade-in" role="status" aria-live="polite">
        <strong>${ok ? '✅ Correct!' : '❌ Incorrect'}</strong><br>
        ${!ok ? `<div class="wo-correct-sentence">Correct: <strong>${escapeHtml(q.answer.join(' '))}</strong></div>` : ''}
        <em>${escapeHtml(q.exp || '')}</em>
      </div>
      <button class="next-btn" id="nextBtn" type="button">${State.current + 1 >= total ? 'See Results ✓' : 'Next Question →'}</button>`;
    }
    return `<div class="container">
      <button class="back-btn" id="exitBtn" type="button">← Back to topics</button>
      <div class="quiz-layout">
        <div class="quiz-container slide-in">
          <div class="quiz-header">
            <span class="topic-pill">${topic.icon} ${escapeHtml(topic.short)}</span>
            <span class="sc-pill">🔀 Word order</span>
            <button class="flag-btn ${flagged ? 'is-flagged' : ''}" id="flagBtn" type="button" aria-pressed="${flagged}" aria-label="${flagged ? 'Unflag' : 'Flag'}">${flagged ? '⭐' : '☆'}</button>
            <button class="confident-btn${confident ? ' is-confident' : ''}" id="confidentBtn" type="button" aria-pressed="${confident}" title="Mark as confident">✓</button>
            <div class="progress-wrap">
              <div class="progress-bar-bg" role="progressbar" aria-valuenow="${State.current + 1}" aria-valuemin="0" aria-valuemax="${total}"><div class="progress-bar" style="width:${pct}%"></div></div>
              <div class="progress-label">${State.current + 1} of ${total} completed</div>
            </div>
            <span class="q-counter">Q${State.current + 1}/${total}</span>
          </div>
          <div class="question-text">${escapeHtml(q.q)}</div>
          <p class="wo-hint">Tap words from the bank to build the sentence. Tap a placed word to remove it.</p>
          <div class="wo-answer-area">${answerHtml}</div>
          <div class="wo-bank">${bankHtml}</div>
          ${!answered ? `<button class="next-btn" id="submitWordOrderBtn" type="button" ${placed.length < q.words.length ? 'disabled' : ''}>Submit ✓</button>` : ''}
          ${feedbackHtml}
        </div>
      </div>
    </div>`;
  }

  function renderListenQuiz(q) {
    const total = State.questions.length;
    const pct = ((State.current + 1) / total * 100).toFixed(0);
    const topic = window.TOPICS.find(t => t.id === q.topic) || { icon: '🎧', short: 'Écoute' };
    const answered = State.answered !== null;
    const flagged = Storage.isFlagged(q.id);
    const confident = Storage.isConfident(q.id);
    const comboEl = (State.combo >= 3 && State.mode === 'practice') ? `<span class="combo-pill combo-${Math.min(State.combo,10)>=10?'mega':State.combo>=5?'hot':'warm'}">🔥 ${State.combo}x combo</span>` : '';
    const optionsHtml = `<div class="options" role="radiogroup" aria-label="Answer options">
      ${q.opts.map((opt, i) => {
        let cls = '';
        if (answered) {
          if (i === q.ans) cls = 'correct';
          else if (i === State.answered && State.answered !== q.ans) cls = 'wrong';
        }
        return `<button class="option-btn ${cls}" type="button" data-opt="${i}" ${answered ? 'disabled' : ''} role="radio" aria-checked="${State.answered === i}">
          <span class="option-label" aria-hidden="true">${LETTERS[i]}</span><span>${escapeHtml(opt)}</span>
        </button>`;
      }).join('')}
    </div>${renderKeyboardHintMCQ(answered)}`;
    let feedbackHtml = '';
    if (answered) {
      const correct = State.answered === q.ans;
      feedbackHtml = `<div class="feedback ${correct ? 'correct' : 'wrong'} fade-in" role="status" aria-live="polite">
        <strong>${correct ? '✅ Correct' : '❌ Incorrect'}</strong><br>
        ${!correct ? `<span>You chose: ${escapeHtml(q.opts[State.answered])}</span><br><span>Correct: ${escapeHtml(q.opts[q.ans])}</span><br><br>` : ''}
        <em>${escapeHtml(q.exp)}</em>
      </div>
      <button class="next-btn" id="nextBtn" type="button">${State.current + 1 >= total ? 'See Results ✓' : 'Next Question →'}</button>`;
    }
    return `<div class="container">
      <button class="back-btn" id="exitBtn" type="button">← Back to topics</button>
      <div class="quiz-layout">
        <div class="quiz-container slide-in">
          <div class="quiz-header">
            <span class="topic-pill">${topic.icon} ${escapeHtml(topic.short)}</span>
            <span class="listen-pill">🎧 Écoute</span>
            ${comboEl}
            <button class="flag-btn ${flagged ? 'is-flagged' : ''}" id="flagBtn" type="button" aria-pressed="${flagged}" title="${flagged ? 'Flagged' : 'Flag for review'}">${flagged ? '⭐' : '☆'}</button>
            <button class="confident-btn${confident ? ' is-confident' : ''}" id="confidentBtn" type="button" aria-pressed="${confident}" title="${confident ? 'Unmark confident' : 'Mark as confident'}">✓</button>
            <div class="progress-wrap">
              <div class="progress-bar-bg" role="progressbar" aria-valuenow="${State.current + 1}" aria-valuemin="0" aria-valuemax="${total}"><div class="progress-bar" style="width:${pct}%"></div></div>
              <div class="progress-label">${State.current + 1} of ${total} completed</div>
            </div>
            <span class="q-counter">Q${State.current + 1}/${total}</span>
          </div>
          <div class="listen-prompt">
            <button class="listen-play-btn" id="listenPlayBtn" type="button" aria-label="Play audio clip">🔊 Tap to Listen</button>
            <p class="listen-hint">${escapeHtml(q.q || 'What did you hear?')}</p>
            ${answered ? `<button class="tts-replay-btn" id="ttsReplayBtn" type="button" aria-label="Replay audio">↺ Replay</button>` : ''}
          </div>
          ${optionsHtml}${feedbackHtml}
        </div>
      </div>
    </div>`;
  }

  function renderMockQuiz() {
    const q = State.questions[State.current];
    const total = State.questions.length;
    const pct = ((State.current + 1) / total * 100).toFixed(0);
    const topic = window.TOPICS.find(t => t.id === q.topic);
    const response = State.answers[State.current];
    const remaining = State.mockEndTime - Date.now();
    const timerCls = remaining < MOCK_DANGER_MS ? ' danger' : remaining < MOCK_WARN_MS ? ' warn' : '';
    const answeredCount = State.answers.filter(a => a !== null).length;
    const isFirst = State.current === 0;
    const isLast = State.current + 1 >= total;
    const numeric = isNumeric(q);
    let bodyHtml;
    if (numeric) {
      bodyHtml = `<div class="numeric-input-wrap">
        <label for="numericAnswer" class="numeric-label">Your answer${q.unit ? ` (in ${escapeHtml(q.unit)})` : ''}:</label>
        <div class="numeric-input-row">
          <input type="text" id="numericAnswer" class="numeric-input"
                 inputmode="decimal" autocomplete="off" spellcheck="false"
                 value="${escapeHtml(response == null ? '' : String(response))}"
                 placeholder="Type or use the calculator →">
        </div>
        <div class="kbd-hint" aria-hidden="true">
          <span><kbd>0</kbd>–<kbd>9</kbd> type</span><span class="kbd-sep">·</span>
          <span><kbd>Enter</kbd> next question</span>
        </div>
      </div>`;
    } else {
      bodyHtml = `<div class="options" role="radiogroup" aria-label="Answer options">
        ${q.opts.map((opt, i) => `<button class="option-btn ${response === i ? 'selected' : ''}" type="button" data-opt="${i}" role="radio" aria-checked="${response === i}">
          <span class="option-label" aria-hidden="true">${LETTERS[i]}</span><span>${escapeHtml(opt)}</span>
        </button>`).join('')}
      </div>${renderKeyboardHintMCQ(true)}`;
    }
    const flagged = Storage.isFlagged(q.id);
    const confident = Storage.isConfident(q.id);
    const navCell = (i) => {
      const qq = State.questions[i];
      const answered = State.answers[i] !== null && State.answers[i] !== '';
      const isCurrent = i === State.current;
      const isFlag = Storage.isFlagged(qq.id);
      let cls = 'nav-cell';
      if (isCurrent) cls += ' current';
      else if (answered) cls += ' answered';
      if (isFlag) cls += ' flagged';
      return `<button class="${cls}" type="button" data-jump="${i}" aria-label="Jump to Q${i+1}${answered ? ', answered' : ''}${isFlag ? ', flagged' : ''}" aria-current="${isCurrent ? 'true' : 'false'}">${i+1}${isFlag ? '<span class="nav-flag" aria-hidden="true">⭐</span>' : ''}</button>`;
    };
    // Group navigator cells by task
    const taskGroups = [];
    State.questions.forEach((qq, i) => {
      const tIdx = qq._task != null ? qq._task : 0;
      (taskGroups[tIdx] = taskGroups[tIdx] || []).push(i);
    });
    const navGroupsHtml = taskGroups.map((idxs, tIdx) => {
      if (!idxs) return '';
      const tTitle = MOCK_BLUEPRINT[tIdx] ? MOCK_BLUEPRINT[tIdx].title : 'Task ' + (tIdx + 1);
      const done = idxs.filter(i => State.answers[i] !== null && State.answers[i] !== '').length;
      return `<div class="mock-nav-task">
        <div class="mock-nav-task-label"><span>Task ${tIdx + 1} · ${escapeHtml(tTitle)}</span><span class="mock-nav-task-count">${done}/${idxs.length}</span></div>
        <div class="mock-nav-grid">${idxs.map(navCell).join('')}</div>
      </div>`;
    }).join('');
    // Current task banner
    const curTaskIdx = q._task != null ? q._task : 0;
    const curTask = MOCK_BLUEPRINT[curTaskIdx];
    const taskBanner = curTask ? `<div class="mock-task-banner">
      <span class="mock-task-num">Task ${curTaskIdx + 1} of ${MOCK_BLUEPRINT.length}</span>
      <span class="mock-task-title">${escapeHtml(curTask.title)}</span>
    </div>` : '';
    return `<div class="container">
      <button class="back-btn" id="exitBtn" type="button">← Exit mock</button>
      <div class="quiz-layout ${numeric ? 'has-calc' : ''}">
        <div class="quiz-container slide-in">
          <div class="quiz-header">
            <span class="mode-pill">⏱ MOCK EXAM</span>
            ${numeric ? '<span class="numeric-pill">🧮 Numeric</span>' : ''}
            <button class="flag-btn ${flagged ? 'is-flagged' : ''}" id="flagBtn" type="button" aria-pressed="${flagged}" aria-label="${flagged ? 'Unflag this question' : 'Flag for later review'}" title="${flagged ? 'Flagged — click to remove' : 'Flag for review'}">${flagged ? '⭐' : '☆'}</button>
            <span id="mockTimer" class="timer-pill${timerCls}" role="timer" aria-live="off">⏱ ${formatMMSS(remaining)}</span>
            <div class="progress-wrap">
              <div class="progress-bar-bg" role="progressbar" aria-valuenow="${State.current + 1}" aria-valuemin="1" aria-valuemax="${total}"><div class="progress-bar" style="width:${pct}%"></div></div>
              <div class="progress-label" id="answeredCount">${answeredCount} of ${total} answered</div>
            </div>
            <span class="q-counter">Q${State.current + 1}/${total}</span>
          </div>
          ${taskBanner}
          <div style="margin-bottom:8px"><span class="topic-pill" style="font-size:.7rem">${topic.icon} ${escapeHtml(topic.short)}</span></div>
          <div class="question-text">${escapeHtml(q.q)}</div>
          ${bodyHtml}
          <div class="quiz-nav">
            <button class="btn-secondary nav-btn" id="prevBtn" type="button" ${isFirst ? 'disabled' : ''}>← Previous</button>
            ${isLast ? `<button class="next-btn" id="submitBtn" type="button">Submit exam ✓</button>` : `<button class="next-btn" id="nextBtn" type="button">Next →</button>`}
          </div>
          <div class="mock-nav" role="group" aria-label="Question navigator">
            <div class="mock-nav-header"><span>Question navigator</span><span class="mock-nav-legend"><span class="lg lg-cur"></span>Current <span class="lg lg-ans"></span>Answered <span class="lg lg-flag">⭐</span>Flagged</span></div>
            ${navGroupsHtml}
          </div>
        </div>
        ${numeric && _activeSubjectId === 'aat' ? renderCalculatorSidebar() : ''}
      </div>
    </div>`;
  }

  function renderScore() {
    const { score, results, mode, timedOut } = State;
    const total = results.length;
    const pct = total ? Math.round(score / total * 100) : 0;
    const cls = scoreClass(pct);
    const effectivePassMark = State.unitQuizPassMark || PASS_MARK;
    const passed = pct >= effectivePassMark;
    const msg = passed ? '🎉 Excellent work' : pct >= 50 ? '📚 Good effort — keep going' : '💪 More practice needed';
    const sub = passed ? "You're on track for the synoptic." : pct >= 50 ? 'Review the explanations to strengthen weak areas.' : 'Work through each explanation carefully and try again.';
    const topicResults = {};
    window.TOPICS.forEach(t => { topicResults[t.id] = { name:t.short, icon:t.icon, correct:0, total:0 }; });
    results.forEach(r => { if (topicResults[r.topic]) { topicResults[r.topic].total++; if (r.correct) topicResults[r.topic].correct++; } });
    const breakdownHtml = Object.values(topicResults).filter(t => t.total > 0).map(t => {
      const p = Math.round((t.correct / t.total) * 100), bc = scoreClass(p);
      return `<div class="breakdown-row">
        <span class="bl">${t.icon} ${escapeHtml(t.name)}</span>
        <div class="breakdown-bar-bg" role="progressbar" aria-valuenow="${p}" aria-valuemin="0" aria-valuemax="100"><div class="breakdown-bar ${bc}" style="width:${p}%"></div></div>
        <span class="breakdown-pct">${p}%</span>
      </div>`;
    }).join('');
    const filterAll = State.reviewFilter !== 'wrong';
    const wrongCount = results.filter(r => !r.correct).length;
    const reviewItems = filterAll ? results : results.filter(r => !r.correct);
    const filterToolbar = State.showReview ? `<div class="review-toolbar">
      <span class="review-count">${reviewItems.length} item${reviewItems.length === 1 ? '' : 's'}</span>
      <div class="review-filter" role="tablist" aria-label="Filter review">
        <button class="rf ${filterAll ? 'active' : ''}" data-rfilter="all" type="button" role="tab" aria-selected="${filterAll}">All (${results.length})</button>
        <button class="rf ${!filterAll ? 'active' : ''}" data-rfilter="wrong" type="button" role="tab" aria-selected="${!filterAll}" ${wrongCount === 0 ? 'disabled' : ''}>Wrong only (${wrongCount})</button>
      </div>
    </div>` : '';
    const reviewHtml = State.showReview ? `${filterToolbar}<div class="review-list">
      ${reviewItems.length ? reviewItems.map((r, i) => {
        const realIdx = results.indexOf(r);
        const flagged = Storage.isFlagged(r.id);
        return `<div class="review-item ${r.correct ? 'correct' : 'wrong'}">
          <div class="review-head"><strong>Q${realIdx + 1}: ${escapeHtml(r.q)}</strong>
            <button class="flag-btn ${flagged ? 'is-flagged' : ''}" data-flag-id="${escapeHtml(r.id)}" type="button" aria-pressed="${flagged}" aria-label="${flagged ? 'Unflag' : 'Flag for later review'}" title="${flagged ? 'Flagged' : 'Flag for review'}">${flagged ? '⭐' : '☆'}</button>
          </div>
          ${r.correct ? `<span style="color:var(--correct-text)">✅ ${escapeHtml(r.chosen)}</span>` : `<span class="your-ans">✗ Your answer: ${escapeHtml(r.chosen)}</span><br><span class="correct-ans">✓ Correct: ${escapeHtml(r.correctOpt)}</span>`}
          <div class="exp-text">${escapeHtml(r.exp)}</div>
          ${r.steps && r.steps.length ? `<details class="worked-steps">
            <summary>📐 Show working</summary>
            <ol class="steps-list">${r.steps.map(s => `<li>${escapeHtml(s)}</li>`).join('')}</ol>
          </details>` : ''}
        </div>`;
      }).join('') : '<div class="empty-state">🎉 No incorrect answers to review.</div>'}
    </div>` : '';
    const meta = mode === 'mock'
      ? `<div class="score-meta">${timedOut ? '⏰ Time expired.' : '✓ Submitted'} · Mock exam · ${total} questions</div>`
      : `<div class="score-meta">📝 Practice · ${total} questions</div>`;
    return `<div class="container">
      <button class="back-btn" id="exitBtn" type="button">← Back to topics</button>
      <div class="score-card fade-in">
        <div class="score-circle ${cls}" role="img" aria-label="Score: ${score} out of ${total}, ${pct} percent">
          <div>${score}/${total}</div><div style="font-size:.85rem">${pct}%</div>
        </div>
        <div class="score-msg">${msg}</div>
        <div class="score-sub">${sub}</div>
        ${meta}
        <span class="pass-badge ${passed ? 'pass' : 'fail'}">${passed ? `✓ PASS — ${effectivePassMark}% threshold met` : `✗ FAIL — below ${effectivePassMark}% threshold`}</span>
        <div class="breakdown" style="margin-bottom:20px">
          <div class="breakdown-title">Score breakdown by topic</div>${breakdownHtml}
        </div>
        ${(() => {
          const skillMap = {};
          results.forEach(r => {
            if (!r.skill) return;
            const rec = skillMap[r.skill] || (skillMap[r.skill] = { correct: 0, total: 0 });
            rec.total++; if (r.correct) rec.correct++;
          });
          const weakSkills = Object.entries(skillMap).filter(([,v]) => v.total >= 2 && (v.correct / v.total) < 0.7).sort((a, b) => (a[1].correct / a[1].total) - (b[1].correct / b[1].total));
          if (!weakSkills.length) return '';
          const rows = weakSkills.map(([sid, v]) => {
            const sk = skillById(sid);
            if (!sk) return '';
            const pct = Math.round((v.correct / v.total) * 100);
            const lesson = lessonForSkill(sid);
            return `<div class="skill-debrief-row">
              <span class="skill-debrief-name">${sk.icon} ${escapeHtml(sk.name)}</span>
              <span class="skill-debrief-score">${v.correct}/${v.total} (${pct}%)</span>
              <div class="skill-debrief-actions">
                <button class="skill-drill-btn" type="button" data-topic="skill:${escapeHtml(sid)}">🎯 Drill</button>
                ${lesson ? `<button class="skill-lesson-btn" type="button" data-lesson="${escapeHtml(lesson.id)}">📖 Lesson</button>` : ''}
              </div>
            </div>`;
          }).join('');
          return `<div class="breakdown skill-debrief" style="margin-bottom:20px"><div class="breakdown-title">⚠️ Weak skills — work on these</div>${rows}</div>`;
        })()}
        <div class="score-btns">
          <button class="btn-primary" id="retryBtn" type="button">🔄 ${mode === 'mock' ? 'New mock' : 'Try again'}</button>
          <button class="btn-secondary" id="reviewBtn" type="button" aria-expanded="${State.showReview ? 'true' : 'false'}">${State.showReview ? 'Hide review' : '📋 Review answers'}</button>
          <button class="btn-secondary" id="homeBtn2" type="button">🏠 Topics</button>
        </div>
        ${reviewHtml}
      </div>
    </div>`;
  }

  /* ── LEARNING JOURNEY (Duolingo-style map) ── */
  function renderLearningJourney() {
    if (!window.LEARN_PATH) return '<div class="empty-state">Learning content not loaded.</div>';
    const xp = Storage.data.learn.xp || 0;
    const streak = Storage.studyDayStreak ? Storage.studyDayStreak() : (Storage.data.stats.streak || {}).current || 0;
    const earnedBadges = BADGES.filter(b => Storage.data.badges[b.id]);
    const nextLesson = nextLessonToDo();
    const lv = Math.floor(xp / 100) + 1;
    const lvXp = xp % 100;
    const bestCombo = Storage.data.learn.bestCombo || 0;
    const xpBar = `<div class="xp-bar-wrap" title="${xp} XP earned">
      <div class="xp-bar-top">
        <span class="xp-label">⚡ ${xp} XP</span>
        <span class="xp-level">Level ${lv}</span>
        ${bestCombo >= 3 ? `<span class="xp-combo-best">🔥 Best combo: ${bestCombo}</span>` : ''}
      </div>
      <div class="xp-bar-bg" title="${lvXp}/100 XP to next level"><div class="xp-bar-fill" style="width:${lvXp}%"></div></div>
      <div class="xp-bar-hint">${lvXp}/100 XP to Level ${lv + 1}</div>
    </div>`;

    const skillQCount = {};
    (window.ALL_QUESTIONS || []).forEach(q => {
      if (q.skill) skillQCount[q.skill] = (skillQCount[q.skill] || 0) + 1;
    });

    const unitsHtml = window.LEARN_PATH.map((unit) => {
      // FR_LEARN_PATH uses `id`; AAT uses `unit` — normalise to a single variable
      const uid = unit.unit || unit.id || '';
      const topicObj = window.TOPICS.find(t => t.id === uid) || {};
      const topicStat = Storage.data.stats.topics[uid] || { attempts: 0, correct: 0 };
      const topicAcc = topicStat.attempts ? Math.round(topicStat.correct / topicStat.attempts * 100) : null;

      // For French: lock the entire unit if the previous CEFR level is not complete
      const cefrForUnit = uid === 'fr-a2' ? 'A2' : uid === 'fr-b1' ? 'B1' : null;
      if (cefrForUnit && !frLevelUnlocked(cefrForUnit)) {
        const prereqLevel = cefrForUnit === 'B1' ? 'A2' : 'A1';
        return `<div class="journey-unit journey-unit-level-locked">
          <div class="journey-unit-header">
            <span class="journey-unit-icon">🔒</span>
            <div class="journey-unit-info">
              <div class="journey-unit-title">${escapeHtml(unit.title)}</div>
              <div class="journey-unit-sub">${unit.lessons.length} lessons · locked</div>
            </div>
          </div>
          <div class="journey-unit-lock-banner">
            <div class="julb-icon">🔒</div>
            <div class="julb-text">
              <strong>${escapeHtml(cefrForUnit)} is locked</strong>
              <span>Complete all ${escapeHtml(prereqLevel)} lessons and pass the ${escapeHtml(prereqLevel)} unit quiz to unlock</span>
            </div>
          </div>
        </div>`;
      }

      let unlockedSoFar = true;
      const lessonsHtml = unit.lessons.map((L, nodeIdx) => {
        const rec = Storage.lessonRec(L.id);
        const done = !!(rec && rec.best >= 50);
        const stars = rec ? rec.stars : 0;
        const locked = !unlockedSoFar;
        if (!done) unlockedSoFar = false;
        const starRow = [1,2,3].map(s => `<span class="journey-star ${stars >= s ? 'lit' : ''}" aria-hidden="true">★</span>`).join('');
        const skillsSnip = (L.skills||[]).slice(0,2).map(sid => { const sk = skillById(sid); return sk ? `<span class="node-skill">${sk.icon}</span>` : ''; }).join('');
        const xpLabel = done ? `+${stars * 10} XP` : `+20 XP`;
        const timeLabel = `~${Math.max(2, (L.cards||[]).length + ((L.check||[]).length || 0))} min`;
        const nodeQCount = (L.skills || []).reduce((sum, sid) => sum + (skillQCount[sid] || 0), 0);
        const tier = L.l3Bridge ? 'tier-5' : nodeIdx <= 2 ? 'tier-2' : nodeIdx <= 5 ? 'tier-3' : 'tier-4';
        const tierLabel = L.l3Bridge ? '<span class="node-l3-badge">L3 Bridge</span>' : nodeIdx <= 2 ? '<span class="node-tier-label tier-2-label">Core</span>' : nodeIdx <= 5 ? '<span class="node-tier-label tier-3-label">Advanced</span>' : '<span class="node-tier-label tier-4-label">Mastery</span>';
        return `<button class="journey-node ${done ? 'node-done' : locked ? 'node-locked' : 'node-available'} node-${tier}${L.l3Bridge ? ' node-l3' : ''}" type="button"
            ${locked ? 'disabled' : `data-lesson="${escapeHtml(L.id)}"`}
            aria-label="${escapeHtml(L.title)}${done ? ', completed' : locked ? ', locked' : ', available'}">
          ${!locked ? tierLabel : ''}
          <div class="journey-icon">${locked ? '🔒' : escapeHtml(L.icon)}</div>
          <div class="journey-label">${escapeHtml(L.title)}</div>
          <div class="journey-stars">${starRow}</div>
          <div class="journey-node-meta">
            ${!locked ? `<span class="node-time">${timeLabel}</span>` : ''}
            ${!locked ? `<span class="node-xp">${xpLabel}</span>` : ''}
          </div>
          ${skillsSnip ? `<div class="node-skills">${skillsSnip}</div>` : ''}
          ${nodeQCount > 0 && !locked ? `<span class="node-qcount">${nodeQCount}Q</span>` : ''}
        </button>`;
      }).join('');
      const doneCount = unit.lessons.filter(L=>isLessonDone(L.id)).length;
      const unitDone = doneCount === unit.lessons.length;
      const unitStars = unit.lessons.reduce((sum, L) => { const rec = Storage.lessonRec(L.id); return sum + (rec ? (rec.stars || 0) : 0); }, 0);
      const unitMaxStars = unit.lessons.length * 3;
      const unitBadgeEarned = !!Storage.data.badges['unit-' + uid];
      const unitTest = (Storage.data.learn.unitTests || {})[uid] || null;
      const unitQuizBtn = (uid && unitDone)
        ? `<button class="unit-quiz-btn ${unitTest && unitTest.passed ? 'quiz-passed' : ''}" type="button" data-unit-quiz="${escapeHtml(uid)}">
            ${unitTest ? (unitTest.passed ? `✓ ${unitTest.pct}%` : `↩ Retry (${unitTest.pct}%)`) : '📋 Unit quiz'}
           </button>` : '';
      const hasRevision = uid && UNIT_REVISION.some(r => r.unit === uid);
      const revBtn = hasRevision ? `<button class="unit-rev-btn" type="button" data-unit-rev="${escapeHtml(uid)}" title="Revision notes for ${escapeHtml(unit.title)}">📝 Notes</button>` : '';
      const collapsed = !!(State.collapsedUnits && State.collapsedUnits[uid]);
      return `<div class="journey-unit ${unitBadgeEarned ? 'unit-mastered' : ''}${collapsed ? ' journey-unit-collapsed' : ''}">
        <div class="journey-unit-header" style="cursor:pointer" data-collapse-unit="${escapeHtml(uid)}" role="button" aria-expanded="${!collapsed}" tabindex="0">
          <span class="journey-unit-icon">${unitBadgeEarned ? '👑' : (topicObj.icon || '📚')}</span>
          <div class="journey-unit-info">
            <div class="journey-unit-title">${escapeHtml(unit.title)}${unitBadgeEarned ? ' <span class="unit-master-badge">MASTERED</span>' : ''}</div>
            <div class="journey-unit-sub">${doneCount}/${unit.lessons.length} lessons ${unitDone ? '✓ complete' : 'in progress'}${(uid && UNIT_EXAM_WEIGHT[uid]) ? ` <span class="unit-exam-weight">· ~${UNIT_EXAM_WEIGHT[uid]}% of synoptic</span>` : ''}</div>
          </div>
          <div class="unit-star-total" title="${unitStars} of ${unitMaxStars} stars earned">
            <span class="ust-stars">★</span> ${unitStars}/${unitMaxStars}
          </div>
          ${topicAcc !== null ? `<span class="journey-unit-acc ${scoreClass(topicAcc)}">${topicAcc}%</span>` : ''}
          <div class="unit-action-btns">${revBtn}${unitQuizBtn}</div>
          <span class="unit-collapse-chevron" aria-hidden="true">${collapsed ? '▶' : '▼'}</span>
        </div>
        <div class="journey-unit-progress-bg"><div class="journey-unit-progress" style="width:${(doneCount/unit.lessons.length*100).toFixed(0)}%"></div></div>
        <div class="journey-nodes">${lessonsHtml}</div>
      </div>`;
    }).join('');

    const badgesSnip = earnedBadges.length
      ? `<div class="journey-badges">${earnedBadges.map(b=>`<span class="badge-chip" title="${escapeHtml(b.name)}: ${escapeHtml(b.desc)}">${b.icon}</span>`).join('')}</div>`
      : '';

    const nextBlock = nextLesson ? `<div class="journey-next">
      <div class="journey-next-label">Continue learning</div>
      <button class="journey-next-btn" type="button" data-lesson="${escapeHtml(nextLesson.lesson.id)}">
        ${escapeHtml(nextLesson.lesson.icon)} ${escapeHtml(nextLesson.lesson.title)} →
      </button>
    </div>` : '<div class="journey-complete">🎉 All lessons complete! Use smart practice to keep sharp.</div>';

    return `<div class="journey-header">
      ${xpBar}
      <div class="journey-meta"><span>🔥 ${streak}-day streak</span>${badgesSnip}</div>
    </div>
    ${nextBlock}
    <div class="journey-map">${unitsHtml}</div>
    ${_activeSubjectId === 'aat' ? `<div class="l3-bridge-section">
      <div class="l3-bridge-header">
        <h3 class="l3-bridge-title">🌉 What comes next — AAT Level 3</h3>
        <p class="l3-bridge-sub">Level 2 builds the foundations; Level 3 deepens every skill and adds tax, management accounting and professional reporting. Complete this qualification first, then enrol directly onto Level 3.</p>
        <div class="l3-info-row">
          <div class="l3-info-item">📋 5 units + synoptic</div>
          <div class="l3-info-item">🎯 70% pass mark</div>
          <div class="l3-info-item">⏱ 12–18 months</div>
          <div class="l3-info-item">🌐 aat.org.uk</div>
        </div>
      </div>
      <p class="l3-readiness-note">💡 The bars below show your current L2 accuracy in the topics each Level 3 unit builds on.</p>
      <div class="l3-unit-grid">
        ${(() => {
          const l3Stats = Storage.data.stats.topics || {};
          return L3_BRIDGE.map(m => {
            const accs = (m.topicIds || []).map(id => { const s = l3Stats[id] || {}; return (s.seen >= 5) ? Math.round(s.correct / s.seen * 100) : null; }).filter(a => a !== null);
            const ready = accs.length ? Math.round(accs.reduce((a, b) => a + b, 0) / accs.length) : null;
            const readyHtml = ready !== null
              ? `<div class="l3-readiness"><div class="l3-readiness-row"><span class="l3-readiness-label">L2 readiness</span><span class="l3-readiness-pct ${scoreClass(ready)}">${ready}%</span></div><div class="l3-bar-bg"><div class="l3-bar" style="width:${ready}%"></div></div><div class="l3-readiness-tip">${ready >= 75 ? '✅ Strong foundations — ready to progress' : ready >= 55 ? '📚 Keep practising L2 topics' : '🔁 Strengthen L2 foundations first'}</div></div>`
              : '<div class="l3-readiness l3-readiness-empty">Complete L2 practice to see your readiness score</div>';
            return `<div class="l3-unit-card${m.unit === 'PSYA' ? ' l3-synoptic-card' : ''}">
              <div class="l3-unit-header">
                <span class="l3-unit-icon">${m.icon}</span>
                <div class="l3-unit-title-block">
                  <div class="l3-unit-name">${escapeHtml(m.title)}</div>
                  <div class="l3-unit-builds">Builds on: ${m.buildsOn.map(u => escapeHtml(u)).join(' + ')}</div>
                </div>
                <span class="l3-exam-badge l3-exam-${m.exam === 'Synoptic' ? 'syn' : 'cbe'}">${escapeHtml(m.exam)}</span>
              </div>
              <div class="l3-unit-meta">⏱ ${escapeHtml(m.time)} &nbsp;·&nbsp; ${m.tasks} tasks &nbsp;·&nbsp; ${m.passmark}% pass</div>
              <p class="l3-unit-desc">${escapeHtml(m.desc)}</p>
              <div class="l3-unit-sections">
                <div class="l3-unit-section">
                  <div class="l3-section-title">Entry skills from L2</div>
                  <ul class="l3-entry-list">${(m.entrySkills || []).map(s => `<li>${escapeHtml(s)}</li>`).join('')}</ul>
                </div>
                <div class="l3-unit-section">
                  <div class="l3-section-title">What you will master</div>
                  <ul class="l3-unit-topics">${m.topics.map(t => `<li>${escapeHtml(t)}</li>`).join('')}</ul>
                </div>
              </div>
              ${readyHtml}
            </div>`;
          }).join('');
        })()}
      </div>
      <div class="l3-enrol-steps">
        <div class="l3-enrol-title">📍 How to progress to Level 3</div>
        <ol class="l3-steps-list">
          <li>Complete and pass the AAT Level 2 Synoptic Assessment</li>
          <li>Receive your Level 2 Certificate in Accounting award from AAT</li>
          <li>Enrol on AAT Level 3 via aat.org.uk or an approved training provider</li>
          <li>Complete all five units in any order, then sit the Professional Synoptic</li>
        </ol>
      </div>
    </div>` : ''}`;
  }

  /* ── LESSON PLAYER ── */
  function renderLesson() {
    const L = State.lesson;
    if (!L) { goLearn(); return ''; }
    const { def, phase, cardIdx, qIdx, qAnswered, qScore, pct, stars } = L;
    const totalCards = def.cards.length;
    const totalQ = def.check ? def.check.length : 0;

    /* shared helpers */
    const mdBold = (t) => escapeHtml(t).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    const dots = (total, current, cls) => Array.from({length:total}, (_,i) =>
      `<span class="lesson-dot ${i < current ? 'done' : i === current ? 'active' : ''}" aria-hidden="true"></span>`).join('');
    const skillChips = (def.skills||[]).map(sid => {
      const sk = skillById(sid);
      return sk ? `<span class="lesson-skill-chip">${sk.icon} ${escapeHtml(sk.name)}</span>` : '';
    }).join('');

    /* ── DONE screen ── */
    if (phase === 'done') {
      const starRow = [1,2,3].map(s => `<span class="lesson-star ${(stars||0) >= s ? 'lit' : ''}" aria-hidden="true">★</span>`).join('');
      const msg = stars === 3 ? 'Perfect score! 🏆' : stars >= 2 ? 'Great work! 👏' : stars >= 1 ? 'Good start — retry to earn more stars!' : 'Keep going — you need 50% to pass.';
      const wrongIdxs = L.wrongIdxs || [];
      const wrongReview = wrongIdxs.length > 0 ? `<div class="lesson-wrong-review">
        <div class="lwr-title">Missed questions — review before you go:</div>
        ${wrongIdxs.map(wi => {
          const wq = def.check[wi];
          return `<div class="lwr-item">
            <p class="lwr-q">Q${wi+1}: ${escapeHtml(wq.q)}</p>
            <p class="lwr-ans">✓ <strong>${escapeHtml(wq.opts[wq.ans])}</strong>${wq.exp ? ` — ${escapeHtml(wq.exp)}` : ''}</p>
          </div>`;
        }).join('')}
      </div>` : (stars === 3 ? `<div class="lesson-perfect">All correct — outstanding! ⚡</div>` : '');
      const TYPE_LABELS = { mcq: 'MCQ', numeric: 'Numeric', scenario: 'Scenario', dragdrop: 'Match', tablefill: 'Table', gapfill: 'Gap fill' };
      const lessonSkills = def.skills || [];
      const allSkillQs = (window.ALL_QUESTIONS || []).filter(q => lessonSkills.includes(q.skill));
      const skillAccMap = {};
      (window.ALL_QUESTIONS || []).forEach(q => {
        if (!q.skill) return;
        const s = Storage.data.stats.questions[q.id];
        if (!s || !s.attempts) return;
        if (!skillAccMap[q.skill]) skillAccMap[q.skill] = { attempts: 0, correct: 0 };
        skillAccMap[q.skill].attempts += s.attempts;
        skillAccMap[q.skill].correct += s.correct;
      });
      const skillRows = lessonSkills.map(sid => {
        const sk = skillById(sid);
        if (!sk) return '';
        const qs = (window.ALL_QUESTIONS || []).filter(q => q.skill === sid);
        const types = [...new Set(qs.map(q => TYPE_LABELS[q.type] || 'MCQ'))];
        const sa = skillAccMap[sid] || { attempts: 0, correct: 0 };
        const acc = sa.attempts >= 3 ? Math.round(sa.correct / sa.attempts * 100) : null;
        return `<div class="drill-skill-row">
          <span class="drill-skill-name">${sk.icon} ${escapeHtml(sk.name)}</span>
          <span class="drill-skill-meta">${qs.length} Q · ${escapeHtml(types.join(', '))}</span>
          ${acc !== null ? `<span class="drill-skill-acc ${scoreClass(acc)}">${acc}%</span>` : '<span class="drill-skill-acc-na">Not yet attempted</span>'}
        </div>`;
      }).join('');
      const allLessons = (window.LEARN_PATH || []).flatMap(u => u.lessons);
      const curIdx = allLessons.findIndex(l => l.id === def.id);
      const nextL = curIdx >= 0 && curIdx + 1 < allLessons.length ? allLessons[curIdx + 1] : null;
      const drillPanel = allSkillQs.length > 0 ? `<div class="lesson-drill-panel">
        <div class="drill-panel-title">🎯 Practice what you just learned</div>
        <div class="drill-skill-list">${skillRows}</div>
        <button class="btn-primary lesson-drill-all" id="lessonDrillAllBtn" type="button"
          data-skills="${escapeHtml(lessonSkills.join(','))}">Start ${Math.min(10, allSkillQs.length)}-question drill →</button>
      </div>` : '';
      const personalBestBanner = L.isPersonalBest && stars > 0 ? `<div class="lesson-personal-best">🏆 New personal best!</div>` : '';
      const unitCompleteBanner = L.unitComplete ? `<div class="unit-complete-banner">
        <div class="ucb-icon">🎉</div>
        <div class="ucb-text"><strong>Unit complete!</strong> You've finished all lessons in this unit. <span class="ucb-xp">+50 bonus XP</span></div>
      </div>` : '';
      return `<div class="container">
        <div class="lesson-done fade-in">
          ${unitCompleteBanner}
          <div class="lesson-done-title">${escapeHtml(def.title)}</div>
          <div class="lesson-done-stars">${starRow}</div>
          ${personalBestBanner}
          <div class="lesson-done-pct">${pct}%</div>
          <div class="lesson-done-msg">${msg}</div>
          <div class="lesson-done-xp">⚡ +${qScore * 2} XP earned</div>
          ${wrongReview}
          ${drillPanel}
          <div class="lesson-done-btns">
            ${stars < 3 && totalQ > 0 ? `<button class="btn-secondary" id="lessonRetryBtn" type="button">🔁 Retry quiz</button>` : ''}
            ${nextL && !nextL.l3Bridge ? `<button class="btn-primary" id="lessonNextBtn" type="button" data-lesson="${escapeHtml(nextL.id)}">${escapeHtml(nextL.icon)} Next: ${escapeHtml(nextL.title)} →</button>` : ''}
            <button class="btn-secondary" id="lessonExitBtn2" type="button">🗺️ Back to journey</button>
          </div>
        </div>
      </div>`;
    }

    /* ── TRANSITION screen (between teach and quiz) ── */
    if (phase === 'transition') {
      return `<div class="container">
        <button class="back-btn" id="lessonBackBtn" type="button">← Review cards</button>
        <div class="lesson-transition fade-in">
          <div class="lesson-transition-icon">🧪</div>
          <h2 class="lesson-transition-h">Ready to test yourself?</h2>
          <p class="lesson-transition-p">You've covered <strong>${totalCards}</strong> topic${totalCards===1?'':'s'} in <em>${escapeHtml(def.title)}</em>.</p>
          <p class="lesson-transition-p">Now answer <strong>${totalQ}</strong> question${totalQ===1?'':'s'} to earn your stars. You need 50% to complete the lesson.</p>
          ${skillChips ? `<div class="lesson-skill-chips">${skillChips}</div>` : ''}
          <button class="btn-primary lesson-transition-btn" id="lessonContinueBtn" type="button">Start quiz →</button>
        </div>
      </div>`;
    }

    /* ── QUIZ phase ── */
    if (phase === 'quiz') {
      if (!def.check || !def.check.length) { finishLesson(); return ''; }
      const q = def.check[qIdx];
      const answered = qAnswered !== null;
      const correct = answered && qAnswered === q.ans;
      const optHtml = q.opts.map((opt, i) => {
        let cls = '';
        if (answered) { if (i === q.ans) cls = 'correct'; else if (i === qAnswered && qAnswered !== q.ans) cls = 'wrong'; }
        return `<button class="option-btn ${cls}" type="button" data-lesson-ans="${i}" ${answered ? 'disabled' : ''} role="radio" aria-checked="${qAnswered === i}">
          <span class="option-label" aria-hidden="true">${LETTERS[i]}</span><span>${escapeHtml(opt)}</span>
        </button>`;
      }).join('');
      const feedback = answered ? `<div class="feedback ${correct ? 'correct' : 'wrong'} fade-in" role="status">
        <strong>${correct ? '✅ Correct!' : '❌ Not quite'}</strong>${q.exp ? `<br><em>${escapeHtml(q.exp)}</em>` : ''}
      </div>` : '';
      return `<div class="container">
        <button class="back-btn" id="lessonExitBtn" type="button">← Exit lesson</button>
        <div class="lesson-player slide-in">
          <div class="lesson-phase-bar">
            <span class="lesson-phase-pill">Quiz ${qIdx + 1}/${totalQ}</span>
            <div class="lesson-dots">${dots(totalQ, qIdx, 'quiz')}</div>
            <span class="lesson-phase-score">⚡ ${L.qScore || 0}/${qIdx + (answered ? 1 : 0)}</span>
          </div>
          <div class="lesson-progress-bar-bg"><div class="lesson-progress-bar" style="width:${answered ? ((qIdx+1)/totalQ*100).toFixed(0) : (qIdx/totalQ*100).toFixed(0)}%"></div></div>
          <h2 class="lesson-q">${escapeHtml(q.q)}</h2>
          <div class="options" role="radiogroup">${optHtml}</div>
          ${feedback}
          ${answered ? `<button class="next-btn" id="lessonNextBtn" type="button">${qIdx + 1 >= totalQ ? 'Finish ✓' : 'Next →'}</button>` : ''}
        </div>
      </div>`;
    }

    /* ── TEACH phase ── */
    const card = def.cards[cardIdx];
    const visualHtml = card.visual ? `<div class="lesson-visual">${card.visual}</div>` : '';
    const paraHtml = (card.p || []).map(p => `<p class="lesson-card-p">${mdBold(p)}</p>`).join('');
    const flowHtml = card.flow ? `<div class="lesson-flow">${card.flow.map((f,i) => `<span class="lesson-flow-step">${escapeHtml(f)}</span>${i < card.flow.length-1 ? '<span class="lesson-flow-arrow">→</span>' : ''}`).join('')}</div>` : '';
    const exHtml = card.example ? `<div class="lesson-example">
      <div class="lesson-example-title">${escapeHtml(card.example.title)}</div>
      <table class="lesson-example-table"><tbody>${card.example.rows.map(row => `<tr>${row.map(c=>`<td>${mdBold(c)}</td>`).join('')}</tr>`).join('')}</tbody></table>
    </div>` : '';
    const tableHtml = card.table ? `<div class="lesson-table-wrap">
      <table class="lesson-table">
        <thead><tr>${(card.table.headers || []).map(h => `<th>${escapeHtml(h)}</th>`).join('')}</tr></thead>
        <tbody>${(card.table.rows || []).map(row => `<tr>${row.map(c => `<td>${mdBold(c)}</td>`).join('')}</tr>`).join('')}</tbody>
      </table>
    </div>` : '';
    const splitHtml = card.split ? `<div class="lesson-split">
      <div class="lesson-split-col"><strong>${escapeHtml(card.split.left.title || card.split.left.h || '')}</strong><ul>${(card.split.left.items||[]).map(x=>`<li>${mdBold(x)}</li>`).join('')}</ul></div>
      <div class="lesson-split-col"><strong>${escapeHtml(card.split.right.title || card.split.right.h || '')}</strong><ul>${(card.split.right.items||[]).map(x=>`<li>${mdBold(x)}</li>`).join('')}</ul></div>
    </div>` : '';
    const formulaHtml = card.formula ? `<div class="lesson-formula">${card.formula.split('·').map(f => `<div class="lesson-formula-line">${escapeHtml(f.trim())}</div>`).join('')}</div>` : '';
    const calloutKind = card.callout ? (card.callout.kind || 'tip') : '';
    const calloutHtml = card.callout ? `<div class="lesson-callout callout-${escapeHtml(calloutKind)}">
      <span class="callout-icon">${calloutKind === 'warning' ? '⚠️' : calloutKind === 'key' ? '🔑' : '💡'}</span>
      <span class="callout-text">${mdBold(card.callout.text)}</span>
    </div>` : '';
    const examtrapHtml = card.examtrap ? `<div class="lesson-examtrap">
      <span class="examtrap-icon">⚠️</span>
      <div class="examtrap-body">
        <div class="examtrap-label">EXAM TRAP</div>
        <div class="examtrap-text">${mdBold(card.examtrap)}</div>
      </div>
    </div>` : '';
    return `<div class="container">
      <button class="back-btn" id="lessonExitBtn" type="button">← Exit lesson</button>
      <div class="lesson-player slide-in">
        <div class="lesson-phase-bar">
          <span class="lesson-phase-pill">Learn ${cardIdx + 1}/${totalCards}</span>
          <div class="lesson-dots">${dots(totalCards, cardIdx, 'teach')}</div>
        </div>
        <div class="lesson-progress-bar-bg"><div class="lesson-progress-bar" style="width:${((cardIdx+1)/totalCards*100).toFixed(0)}%"></div></div>
        <div class="lesson-card fade-in">
          <h2 class="lesson-card-h">${escapeHtml(card.h || card.title || '')}</h2>
          ${card.body ? `<div class="lesson-card-body">${card.body}</div>` : ''}
          ${visualHtml}${paraHtml}${flowHtml}${formulaHtml}${exHtml}${tableHtml}${splitHtml}${calloutHtml}${examtrapHtml}
        </div>
        <div class="lesson-nav">
          ${cardIdx > 0 ? `<button class="btn-secondary" id="lessonBackBtn" type="button">← Back</button>` : '<span></span>'}
          <button class="btn-primary" id="lessonContinueBtn" type="button">${cardIdx + 1 >= totalCards ? 'Check understanding →' : 'Continue →'}</button>
        </div>
      </div>
    </div>`;
  }

  /* ── FLASHCARD SCREEN ── */
  function renderFlash() {
    const F = State.flash;
    if (!F) { goLearn(); return ''; }
    const done = F.idx >= F.terms.length;
    if (done) {
      const pct = F.terms.length ? Math.round(F.got / F.terms.length * 100) : 0;
      const stars = pct >= 90 ? 3 : pct >= 60 ? 2 : 1;
      const starRow = [1,2,3].map(s => `<span class="lesson-star ${stars >= s ? 'lit' : ''}" aria-hidden="true">★</span>`).join('');
      return `<div class="container">
        <div class="flash-done fade-in">
          <div class="flash-done-icon">🃏</div>
          <h2>Session complete!</h2>
          <div class="lesson-done-stars" style="justify-content:center;margin-bottom:8px">${starRow}</div>
          <p>You remembered <strong>${F.got}</strong> of ${F.terms.length} card${F.terms.length===1?'':'s'} (${pct}%).</p>
          <p style="font-size:.85rem;color:var(--subtext)">Cards you missed are due again sooner — keep reviewing to move them up the Leitner ladder.</p>
          <button class="btn-primary" style="margin-top:20px" id="flashExitBtn2" type="button">🗺️ Back to journey</button>
        </div>
      </div>`;
    }
    const term = F.terms[F.idx];
    const glossItem = window.GLOSSARY.find(g => g.term === term) || { term, def: '—', topic: null };
    const topicObj = glossItem.topic ? window.TOPICS.find(t => t.id === glossItem.topic) : null;
    const topicTag = topicObj ? `<span class="flash-topic-tag">${topicObj.icon} ${escapeHtml(topicObj.short)}</span>` : '';
    const progressPct = ((F.idx) / F.terms.length * 100).toFixed(0);
    return `<div class="container">
      <button class="back-btn" id="flashExitBtn" type="button">← Back to journey</button>
      <div class="flash-player">
        <div class="flash-header">
          <div class="flash-progress-wrap">
            <span class="flash-progress-txt">${F.idx + 1} / ${F.terms.length}</span>
            <div class="flash-progress-bar-bg"><div class="flash-progress-bar-fill" style="width:${progressPct}%"></div></div>
          </div>
          <span class="flash-got">✓ ${F.got} remembered</span>
        </div>
        <div class="flash-card ${F.flipped ? 'flipped' : ''}" id="flashFlipBtn">
          ${!F.flipped
            ? `<div class="flash-front">${topicTag}<span class="flash-term">${escapeHtml(glossItem.term)}</span><p class="flash-hint">Tap to reveal definition</p></div>`
            : `<div class="flash-back">${topicTag}<span class="flash-term">${escapeHtml(glossItem.term)}</span><p class="flash-def">${escapeHtml(glossItem.def)}</p></div>`
          }
        </div>
        ${!F.flipped
          ? `<button class="btn-secondary flash-flip-btn-btn" id="flashFlipBtn2" type="button">Flip card ↩</button>`
          : `<div class="flash-grade-btns">
              <button class="flash-btn-no" id="flashNoBtn" type="button">😕 Need more practice</button>
              <button class="flash-btn-yes" id="flashYesBtn" type="button">✅ Got it!</button>
            </div>`
        }
      </div>
    </div>`;
  }

  /* ── REVISION NOTES SCREEN ── */
  function renderRevision() {
    const rev = UNIT_REVISION.find(r => r.unit === State.revisionUnit);
    if (!rev) { goLearn(); return ''; }
    const sectionsHtml = rev.sections.map(s => `
      <div class="rev-section">
        <h3 class="rev-section-title">${escapeHtml(s.heading)}</h3>
        <ul class="rev-list">${s.items.map(item => `<li>${escapeHtml(item)}</li>`).join('')}</ul>
      </div>`).join('');
    const trapsHtml = rev.traps.map(t => `<div class="rev-trap-item">⚠️ ${escapeHtml(t)}</div>`).join('');
    return `<div class="container revision-screen fade-in">
      <div class="revision-header">
        <button class="back-btn" id="revisionExitBtn" type="button">← Back to journey</button>
        <h2 class="revision-title">${escapeHtml(rev.icon)} ${escapeHtml(rev.title)} — Revision Notes</h2>
      </div>
      <div class="revision-intro">Key rules, formulas and traps — everything you need the night before the exam.</div>
      ${sectionsHtml}
      <div class="rev-traps-block">
        <div class="rev-traps-title">Common Exam Traps</div>
        ${trapsHtml}
      </div>
      <div class="revision-footer-btns">
        <button class="btn-secondary" id="revisionExitBtn2" type="button">← Back to journey</button>
        <button class="btn-primary" id="revisionQuizBtn" data-unit-quiz="${escapeHtml(rev.unit)}" type="button">📋 Take the unit quiz →</button>
      </div>
    </div>`;
  }

  function renderModal(m) {
    const confirmLabel = m.confirmLabel || 'Confirm';
    return `<div class="modal-backdrop" id="modalBackdrop" role="presentation">
      <div class="modal" role="dialog" aria-modal="true" aria-labelledby="modalTitle" aria-describedby="modalDesc">
        <h3 id="modalTitle">${escapeHtml(m.title)}</h3>
        <p id="modalDesc">${escapeHtml(m.message)}</p>
        <div class="modal-buttons">
          <button class="btn-secondary nav-btn" id="modalCancel" type="button">Cancel</button>
          <button class="btn-primary nav-btn" id="modalConfirm" type="button">${escapeHtml(confirmLabel)}</button>
        </div>
      </div>
    </div>`;
  }

  /* ── EVENTS ── */
  function toggleDarkMode() {
    const next = !Storage.isDarkActive();
    Storage.data.settings.darkMode = next;
    Storage.save(); render();
  }
  function toggleFlagCurrent() {
    const q = State.questions[State.current]; if (!q) return;
    Storage.toggleFlag(q.id);
    showToast(Storage.isFlagged(q.id) ? '⭐ Flagged for review' : 'Flag removed', Storage.isFlagged(q.id) ? 'success' : 'info');
    render();
  }
  function toggleConfidentCurrent() {
    const q = State.questions[State.current]; if (!q) return;
    Storage.toggleConfident(q.id);
    showToast(Storage.isConfident(q.id) ? '✓ Marked confident — won\'t appear in practice' : 'Confidence mark removed', Storage.isConfident(q.id) ? 'success' : 'info');
    render();
  }
  function jumpToMockQuestion(idx) {
    if (State.mode !== 'mock') return;
    if (idx < 0 || idx >= State.questions.length) return;
    State.current = idx; Calc.reset(); render();
  }

  function attachEvents() {
    bind('startBtn', 'click', () => { Storage.data.settings.seenSplash = true; Storage.save(); State.screen='home'; render(); });
    document.querySelectorAll('[data-tab]').forEach(el => el.addEventListener('click', () => { State.activeTab = el.dataset.tab; render(); }));
    document.querySelectorAll('[data-switch-subject]').forEach(el => el.addEventListener('click', () => switchSubject(el.dataset.switchSubject)));
    bind('subjectPickerBack', 'click', () => { State.screen = 'home'; render(); });
    document.querySelectorAll('[data-topic]').forEach(el => el.addEventListener('click', () => startPractice(el.dataset.topic)));
    bind('mockBtn', 'click', startMock);
    bind('resumeBtn', 'click', resumeSession);
    bind('dismissSessionBtn', 'click', dismissSession);
    const st = document.getElementById('soundToggle');
    if (st) st.addEventListener('change', () => { Storage.data.settings.soundOn = st.checked; Storage.save(); });
    const ft = document.getElementById('flipModeToggle');
    if (ft) ft.addEventListener('change', () => { Storage.data.settings.flipMode = ft.checked; Storage.save(); });
    document.querySelectorAll('[data-opt]').forEach(el => el.addEventListener('click', () => {
      const idx = +el.dataset.opt;
      if (State.mode === 'mock') selectMockOption(idx); else answerPractice(idx);
    }));
    const ni = document.getElementById('numericAnswer');
    if (ni) {
      ni.addEventListener('input', (e) => {
        if (State.mode === 'mock') setMockNumeric(e.target.value);
        else State.numericDraft = e.target.value;
        const err = document.getElementById('numericError'); if (err) err.textContent = '';
      });
      ni.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          if (State.mode === 'practice') {
            if (State.answered === null) submitNumericPractice();
            else { const next = document.getElementById('nextBtn'); if (next) next.click(); }
          } else {
            const next = document.getElementById('nextBtn') || document.getElementById('submitBtn');
            if (next) next.click();
          }
        }
      });
    }
    bind('submitNumericBtn', 'click', submitNumericPractice);
    bind('submitDragDropBtn', 'click', submitDragDrop);
    bind('submitTableFillBtn', 'click', submitTableFill);
    bind('submitScenarioBtn', 'click', submitScenario);
    document.querySelectorAll('[data-dd-left]').forEach(el => el.addEventListener('click', (e) => {
      if (e.target && e.target.dataset && e.target.dataset.ddClear != null) { e.stopPropagation(); clearDragPair(+e.target.dataset.ddClear); return; }
      selectDragLeft(+el.dataset.ddLeft);
    }));
    document.querySelectorAll('[data-dd-right]').forEach(el => el.addEventListener('click', () => selectDragRight(+el.dataset.ddRight)));
    document.querySelectorAll('[data-tf-blank]').forEach(el => {
      el.addEventListener('input', (e) => { State.tfDraft[+el.dataset.tfBlank] = e.target.value; });
    });
    document.querySelectorAll('[data-sc-part]').forEach(el => {
      el.addEventListener('input', (e) => { State.scDraft[+el.dataset.scPart] = e.target.value; });
    });
    document.querySelectorAll('[data-sc-opt]').forEach(el => el.addEventListener('click', () => {
      const [partIdx, optIdx] = el.dataset.scOpt.split('-').map(Number);
      if (State.answered !== null) return;
      State.scDraft[partIdx] = String(optIdx);
      render();
    }));
    document.querySelectorAll('[data-calc]').forEach(el => el.addEventListener('click', () => {
      const k = el.dataset.calc;
      if (k === 'num') Calc.inputDigit(el.dataset.val);
      else if (k === 'dot') Calc.inputDecimal();
      else if (k === 'op') Calc.applyOp(el.dataset.val);
      else if (k === 'eq') Calc.evaluate();
      else if (k === 'clear') Calc.reset();
      else if (k === 'back') Calc.backspace();
      else if (k === 'sign') Calc.toggleSign();
      else if (k === 'pct') Calc.percent();
      else if (k === 'sqrt') Calc.sqrt();
      else if (k === 'mc') Calc.memoryClear();
      else if (k === 'mr') Calc.memoryRecall();
      else if (k === 'madd') Calc.memoryAdd();
      else if (k === 'msub') Calc.memorySub();
    }));
    bind('calcUse', 'click', () => {
      const input = document.getElementById('numericAnswer');
      if (!input || input.disabled) return;
      input.value = Calc.display;
      input.dispatchEvent(new Event('input', { bubbles: true }));
      try { input.focus(); } catch (e) {}
    });
    bind('nextBtn', 'click', () => State.mode === 'mock' ? nextMock() : nextPractice());
    bind('prevBtn', 'click', prevMock);
    bind('submitBtn', 'click', () => {
      const unanswered = State.answers.filter(a => a === null).length;
      if (unanswered > 0) {
        openConfirm({ title:'Submit mock exam?', message:`${unanswered} question${unanswered===1?'':'s'} unanswered. Submit anyway?`,
          confirmLabel:'Submit', onConfirm: () => { closeConfirm(); finishMock(false); } });
      } else finishMock(false);
    });
    bind('exitBtn', 'click', exitQuiz);
    bind('retryBtn', 'click', () => { if (State.mode === 'mock') startMock(); else startPractice(State.selectedTopic); });
    bind('reviewBtn', 'click', () => { State.showReview = !State.showReview; render(); });
    bind('homeBtn2', 'click', goHome);
    document.querySelectorAll('[data-reset-subject]').forEach(el => {
      el.addEventListener('click', () => {
        const id = el.dataset.resetSubject;
        const subj = getSubject(id);
        openConfirm({
          title: `Reset ${subj.name} progress?`,
          message: `This will permanently delete your stats, attempt history and saved settings for ${subj.name} on this device.`,
          confirmLabel: 'Reset',
          onConfirm: () => {
            try { localStorage.removeItem(subjectStorageKey(id)); } catch (e) {}
            if (id === _activeSubjectId) Storage.data = defaultData();
            closeConfirm();
            render();
          }
        });
      });
    });
    bind('flagBtn', 'click', toggleFlagCurrent);
    bind('confidentBtn', 'click', toggleConfidentCurrent);
    document.querySelectorAll('[data-flag-id]').forEach(el => el.addEventListener('click', () => {
      const id = el.dataset.flagId; Storage.toggleFlag(id);
      showToast(Storage.isFlagged(id) ? '⭐ Flagged for review' : 'Flag removed', Storage.isFlagged(id) ? 'success' : 'info');
      render();
    }));
    document.querySelectorAll('[data-jump]').forEach(el => el.addEventListener('click', () => jumpToMockQuestion(+el.dataset.jump)));
    document.querySelectorAll('[data-rfilter]').forEach(el => el.addEventListener('click', () => { State.reviewFilter = el.dataset.rfilter; render(); }));
    const gs = document.getElementById('glossarySearch');
    if (gs) {
      gs.addEventListener('input', (e) => {
        const val = e.target.value;
        State.glossaryQuery = val;
        clearTimeout(gs._t);
        gs._t = setTimeout(() => {
          render();
          const after = document.getElementById('glossarySearch');
          if (after) { try { after.focus(); after.setSelectionRange(val.length, val.length); } catch (e) {} }
        }, 90);
      });
    }
    bind('clearSearch', 'click', () => { State.glossaryQuery = ''; render(); });
    // Gap-fill question type
    document.querySelectorAll('[data-gf-gap]').forEach(el => el.addEventListener('change', (e) => {
      State.gfDraft[+el.dataset.gfGap] = e.target.value;
    }));
    bind('submitGapFillBtn', 'click', submitGapFill);
    // Word-order interactions
    document.querySelectorAll('[data-wo-bank]').forEach(el => el.addEventListener('click', () => {
      const idx = +el.dataset.woBank;
      if (!State.woDraft.includes(idx)) { State.woDraft.push(idx); render(); }
    }));
    document.querySelectorAll('[data-wo-placed]').forEach(el => el.addEventListener('click', () => {
      const pos = +el.dataset.woPlaced;
      State.woDraft.splice(pos, 1); render();
    }));
    bind('submitWordOrderBtn', 'click', submitWordOrder);
    // TTS / Listen interactions
    const listenPlayBtn = document.getElementById('listenPlayBtn');
    if (listenPlayBtn) {
      const lq = State.questions[State.current];
      listenPlayBtn.addEventListener('click', () => {
        speakFrench(lq.audio || lq.q,
          () => { listenPlayBtn.textContent = '⏹ Playing…'; listenPlayBtn.classList.add('is-playing'); },
          () => { listenPlayBtn.textContent = '🔊 Tap to Listen'; listenPlayBtn.classList.remove('is-playing'); }
        );
      });
    }
    const ttsReplayBtn = document.getElementById('ttsReplayBtn');
    if (ttsReplayBtn) {
      const lq = State.questions[State.current];
      ttsReplayBtn.addEventListener('click', () => speakFrench(lq.audio || lq.q));
    }
    const ttsQBtn = document.getElementById('ttsQBtn');
    if (ttsQBtn) {
      const tq = State.questions[State.current];
      const ttsText = isFrToEnMcq(tq) ? extractFrenchTerm(tq) : null;
      if (ttsText) ttsQBtn.addEventListener('click', () => {
        const origLabel = ttsQBtn.textContent;
        speakFrench(ttsText,
          () => { ttsQBtn.textContent = '⏹'; ttsQBtn.classList.add('is-playing'); },
          () => { ttsQBtn.textContent = origLabel; ttsQBtn.classList.remove('is-playing'); }
        );
      });
    }
    // T-account playground
    const taDesc = document.getElementById('taDesc');
    if (taDesc) taDesc.addEventListener('input', (e) => { State.taForm.desc = e.target.value; });
    const taAmount = document.getElementById('taAmount');
    if (taAmount) taAmount.addEventListener('input', (e) => { State.taForm.amount = e.target.value; });
    const taDr = document.getElementById('taDr');
    if (taDr) taDr.addEventListener('change', (e) => { State.taForm.dr = e.target.value; });
    const taCr = document.getElementById('taCr');
    if (taCr) taCr.addEventListener('change', (e) => { State.taForm.cr = e.target.value; });
    bind('taPostBtn', 'click', taPost);
    bind('taExampleBtn', 'click', taLoadExample);
    bind('taResetBtn', 'click', taReset);
    document.querySelectorAll('[data-ta-remove]').forEach(el => el.addEventListener('click', () => taRemove(+el.dataset.taRemove)));
    bind('modalCancel', 'click', closeConfirm);
    bind('modalConfirm', 'click', () => {
      const m = State.confirmModal; State.confirmModal = null;
      if (m && typeof m.onConfirm === 'function') m.onConfirm(); else render();
    });
    bind('modalBackdrop', 'click', (e) => { if (e.target.id === 'modalBackdrop') closeConfirm(); });
    // Smart practice & flashcards
    bind('smartPracticeBtn', 'click', startSmartPractice);
    bind('flashcardsBtn', 'click', startFlashcards);
    bind('focusModeBtn', 'click', startFocusPractice);
    bind('lessonDrillAllBtn', 'click', function () {
      const btn = document.getElementById('lessonDrillAllBtn');
      if (btn && btn.dataset.skills) startMultiSkillDrill(btn.dataset.skills);
    });
    // Unit quiz buttons
    document.querySelectorAll('[data-unit-quiz]').forEach(el => el.addEventListener('click', e => { e.stopPropagation(); startUnitQuiz(el.dataset.unitQuiz); }));
    // Unit revision notes buttons
    document.querySelectorAll('[data-unit-rev]').forEach(el => el.addEventListener('click', e => { e.stopPropagation(); startRevision(el.dataset.unitRev); }));
    // Unit collapse/expand headers
    document.querySelectorAll('[data-collapse-unit]').forEach(el => {
      el.addEventListener('click', () => {
        const uid = el.dataset.collapseUnit;
        if (!State.collapsedUnits) State.collapsedUnits = {};
        State.collapsedUnits[uid] = !State.collapsedUnits[uid];
        render();
      });
      el.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); el.click(); } });
    });
    // Revision screen exit
    bind('revisionExitBtn', 'click', goLearn);
    bind('revisionExitBtn2', 'click', goLearn);
    // Skill map drill buttons
    document.querySelectorAll('[data-start-skill]').forEach(el => el.addEventListener('click', () => startPractice('skill:' + el.dataset.startSkill)));
    // Hint button
    bind('hintBtn', 'click', useHint);
    // Lesson start buttons (journey nodes, score screen debrief, done screen "next")
    document.querySelectorAll('[data-lesson]').forEach(el => el.addEventListener('click', () => startLesson(el.dataset.lesson)));
    // Lesson player buttons
    bind('lessonExitBtn', 'click', goLearn);
    bind('lessonExitBtn2', 'click', goLearn);
    bind('lessonBackBtn', 'click', lessonBack);
    bind('lessonContinueBtn', 'click', lessonContinue);
    bind('lessonNextBtn', 'click', lessonContinue);
    bind('lessonRetryBtn', 'click', lessonRetryQuiz);
    bind('lessonDrillBtn', 'click', () => {
      const btn = document.getElementById('lessonDrillBtn');
      if (btn && btn.dataset.topic) startPractice(btn.dataset.topic);
    });
    document.querySelectorAll('[data-lesson-ans]').forEach(el => el.addEventListener('click', () => lessonAnswer(+el.dataset.lessonAns)));
    // Flashcard buttons
    bind('flashExitBtn', 'click', goLearn);
    bind('flashExitBtn2', 'click', goLearn);
    bind('flashFlipBtn', 'click', flashFlip);
    bind('flashFlipBtn2', 'click', flashFlip);
    bind('flashYesBtn', 'click', () => flashGrade(true));
    bind('flashNoBtn', 'click', () => flashGrade(false));
    // T-account guided exercises
    document.querySelectorAll('[data-ta-ex]').forEach(el => el.addEventListener('click', () => startTaExercise(el.dataset.taEx)));
    bind('taExitBtn', 'click', exitTaExercise);
    bind('taExitBtn2', 'click', exitTaExercise);
    bind('taCheckBtn', 'click', checkTaExercise);
    // Swipe support for lesson player
    if (State.screen === 'lesson') {
      const lessonEl = document.querySelector('.lesson-player');
      if (lessonEl) {
        let swipeStartX = 0, swipeStartY = 0;
        lessonEl.addEventListener('touchstart', (e) => {
          swipeStartX = e.touches[0].clientX;
          swipeStartY = e.touches[0].clientY;
        }, { passive: true });
        lessonEl.addEventListener('touchend', (e) => {
          const dx = e.changedTouches[0].clientX - swipeStartX;
          const dy = e.changedTouches[0].clientY - swipeStartY;
          if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) {
            if (dx < 0) lessonContinue(); else lessonBack();
          }
        }, { passive: true });
      }
    }
  }
  function bind(id, ev, fn) { const el = document.getElementById(id); if (el) el.addEventListener(ev, fn); }

  function handleGlobalKey(e) {
    if (e.key === 'Escape' && State.confirmModal) { e.preventDefault(); closeConfirm(); return; }
    if (e.key === 'Escape' && State.referenceOpen) { e.preventDefault(); toggleReference(); return; }
    const t = e.target;
    if (t && /input|textarea|select/i.test(t.tagName)) return;
    if (State.screen === 'quiz' && !State.confirmModal) {
      if (e.key === 'f' || e.key === 'F') {
        e.preventDefault(); toggleFlagCurrent(); return;
      }
      const q = State.questions[State.current];
      if (!isNumeric(q) && isSimpleMcq(q)) {
        const letter = (e.key || '').toUpperCase();
        const idx = ['A','B','C','D'].indexOf(letter);
        if (idx !== -1) {
          const opt = document.querySelector(`[data-opt="${idx}"]`);
          if (opt && !opt.disabled) { e.preventDefault(); opt.click(); }
          return;
        }
      }
      const isAdvanceKey = e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar';
      if (isAdvanceKey) {
        const focusedIsOptionBtn = document.activeElement && document.activeElement.matches && document.activeElement.matches('[data-opt]');
        if (e.key !== 'Enter' && focusedIsOptionBtn) return;
        const next = document.getElementById('nextBtn') || document.getElementById('submitBtn') || document.getElementById('submitNumericBtn') || document.getElementById('submitDragDropBtn') || document.getElementById('submitTableFillBtn') || document.getElementById('submitScenarioBtn') || document.getElementById('submitGapFillBtn') || document.getElementById('submitWordOrderBtn');
        if (next && !next.disabled) { e.preventDefault(); next.click(); }
        return;
      }
      if (e.key === 'ArrowLeft') {
        const prev = document.getElementById('prevBtn');
        if (prev && !prev.disabled) { e.preventDefault(); prev.click(); }
      } else if (e.key === 'ArrowRight') {
        const next = document.getElementById('nextBtn') || document.getElementById('submitBtn');
        if (next && !next.disabled) { e.preventDefault(); next.click(); }
      }
    }
  }

  function init() {
    // Stash original AAT globals so subject-switching can restore them
    if (!window.AAT_TOPICS) { window.AAT_TOPICS = window.TOPICS; window.AAT_QUESTIONS = window.ALL_QUESTIONS; window.AAT_LEARN_PATH = window.LEARN_PATH; window.AAT_SKILLS = window.SKILLS; }
    // Activate the persisted subject
    getSubject(_activeSubjectId).activate();
    Storage.load();
    ensureSkillTags();
    document.body.classList.toggle('dark', Storage.isDarkActive());
    State.referenceOpen = !!Storage.data.settings.refOpen;
    renderReferencePanel();
    updateRefToggleBtn();
    if (Storage.data.settings.seenSplash) State.screen = 'home';
    if (!window.ALL_QUESTIONS || !Array.isArray(window.ALL_QUESTIONS) || !window.ALL_QUESTIONS.length) {
      const el = app(); if (el) el.innerHTML = `<div class="container"><div class="empty-state" role="alert">⚠️ Question bank failed to load. Please reload the page.</div></div>`;
      return;
    }
    render();
    // Bind static header buttons once — they live outside #app and must not accumulate listeners
    const _dt = document.getElementById('darkToggle');
    if (_dt) _dt.addEventListener('click', toggleDarkMode);
    const _rt = document.getElementById('referenceToggle');
    if (_rt) _rt.addEventListener('click', toggleReference);
    const _hn = document.getElementById('homeNavBtn');
    if (_hn) _hn.addEventListener('click', exitQuiz);
    const _ss = document.getElementById('subjectSwitcherBtn');
    if (_ss) _ss.addEventListener('click', () => { State.screen = 'subjects'; render(); });
    document.addEventListener('keydown', handleGlobalKey);
    document.addEventListener('visibilitychange', () => {
      if (document.hidden && audioCtx && audioCtx.state === 'running') { try { audioCtx.suspend(); } catch (e) {} }
    });
    window.addEventListener('beforeunload', stopMockTimer);
    if (window.matchMedia) {
      try {
        const mq = window.matchMedia('(prefers-color-scheme: dark)');
        const handler = () => { if (Storage.data.settings.darkMode == null) render(); };
        if (mq.addEventListener) mq.addEventListener('change', handler);
        else if (mq.addListener) mq.addListener(handler);
      } catch (e) {}
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
