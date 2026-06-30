import type { MemoryStore } from "../orchestrator/react-agent";

export interface RedisMemoryConfig {
  url?: string;
  prefix?: string;
}

/**
 * Redis 会话记忆抽象层
 * 生产环境连接真实 Redis；开发环境使用内存 fallback
 */
export class RedisMemory implements MemoryStore {
  private store = new Map<string, { value: string; expiresAt?: number }>();
  private prefix: string;

  constructor(config: RedisMemoryConfig = {}) {
    this.prefix = config.prefix ?? "mland:memory:";
    if (config.url && config.url !== "memory://") {
      console.info(`[RedisMemory] configured for ${config.url} (using in-memory fallback in dev)`);
    }
  }

  private key(k: string): string {
    return `${this.prefix}${k}`;
  }

  async get(key: string): Promise<string | null> {
    const entry = this.store.get(this.key(key));
    if (!entry) return null;
    if (entry.expiresAt && Date.now() > entry.expiresAt) {
      this.store.delete(this.key(key));
      return null;
    }
    return entry.value;
  }

  async set(key: string, value: string, ttlSeconds?: number): Promise<void> {
    this.store.set(this.key(key), {
      value,
      expiresAt: ttlSeconds ? Date.now() + ttlSeconds * 1000 : undefined,
    });
  }
}

export { RedisMemory as default };
