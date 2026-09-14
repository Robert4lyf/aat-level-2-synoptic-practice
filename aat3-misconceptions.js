/**
 * Named misconceptions — what a wrong answer actually was.
 *
 * WHY A REGISTRY, AND WHY IT COMES FIRST. Until now a wrong answer got the
 * same response as any other wrong answer: the explanation of the RIGHT one.
 * That is a good thing to say and it is not a diagnosis. A reader who divided
 * by five instead of six and a reader who had no idea both got "at 20% the VAT
 * is one sixth of the gross", and only one of them needed it.
 *
 * The alternative is to name the specific error that produces each wrong
 * answer. That only works if the names are a TAXONOMY rather than a pile: tags
 * grown bottom-up, one per question as it was written, produce fifty near
 * synonyms, and fifty near synonyms diagnose nothing because no two readers
 * with the same error are ever told the same thing. So the list lives here,
 * written once, and questions refer to it by id.
 *
 * THE FLOOR. `check-aat3-misconceptions.js` requires every entry below to be
 * used by at least two questions, and fails on an entry nothing uses. An
 * entry used once is not a category, it is that question's explanation wearing
 * a category's clothes — and the whole value of the registry is that the app
 * can eventually say "this is the fourth time this term has caught you", which
 * a singleton can never do.
 *
 * HOW AN ENTRY IS WRITTEN. `explain` states the RULE that was misapplied, in
 * general terms, not the arithmetic of any one question. Two reasons. It has
 * to make sense attached to every question that uses it, and the gate asserts
 * it is not a substring of the question's own explanation — a tag that
 * restates the explanation is decoration, and that is the most likely way this
 * whole idea turns into noise.
 *
 * `units` is which Level 3 units the misconception can arise in. It is
 * documentation rather than a filter today; it earns its keep when the tags
 * spread beyond TPFB and a reader's misconception counts have to be read per
 * unit.
 */
