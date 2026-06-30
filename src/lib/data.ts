import { PRO_PRICE_LABEL, PRO_PRICE_PER_CASE_USD } from "./pricing";

export type AssetType = "agent" | "miniapp" | "app" | "admin";
export type Industry = "medical" | "finance" | "manufacturing" | "education";

export interface SolutionFeature {
  title: string;
  description: string;
}

export interface Solution {
  slug: string;
  title: string;
  industry: Industry;
  assetType: AssetType;
  coverImage: string;
  description: string;
  longDescription?: string;
  deployCommand: string;
  isPro: boolean;
  price?: number;
  priceLabel?: string;
  customerCases: string[];
  techStack: string[];
  features: SolutionFeature[];
  templatePath: string;
  featured?: boolean;
}

export const INDUSTRY_LABELS: Record<Industry, string> = {
  medical: "医疗",
  finance: "金融",
  manufacturing: "制造",
  education: "教育",
};

export const ASSET_TYPE_LABELS: Record<AssetType, string> = {
  agent: "AI 智能体",
  miniapp: "微信小程序",
  app: "移动 APP",
  admin: "后台系统",
};

export const ASSET_TYPE_COLORS: Record<AssetType, string> = {
  agent: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
  miniapp: "bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30",
  app: "bg-purple-500/15 text-purple-600 dark:text-purple-400 border-purple-500/30",
  admin: "bg-orange-500/15 text-orange-600 dark:text-orange-400 border-orange-500/30",
};

export const solutions: Solution[] = [
  {
    slug: "medical-translation",
    title: "医患语言无障碍翻译助手",
    industry: "medical",
    assetType: "miniapp",
    coverImage:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=450&fit=crop",
    description:
      "中英/中日/中韩实时语音翻译，内置医疗术语库校准，已在长庚医院私有化部署。",
    longDescription:
      "面向国际化三甲医院的医患沟通场景，支持实时语音识别与多语种翻译，结合医疗术语 RAG 知识库确保翻译准确性。可与医院 HIS 系统对接，记录翻译会话供质控审计。",
    deployCommand: "npx mland-cli add medical-translation --hospital=长庚医院",
    isPro: false,
    customerCases: ["长庚医院"],
    techStack: ["微信小程序", "Whisper", "DeepL API", "Qdrant", "Node.js"],
    features: [
      { title: "多语种实时翻译", description: "支持中英/中日/中韩语音实时互译" },
      { title: "医疗术语校准", description: "内置 10 万+ 医疗术语 RAG 知识库" },
      { title: "HIS 对接", description: "通过 Hospital Adapter 对接院内系统" },
      { title: "会话审计", description: "全量翻译记录，满足合规要求" },
    ],
    templatePath: "medical-translation",
    featured: true,
  },
  {
    slug: "pmp-agent",
    title: "医院 PMP 项目管理智能体",
    industry: "medical",
    assetType: "agent",
    coverImage:
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&h=450&fit=crop",
    description:
      "基于大模型的项目进度质控、风险预警、会议纪要生成，已在航天中心医院落地。",
    longDescription:
      "专为医院信息化建设项目设计的 AI 智能体，基于 ReAct 架构调用 PMP 计算工具、文档解析工具和院内项目数据源，实现进度跟踪、风险预警和自动化报告生成。",
    deployCommand: "npx mland-cli add pmp-agent --hospital=航天中心医院",
    isPro: true,
    price: PRO_PRICE_PER_CASE_USD,
    priceLabel: PRO_PRICE_LABEL,
    customerCases: ["航天中心医院"],
    techStack: ["LangChain", "GPT-4o", "Qdrant", "Redis", "Docker", "K8s"],
    features: [
      { title: "进度质控", description: "自动对比计划与实际进度，生成偏差报告" },
      { title: "风险预警", description: "基于历史数据预测项目风险并推送告警" },
      { title: "会议纪要", description: "一键生成结构化项目会议纪要" },
      { title: "HIS 集成", description: "读取院内项目管理系统数据" },
    ],
    templatePath: "pmp-agent",
    featured: true,
  },
  {
    slug: "manufacturing-inspection",
    title: "制造业设备巡检 AI 助手",
    industry: "manufacturing",
    assetType: "app",
    coverImage:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=450&fit=crop",
    description:
      "移动端 AI 巡检助手，支持图像识别故障诊断、语音填报、离线同步，跨行业可复制。",
    longDescription:
      "面向制造业产线设备维护场景，结合视觉 AI 与语音交互，让一线工人通过手机 APP 完成标准化巡检、异常上报和维修工单创建。",
    deployCommand: "npx mland-cli add manufacturing-inspection",
    isPro: false,
    customerCases: ["某头部汽车制造商"],
    techStack: ["Flutter", "YOLOv8", "Whisper", "FastAPI", "PostgreSQL"],
    features: [
      { title: "视觉故障识别", description: "拍照即可识别常见设备异常" },
      { title: "语音填报", description: "解放双手，语音完成巡检记录" },
      { title: "离线同步", description: "产线无网络环境亦可正常使用" },
      { title: "工单联动", description: "异常自动创建维修工单" },
    ],
    templatePath: "manufacturing-inspection",
  },
];

export function getSolutionBySlug(slug: string): Solution | undefined {
  return solutions.find((s) => s.slug === slug);
}

export function getSolutionsByIndustry(industry: Industry): Solution[] {
  const filtered = solutions.filter((s) => s.industry === industry);
  if (industry === "medical") {
    const featured = filtered.filter((s) => s.featured);
    const rest = filtered.filter((s) => !s.featured);
    return [...featured, ...rest];
  }
  return filtered;
}

export function getSolutionsByAssetType(assetType: AssetType): Solution[] {
  return solutions.filter((s) => s.assetType === assetType);
}

export function getRelatedSolutions(slug: string, limit = 3): Solution[] {
  const current = getSolutionBySlug(slug);
  if (!current) return [];
  return solutions
    .filter((s) => s.slug !== slug && s.industry === current.industry)
    .slice(0, limit);
}

export const GITHUB_REPO_URL =
  process.env.NEXT_PUBLIC_GITHUB_REPO_URL ??
  "https://github.com/MermaidLiu/Mland";

export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME ?? "Mland";
