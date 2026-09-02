/* CIPS Level 2 — L2M1 textbook-style learning content.
 *
 * Source mapping is to cips2-l2m1-syllabus.js. Official learning-outcome and
 * assessment-criterion headings are retained there; the teaching prose here is
 * original. `covers` uses the 1-based position of an indicative-content item
 * under its criterion. The quality gate requires every source position exactly
 * once or more, so a lesson cannot silently omit part of the published scope.
 */
(function (root) {
  'use strict';

  function card(kind, h, p, points, covers, note) {
    return {
      kind: kind || 'concept', h: h, p: p || [], points: points || [],
      covers: covers || [], note: note || ''
    };
  }
  function q(prompt, options, answer, exp) {
    return { prompt: prompt, options: options, answer: answer, exp: exp };
  }
  function lesson(id, lo, criterion, title, minutes, summary, cards, check) {
    return { id: id, lo: lo, criterion: criterion, title: title, minutes: minutes,
      summary: summary, cards: cards, check: check || [] };
  }

  var LESSONS = [
    lesson('c2m1-01', 1, 'L2M1-1.1', 'The language of procurement and supply', 18,
      'Build the vocabulary that lets you distinguish procurement, purchasing, logistics and the different things organisations buy.', [
        card('concept', 'Procurement is wider than buying', [
          'Buying is the transaction: placing an order and paying for what arrives. Procurement is the wider management process around that transaction. It starts with understanding a need, considers the market and possible suppliers, agrees what should be bought and on what terms, manages the supplier relationship and reviews whether value was achieved.',
          'Purchasing is often used for the operational activities of ordering and expediting. Materials management focuses on planning and controlling materials. Logistics concerns the movement and storage of goods and related information. Distribution is the outbound side of that movement. Contract management begins once an agreement exists and makes sure its obligations, performance and changes are controlled.'
        ], ['Procurement: the end-to-end process of obtaining external resources.', 'Purchasing/buying: the transactional part of procurement.', 'Supply chain: the connected organisations and activities that move value from source to final customer.'], [1]),
        card('compare', 'What is being procured?', [
          'A useful first classification is capital versus revenue expenditure. Capital purchases create or improve resources expected to benefit the organisation over more than one period—for example a production machine. Revenue purchases support normal operations—for example stationery or routine maintenance.',
          'A second distinction is direct versus indirect. Direct purchases become part of, or are closely traceable to, the organisation’s main product or service. Indirect purchases support the organisation rather than becoming the thing sold. A hospital’s clinical consumables may be direct to patient care while office furniture is indirect.',
          'Goods are tangible items; services are activities or expertise. Outsourcing means arranging for an external provider to perform work previously or potentially done internally. Insourcing means performing the activity within the organisation.'
        ], ['Capital / revenue', 'Goods / services', 'Direct / indirect', 'Outsourcing / insourcing'], [2]),
        card('concept', 'Where an organisation sits in the economy', [
          'Primary-sector organisations obtain raw materials from natural resources: agriculture, fishing, forestry and extraction are common examples. Secondary-sector organisations transform inputs, typically through manufacturing or construction. Tertiary-sector organisations provide services such as retail, transport, banking, healthcare and professional advice.',
          'Procurement exists in all three sectors, but the requirement changes. A mine may source heavy equipment and engineering support; a manufacturer buys materials and components; a bank buys technology, premises services and professional expertise.'
        ], [], [3]),
        card('scenario', 'Classify the spend before you manage it', [
          'A manufacturer replaces a packaging line, renews its cleaning contract and buys cardboard used in every finished pack. The packaging line is normally capital expenditure; cleaning is an indirect service and normally revenue expenditure; the cardboard is a direct good and normally revenue expenditure.',
          'The labels matter because they affect who owns the requirement, how risk is assessed, which approval route applies and how much effort is sensible in the sourcing process. Classification is not paperwork for its own sake—it changes the procurement approach.'
        ], [], []),
        card('recap', 'A mental model to keep', [
          'When a question uses several procurement words, ask what stage or scope it describes. “Buying” is narrower than “procurement”; “logistics” is about flow and storage; “contract management” is about controlling an agreement after award; “supply chain” describes the wider network rather than one organisation.'
        ], ['Scope first, label second.', 'Classify the purchase by what it is and why it is being bought.'], [])
      ], [
        q('Which statement best distinguishes procurement from buying?', ['Procurement is the wider end-to-end process; buying is mainly transactional', 'Buying includes supply-chain strategy while procurement only places orders', 'They are always identical terms', 'Procurement applies only to capital purchases'], 0, 'Procurement covers the wider process around identifying need, sourcing, agreement and supplier management. Buying is the narrower transactional activity.'),
        q('A component fitted into every unit a manufacturer sells is most likely:', ['An indirect service', 'A direct good', 'A capital service', 'An outsourced overhead'], 1, 'It is a tangible input closely traceable to the organisation’s output, so it is a direct good.')
      ]),

    lesson('c2m1-02', 1, 'L2M1-1.2', 'Why procurement matters', 22,
      'See how procurement influences cost, value, sustainability, delegated spending and the supplier tiers behind an organisation.', [
        card('concept', 'External spend can shape organisational performance', [
          'For many organisations, a large share of total cost comes from goods and services bought from suppliers. That gives procurement leverage: a small percentage improvement in purchase cost, demand, quality or supplier performance can have a material effect on the organisation’s result.',
          'The important word is influence. Procurement rarely “owns” every cost. It works with budget holders, users, finance, legal teams and suppliers to challenge demand, select suitable sources, negotiate arrangements and control commitments.'
        ], [], [1]),
        card('concept', 'What procurement people actually do', [
          'Procurement practitioners translate business requirements into something the market can respond to. They analyse spend and supply markets, help create specifications, seek and evaluate offers, negotiate, form contracts, place or enable orders, manage supplier performance and support resolution when delivery or quality goes wrong.',
          'The role is both commercial and administrative. Good commercial judgement without reliable records, approvals and follow-through does not produce a controlled purchase.'
        ], [], [2]),
        card('concept', 'Value for money is not the lowest price', [
          'Value for money compares what the organisation receives with the total resources and risks involved. A lower purchase price can be poor value if the item fails early, arrives late, requires expensive maintenance or creates unacceptable risk.',
          'A sound decision therefore considers fitness for purpose, total cost, service, delivery, risk and the benefits the requirement is meant to produce. The exact balance depends on the purchase.'
        ], ['Ask: what outcome is required?', 'Then compare total cost, quality, service, timing and risk—not price alone.'], [3]),
        card('concept', 'Sustainability belongs in the buying decision', [
          'Procurement decisions can affect environmental, social and economic outcomes throughout a supply chain. Examples include resource use, waste, transport emissions, working conditions, local economic effects and whether a supplier can operate responsibly over the life of the contract.',
          'Responsible procurement does not mean choosing an environmental feature regardless of cost or need. It means including relevant sustainability impacts in the definition of value and risk instead of treating them as invisible.'
        ], [], [4]),
        card('compare', 'Devolved buying still needs control', [
          'In a devolved structure, staff outside a central procurement team may be authorised to buy. This can speed up routine decisions and use local knowledge, but the authority comes with responsibilities: stay within delegated limits, use approved procedures and suppliers where required, keep evidence, avoid conflicts of interest and obtain the right approvals.',
          'Procurement staff may control expenditure through sourcing policies, approved supplier lists, purchase-to-pay systems, catalogues, framework agreements, purchase orders and contract approval routes. The aim is controlled commitment—not simply stopping people from buying.'
        ], [], [5,6]),
        card('concept', 'Supplier tiers show what sits behind your supplier', [
          'A tier 1 supplier supplies the buying organisation directly. A tier 2 supplier supplies that tier 1 supplier, and further tiers extend upstream. Risks and opportunities can therefore sit several steps away from the organisation that signs the contract.',
          'A retailer buying a finished electronic product may contract with the brand owner at tier 1, while component manufacturers and raw-material processors sit in earlier tiers. Responsible supply-chain management looks beyond the immediate invoice.'
        ], [], [7]),
        card('recap', 'Procurement creates value in several ways', [
          'Strong procurement can reduce avoidable cost, improve quality and delivery, support sustainability, manage risk and make expenditure visible and controlled. Those benefits depend on collaboration: procurement is not a separate island from the people who use, approve and pay for what is bought.'
        ], [], [])
      ], [
        q('Which option is the best example of value for money?', ['The lowest quoted unit price in every case', 'The best balance of required outcome, total cost and relevant risk', 'The supplier with the longest relationship', 'The option with the most features'], 1, 'Value for money is broader than price. It considers the outcome required, whole cost and relevant performance/risk factors.'),
        q('A tier 2 supplier is normally a supplier that:', ['Supplies the buying organisation directly', 'Supplies one of the buying organisation’s direct suppliers', 'Has failed a performance target twice', 'Operates in a second country'], 1, 'Tier 1 supplies the buying organisation directly; tier 2 supplies tier 1.')
      ]),

    lesson('c2m1-03', 1, 'L2M1-1.3', 'Map the supply chain', 18,
      'Follow value downstream to customers and upstream to suppliers, and distinguish the customer from the final consumer.', [
        card('concept', 'Downstream: towards the user', [
          'A customer is the person or organisation that buys from a supplier. A downstream customer is further along the chain towards the final use of the product or service. One organisation can therefore be a supplier to one party and a customer of another at the same time.',
          'For a component manufacturer, the immediate customer may be an assembler. The assembler’s customer may be a wholesaler, followed by a retailer. Each step is downstream from the component manufacturer.'
        ], [], [1]),
        card('compare', 'Customer is not always the final consumer', [
          'The customer is the party that purchases from a particular supplier. The final consumer is the person or organisation that ultimately uses or consumes the finished offering. They can be the same, but often are not.',
          'A supermarket is a food manufacturer’s customer; the shopper who eats the product is the final consumer. This distinction matters because commercial requirements may come from the customer while safety, usability and reputation are ultimately tested by the consumer.'
        ], [], [2]),
        card('concept', 'Upstream: towards the source', [
          'A supplier provides goods or services to a customer. Upstream suppliers sit behind that supplier. Looking upstream reveals the materials, labour, processes and dependencies that make the direct supplier’s delivery possible.',
          'The tier language gives a simple map: tier 1 supplies you, tier 2 supplies tier 1, tier 3 supplies tier 2, and so on. The numbering is always relative to the organisation whose supply chain you are mapping.'
        ], [], [3,4]),
        card('concept', 'Supply chains cross borders', [
          'International supply chains involve activity in more than one country. Global supply chains can span many regions, currencies, legal systems, transport modes and time zones. More reach can offer access to capability and cost advantages, but it can also increase lead time, coordination difficulty and exposure to disruption.',
          'A map should therefore show flows, not just company names: materials and products move one way, while orders, forecasts, information and money create other flows.'
        ], [], [5]),
        card('scenario', 'Read an end-to-end chain', [
          'Consider a cotton shirt: cotton grower → spinner → fabric mill → garment manufacturer → brand/distributor → retailer → consumer. A retailer may contract only with the distributor, but quality, labour and continuity risks can originate several tiers upstream.',
          'An end-to-end view helps procurement ask where value is created, where delay can occur and which dependencies are hidden behind the direct supplier.'
        ], [], [6]),
        card('recap', 'Use one reference point', [
          'When a question asks “upstream” or “downstream”, choose the organisation you are standing in first. Upstream points towards suppliers and sources. Downstream points towards customers and the final consumer.'
        ], ['Upstream ← suppliers | focal organisation | customers → downstream'], [])
      ], [
        q('A retailer buys packaged food from a manufacturer and sells it to shoppers. Who is the manufacturer’s customer?', ['The shopper only', 'The retailer', 'The retailer’s logistics provider', 'The raw-material supplier'], 1, 'The retailer purchases directly from the manufacturer, so it is the manufacturer’s customer. The shopper is the final consumer.'),
        q('Looking upstream from a buying organisation means looking towards:', ['Its customers and final consumers', 'Its suppliers and their suppliers', 'Its internal users only', 'Its sales forecast only'], 1, 'Upstream points towards the source side of the chain: suppliers and the suppliers behind them.')
      ]),

    lesson('c2m1-04', 2, 'L2M1-2.1', 'Procurement performance and organisational efficiency', 24,
      'Connect procurement decisions to profit, savings, budgets, targets, whole-life cost and the way the function is organised.', [
        card('concept', 'A purchasing saving can flow straight to profit', [
          'If an organisation sells the same amount at the same price but reduces the cost of bought-in inputs without damaging performance, the saving increases profit before tax by the same amount. That is why procurement cost improvement can have a disproportionate effect compared with trying to generate the same profit from extra sales.',
          'The point is not that every price cut is good. A saving only creates value if it does not cause larger costs, failures or risks elsewhere.'
        ], [], [1]),
        card('concept', 'Savings come from more than negotiation', [
          'Procurement can improve efficiency by consolidating demand, removing unnecessary specification, reducing process effort, choosing better delivery patterns, improving payment or ordering arrangements, preventing maverick spend and working with suppliers to reduce waste.',
          'A credible saving needs a baseline and a method. “The supplier offered 8% off list price” is not automatically an 8% saving if nobody would have paid list price.'
        ], [], [2]),
        card('concept', 'Budgets turn plans into control', [
          'A budget sets an authorised financial plan for a period or activity. Procurement supports budget control by making commitments visible before invoices arrive, comparing expected and actual spend, and helping budget holders understand variances.',
          'Monitoring is not simply checking whether money remains. It also asks whether the organisation is buying what was planned, whether prices or volumes have changed and whether corrective action is needed.'
        ], [], [3]),
        card('concept', 'Procurement objectives should support organisational targets', [
          'A procurement team may be asked to reduce cost, improve service, reduce supply risk, shorten lead time, improve sustainability, increase compliance or support innovation. The right mix follows the organisation’s priorities.',
          'A hospital and a fashion retailer can both seek value for money while weighting continuity, speed, quality and risk very differently. Procurement performance should therefore be judged against relevant organisational targets rather than against one universal metric.'
        ], [], [4,6]),
        card('compare', 'Price is only one part of ownership cost', [
          'Total cost of ownership looks beyond acquisition price to costs that arise because the organisation owns or uses the item: delivery, installation, energy, training, maintenance, consumables, downtime and disposal can all matter. Whole-life costing takes the same long-term perspective over the useful life of the requirement.',
          'A £9,000 machine that costs £3,000 a year to run can be worse value than a £12,000 machine that costs £1,000 a year to run. The relevant comparison depends on the expected life and all material costs.'
        ], [], [5]),
        card('compare', 'How the procurement function can be organised', [
          'Centralised procurement concentrates authority and expertise in one team. It can aggregate demand, standardise processes and strengthen control. Devolved procurement gives local teams more decision authority, which can improve responsiveness and local fit but may fragment demand and controls.',
          'A lead-buyer arrangement sits between them: a person or team takes the lead for a category or requirement on behalf of several parts of the organisation. Real organisations often use a hybrid rather than one pure model.'
        ], ['Centralised: consistency and leverage.', 'Devolved: responsiveness and local knowledge.', 'Lead buyer: category leadership across several users.'], [7]),
        card('scenario', 'Choose the measure that matches the objective', [
          'If the objective is continuity of critical supply, reporting only price variance is inadequate. Measures such as on-time delivery, shortage incidents and recovery time may matter more. If the objective is reducing process cost, purchase-order cycle time and transaction effort may be relevant.',
          'Effective measurement starts with the desired organisational result and works backwards to evidence.'
        ], [], [])
      ], [
        q('Which is most consistent with total cost of ownership?', ['Comparing purchase price only', 'Considering acquisition plus relevant operating, maintenance and disposal costs', 'Ignoring costs after contract award', 'Choosing the longest warranty regardless of cost'], 1, 'Total cost of ownership broadens the comparison beyond acquisition price to relevant costs over ownership/use.'),
        q('A centralised procurement structure is most likely to help an organisation:', ['Aggregate demand and standardise controls', 'Remove the need for authorisation', 'Guarantee every local requirement is unique', 'Eliminate supplier risk'], 0, 'Centralisation can consolidate spend, expertise and controls. It does not remove the need for approval or eliminate risk.')
      ]),

    lesson('c2m1-05', 2, 'L2M1-2.2', 'The Five Rights of procurement', 18,
      'Use the Five Rights as a decision framework and connect them to value for money.', [
        card('concept', 'The Five Rights are a balance, not five separate targets', [
          'A procurement decision is often described through five rights: the right quality, in the right quantity, at the right time, from/to the right place, at the right price or total cost. The wording varies slightly in practice, but the principle is stable: value depends on several dimensions being fit for the requirement.',
          'Optimising one right while ignoring the others can destroy value. A low price is not useful if the product is unusable; perfect quality delivered after the critical date is still a failure.'
        ], [], [1]),
        card('concept', 'Right quality', [
          'Quality means fitness for the intended purpose—not “the highest possible specification”. Over-specification can waste money just as under-specification can create failure. A good specification defines what the organisation genuinely needs and how conformity will be judged.'
        ], [], [2]),
        card('concept', 'Right quantity and right time', [
          'Too little quantity can stop operations or sales; too much can tie up cash, consume storage and increase obsolescence. Timing has a similar balance: late delivery can interrupt activity, while unnecessarily early delivery may create inventory cost and risk.',
          'The appropriate quantity and timing are therefore linked to demand, lead time, storage and the consequence of shortage.'
        ], [], []),
        card('concept', 'Right place and right price/total cost', [
          'Place means the correct point of delivery or availability. A national contract can still fail if goods arrive at the wrong site or service is unavailable where users need it.',
          'Price should be read in the context of total cost. Freight, installation, payment terms, usage cost, failure and disposal can make the cheapest quote more expensive in practice.'
        ], [], []),
        card('scenario', 'Apply all five rights at once', [
          'A supplier offers safety gloves 15% cheaper, but only in pallet quantities, with a six-week lead time and delivery to one central depot. For a small operation with limited storage and urgent site-level demand, several rights may be wrong even though the unit price is attractive.',
          'The Five Rights help explain why a value-for-money decision can rationally reject the lowest quoted price.'
        ], [], [3]),
        card('recap', 'Exam habit: identify the failed right', [
          'Scenario questions often describe a problem rather than name a right. “Arrived after the shutdown” points to time. “Half the stock expired before use” points strongly to quantity and may also reveal poor timing. “Works, but not at the required site” points to place.'
        ], [], [])
      ], [
        q('A buyer orders twice the amount needed to obtain a lower unit price, causing much of it to become obsolete. Which right was most clearly compromised?', ['Right place', 'Right quantity', 'Right quality', 'Right time only'], 1, 'The order quantity exceeded the real need, so the lower price did not represent better overall value.'),
        q('“Right quality” is best understood as:', ['The highest specification available', 'Fitness for the intended requirement', 'The brand with the best reputation', 'The option with the most features'], 1, 'Quality should be fit for purpose. Over-specification can waste resources just as under-specification can fail the requirement.')
      ]),

    lesson('c2m1-06', 3, 'L2M1-3.1', 'External suppliers and inbound value', 15,
      'Understand why organisations rely on outside suppliers, how services can be outsourced and how direct suppliers connect to a wider chain.', [
        card('concept', 'No organisation makes everything itself', [
          'Organisations use external suppliers when another organisation can provide goods, services, capability, capacity or specialist knowledge that the buyer does not hold internally—or does not choose to hold. External supply can give access to scale, technology, expertise and variable capacity.',
          'The decision also creates dependency. The buying organisation still owns the business consequence if a critical supplier fails, even though the activity is outside its legal boundary.'
        ], [], [1]),
        card('concept', 'Outsourcing is a make-or-buy decision', [
          'Outsourcing transfers the performance of an activity to an external provider under an agreement. Common examples include facilities management, payroll processing, logistics, IT support and specialist maintenance.',
          'Outsourcing does not outsource accountability. The buyer needs a clear requirement, suitable service measures, governance and enough retained knowledge to manage the supplier.'
        ], [], [2]),
        card('concept', 'Your supplier has suppliers too', [
          'A direct supplier depends on its own labour, materials, logistics and sub-suppliers. This means the buying organisation’s delivery can be affected by events it cannot see from the purchase order alone.',
          'Supply-chain thinking therefore asks what critical dependencies sit behind tier 1 and whether risks such as capacity constraints, single-source components or ethical problems exist upstream.'
        ], [], [3]),
        card('scenario', 'External does not mean “someone else’s problem”', [
          'A company outsources payroll to a specialist. The supplier processes the calculations, but the company still needs accurate employee data, agreed deadlines, controls over confidential information and a route for correcting errors. The service is external; the outcome still matters to the buyer.'
        ], [], [])
      ], [
        q('Which statement about outsourcing is most accurate?', ['It removes the buyer’s need to manage the outcome', 'It uses an external provider to perform an activity under an agreement', 'It is limited to physical goods', 'It always reduces total cost'], 1, 'Outsourcing moves performance to an external provider but does not remove the buyer’s need to define and manage the required outcome.'),
        q('Why might a buyer look beyond its tier 1 supplier?', ['To avoid using contracts', 'Because upstream dependencies can affect continuity, quality and risk', 'Because tier 1 suppliers never add value', 'Only to calculate VAT'], 1, 'Tier 1 delivery depends on upstream suppliers and resources, so important risks can sit beyond the direct contractual relationship.')
      ]),

    lesson('c2m1-07', 3, 'L2M1-3.2', 'Products, services and customers', 15,
      'Distinguish products from services and follow what the organisation delivers downstream to its customers.', [
        card('compare', 'Products and services behave differently', [
          'Products are tangible outputs that can usually be stored, transported and inspected separately from the customer. Services are activities or performances, often produced and consumed at the same time and influenced by interaction between provider and customer.',
          'Many offerings combine both. A photocopier contract may include a physical machine plus maintenance, consumables and support. Procurement needs to understand the whole requirement rather than forcing every purchase into a pure category.'
        ], [], [1]),
        card('concept', 'The customer defines whether value was delivered', [
          'A customer receives and pays for the organisation’s product or service. Requirements can include specification, quantity, timing, location, service level, price and experience. If those requirements are not understood, upstream procurement can optimise the wrong thing.',
          'Procurement therefore connects to the customer even when it never speaks to that customer directly: what is bought upstream affects what can be delivered downstream.'
        ], [], [2]),
        card('concept', 'Customers are part of the chain, not outside it', [
          'The supply chain does not stop at the organisation’s warehouse door. Customers, distributors, retailers and final consumers form the downstream side. Forecasts, orders and feedback move back upstream while products, services and information move downstream.',
          'Thinking in chains helps explain the bullwhip effect of poor information, the importance of service levels and why supplier problems can ultimately become customer problems.'
        ], [], [3]),
        card('scenario', 'Trace a customer requirement upstream', [
          'A restaurant promises a gluten-free menu item. That downstream customer promise creates upstream procurement requirements: ingredients must meet the specification, cross-contamination controls may matter, suppliers need reliable information and deliveries must support availability. Customer value and procurement are connected.'
        ], [], [])
      ], [
        q('Which is a common characteristic of a service compared with a physical product?', ['It can always be stored for later', 'Its delivery often involves direct performance or interaction', 'It never needs a specification', 'It cannot be measured'], 1, 'Services are activities/performance and are often delivered through interaction; they can still be specified and measured.'),
        q('Why are customers relevant to procurement?', ['Only because customers approve purchase orders', 'Because upstream buying affects the organisation’s ability to deliver customer requirements', 'Because every customer is also a tier 1 supplier', 'Only because of payment terms'], 1, 'The goods and services procured upstream enable the organisation’s downstream product or service, so customer requirements should influence procurement decisions.')
      ]),

    lesson('c2m1-08', 4, 'L2M1-4.1', 'The sourcing process from need to review', 28,
      'Learn the full sequence of sourcing activity and separate pre-award work from post-award contract execution.', [
        card('process', 'Stage 1 — identify the need', [
          'Sourcing begins by establishing what problem or requirement exists. Starting with a preferred supplier or product before the need is clear narrows competition too early and can lock the organisation into a poor specification.',
          'The requirement should connect to an authorised business need, budget and appropriate stakeholder ownership.'
        ], [], [1]),
        card('process', 'Stage 2 — specify what success looks like', [
          'A specification converts the need into requirements that suppliers can understand and respond to. It may describe inputs, outputs, performance, service levels, standards, quantities, delivery and acceptance criteria.',
          'Good specifications are clear enough to compare offers without being unnecessarily restrictive.'
        ], [], [2]),
        card('process', 'Stages 3–5 — invite, receive and evaluate quotations', [
          'The buyer invites suitable suppliers to quote or tender, receives their responses under a controlled process and evaluates them against pre-defined criteria. Consistent instructions and deadlines improve fairness and comparability.',
          'Evaluation should use the requirement and agreed criteria—not whichever feature looks attractive after bids arrive.'
        ], [], [3,4,5]),
        card('process', 'Stages 6–7 — recommend and authorise the award', [
          'Evaluation produces a recommendation, not automatically a contract. The recommendation is documented so an authorised person can approve the commitment within the organisation’s delegated authority and governance rules.',
          'The separation between evaluation, recommendation and authorisation is an important control.'
        ], [], [6,7]),
        card('process', 'Stage 8 — create the purchasing commitment', [
          'Once appropriately authorised, the organisation places the order or formalises the contract. Routine demand may be handled through blanket or framework arrangements with call-off orders, allowing repeated purchases against pre-agreed terms instead of running a full competition each time.',
          'The document used must make clear what is being ordered, by whom, on what terms and for what delivery.'
        ], [], [8]),
        card('process', 'Stages 9–12 — manage delivery, payment and learning', [
          'After award, procurement activity continues. Performance and delivery are monitored; overdue items may be expedited; invoices are checked and paid through the agreed process; and outcomes are reviewed so problems and improvements inform future sourcing.',
          'Expediting means following up and acting to secure required delivery, especially where a commitment is at risk. It is not the same as sourcing a new supplier.'
        ], [], [9,10,11,12]),
        card('compare', 'Pre-award versus post-award', [
          'Pre-award activity happens before the supplier is selected and the contract is awarded: defining need, specifying, approaching the market, receiving and evaluating offers, recommending and approving an award. Post-award activity manages the resulting commitment: ordering/call-offs, delivery, performance, expediting, invoice/payment control and review.',
          'The exact boundary depends on the organisation’s process, but the distinction is useful because risks, records and responsibilities change once a contract exists.'
        ], [], [13]),
        card('recap', 'The sequence is a control in itself', [
          'Need → specification → invite → receive → evaluate → recommend → authorise → order/contract → monitor → pay → expedite where needed → review. Real processes may combine steps, but skipping the purpose behind a step creates risk.'
        ], [], [])
      ], [
        q('What should normally happen before suppliers are invited to quote?', ['The supplier is paid', 'The requirement is identified and specified', 'The contract is reviewed after completion', 'The invoice is matched'], 1, 'The buyer should establish the need and create a suitable specification before asking the market to respond.'),
        q('Which activity is clearly post-award?', ['Evaluating quotations', 'Recommending a supplier', 'Monitoring supplier delivery performance', 'Preparing the initial specification'], 2, 'Monitoring delivery performance occurs after an agreement/order exists; the other activities belong to pre-award sourcing.')
      ]),

    lesson('c2m1-09', 5, 'L2M1-5.1', 'Effective and efficient procurement administration', 15,
      'Understand what procurement administration does and why doing the right things differs from doing them with minimum waste.', [
        card('concept', 'Administration turns a commercial decision into a controlled record', [
          'Procurement administration is the organised handling of documents, approvals, records, communications and transactions that support purchasing and contracts. It provides evidence of what was requested, agreed, authorised, delivered and paid.',
          'Without reliable administration, a good sourcing decision can still produce duplicate orders, missed obligations, late payment, uncontrolled changes or an audit trail that cannot explain what happened.'
        ], [], [1]),
        card('process', 'Review the path used to form the agreement', [
          'Effective administration checks that the correct steps were followed to create the supplier agreement: an authorised requirement, appropriate competition or justification, documented evaluation, approval and a clear contract or order.',
          'Review is particularly valuable when a dispute arises or when the organisation repeats the category, because the record shows both the decision and how it was reached.'
        ], [], [2]),
        card('compare', 'Effective is not the same as efficient', [
          'Effectiveness means achieving the intended result. Efficiency means achieving that result with proportionate use of time, money and effort. A process with fifteen signatures may eventually prevent unauthorised spend, so it can be effective, while still being inefficient if two risk-based approvals would provide the same control.',
          'The reverse is also possible: an extremely fast process that bypasses necessary checks is efficient in speed but ineffective as a control.'
        ], ['Effective: does it achieve the required outcome?', 'Efficient: does it avoid unnecessary resource and delay?'], [3]),
        card('scenario', 'Control should be proportionate', [
          'A low-value catalogue order and a high-risk outsourced service should not require identical administration. Proportionate controls reduce friction on routine spend while preserving scrutiny where value, risk or complexity justify it.'
        ], [], [])
      ], [
        q('A process achieves the required control but uses unnecessary approvals and delay. It is best described as:', ['Efficient but ineffective', 'Effective but inefficient', 'Neither controlled nor documented', 'Automatically non-compliant'], 1, 'It achieves the intended control, so it is effective, but it uses more resource and delay than necessary, so it is inefficient.'),
        q('Why are procurement records important?', ['Only to increase the number of forms', 'To evidence what was requested, authorised, agreed, delivered and paid', 'To remove the need for supplier communication', 'To guarantee the supplier performs'], 1, 'A reliable record supports control, auditability, dispute handling and follow-through; it cannot guarantee supplier performance by itself.')
      ]),

    lesson('c2m1-10', 5, 'L2M1-5.2', 'Pre-contract administration', 22,
      'Follow the documents and controls used before a contract is awarded, from requisition to evaluation.', [
        card('process', 'Requisition and statement of requirement', [
          'A requisition is an internal request to buy. It should identify the need, requester, quantity or scope, timing, coding/budget information and the approval needed to start procurement. A statement of requirement explains what outcome, goods or service is needed in enough detail for the next sourcing step.',
          'The requisition authorises the process to begin; it is not normally the supplier’s order.'
        ], [], [1]),
        card('concept', 'Specifications, KPIs and contract terms answer different questions', [
          'The specification describes the requirement. Key performance indicators (KPIs) describe how important aspects of performance will be measured. Contract terms set the legal and commercial rules—such as payment, liability, confidentiality, change and termination.',
          'They work together. A contract can contain excellent legal terms and still fail if the service requirement is vague.'
        ], [], [2]),
        card('compare', 'RFQ and invitation to tender', [
          'A request for quotation (RFQ) is commonly used where the requirement is sufficiently clear and suppliers can respond mainly on price and defined commercial terms. An invitation to tender (ITT) is typically more formal and may seek detailed technical, service and commercial responses for a more complex requirement.',
          'The label matters less than the discipline: suppliers should receive a clear, consistent request and a defined method and deadline for responding.'
        ], [], [3]),
        card('concept', 'Pre-qualification asks “can this supplier credibly compete?”', [
          'A pre-qualification questionnaire (PQQ) gathers information before full bid evaluation, for example financial standing, capability, experience, certifications, capacity or relevant policies. It helps avoid spending evaluation effort on suppliers that cannot meet essential entry requirements.',
          'Selection criteria should be relevant and proportionate; unnecessary barriers can reduce competition.'
        ], [], [4]),
        card('process', 'Receive offers under control', [
          'Quotations and tenders should be received in a way that protects confidentiality, applies deadlines consistently and preserves an audit trail. Late or altered submissions need treatment according to the stated rules rather than ad-hoc preference.',
          'Good administration prevents one supplier receiving information or flexibility that others did not.'
        ], [], [5]),
        card('process', 'Assess against the requirement and stated criteria', [
          'Evaluation compares compliant offers using the criteria and weightings defined for the procurement. Evidence may cover quality, service, delivery, risk, sustainability, total cost and other relevant factors.',
          'Scores need enough written rationale that another authorised reader can understand why the recommendation followed from the evidence.'
        ], [], [6]),
        card('recap', 'Pre-contract document chain', [
          'Internal need/requisition → requirement/specification → performance and contractual framework → market request (RFQ/ITT, and PQQ where appropriate) → controlled receipt → documented evaluation. Each document answers a different control question.'
        ], [], [])
      ], [
        q('What is the main purpose of a purchase requisition?', ['To invoice the supplier', 'To create an internal request and authority to start purchasing activity', 'To acknowledge supplier delivery', 'To replace the final contract'], 1, 'A requisition is an internal request/control document. The purchase order or contract is the external commitment.'),
        q('A PQQ is most directly used to:', ['Pay the selected supplier', 'Assess whether potential suppliers meet relevant entry/capability requirements', 'Record goods received', 'Approve an invoice after delivery'], 1, 'Pre-qualification screens relevant supplier capability or suitability before full tender evaluation.')
      ]),

    lesson('c2m1-11', 5, 'L2M1-5.3', 'Award and post-award administration', 18,
      'Control the documents that turn an award into delivery and payment, and understand how matching catches exceptions.', [
        card('process', 'Record the award and create the commitment', [
          'Once the recommendation is approved, the organisation issues the appropriate award communication and creates the contract or purchase order. The purchase order records what is authorised to be bought, quantities or scope, price, delivery details and relevant terms or references.',
          'The crucial control is that the commitment follows approval. Creating an order first and seeking authority afterwards defeats the purpose of delegated authority.'
        ], [], [1]),
        card('concept', 'Acknowledgement and delivery evidence', [
          'A supplier order acknowledgement confirms how the supplier has interpreted and accepted the order. Differences in price, quantity, date or terms should be resolved rather than silently filed.',
          'A delivery note accompanies goods and records what the supplier says was delivered. The buyer’s receiving record or goods-received confirmation provides internal evidence of what actually arrived.'
        ], [], [2]),
        card('concept', 'The supplier invoice is a claim for payment', [
          'An invoice states the supplier’s request for payment, usually referencing the goods or services, quantity, price, tax and agreed payment terms. Receipt of an invoice does not by itself prove that the purchase was authorised or correctly delivered.',
          'That is why invoice control relies on matching the invoice to independent records.'
        ], [], [3]),
        card('process', 'Matching finds disagreement before money leaves', [
          'A common three-way match compares the purchase order, the receipt/delivery evidence and the supplier invoice. If all agree within defined tolerances, payment can proceed through the authorised process. If they do not, the exception is investigated.',
          'Examples include an invoice price above the order, a quantity invoiced above the quantity received, duplicate invoices or goods delivered without an authorised order.'
        ], [], [4]),
        card('scenario', 'An exception is a signal, not an inconvenience', [
          'Suppose the order is for 100 units at £8, the receiving record shows 90 units, and the invoice asks for 100. Paying automatically would remove the control value of the records. The mismatch should be resolved: perhaps 10 units are still in transit, the receiving record is wrong, or the supplier invoiced too early.',
          'A controlled process makes the cause visible before payment.'
        ], [], [])
      ], [
        q('Which three records form a common three-way invoice match?', ['Requisition, tender, budget', 'Purchase order, receipt evidence and supplier invoice', 'PQQ, contract recommendation and invoice', 'Forecast, quotation and credit note'], 1, 'The match compares what was authorised, what was received and what the supplier is asking to be paid.'),
        q('A supplier order acknowledgement differs from the purchase order. What is the best response?', ['Ignore it because the purchase order always wins automatically', 'Resolve the discrepancy before it becomes a delivery or payment problem', 'Delete the acknowledgement', 'Pay the supplier immediately'], 1, 'The acknowledgement shows how the supplier has understood the order. Differences should be clarified before they propagate into fulfilment or invoicing.')
      ]),

    lesson('c2m1-12', 5, 'L2M1-5.4', 'Approvals, authority and separation of duties', 20,
      'Understand why procurement approvals exist and how to design control without creating needless delay.', [
        card('concept', 'Authorisation controls who may commit the organisation', [
          'Budgets, requisitions, purchase orders and tender decisions commonly require authorisation because they commit resources or create contractual risk. Approval confirms that an appropriately empowered person accepts the need, funding and proposed action.',
          'The exact route should reflect the organisation’s delegated-authority policy, value thresholds, risk and type of purchase.'
        ], [], [1]),
        card('concept', 'Separation of duties reduces error and fraud risk', [
          'If one person can request a purchase, approve it, confirm receipt and approve the invoice, there is little independent challenge. Separation of duties divides incompatible activities so another person or system control must confirm key stages.',
          'No design removes all risk, but independent checks make error and deliberate abuse harder to conceal.'
        ], [], [2]),
        card('process', 'Recommendations still need authorised decisions', [
          'A sourcing team may evaluate tenders and recommend the best offer, but the authority to award can sit elsewhere. The recommendation should show the evidence, evaluation and commercial position so the authorised decision-maker can approve or challenge it.',
          'This protects both governance and the people involved: the record distinguishes analysis from the formal commitment.'
        ], [], [3]),
        card('concept', 'Delegated authority defines limits', [
          'Delegated authority sets the level and type of commitment a person may approve. Limits may increase with seniority and can differ for contracts, capital expenditure, unbudgeted spend or high-risk arrangements.',
          'Splitting a requirement into smaller orders to stay under a limit defeats the control and is normally prohibited by sound procurement policy.'
        ], [], [4]),
        card('compare', 'Good controls are risk-based, not slow by default', [
          'Too few approvals create uncontrolled commitments. Too many create bottlenecks, encourage workarounds and consume management time. Efficient control uses proportionate thresholds, workflow, standard catalogues or pre-approved arrangements for routine low-risk spend while escalating unusual or material commitments.',
          'The goal is not “maximum approval”; it is sufficient independent control at the right points.'
        ], [], [5]),
        card('scenario', 'Spot the control weakness', [
          'A buyer raises a requisition, selects the supplier, approves the order, confirms receipt and approves the invoice. Even if every transaction is genuine, the design concentrates too many incompatible duties in one person. Separating at least approval and receipt/payment checks creates independent evidence.'
        ], [], [])
      ], [
        q('What is the main purpose of separation of duties?', ['To make every purchase take longer', 'To prevent one person controlling all key stages without independent check', 'To remove the need for documented authority', 'To ensure only procurement staff can receive goods'], 1, 'Separation of duties introduces independent checks and reduces the opportunity for error or abuse to pass unnoticed.'),
        q('A manager deliberately splits one large requirement into several smaller orders solely to stay below an approval threshold. This:', ['Strengthens delegated authority', 'Circumvents the intended control', 'Is always required for efficiency', 'Converts capital spend to revenue spend'], 1, 'Artificially splitting a commitment to evade an authority limit defeats the purpose of the control.')
      ]),

    lesson('c2m1-13', 6, 'L2M1-6.1', 'Ethics and responsible procurement', 24,
      'Recognise ethical conduct, governance, documented procedures and labour risks across procurement decisions and supply chains.', [
        card('concept', 'Procurement has unusual ethical exposure', [
          'Procurement professionals influence supplier access to business and often handle commercially sensitive information, competition and significant expenditure. That creates opportunities for conflicts of interest, gifts or hospitality to distort judgement, confidential information to be misused, or suppliers to be treated inconsistently.',
          'Ethical procurement protects the integrity of the decision as well as the organisation’s reputation and legal position.'
        ], [], [1]),
        card('concept', 'A code of conduct turns values into expected behaviour', [
          'A professional or organisational code normally addresses integrity, impartiality, conflicts of interest, confidentiality, gifts and hospitality, fair treatment, legal compliance and the duty to raise concerns. The value of a code is not the document itself but the consistent decisions it requires when pressure appears.',
          'For CIPS study, know that the CIPS Code of Conduct is part of the ethical framework expected of procurement and supply professionals. In practice, always use the current published code rather than relying on a memorised wording from a study aid.'
        ], [], [2]),
        card('scenario', 'Apply the rule before the relationship', [
          'A long-standing supplier offers a buyer an expensive weekend trip while a tender is being evaluated. Even if the buyer believes the gift would not change the score, accepting it creates a conflict or appearance of influence and undermines confidence in equal treatment.',
          'A robust response follows the organisation’s gifts-and-hospitality policy, declares the situation and keeps the procurement decision demonstrably impartial.'
        ], [], [3]),
        card('concept', 'Policies and procedures make ethical behaviour repeatable', [
          'Documented procurement policies set expectations for competition, approvals, conflicts, supplier due diligence, record keeping and exceptions. Procedures translate those policies into practical steps and responsibilities.',
          'Documentation matters because ethical control cannot depend on each employee improvising what “seems fair” when supplier pressure, urgency or personal relationships are involved.'
        ], [], [4]),
        card('concept', 'Corporate governance asks who directs, controls and is accountable', [
          'Corporate-governance principles support transparent decision-making, accountability, appropriate oversight and management of organisational risk. Procurement contributes by keeping commitments authorised, decisions evidenced, conflicts managed and supplier performance visible.',
          'Governance is therefore closely connected to the approval and separation-of-duties controls already studied—not a separate ethical add-on.'
        ], [], [5]),
        card('concept', 'Labour risk can sit deep in the supply chain', [
          'Bonded labour and other exploitative labour practices may occur several tiers upstream, where the buying organisation has no direct contract. Warning signs can include recruitment debt, withheld identity documents, restriction of movement, coercion or working conditions that indicate people cannot freely leave employment.',
          'Responsible procurement uses proportionate due diligence, supplier expectations, contractual requirements, monitoring and escalation. The aim is to identify and address credible risk rather than assume a signed supplier code makes the supply chain safe.'
        ], [], [6]),
        card('recap', 'A simple ethical test', [
          'Ask whether the decision is lawful, authorised, impartial, transparent enough to explain, consistent with policy and respectful of people affected by the supply chain. Where there is a conflict or concern, disclose and escalate through the appropriate route rather than deciding privately that it is harmless.'
        ], ['Integrity', 'Impartiality', 'Transparency', 'Accountability', 'Responsible supply chains'], [])
      ], [
        q('Why can a supplier gift create a procurement ethics problem even if the buyer believes it will not affect the score?', ['Because every supplier gift is automatically a criminal offence', 'Because it can create a conflict or appearance of influence and undermine impartiality', 'Because suppliers may never communicate with buyers', 'Because gifts convert a tender into a purchase order'], 1, 'Ethical control protects actual impartiality and confidence in the process. Gifts around a live decision can create a conflict or appearance of influence.'),
        q('Why might responsible procurement look beyond the direct supplier?', ['Because labour and other risks can exist in upstream tiers', 'Because contracts are only valid with tier 2 suppliers', 'Because direct suppliers have no responsibilities', 'Only to negotiate a lower VAT rate'], 0, 'Supply-chain risks can sit several tiers upstream, so proportionate due diligence may need visibility beyond the immediate supplier.')
      ])
  ];

  var GROUPS = [
    { lo: 1, title: 'The role of procurement and supply', lessonIds: ['c2m1-01','c2m1-02','c2m1-03'] },
    { lo: 2, title: 'Organisational impact', lessonIds: ['c2m1-04','c2m1-05'] },
    { lo: 3, title: 'Products, services, suppliers and customers', lessonIds: ['c2m1-06','c2m1-07'] },
    { lo: 4, title: 'The sourcing process', lessonIds: ['c2m1-08'] },
    { lo: 5, title: 'Procurement administration', lessonIds: ['c2m1-09','c2m1-10','c2m1-11','c2m1-12'] },
    { lo: 6, title: 'Ethics and responsible procurement', lessonIds: ['c2m1-13'] }
  ];

  var GLOSSARY = [
    ['Procurement','The wider end-to-end process used to obtain and manage external goods, services or works.'],
    ['Purchasing','The more transactional activities of ordering and buying.'],
    ['Supply chain','The connected organisations, resources and activities that move value from sources to customers and consumers.'],
    ['Direct procurement','Buying inputs closely traceable to the organisation’s main product or service.'],
    ['Indirect procurement','Buying goods and services that support operations rather than becoming the main output.'],
    ['Capital expenditure','Spend that creates or improves a resource expected to provide benefit beyond the current period.'],
    ['Revenue expenditure','Spend incurred in normal operations and consumed as the organisation operates.'],
    ['Outsourcing','Arranging for an external provider to perform an activity under an agreement.'],
    ['Insourcing','Performing an activity within the organisation.'],
    ['Tier 1 supplier','A supplier that supplies the focal buying organisation directly.'],
    ['Tier 2 supplier','A supplier to a tier 1 supplier.'],
    ['Upstream','Towards suppliers and sources in a supply chain.'],
    ['Downstream','Towards customers and final consumers in a supply chain.'],
    ['Value for money','The best balance of required outcome, total resources/cost and relevant risk—not simply lowest price.'],
    ['Total cost of ownership','A view of relevant costs across acquisition, use, support and disposal.'],
    ['Five Rights','A framework considering quality, quantity, time, place and price/total cost.'],
    ['Specification','A description of what is required and the conditions or performance it must meet.'],
    ['RFQ','Request for quotation: an invitation to submit a price/commercial response to a defined requirement.'],
    ['ITT','Invitation to tender: a structured invitation for suppliers to submit detailed bids.'],
    ['PQQ','Pre-qualification questionnaire used to assess relevant supplier capability or suitability before full evaluation.'],
    ['KPI','Key performance indicator: a defined measure used to track an important aspect of performance.'],
    ['Purchase requisition','An internal request to buy and to begin the appropriate purchasing process.'],
    ['Purchase order','An authorised document placing an order with a supplier.'],
    ['Expediting','Following up and acting to secure required supplier delivery, especially where it is at risk.'],
    ['Three-way match','Comparison of purchase order, receipt evidence and supplier invoice before payment.'],
    ['Delegated authority','The formal limit and type of commitment a person is authorised to approve.'],
    ['Separation of duties','Dividing incompatible activities so key stages receive independent checks.'],
    ['Corporate governance','The structures and principles through which an organisation is directed, controlled and held accountable.'],
    ['Bonded labour','Work where coercive debt or related restriction prevents a worker from freely leaving employment.']
  ];

  var byId = {};
  LESSONS.forEach(function (l) { byId[l.id] = l; });
  var api = {
    LESSONS: LESSONS,
    GROUPS: GROUPS,
    GLOSSARY: GLOSSARY,
    lesson: function (id) { return byId[id] || null; },
    lessonsForLo: function (lo) { return LESSONS.filter(function (l) { return l.lo === Number(lo); }); }
  };

  root.CIPS2_L2M1_LEARN = api;
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
})(typeof window !== 'undefined' ? window : globalThis);
