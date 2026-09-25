"use client";

import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon: LucideIcon;
  trend?: "up" | "down" | "neutral";
  color?: "green" | "red" | "blue" | "purple" | "orange";
}

const colorMap = {
  green: "from-emerald-500/20 to-emerald-500/5 border-emerald-500/30 text-emerald-400",
  red: "from-rose-500/20 to-rose-500/5 border-rose-500/30 text-rose-400",
  blue: "from-blue-500/20 to-blue-500/5 border-blue-500/30 text-blue-400",
  purple: "from-violet-500/20 to-violet-500/5 border-violet-500/30 text-violet-400",
  orange: "from-orange-500/20 to-orange-500/5 border-orange-500/30 text-orange-400",
};

export function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  color = "green",
}: StatCardProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border bg-gradient-to-br p-5 shadow-card animate-slide-up ${colorMap[color]}`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-400">{title}</p>
          <p className="mt-1 text-2xl font-bold tracking-tight text-white sm:text-3xl">
            {value}
          </p>
          {subtitle && (
            <p className="mt-1 text-xs text-slate-500">{subtitle}</p>
          )}
        </div>
        <div className="rounded-xl bg-white/5 p-2.5">
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}
