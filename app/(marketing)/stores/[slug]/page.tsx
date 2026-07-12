import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BadgeCheck, Clock, MapPin, MessageCircle, Star, Users } from "lucide-react";

import { Breadcrumbs } from "@/components/marketplace/breadcrumbs";
import { ProductCard } from "@/components/marketplace/product-card";
import { EmptyState } from "@/components/shared/empty-state";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { getProductsByVendor } from "@/lib/data/products";
import { getVendorBySlug, vendors } from "@/lib/data/vendors";
import { formatCompactNumber, formatDate } from "@/lib/utils/format";

export function generateStaticParams() {
  return vendors.map((vendor) => ({ slug: vendor.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const vendor = getVendorBySlug(slug);
  return {
    title: vendor?.name ?? "Vendor Store",
    description: vendor?.description,
  };
}

export default async function VendorStorePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const vendor = getVendorBySlug(slug);
  if (!vendor) notFound();

  const storeProducts = getProductsByVendor(slug);

  return (
    <div>
      <div className="relative h-52 w-full overflow-hidden sm:h-72">
        <Image src={vendor.banner} alt={vendor.name} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Stores" }, { label: vendor.name }]} className="pt-6" />

        <div className="relative mt-4 flex flex-col gap-4 pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex items-end gap-4">
            <div className="relative -mt-16 h-24 w-24 shrink-0 overflow-hidden rounded-2xl border-4 border-background bg-muted shadow-lg sm:h-28 sm:w-28">
              <Image src={vendor.logo} alt={vendor.name} fill className="object-cover" />
            </div>
            <div>
              <h1 className="flex items-center gap-1.5 font-heading text-xl font-bold sm:text-2xl">
                {vendor.name}
                {vendor.verified && <BadgeCheck className="h-5 w-5 text-brand-red" />}
              </h1>
              <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Star className="h-3.5 w-3.5 fill-brand-orange text-brand-orange" /> {vendor.rating.toFixed(1)} (
                  {vendor.reviewCount.toLocaleString()})
                </span>
                <span className="flex items-center gap-1">
                  <Users className="h-3.5 w-3.5" /> {formatCompactNumber(vendor.followerCount)} followers
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" /> {vendor.location}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" /> Joined {formatDate(vendor.joinedAt)}
                </span>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <MessageCircle className="h-4 w-4" /> Message
            </Button>
            <Button className="shadow-brand-sm">Follow Store</Button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 border-y py-4 sm:grid-cols-4">
          <StoreStat label="Products" value={vendor.productCount.toString()} />
          <StoreStat label="Response rate" value={`${vendor.responseRate}%`} />
          <StoreStat label="Response time" value={vendor.responseTime} />
          <StoreStat label="Categories" value={vendor.categories.join(", ")} />
        </div>

        <Tabs defaultValue="products" className="py-8">
          <TabsList>
            <TabsTrigger value="products">Products ({storeProducts.length})</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          <TabsContent value="products" className="pt-6">
            {storeProducts.length === 0 ? (
              <EmptyState title="No products yet" description="This vendor hasn't listed any products." />
            ) : (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {storeProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </TabsContent>
          <TabsContent value="about" className="max-w-2xl pt-6">
            <p className="text-sm leading-relaxed text-muted-foreground">{vendor.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {vendor.categories.map((cat) => (
                <Badge key={cat} variant="secondary">
                  {cat}
                </Badge>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="reviews" className="pt-6">
            <p className="text-sm text-muted-foreground">
              {vendor.reviewCount.toLocaleString()} customers have rated this store an average of{" "}
              {vendor.rating.toFixed(1)} out of 5.
            </p>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function StoreStat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="line-clamp-1 text-sm font-semibold">{value}</p>
    </div>
  );
}
