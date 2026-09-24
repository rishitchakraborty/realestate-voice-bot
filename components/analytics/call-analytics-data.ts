import { BOTS, DEFAULT_BOT, BotConfig } from "@/constants/bots";

export type DispositionType =
  // Common / Telephony
  | "Callback Requested"
  | "Not Reachable"
  | "Wrong Number"
  | "Not Interested"
  | "Dropped Mid-Call"
  | "No Response"
  | "Do Not Call"
  // Flow 1 specific
  | "WhatsApp Brochure Sent"
  | "Plot Interest Captured"
  | "Flat Interest Captured"
  | "Exploring / Vague"
  // Flow 2 specific
  | "Site Visit Confirmed"
  | "VIP Cab Confirmed"
  | "Weekend Slot Locked"
  | "Weekday Slot Locked"
  | "Brochure Not Reviewed"
  | "Visit Declined"
  | "Site Visit Booked"; // Backward compat

export interface CallRecord {
  id: string;
  flowId: string;
  customerName: string;
  phoneNumber: string;
  callType: "Outbound" | "Inbound";
  sessionId: string;
  duration: string;
  recordingAvailable: boolean;
  language: string;
  purpose: string;
  preferredLocation: string;
  configuration: string;
  budgetRange: string;
  disposition: DispositionType;
  timestamp: string;
  notes?: string;
  leadScore?: number;
  sentiment?: "Positive" | "Neutral" | "Negative";
  // Flow-specific details
  whatsAppStatus?: "Delivered" | "Pending" | "Failed";
  visitSlot?: string;
  vipCabAddress?: string;
}

export interface DispositionConfig {
  label: DispositionType;
  count: number;
  percentage: number;
  color: string;
  bgColor: string;
  textColor: string;
  borderColor: string;
}

export interface FunnelMetric {
  stage: string;
  count: number;
  percentage: number;
}

export interface StatCardItem {
  title: string;
  count: number | string;
  subtitle: string;
  icon: "phone" | "calendar" | "whatsapp" | "building" | "car" | "clock" | "user-x" | "phone-off";
  exportCategory?: string;
  badge?: string;
}

export interface FlowAnalyticsDataset {
  flowId: string;
  flowTitle: string;
  shortName: string;
  badge: string;
  accentColor: string;
  totalCalls: number;
  connectedCalls: number;
  objective: string;
  dispositionConfigs: Record<string, DispositionConfig>;
  orderedDispositions: DispositionType[];
  statCards: StatCardItem[];
  funnelData: FunnelMetric[];
  splitTitle: string;
  splitSubtitle: string;
  splitData: { label: string; count: number; percentage: number }[];
  projectDemandTitle: string;
  projectDemandSubtitle: string;
  projectDemand: { location: string; count: number; percentage: number }[];
  calls: CallRecord[];
}

// ---------------------------------------------------------------------------
// Novesta Projects (from https://novestagroup.in/)
// ---------------------------------------------------------------------------
export const NOVESTA_PROJECTS = [
  { id: "ALL", name: "All Novesta Projects (Kolkata Portfolio)", location: "Kolkata, WB" },
  { id: "NOV-AERO", name: "Unicorn Aerocity — NH-12 Runway / Airport", location: "Beside Airport (NH-12)" },
  { id: "NOV-ECO", name: "Eco Smart City — Newtown Action Area II", location: "Newtown Rajarhat" },
  { id: "NOV-RIVER", name: "Unicorn Riverside Resort — Ganges Riverfront", location: "River Ganges" },
  { id: "NOV-BUNGALOW", name: "The Art of the Bungalow — Luxury Plotted Estates", location: "Gated Enclaves" },
];

export const WORKFLOW_OPTIONS = NOVESTA_PROJECTS;

// ---------------------------------------------------------------------------
// Real Kolkata & Eastern India names for authentic lead representation
// ---------------------------------------------------------------------------
const BENGALI_INDIAN_NAMES = [
  "Subhashish Banerjee",
  "Debabrata Chatterjee",
  "Sneha Mukherjee",
  "Rajesh Ganguly",
  "Poulomi Sen",
  "Amitava Ghosh",
  "Vikram Singhania",
  "Priya Agarwal",
  "Anirban Bhattacharya",
  "Tanmoy Majumdar",
  "Swati Roychowdhury",
  "Pradip Chakraborty",
  "Moumita Dasgupta",
  "Siddharth Dutta",
  "Sayani Mukherjee",
  "Ritwik Sen",
  "Arindam Paul",
  "Kakali Sengupta",
  "Kaushik Mitra",
  "Sumita Dey",
  "Abhijit Guha",
  "Madhumita Nandi",
  "Shounak Bose",
  "Barnali Poddar",
  "Indranil Karmakar",
  "Nabanita Roy",
  "Rajarshi Saha",
  "Soumya Roy",
  "Dipanjan Kundu",
  "Aparajita Biswas",
];

