/* CIPS Level 2 syllabus module L2M4. Indicative content is independently paraphrased;
 * source metadata and audit notes live in docs/reference/cips-l2-source-notes.md. */
(function (root) {
  'use strict';
  var data = {
  "code": "L2M4",
  "title": "Systems Technology",
  "credits": 3,
  "glh": 20,
  "additionalSelfStudyHours": 9,
  "moduleLearningTimeHours": 30,
  "globalStandard": [
    "3.1",
    "3.2",
    "8.1"
  ],
  "assessment": {
    "method": "Objective Response",
    "delivery": "computer-based examination",
    "questionCount": 36,
    "durationMinutes": 60,
    "questionsPerLearningOutcome": 12,
    "passMark": 70,
    "passRule": "70% must be achieved in each learning-outcome section"
  },
  "outcomes": [
    {
      "n": 1,
      "tier": "understand",
      "title": "Understand the use of systems technology and databases and how they contribute to procurement and supply",
      "criteria": [
        {
          "id": "L2M4-1.1",
          "title": "Explain how to use systems technology and databases to contribute to effective procurement and supply",
          "sourceBulletCount": 8,
          "indicative": [
            "Entering transaction data for ordering and related procurement tasks",
            "Capturing expenditure data and keeping systems current",
            "Using data to smooth demand and support demand management",
            "Using data in forecasting",
            "Using systems data to support functional targets",
            "Comparing forecasts with actual outcomes to control expenditure",
            "Measuring procurement savings and efficiencies",
            "Measuring internal and external lead times for goods and services"
          ]
        },
        {
          "id": "L2M4-1.2",
          "title": "Recognise how the use of the Internet, intranets and extranets leads to effective procurement and supply",
          "sourceBulletCount": 4,
          "indicative": [
            "Internet research into suppliers and customers",
            "Information suppliers/customers publish online",
            "Electronic marketplaces",
            "Using social media as a source of supplier-performance feedback"
          ]
        },
        {
          "id": "L2M4-1.3",
          "title": "Explain the role of e-sourcing and e-tendering systems in procurement and supply",
          "sourceBulletCount": 4,
          "indicative": [
            "Electronic invoicing, requisitioning, catalogues and ordering",
            "Electronic supplier pre-qualification",
            "Receiving and evaluating electronic quotations/tenders",
            "The meaning and role of e-sourcing"
          ]
        }
      ]
    },
    {
      "n": 2,
      "tier": "know",
      "title": "Know types of systems for supplier selection, ordering and payment",
      "criteria": [
        {
          "id": "L2M4-2.1",
          "title": "Describe the use of electronic sourcing systems for supplier selection and profiling",
          "sourceBulletCount": 3,
          "indicative": [
            "Attracting quotations/tenders through e-tendering or e-sourcing",
            "Publishing electronic procurement notices",
            "Using electronic auctions"
          ]
        },
        {
          "id": "L2M4-2.2",
          "title": "Identify systems used in procurement and supply",
          "sourceBulletCount": 4,
          "indicative": [
            "Purchase-ordering systems",
            "Systems for capturing expenditure data",
            "Portal sites used to find suppliers or customers",
            "Supplier-database systems"
          ]
        },
        {
          "id": "L2M4-2.3",
          "title": "Identify the use of P2P (purchase to pay) systems for ordering from suppliers and payment to suppliers",
          "sourceBulletCount": 2,
          "indicative": [
            "The purchase-to-pay flow from requisition and sourcing through delivery documentation, invoicing and payment",
            "Examples and roles of P2P systems"
          ]
        }
      ]
    },
    {
      "n": 3,
      "tier": "know",
      "title": "Know why quality management is important in procurement and supply",
      "criteria": [
        {
          "id": "L2M4-3.1",
          "title": "Identify components of quality management in procurement and supply",
          "sourceBulletCount": 3,
          "indicative": [
            "Quality, quality control, quality assurance and total quality management",
            "Quality as an organisational philosophy",
            "The principle of getting work right first time"
          ]
        },
        {
          "id": "L2M4-3.2",
          "title": "Identify the costs of quality",
          "sourceBulletCount": 3,
          "indicative": [
            "Prevention and appraisal costs",
            "Internal and external failure-related quality costs",
            "Effects of quality on organisational reputation"
          ]
        },
        {
          "id": "L2M4-3.3",
          "title": "Identify techniques associated with quality assurance and quality management",
          "sourceBulletCount": 5,
          "indicative": [
            "Assessing supplied goods/services against required quality standards",
            "The progression from inspection towards assurance",
            "Quality circles",
            "Control charts",
            "Kaizen, continuous improvement, lean thinking and related techniques"
          ]
        }
      ]
    }
  ]
};
  root.CIPS2_MODULES = root.CIPS2_MODULES || {};
  root.CIPS2_MODULES.l2m4 = data;
  if (typeof module !== 'undefined' && module.exports) module.exports = data;
})(typeof window !== 'undefined' ? window : globalThis);
