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
      className="bg-background relative z-10 flex h-full w-full items-center justify-center p-3 md:p-6 overflow-hidden"
      {...props}
    >
      {/* Outer Dashboard Card */}
      <div className="flex h-full w-full max-w-7xl flex-col gap-4 rounded-3xl border-2 border-slate-200 bg-slate-100/70 p-4 md:flex-row md:gap-6 md:p-6 shadow-xl backdrop-blur-md overflow-hidden">
        {/* LEFT COLUMN: AGENT SIDE */}
        <div className="flex flex-1 flex-col items-center justify-between rounded-2xl border-2 border-slate-200/90 bg-white p-5 shadow-sm md:w-1/4">
          <div className="flex w-full flex-col items-center">
            <div className="flex items-center gap-2 mb-4">
              <Bot className="h-4 w-4 text-slate-700" />
              <h3 className="text-xs font-extrabold uppercase tracking-widest font-mono text-slate-700">
                Agent
              </h3>
            </div>

            {/* Agent Avatar Placeholder & Real-time Frequency Wave */}
            <div className="relative flex h-36 w-36 items-center justify-center rounded-full border-4 border-slate-300 bg-slate-100 p-1 shadow-inner">
              <div className="relative flex h-full w-full flex-col items-center justify-center rounded-full bg-slate-200/70 text-slate-700">
                {/* User can replace this SVG/image placeholder with their custom image */}
                <Bot className="h-12 w-12 drop-shadow-xs mb-0.5" />

                {/* Frequency & amplitude audio wave bars */}
                {audioTrack && (
                  <AgentAudioVisualizerBar
                    size="sm"
                    barCount={5}
                    state={agentState}
                    audioTrack={audioTrack}
                    className="text-blue-600 gap-1 h-5"
                  />
                )}
              </div>

              {/* Speaking Indicator pulse */}
              {agentState === "speaking" && (
                <span className="absolute inset-0 rounded-full border-4 border-blue-500 animate-ping opacity-60" />
              )}
            </div>

            {/* Latest Agent Spoken Text Bubble */}
            <AgentLatestSpeech className="mt-6" />
          </div>

          {/* AGENT SIDE CONTROLS */}
        </div>

        {/* MIDDLE COLUMN: TRANSCRIPTION STREAM */}
        <div className="flex flex-2 flex-col rounded-2xl border-2 border-slate-200/90 bg-white p-5 shadow-sm h-full overflow-hidden">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <h3 className="text-xs font-extrabold uppercase tracking-widest font-mono text-slate-800">
              Transcription
            </h3>
            {agentState && (
              <span className="flex items-center gap-2 text-xs font-bold text-slate-700 bg-slate-100 border border-slate-300 px-3 py-1 rounded-full uppercase tracking-wider font-mono">
                <span className="h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
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
        <div className="flex flex-1 flex-col items-center justify-between rounded-2xl border-2 border-slate-200/90 bg-white p-5 shadow-sm md:w-1/4">
          <div className="flex w-full flex-col items-center">
            <div className="flex items-center gap-2 mb-4">
              <User className="h-4 w-4 text-slate-700" />
              <h3 className="text-xs font-extrabold uppercase tracking-widest font-mono text-slate-700">
                Customer
              </h3>
            </div>

            {/* Customer Avatar Placeholder */}
            <div className="relative flex h-36 w-36 items-center justify-center rounded-full border-4 border-slate-300 bg-slate-100 p-1 shadow-inner">
              <div className="relative flex h-full w-full items-center justify-center rounded-full bg-slate-200/70 text-slate-700">
                {/* User can replace this SVG/image placeholder with their custom image */}
                <User className="h-16 w-16 drop-shadow-xs" />
              </div>
            </div>

            {/* Latest Customer Spoken Text Bubble */}
            <CustomerLatestSpeech className="mt-6" />
          </div>

          {/* CALL CONTROLS */}
          <div className="mt-6 flex w-full flex-col gap-2">
            <div className="flex items-center justify-center gap-3">
              {/* Mute / Unmute Button */}
              <Button
                variant={isMicrophoneEnabled ? "outline" : "destructive"}
                size="lg"
                onClick={toggleMic}
                className="flex-1 rounded-xl gap-2 font-bold text-xs shadow-xs border-2 border-slate-300 bg-white hover:bg-slate-100 text-slate-800 cursor-pointer transition-transform hover:scale-105 active:scale-95"
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
    </section>
  );
};
