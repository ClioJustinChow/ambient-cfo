import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { X, LayoutDashboard, GripVertical, Check, Plus, AlertCircle, Trash2, AlertTriangle, Maximize2, Minimize2 } from 'lucide-react';
import { Input } from './ui/input';
import {
  WIDGET_CATALOG,
  FinanceWidgetContent,
  hydratePlacedWidgets,
  financePageWidgetsFromHydrated,
  layoutSizeToGridClass,
  defaultLayoutSizeForWidgetId,
  EMBEDDED_REPORT_WIDGET_ID,
  ReportViewToolbar,
  type FinancePageWidget,
  type HydratedPlacedWidget,
  type ReportLibraryEntry,
  type ReportWidgetView,
} from './financeWidgetCatalog';
import type { LucideIcon } from 'lucide-react';
import { FileText } from 'lucide-react';
import { buildBriefingFinancialSnapshot } from '../data/briefingFinancialImpact';
import type { BriefingInsightId } from '../data/briefingPanelContent';
import { StrategicDashboardChartsProvider } from '../context/StrategicDashboardChartsContext';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';

const ItemTypes = {
  WIDGET: 'widget',
  /** Reorder widgets already on the canvas */
  CANVAS_WIDGET: 'canvas_widget',
};

type CanvasWidgetItem = HydratedPlacedWidget;

type SortableCanvasWidgetProps = {
  widget: CanvasWidgetItem;
  index: number;
  moveWidget: (dragIndex: number, hoverIndex: number) => void;
  removeWidget: (instanceId: string) => void;
  toggleLayoutSize: (instanceId: string) => void;
  onReportViewChange: (instanceId: string, reportView: ReportWidgetView) => void;
  onTakeAction?: (insightId: string) => void;
  onExploreData?: (insightId: string) => void;
  executedBriefingInsightIds?: readonly BriefingInsightId[];
};

