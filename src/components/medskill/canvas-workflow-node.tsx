"use client";

import { useState } from "react";
import { Code2, Settings, Eye, Lock, Coins, Loader2, CheckCircle2 } from "lucide-react";
import type { PipelineStep } from "./types";

type StepRunState = "idle" | "running" | "done";

interface CanvasWorkflowNodeProps {
  step: PipelineStep;
  index: number;
  runState?: StepRunState;
  onTuneParams?: () => void;
  onPreview?: () => void;
  onRemove?: () => void;
}

export function CanvasWorkflowNode({
  step,
  index,
  runState = "idle",
  onTuneParams,
  onPreview,
  onRemove,
}: CanvasWorkflowNodeProps) {
  const [showCode, setShowCode] = useState(false);

  return (
    <div
      className="animate-fade-in flex flex-1 flex-col"
      style={{ animationDelay: `${index * 120}ms` }}
    >
      <div
        className={`relative min-h-[200px] rounded-2xl border bg-white shadow-sm ring-1 transition ${
          runState === "running"
            ? "border-amber-300 ring-amber-200"
            : runState === "done"
              ? "border-emerald-200 ring-emerald-100"
              : "border-gray-100 ring-gray-50"
        }`}
      >
        {runState === "running" && (
          <div className="absolute inset-x-0 top-0 h-1 overflow-hidden rounded-t-2xl bg-amber-100">
            <div className="h-full w-1/2 animate-pulse bg-amber-400" />
          </div>
        )}

        <div className="p-5">
          <div className="mb-3 flex items-start justify-between gap-2">
            <span
              className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
                runState === "done"
                  ? "bg-emerald-500 text-white"
                  : "bg-med-purple text-amber-400"
              }`}
            >
              {runState === "done" ? (
                <CheckCircle2 className="h-4 w-4" />
              ) : runState === "running" ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                index + 1
              )}
            </span>
            <div className="flex items-center gap-1">
              {step.cost > 0 && (
                <span className="inline-flex items-center gap-0.5 rounded-lg bg-amber-50 px-2 py-1 text-[10px] font-bold text-med-purple">
                  <Coins className="h-3 w-3 text-amber-500" />
                  {step.cost}
                </span>
              )}
              {step.codeSnippet && (
                <button
                  type="button"
                  onClick={() => setShowCode(!showCode)}
                  className="inline-flex items-center gap-1 rounded-lg border border-gray-200 px-2 py-1 text-[10px] font-semibold text-med-purple transition hover:border-med-purple hover:bg-med-purple/5"
                >
                  <Code2 className="h-3 w-3" />
                  {showCode ? "UI" : "</>"}
                </button>
              )}
              {onRemove && (
                <button
                  type="button"
                  onClick={onRemove}
                  className="rounded-lg px-2 py-1 text-[10px] text-gray-400 hover:bg-red-50 hover:text-red-600"
                >
                  移除
                </button>
              )}
            </div>
          </div>

          {!showCode ? (
            <>
              <h4 className="font-semibold text-gray-900">{step.title}</h4>
              <p className="mt-0.5 text-xs text-gray-400">{step.subtitle}</p>
              {step.highlight && (
                <p className="mt-1 text-sm font-medium text-med-purple">{step.highlight}</p>
              )}
              <p className="mt-2 text-xs leading-relaxed text-gray-500">
                {step.uiDescription}
              </p>
              {step.journalNote && (
                <p className="mt-2 text-[10px] font-medium text-amber-700">
                  图表样式 · {step.journalNote}
                </p>
              )}

              <div className="mt-4 flex flex-wrap items-center gap-2">
                {step.badge && (
                  <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold text-emerald-700">
                    {step.badge}
                  </span>
                )}
                {step.skillId === "cox-ph" && onTuneParams && (
                  <button
                    type="button"
                    onClick={onTuneParams}
                    className="inline-flex items-center gap-1 rounded-full bg-amber-400 px-2.5 py-1 text-[10px] font-bold text-med-purple transition hover:bg-amber-300"
                  >
                    <Settings className="h-3 w-3" />
                    微调参数
                  </button>
                )}
                {onPreview && (
                  <button
                    type="button"
                    onClick={onPreview}
                    className="inline-flex items-center gap-1 rounded-full border border-med-purple/30 bg-med-purple/5 px-2.5 py-1 text-[10px] font-semibold text-med-purple transition hover:bg-med-purple/10"
                  >
                    <Eye className="h-3 w-3" />
                    预览产出
                  </button>
                )}
              </div>
            </>
          ) : (
            <div className="rounded-xl border border-med-purple/20 bg-gray-900 p-3">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-amber-400">
                  {step.codeLang === "r" ? "R" : "Python"} · 专家视图
                </span>
                <button
                  type="button"
                  onClick={() => setShowCode(false)}
                  className="rounded px-2 py-0.5 text-[10px] font-semibold text-amber-400 hover:bg-white/10"
                >
                  返回 UI
                </button>
              </div>
              <pre className="max-h-32 overflow-auto font-mono text-[10px] leading-relaxed text-emerald-300">
                {step.codeSnippet}
              </pre>
              <p className="mt-2 flex items-center gap-1 text-[10px] text-gray-400">
                <Lock className="h-3 w-3" />
                SKILL 广场 · {step.skillId ?? "local"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
