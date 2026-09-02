"use client";

import {
  Check,
  GraduationCap,
  Sparkles,
  Users,
  GitBranch,
  Coins,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ProUpgradeButton } from "@/components/pro-upgrade-button";
import { FeatureComparisonTable } from "@/components/feature-comparison-table";
import { useI18n } from "@/components/i18n-provider";
import { LocaleLink } from "@/components/locale-link";
import {
  COIN_PACKS,
  CUSTOM_PACKAGING_DOWN_USD,
  formatPrice,
  formatCoins,
  LAB_MONTHLY_CNY,
  LAB_MONTHLY_USD,
  PRO_MONTHLY_CNY,
  PRO_MONTHLY_USD,
} from "@/lib/pricing";
import { CONTACT_EMAIL, GITHUB_REPO_URL } from "@/lib/data";

type TierKey = "free" | "pro" | "lab" | "contributor";

const TIER_ICONS = {
  free: GraduationCap,
  pro: Sparkles,
  lab: Users,
  contributor: GitBranch,
} as const;

export function PricingPageContent() {
  const { locale, dict } = useI18n();
  const t = dict.pricing.page;
  const tierMeta = dict.pricing.tiers;

  const tiers: {
    key: TierKey;
    price: string;
    period: string;
    priceNote?: string;
    ctaHref: string;
    external: boolean;
    highlight: boolean;
  }[] = [
    {
      key: "free",
      price: "$0",
      period: tierMeta.free.period,
      ctaHref: GITHUB_REPO_URL,
      external: true,
      highlight: false,
    },
    {
      key: "pro",
      price: formatPrice(locale, PRO_MONTHLY_USD, PRO_MONTHLY_CNY),
      period: tierMeta.pro.period,
      priceNote:
        locale === "zh"
          ? `含 2,000 算力币 / 月 · 约 ¥0.02 / 币`
          : `Includes 2,000 coins/mo · ~$0.003/coin`,
      ctaHref: `mailto:${CONTACT_EMAIL}?subject=MedSkill Pro`,
      external: false,
      highlight: true,
    },
    {
      key: "lab",
      price: formatPrice(locale, LAB_MONTHLY_USD, LAB_MONTHLY_CNY),
      period: tierMeta.lab.period,
      priceNote:
        locale === "zh"
          ? `5 席位 · 共享 10,000 算力币 / 月`
          : `5 seats · 10,000 shared coins/mo`,
      ctaHref: `mailto:${CONTACT_EMAIL}?subject=MedSkill Lab Plan`,
      external: false,
      highlight: false,
    },
    {
      key: "contributor",
      price: locale === "zh" ? "70% 分成" : "70% share",
      period: "",
      priceNote:
        locale === "zh"
          ? `定制封装首付 $${CUSTOM_PACKAGING_DOWN_USD.toLocaleString()} 起`
          : `Custom packaging from $${CUSTOM_PACKAGING_DOWN_USD.toLocaleString()} down`,
      ctaHref: GITHUB_REPO_URL,
      external: true,
      highlight: false,
    },
  ];

  return (
    <div className="pb-20">
      {/* Hero */}
      <section className="border-b bg-gradient-to-b from-med-purple/5 to-background py-16">
        <div className="container mx-auto px-4 text-center">
          <Badge className="mb-4 bg-med-purple/10 text-med-purple">{t.badge}</Badge>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            {t.title}{" "}
            <span className="bg-gradient-to-r from-med-purple to-med-amber bg-clip-text text-transparent">
              {t.titleHighlight}
            </span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">{t.subtitle}</p>
          <div className="mt-6 flex justify-center">
            <ProUpgradeButton size="lg" />
          </div>
        </div>
      </section>

      {/* Tier cards */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {tiers.map((tier) => {
            const Icon = TIER_ICONS[tier.key];
            const meta = tierMeta[tier.key];
            const features = dict.pricing.features[tier.key];

            return (
              <Card
                key={tier.key}
                className={
                  tier.highlight
                    ? "relative border-2 border-med-purple/40 shadow-xl shadow-med-purple/10"
                    : ""
                }
              >
                {tier.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-med-purple to-med-purple-light text-white">
                      {dict.pricing.recommended}
                    </Badge>
                  </div>
                )}
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-2">
                    <Icon
                      className={
                        tier.highlight
                          ? "h-5 w-5 text-med-purple"
                          : "h-5 w-5 text-muted-foreground"
                      }
                    />
                    <span className="text-sm text-muted-foreground">{meta.subtitle}</span>
                  </div>
                  <CardTitle className="text-xl">{meta.name}</CardTitle>
                  <div className="pt-2">
                    <span className="text-3xl font-bold">{tier.price}</span>
                    <span className="text-muted-foreground">{tier.period}</span>
                  </div>
                  {tier.priceNote && (
                    <p className="mt-2 text-xs leading-relaxed text-med-purple dark:text-med-purple-light">
                      {tier.priceNote}
                    </p>
                  )}
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2.5">
                    {features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-med-purple" />
                        <span>{f}</span>
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
                        ? "w-full bg-med-purple text-white hover:bg-med-purple-dark"
                        : "w-full"
                    }
                  >
                    <a
                      href={tier.ctaHref}
                      target={tier.external ? "_blank" : undefined}
                      rel={tier.external ? "noopener noreferrer" : undefined}
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

      {/* Coin packs */}
      <section className="container mx-auto px-4 pb-16">
        <div className="mb-8 text-center">
          <div className="mb-2 flex items-center justify-center gap-2">
            <Coins className="h-5 w-5 text-med-amber" />
            <h2 className="text-2xl font-bold">{dict.pricing.coinPacks.title}</h2>
          </div>
          <p className="text-muted-foreground">{dict.pricing.coinPacks.subtitle}</p>
        </div>
        <div className="mx-auto grid max-w-4xl gap-4 md:grid-cols-3">
          {COIN_PACKS.map((pack, i) => {
            const meta = dict.pricing.coinPacks.packs[i];
            return (
              <Card key={pack.id} className="text-center">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{meta.name}</CardTitle>
                  <p className="text-xs text-muted-foreground">{meta.tagline}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-med-purple">
                    {formatCoins(pack.coins, locale)}
                  </p>
                  <p className="mt-2 text-xl font-semibold">
                    {formatPrice(locale, pack.priceUsd, pack.priceCny)}
                  </p>
                </CardContent>
                <CardFooter className="justify-center">
                  <Button asChild variant="outline" size="sm">
                    <a href={`mailto:${CONTACT_EMAIL}?subject=MedSkill Coins — ${pack.id}`}>
                      {dict.pricing.coinPacks.cta}
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </section>

      {/* SKILL cost table */}
      <section className="container mx-auto px-4 pb-16">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold">{dict.pricing.skillCosts.title}</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {dict.pricing.skillCosts.subtitle}
          </p>
        </div>
        <div className="mx-auto max-w-3xl overflow-hidden rounded-xl border">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-4 py-3 font-semibold">
                  {dict.pricing.skillCosts.columns.skill}
                </th>
                <th className="px-4 py-3 font-semibold">
                  {dict.pricing.skillCosts.columns.category}
                </th>
                <th className="px-4 py-3 text-right font-semibold">
                  {dict.pricing.skillCosts.columns.cost}
                </th>
              </tr>
            </thead>
            <tbody>
              {dict.pricing.skillCosts.rows.map((row) => (
                <tr key={row.skill} className="border-b last:border-0">
                  <td className="px-4 py-3 font-medium">{row.skill}</td>
                  <td className="px-4 py-3 text-muted-foreground">{row.category}</td>
                  <td className="px-4 py-3 text-right font-semibold text-med-purple">
                    {row.cost}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Security notice */}
      <section className="container mx-auto px-4 pb-16">
        <div className="rounded-2xl border border-med-purple/20 bg-med-purple/5 p-8">
          <div className="flex flex-col items-center gap-4 text-center md:flex-row md:text-left">
            <Shield className="h-10 w-10 shrink-0 text-med-purple" />
            <div>
              <h2 className="text-xl font-bold">{t.securityTitle}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{t.securityBody}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison table */}
      <section className="container mx-auto px-4 pb-16">
        <h2 className="mb-6 text-center text-2xl font-bold">{t.comparisonTitle}</h2>
        <FeatureComparisonTable showCta={false} />
      </section>

      {/* Contributor CTA */}
      <section className="container mx-auto px-4 pb-16">
        <div className="rounded-2xl border border-med-amber/30 bg-gradient-to-r from-med-purple/5 to-med-amber/5 p-8 text-center">
          <h2 className="text-xl font-bold">{t.contributorTitle}</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground">
            {t.contributorBody}
          </p>
          <Button asChild className="mt-6 bg-med-purple hover:bg-med-purple-dark">
            <LocaleLink href="/">{t.contributorCta}</LocaleLink>
          </Button>
        </div>
      </section>

      {/* FAQ */}
      <section className="container mx-auto max-w-3xl px-4">
        <h2 className="mb-8 text-center text-2xl font-bold">{t.faqTitle}</h2>
        <div className="space-y-6">
          {dict.pricing.faq.map((item) => (
            <div key={item.q} className="rounded-xl border p-5">
              <h3 className="font-semibold">{item.q}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{item.a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
