import type { MetadataRoute } from "next";
import config from "../lib/config";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    {
      url: config.site.url,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
