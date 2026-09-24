"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  ChevronDown,
  Check,
  Bot,
  CalendarCheck,
  PhoneCall,
  Sparkles,
  Lock,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { BOTS as BOT_FLOWS, type BotConfig as BotFlow } from "@/constants/bots";
import { cn } from "@/lib/shadcn/utils";

function BotIcon({ icon, className }: { icon?: string; className?: string }) {
  if (icon === "calendar") return <CalendarCheck className={className} />;
  if (icon === "bot") return <Bot className={className} />;
  if (icon === "sparkles") return <Sparkles className={className} />;
  return <PhoneCall className={className} />;
}

interface BotSelectorDropdownProps {
  selectedBot: BotFlow;
  onSelectBot: (bot: BotFlow) => void;
  isConnected?: boolean;
  className?: string;
  variant?: "header" | "standalone";
}

export function BotSelectorDropdown({
  selectedBot,
  onSelectBot,
  isConnected = false,
  className,
  variant = "header",
}: BotSelectorDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleSelect = (bot: BotFlow) => {
    if (isConnected) return;
    onSelectBot(bot);
    setIsOpen(false);
  };

  return (
    <div
      ref={containerRef}
      className={cn("relative inline-block text-left", className)}
    >
      {/* Dropdown Trigger */}
      <button
        type="button"
        onClick={() => {
          if (!isConnected) {
            setIsOpen((prev) => !prev);
          }
        }}
        disabled={isConnected}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        title={
          isConnected
            ? "Voice call in progress with " + selectedBot.shortName
            : "Select AI Agent"
        }
        className={cn(
          "group relative flex items-center gap-2.5 rounded-xl transition-all duration-200 select-none outline-none cursor-pointer",
          variant === "header"
            ? "h-10 px-3.5 bg-slate-50/90 hover:bg-slate-100/90 border border-slate-200/90 shadow-2xs text-slate-800"
            : "h-12 px-4 bg-white hover:bg-slate-50 border border-slate-200 shadow-xs hover:border-slate-300 text-slate-900",
          isConnected &&
            "cursor-not-allowed bg-emerald-50/80 border-emerald-300/80 text-emerald-950 hover:bg-emerald-50 hover:border-emerald-300",
          isOpen && "ring-2 ring-slate-300 border-slate-400"
        )}
      >
        {/* Dynamic Bot Icon */}
        <div
          className={cn(
            "flex h-6 w-6 items-center justify-center rounded-lg text-white shadow-2xs shrink-0 transition-transform duration-200 group-hover:scale-105 bg-gradient-to-br",
            selectedBot.accentGradient
          )}
        >
          <BotIcon icon={selectedBot.icon} className="h-3.5 w-3.5 text-white" />
        </div>

        {/* Text Container */}
        <div className="flex flex-col items-start text-left">
          <div className="flex items-center gap-1.5">
            <span
              className="inline-flex items-center rounded-md px-1.5 py-0.2 text-[9.5px] font-bold uppercase tracking-wider"
              style={{
                backgroundColor: `${selectedBot.accentColor}18`,
                color: selectedBot.accentColor,
                border: `1px solid ${selectedBot.accentColor}40`,
              }}
            >
              {selectedBot.badge}
            </span>
            <span className="text-xs font-semibold tracking-tight text-slate-800 truncate max-w-[140px] sm:max-w-[210px] md:max-w-[240px]">
              {selectedBot.shortName}
            </span>
          </div>

          <span className="text-[10px] text-slate-500 tracking-tight hidden sm:block truncate max-w-[200px]">
            {selectedBot.subtitle}
          </span>
        </div>

        {/* Live Call / Dropdown Chevron Indicator */}
        <div className="ml-1 flex items-center gap-1.5 pl-1 border-l border-slate-200/70 text-slate-400">
          {isConnected ? (
            <div className="flex items-center gap-1 px-1 text-[10px] font-medium text-emerald-800">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
              </span>
              <span className="font-semibold hidden lg:inline">Live</span>
              <Lock className="h-3 w-3 text-slate-400 ml-0.5" />
            </div>
          ) : (
            <ChevronDown
              className={cn(
                "h-4 w-4 transition-transform duration-200 text-slate-500 group-hover:text-slate-700",
                isOpen && "rotate-180"
              )}
            />
          )}
        </div>
      </button>

      {/* Dropdown Menu Overlay */}
      <AnimatePresence>
        {isOpen && !isConnected && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.98 }}
            transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-0 sm:right-0 sm:left-auto top-full z-50 mt-2 w-[340px] sm:w-[410px] origin-top-right rounded-2xl border border-slate-200/90 bg-white p-2.5 shadow-2xl shadow-slate-900/15 backdrop-blur-md outline-none"
            role="listbox"
          >
            {/* Menu Header */}
            <div className="px-3 py-2 border-b border-slate-100 flex items-center justify-between">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-[#0e1230]">
                  Select AI Consultation Bot
                </p>
                <p className="text-[11px] text-slate-500">
                  Switch between specialized voice agents
                </p>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-600">
                <Sparkles className="h-3 w-3 text-[#c9a24c]" />
                {BOT_FLOWS.length} Available
              </span>
            </div>

            {/* Bot List */}
            <div className="mt-2 space-y-1.5">
              {BOT_FLOWS.map((bot) => {
                const isSelected = selectedBot.id === bot.id;

                return (
                  <button
                    key={bot.id}
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => handleSelect(bot)}
                    style={
                      isSelected
                        ? {
                            borderColor: `${bot.accentColor}80`,
                            backgroundColor: `${bot.accentColor}0e`,
                          }
                        : undefined
                    }
                    className={cn(
                      "group relative flex w-full flex-col gap-2 rounded-xl p-3 text-left transition-all duration-200 cursor-pointer border",
                      !isSelected && "bg-white border-transparent hover:bg-slate-50/90 hover:border-slate-200/80"
                    )}
                  >
                    {/* Top Row: Badge, Title, Checkmark */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <div
                          className={cn(
                            "flex h-7 w-7 items-center justify-center rounded-lg text-white shadow-2xs shrink-0 bg-gradient-to-br",
                            bot.accentGradient
                          )}
                        >
                          <BotIcon icon={bot.icon} className="h-3.5 w-3.5 text-white" />
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span
                              className="inline-flex items-center rounded-md px-1.5 py-0.2 text-[9.5px] font-bold uppercase tracking-wider"
                              style={{
                                backgroundColor: `${bot.accentColor}18`,
                                color: bot.accentColor,
                                border: `1px solid ${bot.accentColor}40`,
                              }}
                            >
                              {bot.badge}
                            </span>
                            <span className="text-xs font-bold text-slate-900 group-hover:text-[#0e1230]">
                              {bot.shortName}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Selected Radio / Check Icon */}
                      <div className="flex items-center pt-0.5">
                        {isSelected ? (
                          <div
                            className="flex h-5 w-5 items-center justify-center rounded-full text-white shadow-xs"
                            style={{ backgroundColor: bot.accentColor }}
                          >
                            <Check className="h-3 w-3 stroke-[3]" />
                          </div>
                        ) : (
                          <div className="h-4 w-4 rounded-full border border-slate-300 group-hover:border-slate-400" />
                        )}
                      </div>
                    </div>

                    {/* Middle: Description */}
                    <p className="text-[11.5px] leading-relaxed text-slate-600 pl-9">
                      {bot.description}
                    </p>

                    {/* Bottom: Feature tags */}
                    <div className="flex flex-wrap items-center gap-1.5 pl-9 pt-0.5">
                      {bot.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center rounded-md px-2 py-0.5 text-[9.5px] font-medium"
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
                  </button>
                );
              })}
            </div>

            {/* Footer Notice */}
            <div className="mt-2.5 pt-2 border-t border-slate-100 px-3 flex items-center justify-between text-[10px] text-slate-500">
              <span>Dynamic Agent Dispatch</span>
              <span className="font-semibold text-slate-700">LiveKit Cloud Engine</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
