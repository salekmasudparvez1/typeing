"use client";

import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
  delay?: number;
}

export function GlassCard({ children, className, glow = false, delay = 0 }: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={cn(
        "relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl",
        glow && "shadow-[0_0_40px_rgba(6,182,212,0.15)]",
        className
      )}
    >
      {glow && (
        <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-cyan-500/20 via-violet-500/20 to-cyan-500/20 -z-10 blur-sm" />
      )}
      {children}
    </motion.div>
  );
}
