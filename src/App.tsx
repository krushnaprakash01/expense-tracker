import React, { useState, useEffect, useMemo } from 'react';
import {
  Transaction,
  DateFilterState,
  ExpenseCategory,
  EXPENSE_CATEGORIES,
  CATEGORY_COLORS,
  CategoryBreakdownItem,
  DashboardSummary,
} from './types';
import {
  loadTransactions,
  saveTransactions,
  resetToSampleData,
  clearAllTransactions,
} from './utils/storage';
import { exportToCSV } from './utils/csv';
import { Header } from './components/Header';
import { SummaryCards } from './components/SummaryCards';
import { BudgetAlert } from './components/BudgetAlert';
import { DateFilter } from './components/DateFilter';
import { TransactionFormTabs } from './components/TransactionFormTabs';
import { CategoryBreakdown } from './components/CategoryBreakdown';
import { TransactionList } from './components/TransactionList';

export const App: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>(() => loadTransactions());
  const [selectedCategory, setSelectedCategory] = useState<ExpenseCategory | 'all'>('all');

  // Initialize with All Time to show full rich data
  const [dateFilter, setDateFilter] = useState<DateFilterState>({
    year: 'all',
    month: 'all',
  });

  // Persist to localStorage whenever transactions change
  useEffect(() => {
    saveTransactions(transactions);
  }, [transactions]);

  // Extract all unique years present in transactions + current year
  const availableYears = useMemo(() => {
    const yearsSet = new Set<string>();
    yearsSet.add(String(new Date().getFullYear()));
    transactions.forEach((tx) => {
      if (tx.date) {
        const yr = tx.date.split('-')[0];
        if (yr) yearsSet.add(yr);
      }
    });
    return Array.from(yearsSet).sort((a, b) => b.localeCompare(a));
  }, [transactions]);

  // Filter transactions by selected Month and Year
  const filteredTransactions = useMemo(() => {
    return transactions.filter((tx) => {
      if (!tx.date) return false;
      const [year, month] = tx.date.split('-');

      if (dateFilter.year !== 'all' && year !== dateFilter.year) {
        return false;
      }
      if (dateFilter.month !== 'all' && month !== dateFilter.month) {
        return false;
      }
      return true;
    });
  }, [transactions, dateFilter]);

  // Sort transactions: newest date first; if dates match, sort by createdAt descending
  const sortedTransactions = useMemo(() => {
    return [...filteredTransactions].sort((a, b) => {
      const dateDiff = b.date.localeCompare(a.date);
      if (dateDiff !== 0) return dateDiff;
      return (b.createdAt || 0) - (a.createdAt || 0);
    });
  }, [filteredTransactions]);

  // Calculate dashboard summary for the filtered transactions
  const summary: DashboardSummary = useMemo(() => {
    let totalIncome = 0;
    let totalExpenses = 0;

    filteredTransactions.forEach((tx) => {
      if (tx.type === 'income') {
        totalIncome += tx.amount;
      } else if (tx.type === 'expense') {
        totalExpenses += tx.amount;
      }
    });

    const balance = totalIncome - totalExpenses;
    const expenseRatio = totalIncome > 0 ? (totalExpenses / totalIncome) * 100 : 0;
    const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpenses) / totalIncome) * 100 : 0;

    return {
      totalIncome,
      totalExpenses,
      balance,
      expenseRatio,
      savingsRate,
    };
  }, [filteredTransactions]);

  // Category breakdown calculation (only considers expenses in the active filtered view)
  const categoryBreakdown: CategoryBreakdownItem[] = useMemo(() => {
    const expenseMap = new Map<ExpenseCategory, { total: number; count: number }>();

    EXPENSE_CATEGORIES.forEach((cat) => {
      expenseMap.set(cat, { total: 0, count: 0 });
    });

    filteredTransactions.forEach((tx) => {
      if (tx.type === 'expense' && tx.category) {
        const current = expenseMap.get(tx.category) || { total: 0, count: 0 };
        expenseMap.set(tx.category, {
          total: current.total + tx.amount,
          count: current.count + 1,
        });
      }
    });

    const breakdownItems: CategoryBreakdownItem[] = EXPENSE_CATEGORIES.map((cat) => {
      const data = expenseMap.get(cat) || { total: 0, count: 0 };
      const percentage = summary.totalExpenses > 0
        ? (data.total / summary.totalExpenses) * 100
        : 0;

      return {
        category: cat,
        amount: data.total,
        percentage,
        count: data.count,
        color: CATEGORY_COLORS[cat].barHex,
      };
    });

    // Sort by amount descending
    return breakdownItems.sort((a, b) => b.amount - a.amount);
  }, [filteredTransactions, summary.totalExpenses]);

  // Action handlers
  const handleAddExpense = (expenseData: Omit<Transaction, 'id' | 'createdAt'>) => {
    const newTx: Transaction = {
      ...expenseData,
      id: `tx-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      createdAt: Date.now(),
    };
    setTransactions((prev) => [newTx, ...prev]);
  };

  const handleAddIncome = (incomeData: Omit<Transaction, 'id' | 'createdAt'>) => {
    const newTx: Transaction = {
      ...incomeData,
      id: `tx-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      createdAt: Date.now(),
    };
    setTransactions((prev) => [newTx, ...prev]);
  };

  const handleDeleteTransaction = (id: string) => {
    setTransactions((prev) => prev.filter((tx) => tx.id !== id));
  };

  const handleExportCSV = () => {
    const activeData = filteredTransactions.length > 0 ? sortedTransactions : transactions;
    exportToCSV(activeData, 'expenses');
  };

  const handleResetData = () => {
    const sample = resetToSampleData();
    setTransactions(sample);
    setDateFilter({ year: 'all', month: 'all' });
    setSelectedCategory('all');
  };

  const handleClearData = () => {
    clearAllTransactions();
    setTransactions([]);
    setSelectedCategory('all');
  };

  const incomeCount = filteredTransactions.filter((t) => t.type === 'income').length;
  const expenseCount = filteredTransactions.filter((t) => t.type === 'expense').length;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f2f2f2] flex flex-col selection:bg-[#4ade80] selection:text-[#0a0a0a]">
      {/* Top Navigation & App Bar */}
      <Header
        onExportCSV={handleExportCSV}
        onResetData={handleResetData}
        onClearData={handleClearData}
        transactionCount={transactions.length}
      />

      {/* Main Dashboard Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
        {/* Budget Alert Banner (triggers when expenses > 80% of income) */}
        <BudgetAlert
          totalIncome={summary.totalIncome}
          totalExpenses={summary.totalExpenses}
        />

        {/* Dashboard Financial Summary Cards */}
        <SummaryCards
          summary={summary}
          incomeCount={incomeCount}
          expenseCount={expenseCount}
        />

        {/* Interactive Month/Year Date Filter */}
        <DateFilter
          filter={dateFilter}
          onFilterChange={setDateFilter}
          availableYears={availableYears}
          totalFilteredCount={filteredTransactions.length}
        />

        {/* Two-Column Responsive Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Transaction Input Forms + Category Breakdown */}
          <div className="lg:col-span-5 space-y-6">
            <TransactionFormTabs
              onAddExpense={handleAddExpense}
              onAddIncome={handleAddIncome}
            />

            <CategoryBreakdown
              breakdown={categoryBreakdown}
              totalExpenses={summary.totalExpenses}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
          </div>

          {/* Right Column: Transaction History with Search, Filter & Delete */}
          <div className="lg:col-span-7">
            <TransactionList
              transactions={sortedTransactions}
              onDeleteTransaction={handleDeleteTransaction}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
          </div>
        </div>
      </main>

      {/* Subtle Footer */}
      <footer className="border-t border-[#262626] bg-[#0d0d0d] py-6 mt-12 text-center text-xs text-[#8c8c8c]">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>
            Client-side only • 100% private • Data stored exclusively in browser localStorage
          </p>
          <div className="flex items-center space-x-3 text-[11px]">
            <span className="inline-block w-2 h-2 rounded-full bg-[#4ade80]" />
            <span>Local Storage Active</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
