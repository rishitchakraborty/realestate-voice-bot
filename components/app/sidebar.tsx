"use client";

import React from "react";
import { PhoneCall } from "lucide-react";
import { cn } from "@/lib/shadcn/utils";
import { ThemeToggle } from "./theme-toggle";

interface SidebarProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  logoUrl?: string;
  className?: string;
}

export function Sidebar({
  activeTab = "live-call",
  onTabChange,
  logoUrl = "/realestate-bot/quarkLogo.png",
  className,
}: SidebarProps) {
  return (
    <aside
      className={cn(
        "flex w-20 flex-col items-center border-r border-border bg-card py-4 text-card-foreground shadow-xs md:w-24",
        className,
      )}
    >
      {/* Top Logo */}
      <div className="mb-6 flex flex-col items-center px-2 pt-1">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logoUrl}
          alt="Logo"
          className="h-7 w-auto max-w-full object-contain"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/quarkLogo.png";
          }}
        />
      </div>

      {/* Navigation Menu */}
      <nav className="flex w-full flex-col items-center gap-2 px-1">
        <button
          type="button"
          onClick={() => onTabChange?.("live-call")}
          className={cn(
            "group relative flex w-full flex-col items-center justify-center rounded-xl p-2.5 transition-all duration-200",
            activeTab === "live-call"
              ? "bg-primary/10 text-primary font-semibold shadow-xs"
              : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
          )}
          title="Live Call"
        >
          {/* Active indicator bar on left */}
          {activeTab === "live-call" && (
            <span className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-primary" />
          )}

          <div className="relative flex h-6 w-6 items-center justify-center">
            <PhoneCall
              className={cn(
                "h-5 w-5 transition-transform duration-200 group-hover:scale-110",
                activeTab === "live-call" && "animate-pulse",
              )}
            />
          </div>
          <span className="mt-1 text-[10px] font-medium tracking-tight">
            Live Call
          </span>
        </button>
      </nav>

      {/* Bottom status badge */}
      <div className="mt-auto flex flex-col items-center gap-1 pt-4 text-[9px] text-muted-foreground">
        <ThemeToggle />
      </div>
    </aside>
  );
}
