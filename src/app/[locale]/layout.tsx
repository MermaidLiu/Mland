import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getDictionary } from "@/i18n/get-dictionary";
import { isValidLocale, locales, type Locale } from "@/i18n/config";
import { LocaleLayoutClient } from "@/components/locale-layout-client";

interface LayoutProps {
  children: React.ReactNode;
  params: { locale: string };
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LayoutProps): Promise<Metadata> {
  if (!isValidLocale(params.locale)) return {};
  const dict = getDictionary(params.locale as Locale);
  return {
    title: {
      default: "MedSkill 广场 — 医学生科研 SKILL 开放平台",
      template: `%s | MedSkill 广场`,
    },
    description:
      dict.meta.description ||
      "医学生专用科研 SKILL 广场：脱敏上传、智能匹配开源工具、一键生成 SCI 图表。",
  };
}

export default function LocaleLayout({ children, params }: LayoutProps) {
  if (!isValidLocale(params.locale)) notFound();

  const locale = params.locale as Locale;
  const dict = getDictionary(locale);

  return (
    <LocaleLayoutClient locale={locale} dict={dict}>
      {children}
    </LocaleLayoutClient>
  );
}
