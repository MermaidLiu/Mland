"use client";

import { Check, X } from "lucide-react";
import { ProUpgradeButton } from "@/components/pro-upgrade-button";
import { useI18n } from "@/components/i18n-provider";
import { CONTACT_EMAIL } from "@/lib/data";
import { cn } from "@/lib/utils";

function CellValue({
  value,
  accent,
  disabledLabel,
}: {
  value: string | boolean;
  accent?: boolean;
  disabledLabel: string;
}) {
  if (typeof value === "boolean") {
    return value ? (
      <Check
        className={cn("mx-auto h-5 w-5", accent ? "text-med-purple" : "text-muted-foreground")}
      />
    ) : (
      <span className="flex flex-col items-center gap-1">
        <X className="h-5 w-5 text-destructive" />
        {!accent && (
          <span className="text-[10px] font-medium text-destructive/80">{disabledLabel}</span>
        )}
      </span>
    );
  }
  return (
    <span
      className={cn(
        "text-sm",
        accent && "font-semibold text-med-purple dark:text-med-purple-light"
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

  const columns = [
    { key: "free" as const, label: t.columns.free, accent: false },
    { key: "pro" as const, label: t.columns.pro, accent: true },
    { key: "lab" as const, label: t.columns.lab, accent: false },
  ];

  return (
    <div className={cn("space-y-4", className)}>
      <div className="overflow-x-auto rounded-xl border">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="px-4 py-3 font-semibold">{t.columns.feature}</th>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={cn(
                    "px-4 py-3 text-center font-semibold",
                    col.accent && "text-med-purple dark:text-med-purple-light"
                  )}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {t.rows.map((row) => (
              <tr
                key={row.feature}
                className={cn(
                  "border-b last:border-0",
                  "highlight" in row && row.highlight && "bg-med-purple/5"
                )}
              >
                <td className="px-4 py-3 font-medium">
                  {"highlight" in row && row.highlight && (
                    <span className="mr-1 text-med-amber">●</span>
                  )}
                  {row.feature}
                </td>
                {columns.map((col) => {
                  const value = row[col.key];
                  const isBoolFalse = typeof value === "boolean" && !value;

                  return (
                    <td
                      key={col.key}
                      className={cn(
                        "px-4 py-3 text-center",
                        col.accent && "bg-med-purple/5"
                      )}
                    >
                      {isBoolFalse ? (
                        <span className="inline-flex flex-col items-center">
                          <CellValue value={false} disabledLabel={t.disabled} />
                          {"highlight" in row && row.highlight && col.key === "free" && (
                            <span className="mt-1 rounded bg-destructive/10 px-2 py-0.5 text-[10px] text-destructive">
                              {t.watermark}
                            </span>
                          )}
                        </span>
                      ) : typeof value === "boolean" && value ? (
                        <span className="inline-flex flex-col items-center">
                          <CellValue value={true} accent={col.accent} disabledLabel={t.disabled} />
                          {"proHint" in row && row.proHint && col.accent && (
                            <span className="mt-1 text-[10px] font-medium text-med-purple dark:text-med-purple-light">
                              {row.proHint}
                            </span>
                          )}
                        </span>
                      ) : (
                        <CellValue
                          value={value}
                          accent={col.accent}
                          disabledLabel={t.disabled}
                        />
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showWarning && (
        <div className="rounded-lg border border-med-amber/30 bg-med-amber/10 px-4 py-3 text-sm text-orange-800 dark:text-orange-200">
          <em>{t.warning}</em>
        </div>
      )}

      {showCta && (
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-med-purple/20 bg-gradient-to-r from-med-purple/5 to-med-amber/5 p-4">
          <div>
            <p className="font-semibold">{t.ctaTitle}</p>
            <p className="mt-1 text-sm text-muted-foreground">{t.ctaSubtitle}</p>
          </div>
          <div className="flex gap-2">
            <ProUpgradeButton size="default" />
            <a
              href={`mailto:${CONTACT_EMAIL}?subject=MedSkill Lab Plan`}
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
