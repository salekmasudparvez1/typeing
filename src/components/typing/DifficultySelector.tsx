"use client";

import { motion } from "framer-motion";
import { cn } from "@/utils/cn";
import type { Difficulty } from "@/types";

const DIFFICULTIES: { value: Difficulty; label: string; color: string }[] = [
  { value: "easy", label: "Easy", color: "from-emerald-500 to-teal-500" },
  { value: "medium", label: "Medium", color: "from-cyan-500 to-blue-500" },
  { value: "hard", label: "Hard", color: "from-violet-500 to-fuchsia-500" },
];

interface DifficultySelectorProps {
  value: Difficulty;
  onChange: (d: Difficulty) => void;
  disabled?: boolean;
}

export function DifficultySelector({ value, onChange, disabled }: DifficultySelectorProps) {
  return (
    <div className="flex flex-wrap justify-center gap-2 p-1 rounded-xl bg-white/5 border border-white/10">
      {DIFFICULTIES.map((d) => (
        <motion.button
          key={d.value}
          onClick={() => !disabled && onChange(d.value)}
          disabled={disabled}
          whileHover={{ scale: disabled ? 1 : 1.02 }}
          whileTap={{ scale: disabled ? 1 : 0.98 }}
          className={cn(
            "relative px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-all",
            value === d.value
              ? "text-white"
              : "text-muted hover:text-foreground",
            disabled && "opacity-50 cursor-not-allowed"
          )}
        >
          {value === d.value && (
            <motion.div
              layoutId="difficulty-bg"
              className={cn("absolute inset-0 rounded-lg bg-gradient-to-r opacity-80", d.color)}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}
          <span className="relative z-10">{d.label}</span>
        </motion.button>
      ))}
    </div>
  );
}
