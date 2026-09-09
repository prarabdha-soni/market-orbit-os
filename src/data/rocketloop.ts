/**
 * Rocket-Loop demo dataset (illustrative only).
 *
 * This module is the single source of truth for the prototype. It is shaped
 * like an API response payload so a real backend can replace `src/services/*`
 * without touching UI components.
 */

export type MissionStatus = "Running" | "Planning" | "Learning" | "Draft";

export interface Mission {
  id: string;
  name: string;
  status: MissionStatus;
  progress: number;
  targetLabel: string;
  target: number;
  qualified: number;
  orders: number;
  cities: string[];
  startedOn: string;
}

export interface Kpi {
  id: string;
  label: string;
  value: string;
  change: string;
  direction: "up" | "down" | "flat";
  hint: string;
  spark: number[];
}

export type SignalTone = "danger" | "warning" | "success" | "muted";

export interface Opportunity {
  id: string;
  name: string;
  type: string;
  location: string;
  city: string;
  score: number;
  signal: string;
  signalTone: SignalTone;
  status: "Ready" | "New" | "Contacted" | "Sampled";
  reasons: string[];
  competitorAvailability: "Low" | "Medium" | "High";
  monthlyDemand: "Low" | "Medium" | "High";
  distanceKm: number;
  estimatedFirstOrder: number;
  conversionProbability: number;
  recommendedAction: string;
}

export interface CityOpportunity {
  city: string;
  score: number;
  outlets: number;
  highPotential: number;
  gap: number;
  /** Percentage coordinates inside the Rajasthan map viewport. */
  x: number;
  y: number;
}

export interface AgentRecord {
  id: string;
  name: string;
  shortName: string;
  purpose: string;
  status: "Running" | "Idle" | "Awaiting approval";
  currentTask: string;
  lastAction: string;
  actionsToday: number;
  usefulOutcomes: number;
  usefulOutcomesLabel: string;
  confidence: number;
  successRate: number;
  approvals: number;
  errors: number;
  tools: string[];
  decisions: { at: string; text: string }[];
  learning: string;
}

export interface ActivityEvent {
  id: string;
  agentId: string;
  agent: string;
  category: "Market" | "Decision" | "Outreach" | "Fulfillment" | "Analytics";
  action: string;
  reason: string;
  status: "Completed" | "In progress" | "Awaiting approval";
  at: string;
}

export interface Recommendation {
  id: string;
  title: string;
  reason: string;
  impact: string;
  confidence: number;
  primaryAction: string;
}

export interface Conversation {
  id: string;
  business: string;
  area: string;
  city: string;
  ago: string;
  unread: boolean;
  stage: "Interested" | "Sample requested" | "Qualifying" | "First order";
  language: string;
  messages: {
    from: "agent" | "business";
    text: string;
    at: string;
    meta?: string;
  }[];
}

export interface SampleRow {
  id: string;
  business: string;
  city: string;
  kit: string;
  status:
    | "Requested"
    | "Approved"
    | "Dispatched"
    | "In transit"
    | "Delivered"
    | "Converted";
  courier: string;
  tracking: string;
  potential: number;
  timelineStep: number;
}

export const workspace = {
  company: "Gloww Brands",
  brand: "Gloww",
  website: "https://www.gloww.in",
  category: "Women's Hygiene",
  positioning: "Reusable menstrual care for a freer you",
  products: [
    { name: "Gloww Menstrual Cup", detail: "Variant sizes S / M / L" },
    { name: "Gloww Sterilizer Cup", detail: "Microwave-safe steriliser" },
    { name: "Gloww Period Care Kit", detail: "Cup + steriliser + pouch" },
  ],
  user: { name: "Aishwarya S.", role: "Head of Growth", initials: "AS" },
  dataAsOf: "September 10, 2026",
};

export const homeKpis: Kpi[] = [
  {
    id: "missions",
    label: "Active Expansion Missions",
    value: "3",
    change: "+1",
    direction: "up",
    hint: "vs last month",
    spark: [1, 1, 2, 2, 2, 3, 3],
  },
  {
    id: "qualified",
    label: "Qualified Opportunities",
    value: "184",
    change: "+22%",
    direction: "up",
    hint: "vs last 30 days",
    spark: [96, 108, 121, 134, 152, 168, 184],
  },
  {
    id: "conversations",
    label: "Conversations",
    value: "842",
    change: "+12%",
    direction: "up",
    hint: "vs last month",
    spark: [410, 498, 561, 634, 702, 780, 842],
  },
  {
    id: "orders",
    label: "First Orders",
    value: "67",
    change: "+54%",
    direction: "up",
    hint: "vs last month",
    spark: [8, 14, 22, 31, 44, 56, 67],
  },
  {
    id: "revenue",
    label: "Revenue Generated",
    value: "₹4.8L",
    change: "+62%",
    direction: "up",
    hint: "vs last month",
    spark: [0.4, 0.9, 1.5, 2.2, 3.1, 4.0, 4.8],
  },
];

