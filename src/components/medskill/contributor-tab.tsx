"use client";

import { useEffect, useState } from "react";
import {
  GitBranch,
  GitPullRequest,
  Package,
  TrendingUp,
  Wallet,
  BarChart3,
  CheckCircle2,
  Layers,
  FileJson,
  Copy,
  Server,
  Cpu,
  HardDrive,
  Zap,
} from "lucide-react";
import type { ContributorStats, ResourceLoad } from "./types";

interface ContributorTabProps {
  onRequireAuth: () => void;
  isLoggedIn: boolean;
  isContributor: boolean;
  stats: ContributorStats;
  onPublish: () => void;
}

const RUNTIMES = ["Python 3.10", "R 4.3", "Docker"] as const;

const GIT_OPS_STEPS = [
  { step: 1, title: "Fork 仓库", desc: "从模板 fork 你的 SKILL 项目" },
  { step: 2, title: "提交 PR", desc: "Push 代码并发起 Pull Request" },
  { step: 3, title: "CI 构建", desc: "GitHub Actions 自动 Docker build" },
  { step: 4, title: "合并上架", desc: "Review 通过后自动发布到 MedSkill 广场" },
];

function slugFromUrl(url: string): string {
  try {
    const parts = url.replace(/\/$/, "").split("/");
    return parts[parts.length - 1] || "my-skill";
  } catch {
    return "my-skill";
  }
}

function buildMedskillJson(repo: string, runtime: string) {
  const slug = slugFromUrl(repo);
  return JSON.stringify(
    {
      name: slug,
      version: "1.0.0",
      runtime: runtime.toLowerCase().includes("docker")
        ? "docker"
        : runtime.toLowerCase().includes("r")
          ? "r4.3"
          : "python3.10",
      github: repo,
      inputs: {
        paramsJson: {
          type: "file",
          path: "/data/params.json",
          description: "SKILL 运行参数 JSON",
        },
      },
      outputs: {
        resultJson: {
          type: "file",
          path: "/data/output/result.json",
          description: "结构化结果输出",
        },
        artifacts: {
          type: "directory",
          path: "/data/output/artifacts/",
          description: "SCI 图表 / 表格文件",
        },
      },
      env: {
        PUBMED_EMAIL: { type: "string", required: false },
      },
    },
    null,
    2
  );
}

