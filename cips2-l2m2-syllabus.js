/* CIPS Level 2 syllabus module L2M2. Indicative content is independently paraphrased;
 * source metadata and audit notes live in docs/reference/cips-l2-source-notes.md. */
(function (root) {
  'use strict';
  var data = {
  "code": "L2M2",
  "title": "Procurement and Supply Operations",
  "credits": 3,
  "glh": 20,
  "additionalSelfStudyHours": 9,
  "moduleLearningTimeHours": 30,
  "globalStandard": [
    "4.2",
    "6.1"
  ],
  "assessment": {
    "method": "Objective Response",
    "delivery": "computer-based examination",
    "questionCount": 36,
    "durationMinutes": 60,
    "questionsPerLearningOutcome": 9,
    "passMark": 70,
    "passRule": "70% must be achieved in each learning-outcome section"
  },
  "outcomes": [
    {
      "n": 1,
      "tier": "know",
      "title": "Know the types of organisations and how they operate",
      "criteria": [
        {
          "id": "L2M2-1.1",
          "title": "Identify the types of business organisations",
          "sourceBulletCount": 2,
          "indicative": [
            "Private-sector, public-sector and third-sector organisations",
            "Organisations primarily producing goods compared with those delivering services"
          ]
        },
        {
          "id": "L2M2-1.2",
          "title": "Describe how organisations operate",
          "sourceBulletCount": 2,
          "indicative": [
            "People, objectives and organisational structure",
            "Formal structures and informal organisation"
          ]
        },
        {
          "id": "L2M2-1.3",
          "title": "Identify the key operating functions within organisations",
          "sourceBulletCount": 3,
          "indicative": [
            "Differentiation and integration between organisational activities",
            "Common functions such as operations, production, marketing/sales, customer support, HR, finance, IT and technical teams",
            "How procurement and supply differs from and interacts with those functions"
          ]
        }
      ]
    },
    {
      "n": 2,
      "tier": "know",
      "title": "Know the components of contractual agreements",
      "criteria": [
        {
          "id": "L2M2-2.1",
          "title": "Identify types of contracts",
          "sourceBulletCount": 3,
          "indicative": [
            "Spot purchasing arrangements",
            "Term contracts",
            "Framework, blanket-order and panel arrangements and their call-offs"
          ]
        },
        {
          "id": "L2M2-2.2",
          "title": "Identify the kind of pricing arrangements applied in commercial contracts",
          "sourceBulletCount": 5,
          "indicative": [
            "Fixed/lump-sum pricing and schedules of rates",
            "Cost-reimbursable and cost-plus pricing",
            "Variable pricing",
            "Target pricing",
            "Risk-and-reward pricing arrangements"
          ]
        },
        {
          "id": "L2M2-2.3",
          "title": "Define the different documents that compose a contract for the purchase or supply of goods or services",
          "sourceBulletCount": 4,
          "indicative": [
            "What contracts and agreements are",
            "How tenders and quotations contribute to forming an agreement",
            "Contract documents such as specifications, KPIs, terms, pricing and supporting schedules",
            "Contracts for goods compared with contracts for services"
          ]
        }
      ]
    },
    {
      "n": 3,
      "tier": "understand",
      "title": "Understand sources of information on suppliers and customers",
      "criteria": [
        {
          "id": "L2M2-3.1",
          "title": "Explain the use of the Internet to locate details about suppliers and customers",
          "sourceBulletCount": 3,
          "indicative": [
            "Using search engines to research suppliers and customers",
            "Evaluating information published on supplier/customer websites",
            "Business-to-business and business-to-consumer e-commerce"
          ]
        },
        {
          "id": "L2M2-3.2",
          "title": "Explain the use of credit rating agencies",
          "sourceBulletCount": 3,
          "indicative": [
            "What credit-rating agencies and credit scores do",
            "Published information about individual organisations and wider markets",
            "How procurement can use credit scores when assessing counterparties"
          ]
        },
        {
          "id": "L2M2-3.3",
          "title": "Describe systems used in procurement and supply",
          "sourceBulletCount": 4,
          "indicative": [
            "Purchase-ordering systems",
            "Systems that capture expenditure/spend data",
            "Supplier/customer discovery through portal sites",
            "Supplier-database systems"
          ]
        }
      ]
    },
    {
      "n": 4,
      "tier": "understand",
      "title": "Understand pricing methods used for the purchasing of goods or services",
      "criteria": [
        {
          "id": "L2M2-4.1",
          "title": "Explain the advantages and disadvantages of a range of pricing methods",
          "sourceBulletCount": 5,
          "indicative": [
            "Strengths and weaknesses of fixed/lump-sum pricing and schedules of rates",
            "Strengths and weaknesses of cost-reimbursable and cost-plus pricing",
            "Strengths and weaknesses of variable pricing",
            "Strengths and weaknesses of target pricing",
            "Strengths and weaknesses of risk-and-reward pricing"
          ]
        }
      ]
    }
  ]
};
  root.CIPS2_MODULES = root.CIPS2_MODULES || {};
  root.CIPS2_MODULES.l2m2 = data;
  if (typeof module !== 'undefined' && module.exports) module.exports = data;
})(typeof window !== 'undefined' ? window : globalThis);
