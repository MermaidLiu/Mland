"use client";

import { Check, X, Sparkles, Building2, Code2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ProUpgradeButton } from "@/components/pro-upgrade-button";
import { FeatureComparisonTable } from "@/components/feature-comparison-table";
import { useI18n } from "@/components/i18n-provider";
import {
  PRO_PRICE_LABEL,
  PRO_PRICE_NOTE,
  PRO_PRICE_NOTE_ZH,
  PRO_PRICE_PER_CASE_USD,
  formatProMonthlyEstimate,
} from "@/lib/pricing";
import { CONTACT_EMAIL, GITHUB_REPO_URL } from "@/lib/data";

export function PricingPageContent() {
  const { locale, dict } = useI18n();
  const t = dict.pricing.page;
  const priceNote = locale === "zh" ? PRO_PRICE_NOTE_ZH : PRO_PRICE_NOTE;

  const tiers = [
    {
      key: "free" as const,
      icon: Code2,
      price: "$0",
      period: locale === "zh" ? "/ 月" : "/ mo",
      ctaHref: GITHUB_REPO_URL,
      highlight: false,
      included: [true, true, true, true, false, false, false],
    },
    {
      key: "pro" as const,
      icon: Sparkles,
      price: PRO_PRICE_LABEL,
      period: locale === "zh" ? " / 病例" : " / case",
      priceNote: `${priceNote}${locale === "zh" ? `（例：1 万例/月 ≈ ${formatProMonthlyEstimate(10000)}）` : ` (e.g. 10k cases ≈ ${formatProMonthlyEstimate(10000)}/mo)`}`,
      ctaHref: `mailto:${CONTACT_EMAIL}?subject=Mland Pro — ${PRO_PRICE_PER_CASE_USD}/case`,
      highlight: true,
      included: [true, true, true, true, true, true, false],
    },
    {
      key: "enterprise" as const,
      icon: Building2,
      price: locale === "zh" ? "￥面议" : "Custom",
      period: "",
      priceNote:
        locale === "zh"
          ? "适用于三甲医院及涉密单位，数据绝对不出院。"
          : "For tier-3 hospitals — data never leaves your building.",
      ctaHref: `mailto:${CONTACT_EMAIL}?subject=Mland Enterprise`,
      highlight: false,
      included: [true, true, true, true, true, true, true],
    },
  ];

  const tierMeta = dict.pricing.tiers;

  // Build feature lists per tier from dict
  const featureLists = {
    free: [
      ...dict.pricing.features.free,
      locale === "zh" ? "真实患者数据上传" : "Real patient data upload",
      locale === "zh" ? "HIS/LIS 系统对接" : "HIS/LIS integration",
      locale === "zh" ? "数据永久留存" : "Persistent data storage",
    ].map((text, i) => ({ text, included: tiers[0].included[i] ?? false })),
    pro: [
      ...dict.pricing.features.pro,
      locale === "zh" ? "7×24 专属工程师" : "24/7 dedicated engineers",
    ].map((text, i) => ({ text, included: i < 6 ? true : false })),
    enterprise: dict.pricing.features.enterprise.map((text) => ({
      text,
      included: true,
    })),
  };

  return (
    <div className="pb-20">
      <section className="border-b bg-gradient-to-b from-emerald-500/5 to-background py-16">
        <div className="container mx-auto px-4 text-center">
          <Badge className="mb-4 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            {dict.pricing.page.badge}
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            {t.title}{" "}
            <span className="bg-gradient-to-r from-emerald-500 to-cyan-500 bg-clip-text text-transparent">
              {t.titleHighlight}
            </span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">{t.subtitle}</p>
          <div className="mt-6 flex justify-center">
            <ProUpgradeButton size="lg" />
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="grid gap-8 lg:grid-cols-3">
          {tiers.map((tier) => {
            const Icon = tier.icon;
            const meta = tierMeta[tier.key];
            const features =
              tier.key === "free"
                ? featureLists.free
                : tier.key === "pro"
                  ? featureLists.pro
                  : featureLists.enterprise;

            return (
              <Card
                key={tier.key}
                className={
                  tier.highlight
                    ? "relative border-2 border-emerald-500/40 shadow-xl shadow-emerald-500/10"
                    : ""
                }
              >
                {tier.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white">
                      {dict.pricing.recommended}
                    </Badge>
                  </div>
                )}
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-2">
                    <Icon
                      className={
                        tier.highlight ? "h-5 w-5 text-emerald-500" : "h-5 w-5 text-muted-foreground"
                      }
                    />
                    <span className="text-sm text-muted-foreground">{meta.subtitle}</span>
                  </div>
                  <CardTitle className="text-2xl">{meta.name}</CardTitle>
                  <div className="pt-2">
                    <span className="text-4xl font-bold">{tier.price}</span>
                    <span className="text-muted-foreground">{tier.period}</span>
                  </div>
                  {tier.priceNote && (
                    <p className="mt-2 text-xs leading-relaxed text-emerald-600 dark:text-emerald-400">
                      {tier.priceNote}
                    </p>
                  )}
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {features.map((f) => (
                      <li key={f.text} className="flex items-start gap-2 text-sm">
                        {f.included ? (
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                        ) : (
                          <X className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground/50" />
                        )}
                        <span className={!f.included ? "text-muted-foreground/60" : ""}>
                          {f.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    asChild
                    variant={tier.highlight ? "default" : "outline"}
                    className={
                      tier.highlight
                        ? "w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:from-emerald-600 hover:to-teal-600"
                        : "w-full"
                    }
                  >
                    <a
                      href={tier.ctaHref}
                      target={tier.ctaHref.startsWith("http") ? "_blank" : undefined}
                      rel={tier.ctaHref.startsWith("http") ? "noopener noreferrer" : undefined}
                    >
                      {meta.cta}
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="container mx-auto px-4">
        <div className="rounded-2xl border border-orange-500/20 bg-orange-500/5 p-8 text-center">
          <h2 className="text-xl font-bold text-orange-700 dark:text-orange-300">
            {t.securityTitle}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground">{t.securityBody}</p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <h2 className="mb-6 text-center text-2xl font-bold">{t.comparisonTitle}</h2>
        <FeatureComparisonTable showCta={false} />
      </section>
    </div>
  );
}
