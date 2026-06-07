"use client";

import { motion } from "framer-motion";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { TimeSeriesPoint } from "@/types";

interface AccuracyChartProps {
  data: TimeSeriesPoint[];
}

export function AccuracyChart({ data }: AccuracyChartProps) {
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
      transition={{ delay: 0.3 }}
      className="h-56 w-full"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 10, right: 8, left: 0, bottom: 0 }}>
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
            domain={[0, 100]}
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
            labelFormatter={(v) => `${v}s`}
            formatter={(value) => [`${value}%`, "Accuracy"]}
          />
          <Line
            type="monotone"
            dataKey="accuracy"
            stroke="#a78bfa"
            strokeWidth={2.5}
            dot={false}
            activeDot={{ r: 4, fill: "#a78bfa", stroke: "rgba(255,255,255,0.8)", strokeWidth: 1 }}
            animationDuration={1000}
          />
        </LineChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
