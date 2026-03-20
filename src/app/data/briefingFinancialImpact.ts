/**
 * Cumulative financial snapshot after users execute "Take Action" / briefing plans.
 * Drives strategic series + widget charts so dashboards reflect applied plans.
 */

import type { BriefingInsightId } from './briefingPanelContent';
import { strategicData, type StrategicMonthRow } from './strategicDashboardSeed';

export type ArAgingBucket = { name: string; value: number; color: string };
export type ExpenseBucket = { name: string; value: number; color: string };

export type BriefingFinancialSnapshot = {
  strategicRows: StrategicMonthRow[];
  runwayTrend: { month: string; runway: number }[];
  cashFlowBars: { month: string; in: number; out: number }[];
  arAging: ArAgingBucket[];
  expenseRep: ExpenseBucket[];
  revenue: {
    pieCurrent: number;
    pieRemaining: number;
    centerPct: number;
    subtitle: string;
    footerAmount: number;
  };
  financialGoals: {
    q3Current: number;
    q3Target: number;
    q3ProgressPct: number;
    reserveCurrent: number;
    reserveTarget: number;
    reserveProgressPct: number;
  };
};

const DEFAULT_AR: ArAgingBucket[] = [
  { name: '0-30 Days', value: 45000, color: '#0069D1' },
  { name: '31-60 Days', value: 25000, color: '#3B82F6' },
  { name: '61-90 Days', value: 10000, color: '#93C5FD' },
  { name: '90+ Days', value: 5000, color: '#EF4444' },
];

const DEFAULT_EXPENSES: ExpenseBucket[] = [
  { name: 'Payroll', value: 45000, color: '#3B82F6' },
  { name: 'Marketing', value: 15000, color: '#10B981' },
  { name: 'Software', value: 8000, color: '#F59E0B' },
  { name: 'Office', value: 4000, color: '#6B7280' },
];

function cloneStrategicRows(): StrategicMonthRow[] {
  return strategicData.map((r) => ({ ...r }));
}

function cloneAr(): ArAgingBucket[] {
  return DEFAULT_AR.map((b) => ({ ...b }));
}

function cloneExpenses(): ExpenseBucket[] {
  return DEFAULT_EXPENSES.map((b) => ({ ...b }));
}

function clampRunway(row: StrategicMonthRow): StrategicMonthRow {
  const runway = Number((row.cash / row.burn).toFixed(1));
  return { ...row, runway: Math.min(30, Math.max(8, runway)) };
}

/** Percent 0–100 with one decimal (e.g. 66.7). */
function pctToward(numer: number, denom: number): number {
  if (denom <= 0) return 0;
  return Math.min(100, Math.round((numer / denom) * 1000) / 10);
}

/** Operating-style in/out bars scaled from cash path + burn (updates when baseline moves). */
export function strategicRowsToCashFlowBars(
  rows: Pick<StrategicMonthRow, 'month' | 'cash' | 'burn'>[],
): { month: string; in: number; out: number }[] {
  return rows.map((row, i) => {
    const prev = rows[i - 1];
    const out = Math.max(85, Math.round(row.burn / 450));
    const netCash = prev ? row.cash - prev.cash : 0;
    const inN = Math.max(95, Math.round(row.burn / 350 + netCash / 8000));
    return { month: row.month, in: inN, out };
  });
}

function applyInsightStrategic(rows: StrategicMonthRow[], id: BriefingInsightId): StrategicMonthRow[] {
  switch (id) {
    case 'insight-1': {
      const bumps = [0, 8000, 16000, 21000, 0, 0, 0, 0, 0, 0];
      return rows.map((row, i) => ({
        ...row,
        cash: row.cash + (bumps[i] ?? 0),
      }));
    }
    case 'insight-2': {
      return rows.map((row, i) => ({
        ...row,
        cash: row.cash + (i === 0 ? 120000 : 0),
      }));
    }
    case 'insight-3': {
      return rows.map((row, i) =>
        i >= 2 ? { ...row, burn: Math.max(38000, row.burn - 1600) } : { ...row },
      );
    }
    default:
      return rows;
  }
}

function applyInsightAr(ar: ArAgingBucket[], id: BriefingInsightId): ArAgingBucket[] {
  const next = ar.map((b) => ({ ...b }));
  const idx = (name: string) => next.find((b) => b.name === name);
  if (id === 'insight-1') {
    const b030 = idx('0-30 Days');
    const b3160 = idx('31-60 Days');
    const b6190 = idx('61-90 Days');
    if (b030 && b3160 && b6190) {
      const move3160 = 12000;
      const move6190 = 8000;
      b3160.value = Math.max(0, b3160.value - move3160);
      b6190.value = Math.max(0, b6190.value - move6190);
      b030.value += move3160 + move6190;
    }
  }
  if (id === 'insight-2') {
    const b030 = idx('0-30 Days');
    if (b030) b030.value += 12000;
  }
  return next;
}

function applyInsightExpenses(exp: ExpenseBucket[], id: BriefingInsightId): ExpenseBucket[] {
  const next = exp.map((b) => ({ ...b }));
  if (id === 'insight-3') {
    const sw = next.find((b) => b.name === 'Software');
    if (sw) sw.value = Math.max(2000, sw.value - 2800);
  }
  return next;
}

/** Build full dashboard snapshot from executed briefing plans (order-preserving, de-duped by caller). */
export function buildBriefingFinancialSnapshot(
  executedInsights: readonly BriefingInsightId[],
): BriefingFinancialSnapshot {
  let rows = cloneStrategicRows();
  let ar = cloneAr();
  let expenses = cloneExpenses();
  let revenue = {
    pieCurrent: 75,
    pieRemaining: 25,
    centerPct: 75,
    subtitle: 'of $1M goal',
    footerAmount: 750000,
  };
  let financialGoals = {
    q3Current: 450000,
    q3Target: 500000,
    q3ProgressPct: 90,
    reserveCurrent: 80000,
    reserveTarget: 120000,
    reserveProgressPct: pctToward(80000, 120000),
  };

  for (const id of executedInsights) {
    rows = applyInsightStrategic(rows, id).map(clampRunway);
    ar = applyInsightAr(ar, id);
    expenses = applyInsightExpenses(expenses, id);

    if (id === 'insight-2') {
      revenue = {
        pieCurrent: 82,
        pieRemaining: 18,
        centerPct: 82,
        subtitle: 'of $1M goal',
        footerAmount: 820000,
      };
      financialGoals = {
        ...financialGoals,
        q3Current: 480000,
      };
    }
    if (id === 'insight-1') {
      financialGoals = {
        ...financialGoals,
        reserveCurrent: Math.min(financialGoals.reserveTarget, financialGoals.reserveCurrent + 12000),
      };
    }
    if (id === 'insight-3') {
      financialGoals = {
        ...financialGoals,
        reserveCurrent: Math.min(financialGoals.reserveTarget, financialGoals.reserveCurrent + 8000),
      };
    }
  }

  financialGoals = {
    ...financialGoals,
    q3ProgressPct: pctToward(financialGoals.q3Current, financialGoals.q3Target),
    reserveProgressPct: pctToward(financialGoals.reserveCurrent, financialGoals.reserveTarget),
  };

  const runwayTrend = rows.map((r) => ({ month: r.month, runway: r.runway }));
  const cashFlowBars = strategicRowsToCashFlowBars(rows);

  return {
    strategicRows: rows,
    runwayTrend,
    cashFlowBars,
    arAging: ar,
    expenseRep: expenses,
    revenue,
    financialGoals,
  };
}
