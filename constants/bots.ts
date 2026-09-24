/**
 * Bot Configuration Constants
 *
 * Both bots connect through the same LiveKit endpoint (/novesta-bot/api/connection-details).
 * Selecting a bot changes the agent name (agentName) dispatched for the call.
 */

export interface BotConfig {
  id: string;
  flowNumber: string;
  name: string;
  shortName: string;
  agentName: string;
  badge: string;
  subtitle: string;
  description: string;
  features: string[];
  tags: string[];
  accentColor: string;
}

// ---------------------------------------------------------------------------
// Bot Agent Name Constants (Moved away from env)
// ---------------------------------------------------------------------------
export const BOT_1_AGENT_NAME = "realestate-voice-agent-novesta";
export const BOT_2_AGENT_NAME = "realestate-followup-voice-agent-novesta";

export const BOTS: BotConfig[] = [
  {
    id: "call-flow-1",
    flowNumber: "1",
    name: "Call Flow — Introduction, Interest & WhatsApp Verification",
    shortName: "Intro & WhatsApp Verification",
    agentName: BOT_1_AGENT_NAME,
    badge: "Flow 1",
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
  },
  {
    id: "call-flow-2",
    flowNumber: "2",
    name: "Call Flow 2 — Site Visit Confirmation",
    shortName: "Site Visit Confirmation",
    agentName: BOT_2_AGENT_NAME,
    badge: "Flow 2",
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
  },
];

export const DEFAULT_BOT = BOTS[0];
export const DEFAULT_BOT_ID = BOTS[0].id;

export function getBotConfig(idOrAgentName?: string | null): BotConfig {
  if (!idOrAgentName) return DEFAULT_BOT;
  const match = BOTS.find(
    (b) =>
      b.id === idOrAgentName ||
      b.agentName === idOrAgentName ||
      b.flowNumber === idOrAgentName ||
      `flow-${b.flowNumber}` === idOrAgentName ||
      `flow${b.flowNumber}` === idOrAgentName
  );
  return match || DEFAULT_BOT;
}
