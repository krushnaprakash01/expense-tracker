import { Transaction } from '../types';

const STORAGE_KEY = 'expense_tracker_transactions_v1';

// Initial sample data for demonstration
const SAMPLE_TRANSACTIONS: Transaction[] = [
  {
    id: 'tx-1',
    type: 'income',
    amount: 4500.0,
    source: 'Monthly Salary',
    description: 'Tech Corp Senior Software Engineer Salary',
    date: '2026-09-01',
    createdAt: 1788220800000,
  },
  {
    id: 'tx-2',
    type: 'income',
    amount: 1200.0,
    source: 'Freelance Project',
    description: 'Mobile App Design Contract for Client',
    date: '2026-09-02',
    createdAt: 1788307200000,
  },
  {
    id: 'tx-3',
    type: 'expense',
    amount: 1250.0,
    category: 'Bills',
    description: 'Apartment Monthly Rent & Utilities',
    date: '2026-09-02',
    createdAt: 1788310800000,
  },
  {
    id: 'tx-4',
    type: 'expense',
    amount: 245.8,
    category: 'Food',
    description: 'Weekly Organic Groceries at Whole Foods',
    date: '2026-09-02',
    createdAt: 1788314400000,
  },
  {
    id: 'tx-5',
    type: 'expense',
    amount: 95.0,
    category: 'Transport',
    description: 'Monthly Metro & Bus Transit Card Reload',
    date: '2026-09-01',
    createdAt: 1788224400000,
  },
  {
    id: 'tx-6',
    type: 'expense',
    amount: 180.5,
    category: 'Entertainment',
    description: 'Concert Tickets & Streaming Subscriptions',
    date: '2026-09-03',
    createdAt: 1788393600000,
  },
  {
    id: 'tx-7',
    type: 'expense',
    amount: 320.0,
    category: 'Shopping',
    description: 'Ergonomic Desk Chair for Home Office',
    date: '2026-08-28',
    createdAt: 1787875200000,
  },
  {
    id: 'tx-8',
    type: 'expense',
    amount: 68.25,
    category: 'Food',
    description: 'Casual Dinner with Team Colleagues',
    date: '2026-08-30',
    createdAt: 1788048000000,
  },
  {
    id: 'tx-9',
    type: 'expense',
    amount: 140.0,
    category: 'Other',
    description: 'Annual Health & Fitness Gym Membership',
    date: '2026-08-25',
    createdAt: 1787616000000,
  },
  {
    id: 'tx-10',
    type: 'income',
    amount: 4500.0,
    source: 'Monthly Salary',
    description: 'August Base Salary Payment',
    date: '2026-08-01',
    createdAt: 1785542400000,
  },
  {
    id: 'tx-11',
    type: 'expense',
    amount: 1250.0,
    category: 'Bills',
    description: 'August Rent & High-Speed Internet',
    date: '2026-08-02',
    createdAt: 1785628800000,
  },
];

export function loadTransactions(): Transaction[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      // Seed with initial sample data so user sees a rich dashboard immediately
      saveTransactions(SAMPLE_TRANSACTIONS);
      return SAMPLE_TRANSACTIONS;
    }
    const parsed = JSON.parse(data);
    if (Array.isArray(parsed)) {
      return parsed;
    }
  } catch (error) {
    console.error('Failed to parse transactions from localStorage:', error);
  }
  return SAMPLE_TRANSACTIONS;
}

export function saveTransactions(transactions: Transaction[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
  } catch (error) {
    console.error('Failed to save transactions to localStorage:', error);
  }
}

export function resetToSampleData(): Transaction[] {
  saveTransactions(SAMPLE_TRANSACTIONS);
  return SAMPLE_TRANSACTIONS;
}

export function clearAllTransactions(): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
  } catch (error) {
    console.error('Failed to clear transactions:', error);
  }
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatDisplayDate(dateStr: string): string {
  if (!dateStr) return '';
  try {
    // Parse YYYY-MM-DD safely without timezone shift
    const [year, month, day] = dateStr.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  } catch {
    return dateStr;
  }
}

export function getTodayDateString(): string {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
