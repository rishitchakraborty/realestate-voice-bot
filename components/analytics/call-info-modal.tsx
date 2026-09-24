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
  Calendar,
  Car,
  MessageSquareShare,
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

  const dispConfig = DISPOSITION_CONFIGS[call.disposition] || {
    label: call.disposition,
    count: 0,
    percentage: 0,
    color: "#2563eb",
    bgColor: "bg-blue-50",
    textColor: "text-blue-700",
    borderColor: "border-blue-200",
  };

  const isFlow2 =
    call.flowId === "call-flow-2" ||
    Boolean(call.visitSlot) ||
    call.disposition.includes("Site Visit") ||
    call.disposition.includes("Slot");

  // Dynamic state machine steps based on conversational flow
  const steps = isFlow2
    ? [
        { code: "S0", name: "Warm Reconnection & Identity Confirmation", passed: true },
        { code: "S1", name: "WhatsApp Brochure Review Check", passed: call.disposition !== "Brochure Not Reviewed" },
        { code: "S2", name: "Guided Walkthrough Invitation with Senior Architect", passed: call.disposition !== "Visit Declined" && call.disposition !== "Not Reachable" },
        {
          code: "S3",
          name: "Weekend / Weekday Slot Locking",
          passed:
            call.disposition === "Site Visit Confirmed" ||
            call.disposition === "Weekend Slot Locked" ||
            call.disposition === "Weekday Slot Locked" ||
            call.disposition === "VIP Cab Confirmed",
        },
        {
          code: "S4",
          name: "Complimentary Doorstep VIP Cab Pick-up Logistics",
          passed: call.disposition === "VIP Cab Confirmed" || Boolean(call.vipCabAddress),
        },
      ]
    : [
        { code: "S0", name: "Humanized Opening (Sub-5s Pacing Rule)", passed: true },
        { code: "S1", name: "Introduction & Novesta Enquiry Briefing", passed: call.purpose !== "—" },
        { code: "S2", name: "Property Preference Qualification (Plots vs Flats)", passed: call.configuration !== "—" },
        {
          code: "S3",
          name: "WhatsApp Verification & Legal Layout Dispatch",
          passed:
            call.disposition === "WhatsApp Brochure Sent" ||
            call.disposition === "Plot Interest Captured" ||
            call.disposition === "Flat Interest Captured" ||
            call.whatsAppStatus === "Delivered",
        },
      ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white shadow-xs">
              {isFlow2 ? <Calendar className="h-5 w-5 text-sky-400" /> : <Phone className="h-5 w-5 text-amber-400" />}
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

          {/* Flow Specific Special Data Box */}
          {isFlow2 && (call.visitSlot || call.vipCabAddress) && (
            <div className="rounded-xl border border-sky-200 bg-sky-50/50 p-4">
              <h4 className="font-semibold text-sky-950 flex items-center gap-1.5 mb-2.5">
                <Calendar className="h-4 w-4 text-sky-600" />
                <span>Confirmed Site Walkthrough Logistics</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-700">
                {call.visitSlot && (
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase">Reserved Slot</span>
                    <span className="font-semibold text-slate-900">{call.visitSlot}</span>
                  </div>
                )}
                {call.vipCabAddress && (
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase flex items-center gap-1">
                      <Car className="h-3 w-3 text-emerald-600" /> VIP Cab Pick-up Address
                    </span>
                    <span className="font-semibold text-slate-900">{call.vipCabAddress}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {!isFlow2 && call.whatsAppStatus && (
            <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-4">
              <h4 className="font-semibold text-emerald-950 flex items-center gap-1.5 mb-1.5">
                <MessageSquareShare className="h-4 w-4 text-emerald-600" />
                <span>WhatsApp Brochure Payload</span>
              </h4>
              <p className="text-xs text-slate-700">
                Official Unicorn Aerocity legal layout plan, master blueprint &amp; RERA approvals status:{" "}
                <span className="font-semibold text-emerald-800 uppercase">{call.whatsAppStatus}</span>
              </p>
            </div>
          )}

          {/* Extracted Attributes */}
          <div className="rounded-xl border border-slate-200/80 p-4">
            <h4 className="font-semibold text-slate-900 flex items-center gap-1.5 mb-3">
              <Layers className="h-4 w-4 text-slate-700" />
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
                <span className="text-slate-400 block text-[10px] uppercase">Property Type</span>
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
              <CheckCircle2 className="h-4 w-4 text-slate-800" />
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
                    <span className="font-mono font-bold text-[10px] px-1.5 py-0.5 rounded bg-white/80 border border-slate-200">
                      {st.code}
                    </span>
                    <span>{st.name}</span>
                  </div>
                  <span className="text-[10px] font-semibold uppercase">
                    {st.passed ? "Passed" : "Skipped"}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Notes if present */}
          {call.notes && (
            <div className="rounded-xl border border-slate-200/80 p-4">
              <h4 className="font-semibold text-slate-900 flex items-center gap-1.5 mb-2">
                <FileText className="h-4 w-4 text-slate-500" />
                <span>Call Summary &amp; Relationship Manager Notes</span>
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed font-sans">
                {call.notes}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-slate-100 pt-3 flex items-center justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-slate-800 cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
