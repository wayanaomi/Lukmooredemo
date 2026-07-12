import type { Metadata } from "next";
import { Tag } from "lucide-react";

import { ProductCard } from "@/components/marketplace/product-card";
import { SectionHeading } from "@/components/marketplace/section-heading";
import { coupons } from "@/lib/data/customer";
import { products } from "@/lib/data/products";
import { formatDate } from "@/lib/utils/format";

export const metadata: Metadata = {
  title: "Offers & Coupons",
  description: "Save more with active Lukmoore coupons and discounted products.",
};

export default function OffersPage() {
  const onSaleProducts = products.filter((p) => p.compareAtPrice).slice(0, 12);
  const activeCoupons = coupons.filter((c) => c.isActive);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <SectionHeading eyebrow="Save more" title="Offers & Coupons" />

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {activeCoupons.map((coupon) => (
          <div
            key={coupon.id}
            className="bg-gradient-brand-radial relative flex flex-col justify-between overflow-hidden rounded-2xl p-6 text-white"
          >
            <Tag className="absolute -right-4 -bottom-4 h-24 w-24 opacity-15" />
            <div>
              <p className="font-heading text-2xl font-bold">
                {coupon.type === "percentage" ? `${coupon.value}% OFF` : `$${coupon.value} OFF`}
              </p>
              <p className="mt-1 text-sm text-white/85">{coupon.description}</p>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <code className="rounded-lg bg-white/20 px-3 py-1.5 text-sm font-semibold">{coupon.code}</code>
              <span className="text-xs text-white/75">Expires {formatDate(coupon.expiresAt)}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16">
        <SectionHeading eyebrow="Deals" title="Discounted products" />
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {onSaleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
