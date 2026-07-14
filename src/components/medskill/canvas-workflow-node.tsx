"use client";

import { useState } from "react";
import { Code2, Settings, Eye, Lock } from "lucide-react";
import type { WorkflowNodeData } from "./types";

interface CanvasWorkflowNodeProps {
  node: WorkflowNodeData;
  index: number;
  onTuneParams?: () => void;
  onPreview?: () => void;
}

export function CanvasWorkflowNode({
  node,
  index,
  onTuneParams,
  onPreview,
}: CanvasWorkflowNodeProps) {
  const [showCode, setShowCode] = useState(false);

  return (
    <div
      className="animate-fade-in flex flex-1 flex-col"
      style={{ animationDelay: `${index * 120}ms` }}
    >
      <div className="perspective-1000 relative min-h-[200px]">
        <div
          className={`relative h-full transition-transform duration-500 ${
            showCode ? "animate-flip-in" : ""
          }`}
        >
          {!showCode ? (
            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm ring-1 ring-gray-50">
              <div className="mb-3 flex items-start justify-between gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-med-purple text-sm font-bold text-amber-400">
                  {index + 1}
                </span>
                <button
                  type="button"
                  onClick={() => setShowCode(true)}
                  className="inline-flex items-center gap-1 rounded-lg border border-gray-200 px-2 py-1 text-[10px] font-semibold text-med-purple transition hover:border-med-purple hover:bg-med-purple/5"
                >
                  <Code2 className="h-3 w-3" />
                  查看源码 &lt;/&gt;
                </button>
              </div>

              <h4 className="font-semibold text-gray-900">{node.title}</h4>
              {node.highlight && (
                <p className="mt-1 text-sm font-medium text-med-purple">
                  {node.highlight}
                </p>
              )}
              <p className="mt-2 text-xs leading-relaxed text-gray-500">
                {node.uiDescription}
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-2">
                {node.badge && (
                  <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold text-emerald-700">
                    {node.badge}
                  </span>
                )}
                {node.id === "algorithm" && onTuneParams && (
                  <button
                    type="button"
                    onClick={onTuneParams}
                    className="inline-flex items-center gap-1 rounded-full bg-amber-400 px-2.5 py-1 text-[10px] font-bold text-med-purple transition hover:bg-amber-300"
                  >
                    <Settings className="h-3 w-3" />
                    微调参数
                  </button>
                )}
                {node.id === "output" && onPreview && (
                  <button
                    type="button"
                    onClick={onPreview}
                    className="inline-flex items-center gap-1 rounded-full border border-med-purple/30 bg-med-purple/5 px-2.5 py-1 text-[10px] font-semibold text-med-purple transition hover:bg-med-purple/10"
                  >
                    <Eye className="h-3 w-3" />
                    预览 SCI 产出
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border border-med-purple/20 bg-gray-900 p-4 shadow-lg">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-amber-400">
                  {node.codeLang === "r" ? "R" : "Python"} · 专家视图
                </span>
                <button
                  type="button"
                  onClick={() => setShowCode(false)}
                  className="rounded px-2 py-0.5 text-[10px] font-semibold text-amber-400 hover:bg-white/10"
                >
                  返回 UI 视图
                </button>
              </div>
              <pre className="max-h-40 overflow-auto font-mono text-[11px] leading-relaxed text-emerald-300">
                {node.codeSnippet}
              </pre>
              <p className="mt-2 flex items-center gap-1 text-[10px] text-gray-400">
                <Lock className="h-3 w-3" />
                工科大牛可在此调优；医学生默认使用 UI 可视化操作
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
