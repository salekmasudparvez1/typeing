"use client";

import { create } from "zustand";
import { getRandomText } from "@/data/texts";
import {
  getStorage,
  saveTestResult,
  setDifficulty as persistDifficulty,
  setMode as persistMode,
  setSoundEnabled as persistSound,
  setTheme as persistTheme,
  setUserName as persistUserName,
  updateSettings,
} from "@/lib/storage";
import type {
  AppSettings,
  DailyPerformance,
  Difficulty,
  Language,
  Screen,
  TestMode,
  TestResult,
  Theme,
} from "@/types";

interface AppState {
  screen: Screen;
  settings: AppSettings;
  testHistory: TestResult[];
  dailyPerformance: DailyPerformance[];
  currentText: string;
  isLoading: boolean;

  hydrate: () => void;
  setScreen: (screen: Screen) => void;
  setUserName: (name: string) => void;
  setTheme: (theme: Theme) => void;
  setDifficulty: (difficulty: Difficulty) => void;
  setMode: (mode: TestMode) => void;
  setLanguage: (language: Language) => void;
  setSoundEnabled: (enabled: boolean) => void;
  startTest: () => void;
  finishTest: (result: TestResult) => void;
  restartTest: () => void;
  goToLanding: () => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  screen: "landing",
  settings: {
    userName: "",
    theme: "dark",
    soundEnabled: true,
    difficulty: "medium",
    mode: "normal",
    language: "general",
    bestWpm: 0,
    streak: 0,
    lastPlayedDate: null,
  },
  testHistory: [],
  dailyPerformance: [],
  currentText: "",
  isLoading: true,

  hydrate: () => {
    const storage = getStorage();
    set({
      settings: storage.settings,
      testHistory: storage.testHistory,
      dailyPerformance: storage.dailyPerformance,
      isLoading: false,
      screen: storage.settings.userName ? "landing" : "landing",
    });
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("data-theme", storage.settings.theme);
    }
  },

  setScreen: (screen) => set({ screen }),

  setUserName: (name) => {
    persistUserName(name);
    const settings = updateSettings({ userName: name.trim() });
    set({ settings });
  },

  setTheme: (theme) => {
    persistTheme(theme);
    const settings = updateSettings({ theme });
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("data-theme", theme);
    }
    set({ settings });
  },

  setDifficulty: (difficulty) => {
    persistDifficulty(difficulty);
    const settings = updateSettings({ difficulty });
    set({ settings });
  },

  setMode: (mode) => {
    persistMode(mode);
    const settings = updateSettings({ mode });
    set({ settings });
  },

  setLanguage: (language) => {
    const settings = updateSettings({ language });
    set({ settings });
  },

  setSoundEnabled: (enabled) => {
    persistSound(enabled);
    const settings = updateSettings({ soundEnabled: enabled });
    set({ settings });
  },

  startTest: () => {
    const { settings } = get();
    set({
      screen: "typing",
      currentText: getRandomText(settings.difficulty, settings.language),
    });
  },

  finishTest: (result) => {
    const storage = saveTestResult(result);
    set({
      screen: "results",
      settings: storage.settings,
      testHistory: storage.testHistory,
      dailyPerformance: storage.dailyPerformance,
    });
  },

  restartTest: () => {
    const { settings } = get();
    set({
      screen: "typing",
      currentText: getRandomText(settings.difficulty, settings.language),
    });
  },

  goToLanding: () => set({ screen: "landing" }),
}));
