export interface FeatureComparisonRow {
  feature: string;
  free: string | boolean;
  pro: string | boolean;
  highlight?: boolean;
}

export const FEATURE_COMPARISON: FeatureComparisonRow[] = [
  {
    feature: "前端界面与交互",
    free: true,
    pro: true,
  },
  {
    feature: "模拟演示数据",
    free: "✅ 自带 10 条",
    pro: "✅ 自带 10 条",
  },
  {
    feature: "上传真实患者病历/影像",
    free: false,
    pro: true,
    highlight: true,
  },
  {
    feature: "对接院内 HIS/LIS 系统",
    free: false,
    pro: true,
    highlight: true,
  },
  {
    feature: "数据永久留存（断电不丢）",
    free: false,
    pro: true,
    highlight: true,
  },
  {
    feature: "技术支持响应",
    free: "社区 Issue",
    pro: "7×24 专属工程师对接",
  },
];

export const PRO_SECURITY_WARNING =
  "⚠️ 开源版仅供学习与 PoC（概念验证）。若在生产环境上传真实患者数据，系统将自动拦截并引导您升级 Pro。";