// ===========================================================================
// CALL FLOW 1: Introduction, Interest & WhatsApp Verification Analytics
// ===========================================================================
export const FLOW_1_DISPOSITION_CONFIGS: Record<string, DispositionConfig> = {
  "WhatsApp Brochure Sent": {
    label: "WhatsApp Brochure Sent",
    count: 48,
    percentage: 32.4,
    color: "#10b981", // Emerald
    bgColor: "bg-emerald-50",
    textColor: "text-emerald-700",
    borderColor: "border-emerald-200",
  },
  "Plot Interest Captured": {
    label: "Plot Interest Captured",
    count: 36,
    percentage: 24.3,
    color: "#c9a24c", // Novesta Gold
    bgColor: "bg-amber-50",
    textColor: "text-amber-700",
    borderColor: "border-amber-200",
  },
  "Flat Interest Captured": {
    label: "Flat Interest Captured",
    count: 22,
    percentage: 14.9,
    color: "#2563eb", // Blue
    bgColor: "bg-blue-50",
    textColor: "text-blue-700",
    borderColor: "border-blue-200",
  },
  "Callback Requested": {
    label: "Callback Requested",
    count: 15,
    percentage: 10.1,
    color: "#06b6d4", // Cyan
    bgColor: "bg-cyan-50",
    textColor: "text-cyan-700",
    borderColor: "border-cyan-200",
  },
  "Exploring / Vague": {
    label: "Exploring / Vague",
    count: 11,
    percentage: 7.4,
    color: "#8b5cf6", // Purple
    bgColor: "bg-purple-50",
    textColor: "text-purple-700",
    borderColor: "border-purple-200",
  },
  "Not Interested": {
    label: "Not Interested",
    count: 7,
    percentage: 4.7,
    color: "#f97316", // Orange
    bgColor: "bg-orange-50",
    textColor: "text-orange-700",
    borderColor: "border-orange-200",
  },
  "Wrong Number": {
    label: "Wrong Number",
    count: 4,
    percentage: 2.7,
    color: "#ec4899", // Pink
    bgColor: "bg-pink-50",
    textColor: "text-pink-700",
    borderColor: "border-pink-200",
  },
  "Not Reachable": {
    label: "Not Reachable",
    count: 5,
    percentage: 3.4,
    color: "#ef4444", // Red
    bgColor: "bg-red-50",
    textColor: "text-red-700",
    borderColor: "border-red-200",
  },
};

export const FLOW_1_ORDERED_DISPOSITIONS: DispositionType[] = [
  "WhatsApp Brochure Sent",
  "Plot Interest Captured",
  "Flat Interest Captured",
  "Callback Requested",
  "Exploring / Vague",
  "Not Interested",
  "Wrong Number",
  "Not Reachable",
];

