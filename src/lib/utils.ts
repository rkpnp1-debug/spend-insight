import { transactions, type Transaction, type Category, type PaymentMethod } from "@/data/transactions";
import { format, parseISO, startOfMonth, endOfMonth, isWithinInterval, subMonths } from "date-fns";

export function formatINR(amount: number): string {
  const abs = Math.abs(amount);
  const formatted = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(abs);
  return amount < 0 ? `+${formatted}` : formatted;
}

export function formatINRShort(amount: number): string {
  const abs = Math.abs(amount);
  if (abs >= 100000) return `₹${(abs / 100000).toFixed(1)}L`;
  if (abs >= 1000) return `₹${(abs / 1000).toFixed(1)}k`;
  return `₹${Math.round(abs)}`;
}

export function getMonthKey(date: string): string {
  return format(parseISO(date), "yyyy-MM");
}

export function getMonthLabel(date: string): string {
  return format(parseISO(date), "MMM yyyy");
}

export function filterTransactions(
  txs: Transaction[],
  opts: {
    month?: string;
    category?: Category | "all";
    paymentMethod?: PaymentMethod | "all";
    search?: string;
  }
): Transaction[] {
  return txs.filter((t) => {
    if (opts.month && opts.month !== "all") {
      if (getMonthKey(t.date) !== opts.month) return false;
    }
    if (opts.category && opts.category !== "all") {
      if (t.category !== opts.category) return false;
    }
    if (opts.paymentMethod && opts.paymentMethod !== "all") {
      if (t.paymentMethod !== opts.paymentMethod) return false;
    }
    if (opts.search) {
      const q = opts.search.toLowerCase();
      if (
        !t.merchant.toLowerCase().includes(q) &&
        !t.source.toLowerCase().includes(q) &&
        !(t.orderId?.toLowerCase().includes(q))
      )
        return false;
    }
    return true;
  });
}

export function computeStats(txs: Transaction[]) {
  const spends = txs.filter((t) => t.amount > 0);
  const refunds = txs.filter((t) => t.amount < 0);
  const totalSpend = spends.reduce((s, t) => s + t.amount, 0);
  const totalRefund = Math.abs(refunds.reduce((s, t) => s + t.amount, 0));
  const net = totalSpend - totalRefund;
  return {
    totalSpend,
    totalRefund,
    net,
    count: txs.length,
    spendCount: spends.length,
    refundCount: refunds.length,
    avgSpend: spends.length ? totalSpend / spends.length : 0,
  };
}

export function byCategory(txs: Transaction[]) {
  const map = new Map<Category, number>();
  txs.filter((t) => t.amount > 0).forEach((t) => {
    map.set(t.category, (map.get(t.category) || 0) + t.amount);
  });
  return Array.from(map.entries())
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);
}

export function byPaymentMethod(txs: Transaction[]) {
  const map = new Map<PaymentMethod, number>();
  txs.filter((t) => t.amount > 0).forEach((t) => {
    map.set(t.paymentMethod, (map.get(t.paymentMethod) || 0) + t.amount);
  });
  return Array.from(map.entries())
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);
}

export function byMonth(txs: Transaction[]) {
  const map = new Map<string, { spend: number; refund: number }>();
  txs.forEach((t) => {
    const key = getMonthKey(t.date);
    const cur = map.get(key) || { spend: 0, refund: 0 };
    if (t.amount > 0) cur.spend += t.amount;
    else cur.refund += Math.abs(t.amount);
    map.set(key, cur);
  });
  return Array.from(map.entries())
    .map(([month, v]) => ({
      month,
      label: format(parseISO(month + "-01"), "MMM yy"),
      spend: Math.round(v.spend),
      refund: Math.round(v.refund),
      net: Math.round(v.spend - v.refund),
    }))
    .sort((a, b) => a.month.localeCompare(b.month));
}

export function byDay(txs: Transaction[], month?: string) {
  const filtered = month && month !== "all"
    ? txs.filter((t) => getMonthKey(t.date) === month)
    : txs;
  const map = new Map<string, number>();
  filtered.filter((t) => t.amount > 0).forEach((t) => {
    map.set(t.date, (map.get(t.date) || 0) + t.amount);
  });
  return Array.from(map.entries())
    .map(([date, value]) => ({
      date,
      label: format(parseISO(date), "dd MMM"),
      value: Math.round(value),
    }))
    .sort((a, b) => a.date.localeCompare(b.date));
}

export function getAvailableMonths(): string[] {
  const set = new Set(transactions.map((t) => getMonthKey(t.date)));
  return Array.from(set).sort().reverse();
}

export function topMerchants(txs: Transaction[], limit = 5) {
  const map = new Map<string, number>();
  txs.filter((t) => t.amount > 0).forEach((t) => {
    const name = t.merchant.split(" - ")[0].split(" ")[0];
    map.set(name, (map.get(name) || 0) + t.amount);
  });
  return Array.from(map.entries())
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, limit);
}