export const missions: Mission[] = [
  {
    id: "rajasthan-retail",
    name: "Rajasthan Retail Expansion",
    status: "Running",
    progress: 68,
    targetLabel: "500 retailers",
    target: 500,
    qualified: 184,
    orders: 27,
    cities: ["Jaipur", "Jodhpur", "Kota", "Udaipur", "Ajmer"],
    startedOn: "Jun 14, 2026",
  },
  {
    id: "mumbai-pharmacy",
    name: "Mumbai Pharmacy Expansion",
    status: "Planning",
    progress: 12,
    targetLabel: "250 pharmacies",
    target: 250,
    qualified: 31,
    orders: 0,
    cities: ["Andheri", "Bandra", "Thane", "Navi Mumbai"],
    startedOn: "Sep 02, 2026",
  },
  {
    id: "bengaluru-wellness",
    name: "Bengaluru Wellness Expansion",
    status: "Learning",
    progress: 41,
    targetLabel: "300 outlets",
    target: 300,
    qualified: 96,
    orders: 12,
    cities: ["Indiranagar", "Koramangala", "Whitefield"],
    startedOn: "Aug 05, 2026",
  },
];

export const recommendations: Recommendation[] = [
  {
    id: "rec-jaipur",
    title: "Prioritise Jaipur pharmacies for the next 60 outreach actions.",
    reason:
      "Sample-to-order conversion in Jaipur is running 28% higher than Kota in the current mission.",
    impact: "+9–14 projected qualified conversations this week",
    confidence: 91,
    primaryAction: "Review Recommendation",
  },
  {
    id: "rec-gap",
    title:
      "22 high-potential pharmacies became available after competitor availability declined.",
    reason:
      "Competitor stock-outs detected across Vaishali Nagar, Malviya Nagar and Mansarovar in the menstrual care category.",
    impact: "₹3.1L additional first-order potential",
    confidence: 84,
    primaryAction: "Explore Opportunities",
  },
];

export const cityOpportunities: CityOpportunity[] = [
  { city: "Jaipur", score: 92, outlets: 4820, highPotential: 1284, gap: 68, x: 62, y: 38 },
  { city: "Jodhpur", score: 88, outlets: 2610, highPotential: 702, gap: 61, x: 27, y: 44 },
  { city: "Kota", score: 76, outlets: 2140, highPotential: 498, gap: 54, x: 68, y: 68 },
  { city: "Udaipur", score: 71, outlets: 1780, highPotential: 385, gap: 49, x: 33, y: 72 },
  { city: "Ajmer", score: 64, outlets: 1492, highPotential: 256, gap: 44, x: 50, y: 50 },
];

export const marketKpis: Kpi[] = [
  {
    id: "outlets",
    label: "Total Retail Outlets",
    value: "12,842",
    change: "+318",
    direction: "up",
    hint: "new outlets indexed",
    spark: [11200, 11540, 11810, 12100, 12440, 12690, 12842],
  },
  {
    id: "high",
    label: "High-Potential Outlets",
    value: "3,125",
    change: "+9%",
    direction: "up",
    hint: "meets mission threshold",
    spark: [2100, 2280, 2460, 2640, 2810, 2980, 3125],
  },
  {
    id: "gap",
    label: "Competitor Availability Gap",
    value: "68%",
    change: "+6 pts",
    direction: "up",
    hint: "in target category",
    spark: [54, 57, 59, 61, 64, 66, 68],
  },
  {
    id: "annual",
    label: "Est. Annual Opportunity",
    value: "₹12.4 Cr",
    change: "+₹1.2 Cr",
    direction: "up",
    hint: "modelled on current pricing",
    spark: [8.1, 8.9, 9.6, 10.4, 11.2, 11.9, 12.4],
  },
];

export const demandSignals = [
  {
    id: "ds-1",
    signal: "Search interest for reusable menstrual cups",
    city: "Jaipur",
    trend: "+34%",
    window: "last 90 days",
    tone: "success" as SignalTone,
  },
  {
    id: "ds-2",
    signal: "Gynaecologist referrals mentioning cups",
    city: "Jodhpur",
    trend: "+21%",
    window: "last 60 days",
    tone: "success" as SignalTone,
  },
  {
    id: "ds-3",
    signal: "Category shelf space in modern retail",
    city: "Kota",
    trend: "-8%",
    window: "last 30 days",
    tone: "warning" as SignalTone,
  },
  {
    id: "ds-4",
    signal: "Repeat purchase rate on sterilisers",
    city: "Udaipur",
    trend: "+12%",
    window: "last 90 days",
    tone: "success" as SignalTone,
  },
];

