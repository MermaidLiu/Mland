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
} from "lucide-react";
import { MOCK_COLUMNS } from "./mock-data";
import { WORKFLOW_NODES } from "./workflow-data";
import { CanvasWorkflowNode } from "./canvas-workflow-node";
import { PrivacyInterceptor } from "./privacy-interceptor";
import { ParamTuneModal } from "./param-tune-modal";
import { SciPreviewModal } from "./sci-preview-modal";
import type { CoxParams, DetectedColumn } from "./types";

interface CanvasTabProps {
  onRequireAuth: () => void;
  isLoggedIn: boolean;
  balance: number;
  onSpend: (amount: number) => boolean;
}

export function CanvasTab({
  onRequireAuth,
  isLoggedIn,
  balance,
  onSpend,
}: CanvasTabProps) {
  const [goal, setGoal] = useState("");
  const [dragging, setDragging] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [columns, setColumns] = useState<DetectedColumn[]>([]);
  const [generating, setGenerating] = useState(false);
  const [workflowReady, setWorkflowReady] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [paramOpen, setParamOpen] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [coxParams, setCoxParams] = useState<CoxParams>({
    alpha: 0.05,
    penalizer: 0.01,
    l1Ratio: 0.0,
  });
  const fileRef = useRef<HTMLInputElement>(null);

  const simulateUpload = useCallback((name: string) => {
    setFileName(name);
    setColumns(MOCK_COLUMNS);
    setWorkflowReady(false);
  }, []);

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

  function requestGenerate() {
    if (!isLoggedIn) {
      onRequireAuth();
      return;
    }
    if (!goal.trim()) {
      alert("请先输入科研目标");
      return;
    }
    if (!fileName) {
      alert("请先上传脱敏后的数据文件");
      return;
    }
    setPrivacyOpen(true);
  }

  async function handleVerifiedGenerate() {
    if (!onSpend(50)) {
      alert("算力币不足，请先充值");
      return;
    }
    setGenerating(true);
    setWorkflowReady(false);
    await new Promise((r) => setTimeout(r, 900));
    setGenerating(false);
    setWorkflowReady(true);
  }

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <div className="mb-1 flex items-center gap-2">
          <Workflow className="h-5 w-5 text-amber-500" />
          <h3 className="text-lg font-semibold text-med-purple">
            MedSkill Canvas · 自然语言 → 代码工作流
          </h3>
        </div>
        <p className="mb-4 text-xs text-gray-500">
          输入科研目标，AI 生成低代码可视化 SOP；专家可切换查看底层 R / Python 源码。
        </p>
        <textarea
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          rows={3}
          placeholder="输入您的科研目标，如：分析小鼠给药后的生存期差异，输出 Kaplan-Meier 曲线与 Cox 回归结果…"
          className="w-full resize-y rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm leading-relaxed outline-none ring-med-purple/20 transition placeholder:text-gray-400 focus:border-med-purple focus:bg-white focus:ring-2"
        />
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Upload className="h-5 w-5 text-med-purple" />
            <h3 className="text-lg font-semibold text-med-purple">脱敏数据上传</h3>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-med-purple px-3 py-1 text-xs font-semibold text-amber-400">
            <Lock className="h-3.5 w-3.5" />
            本地隐私脱敏已开启
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
        </div>

        {fileName && (
          <div className="mt-4 space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              已载入：<span className="font-mono font-medium">{fileName}</span>
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

      <div className="flex justify-center">
        <button
          type="button"
          onClick={requestGenerate}
          disabled={generating}
          className="inline-flex items-center gap-2 rounded-xl bg-med-purple px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-med-purple/20 transition hover:bg-med-purple-dark disabled:opacity-60"
        >
          {generating ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              生成工作流节点…
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4 text-amber-400" />
              生成分析路径
            </>
          )}
        </button>
      </div>

      {workflowReady && (
        <div className="animate-fade-in rounded-2xl border border-med-purple/15 bg-gray-50 p-6">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-2">
            <div>
              <h3 className="text-lg font-semibold text-med-purple">可视化工作流节点</h3>
              <p className="text-xs text-gray-500">
                Natural Language → Code-Based Workflow · 消耗 50 算力币 · 余额{" "}
                {balance.toLocaleString()}
              </p>
            </div>
            <span className="rounded-full bg-amber-400 px-3 py-1 text-xs font-bold text-med-purple">
              Cox 比例风险回归 v1.2 · 96% 匹配
            </span>
          </div>

          <div className="flex flex-col gap-4 lg:flex-row lg:items-stretch">
            {WORKFLOW_NODES.map((node, i) => (
              <div key={node.id} className="flex flex-1 items-stretch gap-2">
                <CanvasWorkflowNode
                  node={node}
                  index={i}
                  onTuneParams={
                    node.id === "algorithm" ? () => setParamOpen(true) : undefined
                  }
                  onPreview={
                    node.id === "output" ? () => setPreviewOpen(true) : undefined
                  }
                />
                {i < WORKFLOW_NODES.length - 1 && (
                  <ArrowRight className="hidden h-5 w-5 shrink-0 self-center text-amber-400 lg:block" />
                )}
              </div>
            ))}
          </div>

          <p className="mt-4 text-center text-[10px] text-gray-400">
            每个节点右上角可切换「查看源码」— 医学生看 UI，工科大牛看代码
          </p>
        </div>
      )}

      <PrivacyInterceptor
        open={privacyOpen}
        onClose={() => setPrivacyOpen(false)}
        onVerified={handleVerifiedGenerate}
        actionLabel="解锁并生成分析路径"
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
