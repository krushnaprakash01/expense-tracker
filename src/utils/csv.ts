import { Transaction } from '../types';

/**
 * Escapes a cell value for standard CSV formatting (RFC 4180)
 */
function escapeCSV(val: string | number | undefined | null): string {
  if (val === undefined || val === null) return '""';
  const str = String(val).replace(/"/g, '""');
  return `"${str}"`;
}

/**
 * Generates and downloads a CSV file containing the given transactions
 */
export function exportToCSV(transactions: Transaction[], filenamePrefix = 'expense_report'): void {
  if (!transactions || transactions.length === 0) {
    alert('No transactions to export.');
    return;
  }

  const headers = [
    'Transaction ID',
    'Type',
    'Date',
    'Category / Source',
    'Description',
    'Amount ($)',
  ];

  const rows = transactions.map((t) => {
    const categoryOrSource = t.type === 'expense' ? t.category || 'Other' : t.source || 'General Income';
    return [
      escapeCSV(t.id),
      escapeCSV(t.type.toUpperCase()),
      escapeCSV(t.date),
      escapeCSV(categoryOrSource),
      escapeCSV(t.description),
      escapeCSV(t.amount.toFixed(2)),
    ].join(',');
  });

  const csvContent = [headers.join(','), ...rows].join('\r\n');

  // Prepend UTF-8 BOM so Microsoft Excel properly parses unicode characters
  const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const now = new Date();
  const dateStamp = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  const filename = `${filenamePrefix}_${dateStamp}.csv`;

  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
