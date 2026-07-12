import Image from "next/image";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";

import { Breadcrumbs } from "@/components/marketplace/breadcrumbs";
import { vendorOrders } from "@/lib/data/vendor-dashboard";
import { formatCurrency, formatDate } from "@/lib/utils/format";
import { cn } from "@/lib/utils";

const statusStyles: Record<string, string> = {
  pending: "bg-warning/10 text-warning border-warning/20",
  processing: "bg-info/10 text-info border-info/20",
  shipped: "bg-info/10 text-info border-info/20",
  delivered: "bg-success/10 text-success border-success/20",
  cancelled: "bg-destructive/10 text-destructive border-destructive/20",
};

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const order = vendorOrders.find((o) => o.id === id);
  return { title: order ? `Order ${order.orderNumber}` : "Order" };
}

export default async function VendorOrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const order = vendorOrders.find((o) => o.id === id);
  if (!order) notFound();

  return (
    <div className="flex flex-col gap-6">
      <Breadcrumbs items={[{ label: "Orders", href: "/vendor/orders" }, { label: order.orderNumber }]} />

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-heading text-2xl font-bold">{order.orderNumber}</h1>
          <p className="text-sm text-muted-foreground">Placed on {formatDate(order.createdAt)}</p>
        </div>
        <Badge variant="outline" className={cn("capitalize", statusStyles[order.status])}>
          {order.status}
        </Badge>
      </div>

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
                  <p className="text-xs text-muted-foreground">Qty {item.quantity}</p>
                </div>
                <p className="text-sm font-semibold">{formatCurrency(item.price * item.quantity)}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 flex justify-between border-t pt-4 font-semibold">
            <span>Total</span>
            <span>{formatCurrency(order.total)}</span>
          </div>
        </div>

        <div className="rounded-2xl border bg-card p-6">
          <h2 className="font-heading font-semibold">Customer</h2>
          <div className="mt-3 flex items-center gap-3">
            <div className="relative h-10 w-10 overflow-hidden rounded-full bg-muted">
              <Image src={order.customerAvatar} alt={order.customerName} fill />
            </div>
            <p className="text-sm font-medium">{order.customerName}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
