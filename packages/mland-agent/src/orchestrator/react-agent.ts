export interface AgentTool {
  name: string;
  description: string;
  parameters: Record<string, unknown>;
  execute: (input: Record<string, unknown>) => Promise<string>;
}

export interface AgentMessage {
  role: "user" | "assistant" | "system" | "tool";
  content: string;
  toolName?: string;
}

export interface MemoryStore {
  get(key: string): Promise<string | null>;
  set(key: string, value: string, ttlSeconds?: number): Promise<void>;
  search?(query: string, limit?: number): Promise<string[]>;
}

export interface ReActAgentConfig {
  name: string;
  systemPrompt: string;
  tools: AgentTool[];
  memory?: MemoryStore;
  maxIterations?: number;
  llmCall: (messages: AgentMessage[]) => Promise<string>;
}

export interface AgentStep {
  thought: string;
  action?: { tool: string; input: Record<string, unknown> };
  observation?: string;
  answer?: string;
}

export interface AgentResult {
  answer: string;
  steps: AgentStep[];
}

/**
 * ReAct (Reason + Act) Agent Orchestrator
 * Native TypeScript implementation — no LangChain runtime dependency required.
 */
export class ReActAgent {
  private config: ReActAgentConfig;

  constructor(config: ReActAgentConfig) {
    this.config = {
      maxIterations: 5,
      ...config,
    };
  }

  async run(userInput: string): Promise<AgentResult> {
    const steps: AgentStep[] = [];
    const toolDescriptions = this.config.tools
      .map((t) => `- ${t.name}: ${t.description}`)
      .join("\n");

    let context = `User: ${userInput}`;

    for (let i = 0; i < (this.config.maxIterations ?? 5); i++) {
      const messages: AgentMessage[] = [
        {
          role: "system",
          content: `${this.config.systemPrompt}\n\nAvailable tools:\n${toolDescriptions}\n\nRespond in JSON: {"thought":"...","action":{"tool":"name","input":{}},"answer":"..."}. Use action OR answer, not both.`,
        },
        { role: "user", content: context },
      ];

      const raw = await this.config.llmCall(messages);
      const parsed = this.parseResponse(raw);

      if (parsed.answer) {
        steps.push({ thought: parsed.thought, answer: parsed.answer });
        if (this.config.memory) {
          await this.config.memory.set(
            `session:${Date.now()}`,
            JSON.stringify({ input: userInput, answer: parsed.answer })
          );
        }
        return { answer: parsed.answer, steps };
      }

      if (parsed.action) {
        const tool = this.config.tools.find((t) => t.name === parsed.action!.tool);
        let observation: string;

        if (!tool) {
          observation = `Error: unknown tool "${parsed.action.tool}"`;
        } else {
          try {
            observation = await tool.execute(parsed.action.input);
          } catch (err) {
            observation = `Error: ${err instanceof Error ? err.message : String(err)}`;
          }
        }

        steps.push({
          thought: parsed.thought,
          action: parsed.action,
          observation,
        });

        context += `\nThought: ${parsed.thought}\nAction: ${parsed.action.tool}(${JSON.stringify(parsed.action.input)})\nObservation: ${observation}`;
      }
    }

    return {
      answer: "抱歉，无法在限定步骤内完成任务，请简化问题后重试。",
      steps,
    };
  }

  private parseResponse(raw: string): {
    thought: string;
    action?: { tool: string; input: Record<string, unknown> };
    answer?: string;
  } {
    try {
      const jsonMatch = raw.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
    } catch {
      // fall through
    }
    return { thought: raw, answer: raw };
  }
}
