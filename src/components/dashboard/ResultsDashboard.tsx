"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Flame, RotateCcw, Share2, Trophy } from "lucide-react";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { GlassCard } from "@/components/ui/GlassCard";
import { HistoryCards } from "@/components/dashboard/HistoryCards";
import { AccuracyChart } from "@/components/charts/AccuracyChart";
import { DailyPerformanceChart } from "@/components/charts/DailyPerformanceChart";
import { WpmChart } from "@/components/charts/WpmChart";
import { useAppStore } from "@/store/useAppStore";
import { sharePerformanceAsImage } from "@/lib/share-performance";
import { formatTime, getPerformanceRating } from "@/utils/typing";
import { cn } from "@/utils/cn";

const RATING_COLORS: Record<string, string> = {
  Excellent: "from-emerald-400 to-cyan-400",
  Great: "from-cyan-400 to-blue-400",
  Good: "from-blue-400 to-violet-400",
  Average: "from-amber-400 to-orange-400",
  "Needs Improvement": "from-red-400 to-rose-400",
};

export function ResultsDashboard() {
  const [isSharing, setIsSharing] = useState(false);
  const settings = useAppStore((s) => s.settings);
  const testHistory = useAppStore((s) => s.testHistory);
  const dailyPerformance = useAppStore((s) => s.dailyPerformance);
  const restartTest = useAppStore((s) => s.restartTest);
  const goToLanding = useAppStore((s) => s.goToLanding);

  const latest = testHistory[0];
  if (!latest) return null;

  const rating = getPerformanceRating(latest.wpm, latest.accuracy);
  const isNewBest = latest.wpm >= settings.bestWpm;

  const handleShare = async () => {
    if (isSharing) return;
    setIsSharing(true);
    try {
      await sharePerformanceAsImage({
        result: latest,
        settings,
        rating,
      });
    } finally {
      setIsSharing(false);
    }
  };

  const stats = [
    { label: "WPM", value: latest.wpm, color: "text-cyan-400" },
    { label: "Accuracy", value: latest.accuracy, suffix: "%", color: "text-violet-400" },
    { label: "Mistakes", value: latest.mistakes, color: "text-red-400" },
    { label: "Time", display: formatTime(latest.timeTaken), color: "text-emerald-400" },
  ];

  return (
    <div className="min-h-screen pb-12">
      <header className="flex items-center justify-between gap-3 p-4 sm:p-6 max-w-6xl mx-auto">
        <motion.button
          onClick={goToLanding}
          whileHover={{ scale: 1.02 }}
          className="flex items-center gap-2 text-sm text-muted hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4" />
          Home
        </motion.button>
        <div className="flex items-center gap-2 text-sm">
          {settings.streak > 1 && (
            <span className="flex items-center gap-1 text-amber-400">
              <Flame className="w-4 h-4" />
              {settings.streak} day streak
            </span>
          )}
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2">
            Great job, {settings.userName}!
          </h1>
          <p className="text-muted text-sm sm:text-base">Here&apos;s how you performed</p>
        </motion.div>

        <GlassCard glow className="p-6 sm:p-8">
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className={cn(
                "inline-block text-5xl md:text-6xl font-bold bg-gradient-to-r bg-clip-text text-transparent",
                RATING_COLORS[rating]
              )}
            >
              {rating}
            </motion.div>
            {isNewBest && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-2 flex items-center justify-center gap-2 text-amber-400"
              >
                <Trophy className="w-5 h-5" />
                New personal best!
              </motion.p>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i }}
                className="text-center p-3 sm:p-4 rounded-xl bg-white/5"
              >
                <p className="text-xs text-muted uppercase tracking-wider">{stat.label}</p>
                <p className={cn("text-2xl sm:text-3xl font-bold mt-1", stat.color)}>
                  {stat.display ?? (
                    <AnimatedCounter
                      value={stat.value!}
                      suffix={stat.suffix}
                    />
                  )}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted">
              Best Score: <span className="text-cyan-400 font-semibold">{settings.bestWpm} WPM</span>
            </p>
          </div>
        </GlassCard>

        <div className="grid gap-6 lg:grid-cols-2">
          <GlassCard className="p-5 sm:p-6 overflow-hidden">
            <h3 className="text-sm font-medium text-muted uppercase tracking-wider mb-4">
              WPM Over Time
            </h3>
            <WpmChart data={latest.timeSeries} />
          </GlassCard>
          <GlassCard className="p-5 sm:p-6 overflow-hidden">
            <h3 className="text-sm font-medium text-muted uppercase tracking-wider mb-4">
              Accuracy Over Time
            </h3>
            <AccuracyChart data={latest.timeSeries} />
          </GlassCard>
        </div>

        <GlassCard className="p-5 sm:p-6 overflow-hidden">
          <h3 className="text-sm font-medium text-muted uppercase tracking-wider mb-4">
            Daily Performance
          </h3>
          <DailyPerformanceChart data={dailyPerformance} />
        </GlassCard>

        <GlassCard className="p-5 sm:p-6 overflow-hidden">
          <h3 className="text-sm font-medium text-muted uppercase tracking-wider mb-4">
            Recent Tests
          </h3>
          <HistoryCards history={testHistory} />
        </GlassCard>

        <div className="flex justify-center gap-4">
          <AnimatedButton onClick={restartTest} size="lg">
            <RotateCcw className="w-5 h-5" />
            Try Again
          </AnimatedButton>
          <AnimatedButton variant="secondary" onClick={handleShare} size="lg" disabled={isSharing}>
            <Share2 className="w-5 h-5" />
            {isSharing ? "Preparing Image..." : "Share Result"}
          </AnimatedButton>
          <AnimatedButton variant="secondary" onClick={goToLanding} size="lg">
            Back to Home
          </AnimatedButton>
        </div>
      </main>
    </div>
  );
}
