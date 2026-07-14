"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useI18n } from "@/components/i18n-provider";
import { CONTACT_EMAIL } from "@/lib/data";

export function CustomDeploymentSection() {
  const { dict } = useI18n();
  const t = dict.services;

  return (
    <section id="services" className="border-b bg-muted/20 py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="section-label mb-4">{t.label}</p>
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{t.title}</h2>
          <p className="mt-4 text-lg text-muted-foreground">{t.subtitle}</p>
        </motion.div>

        <div className="mx-auto mt-14 grid max-w-5xl gap-6 lg:grid-cols-3">
          {t.plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className={`relative flex flex-col rounded-2xl border bg-card p-6 shadow-sm ${
                i === 1 ? "border-primary/40 ring-2 ring-primary/20" : ""
              }`}
            >
              {i === 1 && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground">
                  {t.popular}
                </Badge>
              )}
              <h3 className="text-xl font-bold">{plan.name}</h3>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-3xl font-bold">{plan.price}</span>
                <span className="text-sm text-muted-foreground">{plan.duration}</span>
              </div>
              <ul className="mt-6 flex-1 space-y-3 text-sm text-muted-foreground">
                {plan.features.map((f) => (
                  <li key={f} className="flex gap-2">
                    <span className="text-primary">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <Button asChild className="mt-8 w-full" variant={i === 1 ? "default" : "outline"}>
                <a href={`mailto:${CONTACT_EMAIL}`}>{t.emailUs}</a>
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
