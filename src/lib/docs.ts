export interface DocSection {
  slug: string;
  title: string;
  content: string;
  children?: DocSection[];
}

export const docsTree: DocSection[] = [
  {
    slug: "getting-started",
    title: "入门指南",
    content: `# 入门指南

欢迎使用 Mland — 企业级 AI 智能体解决方案市场。

## 什么是 Mland？

Mland 将复杂的 AI 智能体和行业应用打包成开箱即用的 **Recipe**（代码 + 配置 + 文档），支持：

- **免费试用**基础版（MIT 开源）
- **付费购买** Pro 版（K8s 高可用 + 监控告警）

## 已服务客户

- **长庚医院** — 医患语言无障碍翻译助手
- **航天中心医院** — PMP 项目管理智能体

## 快速开始

\`\`\`bash
npx mland-cli add pmp-agent --hospital=航天中心医院
\`\`\`

## 下一步

- 阅读 [CLI 命令](/docs/cli) 了解完整命令行工具
- 配置 [MCP 服务器](/docs/mcp) 在 Cursor 中使用
- 查看 [私有化部署教程](/docs/deployment) 完成院内部署
`,
  },
  {
    slug: "cli",
    title: "CLI 命令",
    content: `# CLI 命令

Mland CLI 是连接 GitHub 模板与本地项目的桥梁。

## 安装方案

\`\`\`bash
# 添加 PMP 智能体（航天中心医院定制）
npx mland-cli add pmp-agent --hospital=航天中心医院

# 添加医患翻译助手
npx mland-cli add medical-translation --hospital=长庚医院

# 添加制造业巡检助手
npx mland-cli add manufacturing-inspection
\`\`\`

## 部署方案

\`\`\`bash
npx mland-cli deploy pmp-agent --env=docker
npx mland-cli deploy pmp-agent --env=k8s  # Pro 版
\`\`\`

## 列出所有方案

\`\`\`bash
npx mland-cli list
npx mland-cli list --industry=medical
\`\`\`
`,
  },
  {
    slug: "mcp",
    title: "MCP 服务器配置",
    content: `# MCP 服务器配置

Mland 提供 MCP (Model Context Protocol) 服务器，让 Cursor / Claude 可以直接调用 Mland 的方案库。

## 在 Cursor 中配置

编辑 \`.cursor/mcp.json\`：

\`\`\`json
{
  "mcpServers": {
    "mland": {
      "command": "npx",
      "args": ["-y", "@mland/mcp-server"],
      "env": {
        "MLAND_GITHUB_TOKEN": "your-token"
      }
    }
  }
}
\`\`\`

## 可用工具

| 工具 | 说明 |
|------|------|
| \`list_solutions\` | 列出所有可用方案 |
| \`get_solution\` | 获取方案详情和部署指南 |
| \`deploy_solution\` | 一键部署到 Docker/K8s |

## 一句话生成医院智能体

在 Cursor 中输入：

> 使用 Mland MCP，为航天中心医院部署 PMP 项目管理智能体

Cursor 将自动调用 \`deploy_solution\` 完成全流程。
`,
  },
  {
    slug: "deployment",
    title: "私有化部署教程",
    content: `# 私有化部署教程

## 基础设施要求

Mland 方案默认依赖以下服务（已在 \`docker-compose.yml\` 中预配置）：

- **Qdrant** — 向量数据库（术语库 / RAG）
- **Redis** — 会话记忆
- **PostgreSQL** — 业务数据（可选）

## Docker 一键部署

\`\`\`bash
git clone https://github.com/mland-io/Mland
cd Mland
docker compose up -d
npx mland-cli add pmp-agent --hospital=航天中心医院
cd pmp-agent && docker compose up -d
\`\`\`

## Hospital Adapter（医院适配器）

Mland 独有的 **Hospital Adapter** 用于对接医院内部 HIS 系统：

\`\`\`typescript
import { HospitalAdapter } from "@mland/core";

const adapter = new HospitalAdapter({
  endpoint: process.env.HIS_API_ENDPOINT,
  token: process.env.HIS_API_TOKEN,
});

const projects = await adapter.getProjects();
\`\`\`

## K8s 部署 (Pro)

Pro 版提供 \`packages/mland-deploy/k8s/\` 下的高可用配置，包含：

- 3 副本 + HPA 自动扩缩
- Prometheus + Grafana 监控
- 7×24 告警通道

联系 sales@mland.io 获取 Pro 部署包。
`,
  },
];

export function getDocBySlug(slug: string): DocSection | undefined {
  return docsTree.find((d) => d.slug === slug);
}

export function getDefaultDoc(): DocSection {
  return docsTree[0];
}
