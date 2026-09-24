"use client";

import { useEffect, useMemo, useState } from "react";
import { TokenSource } from "livekit-client";
import { useSession } from "@livekit/components-react";
import { WarningIcon } from "@phosphor-icons/react/dist/ssr";
import { AnimatePresence, motion } from "motion/react";
import type { AppConfig } from "@/app-config";
import { AgentSessionProvider } from "@/components/agents-ui/agent-session-provider";
import { StartAudioButton } from "@/components/agents-ui/start-audio-button";
import { Header } from "@/components/app/header";
import { Sidebar } from "@/components/app/sidebar";
import { ViewController } from "@/components/app/view-controller";
import { CustomerCallAnalytics } from "@/components/analytics/customer-call-analytics";
import { Toaster } from "@/components/ui/sonner";
import { useAgentErrors } from "@/hooks/useAgentErrors";
import { useDebugMode } from "@/hooks/useDebug";
import { getSandboxTokenSource } from "@/lib/utils";
import { AlertTriangle } from "lucide-react";
import {
  DEFAULT_BOT_ID,
  getBotConfig,
  type BotConfig as BotFlow,
} from "@/constants/bots";

const IN_DEVELOPMENT = process.env.NODE_ENV !== "production";

function AppSetup() {
  useDebugMode({ enabled: IN_DEVELOPMENT });
  useAgentErrors();

  return null;
}

interface AppProps {
  appConfig: AppConfig;
}

export function App({ appConfig }: AppProps) {
  const [activeTab, setActiveTab] = useState<string>("live-call");
  const [selectedBotId, setSelectedBotId] = useState<string>(DEFAULT_BOT_ID);

  // Restore persisted tab and selected bot on mount from URL or localStorage
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const params = new URLSearchParams(window.location.search);
      const urlTab = params.get("tab");
      const storedTab = localStorage.getItem("novesta_active_tab");
      const selected = urlTab || storedTab || "live-call";
      if (selected === "live-call" || selected === "analytics") {
        setActiveTab(selected);
      }

      const urlBot = params.get("bot") || params.get("flow");
      const storedBot = localStorage.getItem("novesta_selected_bot");
      const targetBot = urlBot || storedBot || DEFAULT_BOT_ID;
      const matched = getBotConfig(targetBot);
      if (matched) {
        setSelectedBotId(matched.id);
      }
    } catch {
      // Ignore localStorage access errors if any
    }
  }, []);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("novesta_active_tab", tab);
        const url = new URL(window.location.href);
        url.searchParams.set("tab", tab);
        window.history.replaceState(null, "", url.toString());
      } catch {
        // Ignore storage or history errors if any
      }
    }
  };

  const handleSelectBot = (bot: BotFlow) => {
    setSelectedBotId(bot.id);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("novesta_selected_bot", bot.id);
        const url = new URL(window.location.href);
        url.searchParams.set("bot", bot.id);
        window.history.replaceState(null, "", url.toString());
      } catch {
        // Ignore storage or history errors if any
      }
    }
  };

  const handleSelectBotById = (botId: string) => {
    setSelectedBotId(botId);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("novesta_selected_bot", botId);
        const url = new URL(window.location.href);
        url.searchParams.set("bot", botId);
        window.history.replaceState(null, "", url.toString());
      } catch {
        // Ignore storage or history errors if any
      }
    }
  };

  const selectedBot = useMemo(
    () => getBotConfig(selectedBotId),
    [selectedBotId]
  );

  return (
    <div className="flex h-svh w-svw flex-row overflow-hidden bg-background">
      <Sidebar
        activeTab={activeTab}
        onTabChange={handleTabChange}
        logoUrl="/novesta-bot/novesta/white-logo.png"
      />

      <div className="flex flex-1 flex-col overflow-hidden">
        {activeTab === "analytics" ? (
          <>
            {/* Top Yellow Warning Ribbon: Mock Data & UI Notice */}
            <div className="z-50 flex w-full items-center justify-between border-b border-amber-300 bg-[#fef08a] px-4 py-2 text-xs text-amber-950 shadow-xs sm:px-6">
              <div className="flex items-center gap-2.5">
                <AlertTriangle className="h-4 w-4 shrink-0 text-amber-900" />
                <span className="font-medium text-amber-950">
                  <strong className="font-bold">Notice:</strong> This is mock data and UI layout for demonstration purposes only.
                </span>
              </div>
              <span className="rounded-md border border-amber-400 bg-amber-200/90 px-2.5 py-0.5 text-[10px] font-bold tracking-wider text-amber-950 uppercase shrink-0">
                Mock Data &amp; UI
              </span>
            </div>
            <Header
              title="Novesta Group Call Analytics"
              showBotSelector={false}
            />
            <div className="relative flex flex-1 flex-col overflow-y-auto">
              <CustomerCallAnalytics
                initialFlowId={selectedBotId}
                onFlowChange={handleSelectBotById}
              />
            </div>
          </>
        ) : (
          <LiveCallSession
            appConfig={appConfig}
            selectedBot={selectedBot}
            onSelectBot={handleSelectBot}
          />
        )}
      </div>

      <Toaster
        icons={{
          warning: <WarningIcon weight="bold" />,
        }}
        position="top-center"
        className="toaster group"
        style={
          {
            "--normal-bg": "var(--popover)",
            "--normal-text": "var(--popover-foreground)",
            "--normal-border": "var(--border)",
          } as React.CSSProperties
        }
      />
    </div>
  );
}

interface LiveCallSessionProps {
  appConfig: AppConfig;
  selectedBot: BotFlow;
  onSelectBot: (bot: BotFlow) => void;
}

function LiveCallSession({
  appConfig,
  selectedBot,
  onSelectBot,
}: LiveCallSessionProps) {
  const tokenSource = useMemo(() => {
    return typeof process.env.NEXT_PUBLIC_CONN_DETAILS_ENDPOINT === "string"
      ? getSandboxTokenSource({
          ...appConfig,
          agentName: selectedBot.agentName,
        })
      : TokenSource.endpoint("/novesta-bot/api/connection-details");
  }, [appConfig, selectedBot.agentName]);

  const session = useSession(
    tokenSource,
    selectedBot.agentName ? { agentName: selectedBot.agentName } : undefined
  );

  return (
    <AgentSessionProvider session={session}>
      <AppSetup />
      <Header
        title="Novesta Group AI Voice Assistant"
        selectedBot={selectedBot}
        onSelectBot={onSelectBot}
        isConnected={session.isConnected}
        showBotSelector={true}
      />
      <main className="relative flex-1 overflow-hidden">
        <ViewController
          appConfig={{ ...appConfig, agentName: selectedBot.agentName }}
          selectedBot={selectedBot}
          onSelectBot={onSelectBot}
        />
      </main>
      <StartAudioButton label="Start Audio" />
    </AgentSessionProvider>
  );
}
