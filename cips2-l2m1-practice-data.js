/* CIPS Level 2 — L2M1 original practice bank.
 *
 * These are original study questions mapped to the audited syllabus spine. They
 * are NOT CIPS past-paper or sample-assessment questions. The bank deliberately
 * balances correct-answer positions within every learning outcome so position
 * cannot become a cue, and mixes direct knowledge with short applied scenarios.
 */
(function (root) {
  'use strict';

  function Q(id, lo, criteria, kind, q, options, answer, exp) {
    return { id: id, lo: lo, criteria: criteria, kind: kind, q: q,
      options: options, answer: answer, exp: exp };
  }

  var QUESTIONS = [
    /* ── LO1: role of procurement and supply ───────────────────────────── */
    Q('C2M1-001',1,['L2M1-1.1'],'recall','Which description best fits procurement?',[
      'The end-to-end process of obtaining and managing external resources','Only the act of placing a purchase order','Only moving finished goods to customers','Recording supplier invoices after delivery'],0,
      'Procurement is broader than the transaction of buying. It includes understanding need, sourcing, agreement and management of external supply.'),
    Q('C2M1-002',1,['L2M1-1.1'],'applied','A factory buys steel used in every product it manufactures. How is this purchase most appropriately classified?',[
      'Indirect service','Direct good','Capital service','Outsourced activity'],1,
      'Steel is a tangible input directly traceable to the manufactured output, so it is a direct good.'),
    Q('C2M1-003',1,['L2M1-1.1'],'applied','A retailer pays a specialist company to run its help desk instead of employing its own help-desk team. This is:',[
      'Insourcing','Capital procurement','Outsourcing','Primary-sector activity'],2,
      'Outsourcing means arranging for an external provider to perform an activity that could otherwise be performed internally.'),
    Q('C2M1-004',1,['L2M1-1.1'],'recall','Which organisation is most clearly operating in the primary sector?',[
      'A supermarket chain','A vehicle manufacturer','A legal practice','A forestry business harvesting timber'],3,
      'Primary-sector activity obtains resources from nature. Forestry and timber harvesting are primary activities.'),
    Q('C2M1-005',1,['L2M1-1.2'],'applied','A supplier quotes the lowest price for a pump, but the pump uses much more energy and needs frequent servicing. Which procurement principle is most relevant?',[
      'Value for money should consider the wider cost and outcome, not price alone','The lowest price must always be selected','Only delivery time matters once quotations are received','The purchase should automatically be devolved'],0,
      'Value for money considers the required outcome, relevant whole cost and risk. A low acquisition price can be poor value if operating and maintenance costs are high.'),
    Q('C2M1-006',1,['L2M1-1.2'],'applied','A department manager has devolved authority to buy routine equipment up to an agreed limit. What remains the manager’s responsibility?',[
      'Ignore approved suppliers when local preference differs','Stay within authority and follow the organisation’s procurement controls','Approve expenditure above the delegated limit if urgent','Remove the need for purchasing records'],1,
      'Devolved authority moves some decision-making locally; it does not remove limits, procedures, evidence or other controls.'),
    Q('C2M1-007',1,['L2M1-1.2'],'recall','A tier 2 supplier normally supplies:',[
      'The final consumer directly','Every business in the supply chain','A tier 1 supplier','Only public-sector organisations'],2,
      'Tier 1 supplies the focal buying organisation directly. Tier 2 supplies tier 1.'),
    Q('C2M1-008',1,['L2M1-1.3'],'applied','A chocolate manufacturer buys packaging from Supplier A. Supplier A buys cardboard from Supplier B. From the chocolate manufacturer’s perspective, Supplier B is:',[
      'A downstream customer','The final consumer','A tier 1 supplier','An upstream tier 2 supplier'],3,
      'Supplier A is tier 1 because it supplies the manufacturer directly. Supplier B sits one step further upstream and is therefore tier 2.'),

    /* ── LO2: organisational impact ────────────────────────────────────── */
    Q('C2M1-009',2,['L2M1-2.1'],'applied','A business reduces bought-in cost by £20,000 without changing sales volume, sales price or other costs. What is the most direct financial effect?',[
      'Profit increases by £20,000 before tax','Revenue increases by £20,000','Inventory automatically falls by £20,000','The budget is no longer needed'],0,
      'With all other factors unchanged, a genuine £20,000 reduction in cost increases profit before tax by £20,000.'),
    Q('C2M1-010',2,['L2M1-2.1'],'recall','What is the main purpose of monitoring procurement spend against a budget?',[
      'To guarantee every supplier invoice is correct','To compare planned and actual commitments/spend and identify action needed','To replace delegated authority','To calculate the supplier’s profit margin'],1,
      'Budget monitoring makes commitments and variances visible so budget holders can understand departures from plan and respond.'),
    Q('C2M1-011',2,['L2M1-2.1'],'applied','Two machines meet the same output requirement. Machine X costs £8,000 but has high energy and maintenance costs; Machine Y costs £11,000 but has much lower running costs. Which approach best supports the decision?',[
      'Choose X because acquisition price is lower','Choose Y because higher price always means higher quality','Compare relevant total cost of ownership over the expected life','Ignore operating cost because it occurs after procurement'],2,
      'Total cost of ownership looks beyond purchase price to relevant costs of using, supporting and eventually disposing of the asset.'),
    Q('C2M1-012',2,['L2M1-2.1'],'recall','Which arrangement gives a category specialist responsibility for coordinating a type of spend across several parts of an organisation?',[
      'Purely devolved buying','No procurement structure','Centralisation of every local decision','Lead-buyer arrangement'],3,
      'A lead buyer takes category leadership on behalf of several users or organisational units, combining expertise and coordination.'),
    Q('C2M1-013',2,['L2M1-2.2'],'applied','A supplier delivers the correct product at the agreed price and quantity, but three weeks after it was needed for a shutdown. Which of the Five Rights is most clearly wrong?',[
      'Right time','Right quality','Right quantity','Right price'],0,
      'The defining failure is timing: the requirement arrived after the date at which it was needed.'),
    Q('C2M1-014',2,['L2M1-2.2'],'applied','A buyer orders 5,000 promotional items to obtain a lower unit price even though only 2,000 will be used and the rest will become obsolete. Which right is most clearly compromised?',[
      'Right place','Right quantity','Right quality','Right supplier tier'],1,
      'The quantity exceeds the real requirement. A lower unit price does not create value if unused stock becomes waste.'),
    Q('C2M1-015',2,['L2M1-2.2'],'recall','“Right quality” should normally mean:',[
      'The most expensive specification available','The option with the most features','Fitness for the intended purpose','A nationally recognised brand'],2,
      'Right quality is the quality needed to meet the requirement. Both under-specification and unnecessary over-specification can destroy value.'),
    Q('C2M1-016',2,['L2M1-2.2'],'applied','Goods meet the specification, quantity, timing and total-cost requirement but are delivered to the wrong branch. Which right failed?',[
      'Right quality','Right time','Right quantity','Right place'],3,
      'The delivery location is wrong, so the relevant Five Rights dimension is place.'),

    /* ── LO3: suppliers, products/services, customers ──────────────────── */
    Q('C2M1-017',3,['L2M1-3.1'],'recall','Why do organisations commonly use external suppliers?',[
      'To access goods, services, capacity or expertise they do not provide internally','Because internal capability is never useful','To remove all responsibility for outcomes','Only to buy capital equipment'],0,
      'External suppliers can provide capability, scale, expertise, goods or capacity the buyer does not hold or chooses not to hold internally.'),
    Q('C2M1-018',3,['L2M1-3.1'],'applied','A company outsources payroll processing. Which statement is most accurate?',[
      'The company no longer needs accurate employee data','The external provider performs the activity, but the company still needs to define and manage the required outcome','The payroll provider becomes the final consumer','Outsourcing guarantees lower total cost'],1,
      'Outsourcing transfers performance of an activity, not accountability for the business outcome. Requirements, data, controls and supplier management still matter.'),
    Q('C2M1-019',3,['L2M1-3.1'],'applied','A direct supplier cannot deliver because its only component manufacturer has stopped production. What does this illustrate?',[
      'Only downstream customers create risk','Purchase orders eliminate upstream dependency','Tier 1 performance can depend on upstream suppliers','External suppliers never form part of a supply chain'],2,
      'The direct supplier depends on an upstream source. Supply-chain risk can therefore sit beyond the organisation’s immediate contract.'),
    Q('C2M1-020',3,['L2M1-3.1'],'recall','Which is the clearest example of an outsourced service?',[
      'Raw material stored in a warehouse','A machine purchased outright','Office stationery ordered monthly','An external specialist operating the organisation’s IT support desk'],3,
      'The external specialist is performing an activity/service on the organisation’s behalf, which is outsourcing.'),
    Q('C2M1-021',3,['L2M1-3.2'],'recall','Which feature is commonly associated with a service rather than a physical product?',[
      'It is performed or experienced, often through provider-customer interaction','It can always be stored in inventory','It never needs performance measures','It cannot form part of a contract'],0,
      'Services are activities or performances and often involve direct interaction. They can still be contracted, specified and measured.'),
    Q('C2M1-022',3,['L2M1-3.2'],'applied','A restaurant promises customers that a menu item will always be gluten-free. Why is this relevant to procurement?',[
      'Only marketing should consider the promise','Procurement must support the downstream promise through suitable ingredient specifications and supply controls','Customers approve every supplier invoice','The promise converts all ingredients into capital purchases'],1,
      'Customer requirements flow upstream. Procurement choices about specification, suppliers and controls affect whether the organisation can deliver the promised outcome.'),
    Q('C2M1-023',3,['L2M1-3.2'],'recall','In a supply-chain view, customers are:',[
      'Outside the supply chain once goods leave the warehouse','Always the same as final consumers','Part of the downstream side of the chain','Always tier 2 suppliers'],2,
      'Customers and consumers form the downstream side of the chain. Products/services flow towards them while demand and information flow back upstream.'),
    Q('C2M1-024',3,['L2M1-3.2'],'applied','A business sells photocopiers together with installation and maintenance. This offering is best described as:',[
      'Only a service','Only a physical product','Neither product nor service','A combination of product and services'],3,
      'Many commercial offerings combine tangible products with services. Procurement and supply need to understand the complete requirement and delivery model.'),

    /* ── LO4: sourcing process ──────────────────────────────────────────── */
    Q('C2M1-025',4,['L2M1-4.1'],'recall','What is the soundest starting point for a sourcing process?',[
      'Identify and understand the requirement or need','Choose the preferred supplier','Issue a purchase order immediately','Approve the supplier invoice'],0,
      'Sourcing starts with the need. Selecting a supplier before the requirement is understood can lock the organisation into the wrong solution.'),
    Q('C2M1-026',4,['L2M1-4.1'],'applied','Suppliers have submitted quotations. What should normally happen before a recommendation is made?',[
      'Pay the lowest bidder','Evaluate the quotations against the defined requirement and criteria','Expedite every bidder','Create a delivery note'],1,
      'Received bids need controlled evaluation against the requirement and pre-defined criteria before a recommendation can be justified.'),
    Q('C2M1-027',4,['L2M1-4.1'],'recall','Which step most directly provides governance between evaluation and contractual commitment?',[
      'Expediting delivery','Invoice matching','Authorisation of the recommended award','Writing the initial requisition after award'],2,
      'Evaluation normally leads to a recommendation, which an appropriately authorised person must approve before the organisation is committed.'),
    Q('C2M1-028',4,['L2M1-4.1'],'recall','Which activity is clearly post-award?',[
      'Defining the original need','Inviting quotations','Evaluating tender responses','Monitoring supplier performance against the agreement'],3,
      'Supplier performance is managed after the agreement has been awarded. Need definition, market invitation and tender evaluation are pre-award.'),
    Q('C2M1-029',4,['L2M1-4.1'],'applied','An organisation repeatedly buys the same item under pre-agreed terms and places releases when quantities are needed. Which arrangement best fits?',[
      'A framework/blanket arrangement with call-off orders','A new full tender for every individual unit','A supplier invoice used as the contract','An unauthorised verbal order'],0,
      'Framework or blanket arrangements can establish terms in advance, with call-offs/releases used for repeated requirements.'),
    Q('C2M1-030',4,['L2M1-4.1'],'recall','In procurement, expediting is primarily:',[
      'Writing the original specification','Following up and acting to secure a required delivery that may be at risk','Selecting the initial tender list','Auditing the buyer’s annual accounts'],1,
      'Expediting is post-award follow-up intended to keep or recover required supplier delivery.'),
    Q('C2M1-031',4,['L2M1-4.1'],'applied','A sourcing exercise finished six months ago. Why is a structured review still useful?',[
      'It allows the buyer to ignore supplier performance','It replaces the need for payment controls','It identifies what worked, what failed and what should improve next time','It converts the contract back to pre-award status'],2,
      'Review closes the learning loop. Outcomes and process performance can inform future specifications, sourcing strategies and supplier management.'),
    Q('C2M1-032',4,['L2M1-4.1'],'recall','Which sequence is in the most logical order?',[
      'Pay → specify → invite → need','Evaluate → need → receive → invite','Order → authorise → recommend → evaluate','Need → specify → invite → receive → evaluate → recommend → authorise'],3,
      'The sourcing process begins with the requirement, moves through market engagement and evaluation, then recommendation and approval before commitment.'),

    /* ── LO5: administration and approvals ─────────────────────────────── */
    Q('C2M1-033',5,['L2M1-5.1'],'recall','What does effective procurement administration primarily mean?',[
      'The intended control and purchasing outcome is achieved','The process uses the fewest possible documents regardless of risk','Every purchase is approved by the chief executive','No supplier ever raises a query'],0,
      'Effectiveness asks whether the process achieves the required outcome/control. Efficiency asks whether it does so without unnecessary resource or delay.'),
    Q('C2M1-034',5,['L2M1-5.1'],'applied','A process prevents unauthorised orders but requires fifteen approvals where two risk-based approvals would give the same control. It is:',[
      'Efficient but ineffective','Effective but inefficient','Automatically fraudulent','Neither documented nor controlled'],1,
      'The intended control is achieved, so the process is effective. The unnecessary approval burden makes it inefficient.'),
    Q('C2M1-035',5,['L2M1-5.2'],'recall','Which document is principally an internal request to begin purchasing activity?',[
      'Supplier invoice','Delivery note','Purchase requisition','Order acknowledgement'],2,
      'A purchase requisition originates within the buying organisation and requests/authorises the appropriate purchasing process to begin.'),
    Q('C2M1-036',5,['L2M1-5.2'],'recall','What is the principal purpose of a pre-qualification questionnaire (PQQ)?',[
      'To confirm goods have arrived','To request payment from the buyer','To record the final contract award','To assess relevant supplier capability or suitability before full bid evaluation'],3,
      'A PQQ screens relevant supplier capability, standing or suitability before the organisation spends effort on full tender evaluation.'),
    Q('C2M1-037',5,['L2M1-5.3'],'applied','The purchase order says 100 units at £8, receipt evidence shows 90 units, and the invoice requests payment for 100. What should the process do?',[
      'Treat the mismatch as an exception and investigate before payment','Pay automatically because an invoice has been received','Change the purchase order after payment to make it match','Ignore the receipt record'],0,
      'Matching exists to reveal disagreement between what was ordered, received and invoiced. The cause should be resolved before payment is approved.'),
    Q('C2M1-038',5,['L2M1-5.3'],'recall','Which records make up a common three-way match?',[
      'Budget, tender and contract recommendation','Purchase order, receipt evidence and supplier invoice','PQQ, requisition and quotation','Forecast, catalogue and payment run'],1,
      'Three-way matching compares the authorised order, evidence of receipt and the supplier’s invoice.'),
    Q('C2M1-039',5,['L2M1-5.4'],'applied','One employee can raise a requisition, approve the order, confirm receipt and approve the invoice. What is the clearest control weakness?',[
      'The organisation is too centralised','The goods are necessarily poor quality','Insufficient separation of duties','There are too many independent checks'],2,
      'Concentrating request, approval, receipt and payment-related controls in one person removes independent challenge and increases error/fraud risk.'),
    Q('C2M1-040',5,['L2M1-5.4'],'applied','A manager splits a £120,000 requirement into three £40,000 orders solely so each sits below the manager’s approval limit. This:',[
      'Improves segregation of duties','Is a valid form of lead buying','Automatically creates a framework agreement','Circumvents delegated-authority control'],3,
      'Artificially splitting the same requirement to avoid an authority threshold defeats the purpose of delegated limits.'),

    /* ── LO6: ethics and responsible procurement ───────────────────────── */
    Q('C2M1-041',6,['L2M1-6.1'],'recall','Why is impartiality particularly important in procurement?',[
      'Procurement decisions can determine supplier access to business and involve sensitive commercial information','Because procurement never involves money','Because suppliers may not communicate with buyers','Because all contracts must be awarded randomly'],0,
      'Procurement professionals influence significant spend and supplier opportunity. Impartial, evidence-based decisions protect fairness, integrity and trust.'),
    Q('C2M1-042',6,['L2M1-6.1'],'applied','During a live tender, one bidder offers the buyer an expensive weekend trip. What is the strongest response?',[
      'Accept it if the buyer promises not to change the score','Follow the gifts/conflicts policy, declare the offer and protect the impartiality of the evaluation','Accept it after the award regardless of policy','Ask every bidder to offer the same gift'],1,
      'The offer creates a conflict or appearance of influence. The buyer should follow policy, disclose it appropriately and preserve an impartial process.'),
    Q('C2M1-043',6,['L2M1-6.1'],'recall','Why are documented procurement policies and procedures useful?',[
      'They guarantee no employee will ever act unethically','They remove the need for professional judgement','They make expected controls and ethical behaviour consistent and repeatable','They allow approvals to be ignored in urgent cases'],2,
      'Policies and procedures translate expectations into repeatable controls and responsibilities. They support, rather than replace, judgement.'),
    Q('C2M1-044',6,['L2M1-6.1'],'recall','Which idea is most closely associated with sound corporate governance?',[
      'Supplier gifts are part of normal evaluation','Only price decisions need records','Procurement should operate without oversight','Transparent accountability and appropriate oversight of decisions and risk'],3,
      'Governance is about how organisations are directed, controlled and held accountable, including transparent decisions and appropriate oversight.'),
    Q('C2M1-045',6,['L2M1-6.1'],'applied','A buyer discovers that workers several tiers upstream may have recruitment debts and their identity documents are being withheld. What is the most appropriate interpretation?',[
      'These are credible indicators of exploitative or bonded-labour risk that require proportionate investigation/escalation','The risk can be ignored because the buyer has no direct contract with those workers','The direct supplier’s signed invoice proves the supply chain is ethical','Only delivery performance is relevant to responsible procurement'],0,
      'Recruitment debt and withheld identity documents can be indicators of coercive labour. Responsible procurement considers credible risk beyond the direct supplier.'),
    Q('C2M1-046',6,['L2M1-6.1'],'applied','A buyer realises that a close relative owns one of the bidding suppliers. What should the buyer do?',[
      'Keep quiet unless that supplier wins','Declare the conflict and follow the organisation’s process for managing it','Score the relative’s company lower to appear impartial','Destroy the evaluation notes'],1,
      'A conflict should be disclosed and managed through the organisation’s policy. Secretly compensating for it does not restore a controlled, transparent process.'),
    Q('C2M1-047',6,['L2M1-6.1'],'recall','Which is the best reason to use a professional code of conduct?',[
      'It replaces all laws and organisational policies','It guarantees suppliers will behave ethically','It sets expected principles and behaviour to guide professional decisions','It is used only after misconduct has occurred'],2,
      'A code provides an ethical framework for decisions and conduct. It complements legal requirements and organisational controls rather than replacing them.'),
    Q('C2M1-048',6,['L2M1-6.1'],'applied','A supplier signs an ethical-sourcing declaration. What should the buyer conclude?',[
      'No further due diligence can ever be justified','Every upstream tier is now proven compliant','Ethical risk becomes the supplier’s problem alone','The declaration is useful evidence but does not by itself prove the whole supply chain is free of ethical risk'],3,
      'Supplier declarations can support due diligence but are not conclusive. Risk-based monitoring, evidence and escalation may still be necessary.')
  ];

  function forLo(lo) { return QUESTIONS.filter(function (q) { return q.lo === Number(lo); }); }
  var api = { QUESTIONS: QUESTIONS, forLo: forLo };
  root.CIPS2_L2M1_PRACTICE = api;
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
})(typeof window !== 'undefined' ? window : globalThis);
