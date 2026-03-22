import React from 'react';
import type { LucideIcon } from 'lucide-react';
import {
  BarChart2,
  PieChart,
  FileText,
  Sparkles,
  LayoutDashboard,
  Target,
  TrendingUp,
  History,
  Wallet,
  ArrowUpFromLine,
  Activity,
  Briefcase,
  Users,
  LineChart as LucideLineChart,
  Gauge,
  Cpu,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  Legend,
  Cell,
  PieChart as RePieChart,
  Pie,
  LineChart,
  Line,
} from 'recharts';
import { ThisWeeksBriefing } from './ThisWeeksBriefing';
import type { BriefingInsightId } from '../data/briefingPanelContent';
import { strategicData, type StrategicMonthRow } from '../data/strategicDashboardSeed';
import { buildBriefingFinancialSnapshot, strategicRowsToCashFlowBars } from '../data/briefingFinancialImpact';
import { useStrategicDashboardCharts } from '../context/StrategicDashboardChartsContext';
import {
  getReportTableRows,
  getReportSummaryContent,
  getReportChartSeries,
} from '../data/reportDocumentSeed';
import { ReportDocumentTable } from './ReportDocumentTable';
import {
  practiceAreaRevenueVsGoal,
  billingHealthKpis,
  billingHealthSparkline,
  collectionTrendSeries,
  partnerRealizationRows,
} from '../data/dashboardMetricSeed';
import { DIGITAL_TWIN_CATALOG_DESC } from '../data/prototypePersona';
import { DigitalTwinWidget, type DigitalTwinScenarioId } from './DigitalTwinWidget';
import { SuggestedModellingWidget, type ModellingWidgetUiBridge } from './SuggestedModellingWidget';

export type { ModellingWidgetUiBridge } from './SuggestedModellingWidget';

/** Canvas / page width: compact = half row on md+ grid; expanded = full row width */
export type WidgetLayoutSize = 'compact' | 'expanded';

/** Main Finances grid column count on md+ breakpoints */
export type MainGridColumns = 2 | 3;

/** Embedded report widget display mode */
export type ReportWidgetView = 'full' | 'chart_compact' | 'summary';

/** Map legacy or unknown values (e.g. removed `chart_expanded`) to a valid mode */
export function normalizeReportView(raw?: string | null): ReportWidgetView {
  if (raw === 'full' || raw === 'summary' || raw === 'chart_compact') return raw;
  return 'chart_compact';
}

export const EMBEDDED_REPORT_WIDGET_ID = 'embedded_report' as const;

export type FinancePageWidget = {
  instanceId: string;
  widgetId: string;
  layoutSize?: WidgetLayoutSize;
  /** When widgetId === embedded_report */
  reportName?: string;
  reportView?: ReportWidgetView;
};

export type ReportLibraryEntry = {
  name: string;
  desc: string;
  icon: LucideIcon;
};

export type HydratedPlacedWidget = {
  id: string;
  title: string;
  category: string;
  icon: LucideIcon;
  desc: string;
  instanceId: string;
  layoutSize: WidgetLayoutSize;
  reportName?: string;
  reportView?: ReportWidgetView;
};

export const WIDGET_CATALOG = [
  { id: 'runway', title: 'Runway Projection', category: 'Charts', icon: BarChart2, desc: '6-month cash runway trend' },
  { id: 'cash_flow', title: 'Cash Flow', category: 'Charts', icon: BarChart2, desc: 'Operating cash flow vs target' },
  { id: 'ar_aging', title: 'A/R Aging', category: 'Graphs', icon: PieChart, desc: 'Accounts receivable aging buckets' },
  { id: 'ambient_cfo', title: "This Week's Briefing", category: 'AI', icon: Sparkles, desc: 'Live automated financial insights' },
  {
    id: 'digital_twin',
    title: 'Digital Twin',
    category: 'AI',
    icon: Cpu,
    desc: DIGITAL_TWIN_CATALOG_DESC,
  },
  {
    id: 'suggested_modelling',
    title: 'Suggested Modelling',
    category: 'Modelling',
    icon: Sparkles,
    desc: 'Scenario models, preview overlay on charts, and add to Financial Goals',
  },
  { id: 'expense_rep', title: 'Expense Breakdown', category: 'Reports', icon: FileText, desc: 'Monthly expenses by category' },
  { id: 'rev_target', title: 'Revenue Target', category: 'Reports', icon: FileText, desc: 'Progress towards quarterly goals' },
  {
    id: 'financial_goals',
    title: 'Financial Goals',
    category: 'Goals',
    icon: Target,
    desc: 'Active firm goals, progress, and targets (pair with Cash, Burn, Runway in Core metrics)',
  },
  {
    id: 'strat_cash',
    title: 'Cash',
    category: 'Core metrics',
    icon: Wallet,
    desc: 'Projected operating cash (scenario modelling overlay)',
  },
  {
    id: 'strat_burn',
    title: 'Burn',
    category: 'Core metrics',
    icon: ArrowUpFromLine,
    desc: 'Monthly operating burn (scenario modelling overlay)',
  },
  {
    id: 'strat_runway',
    title: 'Runway',
    category: 'Core metrics',
    icon: Activity,
    desc: 'Months of runway (scenario modelling overlay)',
  },
  {
    id: 'practice_areas',
    title: 'Practice Areas',
    category: 'Practice & collections',
    icon: Briefcase,
    desc: 'Revenue by practice area vs firm goal mix',
  },
  {
    id: 'billing_health',
    title: 'Billing Health',
    category: 'Practice & collections',
    icon: Gauge,
    desc: 'WIP, billed vs goal, and realization signals',
  },
  {
    id: 'collection_trends',
    title: 'Collection Trends',
    category: 'Practice & collections',
    icon: LucideLineChart,
    desc: 'Collections and DSO-style trend over recent months',
  },
  {
    id: 'partner_realization',
    title: 'Partner Realization',
    category: 'Practice & collections',
    icon: Users,
    desc: 'Partner-level realization vs target',
  },
] as const;

