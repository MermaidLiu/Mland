"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CopyCommand } from "@/components/copy-command";
import { useI18n } from "@/components/i18n-provider";

const HERO_CMD = "npx mland-cli add pmp-agent --hospital=航天中心医院";

export function HeroSection() {
  const { dict } = useI18n();
  const t = dict.hero;

  return (
    <section className="relative overflow-hidden border-b bg-grid">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />

      <div className="container relative mx-auto px-4 pb-16 pt-20 md:pb-24 md:pt-28">
        <div className="mx-auto max-w-4xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="section-label mb-6"
          >
            {t.label}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="text-balance text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl"
          >
            {t.title1}
            <br />
            <span className="bg-gradient-to-r from-primary via-cyan-500 to-emerald-500 bg-clip-text text-transparent">
              {t.title2}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl"
          >
            {t.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mx-auto mt-10 max-w-xl"
          >
            <div className="rounded-2xl border bg-card p-1 shadow-lg shadow-primary/5">
              <CopyCommand
                command={HERO_CMD}
                showPrompt
                className="rounded-xl border-0 bg-muted/40 px-4 py-3.5 font-mono text-sm"
              />
            </div>
            <p className="mt-4 text-sm text-muted-foreground">{t.cmdHint}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 flex flex-wrap items-center justify-center gap-2 text-sm"
          >
            <span className="text-muted-foreground">{t.hospitalsServed}</span>
            {dict.common.hospitals.map((h) => (
              <span
                key={h}
                className="rounded-full border bg-card px-3 py-1 font-medium shadow-sm"
              >
                {h}
              </span>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="relative mx-auto mt-16 max-w-5xl"
        >
          <div className="overflow-hidden rounded-2xl border bg-card shadow-2xl shadow-black/10 ring-1 ring-black/5 dark:shadow-black/40">
            <Image
              src="/assets/pmp-platform-hero.png"
              alt={t.imageAlt}
              width={1200}
              height={675}
              className="w-full object-cover"
              priority
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
