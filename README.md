# SpendInsight — Personal Finance Dashboard

Beautiful, infographic-rich spending analytics dashboard inspired by Gmail transaction emails (Amazon Pay, Zomato, Blinkit, ICICI/HDFC credit cards, UPI, refunds).

## Features

- **Summary cards** — Total spend, refunds, net, average transaction
- **Filters** — Month, category, payment method, search
- **Charts**
  - Spend by category (donut)
  - Payment method breakdown (UPI / Credit Card / Amazon Pay)
  - Monthly spend vs refund trend
  - Daily spend bar chart
  - Top merchants ranking
- **Transaction table** — Date, merchant, category badges, payment method, amount
- **Dark modern UI** — Glass cards, gradients, responsive

## Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- Recharts
- Lucide icons

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy

Connected to Vercel — pushes to `main` auto-deploy.

## Data source

Demo data is modeled on real Gmail patterns:
- Amazon Pay payments & refunds
- ICICI Credit Card UPI alerts (Blinkit, transfers)
- Zomato / Dominos / Zepto
- Fuel, utilities, shopping

For **live Gmail sync**, add Google OAuth (Gmail API readonly scope) and a server-side parser for bank/e-commerce emails.

## License

MIT
