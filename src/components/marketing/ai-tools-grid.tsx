"use client";

import { motion } from "framer-motion";
import { useI18n } from "@/components/i18n-provider";

const tools = [
  "Claude Code",
  "Cursor",
  "GitHub Copilot",
  "Gemini",
  "Windsurf",
  "ChatGPT",
  "DeepSeek",
  "Qwen",
  "Kimi",
  "VS Code",
];

export function AiToolsGrid() {
  const { dict } = useI18n();
  const t = dict.tools;

  return (
    <section className="border-b py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            {t.title}
            <br />
            <span className="text-muted-foreground">{t.subtitle}</span>
          </h2>
        </motion.div>

        <div className="mx-auto mt-12 grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
          {tools.map((tool, i) => (
            <motion.div
              key={tool}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              className="flex items-center justify-center rounded-xl border bg-card px-4 py-5 text-sm font-medium shadow-sm transition-shadow hover:shadow-md"
            >
              {tool}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
