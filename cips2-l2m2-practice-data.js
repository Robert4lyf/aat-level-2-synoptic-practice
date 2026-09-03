/* CIPS Level 2 — L2M2 original practice bank.
 *
 * These are original study questions mapped to the audited syllabus spine. They
 * are NOT CIPS past-paper or sample-assessment questions. The bank deliberately
 * balances correct-answer positions within every learning outcome so position
 * cannot become a cue, and mixes direct knowledge with short applied scenarios.
 *
 * Twelve questions per learning outcome, three at each answer position.
 */
(function (root) {
  'use strict';

  function Q(id, lo, criteria, kind, q, options, answer, exp) {
    return { id: id, lo: lo, criteria: criteria, kind: kind, q: q,
      options: options, answer: answer, exp: exp };
  }

  var QUESTIONS = [
    /* ── LO1: organisations and how they operate ───────────────────────── */
    Q('C2M2-001',1,['L2M2-1.1'],'recall','Which statement best describes a third-sector organisation?',[
      'It exists for a social or member purpose and reinvests any surplus in that purpose','It is owned by the state and funded mainly from taxation','It is owned by shareholders and run to distribute profit to them','It is always a partnership between two or more sole traders'],0,
      'Third-sector bodies — charities, social enterprises, voluntary organisations and mutuals — exist for a social or member purpose, and any surplus is reinvested rather than distributed to owners.'),
    Q('C2M2-002',1,['L2M2-1.1'],'applied','A hospital trust and a private manufacturer each invite tenders for cleaning services. Which pressure applies to the trust but would not normally apply to the manufacturer?',[
      'The need to obtain value for money from the contract','A requirement to advertise the opportunity, publish award criteria and withstand challenge from unsuccessful bidders','The need to specify the standard of service required','The need to agree payment terms with the successful supplier'],1,
      'Both organisations want value for money and both must specify and agree terms. Public bodies additionally work within procurement regulation: advertised opportunities, published criteria, an audit trail and the possibility of legal challenge.'),
    Q('C2M2-003',1,['L2M2-1.1'],'applied','A social enterprise generates a surplus of £40,000 in the year. What normally happens to that surplus?',[
      'It is distributed to shareholders as a dividend','It must be returned to central government','It is reinvested in the organisation’s social purpose','It is paid to the directors as profit-related pay'],2,
      'A social enterprise is a third-sector organisation. It may trade and generate a surplus, but that surplus is reinvested in its social purpose instead of being distributed to owners.'),
    Q('C2M2-004',1,['L2M2-1.1'],'recall','Which is a defining characteristic of a service rather than a good?',[
      'It can be stored in a warehouse until it is needed','It can be fully inspected against a specification before acceptance','It has physical dimensions that can be measured on receipt','It is produced and consumed at the same time and cannot be held in stock'],3,
      'Services are intangible and perishable: they are produced as they are consumed and cannot be stocked. That is why they are specified by outcome and standard and managed over time rather than inspected at a delivery point.'),
    Q('C2M2-005',1,['L2M2-1.2'],'recall','An organisation chart shows many management layers, each with a narrow span of control. This structure is:',[
      'Tall','Flat','Informal','Third sector'],0,
      'Many layers with narrow spans of control describe a tall structure. It supports close supervision and clear escalation but slows decisions and adds management cost.'),
    Q('C2M2-006',1,['L2M2-1.2'],'applied','A new buyer notices that the head of department formally signs every specification but always adopts the wording proposed by one long-serving engineer. The engineer’s influence is an example of:',[
      'Delegated financial authority','The informal organisation','A flat reporting structure','Differentiation between functions'],1,
      'Influence that operates outside the documented reporting lines is the informal organisation. It is not shown on the chart, but it determines how the work is actually done.'),
    Q('C2M2-007',1,['L2M2-1.2'],'applied','Six regional depots each negotiate their own contract for the same protective clothing. Which consequence is most likely?',[
      'Lower total administration cost across the organisation','A single consolidated specification for all depots','Fragmented spend and the loss of volume leverage','Greater centralisation of purchasing authority'],2,
      'Devolved buying of a common requirement splits volume across several contracts. The organisation repeats the process six times and forgoes the leverage that consolidating the volume would have given it.'),
    Q('C2M2-008',1,['L2M2-1.2'],'recall','Which three elements are present in every organisation?',[
      'Shareholders, dividends and profit','Contracts, tenders and purchase orders','Suppliers, customers and consumers','People, objectives and structure'],3,
      'An organisation is people pursuing objectives within a structure that allocates work and authority. The other options describe features of only some organisations.'),
    Q('C2M2-009',1,['L2M2-1.3'],'recall','The specialisation of an organisation into functions with distinct expertise and objectives is known as:',[
      'Differentiation','Integration','Insourcing','Devolution'],0,
      'Differentiation is the splitting of an organisation into specialised functions. Integration is the counterbalancing activity that coordinates those functions again.'),
    Q('C2M2-010',1,['L2M2-1.3'],'applied','Production maximises machine utilisation and builds finished stock that finance did not want to fund. This conflict is best addressed by:',[
      'Increasing the differentiation between the two functions','Integrating mechanisms such as shared objectives, joint planning and common data','Outsourcing the production function to a third party','Adding management layers to create a taller structure'],1,
      'Each function is optimising its own measure at the other’s expense. Integration — shared objectives, cross-functional planning and common information — is the standard response to that effect of specialisation.'),
    Q('C2M2-011',1,['L2M2-1.3'],'applied','Which activity belongs to procurement rather than to logistics?',[
      'Storing finished goods in a warehouse before despatch','Planning vehicle routes to delivery points','Agreeing the terms on which a supplier will provide a component','Loading a container for onward shipment'],2,
      'Logistics is concerned with the movement and storage of goods. Procurement manages the organisation’s relationship with the supply market, including what is bought, from whom and on what terms.'),
    Q('C2M2-012',1,['L2M2-1.3'],'recall','Which function is responsible for recruitment, employment terms, development and employee relations?',[
      'Operations','Technical services','Customer support','Human resources'],3,
      'Human resources covers recruitment, employment terms, development and employee relations. Operations converts inputs into output, technical teams hold specialist design knowledge and customer support handles post-sale contact.'),

    /* ── LO2: contracts and pricing arrangements ───────────────────────── */
    Q('C2M2-013',2,['L2M2-2.1'],'recall','Which arrangement commits buyer and supplier to an agreed requirement, on agreed terms, for an agreed period?',[
      'A term contract','A spot purchase','An invitation to treat','A counter-offer'],0,
      'A term contract runs for an agreed period on agreed terms, giving both parties continuity and price stability at the cost of some flexibility.'),
    Q('C2M2-014',2,['L2M2-2.1'],'applied','A council appoints five law firms to the same scope and awards each new instruction by a short further competition between them. This arrangement is:',[
      'A blanket order','A panel, or multi-supplier framework','A single spot purchase','A term contract with one supplier'],1,
      'Appointing several qualified suppliers to one scope and allocating work between them, often by mini-competition, is a panel or multi-supplier framework arrangement.'),
    Q('C2M2-015',2,['L2M2-2.1'],'applied','A supplier appointed to a four-year framework has received no orders in two years. Has the buyer breached the framework?',[
      'Yes, because a framework guarantees each appointed supplier a minimum volume','Yes, unless the supplier agreed to receive no work in writing','No, because a framework fixes scope and terms but does not commit the buyer to any volume','No, because frameworks automatically expire after twelve months'],2,
      'A framework establishes eligibility and the terms on which purchases may be made. The call-off creates the obligation to supply and to pay, so appointment alone guarantees no volume.'),
    Q('C2M2-016',2,['L2M2-2.1'],'applied','Prices for a commodity move sharply week to week and the buyer needs a small quantity on one occasion only. The most appropriate arrangement is:',[
      'A five-year term contract at a fixed price','A blanket order with scheduled monthly releases','A framework with twelve appointed suppliers','A spot purchase at the price available at the time'],3,
      'A genuinely one-off requirement in a volatile market suits a spot purchase. Committing to a long fixed-price term for a single small quantity would take on price risk for no continuity benefit.'),
    Q('C2M2-017',2,['L2M2-2.2'],'recall','Under a schedule of rates, what is agreed in advance?',[
      'The price of each unit of work, with the total depending on the quantity measured','The total price for the whole of the defined scope','The supplier’s actual costs plus a percentage fee','A target cost together with a share formula'],0,
      'A schedule of rates fixes unit prices — per hour, per metre, per visit — while leaving the total to follow from the quantity actually measured. It suits work whose nature is known but whose volume is not.'),
    Q('C2M2-018',2,['L2M2-2.2'],'applied','A contract pays the supplier’s evidenced allowable costs plus a fee of 8% of those costs. This arrangement is:',[
      'A lump-sum price','Cost-plus pricing with a percentage fee','Target pricing with a pain/gain share','Variable pricing linked to an index'],1,
      'Reimbursing evidenced costs and adding an agreed fee is cost-plus pricing. Where the fee is a percentage of cost, it rises as cost rises.'),
    Q('C2M2-019',2,['L2M2-2.2'],'applied','A supplier receives an additional payment if fleet availability exceeds 97% and a deduction if it falls below 93%. This is best described as:',[
      'A schedule of rates','Cost-reimbursable pricing','A risk-and-reward arrangement','A spot price'],2,
      'Linking part of the supplier’s payment to measured outcomes, with both upside and downside, is a risk-and-reward arrangement.'),
    Q('C2M2-020',2,['L2M2-2.2'],'applied','Buyer and supplier agree a target cost of £2m and an equal share of any difference from it. The outturn cost is £1.8m. Which statement describes the arrangement correctly?',[
      'It is a fixed price, so the buyer pays £2m regardless of outturn','It is cost-plus, so the buyer pays £1.8m plus a percentage fee','It is variable pricing, so the price moves with a published index','It is target pricing, so the £200,000 underrun is shared between the parties'],3,
      'A target cost with an agreed share of the difference between target and outturn is target pricing. The £200,000 saving is divided between the parties under the pain/gain formula.'),
    Q('C2M2-021',2,['L2M2-2.3'],'recall','In the formation of a contract, a supplier’s quotation is normally:',[
      'An offer','An invitation to treat','An acceptance','Consideration'],0,
      'The buyer’s enquiry or invitation to tender is an invitation to treat. The supplier’s quotation is the offer, capable of being accepted by the buyer.'),
    Q('C2M2-022',2,['L2M2-2.3'],'applied','A supplier quotes on its own standard terms. The buyer responds with a purchase order applying the buyer’s conditions instead. In law the purchase order is most likely:',[
      'An acceptance, forming a contract on the supplier’s terms','A counter-offer, which the supplier may accept by performing','An invitation to treat','Of no legal effect until it is signed by both parties'],1,
      'An acceptance must be unqualified. A response that changes the terms rejects the offer and makes a new one, so the contract forms on whichever terms the other party then accepts — often by delivering.'),
    Q('C2M2-023',2,['L2M2-2.3'],'recall','Which contract document states how performance will be measured and what standard is acceptable?',[
      'The pricing schedule','The invitation to treat','The key performance indicators','The consideration clause'],2,
      'KPIs define the measures of performance and the acceptable standard. The specification says what is required; the pricing schedule says what is paid.'),
    Q('C2M2-024',2,['L2M2-2.3'],'applied','The specification and a delivery schedule in the same contract pack contradict one another. What resolves the conflict?',[
      'Whichever document was signed first','Whichever document carries the later date','The supplier’s standard terms and conditions','The order of precedence stated in the contract'],3,
      'A contract pack normally states an order of precedence ranking its documents. Without one, a contradiction between two parts of the same contract has no agreed answer.'),

    /* ── LO3: information about suppliers and customers ────────────────── */
    Q('C2M2-025',3,['L2M2-3.1'],'applied','How should a buyer researching an unfamiliar category treat the first page of general search results?',[
      'As a starting point that reflects visibility and advertising, to be corroborated from independent sources','As a complete and reliable list of the capable suppliers in the market','As evidence that the suppliers listed are financially sound','As a substitute for formal evaluation of the suppliers'],0,
      'Search rankings reflect optimisation and advertising spend rather than capability. They are a useful starting point that must be corroborated with directories, trade associations and industry press.'),
    Q('C2M2-026',3,['L2M2-3.1'],'recall','Which information published on a supplier’s own website is most readily verified from an independent source?',[
      'A claim that it is a market leader in its field','Its registered company number and filed accounts','Customer testimonials with no named source','A statement of its company values'],1,
      'Registration details and filed accounts can be checked against the public register. Self-assessed claims, unattributed testimonials and values statements cannot be independently verified.'),
    Q('C2M2-027',3,['L2M2-3.1'],'applied','Staff buy office supplies on a consumer website with a corporate card instead of through the organisation’s contracted supplier. What is the most likely consequence?',[
      'Improved negotiated pricing on those items','Stronger contractual protection for the organisation','Weak spend visibility and purchasing outside agreed contracts','Extended credit terms on the purchases'],2,
      'Buying on a consumer site means standard consumer terms, no negotiated price and no credit account. Because it bypasses the ordering system, the spend is also invisible to spend analysis.'),
    Q('C2M2-028',3,['L2M2-3.1'],'recall','Which feature is characteristic of business-to-consumer rather than business-to-business e-commerce?',[
      'Account-based credit terms','Negotiated contract pricing','Integration between the buyer’s and seller’s systems','Published prices sold under consumer protection law'],3,
      'B2C trading is characterised by published prices, standard terms and consumer protection rights. Credit accounts, negotiated pricing and system integration are typical of B2B.'),
    Q('C2M2-029',3,['L2M2-3.2'],'recall','A credit rating agency’s score for an organisation primarily expresses:',[
      'The risk that the organisation will fail to meet its financial obligations','The technical capability of the organisation','The price the organisation ought to charge','The quality of the organisation’s products'],0,
      'Credit scores assess the likelihood of default, drawing on filed accounts, payment behaviour, judgments and charges. They say nothing about capability, quality or price.'),
    Q('C2M2-030',3,['L2M2-3.2'],'applied','A supplier’s credit score is strong, but two site visits reveal poor quality control. What does this demonstrate?',[
      'That the credit score must have been calculated incorrectly','That credit assessment measures financial risk only and must be combined with capability assessment','That the findings of the site visits should be disregarded','That the contract should be awarded on the strength of the score'],1,
      'Financial standing and operational capability are different things. A sound balance sheet does not evidence quality, so credit data is one input alongside references, site visits and evaluation.'),
    Q('C2M2-031',3,['L2M2-3.2'],'applied','A buyer wants to place an order worth considerably more than the supplier’s suggested credit limit. Which response is most proportionate?',[
      'Proceed and pay the full contract value in advance','Reject the supplier in all circumstances','Reduce exposure using staged payments, a parent-company guarantee or a performance bond','Ignore the limit, since it is only relevant to lenders'],2,
      'The proportionate response to elevated financial risk is to limit exposure rather than to reject automatically. Paying in advance would increase exposure at exactly the wrong moment.'),
    Q('C2M2-032',3,['L2M2-3.2'],'recall','As well as information on individual organisations, credit rating agencies publish:',[
      'Suppliers’ confidential tender prices','Buyers’ internal budget allocations','The terms and conditions of awarded contracts','Sector risk commentary, industry failure rates and payment-trend data'],3,
      'Agencies publish market-level material alongside organisation-level scores, which matters because a supplier’s risk is partly a function of the market it operates in.'),
    Q('C2M2-033',3,['L2M2-3.3'],'applied','An invoice arrives for goods with no corresponding purchase order and no receipt record. Which control should prevent it being paid?',[
      'The three-way match','Spend analysis','Registration on a portal site','A credit check on the supplier'],0,
      'The three-way match compares invoice, purchase order and receipt evidence before payment, so an invoice for goods nobody ordered or received fails the check.'),
    Q('C2M2-034',3,['L2M2-3.3'],'recall','Which system classifies expenditure by category, supplier and business unit so that total category spend can be seen?',[
      'The purchase-ordering system','A spend analysis system','A supplier database','A public notice portal'],1,
      'Spend analysis consolidates expenditure from ordering systems, ledgers and card data and classifies it, which is what makes total category spend and contract coverage visible.'),
    Q('C2M2-035',3,['L2M2-3.3'],'applied','Procurement needs to identify which approved suppliers have public liability insurance expiring next month. Which system holds that information?',[
      'The spend analysis system','The purchase-ordering system','The supplier database','The three-way match'],2,
      'A supplier database holds status information about suppliers — approvals, categories, certification and insurance expiry dates, performance and risk — rather than transactions.'),
    Q('C2M2-036',3,['L2M2-3.3'],'applied','A large share of expenditure is coded to a miscellaneous category, and one supplier appears under four different spellings. What is the main effect?',[
      'Purchase orders can no longer be approved','Suppliers cannot be paid at all','Existing contracts automatically expire','Spend analysis produces conclusions that are confidently wrong'],3,
      'Poor coding and duplicate supplier records do not stop transactions; they corrupt the aggregation. The analysis still produces answers, but they understate category totals and hide consolidation opportunities.'),

    /* ── LO4: evaluating pricing methods ───────────────────────────────── */
    Q('C2M2-037',4,['L2M2-4.1'],'recall','Which is a principal advantage of a fixed-price contract to the buyer?',[
      'Budget certainty, with the cost risk carried by the supplier','Full visibility of the supplier’s actual costs','Automatic adjustment of the price for inflation','Freedom to change the scope without renegotiation'],0,
      'A fixed price gives a known outturn for a defined scope and places cost risk on the supplier, which also gives the supplier a strong incentive to work efficiently.'),
    Q('C2M2-038',4,['L2M2-4.1'],'applied','A buyer insists on a fixed price for work whose scope cannot yet be defined. What is the most likely result?',[
      'A lower price than any other pricing method would produce','A price inflated by contingency, with changes treated as variations','The supplier absorbing all additional cost without any price effect','A complete transfer of risk to the supplier at no cost'],1,
      'A supplier asked to carry risk it cannot quantify prices a contingency for it and has every incentive to treat difficulty as a variation, negotiated without competitive pressure.'),
    Q('C2M2-039',4,['L2M2-4.1'],'recall','Which is a disadvantage of a schedule of rates from the buyer’s point of view?',[
      'The unit prices cannot be competitively tendered','The whole scope must be defined precisely in advance','The final total is uncertain and the work must be accurately measured','All cost risk is transferred to the supplier'],2,
      'A schedule of rates fixes unit prices but not the total. The buyer carries quantity risk, measurement costs effort, and the supplier has no incentive to do less work rather than more.'),
    Q('C2M2-040',4,['L2M2-4.1'],'applied','Emergency remedial works must begin before the extent of the damage can be surveyed. Which pricing arrangement is most appropriate?',[
      'A lump-sum price for the whole of the works','A mini-competition under an existing framework','A risk-and-reward arrangement based on outcomes','Cost reimbursement with a fixed fee and open-book audit'],3,
      'Where the scope genuinely cannot be defined, cost reimbursement lets work start without buying a contingency for the unknown. A fixed fee and open-book audit are the standard controls on it.'),
    Q('C2M2-041',4,['L2M2-4.1'],'recall','Why is a fixed fee generally preferred to a percentage fee in a cost-reimbursable contract?',[
      'A percentage fee increases as costs increase, which rewards higher spending','A fixed fee removes the need to keep cost records','A percentage fee cannot be legally enforced','A fixed fee transfers all cost risk to the supplier'],0,
      'A percentage fee grows with cost, so the supplier earns more the more it spends. A fixed fee removes that perverse incentive, and is usually combined with defined allowable costs and a ceiling.'),
    Q('C2M2-042',4,['L2M2-4.1'],'applied','A ten-year contract in a volatile materials market is priced with a twice-yearly indexed adjustment. What is the main advantage to the buyer?',[
      'Complete budget certainty for the full ten years','A lower and more honest starting price, since the supplier need not price a decade of inflation as a guess','The transfer of all input-cost risk to the supplier','That the contract requires no ongoing administration'],1,
      'Indexation removes the need for the supplier to build a long-run inflation guess into its price, so the starting price is lower and adjustment is transparent and evidenced.'),
    Q('C2M2-043',4,['L2M2-4.1'],'recall','Which is a disadvantage of variable pricing from the buyer’s point of view?',[
      'It forces the supplier to carry all inflation risk','The starting price is inflated by a large contingency','Budget certainty is lost and the chosen index may not track the supplier’s actual costs','The scope of the contract can no longer be changed'],2,
      'Under variable pricing the buyer carries the price risk and loses budget certainty, and an index that does not match the supplier’s real cost base will over- or under-compensate.'),
    Q('C2M2-044',4,['L2M2-4.1'],'applied','Under a target-cost contract, a supplier proposes a change that would reduce the cost of the work. Why does it have an incentive to do so?',[
      'Because its fee rises as costs rise','Because the buyer keeps the whole of any saving','Because savings must be reported to a regulator','Because it retains an agreed share of the saving under the pain/gain formula'],3,
      'Target pricing shares the difference between target and outturn. The supplier keeps part of any saving it finds, which is the mechanism that aligns it with the buyer.'),
    Q('C2M2-045',4,['L2M2-4.1'],'recall','Which is a principal disadvantage of target pricing?',[
      'Setting a credible target cost is difficult, and it requires open-book transparency and audit capability','It gives the supplier no incentive to identify savings','It cannot be used where the scope is broadly but not precisely known','It leaves the buyer with no exposure to any overrun'],0,
      'The mechanism depends on a defensible target and on the ability to audit costs. A target set too generously simply hands the supplier a gain share for normal performance.'),
    Q('C2M2-046',4,['L2M2-4.1'],'applied','A reward payment is proposed for a supplier based on a measure largely outside its control. What is the most likely effect?',[
      'The supplier will accept a lower base price in exchange','The supplier will price the uncertainty into its bid, so the buyer pays for a lottery','Performance against that measure will reliably improve','The cost of administering the contract will fall'],1,
      'Incentives only change behaviour where the supplier can influence the measure. Attached to something it cannot control, the reward becomes a risk the supplier prices for rather than an incentive.'),
    Q('C2M2-047',4,['L2M2-4.1'],'applied','A buyer has a fully defined scope, a competitive market and a strong need for budget certainty. Which pricing method best fits?',[
      'Cost-plus with a percentage fee','A schedule of rates','A fixed or lump-sum price','Cost reimbursement with open-book audit'],2,
      'A definable scope in a competitive market is exactly the condition in which cost risk can be transferred to the supplier cheaply, so a fixed or lump-sum price delivers certainty without a large premium.'),
    Q('C2M2-048',4,['L2M2-4.1'],'recall','Across the pricing methods in this outcome, what general relationship holds between their advantages and disadvantages?',[
      'Methods with more advantages have no corresponding disadvantages','Disadvantages arise only from poor contract administration','Advantages and disadvantages are unrelated to one another','Each advantage is generally paid for by a matching cost — certainty by inflexibility, flexibility by uncertainty'],3,
      'The trade-off is structural rather than accidental. Transferring risk buys certainty and costs flexibility; retaining risk buys flexibility and costs certainty; incentive mechanisms buy alignment and cost administration.')
  ];

  var byLo = {};
  QUESTIONS.forEach(function (q) { (byLo[q.lo] = byLo[q.lo] || []).push(q); });
  var api = {
    QUESTIONS: QUESTIONS,
    forLo: function (lo) { return (byLo[Number(lo)] || []).slice(); },
    byId: function (id) { return QUESTIONS.filter(function (q) { return q.id === id; })[0] || null; }
  };

  root.CIPS2_L2M2_PRACTICE = api;
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
})(typeof window !== 'undefined' ? window : globalThis);