export const competitorGaps = [
  {
    id: "cg-1",
    area: "Vaishali Nagar, Jaipur",
    gap: "Competitor out of stock in 68% of sampled pharmacies",
    outlets: 214,
    tone: "danger" as SignalTone,
  },
  {
    id: "cg-2",
    area: "Malviya Nagar, Jaipur",
    gap: "No reusable cup listing in 41% of health stores",
    outlets: 148,
    tone: "warning" as SignalTone,
  },
  {
    id: "cg-3",
    area: "Sardarpura, Jodhpur",
    gap: "Single-brand shelf, no alternative offered",
    outlets: 96,
    tone: "warning" as SignalTone,
  },
  {
    id: "cg-4",
    area: "Talwandi, Kota",
    gap: "Distributor coverage thin, restock cycle 21 days",
    outlets: 72,
    tone: "muted" as SignalTone,
  },
];

export const opportunities: Opportunity[] = [
  {
    id: "opp-medplus",
    name: "MedPlus Pharmacy",
    type: "Pharmacy",
    location: "Vaishali Nagar",
    city: "Jaipur",
    score: 92,
    signal: "Competitor OOS",
    signalTone: "danger",
    status: "Ready",
    reasons: [
      "High category relevance for women's hygiene",
      "Strong local demand across the catchment",
      "Competitor availability gap detected this week",
      "Good estimated first order value",
      "Efficient delivery route from Jaipur warehouse",
    ],
    competitorAvailability: "Low",
    monthlyDemand: "High",
    distanceKm: 8.2,
    estimatedFirstOrder: 18500,
    conversionProbability: 34,
    recommendedAction: "Start WhatsApp outreach",
  },
  {
    id: "opp-apollo",
    name: "Apollo Pharmacy",
    type: "Pharmacy",
    location: "Malviya Nagar",
    city: "Jaipur",
    score: 88,
    signal: "Low Availability",
    signalTone: "warning",
    status: "Ready",
    reasons: [
      "Chain outlet with proven category throughput",
      "Low availability of comparable products nearby",
      "Above-average basket size in the area",
    ],
    competitorAvailability: "Low",
    monthlyDemand: "High",
    distanceKm: 11.4,
    estimatedFirstOrder: 22400,
    conversionProbability: 31,
    recommendedAction: "Start WhatsApp outreach",
  },
  {
    id: "opp-wellness",
    name: "Wellness Forever",
    type: "Pharmacy",
    location: "Mansarovar",
    city: "Jaipur",
    score: 85,
    signal: "No Listing",
    signalTone: "muted",
    status: "New",
    reasons: [
      "No reusable cup listing on shelf today",
      "High footfall residential catchment",
      "Store manager reachable on WhatsApp",
    ],
    competitorAvailability: "Medium",
    monthlyDemand: "High",
    distanceKm: 13.9,
    estimatedFirstOrder: 16200,
    conversionProbability: 28,
    recommendedAction: "Send catalogue, then sample offer",
  },
  {
    id: "opp-health-you",
    name: "Health & You",
    type: "Health Store",
    location: "C-Scheme",
    city: "Jaipur",
    score: 82,
    signal: "High Demand",
    signalTone: "success",
    status: "Ready",
    reasons: [
      "Wellness-led assortment matches positioning",
      "Repeat customers for sustainable products",
      "Owner already stocks adjacent categories",
    ],
    competitorAvailability: "Medium",
    monthlyDemand: "High",
    distanceKm: 5.1,
    estimatedFirstOrder: 14800,
    conversionProbability: 37,
    recommendedAction: "Start WhatsApp outreach",
  },
  {
    id: "opp-care-n-cure",
    name: "Care n Cure",
    type: "Pharmacy",
    location: "Jagatpura",
    city: "Jaipur",
    score: 78,
    signal: "Competitor OOS",
    signalTone: "danger",
    status: "Contacted",
    reasons: [
      "Competitor stock-out confirmed twice this month",
      "Serves two large residential societies",
    ],
    competitorAvailability: "Low",
    monthlyDemand: "Medium",
    distanceKm: 16.3,
    estimatedFirstOrder: 12600,
    conversionProbability: 26,
    recommendedAction: "Follow up on sample request",
  },
  {
    id: "opp-balaji",
    name: "Shri Balaji Medical",
    type: "Pharmacy",
    location: "Tonk Road",
    city: "Jaipur",
    score: 76,
    signal: "No Listing",
    signalTone: "muted",
    status: "New",
    reasons: [
      "Untapped corridor with limited category presence",
      "Adjacent to a diagnostic centre",
    ],
    competitorAvailability: "High",
    monthlyDemand: "Medium",
    distanceKm: 9.7,
    estimatedFirstOrder: 9800,
    conversionProbability: 21,
    recommendedAction: "Send catalogue",
  },
  {
    id: "opp-womens-clinic",
    name: "Women's Health Clinic",
    type: "Clinic",
    location: "Raja Park",
    city: "Jaipur",
    score: 74,
    signal: "High Demand",
    signalTone: "success",
    status: "Sampled",
    reasons: [
      "Direct access to the end customer at point of advice",
      "Practitioner endorsement lifts conversion",
    ],
    competitorAvailability: "Medium",
    monthlyDemand: "High",
    distanceKm: 6.4,
    estimatedFirstOrder: 8400,
    conversionProbability: 42,
    recommendedAction: "Convert sample into first order",
  },
  {
    id: "opp-lifeline",
    name: "LifeLine Pharmacy",
    type: "Pharmacy",
    location: "Bapu Nagar",
    city: "Jaipur",
    score: 71,
    signal: "Low Availability",
    signalTone: "warning",
    status: "Ready",
    reasons: [
      "Student-heavy catchment with steady demand",
      "Price-sensitive, respond well to sample offers",
    ],
    competitorAvailability: "Medium",
    monthlyDemand: "Medium",
    distanceKm: 7.2,
    estimatedFirstOrder: 7600,
    conversionProbability: 24,
    recommendedAction: "Start WhatsApp outreach",
  },
  {
    id: "opp-marwar",
    name: "Marwar Medicos",
    type: "Pharmacy",
    location: "Sardarpura",
    city: "Jodhpur",
    score: 84,
    signal: "Competitor OOS",
    signalTone: "danger",
    status: "Ready",
    reasons: [
      "Largest pharmacy in the Sardarpura cluster",
      "Competitor shelf empty on last two checks",
    ],
    competitorAvailability: "Low",
    monthlyDemand: "High",
    distanceKm: 4.8,
    estimatedFirstOrder: 15400,
    conversionProbability: 33,
    recommendedAction: "Start WhatsApp outreach",
  },
  {
    id: "opp-suncity",
    name: "Suncity Health Mart",
    type: "Health Store",
    location: "Ratanada",
    city: "Jodhpur",
    score: 79,
    signal: "No Listing",
    signalTone: "muted",
    status: "New",
    reasons: [
      "Wellness assortment with no cup category yet",
      "Owner active on WhatsApp Business",
    ],
    competitorAvailability: "High",
    monthlyDemand: "Medium",
    distanceKm: 6.9,
    estimatedFirstOrder: 11200,
    conversionProbability: 25,
    recommendedAction: "Send catalogue",
  },
  {
    id: "opp-chambal",
    name: "Chambal Chemists",
    type: "Pharmacy",
    location: "Talwandi",
    city: "Kota",
    score: 73,
    signal: "Low Availability",
    signalTone: "warning",
    status: "Contacted",
    reasons: [
      "Coaching-hub catchment with young demographic",
      "Restock cycle leaves frequent gaps",
    ],
    competitorAvailability: "Medium",
    monthlyDemand: "High",
    distanceKm: 3.6,
    estimatedFirstOrder: 10400,
    conversionProbability: 22,
    recommendedAction: "Follow up",
  },
  {
    id: "opp-lake-city",
    name: "Lake City Distributors",
    type: "Distributor",
    location: "Hiran Magri",
    city: "Udaipur",
    score: 69,
    signal: "High Demand",
    signalTone: "success",
    status: "New",
    reasons: [
      "Covers 140+ downstream retailers",
      "Actively seeking a sustainable-care line",
    ],
    competitorAvailability: "Medium",
    monthlyDemand: "High",
    distanceKm: 21.5,
    estimatedFirstOrder: 46000,
    conversionProbability: 18,
    recommendedAction: "Route to distributor playbook",
  },
];

