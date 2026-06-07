"use client";

import { motion } from "framer-motion";
import { cn } from "@/utils/cn";
import type { KeyboardHeatmapData } from "@/types";

const KEYBOARD_ROWS = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Z", "X", "C", "V", "B", "N", "M"],
];

interface KeyboardHeatmapProps {
  data: KeyboardHeatmapData;
  visible?: boolean;
}

export function KeyboardHeatmap({ data, visible = true }: KeyboardHeatmapProps) {
  if (!visible) return null;

  const maxPresses = Math.max(
    ...Object.values(data).map((d) => d.presses),
    1
  );

  const getIntensity = (key: string) => {
    const entry = data[key];
    if (!entry) return 0;
    return entry.presses / maxPresses;
  };

  const getErrorRate = (key: string) => {
    const entry = data[key];
    if (!entry || entry.presses === 0) return 0;
    return entry.errors / entry.presses;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 rounded-2xl bg-white/5 border border-white/10"
    >
      <p className="text-xs text-muted uppercase tracking-wider mb-3 text-center">
        Keyboard Heatmap
      </p>
      <div className="flex flex-col items-center gap-1.5">
        {KEYBOARD_ROWS.map((row, ri) => (
          <div key={ri} className="flex gap-1" style={{ marginLeft: ri * 12 }}>
            {row.map((key) => {
              const intensity = getIntensity(key);
              const errorRate = getErrorRate(key);
              return (
                <div
                  key={key}
                  className={cn(
                    "w-8 h-8 rounded-md flex items-center justify-center text-xs font-mono transition-all",
                    intensity > 0
                      ? "border border-white/20"
                      : "bg-white/5 text-muted/40"
                  )}
                  style={{
                    backgroundColor:
                      intensity > 0
                        ? `rgba(6, 182, 212, ${intensity * 0.6})`
                        : undefined,
                    boxShadow:
                      errorRate > 0.3
                        ? `0 0 8px rgba(239, 68, 68, ${errorRate})`
                        : undefined,
                  }}
                  title={`${key}: ${data[key]?.presses ?? 0} presses, ${data[key]?.errors ?? 0} errors`}
                >
                  {key}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </motion.div>
  );
}
