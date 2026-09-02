export type UserRole = "student" | "contributor";

export type AuthChannel = "student" | "contributor";

export type MainTab = "research" | "store" | "contributor";

export type ResearchType =
  | "clinical-survival"
  | "clinical-trial"
  | "rnaseq"
  | "literature-review"
  | "imaging";

export type JournalStyle =
  | "sci-english"
  | "cma-chinese"
  | "lancet"
  | "nature-family";

export interface PublicationTarget {
  researchType: ResearchType;
  journalStyle: JournalStyle;
}

export interface PipelineStep {
  id: string;
  skillId: string | null;
  title: string;
  subtitle: string;
  uiDescription: string;
  cost: number;
  isLocal?: boolean;
  badge?: string;
  highlight?: string;
  journalNote?: string;
  codeLang?: "python" | "r";
  codeSnippet?: string;
}

export type DraftStatus = "editing" | "pipeline-ready" | "running" | "done";

export interface DraftProject {
  goal: string;
  fileName: string | null;
  target: PublicationTarget | null;
  pipeline: PipelineStep[];
  status: DraftStatus;
  runningStepIndex: number;
}

export type SkillCategory =
  | "all"
  | "clinical"
  | "bioinformatics"
  | "imaging"
  | "omics";

export interface User {
  name: string;
  email: string;
  role: UserRole;
  avatarInitials: string;
}

export interface DetectedColumn {
  name: string;
  desensitized: boolean;
}

export interface SkillItem {
  id: string;
  name: string;
  version: string;
  category: Exclude<SkillCategory, "all">;
  github: string;
  contributor: string;
  cost: number;
  heat: number;
  description: string;
  previewTitle: string;
}

export interface ContributorStats {
  callCount: number;
  earnings: number;
  withdrawable: number;
  skillsPublished: number;
}

export type WorkflowNodeId = "preprocess" | "algorithm" | "output";

/** @deprecated Use PipelineStep for skill-backed workflows */
export interface WorkflowNodeData {
  id: WorkflowNodeId;
  title: string;
  subtitle: string;
  badge?: string;
  highlight?: string;
  uiDescription: string;
  codeSnippet: string;
  codeLang: "python" | "r";
}

export interface CoxParams {
  alpha: number;
  penalizer: number;
  l1Ratio: number;
}

export interface ResourceLoad {
  cpu: number;
  memory: number;
  gpu: number;
  containers: number;
}

export interface PhiField {
  name: string;
  action: string;
}
