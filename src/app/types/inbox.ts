/** AI / automation log row (append-only in prototype). */
export type AiActivityEntry = {
  id: string;
  at: number;
  title: string;
  detail: string;
  kind: string;
};
