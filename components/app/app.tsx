"use client";

import { useState, useMemo } from "react";
import { TokenSource } from "livekit-client";
import { useSession } from "@livekit/components-react";
import { WarningIcon } from "@phosphor-icons/react/dist/ssr";
import type { AppConfig } from "@/app-config";
import { AgentSessionProvider } from "@/components/agents-ui/agent-session-provider";
import { StartAudioButton } from "@/components/agents-ui/start-audio-button";
import { Header } from "@/components/app/header";
import { Sidebar } from "@/components/app/sidebar";
import { ViewController } from "@/components/app/view-controller";
import { AnalyticsView } from "@/components/app/analytics-view";
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
  const [activeTab, setActiveTab] = useState<"live-call" | "analytics">("live-call");

  const tokenSource = useMemo(() => {
    return typeof process.env.NEXT_PUBLIC_CONN_DETAILS_ENDPOINT === "string"
      ? getSandboxTokenSource(appConfig)
      : TokenSource.endpoint("/realestate-bot/api/connection-details");
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
          onTabChange={(tab) => setActiveTab(tab as "live-call" | "analytics")}
          logoUrl="/realestate-bot/quarkLogo.png"
        />
        <div className="flex flex-1 flex-col overflow-hidden">
          <Header
            title={
              activeTab === "analytics"
                ? "Customer Call Analytics · Godrej Verdant (GDJ-VERDANT)"
                : "Quarkgen Realestate Voice Agent"
            }
          />
          <main className="relative flex-1 overflow-hidden">
            {activeTab === "analytics" ? (
              <AnalyticsView />
            ) : (
              <ViewController appConfig={appConfig} />
            )}
          </main>
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
