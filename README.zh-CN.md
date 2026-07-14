# Mland

[English](./README.md) | 简体中文

![PMP 智能平台 — 全栈医学研究工作台](./assets/pmp-platform-hero.png)

**AI 原生企业智能体平台 — 生产级代码 + 私有化部署方案，让 LLM 直接落地三甲医院工作流。**

[![License: MIT](https://img.shields.io/badge/License-MIT-cyan.svg)](LICENSE)
[![Website](https://img.shields.io/badge/Website-mland.io-blue)](https://www.mland.io)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![MCP](https://img.shields.io/badge/MCP-Server-purple)](mcp-server/)
[![Docker](https://img.shields.io/badge/Docker-Compose-2496ED)](docker-compose.yml)

[快速开始](#快速开始) · [MedSkill 广场](#medskill-广场) · [Blueprint 方案](#blueprint-方案) · [私有化部署](#需要私有化部署我们进院实施) · [免费 vs Pro](#免费版-vs-pro) · [文档](https://www.mland.io/zh/docs/getting-started)

---

## Mland 是什么？

一条命令即可为你的 AI 助手提供完整的企业智能体栈 — ReAct 编排器、医疗工具、Hospital Adapter，以及从 Docker 到 Kubernetes 的完整部署闭环。

> **已服务医院：** 长庚医院 · 航天中心医院
>
> 在 **[www.mland.io](https://www.mland.io/zh)** 浏览全部方案 — MedSkill 广场、Agent Playground、部署指南与 Pro 定价一站搞定。支持 **中英文切换**：`/en` · `/zh`。

---

## MedSkill 广场

**自然语言 → 代码工作流** — 面向医学生与贡献者的低代码医学科研画布。

| 模块 | 说明 |
|------|------|
| **AI 智能看板 (Canvas)** | 输入科研目标 → 可视化工作流节点（预处理 → Cox 回归 → SCI 产出），支持 UI / 源码双向切换 |
| **SKILL 广场** | 浏览 Docker 封装的科研工具 — 临床统计、基础生信、医学影像、组学分析 |
| **Contributor Hub** | Git-ops 协同 — 提交 GitHub 仓库/PR，一键生成 `medskill.json`，获得算力币分成 |
| **隐私拦截器** | 每次运行前本地 PHI 扫描 — Patient_ID / Hospital_No 浏览器侧 Hash 脱敏 |

```bash
npm run dev
# 访问 http://localhost:3000/zh  （或 /en）
```

**已封装 SKILL 示例** — [nature-academic-search](https://github.com/wp-a/nature-academic-search)（PubMed / CrossRef / arXiv）：

```bash
npm run skill:academic-search:build
npm run skill:academic-search:run
```

---

## 需要私有化部署？我们进院实施

开源版覆盖约 80% 的工程基座。剩下 20% — HIS 对接、加密真实数据存储、GPU 集群与合规 — **我们进院部署**。

| | |
|---|---|
| ⚡ **PoC 验证** | **首付款 $5,000** · **1 天交付初稿** · Blueprint 部署至院内网络 |
| 🚀 **4–8 周交付** | 生产级私有化部署 — Docker 或 K8s |
| 🏥 **Pro** | Hospital Adapter、术语库导入、7×24 工程师 — **$0.05 / 病例** |
| 💵 **企业版** | 源码级定制、信创适配、数据不出院 |

**联系：** [mermaid_liu@outlook.com](mailto:mermaid_liu@outlook.com) · [查看 Pro 定价](https://www.mland.io/zh/pricing)

---

## 快速开始

### 方式 1：MCP Server + Cursor（推荐）

**步骤 1** — 在 Cursor 中添加 MCP：

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

**步骤 2** — 向 AI 发出指令：

- 「列出所有医疗 AI 方案」
- 「为航天中心医院部署 PMP 智能体」
- 「获取医患翻译助手的部署指南」

**步骤 3** — 一键部署：

```
Use mland MCP deploy_solution to deploy pmp-agent on Docker
```

MCP 工具：`list_solutions` · `get_solution` · `deploy_solution`

---

### 方式 2：CLI

```bash
# PMP 项目管理智能体 — 航天中心医院
npx mland-cli add pmp-agent --hospital=Aerospace-Center-Hospital

# 医患翻译助手 — 长庚医院
npx mland-cli add medical-translation --hospital=Chang-Gung-Hospital

# 列出全部方案
npx mland-cli list
```

---

### 方式 3：Docker 基础设施

```bash
git clone https://github.com/MermaidLiu/Mland.git
cd Mland
docker compose up -d    # Qdrant + Redis + PostgreSQL
npm install
npm run build:packages
npm run dev             # 官网 localhost:3000
```

---

## Blueprint 方案

每个 Blueprint 包含完整源码、`.env` 模板、`deploy_guide.md` 与 Docker Compose 配置。

### 医疗 — 已生产交付

| 方案 | 资产类型 | 客户 | CLI |
|------|----------|------|-----|
| **医患语言无障碍翻译助手** | 微信小程序 + AI Agent | 长庚医院 | `npx mland-cli add medical-translation --hospital=Chang-Gung-Hospital` |
| **医院 PMP 项目管理智能体** | AI Agent | 航天中心医院 | `npx mland-cli add pmp-agent --hospital=Aerospace-Center-Hospital` |

### 跨行业 — 开源 Blueprint

| 方案 | 行业 | 资产类型 |
|------|------|----------|
| 制造业质检 AI 助手 | 制造 | 移动 APP |
| **Academic Search**（[wp-a/nature-academic-search](https://github.com/wp-a/nature-academic-search)） | 基础生信 | Docker SKILL · PubMed / CrossRef / arXiv |

> 完整目录：[www.mland.io/zh/industries](https://www.mland.io/zh/industries)

---

## 包结构

### `@mland/agent` — 智能体引擎

| 模块 | 说明 |
|------|------|
| **Orchestrator** | 原生 TypeScript ReAct 循环（Reason + Act） |
| **Tools** | `medical_translation` · `pmp_calculator`（SPI/CPI/EAC）· `risk_analyzer` |
| **Memory** | `RedisMemory` 会话存储 · `VectorMemory` Qdrant 抽象 |

### `@mland/core` — 企业适配层

| 模块 | 说明 |
|------|------|
| **HospitalAdapter** | HIS / PMS 对接 — 患者、项目、翻译审计日志 |

```typescript
import { HospitalAdapter } from "@mland/core";

const adapter = new HospitalAdapter({
  endpoint: process.env.HIS_API_ENDPOINT!,
  hospitalName: "Aerospace Center Hospital",
});

const projects = await adapter.getProjects();
const patient = await adapter.getPatient("P001");
```

### `@mland/deploy` — 部署配置

| 层级 | 说明 |
|------|------|
| **Docker Compose** | 社区版单副本，MIT |
| **K8s（`isPro: true`）** | 3 副本 HPA + Prometheus 告警 + 7×24 监控 |

### `mland-cli` — 命令行工具

```bash
npx mland-cli add <slug> [--hospital=Hospital-Name]
npx mland-cli deploy <slug> --env=docker|k8s
npx mland-cli list
```

---

## 目录结构

```
Mland/
├── packages/
│   ├── mland-agent/              # ReAct 编排器 + Tools + Memory
│   ├── mland-core/               # Hospital Adapter (HIS)
│   ├── mland-deploy/             # K8s (Pro)
│   └── mland-cli/                # CLI
├── templates/                    # 开源 Blueprint + Docker SKILL
│   ├── medical-translation/      #   长庚医院
│   ├── pmp-agent/                #   航天中心医院
│   ├── manufacturing-inspection/
│   └── nature-academic-search/   #   PubMed / CrossRef / arXiv 学术搜索
├── mcp-server/                   # MCP 服务（list / get / deploy）
├── src/
│   ├── app/[locale]/             #   国际化路由 (/en, /zh)
│   ├── components/medskill/       #   MedSkill 广场 SPA
│   └── i18n/                     #   中英文字典
├── assets/                       # README 与文档资源
└── docker-compose.yml            # Qdrant + Redis + PostgreSQL
```

---

## 免费版 vs Pro

全部 Blueprint 智能体代码开源（MIT）。**Pro 提供生产级能力 — 按 $0.05 / 病例计费。**

| | 社区版（免费） | Pro | 企业版 |
|---|---|---|---|
| Blueprint 源码 | ✅ 完整 MIT | ✅ 增强版 | ✅ 定制 Fork |
| 演示数据 | ✅ 10 条 | ✅ | ✅ |
| 真实病历 / 影像上传 | ❌ 拦截 | ✅ AES-256 加密 | ✅ |
| HIS / LIS 对接 | ❌ | ✅ 定制 Hospital Adapter | ✅ 现场实施 |
| 数据留存 | ❌ 24h 清除 | ✅ 持久化卷 | ✅ 院内机房 |
| 推理 | CPU | GPU 集群 | GPU + 信创栈 |
| 部署 | Docker | Docker + HA K8s | 私有化 + 合规 |
| 支持 | 社区 Issue | 邮件 + 工单 | 7×24 专属工程师 |
| **定价** | **$0** | **$0.05 / 病例** | **面议** |

> ⚠️ 开源版仅供学习与 PoC。生产环境真实患者数据须使用 Pro。详见 [定价页](https://www.mland.io/zh/pricing)。

**Pro 计费示例：** 10,000 病例/月 → **$500/月**。按处理量计费 — 无闲置存储费。

Pro K8s 清单：`packages/mland-deploy/k8s/`（标记 `isPro: true`）

---

## 技术栈

- **Agent：** TypeScript ReAct · LangChain 兼容接口
- **Memory：** Redis · Qdrant 向量库
- **Backend：** Next.js 14 · Node.js · FastAPI（模板）
- **Deploy：** Docker Compose · Kubernetes · Vercel
- **AI：** OpenAI / 本地 LLM · Whisper · RAG
- **Hospital：** Hospital Adapter · HIS / PMS REST API

---

## 本地开发

```bash
npm install
docker compose up -d
npm run build:packages
npm run dev
```

复制环境变量：

```bash
cp .env.local.example .env.local
```

---

## 贡献指南

欢迎贡献！

1. Fork 本仓库
2. 创建功能分支（`git checkout -b feature/amazing-feature`）
3. 提交更改（`git commit -m 'Add amazing feature'`）
4. 推送分支（`git push origin feature/amazing-feature`）
5. 提交 Pull Request

### 规范

- Blueprint 模板保持 MIT 协议
- Pro 配置（`isPro: true`）不接受开源 PR
- 面向医院的功能请写清楚文档

---

## 许可证

- `templates/` · `packages/mland-agent` · `packages/mland-core` · `mcp-server` — **MIT License**
- `packages/mland-deploy/k8s/` Pro 配置 — 商业许可 · [mermaid_liu@outlook.com](mailto:mermaid_liu@outlook.com)

---

**已服务医院：** 长庚医院 · 航天中心医院

为医疗 AI 用心打造 · [www.mland.io](https://www.mland.io/zh)
