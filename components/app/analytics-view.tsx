"use client";

import React, { useState, useMemo } from "react";
import {
  Phone,
  PhoneOff,
  Calendar,
  Download,
  Filter,
  RotateCcw,
  Play,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Info,
  CheckCircle2,
  ChevronDown,
  Sparkles,
  Search,
} from "lucide-react";
import {
  DISPOSITIONS,
  DISPOSITIONS_LIST,
  ANALYTICS_SUMMARY,
  MOCK_CALL_LOGS,
  FUNNEL_DATA,
  PURPOSE_SPLIT_DATA,
  PROJECT_DEMAND_DATA,
  WORKFLOWS,
  BUILD_NOTES,
  CallLogItem,
} from "@/lib/mock-analytics-data";
import { cn } from "@/lib/shadcn/utils";
import { toast } from "sonner";

export function AnalyticsView() {
  const [selectedPeriod, setSelectedPeriod] = useState<"today" | "7d" | "30d">(
    "30d",
  );
  const [selectedWorkflow, setSelectedWorkflow] = useState(WORKFLOWS[0].id);
  const [hoveredSlice, setHoveredSlice] = useState<string | null>(null);

  // Filters for the table columns
  const [filters, setFilters] = useState({
    customerName: "",
    phoneNumber: "",
    callType: "",
    sessionId: "",
    duration: "",
    language: "",
    purpose: "",
    preferredLocation: "",
    configuration: "",
    budgetRange: "",
    disposition: "",
  });

  // Table pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Filtered Call Logs
  const filteredLogs = useMemo(() => {
    return MOCK_CALL_LOGS.filter((item) => {
      const matchName = item.customerName
        .toLowerCase()
        .includes(filters.customerName.toLowerCase());
      const matchPhone = item.phoneNumber
        .toLowerCase()
        .includes(filters.phoneNumber.toLowerCase());
      const matchType = item.callType
        .toLowerCase()
        .includes(filters.callType.toLowerCase());
      const matchSession = item.sessionId
        .toLowerCase()
        .includes(filters.sessionId.toLowerCase());
      const matchDuration = item.duration
        .toLowerCase()
        .includes(filters.duration.toLowerCase());
      const matchLang = item.language
        .toLowerCase()
        .includes(filters.language.toLowerCase());
      const matchPurpose = item.purpose
        .toLowerCase()
        .includes(filters.purpose.toLowerCase());
      const matchLoc = item.preferredLocation
        .toLowerCase()
        .includes(filters.preferredLocation.toLowerCase());
      const matchConfig = item.configuration
        .toLowerCase()
        .includes(filters.configuration.toLowerCase());
      const matchBudget = item.budgetRange
        .toLowerCase()
        .includes(filters.budgetRange.toLowerCase());
      const dispLabel = DISPOSITIONS[item.dispositionKey]?.label || "";
      const matchDisp = dispLabel
        .toLowerCase()
        .includes(filters.disposition.toLowerCase());

      return (
        matchName &&
        matchPhone &&
        matchType &&
        matchSession &&
        matchDuration &&
        matchLang &&
        matchPurpose &&
        matchLoc &&
        matchConfig &&
        matchBudget &&
        matchDisp
      );
    });
  }, [filters]);

  const totalPages = Math.max(1, Math.ceil(filteredLogs.length / pageSize));
  const paginatedLogs = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredLogs.slice(start, start + pageSize);
  }, [filteredLogs, currentPage, pageSize]);

  const handleFilterChange = (field: keyof typeof filters, value: string) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setFilters({
      customerName: "",
      phoneNumber: "",
      callType: "",
      sessionId: "",
      duration: "",
      language: "",
      purpose: "",
      preferredLocation: "",
      configuration: "",
      budgetRange: "",
      disposition: "",
    });
    setCurrentPage(1);
    toast.info("Filters reset");
  };

  const handleExport = (metricName: string) => {
    toast.success(`Exporting ${metricName} dataset...`);
  };

  // Donut chart geometry calculations
  const totalCalls = ANALYTICS_SUMMARY.totalCalls;
  const radius = 58;
  const circumference = 2 * Math.PI * radius;
  let accumulatedOffset = 0;

  const donutSlices = DISPOSITIONS_LIST.map((item) => {
    const sliceLength = (item.count / totalCalls) * circumference;
    const strokeDashoffset = -accumulatedOffset;
    accumulatedOffset += sliceLength;
    return {
      ...item,
      strokeDasharray: `${sliceLength} ${circumference - sliceLength}`,
      strokeDashoffset,
    };
  });

  return (
    <div className="h-full w-full overflow-y-auto bg-slate-50/70 dark:bg-slate-950 p-4 sm:p-6 lg:p-7 space-y-6">
      {/* Sample Data Disclaimer Top Banner */}
      <div className="flex items-center justify-between gap-3 rounded-xl border border-amber-300/80 bg-amber-50 px-4 py-2.5 text-xs font-medium text-amber-900 shadow-xs dark:border-amber-700/50 dark:bg-amber-950/30 dark:text-amber-300">
        <div className="flex items-center gap-2">
          <Info className="h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400" />
          <span>
            <strong className="font-semibold">Sample data</strong> — for layout
            reference only, not real customer information.
          </span>
        </div>
        <span className="hidden sm:inline-flex rounded-md bg-amber-200/60 px-2 py-0.5 text-[11px] font-semibold text-amber-800 dark:bg-amber-900/60 dark:text-amber-200">
          MOCK UI
        </span>
      </div>

      {/* TOP HEADER SECTION */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-2xl">
            Customer call analytics
          </h1>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 sm:text-sm">
            Meera — Godrej Properties outbound voice bot ·{" "}
            <span className="font-medium text-slate-700 dark:text-slate-300">
              Powered by QuarkGen AI
            </span>
          </p>
        </div>

        {/* Right Controls */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={() => toast.info("Opening live call info diagnostics")}
            className="rounded-lg bg-blue-600 px-3.5 py-1.5 text-xs font-medium text-white shadow-xs hover:bg-blue-700 active:scale-95 transition-all cursor-pointer"
          >
            Check Call Info
          </button>

          {/* Period Tabs */}
          <div className="flex items-center rounded-lg border border-slate-200 bg-white p-0.5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
            {(["today", "7d", "30d"] as const).map((p) => {
              const labels = {
                today: "Today",
                "7d": "7 Days",
                "30d": "30 Days",
              };
              const isActive = selectedPeriod === p;
              return (
                <button
                  key={p}
                  type="button"
                  onClick={() => setSelectedPeriod(p)}
                  className={cn(
                    "rounded-md px-3 py-1 text-xs font-medium transition-all cursor-pointer",
                    isActive
                      ? "bg-blue-600 text-white shadow-xs"
                      : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200",
                  )}
                >
                  {labels[p]}
                </button>
              );
            })}
          </div>

          {/* Date Range Selection */}
          <button
            type="button"
            onClick={() => toast.info("Date range selector modal")}
            className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-xs hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800/80 cursor-pointer"
          >
            <Calendar className="h-3.5 w-3.5 text-slate-400" />
            <span>Date Range Selection</span>
          </button>

          {/* User Avatar */}
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold text-white shadow-xs ring-2 ring-white dark:bg-slate-800 dark:ring-slate-700">
            A
          </div>
        </div>
      </div>

      {/* SELECT WORKFLOW ROW */}
      <div className="flex flex-col gap-2 rounded-xl border border-slate-200/80 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900 lg:flex-row lg:items-center lg:justify-between">
        <div className="w-full lg:max-w-md">
          <label className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Select Workflow
          </label>
          <div className="relative">
            <select
              value={selectedWorkflow}
              onChange={(e) => setSelectedWorkflow(e.target.value)}
              className="w-full appearance-none rounded-lg border border-slate-300 bg-slate-50 px-3.5 py-2 pr-9 text-xs font-semibold text-slate-900 shadow-2xs focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            >
              {WORKFLOWS.map((wf) => (
                <option key={wf.id} value={wf.id}>
                  {wf.name}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          </div>
        </div>
        <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400 lg:max-w-xl">
          Field names and disposition set below follow the{" "}
          <em className="font-semibold text-slate-700 dark:text-slate-300">
            Meera Call Analytics
          </em>{" "}
          brief — every label maps 1:1 to a LeadProfile field or a defined
          disposition.
        </p>
      </div>

      {/* OVERVIEW METRICS: DONUT CHART + 6 STAT CARDS */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
        {/* DONUT CHART CARD */}
        <div className="flex flex-col justify-between rounded-xl border border-slate-200/80 bg-white p-4 sm:p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900 lg:col-span-12 xl:col-span-5">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              {ANALYTICS_SUMMARY.dateRangeLabel}
            </div>
            <h2 className="mt-0.5 text-sm font-bold text-slate-900 dark:text-white">
              Total calls — Godrej Verdant (GDJ-VERDANT)
            </h2>
          </div>

          <div className="my-4 flex flex-col items-center justify-between gap-5 sm:flex-row">
            {/* SVG Donut */}
            <div className="relative flex shrink-0 items-center justify-center">
              <svg
                width="150"
                height="150"
                viewBox="0 0 150 150"
                className="rotate-[-90deg]"
              >
                {donutSlices.map((slice) => {
                  const isHovered = hoveredSlice === slice.key;
                  return (
                    <circle
                      key={slice.key}
                      cx="75"
                      cy="75"
                      r={radius}
                      fill="transparent"
                      stroke={slice.color}
                      strokeWidth={isHovered ? 21 : 18}
                      strokeDasharray={slice.strokeDasharray}
                      strokeDashoffset={slice.strokeDashoffset}
                      strokeLinecap="butt"
                      className="transition-all duration-200 cursor-pointer"
                      onMouseEnter={() => setHoveredSlice(slice.key)}
                      onMouseLeave={() => setHoveredSlice(null)}
                    />
                  );
                })}
              </svg>

              {/* Donut Center Label */}
              <div className="pointer-events-none absolute flex flex-col items-center justify-center text-center">
                <span className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                  {totalCalls}
                </span>
                <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                  Total Calls
                </span>
              </div>
            </div>

            {/* Donut Legend */}
            <div className="flex w-full flex-1 min-w-0 flex-col gap-1 sm:pl-2">
              {DISPOSITIONS_LIST.map((item) => {
                const isHovered = hoveredSlice === item.key;
                return (
                  <div
                    key={item.key}
                    onMouseEnter={() => setHoveredSlice(item.key)}
                    onMouseLeave={() => setHoveredSlice(null)}
                    className={cn(
                      "flex items-center justify-between gap-1.5 rounded px-2 py-0.5 text-[11px] transition-all cursor-pointer",
                      isHovered
                        ? "bg-slate-100 dark:bg-slate-800 font-semibold"
                        : "hover:bg-slate-50 dark:hover:bg-slate-800/50",
                    )}
                  >
                    <div className="flex min-w-0 items-center gap-1.5 truncate">
                      <span
                        className="h-2.5 w-2.5 shrink-0 rounded-xs"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="truncate text-slate-700 dark:text-slate-300">
                        {item.label}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 pl-1 shrink-0 font-medium tabular-nums">
                      <span className="text-slate-900 dark:text-white font-bold min-w-[14px] text-right">
                        {item.count}
                      </span>
                      <span className="w-10 text-right text-[10px] text-slate-400">
                        {item.percentage}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <p className="border-t border-slate-100 pt-3 text-[11px] leading-snug text-slate-400 dark:border-slate-800">
            Hover a ring segment for its exact count. Every value here is also a
            filterable column in the call log below.
          </p>
        </div>

        {/* 6 STAT CARDS GRID */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-12 xl:col-span-7 xl:grid-cols-3">
          {/* Card 1: Total Connected Calls */}
          <div className="flex flex-col justify-between rounded-xl border border-slate-200/80 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900">
            <div>
              <div className="flex items-start justify-between">
                <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  Total Connected Calls
                </h3>
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400">
                  <Phone className="h-4 w-4" />
                </div>
              </div>
              <p className="mt-1 text-[11px] text-slate-400">
                Bot session actually started, any outcome.
              </p>
            </div>
            <div className="mt-4 text-3xl font-black text-slate-900 dark:text-white">
              {ANALYTICS_SUMMARY.totalConnectedCalls}
            </div>
          </div>

          {/* Card 2: Site Visits Booked */}
          <div className="flex flex-col justify-between rounded-xl border border-slate-200/80 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900">
            <div>
              <div className="flex items-start justify-between">
                <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  Site Visits Booked
                </h3>
              </div>
              <p className="mt-1 text-[11px] text-slate-400">
                Reached S9 and accepted a day/time slot.
              </p>
            </div>
            <div className="mt-4 flex items-end justify-between">
              <span className="text-3xl font-black text-slate-900 dark:text-white">
                {ANALYTICS_SUMMARY.siteVisitsBooked}
              </span>
              <button
                type="button"
                onClick={() => handleExport("Site Visits Booked")}
                className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700/70 cursor-pointer"
              >
                Export
              </button>
            </div>
          </div>

          {/* Card 3: Not Interested / DNC */}
          <div className="flex flex-col justify-between rounded-xl border border-slate-200/80 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900">
            <div>
              <div className="flex items-start justify-between">
                <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  Not Interested / DNC
                </h3>
              </div>
              <p className="mt-1 text-[11px] text-slate-400">
                Explicit declines plus do-not-call requests.
              </p>
            </div>
            <div className="mt-4 flex items-end justify-between">
              <span className="text-3xl font-black text-slate-900 dark:text-white">
                {ANALYTICS_SUMMARY.notInterestedDnc}
              </span>
              <button
                type="button"
                onClick={() => handleExport("Not Interested / DNC")}
                className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700/70 cursor-pointer"
              >
                Export
              </button>
            </div>
          </div>

          {/* Card 4: Not Reachable */}
          <div className="flex flex-col justify-between rounded-xl border border-slate-200/80 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900">
            <div>
              <div className="flex items-start justify-between">
                <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  Not Reachable
                </h3>
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-red-50 text-red-600 dark:bg-red-950 dark:text-red-400">
                  <PhoneOff className="h-4 w-4" />
                </div>
              </div>
              <p className="mt-1 text-[11px] text-slate-400">
                No answer, busy, or SIP failure — telephony layer.
              </p>
            </div>
            <div className="mt-4 text-3xl font-black text-slate-900 dark:text-white">
              {ANALYTICS_SUMMARY.notReachable}
            </div>
          </div>

          {/* Card 5: Answered, Dropped Mid-Call */}
          <div className="flex flex-col justify-between rounded-xl border border-slate-200/80 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900">
            <div>
              <div className="flex items-start justify-between">
                <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  Answered, Dropped Mid-Call
                </h3>
              </div>
              <p className="mt-1 text-[11px] text-slate-400">
                Connected and talking, then disconnected — no disposition fired.
              </p>
            </div>
            <div className="mt-4 flex items-end justify-between">
              <span className="text-3xl font-black text-slate-900 dark:text-white">
                {ANALYTICS_SUMMARY.droppedMidCall}
              </span>
              <button
                type="button"
                onClick={() => handleExport("Dropped Mid-Call")}
                className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700/70 cursor-pointer"
              >
                Export
              </button>
            </div>
          </div>

          {/* Card 6: No Response (Silence Timeout) */}
          <div className="flex flex-col justify-between rounded-xl border border-slate-200/80 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900">
            <div>
              <div className="flex items-start justify-between">
                <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  No Response (Silence Timeout)
                </h3>
              </div>
              <p className="mt-1 text-[11px] text-slate-400">
                Connected, bot spoke, caller never responded.
              </p>
            </div>
            <div className="mt-4 flex items-end justify-between">
              <span className="text-3xl font-black text-slate-900 dark:text-white">
                {ANALYTICS_SUMMARY.noResponseSilence}
              </span>
              <button
                type="button"
                onClick={() => handleExport("No Response (Silence)")}
                className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700/70 cursor-pointer"
              >
                Export
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* CALL LOG TABLE SECTION */}
      <div className="rounded-xl border border-slate-200/80 bg-white shadow-xs dark:border-slate-800 dark:bg-slate-900">
        {/* Table Top Toolbar */}
        <div className="flex flex-col gap-3 border-b border-slate-200/80 p-4 sm:flex-row sm:items-center sm:justify-between dark:border-slate-800">
          <div>
            <h2 className="text-sm font-bold text-slate-900 dark:text-white">
              Call log — Godrej Verdant (GDJ-VERDANT)
            </h2>
            <p className="text-xs text-slate-400">
              {filteredLogs.length} of {ANALYTICS_SUMMARY.totalCalls} calls
              shown
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => toast.success("Filters applied")}
              className="rounded-lg bg-blue-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow-xs hover:bg-blue-700 active:scale-95 transition-all cursor-pointer"
            >
              Apply Filter
            </button>
            <button
              type="button"
              onClick={handleClearFilters}
              className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 cursor-pointer"
            >
              Clear
            </button>
            <button
              type="button"
              onClick={() => handleExport("Call Logs")}
              className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 cursor-pointer"
            >
              <Download className="h-3.5 w-3.5 text-slate-400" />
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* Responsive Table Area */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1200px] text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200/80 bg-slate-50/50 text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:border-slate-800 dark:bg-slate-800/40 dark:text-slate-400">
                <th className="px-3 py-2.5">Customer Name</th>
                <th className="px-3 py-2.5">Phone Number</th>
                <th className="px-3 py-2.5">Call Type</th>
                <th className="px-3 py-2.5">Session ID</th>
                <th className="px-3 py-2.5">Duration</th>
                <th className="px-3 py-2.5 text-center">Recording</th>
                <th className="px-3 py-2.5">Language</th>
                <th className="px-3 py-2.5">Purpose</th>
                <th className="px-3 py-2.5">Preferred Location</th>
                <th className="px-3 py-2.5">Configuration</th>
                <th className="px-3 py-2.5">Budget Range</th>
                <th className="px-3 py-2.5">Disposition</th>
              </tr>

              {/* Per-Column Filter Input Row */}
              <tr className="border-b border-slate-200/80 bg-slate-50/80 dark:border-slate-800 dark:bg-slate-800/60">
                <th className="px-2 py-1.5 font-normal">
                  <input
                    type="text"
                    placeholder="Filter"
                    value={filters.customerName}
                    onChange={(e) =>
                      handleFilterChange("customerName", e.target.value)
                    }
                    className="w-full rounded border border-slate-200 bg-white px-2 py-1 text-[11px] text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                  />
                </th>
                <th className="px-2 py-1.5 font-normal">
                  <input
                    type="text"
                    placeholder="Filter"
                    value={filters.phoneNumber}
                    onChange={(e) =>
                      handleFilterChange("phoneNumber", e.target.value)
                    }
                    className="w-full rounded border border-slate-200 bg-white px-2 py-1 text-[11px] text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                  />
                </th>
                <th className="px-2 py-1.5 font-normal">
                  <input
                    type="text"
                    placeholder="Filter"
                    value={filters.callType}
                    onChange={(e) =>
                      handleFilterChange("callType", e.target.value)
                    }
                    className="w-full rounded border border-slate-200 bg-white px-2 py-1 text-[11px] text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                  />
                </th>
                <th className="px-2 py-1.5 font-normal">
                  <input
                    type="text"
                    placeholder="Filter"
                    value={filters.sessionId}
                    onChange={(e) =>
                      handleFilterChange("sessionId", e.target.value)
                    }
                    className="w-full rounded border border-slate-200 bg-white px-2 py-1 text-[11px] text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                  />
                </th>
                <th className="px-2 py-1.5 font-normal">
                  <input
                    type="text"
                    placeholder="Filter"
                    value={filters.duration}
                    onChange={(e) =>
                      handleFilterChange("duration", e.target.value)
                    }
                    className="w-full rounded border border-slate-200 bg-white px-2 py-1 text-[11px] text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                  />
                </th>
                <th className="px-2 py-1.5 font-normal text-center">
                  <span className="text-[10px] text-slate-400">—</span>
                </th>
                <th className="px-2 py-1.5 font-normal">
                  <input
                    type="text"
                    placeholder="Filter"
                    value={filters.language}
                    onChange={(e) =>
                      handleFilterChange("language", e.target.value)
                    }
                    className="w-full rounded border border-slate-200 bg-white px-2 py-1 text-[11px] text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                  />
                </th>
                <th className="px-2 py-1.5 font-normal">
                  <input
                    type="text"
                    placeholder="Filter"
                    value={filters.purpose}
                    onChange={(e) =>
                      handleFilterChange("purpose", e.target.value)
                    }
                    className="w-full rounded border border-slate-200 bg-white px-2 py-1 text-[11px] text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                  />
                </th>
                <th className="px-2 py-1.5 font-normal">
                  <input
                    type="text"
                    placeholder="Filter"
                    value={filters.preferredLocation}
                    onChange={(e) =>
                      handleFilterChange("preferredLocation", e.target.value)
                    }
                    className="w-full rounded border border-slate-200 bg-white px-2 py-1 text-[11px] text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                  />
                </th>
                <th className="px-2 py-1.5 font-normal">
                  <input
                    type="text"
                    placeholder="Filter"
                    value={filters.configuration}
                    onChange={(e) =>
                      handleFilterChange("configuration", e.target.value)
                    }
                    className="w-full rounded border border-slate-200 bg-white px-2 py-1 text-[11px] text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                  />
                </th>
                <th className="px-2 py-1.5 font-normal">
                  <input
                    type="text"
                    placeholder="Filter"
                    value={filters.budgetRange}
                    onChange={(e) =>
                      handleFilterChange("budgetRange", e.target.value)
                    }
                    className="w-full rounded border border-slate-200 bg-white px-2 py-1 text-[11px] text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                  />
                </th>
                <th className="px-2 py-1.5 font-normal">
                  <input
                    type="text"
                    placeholder="Filter"
                    value={filters.disposition}
                    onChange={(e) =>
                      handleFilterChange("disposition", e.target.value)
                    }
                    className="w-full rounded border border-slate-200 bg-white px-2 py-1 text-[11px] text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                  />
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {paginatedLogs.length === 0 ? (
                <tr>
                  <td colSpan={12} className="py-8 text-center text-slate-400">
                    No calls match the selected filters.
                  </td>
                </tr>
              ) : (
                paginatedLogs.map((log) => {
                  const disp = DISPOSITIONS[log.dispositionKey];
                  const isUnreachable =
                    log.dispositionKey === "not-reachable" ||
                    log.dispositionKey === "wrong-number";

                  return (
                    <tr
                      key={log.id}
                      className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors"
                    >
                      {/* Customer Name */}
                      <td className="whitespace-nowrap px-3 py-2.5 font-semibold text-slate-900 dark:text-white">
                        {log.customerName}
                      </td>

                      {/* Phone Number */}
                      <td className="whitespace-nowrap px-3 py-2.5 font-medium text-slate-700 dark:text-slate-300">
                        {log.phoneNumber}
                      </td>

                      {/* Call Type */}
                      <td className="whitespace-nowrap px-3 py-2.5 text-slate-600 dark:text-slate-400">
                        {log.callType}
                      </td>

                      {/* Session ID */}
                      <td className="whitespace-nowrap px-3 py-2.5 font-mono text-[11px] text-slate-500 dark:text-slate-400">
                        {log.sessionId.slice(0, 22)}...
                      </td>

                      {/* Duration */}
                      <td className="whitespace-nowrap px-3 py-2.5 font-mono text-slate-700 dark:text-slate-300">
                        {log.duration}
                      </td>

                      {/* Recording */}
                      <td className="whitespace-nowrap px-3 py-2.5 text-center">
                        {log.hasRecording ? (
                          <button
                            type="button"
                            title="Call recording disabled (egress pending)"
                            disabled
                            className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-slate-200 bg-slate-100 text-slate-400 opacity-60 cursor-not-allowed dark:border-slate-700 dark:bg-slate-800"
                          >
                            <Play className="h-3 w-3 fill-slate-400 ml-0.5" />
                          </button>
                        ) : (
                          <span className="text-slate-400">—</span>
                        )}
                      </td>

                      {/* Language */}
                      <td className="whitespace-nowrap px-3 py-2.5 text-slate-600 dark:text-slate-400">
                        {log.language}
                      </td>

                      {/* Purpose */}
                      <td className="whitespace-nowrap px-3 py-2.5 text-slate-700 dark:text-slate-300">
                        {log.purpose}
                      </td>

                      {/* Preferred Location */}
                      <td className="whitespace-nowrap px-3 py-2.5 text-slate-600 dark:text-slate-400">
                        {log.preferredLocation}
                      </td>

                      {/* Configuration */}
                      <td className="whitespace-nowrap px-3 py-2.5 text-slate-700 dark:text-slate-300">
                        {log.configuration}
                      </td>

                      {/* Budget Range */}
                      <td className="whitespace-nowrap px-3 py-2.5 font-medium text-slate-700 dark:text-slate-300">
                        {log.budgetRange}
                      </td>

                      {/* Disposition Badge */}
                      <td className="whitespace-nowrap px-3 py-2.5">
                        {disp ? (
                          <span
                            className={cn(
                              "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold",
                              disp.bgLight,
                              disp.textLight,
                              disp.borderLight,
                            )}
                          >
                            <span
                              className={cn(
                                "h-1.5 w-1.5 rounded-full",
                                disp.dotColor,
                              )}
                            />
                            {disp.label}
                          </span>
                        ) : (
                          <span className="text-slate-400">—</span>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div className="flex flex-col gap-3 border-t border-slate-200/80 px-4 py-3 sm:flex-row sm:items-center sm:justify-between dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400">
          {/* Page controls left */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage(1)}
              className="flex h-7 w-7 items-center justify-center rounded border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed dark:border-slate-700 dark:bg-slate-800"
            >
              <ChevronsLeft className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="flex h-7 w-7 items-center justify-center rounded border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed dark:border-slate-700 dark:bg-slate-800"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
            </button>
            <span className="px-2 font-medium">
              Page {currentPage} of {totalPages}
            </span>
            <button
              type="button"
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="flex h-7 w-7 items-center justify-center rounded border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed dark:border-slate-700 dark:bg-slate-800"
            >
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage(totalPages)}
              className="flex h-7 w-7 items-center justify-center rounded border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed dark:border-slate-700 dark:bg-slate-800"
            >
              <ChevronsRight className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Go to page & Rows selector right */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <span>Go to page</span>
              <input
                type="number"
                min={1}
                max={totalPages}
                value={currentPage}
                onChange={(e) => {
                  const val = parseInt(e.target.value, 10);
                  if (!isNaN(val) && val >= 1 && val <= totalPages) {
                    setCurrentPage(val);
                  }
                }}
                className="h-7 w-12 rounded border border-slate-200 bg-white px-1.5 text-center text-xs font-semibold text-slate-900 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>

            <div className="flex items-center gap-1.5">
              <span>Show</span>
              <select
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="h-7 rounded border border-slate-200 bg-white px-2 text-xs font-medium text-slate-900 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
              <span>rows</span>
            </div>
          </div>
        </div>
      </div>

      {/* ADDITIONAL ANALYTICS TO LAYER IN */}
      <div className="space-y-4 pt-2">
        <div>
          <h2 className="text-sm font-bold text-slate-900 dark:text-white sm:text-base">
            Additional analytics to layer in
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            A preview of three widgets from brief §05 — the script is a
            deterministic state machine, so funnel and preference data are
            already sitting in every LeadProfile.
          </p>
        </div>

        {/* 3 Horizontal Bar Chart Cards */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {/* Card 1: Call funnel snapshot */}
          <div className="rounded-xl border border-slate-200/80 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900">
            <h3 className="text-xs font-bold text-slate-900 dark:text-white">
              Call funnel snapshot
            </h3>
            <p className="mt-0.5 text-[11px] text-slate-400">
              Connected calls reaching each stage, 30 days
            </p>

            <div className="mt-4 space-y-2.5">
              {FUNNEL_DATA.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between gap-3 text-xs"
                >
                  <span className="w-28 truncate text-[11px] text-slate-600 dark:text-slate-300">
                    {item.label}
                  </span>
                  <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                    <div
                      className="h-full rounded-full bg-blue-600"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                  <span className="w-6 text-right font-bold text-slate-900 dark:text-white">
                    {item.count}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Card 2: Purpose split */}
          <div className="rounded-xl border border-slate-200/80 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900">
            <h3 className="text-xs font-bold text-slate-900 dark:text-white">
              Purpose split
            </h3>
            <p className="mt-0.5 text-[11px] text-slate-400">
              Investment vs. self-use, connected calls
            </p>

            <div className="mt-4 space-y-3">
              {PURPOSE_SPLIT_DATA.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between gap-3 text-xs"
                >
                  <span className="w-24 truncate text-[11px] text-slate-600 dark:text-slate-300">
                    {item.label}
                  </span>
                  <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                    <div
                      className="h-full rounded-full bg-blue-600"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                  <span className="w-6 text-right font-bold text-slate-900 dark:text-white">
                    {item.count}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Card 3: Project demand */}
          <div className="rounded-xl border border-slate-200/80 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900">
            <h3 className="text-xs font-bold text-slate-900 dark:text-white">
              Project demand
            </h3>
            <p className="mt-0.5 text-[11px] text-slate-400">
              Leads by micro-market, all projects, 30 days
            </p>

            <div className="mt-4 space-y-2">
              {PROJECT_DEMAND_DATA.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between gap-3 text-xs"
                >
                  <span className="w-24 truncate text-[11px] text-slate-600 dark:text-slate-300">
                    {item.label}
                  </span>
                  <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                    <div
                      className="h-full rounded-full bg-blue-600"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                  <span className="w-6 text-right font-bold text-slate-900 dark:text-white">
                    {item.count}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* NOTES FOR THE BUILD CARD */}
      <div className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <h3 className="text-xs font-bold text-slate-900 dark:text-white">
          Notes for the build — not part of the visual design
        </h3>
        <ul className="mt-3 space-y-1.5 text-xs text-slate-600 dark:text-slate-400 list-disc list-inside">
          {BUILD_NOTES.map((note, idx) => (
            <li key={idx} className="leading-relaxed">
              <span className="text-slate-700 dark:text-slate-300 font-medium">
                {note.split("—")[0]}
              </span>
              {note.includes("—") && (
                <span> — {note.split("—").slice(1).join("—")}</span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
