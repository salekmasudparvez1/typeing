"use client";

import { motion } from "framer-motion";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { TimeSeriesPoint } from "@/types";

interface WpmChartProps {
  data: TimeSeriesPoint[];
}

export function WpmChart({ data }: WpmChartProps) {
  if (data.length === 0) {
    return (
      <div className="h-56 flex items-center justify-center text-muted text-sm text-center px-4">
        No data available
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="h-56 w-full"
    >
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 8, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="wpmGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#22d3ee" stopOpacity={0.45} />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
          <XAxis
            dataKey="time"
            tick={{ fill: "rgba(255,255,255,0.45)", fontSize: 11 }}
            tickFormatter={(v) => `${v}s`}
            tickLine={false}
            axisLine={false}
            minTickGap={18}
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
            cursor={{ stroke: "rgba(34, 211, 238, 0.2)", strokeWidth: 1 }}
            labelFormatter={(v) => `${v}s elapsed`}
          />
          <Area
            type="monotone"
            dataKey="wpm"
            stroke="#22d3ee"
            strokeWidth={2.5}
            fill="url(#wpmGradient)"
            dot={false}
            activeDot={{ r: 4, fill: "#22d3ee", stroke: "rgba(255,255,255,0.8)", strokeWidth: 1 }}
            animationDuration={1000}
          />
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
