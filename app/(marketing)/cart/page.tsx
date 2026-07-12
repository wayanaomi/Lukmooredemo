"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Minus, Plus, ShoppingBag, Tag, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EmptyState } from "@/components/shared/empty-state";
import {
  applyCoupon,
  removeCoupon,
  removeItem,
  updateQuantity,
} from "@/store/slices/cart-slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { coupons } from "@/lib/data/customer";
import { formatCurrency } from "@/lib/utils/format";

export default function CartPage() {
  const dispatch = useAppDispatch();
  const { items, couponCode } = useAppSelector((state) => state.cart);
  const [code, setCode] = useState("");

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const activeCoupon = coupons.find((c) => c.code === couponCode && c.isActive);
  const discount = activeCoupon
    ? activeCoupon.type === "percentage"
      ? Math.round(subtotal * (activeCoupon.value / 100) * 100) / 100
      : activeCoupon.value
    : 0;
  const shipping = subtotal > 50 || subtotal === 0 ? 0 : 6.99;
  const tax = Math.round((subtotal - discount) * 0.03 * 100) / 100;
  const total = Math.max(0, subtotal - discount) + shipping + tax;

  function handleApplyCoupon() {
    const coupon = coupons.find((c) => c.code.toLowerCase() === code.trim().toLowerCase());
    if (!coupon || !coupon.isActive) {
      toast.error("Invalid or expired coupon code.");
      return;
    }
    if (coupon.minSpend && subtotal < coupon.minSpend) {
      toast.error(`This coupon requires a minimum spend of ${formatCurrency(coupon.minSpend)}.`);
      return;
    }
    dispatch(applyCoupon(coupon.code));
    toast.success(`Coupon ${coupon.code} applied!`);
    setCode("");
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
        <EmptyState
          icon={ShoppingBag}
          title="Your cart is empty"
          description="Looks like you haven't added anything yet. Let's fix that."
          action={
            <Button asChild className="mt-2">
              <Link href="/marketplace">Browse Marketplace</Link>
            </Button>
          }
        />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="font-heading text-2xl font-bold sm:text-3xl">Shopping Cart</h1>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_360px]">
        <div className="flex flex-col gap-4">
          {items.map((item) => (
            <div
              key={`${item.productId}-${item.variantId ?? "default"}`}
              className="flex gap-4 rounded-2xl border bg-card p-4"
            >
              <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-muted">
                <Image src={item.image} alt={item.title} fill className="object-cover" />
              </div>
              <div className="flex flex-1 flex-col justify-between">
                <div>
                  <Link href={`/products/${item.slug}`} className="font-medium hover:underline">
                    {item.title}
                  </Link>
                  <p className="text-sm text-muted-foreground">{item.vendorName}</p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center rounded-full border">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-full"
                      onClick={() =>
                        dispatch(
                          updateQuantity({
                            productId: item.productId,
                            variantId: item.variantId,
                            quantity: item.quantity - 1,
                          })
                        )
                      }
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </Button>
                    <span className="w-6 text-center text-sm font-medium">{item.quantity}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-full"
                      disabled={item.quantity >= item.maxStock}
                      onClick={() =>
                        dispatch(
                          updateQuantity({
                            productId: item.productId,
                            variantId: item.variantId,
                            quantity: item.quantity + 1,
                          })
                        )
                      }
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                  <span className="font-heading font-bold">{formatCurrency(item.price * item.quantity)}</span>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 self-start text-muted-foreground hover:text-destructive"
                onClick={() => dispatch(removeItem({ productId: item.productId, variantId: item.variantId }))}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>

        <div className="h-fit rounded-2xl border bg-card p-6">
          <h2 className="font-heading text-lg font-bold">Order Summary</h2>

          <div className="mt-4">
            {activeCoupon ? (
              <div className="flex items-center justify-between rounded-lg bg-accent px-3 py-2 text-sm">
                <span className="flex items-center gap-1.5 font-medium text-accent-foreground">
                  <Tag className="h-3.5 w-3.5" /> {activeCoupon.code}
                </span>
                <button onClick={() => dispatch(removeCoupon())} className="text-muted-foreground hover:text-foreground">
                  Remove
                </button>
              </div>
            ) : (
              <div className="flex gap-2">
                <Input placeholder="Coupon code" value={code} onChange={(e) => setCode(e.target.value)} />
                <Button variant="outline" onClick={handleApplyCoupon}>
                  Apply
                </Button>
              </div>
            )}
          </div>

          <div className="mt-5 flex flex-col gap-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-success">
                <span>Discount</span>
                <span>-{formatCurrency(discount)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-muted-foreground">Shipping</span>
              <span>{shipping === 0 ? "Free" : formatCurrency(shipping)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Tax</span>
              <span>{formatCurrency(tax)}</span>
            </div>
          </div>

          <div className="mt-4 flex justify-between border-t pt-4 font-heading text-lg font-bold">
            <span>Total</span>
            <span>{formatCurrency(total)}</span>
          </div>

          <Button asChild size="lg" className="mt-6 w-full shadow-brand-sm">
            <Link href="/checkout">Proceed to Checkout</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
