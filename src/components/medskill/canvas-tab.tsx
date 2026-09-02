"use client";

import { useCallback, useRef, useState } from "react";
import {
  Sparkles,
  Upload,
  Lock,
  FileSpreadsheet,
  ShieldCheck,
  Loader2,
  ArrowRight,
  Workflow,
  Target,
  BookOpen,
  Coins,
  ShoppingCart,
  Library,
  CheckCircle2,
} from "lucide-react";
import { MOCK_COLUMNS } from "./mock-data";
import {
  buildRecommendedPipeline,
  estimateDuration,
  JOURNAL_STYLE_LABELS,
  pipelineTotalCost,
  RESEARCH_TYPE_LABELS,
} from "./workflow-recommendations";
import { CanvasWorkflowNode } from "./canvas-workflow-node";
import { PrivacyInterceptor } from "./privacy-interceptor";
import { ParamTuneModal } from "./param-tune-modal";
import { SciPreviewModal } from "./sci-preview-modal";
import type {
  CoxParams,
  DetectedColumn,
  DraftProject,
  JournalStyle,
  PublicationTarget,
  ResearchType,
} from "./types";

interface CanvasTabProps {
  draft: DraftProject;
  onDraftChange: (patch: Partial<DraftProject>) => void;
  onBrowseSkills: () => void;
  onRequireAuth: () => void;
  isLoggedIn: boolean;
  balance: number;
  onSpend: (amount: number) => boolean;
}

const RESEARCH_TYPES = Object.keys(RESEARCH_TYPE_LABELS) as ResearchType[];
const JOURNAL_STYLES = Object.keys(JOURNAL_STYLE_LABELS) as JournalStyle[];

