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
import { CONTACT_EMAIL, GITHUB_REPO_URL, type Solution } from "@/lib/data";
import { PRO_PRICE_LABEL } from "@/lib/pricing";
import { useI18n } from "@/components/i18n-provider";

interface SolutionSidebarProps {
  solution: Solution;
}

export function SolutionSidebar({ solution }: SolutionSidebarProps) {
  const { dict } = useI18n();
  const t = dict.sidebar;
  const [deployMethod, setDeployMethod] = useState("docker");

  return (
    <Card className="sticky top-24">
      <CardHeader>
        <CardTitle className="text-base">{t.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="mb-2 text-xs font-medium text-muted-foreground">{t.cliLabel}</p>
          <CopyCommand command={solution.deployCommand} />
        </div>

        <div>
          <p className="mb-2 text-xs font-medium text-muted-foreground">{t.deployLabel}</p>
          <Select value={deployMethod} onValueChange={setDeployMethod}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="docker">{t.docker}</SelectItem>
              <SelectItem value="k8s">{t.k8s}</SelectItem>
              <SelectItem value="manual">{t.manual}</SelectItem>
            </SelectContent>
          </Select>
          {deployMethod === "k8s" && solution.isPro && (
            <p className="mt-2 text-xs text-muted-foreground">{t.k8sNote}</p>
          )}
        </div>

        {solution.isPro && (
          <div className="rounded-lg border border-primary/30 bg-primary/5 p-3">
            <p className="text-sm font-medium">{t.proTitle}</p>
            <p className="mt-1 text-xs text-muted-foreground">
              {t.proBody}
              {` · ${solution.priceLabel ?? PRO_PRICE_LABEL}/${t.perCase}`}
            </p>
          </div>
        )}

        <Button asChild className="w-full">
          <a
            href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`${t.contactPro}: ${solution.title}`)}`}
          >
            {t.contactPro}
          </a>
        </Button>

        <Button asChild variant="outline" className="w-full">
          <a
            href={`${GITHUB_REPO_URL}/tree/main/templates/${solution.templatePath}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t.viewGithub}
          </a>
        </Button>
      </CardContent>
    </Card>
  );
}
