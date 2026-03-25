/**
 * Rich "Summary" display mode for Finances widgets: chart explanation, KPIs, and data-grounded plain language.
 */

import type { BriefingFinancialSnapshot } from './briefingFinancialImpact';
import type { StrategicMonthRow } from './strategicDashboardSeed';
import { FIRM_GOAL_DEFINITIONS } from './firmGoals';
import {
  practiceAreaRevenueVsGoal,
  billingHealthKpis,
  billingHealthSparkline,
  collectionTrendSeries,
  partnerRealizationRows,
} from './dashboardMetricSeed';

/** Unified shape for catalog widgets, embedded reports, and shared Summary panel UI */
export type RichFinancesSummary = {
  headline?: string;
  chartBreakdown: string;
  /** How this visualization ties to declared firm goals (Firm Intelligence lens). */
  goalConnection?: string;
  plainLanguageInsights: string[];
  kpis: { label: string; value: string }[];
};

export type CatalogSummaryContext = {
  briefingSnapshot: BriefingFinancialSnapshot;
  chartData: StrategicMonthRow[];
  lastStrategicRow: StrategicMonthRow | undefined;
  selectedModelId: string | null;
  peerBenchmarkEnabled: boolean;
};

function fmtMoney(n: number): string {
  return `$${n.toLocaleString()}`;
}

function round1(n: number): number {
  return Math.round(n * 10) / 10;
}

function sumAr(briefingSnapshot: BriefingFinancialSnapshot): number {
  return briefingSnapshot.arAging.reduce((s, b) => s + b.value, 0);
}

function largestStreamKey(r: {
  hourly: number;
  flatFee: number;
  referral: number;
  other: number;
}): string {
  const entries: [string, number][] = [
    ['Hourly', r.hourly],
    ['Flat fee', r.flatFee],
    ['Referral', r.referral],
    ['Other', r.other],
  ];
  entries.sort((a, b) => b[1] - a[1]);
  return entries[0] ? `${entries[0][0]} ($${entries[0][1]}k)` : '—';
}

function overlayClause(ctx: CatalogSummaryContext): string {
  const s = Boolean(ctx.selectedModelId);
  const p = ctx.peerBenchmarkEnabled;
  if (s && p) {
    return ' In Chart view you can turn on a scenario preview line and a peer benchmark for comparison.';
  }
  if (s) return ' In Chart view a dashed scenario line appears when a modelling preview is active.';
  if (p) return ' In Chart view a peer composite line appears when peer benchmark is enabled.';
  return '';
}

function runwayLineBreakdown(ctx: CatalogSummaryContext): string {
  return (
    'Each point is months of runway (cash divided by monthly burn) on the horizontal time axis. The solid line is your firm.' +
    overlayClause(ctx)
  );
}

function strategicNumericTrend(
  data: StrategicMonthRow[],
  key: 'runway' | 'cash' | 'burn',
): { first: number; last: number; firstMonth: string; lastMonth: string } | null {
  if (data.length === 0) return null;
  const first = data[0];
  const last = data[data.length - 1];
  const a = first[key];
  const b = last[key];
  if (typeof a !== 'number' || typeof b !== 'number') return null;
  return { first: a, last: b, firstMonth: first.month, lastMonth: last.month };
}

function pctShare(part: number, total: number): number {
  if (total <= 0) return 0;
  return Math.round((part / total) * 1000) / 10;
}

type FirmGoalKey = 'net_revenue_yoy' | 'days_to_collect' | 'operating_reserve';

function firmGoalLine(id: FirmGoalKey): {
  title: string;
  statusPhrase: string;
  current: string;
  target: string;
} {
  const g = FIRM_GOAL_DEFINITIONS.find((x) => x.id === id)!;
  return {
    title: g.title,
    statusPhrase: g.status === 'on_track' ? 'on track' : 'behind your target pace',
    current: g.progressCurrentLabel,
    target: g.progressTargetLabel,
  };
}

/**
 * Plain-language link from a Finances widget to the three declared firm goals (prototype).
 * Used in Summary mode so charts are framed as goal-relevant, not decorative.
 */
