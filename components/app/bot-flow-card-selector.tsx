"use client";

import React from "react";
import {
  PhoneCall,
  CalendarCheck,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Bot,
} from "lucide-react";
import { BOTS as BOT_FLOWS, type BotConfig as BotFlow } from "@/constants/bots";
import { cn } from "@/lib/shadcn/utils";

function BotIcon({ icon, className }: { icon?: string; className?: string }) {
  if (icon === "calendar") return <CalendarCheck className={className} />;
  if (icon === "bot") return <Bot className={className} />;
  if (icon === "sparkles") return <Sparkles className={className} />;
  return <PhoneCall className={className} />;
}

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
    <div
      className={cn("w-full max-w-5xl mx-auto flex flex-col gap-3.5", className)}
    >
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-left px-1">
        <div className="flex items-center gap-2">
          <div className="flex h-5 w-5 items-center justify-center rounded-md bg-[#0e1230] text-amber-400">
            <Bot className="h-3.5 w-3.5" />
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#0e1230]">
            Select AI Voice Assistant
          </span>
          <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-semibold text-slate-600">
            {BOT_FLOWS.length} Specialized Agents
          </span>
        </div>
        <span className="text-[11px] text-slate-500">
          Choose a conversation flow below to begin your consultation
        </span>
      </div>

      {/* Grid of Bot Cards (Both cards equal size & spacious) */}
      <div
        className={cn(
          "grid gap-4 sm:gap-5 items-stretch",
          BOT_FLOWS.length === 1
            ? "grid-cols-1"
            : BOT_FLOWS.length === 2
              ? "grid-cols-1 md:grid-cols-2"
              : "grid-cols-1 md:grid-cols-3",
        )}
      >
        {BOT_FLOWS.map((bot) => {
          const isSelected = selectedBot.id === bot.id;

          return (
            <div
              key={bot.id}
              role="button"
              tabIndex={0}
              onClick={(e) => {
                e.preventDefault();
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
              style={
                isSelected
                  ? {
                      borderColor: bot.accentColor,
                      backgroundColor: `${bot.accentColor}0a`,
                      boxShadow: `0 12px 30px -6px ${bot.accentColor}25`,
                    }
                  : undefined
              }
              className={cn(
                "group relative flex h-full flex-col justify-between rounded-2xl p-5 sm:p-6 text-left transition-all duration-300 cursor-pointer border select-none outline-none",
                isSelected
                  ? "ring-2 ring-offset-2 ring-slate-900/10 border-transparent"
                  : "bg-white/95 border-slate-200/90 shadow-2xs hover:border-slate-300 hover:shadow-md hover:bg-white",
              )}
            >
              {/* Card Body */}
              <div className="flex flex-col">
                {/* Header: Icon, Badge, Title, Radio */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        "flex h-11 w-11 items-center justify-center rounded-xl text-white shadow-xs transition-transform group-hover:scale-105 shrink-0 bg-gradient-to-br",
                        bot.accentGradient,
                      )}
                    >
                      <BotIcon icon={bot.icon} className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span
                          className="inline-flex items-center rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider"
                          style={{
                            backgroundColor: `${bot.accentColor}18`,
                            color: bot.accentColor,
                            border: `1px solid ${bot.accentColor}40`,
                          }}
                        >
                          {bot.badge}
                        </span>
                      </div>
                      <h4 className="mt-1 text-base font-bold text-slate-900 leading-snug">
                        {bot.shortName}
                      </h4>
                    </div>
                  </div>

                  {/* Radio Indicator */}
                  <div className="pt-0.5 shrink-0">
                    {isSelected ? (
                      <div
                        className="flex h-5 w-5 items-center justify-center rounded-full text-white shadow-xs"
                        style={{ backgroundColor: bot.accentColor }}
                      >
                        <CheckCircle2 className="h-4 w-4" />
                      </div>
                    ) : (
                      <div className="h-5 w-5 rounded-full border-2 border-slate-300 group-hover:border-slate-400" />
                    )}
                  </div>
                </div>

                {/* Subtitle / Purpose */}
                <p className="mt-3 text-xs leading-relaxed text-slate-600 font-normal">
                  {bot.description}
                </p>

                {/* Features Checklist: What the bot will do */}
                <div className="mt-4 border-t border-slate-100 pt-3.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    What this agent will do:
                  </span>
                  <ul className="mt-2.5 space-y-2">
                    {bot.features.map((feat) => (
                      <li
                        key={feat}
                        className="flex items-start gap-2.5 text-xs text-slate-700 leading-snug"
                      >
                        <CheckCircle2
                          className="h-4 w-4 shrink-0 mt-0.5"
                          style={{ color: bot.accentColor }}
                        />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom Tag Bar & Active Indicator */}
              <div className="mt-5 flex items-center justify-between pt-3 border-t border-slate-100/90">
                <div className="flex flex-wrap gap-1.5">
                  {bot.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[9.5px] font-medium px-2 py-0.5 rounded-md"
                      style={
                        isSelected
                          ? {
                              backgroundColor: `${bot.accentColor}18`,
                              color: bot.accentColor,
                            }
                          : {
                              backgroundColor: "#f1f5f9",
                              color: "#475569",
                            }
                      }
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center text-xs font-semibold shrink-0 ml-2">
                  {isSelected ? (
                    <span
                      className="inline-flex items-center gap-1 font-bold"
                      style={{ color: bot.accentColor }}
                    >
                      <span>Active Flow</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  ) : (
                    <span className="text-slate-400 group-hover:text-slate-700 transition-colors">
                      Select Flow
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
