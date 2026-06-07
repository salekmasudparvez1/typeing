"use client";

import { useCallback, useEffect, useState } from "react";

export function useCountdown(onComplete: () => void) {
  const [count, setCount] = useState<number | null>(null);
  const [active, setActive] = useState(false);

  const start = useCallback(() => {
    setCount(3);
    setActive(true);
  }, []);

  useEffect(() => {
    if (!active || count === null) return;

    if (count === 0) {
      setActive(false);
      setCount(null);
      onComplete();
      return;
    }

    const timer = setTimeout(() => setCount((c) => (c !== null ? c - 1 : null)), 1000);
    return () => clearTimeout(timer);
  }, [active, count, onComplete]);

  return { count, active, start };
}
