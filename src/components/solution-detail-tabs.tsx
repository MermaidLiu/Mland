"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FeatureComparisonTable } from "@/components/feature-comparison-table";
import { DemoUploadZone } from "@/components/demo-upload-zone";
import type { Solution } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { useI18n } from "@/components/i18n-provider";

interface SolutionDetailTabsProps {
  solution: Solution;
  deployGuide: string;
}

export function SolutionDetailTabs({
  solution,
  deployGuide,
}: SolutionDetailTabsProps) {
  const { dict } = useI18n();
  const t = dict.solution;

  return (
    <div className="space-y-8">
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">{t.tabs.overview}</TabsTrigger>
          <TabsTrigger value="tech">{t.tabs.tech}</TabsTrigger>
          <TabsTrigger value="deploy">{t.tabs.deploy}</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6 space-y-6">
          <div className="rounded-xl border bg-card p-6">
            <h3 className="mb-3 text-lg font-semibold">{t.overview.title}</h3>
            <p className="leading-relaxed text-muted-foreground">
              {solution.longDescription ?? solution.description}
            </p>
            {solution.features.length > 0 && (
              <ul className="mt-6 space-y-3">
                {solution.features.map((f) => (
                  <li key={f.title} className="flex gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    <div>
                      <p className="font-medium">{f.title}</p>
                      <p className="text-sm text-muted-foreground">{f.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="rounded-xl border bg-card p-6">
            <h3 className="mb-2 text-lg font-semibold">{t.overview.demoTitle}</h3>
            <p className="mb-4 text-sm text-muted-foreground">{t.overview.demoDesc}</p>
            <DemoUploadZone />
          </div>
        </TabsContent>

        <TabsContent value="tech" className="mt-6">
          <div className="rounded-xl border bg-card p-6">
            <h3 className="mb-4 text-lg font-semibold">{t.tech.title}</h3>
            <div className="flex flex-wrap gap-2">
              {solution.techStack.map((tech) => (
                <Badge key={tech} variant="secondary" className="text-sm">
                  {tech}
                </Badge>
              ))}
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg border bg-muted/30 p-4">
                <p className="text-sm font-medium">{t.tech.inference}</p>
                <p className="mt-1 text-xs text-muted-foreground">{t.tech.inferenceFree}</p>
              </div>
              <div className="rounded-lg border bg-muted/30 p-4">
                <p className="text-sm font-medium">{t.tech.storage}</p>
                <p className="mt-1 text-xs text-muted-foreground">{t.tech.storageFree}</p>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="deploy" className="mt-6">
          <article className="prose-mland rounded-xl border bg-card p-6 md:p-8">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{deployGuide}</ReactMarkdown>
          </article>
        </TabsContent>
      </Tabs>

      <div className="rounded-xl border bg-card p-6 md:p-8">
        <div className="mb-6">
          <h2 className="text-xl font-bold">{t.comparison.title}</h2>
          <p className="mt-1 text-sm text-muted-foreground">{t.comparison.subtitle}</p>
        </div>
        <FeatureComparisonTable />
      </div>
    </div>
  );
}
