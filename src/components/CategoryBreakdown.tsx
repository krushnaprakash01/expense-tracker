import React from 'react';
import { CategoryBreakdownItem, ExpenseCategory } from '../types';
import { formatCurrency } from '../utils/storage';
import { CategoryIcon, TagIcon } from './Icons';

interface CategoryBreakdownProps {
  breakdown: CategoryBreakdownItem[];
  totalExpenses: number;
  onSelectCategory?: (category: ExpenseCategory | 'all') => void;
  selectedCategory?: ExpenseCategory | 'all';
}

export const CategoryBreakdown: React.FC<CategoryBreakdownProps> = ({
  breakdown,
  totalExpenses,
  onSelectCategory,
  selectedCategory = 'all',
}) => {
  const activeItems = breakdown.filter((item) => item.amount > 0);

  return (
    <div className="bg-[#121212] border border-[#262626] rounded-2xl p-5 sm:p-6 shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400">
            <TagIcon className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base font-bold text-[#f2f2f2]">Category Breakdown</h2>
            <p className="text-xs text-[#8c8c8c]">Spending distribution by category</p>
          </div>
        </div>
        <span className="text-xs font-semibold text-rose-400 bg-rose-500/10 border border-rose-500/20 px-2.5 py-1 rounded-lg">
          {formatCurrency(totalExpenses)} Total
        </span>
      </div>

      {activeItems.length === 0 ? (
        <div className="py-8 text-center text-[#8c8c8c]">
          <p className="text-sm font-medium">No expenses logged for this period.</p>
          <p className="text-xs mt-1 text-[#666]">
            Add an expense using the form above to see your breakdown.
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          {/* Multi-segment Combined CSS Progress Bar */}
          <div>
            <div className="w-full h-3 bg-[#1e1e1e] rounded-full overflow-hidden flex shadow-inner">
              {activeItems.map((item) => (
                <div
                  key={item.category}
                  className="h-full transition-all duration-500 hover:opacity-85"
                  style={{
                    width: `${item.percentage}%`,
                    backgroundColor: item.color,
                  }}
                  title={`${item.category}: ${formatCurrency(item.amount)} (${item.percentage.toFixed(1)}%)`}
                />
              ))}
            </div>
            <div className="flex justify-between items-center mt-1.5 text-[11px] text-[#8c8c8c]">
              <span>Cumulative Distribution</span>
              <span>100% of Total Outflow</span>
            </div>
          </div>

          {/* Individual Category CSS Bars */}
          <div className="space-y-3.5 pt-1">
            {breakdown.map((item) => {
              const isSelected = selectedCategory === item.category;

              return (
                <div
                  key={item.category}
                  onClick={() => onSelectCategory && onSelectCategory(isSelected ? 'all' : item.category)}
                  className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#1a1a1a] border-[#4ade80]/50 shadow-sm'
                      : 'bg-[#161616]/60 border-[#262626] hover:bg-[#1a1a1a] hover:border-[#383838]'
                  }`}
                >
                  {/* Category info row */}
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <div className="flex items-center space-x-2">
                      <span
                        className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                        style={{ backgroundColor: item.color }}
                      />
                      <div className="flex items-center space-x-1.5 font-medium text-[#f2f2f2]">
                        <CategoryIcon category={item.category} className="w-3.5 h-3.5 text-[#8c8c8c]" />
                        <span>{item.category}</span>
                      </div>
                      <span className="text-[11px] text-[#8c8c8c]">
                        ({item.count} {item.count === 1 ? 'tx' : 'txs'})
                      </span>
                    </div>

                    <div className="flex items-center space-x-2 text-right">
                      <span className="font-semibold text-[#f2f2f2]">
                        {formatCurrency(item.amount)}
                      </span>
                      <span className="text-[11px] font-medium text-[#8c8c8c] min-w-[40px]">
                        {item.percentage.toFixed(1)}%
                      </span>
                    </div>
                  </div>

                  {/* Individual CSS bar */}
                  <div className="w-full h-2 bg-[#222] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500 ease-out"
                      style={{
                        width: `${Math.min(item.percentage, 100)}%`,
                        backgroundColor: item.color,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
