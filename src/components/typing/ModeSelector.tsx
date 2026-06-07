"use client";

import { motion } from "framer-motion";
import { Eye, Flower2, Layout } from "lucide-react";
import { cn } from "@/utils/cn";
import type { TestMode } from "@/types";

const MODES: { value: TestMode; label: string; icon: React.ReactNode }[] = [
  { value: "normal", label: "Normal", icon: <Layout className="w-4 h-4" /> },
  { value: "focus", label: "Focus", icon: <Eye className="w-4 h-4" /> },
  { value: "zen", label: "Zen", icon: <Flower2 className="w-4 h-4" /> },
];

interface ModeSelectorProps {
  value: TestMode;
  onChange: (m: TestMode) => void;
  disabled?: boolean;
}

export function ModeSelector({ value, onChange, disabled }: ModeSelectorProps) {
  return (
    <div className="flex flex-wrap justify-center gap-1 p-1 rounded-xl bg-white/5 border border-white/10">
      {MODES.map((m) => (
        <motion.button
          key={m.value}
          onClick={() => !disabled && onChange(m.value)}
          disabled={disabled}
          whileHover={{ scale: disabled ? 1 : 1.02 }}
          whileTap={{ scale: disabled ? 1 : 0.98 }}
          className={cn(
            "flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all",
            value === m.value
              ? "bg-white/10 text-cyan-400"
              : "text-muted hover:text-foreground",
            disabled && "opacity-50 cursor-not-allowed"
          )}
        >
          {m.icon}
          <span className="hidden sm:inline">{m.label}</span>
        </motion.button>
      ))}
    </div>
  );
}