const FLOW_1_CALLS: CallRecord[] = [
  {
    id: "f1-call-1",
    flowId: "call-flow-1",
    customerName: "Subhashish Banerjee",
    phoneNumber: "+91 98301 44521",
    callType: "Outbound",
    sessionId: "f1-3f2a-88b1-4d0e-9a2f-7c1b3e8d9101",
    duration: "04:32",
    recordingAvailable: false,
    language: "Bengali",
    purpose: "Investment",
    preferredLocation: "NH-12 Runway / Airport",
    configuration: "2,000 Sq.Ft. Plot",
    budgetRange: "₹75L–₹95L",
    disposition: "WhatsApp Brochure Sent",
    timestamp: "2026-08-14T10:14:22Z",
    leadScore: 92,
    sentiment: "Positive",
    whatsAppStatus: "Delivered",
    notes: "Confirmed enquiry on Unicorn Aerocity. Active WhatsApp verified. Legal layout PDF & pricing dispatched instantly.",
  },
  {
    id: "f1-call-2",
    flowId: "call-flow-1",
    customerName: "Sneha Mukherjee",
    phoneNumber: "+91 98310 99234",
    callType: "Outbound",
    sessionId: "f1-9b7c-2f6a-4c3d-88e5-21d9f8c0e234",
    duration: "03:48",
    recordingAvailable: false,
    language: "English",
    purpose: "Staying",
    preferredLocation: "Newtown Action Area II",
    configuration: "1,500 Sq.Ft. Plot",
    budgetRange: "₹60L–₹75L",
    disposition: "Plot Interest Captured",
    timestamp: "2026-08-14T09:42:15Z",
    leadScore: 88,
    sentiment: "Positive",
    whatsAppStatus: "Delivered",
    notes: "Interested in G+1 bungalow permission at Eco Smart City. Brochure shared.",
  },
  {
    id: "f1-call-3",
    flowId: "call-flow-1",
    customerName: "Debabrata Chatterjee",
    phoneNumber: "+91 98362 11098",
    callType: "Outbound",
    sessionId: "f1-5e18-71c4-4bb0-a5f1-83d47c2e9a56",
    duration: "00:00",
    recordingAvailable: false,
    language: "—",
    purpose: "—",
    preferredLocation: "—",
    configuration: "—",
    budgetRange: "—",
    disposition: "Not Reachable",
    timestamp: "2026-08-14T09:12:00Z",
    sentiment: "Neutral",
    whatsAppStatus: "Failed",
    notes: "Telephony line busy / unreachable on first dial attempt.",
  },
  {
    id: "f1-call-4",
    flowId: "call-flow-1",
    customerName: "Vikram Singhania",
    phoneNumber: "+91 98305 77812",
    callType: "Outbound",
    sessionId: "f1-c14a-3d92-4e77-9b1e-45a7d9f2c871",
    duration: "05:14",
    recordingAvailable: false,
    language: "Hindi",
    purpose: "Investment",
    preferredLocation: "Ganges Riverfront",
    configuration: "3 BHK Luxury Villa",
    budgetRange: "₹1.2Cr–₹1.5Cr",
    disposition: "Flat Interest Captured",
    timestamp: "2026-08-14T08:55:40Z",
    leadScore: 84,
    sentiment: "Positive",
    whatsAppStatus: "Delivered",
    notes: "Seeking luxury villa waterfront facing Ganges. Brochure & drone video link sent over WhatsApp.",
  },
  {
    id: "f1-call-5",
    flowId: "call-flow-1",
    customerName: "Poulomi Sen",
    phoneNumber: "+91 98318 66543",
    callType: "Outbound",
    sessionId: "f1-71bf-6e2d-40a5-8c9f-3e8a2b5c7d89",
    duration: "01:45",
    recordingAvailable: false,
    language: "Bengali",
    purpose: "Investment",
    preferredLocation: "NH-12 Runway / Airport",
    configuration: "1,000 Sq.Ft. Plot",
    budgetRange: "₹40L–₹50L",
    disposition: "Callback Requested",
    timestamp: "2026-08-13T17:20:11Z",
    leadScore: 70,
    sentiment: "Neutral",
    whatsAppStatus: "Pending",
    notes: "Customer at office meeting during call. Requested callback after 7:00 PM today.",
  },
  {
    id: "f1-call-6",
    flowId: "call-flow-1",
    customerName: "Amitava Ghosh",
    phoneNumber: "+91 98309 33211",
    callType: "Outbound",
    sessionId: "f1-2d0f-95a4-4c31-b7e6-12c8e5d3a749",
    duration: "02:18",
    recordingAvailable: false,
    language: "English",
    purpose: "Staying",
    preferredLocation: "NH-12 Runway / Airport",
    configuration: "3,000 Sq.Ft. Plot",
    budgetRange: "₹1.1Cr–₹1.3Cr",
    disposition: "Exploring / Vague",
    timestamp: "2026-08-13T16:45:00Z",
    leadScore: 60,
    sentiment: "Neutral",
    whatsAppStatus: "Delivered",
    notes: "Currently evaluating multiple builders. Sent Unicorn Aerocity legal deed & layout map with zero pressure.",
  },
  {
    id: "f1-call-7",
    flowId: "call-flow-1",
    customerName: "Unknown Caller",
    phoneNumber: "+91 97480 22341",
    callType: "Outbound",
    sessionId: "f1-a839-1b7d-4e90-8f3a-92d4b7c1e563",
    duration: "00:22",
    recordingAvailable: false,
    language: "Hindi",
    purpose: "—",
    preferredLocation: "—",
    configuration: "—",
    budgetRange: "—",
    disposition: "Wrong Number",
    timestamp: "2026-08-13T15:30:18Z",
    sentiment: "Neutral",
    whatsAppStatus: "Failed",
    notes: "Recipient confirmed wrong contact number; logged as wrong number and closed politely.",
  },
  {
    id: "f1-call-8",
    flowId: "call-flow-1",
    customerName: "Rajesh Ganguly",
    phoneNumber: "+91 98311 88990",
    callType: "Outbound",
    sessionId: "f1-6f1a-4c9b-471d-9a0e-54d2f8b7c912",
    duration: "01:10",
    recordingAvailable: false,
    language: "Bengali",
    purpose: "—",
    preferredLocation: "—",
    configuration: "—",
    budgetRange: "—",
    disposition: "Not Interested",
    timestamp: "2026-08-13T14:15:29Z",
    leadScore: 20,
    sentiment: "Neutral",
    whatsAppStatus: "Failed",
    notes: "Already purchased another plot in Madhyamgram. Asked to be removed from enquiry list.",
  },
  {
    id: "f1-call-9",
    flowId: "call-flow-1",
    customerName: "Priya Agarwal",
    phoneNumber: "+91 98302 55432",
    callType: "Outbound",
    sessionId: "f1-b2e9-8a3c-40f5-91e8-73c1d5e9a246",
    duration: "06:12",
    recordingAvailable: false,
    language: "English",
    purpose: "Investment",
    preferredLocation: "NH-12 Runway / Airport",
    configuration: "4,000 Sq.Ft. Corner Plot",
    budgetRange: "₹1.5Cr–₹1.8Cr",
    disposition: "WhatsApp Brochure Sent",
    timestamp: "2026-08-13T12:50:04Z",
    leadScore: 96,
    sentiment: "Positive",
    whatsAppStatus: "Delivered",
    notes: "High net worth investor. Interested in corner commercial-facing plot at Unicorn Aerocity. Brochure & legal approvals sent.",
  },
  {
    id: "f1-call-10",
    flowId: "call-flow-1",
    customerName: "Anirban Bhattacharya",
    phoneNumber: "+91 98360 44321",
    callType: "Outbound",
    sessionId: "f1-4c7a-5f8b-403d-8a6e-19c4d8b2e571",
    duration: "04:05",
    recordingAvailable: false,
    language: "Bengali",
    purpose: "Staying",
    preferredLocation: "Eco Smart City",
    configuration: "2,000 Sq.Ft. Plot",
    budgetRange: "₹80L–₹95L",
    disposition: "Plot Interest Captured",
    timestamp: "2026-08-13T11:22:33Z",
    leadScore: 89,
    sentiment: "Positive",
    whatsAppStatus: "Delivered",
    notes: "Verified interest in eco-smart plotted community. Brochure sent on WhatsApp.",
  },
];

