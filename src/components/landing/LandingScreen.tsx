"use client";

import { motion } from "framer-motion";
import { ArrowRight, Keyboard, Zap } from "lucide-react";
import { useState } from "react";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { GlassCard } from "@/components/ui/GlassCard";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { useAppStore } from "@/store/useAppStore";

export function LandingScreen() {
  const settings = useAppStore((s) => s.settings);
  const setUserName = useAppStore((s) => s.setUserName);
  const startTest = useAppStore((s) => s.startTest);
  const [name, setName] = useState(settings.userName);
  const [error, setError] = useState("");

  const handleStart = () => {
    const trimmed = name.trim();
    if (!trimmed) {
      setError("Please enter your name to begin");
      return;
    }
    setError("");
    setUserName(trimmed);
    startTest();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="flex items-center justify-between p-4 sm:p-6 max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2"
        >
          <div className="p-2 rounded-xl bg-gradient-to-br from-cyan-500/20 to-violet-500/20 border border-white/10">
            <Keyboard className="w-6 h-6 text-cyan-400" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
            TypeFlow
          </span>
        </motion.div>
        <ThemeToggle />
      </header>

      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 pb-12">
        <div className="max-w-2xl w-full text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm mb-8"
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Zap className="w-4 h-4" />
              Premium Typing Experience
            </motion.div>

            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight mb-6">
              <span className="bg-gradient-to-r from-white via-cyan-100 to-violet-200 bg-clip-text text-transparent">
                Type Faster.
              </span>
              <br />
              <span className="bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent">
                Think Clearer.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-muted max-w-lg mx-auto mb-12">
              A developer-focused typing practice platform with real-time analytics,
              code-friendly text, and performance insights that stay readable on any screen.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <GlassCard glow className="p-6 sm:p-8 max-w-md mx-auto">
              <label htmlFor="name" className="block text-left text-sm text-muted mb-2">
                Your Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setError("");
                }}
                onKeyDown={(e) => e.key === "Enter" && handleStart()}
                placeholder="Enter your name"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all text-foreground placeholder:text-muted/50"
                autoFocus
                autoComplete="name"
              />
              {error && (
                <p className="text-red-400 text-sm mt-2 text-left">{error}</p>
              )}

              <div className="mt-6">
                <AnimatedButton
                  onClick={handleStart}
                  size="lg"
                  className="w-full"
                >
                  Start Typing Test
                  <ArrowRight className="w-5 h-5" />
                </AnimatedButton>
              </div>

              {settings.bestWpm > 0 && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-4 text-sm text-muted"
                >
                  Best score: <span className="text-cyan-400 font-semibold">{settings.bestWpm} WPM</span>
                  {settings.streak > 1 && (
                    <span className="ml-2">· 🔥 {settings.streak} day streak</span>
                  )}
                </motion.p>
              )}
            </GlassCard>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-12 max-w-lg mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {[
              { label: "Real-time WPM", value: "Live" },
              { label: "Accuracy Tracking", value: "100%" },
              { label: "Local Storage", value: "Private" },
            ].map((item, i) => (
              <GlassCard key={item.label} delay={0.1 * i} className="p-4">
                <p className="text-xs text-muted">{item.label}</p>
                <p className="text-lg font-semibold text-cyan-400">{item.value}</p>
              </GlassCard>
            ))}
          </motion.div>
        </div>
      </main>
    </div>
  );
}
