import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import {
  ArrowRight,
  BadgeCheck,
  Headset,
  ShieldCheck,
  Sparkles,
  Truck,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/marketplace/section-heading";
import { ProductCard } from "@/components/marketplace/product-card";
import { CountdownTimer } from "@/components/marketplace/countdown-timer";
import { HeroSearch } from "@/components/marketplace/hero-search";
import { CategoryCarousel } from "@/components/marketplace/category-carousel";
import { TestimonialCarousel } from "@/components/marketplace/testimonial-carousel";
import { categories } from "@/lib/data/categories";
import {
  getBestSellers,
  getFeaturedProducts,
  getFlashSaleProducts,
  getNewArrivals,
} from "@/lib/data/products";
import { vendors } from "@/lib/data/vendors";
import { formatCompactNumber } from "@/lib/utils/format";

export const metadata: Metadata = {
  title: "Shop More. Live More.",
  description:
    "Discover thousands of products from verified vendors across electronics, fashion, beauty, home and more — with secure checkout and buyer protection on every order.",
};

const trustBadges = [
  { icon: ShieldCheck, label: "Buyer Protection", description: "Full refund if items don't arrive" },
  { icon: Truck, label: "Fast Delivery", description: "Nationwide tracked shipping" },
  { icon: BadgeCheck, label: "Verified Vendors", description: "KYC-checked storefronts" },
  { icon: Headset, label: "24/7 Support", description: "Real humans, real fast" },
];

export default function HomePage() {
  const flashSaleProducts = getFlashSaleProducts().slice(0, 4);
  const featuredProducts = getFeaturedProducts(8);
  const bestSellers = getBestSellers(8);
  const newArrivals = getNewArrivals(8);
  const flashSaleEnd = flashSaleProducts[0]?.flashSaleEndsAt;

  return (
    <div className="flex flex-col">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24 lg:px-8">
          <div className="flex flex-col items-start gap-6">
            <Badge className="bg-accent text-accent-foreground gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold">
              <Sparkles className="h-3.5 w-3.5" /> Over 4,200 vendors already selling
            </Badge>
            <h1 className="font-heading text-4xl leading-tight font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              Shop More.{" "}
              <span className="text-gradient-brand">Live More.</span>
            </h1>
            <p className="max-w-lg text-base text-muted-foreground sm:text-lg">
              Lukmoore brings together premium vendors and quality products in one
              beautifully simple marketplace — with secure payments, real-time tracking,
              and a buyer protection guarantee on every order.
            </p>
            <HeroSearch />
            <div className="flex flex-wrap items-center gap-6 pt-2">
              <div>
                <p className="font-heading text-2xl font-bold">1.2M+</p>
                <p className="text-xs text-muted-foreground">Happy customers</p>
              </div>
              <div className="h-8 w-px bg-border" />
              <div>
                <p className="font-heading text-2xl font-bold">65K+</p>
                <p className="text-xs text-muted-foreground">Products listed</p>
              </div>
              <div className="h-8 w-px bg-border" />
              <div>
                <p className="font-heading text-2xl font-bold">4.8/5</p>
                <p className="text-xs text-muted-foreground">Average rating</p>
              </div>
            </div>
          </div>

          <div className="relative mx-auto aspect-square w-full max-w-md lg:max-w-lg">
            <div className="glass-panel shadow-brand-lg animate-float-slow absolute inset-4 rounded-[2rem]" />
            <div className="relative flex h-full w-full items-center justify-center">
              <Image
                src="/logo/lukmoore-mark.svg"
                alt="Lukmoore"
                width={280}
                height={280}
                className="animate-float drop-shadow-2xl"
                priority
              />
            </div>
            <div className="glass-panel shadow-brand-md absolute -top-4 -left-4 flex items-center gap-2 rounded-2xl px-4 py-3">
              <BadgeCheck className="h-5 w-5 text-brand-red" />
              <div className="text-xs">
                <p className="font-semibold">Verified Vendor</p>
                <p className="text-muted-foreground">Velora Fashion House</p>
              </div>
            </div>
            <div className="glass-panel shadow-brand-md absolute -right-4 bottom-8 flex items-center gap-2 rounded-2xl px-4 py-3">
              <ShieldCheck className="h-5 w-5 text-success" />
              <div className="text-xs">
                <p className="font-semibold">Order Protected</p>
                <p className="text-muted-foreground">Full refund guarantee</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST BADGES */}
      <section className="border-t border-b bg-card/40">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-8 sm:px-6 lg:grid-cols-4 lg:px-8">
          {trustBadges.map((badge) => (
            <div key={badge.label} className="flex items-center gap-3">
              <div className="bg-gradient-brand flex h-10 w-10 shrink-0 items-center justify-center rounded-xl">
                <badge.icon className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold">{badge.label}</p>
                <p className="text-xs text-muted-foreground">{badge.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Browse"
          title="Shop by category"
          description="From electronics to home decor — find exactly what you need from trusted vendors."
        />
        <CategoryCarousel categories={categories} />
      </section>

      {/* FLASH SALE */}
      {flashSaleProducts.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="bg-gradient-brand relative overflow-hidden rounded-3xl px-6 py-8 text-white sm:px-10">
            <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <Badge className="border-0 bg-white/20 text-white">⚡ Limited time</Badge>
                <h2 className="font-heading mt-3 text-2xl font-bold sm:text-3xl">Flash Sales</h2>
                <p className="mt-1 text-sm text-white/85">Ends in:</p>
                {flashSaleEnd && <CountdownTimer endsAt={flashSaleEnd} className="mt-2 text-white" />}
              </div>
              <Button asChild variant="secondary" className="shrink-0 gap-2">
                <Link href="/flash-sales">
                  View all deals <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {flashSaleProducts.map((product) => (
                <div key={product.id} className="rounded-2xl bg-white p-1">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FEATURED PRODUCTS */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between">
          <SectionHeading eyebrow="Curated" title="Featured products" />
          <Button asChild variant="ghost" className="hidden gap-1 sm:inline-flex">
            <Link href="/marketplace">
              See all <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* VENDOR SPOTLIGHT */}
      <section className="border-t bg-card/40 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Storefronts"
            title="Meet our top-rated vendors"
            description="Every Lukmoore vendor is verified and reviewed by real customers."
          />
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {vendors.slice(0, 4).map((vendor) => (
              <Link
                key={vendor.id}
                href={`/stores/${vendor.slug}`}
                className="group flex flex-col items-center gap-3 rounded-2xl border bg-card p-6 text-center transition-all hover:-translate-y-1 hover:shadow-brand-md"
              >
                <div className="relative h-16 w-16 overflow-hidden rounded-full bg-muted">
                  <Image src={vendor.logo} alt={vendor.name} fill className="object-cover" />
                </div>
                <div>
                  <p className="flex items-center justify-center gap-1 text-sm font-semibold">
                    {vendor.name}
                    {vendor.verified && <BadgeCheck className="h-4 w-4 text-brand-red" />}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatCompactNumber(vendor.followerCount)} followers
                  </p>
                </div>
                <Badge variant="secondary">{vendor.rating.toFixed(1)} ★ rating</Badge>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* BEST SELLERS */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between">
          <SectionHeading eyebrow="Popular" title="Best sellers this week" />
          <Button asChild variant="ghost" className="hidden gap-1 sm:inline-flex">
            <Link href="/marketplace?sort=best-selling">
              See all <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* NEW ARRIVALS */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between">
          <SectionHeading eyebrow="Just dropped" title="New arrivals" />
          <Button asChild variant="ghost" className="hidden gap-1 sm:inline-flex">
            <Link href="/marketplace?sort=newest">
              See all <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="border-t bg-card/40 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Loved by shoppers" title="What our customers say" align="center" />
          <TestimonialCarousel />
        </div>
      </section>

      {/* BECOME A VENDOR CTA */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="bg-gradient-brand-radial relative overflow-hidden rounded-3xl px-8 py-14 text-center text-white sm:px-16">
          <h2 className="font-heading text-3xl font-bold sm:text-4xl">
            Start selling on Lukmoore today
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-white/85">
            Join thousands of vendors reaching over 1.2 million active shoppers. Setup takes
            less than 10 minutes.
          </p>
          <Button asChild size="lg" variant="secondary" className="mt-6 gap-2">
            <Link href="/become-vendor">
              Become a Vendor <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
