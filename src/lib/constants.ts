export const INDUSTRIES = [
  { value: "MEDICAL", label: "医疗" },
  { value: "FINANCE", label: "金融" },
  { value: "EDUCATION", label: "教育" },
  { value: "MANUFACTURING", label: "制造" },
  { value: "RETAIL", label: "零售" },
  { value: "GENERAL", label: "通用" },
] as const;

export const ASSET_TYPES = [
  { value: "AI_AGENT", label: "AI智能体", color: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30" },
  { value: "WECHAT_MINI", label: "微信小程序", color: "bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30" },
  { value: "MOBILE_APP", label: "移动APP", color: "bg-purple-500/15 text-purple-600 dark:text-purple-400 border-purple-500/30" },
  { value: "ADMIN_SYSTEM", label: "后台系统", color: "bg-orange-500/15 text-orange-600 dark:text-orange-400 border-orange-500/30" },
  { value: "API", label: "API接口", color: "bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 border-cyan-500/30" },
] as const;

export type IndustryValue = (typeof INDUSTRIES)[number]["value"];
export type AssetTypeValue = (typeof ASSET_TYPES)[number]["value"];

export function getIndustryLabel(value: string): string {
  return INDUSTRIES.find((i) => i.value === value)?.label ?? value;
}

export function getAssetTypeLabel(value: string): string {
  return ASSET_TYPES.find((a) => a.value === value)?.label ?? value;
}

export function getAssetTypeColor(value: string): string {
  return ASSET_TYPES.find((a) => a.value === value)?.color ?? "bg-muted text-muted-foreground";
}

export const INDUSTRY_FILTER_OPTIONS = [
  { value: "ALL", label: "全部" },
  ...INDUSTRIES.map((i) => ({ value: i.value, label: i.label })),
];
