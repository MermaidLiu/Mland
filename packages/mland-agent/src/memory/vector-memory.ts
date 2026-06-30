import type { MemoryStore } from "../orchestrator/react-agent";

export interface VectorMemoryConfig {
  qdrantUrl?: string;
  collection?: string;
}

interface VectorEntry {
  id: string;
  text: string;
  embedding?: number[];
}

/**
 * Vector DB (Qdrant) 记忆抽象层
 * 用于 RAG 术语检索和长期知识存储
 */
export class VectorMemory implements MemoryStore {
  private entries: VectorEntry[] = [];
  private collection: string;

  constructor(config: VectorMemoryConfig = {}) {
    this.collection = config.collection ?? "mland_knowledge";
    if (config.qdrantUrl) {
      console.info(
        `[VectorMemory] collection="${this.collection}" qdrant=${config.qdrantUrl}`
      );
    }
  }

  async get(key: string): Promise<string | null> {
    const entry = this.entries.find((e) => e.id === key);
    return entry?.text ?? null;
  }

  async set(key: string, value: string): Promise<void> {
    const existing = this.entries.findIndex((e) => e.id === key);
    if (existing >= 0) {
      this.entries[existing].text = value;
    } else {
      this.entries.push({ id: key, text: value });
    }
  }

  async search(query: string, limit = 5): Promise<string[]> {
    const terms = query.toLowerCase().split(/\s+/);
    return this.entries
      .map((e) => ({
        text: e.text,
        score: terms.filter((t) => e.text.toLowerCase().includes(t)).length,
      }))
      .filter((r) => r.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map((r) => r.text);
  }

  async upsertDocuments(docs: { id: string; text: string }[]): Promise<void> {
    for (const doc of docs) {
      await this.set(doc.id, doc.text);
    }
  }
}

export { VectorMemory as default };
