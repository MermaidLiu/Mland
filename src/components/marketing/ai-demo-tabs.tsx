"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useI18n } from "@/components/i18n-provider";

const demos = {
  deploy: {
    chat: [
      "You: Deploy PMP agent for Aerospace Center Hospital",
      "",
      "Claude: I'll use Mland MCP to deploy.",
      "",
      ' > deploy_solution("pmp-agent", env="docker")',
      "",
      " Running: docker compose up -d",
      " ✓ Agent ready at http://localhost:8080",
    ],
    code: `import { HospitalAdapter } from "@mland/core";
import { ReActAgent, pmpCalculatorTool } from "@mland/agent";

const adapter = new HospitalAdapter({
  hospitalName: "航天中心医院",
  endpoint: process.env.HIS_API_ENDPOINT!,
});`,
  },
  translate: {
    chat: [
      "You: Add medical translation for Chang Gung Hospital",
      "",
      "Claude: Searching Mland blueprints...",
      "",
      ' > get_solution("medical-translation")',
      "",
      " Found: 中英/中日/中韩实时翻译",
      " ✓ medical-translation/ created",
    ],
    code: `npx mland-cli add medical-translation \\
  --hospital=长庚医院`,
  },
  explore: {
    chat: [
      "You: What blueprints do you have?",
      "",
      "Claude: Here's the Mland catalog:",
      "",
      " Medical (2)  translation, pmp-agent",
      " Manufacturing (1)  inspection",
      "",
      ' Say "add <slug>" to get started.',
    ],
    code: `list_solutions({ industry: "医疗" })
get_solution("pmp-agent")
deploy_solution("pmp-agent", { env: "k8s" })`,
  },
};

export function AiDemoTabs() {
  const { dict } = useI18n();
  const t = dict.demo;
  const tabIds = ["deploy", "translate", "explore"] as const;
  const [active, setActive] = useState<(typeof tabIds)[number]>("deploy");
  const demo = demos[active];

  return (
    <section className="border-b py-24">
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
          <p className="mt-4 text-muted-foreground">{t.description}</p>
        </motion.div>

        <div className="mx-auto mt-10 flex max-w-lg justify-center gap-1 rounded-xl border bg-muted/50 p-1">
          {tabIds.map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => setActive(id)}
              className={cn(
                "flex-1 rounded-lg px-3 py-2 text-xs font-medium transition-all sm:text-sm",
                active === id
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {t.tabs[id]}
            </button>
          ))}
        </div>

        <div className="mx-auto mt-8 grid max-w-5xl gap-4 lg:grid-cols-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={active + "-chat"}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="overflow-hidden rounded-2xl border bg-card shadow-sm"
            >
              <div className="border-b bg-muted/30 px-4 py-2.5 text-xs font-medium text-muted-foreground">
                Cursor / Claude Code
              </div>
              <pre className="max-h-80 overflow-auto p-5 font-mono text-xs leading-relaxed text-muted-foreground sm:text-sm">
                {demo.chat.join("\n")}
              </pre>
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              key={active + "-code"}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="overflow-hidden rounded-2xl border bg-[#0d1117] shadow-sm"
            >
              <div className="border-b border-white/10 px-4 py-2.5 font-mono text-xs text-white/40">
                Generated
              </div>
              <pre className="max-h-80 overflow-auto p-5 font-mono text-xs leading-relaxed text-emerald-400/90 sm:text-sm">
                {demo.code}
              </pre>
            </motion.div>
          </AnimatePresence>
        </div>

        <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-muted-foreground">
          {t.footer}
        </p>
      </div>
    </section>
  );
}
