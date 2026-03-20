import React from 'react';
import type { ReportTableRow } from '../data/reportDocumentSeed';

type ReportDocumentTableProps = {
  rows: ReportTableRow[];
  /** Tighter padding for widget embed */
  compact?: boolean;
};

export function ReportDocumentTable({ rows, compact }: ReportDocumentTableProps) {
  const py = compact ? 'py-1.5' : 'py-2.5';
  const pWrap = compact ? 'p-3' : 'p-8';
  const minH = compact ? 'min-h-0' : 'min-h-[500px]';

  return (
    <div className={`${pWrap} ${minH} overflow-auto max-h-[min(70vh,560px)]`}>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b-2 border-gray-800">
            <th className="text-left font-bold text-gray-900 pb-2">Account</th>
            <th className="text-right font-bold text-gray-900 pb-2 w-40">Total</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => (
            <tr
              key={idx}
              className={`
                ${row.isHeader && !row.isTotal ? 'pt-4 pb-1' : py}
                ${row.isTotal ? 'border-t border-gray-200 font-semibold' : ''}
                ${row.isGrandTotal ? 'border-t-2 border-b-2 border-gray-800 font-bold text-base' : ''}
              `}
            >
              <td
                className={`
                  ${py}
                  ${row.isHeader && !row.isTotal ? 'font-bold text-gray-900 pt-4' : ''}
                  ${!row.isHeader ? 'pl-4 text-gray-600' : ''}
                  ${row.isTotal ? 'text-gray-900' : ''}
                `}
              >
                {row.account}
              </td>
              <td
                className={`
                  text-right ${py}
                  ${!row.isHeader ? 'text-gray-900' : ''}
                  ${row.isTotal ? 'text-gray-900' : ''}
                `}
              >
                {row.amount}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
