"use client";

import React from "react";
import { Phone, PhoneOff } from "lucide-react";
import { DispositionType } from "./call-analytics-data";

interface StatCardsProps {
  onExportCategory?: (category: string) => void;
  onFilterCategory?: (disposition: DispositionType | "Connected" | "Not Interested / DNC") => void;
}

export function StatCards({ onExportCategory, onFilterCategory }: StatCardsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {/* 1. Total Connected Calls */}
      <div className="relative flex flex-col justify-between rounded-xl border border-slate-200/80 bg-white p-5 shadow-xs">
        <div className="flex items-start justify-between">
          <div>
            <h4 className="text-sm font-semibold tracking-tight text-slate-800">
              Total Connected Calls
            </h4>
            <p className="mt-1 text-xs text-slate-400">
              Bot session actually started, any outcome.
            </p>
          </div>
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
            <Phone className="h-4 w-4" />
          </div>
        </div>
        <div className="mt-6 flex items-baseline">
          <span className="text-3xl font-extrabold tracking-tight text-slate-900">
            92
          </span>
        </div>
      </div>

      {/* 2. Site Visits Booked */}
      <div className="relative flex flex-col justify-between rounded-xl border border-slate-200/80 bg-white p-5 shadow-xs">
        <div>
          <h4 className="text-sm font-semibold tracking-tight text-slate-800">
            Site Visits Booked
          </h4>
          <p className="mt-1 text-xs text-slate-400">
            Reached S9 and accepted a day/time slot.
          </p>
        </div>
        <div className="mt-6 flex items-end justify-between">
          <span className="text-3xl font-extrabold tracking-tight text-slate-900">
            8
          </span>
          <button
            type="button"
            onClick={() => onExportCategory?.("Site Visit Booked")}
            className="rounded-md border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600 shadow-2xs transition-colors hover:bg-slate-50 hover:text-slate-900 cursor-pointer"
          >
            Export
          </button>
        </div>
      </div>

      {/* 3. Not Interested / DNC */}
      <div className="relative flex flex-col justify-between rounded-xl border border-slate-200/80 bg-white p-5 shadow-xs">
        <div>
          <h4 className="text-sm font-semibold tracking-tight text-slate-800">
            Not Interested / DNC
          </h4>
          <p className="mt-1 text-xs text-slate-400">
            Explicit declines plus do-not-call requests.
          </p>
        </div>
        <div className="mt-6 flex items-end justify-between">
          <span className="text-3xl font-extrabold tracking-tight text-slate-900">
            43
          </span>
          <button
            type="button"
            onClick={() => onExportCategory?.("Not Interested / DNC")}
            className="rounded-md border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600 shadow-2xs transition-colors hover:bg-slate-50 hover:text-slate-900 cursor-pointer"
          >
            Export
          </button>
        </div>
      </div>

      {/* 4. Not Reachable */}
      <div className="relative flex flex-col justify-between rounded-xl border border-slate-200/80 bg-white p-5 shadow-xs">
        <div className="flex items-start justify-between">
          <div>
            <h4 className="text-sm font-semibold tracking-tight text-slate-800">
              Not Reachable
            </h4>
            <p className="mt-1 text-xs text-slate-400">
              No answer, busy, or SIP failure — telephony layer.
            </p>
          </div>
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-50 text-red-500">
            <PhoneOff className="h-4 w-4" />
          </div>
        </div>
        <div className="mt-6 flex items-baseline">
          <span className="text-3xl font-extrabold tracking-tight text-slate-900">
            28
          </span>
        </div>
      </div>

      {/* 5. Answered, Dropped Mid-Call */}
      <div className="relative flex flex-col justify-between rounded-xl border border-slate-200/80 bg-white p-5 shadow-xs">
        <div>
          <h4 className="text-sm font-semibold tracking-tight text-slate-800">
            Answered, Dropped Mid-Call
          </h4>
          <p className="mt-1 text-xs text-slate-400">
            Connected and talking, then disconnected — no disposition fired.
          </p>
        </div>
        <div className="mt-6 flex items-end justify-between">
          <span className="text-3xl font-extrabold tracking-tight text-slate-900">
            10
          </span>
          <button
            type="button"
            onClick={() => onExportCategory?.("Dropped Mid-Call")}
            className="rounded-md border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600 shadow-2xs transition-colors hover:bg-slate-50 hover:text-slate-900 cursor-pointer"
          >
            Export
          </button>
        </div>
      </div>

      {/* 6. No Response (Silence Timeout) */}
      <div className="relative flex flex-col justify-between rounded-xl border border-slate-200/80 bg-white p-5 shadow-xs">
        <div>
          <h4 className="text-sm font-semibold tracking-tight text-slate-800">
            No Response (Silence Timeout)
          </h4>
          <p className="mt-1 text-xs text-slate-400">
            Connected, bot spoke, caller never responded.
          </p>
        </div>
        <div className="mt-6 flex items-end justify-between">
          <span className="text-3xl font-extrabold tracking-tight text-slate-900">
            11
          </span>
          <button
            type="button"
            onClick={() => onExportCategory?.("No Response")}
            className="rounded-md border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600 shadow-2xs transition-colors hover:bg-slate-50 hover:text-slate-900 cursor-pointer"
          >
            Export
          </button>
        </div>
      </div>
    </div>
  );
}
