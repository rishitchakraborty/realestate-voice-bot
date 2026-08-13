'use client';

import { useSessionContext, useSessionMessages } from '@livekit/components-react';

export interface UseCustomerSpeechOptions {
  fallbackText?: string;
}

export function useCustomerSpeech(options?: UseCustomerSpeechOptions) {
  const session = useSessionContext();
  const { messages } = useSessionMessages(session);

  const fallbackText = options?.fallbackText ?? 'Listening...';

  // Filter messages originating from local user (customer)
  const customerMessages = messages.filter((m) => m.from?.isLocal);
  const latestCustomerMessage = customerMessages.at(-1);

  const rawText =
    latestCustomerMessage?.text || (latestCustomerMessage as any)?.message;

  const latestCustomerText =
    typeof rawText === 'string' && rawText.trim().length > 0 ? rawText : fallbackText;

  return {
    latestCustomerText,
    latestCustomerMessage,
    customerMessages,
  };
}
