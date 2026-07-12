import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Clock } from "lucide-react";

import { SectionHeading } from "@/components/marketplace/section-heading";
import { Badge } from "@/components/ui/badge";
import { blogPosts } from "@/lib/data/blog";
import { formatDate } from "@/lib/utils/format";

export const metadata: Metadata = {
  title: "Blog",
  description: "News, vendor tips, and shopping guides from the Lukmoore team.",
};

export default function BlogIndexPage() {
  const [featured, ...rest] = blogPosts;

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <SectionHeading eyebrow="Lukmoore Blog" title="News, tips, and stories" align="center" />

      <Link
        href={`/blog/${featured.slug}`}
        className="group mt-10 grid grid-cols-1 gap-6 overflow-hidden rounded-2xl border bg-card lg:grid-cols-2"
      >
        <div className="relative aspect-[16/10] overflow-hidden lg:aspect-auto">
          <Image
            src={featured.coverImage}
            alt={featured.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="flex flex-col justify-center gap-3 p-6 sm:p-8">
          <Badge variant="secondary" className="w-fit">
            {featured.category}
          </Badge>
          <h2 className="font-heading text-2xl font-bold group-hover:text-brand-red">
            {featured.title}
          </h2>
          <p className="text-sm text-muted-foreground">{featured.excerpt}</p>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span>{featured.author}</span>
            <span>&middot;</span>
            <span>{formatDate(featured.publishedAt)}</span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" /> {featured.readTimeMinutes} min read
            </span>
          </div>
        </div>
      </Link>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {rest.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group overflow-hidden rounded-2xl border bg-card"
          >
            <div className="relative aspect-[16/10] overflow-hidden">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-col gap-2 p-5">
              <Badge variant="secondary" className="w-fit">
                {post.category}
              </Badge>
              <h3 className="font-heading font-semibold group-hover:text-brand-red">
                {post.title}
              </h3>
              <p className="line-clamp-2 text-sm text-muted-foreground">{post.excerpt}</p>
              <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                <span>{formatDate(post.publishedAt)}</span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" /> {post.readTimeMinutes} min
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