export function ContributorTab({
  onRequireAuth,
  isLoggedIn,
  isContributor,
  stats,
  onPublish,
}: ContributorTabProps) {
  const [repo, setRepo] = useState("");
  const [prUrl, setPrUrl] = useState("");
  const [runtime, setRuntime] = useState<string>(RUNTIMES[0]);
  const [publishing, setPublishing] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [medskillJson, setMedskillJson] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [load, setLoad] = useState<ResourceLoad>({
    cpu: 42,
    memory: 58,
    gpu: 23,
    containers: 12,
  });

  useEffect(() => {
    const interval = window.setInterval(() => {
      setLoad((prev) => ({
        cpu: Math.min(95, Math.max(15, prev.cpu + (Math.random() - 0.5) * 12)),
        memory: Math.min(90, Math.max(20, prev.memory + (Math.random() - 0.5) * 8)),
        gpu: Math.min(80, Math.max(5, prev.gpu + (Math.random() - 0.5) * 10)),
        containers: prev.containers,
      }));
    }, 2500);
    return () => window.clearInterval(interval);
  }, []);

  function handleGenerateJson() {
    if (!repo.trim()) {
      alert("请先输入 GitHub 仓库地址");
      return;
    }
    setMedskillJson(buildMedskillJson(repo.trim(), runtime));
  }

  async function handlePublish(e: React.FormEvent) {
    e.preventDefault();
    if (!isLoggedIn) {
      onRequireAuth();
      return;
    }
    if (!isContributor) {
      alert("请先在右上角切换为「贡献者」身份");
      return;
    }
    const target = prUrl.trim() || repo.trim();
    if (!target.includes("github.com")) {
      alert("请输入有效的 GitHub 仓库或 PR 地址");
      return;
    }
    setPublishing(true);
    setSuccess(null);
    await new Promise((r) => setTimeout(r, 900));
    onPublish();
    setSuccess(`Git-ops 流程已触发：${target}`);
    setRepo("");
    setPrUrl("");
    setPublishing(false);
  }

  const cards = [
    { icon: BarChart3, label: "SKILL 被调用次数", value: stats.callCount.toLocaleString(), hint: "累计调用" },
    { icon: TrendingUp, label: "累计抽成收益", value: stats.earnings.toLocaleString(), hint: "算力币" },
    { icon: Wallet, label: "可提现分成", value: stats.withdrawable.toLocaleString(), hint: "算力币" },
    { icon: Layers, label: "已上架 SKILL", value: String(stats.skillsPublished), hint: "个工具" },
  ];

  const monitors = [
    { icon: Cpu, label: "CPU 集群", value: load.cpu, color: "bg-med-purple" },
    { icon: HardDrive, label: "内存池", value: load.memory, color: "bg-amber-400" },
    { icon: Zap, label: "GPU 算力", value: load.gpu, color: "bg-indigo-600" },
  ];

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-med-purple/20 bg-gradient-to-r from-med-purple/5 to-transparent p-6">
        <div className="mb-4 flex items-center gap-2">
          <GitPullRequest className="h-5 w-5 text-med-purple" />
          <h3 className="text-lg font-semibold text-med-purple">Git-ops 协同机制</h3>
        </div>
        <p className="mb-5 text-sm text-gray-600">
          通过 Git 提交新 SKILL — Fork → PR → CI 构建 → 自动上架。ThinkLoop 式「代码即工作流」贡献闭环。
        </p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {GIT_OPS_STEPS.map((s) => (
            <div
              key={s.step}
              className="animate-fade-in rounded-xl border border-gray-100 bg-white p-4 shadow-sm"
              style={{ animationDelay: `${s.step * 80}ms` }}
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-med-purple text-xs font-bold text-amber-400">
                {s.step}
              </span>
              <p className="mt-2 text-sm font-semibold text-gray-900">{s.title}</p>
              <p className="mt-0.5 text-xs text-gray-500">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-2">
            <Package className="h-5 w-5 text-med-purple" />
            <h3 className="text-lg font-semibold text-med-purple">通过 Git 提交新 SKILL</h3>
          </div>

          <form onSubmit={handlePublish} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-gray-600">
                GitHub 仓库地址
              </label>
              <div className="relative">
                <GitBranch className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  type="url"
                  value={repo}
                  onChange={(e) => setRepo(e.target.value)}
                  placeholder="https://github.com/you/medical-skill-repo"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-3 text-sm outline-none ring-med-purple/20 focus:border-med-purple focus:bg-white focus:ring-2"
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-gray-600">
                Pull Request 地址（可选，加速 Review）
              </label>
              <div className="relative">
                <GitPullRequest className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  type="url"
                  value={prUrl}
                  onChange={(e) => setPrUrl(e.target.value)}
                  placeholder="https://github.com/org/repo/pull/42"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-3 text-sm outline-none ring-med-purple/20 focus:border-med-purple focus:bg-white focus:ring-2"
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-gray-600">运行环境</label>
              <select
                value={runtime}
                onChange={(e) => setRuntime(e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-med-purple focus:ring-2"
              >
                {RUNTIMES.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>

            {success && (
              <div className="flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-800">
                <CheckCircle2 className="h-4 w-4 shrink-0" />
                {success}
              </div>
            )}

            <button
              type="submit"
              disabled={publishing}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-amber-400 py-3 text-sm font-bold text-med-purple transition hover:bg-amber-300 disabled:opacity-60"
            >
              <GitPullRequest className="h-4 w-4" />
              {publishing ? "触发 Git-ops 流程…" : "提交 PR 并触发 CI 构建"}
            </button>
          </form>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileJson className="h-5 w-5 text-amber-500" />
              <h3 className="text-lg font-semibold text-med-purple">medskill.json 生成器</h3>
            </div>
            <button
              type="button"
              onClick={handleGenerateJson}
              className="rounded-lg border border-med-purple/30 px-3 py-1.5 text-xs font-semibold text-med-purple hover:bg-med-purple/5"
            >
              一键生成
            </button>
          </div>
          <p className="mb-3 text-xs text-gray-500">
            定义 Input / Output 字段类型，供 MedSkill 容器调度与算力计费。
          </p>
          {medskillJson ? (
            <div className="relative">
              <pre className="max-h-64 overflow-auto rounded-xl bg-gray-900 p-4 font-mono text-[11px] leading-relaxed text-emerald-300">
                {medskillJson}
              </pre>
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(medskillJson);
                  setCopied(true);
                  window.setTimeout(() => setCopied(false), 1500);
                }}
                className="absolute right-2 top-2 inline-flex items-center gap-1 rounded bg-white/10 px-2 py-1 text-[10px] text-white hover:bg-white/20"
              >
                <Copy className="h-3 w-3" />
                {copied ? "已复制" : "复制"}
              </button>
            </div>
          ) : (
            <div className="flex h-48 items-center justify-center rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 text-xs text-gray-400">
              填写仓库地址后点击「一键生成」
            </div>
          )}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
        <div>
          <h3 className="mb-4 text-lg font-semibold text-med-purple">收益看板</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            {cards.map((card) => (
              <div
                key={card.label}
                className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
              >
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-med-purple/5">
                  <card.icon className="h-4 w-4 text-med-purple" />
                </div>
                <p className="text-xs text-gray-500">{card.label}</p>
                <p className="mt-1 text-2xl font-bold tabular-nums text-med-purple">
                  {card.value}
                </p>
                <p className="mt-1 text-[10px] font-medium uppercase tracking-wide text-amber-600">
                  {card.hint}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center gap-2">
            <Server className="h-5 w-5 text-med-purple" />
            <h3 className="font-semibold text-med-purple">算力资源监控</h3>
          </div>
          <p className="mb-4 text-xs text-gray-500">
            云端容器环境 · 活跃 {load.containers} 个
          </p>
          <div className="space-y-4">
            {monitors.map((m) => (
              <div key={m.label}>
                <div className="mb-1 flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1.5 text-gray-600">
                    <m.icon className="h-3.5 w-3.5" />
                    {m.label}
                  </span>
                  <span className="font-mono font-semibold text-med-purple">
                    {Math.round(m.value)}%
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${m.color}`}
                    style={{ width: `${m.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
