import type { Metadata } from "next";
import { isValidLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { PricingPageContent } from "@/components/pages/pricing-page-content";

interface PageProps {
  params: { locale: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  if (!isValidLocale(params.locale)) return {};
  const dict = getDictionary(params.locale as Locale);
  return {
    title: dict.nav.pricing,
    description: dict.meta.description,
  };
}

export default function PricingPage() {
  return <PricingPageContent />;
}
