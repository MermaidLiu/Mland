"use client";

import Link from "next/link";
import { ShieldAlert, Lock, Sparkles } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface UpgradeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  fileName?: string;
}

export function UpgradeModal({
  open,
  onOpenChange,
  fileName,
}: UpgradeModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="overflow-hidden border-orange-500/20 sm:max-w-md">
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-orange-500 via-red-500 to-orange-500" />

        <DialogHeader className="pt-2">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-orange-500/10">
            <ShieldAlert className="h-7 w-7 text-orange-500" />
          </div>
          <DialogTitle className="text-center text-xl">
            Upgrade Required
          </DialogTitle>
          <DialogDescription className="text-center text-base leading-relaxed">
            检测到您正在上传
            {fileName ? (
              <span className="font-mono font-medium text-foreground">
                {" "}
                {fileName}{" "}
              </span>
            ) : (
              " 真实医疗数据"
            )}
            。免费版无法保障数据安全与合规，请升级至 Pro 版以继续。
          </DialogDescription>
        </DialogHeader>

        <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-4 text-sm">
          <div className="flex items-start gap-2">
            <Lock className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
            <div className="space-y-1 text-muted-foreground">
              <p>
                <strong className="text-foreground">开源版限制：</strong>
                仅限模拟数据，24h 自动清除，重启即焚
              </p>
              <p>
                <strong className="text-emerald-600 dark:text-emerald-400">
                  Pro 版保障：
                </strong>
                AES-256 加密存储 · 持久化卷 · 院内私有化 · 7×24 工程师
              </p>
            </div>
          </div>
        </div>

        <DialogFooter className="flex-col gap-2 sm:flex-col">
          <Button
            asChild
            size="lg"
            className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:from-emerald-600 hover:to-teal-600"
          >
            <Link href="/pricing" onClick={() => onOpenChange(false)}>
              <Sparkles className="mr-2 h-4 w-4" />
              查看 Pro 定价
            </Link>
          </Button>
          <Button
            variant="ghost"
            className="w-full text-muted-foreground"
            onClick={() => onOpenChange(false)}
          >
            继续使用模拟数据
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
