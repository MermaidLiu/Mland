/** Shared Pro pricing constants */
export const PRO_PRICE_PER_CASE_USD = 0.05;

export const PRO_PRICE_LABEL = `$${PRO_PRICE_PER_CASE_USD.toFixed(2)}`;

export const PRO_PRICE_NOTE =
  "Billed per medical case processed. Pay only for what you use — no minimum commitment.";

export const PRO_PRICE_NOTE_ZH =
  "按处理的医疗病例计费，用多少付多少，无最低消费。";

export function formatProMonthlyEstimate(casesPerMonth: number): string {
  const total = casesPerMonth * PRO_PRICE_PER_CASE_USD;
  return `$${total.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}/mo`;
}
