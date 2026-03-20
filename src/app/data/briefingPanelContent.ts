/** Static copy for This Week's Briefing side panels (Explore Data + Take Action context). */

import type { DrillDownNode } from './drillDownLadder';
import {
  drillDownRootInsight1,
  drillDownRootInsight2,
  drillDownRootInsight3,
} from './drillDownExploreRoots';

export type BriefingInsightId = 'insight-1' | 'insight-2' | 'insight-3';

export function isBriefingInsightId(id: string): id is BriefingInsightId {
  return id === 'insight-1' || id === 'insight-2' || id === 'insight-3';
}

export interface BriefingExploreContent {
  title: string;
  aiAnalysis: { summary: string; whySurfacing: string };
  /** Firm → practice area → matter → person (in-panel drill-down) */
  drillDownRoot: DrillDownNode;
  recommendedActions: string[];
}

export const BRIEFING_EXPLORE_BY_ID: Record<BriefingInsightId, BriefingExploreContent> = {
  'insight-1': {
    title: 'High Collections Risk',
    aiAnalysis: {
      summary:
        'Smith & Associates represents roughly $45k in billed-but-unpaid work across two matters, with the oldest invoice at 47 days. Combined with slower matter close velocity this quarter, that concentration is elevating default risk on your near-term cash forecast.',
      whySurfacing:
        'We surface this because (1) this client is in your top decile by outstanding balance, (2) payment behavior has slipped versus their 24-month baseline, and (3) the amount sits in the window where proactive partner outreach historically recovers 60–80% of dollars within two weeks—before you’d need to adjust accruals or write-down expectations.',
    },
    drillDownRoot: drillDownRootInsight1,
    recommendedActions: [
      'Schedule a partner-to-client call on Smith & Associates within 48 hours; align on payment date and matter scope.',
      'Turn on automated 31–60 day reminders for all invoices in that bucket (excludes clients on payment plans).',
      'Pre-bill or refresh the estate matter estimate so the client sees an updated total and payment path.',
      'If no commitment by day 5, route to collections playbook per firm policy and flag for Q3 cash forecast.',
    ],
  },
  'insight-2': {
    title: 'Q3 Revenue Target Trajectory',
    aiAnalysis: {
      summary:
        'You are tracking about 15% above the Q3 revenue baseline after the $120k Johnson Corp receipt. On a cash basis, that payment improves runway; on an accrual basis, it confirms strong realization on corporate work this month.',
      whySurfacing:
        'We highlight this because the payment moved you inside the “on track to beat plan” band for the quarter. That matters for bonus pools, line-of-credit covenant headroom (where tied to trailing revenue), and whether you can safely fund planned hires without tapping reserves.',
    },
    drillDownRoot: drillDownRootInsight2,
    recommendedActions: [
      'Update the rolling Q3 forecast in finance so leadership sees the beat scenario—not just baseline.',
      'Identify one at-risk matter to protect margin (optional reallocation of junior time) while you’re ahead of plan.',
      'Communicate the trajectory to the comp committee template so expectations stay aligned with actuals.',
    ],
  },
  'insight-3': {
    title: 'Upcoming Software Renewals',
    aiAnalysis: {
      summary:
        'Three annual subscriptions renew next week for a combined $12,500. Utilization data suggests two of the three products have inactive seats, which is inflating OpEx relative to peer firms your size.',
      whySurfacing:
        'We surface renewals this far out because vendor terms rarely improve after auto-renew, and seat true-ups hit the P&L immediately. Catching this before renewal is the easiest lever to protect EBITDA without touching client-facing staffing.',
    },
    drillDownRoot: drillDownRootInsight3,
    recommendedActions: [
      'Run a seat utilization export for each vendor; remove or reassign inactive licenses before renewal.',
      'Ask for multi-year or nonprofit-style pricing if you commit to annual prepay.',
      'Defer non-critical upgrades tied to the same stack until Q4 if you need to smooth OpEx.',
    ],
  },
};

export function getBriefingExploreContent(id: string): BriefingExploreContent | null {
  if (!isBriefingInsightId(id)) return null;
  return BRIEFING_EXPLORE_BY_ID[id];
}

/** Short labels for Take Action panel header by insight */
export const BRIEFING_ACTION_HEADLINE: Record<BriefingInsightId, string> = {
  'insight-1': 'Collections recovery plan',
  'insight-2': 'Revenue & forecast actions',
  'insight-3': 'Renewal & cost optimization',
};
