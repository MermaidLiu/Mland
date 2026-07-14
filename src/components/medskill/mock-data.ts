import type { DetectedColumn, SkillItem, ContributorStats } from "./types";

export const MOCK_COLUMNS: DetectedColumn[] = [
  { name: "Patient_ID", desensitized: true },
  { name: "Survival_Time", desensitized: false },
  { name: "Status", desensitized: false },
  { name: "Group", desensitized: false },
  { name: "Age", desensitized: false },
  { name: "Sex", desensitized: false },
];

export const SKILL_CATALOG: SkillItem[] = [
  {
    id: "nature-academic-search",
    name: "Academic Search 学术搜索",
    version: "v1.0",
    category: "bioinformatics",
    github: "https://github.com/wp-a/nature-academic-search",
    contributor: "wp-a / 开源社区",
    cost: 45,
    heat: 1240,
    description:
      "PubMed / CrossRef / arXiv 多源文献搜索，DOI·PMID 详情、Nature/APA 引用格式、MeSH 检索式。已 Docker 封装。",
    previewTitle: "文献列表 JSON + 格式化引用 + MeSH 词表",
  },
  {
    id: "cox-ph",
    name: "Cox 比例风险回归分析",
    version: "v1.2",
    category: "clinical",
    github: "https://github.com/example/cox-ph-skill",
    contributor: "张研 / 协和医学院",
    cost: 80,
    heat: 986,
    description: "一键完成生存分析、HR/CI 计算与森林图输出，符合 SCI 三线表规范。",
    previewTitle: "SCI 标准三线表 + KM 曲线矢量图",
  },
  {
    id: "deseq2",
    name: "RNA-seq 差异表达 DESeq2",
    version: "v2.0",
    category: "omics",
    github: "https://github.com/example/deseq2-skill",
    contributor: "李博 / 清华生命学院",
    cost: 120,
    heat: 742,
    description: "标准化 count → 差异基因 → Volcano / Heatmap，适配仓库开源流水线。",
    previewTitle: "高显色 Volcano + Heatmap 矢量图",
  },
  {
    id: "dicom-seg",
    name: "医学影像病灶分割",
    version: "v0.9",
    category: "imaging",
    github: "https://github.com/example/dicom-seg",
    contributor: "王工 / 北航医工",
    cost: 150,
    heat: 518,
    description: "DICOM 上传后自动分割 ROI，输出体积统计与 Overlay 预览。",
    previewTitle: "DICOM Overlay + 体积统计表",
  },
  {
    id: "gsea",
    name: "通路富集 GSEA",
    version: "v1.5",
    category: "bioinformatics",
    github: "https://github.com/example/gsea-skill",
    contributor: "陈博士 / 中科院",
    cost: 95,
    heat: 631,
    description: "基于预排序基因列表做 GO/KEGG 富集，生成富集山脊图。",
    previewTitle: "GSEA Enrichment Plot 矢量图",
  },
  {
    id: "t-test",
    name: "两组均数假设检验",
    version: "v1.0",
    category: "clinical",
    github: "https://github.com/example/ttest-skill",
    contributor: "赵同学 / 北大医学部",
    cost: 40,
    heat: 1102,
    description: "自动识别正态性与方差齐性，输出 t / Wilcoxon 结果与箱线图。",
    previewTitle: "SCI 三线表 + 箱线矢量图",
  },
  {
    id: "scrna",
    name: "单细胞 Seurat 流水线",
    version: "v3.1",
    category: "omics",
    github: "https://github.com/example/seurat-pipeline",
    contributor: "周实验室",
    cost: 200,
    heat: 455,
    description: "质控 → 聚类 → Marker → UMAP，容器化一键运行。",
    previewTitle: "UMAP 高显色矢量图 + Marker 表",
  },
];

export const CATEGORY_LABELS: Record<string, string> = {
  all: "全部",
  clinical: "临床统计",
  bioinformatics: "基础生信",
  imaging: "医学影像",
  omics: "组学分析",
};

export const DEFAULT_CONTRIBUTOR_STATS: ContributorStats = {
  callCount: 1284,
  earnings: 32650,
  withdrawable: 8120,
  skillsPublished: 3,
};

export const SOP_STEPS = [
  { id: 1, title: "数据准备", desc: "脱敏校验 · 缺失补全 · 分组编码" },
  { id: 2, title: "假设检验", desc: "正态性检验 · 生存分析 · 多重校正" },
  { id: 3, title: "SCI 图表生成", desc: "三线表 · KM/森林图 · 矢量导出" },
];
