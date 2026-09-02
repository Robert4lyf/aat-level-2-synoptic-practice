/* CIPS Level 2 syllabus module L2M5. Indicative content is independently paraphrased;
 * source metadata and audit notes live in docs/reference/cips-l2-source-notes.md. */
(function (root) {
  'use strict';
  var data = {
  "code": "L2M5",
  "title": "Inventory, Logistics and Expediting",
  "credits": 3,
  "glh": 20,
  "additionalSelfStudyHours": 9,
  "moduleLearningTimeHours": 30,
  "globalStandard": [
    "3.2",
    "4.2",
    "4.3",
    "7.2"
  ],
  "assessment": {
    "method": "Objective Response",
    "delivery": "computer-based examination",
    "questionCount": 36,
    "durationMinutes": 60,
    "questionsPerLearningOutcome": 9,
    "passMark": 70,
    "passRule": "70% must be achieved in each learning-outcome section",
    "caveat": "The published specification also states 36 questions in total, but the syllabus has three learning outcomes: 3 × 9 accounts for only 27 questions. Preserve the source discrepancy; do not infer the missing allocation."
  },
  "outcomes": [
    {
      "n": 1,
      "tier": "know",
      "title": "Know the key elements of effective inventory control",
      "criteria": [
        {
          "id": "L2M5-1.1",
          "title": "Identify the classifications of different types of inventory",
          "sourceBulletCount": 5,
          "indicative": [
            "Opening stock, work in progress, safety stock and finished goods",
            "Obsolescent and redundant inventory",
            "Direct and indirect supplies",
            "ABC stock classification",
            "Dependent-demand and independent-demand inventory"
          ]
        },
        {
          "id": "L2M5-1.2",
          "title": "Identify the direct and indirect costs of holding inventory",
          "sourceBulletCount": 2,
          "indicative": [
            "Direct and indirect inventory-holding costs",
            "Cost-reduction choices that protect acceptable service levels"
          ]
        },
        {
          "id": "L2M5-1.3",
          "title": "Identify techniques associated with inventory control",
          "sourceBulletCount": 7,
          "indicative": [
            "Reorder quantities",
            "Reorder levels",
            "MRP and MRP II",
            "ERP systems",
            "Just-in-Time inventory",
            "Barcode-based control",
            "Subjective and objective forecasting approaches"
          ]
        },
        {
          "id": "L2M5-1.4",
          "title": "Identify the key aspects associated with the handling, packaging and storage of supplies",
          "sourceBulletCount": 1,
          "indicative": [
            "Materials-handling equipment, pallet/unit loads, packing/packaging and warehouse automation"
          ]
        }
      ]
    },
    {
      "n": 2,
      "tier": "understand",
      "title": "Understand the principles and processes associated with effective logistics control",
      "criteria": [
        {
          "id": "L2M5-2.1",
          "title": "Identify the key principles of stores and warehousing facilities",
          "sourceBulletCount": 3,
          "indicative": [
            "Efficient and effective inventory flows",
            "Reducing life-cycle costs through storage/logistics decisions",
            "Optimising warehouse/storage space"
          ]
        },
        {
          "id": "L2M5-2.2",
          "title": "Identify the strengths and weaknesses associated with modes of freight transportation",
          "sourceBulletCount": 5,
          "indicative": [
            "Road freight",
            "Rail freight",
            "Air freight",
            "Sea freight",
            "Pipeline transportation"
          ]
        },
        {
          "id": "L2M5-2.3",
          "title": "Identify types of Incoterms in international logistics",
          "sourceBulletCount": 2,
          "indicative": [
            "E, F, C and D Incoterm groups",
            "How Incoterms rules are incorporated into a sales contract"
          ]
        },
        {
          "id": "L2M5-2.4",
          "title": "Identify legislative regulations that affect international sourcing",
          "sourceBulletCount": 1,
          "indicative": [
            "Ensuring international supplies comply with applicable legislation and regulations"
          ]
        },
        {
          "id": "L2M5-2.5",
          "title": "Describe the documentation that is used in transportation of supplies",
          "sourceBulletCount": 4,
          "indicative": [
            "The single administrative document",
            "Packing lists, waybills, consignment notes and bills of lading",
            "Certificates of origin",
            "Letters of credit and other financial documentation"
          ]
        }
      ]
    },
    {
      "n": 3,
      "tier": "know",
      "title": "Know how effective expediting can be achieved in procurement and supply",
      "criteria": [
        {
          "id": "L2M5-3.1",
          "title": "Explain the assessment of costs of inventory and the cost of stock outs",
          "sourceBulletCount": 4,
          "indicative": [
            "Monitoring stock levels to avoid excess inventory and reduce stockout risk",
            "Using forecasts to support on-time supply",
            "Tracking deliveries and associated documentation",
            "Forecasting techniques and practical forecasting difficulties"
          ]
        },
        {
          "id": "L2M5-3.2",
          "title": "Explain the planning process associated with expediting delivery",
          "sourceBulletCount": 2,
          "indicative": [
            "Problem-solving techniques used when delivery is at risk",
            "Planning milestones and activities for expediting"
          ]
        },
        {
          "id": "L2M5-3.3",
          "title": "Explain the significance of payment to suppliers and cash flow",
          "sourceBulletCount": 1,
          "indicative": [
            "Tracking payment deviations and taking remedial action where cash-flow problems threaten supply continuity"
          ]
        }
      ]
    }
  ]
};
  root.CIPS2_MODULES = root.CIPS2_MODULES || {};
  root.CIPS2_MODULES.l2m5 = data;
  if (typeof module !== 'undefined' && module.exports) module.exports = data;
})(typeof window !== 'undefined' ? window : globalThis);
