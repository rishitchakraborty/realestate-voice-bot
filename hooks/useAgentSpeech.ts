'use client';

import { useSessionContext, useSessionMessages, useVoiceAssistant } from '@livekit/components-react';

export interface UseAgentSpeechOptions {
  fallbackText?: string;
}

export function useAgentSpeech(options?: UseAgentSpeechOptions) {
  const session = useSessionContext();
  const { messages } = useSessionMessages(session);
  const voiceAssistant = useVoiceAssistant();
  const agentState = voiceAssistant.state;

  const fallbackText =
    options?.fallbackText ?? 'Hello! I am your AI Agent. How can I help you today?';

  // Filter messages originating from the agent (not local user)
  const agentMessages = messages.filter((m) => !m.from?.isLocal);
  const latestAgentMessage = agentMessages.at(-1);

  // Extract text from session message or voice assistant live transcription
  const rawText =
    latestAgentMessage?.text ||
    (latestAgentMessage as any)?.message ||
    (voiceAssistant as any)?.agentTranscriptions?.at(-1)?.text;

  const latestAgentText =
    typeof rawText === 'string' && rawText.trim().length > 0 ? rawText : fallbackText;

  const isSpeaking = agentState === 'speaking';
  const isThinking = agentState === 'thinking';

  return {
    latestAgentText,
    latestAgentMessage,
    agentState,
    isSpeaking,
    isThinking,
    agentMessages,
  };
}
