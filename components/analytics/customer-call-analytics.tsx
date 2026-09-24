"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import {
  Calendar,
  ChevronDown,
  Check,
  Building2,
  Sparkles,
  PhoneCall,
  CalendarCheck,
  Bot,
  Filter,
  Layers,
  ArrowRight,
  AlertTriangle,
} from "lucide-react";
import { BOTS, type BotConfig } from "@/constants/bots";
import {
  CallRecord,
  DispositionType,
  NOVESTA_PROJECTS,
  getAnalyticsForFlow,
} from "./call-analytics-data";
import { DonutChart } from "./donut-chart";
import { StatCards } from "./stat-cards";
import { CallLogTable } from "./call-log-table";
import { FunnelWidgets } from "./funnel-widgets";
import { CallInfoModal } from "./call-info-modal";
import { cn } from "@/lib/shadcn/utils";

function BotIcon({ icon, className }: { icon?: string; className?: string }) {
  if (icon === "calendar") return <CalendarCheck className={className} />;
  if (icon === "bot") return <Bot className={className} />;
  if (icon === "sparkles") return <Sparkles className={className} />;
  return <PhoneCall className={className} />;
}

interface CustomerCallAnalyticsProps {
  initialFlowId?: string;
  onFlowChange?: (flowId: string) => void;
}

