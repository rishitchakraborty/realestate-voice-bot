"use client";

import React from "react";
import { PhoneCall, BarChart2, LogOut } from "lucide-react";
import { motion } from "motion/react";
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
  const navItems = [
    {
      id: "live-call",
      label: "Live Call",
      icon: PhoneCall,
      iconColorActive: "text-[#c9a24c]",
      gradient: "from-[#c9a24c] via-[#0088cc] to-[#0ea5e9]",
    },
    {
      id: "analytics",
      label: "Analytics",
      icon: BarChart2,
      iconColorActive: "text-[#0088cc]",
      gradient: "from-[#0088cc] to-[#6366f1]",
    },
  ];

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
          <div className="flex h-11 w-full items-center justify-center rounded-xl bg-[#0e1230] p-1.5 transition-transform duration-200 hover:scale-105 border border-[#c9a24c]/30 shadow-xs">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={logoUrl}
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
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onTabChange?.(item.id)}
                className="group relative flex w-full flex-col items-center justify-center rounded-xl p-2.5 cursor-pointer select-none"
                title={item.label}
              >
                {/* Smooth Animated Active Background Pill */}
                {isActive && (
                  <motion.div
                    layoutId="sidebarActivePill"
                    className="absolute inset-0 rounded-xl bg-[#0e1230] shadow-md shadow-[#0e1230]/20 border border-[#c9a24c]/30"
                    transition={{
                      type: "spring",
                      stiffness: 450,
                      damping: 34,
                    }}
                  />
                )}

                {/* Smooth Animated Left Accent Indicator */}
                {isActive && (
                  <motion.span
                    layoutId="sidebarActiveIndicator"
                    className={cn(
                      "absolute left-0 top-1/2 h-7 w-1 -translate-y-1/2 rounded-r-full bg-gradient-to-b z-20",
                      item.gradient,
                    )}
                    transition={{
                      type: "spring",
                      stiffness: 450,
                      damping: 34,
                    }}
                  />
                )}

                {/* Hover Background when not active */}
                {!isActive && (
                  <span className="absolute inset-0 rounded-xl transition-colors duration-150 group-hover:bg-slate-100/90" />
                )}

                {/* Button Content */}
                <div className="relative z-10 flex flex-col items-center justify-center">
                  <Icon
                    className={cn(
                      "h-5 w-5 transition-transform duration-200 group-hover:scale-110",
                      isActive
                        ? item.iconColorActive
                        : "text-slate-500 group-hover:text-slate-900",
                    )}
                  />
                  <span
                    className={cn(
                      "mt-1.5 text-[10px] font-medium tracking-tight text-center leading-tight transition-colors duration-150",
                      isActive
                        ? "text-white font-semibold"
                        : "text-slate-500 group-hover:text-slate-900",
                    )}
                  >
                    {item.label}
                  </span>
                </div>
              </button>
            );
          })}
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
          <div className="flex items-center justify-center rounded-lg bg-sky-50/50 border border-sky-200/80 p-1 w-full shadow-2xs">
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