// Generate additional realistic Flow 1 calls
function generateFlow1Calls(): CallRecord[] {
  const calls: CallRecord[] = [...FLOW_1_CALLS];
  const targetCounts: { type: DispositionType; count: number }[] = [
    { type: "WhatsApp Brochure Sent", count: 46 },
    { type: "Plot Interest Captured", count: 34 },
    { type: "Flat Interest Captured", count: 21 },
    { type: "Callback Requested", count: 14 },
    { type: "Exploring / Vague", count: 10 },
    { type: "Not Interested", count: 6 },
    { type: "Wrong Number", count: 3 },
    { type: "Not Reachable", count: 4 },
  ];

  let idCounter = 11;
  const locations = [
    "NH-12 Runway / Airport",
    "Newtown Action Area II",
    "Ganges Riverfront",
    "Bungalow Sanctuary",
  ];
  const configs = [
    "1,000 Sq.Ft. Plot",
    "1,500 Sq.Ft. Plot",
    "2,000 Sq.Ft. Plot",
    "3,000 Sq.Ft. Corner Plot",
    "3 BHK Bungalow",
    "4 BHK Villa",
  ];
  const budgets = ["₹40L–₹55L", "₹60L–₹75L", "₹75L–₹95L", "₹1.1Cr–₹1.4Cr", "₹1.5Cr+"];
  const languages = ["Bengali", "English", "Hindi"];

  for (const item of targetCounts) {
    for (let i = 0; i < item.count; i++) {
      const isUnreachable = item.type === "Not Reachable";
      const isWrong = item.type === "Wrong Number";
      const isDeclined = item.type === "Not Interested";
      const name = isWrong ? "Unknown Caller" : BENGALI_INDIAN_NAMES[(idCounter * 3) % BENGALI_INDIAN_NAMES.length];
      const phone = `+91 9830${(idCounter * 739) % 89999 + 10000}`;
      const pseudoUuid = `f1-${(idCounter * 16777619).toString(16).padStart(8, "0")}-${((idCounter * 4096) % 65535).toString(16).padStart(4, "0")}-4${idCounter.toString(16).padStart(3, "0")}-8b2f`;

      const duration = isUnreachable
        ? "00:00"
        : isWrong
        ? "00:18"
        : `${((idCounter % 5) + 1).toString().padStart(2, "0")}:${((idCounter * 17) % 60).toString().padStart(2, "0")}`;

      calls.push({
        id: `f1-call-${idCounter}`,
        flowId: "call-flow-1",
        customerName: name,
        phoneNumber: phone,
        callType: "Outbound",
        sessionId: pseudoUuid,
        duration,
        recordingAvailable: false,
        language: isUnreachable || isWrong ? "—" : languages[idCounter % languages.length],
        purpose: isUnreachable || isWrong || isDeclined ? "—" : idCounter % 2 === 0 ? "Investment" : "Staying",
        preferredLocation: isUnreachable || isWrong ? "—" : locations[idCounter % locations.length],
        configuration: isUnreachable || isWrong || isDeclined ? "—" : configs[idCounter % configs.length],
        budgetRange: isUnreachable || isWrong || isDeclined ? "—" : budgets[idCounter % budgets.length],
        disposition: item.type,
        timestamp: `2026-08-${(14 - (idCounter % 13)).toString().padStart(2, "0")}T${(10 + (idCounter % 8)).toString().padStart(2, "0")}:${(idCounter % 59).toString().padStart(2, "0")}:00Z`,
        leadScore: isUnreachable || isWrong ? undefined : item.type === "WhatsApp Brochure Sent" ? 90 + (idCounter % 8) : 40 + (idCounter % 40),
        sentiment: item.type === "WhatsApp Brochure Sent" || item.type === "Plot Interest Captured" ? "Positive" : isDeclined ? "Negative" : "Neutral",
        whatsAppStatus: item.type === "WhatsApp Brochure Sent" || item.type === "Plot Interest Captured" || item.type === "Flat Interest Captured" ? "Delivered" : "Failed",
      });

      idCounter++;
    }
  }

  return calls;
}

export const ALL_FLOW_1_CALLS: CallRecord[] = generateFlow1Calls();

export const FLOW_1_DATASET: FlowAnalyticsDataset = {
  flowId: "call-flow-1",
  flowTitle: "Call Flow 1 — Introduction, Interest & WhatsApp Verification",
  shortName: "Intro & WhatsApp Verification",
  badge: "Lead Qualification",
  accentColor: "#c9a24c",
  totalCalls: 148,
  connectedCalls: 139,
  objective: "Confirm lead authenticity, verify customer identity and WhatsApp number, ascertain property preference, and deliver verified brochures with zero pressure.",
  dispositionConfigs: FLOW_1_DISPOSITION_CONFIGS,
  orderedDispositions: FLOW_1_ORDERED_DISPOSITIONS,
  statCards: [
    {
      title: "Total Connected Calls",
      count: 139,
      subtitle: "Humanized sub-5s opening with zero robotic latency.",
      icon: "phone",
      badge: "93.9% Connection Rate",
    },
    {
      title: "WhatsApp Brochures Sent",
      count: 48,
      subtitle: "Legal layout maps & price sheets delivered via WhatsApp.",
      icon: "whatsapp",
      exportCategory: "WhatsApp Brochure Sent",
      badge: "34.5% Conversion",
    },
    {
      title: "Plotted Development Interest",
      count: 36,
      subtitle: "Active buyers looking for 1,000–4,000 Sq.Ft. plots.",
      icon: "building",
      exportCategory: "Plot Interest Captured",
    },
    {
      title: "Flats & Bungalows Interest",
      count: 22,
      subtitle: "Luxury residential residences across Newtown & Ganges.",
      icon: "building",
      exportCategory: "Flat Interest Captured",
    },
    {
      title: "Callback Slots Captured",
      count: 15,
      subtitle: "Time preference locked when prospect was busy/meeting.",
      icon: "clock",
      exportCategory: "Callback Requested",
    },
    {
      title: "Wrong Number / Closed",
      count: 11,
      subtitle: "Politely filtered wrong contacts & closed inquiries.",
      icon: "user-x",
      exportCategory: "Not Interested",
    },
  ],
  funnelData: [
    { stage: "Connected Calls", count: 139, percentage: 100 },
    { stage: "Identity & Enquiry Verified", count: 122, percentage: 87.8 },
    { stage: "Project Briefing Completed", count: 104, percentage: 74.8 },
    { stage: "Property Interest Qualified", count: 86, percentage: 61.9 },
    { stage: "WhatsApp Brochure Delivered", count: 59, percentage: 42.4 },
  ],
  splitTitle: "Property Preference Split",
  splitSubtitle: "Plotted township development vs. luxury residential flats",
  splitData: [
    { label: "Plotted Developments (1,000–4,000 Sq.Ft.)", count: 54, percentage: 62.8 },
    { label: "Residential Flats & Bungalows", count: 32, percentage: 37.2 },
  ],
  projectDemandTitle: "Township Demand Distribution",
  projectDemandSubtitle: "Leads by Novesta project location, 30-day window",
  projectDemand: [
    { location: "Unicorn Aerocity (NH-12 Airport Runway)", count: 62, percentage: 100 },
    { location: "Eco Smart City (Newtown Action Area II)", count: 48, percentage: 77.4 },
    { location: "Unicorn Riverside Resort (Ganges Riverfront)", count: 36, percentage: 58.1 },
    { location: "The Art of the Bungalow (Luxury Enclave)", count: 24, percentage: 38.7 },
  ],
  calls: ALL_FLOW_1_CALLS,
};

