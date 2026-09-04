import React, { useState } from 'react';
import { AlertTriangleIcon, CrossIcon } from './Icons';
import { formatCurrency } from '../utils/storage';

interface BudgetAlertProps {
  totalIncome: number;
  totalExpenses: number;
}

export const BudgetAlert: React.FC<BudgetAlertProps> = ({
  totalIncome,
  totalExpenses,
}) => {
  const [dismissed, setDismissed] = useState(false);

  // If no income recorded or no expenses, calculate accordingly
  if (dismissed) return null;

  const isCritical = totalIncome > 0 && totalExpenses > totalIncome;
  const isWarning = totalIncome > 0 && totalExpenses > totalIncome * 0.8 && totalExpenses <= totalIncome;
  const isNoIncomeWithExpenses = totalIncome === 0 && totalExpenses > 0;

  if (!isCritical && !isWarning && !isNoIncomeWithExpenses) {
    return null;
  }

  const ratio = totalIncome > 0 ? (totalExpenses / totalIncome) * 100 : 100;
  const boundedRatio = Math.min(ratio, 100);

  return (
    <div
      role="alert"
      className={`relative overflow-hidden rounded-2xl border p-4 sm:p-5 transition-all shadow-lg animate-fadeIn ${
        isCritical
          ? 'bg-red-950/30 border-red-500/40 text-red-200 shadow-red-950/40'
          : isWarning
          ? 'bg-amber-950/30 border-amber-500/40 text-amber-200 shadow-amber-950/40'
          : 'bg-zinc-900 border-zinc-700 text-zinc-300'
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start space-x-3.5">
          <div
            className={`p-2.5 rounded-xl mt-0.5 flex-shrink-0 ${
              isCritical
                ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
            }`}
          >
            <AlertTriangleIcon className="w-5 h-5" />
          </div>

          <div className="space-y-1">
            <div className="flex items-center space-x-2 flex-wrap">
              <h3 className="text-sm sm:text-base font-semibold text-[#f2f2f2]">
                {isCritical
                  ? 'Budget Limit Exceeded!'
                  : isWarning
                  ? 'Budget Alert: Expenses Exceed 80% of Income'
                  : 'Unfunded Spending Warning'}
              </h3>
              <span
                className={`text-xs px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                  isCritical
                    ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                    : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                }`}
              >
                {totalIncome > 0 ? `${Math.round(ratio)}% spent` : 'Deficit'}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[#8c8c8c]">
              {isCritical
                ? `You have spent ${formatCurrency(totalExpenses)}, which exceeds your total income of ${formatCurrency(totalIncome)} by ${formatCurrency(totalExpenses - totalIncome)}.`
                : isWarning
                ? `You have spent ${formatCurrency(totalExpenses)} out of ${formatCurrency(totalIncome)} (${Math.round(ratio)}%). Only ${formatCurrency(totalIncome - totalExpenses)} remaining before reaching zero balance.`
                : `You have logged ${formatCurrency(totalExpenses)} in expenses without any registered income for this time period.`}
            </p>

            {/* Visual Progress Bar with 80% Marker */}
            {totalIncome > 0 && (
              <div className="pt-2 space-y-1.5 max-w-xl">
                <div className="w-full h-2.5 bg-[#121212] rounded-full overflow-hidden relative border border-[#262626]">
                  {/* 80% Warning Threshold Marker */}
                  <div
                    className="absolute top-0 bottom-0 w-0.5 bg-amber-400/80 z-10"
                    style={{ left: '80%' }}
                    title="80% Warning Limit"
                  />
                  {/* Spending Progress Fill */}
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      isCritical ? 'bg-red-500' : 'bg-amber-500'
                    }`}
                    style={{ width: `${boundedRatio}%` }}
                  />
                </div>
                <div className="flex justify-between text-[11px] text-[#8c8c8c]">
                  <span>0%</span>
                  <span className="text-amber-400 font-medium">80% Alert Threshold</span>
                  <span>100%</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Dismiss Button */}
        <button
          onClick={() => setDismissed(true)}
          className="text-[#8c8c8c] hover:text-[#f2f2f2] p-1.5 rounded-lg hover:bg-white/5 transition-colors"
          title="Dismiss warning"
          aria-label="Dismiss warning"
        >
          <CrossIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
