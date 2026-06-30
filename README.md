# Mland

> **已服务医院：长庚医院、航天中心医院**

企业级 AI 智能体解决方案 — 专为三甲医院私有化部署设计。将复杂的 AI 能力打包成开箱即用的 Recipe（代码 + 配置 + 文档），支持 Docker 一键部署与 K8s 高可用 Pro 版。

[![License: MIT](https://img.shields.io/badge/License-MIT-cyan.svg)](LICENSE)
[![Website](https://img.shields.io/badge/Website-mland.io-blue)](https://www.mland.io)

## 快速安装

```bash
# PMP 项目管理智能体 — 航天中心医院定制
npx mland-cli add pmp-agent --hospital=航天中心医院

# 医患翻译助手 — 长庚医院定制
npx mland-cli add medical-translation --hospital=长庚医院

# 一键拉起基础设施 (Qdrant + Redis + PostgreSQL)
docker compose up -d
```

## 仓库结构

```
Mland/
├── packages/
│   ├── mland-agent/      # ReAct 编排器 + 工具 + 记忆抽象层
│   ├── mland-core/       # Hospital Adapter (HIS 对接)
│   ├── mland-deploy/     # K8s 部署 (Pro: isPro=true)
│   └── mland-cli/        # CLI 工具
├── templates/            # 开源 Blueprint 方案
│   ├── medical-translation/   # 长庚医院
│   └── pmp-agent/             # 航天中心医院
├── mcp-server/           # MCP 服务器 (list / get / deploy)
├── src/                  # 官方网站 (Next.js)
└── docker-compose.yml    # Qdrant + Redis + PostgreSQL
```

## 核心差异化

| 能力 | Mland | ShipSwift |
|------|-------|-----------|
| 医院 HIS 对接 | ✅ Hospital Adapter | ❌ |
| 智能体部署闭环 | ✅ MCP `deploy_solution` | ❌ |
| 私有化 K8s Pro | ✅ 高可用 + 7×24 告警 | ❌ |
| 三甲医院案例 | ✅ 长庚 + 航天中心 | ❌ |

## Hospital Adapter

对接医院内部 HIS / PMS 系统的企业级适配器：

```typescript
import { HospitalAdapter } from "@mland/core";

const adapter = new HospitalAdapter({
  endpoint: process.env.HIS_API_ENDPOINT!,
  hospitalName: "航天中心医院",
});

const projects = await adapter.getProjects();
const patient = await adapter.getPatient("P001");
```

## MCP 服务器

在 Cursor 中配置 `.cursor/mcp.json`：

```json
{
  "mcpServers": {
    "mland": {
      "command": "npx",
      "args": ["-y", "@mland/mcp-server"]
    }
  }
}
```

可用工具：
- `list_solutions` — 列出所有方案
- `get_solution` — 获取方案详情
- `deploy_solution` — **一键部署** (Docker / K8s)

## 商业化 (Freemium)

| 版本 | 内容 | 许可 |
|------|------|------|
| **Community** | templates 基础代码 + Docker | MIT 开源 |
| **Pro** | K8s 高可用 + 监控告警 + 定制术语库 | 商业授权 |

Pro 版 K8s 配置见 `packages/mland-deploy/k8s/`（`isPro: true` 标记）。

## 开发

```bash
# 安装依赖
npm install

# 启动基础设施
docker compose up -d

# 构建 packages
npm run build:packages

# 启动官网
npm run dev
```

## 官网

[www.mland.io](https://www.mland.io) — 在线体验 Agent Playground

## License

- `templates/` 及 `packages/mland-agent`, `packages/mland-core` — **MIT**
- `packages/mland-deploy/k8s/` Pro 配置 — 商业授权，联系 sales@mland.io
