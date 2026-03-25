/**
 * Prototype report document rows + embeddable summary/chart seed data.
 */

import {
  DEFAULT_PROFIT_LOSS_VIEW_STATE,
  deriveProfitLossTotals,
  profitLossRowsToLegacyTable,
} from './profitLossReportModel';
import { goalConnectionForEmbeddedReport, type RichFinancesSummary } from './widgetViewSummaries';

export type ReportTableRow = {
  account: string;
  amount: string;
  isHeader?: boolean;
  isTotal?: boolean;
  isGrandTotal?: boolean;
  payroll?: boolean;
};

export function getReportTableRows(reportName: string): ReportTableRow[] {
  if (reportName === 'Profit and Loss') {
    return profitLossRowsToLegacyTable(DEFAULT_PROFIT_LOSS_VIEW_STATE) as ReportTableRow[];
  }
  if (reportName === 'Balance Sheet') {
    return [
      { account: 'Assets', amount: '', isHeader: true },
      { account: 'Operating Cash', amount: '$245,000.00', isHeader: false },
      { account: 'Accounts Receivable', amount: '$65,200.00', isHeader: false },
      { account: 'Total Current Assets', amount: '$310,200.00', isHeader: true, isTotal: true },
      { account: 'Liabilities', amount: '', isHeader: true },
      { account: 'Accounts Payable', amount: '$12,400.00', isHeader: false },
      { account: 'Short-term Loan', amount: '$50,000.00', isHeader: false },
      { account: 'Total Liabilities', amount: '$62,400.00', isHeader: true, isTotal: true },
      { account: 'Equity', amount: '', isHeader: true },
      { account: "Owner's Equity", amount: '$200,300.00', isHeader: false },
      { account: 'Retained Earnings', amount: '$47,500.00', isHeader: false },
      { account: 'Total Equity', amount: '$247,800.00', isHeader: true, isTotal: true },
      { account: 'Total Liabilities and Equity', amount: '$310,200.00', isHeader: true, isTotal: true, isGrandTotal: true },
    ];
  }
  if (reportName === 'Cash Flow Statement') {
    return [
      { account: 'Operating Activity', amount: '', isHeader: true },
      { account: 'Cash Receipts from Customers', amount: '$165,000.00', isHeader: false },
      { account: 'Cash Paid to Suppliers', amount: '-$45,000.00', isHeader: false },
      { account: 'Net Cash from Operating Activities', amount: '$120,000.00', isHeader: true, isTotal: true },
      { account: 'Investing Activity', amount: '', isHeader: true },
      { account: 'Purchase of Equipment', amount: '-$15,000.00', isHeader: false },
      { account: 'Net Cash from Investing Activities', amount: '-$15,000.00', isHeader: true, isTotal: true },
      { account: 'Net Increase in Cash', amount: '$105,000.00', isHeader: true, isTotal: true, isGrandTotal: true },
    ];
  }
  if (reportName === 'A/R Aging') {
    return [
      { account: 'A/R by bucket', amount: '', isHeader: true },
      { account: 'Current (0–30)', amount: '$128,400.00', isHeader: false },
      { account: '31–60 days', amount: '$62,300.00', isHeader: false },
      { account: '61–90 days', amount: '$38,900.00', isHeader: false },
      { account: '90+ days', amount: '$24,800.00', isHeader: false },
      { account: 'Total outstanding A/R', amount: '$254,400.00', isHeader: true, isTotal: true, isGrandTotal: true },
    ];
  }
  if (reportName === 'A/P Aging') {
    return [
      { account: 'A/P by bucket', amount: '', isHeader: true },
      { account: 'Current (0–30)', amount: '$22,100.00', isHeader: false },
      { account: '31–60 days', amount: '$14,600.00', isHeader: false },
      { account: '61–90 days', amount: '$8,200.00', isHeader: false },
      { account: '90+ days', amount: '$3,400.00', isHeader: false },
      { account: 'Total outstanding A/P', amount: '$48,300.00', isHeader: true, isTotal: true, isGrandTotal: true },
    ];
  }
  if (reportName === 'General Ledger') {
    return [
      { account: 'Recent activity (sample)', amount: '', isHeader: true },
      { account: '1010 · Operating cash — Client receipt', amount: '$12,400.00', isHeader: false },
      { account: '1200 · A/R — Invoice #4482', amount: '$8,900.00', isHeader: false },
      { account: '5200 · Payroll expense', amount: '-$24,000.00', isHeader: false },
      { account: '6100 · Rent expense', amount: '-$18,500.00', isHeader: false },
      { account: 'Period net change (sample)', amount: '-$21,200.00', isHeader: true, isTotal: true, isGrandTotal: true },
    ];
  }
  if (reportName === 'Trial Balance') {
    return [
      { account: 'Assets & debits', amount: '', isHeader: true },
      { account: 'Cash', amount: '$245,000.00', isHeader: false },
      { account: 'Accounts Receivable', amount: '$65,200.00', isHeader: false },
      { account: 'Liabilities & credits', amount: '', isHeader: true },
      { account: 'Accounts Payable', amount: '$12,400.00', isHeader: false },
      { account: 'Equity (net)', amount: '$247,800.00', isHeader: false },
      { account: 'Trial balance check', amount: '$50,000.00', isHeader: true, isTotal: true, isGrandTotal: true },
    ];
  }
  if (reportName === 'Expense by Category') {
    return [
      { account: 'Operating expenses', amount: '', isHeader: true },
      { account: 'Payroll & benefits', amount: '$142,000.00', isHeader: false },
      { account: 'Occupancy & rent', amount: '$28,000.00', isHeader: false },
      { account: 'Technology & software', amount: '$19,400.00', isHeader: false },
      { account: 'Marketing & business development', amount: '$11,200.00', isHeader: false },
      { account: 'Professional fees', amount: '$15,400.00', isHeader: false },
      { account: 'Other G&A', amount: '$9,800.00', isHeader: false },
      { account: 'Total expenses', amount: '$225,800.00', isHeader: true, isTotal: true, isGrandTotal: true },
    ];
  }
  if (reportName === 'Revenue by Practice Area') {
    return [
      { account: 'Fee revenue by practice', amount: '', isHeader: true },
      { account: 'Personal Injury', amount: '$198,400.00', isHeader: false },
      { account: 'Family Law', amount: '$124,200.00', isHeader: false },
      { account: 'Estate Planning', amount: '$96,800.00', isHeader: false },
      { account: 'Corporate / other', amount: '$52,600.00', isHeader: false },
      { account: 'Total fee revenue', amount: '$472,000.00', isHeader: true, isTotal: true, isGrandTotal: true },
    ];
  }
  return [
    { account: 'Operating Activity', amount: '', isHeader: true },
    { account: 'Cash Receipts from Customers', amount: '$165,000.00', isHeader: false },
    { account: 'Cash Paid to Suppliers', amount: '-$45,000.00', isHeader: false },
    { account: 'Net Cash from Operating Activities', amount: '$120,000.00', isHeader: true, isTotal: true },
    { account: 'Investing Activity', amount: '', isHeader: true },
    { account: 'Purchase of Equipment', amount: '-$15,000.00', isHeader: false },
    { account: 'Net Cash from Investing Activities', amount: '-$15,000.00', isHeader: true, isTotal: true },
    { account: 'Net Increase in Cash', amount: '$105,000.00', isHeader: true, isTotal: true, isGrandTotal: true },
  ];
}

