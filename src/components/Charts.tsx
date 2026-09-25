"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  AreaChart,
  Area,
  Legend,
} from "recharts";
import { CATEGORY_COLORS, PAYMENT_COLORS, type Category, type PaymentMethod } from "@/data/transactions";
import { formatINRShort } from "@/lib/utils";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-slate-700 bg-slate-900/95 px-3 py-2 shadow-xl backdrop-blur">
      <p className="text-xs font-medium text-slate-300">{label}</p>
      {payload.map((p: any, i: number) => (
        <p key={i} className="text-sm font-semibold" style={{ color: p.color || p.fill }}>
          {p.name}: {formatINRShort(p.value)}
        </p>
      ))}
    </div>
  );
};

export function CategoryPie({ data }: { data: { name: string; value: number }[] }) {
  if (!data.length)
    return (
      <div className="flex h-64 items-center justify-center text-slate-500">
        No spend data
      </div>
    );
  return (
    <ResponsiveContainer width="100%" height={280}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={100}
          paddingAngle={3}
          dataKey="value"
          nameKey="name"
        >
          {data.map((entry) => (
            <Cell
              key={entry.name}
              fill={CATEGORY_COLORS[entry.name as Category] || "#64748b"}
              stroke="transparent"
            />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend
          verticalAlign="bottom"
          height={36}
          formatter={(value) => (
            <span className="text-xs text-slate-400">{value}</span>
          )}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}

export function PaymentBar({ data }: { data: { name: string; value: number }[] }) {
  if (!data.length)
    return (
      <div className="flex h-64 items-center justify-center text-slate-500">
        No data
      </div>
    );
  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={data} layout="vertical" margin={{ left: 20, right: 20 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
        <XAxis
          type="number"
          tickFormatter={(v) => formatINRShort(v)}
          tick={{ fill: "#64748b", fontSize: 11 }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          type="category"
          dataKey="name"
          width={90}
          tick={{ fill: "#94a3b8", fontSize: 12 }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="value" radius={[0, 6, 6, 0]} barSize={22}>
          {data.map((entry) => (
            <Cell
              key={entry.name}
              fill={PAYMENT_COLORS[entry.name as PaymentMethod] || "#64748b"}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

export function MonthlyTrend({
  data,
}: {
  data: { label: string; spend: number; refund: number; net: number }[];
}) {
  if (!data.length)
    return (
      <div className="flex h-64 items-center justify-center text-slate-500">
        No data
      </div>
    );
  return (
    <ResponsiveContainer width="100%" height={280}>
      <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="spendGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#22c55e" stopOpacity={0.4} />
            <stop offset="100%" stopColor="#22c55e" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="refundGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#10b981" stopOpacity={0.3} />
            <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
        <XAxis
          dataKey="label"
          tick={{ fill: "#64748b", fontSize: 11 }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tickFormatter={(v) => formatINRShort(v)}
          tick={{ fill: "#64748b", fontSize: 11 }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip content={<CustomTooltip />} />
        <Area
          type="monotone"
          dataKey="spend"
          name="Spend"
          stroke="#22c55e"
          fill="url(#spendGrad)"
          strokeWidth={2}
        />
        <Area
          type="monotone"
          dataKey="refund"
          name="Refund"
          stroke="#10b981"
          fill="url(#refundGrad)"
          strokeWidth={2}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function DailyBar({ data }: { data: { label: string; value: number }[] }) {
  if (!data.length)
    return (
      <div className="flex h-48 items-center justify-center text-slate-500">
        No daily data
      </div>
    );
  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={data} margin={{ top: 5, right: 5, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
        <XAxis
          dataKey="label"
          tick={{ fill: "#64748b", fontSize: 10 }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tickFormatter={(v) => formatINRShort(v)}
          tick={{ fill: "#64748b", fontSize: 10 }}
          axisLine={false}
          tickLine={false}
          width={40}
        />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="value" name="Spend" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={16} />
      </BarChart>
    </ResponsiveContainer>
  );
}