// ===========================================================================
// CALL FLOW 2: Site Visit Confirmation Analytics
// ===========================================================================
export const FLOW_2_DISPOSITION_CONFIGS: Record<string, DispositionConfig> = {
  "Site Visit Confirmed": {
    label: "Site Visit Confirmed",
    count: 34,
    percentage: 30.4,
    color: "#0088cc", // QuarkGen Cyan / Blue
    bgColor: "bg-sky-50",
    textColor: "text-sky-700",
    borderColor: "border-sky-200",
  },
  "VIP Cab Confirmed": {
    label: "VIP Cab Confirmed",
    count: 26,
    percentage: 23.2,
    color: "#10b981", // Emerald
    bgColor: "bg-emerald-50",
    textColor: "text-emerald-700",
    borderColor: "border-emerald-200",
  },
  "Weekend Slot Locked": {
    label: "Weekend Slot Locked",
    count: 21,
    percentage: 18.8,
    color: "#c9a24c", // Novesta Gold
    bgColor: "bg-amber-50",
    textColor: "text-amber-700",
    borderColor: "border-amber-200",
  },
  "Weekday Slot Locked": {
    label: "Weekday Slot Locked",
    count: 13,
    percentage: 11.6,
    color: "#06b6d4", // Cyan
    bgColor: "bg-cyan-50",
    textColor: "text-cyan-700",
    borderColor: "border-cyan-200",
  },
  "Callback Requested": {
    label: "Callback Requested",
    count: 9,
    percentage: 8.0,
    color: "#6366f1", // Indigo
    bgColor: "bg-indigo-50",
    textColor: "text-indigo-700",
    borderColor: "border-indigo-200",
  },
  "Brochure Not Reviewed": {
    label: "Brochure Not Reviewed",
    count: 5,
    percentage: 4.5,
    color: "#0d9488", // Teal
    bgColor: "bg-teal-50",
    textColor: "text-teal-700",
    borderColor: "border-teal-200",
  },
  "Visit Declined": {
    label: "Visit Declined",
    count: 2,
    percentage: 1.8,
    color: "#f97316", // Orange
    bgColor: "bg-orange-50",
    textColor: "text-orange-700",
    borderColor: "border-orange-200",
  },
  "Not Reachable": {
    label: "Not Reachable",
    count: 2,
    percentage: 1.8,
    color: "#ef4444", // Red
    bgColor: "bg-red-50",
    textColor: "text-red-700",
    borderColor: "border-red-200",
  },
};

export const FLOW_2_ORDERED_DISPOSITIONS: DispositionType[] = [
  "Site Visit Confirmed",
  "VIP Cab Confirmed",
  "Weekend Slot Locked",
  "Weekday Slot Locked",
  "Callback Requested",
  "Brochure Not Reviewed",
  "Visit Declined",
  "Not Reachable",
];

