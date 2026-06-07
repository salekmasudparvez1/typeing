"use client";

import { motion } from "framer-motion";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { ProgressRing } from "@/components/ui/ProgressRing";
import { formatTime } from "@/utils/typing";
import type { TypingStats } from "@/types";

interface StatsBarProps {
  stats: TypingStats;
  progress: number;
  zenMode?: boolean;
}

export function StatsBar({ stats, progress, zenMode }: StatsBarProps) {
  if (zenMode) {
    return (
      <div className="flex justify-center">
        <ProgressRing progress={progress} size={48} />
      </div>
    );
  }

  const items = [
    { label: "WPM", value: stats.wpm, suffix: "" },
    { label: "CPM", value: stats.cpm, suffix: "" },
    { label: "Accuracy", value: stats.accuracy, suffix: "%", decimals: 1 },
    { label: "Mistakes", value: stats.mistakes, suffix: "" },
    { label: "Time", value: 0, display: formatTime(stats.elapsed) },
  ];

  return (
    <motion.div
      className="flex flex-wrap items-center justify-center gap-4 md:gap-8"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {items.map((item) => (
        <div key={item.label} className="flex items-center gap-3">
          <div className="text-center min-w-[60px]">
            <p className="text-xs text-muted uppercase tracking-wider">{item.label}</p>
            <p className="text-2xl font-bold text-foreground">
              {item.display ?? (
                <AnimatedCounter
                  value={item.value}
                  suffix={item.suffix}
                  decimals={item.decimals}
                />
              )}
            </p>
          </div>
        </div>
      ))}
      <div className="hidden md:block">
        <ProgressRing progress={progress} size={52} />
      </div>
    </motion.div>
  );
}
