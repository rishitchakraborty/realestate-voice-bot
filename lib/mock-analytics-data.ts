export interface DispositionConfig {
  key: string;
  label: string;
  count: number;
  percentage: string;
  color: string; // Hex for chart
  dotColor: string;
  bgLight: string;
  textLight: string;
  borderLight: string;
}

export interface CallLogItem {
  id: string;
  customerName: string;
  phoneNumber: string;
  callType: 'Outbound' | 'Inbound';
  sessionId: string;
  duration: string;
  hasRecording: boolean;
  language: string;
  purpose: string;
  preferredLocation: string;
  configuration: string;
  budgetRange: string;
  dispositionKey: string;
}

export interface FunnelStage {
  label: string;
  count: number;
  percentage: number;
}

export interface PurposeSplit {
  label: string;
  count: number;
  percentage: number;
}

export interface ProjectDemand {
  label: string;
  count: number;
  percentage: number;
}

export const DISPOSITIONS: Record<string, DispositionConfig> = {
  'site-visit-booked': {
    key: 'site-visit-booked',
    label: 'Site Visit Booked',
    count: 8,
    percentage: '6.7%',
    color: '#2563EB', // Blue
    dotColor: 'bg-blue-600',
    bgLight: 'bg-blue-50 dark:bg-blue-950/40',
    textLight: 'text-blue-700 dark:text-blue-300',
    borderLight: 'border-blue-200 dark:border-blue-800/60',
  },
  'not-interested': {
    key: 'not-interested',
    label: 'Not Interested',
    count: 34,
    percentage: '28.3%',
    color: '#EA580C', // Coral / Orange
    dotColor: 'bg-orange-500',
    bgLight: 'bg-orange-50 dark:bg-orange-950/40',
    textLight: 'text-orange-700 dark:text-orange-300',
    borderLight: 'border-orange-200 dark:border-orange-800/60',
  },
  'callback-requested': {
    key: 'callback-requested',
    label: 'Callback Requested',
    count: 14,
    percentage: '11.7%',
    color: '#10B981', // Green / Emerald
    dotColor: 'bg-emerald-500',
    bgLight: 'bg-emerald-50 dark:bg-emerald-950/40',
    textLight: 'text-emerald-700 dark:text-emerald-300',
    borderLight: 'border-emerald-200 dark:border-emerald-800/60',
  },
  'do-not-call': {
    key: 'do-not-call',
    label: 'Do Not Call',
    count: 9,
    percentage: '7.5%',
    color: '#F59E0B', // Amber
    dotColor: 'bg-amber-500',
    bgLight: 'bg-amber-50 dark:bg-amber-950/40',
    textLight: 'text-amber-700 dark:text-amber-300',
    borderLight: 'border-amber-200 dark:border-amber-800/60',
  },
  'wrong-number': {
    key: 'wrong-number',
    label: 'Wrong Number',
    count: 6,
    percentage: '5.0%',
    color: '#EC4899', // Pink / Magenta
    dotColor: 'bg-pink-500',
    bgLight: 'bg-pink-50 dark:bg-pink-950/40',
    textLight: 'text-pink-700 dark:text-pink-300',
    borderLight: 'border-pink-200 dark:border-pink-800/60',
  },
  'no-response': {
    key: 'no-response',
    label: 'No Response',
    count: 11,
    percentage: '9.2%',
    color: '#059669', // Teal / Dark Green
    dotColor: 'bg-teal-600',
    bgLight: 'bg-teal-50 dark:bg-teal-950/40',
    textLight: 'text-teal-700 dark:text-teal-300',
    borderLight: 'border-teal-200 dark:border-teal-800/60',
  },
  'dropped-mid-call': {
    key: 'dropped-mid-call',
    label: 'Dropped Mid-Call',
    count: 10,
    percentage: '8.3%',
    color: '#6366F1', // Indigo / Purple
    dotColor: 'bg-indigo-500',
    bgLight: 'bg-indigo-50 dark:bg-indigo-950/40',
    textLight: 'text-indigo-700 dark:text-indigo-300',
    borderLight: 'border-indigo-200 dark:border-indigo-800/60',
  },
  'not-reachable': {
    key: 'not-reachable',
    label: 'Not Reachable',
    count: 28,
    percentage: '23.3%',
    color: '#EF4444', // Red / Crimson
    dotColor: 'bg-red-500',
    bgLight: 'bg-red-50 dark:bg-red-950/40',
    textLight: 'text-red-700 dark:text-red-300',
    borderLight: 'border-red-200 dark:border-red-800/60',
  },
};

