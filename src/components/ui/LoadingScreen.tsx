"use client";

import { motion } from "framer-motion";

export function LoadingScreen() {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        TypeFlow
      </motion.div>
      <motion.div
        className="mt-6 w-48 h-1 rounded-full bg-white/10 overflow-hidden"
      >
        <motion.div
          className="h-full bg-gradient-to-r from-cyan-500 to-violet-500"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        />
      </motion.div>
      <p className="mt-4 text-sm text-muted">Initializing...</p>
    </motion.div>
  );
}
