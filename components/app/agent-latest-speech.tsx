"use client";

import React from "react";
import { Sparkles, Volume2 } from "lucide-react";
import { useVoiceAssistant } from "@livekit/components-react";
import { AgentAudioVisualizerBar } from "@/components/agents-ui/agent-audio-visualizer-bar";
import { useAgentSpeech } from "@/hooks/useAgentSpeech";
import { cn } from "@/lib/shadcn/utils";

interface AgentLatestSpeechProps {
  className?: string;
  fallbackText?: string;
}

export function AgentLatestSpeech({ className, fallbackText }: AgentLatestSpeechProps) {
  const { latestAgentText, isSpeaking, isThinking } = useAgentSpeech({ fallbackText });
  const { audioTrack, state: agentState } = useVoiceAssistant();

  return (
    <div
      className={cn(
        'relative flex w-full min-h-[125px] flex-col justify-between rounded-xl border-l-4 border-l-slate-700 border border-slate-200 bg-slate-50/90 p-4 text-left shadow-xs transition-all duration-300',
        isSpeaking && 'border-l-blue-600 border-blue-200 bg-blue-50/60 shadow-sm ring-2 ring-blue-500/20',
        isThinking && 'border-l-amber-500 bg-amber-50/60 shadow-xs',
        className
      )}
    >
      {/* Header Status Badge */}
      <div className="flex items-center justify-between w-full mb-2 text-xs font-mono uppercase tracking-widest font-bold text-slate-700">
        <span className="flex items-center gap-2">
          {isSpeaking && <Volume2 className="h-4 w-4 text-blue-600 animate-pulse" />}
          {isThinking && <Sparkles className="h-4 w-4 text-amber-600 animate-spin" />}
          <span>
            {isSpeaking ? 'Agent Speaking' : isThinking ? 'Agent Thinking' : 'Agent Speech'}
          </span>
        </span>
        {isSpeaking && audioTrack ? (
          <AgentAudioVisualizerBar
            size="icon"
            barCount={5}
            state={agentState}
            audioTrack={audioTrack}
            className="text-blue-600 gap-[2px] h-4"
          />
        ) : isSpeaking ? (
          <span className="h-2.5 w-2.5 rounded-full bg-blue-600 animate-ping" />
        ) : null}
      </div>

      {/* Spoken Text */}
      <p className="line-clamp-4 leading-relaxed font-semibold text-xs md:text-sm text-slate-800">
        "{latestAgentText}"
      </p>
    </div>
  );
}
