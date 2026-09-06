# AAT Level 3 TPFB reference material (FA2025)

## What this is

`aat-l3-tpfb-reference-material-fa2025.pdf` is AAT's own reference material for
the Level 3 unit **Tax Processes for Businesses**, Finance Act 2025, for
assessments from **26 January 2026**. `aat-l3-tpfb-reference-material-fa2025-extracted.txt`
is its text, page by page, in the same `-- n of m --` shape as the three
qualification specifications alongside it.

`aat-l3-tpfb-vat-invoice-contents-fa2025.pdf` is AAT's standalone one-page
*Contents of a VAT invoice* sheet, which reproduces section 6 of the reference
material. It is kept separately because it is what a candidate is handed for the
invoice-contents task, and because the two disagree on one character: the
reference material writes the simplified-invoice limit as **≤£250**, the sheet
as **<£250**. HMRC's rule is "£250 or less", so `TAX.invoicing.simplifiedLimit`
records ≤ and notes the divergence.

## Why it matters more than a specification does

The specification says what is assessed. This document says what the candidate
**can look up while being assessed** — AAT makes it available from the reference
materials section at every task position. That changes what is worth revising
and what this app should teach:

- The figures in it are **looked up, not recalled**. Revision effort belongs on
  knowing which rule applies and how to apply it, not on holding the numbers.
- The rules in it are still **fully assessed**. Having the fuel scale table in
  front of you does not tell you that a 137 g/km car is charged at the 135 band.
- Where this document and current HMRC guidance differ in wording, **this
  document is what the assessment marks against.** Two such divergences are
  recorded in `aat3-tax-data.js` (the flat rate scheme's leaving test, and the
  monthly late-submission penalty threshold, which this document omits).

## How the app uses it

`aat3-tax-data.js` is the single governed home for every TPFB figure. Entries
that this document is the authority for carry
`source: 'AAT, Level 3 Tax Processes for Businesses reference material (FA2025)'`,
and `scripts/check-reference-material.js` asserts that each such figure really
does appear in the extracted text. That check is what stops the data file
drifting away from the document a candidate will actually have on screen.

`TAX.REFERENCE_MATERIAL` records the document's identity and its 25 sections, so
lessons can say *where in the reference material* a figure is found rather than
merely that one exists.

## Keeping it current

AAT reissues this for each Finance Act, assessable from the following late
January. When it rolls:

1. Replace all four files here with the new edition, keeping the naming pattern.
2. Bump `FINANCE_ACT`, `ASSESSABLE_FROM` and `REFERENCE_MATERIAL` in
   `aat3-tax-data.js`.
3. Re-verify **every** dated entry rather than assuming only some changed;
   `scripts/check-reference-material.js` will catch figures that no longer
   appear, but not figures that moved to a value which happens to appear
   elsewhere in the document.

## Provenance

Supplied by the repository owner, 5 September 2026. Not redistributed by the
app: `docs/` is excluded from the Cloudflare asset upload by `.assetsignore`,
so none of these files is served to the public site.
