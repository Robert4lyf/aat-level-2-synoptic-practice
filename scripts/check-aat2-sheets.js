#!/usr/bin/env node
/**
 * Does every Level 2 topic have its cheat sheets, and is each one a sheet?
 *
 * TWO WAYS THIS SET GOES WRONG, and neither shows up as a broken page.
 *
 * The first is a gap. Skills are added to skills.js when the bank grows a
 * subject the taxonomy did not cover; nothing about adding one asks whether a
 * cheat sheet exists for it, so the strip on the Learn screen quietly stops
 * covering the topic it claims to. The check for that is exact and mutual:
 * every skill has a sheet, and every sheet names a real skill.
 *
 * The second is drift in the other direction — a "cheat sheet" that has become
 * a lesson. A sheet that grows a second card, or a question, or claims an
 * assessment criterion, is a lesson filed in the wrong place: it will be opened
 * by a reader expecting one page, it will not be counted in the unit's
 * progress, and the teaching in it will never be checked by the coverage gate
 * that guards learn-data.js. So the shape is asserted too.
 *
 * The last section is about the content being worth opening: a sheet with no
 * table, no split and no formula is a paragraph, and a reader looking something
 * up the night before an assessment wants the thing they can scan.
 *
 * Run: node scripts/check-aat2-sheets.js   (exit 1 on any failure)
 */

'use strict';

const path = require('path');
const ROOT = path.join(__dirname, '..');

const RED = '\x1b[31m', GREEN = '\x1b[32m', DIM = '\x1b[2m', BOLD = '\x1b[1m', RESET = '\x1b[0m';

/* skills.js and the sheet data are browser files that assign to `window`. */
global.window = {};
require(path.join(ROOT, 'skills.js'));
require(path.join(ROOT, 'aat2-sheets-data.js'));
const SKILLS = global.window.SKILLS.defs;
const SHEETS = global.window.AAT2_SHEETS;

/* TOPICS comes from data.js, which is 8 MB of question bank — read the literal
   out of it rather than loading the lot to learn four names. */
const fs = require('fs');
const dataSrc = fs.readFileSync(path.join(ROOT, 'data.js'), 'utf8');
const topicsLiteral = dataSrc.slice(dataSrc.indexOf('window.TOPICS = ['));
const TOPICS = JSON.parse(topicsLiteral.slice(topicsLiteral.indexOf('['), topicsLiteral.indexOf('];') + 1));

let failures = 0, checks = 0;
function ok(cond, label) {
  checks++;
  if (!cond) { failures++; console.log(`  ${RED}✗${RESET} ${label}`); }
}

console.log(`${BOLD}AAT Level 2 cheat sheets${RESET}\n`);

/* ── 1. Every topic, and every skill within it ───────────────────────────── */
console.log(`${DIM}1. Coverage${RESET}`);
{
  const bySkill = new Map(SHEETS.map(s => [s.skill, s]));
  const skillIds = new Set(SKILLS.map(s => s.id));

  TOPICS.forEach(t => {
    const forTopic = SHEETS.filter(s => s.topic === t.id);
    const skillsForTopic = SKILLS.filter(s => s.topic === t.id);
    ok(forTopic.length > 0, `${t.name} has cheat sheets at all`);
    ok(forTopic.length === skillsForTopic.length,
      `${t.name}: ${skillsForTopic.length} skills, ${forTopic.length} sheets`);
  });

  const missing = SKILLS.filter(s => !bySkill.has(s.id));
  ok(missing.length === 0,
    `every skill has a cheat sheet (missing: ${missing.map(s => s.id).join(', ') || 'none'})`);

  const orphans = SHEETS.filter(s => !skillIds.has(s.skill));
  ok(orphans.length === 0,
    `every cheat sheet names a real skill (orphans: ${orphans.map(s => s.id).join(', ') || 'none'})`);

  const topicIds = new Set(TOPICS.map(t => t.id));
  ok(SHEETS.every(s => topicIds.has(s.topic)), 'every sheet names a real topic');
  ok(SHEETS.every(s => {
    const sk = SKILLS.find(x => x.id === s.skill);
    return sk && sk.topic === s.topic;
  }), 'and files itself under the same topic its skill belongs to');

  const ids = SHEETS.map(s => s.id);
  ok(new Set(ids).size === ids.length, 'sheet ids are unique');
}

