import { NextRequest, NextResponse } from "next/server";

const DEMO_RESPONSES: Record<string, string[]> = {
  "pmp-agent": [
    "根据最新数据，信息化建设项目整体进度为 78%，SPI = 0.92，略低于计划。主要偏差在「HIS 接口对接」模块，建议本周召开专项协调会。",
    "当前识别到 3 项高风险：① 第三方厂商响应延迟（概率 65%）；② 测试环境资源不足；③ 关键人员下周请假。建议优先处理第 1 项。",
    "已为您生成会议纪要草稿：\n\n**议题**：项目进度评审\n**结论**：整体可控，需加速接口联调\n**行动项**：厂商 48h 内提交联调方案\n\n是否需要导出 PDF？",
  ],
  default: [
    "感谢体验 Mland 智能体！这是一个演示回复，完整功能请部署私有化版本。",
    "我可以帮您解答方案相关的技术问题。如需完整体验，请联系 sales@mland.io。",
  ],
};

export async function POST(request: NextRequest) {
  try {
    const { message, slug } = await request.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Invalid message" }, { status: 400 });
    }

    const apiKey = process.env.AGENT_DEMO_API_KEY;

    if (apiKey) {
      try {
        const res = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [
              {
                role: "system",
                content: `你是 Mland 平台的 ${slug} 智能体演示。简洁专业地回答用户关于项目管理和 AI 方案的问题。`,
              },
              { role: "user", content: message },
            ],
            max_tokens: 300,
          }),
        });

        if (res.ok) {
          const data = await res.json();
          const reply = data.choices?.[0]?.message?.content;
          if (reply) return NextResponse.json({ reply });
        }
      } catch {
        // fall through to demo responses
      }
    }

    const pool = DEMO_RESPONSES[slug] ?? DEMO_RESPONSES.default;
    const reply = pool[Math.floor(Math.random() * pool.length)];

    return NextResponse.json({ reply });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