export const agents: AgentRecord[] = [
  {
    id: "market-intel",
    name: "Market Intelligence Agent",
    shortName: "Market Agent",
    purpose: "Finds and indexes real-world opportunities in target territories.",
    status: "Running",
    currentTask: "Discovering priority pharmacy clusters in Jaipur.",
    lastAction: "Discovered 14 new pharmacies in Jaipur",
    actionsToday: 1284,
    usefulOutcomes: 184,
    usefulOutcomesLabel: "Useful opportunities",
    confidence: 94,
    successRate: 88,
    approvals: 0,
    errors: 2,
    tools: ["Maps", "Business Directory", "Inventory Signals", "Internal Knowledge"],
    decisions: [
      {
        at: "09:42",
        text: "Selected Jaipur because retailer density and category relevance exceed the mission threshold.",
      },
      {
        at: "08:15",
        text: "Deprioritised Ajmer this week: outlet density below the minimum route efficiency bar.",
      },
    ],
    learning:
      "Outlets within 12 km of the Jaipur warehouse convert 1.6x better, so proximity now carries more weight in scoring.",
  },
  {
    id: "decision",
    name: "Decision Agent",
    shortName: "Decision Agent",
    purpose: "Decides where effort should go next given economics and results.",
    status: "Awaiting approval",
    currentTask: "Proposing a reallocation of 60 outreach actions to Jaipur.",
    lastAction: "Promoted 4 retailers to priority",
    actionsToday: 96,
    usefulOutcomes: 31,
    usefulOutcomesLabel: "Accepted decisions",
    confidence: 91,
    successRate: 84,
    approvals: 3,
    errors: 0,
    tools: ["Mission Economics", "Performance History", "Territory Model"],
    decisions: [
      {
        at: "09:58",
        text: "Recommended shifting spend to Jaipur because sample-to-order conversion is 28% above Kota.",
      },
    ],
    learning:
      "Reallocations made before Wednesday deliver a larger weekly lift than end-of-week changes.",
  },
  {
    id: "outreach",
    name: "Outreach Agent",
    shortName: "Outreach Agent",
    purpose: "Runs localized WhatsApp and voice outreach to selected businesses.",
    status: "Running",
    currentTask: "Running 8 approved conversations in Hindi across Jaipur.",
    lastAction: "Started 8 approved conversations",
    actionsToday: 342,
    usefulOutcomes: 96,
    usefulOutcomesLabel: "Replies received",
    confidence: 89,
    successRate: 28,
    approvals: 12,
    errors: 1,
    tools: ["WhatsApp Business", "Voice", "Approved Templates", "Language Model"],
    decisions: [
      {
        at: "10:06",
        text: "Switched to Hindi for Tonk Road outlets after two English messages went unanswered.",
      },
    ],
    learning:
      "Opening with a sample offer rather than a catalogue raises reply rate by roughly 11 points.",
  },
  {
    id: "qualification",
    name: "Qualification Agent",
    shortName: "Qualification Agent",
    purpose: "Reads replies and decides which businesses are genuinely interested.",
    status: "Running",
    currentTask: "Scoring 17 open replies from today's Jaipur outreach.",
    lastAction: "Detected 3 interested prospects",
    actionsToday: 178,
    usefulOutcomes: 42,
    usefulOutcomesLabel: "Qualified prospects",
    confidence: 92,
    successRate: 76,
    approvals: 0,
    errors: 0,
    tools: ["Conversation Analysis", "Retailer Profile", "Sales Playbooks"],
    decisions: [
      {
        at: "10:11",
        text: "Marked Health & You as sample-ready because the owner asked for pricing and dispatch timelines.",
      },
    ],
    learning:
      "Requests mentioning 'sample' plus a store address convert at 3x the base rate.",
  },
  {
    id: "fulfillment",
    name: "Fulfillment Agent",
    shortName: "Fulfillment Agent",
    purpose: "Coordinates sample dispatch, shipments and order handover.",
    status: "Awaiting approval",
    currentTask: "Holding 2 sample shipments for human approval.",
    lastAction: "Created 2 sample shipments",
    actionsToday: 54,
    usefulOutcomes: 312,
    usefulOutcomesLabel: "Samples dispatched",
    confidence: 96,
    successRate: 94,
    approvals: 2,
    errors: 0,
    tools: ["Warehouse", "Delhivery", "Label Service", "Inventory"],
    decisions: [
      {
        at: "09:20",
        text: "Batched five Jaipur samples into one pickup to cut per-unit shipping cost.",
      },
    ],
    learning:
      "Samples delivered within 48 hours convert to a first order 22% more often.",
  },
  {
    id: "analytics",
    name: "Analytics Agent",
    shortName: "Analytics Agent",
    purpose: "Tracks conversions, ROI and mission health, then feeds it back.",
    status: "Running",
    currentTask: "Recomputing city-level conversion for the last 14 days.",
    lastAction: "Detected +18% conversion in Jaipur",
    actionsToday: 61,
    usefulOutcomes: 9,
    usefulOutcomesLabel: "Insights surfaced",
    confidence: 90,
    successRate: 81,
    approvals: 0,
    errors: 0,
    tools: ["Order Ledger", "Attribution", "Cohorts", "Forecast Model"],
    decisions: [
      {
        at: "10:02",
        text: "Flagged Kota as underperforming because sample-to-order conversion fell below the mission floor.",
      },
    ],
    learning:
      "First orders cluster 6–9 days after sample delivery, so follow-up timing was tightened.",
  },
];

