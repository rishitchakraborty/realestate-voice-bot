"use client";

import React from "react";
import {
  X,
  Phone,
  Clock,
  MapPin,
  Home,
  IndianRupee,
  CheckCircle2,
  FileText,
  Activity,
  Layers,
} from "lucide-react";
import {
  CallRecord,
  DISPOSITION_CONFIGS,
} from "./call-analytics-data";

interface CallInfoModalProps {
  call: CallRecord | null;
  isOpen: boolean;
  onClose: () => void;
}

export function CallInfoModal({ call, isOpen, onClose }: CallInfoModalProps) {
  if (!isOpen || !call) return null;

  const dispConfig = DISPOSITION_CONFIGS[call.disposition];

  // State machine steps simulation
  const steps = [
    { code: "S0", name: "Greeting & Brand Introduction", passed: true },
    { code: "S1", name: "Interest Discovery & Purpose", passed: call.purpose !== "—" },
    { code: "S2", name: "Project Highlights & Amenities", passed: call.preferredLocation !== "—" },
    { code: "S3", name: "Configuration & Budget Qualification", passed: call.configuration !== "—" },
    {
      code: "S9",
      name: "Site Visit Scheduling",
      passed: call.disposition === "Site Visit Booked",
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <Phone className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slate-900">
                  {call.customerName}
                </h3>
                <span
                  className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-semibold ${dispConfig.bgColor} ${dispConfig.textColor} ${dispConfig.borderColor}`}
                >
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ backgroundColor: dispConfig.color }}
                  />
                  {call.disposition}
                </span>
              </div>
              <p className="text-xs text-slate-500 font-mono mt-0.5">
                {call.phoneNumber} · Session: {call.sessionId.slice(0, 18)}...
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700 cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="overflow-y-auto py-4 space-y-6 flex-1 pr-1 text-xs">
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-3">
              <span className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider">
                Duration
              </span>
              <div className="mt-1 flex items-center gap-1.5 text-slate-900 font-mono font-bold text-sm">
                <Clock className="h-3.5 w-3.5 text-slate-500" />
                {call.duration}
              </div>
            </div>

            <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-3">
              <span className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider">
                Language
              </span>
              <div className="mt-1 text-slate-900 font-bold text-sm">
                {call.language}
              </div>
            </div>

            <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-3">
              <span className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider">
                Lead Score
              </span>
              <div className="mt-1 text-slate-900 font-bold text-sm flex items-center gap-1">
                {call.leadScore ? (
                  <>
                    <Activity className="h-3.5 w-3.5 text-emerald-500" />
                    <span>{call.leadScore}/100</span>
                  </>
                ) : (
                  <span className="text-slate-400">—</span>
                )}
              </div>
            </div>

            <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-3">
              <span className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider">
                Sentiment
              </span>
              <div className="mt-1 text-slate-900 font-bold text-sm">
                {call.sentiment || "Neutral"}
              </div>
            </div>
          </div>

          {/* LeadProfile Extracted Intent */}
          <div className="rounded-xl border border-slate-200/80 p-4">
            <h4 className="font-semibold text-slate-900 flex items-center gap-1.5 mb-3">
              <Layers className="h-4 w-4 text-blue-600" />
              <span>Extracted LeadProfile Attributes</span>
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-slate-700">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">Purpose</span>
                <span className="font-medium text-slate-900">{call.purpose}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">Location</span>
                <span className="font-medium text-slate-900 flex items-center gap-1">
                  <MapPin className="h-3 w-3 text-slate-400" />
                  {call.preferredLocation}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">BHK Type</span>
                <span className="font-medium text-slate-900 flex items-center gap-1">
                  <Home className="h-3 w-3 text-slate-400" />
                  {call.configuration}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">Budget</span>
                <span className="font-medium text-slate-900 flex items-center gap-1">
                  <IndianRupee className="h-3 w-3 text-slate-400" />
                  {call.budgetRange}
                </span>
              </div>
            </div>
          </div>

          {/* State Machine Trace */}
          <div className="rounded-xl border border-slate-200/80 p-4">
            <h4 className="font-semibold text-slate-900 flex items-center gap-1.5 mb-3">
              <CheckCircle2 className="h-4 w-4 text-blue-600" />
              <span>Deterministic Script State Machine Trace</span>
            </h4>
            <div className="space-y-2">
              {steps.map((st) => (
                <div
                  key={st.code}
                  className={`flex items-center justify-between p-2 rounded-lg border text-xs ${
                    st.passed
                      ? "bg-emerald-50/60 border-emerald-200 text-emerald-900"
                      : "bg-slate-50 border-slate-200/60 text-slate-400"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold">{st.code}</span>
                    <span>{st.name}</span>
                  </div>
                  <span className="text-[10px] font-semibold uppercase">
                    {st.passed ? "Reached" : "Skipped / Dropped"}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Mock Transcript Preview */}
          <div className="rounded-xl border border-slate-200/80 p-4 bg-slate-50/50">
            <h4 className="font-semibold text-slate-900 flex items-center gap-1.5 mb-2">
              <FileText className="h-4 w-4 text-slate-600" />
              <span>Session Transcript Preview</span>
            </h4>
            {call.duration === "00:00" ? (
              <p className="text-slate-400 italic">
                No conversation captured. Call ended at telephony / SIP gateway layer.
              </p>
            ) : (
              <div className="space-y-2 font-mono text-[11px] text-slate-700">
                <p>
                  <span className="font-bold text-blue-600">AI:</span> Hello, am I speaking
                  with {call.customerName}? Calling from Alcove Realty regarding your enquiry.
                </p>
                <p>
                  <span className="font-bold text-emerald-600">Customer:</span> Yes, I was
                  looking at properties in {call.preferredLocation !== "—" ? call.preferredLocation : "Kolkata"}.
                </p>
                <p>
                  <span className="font-bold text-blue-600">AI:</span> Wonderful! We have
                  exclusive premium units fitting your requirement.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end border-t border-slate-100 pt-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg bg-slate-900 px-4 py-1.5 text-xs font-semibold text-white shadow-xs hover:bg-slate-800 cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
