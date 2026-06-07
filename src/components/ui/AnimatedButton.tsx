"use client";

import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

interface AnimatedButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit";
}

export function AnimatedButton({
  children,
  onClick,
  variant = "primary",
  size = "md",
  className,
  disabled,
  type = "button",
}: AnimatedButtonProps) {
  const variants = {
    primary:
      "bg-gradient-to-r from-cyan-500 to-violet-600 text-white shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40",
    secondary:
      "bg-white/5 border border-white/10 text-foreground hover:bg-white/10 hover:border-white/20",
    ghost: "bg-transparent text-muted hover:bg-white/5",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: disabled ? 1 : 1.02, y: disabled ? 0 : -2 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      className={cn(
        "relative rounded-xl font-medium transition-all duration-300 overflow-hidden",
        variants[variant],
        sizes[size],
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
      {variant === "primary" && (
        <motion.span
          className="absolute inset-0 bg-gradient-to-r from-violet-600 to-cyan-500 opacity-0"
          whileHover={{ opacity: 0.3 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </motion.button>
  );
}
