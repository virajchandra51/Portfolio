import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { allPosts, getPost } from "@/lib/posts";

export const dynamicParams = false;

export async function generateStaticParams() {
  const posts = allPosts();
  // `output: export` refuses to build a dynamic route with zero params, so
  // until the first post is published we prerender one slug that 404s.
  return posts.length ? posts.map((p) => ({ slug: p.slug })) : [{ slug: "none" }];
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const post = getPost(params.slug);
  if (!post) return { title: "not found" };
  return { title: post.title, description: post.summary };
}

export default function Post({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug);
  if (!post) notFound();

  return (
    <article>
      <Link
        href="/writing"
        className="font-mono text-xs text-stone-400 hover:text-stone-900"
      >
        &larr; writing
      </Link>
      <h1 className="mt-6 text-2xl font-medium tracking-tight md:text-3xl">
        {post.title}
      </h1>
      <p className="mt-2 font-mono text-[0.8rem] text-stone-500">{post.date}</p>
      <hr className="rule" />
      <div
        className="prose-min"
        dangerouslySetInnerHTML={{ __html: post.html }}
      />
    </article>
  );
}
