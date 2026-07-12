import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock } from "lucide-react";

import { Breadcrumbs } from "@/components/marketplace/breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { blogPosts, getBlogPostBySlug } from "@/lib/data/blog";
import { formatDate } from "@/lib/utils/format";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return {};
  return { title: post.title, description: post.excerpt };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const related = blogPosts.filter((p) => p.slug !== post.slug && p.category === post.category).slice(0, 3);

  return (
    <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "Blog", href: "/blog" }, { label: post.title }]} />

      <Badge variant="secondary" className="mt-6 w-fit">
        {post.category}
      </Badge>
      <h1 className="mt-3 font-heading text-3xl font-bold sm:text-4xl">{post.title}</h1>
      <div className="mt-3 flex items-center gap-3 text-sm text-muted-foreground">
        <span>{post.author}</span>
        <span>&middot;</span>
        <span>{formatDate(post.publishedAt)}</span>
        <span className="flex items-center gap-1">
          <Clock className="h-3.5 w-3.5" /> {post.readTimeMinutes} min read
        </span>
      </div>

      <div className="relative mt-6 aspect-video overflow-hidden rounded-2xl">
        <Image src={post.coverImage} alt={post.title} fill className="object-cover" />
      </div>

      <div className="prose prose-neutral dark:prose-invert mt-8 max-w-none">
        {post.content.map((paragraph, index) => (
          <p key={index} className="mb-4 leading-relaxed text-foreground/90">
            {paragraph}
          </p>
        ))}
      </div>

      {related.length > 0 && (
        <div className="mt-14 border-t pt-10">
          <h2 className="font-heading text-lg font-bold">More in {post.category}</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {related.map((r) => (
              <Link
                key={r.slug}
                href={`/blog/${r.slug}`}
                className="group overflow-hidden rounded-xl border bg-card"
              >
                <div className="relative aspect-16/10 overflow-hidden">
                  <Image
                    src={r.coverImage}
                    alt={r.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <p className="p-3 text-sm font-medium group-hover:text-brand-red">{r.title}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