export function goalConnectionForWidget(widgetId: string): string {
  const rev = firmGoalLine('net_revenue_yoy');
  const dtc = firmGoalLine('days_to_collect');
  const res = firmGoalLine('operating_reserve');

  switch (widgetId) {
    case 'runway':
    case 'strat_runway':
    case 'fho_runway_detail':
      return `Runway answers how long the firm can operate if inflows pause—directly tied to "${res.title}" (${res.current} vs ${res.target}; ${res.statusPhrase}). When this line weakens, Firm Intelligence should surface reserve and cash actions before other goals slip.`;

    case 'strat_cash':
    case 'cash_flow':
    case 'fho_operating_cash_detail':
      return `Cash timing is the earliest signal for "${res.title}" and the working capital behind "${rev.title}". This chart helps you see whether you are building cushion or drawing it down.`;

    case 'strat_burn':
      return `Burn sets how fast reserves shrink; it is the other half of "${res.title}" alongside cash on hand. Lower sustained burn extends runway and keeps room to pursue "${rev.title}".`;

    case 'ar_aging':
    case 'fho_ar_at_risk_detail':
      return `Aging buckets show where collections are stuck—directly relevant to "${dtc.title}" (${dtc.current} toward ${dtc.target}, ${dtc.statusPhrase}). Clearing older bands moves days-to-collect fastest and protects "${res.title}".`;

    case 'collection_trends':
      return `Collections and DSO are the operational levers behind "${dtc.title}" (${dtc.current} vs ${dtc.target}, ${dtc.statusPhrase}). Improving them pulls cash forward without waiting on new matters.`;

    case 'billing_health':
    case 'fho_unbilled_detail':
      return `Billing cycle health connects time worked to invoices and cash—feeding both "${rev.title}" (${rev.statusPhrase}) and "${dtc.title}". Weak spots here show up later in revenue and receivables.`;

    case 'partner_realization':
      return `Realization shows whether billed rates hold before revenue is recognized—leakage here works against "${rev.title}" and pressures the margin that supports "${res.title}".`;

    case 'practice_areas':
    case 'rev_target':
    case 'revenue_streams_trend':
    case 'fho_revenue_detail':
      return `Revenue mix and plan progress are the engine for "${rev.title}" (${rev.current} vs ${rev.target}, ${rev.statusPhrase}). This chart shows which streams and areas pull you toward or away from that goal.`;

    case 'expense_rep':
    case 'expense_stacked_trend':
      return `Expense load decides how much revenue you can keep after costs—supporting "${res.title}" and making "${rev.title}" achievable without burning the reserve.`;

    case 'profitability_margin':
      return `Operating margin is the scoreboard for revenue minus costs; healthy margin funds "${res.title}" and shows you can grow "${rev.title}" without eroding the cushion.`;

    case 'fho_firm_goals_detail':
      return `These are the same three targets Firm Intelligence uses to filter noise everywhere: "${rev.title}", "${dtc.title}", and "${res.title}".`;

    case 'fho_iolta_trust_detail':
      return `Trust balances are separate from operating reserves; clean trust discipline reduces surprise outflows so leadership can stay focused on "${res.title}" and "${rev.title}".`;

    case 'ambient_cfo':
      return `This Week's Briefing is ranked and worded with your goals in mind—especially "${rev.title}", "${dtc.title}", and "${res.title}"—so the first actions you see are the ones most likely to move declared outcomes.`;

    case 'digital_twin':
      return `Scenario overlays show how choices could bend cash and runway before you commit—so you can see impact on "${res.title}" and "${rev.title}" while stress-testing assumptions.`;

    case 'financial_goals':
      return `The cards here are your source of truth for those three goals; when progress shifts, charts like runway, collections, and revenue should tell one coherent story with Firm Intelligence.`;

    case 'suggested_modelling':
      return `Linking a model to Financial Goals keeps what-if work anchored to "${rev.title}", "${dtc.title}", and "${res.title}" instead of generic hypotheticals.`;

    default:
      return `Firm Intelligence weighs this view against your declared goals—"${rev.title}", "${dtc.title}", and "${res.title}"—so the chart supports partner decisions, not just reporting.`;
  }
}

/** Embedded Finances reports: tie summary to the same three firm goals as catalog widgets. */
export function goalConnectionForEmbeddedReport(reportName: string): string {
  const rev = firmGoalLine('net_revenue_yoy');
  const dtc = firmGoalLine('days_to_collect');
  const res = firmGoalLine('operating_reserve');
  if (reportName === 'Profit and Loss') {
    return `Profit and loss rolls up to "${rev.title}" (${rev.current} vs ${rev.target}, ${rev.statusPhrase}) and to the margin that helps you hold "${res.title}".`;
  }
  if (reportName === 'Balance Sheet') {
    return `Liquidity and equity here anchor "${res.title}" and show how much structural room you have while pursuing "${rev.title}".`;
  }
  if (reportName.includes('A/R') || reportName.includes('Aging')) {
    return `Receivables detail supports "${dtc.title}" (${dtc.current} toward ${dtc.target}, ${dtc.statusPhrase}) and faster cash toward "${res.title}".`;
  }
  return `This report feeds Firm Intelligence alongside "${rev.title}", "${dtc.title}", and "${res.title}" so narrative and numbers stay goal-aligned.`;
}

