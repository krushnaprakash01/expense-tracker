import React from 'react';
import { DashboardSummary } from '../types';
import { formatCurrency } from '../utils/storage';
import { TrendingDownIcon, TrendingUpIcon, WalletIcon } from './Icons';

interface SummaryCardsProps {
  summary: DashboardSummary;
  incomeCount: number;
  expenseCount: number;
}

export const SummaryCards: React.FC<SummaryCardsProps> = ({
  summary,
  incomeCount,
  expenseCount,
}) => {
  const isPositiveBalance = summary.balance >= 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
      {/* Total Income Card */}
      <div className="bg-[#121212] border border-[#262626] rounded-2xl p-5 sm:p-6 relative overflow-hidden transition-all hover:border-[#383838] group">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#8c8c8c]">
            Total Income
          </span>
          <div className="w-9 h-9 rounded-xl bg-[#4ade80]/15 border border-[#4ade80]/30 flex items-center justify-center text-[#4ade80]">
            <TrendingUpIcon className="w-5 h-5" />
          </div>
        </div>
        <div className="mt-4">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#4ade80]">
            {formatCurrency(summary.totalIncome)}
          </h2>
          <div className="mt-2 flex items-center justify-between text-xs text-[#8c8c8c]">
            <span>{incomeCount} {incomeCount === 1 ? 'deposit' : 'deposits'} recorded</span>
            <span className="text-[#4ade80] font-medium bg-[#4ade80]/10 px-2 py-0.5 rounded">
              Cash Inflow
            </span>
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-[#4ade80] to-emerald-600 opacity-60" />
      </div>

      {/* Total Expenses Card */}
      <div className="bg-[#121212] border border-[#262626] rounded-2xl p-5 sm:p-6 relative overflow-hidden transition-all hover:border-[#383838] group">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#8c8c8c]">
            Total Expenses
          </span>
          <div className="w-9 h-9 rounded-xl bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-400">
            <TrendingDownIcon className="w-5 h-5" />
          </div>
        </div>
        <div className="mt-4">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-rose-400">
            {formatCurrency(summary.totalExpenses)}
          </h2>
          <div className="mt-2 flex items-center justify-between text-xs text-[#8c8c8c]">
            <span>{expenseCount} {expenseCount === 1 ? 'transaction' : 'transactions'}</span>
            <span className={`font-medium px-2 py-0.5 rounded ${
              summary.expenseRatio > 80 ? 'text-amber-400 bg-amber-400/10' : 'text-[#8c8c8c] bg-[#1e1e1e]'
            }`}>
              {summary.totalIncome > 0
                ? `${Math.round(summary.expenseRatio)}% of income`
                : 'No income'}
            </span>
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-rose-500 to-red-600 opacity-60" />
      </div>

      {/* Net Balance Card */}
      <div className="bg-[#121212] border border-[#262626] rounded-2xl p-5 sm:p-6 relative overflow-hidden transition-all hover:border-[#383838] group">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#8c8c8c]">
            Net Balance
          </span>
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
            isPositiveBalance
              ? 'bg-[#4ade80]/15 border border-[#4ade80]/30 text-[#4ade80]'
              : 'bg-rose-500/15 border border-rose-500/30 text-rose-400'
          }`}>
            <WalletIcon className="w-5 h-5" />
          </div>
        </div>
        <div className="mt-4">
          <h2 className={`text-2xl sm:text-3xl font-bold tracking-tight ${
            isPositiveBalance ? 'text-[#f2f2f2]' : 'text-rose-400'
          }`}>
            {formatCurrency(summary.balance)}
          </h2>
          <div className="mt-2 flex items-center justify-between text-xs">
            <span className="text-[#8c8c8c]">
              {summary.totalIncome > 0
                ? `${Math.max(0, Math.round(summary.savingsRate))}% savings rate`
                : 'Net balance'}
            </span>
            <span className={`font-medium px-2 py-0.5 rounded ${
              isPositiveBalance
                ? 'text-[#4ade80] bg-[#4ade80]/10'
                : 'text-rose-400 bg-rose-500/10'
            }`}>
              {isPositiveBalance ? 'Positive' : 'Deficit'}
            </span>
          </div>
        </div>
        <div className={`absolute inset-x-0 bottom-0 h-1 ${
          isPositiveBalance
            ? 'bg-gradient-to-r from-[#4ade80] to-teal-500'
            : 'bg-gradient-to-r from-rose-500 to-amber-500'
        } opacity-60`} />
      </div>
    </div>
  );
};
