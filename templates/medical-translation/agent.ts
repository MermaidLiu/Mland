/**
 * Medical Translation Agent Entry
 * Uses @mland/agent ReAct orchestrator + Hospital Adapter
 */
import { ReActAgent, medicalTranslationTool, RedisMemory } from "@mland/agent";
import { HospitalAdapter } from "@mland/core";

const hospital = new HospitalAdapter({
  endpoint: process.env.HIS_API_ENDPOINT ?? "https://his.internal/api",
  hospitalName: process.env.HOSPITAL_NAME ?? "长庚医院",
});

const agent = new ReActAgent({
  name: "medical-translation",
  systemPrompt: `你是${hospital.hospitalName}的医患翻译助手。使用 medical_translation 工具完成多语种医疗对话翻译。`,
  tools: [medicalTranslationTool],
  memory: new RedisMemory({ url: process.env.REDIS_URL }),
  llmCall: async (messages) => {
    // Replace with OpenAI / local LLM call in production
    return JSON.stringify({
      thought: "用户需要翻译服务",
      answer: "翻译服务已就绪，请提供需要翻译的内容。",
    });
  },
});

export { agent, hospital };
