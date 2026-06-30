"use client";

import { useState } from "react";
import { CopyCommand } from "@/components/copy-command";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GITHUB_REPO_URL, type Solution } from "@/lib/data";
import { PRO_PRICE_LABEL } from "@/lib/pricing";

interface SolutionSidebarProps {
  solution: Solution;
}

export function SolutionSidebar({ solution }: SolutionSidebarProps) {
  const [deployMethod, setDeployMethod] = useState("docker");

  return (
    <Card className="sticky top-24">
      <CardHeader>
        <CardTitle className="text-base">快速接入</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="mb-2 text-xs font-medium text-muted-foreground">
            CLI 安装命令
          </p>
          <CopyCommand command={solution.deployCommand} />
        </div>

        <div>
          <p className="mb-2 text-xs font-medium text-muted-foreground">
            部署方式
          </p>
          <Select value={deployMethod} onValueChange={setDeployMethod}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="docker">Docker Compose（推荐）</SelectItem>
              <SelectItem value="k8s">Kubernetes（Pro）</SelectItem>
              <SelectItem value="manual">手动部署</SelectItem>
            </SelectContent>
          </Select>
          {deployMethod === "k8s" && solution.isPro && (
            <p className="mt-2 text-xs text-muted-foreground">
              Pro 版包含高可用集群与 7×24 监控告警配置
            </p>
          )}
        </div>

        {solution.isPro && (
          <div className="rounded-lg border border-primary/30 bg-primary/5 p-3">
            <p className="text-sm font-medium">Pro 版</p>
            <p className="mt-1 text-xs text-muted-foreground">
              完整源码 + K8s 高可用 + 监控告警
              {` · ${solution.priceLabel ?? PRO_PRICE_LABEL}/病例`}
            </p>
          </div>
        )}

        <Button asChild className="w-full">
          <a
            href={`mailto:sales@mland.io?subject=${encodeURIComponent(`获取 Pro 版：${solution.title}`)}`}
          >
            联系获取 Pro 版
          </a>
        </Button>

        <Button asChild variant="outline" className="w-full">
          <a
            href={`${GITHUB_REPO_URL}/tree/main/templates/${solution.templatePath}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            在 GitHub 查看源码
          </a>
        </Button>
      </CardContent>
    </Card>
  );
}
