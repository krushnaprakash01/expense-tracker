# Expense Tracker 💰

A personal finance dashboard built with **React 18 + TypeScript + Vite + Tailwind CSS**.

Track income and expenses, visualize spending by category, filter by date, export CSV reports — all running 100% client-side with localStorage persistence.

## ✨ Features

- **Income & Expense Tracking** — Add transactions with amount, description, date, and category
- **Dashboard Summary Cards** — Total income, total expenses, balance, expense ratio, and savings rate
- **Category Breakdown** — Visual bar chart of spending across 6 categories (Food, Transport, Entertainment, Bills, Shopping, Other)
- **Date Filtering** — Filter transactions by year and month
- **Budget Alerts** — Warning banner when expenses exceed 80% of income
- **CSV Export** — Download filtered transactions as a CSV file
- **Transaction Search & Filter** — Search by description, filter by type or category
- **Sample Data** — Pre-loaded sample transactions for demo purposes
- **Reset / Clear** — Restore sample data or wipe all transactions
- **100% Private** — No server, no analytics — data stays in your browser
- **Responsive Design** — Mobile-friendly two-column layout
- **Dark Theme** — Clean dark UI with green accent colors

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev

# 3. Build for production
npm run build

# 4. Preview production build
npm run preview
```

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **React 18** | UI framework |
| **TypeScript** | Type safety |
| **Vite 5** | Build tool & dev server |
| **Tailwind CSS 3** | Utility-first styling |

## 📂 Folder Structure

```
src/
├── components/
│   ├── BudgetAlert.tsx          # Warning when overspending
│   ├── CategoryBreakdown.tsx    # Category-wise expense bars
│   ├── DateFilter.tsx           # Year/month filter controls
│   ├── ExpenseForm.tsx          # Add expense form
│   ├── Header.tsx               # Top navigation bar
│   ├── Icons.tsx                # SVG icon components
│   ├── IncomeForm.tsx           # Add income form
│   ├── SummaryCards.tsx         # Financial overview cards
│   ├── TransactionFormTabs.tsx  # Tabbed expense/income entry
│   └── TransactionList.tsx      # Transaction history table
├── utils/
│   ├── csv.ts                   # CSV export utility
│   └── storage.ts               # localStorage CRUD + sample data
├── types.ts                     # TypeScript interfaces & constants
├── App.tsx                      # Root component
├── main.tsx                     # Entry point
└── index.css                    # Global styles
```

## 🌐 Deploy to Vercel

```bash
# Option A: Via Vercel CLI
npx vercel

# Option B: Connect your GitHub repo in the Vercel dashboard
# It auto-detects the Vite framework settings from vercel.json
```

## 📝 How It Works

All data is stored in the browser's **localStorage** — no backend server required. Transactions persist across page refreshes. The dashboard dynamically recalculates totals, category breakdowns, and savings rates as you add or remove transactions.

## License

MIT

