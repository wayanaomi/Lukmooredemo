import { History } from "lucide-react";

import { ProductCard } from "@/components/marketplace/product-card";
import { EmptyState } from "@/components/shared/empty-state";
import { getProductById } from "@/lib/data/products";
import { recentlyViewedProductIds } from "@/lib/data/customer";

export const metadata = { title: "Recently Viewed" };

export default function RecentlyViewedPage() {
  const products = recentlyViewedProductIds.map(getProductById).filter((p) => p !== undefined);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-heading text-2xl font-bold">Recently Viewed</h1>
        <p className="text-sm text-muted-foreground">Products you&apos;ve looked at recently.</p>
      </div>

      {products.length === 0 ? (
        <EmptyState icon={History} title="Nothing here yet" description="Browse the marketplace to see products here." />
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
