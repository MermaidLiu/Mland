import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getSolutionBySlug,
  getRelatedSolutions,
  solutions,
} from "@/lib/data";
import { getDeployGuide } from "@/lib/markdown";
import { isValidLocale, locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { SolutionDetailContent } from "@/components/pages/solution-detail-content";

interface PageProps {
  params: { locale: string; slug: string };
}

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    solutions.map((s) => ({ locale, slug: s.slug }))
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  if (!isValidLocale(params.locale)) return {};
  const dict = getDictionary(params.locale as Locale);
  const solution = getSolutionBySlug(params.slug);
  if (!solution) return { title: dict.solution.notFound };
  return {
    title: solution.title,
    description: solution.description,
  };
}

export default function SolutionDetailPage({ params }: PageProps) {
  if (!isValidLocale(params.locale)) notFound();

  const solution = getSolutionBySlug(params.slug);
  if (!solution) notFound();

  const deployGuide = getDeployGuide(solution.templatePath);
  const related = getRelatedSolutions(params.slug);

  return (
    <SolutionDetailContent
      solution={solution}
      deployGuide={deployGuide}
      related={related}
    />
  );
}