export const activityEvents: ActivityEvent[] = [
  {
    id: "act-1",
    agentId: "market-intel",
    agent: "Market Agent",
    category: "Market",
    action: "Discovered 14 new pharmacies in Jaipur",
    reason: "Retailer density in Vaishali Nagar crossed the mission threshold.",
    status: "Completed",
    at: "2 min ago",
  },
  {
    id: "act-2",
    agentId: "decision",
    agent: "Decision Agent",
    category: "Decision",
    action: "Promoted 4 retailers to priority",
    reason: "Competitor availability dropped in their catchment this week.",
    status: "Completed",
    at: "9 min ago",
  },
  {
    id: "act-3",
    agentId: "outreach",
    agent: "Outreach Agent",
    category: "Outreach",
    action: "Started 8 approved conversations",
    reason: "Human approval was granted for the Jaipur pharmacy batch.",
    status: "In progress",
    at: "14 min ago",
  },
  {
    id: "act-4",
    agentId: "qualification",
    agent: "Qualification Agent",
    category: "Outreach",
    action: "Detected 3 interested prospects",
    reason: "Replies requested pricing, samples and dispatch timelines.",
    status: "Completed",
    at: "26 min ago",
  },
  {
    id: "act-5",
    agentId: "fulfillment",
    agent: "Fulfillment Agent",
    category: "Fulfillment",
    action: "Created 2 sample shipments",
    reason: "Sample dispatch requires approval under current autonomy settings.",
    status: "Awaiting approval",
    at: "38 min ago",
  },
  {
    id: "act-6",
    agentId: "analytics",
    agent: "Analytics Agent",
    category: "Analytics",
    action: "Detected +18% conversion in Jaipur",
    reason: "14-day sample-to-order rate moved above the mission baseline.",
    status: "Completed",
    at: "52 min ago",
  },
  {
    id: "act-7",
    agentId: "market-intel",
    agent: "Market Agent",
    category: "Market",
    action: "Refreshed availability signals for 1,284 outlets",
    reason: "Scheduled weekly refresh of the Rajasthan territory index.",
    status: "Completed",
    at: "1 hr ago",
  },
  {
    id: "act-8",
    agentId: "analytics",
    agent: "Analytics Agent",
    category: "Analytics",
    action: "Flagged Kota below conversion floor",
    reason: "Sample-to-order conversion fell to 9% against a 14% mission floor.",
    status: "Completed",
    at: "2 hrs ago",
  },
];

