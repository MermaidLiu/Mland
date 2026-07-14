"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ExternalLink,
  Flame,
  Coins,
  X,
  Play,
  Table2,
  ImageIcon,
  Star,
} from "lucide-react";
import { CATEGORY_LABELS, SKILL_CATALOG } from "./mock-data";
import { PrivacyInterceptor } from "./privacy-interceptor";
import type { SkillCategory, SkillItem } from "./types";

interface SkillStoreTabProps {
  onRequireAuth: () => void;
  isLoggedIn: boolean;
  onSpend: (amount: number) => boolean;
}

export function SkillStoreTab({
  onRequireAuth,
  isLoggedIn,
  onSpend,
}: SkillStoreTabProps) {
  const [category, setCategory] = useState<SkillCategory>("all");
  const [selected, setSelected] = useState<SkillItem | null>(null);
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [privacyPassed, setPrivacyPassed] = useState(false);

  const filtered = useMemo(
    () =>
      category === "all"
        ? SKILL_CATALOG
        : SKILL_CATALOG.filter((s) => s.category === category),
    [category]
  );

  const categories = Object.keys(CATEGORY_LABELS) as SkillCategory[];

  useEffect(() => {
    if (!selected) {
      setPrivacyPassed(false);
      setDone(false);
    }
  }, [selected]);

  function handleRunClick() {
    if (!selected) return;
    if (!isLoggedIn) {
      onRequireAuth();
      return;
    }
    if (!privacyPassed) {
      setPrivacyOpen(true);
      return;
    }
    executeRun();
  }

  async function executeRun() {
    if (!selected) return;
    if (!onSpend(selected.cost)) {
      alert("算力币不足，请先充值");
      return;
    }
    setRunning(true);
    setDone(false);
    await new Promise((r) => setTimeout(r, 1000));
    setRunning(false);
    setDone(true);
  }

  return (
    <div className="space-y-6">
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
        {filtered.map((skill) => (
          <button
            key={skill.id}
            type="button"
            onClick={() => {
              setSelected(skill);
              setDone(false);
              setPrivacyPassed(false);
            }}
            className="group flex flex-col rounded-2xl border border-gray-100 bg-white p-5 text-left shadow-sm transition hover:border-med-purple/30 hover:shadow-md"
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
          </button>
        ))}
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
                <p className="text-xs font-medium text-amber-600">运行 / 调用面板</p>
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

              <a
                href={selected.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-med-purple hover:underline"
              >
                <ExternalLink className="h-4 w-4" />
                GitHub 开源地址
              </a>

              {privacyPassed && (
                <div className="rounded-lg bg-med-purple px-3 py-2 text-center text-xs font-semibold text-amber-400">
                  ✓ 安全合规凭证已签发 · 可运行 SKILL
                </div>
              )}

              <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
                <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-amber-800">
                  一键生成预览
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-lg border border-white bg-white p-3 text-center shadow-sm">
                    <Table2 className="mx-auto h-8 w-8 text-med-purple" />
                    <p className="mt-2 text-xs font-medium text-gray-800">SCI 标准三线表</p>
                  </div>
                  <div className="rounded-lg border border-white bg-white p-3 text-center shadow-sm">
                    <ImageIcon className="mx-auto h-8 w-8 text-amber-500" />
                    <p className="mt-2 text-xs font-medium text-gray-800">高显色矢量图</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">贡献者 · {selected.contributor}</span>
                <span className="inline-flex items-center gap-1 font-bold text-med-purple">
                  <Coins className="h-4 w-4 text-amber-500" />
                  {selected.cost} 算力币
                </span>
              </div>

              {done && (
                <div className="flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-800">
                  <Star className="h-4 w-4 text-amber-500" />
                  调用成功！演示环境下已生成 SCI 图表预览包。
                </div>
              )}

              <button
                type="button"
                onClick={handleRunClick}
                disabled={running}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-med-purple py-3 text-sm font-bold text-white transition hover:bg-med-purple-dark disabled:opacity-60"
              >
                <Play className="h-4 w-4 text-amber-400" />
                {running
                  ? "调用中…"
                  : privacyPassed
                    ? "一键运行 SKILL"
                    : "安全扫描并运行"}
              </button>
            </div>
          </div>
        </div>
      )}

      <PrivacyInterceptor
        open={privacyOpen}
        onClose={() => setPrivacyOpen(false)}
        onVerified={() => {
          setPrivacyPassed(true);
          executeRun();
        }}
        actionLabel="解锁并运行 SKILL"
      />
    </div>
  );
}
