"use client";

import React from "react";
import {
  ArrowRight,
  Award,
  Building2,
  CalendarCheck,
  Compass,
  Globe2,
  Home,
  Languages,
  MapPin,
  Mic,
  Phone,
  PhoneCall,
  ShieldCheck,
  Sparkles,
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
        "relative flex h-full w-full flex-col justify-between overflow-y-auto bg-gradient-to-b from-slate-50 via-[#f0f4f9] to-slate-100 px-4 py-8 md:px-10 md:py-10 text-slate-900",
        className,
      )}
      {...props}
    >
      {/* Architectural Blueprint / Tech Grid Pattern Background */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#94a3b8_1px,transparent_1px)] [background-size:24px_24px] opacity-25" />
      <div className="pointer-events-none absolute -top-40 right-0 h-96 w-96 rounded-full bg-amber-200/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 left-0 h-96 w-96 rounded-full bg-sky-200/20 blur-3xl" />

      {/* HERO SECTION */}
      <div className="relative z-10 mx-auto my-auto flex max-w-6xl flex-col items-center text-center">
        {/* Top Badges */}
        <div className="mb-4 flex flex-wrap items-center justify-center gap-2">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-300/80 bg-amber-50/90 px-4 py-1.5 text-xs font-semibold text-amber-900 shadow-xs backdrop-blur-xs">
            <Award className="h-3.5 w-3.5 text-amber-600" />
            <span>35+ Years of Legacy • 10M+ Sq.Ft. Delivered</span>
          </div>

          <div className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white/90 px-3.5 py-1.5 text-xs font-medium text-slate-700 shadow-xs backdrop-blur-xs">
            <span>Powered by</span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/alcove-reality-bot/quarkLogo.png"
              alt="QuarkGen"
              className="h-3.5 w-auto object-contain inline-block"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/quarkLogo.png";
              }}
            />
          </div>
        </div>

        {/* Alcove Brand Logo + Headline */}
        <div className="mb-3 flex items-center justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/alcove-reality-bot/alcove.webp"
            alt="Alcove Realty"
            className="h-12 sm:h-14 w-auto object-contain drop-shadow-xs"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/alcove.webp";
            }}
          />
        </div>

        <h1 className="max-w-4xl text-2xl font-extrabold tracking-tight text-slate-900 sm:text-4xl md:text-5xl leading-[1.2]">
          Building a Happy Future with{" "}
          <span className="bg-gradient-to-r from-[#0f2b48] via-[#1e40af] to-[#b45309] bg-clip-text text-transparent">
            Alcove Voice Assistant
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-4 max-w-3xl text-xs sm:text-sm md:text-base leading-relaxed text-slate-600">
          Discover Kolkata&apos;s most prestigious landmarks including{" "}
          <strong className="font-semibold text-slate-800">The 42</strong>,{" "}
          <strong className="font-semibold text-slate-800">New Kolkata</strong>,{" "}
          <strong className="font-semibold text-slate-800">
            Flora Fountain
          </strong>
          , and{" "}
          <strong className="font-semibold text-slate-800">The Curve</strong>.
          Speak naturally in English, Hindi, or Bengali to get instant pricing,
          configurations, and book private site visits.
        </p>

        {/* Primary Call to Action Button */}
        <div className="mt-7 flex flex-col items-center gap-4 sm:flex-row">
          <Button
            size="lg"
            onClick={onStartCall}
            className="group relative flex h-14 items-center gap-3 rounded-2xl bg-[#0f2b48] px-9 font-semibold text-white shadow-xl shadow-[#0f2b48]/20 transition-all duration-300 hover:bg-[#163a61] hover:scale-105 active:scale-95 cursor-pointer border border-[#0f2b48]"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-400 text-slate-950">
              <PhoneCall className="h-4 w-4 animate-bounce" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-sm font-bold tracking-wide">
                {startButtonText || "Start Voice Consultation"}
              </span>
              <span className="text-[10px] font-normal text-amber-200">
                Click to speak with Alcove AI Agent
              </span>
            </div>
            <ArrowRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1.5 text-amber-300" />
          </Button>
        </div>

        {/* ALCOVE REALTY ICONIC PROJECTS SHOWCASE */}
        <div className="mt-10 w-full max-w-5xl">
          <div className="mb-3 flex items-center justify-between text-left">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <Building2 className="h-3.5 w-3.5 text-amber-600" />
              Featured Alcove Developments
            </h2>
            <span className="text-[11px] font-medium text-slate-400">
              Ask our voice agent about any project
            </span>
          </div>

          <div className="grid w-full grid-cols-1 gap-4 text-left sm:grid-cols-2 lg:grid-cols-4">
            {/* Project 1: The 42 */}
            <div className="group flex flex-col justify-between rounded-xl border border-slate-200/90 bg-white/95 p-4 shadow-xs backdrop-blur-xs transition-all duration-200 hover:border-amber-400/80 hover:shadow-md">
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <span className="rounded-md bg-amber-100/70 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-amber-800">
                    Ultra Luxury
                  </span>
                  <span className="text-[10px] font-semibold text-slate-400">
                    Chowringhee
                  </span>
                </div>
                <h3 className="text-sm font-bold text-[#0f2b48] group-hover:text-amber-700 transition-colors">
                  THE 42
                </h3>
                <p className="mt-1.5 text-[11px] leading-relaxed text-slate-600">
                  Kolkata&apos;s tallest 65-storey iconic skyscraper with 360°
                  panoramic views of the Maidan.
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] font-medium text-slate-500">
                <span>4 &amp; 5 BHK Bungalows</span>
                <span className="text-amber-600 font-semibold">Ready</span>
              </div>
            </div>

            {/* Project 2: New Kolkata */}
            <div className="group flex flex-col justify-between rounded-xl border border-slate-200/90 bg-white/95 p-4 shadow-xs backdrop-blur-xs transition-all duration-200 hover:border-amber-400/80 hover:shadow-md">
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <span className="rounded-md bg-sky-100/70 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-sky-800">
                    Ganges Township
                  </span>
                  <span className="text-[10px] font-semibold text-slate-400">
                    Serampore
                  </span>
                </div>
                <h3 className="text-sm font-bold text-[#0f2b48] group-hover:text-sky-700 transition-colors">
                  NEW KOLKATA
                </h3>
                <p className="mt-1.5 text-[11px] leading-relaxed text-slate-600">
                  Riverside township with private dedicated ferry, Ganga ghat,
                  rail &amp; road 3-way connectivity.
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] font-medium text-slate-500">
                <span>1, 2 &amp; 3 BHK Flats</span>
                <span className="text-sky-600 font-semibold">Under Const.</span>
              </div>
            </div>

            {/* Project 3: Flora Fountain */}
            <div className="group flex flex-col justify-between rounded-xl border border-slate-200/90 bg-white/95 p-4 shadow-xs backdrop-blur-xs transition-all duration-200 hover:border-amber-400/80 hover:shadow-md">
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <span className="rounded-md bg-emerald-100/70 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-emerald-800">
                    Premium Living
                  </span>
                  <span className="text-[10px] font-semibold text-slate-400">
                    Topsia / EM Bypass
                  </span>
                </div>
                <h3 className="text-sm font-bold text-[#0f2b48] group-hover:text-emerald-700 transition-colors">
                  FLORA FOUNTAIN
                </h3>
                <p className="mt-1.5 text-[11px] leading-relaxed text-slate-600">
                  Twin luxury towers surrounded by tranquil water fountains,
                  landscaped gardens &amp; clubhouse.
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] font-medium text-slate-500">
                <span>3 &amp; 4 BHK Luxury</span>
                <span className="text-emerald-600 font-semibold">
                  Award Winner
                </span>
              </div>
            </div>

            {/* Project 4: The Curve */}
            <div className="group flex flex-col justify-between rounded-xl border border-slate-200/90 bg-white/95 p-4 shadow-xs backdrop-blur-xs transition-all duration-200 hover:border-amber-400/80 hover:shadow-md">
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <span className="rounded-md bg-purple-100/70 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-purple-800">
                    Contemporary
                  </span>
                  <span className="text-[10px] font-semibold text-slate-400">
                    Kolkata
                  </span>
                </div>
                <h3 className="text-sm font-bold text-[#0f2b48] group-hover:text-purple-700 transition-colors">
                  THE CURVE
                </h3>
                <p className="mt-1.5 text-[11px] leading-relaxed text-slate-600">
                  Award-winning architectural residential solutions &amp;
                  lifestyle living spaces.
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] font-medium text-slate-500">
                <span>Design of the Year</span>
                <span className="text-purple-600 font-semibold">
                  2026 Award
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* VOICE AI CAPABILITIES BAR */}
        <div className="mt-6 grid w-full max-w-5xl grid-cols-1 gap-3 sm:grid-cols-3 text-left">
          <div className="flex items-center gap-3 rounded-xl border border-slate-200/80 bg-white/70 p-3 shadow-2xs backdrop-blur-xs">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-50 text-amber-700 border border-amber-100">
              <Zap className="h-4 w-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">
                Real-Time Voice AI
              </h4>
              <p className="text-[10px] text-slate-500">
                Powered by QuarkGen with sub-200ms conversational latency.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl border border-slate-200/80 bg-white/70 p-3 shadow-2xs backdrop-blur-xs">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-sky-50 text-sky-700 border border-sky-100">
              <Languages className="h-4 w-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">
                Multilingual Support
              </h4>
              <p className="text-[10px] text-slate-500">
                Speak fluently in English, Hindi (हिंदी), or Bengali (বাংলা).
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl border border-slate-200/80 bg-white/70 p-3 shadow-2xs backdrop-blur-xs">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-100">
              <CalendarCheck className="h-4 w-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">
                Book Site Visits
              </h4>
              <p className="text-[10px] text-slate-500">
                Instantly schedule guided property tours &amp; sales gallery
                visits.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER BANNER */}
      <footer className="relative z-10 mt-8 flex flex-col items-center justify-between border-t border-slate-200/90 pt-5 text-xs text-slate-500 sm:flex-row gap-3">
        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-center sm:text-left">
          <p className="font-semibold text-slate-700">
            © 2026 Alcove Realty. All Rights Reserved.
          </p>
          <span className="hidden sm:inline text-slate-300">•</span>
          <p className="text-[11px] text-slate-500">
            Ganapati, 68/2 Harish Mukherjee Road, Kolkata – 700 025
          </p>
          <span className="hidden sm:inline text-slate-300">•</span>
          <a
            href="tel:8101881018"
            className="text-[11px] font-medium text-amber-700 hover:underline inline-flex items-center gap-1 justify-center"
          >
            <Phone className="h-3 w-3 inline" /> +91 81018 81018
          </a>
        </div>

        {/* Powered by QuarkGen Footer Logo */}
        <div className="flex items-center gap-2 rounded-lg bg-white/80 px-3 py-1.5 border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-medium text-slate-600">
            Powered by
          </span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/alcove-reality-bot/quarkLogo.png"
            alt="QuarkGen"
            className="h-4 w-auto object-contain"
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
