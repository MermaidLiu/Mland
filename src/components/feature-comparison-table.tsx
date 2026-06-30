import Link from "next/link";
import { Check, X } from "lucide-react";
import {
  FEATURE_COMPARISON,
  PRO_SECURITY_WARNING,
} from "@/lib/pro-comparison";
import { ProUpgradeButton } from "@/components/pro-upgrade-button";
import { cn } from "@/lib/utils";

function CellValue({ value, isPro }: { value: string | boolean; isPro?: boolean }) {
  if (typeof value === "boolean") {
    return value ? (
      <Check
        className={cn(
          "mx-auto h-5 w-5",
          isPro ? "text-emerald-500" : "text-muted-foreground"
        )}
      />
    ) : (
      <span className="flex flex-col items-center gap-1">
        <X className="h-5 w-5 text-destructive" />
        {!isPro && (
          <span className="text-[10px] font-medium text-destructive/80">
            已禁用
          </span>
        )}
      </span>
    );
  }
  return (
    <span
      className={cn(
        "text-sm",
        isPro && value.includes("7×24") && "font-semibold text-emerald-600 dark:text-emerald-400"
      )}
    >
      {value}
    </span>
  );
}

interface FeatureComparisonTableProps {
  showWarning?: boolean;
  showCta?: boolean;
  className?: string;
}

export function FeatureComparisonTable({
  showWarning = true,
  showCta = true,
  className,
}: FeatureComparisonTableProps) {
  return (
    <div className={cn("space-y-4", className)}>
      <div className="overflow-hidden rounded-xl border">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="px-4 py-3 font-semibold">功能点</th>
              <th className="px-4 py-3 text-center font-semibold">开源免费版</th>
              <th className="px-4 py-3 text-center font-semibold text-emerald-600 dark:text-emerald-400">
                Pro 企业版
              </th>
            </tr>
          </thead>
          <tbody>
            {FEATURE_COMPARISON.map((row) => (
              <tr
                key={row.feature}
                className={cn(
                  "border-b last:border-0",
                  row.highlight && "bg-orange-500/5"
                )}
              >
                <td className="px-4 py-3 font-medium">
                  {row.highlight && (
                    <span className="mr-1 text-orange-500">●</span>
                  )}
                  {row.feature}
                </td>
                <td className="px-4 py-3 text-center">
                  {typeof row.free === "boolean" && !row.free ? (
                    <span className="inline-flex flex-col items-center">
                      <CellValue value={false} />
                      {row.highlight && (
                        <span className="mt-1 rounded bg-destructive/10 px-2 py-0.5 text-[10px] text-destructive">
                          水印提示
                        </span>
                      )}
                    </span>
                  ) : (
                    <CellValue value={row.free} />
                  )}
                </td>
                <td className="px-4 py-3 text-center bg-emerald-500/5">
                  {typeof row.pro === "boolean" && row.pro ? (
                    <span className="inline-flex flex-col items-center">
                      <CellValue value={true} isPro />
                      {row.highlight && (
                        <span className="mt-1 text-[10px] font-medium text-emerald-600 dark:text-emerald-400">
                          {row.feature.includes("病历")
                            ? "加密存储"
                            : row.feature.includes("HIS")
                              ? "专属适配开发"
                              : "持久化卷存储"}
                        </span>
                      )}
                    </span>
                  ) : (
                    <CellValue value={row.pro} isPro />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showWarning && (
        <div className="rounded-lg border border-orange-500/30 bg-orange-500/10 px-4 py-3 text-sm text-orange-700 dark:text-orange-300">
          <em>{PRO_SECURITY_WARNING}</em>
        </div>
      )}

      {showCta && (
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-emerald-500/20 bg-gradient-to-r from-emerald-500/5 to-cyan-500/5 p-4">
          <div>
            <p className="font-semibold">Pro = 数据保险箱 + 智能加速器</p>
            <p className="mt-1 text-sm text-muted-foreground">
              真实患者数据加密存储 · GPU 推理加速 · 院内私有化部署
            </p>
          </div>
          <div className="flex gap-2">
            <ProUpgradeButton size="default" />
            <Link
              href="mailto:sales@mland.io"
              className="inline-flex items-center rounded-md border px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
            >
              联系销售
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
