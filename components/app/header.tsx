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
  title = "Novesta Group AI Voice Assistant",
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 flex h-16 w-full items-center justify-between border-b border-slate-200 bg-white/95 px-4 py-2 shadow-xs backdrop-blur-md md:px-6">
      {/* Left: Brand / Title */}
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#c9a24c]/10 text-[#8b6508] border border-[#c9a24c]/30">
          <Building2 className="h-5 w-5 text-[#b8860b]" />
        </div>
        <div className="flex flex-col">
          <h1 className="text-xs sm:text-sm font-bold tracking-tight text-[#0e1230] flex items-center gap-2">
            <span>{title}</span>
            {/* <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-sky-500/10 to-indigo-500/10 px-2.5 py-0.5 text-[10px] font-semibold text-[#0077b6] border border-sky-300/60 shadow-xs">
              <Sparkles className="h-2.5 w-2.5 text-[#0088cc]" />
              Novesta AI
            </span> */}
          </h1>
          <span className="text-[10px] text-slate-500 hidden md:block">
            Kolkata's Premier Residential Plots &amp; Bungalow Communities
          </span>
        </div>
      </div>

      {/* Right: Powered by QuarkGen with Logo */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2.5 rounded-full border border-sky-200/80 bg-white px-3.5 py-1.5 shadow-[0_2px_12px_rgba(0,136,204,0.08)]">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#0088cc] opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#0088cc]"></span>
          </span>
          <span className="text-[11px] font-medium text-slate-700">
            Powered by
          </span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/novesta-bot/quarkLogo.png"
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
