"use client";

import { AnimatePresence, motion } from "motion/react";
import { useSessionContext } from "@livekit/components-react";
import type { AppConfig } from "@/app-config";
import { SessionView } from "@/components/app/session-view";
import { WelcomeView } from "@/components/app/welcome-view";

const MotionWelcomeView = motion.create(WelcomeView);
const MotionSessionView = motion.create(SessionView);

// Professional, ergonomic cubic-bezier transition (Apple & Linear design system)
const VIEW_MOTION_PROPS: any = {
  variants: {
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.26,
        ease: "easeOut",
      },
    },
    hidden: {
      opacity: 0,
      scale: 0.992,
      y: 8,
      filter: "blur(2px)",
      transition: {
        duration: 0.18,
        ease: "easeOut",
      },
    },
  },
  initial: "hidden",
  animate: "visible",
  exit: "hidden",
};

import type { BotConfig as BotFlow } from "@/constants/bots";

interface ViewControllerProps {
  appConfig: AppConfig;
  selectedBot: BotFlow;
  onSelectBot: (bot: BotFlow) => void;
}

export function ViewController({ appConfig, selectedBot, onSelectBot }: ViewControllerProps) {
  const { isConnected, start } = useSessionContext();

  return (
    <AnimatePresence mode="wait" initial={false}>
      {/* Welcome view */}
      {!isConnected && (
        <MotionWelcomeView
          key="welcome"
          {...VIEW_MOTION_PROPS}
          startButtonText={appConfig.startButtonText}
          selectedBot={selectedBot}
          onSelectBot={onSelectBot}
          onStartCall={start}
        />
      )}
      {/* Session view */}
      {isConnected && (
        <MotionSessionView
          key="session-view"
          {...VIEW_MOTION_PROPS}
          appConfig={appConfig}
          selectedBot={selectedBot}
        />
      )}
    </AnimatePresence>
  );
}