const FLOW_2_CALLS: CallRecord[] = [
  {
    id: "f2-call-1",
    flowId: "call-flow-2",
    customerName: "Tanmoy Majumdar",
    phoneNumber: "+91 98315 22019",
    callType: "Outbound",
    sessionId: "f2-3f2a-88b1-4d0e-9a2f-7c1b3e8d9201",
    duration: "06:14",
    recordingAvailable: false,
    language: "Bengali",
    purpose: "Staying",
    preferredLocation: "Unicorn Aerocity (NH-12)",
    configuration: "2,000 Sq.Ft. Plot",
    budgetRange: "₹75L–₹95L",
    disposition: "Site Visit Confirmed",
    timestamp: "2026-08-14T11:20:10Z",
    leadScore: 96,
    sentiment: "Positive",
    visitSlot: "Saturday, Aug 22 · 11:00 AM",
    vipCabAddress: "Salt Lake Sector 1, Block BD, Kolkata",
    notes: "Site visit locked for Saturday 11 AM with senior architect. Complimentary VIP cab pickup confirmed from Salt Lake.",
  },
  {
    id: "f2-call-2",
    flowId: "call-flow-2",
    customerName: "Swati Roychowdhury",
    phoneNumber: "+91 98308 77654",
    callType: "Outbound",
    sessionId: "f2-9b7c-2f6a-4c3d-88e5-21d9f8c0e202",
    duration: "05:42",
    recordingAvailable: false,
    language: "English",
    purpose: "Investment",
    preferredLocation: "Eco Smart City (Newtown)",
    configuration: "1,500 Sq.Ft. Plot",
    budgetRange: "₹65L–₹80L",
    disposition: "VIP Cab Confirmed",
    timestamp: "2026-08-14T10:45:00Z",
    leadScore: 92,
    sentiment: "Positive",
    visitSlot: "Sunday, Aug 23 · 3:30 PM",
    vipCabAddress: "Ballygunge Circular Road, Kolkata 700019",
    notes: "VIP cab driver assigned. Calendar invitation sent to customer and relationship manager.",
  },
  {
    id: "f2-call-3",
    flowId: "call-flow-2",
    customerName: "Pradip Chakraborty",
    phoneNumber: "+91 98361 44320",
    callType: "Outbound",
    sessionId: "f2-5e18-71c4-4bb0-a5f1-83d47c2e9203",
    duration: "04:30",
    recordingAvailable: false,
    language: "Bengali",
    purpose: "Staying",
    preferredLocation: "Unicorn Aerocity (NH-12)",
    configuration: "3,000 Sq.Ft. Plot",
    budgetRange: "₹1.1Cr–₹1.4Cr",
    disposition: "Weekend Slot Locked",
    timestamp: "2026-08-14T09:30:15Z",
    leadScore: 90,
    sentiment: "Positive",
    visitSlot: "Saturday, Aug 22 · 4:00 PM",
    vipCabAddress: "Self-driving via VIP Road",
    notes: "Customer prefers self-driving. Location map pin sent over WhatsApp.",
  },
  {
    id: "f2-call-4",
    flowId: "call-flow-2",
    customerName: "Moumita Dasgupta",
    phoneNumber: "+91 98319 88123",
    callType: "Outbound",
    sessionId: "f2-c14a-3d92-4e77-9b1e-45a7d9f2c204",
    duration: "03:55",
    recordingAvailable: false,
    language: "English",
    purpose: "Investment",
    preferredLocation: "Ganges Riverfront",
    configuration: "3 BHK Villa",
    budgetRange: "₹1.2Cr–₹1.5Cr",
    disposition: "Weekday Slot Locked",
    timestamp: "2026-08-14T08:40:00Z",
    leadScore: 85,
    sentiment: "Positive",
    visitSlot: "Wednesday, Aug 19 · 11:30 AM",
    vipCabAddress: "Alipore Park Road, Kolkata",
    notes: "Weekday appointment scheduled to review master riverfront villa model.",
  },
  {
    id: "f2-call-5",
    flowId: "call-flow-2",
    customerName: "Siddharth Dutta",
    phoneNumber: "+91 98303 66554",
    callType: "Outbound",
    sessionId: "f2-71bf-6e2d-40a5-8c9f-3e8a2b5c7205",
    duration: "02:10",
    recordingAvailable: false,
    language: "Bengali",
    purpose: "Staying",
    preferredLocation: "Unicorn Aerocity (NH-12)",
    configuration: "1,000 Sq.Ft. Plot",
    budgetRange: "₹40L–₹55L",
    disposition: "Callback Requested",
    timestamp: "2026-08-13T17:15:30Z",
    leadScore: 72,
    sentiment: "Neutral",
    notes: "Traveling outside Kolkata this weekend; requested callback next Tuesday to finalize visit date.",
  },
  {
    id: "f2-call-6",
    flowId: "call-flow-2",
    customerName: "Sayani Mukherjee",
    phoneNumber: "+91 98312 33445",
    callType: "Outbound",
    sessionId: "f2-2d0f-95a4-4c31-b7e6-12c8e5d3a206",
    duration: "02:45",
    recordingAvailable: false,
    language: "English",
    purpose: "Investment",
    preferredLocation: "Eco Smart City (Newtown)",
    configuration: "2,000 Sq.Ft. Plot",
    budgetRange: "₹75L–₹95L",
    disposition: "Brochure Not Reviewed",
    timestamp: "2026-08-13T16:10:00Z",
    leadScore: 65,
    sentiment: "Neutral",
    notes: "Customer had not reviewed the WhatsApp brochure yet. Bot offered 60-second summary and re-sent layout link.",
  },
  {
    id: "f2-call-7",
    flowId: "call-flow-2",
    customerName: "Ritwik Sen",
    phoneNumber: "+91 98366 77889",
    callType: "Outbound",
    sessionId: "f2-a839-1b7d-4e90-8f3a-92d4b7c1e207",
    duration: "01:25",
    recordingAvailable: false,
    language: "Bengali",
    purpose: "—",
    preferredLocation: "—",
    configuration: "—",
    budgetRange: "—",
    disposition: "Visit Declined",
    timestamp: "2026-08-13T15:20:10Z",
    leadScore: 25,
    sentiment: "Neutral",
    notes: "Prospect decided on alternative flat in South Kolkata; declined site visit politely.",
  },
  {
    id: "f2-call-8",
    flowId: "call-flow-2",
    customerName: "Arindam Paul",
    phoneNumber: "+91 98307 11223",
    callType: "Outbound",
    sessionId: "f2-6f1a-4c9b-471d-9a0e-54d2f8b7c208",
    duration: "00:00",
    recordingAvailable: false,
    language: "—",
    purpose: "—",
    preferredLocation: "—",
    configuration: "—",
    budgetRange: "—",
    disposition: "Not Reachable",
    timestamp: "2026-08-13T14:05:00Z",
    sentiment: "Neutral",
    notes: "Follow-up dial unanswered; scheduled for automated second attempt tomorrow.",
  },
  {
    id: "f2-call-9",
    flowId: "call-flow-2",
    customerName: "Kakali Sengupta",
    phoneNumber: "+91 98314 99001",
    callType: "Outbound",
    sessionId: "f2-b2e9-8a3c-40f5-91e8-73c1d5e9a209",
    duration: "05:50",
    recordingAvailable: false,
    language: "Bengali",
    purpose: "Staying",
    preferredLocation: "Unicorn Aerocity (NH-12)",
    configuration: "2,000 Sq.Ft. Plot",
    budgetRange: "₹80L–₹95L",
    disposition: "Site Visit Confirmed",
    timestamp: "2026-08-13T12:30:00Z",
    leadScore: 94,
    sentiment: "Positive",
    visitSlot: "Sunday, Aug 23 · 11:00 AM",
    vipCabAddress: "Behala Chowrasta, Kolkata",
    notes: "Site visit confirmed with family. VIP cab pick-up confirmed from Behala.",
  },
  {
    id: "f2-call-10",
    flowId: "call-flow-2",
    customerName: "Kaushik Mitra",
    phoneNumber: "+91 98300 44556",
    callType: "Outbound",
    sessionId: "f2-4c7a-5f8b-403d-8a6e-19c4d8b2e210",
    duration: "04:12",
    recordingAvailable: false,
    language: "English",
    purpose: "Investment",
    preferredLocation: "Eco Smart City (Newtown)",
    configuration: "4,000 Sq.Ft. Plot",
    budgetRange: "₹1.4Cr–₹1.8Cr",
    disposition: "VIP Cab Confirmed",
    timestamp: "2026-08-13T11:15:00Z",
    leadScore: 95,
    sentiment: "Positive",
    visitSlot: "Saturday, Aug 22 · 3:00 PM",
    vipCabAddress: "New Town Action Area 1, Kolkata",
    notes: "VIP cab booked. Senior project architect assigned for detailed layout and mutation walkthrough.",
  },
];

