"use client";

import { AnimatePresence, motion } from "framer-motion";
import { GitBranch } from "lucide-react";
import { useEffect } from "react";
import { LandingScreen } from "@/components/landing/LandingScreen";
import { ResultsDashboard } from "@/components/dashboard/ResultsDashboard";
import { TypingScreen } from "@/components/typing/TypingScreen";
import { GradientBlobs } from "@/components/ui/GradientBlobs";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { ParticleBackground } from "@/components/ui/ParticleBackground";
import { SiteFooter } from "@/components/ui/SiteFooter";
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

      <motion.a
        href="https://github.com/salekmasudparvez1/typeing"
        target="_blank"
        rel="noreferrer"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed right-4 top-4 z-40 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-black/30 px-3 py-2 text-xs text-muted backdrop-blur-xl transition-colors hover:text-foreground hover:border-white/20"
        aria-label="View source on GitHub"
      >
        <GitBranch className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">GitHub Repo</span>
        <span className="sm:hidden">Repo</span>
      </motion.a>

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

      <SiteFooter />
    </div>
  );
}
