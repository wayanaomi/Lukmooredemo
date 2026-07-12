"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag } from "lucide-react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { StarRating } from "@/components/marketplace/star-rating";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addItem, setCartOpen } from "@/store/slices/cart-slice";
import { toggleWishlist } from "@/store/slices/wishlist-slice";
import { formatCurrency } from "@/lib/utils/format";
import { cn } from "@/lib/utils";
import type { Product } from "@/types/marketplace";

export function ProductCard({ product, className }: { product: Product; className?: string }) {
  const dispatch = useAppDispatch();
  const isWishlisted = useAppSelector((state) => state.wishlist.productIds.includes(product.id));
  const discountPercent = product.compareAtPrice
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 0;

  function handleAddToCart() {
    dispatch(
      addItem({
        productId: product.id,
        title: product.title,
        image: product.images[0],
        price: product.price,
        quantity: 1,
        vendorName: product.vendorName,
        slug: product.slug,
        maxStock: product.stock,
      })
    );
    toast.success(`${product.title} added to cart`, {
      action: { label: "View cart", onClick: () => dispatch(setCartOpen(true)) },
    });
  }

  return (
    <div
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border bg-card transition-all hover:-translate-y-1 hover:shadow-brand-md",
        className
      )}
    >
      <Link href={`/products/${product.slug}`} className="relative block aspect-square overflow-hidden bg-muted">
        <Image
          src={product.images[0]}
          alt={product.title}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-2 left-2 flex flex-col gap-1.5">
          {product.isFlashSale && (
            <Badge className="bg-gradient-brand border-0 text-white">Flash Sale</Badge>
          )}
          {discountPercent > 0 && !product.isFlashSale && (
            <Badge className="bg-brand-orange border-0 text-white">-{discountPercent}%</Badge>
          )}
          {product.isNew && <Badge variant="secondary">New</Badge>}
        </div>
        <Button
          size="icon"
          variant="secondary"
          className={cn(
            "absolute top-2 right-2 h-8 w-8 rounded-full opacity-0 shadow-sm transition-opacity group-hover:opacity-100",
            isWishlisted && "opacity-100"
          )}
          onClick={(event) => {
            event.preventDefault();
            dispatch(toggleWishlist(product.id));
          }}
          aria-label="Toggle wishlist"
        >
          <Heart className={cn("h-4 w-4", isWishlisted && "fill-brand-red text-brand-red")} />
        </Button>
      </Link>

      <div className="flex flex-1 flex-col gap-1.5 p-3.5">
        <span className="text-xs text-muted-foreground">{product.vendorName}</span>
        <Link href={`/products/${product.slug}`} className="line-clamp-2 text-sm font-medium hover:underline">
          {product.title}
        </Link>
        <StarRating rating={product.rating} size="xs" reviewCount={product.reviewCount} />
        <div className="mt-auto flex items-center justify-between pt-1">
          <div className="flex items-baseline gap-1.5">
            <span className="font-heading text-base font-bold">{formatCurrency(product.price)}</span>
            {product.compareAtPrice && (
              <span className="text-xs text-muted-foreground line-through">
                {formatCurrency(product.compareAtPrice)}
              </span>
            )}
          </div>
          <Button
            size="icon"
            className="h-8 w-8 rounded-full shadow-brand-sm"
            onClick={handleAddToCart}
            aria-label="Add to cart"
            disabled={product.stock === 0}
          >
            <ShoppingBag className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
