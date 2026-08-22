import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/_next/", "/favicon.ico"],
    },
    sitemap: "https://whi-sl.org/sitemap.xml",
    host: "https://whi-sl.org",
  };
}