(function (root) {
  'use strict';

  var MISCONCEPTIONS = [

    /* ── The VAT fraction, and which figure it applies to ────────────────────
       The single most common family of errors in this unit, and the one the
       assessment tests hardest: everything turns on whether the figure in
       front of you already includes the tax. */
    { id: 'vat-rate-applied-to-a-gross-figure',
      label: 'Applied the rate to a figure that already included VAT',
      explain: 'A VAT-inclusive figure is 120% of the net at the standard rate, so the tax inside it is one sixth — not 20%. Taking the rate off a gross amount charges tax on tax, and taking 20% off a gross amount to find the net leaves too little.',
      units: ['tpfb', 'faps'] },

    { id: 'gross-fraction-used-on-a-net-figure',
      label: 'Used the VAT fraction on a figure that excluded VAT',
      explain: 'One sixth is for extracting VAT from a gross amount. Where the figure already excludes VAT the rate applies directly, so the tax is a fifth of it, not a sixth.',
      units: ['tpfb', 'faps'] },

    { id: 'reduced-rate-supply-taxed-at-the-standard-rate',
      label: 'Taxed a reduced-rate supply at 20%',
      explain: 'The reduced rate is 5%, so the gross is 1.05 times the net and the fraction inside a gross figure is one twenty-first. Both the multiplier and the fraction move with the rate on the supply.',
      units: ['tpfb'] },

    { id: 'one-rate-applied-across-a-mixed-invoice',
      label: 'Applied one rate to an invoice carrying several',
      explain: 'Each line of an invoice carries the rate that belongs to what it supplies. A single rate applied to the combined total is right only by accident, and on a mixed invoice it never is.',
      units: ['tpfb'] },

    /* ── What counts as turnover ─────────────────────────────────────────── */
    { id: 'exempt-in-taxable-turnover',
      label: 'Counted exempt income as taxable turnover',
      explain: 'Exempt supplies are outside the taxable turnover figure entirely. Including them overstates it against the registration threshold, and a business can be pushed into registering when it had no obligation at all.',
      units: ['tpfb'] },

    { id: 'zero-rated-left-out-of-taxable-turnover',
      label: 'Left zero-rated supplies out of taxable turnover',
      explain: 'Zero-rated is taxable AT 0%, not untaxed. It counts in full towards taxable turnover, and leaving it out understates the figure — the more dangerous direction, because it hides an obligation to register.',
      units: ['tpfb'] },

    { id: 'wrong-vat-threshold-used',
      label: 'Measured against the wrong threshold',
      explain: 'Registration and deregistration have different thresholds, and the deregistration one sits lower on purpose, so a business trading around the line is not made to register and deregister in turn. Which one applies depends on which way the business is moving.',
      units: ['tpfb'] },

    /* ── The flat rate scheme ────────────────────────────────────────────── */
    { id: 'flat-rate-applied-to-wrong-turnover',
      label: 'Applied the flat rate to the wrong turnover figure',
      explain: 'The flat rate is applied to VAT-INCLUSIVE turnover. Applying it to a net figure understates the payment; grossing up a figure that already includes VAT overstates it.',
      units: ['tpfb'] },

    { id: 'flat-rate-discount-misapplied',
      label: 'Got the first-year flat rate discount wrong',
      explain: 'One percentage point comes off the sector rate for the first year of VAT REGISTRATION — not the first year in the scheme, and not after the first anniversary. Missing it overstates the payment; taking it when it has expired understates it.',
      units: ['tpfb'] },

    /* ── Annual accounting ───────────────────────────────────────────────── */
    { id: 'interim-payment-percentage-wrong',
      label: 'Used the wrong interim payment percentage',
      explain: 'Annual accounting offers nine monthly payments of 10% of last year’s liability or three quarterly payments of 25%. The percentage has to match the frequency the business chose, and both are based on the PREVIOUS year.',
      units: ['tpfb'] },

    /* ── Penalties ───────────────────────────────────────────────────────── */
    { id: 'late-payment-penalty-elements-confused',
      label: 'Miscounted the elements of the first late payment penalty',
      explain: 'The first penalty has two 3% elements: one on what is outstanding at day 15 and a second on what is STILL outstanding at day 30. A debt cleared in between never reaches the second, and a debt part-paid carries it on the reduced amount.',
      units: ['tpfb'] },

    /* ── Input tax: what may be recovered ────────────────────────────────── */
    { id: 'blocked-vat-left-in-the-claim',
      label: 'Recovered input tax that is blocked',
      explain: 'Blocked VAT is inside the purchases figure and has to come back out before Box 4. Client entertaining and a car available for private use are the two that recur; leaving either in overstates the recovery.',
      units: ['tpfb'] },

    { id: 'recoverable-vat-treated-as-blocked',
      label: 'Removed input tax that was in fact recoverable',
      explain: 'The block is narrower than it looks. Staff entertaining and a commercial vehicle used only for business are both recoverable, so stripping them out with the genuinely blocked items understates the claim.',
      units: ['tpfb'] },

    { id: 'de-minimis-allowed-on-one-limb',
      label: 'Treated de minimis as met on one limb alone',
      explain: 'De minimis needs BOTH limbs: exempt input tax at or under the monthly limit AND at or under half of total input tax. Passing one of them is not enough, and a business that fails either recovers nothing on its exempt supplies.',
      units: ['tpfb'] },

    { id: 'de-minimis-restriction-applied-anyway',
      label: 'Restricted recovery although de minimis was met',
      explain: 'Where both limbs are satisfied the business recovers ALL of its input tax, including the part relating to exempt supplies. That is the whole point of the rule: below the limits, partial exemption is set aside.',
      units: ['tpfb'] },

    /* ── Adjustments to the return ───────────────────────────────────────── */
    { id: 'scale-charge-added-in-full',
      label: 'Added the whole fuel scale charge to output tax',
      explain: 'The scale charge figure is VAT-INCLUSIVE. What it adds to output tax is the VAT inside it — one sixth — never the charge itself.',
      units: ['tpfb'] },

    { id: 'scale-charge-treated-as-net',
      label: 'Treated the fuel scale charge as a net figure',
      explain: 'The scale charge already includes VAT, so taking 20% of it adds tax on tax. The VAT to declare is one sixth of the charge.',
      units: ['tpfb'] },

    { id: 'adjustment-pushed-the-wrong-way',
      label: 'Moved an adjustment in the wrong direction',
      explain: 'Each adjustment has a side and a sign. A credit note issued comes off output tax, bad debt relief goes on to input tax, a scale charge goes on to output tax. Send one the other way and the arithmetic still works — the answer is simply out by double.',
      units: ['tpfb'] },

    { id: 'adjustment-never-brought-in',
      label: 'Left an adjustment out altogether',
      explain: 'The figure in the records is the starting point, not the answer. An adjustment that belongs on the return has to be brought in before the box is complete, whichever way it moves the total.',
      units: ['tpfb'] },

    { id: 'declared-without-the-matching-recovery',
      label: 'Declared the tax without the recovery that cancels it',
      explain: 'Postponed import accounting and the reverse charge both put the same figure into output tax and into input tax. For a fully taxable business the two cancel and the net effect is nil — declaring one without the other doubles the apparent cost.',
      units: ['tpfb'] },

    /* ── Discounts ───────────────────────────────────────────────────────── */
    { id: 'discount-taken-but-vat-not-reduced',
      label: 'Charged VAT on a price the customer did not pay',
      explain: 'VAT follows the consideration actually received. Where a prompt payment discount is taken, both the price and the tax on it come down — and the outcome is not known when the invoice is raised, which is why the rule exists.',
      units: ['tpfb'] },

    { id: 'discount-refused-but-vat-reduced',
      label: 'Applied a discount the customer did not take',
      explain: 'A prompt payment discount offered and refused changes nothing: the customer paid the full amount, so VAT is due on the full amount. The percentage in the question is there to be left alone.',
      units: ['tpfb'] },

    /* ── Correcting errors ───────────────────────────────────────────────── */
    { id: 'error-pushed-the-wrong-way-when-netting',
      label: 'Netted errors in the wrong direction',
      explain: 'Under-declared output tax and over-claimed input tax both left HMRC short, so they ADD. Over-declared output tax and under-claimed input tax both left the business short, so they subtract. Only the direction of the shortfall decides the sign.',
      units: ['tpfb'] },

    { id: 'error-threshold-floor-and-percentage-confused',
      label: 'Took the turnover percentage without comparing it to the floor',
      explain: 'Two figures are compared and the LARGER of them wins: the fixed floor, or one percent of the outputs box, subject to an upper cap. Reaching for the percentage without asking which is bigger can halve the limit and force a separate notification nobody needed to make.',
      units: ['tpfb'] },

    /* ── Payroll ─────────────────────────────────────────────────────────── */
    { id: 'net-pay-arrangement-pension-mishandled',
      label: 'Handled the pre-tax pension contribution wrongly',
      explain: 'A net pay arrangement takes the contribution off before tax, so it reduces TAXABLE gross pay but not gross pay and not the National Insurance calculation. It comes off once, and taxable gross is not the same figure as gross.',
      units: ['tpfb'] },

    { id: 'post-tax-deduction-left-out-of-net-pay',
      label: 'Left a post-tax deduction out of net pay',
      explain: 'Net pay is gross less EVERY deduction, whether it was taken before or after tax. The pre-tax and post-tax distinction decides what is taxed, not what the employee receives.',
      units: ['tpfb'] },

    { id: 'reconciled-to-gross-by-subtracting',
      label: 'Subtracted the deductions when reconciling up to gross',
      explain: 'Going from net pay back to gross, every deduction is ADDED back. Subtracting them travels further in the direction the payslip already went.',
      units: ['tpfb'] },

    { id: 'employer-national-insurance-left-out',
      label: 'Left employer’s National Insurance out of the payment to HMRC',
      explain: 'Employer’s National Insurance never appears as a payslip deduction, but it is still owed to HMRC and is paid over with everything else in the same monthly payment.',
      units: ['tpfb'] },

    { id: 'employment-allowance-not-applied',
      label: 'Ignored the Employment Allowance',
      explain: 'The allowance is relief against the EMPLOYER’s own National Insurance and against nothing else. Add up what is owed first, then take it off the total — it leaves the deductions taken from the employees’ pay exactly as they were.',
      units: ['tpfb'] },

    { id: 'overtime-paid-at-the-basic-rate',
      label: 'Paid the overtime hours at the basic rate',
      explain: 'Time and a half and double time multiply the RATE for those hours, not the hours themselves. Paying them at the basic rate understates gross pay by the premium.',
      units: ['tpfb'] },
  ];

  root.AAT3_MISCONCEPTIONS = MISCONCEPTIONS;
  if (typeof module === 'object' && module.exports) module.exports = { AAT3_MISCONCEPTIONS: MISCONCEPTIONS };
}(typeof window !== 'undefined' ? window : (typeof globalThis !== 'undefined' ? globalThis : this)));
