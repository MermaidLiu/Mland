"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { ThemeProvider } from "@/components/theme-provider";
import { I18nProvider } from "@/components/i18n-provider";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import type { Dictionary } from "@/i18n/dictionaries/en";
import type { Locale } from "@/i18n/config";
import { stripLocale } from "@/i18n/config";

function LocaleHtmlLang({ locale }: { locale: Locale }) {
  useEffect(() => {
    document.documentElement.lang = locale === "zh" ? "zh-CN" : "en";
  }, [locale]);
  return null;
}

interface LocaleLayoutClientProps {
  children: React.ReactNode;
  locale: Locale;
  dict: Dictionary;
}

export function LocaleLayoutClient({ children, locale, dict }: LocaleLayoutClientProps) {
  const pathname = usePathname();
  const isPlazaHome = stripLocale(pathname) === "/";

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
      <I18nProvider locale={locale} dict={dict}>
        <LocaleHtmlLang locale={locale} />
        {isPlazaHome ? (
          children
        ) : (
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        )}
      </I18nProvider>
    </ThemeProvider>
  );
}
