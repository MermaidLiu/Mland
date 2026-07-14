"use client";

import { usePathname, useRouter } from "next/navigation";
import { locales, stripLocale, type Locale } from "@/i18n/config";
import { cn } from "@/lib/utils";

export function LocaleSwitcher({ className }: { className?: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const current = (pathname.split("/")[1] as Locale) || "en";
  const basePath = stripLocale(pathname);

  function switchLocale(locale: Locale) {
    const next = locale === "en" && basePath === "/" ? "/en" : `/${locale}${basePath === "/" ? "" : basePath}`;
    document.cookie = `NEXT_LOCALE=${locale};path=/;max-age=31536000`;
    router.push(next);
  }

  return (
    <div
      className={cn(
        "flex items-center rounded-lg border bg-muted/50 p-0.5 text-xs font-medium",
        className
      )}
    >
      {locales.map((locale) => (
        <button
          key={locale}
          type="button"
          onClick={() => switchLocale(locale)}
          className={cn(
            "rounded-md px-2.5 py-1 transition-colors",
            current === locale
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {locale === "en" ? "EN" : "中文"}
        </button>
      ))}
    </div>
  );
}
