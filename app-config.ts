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

export const APP_CONFIG_DEFAULTS: AppConfig = {
  companyName: 'Alcove Realty',
  pageTitle: 'Alcove Realty | AI Voice Assistant',
  pageDescription: 'Experience Alcove Realty’s intelligent AI voice assistant for premier luxury and residential projects in Kolkata. Powered by QuarkGen.',

  supportsChatInput: true,
  supportsVideoInput: true,
  supportsScreenShare: true,
  isPreConnectBufferEnabled: true,

  logo: '/alcove-reality-bot/alcove.webp',
  accent: '#0f2b48',
  logoDark: '/alcove-reality-bot/alcove.webp',
  accentDark: '#38bdf8',
  startButtonText: 'Start Voice Consultation',

  // agent dispatch configuration
  agentName: process.env.AGENT_NAME ?? undefined,

  // LiveKit Cloud Sandbox configuration
  sandboxId: undefined,
};
