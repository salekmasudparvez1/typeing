"use client";

import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useAppStore } from "@/store/useAppStore";

export function ThemeToggle() {
  const theme = useAppStore((s) => s.settings.theme);
  const setTheme = useAppStore((s) => s.setTheme);

  return (
    <motion.button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      <motion.div
        key={theme}
        initial={{ rotate: -90, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {theme === "dark" ? (
          <Sun className="w-5 h-5 text-amber-400" />
        ) : (
          <Moon className="w-5 h-5 text-violet-500" />
        )}
      </motion.div>
    </motion.button>
  );
}
