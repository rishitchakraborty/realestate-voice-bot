"use client";

import React, { useState, useMemo } from "react";
import {
  Download,
  Play,
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
  Copy,
  Check,
} from "lucide-react";
import {
  CallRecord,
  DISPOSITION_CONFIGS,
  DispositionType,
  ORDERED_DISPOSITIONS,
} from "./call-analytics-data";

interface CallLogTableProps {
  calls: CallRecord[];
  workflowName?: string;
  externalDispositionFilter?: DispositionType | null;
  onClearExternalFilter?: () => void;
  onSelectCall?: (call: CallRecord) => void;
}

interface FilterState {
  customerName: string;
  phoneNumber: string;
  callType: string;
  sessionId: string;
  duration: string;
  language: string;
  purpose: string;
  preferredLocation: string;
  configuration: string;
  budgetRange: string;
  disposition: string;
}

const INITIAL_FILTERS: FilterState = {
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
};

export function CallLogTable({
  calls,
  workflowName = "New Kolkata (ALC-NKOL)",
  externalDispositionFilter,
  onClearExternalFilter,
  onSelectCall,
}: CallLogTableProps) {
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);
  const [appliedFilters, setAppliedFilters] = useState<FilterState>(INITIAL_FILTERS);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [copiedSessionId, setCopiedSessionId] = useState<string | null>(null);

  // Sync external disposition filter (e.g. from donut click)
  React.useEffect(() => {
    if (externalDispositionFilter) {
      setFilters((prev) => ({ ...prev, disposition: externalDispositionFilter }));
      setAppliedFilters((prev) => ({ ...prev, disposition: externalDispositionFilter }));
      setCurrentPage(1);
    }
  }, [externalDispositionFilter]);

  // Debounced auto-filtering as user types (250ms delay)
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setAppliedFilters(filters);
      setCurrentPage(1);
    }, 250);

    return () => clearTimeout(timer);
  }, [filters]);

  const handleFilterChange = (field: keyof FilterState, value: string) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const applyFilters = () => {
    setAppliedFilters(filters);
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setFilters(INITIAL_FILTERS);
    setAppliedFilters(INITIAL_FILTERS);
    setCurrentPage(1);
    if (onClearExternalFilter) onClearExternalFilter();
  };

  // Filtered dataset
  const filteredCalls = useMemo(() => {
    return calls.filter((call) => {
      if (
        appliedFilters.customerName &&
        !call.customerName.toLowerCase().includes(appliedFilters.customerName.toLowerCase())
      )
        return false;
      if (
        appliedFilters.phoneNumber &&
        !call.phoneNumber.includes(appliedFilters.phoneNumber)
      )
        return false;
      if (
        appliedFilters.callType &&
        !call.callType.toLowerCase().includes(appliedFilters.callType.toLowerCase())
      )
        return false;
      if (
        appliedFilters.sessionId &&
        !call.sessionId.toLowerCase().includes(appliedFilters.sessionId.toLowerCase())
      )
        return false;
      if (
        appliedFilters.duration &&
        !call.duration.includes(appliedFilters.duration)
      )
        return false;
      if (
        appliedFilters.language &&
        appliedFilters.language !== "—" &&
        !call.language.toLowerCase().includes(appliedFilters.language.toLowerCase())
      )
        return false;
      if (
        appliedFilters.purpose &&
        appliedFilters.purpose !== "—" &&
        !call.purpose.toLowerCase().includes(appliedFilters.purpose.toLowerCase())
      )
        return false;
      if (
        appliedFilters.preferredLocation &&
        appliedFilters.preferredLocation !== "—" &&
        !call.preferredLocation
          .toLowerCase()
          .includes(appliedFilters.preferredLocation.toLowerCase())
      )
        return false;
      if (
        appliedFilters.configuration &&
        appliedFilters.configuration !== "—" &&
        !call.configuration
          .toLowerCase()
          .includes(appliedFilters.configuration.toLowerCase())
      )
        return false;
      if (
        appliedFilters.budgetRange &&
        appliedFilters.budgetRange !== "—" &&
        !call.budgetRange
          .toLowerCase()
          .includes(appliedFilters.budgetRange.toLowerCase())
      )
        return false;
      if (
        appliedFilters.disposition &&
        !call.disposition
          .toLowerCase()
          .includes(appliedFilters.disposition.toLowerCase())
      )
        return false;

      return true;
    });
  }, [calls, appliedFilters]);

  // Pagination calculation
  const totalPages = Math.max(1, Math.ceil(filteredCalls.length / pageSize));
  const validCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (validCurrentPage - 1) * pageSize;
  const paginatedCalls = filteredCalls.slice(startIndex, startIndex + pageSize);

  const handleCopySession = (sessionId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(sessionId);
    setCopiedSessionId(sessionId);
    setTimeout(() => setCopiedSessionId(null), 2000);
  };

  const handleExportCSV = () => {
    const headers = [
      "Customer Name",
      "Phone Number",
      "Call Type",
      "Session ID",
      "Duration",
      "Language",
      "Purpose",
      "Preferred Location",
      "Configuration",
      "Budget Range",
      "Disposition",
    ];

    const rows = filteredCalls.map((call) => [
      `"${call.customerName}"`,
      `"${call.phoneNumber}"`,
      `"${call.callType}"`,
      `"${call.sessionId}"`,
      `"${call.duration}"`,
      `"${call.language}"`,
      `"${call.purpose}"`,
      `"${call.preferredLocation}"`,
      `"${call.configuration}"`,
      `"${call.budgetRange}"`,
      `"${call.disposition}"`,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `call-log-${workflowName.replace(/\s+/g, "_")}.csv`,
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="rounded-xl border border-slate-200/80 bg-white shadow-xs">
      {/* Table Header Section */}
      <div className="flex flex-col gap-3 border-b border-slate-200/80 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-base font-bold tracking-tight text-slate-900">
            Call log — {workflowName}
          </h3>
          <p className="text-xs text-slate-500">
            {paginatedCalls.length} of {filteredCalls.length} calls shown
            {filteredCalls.length !== calls.length && (
              <span className="ml-1 text-slate-400">
                (filtered from {calls.length} total)
              </span>
            )}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={applyFilters}
            className="rounded-lg bg-blue-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow-xs transition-colors hover:bg-blue-700 cursor-pointer"
          >
            Apply Filter
          </button>
          <button
            type="button"
            onClick={clearFilters}
            className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-2xs transition-colors hover:bg-slate-50 cursor-pointer"
          >
            Clear
          </button>
          <button
            type="button"
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-2xs transition-colors hover:bg-slate-50 cursor-pointer"
          >
            <Download className="h-3.5 w-3.5 text-slate-500" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Table Wrapper for Horizontal Scroll */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            {/* Column Titles */}
            <tr className="border-b border-slate-200 bg-slate-50/50 text-[11px] font-bold uppercase tracking-wider text-slate-500">
              <th className="px-3.5 py-2.5 whitespace-nowrap min-w-[140px]">Customer Name</th>
              <th className="px-3.5 py-2.5 whitespace-nowrap min-w-[130px]">Phone Number</th>
              <th className="px-3.5 py-2.5 whitespace-nowrap min-w-[90px]">Call Type</th>
              <th className="px-3.5 py-2.5 whitespace-nowrap min-w-[150px]">Session ID</th>
              <th className="px-3.5 py-2.5 whitespace-nowrap min-w-[80px]">Duration</th>
              <th className="px-3.5 py-2.5 whitespace-nowrap text-center min-w-[80px]">Recording</th>
              <th className="px-3.5 py-2.5 whitespace-nowrap min-w-[90px]">Language</th>
              <th className="px-3.5 py-2.5 whitespace-nowrap min-w-[100px]">Purpose</th>
              <th className="px-3.5 py-2.5 whitespace-nowrap min-w-[130px]">Preferred Location</th>
              <th className="px-3.5 py-2.5 whitespace-nowrap min-w-[100px]">Configuration</th>
              <th className="px-3.5 py-2.5 whitespace-nowrap min-w-[110px]">Budget Range</th>
              <th className="px-3.5 py-2.5 whitespace-nowrap min-w-[150px]">Disposition</th>
            </tr>

            {/* Filter Inputs Row */}
            <tr className="border-b border-slate-200 bg-white">
              <th className="px-2.5 py-1.5">
                <input
                  type="text"
                  placeholder="Filter"
                  value={filters.customerName}
                  onChange={(e) => handleFilterChange("customerName", e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && applyFilters()}
                  className="w-full rounded-md border border-slate-200 px-2 py-1 text-xs text-slate-800 placeholder-slate-400 focus:border-blue-500 focus:outline-hidden"
                />
              </th>
              <th className="px-2.5 py-1.5">
                <input
                  type="text"
                  placeholder="Filter"
                  value={filters.phoneNumber}
                  onChange={(e) => handleFilterChange("phoneNumber", e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && applyFilters()}
                  className="w-full rounded-md border border-slate-200 px-2 py-1 text-xs text-slate-800 placeholder-slate-400 focus:border-blue-500 focus:outline-hidden"
                />
              </th>
              <th className="px-2.5 py-1.5">
                <input
                  type="text"
                  placeholder="Filter"
                  value={filters.callType}
                  onChange={(e) => handleFilterChange("callType", e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && applyFilters()}
                  className="w-full rounded-md border border-slate-200 px-2 py-1 text-xs text-slate-800 placeholder-slate-400 focus:border-blue-500 focus:outline-hidden"
                />
              </th>
              <th className="px-2.5 py-1.5">
                <input
                  type="text"
                  placeholder="Filter"
                  value={filters.sessionId}
                  onChange={(e) => handleFilterChange("sessionId", e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && applyFilters()}
                  className="w-full rounded-md border border-slate-200 px-2 py-1 text-xs text-slate-800 placeholder-slate-400 focus:border-blue-500 focus:outline-hidden"
                />
              </th>
              <th className="px-2.5 py-1.5">
                <input
                  type="text"
                  placeholder="Filter"
                  value={filters.duration}
                  onChange={(e) => handleFilterChange("duration", e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && applyFilters()}
                  className="w-full rounded-md border border-slate-200 px-2 py-1 text-xs text-slate-800 placeholder-slate-400 focus:border-blue-500 focus:outline-hidden"
                />
              </th>
              <th className="px-2.5 py-1.5 text-center text-slate-300">—</th>
              <th className="px-2.5 py-1.5">
                <input
                  type="text"
                  placeholder="Filter"
                  value={filters.language}
                  onChange={(e) => handleFilterChange("language", e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && applyFilters()}
                  className="w-full rounded-md border border-slate-200 px-2 py-1 text-xs text-slate-800 placeholder-slate-400 focus:border-blue-500 focus:outline-hidden"
                />
              </th>
              <th className="px-2.5 py-1.5">
                <input
                  type="text"
                  placeholder="Filter"
                  value={filters.purpose}
                  onChange={(e) => handleFilterChange("purpose", e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && applyFilters()}
                  className="w-full rounded-md border border-slate-200 px-2 py-1 text-xs text-slate-800 placeholder-slate-400 focus:border-blue-500 focus:outline-hidden"
                />
              </th>
              <th className="px-2.5 py-1.5">
                <input
                  type="text"
                  placeholder="Filter"
                  value={filters.preferredLocation}
                  onChange={(e) => handleFilterChange("preferredLocation", e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && applyFilters()}
                  className="w-full rounded-md border border-slate-200 px-2 py-1 text-xs text-slate-800 placeholder-slate-400 focus:border-blue-500 focus:outline-hidden"
                />
              </th>
              <th className="px-2.5 py-1.5">
                <input
                  type="text"
                  placeholder="Filter"
                  value={filters.configuration}
                  onChange={(e) => handleFilterChange("configuration", e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && applyFilters()}
                  className="w-full rounded-md border border-slate-200 px-2 py-1 text-xs text-slate-800 placeholder-slate-400 focus:border-blue-500 focus:outline-hidden"
                />
              </th>
              <th className="px-2.5 py-1.5">
                <input
                  type="text"
                  placeholder="Filter"
                  value={filters.budgetRange}
                  onChange={(e) => handleFilterChange("budgetRange", e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && applyFilters()}
                  className="w-full rounded-md border border-slate-200 px-2 py-1 text-xs text-slate-800 placeholder-slate-400 focus:border-blue-500 focus:outline-hidden"
                />
              </th>
              <th className="px-2.5 py-1.5">
                <input
                  type="text"
                  placeholder="Filter"
                  value={filters.disposition}
                  onChange={(e) => handleFilterChange("disposition", e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && applyFilters()}
                  className="w-full rounded-md border border-slate-200 px-2 py-1 text-xs text-slate-800 placeholder-slate-400 focus:border-blue-500 focus:outline-hidden"
                />
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {paginatedCalls.length === 0 ? (
              <tr>
                <td colSpan={12} className="py-8 text-center text-slate-400">
                  No matching call records found. Click &quot;Clear&quot; to reset filters.
                </td>
              </tr>
            ) : (
              paginatedCalls.map((call) => {
                const dispConfig = DISPOSITION_CONFIGS[call.disposition];
                const isNonConnected =
                  call.disposition === "Not Reachable" ||
                  call.disposition === "Wrong Number";

                return (
                  <tr
                    key={call.id}
                    onClick={() => onSelectCall?.(call)}
                    className="group hover:bg-slate-50/80 transition-colors cursor-pointer"
                  >
                    {/* Customer Name */}
                    <td className="px-3.5 py-3 font-semibold text-slate-900 whitespace-nowrap">
                      {call.customerName}
                    </td>

                    {/* Phone Number */}
                    <td className="px-3.5 py-3 font-mono text-slate-700 whitespace-nowrap">
                      {call.phoneNumber}
                    </td>

                    {/* Call Type */}
                    <td className="px-3.5 py-3 text-slate-600 whitespace-nowrap">
                      {call.callType}
                    </td>

                    {/* Session ID */}
                    <td className="px-3.5 py-3 font-mono text-[11px] text-slate-500 whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        <span title={call.sessionId}>
                          {call.sessionId.slice(0, 18)}...
                        </span>
                        <button
                          type="button"
                          onClick={(e) => handleCopySession(call.sessionId, e)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity p-0.5 hover:text-slate-900 cursor-pointer"
                          title="Copy full Session ID"
                        >
                          {copiedSessionId === call.sessionId ? (
                            <Check className="h-3 w-3 text-emerald-600" />
                          ) : (
                            <Copy className="h-3 w-3" />
                          )}
                        </button>
                      </div>
                    </td>

                    {/* Duration */}
                    <td className="px-3.5 py-3 font-mono tabular-nums text-slate-700 whitespace-nowrap">
                      {call.duration}
                    </td>

                    {/* Recording */}
                    <td className="px-3.5 py-3 text-center whitespace-nowrap">
                      {isNonConnected ? (
                        <span className="text-slate-300">—</span>
                      ) : (
                        <button
                          type="button"
                          disabled
                          title="Recording egress capture isn't wired up yet (brief §08)"
                          className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-slate-400 opacity-60 cursor-not-allowed"
                        >
                          <Play className="h-3 w-3 fill-slate-400" />
                        </button>
                      )}
                    </td>

                    {/* Language */}
                    <td className="px-3.5 py-3 text-slate-600 whitespace-nowrap">
                      {call.language}
                    </td>

                    {/* Purpose */}
                    <td className="px-3.5 py-3 text-slate-600 whitespace-nowrap">
                      {call.purpose}
                    </td>

                    {/* Preferred Location */}
                    <td className="px-3.5 py-3 text-slate-600 whitespace-nowrap">
                      {call.preferredLocation}
                    </td>

                    {/* Configuration */}
                    <td className="px-3.5 py-3 text-slate-600 whitespace-nowrap">
                      {call.configuration}
                    </td>

                    {/* Budget Range */}
                    <td className="px-3.5 py-3 text-slate-700 whitespace-nowrap">
                      {call.budgetRange}
                    </td>

                    {/* Disposition Pill */}
                    <td className="px-3.5 py-3 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${dispConfig.bgColor} ${dispConfig.textColor} ${dispConfig.borderColor}`}
                      >
                        <span
                          className="h-1.5 w-1.5 rounded-full"
                          style={{ backgroundColor: dispConfig.color }}
                        />
                        {call.disposition}
                      </span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="flex flex-col gap-3 border-t border-slate-200/80 px-5 py-3 sm:flex-row sm:items-center sm:justify-between text-xs text-slate-600">
        {/* Page Nav Buttons */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            disabled={validCurrentPage === 1}
            onClick={() => setCurrentPage(1)}
            className="rounded-md border border-slate-200 p-1.5 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            title="First Page"
          >
            <ChevronsLeft className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            disabled={validCurrentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            className="rounded-md border border-slate-200 p-1.5 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            title="Previous Page"
          >
            <ChevronLeft className="h-3.5 w-3.5" />
          </button>

          <span className="px-2 font-medium">
            Page {validCurrentPage} of {totalPages}
          </span>

          <button
            type="button"
            disabled={validCurrentPage === totalPages}
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            className="rounded-md border border-slate-200 p-1.5 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            title="Next Page"
          >
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            disabled={validCurrentPage === totalPages}
            onClick={() => setCurrentPage(totalPages)}
            className="rounded-md border border-slate-200 p-1.5 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            title="Last Page"
          >
            <ChevronsRight className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Jump to page & rows per page */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span>Go to page</span>
            <input
              type="number"
              min={1}
              max={totalPages}
              value={validCurrentPage}
              onChange={(e) => {
                const val = parseInt(e.target.value, 10);
                if (!isNaN(val) && val >= 1 && val <= totalPages) {
                  setCurrentPage(val);
                }
              }}
              className="w-12 rounded-md border border-slate-200 px-1.5 py-1 text-center text-xs text-slate-800"
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
              className="rounded-md border border-slate-200 px-2 py-1 text-xs text-slate-800 bg-white"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={120}>All (120)</option>
            </select>
            <span>rows</span>
          </div>
        </div>
      </div>
    </div>
  );
}
