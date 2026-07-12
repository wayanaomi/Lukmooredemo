"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { removeItem, setCartOpen, updateQuantity } from "@/store/slices/cart-slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { formatCurrency } from "@/lib/utils/format";
import { cn } from "@/lib/utils";

export function CartSheet() {
  const dispatch = useAppDispatch();
  const { items, isOpen } = useAppSelector((state) => state.cart);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <Sheet open={isOpen} onOpenChange={(open) => dispatch(setCartOpen(open))}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative" aria-label="Cart">
          <ShoppingBag className="h-5 w-5" />
          {items.length > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 min-w-5 justify-center rounded-full px-1 text-[10px]">
              {items.reduce((n, item) => n + item.quantity, 0)}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="flex w-full flex-col sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Your Cart ({items.length})</SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent">
              <ShoppingBag className="h-7 w-7 text-accent-foreground" />
            </div>
            <p className="font-medium">Your cart is empty</p>
            <p className="text-sm text-muted-foreground">
              Explore the marketplace and add items you love.
            </p>
            <Button asChild className="mt-2" onClick={() => dispatch(setCartOpen(false))}>
              <Link href="/marketplace">Start Shopping</Link>
            </Button>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 px-4">
              <ul className="flex flex-col gap-4 py-2">
                {items.map((item) => (
                  <li
                    key={`${item.productId}-${item.variantId ?? "default"}`}
                    className="flex gap-3 rounded-xl border p-3"
                  >
                    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-muted">
                      <Image src={item.image} alt={item.title} fill className="object-cover" />
                    </div>
                    <div className="flex flex-1 flex-col gap-1">
                      <Link
                        href={`/products/${item.slug}`}
                        className="line-clamp-1 text-sm font-medium hover:underline"
                      >
                        {item.title}
                      </Link>
                      <p className="text-xs text-muted-foreground">{item.vendorName}</p>
                      <div className="mt-1 flex items-center justify-between">
                        <div className="flex items-center gap-1 rounded-full border">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 rounded-full"
                            onClick={() =>
                              dispatch(
                                updateQuantity({
                                  productId: item.productId,
                                  variantId: item.variantId,
                                  quantity: item.quantity - 1,
                                })
                              )
                            }
                            aria-label="Decrease quantity"
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-5 text-center text-xs font-medium">{item.quantity}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 rounded-full"
                            onClick={() =>
                              dispatch(
                                updateQuantity({
                                  productId: item.productId,
                                  variantId: item.variantId,
                                  quantity: item.quantity + 1,
                                })
                              )
                            }
                            aria-label="Increase quantity"
                            disabled={item.quantity >= item.maxStock}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        <span className={cn("text-sm font-semibold")}>
                          {formatCurrency(item.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 self-start text-muted-foreground hover:text-destructive"
                      onClick={() =>
                        dispatch(removeItem({ productId: item.productId, variantId: item.variantId }))
                      }
                      aria-label="Remove item"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </li>
                ))}
              </ul>
            </ScrollArea>
            <SheetFooter className="border-t pt-4">
              <div className="flex w-full items-center justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="text-lg font-bold">{formatCurrency(subtotal)}</span>
              </div>
              <Button asChild size="lg" className="w-full shadow-brand-sm" onClick={() => dispatch(setCartOpen(false))}>
                <Link href="/checkout">Proceed to Checkout</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="w-full" onClick={() => dispatch(setCartOpen(false))}>
                <Link href="/cart">View Cart</Link>
              </Button>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
