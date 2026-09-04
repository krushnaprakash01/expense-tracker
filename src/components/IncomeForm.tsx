import React, { useState } from 'react';
import { Transaction } from '../types';
import { getTodayDateString } from '../utils/storage';
import { PlusIcon } from './Icons';

interface IncomeFormProps {
  onAddIncome: (income: Omit<Transaction, 'id' | 'createdAt'>) => void;
}

const COMMON_SOURCES = ['Salary', 'Freelance', 'Investment', 'Bonus', 'Side Gig', 'Gift'];

export const IncomeForm: React.FC<IncomeFormProps> = ({ onAddIncome }) => {
  const [amount, setAmount] = useState<string>('');
  const [source, setSource] = useState<string>('Salary');
  const [customSource, setCustomSource] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [date, setDate] = useState<string>(getTodayDateString());
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      setError('Please enter a valid income amount greater than $0.');
      return;
    }

    const finalSource = source === 'Custom' ? customSource.trim() : source;
    if (!finalSource) {
      setError('Please specify the income source.');
      return;
    }

    if (!date) {
      setError('Please select a valid date.');
      return;
    }

    const finalDesc = description.trim() || `${finalSource} income`;

    onAddIncome({
      type: 'income',
      amount: Math.round(numAmount * 100) / 100,
      source: finalSource,
      description: finalDesc,
      date,
    });

    // Reset
    setAmount('');
    setDescription('');
    setCustomSource('');
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
        <div className="p-3 rounded-xl bg-[#4ade80]/10 border border-[#4ade80]/30 text-[#4ade80] text-xs flex items-center space-x-2">
          <span>✓ Income added successfully!</span>
        </div>
      )}

      {/* Amount & Date in 2 columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#8c8c8c] mb-1.5">
            Amount ($) <span className="text-[#4ade80]">*</span>
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
              className="w-full bg-[#1a1a1a] border border-[#262626] rounded-xl pl-8 pr-3.5 py-2.5 text-sm text-[#f2f2f2] placeholder-[#555] focus:outline-none focus:border-[#4ade80] focus:ring-1 focus:ring-[#4ade80]"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#8c8c8c] mb-1.5">
            Date <span className="text-[#4ade80]">*</span>
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full bg-[#1a1a1a] border border-[#262626] rounded-xl px-3.5 py-2.5 text-sm text-[#f2f2f2] focus:outline-none focus:border-[#4ade80] focus:ring-1 focus:ring-[#4ade80]"
            required
          />
        </div>
      </div>

      {/* Source Quick Selection */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-[#8c8c8c] mb-2">
          Income Source <span className="text-[#4ade80]">*</span>
        </label>
        <div className="flex flex-wrap gap-2 mb-2">
          {COMMON_SOURCES.map((src) => {
            const isSelected = source === src;
            return (
              <button
                type="button"
                key={src}
                onClick={() => setSource(src)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
                  isSelected
                    ? 'bg-[#4ade80]/15 text-[#4ade80] border-[#4ade80]/40'
                    : 'bg-[#1a1a1a] text-[#8c8c8c] border-[#262626] hover:text-[#f2f2f2] hover:bg-[#222]'
                }`}
              >
                {src}
              </button>
            );
          })}
          <button
            type="button"
            onClick={() => setSource('Custom')}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
              source === 'Custom'
                ? 'bg-[#4ade80]/15 text-[#4ade80] border-[#4ade80]/40'
                : 'bg-[#1a1a1a] text-[#8c8c8c] border-[#262626] hover:text-[#f2f2f2] hover:bg-[#222]'
            }`}
          >
            Custom...
          </button>
        </div>

        {source === 'Custom' && (
          <input
            type="text"
            placeholder="Enter custom source (e.g. Dividend, Tax refund)"
            value={customSource}
            onChange={(e) => setCustomSource(e.target.value)}
            className="w-full mt-2 bg-[#1a1a1a] border border-[#262626] rounded-xl px-3.5 py-2 text-sm text-[#f2f2f2] placeholder-[#555] focus:outline-none focus:border-[#4ade80] focus:ring-1 focus:ring-[#4ade80]"
            required
          />
        )}
      </div>

      {/* Description / Memo */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-[#8c8c8c] mb-1.5">
          Description / Note <span className="text-[#8c8c8c] text-[10px] font-normal">(Optional)</span>
        </label>
        <input
          type="text"
          placeholder="e.g. Bi-weekly direct deposit, freelance web design contract"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          maxLength={100}
          className="w-full bg-[#1a1a1a] border border-[#262626] rounded-xl px-3.5 py-2.5 text-sm text-[#f2f2f2] placeholder-[#555] focus:outline-none focus:border-[#4ade80] focus:ring-1 focus:ring-[#4ade80]"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-xl bg-[#4ade80] hover:bg-[#22c55e] text-[#0a0a0a] font-bold text-sm transition-all shadow-md shadow-[#4ade80]/20 active:scale-[0.99]"
      >
        <PlusIcon className="w-4 h-4" />
        <span>Add Income</span>
      </button>
    </form>
  );
};
