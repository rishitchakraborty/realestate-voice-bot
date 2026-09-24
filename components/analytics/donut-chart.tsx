"use client";

import React, { useState } from "react";
import {
  DISPOSITION_CONFIGS as DEFAULT_CONFIGS,
  ORDERED_DISPOSITIONS as DEFAULT_ORDER,
  DispositionConfig,
  DispositionType,
} from "./call-analytics-data";

interface DonutChartProps {
  selectedDisposition?: DispositionType | null;
  onSelectDisposition?: (disposition: DispositionType | null) => void;
  workflowName?: string;
  flowTitle?: string;
  totalCalls?: number;
  dispositionConfigs?: Record<string, DispositionConfig>;
  orderedDispositions?: DispositionType[];
}

export function DonutChart({
  selectedDisposition,
  onSelectDisposition,
  workflowName,
  flowTitle,
  totalCalls = 148,
  dispositionConfigs = DEFAULT_CONFIGS,
  orderedDispositions = DEFAULT_ORDER,
}: DonutChartProps) {
  const [hoveredDisposition, setHoveredDisposition] =
    useState<DispositionType | null>(null);

  const radius = 70;
  const strokeWidth = 24;
  const circumference = 2 * Math.PI * radius;

  // Filter orderedDispositions to only those present in dispositionConfigs
  const activeDispositions = orderedDispositions.filter(
    (type) => dispositionConfigs[type] !== undefined,
  );

  // Compute stroke dasharray and offset for each segment
  let accumulatedPercent = 0;
  const segments = activeDispositions.map((type) => {
    const config = dispositionConfigs[type];
    const segmentLength = (config.count / (totalCalls || 1)) * circumference;
    const strokeDasharray = `${segmentLength} ${circumference - segmentLength}`;
    const strokeDashoffset = -(accumulatedPercent / 100) * circumference;
    accumulatedPercent += config.percentage;

    return {
      type,
      config,
      strokeDasharray,
      strokeDashoffset,
    };
  });

  const activeItem = hoveredDisposition
    ? dispositionConfigs[hoveredDisposition]
    : selectedDisposition
      ? dispositionConfigs[selectedDisposition]
      : null;

  return (
    <div className="flex h-full flex-col justify-between rounded-xl border border-slate-200/80 bg-white p-5 shadow-xs">
      <div>
        {/* Header / Date range */}
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
            PAST 30 DAYS DISPOSITION ANALYSIS
          </span>
          {workflowName && (
            <span className="text-[10.5px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
              {workflowName}
            </span>
          )}
        </div>
        <h3 className="mt-1 text-base font-bold tracking-tight text-slate-900">
          {flowTitle || "Call Dispositions & Outcomes"}
        </h3>

        {/* Chart & Legend container */}
        <div className="mt-5 flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* SVG Donut Chart */}
          <div className="relative flex h-44 w-44 shrink-0 items-center justify-center">
            <svg
              className="h-full w-full -rotate-90 transform"
              viewBox="0 0 200 200"
            >
              {/* Background ring */}
              <circle
                cx="100"
                cy="100"
                r={radius}
                className="fill-none stroke-slate-100"
                strokeWidth={strokeWidth}
              />
              {/* Segments */}
              {segments.map((segment) => {
                const isHovered = hoveredDisposition === segment.type;
                const isSelected = selectedDisposition === segment.type;

                return (
                  <circle
                    key={segment.type}
                    cx="100"
                    cy="100"
                    r={radius}
                    className="fill-none cursor-pointer transition-all duration-200 hover:opacity-90"
                    stroke={segment.config.color}
                    strokeWidth={
                      isHovered || isSelected ? strokeWidth + 4 : strokeWidth
                    }
                    strokeDasharray={segment.strokeDasharray}
                    strokeDashoffset={segment.strokeDashoffset}
                    strokeLinecap="butt"
                    onMouseEnter={() => setHoveredDisposition(segment.type)}
                    onMouseLeave={() => setHoveredDisposition(null)}
                    onClick={() => {
                      if (onSelectDisposition) {
                        onSelectDisposition(
                          selectedDisposition === segment.type
                            ? null
                            : segment.type,
                        );
                      }
                    }}
                  />
                );
              })}
            </svg>

            {/* Center Callout */}
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center px-2">
              <span className="text-3xl font-extrabold tracking-tight text-slate-900 tabular-nums">
                {activeItem ? activeItem.count : totalCalls}
              </span>
              <span className="text-[9.5px] font-bold tracking-wider text-slate-400 uppercase truncate max-w-[120px]">
                {activeItem ? activeItem.label : "TOTAL CALLS"}
              </span>
              {activeItem && (
                <span className="text-[10px] font-semibold text-slate-500">
                  {activeItem.percentage}%
                </span>
              )}
            </div>
          </div>

          {/* Legend List */}
          <div className="flex flex-1 flex-col space-y-1 w-full min-w-0 sm:pl-2">
            {activeDispositions.map((type) => {
              const item = dispositionConfigs[type];
              if (!item) return null;
              const isHovered = hoveredDisposition === type;
              const isSelected = selectedDisposition === type;

              return (
                <button
                  key={type}
                  type="button"
                  onMouseEnter={() => setHoveredDisposition(type)}
                  onMouseLeave={() => setHoveredDisposition(null)}
                  onClick={() => {
                    if (onSelectDisposition) {
                      onSelectDisposition(isSelected ? null : type);
                    }
                  }}
                  className={`flex w-full items-center justify-between rounded-md px-2 py-1 text-left transition-colors duration-150 cursor-pointer ${
                    isSelected
                      ? "bg-slate-100 font-semibold ring-1 ring-slate-300"
                      : isHovered
                        ? "bg-slate-50 font-medium"
                        : "hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span
                      className="h-2.5 w-2.5 shrink-0 rounded-xs"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-slate-700 text-xs font-medium truncate">
                      {item.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-2.5 pl-3 shrink-0 tabular-nums">
                    <span className="font-bold text-slate-900 text-xs sm:text-sm min-w-[16px] text-right">
                      {item.count}
                    </span>
                    <span className="w-10 text-right text-[11px] text-slate-400">
                      {item.percentage}%
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer hint */}
      <p className="mt-5 border-t border-slate-100 pt-3 text-[11px] leading-relaxed text-slate-400">
        Hover a ring segment for its exact count. Every disposition is filterable in the call log table below.
      </p>
    </div>
  );
}
