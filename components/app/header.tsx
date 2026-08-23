"use client";

import React from "react";
import Image from "next/image";
import { Building2, Sparkles } from "lucide-react";
import { ThemeToggle } from "@/components/app/theme-toggle";

interface HeaderProps {
  logoUrl?: string;
  title?: string;
}

export function Header({
  title = "Alcove Realty AI Voice Assistant",
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 flex h-16 w-full items-center justify-between border-b border-slate-200/80 bg-white/90 px-4 py-2 shadow-xs backdrop-blur-md md:px-6">
      {/* Left: Brand / Title */}
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#0f2b48]/5 text-[#0f2b48] border border-[#0f2b48]/10">
          <Building2 className="h-5 w-5 text-[#0f2b48]" />
        </div>
        <div className="flex flex-col">
          <h1 className="text-xs sm:text-sm font-bold tracking-tight text-slate-900 flex items-center gap-2">
            <span>{title}</span>
            <span className="hidden sm:inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-semibold text-amber-700 border border-amber-200/70">
              <Sparkles className="h-2.5 w-2.5 text-amber-500" />
              Real Estate AI
            </span>
          </h1>
          <span className="text-[10px] text-slate-500 hidden md:block">
            Kolkata's Premier Real Estate Developers &amp; Builders
          </span>
        </div>
      </div>

      {/* Right: Powered by QuarkGen with Logo */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50/80 px-3 py-1.5 shadow-2xs">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
          </span>
          <span className="text-[11px] font-medium text-slate-600">
            Powered by
          </span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/alcove-reality-bot/quarkLogo.png"
            alt="QuarkGen Logo"
            className="h-4.5 w-auto object-contain"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/quarkLogo.png";
            }}
          />
        </div>
      </div>
    </header>
  );
}
