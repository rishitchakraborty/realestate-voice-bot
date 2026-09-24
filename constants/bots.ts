/**
 * Bot Configuration Constants
 *
 * All voice agent configurations and visual customizations are driven purely from the BOTS array.
 * To customize bots, add/edit/remove items in the BOTS array below.
 */

export interface BotConfig {
  id: string;
  name: string;
  shortName: string;
  agentName: string;
  badge: string;
  subtitle: string;
  description: string;
  features: string[];
  tags: string[];
  accentColor: string; // Hex color for accents, borders, and visualizers
  accentGradient: string; // Tailwind gradient classes for icon backgrounds
  icon: "phone" | "calendar" | "bot" | "sparkles";
}

// ---------------------------------------------------------------------------
// Bot Agent Name Constants (Super easy to change here)
// ---------------------------------------------------------------------------
export const BOT_1_AGENT_NAME = "realestate-voice-agent-novesta";
export const BOT_2_AGENT_NAME = "realestate-followup-voice-agent-novesta";

export const BOTS: BotConfig[] = [
  {
    id: "call-flow-1",
    name: "Call Flow 1 — Introduction, Interest & WhatsApp Verification",
    shortName: "Intro & WhatsApp Verification",
    agentName: BOT_1_AGENT_NAME,
    badge: "Intro & WhatsApp",
    subtitle: "Lead Qualification & WhatsApp Verification",
    description:
      "Confirms your recent property enquiry, verifies your WhatsApp number, checks interest in Unicorn Aerocity plots vs residential flats, and sends official project details.",
    features: [
      "Verifies customer identity & confirms recent property enquiry",
      "Introduces Unicorn Aerocity project & location details",
      "Checks property preference (Plotted Development vs Flats)",
      "Sends legal layout map, approvals & brochure on WhatsApp",
    ],
    tags: [
      "Identity Check",
      "Unicorn Aerocity",
      "Plots vs Flats",
      "WhatsApp Brochure",
    ],
    accentColor: "#c9a24c",
    accentGradient: "from-[#c9a24c] to-[#996515]",
    icon: "phone",
  },
  {
    id: "call-flow-2",
    name: "Call Flow 2 — Site Visit Confirmation",
    shortName: "Site Visit Confirmation",
    agentName: BOT_2_AGENT_NAME,
    badge: "Site Visit Followup",
    subtitle: "Site Visit Scheduling",
    description:
      "Follows up on your enquiry, coordinates guided physical walkthroughs across Novesta townships, locks preferred date & time slots, and arranges complimentary VIP cab pick-up & drop.",
    features: [
      "Follows up on your property enquiry & brochure review",
      "Invites you to an exclusive guided on-site township walkthrough",
      "Locks preferred date & time slot for your family visit",
      "Confirms project details & site visit location",
    ],
    tags: ["Site Tour", "Slot Coordination", "Calendar Hold"],
    accentColor: "#0088cc",
    accentGradient: "from-[#0088cc] to-[#0369a1]",
    icon: "calendar",
  },
];

export const DEFAULT_BOT = BOTS[0];
export const DEFAULT_BOT_ID = BOTS[0].id;

export function getBotConfig(idOrAgentName?: string | null): BotConfig {
  if (!idOrAgentName) return DEFAULT_BOT;
  const query = idOrAgentName.toLowerCase().trim();
  const match = BOTS.find(
    (b) =>
      b.id.toLowerCase() === query ||
      b.agentName.toLowerCase() === query ||
      b.shortName.toLowerCase() === query ||
      b.name.toLowerCase() === query ||
      (query.includes("1") && b === BOTS[0]) ||
      (query.includes("2") && b === BOTS[1]),
  );
  return match || DEFAULT_BOT;
}
