#!/usr/bin/env node
/**
 * Mland MCP Server
 *
 * Tools:
 *   - list_solutions  — 列出所有可用 AI 方案
 *   - get_solution    — 获取方案详情与部署指南
 *   - deploy_solution — 一键部署到 Docker / K8s（智能体部署闭环）
 */

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import * as fs from "fs";
import * as path from "path";
import { execSync } from "child_process";

interface SolutionMeta {
  slug: string;
  title: string;
  industry: string;
  assetType: string;
  hospital?: string;
  isPro: boolean;
  deployCommand: string;
  templatePath: string;
}

const SOLUTIONS: SolutionMeta[] = [
  {
    slug: "medical-translation",
    title: "医患语言无障碍翻译助手",
    industry: "医疗",
    assetType: "微信小程序",
    hospital: "长庚医院",
    isPro: false,
    deployCommand: "npx mland-cli add medical-translation --hospital=长庚医院",
    templatePath: "medical-translation",
  },
  {
    slug: "pmp-agent",
    title: "医院 PMP 项目管理智能体",
    industry: "医疗",
    assetType: "AI智能体",
    hospital: "航天中心医院",
    isPro: true,
    deployCommand: "npx mland-cli add pmp-agent --hospital=航天中心医院",
    templatePath: "pmp-agent",
  },
  {
    slug: "manufacturing-inspection",
    title: "制造业设备巡检 AI 助手",
    industry: "制造",
    assetType: "移动APP",
    isPro: false,
    deployCommand: "npx mland-cli add manufacturing-inspection",
    templatePath: "manufacturing-inspection",
  },
];

function getRepoRoot(): string {
  return path.resolve(__dirname, "../..");
}

function getDeployGuide(slug: string): string {
  const guidePath = path.join(
    getRepoRoot(),
    "templates",
    slug,
    "deploy_guide.md"
  );
  try {
    return fs.readFileSync(guidePath, "utf-8");
  } catch {
    return "部署指南暂未提供，请联系 sales@mland.io";
  }
}

function listSolutions(industry?: string): SolutionMeta[] {
  if (!industry) return SOLUTIONS;
  return SOLUTIONS.filter((s) => s.industry === industry);
}

function getSolution(slug: string): (SolutionMeta & { deployGuide: string }) | null {
  const solution = SOLUTIONS.find((s) => s.slug === slug);
  if (!solution) return null;
  return { ...solution, deployGuide: getDeployGuide(slug) };
}

function deploySolution(
  slug: string,
  env: "docker" | "k8s" = "docker",
  hospital?: string
): { success: boolean; message: string; commands: string[] } {
  const solution = SOLUTIONS.find((s) => s.slug === slug);
  if (!solution) {
    return { success: false, message: `方案 "${slug}" 不存在`, commands: [] };
  }

  if (env === "k8s" && solution.isPro) {
    const commands = [
      `kubectl create namespace mland --dry-run=client -o yaml | kubectl apply -f -`,
      `kubectl apply -f packages/mland-deploy/k8s/${slug}/`,
      `# Pro 版包含 7x24 监控告警 — 联系 sales@mland.io 获取完整配置`,
    ];
    return {
      success: true,
      message: `Pro 版 K8s 部署方案已生成 (${solution.title})`,
      commands,
    };
  }

  const hospitalFlag = hospital ? ` --hospital=${hospital}` : "";
  const commands = [
    `npx mland-cli add ${slug}${hospitalFlag}`,
    `cd ${slug}`,
    `docker compose up -d`,
    `curl http://localhost:8080/health`,
  ];

  try {
    const root = getRepoRoot();
    execSync("docker compose ps", { cwd: root, stdio: "pipe" });
  } catch {
    return {
      success: true,
      message: `部署命令已生成。请先运行 \`docker compose up -d\` 启动 Qdrant 和 Redis。`,
      commands,
    };
  }

  return {
    success: true,
    message: `Docker 部署流程已就绪 (${solution.title})`,
    commands,
  };
}

const server = new Server(
  { name: "mland-mcp-server", version: "0.1.0" },
  { capabilities: { tools: {} } }
);

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: "list_solutions",
      description: "List all available Mland AI agent solutions, optionally filtered by industry",
      inputSchema: {
        type: "object",
        properties: {
          industry: {
            type: "string",
            description: "Filter by industry: 医疗, 制造, etc.",
          },
        },
      },
    },
    {
      name: "get_solution",
      description: "Get detailed information and deploy guide for a specific solution",
      inputSchema: {
        type: "object",
        properties: {
          slug: {
            type: "string",
            description: "Solution slug, e.g. pmp-agent, medical-translation",
          },
        },
        required: ["slug"],
      },
    },
    {
      name: "deploy_solution",
      description:
        "Deploy an AI agent solution to Docker or K8s — complete deployment loop for hospital private deployment",
      inputSchema: {
        type: "object",
        properties: {
          slug: { type: "string", description: "Solution slug to deploy" },
          env: {
            type: "string",
            enum: ["docker", "k8s"],
            description: "Deployment environment (k8s requires Pro license)",
          },
          hospital: {
            type: "string",
            description: "Hospital name for customized deployment, e.g. 航天中心医院",
          },
        },
        required: ["slug"],
      },
    },
  ],
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  switch (name) {
    case "list_solutions": {
      const industry = (args as { industry?: string })?.industry;
      const results = listSolutions(industry);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(results, null, 2),
          },
        ],
      };
    }

    case "get_solution": {
      const slug = (args as { slug: string }).slug;
      const solution = getSolution(slug);
      if (!solution) {
        return {
          content: [{ type: "text", text: `Solution "${slug}" not found` }],
          isError: true,
        };
      }
      return {
        content: [{ type: "text", text: JSON.stringify(solution, null, 2) }],
      };
    }

    case "deploy_solution": {
      const { slug, env = "docker", hospital } = args as {
        slug: string;
        env?: "docker" | "k8s";
        hospital?: string;
      };
      const result = deploySolution(slug, env, hospital);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(result, null, 2),
          },
        ],
        isError: !result.success,
      };
    }

    default:
      return {
        content: [{ type: "text", text: `Unknown tool: ${name}` }],
        isError: true,
      };
  }
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Mland MCP Server running on stdio");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
