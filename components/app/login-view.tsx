"use client";

import React, { useState } from "react";
import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  Sparkles,
  ShieldCheck,
  ArrowRight,
  Headphones,
  BarChart3,
  Bot,
  CheckCircle2,
  AlertCircle,
  KeyRound,
  PhoneCall,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/shadcn/utils";
import { toast } from "sonner";

interface LoginViewProps {
  onSuccess: (user: { name: string; email: string }) => void;
  logoUrl?: string;
}

export function LoginView({
  onSuccess,
  logoUrl = "/realestate-demo-bot/quarkLogo.png",
}: LoginViewProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    const cleanEmail = email.trim().toLowerCase();
    const cleanPass = password.trim();

    if (!cleanEmail || !cleanPass) {
      setErrorMsg("Please enter both email and password.");
      return;
    }

    setIsLoading(true);

    // Simulate authentication
    setTimeout(() => {
      if (cleanEmail === "admin@quarkgen.ai" && cleanPass === "admin@123") {
        setIsLoading(false);
        toast.success("Welcome back, Admin!");
        onSuccess({
          name: "Admin",
          email: "admin@quarkgen.ai",
        });
      } else {
        setIsLoading(false);
        setErrorMsg(
          "Invalid credentials. Please use admin@quarkgen.ai / admin@123",
        );
        toast.error("Authentication failed. Invalid email or password.");
      }
    }, 500);
  };

  const handleFillDemoCredentials = () => {
    setEmail("admin@quarkgen.ai");
    setPassword("admin@123");
    setErrorMsg("");
    toast.info("Demo credentials filled in!");
  };

  return (
    <div className="relative flex h-svh w-svw items-center justify-center overflow-hidden bg-gradient-to-b from-slate-50 via-sky-50/30 to-slate-100/90 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 p-4 sm:p-6 lg:p-8 font-sans text-slate-900 dark:text-slate-100">
      {/* Subtle Ambient Light Gradients matching Welcome View */}
      <div className="pointer-events-none absolute -top-28 left-1/3 h-[450px] w-[450px] rounded-full bg-sky-200/40 blur-[130px] dark:bg-sky-600/15" />
      <div className="pointer-events-none absolute -bottom-28 right-1/4 h-[450px] w-[450px] rounded-full bg-purple-200/40 blur-[140px] dark:bg-purple-600/15" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[550px] w-[550px] rounded-full bg-cyan-100/30 blur-[160px] dark:bg-cyan-600/10" />

      {/* Tech Constellation / Mesh Background Overlay (matching WelcomeView) */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] dark:bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:24px_24px] opacity-60 dark:opacity-30" />

      {/* Main Content Grid */}
      <div className="relative z-10 w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
        {/* Left Side: Branding & Value Showcase */}
        <div className="hidden lg:flex lg:col-span-6 flex-col justify-between space-y-5 pr-2">
          <div className="space-y-2.5">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-200/90 bg-sky-50/90 px-3.5 py-1 text-xs font-semibold text-sky-700 shadow-xs backdrop-blur-xs dark:border-sky-800 dark:bg-sky-950/40 dark:text-sky-300">
              <Sparkles className="h-3.5 w-3.5 text-sky-500" />
              <span>QuarkGen Enterprise Voice AI Platform</span>
            </div>

            {/* Title with matched brand gradient */}
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.2]">
              Powerful{" "}
              <span className="bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Multilingual Voice Gen AI
              </span>{" "}
              & Analytics
            </h1>

            <p className="text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-slate-400 max-w-md">
              Sign in to manage your hyper-personalized real estate voice bots,
              inspect live WebRTC audio streams, and analyze call funnels.
            </p>
          </div>

          {/* Feature Highlight Cards */}
          <div className="space-y-2.5">
            <div className="flex items-center gap-3 rounded-xl border border-slate-200/80 bg-white/90 p-3 shadow-xs backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/80">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sky-600 border border-sky-100 dark:bg-sky-950 dark:text-sky-400 dark:border-sky-800">
                <PhoneCall className="h-4 w-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                  Live Voice Agent Sessions
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Deterministic dialogue flow, speech-to-speech AI, and
                  sentiment tracking.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-xl border border-slate-200/80 bg-white/90 p-3 shadow-xs backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/80">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 dark:bg-emerald-950 dark:text-emerald-400 dark:border-emerald-800">
                <BarChart3 className="h-4 w-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                  Call Intelligence & Funnel Analytics
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Disposition distributions, site-visit conversions, and budget
                  demand.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-xl border border-slate-200/80 bg-white/90 p-3 shadow-xs backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/80">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-purple-600 border border-purple-100 dark:bg-purple-950 dark:text-purple-400 dark:border-purple-800">
                <ShieldCheck className="h-4 w-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                  Enterprise Access Control
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Secure operator portal with authenticated session tokens.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Operational · Powered by QuarkGen AI Cluster</span>
          </div>
        </div>

        {/* Right Side: Clean Modern Login Form Card */}
        <div className="w-full lg:col-span-6 mx-auto max-w-md">
          <div className="relative overflow-hidden rounded-2xl border border-slate-200/90 bg-white/95 dark:border-slate-800 dark:bg-slate-900/95 p-6 sm:p-7 shadow-xl shadow-slate-200/60 dark:shadow-2xl dark:shadow-slate-950/60 backdrop-blur-xl">
            {/* Header / Logo */}
            <div className="flex flex-col items-center text-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={logoUrl}
                alt="QuarkGen Logo"
                className="h-7 w-auto object-contain mb-2.5"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/quarkLogo.png";
                }}
              />
              <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-2xl">
                Sign In to Platform
              </h2>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                Enter your credentials to manage voice bots and view analytics
              </p>
            </div>

            {/* Error message banner */}
            {errorMsg && (
              <div className="mt-3.5 flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 p-2.5 text-xs text-red-700 dark:border-red-800/60 dark:bg-red-950/40 dark:text-red-300">
                <AlertCircle className="h-4 w-4 shrink-0 text-red-600 dark:text-red-400" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="mt-4 space-y-3.5">
              {/* Email field */}
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Email address
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                    <Mail className="h-4 w-4" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    // placeholder="admin@quarkgen.ai"
                    className="w-full rounded-xl border border-slate-300 bg-slate-50/70 py-2.5 pl-9 pr-3 text-xs text-slate-900 placeholder:text-slate-400 focus:border-sky-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white transition-all"
                  />
                </div>
              </div>

              {/* Password field */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Password
                  </label>
                </div>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                    <Lock className="h-4 w-4" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full rounded-xl border border-slate-300 bg-slate-50/70 py-2.5 pl-9 pr-10 text-xs text-slate-900 placeholder:text-slate-400 focus:border-sky-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors cursor-pointer"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Sign In Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-10.5 rounded-xl bg-slate-950 hover:bg-slate-900 text-white font-semibold shadow-lg transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer flex items-center justify-center gap-2 text-xs dark:bg-blue-600 dark:hover:bg-blue-500 mt-2"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    <span>Signing in...</span>
                  </div>
                ) : (
                  <>
                    <span>Sign In to Dashboard</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </Button>
            </form>

            {/* Footer Notice */}
            <div className="mt-4 border-t border-slate-100 dark:border-slate-800 pt-3 text-center text-[10px] text-slate-400">
              Protected by Enterprise Multi-Layer Auth · QuarkGen AI
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
