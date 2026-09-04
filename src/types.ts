export type TransactionType = 'income' | 'expense';

export type ExpenseCategory =
  | 'Food'
  | 'Transport'
  | 'Entertainment'
  | 'Bills'
  | 'Shopping'
  | 'Other';

export const EXPENSE_CATEGORIES: readonly ExpenseCategory[] = [
  'Food',
  'Transport',
  'Entertainment',
  'Bills',
  'Shopping',
  'Other',
] as const;

export const CATEGORY_COLORS: Record<ExpenseCategory, { bg: string; text: string; hex: string; barHex: string }> = {
  Food: {
    bg: 'bg-amber-500/15',
    text: 'text-amber-400',
    hex: '#f59e0b',
    barHex: '#f59e0b',
  },
  Transport: {
    bg: 'bg-sky-500/15',
    text: 'text-sky-400',
    hex: '#38bdf8',
    barHex: '#38bdf8',
  },
  Entertainment: {
    bg: 'bg-purple-500/15',
    text: 'text-purple-400',
    hex: '#a855f7',
    barHex: '#a855f7',
  },
  Bills: {
    bg: 'bg-rose-500/15',
    text: 'text-rose-400',
    hex: '#f43f5e',
    barHex: '#f43f5e',
  },
  Shopping: {
    bg: 'bg-pink-500/15',
    text: 'text-pink-400',
    hex: '#ec4899',
    barHex: '#ec4899',
  },
  Other: {
    bg: 'bg-slate-400/15',
    text: 'text-slate-300',
    hex: '#94a3b8',
    barHex: '#94a3b8',
  },
};

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  description: string;
  date: string; // Format: YYYY-MM-DD
  category?: ExpenseCategory; // Required if type === 'expense'
  source?: string; // Required if type === 'income'
  createdAt: number;
}

export interface CategoryBreakdownItem {
  category: ExpenseCategory;
  amount: number;
  percentage: number;
  count: number;
  color: string;
}

export interface DateFilterState {
  year: string; // 'all' or '2026', '2025', etc.
  month: string; // 'all' or '01' to '12'
}

export interface FilterState extends DateFilterState {
  searchQuery: string;
  typeFilter: 'all' | 'income' | 'expense';
  categoryFilter: 'all' | ExpenseCategory;
}

export interface DashboardSummary {
  totalIncome: number;
  totalExpenses: number;
  balance: number;
  expenseRatio: number; // percentage of expenses relative to income (0 to 100+)
  savingsRate: number; // percentage of income saved
}
