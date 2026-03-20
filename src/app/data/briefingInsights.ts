import type { LucideIcon } from 'lucide-react';
import { AlertTriangle, TrendingUp, CreditCard } from 'lucide-react';
import type { BriefingInsightId } from './briefingPanelContent';

export type BriefingInsightListItem = {
  id: BriefingInsightId;
  title: string;
  time: string;
  description: string;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
};

/** Single source for This Week's Briefing + Notifications */
export const BRIEFING_INSIGHT_ITEMS: BriefingInsightListItem[] = [
  {
    id: 'insight-1',
    title: 'High Collections Risk Detected',
    time: 'Just now',
    description:
      'Based on current matter activity and historical billing patterns, there is a $45k exposure risk for the pending invoices with Smith & Associates. Resolving this within 5 days is required to maintain your Q3 cash flow targets.',
    icon: AlertTriangle,
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-700',
  },
  {
    id: 'insight-2',
    title: 'Q3 Revenue Target Trajectory',
    time: '2 hours ago',
    description:
      'You are currently trending 15% above the projected baseline. The recent payment of $120k from Johnson Corp has pushed you closer to your Q3 revenue target.',
    icon: TrendingUp,
    iconBg: 'bg-emerald-100',
    iconColor: 'text-emerald-700',
  },
  {
    id: 'insight-3',
    title: 'Upcoming Software Renewals',
    time: 'Yesterday',
    description:
      'You have 3 annual software subscriptions renewing next week totaling $12,500. Consider reviewing seat utilization to optimize these upcoming expenses.',
    icon: CreditCard,
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-700',
  },
];
