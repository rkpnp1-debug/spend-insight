import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SpendInsight — Personal Finance Dashboard",
  description:
    "Beautiful spending analytics from Gmail transaction emails. Track UPI, Credit Card, Amazon Pay, refunds & more.",
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased bg-slate-950 text-slate-100 min-h-screen">
        {children}
      </body>
    </html>
  );
}
