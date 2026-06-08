"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface CelebrationProps {
  trigger: boolean;
  type?: "excellent" | "newbest" | "great";
  onComplete?: () => void;
}

/**
 * Beautiful zero-dependency celebration using Framer Motion.
 * Gives that premium "I crushed it" feeling.
 */
export function Celebration({ trigger, type = "excellent", onComplete }: CelebrationProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (trigger) {
      setShow(true);
      const timer = setTimeout(() => {
        setShow(false);
        onComplete?.();
      }, 2200);
      return () => clearTimeout(timer);
    }
  }, [trigger, onComplete]);

  const symbols = type === "newbest" 
    ? ["🏆", "🔥", "⚡", "✨", "💎"] 
    : type === "excellent" 
    ? ["🌟", "🎯", "🚀", "✨", "💫"] 
    : ["👏", "✅", "🔥", "⭐"];

  return (
    <AnimatePresence>
      {show && (
        <div className="pointer-events-none fixed inset-0 z-[100] flex items-center justify-center overflow-hidden">
          {Array.from({ length: 18 }).map((_, i) => {
            const symbol = symbols[i % symbols.length];
            const delay = i * 0.018;
            const xOffset = (i % 5) * 18 - 36 + (Math.random() - 0.5) * 40;

            return (
              <motion.div
                key={i}
                initial={{ 
                  opacity: 0, 
                  y: 40 + Math.random() * 30, 
                  x: xOffset,
                  scale: 0.6 + Math.random() * 0.6 
                }}
                animate={{ 
                  opacity: [0, 1, 0.9, 0],
                  y: -160 - Math.random() * 90,
                  x: xOffset + (Math.random() - 0.5) * 70,
                  scale: [0.6, 1.05, 0.85],
                  rotate: (Math.random() - 0.5) * 40
                }}
                transition={{ 
                  duration: 1.9 + Math.random() * 0.5, 
                  delay, 
                  ease: [0.22, 1, 0.36, 1] 
                }}
                className="absolute text-2xl sm:text-3xl drop-shadow-[0_4px_12px_rgba(0,0,0,0.3)]"
              >
                {symbol}
              </motion.div>
            );
          })}

          {/* Center text burst */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="relative z-10 text-center"
          >
            <div className="text-4xl font-semibold tracking-tighter text-white drop-shadow-lg">
              {type === "newbest" && "NEW PERSONAL BEST!"}
              {type === "excellent" && "EXCELLENT!"}
              {type === "great" && "GREAT RUN!"}
            </div>
            <div className="mt-1 text-sm text-white/70">Keep going.</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