function SortableCanvasWidget({
  widget,
  index,
  moveWidget,
  removeWidget,
  toggleLayoutSize,
  onReportViewChange,
  onTakeAction,
  onExploreData,
  executedBriefingInsightIds,
}: SortableCanvasWidgetProps) {
  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, dragRef] = useDrag({
    type: ItemTypes.CANVAS_WIDGET,
    item: () => ({ index, instanceId: widget.instanceId }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, dropRef] = useDrop({
    accept: ItemTypes.CANVAS_WIDGET,
    hover(item: { index: number; instanceId: string }, monitor) {
      if (!ref.current) return;
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) return;
      moveWidget(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  dropRef(ref);

  return (
    <div
      ref={ref}
      className={`bg-white rounded-[12px] shadow-sm border border-gray-200 p-5 flex flex-col relative group animate-in zoom-in-95 duration-200 ${layoutSizeToGridClass(widget.layoutSize)} overflow-hidden ${
        isDragging ? 'opacity-40 ring-2 ring-blue-400 ring-offset-2 z-10' : ''
      }`}
    >
      <div className={`flex items-start justify-between ${widget.id === 'ambient_cfo' ? 'mb-0 z-10 relative' : 'mb-2'}`}>
        <div className="flex items-center gap-2 min-w-0">
          <button
            type="button"
            ref={(node) => {
              dragRef(node);
            }}
            className="p-1 -ml-1 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 cursor-grab active:cursor-grabbing touch-none"
            title="Drag to reorder"
            aria-label="Drag to reorder widget"
          >
            <GripVertical className="w-4 h-4" />
          </button>
          {widget.id !== 'ambient_cfo' && (
            <h3 className="text-[14px] font-bold text-gray-900 truncate">{widget.title}</h3>
          )}
        </div>
        <div className="flex items-center gap-1 shrink-0 relative z-10">
          <span
            className={`text-[10px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded-[4px] border mr-0.5 ${
              widget.layoutSize === 'expanded'
                ? 'text-blue-700 bg-blue-50 border-blue-100'
                : 'text-gray-600 bg-gray-50 border-gray-200'
            }`}
          >
            {widget.layoutSize === 'expanded' ? 'Expanded' : 'Compact'}
          </span>
          <button
            type="button"
            onClick={() => toggleLayoutSize(widget.instanceId)}
            className="text-gray-400 hover:text-blue-600 p-1.5 rounded-md hover:bg-blue-50 transition-colors"
            title={
              widget.layoutSize === 'expanded'
                ? 'Switch to compact width (half row on large screens)'
                : 'Expand to full row width'
            }
            aria-label={
              widget.layoutSize === 'expanded' ? 'Use compact widget width' : 'Expand widget to full width'
            }
          >
            {widget.layoutSize === 'expanded' ? (
              <Minimize2 className="w-4 h-4" strokeWidth={1.75} />
            ) : (
              <Maximize2 className="w-4 h-4" strokeWidth={1.75} />
            )}
          </button>
          <button
            type="button"
            onClick={() => removeWidget(widget.instanceId)}
            className="text-gray-400 hover:text-red-500 p-1.5 rounded-md hover:bg-red-50 transition-colors"
            aria-label="Remove widget"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {widget.id === EMBEDDED_REPORT_WIDGET_ID && (
        <ReportViewToolbar
          className="mb-2"
          value={widget.reportView ?? 'chart_compact'}
          onChange={(v) => onReportViewChange(widget.instanceId, v)}
        />
      )}

      <div className="flex-1 text-gray-600 text-sm min-w-0">
        <FinanceWidgetContent
          id={widget.id}
          instanceId={widget.instanceId}
          onTakeAction={onTakeAction}
          onExploreData={onExploreData}
          executedBriefingInsightIds={executedBriefingInsightIds}
          reportName={widget.reportName}
          reportView={widget.reportView}
        />
      </div>
    </div>
  );
}

// Draggable catalog widget
const LibraryItem = ({ item }: { item: (typeof WIDGET_CATALOG)[number] }) => {
  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: ItemTypes.WIDGET,
    item: { id: item.id } as { id: string; reportName?: string },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={(node) => dragRef(node) as any}
      className={`p-3 rounded-[8px] border border-gray-200 bg-white mb-3 cursor-grab hover:border-blue-400 hover:shadow-sm transition-all group flex items-start gap-3 ${
        isDragging ? 'opacity-50' : 'opacity-100'
      }`}
    >
      <div className="w-8 h-8 rounded-[6px] bg-gray-50 flex items-center justify-center border border-gray-100 shrink-0 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
        <item.icon className="w-4 h-4 text-gray-500 group-hover:text-blue-600" />
      </div>
      <div>
        <h4 className="text-[13px] font-semibold text-gray-900 leading-tight mb-1">{item.title}</h4>
        <p className="text-[11px] text-gray-500 leading-relaxed">{item.desc}</p>
      </div>
    </div>
  );
};

function ReportLibraryItem({ name, desc, icon: Icon }: { name: string; desc: string; icon: LucideIcon }) {
  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: ItemTypes.WIDGET,
    item: { id: EMBEDDED_REPORT_WIDGET_ID, reportName: name } as { id: string; reportName?: string },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={(node) => dragRef(node) as unknown as void}
      className={`p-3 rounded-[8px] border border-gray-200 bg-white mb-3 cursor-grab hover:border-violet-400 hover:shadow-sm transition-all group flex items-start gap-3 ${
        isDragging ? 'opacity-50' : 'opacity-100'
      }`}
    >
      <div className="w-8 h-8 rounded-[6px] bg-violet-50 flex items-center justify-center border border-violet-100 shrink-0 group-hover:bg-violet-100 transition-colors">
        <Icon className="w-4 h-4 text-violet-600" />
      </div>
      <div>
        <h4 className="text-[13px] font-semibold text-gray-900 leading-tight mb-1">{name}</h4>
        <p className="text-[11px] text-gray-500 leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

export const DashboardCustomizerContent = ({
  onClose,
  onTakeAction,
  onExploreData,
  mode,
  dashboardTitle,
  initialWidgets,
  reportLibrary,
  onSaveDashboard,
  onDeleteDashboard,
  executedBriefingInsightIds,
}: {
  onClose: () => void;
  onTakeAction?: (insightId: string) => void;
  onExploreData?: (insightId: string) => void;
  mode: 'create' | 'edit';
  dashboardTitle: string;
  /** Persisted placement; empty = empty canvas */
  initialWidgets: FinancePageWidget[];
  /** Same source as Reports tab — drives embedded report widgets */
  reportLibrary: readonly ReportLibraryEntry[];
  onSaveDashboard: (title: string, widgets: FinancePageWidget[]) => void;
  onDeleteDashboard: () => void;
  executedBriefingInsightIds?: readonly BriefingInsightId[];
}) => {
  const [draftDashboardTitle, setDraftDashboardTitle] = useState(dashboardTitle);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteConfirmInput, setDeleteConfirmInput] = useState('');
  useEffect(() => {
    setDraftDashboardTitle(dashboardTitle);
  }, [dashboardTitle]);

  const deleteNameMatches = deleteConfirmInput === dashboardTitle;

  const [canvasWidgets, setCanvasWidgets] = useState(() => hydratePlacedWidgets(initialWidgets, reportLibrary));

  useEffect(() => {
    setCanvasWidgets(hydratePlacedWidgets(initialWidgets, reportLibrary));
  }, [initialWidgets, reportLibrary]);

  const addReportWidgetToCanvas = useCallback(
    (reportName: string) => {
      const meta = reportLibrary.find((r) => r.name === reportName);
      const instanceId = `w_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      setCanvasWidgets((prev) => [
        ...prev,
        {
          id: EMBEDDED_REPORT_WIDGET_ID,
          title: reportName,
          desc: meta?.desc ?? 'Financial report',
          icon: meta?.icon ?? FileText,
          category: 'Reports',
          instanceId,
          layoutSize: 'expanded' as const,
          reportName,
          reportView: 'chart_compact' as const,
        },
      ]);
    },
    [reportLibrary],
  );

  const addWidgetToCanvas = useCallback(
    (id: string, reportName?: string) => {
      if (id === EMBEDDED_REPORT_WIDGET_ID && reportName) {
        addReportWidgetToCanvas(reportName);
        return;
      }
      const catalogItem = WIDGET_CATALOG.find((w) => w.id === id);
      if (catalogItem) {
        const layoutSize = defaultLayoutSizeForWidgetId(id);
        setCanvasWidgets((prev) => [
          ...prev,
          {
            ...catalogItem,
            instanceId: `w_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            layoutSize,
          },
        ]);
      }
    },
    [addReportWidgetToCanvas],
  );

  const addWidgetToCanvasRef = useRef(addWidgetToCanvas);
  addWidgetToCanvasRef.current = addWidgetToCanvas;

  const [{ isOver }, dropRef] = useDrop(() => ({
    accept: ItemTypes.WIDGET,
    drop: (item: { id: string; reportName?: string }) => addWidgetToCanvasRef.current(item.id, item.reportName),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  const removeWidget = (instanceId: string) => {
    setCanvasWidgets((prev) => prev.filter((w) => w.instanceId !== instanceId));
  };

  const moveWidget = useCallback((dragIndex: number, hoverIndex: number) => {
    setCanvasWidgets((prev) => {
      const next = [...prev];
      const [removed] = next.splice(dragIndex, 1);
      next.splice(hoverIndex, 0, removed);
      return next;
    });
  }, []);

  const toggleWidgetLayoutSize = useCallback((instanceId: string) => {
    setCanvasWidgets((prev) =>
      prev.map((w) =>
        w.instanceId === instanceId
          ? { ...w, layoutSize: w.layoutSize === 'expanded' ? 'compact' : 'expanded' }
          : w,
      ),
    );
  }, []);

  const onReportViewChange = useCallback((instanceId: string, reportView: ReportWidgetView) => {
    setCanvasWidgets((prev) =>
      prev.map((w) => (w.instanceId === instanceId ? { ...w, reportView } : w)),
    );
  }, []);

  const categories = Array.from(new Set(WIDGET_CATALOG.map((w) => w.category)));

  return (
      <div className="max-w-[1400px] mx-auto p-4 md:p-8 flex flex-col h-[calc(100vh-80px)] animate-in fade-in duration-300">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-6 shrink-0">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
              <LayoutDashboard className="w-6 h-6 text-blue-600" />
              {mode === 'create' ? 'New Finances page' : 'Customize dashboard'}
            </h1>
          </div>
          <div className="flex items-center gap-2 flex-wrap justify-end">
            {mode === 'edit' && (
            <button
              type="button"
              onClick={() => {
                setDeleteConfirmInput('');
                setDeleteDialogOpen(true);
              }}
              className="p-2.5 rounded-[8px] border border-gray-200 bg-white text-gray-500 hover:text-red-600 hover:bg-red-50 hover:border-red-200 transition-colors"
              title="Delete dashboard"
              aria-label="Delete dashboard"
            >
              <Trash2 className="w-4 h-4" strokeWidth={1.5} />
            </button>
            )}
            <button 
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-[8px] text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button 
              type="button"
              onClick={() =>
                onSaveDashboard(
                  draftDashboardTitle.trim() ||
                    (mode === 'edit' ? dashboardTitle : '') ||
                    'Untitled dashboard',
                  financePageWidgetsFromHydrated(canvasWidgets),
                )
              }
              className="px-4 py-2 bg-blue-600 text-white rounded-[8px] text-sm font-medium hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-sm shadow-blue-600/20"
            >
              <Check className="w-4 h-4" />
              Save layout
            </button>
          </div>
        </div>

        <Dialog
          open={deleteDialogOpen}
          onOpenChange={(open) => {
            setDeleteDialogOpen(open);
            if (!open) setDeleteConfirmInput('');
          }}
        >
          <DialogContent className="bg-white border-gray-200 text-gray-900 sm:max-w-[480px] gap-0 p-0 overflow-hidden z-[100]">
            <div className="p-6 pb-4">
              <DialogHeader>
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600">
                    <AlertTriangle className="w-5 h-5" strokeWidth={1.5} />
                  </div>
                  <div>
                    <DialogTitle className="text-gray-900 text-lg text-left">
                      Delete this dashboard?
                    </DialogTitle>
                    <DialogDescription asChild>
                      <div className="text-gray-600 text-sm text-left mt-3 space-y-3">
                        <p className="font-medium text-gray-800">If you continue:</p>
                        <ul className="list-disc pl-4 space-y-1.5 text-gray-600">
                          <li>This dashboard is removed for <strong>everyone</strong> at your firm—collaborators and viewers lose access immediately.</li>
                          <li>All widgets, layout, and settings for this page are <strong>permanently erased</strong> and cannot be restored.</li>
                          <li>Bookmarks and any exports or schedules tied only to this dashboard will <strong>stop working</strong>.</li>
                        </ul>
                        <p className="text-gray-800 pt-1">
                          To confirm, type the dashboard&apos;s full name <strong>exactly</strong> as shown below (including capitalization).
                        </p>
                        <p className="font-mono text-sm bg-gray-100 border border-gray-200 rounded-md px-3 py-2 text-gray-900 break-all">
                          {dashboardTitle || '(empty name)'}
                        </p>
                      </div>
                    </DialogDescription>
                  </div>
                </div>
              </DialogHeader>
            </div>
            <div className="px-6 pb-4 border-t border-gray-100 pt-4">
              <label htmlFor="delete-dashboard-confirm" className="sr-only">
                Type dashboard name to confirm deletion
              </label>
              <Input
                id="delete-dashboard-confirm"
                value={deleteConfirmInput}
                onChange={(e) => setDeleteConfirmInput(e.target.value)}
                placeholder="Type the full dashboard name"
                autoComplete="off"
                className="border-gray-200 bg-white text-gray-900 placeholder:text-gray-400"
              />
            </div>
            <DialogFooter className="flex-row justify-end gap-2 border-t border-gray-100 bg-gray-50/80 px-6 py-4">
              <button
                type="button"
                onClick={() => setDeleteDialogOpen(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-[8px] hover:bg-gray-50 transition-colors"
              >
                Keep dashboard
              </button>
              <button
                type="button"
                disabled={!deleteNameMatches}
                onClick={() => {
                  setDeleteDialogOpen(false);
                  setDeleteConfirmInput('');
                  onDeleteDashboard();
                }}
                className="px-4 py-2 text-sm font-medium text-white rounded-[8px] transition-opacity disabled:opacity-40 disabled:cursor-not-allowed bg-red-600 hover:bg-red-700"
              >
                Delete permanently
              </button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <div className="mb-6 shrink-0 max-w-xl">
          <Input
            aria-label={mode === 'create' ? 'Name for new page' : 'Dashboard title'}
            value={draftDashboardTitle}
            onChange={(e) => setDraftDashboardTitle(e.target.value)}
            placeholder={
              mode === 'create' ? 'Name shown in sidebar (e.g. Q2 Revenue board)' : 'Dashboard title'
            }
            className="border-gray-200 bg-white text-gray-900 placeholder:text-gray-400"
          />
        </div>

        {/* Main Work Area */}
        <div className="flex gap-6 flex-1 min-h-0">
          
          {/* Canvas (Droppable Area) */}
          <div 
            ref={(node) => dropRef(node) as any}
            className={`flex-1 bg-gray-100/50 rounded-2xl border-2 border-dashed p-6 overflow-y-auto custom-scrollbar transition-colors ${isOver ? 'border-blue-400 bg-blue-50/30' : 'border-gray-200'}`}
          >
            {canvasWidgets.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-gray-400">
                <LayoutDashboard className="w-12 h-12 mb-4 text-gray-300" />
                <p className="text-sm font-medium text-gray-600">Your dashboard is empty</p>
                <p className="text-xs mt-1 text-center max-w-sm">
                  Drag widgets from the library to add them. On each card, use the grip to reorder and the expand/compact control for full row vs half row on large screens.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 auto-rows-max">
                {canvasWidgets.map((widget, index) => (
                  <SortableCanvasWidget
                    key={widget.instanceId}
                    widget={widget}
                    index={index}
                    moveWidget={moveWidget}
                    removeWidget={removeWidget}
                    toggleLayoutSize={toggleWidgetLayoutSize}
                    onReportViewChange={onReportViewChange}
                    onTakeAction={onTakeAction}
                    onExploreData={onExploreData}
                    executedBriefingInsightIds={executedBriefingInsightIds}
                  />
                ))}
              </div>
            )}
            
            {/* Drop target indicator when dragging over */}
            {isOver && (
              <div className="mt-6 border-2 border-blue-300 border-dashed rounded-[12px] h-[200px] bg-blue-50/50 flex items-center justify-center animate-pulse">
                <span className="text-blue-600 font-medium text-sm flex items-center gap-2">
                  <Plus className="w-4 h-4" /> Drop widget here
                </span>
              </div>
            )}
          </div>

          {/* Right Sidebar - Widget Library */}
          <div className="w-[320px] bg-white rounded-2xl border border-gray-200 shadow-sm flex flex-col overflow-hidden shrink-0">
            <div className="p-4 border-b border-gray-100 bg-gray-50/50">
              <h2 className="text-[14px] font-bold text-gray-900">Widget Library</h2>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 custom-scrollbar space-y-6">
              {categories.map((category) => (
                <div key={category}>
                  <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-3 px-1">{category}</h3>
                  <div className="flex flex-col">
                    {WIDGET_CATALOG.filter((w) => w.category === category).map((widget) => (
                      <LibraryItem key={widget.id} item={widget} />
                    ))}
                  </div>
                </div>
              ))}
              {reportLibrary.length > 0 && (
                <div>
                  <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-3 px-1">Reports</h3>
                  <p className="text-[10px] text-gray-500 mb-2 px-1 leading-relaxed">
                    Drag a report to embed it on this dashboard. Toggle Full / Summary / Chart on each card.
                  </p>
                  <div className="flex flex-col">
                    {reportLibrary.map((r) => (
                      <ReportLibraryItem key={r.name} name={r.name} desc={r.desc} icon={r.icon} />
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <div className="p-4 border-t border-gray-100 bg-blue-50/30">
               <div className="flex gap-2 text-blue-700">
                 <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                 <p className="text-[11px] leading-relaxed">
                   Need custom reports? Ask your Ambient CFO to generate a new widget.
                 </p>
               </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export const DashboardCustomizer = ({
  onClose,
  onTakeAction,
  onExploreData,
  mode,
  dashboardTitle,
  initialWidgets,
  reportLibrary,
  onSaveDashboard,
  onDeleteDashboard,
  executedBriefingInsightIds,
}: {
  onClose: () => void;
  onTakeAction?: (insightId: string) => void;
  onExploreData?: (insightId: string) => void;
  mode: 'create' | 'edit';
  dashboardTitle: string;
  initialWidgets: FinancePageWidget[];
  reportLibrary: readonly ReportLibraryEntry[];
  onSaveDashboard: (title: string, widgets: FinancePageWidget[]) => void;
  onDeleteDashboard: () => void;
  executedBriefingInsightIds?: readonly BriefingInsightId[];
}) => {
  const chartsValue = useMemo(() => {
    const snap = buildBriefingFinancialSnapshot(executedBriefingInsightIds ?? []);
    return {
      displayStrategicData: snap.strategicRows,
      selectedModelId: null as string | null,
      briefingSnapshot: snap,
    };
  }, [executedBriefingInsightIds]);

  return (
    <DndProvider backend={HTML5Backend}>
      <StrategicDashboardChartsProvider value={chartsValue}>
        <DashboardCustomizerContent
          onClose={onClose}
          onTakeAction={onTakeAction}
          onExploreData={onExploreData}
          mode={mode}
          dashboardTitle={dashboardTitle}
          initialWidgets={initialWidgets}
          reportLibrary={reportLibrary}
          onSaveDashboard={onSaveDashboard}
          onDeleteDashboard={onDeleteDashboard}
          executedBriefingInsightIds={executedBriefingInsightIds}
        />
      </StrategicDashboardChartsProvider>
    </DndProvider>
  );
};