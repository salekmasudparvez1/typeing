import type {
  AppSettings,
  AppStorage,
  Difficulty,
  TestMode,
  TestResult,
  Theme,
} from "@/types";

const STORAGE_KEY = "typeflow-storage";

const DEFAULT_SETTINGS: AppSettings = {
  userName: "",
  theme: "dark",
  soundEnabled: true,
  difficulty: "medium",
  mode: "normal",
  bestWpm: 0,
  streak: 0,
  lastPlayedDate: null,
};

function getToday(): string {
  return new Date().toISOString().split("T")[0];
}

function isClient(): boolean {
  return typeof window !== "undefined";
}

export function getStorage(): AppStorage {
  if (!isClient()) {
    return { settings: DEFAULT_SETTINGS, testHistory: [], dailyPerformance: [] };
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return { settings: DEFAULT_SETTINGS, testHistory: [], dailyPerformance: [] };
    }
    const parsed = JSON.parse(raw) as AppStorage;
    return {
      settings: { ...DEFAULT_SETTINGS, ...parsed.settings },
      testHistory: parsed.testHistory ?? [],
      dailyPerformance: parsed.dailyPerformance ?? [],
    };
  } catch {
    return { settings: DEFAULT_SETTINGS, testHistory: [], dailyPerformance: [] };
  }
}

export function saveStorage(data: AppStorage): void {
  if (!isClient()) return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // Storage full or unavailable
  }
}

export function updateSettings(partial: Partial<AppSettings>): AppSettings {
  const storage = getStorage();
  const settings = { ...storage.settings, ...partial };
  saveStorage({ ...storage, settings });
  return settings;
}

export function saveTestResult(result: TestResult): AppStorage {
  const storage = getStorage();
  const testHistory = [result, ...storage.testHistory].slice(0, 50);

  let bestWpm = storage.settings.bestWpm;
  if (result.wpm > bestWpm) bestWpm = result.wpm;

  const today = getToday();
  let streak = storage.settings.streak;
  const lastPlayed = storage.settings.lastPlayedDate;

  if (lastPlayed !== today) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split("T")[0];
    streak = lastPlayed === yesterdayStr ? streak + 1 : 1;
  }

  const settings: AppSettings = {
    ...storage.settings,
    bestWpm,
    streak,
    lastPlayedDate: today,
    difficulty: result.difficulty,
    mode: result.mode,
  };

  const dailyMap = new Map(storage.dailyPerformance.map((d) => [d.date, d]));
  const existing = dailyMap.get(today);
  if (existing) {
    dailyMap.set(today, {
      date: today,
      tests: existing.tests + 1,
      avgWpm: Math.round(
        (existing.avgWpm * existing.tests + result.wpm) / (existing.tests + 1)
      ),
    });
  } else {
    dailyMap.set(today, { date: today, tests: 1, avgWpm: result.wpm });
  }

  const dailyPerformance = Array.from(dailyMap.values())
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(-14);

  const updated: AppStorage = { settings, testHistory, dailyPerformance };
  saveStorage(updated);
  return updated;
}

export function setUserName(name: string): void {
  updateSettings({ userName: name.trim() });
}

export function setTheme(theme: Theme): void {
  updateSettings({ theme });
}

export function setDifficulty(difficulty: Difficulty): void {
  updateSettings({ difficulty });
}

export function setMode(mode: TestMode): void {
  updateSettings({ mode });
}

export function setSoundEnabled(enabled: boolean): void {
  updateSettings({ soundEnabled: enabled });
}

export function clearHistory(): void {
  const storage = getStorage();
  saveStorage({ ...storage, testHistory: [], dailyPerformance: [] });
}
