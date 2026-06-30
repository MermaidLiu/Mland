"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  solutions,
  getSolutionsByIndustry,
  INDUSTRY_LABELS,
  type Industry,
} from "@/lib/data";
import { SolutionCard } from "@/components/solution-card";
import { cn } from "@/lib/utils";

const industries: Industry[] = [
  "medical",
  "finance",
  "manufacturing",
  "education",
];

export default function IndustriesPage() {
  const [activeIndustry, setActiveIndustry] = useState<Industry>("medical");

  const filtered = getSolutionsByIndustry(activeIndustry);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-3xl font-bold md:text-4xl">行业解决方案</h1>
        <p className="mt-4 text-muted-foreground">
          按行业浏览经过验证的 AI 解决方案，医疗行业案例已置顶展示
        </p>
      </div>

      <div className="mt-10 flex flex-wrap justify-center gap-2">
        {industries.map((industry) => (
          <button
            key={industry}
            onClick={() => setActiveIndustry(industry)}
            className={cn(
              "rounded-full border px-5 py-2 text-sm font-medium transition-all",
              activeIndustry === industry
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card hover:border-primary/50"
            )}
          >
            {INDUSTRY_LABELS[industry]}
          </button>
        ))}
      </div>

      <div className="mt-12">
        {filtered.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((solution, i) => (
              <motion.div
                key={solution.slug}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.08 }}
              >
                <SolutionCard solution={solution} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="rounded-xl border bg-muted/30 py-16 text-center">
            <p className="text-muted-foreground">
              {INDUSTRY_LABELS[activeIndustry]}行业方案即将上线
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              已有 {solutions.filter((s) => s.industry === "medical").length}{" "}
              个医疗案例可供参考，欢迎
              <a href="mailto:sales@mland.io" className="text-primary hover:underline">
                {" "}
                联系我们{" "}
              </a>
              定制 {INDUSTRY_LABELS[activeIndustry]} 方案
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
