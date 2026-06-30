/**
 * PMP Agent Entry — 航天中心医院
 * ReAct orchestrator + PMP tools + Hospital Adapter
 */
import {
  ReActAgent,
  pmpCalculatorTool,
  riskAnalyzerTool,
  RedisMemory,
} from "@mland/agent";
import { HospitalAdapter } from "@mland/core";

const hospital = new HospitalAdapter({
  endpoint: process.env.HIS_API_ENDPOINT ?? "https://pms.hospital.internal/api",
  hospitalName: process.env.HOSPITAL_NAME ?? "航天中心医院",
});

const agent = new ReActAgent({
  name: "pmp-agent",
  systemPrompt: `你是${hospital.hospitalName}的项目管理 AI 智能体。使用 pmp_calculator 计算 SPI/CPI/EAC，使用 risk_analyzer 分析风险。`,
  tools: [pmpCalculatorTool, riskAnalyzerTool],
  memory: new RedisMemory({ url: process.env.REDIS_URL }),
  llmCall: async (messages) => {
    const projects = await hospital.getProjects();
    const summary = projects
      .map((p) => `${p.name}: 进度 ${p.progress}%, 状态 ${p.status}`)
      .join("; ");
    return JSON.stringify({
      thought: "查询院内项目数据并分析",
      answer: `当前在管项目：${summary}。如需详细 SPI/CPI 分析，请提供项目 ID。`,
    });
  },
});

export { agent, hospital };
