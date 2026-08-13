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
        'relative flex w-full min-h-[140px] flex-col justify-between rounded-2xl border border-slate-200/80 bg-[#f1f5f9] p-4 text-center shadow-2xs transition-all duration-300',
        isSpeaking && 'ring-2 ring-blue-500/20 bg-blue-50/50 border-blue-200',
        className
      )}
    >
      {/* Header Status Line */}
      <div className="flex items-center justify-between w-full mb-1 text-[11px] font-medium text-slate-400">
        <span className="flex items-center gap-1.5">
          {isSpeaking && <Volume2 className="h-3.5 w-3.5 text-blue-600 animate-pulse" />}
          {isThinking && <Sparkles className="h-3.5 w-3.5 text-amber-600 animate-spin" />}
          <span>{isSpeaking ? 'Agent Speaking' : 'Agent Speech'}</span>
        </span>
        {isSpeaking && audioTrack && (
          <AgentAudioVisualizerBar
            size="icon"
            barCount={5}
            state={agentState}
            audioTrack={audioTrack}
            className="text-blue-600 gap-[2px] h-3.5"
          />
        )}
      </div>

      {/* Spoken Text Centered */}
      <div className="my-auto flex items-center justify-center py-1">
        <p className="line-clamp-5 leading-relaxed font-normal text-xs md:text-sm text-slate-600">
          "{latestAgentText}"
        </p>
      </div>
    </div>
  );
}
