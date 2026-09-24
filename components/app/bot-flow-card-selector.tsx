"use client";

import React from "react";
import {
  PhoneCall,
  CalendarCheck,
  CheckCircle2,
  Sparkles,
  Car,
  FileCheck,
  Building2,
  Clock,
  ArrowRight,
  ShieldCheck,
  Bot,
} from "lucide-react";
import { BOTS as BOT_FLOWS, type BotConfig as BotFlow } from "@/constants/bots";
import { cn } from "@/lib/shadcn/utils";

interface BotFlowCardSelectorProps {
  selectedBot: BotFlow;
  onSelectBot: (bot: BotFlow) => void;
  disabled?: boolean;
  className?: string;
}

export function BotFlowCardSelector({
  selectedBot,
  onSelectBot,
  disabled = false,
  className,
}: BotFlowCardSelectorProps) {
  return (
    <div className={cn("w-full max-w-4xl mx-auto flex flex-col gap-3", className)}>
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-left px-1">
        <div className="flex items-center gap-2">
          <div className="flex h-5 w-5 items-center justify-center rounded-md bg-[#0e1230] text-amber-400">
            <Bot className="h-3.5 w-3.5" />
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#0e1230]">
            Select AI Voice Assistant Flow
          </span>
          <span className="inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-600">
            2 Specialized Bots Available
          </span>
        </div>
        <span className="text-[11px] text-slate-500">
          Switch anytime before starting the consultation
        </span>
      </div>

      {/* Grid of 2 Bot Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {BOT_FLOWS.map((bot) => {
          const isSelected = selectedBot.id === bot.id;
          const isFlow1 = bot.flowNumber === "1";

          return (
            <div
              key={bot.id}
              role="button"
              tabIndex={0}
              onClick={() => {
                if (!disabled) {
                  onSelectBot(bot);
                }
              }}
              onKeyDown={(e) => {
                if ((e.key === "Enter" || e.key === " ") && !disabled) {
                  e.preventDefault();
                  onSelectBot(bot);
                }
              }}
              className={cn(
                "group relative flex flex-col justify-between rounded-2xl p-4 sm:p-5 text-left transition-all duration-300 cursor-pointer border select-none outline-none",
                isSelected
                  ? isFlow1
                    ? "bg-gradient-to-br from-[#fdfbf7] via-white to-[#fbf7ee] border-[#c9a24c] shadow-lg shadow-[#c9a24c]/10 ring-2 ring-[#c9a24c]/30"
                    : "bg-gradient-to-br from-[#f8fbff] via-white to-[#f0f7ff] border-[#0088cc] shadow-lg shadow-[#0088cc]/10 ring-2 ring-[#0088cc]/30"
                  : "bg-white/90 border-slate-200/90 shadow-2xs hover:border-slate-300 hover:shadow-md hover:bg-white"
              )}
            >
              {/* Top Row: Flow Badge, Title, Selection Radio */}
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={cn(
                        "flex h-9 w-9 items-center justify-center rounded-xl text-white shadow-xs transition-transform group-hover:scale-105 shrink-0",
                        isFlow1
                          ? "bg-gradient-to-br from-[#c9a24c] to-[#996515]"
                          : "bg-gradient-to-br from-[#0088cc] to-[#0369a1]"
                      )}
                    >
                      {isFlow1 ? (
                        <PhoneCall className="h-4.5 w-4.5" />
                      ) : (
                        <CalendarCheck className="h-4.5 w-4.5" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span
                          className={cn(
                            "inline-flex items-center rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider",
                            isFlow1
                              ? "bg-amber-100 text-amber-900 border border-amber-300"
                              : "bg-sky-100 text-sky-900 border border-sky-300"
                          )}
                        >
                          Flow {bot.flowNumber}
                        </span>
                        <span
                          className={cn(
                            "text-xs font-semibold font-mono px-1.5 py-0.5 rounded",
                            isSelected
                              ? isFlow1
                                ? "bg-amber-50 text-amber-950 font-bold"
                                : "bg-sky-50 text-sky-950 font-bold"
                              : "bg-slate-100 text-slate-600"
                          )}
                        >
                          {bot.agentName}
                        </span>
                      </div>
                      <h4 className="mt-1 text-sm font-bold text-slate-900 leading-snug">
                        {bot.shortName}
                      </h4>
                    </div>
                  </div>

                  {/* Radio Indicator */}
                  <div className="pt-0.5 shrink-0">
                    {isSelected ? (
                      <div
                        className={cn(
                          "flex h-5 w-5 items-center justify-center rounded-full text-white shadow-xs",
                          isFlow1 ? "bg-[#c9a24c]" : "bg-[#0088cc]"
                        )}
                      >
                        <CheckCircle2 className="h-4 w-4" />
                      </div>
                    ) : (
                      <div className="h-5 w-5 rounded-full border-2 border-slate-300 group-hover:border-slate-400" />
                    )}
                  </div>
                </div>

                {/* Subtitle / Description */}
                <p className="mt-2.5 text-xs leading-relaxed text-slate-600 font-normal">
                  {bot.subtitle}
                </p>

                {/* Key Features Bullet List */}
                <ul className="mt-3 space-y-1.5 border-t border-slate-100 pt-2.5">
                  {bot.features.slice(0, 3).map((feat) => (
                    <li
                      key={feat}
                      className="flex items-center gap-2 text-[11px] text-slate-700"
                    >
                      <span
                        className={cn(
                          "h-1.5 w-1.5 rounded-full shrink-0",
                          isFlow1 ? "bg-[#c9a24c]" : "bg-[#0088cc]"
                        )}
                      />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom Tag Bar & Active Indicator */}
              <div className="mt-4 flex items-center justify-between pt-2 border-t border-slate-100/80">
                <div className="flex flex-wrap gap-1">
                  {bot.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className={cn(
                        "text-[9px] font-medium px-2 py-0.5 rounded-md",
                        isSelected
                          ? isFlow1
                            ? "bg-amber-100/90 text-amber-900"
                            : "bg-sky-100/90 text-sky-900"
                          : "bg-slate-100 text-slate-600"
                      )}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center text-[10.5px] font-semibold">
                  {isSelected ? (
                    <span
                      className={cn(
                        "inline-flex items-center gap-1 font-bold",
                        isFlow1 ? "text-[#b8860b]" : "text-[#0077b6]"
                      )}
                    >
                      <span>Selected</span>
                      <ArrowRight className="h-3 w-3" />
                    </span>
                  ) : (
                    <span className="text-slate-400 group-hover:text-slate-700 transition-colors">
                      Click to select
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
