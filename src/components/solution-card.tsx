"use client";

import Image from "next/image";
import {
  Solution,
  ASSET_TYPE_COLORS,
  type AssetType,
  type Industry,
} from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useI18n } from "@/components/i18n-provider";
import { LocaleLink } from "@/components/locale-link";

interface SolutionCardProps {
  solution: Solution;
  className?: string;
}

export function SolutionCard({ solution, className }: SolutionCardProps) {
  const { dict } = useI18n();
  const industryLabel = dict.industries.labels[solution.industry as Industry];
  const assetLabel = dict.industries.assetTypes[solution.assetType as AssetType];

  return (
    <LocaleLink href={`/solution/${solution.slug}`}>
      <Card
        className={cn(
          "group h-full overflow-hidden transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5",
          className
        )}
      >
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={solution.coverImage}
            alt={solution.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {solution.isPro && (
            <Badge className="absolute right-3 top-3 bg-mland-navy text-white">
              Pro
            </Badge>
          )}
        </div>
        <CardContent className="p-4">
          <div className="mb-2 flex flex-wrap gap-2">
            <Badge variant="outline" className="text-xs">
              {industryLabel}
            </Badge>
            <Badge
              variant="outline"
              className={cn("text-xs border", ASSET_TYPE_COLORS[solution.assetType])}
            >
              {assetLabel}
            </Badge>
          </div>
          <h3 className="font-semibold leading-snug group-hover:text-primary">
            {solution.title}
          </h3>
          <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
            {solution.description}
          </p>
        </CardContent>
        {solution.customerCases.length > 0 && (
          <CardFooter className="border-t bg-muted/30 px-4 py-3">
            <p className="text-xs text-muted-foreground">
              {dict.industries.served}
              <span className="font-medium text-foreground">
                {solution.customerCases.join(dict.industries.listSeparator)}
              </span>
            </p>
          </CardFooter>
        )}
      </Card>
    </LocaleLink>
  );
}
