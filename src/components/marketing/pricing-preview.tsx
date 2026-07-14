"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useI18n } from "@/components/i18n-provider";
import { LocaleLink } from "@/components/locale-link";
import { PRO_PRICE_LABEL, PRO_PRICE_NOTE, formatProMonthlyEstimate } from "@/lib/pricing";
import { CONTACT_EMAIL, GITHUB_REPO_URL } from "@/lib/data";

export function PricingPreviewSection() {
  const { dict } = useI18n();
  const t = dict.pricing;

  const tiers = [
    {
      key: "free" as const,
      price: "$0",
      href: GITHUB_REPO_URL,
      external: true,
      highlight: false,
    },
    {
      key: "pro" as const,
      price: PRO_PRICE_LABEL,
      href: "/pricing",
      external: false,
      highlight: true,
      note: PRO_PRICE_NOTE,
    },
    {
      key: "enterprise" as const,
      price: "Custom",
      href: `mailto:${CONTACT_EMAIL}`,
      external: true,
      highlight: false,
    },
  ];

  return (
    <section id="pricing" className="border-b bg-muted/20 py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="section-label mb-4">{t.label}</p>
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{t.title}</h2>
          <p className="mt-4 text-muted-foreground">
            {t.subtitlePrefix} {PRO_PRICE_LABEL} {t.subtitleSuffix}{" "}
            {formatProMonthlyEstimate(10000)}/mo.
          </p>
        </motion.div>

        <div className="mx-auto mt-14 grid max-w-5xl gap-6 lg:grid-cols-3">
          {tiers.map((tier, i) => {
            const meta = t.tiers[tier.key];
            const features = t.features[tier.key];
            return (
              <motion.div
                key={tier.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className={`relative flex flex-col rounded-2xl border bg-card p-6 ${
                  tier.highlight
                    ? "border-emerald-500/40 shadow-xl shadow-emerald-500/10 ring-1 ring-emerald-500/20"
                    : "shadow-sm"
                }`}
              >
                {tier.highlight && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-500 text-white">
                    {t.recommended}
                  </Badge>
                )}
                <p className="text-sm text-muted-foreground">{meta.subtitle}</p>
                <h3 className="mt-1 text-2xl font-bold">{meta.name}</h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-bold">{tier.price}</span>
                  {meta.period && (
                    <span className="text-muted-foreground">{meta.period}</span>
                  )}
                </div>
                {"note" in tier && tier.note && (
                  <p className="mt-2 text-xs text-emerald-600 dark:text-emerald-400">
                    {tier.note}
                  </p>
                )}
                <ul className="mt-6 flex-1 space-y-2.5 text-sm text-muted-foreground">
                  {features.map((f) => (
                    <li key={f} className="flex gap-2">
                      <span className="text-emerald-500">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Button
                  asChild
                  className={`mt-8 w-full ${tier.highlight ? "bg-emerald-500 hover:bg-emerald-600" : ""}`}
                  variant={tier.highlight ? "default" : "outline"}
                >
                  {tier.external ? (
                    <a
                      href={tier.href}
                      target={tier.href.startsWith("http") ? "_blank" : undefined}
                      rel={tier.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    >
                      {meta.cta}
                    </a>
                  ) : (
                    <LocaleLink href={tier.href}>{meta.cta}</LocaleLink>
                  )}
                </Button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
