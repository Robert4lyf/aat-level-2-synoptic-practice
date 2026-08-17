/* AAT Level 2 — App Logic (rebuilt with numeric Q + calculator) */
(function () {
  'use strict';

  /* ── CONSTANTS ── */
  const STORAGE_KEY = 'aatPrep_v2';
  const SUBJECT_STORE_KEY = 'multisubject_active';
  let _activeSubjectId = localStorage.getItem(SUBJECT_STORE_KEY) || 'aat';
  function getStorageKey() { return _activeSubjectId === 'aat' ? STORAGE_KEY : 'prep_v2_' + _activeSubjectId; }
  function subjectStorageKey(id) { return id === 'aat' ? STORAGE_KEY : 'prep_v2_' + id; }

  // `assets` lists the data files a subject needs that are NOT loaded eagerly by
  // index.html. The default AAT subject's data (data.js/skills.js/learn-data.js)
  // is loaded up-front; the language subjects' data (~1.6 MB) is fetched on demand
  // the first time the subject is opened — see ensureSubjectAssets()/loadScript().
  const SUBJECT_REGISTRY = [
    {
      /* Level 1 renders itself — see aat1-ui.js — on the same terms as Level 3:
         `ui` names the global that render() delegates to, and app.js takes no
         further part. See the note on the Level 3 entry below for why. */
      id: 'aat1', name: 'AAT Level 1', short: 'AAT L1', flag: '📘', color: '#0D8A7A',
      desc: 'Bookkeeping Fundamentals — the Level 1 Award in Bookkeeping',
      meta: '26 steps · 5 outcomes · beginner',
      tabs: ['home'],
      ui: 'AAT1_UI',
      assets: ['aat1-syllabus.js', 'aat1-learn-data.js', 'aat1-practice-data.js', 'aat1-ui.js'],
      activate() {
        /* No shared globals: Level 1 reads its own data directly. Empty values
           keep any incidental app.js reference safe. */
        window.TOPICS = []; window.ALL_QUESTIONS = []; window.LEARN_PATH = []; window.SKILLS = { defs: [] };
      }
    },
    {
      id: 'aat', name: 'AAT Level 2', short: 'AAT L2', flag: '🧮', color: '#2563EB',
      desc: 'Bookkeeping, controls, costing and business environment — the Q2022 Level 2 Certificate in Accounting',
      meta: '4 units · 68 lessons · mock exams',
      tabs: ['learn','home','tools','glossary','progress','howto'],
      assets: [],
      activate() { window.TOPICS = window.AAT_TOPICS; window.ALL_QUESTIONS = window.AAT_QUESTIONS; window.LEARN_PATH = window.AAT_LEARN_PATH; window.SKILLS = window.AAT_SKILLS; }
    },
    {
      /* Level 3 renders itself — see aat3-ui.js. render() delegates to it and
         app.js takes no further part, so the Level 2 journey and lesson player
         (shared by every other subject, and covered by no behavioural tests)
         are untouched by anything Level 3 does. */
      id: 'aat3', name: 'AAT Level 3', short: 'AAT L3', flag: '📗', color: '#4F46E5',
      desc: 'Tax Processes for Businesses — VAT and payroll for the Q2022 Level 3 Diploma',
      meta: '5 outcomes · 21 lessons · FA2025',
      tabs: ['home'],
      ui: 'AAT3_UI',
      assets: ['aat3-syllabus.js', 'aat3-tax-data.js', 'aat3-learn-data.js', 'aat3-practice-data.js', 'aat3-ui.js'],
      activate() {
        /* No shared globals: Level 3 reads its own data directly. Empty values
           keep any incidental app.js reference safe. */
        window.TOPICS = []; window.ALL_QUESTIONS = []; window.LEARN_PATH = []; window.SKILLS = { defs: [] };
      }
    },
    {
      id: 'french', name: 'Français', short: 'Français', flag: '🇫🇷', color: '#003189',
      desc: 'Apprenez le vocabulaire, la grammaire et la conversation française',
      meta: '180+ questions · 37 leçons · A1–B1 + histoires + examens',
      tabs: ['learn','home','listen','delf','clinic','progress'],
      assets: ['french-data.js', 'delf-data.js'],
      activate() { window.TOPICS = window.FR_TOPICS; window.ALL_QUESTIONS = window.FR_QUESTIONS; window.LEARN_PATH = window.FR_LEARN_PATH; window.SKILLS = { defs: [] }; }
    },
    {
      id: 'lsf', name: 'Langue des Signes Française', short: 'LSF', flag: '🤟', color: '#7c3aed',
      desc: 'Découvrez les bases de la LSF — la langue des signes française',
      meta: '50+ questions · 4 leçons · débutant',
      tabs: ['learn','home','progress'],
      assets: ['lsf-data.js'],
      activate() { window.TOPICS = window.LSF_TOPICS; window.ALL_QUESTIONS = window.LSF_QUESTIONS; window.LEARN_PATH = window.LSF_LEARN_PATH; window.SKILLS = { defs: [] }; }
    },
    {
      id: 'code-route', name: 'Code de la Route', short: 'Code de la Route', flag: '🚗', color: '#dc2626',
      desc: 'Préparez votre permis de conduire — théorie et panneaux',
      meta: '80+ questions · 5 leçons · examen officiel',
      tabs: ['learn','home','progress'],
      assets: ['code-route-data.js'],
      activate() { window.TOPICS = window.CR_TOPICS; window.ALL_QUESTIONS = window.CR_QUESTIONS; window.LEARN_PATH = window.CR_LEARN_PATH; window.SKILLS = { defs: [] }; }
    },
  ];
  function getSubject(id) { return SUBJECT_REGISTRY.find(s => s.id === id) || SUBJECT_REGISTRY[0]; }

  /* ── Lazy subject-data loading ──────────────────────────────────────────────
     Language-subject data files are injected on demand rather than shipped in
     index.html, so the default AAT load no longer parses ~1.6 MB of unused JS.
     loadScript() is idempotent and preserves execution order (async = false);
     the files remain in the service-worker precache, so this still works offline. */
  const _assetPromises = Object.create(null);
  const _assetReady = new Set();
  function loadScript(src) {
    if (_assetReady.has(src)) return Promise.resolve();
    if (_assetPromises[src]) return _assetPromises[src];
    _assetPromises[src] = new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = src;
      s.async = false; // preserve order for subjects with multiple data files
      s.onload = () => { _assetReady.add(src); resolve(); };
      s.onerror = () => { delete _assetPromises[src]; reject(new Error('Failed to load ' + src)); };
      (document.head || document.documentElement).appendChild(s);
    });
    return _assetPromises[src];
  }
  function subjectAssetsReady(id) { return (getSubject(id).assets || []).every(a => _assetReady.has(a)); }
  function ensureSubjectAssets(id) { return Promise.all((getSubject(id).assets || []).map(loadScript)); }

  /* Maps a French question ID (fr-NNN) to its CEFR level string.
     A1 = beginner basics, A2 = elementary grammar/vocab, B1 = intermediate structures. */
  // Cache: question id → CEFR level, derived from lesson assignments in FR_LEARN_PATH.
  // Built lazily on first call after ALL_QUESTIONS is populated.
  let _frQLevelCache = null;
  function frQuestionLevel(id) {
    // Build lesson-based cache once ALL_QUESTIONS is available
    if (!_frQLevelCache && window.ALL_QUESTIONS && window.ALL_QUESTIONS.length) {
      _frQLevelCache = {};
      const cefrMap = { 'fr-a1': 'A1', 'fr-a2': 'A2', 'fr-b1': 'B1', 'fr-b2': 'B2' };
      const lessonLevel = {};
      for (const unit of (window.FR_LEARN_PATH || [])) {
        const lv = cefrMap[unit.id] || 'A2';
        for (const l of (unit.lessons || [])) lessonLevel[l.id] = lv;
      }
      for (const q of window.ALL_QUESTIONS) {
        if (q.id && q.lesson && lessonLevel[q.lesson]) _frQLevelCache[q.id] = lessonLevel[q.lesson];
      }
    }
    if (_frQLevelCache && _frQLevelCache[id] !== undefined) return _frQLevelCache[id];
    // Fallback for questions without a lesson field (clinic/supplementary questions)
    const n = parseInt(id.replace('fr-', ''), 10);
    if (isNaN(n)) return null;
    if (n >= 561 && n <= 575) return 'B1';
    if (n >= 606 && n <= 617) return 'B1';
    if (n >= 646 && n <= 652) return 'B1';
    if (n >= 669 && n <= 672) return 'B1';
    return 'A2';
  }
  /* ── XP / Level helpers (FF-style scaling) ──────────────────────────────
     xpForLevel(n)  → total cumulative XP needed to reach level n.
     Curve: 100 × (n−1)^1.5  — cheap early levels, steep late levels.
     Level 2=100 · Level 5=800 · Level 10=2700 · Level 20=8280          */
  function xpForLevel(n) {
    return n <= 1 ? 0 : Math.floor(100 * Math.pow(n - 1, 1.5));
  }
  function levelFromXp(xp) {
    let lv = 1;
    while (xpForLevel(lv + 1) <= xp) lv++;
    return lv;
  }

  /* Returns true if the given CEFR level (A1/A2/B1/B2) is unlocked for the French course.
     A1 is always open; A2 requires all A1 done + A1 quiz; B1 requires A2; B2 requires B1. */
  function frLevelUnlocked(cefrLevel) {
    if (_activeSubjectId !== 'french') return true;
    if (!cefrLevel || cefrLevel === 'A1') return true;
    const prereqLevel  = cefrLevel === 'B2' ? 'B1' : cefrLevel === 'B1' ? 'A2' : 'A1';
    const prereqUnitId = cefrLevel === 'B2' ? 'fr-b1' : cefrLevel === 'B1' ? 'fr-a2' : 'fr-a1';
    const prereqUnit   = (window.LEARN_PATH || []).find(u => (u.unit || u.id) === prereqUnitId);
    if (!prereqUnit) return false;
    if (!prereqUnit.lessons.every(L => isLessonDone(L.id))) return false;
    const unitTest = (Storage.data.learn.unitTests || {})[prereqUnitId];
    return !!(unitTest && unitTest.passed);
  }

  /* Maps fr-gram lesson IDs to their CEFR level, derived from FR_LEARN_PATH unit membership. */
  const FR_GRAM_LESSON_LEVEL = {
    'fr-l02': 'A1', 'fr-l04': 'A1', 'fr-l05': 'A1', 'fr-l09': 'A1',
    'fr-l10': 'A1', 'fr-l11': 'A1', 'fr-l12': 'A1', 'fr-l13': 'A1',
    'fr-l15': 'A1', 'fr-l16': 'A1', 'fr-l40': 'A1', 'fr-l41': 'A1',
    'fr-l86': 'A1', 'fr-l92': 'A1',
    'fr-l19': 'A2', 'fr-l21': 'A2', 'fr-l22': 'A2', 'fr-l23': 'A2',
    'fr-l24': 'A2', 'fr-l25': 'A2', 'fr-l43': 'A2',
    'fr-l70': 'A2', 'fr-l71': 'A2', 'fr-l72': 'A2', 'fr-l73': 'A2',
    'fr-l82': 'A2', 'fr-l87': 'A2',
    'fr-l27': 'B1', 'fr-l28': 'B1', 'fr-l29': 'B1', 'fr-l30': 'B1', 'fr-l44': 'B1',
    'fr-l83': 'B1', 'fr-l84': 'B1', 'fr-l85': 'B1', 'fr-l88': 'B1', 'fr-l89': 'B1',
    'fr-l90': 'B1', 'fr-l91': 'B1',
    'fr-l93': 'B2', 'fr-l94': 'B2', 'fr-l95': 'B2', 'fr-l96': 'B2',
  };

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
  /* ── SYNOPTIC BLUEPRINT ──────────────────────────────────────────────────
     The AAT Level 2 synoptic assessment IS The Business Environment (BESY):
     2 hours, 8 tasks, 100 marks. It draws on BESY in full plus the bookkeeping
     units, and — per the AAT assessment specification — Principles of Costing
     is a unit assessment ONLY and is never assessed in the synoptic.

     Marks by source unit: BESY ~70 · ITBK ~20 · POBC ~10 · POC 0. (Tasks 4 and
     7 are mixed by definition, so the 58 marks of pure-BESY tasks understates
     BESY's real share and 32 overstates ITBK's.)

     `marks` is the task's mark allocation. Per-sitting allocations vary a
     little, so treat these as representative — `markRange` records the observed
     spread. Tasks 4 and 7 are human-marked in the real assessment (extended
     written response), which is why they carry `written: true`.

     Each task lists its areas with a mark quota. Splitting the quota matters for
     Tasks 4 and 7: they combine a written communication element with genuine
     bookkeeping work, and without an explicit split the random draw fills them
     with whichever area has more questions — which skews the whole paper away
     from the real ITBK ~32 / POBC ~10 / BESY ~58 balance. */
  const SYNOPTIC_BLUEPRINT = [
    { n: 1, title: 'Business types and their functions', marks: 10, markRange: [8, 12],
      areas: [{ area: 'besy-structure', marks: 10 }] },
    { n: 2, title: 'The finance function and its information', marks: 13, markRange: [10, 15],
      areas: [{ area: 'besy-finance', marks: 13 }] },
    { n: 3, title: 'CSR, ethics and sustainability', marks: 14, markRange: [12, 16],
      areas: [{ area: 'besy-ethics', marks: 14 }] },
    { n: 4, title: 'Bookkeeping transactions and communicating information', marks: 22, markRange: [18, 24],
      written: true,
      areas: [{ area: 'besy-comms', marks: 6, written: true }, { area: 'itbk', marks: 16 }] },
    { n: 5, title: 'Control accounts, reconciliations and journals', marks: 10, markRange: [8, 12],
      areas: [{ area: 'pobc', marks: 10 }] },
    { n: 6, title: 'The principles of contract law', marks: 7, markRange: [6, 10],
      areas: [{ area: 'besy-law', marks: 7 }] },
    { n: 7, title: 'Bookkeeping systems, receipts, payments and data security', marks: 10, markRange: [8, 12],
      written: true,
      areas: [{ area: 'besy-tech', marks: 6, written: true }, { area: 'itbk', marks: 4 }] },
    // Tasks 4 and 7 are mixed by definition — "bookkeeping transactions AND
    // communicating information", "bookkeeping systems AND data security" — so
    // their 32 marks split rather than counting wholly to ITBK.
    { n: 8, title: 'The external business environment', marks: 14, markRange: [12, 16],
      areas: [{ area: 'besy-econ', marks: 14 }] },
  ];
  /* Kept as an alias so older references keep resolving. */
  const MOCK_BLUEPRINT = SYNOPTIC_BLUEPRINT;
  const SYNOPTIC_TOTAL_MARKS = SYNOPTIC_BLUEPRINT.reduce((s, t) => s + t.marks, 0);
  /* POC is a unit assessment only — it must never enter a synoptic mock. */
  const SYNOPTIC_EXCLUDED_TOPICS = ['poc'];
  const MOCK_DURATION_MS = 120 * 60 * 1000;
  const MOCK_WARN_MS = 10 * 60 * 1000;
  const MOCK_DANGER_MS = 2 * 60 * 1000;

  /* ── UNIT ASSESSMENTS ────────────────────────────────────────────────────
     The three bookkeeping/costing units each have their own 90-minute
     computer-based assessment, sat separately from the synoptic. */
  const UNIT_ASSESSMENTS = [
    { id: 'itbk', title: 'Introduction to Bookkeeping', durationMin: 90, marks: 100 },
    { id: 'pobc', title: 'Principles of Bookkeeping Controls', durationMin: 90, marks: 100 },
    { id: 'poc', title: 'Principles of Costing', durationMin: 90, marks: 100 },
  ];
  const HISTORY_LIMIT = 20;
  const LETTERS = ['A', 'B', 'C', 'D'];
  /* Default marks for a question that does not declare its own. */
  const DEFAULT_QUESTION_MARKS = 1;
  function questionMarks(q) {
    if (!q) return DEFAULT_QUESTION_MARKS;
    if (Number.isFinite(q.marks) && q.marks > 0) return q.marks;
    if (q.type === 'written' && Array.isArray(q.rubric)) {
      return q.rubric.reduce((s, r) => s + (Number(r.marks) || 0), 0) || DEFAULT_QUESTION_MARKS;
    }
    if (q.type === 'truefalse' && Array.isArray(q.statements)) return q.statements.length;
    if (q.type === 'scenario' && Array.isArray(q.parts)) {
      return q.parts.reduce((s, p) => s + questionMarks(p), 0) || DEFAULT_QUESTION_MARKS;
    }
    return DEFAULT_QUESTION_MARKS;
  }

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
        'LIFO: newest items issued first; examined for internal use only, and not permitted under IFRS or UK GAAP',
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
      { title: 'ETB column guide (L3 FAPS)', items: [
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

  /* ── LEVEL 3 BRIDGE — "What's next" preview data ──────────────────────────
     Q2022 Level 3 Diploma in Accounting: FOUR units, no synoptic assessment.
     AQ2016's Advanced Bookkeeping and Final Accounts Preparation were merged
     into FAPS, and the Level 3 Professional Synoptic was withdrawn for
     non-apprentices. Do not reintroduce AVBK or PSYA. */
  const L3_BRIDGE = [
    {
      unit: 'FAPS', title: 'Financial Accounting: Preparing Financial Statements', icon: '📗',
      buildsOn: ['ITBK', 'POBC'], topicIds: ['itbk', 'pobc'],
      exam: 'Computer-based', time: '2h 30min', tasks: 6, passmark: 70,
      desc: 'Extended trial balance, adjustments and the financial statements of sole traders and partnerships. Absorbs the old Advanced Bookkeeping and Final Accounts Preparation units.',
      entrySkills: ['Double-entry to trial balance', 'Accruals & prepayments', 'Depreciation (SL & reducing balance)', 'SLCA & PLCA control accounts'],
      topics: ['Extended trial balance', 'Accounting adjustments & period-end', 'Asset disposals & part-exchange', 'Sole trader income statement & SoFP', 'Partnership accounts & appropriation', 'Incomplete records'],
    },
    {
      unit: 'MATS', title: 'Management Accounting Techniques', icon: '📙',
      buildsOn: ['POC'], topicIds: ['poc'],
      exam: 'Computer-based', time: '2h 30min', tasks: 8, passmark: 70,
      desc: 'Costing techniques, budgeting, variance analysis and cash management for internal decision-making.',
      entrySkills: ['Marginal vs absorption costing', 'Cost classification & coding', 'Break-even & contribution analysis', 'Inventory valuation (FIFO/AVCO)'],
      topics: ['Standard costing & variances', 'Overhead absorption & apportionment', 'Budgeting and flexed budgets', 'Cash management & forecasting', 'Decision-making techniques'],
    },
    {
      unit: 'TPFB', title: 'Tax Processes for Businesses', icon: '📕',
      buildsOn: ['ITBK', 'POBC'], topicIds: ['itbk', 'pobc'],
      exam: 'Computer-based', time: '1h 30min', tasks: 8, passmark: 70,
      desc: 'VAT returns, payroll reporting obligations and the legal and ethical framework around business taxes.',
      entrySkills: ['VAT accounting (standard & cash)', 'Payroll basics & deductions', 'Record-keeping principles', 'Professional ethics'],
      topics: ['VAT registration & schemes', 'Completing and submitting VAT returns', 'Errors, penalties and adjustments', 'Payroll reporting to HMRC', 'Making Tax Digital (MTD)'],
    },
    {
      unit: 'BUAW', title: 'Business Awareness', icon: '📓',
      buildsOn: ['BESY'], topicIds: ['besy'],
      exam: 'Computer-based', time: '2h', tasks: 6, passmark: 70,
      desc: 'The business environment, professional ethics, technology and the role of the accountant, taken further than at Level 2.',
      entrySkills: ['Business types & organisation', 'AAT Code of Professional Ethics', 'Contract law fundamentals', 'Data security awareness'],
      topics: ['Micro and macro environment analysis', 'Business types, structure and governance', 'Professional ethics in practice', 'Technology and data in accounting', 'Communicating information effectively'],
    },
  ];

  /* How each unit is actually assessed. Two separate routes, so a single
     percentage cannot express it: three units have their own 90-minute exam,
     and the synoptic (which IS The Business Environment) draws on BESY in full
     plus parts of ITBK and POBC. Principles of Costing is never in the synoptic. */
  const UNIT_ASSESSMENT_INFO = {
    itbk: { ownExam: '90-min unit assessment', synopticMarks: 20 },
    pobc: { ownExam: '90-min unit assessment', synopticMarks: 10 },
    poc:  { ownExam: '90-min unit assessment', synopticMarks: 0  },
    besy: { ownExam: null,                     synopticMarks: 70 },
  };
  /* Short label for a unit card — states both routes honestly. */
  function unitAssessmentLabel(uid) {
    const info = UNIT_ASSESSMENT_INFO[uid];
    if (!info) return '';
    if (!info.ownExam) return `Synoptic only · ~${info.synopticMarks}% of the paper`;
    if (!info.synopticMarks) return `${info.ownExam} · not in the synoptic`;
    return `${info.ownExam} · ~${info.synopticMarks}% of the synoptic`;
  }

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

  /* ── Adaptive spaced repetition (SM-2-lite) ───────────────────────────────
     Replaces the fixed Leitner ladder for question-level review. Each item
     carries its own `ease` (difficulty) and `interval`, so easy items space out
     quickly while stubborn ones stay frequent — tuned per item, not one schedule
     for all. Grading is binary (recalled / not). Drives quizzes, Active Recall,
     Smart Practice and the daily-review nudge. (The AAT glossary flashcards keep
     their own simple box model.) */
  const SR_DAY_MS = 24 * 60 * 60 * 1000;
  const SR_EASE_DEFAULT = 2.5, SR_EASE_MIN = 1.3, SR_EASE_MAX = 2.7;
  function srSchedule(rec, correct) {
    let ease = (rec && typeof rec.ease === 'number') ? rec.ease : SR_EASE_DEFAULT;
    let reps = (rec && typeof rec.reps === 'number') ? rec.reps : 0;
    let interval = (rec && typeof rec.interval === 'number') ? rec.interval : 0;
    if (correct) {
      reps += 1;
      if (reps === 1) interval = 1;
      else if (reps === 2) interval = 3;
      else interval = Math.max(1, Math.round(interval * ease));
      ease = Math.min(SR_EASE_MAX, ease + 0.08);   // reward consistent recall
    } else {
      reps = 0;
      interval = 1;                                 // relearn from tomorrow
      ease = Math.max(SR_EASE_MIN, ease - 0.2);     // missed → comes back sooner for longer
    }
    interval = Math.min(interval, 365);
    return {
      ease: Math.round(ease * 100) / 100,
      reps, interval,
      dueAt: Date.now() + interval * SR_DAY_MS,
      lastResult: !!correct,
    };
  }
  // Convert a legacy Leitner box record {box,dueAt} to the adaptive model.
  function srMigrate(r) {
    const box = Math.max(1, Math.min(SR_MAX_BOX, (r && r.box) || 1));
    const days = [1, 3, 7, 14, 30][box - 1] || 1;
    return {
      ease: SR_EASE_DEFAULT, reps: box, interval: days,
      dueAt: (r && r.dueAt) || (Date.now() + days * SR_DAY_MS),
      lastResult: r && r.lastResult,
    };
  }

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
    story: { v: 1, days: {} },
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
        // Migrate legacy Leitner box records to the adaptive (SM-2-lite) model.
        for (const id in this.data.sr) {
          const r = this.data.sr[id];
          if (r && typeof r.ease !== 'number') this.data.sr[id] = srMigrate(r);
        }
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
        // Story progress is versioned: a content rewrite that changes what a day
        // means should reset its record rather than show a score for a day that
        // no longer exists in that form.
        const sd = this.data.story;
        this.data.story = (sd && typeof sd === 'object' && sd.v === 1) ? sd : { v: 1, days: {} };
        this.data.story.days = this.data.story.days || {};
        // Keep only the most recent 60 days of daily activity
        const dayKeys = Object.keys(this.data.daily).sort();
        while (dayKeys.length > 60) delete this.data.daily[dayKeys.shift()];
      } catch (e) { this.data = defaultData(); }
    },
    save() {
      /* Debounced inside ProgressSync — a run of ten answers is one upload. */
      if (window.ProgressSync) window.ProgressSync.noteLocalChange({ onRemoteChange: onRemoteProgress });
      try { localStorage.setItem(getStorageKey(), JSON.stringify(this.data)); }
      catch (e) {
        if (e && (e.name === 'QuotaExceededError' || e.name === 'NS_ERROR_DOM_QUOTA_REACHED')) {
          showToast('⚠️ Storage full — your progress may not be saving. Try clearing old browser data.', 'warn');
        }
      }
    },
    /* `opts.selfAssessed` marks an answer the student graded themselves against a
       rubric — the `written` type, which is human-marked in the real assessment.
       Those answers are still recorded: they count as seen, they drive spaced
       repetition, the mistake notebook and daily activity. But they are tallied
       into the parallel self* counters so that objAcc() can keep them out of every
       attainment figure — the readiness meter, topic mastery, the weakness
       dashboard and the skill map. A mark you awarded yourself must never read as
       an objective one. */
    recordAnswer(question, correct, opts) {
      const selfAssessed = !!(opts && opts.selfAssessed);
      const qs = this.data.stats.questions[question.id] || { attempts: 0, correct: 0, lastSeen: null };
      qs.attempts++; qs.seen = true;
      if (correct) qs.correct++;
      else qs.lastWrong = Date.now();
      if (selfAssessed) {
        qs.selfAttempts = (qs.selfAttempts || 0) + 1;
        if (correct) qs.selfCorrect = (qs.selfCorrect || 0) + 1;
      }
      qs.lastSeen = Date.now();
      this.data.stats.questions[question.id] = qs;
      const ts = this.data.stats.topics[question.topic] || { attempts: 0, correct: 0 };
      ts.attempts++; if (correct) ts.correct++;
      if (selfAssessed) {
        ts.selfAttempts = (ts.selfAttempts || 0) + 1;
        if (correct) ts.selfCorrect = (ts.selfCorrect || 0) + 1;
      }
      this.data.stats.topics[question.topic] = ts;
      // A self-scored answer neither extends nor breaks the objective answer streak.
      const st = this.data.stats.streak;
      if (selfAssessed) { /* no streak effect */ }
      else if (correct) { st.current++; if (st.current > st.best) st.best = st.current; st.lastCorrectAt = Date.now(); }
      else { st.current = 0; }
      // Adaptive spaced-repetition update
      this.data.sr[question.id] = srSchedule(this.data.sr[question.id], correct);
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
      const prevLevel = levelFromXp(this.data.learn.xp);
      this.data.learn.xp = Math.min(999999, this.data.learn.xp + n);
      this.day().xp += n;
      const newLevel = levelFromXp(this.data.learn.xp);
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
        return r && r.dueAt && r.dueAt <= now;
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
  /* Objective attempts/correct from a stats record — total less the self-assessed
     subset. Every displayed attainment percentage goes through this, so a mark the
     student awarded their own prose against a rubric can never inflate it. Records
     saved before self* tracking existed have no self* fields and read as fully
     objective, which is the only honest reading available for them. */
  function objAcc(rec) {
    if (!rec) return { attempts: 0, correct: 0 };
    return {
      attempts: Math.max(0, (rec.attempts || 0) - (rec.selfAttempts || 0)),
      correct:  Math.max(0, (rec.correct  || 0) - (rec.selfCorrect  || 0)),
    };
  }

  function skillAccuracy() {
    // Per-skill lifetime accuracy from the question-level stats (objective only)
    const out = {};
    for (const [id, s] of Object.entries(Storage.data.stats.questions)) {
      const q = questionById(id);
      if (!q || !q.skill) continue;
      const rec = out[q.skill] || (out[q.skill] = { attempts: 0, correct: 0 });
      const a = objAcc(s);
      rec.attempts += a.attempts; rec.correct += a.correct;
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
  /* Achievements count the qualification's OWN units, never a `preview: true`
     one. The AAT journey used to carry four Level 3 preview units alongside its
     four Level 2 units, and counting them made "Unit master" unreachable and
     made the Level 2 progress meter read out of 8. Those previews have since
     been removed from learn-data.js — the Level 3 material lives in the AAT
     Level 3 subject, and the "what's next" panel below is built from L3_BRIDGE
     rather than from lesson data. The filter stays because it is the correct
     rule for any preview unit a subject may add later, and because subjects
     that set no `level` (French, LSF, Code de la Route) must be unaffected:
     everything counts for them, as before. */
  function qualificationUnits() {
    return (window.LEARN_PATH || []).filter(u => !u.preview);
  }
  function qualificationLessons() {
    return qualificationUnits().reduce((acc, u) => acc.concat(u.lessons), []);
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
    { id: 'all-units', icon: '👑', name: 'Grand Master', desc: 'Complete every lesson in every unit', hint: 'Every lesson in all four units' },
  ];
  function badgeEarnedTest(id) {
    const d = Storage.data;
    const lessonsDone = Object.keys(d.learn.lessons).length;
    switch (id) {
      case 'first-lesson': return lessonsDone >= 1;
      case 'ten-lessons': return lessonsDone >= 10;
      case 'path-complete': {
        const all = qualificationLessons();
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
        const qu = qualificationUnits();
        return qu.length > 0 && qu.every(u => ut[u.unit] && ut[u.unit].passed);
      }
      case 'unit-itbk': return !!((window.LEARN_PATH||[]).find(u=>u.unit==='itbk')?.lessons.every(l=>isLessonDone(l.id)));
      case 'unit-pobc': return !!((window.LEARN_PATH||[]).find(u=>u.unit==='pobc')?.lessons.every(l=>isLessonDone(l.id)));
      case 'unit-poc':  return !!((window.LEARN_PATH||[]).find(u=>u.unit==='poc')?.lessons.every(l=>isLessonDone(l.id)));
      case 'unit-besy': return !!((window.LEARN_PATH||[]).find(u=>u.unit==='besy')?.lessons.every(l=>isLessonDone(l.id)));
      case 'all-units': {
        const all = qualificationLessons();
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
      case 'path-complete': { const all = qualificationLessons(); return { cur: all.filter(L => isLessonDone(L.id)).length, max: all.length }; }
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
      case 'unit-complete': { const ut = d.learn.unitTests || {}; const qu = qualificationUnits(); return { cur: qu.filter(u => ut[u.unit] && ut[u.unit].passed).length, max: qu.length || 4 }; }
      case 'combo-5':       return { cur: Math.min(5, d.learn.bestCombo || 0), max: 5 };
      case 'perfect-practice': return { cur: d.history.some(h => h.mode === 'practice' && h.total >= 10 && h.pct === 100) ? 1 : 0, max: 1 };
      case 'unit-itbk': { const u = (window.LEARN_PATH||[]).find(u=>u.unit==='itbk'); return u ? { cur: u.lessons.filter(l=>isLessonDone(l.id)).length, max: u.lessons.length } : { cur: 0, max: 14 }; }
      case 'unit-pobc': { const u = (window.LEARN_PATH||[]).find(u=>u.unit==='pobc'); return u ? { cur: u.lessons.filter(l=>isLessonDone(l.id)).length, max: u.lessons.length } : { cur: 0, max: 14 }; }
      case 'unit-poc':  { const u = (window.LEARN_PATH||[]).find(u=>u.unit==='poc');  return u ? { cur: u.lessons.filter(l=>isLessonDone(l.id)).length, max: u.lessons.length } : { cur: 0, max: 14 }; }
      case 'unit-besy': { const u = (window.LEARN_PATH||[]).find(u=>u.unit==='besy'); return u ? { cur: u.lessons.filter(l=>isLessonDone(l.id)).length, max: u.lessons.length } : { cur: 0, max: 14 }; }
      case 'all-units': { const all = qualificationLessons(); return { cur: all.filter(L => isLessonDone(L.id)).length, max: all.length }; }
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
      }
    } else {
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
      ddSelectedLeft: null, ddMap: {}, tfDraft: {}, scDraft: {}, gfDraft: {}, woDraft: [], typedDraft: '',
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

  // Timestamp of the last question transition; used to suppress ghost-tap auto-selects.
  let _lastTransitionTime = 0;

  /* ── TTS (French pronunciation via Web Speech API) ── */
  let _frVoice = null;
  let _delfActiveTtsBtn = null;  // tracks which DELF play button is currently speaking
  function getFrenchVoice() {
    if (_frVoice) return _frVoice;
    const voices = (window.speechSynthesis && window.speechSynthesis.getVoices) ? window.speechSynthesis.getVoices() : [];
    _frVoice = voices.find(v => v.lang === 'fr-FR') || voices.find(v => v.lang.startsWith('fr')) || null;
    return _frVoice;
  }
  function getAllFrenchVoices() {
    if (!window.speechSynthesis || !window.speechSynthesis.getVoices) return [];
    return window.speechSynthesis.getVoices().filter(v => v.lang.startsWith('fr'));
  }
  function speakFrench(text, onPlay, onDone, rate) {
    if (!window.speechSynthesis || !text) return;
    window.speechSynthesis.cancel();
    const utt = new SpeechSynthesisUtterance(text);
    utt.lang = 'fr-FR';
    utt.rate = rate || 0.85;
    const voice = getFrenchVoice();
    if (voice) utt.voice = voice;
    if (onPlay) onPlay();
    const finish = () => { if (onDone) onDone(); };
    utt.onend = finish;
    utt.onerror = finish;
    window.speechSynthesis.speak(utt);
  }
  /* Read a list of French lines aloud in sequence (story read-along). */
  function speakSequence(texts, onStart, onDone) {
    if (!window.speechSynthesis || !texts || !texts.length) { if (onDone) onDone(); return; }
    window.speechSynthesis.cancel();
    const voice = getFrenchVoice();
    let remaining = texts.length;
    texts.forEach((t, i) => {
      const u = new SpeechSynthesisUtterance(t);
      u.lang = 'fr-FR'; u.rate = 0.9;
      if (voice) u.voice = voice;
      if (i === 0 && onStart) u.onstart = onStart;
      u.onend = u.onerror = () => { remaining--; if (remaining <= 0 && onDone) onDone(); };
      window.speechSynthesis.speak(u);
    });
  }
  /* Speak a DELF dialogue, alternating voices/pitch between speakers.
     Lines beginning with – are treated as separate speaker turns.
     Falls back to plain speakFrench for single-speaker recordings. */
  function speakDelfDialogue(rawText, onPlay, onDone) {
    if (!window.speechSynthesis || !rawText) { if (onDone) onDone(); return; }
    window.speechSynthesis.cancel();
    const lines = rawText.split('\n').map(l => l.trim()).filter(Boolean);
    const isDialogue = lines.some(l => /^[–\-]/.test(l));
    if (!isDialogue) {
      speakFrench(lines.join(' '), onPlay, onDone);
      return;
    }
    const frVoices = getAllFrenchVoices();
    const v1 = frVoices[0] || null;
    const v2 = frVoices[1] || v1;
    const utterances = [];
    lines.forEach(line => {
      const text = line.replace(/^[–\-]\s*/, '').trim();
      if (!text) return;
      const even = utterances.length % 2 === 0;
      const utt = new SpeechSynthesisUtterance(text);
      utt.lang = 'fr-FR';
      utt.rate = even ? 0.82 : 1.0;
      if (even ? v1 : v2) utt.voice = even ? v1 : v2;
      utt.pitch = even ? 1.0 : 1.5;
      utterances.push(utt);
    });
    if (!utterances.length) { if (onDone) onDone(); return; }
    if (onPlay) onPlay();
    utterances[utterances.length - 1].onend  = () => { if (onDone) onDone(); };
    utterances[utterances.length - 1].onerror = () => { if (onDone) onDone(); };
    utterances.forEach(u => window.speechSynthesis.speak(u));
  }
  function stopSpeech() { if (window.speechSynthesis) window.speechSynthesis.cancel(); }
  function hasFrenchTts() { return !!(window.speechSynthesis && getFrenchVoice()); }
  /* Returns HTML for the "no voice" note — shown when speechSynthesis exists but no fr voice found. */
  function frNoVoiceNote() {
    if (!window.speechSynthesis) return '';
    return '<span class="tts-unavail" role="note">🔇 No French voice on this device — audio unavailable</span>';
  }
  /* Shared TTS button HTML for in-question listen buttons. */
  function frTtsBtn(id, label) {
    if (!window.speechSynthesis) return '';
    return hasFrenchTts()
      ? `<button class="tts-q-btn" id="${escapeHtml(id)}" type="button" aria-label="${escapeHtml(label)}" title="${escapeHtml(label)}">🔊 ${escapeHtml(label)}</button>`
      : frNoVoiceNote();
  }
  if (typeof window !== 'undefined' && window.speechSynthesis && 'onvoiceschanged' in window.speechSynthesis) {
    window.speechSynthesis.onvoiceschanged = () => { _frVoice = null; getFrenchVoice(); };
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

  // Strip dangerous patterns from trusted HTML card bodies (script, iframe, on* handlers, javascript: URIs).
  // Data files are authored by us, so this is belt-and-suspenders for public deployment.
  function sanitizeCardBody(html) {
    if (!html) return '';
    return html
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
      .replace(/\son\w+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]*)/gi, '')
      .replace(/\bhref\s*=\s*["']javascript:[^"']*["']/gi, 'href="#"')
      .replace(/\bsrc\s*=\s*["']javascript:[^"']*["']/gi, '');
  }

  let QUESTION_INDEX = null;
  function questionById(id) {
    if (!QUESTION_INDEX) { QUESTION_INDEX = Object.create(null); for (const q of window.ALL_QUESTIONS) QUESTION_INDEX[q.id] = q; }
    return QUESTION_INDEX[id];
  }
  function getGlobalProgress() {
    const stats = Storage.data.stats.questions, total = window.ALL_QUESTIONS.length;
    const seen = Object.keys(stats).length;
    const correct = Object.values(stats).filter(q => objAcc(q).correct > 0).length;
    return { total, seen, correct,
      seenPct: total ? Math.round((seen/total)*100) : 0,
      masteryPct: total ? Math.round((correct/total)*100) : 0 };
  }

  function getWeakTopics() {
    const stats = Storage.data.stats.topics;
    return (window.TOPICS || [])
      .map(t => {
        const s = objAcc(stats[t.id]);
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
  function isTyped(q) { return q && q.type === 'typed'; }
  function isListenTyped(q) { return q && q.type === 'listen-typed'; }
  function isTrueFalse(q) { return q && q.type === 'truefalse'; }
  function isMultiSelect(q) { return q && q.type === 'multiselect'; }
  function isWritten(q) { return q && q.type === 'written'; }
  function isSimpleMcq(q) { return q && (!q.type || q.type === 'mcq'); }

  // Flip mode helpers (French only): detect FR→EN MCQ and reverse direction
  function isFrToEnMcq(q) {
    if (!q || q.type !== 'mcq') return false;
    if (!/^(what does\s+"[^"]+"|"[^"]+"\s+(means?\??|is\??))/i.test(q.q.trim())) return false;
    // Exclude grammar questions where the answer is French (e.g. '"Les yeux" is the IRREGULAR plural of: l\'oeil')
    const ans = q.opts && q.opts[q.ans];
    if (!ans) return false;
    if (/^(le |la |les |un |une |l'|l'|c'|du |de )/i.test(ans.trim())) return false;
    return true;
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
    if (isTrueFalse(q)) {
      // Shuffle statement order so the true/false pattern is never memorable.
      return { ...q, statements: shuffle(q.statements.slice()) };
    }
    if (isMultiSelect(q)) {
      const order = shuffle(q.opts.map((_, i) => i));
      return { ...q,
        opts: order.map(i => q.opts[i]),
        answers: q.answers.map(a => order.indexOf(a)).sort((x, y) => x - y) };
    }
    if (isWritten(q)) { return { ...q }; }
    if (isWordOrder(q)) { return { ...q }; }
    if (isTyped(q)) { return { ...q }; }
    if (isListenTyped(q)) { return { ...q }; }
    // simple MCQ — shuffle so the source data's answer-position bias never surfaces
    const order = shuffle(q.opts.map((_, i) => i));
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
    typedDraft: '',                          // typed-answer current input
    tfqDraft: {},                           // true/false statement grid selections
    msDraft: [],                            // multi-select chosen option indices
    writtenDraft: '',                       // written-response textarea contents
    writtenRubric: {},                      // written self-assessment rubric ticks
    writtenRevealed: false,                 // model answer shown?
    examLabel: '', examUnitId: null,        // which exam is being sat
    examTotalMarks: 0,                      // denominator for marks-based scoring
    isDiagnostic: false,                    // placement quiz in progress?
    diagnosticResult: null,                 // per-unit recommendations once scored
    referenceOpen: false,
    taEntries: [],                          // T-account playground postings
    taForm: { desc: '', amount: '', dr: '', cr: '' },
    taExercise: null, taCheck: null,        // guided T-account exercise state
    hintLevel: 0, hintElim: null,           // progressive hints (practice mode)
    lesson: null,                           // lesson player state
    flash: null,                            // flashcard session state
    recall: null,                           // active-recall session state (French)
    revisionUnit: null,                     // unit revision notes screen
    combo: 0,                               // consecutive correct answers in practice
    delfExam: null,                         // DELF mock exam state (null when not active)
    story: null,                            // Wrenfield story-mode state (null when not playing)
    proto: null,                            // prototype-desk state (null when not playing)
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
    const isUrgent = State.toast.kind === 'warn' || State.toast.kind === 'error';
    node.setAttribute('role', isUrgent ? 'alert' : 'status');
    node.setAttribute('aria-live', isUrgent ? 'assertive' : 'polite');
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
    else if (topicId && topicId.indexOf('listen:') === 0) {
      const lvl = topicId.slice(7);
      if (_activeSubjectId === 'french' && !frLevelUnlocked(lvl)) {
        const prereq = lvl === 'B1' ? 'A2' : 'A1';
        showToast('Complete all ' + prereq + ' lessons and pass the ' + prereq + ' unit quiz to unlock ' + lvl + '.', 'warn');
        return;
      }
      pool = window.ALL_QUESTIONS.filter(q => (q.type === 'listen' || q.type === 'listen-typed') && frQuestionLevel(q.id) === lvl);
    }
    else pool = window.ALL_QUESTIONS.filter(q => q.topic === topicId);
    // Gate questions to only those from unlocked units / CEFR levels.
    // Curated sets (flagged, sr-due, review-wrong, mistakes) bypass these gates.
    const GATE_EXEMPT = new Set(['flagged', 'sr-due', 'review-wrong', 'mistakes']);
    // Mistake Clinic topics are always accessible — bypass level and lesson gates
    if (topicId && topicId.startsWith('fr-clinic-')) GATE_EXEMPT.add(topicId);
    // listen: topics did their own level check above; bypass the general lesson gate
    if (topicId && topicId.startsWith('listen:')) GATE_EXEMPT.add(topicId);
    let poolSizeAfterLevelFilter = pool.length;
    let poolSizeAfterLessonGate = pool.length;
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
        // Capture size after level filter but before the lesson gate so we can give
        // an accurate "start some lessons first" message instead of "level locked".
        poolSizeAfterLevelFilter = pool.length;
        // Only surface questions from lessons the user has already completed.
        // Questions without a lesson field are general-level practice and always available.
        pool = pool.filter(q => !q.lesson || isLessonDone(q.lesson));
        poolSizeAfterLessonGate = pool.length;
      } else {
        // For non-French subjects: gate topic-specific practice if the unit is locked.
        const isSpecificTopic = topicId && topicId !== 'all' && topicId.indexOf('skill:') !== 0;
        if (isSpecificTopic && !isUnitUnlocked(topicId)) {
          showToast('Complete the previous unit and pass its quiz to unlock this topic.', 'warn');
          return;
        }
        // Remove questions from locked units regardless of pool type.
        pool = pool.filter(q => isUnitUnlocked(q.topic));
        poolSizeAfterLevelFilter = pool.length;
        poolSizeAfterLessonGate = pool.length;
      }
    }

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
      const lessonGated = !levelLocked && poolSizeAfterLessonGate === 0;
      showToast(empty[topicId] || (levelLocked
        ? 'These questions are locked. Finish the prerequisite level lessons and quiz first.'
        : (lessonGated
          ? 'Complete some lessons first to unlock practice questions for this level.'
          : 'No questions left — you\'ve marked all as confident!')), 'warn');
      return;
    }
    const picked = applyFlipMode(shuffle(pool).slice(0, Math.min(PRACTICE_LENGTH, pool.length)).map(presentQuestion));
    if (picked.length === 0) { goHome(); return; }
    _lastTransitionTime = Date.now();
    Object.assign(State, {
      screen:'quiz', mode:'practice', selectedTopic:topicId, questions:picked,
      isDiagnostic:false, diagnosticResult:null,
      current:0, answered:null, answers:[], score:0, results:[],
      showReview:false, reviewFilter:'all', timedOut:false, numericDraft:'',
      ddSelectedLeft:null, ddMap:{}, tfDraft:{}, scDraft:{}, gfDraft:{}, woDraft:[], typedDraft:'',
      hintLevel:0, hintElim:null, combo:0,
    });
    Calc.reset(); saveSession(); render();
  }

  /* Adaptive "smart practice": weights weak skills, due reviews and unseen questions,
     and eases the difficulty mix while overall accuracy is low. */
  /* ── DIAGNOSTIC PLACEMENT ────────────────────────────────────────────────
     Walking the whole learning path is the only route through the app, which
     is wasteful for anyone who already knows some of it. This samples three
     questions per unit — one easy, one medium, one hard — and turns the result
     into a recommended starting lesson for each unit. */
  const DIAGNOSTIC_UNITS = ['itbk', 'pobc', 'poc', 'besy'];
  const DIAGNOSTIC_PER_UNIT = 3;

  function buildDiagnostic() {
    const out = [];
    DIAGNOSTIC_UNITS.forEach(uid => {
      ['easy', 'medium', 'hard'].forEach(diff => {
        const pool = window.ALL_QUESTIONS.filter(q =>
          q.topic === uid && q.difficulty === diff &&
          ['mcq', 'numeric', 'truefalse'].indexOf(q.type || 'mcq') !== -1);
        const pick = shuffle(pool)[0];
        if (pick) { const pq = presentQuestion(pick); pq._diagUnit = uid; out.push(pq); }
      });
    });
    return shuffle(out);
  }

  function startDiagnostic() {
    playClick();
    const picked = buildDiagnostic();
    if (picked.length < 4) { showToast('Not enough questions to build a diagnostic.', 'error'); return; }
    Object.assign(State, {
      screen: 'quiz', mode: 'practice', selectedTopic: 'all', questions: picked,
      current: 0, answered: null, answers: new Array(picked.length).fill(null),
      score: 0, results: [], showReview: false, reviewFilter: 'all',
      numericDraft: '', typedDraft: '', tfqDraft: {}, msDraft: [],
      isDiagnostic: true, diagnosticResult: null, hintLevel: 0, hintElim: null, combo: 0,
    });
    Storage.data.session = null; Storage.save();
    Calc.reset(); render();
  }

  /* Turn diagnostic results into a per-unit recommendation. */
  function diagnosticRecommendations() {
    const byUnit = {};
    (State.questions || []).forEach((q, i) => {
      const uid = q._diagUnit; if (!uid) return;
      if (!byUnit[uid]) byUnit[uid] = { right: 0, total: 0 };
      byUnit[uid].total++;
      const r = State.results.find(x => x.id === q.id);
      if (r && r.correct) byUnit[uid].right++;
    });
    return DIAGNOSTIC_UNITS.filter(uid => byUnit[uid]).map(uid => {
      const { right, total } = byUnit[uid];
      const pct = total ? Math.round(right / total * 100) : 0;
      const unit = (window.LEARN_PATH || []).find(u => (u.unit || u.id) === uid);
      const lessons = (unit && unit.lessons) || [];
      // Below half: start at the foundations. Middle: skip the first four.
      // Strong: go to the last third, or straight to exam practice.
      let idx = 0, advice = 'Start at the beginning — these are the foundations.';
      if (pct >= 100) { idx = Math.max(0, Math.floor(lessons.length * 0.66)); advice = 'Strong. Skim the later lessons, then go straight to exam practice.'; }
      else if (pct >= 67) { idx = Math.min(lessons.length - 1, 4); advice = 'Solid basics. Pick up from the applied lessons.'; }
      else if (pct >= 34) { idx = Math.min(lessons.length - 1, 2); advice = 'Some gaps. Recap the last of the foundations first.'; }
      const target = lessons[idx] || lessons[0];
      const topic = (window.TOPICS || []).find(t => t.id === uid) || { icon: '📘', name: uid.toUpperCase() };
      return { uid, pct, right, total, advice, topic, lesson: target };
    });
  }

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
      if (sr && sr.dueAt && sr.dueAt <= now) w *= 2;                            // due for review
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
      ddSelectedLeft:null, ddMap:{}, tfDraft:{}, scDraft:{}, gfDraft:{}, woDraft:[], typedDraft:'',
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
      ddSelectedLeft: null, ddMap: {}, tfDraft: {}, scDraft: {}, gfDraft: {}, woDraft: [], typedDraft: '',
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
      ddSelectedLeft: null, ddMap: {}, tfDraft: {}, scDraft: {}, gfDraft: {}, woDraft: [], typedDraft: '',
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
  /* Formats a mock can present. Everything the practice screens can render
     except drag-drop, which needs feedback-on-submit to make sense. */
  const MOCK_TYPES = ['mcq', 'numeric', 'truefalse', 'multiselect', 'gapfill', 'tablefill', 'written'];

  /* Does a question belong to an area? An area is either a topic id ('itbk') or
     a skill id ('besy-finance'). */
  function matchesArea(q, area) {
    return q.topic === area || q.skill === area;
  }

  /* Fill each task's areas up to their individual mark quotas. Questions carry
     their own marks, so a 14-mark quota might be one 4-mark true/false grid plus
     ten 1-mark items. A question that would overshoot the quota is skipped
     rather than accepted, so task totals land on the blueprint. */
  function buildSynopticMock() {
    const out = [];
    const used = new Set();
    SYNOPTIC_BLUEPRINT.forEach((task, taskIdx) => {
      let taskFilled = 0;
      task.areas.forEach(spec => {
        const pool = window.ALL_QUESTIONS.filter(q => {
          if (used.has(q.id)) return false;
          if (SYNOPTIC_EXCLUDED_TOPICS.indexOf(q.topic) !== -1) return false;
          if (MOCK_TYPES.indexOf(q.type || 'mcq') === -1) return false;
          return matchesArea(q, spec.area);
        });
        // Where the blueprint marks an area as the written element, a written
        // task anchors it; objective items fill whatever quota remains.
        const written = spec.written ? shuffle(pool.filter(q => q.type === 'written')) : [];
        const objective = shuffle(pool.filter(q => q.type !== 'written'));
        const ordered = written.slice(0, 1).concat(objective);
        let filled = 0;
        for (const q of ordered) {
          if (filled >= spec.marks) break;
          const marks = questionMarks(q);
          // Skip anything that would take this area past its quota, unless it is
          // the first pick (better a slight overshoot than an empty task).
          if (filled && filled + marks > spec.marks) continue;
          const pq = presentQuestion(q);
          pq._task = taskIdx;
          pq._marks = questionMarks(pq);
          out.push(pq);
          used.add(q.id);
          filled += pq._marks;
        }
        taskFilled += filled;
      });
      // Record what the task actually reached so the UI can show real totals.
      task._built = taskFilled;
    });
    return out;
  }
  /* Kept under the old name for any caller that still uses it. */
  function buildMockFromBlueprint() { return buildSynopticMock(); }

  function buildUnitAssessment(unitId) {
    const spec = UNIT_ASSESSMENTS.find(u => u.id === unitId);
    if (!spec) return [];
    const pool = window.ALL_QUESTIONS.filter(q =>
      q.topic === unitId && MOCK_TYPES.indexOf(q.type || 'mcq') !== -1);
    const out = [];
    let filled = 0;
    for (const q of shuffle(pool)) {
      if (filled >= spec.marks) break;
      const pq = presentQuestion(q);
      pq._task = 0;
      pq._marks = questionMarks(pq);
      out.push(pq);
      filled += pq._marks;
    }
    return out;
  }

  function startExam(picked, durationMs, label, unitId) {
    if (!picked.length) { showToast('Could not build the exam — question bank unavailable.', 'error'); return; }
    Object.assign(State, {
      screen:'quiz', mode:'mock', selectedTopic: unitId || 'all', questions:picked,
      current:0, answered:null, answers:new Array(picked.length).fill(null),
      score:0, results:[], showReview:false, reviewFilter:'all', timedOut:false,
      numericDraft:'', typedDraft:'', writtenDraft:'', msDraft:[], tfqDraft:{},
      mockEndTime: Date.now() + durationMs,
      examLabel: label, examUnitId: unitId || null,
      examTotalMarks: picked.reduce((s, q) => s + questionMarks(q), 0),
    });
    Storage.data.session = null; Storage.save();
    Calc.reset(); startMockTimer(); render();
  }

  function startMock() {
    playClick();
    startExam(buildSynopticMock(), MOCK_DURATION_MS, 'Synoptic assessment', null);
  }

  function startUnitAssessment(unitId) {
    playClick();
    const spec = UNIT_ASSESSMENTS.find(u => u.id === unitId);
    if (!spec) return;
    startExam(buildUnitAssessment(unitId), spec.durationMin * 60 * 1000,
      spec.title + ' — unit assessment', unitId);
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
    State.lesson = { unit: found.unit, def: found.lesson, phase: 'teach', cardIdx: 0,
      qIdx: 0, qAnswered: null, qScore: 0, prevStars: existingRec ? (existingRec.stars || 0) : 0,
      worked: newWorkedState(), checkDraft: newCheckDraft() };
    render();
    // Block the Continue button briefly to prevent ghost-clicks on mobile
    // where the tap that opened the lesson can fire again on the newly rendered button.
    const player = document.querySelector('.lesson-player');
    if (player) {
      player.classList.add('lesson-just-started');
      setTimeout(() => player.classList.remove('lesson-just-started'), 400);
    }
  }
  /* Worked-example card state: how many solution steps are revealed, and the
     learner's attempt at the follow-up problem. Reset on every card change so
     each worked example starts folded. */
  function newWorkedState() { return { step: 0, tryDraft: '', tryResult: null, tryRevealed: false }; }
  /* Draft state for the non-MCQ lesson check formats. */
  function newCheckDraft() { return { numeric: '', gaps: {}, tf: {} }; }

  function lessonContinue() {
    const L = State.lesson; if (!L) return;
    if (L.phase === 'teach') {
      if (L.cardIdx + 1 < L.def.cards.length) { L.cardIdx++; L.worked = newWorkedState(); }
      else { L.phase = 'transition'; }
      render();
    } else if (L.phase === 'transition') {
      L.phase = 'quiz'; L.qIdx = 0; L.qAnswered = null; L.qScore = 0; L.wrongIdxs = [];
      L.checkDraft = newCheckDraft();
      render();
    } else if (L.phase === 'quiz' && L.qAnswered !== null) {
      if (L.qIdx + 1 < L.def.check.length) {
        L.qIdx++; L.qAnswered = null; L.checkDraft = newCheckDraft(); render();
      } else finishLesson();
    }
  }
  function lessonBack() {
    const L = State.lesson; if (!L) return;
    if (L.phase === 'transition') { L.phase = 'teach'; render(); return; }
    if (L.phase !== 'teach' || L.cardIdx === 0) return;
    L.cardIdx--; L.worked = newWorkedState(); render();
  }

  /* ── Worked-example interactions ── */
  function workedRevealStep() {
    const L = State.lesson; if (!L) return;
    const card = L.def.cards[L.cardIdx];
    if (!card || !card.worked) return;
    if (L.worked.step < card.worked.steps.length) { L.worked.step++; playClick(); render(); }
  }
  function workedRevealAll() {
    const L = State.lesson; if (!L) return;
    const card = L.def.cards[L.cardIdx];
    if (!card || !card.worked) return;
    L.worked.step = card.worked.steps.length; playClick(); render();
  }
  function workedSubmitTry() {
    const L = State.lesson; if (!L) return;
    const card = L.def.cards[L.cardIdx];
    const t = card && card.worked && card.worked.tryIt;
    if (!t || L.worked.tryResult !== null) return;
    const value = parseNumericInput(L.worked.tryDraft);
    if (!Number.isFinite(value)) { showToast('Enter a number first.', 'warn'); return; }
    const tol = Number.isFinite(t.tolerance) ? t.tolerance : 0.01;
    const ok = Math.abs(value - t.answer) <= tol;
    L.worked.tryResult = { ok, value };
    if (ok) { Storage.addXp(3); playCorrect(); } else playWrong();
    Storage.save(); render();
  }
  function workedShowTryAnswer() {
    const L = State.lesson; if (!L) return;
    L.worked.tryRevealed = true; playClick(); render();
  }

  /* ── Lesson check grading (MCQ, numeric, gap-fill, true/false) ── */
  function lessonCheckType(q) { return (q && q.type) || 'mcq'; }

  function recordLessonAnswer(correct) {
    const L = State.lesson;
    if (correct) { L.qScore++; Storage.addXp(2); playCorrect(); }
    else { if (!L.wrongIdxs) L.wrongIdxs = []; L.wrongIdxs.push(L.qIdx); playWrong(); }
    Storage.save();
    render();
  }

  function lessonAnswer(idx) {
    const L = State.lesson; if (!L || L.phase !== 'quiz' || L.qAnswered !== null) return;
    const q = L.def.check[L.qIdx];
    if (lessonCheckType(q) !== 'mcq') return;
    L.qAnswered = idx;
    recordLessonAnswer(idx === q.ans);
  }

  function lessonSubmitNumeric() {
    const L = State.lesson; if (!L || L.phase !== 'quiz' || L.qAnswered !== null) return;
    const q = L.def.check[L.qIdx];
    const value = parseNumericInput(L.checkDraft.numeric);
    if (!Number.isFinite(value)) { showToast('Enter a number first.', 'warn'); return; }
    const tol = Number.isFinite(q.tolerance) ? q.tolerance : 0.01;
    const ok = Math.abs(value - q.answer) <= tol;
    L.qAnswered = { kind: 'numeric', value, ok };
    recordLessonAnswer(ok);
  }

  function lessonSubmitGapFill() {
    const L = State.lesson; if (!L || L.phase !== 'quiz' || L.qAnswered !== null) return;
    const q = L.def.check[L.qIdx];
    const picks = L.checkDraft.gaps;
    if (q.gaps.some((g, i) => picks[i] == null || picks[i] === '')) {
      showToast('Fill in every gap before submitting.', 'warn'); return;
    }
    const perGap = q.gaps.map((g, i) => Number(picks[i]) === g.answer);
    const ok = perGap.every(Boolean);
    L.qAnswered = { kind: 'gapfill', picks: { ...picks }, perGap, ok };
    recordLessonAnswer(ok);
  }

  function lessonSubmitTrueFalse() {
    const L = State.lesson; if (!L || L.phase !== 'quiz' || L.qAnswered !== null) return;
    const q = L.def.check[L.qIdx];
    const picks = L.checkDraft.tf;
    if (q.statements.some((s, i) => picks[i] == null)) {
      showToast('Mark every statement true or false.', 'warn'); return;
    }
    const right = q.statements.filter((s, i) => picks[i] === s.answer).length;
    const ok = right === q.statements.length;
    L.qAnswered = { kind: 'truefalse', picks: { ...picks }, right, ok };
    recordLessonAnswer(ok);
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
    L.wrongIdxs = []; L.checkDraft = newCheckDraft();
    render();
  }
  function goLearn() {
    stopMockTimer();
    State.screen = 'home'; State.activeTab = 'learn'; State.confirmModal = null;
    State.lesson = null; State.flash = null; State.recall = null; State.revisionUnit = null;
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

  /* ── Active Recall (French) ───────────────────────────────────────────────
     Retrieval practice — the strongest study technique — built from the
     learner's own questions. The prompt is shown WITHOUT options; you recall
     the answer from memory, reveal it, then self-rate. Self-rating feeds the
     same spaced-repetition (Leitner) schedule used by Smart Practice and the
     daily-review nudge, but does NOT touch accuracy stats (it's review, not a
     graded attempt). No new content and no answer-grading guesswork. */
  const RECALLABLE_TYPES = new Set(['mcq', 'typed', 'listen', 'listen-typed', 'gapfill']);
  function recallCardContent(q) {
    const t = q.type || 'mcq';
    let front = q.q || '', back = '';
    if (t === 'typed' || t === 'listen-typed') { front = q.q || 'Recall the French'; back = q.ans || ''; }
    else if (t === 'gapfill') {
      const tpl = (q.template || q.q || '').replace(/\{(\d+)\}/g, '____');
      front = tpl;
      back = (q.gaps || []).map(g => (g.options || [])[g.answer]).filter(Boolean).join(' · ') || (q.q || '');
    } else { front = q.q || ''; back = Array.isArray(q.opts) && q.ans != null ? q.opts[q.ans] : ''; }
    // French text to speak: explicit tts/audio, else the French side of the card.
    let audio = q.tts || q.audio || null;
    if (!audio) {
      if (isFrToEnMcq(q)) audio = extractFrenchTerm(q);          // French is in the prompt
      else if (t === 'typed' || t === 'listen-typed') audio = q.ans; // French is the answer
    }
    return { front, back, exp: q.exp || '', audio };
  }
  function startRecall() {
    const now = Date.now();
    const unlocked = (window.ALL_QUESTIONS || []).filter(q =>
      RECALLABLE_TYPES.has(q.type || 'mcq') &&
      !Storage.isConfident(q.id) &&
      frLevelUnlocked(frQuestionLevel(q.id)) &&
      (!q.lesson || isLessonDone(q.lesson)));
    const sr = Storage.data.sr;
    const stat = Storage.data.stats.questions;
    const due  = unlocked.filter(q => { const r = sr[q.id]; return r && r.dueAt && r.dueAt <= now; });
    const weak = unlocked.filter(q => { const s = stat[q.id]; return s && s.attempts > 0 && s.correct / s.attempts < 0.7; });
    const fresh = unlocked.filter(q => !stat[q.id]);
    const seenById = new Set();
    const deck = [];
    for (const q of [...shuffle(due), ...shuffle(weak), ...shuffle(fresh)]) {
      if (seenById.has(q.id)) continue;
      seenById.add(q.id); deck.push(q.id);
      if (deck.length >= 15) break;
    }
    if (!deck.length) { showToast('Nothing to recall yet — complete a lesson or two first.', 'info'); return; }
    playClick();
    State.screen = 'recall';
    State.recall = { cards: deck, idx: 0, flipped: false, got: 0 };
    render();
  }
  function recallFlip() {
    const R = State.recall; if (!R || R.flipped || R.idx >= R.cards.length) return;
    R.flipped = true; playClick();
    const q = questionById(R.cards[R.idx]);
    const c = q && recallCardContent(q);
    if (c && c.audio) speakFrench(c.audio);
    render();
  }
  function recallGrade(ok) {
    const R = State.recall; if (!R || !R.flipped || R.idx >= R.cards.length) return;
    const q = questionById(R.cards[R.idx]);
    if (q) {
      // Feed the same adaptive spaced-repetition schedule as the rest of the app.
      Storage.data.sr[q.id] = srSchedule(Storage.data.sr[q.id], ok);
      Storage.day().answered++;   // counts toward the daily streak
      Storage.addXp(1);
    }
    if (ok) { R.got++; playCorrect(); } else { playWrong(); }
    R.idx++; R.flipped = false;
    Storage.save();
    if (R.idx >= R.cards.length) checkBadges();
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
      // All lessons in this unit done — if quiz not yet passed, that's the next step
      const unitTest = (Storage.data.learn.unitTests || {})[unitId];
      if (!unitTest || !unitTest.passed) {
        return { unit, lesson: null, unitQuiz: unitId };
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
    // Suppress ghost taps: ignore option clicks within 350ms of a question transition.
    if (Date.now() - _lastTransitionTime < 350) return;
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
  function normalizeTyped(s, stripAcc) {
    let n = String(s).trim().toLowerCase();
    n = n.replace(/[?!.,;:]+$/g, '').trim(); // strip trailing punctuation
    n = n.replace(/[,.]\s/g, ' ');           // treat comma/period before space as equivalent (greeting punctuation)
    if (stripAcc) n = n.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    return n;
  }
  function isTypedCorrect(q, input) {
    const norm = s => normalizeTyped(s, q.ignoreAccents);
    return [q.ans].concat(q.alts || []).some(a => norm(a) === norm(input));
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

  function submitTrueFalse() {
    if (State.answered !== null) return;
    const q = State.questions[State.current];
    const picks = State.tfqDraft;
    if (q.statements.some((s, i) => picks[i] == null)) {
      showToast('Mark every statement true or false before submitting.', 'warn'); return;
    }
    let score = 0;
    q.statements.forEach((s, i) => { if (picks[i] === s.answer) score++; });
    const total = q.statements.length;
    const allRight = score === total;
    State.answered = { kind: 'truefalse', correct: allRight, picks: { ...picks }, score, total };
    if (allRight) { State.score++; playCorrect(); } else { playWrong(); }
    updateCombo(allRight);
    Storage.recordAnswer(q, allRight); Storage.save();
    State.results.push({ id:q.id, q:q.q || 'True/false', correct:allRight,
      chosen: q.statements.map((s, i) => picks[i] ? 'T' : 'F').join(' '),
      correctOpt: q.statements.map(s => s.answer ? 'T' : 'F').join(' '),
      exp:q.exp, topic:q.topic, skill:q.skill });
    saveSession(); render();
  }

  function submitMultiSelect() {
    if (State.answered !== null) return;
    const q = State.questions[State.current];
    const need = q.selectCount || q.answers.length;
    if (State.msDraft.length !== need) { showToast(`Select exactly ${need} options.`, 'warn'); return; }
    const picks = State.msDraft.slice().sort((a, b) => a - b);
    const want = q.answers.slice().sort((a, b) => a - b);
    const ok = picks.length === want.length && picks.every((v, i) => v === want[i]);
    State.answered = { kind: 'multiselect', correct: ok, picks };
    if (ok) { State.score++; playCorrect(); } else { playWrong(); }
    updateCombo(ok);
    Storage.recordAnswer(q, ok); Storage.save();
    State.results.push({ id:q.id, q:q.q, correct:ok,
      chosen: picks.map(i => q.opts[i]).join('; '),
      correctOpt: want.map(i => q.opts[i]).join('; '),
      exp:q.exp, topic:q.topic, skill:q.skill });
    saveSession(); render();
  }

  /* Written practice is two steps: reveal the model answer, then self-mark. */
  function submitWritten() {
    const q = State.questions[State.current];
    if (q.minWords) {
      const words = State.writtenDraft.trim() ? State.writtenDraft.trim().split(/\s+/).length : 0;
      if (words < Math.min(20, q.minWords)) {
        showToast('Write an answer before revealing the model — you learn nothing from reading it cold.', 'warn');
        return;
      }
    }
    State.writtenRevealed = true;
    playClick(); render();
  }

  function finishWritten() {
    const q = State.questions[State.current];
    const marks = questionMarks(q);
    const awarded = (q.rubric || []).reduce((s, r, i) => s + (State.writtenRubric[i] ? (Number(r.marks) || 0) : 0), 0);
    const ok = awarded >= marks * 0.7;
    State.answered = { kind: 'written', correct: ok, awarded, max: marks };
    if (ok) State.score++;
    Storage.recordAnswer(q, ok, { selfAssessed: true }); Storage.save();
    State.results.push({ id:q.id, q:q.task || q.q || 'Written task', correct:ok,
      chosen: `Self-assessed ${awarded}/${marks}`, correctOpt: `${marks} marks available`,
      selfAssessed: true, exp:q.exp || q.modelAnswer, topic:q.topic, skill:q.skill });
    nextPractice();
  }

  function submitWordOrder() {
    if (State.answered !== null) return;
    const q = State.questions[State.current];
    if (State.woDraft.length < q.answer.length) { showToast('Place all the words you need before submitting.', 'warn'); return; }
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
  function submitTypedPractice() {
    if (State.answered !== null) return;
    const q = State.questions[State.current];
    const el = document.getElementById('typedAnswer');
    const input = el ? el.value : '';
    if (!input.trim()) {
      const err = document.getElementById('typedError');
      if (err) err.textContent = 'Please type an answer before submitting.';
      return;
    }
    State.typedDraft = input;
    State.answered = input;
    const correct = isTypedCorrect(q, input);
    if (correct) { State.score++; playCorrect(); } else { playWrong(); }
    updateCombo(correct);
    Storage.recordAnswer(q, correct); Storage.save();
    State.results.push({ id: q.id, q: q.q, correct, chosen: input, correctOpt: q.ans, exp: q.exp, topic: q.topic, skill: q.skill });
    saveSession(); render();
  }
  function submitListenTypedPractice() {
    if (State.answered !== null) return;
    const q = State.questions[State.current];
    const el = document.getElementById('listenTypedAnswer');
    const input = el ? el.value : '';
    if (!input.trim()) {
      const err = document.getElementById('listenTypedError');
      if (err) err.textContent = 'Please type what you heard before submitting.';
      return;
    }
    State.typedDraft = input;
    State.answered = input;
    const correct = isTypedCorrect(q, input);
    if (correct) { State.score++; playCorrect(); } else { playWrong(); }
    updateCombo(correct);
    Storage.recordAnswer(q, correct); Storage.save();
    State.results.push({ id: q.id, q: q.q, correct, chosen: input, correctOpt: q.ans, exp: q.exp, topic: q.topic, skill: q.skill });
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
    updateAnsweredCounter();
  }
  /* Multi-part exam answers (true/false rows, gap-fill gaps, table-fill blanks)
     are stored as a keyed object on the question's answer slot. */
  function setExamAnswerKey(key, value) {
    if (State.mode !== 'mock') return;
    const cur = State.answers[State.current];
    const obj = (cur && typeof cur === 'object' && !Array.isArray(cur)) ? { ...cur } : {};
    obj[key] = value;
    State.answers[State.current] = obj;
    updateAnsweredCounter();
    saveSession();
  }
  function updateAnsweredCounter() {
    const counter = document.getElementById('answeredCount');
    if (!counter) return;
    const n = State.answers.filter(a => a !== null && a !== '' &&
      !(Array.isArray(a) && !a.length) &&
      !(a && typeof a === 'object' && !Array.isArray(a) && !Object.keys(a).length)).length;
    counter.textContent = `${n} of ${State.questions.length} answered`;
  }
  function nextPractice() {
    stopSpeech();
    _lastTransitionTime = Date.now();
    if (State.current + 1 >= State.questions.length) finishPractice();
    else {
      State.current++; State.answered = null; State.numericDraft = ''; State.typedDraft = '';
      State.ddSelectedLeft = null; State.ddMap = {}; State.tfDraft = {}; State.scDraft = {}; State.gfDraft = {}; State.woDraft = [];
      State.tfqDraft = {}; State.msDraft = []; State.writtenDraft = ''; State.writtenRubric = {}; State.writtenRevealed = false;
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
  /* Grade one exam response of any type.
     Returns { correct, awarded, max, chosen, expected, selfAssessed }.
     `awarded` is partial for true/false grids and written tasks; every other
     type is all-or-nothing. */
  function gradeResponse(q, response) {
    const max = questionMarks(q);
    const unanswered = response == null || response === '';
    if (isNumeric(q)) {
      const value = unanswered ? NaN : parseNumericInput(response);
      const ok = isNumericCorrect(q, value);
      return { correct: ok, awarded: ok ? max : 0, max,
        chosen: unanswered ? '— not answered —' : formatNumericValue(q, value),
        expected: formatNumericValue(q, q.answer) };
    }
    if (isTrueFalse(q)) {
      const picks = response || {};
      let right = 0;
      q.statements.forEach((s, i) => { if (picks[i] === s.answer) right++; });
      return { correct: right === q.statements.length, awarded: right, max: q.statements.length,
        chosen: q.statements.map((s, i) =>
          picks[i] == null ? '—' : (picks[i] ? 'True' : 'False')).join(', '),
        expected: q.statements.map(s => s.answer ? 'True' : 'False').join(', ') };
    }
    if (isMultiSelect(q)) {
      const picks = (response || []).slice().sort((a, b) => a - b);
      const want = q.answers.slice().sort((a, b) => a - b);
      const ok = picks.length === want.length && picks.every((v, i) => v === want[i]);
      return { correct: ok, awarded: ok ? max : 0, max,
        chosen: picks.length ? picks.map(i => q.opts[i]).join('; ') : '— not answered —',
        expected: want.map(i => q.opts[i]).join('; ') };
    }
    if (isWritten(q)) {
      // Human-marked in the real assessment; here the student self-scores
      // against the rubric. Recorded separately so it never reads as objective.
      const ticks = (response && response.rubric) || {};
      const awarded = (q.rubric || []).reduce((s, r, i) => s + (ticks[i] ? (Number(r.marks) || 0) : 0), 0);
      return { correct: awarded >= max * 0.7, awarded, max, selfAssessed: true,
        chosen: (response && response.text) ? response.text : '— not attempted —',
        expected: q.modelAnswer || '' };
    }
    if (isGapFill(q)) {
      const picks = response || {};
      const ok = q.gaps.every((g, i) => picks[i] === g.answer);
      return { correct: ok, awarded: ok ? max : 0, max,
        chosen: q.gaps.map((g, i) => picks[i] == null ? '—' : g.options[picks[i]]).join(', '),
        expected: q.gaps.map(g => g.options[g.answer]).join(', ') };
    }
    if (isTableFill(q)) {
      const picks = response || {};
      const ok = q.table.blanks.every((b, i) =>
        Math.abs(parseNumericInput(picks[i]) - Number(b.answer)) < 0.005);
      return { correct: ok, awarded: ok ? max : 0, max,
        chosen: q.table.blanks.map((b, i) => picks[i] == null || picks[i] === '' ? '—' : picks[i]).join(', '),
        expected: q.table.blanks.map(b => String(b.answer)).join(', ') };
    }
    // simple MCQ
    const ok = response === q.ans;
    return { correct: ok, awarded: ok ? max : 0, max,
      chosen: unanswered ? '— not answered —' : q.opts[response],
      expected: q.opts[q.ans] };
  }

  function finishMock(timedOut) {
    stopMockTimer();
    let marks = 0, totalMarks = 0, selfMarks = 0, selfTotal = 0;
    State.results = State.questions.map((q, i) => {
      const response = State.answers[i];
      const g = gradeResponse(q, response);
      totalMarks += g.max;
      marks += g.awarded;
      if (g.selfAssessed) { selfMarks += g.awarded; selfTotal += g.max; }
      if (response !== null && response !== '') Storage.recordAnswer(q, g.correct, { selfAssessed: !!g.selfAssessed });
      return { id:q.id, q:q.q || q.task || '', correct:g.correct, chosen:g.chosen,
        correctOpt: g.expected, awarded: g.awarded, max: g.max, selfAssessed: !!g.selfAssessed,
        task: q._task, exp:q.exp, topic:q.topic, skill:q.skill,
        steps: isNumeric(q) ? q.steps : undefined };
    });
    const pct = totalMarks ? Math.round((marks / totalMarks) * 100) : 0;
    State.score = marks; State.screen = 'score'; State.timedOut = !!timedOut;
    State.examTotalMarks = totalMarks;
    State.examSelfMarks = { awarded: selfMarks, total: selfTotal };
    Storage.recordResult({ mode:'mock', topic: State.examUnitId || 'all',
      score: marks, total: totalMarks, pct, timestamp:Date.now(), timedOut: !!timedOut,
      label: State.examLabel || 'Synoptic assessment' });
    Storage.addXp(25);  // mock-completion bonus
    Storage.save();
    checkBadges();
    if (pct >= PASS_MARK) setTimeout(confetti, 300);
    render();
  }
  function exitQuiz() {
    if (State.screen === 'lesson' || State.screen === 'flash') { goLearn(); return; }
    if (State.screen === 'delf') { exitDelf(); return; }
    if (State.screen === 'quiz' && State.mode === 'mock') {
      openConfirm({ title:'Exit mock exam?', message:'Your progress will be lost. Mock exam attempts cannot be resumed.', confirmLabel:'Exit exam',
        onConfirm: () => { stopMockTimer(); closeConfirm(); goHome(); } });
    } else goHome();
  }
  function goHome() { stopMockTimer(); State.screen='home'; State.activeTab='home'; State.confirmModal=null; render(); }

  function switchSubject(id) {
    const subj = getSubject(id);
    // The subject's data may need fetching first (lazy-loaded language subjects).
    if (!subjectAssetsReady(id)) {
      const el = app();
      if (el) el.innerHTML = `<div class="container"><div class="empty-state" role="status" aria-live="polite">⏳ Loading ${escapeHtml(subj.name)}…</div></div>`;
      ensureSubjectAssets(id)
        .then(() => _commitSubjectSwitch(id))
        .catch(() => { showToast('Couldn’t load ' + subj.short + ' — check your connection and try again.', 'error'); render(); });
      return;
    }
    _commitSubjectSwitch(id);
  }
  function _commitSubjectSwitch(id) {
    const subj = getSubject(id);
    _activeSubjectId = id;
    localStorage.setItem(SUBJECT_STORE_KEY, id);
    if (id !== 'aat' && State.referenceOpen) { State.referenceOpen = false; }
    _frQLevelCache = null; // force rebuild from the new subject's ALL_QUESTIONS
    subj.activate();
    QUESTION_INDEX = null; // must clear after activate() so questionById() rebuilds from new subject
    Storage.data = defaultData();
    Storage.load();
    // Reset all transient state
    State.screen = 'home';
    State.activeTab = subj.tabs[0];
    State.lesson = null; State.flash = null; State.recall = null; State.questions = []; State.revisionUnit = null;
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
      numericDraft: State.numericDraft || '', typedDraft: State.typedDraft || '', timestamp: Date.now() };
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
      showReview:false, reviewFilter:'all', timedOut:false, numericDraft: s.numericDraft || '', typedDraft: s.typedDraft || '' });
    Calc.reset(); render();
  }
  function dismissSession() { Storage.data.session = null; Storage.save(); render(); }

  /* ── RENDER ── */
  const app = () => document.getElementById('app');
  /* Header chrome is shared by every subject; the body below it is not. */
  function applyChrome() {
    const isDark = Storage.isDarkActive();
    document.body.classList.toggle('dark', isDark);
    document.body.setAttribute('data-subject', _activeSubjectId || 'aat');
    const dt = document.getElementById('darkToggle');
    if (dt) { dt.textContent = isDark ? '☀️ Light' : '🌙 Dark'; dt.setAttribute('aria-pressed', isDark ? 'true' : 'false'); }
    const sb = document.getElementById('subjectSwitcherBtn');
    if (sb) { const s = getSubject(_activeSubjectId); sb.textContent = s.flag + ' ' + s.short + ' ▾'; }
    /* index.html hardcodes the Level 2 title; keep the header honest per subject. */
    const subj = getSubject(_activeSubjectId);
    const h1 = document.querySelector('header h1');
    const sub = document.querySelector('header .sub');
    const badge = document.querySelector('header .badge');
    if (h1)  h1.textContent = subj.flag + ' ' + subj.name;
    if (sub) sub.textContent = subj.desc;
    if (badge) badge.style.display = subj.id === 'aat' ? '' : 'none';
  }

  function render() {
    const el = app();

    /* The self-rendering subjects (Levels 1 and 3) own their screens entirely.
       Delegating here — before any of the Level 2 screens or attachEvents() run
       — is what keeps them apart. A subject opts in by naming its global in
       `ui`; nothing else in app.js needs to know which subjects those are. */
    const _own = getSubject(_activeSubjectId).ui;
    if (_own && window[_own] && State.screen !== 'subjects') {
      window[_own].mount(el);
      applyChrome();
      const sw = document.getElementById('subjectSwitcherBtn');
      if (sw && !sw._selfUi) { sw._selfUi = true; sw.addEventListener('click', () => { State.screen = 'subjects'; render(); }); }
      return;
    }

    let html = '';
    if (State.screen === 'splash')      html = renderSplash();
    else if (State.screen === 'subjects') html = `<div class="container fade-in">${renderSubjectPicker()}</div>`;
    else if (State.screen === 'home')   html = renderMain();
    else if (State.screen === 'quiz')   html = renderQuiz();
    else if (State.screen === 'score')  html = renderScore();
    else if (State.screen === 'lesson')   html = renderLesson();
    else if (State.screen === 'flash')    html = renderFlash();
    else if (State.screen === 'recall')   html = renderRecall();
    else if (State.screen === 'revision') html = renderRevision();
    else if (State.screen === 'delf')     html = renderDelf();
    else if (State.screen === 'story')    html = renderStory();
    else if (State.screen === 'proto')    html = renderProto();
    if (State.confirmModal) html += renderModal(State.confirmModal);
    el.innerHTML = html;
    attachEvents();
    /* Same chrome routine as the Level 3 branch, so switching between subjects
       always leaves the header describing the subject actually on screen. */
    applyChrome();
    if (State.confirmModal) {
      const mc = document.getElementById('modalConfirm') || document.getElementById('modalCancel');
      if (mc) mc.focus();
    }
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
      <h2>AAT Level 2</h2>
      <p>The Q2022 Level 2 Certificate in Accounting — four units, each assessed in its own right, with The Business Environment assessed synoptically. ${window.ALL_QUESTIONS.length} audited practice questions including written tasks, with instant feedback, marks-based mock exams and persistent progress tracking.</p>
      <div class="splash-features">
        <div class="feat"><div class="fi" aria-hidden="true">📝</div><strong>${window.ALL_QUESTIONS.length} Questions</strong><br>Across all topics</div>
        <div class="feat"><div class="fi" aria-hidden="true">⏱</div><strong>Synoptic Mock</strong><br>${SYNOPTIC_BLUEPRINT.length} tasks, ${SYNOPTIC_TOTAL_MARKS} marks, ${Math.round(MOCK_DURATION_MS / 60000)} min</div>
        <div class="feat"><div class="fi" aria-hidden="true">🧮</div><strong>Numeric Qs</strong><br>With on-screen calculator</div>
        <div class="feat"><div class="fi" aria-hidden="true">🎯</div><strong>${PASS_MARK}% Pass Mark</strong><br>AAT aligned</div>
        <div class="feat"><div class="fi" aria-hidden="true">📖</div><strong>Glossary</strong><br>Key terms explained</div>
      </div>
      <button class="start-btn" id="startBtn" type="button">Get Started →</button>
      <p class="disclaimer">⚠️ This app is an independent study tool and is not affiliated with, endorsed by, or officially associated with AAT (Association of Accounting Technicians).</p>
    </div>`;
  }

  function renderMain() {
    const ALL_TABS = { learn:'🗺️ Learn', home:'🎯 Practice', listen:'🎧 Listening', delf:'📋 DELF Mock', clinic:'🏥 Clinic', tools:'🧰 T-Accounts', glossary:'📖 Glossary', progress:'📈 Progress', howto:'ℹ️ How to Use' };
    const subjectTabs = getSubject(_activeSubjectId).tabs;
    const tabs = subjectTabs.map(id => ({ id, label: ALL_TABS[id] }));
    // Ensure activeTab is valid for this subject
    if (!subjectTabs.includes(State.activeTab)) State.activeTab = subjectTabs[0];
    let content = '';
    if (State.activeTab === 'learn') content = renderLearningJourney();
    else if (State.activeTab === 'home') content = renderHomeTab();
    else if (State.activeTab === 'listen') content = renderListeningTab();
    else if (State.activeTab === 'delf') content = renderDelfTab();
    else if (State.activeTab === 'clinic') content = renderClinicTab();
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
      const s = objAcc(stats.topics[t.id]);
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
      const ts = objAcc(Storage.data.stats.topics[id]);
      if (!ts.attempts) return null;
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
      ...(_activeSubjectId === 'french' ? [{ id: 'recallBtn', icon: '🎴', title: 'Active Recall', desc: 'Retrieve from memory · flashcards', cls: 'mode-recall' }] : []),
      { topic: 'all', icon: '🎯', title: 'Mixed Practice', desc: `${PRACTICE_LENGTH} random questions`, cls: '' },
      ...(isAAT ? [{ id: 'mockBtn', icon: '⏱', title: 'Synoptic Mock', desc: `${SYNOPTIC_BLUEPRINT.length} tasks · ${SYNOPTIC_TOTAL_MARKS} marks · ${Math.round(MOCK_DURATION_MS / 60000)} min`, cls: 'mode-mock' }] : []),
      ...(isAAT ? [{ id: 'unitExamBtn', icon: '📝', title: 'Unit Assessment', desc: `ITBK · POBC · POC · 90 min each`, cls: 'mode-unit-exam' }] : []),
      ...(isAAT ? [{ id: 'diagnosticBtn', icon: '🧭', title: 'Where should I start?', desc: '12 questions · finds your level per unit', cls: 'mode-diagnostic' }] : []),
      ...(isAAT && storyDef() ? [{ id: 'storyBtn', icon: '🗂️', title: 'A Day at Wrenfield', desc: storyModeDesc(), cls: 'mode-story' }] : []),
      ...(isAAT && protoDef() ? [{ id: 'protoBtn', icon: '🖊️', title: 'Prototype desk', desc: 'One invoice, no questions asked · compare with the day above', cls: 'mode-story' }] : []),
      ...(isAAT ? [{ id: 'flashcardsBtn', icon: '🃏', title: 'Flashcards', desc: `${(window.GLOSSARY || []).length} glossary terms`, cls: '' }] : []),
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

    // Daily-review habit nudge: spaced repetition is the strongest retention
    // driver, so surface due cards prominently (not just as one card in the grid).
    const srTotal = Object.keys(Storage.data.sr || {}).length;
    const reviewNudge = srDueCount > 0
      ? `<button class="review-nudge" type="button" data-topic="sr-due" aria-label="Start daily review, ${srDueCount} cards due">
          <span class="review-nudge-icon" aria-hidden="true">🗓️</span>
          <span class="review-nudge-text">
            <span class="review-nudge-title">Daily review · ${srDueCount} card${srDueCount === 1 ? '' : 's'} due</span>
            <span class="review-nudge-sub">A few minutes of review each day is the fastest way to make it stick.</span>
          </span>
          <span class="review-nudge-cta" aria-hidden="true">Review →</span>
        </button>`
      : (srTotal > 0
        ? `<div class="review-nudge review-nudge-done" role="status">
            <span class="review-nudge-icon" aria-hidden="true">✓</span>
            <span class="review-nudge-text">
              <span class="review-nudge-title">Review complete for now</span>
              <span class="review-nudge-sub">Nothing due — come back later to keep your memory fresh.</span>
            </span>
          </div>`
        : '');

    return `${sessionBanner}${progressBlock}
      ${reviewNudge}
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
        ${window.TOPICS.filter(t => t.section !== 'clinic').map(t => {
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
      ['Synoptic mock', `A ${SYNOPTIC_TOTAL_MARKS}-mark paper across ${SYNOPTIC_BLUEPRINT.length} tasks, sat in ${Math.round(MOCK_DURATION_MS / 60000)} minutes with no feedback until the end. It mirrors the real AAT synoptic assessment, which is The Business Environment: BESY in full plus the parts of Introduction to Bookkeeping and Principles of Bookkeeping Controls that the synoptic draws on. Principles of Costing is a unit assessment only and never appears. Tasks are marked out of their own allocation (7–22 marks), so your percentage is marks-based, not question-based. Use Previous/Next or the task-grouped navigator to move around.`],
      ['Unit assessments', `Separate 90-minute mocks for Introduction to Bookkeeping, Principles of Bookkeeping Controls and Principles of Costing — the three units that have their own end-of-unit exam alongside the synoptic.`],
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

  /* ── French skill / sublevel helpers ───────────────────────────────────── */
  function frQuestionSkill(q) {
    const type = q.type || '';
    const topic = q.topic || '';
    if (type === 'listen' || type === 'listen-typed') return 'listening';
    if (type === 'typed') return topic === 'fr-phon' ? 'listening' : 'writing';
    if (topic === 'fr-gram' || topic === 'fr-conj' || topic === 'fr-order' || topic.startsWith('fr-clinic-')) return 'grammar';
    if (topic === 'fr-dial') return 'reading';
    if (topic === 'fr-phon') return 'listening';
    return 'vocabulary';
  }

  function frQuestionSublevel(q) {
    const topic = q.topic || '';
    if (topic.startsWith('fr-clinic-')) return null;
    const id = q.id || '';
    const n = parseInt(id.replace('fr-', ''), 10);
    if (isNaN(n)) return null;
    const level = frQuestionLevel(id);
    if (level === 'A1') return n < 152 ? 'A1.1' : 'A1.2';
    if (level === 'A2') return n < 640 ? 'A2.1' : 'A2.2';
    if (level === 'B1') return 'B1';
    return null;
  }

  /* ── French tab: Listening ─────────────────────────────────────────────── */
  function renderListeningTab() {
    const allQ = window.ALL_QUESTIONS || [];
    const stats = Storage.data.stats;
    const levels = [
      { id: 'A1', label: 'Débutant',      icon: '🌱', color: '#059669' },
      { id: 'A2', label: 'Élémentaire',   icon: '📗', color: '#2563EB' },
      { id: 'B1', label: 'Intermédiaire', icon: '📘', color: '#7C3AED' },
    ];
    const ttsNote = hasFrenchTts()
      ? `<p class="fr-listen-tip">💡 Audio plays in your browser via TTS. Use headphones for best results. Transcript reveals after each answer.</p>`
      : `<div class="tts-unavail" style="margin-bottom:12px">🔇 No French TTS voice found on this device — transcript will show immediately instead of audio playback.</div>`;
    const cards = levels.map(lv => {
      const pool = allQ.filter(q => (q.type === 'listen' || q.type === 'listen-typed') && frQuestionLevel(q.id) === lv.id);
      if (!pool.length) return '';
      const unlocked = frLevelUnlocked(lv.id);
      if (!unlocked) {
        const prereq = lv.id === 'B1' ? 'A2' : 'A1';
        return `<div class="topic-card topic-card-locked fade-in" style="border-top-color:${lv.color}">
          <div class="level-card-lbl">🔒 ${escapeHtml(lv.id)}</div>
          <h3>${escapeHtml(lv.id)} ${escapeHtml(lv.label)}</h3>
          <p class="lock-reason">Finish all ${prereq} lessons and pass the ${prereq} unit quiz to unlock</p>
          <div class="topic-card-footer"><span class="count"><span class="topic-count-sep">${pool.length} exercises locked</span></span></div>
        </div>`;
      }
      const seen = pool.filter(q => { const s = stats.questions[q.id]; return s && s.attempts > 0; }).length;
      const attempts = pool.reduce((s, q) => s + ((stats.questions[q.id] || {}).attempts || 0), 0);
      const correct  = pool.reduce((s, q) => s + ((stats.questions[q.id] || {}).correct  || 0), 0);
      const mastery  = attempts > 0 ? Math.round(correct / attempts * 100) : null;
      const available = pool.filter(q => !Storage.isConfident(q.id)).length;
      const seenPct  = pool.length ? Math.round(seen / pool.length * 100) : 0;
      const badge    = mastery != null ? `<span class="mastery-badge ${scoreClass(mastery)}">${mastery}%</span>` : '';
      const mcqCount  = pool.filter(q => q.type === 'listen').length;
      const dictCount = pool.filter(q => q.type === 'listen-typed').length;
      return `<button class="topic-card fade-in" type="button" data-topic="listen:${lv.id}" style="border-top-color:${lv.color}" aria-label="Listening ${lv.id} — ${seen} of ${pool.length} seen">
        ${badge}
        <div class="level-card-lbl">${escapeHtml(lv.icon)} ${escapeHtml(lv.id)}</div>
        <h3>${escapeHtml(lv.label)}</h3>
        <p>${mcqCount} comprehension · ${dictCount} dictation</p>
        <div class="topic-card-footer">
          <span class="count">${seen} <span class="topic-count-sep">of</span> ${pool.length} seen</span>
          <div class="topic-seen-bar"><div class="topic-seen-fill" style="width:${seenPct}%"></div></div>
        </div>
        <div class="topic-available">${available} <span class="topic-count-sep">available to practise</span></div>
      </button>`;
    }).join('');
    return `<h2 class="section-title">Listening Practice <span class="section-title-sub">Écoute active · comprehension &amp; dictation</span></h2>
      ${ttsNote}
      <div class="home-grid">${cards}</div>`;
  }

  /* ── French tab: DELF Mock ──────────────────────────────────────────────── */
  function renderDelfTab() {
    if (!window.DELF_MOCKS || !window.DELF_MOCKS.length) {
      return `<h2 class="section-title">DELF Mock Exams</h2>
        <div class="progress-empty">
          <div class="progress-empty-icon">📋</div>
          <p class="progress-empty-title">No DELF exams loaded</p>
          <p class="progress-empty-sub">DELF mock exam data hasn't been loaded yet.</p>
        </div>`;
    }
    return `<h2 class="section-title">DELF Mock Exams <span class="section-title-sub">Diplôme d'Études en Langue Française</span></h2>
      <p style="font-size:.88rem;color:var(--text-secondary);margin-bottom:16px">Timed practice exams structured like the official DELF. Each exam has 4 sections and is scored out of 100.</p>
      ${renderDelfLanding()}`;
  }

  /* ── French tab: Mistake Clinic ─────────────────────────────────────────── */
  function renderClinicTab() {
    const allQ = window.ALL_QUESTIONS || [];
    const stats = Storage.data.stats;
    const clinicTopics = (window.TOPICS || []).filter(t => t.section === 'clinic');
    if (!clinicTopics.length) {
      return `<h2 class="section-title">Mistake Clinic</h2>
        <div class="progress-empty"><div class="progress-empty-icon">🏥</div><p class="progress-empty-title">No clinic topics found</p></div>`;
    }
    const seenByTopic = {};
    allQ.forEach(q => { const s = stats.questions[q.id]; if (s && s.attempts > 0) seenByTopic[q.topic] = (seenByTopic[q.topic] || 0) + 1; });
    const topicMastery = id => { const ts = objAcc(stats.topics[id]); if (!ts.attempts) return null; return Math.round((ts.correct / ts.attempts) * 100); };
    const cards = clinicTopics.map(t => {
      const totalN   = allQ.filter(q => q.topic === t.id).length;
      const m        = topicMastery(t.id);
      const badge    = m == null ? '' : `<span class="mastery-badge ${scoreClass(m)}" title="Topic mastery">${m}%</span>`;
      const seenN    = seenByTopic[t.id] || 0;
      const seenPct  = totalN ? Math.round(seenN / totalN * 100) : 0;
      const available = allQ.filter(q => q.topic === t.id && !Storage.isConfident(q.id)).length;
      return `<button class="topic-card fade-in topic-card-clinic" type="button" data-topic="${t.id}" aria-label="Mistake Clinic: ${escapeHtml(t.name)}">
        ${badge}
        <div class="icon" aria-hidden="true">${t.icon}</div>
        <h3>${escapeHtml(t.name)}</h3>
        <p>${escapeHtml(t.desc)}</p>
        <div class="topic-card-footer">
          <span class="count">${seenN} <span class="topic-count-sep">of</span> ${totalN} seen</span>
          <div class="topic-seen-bar"><div class="topic-seen-fill" style="width:${seenPct}%"></div></div>
        </div>
        <div class="topic-available">${available} <span class="topic-count-sep">available to practise</span></div>
      </button>`;
    }).join('');
    return `<h2 class="section-title">🏥 Mistake Clinic <span class="section-title-sub">targeted error correction · no prerequisites</span></h2>
      <p class="clinic-intro">Targeted practice for the grammar points where French learners most often make mistakes. No prerequisites — open to all levels.</p>
      <div class="home-grid">${cards}</div>`;
  }

  /* Backup and restore. Rendered in BOTH branches of renderProgress — the
     device you are importing into is usually the one with no progress on it,
     which is exactly the branch that returns early. */
  function renderBackupSection() {
    if (!window.ProgressBackup) return '';
    return `<div class="backup-section">
      <h3 class="backup-heading">${window.ProgressSync && window.ProgressSync.isConfigured() ? 'Backup, restore and sync' : 'Backup and restore'}</h3>
      <p class="backup-note">Saves every subject's progress to a single file. Import it on another device to combine the two — the higher score always wins and nothing already on that device is thrown away. Dark mode and whichever subject you have open stay as they are on each device.</p>
      <div class="backup-btns">
        <button class="backup-btn" type="button" id="exportProgressBtn">⬇️ Export to a file</button>
        <button class="backup-btn" type="button" id="importProgressBtn">⬆️ Import from a file</button>
      </div>
      <input type="file" id="importProgressFile" accept="application/json,.json" hidden>
      ${renderSyncBlock()}
    </div>`;
  }

  /* Sync controls. Absent entirely unless sync-config.js names an endpoint, so
     a copy of this app with no Worker deployed shows no half-working feature. */
  function renderSyncBlock() {
    const PS = window.ProgressSync;
    if (!PS || !PS.isConfigured()) return '';
    const st = PS.status();
    if (!st.enabled) {
      return `<div class="sync-block">
        <p class="sync-idle">Sync is off. Turn it on and this device keeps itself in step with your others automatically — no files to move.</p>
        <div class="backup-btns">
          <button class="backup-btn" type="button" id="syncSetupBtn">🔗 Set up sync</button>
        </div>
      </div>`;
    }
    const when = st.lastSyncAt ? timeAgo(st.lastSyncAt) : 'not yet';
    const dot = { syncing: 'busy', error: 'bad', offline: 'warn' }[st.phase] || 'good';
    const label = {
      syncing: 'Syncing…',
      error: escapeHtml(st.error || 'Sync failed'),
      offline: 'Offline — will sync when the connection returns',
    }[st.phase] || `Synced ${escapeHtml(when)}`;
    return `<div class="sync-block">
      <p class="sync-status"><span class="sync-dot sync-dot-${dot}" aria-hidden="true"></span>${label}</p>
      <div class="backup-btns">
        <button class="backup-btn" type="button" id="syncNowBtn">🔄 Sync now</button>
        <button class="backup-btn" type="button" id="syncKeyBtn">🔑 Show sync key</button>
        <button class="backup-btn" type="button" id="syncOffBtn">Turn sync off</button>
      </div>
    </div>`;
  }

  function timeAgo(ts) {
    const s = Math.max(0, Math.round((Date.now() - ts) / 1000));
    if (s < 60) return 'just now';
    if (s < 3600) return Math.round(s / 60) + ' min ago';
    if (s < 86400) return Math.round(s / 3600) + ' hr ago';
    return new Date(ts).toLocaleDateString('en-GB');
  }

  /* First device: generate a key. Second device: paste the first one's key.
     One dialog does both, because which case you are in is obvious to you and
     not to the app. */
  function openSyncSetup() {
    const PS = window.ProgressSync;
    const fresh = PS.generateKey();
    openConfirm({
      title: 'Set up sync',
      message: 'A sync key is the only thing linking your devices. There is no account and no password to recover it with — keep it somewhere safe.',
      bodyHtml: `<div class="sync-setup">
        <label class="sync-field">
          <span class="sync-field-label">Use this new key on your first device</span>
          <input type="text" id="syncKeyInput" class="sync-key-input" value="${escapeHtml(fresh)}" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false">
        </label>
        <p class="sync-hint">On your other device, open this same screen and paste this key in instead of generating a new one. Anyone holding it can read and change your progress, so treat it like a password.</p>
      </div>`,
      confirmLabel: 'Turn sync on',
      onConfirm: () => {
        const el = document.getElementById('syncKeyInput');
        const value = el ? el.value : fresh;
        State.confirmModal = null;
        try { PS.setKey(value); }
        catch (e) { showToast('⚠️ ' + e.message, 'warn'); render(); return; }
        render();
        PS.syncNow({ onRemoteChange: onRemoteProgress }).then((r) => {
          if (r && r.error) showToast('⚠️ Sync is on, but the first attempt failed. It will keep trying.', 'warn');
          else showToast('🔗 Sync is on', 'success');
          render();
        });
      },
    });
  }

  function openSyncKey() {
    openConfirm({
      title: 'Your sync key',
      message: 'Enter this on another device to keep the two in step.',
      bodyHtml: `<div class="sync-setup">
        <input type="text" class="sync-key-input" value="${escapeHtml(window.ProgressSync.getKey())}" readonly onclick="this.select()">
        <p class="sync-hint">Anyone holding this key can read and change your progress. Treat it like a password.</p>
      </div>`,
      hideConfirm: true,
      cancelLabel: 'Done',
    });
  }

  function openSyncOff() {
    openConfirm({
      title: 'Turn sync off?',
      message: 'Progress already on this device stays exactly as it is. It simply stops being kept in step with your other devices, and the key is forgotten here.',
      confirmLabel: 'Turn off',
      onConfirm: () => {
        window.ProgressSync.clearKey();
        State.confirmModal = null;
        showToast('Sync turned off', 'info');
        render();
      },
    });
  }

  /* A sync that brought something in changed the data underneath us. Reload
     rather than re-render, for the same reason import does: this module and the
     Level 3 one both hold their saved data in memory, and a stale copy would
     write back over what just arrived. Never mid-quiz — a reload there would
     throw away the questions on screen. */
  function onRemoteProgress() {
    if (State.screen === 'quiz' || State.confirmModal) return;
    try { sessionStorage.setItem('progressImported', 'sync'); } catch (e) {}
    location.reload();
  }

  function exportProgress() {
    const PB = window.ProgressBackup;
    if (!PB) return;
    try {
      Storage.save();                       // flush anything held in memory first
      const badge = document.querySelector('.version-badge');
      const doc = PB.buildExport({ appVersion: badge ? badge.textContent.trim() : '' });
      const blob = new Blob([JSON.stringify(doc, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url; a.download = PB.filename(); a.style.display = 'none';
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      showToast('⬇️ Progress exported', 'success');
    } catch (e) {
      showToast('Could not export progress on this browser.', 'warn');
    }
  }

  function importProgressFromText(text) {
    const PB = window.ProgressBackup;
    let doc;
    try { doc = PB.parse(text); }
    catch (e) { showToast('⚠️ ' + e.message, 'warn'); return; }

    const rows = PB.summarize(doc);
    const when = doc.exportedAt ? new Date(doc.exportedAt).toLocaleString('en-GB') : 'an unknown date';
    const list = rows.length
      ? `<ul class="backup-manifest">${rows.map(r => {
          const s = SUBJECT_REGISTRY.find(x => subjectStorageKey(x.id) === r.key);
          return `<li><strong>${escapeHtml(s ? s.name : r.key)}</strong> — ${escapeHtml(r.detail)}</li>`;
        }).join('')}</ul>`
      : '<p class="backup-manifest-empty">This file records no progress for any subject.</p>';

    openConfirm({
      title: 'Import this progress?',
      message: `Exported ${when}.`,
      bodyHtml: `${list}
        <div class="backup-mode">
          <label class="backup-mode-opt"><input type="radio" name="importMode" value="merge" checked>
            <span><strong>Combine with this device</strong> — keeps whatever is already here and takes the better of the two for every score.</span></label>
          <label class="backup-mode-opt"><input type="radio" name="importMode" value="replace">
            <span><strong>Replace what is here</strong> — discards this device's progress for the subjects in the file.</span></label>
        </div>`,
      confirmLabel: 'Import',
      onConfirm: () => {
        const picked = document.querySelector('input[name="importMode"]:checked');
        const mode = picked && picked.value === 'replace' ? 'replace' : 'merge';
        try {
          PB.applyImport(doc, mode);
        } catch (e) {
          State.confirmModal = null;
          showToast('⚠️ Could not write the imported progress — storage may be full.', 'warn');
          render();
          return;
        }
        /* Reload rather than re-render. Both this module and the Level 3 one
           hold their saved data in memory, and a stale in-memory copy would
           overwrite what was just imported on the next save. The flag survives
           the reload so the user is told it worked — otherwise the page simply
           blinks and says nothing. */
        try { sessionStorage.setItem('progressImported', mode); } catch (e) {}
        location.reload();
      },
    });
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
      </div>
      ${renderBackupSection()}`;
    const topicRows = window.TOPICS.map(t => {
      const ts = objAcc(stats.topics[t.id]);
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

    // French-specific: CEFR sublevel + skill breakdown
    const isFrProgress = _activeSubjectId === 'french';
    const frCefrSection = isFrProgress ? (() => {
      const allQ = window.ALL_QUESTIONS || [];
      const SUBLEVELS = [
        { id: 'A1.1', label: 'Premiers pas',    icon: '🌱', desc: 'Greetings, basic phrases, numbers', color: '#059669' },
        { id: 'A1.2', label: 'Fondations A1',   icon: '🌿', desc: 'Time, directions, conjugation basics', color: '#16a34a' },
        { id: 'A2.1', label: 'Élémentaire',     icon: '📗', desc: 'Past tense, shopping, work vocabulary', color: '#2563EB' },
        { id: 'A2.2', label: 'A2 avancé',       icon: '📘', desc: 'Pronouns, complex sentences, dialogue', color: '#1d4ed8' },
        { id: 'B1',   label: 'Intermédiaire',   icon: '📙', desc: 'Subjunctive, hypotheticals, register', color: '#7c3aed' },
      ];
      const rows = SUBLEVELS.map(sl => {
        const pool = allQ.filter(q => frQuestionSublevel(q) === sl.id);
        if (!pool.length) return '';
        const seen = pool.filter(q => { const s = stats.questions[q.id]; return s && s.attempts > 0; }).length;
        const att  = pool.reduce((s, q) => s + ((stats.questions[q.id] || {}).attempts || 0), 0);
        const cor  = pool.reduce((s, q) => s + ((stats.questions[q.id] || {}).correct  || 0), 0);
        const pct  = att > 0 ? Math.round(cor / att * 100) : null;
        const seenPct = pool.length ? Math.round(seen / pool.length * 100) : 0;
        const cls  = pct === null ? '' : scoreClass(pct);
        return `<div class="fr-sublevel-row">
          <div class="fr-sublevel-label" style="border-left:3px solid ${sl.color}">
            <span class="fr-sublevel-id">${escapeHtml(sl.icon)} ${escapeHtml(sl.id)}</span>
            <span class="fr-sublevel-name">${escapeHtml(sl.label)}</span>
            <span class="fr-sublevel-desc">${escapeHtml(sl.desc)}</span>
          </div>
          <div class="fr-sublevel-bars">
            <div class="fr-sublevel-stat">
              <span class="fr-sublevel-stat-label">Seen</span>
              <div class="breakdown-bar-bg" style="flex:1" role="progressbar" aria-valuenow="${seenPct}" aria-valuemin="0" aria-valuemax="100"><div class="breakdown-bar ok" style="width:${seenPct}%;background:${sl.color}80"></div></div>
              <span class="fr-sublevel-stat-val">${seen}/${pool.length}</span>
            </div>
            <div class="fr-sublevel-stat">
              <span class="fr-sublevel-stat-label">Accuracy</span>
              <div class="breakdown-bar-bg" style="flex:1" role="progressbar" aria-valuenow="${pct || 0}" aria-valuemin="0" aria-valuemax="100"><div class="breakdown-bar ${cls}" style="width:${pct || 0}%"></div></div>
              <span class="fr-sublevel-stat-val">${pct !== null ? pct + '%' : '—'}</span>
            </div>
          </div>
        </div>`;
      }).join('');
      return `<div class="fr-progress-section">
        <div class="fr-progress-title">Progress by CEFR level <span class="fr-progress-sub">A1.1 · A1.2 · A2.1 · A2.2 · B1</span></div>
        <div class="fr-sublevel-list">${rows}</div>
      </div>`;
    })() : '';

    const frSkillSection = isFrProgress ? (() => {
      const allQ = window.ALL_QUESTIONS || [];
      const SKILLS_FR = [
        { id: 'grammar',    label: 'Grammar',    icon: '📐', desc: 'Tenses, agreement, structure' },
        { id: 'vocabulary', label: 'Vocabulary', icon: '📚', desc: 'Words, phrases, thematic sets' },
        { id: 'listening',  label: 'Listening',  icon: '🎧', desc: 'Audio comprehension, dictation' },
        { id: 'reading',    label: 'Reading',    icon: '📖', desc: 'Dialogue, text comprehension' },
        { id: 'writing',    label: 'Writing',    icon: '✏️', desc: 'Typed production, spelling' },
      ];
      const rows = SKILLS_FR.map(sk => {
        const pool = allQ.filter(q => frQuestionSkill(q) === sk.id);
        const att  = pool.reduce((s, q) => s + ((stats.questions[q.id] || {}).attempts || 0), 0);
        const cor  = pool.reduce((s, q) => s + ((stats.questions[q.id] || {}).correct  || 0), 0);
        const pct  = att > 0 ? Math.round(cor / att * 100) : null;
        const cls  = pct === null ? '' : scoreClass(pct);
        return `<div class="breakdown-row">
          <span class="bl">${sk.icon} ${escapeHtml(sk.label)}</span>
          <div class="breakdown-bar-bg" role="progressbar" aria-valuenow="${pct || 0}" aria-valuemin="0" aria-valuemax="100"><div class="breakdown-bar ${cls}" style="width:${pct || 0}%"></div></div>
          <span class="breakdown-pct">${pct !== null ? pct + '%' : '—'}</span>
        </div>`;
      }).join('');
      return `<div class="breakdown" style="background:var(--card);border:1px solid var(--border);padding:16px;border-radius:11px;margin-bottom:20px">
        <div class="breakdown-title">Accuracy by skill</div>${rows}
      </div>`;
    })() : '';

    return `<h2 class="section-title">Your Progress</h2>
      ${frCefrSection}
      ${frSkillSection}
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
      </div>
      ${renderBackupSection()}`;
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

  function confidentActionBtn(c) {
    if (State.unitQuizId) return '';
    return `<button class="confident-action-btn${c ? ' is-confident' : ''}" id="confidentBtn" type="button" aria-pressed="${c}" title="${c ? 'Confident — click to unmark' : 'Mark as confident — hides from future practice'}" aria-label="${c ? 'Unmark as confident' : 'Mark as confident'}">✓</button>`;
  }

  function renderPracticeQuiz() {
    const q = State.questions[State.current];
    if (!q) { goHome(); return ''; }
    if (isDragDrop(q)) return renderDragDropQuiz(q);
    if (isTableFill(q)) return renderTableFillQuiz(q);
    if (isScenario(q)) return renderScenarioQuiz(q);
    if (isGapFill(q)) return renderGapFillQuiz(q);
    if (isTrueFalse(q)) return renderTrueFalseQuiz(q);
    if (isMultiSelect(q)) return renderMultiSelectQuiz(q);
    if (isWritten(q)) return renderWrittenQuiz(q);
    if (isWordOrder(q)) return renderWordOrderQuiz(q);
    if (isListen(q)) return renderListenQuiz(q);
    if (isTyped(q)) return renderTypedQuiz(q);
    if (isListenTyped(q)) return renderListenTypedQuiz(q);
    return renderPracticeMcqOrNumeric(q);
  }

  function renderPracticeMcqOrNumeric(q) {
    const total = State.questions.length;
    const pct = ((State.current + 1) / total * 100).toFixed(0);
    const topic = window.TOPICS.find(t => t.id === q.topic);
    const numeric = isNumeric(q);
    const confident = Storage.isConfident(q.id);
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
        </div>
        <div class="numeric-error" id="numericError" role="alert"></div>
        <div class="kbd-hint" aria-hidden="true">
          <span><kbd>0</kbd>–<kbd>9</kbd> type</span><span class="kbd-sep">·</span>
          <span><kbd>Enter</kbd> ${answered ? 'next' : 'submit'}</span>
        </div>
      </div>
      ${!answered ? `<div class="quiz-action-row"><button class="next-btn" id="submitNumericBtn" type="button">Submit ✓</button>${confidentActionBtn(confident)}</div>` : ''}`;
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
        <div class="quiz-action-row"><button class="next-btn" id="nextBtn" type="button">${State.current + 1 >= total ? 'See Results ✓' : 'Next Question →'}</button>${confidentActionBtn(confident)}</div>`;
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
        <div class="quiz-action-row"><button class="next-btn" id="nextBtn" type="button">${State.current + 1 >= total ? 'See Results ✓' : 'Next Question →'}</button>${confidentActionBtn(confident)}</div>`;
      }
    }

    const flagged = Storage.isFlagged(q.id);
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
            <div class="progress-wrap">
              <div class="progress-bar-bg" role="progressbar" aria-valuenow="${State.current + 1}" aria-valuemin="0" aria-valuemax="${total}"><div class="progress-bar" style="width:${pct}%"></div></div>
              <div class="progress-label">${State.current + 1} of ${total} completed</div>
            </div>
            <span class="q-counter">Q${State.current + 1}/${total}</span>
          </div>
          <div class="question-text">${escapeHtml(q.q)}</div>
          ${(() => {
            if (_activeSubjectId !== 'french') return '';
            if (isFrToEnMcq(q)) return frTtsBtn('ttsQBtn', extractFrenchTerm(q) || 'Listen');
            if (q.tts) return frTtsBtn('ttsQBtn', 'Listen');
            return '';
          })()}
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
      <div class="quiz-action-row"><button class="next-btn" id="nextBtn" type="button">${State.current + 1 >= total ? 'See Results ✓' : 'Next Question →'}</button>${confidentActionBtn(confident)}</div>`;
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
          ${!answered ? `<div class="quiz-action-row"><button class="next-btn" id="submitDragDropBtn" type="button">Submit matches ✓</button>${confidentActionBtn(confident)}</div>` : ''}
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
      <div class="quiz-action-row"><button class="next-btn" id="nextBtn" type="button">${State.current + 1 >= total ? 'See Results ✓' : 'Next Question →'}</button>${confidentActionBtn(confident)}</div>`;
    }
    return `<div class="container">
      <button class="back-btn" id="exitBtn" type="button">← Back to topics</button>
      <div class="quiz-layout has-calc">
        <div class="quiz-container slide-in">
          <div class="quiz-header">
            <span class="topic-pill">${topic.icon} ${escapeHtml(topic.short)}</span>
            <span class="tf-pill">📋 Table</span>
            <button class="flag-btn ${flagged ? 'is-flagged' : ''}" id="flagBtn" type="button" aria-pressed="${flagged}" aria-label="${flagged ? 'Unflag' : 'Flag for review'}">${flagged ? '⭐' : '☆'}</button>
            <div class="progress-wrap">
              <div class="progress-bar-bg" role="progressbar" aria-valuenow="${State.current + 1}" aria-valuemin="0" aria-valuemax="${total}"><div class="progress-bar" style="width:${pct}%"></div></div>
              <div class="progress-label">${State.current + 1} of ${total} completed</div>
            </div>
            <span class="q-counter">Q${State.current + 1}/${total}</span>
          </div>
          <div class="question-text">${escapeHtml(q.q)}</div>
          ${table.title ? `<div class="tf-title">${escapeHtml(table.title)}</div>` : ''}
          ${tableHtml}
          ${!answered ? `<div class="quiz-action-row"><button class="next-btn" id="submitTableFillBtn" type="button">Submit answers ✓</button>${confidentActionBtn(confident)}</div>` : ''}
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
      <div class="quiz-action-row"><button class="next-btn" id="nextBtn" type="button">${State.current + 1 >= total ? 'See Results ✓' : 'Next Question →'}</button>${confidentActionBtn(confident)}</div>`;
    }
    return `<div class="container">
      <button class="back-btn" id="exitBtn" type="button">← Back to topics</button>
      <div class="quiz-layout has-calc">
        <div class="quiz-container slide-in">
          <div class="quiz-header">
            <span class="topic-pill">${topic.icon} ${escapeHtml(topic.short)}</span>
            <span class="sc-pill">📖 Scenario</span>
            <button class="flag-btn ${flagged ? 'is-flagged' : ''}" id="flagBtn" type="button" aria-pressed="${flagged}" aria-label="${flagged ? 'Unflag' : 'Flag for review'}">${flagged ? '⭐' : '☆'}</button>
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
          ${!answered ? `<div class="quiz-action-row"><button class="next-btn" id="submitScenarioBtn" type="button">Submit all parts ✓</button>${confidentActionBtn(confident)}</div>` : ''}
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
      <div class="quiz-action-row"><button class="next-btn" id="nextBtn" type="button">${State.current + 1 >= total ? 'See Results ✓' : 'Next Question →'}</button>${confidentActionBtn(confident)}</div>`;
    }
    return `<div class="container">
      <button class="back-btn" id="exitBtn" type="button">← Back to topics</button>
      <div class="quiz-layout">
        <div class="quiz-container slide-in">
          <div class="quiz-header">
            <span class="topic-pill">${topic.icon} ${escapeHtml(topic.short)}</span>
            <span class="gf-pill">✏️ Fill the gaps</span>
            <button class="flag-btn ${flagged ? 'is-flagged' : ''}" id="flagBtn" type="button" aria-pressed="${flagged}" aria-label="${flagged ? 'Unflag' : 'Flag for review'}">${flagged ? '⭐' : '☆'}</button>
            <div class="progress-wrap">
              <div class="progress-bar-bg" role="progressbar" aria-valuenow="${State.current + 1}" aria-valuemin="0" aria-valuemax="${total}"><div class="progress-bar" style="width:${pct}%"></div></div>
              <div class="progress-label">${State.current + 1} of ${total} completed</div>
            </div>
            <span class="q-counter">Q${State.current + 1}/${total}</span>
          </div>
          ${q.q ? `<div class="question-text">${escapeHtml(q.q.replace(/\{\d+\}/g, '___'))}</div>` : ''}
          <div class="gf-sentence">${sentence}</div>
          ${!answered ? `<div class="quiz-action-row"><button class="next-btn" id="submitGapFillBtn" type="button">Submit answers ✓</button>${confidentActionBtn(confident)}</div>` : ''}
          ${feedbackHtml}
        </div>
      </div>
    </div>`;
  }

  /* Shared chrome for the practice screens that do not need bespoke layout. */
  function practiceShell(q, pill, bodyHtml, actionHtml, feedbackHtml, fallbackIcon, fallbackShort) {
    const total = State.questions.length;
    const pct = ((State.current + 1) / total * 100).toFixed(0);
    const topic = window.TOPICS.find(t => t.id === q.topic) || { icon: fallbackIcon, short: fallbackShort };
    const flagged = Storage.isFlagged(q.id);
    return `<div class="container">
      <button class="back-btn" id="exitBtn" type="button">← Back to topics</button>
      <div class="quiz-layout">
        <div class="quiz-container slide-in">
          <div class="quiz-header">
            <span class="topic-pill">${topic.icon} ${escapeHtml(topic.short)}</span>
            ${pill}
            <button class="flag-btn ${flagged ? 'is-flagged' : ''}" id="flagBtn" type="button" aria-pressed="${flagged}" aria-label="${flagged ? 'Unflag' : 'Flag for review'}">${flagged ? '⭐' : '☆'}</button>
            <div class="progress-wrap">
              <div class="progress-bar-bg" role="progressbar" aria-valuenow="${State.current + 1}" aria-valuemin="0" aria-valuemax="${total}"><div class="progress-bar" style="width:${pct}%"></div></div>
              <div class="progress-label">${State.current + 1} of ${total} completed</div>
            </div>
            <span class="q-counter">Q${State.current + 1}/${total}</span>
          </div>
          ${q.q ? `<div class="question-text">${escapeHtml(q.q)}</div>` : ''}
          ${bodyHtml}${actionHtml}${feedbackHtml}
        </div>
      </div>
    </div>`;
  }

  function renderTrueFalseQuiz(q) {
    const answered = State.answered !== null;
    const confident = Storage.isConfident(q.id);
    const body = renderTrueFalseGrid(q, answered ? State.answered.picks : State.tfqDraft, answered);
    const action = !answered
      ? `<div class="quiz-action-row"><button class="next-btn" id="submitTrueFalseBtn" type="button">Submit answers ✓</button>${confidentActionBtn(confident)}</div>`
      : '';
    let feedback = '';
    if (answered) {
      const a = State.answered;
      feedback = `<div class="feedback ${a.correct ? 'correct' : 'wrong'} fade-in" role="status" aria-live="polite">
        <strong>${a.correct ? '✅ All statements correct' : `❌ ${a.score} of ${a.total} correct`}</strong><br>
        <em>${escapeHtml(q.exp)}</em>
      </div>
      <div class="quiz-action-row"><button class="next-btn" id="nextBtn" type="button">${State.current + 1 >= State.questions.length ? 'See Results ✓' : 'Next Question →'}</button>${confidentActionBtn(confident)}</div>`;
    }
    return practiceShell(q, '<span class="gf-pill">✓✗ True or false</span>', body, action, feedback, '⚖️', 'Mixed');
  }

  function renderMultiSelectQuiz(q) {
    const answered = State.answered !== null;
    const confident = Storage.isConfident(q.id);
    const picks = answered ? State.answered.picks : State.msDraft;
    const need = q.selectCount || q.answers.length;
    const body = renderMultiSelect(q, picks, answered);
    const action = !answered
      ? `<div class="quiz-action-row"><button class="next-btn" id="submitMultiSelectBtn" type="button" ${picks.length === need ? '' : 'disabled'}>Submit answer ✓</button>${confidentActionBtn(confident)}</div>`
      : '';
    let feedback = '';
    if (answered) {
      const ok = State.answered.correct;
      feedback = `<div class="feedback ${ok ? 'correct' : 'wrong'} fade-in" role="status" aria-live="polite">
        <strong>${ok ? '✅ Correct' : '❌ Incorrect'}</strong><br>
        ${!ok ? `<span class="correct-ans">✓ Correct: ${escapeHtml(q.answers.map(i => q.opts[i]).join('; '))}</span><br><br>` : ''}
        <em>${escapeHtml(q.exp)}</em>
      </div>
      <div class="quiz-action-row"><button class="next-btn" id="nextBtn" type="button">${State.current + 1 >= State.questions.length ? 'See Results ✓' : 'Next Question →'}</button>${confidentActionBtn(confident)}</div>`;
    }
    return practiceShell(q, '<span class="gf-pill">☑ Select ' + (need === 2 ? 'TWO' : need) + '</span>', body, action, feedback, '⚖️', 'Mixed');
  }

  function renderWrittenQuiz(q) {
    const revealed = State.writtenRevealed;
    const confident = Storage.isConfident(q.id);
    const resp = { text: State.writtenDraft, rubric: State.writtenRubric };
    const body = renderWrittenTask(q, resp, revealed);
    const marks = questionMarks(q);
    const awarded = revealed
      ? (q.rubric || []).reduce((s, r, i) => s + (State.writtenRubric[i] ? (Number(r.marks) || 0) : 0), 0) : 0;
    const action = !revealed
      ? `<div class="quiz-action-row"><button class="next-btn" id="submitWrittenBtn" type="button">Reveal model answer ✓</button>${confidentActionBtn(confident)}</div>`
      : `<div class="quiz-action-row"><button class="next-btn" id="finishWrittenBtn" type="button">${State.current + 1 >= State.questions.length ? `Record ${awarded}/${marks} and see results ✓` : `Record ${awarded}/${marks} and continue →`}</button>${confidentActionBtn(confident)}</div>`;
    return practiceShell(q, '<span class="gf-pill">✍️ Written — ' + marks + ' marks</span>', body, action, '', '📝', 'Written');
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
    const answerHtml = Array.from({ length: q.answer.length }, (_, pos) => {
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
      : (answered ? '' : placed.length >= q.answer.length ? '<span class="wo-bank-empty">Ready — unused words can stay here</span>' : '');
    let feedbackHtml = '';
    if (answered) {
      const ok = State.answered.correct;
      feedbackHtml = `<div class="feedback ${ok ? 'correct' : 'wrong'} fade-in" role="status" aria-live="polite">
        <strong>${ok ? '✅ Correct!' : '❌ Incorrect'}</strong><br>
        ${!ok ? `<div class="wo-correct-sentence">Correct: <strong>${escapeHtml(q.answer.join(' '))}</strong></div>` : ''}
        <em>${escapeHtml(q.exp || '')}</em>
      </div>
      <div class="quiz-action-row"><button class="next-btn" id="nextBtn" type="button">${State.current + 1 >= total ? 'See Results ✓' : 'Next Question →'}</button>${confidentActionBtn(confident)}</div>`;
    }
    return `<div class="container">
      <button class="back-btn" id="exitBtn" type="button">← Back to topics</button>
      <div class="quiz-layout">
        <div class="quiz-container slide-in">
          <div class="quiz-header">
            <span class="topic-pill">${topic.icon} ${escapeHtml(topic.short)}</span>
            <span class="sc-pill">🔀 Word order</span>
            <button class="flag-btn ${flagged ? 'is-flagged' : ''}" id="flagBtn" type="button" aria-pressed="${flagged}" aria-label="${flagged ? 'Unflag' : 'Flag'}">${flagged ? '⭐' : '☆'}</button>
            <div class="progress-wrap">
              <div class="progress-bar-bg" role="progressbar" aria-valuenow="${State.current + 1}" aria-valuemin="0" aria-valuemax="${total}"><div class="progress-bar" style="width:${pct}%"></div></div>
              <div class="progress-label">${State.current + 1} of ${total} completed</div>
            </div>
            <span class="q-counter">Q${State.current + 1}/${total}</span>
          </div>
          <div class="question-text">${escapeHtml(q.q)}</div>
          <p class="wo-hint">Tap words from the bank to build the sentence. Not all words are needed. Tap a placed word to remove it.</p>
          <div class="wo-answer-area">${answerHtml}</div>
          <div class="wo-bank">${bankHtml}</div>
          ${!answered ? `<div class="quiz-action-row"><button class="next-btn" id="submitWordOrderBtn" type="button" ${placed.length < q.answer.length ? 'disabled' : ''}>Submit ✓</button>${confidentActionBtn(confident)}</div>` : ''}
          ${feedbackHtml}
        </div>
      </div>
    </div>`;
  }

  function renderListenQuiz(q) {
    const total = State.questions.length;
    const pct = ((State.current + 1) / total * 100).toFixed(0);
    const topic = (window.FR_TOPICS && window.FR_TOPICS.find(t => t.id === q.topic))
               || window.TOPICS.find(t => t.id === q.topic)
               || { icon: '🎧', short: 'Écoute' };
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
      <div class="quiz-action-row"><button class="next-btn" id="nextBtn" type="button">${State.current + 1 >= total ? 'See Results ✓' : 'Next Question →'}</button>${confidentActionBtn(confident)}</div>`;
    }
    return `<div class="container">
      <button class="back-btn" id="exitBtn" type="button">← Back to topics</button>
      <div class="quiz-layout">
        <div class="quiz-container slide-in">
          <div class="quiz-header">
            <span class="topic-pill">${topic.icon} ${escapeHtml(topic.short)}</span>
            ${comboEl}
            <button class="flag-btn ${flagged ? 'is-flagged' : ''}" id="flagBtn" type="button" aria-pressed="${flagged}" title="${flagged ? 'Flagged' : 'Flag for review'}">${flagged ? '⭐' : '☆'}</button>
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
            ${answered ? `<div class="shadow-row">
              <button class="tts-slow-btn" id="listenSlowBtn" type="button" aria-label="Play slowly">🐢 Slow</button>
              <span class="shadow-hint">🗣️ Play it slowly and repeat aloud.</span>
            </div>` : ''}
          </div>
          ${optionsHtml}${feedbackHtml}
        </div>
      </div>
    </div>`;
  }

  function renderTypedQuiz(q) {
    const total = State.questions.length;
    const pct = ((State.current + 1) / total * 100).toFixed(0);
    const topic = (window.FR_TOPICS && window.FR_TOPICS.find(t => t.id === q.topic))
               || window.TOPICS.find(t => t.id === q.topic)
               || { icon: '✍️', short: 'French' };
    const answered = State.answered !== null;
    const correct = answered && isTypedCorrect(q, State.answered);
    const flagged = Storage.isFlagged(q.id);
    const confident = Storage.isConfident(q.id);
    const comboEl = (State.combo >= 3 && State.mode === 'practice')
      ? `<span class="combo-pill combo-${Math.min(State.combo, 10) >= 10 ? 'mega' : State.combo >= 5 ? 'hot' : 'warm'}">🔥 ${State.combo}x combo</span>`
      : '';
    const levelBadge = '';
    const inputVal = answered ? escapeHtml(State.answered) : escapeHtml(State.typedDraft || '');
    const bodyHtml = `<div class="numeric-input-wrap">
      <label for="typedAnswer" class="numeric-label">Your answer:</label>
      <div class="numeric-input-row">
        <input type="text" id="typedAnswer" class="numeric-input ${answered ? (correct ? 'is-correct' : 'is-wrong') : ''}"
               autocomplete="off" spellcheck="false" lang="fr"
               value="${inputVal}" ${answered ? 'disabled' : ''}
               placeholder="Type your answer…" aria-describedby="typedError">
      </div>
      <div class="numeric-error" id="typedError" role="alert"></div>
      ${q.ignoreAccents ? `<div class="kbd-hint" aria-hidden="true"><span>Accents are optional — correct accents are always shown in feedback</span></div>` : ''}
      <div class="kbd-hint" aria-hidden="true">
        <span><kbd>Enter</kbd> ${answered ? 'next' : 'submit'}</span>
      </div>
    </div>
    ${!answered ? `<div class="quiz-action-row"><button class="next-btn" id="submitTypedBtn" type="button">Submit ✓</button>${confidentActionBtn(confident)}</div>` : ''}`;
    let feedbackHtml = '';
    if (answered) {
      feedbackHtml = `<div class="feedback ${correct ? 'correct' : 'wrong'} fade-in" role="status" aria-live="polite">
        <strong>${correct ? '✅ Correct' : '❌ Incorrect'}</strong><br>
        ${!correct ? `<span>Your answer: ${escapeHtml(State.answered)}</span><br><span>Correct answer: <strong>${escapeHtml(q.ans)}</strong></span><br><br>` : ''}
        <em>${escapeHtml(q.exp)}</em>
      </div>
      <div class="quiz-action-row"><button class="next-btn" id="nextBtn" type="button">${State.current + 1 >= total ? 'See Results ✓' : 'Next Question →'}</button>${confidentActionBtn(confident)}</div>`;
    }
    return `<div class="container">
      <button class="back-btn" id="exitBtn" type="button">← Back to topics</button>
      <div class="quiz-layout">
        <div class="quiz-container slide-in">
          <div class="quiz-header">
            <span class="topic-pill">${topic.icon} ${escapeHtml(topic.short)}</span>
            <span class="numeric-pill">✍️ Written</span>
            ${levelBadge}
            ${comboEl}
            <button class="flag-btn ${flagged ? 'is-flagged' : ''}" id="flagBtn" type="button" aria-pressed="${flagged}" aria-label="${flagged ? 'Unflag' : 'Flag for review'}" title="${flagged ? 'Flagged — click to remove' : 'Flag for review'}">${flagged ? '⭐' : '☆'}</button>
            <div class="progress-wrap">
              <div class="progress-bar-bg" role="progressbar" aria-valuenow="${State.current + 1}" aria-valuemin="0" aria-valuemax="${total}">
                <div class="progress-bar" style="width:${pct}%"></div>
              </div>
              <div class="progress-label">${State.current + 1} of ${total} completed</div>
            </div>
            <span class="q-counter">Q${State.current + 1}/${total}</span>
          </div>
          <div class="question-text">${escapeHtml(q.q)}</div>
          ${q.tts && _activeSubjectId === 'french' ? frTtsBtn('ttsQBtn', 'Listen') : ''}
          ${bodyHtml}${feedbackHtml}
        </div>
      </div>
    </div>`;
  }

  function renderListenTypedQuiz(q) {
    const total = State.questions.length;
    const pct = ((State.current + 1) / total * 100).toFixed(0);
    const topic = (window.FR_TOPICS && window.FR_TOPICS.find(t => t.id === q.topic))
               || window.TOPICS.find(t => t.id === q.topic)
               || { icon: '🎧', short: 'Dictée' };
    const answered = State.answered !== null;
    const correct = answered && isTypedCorrect(q, State.answered);
    const flagged = Storage.isFlagged(q.id);
    const confident = Storage.isConfident(q.id);
    const comboEl = (State.combo >= 3 && State.mode === 'practice')
      ? `<span class="combo-pill combo-${Math.min(State.combo, 10) >= 10 ? 'mega' : State.combo >= 5 ? 'hot' : 'warm'}">🔥 ${State.combo}x combo</span>`
      : '';
    const audioText = q.audio || q.ans;
    const inputVal = answered ? escapeHtml(State.answered) : escapeHtml(State.typedDraft || '');
    const playBtnHtml = window.speechSynthesis
      ? `<button class="listen-play-btn" id="listenTypedPlayBtn" type="button" aria-label="Play audio">🔊 Tap to Listen</button>`
      : `<span class="tts-unavail" role="note">🔇 Audio not available on this device — transcript shown below</span>`;
    // Once the transcript is revealed, offer a slow replay + shadowing prompt:
    // hearing it slowly and repeating aloud builds pronunciation (no mic needed).
    const shadowRow = (answered && window.speechSynthesis)
      ? `<div class="shadow-row">
          <button class="tts-slow-btn" id="listenTypedSlowBtn" type="button" aria-label="Play slowly">🐢 Slow</button>
          <span class="shadow-hint">🗣️ Play it slowly and repeat aloud to practise your pronunciation.</span>
        </div>`
      : '';
    const transcriptHtml = answered || !window.speechSynthesis
      ? `<div class="listen-transcript-reveal" role="note"><strong>Transcript:</strong> ${escapeHtml(audioText)}</div>${shadowRow}`
      : '';
    const bodyHtml = `<div class="listen-prompt">
      ${playBtnHtml}
      <p class="listen-hint">${escapeHtml(q.q)}</p>
      ${answered && window.speechSynthesis ? `<button class="tts-replay-btn" id="listenTypedReplayBtn" type="button" aria-label="Replay audio">↺ Replay</button>` : ''}
    </div>
    <div class="numeric-input-wrap">
      ${transcriptHtml}
      <label for="listenTypedAnswer" class="numeric-label">What did you hear?</label>
      <div class="numeric-input-row">
        <input type="text" id="listenTypedAnswer" class="numeric-input ${answered ? (correct ? 'is-correct' : 'is-wrong') : ''}"
               autocomplete="off" spellcheck="false" lang="fr"
               value="${inputVal}" ${answered ? 'disabled' : ''}
               placeholder="Type what you heard…" aria-describedby="listenTypedError">
      </div>
      <div class="numeric-error" id="listenTypedError" role="alert"></div>
      ${q.ignoreAccents ? `<div class="kbd-hint" aria-hidden="true"><span>Accents are optional</span></div>` : ''}
      <div class="kbd-hint" aria-hidden="true">
        <span><kbd>Enter</kbd> ${answered ? 'next' : 'submit'}</span>
      </div>
    </div>
    ${!answered ? `<div class="quiz-action-row"><button class="next-btn" id="submitListenTypedBtn" type="button">Submit ✓</button>${confidentActionBtn(confident)}</div>` : ''}`;
    let feedbackHtml = '';
    if (answered) {
      feedbackHtml = `<div class="feedback ${correct ? 'correct' : 'wrong'} fade-in" role="status" aria-live="polite">
        <strong>${correct ? '✅ Correct' : '❌ Incorrect'}</strong><br>
        ${!correct ? `<span>Your answer: ${escapeHtml(State.answered)}</span><br><span>Correct: <strong>${escapeHtml(q.ans)}</strong></span><br><br>` : ''}
        <em>${escapeHtml(q.exp)}</em>
      </div>
      <div class="quiz-action-row"><button class="next-btn" id="nextBtn" type="button">${State.current + 1 >= total ? 'See Results ✓' : 'Next Question →'}</button>${confidentActionBtn(confident)}</div>`;
    }
    return `<div class="container">
      <button class="back-btn" id="exitBtn" type="button">← Back to topics</button>
      <div class="quiz-layout">
        <div class="quiz-container slide-in">
          <div class="quiz-header">
            <span class="topic-pill">${topic.icon} ${escapeHtml(topic.short)}</span>
            <span class="numeric-pill">🎧 Dictée</span>
            ${comboEl}
            <button class="flag-btn ${flagged ? 'is-flagged' : ''}" id="flagBtn" type="button" aria-pressed="${flagged}" title="${flagged ? 'Flagged' : 'Flag for review'}">${flagged ? '⭐' : '☆'}</button>
            <div class="progress-wrap">
              <div class="progress-bar-bg" role="progressbar" aria-valuenow="${State.current + 1}" aria-valuemin="0" aria-valuemax="${total}"><div class="progress-bar" style="width:${pct}%"></div></div>
              <div class="progress-label">${State.current + 1} of ${total} completed</div>
            </div>
            <span class="q-counter">Q${State.current + 1}/${total}</span>
          </div>
          ${bodyHtml}${feedbackHtml}
        </div>
      </div>
    </div>`;
  }

  /* ── EXAM BODY RENDERERS ──────────────────────────────────────────────────
     Used by the mock/unit-assessment screens, where nothing is revealed until
     submission. `response` is whatever the student has entered so far. */
  function renderExamBody(q, response) {
    if (isNumeric(q)) {
      return `<div class="numeric-input-wrap">
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
    }
    if (isTrueFalse(q)) return renderTrueFalseGrid(q, response || {}, false);
    if (isMultiSelect(q)) return renderMultiSelect(q, response || [], false);
    if (isWritten(q)) return renderWrittenTask(q, response, false);
    if (isGapFill(q)) return renderGapFillBody(q, response || {}, false);
    if (isTableFill(q)) return renderTableFillBody(q, response || {}, false);
    return `<div class="options" role="radiogroup" aria-label="Answer options">
      ${q.opts.map((opt, i) => `<button class="option-btn ${response === i ? 'selected' : ''}" type="button" data-opt="${i}" role="radio" aria-checked="${response === i}">
        <span class="option-label" aria-hidden="true">${LETTERS[i]}</span><span>${escapeHtml(opt)}</span>
      </button>`).join('')}
    </div>${renderKeyboardHintMCQ(true)}`;
  }

  /* True/false statement grid — the most common BESY answer format.
     "Identify whether the following statements are true or false." */
  function renderTrueFalseGrid(q, picks, revealed) {
    const rows = q.statements.map((s, i) => {
      const chosen = picks[i];
      const right = revealed && chosen === s.answer;
      const wrong = revealed && chosen != null && chosen !== s.answer;
      return `<div class="tfq-row ${right ? 'is-correct' : wrong ? 'is-wrong' : ''}">
        <div class="tfq-statement">${escapeHtml(s.text)}</div>
        <div class="tfq-choices" role="radiogroup" aria-label="${escapeHtml(s.text)}">
          ${[true, false].map(v => `<button type="button"
            class="tfq-btn ${chosen === v ? 'selected' : ''}${revealed && s.answer === v ? ' is-answer' : ''}"
            data-tfq-row="${i}" data-tfq-val="${v}" ${revealed ? 'disabled' : ''}
            role="radio" aria-checked="${chosen === v}">${v ? 'True' : 'False'}</button>`).join('')}
        </div>
      </div>`;
    }).join('');
    return `<div class="tfq-grid">
      <div class="tfq-head"><span>Statement</span><span>True / False</span></div>${rows}
      <div class="tfq-marks">${q.statements.length} mark${q.statements.length === 1 ? '' : 's'} — one per statement</div>
    </div>`;
  }

  /* Gap-fill and table-fill bodies for exam mode — same markup as the practice
     screens but driven by the per-question response rather than a live draft. */
  function renderGapFillBody(q, picks) {
    return '<div class="gf-sentence">' + q.template.split(/(\{\d+\})/).map(part => {
      const m = part.match(/^\{(\d+)\}$/);
      if (!m) return escapeHtml(part);
      const gi = +m[1], gap = q.gaps[gi], sel = picks[gi];
      return `<select class="gf-select" data-gf-gap="${gi}" aria-label="Gap ${gi + 1}">
        <option value="">— choose —</option>
        ${gap.options.map((o, i) => `<option value="${i}" ${String(sel) === String(i) ? 'selected' : ''}>${escapeHtml(o)}</option>`).join('')}
      </select>`;
    }).join('') + '</div>';
  }

  function renderTableFillBody(q, picks) {
    const table = q.table;
    const blankByCell = {};
    table.blanks.forEach((b, i) => { blankByCell[b.row + '|' + b.col] = i; });
    return `<table class="tf-table">
      ${table.columns ? `<thead><tr>${table.columns.map(c => `<th>${escapeHtml(c)}</th>`).join('')}</tr></thead>` : ''}
      <tbody>
        ${table.rows.map((row, ri) => `<tr>${row.map((cell, ci) => {
          const bi = blankByCell[ri + '|' + ci];
          if (bi == null) return `<td>${escapeHtml(String(cell))}</td>`;
          const val = picks[bi] != null ? String(picks[bi]) : '';
          return `<td class="tf-blank"><input type="text" class="tf-input" inputmode="decimal" autocomplete="off" data-tf-blank="${bi}" value="${escapeHtml(val)}" aria-label="Blank ${bi + 1}" placeholder="?"></td>`;
        }).join('')}</tr>`).join('')}
      </tbody>
    </table>`;
  }

  /* Multi-select — "Which TWO of the following..." */
  function renderMultiSelect(q, picks, revealed) {
    const need = q.selectCount || (q.answers || []).length;
    const full = picks.length >= need;
    return `<div class="ms-wrap">
      <div class="ms-instruction">Select <strong>${need === 2 ? 'TWO' : need === 3 ? 'THREE' : need}</strong> option${need === 1 ? '' : 's'}. <span class="ms-count">${picks.length}/${need} selected</span></div>
      <div class="options" role="group" aria-label="Answer options">
        ${q.opts.map((opt, i) => {
          const on = picks.indexOf(i) !== -1;
          const isAns = revealed && q.answers.indexOf(i) !== -1;
          let cls = on ? 'selected' : '';
          if (revealed) cls = isAns ? 'correct' : (on ? 'wrong' : '');
          // Once the required number is chosen, only the chosen ones stay clickable.
          const lock = !revealed && full && !on;
          return `<button class="option-btn ms-btn ${cls}" type="button" data-ms="${i}"
            ${revealed || lock ? 'disabled' : ''} aria-pressed="${on}">
            <span class="option-label" aria-hidden="true">${on ? '☑' : '☐'}</span><span>${escapeHtml(opt)}</span>
          </button>`;
        }).join('')}
      </div>
    </div>`;
  }

  /* Written response — human-marked in the real assessment, self-assessed here
     against the task's rubric once the model answer is revealed. */
  function renderWrittenTask(q, response, revealed) {
    const text = (response && response.text != null) ? response.text : (State.writtenDraft || '');
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const short = q.minWords && words < q.minWords;
    const marks = questionMarks(q);
    if (!revealed) {
      return `<div class="written-wrap">
        ${q.setup ? `<div class="written-setup">${escapeHtml(q.setup)}</div>` : ''}
        <div class="written-task"><strong>Required:</strong> ${escapeHtml(q.task)}</div>
        <label class="written-label" for="writtenAnswer">Your answer (${marks} marks${q.minWords ? ` · aim for at least ${q.minWords} words` : ''}):</label>
        <textarea id="writtenAnswer" class="written-input" rows="10" spellcheck="true"
          placeholder="Write your response here…">${escapeHtml(text)}</textarea>
        <div class="written-meta ${short ? 'is-short' : ''}">${words} word${words === 1 ? '' : 's'}${q.minWords ? ` · minimum ${q.minWords}` : ''}</div>
        <div class="written-note">✍️ This task is human-marked in the real assessment. When you submit you will mark your own answer against the examiner's rubric.</div>
      </div>`;
    }
    const ticks = (response && response.rubric) || State.writtenRubric || {};
    const awarded = (q.rubric || []).reduce((s, r, i) => s + (ticks[i] ? (Number(r.marks) || 0) : 0), 0);
    return `<div class="written-wrap">
      <div class="written-yours"><strong>Your answer:</strong><div class="written-yours-body">${escapeHtml(text) || '<em>— not attempted —</em>'}</div></div>
      <div class="written-model"><strong>Model answer:</strong><div class="written-model-body">${escapeHtml(q.modelAnswer)}</div></div>
      <div class="written-rubric">
        <div class="written-rubric-head">Mark your answer — tick each point you covered</div>
        ${(q.rubric || []).map((r, i) => `<label class="rubric-row">
          <input type="checkbox" class="rubric-tick" data-rubric="${i}" ${ticks[i] ? 'checked' : ''}>
          <span class="rubric-point">${escapeHtml(r.point)}</span>
          <span class="rubric-marks">${r.marks} mark${r.marks === 1 ? '' : 's'}</span>
        </label>`).join('')}
        <div class="rubric-total">Self-assessed: <strong>${awarded}/${marks}</strong></div>
      </div>
    </div>`;
  }

  function renderMockQuiz() {
    const q = State.questions[State.current];
    const total = State.questions.length;
    const pct = ((State.current + 1) / total * 100).toFixed(0);
    const topic = window.TOPICS.find(t => t.id === q.topic) || { icon: '🔗', short: 'Synoptic' };
    const response = State.answers[State.current];
    const remaining = State.mockEndTime - Date.now();
    const timerCls = remaining < MOCK_DANGER_MS ? ' danger' : remaining < MOCK_WARN_MS ? ' warn' : '';
    const answeredCount = State.answers.filter(a => a !== null).length;
    const isFirst = State.current === 0;
    const isLast = State.current + 1 >= total;
    const numeric = isNumeric(q);
    const bodyHtml = renderExamBody(q, response);
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
    // Current task banner — unit assessments are a single task, so it is hidden there.
    const curTaskIdx = q._task != null ? q._task : 0;
    const curTask = State.examUnitId ? null : SYNOPTIC_BLUEPRINT[curTaskIdx];
    const taskMarks = curTask
      ? State.questions.filter(x => x._task === curTaskIdx).reduce((s, x) => s + questionMarks(x), 0)
      : 0;
    const taskBanner = curTask ? `<div class="mock-task-banner">
      <span class="mock-task-num">Task ${curTask.n} of ${SYNOPTIC_BLUEPRINT.length}</span>
      <span class="mock-task-title">${escapeHtml(curTask.title)}</span>
      <span class="mock-task-marks">${taskMarks} marks${curTask.written ? ' · human-marked' : ''}</span>
    </div>` : '';
    return `<div class="container">
      <button class="back-btn" id="exitBtn" type="button">← Exit exam</button>
      <div class="quiz-layout ${numeric ? 'has-calc' : ''}">
        <div class="quiz-container slide-in">
          <div class="quiz-header">
            <span class="mode-pill">⏱ ${escapeHtml((State.examLabel || 'Mock exam').toUpperCase())}</span>
            <span class="marks-pill">${questionMarks(q)} mark${questionMarks(q) === 1 ? '' : 's'}</span>
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
          ${isWritten(q) ? '' : `<div class="question-text">${escapeHtml(q.q)}</div>`}
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
    // Mock/unit exams score by marks; practice still scores by question count.
    const marksMode = mode === 'mock' && results.some(r => r.max != null);
    const total = marksMode
      ? results.reduce((s, r) => s + (r.max || 0), 0)
      : results.length;
    const pct = total ? Math.round(score / total * 100) : 0;
    const cls = scoreClass(pct);
    const effectivePassMark = State.unitQuizPassMark || PASS_MARK;
    const passed = pct >= effectivePassMark;
    const msg = passed ? '🎉 Excellent work' : pct >= 50 ? '📚 Good effort — keep going' : '💪 More practice needed';
    const sub = passed ? "You're on track for the synoptic." : pct >= 50 ? 'Review the explanations to strengthen weak areas.' : 'Work through each explanation carefully and try again.';
    const topicResults = {};
    window.TOPICS.forEach(t => { topicResults[t.id] = { name:t.short, icon:t.icon, correct:0, total:0 }; });
    results.forEach(r => {
      const tr = topicResults[r.topic];
      if (!tr) return;
      if (marksMode) { tr.total += (r.max || 0); tr.correct += (r.awarded || 0); }
      else { tr.total++; if (r.correct) tr.correct++; }
    });
    const breakdownHtml = Object.values(topicResults).filter(t => t.total > 0).map(t => {
      const p = Math.round((t.correct / t.total) * 100), bc = scoreClass(p);
      return `<div class="breakdown-row">
        <span class="bl">${t.icon} ${escapeHtml(t.name)}</span>
        <div class="breakdown-bar-bg" role="progressbar" aria-valuenow="${p}" aria-valuemin="0" aria-valuemax="100"><div class="breakdown-bar ${bc}" style="width:${p}%"></div></div>
        <span class="breakdown-pct">${marksMode ? `${t.correct}/${t.total}` : `${p}%`}</span>
      </div>`;
    }).join('');
    /* Per-task marks table — this is how AAT reports synoptic feedback, so it is
       the breakdown that tells a student where the marks actually went. */
    const taskBreakdownHtml = (marksMode && !State.examUnitId) ? (() => {
      const rows = SYNOPTIC_BLUEPRINT.map((task, idx) => {
        const items = results.filter(r => r.task === idx);
        if (!items.length) return '';
        const got = items.reduce((s, r) => s + (r.awarded || 0), 0);
        const max = items.reduce((s, r) => s + (r.max || 0), 0);
        const p = max ? Math.round(got / max * 100) : 0;
        const anySelf = items.some(r => r.selfAssessed);
        return `<div class="breakdown-row">
          <span class="bl">Task ${task.n} · ${escapeHtml(task.title)}${anySelf ? ' <em>(self-assessed)</em>' : ''}</span>
          <div class="breakdown-bar-bg" role="progressbar" aria-valuenow="${p}" aria-valuemin="0" aria-valuemax="100"><div class="breakdown-bar ${scoreClass(p)}" style="width:${p}%"></div></div>
          <span class="breakdown-pct">${got}/${max}</span>
        </div>`;
      }).join('');
      return rows ? `<h3 class="score-section-h">Marks by task</h3><div class="breakdown">${rows}</div>` : '';
    })() : '';
    const selfNote = (State.examSelfMarks && State.examSelfMarks.total)
      ? `<div class="self-assess-note">✍️ ${State.examSelfMarks.awarded}/${State.examSelfMarks.total} of these marks are self-assessed against the rubric. In the real assessment these tasks are marked by a human.</div>`
      : '';
    /* Diagnostic placement: turn the score into a starting point per unit. */
    const diagnosticHtml = State.isDiagnostic ? (() => {
      const recs = diagnosticRecommendations();
      if (!recs.length) return '';
      return `<div class="diag-result">
        <h3 class="diag-result-h">🧭 Where to start</h3>
        <p class="diag-result-p">Based on how you did on each unit, here is where to pick up. You can always start earlier if you would rather build from the ground up.</p>
        ${recs.map(r => `<div class="diag-unit-row">
          <span class="diag-unit-name">${r.topic.icon} ${escapeHtml(r.topic.name || r.uid.toUpperCase())}
            <span class="diag-unit-rec">${escapeHtml(r.advice)}</span></span>
          <span class="diag-unit-score ${scoreClass(r.pct)}">${r.right}/${r.total}</span>
        </div>`).join('')}
        <div class="diag-start-row">
          ${recs.filter(r => r.lesson).map(r => `<button class="btn-secondary" type="button" data-lesson="${escapeHtml(r.lesson.id)}">${r.topic.icon} Start: ${escapeHtml(r.lesson.title)}</button>`).join('')}
        </div>
      </div>`;
    })() : '';
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
      ? `<div class="score-meta">${timedOut ? '⏰ Time expired.' : '✓ Submitted'} · ${escapeHtml(State.examLabel || 'Mock exam')} · ${total} marks across ${results.length} question${results.length === 1 ? '' : 's'}</div>`
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
        ${selfNote}
        ${diagnosticHtml}
        <div class="breakdown" style="margin-bottom:20px">
          <div class="breakdown-title">${marksMode ? 'Marks by topic' : 'Score breakdown by topic'}</div>${breakdownHtml}
        </div>
        ${taskBreakdownHtml ? `<div class="breakdown" style="margin-bottom:20px">${taskBreakdownHtml}</div>` : ''}
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
    const nextLesson = nextLessonToDo();

    const skillQCount = {};
    (window.ALL_QUESTIONS || []).forEach(q => {
      if (q.skill) skillQCount[q.skill] = (skillQCount[q.skill] || 0) + 1;
    });

    const unitsHtml = window.LEARN_PATH.map((unit) => {
      // FR_LEARN_PATH uses `id`; AAT uses `unit` — normalise to a single variable
      const uid = unit.unit || unit.id || '';
      const topicObj = window.TOPICS.find(t => t.id === uid) || {};
      const topicStat = objAcc(Storage.data.stats.topics[uid]);
      const topicAcc = topicStat.attempts ? Math.round(topicStat.correct / topicStat.attempts * 100) : null;

      // For French: lock the entire unit if the previous CEFR level is not complete
      const cefrForUnit = uid === 'fr-a2' ? 'A2' : uid === 'fr-b1' ? 'B1' : uid === 'fr-b2' ? 'B2' : null;
      if (cefrForUnit && !frLevelUnlocked(cefrForUnit)) {
        const prereqLevel = cefrForUnit === 'B2' ? 'B1' : cefrForUnit === 'B1' ? 'A2' : 'A1';
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
        const xpLabel = done ? `+${stars * 10} XP` : `+20 XP`;
        const timeLabel = `~${Math.max(2, (L.cards||[]).length + ((L.check||[]).length || 0))} min`;
        const nodeQCount = (L.skills || []).reduce((sum, sid) => sum + (skillQCount[sid] || 0), 0);
        const tag = L.tag || 'core';
        const isStory = L.title.startsWith('Histoire');
        const tier = L.l3Bridge ? 'tier-5' : isStory ? 'tier-story' : tag === 'mastery' ? 'tier-4' : tag === 'advanced' ? 'tier-3' : 'tier-2';
        const badgeText = L.l3Bridge ? 'L3 Bridge' : isStory ? '📖 Story' : tag === 'mastery' ? 'Mastery' : tag === 'advanced' ? 'Advanced' : 'Core';
        const badgeClass = L.l3Bridge ? 'node-l3-badge' : `tier-${tier}-label`;
        const tierLabel = `<span class="node-tier-label ${badgeClass}">${badgeText}</span>`;
        // Winding path: 3-position cycle (left / centre / right)
        const posClass = ['step-pos-l','step-pos-c','step-pos-r'][nodeIdx % 3];
        return `<div class="journey-step ${posClass}${isStory ? ' journey-step-story' : ''}">
          <div class="journey-step-badge">${!locked ? tierLabel : ''}</div>
          <button class="journey-node ${done ? 'node-done' : locked ? 'node-locked' : 'node-available'} node-${tier}${L.l3Bridge ? ' node-l3' : ''}${isStory ? ' node-story' : ''}" type="button"
              ${locked ? 'disabled' : `data-lesson="${escapeHtml(L.id)}"`}
              aria-label="${escapeHtml(L.title)}${done ? ', completed' : locked ? ', locked' : ', available'}">
            <div class="journey-icon">${locked ? '🔒' : escapeHtml(L.icon)}</div>
            ${done ? '<div class="node-done-ring"></div>' : ''}
          </button>
          <div class="journey-stars">${locked ? '' : starRow}</div>
          <div class="journey-step-label">${escapeHtml(L.title)}</div>
          ${!locked ? `<div class="journey-step-meta"><span class="node-time">⏱ ${timeLabel}</span><span class="node-xp">✦ ${xpLabel}</span></div>` : ''}
          ${nodeQCount > 0 && !locked ? `<span class="node-qcount">${nodeQCount}Q</span>` : ''}
        </div>`;
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
      const unitComplete = unitDone && !!(unitTest && unitTest.passed);
      const collapsedOverride = State.collapsedUnits && State.collapsedUnits[uid];
      const collapsed = collapsedOverride !== undefined ? !!collapsedOverride : unitComplete;
      return `<div class="journey-unit ${unitBadgeEarned ? 'unit-mastered' : ''}${collapsed ? ' journey-unit-collapsed' : ''}">
        <div class="journey-unit-header" style="cursor:pointer" data-collapse-unit="${escapeHtml(uid)}" data-collapsed="${collapsed}" role="button" aria-expanded="${!collapsed}" tabindex="0">
          <span class="journey-unit-icon">${unitBadgeEarned ? '👑' : (topicObj.icon || '📚')}</span>
          <div class="journey-unit-info">
            <div class="journey-unit-title">${escapeHtml(unit.title)}${unitBadgeEarned ? ' <span class="unit-master-badge">MASTERED</span>' : ''}</div>
            <div class="journey-unit-sub">${doneCount}/${unit.lessons.length} lessons ${unitDone ? '✓ complete' : 'in progress'}${(uid && UNIT_ASSESSMENT_INFO[uid]) ? ` <span class="unit-exam-weight">· ${escapeHtml(unitAssessmentLabel(uid))}</span>` : ''}</div>
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

    const nextBlock = nextLesson ? `<div class="journey-next">
      <div class="journey-next-label">Continue learning</div>
      ${nextLesson.unitQuiz
        ? `<button class="journey-next-btn" type="button" data-unit-quiz="${escapeHtml(nextLesson.unitQuiz)}">
            📋 Take the ${escapeHtml(nextLesson.unit.title)} unit quiz →
           </button>`
        : `<button class="journey-next-btn" type="button" data-lesson="${escapeHtml(nextLesson.lesson.id)}">
            ${escapeHtml(nextLesson.lesson.icon)} ${escapeHtml(nextLesson.lesson.title)} →
           </button>`
      }
    </div>` : '<div class="journey-complete">🎉 All lessons complete! Use smart practice to keep sharp.</div>';

    return `${nextBlock}
    <div class="journey-map">${unitsHtml}</div>
    ${_activeSubjectId === 'aat' ? `<div class="l3-bridge-section">
      <div class="l3-bridge-header">
        <h3 class="l3-bridge-title">🌉 What comes next — AAT Level 3</h3>
        <p class="l3-bridge-sub">Level 2 builds the foundations; Level 3 deepens every skill and adds tax, management accounting and professional reporting. Under Q2022 the Level 3 Diploma is four units, each with its own assessment — the Level 3 synoptic was withdrawn. Complete this qualification first, then enrol directly onto Level 3.</p>
        <div class="l3-info-row">
          <div class="l3-info-item">📋 4 units · no synoptic</div>
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
            return `<div class="l3-unit-card">
              <div class="l3-unit-header">
                <span class="l3-unit-icon">${m.icon}</span>
                <div class="l3-unit-title-block">
                  <div class="l3-unit-name">${escapeHtml(m.title)}</div>
                  <div class="l3-unit-builds">Builds on: ${m.buildsOn.map(u => escapeHtml(u)).join(' + ')}</div>
                </div>
                <span class="l3-exam-badge l3-exam-cbe">${escapeHtml(m.exam)}</span>
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
          <li>Pass the three unit assessments and the Business Environment synoptic</li>
          <li>Receive your Level 2 Certificate in Accounting award from AAT</li>
          <li>Enrol on AAT Level 3 via aat.org.uk or an approved training provider</li>
          <li>Complete all four units in any order — Level 3 has no synoptic assessment</li>
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
          // The correct answer reads differently per format, so build it per type.
          const wt = lessonCheckType(wq);
          const answerText =
            wt === 'numeric' ? formatNumericValue(wq, wq.answer)
            : wt === 'gapfill' ? wq.gaps.map(g => g.options[g.answer]).join(' / ')
            : wt === 'truefalse' ? wq.statements.map(s => `${s.text} — ${s.answer ? 'True' : 'False'}`).join('; ')
            : wq.opts[wq.ans];
          return `<div class="lwr-item">
            <p class="lwr-q">Q${wi+1}: ${escapeHtml(wq.q)}</p>
            <p class="lwr-ans">✓ <strong>${escapeHtml(answerText)}</strong>${wq.exp ? ` — ${escapeHtml(wq.exp)}` : ''}</p>
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
      const unlockedQCount = L.firstTime ? (window.ALL_QUESTIONS || []).filter(q => q.lesson === def.id).length : 0;
      const unlockedBanner = unlockedQCount > 0 ? `<div class="lesson-unlocked-banner">🔓 ${unlockedQCount} practice question${unlockedQCount === 1 ? '' : 's'} unlocked!</div>` : '';
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
          ${unlockedBanner}
          ${wrongReview}
          ${drillPanel}
          <div class="lesson-done-btns">
            ${stars < 3 && totalQ > 0 ? `<button class="btn-secondary" id="lessonRetryBtn" type="button">🔁 Retry quiz</button>` : ''}
            ${nextL && !nextL.l3Bridge ? `<button class="btn-primary" id="lessonNextLessonBtn" type="button" data-lesson="${escapeHtml(nextL.id)}">${escapeHtml(nextL.icon)} Next: ${escapeHtml(nextL.title)} →</button>` : ''}
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
      const qType = lessonCheckType(q);
      const answered = qAnswered !== null;
      const correct = answered && (qType === 'mcq' ? qAnswered === q.ans : !!qAnswered.ok);
      const draft = L.checkDraft || newCheckDraft();
      let optHtml, submitHtml = '';

      if (qType === 'numeric') {
        const shown = answered ? formatNumericValue(q, qAnswered.value) : escapeHtml(draft.numeric);
        optHtml = `<div class="numeric-input-wrap">
          <label for="lessonNumeric" class="numeric-label">Your answer${q.unit ? ` (in ${escapeHtml(q.unit)})` : ''}:</label>
          <input type="text" id="lessonNumeric" class="numeric-input ${answered ? (correct ? 'is-correct' : 'is-wrong') : ''}"
                 inputmode="decimal" autocomplete="off" spellcheck="false"
                 value="${shown}" ${answered ? 'disabled' : ''} placeholder="Type your answer">
        </div>`;
        if (!answered) submitHtml = `<button class="next-btn" id="lessonSubmitNumericBtn" type="button">Submit ✓</button>`;
      } else if (qType === 'gapfill') {
        const sentence = q.template.split(/(\{\d+\})/).map(part => {
          const m = part.match(/^\{(\d+)\}$/);
          if (!m) return escapeHtml(part);
          const gi = +m[1], gap = q.gaps[gi];
          if (answered) {
            const ok = qAnswered.perGap[gi];
            const chosen = gap.options[Number(qAnswered.picks[gi])];
            return `<span class="gf-result ${ok ? 'gf-ok' : 'gf-wrong'}">${escapeHtml(chosen)}${!ok ? ' <span class="gf-correct">(' + escapeHtml(gap.options[gap.answer]) + ')</span>' : ''}</span>`;
          }
          return `<select class="gf-select" data-lesson-gap="${gi}" aria-label="Gap ${gi + 1}">
            <option value="">— choose —</option>
            ${gap.options.map((o, i) => `<option value="${i}" ${String(draft.gaps[gi]) === String(i) ? 'selected' : ''}>${escapeHtml(o)}</option>`).join('')}
          </select>`;
        }).join('');
        optHtml = `<div class="gf-sentence">${sentence}</div>`;
        if (!answered) submitHtml = `<button class="next-btn" id="lessonSubmitGapBtn" type="button">Submit ✓</button>`;
      } else if (qType === 'truefalse') {
        optHtml = `<div class="tfq-grid">
          <div class="tfq-head"><span>Statement</span><span>True / False</span></div>
          ${q.statements.map((s, i) => {
            const chosen = answered ? qAnswered.picks[i] : draft.tf[i];
            const right = answered && chosen === s.answer;
            const wrong = answered && chosen != null && chosen !== s.answer;
            return `<div class="tfq-row ${right ? 'is-correct' : wrong ? 'is-wrong' : ''}">
              <div class="tfq-statement">${escapeHtml(s.text)}</div>
              <div class="tfq-choices" role="radiogroup" aria-label="${escapeHtml(s.text)}">
                ${[true, false].map(v => `<button type="button"
                  class="tfq-btn ${chosen === v ? 'selected' : ''}${answered && s.answer === v ? ' is-answer' : ''}"
                  data-lesson-tf="${i}" data-lesson-tf-val="${v}" ${answered ? 'disabled' : ''}
                  role="radio" aria-checked="${chosen === v}">${v ? 'True' : 'False'}</button>`).join('')}
              </div>
            </div>`;
          }).join('')}
        </div>`;
        if (!answered) submitHtml = `<button class="next-btn" id="lessonSubmitTfBtn" type="button">Submit ✓</button>`;
      } else {
        optHtml = `<div class="options" role="radiogroup">${q.opts.map((opt, i) => {
          let cls = '';
          if (answered) { if (i === q.ans) cls = 'correct'; else if (i === qAnswered && qAnswered !== q.ans) cls = 'wrong'; }
          return `<button class="option-btn ${cls}" type="button" data-lesson-ans="${i}" ${answered ? 'disabled' : ''} role="radio" aria-checked="${qAnswered === i}">
            <span class="option-label" aria-hidden="true">${LETTERS[i]}</span><span>${escapeHtml(opt)}</span>
          </button>`;
        }).join('')}</div>`;
      }

      const wrongDetail = (answered && !correct) ? (
        qType === 'numeric' ? `<br><span>Correct answer: ${escapeHtml(formatNumericValue(q, q.answer))}</span>`
        : qType === 'truefalse' ? `<br><span>${qAnswered.right} of ${q.statements.length} statements correct</span>`
        : '') : '';
      const stepsHtml = (answered && q.steps && q.steps.length) ? `<details class="worked-steps" open>
        <summary>📐 How to get there</summary>
        <ol class="steps-list">${q.steps.map(s => `<li>${escapeHtml(s)}</li>`).join('')}</ol>
      </details>` : '';
      const feedback = answered ? `<div class="feedback ${correct ? 'correct' : 'wrong'} fade-in" role="status">
        <strong>${correct ? '✅ Correct!' : '❌ Not quite'}</strong>${wrongDetail}${q.exp ? `<br><em>${escapeHtml(q.exp)}</em>` : ''}
      </div>${stepsHtml}` : '';
      const lessonAudioHtml = q.audio ? `<div class="listen-prompt">
        <button class="listen-play-btn" id="lessonCheckPlayBtn" type="button" aria-label="Play audio clip">🔊 Tap to Listen</button>
        ${answered ? `<button class="tts-replay-btn" id="lessonCheckReplayBtn" type="button" aria-label="Replay audio">↺ Replay</button>` : ''}
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
          ${lessonAudioHtml}
          ${optHtml}
          ${submitHtml}
          ${feedback}
          ${answered ? `<button class="next-btn" id="lessonNextBtn" type="button">${qIdx + 1 >= totalQ ? 'Finish ✓' : 'Next →'}</button>` : ''}
        </div>
      </div>`;
    }

    /* ── TEACH phase ── */
    const card = def.cards[cardIdx];
    // Story read-along: on French story cards, let learners hear the text
    // (whole story or a single tapped line) for reading + listening input.
    const isStoryCard = !!card.visual && _activeSubjectId === 'french'
      && /^histoire/i.test(def.title || '') && !!window.speechSynthesis;
    const storyAudioBar = isStoryCard ? `<div class="story-audio-bar">
      <button class="listen-play-btn story-read-btn" id="storyReadBtn" type="button" aria-label="Listen to the story">🔊 Listen to the story</button>
      <span class="story-audio-hint">🗣️ Tap any line to hear it on its own.</span>
    </div>` : '';
    const visualHtml = card.visual ? `${storyAudioBar}<div class="lesson-visual${isStoryCard ? ' story-readable' : ''}">${card.visual}</div>` : '';
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
    /* Worked example — reveal the solution a step at a time, then try one.
       Novices learn a procedure from a narrated worked example far better than
       from a finished table, so nothing is shown until the learner asks for it. */
    const W = L.worked || newWorkedState();
    const workedHtml = card.worked ? (() => {
      const w = card.worked;
      const shown = Math.min(W.step, w.steps.length);
      const allShown = shown >= w.steps.length;
      const stepsList = w.steps.slice(0, shown).map((s, i) => `<li class="worked-step">
        <div class="worked-step-do">${mdBold(s.do)}</div>
        ${s.why ? `<div class="worked-step-why">${mdBold(s.why)}</div>` : ''}
      </li>`).join('');
      const controls = !allShown
        ? `<div class="worked-controls">
             <button class="btn-primary worked-next" id="workedStepBtn" type="button">${shown === 0 ? 'Show me step 1 →' : `Next step (${shown + 1} of ${w.steps.length}) →`}</button>
             ${shown > 0 ? `<button class="btn-secondary worked-all" id="workedAllBtn" type="button">Show all steps</button>` : ''}
           </div>`
        : `<div class="worked-answer"><span class="worked-answer-label">Answer</span><span class="worked-answer-value">${mdBold(w.answer)}</span></div>`;
      // The follow-up problem only appears once the full solution has been seen.
      const t = w.tryIt;
      const tryHtml = (allShown && t) ? (() => {
        const r = W.tryResult;
        if (r) {
          return `<div class="worked-try ${r.ok ? 'is-correct' : 'is-wrong'}">
            <div class="worked-try-label">${r.ok ? '✅ Correct' : '❌ Not quite'}</div>
            <div class="worked-try-q">${mdBold(t.q)}</div>
            <div class="worked-try-result">You answered <strong>${escapeHtml(formatNumericValue(t, r.value))}</strong>${!r.ok ? ` · correct answer <strong>${escapeHtml(formatNumericValue(t, t.answer))}</strong>` : ''}</div>
            ${t.exp ? `<div class="worked-try-exp">${mdBold(t.exp)}</div>` : ''}
          </div>`;
        }
        return `<div class="worked-try">
          <div class="worked-try-label">Now you try</div>
          <div class="worked-try-q">${mdBold(t.q)}</div>
          <div class="worked-try-row">
            <input type="text" id="workedTryInput" class="numeric-input worked-try-input" inputmode="decimal"
                   autocomplete="off" spellcheck="false" value="${escapeHtml(W.tryDraft || '')}"
                   placeholder="${t.unit ? escapeHtml(t.unit) : 'Your answer'}" aria-label="Your answer">
            <button class="btn-primary" id="workedTryBtn" type="button">Check ✓</button>
          </div>
          ${t.hint && !W.tryRevealed ? `<button class="worked-hint-btn" id="workedHintBtn" type="button">💡 Need a hint?</button>` : ''}
          ${W.tryRevealed && t.hint ? `<div class="worked-try-hint">${mdBold(t.hint)}</div>` : ''}
        </div>`;
      })() : '';
      return `<div class="lesson-worked">
        <div class="worked-head"><span class="worked-badge">Worked example</span>${w.title ? `<span class="worked-title">${escapeHtml(w.title)}</span>` : ''}</div>
        <div class="worked-problem">${mdBold(w.problem)}</div>
        ${stepsList ? `<ol class="worked-steps-list">${stepsList}</ol>` : ''}
        ${controls}
        ${tryHtml}
      </div>`;
    })() : '';
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
          ${card.body ? `<div class="lesson-card-body">${sanitizeCardBody(card.body)}</div>` : ''}
          ${visualHtml}${paraHtml}${flowHtml}${formulaHtml}${workedHtml}${exHtml}${tableHtml}${splitHtml}${calloutHtml}${examtrapHtml}
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

  function renderRecall() {
    const R = State.recall;
    if (!R) { goHome(); return ''; }
    const done = R.idx >= R.cards.length;
    if (done) {
      const pct = R.cards.length ? Math.round(R.got / R.cards.length * 100) : 0;
      const stars = pct >= 90 ? 3 : pct >= 60 ? 2 : 1;
      const starRow = [1,2,3].map(s => `<span class="lesson-star ${stars >= s ? 'lit' : ''}" aria-hidden="true">★</span>`).join('');
      return `<div class="container">
        <div class="flash-done fade-in">
          <div class="flash-done-icon">🧠</div>
          <h2>Recall session complete!</h2>
          <div class="lesson-done-stars" style="justify-content:center;margin-bottom:8px">${starRow}</div>
          <p>You recalled <strong>${R.got}</strong> of ${R.cards.length} card${R.cards.length === 1 ? '' : 's'} (${pct}%).</p>
          <p style="font-size:.85rem;color:var(--subtext)">Cards you missed come back sooner. Recalling from memory — not just recognising — is what makes it stick.</p>
          <button class="btn-primary" style="margin-top:20px" id="recallAgainBtn" type="button">🔁 Another round</button>
          <button class="btn-secondary" style="margin-top:10px" id="recallExitBtn2" type="button">🏠 Home</button>
        </div>
      </div>`;
    }
    const q = questionById(R.cards[R.idx]);
    if (!q) { R.idx++; R.flipped = false; return renderRecall(); }
    const c = recallCardContent(q);
    const topicObj = (window.FR_TOPICS || window.TOPICS || []).find(t => t.id === q.topic);
    const topicTag = topicObj ? `<span class="flash-topic-tag">${topicObj.icon} ${escapeHtml(topicObj.short)}</span>` : '';
    const progressPct = (R.idx / R.cards.length * 100).toFixed(0);
    const ttsBtn = (c.audio && window.speechSynthesis)
      ? `<button class="tts-replay-btn" id="recallTtsBtn" type="button" aria-label="Hear it">🔊 Hear it</button>` : '';
    return `<div class="container">
      <button class="back-btn" id="recallExitBtn" type="button">← Back home</button>
      <div class="flash-player">
        <div class="flash-header">
          <div class="flash-progress-wrap">
            <span class="flash-progress-txt">${R.idx + 1} / ${R.cards.length}</span>
            <div class="flash-progress-bar-bg"><div class="flash-progress-bar-fill" style="width:${progressPct}%"></div></div>
          </div>
          <span class="flash-got">✓ ${R.got} recalled</span>
        </div>
        <div class="flash-card ${R.flipped ? 'flipped' : ''}" id="recallFlipBtn">
          ${!R.flipped
            ? `<div class="flash-front">${topicTag}<span class="flash-term">${escapeHtml(c.front)}</span><p class="flash-hint">Recall the answer, then tap to reveal</p></div>`
            : `<div class="flash-back">${topicTag}<span class="flash-term recall-answer">${escapeHtml(c.back)}</span>${c.exp ? `<p class="flash-def">${escapeHtml(c.exp)}</p>` : ''}${ttsBtn}</div>`
          }
        </div>
        ${!R.flipped
          ? `<button class="btn-secondary flash-flip-btn-btn" id="recallFlipBtn2" type="button">Reveal answer ↩</button>`
          : `<div class="flash-grade-btns">
              <button class="flash-btn-no" id="recallNoBtn" type="button">😕 Didn't recall</button>
              <button class="flash-btn-yes" id="recallYesBtn" type="button">✅ Recalled it</button>
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
        ${m.bodyHtml || ''}
        <div class="modal-buttons">
          <button class="btn-secondary nav-btn" id="modalCancel" type="button">${escapeHtml(m.cancelLabel || 'Cancel')}</button>
          ${m.hideConfirm ? '' : `<button class="btn-primary nav-btn" id="modalConfirm" type="button">${escapeHtml(confirmLabel)}</button>`}
        </div>
      </div>
    </div>`;
  }

  /* Pick which of the three unit assessments to sit. */
  function showUnitAssessmentPicker() {
    playClick();
    const rows = UNIT_ASSESSMENTS.map(u => {
      const t = window.TOPICS.find(x => x.id === u.id) || { icon: '📝' };
      const pool = (window.ALL_QUESTIONS || []).filter(q =>
        q.topic === u.id && MOCK_TYPES.indexOf(q.type || 'mcq') !== -1).length;
      return `<button class="unit-exam-row" type="button" data-unit-exam="${u.id}">
        <span class="unit-exam-icon" aria-hidden="true">${t.icon}</span>
        <span class="unit-exam-body">
          <strong>${escapeHtml(u.title)}</strong>
          <span class="unit-exam-sub">${u.durationMin} min · ${u.marks} marks · ${pool} questions available</span>
        </span>
      </button>`;
    }).join('');
    State.confirmModal = {
      title: 'Unit assessment',
      message: 'These three units each have their own end-of-unit exam, sat separately from the synoptic. Choose one to sit under timed conditions.',
      bodyHtml: `<div class="unit-exam-list">${rows}</div>`,
      hideConfirm: true, cancelLabel: 'Close',
      onCancel: () => { State.confirmModal = null; render(); },
    };
    render();
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
    const isNow = Storage.isConfident(q.id);
    // Update button in-place so typed input is not cleared by a full re-render
    const btn = document.getElementById('confidentBtn');
    if (btn) {
      btn.classList.toggle('is-confident', isNow);
      btn.setAttribute('aria-pressed', String(isNow));
      btn.setAttribute('title', isNow ? 'Confident — click to unmark' : 'Mark as confident — hides from future practice');
      btn.setAttribute('aria-label', isNow ? 'Unmark as confident' : 'Mark as confident');
    }
  }
  function jumpToMockQuestion(idx) {
    if (State.mode !== 'mock') return;
    if (idx < 0 || idx >= State.questions.length) return;
    State.current = idx; Calc.reset(); render();
  }

  /* ── DELF MOCK EXAM ENGINE ───────────────────────────────────────────────── */

  function getDelfExam(id) { return (window.DELF_MOCKS || []).find(e => e.id === id) || null; }

  function flattenSectionQs(section) {
    const qs = [];
    (section.exercises || []).forEach(ex => (ex.questions || []).forEach(q => qs.push(q)));
    return qs;
  }

  function delfSectionScore(de, section) {
    if (section.type === 'auto') {
      const qs = flattenSectionQs(section);
      const ans = de.answers[section.id] || [];
      return ans.filter((a, i) => a !== null && a === qs[i].ans).length;
    }
    const rubric = de.selfScores[section.id] || {};
    let pts = 0;
    (section.tasks || []).forEach(t => (t.rubric || []).forEach(r => { if (rubric[r.id]) pts += r.points; }));
    return pts;
  }

  function startDelfExam(examId) {
    playClick();
    const exam = getDelfExam(examId);
    if (!exam) { showToast('Exam data not found.', 'error'); return; }
    const answers = {};
    const selfScores = {};
    const sectionsDone = {};
    exam.sections.forEach(s => {
      if (s.type === 'auto') answers[s.id] = new Array(flattenSectionQs(s).length).fill(null);
      else selfScores[s.id] = {};
      sectionsDone[s.id] = false;
    });
    State.screen = 'delf';
    State.delfExam = { examId, phase: 'hub', sectionIdx: 0, sectionPhase: 'active', answers, selfScores, sectionsDone, timerEnd: 0, timerInterval: null, timedOut: false };
    render();
  }

  function startDelfSection(idx) {
    playClick();
    const de = State.delfExam;
    const exam = getDelfExam(de.examId);
    const section = exam.sections[idx];
    de.sectionIdx = idx;
    de.phase = 'section';
    de.sectionPhase = (section.type === 'writing' || section.type === 'speaking') ? 'active' : 'active';
    de.timedOut = false;
    de.timerEnd = Date.now() + section.duration * 1000;
    startDelfTimer(section.duration);
    render();
  }

  function startDelfTimer(durationSecs) {
    stopDelfTimer();
    const de = State.delfExam;
    de.timerInterval = setInterval(() => {
      if (!State.delfExam || State.screen !== 'delf') { stopDelfTimer(); return; }
      const remaining = State.delfExam.timerEnd - Date.now();
      if (remaining <= 0) {
        stopDelfTimer();
        State.delfExam.timedOut = true;
        const exam = getDelfExam(State.delfExam.examId);
        const section = exam.sections[State.delfExam.sectionIdx];
        if (section.type === 'auto') {
          finishDelfSection();
        } else {
          State.delfExam.sectionPhase = 'assess';
          render();
        }
      } else {
        updateDelfTimerDisplay(remaining);
      }
    }, 1000);
  }

  function stopDelfTimer() {
    const de = State.delfExam;
    if (de && de.timerInterval) { clearInterval(de.timerInterval); de.timerInterval = null; }
  }

  function updateDelfTimerDisplay(remaining) {
    const el = document.getElementById('delfTimer'); if (!el) return;
    const mins = Math.floor(remaining / 60000);
    const secs = Math.floor((remaining % 60000) / 1000);
    el.textContent = '⏱ ' + String(mins).padStart(2, '0') + ':' + String(secs).padStart(2, '0');
    el.className = 'delf-timer-pill' + (remaining < 60000 ? ' danger' : remaining < 180000 ? ' warn' : '');
  }

  function selectDelfAnswer(flatIdx, optIdx) {
    const de = State.delfExam;
    const exam = getDelfExam(de.examId);
    const section = exam.sections[de.sectionIdx];
    if (!de.answers[section.id]) return;
    de.answers[section.id][flatIdx] = optIdx;
    const btn = document.querySelector(`[data-delf-opt="${flatIdx}-${optIdx}"]`);
    if (btn) {
      document.querySelectorAll(`[data-delf-opt^="${flatIdx}-"]`).forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
    }
    // Update progress counter and finish button without a full re-render
    const anss = de.answers[section.id];
    const answered = anss.filter(a => a !== null).length;
    const total = anss.length;
    const progressText = document.getElementById('delfProgressText');
    if (progressText) progressText.textContent = `${answered}/${total} answered`;
    const fill = document.getElementById('delfProgFill');
    if (fill) fill.style.width = (total ? Math.round(answered / total * 100) : 0) + '%';
    const finishBtn = document.getElementById('delfFinishSectionBtn');
    if (finishBtn) finishBtn.textContent = answered < total ? `Finish (${total - answered} unanswered)` : 'Finish Section →';
  }

  function toggleDelfRubric(rubricId) {
    const de = State.delfExam;
    const exam = getDelfExam(de.examId);
    const section = exam.sections[de.sectionIdx];
    if (!de.selfScores[section.id]) de.selfScores[section.id] = {};
    de.selfScores[section.id][rubricId] = !de.selfScores[section.id][rubricId];
    const score = delfSectionScore(de, section);
    const scoreEl = document.getElementById('delfSelfScore');
    if (scoreEl) scoreEl.textContent = score + ' / ' + section.maxScore;
  }

  function finishDelfSection() {
    stopDelfTimer();
    const de = State.delfExam;
    const exam = getDelfExam(de.examId);
    const section = exam.sections[de.sectionIdx];
    if (section.type !== 'auto') {
      de.sectionPhase = 'assess';
      render();
      return;
    }
    de.sectionsDone[section.id] = delfSectionScore(de, section);
    de.phase = 'hub';
    render();
  }

  function submitDelfSelfAssess() {
    const de = State.delfExam;
    const exam = getDelfExam(de.examId);
    const section = exam.sections[de.sectionIdx];
    de.sectionsDone[section.id] = delfSectionScore(de, section);
    de.phase = 'hub';
    render();
  }

  function finishDelfExam() {
    stopDelfTimer();
    State.delfExam.phase = 'results';
    render();
  }

  function exitDelf() {
    stopDelfTimer();
    State.delfExam = null;
    State.screen = 'home';
    State.activeTab = 'delf';
    render();
  }

  /* ── DELF RENDER FUNCTIONS ─────────────────────────────────────────────── */

  function renderDelf() {
    if (!State.delfExam) { exitDelf(); return ''; }
    const de = State.delfExam;
    if (de.phase === 'hub')     return renderDelfHub();
    if (de.phase === 'section') return renderDelfSection();
    if (de.phase === 'results') return renderDelfResults();
    return '';
  }

  function renderDelfHub() {
    const de = State.delfExam;
    const exam = getDelfExam(de.examId);
    const allDone = exam.sections.every(s => de.sectionsDone[s.id] !== false);
    const totalScore = allDone ? exam.sections.reduce((sum, s) => sum + (de.sectionsDone[s.id] || 0), 0) : null;
    const SEC_TYPE_LABEL = { auto: '✅ Auto-graded', self: '📋 Self-assessed', writing: '📋 Self-assessed', speaking: '📋 Self-assessed' };
    const sectionCards = exam.sections.map((s, idx) => {
      const done = de.sectionsDone[s.id] !== false;
      const score = done ? de.sectionsDone[s.id] : null;
      const passSec = score !== null && score >= 5;
      const typeLabel = SEC_TYPE_LABEL[s.type] || '';
      return `<div class="delf-section-card ${done ? 'delf-sec-done' : ''}">
        <div class="delf-sec-icon">${s.icon}</div>
        <div class="delf-sec-info">
          <div class="delf-sec-title">${escapeHtml(s.title)}</div>
          <div class="delf-sec-sub">${escapeHtml(s.english)} · ${s.maxScore} pts · ${Math.round(s.duration / 60)} min</div>
          <div class="delf-sec-type">${typeLabel}</div>
        </div>
        <div class="delf-sec-status">
          ${done ? `<span class="delf-sec-score ${passSec ? 'pass' : 'fail'}">${score}/${s.maxScore}</span>` : `<button class="delf-start-sec-btn" type="button" data-delf-start="${idx}">Start →</button>`}
        </div>
      </div>`;
    }).join('');
    const levelColour = exam.level === 'A1' ? '#059669' : exam.level === 'A2' ? '#2563EB' : exam.level === 'B1' ? '#7c3aed' : '#9d174d';
    return `<div class="container delf-hub fade-in">
      <div class="delf-hub-header">
        <button class="delf-back-btn" type="button" id="delfExitBtn">← Back to DELF Exams</button>
        <span class="delf-hub-level-badge" style="background:${levelColour}">${escapeHtml(exam.level)}</span>
        <div class="delf-hub-title">${escapeHtml(exam.title)}</div>
        <div class="delf-hub-desc">${escapeHtml(exam.desc)}</div>
      </div>
      <div class="delf-sections-list">${sectionCards}</div>
      ${allDone ? `<div class="delf-hub-actions">
        <button class="delf-finish-exam-btn" type="button" id="delfFinishExamBtn">View Results →</button>
      </div>` : ''}
    </div>`;
  }

  function renderDelfSection() {
    const de = State.delfExam;
    const exam = getDelfExam(de.examId);
    const section = exam.sections[de.sectionIdx];
    if (section.type === 'auto') return renderDelfAutoSection(section);
    if (section.type === 'self') return renderDelfSelfSection(section);
    if (section.type === 'writing') return renderDelfWritingSection(section);
    if (section.type === 'speaking') return renderDelfSpeakingSection(section);
    return '';
  }

  function delfTtsText(raw) {
    if (!raw) return '';
    // Keep dialogue dashes so speakDelfDialogue can parse speaker turns
    return raw
      .replace(/^\[[^\]]*\]\s*"?/, '')   // strip [Stage direction] prefix
      .replace(/"$/, '')                  // strip trailing quote
      .trim();
  }

  /* Renders a B1-style self-assessed listening or reading section */
  function renderDelfSelfSection(section) {
    const de = State.delfExam;
    if (de.sectionPhase === 'assess') return renderDelfSelfAssess(section);
    const isListening = section.id === 'listening';
    const ttsAvail = hasFrenchTts();
    const SECTION_INSTRUCTIONS = {
      listening: 'Listen to each recording (or read the transcript if audio is unavailable), then answer the comprehension questions mentally before self-assessing.',
      reading: 'Read each text carefully. Take notes if helpful. Then use the rubric checklist to assess your comprehension.',
    };
    const ttsNotice = isListening
      ? `<div class="delf-tts-notice${ttsAvail ? '' : ' no-tts'}">
          ${ttsAvail
            ? `🔊 <strong>Simulated audio:</strong> Listening is via your browser's text-to-speech engine — real DELF uses recorded audio. Play each extract, then reveal the transcript to verify your understanding.`
            : `🔇 <strong>No French TTS voice found.</strong> Transcripts are shown below in place of audio. In the real exam these would be recorded extracts played twice.`}
        </div>` : '';
    const tasksHtml = (section.tasks || []).map(t => {
      const raw = t.script || t.text || '';
      let contentHtml = '';
      if (raw) {
        if (isListening && ttsAvail) {
          contentHtml = `<div class="delf-self-audio-block">
            <button class="delf-tts-btn" type="button" data-delf-tts="${escapeHtml(raw)}">🔊 Play recording</button>
            <span class="delf-tts-replay">Tap again to replay · real exam: played twice</span>
            <details class="delf-transcript-details">
              <summary class="delf-transcript-toggle">📄 Show transcript (reveal after attempting)</summary>
              <pre class="delf-transcript-pre">${escapeHtml(raw)}</pre>
            </details>
          </div>`;
        } else {
          contentHtml = `<div class="delf-self-content-block">
            ${isListening ? `<div class="delf-no-audio-label">📄 Transcript (no audio on this device)</div>` : ''}
            <pre class="delf-transcript-pre">${escapeHtml(raw)}</pre>
          </div>`;
        }
      }
      return `<div class="delf-task">
        <div class="delf-task-title">${escapeHtml(t.title)}</div>
        <div class="delf-task-instruction">${escapeHtml(t.instruction)}</div>
        ${contentHtml}
      </div>`;
    }).join('');
    return `<div class="container delf-section-screen fade-in">
      <div class="delf-section-header">
        <button class="delf-back-btn" type="button" id="delfSectionBackBtn">← Sections</button>
        <div class="delf-section-title">${section.icon} ${escapeHtml(section.title)}</div>
        <div id="delfTimer" class="delf-timer-pill">⏱ ${String(Math.floor(section.duration/60)).padStart(2,'0')}:00</div>
      </div>
      ${ttsNotice}
      <div class="delf-section-instruction">${escapeHtml(SECTION_INSTRUCTIONS[section.id] || '')}</div>
      <div class="delf-tasks">${tasksHtml}</div>
      <div class="delf-section-footer">
        <button class="delf-finish-sec-btn" type="button" id="delfFinishSectionBtn">I've finished — self-assess →</button>
      </div>
    </div>`;
  }

  function renderDelfAutoSection(section) {
    const de = State.delfExam;
    const anss = de.answers[section.id] || [];
    const isListening = section.id === 'listening';
    const ttsAvail = hasFrenchTts();
    let flatIdx = 0;

    // Per-section exam-style instructions
    const SECTION_INSTRUCTIONS = {
      listening: isListening && ttsAvail
        ? 'Click "Play Recording" for each extract. In the real exam each recording is played twice. Answer without looking at the transcript, then move on.'
        : 'Read each transcript carefully (substituting for audio). In the real exam these would be recordings played twice.',
      reading: 'Read each text carefully. You may refer back to it while answering.',
    };
    const sectionInstruction = SECTION_INSTRUCTIONS[section.id] || '';

    const ttsNotice = isListening
      ? `<div class="delf-tts-notice${ttsAvail ? '' : ' no-tts'}">
          ${ttsAvail
            ? `🔊 <strong>Simulated audio:</strong> This app uses browser text-to-speech — real DELF exams use recorded audio.`
            : `🔇 <strong>No French TTS voice found.</strong> Transcripts are shown below in place of audio recordings.`}
        </div>` : '';

    const exercisesHtml = (section.exercises || []).map((ex, exIdx) => {
      const groups = [];
      let currentGroup = null;
      (ex.questions || []).forEach(q => {
        const hasNewContext = isListening ? (q.transcript !== null && q.transcript !== undefined)
                                         : (q.text !== null && q.text !== undefined);
        if (hasNewContext) {
          currentGroup = { context: isListening ? q.transcript : q.text, questions: [] };
          groups.push(currentGroup);
        } else if (!currentGroup) {
          currentGroup = { context: null, questions: [] };
          groups.push(currentGroup);
        }
        currentGroup.questions.push({ q, idx: flatIdx++ });
      });

      const groupsHtml = groups.map((g, gi) => {
        let contextHtml = '';
        if (isListening && g.context) {
          const ttsText = delfTtsText(g.context);
          const ttsKey = `delf-tts-${exIdx}-${gi}`;
          if (ttsAvail) {
            contextHtml = `<div class="delf-tts-block">
              <button class="delf-tts-btn" type="button" data-delf-tts="${escapeHtml(ttsText)}" id="${ttsKey}">🔊 Play Recording</button>
              <span class="delf-tts-replay">Tap again to replay · In the real exam you hear each recording twice</span>
            </div>`;
          } else {
            // No TTS — show transcript directly as substitute
            contextHtml = `<div class="delf-text-block delf-transcript-fallback">
              <div class="delf-no-audio-label">📄 Transcript (no audio on this device — read as you would listen)</div>
              <pre class="delf-text-content">${escapeHtml(g.context)}</pre>
            </div>`;
          }
        } else if (!isListening && g.context) {
          contextHtml = `<div class="delf-text-block"><pre class="delf-text-content">${escapeHtml(g.context)}</pre></div>`;
        }
        const qsHtml = g.questions.map(({ q, idx }) => {
          const sel = anss[idx];
          const optsHtml = q.opts.map((o, oi) =>
            `<button class="delf-opt ${sel === oi ? 'selected' : ''}" type="button" data-delf-opt="${idx}-${oi}">${String.fromCharCode(65+oi)}. ${escapeHtml(o)}</button>`
          ).join('');
          return `<div class="delf-question">
            <div class="delf-q-row"><span class="delf-q-num">${idx + 1}.</span><span class="delf-q-text">${escapeHtml(q.q)}</span></div>
            <div class="delf-opts">${optsHtml}</div>
          </div>`;
        }).join('');
        return `<div class="delf-question-group">${contextHtml}${qsHtml}</div>`;
      }).join('');

      return `<div class="delf-exercise">
        <div class="delf-ex-title">${escapeHtml(ex.title)}</div>
        <div class="delf-ex-instruction">${escapeHtml(ex.instruction)}</div>
        ${groupsHtml}
      </div>`;
    }).join('');

    const answered = anss.filter(a => a !== null).length;
    const total = anss.length;
    return `<div class="container delf-section-screen fade-in">
      <div class="delf-section-header">
        <button class="delf-back-btn" type="button" id="delfSectionBackBtn">← Sections</button>
        <div class="delf-section-title">${section.icon} ${escapeHtml(section.title)}</div>
        <div id="delfTimer" class="delf-timer-pill">⏱ ${String(Math.floor(section.duration/60)).padStart(2,'0')}:00</div>
      </div>
      ${ttsNotice}
      ${sectionInstruction ? `<div class="delf-section-instruction">${escapeHtml(sectionInstruction)}</div>` : ''}
      <div class="delf-progress-row"><span id="delfProgressText">${answered}/${total} answered</span><div class="delf-prog-bar"><div class="delf-prog-fill" id="delfProgFill" style="width:${total?Math.round(answered/total*100):0}%"></div></div></div>
      <div class="delf-exercises">${exercisesHtml}</div>
      <div class="delf-section-footer">
        <button class="delf-finish-sec-btn" type="button" id="delfFinishSectionBtn">${answered < total ? `Finish (${total - answered} unanswered)` : 'Finish Section →'}</button>
      </div>
    </div>`;
  }

  function renderDelfWritingSection(section) {
    const de = State.delfExam;
    if (de.sectionPhase === 'assess') return renderDelfSelfAssess(section);
    const tasksHtml = (section.tasks || []).map(t => `<div class="delf-task">
      <div class="delf-task-title">${escapeHtml(t.title)}</div>
      <div class="delf-task-instruction">${escapeHtml(t.instruction)}</div>
      ${t.content ? `<div class="delf-task-content"><pre class="delf-form-content">${escapeHtml(t.content)}</pre></div>` : ''}
      ${t.hint ? `<div class="delf-task-hint">💡 ${escapeHtml(t.hint)}</div>` : ''}
      <textarea class="delf-writing-area" placeholder="Use this space for notes or draft writing…" rows="6"></textarea>
    </div>`).join('');
    return `<div class="container delf-section-screen fade-in">
      <div class="delf-section-header">
        <button class="delf-back-btn" type="button" id="delfSectionBackBtn">← Sections</button>
        <div class="delf-section-title">${section.icon} ${escapeHtml(section.title)}</div>
        <div id="delfTimer" class="delf-timer-pill">⏱ ${String(Math.floor(section.duration/60)).padStart(2,'0')}:00</div>
      </div>
      <div class="delf-section-instruction">Write in French on paper or in a separate document. Use the textarea below for planning notes only. When the timer ends, self-assess your work using the rubric checklist.</div>
      <div class="delf-section-intro">${escapeHtml(section.intro || '')}</div>
      <div class="delf-tasks">${tasksHtml}</div>
      <div class="delf-section-footer">
        <button class="delf-finish-sec-btn" type="button" id="delfFinishSectionBtn">I\'ve finished writing →</button>
      </div>
    </div>`;
  }

  function renderDelfSpeakingSection(section) {
    const de = State.delfExam;
    if (de.sectionPhase === 'assess') return renderDelfSelfAssess(section);
    const tasksHtml = (section.tasks || []).map(t => {
      const promptsHtml = t.prompts ? `<ul class="delf-prompts">${t.prompts.map(p => `<li>${escapeHtml(p)}</li>`).join('')}</ul>` : '';
      const scenarioHtml = t.scenario ? `<div class="delf-scenario"><strong>Scenario:</strong> ${escapeHtml(t.scenario)}</div>` : '';
      const guidingHtml = t.guidingQuestions ? `<ul class="delf-prompts">${t.guidingQuestions.map(p => `<li>${escapeHtml(p)}</li>`).join('')}</ul>` : '';
      const usefulHtml = t.usefulPhrases ? `<div class="delf-useful"><div class="delf-useful-label">Useful phrases:</div><ul>${t.usefulPhrases.map(p => `<li><em>${escapeHtml(p)}</em></li>`).join('')}</ul></div>` : '';
      const imageHtml = t.image ? `<div class="delf-photo-wrap"><img src="${escapeHtml(t.image)}" class="delf-photo" alt="Photo for description task" loading="lazy"></div>` : '';
      return `<div class="delf-task">
        <div class="delf-task-title">${escapeHtml(t.title)}</div>
        <div class="delf-task-instruction">${escapeHtml(t.instruction)}</div>
        ${promptsHtml}${scenarioHtml}${imageHtml}${guidingHtml}${usefulHtml}
      </div>`;
    }).join('');
    return `<div class="container delf-section-screen fade-in">
      <div class="delf-section-header">
        <button class="delf-back-btn" type="button" id="delfSectionBackBtn">← Sections</button>
        <div class="delf-section-title">${section.icon} ${escapeHtml(section.title)}</div>
        <div id="delfTimer" class="delf-timer-pill">⏱ ${String(Math.floor(section.duration/60)).padStart(2,'0')}:00</div>
      </div>
      <div class="delf-section-instruction">Carry out each task out loud — with a partner if possible, or alone in front of a mirror. Use your preparation time, then speak. Self-assess at the end.</div>
      <div class="delf-section-intro">${escapeHtml(section.intro || '')}</div>
      <div class="delf-tasks">${tasksHtml}</div>
      <div class="delf-section-footer">
        <button class="delf-finish-sec-btn" type="button" id="delfFinishSectionBtn">I\'ve finished speaking →</button>
      </div>
    </div>`;
  }

  function renderDelfSelfAssess(section) {
    const de = State.delfExam;
    const scores = de.selfScores[section.id] || {};
    let currentScore = 0;
    const tasksHtml = (section.tasks || []).map(t => {
      const rubricHtml = (t.rubric || []).map(r => {
        const checked = !!scores[r.id];
        if (checked) currentScore += r.points;
        return `<label class="delf-rubric-item ${checked ? 'checked' : ''}">
          <input type="checkbox" class="delf-rubric-cb" data-delf-rubric="${escapeHtml(r.id)}" ${checked ? 'checked' : ''}>
          <span class="delf-rubric-label">${escapeHtml(r.label)}</span>
          <span class="delf-rubric-pts">+${r.points} pt${r.points !== 1 ? 's' : ''}</span>
        </label>`;
      }).join('');
      const instructionHtml = t.instruction ? `<div class="delf-assess-instruction">${escapeHtml(t.instruction)}</div>` : '';
      const sourceContent = t.script || t.text || '';
      const sourceHtml = sourceContent ? `<details class="delf-transcript-details delf-source-ref">
        <summary class="delf-transcript-toggle">📄 Reference ${t.script ? 'transcript' : 'text'}</summary>
        <pre class="delf-transcript-pre">${escapeHtml(sourceContent)}</pre>
      </details>` : '';
      const modelContent = t.modelAnswer || t.modelDialogue;
      const modelHtml = modelContent ? `<details class="delf-model-wrap">
        <summary class="delf-model-summary">${t.modelDialogue ? '💬 View model dialogue' : '📝 View model answer'}</summary>
        <div class="delf-model-body"><pre class="delf-model-text">${escapeHtml(modelContent)}</pre></div>
      </details>` : '';
      return `<div class="delf-task delf-assess-task">
        <div class="delf-task-title">${escapeHtml(t.title)}</div>
        ${instructionHtml}
        ${sourceHtml}
        <div class="delf-rubric">${rubricHtml}</div>
        ${modelHtml}
      </div>`;
    }).join('');
    return `<div class="container delf-section-screen fade-in">
      <div class="delf-section-header">
        <div class="delf-section-title">${section.icon} ${escapeHtml(section.title)} — Self-Assessment</div>
      </div>
      <div class="delf-assess-intro">
        <p>Honestly tick the criteria you met. Your score will be calculated from the boxes you check.</p>
        <div class="delf-self-score-row">Your score: <span id="delfSelfScore" class="delf-self-score">${currentScore} / ${section.maxScore}</span></div>
      </div>
      <div class="delf-tasks">${tasksHtml}</div>
      <div class="delf-section-footer">
        <button class="delf-finish-sec-btn" type="button" id="delfSubmitAssessBtn">Submit self-assessment →</button>
      </div>
    </div>`;
  }

  function renderDelfResults() {
    const de = State.delfExam;
    const exam = getDelfExam(de.examId);
    let total = 0;
    let allMinMet = true;
    const rows = exam.sections.map(s => {
      const score = de.sectionsDone[s.id] || 0;
      total += score;
      const pct = Math.round(score / s.maxScore * 100);
      const pass = score >= 5;
      if (!pass) allMinMet = false;
      const cls = pass ? 'pass' : 'fail';
      return `<tr class="delf-result-row">
        <td>${s.icon} ${escapeHtml(s.title)}</td>
        <td class="delf-res-score ${cls}">${score} / ${s.maxScore}</td>
        <td class="delf-res-pct ${cls}">${pct}%</td>
        <td class="delf-res-min">${pass ? '✓' : '✗ below 5'}</td>
      </tr>`;
    }).join('');
    const overallPass = total >= 50 && allMinMet;
    const overallPct = Math.round(total / 100 * 100);
    const selfNote = exam.sections.some(s => s.type !== 'auto')
      ? '<p class="delf-results-note">Note: Writing and speaking scores are self-assessed. In the real DELF exam, these sections are marked by examiners.</p>' : '';
    return `<div class="container delf-results fade-in">
      <div class="delf-results-header">
        <div class="delf-results-title">${escapeHtml(exam.title)} — Results</div>
        <div class="delf-overall-badge ${overallPass ? 'pass' : 'fail'}">${overallPass ? '✓ PASS' : '✗ Not yet — keep practising'}</div>
        <div class="delf-overall-score">${total} / 100 (${overallPct}%)</div>
        <div class="delf-pass-note">Pass mark: 50/100 overall + minimum 5/25 in each section</div>
      </div>
      <table class="delf-results-table">
        <thead><tr><th>Section</th><th>Score</th><th>%</th><th>Min. 5/25</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
      ${selfNote}
      <div class="delf-results-actions">
        <button class="delf-retry-btn" type="button" data-delf-retry="${escapeHtml(de.examId)}">Retry this exam</button>
        <button class="delf-back-home-btn" type="button" id="delfHomeBtn">← Back to DELF Exams</button>
      </div>
    </div>`;
  }

  function renderDelfLanding() {
    if (!window.DELF_MOCKS || !window.DELF_MOCKS.length) return '';
    const de = State.delfExam;
    const ttsAvail = hasFrenchTts();
    const levelOrder = { A1: 1, A2: 2, B1: 3, B2: 4 };
    const sortedMocks = [...window.DELF_MOCKS].sort((a, b) => (levelOrder[a.level] || 9) - (levelOrder[b.level] || 9));

    const LEVEL_META = {
      A1: { icon: '🌱', colour: '#059669', label: 'Beginner', cando: 'Understand and produce very simple everyday expressions. Introduce yourself, ask basic questions about people and places.' },
      A2: { icon: '📗', colour: '#2563EB', label: 'Elementary', cando: 'Describe your immediate environment and routine. Handle short social exchanges. Read simple notices and messages.' },
      B1: { icon: '📘', colour: '#7c3aed', label: 'Intermediate', cando: 'Deal with most travel and social situations. Write simple connected text. Understand the main points of clear standard speech.' },
    };

    const grouped = {};
    sortedMocks.forEach(exam => {
      if (!grouped[exam.level]) grouped[exam.level] = [];
      grouped[exam.level].push(exam);
    });

    const levelsHtml = Object.entries(grouped).map(([level, exams]) => {
      const meta = LEVEL_META[level] || { icon: '📄', colour: '#555', label: level, cando: '' };
      const hasAutoGraded = exams.some(e => e.sections && e.sections.some(s => s.type === 'auto'));
      const scoringNote = hasAutoGraded
        ? '✅ Listening + Reading auto-graded · 📋 Writing + Speaking self-assessed'
        : '📋 All sections self-assessed using rubric checklists';
      const cardsHtml = exams.map(exam => {
        const attempted = de && de.examId === exam.id && de.phase === 'results';
        const inProgress = de && de.examId === exam.id && de.phase !== 'results';
        return `<div class="delf-exam-card" style="border-top:3px solid ${meta.colour}">
          <div class="delf-exam-card-title">${escapeHtml(exam.title)}</div>
          <div class="delf-exam-card-desc">${escapeHtml(exam.desc)}</div>
          <div class="delf-exam-card-meta">⏱ ${escapeHtml(exam.totalDuration)} · 4 sections · 100 pts</div>
          <button class="delf-exam-start-btn" type="button" data-delf-exam="${escapeHtml(exam.id)}" style="background:${meta.colour}">
            ${inProgress ? 'Continue exam →' : attempted ? 'Retry exam →' : 'Start exam →'}
          </button>
        </div>`;
      }).join('');
      return `<div class="delf-level-group">
        <div class="delf-level-group-header" style="border-left:4px solid ${meta.colour}">
          <span class="delf-level-group-badge" style="background:${meta.colour}">${meta.icon} ${escapeHtml(level)}</span>
          <span class="delf-level-group-label">${escapeHtml(meta.label)}</span>
          <p class="delf-level-group-cando">${escapeHtml(meta.cando)}</p>
          <p class="delf-level-group-scoring">${scoringNote}</p>
        </div>
        <div class="delf-exam-cards">${cardsHtml}</div>
      </div>`;
    }).join('');

    const ttsNotice = `<div class="delf-tts-notice${ttsAvail ? '' : ' no-tts'}" style="margin-bottom:16px">
      ${ttsAvail
        ? `🔊 <strong>Audio note:</strong> Listening sections use your browser's text-to-speech engine. Real DELF exams use recorded audio. Results are still valid practice.`
        : `🔇 <strong>No French TTS voice detected.</strong> Listening transcripts will be shown as text when you start an exam. All other sections work normally.`}
    </div>`;

    return `<div class="delf-landing">
      <div class="delf-landing-info">
        <div class="delf-info-item">📝 4 sections per exam</div>
        <div class="delf-info-item">⏱ Timed conditions</div>
        <div class="delf-info-item">✅ Auto-graded Listening + Reading (A1/A2)</div>
        <div class="delf-info-item">🎯 50/100 to pass</div>
      </div>
      ${ttsNotice}
      ${levelsHtml}
    </div>`;
  }

  /* ── STORY MODE ───────────────────────────────────────────────────────────
     "Wrenfield Supplies" — a day on the accounts desk. Content in story-data.js,
     look in story-styles.css. Story mode takes over the viewport.

     The clock is the game. You start at 08:52 with a tray and you choose what to
     work on. Every item costs its minutes; every wrong answer costs rework on
     top, because you go back and check. A careful day finishes around four; a
     sloppy one has you still at your desk when Deirdre puts her coat on. The WR
     statement takes 90 minutes and has to be agreed before the 16:00 payment run,
     so it cannot be left to last.

     Nothing is ever locked. At 17:00 with work left you choose: stay late, or
     leave it for Wednesday. Leaving it costs the marks but you still see the
     answers at clock-off, so the teaching never depends on the clock.

     Story marks never enter Storage.data.stats — they cannot move the readiness
     meter, topic mastery or spaced repetition. This teaches the job; the question
     bank measures the exam. */

  function storyDef() { return window.AAT_STORY || null; }
  function storyDay(id) {
    const s = storyDef();
    return s ? ((s.days || []).find(d => d.id === id) || null) : null;
  }
  function storyModeDesc() {
    const s = storyDef();
    const day = s && (s.days || [])[0];
    if (!day) return '';
    const rec = ((Storage.data.story || {}).days || {})[day.id];
    const base = `${day.title} · a shift on the accounts desk`;
    return rec ? `${base} · best ${rec.best}/${rec.total || day.totalMarks}` : base;
  }
  function storyPerson(id) {
    const s = storyDef();
    return (s && (s.cast || []).find(c => c.id === id)) || { name: id || '', initials: '?', tone: 'n', role: '' };
  }
  function storyText(s) {
    return escapeHtml(String(s == null ? '' : s)).replace(/\*([^*]+)\*/g, '<em>$1</em>');
  }

  /* ── Clock ── */
  const stM = (t) => { const p = String(t || '0:00').split(':'); return (+p[0]) * 60 + (+p[1] || 0); };
  const stT = (m) => String(Math.floor(m / 60) % 24).padStart(2, '0') + ':' + String(Math.round(m) % 60).padStart(2, '0');
  function storyBeatsOf(day) { return day.beats || []; }
  function storyItems(day) { return storyBeatsOf(day).filter(b => b.kind === 'item'); }
  function storyItem(day, id) { return storyItems(day).find(b => b.id === id) || null; }

  /* The light in the room follows the clock: daylight in the morning, low and
     warm by four, and after five the overheads are off and it is your desk lamp
     and a blue window. One data attribute; the CSS does the rest. */
  function storyLight() {
    const S = State.story;
    if (!S) return 'morning';
    const day = storyDay(S.dayId);
    if (S.mins >= stM(day.close)) return 'after';
    if (S.mins >= stM('16:00')) return 'late';
    if (S.mins >= stM('11:30')) return 'day';
    return 'morning';
  }
  function renderStoryRoom() {
    return `<div class="sty-room" aria-hidden="true">
      <span class="sty-win"></span><span class="sty-key"></span><span class="sty-tint"></span>
      <span class="sty-prop sty-prop-plant"></span>
      <span class="sty-prop sty-prop-door"></span>
      <span class="sty-prop sty-prop-printer"></span>
      <span class="sty-prop sty-prop-mug"></span>
    </div>`;
  }

  /* ── Diegetic sound ──
     Synthesised, because the last game in this repo died of an asset pipeline.
     Everything here is an oscillator or a noise buffer through a filter. */
  let _stNoise = null;
  function stNoiseBuf(ctx) {
    if (_stNoise && _stNoise.sampleRate === ctx.sampleRate) return _stNoise;
    const n = ctx.sampleRate * 0.6;
    const buf = ctx.createBuffer(1, n, ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < n; i++) d[i] = Math.random() * 2 - 1;
    _stNoise = buf; _stNoise.sampleRate = ctx.sampleRate;
    return buf;
  }
  function stNoise(dur, freq, vol, type) {
    const ctx = ensureAudio(); if (!ctx) return;
    try {
      const src = ctx.createBufferSource(), f = ctx.createBiquadFilter(), g = ctx.createGain();
      src.buffer = stNoiseBuf(ctx);
      f.type = type || 'bandpass'; f.frequency.value = freq; f.Q.value = 0.9;
      src.connect(f); f.connect(g); g.connect(ctx.destination);
      g.gain.setValueAtTime(vol, ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.0008, ctx.currentTime + dur);
      src.start(); src.stop(ctx.currentTime + dur);
    } catch (e) {}
  }
  const sndPen    = () => { stNoise(0.09, 2600, 0.16, 'bandpass'); setTimeout(() => stNoise(0.07, 3200, 0.11, 'bandpass'), 70); };
  const sndPaper  = () => { stNoise(0.16, 1500, 0.13, 'highpass'); setTimeout(() => stNoise(0.12, 2200, 0.08, 'highpass'), 90); };
  const sndStamp  = () => { playTone(90, 'sine', 0.13, 0.32); stNoise(0.05, 900, 0.22, 'lowpass'); };
  const sndDrawer = () => { stNoise(0.22, 420, 0.14, 'lowpass'); };
  const sndPhone  = () => { [0, 420].forEach(d => { setTimeout(() => { playTone(420, 'sine', 0.32, 0.14); setTimeout(() => playTone(310, 'sine', 0.32, 0.14), 180); }, d); }); };
  const sndAlarm  = () => { for (let i = 0; i < 5; i++) setTimeout(() => playTone(i % 2 ? 780 : 1040, 'square', 0.16, 0.10), i * 180); };
  const sndTick   = () => playTone(1200, 'sine', 0.02, 0.05);
  const sndChime  = () => { playTone(660, 'sine', 0.14, 0.16); setTimeout(() => playTone(880, 'sine', 0.26, 0.14), 110); };

  /* ── Session ── */
  function startStory(dayId) {
    const day = storyDay(dayId);
    if (!day) { showToast('That day isn’t available.', 'warn'); return; }
    State.story = {
      dayId, phase: 'clockon', mins: stM(day.start),
      queue: [], scene: null, itemId: null,
      drafts: {}, marked: null, flags: {}, fired: {}, done: {}, results: [],
      overrun: false, lateAsked: false, stamp: null,
    };
    State.screen = 'story';
    playClick(); render();
  }
  function exitStory() {
    State.story = null; State.screen = 'home'; State.activeTab = 'home';
    document.body.classList.remove('story-mode');
    render();
  }
  function storyClockOn() {
    const S = State.story, day = storyDay(S.dayId);
    S.queue = storyBeatsOf(day).filter(b => b.kind === 'scene' && b.opening).slice();
    sndDrawer();
    storyPlayQueueOrTray();
  }

  /* Scenes waiting to fire: clock-triggered ones whose time has passed, and any
     keyed to the item just finished. */
  function storyPendingScenes(afterItemId) {
    const S = State.story, day = storyDay(S.dayId), out = [];
    storyBeatsOf(day).forEach((b, i) => {
      if (b.kind !== 'scene' || b.opening) return;
      const key = b.after || b.at || ('s' + i);
      if (S.fired[key]) return;
      if (b.after && b.after === afterItemId) { S.fired[key] = 1; out.push(b); return; }
      if (b.at && !b.after && S.mins >= stM(b.at)) { S.fired[key] = 1; out.push(b); }
    });
    return out;
  }
  function storyPlayQueueOrTray() {
    const S = State.story, day = storyDay(S.dayId);
    if (S.queue.length) {
      S.scene = S.queue.shift();
      S.phase = 'scene';
      if (/alarm|car park/i.test(S.scene.title || '')) sndAlarm();
      else if (/quick chat|calendar/i.test(S.scene.title || '')) sndChime();
      else sndPaper();
      window.scrollTo({ top: 0, behavior: 'instant' });
      render();
      return;
    }
    S.scene = null;
    // Lunch is not optional and not a decision.
    const lunch = day.lunch;
    if (lunch && !S.fired._lunch && S.mins >= stM(lunch.at)) {
      S.fired._lunch = 1;
      S.mins += lunch.mins;
    }
    const left = storyItems(day).filter(b => !S.done[b.id]);
    if (!left.length) { storyFinish(); return; }
    if (S.mins >= stM(day.close) && !S.lateAsked) { S.phase = 'late'; window.scrollTo({ top: 0, behavior: 'instant' }); render(); return; }
    S.phase = 'tray';
    window.scrollTo({ top: 0, behavior: 'instant' });
    render();
  }
  function storySceneDone() {
    const S = State.story;
    S.mins += (S.scene && S.scene.mins) || 0;
    playClick();
    storyPlayQueueOrTray();
  }
  function storyOpenItem(id) {
    const S = State.story;
    S.itemId = id; S.phase = 'item'; S.drafts = {}; S.marked = null; S.stamp = null;
    sndPaper();
    window.scrollTo({ top: 0, behavior: 'instant' });
    render();
  }
  /* At the close with work left: stay, or leave it for Wednesday. */
  function storyStayLate() {
    const S = State.story;
    S.lateAsked = true; S.overrun = true;
    playClick(); storyPlayQueueOrTray();
  }
  function storyLeaveIt() {
    const S = State.story, day = storyDay(S.dayId);
    S.lateAsked = true; S.overrun = true;
    storyItems(day).filter(b => !S.done[b.id]).forEach(b => {
      S.done[b.id] = true;
      S.results.push({ id: b.id, title: b.title, awarded: 0, max: b.marks, carried: true, topic: b.topic || null });
    });
    playClick(); storyFinish();
  }
  function storyFinish() {
    const S = State.story, day = storyDay(S.dayId);
    const awarded = S.results.reduce((t, r) => t + r.awarded, 0);
    const total = S.results.reduce((t, r) => t + r.max, 0) || day.totalMarks;
    if (S.mins > stM(day.close)) S.overrun = true;   // finished everything, just not on time
    S.phase = 'outro';
    const store = Storage.data.story || (Storage.data.story = { v: 1, days: {} });
    const prev = store.days[S.dayId] || { best: 0 };
    store.days[S.dayId] = {
      best: Math.max(prev.best || 0, awarded), last: awarded, total,
      finishedAt: stT(S.mins), at: Date.now(),
    };
    Storage.addXp(20);
    Storage.save();
    sndChime();
    window.scrollTo({ top: 0, behavior: 'instant' });
    render();
  }

  /* ── Marking ── */
  function storyResolve(beat) {
    if (!beat || !beat.variants) return beat;
    const cases = beat.variants.cases || {};
    const chosen = cases[State.story.flags[beat.variants.on]] || cases[Object.keys(cases)[0]] || {};
    const out = Object.assign({}, beat, chosen);
    if (chosen.docsExtra) out.docs = (beat.docs || []).concat(chosen.docsExtra);
    return out;
  }
  function storyActiveItem() {
    const S = State.story, day = storyDay(S.dayId);
    const raw = storyItem(day, S.itemId);
    return raw ? storyResolve(raw) : null;
  }
  function storyStepMark(step, idx) {
    const S = State.story;
    const get = (k) => S.drafts['s' + idx + ':' + k];
    const max = Number(step.marks) || 0;
    if (step.type === 'flags' || step.type === 'hotspot') {
      const opts = step.type === 'flags' ? (step.options || []) : (step.targets || []);
      const need = opts.filter(o => o.ok).length || 1;
      let right = 0, wrong = 0;
      opts.forEach(o => { if (get(o.id)) { if (o.ok) right++; else wrong++; } });
      const net = Math.max(0, right - wrong);
      return { awarded: Math.round(max * net / need), max, ok: net === need && !wrong, wrong };
    }
    if (step.type === 'choice') {
      const opt = (step.options || []).find(o => o.id === get('pick'));
      return { awarded: opt && opt.ok ? max : 0, max, ok: !!(opt && opt.ok), wrong: opt && opt.ok ? 0 : 1 };
    }
    if (step.type === 'figures') {
      const fields = step.fields || [];
      let right = 0;
      const per = fields.map(f => {
        const v = parseNumericInput(get(f.id));
        const ok = Number.isFinite(v) && Math.abs(v - Number(f.answer)) < 0.005;
        if (ok) right++;
        return { id: f.id, ok, expected: f.answer };
      });
      return { awarded: fields.length ? Math.round(max * right / fields.length) : 0, max,
               ok: right === fields.length, per, wrong: fields.length - right };
    }
    if (step.type === 'written') {
      const rubric = step.rubric || [];
      const awarded = rubric.reduce((t, r, i) => t + (get('r' + i) ? (Number(r.marks) || 0) : 0), 0);
      return { awarded, max, ok: awarded >= max * 0.7, selfAssessed: true, wrong: 0 };
    }
    return { awarded: 0, max, ok: false, wrong: 0 };
  }

  function storySubmit() {
    const S = State.story, day = storyDay(S.dayId);
    const beat = storyActiveItem();
    if (!beat || S.marked) return;
    const steps = beat.steps || [];
    for (let i = 0; i < steps.length; i++) {
      if (steps[i].type === 'written' && !S.drafts['s' + i + ':revealed']) {
        showToast('Write your reply, then reveal the model answer to mark it.', 'warn');
        return;
      }
    }
    const per = steps.map((st, i) => storyStepMark(st, i));
    const awarded = per.reduce((t, r) => t + r.awarded, 0);
    const max = per.reduce((t, r) => t + r.max, 0);
    const wrong = per.reduce((t, r) => t + (r.wrong || 0), 0);
    const rework = wrong * (day.rework || 0);

    let bucketKey = null;
    steps.forEach((st, i) => {
      if (st.setFlag) {
        const v = S.drafts['s' + i + ':pick'];
        if (v) { S.flags[st.setFlag] = v; bucketKey = v; }
      }
    });
    if (beat.outcomeFrom) bucketKey = S.flags[beat.outcomeFrom] || bucketKey;
    const passed = max ? awarded >= max * 0.7 : true;
    S.flags[beat.id + '.pass'] = passed;

    let bucket = null;
    if (beat.bucket) bucket = beat.bucket;
    else if (beat.buckets) bucket = beat.buckets[bucketKey] || beat.buckets[passed ? 'pass' : 'fail'] || null;

    /* Late on a deadline is a story consequence, not a mark penalty. */
    const lateFor = beat.before && S.mins + beat.mins > stM(beat.before) ? beat.before : null;

    S.marked = { per, awarded, max, bucket, wrong, rework,
                 selfAssessed: per.some(r => r.selfAssessed), lateFor };
    S.results.push({ id: beat.id, title: beat.title, awarded, max,
                     selfAssessed: per.some(r => r.selfAssessed), topic: beat.topic || null, lateFor });
    S.stamp = bucketKey === 'queried' ? 'QUERIED' : passed ? 'POSTED' : 'CHECK AGAIN';
    sndStamp();
    if (passed) setTimeout(playCorrect, 180); else setTimeout(playWrong, 180);
    render();
  }
  function storyCloseItem() {
    const S = State.story, day = storyDay(S.dayId);
    const beat = storyActiveItem();
    S.done[beat.id] = true;
    S.mins += (beat.mins || 0) + (S.marked ? S.marked.rework : 0);
    const pend = storyPendingScenes(beat.id);
    S.queue = pend;
    S.itemId = null; S.marked = null; S.drafts = {}; S.stamp = null;
    storyPlayQueueOrTray();
  }
  function storyRevealWritten(idx) {
    const S = State.story;
    const step = (storyActiveItem().steps || [])[idx];
    const text = String(S.drafts['s' + idx + ':text'] || '').trim();
    const words = text ? text.split(/\s+/).length : 0;
    if (words < Math.min(20, step.minWords || 20)) {
      showToast('Write an answer before revealing the model — you learn nothing from reading it cold.', 'warn');
      return;
    }
    S.drafts['s' + idx + ':revealed'] = true;
    playClick(); render();
  }

  /* ── Hotspots ── */
  function storyHotCtx(beat) {
    const steps = (beat && beat.steps) || [];
    for (let i = 0; i < steps.length; i++) {
      if (steps[i].type === 'hotspot') return { stepIdx: i, docIdx: steps[i].doc == null ? 0 : steps[i].doc, step: steps[i] };
    }
    return null;
  }
  function storyPensUsed(ctx) {
    return (ctx.step.targets || []).filter(t => State.story.drafts['s' + ctx.stepIdx + ':' + t.id]).length;
  }
  function storyHotClass(id, ctx) {
    const S = State.story;
    const on = !!S.drafts['s' + ctx.stepIdx + ':' + id];
    if (!S.marked) return on ? 'is-on' : '';
    const t = (ctx.step.targets || []).find(x => x.id === id);
    if (t && t.ok) return on ? 'is-on is-hit' : 'is-on is-miss';
    return on ? 'is-on is-false' : '';
  }
  function storyHotMark(id, ctx) {
    const S = State.story;
    if (!S.marked) return '';
    const on = !!S.drafts['s' + ctx.stepIdx + ':' + id];
    const t = (ctx.step.targets || []).find(x => x.id === id);
    if (t && t.ok) return on ? '✓' : '!';
    return on ? '✗' : '';
  }
  function storyHot(text, id, ctx) {
    const safe = escapeHtml(String(text == null ? '' : text));
    if (!id || !ctx) return safe;
    const S = State.story;
    const on = !!S.drafts['s' + ctx.stepIdx + ':' + id];
    const mark = storyHotMark(id, ctx);
    return `<button type="button" class="sty-hot ${storyHotClass(id, ctx)}"
      data-sty-hot="${ctx.stepIdx}:${escapeHtml(id)}" aria-pressed="${on}"
      ${S.marked ? 'disabled' : ''}>${safe}<span class="sty-ring"></span>${mark ? `<span class="sty-mark">${mark}</span>` : ''}</button>`;
  }

  /* ── Rendering ── */
  function renderStoryPaper(d, ctx, surface) {
    /* On the monitor these are things in software, not paper. Rendering an email
       on a creased sheet was the tell that this was still a styled document. */
    if (surface === 'screen') {
      if (d.kind === 'email') {
        const p = storyPerson(d.from);
        return `<article class="sty-mail">
          <div class="sty-mail-h">
            <span class="sty-av sty-av-${escapeHtml(p.tone)}">${escapeHtml(p.initials)}</span>
            <div class="sty-mail-meta">
              <div class="sty-mail-sub">${escapeHtml(d.subject || '')}</div>
              <div class="sty-mail-from">${escapeHtml(p.name)} · ${escapeHtml(p.role)}</div>
            </div>
            <span class="sty-mail-at">${escapeHtml(d.at || '')}</span>
          </div>
          <div class="sty-mail-b">${storyText(d.body).replace(/\n/g, '<br>')}</div>
          ${d.attach ? `<div class="sty-mail-att">📎 ${escapeHtml(d.attach).replace(/\n/g, '<br>📎 ')}</div>` : ''}
        </article>`;
      }
      if (d.kind === 'panel') {
        return `<article class="sty-scr-panel">
          <div class="sty-scr-panel-h">${escapeHtml(d.title || '')}</div>
          <table class="sty-scr-t">${(d.rows || []).map(r => `<tr class="${r.total ? 'is-total' : ''}">
            <td>${escapeHtml(r.label)}</td>
            <td class="sty-amt ${r.bad ? 'is-bad' : ''}">${escapeHtml(r.amount || '')}</td></tr>`).join('')}</table>
        </article>`;
      }
      if (d.kind === 'photo') {
        return `<article class="sty-scr-photo">
          <div class="sty-scr-photo-h">IMG_4471.JPG · 2.1 MB</div>
          <div class="sty-scr-photo-b"><span aria-hidden="true">📷</span><p>${escapeHtml(d.caption || '')}</p></div>
        </article>`;
      }
      /* A ledger or statement shown in the software keeps a plain grid. */
      const foot0 = Array.isArray(d.foot) ? d.foot
        : (d.foot ? String(d.foot).split('\n').map(t => ({ text: t })) : []);
      return `<article class="sty-scr-panel">
        <div class="sty-scr-panel-h">${escapeHtml(d.title || '')}${d.sub ? ` — ${escapeHtml(d.sub)}` : ''}
          <span class="sty-scr-ref">${escapeHtml(d.ref || '')}</span></div>
        <table class="sty-scr-t">${(d.rows || []).map(r => `<tr class="${r.total ? 'is-total' : ''} ${r.muted ? 'is-muted' : ''}">
          <td>${storyHot(r.label, r.hot, ctx)}</td>
          <td class="sty-amt">${r.amount == null ? '' : storyHot(r.amount, r.hotAmt, ctx)}</td></tr>`).join('')}</table>
        ${foot0.length ? `<div class="sty-scr-foot">${foot0.map(f => `<div>${storyHot(f.text, f.hot, ctx)}</div>`).join('')}</div>` : ''}
      </article>`;
    }
    if (d.kind === 'email') {
      const p = storyPerson(d.from);
      return `<article class="sty-paper sty-paper-alt">
        <div class="sty-paper-head">
          <div><div class="sty-paper-name">${escapeHtml(d.subject || '')}</div>
            <div class="sty-paper-sub">from ${escapeHtml(p.name)}</div></div>
          <div class="sty-paper-ref">${escapeHtml(d.at || '')}</div>
        </div>
        <div>${storyText(d.body).replace(/\n/g, '<br>')}</div>
        ${d.attach ? `<div class="sty-paper-foot">${escapeHtml(d.attach).replace(/\n/g, '<br>')}</div>` : ''}
      </article>`;
    }
    if (d.kind === 'photo') {
      return `<article class="sty-paper sty-paper-alt" style="--tilt:1.2deg">
        <div class="sty-paper-head"><div class="sty-paper-name">📷 IMG_4471.JPG</div></div>
        <div style="filter:blur(.5px);opacity:.85">${escapeHtml(d.caption || '')}</div>
      </article>`;
    }
    if (d.kind === 'panel') {
      return `<article class="sty-paper sty-paper-alt">
        <div class="sty-paper-head"><div class="sty-paper-name">${escapeHtml(d.title || '')}</div></div>
        <table class="sty-paper-t">${(d.rows || []).map(r => `<tr class="${r.total ? 'is-total' : ''}">
          <td>${escapeHtml(r.label)}</td><td class="sty-amt">${escapeHtml(r.amount || '')}</td></tr>`).join('')}</table>
      </article>`;
    }
    const foot = Array.isArray(d.foot) ? d.foot
      : (d.foot ? String(d.foot).split('\n').map(t => ({ text: t })) : []);
    return `<article class="sty-paper">
      ${d.clip ? '<span class="sty-clip"></span>' : ''}
      <div class="sty-paper-head">
        <div><div class="sty-paper-name">${escapeHtml(d.title || '')}</div>
          ${d.sub ? `<div class="sty-paper-sub">${escapeHtml(d.sub)}</div>` : ''}</div>
        <div class="sty-paper-ref">${escapeHtml(d.ref || '')}${d.date ? `<br>${escapeHtml(d.date)}` : ''}</div>
      </div>
      <table class="sty-paper-t">${(d.rows || []).map(r => `<tr class="${r.total ? 'is-total' : ''} ${r.muted ? 'is-muted' : ''}">
        <td>${storyHot(r.label, r.hot, ctx)}</td>
        <td class="sty-amt">${r.amount == null ? '' : storyHot(r.amount, r.hotAmt, ctx)}</td></tr>`).join('')}</table>
      ${foot.length ? `<div class="sty-paper-foot">${foot.map(f => `<div>${storyHot(f.text, f.hot, ctx)}</div>`).join('')}</div>` : ''}
    </article>`;
  }

  function renderStoryLines(lines) {
    return (lines || []).map(l => {
      if (!l.who) return `<p class="sty-dir">${storyText(l.dir || l.text || '')}</p>`;
      const p = storyPerson(l.who);
      return `<div class="sty-line">
        <span class="sty-av sty-av-${escapeHtml(p.tone)}">${escapeHtml(p.initials)}</span>
        <div class="sty-said">
          <div class="sty-name">${escapeHtml(p.name)}${l.dir ? ` <span class="sty-name-dir">${escapeHtml(l.dir)}</span>` : ''}</div>
          <p class="sty-speech">${storyText(l.text || '')}</p>
        </div>
      </div>`;
    }).join('');
  }
  function storyLinesForScore(lines, pct) {
    return (lines || []).filter(l =>
      (l.minPct == null || pct >= l.minPct) && (l.maxPct == null || pct <= l.maxPct));
  }

  function renderStoryStep(step, i) {
    const S = State.story;
    const marked = S.marked;
    const res = marked ? marked.per[i] : null;
    const val = (k) => S.drafts['s' + i + ':' + k];
    let body = '';

    if (step.type === 'hotspot') {
      const targets = step.targets || [];
      const ctx = { stepIdx: i, step };
      const used = storyPensUsed(ctx);
      const pens = step.pens || targets.filter(t => t.ok).length;
      if (!marked) {
        body = `<div class="sty-pens" role="status">
          ${Array.from({ length: pens }, (_, n) => `<span class="sty-pen ${n < used ? 'spent' : ''}"></span>`).join('')}
          <span class="sty-pen-note">${used} of ${pens} circles used</span>
        </div>
        ${step.penNote ? `<p class="sty-note">${storyText(step.penNote)}</p>` : ''}`;
      } else {
        body = `<div class="sty-opts">${targets.map(t => {
          const on = !!val(t.id);
          if (!on && !t.ok) return '';
          const cls = t.ok && on ? 'is-right' : 'is-wrong';
          const tag = t.ok ? (on ? '✓ found' : '! missed') : '✗ nothing wrong with it';
          return `<div class="sty-opt ${cls}"><span>${escapeHtml(t.label)}</span><span class="sty-tick">${tag}</span></div>`;
        }).join('')}</div>`;
      }
    } else if (step.type === 'flags' || step.type === 'choice') {
      const isFlags = step.type === 'flags';
      body = `<div class="sty-opts">${(step.options || []).map(o => {
        const on = isFlags ? !!val(o.id) : val('pick') === o.id;
        let cls = '';
        if (marked) cls = o.ok ? 'is-right' : (on ? 'is-wrong' : '');
        return `<label class="sty-opt ${on ? 'is-on' : ''} ${cls}">
          <input type="${isFlags ? 'checkbox' : 'radio'}" ${isFlags ? '' : `name="sty-c-${i}"`}
            data-sty-${isFlags ? 'flag' : 'pick'}="${i}:${escapeHtml(o.id)}" ${on ? 'checked' : ''} ${marked ? 'disabled' : ''}>
          <span>${escapeHtml(o.label)}</span>${marked && o.ok ? '<span class="sty-tick">✓</span>' : ''}</label>`;
      }).join('')}</div>`;
    } else if (step.type === 'figures') {
      body = `<div class="sty-fields">${(step.fields || []).map(f => {
        const r = res && res.per ? res.per.find(x => x.id === f.id) : null;
        return `<label class="sty-field ${r ? (r.ok ? 'is-right' : 'is-wrong') : ''}">
          <span class="sty-field-lbl">${escapeHtml(f.label)}</span>
          <span class="sty-field-in"><span class="sty-cur">£</span>
            <input type="text" inputmode="decimal" autocomplete="off" placeholder="0.00"
              data-sty-fig="${i}:${escapeHtml(f.id)}" value="${escapeHtml(val(f.id) || '')}" ${marked ? 'disabled' : ''}></span>
          ${r && !r.ok ? `<span class="sty-fix">✓ ${Number(f.answer).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>` : ''}
        </label>`;
      }).join('')}</div>`;
    } else if (step.type === 'written') {
      const text = val('text') || '';
      const words = text.trim() ? text.trim().split(/\s+/).length : 0;
      body = `<textarea class="sty-textarea" data-sty-text="${i}" rows="9" placeholder="${escapeHtml(step.placeholder || '')}" ${marked ? 'disabled' : ''}>${escapeHtml(text)}</textarea>
        <div class="sty-wordcount" data-min="${step.minWords || 0}">${words} word${words === 1 ? '' : 's'}${step.minWords ? ` · aim for ${step.minWords}+` : ''}</div>`;
      if (!val('revealed')) {
        body += `<button class="sty-btn sty-btn-ghost" type="button" data-sty-reveal="${i}" style="margin-top:0">Compare with a full-mark reply</button>`;
      } else {
        body += `<div class="sty-model">
            <div class="sty-model-h">What a full-mark reply looks like</div>
            <div class="sty-model-b">${escapeHtml(step.modelAnswer || '').replace(/\n/g, '<br>')}</div></div>
          <div class="sty-rubric">
            <div class="sty-rubric-h">Tick each point your reply actually made</div>
            ${(step.rubric || []).map((r, ri) => {
              const on = !!val('r' + ri);
              return `<label class="sty-opt ${on ? 'is-on' : ''}">
                <input type="checkbox" data-sty-rub="${i}:${ri}" ${on ? 'checked' : ''} ${marked ? 'disabled' : ''}>
                <span>${escapeHtml(r.point)}</span></label>`;
            }).join('')}
            <div class="sty-selfnote">You are marking your own work. These marks are recorded separately and never count towards your readiness score.</div>
          </div>`;
      }
    }
    return `<div class="sty-step">
      <div class="sty-step-h"><span class="sty-ask">${storyText(step.prompt || '')}</span></div>
      ${step.help ? `<p class="sty-note">${storyText(step.help)}</p>` : ''}
      ${body}
    </div>`;
  }

  function renderStoryItem(beat) {
    const S = State.story;
    const m = S.marked;
    const ctx = storyHotCtx(beat);
    const hotDoc = ctx ? ctx.docIdx : -1;
    const medium = beat.medium || 'paper';
    const docs = beat.docs || [];
    /* A document sits where it would really be: the invoice that came in the
       post is paper whatever else the item is doing. */
    const paperDocs = docs.filter(d => (d.on || medium) === 'paper');
    const screenDocs = docs.filter(d => (d.on || medium) !== 'paper');

    const paperHtml = paperDocs.length ? `<div class="sty-desk-scene">
      <div class="sty-papers">${paperDocs.map(d =>
        renderStoryPaper(d, docs.indexOf(d) === hotDoc ? ctx : null, 'paper')).join('')}</div></div>` : '';
    const screenDocsHtml = screenDocs.length ? `<div class="sty-papers">${screenDocs.map(d =>
      renderStoryPaper(d, docs.indexOf(d) === hotDoc ? ctx : null, 'screen')).join('')}</div>` : '';

    const work = `${(beat.steps || []).length ? `<div class="sty-steps">${(beat.steps || []).map(renderStoryStep).join('')}</div>` : ''}
      ${!m ? `<button class="sty-btn" type="button" id="stySubmitBtn">File it</button>` : `
        ${S.stamp ? `<div class="sty-stamp sty-stamp-${m.awarded >= m.max * 0.7 ? 'ok' : 'bad'}">${escapeHtml(S.stamp)}</div>` : ''}
        <div class="sty-cost">
          <span class="sty-cost-l">That took</span><b>${beat.mins} min</b>
          ${m.rework ? `<span class="sty-cost-extra">+ ${m.rework} min going back over it</span>` : '<span class="sty-cost-clean">nothing to redo</span>'}
          <span class="sty-cost-l">&rarr; ${stT(S.mins + beat.mins + m.rework)}</span>
        </div>
        ${m.lateFor ? `<div class="sty-late-warn">You finished this after ${escapeHtml(m.lateFor)}. The payment run has already gone.</div>` : ''}
        ${beat.why ? `<div class="sty-verdict"><p>${storyText(beat.why)}</p></div>` : ''}
        ${m.bucket ? renderStoryReaction(m.bucket) : ''}
        <button class="sty-btn" type="button" id="styNextBtn">Back to the tray</button>`}`;

    const stageNote = `<p class="sty-stage-note">${storyText(beat.stage || '')}</p>
      ${ctx && !m ? `<div class="sty-hint">🖊️ <span><b>Circle what is wrong on the invoice itself.</b> Nothing is listed for you.</span></div>` : ''}`;

    if (medium === 'paper') {
      return `<div>${stageNote}${paperHtml}${screenDocsHtml}${work}</div>`;
    }
    /* Screen items put the software on the monitor. Paper that belongs to the
       same job stays on the desk in front of it — which is exactly what agreeing
       a supplier statement looks like. */
    return `<div>
      ${stageNote}
      ${paperHtml}
      ${paperHtml ? '<p class="sty-onscreen-note">…and on the screen</p>' : ''}
      <div class="sty-monitor">
        <div class="sty-mon-body">
          <div class="sty-screen">
            <div class="sty-appbar">
              <span class="sty-appdot"></span><span class="sty-appdot"></span><span class="sty-appdot"></span>
              <span class="sty-apptitle">Wrenfield Accounts</span>
              <span class="sty-appclock">${stT(State.story.mins)}</span>
            </div>
            <div class="sty-screen-in">${screenDocsHtml}${work}</div>
          </div>
        </div>
        <div class="sty-mon-stand"></div><div class="sty-mon-foot"></div>
      </div>
    </div>`;
  }

  function renderStoryReaction(b) {
    const p = storyPerson(b.who);
    return `<div class="sty-react">
      ${b.who ? `<div class="sty-line">
        <span class="sty-av sty-av-${escapeHtml(p.tone)}">${escapeHtml(p.initials)}</span>
        <div class="sty-said"><div class="sty-name">${escapeHtml(p.name)}</div>
        <p class="sty-speech">${storyText(b.text || '')}</p></div></div>`
      : `<p class="sty-speech">${storyText(b.text || '')}</p>`}
      ${b.dir ? `<p class="sty-dir">${storyText(b.dir)}</p>` : ''}
    </div>`;
  }

  function renderStoryHud() {
    const S = State.story, day = storyDay(S.dayId);
    const open = stM(day.start), close = stM(day.close);
    const pct = Math.max(0, Math.min(100, ((S.mins - open) / (close - open)) * 100));
    const left = storyItems(day).filter(b => !S.done[b.id]).length;
    return `<div class="sty-hud">
      <div class="sty-hud-left">
        <button class="sty-leave" id="styExitBtn" type="button" aria-label="Leave the office">✕</button>
        <span class="sty-hud-when">
          <span class="sty-hud-day">${escapeHtml(day.title)}</span>
          <span class="sty-clock ${S.mins >= close ? 'is-late' : ''}">${stT(S.mins)}</span>
        </span>
      </div>
      <div class="sty-timeline"><div class="sty-timeline-fill" style="width:${pct}%"></div>
        <span class="sty-timeline-close" style="left:100%"></span></div>
      <div class="sty-hud-marks"><b>${left}</b><span>in the tray</span></div>
    </div>`;
  }

  function renderStoryClockOn() {
    const day = storyDay(State.story.dayId);
    const s = storyDef();
    const items = storyItems(day);
    const rec = ((Storage.data.story || {}).days || {})[day.id];
    return `<div class="sty-stage sty-stage-title" data-light="morning">
      ${renderStoryRoom()}
      <div class="sty-inner">
        <div class="sty-titlecard">
          <div class="sty-slug">${escapeHtml(s.business.trade)} · ${escapeHtml(s.business.name)}</div>
          <h1 class="sty-bigtitle">${escapeHtml(day.title)}</h1>
          <p class="sty-subtitle">${escapeHtml(day.subtitle)} — ${escapeHtml(day.summary)}</p>
          <div class="sty-facts">
            <div><b>${escapeHtml(day.start)}</b><span>you sit down</span></div>
            <div><b>${escapeHtml(day.close)}</b><span>the office empties</span></div>
            <div><b>${items.length}</b><span>things in the tray</span></div>
          </div>
          <p class="sty-rules">You choose what to work on and in what order. Everything takes time, and going back over your own mistakes takes more. The WR statement has to be agreed before the payment run at 16:00, and it is not a quick one.</p>
          <div class="sty-crew">${(s.cast || []).filter(c => c.id !== 'you').map(c =>
            `<span class="sty-crew-m"><span class="sty-av sty-av-${escapeHtml(c.tone)}">${escapeHtml(c.initials)}</span>
             <span class="sty-crew-n">${escapeHtml(c.name.split(' ')[0])}</span></span>`).join('')}</div>
          ${rec ? `<p class="sty-prev">Best so far: ${rec.best}/${rec.total}${rec.finishedAt ? ` · finished ${escapeHtml(rec.finishedAt)}` : ''}</p>` : ''}
          <button class="sty-btn" type="button" id="styClockOnBtn">Clock on</button>
          <button class="sty-btn sty-btn-ghost" type="button" id="styExitBtn">Not today</button>
        </div>
      </div>
    </div>`;
  }

  function renderStoryTray() {
    const S = State.story, day = storyDay(S.dayId);
    const close = stM(day.close);
    const items = storyItems(day);
    const left = items.filter(b => !S.done[b.id]);
    return `<div class="sty-stage" data-light="${storyLight()}">
      ${renderStoryRoom()}
      ${renderStoryHud()}
      <div class="sty-inner">
        <div class="sty-beat">
          <div class="sty-slug">The in-tray</div>
          <h2 class="sty-title">What are you doing next?</h2>
          <p class="sty-stage-note">${left.length} left. It is ${stT(S.mins)} and the office empties at ${escapeHtml(day.close)}.</p>
          <div class="sty-tray">${left.map(b => {
            const wouldEnd = S.mins + b.mins;
            const missesDeadline = b.before && wouldEnd > stM(b.before);
            const runsLate = wouldEnd > close;
            return `<button class="sty-trayitem ${missesDeadline ? 'is-risky' : ''}" type="button" data-sty-open="${escapeHtml(b.id)}">
              <span class="sty-trayitem-main">
                <span class="sty-trayitem-t">${escapeHtml(b.title)}</span>
                <span class="sty-trayitem-d">${escapeHtml(b.tray || '')}</span>
              </span>
              <span class="sty-trayitem-meta">
                <span class="sty-trayitem-mins">${b.mins} min</span>
                ${b.before ? `<span class="sty-trayitem-due ${missesDeadline ? 'blown' : ''}">due ${escapeHtml(b.before)}</span>` : ''}
                ${runsLate && !missesDeadline ? '<span class="sty-trayitem-due">past 17:00</span>' : ''}
              </span>
            </button>`;
          }).join('')}</div>
          ${S.done && Object.keys(S.done).length ? `<div class="sty-donelist">
            <div class="sty-slug">Cleared</div>
            ${items.filter(b => S.done[b.id]).map(b => `<div class="sty-doneitem">✓ ${escapeHtml(b.title)}</div>`).join('')}
          </div>` : ''}
        </div>
      </div>
    </div>`;
  }

  function renderStoryLate() {
    const S = State.story, day = storyDay(S.dayId);
    const left = storyItems(day).filter(b => !S.done[b.id]);
    return `<div class="sty-stage" data-light="${storyLight()}">
      ${renderStoryRoom()}
      ${renderStoryHud()}
      <div class="sty-inner">
        <div class="sty-beat">
          <div class="sty-slug">${escapeHtml(day.close)}</div>
          <h2 class="sty-title">The office is emptying</h2>
          <div class="sty-script">
            <p class="sty-dir">Deirdre’s computer has been off for ten minutes. Karen is doing the lights at the far end, one bank at a time, in a way that is not subtle.</p>
            ${renderStoryLines([{ who: 'nigel', dir: 'coat on, bag over shoulder', text: 'You’re not still — right. Well. Don’t make a habit of it. It’ll all still be here tomorrow, that’s the thing about it.' }])}
          </div>
          <p class="sty-stage-note">Still in the tray: ${left.map(b => escapeHtml(b.title)).join(', ')}.</p>
          <div class="sty-outro-actions">
            <button class="sty-btn" type="button" id="styStayBtn">Stay and finish it</button>
            <button class="sty-btn sty-btn-ghost" type="button" id="styLeaveBtn">Leave it for Wednesday</button>
          </div>
          <p class="sty-footnote">Leaving it costs the marks for what is left, but you will still see the answers at clock-off. Nothing is ever hidden behind the clock.</p>
        </div>
      </div>
    </div>`;
  }

  function renderStoryOutro() {
    const S = State.story, day = storyDay(S.dayId);
    const awarded = S.results.reduce((t, r) => t + r.awarded, 0);
    const total = S.results.reduce((t, r) => t + r.max, 0);
    const pct = total ? Math.round(awarded / total * 100) : 0;
    const order = storyItems(day).map(b => b.id);
    const results = S.results.slice().sort((a, b) => order.indexOf(a.id) - order.indexOf(b.id));
    const weak = results.filter(r => r.max && !r.carried).sort((a, b) => (a.awarded / a.max) - (b.awarded / b.max))[0];
    const carry = ((day.outro && day.outro.carry) || []).filter(c => !c.ifFlag || S.flags[c.ifFlag]);
    const cls = (r) => r.carried ? 'none' : r.awarded === r.max ? 'full' : r.awarded ? 'part' : 'none';
    return `<div class="sty-stage" data-light="${storyLight()}">
      ${renderStoryRoom()}
      ${renderStoryHud()}
      <div class="sty-inner">
        <div class="sty-outro">
          <div class="sty-slug">You left at ${stT(S.mins)}</div>
          <div class="sty-outro-score">${awarded}<small>/ ${total}</small></div>
          ${S.overrun ? '<p class="sty-overrun">You were still here after five.</p>' : ''}
          <div class="sty-script" style="margin-top:24px">${renderStoryLines(storyLinesForScore(day.outro && day.outro.lines, pct))}</div>
          <div class="sty-slug" style="margin-top:26px">How the day marked up</div>
          <div class="sty-tally">
            ${results.map(r => `<div class="sty-tally-row">
              <span class="sty-tally-t">${escapeHtml(r.title)}</span>
              ${r.carried ? '<span class="sty-chip">not reached</span>' : ''}
              ${r.selfAssessed ? '<span class="sty-chip">self-marked</span>' : ''}
              ${r.lateFor ? '<span class="sty-chip">late</span>' : ''}
              <span class="sty-tally-m ${cls(r)}">${r.awarded}/${r.max}</span>
            </div>`).join('')}
          </div>
          ${weak && weak.awarded < weak.max ? `<div class="sty-panel">
            <div class="sty-slug">Worth revising</div>
            <p>“${escapeHtml(weak.title)}” cost you ${weak.max - weak.awarded} mark${weak.max - weak.awarded === 1 ? '' : 's'}. The question bank drills it properly.</p>
            <button class="sty-btn sty-btn-ghost" type="button" data-topic="${escapeHtml(weak.topic || 'all')}" style="margin-top:0">Practise ${escapeHtml(weak.topic === 'besy' ? 'Business Environment' : 'Bookkeeping')}</button>
          </div>` : ''}
          ${carry.length ? `<div class="sty-panel">
            <div class="sty-slug">Hanging over you</div>
            ${carry.map(c => `<div class="sty-carry-row"><span class="sty-when">${escapeHtml(c.when)}</span><span>${storyText(c.text)}</span></div>`).join('')}
          </div>` : ''}
          <div class="sty-outro-actions">
            <button class="sty-btn" type="button" id="styReplayBtn">Another go at Tuesday</button>
            <button class="sty-btn sty-btn-ghost" type="button" id="styExitBtn2">Clock off</button>
          </div>
          <p class="sty-footnote">Story marks are recorded separately and deliberately do not affect your readiness score, topic mastery or spaced repetition. This is the job; the question bank is the exam.</p>
        </div>
      </div>
    </div>`;
  }

  function renderStory() {
    const S = State.story;
    if (!S) { State.screen = 'home'; return ''; }
    const day = storyDay(S.dayId);
    if (!day) { State.screen = 'home'; State.story = null; return ''; }
    if (S.phase === 'clockon') return renderStoryClockOn();
    if (S.phase === 'outro')   return renderStoryOutro();
    if (S.phase === 'late')    return renderStoryLate();
    if (S.phase === 'tray')    return renderStoryTray();
    if (S.phase === 'scene') {
      const sc = storyResolve(S.scene);
      return `<div class="sty-stage" data-light="${storyLight()}">
        ${renderStoryRoom()}
        ${renderStoryHud()}
        <div class="sty-inner"><div class="sty-beat">
          <div class="sty-slug">The office${sc.mins ? ` · ${sc.mins} min` : ''}</div>
          <h2 class="sty-title">${escapeHtml(sc.title || '')}</h2>
          <div class="sty-script">${renderStoryLines(sc.lines)}</div>
          <button class="sty-btn" type="button" id="stySceneBtn">Back to it</button>
        </div></div></div>`;
    }
    const beat = storyActiveItem();
    if (!beat) { S.phase = 'tray'; return renderStoryTray(); }
    return `<div class="sty-stage" data-light="${storyLight()}">
      ${renderStoryRoom()}
      ${renderStoryHud()}
      <div class="sty-inner"><div class="sty-beat">
        <div class="sty-slug">In the tray · ${beat.mins} min</div>
        <h2 class="sty-title">${escapeHtml(beat.title || '')}</h2>
        ${renderStoryItem(beat)}
      </div></div></div>`;
  }

  function attachStoryEvents() {
    document.body.classList.toggle('story-mode', State.screen === 'story' && !!State.story);
    if (State.screen !== 'story' || !State.story) return;
    const S = State.story;
    bind('styExitBtn', 'click', exitStory);
    bind('styExitBtn2', 'click', exitStory);
    bind('styClockOnBtn', 'click', storyClockOn);
    bind('stySceneBtn', 'click', storySceneDone);
    bind('stySubmitBtn', 'click', storySubmit);
    bind('styNextBtn', 'click', storyCloseItem);
    bind('styStayBtn', 'click', storyStayLate);
    bind('styLeaveBtn', 'click', storyLeaveIt);
    bind('styReplayBtn', 'click', () => startStory(S.dayId));
    document.querySelectorAll('[data-sty-open]').forEach(el =>
      el.addEventListener('click', () => storyOpenItem(el.dataset.styOpen)));

    /* Circling the document. Re-renders so the ring lands — safe because a
       hotspot step holds no text inputs. The pen is finite. */
    document.querySelectorAll('[data-sty-hot]').forEach(el => el.addEventListener('click', () => {
      const [i, id] = el.dataset.styHot.split(':');
      const beat = storyActiveItem();
      const ctx = storyHotCtx(beat);
      const k = 's' + i + ':' + id;
      const pens = ctx.step.pens || (ctx.step.targets || []).filter(t => t.ok).length;
      if (!S.drafts[k] && storyPensUsed(ctx) >= pens) {
        showToast('That is your last circle used. Un-circle something to move it.', 'warn');
        playWrong();
        return;
      }
      S.drafts[k] = !S.drafts[k];
      sndPen();
      render();
    }));

    /* Everything else writes to draft state without re-rendering, so a
       part-filled form survives typing. */
    document.querySelectorAll('[data-sty-flag]').forEach(el => el.addEventListener('change', () => {
      const [i, id] = el.dataset.styFlag.split(':');
      S.drafts['s' + i + ':' + id] = el.checked;
    }));
    document.querySelectorAll('[data-sty-rub]').forEach(el => el.addEventListener('change', () => {
      const [i, ri] = el.dataset.styRub.split(':');
      S.drafts['s' + i + ':r' + ri] = el.checked;
    }));
    document.querySelectorAll('[data-sty-pick]').forEach(el => el.addEventListener('change', () => {
      const [i, id] = el.dataset.styPick.split(':');
      S.drafts['s' + i + ':pick'] = id;
    }));
    document.querySelectorAll('[data-sty-fig]').forEach(el => el.addEventListener('input', () => {
      const [i, id] = el.dataset.styFig.split(':');
      S.drafts['s' + i + ':' + id] = el.value;
    }));
    document.querySelectorAll('[data-sty-text]').forEach(el => el.addEventListener('input', () => {
      S.drafts['s' + el.dataset.styText + ':text'] = el.value;
      const wc = el.parentNode.querySelector('.sty-wordcount');
      if (wc) {
        const t = el.value.trim();
        const n = t ? t.split(/\s+/).length : 0;
        const min = +wc.dataset.min || 0;
        wc.textContent = n + ' word' + (n === 1 ? '' : 's') + (min ? ' · aim for ' + min + '+' : '');
      }
    }));
    document.querySelectorAll('[data-sty-reveal]').forEach(el =>
      el.addEventListener('click', () => storyRevealWritten(+el.dataset.styReveal)));
  }


  /* ── PROTOTYPE DESK ───────────────────────────────────────────────────────
     A test of one idea on one item: are the atoms the reason story mode still
     reads as a quiz? No prompts, no marks, no submit, no options list — an
     invoice, a pen, a daybook and three trays.

     The same three decisions live here (query it, post it as billed, post it at
     the figures you worked out) but none is a control you pick from a list.
     They fall out of what you do with the paper. Nothing says that checking the
     invoice against the order is the job; knowing that is the thing being
     learned, and announcing it is what makes a game feel like a test.

     Self-contained: story-proto.js, this block, the .pr-* rules, one State key,
     one mode card. */

  function protoDef() { return window.AAT_STORY_PROTO || null; }

  function startProto() {
    if (!protoDef()) { showToast('Prototype not loaded.', 'warn'); return; }
    /* Both sheets sit loose on the desk. They arrive clipped together and it is
       up to the player to slide them apart far enough to read one against the
       other — which is the whole job of the item. */
    State.proto = { phase: 'desk', pen: false, circled: {}, lifted: false,
                    pos: { order: { x: 0, y: 0 }, invoice: { x: 26, y: 34 } },
                    top: 'invoice', moved: false,
                    tray: null, db: { net: '', vat: '', total: '' },
                    outcome: null, examiner: false };
    State.screen = 'proto';
    sndDrawer(); render();
  }
  function exitProto() {
    State.proto = null; State.screen = 'home'; State.activeTab = 'home';
    document.body.classList.remove('story-mode', 'pen-up', 'lifting');
    render();
  }
  function protoTogglePen() {
    State.proto.pen = !State.proto.pen;
    if (State.proto.pen) State.proto.lifted = false;
    sndPaper(); render();
  }
  function protoCircle(id) {
    const P = State.proto;
    if (!P.pen) return;
    P.circled[id] = !P.circled[id];
    sndPen(); render();
  }
  function protoRaise(which) {
    const P = State.proto;
    if (P.top !== which) { P.top = which; sndPaper(); }
  }
  function protoTidy() {
    const P = State.proto;
    P.pos = { order: { x: 0, y: 0 }, invoice: { x: 26, y: 34 } };
    P.top = 'invoice'; P.lifted = false;
    sndPaper(); render();
  }
  function protoLift() {
    const P = State.proto;
    if (P.pen) return;                  /* put the pen down first */
    P.lifted = !P.lifted;
    sndPaper(); render();
  }
  /* Where the invoice ends up is the decision. Posting opens the daybook, and
     what you write in it decides which posting it was. */
  function protoDrop(trayId) {
    const P = State.proto;
    if (!P.lifted) return;
    P.lifted = false; P.tray = trayId;
    sndStamp();
    if (trayId === 'post') { P.phase = 'book'; }
    else { P.outcome = trayId === 'query' ? 'query' : 'hold'; P.phase = 'out'; setTimeout(sndChime, 200); }
    window.scrollTo({ top: 0, behavior: 'instant' });
    render();
  }
  function protoRuleOff() {
    const P = State.proto, D = protoDef();
    const near = (v, t) => Number.isFinite(v) && Math.abs(v - t) < 0.005;
    const n = parseNumericInput(P.db.net), v = parseNumericInput(P.db.vat), t = parseNumericInput(P.db.total);
    if (![n, v, t].every(Number.isFinite)) { showToast('The daybook needs all three columns.', 'warn'); return; }
    const isBilled = near(n, D.billed.net) && near(v, D.billed.vat) && near(t, D.billed.total);
    const isRight  = near(n, D.correct.net) && near(v, D.correct.vat) && near(t, D.correct.total);
    P.outcome = isBilled ? 'billed' : isRight ? 'corrected' : 'odd';
    P.phase = 'out';
    sndStamp(); setTimeout(sndChime, 220);
    window.scrollTo({ top: 0, behavior: 'instant' });
    render();
  }

  /* What did you actually circle? The query you raise is only as good as this,
     so it drives which ending you get rather than sitting on top of it. */
  function protoCircleState() {
    const P = State.proto, D = protoDef();
    const real = Object.keys(D.wrong);
    const found = real.filter(k => P.circled[k]).length;
    const decoys = Object.keys(D.fine).filter(k => P.circled[k]).length;
    if (!found) return { key: 'blind', checked: decoys > 0, found, decoys };
    if (found < real.length) return { key: 'partial', checked: true, found, decoys };
    return { key: decoys ? 'noisy' : 'full', checked: true, found, decoys };
  }
  /* An outcome may branch on that state; if it does not, it is used as it is. */
  function protoOutcome() {
    const P = State.proto, D = protoDef();
    const base = D.outcomes[P.outcome];
    if (!base) return null;
    if (!base.by) return base;
    const st = protoCircleState();
    return base.by[st.key] || base.by[st.checked ? 'checked' : 'unchecked']
        || base.by[Object.keys(base.by)[0]];
  }

  function protoHot(text, id) {
    const P = State.proto, safe = escapeHtml(String(text == null ? '' : text));
    if (!id) return safe;
    const on = !!P.circled[id];
    return `<button type="button" class="pr-hot ${on ? 'is-on' : ''}" data-pr-hot="${escapeHtml(id)}"
      aria-pressed="${on}" aria-label="${safe}">${safe}<span class="pr-ring"></span></button>`;
  }
  function protoSheet(d, opts) {
    const o = opts || {};
    const foot = (d.foot || []).map(f => (typeof f === 'string' ? { t: f } : f));
    return `<article class="pr-sheet ${o.cls || ''}" ${o.attrs || ''}>
      ${o.clip ? '<span class="pr-clip"></span>' : ''}
      <div class="pr-sheet-h">
        <div><div class="pr-nm">${escapeHtml(d.name)}</div><div class="pr-sb">${escapeHtml(d.sub || '')}</div></div>
        <div class="pr-rf">${escapeHtml(d.ref || '')}<br>${escapeHtml(d.date || '')}</div>
      </div>
      <table class="pr-t">${(d.rows || []).map(r => `<tr class="${r.total ? 'tot' : ''} ${r.muted ? 'mut' : ''}">
        <td>${o.hot ? protoHot(r.l, r.hot) : escapeHtml(r.l)}</td>
        <td class="r">${r.a == null ? '' : (o.hot ? protoHot(r.a, r.hotA) : escapeHtml(r.a))}</td></tr>`).join('')}</table>
      ${foot.length ? `<div class="pr-ft">${foot.map(f =>
        `<div>${o.hot ? protoHot(f.t, f.hot) : escapeHtml(f.t)}</div>`).join('')}</div>` : ''}
    </article>`;
  }

  function renderProtoDesk() {
    const P = State.proto, D = protoDef();
    return `<div class="sty-stage" data-light="morning">
      ${renderStoryRoom()}
      <div class="sty-hud">
        <div class="sty-hud-left">
          <button class="sty-leave" id="prExit" type="button" aria-label="Leave">✕</button>
          <span class="sty-hud-when"><span class="sty-hud-day">Prototype desk</span>
          <span class="sty-clock">09:20</span></span>
        </div>
        <div class="sty-timeline"><div class="sty-timeline-fill" style="width:8%"></div></div>
        <div class="sty-hud-marks"><b>1</b><span>in the tray</span></div>
      </div>
      <div class="sty-inner"><div class="pr-desk">
        <div class="pr-head">
          <div class="sty-slug">This morning’s post</div>
          <h2 class="pr-from">${escapeHtml(D.title)}</h2>
          <p class="pr-sub">${escapeHtml(D.sub)}</p>
        </div>
        <button class="pr-pen ${P.pen ? 'is-up' : ''}" id="prPen" type="button" aria-pressed="${P.pen}">
          <span class="pr-pen-body"></span>
          <span>${P.pen ? 'Pen in hand' : 'A red biro, on the desk'}</span>
        </button>
        <div class="pr-deskarea" id="prDeskArea">
          ${[['order', D.order], ['invoice', D.invoice]].map(([k, doc]) => {
            const pos = P.pos[k];
            return protoSheet(doc, {
              cls: 'pr-loose pr-' + k + (P.top === k ? ' is-top' : '') + (P.lifted && k === 'invoice' ? ' is-lifted' : ''),
              hot: k === 'invoice',
              clip: k === 'invoice',
              attrs: `id="pr${k === 'order' ? 'Order' : 'Invoice'}" data-pr-move="${k}"` +
                     ` style="transform:translate3d(${pos.x}px,${pos.y}px,0);z-index:${P.top === k ? 12 : 6}"`,
            });
          }).join('')}
        </div>
        ${!P.moved ? '<p class="pr-swap-note">They came clipped together. Slide them about.</p>'
                   : '<p class="pr-swap-note"><button type="button" class="pr-tidy" id="prTidy">Square them up</button></p>'}
        <div class="pr-trays">
          ${D.trays.map(t => `<button class="pr-tray" type="button" data-pr-tray="${escapeHtml(t.id)}">
            <div class="pr-tray-l">${escapeHtml(t.label)}</div>
            <div class="pr-tray-h">${escapeHtml(t.hint)}</div>
          </button>`).join('')}
        </div>
      </div></div>
    </div>`;
  }

  function renderProtoBook() {
    const P = State.proto;
    const cell = (id, ph) => `<div class="pr-bc r"><input type="text" inputmode="decimal" autocomplete="off"
      placeholder="${ph}" data-pr-db="${id}" value="${escapeHtml(P.db[id] || '')}"></div>`;
    return `<div class="sty-stage" data-light="morning">
      ${renderStoryRoom()}
      <div class="sty-hud">
        <div class="sty-hud-left">
          <button class="sty-leave" id="prExit" type="button" aria-label="Leave">✕</button>
          <span class="sty-hud-when"><span class="sty-hud-day">Prototype desk</span>
          <span class="sty-clock">09:41</span></span>
        </div>
        <div class="sty-timeline"><div class="sty-timeline-fill" style="width:22%"></div></div>
        <div class="sty-hud-marks"><b>1</b><span>in the tray</span></div>
      </div>
      <div class="sty-inner"><div class="pr-desk">
        <div class="sty-slug">Purchase daybook</div>
        <h2 class="pr-from">Write it up</h2>
        <p class="pr-sub">The invoice is in the post tray. It only counts once it is in the book.</p>
        <div class="pr-book">
          <div class="pr-book-h"><span style="font-weight:700">PURCHASE DAYBOOK</span><span>May 20XX · page 14</span></div>
          <div class="pr-book-grid">
            <div><div class="pr-bh">Supplier</div><div class="pr-bc">WR Limited</div></div>
            <div><div class="pr-bh r">Net</div>${cell('net', '0.00')}</div>
            <div><div class="pr-bh r">VAT</div>${cell('vat', '0.00')}</div>
            <div><div class="pr-bh r">Total</div>${cell('total', '0.00')}</div>
          </div>
          <div class="pr-book-note">Inv 000231 · 12 May</div>
        </div>
        <button class="sty-btn" type="button" id="prRuleOff">Rule off</button>
        <button class="sty-btn sty-btn-ghost" type="button" id="prBack" style="margin-top:10px">Take it back out of the tray</button>
      </div></div>
    </div>`;
  }

  function renderProtoOut() {
    const P = State.proto, D = protoDef();
    const o = protoOutcome() || D.outcomes.corrected;
    const st = protoCircleState();
    const p = storyPerson(o.who);
    const circled = Object.keys(P.circled).filter(k => P.circled[k]);
    const rows = Object.keys(D.wrong).map(k => {
      const got = circled.indexOf(k) >= 0;
      return `<div class="pr-db-row ${got ? 'hit' : 'miss'}"><span class="m">${got ? '✓' : '!'}</span><span>${escapeHtml(D.wrong[k])}</span></div>`;
    }).concat(circled.filter(k => D.fine[k]).map(k =>
      `<div class="pr-db-row bad"><span class="m">✗</span><span>${escapeHtml(D.fine[k])}</span></div>`)).join('');
    return `<div class="sty-stage" data-light="morning">
      ${renderStoryRoom()}
      <div class="sty-hud">
        <div class="sty-hud-left">
          <button class="sty-leave" id="prExit" type="button" aria-label="Leave">✕</button>
          <span class="sty-hud-when"><span class="sty-hud-day">Prototype desk</span>
          <span class="sty-clock">09:52</span></span>
        </div>
        <div class="sty-timeline"><div class="sty-timeline-fill" style="width:34%"></div></div>
        <div class="sty-hud-marks"><b>0</b><span>in the tray</span></div>
      </div>
      <div class="sty-inner"><div class="pr-desk pr-out">
        <div class="sty-slug">What happened next</div>
        <div class="sty-react sty-react-${escapeHtml(o.tone)}" style="margin-top:14px">
          <div class="sty-line">
            <span class="sty-av sty-av-${escapeHtml(p.tone)}">${escapeHtml(p.initials)}</span>
            <div class="sty-said"><div class="sty-name">${escapeHtml(p.name)}</div>
            <p class="sty-speech">${storyText(o.text)}</p></div>
          </div>
          <p class="sty-dir">${storyText(o.dir)}</p>
        </div>
        <div class="pr-wed"><div class="pr-wed-l">Later that week</div><p>${storyText(o.wed)}</p></div>

        <div class="pr-examiner">
          <button class="sty-btn sty-btn-ghost" type="button" id="prExam" style="margin-top:0">
            ${P.examiner ? 'Hide the marking' : 'How would an examiner have marked that?'}
          </button>
          ${P.examiner ? `<div class="pr-examiner-body">
            <p>An AAT task built on this invoice would be worth <b>8 marks</b>. On what you did, <b>${o.marks} of 8</b>.</p>
            <p>Three marks are for spotting the discrepancies, three for the corrected figures, two for what you did with it. You circled <b>${st.found} of 3</b>${st.decoys ? ` and ${st.decoys} that ${st.decoys === 1 ? 'was' : 'were'} fine` : ''}.</p>
            <div class="pr-debrief">${rows || '<div class="pr-db-row miss"><span class="m">!</span><span>You did not pick the pen up.</span></div>'}</div>
            <p style="margin-top:12px">The corrected invoice is <b>£252.00 net, £50.40 VAT, £302.40 total</b> — 16 × £17.50, less 10%, then VAT on what is left. The 2% prompt payment discount is not deducted here; it comes off at the point of payment.</p>
          </div>` : ''}
        </div>

        <div class="sty-outro-actions">
          <button class="sty-btn" type="button" id="prAgain">Try it a different way</button>
          <button class="sty-btn sty-btn-ghost" type="button" id="prExit2">Back to practice</button>
        </div>
      </div></div>
    </div>`;
  }

  function renderProto() {
    const P = State.proto;
    if (!P || !protoDef()) { State.screen = 'home'; return ''; }
    if (P.phase === 'book') return renderProtoBook();
    if (P.phase === 'out')  return renderProtoOut();
    return renderProtoDesk();
  }

  function attachProtoEvents() {
    const on = State.screen === 'proto' && !!State.proto;
    document.body.classList.toggle('story-mode', on || (State.screen === 'story' && !!State.story));
    document.body.classList.toggle('pen-up', on && State.proto.pen);
    document.body.classList.toggle('lifting', on && State.proto.lifted);
    if (!on) return;
    const P = State.proto;
    bind('prExit', 'click', exitProto);
    bind('prExit2', 'click', exitProto);
    bind('prPen', 'click', protoTogglePen);
    bind('prRuleOff', 'click', protoRuleOff);
    bind('prAgain', 'click', startProto);
    bind('prExam', 'click', () => { P.examiner = !P.examiner; playClick(); render(); });
    bind('prBack', 'click', () => { P.phase = 'desk'; P.tray = null; sndPaper(); render(); });
    /* Both sheets drag freely. Releasing the invoice over a tray files it, which
       is the same verb as putting paper in a tray on a real desk. A press that
       does not move is still a tap, so circling and the keyboard path both work. */
    let drag = null;
    document.querySelectorAll('[data-pr-move]').forEach(el => {
      el.addEventListener('pointerdown', (e) => {
        if (e.target.closest('[data-pr-hot]')) return;      // circling, not dragging
        const k = el.dataset.prMove;
        protoRaise(k);
        el.style.zIndex = 20;
        drag = { el, k, sx: e.clientX, sy: e.clientY,
                 ox: P.pos[k].x, oy: P.pos[k].y, moved: false };
        try { el.setPointerCapture(e.pointerId); } catch (err) {}
      });
      el.addEventListener('pointermove', (e) => {
        if (!drag || drag.el !== el) return;
        const dx = e.clientX - drag.sx, dy = e.clientY - drag.sy;
        if (!drag.moved && Math.abs(dx) + Math.abs(dy) < 5) return;
        drag.moved = true;
        el.classList.add('is-dragging');
        el.style.transform = `translate3d(${drag.ox + dx}px,${drag.oy + dy}px,0)`;
      });
      const end = (e) => {
        if (!drag || drag.el !== el) return;
        const d = drag; drag = null;
        el.classList.remove('is-dragging');
        if (!d.moved) {                                     // a tap, not a drag
          if (d.k === 'invoice') protoLift(); else render();
          return;
        }
        P.pos[d.k] = { x: d.ox + (e.clientX - d.sx), y: d.oy + (e.clientY - d.sy) };
        P.moved = true;
        /* The sheet is under the cursor, so it has to be made transparent to
           hit-testing for a moment or it finds itself instead of the tray. */
        el.style.pointerEvents = 'none';
        const over = document.elementFromPoint(e.clientX, e.clientY);
        el.style.pointerEvents = '';
        const tray = over && over.closest && over.closest('[data-pr-tray]');
        if (tray && d.k === 'invoice') { P.lifted = true; protoDrop(tray.dataset.prTray); return; }
        if (tray && d.k === 'order') { showToast('The order stays with you. It is the invoice that gets filed.', 'warn'); }
        sndPaper(); render();
      };
      el.addEventListener('pointerup', end);
      el.addEventListener('pointercancel', end);
      el.addEventListener('click', (e) => { if (e.target.closest('[data-pr-hot]')) return; });
    });
    bind('prTidy', 'click', protoTidy);
    document.querySelectorAll('[data-pr-hot]').forEach(el =>
      el.addEventListener('click', (e) => { e.stopPropagation(); protoCircle(el.dataset.prHot); }));
    document.querySelectorAll('[data-pr-tray]').forEach(el =>
      el.addEventListener('click', () => protoDrop(el.dataset.prTray)));
    document.querySelectorAll('[data-pr-db]').forEach(el =>
      el.addEventListener('input', () => { P.db[el.dataset.prDb] = el.value; }));
  }

  function attachEvents() {
    bind('startBtn', 'click', () => { Storage.data.settings.seenSplash = true; Storage.save(); State.screen='home'; render(); });
    attachStoryEvents();
    attachProtoEvents();
    document.querySelectorAll('[data-tab]').forEach(el => el.addEventListener('click', () => { State.activeTab = el.dataset.tab; render(); }));
    document.querySelectorAll('[data-switch-subject]').forEach(el => el.addEventListener('click', () => switchSubject(el.dataset.switchSubject)));
    bind('subjectPickerBack', 'click', () => { State.screen = 'home'; render(); });
    document.querySelectorAll('[data-topic]').forEach(el => el.addEventListener('click', () => startPractice(el.dataset.topic)));
    bind('mockBtn', 'click', startMock);
    bind('protoBtn', 'click', startProto);
    bind('storyBtn', 'click', () => { const s = storyDef(); if (s && s.days && s.days[0]) startStory(s.days[0].id); });
    bind('unitExamBtn', 'click', showUnitAssessmentPicker);
    document.querySelectorAll('[data-unit-exam]').forEach(el =>
      el.addEventListener('click', () => { State.confirmModal = null; startUnitAssessment(el.dataset.unitExam); }));
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
      el.addEventListener('input', (e) => {
        const i = +el.dataset.tfBlank;
        if (State.mode === 'mock') setExamAnswerKey(i, e.target.value);
        else State.tfDraft[i] = e.target.value;
      });
    });
    /* True/false grid */
    document.querySelectorAll('[data-tfq-row]').forEach(el => el.addEventListener('click', () => {
      const row = +el.dataset.tfqRow, val = el.dataset.tfqVal === 'true';
      if (State.mode === 'mock') { setExamAnswerKey(row, val); render(); }
      else { State.tfqDraft[row] = val; render(); }
    }));
    /* Multi-select */
    document.querySelectorAll('[data-ms]').forEach(el => el.addEventListener('click', () => {
      const i = +el.dataset.ms;
      const cur = (State.mode === 'mock' ? (State.answers[State.current] || []) : State.msDraft).slice();
      const at = cur.indexOf(i);
      if (at !== -1) cur.splice(at, 1); else cur.push(i);
      if (State.mode === 'mock') { State.answers[State.current] = cur; }
      else State.msDraft = cur;
      playClick(); render();
    }));
    bind('submitTrueFalseBtn', 'click', submitTrueFalse);
    bind('submitMultiSelectBtn', 'click', submitMultiSelect);
    bind('submitWrittenBtn', 'click', submitWritten);
    bind('finishWrittenBtn', 'click', finishWritten);
    /* Written response */
    const wa = document.getElementById('writtenAnswer');
    if (wa) wa.addEventListener('input', (e) => {
      if (State.mode === 'mock') {
        const cur = State.answers[State.current] || { text: '', rubric: {} };
        State.answers[State.current] = { ...cur, text: e.target.value };
        const meta = wa.parentElement && wa.parentElement.querySelector('.written-meta');
        if (meta) {
          const n = e.target.value.trim() ? e.target.value.trim().split(/\s+/).length : 0;
          meta.textContent = `${n} word${n === 1 ? '' : 's'}` + (State.questions[State.current].minWords ? ` · minimum ${State.questions[State.current].minWords}` : '');
        }
      } else {
        State.writtenDraft = e.target.value;
        const meta = wa.parentElement && wa.parentElement.querySelector('.written-meta');
        if (meta) {
          const n = e.target.value.trim() ? e.target.value.trim().split(/\s+/).length : 0;
          meta.textContent = `${n} word${n === 1 ? '' : 's'}` + (State.questions[State.current].minWords ? ` · minimum ${State.questions[State.current].minWords}` : '');
        }
      }
    });
    document.querySelectorAll('[data-rubric]').forEach(el => el.addEventListener('change', () => {
      const i = +el.dataset.rubric;
      if (State.mode === 'mock') {
        const cur = State.answers[State.current] || { text: '', rubric: {} };
        cur.rubric = { ...(cur.rubric || {}), [i]: el.checked };
        State.answers[State.current] = cur;
      } else {
        State.writtenRubric = { ...State.writtenRubric, [i]: el.checked };
      }
      render();
    }));
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
    bind('syncSetupBtn', 'click', openSyncSetup);
    bind('syncKeyBtn', 'click', openSyncKey);
    bind('syncOffBtn', 'click', openSyncOff);
    bind('syncNowBtn', 'click', () => {
      showToast('🔄 Syncing…', 'info');
      window.ProgressSync.syncNow({ onRemoteChange: onRemoteProgress }).then((r) => {
        if (r && r.error) showToast('⚠️ ' + (window.ProgressSync.status().error || 'Sync failed'), 'warn');
        else if (!r.changed) showToast('✅ Already up to date', 'success');
        render();
      });
    });
    bind('exportProgressBtn', 'click', exportProgress);
    bind('importProgressBtn', 'click', () => {
      const inp = document.getElementById('importProgressFile');
      if (inp) { inp.value = ''; inp.click(); }
    });
    bind('importProgressFile', 'change', (e) => {
      const file = e.target.files && e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => importProgressFromText(String(reader.result || ''));
      reader.onerror = () => showToast('⚠️ Could not read that file.', 'warn');
      reader.readAsText(file);
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
      const i = +el.dataset.gfGap;
      if (State.mode === 'mock') setExamAnswerKey(i, e.target.value === '' ? null : Number(e.target.value));
      else State.gfDraft[i] = e.target.value;
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
    // Typed-answer interactions
    bind('submitTypedBtn', 'click', submitTypedPractice);
    const typedInput = document.getElementById('typedAnswer');
    if (typedInput) {
      typedInput.addEventListener('input', () => {
        const err = document.getElementById('typedError');
        if (err) err.textContent = '';
      });
      typedInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          if (State.answered === null) submitTypedPractice();
          else { const next = document.getElementById('nextBtn'); if (next) next.click(); }
        }
      });
      if (State.answered === null) { try { typedInput.focus(); } catch (ex) {} }
    }
    // Listen-typed interactions
    const listenTypedPlayBtn = document.getElementById('listenTypedPlayBtn');
    if (listenTypedPlayBtn) {
      const ltq = State.questions[State.current];
      const ltAudio = ltq.audio || ltq.ans;
      listenTypedPlayBtn.addEventListener('click', () => {
        if (listenTypedPlayBtn.classList.contains('is-playing')) {
          window.speechSynthesis.cancel();
          listenTypedPlayBtn.textContent = '🔊 Tap to Listen';
          listenTypedPlayBtn.classList.remove('is-playing');
          return;
        }
        speakFrench(ltAudio,
          () => { listenTypedPlayBtn.textContent = '⏹ Playing…'; listenTypedPlayBtn.classList.add('is-playing'); },
          () => { listenTypedPlayBtn.textContent = '🔊 Tap to Listen'; listenTypedPlayBtn.classList.remove('is-playing'); }
        );
      });
    }
    const listenTypedReplayBtn = document.getElementById('listenTypedReplayBtn');
    if (listenTypedReplayBtn) {
      const ltq = State.questions[State.current];
      listenTypedReplayBtn.addEventListener('click', () => speakFrench(ltq.audio || ltq.ans));
    }
    const listenTypedSlowBtn = document.getElementById('listenTypedSlowBtn');
    if (listenTypedSlowBtn) {
      const ltq = State.questions[State.current];
      listenTypedSlowBtn.addEventListener('click', () => speakFrench(ltq.audio || ltq.ans, null, null, 0.55));
    }
    bind('submitListenTypedBtn', 'click', submitListenTypedPractice);
    const listenTypedInput = document.getElementById('listenTypedAnswer');
    if (listenTypedInput) {
      listenTypedInput.addEventListener('input', () => {
        const err = document.getElementById('listenTypedError');
        if (err) err.textContent = '';
      });
      listenTypedInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          if (State.answered === null) submitListenTypedPractice();
          else { const next = document.getElementById('nextBtn'); if (next) next.click(); }
        }
      });
      if (State.answered === null) { try { listenTypedInput.focus(); } catch (ex) {} }
    }
    // TTS / Listen interactions
    const listenPlayBtn = document.getElementById('listenPlayBtn');
    if (listenPlayBtn) {
      const lq = State.questions[State.current];
      listenPlayBtn.addEventListener('click', () => {
        if (listenPlayBtn.classList.contains('is-playing')) {
          window.speechSynthesis.cancel();
          listenPlayBtn.textContent = '🔊 Tap to Listen';
          listenPlayBtn.classList.remove('is-playing');
          return;
        }
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
    const listenSlowBtn = document.getElementById('listenSlowBtn');
    if (listenSlowBtn) {
      const lq = State.questions[State.current];
      listenSlowBtn.addEventListener('click', () => speakFrench(lq.audio || lq.q, null, null, 0.55));
    }
    const ttsQBtn = document.getElementById('ttsQBtn');
    if (ttsQBtn) {
      const tq = State.questions[State.current];
      const ttsText = tq.tts || (isFrToEnMcq(tq) ? extractFrenchTerm(tq) : null);
      if (ttsText) {
        const origLabel = ttsQBtn.textContent;
        ttsQBtn.addEventListener('click', () => {
          if (ttsQBtn.classList.contains('is-playing')) {
            window.speechSynthesis.cancel();
            ttsQBtn.textContent = origLabel;
            ttsQBtn.classList.remove('is-playing');
            return;
          }
          speakFrench(ttsText,
            () => { ttsQBtn.textContent = '⏹'; ttsQBtn.classList.add('is-playing'); },
            () => { ttsQBtn.textContent = origLabel; ttsQBtn.classList.remove('is-playing'); }
          );
        });
      }
    }
    // Lesson check audio button (listen lessons)
    const lessonCheckPlayBtn = document.getElementById('lessonCheckPlayBtn');
    if (lessonCheckPlayBtn && State.lesson && State.lesson.phase === 'quiz') {
      const lcq = State.lesson.def.check[State.lesson.qIdx];
      if (lcq && lcq.audio) {
        lessonCheckPlayBtn.addEventListener('click', () => {
          if (lessonCheckPlayBtn.classList.contains('is-playing')) {
            window.speechSynthesis.cancel();
            lessonCheckPlayBtn.textContent = '🔊 Tap to Listen';
            lessonCheckPlayBtn.classList.remove('is-playing');
            return;
          }
          speakFrench(lcq.audio,
            () => { lessonCheckPlayBtn.textContent = '⏹ Playing…'; lessonCheckPlayBtn.classList.add('is-playing'); },
            () => { lessonCheckPlayBtn.textContent = '🔊 Tap to Listen'; lessonCheckPlayBtn.classList.remove('is-playing'); }
          );
        });
        const lessonCheckReplayBtn = document.getElementById('lessonCheckReplayBtn');
        if (lessonCheckReplayBtn) lessonCheckReplayBtn.addEventListener('click', () => speakFrench(lcq.audio));
      }
    }
    // Story read-along (French): listen to the whole story, or tap a line.
    if (State.lesson && State.lesson.phase === 'teach') {
      const storyVisual = document.querySelector('.lesson-visual.story-readable');
      if (storyVisual) {
        const paras = Array.prototype.slice.call(storyVisual.querySelectorAll('p'));
        const lines = paras.map(p => p.textContent.trim()).filter(Boolean);
        const storyReadBtn = document.getElementById('storyReadBtn');
        if (storyReadBtn && lines.length) {
          storyReadBtn.addEventListener('click', () => {
            if (storyReadBtn.classList.contains('is-playing')) {
              window.speechSynthesis.cancel();
              storyReadBtn.textContent = '🔊 Listen to the story';
              storyReadBtn.classList.remove('is-playing');
              return;
            }
            speakSequence(lines,
              () => { storyReadBtn.textContent = '⏹ Stop'; storyReadBtn.classList.add('is-playing'); },
              () => { storyReadBtn.textContent = '🔊 Listen to the story'; storyReadBtn.classList.remove('is-playing'); });
          });
        }
        paras.forEach(p => {
          const txt = p.textContent.trim();
          if (!txt) return;
          p.classList.add('story-line');
          p.addEventListener('click', () => speakFrench(txt));
        });
      }
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
    bind('diagnosticBtn', 'click', startDiagnostic);
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
        State.collapsedUnits[uid] = el.dataset.collapsed !== 'true';
        render();
      });
      el.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); el.click(); } });
    });
    // DELF exam events
    bind('delfExitBtn', 'click', exitDelf);
    bind('delfHomeBtn', 'click', exitDelf);
    bind('delfFinishExamBtn', 'click', finishDelfExam);
    bind('delfFinishSectionBtn', 'click', finishDelfSection);
    bind('delfSubmitAssessBtn', 'click', submitDelfSelfAssess);
    bind('delfSectionBackBtn', 'click', () => { stopDelfTimer(); State.delfExam.phase = 'hub'; render(); });
    document.querySelectorAll('[data-delf-exam]').forEach(el => el.addEventListener('click', () => startDelfExam(el.dataset.delfExam)));
    document.querySelectorAll('[data-delf-start]').forEach(el => el.addEventListener('click', () => startDelfSection(+el.dataset.delfStart)));
    document.querySelectorAll('[data-delf-retry]').forEach(el => el.addEventListener('click', () => startDelfExam(el.dataset.delfRetry)));
    document.querySelectorAll('[data-delf-opt]').forEach(el => el.addEventListener('click', () => {
      const [flatIdx, optIdx] = el.dataset.delfOpt.split('-').map(Number);
      selectDelfAnswer(flatIdx, optIdx);
    }));
    document.querySelectorAll('.delf-rubric-cb').forEach(el => el.addEventListener('change', () => toggleDelfRubric(el.dataset.delfRubric)));
    document.querySelectorAll('[data-delf-tts]').forEach(el => {
      el.addEventListener('click', () => {
        if (_delfActiveTtsBtn) {
          // Something is playing — stop it regardless of which button
          stopSpeech();
          const prev = _delfActiveTtsBtn;
          _delfActiveTtsBtn = null;
          prev.textContent = '🔊 Play Again';
          prev.classList.remove('is-playing');
          return;
        }
        const text = el.dataset.delfTts;
        if (!text) return;
        // Set state synchronously before speak() so no async callback can race
        _delfActiveTtsBtn = el;
        el.textContent = '⏹ Stop';
        el.classList.add('is-playing');
        speakDelfDialogue(text, null, () => {
          if (_delfActiveTtsBtn === el) {
            _delfActiveTtsBtn = null;
            el.textContent = '🔊 Play Again';
            el.classList.remove('is-playing');
          }
        });
      });
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
    /* Worked-example cards */
    bind('workedStepBtn', 'click', workedRevealStep);
    bind('workedAllBtn', 'click', workedRevealAll);
    bind('workedTryBtn', 'click', workedSubmitTry);
    bind('workedHintBtn', 'click', workedShowTryAnswer);
    const wti = document.getElementById('workedTryInput');
    if (wti) {
      wti.addEventListener('input', (e) => { if (State.lesson) State.lesson.worked.tryDraft = e.target.value; });
      wti.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); workedSubmitTry(); } });
    }
    /* Non-MCQ lesson checks */
    bind('lessonSubmitNumericBtn', 'click', lessonSubmitNumeric);
    bind('lessonSubmitGapBtn', 'click', lessonSubmitGapFill);
    bind('lessonSubmitTfBtn', 'click', lessonSubmitTrueFalse);
    const lni = document.getElementById('lessonNumeric');
    if (lni) {
      lni.addEventListener('input', (e) => { if (State.lesson) State.lesson.checkDraft.numeric = e.target.value; });
      lni.addEventListener('keydown', (e) => {
        if (e.key !== 'Enter') return;
        e.preventDefault();
        if (State.lesson && State.lesson.qAnswered === null) lessonSubmitNumeric();
        else { const n = document.getElementById('lessonNextBtn'); if (n) n.click(); }
      });
    }
    document.querySelectorAll('[data-lesson-gap]').forEach(el => el.addEventListener('change', (e) => {
      if (State.lesson) State.lesson.checkDraft.gaps[+el.dataset.lessonGap] = e.target.value;
    }));
    document.querySelectorAll('[data-lesson-tf]').forEach(el => el.addEventListener('click', () => {
      if (!State.lesson || State.lesson.qAnswered !== null) return;
      State.lesson.checkDraft.tf[+el.dataset.lessonTf] = el.dataset.lessonTfVal === 'true';
      playClick(); render();
    }));
    // Flashcard buttons
    bind('flashExitBtn', 'click', goLearn);
    bind('flashExitBtn2', 'click', goLearn);
    bind('flashFlipBtn', 'click', flashFlip);
    bind('flashFlipBtn2', 'click', flashFlip);
    bind('flashYesBtn', 'click', () => flashGrade(true));
    bind('flashNoBtn', 'click', () => flashGrade(false));
    // Active Recall (French)
    bind('recallBtn', 'click', startRecall);
    bind('recallExitBtn', 'click', goHome);
    bind('recallExitBtn2', 'click', goHome);
    bind('recallAgainBtn', 'click', startRecall);
    bind('recallFlipBtn', 'click', recallFlip);
    bind('recallFlipBtn2', 'click', recallFlip);
    bind('recallYesBtn', 'click', () => recallGrade(true));
    bind('recallNoBtn', 'click', () => recallGrade(false));
    if (State.screen === 'recall' && State.recall && State.recall.flipped) {
      const rt = document.getElementById('recallTtsBtn');
      if (rt) {
        const rq = questionById(State.recall.cards[State.recall.idx]);
        const rc = rq && recallCardContent(rq);
        if (rc && rc.audio) rt.addEventListener('click', () => speakFrench(rc.audio));
      }
    }
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
    if (State.confirmModal) {
      if (e.key === 'Escape') { e.preventDefault(); closeConfirm(); return; }
      if (e.key === 'Tab') {
        const cancel = document.getElementById('modalCancel');
        const confirm = document.getElementById('modalConfirm');
        if (cancel && confirm) {
          e.preventDefault();
          if (e.shiftKey) {
            (document.activeElement === cancel ? confirm : cancel).focus();
          } else {
            (document.activeElement === confirm ? cancel : confirm).focus();
          }
        }
        return;
      }
      return; // block all other keys while modal is open
    }
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
        const next = document.getElementById('nextBtn') || document.getElementById('submitBtn') || document.getElementById('submitNumericBtn') || document.getElementById('submitDragDropBtn') || document.getElementById('submitTableFillBtn') || document.getElementById('submitScenarioBtn') || document.getElementById('submitGapFillBtn') || document.getElementById('submitWordOrderBtn') || document.getElementById('submitTypedBtn') || document.getElementById('submitListenTypedBtn');
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
    // The persisted subject may be a lazily-loaded language subject whose data
    // isn't in the page yet — fetch it before rendering. AAT has no extra assets,
    // so this resolves immediately for the default case. On failure we still call
    // _initAfterAssets so the "question bank failed to load" guard can show.
    ensureSubjectAssets(_activeSubjectId).catch(function () {}).then(_initAfterAssets);
  }
  function _initAfterAssets() {
    // Activate the persisted subject
    getSubject(_activeSubjectId).activate();
    Storage.load();
    ensureSkillTags();
    document.body.classList.toggle('dark', Storage.isDarkActive());
    State.referenceOpen = !!Storage.data.settings.refOpen;
    renderReferencePanel();
    updateRefToggleBtn();
    if (Storage.data.settings.seenSplash) State.screen = 'home';
    /* The self-rendering subjects carry no shared question bank — each reads its
       own data — so this guard would fire on a healthy load. Skip it when the
       active subject's own renderer is ready. */
    const _ownUi = getSubject(_activeSubjectId).ui;
    const _self = !!(_ownUi && window[_ownUi]);
    if (!_self && (!window.ALL_QUESTIONS || !Array.isArray(window.ALL_QUESTIONS) || !window.ALL_QUESTIONS.length)) {
      const el = app(); if (el) el.innerHTML = `<div class="container"><div class="empty-state" role="alert">⚠️ Question bank failed to load. Please reload the page.</div></div>`;
      const _c = document.getElementById('page-cover'); if (_c) _c.remove();
      return;
    }
    render();
    document.body.classList.remove('no-fade');
    const _cover = document.getElementById('page-cover');
    if (_cover) _cover.remove();
    if (window.ProgressSync) {
      window.ProgressSync.onChange(() => {
        /* Redraw only the Progress screen, and only when it is on show —
           a status change must never interrupt a question. */
        if (State.screen === 'home' && State.activeTab === 'progress' && !State.confirmModal) render();
      });
      window.ProgressSync.init({ onRemoteChange: onRemoteProgress });
    }
    /* Set just before the reload that follows a restore — see importProgressFromText. */
    try {
      const _imp = sessionStorage.getItem('progressImported');
      if (_imp) {
        sessionStorage.removeItem('progressImported');
        showToast(_imp === 'sync' ? '🔄 Progress synced from your other device'
                : _imp === 'replace' ? '✅ Progress replaced from your file'
                : '✅ Progress combined with your file', 'success');
      }
    } catch (e) {}
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

    // Swipe-between-tabs on touch devices
    (function () {
      let sx = 0, sy = 0;
      const app = document.getElementById('app');
      app.addEventListener('touchstart', (e) => {
        sx = e.touches[0].clientX;
        sy = e.touches[0].clientY;
      }, { passive: true });
      app.addEventListener('touchend', (e) => {
        if (State.screen !== 'home') return;
        const t = e.changedTouches[0];
        const dx = t.clientX - sx;
        const dy = t.clientY - sy;
        // Require a meaningful horizontal movement that's larger than vertical
        if (Math.abs(dx) < 55 || Math.abs(dy) > Math.abs(dx) * 0.75) return;
        // Don't fire if the touch started on an interactive element
        const tag = (e.target || document.body).tagName;
        if (/^(INPUT|SELECT|TEXTAREA|BUTTON)$/.test(tag)) return;
        const tabs = getSubject(_activeSubjectId).tabs;
        const idx = tabs.indexOf(State.activeTab);
        if (idx === -1) return;
        const next = dx < 0 ? idx + 1 : idx - 1; // swipe left → next tab
        if (next < 0 || next >= tabs.length) return;
        State.activeTab = tabs[next];
        render();
      }, { passive: true });
    }());

    document.addEventListener('visibilitychange', () => {
      if (document.hidden && audioCtx && audioCtx.state === 'running') { try { audioCtx.suspend(); } catch (e) {} }
    });
    window.addEventListener('beforeunload', () => { stopMockTimer(); stopDelfTimer(); });
    if (window.matchMedia) {
      try {
        const mq = window.matchMedia('(prefers-color-scheme: dark)');
        const handler = () => { if (Storage.data.settings.darkMode == null) render(); };
        if (mq.addEventListener) mq.addEventListener('change', handler);
        else if (mq.addListener) mq.addListener(handler);
      } catch (e) {}
    }
    // Auto-refresh to the new version when an updated service worker takes control,
    // so users reliably get the latest code/assets instead of a stale cached build.
    if ('serviceWorker' in navigator) {
      var hadController = !!navigator.serviceWorker.controller;
      var reloadingForUpdate = false;
      navigator.serviceWorker.addEventListener('controllerchange', function () {
        // Skip the first-install claim (no previous controller) — only reload on a genuine update.
        if (reloadingForUpdate || !hadController) return;
        reloadingForUpdate = true;
        window.location.reload();
      });
      navigator.serviceWorker.addEventListener('message', function (event) {
        if (event.data && event.data.type === 'SW_UPDATED') {
          showToast('🔄 Updating to the latest version…', 'info');
        }
      });
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
