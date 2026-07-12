"use client";

import { useState } from "react";
import { CheckCircle2, Circle, PackageSearch, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EmptyState } from "@/components/shared/empty-state";
import { getOrderByNumber } from "@/lib/data/customer";
import { formatCurrency, formatDate } from "@/lib/utils/format";
import { cn } from "@/lib/utils";
import type { Order, OrderStatus } from "@/types/marketplace";

const steps: { status: OrderStatus; label: string }[] = [
  { status: "pending", label: "Order placed" },
  { status: "processing", label: "Processing" },
  { status: "shipped", label: "Shipped" },
  { status: "out_for_delivery", label: "Out for delivery" },
  { status: "delivered", label: "Delivered" },
];

export default function TrackOrderPage() {
  const [orderNumber, setOrderNumber] = useState("");
  const [result, setResult] = useState<Order | null | undefined>(undefined);

  function handleSearch() {
    const found = getOrderByNumber(orderNumber.trim());
    setResult(found ?? null);
  }

  const currentStepIndex = result ? steps.findIndex((s) => s.status === result.status) : -1;

  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="font-heading text-3xl font-bold">Track Your Order</h1>
        <p className="mt-2 text-muted-foreground">
          Enter your order number to see real-time delivery status. Try <strong>LKM-100001</strong>.
        </p>
      </div>

      <div className="mx-auto mt-8 flex max-w-md gap-2">
        <Input
          placeholder="e.g. LKM-100001"
          value={orderNumber}
          onChange={(e) => setOrderNumber(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <Button onClick={handleSearch} className="gap-2 shadow-brand-sm">
          <Search className="h-4 w-4" /> Track
        </Button>
      </div>

      {result === null && (
        <EmptyState
          icon={PackageSearch}
          className="mt-10"
          title="Order not found"
          description="Double-check your order number and try again."
        />
      )}

      {result && (
        <div className="mt-10 rounded-2xl border bg-card p-6">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <p className="text-sm text-muted-foreground">Order</p>
              <p className="font-heading text-lg font-bold">{result.orderNumber}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Placed on</p>
              <p className="text-sm font-medium">{formatDate(result.createdAt)}</p>
            </div>
          </div>

          <div className="mt-8 flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.status} className="flex flex-1 flex-col items-center text-center">
                <div
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full border-2",
                    index <= currentStepIndex
                      ? "border-brand-red bg-brand-red text-white"
                      : "border-muted-foreground/30 text-muted-foreground"
                  )}
                >
                  {index <= currentStepIndex ? <CheckCircle2 className="h-4 w-4" /> : <Circle className="h-3 w-3" />}
                </div>
                <p className="mt-2 max-w-[70px] text-[11px] text-muted-foreground">{step.label}</p>
                {index < steps.length - 1 && (
                  <div
                    className={cn(
                      "absolute h-0.5 w-full translate-y-4",
                      index < currentStepIndex ? "bg-brand-red" : "bg-muted-foreground/20"
                    )}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-col gap-3">
            {result.items.map((item, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <span>
                  {item.title} × {item.quantity}
                </span>
                <span className="font-medium">{formatCurrency(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>

          {result.trackingNumber && (
            <p className="mt-6 text-sm text-muted-foreground">
              Tracking number: <span className="font-medium text-foreground">{result.trackingNumber}</span>
            </p>
          )}
        </div>
      )}
    </div>
  );
}
