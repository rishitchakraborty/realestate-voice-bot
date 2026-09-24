"use client";

import React from "react";
import {
  Phone,
  PhoneOff,
  Calendar,
  Building2,
  Car,
  Clock,
  UserX,
  MessageSquareShare,
} from "lucide-react";
import { DispositionType, StatCardItem } from "./call-analytics-data";

interface StatCardsProps {
  items?: StatCardItem[];
  onExportCategory?: (category: string) => void;
  onFilterCategory?: (
    disposition: DispositionType | "Connected" | "Not Interested / DNC",
  ) => void;
}

function StatIcon({ icon }: { icon: StatCardItem["icon"] }) {
  switch (icon) {
    case "whatsapp":
      return <MessageSquareShare className="h-4 w-4" />;
    case "calendar":
      return <Calendar className="h-4 w-4" />;
    case "building":
      return <Building2 className="h-4 w-4" />;
    case "car":
      return <Car className="h-4 w-4" />;
    case "clock":
      return <Clock className="h-4 w-4" />;
    case "user-x":
      return <UserX className="h-4 w-4" />;
    case "phone-off":
      return <PhoneOff className="h-4 w-4" />;
    case "phone":
    default:
      return <Phone className="h-4 w-4" />;
  }
}

export function StatCards({ items, onExportCategory }: StatCardsProps) {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item, index) => {
        const isExportable = Boolean(item.exportCategory);

        return (
          <div
            key={item.title + index}
            className="relative flex flex-col justify-between rounded-xl border border-slate-200/80 bg-white p-5 shadow-xs transition-shadow hover:shadow-sm"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <h4 className="text-sm font-semibold tracking-tight text-slate-800">
                    {item.title}
                  </h4>
                  {item.badge && (
                    <span className="inline-flex items-center rounded-md bg-sky-50 border border-sky-200 px-1.5 py-0.2 text-[9.5px] font-bold text-sky-700">
                      {item.badge}
                    </span>
                  )}
                </div>
                <p className="mt-1 text-xs text-slate-500 leading-snug">
                  {item.subtitle}
                </p>
              </div>

              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-50 text-slate-700 border border-slate-200/60">
                <StatIcon icon={item.icon} />
              </div>
            </div>

            <div className="mt-5 flex items-end justify-between">
              <span className="text-3xl font-extrabold tracking-tight text-slate-900 tabular-nums">
                {item.count}
              </span>

              {isExportable && (
                <button
                  type="button"
                  onClick={() => onExportCategory?.(item.exportCategory!)}
                  className="rounded-md border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600 shadow-2xs transition-colors hover:bg-slate-50 hover:text-slate-900 cursor-pointer"
                >
                  Export
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
