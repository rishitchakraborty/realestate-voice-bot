"use client";

import React from "react";
import { LogOut, User } from "lucide-react";
import { ThemeToggle } from "@/components/app/theme-toggle";

interface HeaderProps {
  logoUrl?: string;
  title?: string;
  userName?: string;
  onLogout?: () => void;
}

export function Header({
  title = "Quarkgen Realestate Voice Agent",
  userName = "Admin",
  onLogout,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 flex h-18 w-full items-center justify-between border-b border-border/40 px-4 py-2 shadow-xs md:px-6 bg-card/60 backdrop-blur-xs">
      {/* Left: Title */}
      <div className="flex items-center gap-3">
        <h1 className="text-xs font-semibold tracking-wide text-foreground sm:text-sm font-medium">
          {title}
        </h1>
      </div>

      {/* Right: Branding, User & Actions */}
      <div className="flex items-center gap-3 sm:gap-4">
        <div className="hidden items-center gap-2 text-xs text-slate-400 md:flex">
          <span className="inline-block h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-medium text-slate-400 dark:text-slate-300">
            Powered by QuarkGen AI
          </span>
        </div>

        {/* User Pill & Logout Button */}
        {userName && (
          <div className="flex items-center gap-2 rounded-full border border-border bg-accent/40 py-1 pl-2.5 pr-1.5 text-xs text-foreground">
            <div className="flex items-center gap-1.5">
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white">
                {userName.charAt(0).toUpperCase()}
              </div>
              <span className="font-semibold text-xs text-foreground hidden sm:inline">
                {userName}
              </span>
            </div>

            {onLogout && (
              <button
                type="button"
                onClick={onLogout}
                title="Log out"
                className="flex h-6 items-center gap-1 rounded-full px-2 text-[11px] font-medium text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors cursor-pointer"
              >
                <LogOut className="h-3 w-3" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            )}
          </div>
        )}
      </div>
    </header>
  );
}

