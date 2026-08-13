"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  useLocalParticipant,
  useSessionContext,
  useSessionMessages,
  useVoiceAssistant,
} from "@livekit/components-react";
import { Mic, MicOff, PhoneOff, User, Bot, Volume2 } from "lucide-react";
import type { AppConfig } from "@/app-config";
import { AgentChatTranscript } from "@/components/agents-ui/agent-chat-transcript";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/shadcn/utils";

interface SessionViewProps {
  appConfig: AppConfig;
}

export const SessionView = ({
  appConfig,
  ...props
}: React.ComponentProps<"section"> & SessionViewProps) => {
  const session = useSessionContext();
  const { messages } = useSessionMessages(session);
  const { state: agentState } = useVoiceAssistant();
  const { isMicrophoneEnabled, localParticipant } = useLocalParticipant();

  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto scroll transcript to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Separate agent and customer messages
  const agentMessages = messages.filter((m) => !m.from?.isLocal);
  const customerMessages = messages.filter((m) => m.from?.isLocal);

  const latestAgentText =
    agentMessages.at(-1)?.text ||
    "Hello! I am your AI Agent. How can I help you today?";
  const latestCustomerText = customerMessages.at(-1)?.text || "Listening...";

  const toggleMic = async () => {
    try {
      await localParticipant.setMicrophoneEnabled(!isMicrophoneEnabled);
    } catch (e) {
      console.error("Failed to toggle mic:", e);
    }
  };

  return (
    <section
      className="bg-background relative z-10 flex h-full w-full items-center justify-center p-3 md:p-6 overflow-hidden"
      {...props}
    >
      {/* Outer Dashboard Card */}
      <div className="flex h-full w-full max-w-7xl flex-col gap-4 rounded-3xl border border-border/60 bg-muted/30 p-4 md:flex-row md:gap-6 md:p-6 shadow-sm overflow-hidden">
        {/* LEFT COLUMN: AGENT SIDE */}
        <div className="flex flex-1 flex-col items-center justify-between rounded-2xl border border-border/40 bg-card/80 p-5 shadow-xs md:w-1/4">
          <div className="flex w-full flex-col items-center">
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Agent
            </h3>

            {/* Agent Avatar Placeholder */}
            <div className="relative flex h-32 w-32 items-center justify-center rounded-full border-2 border-primary/40 bg-gradient-to-b from-primary/10 to-primary/5 p-1 shadow-inner">
              <div className="relative flex h-full w-full items-center justify-center rounded-full bg-primary/15 text-primary">
                {/* User can replace this SVG/image placeholder with their custom image */}
                <Bot className="h-14 w-14" />
              </div>

              {/* Speaking Indicator pulse */}
              {agentState === "speaking" && (
                <span className="absolute inset-0 rounded-full border-2 border-primary animate-ping opacity-75" />
              )}
            </div>

            {/* Latest Agent Spoken Text Bubble */}
            <div className="mt-6 flex w-full min-h-[110px] items-center justify-center rounded-xl border border-border/60 bg-background/90 p-4 text-center text-xs md:text-sm font-medium text-foreground shadow-xs">
              <p className="line-clamp-4">{latestAgentText}</p>
            </div>
          </div>

          {/* AGENT SIDE CONTROLS: MUTE & END CALL */}
        </div>

        {/* MIDDLE COLUMN: TRANSCRIPTION STREAM */}
        <div className="flex flex-2 flex-col rounded-2xl border border-border/40 bg-card/80 p-5 shadow-xs h-full overflow-hidden">
          <div className="flex items-center justify-between pb-3 border-b border-border/40">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Transcription
            </h3>
            {agentState && (
              <span className="flex items-center gap-1.5 text-[11px] font-medium text-primary bg-primary/10 px-2.5 py-0.5 rounded-full">
                <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                {agentState}
              </span>
            )}
          </div>

          {/* Transcript Scroll Area using AgentChatTranscript */}
          <div className="flex-1 overflow-y-auto py-2 px-1 relative">
            {messages.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center text-center text-muted-foreground text-xs p-6">
                <Volume2 className="h-8 w-8 mb-2 opacity-40 animate-pulse" />
                <p>Call connected. Agent is listening...</p>
              </div>
            ) : (
              <AgentChatTranscript
                agentState={agentState}
                messages={messages}
                className="h-full w-full"
              />
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: CUSTOMER SIDE */}
        <div className="flex flex-1 flex-col items-center justify-between rounded-2xl border border-border/40 bg-card/80 p-5 shadow-xs md:w-1/4">
          <div className="flex w-full flex-col items-center">
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Customer
            </h3>

            {/* Customer Avatar Placeholder */}
            <div className="relative flex h-32 w-32 items-center justify-center rounded-full border-2 border-blue-500/40 bg-gradient-to-b from-blue-500/10 to-blue-500/5 p-1 shadow-inner">
              <div className="relative flex h-full w-full items-center justify-center rounded-full bg-blue-500/15 text-blue-500">
                {/* User can replace this SVG/image placeholder with their custom image */}
                <User className="h-14 w-14" />
              </div>
            </div>

            {/* Latest Customer Spoken Text Bubble */}
            <div className="mt-6 flex w-full min-h-[110px] items-center justify-center rounded-xl border border-border/60 bg-background/90 p-4 text-center text-xs md:text-sm font-medium text-foreground shadow-xs">
              <p className="line-clamp-4">{latestCustomerText}</p>
            </div>
          </div>

          {/* CUSTOMER SIDE ACTION */}
          <div className="mt-6 flex w-full flex-col gap-2">
            <div className="flex items-center justify-center gap-3">
              {/* Mute / Unmute Button */}
              <Button
                variant={isMicrophoneEnabled ? "outline" : "destructive"}
                size="lg"
                onClick={toggleMic}
                className="flex-1 rounded-xl gap-2 font-medium text-xs shadow-xs cursor-pointer"
              >
                {isMicrophoneEnabled ? (
                  <>
                    <Mic className="h-4 w-4 text-emerald-500" />
                    <span>Mute</span>
                  </>
                ) : (
                  <>
                    <MicOff className="h-4 w-4" />
                    <span>Unmute</span>
                  </>
                )}
              </Button>

              {/* End Call Button */}
              <Button
                variant="destructive"
                size="lg"
                onClick={() => session.end()}
                className="flex-1 rounded-xl gap-2 font-medium text-xs shadow-xs bg-red-600 hover:bg-red-700 text-white cursor-pointer"
              >
                <PhoneOff className="h-4 w-4" />
                <span>End Call</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
