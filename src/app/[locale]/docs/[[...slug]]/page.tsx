import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { docsTree, getDocBySlug, getDefaultDoc } from "@/lib/docs";
import { isValidLocale, locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { DocsPageContent } from "@/components/pages/docs-page-content";

interface PageProps {
  params: { locale: string; slug?: string[] };
}

export function generateStaticParams() {
  const docParams = [{ slug: [] as string[] }, ...docsTree.map((doc) => ({ slug: [doc.slug] }))];
  return locales.flatMap((locale) =>
    docParams.map((item) => ({ locale, slug: item.slug }))
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  if (!isValidLocale(params.locale)) return {};
  const dict = getDictionary(params.locale as Locale);
  const slug = params.slug?.[0];
  const doc = slug ? getDocBySlug(slug) : getDefaultDoc();
  return {
    title: doc ? `${doc.title}${dict.docs.suffix}` : dict.docs.title,
  };
}

export default function DocsPage({ params }: PageProps) {
  if (!isValidLocale(params.locale)) notFound();

  const slug = params.slug?.[0];
  const doc = slug ? getDocBySlug(slug) : getDefaultDoc();
  if (!doc) notFound();

  return <DocsPageContent slug={slug} />;
}
