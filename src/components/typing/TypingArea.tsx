"use client";

import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

interface TypingAreaProps {
  text: string;
  typed: string;
  focusMode?: boolean;
}

export function TypingArea({ text, typed, focusMode }: TypingAreaProps) {
  const chars = text.split("");

  return (
    <div
      className={cn(
        "relative w-full max-w-full font-mono text-xl md:text-2xl leading-relaxed tracking-wide select-none whitespace-pre-wrap break-words [overflow-wrap:anywhere]",
        focusMode && "text-lg md:text-xl"
      )}
      aria-label="Typing test area"
      role="textbox"
      aria-readonly
    >
      {chars.map((char, i) => {
        const typedChar = typed[i];
        let status: "pending" | "correct" | "incorrect" | "current" = "pending";

        if (i < typed.length) {
          status = typedChar === char ? "correct" : "incorrect";
        } else if (i === typed.length) {
          status = "current";
        }
        return (
          <span key={i} className="relative inline-block align-baseline">
            {status === "current" && (
              <motion.span
                className="absolute -left-[1px] top-0 bottom-0 w-[2px] bg-cyan-400 rounded-full caret-glow"
                layoutId="caret"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            )}
            <span
              className={cn(
                "transition-colors duration-150",
                status === "pending" && "text-muted/60",
                status === "correct" && "text-emerald-400 correct-glow",
                status === "incorrect" && "text-red-400 incorrect-glow underline decoration-red-500/80",
                status === "current" && "text-foreground bg-cyan-500/10 rounded-sm"
              )}
            >
              {char}
            </span>
          </span>
        );
      })}
    </div>
  );
}