export const DISPOSITIONS_LIST = Object.values(DISPOSITIONS);

export const ANALYTICS_SUMMARY = {
  projectName: 'Godrej Verdant — Whitefield (GDJ-VERDANT)',
  workflowCode: 'GDJ-VERDANT',
  dateRangeLabel: 'AUG 1 – AUG 14, 2026',
  totalCalls: 120,
  totalConnectedCalls: 92,
  siteVisitsBooked: 8,
  notInterestedDnc: 43,
  notReachable: 28,
  droppedMidCall: 10,
  noResponseSilence: 11,
};

export const MOCK_CALL_LOGS: CallLogItem[] = [
  {
    id: 'call-1',
    customerName: 'Rohan Sharma',
    phoneNumber: '+919845112203',
    callType: 'Outbound',
    sessionId: '3f2a91c4-88b1-4d0e-9a2e-847291a82f3c',
    duration: '06:41',
    hasRecording: true,
    language: 'English',
    purpose: 'Investment',
    preferredLocation: 'Whitefield',
    configuration: '2 BHK',
    budgetRange: '₹1.1Cr–₹1.3Cr',
    dispositionKey: 'site-visit-booked',
  },
  {
    id: 'call-2',
    customerName: 'Priya Nair',
    phoneNumber: '+9198867745210',
    callType: 'Outbound',
    sessionId: '9b7c40e1-2f6a-4c3d-88e4-71289410ef4b',
    duration: '02:05',
    hasRecording: true,
    language: 'Hindi',
    purpose: 'Staying',
    preferredLocation: 'Whitefield',
    configuration: '3 BHK',
    budgetRange: '₹1.4Cr–₹1.6Cr',
    dispositionKey: 'not-interested',
  },
  {
    id: 'call-3',
    customerName: 'Ramesh Kumar',
    phoneNumber: '+919900456782',
    callType: 'Outbound',
    sessionId: '5e18d2a9-71c4-4bb0-a5f1-3329108e49bc',
    duration: '00:00',
    hasRecording: false,
    language: '—',
    purpose: '—',
    preferredLocation: '—',
    configuration: '—',
    budgetRange: '—',
    dispositionKey: 'not-reachable',
  },
  {
    id: 'call-4',
    customerName: 'Vikram Patel',
    phoneNumber: '+9197760112893',
    callType: 'Outbound',
    sessionId: 'c14a68f0-3d92-4e77-9b19-58a439c29801',
    duration: '08:52',
    hasRecording: true,
    language: 'Hindi',
    purpose: 'Investment',
    preferredLocation: 'Whitefield',
    configuration: '3 BHK',
    budgetRange: '₹1.5Cr–₹1.8Cr',
    dispositionKey: 'callback-requested',
  },
  {
    id: 'call-5',
    customerName: 'Ananya Rao',
    phoneNumber: '+919632087741',
    callType: 'Outbound',
    sessionId: '71bf9a3c-6e2d-40a5-8c95-47291a82f3c0',
    duration: '01:12',
    hasRecording: true,
    language: 'English',
    purpose: '—',
    preferredLocation: 'Whitefield',
    configuration: '—',
    budgetRange: '—',
    dispositionKey: 'do-not-call',
  },
  {
    id: 'call-6',
    customerName: 'Aditya Sen',
    phoneNumber: '+918123467790',
    callType: 'Outbound',
    sessionId: '2d0f8e17-95a4-4c31-b7e1-89301984ef2a',
    duration: '00:52',
    hasRecording: true,
    language: 'English',
    purpose: 'Staying',
    preferredLocation: 'Whitefield',
    configuration: '4 BHK',
    budgetRange: '₹1.9Cr–₹2.1Cr',
    dispositionKey: 'dropped-mid-call',
  },
  {
    id: 'call-7',
    customerName: 'Unknown Caller',
    phoneNumber: '+919980221156',
    callType: 'Outbound',
    sessionId: 'a839c6f2-1b7d-4e90-8f3a-921873910ab3',
    duration: '00:00',
    hasRecording: false,
    language: '—',
    purpose: '—',
    preferredLocation: '—',
    configuration: '—',
    budgetRange: '—',
    dispositionKey: 'wrong-number',
  },
  {
    id: 'call-8',
    customerName: 'Meghna Reddy',
    phoneNumber: '+917892345671',
    callType: 'Outbound',
    sessionId: '6f1a30e8-4c9b-471d-9a02-581938b472e1',
    duration: '03:34',
    hasRecording: true,
    language: 'English',
    purpose: 'Investment',
    preferredLocation: 'Whitefield',
    configuration: '2 BHK',
    budgetRange: '₹80L–₹95L',
    dispositionKey: 'no-response',
  },
  {
    id: 'call-9',
    customerName: 'Amit Verma',
    phoneNumber: '+919845667812',
    callType: 'Outbound',
    sessionId: 'b2e94d71-8a3c-40f5-91e8-38291048bf6a',
    duration: '09:18',
    hasRecording: true,
    language: 'Hindi',
    purpose: 'Staying',
    preferredLocation: 'Whitefield',
    configuration: '3 BHK',
    budgetRange: '₹1.3Cr–₹1.5Cr',
    dispositionKey: 'site-visit-booked',
  },
  {
    id: 'call-10',
    customerName: 'Suresh Iyer',
    phoneNumber: '+918765443210',
    callType: 'Outbound',
    sessionId: '4c7a12e9-5f8b-403d-8a62-91823746a5b9',
    duration: '05:27',
    hasRecording: true,
    language: 'English',
    purpose: 'Investment',
    preferredLocation: 'Whitefield',
    configuration: '2 BHK',
    budgetRange: '₹95L–₹1.1Cr',
    dispositionKey: 'not-interested',
  },
  {
    id: 'call-11',
    customerName: 'Nidhi Kulkarni',
    phoneNumber: '+919742018834',
    callType: 'Outbound',
    sessionId: '8d3f61a0-9c2e-41b7-8f43-84729104fa28',
    duration: '00:00',
    hasRecording: false,
    language: '—',
    purpose: '—',
    preferredLocation: '—',
    configuration: '—',
    budgetRange: '—',
    dispositionKey: 'not-reachable',
  },
  {
    id: 'call-12',
    customerName: 'Kavita Joshi',
    phoneNumber: '+917022198456',
    callType: 'Outbound',
    sessionId: '1a5e73c9-6d4f-482a-90ba-58291039ef7c',
    duration: '04:09',
    hasRecording: true,
    language: 'English',
    purpose: 'Staying',
    preferredLocation: 'Whitefield',
    configuration: '3 BHK',
    budgetRange: '₹1.2Cr–₹1.4Cr',
    dispositionKey: 'callback-requested',
  },
];

