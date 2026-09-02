"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useI18n } from "@/components/i18n-provider";
import { LocaleLink } from "@/components/locale-link";
import {
  formatPrice,
  PRO_MONTHLY_CNY,
  PRO_MONTHLY_USD,
} from "@/lib/pricing";
import { CONTACT_EMAIL, GITHUB_REPO_URL } from "@/lib/data";

export function PricingPreviewSection() {
  const { locale, dict } = useI18n();
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
      price: formatPrice(locale, PRO_MONTHLY_USD, PRO_MONTHLY_CNY),
      href: "/pricing",
      external: false,
      highlight: true,
    },
    {
      key: "lab" as const,
      price: locale === "zh" ? "¥299" : "$49",
      href: `mailto:${CONTACT_EMAIL}?subject=MedSkill Lab`,
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
            {t.subtitlePrefix}{" "}
            {formatPrice(locale, PRO_MONTHLY_USD, PRO_MONTHLY_CNY)}
            {t.subtitleSuffix}
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
                    ? "border-med-purple/40 shadow-xl shadow-med-purple/10 ring-1 ring-med-purple/20"
                    : "shadow-sm"
                }`}
              >
                {tier.highlight && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-med-purple text-white">
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
                <ul className="mt-6 flex-1 space-y-2.5 text-sm text-muted-foreground">
                  {features.slice(0, 4).map((f) => (
                    <li key={f} className="flex gap-2">
                      <span className="text-med-purple">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Button
                  asChild
                  className={`mt-8 w-full ${tier.highlight ? "bg-med-purple hover:bg-med-purple-dark" : ""}`}
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
