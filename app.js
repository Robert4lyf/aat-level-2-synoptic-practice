/* AAT Level 2 Synoptic Practice — App Logic (rebuilt with numeric Q + calculator) */
(function () {
  'use strict';

  /* ── CONSTANTS ── */
  const STORAGE_KEY = 'aatPrep_v2';
  const PASS_MARK = 70;
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
    ],
  };
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
    settings: { darkMode: null, soundOn: true, seenSplash: false, refOpen: false },
    stats: {
      questions: {}, topics: {},
      streak: { current: 0, best: 0, lastCorrectAt: 0 },
    },
    flagged: {},
    sr: {},
    history: [], session: null,
    learn: { lessons: {}, xp: 0, flashReviews: 0, taDone: {} },
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
        const raw = localStorage.getItem(STORAGE_KEY);
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
    save() { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data)); } catch (e) {} },
    recordAnswer(question, correct) {
      const qs = this.data.stats.questions[question.id] || { attempts: 0, correct: 0, lastSeen: null };
      qs.attempts++; qs.seen = true;
      if (correct) qs.correct++;
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
      this.data.learn.xp += n;
      this.day().xp += n;
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
    isDarkActive() {
      const s = this.data.settings.darkMode;
      return s == null ? prefersDark() : !!s;
    },
    clearAll() { try { localStorage.removeItem(STORAGE_KEY); } catch (e) {} this.data = defaultData(); },
  };

  /* ── SKILLS ── */
  function ensureSkillTags() {
    if (!window.SKILLS) return;
    for (const q of window.ALL_QUESTIONS) {
      if (!q.skill) q.skill = window.SKILLS.tag(q);
    }
  }
  function skillById(id) { return (window.SKILLS && id) ? window.SKILLS.byId(id) : null; }
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
    { id: 'first-lesson', icon: '🐣', name: 'First steps', desc: 'Complete your first lesson' },
    { id: 'ten-lessons', icon: '📚', name: 'Bookworm', desc: 'Complete 10 lessons' },
    { id: 'path-complete', icon: '🗺️', name: 'Trailblazer', desc: 'Complete the whole journey' },
    { id: 'hundred-q', icon: '💯', name: 'Century', desc: 'Answer 100 questions' },
    { id: 'streak-15', icon: '🎯', name: 'Sharpshooter', desc: 'Get 15 answers right in a row' },
    { id: 'mock-pass', icon: '🏅', name: 'Exam ready', desc: 'Pass a mock exam (70%+)' },
    { id: 'mock-90', icon: '🌟', name: 'Distinction', desc: 'Score 90%+ on a mock exam' },
    { id: 'mistakes-10', icon: '🔁', name: 'Comeback', desc: 'Clear 10 mistakes from your notebook' },
    { id: 'flash-50', icon: '🃏', name: 'Card shark', desc: 'Review 50 flashcards' },
    { id: 'days-7', icon: '🔥', name: '7-day habit', desc: 'Study on 7 days in a row' },
    { id: 'xp-500', icon: '⚡', name: 'Power learner', desc: 'Earn 500 XP' },
    { id: 'ta-all', icon: '🧰', name: 'Ledger legend', desc: 'Finish every guided T-account exercise' },
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
      case 'streak-15': return (d.stats.streak && d.stats.streak.best >= 15);
      case 'mock-pass': return d.history.some(h => h.mode === 'mock' && h.pct >= PASS_MARK);
      case 'mock-90': return d.history.some(h => h.mode === 'mock' && h.pct >= 90);
      case 'mistakes-10': return Storage.clearedMistakeCount() >= 10;
      case 'flash-50': return d.learn.flashReviews >= 50;
      case 'days-7': return Storage.studyDayStreak() >= 7;
      case 'xp-500': return d.learn.xp >= 500;
      case 'ta-all': return TA_EXERCISES.every(ex => d.learn.taDone[ex.id]);
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

  function isNumeric(q) { return q && q.type === 'numeric'; }
  function isDragDrop(q) { return q && q.type === 'dragdrop'; }
  function isTableFill(q) { return q && q.type === 'tablefill'; }
  function isScenario(q) { return q && q.type === 'scenario'; }
  function isGapFill(q) { return q && q.type === 'gapfill'; }
  function isSimpleMcq(q) { return q && (!q.type || q.type === 'mcq'); }
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
    glossaryQuery: '', toast: null, toastTimer: null,
    ddSelectedLeft: null, ddMap: {},        // drag-drop UI state
    tfDraft: {},                            // table-fill blank inputs
    scDraft: {},                            // scenario sub-answers
    gfDraft: {},                            // gap-fill dropdown selections
    referenceOpen: false,
    taEntries: [],                          // T-account playground postings
    taForm: { desc: '', amount: '', dr: '', cr: '' },
    taExercise: null, taCheck: null,        // guided T-account exercise state
    hintLevel: 0, hintElim: null,           // progressive hints (practice mode)
    lesson: null,                           // lesson player state
    flash: null,                            // flashcard session state
    plannerEdit: false,                     // study-planner edit form open
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
    else pool = window.ALL_QUESTIONS.filter(q => q.topic === topicId);
    if (!pool.length) {
      const empty = {
        'flagged': 'No flagged questions yet — star questions during practice.',
        'sr-due': 'No questions are due for review right now. Come back later!',
        'mistakes': 'Your mistake notebook is empty — nothing to clear. 🎉',
      };
      showToast(empty[topicId] || 'No questions in this set.', 'warn');
      return;
    }
    const picked = shuffle(pool).slice(0, Math.min(PRACTICE_LENGTH, pool.length)).map(presentQuestion);
    if (picked.length === 0) { goHome(); return; }
    Object.assign(State, {
      screen:'quiz', mode:'practice', selectedTopic:topicId, questions:picked,
      current:0, answered:null, answers:[], score:0, results:[],
      showReview:false, reviewFilter:'all', timedOut:false, numericDraft:'',
      ddSelectedLeft:null, ddMap:{}, tfDraft:{}, scDraft:{}, gfDraft:{},
      hintLevel:0, hintElim:null,
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
    const weighted = window.ALL_QUESTIONS.map(q => {
      let w = 1;
      const s = acc[q.skill];
      if (s && s.attempts >= 3 && (s.correct / s.attempts) < 0.7) w *= 3;       // weak skill
      const sr = Storage.data.sr[q.id];
      if (sr && sr.box >= 1 && sr.dueAt <= now) w *= 2;                          // due for review
      const qs = Storage.data.stats.questions[q.id];
      if (!qs) w *= 1.5;                                                         // never seen
      else if (qs.attempts > 0 && qs.correct === 0) w *= 2;                      // never got right
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
    Object.assign(State, {
      screen:'quiz', mode:'practice', selectedTopic:'smart', questions:picked,
      current:0, answered:null, answers:[], score:0, results:[],
      showReview:false, reviewFilter:'all', timedOut:false, numericDraft:'',
      ddSelectedLeft:null, ddMap:{}, tfDraft:{}, scDraft:{}, gfDraft:{},
      hintLevel:0, hintElim:null,
    });
    Calc.reset(); saveSession(); render();
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
    State.lesson = { unit: found.unit, def: found.lesson, phase: 'teach', cardIdx: 0, qIdx: 0, qAnswered: null, qScore: 0 };
    render();
  }
  function lessonContinue() {
    const L = State.lesson; if (!L) return;
    if (L.phase === 'teach') {
      if (L.cardIdx + 1 < L.def.cards.length) { L.cardIdx++; }
      else { L.phase = 'quiz'; L.qIdx = 0; L.qAnswered = null; L.qScore = 0; }
      render();
    } else if (L.phase === 'quiz' && L.qAnswered !== null) {
      if (L.qIdx + 1 < L.def.check.length) { L.qIdx++; L.qAnswered = null; render(); }
      else finishLesson();
    }
  }
  function lessonBack() {
    const L = State.lesson; if (!L || L.phase !== 'teach' || L.cardIdx === 0) return;
    L.cardIdx--; render();
  }
  function lessonAnswer(idx) {
    const L = State.lesson; if (!L || L.phase !== 'quiz' || L.qAnswered !== null) return;
    const q = L.def.check[L.qIdx];
    L.qAnswered = idx;
    const correct = idx === q.ans;
    if (correct) { L.qScore++; Storage.addXp(2); playCorrect(); } else { playWrong(); }
    Storage.save();
    render();
  }
  function finishLesson() {
    const L = State.lesson; if (!L) return;
    const total = L.def.check.length;
    const pct = total ? Math.round((L.qScore / total) * 100) : 0;
    const stars = pct >= 100 ? 3 : pct >= 75 ? 2 : pct >= 50 ? 1 : 0;
    L.phase = 'done'; L.pct = pct; L.stars = stars;
    if (pct >= 50) {
      L.firstTime = Storage.completeLesson(L.def.id, stars, pct);
      Storage.save();
      checkBadges();
      if (stars === 3) setTimeout(confetti, 300);
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
    State.lesson = null; State.flash = null;
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

  /* ── STUDY PLANNER ── */
  function savePlanner() {
    const dateEl = document.getElementById('plannerDate');
    const goalEl = document.getElementById('plannerGoal');
    if (!dateEl) return;
    const v = dateEl.value;
    if (!v) { showToast('Pick your exam date first.', 'warn'); return; }
    Storage.data.planner.examDate = v;
    if (goalEl) Storage.data.planner.dailyGoalXp = +goalEl.value || 30;
    Storage.save();
    State.plannerEdit = false;
    showToast('Study plan saved. Good luck! 🎯', 'success');
    render();
  }
  function nextLessonToDo() {
    for (const unit of (window.LEARN_PATH || [])) {
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
      const ok = chosenRight === leftIdx;
      if (ok) correct++;
      return { leftIdx, chosenRight, ok };
    });
    const allRight = correct === totalPairs;
    State.answered = { kind: 'dragdrop', correct: allRight, perPair, score: correct, total: totalPairs };
    if (allRight) { State.score++; playCorrect(); } else { playWrong(); }
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
    Storage.recordAnswer(q, allRight); Storage.save();
    const chosenSummary = perGap.map(g => g.chosen == null ? '—' : g.chosen).join(' / ');
    const correctSummary = perGap.map(g => g.correctText).join(' / ');
    State.results.push({ id:q.id, q:q.q || 'Gap-fill', correct:allRight, chosen: chosenSummary, correctOpt: correctSummary, exp:q.exp, topic:q.topic, skill:q.skill });
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
    if (State.current + 1 >= State.questions.length) finishPractice();
    else {
      State.current++; State.answered = null; State.numericDraft = '';
      State.ddSelectedLeft = null; State.ddMap = {}; State.tfDraft = {}; State.scDraft = {}; State.gfDraft = {};
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
    Storage.save();
    checkBadges();
    if (pct >= PASS_MARK) setTimeout(confetti, 300);
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
    else if (State.screen === 'home')   html = renderMain();
    else if (State.screen === 'quiz')   html = renderQuiz();
    else if (State.screen === 'score')  html = renderScore();
    else if (State.screen === 'lesson') html = renderLesson();
    else if (State.screen === 'flash')  html = renderFlash();
    if (State.confirmModal) html += renderModal(State.confirmModal);
    el.innerHTML = html;
    attachEvents();
    const isDark = Storage.isDarkActive();
    document.body.classList.toggle('dark', isDark);
    const dt = document.getElementById('darkToggle');
    if (dt) { dt.textContent = isDark ? '☀️ Light' : '🌙 Dark'; dt.setAttribute('aria-pressed', isDark ? 'true' : 'false'); }
    if (State.confirmModal) { const mc = document.getElementById('modalConfirm'); if (mc) mc.focus(); }
    const ni = document.getElementById('numericAnswer');
    if (ni && !ni.disabled && State.screen === 'quiz') {
      try { ni.focus(); if (State.mode === 'practice' && State.numericDraft) ni.setSelectionRange(ni.value.length, ni.value.length); } catch (e) {}
    }
    if (State.screen === 'home' && State.activeTab === 'progress') animateCounters();
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
    const tabs = [ {id:'learn',label:'🗺️ Learn'}, {id:'home',label:'🎯 Practice'}, {id:'tools',label:'🧰 T-Accounts'}, {id:'glossary',label:'📖 Glossary'}, {id:'progress',label:'📈 Progress'}, {id:'howto',label:'ℹ️ How to Use'} ];
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
    const progressBlock = `<div class="hero-progress" role="group" aria-label="Lifetime progress summary">
      <div class="hero-stat"><div class="hero-label">Seen</div><div class="hero-value">${prog.seen}<span class="hero-sub"> / ${prog.total}</span></div><div class="hero-bar"><div class="hero-bar-fill" style="width:${prog.seenPct}%"></div></div></div>
      <div class="hero-stat"><div class="hero-label">Mastery</div><div class="hero-value">${prog.masteryPct}<span class="hero-sub">%</span></div><div class="hero-bar"><div class="hero-bar-fill mastery" style="width:${prog.masteryPct}%"></div></div></div>
      <div class="hero-stat"><div class="hero-label">Streak 🔥</div><div class="hero-value">${streak.current}<span class="hero-sub"> · best ${streak.best}</span></div></div>
    </div>`;

    window.TOPICS.forEach(t => { counts[t.id] = window.ALL_QUESTIONS.filter(q => q.topic === t.id).length; });
    const topicMastery = (id) => {
      const ts = Storage.data.stats.topics[id];
      if (!ts || !ts.attempts) return null;
      return Math.round((ts.correct / ts.attempts) * 100);
    };

    const extraCards = [];
    if (srDueCount > 0) extraCards.push(`<button class="topic-card extra-card fade-in" type="button" data-topic="sr-due" aria-label="Spaced repetition — ${srDueCount} due">
      <div class="icon sr-icon" aria-hidden="true">⏰</div>
      <h3>Due for review</h3>
      <p>Spaced repetition: cards scheduled for today.</p>
      <div class="count">${srDueCount} due now</div>
    </button>`);
    if (flaggedCount > 0) extraCards.push(`<button class="topic-card extra-card fade-in" type="button" data-topic="flagged" aria-label="Practice flagged — ${flaggedCount} questions">
      <div class="icon flag-icon" aria-hidden="true">⭐</div>
      <h3>Flagged for review</h3>
      <p>Questions you've starred for revision.</p>
      <div class="count">${flaggedCount} flagged</div>
    </button>`);
    if (wrongCount > 0) extraCards.push(`<button class="topic-card extra-card fade-in" type="button" data-topic="review-wrong" aria-label="Practice wrong — ${wrongCount} questions">
      <div class="icon wrong-icon" aria-hidden="true">🎯</div>
      <h3>Target weak spots</h3>
      <p>Questions you've never got right.</p>
      <div class="count">${wrongCount} to retry</div>
    </button>`);

    return `${sessionBanner}${progressBlock}
      <div class="sound-row">
        <label for="soundToggle" style="cursor:pointer">🔊 Sound effects</label>
        <label class="toggle-switch"><input type="checkbox" id="soundToggle" ${Storage.data.settings.soundOn ? 'checked' : ''} aria-label="Sound effects"><span class="toggle-slider" aria-hidden="true"></span></label>
      </div>
      <h2 class="section-title" style="margin-top:0">Practice by Topic <span style="font-weight:400;color:var(--subtext);font-size:.8rem">(${PRACTICE_LENGTH} questions, with feedback)</span></h2>
      <div class="home-grid">
        ${window.TOPICS.map(t => {
          const m = topicMastery(t.id);
          const badge = m == null ? '' : `<span class="mastery-badge ${scoreClass(m)}" title="Topic mastery">${m}%</span>`;
          return `<button class="topic-card fade-in" type="button" data-topic="${t.id}" data-topic-color="${t.id}" aria-label="Practice ${escapeHtml(t.name)} — ${counts[t.id]} questions">
            ${badge}
            <div class="icon" aria-hidden="true">${t.icon}</div>
            <h3>${escapeHtml(t.name)}</h3>
            <p>${escapeHtml(t.desc)}</p>
            <div class="count">${counts[t.id]} questions in bank</div>
          </button>`;
        }).join('')}
        ${extraCards.join('')}
      </div>
      <div style="margin-top:24px">
        <h2 class="section-title" style="margin-top:0">Mixed & Mock</h2>
        <button class="all-topics-btn" type="button" data-topic="all">🎯 Mixed Practice — ${PRACTICE_LENGTH} Questions</button>
        <button class="mock-exam-btn" id="mockBtn" type="button">⏱ Start Mock Exam — ${MOCK_LENGTH}Q · ${Math.round(MOCK_DURATION_MS / 60000)} min</button>
      </div>
      <div style="margin-top:24px">
        <h2 class="section-title" style="margin-top:0">Smart Modes</h2>
        <button class="all-topics-btn smart-practice-btn" id="smartPracticeBtn" type="button">🧠 Smart Practice — adapts to your weak areas</button>
        <button class="all-topics-btn flash-start-btn" id="flashcardsBtn" type="button">🃏 Flashcards — glossary term review</button>
        ${Storage.activeMistakeIds().length > 0 ? `<button class="all-topics-btn mistakes-drill-btn" type="button" data-topic="mistakes">📝 Mistake Notebook — ${Storage.activeMistakeIds().length} to clear</button>` : ''}
      </div>`;
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
      ['Track your progress', 'Lifetime stats, streaks and recent attempts are saved on this device under the Progress tab. Export to CSV any time.'],
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
    const stats = Storage.data.stats, history = Storage.data.history;
    const totalAttempts = Object.values(stats.questions).reduce((s, q) => s + q.attempts, 0);
    const totalCorrect = Object.values(stats.questions).reduce((s, q) => s + q.correct, 0);
    const accuracy = totalAttempts ? Math.round((totalCorrect / totalAttempts) * 100) : 0;
    const sessionsRun = history.length;
    const streak = stats.streak || { current: 0, best: 0 };
    if (totalAttempts === 0) return `<h2 class="section-title">Your Progress</h2><div class="empty-state">No data yet. Complete a practice round to start tracking your progress.</div>`;
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
    const historyRows = history.map(h => {
      const cls = scoreClass(h.pct);
      const date = new Date(h.timestamp);
      const when = date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const modeLabel = h.mode === 'mock' ? '⏱ Mock' : '📝 Practice';
      const topicLabel = h.topic === 'all' ? 'Mixed' : (window.TOPICS.find(t => t.id === h.topic) || {}).short || '';
      const timedOutBadge = h.timedOut ? ' <span style="color:var(--wrong-text);font-size:.7rem">(timed out)</span>' : '';
      return `<div class="history-row">
        <div><div class="ht-mode">${modeLabel} <span style="color:var(--subtext);font-weight:400">· ${escapeHtml(topicLabel)}</span></div>
        <div class="ht-meta">${escapeHtml(when)}${timedOutBadge}</div></div>
        <div class="ht-score ${cls}">${h.score}/${h.total} · ${h.pct}%</div>
      </div>`;
    }).join('');
    return `<h2 class="section-title">Your Progress</h2>
      <div class="stats-grid">
        <div class="stat-card"><div class="stat-num" data-count="${totalAttempts}">${totalAttempts}</div><div class="stat-label">Questions answered</div></div>
        <div class="stat-card"><div class="stat-num" data-count="${accuracy}" data-suffix="%">${accuracy}%</div><div class="stat-label">Lifetime accuracy</div></div>
        <div class="stat-card"><div class="stat-num" data-count="${sessionsRun}">${sessionsRun}</div><div class="stat-label">Sessions completed</div></div>
        <div class="stat-card"><div class="stat-num" data-count="${Object.keys(stats.questions).length}">${Object.keys(stats.questions).length}</div><div class="stat-label">Unique questions seen</div></div>
        <div class="stat-card"><div class="stat-num" data-count="${streak.current}">${streak.current}</div><div class="stat-label">🔥 Current streak</div></div>
        <div class="stat-card"><div class="stat-num" data-count="${streak.best}">${streak.best}</div><div class="stat-label">🏆 Best streak</div></div>
      </div>
      <div class="breakdown" style="background:var(--card);border:1px solid var(--border);padding:16px;border-radius:11px;margin-bottom:20px">
        <div class="breakdown-title">Accuracy by topic</div>${topicRows}
      </div>
      <h2 class="section-title" style="margin-top:0">Recent attempts</h2>
      <div class="history-list">${historyRows || '<div class="empty-state">No attempts yet.</div>'}</div>
      <div class="progress-actions">
        <button class="btn-secondary action-btn" id="exportCsvBtn" type="button">📥 Export progress (CSV)</button>
        <button class="danger-btn" id="clearProgressBtn" type="button">🗑 Clear all progress</button>
      </div>`;
  }

  function exportCsv() {
    const stats = Storage.data.stats;
    const lines = [];
    lines.push('"Section","Field","Value"');
    lines.push(`"Summary","Total attempts","${Object.values(stats.questions).reduce((s,q)=>s+q.attempts,0)}"`);
    lines.push(`"Summary","Total correct","${Object.values(stats.questions).reduce((s,q)=>s+q.correct,0)}"`);
    lines.push(`"Summary","Current streak","${stats.streak ? stats.streak.current : 0}"`);
    lines.push(`"Summary","Best streak","${stats.streak ? stats.streak.best : 0}"`);
    lines.push('');
    lines.push('"Topic","Attempts","Correct","Accuracy %"');
    window.TOPICS.forEach(t => {
      const ts = stats.topics[t.id] || { attempts: 0, correct: 0 };
      const acc = ts.attempts ? Math.round((ts.correct / ts.attempts) * 100) : 0;
      lines.push(`"${t.short}","${ts.attempts}","${ts.correct}","${acc}"`);
    });
    lines.push('');
    lines.push('"Attempt date","Mode","Topic","Score","Total","Percent"');
    Storage.data.history.forEach(h => {
      const date = new Date(h.timestamp).toISOString();
      const topicLabel = h.topic === 'all' ? 'Mixed' : (window.TOPICS.find(t => t.id === h.topic) || { short: '' }).short;
      lines.push(`"${date}","${h.mode}","${topicLabel}","${h.score}","${h.total}","${h.pct}"`);
    });
    try {
      const csv = lines.join('\r\n');
      const blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url; a.download = `aat-progress-${new Date().toISOString().slice(0,10)}.csv`;
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1500);
      showToast('Progress exported as CSV.', 'success');
    } catch (e) { showToast('Export failed — try again.', 'error'); }
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
        feedbackHtml = `<div class="feedback ${correct ? 'correct' : 'wrong'} fade-in" role="status" aria-live="polite">
          <strong>${correct ? '✅ Correct' : '❌ Incorrect'}</strong><br>
          ${!correct ? `<span>Your answer: ${escapeHtml(formatNumericValue(q, State.answered))}</span><br><span>Correct answer: ${escapeHtml(formatNumericValue(q, q.answer))}</span><br><br>` : ''}
          <em>${escapeHtml(q.exp)}</em>
        </div>
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
    return `<div class="container">
      <button class="back-btn" id="exitBtn" type="button">← Back to topics</button>
      <div class="quiz-layout ${numeric ? 'has-calc' : ''}">
        <div class="quiz-container slide-in">
          <div class="quiz-header">
            <span class="topic-pill">${topic.icon} ${escapeHtml(topic.short)}</span>
            ${numeric ? '<span class="numeric-pill">🧮 Numeric</span>' : ''}
            <button class="flag-btn ${flagged ? 'is-flagged' : ''}" id="flagBtn" type="button" aria-pressed="${flagged}" aria-label="${flagged ? 'Unflag this question' : 'Flag this question for review'}" title="${flagged ? 'Flagged — click to remove' : 'Flag for review'}">${flagged ? '⭐' : '☆'}</button>
            <div class="progress-wrap">
              <div class="progress-bar-bg" role="progressbar" aria-valuenow="${State.current + 1}" aria-valuemin="0" aria-valuemax="${total}"><div class="progress-bar" style="width:${pct}%"></div></div>
              <div class="progress-label">${State.current + 1} of ${total} completed</div>
            </div>
            <span class="q-counter">Q${State.current + 1}/${total}</span>
          </div>
          <div class="question-text">${escapeHtml(q.q)}</div>
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
        ${numeric ? renderCalculatorSidebar() : ''}
      </div>
    </div>`;
  }

  function renderDragDropQuiz(q) {
    const total = State.questions.length;
    const pct = ((State.current + 1) / total * 100).toFixed(0);
    const topic = window.TOPICS.find(t => t.id === q.topic) || { icon: '🧩', short: 'Mixed' };
    const answered = State.answered !== null;
    const flagged = Storage.isFlagged(q.id);
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
        ${renderCalculatorSidebar()}
      </div>
    </div>`;
  }

  function renderScenarioQuiz(q) {
    const total = State.questions.length;
    const pct = ((State.current + 1) / total * 100).toFixed(0);
    const topic = window.TOPICS.find(t => t.id === q.topic) || { icon: '📚', short: 'Scenario' };
    const answered = State.answered !== null;
    const flagged = Storage.isFlagged(q.id);
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
        ${renderCalculatorSidebar()}
      </div>
    </div>`;
  }

  function renderGapFillQuiz(q) {
    const total = State.questions.length;
    const pct = ((State.current + 1) / total * 100).toFixed(0);
    const topic = window.TOPICS.find(t => t.id === q.topic) || { icon: '✏️', short: 'Mixed' };
    const answered = State.answered !== null;
    const flagged = Storage.isFlagged(q.id);
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
        ${numeric ? renderCalculatorSidebar() : ''}
      </div>
    </div>`;
  }

  function renderScore() {
    const { score, results, mode, timedOut } = State;
    const total = results.length;
    const pct = total ? Math.round(score / total * 100) : 0;
    const cls = scoreClass(pct);
    const passed = pct >= PASS_MARK;
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
        <span class="pass-badge ${passed ? 'pass' : 'fail'}">${passed ? `✓ PASS — ${PASS_MARK}% threshold met` : `✗ FAIL — below ${PASS_MARK}% threshold`}</span>
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
    const planner = Storage.data.planner;
    const daysLeft = planner.examDate ? Math.max(0, Math.ceil((new Date(planner.examDate) - new Date()) / 86400000)) : null;

    const plannerBlock = State.plannerEdit
      ? `<div class="planner-form">
          <label>Exam date <input type="date" id="plannerDate" value="${escapeHtml(planner.examDate || '')}" min="${new Date().toISOString().slice(0,10)}"></label>
          <label>Daily XP goal <select id="plannerGoal">${[10,20,30,50,100].map(v=>`<option value="${v}" ${planner.dailyGoalXp===v?'selected':''}>${v} XP</option>`).join('')}</select></label>
          <button class="btn-primary" id="savePlannerBtn" type="button">Save plan</button>
          <button class="btn-secondary" id="cancelPlannerBtn" type="button">Cancel</button>
        </div>`
      : `<div class="planner-bar">
          ${planner.examDate ? `<span>🎯 Exam: <strong>${new Date(planner.examDate).toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'})}</strong> · <strong>${daysLeft}</strong> day${daysLeft===1?'':'s'} left</span>` : '<span>No exam date set</span>'}
          <span>🏅 Daily goal: <strong>${planner.dailyGoalXp} XP</strong></span>
          <button class="planner-edit-btn" id="editPlannerBtn" type="button">✏️ Edit</button>
        </div>`;

    const xpBar = `<div class="xp-bar-wrap" title="${xp} XP earned">
      <span class="xp-label">⚡ ${xp} XP</span>
      <div class="xp-bar-bg"><div class="xp-bar-fill" style="width:${Math.min(100, (xp % 100))}%"></div></div>
      <span class="xp-level">Lv ${Math.floor(xp / 100) + 1}</span>
    </div>`;

    const unitsHtml = window.LEARN_PATH.map((unit, ui) => {
      const topicObj = window.TOPICS.find(t => t.id === unit.unit) || {};
      let unlockedSoFar = true;
      const lessonsHtml = unit.lessons.map((L, li) => {
        const rec = Storage.lessonRec(L.id);
        const done = !!(rec && rec.best >= 50);
        const stars = rec ? rec.stars : 0;
        const locked = !unlockedSoFar;
        if (!done) unlockedSoFar = false;
        const starRow = [1,2,3].map(s => `<span class="journey-star ${stars >= s ? 'lit' : ''}" aria-hidden="true">★</span>`).join('');
        return `<button class="journey-node ${done ? 'node-done' : locked ? 'node-locked' : 'node-available'}" type="button"
            ${locked ? 'disabled' : `data-lesson="${escapeHtml(L.id)}"`}
            aria-label="${escapeHtml(L.title)}${done ? ', completed' : locked ? ', locked' : ', available'}">
          <div class="journey-icon">${locked ? '🔒' : escapeHtml(L.icon)}</div>
          <div class="journey-label">${escapeHtml(L.title)}</div>
          <div class="journey-stars">${starRow}</div>
        </button>`;
      }).join('');
      const unitDone = unit.lessons.every(L => isLessonDone(L.id));
      return `<div class="journey-unit">
        <div class="journey-unit-header">
          <span class="journey-unit-icon">${topicObj.icon || '📚'}</span>
          <div><div class="journey-unit-title">${escapeHtml(unit.title)}</div>
          <div class="journey-unit-sub">${unit.lessons.filter(L=>isLessonDone(L.id)).length}/${unit.lessons.length} lessons done ${unitDone ? '✓' : ''}</div></div>
        </div>
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
      ${plannerBlock}
    </div>
    ${nextBlock}
    <div class="journey-map">${unitsHtml}</div>`;
  }

  /* ── LESSON PLAYER ── */
  function renderLesson() {
    const L = State.lesson;
    if (!L) { goLearn(); return ''; }
    const { def, phase, cardIdx, qIdx, qAnswered, qScore, pct, stars } = L;
    const totalCards = def.cards.length;
    const totalQ = def.check ? def.check.length : 0;

    if (phase === 'done') {
      const starRow = [1,2,3].map(s => `<span class="lesson-star ${(stars||0) >= s ? 'lit' : ''}" aria-hidden="true">★</span>`).join('');
      const msg = stars === 3 ? 'Perfect score! 🏆' : stars >= 2 ? 'Great work! 👏' : stars >= 1 ? 'Good start. Try again to improve!' : 'Keep going — you need 50% to pass.';
      return `<div class="container">
        <button class="back-btn" id="lessonExitBtn" type="button">← Back to journey</button>
        <div class="lesson-done fade-in">
          <div class="lesson-done-stars">${starRow}</div>
          <div class="lesson-done-pct">${pct}%</div>
          <div class="lesson-done-msg">${msg}</div>
          <div class="lesson-done-xp">+${qScore * 2} XP earned this lesson</div>
          <div class="lesson-done-btns">
            ${stars < 3 && totalQ > 0 ? `<button class="btn-primary" id="lessonRetryBtn" type="button">🔁 Retry quiz</button>` : ''}
            <button class="btn-secondary" id="lessonDrillBtn" type="button" data-topic="skill:${escapeHtml(def.skills && def.skills[0] || '')}">🎯 Drill these skills</button>
            <button class="btn-secondary" id="lessonExitBtn2" type="button">🗺️ Back to journey</button>
          </div>
        </div>
      </div>`;
    }

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
      const feedback = answered ? `<div class="feedback ${correct ? 'correct' : 'wrong'} fade-in">
        <strong>${correct ? '✅ Correct!' : '❌ Not quite'}</strong>${q.exp ? `<br><em>${escapeHtml(q.exp)}</em>` : ''}
      </div>` : '';
      return `<div class="container">
        <button class="back-btn" id="lessonExitBtn" type="button">← Exit lesson</button>
        <div class="lesson-player slide-in">
          <div class="lesson-phase-pill">Quiz · ${qIdx + 1} of ${totalQ}</div>
          <div class="lesson-progress-bar-bg"><div class="lesson-progress-bar" style="width:${((qIdx+1)/totalQ*100).toFixed(0)}%"></div></div>
          <h2 class="lesson-q">${escapeHtml(q.q)}</h2>
          <div class="options" role="radiogroup">${optHtml}</div>
          ${feedback}
          ${answered ? `<button class="next-btn" id="lessonNextBtn" type="button">${qIdx + 1 >= totalQ ? 'Finish ✓' : 'Next →'}</button>` : ''}
        </div>
      </div>`;
    }

    /* teach phase */
    const card = def.cards[cardIdx];
    const mdBold = (t) => escapeHtml(t).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    const paraHtml = (card.p || []).map(p => `<p class="lesson-card-p">${mdBold(p)}</p>`).join('');
    const flowHtml = card.flow ? `<div class="lesson-flow">${card.flow.map((f,i) => `<span class="lesson-flow-step">${escapeHtml(f)}</span>${i < card.flow.length-1 ? '<span class="lesson-flow-arrow">→</span>' : ''}`).join('')}</div>` : '';
    const exHtml = card.example ? `<div class="lesson-example">
      <div class="lesson-example-title">${escapeHtml(card.example.title)}</div>
      <table class="lesson-example-table"><tbody>${card.example.rows.map(row => `<tr>${row.map(c=>`<td>${escapeHtml(c)}</td>`).join('')}</tr>`).join('')}</tbody></table>
    </div>` : '';
    const splitHtml = card.split ? `<div class="lesson-split">
      <div class="lesson-split-col"><strong>${escapeHtml(card.split.left.h)}</strong><ul>${(card.split.left.items||[]).map(x=>`<li>${escapeHtml(x)}</li>`).join('')}</ul></div>
      <div class="lesson-split-col"><strong>${escapeHtml(card.split.right.h)}</strong><ul>${(card.split.right.items||[]).map(x=>`<li>${escapeHtml(x)}</li>`).join('')}</ul></div>
    </div>` : '';
    return `<div class="container">
      <button class="back-btn" id="lessonExitBtn" type="button">← Exit lesson</button>
      <div class="lesson-player slide-in">
        <div class="lesson-phase-pill">Learn · ${cardIdx + 1} of ${totalCards}</div>
        <div class="lesson-progress-bar-bg"><div class="lesson-progress-bar" style="width:${((cardIdx+1)/totalCards*100).toFixed(0)}%"></div></div>
        <div class="lesson-card fade-in">
          <h2 class="lesson-card-h">${escapeHtml(card.h)}</h2>
          ${paraHtml}${flowHtml}${exHtml}${splitHtml}
        </div>
        <div class="lesson-nav">
          ${cardIdx > 0 ? `<button class="btn-secondary" id="lessonBackBtn" type="button">← Back</button>` : '<span></span>'}
          <button class="btn-primary" id="lessonContinueBtn" type="button">${cardIdx + 1 >= totalCards ? 'Take quiz →' : 'Continue →'}</button>
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
      return `<div class="container">
        <button class="back-btn" id="flashExitBtn" type="button">← Back to journey</button>
        <div class="flash-done fade-in">
          <div class="flash-done-icon">🃏</div>
          <h2>Session complete!</h2>
          <p>You reviewed ${F.terms.length} card${F.terms.length===1?'':'s'} — ${F.got} correct.</p>
          <button class="btn-primary" id="flashExitBtn2" type="button">🗺️ Back to journey</button>
        </div>
      </div>`;
    }
    const term = F.terms[F.idx];
    const glossItem = window.GLOSSARY.find(g => g.term === term) || { term, def: '—' };
    return `<div class="container">
      <button class="back-btn" id="flashExitBtn" type="button">← Back to journey</button>
      <div class="flash-player">
        <div class="flash-progress">${F.idx + 1} / ${F.terms.length}</div>
        <div class="flash-card ${F.flipped ? 'flipped' : ''}">
          ${!F.flipped
            ? `<div class="flash-front"><span class="flash-term">${escapeHtml(glossItem.term)}</span><p class="flash-hint">Tap to reveal definition</p></div>`
            : `<div class="flash-back"><span class="flash-term">${escapeHtml(glossItem.term)}</span><p class="flash-def">${escapeHtml(glossItem.def)}</p></div>`
          }
        </div>
        ${!F.flipped
          ? `<button class="btn-primary flash-flip-btn" id="flashFlipBtn" type="button">Flip card ↩</button>`
          : `<div class="flash-grade-btns">
              <button class="flash-btn-no" id="flashNoBtn" type="button">😕 Need more practice</button>
              <button class="flash-btn-yes" id="flashYesBtn" type="button">✅ Got it!</button>
            </div>`
        }
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
  function jumpToMockQuestion(idx) {
    if (State.mode !== 'mock') return;
    if (idx < 0 || idx >= State.questions.length) return;
    State.current = idx; Calc.reset(); render();
  }

  function attachEvents() {
    bind('darkToggle', 'click', toggleDarkMode);
    bind('referenceToggle', 'click', toggleReference);
    bind('homeNavBtn', 'click', exitQuiz);
    bind('startBtn', 'click', () => { Storage.data.settings.seenSplash = true; Storage.save(); State.screen='home'; render(); });
    document.querySelectorAll('[data-tab]').forEach(el => el.addEventListener('click', () => { State.activeTab = el.dataset.tab; render(); }));
    document.querySelectorAll('[data-topic]').forEach(el => el.addEventListener('click', () => startPractice(el.dataset.topic)));
    bind('mockBtn', 'click', startMock);
    bind('resumeBtn', 'click', resumeSession);
    bind('dismissSessionBtn', 'click', dismissSession);
    const st = document.getElementById('soundToggle');
    if (st) st.addEventListener('change', () => { Storage.data.settings.soundOn = st.checked; Storage.save(); });
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
    bind('clearProgressBtn', 'click', () => {
      openConfirm({ title:'Clear all progress?', message:'This will permanently delete your stats, attempt history and saved settings on this device.',
        confirmLabel:'Clear all', onConfirm: () => { Storage.clearAll(); closeConfirm(); render(); } });
    });
    bind('exportCsvBtn', 'click', exportCsv);
    bind('flagBtn', 'click', toggleFlagCurrent);
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
    // Hint button
    bind('hintBtn', 'click', useHint);
    // Skill debrief buttons (score screen)
    document.querySelectorAll('[data-lesson]').forEach(el => el.addEventListener('click', () => startLesson(el.dataset.lesson)));
    // Learning journey node buttons
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
    bind('flashYesBtn', 'click', () => flashGrade(true));
    bind('flashNoBtn', 'click', () => flashGrade(false));
    // Study planner
    bind('editPlannerBtn', 'click', () => { State.plannerEdit = true; render(); });
    bind('cancelPlannerBtn', 'click', () => { State.plannerEdit = false; render(); });
    bind('savePlannerBtn', 'click', savePlanner);
    // T-account guided exercises
    document.querySelectorAll('[data-ta-ex]').forEach(el => el.addEventListener('click', () => startTaExercise(el.dataset.taEx)));
    bind('taExitBtn', 'click', exitTaExercise);
    bind('taExitBtn2', 'click', exitTaExercise);
    bind('taCheckBtn', 'click', checkTaExercise);
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
        const next = document.getElementById('nextBtn') || document.getElementById('submitBtn') || document.getElementById('submitNumericBtn') || document.getElementById('submitDragDropBtn') || document.getElementById('submitTableFillBtn') || document.getElementById('submitScenarioBtn') || document.getElementById('submitGapFillBtn');
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
