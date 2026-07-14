import type { PhiField, WorkflowNodeData } from "./types";

export const PHI_FIELDS: PhiField[] = [
  { name: "Patient_ID", action: "本地 SHA-256 Hash 混淆" },
  { name: "Hospital_No", action: "本地 SHA-256 Hash 混淆" },
];

export const WORKFLOW_NODES: WorkflowNodeData[] = [
  {
    id: "preprocess",
    title: "数据预处理",
    subtitle: "脱敏校验 · 缺失补全 · 分组编码",
    badge: "🔒 本地已脱敏",
    uiDescription: "自动识别生存时间、事件状态与分组变量，完成本地 Hash 脱敏与类型校验。",
    codeLang: "python",
    codeSnippet: `# 本地脱敏 — 数据不出浏览器
import hashlib
import pandas as pd

df = pd.read_csv("survival_data.csv")
for col in ["Patient_ID", "Hospital_No"]:
    df[col] = df[col].astype(str).apply(
        lambda x: hashlib.sha256(x.encode()).hexdigest()[:12]
    )
df = df.dropna(subset=["Survival_Time", "Status"])
df["Group"] = df["Group"].astype("category")
print(f"Ready: {len(df)} rows, PHI masked locally")`,
  },
  {
    id: "algorithm",
    title: "算法 / 统计学检验",
    subtitle: "Cox 比例风险回归模型 v1.2",
    highlight: "Cox 比例风险回归模型 v1.2",
    uiDescription: "多因素 Cox 回归，输出 HR、95% CI 与 Log-rank 检验 p 值。",
    codeLang: "r",
    codeSnippet: `# Cox 比例风险回归 — 可调参数
library(survival)

fit <- coxph(
  Surv(Survival_Time, Status) ~ Group + Age + Sex,
  data = df,
  ties = "efron"
)
summary(fit)

# Python 等价 (lifelines)
# from lifelines import CoxPHFitter
# cph = CoxPHFitter(penalizer=0.01)
# cph.fit(df, "Survival_Time", "Status")`,
  },
  {
    id: "output",
    title: "SCI 产出物生成",
    subtitle: "三线表 · KM 曲线 · 矢量图导出",
    uiDescription: "一键生成 Nature 风格三线表与 300 DPI 生存曲线矢量图。",
    codeLang: "python",
    codeSnippet: `# SCI 标准图表导出
import matplotlib.pyplot as plt
from lifelines import KaplanMeierFitter

kmf = KaplanMeierFitter()
for g in df["Group"].unique():
    mask = df["Group"] == g
    kmf.fit(df.loc[mask, "Survival_Time"], df.loc[mask, "Status"], label=g)
    kmf.plot_survival_function(ci_show=True)

plt.savefig("KM_curve_300dpi.svg", dpi=300, bbox_inches="tight")
# table.to_latex("cox_table.tex", escape=False)`,
  },
];

export const SCI_TABLE_PREVIEW = {
  headers: ["Variable", "HR", "95% CI", "p-value"],
  rows: [
    ["Group (Treatment vs Control)", "0.62", "0.41 – 0.93", "0.021"],
    ["Age (per year)", "1.02", "0.99 – 1.05", "0.184"],
    ["Sex (Male vs Female)", "1.15", "0.78 – 1.69", "0.472"],
  ],
};
