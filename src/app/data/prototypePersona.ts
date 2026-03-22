/** Single source of truth for demo firm + primary user (Summit Legal Group / Rachel Mercer). */

export const FIRM_NAME = 'Summit Legal Group';
export const FIRM_ATTORNEY_COUNT = 82;

export const USER_FIRST_NAME = 'Rachel';
export const USER_LAST_NAME = 'Mercer';
export const USER_FULL_NAME = `${USER_FIRST_NAME} ${USER_LAST_NAME}`;
export const USER_INITIALS = 'RM';
export const USER_EMAIL = 'r.mercer@summitlegal.com';
export const USER_ROLE = 'Managing Partner';

/** Default Finances page title shown in nav + header */
export const FINANCE_DEFAULT_PAGE_TITLE = '2026 Strategic Roadmap';

export const FIRM_STORY = `Rachel is the managing partner at Summit Legal Group, an ${FIRM_ATTORNEY_COUNT}-attorney multi-practice firm. She is a lawyer first and a business operator second. She knows the firm’s financials matter deeply, but she doesn’t have time to become a financial analyst. Every month, her bookkeeper sends a PDF with 14 standard reports. Rachel opens it, scans the P&L, checks the cash balance, and closes it—never sure whether she’s looking at the right things or if there’s something important she’s missing.`;

export const DIGITAL_TWIN_CATALOG_DESC =
  'Living model: firm data, peer benchmarks, and industry trends—pressure-test runway, headcount, and rates before you decide.';

export const DIGITAL_TWIN_HEADLINE = 'Digital Twin';

export const DIGITAL_TWIN_BODY =
  'Clio builds a digital twin of Summit—a living model that triangulates your firm’s own data, anonymized peer benchmarks, and industry trends. Use it to pressure-test decisions before you make them: What happens to cash runway if two senior associates leave? What does a 10% rate increase in Real Estate do to revenue, based on what comparable firms have experienced?';

export const DIGITAL_TWIN_DISCLAIMER =
  'The digital twin does not predict the future. It gives you a financially grounded way to plan for it.';

export const DIGITAL_TWIN_BULLETS = [
  'Continuous benchmarking against anonymized peer firms in the same region and practice mix',
  'Models growth, headcount, rate, and operational scenarios before decisions are made',
  'Every scenario grounded in real firm performance data—not generic assumptions',
] as const;