export const conversations: Conversation[] = [
  {
    id: "conv-medplus",
    business: "MedPlus Pharmacy",
    area: "Vaishali Nagar",
    city: "Jaipur",
    ago: "1 min ago",
    unread: true,
    stage: "Sample requested",
    language: "Hindi",
    messages: [
      {
        from: "agent",
        text: "Namaste! This is Riya from Gloww. We make high-quality reusable menstrual cups trusted by 100,000+ Indian women. Our products are now available for retail partnerships in Jaipur. Would you be interested to know more?",
        at: "11:02",
        meta: "AI-generated · Approved · Hindi-first",
      },
      {
        from: "business",
        text: "Hi yes. Please share details and product samples.",
        at: "11:04",
      },
      {
        from: "agent",
        text: "Absolutely. I'm sharing our product catalogue and sample request form. We can dispatch samples to your store this week. Is this your store location?",
        at: "11:05",
        meta: "AI-generated · Approved",
      },
      {
        from: "business",
        text: "Yes that's correct. Please go ahead.",
        at: "11:06",
      },
    ],
  },
  {
    id: "conv-health-you",
    business: "Health & You",
    area: "C-Scheme",
    city: "Jaipur",
    ago: "3 min ago",
    unread: true,
    stage: "Interested",
    language: "English",
    messages: [
      {
        from: "agent",
        text: "Hello! Riya here from Gloww. We're partnering with wellness-led stores in C-Scheme for our reusable menstrual care range. Can I share margins and the starter assortment?",
        at: "10:48",
        meta: "AI-generated · Approved",
      },
      {
        from: "business",
        text: "What margin do you offer and what is the MOQ?",
        at: "10:52",
      },
      {
        from: "agent",
        text: "Retail margin is 32% on the starter assortment, MOQ is 20 units, and we cover first-order shipping. Shall I reserve a sample kit for you?",
        at: "10:53",
        meta: "AI-generated · Approved · Within pricing rules",
      },
    ],
  },
  {
    id: "conv-care-n-cure",
    business: "Care n Cure",
    area: "Jagatpura",
    city: "Jaipur",
    ago: "5 min ago",
    unread: false,
    stage: "Qualifying",
    language: "Hindi",
    messages: [
      {
        from: "agent",
        text: "Namaste! Gloww ki taraf se Riya. Kya aap reusable menstrual cup category store mein rakhna chahenge?",
        at: "10:31",
        meta: "AI-generated · Approved · Hindi",
      },
      {
        from: "business",
        text: "Customer demand kaisi hai is category mein?",
        at: "10:39",
      },
      {
        from: "agent",
        text: "Jagatpura area mein pichhle 90 din mein is category ki demand 34% badhi hai, aur aas-paas ke stores mein stock available nahi hai. Main aapke liye sample bhej sakti hoon.",
        at: "10:40",
        meta: "AI-generated · Approved · Claim verified",
      },
    ],
  },
  {
    id: "conv-balaji",
    business: "Shri Balaji Medical",
    area: "Tonk Road",
    city: "Jaipur",
    ago: "8 min ago",
    unread: false,
    stage: "Qualifying",
    language: "Hindi",
    messages: [
      {
        from: "agent",
        text: "Namaste! Riya from Gloww. Kya main aapko hamara retail catalogue bhej sakti hoon?",
        at: "10:12",
        meta: "AI-generated · Approved · Hindi",
      },
      {
        from: "business",
        text: "Bhej dijiye, dekh kar batata hoon.",
        at: "10:20",
      },
    ],
  },
  {
    id: "conv-womens-clinic",
    business: "Women's Health Clinic",
    area: "Raja Park",
    city: "Jaipur",
    ago: "12 min ago",
    unread: false,
    stage: "First order",
    language: "English",
    messages: [
      {
        from: "agent",
        text: "Hello Dr. Meena, following up on the sample kit delivered last Tuesday. Would you like to place a first stocking order?",
        at: "09:44",
        meta: "AI-generated · Approved",
      },
      {
        from: "business",
        text: "Yes, patients responded well. Send the order form for 40 units.",
        at: "09:51",
      },
      {
        from: "agent",
        text: "Wonderful. Order form sent — 40 units of the Period Care Kit, dispatch within 48 hours. Commercial terms are queued for human approval.",
        at: "09:52",
        meta: "AI-generated · Escalated for human approval",
      },
    ],
  },
];

