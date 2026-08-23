"use client";

import React from "react";
import { PhoneCall, Building, Sparkles } from "lucide-react";
import { cn } from "@/lib/shadcn/utils";

interface SidebarProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  logoUrl?: string;
  className?: string;
}

export function Sidebar({
  activeTab = "live-call",
  onTabChange,
  logoUrl = "/alcove-reality-bot/alcove.webp",
  className,
}: SidebarProps) {
  return (
    <aside
      className={cn(
        "flex w-20 flex-col justify-between border-r border-slate-200/90 bg-[#0f2b48] text-white shadow-md md:w-24 z-30 select-none h-full",
        className,
      )}
    >
      {/* Top Logo Container - Aligns with Header height (h-16) */}
      <div className="flex h-16 w-full shrink-0 items-center justify-center border-b border-white/10 px-2">
        <div className="flex h-10 w-full items-center justify-center rounded-lg bg-white/95 px-1.5 py-1 shadow-xs border border-white/20 transition-transform hover:scale-105">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={logoUrl}
            alt="Alcove Realty Logo"
            className="h-7 w-auto max-h-full max-w-full object-contain"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/alcove.webp";
            }}
          />
        </div>
      </div>

      {/* Navigation Menu - Starts immediately below the header line */}
      <nav className="flex flex-1 w-full flex-col items-center gap-2 px-1.5 pt-4">
        <button
          type="button"
          onClick={() => onTabChange?.("live-call")}
          className={cn(
            "group relative flex w-full flex-col items-center justify-center rounded-xl p-2.5 transition-all duration-200 cursor-pointer",
            activeTab === "live-call"
              ? "bg-white/15 text-white font-semibold shadow-inner border border-white/20"
              : "text-slate-300 hover:bg-white/10 hover:text-white",
          )}
          title="Voice Consultation"
        >
          {/* Active indicator bar on left */}
          {activeTab === "live-call" && (
            <span className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-amber-400" />
          )}

          <div className="relative flex h-7 w-7 items-center justify-center rounded-lg bg-amber-400/20 text-amber-300">
            <PhoneCall
              className={cn(
                "h-4.5 w-4.5 transition-transform duration-200 group-hover:scale-110",
                activeTab === "live-call" && "animate-pulse",
              )}
            />
          </div>
          <span className="mt-1 text-[10px] font-medium tracking-tight text-center leading-tight">
            Voice AI
          </span>
        </button>
      </nav>

      {/* Bottom Powered by QuarkGen Badge */}
      <div className="mt-auto flex w-full shrink-0 flex-col items-center gap-1.5 border-t border-white/10 px-2 pb-4 pt-3 text-center">
        <span className="text-[8px] font-semibold text-slate-300 uppercase tracking-widest">
          Powered By
        </span>
        <div className="flex items-center justify-center bg-white/95 rounded-lg p-1 w-full shadow-xs border border-white/20 transition-all hover:bg-white">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/alcove-reality-bot/quarkLogo.png"
            alt="QuarkGen"
            className="h-4.5 w-auto object-contain"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/quarkLogo.png";
            }}
          />
        </div>
      </div>
    </aside>
  );
}