export function CustomerCallAnalytics({
  initialFlowId,
  onFlowChange,
}: CustomerCallAnalyticsProps = {}) {
  const [selectedFlowId, setSelectedFlowId] = useState<string>(
    initialFlowId || BOTS[0].id,
  );
  const [selectedProject, setSelectedProject] = useState(NOVESTA_PROJECTS[0]);
  const [selectedTimeRange, setSelectedTimeRange] = useState<
    "Today" | "7 Days" | "30 Days"
  >("30 Days");
  const [selectedDispositionFilter, setSelectedDispositionFilter] =
    useState<DispositionType | null>(null);
  const [inspectedCall, setInspectedCall] = useState<CallRecord | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isFlowDropdownOpen, setIsFlowDropdownOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialFlowId) {
      setSelectedFlowId(initialFlowId);
    }
  }, [initialFlowId]);

  const handleFlowSwitch = (flowId: string) => {
    setSelectedFlowId(flowId);
    setSelectedDispositionFilter(null);
    setIsFlowDropdownOpen(false);
    onFlowChange?.(flowId);
  };

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsFlowDropdownOpen(false);
      }
    }
    if (isFlowDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isFlowDropdownOpen]);

  // Active dataset derived from selected flow
  const activeDataset = useMemo(() => {
    return getAnalyticsForFlow(selectedFlowId);
  }, [selectedFlowId]);

  const selectedBot = useMemo(() => {
    return BOTS.find((b) => b.id === selectedFlowId) || BOTS[0];
  }, [selectedFlowId]);

  // Filter calls by project if a specific project is selected
  const flowCalls = useMemo(() => {
    if (selectedProject.id === "ALL") {
      return activeDataset.calls;
    }
    const matchLocation = selectedProject.location.toLowerCase();
    const matchName = selectedProject.name.toLowerCase();

    return activeDataset.calls.filter((c) => {
      const loc = c.preferredLocation.toLowerCase();
      return (
        loc.includes(matchLocation) ||
        matchName.includes(loc) ||
        (selectedProject.id === "NOV-AERO" && loc.includes("airport")) ||
        (selectedProject.id === "NOV-ECO" && loc.includes("newtown")) ||
        (selectedProject.id === "NOV-RIVER" && loc.includes("ganges")) ||
        (selectedProject.id === "NOV-BUNGALOW" && loc.includes("bungalow"))
      );
    });
  }, [activeDataset.calls, selectedProject]);

  const handleOpenSampleInfo = () => {
    const sample =
      flowCalls.find(
        (c) =>
          c.disposition === "WhatsApp Brochure Sent" ||
          c.disposition === "Site Visit Confirmed",
      ) || flowCalls[0];
    setInspectedCall(sample);
    setIsModalOpen(true);
  };

  const handleSelectCall = (call: CallRecord) => {
    setInspectedCall(call);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-full bg-[#f8fafc] text-slate-900">
      <div className="mx-auto max-w-[1600px] space-y-5 p-4 sm:p-6 lg:p-8">
        {/* Top Yellow Warning Ribbon: Mock Data & UI Notice */}
        {/* <div className="flex items-center justify-between rounded-xl border border-amber-300 bg-[#fffbeb] px-4 py-2.5 text-xs text-amber-950 shadow-2xs">
          <div className="flex items-center gap-2.5">
            <AlertTriangle className="h-4 w-4 shrink-0 text-amber-600" />
            <span>
              <strong className="font-semibold text-amber-900">Notice:</strong> This is mock data and a demonstration UI for layout and workflow reference only — not real customer information.
            </span>
          </div>
          <span className="rounded-md border border-amber-300/80 bg-amber-100 px-2 py-0.5 text-[10px] font-bold tracking-wider text-amber-900 uppercase shrink-0 ml-2">
            MOCK DATA &amp; UI
          </span>
        </div> */}

        {/* 1. Main Page Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200/80 pb-5">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Novesta Voice Analytics
              </h1>
              <span
                className="inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider"
                style={{
                  backgroundColor: `${selectedBot.accentColor}18`,
                  color: selectedBot.accentColor,
                  border: `1px solid ${selectedBot.accentColor}40`,
                }}
              >
                {selectedBot.badge}
              </span>
            </div>
            <p className="mt-1 text-xs text-slate-500">
              Live intelligence for{" "}
              <strong className="text-slate-800 font-semibold">
                {selectedBot.name}
              </strong>{" "}
              · Novesta Group Kolkata Portfolio
            </p>
          </div>

          {/* Header Action Controls */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={handleOpenSampleInfo}
              className="rounded-lg bg-[#0e1230] px-4 py-2 text-xs font-semibold text-white shadow-xs transition-colors hover:bg-[#1a224f] cursor-pointer flex items-center gap-1.5"
            >
              <span>Inspect Sample Call</span>
              <ArrowRight className="h-3 w-3 text-amber-400" />
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
                        ? "bg-[#0e1230] font-semibold text-white shadow-xs"
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
              <span>Aug 1 – Aug 14, 2026</span>
            </button>
          </div>
        </div>

        {/* 2. DUAL FLOW SELECTOR & WORKFLOW ROW */}
        <div className="flex flex-col gap-4 rounded-2xl border border-slate-200/90 bg-white p-4 sm:p-5 shadow-xs lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 flex-1">
            {/* Flow Selector Dropdown */}
            <div ref={dropdownRef} className="relative inline-block text-left">
              <span className="block text-[10px] font-bold tracking-wider text-slate-400 uppercase mb-1.5">
                SELECT VOICE AGENT FLOW
              </span>

              <button
                type="button"
                onClick={() => setIsFlowDropdownOpen((prev) => !prev)}
                className="group relative flex h-12 w-full sm:w-[360px] md:w-[410px] items-center justify-between rounded-xl border border-slate-200 bg-white px-3.5 shadow-2xs transition-all hover:border-slate-300 hover:bg-slate-50/80 cursor-pointer outline-none"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={cn(
                      "flex h-7 w-7 items-center justify-center rounded-lg text-white shadow-2xs shrink-0 bg-gradient-to-br",
                      selectedBot.accentGradient,
                    )}
                  >
                    <BotIcon
                      icon={selectedBot.icon}
                      className="h-4 w-4 text-white"
                    />
                  </div>

                  <div className="flex flex-col items-start text-left min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span
                        className="inline-flex items-center rounded-md px-1.5 py-0.2 text-[9px] font-bold uppercase tracking-wider shrink-0"
                        style={{
                          backgroundColor: `${selectedBot.accentColor}18`,
                          color: selectedBot.accentColor,
                          border: `1px solid ${selectedBot.accentColor}40`,
                        }}
                      >
                        {selectedBot.badge}
                      </span>
                      <span className="text-xs font-bold text-slate-900 truncate">
                        {selectedBot.shortName}
                      </span>
                    </div>
                    <span className="text-[10.5px] text-slate-500 truncate max-w-[260px]">
                      {selectedBot.subtitle}
                    </span>
                  </div>
                </div>

                <ChevronDown
                  className={cn(
                    "h-4 w-4 text-slate-400 transition-transform duration-200 shrink-0 ml-2",
                    isFlowDropdownOpen && "rotate-180 text-slate-700",
                  )}
                />
              </button>

              {/* Dropdown Menu */}
              {isFlowDropdownOpen && (
                <div className="absolute left-0 top-full z-50 mt-2 w-full sm:w-[420px] origin-top-left rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl backdrop-blur-md">
                  <div className="px-3 py-2 border-b border-slate-100 flex items-center justify-between">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-900">
                      Switch Conversational Flow
                    </p>
                    <span className="text-[10px] font-semibold text-slate-500">
                      {BOTS.length} Flows Available
                    </span>
                  </div>

                  <div className="mt-2 space-y-1.5">
                    {BOTS.map((bot) => {
                      const isSelected = selectedFlowId === bot.id;

                      return (
                        <button
                          key={bot.id}
                          type="button"
                          onClick={() => handleFlowSwitch(bot.id)}
                          style={
                            isSelected
                              ? {
                                  borderColor: `${bot.accentColor}80`,
                                  backgroundColor: `${bot.accentColor}0e`,
                                }
                              : undefined
                          }
                          className={cn(
                            "flex w-full items-start justify-between rounded-xl p-3 text-left transition-all border cursor-pointer",
                            !isSelected &&
                              "border-transparent bg-white hover:bg-slate-50 hover:border-slate-200",
                          )}
                        >
                          <div className="flex items-start gap-3 min-w-0">
                            <div
                              className={cn(
                                "flex h-8 w-8 items-center justify-center rounded-lg text-white shadow-2xs shrink-0 mt-0.5 bg-gradient-to-br",
                                bot.accentGradient,
                              )}
                            >
                              <BotIcon
                                icon={bot.icon}
                                className="h-4 w-4 text-white"
                              />
                            </div>
                            <div className="min-w-0">
                              <div className="flex items-center gap-1.5">
                                <span
                                  className="inline-flex items-center rounded-md px-1.5 py-0.2 text-[9px] font-bold uppercase tracking-wider"
                                  style={{
                                    backgroundColor: `${bot.accentColor}18`,
                                    color: bot.accentColor,
                                    border: `1px solid ${bot.accentColor}40`,
                                  }}
                                >
                                  {bot.badge}
                                </span>
                                <h4 className="text-xs font-bold text-slate-900 truncate">
                                  {bot.shortName}
                                </h4>
                              </div>
                              <p className="mt-1 text-[11px] text-slate-500 leading-snug line-clamp-2">
                                {bot.description}
                              </p>
                            </div>
                          </div>

                          <div className="pt-0.5 pl-2 shrink-0">
                            {isSelected ? (
                              <div
                                className="flex h-4.5 w-4.5 items-center justify-center rounded-full text-white shadow-xs"
                                style={{ backgroundColor: bot.accentColor }}
                              >
                                <Check className="h-3 w-3 stroke-[3]" />
                              </div>
                            ) : (
                              <div className="h-4 w-4 rounded-full border border-slate-300" />
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Quick Flow Switcher Tabs */}
            <div className="flex flex-col">
              <span className="block text-[10px] font-bold tracking-wider text-slate-400 uppercase mb-1.5">
                QUICK TAB
              </span>
              <div className="inline-flex rounded-xl border border-slate-200 bg-slate-100/70 p-1">
                {BOTS.map((bot) => {
                  const isActive = selectedFlowId === bot.id;
                  return (
                    <button
                      key={bot.id}
                      type="button"
                      onClick={() => handleFlowSwitch(bot.id)}
                      className={cn(
                        "flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer",
                        isActive
                          ? "bg-white text-slate-900 shadow-xs"
                          : "text-slate-600 hover:text-slate-900",
                      )}
                    >
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: bot.accentColor }}
                      />
                      <span className="hidden sm:inline">{bot.badge}</span>
                      <span className="sm:hidden">
                        {bot.shortName.slice(0, 12)}...
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Novesta Project Filter Dropdown */}
            <div className="relative">
              <span className="block text-[10px] font-bold tracking-wider text-slate-400 uppercase mb-1.5 flex items-center gap-1">
                <Building2 className="h-3 w-3 text-slate-400" />
                <span>FILTER NOVESTA TOWNSHIP</span>
              </span>
              <div className="relative">
                <select
                  value={selectedProject.id}
                  onChange={(e) => {
                    const match = NOVESTA_PROJECTS.find(
                      (p) => p.id === e.target.value,
                    );
                    if (match) setSelectedProject(match);
                  }}
                  className="w-full sm:w-64 appearance-none rounded-xl border border-slate-200 bg-white px-3 py-2.5 pr-8 text-xs font-semibold text-slate-800 shadow-2xs hover:border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-slate-900/10 cursor-pointer"
                >
                  {NOVESTA_PROJECTS.map((proj) => (
                    <option key={proj.id} value={proj.id}>
                      {proj.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
              </div>
            </div>
          </div>

          {/* Objective Summary Box */}
          <div className="rounded-xl border border-slate-200/60 bg-slate-50/80 p-3 text-xs text-slate-600 lg:max-w-xs">
            <span className="block text-[9.5px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">
              Current Flow Objective
            </span>
            <p className="text-[11px] leading-relaxed text-slate-700">
              {activeDataset.objective}
            </p>
          </div>
        </div>

        {/* 3. Top Analytics Row: Donut Chart + Stat Cards */}
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-12 items-stretch">
          {/* Donut Chart Card */}
          <div className="xl:col-span-5 min-w-0">
            <DonutChart
              workflowName={selectedProject.name}
              flowTitle={`${selectedBot.shortName} Outcomes`}
              totalCalls={activeDataset.totalCalls}
              dispositionConfigs={activeDataset.dispositionConfigs}
              orderedDispositions={activeDataset.orderedDispositions}
              selectedDisposition={selectedDispositionFilter}
              onSelectDisposition={setSelectedDispositionFilter}
            />
          </div>

          {/* 6 Stat Cards Grid */}
          <div className="xl:col-span-7 min-w-0">
            <StatCards
              items={activeDataset.statCards}
              onExportCategory={(category) => {
                const match = flowCalls.filter(
                  (c) => c.disposition === category,
                );
                alert(
                  `Exporting ${match.length || 1} records for "${category}"`,
                );
              }}
            />
          </div>
        </div>

        {/* 4. Call Log Table (Driven purely by the active flow's calls) */}
        <CallLogTable
          calls={flowCalls}
          workflowName={`${selectedBot.shortName} · ${selectedProject.name}`}
          externalDispositionFilter={selectedDispositionFilter}
          onClearExternalFilter={() => setSelectedDispositionFilter(null)}
          onSelectCall={handleSelectCall}
        />

        {/* 5. Additional Funnel Widgets (Dynamically tailored for this flow) */}
        <FunnelWidgets
          funnelData={activeDataset.funnelData}
          splitTitle={activeDataset.splitTitle}
          splitSubtitle={activeDataset.splitSubtitle}
          splitData={activeDataset.splitData}
          projectDemandTitle={activeDataset.projectDemandTitle}
          projectDemandSubtitle={activeDataset.projectDemandSubtitle}
          projectDemand={activeDataset.projectDemand}
          flowTitle={selectedBot.shortName}
        />
      </div>

      {/* Call Info Inspection Modal */}
      <CallInfoModal
        call={inspectedCall}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
