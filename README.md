# TypeFlow — Premium Typing Speed Practice

A modern, futuristic typing speed practice web application built with Next.js 15, React, TypeScript, Tailwind CSS, Framer Motion, and Recharts.

## Features

- **Landing Screen** — Animated hero with name entry and particle backgrounds
- **Typing Test** — Character-by-character validation with glowing feedback
- **Live Stats** — WPM, CPM, accuracy, mistakes, and timer
- **Performance Dashboard** — Results with insights and animated charts
- **LocalStorage** — Persistent user data, history, and preferences
- **Theme System** — Dark/light mode with saved preference
- **Advanced Modes** — Focus mode, Zen mode, keyboard heatmap, streaks

## Tech Stack

- Next.js 15 (App Router)
- React 19 + TypeScript
- Tailwind CSS 4
- Framer Motion
- Recharts
- Zustand

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
├── app/           # Next.js pages and global styles
├── components/    # UI, landing, typing, dashboard, charts
├── context/       # Theme provider
├── data/          # Typing text samples
├── hooks/         # Custom React hooks
├── lib/           # LocalStorage utilities
├── store/         # Zustand state management
├── types/         # TypeScript definitions
└── utils/         # Helper functions
```

## Scripts

- `npm run dev` — Start development server
- `npm run build` — Production build
- `npm run start` — Start production server
- `npm run lint` — Run ESLint
