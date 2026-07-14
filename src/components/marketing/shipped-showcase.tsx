"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { solutions } from "@/lib/data";
import { useI18n } from "@/components/i18n-provider";
import { LocaleLink } from "@/components/locale-link";

export function ShippedShowcase() {
  const { dict } = useI18n();
  const t = dict.shipped;
  const labels = dict.industries;
  const featured = solutions.filter((s) => s.featured);

  return (
    <section className="border-b py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="section-label mb-4">{t.label}</p>
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{t.title}</h2>
          <p className="mt-4 text-muted-foreground">{t.subtitle}</p>
        </motion.div>

        <div className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-2">
          {featured.map((s, i) => (
            <motion.div
              key={s.slug}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <LocaleLink
                href={`/solution/${s.slug}`}
                className="group flex gap-4 rounded-2xl border bg-card p-4 shadow-sm transition-all hover:border-primary/30 hover:shadow-md"
              >
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl">
                  <Image src={s.coverImage} alt={s.title} fill className="object-cover" />
                </div>
                <div className="min-w-0">
                  <p className="font-semibold group-hover:text-primary">{s.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {s.customerCases[0]} · {labels.labels[s.industry]} ·{" "}
                    {labels.assetTypes[s.assetType]}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {s.techStack.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </LocaleLink>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