export const campaignMetrics = [
  { id: "contacted", label: "Contacted", value: "842", change: "+12% vs last month" },
  { id: "samples", label: "Samples Dispatched", value: "312", change: "+28%" },
  { id: "orders", label: "First Orders", value: "67", change: "+54%" },
  { id: "revenue", label: "Revenue Generated", value: "₹4.8L", change: "+62%" },
];

export const samples: SampleRow[] = [
  {
    id: "smp-1",
    business: "MedPlus Pharmacy",
    city: "Jaipur",
    kit: "Gloww Retail Kit",
    status: "Dispatched",
    courier: "Delhivery",
    tracking: "DL123456",
    potential: 18500,
    timelineStep: 3,
  },
  {
    id: "smp-2",
    business: "Health & You",
    city: "Jaipur",
    kit: "Gloww Starter Kit",
    status: "In transit",
    courier: "Delhivery",
    tracking: "DL123489",
    potential: 14800,
    timelineStep: 4,
  },
  {
    id: "smp-3",
    business: "Women's Health Clinic",
    city: "Jaipur",
    kit: "Clinic Sample Pack",
    status: "Converted",
    courier: "Blue Dart",
    tracking: "BD772210",
    potential: 8400,
    timelineStep: 6,
  },
  {
    id: "smp-4",
    business: "Marwar Medicos",
    city: "Jodhpur",
    kit: "Gloww Retail Kit",
    status: "Delivered",
    courier: "Delhivery",
    tracking: "DL123512",
    potential: 15400,
    timelineStep: 5,
  },
  {
    id: "smp-5",
    business: "Chambal Chemists",
    city: "Kota",
    kit: "Gloww Starter Kit",
    status: "Approved",
    courier: "Pending allocation",
    tracking: "—",
    potential: 10400,
    timelineStep: 1,
  },
  {
    id: "smp-6",
    business: "Suncity Health Mart",
    city: "Jodhpur",
    kit: "Gloww Retail Kit",
    status: "Requested",
    courier: "Pending approval",
    tracking: "—",
    potential: 11200,
    timelineStep: 0,
  },
];

export const fulfillmentTimeline = [
  "Sample requested",
  "Warehouse allocated",
  "Label created",
  "Picked up",
  "In transit",
  "Delivered",
  "Order created",
];

export const funnel = [
  { stage: "Outreach", value: 842, pct: 100 },
  { stage: "Reply", value: 421, pct: 50 },
  { stage: "Interest", value: 218, pct: 26 },
  { stage: "Sample", value: 312, pct: 37 },
  { stage: "First Order", value: 67, pct: 8 },
];

export const ordersByCity = [
  { city: "Jaipur", first: 31, repeat: 12 },
  { city: "Jodhpur", first: 16, repeat: 6 },
  { city: "Kota", first: 9, repeat: 2 },
  { city: "Udaipur", first: 7, repeat: 3 },
  { city: "Ajmer", first: 4, repeat: 1 },
];

export const revenueGrowth = [
  { month: "Jun", revenue: 0.4, samples: 24 },
  { month: "Jul", revenue: 1.3, samples: 68 },
  { month: "Aug", revenue: 2.9, samples: 121 },
  { month: "Sep", revenue: 4.8, samples: 99 },
];

