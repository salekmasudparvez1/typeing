"use client";

import { AnimatePresence, motion } from "framer-motion";

interface CountdownOverlayProps {
  count: number | null;
}

export function CountdownOverlay({ count }: CountdownOverlayProps) {
  return (
    <AnimatePresence>
      {count !== null && count > 0 && (
        <motion.div
          className="fixed inset-0 z-40 flex items-center justify-center bg-background/80 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.span
            key={count}
            className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.5, opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {count}
          </motion.span>
        </motion.div>
      )}
      {count === 0 && (
        <motion.div
          className="fixed inset-0 z-40 flex items-center justify-center bg-background/80 backdrop-blur-sm pointer-events-none"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.span
            className="text-6xl font-bold text-emerald-400"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1.2, opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            Go!
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
