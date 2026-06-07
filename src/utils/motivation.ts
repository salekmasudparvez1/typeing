export const MOTIVATIONAL_TEXTS = {
  low: [
    "Every expert was once a beginner. Keep going!",
    "Focus on accuracy first — speed will follow.",
    "Take a breath and find your rhythm.",
  ],
  mid: [
    "You're finding your flow — stay steady!",
    "Great pace! Maintain that accuracy.",
    "Consistency beats bursts. Nice work.",
  ],
  high: [
    "Blazing speed! You're in the zone.",
    "Outstanding rhythm — keep it up!",
    "Elite performance. Absolutely crushing it.",
  ],
  streak: [
    "Streak alive! Momentum is everything.",
    "Day after day — dedication pays off.",
    "Your consistency is inspiring.",
  ],
};

export function getMotivationalText(
  wpm: number,
  accuracy: number,
  streak: number
): string {
  if (streak >= 3) {
    const texts = MOTIVATIONAL_TEXTS.streak;
    return texts[Math.floor(Math.random() * texts.length)];
  }
  if (wpm >= 60 && accuracy >= 90) {
    const texts = MOTIVATIONAL_TEXTS.high;
    return texts[Math.floor(Math.random() * texts.length)];
  }
  if (wpm >= 30 && accuracy >= 80) {
    const texts = MOTIVATIONAL_TEXTS.mid;
    return texts[Math.floor(Math.random() * texts.length)];
  }
  const texts = MOTIVATIONAL_TEXTS.low;
  return texts[Math.floor(Math.random() * texts.length)];
}
