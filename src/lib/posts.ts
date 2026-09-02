import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";

const dir = path.join(process.cwd(), "content/writing");

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  summary: string;
  draft: boolean;
};

export type Post = PostMeta & { html: string };

// YAML turns an unquoted date into a Date object, so normalise both forms.
function isoDate(value: unknown): string {
  if (value instanceof Date) {
    return new Date(
      value.getTime() - value.getTimezoneOffset() * 60000
    )
      .toISOString()
      .slice(0, 10);
  }
  return value ? String(value).slice(0, 10) : "";
}

function read(file: string): Post {
  const slug = file.replace(/\.md$/, "");
  const { data, content } = matter(fs.readFileSync(path.join(dir, file), "utf8"));
  return {
    slug,
    title: data.title ?? slug,
    date: isoDate(data.date),
    summary: data.summary ?? "",
    draft: data.draft === true,
    html: marked.parse(content) as string,
  };
}

export function allPosts(): Post[] {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map(read)
    .filter((p) => !p.draft)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPost(slug: string): Post | undefined {
  return allPosts().find((p) => p.slug === slug);
}

// Written elsewhere. Real output that does not live on this site.
export const elsewhere = [
  {
    title: "cp-31 editorials",
    where: "tle eliminators",
    note: "worked solutions to the problems on the sheet",
    url: "https://github.com/virajchandra51/TLE_CP_31",
  },
  {
    title: "cses editorials",
    where: "tle eliminators",
    note: "solutions accompanying the cses video series",
    url: "https://github.com/virajchandra51/TLE_CSES",
  },
  {
    title: "post-contest discussions",
    where: "tle eliminators",
    note: "20+ sessions, 50,000+ views",
    url: "https://www.tle-eliminators.com/",
  },
];
