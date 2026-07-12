"use client";

import { useMemo, useState } from "react";
import { Heart, Minus, Plus, ShieldCheck, ShoppingBag, Truck } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StarRating } from "@/components/marketplace/star-rating";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addItem, setCartOpen } from "@/store/slices/cart-slice";
import { toggleWishlist } from "@/store/slices/wishlist-slice";
import { formatCurrency } from "@/lib/utils/format";
import { cn } from "@/lib/utils";
import type { Product } from "@/types/marketplace";

export function AddToCartPanel({ product }: { product: Product }) {
  const dispatch = useAppDispatch();
  const isWishlisted = useAppSelector((state) => state.wishlist.productIds.includes(product.id));
  const [selectedVariantId, setSelectedVariantId] = useState(product.variants[0]?.id);
  const [quantity, setQuantity] = useState(1);

  const selectedVariant = useMemo(
    () => product.variants.find((v) => v.id === selectedVariantId),
    [product.variants, selectedVariantId]
  );

  const price = selectedVariant?.price ?? product.price;
  const stock = selectedVariant?.stock ?? product.stock;
  const discountPercent = product.compareAtPrice
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 0;

  function handleAddToCart() {
    dispatch(
      addItem({
        productId: product.id,
        variantId: selectedVariant?.id,
        title: product.title,
        image: product.images[0],
        price,
        quantity,
        vendorName: product.vendorName,
        slug: product.slug,
        maxStock: stock,
      })
    );
    toast.success(`${product.title} added to cart`, {
      action: { label: "View cart", onClick: () => dispatch(setCartOpen(true)) },
    });
  }

  const attributeName = product.variants[0]?.name ? Object.keys(product.variants[0].attributes)[0] : null;

  return (
    <div className="flex flex-col gap-5">
      <div>
        <p className="text-sm text-muted-foreground">{product.vendorName}</p>
        <h1 className="font-heading mt-1 text-2xl font-bold sm:text-3xl">{product.title}</h1>
        <div className="mt-2 flex items-center gap-3">
          <StarRating rating={product.rating} showValue reviewCount={product.reviewCount} />
          <span className="text-xs text-muted-foreground">{product.soldCount.toLocaleString()} sold</span>
        </div>
      </div>

      <div className="flex items-baseline gap-3">
        <span className="font-heading text-3xl font-bold">{formatCurrency(price)}</span>
        {product.compareAtPrice && (
          <>
            <span className="text-base text-muted-foreground line-through">
              {formatCurrency(product.compareAtPrice)}
            </span>
            <Badge className="bg-brand-orange border-0 text-white">-{discountPercent}%</Badge>
          </>
        )}
      </div>

      {product.variants.length > 0 && attributeName && (
        <div>
          <p className="mb-2 text-sm font-medium">{attributeName}</p>
          <div className="flex flex-wrap gap-2">
            {product.variants.map((variant) => (
              <button
                key={variant.id}
                onClick={() => setSelectedVariantId(variant.id)}
                disabled={variant.stock === 0}
                className={cn(
                  "rounded-full border px-4 py-1.5 text-sm transition-colors",
                  selectedVariantId === variant.id
                    ? "border-brand-red bg-brand-red text-white"
                    : "hover:border-brand-red/60",
                  variant.stock === 0 && "cursor-not-allowed opacity-40"
                )}
              >
                {variant.name}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex items-center gap-4">
        <div className="flex items-center rounded-full border">
          <Button variant="ghost" size="icon" className="rounded-full" onClick={() => setQuantity((q) => Math.max(1, q - 1))} aria-label="Decrease quantity">
            <Minus className="h-4 w-4" />
          </Button>
          <span className="w-8 text-center font-medium">{quantity}</span>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            onClick={() => setQuantity((q) => Math.min(stock, q + 1))}
            aria-label="Increase quantity"
            disabled={quantity >= stock}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <span className="text-sm text-muted-foreground">
          {stock > 0 ? `${stock} in stock` : "Out of stock"}
        </span>
      </div>

      <div className="flex gap-3">
        <Button size="lg" className="flex-1 gap-2 shadow-brand-sm" onClick={handleAddToCart} disabled={stock === 0}>
          <ShoppingBag className="h-4 w-4" /> Add to Cart
        </Button>
        <Button
          size="lg"
          variant="outline"
          className="gap-2"
          onClick={() => dispatch(toggleWishlist(product.id))}
        >
          <Heart className={cn("h-4 w-4", isWishlisted && "fill-brand-red text-brand-red")} />
        </Button>
      </div>

      <div className="flex flex-col gap-2 rounded-xl border p-4 text-sm">
        <p className="flex items-center gap-2">
          <Truck className="h-4 w-4 text-brand-red" />
          {product.freeShipping ? "Free shipping" : "Standard shipping rates apply"} — arrives in 3-5 days
        </p>
        <p className="flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-success" /> Covered by Lukmoore Buyer Protection
        </p>
      </div>
    </div>
  );
}
