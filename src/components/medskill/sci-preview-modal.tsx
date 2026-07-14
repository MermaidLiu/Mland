"use client";

import { X, Table2, TrendingUp } from "lucide-react";
import { SCI_TABLE_PREVIEW } from "./workflow-data";

interface SciPreviewModalProps {
  open: boolean;
  onClose: () => void;
}

export function SciPreviewModal({ open, onClose }: SciPreviewModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <button
        type="button"
        className="absolute inset-0 bg-med-purple/40 backdrop-blur-sm"
        aria-label="关闭"
        onClick={onClose}
      />
      <div className="relative max-h-[90vh] w-full max-w-2xl overflow-auto rounded-2xl border border-gray-100 bg-white shadow-2xl">
        <div className="sticky top-0 flex items-center justify-between border-b border-gray-100 bg-white px-5 py-4">
          <div>
            <p className="text-xs font-medium text-amber-600">SCI 产出物预览</p>
            <h3 className="font-bold text-med-purple">三线表 + 生存曲线</h3>
          </div>
          <button type="button" onClick={onClose} className="text-gray-400 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-6 p-5">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-800">
              <Table2 className="h-4 w-4 text-med-purple" />
              Table 1 · Cox 回归结果（Nature 三线表）
            </div>
            <div className="overflow-hidden rounded-xl border border-gray-200">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b-2 border-gray-900 bg-gray-50">
                    {SCI_TABLE_PREVIEW.headers.map((h) => (
                      <th key={h} className="px-4 py-2 font-semibold text-gray-900">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {SCI_TABLE_PREVIEW.rows.map((row) => (
                    <tr key={row[0]} className="border-b border-gray-200">
                      {row.map((cell, i) => (
                        <td
                          key={i}
                          className={`px-4 py-2 ${i === 0 ? "font-medium" : "font-mono text-gray-700"}`}
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-800">
              <TrendingUp className="h-4 w-4 text-amber-500" />
              Kaplan-Meier 生存曲线
            </div>
            <div className="rounded-xl border border-gray-200 bg-gradient-to-b from-white to-gray-50 p-6">
              <svg viewBox="0 0 400 220" className="mx-auto w-full max-w-md">
                <line x1="40" y1="180" x2="380" y2="180" stroke="#374151" strokeWidth="1" />
                <line x1="40" y1="20" x2="40" y2="180" stroke="#374151" strokeWidth="1" />
                <text x="200" y="210" textAnchor="middle" className="fill-gray-500 text-[10px]">
                  Time (months)
                </text>
                <text
                  x="12"
                  y="100"
                  textAnchor="middle"
                  transform="rotate(-90 12 100)"
                  className="fill-gray-500 text-[10px]"
                >
                  Survival probability
                </text>
                <path
                  d="M 40 40 C 120 55, 200 90, 380 150"
                  fill="none"
                  stroke="#56004F"
                  strokeWidth="2.5"
                />
                <path
                  d="M 40 60 C 130 75, 220 110, 380 165"
                  fill="none"
                  stroke="#FBBF24"
                  strokeWidth="2.5"
                  strokeDasharray="6 4"
                />
                <text x="300" y="55" className="fill-[#56004F] text-[11px] font-semibold">
                  Treatment
                </text>
                <text x="300" y="130" className="fill-amber-500 text-[11px] font-semibold">
                  Control
                </text>
              </svg>
              <p className="mt-2 text-center text-[10px] text-gray-400">
                300 DPI SVG 矢量图 · Log-rank p = 0.021
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
