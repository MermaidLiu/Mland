"use client";

import { useMemo, useState } from "react";
import {
  ExternalLink,
  Flame,
  Coins,
  X,
  Plus,
  ArrowLeft,
  Library,
  Workflow,
} from "lucide-react";
import { CATEGORY_LABELS, SKILL_CATALOG } from "./mock-data";
import { pipelineTotalCost } from "./workflow-recommendations";
import type { DraftProject, SkillCategory, SkillItem } from "./types";

interface SkillStoreTabProps {
  draft: DraftProject;
  onRequireAuth: () => void;
  isLoggedIn: boolean;
  onAddToPipeline: (skill: SkillItem) => void;
  onGoToWorkflow: () => void;
}

export function SkillStoreTab({
  draft,
  onRequireAuth,
  isLoggedIn,
  onAddToPipeline,
  onGoToWorkflow,
}: SkillStoreTabProps) {
  const [category, setCategory] = useState<SkillCategory>("all");
  const [selected, setSelected] = useState<SkillItem | null>(null);

  const filtered = useMemo(
    () =>
      category === "all"
        ? SKILL_CATALOG
        : SKILL_CATALOG.filter((s) => s.category === category),
    [category]
  );

  const categories = Object.keys(CATEGORY_LABELS) as SkillCategory[];
  const hasPipeline = draft.pipeline.length > 0;
  const totalCost = pipelineTotalCost(draft.pipeline);
  const inPipeline = (skillId: string) =>
    draft.pipeline.some((s) => s.skillId === skillId);

  function handleAdd(skill: SkillItem) {
    if (!isLoggedIn) {
      onRequireAuth();
      return;
    }
    onAddToPipeline(skill);
    setSelected(null);
  }

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-med-purple/15 bg-med-purple/5 p-5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Library className="h-5 w-5 text-med-purple" />
              <h2 className="text-lg font-semibold text-med-purple">SKILL 技能库</h2>
            </div>
            <p className="mt-2 max-w-xl text-sm text-gray-600">
              浏览全部科研 SKILL。在「科研工作流」中系统会按课题自动推荐；你也可以在此手动加入或替换步骤。
            </p>
          </div>
          {hasPipeline && (
            <button
              type="button"
              onClick={onGoToWorkflow}
              className="inline-flex items-center gap-2 rounded-xl bg-med-purple px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-med-purple-dark"
            >
              <Workflow className="h-4 w-4 text-amber-400" />
              返回工作流（{draft.pipeline.length} 步 · {totalCost} 币）
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {categories.map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => setCategory(key)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              category === key
                ? "bg-med-purple text-white"
                : "border border-gray-200 bg-white text-gray-600 hover:border-med-purple/30 hover:text-med-purple"
            }`}
          >
            {CATEGORY_LABELS[key]}
          </button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((skill) => {
          const added = inPipeline(skill.id);
          return (
            <button
              key={skill.id}
              type="button"
              onClick={() => setSelected(skill)}
              className={`group flex flex-col rounded-2xl border bg-white p-5 text-left shadow-sm transition hover:shadow-md ${
                added
                  ? "border-emerald-300 bg-emerald-50/30"
                  : "border-gray-100 hover:border-med-purple/30"
              }`}
            >
              <div className="mb-3 flex items-start justify-between gap-2">
                <span className="rounded-md bg-gray-50 px-2 py-0.5 text-[10px] font-semibold text-med-purple">
                  {CATEGORY_LABELS[skill.category]}
                </span>
                <span className="inline-flex items-center gap-1 text-xs text-amber-600">
                  <Flame className="h-3.5 w-3.5" />
                  {skill.heat}
                </span>
              </div>
              <h3 className="font-semibold text-gray-900 group-hover:text-med-purple">
                {skill.name}{" "}
                <span className="text-xs font-normal text-gray-400">{skill.version}</span>
              </h3>
              <p className="mt-2 line-clamp-2 flex-1 text-xs leading-relaxed text-gray-500">
                {skill.description}
              </p>
              <div className="mt-4 flex items-center justify-between border-t border-gray-50 pt-3 text-xs text-gray-500">
                <span className="truncate">{skill.contributor}</span>
                <span className="inline-flex items-center gap-1 font-semibold text-med-purple">
                  <Coins className="h-3.5 w-3.5 text-amber-500" />
                  {skill.cost}
                </span>
              </div>
              {added && (
                <p className="mt-2 text-[10px] font-semibold text-emerald-600">
                  ✓ 已加入当前流水线
                </p>
              )}
            </button>
          );
        })}
      </div>

      {selected && (
        <div className="fixed inset-0 z-[90] flex items-end justify-center p-4 sm:items-center">
          <button
            type="button"
            className="absolute inset-0 bg-med-purple/40 backdrop-blur-sm"
            aria-label="关闭"
            onClick={() => setSelected(null)}
          />
          <div className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-2xl">
            <div className="flex items-start justify-between border-b border-gray-100 bg-gray-50 px-5 py-4">
              <div>
                <p className="text-xs font-medium text-amber-600">SKILL 详情</p>
                <h3 className="mt-0.5 text-lg font-bold text-med-purple">
                  {selected.name} {selected.version}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="rounded-lg p-1.5 text-gray-400 hover:bg-white hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4 p-5">
              <p className="text-sm text-gray-600">{selected.description}</p>
              <p className="text-xs text-gray-500">产出：{selected.previewTitle}</p>

              <a
                href={selected.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-med-purple hover:underline"
              >
                <ExternalLink className="h-4 w-4" />
                GitHub 开源地址
              </a>

              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">贡献者 · {selected.contributor}</span>
                <span className="inline-flex items-center gap-1 font-bold text-med-purple">
                  <Coins className="h-4 w-4 text-amber-500" />
                  {selected.cost} 算力币
                </span>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => handleAdd(selected)}
                  disabled={inPipeline(selected.id)}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-med-purple py-3 text-sm font-bold text-white transition hover:bg-med-purple-dark disabled:opacity-50"
                >
                  <Plus className="h-4 w-4 text-amber-400" />
                  {inPipeline(selected.id) ? "已在流水线中" : "加入科研工作流"}
                </button>
                {hasPipeline && (
                  <button
                    type="button"
                    onClick={() => {
                      setSelected(null);
                      onGoToWorkflow();
                    }}
                    className="inline-flex items-center gap-1 rounded-xl border border-gray-200 px-4 py-3 text-sm font-semibold text-gray-600 hover:bg-gray-50"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    工作流
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