export function CanvasTab({
  draft,
  onDraftChange,
  onBrowseSkills,
  onRequireAuth,
  isLoggedIn,
  balance,
  onSpend,
}: CanvasTabProps) {
  const [columns, setColumns] = useState<DetectedColumn[]>([]);
  const [dragging, setDragging] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [privacyAction, setPrivacyAction] = useState<"recommend" | "checkout">("recommend");
  const [paramOpen, setParamOpen] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [coxParams, setCoxParams] = useState<CoxParams>({
    alpha: 0.05,
    penalizer: 0.01,
    l1Ratio: 0.0,
  });
  const fileRef = useRef<HTMLInputElement>(null);

  const totalCost = pipelineTotalCost(draft.pipeline);
  const hasPipeline = draft.pipeline.length > 0;
  const isDone = draft.status === "done";

  const simulateUpload = useCallback(
    (name: string) => {
      setColumns(MOCK_COLUMNS);
      onDraftChange({ fileName: name, status: "editing", pipeline: [] });
    },
    [onDraftChange]
  );

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) simulateUpload(file.name);
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) simulateUpload(file.name);
  }

  function setTarget(patch: Partial<PublicationTarget>) {
    const base = draft.target ?? {
      researchType: "clinical-survival" as ResearchType,
      journalStyle: "sci-english" as JournalStyle,
    };
    onDraftChange({ target: { ...base, ...patch }, pipeline: [], status: "editing" });
  }

  function requestRecommend() {
    if (!isLoggedIn) {
      onRequireAuth();
      return;
    }
    if (!draft.goal.trim()) {
      alert("请先输入科研目标");
      return;
    }
    if (!draft.target) {
      alert("请选择研究类型与目标刊物");
      return;
    }
    if (draft.target.researchType !== "literature-review" && !draft.fileName) {
      alert("请先上传脱敏后的数据文件");
      return;
    }
    setPrivacyAction("recommend");
    setPrivacyOpen(true);
  }

  async function handleRecommendAfterPrivacy() {
    if (!draft.target) return;
    setGenerating(true);
    await new Promise((r) => setTimeout(r, 700));
    const pipeline = buildRecommendedPipeline(draft.target);
    setGenerating(false);
    onDraftChange({ pipeline, status: "pipeline-ready" });
  }

  function requestCheckout() {
    if (!isLoggedIn) {
      onRequireAuth();
      return;
    }
    setPrivacyAction("checkout");
    setPrivacyOpen(true);
  }

  async function handleCheckoutAfterPrivacy() {
    const pipeline = draft.pipeline;
    const cost = pipelineTotalCost(pipeline);
    if (!onSpend(cost)) {
      alert(`算力币不足，本次流水线需 ${cost} 币，请先充值`);
      return;
    }
    onDraftChange({ status: "running", runningStepIndex: 0 });

    for (let i = 0; i < pipeline.length; i++) {
      onDraftChange({ runningStepIndex: i });
      await new Promise((r) => setTimeout(r, 900));
    }

    onDraftChange({ status: "done", runningStepIndex: pipeline.length });
  }

  function handlePrivacyVerified() {
    if (privacyAction === "recommend") {
      handleRecommendAfterPrivacy();
    } else {
      handleCheckoutAfterPrivacy();
    }
  }

  function removeStep(stepId: string) {
    onDraftChange({
      pipeline: draft.pipeline.filter((s) => s.id !== stepId),
      status: "pipeline-ready",
    });
  }

  return (
    <div className="space-y-6">
      {/* Step 1: Goal */}
      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <div className="mb-1 flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-med-purple text-xs font-bold text-amber-400">
            1
          </span>
          <Workflow className="h-5 w-5 text-amber-500" />
          <h3 className="text-lg font-semibold text-med-purple">描述科研课题</h3>
        </div>
        <textarea
          value={draft.goal}
          onChange={(e) =>
            onDraftChange({ goal: e.target.value, status: "editing", pipeline: [] })
          }
          rows={3}
          placeholder="输入科研目标，如：比较治疗组与对照组生存期差异，投稿 Lancet 子刊…"
          className="mt-3 w-full resize-y rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm leading-relaxed outline-none ring-med-purple/20 transition placeholder:text-gray-400 focus:border-med-purple focus:bg-white focus:ring-2"
        />
      </div>

      {/* Step 2: Upload */}
      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-med-purple text-xs font-bold text-amber-400">
              2
            </span>
            <Upload className="h-5 w-5 text-med-purple" />
            <h3 className="text-lg font-semibold text-med-purple">上传脱敏数据</h3>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-med-purple px-3 py-1 text-xs font-semibold text-amber-400">
            <Lock className="h-3.5 w-3.5" />
            本地隐私脱敏
          </span>
        </div>

        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          onClick={() => fileRef.current?.click()}
          className={`cursor-pointer rounded-xl border-2 border-dashed px-6 py-8 text-center transition ${
            dragging
              ? "border-amber-400 bg-amber-50"
              : "border-gray-200 bg-gray-50 hover:border-med-purple/40 hover:bg-white"
          }`}
        >
          <input
            ref={fileRef}
            type="file"
            accept=".csv,.tsv,.xlsx,.xls"
            className="hidden"
            onChange={handleFileChange}
          />
          <FileSpreadsheet className="mx-auto h-9 w-9 text-med-purple/60" />
          <p className="mt-2 text-sm font-medium text-gray-800">
            拖拽 CSV / Excel，或点击上传
          </p>
          <p className="mt-1 text-xs text-gray-400">文献综述类课题可跳过此步</p>
        </div>

        {draft.fileName && (
          <div className="mt-4 space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              已载入：<span className="font-mono font-medium">{draft.fileName}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {columns.map((col) => (
                <span
                  key={col.name}
                  className={`inline-flex rounded-lg border px-2 py-0.5 font-mono text-xs ${
                    col.desensitized
                      ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                      : "border-gray-200 bg-white text-gray-700"
                  }`}
                >
                  {col.name}
                  {col.desensitized && "(已脱敏)"}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Step 3: Publication target */}
      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-med-purple text-xs font-bold text-amber-400">
            3
          </span>
          <Target className="h-5 w-5 text-amber-500" />
          <h3 className="text-lg font-semibold text-med-purple">研究类型 & 发表目标</h3>
        </div>

        <p className="mb-3 text-xs text-gray-500">
          选择课题类型与目标刊物，系统将推荐 SKILL 执行顺序（来自技能库）
        </p>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {RESEARCH_TYPES.map((type) => {
            const meta = RESEARCH_TYPE_LABELS[type];
            const selected = draft.target?.researchType === type;
            return (
              <button
                key={type}
                type="button"
                onClick={() => setTarget({ researchType: type })}
                className={`rounded-xl border p-4 text-left transition ${
                  selected
                    ? "border-med-purple bg-med-purple/5 ring-2 ring-med-purple/20"
                    : "border-gray-100 hover:border-med-purple/30"
                }`}
              >
                <span className="text-2xl">{meta.icon}</span>
                <p className="mt-2 font-semibold text-gray-900">{meta.title}</p>
                <p className="mt-1 text-xs text-gray-500">{meta.desc}</p>
              </button>
            );
          })}
        </div>

        {draft.target && (
          <div className="mt-4">
            <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
              <BookOpen className="h-4 w-4 text-med-purple" />
              目标刊物 / 引用格式
            </label>
            <select
              value={draft.target.journalStyle}
              onChange={(e) =>
                setTarget({ journalStyle: e.target.value as JournalStyle })
              }
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm outline-none focus:border-med-purple focus:ring-2 focus:ring-med-purple/20"
            >
              {JOURNAL_STYLES.map((style) => (
                <option key={style} value={style}>
                  {JOURNAL_STYLE_LABELS[style]}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Recommend button */}
      {!hasPipeline && (
        <div className="flex justify-center">
          <button
            type="button"
            onClick={requestRecommend}
            disabled={generating || !draft.target}
            className="inline-flex items-center gap-2 rounded-xl bg-med-purple px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-med-purple/20 transition hover:bg-med-purple-dark disabled:opacity-60"
          >
            {generating ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                匹配 SKILL 流水线…
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4 text-amber-400" />
                推荐 SKILL 流水线
              </>
            )}
          </button>
        </div>
      )}

      {/* Step 4 & 5: Pipeline + Checkout */}
      {hasPipeline && (
        <div className="animate-fade-in rounded-2xl border border-med-purple/15 bg-gray-50 p-6">
          <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-med-purple text-xs font-bold text-amber-400">
                  4
                </span>
                <h3 className="text-lg font-semibold text-med-purple">确认 SKILL 流水线</h3>
              </div>
              <p className="mt-1 text-xs text-gray-500">
                每步对应技能库中的真实 SKILL · 预计 {estimateDuration(draft.pipeline)} 分钟
              </p>
            </div>
            <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-2 text-right">
              <p className="text-[10px] font-semibold uppercase tracking-wide text-amber-800">
                流水线总价
              </p>
              <p className="flex items-center justify-end gap-1 text-2xl font-bold text-med-purple">
                <Coins className="h-5 w-5 text-amber-500" />
                {totalCost}
                <span className="text-sm font-normal text-gray-500">算力币</span>
              </p>
              <p className="text-[10px] text-gray-500">余额 {balance.toLocaleString()}</p>
            </div>
          </div>

          <div className="flex flex-col gap-4 lg:flex-row lg:items-stretch">
            {draft.pipeline.map((step, i) => {
              let runState: "idle" | "running" | "done" = "idle";
              if (draft.status === "running") {
                if (i < draft.runningStepIndex) runState = "done";
                else if (i === draft.runningStepIndex) runState = "running";
              } else if (isDone) {
                runState = "done";
              }

              const isLast = i === draft.pipeline.length - 1;

              return (
                <div key={step.id} className="flex flex-1 items-stretch gap-2">
                  <CanvasWorkflowNode
                    step={step}
                    index={i}
                    runState={runState}
                    onTuneParams={
                      step.skillId === "cox-ph" ? () => setParamOpen(true) : undefined
                    }
                    onPreview={isLast && isDone ? () => setPreviewOpen(true) : undefined}
                    onRemove={
                      draft.status === "pipeline-ready" && !step.isLocal
                        ? () => removeStep(step.id)
                        : undefined
                    }
                  />
                  {i < draft.pipeline.length - 1 && (
                    <ArrowRight className="hidden h-5 w-5 shrink-0 self-center text-amber-400 lg:block" />
                  )}
                </div>
              );
            })}
          </div>

          {draft.status === "pipeline-ready" && (
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={onBrowseSkills}
                className="inline-flex items-center gap-2 rounded-xl border border-med-purple/30 bg-white px-5 py-3 text-sm font-semibold text-med-purple transition hover:bg-med-purple/5"
              >
                <Library className="h-4 w-4" />
                调整步骤 · 浏览技能库
              </button>
              <button
                type="button"
                onClick={requestCheckout}
                className="inline-flex items-center gap-2 rounded-xl bg-med-purple px-8 py-3 text-sm font-bold text-white shadow-lg transition hover:bg-med-purple-dark"
              >
                <ShoppingCart className="h-4 w-4 text-amber-400" />
                确认并下单（{totalCost} 算力币）
              </button>
            </div>
          )}

          {draft.status === "running" && (
            <p className="mt-4 text-center text-sm text-med-purple">
              <Loader2 className="mr-2 inline h-4 w-4 animate-spin" />
              正在按序执行 SKILL…
            </p>
          )}

          {isDone && (
            <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-center">
              <CheckCircle2 className="mx-auto h-8 w-8 text-emerald-600" />
              <p className="mt-2 font-semibold text-emerald-800">流水线执行完成</p>
              <p className="mt-1 text-sm text-emerald-700">
                已消耗 {totalCost} 算力币 · SCI 图表包已生成
              </p>
              <button
                type="button"
                onClick={() => setPreviewOpen(true)}
                className="mt-3 rounded-lg bg-med-purple px-5 py-2 text-sm font-semibold text-white"
              >
                预览 SCI 产出
              </button>
            </div>
          )}
        </div>
      )}

      <PrivacyInterceptor
        open={privacyOpen}
        onClose={() => setPrivacyOpen(false)}
        onVerified={() => {
          setPrivacyOpen(false);
          handlePrivacyVerified();
        }}
        actionLabel={
          privacyAction === "recommend" ? "解锁并推荐流水线" : `确认下单（${totalCost} 算力币）`
        }
      />

      <ParamTuneModal
        open={paramOpen}
        params={coxParams}
        onChange={setCoxParams}
        onClose={() => setParamOpen(false)}
      />

      <SciPreviewModal open={previewOpen} onClose={() => setPreviewOpen(false)} />
    </div>
  );
}
