"use client";

import React from "react";
import {
  CALL_FUNNEL_DATA as DEFAULT_FUNNEL,
  PURPOSE_SPLIT_DATA as DEFAULT_SPLIT,
  PROJECT_DEMAND_DATA as DEFAULT_DEMAND,
  FunnelMetric,
} from "./call-analytics-data";

interface FunnelWidgetsProps {
  funnelData?: FunnelMetric[];
  splitTitle?: string;
  splitSubtitle?: string;
  splitData?: { label: string; count: number; percentage: number }[];
  projectDemandTitle?: string;
  projectDemandSubtitle?: string;
  projectDemand?: { location: string; count: number; percentage: number }[];
  flowTitle?: string;
}

export function FunnelWidgets({
  funnelData = DEFAULT_FUNNEL,
  splitTitle = "Property Preference Split",
  splitSubtitle = "Plotted township development vs. luxury residential flats",
  splitData = DEFAULT_SPLIT.map((d) => ({
    label: (d as any).label || (d as any).purpose,
    count: d.count,
    percentage: d.percentage,
  })),
  projectDemandTitle = "Township Demand Distribution",
  projectDemandSubtitle = "Leads by Novesta project location, 30-day window",
  projectDemand = DEFAULT_DEMAND,
  flowTitle,
}: FunnelWidgetsProps) {
  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div>
        <h3 className="text-base font-bold tracking-tight text-slate-900">
          Conversion Funnel &amp; Buyer Demand Dynamics
        </h3>
        <p className="mt-1 text-xs text-slate-500">
          {flowTitle ? `Performance metrics for ${flowTitle}` : "Real-time pipeline progression, configuration preferences, and location interest across Novesta portfolio."}
        </p>
      </div>

      {/* 3 Widgets Grid */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Widget 1: Call funnel snapshot */}
        <div className="flex flex-col justify-between rounded-xl border border-slate-200/80 bg-white p-5 shadow-xs">
          <div>
            <h4 className="text-sm font-semibold tracking-tight text-slate-800">
              Call Funnel Snapshot
            </h4>
            <p className="mt-0.5 text-xs text-slate-400">
              Connected calls progressing through conversational stages
            </p>

            <div className="mt-5 space-y-3">
              {funnelData.map((item) => (
                <div
                  key={item.stage}
                  className="flex items-center justify-between text-xs"
                >
                  <span
                    className="w-32 shrink-0 text-slate-600 truncate"
                    title={item.stage}
                  >
                    {item.stage}
                  </span>
                  <div className="mx-3 flex-1">
                    <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-blue-600 transition-all duration-500"
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                  <span className="w-8 text-right font-bold text-slate-900 tabular-nums">
                    {item.count}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Widget 2: Preference split */}
        <div className="flex flex-col justify-between rounded-xl border border-slate-200/80 bg-white p-5 shadow-xs">
          <div>
            <h4 className="text-sm font-semibold tracking-tight text-slate-800">
              {splitTitle}
            </h4>
            <p className="mt-0.5 text-xs text-slate-400">
              {splitSubtitle}
            </p>

            <div className="mt-5 space-y-3">
              {splitData.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between text-xs"
                >
                  <span
                    className="w-36 shrink-0 text-slate-600 truncate"
                    title={item.label}
                  >
                    {item.label}
                  </span>
                  <div className="mx-3 flex-1">
                    <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-amber-500 transition-all duration-500"
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                  <span className="w-8 text-right font-bold text-slate-900 tabular-nums">
                    {item.count}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Widget 3: Project demand */}
        <div className="flex flex-col justify-between rounded-xl border border-slate-200/80 bg-white p-5 shadow-xs">
          <div>
            <h4 className="text-sm font-semibold tracking-tight text-slate-800">
              {projectDemandTitle}
            </h4>
            <p className="mt-0.5 text-xs text-slate-400">
              {projectDemandSubtitle}
            </p>

            <div className="mt-5 space-y-3">
              {projectDemand.map((item) => (
                <div
                  key={item.location}
                  className="flex items-center justify-between text-xs"
                >
                  <span
                    className="w-36 shrink-0 text-slate-600 truncate"
                    title={item.location}
                  >
                    {item.location}
                  </span>
                  <div className="mx-3 flex-1">
                    <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-emerald-600 transition-all duration-500"
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                  <span className="w-8 text-right font-bold text-slate-900 tabular-nums">
                    {item.count}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