/* ── 2. A sheet is a sheet, not a lesson ─────────────────────────────────── */
console.log(`${DIM}2. Shape${RESET}`);
{
  /* No sheet id may collide with a lesson id, or startLesson() would open one
     of them and never the other. */
  const learnSrc = fs.readFileSync(path.join(ROOT, 'learn-data.js'), 'utf8');
  const lessonIds = new Set([...learnSrc.matchAll(/^\s*id:\s*'([^']+)'/gm)].map(m => m[1]));
  const clashes = SHEETS.filter(s => lessonIds.has(s.id));
  ok(clashes.length === 0, `no sheet id collides with a lesson id (${clashes.map(s => s.id).join(', ') || 'none'})`);

  SHEETS.forEach(s => {
    ok(!!s.card, `${s.id} has a card`);
    ok(!Array.isArray(s.card), `${s.id}'s card is one card, not a list of them`);
    ok(!s.check && !s.cards, `${s.id} carries no questions and no second card — that would be a lesson`);
    ok(!s.criteria, `${s.id} claims no assessment criteria — the lessons do that`);
    ok(!!s.title && s.title.length <= 60, `${s.id} has a title that fits a chip (${(s.title || '').length} chars)`);
    ok(!!s.blurb && s.blurb.length <= 110, `${s.id} has a one-line summary that fits two lines (${(s.blurb || '').length} chars)`);
    ok(!!s.icon, `${s.id} has an icon`);
  });
}

/* ── 3. Worth opening ────────────────────────────────────────────────────── */
console.log(`${DIM}3. Worth opening${RESET}`);
{
  SHEETS.forEach(s => {
    const c = s.card || {};
    ok(!!c.h, `${s.id} has a heading`);
    /* The point of a cheat sheet is the scannable part. Prose alone is a
       lesson card with the lesson removed. */
    const scannable = ['table', 'split', 'formula', 'flow', 'example'].filter(k => c[k]);
    ok(scannable.length >= 2,
      `${s.id} has at least two scannable elements — it has ${scannable.length} (${scannable.join(', ') || 'none'})`);
    ok(!!c.examtrap, `${s.id} names the mistake people actually make`);
    ok(!!c.callout, `${s.id} has the one thing to remember called out`);
    if (c.table) {
      ok(Array.isArray(c.table.headers) && c.table.headers.length > 0, `${s.id}'s table has headers`);
      ok(Array.isArray(c.table.rows) && c.table.rows.length > 0, `${s.id}'s table has rows`);
      ok((c.table.rows || []).every(r => r.length === c.table.headers.length),
        `${s.id}'s table rows all match its header count`);
    }
    if (c.split) {
      ok(!!(c.split.left && c.split.right), `${s.id}'s split has both sides`);
      ok((c.split.left.items || []).length > 0 && (c.split.right.items || []).length > 0,
        `${s.id}'s split has items on both sides`);
    }
    if (c.example) {
      ok(!!c.example.title && Array.isArray(c.example.rows) && c.example.rows.length > 0,
        `${s.id}'s example has a title and rows`);
    }
    /* Bold markers are pairs. An odd count means a ** that renders as two
       literal asterisks in the middle of a sentence. */
    const text = JSON.stringify(c);
    const stars = (text.match(/\*\*/g) || []).length;
    ok(stars % 2 === 0, `${s.id}'s bold markers are balanced (${stars} found)`);
  });
}

console.log();
console.log(`  ${DIM}${SHEETS.length} sheets across ${TOPICS.length} topics, one per skill.${RESET}`);
console.log();
if (failures) {
  console.log(`${RED}${BOLD}── ${failures} of ${checks} checks failed${RESET}`);
  process.exit(1);
}
console.log(`${GREEN}${BOLD}── Every Level 2 topic has its cheat sheets ✓${RESET} ${DIM}(${checks} checks)${RESET}`);
