import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2, Circle, Download, MessageCircle } from "lucide-react";

import { Breadcrumbs } from "@/components/marketplace/breadcrumbs";
import { OrderStatusBadge } from "@/components/dashboard/order-status-badge";
import { Button } from "@/components/ui/button";
import { orders } from "@/lib/data/customer";
import { formatCurrency, formatDate, formatDateTime } from "@/lib/utils/format";
import { cn } from "@/lib/utils";
import type { OrderStatus } from "@/types/marketplace";

const steps: { status: OrderStatus; label: string }[] = [
  { status: "pending", label: "Placed" },
  { status: "processing", label: "Processing" },
  { status: "shipped", label: "Shipped" },
  { status: "out_for_delivery", label: "Out for delivery" },
  { status: "delivered", label: "Delivered" },
];

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const order = orders.find((o) => o.id === id);
  return { title: order ? `Order ${order.orderNumber}` : "Order" };
}

export default async function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const order = orders.find((o) => o.id === id);
  if (!order) notFound();

  const currentStepIndex = steps.findIndex((s) => s.status === order.status);
  const isTerminalIssue = order.status === "cancelled" || order.status === "refunded";

  return (
    <div className="flex flex-col gap-6">
      <Breadcrumbs items={[{ label: "Orders", href: "/dashboard/orders" }, { label: order.orderNumber }]} />

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-heading text-2xl font-bold">{order.orderNumber}</h1>
          <p className="text-sm text-muted-foreground">Placed on {formatDate(order.createdAt)}</p>
        </div>
        <div className="flex items-center gap-2">
          <OrderStatusBadge status={order.status} className="text-sm" />
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4" />
            Invoice
          </Button>
        </div>
      </div>

      {!isTerminalIssue && (
        <div className="rounded-2xl border bg-card p-6">
          <div className="relative flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.status} className="relative flex flex-1 flex-col items-center text-center">
                <div
                  className={cn(
                    "z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 bg-card",
                    index <= currentStepIndex
                      ? "border-brand-red bg-brand-red text-white"
                      : "border-muted-foreground/30 text-muted-foreground"
                  )}
                >
                  {index <= currentStepIndex ? <CheckCircle2 className="h-4 w-4" /> : <Circle className="h-3 w-3" />}
                </div>
                <p className="mt-2 max-w-20 text-[11px] text-muted-foreground">{step.label}</p>
                {index < steps.length - 1 && (
                  <div
                    className={cn(
                      "absolute top-4 left-1/2 h-0.5 w-full",
                      index < currentStepIndex ? "bg-brand-red" : "bg-muted-foreground/20"
                    )}
                  />
                )}
              </div>
            ))}
          </div>
          {order.trackingNumber && (
            <p className="mt-6 text-center text-sm text-muted-foreground">
              Tracking number: <span className="font-medium text-foreground">{order.trackingNumber}</span>
            </p>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border bg-card p-6 lg:col-span-2">
          <h2 className="font-heading font-semibold">Items</h2>
          <div className="mt-4 flex flex-col gap-4">
            {order.items.map((item, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-muted">
                  <Image src={item.image} alt={item.title} fill className="object-cover" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{item.title}</p>
                  <p className="text-xs text-muted-foreground">
                    Sold by {item.vendorName} · Qty {item.quantity}
                  </p>
                </div>
                <p className="text-sm font-semibold">{formatCurrency(item.price * item.quantity)}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-col gap-2 border-t pt-4 text-sm">
            <div className="flex justify-between text-muted-foreground">
              <span>Subtotal</span>
              <span>{formatCurrency(order.subtotal)}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Shipping</span>
              <span>{order.shipping === 0 ? "Free" : formatCurrency(order.shipping)}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Tax</span>
              <span>{formatCurrency(order.tax)}</span>
            </div>
            <div className="flex justify-between border-t pt-2 font-semibold">
              <span>Total</span>
              <span>{formatCurrency(order.total)}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="rounded-2xl border bg-card p-6">
            <h2 className="font-heading font-semibold">Shipping Address</h2>
            <p className="mt-2 text-sm">{order.shippingAddress.fullName}</p>
            <p className="text-sm text-muted-foreground">
              {order.shippingAddress.line1}
              {order.shippingAddress.line2 ? `, ${order.shippingAddress.line2}` : ""}
            </p>
            <p className="text-sm text-muted-foreground">
              {order.shippingAddress.city}, {order.shippingAddress.state}, {order.shippingAddress.country}
            </p>
            <p className="text-sm text-muted-foreground">{order.shippingAddress.phone}</p>
          </div>

          <div className="rounded-2xl border bg-card p-6">
            <h2 className="font-heading font-semibold">Payment</h2>
            <p className="mt-2 text-sm text-muted-foreground">Paid via {order.paymentMethod}</p>
          </div>

          <div className="rounded-2xl border bg-card p-6">
            <h2 className="font-heading font-semibold">Status History</h2>
            <div className="mt-3 flex flex-col gap-3">
              {order.statusHistory.map((entry, index) => (
                <div key={index} className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-red" />
                  <div>
                    <p className="font-medium capitalize">{entry.status.replace(/_/g, " ")}</p>
                    <p className="text-xs text-muted-foreground">{formatDateTime(entry.date)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Button variant="outline" asChild>
            <Link href="/dashboard/support">
              <MessageCircle className="h-4 w-4" />
              Need help with this order?
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
