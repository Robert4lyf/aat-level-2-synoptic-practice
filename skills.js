/* ----------------------------------------------------------
   AAT Level 2 — Skill Taxonomy
   ----------------------------------------------------------
   Every question in the bank is tagged with one skill at load
   time (see ensureSkillTags in app.js). Tagging is rule-based:
   the first matching skill (in order, within the question's
   topic) wins; each topic has a fallback skill.
   Skills power: the learning journey, targeted drills, hints,
   the weakness dashboard and the mock-exam debrief.
   ---------------------------------------------------------- */

window.SKILLS = (function () {
  'use strict';

  var DEFS = [
    /* ── ITBK — Introduction to Bookkeeping ── */
    { id: 'itbk-cogs', topic: 'itbk', name: 'Cost of sales & closing inventory', icon: '📉',
      hint: 'Cost of sales is what the goods sold actually cost, not what was bought: opening inventory plus purchases less what is left on the shelf.',
      formula: 'COGS = Opening inventory + Purchases − Closing inventory · Gross profit = Revenue − COGS',
      match: [/cost of sales|\bcogs\b|closing inventory|opening inventory|gross profit/i] },
    { id: 'itbk-vat', topic: 'itbk', name: 'VAT calculations', icon: '🧾',
      hint: 'Decide whether the figure you have is NET (before VAT) or GROSS (VAT-inclusive) before you calculate.',
      formula: 'VAT = Net × 20% · Gross = Net × 1.20 · Net = Gross ÷ 1.20 · VAT from gross = Gross ÷ 6',
      match: [/\bvat\b|output tax|input tax|gross amount|net amount|hmrc/i] },
    { id: 'itbk-docs', topic: 'itbk', name: 'Documents & books of prime entry', icon: '📄',
      hint: 'Follow the document trail: order → delivery note → invoice → (credit note) → statement → remittance advice. Each day book collects one document type.',
      formula: null,
      match: [/invoice|credit note|day book|prime entry|delivery note|purchase order|remittance|statement of account|petty cash voucher|source document/i] },
    { id: 'itbk-cashbook', topic: 'itbk', name: 'Cash book, bank & discounts', icon: '💷',
      hint: 'The cash book is both a book of prime entry and part of the ledger. Money IN is debited; money OUT is credited. Discounts allowed are an expense; discounts received are income.',
      formula: 'Imprest top-up = float − cash remaining',
      match: [/cash book|petty cash|imprest|discount|float|cheque|standing order/i] },
    { id: 'itbk-tb', topic: 'itbk', name: 'Trial balance & the accounting equation', icon: '🧮',
      hint: 'Assets = Capital + Liabilities. Debit balances: assets, expenses, drawings. Credit balances: liabilities, income, capital.',
      formula: 'Assets = Capital + Liabilities · Closing capital = Opening + Capital introduced + Profit − Drawings',
      match: [/trial balance|accounting equation|assets =|capital|drawings|liabilit/i] },
    { id: 'itbk-de', topic: 'itbk', name: 'Double entry essentials', icon: '⚖️',
      hint: 'Use DEAD CLIC: Debits — Expenses, Assets, Drawings. Credits — Liabilities, Income, Capital. Ask: what is the business receiving, and what is it giving?',
      formula: null,
      match: [/.*/] },

    /* ── POBC — Principles of Bookkeeping Controls ── */
    { id: 'pobc-payroll', topic: 'pobc', name: 'Payroll', icon: '👥',
      hint: 'Separate what the employee costs the business from what the employee takes home. Deductions (PAYE, employee NIC, pension) are owed to third parties — they are liabilities, not expenses.',
      formula: "Net pay = Gross − PAYE − Employee NIC − Pension · Total cost = Gross + Employer's NIC + Employer pension",
      match: [/payroll|gross pay|net pay|paye|\bnic\b|pension|payslip|wages.*(deduct|employer|hmrc)|salar/i] },
    { id: 'pobc-bankrec', topic: 'pobc', name: 'Bank reconciliation', icon: '🏦',
      hint: 'First update the cash book for items only on the statement (charges, direct debits, credits). Only timing differences — unpresented cheques and outstanding lodgements — belong in the reconciliation itself.',
      formula: 'Bank statement balance = Cash book balance + unpresented cheques − outstanding lodgements',
      match: [/reconcil|unpresented|outstanding lodgement|bank statement|direct debit|bank charges|dishonoured/i] },
    { id: 'pobc-susp', topic: 'pobc', name: 'Suspense accounts & journals', icon: '❓',
      hint: 'The suspense entry sits on whichever side makes the trial balance agree. To clear it: work out what WAS posted, what SHOULD have been posted, and journal the difference.',
      formula: null,
      match: [/suspense|journal entr|journal to correct|correcting journal/i] },
    { id: 'pobc-errors', topic: 'pobc', name: 'Errors & the trial balance', icon: '🔍',
      hint: 'Six error types leave the trial balance agreeing: omission, commission, principle, original entry, reversal, compensating. Single-sided, casting and transposition errors break it.',
      formula: null,
      match: [/error|transposition|omission|commission|principle\b|compensating|reversal|casting/i] },
    { id: 'pobc-tb', topic: 'pobc', name: 'Trial balances', icon: '⚖️',
      hint: 'Transfer the balance brought down, never the account total. DEAD CLIC decides the column: Debit — Expenses, Assets, Drawings; Credit — Liabilities, Income, Capital. A journal on the same side as the balance increases it; on the opposite side it decreases it.',
      formula: 'Redrafted balance = Original balance ± journal (add if the journal is on the same side, subtract if opposite)',
      match: [/initial trial balance|redraft|adjusted trial balance|extract.*balances|debit column|credit column/i] },
    { id: 'pobc-ca', topic: 'pobc', name: 'Control accounts', icon: '🔒',
      hint: 'The SLCA mirrors customer activity (Dr sales, Cr receipts/returns); the PLCA mirrors suppliers (Cr purchases, Dr payments/returns). The control total must agree with the list of individual balances.',
      formula: 'Closing SLCA = Opening + Credit sales − Receipts − Sales returns − Irrecoverable debts − Discounts allowed − Contras',
      match: [/.*/] },

    /* ── POC — Principles of Costing ── */
    { id: 'poc-inv', topic: 'poc', name: 'Inventory valuation', icon: '📦',
      hint: 'FIFO issues the OLDEST cost first, so closing inventory carries the newest prices. LIFO issues the newest first, leaving the oldest prices in stock. AVCO recalculates a weighted average after every receipt. LIFO is examined for internal use only — it is not permitted under IFRS or UK GAAP.',
      formula: 'AVCO rate = total cost of inventory ÷ total units, recalculated after each purchase',
      match: [/fifo|avco|lifo|inventory|issue.*units|closing stock/i] },
    { id: 'poc-labour', topic: 'poc', name: 'Labour costs', icon: '🛠️',
      hint: 'Identify the pay basis first: time rate (hours × rate), piecework (units × rate per unit) or bonus schemes. Overtime premium is often treated separately from basic pay.',
      formula: 'Time-rate pay = hours × rate (+ overtime hours × premium) · Piecework = units made × rate per unit',
      match: [/labour|overtime|piecework|time rate|time-rate|bonus|hourly rate|basic pay/i] },
    { id: 'poc-budget', topic: 'poc', name: 'Budgets & variances', icon: '📊',
      hint: 'Variance = actual − budget. A variance is ADVERSE when it makes profit lower (costs up or income down) and FAVOURABLE when it makes profit higher.',
      formula: 'Variance = Actual − Budgeted · Significant if large relative to budget (e.g. above a % threshold)',
      match: [/budget|variance|adverse|favourable/i] },
    { id: 'poc-oar', topic: 'poc', name: 'Overhead absorption & margins', icon: '📈',
      hint: 'Allocate what belongs to one centre, apportion what is shared, then absorb into units at a budgeted rate. For margins, be clear whether the percentage is of COST (mark-up) or of SALES (margin).',
      formula: 'OAR = Budgeted overheads ÷ Budgeted activity · Absorbed = OAR × ACTUAL activity · Under-absorbed if absorbed < incurred · Mark-up % on cost; margin % on sales',
      match: [/absorption|oar\b|overhead absorption|apportion|allocat|mark.up|\bmargin\b/i] },
    { id: 'poc-coding', topic: 'poc', name: 'Coding & responsibility centres', icon: '🏷️',
      hint: 'A cost centre incurs costs only; a profit centre also earns revenue; an investment centre additionally controls capital spending. Codes simply route each cost to the right centre.',
      formula: null,
      match: [/cod(e|ing)|cost centre|profit centre|investment centre|revenue centre|responsibility/i] },
    { id: 'poc-product', topic: 'poc', name: 'Product cost & the manufacturing account', icon: '🏗️',
      hint: 'Build the cost upwards in named layers: direct cost, then manufacturing cost, then cost of goods manufactured, then cost of goods sold. Each layer adds one thing and each has a name the marker is looking for.',
      formula: 'Direct cost = materials + labour + direct expenses · Manufacturing cost = direct cost + production overhead · Cost of goods manufactured = manufacturing cost + opening WIP − closing WIP · Cost of goods sold = cost of goods manufactured + opening finished goods − closing finished goods',
      match: [/manufacturing account|cost of goods manufactured|cost of goods sold|prime cost|direct cost|work in progress|\bwip\b|service organisation/i] },
    { id: 'poc-systems', topic: 'poc', name: 'Costing systems & information sources', icon: '🗂️',
      hint: 'Financial accounting reports history to outsiders in one total; costing analyses the same transactions for insiders, using actual or budgeted figures, at whatever level of detail a decision needs.',
      formula: null,
      match: [/financial accounting system|costing system|historic cost|source of information|budgeted cost.*planning|planning and control/i] },
    { id: 'poc-ss', topic: 'poc', name: 'Spreadsheets for cost calculations', icon: '📐',
      hint: 'Reference cells, never retype numbers. =SUM(B2:B10) for a range with a colon, no commas, no spaces, and no brackets around a single cell.',
      formula: '=SUM(B2:B10) · =B2+C2 · =B2-C2 · =B2*C2 · =B2/C2',
      match: [/spreadsheet|=sum|cell reference|format.*cell|formula bar|thousand separator/i] },
    { id: 'poc-behaviour', topic: 'poc', name: 'Cost classification & behaviour', icon: '🧱',
      hint: 'Test the cost against activity: fixed stays the same in total, variable moves in direct proportion, stepped jumps at capacity points, semi-variable mixes both. Direct costs trace to the product; indirect costs are overheads.',
      formula: 'Total cost = fixed element + (variable per unit × units) · Fixed cost per unit = fixed total ÷ units, so it falls as output rises',
      match: [/.*/] },

    /* ── BESY — The Business Environment ── */
    { id: 'besy-law', topic: 'besy', name: 'Contract law & legislation', icon: '⚖️',
      hint: 'A binding contract needs offer, acceptance, consideration and intention to create legal relations. An invitation to treat (e.g. goods on a shelf) is not an offer.',
      formula: null,
      match: [/contract|offer|acceptance|consideration|breach|invitation to treat|legislation|gdpr|data protection|employment (law|right)|health and safety|discriminat/i] },
    { id: 'besy-ethics', topic: 'besy', name: 'Ethics & sustainability', icon: '🌱',
      hint: 'The five fundamental principles: integrity, objectivity, professional competence and due care, confidentiality, professional behaviour. Sustainability balances profit with people and planet.',
      formula: null,
      match: [/ethic|integrity|objectivity|confidential|due care|professional behaviour|competence|sustainab|csr|corporate social|environment|bribe|whistleblow|money launder/i] },
    { id: 'besy-econ', topic: 'besy', name: 'The economy & markets', icon: '💹',
      hint: 'Sketch the demand/supply move first, then read off price and quantity. For elasticity, compare the size of the percentage changes.',
      formula: 'PED = %Δ demand ÷ %Δ price (ignore sign): >1 elastic, <1 inelastic',
      match: [/demand|supply|elastic|inflation|interest rate|exchange rate|market|competition|monopol|economy|economic|gdp|recession/i] },
    { id: 'besy-tech', topic: 'besy', name: 'Technology & data security', icon: '💻',
      hint: 'Think CIA: confidentiality, integrity, availability. Match the control to the threat — passwords and access rights protect confidentiality; backups protect availability.',
      formula: null,
      match: [/software|cloud|cyber|password|phishing|malware|virus|technolog|digital|spreadsheet|automation|artificial intelligence|backup|encrypt/i] },
    { id: 'besy-finance', topic: 'besy', name: 'Finance & the accounting function', icon: '🏛️',
      hint: 'Place the accounting function in context: who it reports to, which external bodies regulate it, and how finance supports the other business functions.',
      formula: null,
      match: [/accounting function|finance function|hmrc|companies house|regulator|audit|funding|source of finance|bank loan|overdraft|invoice (finance|discounting)/i] },
    { id: 'besy-comms', topic: 'besy', name: 'Business communication & planning', icon: '✉️',
      hint: 'Match the medium to the audience and purpose: email for a routine internal update, letter for a formal external matter, report for analysis. Open with the purpose, give the figures, say what happens next.',
      formula: null,
      match: [/email|e-mail|letter|memo|report writing|communicat|professional tone|audience|meeting|agenda|minutes|draft (a|an)|business plan|planning tool/i] },
    { id: 'besy-structure', topic: 'besy', name: 'Business types & organisation', icon: '🏢',
      hint: 'Key split: is the owner legally separate from the business? Sole traders and ordinary partnerships are NOT separate (unlimited liability); companies and LLPs are.',
      formula: null,
      match: [/.*/] },
  ];

  var BY_ID = {};
  DEFS.forEach(function (d) { BY_ID[d.id] = d; });

  function questionText(q) {
    var parts = [q.q, q.exp, q.setup, q.template, q.task, q.modelAnswer];
    if (Array.isArray(q.parts)) q.parts.forEach(function (p) { parts.push(p.q, p.exp); });
    if (Array.isArray(q.statements)) q.statements.forEach(function (s) { parts.push(s.text); });
    if (Array.isArray(q.opts)) parts.push(q.opts.join(' '));
    if (!q.q && typeof q.generate === 'function') {
      try { var g = q.generate(); if (g) { parts.push(g.q, g.exp); } } catch (e) {}
    }
    return parts.filter(Boolean).join(' ');
  }

  function tag(q) {
    // An explicitly authored skill always wins over the rule-based guess.
    if (q.skill && BY_ID[q.skill]) return q.skill;
    var text = questionText(q);
    for (var i = 0; i < DEFS.length; i++) {
      var d = DEFS[i];
      if (d.topic !== q.topic) continue;
      for (var j = 0; j < d.match.length; j++) {
        if (d.match[j].test(text)) return d.id;
      }
    }
    // Topic had no fallback hit (shouldn't happen — each topic ends with /.*/)
    var any = DEFS.filter(function (d) { return d.topic === q.topic; });
    return any.length ? any[any.length - 1].id : null;
  }

  return {
    defs: DEFS,
    byId: function (id) { return BY_ID[id] || null; },
    forTopic: function (topicId) { return DEFS.filter(function (d) { return d.topic === topicId; }); },
    tag: tag,
  };
})();
