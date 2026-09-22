"use client";

import React from "react";
import { PhoneCall, BarChart2, LogOut } from "lucide-react";
import { cn } from "@/lib/shadcn/utils";

interface SidebarProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  logoUrl?: string;
  className?: string;
}

export function Sidebar({
  activeTab = "analytics",
  onTabChange,
  logoUrl = "/novesta-bot/novesta/white-logo.png",
  className,
}: SidebarProps) {
  return (
    <aside
      className={cn(
        "flex w-20 flex-col justify-between border-r border-slate-200 bg-white text-slate-700 select-none h-full z-30 shrink-0 shadow-xs",
        className,
      )}
    >
      {/* Top: Brand Logo / Icon */}
      <div>
        <div className="flex h-16 w-full shrink-0 items-center justify-center border-b border-slate-200 px-2">
          <div className="flex h-11 w-full items-center justify-center rounded-xl bg-[#0e1230] p-1.5 transition-transform hover:scale-105 border border-[#c9a24c]/30 shadow-xs">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/novesta-bot/novesta/white-logo.png"
              alt="Novesta Logo"
              className="h-6 w-auto max-h-full max-w-full object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/novesta/white-logo.png";
              }}
            />
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex flex-col items-center gap-2.5 px-2 pt-4">
          {/* 1. Live Call Button */}
          <button
            type="button"
            onClick={() => onTabChange?.("live-call")}
            className={cn(
              "group relative flex w-full flex-col items-center justify-center rounded-xl p-2.5 transition-all duration-200 cursor-pointer",
              activeTab === "live-call"
                ? "bg-[#0e1230] text-white font-semibold shadow-md shadow-[#0e1230]/20"
                : "text-slate-500 hover:bg-slate-100 hover:text-slate-900",
            )}
            title="Live Voice Agent"
          >
            {activeTab === "live-call" && (
              <span className="absolute left-0 top-1/2 h-7 w-1 -translate-y-1/2 rounded-r-full bg-[#c9a24c]" />
            )}
            <PhoneCall
              className={cn(
                "h-5 w-5 transition-transform duration-200 group-hover:scale-110",
                activeTab === "live-call" ? "text-[#c9a24c]" : "text-slate-500",
              )}
            />
            <span className="mt-1.5 text-[10px] font-medium tracking-tight text-center leading-tight">
              Live Call
            </span>
          </button>

          {/* 2. Analytics Button */}
          <button
            type="button"
            onClick={() => onTabChange?.("analytics")}
            className={cn(
              "group relative flex w-full flex-col items-center justify-center rounded-xl p-2.5 transition-all duration-200 cursor-pointer",
              activeTab === "analytics"
                ? "bg-[#0e1230] text-white font-semibold shadow-md shadow-[#0e1230]/20"
                : "text-slate-500 hover:bg-slate-100 hover:text-slate-900",
            )}
            title="Call Analytics Dashboard"
          >
            {activeTab === "analytics" && (
              <span className="absolute left-0 top-1/2 h-7 w-1 -translate-y-1/2 rounded-r-full bg-[#c9a24c]" />
            )}
            <BarChart2
              className={cn(
                "h-5 w-5 transition-transform duration-200 group-hover:scale-110",
                activeTab === "analytics" ? "text-[#c9a24c]" : "text-slate-500",
              )}
            />
            <span className="mt-1.5 text-[10px] font-medium tracking-tight text-center leading-tight">
              Analytics
            </span>
          </button>
        </nav>
      </div>

      {/* Bottom Footer: Logout/Exit & Powered by QuarkGen */}
      <div className="mt-auto flex w-full flex-col items-center gap-3 border-t border-slate-200 px-2 pb-4 pt-3 text-center">
        {/* Collapse / Logout button */}
        <button
          type="button"
          title="Sign out / Exit"
          className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors cursor-pointer"
        >
          <LogOut className="h-4 w-4 rotate-180" />
        </button>

        {/* Powered By Badge */}
        <div className="flex flex-col items-center gap-1 w-full">
          <span className="text-[7px] font-bold text-slate-500 uppercase tracking-wider">
            Powered By
          </span>
          <div className="flex items-center justify-center rounded-lg bg-[#fdfbf7] border border-slate-200 p-1 w-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/novesta-bot/quarkLogo.png"
              alt="QuarkGen"
              className="h-3.5 w-auto object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/quarkLogo.png";
              }}
            />
          </div>
        </div>
      </div>
    </aside>
  );
}
