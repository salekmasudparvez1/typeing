"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type {
  Difficulty,
  KeyboardHeatmapData,
  TestMode,
  TestResult,
  TestStatus,
  TimeSeriesPoint,
  TypingStats,
} from "@/types";
import { getTypingStats } from "@/utils/typing";

interface UseTypingTestOptions {
  text: string;
  difficulty: Difficulty;
  mode: TestMode;
  onComplete: (result: TestResult) => void;
  onCorrect?: () => void;
  onError?: () => void;
}

export function useTypingTest({
  text,
  difficulty,
  mode,
  onComplete,
  onCorrect,
  onError,
}: UseTypingTestOptions) {
  const [status, setStatus] = useState<TestStatus>("idle");
  const [typed, setTyped] = useState("");
  const [mistakes, setMistakes] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [timeSeries, setTimeSeries] = useState<TimeSeriesPoint[]>([]);
  const [heatmap, setHeatmap] = useState<KeyboardHeatmapData>({});

  const startTimeRef = useRef<number | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const typedRef = useRef("");
  const timeSeriesRef = useRef<TimeSeriesPoint[]>([]);
  const mistakesRef = useRef(0);
  const completedRef = useRef(false);

  const updateHeatmap = useCallback((key: string, isError: boolean) => {
    setHeatmap((prev) => {
      const entry = prev[key] ?? { presses: 0, errors: 0 };
      return {
        ...prev,
        [key]: {
          presses: entry.presses + 1,
          errors: entry.errors + (isError ? 1 : 0),
        },
      };
    });
  }, []);

  const getStats = useCallback((): TypingStats => {
    let correct = 0;
    for (let i = 0; i < typed.length; i++) {
      if (typed[i] === text[i]) correct++;
    }
    return getTypingStats(correct, typed.length, mistakesRef.current, elapsed);
  }, [typed, text, elapsed]);

  const finish = useCallback(() => {
    if (completedRef.current) return;
    completedRef.current = true;
    if (intervalRef.current) clearInterval(intervalRef.current);

    const stats = getStats();
    const result: TestResult = {
      id: crypto.randomUUID(),
      wpm: stats.wpm,
      cpm: stats.cpm,
      accuracy: stats.accuracy,
      mistakes: stats.mistakes,
      timeTaken: stats.elapsed,
      difficulty,
      mode,
      timestamp: Date.now(),
      timeSeries: timeSeriesRef.current,
    };
    setStatus("finished");
    onComplete(result);
  }, [getStats, difficulty, mode, onComplete]);

  const startCountdown = useCallback(() => {
    setStatus("countdown");
    setTyped("");
    setMistakes(0);
    setElapsed(0);
    setTimeSeries([]);
    setHeatmap({});
    typedRef.current = "";
    timeSeriesRef.current = [];
    mistakesRef.current = 0;
    completedRef.current = false;
    startTimeRef.current = null;
  }, []);

  const beginTyping = useCallback(() => {
    setStatus("running");
    startTimeRef.current = Date.now();
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      if (startTimeRef.current) {
        setElapsed(Date.now() - startTimeRef.current);
      }
    }, 100);
  }, []);

  useEffect(() => {
    if (status !== "running" || !startTimeRef.current) return;

    const sampleInterval = setInterval(() => {
      const now = Date.now() - (startTimeRef.current ?? Date.now());
      let correct = 0;
      for (let i = 0; i < typed.length; i++) {
        if (typed[i] === text[i]) correct++;
      }
      const stats = getTypingStats(
        correct,
        typed.length,
        mistakesRef.current,
        now
      );
      const sec = Math.floor(now / 1000);
      setTimeSeries((prev) => {
        const existing = prev.find((p) => p.time === sec);
        const next = existing
          ? prev.map((p) =>
              p.time === sec
                ? { time: sec, wpm: stats.wpm, accuracy: stats.accuracy }
                : p
            )
          : [...prev, { time: sec, wpm: stats.wpm, accuracy: stats.accuracy }];
        timeSeriesRef.current = next;
        return next;
      });
    }, 1000);

    return () => clearInterval(sampleInterval);
  }, [status, typed, text]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (status !== "running") return;

      if (e.key === "Escape") {
        e.preventDefault();
        finish();
        return;
      }

      if (e.key === "Backspace") {
        e.preventDefault();
        setTyped((prev) => {
          const next = prev.slice(0, -1);
          typedRef.current = next;
          return next;
        });
        updateHeatmap("Backspace", false);
        return;
      }

      if (e.key.length !== 1) return;
      e.preventDefault();

      const index = typed.length;
      if (index >= text.length) return;

      const expected = text[index];
      const isCorrect = e.key === expected;

      setTyped((prev) => {
        const next = prev + e.key;
        typedRef.current = next;
        return next;
      });
      updateHeatmap(e.key.toUpperCase(), !isCorrect);

      if (!isCorrect) {
        mistakesRef.current += 1;
        setMistakes(mistakesRef.current);
        onError?.();
      } else {
        onCorrect?.();
      }

      if (index + 1 >= text.length) {
        setTimeout(() => finish(), 50);
      }
    },
    [status, typed, text, finish, updateHeatmap, onCorrect, onError]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const restart = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    completedRef.current = false;
    startCountdown();
  }, [startCountdown]);

  const progress = text.length > 0 ? (typed.length / text.length) * 100 : 0;
  const stats = getStats();

  return {
    status,
    typed,
    mistakes,
    elapsed,
    stats,
    timeSeries,
    heatmap,
    progress,
    startCountdown,
    beginTyping,
    restart,
    finish,
  };
}
