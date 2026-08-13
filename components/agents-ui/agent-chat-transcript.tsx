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
                <div className="flex flex-col items-end max-w-[85%] ml-auto">
                  <span className="text-[11px] font-medium text-slate-500 mb-1 mr-1">
                    Customer
                  </span>
                  <div className="flex items-start gap-2.5">
                    <div className="rounded-2xl rounded-tr-xs bg-[#cbd5e1]/90 px-4 py-2 text-slate-900 shadow-2xs border border-slate-300/60">
                      <p className="text-xs md:text-sm font-medium leading-relaxed text-slate-900">
                        {messageText}
                      </p>
                    </div>
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-200 text-slate-700 border border-slate-300 shadow-2xs mt-0.5">
                      <User className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-start max-w-[85%]">
                  <span className="text-[11px] font-medium text-slate-500 mb-1 ml-1">
                    Agent
                  </span>
                  <div className="flex items-start gap-2.5">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-200 text-slate-700 border border-slate-300 shadow-2xs mt-0.5">
                      {/* <div className="h-6 w-6"> */}
                      <img
                        src="/realestate-bot/agent.png"
                        alt="agent"
                        className="h-36 w-36 text-slate-700 drop-shadow-xs"
                      />
                      {/* </div> */}
                    </div>
                    <div className="rounded-2xl rounded-tl-xs bg-white px-4 py-3 text-slate-800 shadow-2xs border border-slate-200/80">
                      <p className="text-xs md:text-sm leading-relaxed text-slate-800">
                        {messageText}
                      </p>
                    </div>
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
