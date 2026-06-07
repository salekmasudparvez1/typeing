"use client";

import { motion } from "framer-motion";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { DailyPerformance } from "@/types";

interface DailyPerformanceChartProps {
  data: DailyPerformance[];
}

export function DailyPerformanceChart({ data }: DailyPerformanceChartProps) {
  const chartData = data.map((d) => {
    const date = new Date(d.date);

    return {
      ...d,
      label: date.toLocaleDateString("en", { month: "short", day: "numeric" }),
      fullLabel: date.toLocaleDateString("en", { weekday: "long", month: "short", day: "numeric", year: "numeric" }),
    };
  });

  const totalTests = data.reduce((sum, entry) => sum + entry.tests, 0);
  const averageWpm = data.length > 0
    ? Math.round(data.reduce((sum, entry) => sum + entry.avgWpm, 0) / data.length)
    : 0;
  const bestDay = data.reduce<DailyPerformance | null>((best, entry) => {
    if (!best || entry.avgWpm > best.avgWpm) return entry;
    return best;
  }, null);

  if (chartData.length === 0) {
    return (
      <div className="h-56 flex items-center justify-center text-muted text-sm text-center px-4">
        Complete tests to see daily performance
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
      className="space-y-4"
    >
      <div className="grid gap-3 sm:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
          <p className="text-xs uppercase tracking-wider text-muted">Average WPM</p>
          <p className="mt-1 text-2xl font-semibold text-cyan-400">{averageWpm}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
          <p className="text-xs uppercase tracking-wider text-muted">Total Tests</p>
          <p className="mt-1 text-2xl font-semibold text-violet-400">{totalTests}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
          <p className="text-xs uppercase tracking-wider text-muted">Best Day</p>
          <p className="mt-1 text-2xl font-semibold text-emerald-400">
            {bestDay?.avgWpm ?? 0}
          </p>
          <p className="text-xs text-muted">{bestDay ? new Date(bestDay.date).toLocaleDateString("en", { month: "short", day: "numeric" }) : "No data"}</p>
        </div>
      </div>

      <div className="h-56 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 10, right: 8, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#a78bfa" />
                <stop offset="55%" stopColor="#22d3ee" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
            <XAxis
              dataKey="label"
              tick={{ fill: "rgba(255,255,255,0.45)", fontSize: 10 }}
              tickLine={false}
              axisLine={false}
              minTickGap={16}
              stroke="rgba(255,255,255,0.1)"
            />
            <YAxis
              tick={{ fill: "rgba(255,255,255,0.45)", fontSize: 11 }}
              tickLine={false}
              axisLine={false}
              width={36}
              stroke="rgba(255,255,255,0.1)"
            />
            <Tooltip
              contentStyle={{
                background: "rgba(10, 12, 20, 0.96)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: "14px",
                backdropFilter: "blur(12px)",
              }}
              labelFormatter={(_value, payload) => {
                const point = payload?.[0]?.payload as (DailyPerformance & { fullLabel?: string }) | undefined;
                return point?.fullLabel ?? "Daily performance";
              }}
              formatter={(value, _name, props) => {
                const payload = props.payload as DailyPerformance & { fullLabel?: string };
                return [`${value} WPM across ${payload.tests} test${payload.tests === 1 ? "" : "s"}`, "Average"];
              }}
            />
            <Bar
              dataKey="avgWpm"
              fill="url(#barGradient)"
              radius={[10, 10, 0, 0]}
              maxBarSize={28}
              animationDuration={1000}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
