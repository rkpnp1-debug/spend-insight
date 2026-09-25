"use client";

import { Transaction, CATEGORY_COLORS, PAYMENT_COLORS } from "@/data/transactions";
import { formatINR } from "@/lib/utils";
import { format, parseISO } from "date-fns";
import { ArrowDownLeft, ArrowUpRight } from "lucide-react";

interface Props {
  transactions: Transaction[];
}

export function TransactionTable({ transactions }: Props) {
  if (!transactions.length) {
    return (
      <div className="flex h-40 items-center justify-center rounded-2xl border border-dashed border-slate-700 text-slate-500">
        No transactions match your filters
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/50">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-900/80 text-xs uppercase tracking-wider text-slate-500">
              <th className="px-4 py-3 font-medium">Date</th>
              <th className="px-4 py-3 font-medium">Merchant</th>
              <th className="px-4 py-3 font-medium">Category</th>
              <th className="px-4 py-3 font-medium">Payment</th>
              <th className="px-4 py-3 font-medium text-right">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/80">
            {transactions.map((t) => {
              const isRefund = t.amount < 0;
              return (
                <tr
                  key={t.id}
                  className="group transition-colors hover:bg-slate-800/40"
                >
                  <td className="whitespace-nowrap px-4 py-3 text-slate-400">
                    {format(parseISO(t.date), "dd MMM yyyy")}
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-medium text-slate-200">{t.merchant}</div>
                    <div className="text-xs text-slate-500">
                      {t.source}
                      {t.orderId ? ` · ${t.orderId}` : ""}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium"
                      style={{
                        backgroundColor: `${CATEGORY_COLORS[t.category]}20`,
                        color: CATEGORY_COLORS[t.category],
                      }}
                    >
                      <span
                        className="h-1.5 w-1.5 rounded-full"
                        style={{ backgroundColor: CATEGORY_COLORS[t.category] }}
                      />
                      {t.category}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className="inline-flex rounded-md px-2 py-0.5 text-xs font-medium"
                      style={{
                        backgroundColor: `${PAYMENT_COLORS[t.paymentMethod]}18`,
                        color: PAYMENT_COLORS[t.paymentMethod],
                      }}
                    >
                      {t.paymentMethod}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div
                      className={`inline-flex items-center gap-1 font-semibold tabular-nums ${
                        isRefund ? "text-emerald-400" : "text-slate-100"
                      }`}
                    >
                      {isRefund ? (
                        <ArrowDownLeft className="h-3.5 w-3.5" />
                      ) : (
                        <ArrowUpRight className="h-3.5 w-3.5 text-slate-500" />
                      )}
                      {formatINR(t.amount)}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
