import type { Difficulty, Language, TestMode } from "@/types";

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

export const CODE_SNIPPETS: Record<Language, string[]> = {
  general: [],
  python: [
    "def fibonacci(n: int) -> int:\n    if n <= 1:\n        return n\n    return fibonacci(n-1) + fibonacci(n-2)\n\n# Calculate first 10 Fibonacci numbers",
    "import pandas as pd\n\ndf = pd.read_csv('data.csv')\nresult = df.groupby('category')['value'].mean()",
    "from sklearn.model_selection import train_test_split\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)",
  ],
  react: [
    "const [state, setState] = useState([]);\nuseEffect(() => {\n  fetchData().then(setState);\n}, []);",
    "<button onClick={handleClick} className=\"px-4 py-2 bg-blue-600 rounded-lg\">\n  Click me\n</button>",
    "function Counter() {\n  const [count, setCount] = useState(0);\n  return <button onClick={() => setCount(c => c+1)}>{count}</button>;\n}",
  ],
  pandas: [
    "df['new_col'] = df['col1'] + df['col2']\nfiltered = df[df['age'] > 30].sort_values('salary')",
    "pivot = pd.pivot_table(df, values='sales', index='region', columns='year', aggfunc='sum')",
  ],
  numpy: [
    "import numpy as np\narr = np.random.randn(1000, 5)\nmean = np.mean(arr, axis=0)",
    "mask = np.logical_and(arr > 0, arr < 1)\nresult = arr[mask]",
  ],
  sklearn: [
    "from sklearn.ensemble import RandomForestClassifier\nmodel = RandomForestClassifier(n_estimators=100)\nmodel.fit(X_train, y_train)",
    "from sklearn.metrics import classification_report\nprint(classification_report(y_test, y_pred))",
  ],
  typescript: [
    "interface User { id: number; name: string; email?: string; }\n\nconst fetchUser = async (id: number): Promise<User> => {\n  const res = await fetch(`/api/users/${id}`);\n  return res.json();\n}",
  ],
};

export function getRandomText(
  difficulty: Difficulty,
  language: Language = "general",
  mode: TestMode = "normal"
): string {
  // When in "code" mode with general language, default to a code language for content
  let effectiveLang = language;
  if (mode === "code" && language === "general") {
    effectiveLang = "typescript";
  }

  if (effectiveLang !== "general" && CODE_SNIPPETS[effectiveLang]?.length) {
    const snippets = CODE_SNIPPETS[effectiveLang];
    return snippets[Math.floor(Math.random() * snippets.length)];
  }
  const texts = TYPING_TEXTS[difficulty];
  return texts[Math.floor(Math.random() * texts.length)];
}
