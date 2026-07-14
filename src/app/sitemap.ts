import { MetadataRoute } from "next";
import { solutions } from "@/lib/data";
import { docsTree } from "@/lib/docs";
import { locales } from "@/i18n/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.mland.io";

  const staticPaths = ["", "/industries", "/pricing", "/docs", "/privacy"];

  const localizedStatic = locales.flatMap((locale) =>
    staticPaths.map((path) => ({
      url: `${baseUrl}/${locale}${path}`,
      lastModified: new Date(),
      changeFrequency: path === "" || path === "/pricing" ? ("weekly" as const) : ("monthly" as const),
      priority: path === "" ? 1 : path === "/pricing" ? 0.95 : 0.8,
    }))
  );

  const solutionPages = locales.flatMap((locale) =>
    solutions.map((s) => ({
      url: `${baseUrl}/${locale}/solution/${s.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }))
  );

  const docPages = locales.flatMap((locale) =>
    docsTree.map((d) => ({
      url: `${baseUrl}/${locale}/docs/${d.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }))
  );

  return [...localizedStatic, ...solutionPages, ...docPages];
}
