import type { Metadata } from "next";
import { Zap } from "lucide-react";

import { ProductCard } from "@/components/marketplace/product-card";
import { CountdownTimer } from "@/components/marketplace/countdown-timer";
import { EmptyState } from "@/components/shared/empty-state";
import { getFlashSaleProducts } from "@/lib/data/products";

export const metadata: Metadata = {
  title: "Flash Sales",
  description: "Limited-time deals across every category — while stock lasts.",
};

export default function FlashSalesPage() {
  const flashSaleProducts = getFlashSaleProducts();
  const endsAt = flashSaleProducts[0]?.flashSaleEndsAt;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="bg-gradient-brand flex flex-col items-center gap-3 rounded-3xl px-6 py-10 text-center text-white">
        <span className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest">
          <Zap className="h-4 w-4" /> Flash Sales
        </span>
        <h1 className="font-heading text-3xl font-bold sm:text-4xl">Up to 60% off — today only</h1>
        {endsAt && <CountdownTimer endsAt={endsAt} className="mt-2 scale-110 text-white" />}
      </div>

      <div className="mt-10">
        {flashSaleProducts.length === 0 ? (
          <EmptyState icon={Zap} title="No active flash sales" description="Check back soon for new deals." />
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {flashSaleProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
