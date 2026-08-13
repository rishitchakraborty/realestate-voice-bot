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
import { AgentAudioVisualizerBar } from "@/components/agents-ui/agent-audio-visualizer-bar";
import { AgentChatTranscript } from "@/components/agents-ui/agent-chat-transcript";
import { AgentLatestSpeech } from "@/components/app/agent-latest-speech";
import { CustomerLatestSpeech } from "@/components/app/customer-latest-speech";
import { AnimatedSineWave } from "@/components/app/animated-sine-wave";
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
  const { audioTrack, state: agentState } = useVoiceAssistant();
  const { isMicrophoneEnabled, localParticipant } = useLocalParticipant();

  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto scroll transcript to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const toggleMic = async () => {
    try {
      await localParticipant.setMicrophoneEnabled(!isMicrophoneEnabled);
    } catch (e) {
      console.error("Failed to toggle mic:", e);
    }
  };

  return (
    <section
      className="bg-[#f1f5f9]/70 relative z-10 flex h-full w-full flex-col items-center justify-between p-3 md:p-6 overflow-hidden"
      {...props}
    >
      {/* Outer Dashboard Card Grid */}
      <div className="relative z-10 flex h-full w-full max-w-7xl flex-col gap-4 md:flex-row md:gap-6 overflow-hidden pb-8">
        {/* LEFT COLUMN: AGENT SIDE */}
        <div className="flex flex-1 flex-col items-center justify-between rounded-2xl bg-white/70 p-5 shadow-2xs md:w-1/4 backdrop-blur-xs">
          <div className="flex w-full flex-col items-center">
            <h3 className="text-sm font-medium text-slate-500 mb-6">Agent</h3>

            {/* Agent Avatar Concentric Circular Ring (matching screenshot) */}
            <div className="relative flex h-36 w-36 items-center justify-center rounded-full border-2 border-slate-300/80 bg-white p-2 shadow-xs">
              <div className="relative flex h-full w-full flex-col items-center justify-center rounded-full border border-slate-200 bg-slate-100/90 text-slate-700 overflow-hidden">
                {/* <Bot className="h-12 w-12 text-slate-700 drop-shadow-xs" /> */}
                <div className="flex h-full w-full flex-col items-center justify-center">
                  <img
                    src="/realestate-bot/agent.png"
                    alt="agent"
                    className="h-36 w-36 text-slate-700 drop-shadow-xs"
                  />
                </div>
              </div>

              {/* Speaking pulse ring */}
              {agentState === "speaking" && (
                <span className="absolute -inset-1.5 rounded-full border-2 border-blue-400 animate-ping opacity-60" />
              )}
            </div>

            {/* Latest Agent Spoken Text Box */}
            <AgentLatestSpeech className="mt-6 w-full" />
          </div>
        </div>

        {/* MIDDLE COLUMN: TRANSCRIPTION STREAM */}
        <div className="flex flex-2 flex-col rounded-2xl bg-[#ebf0f7]/80 p-5 shadow-2xs h-full overflow-hidden border border-slate-200/60 backdrop-blur-xs">
          <div className="flex items-center justify-between pb-3 border-b border-dashed border-slate-300">
            <h3 className="text-sm font-bold text-slate-800">Transcription</h3>
            {agentState && (
              <span className="text-xs font-semibold text-slate-600 bg-white/90 px-3 py-1 rounded-full uppercase tracking-wider font-mono shadow-2xs border border-slate-200">
                {agentState}
              </span>
            )}
          </div>

          {/* Transcript Scroll Area using AgentChatTranscript */}
          <div className="flex-1 overflow-y-auto py-2 px-1 relative">
            {messages.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center text-center text-slate-500 text-xs p-6">
                <Volume2 className="h-10 w-10 mb-3 text-slate-400 opacity-60 animate-pulse" />
                <p className="font-semibold text-sm text-slate-700">
                  Call Connected
                </p>
                <p className="text-slate-400 text-xs mt-1">
                  Realtime conversation will stream here...
                </p>
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
        <div className="flex flex-1 flex-col items-center justify-between rounded-2xl bg-white/70 p-5 shadow-2xs md:w-1/4 backdrop-blur-xs">
          <div className="flex w-full flex-col items-center">
            <h3 className="text-sm font-medium text-slate-500 mb-6">
              Customer
            </h3>

            {/* Customer Avatar Circular Ring (matching screenshot) */}
            <div className="relative flex h-36 w-36 items-center justify-center rounded-full border-2 border-slate-300/80 bg-white p-2 shadow-xs">
              <div className="relative flex h-full w-full items-center justify-center rounded-full border border-slate-200 bg-slate-100/90 text-slate-700 overflow-hidden">
                <User className="h-14 w-14 text-slate-700 drop-shadow-xs" />
              </div>
            </div>

            {/* Latest Customer Spoken Text Box */}
            <CustomerLatestSpeech className="mt-6 w-full" />
          </div>

          {/* CALL CONTROLS */}
          <div className="mt-6 flex w-full flex-col gap-2">
            <div className="flex items-center justify-center gap-3">
              {/* Mute / Unmute Button */}
              <Button
                variant={isMicrophoneEnabled ? "outline" : "destructive"}
                size="lg"
                onClick={toggleMic}
                className="flex-1 rounded-xl gap-2 font-bold text-xs shadow-xs border border-slate-300 bg-white hover:bg-slate-100 text-slate-800 cursor-pointer transition-transform hover:scale-105 active:scale-95"
              >
                {isMicrophoneEnabled ? (
                  <>
                    <Mic className="h-4 w-4 text-emerald-600" />
                    <span>Mute</span>
                  </>
                ) : (
                  <>
                    <MicOff className="h-4 w-4 text-red-600" />
                    <span>Unmute</span>
                  </>
                )}
              </Button>

              {/* End Call Button */}
              <Button
                variant="destructive"
                size="lg"
                onClick={() => session.end()}
                className="flex-1 rounded-xl gap-2 font-bold text-xs shadow-sm bg-red-600 hover:bg-red-700 text-white cursor-pointer transition-transform hover:scale-105 active:scale-95"
              >
                <PhoneOff className="h-4 w-4" />
                <span>End Call</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Animated Moving Sine Wave Pattern */}
      <AnimatedSineWave className="absolute bottom-0 left-0 right-0 h-12 w-full overflow-hidden pointer-events-none z-0" />
    </section>
  );
};
