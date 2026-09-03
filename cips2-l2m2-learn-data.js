/* CIPS Level 2 — L2M2 textbook-style learning content.
 *
 * Source mapping is to cips2-l2m2-syllabus.js. Official learning-outcome and
 * assessment-criterion headings are retained there; the teaching prose here is
 * original. `covers` uses the 1-based position of an indicative-content item
 * under its criterion. The quality gate requires every source position exactly
 * once or more, so a lesson cannot silently omit part of the published scope.
 *
 * L2M2 overlaps L2M1 deliberately at one point: pricing arrangements are named
 * in LO2 and evaluated in LO4. The teaching follows that split rather than
 * collapsing it — lesson 05 establishes what each arrangement IS, lesson 10
 * argues when each is the right choice. Reading them as one lesson would leave
 * the LO4 exam section with no teaching of its own.
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

    /* ── LO1 ─────────────────────────────────────────────────────────── */

    lesson('c2m2-01', 1, 'L2M2-1.1', 'Sectors, ownership and what an organisation is for', 18,
      'Tell the private, public and third sectors apart by who owns them and what they are trying to achieve, and see why buying a service is not the same as buying a product.', [
        card('concept', 'Three sectors, three different purposes', [
          'Private-sector organisations are owned by private individuals or other private bodies — sole traders, partnerships, private companies and companies whose shares are publicly traded. Their defining objective is a commercial return for those owners, usually expressed as profit, growth or shareholder value.',
          'Public-sector organisations are owned by the state and funded largely through taxation, charges or public borrowing. Central government departments, local authorities, state healthcare providers, defence and state education sit here. Their objective is the delivery of a public service within a budget set through a political process, and they are accountable to the public rather than to shareholders.',
          'Third-sector organisations — charities, social enterprises, voluntary bodies, mutuals and not-for-profits — exist for a social, environmental or member purpose. They may generate a surplus, but that surplus is reinvested in the cause rather than distributed to owners.'
        ], ['Private: owned privately, run for a commercial return.', 'Public: state owned, run to deliver a public service within budget.', 'Third: run for a social or member purpose, surplus reinvested.'], [1]),
        card('compare', 'The same purchase, three different pressures', [
          'The sector an organisation belongs to changes how procurement behaves, not just who signs. A private manufacturer choosing a cleaning contractor is generally free to choose on its own commercial judgement and to keep the reasoning confidential.',
          'A public body buying the same service is normally working within public procurement regulation: advertised opportunities above a threshold, published award criteria, an audit trail, and the possibility that an unsuccessful bidder challenges the decision. Value for money must be demonstrable, not merely believed.',
          'A charity is spending money donors or funders gave for a purpose. It faces reputational and regulatory expectations about proportionate spending, and often has to show that a purchase advances the charitable objects.'
        ], ['Sector determines the rules, the accountability and the evidence procurement must produce.'], [1]),
        card('concept', 'Organisations that make things and organisations that do things', [
          'A second classification cuts across ownership: whether the organisation primarily produces goods or primarily delivers services. Goods are tangible and can be inspected, counted, stored and returned. Services are activities — they are produced and consumed at the same time, cannot be held in stock, and vary with the people delivering them.',
          'That difference reaches procurement directly. A specification for goods can state a material, a dimension and a tolerance, and receipt can be checked against it. A specification for a service more often states an outcome and a standard, because the thing being bought is performance over a period rather than an item delivered on a date.'
        ], ['Goods: tangible, storable, inspectable on delivery.', 'Services: intangible, perishable, variable, judged over time.'], [2]),
        card('scenario', 'Reading the sector from the objective', [
          'A regional ambulance provider, a company making ambulance stretchers, and a charity training volunteer first-aiders all buy medical consumables. The manufacturer buys them as direct inputs to a product it sells at a margin. The ambulance provider buys them to deliver a statutory service inside an allocated budget and must be able to justify the award publicly. The charity buys them to run training that advances its charitable purpose, funded by donations.',
          'Same consumables, three different definitions of a good outcome. In an exam question, the giveaway is rarely the word "company" or "trust" — it is the sentence that says what the organisation is trying to achieve and to whom it answers.'
        ], [], []),
        card('recap', 'What to fix in memory', [
          'Ownership answers "whose is it?"; objective answers "what is it for?"; the goods/services split answers "what is actually being bought?". Those three questions separate almost every organisation type this outcome asks about.'
        ], ['Ask who owns it, what it is for, and whether the output is tangible.'], [])
      ], [
        q('An organisation is state owned, funded mainly from taxation and accountable to the public for delivering a service within budget. It is best described as:',
          ['Private sector', 'Public sector', 'Third sector', 'A sole trader'], 1,
          'State ownership, tax funding and public accountability for service delivery are the defining features of a public-sector organisation.'),
        q('Which feature most clearly distinguishes a service from a good?',
          ['A service always costs more than a good', 'A service cannot be held in stock and is produced as it is consumed', 'A service never involves a contract', 'A service is always bought by the public sector'], 1,
          'Services are intangible and perishable: they are produced and consumed at the same time and cannot be stored, which is why they are specified by outcome and standard rather than by physical description.'),
        q('A charity generates a surplus in the year. What normally happens to it?',
          ['It is distributed to shareholders as a dividend', 'It is reinvested in the organisation’s charitable purpose', 'It must be returned to central government', 'It is paid to the trustees as profit'], 1,
          'Third-sector organisations exist for a social or member purpose. A surplus is reinvested in that purpose rather than distributed to owners.')
      ]),

    lesson('c2m2-02', 1, 'L2M2-1.2', 'How organisations are put together', 18,
      'Understand organisations as people pursuing objectives inside a structure, and why the informal organisation matters as much to a buyer as the chart on the wall.', [
        card('concept', 'People, objectives and structure', [
          'An organisation is a group of people brought together to pursue objectives that none of them could achieve alone. Three elements are always present. The people supply the effort and the skill. The objectives say what the effort is for, and cascade from a broad purpose down through strategic aims to the targets an individual is measured on. The structure allocates the work: it says who does what, who decides what, and who answers to whom.',
          'Structure is usually drawn as an organisation chart. The chart carries real information — how many layers there are between the top and the front line, how wide each manager’s span of control is, and whether the organisation is divided by function, by product, by geography or by customer.'
        ], ['People supply capability; objectives supply direction; structure allocates work and authority.'], [1]),
        card('compare', 'Tall and flat, centralised and devolved', [
          'A tall structure has many management layers and narrow spans of control. Decisions travel up and down a long chain, which supports close supervision and clear escalation but slows response and adds cost.',
          'A flat structure has few layers and wide spans. It is quicker and cheaper to run and pushes decisions towards the people doing the work, but it demands capable, trusted staff and can leave managers overstretched.',
          'Cutting the other way: in a centralised organisation, decisions such as supplier selection are made at the centre, which concentrates expertise and buying leverage. In a devolved organisation, local units decide for themselves, which fits local need faster but can fragment spend across many suppliers for the same requirement.'
        ], ['Tall vs flat: how many layers.', 'Centralised vs devolved: where the decision is taken.'], [1]),
        card('concept', 'The organisation that is not on the chart', [
          'Alongside the formal structure there is always an informal organisation: the relationships, habits, reputations and lines of influence that grow up between people regardless of reporting lines. It is how someone learns which colleague actually knows the answer, which approval will be slow, and which supplier the engineers have quietly trusted for years.',
          'The informal organisation is not a defect. It transmits knowledge the formal system never captures and it gets urgent things done. But it can also work against control — a requirement agreed informally with a supplier before procurement is involved, a specification written around one favoured product, or a purchase committed by someone with the relationships but not the authority.'
        ], ['Formal: documented roles, reporting lines and authority.', 'Informal: actual relationships, influence and custom.'], [2]),
        card('scenario', 'Why a buyer maps both', [
          'A procurement officer is asked to run a competition for laboratory equipment. The chart says the head of laboratories approves the specification and the finance director approves the spend. In practice, a long-serving technician writes the technical requirement everyone accepts, and the head of laboratories signs what the technician recommends.',
          'Ignoring that means a technically correct process that stalls, or a specification that arrives late and unchallenged. The professional response is not to bypass the formal route but to engage the real influencer early, inside it — so the specification is genuinely competitive and the documented approvals still hold.'
        ], [], []),
        card('recap', 'The point to carry into the exam', [
          'The formal organisation tells you who is accountable and who may commit the organisation. The informal organisation tells you how work actually gets done. Effective procurement needs both: authority from the first, cooperation from the second.'
        ], ['Authority comes from the formal structure; things get done through the informal one.'], [])
      ], [
        q('An organisation has few management layers and wide spans of control. This structure is best described as:',
          ['Tall', 'Flat', 'Informal', 'Third sector'], 1,
          'Few layers and wide spans of control describe a flat structure, which is typically faster and cheaper to run but relies on capable, trusted staff.'),
        q('Which best describes the informal organisation?',
          ['The documented reporting lines shown on the organisation chart', 'The relationships, influence and custom that develop between people regardless of reporting lines', 'The list of approved suppliers', 'The legal ownership of the organisation'], 1,
          'The informal organisation is the network of actual relationships and influence that grows alongside the formal structure. It is not documented, but it strongly affects how work is done.'),
        q('Purchasing decisions for the same requirement are taken independently by each regional site rather than at head office. This is best described as:',
          ['A centralised structure', 'A devolved structure', 'An informal structure', 'A flat structure'], 1,
          'Where decisions are taken locally rather than at the centre, the structure is devolved. A common consequence is fragmented spend with several suppliers for one requirement.')
      ]),

    lesson('c2m2-03', 1, 'L2M2-1.3', 'The functions procurement works with', 20,
      'Learn the standard operating functions of an organisation, why specialisation has to be balanced by integration, and exactly how procurement differs from the functions around it.', [
        card('concept', 'Differentiation: splitting the work up', [
          'As an organisation grows, it stops being a group of people who all do a bit of everything and splits into specialised functions. That splitting is called differentiation. Each function develops its own expertise, its own measures of success and, over time, its own way of seeing the organisation’s problems.',
          'Differentiation is what makes an organisation capable. It is also what makes it hard to coordinate: a function optimising its own measure can damage another’s. Production maximising machine utilisation builds stock finance did not want; sales promising a delivery date operations cannot meet wins an order that loses money.'
        ], ['Differentiation: specialising into functions with distinct expertise and objectives.'], [1]),
        card('process', 'The functions you are expected to know', [
          'Operations converts inputs into the organisation’s output and keeps the process running to plan. Production is the manufacturing part of operations where physical goods are made. Marketing identifies what customers want and how the offer is positioned; sales converts that demand into orders. Customer support looks after customers after the sale — enquiries, complaints, returns and service.',
          'Human resources handles recruitment, employment terms, development, and employee relations. Finance manages money: budgets, payment, credit control, management information and statutory reporting. IT supplies and protects the systems and data the organisation runs on. Technical or engineering teams hold specialist product, design and standards knowledge.',
          'Every one of these is both an internal customer of procurement and a source of the requirements procurement has to satisfy.'
        ], ['Operations · Production · Marketing/sales · Customer support · HR · Finance · IT · Technical'], [2]),
        card('concept', 'Integration: putting it back together', [
          'Because differentiation pulls functions apart, organisations need integration to pull them back together: shared objectives, cross-functional teams, common systems and data, planning routines that bring functions into the same room, and processes that deliberately cross boundaries.',
          'Procurement is one of the more strongly integrating functions. A single sourcing project routinely needs the technical team to define what is required, operations to say when it is needed, finance to confirm the budget and payment terms, legal to settle the contract, and the end user to accept it. Procurement is often the function that convenes all of them.'
        ], ['Integration: shared goals, shared data and cross-functional working that offset specialisation.'], [1]),
        card('compare', 'How procurement differs from the functions near it', [
          'Procurement is often confused with the functions it sits closest to. Finance pays suppliers and controls cash; procurement decides what is bought, from whom and on what terms, before an invoice ever exists. Operations consumes what is bought and specifies the need; procurement takes that need to the market and manages the resulting agreement.',
          'Warehousing and logistics handle goods once they exist — storage and movement. Procurement acts earlier, and continues afterwards through supplier and contract management. Technical teams define what "fit for purpose" means; procurement challenges whether the requirement is written in a way that allows competition, and tests the market against it.',
          'The distinguishing feature is that procurement manages the organisation’s relationship with the external supply market. That is the boundary the other functions do not own.'
        ], ['Finance pays; operations uses; logistics moves; technical specifies. Procurement owns the supply market relationship.'], [3]),
        card('scenario', 'One requirement, five functions', [
          'A bakery is replacing its packing line. The technical team specifies throughput and hygiene standards; operations sets the shutdown window; finance confirms the capital budget and the payment profile; HR raises the training and consultation implications; IT checks the line will integrate with production data systems.',
          'Procurement runs the competition and holds the contract, but the value is created by getting all five inputs before the market is approached, not after. Buying against a specification written by one function alone is the most common way a technically successful purchase turns into an operational problem.'
        ], [], [])
      ], [
        q('Splitting an organisation into specialised functions, each with its own expertise and objectives, is known as:',
          ['Integration', 'Differentiation', 'Devolution', 'Outsourcing'], 1,
          'Differentiation is the specialisation of an organisation into functions. Integration is the counterbalancing activity that coordinates them again.'),
        q('Which statement best distinguishes procurement from finance?',
          ['Procurement pays supplier invoices; finance selects suppliers', 'Procurement decides what is bought and on what terms; finance controls the money and settles the resulting invoices', 'They perform the same activity under different names', 'Procurement is only found in the public sector'], 1,
          'Procurement manages the relationship with the supply market — what is bought, from whom and on what terms. Finance controls budgets, payment and reporting.'),
        q('A manufacturer forms a cross-functional team with shared objectives and a common planning system so that operations, sales and finance stop working to conflicting targets. This is an example of:',
          ['Differentiation', 'Integration', 'Devolution', 'Spot purchasing'], 1,
          'Shared objectives, cross-functional teams and common systems are integrating mechanisms that offset the pull of specialisation.')
      ]),

    /* ── LO2 ─────────────────────────────────────────────────────────── */

    lesson('c2m2-04', 2, 'L2M2-2.1', 'Spot, term and framework contracts', 20,
      'Learn the three contracting shapes CIPS expects you to recognise, and how a call-off differs from a contract in its own right.', [
        card('concept', 'Spot purchasing: one requirement, one transaction', [
          'A spot purchase is a one-off buy at the price available at that moment. There is no continuing commitment: the requirement is identified, the market is approached, an order is placed, the goods or services are delivered, and the relationship ends there.',
          'Spot buying suits requirements that are genuinely occasional, urgent, or in markets where prices move so much that fixing them in advance would be a gamble. Its cost is that every purchase repeats the whole process, and the buyer has no leverage from volume and no protection if the price rises.'
        ], ['Spot: a single transaction at the prevailing price, no ongoing commitment.'], [1]),
        card('concept', 'Term contracts: an agreed period', [
          'A term contract commits the parties for an agreed period — commonly one to three years — during which the supplier provides an agreed requirement on agreed terms. Volumes may be estimated or committed, and prices are usually fixed or governed by an agreed adjustment mechanism.',
          'The advantage is stability on both sides: the buyer secures continuity, agreed prices and a known standard, and can invest in the relationship; the supplier gets visibility that justifies capacity and better pricing. The cost is reduced flexibility. If the market price falls or the requirement changes, the buyer is committed until the term ends or a change is negotiated.'
        ], ['Term: an agreed requirement, at agreed terms, for an agreed period.'], [2]),
        card('process', 'Frameworks, blanket orders and panels', [
          'A framework agreement sets the terms, the scope and usually the pricing under which future purchases may be made, without itself committing the buyer to buy any particular quantity. Individual purchases are then made by call-off against it.',
          'A blanket order works the same way for repeat items: one order authorises a series of releases over a period, so each delivery does not need its own competition and its own purchase order.',
          'A panel (sometimes a multi-supplier framework) appoints several qualified suppliers to the same scope. Work is then awarded among them either by rotation, by allocation against defined criteria, or by a further short competition — a mini-competition — between the appointed suppliers.',
          'The unifying idea is that the qualification and the terms are settled once, and the individual purchase becomes fast and low effort.'
        ], ['Framework: terms agreed now, purchases called off later.', 'Blanket order: one authorisation, many scheduled releases.', 'Panel: several appointed suppliers, work allocated or mini-competed.'], [3]),
        card('compare', 'The call-off is where the commitment happens', [
          'This distinction is examined regularly. Being appointed to a framework or a panel is not the same as being given work. A framework establishes eligibility and terms; the call-off is the order that actually creates the obligation to supply and to pay.',
          'So a supplier can hold a place on a four-year framework and receive nothing, while another on the same framework is called off against weekly. When a question asks what a framework guarantees a supplier, the answer is the terms on which it may be used — not volume, and not revenue.'
        ], ['A framework gives access and terms. A call-off gives work.'], [3]),
        card('scenario', 'Choosing the shape before choosing the supplier', [
          'A council buys road salt every winter in a volatile market, replaces its fleet of vans roughly every five years, and needs occasional legal advice across several specialisms.',
          'Salt suits a term contract or a framework with an agreed adjustment mechanism, because supply security matters more than catching the lowest daily price. The vans are a periodic, large, well-defined purchase that suits its own competition. Legal advice suits a panel: several firms appointed once, and each instruction allocated or mini-competed according to the specialism needed.'
        ], [], [])
      ], [
        q('A buyer places a single order for an urgent, one-off requirement at the price available that day, with no continuing commitment. This is:',
          ['A term contract', 'A framework agreement', 'A spot purchase', 'A blanket order'], 2,
          'A spot purchase is a one-off transaction at the prevailing price with no ongoing commitment to buy again.'),
        q('A supplier is appointed to a four-year multi-supplier framework. What does that appointment guarantee it?',
          ['A guaranteed minimum volume of work', 'The terms and scope on which it may be called off, but not any volume', 'Exclusive supply for four years', 'Payment in advance of delivery'], 1,
          'A framework fixes the scope and terms under which future purchases may be made. It does not commit the buyer to any volume — the call-off creates the actual obligation.'),
        q('One authorisation covers a series of scheduled releases of the same repeat item over a period, avoiding a separate competition for each delivery. This arrangement is best described as:',
          ['A spot purchase', 'A blanket order', 'A cost-plus contract', 'A tender'], 1,
          'A blanket order authorises repeated releases of a repeat requirement over a period under one agreement, removing the need to re-run the process for every delivery.')
      ]),

    lesson('c2m2-05', 2, 'L2M2-2.2', 'Five ways to price a contract', 24,
      'Identify the five pricing arrangements named in the syllabus and know precisely how each one decides what the buyer ends up paying.', [
        card('concept', 'Fixed and lump-sum prices, and schedules of rates', [
          'A fixed price states a single sum for a defined scope. Provided the scope does not change, the buyer pays that sum whatever the work actually costs the supplier. A lump-sum price is the same idea applied to a whole package of work rather than a unit.',
          'A schedule of rates does not fix a total. It fixes the price of each unit of work — per metre, per hour, per visit, per tonne — and the total is whatever the measured quantity turns out to be, multiplied by the agreed rate. It is used where the nature of the work is known but the quantity is not, such as repairs and maintenance.',
          'Both fix a price; they differ in what they fix it against. Fixed and lump-sum fix the outturn; a schedule of rates fixes only the unit.'
        ], ['Fixed/lump sum: the total is agreed in advance for a defined scope.', 'Schedule of rates: the unit price is agreed; the quantity is measured.'], [1]),
        card('concept', 'Cost-reimbursable and cost-plus', [
          'Under a cost-reimbursable arrangement the buyer pays the supplier’s actual allowable costs, evidenced and audited against defined rules about what may be charged. Cost-plus adds an agreed fee on top of those costs — either a percentage of cost or, better for the buyer, a fixed fee that does not grow as costs grow.',
          'These arrangements are used where the scope genuinely cannot be defined in advance: emergency works, early-stage development, or a response to a situation that is still unfolding. They transfer cost risk to the buyer, so they demand open-book records, defined allowable costs and active oversight.'
        ], ['Cost-reimbursable: buyer pays evidenced actual cost.', 'Cost-plus: actual cost plus an agreed fee (percentage or fixed).'], [2]),
        card('concept', 'Variable pricing', [
          'A variable price changes during the contract according to a rule agreed at the outset. The commonest rule links the price to a published index — a materials index, an energy index or a wage index — so that when the index moves, the contract price is adjusted by a defined formula on defined dates.',
          'The purpose is not to let the supplier raise prices at will. It is the opposite: it replaces an unpredictable renegotiation with a transparent, evidenced mechanism, so neither party has to price a guess about inflation into a long contract.'
        ], ['Variable: price adjusts by an agreed formula, usually against a published index.'], [3]),
        card('concept', 'Target pricing', [
          'Target pricing sets a target cost and a target fee for the work, together with a share formula — often called a pain/gain share. If the final cost comes in below target, buyer and supplier divide the saving in the agreed proportions. If it comes in above, they share the overrun the same way.',
          'The mechanism is designed to align the two parties: the supplier keeps part of any efficiency it finds, so it has a reason to look, while the buyer keeps part of the saving rather than all of it going to the supplier’s margin.'
        ], ['Target: agreed target cost, with savings and overruns shared by formula.'], [4]),
        card('concept', 'Risk-and-reward arrangements', [
          'Risk-and-reward pricing goes further and links part of the supplier’s payment to outcomes rather than to cost. The supplier earns more if defined performance measures are exceeded and less if they are missed — availability of an asset, defect rates, energy performance, delivery reliability or user satisfaction.',
          'It is used where the buyer cares about a result the supplier can influence but not fully control, and it is only workable where the measures are objective, measurable and genuinely within the supplier’s influence. Rewarding a supplier against something it cannot affect is a lottery, not an incentive.'
        ], ['Risk and reward: part of the payment depends on measured outcomes.'], [5]),
        card('recap', 'Sorting the five apart', [
          'Ask what the arrangement fixes and who carries the risk of being wrong. Fixed and lump sum fix the total and put cost risk on the supplier. A schedule of rates fixes the unit and leaves quantity risk with the buyer. Cost-reimbursable and cost-plus fix neither and put cost risk on the buyer. Variable pricing fixes a formula rather than a figure. Target pricing shares the difference from a target. Risk and reward attaches payment to performance.'
        ], ['One question sorts them all: what is fixed, and who carries the risk?'], [])
      ], [
        q('A maintenance contract agrees a price per visit and per metre of pipe replaced, with the total depending on the work actually measured. This is:',
          ['A lump-sum price', 'A schedule of rates', 'A cost-plus arrangement', 'Target pricing'], 1,
          'A schedule of rates fixes the price of each unit of work while leaving the total to depend on the quantity actually measured.'),
        q('A contract sets a target cost and shares any saving or overrun between the parties in agreed proportions. This is:',
          ['Variable pricing', 'Fixed pricing', 'Target pricing', 'Spot pricing'], 2,
          'Target pricing agrees a target cost and a formula — a pain/gain share — for dividing the difference between target and outturn.'),
        q('A three-year supply contract adjusts its price twice a year using a published materials index. This is best described as:',
          ['Variable pricing', 'Cost-reimbursable pricing', 'A lump-sum price', 'Risk-and-reward pricing'], 0,
          'Variable pricing adjusts the contract price during its life by an agreed formula, most commonly against a published index, on defined dates.')
      ]),

    lesson('c2m2-06', 2, 'L2M2-2.3', 'The documents that make up a contract', 22,
      'See how an enquiry becomes a binding agreement, and what each document in a contract pack is actually for.', [
        card('concept', 'What a contract is', [
          'A contract is an agreement the law will enforce. In outline it needs an offer, acceptance of that offer, consideration — something of value moving each way, typically goods or services one way and money the other — and an intention by both parties to create legal relations. In commercial dealings that intention is presumed.',
          'The everyday consequence is that a contract is not created by a signature on a particular page. It is created when a valid offer is accepted. That is why the sequence of documents in a purchase matters so much: it decides whose terms became the agreement.'
        ], ['Offer + acceptance + consideration + intention to be legally bound.'], [1]),
        card('process', 'From enquiry to agreement', [
          'A request for quotation or an invitation to tender is normally an invitation to treat — an invitation to suppliers to make offers. It is not itself an offer to buy.',
          'The supplier’s quotation or tender is the offer. It states what will be provided, at what price, for how long the offer stands, and usually on the supplier’s standard terms.',
          'The buyer’s purchase order or letter of acceptance is the acceptance — but only if it accepts the offer as made. A purchase order that changes the terms is in law a counter-offer, and the contract then forms on whichever set of terms the other party goes on to accept, often by performing. This is the "battle of the forms", and it is why a buyer that simply issues its own order against a supplier’s quotation may not end up on the terms it thought.'
        ], ['Invitation to tender / RFQ → invitation to treat.', 'Quotation / tender → offer.', 'Purchase order / acceptance → acceptance, if unmodified.'], [2]),
        card('concept', 'What is in the contract pack', [
          'A commercial contract is rarely one document. The specification states what is required — by description, by performance, or by reference to a standard. Key performance indicators state how performance will be measured and what counts as acceptable. The terms and conditions state the legal obligations: delivery, title and risk, payment, warranties, liability, insurance, confidentiality, change control, termination and dispute resolution.',
          'The pricing schedule states what is paid and when. Supporting schedules carry the detail that would otherwise clog the terms: delivery locations and volumes, contact and governance arrangements, named key personnel, and any agreed variations to standard terms.',
          'Because the pack has many parts, it normally states an order of precedence — which document wins if two of them conflict. Without it, a contradiction between a specification and a schedule has no agreed answer.'
        ], ['Specification · KPIs · terms and conditions · pricing schedule · supporting schedules.', 'An order of precedence resolves conflicts between them.'], [3]),
        card('compare', 'Contracts for goods and contracts for services', [
          'A contract for goods concentrates on the item and the moment of transfer: description and quality, quantity, delivery point and date, packaging, inspection and rejection, when title and risk pass, and what happens to defective or surplus goods.',
          'A contract for services concentrates on performance over time: the scope of work, the standard of skill and care, service levels and KPIs, who the personnel are and whether they may be replaced, how the service is governed and reviewed, what happens when service levels are missed, and how the service transitions in and out.',
          'The practical consequence is that goods are largely accepted at a point in time and services are managed continuously. A service contract with no service levels, no review mechanism and no exit provisions is far more exposed than a goods contract with the equivalent gaps.'
        ], ['Goods: description, quantity, delivery, title and risk, inspection.', 'Services: scope, standard, service levels, personnel, governance, exit.'], [4]),
        card('scenario', 'Whose terms are we on?', [
          'A buyer sends an enquiry. The supplier returns a quotation on its own standard terms. The buyer issues a purchase order that says the buyer’s conditions apply. The supplier says nothing and delivers.',
          'The purchase order changed the terms, so it was a counter-offer rather than an acceptance. By delivering, the supplier is generally taken to have accepted the buyer’s terms — the last set of terms put forward before performance. Reverse the order of those documents and the answer reverses with it, which is exactly why the sequence is examined.'
        ], [], [])
      ], [
        q('In a typical purchase, the supplier’s quotation is best described in contract terms as:',
          ['An invitation to treat', 'An offer', 'An acceptance', 'Consideration'], 1,
          'The buyer’s enquiry or invitation to tender is an invitation to treat. The supplier’s quotation is the offer, which the buyer may then accept.'),
        q('A contract pack contains a specification, KPIs, terms and conditions, a pricing schedule and several supporting schedules. Why does it normally state an order of precedence?',
          ['To decide which document should be signed first', 'To determine which document prevails where two of them conflict', 'To set the order in which payments are made', 'To identify which supplier was appointed'], 1,
          'An order of precedence resolves contradictions between the documents in a contract pack. Without it, a conflict between, say, the specification and a schedule has no agreed answer.'),
        q('Which is more characteristic of a contract for services than a contract for goods?',
          ['Provisions on when title and risk pass on delivery', 'Provisions on service levels, key personnel and exit arrangements', 'Provisions on packaging and inspection at receipt', 'Provisions on the quantity delivered'], 1,
          'Services are performed over time, so service contracts concentrate on standards, service levels, personnel, governance and transition. Title, risk, packaging and inspection at delivery are characteristic of goods contracts.')
      ]),

    /* ── LO3 ─────────────────────────────────────────────────────────── */

    lesson('c2m2-07', 3, 'L2M2-3.1', 'Researching suppliers and customers online', 18,
      'Use the internet as a procurement research tool: how to search, how far to trust what a supplier publishes about itself, and how B2B differs from B2C.', [
        card('process', 'Searching with intent', [
          'Internet research is the normal first step in identifying possible sources. Used well it is fast, cheap and wide-ranging: it finds suppliers a buyer did not know existed, establishes roughly what a market looks like and what things cost, and gives background before any contact is made.',
          'Used carelessly it produces a list of whoever paid most for advertising. Better practice is to search on the technical description of the requirement rather than a brand name, to use trade directories, trade association membership lists and industry press as well as a general search engine, and to look for evidence of the specific capability required — accreditations, sector experience, relevant scale — rather than general claims of quality.'
        ], ['Search on the requirement, not the brand.', 'Corroborate with directories, associations and trade press.'], [1]),
        card('concept', 'Reading a supplier’s own website critically', [
          'A supplier’s website is marketing material. It is genuinely useful for facts the supplier has little reason to distort and every reason to publish accurately — registered company details, locations, product specifications, certifications, published accounts and named contacts.',
          'It is much weaker evidence for claims that are selective or unverifiable: capability without scale, testimonials without attribution, an unnamed client list, or an "established" date with no filing history behind it. Warning signs include no registered address or company number, no filed accounts, contact details that are only a web form, and pages that have plainly not been updated.',
          'The same reasoning applies in reverse when researching a customer. Their site tells you their markets, their scale and their public commitments — useful in judging whether they will be a stable counterparty and what they will expect.'
        ], ['Trust the verifiable facts; corroborate the claims.'], [2]),
        card('compare', 'B2B and B2C e-commerce', [
          'Business-to-consumer e-commerce sells to individuals: published prices, standard terms nobody negotiates, small transaction values, high volumes, card payment at the point of sale, and consumer protection law that gives the buyer rights the seller cannot exclude.',
          'Business-to-business e-commerce sells to organisations: negotiated or contracted prices, account-based credit terms, larger and repeated transactions, approval workflows on the buyer’s side, integration between the two organisations’ systems, and terms agreed between the parties rather than imposed by consumer legislation.',
          'A buyer should know which one it is operating in. Buying on a consumer site with a corporate card is quick, but it usually means standard consumer terms, no negotiated price, no credit account and weak spend visibility — the classic route by which spend leaks outside the organisation’s contracts.'
        ], ['B2C: individuals, published prices, consumer protection.', 'B2B: organisations, contracted terms, credit accounts, system integration.'], [3]),
        card('scenario', 'A promising website and a thin company', [
          'A search returns a supplier whose site claims twenty years of experience and lists impressive clients. There is no company number, no registered address, no filed accounts and no named individual. The clients are named but not attributed to any project.',
          'None of that proves the supplier is not genuine, but none of it is evidence either. The proportionate response is to verify the verifiable — company registration, accounts, accreditations, references that can be contacted — before spending effort on evaluation, and to size that verification to the value and risk of the requirement.'
        ], [], [])
      ], [
        q('Which information on a supplier’s own website is the strongest evidence of its standing?',
          ['A statement that it is a market leader', 'Unattributed customer testimonials', 'Its registered company number, filed accounts and named accreditations', 'A page listing its company values'], 2,
          'Verifiable facts — registration details, filed accounts and named accreditations — can be checked independently. Self-assessed claims and unattributed testimonials cannot.'),
        q('Which is most characteristic of business-to-business rather than business-to-consumer e-commerce?',
          ['Published prices that are not negotiated', 'Payment by card at the point of sale', 'Account-based credit terms and contracted prices', 'Rights given to the buyer by consumer protection law'], 2,
          'B2B trading typically runs on credit accounts and negotiated or contracted prices between organisations. Published prices, card payment at point of sale and consumer protection are characteristic of B2C.'),
        q('A buyer researching a new market should treat a general search engine as:',
          ['A complete and reliable list of all capable suppliers', 'A useful starting point to be corroborated with directories, trade associations and trade press', 'A substitute for financial appraisal', 'Evidence that a supplier is financially sound'], 1,
          'Search results reflect visibility and advertising, not capability. They are a starting point that needs corroboration from independent sources.')
      ]),

    lesson('c2m2-08', 3, 'L2M2-3.2', 'Credit rating agencies and financial standing', 18,
      'Understand what a credit rating agency does, what it publishes, and how a buyer should — and should not — use a credit score.', [
        card('concept', 'What a credit rating agency does', [
          'A credit rating agency collects financial and behavioural information about organisations and converts it into an assessment of the risk that they will fail to meet their obligations. Typical inputs are filed accounts, payment performance data, court judgments, charges registered against assets, directorships, group structure and industry conditions.',
          'The output is usually two things: a credit score or rating expressing relative risk, and a suggested credit limit — the exposure the agency considers reasonable to carry with that organisation at that time. Agencies also monitor continuously and issue alerts when something material changes.'
        ], ['Inputs: accounts, payment behaviour, judgments, charges, structure.', 'Outputs: a risk score, a suggested credit limit, and change alerts.'], [1]),
        card('concept', 'What is published, and about whom', [
          'Agencies publish information about individual organisations — the score, the suggested limit, the filed financial summary, payment performance against terms, and any adverse events on record.',
          'They also publish wider market information: sector risk commentary, failure rates by industry and region, and payment-trend data across the economy. That broader material matters in procurement because a supplier is not risky only in its own right; it is risky relative to a market that may itself be deteriorating.'
        ], ['Organisation level: score, limit, accounts, payment record, adverse events.', 'Market level: sector risk, failure rates, payment trends.'], [2]),
        card('process', 'Using a credit score properly', [
          'A buyer uses credit information at several points: screening potential suppliers before inviting them to bid, appraising a preferred bidder before award, setting how much exposure to place with one supplier, and monitoring incumbents during a contract.',
          'The response to a weak score is proportionate rather than automatic. It might mean rejecting the supplier for a critical, high-value requirement; or awarding but limiting exposure, requiring a parent-company guarantee or performance bond, staging payments against delivery, or increasing monitoring. For a low-value, easily replaced purchase it may mean nothing at all.'
        ], ['Screen · appraise · limit exposure · monitor.', 'The mitigation should match the value and criticality of the requirement.'], [3]),
        card('compare', 'What a score does not tell you', [
          'A credit score measures the likelihood of financial failure. It is not a measure of quality, technical capability, ethical conduct, delivery reliability or cultural fit, and it says nothing about whether the supplier can actually do the work.',
          'It is also backwards-looking and dependent on filed data, so it lags reality — small companies file limited accounts late, and a score can look acceptable months after the position has changed. Treat it as one input among several, alongside references, site visits, capability assessment and the organisation’s own experience of the supplier.',
          'The mirror-image use is on the customer side: the same information tells a selling organisation whether to offer credit to a customer, and how much.'
        ], ['A score measures financial risk only — never capability, quality or conduct.'], [3]),
        card('scenario', 'A weak score on a critical supplier', [
          'A sole-source supplier of a specialist component is downgraded mid-contract and its suggested credit limit is cut. Switching would take nine months of requalification.',
          'Rejection is not available, so the work is to reduce exposure and buy time: verify the position directly, avoid large advance payments, consider a bond or guarantee, build a modest buffer stock, secure rights to tooling and intellectual property, and start qualifying an alternative source now rather than after a failure. The score did not solve anything — it bought early warning, which is what it is for.'
        ], [], [])
      ], [
        q('A credit rating agency’s suggested credit limit for a supplier indicates:',
          ['The maximum the supplier is allowed to charge', 'The level of exposure the agency considers reasonable to carry with that organisation', 'The supplier’s technical capability', 'The price the buyer should pay'], 1,
          'A suggested credit limit expresses the exposure the agency considers reasonable given the assessed risk of default. It says nothing about price or capability.'),
        q('Which does a credit score NOT measure?',
          ['The likelihood of financial failure', 'Payment performance against agreed terms', 'Technical capability and quality of work', 'Adverse events such as court judgments'], 2,
          'Credit assessment addresses financial risk. Technical capability and quality must be assessed separately, through references, capability assessment and evaluation.'),
        q('A critical sole-source supplier is downgraded mid-contract and cannot be replaced quickly. Which response is most appropriate?',
          ['Ignore the downgrade because the contract is already signed', 'Immediately terminate the contract regardless of consequence', 'Reduce exposure through guarantees, staged payments and buffer stock while qualifying an alternative source', 'Increase advance payments to help the supplier'], 2,
          'Where the supplier cannot be replaced quickly, the proportionate response is to reduce exposure and start building an alternative. Increasing advance payments would raise exposure precisely when risk has risen.')
      ]),

    lesson('c2m2-09', 3, 'L2M2-3.3', 'The systems procurement runs on', 20,
      'Know the four system types named in the syllabus, what data each holds, and why spend data is the foundation of everything else.', [
        card('process', 'Purchase-ordering systems', [
          'A purchase-ordering system carries the transaction from requisition to payment. A requisition captures the need and routes it for approval against the requester’s delegated authority. Once approved it becomes a purchase order sent to the supplier. Receipt is recorded against the order, the invoice is matched to order and receipt — the three-way match — and payment follows.',
          'The controls matter as much as the speed. The system enforces who may commit the organisation and up to what value, creates the audit trail, and prevents payment of an invoice for goods nobody ordered or received. Purchasing outside it — "maverick" or off-contract spend — bypasses those controls and is invisible to everything downstream.'
        ], ['Requisition → approval → purchase order → receipt → matched invoice → payment.'], [1]),
        card('concept', 'Systems that capture spend data', [
          'Spend analysis systems consolidate expenditure from purchase-ordering systems, finance ledgers and card transactions, then classify it — by category, by supplier, by business unit and by contract — so the organisation can see what it actually buys.',
          'This is the foundation of category management. It answers how much is spent on a category in total, how many suppliers serve it, how much runs through contracts and how much leaks around them, and where consolidating volume would create leverage. Almost every improvement opportunity a procurement function pursues starts as a line in this data.',
          'Its weakness is data quality. If coding is inconsistent, if the same supplier exists under four names, or if a large share is booked to a miscellaneous code, the analysis will be confidently wrong.'
        ], ['Spend data answers: what do we buy, from whom, and under what contract?'], [2]),
        card('concept', 'Portal sites and supplier discovery', [
          'Portals are shared platforms where buyers advertise requirements and suppliers register to find them. Public bodies use notice portals to publish opportunities as their regulations require. Industry marketplaces and trade exchanges do the same within a sector, and some run pre-qualification once so suppliers do not repeat it for every buyer.',
          'For a buyer, a portal widens the field beyond suppliers already known and standardises how bids are received; increasingly it also runs the competition itself — issuing documents, holding a clarification log, receiving sealed responses and recording the audit trail.'
        ], ['Portals advertise requirements, widen the supplier field and standardise the process.'], [3]),
        card('concept', 'Supplier database systems', [
          'A supplier database is the organisation’s record of who its suppliers are and what is known about them: registration and legal details, categories supplied, contract references and expiry dates, approval or accreditation status, insurance and certification expiry, contacts, performance history and risk assessments.',
          'It answers questions the transaction systems cannot: who is approved to supply this category, whose insurance lapses next month, which supplier appears in three business units under slightly different names, and which contracts expire this quarter and therefore need action now.'
        ], ['A supplier database holds status, approvals, expiries, performance and risk — not transactions.'], [4]),
        card('compare', 'Four systems, four questions', [
          'The four fit together rather than competing. The ordering system answers "what did we commit to, and was it authorised?". The spend system answers "what do we buy in total, and from whom?". Portals answer "who else could supply this?". The supplier database answers "who are our suppliers, and what is their current status?".',
          'Weakness in any one degrades the others. Off-system purchasing corrupts the spend data; a poor supplier database means the spend data cannot be aggregated by supplier at all.'
        ], ['Commitment · aggregate spend · market reach · supplier status.'], [])
      ], [
        q('Comparing the purchase order, the receipt record and the supplier invoice before payment is known as:',
          ['Spend analysis', 'The three-way match', 'Pre-qualification', 'A call-off'], 1,
          'The three-way match compares order, receipt and invoice, so that the organisation only pays for goods it ordered and received at the agreed price.'),
        q('An organisation wants to know how much it spends on a category in total, across all business units, and how much of that runs through contracts. Which system answers that?',
          ['The purchase-ordering system alone', 'A spend analysis system', 'A supplier database', 'A public notice portal'], 1,
          'Spend analysis consolidates and classifies expenditure across sources, which is what allows total category spend and contract coverage to be seen.'),
        q('Which is the primary purpose of a supplier database?',
          ['To process invoices for payment', 'To advertise requirements to the market', 'To hold supplier status, approvals, certification expiries, performance and risk information', 'To calculate the contract price'], 2,
          'A supplier database holds what is known about suppliers — approval status, categories, expiries, performance and risk. Transaction processing sits in the ordering and finance systems.')
      ]),

    /* ── LO4 ─────────────────────────────────────────────────────────── */

    lesson('c2m2-10', 4, 'L2M2-4.1', 'Choosing a pricing method: strengths and weaknesses', 30,
      'Argue the advantages and disadvantages of each pricing arrangement, and match the method to how well the requirement can be defined and who should carry the risk.', [
        card('concept', 'The question underneath all five', [
          'Every pricing arrangement is an answer to one question: given how well this requirement can be defined, who should carry the risk of the cost turning out differently from expectation?',
          'Where the scope is tight and the market is competitive, that risk can sit with the supplier, and a fixed price does it. Where the scope genuinely cannot be defined, forcing a fixed price does not remove the risk — it buys a large contingency and a supplier with every incentive to argue that anything difficult is a variation. The method should follow the definability of the requirement, not the buyer’s preference for certainty.'
        ], ['Definable scope → risk to the supplier. Undefinable scope → risk shared or retained, with controls.'], []),
        card('compare', 'Fixed and lump-sum prices, and schedules of rates', [
          'A fixed or lump-sum price gives the buyer budget certainty, simple administration, straightforward comparison between bids, and a supplier that carries the cost risk and therefore has a strong incentive to be efficient.',
          'Against that: it requires a scope that can be defined in advance, and the supplier prices the risk it is being asked to carry, so a poorly defined requirement produces an inflated price. It is inflexible — any change becomes a variation negotiated without competitive pressure — and it can tempt a supplier to protect margin by cutting quality where the specification is silent.',
          'A schedule of rates keeps competitive unit prices where the quantity is genuinely unknown, and removes the need to guess volumes. Its weakness is the mirror image: the buyer carries the quantity risk, the outturn is uncertain, the work must be accurately measured — which costs effort and invites dispute — and there is no incentive on the supplier to do less work rather than more.'
        ], ['Fixed: certainty and efficiency incentive; needs a definable scope, prices risk in, resists change.', 'Rates: competitive units and flexible volume; uncertain total, needs measurement, no volume incentive.'], [1]),
        card('compare', 'Cost-reimbursable and cost-plus', [
          'Their advantage is that work can start before the scope is settled, which is exactly what is needed in an emergency, in development work or in a response to something still unfolding. The supplier does not need a contingency because it is not carrying the cost risk, and open-book records give the buyer visibility of real costs — useful intelligence in itself.',
          'The disadvantages are serious. The buyer carries the cost risk with no certain outturn; the supplier has no inherent incentive to be efficient; and a percentage fee actively rewards higher cost, since the fee grows with it. Administration is heavy — costs must be evidenced, audited and argued over — and disputes about what is an allowable cost are common.',
          'The usual mitigations are a fixed fee rather than a percentage, clearly defined allowable costs, a target or a ceiling above which the supplier bears the excess, and genuine open-book audit rights.'
        ], ['Cost-plus: starts without a defined scope, but the buyer carries cost risk and a percentage fee rewards overspend.'], [2]),
        card('compare', 'Variable pricing', [
          'Variable pricing suits long contracts in volatile input markets. Because the supplier does not have to price years of inflation into a guess, the starting price is lower and more honest, the adjustment is transparent and evidenced against a published index, and the arrangement reduces the pressure to reopen the contract or the risk of a supplier failing on an unsustainable price.',
          'Its disadvantages are that the buyer loses budget certainty and carries the price risk; the chosen index may not track the supplier’s actual costs, so it can over- or under-compensate; and it needs administration to apply the formula and verify the movement. Indices also tend to be applied in both directions in principle but resisted downwards in practice, so the mechanism needs to be explicit and enforced.'
        ], ['Variable: honest pricing in volatile markets; less budget certainty and an index that may not fit.'], [3]),
        card('compare', 'Target pricing', [
          'Target pricing aligns the parties better than either extreme. Both sides gain from finding savings, so the supplier has a genuine incentive to propose efficiencies rather than to hoard them; the sharing formula caps the buyer’s exposure to overrun in a way pure cost-plus does not; and it supports collaboration on work where the scope is broadly but not precisely known.',
          'It is not free. Setting a credible target cost is difficult and contentious, and a target set too generously hands the supplier a gain share for doing nothing unusual. It needs open-book cost transparency and the capability to audit it, the outturn is still uncertain, and defining what counts as a saving — as opposed to a scope reduction or a deferred cost — takes real contract-management effort.'
        ], ['Target: shared incentive and capped exposure; hard to set credibly and costly to administer.'], [4]),
        card('compare', 'Risk-and-reward arrangements', [
          'Risk and reward focuses the supplier on the outcome the buyer actually wants rather than on inputs or activity, and it can unlock innovation because the supplier keeps part of the value of doing something better. It also puts real money behind the performance regime, which makes KPIs matter.',
          'It fails where the measures are wrong. Payment attached to something the supplier cannot control is a lottery that will be priced accordingly; measures that are easy to record rather than genuinely important drive the wrong behaviour; and complex regimes cost both parties to administer and to argue about. It also needs reliable measurement data, which the buyer must usually provide.',
          'It is best suited to contracts where the outcome is objectively measurable, materially within the supplier’s influence, and worth enough to justify the machinery.'
        ], ['Risk and reward: aligns payment to outcomes; only works with objective, controllable, material measures.'], [5]),
        card('scenario', 'Matching method to requirement', [
          'Consider three purchases. Printing 50,000 identical brochures to a settled design is fully definable in a competitive market — a fixed price transfers cost risk to the supplier at little premium. Emergency remedial work after a flood cannot be scoped until the building is opened up — a cost-reimbursable arrangement with a fixed fee and open-book audit lets work start now without buying a contingency for the unknown.',
          'A ten-year contract to maintain a fleet sits between: the work is broadly known but the detail is not, the market moves, and the buyer cares about vehicle availability. A target cost with a pain/gain share, an indexed adjustment for parts and labour, and an availability-based reward element uses three mechanisms together — which is how large contracts are actually priced.'
        ], [], []),
        card('recap', 'How to answer an LO4 question', [
          'Name the method, state who carries the risk under it, then give one advantage and one disadvantage that follow from that allocation. Almost every disadvantage in this outcome is the direct cost of its own advantage: certainty is paid for with inflexibility, flexibility is paid for with uncertainty, and incentives are paid for with administration.'
        ], ['Every advantage in this outcome has a matching cost. Name both.'], [])
      ], [
        q('A buyer insists on a fixed price for work whose scope cannot yet be defined. What is the most likely consequence?',
          ['The supplier prices a large contingency and treats changes as variations', 'The supplier absorbs all additional cost without any price effect', 'The contract becomes cost-reimbursable automatically', 'The buyer gains a complete transfer of risk at no cost'], 0,
          'A supplier asked to carry risk it cannot quantify prices a contingency for it, and has a strong incentive to argue that anything unforeseen is a variation. Fixed pricing transfers cost risk, but never for free.'),
        q('Which is the principal disadvantage of a cost-plus contract with a percentage fee?',
          ['The buyer has complete budget certainty', 'The supplier’s fee increases as costs increase, so there is no incentive to control cost', 'Work cannot begin until the scope is fully defined', 'The supplier carries all of the cost risk'], 1,
          'A percentage fee grows with cost, so it rewards higher spending. This is why a fixed fee, defined allowable costs and a ceiling or target are the usual mitigations.'),
        q('An availability-based reward element is proposed for a fleet maintenance contract. What condition most determines whether it will work?',
          ['That the reward is a large percentage of the contract value', 'That availability is objectively measurable and materially within the supplier’s influence', 'That the contract also uses a schedule of rates', 'That the buyer keeps the measurement data confidential'], 1,
          'Risk-and-reward mechanisms only work where the measure is objective and genuinely within the supplier’s influence. Paying against something the supplier cannot control is a lottery it will simply price for.')
      ])
  ];

  var GROUPS = [
    { lo: 1, title: 'Organisations and how they operate', lessonIds: ['c2m2-01','c2m2-02','c2m2-03'] },
    { lo: 2, title: 'Contracts and pricing arrangements', lessonIds: ['c2m2-04','c2m2-05','c2m2-06'] },
    { lo: 3, title: 'Information about suppliers and customers', lessonIds: ['c2m2-07','c2m2-08','c2m2-09'] },
    { lo: 4, title: 'Evaluating pricing methods', lessonIds: ['c2m2-10'] }
  ];

  var GLOSSARY = [
    ['Private sector','Organisations owned by private individuals or bodies and run for a commercial return.'],
    ['Public sector','State-owned organisations funded largely from taxation and accountable for delivering a public service within budget.'],
    ['Third sector','Charities, social enterprises and voluntary bodies that exist for a social or member purpose and reinvest any surplus.'],
    ['Formal organisation','The documented structure of roles, reporting lines and authority.'],
    ['Informal organisation','The relationships, influence and custom that develop between people regardless of reporting lines.'],
    ['Span of control','The number of people reporting directly to one manager.'],
    ['Differentiation','The specialisation of an organisation into functions with distinct expertise and objectives.'],
    ['Integration','The coordination of specialised functions through shared objectives, cross-functional working and common systems.'],
    ['Spot purchase','A one-off purchase at the price available at the time, with no continuing commitment.'],
    ['Term contract','A contract under which agreed requirements are supplied on agreed terms for an agreed period.'],
    ['Framework agreement','An agreement setting the scope and terms for future purchases without committing the buyer to any volume.'],
    ['Call-off','An order placed under a framework or blanket arrangement that creates the actual obligation to supply.'],
    ['Blanket order','A single authorisation covering a series of scheduled releases of a repeat requirement.'],
    ['Panel','A group of suppliers appointed to the same scope, with work allocated between them or awarded by mini-competition.'],
    ['Fixed price','A single agreed sum for a defined scope, regardless of the supplier’s actual cost.'],
    ['Schedule of rates','Agreed prices per unit of work, with the total determined by the quantity actually measured.'],
    ['Cost-reimbursable','An arrangement under which the buyer pays the supplier’s evidenced allowable costs.'],
    ['Cost-plus','Cost reimbursement plus an agreed fee, charged as a percentage of cost or as a fixed sum.'],
    ['Variable pricing','Pricing adjusted during the contract by an agreed formula, commonly against a published index.'],
    ['Target pricing','An agreed target cost with savings and overruns shared between the parties by formula.'],
    ['Pain/gain share','The formula dividing the difference between target cost and outturn cost between buyer and supplier.'],
    ['Risk and reward','An arrangement linking part of the supplier’s payment to measured outcomes.'],
    ['Invitation to treat','An invitation for others to make offers, such as a request for quotation. Not itself an offer.'],
    ['Offer','A definite proposal capable of acceptance, such as a supplier’s quotation or tender.'],
    ['Acceptance','Unqualified agreement to the terms of an offer, which forms the contract.'],
    ['Consideration','Something of value given by each party, such as goods or services one way and payment the other.'],
    ['Counter-offer','A response that changes the terms of an offer, rejecting it and making a new offer in its place.'],
    ['Order of precedence','The stated ranking that decides which contract document prevails where two conflict.'],
    ['B2B e-commerce','Trading between organisations, typically on contracted terms and credit accounts.'],
    ['B2C e-commerce','Trading with individual consumers, typically at published prices under consumer protection law.'],
    ['Credit rating agency','An organisation that assesses the risk of a business failing to meet its obligations and publishes a score and suggested credit limit.'],
    ['Credit limit','The exposure a rating agency considers reasonable to carry with an organisation.'],
    ['Spend analysis','Consolidating and classifying expenditure to show what is bought, from whom and under what contract.'],
    ['Three-way match','Comparison of purchase order, receipt evidence and supplier invoice before payment.'],
    ['Maverick spend','Purchasing outside the organisation’s approved systems and contracts.'],
    ['Portal site','A shared platform on which requirements are advertised and suppliers register to find them.'],
    ['Supplier database','A record of suppliers holding approval status, categories, expiries, performance and risk information.']
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

  root.CIPS2_L2M2_LEARN = api;
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
})(typeof window !== 'undefined' ? window : globalThis);
