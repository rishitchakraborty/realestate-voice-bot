"use client";

import React, { useState } from "react";
import {
  AlertCircle,
  Calendar,
  ChevronDown,
  Info,
} from "lucide-react";
import {
  ALL_CALL_RECORDS,
  CallRecord,
  DispositionType,
  WORKFLOW_OPTIONS,
} from "./call-analytics-data";
import { DonutChart } from "./donut-chart";
import { StatCards } from "./stat-cards";
import { CallLogTable } from "./call-log-table";
import { FunnelWidgets } from "./funnel-widgets";
import { CallInfoModal } from "./call-info-modal";

export function CustomerCallAnalytics() {
  const [selectedWorkflow, setSelectedWorkflow] = useState(WORKFLOW_OPTIONS[0]);
  const [selectedTimeRange, setSelectedTimeRange] = useState<"Today" | "7 Days" | "30 Days">("30 Days");
  const [selectedDispositionFilter, setSelectedDispositionFilter] = useState<DispositionType | null>(null);
  const [inspectedCall, setInspectedCall] = useState<CallRecord | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleOpenSampleInfo = () => {
    // Open the first call or first booked visit call
    const sample = ALL_CALL_RECORDS.find((c) => c.disposition === "Site Visit Booked") || ALL_CALL_RECORDS[0];
    setInspectedCall(sample);
    setIsModalOpen(true);
  };

  const handleSelectCall = (call: CallRecord) => {
    setInspectedCall(call);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-full bg-[#f8fafc] text-slate-900">
      <div className="mx-auto max-w-[1600px] space-y-6 p-4 sm:p-6 lg:p-8">
        {/* 1. Top Notice Banner */}
        <div className="flex items-center justify-between rounded-xl border border-amber-200 bg-[#fffbeb] px-4 py-2.5 text-xs text-amber-900 shadow-2xs">
          <div className="flex items-center gap-2">
            <Info className="h-4 w-4 shrink-0 text-amber-600" />
            <span>
              <strong className="font-semibold">Sample data</strong> — for layout reference
              only, not real customer information.
            </span>
          </div>
          <span className="rounded-md border border-amber-300/80 bg-amber-100/70 px-2 py-0.5 text-[10px] font-bold tracking-wider text-amber-800 uppercase">
            MOCK UI
          </span>
        </div>

        {/* 2. Main Page Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Customer call analytics
            </h1>
            <p className="mt-1 text-xs text-slate-500">
              Priya — Alcove Realty outbound voice bot ·{" "}
              <span className="font-semibold text-slate-700">
                Powered by QuarkGen AI
              </span>
            </p>
          </div>

          {/* Header Action Controls */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={handleOpenSampleInfo}
              className="rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-xs transition-colors hover:bg-blue-700 cursor-pointer"
            >
              Check Call Info
            </button>

            {/* Time Range Pills */}
            <div className="flex items-center rounded-lg border border-slate-200 bg-white p-0.5 shadow-2xs text-xs font-medium text-slate-600">
              {(["Today", "7 Days", "30 Days"] as const).map((range) => {
                const isActive = selectedTimeRange === range;
                return (
                  <button
                    key={range}
                    type="button"
                    onClick={() => setSelectedTimeRange(range)}
                    className={`rounded-md px-3 py-1.5 transition-all cursor-pointer ${
                      isActive
                        ? "bg-blue-600 font-semibold text-white shadow-xs"
                        : "hover:bg-slate-50 text-slate-600"
                    }`}
                  >
                    {range}
                  </button>
                );
              })}
            </div>

            {/* Date Range Selection Button */}
            <button
              type="button"
              className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 shadow-2xs hover:bg-slate-50 cursor-pointer"
            >
              <Calendar className="h-3.5 w-3.5 text-slate-500" />
              <span>Date Range Selection</span>
            </button>

            {/* User Avatar */}
            <div
              className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0f172a] text-xs font-bold text-white shadow-xs"
              title="Admin User"
            >
              A
            </div>
          </div>
        </div>

        {/* 3. Workflow Selector Row */}
        <div className="flex flex-col gap-4 rounded-xl border border-slate-200/80 bg-white p-4 shadow-xs lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="relative">
              <span className="block text-[10px] font-bold tracking-wider text-slate-400 uppercase mb-1">
                SELECT WORKFLOW
              </span>
              <div className="relative">
                <select
                  value={selectedWorkflow.id}
                  onChange={(e) => {
                    const match = WORKFLOW_OPTIONS.find((w) => w.id === e.target.value);
                    if (match) setSelectedWorkflow(match);
                  }}
                  className="w-full sm:w-80 appearance-none rounded-lg border border-blue-500 bg-white px-3 py-2 pr-9 text-xs font-semibold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 cursor-pointer"
                >
                  {WORKFLOW_OPTIONS.map((opt) => (
                    <option key={opt.id} value={opt.id}>
                      {opt.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="text-xs text-slate-500 lg:max-w-md lg:text-right">
            Field names and disposition set below follow the{" "}
            <em className="font-semibold text-slate-700 not-italic">
              Alcove Call Analytics
            </em>{" "}
            brief — every label maps 1:1 to a LeadProfile field or a defined disposition.
          </div>
        </div>

        {/* 4. Top Analytics Row: Donut Chart + Stat Cards */}
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
          {/* Donut Chart Card */}
          <div className="xl:col-span-5 min-w-0">
            <DonutChart
              workflowName={selectedWorkflow.name}
              selectedDisposition={selectedDispositionFilter}
              onSelectDisposition={setSelectedDispositionFilter}
            />
          </div>

          {/* 6 Stat Cards Grid */}
          <div className="xl:col-span-7 min-w-0">
            <StatCards
              onExportCategory={(category) => {
                // Filter down to that category in table
                const match = ALL_CALL_RECORDS.filter(
                  (c) =>
                    c.disposition === category ||
                    (category === "Not Interested / DNC" &&
                      (c.disposition === "Not Interested" || c.disposition === "Do Not Call")),
                );
                alert(`Exporting ${match.length} calls for "${category}"`);
              }}
            />
          </div>
        </div>

        {/* 5. Call Log Table */}
        <CallLogTable
          calls={ALL_CALL_RECORDS}
          workflowName={selectedWorkflow.name}
          externalDispositionFilter={selectedDispositionFilter}
          onClearExternalFilter={() => setSelectedDispositionFilter(null)}
          onSelectCall={handleSelectCall}
        />

        {/* 6. Additional Analytics & Build Notes */}
        <FunnelWidgets />
      </div>

      {/* LeadProfile / Call Info Inspection Modal */}
      <CallInfoModal
        call={inspectedCall}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
