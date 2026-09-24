export interface AppConfig {
  pageTitle: string;
  pageDescription: string;
  companyName: string;

  supportsChatInput: boolean;
  supportsVideoInput: boolean;
  supportsScreenShare: boolean;
  isPreConnectBufferEnabled: boolean;

  logo: string;
  startButtonText: string;
  accent?: string;
  logoDark?: string;
  accentDark?: string;

  // agent dispatch configuration
  agentName?: string;

  // LiveKit Cloud Sandbox configuration
  sandboxId?: string;
}

import { DEFAULT_BOT } from "@/constants/bots";

export const APP_CONFIG_DEFAULTS: AppConfig = {
  companyName: "Novesta Group",
  pageTitle: "Novesta Group | AI Voice Assistant - Residential Plots & Luxury Bungalows",
  pageDescription:
    "Explore premium residential plots, gated communities, and luxury bungalows in Kolkata with Novesta Group's intelligent AI voice assistant. Legal cleared plots, eco-living, and high ROI in Rajarhat & Madhyamgram. Powered by QuarkGen.",

  supportsChatInput: true,
  supportsVideoInput: true,
  supportsScreenShare: true,
  isPreConnectBufferEnabled: true,

  logo: "/novesta-bot/novesta/white-logo.png",
  accent: "#0e1230",
  logoDark: "/novesta-bot/novesta/white-logo.png",
  accentDark: "#c9a24c",
  startButtonText: "Start Voice Consultation",

  // agent dispatch configuration - defined purely as constant
  agentName: DEFAULT_BOT.agentName,

  // LiveKit Cloud Sandbox configuration
  sandboxId: undefined,
};
