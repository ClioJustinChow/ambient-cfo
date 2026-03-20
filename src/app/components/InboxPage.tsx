import React from 'react';
import {
  Activity,
  Bell,
  ChevronRight,
  ClipboardList,
  History as HistoryIcon,
  SlidersHorizontal,
  Sparkles,
} from 'lucide-react';
import { BRIEFING_INSIGHT_ITEMS } from '../data/briefingInsights';
import { AMBIENT_ACTIONS_HISTORY } from '../data/ambientActionsHistory';
import {
  getBriefingExploreContent,
  isBriefingInsightId,
  type BriefingInsightId,
} from '../data/briefingPanelContent';
import { BriefingExploreSections } from './BriefingExploreSections';
import type { AiActivityEntry } from '../types/inbox';
import { ToggleGroup, ToggleGroupItem } from './ui/toggle-group';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { cn } from './ui/utils';

export type InboxPageProps = {
  executedBriefingInsightIds: readonly BriefingInsightId[];
  dismissedAmbientHistoryIds: readonly string[];
  onDismissAmbientHistory: (id: string) => void;
  aiActivityLog: readonly AiActivityEntry[];
  onTakeAction: (insightId: string) => void;
  onNavigate: (page: string) => void;
  brandColor: string;
  notificationBadgeCount: number;
};

type ReadFilter = 'all' | 'unread';
type InboxSort = 'newest' | 'oldest' | 'type';

export type InboxTypeVisibility = {
  briefing: boolean;
  history: boolean;
  activity: boolean;
};

const DEFAULT_TYPE_VISIBILITY: InboxTypeVisibility = {
  briefing: true,
  history: true,
  activity: true,
};

const INBOX_LIST_WIDTH_KEY = 'ambientCfo.inboxListWidthPx';
const INBOX_LIST_MIN = 260;
const INBOX_LIST_MAX = 560;
const INBOX_LIST_DEFAULT = 360;

function readStoredListWidth(): number {
  if (typeof window === 'undefined') return INBOX_LIST_DEFAULT;
  try {
    const raw = window.sessionStorage.getItem(INBOX_LIST_WIDTH_KEY);
    const n = raw ? parseInt(raw, 10) : NaN;
    if (Number.isFinite(n) && n >= INBOX_LIST_MIN && n <= INBOX_LIST_MAX) return n;
  } catch {
    /* ignore */
  }
  return INBOX_LIST_DEFAULT;
}

export type InboxItemKind = 'briefing' | 'history' | 'activity';

export type InboxItem =
  | {
      kind: 'briefing';
      id: string;
      sortKey: number;
      insightId: BriefingInsightId;
    }
  | {
      kind: 'history';
      id: string;
      sortKey: number;
    }
  | {
      kind: 'activity';
      id: string;
      sortKey: number;
    };

function formatRelativeTime(ts: number): string {
  const s = Math.floor((Date.now() - ts) / 1000);
  if (s < 45) return 'Just now';
  if (s < 3600) return `${Math.floor(s / 60)}m ago`;
  if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
  return `${Math.floor(s / 86400)}d ago`;
}

/** Approximate recency for seed history rows (newer = larger sortKey). */
function historyTimeLabelToSortKey(timeLabel: string, index: number): number {
  const now = Date.now();
  const map: Record<string, number> = {
    'Just now': 0,
    '12 min ago': 12 * 60 * 1000,
    '1 hr ago': 60 * 60 * 1000,
    '3 hr ago': 3 * 60 * 60 * 1000,
    Today: 6 * 60 * 60 * 1000,
    Yesterday: 28 * 60 * 60 * 1000,
    'This week': 5 * 24 * 60 * 60 * 1000,
  };
  const offset = map[timeLabel] ?? (index + 1) * 60 * 60 * 1000;
  return now - offset;
}

