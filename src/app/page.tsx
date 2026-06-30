"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { GitBranch, Star, Shield, Code2, Server } from "lucide-react";
import {
  solutions,
  GITHUB_REPO_URL,
  getSolutionsByAssetType,
  type AssetType,
} from "@/lib/data";
import { SolutionCard } from "@/components/solution-card";
import { AssetTypeNav, MlandFactory } from "@/components/home-sections";
import { OpenVsProSection } from "@/components/open-vs-pro-section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const trustBadges = ["长庚医院", "航天中心医院"];

const valueProps = [
  { icon: Shield, label: "专业", desc: "三甲医院私有化交付经验" },
  { icon: Code2, label: "开源", desc: "完整工程化基座 MIT 许可" },
  { icon: Server, label: "可私有化部署", desc: "Docker / K8s 一键拉起" },
];

export default function HomePage() {
  const [activeAssetType, setActiveAssetType] = useState<AssetType | "admin">(
    "agent"
  );

  const filteredSolutions = useMemo(() => {
    if (activeAssetType === "admin") {
      return solutions.filter((s) => s.assetType === "admin");
    }
    return getSolutionsByAssetType(activeAssetType as AssetType);
  }, [activeAssetType]);

  const displaySolutions =
    filteredSolutions.length > 0 ? filteredSolutions : solutions;

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b">
        <div className="absolute inset-0 bg-gradient-to-br from-mland-navy via-background to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />

        <div className="container relative mx-auto px-4 py-24 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-3xl text-center"
          >
            <Badge
              variant="outline"
              className="mb-6 border-primary/30 bg-primary/10 text-primary"
            >
              企业级 AI 智能体解决方案市场
            </Badge>
            <h1 className="text-balance text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
              让每个行业，都拥有
              <span className="bg-gradient-to-r from-primary to-cyan-300 bg-clip-text text-transparent">
                {" "}
                专属的 AI 大脑
              </span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground md:text-xl">
              将复杂的 AI 智能体打包成开箱即用的 Recipe — 代码、配置、文档一应俱全
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <span className="text-sm text-muted-foreground">已服务医院</span>
              {trustBadges.map((hospital) => (
                <Badge
                  key={hospital}
                  className="bg-mland-navy px-4 py-1.5 text-sm text-white dark:bg-primary dark:text-mland-navy"
                >
                  {hospital}
                </Badge>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Button asChild size="lg">
                <a href="/industries">浏览行业方案</a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a
                  href={GITHUB_REPO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GitBranch className="mr-2 h-4 w-4" />
                  GitHub 开源
                </a>
              </Button>
            </div>
          </motion.div>

          {/* Value props */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mt-16 grid max-w-3xl grid-cols-3 gap-4"
          >
            {valueProps.map(({ icon: Icon, label, desc }) => (
              <div
                key={label}
                className="rounded-xl border bg-card/50 p-4 text-center backdrop-blur-sm"
              >
                <Icon className="mx-auto h-6 w-6 text-primary" />
                <p className="mt-2 font-semibold">{label}</p>
                <p className="mt-1 text-xs text-muted-foreground">{desc}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Asset Type Nav */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="mb-8 text-center text-2xl font-bold">选择交付形态</h2>
        <AssetTypeNav active={activeAssetType} onChange={setActiveAssetType} />
      </section>

      {/* Solutions Grid */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-bold">精选解决方案</h2>
              <p className="mt-1 text-muted-foreground">
                来自 GitHub templates 的真实交付案例
              </p>
            </div>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {displaySolutions.map((solution, i) => (
              <motion.div
                key={solution.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <SolutionCard solution={solution} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Source vs Pro Comparison */}
      <OpenVsProSection />

      {/* GitHub Banner */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex flex-col items-center justify-between gap-6 rounded-2xl border bg-gradient-to-r from-mland-navy to-slate-800 p-8 text-white md:flex-row md:p-12"
          >
            <div>
              <h3 className="text-xl font-bold md:text-2xl">
                所有解决方案均开源，可在 GitHub 获取
              </h3>
              <p className="mt-2 text-sm text-slate-300">
                MIT 许可 · 完整工程化基座 · 支持 Fork 定制
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <span className="font-mono text-sm font-semibold">1.2k</span>
              </div>
              <Button asChild variant="secondary">
                <a
                  href={GITHUB_REPO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GitBranch className="mr-2 h-4 w-4" />
                  Star on GitHub
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mland Factory */}
      <MlandFactory />

      {/* CTA */}
      <section className="border-t py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold">30 秒内开始私有化部署</h2>
          <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
            医院信息科主任或企业 CTO — 专业、开源、可私有化部署，三个关键词，一个平台。
          </p>
          <Button asChild size="lg" className="mt-8">
            <a href="mailto:sales@mland.io">联系销售</a>
          </Button>
        </div>
      </section>
    </>
  );
}
