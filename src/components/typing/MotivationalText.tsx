"use client";

import { AnimatePresence, motion } from "framer-motion";
import { getMotivationalText } from "@/utils/motivation";

interface MotivationalTextProps {
  wpm: number;
  accuracy: number;
  streak: number;
}

export function MotivationalText({ wpm, accuracy, streak }: MotivationalTextProps) {
  const text = getMotivationalText(wpm, accuracy, streak);

  return (
    <AnimatePresence mode="wait">
      <motion.p
        key={text}
        className="text-sm text-cyan-400/80 text-center italic"
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -5 }}
        transition={{ duration: 0.3 }}
      >
        {text}
      </motion.p>
    </AnimatePresence>
  );
}
