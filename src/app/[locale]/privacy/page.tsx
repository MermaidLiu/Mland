import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isValidLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { PrivacyPageContent } from "@/components/pages/privacy-page-content";

interface PageProps {
  params: { locale: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  if (!isValidLocale(params.locale)) return {};
  const dict = getDictionary(params.locale as Locale);
  return { title: dict.privacy.title };
}

export default function PrivacyPage({ params }: PageProps) {
  if (!isValidLocale(params.locale)) notFound();
  return <PrivacyPageContent />;
}
