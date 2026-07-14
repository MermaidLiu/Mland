"use client";

import { motion } from "framer-motion";
import { useI18n } from "@/components/i18n-provider";

const terminalLines = [
  { type: "cmd", text: "$ npx mland-cli add pmp-agent --hospital=航天中心医院" },
  { type: "out", text: "✓ Created blueprint: pmp-agent/" },
  { type: "out", text: "✓ Connected MCP server: @mland/mcp-server" },
  { type: "out", text: "  Tools: list_solutions · get_solution · deploy_solution" },
  { type: "out", text: "✓ Infrastructure: Qdrant + Redis + PostgreSQL ready" },
  { type: "success", text: "Ready. Try: \"Deploy PMP agent to Aerospace Center Hospital\"" },
];

export function McpTerminalSection() {
  const { dict } = useI18n();
  const t = dict.mcp;

  return (
    <section id="features" className="border-b bg-muted/30 py-24">
      <div className="container mx-auto px-4">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="section-label mb-4">{t.label}</p>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{t.title}</h2>
            <p className="mt-4 text-lg text-muted-foreground">{t.subtitle}</p>
            <ul className="mt-8 space-y-3 text-sm text-muted-foreground">
              {t.bullets.map((b) => (
                <li key={b} className="flex gap-2">
                  <span className="text-primary">→</span>
                  {b}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="overflow-hidden rounded-2xl border bg-[#0d1117] shadow-2xl"
          >
            <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
              <div className="h-3 w-3 rounded-full bg-red-500/80" />
              <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
              <div className="h-3 w-3 rounded-full bg-green-500/80" />
              <span className="ml-2 font-mono text-xs text-white/40">Terminal</span>
            </div>
            <div className="space-y-2 p-6 font-mono text-sm">
              {terminalLines.map((line, i) => (
                <div
                  key={i}
                  className={
                    line.type === "cmd"
                      ? "text-white/90"
                      : line.type === "success"
                        ? "text-emerald-400"
                        : "text-white/55"
                  }
                >
                  {line.text}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
