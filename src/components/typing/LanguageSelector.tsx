"use client";

import { motion } from "framer-motion";
import { Code2, Database, FileCode, Layers, Python, Type } from "lucide-react";
import { cn } from "@/utils/cn";
import type { Language } from "@/types";

const LANGUAGES: { value: Language; label: string; icon: React.ReactNode }[] = [
  { value: "general", label: "General", icon: <FileCode className="w-4 h-4" /> },
  { value: "python", label: "Python", icon: <Python className="w-4 h-4" /> },
  { value: "react", label: "React/JSX", icon: <Code2 className="w-4 h-4" /> },
  { value: "pandas", label: "Pandas", icon: <Database className="w-4 h-4" /> },
  { value: "numpy", label: "NumPy", icon: <Layers className="w-4 h-4" /> },
  { value: "sklearn", label: "scikit-learn", icon: <Database className="w-4 h-4" /> },
  { value: "typescript", label: "TypeScript", icon: <Type className="w-4 h-4" /> },
];

interface LanguageSelectorProps {
  value: Language;
  onChange: (lang: Language) => void;
  disabled?: boolean;
  visible?: boolean;
}

export function LanguageSelector({ value, onChange, disabled = false, visible = true }: LanguageSelectorProps) {
  if (!visible) return null;

  return (
    <div className="flex flex-wrap justify-center gap-1 p-1 rounded-xl bg-white/5 border border-white/10">
      {LANGUAGES.map((lang) => (
        <motion.button
          key={lang.value}
          onClick={() => !disabled && onChange(lang.value)}
          disabled={disabled}
          whileHover={{ scale: disabled ? 1 : 1.02 }}
          whileTap={{ scale: disabled ? 1 : 0.98 }}
          className={cn(
            "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all",
            value === lang.value
              ? "bg-white/10 text-emerald-400"
              : "text-muted hover:text-foreground",
            disabled && "opacity-50 cursor-not-allowed"
          )}
        >
          {lang.icon}
          <span>{lang.label}</span>
        </motion.button>
      ))}
    </div>
  );
}
