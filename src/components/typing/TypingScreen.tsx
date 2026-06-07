"use client";

import { AnimatePresence, motion } from "framer-motion";
import { RotateCcw, Volume2, VolumeX } from "lucide-react";
import { useCallback, useEffect } from "react";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { GlassCard } from "@/components/ui/GlassCard";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { CountdownOverlay } from "@/components/typing/CountdownOverlay";
import { DifficultySelector } from "@/components/typing/DifficultySelector";
import { KeyboardHeatmap } from "@/components/typing/KeyboardHeatmap";
import { LanguageSelector } from "@/components/typing/LanguageSelector";
import { ModeSelector } from "@/components/typing/ModeSelector";
import { MotivationalText } from "@/components/typing/MotivationalText";
import { StatsBar } from "@/components/typing/StatsBar";
import { TypingArea } from "@/components/typing/TypingArea";
import { useCountdown } from "@/hooks/useCountdown";
import { useSound } from "@/hooks/useSound";
import { useTypingTest } from "@/hooks/useTypingTest";
import { useAppStore } from "@/store/useAppStore";
import { getMilestone } from "@/utils/typing";

export function TypingScreen() {
  const settings = useAppStore((s) => s.settings);
  const currentText = useAppStore((s) => s.currentText);
  const finishTest = useAppStore((s) => s.finishTest);
  const setDifficulty = useAppStore((s) => s.setDifficulty);
  const setMode = useAppStore((s) => s.setMode);
  const setLanguage = useAppStore((s) => s.setLanguage);
  const setSoundEnabled = useAppStore((s) => s.setSoundEnabled);
  const goToLanding = useAppStore((s) => s.goToLanding);

  const { playCorrect, playError, playComplete } = useSound(settings.soundEnabled);

  const handleComplete = useCallback(
    (result: Parameters<typeof finishTest>[0]) => {
      playComplete();
      finishTest(result);
    },
    [finishTest, playComplete]
  );

  const {
    status,
    typed,
    stats,
    progress,
    heatmap,
    startCountdown,
    beginTyping,
    restart,
  } = useTypingTest({
    text: currentText,
    difficulty: settings.difficulty,
    mode: settings.mode,
    onComplete: handleComplete,
    onCorrect: playCorrect,
    onError: playError,
  });

  const { count, start: startCountdownTimer } = useCountdown(beginTyping);

  useEffect(() => {
    startCountdown();
    startCountdownTimer();
  }, [currentText]); // eslint-disable-line react-hooks/exhaustive-deps

  const isRunning = status === "running";
  const isFocus = settings.mode === "focus";
  const isZen = settings.mode === "zen";
  const isCodeMode = settings.mode === "code";
  const milestone = getMilestone(stats.wpm);

  return (
    <div className="min-h-screen flex flex-col">
      <CountdownOverlay count={count} />

      <header className="flex items-center justify-between gap-3 p-4 sm:p-6 max-w-6xl mx-auto w-full">
        <motion.button
          onClick={goToLanding}
          whileHover={{ scale: 1.02 }}
          className="text-sm text-muted hover:text-foreground transition-colors"
        >
          ← Back
        </motion.button>

        <div className="flex items-center gap-3">
          {!isZen && (
            <span className="text-sm text-muted hidden sm:inline">
              {settings.userName}
            </span>
          )}
          <motion.button
            onClick={() => setSoundEnabled(!settings.soundEnabled)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-xl bg-white/5 border border-white/10"
            aria-label="Toggle sound"
          >
            {settings.soundEnabled ? (
              <Volume2 className="w-4 h-4 text-cyan-400" />
            ) : (
              <VolumeX className="w-4 h-4 text-muted" />
            )}
          </motion.button>
          <ThemeToggle />
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 pb-8 max-w-5xl mx-auto w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key="typing-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full space-y-8"
          >
            {!isZen && (
              <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
                <DifficultySelector
                  value={settings.difficulty}
                  onChange={setDifficulty}
                  disabled={isRunning}
                />
                <ModeSelector
                  value={settings.mode}
                  onChange={setMode}
                  disabled={isRunning}
                />
                {isCodeMode && (
                  <LanguageSelector
                    value={settings.language}
                    onChange={setLanguage}
                    disabled={isRunning}
                  />
                )}
              </div>
            )}

            <StatsBar
              stats={stats}
              progress={progress}
              zenMode={isZen}
            />

            {!isZen && (
              <MotivationalText
                wpm={stats.wpm}
                accuracy={stats.accuracy}
                streak={settings.streak}
              />
            )}

            {milestone && isRunning && !isZen && (
              <motion.p
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center text-sm text-violet-400 font-medium"
              >
                🏆 {milestone}
              </motion.p>
            )}

            <GlassCard
              glow={isRunning}
              className={`p-4 sm:p-6 md:p-10 ${isFocus ? "max-w-2xl mx-auto" : ""}`}
            >
              <TypingArea
                text={currentText}
                typed={typed}
                focusMode={isFocus}
              />
            </GlassCard>

            {!isZen && (
              <KeyboardHeatmap data={heatmap} visible={typed.length > 5} />
            )}

            <div className="flex justify-center gap-4">
              <AnimatedButton
                variant="secondary"
                onClick={() => {
                  restart();
                  startCountdownTimer();
                }}
                disabled={status === "countdown"}
              >
                <RotateCcw className="w-4 h-4" />
                Restart
              </AnimatedButton>
            </div>

            <p className="text-center text-xs text-muted">
              Press <kbd className="px-1.5 py-0.5 rounded bg-white/10 font-mono">Esc</kbd> to finish early
            </p>
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
