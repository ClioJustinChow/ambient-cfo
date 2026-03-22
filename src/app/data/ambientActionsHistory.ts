/**
 * Prototype seed: narrative history of actions Ambient CFO / automation has performed for the firm.
 * (Copy themes from product vision; not labeled by internal CX pillar docs.)
 */

export type AmbientActionHistoryItem = {
  id: string;
  title: string;
  body: string;
  timeLabel: string;
  navigateTo?: string;
};

export const AMBIENT_ACTIONS_HISTORY: AmbientActionHistoryItem[] = [
  {
    id: 'hist-coa',
    title: 'Chart of accounts scaffold applied',
    body: 'We mapped your practice structure to a starter chart of accounts and default dimensions. Exceptions are flagged for review before first close.',
    timeLabel: 'Today',
    navigateTo: 'Chart of Accounts',
  },
  {
    id: 'hist-bank',
    title: 'Bank feeds linked and pre-reconciled',
    body: 'We connected two operating accounts and pre-matched 94% of last month’s transactions. Six line items are waiting for your review.',
    timeLabel: 'Yesterday',
    navigateTo: 'Transactions',
  },
  {
    id: 'hist-trust',
    title: 'Trust balance review — Chen, M.',
    body: 'We detected the trust balance approaching the retainer floor, drafted a client funds-transfer request, and routed it for approval to responsible attorney Michael Torres.',
    timeLabel: '12 min ago',
    navigateTo: 'Funds In',
  },
  {
    id: 'hist-trust-xfer',
    title: 'Trust transfer categorized',
    body: 'We proposed matter coding for a $4,200 trust-to-operating transfer: Estate — Chen (88% confidence). You can confirm or edit in the ledger.',
    timeLabel: '1 hr ago',
    navigateTo: 'Transactions',
  },
  {
    id: 'hist-ar',
    title: 'Collections narrative vs Q3 goal',
    body: 'We produced a guided read tying 31–60 day A/R (up 11% QoQ) to your Q3 cash target — narrative only, no spreadsheet assembly.',
    timeLabel: '3 hr ago',
    navigateTo: 'fp_default',
  },
  {
    id: 'hist-mix',
    title: 'Practice mix summary prepared',
    body: 'We summarized YTD mix: corporate +8% vs plan, litigation flat, blended rate up slightly from matter composition — ready for partner review.',
    timeLabel: 'This week',
    navigateTo: 'Dashboard',
  },
  {
    id: 'hist-remind',
    title: 'Collection reminder cadence enabled',
    body: 'We turned on 31–60 day reminders for clients not on payment plans, aligned with your days-to-collect goal.',
    timeLabel: 'Just now',
    navigateTo: 'Financial Goals',
  },
  {
    id: 'hist-vendor',
    title: 'Q3 renewal impact brief',
    body: 'We clustered three G&A renewals hitting next month (~0.4% of monthly OpEx) and outlined seat-downgrade and deferral options.',
    timeLabel: 'Yesterday',
    navigateTo: 'Funds Out',
  },
];
