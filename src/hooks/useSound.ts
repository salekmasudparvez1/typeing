"use client";

import { useCallback, useRef } from "react";

export function useSound(enabled: boolean) {
  const ctxRef = useRef<AudioContext | null>(null);

  const getCtx = useCallback(() => {
    if (!ctxRef.current) {
      ctxRef.current = new AudioContext();
    }
    return ctxRef.current;
  }, []);

  const playTone = useCallback(
    (frequency: number, duration: number, type: OscillatorType = "sine") => {
      if (!enabled) return;
      try {
        const ctx = getCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = type;
        osc.frequency.value = frequency;
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + duration);
      } catch {
        // Audio not available
      }
    },
    [enabled, getCtx]
  );

  const playCorrect = useCallback(() => playTone(880, 0.05), [playTone]);
  const playError = useCallback(() => playTone(220, 0.1, "square"), [playTone]);
  const playComplete = useCallback(() => {
    playTone(523, 0.1);
    setTimeout(() => playTone(659, 0.1), 100);
    setTimeout(() => playTone(784, 0.15), 200);
  }, [playTone]);

  return { playCorrect, playError, playComplete };
}