function getCatalogWidgetSummaryInner(
  widgetId: string,
  ctx: CatalogSummaryContext,
): RichFinancesSummary | null {
  const { briefingSnapshot, chartData, lastStrategicRow: last } = ctx;
  const month = last?.month ?? '—';

  switch (widgetId) {
    case 'runway':
    case 'strat_runway': {
      const r = last?.runway ?? 0;
      const trend = strategicNumericTrend(chartData, 'runway');
      const insights: string[] = [];
      if (trend) {
        const dir = trend.last > trend.first ? 'risen' : trend.last < trend.first ? 'fallen' : 'stayed level';
        insights.push(
          `From ${trend.firstMonth} to ${trend.lastMonth}, runway has ${dir}: about ${round1(trend.first)} months → ${round1(trend.last)} months.`,
        );
      }
      insights.push(
        `Right now the model implies about ${r} month${r === 1 ? '' : 's'} of runway, with roughly ${last != null ? fmtMoney(last.cash) : '—'} in operating cash.`,
      );
      if (last != null) {
        insights.push(`Monthly burn in the latest month is about ${fmtMoney(last.burn)}—runway moves when cash or burn moves.`);
      }
      return {
        headline: `About ${r} months of runway at the latest month`,
        chartBreakdown: runwayLineBreakdown(ctx),
        plainLanguageInsights: insights.slice(0, 4),
        kpis: [
          { label: 'Latest month', value: month },
          { label: 'Runway (months)', value: `${r}` },
          { label: 'Cash (model)', value: last != null ? fmtMoney(last.cash) : '—' },
          { label: 'Burn (month)', value: last != null ? fmtMoney(last.burn) : '—' },
        ],
      };
    }
    case 'cash_flow': {
      const bars = briefingSnapshot.cashFlowBars;
      const b = bars[bars.length - 1];
      const prev = bars.length >= 2 ? bars[bars.length - 2] : null;
      const insights: string[] = [];
      if (b && prev) {
        insights.push(
          `Latest month (${b.month}): cash-in index ${b.in} vs cash-out index ${b.out}. Prior month was in ${prev.in} / out ${prev.out}.`,
        );
      } else if (b) {
        insights.push(`Latest month (${b.month}): cash-in index ${b.in}, cash-out index ${b.out}.`);
      }
      insights.push(
        'These indices are scaled from your strategic cash and burn so you can see timing of inflows vs outflows in the prototype.',
      );
      if (ctx.selectedModelId || ctx.peerBenchmarkEnabled) {
        insights.push(
          'When overlays are on, extra lines in Chart view compare your cash path to a scenario or peer composite.',
        );
      }
      return {
        headline: b ? `${b.month}: cash movement snapshot` : 'Cash in vs cash out',
        chartBreakdown:
          'Bars show prototype cash-in and cash-out indices by month (from strategic cash and burn). Lines for firm cash, scenario, or peer may appear when those modes are on.' +
          overlayClause(ctx),
        plainLanguageInsights: insights.slice(0, 4),
        kpis: [
          { label: 'Latest month', value: b?.month ?? month },
          { label: 'Cash in (index)', value: b != null ? String(b.in) : '—' },
          { label: 'Cash out (index)', value: b != null ? String(b.out) : '—' },
        ],
      };
    }
    case 'ar_aging': {
      const total = sumAr(briefingSnapshot);
      const sorted = [...briefingSnapshot.arAging].sort((a, b) => b.value - a.value);
      const top = sorted[0];
      const risky = briefingSnapshot.arAging.filter((x) => x.name.includes('61') || x.name.includes('90'));
      const riskySum = risky.reduce((s, x) => s + x.value, 0);
      const riskyPct = pctShare(riskySum, total);
      const insights: string[] = [
        `Total outstanding A/R is ${fmtMoney(total)} across all aging buckets.`,
        top
          ? `The largest single bucket is ${top.name} at ${fmtMoney(top.value)} (${pctShare(top.value, total)}% of total).`
          : 'Review each slice to see where collections work is concentrated.',
      ];
      insights.push(
        riskySum > 0
          ? `About ${riskyPct}% of total A/R (${fmtMoney(riskySum)}) sits in 61+ day buckets—usually the first place to focus reminders and partner review.`
          : 'Most balances are in current buckets; still watch any upward drift in older bands over time.',
      );
      return {
        headline: `${fmtMoney(total)} outstanding A/R`,
        chartBreakdown:
          'The donut shows share of total receivables in each aging bucket (e.g. 0–30, 31–60, 61–90, 90+). Larger slices in older buckets mean more collection risk.',
        plainLanguageInsights: insights.slice(0, 4),
        kpis: [
          { label: 'Total A/R', value: fmtMoney(total) },
          { label: 'Largest bucket', value: top?.name ?? '—' },
          { label: 'That bucket', value: top != null ? fmtMoney(top.value) : '—' },
        ],
      };
    }
    case 'expense_rep': {
      const top = [...briefingSnapshot.expenseRep].sort((a, b) => b.value - a.value)[0];
      const total = briefingSnapshot.expenseRep.reduce((s, e) => s + e.value, 0);
      const insights: string[] = [
        `Expense categories add up to ${fmtMoney(total)} in this prototype mix.`,
        top
          ? `${top.name} is the biggest line at ${fmtMoney(top.value)} (${pctShare(top.value, total)}% of the total).`
          : 'Use the slices to see which cost categories dominate.',
      ];
      insights.push('When you execute cost-related briefing plans, this mix can shift to reflect the new baseline.');
      return {
        headline: top ? `${top.name} leads spend` : 'Expense mix',
        chartBreakdown:
          'The pie shows how total operating expenses split across categories (payroll, marketing, software, office, etc.).',
        plainLanguageInsights: insights.slice(0, 4),
        kpis: [
          { label: 'Expense mix total', value: fmtMoney(total) },
          { label: 'Top category', value: top?.name ?? '—' },
          { label: 'Top amount', value: top != null ? fmtMoney(top.value) : '—' },
        ],
      };
    }
    case 'rev_target': {
      const { centerPct, footerAmount, subtitle } = briefingSnapshot.revenue;
      const insights: string[] = [
        `You are about ${centerPct}% of the way through the ${subtitle || 'quarter revenue plan'} in this prototype.`,
        `Recognized revenue shown here is ${fmtMoney(footerAmount)} toward that plan.`,
        'The arc compares “current” progress to what is left to close in the period.',
      ];
      return {
        headline: `${centerPct}% of quarterly revenue plan`,
        chartBreakdown:
          'The semicircle gauge compares booked revenue so far to the remaining plan amount. Footer shows dollar progress for the current quarter.',
        plainLanguageInsights: insights.slice(0, 4),
        kpis: [
          { label: 'Progress', value: `${centerPct}%` },
          { label: 'Current Q3 rev', value: fmtMoney(footerAmount) },
          { label: 'Lens', value: subtitle || 'Quarter plan' },
        ],
      };
    }
    case 'strat_cash': {
      const cashTrend = strategicNumericTrend(chartData, 'cash');
      const insights: string[] = [];
      if (cashTrend) {
        const dir =
          cashTrend.last > cashTrend.first ? 'up' : cashTrend.last < cashTrend.first ? 'down' : 'flat';
        insights.push(
          `Operating cash moved ${dir} from ${fmtMoney(cashTrend.first)} (${cashTrend.firstMonth}) to ${fmtMoney(cashTrend.last)} (${cashTrend.lastMonth}).`,
        );
      }
      if (last) {
        insights.push(`Latest month shows about ${fmtMoney(last.cash)} on the books with burn around ${fmtMoney(last.burn)}.`);
      }
      insights.push(
        'The filled area is your firm; dashed or dotted lines are scenario preview or peer composite when those toggles are on.',
      );
      return {
        headline: last ? `${fmtMoney(last.cash)} operating cash (${month})` : 'Operating cash trend',
        chartBreakdown:
          'The area chart plots operating cash by month. Scenario and peer series, when on, overlay on the same timeline so you can stress-test the path.',
        plainLanguageInsights: insights.slice(0, 4),
        kpis: [
          { label: 'Latest month', value: month },
          { label: 'Operating cash', value: last != null ? fmtMoney(last.cash) : '—' },
          { label: 'Burn (month)', value: last != null ? fmtMoney(last.burn) : '—' },
        ],
      };
    }
    case 'strat_burn': {
      const burnTrend = strategicNumericTrend(chartData, 'burn');
      const insights: string[] = [];
      if (burnTrend) {
        const dir =
          burnTrend.last > burnTrend.first ? 'higher' : burnTrend.last < burnTrend.first ? 'lower' : 'unchanged';
        insights.push(
          `Monthly burn is ${dir} at the end of the window: about ${fmtMoney(burnTrend.first)} (${burnTrend.firstMonth}) vs ${fmtMoney(burnTrend.last)} (${burnTrend.lastMonth}).`,
        );
      }
      if (last) {
        insights.push(`That level of burn implies about ${last.runway} months of runway alongside current cash.`);
      }
      insights.push('Side-by-side bars let you compare your firm to an optional scenario and peer composite.');
      return {
        headline: last ? `${fmtMoney(last.burn)} monthly burn` : 'Burn by month',
        chartBreakdown:
          'Each month shows total operating burn as a bar. Additional bars appear for scenario and peer when those comparisons are toggled on.',
        plainLanguageInsights: insights.slice(0, 4),
        kpis: [
          { label: 'Latest month', value: month },
          { label: 'Monthly burn', value: last != null ? fmtMoney(last.burn) : '—' },
          { label: 'Runway (mo)', value: last != null ? String(last.runway) : '—' },
        ],
      };
    }
    case 'practice_areas': {
      const top = [...practiceAreaRevenueVsGoal].sort((a, b) => b.revenue - a.revenue)[0];
      const total = practiceAreaRevenueVsGoal.reduce((s, p) => s + p.revenue, 0);
      const insights: string[] = [
        `Recognized revenue across areas totals about $${total}k in this prototype.`,
        top
          ? `${top.area} brings in the most at $${top.revenue}k—that is ${pctShare(top.revenue, total)}% of the total shown.`
          : 'Compare bar heights to see concentration.',
      ];
      insights.push(
        'The second bar series is a goal-mix index (scaled) so you can see revenue weight vs planned practice mix.',
      );
      return {
        headline: top ? `${top.area} leads revenue` : 'Revenue by practice',
        chartBreakdown:
          'Bars show recognized revenue in $k by practice area; the paired bars encode how each area compares to firm goal mix.',
        plainLanguageInsights: insights.slice(0, 4),
        kpis: [
          { label: 'Practice areas', value: String(practiceAreaRevenueVsGoal.length) },
          { label: 'Total revenue ($k)', value: String(total) },
          { label: 'Largest', value: top ? `${top.area} ($${top.revenue}k)` : '—' },
        ],
      };
    }
    case 'billing_health': {
      const first = billingHealthSparkline[0];
      const lastBh = billingHealthSparkline[billingHealthSparkline.length - 1];
      const insights: string[] = [
        `Draft WIP is ${billingHealthKpis.draftWip}, billed vs goal is ${billingHealthKpis.billedVsGoal}, and realization is ${billingHealthKpis.realizationProxy}.`,
      ];
      if (first && lastBh) {
        insights.push(
          `The health index moved from ${first.v} (${first.m}) to ${lastBh.v} (${lastBh.m}) over the sparkline window.`,
        );
      }
      insights.push('Together, these signals flag whether time is turning into billed work and collected cash efficiently.');
      return {
        headline: `${billingHealthKpis.billedVsGoal} billed vs goal`,
        chartBreakdown:
          'Three headline KPIs sit above a sparkline “health index” (prototype scale). Higher index generally means tighter billing cycle performance.',
        plainLanguageInsights: insights.slice(0, 4),
        kpis: [
          { label: 'Draft WIP', value: billingHealthKpis.draftWip },
          { label: 'Billed / goal', value: billingHealthKpis.billedVsGoal },
          { label: 'Realization', value: billingHealthKpis.realizationProxy },
        ],
      };
    }
    case 'collection_trends': {
      const lastCt = collectionTrendSeries[collectionTrendSeries.length - 1];
      const prev = collectionTrendSeries.length >= 2 ? collectionTrendSeries[collectionTrendSeries.length - 2] : null;
      const insights: string[] = [];
      if (lastCt && prev) {
        const collDelta = lastCt.collections - prev.collections;
        const dsoDelta = lastCt.dso - prev.dso;
        insights.push(
          `Collections went from $${prev.collections}k to $${lastCt.collections}k month over month (${collDelta >= 0 ? '+' : ''}${collDelta}k).`,
        );
        insights.push(
          `DSO ${dsoDelta <= 0 ? 'improved' : 'lengthened'} from ${prev.dso} to ${lastCt.dso} days (${dsoDelta >= 0 ? '+' : ''}${dsoDelta} days).`,
        );
      } else if (lastCt) {
        insights.push(`Latest month: $${lastCt.collections}k collected, DSO ${lastCt.dso} days.`);
      }
      insights.push('Lower DSO usually means faster payment; pair with A/R aging for who owes.');
      return {
        headline: lastCt ? `$${lastCt.collections}k collected · DSO ${lastCt.dso}d` : 'Collections trend',
        chartBreakdown:
          'One line is collections ($k); the other is days sales outstanding (DSO) on the right axis—both over recent months.',
        plainLanguageInsights: insights.slice(0, 4),
        kpis: [
          { label: 'Latest month', value: lastCt?.month ?? '—' },
          { label: 'Collections ($k)', value: lastCt != null ? String(lastCt.collections) : '—' },
          { label: 'DSO (days)', value: lastCt != null ? String(lastCt.dso) : '—' },
        ],
      };
    }
    case 'partner_realization': {
      const avg =
        partnerRealizationRows.length > 0
          ? Math.round(
              partnerRealizationRows.reduce((s, r) => s + r.realization, 0) / partnerRealizationRows.length,
            )
          : 0;
      const best = [...partnerRealizationRows].sort((a, b) => b.realization - a.realization)[0];
      const below = partnerRealizationRows.filter((r) => r.realization < r.target);
      const insights: string[] = [
        `Average realization across partners is ${avg}%.`,
        best
          ? `${best.partner} is highest at ${best.realization}% vs a ${best.target}% target.`
          : 'Compare each bar to the internal target line.',
      ];
      if (below.length > 0) {
        insights.push(
          `${below.length} partner${below.length === 1 ? '' : 's'} sit${below.length === 1 ? 's' : ''} below target—good candidates for write-down or rate conversations.`,
        );
      }
      return {
        headline: `${avg}% average realization`,
        chartBreakdown:
          'Horizontal bars show each partner’s realization % vs a gray target bar—wider gap means more leakage vs standard.',
        plainLanguageInsights: insights.slice(0, 4),
        kpis: [
          { label: 'Partners', value: String(partnerRealizationRows.length) },
          { label: 'Avg realization', value: `${avg}%` },
          { label: 'Top partner', value: best ? `${best.partner} (${best.realization}%)` : '—' },
        ],
      };
    }
    case 'revenue_streams_trend': {
      const rows = briefingSnapshot.revenueStreamsTrend;
      const r = rows[rows.length - 1];
      const prev = rows.length >= 2 ? rows[rows.length - 2] : null;
      const total = r != null ? r.hourly + r.flatFee + r.referral + r.other : 0;
      const insights: string[] = [];
      if (r) {
        insights.push(
          `Latest month (${r.month}) gross revenue is about ${round1(total)}k; largest stream is ${largestStreamKey(r)}.`,
        );
      }
      if (prev && r) {
        const prevT = prev.hourly + prev.flatFee + prev.referral + prev.other;
        const delta = round1(total - prevT);
        insights.push(`Versus ${prev.month}, total gross moved by ${delta >= 0 ? '+' : ''}${delta}k.`);
      }
      insights.push('Stacked areas add hourly, flat fee, referral, and other so you see mix shift, not just totals.');
      return {
        headline: r ? `${round1(total)}k gross (${r.month})` : 'Revenue streams',
        chartBreakdown:
          'Each month’s column stacks revenue streams ($k): hourly, flat fee, referral/co-counsel, and other. Height is total gross.',
        plainLanguageInsights: insights.slice(0, 4),
        kpis: [
          { label: 'Latest month', value: r?.month ?? '—' },
          { label: 'Total gross ($k)', value: total > 0 ? String(round1(total)) : '—' },
          { label: 'Largest stream', value: r != null ? largestStreamKey(r) : '—' },
        ],
      };
    }
    case 'expense_stacked_trend': {
      const rows = briefingSnapshot.expenseStackedTrend;
      const r = rows[rows.length - 1];
      const prev = rows.length >= 2 ? rows[rows.length - 2] : null;
      const total = r != null ? r.Payroll + r.Marketing + r.Software + r.Office : 0;
      const insights: string[] = [];
      if (r) {
        insights.push(
          `Latest month (${r.month}) total operating expenses are about ${round1(total)}k; payroll alone is ${r.Payroll}k (${pctShare(r.Payroll, total)}%).`,
        );
      }
      if (prev && r) {
        const prevT = prev.Payroll + prev.Marketing + prev.Software + prev.Office;
        insights.push(`Total OpEx changed by ${round1(total - prevT) >= 0 ? '+' : ''}${round1(total - prevT)}k vs ${prev.month}.`);
      }
      insights.push('Watch payroll height vs other categories—usually the biggest lever on margin.');
      return {
        headline: r ? `${round1(total)}k OpEx (${r.month})` : 'Expenses over time',
        chartBreakdown:
          'Stacked bars show monthly operating expense ($k) by category: payroll, marketing, software, and office.',
        plainLanguageInsights: insights.slice(0, 4),
        kpis: [
          { label: 'Latest month', value: r?.month ?? '—' },
          { label: 'Total OpEx ($k)', value: total > 0 ? String(round1(total)) : '—' },
          { label: 'Payroll ($k)', value: r != null ? String(r.Payroll) : '—' },
        ],
      };
    }
    case 'profitability_margin': {
      const pl = briefingSnapshot.profitabilityMarginTrend;
      const lastPl = pl[pl.length - 1];
      const prevPl = pl.length >= 2 ? pl[pl.length - 2] : null;
      const avgMargin =
        pl.length > 0 ? Math.round((pl.reduce((s, x) => s + x.operatingMarginPct, 0) / pl.length) * 10) / 10 : 0;
      const insights: string[] = [];
      if (lastPl) {
        insights.push(
          `Latest month (${lastPl.month}): revenue ${lastPl.revenue}k, OpEx ${lastPl.expenses}k, operating margin ${lastPl.operatingMarginPct}%.`,
        );
      }
      if (lastPl && prevPl) {
        const d = round1(lastPl.operatingMarginPct - prevPl.operatingMarginPct);
        insights.push(`Operating margin ${d >= 0 ? 'widened' : 'narrowed'} by ${Math.abs(d)} points vs ${prevPl.month}.`);
      }
      insights.push(`Average margin across the whole window is about ${avgMargin}%.`);
      return {
        headline: lastPl ? `${lastPl.operatingMarginPct}% operating margin` : 'Margin trend',
        chartBreakdown:
          'Bars are revenue and operating expenses ($k); the line is operating margin %. Margin rises when revenue grows faster than costs.',
        plainLanguageInsights: insights.slice(0, 4),
        kpis: [
          { label: 'Latest month', value: lastPl?.month ?? '—' },
          { label: 'Operating margin', value: lastPl != null ? `${lastPl.operatingMarginPct}%` : '—' },
          { label: 'Avg margin (window)', value: `${avgMargin}%` },
        ],
      };
    }
    case 'fho_firm_goals_detail': {
      const onTrack = FIRM_GOAL_DEFINITIONS.filter((g) => g.status === 'on_track').length;
      return {
        headline: `${onTrack} of ${FIRM_GOAL_DEFINITIONS.length} firm goals on track`,
        chartBreakdown:
          'This block expands the Dashboard goals strip: each goal shows progress, status, and how Firm Intelligence uses it to filter noise.',
        plainLanguageInsights: [
          'Net revenue, days-to-collect, and cash reserve targets define what “good” looks like for automated recommendations.',
          'When a goal slips, insights elsewhere in the product should prioritize actions that move that metric.',
          'Chart view shows the same goals with richer progress; Full view adds narrative and tie-ins to billing and collections.',
        ],
        kpis: [
          { label: 'Goals tracked', value: String(FIRM_GOAL_DEFINITIONS.length) },
          { label: 'On track', value: String(onTrack) },
          { label: 'Lens', value: 'Net revenue · DTC · Reserve' },
        ],
      };
    }
    case 'fho_operating_cash_detail':
      return {
        headline: last ? `${fmtMoney(last.cash)} operating cash` : 'Operating cash detail',
        chartBreakdown:
          'Bridge-style layout explains how cash moved versus the Dashboard headline: receipts, payroll, timing, and policy reserve.',
        plainLanguageInsights: [
          last
            ? `Latest modeled cash is ${fmtMoney(last.cash)} with monthly burn near ${fmtMoney(last.burn)}.`
            : 'Open Chart or Full to see cash and burn in context.',
          'Use this when you need plain-language drivers behind the single KPI on the home dashboard.',
        ],
        kpis: [
          { label: 'Latest cash', value: last != null ? fmtMoney(last.cash) : '—' },
          { label: 'Burn', value: last != null ? fmtMoney(last.burn) : '—' },
          { label: 'Runway', value: last != null ? `${last.runway} mo` : '—' },
        ],
      };
    case 'fho_revenue_detail':
      return {
        headline: `${briefingSnapshot.revenue.centerPct}% toward revenue plan`,
        chartBreakdown:
          'Combines recognized revenue with pipeline-style context (prototype) so partners see both booked work and what is coming.',
        plainLanguageInsights: [
          `Plan progress in the prototype is ${briefingSnapshot.revenue.centerPct}% with ${fmtMoney(briefingSnapshot.revenue.footerAmount)} recognized in the current quarter view.`,
          'Pair this with practice-area and stream widgets to see who drives the number.',
        ],
        kpis: [
          { label: 'Plan progress', value: `${briefingSnapshot.revenue.centerPct}%` },
          { label: 'Recognized (Q view)', value: fmtMoney(briefingSnapshot.revenue.footerAmount) },
          { label: 'Lens', value: briefingSnapshot.revenue.subtitle || 'Quarter' },
        ],
      };
    case 'fho_ar_at_risk_detail': {
      const total = sumAr(briefingSnapshot);
      return {
        headline: `${fmtMoney(total)} A/R under the microscope`,
        chartBreakdown:
          'Lists concentration in older buckets and client-level patterns so collections work is prioritized, not guessed.',
        plainLanguageInsights: [
          `Total A/R in the model is ${fmtMoney(total)}; the worst buckets drive most firm risk.`,
          'Full view adds row-level detail aligned with briefing “take action” flows.',
        ],
        kpis: [
          { label: 'Total A/R', value: fmtMoney(total) },
          { label: 'Buckets', value: String(briefingSnapshot.arAging.length) },
        ],
      };
    }
    case 'fho_runway_detail': {
      const trend = strategicNumericTrend(chartData, 'runway');
      const insights: string[] = [];
      if (trend) {
        insights.push(
          `Runway moved from about ${round1(trend.first)} months (${trend.firstMonth}) to ${round1(trend.last)} months (${trend.lastMonth}) across the series.`,
        );
      }
      if (last) insights.push(`As of ${last.month}, cash is near ${fmtMoney(last.cash)} and burn near ${fmtMoney(last.burn)}.`);
      return {
        headline: last ? `${last.runway} months runway` : 'Runway detail',
        chartBreakdown:
          'Extends the Dashboard runway card with more months of history and narrative so partners trust the trend.',
        plainLanguageInsights: insights.length ? insights : ['Open Chart view for the line; Full for tables and footnotes.'],
        kpis: [
          { label: 'Runway', value: last != null ? `${last.runway} mo` : '—' },
          { label: 'Cash', value: last != null ? fmtMoney(last.cash) : '—' },
          { label: 'Burn', value: last != null ? fmtMoney(last.burn) : '—' },
        ],
      };
    }
    case 'fho_iolta_trust_detail':
      return {
        headline: 'IOLTA and trust balances',
        chartBreakdown:
          'Checklist-style prototype for trust compliance: balances, rules reminders, and what to verify before distribution.',
        plainLanguageInsights: [
          'Numbers here are illustrative—pair with your trust accounting workflow in a live deployment.',
          'Use Full view for the complete checklist and line items.',
        ],
        kpis: [
          { label: 'Focus', value: 'IOLTA / trust' },
          { label: 'Mode', value: 'Compliance lens' },
        ],
      };
    case 'fho_unbilled_detail':
      return {
        headline: 'Unbilled time and WIP',
        chartBreakdown:
          'Ranks matters with aged WIP so billing committees see where time is stuck before it erodes realization.',
        plainLanguageInsights: [
          'Older WIP usually means higher write-off risk or stale rates—good prompts for billing health and partner realization widgets.',
          'Full view lists matters in sort order for working sessions.',
        ],
        kpis: [
          { label: 'Lens', value: 'WIP aging' },
          { label: 'Tie-in', value: 'Realization' },
        ],
      };
    case 'ambient_cfo':
      return {
        headline: "This week's Firm Intelligence briefing",
        chartBreakdown:
          'Each card is an insight with priority, timing, and actions. Summary gives the narrative; Chart shows the compact list; Full opens every row with Take action / Explore.',
        plainLanguageInsights: [
          'Insights refresh from the same briefing engine that powers charts when you execute recommended plans.',
          'Use Explore to open the side panel with data backing; use Take action to apply a plan and update dashboards.',
        ],
        kpis: [
          { label: 'Source', value: 'Live briefing' },
          { label: 'Actions', value: 'Take action · Explore data' },
        ],
      };
    case 'digital_twin':
      return {
        headline: 'Scenario stress-tests on your trends',
        chartBreakdown:
          'Pick a scenario to overlay how runway and cash paths might bend—grounded in the same strategic months as other Finances charts.',
        plainLanguageInsights: [
          'Use this when you want a conversational “what if” before committing a model to Financial Goals.',
          'Chart view shows the interactive explorer; overlays sync with strategic series context.',
        ],
        kpis: [
          { label: 'Data basis', value: 'Strategic months' },
          { label: 'Mode', value: 'What-if' },
        ],
      };
    case 'financial_goals': {
      const fg = briefingSnapshot.financialGoals;
      return {
        headline: 'Firm goals filter every insight',
        chartBreakdown:
          'Three goal cards mirror the Financial Goals page: progress bars show where you stand vs declared targets.',
        plainLanguageInsights: [
          `Modelling-linked progress includes about ${fmtMoney(fg.q3Current)} toward Q3 revenue and reserve at ${fmtMoney(fg.reserveCurrent)}.`,
          'Behind-track goals should surface more alerts in This Week’s Briefing and elsewhere.',
        ],
        kpis: [
          { label: 'Goals', value: '3 targets' },
          { label: 'Q3 revenue (model)', value: fmtMoney(fg.q3Current) },
          { label: 'Reserve (model)', value: fmtMoney(fg.reserveCurrent) },
        ],
      };
    }
    case 'suggested_modelling':
      return {
        headline: 'Modelling previews on your charts',
        chartBreakdown:
          'Toggle scenario previews to stress-test cash, burn, and runway; Explore opens the modelling review before linking models to goals.',
        plainLanguageInsights: [
          'Peer benchmark strip compares your firm to an anonymized composite when enabled.',
          'Linking a model to Financial Goals keeps strategy and operations aligned in one place.',
        ],
        kpis: [
          { label: 'Preview', value: 'Chart overlay' },
          { label: 'Peer bench', value: ctx.peerBenchmarkEnabled ? 'On' : 'Off' },
        ],
      };
    default:
      return null;
  }
}

