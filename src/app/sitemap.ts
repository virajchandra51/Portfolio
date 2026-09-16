import type { MetadataRoute } from "next";
import { allPosts } from "@/lib/posts";
import { nav, site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["/", ...nav.map((n) => n.href)];
  const posts = allPosts().map((p) => `/writing/${p.slug}`);
  // trailingSlash is on, so the canonical form of every route ends in "/".
  return [...pages, ...posts].map((path) => ({
    url: `${site.url}${path === "/" ? "/" : `${path}/`}`,
  }));
}
