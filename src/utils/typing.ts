import type { PerformanceRating, TypingStats } from "@/types";

export function calculateWpm(correctChars: number, elapsedMs: number): number {
  if (elapsedMs <= 0) return 0;
  const minutes = elapsedMs / 60000;
  return Math.round((correctChars / 5) / minutes);
}

export function calculateCpm(correctChars: number, elapsedMs: number): number {
  if (elapsedMs <= 0) return 0;
  const minutes = elapsedMs / 60000;
  return Math.round(correctChars / minutes);
}

export function calculateAccuracy(correct: number, total: number): number {
  if (total <= 0) return 100;
  return Math.round((correct / total) * 1000) / 10;
}

export function getTypingStats(
  correctChars: number,
  totalTyped: number,
  mistakes: number,
  elapsedMs: number
): TypingStats {
  return {
    wpm: calculateWpm(correctChars, elapsedMs),
    cpm: calculateCpm(correctChars, elapsedMs),
    accuracy: calculateAccuracy(correctChars, totalTyped),
    mistakes,
    correctChars,
    totalTyped,
    elapsed: elapsedMs,
  };
}

export function getPerformanceRating(wpm: number, accuracy: number): PerformanceRating {
  const score = wpm * (accuracy / 100);
  if (score >= 80 && accuracy >= 95) return "Excellent";
  if (score >= 60 && accuracy >= 90) return "Great";
  if (score >= 40 && accuracy >= 85) return "Good";
  if (score >= 25 && accuracy >= 75) return "Average";
  return "Needs Improvement";
}

export function formatTime(ms: number): string {
  const seconds = Math.floor(ms / 1000);
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

export function getMilestone(wpm: number): string | null {
  const milestones: [number, string][] = [
    [100, "Century Club — 100 WPM!"],
    [80, "Elite Typist — 80 WPM"],
    [60, "Speed Demon — 60 WPM"],
    [40, "Getting Fast — 40 WPM"],
    [25, "Warming Up — 25 WPM"],
  ];
  for (const [threshold, label] of milestones) {
    if (wpm >= threshold) return label;
  }
  return null;
}
