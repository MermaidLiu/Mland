"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Shield, Lock, Zap, Database } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProUpgradeButton } from "@/components/pro-upgrade-button";

export function OpenVsProSection() {
  return (
    <section className="border-y bg-muted/20 py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <p className="mb-2 text-sm font-medium uppercase tracking-wider text-primary">
            开源沙盒 vs 企业级生产
          </p>
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            从 Demo 到三甲医院，只差一个{" "}
            <span className="bg-gradient-to-r from-emerald-500 to-cyan-500 bg-clip-text text-transparent">
              Mland Pro
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            开源版适合学习与 PoC；真实医疗数据必须走 Pro — 数据不出院、断电不丢失。
          </p>
        </motion.div>

        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
          {/* Free / Open Source */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative rounded-2xl border bg-card p-8"
          >
            <div className="mb-6 flex items-center gap-3">
              <span className="text-4xl">🧪</span>
              <div>
                <h3 className="text-xl font-bold">开源沙盒版</h3>
                <p className="text-sm text-muted-foreground">Free · MIT 许可</p>
              </div>
            </div>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li className="flex gap-2">
                <Database className="mt-0.5 h-4 w-4 shrink-0 text-orange-500" />
                <span>
                  <strong className="text-foreground">仅限模拟数据</strong>
                  ，24 小时自动清除
                </span>
              </li>
              <li className="flex gap-2">
                <Zap className="mt-0.5 h-4 w-4 shrink-0 text-orange-500" />
                <span>
                  <strong className="text-foreground">CPU 推理</strong>
                  ，仅供体验，不适合生产
                </span>
              </li>
              <li className="flex gap-2">
                <Lock className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
                <span>
                  真实病历/影像上传{" "}
                  <strong className="text-destructive">已禁用</strong>
                </span>
              </li>
            </ul>
            <p className="mt-6 rounded-lg bg-orange-500/10 px-3 py-2 text-xs text-orange-700 dark:text-orange-300">
              ⚠️ 重启即焚 — 数据无法永久留存，医院生产环境请勿使用
            </p>
          </motion.div>

          {/* Pro */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-2xl border-2 border-emerald-500/40 bg-gradient-to-br from-emerald-500/5 via-card to-cyan-500/5 p-8 shadow-xl shadow-emerald-500/10"
          >
            <div className="absolute right-4 top-4 rounded-full bg-emerald-500 px-3 py-1 text-xs font-bold text-white">
              推荐
            </div>
            <div className="mb-6 flex items-center gap-3">
              <span className="text-4xl">🏥</span>
              <div>
                <h3 className="text-xl font-bold">Mland Pro 企业版</h3>
                <p className="text-sm text-emerald-600 dark:text-emerald-400">
                  数据保险箱 + 智能加速器
                </p>
              </div>
            </div>
            <ul className="space-y-4 text-sm">
              <li className="flex gap-2">
                <Shield className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                <span>
                  支持<strong className="text-foreground">真实影像/化验单</strong>
                  上传，数据永久加密存储
                </span>
              </li>
              <li className="flex gap-2">
                <Zap className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                <span>
                  <strong className="text-foreground">GPU 加速</strong>
                  推理，毫秒级响应
                </span>
              </li>
              <li className="flex gap-2">
                <Lock className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                <span>
                  支持<strong className="text-foreground">院内私有化部署</strong>
                  ，数据绝对不出院
                </span>
              </li>
            </ul>
            <div className="mt-8">
              <Button
                asChild
                size="lg"
                className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:from-emerald-600 hover:to-teal-600"
              >
                <Link href="mailto:sales@mland.io?subject=Mland Pro 报价咨询">
                  联系销售获取 Pro 报价
                </Link>
              </Button>
              <div className="mt-3 flex justify-center">
                <ProUpgradeButton size="sm" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
