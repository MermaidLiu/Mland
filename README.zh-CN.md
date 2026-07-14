# MedSkill 广场

[English](./README.md) | 简体中文

![MedSkill 广场 — 医学生科研 SKILL 开放平台](./assets/pmp-platform-hero.png)

**面向医学生的科研 SKILL 广场 — 用自然语言描述课题，一键调用封装好的分析工具，产出 SCI 级图表与统计结果。工科生贡献 Docker 技能包，医学生无需写代码。**

[![License: MIT](https://img.shields.io/badge/License-MIT-cyan.svg)](LICENSE)
[![Website](https://img.shields.io/badge/Website-mland.io-blue)](https://www.mland.io)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Docker](https://img.shields.io/badge/Docker-SKILL-purple)](templates/)
[![MCP](https://img.shields.io/badge/MCP-Server-green)](mcp-server/)

[平台介绍](#medskill-广场是什么) · [医学生指南](#面向医学生) · [SKILL 目录](#skill-目录) · [贡献者指南](#面向贡献者) · [快速开始](#快速开始) · [定价](#定价)

---

## MedSkill 广场是什么？

**MedSkill 广场**是一个帮助**医学生做科研**的开放平台。把 GitHub 上成熟的开源分析工具封装成 **SKILL**（Docker 技能包），医学生用自然语言描述课题、上传脱敏数据、一键运行，即可拿到统计表、图表和文献引用。

> 你描述科研目标 → 平台生成可视化工作流 → 调用经过验证的工具 → 输出三线表、生存曲线、森林图 —— **全程不用写代码**。

**两类用户，一个广场：**

| 角色 | 做什么 | 看到什么 |
|------|--------|----------|
| **医学生 / 使用者** | 上传脱敏数据、设定课题、运行 SKILL | 可视化 SOP 节点、SCI 图表预览、算力币计费 |
| **贡献者 / 工科生** | 把 GitHub 仓库封装成 Docker SKILL，通过 Git 提交 | 源码视图、`medskill.json` 规范、收益看板 |

在线体验：**[www.mland.io](https://www.mland.io/zh)** · 支持中英文 `/en` · `/zh`

---

## 面向医学生

### MedSkill Canvas — 自然语言 → 科研工作流

借鉴 **Natural Language to Code-Based Workflow** 理念：医学生看画布，工科生看代码。

1. **描述课题** — 如：*「比较治疗组与对照组生存期差异，输出 KM 曲线和 Cox 回归」*
2. **上传脱敏数据** — CSV / Excel；`Patient_ID`、`Hospital_No` 等在浏览器本地 Hash，不上传原文
3. **生成分析路径** — AI 构建三步工作流：
   - **数据预处理** — 带 🔒 本地已脱敏徽章
   - **统计模型** — 如 Cox 比例风险回归 v1.2，滑块微调参数
   - **SCI 产出** — 预览三线表、生存曲线矢量图
4. **UI / 源码切换** — 每个节点右上角 `</>` 开关：医学生用 UI，专家看 R/Python 源码

### 隐私拦截器

每次运行 SKILL 前，本地扫描确认 PHI 字段已脱敏，签发**安全合规凭证**后才解锁运行 —— **原始患者数据不出浏览器**。

```bash
git clone https://github.com/MermaidLiu/Mland.git
cd Mland
npm install
npm run dev
# → http://localhost:3000/zh
```

---

## SKILL 目录

科研 SKILL 是从 GitHub 开源工具 Docker 封装而来。选择工具、消耗算力币、获取结果。

| SKILL | 分类 | 功能 |
|-------|------|------|
| **Cox 比例风险回归** | 临床统计 | 生存分析、HR/CI、森林图、SCI 三线表 |
| **两组假设检验** | 临床统计 | t 检验 / Wilcoxon、箱线图 |
| **DESeq2 差异表达** | 组学分析 | RNA-seq 差异基因、火山图、热图 |
| **GSEA 通路富集** | 基础生信 | GO/KEGG 富集山脊图 |
| **Academic Search**（[nature-academic-search](https://github.com/wp-a/nature-academic-search)） | 文献检索 | PubMed / CrossRef / arXiv、引用格式、MeSH |
| **DICOM 病灶分割** | 医学影像 | ROI 分割与体积统计 |

```bash
# 示例：运行学术搜索 SKILL
cd templates/nature-academic-search
cp .env.example .env   # 填写 PUBMED_EMAIL
cp data/params.example.json data/params.json
npm run skill:academic-search:build
npm run skill:academic-search:run
```

在广场浏览全部 SKILL：[www.mland.io](https://www.mland.io/zh) → **SKILL 广场** 标签页。

---

## 面向贡献者

把开源科研工具封装成 SKILL，医学生每调用一次，你获得算力币分成。

### Git-ops 协同流程

```
Fork 仓库 → 提交 PR → CI 构建 Docker 镜像 → 合并上架 → SKILL 出现在广场
```

### Contributor Hub 功能

- 提交 **GitHub 仓库 / PR 地址**
- 一键生成 **`medskill.json`**（定义 Input / Output 字段类型）
- 选择运行环境：**Python 3.10 · R 4.3 · Docker**
- 查看调用次数、收益、云端容器负载

### 封装新 SKILL 的目录结构

```bash
templates/your-skill/
├── Dockerfile          # 构建时 clone 你的 GitHub 仓库
├── run.sh              # 读 /data/params.json → 写 /data/output/
├── medskill.json       # 平台接口规范
├── docker-compose.yml
└── deploy_guide.md
```

完整示例见 [templates/nature-academic-search/](templates/nature-academic-search/)。

**需要我们帮你封装？** 首付款 $5,000 · 1 天交付初稿 · [mermaid_liu@outlook.com](mailto:mermaid_liu@outlook.com)

---

## 快速开始

### 医学生 — 浏览器使用广场

```bash
git clone https://github.com/MermaidLiu/Mland.git
cd Mland
npm install
npm run dev
```

打开 `http://localhost:3000/zh`，以**医学生**身份登录，进入 **AI 智能看板 (Canvas)** 体验。

### 医学生 — 在 Cursor 中调用 SKILL

```json
{
  "mcpServers": {
    "mland": {
      "command": "npx",
      "args": ["-y", "tsx", "mcp-server/src/index.ts"]
    }
  }
}
```

对 AI 说：*「列出所有科研 SKILL」* · *「在 PubMed 搜索糖尿病心血管死亡率相关文献」*

### 贡献者 — 上架 SKILL

1. Fork 本仓库
2. 在 `templates/<skill-name>/` 下添加你的封装
3. 提交 PR，包含 `medskill.json` + `Dockerfile`
4. 合并后 SKILL 自动出现在广场商店

---

## 定价

MedSkill 采用**算力币**按次计费 — 按 SKILL 调用量付费，无月租。

| 档位 | 适用对象 | 权益 | 价格 |
|------|----------|------|------|
| **免费版** | 医学生 | 演示数据、开源 SKILL、社区支持 | $0 |
| **Pro** | 医学生 / 课题组 | 真实脱敏数据、GPU 推理、加密存储 | 约 $0.05 / 病例 |
| **贡献者** | 工科生 / 开发者 | 学生调用你的 SKILL 获得分成 | 算力币抽成 |
| **定制封装** | 课题组 / PI | 我们帮你把 GitHub 工具 Docker 化上架 | 首付 $5,000 起 |

> 免费版仅供学习与 PoC。请上传脱敏数据 — 隐私拦截器会拦截原始 PHI。

---

## 项目结构

```
Mland/
├── src/
│   ├── app/[locale]/             # 官网 (/en, /zh)
│   └── components/medskill/      # MedSkill 广场 SPA
│       ├── canvas-tab.tsx        #   医学生科研工作流画布
│       ├── skill-store-tab.tsx   #   SKILL 应用商店
│       ├── contributor-tab.tsx   #   贡献者 Git-ops 工作台
│       └── privacy-interceptor.tsx
├── templates/                    # Docker 封装的科研 SKILL
│   └── nature-academic-search/   #   PubMed / CrossRef / arXiv 学术搜索
├── mcp-server/                   # MCP 工具（Cursor / Claude 调用）
├── packages/                     # 高级 SKILL 运行时
└── docker-compose.yml            # Qdrant + Redis + Postgres
```

---

## 技术栈

- **前端：** Next.js 14 · React · Tailwind CSS · Lucide 图标
- **SKILL 运行时：** Docker · Python 3.10 · R 4.3
- **AI 集成：** MCP Server · Cursor · Claude Code
- **隐私：** 浏览器侧 PHI Hash · 云端运行前本地扫描
- **国际化：** 英文 / 简体中文

---

## 本地开发

```bash
npm install
cp .env.local.example .env.local
npm run dev                              # 广场 localhost:3000
npm run skill:academic-search:build      # 构建 SKILL 镜像
```

---

## 贡献指南

欢迎社区贡献科研 SKILL！

1. **医学生** — 反馈缺失的分析类型、分享使用场景
2. **贡献者** — 通过 PR 提交 Docker 封装的 GitHub 工具
3. **维护者** — Review `medskill.json` 规范与 Dockerfile

`templates/` 下所有 SKILL 模板遵循 **MIT 协议**。

---

## 许可证

- `templates/` · `src/components/medskill/` · `mcp-server/` — **MIT**
- 商业 SKILL 定制封装与 Pro GPU 运行时 — [mermaid_liu@outlook.com](mailto:mermaid_liu@outlook.com)

---

为想做科研、不想搞运维的医学生而生。

[www.mland.io](https://www.mland.io/zh) · [GitHub](https://github.com/MermaidLiu/Mland)
