import { MetadataRoute } from "next";
import { solutions } from "@/lib/data";
import { docsTree } from "@/lib/docs";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.mland.io";

  const solutionPages = solutions.map((s) => ({
    url: `${baseUrl}/solution/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const docPages = docsTree.map((d) => ({
    url: `${baseUrl}/docs/${d.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/industries`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/docs`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...solutionPages,
    ...docPages,
  ];
}