export type FinanceCatalogWidgetId = (typeof WIDGET_CATALOG)[number]['id'];

export function defaultLayoutSizeForWidgetId(widgetId: string): WidgetLayoutSize {
  if (
    widgetId === 'ambient_cfo' ||
    widgetId === 'digital_twin' ||
    widgetId === 'financial_goals' ||
    widgetId === EMBEDDED_REPORT_WIDGET_ID ||
    widgetId === 'suggested_modelling'
  ) {
    return 'expanded';
  }
  return 'compact';
}

export function mainGridClass(columns: MainGridColumns = 2): string {
  return columns === 3
    ? 'grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-max w-full'
    : 'grid grid-cols-1 md:grid-cols-2 gap-6 auto-rows-max w-full';
}

/** Span class for expanded widgets so they fill the full main row for 2- or 3-column grids */
export function layoutSizeToGridClass(layoutSize: WidgetLayoutSize, columns: MainGridColumns = 2): string {
  if (layoutSize !== 'expanded') return '';
  return columns === 3 ? 'md:col-span-3' : 'md:col-span-2';
}

export function hydratePlacedWidgets(
  placed: FinancePageWidget[],
  reportLibrary?: readonly ReportLibraryEntry[],
): HydratedPlacedWidget[] {
  const out: HydratedPlacedWidget[] = [];
  for (const p of placed) {
    if (p.widgetId === EMBEDDED_REPORT_WIDGET_ID) {
      const rn = p.reportName?.trim();
      if (!rn) continue;
      const meta = reportLibrary?.find((r) => r.name === rn);
      const layoutSize: WidgetLayoutSize = p.layoutSize ?? defaultLayoutSizeForWidgetId(p.widgetId);
      const reportView = normalizeReportView(p.reportView);
      out.push({
        id: EMBEDDED_REPORT_WIDGET_ID,
        title: rn,
        desc: meta?.desc ?? 'Financial report',
        icon: meta?.icon ?? FileText,
        category: 'Reports',
        instanceId: p.instanceId,
        layoutSize,
        reportName: rn,
        reportView,
      });
      continue;
    }
    const c = WIDGET_CATALOG.find((w) => w.id === p.widgetId);
    if (c) {
      const layoutSize: WidgetLayoutSize = p.layoutSize ?? defaultLayoutSizeForWidgetId(p.widgetId);
      out.push({ ...c, instanceId: p.instanceId, layoutSize });
    }
  }
  return out;
}

/** Persist hydrated canvas rows back to `FinancePageWidget[]` (e.g. customizer save). */
export function financePageWidgetsFromHydrated(hydrated: HydratedPlacedWidget[]): FinancePageWidget[] {
  return hydrated.map((w) => ({
    instanceId: w.instanceId,
    widgetId: w.id,
    layoutSize: w.layoutSize,
    ...(w.id === EMBEDDED_REPORT_WIDGET_ID && w.reportName
      ? { reportName: w.reportName, reportView: normalizeReportView(w.reportView) }
      : {}),
  }));
}

/** Sidebar rail widgets are always compact width (no full-row span). */
export function financeSidebarWidgetsForPersist(widgets: FinancePageWidget[]): FinancePageWidget[] {
  return widgets.map((w) => ({ ...w, layoutSize: 'compact' as const }));
}

/** Hydrated sidebar list for canvas preview — force compact display. */
export function hydrateSidebarPlacedWidgets(
  placed: FinancePageWidget[],
  reportLibrary?: readonly ReportLibraryEntry[],
): HydratedPlacedWidget[] {
  return hydratePlacedWidgets(placed, reportLibrary).map((w) => ({ ...w, layoutSize: 'compact' as const }));
}

const REPORT_VIEW_OPTIONS: { id: ReportWidgetView; label: string }[] = [
  { id: 'full', label: 'Full' },
  { id: 'summary', label: 'Summary' },
  { id: 'chart_compact', label: 'Chart' },
];

export function ReportViewToolbar({
  value,
  onChange,
  className = '',
}: {
  value: ReportWidgetView;
  onChange: (v: ReportWidgetView) => void;
  className?: string;
}) {
  const active = normalizeReportView(value);
  return (
    <div className={`flex flex-wrap gap-1 ${className}`} role="group" aria-label="Report display mode">
      {REPORT_VIEW_OPTIONS.map((m) => (
        <button
          key={m.id}
          type="button"
          onClick={() => onChange(m.id)}
          className={`text-[10px] font-semibold px-2 py-1 rounded-md border transition-colors ${
            active === m.id
              ? 'bg-blue-600 text-white border-blue-600'
              : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
          }`}
        >
          {m.label}
        </button>
      ))}
    </div>
  );
}

