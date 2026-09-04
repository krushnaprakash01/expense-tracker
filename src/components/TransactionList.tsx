import React, { useState } from 'react';
import { Transaction, ExpenseCategory, EXPENSE_CATEGORIES, CATEGORY_COLORS } from '../types';
import { formatCurrency, formatDisplayDate } from '../utils/storage';
import {
  CategoryIcon,
  SearchIcon,
  TrashIcon,
  TrendingDownIcon,
  TrendingUpIcon,
} from './Icons';

interface TransactionListProps {
  transactions: Transaction[];
  onDeleteTransaction: (id: string) => void;
  selectedCategory: ExpenseCategory | 'all';
  onSelectCategory: (category: ExpenseCategory | 'all') => void;
}

export const TransactionList: React.FC<TransactionListProps> = ({
  transactions,
  onDeleteTransaction,
  selectedCategory,
  onSelectCategory,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'income' | 'expense'>('all');

  // Filter transactions
  const filtered = transactions.filter((t) => {
    // Type filter
    if (typeFilter !== 'all' && t.type !== typeFilter) {
      return false;
    }

    // Category filter (for expenses)
    if (selectedCategory !== 'all') {
      if (t.type !== 'expense' || t.category !== selectedCategory) {
        return false;
      }
    }

    // Search query
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      const matchDesc = t.description.toLowerCase().includes(q);
      const matchCat = t.category?.toLowerCase().includes(q);
      const matchSrc = t.source?.toLowerCase().includes(q);
      const matchAmt = t.amount.toString().includes(q);
      const matchDate = t.date.includes(q);
      if (!matchDesc && !matchCat && !matchSrc && !matchAmt && !matchDate) {
        return false;
      }
    }

    return true;
  });

  return (
    <div className="bg-[#121212] border border-[#262626] rounded-2xl p-5 sm:p-6 shadow-xl flex flex-col h-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div>
          <h2 className="text-base font-bold text-[#f2f2f2]">Transaction History</h2>
          <p className="text-xs text-[#8c8c8c]">
            Sorted by newest first • {filtered.length} of {transactions.length} shown
          </p>
        </div>

        {/* Type Toggle Pills */}
        <div className="flex items-center bg-[#1a1a1a] p-1 rounded-xl border border-[#262626] self-start sm:self-auto">
          <button
            onClick={() => setTypeFilter('all')}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
              typeFilter === 'all'
                ? 'bg-[#262626] text-[#f2f2f2] font-semibold'
                : 'text-[#8c8c8c] hover:text-[#f2f2f2]'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setTypeFilter('expense')}
            className={`flex items-center space-x-1 px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
              typeFilter === 'expense'
                ? 'bg-rose-500/20 text-rose-400 font-semibold border border-rose-500/30'
                : 'text-[#8c8c8c] hover:text-[#f2f2f2]'
            }`}
          >
            <TrendingDownIcon className="w-3 h-3" />
            <span>Expenses</span>
          </button>
          <button
            onClick={() => setTypeFilter('income')}
            className={`flex items-center space-x-1 px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
              typeFilter === 'income'
                ? 'bg-[#4ade80]/20 text-[#4ade80] font-semibold border border-[#4ade80]/30'
                : 'text-[#8c8c8c] hover:text-[#f2f2f2]'
            }`}
          >
            <TrendingUpIcon className="w-3 h-3" />
            <span>Income</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
        {/* Search Bar */}
        <div className="relative">
          <SearchIcon className="w-4 h-4 text-[#8c8c8c] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search description, amount, note..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#1a1a1a] border border-[#262626] rounded-xl pl-9 pr-4 py-2 text-xs text-[#f2f2f2] placeholder-[#555] focus:outline-none focus:border-[#4ade80]"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#8c8c8c] hover:text-[#f2f2f2]"
            >
              ✕
            </button>
          )}
        </div>

        {/* Category Filter Dropdown */}
        <div className="flex items-center bg-[#1a1a1a] border border-[#262626] rounded-xl px-3 py-2">
          <span className="text-xs text-[#8c8c8c] mr-2">Category:</span>
          <select
            value={selectedCategory}
            onChange={(e) => onSelectCategory(e.target.value as ExpenseCategory | 'all')}
            className="w-full bg-transparent text-xs text-[#f2f2f2] font-medium outline-none cursor-pointer"
          >
            <option value="all" className="bg-[#1a1a1a] text-[#f2f2f2]">
              All Categories
            </option>
            {EXPENSE_CATEGORIES.map((cat) => (
              <option key={cat} value={cat} className="bg-[#1a1a1a] text-[#f2f2f2]">
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Transactions Scrollable List */}
      <div className="flex-1 overflow-y-auto max-h-[520px] pr-1 space-y-2.5">
        {filtered.length === 0 ? (
          <div className="py-12 text-center text-[#8c8c8c]">
            <p className="text-sm font-medium">No transactions match your filter.</p>
            <p className="text-xs mt-1 text-[#666]">
              Try adjusting the date, type, search term, or add a new record.
            </p>
          </div>
        ) : (
          filtered.map((tx) => {
            const isExpense = tx.type === 'expense';
            const catColors = tx.category ? CATEGORY_COLORS[tx.category] : null;

            return (
              <div
                key={tx.id}
                className="group flex items-center justify-between p-3.5 bg-[#171717] hover:bg-[#1f1f1f] border border-[#262626] hover:border-[#383838] rounded-xl transition-all"
              >
                {/* Left: Icon & Details */}
                <div className="flex items-center space-x-3.5 min-w-0 pr-2">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      isExpense
                        ? catColors
                          ? `${catColors.bg} ${catColors.text} border border-current/30`
                          : 'bg-rose-500/15 text-rose-400'
                        : 'bg-[#4ade80]/15 text-[#4ade80] border border-[#4ade80]/30'
                    }`}
                  >
                    {isExpense && tx.category ? (
                      <CategoryIcon category={tx.category} className="w-4 h-4" />
                    ) : (
                      <TrendingUpIcon className="w-4 h-4" />
                    )}
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center space-x-2">
                      <p className="text-sm font-semibold text-[#f2f2f2] truncate">
                        {tx.description}
                      </p>
                    </div>

                    <div className="flex items-center space-x-2 mt-0.5 text-xs text-[#8c8c8c] flex-wrap">
                      <span>{formatDisplayDate(tx.date)}</span>
                      <span>•</span>
                      <span
                        className={`px-2 py-0.2 rounded font-medium text-[11px] ${
                          isExpense && catColors
                            ? `${catColors.bg} ${catColors.text}`
                            : 'text-[#4ade80] bg-[#4ade80]/10'
                        }`}
                      >
                        {isExpense ? tx.category : tx.source || 'Income'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right: Amount & Delete Button */}
                <div className="flex items-center space-x-3 flex-shrink-0">
                  <span
                    className={`text-sm sm:text-base font-bold tracking-tight ${
                      isExpense ? 'text-rose-400' : 'text-[#4ade80]'
                    }`}
                  >
                    {isExpense ? '-' : '+'}
                    {formatCurrency(tx.amount)}
                  </span>

                  <button
                    onClick={() => {
                      if (window.confirm(`Delete "${tx.description}" ($${tx.amount.toFixed(2)})?`)) {
                        onDeleteTransaction(tx.id);
                      }
                    }}
                    title="Delete transaction"
                    className="p-1.5 rounded-lg text-[#8c8c8c] hover:text-rose-400 hover:bg-rose-500/10 border border-transparent hover:border-rose-500/20 transition-colors"
                  >
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
