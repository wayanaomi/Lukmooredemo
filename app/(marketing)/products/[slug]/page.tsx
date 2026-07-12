import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BadgeCheck, MessageCircle } from "lucide-react";

import { Breadcrumbs } from "@/components/marketplace/breadcrumbs";
import { ProductGallery } from "@/components/marketplace/product-gallery";
import { AddToCartPanel } from "@/components/marketplace/add-to-cart-panel";
import { ProductReviews } from "@/components/marketplace/product-reviews";
import { ProductCard } from "@/components/marketplace/product-card";
import { SectionHeading } from "@/components/marketplace/section-heading";
import { Button } from "@/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { getCategoryBySlug } from "@/lib/data/categories";
import {
  getProductBySlug,
  getProductReviews,
  getRelatedProducts,
  products,
} from "@/lib/data/products";
import { getVendorBySlug } from "@/lib/data/vendors";
import { formatCompactNumber } from "@/lib/utils/format";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return {
    title: product.title,
    description: product.shortDescription,
    openGraph: { images: [product.images[0]] },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const category = getCategoryBySlug(product.categorySlug);
  const vendor = getVendorBySlug(product.vendorSlug);
  const reviews = getProductReviews(product.id);
  const related = getRelatedProducts(product);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[
          { label: "Marketplace", href: "/marketplace" },
          ...(category ? [{ label: category.name, href: `/categories/${category.slug}` }] : []),
          { label: product.title },
        ]}
      />

      <div className="mt-6 grid grid-cols-1 gap-10 lg:grid-cols-2">
        <ProductGallery images={product.images} title={product.title} />
        <AddToCartPanel product={product} />
      </div>

      {vendor && (
        <div className="mt-10 flex flex-col items-start justify-between gap-4 rounded-2xl border bg-card p-5 sm:flex-row sm:items-center">
          <div className="flex items-center gap-4">
            <div className="relative h-14 w-14 overflow-hidden rounded-full bg-muted">
              <Image src={vendor.logo} alt={vendor.name} fill className="object-cover" />
            </div>
            <div>
              <p className="flex items-center gap-1 font-semibold">
                {vendor.name} {vendor.verified && <BadgeCheck className="h-4 w-4 text-brand-red" />}
              </p>
              <p className="text-xs text-muted-foreground">
                {vendor.rating.toFixed(1)} ★ · {formatCompactNumber(vendor.followerCount)} followers ·{" "}
                {vendor.responseRate}% response rate
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2" asChild>
              <Link href="/dashboard/messages">
                <MessageCircle className="h-4 w-4" /> Chat
              </Link>
            </Button>
            <Button asChild>
              <Link href={`/stores/${vendor.slug}`}>Visit Store</Link>
            </Button>
          </div>
        </div>
      )}

      <div className="mt-12">
        <Tabs defaultValue="description">
          <TabsList>
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="reviews">Reviews ({product.reviewCount.toLocaleString()})</TabsTrigger>
            <TabsTrigger value="qa">Q&amp;A</TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="pt-6">
            <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">{product.description}</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <li key={tag} className="rounded-full bg-accent px-3 py-1 text-xs text-accent-foreground">
                  #{tag}
                </li>
              ))}
            </ul>
          </TabsContent>
          <TabsContent value="reviews" className="pt-6">
            <ProductReviews product={product} reviews={reviews} />
          </TabsContent>
          <TabsContent value="qa" className="pt-6">
            <p className="text-sm text-muted-foreground">
              No questions yet. Be the first to ask {vendor?.name ?? "the vendor"} about this product.
            </p>
            <Button variant="outline" className="mt-4">
              Ask a question
            </Button>
          </TabsContent>
        </Tabs>
      </div>

      {related.length > 0 && (
        <div className="mt-16">
          <SectionHeading eyebrow="You might also like" title="Related products" />
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {related.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
