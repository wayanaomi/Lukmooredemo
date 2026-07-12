"use client";

import { Heart } from "lucide-react";

import { ProductCard } from "@/components/marketplace/product-card";
import { EmptyState } from "@/components/shared/empty-state";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/store/hooks";
import { getProductById } from "@/lib/data/products";

export default function WishlistPage() {
  const productIds = useAppSelector((state) => state.wishlist.productIds);
  const products = productIds.map(getProductById).filter((p) => p !== undefined);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-heading text-2xl font-bold">My Wishlist</h1>
        <p className="text-sm text-muted-foreground">
          {products.length} item{products.length !== 1 ? "s" : ""} saved for later.
        </p>
      </div>

      {products.length === 0 ? (
        <EmptyState
          icon={Heart}
          title="Your wishlist is empty"
          description="Save items you love to buy them later."
          action={
            <Button asChild className="bg-gradient-brand">
              <a href="/marketplace">Browse marketplace</a>
            </Button>
          }
        />
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
