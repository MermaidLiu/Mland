import { SKILL_CATALOG } from "./mock-data";
import type {
  JournalStyle,
  PipelineStep,
  PublicationTarget,
  ResearchType,
  SkillItem,
} from "./types";

export const RESEARCH_TYPE_LABELS: Record<
  ResearchType,
  { title: string; desc: string; icon: string }
> = {
  "clinical-survival": {
    title: "临床队列 / 生存分析",
    desc: "KM 曲线、Cox 回归、森林图",
    icon: "📊",
  },
  "clinical-trial": {
    title: "随机对照 / 组间比较",
    desc: "假设检验、箱线图、三线表",
    icon: "⚖️",
  },
  rnaseq: {
    title: "RNA-seq 差异表达",
    desc: "DESeq2、火山图、通路富集",
    icon: "🧬",
  },
  "literature-review": {
    title: "文献综述 / 选题",
    desc: "PubMed 检索、引用格式、MeSH",
    icon: "📚",
  },
  imaging: {
    title: "医学影像分析",
    desc: "DICOM 分割、体积统计",
    icon: "🩻",
  },
};

export const JOURNAL_STYLE_LABELS: Record<JournalStyle, string> = {
  "sci-english": "SCI 英文刊（Nature / APA 引用）",
  "cma-chinese": "中华系列 / CMA 中文格式",
  lancet: "The Lancet 家族",
  "nature-family": "Nature 子刊",
};

const SKILL_PIPELINE: Record<ResearchType, string[]> = {
  "clinical-survival": ["nature-academic-search", "t-test", "cox-ph"],
  "clinical-trial": ["nature-academic-search", "t-test", "cox-ph"],
  rnaseq: ["nature-academic-search", "deseq2", "gsea"],
  "literature-review": ["nature-academic-search"],
  imaging: ["nature-academic-search", "dicom-seg"],
};

const PREPROCESS_STEP: PipelineStep = {
  id: "preprocess",
  skillId: null,
  title: "数据预处理",
  subtitle: "脱敏校验 · 缺失补全 · 分组编码",
  uiDescription:
    "自动识别变量类型，完成本地 Hash 脱敏与缺失值处理。原始 PHI 不出浏览器。",
  cost: 0,
  isLocal: true,
  badge: "🔒 本地已脱敏",
  codeLang: "python",
  codeSnippet: `# 本地脱敏 — 数据不出浏览器
import hashlib
import pandas as pd

df = pd.read_csv("research_data.csv")
for col in ["Patient_ID", "Hospital_No"]:
    df[col] = df[col].astype(str).apply(
        lambda x: hashlib.sha256(x.encode()).hexdigest()[:12]
    )
print(f"Ready: {len(df)} rows, PHI masked locally")`,
};

function skillToStep(skill: SkillItem, index: number): PipelineStep {
  return {
    id: `skill-${skill.id}-${index}`,
    skillId: skill.id,
    title: skill.name,
    subtitle: `${skill.version} · ${skill.contributor}`,
    uiDescription: skill.description,
    cost: skill.cost,
    highlight: skill.previewTitle,
    codeLang: skill.category === "clinical" ? "r" : "python",
    codeSnippet: `# SKILL: ${skill.id}
# Docker 镜像一键运行 · 输出: ${skill.previewTitle}
# 贡献者: ${skill.contributor}`,
  };
}

export function buildRecommendedPipeline(target: PublicationTarget): PipelineStep[] {
  const skillIds = SKILL_PIPELINE[target.researchType];
  const steps: PipelineStep[] = [];

  if (target.researchType !== "literature-review") {
    steps.push(PREPROCESS_STEP);
  }

  skillIds.forEach((id, i) => {
    const skill = SKILL_CATALOG.find((s) => s.id === id);
    if (skill) steps.push(skillToStep(skill, i));
  });

  const last = steps[steps.length - 1];
  if (last && last.skillId) {
    last.journalNote = JOURNAL_STYLE_LABELS[target.journalStyle];
  }

  return steps;
}

export function pipelineTotalCost(steps: PipelineStep[]): number {
  return steps.reduce((sum, s) => sum + s.cost, 0);
}

export function estimateDuration(steps: PipelineStep[]): number {
  const runnable = steps.filter((s) => s.skillId).length;
  return Math.max(3, runnable * 2 + 2);
}

export function findSkillById(id: string): SkillItem | undefined {
  return SKILL_CATALOG.find((s) => s.id === id);
}
