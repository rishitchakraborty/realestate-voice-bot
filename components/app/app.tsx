"use client";

import { useEffect, useMemo, useState } from "react";
import { TokenSource } from "livekit-client";
import { useSession } from "@livekit/components-react";
import { WarningIcon } from "@phosphor-icons/react/dist/ssr";
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

  // Restore persisted tab on mount from URL or localStorage
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

  const tokenSource = useMemo(() => {
    return typeof process.env.NEXT_PUBLIC_CONN_DETAILS_ENDPOINT === "string"
      ? getSandboxTokenSource(appConfig)
      : TokenSource.endpoint("/novesta-bot/api/connection-details");
  }, [appConfig]);

  const session = useSession(
    tokenSource,
    appConfig.agentName ? { agentName: appConfig.agentName } : undefined,
  );

  return (
    <AgentSessionProvider session={session}>
      <AppSetup />
      <div className="flex h-svh w-svw flex-row overflow-hidden bg-background">
        <Sidebar
          activeTab={activeTab}
          onTabChange={handleTabChange}
          logoUrl="/novesta-bot/novesta/white-logo.png"
        />

        <div className="flex flex-1 flex-col overflow-hidden">
          <Header
            title={
              activeTab === "analytics"
                ? "Novesta Group Call Analytics"
                : "Novesta Group AI Voice Assistant"
            }
          />
          {activeTab === "analytics" ? (
            <div className="flex flex-1 flex-col overflow-y-auto">
              <CustomerCallAnalytics />
            </div>
          ) : (
            <main className="relative flex-1 overflow-hidden">
              <ViewController appConfig={appConfig} />
            </main>
          )}
        </div>
      </div>
      <StartAudioButton label="Start Audio" />
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
    </AgentSessionProvider>
  );
}
