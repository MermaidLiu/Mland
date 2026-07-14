"use client";

import { Check, X } from "lucide-react";
import { ProUpgradeButton } from "@/components/pro-upgrade-button";
import { useI18n } from "@/components/i18n-provider";
import { CONTACT_EMAIL } from "@/lib/data";
import { cn } from "@/lib/utils";

function CellValue({
  value,
  isPro,
  disabledLabel,
}: {
  value: string | boolean;
  isPro?: boolean;
  disabledLabel: string;
}) {
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
          <span className="text-[10px] font-medium text-destructive/80">{disabledLabel}</span>
        )}
      </span>
    );
  }
  return (
    <span
      className={cn(
        "text-sm",
        isPro &&
          (value.includes("24/7") || value.includes("7×24")) &&
          "font-semibold text-emerald-600 dark:text-emerald-400"
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
  const { dict } = useI18n();
  const t = dict.comparison;

  return (
    <div className={cn("space-y-4", className)}>
      <div className="overflow-hidden rounded-xl border">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="px-4 py-3 font-semibold">{t.columns.feature}</th>
              <th className="px-4 py-3 text-center font-semibold">{t.columns.free}</th>
              <th className="px-4 py-3 text-center font-semibold text-emerald-600 dark:text-emerald-400">
                {t.columns.pro}
              </th>
            </tr>
          </thead>
          <tbody>
            {t.rows.map((row) => (
              <tr
                key={row.feature}
                className={cn(
                  "border-b last:border-0",
                  "highlight" in row && row.highlight && "bg-orange-500/5"
                )}
              >
                <td className="px-4 py-3 font-medium">
                  {"highlight" in row && row.highlight && (
                    <span className="mr-1 text-orange-500">●</span>
                  )}
                  {row.feature}
                </td>
                <td className="px-4 py-3 text-center">
                  {typeof row.free === "boolean" && !row.free ? (
                    <span className="inline-flex flex-col items-center">
                      <CellValue value={false} disabledLabel={t.disabled} />
                      {"highlight" in row && row.highlight && (
                        <span className="mt-1 rounded bg-destructive/10 px-2 py-0.5 text-[10px] text-destructive">
                          {t.watermark}
                        </span>
                      )}
                    </span>
                  ) : (
                    <CellValue value={row.free} disabledLabel={t.disabled} />
                  )}
                </td>
                <td className="bg-emerald-500/5 px-4 py-3 text-center">
                  {typeof row.pro === "boolean" && row.pro ? (
                    <span className="inline-flex flex-col items-center">
                      <CellValue value={true} isPro disabledLabel={t.disabled} />
                      {"proHint" in row && row.proHint && (
                        <span className="mt-1 text-[10px] font-medium text-emerald-600 dark:text-emerald-400">
                          {row.proHint}
                        </span>
                      )}
                    </span>
                  ) : (
                    <CellValue value={row.pro} isPro disabledLabel={t.disabled} />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showWarning && (
        <div className="rounded-lg border border-orange-500/30 bg-orange-500/10 px-4 py-3 text-sm text-orange-700 dark:text-orange-300">
          <em>{t.warning}</em>
        </div>
      )}

      {showCta && (
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-emerald-500/20 bg-gradient-to-r from-emerald-500/5 to-cyan-500/5 p-4">
          <div>
            <p className="font-semibold">{t.ctaTitle}</p>
            <p className="mt-1 text-sm text-muted-foreground">{t.ctaSubtitle}</p>
          </div>
          <div className="flex gap-2">
            <ProUpgradeButton size="default" />
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="inline-flex items-center rounded-md border px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
            >
              {t.contactSales}
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
