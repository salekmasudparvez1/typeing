"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useSpring, useTransform } from "framer-motion";

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  decimals?: number;
  className?: string;
}

export function AnimatedCounter({
  value,
  suffix = "",
  decimals = 0,
  className,
}: AnimatedCounterProps) {
  const spring = useSpring(0, { stiffness: 100, damping: 30 });
  const display = useTransform(spring, (v) =>
    decimals > 0 ? v.toFixed(decimals) : Math.round(v).toString()
  );
  const [text, setText] = useState("0");
  const prev = useRef(0);

  useEffect(() => {
    spring.set(value);
    prev.current = value;
  }, [value, spring]);

  useEffect(() => {
    const unsub = display.on("change", (v) => setText(v));
    return unsub;
  }, [display]);

  return (
    <motion.span className={className}>
      {text}
      {suffix}
    </motion.span>
  );
}
