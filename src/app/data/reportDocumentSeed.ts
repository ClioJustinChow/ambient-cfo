/**
 * Prototype report document rows + embeddable summary/chart seed data.
 */

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
    return [
      { account: 'Income', amount: '', isHeader: true },
      { account: 'Legal Services Revenue', amount: '$125,000.00', isHeader: false },
      { account: 'Consulting Fees', amount: '$45,500.00', isHeader: false },
      { account: 'Total Income', amount: '$170,500.00', isHeader: true, isTotal: true },
      { account: 'Cost of Goods Sold', amount: '', isHeader: true },
      { account: 'Contractor Expenses', amount: '$15,000.00', isHeader: false },
      { account: 'Software Licenses (Billable)', amount: '$2,500.00', isHeader: false },
      { account: 'Total COGS', amount: '$17,500.00', isHeader: true, isTotal: true },
      { account: 'Gross Profit', amount: '$153,000.00', isHeader: true, isTotal: true },
      { account: 'Operating Expenses', amount: '', isHeader: true },
      { account: 'Rent', amount: '$12,000.00', isHeader: false },
      { payroll: true, account: 'Payroll', amount: '$85,000.00', isHeader: false },
      { account: 'Marketing', amount: '$8,500.00', isHeader: false },
      { account: 'Total Operating Expenses', amount: '$105,500.00', isHeader: true, isTotal: true },
      { account: 'Net Income', amount: '$47,500.00', isHeader: true, isTotal: true, isGrandTotal: true },
    ];
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

export function getReportSummaryContent(reportName: string): {
  kpis: ReportSummaryKpi[];
  insight: string;
} {
  const base = [
    { label: 'Period', value: 'This month' },
    { label: 'Basis', value: 'Accrual' },
  ];
  if (reportName === 'Profit and Loss') {
    return {
      kpis: [
        ...base,
        { label: 'Net income', value: '$47,500' },
        { label: 'Revenue', value: '$170,500' },
        { label: 'OpEx ratio', value: '62%' },
      ],
      insight: 'Net income is ahead of internal plan driven by legal services revenue; watch payroll growth vs collections.',
    };
  }
  if (reportName === 'Balance Sheet') {
    return {
      kpis: [
        ...base,
        { label: 'Total assets', value: '$310,200' },
        { label: 'Current ratio', value: '1.42' },
        { label: 'Equity', value: '$247,800' },
      ],
      insight: 'Liquidity is stable; A/R represents ~21% of current assets.',
    };
  }
  if (reportName.includes('A/R') || reportName.includes('Aging')) {
    return {
      kpis: [
        ...base,
        { label: 'Outstanding', value: '$312k' },
        { label: '90+ days', value: '8%' },
        { label: 'DSO', value: '41 days' },
      ],
      insight: 'Aging is concentrated in two matters; reminders queued for 31–60 bucket.',
    };
  }
  return {
    kpis: [
      ...base,
      { label: 'Key total', value: '$105,000' },
      { label: 'Change vs prior', value: '+6.2%' },
    ],
    insight: `Summary for "${reportName}" — drill into the full report for line-level detail.`,
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
