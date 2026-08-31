export type DispositionType =
  | 'Site Visit Booked'
  | 'Not Interested'
  | 'Callback Requested'
  | 'Do Not Call'
  | 'Wrong Number'
  | 'No Response'
  | 'Dropped Mid-Call'
  | 'Not Reachable';

export interface CallRecord {
  id: string;
  customerName: string;
  phoneNumber: string;
  callType: 'Outbound' | 'Inbound';
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
  sentiment?: 'Positive' | 'Neutral' | 'Negative';
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

export const DISPOSITION_CONFIGS: Record<DispositionType, DispositionConfig> = {
  'Site Visit Booked': {
    label: 'Site Visit Booked',
    count: 8,
    percentage: 6.7,
    color: '#2563eb', // Blue
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-700',
    borderColor: 'border-blue-200',
  },
  'Not Interested': {
    label: 'Not Interested',
    count: 34,
    percentage: 28.3,
    color: '#f97316', // Orange
    bgColor: 'bg-orange-50',
    textColor: 'text-orange-700',
    borderColor: 'border-orange-200',
  },
  'Callback Requested': {
    label: 'Callback Requested',
    count: 14,
    percentage: 11.7,
    color: '#10b981', // Emerald green
    bgColor: 'bg-emerald-50',
    textColor: 'text-emerald-700',
    borderColor: 'border-emerald-200',
  },
  'Do Not Call': {
    label: 'Do Not Call',
    count: 9,
    percentage: 7.5,
    color: '#f59e0b', // Amber / Gold
    bgColor: 'bg-amber-50',
    textColor: 'text-amber-700',
    borderColor: 'border-amber-200',
  },
  'Wrong Number': {
    label: 'Wrong Number',
    count: 6,
    percentage: 5.0,
    color: '#ec4899', // Pink
    bgColor: 'bg-pink-50',
    textColor: 'text-pink-700',
    borderColor: 'border-pink-200',
  },
  'No Response': {
    label: 'No Response',
    count: 11,
    percentage: 9.2,
    color: '#0d9488', // Teal
    bgColor: 'bg-teal-50',
    textColor: 'text-teal-700',
    borderColor: 'border-teal-200',
  },
  'Dropped Mid-Call': {
    label: 'Dropped Mid-Call',
    count: 10,
    percentage: 8.3,
    color: '#6366f1', // Indigo / Purple
    bgColor: 'bg-indigo-50',
    textColor: 'text-indigo-700',
    borderColor: 'border-indigo-200',
  },
  'Not Reachable': {
    label: 'Not Reachable',
    count: 28,
    percentage: 23.3,
    color: '#ef4444', // Red
    bgColor: 'bg-red-50',
    textColor: 'text-red-700',
    borderColor: 'border-red-200',
  },
};

export const ORDERED_DISPOSITIONS: DispositionType[] = [
  'Site Visit Booked',
  'Not Interested',
  'Callback Requested',
  'Do Not Call',
  'Wrong Number',
  'No Response',
  'Dropped Mid-Call',
  'Not Reachable',
];

export interface FunnelMetric {
  stage: string;
  count: number;
  percentage: number;
}

export const CALL_FUNNEL_DATA: FunnelMetric[] = [
  { stage: 'Connected', count: 92, percentage: 100 },
  { stage: 'Purpose captured', count: 81, percentage: 88 },
  { stage: 'Qualified', count: 63, percentage: 68.5 },
  { stage: 'Visit offered', count: 22, percentage: 23.9 },
  { stage: 'Visit booked', count: 8, percentage: 8.7 },
];

export const PURPOSE_SPLIT_DATA = [
  { purpose: 'Investment', count: 54, percentage: 58.7 },
  { purpose: 'Staying', count: 38, percentage: 41.3 },
];

// Kolkata micro-markets for Alcove Realty projects
export const PROJECT_DEMAND_DATA = [
  { location: 'Serampore (Hooghly)', count: 92, percentage: 100 },
  { location: 'Topsia / EM Bypass', count: 74, percentage: 80.4 },
  { location: 'VIP Road / Lake Town', count: 58, percentage: 63.0 },
  { location: 'Batanagar / Maheshtala', count: 47, percentage: 51.1 },
  { location: 'Chowringhee / Central', count: 30, percentage: 32.6 },
  { location: 'New Town / Rajarhat', count: 24, percentage: 26.1 },
];

// Real Alcove Realty Projects extracted from https://www.alcoverealty.in/
export const WORKFLOW_OPTIONS = [
  { id: 'ALC-NKOL', name: 'New Kolkata — Serampore (ALC-NKOL)' },
  { id: 'ALC-FLORA', name: 'Flora Fountain — Topsia (ALC-FLORA)' },
  { id: 'ALC-THE42', name: 'The 42 — Chowringhee (ALC-THE42)' },
  { id: 'ALC-GLORIA', name: 'Alcove Gloria — VIP Road (ALC-GLORIA)' },
  { id: 'ALC-CURVE', name: 'The Curve — Batanagar (ALC-CURVE)' },
  { id: 'ALC-REGENCY', name: 'Alcove Regency — EM Bypass (ALC-REGENCY)' },
];

// 120 mock calls matching the exact statistics and sample rows from the images, customized for Alcove Realty
const FIRST_10_CALLS: CallRecord[] = [
  {
    id: 'call-1',
    customerName: 'Rohan Sharma',
    phoneNumber: '+919845112203',
    callType: 'Outbound',
    sessionId: '3f2a91c4-88b1-4d0e-9a2f-7c1b3e8d9101',
    duration: '06:41',
    recordingAvailable: false,
    language: 'English',
    purpose: 'Investment',
    preferredLocation: 'Serampore',
    configuration: '2 BHK',
    budgetRange: '₹45L–₹60L',
    disposition: 'Site Visit Booked',
    timestamp: '2026-08-14T10:14:22Z',
    leadScore: 92,
    sentiment: 'Positive',
  },
  {
    id: 'call-2',
    customerName: 'Priya Nair',
    phoneNumber: '+9198867745210',
    callType: 'Outbound',
    sessionId: '9b7c40e1-2f6a-4c3d-88e5-21d9f8c0e234',
    duration: '02:05',
    recordingAvailable: false,
    language: 'Hindi',
    purpose: 'Staying',
    preferredLocation: 'Topsia / EM Bypass',
    configuration: '3 BHK',
    budgetRange: '₹1.2Cr–₹1.5Cr',
    disposition: 'Not Interested',
    timestamp: '2026-08-14T09:42:15Z',
    leadScore: 35,
    sentiment: 'Neutral',
  },
  {
    id: 'call-3',
    customerName: 'Ramesh Kumar',
    phoneNumber: '+919900456782',
    callType: 'Outbound',
    sessionId: '5e18d2a9-71c4-4bb0-a5f1-83d47c2e9a56',
    duration: '00:00',
    recordingAvailable: false,
    language: '—',
    purpose: '—',
    preferredLocation: '—',
    configuration: '—',
    budgetRange: '—',
    disposition: 'Not Reachable',
    timestamp: '2026-08-14T09:12:00Z',
    sentiment: 'Neutral',
  },
  {
    id: 'call-4',
    customerName: 'Vikram Patel',
    phoneNumber: '+9197760112893',
    callType: 'Outbound',
    sessionId: 'c14a68f0-3d92-4e77-9b1e-45a7d9f2c871',
    duration: '08:52',
    recordingAvailable: false,
    language: 'Hindi',
    purpose: 'Investment',
    preferredLocation: 'VIP Road / Lake Town',
    configuration: '3 BHK',
    budgetRange: '₹1.1Cr–₹1.4Cr',
    disposition: 'Callback Requested',
    timestamp: '2026-08-14T08:55:40Z',
    leadScore: 78,
    sentiment: 'Positive',
  },
  {
    id: 'call-5',
    customerName: 'Ananya Rao',
    phoneNumber: '+919632087741',
    callType: 'Outbound',
    sessionId: '71bf9a3c-6e2d-40a5-8c9f-3e8a2b5c7d89',
    duration: '01:12',
    recordingAvailable: false,
    language: 'English',
    purpose: '—',
    preferredLocation: 'Serampore',
    configuration: '—',
    budgetRange: '—',
    disposition: 'Do Not Call',
    timestamp: '2026-08-13T17:20:11Z',
    leadScore: 10,
    sentiment: 'Negative',
  },
  {
    id: 'call-6',
    customerName: 'Aditya Sen',
    phoneNumber: '+918123467790',
    callType: 'Outbound',
    sessionId: '2d0f8e17-95a4-4c31-b7e6-12c8e5d3a749',
    duration: '00:52',
    recordingAvailable: false,
    language: 'English',
    purpose: 'Staying',
    preferredLocation: 'Chowringhee',
    configuration: '4 BHK',
    budgetRange: '₹18Cr–₹22Cr',
    disposition: 'Dropped Mid-Call',
    timestamp: '2026-08-13T16:45:00Z',
    leadScore: 40,
    sentiment: 'Neutral',
  },
  {
    id: 'call-7',
    customerName: 'Unknown Caller',
    phoneNumber: '+919980221156',
    callType: 'Outbound',
    sessionId: 'a839c6f2-1b7d-4e90-8f3a-92d4b7c1e563',
    duration: '00:00',
    recordingAvailable: false,
    language: '—',
    purpose: '—',
    preferredLocation: '—',
    configuration: '—',
    budgetRange: '—',
    disposition: 'Wrong Number',
    timestamp: '2026-08-13T15:30:18Z',
    sentiment: 'Neutral',
  },
  {
    id: 'call-8',
    customerName: 'Meghna Reddy',
    phoneNumber: '+917892345671',
    callType: 'Outbound',
    sessionId: '6f1a30e8-4c9b-471d-9a0e-54d2f8b7c912',
    duration: '03:34',
    recordingAvailable: false,
    language: 'English',
    purpose: 'Investment',
    preferredLocation: 'Batanagar',
    configuration: '2 BHK',
    budgetRange: '₹60L–₹75L',
    disposition: 'No Response',
    timestamp: '2026-08-13T14:15:29Z',
    leadScore: 30,
    sentiment: 'Neutral',
  },
  {
    id: 'call-9',
    customerName: 'Amit Verma',
    phoneNumber: '+919845667812',
    callType: 'Outbound',
    sessionId: 'b2e94d71-8a3c-40f5-91e8-73c1d5e9a246',
    duration: '09:18',
    recordingAvailable: false,
    language: 'Hindi',
    purpose: 'Staying',
    preferredLocation: 'Serampore',
    configuration: '3 BHK',
    budgetRange: '₹55L–₹70L',
    disposition: 'Site Visit Booked',
    timestamp: '2026-08-13T12:50:04Z',
    leadScore: 95,
    sentiment: 'Positive',
  },
  {
    id: 'call-10',
    customerName: 'Suresh Iyer',
    phoneNumber: '+918765443210',
    callType: 'Outbound',
    sessionId: '4c7a12e9-5f8b-403d-8a6e-19c4d8b2e571',
    duration: '05:27',
    recordingAvailable: false,
    language: 'English',
    purpose: 'Investment',
    preferredLocation: 'Topsia / EM Bypass',
    configuration: '2 BHK',
    budgetRange: '₹85L–₹1.1Cr',
    disposition: 'Not Interested',
    timestamp: '2026-08-13T11:22:33Z',
    leadScore: 45,
    sentiment: 'Neutral',
  },
];

const INDIAN_NAMES = [
  'Kavita Joshi', 'Rahul Deshmukh', 'Sneha Banerjee', 'Rajesh Kulkarni', 'Pooja Agarwal',
  'Manish Tiwari', 'Deepa Swaminathan', 'Sanjay Bhatt', 'Sunita Roy', 'Harish Menon',
  'Geeta Mukherjee', 'Naveen Choudhury', 'Divya Pillai', 'Arjun Kapoor', 'Swati Saxena',
  'Karthik Narayanan', 'Preeti Ghosh', 'Alok Gupta', 'Shalini Jain', 'Vikas Mehra',
  'Anand Natarajan', 'Shikha Singhania', 'Gautam Bose', 'Neha Tripathi', 'Santosh Pandey',
  'Archana Das', 'Pradeep Sethi', 'Madhavi Rao', 'Tarun Varma', 'Tanvi Mathur',
  'Ashok Hegde', 'Meera Subramaniam', 'Rajat Malhotra', 'Shweta Sen', 'Girish Pai',
  'Nandini Iyengar', 'Abhishek Chatterjee', 'Ritu Bhatia', 'Vivek Srinivas', 'Rashmi Paul',
  'Prakash Somani', 'Aparna Nambiar', 'Rohit Chawla', 'Bhavna Chauhan', 'Devendra Rawat',
  'Smita Kedia', 'Vijay Raghavan', 'Leela Nair', 'Hemant Joshi', 'Pallavi Mishra',
  'Siddharth Roy', 'Monika Aggarwal', 'Sunil Mittal', 'Jyoti Bansal', 'Ramanujam Parthasarathy',
  'Anita Sanyal', 'Chetan Shah', 'Rupali Deshpande', 'Vinod Goel', 'Parul Rastogi'
];

function generateMockCalls(): CallRecord[] {
  const calls: CallRecord[] = [...FIRST_10_CALLS];

  const neededDispositions: { type: DispositionType; count: number }[] = [
    { type: 'Site Visit Booked', count: 6 },
    { type: 'Not Interested', count: 32 },
    { type: 'Callback Requested', count: 13 },
    { type: 'Do Not Call', count: 8 },
    { type: 'Wrong Number', count: 5 },
    { type: 'No Response', count: 10 },
    { type: 'Dropped Mid-Call', count: 9 },
    { type: 'Not Reachable', count: 27 },
  ];

  let idCounter = 11;
  const locations = [
    'Serampore',
    'Topsia / EM Bypass',
    'VIP Road / Lake Town',
    'Batanagar / Maheshtala',
    'Chowringhee',
    'New Town / Rajarhat',
  ];
  const bhks = ['1 BHK', '2 BHK', '3 BHK', '4 BHK'];
  const budgets = [
    '₹35L–₹50L',
    '₹55L–₹75L',
    '₹85L–₹1.1Cr',
    '₹1.2Cr–₹1.6Cr',
    '₹1.8Cr–₹2.5Cr',
  ];
  const languages = ['English', 'Hindi', 'Bengali'];
  const purposes = ['Investment', 'Staying'];

  for (const item of neededDispositions) {
    for (let i = 0; i < item.count; i++) {
      const isUnreachable = item.type === 'Not Reachable';
      const isWrongNum = item.type === 'Wrong Number';
      const isNoResponse = item.type === 'No Response';
      const isDNC = item.type === 'Do Not Call';

      const name = isWrongNum ? 'Unknown Caller' : INDIAN_NAMES[(idCounter * 7) % INDIAN_NAMES.length];
      const phone = `+91${9000000000 + ((idCounter * 13579) % 999999999)}`;
      const pseudoUuid = `${(idCounter * 16777619).toString(16).padStart(8, '0')}-${((idCounter * 4096) % 65535).toString(16).padStart(4, '0')}-4${idCounter.toString(16).padStart(3, '0')}-8b2f-${(idCounter * 9876543).toString(16).slice(0, 12).padEnd(12, 'a')}`;

      let duration = '00:00';
      if (!isUnreachable && !isWrongNum) {
        const mins = (idCounter % 9) + 1;
        const secs = (idCounter * 13) % 60;
        duration = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
      }

      const lang = isUnreachable || isWrongNum ? '—' : languages[idCounter % languages.length];
      const purpose = isUnreachable || isWrongNum || isDNC ? '—' : purposes[idCounter % purposes.length];
      const location = isUnreachable || isWrongNum ? '—' : locations[idCounter % locations.length];
      const bhk = isUnreachable || isWrongNum || isDNC || isNoResponse ? '—' : bhks[idCounter % bhks.length];
      const budget = isUnreachable || isWrongNum || isDNC || isNoResponse ? '—' : budgets[idCounter % budgets.length];

      calls.push({
        id: `call-${idCounter}`,
        customerName: name,
        phoneNumber: phone,
        callType: 'Outbound',
        sessionId: pseudoUuid,
        duration: duration,
        recordingAvailable: false,
        language: lang,
        purpose: purpose,
        preferredLocation: location,
        configuration: bhk,
        budgetRange: budget,
        disposition: item.type,
        timestamp: `2026-08-${(14 - (idCounter % 13)).toString().padStart(2, '0')}T10:${(idCounter % 50).toString().padStart(2, '0')}:00Z`,
        leadScore: isUnreachable || isWrongNum ? undefined : item.type === 'Site Visit Booked' ? 88 + (idCounter % 10) : 30 + (idCounter % 40),
        sentiment: item.type === 'Site Visit Booked' || item.type === 'Callback Requested' ? 'Positive' : item.type === 'Do Not Call' ? 'Negative' : 'Neutral',
      });

      idCounter++;
    }
  }

  return calls;
}

export const ALL_CALL_RECORDS: CallRecord[] = generateMockCalls();