export type ReportSummaryKpi = { label: string; value: string };

export function getReportSummaryContent(reportName: string): RichFinancesSummary {
  const base = [
    { label: 'Period', value: 'This month' },
    { label: 'Basis', value: 'Accrual' },
  ];
  if (reportName === 'Profit and Loss') {
    const t = deriveProfitLossTotals(DEFAULT_PROFIT_LOSS_VIEW_STATE);
    const fmtK = (n: number) => {
      const abs = Math.round(Math.abs(n)).toLocaleString('en-US');
      return n < 0 ? `($${abs})` : `$${abs}`;
    };
    const opExRatio =
      t.totalRevenue > 0 ? Math.round((t.totalExpenses / t.totalRevenue) * 100) : 0;
    return {
      headline: `${fmtK(t.netIncome)} net income (prototype)`,
      chartBreakdown:
        'The small area chart in Chart mode is a month-by-month trend of a single P&L-style metric. Full mode is the line-level report table; use filters there for matters and lenses.',
      goalConnection: goalConnectionForEmbeddedReport(reportName),
      plainLanguageInsights: [
        `Revenue is ${fmtK(t.totalRevenue)} and operating expenses ratio to revenue at about ${opExRatio}%.`,
        `Net income of ${fmtK(t.netIncome)} is revenue minus expenses in this default accrual view.`,
        'When numbers move after briefing actions, the embedded chart and these figures update together.',
      ],
      kpis: [
        ...base,
        { label: 'Net income', value: fmtK(t.netIncome) },
        { label: 'Revenue', value: fmtK(t.totalRevenue) },
        { label: 'OpEx ratio', value: `${opExRatio}%` },
      ],
    };
  }
  if (reportName === 'Balance Sheet') {
    return {
      headline: '$310k assets · solid current ratio',
      chartBreakdown:
        'Chart mode shows a compact trend; Full mode lists assets, liabilities, and equity like a classic balance sheet.',
      goalConnection: goalConnectionForEmbeddedReport(reportName),
      plainLanguageInsights: [
        'Current assets include operating cash and receivables; current ratio 1.42 suggests adequate short-term liquidity in the prototype.',
        'Equity of $247,800 closes the sheet—assets equal liabilities plus equity.',
        'Use Full view to walk account groups before partner or lender conversations.',
      ],
      kpis: [
        ...base,
        { label: 'Total assets', value: '$310,200' },
        { label: 'Current ratio', value: '1.42' },
        { label: 'Equity', value: '$247,800' },
      ],
    };
  }
  if (reportName.includes('A/R') || reportName.includes('Aging')) {
    return {
      headline: '$312k outstanding · watch 31–60',
      chartBreakdown:
        'The chart is a simple trend of a receivables metric; Summary lists headline KPIs; Full matches the aging table behind the widget.',
      goalConnection: goalConnectionForEmbeddedReport(reportName),
      plainLanguageInsights: [
        'About 8% of balances are 90+ days—small in percentage but often high absolute dollars at risk.',
        'DSO near 41 days means roughly how long invoices sit open on average in this sample.',
        'Pair with the A/R aging Finances widget for the same buckets in visual form.',
      ],
      kpis: [
        ...base,
        { label: 'Outstanding', value: '$312k' },
        { label: '90+ days', value: '8%' },
        { label: 'DSO', value: '41 days' },
      ],
    };
  }
  return {
    headline: `Summary: ${reportName}`,
    chartBreakdown:
      'Chart mode plots a short synthetic series for this report name. Full mode opens the structured table; figures below are representative totals.',
    goalConnection: goalConnectionForEmbeddedReport(reportName),
    plainLanguageInsights: [
      `This prototype uses "${reportName}" as the label—line detail lives in Full.`,
      'Key total and change vs prior are sample values until connected to live ledger data.',
    ],
    kpis: [
      ...base,
      { label: 'Key total', value: '$105,000' },
      { label: 'Change vs prior', value: '+6.2%' },
    ],
  };
}

export type ReportChartPoint = { name: string; value: number };

/** Small trend series for embedded report chart modes (prototype). */
export function getReportChartSeries(reportName: string): ReportChartPoint[] {
  const seed = reportName.length % 5;
  const base = [42, 48, 45, 52, 58, 55, 61, 64, 62, 68].map((v, i) => ({
    name: `M${i + 1}`,
    value: v + seed * 3 + (i % 3) * 2,
  }));
  if (reportName === 'Profit and Loss') {
    return [
      { name: 'Jul', value: 38 },
      { name: 'Aug', value: 41 },
      { name: 'Sep', value: 45 },
      { name: 'Oct', value: 47 },
      { name: 'Nov', value: 48 },
      { name: 'Dec', value: 47.5 },
    ];
  }
  return base.slice(0, 8);
}