export const FUNNEL_DATA: FunnelStage[] = [
  { label: 'Connected', count: 92, percentage: 100 },
  { label: 'Purpose captured', count: 81, percentage: 88 },
  { label: 'Qualified', count: 63, percentage: 68 },
  { label: 'Visit offered', count: 22, percentage: 24 },
  { label: 'Visit booked', count: 8, percentage: 9 },
];

export const PURPOSE_SPLIT_DATA: PurposeSplit[] = [
  { label: 'Investment', count: 54, percentage: 58.7 },
  { label: 'Staying', count: 38, percentage: 41.3 },
];

export const PROJECT_DEMAND_DATA: ProjectDemand[] = [
  { label: 'Whitefield', count: 92, percentage: 100 },
  { label: 'Sarjapur Rd', count: 74, percentage: 80.4 },
  { label: 'Hebbal', count: 58, percentage: 63.0 },
  { label: 'Electronic City', count: 47, percentage: 51.1 },
  { label: 'Devanahalli', count: 30, percentage: 32.6 },
  { label: 'Kanakapura Rd', count: 24, percentage: 26.1 },
];

export const WORKFLOWS = [
  { id: 'GDJ-VERDANT', name: 'Godrej Verdant — Whitefield (GDJ-VERDANT)' },
  { id: 'GDJ-SPLENDOUR', name: 'Godrej Splendour — Whitefield (GDJ-SPLENDOUR)' },
  { id: 'GDJ-WOODSCAPES', name: 'Godrej Woodscapes — Budigere (GDJ-WOODSCAPES)' },
  { id: 'GDJ-PARKRETREAT', name: 'Godrej Park Retreat — Sarjapur (GDJ-PARKRETREAT)' },
];

export const BUILD_NOTES = [
  'All phone numbers, names, session IDs and figures on this page are fabricated for layout purposes only.',
  "The Call Recording play button is shown disabled everywhere — capture isn't wired up yet (brief §08). Ship the column now; it lights up once egress recording lands.",
  'Disposition colors, order, and the donut ring are one fixed palette used consistently across the ring, legend, stat cards and table chip — never remap a color to a different meaning elsewhere on the page.',
  'Rows with Not Reachable or Wrong Number never had a real conversation, so Purpose, Configuration, Budget, Lead Score and Sentiment are correctly blank, not zero.',
  'Full field dictionary, disposition definitions and the post-call LLM schema are in the companion Meera Call Analytics brief.',
];
