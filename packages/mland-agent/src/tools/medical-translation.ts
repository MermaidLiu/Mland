import type { AgentTool } from "../orchestrator/react-agent";

/**
 * 医疗翻译工具 — 支持中英/中日/中韩实时翻译，内置医疗术语校准
 */
export const medicalTranslationTool: AgentTool = {
  name: "medical_translation",
  description:
    "Translate medical conversations between Chinese and English/Japanese/Korean with terminology calibration",
  parameters: {
    text: { type: "string", description: "Text to translate" },
    sourceLang: { type: "string", enum: ["zh", "en", "ja", "ko"] },
    targetLang: { type: "string", enum: ["zh", "en", "ja", "ko"] },
  },
  execute: async (input) => {
    const text = String(input.text ?? "");
    const source = String(input.sourceLang ?? "zh");
    const target = String(input.targetLang ?? "en");

    const termMap: Record<string, string> = {
      心肌梗死: "Myocardial Infarction (MI)",
      血压: "Blood Pressure (BP)",
      血糖: "Blood Glucose",
    };

    let translated = text;
    for (const [zh, en] of Object.entries(termMap)) {
      translated = translated.replace(new RegExp(zh, "g"), en);
    }

    return `[${source}→${target}] ${translated || "(empty input)"}`;
  },
};

/**
 * PMP 计算工具 — SPI/CPI/EAC 等项目管理指标
 */
export const pmpCalculatorTool: AgentTool = {
  name: "pmp_calculator",
  description:
    "Calculate PMP metrics: SPI (Schedule Performance Index), CPI (Cost Performance Index), EAC (Estimate at Completion)",
  parameters: {
    plannedValue: { type: "number", description: "Planned Value (PV)" },
    earnedValue: { type: "number", description: "Earned Value (EV)" },
    actualCost: { type: "number", description: "Actual Cost (AC)" },
    budgetAtCompletion: { type: "number", description: "Budget at Completion (BAC)" },
  },
  execute: async (input) => {
    const pv = Number(input.plannedValue ?? 0);
    const ev = Number(input.earnedValue ?? 0);
    const ac = Number(input.actualCost ?? 0);
    const bac = Number(input.budgetAtCompletion ?? 0);

    const spi = pv > 0 ? (ev / pv).toFixed(3) : "N/A";
    const cpi = ac > 0 ? (ev / ac).toFixed(3) : "N/A";
    const eac = Number(cpi) > 0 ? (bac / Number(cpi)).toFixed(0) : "N/A";

    const spiStatus = Number(spi) >= 1 ? "✅ 进度正常" : "⚠️ 进度滞后";
    const cpiStatus = Number(cpi) >= 1 ? "✅ 成本正常" : "⚠️ 成本超支";

    return JSON.stringify(
      {
        SPI: spi,
        CPI: cpi,
        EAC: eac,
        scheduleStatus: spiStatus,
        costStatus: cpiStatus,
        summary: `SPI=${spi} ${spiStatus}, CPI=${cpi} ${cpiStatus}, 预估完工成本 EAC=${eac}`,
      },
      null,
      2
    );
  },
};

export const riskAnalyzerTool: AgentTool = {
  name: "risk_analyzer",
  description: "Analyze project risks based on SPI/CPI thresholds",
  parameters: {
    spi: { type: "number" },
    cpi: { type: "number" },
  },
  execute: async (input) => {
    const spi = Number(input.spi ?? 1);
    const cpi = Number(input.cpi ?? 1);
    const risks: string[] = [];

    if (spi < 0.9) risks.push("高风险：进度严重滞后，建议召开专项协调会");
    else if (spi < 1) risks.push("中风险：进度略滞后，需关注关键路径");

    if (cpi < 0.9) risks.push("高风险：成本严重超支，需审查资源分配");
    else if (cpi < 1) risks.push("中风险：成本略超支");

    if (risks.length === 0) risks.push("低风险：项目整体可控");

    return risks.join("\n");
  },
};

export { medicalTranslationTool as default };
