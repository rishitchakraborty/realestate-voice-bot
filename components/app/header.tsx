"use client";

import React from "react";
import Image from "next/image";
import { ThemeToggle } from "@/components/app/theme-toggle";

interface HeaderProps {
  logoUrl?: string;
  title?: string;
}

export function Header({
  title = "Quarkgen Realestate Voice Agent",
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 flex h-18 w-full items-center justify-between border-b border-border/40 px-4 py-2 shadow-xs md:px-6">
      {/* Left: Title */}
      <div className="flex items-center gap-3">
        <h1 className="text-xs font-semibold tracking-wide text-foreground sm:text-sm font-medium">
          {title}
        </h1>
      </div>

      {/* Right: Branding & Actions */}
      <div className="flex items-center gap-4">
        <div className="hidden items-center gap-2 text-xs text-slate-400 md:flex">
          <span className="inline-block h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-medium text-slate-300">
            Powered by QuarkGen AI
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* <span className="rounded-full bg-blue-500/10 px-2.5 py-0.5 text-[11px] font-semibold tracking-wide text-blue-400 border border-blue-500/20">
            QA Mode
          </span> */}
          {/* <ThemeToggle className="text-white hover:bg-slate-800/60" /> */}
        </div>
      </div>
    </header>
  );
}
