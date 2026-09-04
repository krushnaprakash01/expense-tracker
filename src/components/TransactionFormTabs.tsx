import React, { useState } from 'react';
import { Transaction } from '../types';
import { ExpenseForm } from './ExpenseForm';
import { IncomeForm } from './IncomeForm';
import { TrendingDownIcon, TrendingUpIcon } from './Icons';

interface TransactionFormTabsProps {
  onAddExpense: (expense: Omit<Transaction, 'id' | 'createdAt'>) => void;
  onAddIncome: (income: Omit<Transaction, 'id' | 'createdAt'>) => void;
}

export const TransactionFormTabs: React.FC<TransactionFormTabsProps> = ({
  onAddExpense,
  onAddIncome,
}) => {
  const [activeTab, setActiveTab] = useState<'expense' | 'income'>('expense');

  return (
    <div className="bg-[#121212] border border-[#262626] rounded-2xl p-5 sm:p-6 shadow-xl">
      {/* Tabs Header */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-base font-bold text-[#f2f2f2] flex items-center space-x-2">
          <span>New Transaction</span>
        </h2>

        {/* Tab Switcher */}
        <div className="flex items-center bg-[#1a1a1a] p-1 rounded-xl border border-[#262626]">
          <button
            type="button"
            onClick={() => setActiveTab('expense')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'expense'
                ? 'bg-rose-500 text-white shadow-sm'
                : 'text-[#8c8c8c] hover:text-[#f2f2f2]'
            }`}
          >
            <TrendingDownIcon className="w-3.5 h-3.5" />
            <span>Expense</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('income')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'income'
                ? 'bg-[#4ade80] text-[#0a0a0a] shadow-sm'
                : 'text-[#8c8c8c] hover:text-[#f2f2f2]'
            }`}
          >
            <TrendingUpIcon className="w-3.5 h-3.5" />
            <span>Income</span>
          </button>
        </div>
      </div>

      {/* Tab Panels */}
      {activeTab === 'expense' ? (
        <ExpenseForm onAddExpense={onAddExpense} />
      ) : (
        <IncomeForm onAddIncome={onAddIncome} />
      )}
    </div>
  );
};
