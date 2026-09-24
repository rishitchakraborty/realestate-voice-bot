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
    name: "Call Flow — Introduction, Interest & WhatsApp Verification",
    shortName: "Intro & WhatsApp Verification",
    agentName: BOT_1_AGENT_NAME,
    badge: "Intro & WhatsApp",
    subtitle: "Lead Qualification & WhatsApp Verification",
    description:
      "Engages prospect buyers with Novesta plots & bungalows, discovers buyer interests, answers project questions, and triggers verified WhatsApp brochures.",
    features: [
      "Project briefing & plot size discovery",
      "Legal clearance & RERA clarity",
      "Instant WhatsApp brochure delivery",
    ],
    tags: ["Lead Qualification", "WhatsApp Verified", "Brochure Dispatch"],
    accentColor: "#c9a24c",
    accentGradient: "from-[#c9a24c] to-[#996515]",
    icon: "phone",
  },
  {
    id: "call-flow-2",
    name: "Call Flow 2 — Site Visit Confirmation",
    shortName: "Site Visit Confirmation",
    agentName: BOT_2_AGENT_NAME,
    badge: "Site Visit",
    subtitle: "Site Visit Scheduling & VIP Cab Booking",
    description:
      "Follows up to schedule and confirm physical on-site tours across Novesta communities with complimentary VIP cab pick-up & drop.",
    features: [
      "Dedicated site visit date & time slot booking",
      "Complimentary VIP cab pick-up & drop coordination",
      "Instant SMS/WhatsApp calendar confirmation",
    ],
    tags: ["Site Visit", "VIP Cab Booking", "Slot Confirmation"],
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
      (query.includes("2") && b === BOTS[1])
  );
  return match || DEFAULT_BOT;
}
