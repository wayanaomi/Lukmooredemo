"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Loader2, Lock, ShieldCheck, ShoppingBag } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { EmptyState } from "@/components/shared/empty-state";
import { clearCart } from "@/store/slices/cart-slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { checkoutSchema, type CheckoutInput } from "@/app/(marketing)/checkout/schema";
import { formatCurrency } from "@/lib/utils/format";
import { nanoid } from "nanoid";

const paymentOptions = [
  { value: "paystack", label: "Paystack", description: "Cards, bank transfer, USSD" },
  { value: "flutterwave", label: "Flutterwave", description: "Cards, mobile money, bank transfer" },
  { value: "stripe", label: "Stripe", description: "International cards" },
] as const;

export function CheckoutForm() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { items, couponCode } = useAppSelector((state) => state.cart);
  const [submitting, setSubmitting] = useState(false);

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items]
  );
  const shipping = subtotal > 50 || subtotal === 0 ? 0 : 6.99;
  const tax = Math.round(subtotal * 0.03 * 100) / 100;
  const total = subtotal + shipping + tax;

  const form = useForm<CheckoutInput>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      line1: "",
      line2: "",
      city: "",
      state: "",
      country: "Nigeria",
      postalCode: "",
      paymentMethod: "paystack",
      saveAddress: true,
    },
  });

  async function onSubmit(values: CheckoutInput) {
    setSubmitting(true);
    try {
      // Simulate gateway round-trip. In production this calls
      // lib/payments/{paystack,flutterwave,stripe}.ts server actions/routes
      // once NEXT_PUBLIC_*_PUBLIC_KEY / *_SECRET_KEY are configured.
      await new Promise((resolve) => setTimeout(resolve, 1200));

      const orderNumber = `LKM-${nanoid(6).toUpperCase()}`;
      const order = {
        orderNumber,
        createdAt: new Date().toISOString(),
        items,
        subtotal,
        shipping,
        tax,
        total,
        paymentMethod: values.paymentMethod,
        shippingAddress: values,
        couponCode,
      };

      if (typeof window !== "undefined") {
        window.sessionStorage.setItem("lukmoore.lastOrder", JSON.stringify(order));
      }

      dispatch(clearCart());
      toast.success("Payment successful! Your order has been placed.");
      router.push(`/checkout/success?order=${orderNumber}`);
    } catch {
      toast.error("Something went wrong processing your payment. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (items.length === 0) {
    return (
      <EmptyState
        icon={ShoppingBag}
        title="Your cart is empty"
        description="Add items to your cart before checking out."
        action={
          <Button asChild className="mt-2">
            <Link href="/marketplace">Browse Marketplace</Link>
          </Button>
        }
      />
    );
  }

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_380px]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-8">
          <section>
            <h2 className="font-heading text-lg font-bold">Shipping Information</h2>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FormField control={form.control} name="fullName" render={({ field }) => (
                <FormItem className="sm:col-span-2">
                  <FormLabel>Full name</FormLabel>
                  <FormControl><Input {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="email" render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl><Input type="email" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="phone" render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone number</FormLabel>
                  <FormControl><Input {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="line1" render={({ field }) => (
                <FormItem className="sm:col-span-2">
                  <FormLabel>Street address</FormLabel>
                  <FormControl><Input {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="line2" render={({ field }) => (
                <FormItem className="sm:col-span-2">
                  <FormLabel>Apartment, suite, etc. (optional)</FormLabel>
                  <FormControl><Input {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="city" render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl><Input {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="state" render={({ field }) => (
                <FormItem>
                  <FormLabel>State / Region</FormLabel>
                  <FormControl><Input {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="country" render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <FormControl><Input {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="postalCode" render={({ field }) => (
                <FormItem>
                  <FormLabel>Postal code</FormLabel>
                  <FormControl><Input {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>
          </section>

          <section>
            <h2 className="font-heading text-lg font-bold">Payment Method</h2>
            <FormField
              control={form.control}
              name="paymentMethod"
              render={({ field }) => (
                <FormItem className="mt-4">
                  <FormControl>
                    <RadioGroup value={field.value} onValueChange={field.onChange} className="flex flex-col gap-3">
                      {paymentOptions.map((option) => (
                        <Label
                          key={option.value}
                          htmlFor={option.value}
                          className="flex cursor-pointer items-center gap-3 rounded-xl border p-4 text-sm font-normal data-[state=checked]:border-brand-red"
                          data-state={field.value === option.value ? "checked" : "unchecked"}
                        >
                          <RadioGroupItem value={option.value} id={option.value} />
                          <span className="flex-1">
                            <span className="block font-medium text-foreground">{option.label}</span>
                            <span className="block text-xs text-muted-foreground">{option.description}</span>
                          </span>
                        </Label>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </section>

          <Button type="submit" size="lg" className="gap-2 shadow-brand-sm" disabled={submitting}>
            {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Lock className="h-4 w-4" />}
            Pay {formatCurrency(total)}
          </Button>
        </form>
      </Form>

      <div className="h-fit rounded-2xl border bg-card p-6">
        <h2 className="font-heading text-lg font-bold">Order Summary</h2>
        <ul className="mt-4 flex flex-col gap-3">
          {items.map((item) => (
            <li key={`${item.productId}-${item.variantId ?? "d"}`} className="flex gap-3">
              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-muted">
                <Image src={item.image} alt={item.title} fill className="object-cover" />
              </div>
              <div className="flex-1 text-sm">
                <p className="line-clamp-1 font-medium">{item.title}</p>
                <p className="text-xs text-muted-foreground">Qty {item.quantity}</p>
              </div>
              <span className="text-sm font-semibold">{formatCurrency(item.price * item.quantity)}</span>
            </li>
          ))}
        </ul>
        <div className="mt-5 flex flex-col gap-2 border-t pt-4 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Subtotal</span>
            <span>{formatCurrency(subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Shipping</span>
            <span>{shipping === 0 ? "Free" : formatCurrency(shipping)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Tax</span>
            <span>{formatCurrency(tax)}</span>
          </div>
        </div>
        <div className="mt-3 flex justify-between border-t pt-3 font-heading text-lg font-bold">
          <span>Total</span>
          <span>{formatCurrency(total)}</span>
        </div>
        <p className="mt-4 flex items-center gap-1.5 text-xs text-muted-foreground">
          <ShieldCheck className="h-3.5 w-3.5 text-success" /> Secured by 256-bit SSL encryption
        </p>
      </div>
    </div>
  );
}
