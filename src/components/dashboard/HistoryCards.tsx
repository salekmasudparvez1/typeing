"use client";

import { motion } from "framer-motion";
import { Clock, Target, Zap } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { formatTime } from "@/utils/typing";
import type { TestResult } from "@/types";

interface HistoryCardsProps {
  history: TestResult[];
}

export function HistoryCards({ history }: HistoryCardsProps) {
  const recent = history.slice(0, 5);

  if (recent.length === 0) {
    return (
      <p className="text-muted text-sm text-center py-8">
        No test history yet. Complete a test to see your progress!
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {recent.map((test, i) => (
        <motion.div
          key={test.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1 }}
        >
          <GlassCard className="p-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4 min-w-0">
                <div className="p-2 rounded-lg bg-cyan-500/10 shrink-0">
                  <Zap className="w-4 h-4 text-cyan-400" />
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-base sm:text-lg">{test.wpm} WPM</p>
                  <p className="text-xs text-muted capitalize truncate">
                    {test.difficulty} · {test.mode}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
                <div className="flex items-center gap-1 text-muted">
                  <Target className="w-3.5 h-3.5" />
                  {test.accuracy}%
                </div>
                <div className="flex items-center gap-1 text-muted">
                  <Clock className="w-3.5 h-3.5" />
                  {formatTime(test.timeTaken)}
                </div>
                <span className="text-xs text-muted">
                  {new Date(test.timestamp).toLocaleDateString()}
                </span>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      ))}
    </div>
  );
}
