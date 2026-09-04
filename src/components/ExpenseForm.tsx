import React, { useState } from 'react';
import { ExpenseCategory, EXPENSE_CATEGORIES, CATEGORY_COLORS, Transaction } from '../types';
import { getTodayDateString } from '../utils/storage';
import { CategoryIcon, PlusIcon } from './Icons';

interface ExpenseFormProps {
  onAddExpense: (expense: Omit<Transaction, 'id' | 'createdAt'>) => void;
}

export const ExpenseForm: React.FC<ExpenseFormProps> = ({ onAddExpense }) => {
  const [amount, setAmount] = useState<string>('');
  const [category, setCategory] = useState<ExpenseCategory>('Food');
  const [description, setDescription] = useState<string>('');
  const [date, setDate] = useState<string>(getTodayDateString());
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      setError('Please enter a valid expense amount greater than $0.');
      return;
    }

    if (!description.trim()) {
      setError('Please provide a short description for this expense.');
      return;
    }

    if (!date) {
      setError('Please select a valid date.');
      return;
    }

    onAddExpense({
      type: 'expense',
      amount: Math.round(numAmount * 100) / 100,
      category,
      description: description.trim(),
      date,
    });

    // Reset inputs
    setAmount('');
    setDescription('');
    setDate(getTodayDateString());
    setSuccess(true);
    setTimeout(() => setSuccess(false), 2500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs">
          {error}
        </div>
      )}

      {success && (
        <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center space-x-2">
          <span>✓ Expense added successfully!</span>
        </div>
      )}

      {/* Amount & Date in 2 columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#8c8c8c] mb-1.5">
            Amount ($) <span className="text-rose-400">*</span>
          </label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-[#8c8c8c] font-medium">
              $
            </span>
            <input
              type="number"
              step="0.01"
              min="0.01"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full bg-[#1a1a1a] border border-[#262626] rounded-xl pl-8 pr-3.5 py-2.5 text-sm text-[#f2f2f2] placeholder-[#555] focus:outline-none focus:border-rose-400/80 focus:ring-1 focus:ring-rose-400/80"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#8c8c8c] mb-1.5">
            Date <span className="text-rose-400">*</span>
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full bg-[#1a1a1a] border border-[#262626] rounded-xl px-3.5 py-2.5 text-sm text-[#f2f2f2] focus:outline-none focus:border-rose-400/80 focus:ring-1 focus:ring-rose-400/80"
            required
          />
        </div>
      </div>

      {/* Category Chips Selection */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-[#8c8c8c] mb-2">
          Category <span className="text-rose-400">*</span>
        </label>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
          {EXPENSE_CATEGORIES.map((cat) => {
            const isSelected = category === cat;
            const colors = CATEGORY_COLORS[cat];
            return (
              <button
                type="button"
                key={cat}
                onClick={() => setCategory(cat)}
                className={`flex flex-col items-center justify-center p-2 rounded-xl text-xs font-medium border transition-all ${
                  isSelected
                    ? `${colors.bg} ${colors.text} border-current shadow-sm`
                    : 'bg-[#1a1a1a] text-[#8c8c8c] border-[#262626] hover:bg-[#222] hover:text-[#f2f2f2]'
                }`}
              >
                <CategoryIcon category={cat} className="w-4 h-4 mb-1" />
                <span className="truncate max-w-full">{cat}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-[#8c8c8c] mb-1.5">
          Description <span className="text-rose-400">*</span>
        </label>
        <input
          type="text"
          placeholder="e.g. Whole Foods Groceries, Uber ride, Electric bill"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          maxLength={100}
          className="w-full bg-[#1a1a1a] border border-[#262626] rounded-xl px-3.5 py-2.5 text-sm text-[#f2f2f2] placeholder-[#555] focus:outline-none focus:border-rose-400/80 focus:ring-1 focus:ring-rose-400/80"
          required
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-semibold text-sm transition-all shadow-md shadow-rose-500/20 active:scale-[0.99]"
      >
        <PlusIcon className="w-4 h-4" />
        <span>Add Expense</span>
      </button>
    </form>
  );
};