export const knowledgeSections = [
  {
    id: "business",
    title: "Business",
    learned: "Gloww is a women's health brand offering reusable menstrual care.",
    items: 6,
  },
  {
    id: "products",
    title: "Products",
    learned: "Menstrual Cup (S/M/L), Sterilizer Cup, Period Care Kit.",
    items: 12,
  },
  {
    id: "pricing",
    title: "Pricing",
    learned: "Wholesale ₹410–₹720. Retail margin 32%. MOQ 20 units.",
    items: 8,
  },
  {
    id: "customers",
    title: "Target Customers",
    learned: "Pharmacies, women's-health retailers, clinics and distributors.",
    items: 5,
  },
  {
    id: "playbooks",
    title: "Sales Playbooks",
    learned: "Sample-first for pharmacies, margin-first for distributors.",
    items: 4,
  },
  {
    id: "claims",
    title: "Approved Claims",
    learned: "Medical-grade silicone, up to 10 years of use, 12-hour wear.",
    items: 9,
  },
  {
    id: "languages",
    title: "Languages",
    learned: "Hindi, English, Marwari transliteration for Jodhpur outlets.",
    items: 3,
  },
  {
    id: "territories",
    title: "Territories",
    learned: "Rajasthan active. Maharashtra and Karnataka in planning.",
    items: 5,
  },
];

export const knowledgeSources = [
  { id: "src-1", name: "Gloww Website", type: "Connected", updated: "Sep 09, 2026" },
  { id: "src-2", name: "Product Catalogue", type: "PDF", updated: "Aug 28, 2026" },
  { id: "src-3", name: "Wholesale Pricing", type: "Spreadsheet", updated: "Sep 01, 2026" },
  { id: "src-4", name: "Retailer FAQ", type: "Document", updated: "Jul 19, 2026" },
  { id: "src-5", name: "Brand Guidelines", type: "PDF", updated: "May 12, 2026" },
  {
    id: "src-6",
    name: "Approved WhatsApp Templates",
    type: "Template set",
    updated: "Sep 07, 2026",
  },
];

export const aiLearned = [
  { label: "Product positioning", value: "Reusable, sustainable menstrual care" },
  { label: "Target customer", value: "Pharmacies and women's-health retailers" },
  { label: "Differentiators", value: "Medical-grade silicone, 10-year life, steriliser included" },
  { label: "Allowed claims", value: "No medical outcome claims; comfort and reuse only" },
  { label: "Pricing rules", value: "Never quote below ₹410 wholesale without approval" },
  { label: "Sample policy", value: "One kit per store, dispatch after address confirmation" },
];

export const autonomySettings = [
  { id: "discovery", label: "Discovery", value: "Automated", level: 4 },
  { id: "targeting", label: "Target selection", value: "Automated", level: 4 },
  { id: "first-outreach", label: "First outreach", value: "Human approval", level: 2 },
  { id: "followup", label: "Follow-up", value: "Automated", level: 3 },
  { id: "sample", label: "Sample shipment", value: "Approval required", level: 2 },
  { id: "commercial", label: "Commercial commitment", value: "Human approval required", level: 1 },
];

export const autonomyLevels = [
  { level: 1, name: "Recommend", detail: "Rocket-Loop suggests, you decide everything." },
  { level: 2, name: "Approve", detail: "Rocket-Loop prepares actions, you approve each batch." },
  { level: 3, name: "Execute", detail: "Rocket-Loop executes inside agreed guardrails." },
  { level: 4, name: "Optimize", detail: "Rocket-Loop reallocates effort based on outcomes." },
];

export const planStrategy = [
  {
    step: 1,
    title: "Identify & prioritise high-fit retailers",
    detail: "Score 12,842 indexed outlets against category relevance, demand and route economics.",
  },
  {
    step: 2,
    title: "Launch localised outreach",
    detail: "Hindi-first WhatsApp and voice sequences, human-approved for the first contact.",
  },
  {
    step: 3,
    title: "Qualify interested businesses",
    detail: "Read replies, confirm store details and separate real intent from politeness.",
  },
  {
    step: 4,
    title: "Dispatch product samples",
    detail: "Batch sample kits by route, hold commercial commitments for human approval.",
  },
  {
    step: 5,
    title: "Follow up on delivery",
    detail: "Follow up 6–9 days after delivery, when first orders historically cluster.",
  },
  {
    step: 6,
    title: "Track orders and repeat business",
    detail: "Attribute every order back to the outreach action that created it.",
  },
  {
    step: 7,
    title: "Reallocate effort based on performance",
    detail: "Move budget and actions toward the cities that are actually converting.",
  },
];

export const planTimeline = [
  { window: "Week 1", title: "Setup & Discovery", detail: "Index territory, score outlets, build priority list." },
  { window: "Week 2–4", title: "Outreach & Sampling", detail: "Run approved outreach, dispatch first 120 samples." },
  { window: "Week 5–8", title: "Follow-up", detail: "Convert sampled stores, tighten messaging per city." },
  { window: "Week 9–12", title: "Conversion & Expansion", detail: "Scale winners, extend to tier-2 clusters." },
];

export const inr = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
