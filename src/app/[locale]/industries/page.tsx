import type { Metadata } from "next";
import { isValidLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { IndustriesPageContent } from "@/components/pages/industries-page-content";

interface PageProps {
  params: { locale: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  if (!isValidLocale(params.locale)) return {};
  const dict = getDictionary(params.locale as Locale);
  return {
    title: dict.industries.title,
    description: dict.industries.subtitle,
  };
}

export default function IndustriesPage() {
  return <IndustriesPageContent />;
}
