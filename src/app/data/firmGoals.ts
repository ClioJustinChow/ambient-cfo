/**
 * Firm-level goals Firm Intelligence uses to filter insights, alerts, and recommendations.
 * @see prototypePersona for primary user name (Rachel).
 */

import { USER_FIRST_NAME } from './prototypePersona';

export type FirmGoalStatus = 'on_track' | 'behind';

export type FirmGoalDefinition = {
  id: string;
  title: string;
  /** Short line under the title (how we measure it in the prototype). */
  metricHint: string;
  progressCurrentLabel: string;
  progressTargetLabel: string;
  /** 0–100 for progress bar */
  progressPct: number;
  status: FirmGoalStatus;
};

export const FIRM_INTELLIGENCE_GOALS_FILTER_NARRATIVE = `Every insight, alert, and recommendation Firm Intelligence delivers is now filtered through these goals. The system knows what ${USER_FIRST_NAME} is trying to achieve—not just what the numbers say.`;

/** Three firm goals (prototype progress is illustrative). */
export const FIRM_GOAL_DEFINITIONS: FirmGoalDefinition[] = [
  {
    id: 'net_revenue_yoy',
    title: 'Grow net revenue by 15% year-over-year',
    metricHint: 'Net revenue growth vs prior year (trailing)',
    progressCurrentLabel: '+11% YoY',
    progressTargetLabel: '+15% YoY',
    progressPct: 73,
    status: 'on_track',
  },
  {
    id: 'days_to_collect',
    title: 'Reduce average days-to-collect from 38 to 28 days',
    metricHint: 'Firmwide invoice-to-cash (rolling 90 days)',
    progressCurrentLabel: '32 days avg',
    progressTargetLabel: '28-day target',
    progressPct: 60,
    status: 'behind',
  },
  {
    id: 'operating_reserve',
    title: 'Maintain a minimum 60-day operating cash reserve',
    metricHint: 'Operating cash ÷ average daily burn',
    progressCurrentLabel: '52-day reserve',
    progressTargetLabel: '60-day minimum',
    progressPct: 87,
    status: 'on_track',
  },
];

export function firmGoalsOnTrackCount(): { onTrack: number; total: number } {
  const total = FIRM_GOAL_DEFINITIONS.length;
  const onTrack = FIRM_GOAL_DEFINITIONS.filter((g) => g.status === 'on_track').length;
  return { onTrack, total };
}