// Generate additional realistic Flow 2 calls
function generateFlow2Calls(): CallRecord[] {
  const calls: CallRecord[] = [...FLOW_2_CALLS];
  const targetCounts: { type: DispositionType; count: number }[] = [
    { type: "Site Visit Confirmed", count: 32 },
    { type: "VIP Cab Confirmed", count: 24 },
    { type: "Weekend Slot Locked", count: 20 },
    { type: "Weekday Slot Locked", count: 12 },
    { type: "Callback Requested", count: 8 },
    { type: "Brochure Not Reviewed", count: 4 },
    { type: "Visit Declined", count: 1 },
    { type: "Not Reachable", count: 1 },
  ];

  let idCounter = 11;
  const locations = [
    "Unicorn Aerocity (NH-12)",
    "Eco Smart City (Newtown)",
    "Ganges Riverfront",
    "Bungalow Sanctuary",
  ];
  const configs = [
    "1,000 Sq.Ft. Plot",
    "1,500 Sq.Ft. Plot",
    "2,000 Sq.Ft. Plot",
    "4,000 Sq.Ft. Plot",
    "3 BHK Bungalow",
    "4 BHK Villa",
  ];
  const budgets = ["₹40L–₹55L", "₹65L–₹85L", "₹85L–₹1.1Cr", "₹1.3Cr–₹1.7Cr", "₹2.0Cr+"];
  const languages = ["Bengali", "English", "Hindi"];

  for (const item of targetCounts) {
    for (let i = 0; i < item.count; i++) {
      const isUnreachable = item.type === "Not Reachable";
      const isDeclined = item.type === "Visit Declined";
      const name = BENGALI_INDIAN_NAMES[(idCounter * 5) % BENGALI_INDIAN_NAMES.length];
      const phone = `+91 9831${(idCounter * 627) % 89999 + 10000}`;
      const pseudoUuid = `f2-${(idCounter * 16777619).toString(16).padStart(8, "0")}-${((idCounter * 4096) % 65535).toString(16).padStart(4, "0")}-4${idCounter.toString(16).padStart(3, "0")}-8b2f`;

      const duration = isUnreachable
        ? "00:00"
        : `${((idCounter % 6) + 2).toString().padStart(2, "0")}:${((idCounter * 19) % 60).toString().padStart(2, "0")}`;

      const slotDay = idCounter % 2 === 0 ? "Saturday, Aug 22" : "Sunday, Aug 23";
      const slotTime = idCounter % 3 === 0 ? "11:00 AM" : idCounter % 3 === 1 ? "3:30 PM" : "5:00 PM";

      calls.push({
        id: `f2-call-${idCounter}`,
        flowId: "call-flow-2",
        customerName: name,
        phoneNumber: phone,
        callType: "Outbound",
        sessionId: pseudoUuid,
        duration,
        recordingAvailable: false,
        language: isUnreachable ? "—" : languages[idCounter % languages.length],
        purpose: isUnreachable || isDeclined ? "—" : idCounter % 2 === 0 ? "Investment" : "Staying",
        preferredLocation: isUnreachable ? "—" : locations[idCounter % locations.length],
        configuration: isUnreachable || isDeclined ? "—" : configs[idCounter % configs.length],
        budgetRange: isUnreachable || isDeclined ? "—" : budgets[idCounter % budgets.length],
        disposition: item.type,
        timestamp: `2026-08-${(14 - (idCounter % 13)).toString().padStart(2, "0")}T${(10 + (idCounter % 8)).toString().padStart(2, "0")}:${(idCounter % 59).toString().padStart(2, "0")}:00Z`,
        leadScore: isUnreachable ? undefined : item.type === "Site Visit Confirmed" || item.type === "VIP Cab Confirmed" ? 92 + (idCounter % 7) : 50 + (idCounter % 35),
        sentiment: item.type === "Site Visit Confirmed" || item.type === "VIP Cab Confirmed" ? "Positive" : isDeclined ? "Negative" : "Neutral",
        visitSlot: item.type === "Site Visit Confirmed" || item.type === "VIP Cab Confirmed" || item.type === "Weekend Slot Locked" ? `${slotDay} · ${slotTime}` : undefined,
        vipCabAddress: item.type === "VIP Cab Confirmed" ? `Kolkata Address #${idCounter + 20}, West Bengal` : undefined,
      });

      idCounter++;
    }
  }

  return calls;
}

