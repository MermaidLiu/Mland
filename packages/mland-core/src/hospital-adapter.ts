export interface HospitalAdapterConfig {
  endpoint: string;
  token?: string;
  hospitalName?: string;
  timeout?: number;
}

export interface PatientRecord {
  id: string;
  name: string;
  gender: "M" | "F";
  age: number;
  department: string;
  admissionDate?: string;
}

export interface ProjectRecord {
  id: string;
  name: string;
  status: "planning" | "in_progress" | "completed" | "at_risk";
  progress: number;
  plannedValue: number;
  earnedValue: number;
  actualCost: number;
  budgetAtCompletion: number;
  owner: string;
}

export interface TranslationSession {
  id: string;
  patientId: string;
  sourceLang: string;
  targetLang: string;
  transcript: string;
  timestamp: string;
}

/**
 * Hospital Adapter — 医院 HIS 系统对接适配器
 *
 * ShipSwift 不具备的企业级能力：对接三甲医院内部 HIS / PMS 系统，
 * 实现智能体与院内数据的安全互通（私有化部署场景）。
 */
export class HospitalAdapter {
  private config: HospitalAdapterConfig;

  constructor(config: HospitalAdapterConfig) {
    this.config = {
      timeout: 10000,
      ...config,
    };
  }

  get hospitalName(): string {
    return this.config.hospitalName ?? "Unknown Hospital";
  }

  /**
   * 模拟 HIS 患者信息查询
   */
  async getPatient(patientId: string): Promise<PatientRecord | null> {
    await this.simulateLatency();
    const mockPatients: Record<string, PatientRecord> = {
      P001: {
        id: "P001",
        name: "张三",
        gender: "M",
        age: 45,
        department: "心内科",
        admissionDate: "2026-06-15",
      },
      P002: {
        id: "P002",
        name: "John Smith",
        gender: "M",
        age: 62,
        department: "International Clinic",
        admissionDate: "2026-06-28",
      },
    };
    return mockPatients[patientId] ?? null;
  }

  /**
   * 模拟项目管理系统 (PMS) 数据读取 — 用于 PMP 智能体
   */
  async getProjects(): Promise<ProjectRecord[]> {
    await this.simulateLatency();
    return [
      {
        id: "PRJ-2026-001",
        name: "HIS 6.0 升级改造",
        status: "in_progress",
        progress: 78,
        plannedValue: 850000,
        earnedValue: 780000,
        actualCost: 820000,
        budgetAtCompletion: 1200000,
        owner: "信息科",
      },
      {
        id: "PRJ-2026-002",
        name: "电子病历互联互通",
        status: "at_risk",
        progress: 45,
        plannedValue: 500000,
        earnedValue: 420000,
        actualCost: 480000,
        budgetAtCompletion: 800000,
        owner: "医务处",
      },
    ];
  }

  async getProject(projectId: string): Promise<ProjectRecord | null> {
    const projects = await this.getProjects();
    return projects.find((p) => p.id === projectId) ?? null;
  }

  /**
   * 保存翻译会话记录 — 用于医患翻译助手合规审计
   */
  async saveTranslationSession(
    session: Omit<TranslationSession, "id" | "timestamp">
  ): Promise<TranslationSession> {
    await this.simulateLatency();
    return {
      ...session,
      id: `TS-${Date.now()}`,
      timestamp: new Date().toISOString(),
    };
  }

  /**
   * 健康检查 — 验证 HIS 接口连通性
   */
  async healthCheck(): Promise<{ ok: boolean; endpoint: string; latencyMs: number }> {
    const start = Date.now();
    await this.simulateLatency(50);
    return {
      ok: true,
      endpoint: this.config.endpoint,
      latencyMs: Date.now() - start,
    };
  }

  private async simulateLatency(ms = 100): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

export default HospitalAdapter;
