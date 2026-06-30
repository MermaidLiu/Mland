import type { Metadata } from "next";
import Link from "next/link";
import { Check, X, Sparkles, Building2, Code2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ProUpgradeButton } from "@/components/pro-upgrade-button";
import { FeatureComparisonTable } from "@/components/feature-comparison-table";

export const metadata: Metadata = {
  title: "定价",
  description:
    "Mland Pro 定价 — 从免费开源到企业私有化部署，按量付费，数据绝对不出院。",
};

const tiers = [
  {
    name: "开发者",
    tier: "Free",
    price: "$0",
    period: "/ 月",
    icon: Code2,
    description: "适合学习、PoC 与社区贡献",
    features: [
      { text: "GitHub 全部源码 (MIT)", included: true },
      { text: "社区 Issue 支持", included: true },
      { text: "模拟演示数据 (10 条)", included: true },
      { text: "CPU 推理体验", included: true },
      { text: "真实患者数据上传", included: false },
      { text: "HIS/LIS 系统对接", included: false },
      { text: "数据永久留存", included: false },
    ],
    cta: "GitHub 开源",
    ctaHref: "https://github.com/MermaidLiu/Mland",
    ctaVariant: "outline" as const,
    highlight: false,
  },
  {
    name: "专业版",
    tier: "Pro",
    price: "联系销售",
    period: "",
    icon: Sparkles,
    description: "真实医疗数据 + GPU 加速 + 加密存储",
    priceNote: "按实际数据存储量（GB/月）计费，用多少付多少，绝不浪费。",
    features: [
      { text: "真实影像/化验单上传", included: true },
      { text: "AES-256 加密持久化存储", included: true },
      { text: "GPU 推理加速", included: true },
      { text: "邮件 + 工单支持", included: true },
      { text: "Docker 私有化部署", included: true },
      { text: "K8s 高可用 (可选)", included: true },
      { text: "7×24 专属工程师", included: false },
    ],
    cta: "联系销售获取报价",
    ctaHref: "mailto:sales@mland.io?subject=Mland Pro 报价",
    ctaVariant: "default" as const,
    highlight: true,
  },
  {
    name: "企业版",
    tier: "Enterprise",
    price: "￥面议",
    period: "",
    icon: Building2,
    description: "三甲医院及涉密单位专属方案",
    priceNote: "适用于三甲医院及涉密单位，数据绝对不出院。",
    features: [
      { text: "私有化部署 (院内机房)", included: true },
      { text: "源码级二次开发", included: true },
      { text: "现场实施与培训", included: true },
      { text: "信创适配 (国产 OS/芯片)", included: true },
      { text: "Hospital Adapter 定制", included: true },
      { text: "7×24 专属工程师对接", included: true },
      { text: "等保 / 合规审计支持", included: true },
    ],
    cta: "预约企业方案咨询",
    ctaHref: "mailto:sales@mland.io?subject=Mland Enterprise 企业版咨询",
    ctaVariant: "outline" as const,
    highlight: false,
  },
];

export default function PricingPage() {
  return (
    <div className="pb-20">
      {/* Hero */}
      <section className="border-b bg-gradient-to-b from-emerald-500/5 to-background py-16">
        <div className="container mx-auto px-4 text-center">
          <Badge className="mb-4 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            数据安全 · 按量付费 · 私有化部署
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            选择适合您的{" "}
            <span className="bg-gradient-to-r from-emerald-500 to-cyan-500 bg-clip-text text-transparent">
              Mland 方案
            </span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            开源版仅供学习与 PoC；生产环境真实医疗数据，必须 Pro 或 Enterprise
          </p>
          <div className="mt-6 flex justify-center">
            <ProUpgradeButton size="lg" />
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid gap-8 lg:grid-cols-3">
          {tiers.map((tier) => {
            const Icon = tier.icon;
            return (
              <Card
                key={tier.tier}
                className={
                  tier.highlight
                    ? "relative border-2 border-emerald-500/40 shadow-xl shadow-emerald-500/10"
                    : ""
                }
              >
                {tier.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white">
                      最受欢迎
                    </Badge>
                  </div>
                )}
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-2">
                    <Icon
                      className={
                        tier.highlight
                          ? "h-5 w-5 text-emerald-500"
                          : "h-5 w-5 text-muted-foreground"
                      }
                    />
                    <span className="text-sm text-muted-foreground">
                      {tier.tier}
                    </span>
                  </div>
                  <CardTitle className="text-2xl">{tier.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {tier.description}
                  </p>
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
                    {tier.features.map((f) => (
                      <li key={f.text} className="flex items-start gap-2 text-sm">
                        {f.included ? (
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                        ) : (
                          <X className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground/50" />
                        )}
                        <span
                          className={
                            !f.included ? "text-muted-foreground/60" : ""
                          }
                        >
                          {f.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    asChild
                    variant={tier.ctaVariant}
                    className={
                      tier.highlight
                        ? "w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:from-emerald-600 hover:to-teal-600"
                        : "w-full"
                    }
                  >
                    <Link
                      href={tier.ctaHref}
                      target={tier.ctaHref.startsWith("http") ? "_blank" : undefined}
                      rel={
                        tier.ctaHref.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                    >
                      {tier.cta}
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Security messaging */}
      <section className="container mx-auto px-4">
        <div className="rounded-2xl border border-orange-500/20 bg-orange-500/5 p-8 text-center">
          <h2 className="text-xl font-bold text-orange-700 dark:text-orange-300">
            为什么医院不能用开源版处理真实数据？
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground">
            开源版数据 24 小时自动清除、重启即焚、无加密保障 — 不符合《个人信息保护法》和医疗数据合规要求。
            Pro / Enterprise 提供 AES-256 加密、持久化卷、院内私有化部署，确保数据绝对不出院。
          </p>
        </div>
      </section>

      {/* Full comparison table */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="mb-6 text-center text-2xl font-bold">完整功能对比</h2>
        <FeatureComparisonTable showCta={false} />
      </section>
    </div>
  );
}
