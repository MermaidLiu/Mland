"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { cn } from "@/lib/utils";
import { docsTree, getDocBySlug, getDefaultDoc } from "@/lib/docs";
import { useI18n } from "@/components/i18n-provider";
import { LocaleLink } from "@/components/locale-link";

interface DocsPageContentProps {
  slug?: string;
}

export function DocsPageContent({ slug }: DocsPageContentProps) {
  const { dict } = useI18n();
  const doc = slug ? getDocBySlug(slug) : getDefaultDoc();

  if (!doc) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <nav className="space-y-1">
            <p className="mb-4 text-sm font-semibold">{dict.docs.title}</p>
            {docsTree.map((item) => (
              <LocaleLink
                key={item.slug}
                href={`/docs/${item.slug}`}
                className={cn(
                  "block rounded-md px-3 py-2 text-sm transition-colors",
                  doc.slug === item.slug
                    ? "bg-primary/10 font-medium text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                {item.title}
              </LocaleLink>
            ))}
          </nav>
        </aside>

        <article className="prose-mland min-w-0 rounded-xl border bg-card p-6 md:p-8">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{doc.content}</ReactMarkdown>
        </article>
      </div>
    </div>
  );
}
