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
                <div className="flex items-start gap-2.5 justify-end ml-auto max-w-[85%]">
                  <div className="rounded-2xl rounded-tr-xs bg-blue-600 px-4 py-2.5 text-white shadow-sm border border-blue-500/80">
                    <p className="text-xs md:text-sm font-medium leading-relaxed text-white">
                      {messageText}
                    </p>
                  </div>
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-600/15 text-blue-600 border border-blue-200 shadow-xs mt-0.5">
                    <User className="h-4 w-4" />
                  </div>
                </div>
              ) : (
                <div className="flex items-start gap-2.5 max-w-[85%]">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-200/80 text-slate-700 border border-slate-300/80 shadow-xs mt-0.5">
                    <Bot className="h-4 w-4" />
                  </div>
                  <div className="rounded-2xl rounded-tl-xs bg-slate-100 px-4 py-2.5 text-slate-900 shadow-xs border border-slate-200/90">
                    <p className="text-xs md:text-sm font-medium leading-relaxed text-slate-800">
                      {messageText}
                    </p>
                  </div>
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
