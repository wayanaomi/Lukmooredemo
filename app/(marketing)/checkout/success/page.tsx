"use client";

import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, FileText, Package } from "lucide-react";

import { Button } from "@/components/ui/button";
import { formatCurrency, formatDateTime } from "@/lib/utils/format";

interface StoredOrder {
  orderNumber: string;
  createdAt: string;
  total: number;
  paymentMethod: string;
  items: { title: string; quantity: number }[];
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense>
      <CheckoutSuccessContent />
    </Suspense>
  );
}

function CheckoutSuccessContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("order");
  const [order, setOrder] = useState<StoredOrder | null>(null);

  useEffect(() => {
    const raw = window.sessionStorage.getItem("lukmoore.lastOrder");
    if (raw) {
      try {
        setOrder(JSON.parse(raw));
      } catch {
        setOrder(null);
      }
    }
  }, []);

  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center px-4 py-20 text-center sm:px-6 lg:px-8">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-success/10">
        <CheckCircle2 className="h-10 w-10 text-success" />
      </div>
      <h1 className="font-heading mt-6 text-3xl font-bold">Order placed successfully!</h1>
      <p className="mt-2 text-muted-foreground">
        Thank you for shopping with Lukmoore. A confirmation email is on its way.
      </p>

      <div className="mt-8 w-full rounded-2xl border bg-card p-6 text-left">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Order number</span>
          <span className="font-heading font-bold">{orderNumber ?? order?.orderNumber ?? "—"}</span>
        </div>
        {order && (
          <>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Placed on</span>
              <span className="text-sm">{formatDateTime(order.createdAt)}</span>
            </div>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Payment method</span>
              <span className="text-sm capitalize">{order.paymentMethod}</span>
            </div>
            <div className="mt-2 flex items-center justify-between border-t pt-3">
              <span className="font-medium">Total paid</span>
              <span className="font-heading text-lg font-bold">{formatCurrency(order.total)}</span>
            </div>
          </>
        )}
      </div>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button asChild size="lg" className="gap-2 shadow-brand-sm">
          <Link href="/track-order">
            <Package className="h-4 w-4" /> Track Order
          </Link>
        </Button>
        <Button asChild size="lg" variant="outline" className="gap-2">
          <Link href="/dashboard/orders">
            <FileText className="h-4 w-4" /> View Order History
          </Link>
        </Button>
        <Button asChild size="lg" variant="ghost">
          <Link href="/marketplace">Continue Shopping</Link>
        </Button>
      </div>
    </div>
  );
}
