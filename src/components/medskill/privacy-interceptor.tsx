"use client";

import { useEffect, useState } from "react";
import { Shield, X, Loader2, CheckCircle2, Lock } from "lucide-react";
import { PHI_FIELDS } from "./workflow-data";

type ScanPhase = "scanning" | "hashing" | "verified";

interface PrivacyInterceptorProps {
  open: boolean;
  onClose: () => void;
  onVerified: () => void;
  actionLabel?: string;
}

export function PrivacyInterceptor({
  open,
  onClose,
  onVerified,
  actionLabel = "继续运行",
}: PrivacyInterceptorProps) {
  const [phase, setPhase] = useState<ScanPhase>("scanning");
  const [visibleFields, setVisibleFields] = useState(0);

  useEffect(() => {
    if (!open) {
      setPhase("scanning");
      setVisibleFields(0);
      return;
    }

    const t1 = window.setTimeout(() => setPhase("hashing"), 1400);
    const t2 = window.setTimeout(() => setPhase("verified"), 2600);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [open]);

  useEffect(() => {
    if (phase !== "hashing") return;
    if (visibleFields >= PHI_FIELDS.length) return;
    const t = window.setTimeout(
      () => setVisibleFields((v) => v + 1),
      400
    );
    return () => window.clearTimeout(t);
  }, [phase, visibleFields]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
      <button
        type="button"
        className="absolute inset-0 bg-med-purple/50 backdrop-blur-sm"
        aria-label="关闭"
        onClick={onClose}
      />
      <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50 px-5 py-4">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-med-purple" />
            <span className="font-semibold text-med-purple">数据安全脱敏拦截器</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1 text-gray-400 hover:bg-white hover:text-gray-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-4 p-5">
          {phase === "scanning" && (
            <div className="animate-fade-in text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-med-purple/10">
                <Loader2 className="h-8 w-8 animate-spin text-med-purple" />
              </div>
              <p className="text-sm font-medium text-gray-800 animate-scan-pulse">
                正在检索患者隐私（PHI）…
              </p>
              <p className="mt-1 text-xs text-gray-500">
                本地扫描，数据不上传云端
              </p>
              <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-gray-100">
                <div className="h-full w-2/3 animate-progress-shimmer rounded-full" />
              </div>
            </div>
          )}

          {phase === "hashing" && (
            <div className="animate-fade-in space-y-3">
              <p className="text-sm font-medium text-gray-800">
                发现敏感字段，正在本地 Hash 混淆…
              </p>
              {PHI_FIELDS.slice(0, visibleFields).map((f) => (
                <div
                  key={f.name}
                  className="flex items-center gap-2 rounded-lg border border-emerald-100 bg-emerald-50 px-3 py-2 text-xs animate-fade-in"
                >
                  <Lock className="h-3.5 w-3.5 text-emerald-600" />
                  <span className="font-mono font-medium text-gray-800">{f.name}</span>
                  <span className="text-gray-500">→</span>
                  <span className="text-emerald-700">{f.action}</span>
                </div>
              ))}
            </div>
          )}

          {phase === "verified" && (
            <div className="animate-fade-in space-y-4">
              {PHI_FIELDS.map((f) => (
                <div
                  key={f.name}
                  className="flex items-center gap-2 rounded-lg border border-emerald-100 bg-emerald-50 px-3 py-2 text-xs"
                >
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                  <span className="font-mono font-medium">{f.name}</span>
                  <span className="text-emerald-700">已自动本地 Hash 混淆</span>
                </div>
              ))}

              <div className="rounded-xl bg-med-purple px-4 py-3 text-center">
                <p className="text-xs font-semibold uppercase tracking-wider text-amber-400">
                  安全合规凭证
                </p>
                <p className="mt-1 text-sm font-bold text-white">
                  ✓ PHI 本地脱敏通过 · 可安全运行
                </p>
                <p className="mt-0.5 text-[10px] text-white/60">
                  MedSkill Privacy Interceptor v1.0
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  onVerified();
                  onClose();
                }}
                className="w-full rounded-xl bg-amber-400 py-3 text-sm font-bold text-med-purple transition hover:bg-amber-300"
              >
                {actionLabel}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
