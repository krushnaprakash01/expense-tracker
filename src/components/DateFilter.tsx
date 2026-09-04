import React from 'react';
import { DateFilterState } from '../types';
import { CalendarIcon, FilterIcon } from './Icons';

interface DateFilterProps {
  filter: DateFilterState;
  onFilterChange: (newFilter: DateFilterState) => void;
  availableYears: string[];
  totalFilteredCount: number;
}

const MONTHS = [
  { value: '01', label: 'January' },
  { value: '02', label: 'February' },
  { value: '03', label: 'March' },
  { value: '04', label: 'April' },
  { value: '05', label: 'May' },
  { value: '06', label: 'June' },
  { value: '07', label: 'July' },
  { value: '08', label: 'August' },
  { value: '09', label: 'September' },
  { value: '10', label: 'October' },
  { value: '11', label: 'November' },
  { value: '12', label: 'December' },
];

export const DateFilter: React.FC<DateFilterProps> = ({
  filter,
  onFilterChange,
  availableYears,
  totalFilteredCount,
}) => {
  const currentYear = String(new Date().getFullYear());
  const currentMonth = String(new Date().getMonth() + 1).padStart(2, '0');

  const setThisMonth = () => {
    onFilterChange({ year: currentYear, month: currentMonth });
  };

  const setThisYear = () => {
    onFilterChange({ year: currentYear, month: 'all' });
  };

  const setAllTime = () => {
    onFilterChange({ year: 'all', month: 'all' });
  };

  const isAllTime = filter.year === 'all' && filter.month === 'all';
  const isThisMonth = filter.year === currentYear && filter.month === currentMonth;
  const isThisYear = filter.year === currentYear && filter.month === 'all';

  return (
    <div className="bg-[#121212] border border-[#262626] rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
      {/* Header & Quick Filter Pills */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-[#8c8c8c] mr-2">
          <CalendarIcon className="w-4 h-4 text-[#4ade80]" />
          <span>Date Filter</span>
        </div>

        <div className="flex items-center space-x-1.5">
          <button
            onClick={setAllTime}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              isAllTime
                ? 'bg-[#4ade80] text-[#0a0a0a] font-semibold shadow-sm shadow-[#4ade80]/20'
                : 'bg-[#1a1a1a] text-[#8c8c8c] hover:text-[#f2f2f2] hover:bg-[#262626] border border-[#262626]'
            }`}
          >
            All Time
          </button>
          <button
            onClick={setThisMonth}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              isThisMonth
                ? 'bg-[#4ade80] text-[#0a0a0a] font-semibold shadow-sm shadow-[#4ade80]/20'
                : 'bg-[#1a1a1a] text-[#8c8c8c] hover:text-[#f2f2f2] hover:bg-[#262626] border border-[#262626]'
            }`}
          >
            This Month
          </button>
          <button
            onClick={setThisYear}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              isThisYear
                ? 'bg-[#4ade80] text-[#0a0a0a] font-semibold shadow-sm shadow-[#4ade80]/20'
                : 'bg-[#1a1a1a] text-[#8c8c8c] hover:text-[#f2f2f2] hover:bg-[#262626] border border-[#262626]'
            }`}
          >
            This Year
          </button>
        </div>
      </div>

      {/* Dropdown Selectors */}
      <div className="flex items-center gap-2.5 flex-wrap sm:flex-nowrap">
        {/* Year Selector */}
        <div className="flex items-center space-x-1.5 bg-[#1a1a1a] border border-[#262626] rounded-xl px-3 py-1.5 focus-within:border-[#4ade80]">
          <span className="text-xs text-[#8c8c8c]">Year:</span>
          <select
            value={filter.year}
            onChange={(e) => onFilterChange({ ...filter, year: e.target.value })}
            className="bg-transparent text-xs text-[#f2f2f2] font-medium outline-none cursor-pointer pr-1"
          >
            <option value="all" className="bg-[#1a1a1a] text-[#f2f2f2]">
              All Years
            </option>
            {availableYears.map((yr) => (
              <option key={yr} value={yr} className="bg-[#1a1a1a] text-[#f2f2f2]">
                {yr}
              </option>
            ))}
          </select>
        </div>

        {/* Month Selector */}
        <div className="flex items-center space-x-1.5 bg-[#1a1a1a] border border-[#262626] rounded-xl px-3 py-1.5 focus-within:border-[#4ade80]">
          <span className="text-xs text-[#8c8c8c]">Month:</span>
          <select
            value={filter.month}
            onChange={(e) => onFilterChange({ ...filter, month: e.target.value })}
            className="bg-transparent text-xs text-[#f2f2f2] font-medium outline-none cursor-pointer pr-1"
          >
            <option value="all" className="bg-[#1a1a1a] text-[#f2f2f2]">
              All Months
            </option>
            {MONTHS.map((m) => (
              <option key={m.value} value={m.value} className="bg-[#1a1a1a] text-[#f2f2f2]">
                {m.label}
              </option>
            ))}
          </select>
        </div>

        {/* Counter Badge */}
        <div className="flex items-center space-x-1 text-xs text-[#8c8c8c] bg-[#1a1a1a] border border-[#262626] px-3 py-1.5 rounded-xl">
          <FilterIcon className="w-3.5 h-3.5 text-[#4ade80]" />
          <span>{totalFilteredCount} matching</span>
        </div>
      </div>
    </div>
  );
};
