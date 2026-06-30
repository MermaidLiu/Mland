import Link from "next/link";
import Image from "next/image";
import {
  Solution,
  INDUSTRY_LABELS,
  ASSET_TYPE_LABELS,
  ASSET_TYPE_COLORS,
} from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface SolutionCardProps {
  solution: Solution;
  className?: string;
}

export function SolutionCard({ solution, className }: SolutionCardProps) {
  return (
    <Link href={`/solution/${solution.slug}`}>
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
              {INDUSTRY_LABELS[solution.industry]}
            </Badge>
            <Badge
              variant="outline"
              className={cn("text-xs border", ASSET_TYPE_COLORS[solution.assetType])}
            >
              {ASSET_TYPE_LABELS[solution.assetType]}
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
              已服务：
              <span className="font-medium text-foreground">
                {solution.customerCases.join("、")}
              </span>
            </p>
          </CardFooter>
        )}
      </Card>
    </Link>
  );
}
