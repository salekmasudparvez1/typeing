import type { Difficulty } from "@/types";

export const TYPING_TEXTS: Record<Difficulty, string[]> = {
  easy: [
    "Open your editor, save often, and keep each function small. Clear names, clean spacing, and steady practice make typing code feel natural.",
    "A good programmer reads errors before writing fixes. Simple loops, helpful comments, and careful tests turn a messy idea into a reliable feature.",
    "Keyboard shortcuts speed up every day of development. Moving fast matters, but moving with intent matters more when you build software for real users.",
    "Readable code helps teams ship changes with confidence. Type each line with care, and let structure guide your hands as much as speed does.",
    "Debugging is easier when you describe the problem clearly. Small steps, focused feedback, and a calm mind help you recover from mistakes quickly.",
  ],
  medium: [
    "Modern TypeScript projects balance strong types with flexible architecture. Developers compose reusable hooks, predictable state, and polished interfaces without losing momentum.",
    "Performance work starts with measurement, not guesswork. Profile the slow path, reduce unnecessary re-renders, and keep your data flow simple enough to reason about under pressure.",
    "A responsive product respects every viewport. Cards should wrap gracefully, charts should stay readable, and controls should remain reachable on a phone or a large desktop monitor.",
    "Reliable teams ship by combining automation, code review, and clear ownership. Good defaults reduce friction while thoughtful abstractions keep the codebase maintainable over time.",
    "Software quality improves when engineers treat accessibility, feedback states, and error handling as part of the design, not as optional cleanup after launch.",
  ],
  hard: [
    "const optimizedPipeline = events.filter((event) => event.isReady).map((event) => ({ id: event.id, score: event.score ?? 0 }));",
    "async function loadDashboard() { const [profile, metrics, history] = await Promise.all([fetchProfile(), fetchMetrics(), fetchHistory()]); return { profile, metrics, history }; }",
    "useEffect(() => { if (!isMounted) return; const timer = window.setTimeout(() => setReady(true), 150); return () => window.clearTimeout(timer); }, [isMounted]);",
    "type ChartPoint = { time: number; wpm: number; accuracy: number }; const trend = points.reduce((sum, point) => sum + point.wpm, 0) / Math.max(points.length, 1);",
    "if (response.ok) { const payload = await response.json(); setState((current) => ({ ...current, data: payload.data, error: null })); } else { throw new Error('Request failed'); }",
  ],
};

export function getRandomText(difficulty: Difficulty): string {
  const texts = TYPING_TEXTS[difficulty];
  return texts[Math.floor(Math.random() * texts.length)];
}
