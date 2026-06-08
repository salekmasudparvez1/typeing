"use client";

import { motion } from "framer-motion";
import { ArrowRight, Keyboard, Target, Zap } from "lucide-react";
import { useMemo, useState } from "react";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { GlassCard } from "@/components/ui/GlassCard";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { DifficultySelector } from "@/components/typing/DifficultySelector";
import { LanguageSelector } from "@/components/typing/LanguageSelector";
import { ModeSelector } from "@/components/typing/ModeSelector";
import { useAppStore } from "@/store/useAppStore";
import type { Difficulty, Language, TestMode } from "@/types";

export function LandingScreen() {
  const settings = useAppStore((s) => s.settings);
  const testHistory = useAppStore((s) => s.testHistory);
  const setUserName = useAppStore((s) => s.setUserName);
  const setDifficulty = useAppStore((s) => s.setDifficulty);
  const setMode = useAppStore((s) => s.setMode);
  const setLanguage = useAppStore((s) => s.setLanguage);
  const startTest = useAppStore((s) => s.startTest);
  const [name, setName] = useState(settings.userName);
  const [error, setError] = useState("");

  const modeDescriptions: Record<TestMode, string> = {
    normal: "Classic full test. Complete stats, heatmap, and motivational feedback.",
    focus: "Distraction-free. Narrow view so you only see what you need to type next.",
    zen: "Pure minimalism. Almost nothing on screen except the text and a tiny progress ring.",
    code: "Real code practice. Newlines, indentation, and language-specific snippets.",
  };

  // Quick realistic presets (very useful for users who don't want to tweak everything)
  const presets: Array<{
    label: string;
    icon: React.ReactNode;
    description: string;
    difficulty: Difficulty;
    mode: TestMode;
    language?: Language;
  }> = [
    {
      label: "Casual",
      icon: <Zap className="w-3.5 h-3.5" />,
      description: "Relaxed prose",
      difficulty: "easy",
      mode: "normal",
    },
    {
      label: "Code Sprint",
      icon: <Target className="w-3.5 h-3.5" />,
      description: "Real TypeScript",
      difficulty: "medium",
      mode: "code",
      language: "typescript",
    },
    {
      label: "Deep Focus",
      icon: <Keyboard className="w-3.5 h-3.5" />,
      description: "Hard + minimal UI",
      difficulty: "hard",
      mode: "focus",
    },
    {
      label: "Zen Flow",
      icon: <Zap className="w-3.5 h-3.5" />,
      description: "Calm & clean",
      difficulty: "medium",
      mode: "zen",
    },
  ];

  const applyPreset = (preset: (typeof presets)[number]) => {
    setDifficulty(preset.difficulty);
    setMode(preset.mode);
    if (preset.language) {
      setLanguage(preset.language);
    }
  };

  const sessionPreview = useMemo(() => {
    const diffLabel = settings.difficulty.charAt(0).toUpperCase() + settings.difficulty.slice(1);
    const modeLabel = settings.mode.charAt(0).toUpperCase() + settings.mode.slice(1);

    if (settings.mode === "code") {
      const lang = settings.language === "general" ? "TypeScript" : settings.language;
      return `${diffLabel} ${lang} code snippets • ${modeLabel} interface`;
    }
    return `${diffLabel} difficulty • ${modeLabel} mode • Natural text`;
  }, [settings.difficulty, settings.mode, settings.language]);

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
            <GlassCard glow className="p-6 sm:p-8 max-w-xl mx-auto">
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

              {/* === PREMIUM SESSION CONFIGURATION === */}
              <div className="mt-6 space-y-6 text-left">
                {/* Quick Presets - makes choosing fun and realistic */}
                <div>
                  <div className="text-xs font-medium text-muted mb-2 tracking-[1px]">QUICK PRESETS</div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {presets.map((preset, index) => (
                      <motion.button
                        key={index}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.985 }}
                        onClick={() => applyPreset(preset)}
                        className="flex flex-col items-start gap-1 rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-left text-sm transition-all hover:border-white/25 hover:bg-white/10"
                      >
                        <div className="flex items-center gap-1.5 text-cyan-400">
                          {preset.icon}
                          <span className="font-medium text-foreground">{preset.label}</span>
                        </div>
                        <span className="text-[11px] text-muted/70 leading-tight">{preset.description}</span>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Detailed Controls */}
                <div className="space-y-5 rounded-2xl border border-white/10 bg-white/[0.015] p-4">
                  <div>
                    <div className="mb-1.5 flex items-center justify-between text-xs font-medium tracking-wider text-muted">
                      <span>DIFFICULTY LEVEL</span>
                      <span className="font-mono text-[10px] uppercase text-muted/60">{settings.difficulty}</span>
                    </div>
                    <DifficultySelector value={settings.difficulty} onChange={setDifficulty} />
                  </div>

                  <div>
                    <div className="mb-1.5 flex items-center justify-between text-xs font-medium tracking-wider text-muted">
                      <span>PRACTICE MODE</span>
                      <span className="font-mono text-[10px] uppercase text-muted/60">{settings.mode}</span>
                    </div>
                    <ModeSelector value={settings.mode} onChange={setMode} />
                    <p className="mt-1.5 text-[11px] leading-snug text-muted/70">
                      {modeDescriptions[settings.mode]}
                    </p>
                  </div>

                  {settings.mode === "code" && (
                    <div>
                      <div className="mb-1.5 text-xs font-medium tracking-wider text-muted">CODE LANGUAGE</div>
                      <LanguageSelector value={settings.language} onChange={setLanguage} />
                    </div>
                  )}
                </div>

                {/* Live Session Preview - makes it feel real and intentional */}
                <div className="rounded-xl border border-white/10 bg-gradient-to-r from-white/[0.03] to-transparent p-3">
                  <div className="text-[10px] font-medium uppercase tracking-[1.5px] text-muted">Your session</div>
                  <div className="mt-1 text-sm font-medium text-foreground">{sessionPreview}</div>
                  <div className="mt-1 text-[11px] text-muted/70">Text length and style will match your selection.</div>
                </div>
              </div>

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

              {/* Quick realistic stats when you have history */}
              {testHistory.length > 0 && (
                <div className="mt-4 flex items-center justify-center gap-4 text-xs text-muted">
                  <div>
                    <span className="font-mono text-foreground">{testHistory.length}</span> tests
                  </div>
                  <div className="h-1 w-1 rounded-full bg-white/20" />
                  <div>
                    Avg <span className="font-mono text-foreground">
                      {Math.round(testHistory.reduce((sum, t) => sum + t.wpm, 0) / testHistory.length)}
                    </span> WPM
                  </div>
                </div>
              )}
            </GlassCard>
          </motion.div>

          {/* Upgraded value props */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-12 max-w-xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {[
              { label: "Choose before you start", value: "Presets + Full Controls" },
              { label: "Real developer content", value: "Code, prose & more" },
              { label: "Deep insights", value: "Heatmaps + History" },
            ].map((item, i) => (
              <GlassCard key={item.label} delay={0.1 * i} className="p-4 text-left">
                <p className="text-xs text-muted">{item.label}</p>
                <p className="text-base font-semibold text-foreground mt-0.5">{item.value}</p>
              </GlassCard>
            ))}
          </motion.div>
        </div>
      </main>
    </div>
  );
}
