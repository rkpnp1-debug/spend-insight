export type PaymentMethod = "UPI" | "Credit Card" | "Amazon Pay" | "Wallet" | "Other";
export type Category =
  | "Food & Dining"
  | "Grocery"
  | "Shopping"
  | "Fuel"
  | "Utilities"
  | "Refund"
  | "Transfer"
  | "Entertainment"
  | "Other";

export interface Transaction {
  id: string;
  date: string;
  merchant: string;
  amount: number;
  category: Category;
  paymentMethod: PaymentMethod;
  source: string;
  orderId?: string;
  notes?: string;
}

export const transactions: Transaction[] = [
  { id: "t1", date: "2026-09-24", merchant: "Amazon.in", amount: 242, category: "Shopping", paymentMethod: "Amazon Pay", source: "Amazon Pay", orderId: "171-5469654-7216363" },
  { id: "t2", date: "2026-09-24", merchant: "Zomato - Hope 4 Good Fast Food", amount: 285, category: "Food & Dining", paymentMethod: "UPI", source: "Zomato", orderId: "8638360717" },
  { id: "t3", date: "2026-09-23", merchant: "Amazon.in", amount: 305, category: "Shopping", paymentMethod: "Amazon Pay", source: "Amazon Pay", orderId: "171-2358801-2155523" },
  { id: "t4", date: "2026-09-23", merchant: "Amazon Refund", amount: -110, category: "Refund", paymentMethod: "Amazon Pay", source: "Amazon.in", orderId: "171-5469654-7216363", notes: "Partial refund" },
  { id: "t5", date: "2026-09-23", merchant: "Amazon - Noise Airwave Max 5", amount: -4299, category: "Refund", paymentMethod: "Credit Card", source: "Amazon.in", orderId: "171-1291791-7429904", notes: "Full refund - headphones" },
  { id: "t6", date: "2026-09-23", merchant: "Amazon Pay E-Commerce", amount: 864, category: "Shopping", paymentMethod: "Credit Card", source: "ICICI CC XX7011" },
  { id: "t7", date: "2026-09-22", merchant: "Blinkit", amount: 447, category: "Grocery", paymentMethod: "UPI", source: "ICICI CC XX0005", notes: "UPI via CC" },
  { id: "t8", date: "2026-09-22", merchant: "Shamim J", amount: 300, category: "Transfer", paymentMethod: "UPI", source: "ICICI CC XX0005" },
  { id: "t9", date: "2026-09-22", merchant: "Amrik Su", amount: 590, category: "Transfer", paymentMethod: "UPI", source: "ICICI CC XX0005" },
  { id: "t10", date: "2026-09-20", merchant: "Dominos Pizza", amount: 378.55, category: "Food & Dining", paymentMethod: "Amazon Pay", source: "Amazon Pay" },
  { id: "t11", date: "2026-09-20", merchant: "Sahid", amount: 375, category: "Transfer", paymentMethod: "UPI", source: "ICICI CC XX0005" },
  { id: "t12", date: "2026-09-20", merchant: "Surender", amount: 80, category: "Transfer", paymentMethod: "UPI", source: "ICICI CC XX0005" },
  { id: "t13", date: "2026-09-20", merchant: "Shivam", amount: 60, category: "Transfer", paymentMethod: "UPI", source: "ICICI CC XX0005" },
  { id: "t14", date: "2026-09-20", merchant: "Lakshya", amount: 255, category: "Transfer", paymentMethod: "UPI", source: "ICICI CC XX0005" },
  { id: "t15", date: "2026-09-19", merchant: "Zomato - Belgian Waffle Co.", amount: 420, category: "Food & Dining", paymentMethod: "UPI", source: "Zomato", orderId: "8623116126" },
  { id: "t16", date: "2026-09-19", merchant: "Shiva To", amount: 470, category: "Transfer", paymentMethod: "UPI", source: "ICICI CC XX0005" },
  { id: "t17", date: "2026-09-18", merchant: "Janta Filling Station", amount: 2900.66, category: "Fuel", paymentMethod: "Credit Card", source: "ICICI CC XX7011" },
  { id: "t18", date: "2026-09-17", merchant: "Zepto", amount: 682, category: "Grocery", paymentMethod: "Amazon Pay", source: "Amazon Pay" },
  { id: "t19", date: "2026-09-17", merchant: "Zepto Refund", amount: -599, category: "Refund", paymentMethod: "Amazon Pay", source: "Amazon Pay", notes: "Partial refund" },
  { id: "t20", date: "2026-09-17", merchant: "Amazon Pay Wallet", amount: -266, category: "Refund", paymentMethod: "Wallet", source: "Amazon Pay" },
  { id: "t21", date: "2026-09-17", merchant: "Amazon Refund", amount: -182.07, category: "Refund", paymentMethod: "Amazon Pay", source: "Amazon.in", orderId: "171-2214085-5468345" },
  { id: "t22", date: "2026-09-17", merchant: "Amazon Pay eGift", amount: -333, category: "Refund", paymentMethod: "Amazon Pay", source: "Amazon Pay" },
  { id: "t23", date: "2026-09-17", merchant: "Big Basket", amount: 23.1, category: "Grocery", paymentMethod: "UPI", source: "ICICI CC XX0005" },
  { id: "t24", date: "2026-09-17", merchant: "Innovati", amount: 23.1, category: "Utilities", paymentMethod: "UPI", source: "ICICI CC XX0005" },
  { id: "t25", date: "2026-09-17", merchant: "Jio Prep", amount: 299, category: "Utilities", paymentMethod: "UPI", source: "ICICI CC XX0005" },
  { id: "t26", date: "2026-09-15", merchant: "ICICI CC Payment", amount: -14650.53, category: "Transfer", paymentMethod: "Other", source: "ICICI Bank", notes: "Credit card bill payment" },
  { id: "t27", date: "2026-08-28", merchant: "Swiggy - Biryani Blues", amount: 520, category: "Food & Dining", paymentMethod: "UPI", source: "Swiggy" },
  { id: "t28", date: "2026-08-27", merchant: "Amazon.in - Electronics", amount: 1899, category: "Shopping", paymentMethod: "Credit Card", source: "HDFC CC xx4916" },
  { id: "t29", date: "2026-08-25", merchant: "Blinkit", amount: 612, category: "Grocery", paymentMethod: "UPI", source: "ICICI CC XX0005" },
  { id: "t30", date: "2026-08-24", merchant: "Zomato - McDonald's", amount: 345, category: "Food & Dining", paymentMethod: "Amazon Pay", source: "Amazon Pay" },
  { id: "t31", date: "2026-08-22", merchant: "Indian Oil", amount: 2500, category: "Fuel", paymentMethod: "Credit Card", source: "ICICI CC XX7011" },
  { id: "t32", date: "2026-08-20", merchant: "Amazon.in", amount: 899, category: "Shopping", paymentMethod: "Amazon Pay", source: "Amazon Pay" },
  { id: "t33", date: "2026-08-18", merchant: "Zepto", amount: 455, category: "Grocery", paymentMethod: "UPI", source: "PhonePe" },
  { id: "t34", date: "2026-08-15", merchant: "Netflix", amount: 649, category: "Entertainment", paymentMethod: "Credit Card", source: "HDFC CC xx4916" },
  { id: "t35", date: "2026-08-12", merchant: "Dominos Pizza", amount: 410, category: "Food & Dining", paymentMethod: "UPI", source: "GPay" },
  { id: "t36", date: "2026-08-10", merchant: "Amazon Refund", amount: -450, category: "Refund", paymentMethod: "Amazon Pay", source: "Amazon.in" },
  { id: "t37", date: "2026-08-08", merchant: "BigBasket", amount: 1280, category: "Grocery", paymentMethod: "UPI", source: "ICICI CC XX0005" },
  { id: "t38", date: "2026-08-05", merchant: "Zomato - Pizza Hut", amount: 680, category: "Food & Dining", paymentMethod: "Credit Card", source: "ICICI CC XX7011" },
  { id: "t39", date: "2026-08-03", merchant: "Jio Recharge", amount: 399, category: "Utilities", paymentMethod: "UPI", source: "PhonePe" },
  { id: "t40", date: "2026-08-01", merchant: "Amazon.in - Fashion", amount: 1299, category: "Shopping", paymentMethod: "Amazon Pay", source: "Amazon Pay" },
  { id: "t41", date: "2026-07-28", merchant: "Swiggy Instamart", amount: 780, category: "Grocery", paymentMethod: "UPI", source: "GPay" },
  { id: "t42", date: "2026-07-25", merchant: "Amazon.in", amount: 2499, category: "Shopping", paymentMethod: "Credit Card", source: "HDFC CC xx4916" },
  { id: "t43", date: "2026-07-22", merchant: "Zomato - KFC", amount: 560, category: "Food & Dining", paymentMethod: "UPI", source: "Zomato" },
  { id: "t44", date: "2026-07-20", merchant: "HP Petrol Pump", amount: 3100, category: "Fuel", paymentMethod: "Credit Card", source: "ICICI CC XX7011" },
  { id: "t45", date: "2026-07-18", merchant: "Spotify", amount: 119, category: "Entertainment", paymentMethod: "Credit Card", source: "HDFC CC xx4916" },
  { id: "t46", date: "2026-07-15", merchant: "Blinkit", amount: 390, category: "Grocery", paymentMethod: "UPI", source: "ICICI CC XX0005" },
  { id: "t47", date: "2026-07-12", merchant: "Amazon Refund", amount: -899, category: "Refund", paymentMethod: "Credit Card", source: "Amazon.in" },
  { id: "t48", date: "2026-07-10", merchant: "Zepto", amount: 520, category: "Grocery", paymentMethod: "Amazon Pay", source: "Amazon Pay" },
  { id: "t49", date: "2026-07-08", merchant: "Dominos", amount: 450, category: "Food & Dining", paymentMethod: "UPI", source: "GPay" },
  { id: "t50", date: "2026-07-05", merchant: "Amazon.in - Home", amount: 1599, category: "Shopping", paymentMethod: "Amazon Pay", source: "Amazon Pay" },
  { id: "t51", date: "2026-07-02", merchant: "Electricity Bill", amount: 1850, category: "Utilities", paymentMethod: "UPI", source: "PhonePe" },
];

export const CATEGORY_COLORS: Record<Category, string> = {
  "Food & Dining": "#f97316",
  Grocery: "#22c55e",
  Shopping: "#8b5cf6",
  Fuel: "#ef4444",
  Utilities: "#06b6d4",
  Refund: "#10b981",
  Transfer: "#64748b",
  Entertainment: "#ec4899",
  Other: "#94a3b8",
};

export const PAYMENT_COLORS: Record<PaymentMethod, string> = {
  UPI: "#3b82f6",
  "Credit Card": "#f59e0b",
  "Amazon Pay": "#f97316",
  Wallet: "#10b981",
  Other: "#64748b",
};
