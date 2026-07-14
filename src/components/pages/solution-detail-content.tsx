"use client";

import Image from "next/image";
import type { Solution } from "@/lib/data";
import { ASSET_TYPE_COLORS } from "@/lib/data";
import { SolutionSidebar } from "@/components/solution-sidebar";
import { SolutionDetailTabs } from "@/components/solution-detail-tabs";
import { AgentPlayground } from "@/components/agent-playground";
import { SolutionCard } from "@/components/solution-card";
import { Badge } from "@/components/ui/badge";
import { useI18n } from "@/components/i18n-provider";
import { cn } from "@/lib/utils";

interface SolutionDetailContentProps {
  solution: Solution;
  deployGuide: string;
  related: Solution[];
}

export function SolutionDetailContent({
  solution,
  deployGuide,
  related,
}: SolutionDetailContentProps) {
  const { dict } = useI18n();
  const t = dict.solution;
  const labels = dict.industries;

  return (
    <div className="container mx-auto px-4 py-8">
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
            <Badge variant="outline">{labels.labels[solution.industry]}</Badge>
            <Badge
              variant="outline"
              className={cn("border", ASSET_TYPE_COLORS[solution.assetType])}
            >
              {labels.assetTypes[solution.assetType]}
            </Badge>
            {solution.isPro ? (
              <Badge className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white">
                Pro
              </Badge>
            ) : (
              <Badge variant="outline" className="border-orange-500/30 text-orange-600">
                {t.openSource}
              </Badge>
            )}
          </div>
          <h1 className="text-3xl font-bold md:text-4xl">{solution.title}</h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">{solution.description}</p>
          {solution.customerCases.length > 0 && (
            <p className="mt-3 text-sm">
              {t.served}
              <span className="font-medium text-primary">
                {solution.customerCases.join(dict.industries.listSeparator)}
              </span>
            </p>
          )}
        </div>
      </div>

      {solution.assetType === "agent" && (
        <div className="mb-8">
          <AgentPlayground agentName={solution.title} agentSlug={solution.slug} />
        </div>
      )}

      <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
        <SolutionDetailTabs solution={solution} deployGuide={deployGuide} />
        <aside>
          <SolutionSidebar solution={solution} />
        </aside>
      </div>

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="mb-6 text-xl font-bold">{t.related}</h2>
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
