"use client";

import { useMemo, useState } from "react";
import {
  Wallet,
  TrendingDown,
  RefreshCcw,
  Receipt,
  Search,
  Filter,
  Sparkles,
  IndianRupee,
} from "lucide-react";
import { transactions, type Category, type PaymentMethod } from "@/data/transactions";
import {
  filterTransactions,
  computeStats,
  byCategory,
  byPaymentMethod,
  byMonth,
  byDay,
  getAvailableMonths,
  formatINR,
  formatINRShort,
  topMerchants,
  getMonthLabel,
} from "@/lib/utils";
import { StatCard } from "./StatCard";
import { CategoryPie, PaymentBar, MonthlyTrend, DailyBar } from "./Charts";
import { TransactionTable } from "./TransactionTable";

const CATEGORIES: (Category | "all")[] = [
  "all",
  "Food & Dining",
  "Grocery",
  "Shopping",
  "Fuel",
  "Utilities",
  "Refund",
  "Transfer",
  "Entertainment",
  "Other",
];

const PAYMENTS: (PaymentMethod | "all")[] = [
  "all",
  "UPI",
  "Credit Card",
  "Amazon Pay",
  "Wallet",
  "Other",
];

export function Dashboard() {
  const months = getAvailableMonths();
  const [month, setMonth] = useState<string>(months[0] || "all");
  const [category, setCategory] = useState<Category | "all">("all");
  const [payment, setPayment] = useState<PaymentMethod | "all">("all");
  const [search, setSearch] = useState("");

  const filtered = useMemo(
    () =>
      filterTransactions(transactions, {
        month,
        category,
        paymentMethod: payment,
        search,
      }),
    [month, category, payment, search]
  );

  const stats = useMemo(() => computeStats(filtered), [filtered]);
  const catData = useMemo(() => byCategory(filtered), [filtered]);
  const payData = useMemo(() => byPaymentMethod(filtered), [filtered]);
  const monthData = useMemo(() => byMonth(transactions), []);
  const dayData = useMemo(() => byDay(filtered, month), [filtered, month]);
  const merchants = useMemo(() => topMerchants(filtered), [filtered]);

  const sortedTxs = useMemo(
    () => [...filtered].sort((a, b) => b.date.localeCompare(a.date)),
    [filtered]
  );

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-500 shadow-glow">
              <IndianRupee className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight text-white sm:text-xl">
                Spend<span className="gradient-text">Insight</span>
              </h1>
              <p className="text-xs text-slate-500">Gmail · UPI · Cards · Refunds</p>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-400">
            <Sparkles className="h-3.5 w-3.5" />
            Demo data from your Gmail patterns
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl space-y-6 px-4 py-6 sm:px-6">
        <section className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search merchant, order ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-900 py-2.5 pl-10 pr-4 text-sm text-slate-200 placeholder:text-slate-500 focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/30"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <select
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="rounded-xl border border-slate-700 bg-slate-900 px-3 py-2.5 text-sm text-slate-200 focus:border-emerald-500/50 focus:outline-none"
            >
              <option value="all">All months</option>
              {months.map((m) => (
                <option key={m} value={m}>
                  {getMonthLabel(m + "-01")}
                </option>
              ))}
            </select>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as Category | "all")}
              className="rounded-xl border border-slate-700 bg-slate-900 px-3 py-2.5 text-sm text-slate-200 focus:border-emerald-500/50 focus:outline-none"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c === "all" ? "All categories" : c}
                </option>
              ))}
            </select>
            <select
              value={payment}
              onChange={(e) => setPayment(e.target.value as PaymentMethod | "all")}
              className="rounded-xl border border-slate-700 bg-slate-900 px-3 py-2.5 text-sm text-slate-200 focus:border-emerald-500/50 focus:outline-none"
            >
              {PAYMENTS.map((p) => (
                <option key={p} value={p}>
                  {p === "all" ? "All payment methods" : p}
                </option>
              ))}
            </select>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard title="Total Spend" value={formatINR(stats.totalSpend)} subtitle={`${stats.spendCount} transactions`} icon={TrendingDown} color="red" />
          <StatCard title="Total Refunds" value={formatINR(stats.totalRefund)} subtitle={`${stats.refundCount} refunds`} icon={RefreshCcw} color="green" />
          <StatCard title="Net Spend" value={formatINR(stats.net)} subtitle="Spend − Refunds" icon={Wallet} color="blue" />
          <StatCard title="Avg Transaction" value={formatINR(stats.avgSpend)} subtitle={`${stats.count} total records`} icon={Receipt} color="purple" />
        </section>

        <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5 shadow-card">
            <h2 className="mb-1 text-sm font-semibold text-slate-300">Spend by Category</h2>
            <p className="mb-4 text-xs text-slate-500">Where your money goes</p>
            <CategoryPie data={catData} />
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5 shadow-card">
            <h2 className="mb-1 text-sm font-semibold text-slate-300">Payment Method</h2>
            <p className="mb-4 text-xs text-slate-500">UPI · Credit Card · Amazon Pay & more</p>
            <PaymentBar data={payData} />
          </div>
        </section>

        <section className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5 shadow-card lg:col-span-2">
            <h2 className="mb-1 text-sm font-semibold text-slate-300">Monthly Trend</h2>
            <p className="mb-4 text-xs text-slate-500">Spend vs Refunds over time</p>
            <MonthlyTrend data={monthData} />
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5 shadow-card">
            <h2 className="mb-1 text-sm font-semibold text-slate-300">Top Merchants</h2>
            <p className="mb-4 text-xs text-slate-500">By spend amount</p>
            <ul className="space-y-3">
              {merchants.map((m, i) => (
                <li key={m.name} className="flex items-center gap-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-800 text-xs font-bold text-slate-400">{i + 1}</span>
                  <div className="flex-1 min-w-0">
                    <p className="truncate text-sm font-medium text-slate-200">{m.name}</p>
                    <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-slate-800">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500"
                        style={{ width: `${Math.min(100, (m.value / (merchants[0]?.value || 1)) * 100)}%` }}
                      />
                    </div>
                  </div>
                  <span className="text-sm font-semibold tabular-nums text-slate-300">{formatINRShort(m.value)}</span>
                </li>
              ))}
              {!merchants.length && <p className="text-sm text-slate-500">No merchants</p>}
            </ul>
          </div>
        </section>

        {month !== "all" && (
          <section className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5 shadow-card">
            <h2 className="mb-1 text-sm font-semibold text-slate-300">Daily Spend — {getMonthLabel(month + "-01")}</h2>
            <p className="mb-4 text-xs text-slate-500">Day-wise breakdown</p>
            <DailyBar data={dayData} />
          </section>
        )}

        <section>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-300">
              Transactions
              <span className="ml-2 rounded-full bg-slate-800 px-2 py-0.5 text-xs font-normal text-slate-400">{sortedTxs.length}</span>
            </h2>
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <Filter className="h-3.5 w-3.5" />
              Filtered view
            </div>
          </div>
          <TransactionTable transactions={sortedTxs} />
        </section>

        <footer className="rounded-2xl border border-dashed border-slate-800 bg-slate-900/30 p-5 text-center">
          <p className="text-sm text-slate-400">
            <strong className="text-slate-300">SpendInsight</strong> — Personal finance dashboard inspired by your Gmail transaction emails (Amazon, Zomato, Blinkit, ICICI, HDFC, refunds).
          </p>
          <p className="mt-2 text-xs text-slate-600">
            Live Gmail sync requires Google OAuth setup. This demo uses realistic sample data based on your actual email patterns.
          </p>
        </footer>
      </main>
    </div>
  );
}
