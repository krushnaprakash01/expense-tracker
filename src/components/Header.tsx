import React from 'react';
import { DownloadIcon, RefreshIcon, TrashIcon, WalletIcon } from './Icons';

interface HeaderProps {
  onExportCSV: () => void;
  onResetData: () => void;
  onClearData: () => void;
  transactionCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  onExportCSV,
  onResetData,
  onClearData,
  transactionCount,
}) => {
  const handleClearWithConfirm = () => {
    if (window.confirm('Are you sure you want to delete all transactions? This action cannot be undone.')) {
      onClearData();
    }
  };

  const handleResetWithConfirm = () => {
    if (window.confirm('Reset transactions to demo data? Current data will be replaced.')) {
      onResetData();
    }
  };

  return (
    <header className="border-b border-[#262626] bg-[#121212]/90 backdrop-blur-md sticky top-0 z-30 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        {/* Brand / Logo */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-[#4ade80]/15 border border-[#4ade80]/30 flex items-center justify-center text-[#4ade80] shadow-sm shadow-[#4ade80]/10">
            <WalletIcon className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-lg sm:text-xl font-bold tracking-tight text-[#f2f2f2]">
                Expense<span className="text-[#4ade80]">Track</span>
              </h1>
              <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-[#4ade80]/10 text-[#4ade80] border border-[#4ade80]/20 tracking-wider">
                Pro
              </span>
            </div>
            <p className="text-xs text-[#8c8c8c] hidden sm:block">
              Client-side financial dashboard & budget tracker
            </p>
          </div>
        </div>

        {/* Global Actions */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          <button
            onClick={handleResetWithConfirm}
            title="Reset to sample demo data"
            className="flex items-center space-x-1.5 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium text-[#8c8c8c] hover:text-[#f2f2f2] hover:bg-[#1e1e1e] border border-[#262626] transition-colors"
          >
            <RefreshIcon className="w-4 h-4" />
            <span className="hidden md:inline">Sample Data</span>
          </button>

          {transactionCount > 0 && (
            <button
              onClick={handleClearWithConfirm}
              title="Clear all transactions"
              className="flex items-center space-x-1.5 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium text-rose-400/80 hover:text-rose-400 hover:bg-rose-500/10 border border-rose-500/20 transition-colors"
            >
              <TrashIcon className="w-4 h-4" />
              <span className="hidden md:inline">Clear All</span>
            </button>
          )}

          <button
            onClick={onExportCSV}
            disabled={transactionCount === 0}
            title={transactionCount === 0 ? 'No transactions to export' : 'Export transactions to CSV'}
            className="flex items-center space-x-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium bg-[#4ade80] hover:bg-[#22c55e] text-[#0a0a0a] transition-all font-semibold shadow-lg shadow-[#4ade80]/20 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-[#4ade80]"
          >
            <DownloadIcon className="w-4 h-4" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>
    </header>
  );
};
