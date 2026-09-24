"use client";

import React from "react";
import Image from "next/image";
import { Building2, Sparkles } from "lucide-react";
import { ThemeToggle } from "@/components/app/theme-toggle";

import type { BotConfig as BotFlow } from "@/constants/bots";
import { BotSelectorDropdown } from "@/components/app/bot-selector-dropdown";

interface HeaderProps {
  logoUrl?: string;
  title?: string;
  selectedBot?: BotFlow;
  onSelectBot?: (bot: BotFlow) => void;
  isConnected?: boolean;
  showBotSelector?: boolean;
}

export function Header({
  title = "Novesta Group AI Voice Assistant",
  selectedBot,
  onSelectBot,
  isConnected = false,
  showBotSelector = true,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b border-slate-200 bg-white/95 px-3 py-2 shadow-xs backdrop-blur-md md:px-6 gap-2">
      {/* Left: Brand / Title */}
      <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#c9a24c]/10 text-[#8b6508] border border-[#c9a24c]/30 shrink-0">
          <Building2 className="h-5 w-5 text-[#b8860b]" />
        </div>
        <div className="flex flex-col">
          <h1 className="text-xs sm:text-sm font-bold tracking-tight text-[#0e1230] flex items-center gap-2">
            <span>{title}</span>
          </h1>
          <span className="text-[10px] text-slate-500 hidden xl:block">
            Kolkata's Premier Residential Plots &amp; Bungalow Communities
          </span>
        </div>
      </div>

      {/* Center: Bot Selector Dropdown */}
      {showBotSelector && selectedBot && onSelectBot && (
        <div className="flex items-center justify-center">
          <BotSelectorDropdown
            selectedBot={selectedBot}
            onSelectBot={onSelectBot}
            isConnected={isConnected}
            variant="header"
          />
        </div>
      )}

      {/* Right: Powered by QuarkGen with Logo */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        <div className="flex items-center gap-2 rounded-full border border-sky-200/80 bg-white px-2.5 sm:px-3.5 py-1.5 shadow-[0_2px_12px_rgba(0,136,204,0.08)]">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#0088cc] opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#0088cc]"></span>
          </span>
          <span className="text-[10px] sm:text-[11px] font-medium text-slate-700 hidden sm:inline">
            Powered by
          </span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/novesta-bot/quarkLogo.png"
            alt="QuarkGen Logo"
            className="h-4 sm:h-4.5 w-auto object-contain"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/quarkLogo.png";
            }}
          />
        </div>
      </div>
    </header>
  );
}
