"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FeatureComparisonTable } from "@/components/feature-comparison-table";
import { DemoUploadZone } from "@/components/demo-upload-zone";
import type { Solution } from "@/lib/data";
import { Badge } from "@/components/ui/badge";

interface SolutionDetailTabsProps {
  solution: Solution;
  deployGuide: string;
}

export function SolutionDetailTabs({
  solution,
  deployGuide,
}: SolutionDetailTabsProps) {
  return (
    <div className="space-y-8">
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">概览</TabsTrigger>
          <TabsTrigger value="tech">技术栈</TabsTrigger>
          <TabsTrigger value="deploy">部署指南</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6 space-y-6">
          <div className="rounded-xl border bg-card p-6">
            <h3 className="mb-3 text-lg font-semibold">方案简介</h3>
            <p className="text-muted-foreground leading-relaxed">
              {solution.longDescription ?? solution.description}
            </p>
            {solution.features.length > 0 && (
              <ul className="mt-6 space-y-3">
                {solution.features.map((f) => (
                  <li key={f.title} className="flex gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    <div>
                      <p className="font-medium">{f.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {f.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="rounded-xl border bg-card p-6">
            <h3 className="mb-2 text-lg font-semibold">Demo 数据上传</h3>
            <p className="mb-4 text-sm text-muted-foreground">
              尝试上传真实医疗文件，体验开源版的安全拦截机制
            </p>
            <DemoUploadZone />
          </div>
        </TabsContent>

        <TabsContent value="tech" className="mt-6">
          <div className="rounded-xl border bg-card p-6">
            <h3 className="mb-4 text-lg font-semibold">技术栈</h3>
            <div className="flex flex-wrap gap-2">
              {solution.techStack.map((tech) => (
                <Badge key={tech} variant="secondary" className="text-sm">
                  {tech}
                </Badge>
              ))}
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg border bg-muted/30 p-4">
                <p className="text-sm font-medium">推理引擎</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  开源版：CPU 推理 · Pro：GPU 加速（A100/V100 集群）
                </p>
              </div>
              <div className="rounded-lg border bg-muted/30 p-4">
                <p className="text-sm font-medium">数据存储</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  开源版：内存临时 · Pro：AES-256 加密持久化卷
                </p>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="deploy" className="mt-6">
          <article className="prose-mland rounded-xl border bg-card p-6 md:p-8">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {deployGuide}
            </ReactMarkdown>
          </article>
        </TabsContent>
      </Tabs>

      {/* Paywall: Feature Comparison */}
      <div className="rounded-xl border bg-card p-6 md:p-8">
        <div className="mb-6">
          <h2 className="text-xl font-bold">功能对比 — 免费 vs Pro</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            清晰界定开源版与 Pro 企业版的边界，保障医疗数据合规
          </p>
        </div>
        <FeatureComparisonTable />
      </div>
    </div>
  );
}
