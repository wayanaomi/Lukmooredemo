import type { Metadata } from "next";
import { CheckoutForm } from "@/components/marketplace/checkout-form";
import { Breadcrumbs } from "@/components/marketplace/breadcrumbs";

export const metadata: Metadata = {
  title: "Checkout",
};

export default function CheckoutPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "Cart", href: "/cart" }, { label: "Checkout" }]} />
      <h1 className="mt-4 font-heading text-2xl font-bold sm:text-3xl">Checkout</h1>
      <div className="mt-8">
        <CheckoutForm />
      </div>
    </div>
  );
}
