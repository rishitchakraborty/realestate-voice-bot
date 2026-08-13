"use client";

import React from "react";
import { ArrowRight, Globe, Mail, MapPin, Mic, Phone, PhoneCall, Sparkles, Zap } from "lucide-react";
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
        "relative flex h-full w-full flex-col justify-between overflow-y-auto bg-gradient-to-b from-slate-50 via-sky-50/20 to-slate-50 px-4 py-8 md:px-12 md:py-12 text-slate-900",
        className,
      )}
      {...props}
    >
      {/* Subtle Tech Constellation / Mesh Background Overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px] opacity-40" />

      {/* HERO SECTION */}
      <div className="relative z-10 mx-auto my-auto flex max-w-5xl flex-col items-center text-center">
        {/* Badge */}
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-sky-200/80 bg-sky-50/80 px-4 py-1.5 text-xs font-semibold text-sky-700 shadow-xs backdrop-blur-xs">
          <Sparkles className="h-3.5 w-3.5 text-sky-500" />
          <span>QuarkGen Enterprise Voice AI Platform</span>
        </div>

        {/* Headline */}
        <h1 className="max-w-4xl text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl md:text-6xl leading-[1.15]">
          Powerful{" "}
          <span className="bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Multilingual Voice Gen AI
          </span>{" "}
          Agents for Real Estate
        </h1>

        {/* Subtitle */}
        <p className="mt-6 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base md:text-lg">
          Revolutionize hyper-personalized customer communication with
          outcome-oriented Enterprise LLMs, speech sentiment analytics, and
          Real-Time Speech-to-Speech models.
        </p>

        {/* Call to Action Button */}
        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row">
          <Button
            size="lg"
            onClick={onStartCall}
            className="group relative flex h-13 items-center gap-3 rounded-xl bg-slate-950 px-8 font-semibold text-white shadow-xl transition-all duration-200 hover:bg-slate-900 hover:scale-105 active:scale-95 cursor-pointer"
          >
            <PhoneCall className="h-4 w-4 text-emerald-400 animate-pulse" />
            <span>{startButtonText || "Start Real estate Voice Demo"}</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>

        {/* FEATURE CARDS SHOWCASE (QuarkGen Brand Theme) */}
        <div className="mt-14 grid w-full max-w-5xl grid-cols-1 gap-5 text-left sm:grid-cols-2 lg:grid-cols-3">
          {/* Card 1: Natural Voice */}
          <div className="flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white/90 p-6 shadow-xs backdrop-blur-md transition-all hover:shadow-md hover:border-slate-300">
            <div>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-sky-50 text-sky-600 border border-sky-100">
                <Mic className="h-6 w-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">
                Natural Voice Synthesis
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">
                Ultra-realistic AI voices with emotion, tone modulation, and
                regional accents for authentic conversations.
              </p>
            </div>
          </div>

          {/* Card 2: 12+ Indic Languages */}
          {/* <div className="flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white/90 p-6 shadow-xs backdrop-blur-md transition-all hover:shadow-md hover:border-slate-300">
            <div>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50 text-purple-600 border border-purple-100">
                <Globe className="h-6 w-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">
                12+ Indic Languages
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">
                Native support for Hindi, Tamil, Telugu, Bengali, Marathi and
                more with code-switching capabilities.
              </p>
            </div>
          </div> */}

          {/* Card 3: Real-Time Processing (Highlighted Card) */}
          <div className="flex flex-col justify-between rounded-2xl border-t-2 border-t-purple-500 border border-slate-200/90 bg-white/95 p-6 shadow-md backdrop-blur-md transition-all hover:shadow-lg">
            <div>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-amber-600 border border-amber-100">
                <Zap className="h-6 w-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">
                Real-Time Processing
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">
                Sub-200ms latency for natural, uninterrupted customer
                conversations without awkward pauses.
              </p>
            </div>
          </div>

          {/* Card 4: Context-Aware AI */}
          <div className="flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white/90 p-6 shadow-xs backdrop-blur-md transition-all hover:shadow-md hover:border-slate-300">
            <div>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-pink-50 text-pink-600 border border-pink-100">
                <Sparkles className="h-6 w-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">
                Context-Aware AI
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">
                Advanced NLU that understands property intent, budget sentiment,
                and context for meaningful responses.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER BANNER */}
      <footer className="relative z-10 mt-8 flex flex-col items-center justify-between border-t border-slate-200/80 pt-6 text-xs text-slate-500 sm:flex-row">
        <p>
          © 2026 QuarkGen AI. All Rights Reserved. Pioneering Enterprise Voice
          AI.
        </p>
        <div className="mt-2 flex gap-4 sm:mt-0">
          <span>Privacy Policy</span>
          <span>•</span>
          <span>Terms of Service</span>
        </div>
      </footer>
    </div>
  );
});

WelcomeView.displayName = "WelcomeView";