export const ALL_FLOW_2_CALLS: CallRecord[] = generateFlow2Calls();

export const FLOW_2_DATASET: FlowAnalyticsDataset = {
  flowId: "call-flow-2",
  flowTitle: "Call Flow 2 — Site Visit Confirmation",
  shortName: "Site Visit Confirmation Followup",
  badge: "Site Visit Followup",
  accentColor: "#0088cc",
  totalCalls: 112,
  connectedCalls: 108,
  objective: "Follow up with qualified prospects, coordinate preferred physical site inspection slots, schedule dates/times, and arrange complimentary VIP cab pick-up & drop.",
  dispositionConfigs: FLOW_2_DISPOSITION_CONFIGS,
  orderedDispositions: FLOW_2_ORDERED_DISPOSITIONS,
  statCards: [
    {
      title: "Total Follow-Up Calls",
      count: 108,
      subtitle: "Re-engaged prospects with verified Unicorn Aerocity interest.",
      icon: "phone",
      badge: "96.4% Connection Rate",
    },
    {
      title: "Site Visits Confirmed",
      count: 34,
      subtitle: "Locked walkthrough with senior project architect.",
      icon: "calendar",
      exportCategory: "Site Visit Confirmed",
      badge: "31.5% Visit Rate",
    },
    {
      title: "Complimentary VIP Cabs Booked",
      count: 26,
      subtitle: "Doorstep VIP cab pick-up & drop logistics confirmed.",
      icon: "car",
      exportCategory: "VIP Cab Confirmed",
    },
    {
      title: "Weekend Slots Locked",
      count: 21,
      subtitle: "Saturday & Sunday family on-site walkthroughs.",
      icon: "calendar",
      exportCategory: "Weekend Slot Locked",
    },
    {
      title: "Weekday Walkthroughs",
      count: 13,
      subtitle: "Priority Monday–Friday architect layout consultations.",
      icon: "calendar",
      exportCategory: "Weekday Slot Locked",
    },
    {
      title: "Rescheduled / Callbacks",
      count: 9,
      subtitle: "Prospect traveling; callback locked for subsequent week.",
      icon: "clock",
      exportCategory: "Callback Requested",
    },
  ],
  funnelData: [
    { stage: "Follow-Up Connected", count: 108, percentage: 100 },
    { stage: "Brochure Review Confirmed", count: 91, percentage: 84.3 },
    { stage: "Guided Tour Accepted", count: 58, percentage: 53.7 },
    { stage: "Slot Confirmed (Weekend/Weekday)", count: 38, percentage: 35.2 },
    { stage: "VIP Cab Logistics Arranged", count: 26, percentage: 24.1 },
  ],
  splitTitle: "Visit Schedule Split",
  splitSubtitle: "Weekend family walkthroughs vs. weekday private architect visits",
  splitData: [
    { label: "Weekend Site Tours (Saturday / Sunday)", count: 21, percentage: 61.8 },
    { label: "Weekday Architect Walkthroughs", count: 13, percentage: 38.2 },
  ],
  projectDemandTitle: "Site Tour Demand by Township",
  projectDemandSubtitle: "Inspection slot bookings across Novesta communities",
  projectDemand: [
    { location: "Unicorn Aerocity On-Site Experience", count: 52, percentage: 100 },
    { location: "Eco Smart City Model Villa Tour", count: 38, percentage: 73.1 },
    { location: "Unicorn Riverside Resort Walkthrough", count: 26, percentage: 50.0 },
    { location: "The Art of the Bungalow Layout Walk", count: 18, percentage: 34.6 },
  ],
  calls: ALL_FLOW_2_CALLS,
};

// ---------------------------------------------------------------------------
// Combined lookup helper
// ---------------------------------------------------------------------------
export function getAnalyticsForFlow(flowId?: string | null): FlowAnalyticsDataset {
  if (!flowId) return FLOW_1_DATASET;
  const query = flowId.toLowerCase();
  if (query.includes("2") || query.includes("followup") || query.includes("site-visit")) {
    return FLOW_2_DATASET;
  }
  return FLOW_1_DATASET;
}

// Global combined fallback for legacy references
export const ALL_CALL_RECORDS: CallRecord[] = [...ALL_FLOW_1_CALLS, ...ALL_FLOW_2_CALLS];

export const DISPOSITION_CONFIGS: Record<string, DispositionConfig> = {
  ...FLOW_1_DISPOSITION_CONFIGS,
  ...FLOW_2_DISPOSITION_CONFIGS,
};

export const ORDERED_DISPOSITIONS: DispositionType[] = [
  ...FLOW_1_ORDERED_DISPOSITIONS,
  ...FLOW_2_ORDERED_DISPOSITIONS.filter((d) => !FLOW_1_ORDERED_DISPOSITIONS.includes(d)),
];

export const CALL_FUNNEL_DATA: FunnelMetric[] = FLOW_1_DATASET.funnelData;
export const PURPOSE_SPLIT_DATA = FLOW_1_DATASET.splitData;
export const PROJECT_DEMAND_DATA = FLOW_1_DATASET.projectDemand;
