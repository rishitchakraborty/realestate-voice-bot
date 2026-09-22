"use client";

import React from "react";
import {
  ArrowRight,
  Award,
  Building2,
  CalendarCheck,
  CheckCircle2,
  FileCheck,
  Languages,
  MapPin,
  Phone,
  PhoneCall,
  Scale,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/shadcn/utils";

interface WelcomeViewProps {
  startButtonText: string;
  onStartCall: () => void;
  ref?: React.Ref<HTMLDivElement>;
}

export const WelcomeView = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & WelcomeViewProps
>(({ startButtonText, onStartCall, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "relative flex h-full w-full flex-col justify-start overflow-y-auto bg-gradient-to-b from-white via-[#faf9f6] to-white px-4 py-8 text-slate-900 md:px-8 md:py-10",
        className,
      )}
      {...props}
    >
      {/* Subtle Luxury Ambient Glow (No dots) */}
      <div className="pointer-events-none absolute -top-40 right-1/4 h-[500px] w-[500px] rounded-full bg-[#c9a24c]/6 blur-[140px]" />
      <div className="pointer-events-none absolute top-1/3 -left-40 h-[450px] w-[450px] rounded-full bg-[#0e1230]/4 blur-[130px]" />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center text-center">
        {/* Top Header Brand Badge */}
        <div className="mb-6 flex flex-wrap items-center justify-center gap-2.5">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#c9a24c]/30 bg-[#fbf7ee] px-4 py-1.5 text-xs font-semibold text-[#8b6508] shadow-xs">
            <Sparkles className="h-3.5 w-3.5 text-[#b8860b]" />
            <span>Novesta Group • Premier Bungalows &amp; Plotted Communities</span>
          </div>

          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-medium text-slate-600 shadow-xs">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>AI Voice Specialist Online</span>
          </div>
        </div>

        {/* Official Novesta Logo Card */}
        <div className="mb-6 flex items-center justify-center">
          <div className="inline-flex items-center justify-center rounded-2xl bg-[#0e1230] px-7 py-3.5 shadow-lg shadow-[#0e1230]/10 border border-[#c9a24c]/30">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/novesta-bot/novesta/white-logo.png"
              alt="Novesta Group"
              className="h-9 w-auto object-contain sm:h-11"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/novesta/white-logo.png";
              }}
            />
          </div>
        </div>

        {/* Main Headline */}
        <h1 className="max-w-4xl font-serif text-3xl font-extrabold tracking-tight text-[#0e1230] sm:text-5xl md:text-6xl leading-[1.15]">
          The Art of the Bungalow &amp;{" "}
          <span className="bg-gradient-to-r from-[#996515] via-[#c9a24c] to-[#7a5203] bg-clip-text text-transparent">
            Residential Plots
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-4 max-w-2xl text-sm md:text-base leading-relaxed text-slate-600">
          Crafting legally vetted, high-appreciation plotted townships and bespoke luxury residences across Kolkata. Connect directly with our intelligent voice assistant for verified inventory, plot layouts, and VIP cab site visits.
        </p>

        {/* Action Controls */}
        <div className="mt-8 flex flex-col items-center justify-center gap-3.5 sm:flex-row">
          <Button
            size="lg"
            onClick={onStartCall}
            className="group relative flex h-14 items-center gap-3.5 rounded-xl bg-[#0e1230] px-9 font-semibold text-white shadow-xl shadow-[#0e1230]/20 transition-all duration-300 hover:bg-[#16223d] hover:scale-102 hover:shadow-2xl hover:shadow-[#0e1230]/30 active:scale-98 cursor-pointer border border-[#1b2644]"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#c9a24c] text-[#0e1230] shadow-sm transition-transform group-hover:scale-110">
              <PhoneCall className="h-4 w-4" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-sm font-bold uppercase tracking-wider text-white">
                {startButtonText || "Start Voice Consultation"}
              </span>
              <span className="text-[10.5px] font-normal text-slate-300">
                Instant connection • English, Hindi &amp; Bengali
              </span>
            </div>
            <ArrowRight className="ml-1 h-4 w-4 text-[#c9a24c] transition-transform group-hover:translate-x-1" />
          </Button>

          <a
            href="tel:+919147768032"
            className="inline-flex h-14 items-center gap-2.5 rounded-xl border border-slate-200 bg-white px-6 text-xs font-semibold text-slate-800 shadow-xs transition-all hover:border-[#c9a24c] hover:bg-[#fbf7ee] hover:shadow-sm"
          >
            <Phone className="h-4 w-4 text-[#b8860b]" />
            <span>Direct Desk: +91 91477 68032</span>
          </a>
        </div>

        {/* 4 CORE TRUST PILLARS (CLEAN & ELEGANT) */}
        <div className="mt-10 grid w-full max-w-4xl grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="flex flex-col items-center justify-center rounded-xl border border-slate-200/90 bg-white p-3.5 shadow-2xs text-center transition-colors hover:border-[#c9a24c]/60">
            <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-[#fbf7ee] text-[#b8860b]">
              <Scale className="h-4 w-4" />
            </div>
            <span className="text-xs font-bold text-[#0e1230]">100% Legal Clearance</span>
            <span className="mt-0.5 text-[10.5px] text-slate-500">Mutation &amp; Conversion Ready</span>
          </div>

          <div className="flex flex-col items-center justify-center rounded-xl border border-slate-200/90 bg-white p-3.5 shadow-2xs text-center transition-colors hover:border-[#c9a24c]/60">
            <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-[#fbf7ee] text-[#b8860b]">
              <FileCheck className="h-4 w-4" />
            </div>
            <span className="text-xs font-bold text-[#0e1230]">Undisputed Title</span>
            <span className="mt-0.5 text-[10.5px] text-slate-500">Freehold Immediate Registry</span>
          </div>

          <div className="flex flex-col items-center justify-center rounded-xl border border-slate-200/90 bg-white p-3.5 shadow-2xs text-center transition-colors hover:border-[#c9a24c]/60">
            <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-[#fbf7ee] text-[#b8860b]">
              <CalendarCheck className="h-4 w-4" />
            </div>
            <span className="text-xs font-bold text-[#0e1230]">Assured Timelines</span>
            <span className="mt-0.5 text-[10.5px] text-slate-500">Guaranteed Handover</span>
          </div>

          <div className="flex flex-col items-center justify-center rounded-xl border border-slate-200/90 bg-white p-3.5 shadow-2xs text-center transition-colors hover:border-[#c9a24c]/60">
            <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-[#fbf7ee] text-[#b8860b]">
              <ShieldCheck className="h-4 w-4" />
            </div>
            <span className="text-xs font-bold text-[#0e1230]">Complete Transparency</span>
            <span className="mt-0.5 text-[10.5px] text-slate-500">Zero Hidden Surcharges</span>
          </div>
        </div>

        {/* FLAGSHIP DEVELOPMENTS SECTION */}
        <div className="mt-14 w-full">
          <div className="mb-5 flex flex-col sm:flex-row sm:items-end sm:justify-between text-left gap-1">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#8b6508]">
                Signature Townships
              </span>
              <h2 className="mt-0.5 text-xl font-bold tracking-tight text-[#0e1230] sm:text-2xl">
                Featured Novesta Developments
              </h2>
            </div>
            <span className="text-xs text-slate-500">
              Ask our voice agent for floor plans &amp; live availability
            </span>
          </div>

          <div className="grid w-full grid-cols-1 gap-5 text-left sm:grid-cols-2 lg:grid-cols-4">
            {/* Project 1: Unicorn Aerocity */}
            <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-3.5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#c9a24c] hover:shadow-lg">
              <div className="relative mb-3 h-40 w-full overflow-hidden rounded-xl bg-slate-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/novesta-bot/projects/unicorn-aerocity.png"
                  alt="Unicorn Aerocity"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/projects/unicorn-aerocity.png";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                <span className="absolute left-2.5 top-2.5 inline-flex items-center gap-1 rounded-md bg-[#0e1230]/90 px-2 py-0.5 text-[9.5px] font-bold uppercase tracking-wider text-[#f5dfa2] border border-[#c9a24c]/40 backdrop-blur-xs">
                  <MapPin className="h-2.5 w-2.5" /> Beside Airport
                </span>
                <span className="absolute bottom-2.5 right-2.5 rounded-md bg-[#c9a24c] px-2.5 py-0.5 text-[10px] font-bold text-[#0e1230] shadow-xs">
                  From ₹40 Lakhs*
                </span>
              </div>
              <div className="px-1">
                <h3 className="text-base font-bold text-[#0e1230] group-hover:text-[#8b6508] transition-colors">
                  Unicorn Aerocity
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-slate-600">
                  Airport-facing township along NH-12 runway. G+1 residential plots with high appreciation and fast VIP Road access.
                </p>
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-slate-100 px-1 pt-2.5 text-[11px] font-medium text-slate-500">
                <span>1,000–4,000 Sq.Ft.</span>
                <span className="font-semibold text-[#8b6508]">Upfront Registry</span>
              </div>
            </div>

            {/* Project 2: Eco Smart City */}
            <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-3.5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#c9a24c] hover:shadow-lg">
              <div className="relative mb-3 h-40 w-full overflow-hidden rounded-xl bg-slate-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/novesta-bot/projects/eco-smart-city.png"
                  alt="Eco Smart City"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/projects/eco-smart-city.png";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                <span className="absolute left-2.5 top-2.5 inline-flex items-center gap-1 rounded-md bg-[#0e1230]/90 px-2 py-0.5 text-[9.5px] font-bold uppercase tracking-wider text-[#7bdcb5] border border-[#7bdcb5]/40 backdrop-blur-xs">
                  <MapPin className="h-2.5 w-2.5" /> Newtown AA-II
                </span>
                <span className="absolute bottom-2.5 right-2.5 rounded-md bg-[#c9a24c] px-2.5 py-0.5 text-[10px] font-bold text-[#0e1230] shadow-xs">
                  100-Acre Green
                </span>
              </div>
              <div className="px-1">
                <h3 className="text-base font-bold text-[#0e1230] group-hover:text-[#8b6508] transition-colors">
                  Eco Smart City
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-slate-600">
                  Sustainable living in Newtown Rajarhat with solar energy, smart water recycling, organic greens, and modern eco-villas.
                </p>
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-slate-100 px-1 pt-2.5 text-[11px] font-medium text-slate-500">
                <span>Green Township</span>
                <span className="font-semibold text-emerald-700">Action Area II</span>
              </div>
            </div>

            {/* Project 3: Unicorn Riverside Resort */}
            <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-3.5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#c9a24c] hover:shadow-lg">
              <div className="relative mb-3 h-40 w-full overflow-hidden rounded-xl bg-slate-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/novesta-bot/projects/unicorn-riverside-resort.jpg"
                  alt="Unicorn Riverside Resort"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/projects/unicorn-riverside-resort.jpg";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                <span className="absolute left-2.5 top-2.5 inline-flex items-center gap-1 rounded-md bg-[#0e1230]/90 px-2 py-0.5 text-[9.5px] font-bold uppercase tracking-wider text-sky-200 border border-sky-400/40 backdrop-blur-xs">
                  <MapPin className="h-2.5 w-2.5" /> Ganges Front
                </span>
                <span className="absolute bottom-2.5 right-2.5 rounded-md bg-blue-600 px-2.5 py-0.5 text-[10px] font-bold text-white shadow-xs">
                  5-Star Living
                </span>
              </div>
              <div className="px-1">
                <h3 className="text-base font-bold text-[#0e1230] group-hover:text-[#8b6508] transition-colors">
                  Unicorn Riverside Resort
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-slate-600">
                  5-Star resort style residences right along the sacred river Ganges. High capital appreciation and vacation villa living.
                </p>
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-slate-100 px-1 pt-2.5 text-[11px] font-medium text-slate-500">
                <span>Waterfront Living</span>
                <span className="font-semibold text-blue-700">River Ganges</span>
              </div>
            </div>

            {/* Project 4: The Art of the Bungalow */}
            <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-3.5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#c9a24c] hover:shadow-lg">
              <div className="relative mb-3 h-40 w-full overflow-hidden rounded-xl bg-slate-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/novesta-bot/hero-bg.jpg"
                  alt="The Art of the Bungalow"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/hero-bg.jpg";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                <span className="absolute left-2.5 top-2.5 inline-flex items-center gap-1 rounded-md bg-[#0e1230]/90 px-2 py-0.5 text-[9.5px] font-bold uppercase tracking-wider text-[#f5dfa2] border border-[#c9a24c]/40 backdrop-blur-xs">
                  <MapPin className="h-2.5 w-2.5" /> Luxury Villas
                </span>
                <span className="absolute bottom-2.5 right-2.5 rounded-md bg-[#c9a24c] px-2.5 py-0.5 text-[10px] font-bold text-[#0e1230] shadow-xs">
                  Private Sanctuary
                </span>
              </div>
              <div className="px-1">
                <h3 className="text-base font-bold text-[#0e1230] group-hover:text-[#8b6508] transition-colors">
                  The Art of the Bungalow
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-slate-600">
                  Custom luxury bungalows and gated villa sanctuaries with freehold ownership, landscaped lawns, and full clubhouse access.
                </p>
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-slate-100 px-1 pt-2.5 text-[11px] font-medium text-slate-500">
                <span>3 &amp; 4 BHK Bungalows</span>
                <span className="font-semibold text-[#8b6508]">100% Clear Title</span>
              </div>
            </div>
          </div>
        </div>

        {/* VOICE AI CAPABILITIES ROW */}
        <div className="mt-10 grid w-full grid-cols-1 gap-3.5 sm:grid-cols-3 text-left">
          <div className="flex items-center gap-3.5 rounded-xl border border-slate-200/90 bg-white p-4 shadow-xs">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-700 border border-amber-200/80">
              <Zap className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#0e1230]">
                Sub-200ms Conversational AI
              </h4>
              <p className="mt-0.5 text-[11px] text-slate-500">
                Real-time voice intelligence powered by QuarkGen Engine.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 rounded-xl border border-slate-200/90 bg-white p-4 shadow-xs">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700 border border-blue-200/80">
              <Languages className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#0e1230]">
                Multilingual Fluency
              </h4>
              <p className="mt-0.5 text-[11px] text-slate-500">
                Converses naturally in Bengali, Hindi, and English.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 rounded-xl border border-slate-200/90 bg-white p-4 shadow-xs">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200/80">
              <CalendarCheck className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#0e1230]">
                Complimentary Site Visit
              </h4>
              <p className="mt-0.5 text-[11px] text-slate-500">
                Schedule your slot with complimentary doorstep cab pickup.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="relative z-10 mt-12 flex flex-col items-center justify-between border-t border-slate-200 pt-6 text-xs text-slate-500 sm:flex-row gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 text-center sm:text-left">
          <p className="font-semibold text-slate-700">
            © 2026 Novesta Group. All Rights Reserved.
          </p>
          <span className="hidden sm:inline text-slate-300">•</span>
          <p className="text-[11px] text-slate-500">
            Office: 9ES1, Mani Casadona, Newtown, Kolkata 700156
          </p>
          <span className="hidden sm:inline text-slate-300">•</span>
          <a
            href="tel:+919147768032"
            className="text-[11px] font-semibold text-[#8b6508] hover:underline inline-flex items-center gap-1 justify-center"
          >
            <Phone className="h-3 w-3 inline text-[#b8860b]" /> +91 91477 68032
          </a>
        </div>

        <div className="flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-1.5 border border-slate-200">
          <span className="text-[11px] font-medium text-slate-500">
            Powered by
          </span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/novesta-bot/quarkLogo.png"
            alt="QuarkGen"
            className="h-3.5 w-auto object-contain"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/quarkLogo.png";
            }}
          />
        </div>
      </footer>
    </div>
  );
});

WelcomeView.displayName = "WelcomeView";
