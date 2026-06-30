import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { docsTree, getDocBySlug, getDefaultDoc } from "@/lib/docs";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";

interface PageProps {
  params: { slug?: string[] };
}

export function generateStaticParams() {
  return [
    { slug: [] },
    ...docsTree.map((doc) => ({ slug: [doc.slug] })),
  ];
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const slug = params.slug?.[0];
  const doc = slug ? getDocBySlug(slug) : getDefaultDoc();
  return {
    title: doc ? `${doc.title} - 开发者文档` : "开发者文档",
  };
}

export default function DocsPage({ params }: PageProps) {
  const slug = params.slug?.[0];
  const doc = slug ? getDocBySlug(slug) : getDefaultDoc();

  if (!doc) notFound();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <nav className="space-y-1">
            <p className="mb-4 text-sm font-semibold">开发者文档</p>
            {docsTree.map((item) => (
              <Link
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
              </Link>
            ))}
          </nav>
        </aside>

        <article className="prose-mland min-w-0 rounded-xl border bg-card p-6 md:p-8">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {doc.content}
          </ReactMarkdown>
        </article>
      </div>
    </div>
  );
}