export function getCatalogWidgetSummary(
  widgetId: string,
  ctx: CatalogSummaryContext,
): RichFinancesSummary | null {
  const inner = getCatalogWidgetSummaryInner(widgetId, ctx);
  if (!inner) return null;
  return {
    ...inner,
    goalConnection: inner.goalConnection ?? goalConnectionForWidget(widgetId),
  };
}

export function getCatalogWidgetFullRows(
  widgetId: string,
  briefingSnapshot: BriefingFinancialSnapshot,
  last: StrategicMonthRow | undefined,
): { label: string; value: string }[] {
  const rows: { label: string; value: string }[] = [];
  const month = last?.month;

  switch (widgetId) {
    case 'runway':
    case 'strat_runway':
      briefingSnapshot.runwayTrend.slice(-6).forEach((t) => {
        rows.push({ label: t.month, value: `${t.runway} mo` });
      });
      break;
    case 'cash_flow':
      briefingSnapshot.cashFlowBars.slice(-6).forEach((b) => {
        rows.push({ label: b.month, value: `In ${b.in} · Out ${b.out}` });
      });
      break;
    case 'ar_aging':
      briefingSnapshot.arAging.forEach((b) => {
        rows.push({ label: b.name, value: fmtMoney(b.value) });
      });
      break;
    case 'expense_rep':
      briefingSnapshot.expenseRep.forEach((b) => {
        rows.push({ label: b.name, value: fmtMoney(b.value) });
      });
      break;
    case 'rev_target':
      rows.push(
        { label: 'Progress', value: `${briefingSnapshot.revenue.centerPct}%` },
        { label: 'Current Q3', value: fmtMoney(briefingSnapshot.revenue.footerAmount) },
        { label: 'Remaining (plan)', value: fmtMoney(briefingSnapshot.revenue.pieRemaining) },
      );
      break;
    case 'strat_cash':
    case 'strat_burn':
      if (last) {
        rows.push(
          { label: `${month ?? 'Latest'} · Cash`, value: fmtMoney(last.cash) },
          { label: 'Burn', value: fmtMoney(last.burn) },
          { label: 'Runway', value: `${last.runway} mo` },
        );
      }
      break;
    case 'practice_areas':
      practiceAreaRevenueVsGoal.forEach((p) => {
        rows.push({ label: p.area, value: `$${p.revenue}k · goal ${p.goalPct}%` });
      });
      break;
    case 'billing_health':
      rows.push(
        { label: 'Draft WIP', value: billingHealthKpis.draftWip },
        { label: 'Billed / goal', value: billingHealthKpis.billedVsGoal },
        { label: 'Realization', value: billingHealthKpis.realizationProxy },
      );
      billingHealthSparkline.forEach((x) => rows.push({ label: `Health ${x.m}`, value: String(x.v) }));
      break;
    case 'collection_trends':
      collectionTrendSeries.forEach((c) => {
        rows.push({ label: c.month, value: `$${c.collections}k · DSO ${c.dso}d` });
      });
      break;
    case 'partner_realization':
      partnerRealizationRows.forEach((p) => {
        rows.push({ label: p.partner, value: `${p.realization}% (tgt ${p.target}%)` });
      });
      break;
    case 'revenue_streams_trend':
      briefingSnapshot.revenueStreamsTrend.forEach((r) => {
        const t = r.hourly + r.flatFee + r.referral + r.other;
        rows.push({
          label: r.month,
          value: `Total ${round1(t)}k · H ${r.hourly} F ${r.flatFee}`,
        });
      });
      break;
    case 'expense_stacked_trend':
      briefingSnapshot.expenseStackedTrend.forEach((r) => {
        const t = r.Payroll + r.Marketing + r.Software + r.Office;
        rows.push({
          label: r.month,
          value: `Total ${round1(t)}k · Payroll ${r.Payroll}`,
        });
      });
      break;
    case 'profitability_margin':
      briefingSnapshot.profitabilityMarginTrend.forEach((r) => {
        rows.push({
          label: r.month,
          value: `Rev ${r.revenue}k · OpEx ${r.expenses}k · ${r.operatingMarginPct}%`,
        });
      });
      break;
    case 'financial_goals':
      FIRM_GOAL_DEFINITIONS.forEach((g) => {
        rows.push({
          label: g.title,
          value: `${g.progressCurrentLabel} → ${g.progressTargetLabel} · ${g.status === 'on_track' ? 'On track' : 'Behind'}`,
        });
      });
      break;
    default:
      rows.push({
        label: 'Detail',
        value: 'See chart above and widget description for full prototype context.',
      });
  }
  return rows;
}
