"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  solutions,
  getSolutionsByIndustry,
  type Industry,
} from "@/lib/data";
import { SolutionCard } from "@/components/solution-card";
import { useI18n } from "@/components/i18n-provider";
import { CONTACT_EMAIL } from "@/lib/data";
import { cn } from "@/lib/utils";

const industries: Industry[] = [
  "medical",
  "finance",
  "manufacturing",
  "education",
];

export function IndustriesPageContent() {
  const { dict } = useI18n();
  const t = dict.industries;
  const [activeIndustry, setActiveIndustry] = useState<Industry>("medical");
  const filtered = getSolutionsByIndustry(activeIndustry);
  const medicalCount = solutions.filter((s) => s.industry === "medical").length;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-3xl font-bold md:text-4xl">{t.title}</h1>
        <p className="mt-4 text-muted-foreground">{t.subtitle}</p>
      </div>

      <div className="mt-10 flex flex-wrap justify-center gap-2">
        {industries.map((industry) => (
          <button
            key={industry}
            type="button"
            onClick={() => setActiveIndustry(industry)}
            className={cn(
              "rounded-full border px-5 py-2 text-sm font-medium transition-all",
              activeIndustry === industry
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card hover:border-primary/50"
            )}
          >
            {t.labels[industry]}
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
              {t.labels[activeIndustry]} — {t.comingSoon}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              {t.medicalCountPrefix} {medicalCount} {t.medicalCountSuffix}{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary hover:underline">
                {t.contactUs}
              </a>{" "}
              {t.emptyContact} {t.labels[activeIndustry]} {t.emptySolution}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
