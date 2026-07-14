"use client";

import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { useI18n } from "@/components/i18n-provider";
import { LocaleLink } from "@/components/locale-link";

interface ProUpgradeButtonProps {
  className?: string;
  size?: "sm" | "default" | "lg";
}

export function ProUpgradeButton({
  className,
  size = "sm",
}: ProUpgradeButtonProps) {
  const { dict } = useI18n();

  return (
    <div className="group relative">
      <LocaleLink
        href="/pricing"
        className={cn(
          "relative inline-flex items-center gap-1.5 rounded-md font-semibold text-white shadow-lg transition-all hover:scale-105 hover:shadow-emerald-500/25",
          "bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500",
          "animate-pro-pulse",
          size === "sm" && "px-3 py-1.5 text-xs",
          size === "default" && "px-4 py-2 text-sm",
          size === "lg" && "px-6 py-3 text-base",
          className
        )}
      >
        <Sparkles className="h-3.5 w-3.5" />
        {dict.nav.upgradePro}
      </LocaleLink>

      <div
        role="tooltip"
        className="pointer-events-none absolute right-0 top-full z-50 mt-2 w-56 translate-y-1 rounded-lg border bg-popover px-3 py-2 text-xs text-popover-foreground opacity-0 shadow-lg transition-all group-hover:translate-y-0 group-hover:opacity-100"
      >
        <div className="absolute -top-1 right-6 h-2 w-2 rotate-45 border-l border-t bg-popover" />
        {dict.nav.proTooltip}
      </div>
    </div>
  );
}
