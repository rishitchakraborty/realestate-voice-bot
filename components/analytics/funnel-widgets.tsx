"use client";

import React from "react";
import {
  CALL_FUNNEL_DATA,
  PURPOSE_SPLIT_DATA,
  PROJECT_DEMAND_DATA,
} from "./call-analytics-data";

export function FunnelWidgets() {
  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div>
        <h3 className="text-base font-bold tracking-tight text-slate-900">
          Additional analytics to layer in
        </h3>
        <p className="mt-1 text-xs text-slate-500">
          A preview of three widgets from brief §05 — the script is a deterministic state
          machine, so funnel and preference data are already sitting in every LeadProfile.
        </p>
      </div>

      {/* 3 Widgets Grid */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Widget 1: Call funnel snapshot */}
        <div className="flex flex-col justify-between rounded-xl border border-slate-200/80 bg-white p-5 shadow-xs">
          <div>
            <h4 className="text-sm font-semibold tracking-tight text-slate-800">
              Call funnel snapshot
            </h4>
            <p className="mt-0.5 text-xs text-slate-400">
              Connected calls reaching each stage, 30 days
            </p>

            <div className="mt-5 space-y-3">
              {CALL_FUNNEL_DATA.map((item) => (
                <div key={item.stage} className="flex items-center justify-between text-xs">
                  <span className="w-28 shrink-0 text-slate-600 truncate" title={item.stage}>
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
                  <span className="w-6 text-right font-bold text-slate-900 tabular-nums">
                    {item.count}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Widget 2: Purpose split */}
        <div className="flex flex-col justify-between rounded-xl border border-slate-200/80 bg-white p-5 shadow-xs">
          <div>
            <h4 className="text-sm font-semibold tracking-tight text-slate-800">
              Purpose split
            </h4>
            <p className="mt-0.5 text-xs text-slate-400">
              Investment vs. self-use, connected calls
            </p>

            <div className="mt-5 space-y-3">
              {PURPOSE_SPLIT_DATA.map((item) => (
                <div key={item.purpose} className="flex items-center justify-between text-xs">
                  <span className="w-28 shrink-0 text-slate-600">
                    {item.purpose}
                  </span>
                  <div className="mx-3 flex-1">
                    <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-blue-600 transition-all duration-500"
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                  <span className="w-6 text-right font-bold text-slate-900 tabular-nums">
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
              Project demand
            </h4>
            <p className="mt-0.5 text-xs text-slate-400">
              Leads by micro-market, all projects, 30 days
            </p>

            <div className="mt-5 space-y-3">
              {PROJECT_DEMAND_DATA.map((item) => (
                <div key={item.location} className="flex items-center justify-between text-xs">
                  <span className="w-28 shrink-0 text-slate-600 truncate" title={item.location}>
                    {item.location}
                  </span>
                  <div className="mx-3 flex-1">
                    <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-blue-600 transition-all duration-500"
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                  <span className="w-6 text-right font-bold text-slate-900 tabular-nums">
                    {item.count}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Notes for the build card */}
      <div className="rounded-xl border border-slate-200/80 bg-white p-6 shadow-xs">
        <h4 className="text-sm font-bold text-slate-900">
          Notes for the build — not part of the visual design
        </h4>
        <ul className="mt-3 space-y-2 text-xs leading-relaxed text-slate-600">
          <li className="flex items-start gap-2">
            <span className="text-slate-400">•</span>
            <span>
              All phone numbers, names, session IDs and figures on this page are fabricated for layout purposes only.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-slate-400">•</span>
            <span>
              The Call Recording play button is shown disabled everywhere — capture isn&apos;t wired up yet (brief §08). Ship the column now; it lights up once egress recording lands.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-slate-400">•</span>
            <span>
              Disposition colors, order, and the donut ring are one fixed palette used consistently across the ring, legend, stat cards and table chip — never remap a color to a different meaning elsewhere on the page.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-slate-400">•</span>
            <span>
              Rows with Not Reachable or Wrong Number never had a real conversation, so Purpose, Configuration, Budget, Lead Score and Sentiment are correctly blank, not zero.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-slate-400">•</span>
            <span>
              Full field dictionary, disposition definitions and the post-call LLM schema are in the companion <em>Alcove Call Analytics</em> brief.
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
