"use client";

import { motion } from "framer-motion";

export function GradientBlobs() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-20">
      <motion.div
        className="absolute -top-1/4 -left-1/4 w-[600px] h-[600px] rounded-full bg-cyan-500/20 blur-[120px]"
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-1/4 -right-1/4 w-[500px] h-[500px] rounded-full bg-violet-600/20 blur-[120px]"
        animate={{
          x: [0, -80, 0],
          y: [0, -60, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-fuchsia-500/10 blur-[100px]"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
