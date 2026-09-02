/** MedSkill Plaza — student-facing pricing constants */

export const FREE_COINS_MONTHLY = 100;

export const PRO_MONTHLY_USD = 5.99;
export const PRO_MONTHLY_CNY = 39;
export const PRO_COINS_MONTHLY = 2000;

export const LAB_MONTHLY_USD = 49;
export const LAB_MONTHLY_CNY = 299;
export const LAB_SEATS = 5;
export const LAB_COINS_MONTHLY = 10000;

export const CONTRIBUTOR_REVENUE_SHARE = 0.7;
export const CUSTOM_PACKAGING_DOWN_USD = 5000;

export const COIN_PACKS = [
  { id: "starter", coins: 500, priceUsd: 1.49, priceCny: 9.9 },
  { id: "standard", coins: 3000, priceUsd: 6.99, priceCny: 49 },
  { id: "plus", coins: 12000, priceUsd: 19.99, priceCny: 149 },
] as const;

export const SKILL_COSTS = [
  { id: "academic-search", coins: 45 },
  { id: "hypothesis-test", coins: 50 },
  { id: "cox-regression", coins: 80 },
  { id: "deseq2", coins: 150 },
  { id: "dicom-seg", coins: 300 },
] as const;

export function formatPrice(locale: string, usd: number, cny: number): string {
  return locale === "zh" ? `¥${cny}` : `$${usd.toFixed(2)}`;
}

export function formatCoins(n: number, locale: string): string {
  const formatted = n.toLocaleString(locale === "zh" ? "zh-CN" : "en-US");
  return locale === "zh" ? `${formatted} 算力币` : `${formatted} coins`;
}

/** @deprecated Legacy hospital per-case pricing — used by solution sidebar only */
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
