"use client";

import { AnimatePresence } from "motion/react";
import {
  type AgentState,
  type ReceivedMessage,
} from "@livekit/components-react";
import { Bot, User } from "lucide-react";
import { AgentChatIndicator } from "@/components/agents-ui/agent-chat-indicator";
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import {
  Message,
  MessageContent,
  MessageResponse,
} from "@/components/ai-elements/message";

/**
 * Props for the AgentChatTranscript component.
 */
export interface AgentChatTranscriptProps {
  /**
   * The current state of the agent. When 'thinking', displays a loading indicator.
   */
  agentState?: AgentState;
  /**
   * Array of messages to display in the transcript.
   * @defaultValue []
   */
  messages?: ReceivedMessage[];
  /**
   * Additional CSS class names to apply to the conversation container.
   */
  className?: string;
}

/**
 * A chat transcript component that displays a conversation between the user and agent.
 * Shows messages with timestamps and origin indicators, plus a thinking indicator
 * when the agent is processing.
 *
 * @extends ComponentProps<'div'>
 *
 * @example
 * ```tsx
 * <AgentChatTranscript
 *   agentState={agentState}
 *   messages={chatMessages}
 * />
 * ```
 */
export function AgentChatTranscript({
  agentState,
  messages = [],
  className,
  ...props
}: AgentChatTranscriptProps) {
  return (
    <Conversation className={className} {...props}>
      <ConversationContent>
        {messages.map((receivedMessage) => {
          const { id, timestamp, from } = receivedMessage;
          const messageText =
            receivedMessage.text || (receivedMessage as any).message || "";
          const locale = navigator?.language ?? "en-US";
          const isUser = from?.isLocal;
          const messageOrigin = isUser ? "user" : "assistant";
          const time = new Date(timestamp);
          const title = time.toLocaleTimeString(locale, { timeStyle: "full" });

          return (
            <Message key={id} title={title} from={messageOrigin}>
              {isUser ? (
                <div className="flex items-start gap-2.5 justify-end ml-auto">
                  <MessageContent>
                    <MessageResponse>{messageText}</MessageResponse>
                  </MessageContent>
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-600/15 text-blue-600 border border-blue-600/20 shadow-xs mt-0.5">
                    <User className="h-3.5 w-3.5" />
                  </div>
                </div>
              ) : (
                <div className="flex items-start gap-2.5">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary border border-primary/20 shadow-xs mt-0.5">
                    <Bot className="h-3.5 w-3.5" />
                  </div>
                  <MessageContent>
                    <MessageResponse>{messageText}</MessageResponse>
                  </MessageContent>
                </div>
              )}
            </Message>
          );
        })}
        <AnimatePresence>
          {agentState === "thinking" && <AgentChatIndicator size="sm" />}
        </AnimatePresence>
      </ConversationContent>
      <ConversationScrollButton />
    </Conversation>
  );
}
