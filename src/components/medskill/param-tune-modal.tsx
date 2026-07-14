"use client";

import { X } from "lucide-react";
import type { CoxParams } from "./types";

interface ParamTuneModalProps {
  open: boolean;
  params: CoxParams;
  onChange: (params: CoxParams) => void;
  onClose: () => void;
}

export function ParamTuneModal({
  open,
  params,
  onChange,
  onClose,
}: ParamTuneModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <button
        type="button"
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        aria-label="关闭"
        onClick={onClose}
      />
      <div className="relative w-full max-w-sm rounded-2xl border border-gray-100 bg-white p-5 shadow-2xl">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-semibold text-med-purple">Cox 模型参数微调</h3>
          <button type="button" onClick={onClose} className="text-gray-400 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-5">
          <div>
            <div className="mb-1 flex justify-between text-xs">
              <span className="text-gray-600">显著性水平 α</span>
              <span className="font-mono font-semibold text-med-purple">{params.alpha.toFixed(2)}</span>
            </div>
            <input
              type="range"
              min={0.01}
              max={0.1}
              step={0.01}
              value={params.alpha}
              onChange={(e) =>
                onChange({ ...params, alpha: parseFloat(e.target.value) })
              }
              className="w-full accent-med-purple"
            />
          </div>
          <div>
            <div className="mb-1 flex justify-between text-xs">
              <span className="text-gray-600">L2 惩罚项 penalizer</span>
              <span className="font-mono font-semibold text-med-purple">
                {params.penalizer.toFixed(3)}
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={0.1}
              step={0.005}
              value={params.penalizer}
              onChange={(e) =>
                onChange({ ...params, penalizer: parseFloat(e.target.value) })
              }
              className="w-full accent-amber-400"
            />
          </div>
          <div>
            <div className="mb-1 flex justify-between text-xs">
              <span className="text-gray-600">L1 比例 l1_ratio</span>
              <span className="font-mono font-semibold text-med-purple">
                {params.l1Ratio.toFixed(2)}
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={params.l1Ratio}
              onChange={(e) =>
                onChange({ ...params, l1Ratio: parseFloat(e.target.value) })
              }
              className="w-full accent-med-purple"
            />
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="mt-5 w-full rounded-xl bg-med-purple py-2.5 text-sm font-semibold text-white hover:bg-med-purple-dark"
        >
          应用参数
        </button>
      </div>
    </div>
  );
}
