"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { LandingScreen } from "@/components/landing/LandingScreen";
import { ResultsDashboard } from "@/components/dashboard/ResultsDashboard";
import { TypingScreen } from "@/components/typing/TypingScreen";
import { GradientBlobs } from "@/components/ui/GradientBlobs";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { ParticleBackground } from "@/components/ui/ParticleBackground";
import { useAppStore } from "@/store/useAppStore";

export function AppShell() {
  const screen = useAppStore((s) => s.screen);
  const isLoading = useAppStore((s) => s.isLoading);
  const hydrate = useAppStore((s) => s.hydrate);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <GradientBlobs />
      <ParticleBackground />

      <AnimatePresence mode="wait">
        <motion.div
          key={screen}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          {screen === "landing" && <LandingScreen />}
          {screen === "typing" && <TypingScreen />}
          {screen === "results" && <ResultsDashboard />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