/** Suggested action items: stable pseudo-times (newer first by default). */
function briefingSortKey(insightId: BriefingInsightId): number {
  const order: BriefingInsightId[] = ['insight-1', 'insight-2', 'insight-3'];
  const idx = order.indexOf(insightId);
  return Date.now() - (idx >= 0 ? idx * 2 * 60 * 60 * 1000 : 0);
}

function buildMergedItems(
  executedBriefingInsightIds: readonly BriefingInsightId[],
  dismissedAmbientHistoryIds: readonly string[],
  aiActivityLog: readonly AiActivityEntry[],
): InboxItem[] {
  const items: InboxItem[] = [];

  BRIEFING_INSIGHT_ITEMS.filter((i) => !executedBriefingInsightIds.includes(i.id)).forEach((i) => {
    items.push({
      kind: 'briefing',
      id: i.id,
      sortKey: briefingSortKey(i.id),
      insightId: i.id,
    });
  });

  AMBIENT_ACTIONS_HISTORY.filter((n) => !dismissedAmbientHistoryIds.includes(n.id)).forEach(
    (n, idx) => {
      items.push({
        kind: 'history',
        id: n.id,
        sortKey: historyTimeLabelToSortKey(n.timeLabel, idx),
      });
    },
  );

  aiActivityLog.forEach((e) => {
    items.push({
      kind: 'activity',
      id: e.id,
      sortKey: e.at,
    });
  });

  return items;
}

function filterByType(items: InboxItem[], vis: InboxTypeVisibility): InboxItem[] {
  return items.filter((i) => {
    if (i.kind === 'briefing') return vis.briefing;
    if (i.kind === 'history') return vis.history;
    return vis.activity;
  });
}

function filterByReadState(items: InboxItem[], rf: ReadFilter, readIds: ReadonlySet<string>): InboxItem[] {
  if (rf === 'all') return items;
  return items.filter((i) => !readIds.has(i.id));
}

function typeRank(k: InboxItemKind): number {
  if (k === 'briefing') return 0;
  if (k === 'history') return 1;
  return 2;
}

function sortItems(items: InboxItem[], sort: InboxSort): InboxItem[] {
  const copy = [...items];
  if (sort === 'newest') {
    copy.sort((a, b) => b.sortKey - a.sortKey);
  } else if (sort === 'oldest') {
    copy.sort((a, b) => a.sortKey - b.sortKey);
  } else {
    copy.sort((a, b) => {
      const tr = typeRank(a.kind) - typeRank(b.kind);
      if (tr !== 0) return tr;
      return b.sortKey - a.sortKey;
    });
  }
  return copy;
}

function kindLabel(kind: InboxItemKind): string {
  if (kind === 'briefing') return 'Suggested action';
  if (kind === 'history') return 'History';
  return 'Activity';
}

