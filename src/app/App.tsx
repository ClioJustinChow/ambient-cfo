import React, { useState, useEffect } from 'react';
import { Toaster, toast } from 'sonner';
import { 
  LayoutDashboard, 
  CreditCard, 
  ArrowDownToLine, 
  ArrowUpFromLine, 
  Users, 
  DollarSign, 
  List, 
  Plug, 
  Settings,
  Sparkles,
  Send,
  AlertCircle,
  X,
  ChevronDown,
  CheckCircle2,
  TrendingUp,
  History,
  Info,
  Edit2,
  Wallet,
  Briefcase,
  Activity,
  BarChart3,
  PieChart,
  Target,
  Plus,
  ChevronRight,
  FileText,
  Search,
  ArrowRightLeft,
  Clock,
  BookOpen,
  Scale,
  Calendar,
  LayoutGrid,
  PanelLeftClose,
  PanelLeftOpen,
  Menu,
  TrendingDown,
  AlertTriangle,
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  Share2,
  Trash2,
  Loader2,
  Inbox,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './components/ui/dialog';
import { Input } from './components/ui/input';
import { Label } from './components/ui/label';
import { DashboardCustomizer } from './components/DashboardCustomizer';
import { BriefingSidePanel, type BriefingPanelState } from './components/BriefingSidePanel';
import { InboxPage } from './components/InboxPage';
import type { AiActivityEntry } from './types/inbox';
import { isBriefingInsightId, BRIEFING_ACTION_HEADLINE, type BriefingInsightId } from './data/briefingPanelContent';
import { BRIEFING_INSIGHT_ITEMS } from './data/briefingInsights';
import { AMBIENT_ACTIONS_HISTORY } from './data/ambientActionsHistory';
import { ReportDetail } from './components/ReportDetail';
import {
  FinancePageWidgetGrid,
  DEFAULT_FP_DEFAULT_WIDGETS,
  DEFAULT_NEW_PAGE_WIDGETS,
  type FinancePageWidget,
} from './components/financeWidgetCatalog';
import { strategicData } from './data/strategicDashboardSeed';
import { buildBriefingFinancialSnapshot } from './data/briefingFinancialImpact';
import { StrategicDashboardChartsProvider } from './context/StrategicDashboardChartsContext';

/** Custom dashboard pages under Finances (id, title, persisted widget layout). */
type FinanceCustomPage = { id: string; title: string; widgets: FinancePageWidget[] };

type ScenarioModelAction =
  | { text: string; type: 'navigate'; target: string }
  | { text: string; type: 'action'; actionName: string };

type FinancialScenarioModel = {
  id: string;
  name: string;
  description: string;
  impact: { month: string; altCash: number; altBurn: number; altRunway: number }[];
  aiAnalysis: { trend: string; insight: string; confidence: string };
  goalImpactAnalysis: string;
  recommendedActions: ScenarioModelAction[];
  /** User-created via scenario planner */
  isUserCreated?: boolean;
};

/** Build chart overlay series from baseline strategic data + burn % scenario */
function buildScenarioImpactFromBurnDelta(burnDeltaPercent: number): FinancialScenarioModel['impact'] {
  return strategicData.map((row, index) => {
    const altBurn = Math.max(35000, Math.round(row.burn * (1 + burnDeltaPercent / 100)));
    const burnDiff = altBurn - row.burn;
    const altCash = Math.round(row.cash - burnDiff * (index + 1) * 500);
    const rawRunway = altCash / altBurn;
    const altRunway = Number(Math.min(30, Math.max(8, rawRunway)).toFixed(1));
    return {
      month: row.month,
      altCash: Math.max(400000, altCash),
      altBurn: altBurn,
      altRunway,
    };
  });
}

const defaultFinancialModels: FinancialScenarioModel[] = [
  {
    id: 'hire_2',
    name: 'Hire 2 new associates',
    description: 'Increases burn by $15k/mo starting May \'26',
    impact: [
      { month: "Mar '26", altCash: 1200000, altBurn: 45000, altRunway: 26.6 },
      { month: "Apr '26", altCash: 1155000, altBurn: 48000, altRunway: 24.0 },
      { month: "May '26", altCash: 1092000, altBurn: 57000, altRunway: 19.1 },
      { month: "Jun '26", altCash: 1027000, altBurn: 65000, altRunway: 15.8 },
      { month: "Jul '26", altCash: 957000, altBurn: 70000, altRunway: 13.6 },
      { month: "Aug '26", altCash: 897000, altBurn: 60000, altRunway: 14.9 },
      { month: "Sep '26", altCash: 842000, altBurn: 55000, altRunway: 15.3 },
      { month: "Oct '26", altCash: 782000, altBurn: 60000, altRunway: 13.0 },
      { month: "Nov '26", altCash: 719000, altBurn: 63000, altRunway: 11.4 },
      { month: "Dec '26", altCash: 662000, altBurn: 57000, altRunway: 11.6 }
    ],
    aiAnalysis: {
      trend: "↓ Decreasing (was 78 days last week)",
      insight: "Based on your current spending patterns and revenue pipeline, your runway is trending downward. You're 16 days short of your Q1 goal of 90 days.",
      confidence: "High (95%) - Based on 12 months of data"
    },
    goalImpactAnalysis: "Hiring 2 associates will temporarily decrease your cash runway below the 18-month target. However, it is projected to increase billable capacity by 20% starting Q3, aligning with your Q3 Revenue Target of $500k.",
    recommendedActions: [
      { text: "Review upcoming Q2 client retainers before finalizing offers.", type: 'navigate', target: 'Funds In' },
      { text: "Consider staggered start dates (May and July) to smooth out the cash impact.", type: 'action', actionName: 'Auto-schedule start dates' }
    ]
  },
  {
    id: 'reduce_overhead',
    name: 'Reduce overhead by 5%',
    description: 'Decreases burn rate starting April \'26',
    impact: [
      { month: "Mar '26", altCash: 1200000, altBurn: 45000, altRunway: 26.6 },
      { month: "Apr '26", altCash: 1157400, altBurn: 45600, altRunway: 25.3 },
      { month: "May '26", altCash: 1117500, altBurn: 39900, altRunway: 28.0 },
      { month: "Jun '26", altCash: 1070000, altBurn: 47500, altRunway: 22.5 },
      { month: "Jul '26", altCash: 1017750, altBurn: 52250, altRunway: 19.4 },
      { month: "Aug '26", altCash: 975000, altBurn: 42750, altRunway: 22.8 },
      { month: "Sep '26", altCash: 937000, altBurn: 38000, altRunway: 24.6 },
      { month: "Oct '26", altCash: 894250, altBurn: 42750, altRunway: 20.9 },
      { month: "Nov '26", altCash: 848650, altBurn: 45600, altRunway: 18.6 },
      { month: "Dec '26", altCash: 808750, altBurn: 39900, altRunway: 20.2 }
    ],
    aiAnalysis: {
      trend: "↑ Increasing (was 24.0 months last week)",
      insight: "Trimming software subscriptions and discretionary travel by 5% extends your baseline runway by nearly 2 months by year-end, comfortably keeping you above target.",
      confidence: "Medium (75%) - Subject to variable travel costs"
    },
    goalImpactAnalysis: "This cost-saving measure strengthens your Annual Cash Flow Reserve, ensuring you maintain more than 3 months of operating expenses across the entire fiscal year.",
    recommendedActions: [
      { text: "Audit current SaaS subscriptions for redundant tools by end of March.", type: 'action', actionName: 'Start SaaS audit' },
      { text: "Implement a revised firm-wide travel policy starting April 1st.", type: 'navigate', target: 'Payroll' }
    ]
  },
  {
    id: 'salary_increase_7pct',
    name: 'Increase employee salary by 7%',
    description: 'Raises payroll-driven burn ~7% across the forecast horizon',
    impact: buildScenarioImpactFromBurnDelta(7),
    aiAnalysis: {
      trend: '↓ Pressure on runway vs baseline',
      insight:
        'A firm-wide 7% salary increase lifts monthly burn in line with payroll share of OpEx. Cash declines faster through year-end unless offset by rate, utilization, or collections.',
      confidence: 'Medium (80%) — assumes proportional payroll load; excludes one-time bonuses',
    },
    goalImpactAnalysis:
      'Higher compensation improves retention and hiring competitiveness but pulls forward cash needs. Pair with billing cadence and matter mix so runway stays aligned with your 18-month operating target.',
    recommendedActions: [
      { text: 'Model phased increases by level or office before committing firm-wide.', type: 'action', actionName: 'Open phased comp planner' },
      { text: 'Review Payroll and benefits load vs billable headcount in Funds Out.', type: 'navigate', target: 'Funds Out' },
    ],
  },
];

/** Prototype: projected horizon runway vs firm runway target (matches default model copy). */
const LINKED_MODEL_RUNWAY_TARGET_MONTHS = 18;

function linkedModelGoalProgress(m: FinancialScenarioModel): {
  percent: number;
  currentText: string;
  targetText: string;
} {
  const rows = m.impact;
  const last = rows[rows.length - 1];
  const target = LINKED_MODEL_RUNWAY_TARGET_MONTHS;
  if (!last) {
    return { percent: 0, currentText: '—', targetText: `${target} mo` };
  }
  const current = last.altRunway;
  const pct = Math.min(100, Math.max(0, Math.round((current / target) * 100)));
  return {
    percent: pct,
    currentText: `${current} mo`,
    targetText: `${target} mo`,
  };
}

type ModelFramework = 'Default' | 'Aggressive' | 'Conservative';

/** Prototype: interpret free-text scenario + framework into burn path and CFO-facing copy */
function ambientCfoInterpretScenario(scenarioSummary: string, framework: ModelFramework) {
  const frameworkBase: Record<ModelFramework, number> = {
    Default: -3,
    Aggressive: 10,
    Conservative: -8,
  };
  const t = scenarioSummary.toLowerCase();
  let adjustment = 0;
  const themes: string[] = [];

  const cues: { re: RegExp; delta: number; label: string }[] = [
    {
      re: /\b(hire|hiring|hires|add associate|add staff|headcount|new payroll|salary increase|onboard)\b/,
      delta: 5,
      label: 'workforce expansion',
    },
    {
      re: /\b(freeze hiring|pause hire|delay hire|defer hire|push hire|postpone start)\b|\b(delay|defer|postpone)\b.{0,40}\b(hire|start|onboard)\b/,
      delta: -4,
      label: 'delayed or frozen hiring',
    },
    {
      re: /\b(cut|reduce|trim|lower|decrease|save|efficien|overhead|discretionary|opex|op ex)\b/,
      delta: -4,
      label: 'cost reduction',
    },
    {
      re: /\b(marketing|growth invest|expansion|new office|lateral hire)\b/,
      delta: 3,
      label: 'growth spend',
    },
    {
      re: /\b(collection|a\/?r|receivable|billing|invoice|cash in|payment|matter)\b/,
      delta: -2,
      label: 'collections / revenue timing',
    },
    {
      re: /\b(partner|merger|acquisition|m&a)\b/,
      delta: 4,
      label: 'structural / senior growth',
    },
  ];

  for (const { re, delta, label } of cues) {
    if (re.test(t)) {
      adjustment += delta;
      if (!themes.includes(label)) themes.push(label);
    }
  }

  let burnDeltaPercent = frameworkBase[framework] + adjustment;
  burnDeltaPercent = Math.round(Math.min(25, Math.max(-25, burnDeltaPercent)));

  const themePhrase =
    themes.length > 0
      ? themes.slice(0, 3).join(', ')
      : 'general narrative (framework-led)';

  const shortScenario =
    scenarioSummary.length > 140 ? `${scenarioSummary.slice(0, 140)}…` : scenarioSummary;

  const cardDescription = `Ambient CFO · ${themePhrase}`;

  const insight = `Ambient CFO read your scenario and combined it with the ${framework} framework. Detected themes: ${themePhrase}. That maps to a modeled burn path of ${burnDeltaPercent > 0 ? '+' : ''}${burnDeltaPercent}% vs baseline on the strategic charts. Your description: "${shortScenario}"`;

  const goalImpact = `This model translates your wording into cash, burn, and runway stress. ${burnDeltaPercent > 0 ? 'Net spend pressure tightens runway—pair hiring or growth moves with collections and timing.' : 'Net spend relief extends runway—sanity-check which cost levers in your text are committed vs aspirational.'}`;

  const extraAction = themes[0]
    ? `Double-check assumptions around "${themes[0]}" with finance before you rely on this overlay.`
    : 'Add more specifics (hiring, cuts, timing) so Ambient CFO can tighten the scenario next time.';

  return {
    burnDeltaPercent,
    cardDescription,
    insight,
    goalImpact,
    extraAction,
  };
}

function createUserFinancialModel(input: {
  name: string;
  scenarioSummary: string;
  burnDeltaPercent: number;
  ambient?: {
    cardDescription: string;
    insight: string;
    goalImpact: string;
    extraAction: string;
  };
}): FinancialScenarioModel {
  const { name, scenarioSummary, burnDeltaPercent, ambient } = input;
  const id = `scenario_${crypto.randomUUID()}`;
  const impact = buildScenarioImpactFromBurnDelta(burnDeltaPercent);
  const worsening = burnDeltaPercent > 0;
  const desc =
    ambient?.cardDescription ?? (scenarioSummary.trim() || 'Custom scenario model');
  const insightBody =
    ambient?.insight ??
    `Your scenario: ${scenarioSummary.trim() || 'Custom assumptions'}. Modelling applies ${burnDeltaPercent > 0 ? '+' : ''}${burnDeltaPercent}% burn vs baseline across the forecast horizon, updating projected cash and runway each month.`;
  const goalBody =
    ambient?.goalImpact ??
    `This custom model stress-tests "${name.trim() || 'your scenario'}" against your current strategic baseline. ${worsening ? 'Higher burn pulls forward cash needs and compresses runway; align hiring and collections timing if you pursue this path.' : 'Lower burn extends runway and can accelerate reserve or growth goals—confirm which levers (headcount, discretionary spend, billing) actually move.'}`;

  const recommendedActions: FinancialScenarioModel['recommendedActions'] = [
    ...(ambient
      ? [
          {
            text: ambient.extraAction,
            type: 'action' as const,
            actionName: 'Follow-up noted',
          },
        ]
      : []),
    {
      text: 'Save written assumptions and share with leadership for sign-off.',
      type: 'action',
      actionName: 'Scenario notes saved',
    },
    {
      text: 'Compare cash timing against live transactions for the next close.',
      type: 'navigate',
      target: 'Transactions',
    },
  ];

  return {
    id,
    name: name.trim() || 'Untitled scenario',
    description: desc,
    impact,
    isUserCreated: true,
    aiAnalysis: {
      trend: worsening
        ? '↓ Runway pressure vs baseline'
        : '↑ Runway cushion vs baseline',
      insight: insightBody,
      confidence: 'Interpreted from your scenario — validate with finance before decisions',
    },
    goalImpactAnalysis: goalBody,
    recommendedActions,
  };
}

type DashboardPresence = 'collaborating' | 'viewing' | 'idle';

/** People with access to the 2026 Strategic Roadmap + mock live presence */
const STRATEGIC_DASHBOARD_ACCESS: {
  id: string;
  name: string;
  initials: string;
  avatarClass: string;
  presence: DashboardPresence;
}[] = [
  { id: '1', name: 'Sarah Kim', initials: 'SK', avatarClass: 'bg-violet-600 text-white', presence: 'collaborating' },
  { id: '2', name: 'Michael Torres', initials: 'MT', avatarClass: 'bg-sky-600 text-white', presence: 'viewing' },
  { id: '3', name: 'Jennifer Hartwell', initials: 'JH', avatarClass: 'bg-emerald-600 text-white', presence: 'viewing' },
  { id: '4', name: 'David Okonkwo', initials: 'DO', avatarClass: 'bg-slate-500 text-white', presence: 'idle' },
];

function strategicDashboardPresenceLabel(p: DashboardPresence) {
  if (p === 'collaborating') return 'Collaborating on this dashboard';
  if (p === 'viewing') return 'Viewing this dashboard now';
  return 'Has access · not on this page now';
}

type NavSubItem = {
  name: string;
  label?: string;
  icon: LucideIcon;
  isAction?: boolean;
};

type NavItem = {
  name: string;
  icon: LucideIcon;
  subItems?: NavSubItem[];
};

export default function App() {
  const [activePage, setActivePage] = useState('Dashboard');
  const [reportsViewMode, setReportsViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedReport, setSelectedReport] = useState<string | null>(null);
  const [briefingPanel, setBriefingPanel] = useState<BriefingPanelState>(null);
  /** Cumulative briefing plans executed via Take Action → updates charts + widget data */
  const [executedBriefingPlans, setExecutedBriefingPlans] = useState<BriefingInsightId[]>([]);
  const [dismissedAmbientHistoryIds, setDismissedAmbientHistoryIds] = useState<string[]>([]);
  const [aiActivityLog, setAiActivityLog] = useState<AiActivityEntry[]>([]);
  const [showMorePlans, setShowMorePlans] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [isExecuting, setIsExecuting] = useState(false);
  const [hasExecuted, setHasExecuted] = useState(false);
  const [isFinancesOpen, setIsFinancesOpen] = useState(true);
  const [selectedModelId, setSelectedModelId] = useState<string | null>(null);
  /** Model ids promoted from Modelling → Financial Goals (order preserved) */
  const [financialGoalModelIds, setFinancialGoalModelIds] = useState<string[]>([]);
  const [userFinancialModels, setUserFinancialModels] = useState<FinancialScenarioModel[]>([]);
  const [createModelDialogOpen, setCreateModelDialogOpen] = useState(false);
  const [newModelName, setNewModelName] = useState('');
  const [newModelScenario, setNewModelScenario] = useState('');
  const [newModelFramework, setNewModelFramework] = useState<ModelFramework>('Default');
  const [isCreateModelProcessing, setIsCreateModelProcessing] = useState(false);
  const createModelAbortRef = React.useRef(false);
  const [chatHistory, setChatHistory] = useState<{role: 'user' | 'ai', content: string}[]>([]);
  const [financeCustomPages, setFinanceCustomPages] = useState<FinanceCustomPage[]>([
    { id: 'fp_default', title: '2026 Strategic Roadmap', widgets: DEFAULT_FP_DEFAULT_WIDGETS },
  ]);
  type CustomizerContext = { mode: 'create' } | { mode: 'edit'; pageId: string };
  const [customizerContext, setCustomizerContext] = useState<CustomizerContext | null>(null);
  const [customizerMountId, setCustomizerMountId] = useState(0);

  const beginCustomize = (ctx: CustomizerContext) => {
    setCustomizerMountId((n) => n + 1);
    setCustomizerContext(ctx);
  };
  const isCustomizing = customizerContext !== null;

  const pushAiActivity = React.useCallback((entry: Omit<AiActivityEntry, 'id' | 'at'>) => {
    setAiActivityLog((prev) => {
      const row: AiActivityEntry = {
        id: `act_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
        at: Date.now(),
        ...entry,
      };
      return [row, ...prev].slice(0, 50);
    });
  }, []);

  const notificationBadgeCount = React.useMemo(() => {
    const briefingPending = BRIEFING_INSIGHT_ITEMS.filter((i) => !executedBriefingPlans.includes(i.id)).length;
    const historyPending = AMBIENT_ACTIONS_HISTORY.filter((n) => !dismissedAmbientHistoryIds.includes(n.id)).length;
    return briefingPending + historyPending;
  }, [executedBriefingPlans, dismissedAmbientHistoryIds]);

  /** Total rows in Inbox list (briefing + history + activity) — matches InboxPage merged list */
  const inboxListItemCount = React.useMemo(() => {
    const briefingCount = BRIEFING_INSIGHT_ITEMS.filter((i) => !executedBriefingPlans.includes(i.id)).length;
    const historyCount = AMBIENT_ACTIONS_HISTORY.filter((n) => !dismissedAmbientHistoryIds.includes(n.id)).length;
    return briefingCount + historyCount + aiActivityLog.length;
  }, [executedBriefingPlans, dismissedAmbientHistoryIds, aiActivityLog]);

  const activeFinancePage = financeCustomPages.find((p) => p.id === activePage);
  const isFinanceCustomPageView = Boolean(activeFinancePage);

  const allFinancialModels = React.useMemo(
    () => [...defaultFinancialModels, ...userFinancialModels],
    [userFinancialModels],
  );

  const briefingFinancialSnapshot = React.useMemo(
    () => buildBriefingFinancialSnapshot(executedBriefingPlans),
    [executedBriefingPlans],
  );

  const displayStrategicData = React.useMemo(() => {
    return briefingFinancialSnapshot.strategicRows.map((data, index) => {
      if (selectedModelId) {
        const modelData = allFinancialModels.find((m) => m.id === selectedModelId)?.impact[index];
        return { ...data, ...modelData };
      }
      return data;
    });
  }, [briefingFinancialSnapshot.strategicRows, selectedModelId, allFinancialModels]);

  const financialGoalsLinkedModels = React.useMemo(
    () =>
      financialGoalModelIds
        .map((id) => allFinancialModels.find((m) => m.id === id))
        .filter((m): m is FinancialScenarioModel => Boolean(m)),
    [financialGoalModelIds, allFinancialModels],
  );

  const addModelToFinancialGoals = (modelId: string) => {
    if (financialGoalModelIds.includes(modelId)) {
      toast.message('This model is already in Financial Goals');
      return;
    }
    setFinancialGoalModelIds((prev) => [...prev, modelId]);
    toast.success('Model added to Financial Goals');
    const m = allFinancialModels.find((x) => x.id === modelId);
    pushAiActivity({
      kind: 'model_added_to_goals',
      title: 'Added model to Financial Goals',
      detail: m?.name ?? 'Scenario model',
    });
    setActivePage('Financial Goals');
  };

  const removeModelFromFinancialGoals = (modelId: string) => {
    setFinancialGoalModelIds((prev) => prev.filter((id) => id !== modelId));
    toast.success('Removed from Financial Goals');
  };

  const [isNavCollapsed, setIsNavCollapsed] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [shareEmailInput, setShareEmailInput] = useState('');
  const [newInvitePermission, setNewInvitePermission] = useState<'collaborator' | 'viewer'>('viewer');
  const [shareInvitees, setShareInvitees] = useState<{ id: string; email: string; permission: 'collaborator' | 'viewer' }[]>([]);
  const [sharedDashboardUsers, setSharedDashboardUsers] = useState<
    { id: string; email: string; permission: 'collaborator' | 'viewer' }[]
  >([
    { id: 'shared-1', email: 'partner@hartwellmorris.com', permission: 'collaborator' },
    { id: 'shared-2', email: 'cfo@hartwellmorris.com', permission: 'viewer' },
    { id: 'shared-3', email: 'controller@hartwellmorris.com', permission: 'viewer' },
  ]);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const onChange = () => {
      if (mq.matches) setMobileNavOpen(false);
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const closeMobileNav = () => {
    if (window.innerWidth < 768) setMobileNavOpen(false);
  };

  const addShareInvitee = () => {
    const email = shareEmailInput.trim();
    if (!email) {
      toast.error('Enter an email address');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error('Enter a valid email address');
      return;
    }
    if (shareInvitees.some((i) => i.email.toLowerCase() === email.toLowerCase())) {
      toast.error('That email is already on the invite list');
      return;
    }
    if (sharedDashboardUsers.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
      toast.error('That person already has access — edit their permission below');
      return;
    }
    setShareInvitees((prev) => [
      ...prev,
      { id: crypto.randomUUID(), email, permission: newInvitePermission },
    ]);
    setShareEmailInput('');
  };

  const updateInviteePermission = (id: string, permission: 'collaborator' | 'viewer') => {
    setShareInvitees((prev) => prev.map((i) => (i.id === id ? { ...i, permission } : i)));
  };

  const removeShareInvitee = (id: string) => {
    setShareInvitees((prev) => prev.filter((i) => i.id !== id));
  };

  const updateSharedUserPermission = (id: string, permission: 'collaborator' | 'viewer') => {
    setSharedDashboardUsers((prev) => prev.map((u) => (u.id === id ? { ...u, permission } : u)));
  };

  const removeSharedUser = (id: string) => {
    setSharedDashboardUsers((prev) => prev.filter((u) => u.id !== id));
  };

  const handleShareDashboardSubmit = () => {
    if (shareInvitees.length > 0) {
      setSharedDashboardUsers((prev) => [
        ...prev,
        ...shareInvitees.map((inv) => ({
          id: crypto.randomUUID(),
          email: inv.email,
          permission: inv.permission,
        })),
      ]);
      toast.success(
        `Added ${shareInvitees.length} ${shareInvitees.length === 1 ? 'person' : 'people'}. They’ll receive an invite.`,
      );
      setShareInvitees([]);
      setShareEmailInput('');
    } else {
      toast.success('Sharing settings saved');
    }
    setShareDialogOpen(false);
  };

  const permissionToggleClass = (active: boolean) =>
    `flex-1 rounded-md px-3 py-1.5 text-xs font-medium transition-all ${
      active ? 'bg-white text-gray-900 shadow-sm border border-gray-200' : 'text-gray-600 hover:text-gray-900'
    }`;

  const [availableReports, setAvailableReports] = useState([
    { name: 'Profit and Loss', desc: 'Income, expenses, and net profit over a specific time period.', icon: Activity, color: 'text-blue-600', bg: 'bg-blue-50' },
    { name: 'Balance Sheet', desc: 'A snapshot of your firm\'s assets, liabilities, and equity.', icon: LayoutDashboard, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { name: 'Cash Flow Statement', desc: 'Cash entering and leaving your business over time.', icon: ArrowRightLeft, color: 'text-green-600', bg: 'bg-green-50' },
    { name: 'A/R Aging', desc: 'Unpaid client invoices grouped by how long they\'ve been open.', icon: Clock, color: 'text-orange-600', bg: 'bg-orange-50' },
    { name: 'A/P Aging', desc: 'Outstanding bills your firm owes to vendors and suppliers.', icon: CreditCard, color: 'text-red-600', bg: 'bg-red-50' },
    { name: 'General Ledger', desc: 'A complete record of all financial transactions.', icon: BookOpen, color: 'text-purple-600', bg: 'bg-purple-50' },
    { name: 'Trial Balance', desc: 'Closing balances of all ledger accounts at a point in time.', icon: Scale, color: 'text-teal-600', bg: 'bg-teal-50' },
    { name: 'Expense by Category', desc: 'Detailed breakdown of where your money is being spent.', icon: PieChart, color: 'text-cyan-600', bg: 'bg-cyan-50' },
    { name: 'Revenue by Practice Area', desc: 'Income grouped by legal service type or department.', icon: Briefcase, color: 'text-amber-600', bg: 'bg-amber-50' },
  ]);

  const reportLibraryForFinance = React.useMemo(
    () => availableReports.map((r) => ({ name: r.name, desc: r.desc, icon: r.icon })),
    [availableReports],
  );

  const brandColor = "#0069D1";

  const handleChatSubmit = (query?: string) => {
    const textToSubmit = query || chatInput;
    if (!textToSubmit.trim()) return;

    pushAiActivity({
      kind: 'chat_submitted',
      title: 'Ambient CFO query',
      detail: textToSubmit.length > 100 ? `${textToSubmit.slice(0, 100)}…` : textToSubmit,
    });

    const newUserMsg = { role: 'user' as const, content: textToSubmit };
    setChatHistory(prev => [...prev, newUserMsg]);
    setChatInput("");
    setShowSuggestions(false);

    // Initial loading indicator message
    const loadingMsgId = Date.now().toString();
    setChatHistory(prev => [...prev, { role: 'ai', content: '...', id: loadingMsgId } as any]);

    // Mock AI response delay
    setTimeout(() => {
      const lowerQuery = textToSubmit.toLowerCase();
      
      // Heuristic to detect if user is asking for a new report
      if (lowerQuery.includes('report') && (lowerQuery.includes('create') || lowerQuery.includes('generate') || lowerQuery.includes('build'))) {
        // Extract a sensible name or fallback to "Runway Analysis" for the prompt's example
        let reportName = "Custom Analysis Report";
        let reportDesc = "A custom report generated based on your request.";
        let reportIcon = FileText;
        
        if (lowerQuery.includes('runway')) {
          reportName = "Runway Analysis";
          reportDesc = "Detailed forecast of cash runway and burn rate projections.";
          reportIcon = TrendingDown;
        } else if (lowerQuery.includes('expense') || lowerQuery.includes('spend')) {
          reportName = "Expense Deep Dive";
          reportDesc = "Granular view of categorized expenses over time.";
          reportIcon = PieChart;
        }

        const newReport = {
          name: reportName,
          desc: reportDesc,
          icon: reportIcon,
          color: 'text-indigo-600',
          bg: 'bg-indigo-50'
        };

        setAvailableReports(prev => [newReport, ...prev]);

        setChatHistory(prev => prev.map(msg => 
          (msg as any).id === loadingMsgId 
            ? { role: 'ai' as const, content: `I've generated a new "${reportName}" for you. You can find it in the Reports tab.` } 
            : msg
        ));
      } else {
        setChatHistory(prev => prev.map(msg => 
          (msg as any).id === loadingMsgId 
            ? { role: 'ai' as const, content: `I've analyzed your request regarding "${textToSubmit}". Based on our current financial models, making this adjustment would initially increase operating expenses, but is projected to yield a positive ROI within 4-6 months. Would you like me to create a detailed projection model for this scenario?` } 
            : msg
        ));
      }
    }, 1500);
  };

  const submitCreateFinancialModel = () => {
    const name = newModelName.trim();
    const scenario = newModelScenario.trim();
    if (!name) {
      toast.error('Enter a model name');
      return;
    }
    if (!scenario) {
      toast.error('Describe your scenario');
      return;
    }
    if (isCreateModelProcessing) return;

    createModelAbortRef.current = false;
    setIsCreateModelProcessing(true);

    const delayMs = 1400 + Math.floor(Math.random() * 500);
    window.setTimeout(() => {
      if (createModelAbortRef.current) {
        setIsCreateModelProcessing(false);
        return;
      }

      const interpreted = ambientCfoInterpretScenario(scenario, newModelFramework);
      const model = createUserFinancialModel({
        name,
        scenarioSummary: scenario,
        burnDeltaPercent: interpreted.burnDeltaPercent,
        ambient: {
          cardDescription: interpreted.cardDescription,
          insight: interpreted.insight,
          goalImpact: interpreted.goalImpact,
          extraAction: interpreted.extraAction,
        },
      });
      setUserFinancialModels((prev) => [...prev, model]);
      setCreateModelDialogOpen(false);
      setNewModelName('');
      setNewModelScenario('');
      setNewModelFramework('Default');
      setIsCreateModelProcessing(false);
      toast.success('Ambient CFO built your scenario model — Preview or add it to Financial Goals');
      pushAiActivity({
        kind: 'model_created',
        title: 'Built scenario model',
        detail: name,
      });
    }, delayMs);
  };

  const suggestedQuestions = [
    "What's our projected runway?",
    "How can we reduce overhead by 5%?",
    "Which clients have the oldest A/R?",
    "Model hiring 2 new associates",
    "What was last month's profit margin?"
  ];

  // Sidebar Navigation Items matching the provided reference image
  const navItems = React.useMemo((): NavItem[] => [
      { name: 'Dashboard', icon: LayoutDashboard },
      { name: 'Inbox', icon: Inbox },
      { name: 'Transactions', icon: CreditCard },
      { name: 'Funds In', icon: ArrowDownToLine },
      { name: 'Funds Out', icon: ArrowUpFromLine },
      { name: 'Payroll', icon: Users },
      {
        name: 'Finances',
        icon: DollarSign,
        subItems: [
          ...financeCustomPages.map((p) => ({
            name: p.id,
            label: p.title,
            icon: LayoutDashboard,
          })),
          { name: 'Reports', icon: FileText },
          { name: 'Financial Goals', icon: Target },
          { name: 'Add a new page', icon: Plus, isAction: true },
        ],
      },
      { name: 'Chart of Accounts', icon: List },
      { name: 'Connections', icon: Plug },
    ],
    [financeCustomPages],
  );

  const handleExecute = React.useCallback(() => {
    const panel = briefingPanel;
    const insightToApply =
      panel?.mode === 'takeAction' && isBriefingInsightId(panel.insightId) ? panel.insightId : null;
    setIsExecuting(true);
    window.setTimeout(() => {
      setIsExecuting(false);
      setHasExecuted(true);
      if (insightToApply) {
        setExecutedBriefingPlans((prev) =>
          prev.includes(insightToApply) ? prev : [...prev, insightToApply],
        );
        toast.success('Plan applied — your dashboards now reflect this change.');
        pushAiActivity({
          kind: 'briefing_plan_executed',
          title: 'Executed suggested action',
          detail: BRIEFING_ACTION_HEADLINE[insightToApply],
        });
      }
      window.setTimeout(() => {
        setBriefingPanel(null);
        setHasExecuted(false);
      }, 1500);
    }, 2000);
  }, [briefingPanel, pushAiActivity]);

  const resolveBriefingInsightId = (id: string): BriefingInsightId =>
    isBriefingInsightId(id) ? id : 'insight-1';

  const globalSearchResults = React.useMemo(() => {
    if (!chatInput.trim()) return [];
    
    const query = chatInput.toLowerCase();
    const results: { title: string; subtitle: string; type: 'page' | 'report'; icon: any; action: () => void }[] = [];
    
    // Search pages
    const extractPages = (items: any[]) => {
      items.forEach((item) => {
        if (item.subItems) {
          if (item.name.toLowerCase().includes(query)) {
            results.push({
              title: item.name,
              subtitle: 'Page',
              type: 'page',
              icon: item.icon,
              action: () => {
                setActivePage(item.name);
                setSelectedReport(null);
              },
            });
          }
          extractPages(item.subItems);
        } else {
          if (item.isAction) return;
          const display = item.label ?? item.name;
          if (display.toLowerCase().includes(query) || item.name.toLowerCase().includes(query)) {
            results.push({
              title: display,
              subtitle: 'Page',
              type: 'page',
              icon: item.icon,
              action: () => {
                setActivePage(item.name);
                setSelectedReport(null);
              },
            });
          }
        }
      });
    };
    extractPages(navItems);
    
    // Search reports
    availableReports.forEach(report => {
      if (report.name.toLowerCase().includes(query) || report.desc.toLowerCase().includes(query)) {
        results.push({
          title: report.name,
          subtitle: 'Report',
          type: 'report',
          icon: report.icon,
          action: () => {
            setActivePage('Reports');
            setSelectedReport(report.name);
          }
        });
      }
    });
    
    return results;
  }, [chatInput, availableReports, navItems]);

  return (
    <div className="flex h-screen bg-[#F9FAFB] font-sans text-gray-900 overflow-hidden">
      <Toaster position="bottom-right" richColors />

      {/* Mobile: open nav from menu; desktop: sidebar always visible */}
      {mobileNavOpen && (
        <button
          type="button"
          className="fixed inset-0 z-30 bg-black/40 md:hidden"
          aria-label="Close menu"
          onClick={() => setMobileNavOpen(false)}
        />
      )}

      <button
        type="button"
        className="md:hidden fixed top-3 left-3 z-20 flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-700 shadow-sm hover:bg-gray-50"
        aria-label="Open menu"
        onClick={() => {
          setIsNavCollapsed(false);
          setMobileNavOpen(true);
        }}
      >
        <Menu className="h-5 w-5" strokeWidth={1.5} />
      </button>
      
      {/* LEFT NAVIGATION SIDEBAR — was hidden below md; now drawer on mobile */}
      <aside
        className={`bg-white border-r border-[#e5e7eb] flex-col shrink-0 transition-all duration-300 relative
          fixed inset-y-0 left-0 z-40 md:relative md:z-10 md:translate-x-0
          ${mobileNavOpen ? 'translate-x-0 shadow-xl' : '-translate-x-full'}
          md:flex md:shadow-none
          ${isNavCollapsed ? 'w-[72px]' : 'w-[239px]'}`}
      >
        
        {/* Collapse Toggle (desktop only — mobile uses full labels) */}
        <button 
          onClick={() => setIsNavCollapsed(!isNavCollapsed)}
          className="hidden md:flex absolute -right-3.5 top-[35px] bg-white border border-gray-200 rounded-full p-1.5 shadow-sm hover:bg-gray-50 text-gray-500 z-50 transition-colors"
          title={isNavCollapsed ? "Expand navigation" : "Collapse navigation"}
        >
          {isNavCollapsed ? <PanelLeftOpen className="w-3.5 h-3.5" /> : <PanelLeftClose className="w-3.5 h-3.5" />}
        </button>

        <div className="border-b border-[#e5e7eb] pt-[21px] pb-[21px] flex flex-col justify-center min-h-[88.5px] shrink-0 transition-all duration-300">
          <div className="flex md:hidden items-center justify-between px-[21px] gap-3">
            <h1 className="font-semibold text-[#101828] text-[21px] leading-[31.5px] tracking-[-0.3589px]">Clio Accounting</h1>
            <button
              type="button"
              className="shrink-0 rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900"
              aria-label="Close menu"
              onClick={() => setMobileNavOpen(false)}
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className={`hidden md:flex flex-col justify-center h-full ${isNavCollapsed ? 'px-0 items-center' : 'px-[21px]'}`}>
            {isNavCollapsed ? (
              <div className="w-8 h-8 bg-blue-600 rounded-[8px] flex items-center justify-center text-white font-bold text-lg shrink-0">C</div>
            ) : (
              <div className="animate-in fade-in duration-300">
                <h1 className="font-semibold text-[#101828] text-[21px] leading-[31.5px] tracking-[-0.3589px] whitespace-nowrap">Clio Accounting</h1>
              </div>
            )}
          </div>
        </div>
        
        <nav className={`flex-1 pt-[14px] space-y-[3.5px] overflow-y-auto custom-scrollbar overflow-x-hidden ${isNavCollapsed ? 'px-[12px]' : 'px-[10.5px]'}`}>
          {navItems.map((item) => (
            <div key={item.name} className="flex flex-col">
              <a
                href="#"
                onClick={(e) => { 
                  e.preventDefault(); 
                  if (item.subItems && !isNavCollapsed) {
                    setIsFinancesOpen(!isFinancesOpen); 
                  } else if (item.subItems && isNavCollapsed) {
                    setIsNavCollapsed(false);
                    setIsFinancesOpen(true);
                  } else {
                    setActivePage(item.name);
                    closeMobileNav();
                  }
                }}
                className={`flex items-center rounded-[8px] transition-all group ${
                  isNavCollapsed ? 'justify-center h-[40px] w-[48px]' : 'justify-between h-[31.5px] px-[10.5px]'
                } ${
                  activePage === item.name || (isNavCollapsed && item.subItems?.some(s => s.name === activePage))
                    ? 'bg-[#f3f4f6] text-[#101828]' 
                    : 'text-[#364153] hover:bg-[#f3f4f6]'
                }`}
                title={
                  isNavCollapsed
                    ? item.name === 'Inbox'
                      ? `Inbox (${inboxListItemCount})`
                      : item.name
                    : undefined
                }
              >
                <div className="flex items-center gap-[10.5px] justify-center min-w-0">
                  {isNavCollapsed && item.name === 'Inbox' ? (
                    <div className="relative flex h-[31.5px] w-[48px] shrink-0 items-center justify-center">
                      <item.icon
                        className={`w-[17.5px] h-[17.5px] shrink-0 ${
                          activePage === item.name
                            ? 'text-[#101828]'
                            : 'text-[#364153] group-hover:text-[#101828]'
                        }`}
                        strokeWidth={1.5}
                      />
                      {inboxListItemCount > 0 ? (
                        <span
                          className="absolute right-1 top-1 flex h-[15px] min-w-[15px] items-center justify-center rounded-full bg-blue-600 px-0.5 text-[9px] font-bold leading-none text-white tabular-nums"
                          aria-hidden
                        >
                          {inboxListItemCount > 9 ? '9+' : inboxListItemCount}
                        </span>
                      ) : null}
                    </div>
                  ) : (
                    <item.icon 
                      className={`w-[17.5px] h-[17.5px] shrink-0 ${
                        activePage === item.name || (isNavCollapsed && item.subItems?.some(s => s.name === activePage)) 
                          ? 'text-[#101828]' 
                          : 'text-[#364153] group-hover:text-[#101828]'
                      }`} 
                      strokeWidth={1.5} 
                    />
                  )}
                  {!isNavCollapsed && (
                    <span className="font-medium text-[12.25px] leading-[17.5px] whitespace-nowrap animate-in fade-in duration-300">
                      {item.name}
                    </span>
                  )}
                </div>
                {!isNavCollapsed && item.name === 'Inbox' && (
                  <span
                    className="shrink-0 tabular-nums text-[11px] font-semibold text-[#6a7282] min-w-[1.25rem] text-right"
                    aria-label={`${inboxListItemCount} inbox items`}
                  >
                    {inboxListItemCount}
                  </span>
                )}
                {!isNavCollapsed && item.subItems && (
                  <ChevronDown className={`w-[14px] h-[14px] shrink-0 text-[#6a7282] transition-transform ${!isFinancesOpen ? '-rotate-90' : ''}`} strokeWidth={1.5} />
                )}
              </a>
              
              {!isNavCollapsed && item.subItems && isFinancesOpen && (
                <div className="flex flex-col mt-[3.5px] space-y-[3.5px] animate-in slide-in-from-top-1 fade-in duration-200">
                  {item.subItems.map((subItem) => (
                    <a
                      key={subItem.name}
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        if (!subItem.isAction) {
                          setActivePage(subItem.name);
                          if (subItem.name === 'Reports') {
                            setSelectedReport(null);
                          }
                          closeMobileNav();
                        } else if (subItem.name === 'Add a new page') {
                          beginCustomize({ mode: 'create' });
                          closeMobileNav();
                        }
                      }}
                      className={`flex items-center h-[31.5px] rounded-[8px] pl-[38.5px] pr-[10.5px] gap-[10.5px] transition-all group ${
                        activePage === subItem.name 
                          ? 'bg-[#f3f4f6] text-[#101828]' 
                          : 'text-[#364153] hover:bg-[#f3f4f6]'
                      }`}
                    >
                      <subItem.icon 
                        className={`w-[17.5px] h-[17.5px] shrink-0 ${activePage === subItem.name ? 'text-[#101828]' : subItem.isAction ? 'text-[#6a7282] group-hover:text-[#101828]' : 'text-[#364153] group-hover:text-[#101828]'}`} 
                        strokeWidth={1.5} 
                      />
                      <span className={`font-medium text-[12.25px] leading-[17.5px] whitespace-nowrap ${subItem.isAction ? 'text-[#6a7282] group-hover:text-[#101828]' : ''}`}>
                        {(subItem as { label?: string }).label ?? subItem.name}
                      </span>
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className={`shrink-0 border-t border-[#e5e7eb] pt-[15px] ${isNavCollapsed ? 'px-[12px] pb-[15px]' : 'px-[14px] pb-[12px]'}`}>
          <div className={`flex flex-col ${isNavCollapsed ? 'items-center gap-[6px]' : 'gap-[6px]'}`}>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setActivePage('User Profile');
                closeMobileNav();
              }}
              className={`flex items-center rounded-[8px] gap-[10.5px] hover:bg-[#f3f4f6] transition-colors group ${
                isNavCollapsed ? 'justify-center h-[40px] w-[48px]' : 'h-[40px] px-[10.5px]'
              }`}
              title={isNavCollapsed ? 'User Profile' : undefined}
            >
              <div className="w-[21px] h-[21px] rounded-full bg-blue-50 border border-blue-100 text-blue-700 flex items-center justify-center text-[10px] font-bold shrink-0">
                JC
              </div>
              {!isNavCollapsed && (
                <div className="min-w-0 animate-in fade-in duration-300">
                  <p className="text-[12.25px] leading-[15px] font-semibold text-[#101828] truncate">Justin Chow</p>
                </div>
              )}
            </a>

            <a 
              href="#"
              className={`flex items-center rounded-[8px] gap-[10.5px] hover:bg-[#f3f4f6] transition-colors group ${
                isNavCollapsed ? 'justify-center h-[40px] w-[48px]' : 'h-[31.5px] px-[10.5px]'
              }`}
              title={isNavCollapsed ? "Settings" : undefined}
            >
              <Settings className="w-[17.5px] h-[17.5px] text-[#364153] group-hover:text-[#101828] shrink-0" strokeWidth={1.5} />
              {!isNavCollapsed && (
                <span className="font-medium text-[#364153] text-[12.25px] leading-[17.5px] group-hover:text-[#101828] whitespace-nowrap animate-in fade-in duration-300">Settings</span>
              )}
            </a>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA — top padding on small screens for menu button */}
      <main
        className={`flex-1 relative custom-scrollbar bg-gray-50/30 pt-14 md:pt-0 ${
          activePage === 'Inbox'
            ? 'flex flex-col min-h-0 overflow-hidden'
            : 'overflow-y-auto'
        }`}
      >
        {isCustomizing && customizerContext ? (
          <DashboardCustomizer
            key={`dashboard-customizer-${customizerMountId}`}
            reportLibrary={reportLibraryForFinance}
            executedBriefingInsightIds={executedBriefingPlans}
            mode={customizerContext.mode}
            onClose={() => setCustomizerContext(null)}
            dashboardTitle={
              customizerContext.mode === 'edit'
                ? financeCustomPages.find((p) => p.id === customizerContext.pageId)?.title ?? ''
                : ''
            }
            initialWidgets={
              customizerContext.mode === 'create'
                ? DEFAULT_NEW_PAGE_WIDGETS
                : financeCustomPages.find((p) => p.id === customizerContext.pageId)?.widgets ?? []
            }
            onSaveDashboard={(title, widgets) => {
              const t = title.trim() || 'Untitled dashboard';
              if (customizerContext.mode === 'create') {
                const id = `fp_${crypto.randomUUID().replace(/-/g, '').slice(0, 12)}`;
                setFinanceCustomPages((prev) => [...prev, { id, title: t, widgets }]);
                setActivePage(id);
                toast.success('New page added under Finances');
                pushAiActivity({
                  kind: 'dashboard_saved',
                  title: 'Created Finances page',
                  detail: t,
                });
              } else {
                const pid = customizerContext.pageId;
                setFinanceCustomPages((prev) =>
                  prev.map((p) => (p.id === pid ? { ...p, title: t, widgets } : p)),
                );
                toast.success('Dashboard updated');
                pushAiActivity({
                  kind: 'dashboard_saved',
                  title: 'Updated dashboard layout',
                  detail: t,
                });
              }
              setCustomizerContext(null);
            }}
            onDeleteDashboard={() => {
              if (customizerContext.mode !== 'edit') return;
              const pid = customizerContext.pageId;
              const deletedTitle =
                financeCustomPages.find((p) => p.id === pid)?.title ?? 'Dashboard';
              setFinanceCustomPages((prev) => prev.filter((p) => p.id !== pid));
              setSharedDashboardUsers([]);
              setCustomizerContext(null);
              setActivePage('Dashboard');
              toast.success('Dashboard permanently deleted');
              pushAiActivity({
                kind: 'dashboard_deleted',
                title: 'Deleted dashboard',
                detail: deletedTitle,
              });
            }}
            onTakeAction={(insightId) => {
              setShowMorePlans(false);
              setHasExecuted(false);
              setBriefingPanel({ mode: 'takeAction', insightId: resolveBriefingInsightId(insightId) });
              setCustomizerContext(null);
            }}
            onExploreData={(insightId) => {
              setBriefingPanel({ mode: 'explore', insightId: resolveBriefingInsightId(insightId) });
              setCustomizerContext(null);
            }}
          />
        ) : activePage === 'Inbox' ? (
          <InboxPage
            executedBriefingInsightIds={executedBriefingPlans}
            dismissedAmbientHistoryIds={dismissedAmbientHistoryIds}
            onDismissAmbientHistory={(id) =>
              setDismissedAmbientHistoryIds((prev) => (prev.includes(id) ? prev : [...prev, id]))
            }
            aiActivityLog={aiActivityLog}
            onTakeAction={(insightId) => {
              setShowMorePlans(false);
              setHasExecuted(false);
              setBriefingPanel({ mode: 'takeAction', insightId: resolveBriefingInsightId(insightId) });
            }}
            onNavigate={(page) => {
              setActivePage(page);
              setSelectedReport(null);
            }}
            brandColor={brandColor}
            notificationBadgeCount={notificationBadgeCount}
          />
        ) : activePage === 'Financial Goals' ? (
          <div className="max-w-6xl mx-auto p-8 pb-32 space-y-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Financial Goals</h1>
              </div>
              <button 
                className="px-4 py-2 bg-blue-600 text-white rounded-[8px] text-sm font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
                onClick={() => {}}
              >
                <Plus className="w-4 h-4" />
                New Goal
              </button>
            </div>

            {financialGoalsLinkedModels.length > 0 && (
              <div className="space-y-3">
                <h2 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest px-1">
                  From Modelling
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {financialGoalsLinkedModels.map((m) => {
                    const prog = linkedModelGoalProgress(m);
                    return (
                    <div
                      key={m.id}
                      className="bg-white rounded-[8px] shadow-sm border border-emerald-100 p-6 flex flex-col hover:border-emerald-200 transition-colors ring-1 ring-emerald-50"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-start gap-2 min-w-0">
                          <div className="h-9 w-9 rounded-[8px] bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0">
                            <Sparkles className="h-4 w-4 text-emerald-600" />
                          </div>
                          <div className="min-w-0">
                            <h3 className="text-base font-bold text-gray-900 leading-tight">{m.name}</h3>
                            <p className="text-xs text-gray-500 mt-1">{m.description}</p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeModelFromFinancialGoals(m.id)}
                          className="text-xs font-medium text-gray-400 hover:text-red-600 shrink-0"
                        >
                          Remove
                        </button>
                      </div>
                      <div className="space-y-6 flex-1 mt-2">
                        <div className="space-y-2">
                          <div className="flex justify-between items-center text-[13px]">
                            <span className="font-semibold text-gray-700">Progress</span>
                            <span className="font-bold text-gray-900">
                              {prog.currentText}{' '}
                              <span className="text-gray-400 font-normal">/ {prog.targetText}</span>
                            </span>
                          </div>
                          <div className="w-full bg-gray-100 rounded-[8px] h-2 relative overflow-hidden">
                            <div
                              className="bg-emerald-500 h-2 rounded-[8px] transition-all duration-1000"
                              style={{ width: `${prog.percent}%` }}
                            />
                          </div>
                        </div>
                      </div>
                      <p className="text-[13px] text-gray-600 leading-relaxed flex-1 line-clamp-4 mt-4">
                        {m.goalImpactAnalysis}
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          const pid =
                            financeCustomPages.find((p) => p.id === 'fp_default')?.id ??
                            financeCustomPages[0]?.id;
                          if (pid) {
                            setSelectedModelId(m.id);
                            setActivePage(pid);
                          }
                        }}
                        className="mt-4 text-xs font-semibold text-emerald-700 hover:text-emerald-800"
                      >
                        Open strategic dashboard to preview this model →
                      </button>
                    </div>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="space-y-3">
              <h2 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest px-1">
                Firm targets
              </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-[8px] shadow-sm border border-gray-200 p-6 flex flex-col hover:border-gray-300 transition-colors">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <TrendingUp className="h-5 w-5 text-green-500" />
                      <h3 className="text-base font-bold text-gray-900">Q3 Revenue Target</h3>
                    </div>
                    <p className="text-xs text-gray-500">Achieve $500k in gross revenue by end of Q3</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="text-gray-400 hover:text-gray-600"><Edit2 className="w-4 h-4" /></button>
                  </div>
                </div>
                
                <div className="space-y-6 flex-1 mt-2">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-[13px]">
                      <span className="font-semibold text-gray-700">Progress</span>
                      <span className="font-bold text-gray-900">
                        ${briefingFinancialSnapshot.financialGoals.q3Current.toLocaleString()}{' '}
                        <span className="text-gray-400 font-normal">
                          / ${Math.round(briefingFinancialSnapshot.financialGoals.q3Target / 1000)}k
                        </span>
                      </span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-[8px] h-2 relative overflow-hidden">
                      <div
                        className="bg-green-500 h-2 rounded-[8px] transition-all duration-1000"
                        style={{ width: `${Math.min(100, briefingFinancialSnapshot.financialGoals.q3ProgressPct)}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-[8px] shadow-sm border border-gray-200 p-6 flex flex-col hover:border-gray-300 transition-colors">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <History className="h-5 w-5 text-blue-500" />
                      <h3 className="text-base font-bold text-gray-900">Annual Cash Flow Reserve</h3>
                    </div>
                    <p className="text-xs text-gray-500">Maintain 3 months operating expenses in reserve</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="text-gray-400 hover:text-gray-600"><Edit2 className="w-4 h-4" /></button>
                  </div>
                </div>
                
                <div className="space-y-6 flex-1 mt-2">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-[13px]">
                      <span className="font-semibold text-gray-700">Progress</span>
                      <span className="font-bold text-gray-900">
                        ${briefingFinancialSnapshot.financialGoals.reserveCurrent.toLocaleString()}{' '}
                        <span className="text-gray-400 font-normal">
                          / ${Math.round(briefingFinancialSnapshot.financialGoals.reserveTarget / 1000)}k
                        </span>
                      </span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-[8px] h-2 relative overflow-hidden">
                      <div
                        className="h-2 rounded-[8px] transition-all duration-1000"
                        style={{
                          width: `${Math.min(100, briefingFinancialSnapshot.financialGoals.reserveProgressPct)}%`,
                          backgroundColor: brandColor,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </div>
          </div>
        ) : isFinanceCustomPageView && activeFinancePage ? (
          <div className="max-w-7xl mx-auto w-full p-8 pb-32 flex flex-col gap-8 animate-in fade-in duration-300">
            {/* Header — full page width */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between w-full shrink-0">
              <h1 className="text-2xl font-bold text-gray-900">{activeFinancePage.title}</h1>
              <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                <div className="flex items-center shrink-0">
                  <div className="flex items-center -space-x-2">
                    {STRATEGIC_DASHBOARD_ACCESS.map((person, i) => (
                      <div
                        key={person.id}
                        className="relative"
                        style={{ zIndex: STRATEGIC_DASHBOARD_ACCESS.length - i }}
                        title={`${person.name} — ${strategicDashboardPresenceLabel(person.presence)}`}
                      >
                        <div
                          className={`flex h-9 w-9 items-center justify-center rounded-full text-[11px] font-bold border-2 border-[#F9FAFB] shadow-sm ring-2 ring-offset-0 ${
                            person.avatarClass
                          } ${
                            person.presence === 'collaborating'
                              ? 'ring-violet-500'
                              : person.presence === 'viewing'
                                ? 'ring-emerald-500'
                                : 'ring-gray-300 opacity-80'
                          }`}
                        >
                          {person.initials}
                        </div>
                        <span
                          className={`absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-white ${
                            person.presence === 'collaborating'
                              ? 'bg-violet-500'
                              : person.presence === 'viewing'
                                ? 'bg-emerald-500 animate-pulse'
                                : 'bg-gray-300'
                          }`}
                          aria-hidden
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShareDialogOpen(true)}
                  className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-[8px] text-sm font-medium hover:bg-gray-50 transition-colors flex items-center gap-2 shadow-sm shrink-0"
                >
                  <Share2 className="w-4 h-4" strokeWidth={1.5} />
                  Share
                </button>
                <button 
                  type="button"
                  onClick={() => beginCustomize({ mode: 'edit', pageId: activePage })}
                  className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-[8px] text-sm font-medium hover:bg-gray-50 transition-colors flex items-center gap-2 shadow-sm shrink-0"
                >
                  <Settings className="w-4 h-4" />
                  Customize page
                </button>
              </div>
            </div>

            <Dialog
              open={shareDialogOpen}
              onOpenChange={(open) => {
                setShareDialogOpen(open);
                if (!open) {
                  setShareEmailInput('');
                  setShareInvitees([]);
                  setNewInvitePermission('viewer');
                }
              }}
            >
              <DialogContent className="bg-white border-gray-200 text-gray-900 sm:max-w-[480px] gap-0 p-0 overflow-hidden max-h-[90vh] flex flex-col">
                <div className="p-6 pb-4 shrink-0">
                  <DialogHeader>
                    <DialogTitle className="text-gray-900 text-xl">Share dashboard</DialogTitle>
                    <DialogDescription className="text-gray-600 text-sm">
                      Manage who has access, change permissions, or invite new people.
                    </DialogDescription>
                  </DialogHeader>
                </div>
                <div className="px-6 pb-6 space-y-5 border-t border-gray-100 pt-5 overflow-y-auto custom-scrollbar flex-1 min-h-0">
                  <div className="space-y-2">
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                      People with access ({sharedDashboardUsers.length})
                    </span>
                    {sharedDashboardUsers.length === 0 ? (
                      <p className="text-sm text-gray-500 py-3 px-1">No one has access yet. Invite people below.</p>
                    ) : (
                      <ul className="rounded-[8px] border border-gray-200 divide-y divide-gray-100 max-h-[min(200px,28vh)] overflow-y-auto custom-scrollbar">
                        {sharedDashboardUsers.map((u) => (
                          <li
                            key={u.id}
                            className="flex flex-col sm:flex-row sm:items-center gap-3 p-3 bg-white hover:bg-gray-50/80"
                          >
                            <span className="text-sm font-medium text-gray-900 truncate flex-1 min-w-0">
                              {u.email}
                            </span>
                            <div className="flex items-center gap-2 shrink-0">
                              <div className="flex rounded-lg border border-gray-200 p-0.5 bg-gray-50">
                                <button
                                  type="button"
                                  className={permissionToggleClass(u.permission === 'viewer')}
                                  onClick={() => updateSharedUserPermission(u.id, 'viewer')}
                                >
                                  Viewer
                                </button>
                                <button
                                  type="button"
                                  className={permissionToggleClass(u.permission === 'collaborator')}
                                  onClick={() => updateSharedUserPermission(u.id, 'collaborator')}
                                >
                                  Collaborator
                                </button>
                              </div>
                              <button
                                type="button"
                                onClick={() => removeSharedUser(u.id)}
                                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-[6px] transition-colors"
                                aria-label="Remove access"
                              >
                                <Trash2 className="w-4 h-4" strokeWidth={1.5} />
                              </button>
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <div className="h-px bg-gray-100" />

                  <div className="space-y-2">
                    <Label htmlFor="share-email" className="text-gray-700">
                      Invite someone new
                    </Label>
                    <div className="flex flex-col gap-3">
                      <Input
                        id="share-email"
                        type="email"
                        placeholder="name@firm.com"
                        value={shareEmailInput}
                        onChange={(e) => setShareEmailInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            addShareInvitee();
                          }
                        }}
                        className="border-gray-200 bg-white text-gray-900 placeholder:text-gray-400"
                      />
                      <div>
                        <span className="text-xs font-medium text-gray-500 block mb-2">Permission for new invite</span>
                        <div className="flex rounded-lg border border-gray-200 p-0.5 bg-gray-50 w-full max-w-[280px]">
                          <button
                            type="button"
                            className={permissionToggleClass(newInvitePermission === 'viewer')}
                            onClick={() => setNewInvitePermission('viewer')}
                          >
                            Viewer
                          </button>
                          <button
                            type="button"
                            className={permissionToggleClass(newInvitePermission === 'collaborator')}
                            onClick={() => setNewInvitePermission('collaborator')}
                          >
                            Collaborator
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {shareInvitees.length > 0 && (
                    <div className="space-y-2">
                      <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                        Ready to invite ({shareInvitees.length})
                      </span>
                      <ul className="rounded-[8px] border border-gray-200 divide-y divide-gray-100 max-h-[200px] overflow-y-auto custom-scrollbar">
                        {shareInvitees.map((inv) => (
                          <li
                            key={inv.id}
                            className="flex flex-col sm:flex-row sm:items-center gap-3 p-3 bg-gray-50/50 hover:bg-gray-50"
                          >
                            <span className="text-sm font-medium text-gray-900 truncate flex-1 min-w-0">
                              {inv.email}
                            </span>
                            <div className="flex items-center gap-2 shrink-0">
                              <div className="flex rounded-lg border border-gray-200 p-0.5 bg-white">
                                <button
                                  type="button"
                                  className={permissionToggleClass(inv.permission === 'viewer')}
                                  onClick={() => updateInviteePermission(inv.id, 'viewer')}
                                >
                                  Viewer
                                </button>
                                <button
                                  type="button"
                                  className={permissionToggleClass(inv.permission === 'collaborator')}
                                  onClick={() => updateInviteePermission(inv.id, 'collaborator')}
                                >
                                  Collaborator
                                </button>
                              </div>
                              <button
                                type="button"
                                onClick={() => removeShareInvitee(inv.id)}
                                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-[6px] transition-colors"
                                aria-label="Remove"
                              >
                                <Trash2 className="w-4 h-4" strokeWidth={1.5} />
                              </button>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                <DialogFooter className="flex-row justify-end gap-2 border-t border-gray-100 bg-gray-50/80 px-6 py-4 sm:justify-end">
                  <button
                    type="button"
                    onClick={() => setShareDialogOpen(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-[8px] hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleShareDashboardSubmit}
                    className="px-4 py-2 text-sm font-medium text-white rounded-[8px] hover:opacity-90 transition-opacity shadow-sm"
                    style={{ backgroundColor: brandColor }}
                  >
                    {shareInvitees.length > 0 ? 'Send invites' : 'Done'}
                  </button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            {/* Persisted widget layout + Modelling (charts read scenario overlay via context) */}
            <StrategicDashboardChartsProvider
              value={{
                displayStrategicData,
                selectedModelId,
                briefingSnapshot: briefingFinancialSnapshot,
              }}
            >
            <div className="flex flex-col lg:flex-row gap-8 items-start w-full">
              <div className="flex-1 min-w-0 flex flex-col gap-6 w-full order-2 lg:order-1">
                <FinancePageWidgetGrid
                  widgets={activeFinancePage.widgets}
                  reportLibrary={reportLibraryForFinance}
                  onUpdateWidget={(instanceId, patch) => {
                    const pid = activePage;
                    setFinanceCustomPages((prev) =>
                      prev.map((p) =>
                        p.id === pid
                          ? {
                              ...p,
                              widgets: p.widgets.map((w) =>
                                w.instanceId === instanceId ? { ...w, ...patch } : w,
                              ),
                            }
                          : p,
                      ),
                    );
                  }}
                  executedBriefingInsightIds={executedBriefingPlans}
                  onTakeAction={(insightId) => {
                    setShowMorePlans(false);
                    setHasExecuted(false);
                    setBriefingPanel({ mode: 'takeAction', insightId: resolveBriefingInsightId(insightId) });
                  }}
                  onExploreData={(insightId) => {
                    setBriefingPanel({ mode: 'explore', insightId: resolveBriefingInsightId(insightId) });
                  }}
                />
              </div>

              <aside className="w-full lg:w-[320px] shrink-0 flex flex-col gap-4 order-1 lg:order-2 lg:sticky lg:top-6 lg:self-start">
                <div className="bg-white border border-gray-200 rounded-[8px] p-5 shadow-sm flex flex-col">
                  <h3 className="text-base font-bold text-gray-900 flex items-center gap-2 mb-4">
                    <Sparkles className="w-4 h-4 text-blue-600 shrink-0" /> Modelling
                  </h3>
                  <div className="flex flex-col gap-3 flex-1">
                    {allFinancialModels.map((model) => (
                      <div
                        key={model.id}
                        className={`text-left p-4 rounded-[8px] border transition-all ${
                          selectedModelId === model.id 
                            ? 'border-[#8b5cf6] bg-[#8b5cf6]/5 ring-1 ring-[#8b5cf6]/20' 
                            : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <span className={`font-semibold text-sm min-w-0 ${selectedModelId === model.id ? 'text-[#8b5cf6]' : 'text-gray-900'}`}>
                            {model.name}
                          </span>
                          <div className="flex items-center gap-1.5 shrink-0">
                            {model.isUserCreated && (
                              <span className="text-[10px] font-bold uppercase tracking-wide text-violet-700 bg-violet-50 border border-violet-100 px-1.5 py-0.5 rounded-[4px]">
                                Yours
                              </span>
                            )}
                            {selectedModelId === model.id && <CheckCircle2 className="w-4 h-4 text-[#8b5cf6]" />}
                          </div>
                        </div>
                        <p className="text-xs text-gray-500 mb-3">{model.description}</p>
                        <div className="flex gap-2">
                          <button 
                            type="button"
                            onClick={() => setSelectedModelId(selectedModelId === model.id ? null : model.id)}
                            className="flex-1 bg-white border border-gray-200 text-gray-700 py-1.5 rounded-[6px] text-xs font-medium hover:bg-gray-50 transition-colors"
                          >
                            {selectedModelId === model.id ? 'Hide Preview' : 'Preview'}
                          </button>
                          <button 
                            type="button"
                            disabled={financialGoalModelIds.includes(model.id)}
                            onClick={() => addModelToFinancialGoals(model.id)}
                            className={`flex-1 py-1.5 rounded-[6px] text-xs font-medium transition-colors flex items-center justify-center gap-1 border ${
                              financialGoalModelIds.includes(model.id)
                                ? 'bg-gray-50 text-gray-400 border-gray-200 cursor-default'
                                : 'bg-emerald-50 text-emerald-800 border-emerald-100 hover:bg-emerald-100'
                            }`}
                          >
                            {financialGoalModelIds.includes(model.id) ? (
                              <>
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                In goals
                              </>
                            ) : (
                              <>
                                <Target className="w-3.5 h-3.5" />
                                Add to goals
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => setCreateModelDialogOpen(true)}
                    className="mt-4 w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-[8px] text-xs font-medium text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" strokeWidth={2} />
                    Create model
                  </button>
                </div>
                <div className="bg-blue-50/50 border border-blue-100 rounded-[8px] p-5">
                  <div className="flex gap-3">
                    <Info className="w-5 h-5 text-blue-600 shrink-0" />
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900">How modelling works</h4>
                      <p className="text-xs text-gray-600 mt-1 leading-relaxed">Create your own scenario models or use starters below. Preview overlays cash, burn, and runway on the charts. Add to goals sends a model to your Financial Goals page to track alongside firm targets.</p>
                    </div>
                  </div>
                </div>
              </aside>

              <Dialog
                open={createModelDialogOpen}
                onOpenChange={(open) => {
                  setCreateModelDialogOpen(open);
                  if (!open) {
                    createModelAbortRef.current = true;
                    setIsCreateModelProcessing(false);
                    setNewModelName('');
                    setNewModelScenario('');
                    setNewModelFramework('Default');
                  } else {
                    createModelAbortRef.current = false;
                  }
                }}
              >
                <DialogContent className="bg-white border-gray-200 text-gray-900 sm:max-w-[440px] gap-0 p-0 overflow-hidden max-h-[90vh] flex flex-col">
                  <div className="p-6 pb-4 shrink-0 border-b border-gray-100">
                    <DialogHeader>
                      <DialogTitle className="text-gray-900 text-xl">Create scenario model</DialogTitle>
                      <DialogDescription className="text-gray-600 text-sm">
                        Name your model and describe what you want to stress-test. Ambient CFO reads your scenario, applies your framework, and builds the chart overlay.
                      </DialogDescription>
                    </DialogHeader>
                  </div>
                  <div className="px-6 py-4 space-y-4 overflow-y-auto custom-scrollbar flex-1 min-h-0">
                    <div className="space-y-2">
                      <Label htmlFor="model-name" className="text-gray-700">
                        Model name
                      </Label>
                      <Input
                        id="model-name"
                        value={newModelName}
                        onChange={(e) => setNewModelName(e.target.value)}
                        disabled={isCreateModelProcessing}
                        placeholder="e.g. Delay partner hire to Q4"
                        className="border-gray-200 bg-white text-gray-900 placeholder:text-gray-400"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="model-scenario" className="text-gray-700">
                        Scenario details
                      </Label>
                      <textarea
                        id="model-scenario"
                        value={newModelScenario}
                        onChange={(e) => setNewModelScenario(e.target.value)}
                        disabled={isCreateModelProcessing}
                        placeholder="What are you testing? e.g. Push two associate starts from May to September and freeze non-billable hiring."
                        rows={4}
                        className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/30 resize-y min-h-[100px]"
                      />
                      <p className="text-[11px] text-gray-500 leading-relaxed flex items-start gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                        When you create the model, Ambient CFO interprets this text (hiring, cuts, timing, collections, etc.) and maps it to cash, burn, and runway.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="model-framework" className="text-gray-700">
                        Model framework
                      </Label>
                      <select
                        id="model-framework"
                        value={newModelFramework}
                        disabled={isCreateModelProcessing}
                        onChange={(e) => setNewModelFramework(e.target.value as ModelFramework)}
                        className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/30"
                      >
                        <option value="Default">Default</option>
                        <option value="Aggressive">Aggressive</option>
                        <option value="Conservative">Conservative</option>
                      </select>
                    </div>
                  </div>
                  <DialogFooter className="flex-row flex-wrap items-center justify-between gap-3 border-t border-gray-100 bg-gray-50/80 px-6 py-4 sm:justify-between">
                    {isCreateModelProcessing ? (
                      <span className="text-xs text-gray-600 flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin text-blue-600 shrink-0" />
                        Ambient CFO is reading your scenario and building the model…
                      </span>
                    ) : (
                      <span className="text-xs text-gray-400 hidden sm:inline" />
                    )}
                    <div className="flex gap-2 ml-auto">
                      <button
                        type="button"
                        disabled={isCreateModelProcessing}
                        onClick={() => setCreateModelDialogOpen(false)}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-[8px] hover:bg-gray-50 transition-colors disabled:opacity-50"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        disabled={isCreateModelProcessing}
                        onClick={submitCreateFinancialModel}
                        className="px-4 py-2 text-sm font-medium text-white rounded-[8px] hover:opacity-90 transition-opacity shadow-sm disabled:opacity-60 inline-flex items-center gap-2"
                        style={{ backgroundColor: brandColor }}
                      >
                        {isCreateModelProcessing ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Processing…
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-4 h-4" />
                            Create model
                          </>
                        )}
                      </button>
                    </div>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
            </StrategicDashboardChartsProvider>
          </div>
        ) : activePage === 'User Profile' ? (
          <div className="max-w-4xl mx-auto p-8 pb-32 space-y-8 animate-in fade-in duration-300">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">User Profile</h1>
                <p className="text-sm text-gray-500 mt-1">Manage your personal details and user-specific preferences.</p>
              </div>
              <button
                type="button"
                onClick={() => toast.success('User profile settings updated')}
                className="px-4 py-2 text-sm font-medium text-white rounded-[8px] hover:opacity-90 transition-opacity shadow-sm"
                style={{ backgroundColor: brandColor }}
              >
                Save changes
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white rounded-[8px] shadow-sm border border-gray-200 p-6">
                  <h2 className="text-base font-bold text-gray-900 mb-4">Profile Details</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Full name</label>
                      <input
                        defaultValue="Justin Chow"
                        className="mt-1 w-full rounded-[8px] border border-gray-200 px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Work email</label>
                      <input
                        defaultValue="justin@hartwellmorris.com"
                        className="mt-1 w-full rounded-[8px] border border-gray-200 px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Role</label>
                      <input
                        defaultValue="Managing Partner"
                        className="mt-1 w-full rounded-[8px] border border-gray-200 px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Timezone</label>
                      <input
                        defaultValue="America/Los_Angeles"
                        className="mt-1 w-full rounded-[8px] border border-gray-200 px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-[8px] shadow-sm border border-gray-200 p-6">
                  <h2 className="text-base font-bold text-gray-900 mb-4">Ambient CFO Preferences</h2>
                  <div className="space-y-4">
                    <label className="flex items-center justify-between rounded-[8px] border border-gray-200 px-4 py-3">
                      <div>
                        <p className="text-sm font-semibold text-gray-900">Daily Briefing Digest</p>
                        <p className="text-xs text-gray-500">Receive a concise summary of this week’s high-priority actions.</p>
                      </div>
                      <input type="checkbox" defaultChecked className="h-4 w-4 rounded border-gray-300 text-blue-600" />
                    </label>
                    <label className="flex items-center justify-between rounded-[8px] border border-gray-200 px-4 py-3">
                      <div>
                        <p className="text-sm font-semibold text-gray-900">Proactive Alerts</p>
                        <p className="text-xs text-gray-500">Notify me when cash, runway, or collections shift materially.</p>
                      </div>
                      <input type="checkbox" defaultChecked className="h-4 w-4 rounded border-gray-300 text-blue-600" />
                    </label>
                    <label className="flex items-center justify-between rounded-[8px] border border-gray-200 px-4 py-3">
                      <div>
                        <p className="text-sm font-semibold text-gray-900">Auto-open Financial Goals</p>
                        <p className="text-xs text-gray-500">Jump to Financial Goals after adding a model from Modelling.</p>
                      </div>
                      <input type="checkbox" defaultChecked className="h-4 w-4 rounded border-gray-300 text-blue-600" />
                    </label>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-white rounded-[8px] shadow-sm border border-gray-200 p-6">
                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">Profile</p>
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-blue-50 border border-blue-100 text-blue-700 flex items-center justify-center text-sm font-bold">
                      JC
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900">Justin Chow</p>
                      <p className="text-xs text-gray-500">Managing Partner</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-[8px] shadow-sm border border-gray-200 p-6">
                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">Security</p>
                  <button className="w-full text-sm font-medium text-gray-700 border border-gray-200 rounded-[8px] py-2.5 hover:bg-gray-50 transition-colors">
                    Change password
                  </button>
                  <button className="w-full text-sm font-medium text-gray-700 border border-gray-200 rounded-[8px] py-2.5 hover:bg-gray-50 transition-colors mt-2">
                    Manage MFA
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : activePage === 'Reports' ? (
          selectedReport ? (
            <ReportDetail reportName={selectedReport} onBack={() => setSelectedReport(null)} />
          ) : (
            <div className="max-w-6xl mx-auto p-8 pb-32 animate-in fade-in duration-300">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex bg-white border border-gray-200 rounded-[8px] p-0.5 shadow-sm">
                    <button 
                      onClick={() => setReportsViewMode('grid')}
                      className={`p-1.5 rounded-[6px] transition-colors ${reportsViewMode === 'grid' ? 'bg-gray-100 text-gray-900' : 'text-gray-400 hover:text-gray-600'}`}
                      title="Grid view"
                    >
                      <LayoutGrid className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => setReportsViewMode('list')}
                      className={`p-1.5 rounded-[6px] transition-colors ${reportsViewMode === 'list' ? 'bg-gray-100 text-gray-900' : 'text-gray-400 hover:text-gray-600'}`}
                      title="List view"
                    >
                      <List className="w-4 h-4" />
                    </button>
                  </div>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-[8px] text-sm font-medium hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-sm shadow-blue-600/20">
                    <Plus className="w-4 h-4" />
                    New Custom Report
                  </button>
                </div>
              </div>

              {reportsViewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {availableReports.map((report) => (
                    <a 
                      key={report.name} 
                      href="#" 
                      onClick={(e) => { e.preventDefault(); setSelectedReport(report.name); }} 
                      className="bg-white rounded-[8px] border border-gray-200 p-5 flex flex-col hover:border-blue-400 hover:shadow-sm transition-all group cursor-pointer"
                    >
                      <div className="flex items-start gap-4 mb-4">
                        <div className={`w-10 h-10 rounded-[8px] flex items-center justify-center shrink-0 ${report.bg}`}>
                          <report.icon className={`w-5 h-5 ${report.color}`} strokeWidth={1.5} />
                        </div>
                        <div>
                          <h3 className="font-bold text-[14px] text-gray-900 group-hover:text-blue-600 transition-colors leading-tight mb-1">{report.name}</h3>
                          <p className="text-[12px] text-gray-500 leading-relaxed">{report.desc}</p>
                        </div>
                      </div>
                      <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between text-[11px] font-medium text-gray-400">
                        <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> Updated today</span>
                        <span className="text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">View report <ChevronRight className="w-3 h-3" /></span>
                      </div>
                    </a>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  {availableReports.map((report) => (
                    <a 
                      key={report.name} 
                      href="#" 
                      onClick={(e) => { e.preventDefault(); setSelectedReport(report.name); }} 
                      className="bg-white rounded-[8px] border border-gray-200 p-4 flex items-center gap-6 hover:border-blue-400 hover:shadow-sm transition-all group cursor-pointer"
                    >
                      <div className={`w-10 h-10 rounded-[8px] flex items-center justify-center shrink-0 ${report.bg}`}>
                        <report.icon className={`w-5 h-5 ${report.color}`} strokeWidth={1.5} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-[14px] text-gray-900 group-hover:text-blue-600 transition-colors leading-tight mb-1">{report.name}</h3>
                        <p className="text-[12px] text-gray-500 truncate">{report.desc}</p>
                      </div>
                      <div className="flex items-center gap-6 text-[12px] font-medium text-gray-400 shrink-0">
                        <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> Updated today</span>
                        <span className="text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 w-[100px] justify-end">View <ChevronRight className="w-3.5 h-3.5" /></span>
                      </div>
                    </a>
                  ))}
                </div>
              )}
            </div>
          )
        ) : activePage === 'Dashboard' ? (
          <div className="max-w-6xl mx-auto p-8 pb-32 space-y-8 animate-in fade-in duration-300">
          
          {/* TOP SECTION: Chat-Centric Command Center */}


          {/* BOTTOM SECTION: Customizable Widgets Grid */}
          <section>
            <div className="flex justify-between items-end mb-4 px-1">
              <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Firm Overview</h3>
              <button className="text-[11px] font-bold text-gray-400 uppercase hover:text-gray-600 flex items-center">Customize Dashboard <Settings className="h-3 w-3 ml-1" /></button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* PRIMARY WIDGET: Cash Flow Projection */}
              <div className="bg-white rounded-[8px] shadow-sm border border-gray-200 p-6 lg:col-span-2 flex flex-col relative overflow-hidden">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-base font-bold text-gray-900">Cash Flow Projection</h3>
                    <p className="text-xs text-gray-500 mt-0.5 flex items-center">
                      <Sparkles className="h-3 w-3 mr-1 text-blue-500" /> 
                      Proactive modeling based on current billing velocity
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1.5">
                      <div className="w-2 h-2 bg-gray-900 rounded-[8px]"></div>
                      <span className="text-[10px] font-bold text-gray-500 uppercase tracking-tighter">Actual</span>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <div className="w-2 h-2 border border-gray-400 border-dashed rounded-[8px]"></div>
                      <span className="text-[10px] font-bold text-gray-500 uppercase tracking-tighter">Projected</span>
                    </div>
                  </div>
                </div>

                {/* SVG-based Chart Visualization */}
                <div className="flex-1 min-h-[220px] w-full bg-gray-50/50 rounded-[8px] relative border border-gray-100 overflow-hidden mb-6 flex items-end px-6 pb-10 pt-4">
                  
                  {/* Goal Line - Dashed Green */}
                  <div className="absolute top-[25%] left-0 right-0 border-t border-green-300 border-dashed w-full opacity-60">
                     <span className="absolute right-4 -top-5 text-[10px] font-bold text-green-600 bg-white px-1.5 py-0.5 rounded-[8px] border border-green-100 shadow-sm">Target Velocity</span>
                  </div>

                  {/* Main SVG Plot */}
                  <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                    {/* Actual Path */}
                    <path d="M 5 85 L 20 75 L 35 60 L 50 55 L 65 45" fill="none" stroke="#111827" strokeWidth="2.5" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
                    {/* Projection Path */}
                    <path d="M 65 45 L 80 52 L 95 65" fill="none" stroke="#94A3B8" strokeWidth="2.5" strokeDasharray="5 4" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
                    {/* Area Gradient Under Actual */}
                    <path d="M 5 85 L 20 75 L 35 60 L 50 55 L 65 45 L 65 100 L 5 100 Z" fill="url(#blue-grad)" opacity="0.05" />
                    <defs>
                      <linearGradient id="blue-grad" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="#0069D1" />
                        <stop offset="100%" stopColor="#0069D1" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                  </svg>
                  
                  {/* Alert Annotation */}
                  <div className="absolute top-[55%] right-[10%] group">
                     <div className="relative">
                        <div className="h-5 w-5 bg-red-100 text-red-600 rounded-[8px] flex items-center justify-center animate-bounce border border-red-200">
                           <AlertCircle className="h-3 w-3" />
                        </div>
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-gray-900 text-white text-[10px] font-bold px-3 py-1.5 rounded-[8px] shadow-xl whitespace-nowrap">
                          -$15,200 Gap Projected for Q3
                          <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-gray-900"></div>
                        </div>
                     </div>
                  </div>
                  
                  {/* X Axis Labels */}
                  <div className="absolute bottom-3 left-0 right-0 flex justify-between px-6 text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                    <span>Jun</span><span>Jul</span><span>Aug</span><span>Sep (Forecast)</span>
                  </div>
                </div>

                <div className="mt-auto">
                  <div className="bg-red-50/50 border border-red-100 rounded-[8px] p-4 mb-4 flex items-start space-x-3">
                    <div className="bg-white p-1.5 rounded-[8px] shadow-sm">
                      <AlertCircle className="h-4 w-4 text-red-600" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-red-900">Revenue Gap Detected</h4>
                      <p className="text-[11px] text-red-800/80 leading-relaxed mt-0.5">Your current collection cycle has slowed. I've modeled a recovery plan to close the $15.2k gap.</p>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => {
                      setShowMorePlans(false);
                      setHasExecuted(false);
                      setBriefingPanel({ mode: 'takeAction', insightId: 'insight-1' });
                    }}
                    className="group w-full py-3.5 px-4 text-white text-sm font-bold rounded-[8px] shadow-lg shadow-blue-600/20 hover:shadow-blue-600/30 active:scale-[0.98] transition-all flex justify-center items-center overflow-hidden relative"
                    style={{ backgroundColor: brandColor }}
                  >
                    <span className="relative z-10 flex items-center">
                      <Sparkles className="h-4 w-4 mr-2 group-hover:rotate-12 transition-transform" />
                      Review AI Recommended Actions
                    </span>
                  </button>
                </div>
              </div>

              {/* SIDE WIDGET: A/R Aging */}
              <div className="bg-white rounded-[8px] shadow-sm border border-gray-200 p-6 flex flex-col hover:border-gray-300 transition-colors">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-base font-bold text-gray-900">A/R Aging</h3>
                    <p className="text-xs text-gray-500 mt-0.5">Pending collection health</p>
                  </div>
                  <Info className="h-4 w-4 text-gray-300 cursor-help" />
                </div>
                
                <div className="space-y-6 flex-1">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-[12px]">
                      <span className="font-semibold text-gray-600">Current</span>
                      <span className="font-bold text-gray-900">$24,500</span>
                    </div>
                    <div className="w-full bg-gray-50 rounded-[8px] h-1.5 overflow-hidden">
                      <div className="h-1.5 rounded-[8px]" style={{ backgroundColor: brandColor, width: '60%' }}></div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-[12px]">
                      <span className="font-semibold text-gray-600">31-60 Days</span>
                      <span className="font-bold text-gray-900">$12,400</span>
                    </div>
                    <div className="w-full bg-gray-50 rounded-[8px] h-1.5 overflow-hidden">
                      <div className="bg-yellow-400 h-1.5 rounded-[8px] w-[40%]"></div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-[12px]">
                      <span className="font-semibold text-gray-600">60+ Days</span>
                      <span className="font-bold text-red-600">$4,500</span>
                    </div>
                    <div className="w-full bg-gray-50 rounded-[8px] h-1.5 overflow-hidden">
                      <div className="bg-red-500 h-1.5 rounded-[8px] w-[15%]"></div>
                    </div>
                  </div>
                </div>
                
                <button className="mt-8 w-full py-2.5 text-xs font-bold text-gray-500 border border-gray-200 rounded-[8px] hover:bg-gray-50 hover:text-gray-900 transition-all uppercase tracking-wider">
                  View Full A/R Report
                </button>
              </div>

              {/* WIDGET: Cash Position & Runway */}
              <div className="bg-white rounded-[8px] shadow-sm border border-gray-200 p-6 flex flex-col hover:border-gray-300 transition-colors">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-base font-bold text-gray-900">Cash & Runway</h3>
                    <p className="text-xs text-gray-500 mt-0.5">Operating capital</p>
                  </div>
                  <Wallet className="h-4 w-4 text-gray-400" />
                </div>
                
                <div className="space-y-4 flex-1 mt-2">
                  <div>
                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Total Cash</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">$1.2M</p>
                  </div>
                  <div className="pt-4 border-t border-gray-100">
                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Estimated Runway</p>
                    <div className="flex items-end mt-1">
                      <p className="text-xl font-bold text-gray-900">11.4</p>
                      <p className="text-sm text-gray-500 mb-0.5 ml-1">months</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* WIDGET: Practice Area Performance */}
              <div className="bg-white rounded-[8px] shadow-sm border border-gray-200 p-6 flex flex-col hover:border-gray-300 transition-colors">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-base font-bold text-gray-900">Practice Areas</h3>
                    <p className="text-xs text-gray-500 mt-0.5">YTD against goals</p>
                  </div>
                  <Briefcase className="h-4 w-4 text-gray-400" />
                </div>
                
                <div className="space-y-5 flex-1 mt-2">
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="font-semibold text-gray-700">Corporate</span>
                      <span className="font-bold text-green-600">105%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-[8px] h-1.5 overflow-hidden">
                      <div className="bg-green-500 h-1.5 rounded-[8px] w-full"></div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="font-semibold text-gray-700">Litigation</span>
                      <span className="font-bold text-gray-900">82%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-[8px] h-1.5 overflow-hidden">
                      <div className="h-1.5 rounded-[8px] w-[82%]" style={{ backgroundColor: brandColor }}></div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="font-semibold text-gray-700">Real Estate</span>
                      <span className="font-bold text-yellow-600">65%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-[8px] h-1.5 overflow-hidden">
                      <div className="bg-yellow-400 h-1.5 rounded-[8px] w-[65%]"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* WIDGET: Billing Rate Health */}
              <div className="bg-white rounded-[8px] shadow-sm border border-gray-200 p-6 flex flex-col hover:border-gray-300 transition-colors">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-base font-bold text-gray-900">Billing Health</h3>
                    <p className="text-xs text-gray-500 mt-0.5">Effective vs Standard</p>
                  </div>
                  <Activity className="h-4 w-4 text-gray-400" />
                </div>
                
                <div className="flex flex-col items-center justify-center flex-1 space-y-4">
                  <div className="relative w-32 h-32 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                      <path className="text-gray-100" strokeWidth="3" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                      <path className="text-blue-600" strokeWidth="3" strokeDasharray="85, 100" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-2xl font-bold text-gray-900">85%</span>
                      <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wide">Realized</span>
                    </div>
                  </div>
                  <div className="flex justify-between w-full px-2 text-xs">
                    <div className="text-center">
                      <p className="text-gray-400 uppercase tracking-wider font-bold text-[9px] mb-1">Standard</p>
                      <p className="font-bold text-gray-900">$450/hr</p>
                    </div>
                    <div className="text-center">
                      <p className="text-gray-400 uppercase tracking-wider font-bold text-[9px] mb-1">Effective</p>
                      <p className="font-bold text-blue-600">$382/hr</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* WIDGET: Collection Trends */}
              <div className="bg-white rounded-[8px] shadow-sm border border-gray-200 p-6 lg:col-span-2 flex flex-col hover:border-gray-300 transition-colors">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-base font-bold text-gray-900">Collection Trends</h3>
                    <p className="text-xs text-gray-500 mt-0.5">Historical realization speed</p>
                  </div>
                  <BarChart3 className="h-4 w-4 text-gray-400" />
                </div>
                
                <div className="flex-1 w-full bg-gray-50/50 rounded-[8px] border border-gray-100 relative min-h-[160px] p-4 flex items-end">
                  <div className="w-full flex justify-around items-end h-[120px] px-2">
                    {[{m: 'Jan', h: 60}, {m: 'Feb', h: 75}, {m: 'Mar', h: 55}, {m: 'Apr', h: 80}, {m: 'May', h: 45}, {m: 'Jun', h: 90}].map((d, i) => (
                      <div key={i} className="flex flex-col items-center space-y-2 w-full max-w-[40px] h-full justify-end group">
                        <div className="w-full bg-blue-50/50 rounded-t-[8px] h-full relative overflow-hidden flex items-end">
                          <div 
                            className="w-full rounded-t-[8px] transition-all duration-500 group-hover:opacity-80" 
                            style={{ height: `${d.h}%`, backgroundColor: brandColor }}
                          ></div>
                        </div>
                        <span className="text-[10px] text-gray-400 font-bold uppercase">{d.m}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* WIDGET: Active Financial Goals */}
              <div className="bg-white rounded-[8px] shadow-sm border border-gray-200 p-6 flex flex-col hover:border-gray-300 transition-colors">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-base font-bold text-gray-900">Financial Goals</h3>
                    <p className="text-xs text-gray-500 mt-0.5">Active targets</p>
                  </div>
                  <button onClick={() => setActivePage('Financial Goals')} className="text-[10px] font-bold text-blue-600 uppercase hover:underline">Manage</button>
                </div>
                
                <div className="space-y-6 flex-1 mt-2">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-[12px]">
                      <div className="flex items-center">
                        <TrendingUp className="h-3 w-3 text-green-500 mr-1.5" />
                        <span className="font-semibold text-gray-600">Q3 Revenue</span>
                      </div>
                      <span className="font-bold text-gray-900">
                        ${Math.round(briefingFinancialSnapshot.financialGoals.q3Current / 1000)}k{' '}
                        <span className="text-gray-400 font-normal">
                          / ${Math.round(briefingFinancialSnapshot.financialGoals.q3Target / 1000)}k
                        </span>
                      </span>
                    </div>
                    <div className="w-full bg-gray-50 rounded-[8px] h-1.5 overflow-hidden">
                      <div
                        className="bg-green-500 h-1.5 rounded-[8px]"
                        style={{ width: `${Math.min(100, briefingFinancialSnapshot.financialGoals.q3ProgressPct)}%` }}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-[12px]">
                      <div className="flex items-center">
                        <History className="h-3 w-3 text-blue-500 mr-1.5" />
                        <span className="font-semibold text-gray-600">Cash Reserve</span>
                      </div>
                      <span className="font-bold text-gray-900">
                        ${Math.round(briefingFinancialSnapshot.financialGoals.reserveCurrent / 1000)}k{' '}
                        <span className="text-gray-400 font-normal">
                          / ${Math.round(briefingFinancialSnapshot.financialGoals.reserveTarget / 1000)}k
                        </span>
                      </span>
                    </div>
                    <div className="w-full bg-gray-50 rounded-[8px] h-1.5 overflow-hidden">
                      <div
                        className="h-1.5 rounded-[8px]"
                        style={{
                          width: `${Math.min(100, briefingFinancialSnapshot.financialGoals.reserveProgressPct)}%`,
                          backgroundColor: brandColor,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* WIDGET: Realization by Partner */}
              <div className="bg-white rounded-[8px] shadow-sm border border-gray-200 p-6 flex flex-col hover:border-gray-300 transition-colors">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-base font-bold text-gray-900">Partner Realization</h3>
                    <p className="text-xs text-gray-500 mt-0.5">Top contributors</p>
                  </div>
                  <PieChart className="h-4 w-4 text-gray-400" />
                </div>
                
                <div className="space-y-5 flex-1 mt-2">
                  <div className="flex items-center justify-between group">
                    <div className="flex items-center space-x-3">
                      <div className="w-9 h-9 rounded-[8px] bg-blue-50 border border-blue-100 flex items-center justify-center text-xs font-bold text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">JD</div>
                      <div>
                        <p className="text-sm font-bold text-gray-900">John D.</p>
                        <p className="text-[11px] font-medium text-green-600">92% Realized</p>
                      </div>
                    </div>
                    <span className="text-sm font-bold text-gray-900">$420k</span>
                  </div>
                  
                  <div className="flex items-center justify-between group">
                    <div className="flex items-center space-x-3">
                      <div className="w-9 h-9 rounded-[8px] bg-gray-50 border border-gray-200 flex items-center justify-center text-xs font-bold text-gray-600 group-hover:bg-gray-600 group-hover:text-white transition-colors">SL</div>
                      <div>
                        <p className="text-sm font-bold text-gray-900">Sarah L.</p>
                        <p className="text-[11px] font-medium text-gray-500">88% Realized</p>
                      </div>
                    </div>
                    <span className="text-sm font-bold text-gray-900">$385k</span>
                  </div>
                  
                  <div className="flex items-center justify-between group">
                    <div className="flex items-center space-x-3">
                      <div className="w-9 h-9 rounded-[8px] bg-gray-50 border border-gray-200 flex items-center justify-center text-xs font-bold text-gray-600 group-hover:bg-gray-600 group-hover:text-white transition-colors">MR</div>
                      <div>
                        <p className="text-sm font-bold text-gray-900">Mike R.</p>
                        <p className="text-[11px] font-medium text-yellow-600">84% Realized</p>
                      </div>
                    </div>
                    <span className="text-sm font-bold text-gray-900">$310k</span>
                  </div>
                </div>
              </div>

            </div>
          </section>
        </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-500 animate-in fade-in duration-300">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{activePage}</h2>
          </div>
        )}
      </main>

      <BriefingSidePanel
        panel={briefingPanel}
        onClose={() => {
          if (!isExecuting) setBriefingPanel(null);
        }}
        brandColor={brandColor}
        isExecuting={isExecuting}
        hasExecuted={hasExecuted}
        showMorePlans={showMorePlans}
        setShowMorePlans={setShowMorePlans}
        onExecutePlan={handleExecute}
      />

      {/* FLOATING COMMAND BAR (Ambient CFO) */}
      <div className="fixed bottom-6 left-0 md:left-[239px] right-0 flex flex-col items-center justify-end z-40 pointer-events-none px-4 md:px-8">
        
        {/* Chat History Window */}
        {chatHistory.length > 0 && (
          <div className="w-full max-w-3xl pointer-events-auto bg-white/95 backdrop-blur-sm rounded-t-2xl shadow-[0_-8px_30px_rgb(0,0,0,0.08)] border border-gray-200 border-b-0 mb-[-1px] overflow-hidden flex flex-col transition-all duration-300 animate-in slide-in-from-bottom-4">
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-white">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-[6px] bg-blue-50 flex items-center justify-center border border-blue-100">
                  <Sparkles className="h-3.5 w-3.5 text-blue-600" />
                </div>
                <span className="text-sm font-semibold text-gray-900">Ambient CFO</span>
              </div>
              <button onClick={() => setChatHistory([])} className="text-gray-400 hover:text-gray-600 p-1 rounded-md hover:bg-gray-100 transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <div className="p-4 overflow-y-auto max-h-[400px] flex flex-col gap-4 custom-scrollbar bg-gray-50/50">
              {chatHistory.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {msg.role === 'ai' && (
                     <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center border border-blue-200 mr-2 shrink-0 self-end mb-1">
                        <Sparkles className="h-4 w-4 text-blue-600" />
                     </div>
                  )}
                  <div className={`p-3 text-[13px] leading-relaxed max-w-[80%] ${
                    msg.role === 'user' 
                      ? 'bg-blue-600 text-white rounded-[16px] rounded-br-[4px] shadow-sm' 
                      : 'bg-white border border-gray-200 text-gray-800 rounded-[16px] rounded-bl-[4px] shadow-sm'
                  }`}>
                    {msg.role === 'ai' && i === chatHistory.length - 1 && msg.content === '...' ? (
                      <div className="flex gap-1 items-center h-5 px-1">
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.15s'}}></div>
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.3s'}}></div>
                      </div>
                    ) : (
                      msg.content
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div
          className={`w-full max-w-3xl pointer-events-auto bg-white shadow-2xl border border-gray-200 transition-all duration-300 ${
            chatHistory.length > 0 ? 'rounded-b-full rounded-t-none' : 'rounded-full'
          }`}
        >
          {/* No overflow-hidden here — it clips the suggestions panel (bottom-full). */}
          <div className="relative z-10 group rounded-full p-2">
            <div className="flex items-center px-2 py-1">
              <button
                type="button"
                aria-label="Open inbox"
                onClick={() => {
                  setActivePage('Inbox');
                  closeMobileNav();
                }}
                className="relative shrink-0 p-0.5 rounded-[8px] hover:bg-blue-50 transition-colors mr-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40"
              >
                <img
                  src="/clio-accounting-icon.png"
                  alt=""
                  width={22}
                  height={22}
                  className="h-[22px] w-[22px] shrink-0 rounded-[6px] object-cover"
                  aria-hidden
                />
              </button>
              <input 
                type="text" 
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleChatSubmit();
                }}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => {
                  setTimeout(() => setShowSuggestions(false), 200);
                }}
                placeholder="Search the product or ask your Ambient CFO..."
                className="flex-1 bg-transparent border-none text-sm text-gray-900 focus:outline-none placeholder:text-gray-400 py-2"
              />
              <div className="flex items-center ml-3 pl-3 border-l border-gray-100">
                <button 
                  onClick={() => handleChatSubmit()}
                  className="p-2 rounded-[8px] text-white transition-opacity shadow-sm hover:opacity-90"
                  style={{ backgroundColor: brandColor }}
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
            
            {showSuggestions && chatHistory.length === 0 && (
              <div className="absolute bottom-full left-0 z-50 w-full mb-2 bg-white border border-gray-200 shadow-2xl rounded-2xl p-3 animate-in fade-in slide-in-from-bottom-2 duration-200 flex flex-col pointer-events-auto">
                {chatInput && globalSearchResults.length > 0 && (
                  <div className="mb-3">
                    <p className="text-xs font-semibold text-gray-500 mb-2 px-2">Navigate to</p>
                    <div className="flex flex-col gap-1 max-h-[160px] overflow-y-auto custom-scrollbar">
                      {globalSearchResults.map((result, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            setChatInput("");
                            result.action();
                            setShowSuggestions(false);
                          }}
                          className="w-full flex items-center gap-3 p-2 hover:bg-blue-50 rounded-[8px] transition-colors text-left group"
                        >
                          <div className="w-8 h-8 rounded-[8px] bg-blue-100 flex items-center justify-center shrink-0 text-blue-600 group-hover:bg-blue-200 transition-colors">
                            <result.icon className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="font-semibold text-sm text-gray-900 leading-tight">{result.title}</div>
                            <div className="text-xs text-gray-500">{result.subtitle}</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                
                <p className="text-xs font-semibold text-gray-500 mb-2 px-2">
                  {chatInput ? 'Ask Ambient CFO' : 'Suggested Queries'}
                </p>
                <div className="flex flex-col gap-1 max-h-[160px] overflow-y-auto custom-scrollbar">
                  {chatInput && (
                    <button 
                      onClick={() => {
                        handleChatSubmit(chatInput);
                      }}
                      className="text-left text-sm text-gray-700 py-2 px-3 rounded-[8px] hover:bg-blue-50 hover:text-blue-600 transition-colors w-full flex items-center bg-gray-50/50"
                    >
                      <Sparkles className="w-3.5 h-3.5 mr-2 text-blue-500 shrink-0" />
                      <span className="font-medium mr-1">Ask:</span> "{chatInput}"
                    </button>
                  )}
                  {suggestedQuestions
                    .filter(q => q.toLowerCase().includes(chatInput.toLowerCase()))
                    .map((q, i) => (
                    <button 
                      key={i}
                      onClick={() => {
                        handleChatSubmit(q);
                      }}
                      className="text-left text-sm text-gray-700 py-2 px-3 rounded-[8px] hover:bg-blue-50 hover:text-blue-600 transition-colors w-full flex items-start gap-2"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                      <span>{q}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Embedded CSS for custom styling */}
      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #E5E7EB;
          border-radius: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #D1D5DB;
        }
      `}} />

    </div>
  );
}