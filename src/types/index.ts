export type Difficulty = "easy" | "medium" | "hard";

export type Theme = "dark" | "light";

export type TestMode = "normal" | "focus" | "zen";

export type Screen = "landing" | "typing" | "results";

export type TestStatus = "idle" | "countdown" | "running" | "finished";

export type PerformanceRating =
  | "Excellent"
  | "Great"
  | "Good"
  | "Average"
  | "Needs Improvement";

export interface TimeSeriesPoint {
  time: number;
  wpm: number;
  accuracy: number;
}

export interface TestResult {
  id: string;
  wpm: number;
  cpm: number;
  accuracy: number;
  mistakes: number;
  timeTaken: number;
  difficulty: Difficulty;
  mode: TestMode;
  timestamp: number;
  timeSeries: TimeSeriesPoint[];
}

export interface DailyPerformance {
  date: string;
  avgWpm: number;
  tests: number;
}

export interface KeyboardHeatmapData {
  [key: string]: { presses: number; errors: number };
}

export interface AppSettings {
  userName: string;
  theme: Theme;
  soundEnabled: boolean;
  difficulty: Difficulty;
  mode: TestMode;
  bestWpm: number;
  streak: number;
  lastPlayedDate: string | null;
}

export interface AppStorage {
  settings: AppSettings;
  testHistory: TestResult[];
  dailyPerformance: DailyPerformance[];
}

export interface TypingStats {
  wpm: number;
  cpm: number;
  accuracy: number;
  mistakes: number;
  correctChars: number;
  totalTyped: number;
  elapsed: number;
}

export interface CharacterState {
  char: string;
  status: "pending" | "correct" | "incorrect" | "extra";
}