export function InboxPage({
  executedBriefingInsightIds,
  dismissedAmbientHistoryIds,
  onDismissAmbientHistory,
  aiActivityLog,
  onTakeAction,
  onNavigate,
  brandColor,
  notificationBadgeCount,
}: InboxPageProps) {
  const [readFilter, setReadFilter] = React.useState<ReadFilter>('all');
  const [typeVisibility, setTypeVisibility] =
    React.useState<InboxTypeVisibility>(DEFAULT_TYPE_VISIBILITY);
  const [readIds, setReadIds] = React.useState<Set<string>>(() => new Set());
  const [sort, setSort] = React.useState<InboxSort>('newest');
  const [selectedId, setSelectedId] = React.useState<string | null>(null);
  /** Inline Explore data in detail pane (Inbox) — no side panel */
  const [inboxExploreForId, setInboxExploreForId] = React.useState<BriefingInsightId | null>(null);

  const [listPaneWidth, setListPaneWidth] = React.useState(readStoredListWidth);
  const [isMdLayout, setIsMdLayout] = React.useState(false);
  const listDragRef = React.useRef<{ startX: number; startW: number } | null>(null);

  React.useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const apply = () => setIsMdLayout(mq.matches);
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, []);

  const persistListWidth = React.useCallback((w: number) => {
    try {
      window.sessionStorage.setItem(INBOX_LIST_WIDTH_KEY, String(w));
    } catch {
      /* ignore */
    }
  }, []);

  const startListResize = React.useCallback(
    (clientX: number) => {
      listDragRef.current = { startX: clientX, startW: listPaneWidth };
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
    },
    [listPaneWidth],
  );

  React.useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const drag = listDragRef.current;
      if (!drag) return;
      const delta = e.clientX - drag.startX;
      const next = Math.min(INBOX_LIST_MAX, Math.max(INBOX_LIST_MIN, drag.startW + delta));
      setListPaneWidth(next);
    };
    const onUp = () => {
      if (!listDragRef.current) return;
      listDragRef.current = null;
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
      setListPaneWidth((w) => {
        persistListWidth(w);
        return w;
      });
    };
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
    };
  }, [persistListWidth]);

  const onListResizeKeyDown = React.useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setListPaneWidth((w) => {
        const next = Math.max(INBOX_LIST_MIN, w - 12);
        persistListWidth(next);
        return next;
      });
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      setListPaneWidth((w) => {
        const next = Math.min(INBOX_LIST_MAX, w + 12);
        persistListWidth(next);
        return next;
      });
    }
  }, [persistListWidth]);

  const merged = React.useMemo(
    () =>
      buildMergedItems(executedBriefingInsightIds, dismissedAmbientHistoryIds, aiActivityLog),
    [executedBriefingInsightIds, dismissedAmbientHistoryIds, aiActivityLog],
  );

  const typeFiltered = React.useMemo(
    () => filterByType(merged, typeVisibility),
    [merged, typeVisibility],
  );

  const readCounts = React.useMemo(() => {
    const unread = typeFiltered.filter((i) => !readIds.has(i.id)).length;
    return { all: typeFiltered.length, unread };
  }, [typeFiltered, readIds]);

  const filtered = React.useMemo(
    () => filterByReadState(typeFiltered, readFilter, readIds),
    [typeFiltered, readFilter, readIds],
  );

  const sorted = React.useMemo(() => sortItems(filtered, sort), [filtered, sort]);

  const hasActiveTypeFilter = React.useMemo(
    () =>
      !typeVisibility.briefing ||
      !typeVisibility.history ||
      !typeVisibility.activity,
    [typeVisibility],
  );

  const selectListItem = React.useCallback((itemId: string) => {
    setSelectedId(itemId);
    setReadIds((prev) => {
      if (prev.has(itemId)) return prev;
      const next = new Set(prev);
      next.add(itemId);
      return next;
    });
  }, []);

  React.useEffect(() => {
    if (selectedId && !sorted.some((i) => i.id === selectedId)) {
      setSelectedId(null);
    }
  }, [sorted, selectedId]);

  React.useEffect(() => {
    setInboxExploreForId(null);
  }, [selectedId]);

  const selectedItem = selectedId ? sorted.find((i) => i.id === selectedId) ?? null : null;

  const briefingById = React.useMemo(
    () => new Map(BRIEFING_INSIGHT_ITEMS.map((i) => [i.id, i])),
    [],
  );
  const historyById = React.useMemo(
    () => new Map(AMBIENT_ACTIONS_HISTORY.map((n) => [n.id, n])),
    [],
  );
  const activityById = React.useMemo(() => new Map(aiActivityLog.map((e) => [e.id, e])), [aiActivityLog]);

  const listRowMeta = (item: InboxItem) => {
    if (item.kind === 'briefing') {
      const b = briefingById.get(item.insightId);
      const summary =
        b && b.description.length > 80 ? `${b.description.slice(0, 80)}…` : (b?.description ?? '');
      return {
        title: b?.title ?? 'Suggested action',
        summary,
        time: b?.time ?? '',
        kind: item.kind,
      };
    }
    if (item.kind === 'history') {
      const h = historyById.get(item.id);
      const summary =
        h && h.body.length > 80 ? `${h.body.slice(0, 80)}…` : (h?.body ?? '');
      return {
        title: h?.title ?? 'History',
        summary,
        time: h?.timeLabel ?? '',
        kind: item.kind,
      };
    }
    const a = activityById.get(item.id);
    return {
      title: a?.title ?? 'Activity',
      summary: a?.detail ?? '',
      time: a ? formatRelativeTime(a.at) : '',
      kind: item.kind,
    };
  };

  return (
    <div className="flex min-h-0 flex-1 flex-col bg-gray-50/30 md:flex-row">
      {/* List column: toolbar + scrollable list. Mobile: fixed-ish height band + flex list */}
      <div
        className={cn(
          'flex min-h-0 min-w-0 flex-col border-gray-200 bg-white md:h-full md:shrink-0',
          'w-full border-b md:border-b-0 md:border-r',
          'h-[min(52vh,420px)] md:max-h-none md:flex-initial',
        )}
        style={
          isMdLayout
            ? { width: listPaneWidth, minWidth: INBOX_LIST_MIN, maxWidth: INBOX_LIST_MAX }
            : undefined
        }
      >
        <div className="shrink-0 border-b border-gray-200 bg-gray-50/90 px-3 py-3">
          <div className="mb-2 flex items-center gap-2">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[8px] border border-blue-100 bg-blue-50">
              <Bell className="h-4 w-4 text-blue-600" strokeWidth={1.75} />
            </div>
            <div className="min-w-0 flex items-center">
              <h1 className="text-base font-bold tracking-tight text-gray-900">Inbox</h1>
            </div>
          </div>

          <div
            role="toolbar"
            aria-label="Filter and sort inbox"
            className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between"
          >
            <div className="flex w-full flex-wrap items-center gap-2 sm:flex-1 sm:min-w-0">
              <ToggleGroup
                type="single"
                value={readFilter}
                onValueChange={(v) => {
                  if (v) setReadFilter(v as ReadFilter);
                }}
                variant="outline"
                size="sm"
                className="flex flex-1 min-w-0 flex-wrap justify-start gap-1 rounded-[8px] border border-gray-200 bg-white p-1 sm:flex-initial"
                aria-label="Filter inbox by read state"
              >
                <ToggleGroupItem
                  value="all"
                  className="data-[state=on]:bg-gray-900 data-[state=on]:text-white rounded-[6px] px-2.5 text-xs font-semibold"
                >
                  All{readCounts.all > 0 ? ` ${readCounts.all}` : ''}
                </ToggleGroupItem>
                <ToggleGroupItem
                  value="unread"
                  className="data-[state=on]:bg-gray-900 data-[state=on]:text-white rounded-[6px] px-2.5 text-xs font-semibold"
                >
                  Unread{readCounts.unread > 0 ? ` ${readCounts.unread}` : ''}
                </ToggleGroupItem>
              </ToggleGroup>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    type="button"
                    className={cn(
                      'relative inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-[8px] border border-gray-200 bg-white text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40',
                      hasActiveTypeFilter && 'border-blue-200 bg-blue-50/80 text-blue-700',
                    )}
                    aria-label="Filter by item type"
                    title="Filters"
                  >
                    <SlidersHorizontal className="h-4 w-4" strokeWidth={1.75} />
                    {hasActiveTypeFilter ? (
                      <span className="absolute right-1 top-1 h-1.5 w-1.5 rounded-full bg-blue-600" aria-hidden />
                    ) : null}
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="start"
                  className="z-[60] w-56 border border-gray-200 bg-white p-1 text-gray-900 shadow-lg"
                >
                  <DropdownMenuLabel className="px-2 py-1.5 text-xs font-semibold text-gray-500">
                    Item types
                  </DropdownMenuLabel>
                  <DropdownMenuCheckboxItem
                    className="text-sm text-gray-900 focus:bg-gray-100"
                    checked={typeVisibility.briefing}
                    onCheckedChange={(checked) =>
                      setTypeVisibility((v) => ({ ...v, briefing: checked === true }))
                    }
                  >
                    Suggested action
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    className="text-sm text-gray-900 focus:bg-gray-100"
                    checked={typeVisibility.history}
                    onCheckedChange={(checked) =>
                      setTypeVisibility((v) => ({ ...v, history: checked === true }))
                    }
                  >
                    History
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    className="text-sm text-gray-900 focus:bg-gray-100"
                    checked={typeVisibility.activity}
                    onCheckedChange={(checked) =>
                      setTypeVisibility((v) => ({ ...v, activity: checked === true }))
                    }
                  >
                    Activity
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuSeparator className="bg-gray-200" />
                  <DropdownMenuItem
                    className="text-xs font-medium text-blue-600 focus:text-blue-700"
                    onSelect={() => setTypeVisibility({ ...DEFAULT_TYPE_VISIBILITY })}
                  >
                    Reset types
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <label className="flex items-center gap-2 text-xs text-gray-600 shrink-0">
              <span className="font-medium whitespace-nowrap">Sort</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as InboxSort)}
                className="rounded-[6px] border border-gray-200 bg-white px-2 py-1.5 text-xs font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                aria-label="Sort inbox items"
              >
                <option value="newest">Newest first</option>
                <option value="oldest">Oldest first</option>
                <option value="type">By type</option>
              </select>
            </label>
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto custom-scrollbar">
          {sorted.length === 0 ? (
            <p className="px-4 py-8 text-center text-sm text-gray-500">No items match this filter.</p>
          ) : (
            <ul className="divide-y divide-gray-100" role="listbox" aria-label="Inbox items">
              {sorted.map((item) => {
                const meta = listRowMeta(item);
                const isSelected = item.id === selectedId;
                const isUnread = !readIds.has(item.id);
                const KindIcon =
                  item.kind === 'briefing'
                    ? ClipboardList
                    : item.kind === 'history'
                      ? HistoryIcon
                      : Activity;
                return (
                  <li key={`${item.kind}-${item.id}`}>
                    <button
                      type="button"
                      role="option"
                      aria-selected={isSelected}
                      aria-label={`${meta.title}${isUnread ? ', unread' : ', read'}`}
                      onClick={() => selectListItem(item.id)}
                      className={cn(
                        'flex w-full gap-3 border-l-[3px] py-3 pl-3 pr-4 text-left transition-colors',
                        isUnread &&
                          cn(
                            'border-l-blue-600 bg-gradient-to-r from-blue-50/95 to-blue-50/40',
                            !isSelected && 'hover:from-blue-50 hover:to-blue-50/60',
                          ),
                        !isUnread &&
                          cn(
                            'border-l-gray-200 bg-gray-50/40',
                            !isSelected && 'hover:bg-gray-100/80',
                          ),
                        isSelected &&
                          isUnread &&
                          'bg-gradient-to-r from-blue-100/90 to-blue-50/70 ring-1 ring-inset ring-blue-200',
                        isSelected && !isUnread && 'bg-blue-50/90 ring-1 ring-inset ring-blue-100',
                      )}
                    >
                      <div className="relative mt-0.5 shrink-0">
                        {isUnread ? (
                          <span
                            className="absolute -left-0.5 -top-0.5 h-2 w-2 rounded-full bg-blue-600 ring-2 ring-white"
                            aria-hidden
                          />
                        ) : null}
                        <div
                          className={cn(
                            'flex h-8 w-8 items-center justify-center rounded-[6px] border text-[10px] font-bold uppercase',
                            item.kind === 'briefing' &&
                              (isUnread
                                ? 'border-amber-300 bg-amber-100 text-amber-900 shadow-sm'
                                : 'border-amber-100 bg-amber-50/80 text-amber-700'),
                            item.kind === 'history' &&
                              (isUnread
                                ? 'border-slate-300 bg-slate-100 text-slate-800 shadow-sm'
                                : 'border-slate-100 bg-slate-50/80 text-slate-600'),
                            item.kind === 'activity' &&
                              (isUnread
                                ? 'border-violet-300 bg-violet-100 text-violet-900 shadow-sm'
                                : 'border-violet-100 bg-violet-50/80 text-violet-700'),
                          )}
                        >
                          <KindIcon className="h-4 w-4" strokeWidth={1.5} />
                        </div>
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <span
                            className={cn(
                              'line-clamp-2 text-sm',
                              isUnread ? 'font-bold text-gray-900' : 'font-medium text-gray-600',
                            )}
                          >
                            {meta.title}
                          </span>
                          <span
                            className={cn(
                              'shrink-0 text-[10px] tabular-nums',
                              isUnread ? 'text-gray-500' : 'text-gray-400',
                            )}
                          >
                            {meta.time}
                          </span>
                        </div>
                        <span
                          className={cn(
                            'mt-0.5 inline-block rounded px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide',
                            isUnread
                              ? 'bg-white/70 text-gray-600 ring-1 ring-gray-200/80'
                              : 'bg-gray-200/60 text-gray-500',
                          )}
                        >
                          {kindLabel(item.kind)}
                        </span>
                        <p
                          className={cn(
                            'mt-1 line-clamp-2 text-xs',
                            isUnread ? 'text-gray-600' : 'text-gray-500',
                          )}
                        >
                          {meta.summary}
                        </p>
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>

      {/* Desktop: drag to resize list vs detail */}
      <div
        role="separator"
        aria-orientation="vertical"
        aria-valuenow={listPaneWidth}
        aria-valuemin={INBOX_LIST_MIN}
        aria-valuemax={INBOX_LIST_MAX}
        aria-label="Resize inbox list width. Use left and right arrow keys to adjust."
        tabIndex={0}
        onMouseDown={(e) => {
          e.preventDefault();
          startListResize(e.clientX);
        }}
        onKeyDown={onListResizeKeyDown}
        className={cn(
          'hidden shrink-0 cursor-col-resize md:block',
          'w-1.5 border-x border-transparent bg-gray-200/90 hover:bg-blue-300 focus:outline-none focus-visible:bg-blue-400 focus-visible:ring-2 focus-visible:ring-blue-500/50',
        )}
      />

      {/* Detail column */}
      <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-y-auto custom-scrollbar bg-white md:bg-gray-50/20">
        {!selectedItem ? (
          <div className="flex flex-1 flex-col items-center justify-center px-8 py-16 text-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-gray-200 bg-gray-50">
              <Bell className="h-7 w-7 text-gray-400" strokeWidth={1.5} />
            </div>
            <h2 className="text-lg font-bold text-gray-900">Nothing selected</h2>
            <p className="mt-2 max-w-sm text-sm text-gray-500">
              Choose an item from the list to view details, run actions, or jump to the relevant page.
            </p>
            {notificationBadgeCount > 0 ? (
              <p className="mt-6 text-sm font-semibold text-gray-800">
                {notificationBadgeCount} item{notificationBadgeCount === 1 ? '' : 's'} need attention
                <span className="mt-1 block text-xs font-normal text-gray-500">
                  (open suggested actions + history you haven&apos;t dismissed)
                </span>
              </p>
            ) : (
              <p className="mt-6 text-sm text-gray-500">You&apos;re caught up.</p>
            )}
          </div>
        ) : selectedItem.kind === 'briefing' ? (
          (() => {
            const insight = briefingById.get(selectedItem.insightId);
            if (!insight) return null;
            const Icon = insight.icon;
            const exploreOpen =
              isBriefingInsightId(insight.id) && inboxExploreForId === insight.id;
            const exploreContent = isBriefingInsightId(insight.id)
              ? getBriefingExploreContent(insight.id)
              : null;
            return (
              <div className="mx-auto w-full max-w-2xl space-y-6 p-6 md:p-10">
                <div className="flex gap-4">
                  <div
                    className={`${insight.iconBg} ${insight.iconColor} flex h-11 w-11 shrink-0 items-center justify-center rounded-[8px]`}
                  >
                    <Icon className="h-5 w-5" strokeWidth={1.5} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400">
                      Suggested action
                    </p>
                    <h2 className="mt-1 text-xl font-bold text-gray-900">{insight.title}</h2>
                    <p className="mt-1 text-xs text-gray-500">{insight.time}</p>
                    <p className="mt-4 text-sm leading-relaxed text-gray-700">{insight.description}</p>
                    <div className="mt-6 flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => onTakeAction(insight.id)}
                        className="rounded-[8px] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-90"
                        style={{ backgroundColor: brandColor }}
                      >
                        Take action
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setInboxExploreForId((cur) =>
                            cur === insight.id ? null : (insight.id as BriefingInsightId),
                          )
                        }
                        className="rounded-[8px] border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                        aria-expanded={exploreOpen}
                      >
                        {exploreOpen ? 'Hide explore details' : 'Explore data'}
                      </button>
                    </div>
                  </div>
                </div>

                {exploreOpen && exploreContent ? (
                  <div
                    className="space-y-6 border-t border-gray-200 pt-8"
                    role="region"
                    aria-label="Explore data"
                  >
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                        Explore data
                      </p>
                      <h3 className="mt-1 text-lg font-semibold text-gray-900">{exploreContent.title}</h3>
                    </div>
                    <BriefingExploreSections explore={exploreContent} />
                  </div>
                ) : null}
              </div>
            );
          })()
        ) : selectedItem.kind === 'history' ? (
          (() => {
            const n = historyById.get(selectedItem.id);
            if (!n) return null;
            return (
              <div className="mx-auto w-full max-w-2xl space-y-6 p-6 md:p-10">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400">History</p>
                  <h2 className="mt-1 text-xl font-bold text-gray-900">{n.title}</h2>
                  <p className="mt-1 text-xs text-gray-500">{n.timeLabel}</p>
                  <p className="mt-4 text-sm leading-relaxed text-gray-700">{n.body}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {n.navigateTo ? (
                    <button
                      type="button"
                      onClick={() => onNavigate(n.navigateTo!)}
                      className="inline-flex items-center gap-0.5 rounded-[8px] bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                    >
                      Open <ChevronRight className="h-4 w-4" />
                    </button>
                  ) : null}
                  <button
                    type="button"
                    onClick={() => {
                      onDismissAmbientHistory(n.id);
                      setSelectedId(null);
                    }}
                    className="rounded-[8px] border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            );
          })()
        ) : (
          (() => {
            const e = activityById.get(selectedItem.id);
            if (!e) return null;
            return (
              <div className="mx-auto w-full max-w-2xl space-y-6 p-6 md:p-10">
                <div className="flex gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[8px] border border-violet-200 bg-violet-50">
                    <Sparkles className="h-5 w-5 text-violet-600" strokeWidth={1.5} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400">Live activity</p>
                    <h2 className="mt-1 text-xl font-bold text-gray-900">{e.title}</h2>
                    <p className="mt-1 text-[11px] text-gray-400">{formatRelativeTime(e.at)}</p>
                    <p className="mt-1 text-xs text-gray-500">Kind: {e.kind}</p>
                    <p className="mt-4 text-sm leading-relaxed text-gray-700">{e.detail}</p>
                  </div>
                </div>
              </div>
            );
          })()
        )}
      </div>
    </div>
  );
}