type FinanceWidgetContentProps = {
  id: string;
  instanceId?: string;
  onTakeAction?: (insightId: string) => void;
  onExploreData?: (insightId: string) => void;
  /** Customizer uses compact; saved dashboard pages use full briefing */
  thisWeeksBriefingCompact?: boolean;
  /** Hide briefing rows after Execute Recommended Plan */
  executedBriefingInsightIds?: readonly BriefingInsightId[];
  /** Embedded report widget only */
  reportName?: string;
  reportView?: ReportWidgetView;
  onDigitalTwinScenario?: (id: DigitalTwinScenarioId) => void;
  /** suggested_modelling — preview/goals/create; omit to show placeholder */
  modellingUi?: ModellingWidgetUiBridge | null;
};

export function FinanceWidgetContent({
  id,
  instanceId,
  onTakeAction,
  onExploreData,
  thisWeeksBriefingCompact = true,
  executedBriefingInsightIds,
  reportName,
  reportView: reportViewProp = 'chart_compact',
  onDigitalTwinScenario,
  modellingUi,
}: FinanceWidgetContentProps) {
  const reportView = normalizeReportView(reportViewProp);
  const chartCtx = useStrategicDashboardCharts();
  const chartData: StrategicMonthRow[] = chartCtx?.displayStrategicData ?? (strategicData as StrategicMonthRow[]);
  const selectedModelId = chartCtx?.selectedModelId ?? null;
  const peerBenchmarkEnabled = chartCtx?.peerBenchmarkEnabled ?? false;
  const briefingSnapshot = chartCtx?.briefingSnapshot ?? buildBriefingFinancialSnapshot([]);

  const runwaySeries = chartData.map((r) => ({
    month: r.month,
    runway: r.altRunway ?? r.runway,
  }));
  const cashFlowSeries = strategicRowsToCashFlowBars(
    chartData.map((r) => ({
      month: r.month,
      cash: r.altCash ?? r.cash,
      burn: r.altBurn ?? r.burn,
    })),
  );
  const revPie = [
    { name: 'Current', value: briefingSnapshot.revenue.pieCurrent },
    { name: 'Target', value: briefingSnapshot.revenue.pieRemaining },
  ];
  const fgSnap = briefingSnapshot.financialGoals;

  const chartId = instanceId || Math.random().toString(36).substr(2, 9);
  const gradientId = `color-${id}-${chartId}`;

  switch (id) {
    case 'runway':
      return (
        <div className="h-full w-full flex flex-col">
          <div className="flex-1 min-h-[150px] mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart id={`chart-${chartId}`} data={runwaySeries} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <defs key="defs">
                  <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid key="grid" strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis key="xaxis" dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#6b7280' }} dy={10} />
                <YAxis key="yaxis" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#6b7280' }} />
                <Tooltip key="tooltip" contentStyle={{ borderRadius: '8px', fontSize: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Area key="area" type="monotone" dataKey="runway" stroke="#10B981" strokeWidth={1.5} fillOpacity={1} fill={`url(#${gradientId})`} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      );
    case 'cash_flow':
      return (
        <div className="h-full w-full flex flex-col">
          <div className="flex-1 min-h-[150px] mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart id={`chart-${chartId}`} data={cashFlowSeries} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid key="grid" strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis key="xaxis" dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#6b7280' }} dy={10} />
                <YAxis key="yaxis" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#6b7280' }} />
                <Tooltip key="tooltip" cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '8px', fontSize: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Bar key="bar-in" dataKey="in" name="Cash In" fill="#3B82F6" radius={[4, 4, 0, 0]} barSize={8} />
                <Bar key="bar-out" dataKey="out" name="Cash Out" fill="#EF4444" radius={[4, 4, 0, 0]} barSize={8} />
                <Legend key="legend" wrapperStyle={{ fontSize: '10px', paddingTop: '10px' }} iconType="circle" iconSize={6} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      );
    case 'ar_aging':
      return (
        <div className="h-full w-full flex flex-col items-center justify-center mt-2">
          <div className="w-full h-[140px]">
            <ResponsiveContainer width="100%" height="100%">
              <RePieChart id={`chart-${chartId}`}>
                <Pie key="pie" data={briefingSnapshot.arAging} innerRadius={40} outerRadius={60} paddingAngle={2} dataKey="value">
                  {briefingSnapshot.arAging.map((entry) => (
                    <Cell key={`cell-${entry.name.replace(/\s+/g, '-')}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip key="tooltip" formatter={(value: number) => `$${value.toLocaleString()}`} contentStyle={{ borderRadius: '8px', fontSize: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
              </RePieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap justify-center gap-2 mt-2">
            {briefingSnapshot.arAging.map((entry) => (
              <div key={`legend-${entry.name.replace(/\s+/g, '-')}`} className="flex items-center gap-1 text-[10px] text-gray-600">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
                {entry.name}
              </div>
            ))}
          </div>
        </div>
      );
    case 'expense_rep':
      return (
        <div className="h-full w-full flex flex-col mt-2">
          <div className="w-full h-[140px]">
            <ResponsiveContainer width="100%" height="100%">
              <RePieChart id={`chart-${chartId}`}>
                <Pie key="pie" data={briefingSnapshot.expenseRep} innerRadius={0} outerRadius={60} paddingAngle={0} dataKey="value">
                  {briefingSnapshot.expenseRep.map((entry) => (
                    <Cell key={`exp-cell-${entry.name.replace(/\s+/g, '-')}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip key="tooltip" formatter={(value: number) => `$${value.toLocaleString()}`} contentStyle={{ borderRadius: '8px', fontSize: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
              </RePieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap justify-center gap-2 mt-2">
            {briefingSnapshot.expenseRep.map((entry) => (
              <div key={`exp-legend-${entry.name.replace(/\s+/g, '-')}`} className="flex items-center gap-1 text-[10px] text-gray-600">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
                {entry.name}
              </div>
            ))}
          </div>
        </div>
      );
    case 'rev_target':
      return (
        <div className="h-full w-full flex flex-col justify-center items-center mt-2">
          <div className="relative w-full h-[140px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <RePieChart id={`chart-${chartId}`}>
                <Pie key="pie" data={revPie} startAngle={180} endAngle={0} innerRadius={50} outerRadius={70} paddingAngle={0} dataKey="value">
                  <Cell key="rev-curr" fill="#10B981" />
                  <Cell key="rev-targ" fill="#f3f4f6" />
                </Pie>
              </RePieChart>
            </ResponsiveContainer>
            <div className="absolute flex flex-col items-center justify-center" style={{ top: '55%' }}>
              <span className="text-[20px] font-bold text-gray-900 leading-none">{briefingSnapshot.revenue.centerPct}%</span>
              <span className="text-[10px] text-gray-500">{briefingSnapshot.revenue.subtitle}</span>
            </div>
          </div>
          <div className="w-full bg-gray-50 rounded-[6px] p-2 mt-2 border border-gray-100">
            <div className="flex justify-between items-center text-[11px]">
              <span className="text-gray-500">Current Q3 Revenue</span>
              <span className="font-semibold text-gray-900">${briefingSnapshot.revenue.footerAmount.toLocaleString()}</span>
            </div>
          </div>
        </div>
      );
    case 'ambient_cfo':
      return (
        <ThisWeeksBriefing
          onTakeAction={onTakeAction}
          onExploreData={onExploreData}
          isCompact={thisWeeksBriefingCompact}
          executedInsightIds={executedBriefingInsightIds}
        />
      );
    case 'digital_twin':
      return (
        <DigitalTwinWidget
          displayStrategicData={chartData}
          onExploreScenario={onDigitalTwinScenario}
        />
      );
    case 'suggested_modelling':
      if (!modellingUi) {
        return (
          <div className="text-xs text-gray-500 py-4 text-center border border-dashed border-gray-200 rounded-[8px]">
            Modelling controls load on the live Finances page.
          </div>
        );
      }
      return <SuggestedModellingWidget bridge={modellingUi} />;
    case 'financial_goals':
      return (
        <div className="h-full w-full flex flex-col mt-1">
          <p className="text-[11px] text-gray-500 mb-3">Snapshot of goals also tracked on the Financial Goals page.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="rounded-[8px] border border-gray-100 bg-gray-50/80 p-3 flex flex-col gap-2">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-1.5 min-w-0">
                  <TrendingUp className="w-4 h-4 text-green-500 shrink-0" strokeWidth={2} />
                  <span className="text-[12px] font-bold text-gray-900 truncate">Q3 Revenue Target</span>
                </div>
              </div>
              <p className="text-[10px] text-gray-500 leading-snug">$500k gross revenue by end of Q3</p>
              <div className="space-y-1 mt-1">
                <div className="flex justify-between text-[10px]">
                  <span className="text-gray-600 font-medium">Progress</span>
                  <span className="font-semibold text-gray-900">
                    ${Math.round(fgSnap.q3Current / 1000)}k / ${Math.round(fgSnap.q3Target / 1000)}k
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-green-500 h-1.5 rounded-full" style={{ width: `${fgSnap.q3ProgressPct}%` }} />
                </div>
              </div>
            </div>
            <div className="rounded-[8px] border border-gray-100 bg-gray-50/80 p-3 flex flex-col gap-2">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-1.5 min-w-0">
                  <History className="w-4 h-4 text-blue-500 shrink-0" strokeWidth={2} />
                  <span className="text-[12px] font-bold text-gray-900 truncate">Cash flow reserve</span>
                </div>
              </div>
              <p className="text-[10px] text-gray-500 leading-snug">3 months operating expenses in reserve</p>
              <div className="space-y-1 mt-1">
                <div className="flex justify-between text-[10px]">
                  <span className="text-gray-600 font-medium">Progress</span>
                  <span className="font-semibold text-gray-900">
                    ${Math.round(fgSnap.reserveCurrent / 1000)}k / ${Math.round(fgSnap.reserveTarget / 1000)}k
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: `${Math.min(100, fgSnap.reserveProgressPct)}%` }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    case 'strat_cash': {
      const showStratLegend = peerBenchmarkEnabled || Boolean(selectedModelId);
      const cashTooltipLabel = (name: string) => {
        if (name === 'cash') return 'Your firm';
        if (name === 'altCash') return 'Scenario (Preview)';
        if (name === 'peerCash') return 'Peer composite';
        return name;
      };
      return (
        <div className="w-full mt-2 h-[300px] min-h-[300px]">
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: showStratLegend ? 8 : 0 }} accessibilityLayer={false}>
              <defs key="defs">
                <linearGradient id={`${gradientId}-cash`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0069D1" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#0069D1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid key="grid" strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
              <XAxis key="xaxis" dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#6b7280' }} dy={10} />
              <YAxis key="yaxis" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#6b7280' }} tickFormatter={(val) => `$${(val / 1000).toFixed(0)}k`} dx={-10} width={50} />
              <Tooltip
                key="tooltip"
                contentStyle={{ borderRadius: '8px', fontSize: '12px', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                formatter={(value: number, name: string) => [`$${value.toLocaleString()}`, cashTooltipLabel(name)]}
              />
              {showStratLegend && (
                <Legend wrapperStyle={{ fontSize: 10, paddingTop: 4 }} formatter={(value) => value} />
              )}
              <Area
                key="area"
                name="Your firm"
                type="monotone"
                dataKey="cash"
                stroke="#0069D1"
                strokeWidth={2.5}
                fillOpacity={1}
                fill={`url(#${gradientId}-cash)`}
              />
              {selectedModelId && (
                <Area
                  key="areaAlt"
                  name="Scenario (Preview)"
                  type="monotone"
                  dataKey="altCash"
                  stroke="#8b5cf6"
                  strokeWidth={2.5}
                  strokeDasharray="5 5"
                  fillOpacity={0}
                />
              )}
              {peerBenchmarkEnabled && (
                <Area
                  key="areaPeer"
                  name="Peer composite"
                  type="monotone"
                  dataKey="peerCash"
                  stroke="#0d9488"
                  strokeWidth={2}
                  strokeDasharray="3 3"
                  fillOpacity={0}
                />
              )}
            </AreaChart>
          </ResponsiveContainer>
        </div>
      );
    }
    case 'strat_burn': {
      const nBars = 1 + (selectedModelId ? 1 : 0) + (peerBenchmarkEnabled ? 1 : 0);
      const barW = nBars >= 3 ? 10 : nBars === 2 ? 14 : 28;
      const showBurnLegend = peerBenchmarkEnabled || Boolean(selectedModelId);
      const burnTooltipLabel = (name: string) => {
        if (name === 'burn') return 'Your firm';
        if (name === 'altBurn') return 'Scenario (Preview)';
        if (name === 'peerBurn') return 'Peer composite';
        return name;
      };
      return (
        <div className="w-full mt-2 h-[300px] min-h-[300px]">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: showBurnLegend ? 8 : 0 }} accessibilityLayer={false}>
              <CartesianGrid key="grid" strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
              <XAxis key="xaxis" dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#6b7280' }} dy={10} />
              <YAxis key="yaxis" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#6b7280' }} tickFormatter={(val) => `$${(val / 1000).toFixed(0)}k`} dx={-10} width={50} />
              <Tooltip
                key="tooltip"
                cursor={{ fill: '#f9fafb' }}
                contentStyle={{ borderRadius: '8px', fontSize: '12px', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                formatter={(value: number, name: string) => [`$${value.toLocaleString()}`, burnTooltipLabel(name)]}
              />
              {showBurnLegend && <Legend wrapperStyle={{ fontSize: 10, paddingTop: 4 }} />}
              <Bar name="Your firm" dataKey="burn" fill="#ef4444" radius={[4, 4, 0, 0]} barSize={barW} />
              {selectedModelId && (
                <Bar name="Scenario (Preview)" dataKey="altBurn" fill="#8b5cf6" radius={[4, 4, 0, 0]} barSize={barW} />
              )}
              {peerBenchmarkEnabled && (
                <Bar name="Peer composite" dataKey="peerBurn" fill="#0d9488" radius={[4, 4, 0, 0]} barSize={barW} />
              )}
            </BarChart>
          </ResponsiveContainer>
        </div>
      );
    }
    case 'strat_runway': {
      const showRwLegend = peerBenchmarkEnabled || Boolean(selectedModelId);
      const rwTooltipLabel = (name: string) => {
        if (name === 'runway') return 'Your firm';
        if (name === 'altRunway') return 'Scenario (Preview)';
        if (name === 'peerRunway') return 'Peer composite';
        return name;
      };
      return (
        <div className="w-full mt-2 h-[300px] min-h-[300px]">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: showRwLegend ? 8 : 0 }} accessibilityLayer={false}>
              <CartesianGrid key="grid" strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
              <XAxis key="xaxis" dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#6b7280' }} dy={10} />
              <YAxis key="yaxis" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#6b7280' }} dx={-10} width={40} />
              <Tooltip
                key="tooltip"
                contentStyle={{ borderRadius: '8px', fontSize: '12px', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                formatter={(value: number, name: string) => [`${value} months`, rwTooltipLabel(name)]}
              />
              {showRwLegend && <Legend wrapperStyle={{ fontSize: 10, paddingTop: 4 }} />}
              <Line
                name="Your firm"
                type="monotone"
                dataKey="runway"
                stroke="#10b981"
                strokeWidth={2.5}
                dot={{ r: 4, strokeWidth: 2, fill: '#fff' }}
                activeDot={{ r: 6, fill: '#10b981' }}
              />
              {selectedModelId && (
                <Line
                  name="Scenario (Preview)"
                  type="monotone"
                  dataKey="altRunway"
                  stroke="#8b5cf6"
                  strokeWidth={2.5}
                  strokeDasharray="5 5"
                  dot={{ r: 4, strokeWidth: 2, fill: '#fff' }}
                  activeDot={{ r: 6, fill: '#8b5cf6' }}
                />
              )}
              {peerBenchmarkEnabled && (
                <Line
                  name="Peer composite"
                  type="monotone"
                  dataKey="peerRunway"
                  stroke="#0d9488"
                  strokeWidth={2}
                  strokeDasharray="2 4"
                  dot={{ r: 3, strokeWidth: 2, fill: '#fff' }}
                  activeDot={{ r: 5, fill: '#0d9488' }}
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>
      );
    }
    case EMBEDDED_REPORT_WIDGET_ID: {
      const rn = reportName?.trim() || 'Report';
      const rows = getReportTableRows(rn);
      const summary = getReportSummaryContent(rn);
      const series = getReportChartSeries(rn);
      const chartH = 160;

      if (reportView === 'full') {
        return (
          <div className="w-full min-h-[200px] max-h-[min(70vh,520px)] overflow-y-auto rounded-lg border border-gray-100 bg-white -mx-1">
            <ReportDocumentTable rows={rows} compact />
          </div>
        );
      }
      if (reportView === 'summary') {
        return (
          <div className="mt-2 space-y-3">
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {summary.kpis.map((k) => (
                <li
                  key={k.label}
                  className="flex justify-between gap-2 text-[11px] rounded-md border border-gray-100 bg-gray-50/80 px-2.5 py-1.5"
                >
                  <span className="text-gray-500">{k.label}</span>
                  <span className="font-semibold text-gray-900">{k.value}</span>
                </li>
              ))}
            </ul>
            <p className="text-[11px] text-gray-600 leading-snug border-t border-gray-100 pt-2">{summary.insight}</p>
          </div>
        );
      }
      return (
        <div className="w-full mt-2" style={{ height: chartH, minHeight: chartH }}>
          <ResponsiveContainer width="100%" height={chartH}>
            <AreaChart data={series} margin={{ top: 6, right: 8, left: -18, bottom: 0 }}>
              <defs>
                <linearGradient id={`${gradientId}-rep`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0069D1" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#0069D1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: '#6b7280' }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: '#6b7280' }} width={36} />
              <Tooltip
                contentStyle={{ borderRadius: '8px', fontSize: '11px', border: '1px solid #e5e7eb' }}
                formatter={(v: number) => [v, rn]}
              />
              <Area type="monotone" dataKey="value" stroke="#0069D1" strokeWidth={2} fillOpacity={1} fill={`url(#${gradientId}-rep)`} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      );
    }
    case 'practice_areas': {
      const paData = practiceAreaRevenueVsGoal.map((p) => ({
        area: p.area.length > 10 ? `${p.area.slice(0, 9)}…` : p.area,
        revenue: p.revenue,
        goalIdx: Math.round(p.goalPct * 4),
      }));
      const practiceAreasChartH = 200;
      return (
        <div className="w-full flex flex-col mt-1 shrink-0">
          <p className="text-[10px] text-gray-500 mb-2 shrink-0">
            Revenue ($k) by practice vs firm goal mix (% of revenue plan).
          </p>
          <div className="w-full shrink-0" style={{ height: practiceAreasChartH }}>
            <ResponsiveContainer width="100%" height={practiceAreasChartH}>
              <BarChart data={paData} margin={{ top: 4, right: 8, left: -12, bottom: 4 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="area" axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: '#6b7280' }} interval={0} angle={-12} textAnchor="end" height={48} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: '#6b7280' }} />
                <Tooltip
                  contentStyle={{ borderRadius: '8px', fontSize: '11px' }}
                  formatter={(v: number, name: string) =>
                    name === 'revenue' ? [`$${v}k`, 'Revenue'] : [v, 'Goal index']
                  }
                />
                <Legend wrapperStyle={{ fontSize: '10px' }} />
                <Bar dataKey="revenue" name="Revenue ($k)" fill="#0069D1" radius={[3, 3, 0, 0]} maxBarSize={28} />
                <Bar dataKey="goalIdx" name="Goal mix (×4%)" fill="#93c5fd" radius={[3, 3, 0, 0]} maxBarSize={28} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      );
    }
    case 'billing_health':
      return (
        <div className="h-full w-full flex flex-col gap-3 mt-1">
          <div className="grid grid-cols-3 gap-2">
            <div className="rounded-lg border border-gray-100 bg-gray-50/90 p-2 text-center">
              <p className="text-[9px] font-bold uppercase text-gray-400 tracking-wide">Draft WIP</p>
              <p className="text-sm font-bold text-gray-900">{billingHealthKpis.draftWip}</p>
            </div>
            <div className="rounded-lg border border-gray-100 bg-gray-50/90 p-2 text-center">
              <p className="text-[9px] font-bold uppercase text-gray-400 tracking-wide">Billed / goal</p>
              <p className="text-sm font-bold text-emerald-700">{billingHealthKpis.billedVsGoal}</p>
            </div>
            <div className="rounded-lg border border-gray-100 bg-gray-50/90 p-2 text-center">
              <p className="text-[9px] font-bold uppercase text-gray-400 tracking-wide">Realization</p>
              <p className="text-sm font-bold text-gray-900">{billingHealthKpis.realizationProxy}</p>
            </div>
          </div>
          <div className="h-[100px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={billingHealthSparkline} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id={`${gradientId}-bh`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="m" axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: '#6b7280' }} />
                <YAxis domain={[80, 100]} axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: '#6b7280' }} width={32} />
                <Tooltip contentStyle={{ fontSize: '11px', borderRadius: '8px' }} />
                <Area type="monotone" dataKey="v" stroke="#10b981" strokeWidth={2} fill={`url(#${gradientId}-bh)`} name="Health index" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      );
    case 'collection_trends': {
      const collectionChartH = 232;
      return (
        <div className="w-full flex flex-col mt-1 shrink-0">
          <p className="text-[10px] text-gray-500 mb-1 shrink-0">
            Collections ($k) and DSO (days, right axis).
          </p>
          <div className="w-full shrink-0" style={{ height: collectionChartH }}>
            <ResponsiveContainer width="100%" height={collectionChartH}>
              <LineChart data={collectionTrendSeries} margin={{ top: 8, right: 8, left: -12, bottom: 4 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#6b7280' }} />
                <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#6b7280' }} />
                <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#6b7280' }} width={36} />
                <Tooltip contentStyle={{ borderRadius: '8px', fontSize: '11px' }} />
                <Legend wrapperStyle={{ fontSize: '10px', paddingTop: 2 }} layout="horizontal" verticalAlign="bottom" />
                <Line yAxisId="left" type="monotone" dataKey="collections" name="Collections ($k)" stroke="#0069D1" strokeWidth={2} dot={{ r: 3 }} />
                <Line yAxisId="right" type="monotone" dataKey="dso" name="DSO (days)" stroke="#f59e0b" strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      );
    }
    case 'partner_realization': {
      const partnerChartH = 240;
      return (
        <div className="w-full flex flex-col mt-1 shrink-0">
          <p className="text-[10px] text-gray-500 mb-2 shrink-0">Realization % vs internal target by partner.</p>
          <div className="w-full shrink-0" style={{ height: partnerChartH }}>
            <ResponsiveContainer width="100%" height={partnerChartH}>
              <BarChart
                layout="vertical"
                data={partnerRealizationRows}
                margin={{ top: 4, right: 16, left: 4, bottom: 4 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f3f4f6" />
                <XAxis type="number" domain={[0, 100]} axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: '#6b7280' }} unit="%" />
                <YAxis type="category" dataKey="partner" width={72} axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#374151' }} />
                <Tooltip
                  contentStyle={{ borderRadius: '8px', fontSize: '11px' }}
                  formatter={(v: number, name: string) => [`${v}%`, name === 'realization' ? 'Realization' : 'Target']}
                />
                <Legend wrapperStyle={{ fontSize: '10px' }} />
                <Bar dataKey="target" name="Target" fill="#e5e7eb" radius={[0, 4, 4, 0]} barSize={10} />
                <Bar dataKey="realization" name="Realization" fill="#0069D1" radius={[0, 4, 4, 0]} barSize={10} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      );
    }
    default:
      return (
        <div className="h-full w-full flex flex-col items-center justify-center text-gray-400 mt-4 bg-gray-50/50 rounded-[8px] border border-gray-100 border-dashed min-h-[120px]">
          <LayoutDashboard className="w-[17.5px] h-[17.5px] mb-2 opacity-50" strokeWidth={1.5} />
          <span className="text-[11px]">Widget visualization placeholder</span>
        </div>
      );
  }
}

/** Default canvas when creating a new Finances page */
export const DEFAULT_NEW_PAGE_WIDGETS: FinancePageWidget[] = [
  { instanceId: 'w_runway', widgetId: 'runway', layoutSize: 'compact' },
  { instanceId: 'w_ar', widgetId: 'ar_aging', layoutSize: 'compact' },
];

/** Default layout for the built-in 2026 Strategic Roadmap Finances page */
export const DEFAULT_FP_DEFAULT_WIDGETS: FinancePageWidget[] = [
  { instanceId: 'w_brief', widgetId: 'ambient_cfo', layoutSize: 'expanded' },
  { instanceId: 'w_cash', widgetId: 'strat_cash', layoutSize: 'expanded' },
  { instanceId: 'w_burn', widgetId: 'strat_burn', layoutSize: 'expanded' },
  { instanceId: 'w_runway_s', widgetId: 'strat_runway', layoutSize: 'expanded' },
];

/** Default right-rail widgets for the built-in strategic roadmap page */
export const DEFAULT_FP_DEFAULT_SIDEBAR_WIDGETS: FinancePageWidget[] = [
  { instanceId: 'sb_modelling', widgetId: 'suggested_modelling', layoutSize: 'compact' },
];

/** Default sidebar when creating a new Finances page */
export const DEFAULT_NEW_PAGE_SIDEBAR_WIDGETS: FinancePageWidget[] = [
  { instanceId: 'sb_modelling', widgetId: 'suggested_modelling', layoutSize: 'compact' },
];

type FinancePageWidgetGridProps = {
  widgets: FinancePageWidget[];
  onTakeAction?: (insightId: string) => void;
  onExploreData?: (insightId: string) => void;
  emptyHint?: React.ReactNode;
  thisWeeksBriefingCompact?: boolean;
  executedBriefingInsightIds?: readonly BriefingInsightId[];
  /** Resolve report titles/icons for embedded_report widgets (e.g. from App `availableReports`) */
  reportLibrary?: readonly ReportLibraryEntry[];
  /** Persist inline edits (e.g. report view mode) into saved page widgets */
  onUpdateWidget?: (instanceId: string, patch: Partial<FinancePageWidget>) => void;
  onDigitalTwinScenario?: (id: DigitalTwinScenarioId) => void;
  mainGridColumns?: MainGridColumns;
  modellingUi?: ModellingWidgetUiBridge | null;
};

export function FinancePageWidgetGrid({
  widgets,
  onTakeAction,
  onExploreData,
  emptyHint,
  thisWeeksBriefingCompact = false,
  executedBriefingInsightIds,
  reportLibrary,
  onUpdateWidget,
  onDigitalTwinScenario,
  mainGridColumns = 2,
  modellingUi,
}: FinancePageWidgetGridProps) {
  const hydrated = hydratePlacedWidgets(widgets, reportLibrary);
  const gridCols = mainGridColumns;

  if (hydrated.length === 0) {
    return (
      <div className="rounded-[8px] border border-dashed border-gray-200 bg-gray-50/50 p-10 text-center text-sm text-gray-500">
        {emptyHint ?? 'No widgets on this page yet. Use Customize page to add widgets from the library.'}
      </div>
    );
  }

  return (
    <div className={mainGridClass(gridCols)}>
      {hydrated.map((widget) => (
        <div
          key={widget.instanceId}
          className={`bg-white rounded-[8px] shadow-sm border border-gray-200 p-6 flex flex-col hover:border-gray-300 transition-colors relative overflow-hidden ${layoutSizeToGridClass(widget.layoutSize, gridCols)}`}
        >
          {widget.id !== 'ambient_cfo' &&
            widget.id !== 'suggested_modelling' &&
            widget.id !== 'digital_twin' && (
            <div className="mb-4">
              <h3 className="text-base font-bold text-gray-900">{widget.title}</h3>
              <p className="text-xs text-gray-500 mt-0.5">{widget.desc}</p>
            </div>
          )}
          {widget.id === 'suggested_modelling' && (
            <div className="mb-4">
              <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-600 shrink-0" />
                Modelling
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">{widget.desc}</p>
            </div>
          )}
          {widget.id === EMBEDDED_REPORT_WIDGET_ID && onUpdateWidget && (
            <ReportViewToolbar
              className="mb-3"
              value={widget.reportView ?? 'chart_compact'}
              onChange={(v) => onUpdateWidget(widget.instanceId, { reportView: v })}
            />
          )}
          <div className="flex-1 text-gray-600 text-sm min-w-0">
            <FinanceWidgetContent
              id={widget.id}
              instanceId={widget.instanceId}
              onTakeAction={onTakeAction}
              onExploreData={onExploreData}
              thisWeeksBriefingCompact={thisWeeksBriefingCompact}
              executedBriefingInsightIds={executedBriefingInsightIds}
              reportName={widget.reportName}
              reportView={widget.reportView}
              onDigitalTwinScenario={onDigitalTwinScenario}
              modellingUi={widget.id === 'suggested_modelling' ? modellingUi : undefined}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

type FinancePageSidebarWidgetStackProps = {
  widgets: FinancePageWidget[];
  onTakeAction?: (insightId: string) => void;
  onExploreData?: (insightId: string) => void;
  emptyHint?: React.ReactNode;
  thisWeeksBriefingCompact?: boolean;
  executedBriefingInsightIds?: readonly BriefingInsightId[];
  reportLibrary?: readonly ReportLibraryEntry[];
  onUpdateWidget?: (instanceId: string, patch: Partial<FinancePageWidget>) => void;
  onDigitalTwinScenario?: (id: DigitalTwinScenarioId) => void;
  modellingUi?: ModellingWidgetUiBridge | null;
};

/** Single-column stack for Finances page right rail */
export function FinancePageSidebarWidgetStack({
  widgets,
  onTakeAction,
  onExploreData,
  emptyHint,
  thisWeeksBriefingCompact = false,
  executedBriefingInsightIds,
  reportLibrary,
  onUpdateWidget,
  onDigitalTwinScenario,
  modellingUi,
}: FinancePageSidebarWidgetStackProps) {
  const hydrated = hydratePlacedWidgets(widgets, reportLibrary).map((w) => ({
    ...w,
    layoutSize: 'compact' as const,
  }));

  if (hydrated.length === 0) {
    return (
      <div className="rounded-[8px] border border-dashed border-gray-200 bg-gray-50/50 p-6 text-center text-sm text-gray-500">
        {emptyHint ?? 'No sidebar widgets. Use Customize page to add widgets to this column.'}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 w-full min-w-0">
      {hydrated.map((widget) => (
        <div
          key={widget.instanceId}
          className="bg-white rounded-[8px] shadow-sm border border-gray-200 p-5 flex flex-col hover:border-gray-300 transition-colors relative overflow-hidden"
        >
          {widget.id !== 'ambient_cfo' &&
            widget.id !== 'suggested_modelling' &&
            widget.id !== 'digital_twin' && (
            <div className="mb-4">
              <h3 className="text-base font-bold text-gray-900">{widget.title}</h3>
              <p className="text-xs text-gray-500 mt-0.5">{widget.desc}</p>
            </div>
          )}
          {widget.id === 'suggested_modelling' && (
            <div className="mb-4">
              <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-600 shrink-0" />
                Modelling
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">{widget.desc}</p>
            </div>
          )}
          {widget.id === EMBEDDED_REPORT_WIDGET_ID && onUpdateWidget && (
            <ReportViewToolbar
              className="mb-3"
              value={widget.reportView ?? 'chart_compact'}
              onChange={(v) => onUpdateWidget(widget.instanceId, { reportView: v })}
            />
          )}
          <div className="flex-1 text-gray-600 text-sm min-w-0">
            <FinanceWidgetContent
              id={widget.id}
              instanceId={widget.instanceId}
              onTakeAction={onTakeAction}
              onExploreData={onExploreData}
              thisWeeksBriefingCompact={thisWeeksBriefingCompact}
              executedBriefingInsightIds={executedBriefingInsightIds}
              reportName={widget.reportName}
              reportView={widget.reportView}
              onDigitalTwinScenario={onDigitalTwinScenario}
              modellingUi={widget.id === 'suggested_modelling' ? modellingUi : undefined}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
