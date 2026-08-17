"use client";

import { useState, useMemo, useEffect } from "react";
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
import { LoginView } from "@/components/app/login-view";
import { Toaster } from "@/components/ui/sonner";
import { useAgentErrors } from "@/hooks/useAgentErrors";
import { useDebugMode } from "@/hooks/useDebug";
import { getSandboxTokenSource } from "@/lib/utils";
import { toast } from "sonner";

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
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [activeTab, setActiveTab] = useState<"live-call" | "analytics">("live-call");

  // Load session from storage if present
  useEffect(() => {
    try {
      const savedAuth = sessionStorage.getItem("quark_auth");
      const savedUser = sessionStorage.getItem("quark_user");
      if (savedAuth === "true" && savedUser) {
        setIsAuthenticated(true);
        setUser(JSON.parse(savedUser));
      }
    } catch {
      // ignore
    }
  }, []);

  const handleLoginSuccess = (loggedInUser: { name: string; email: string }) => {
    setIsAuthenticated(true);
    setUser(loggedInUser);
    try {
      sessionStorage.setItem("quark_auth", "true");
      sessionStorage.setItem("quark_user", JSON.stringify(loggedInUser));
    } catch {
      // ignore
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    try {
      sessionStorage.removeItem("quark_auth");
      sessionStorage.removeItem("quark_user");
    } catch {
      // ignore
    }
    toast.info("Logged out successfully");
  };

  const tokenSource = useMemo(() => {
    return typeof process.env.NEXT_PUBLIC_CONN_DETAILS_ENDPOINT === "string"
      ? getSandboxTokenSource(appConfig)
      : TokenSource.endpoint("/realestate-demo-bot/api/connection-details");
  }, [appConfig]);

  const session = useSession(
    tokenSource,
    appConfig.agentName ? { agentName: appConfig.agentName } : undefined,
  );

  if (!isAuthenticated) {
    return (
      <>
        <LoginView onSuccess={handleLoginSuccess} logoUrl="/realestate-demo-bot/quarkLogo.png" />
        <Toaster
          icons={{
            warning: <WarningIcon weight="bold" />,
          }}
          position="top-center"
          className="toaster group"
        />
      </>
    );
  }

  return (
    <AgentSessionProvider session={session}>
      <AppSetup />
      <div className="flex h-svh w-svw flex-row overflow-hidden bg-background">
        <Sidebar
          activeTab={activeTab}
          onTabChange={(tab) => setActiveTab(tab as "live-call" | "analytics")}
          onLogout={handleLogout}
          logoUrl="/realestate-demo-bot/quarkLogo.png"
        />
        <div className="flex flex-1 flex-col overflow-hidden">
          <Header
            title={
              activeTab === "analytics"
                ? "Customer Call Analytics · Godrej Verdant (GDJ-VERDANT)"
                : "Quarkgen Realestate Voice Agent"
            }
            userName={user?.name || "Admin"}
            onLogout={handleLogout}
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
