import { notFound } from "next/navigation";
import Image from "next/image";
import {
  getSolutionBySlug,
  getRelatedSolutions,
  INDUSTRY_LABELS,
  ASSET_TYPE_LABELS,
  ASSET_TYPE_COLORS,
  solutions,
} from "@/lib/data";
import { getDeployGuide } from "@/lib/markdown";
import { SolutionSidebar } from "@/components/solution-sidebar";
import { SolutionDetailTabs } from "@/components/solution-detail-tabs";
import { AgentPlayground } from "@/components/agent-playground";
import { SolutionCard } from "@/components/solution-card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return solutions.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const solution = getSolutionBySlug(params.slug);
  if (!solution) return { title: "方案未找到" };
  return {
    title: solution.title,
    description: solution.description,
  };
}

export default function SolutionDetailPage({ params }: PageProps) {
  const solution = getSolutionBySlug(params.slug);
  if (!solution) notFound();

  const deployGuide = getDeployGuide(solution.templatePath);
  const related = getRelatedSolutions(params.slug);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero */}
      <div className="relative mb-8 aspect-[21/9] overflow-hidden rounded-2xl">
        <Image
          src={solution.coverImage}
          alt={solution.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
        <div className="absolute bottom-0 p-6 md:p-10">
          <div className="mb-3 flex flex-wrap gap-2">
            <Badge variant="outline">{INDUSTRY_LABELS[solution.industry]}</Badge>
            <Badge
              variant="outline"
              className={cn("border", ASSET_TYPE_COLORS[solution.assetType])}
            >
              {ASSET_TYPE_LABELS[solution.assetType]}
            </Badge>
            {solution.isPro ? (
              <Badge className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white">
                Pro
              </Badge>
            ) : (
              <Badge variant="outline" className="border-orange-500/30 text-orange-600">
                开源免费版
              </Badge>
            )}
          </div>
          <h1 className="text-3xl font-bold md:text-4xl">{solution.title}</h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            {solution.description}
          </p>
          {solution.customerCases.length > 0 && (
            <p className="mt-3 text-sm">
              已服务：
              <span className="font-medium text-primary">
                {solution.customerCases.join("、")}
              </span>
            </p>
          )}
        </div>
      </div>

      {/* Agent Playground */}
      {solution.assetType === "agent" && (
        <div className="mb-8">
          <AgentPlayground agentName={solution.title} agentSlug={solution.slug} />
        </div>
      )}

      {/* Main content + Sidebar */}
      <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
        <SolutionDetailTabs solution={solution} deployGuide={deployGuide} />
        <aside>
          <SolutionSidebar solution={solution} />
        </aside>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="mb-6 text-xl font-bold">同行业方案推荐</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((s) => (
              <SolutionCard key={s.slug} solution={s} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
