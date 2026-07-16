"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EmptyState } from "@/components/shared/empty-state";
import { ShoppingBag } from "lucide-react";
import { vendorOrders as initialOrders, type VendorOrderStatus } from "@/lib/data/vendor-dashboard";
import { formatCurrency, formatDate } from "@/lib/utils/format";
import { cn } from "@/lib/utils";

const statusStyles: Record<VendorOrderStatus, string> = {
  pending: "bg-warning/10 text-warning border-warning/20",
  processing: "bg-info/10 text-info border-info/20",
  shipped: "bg-info/10 text-info border-info/20",
  delivered: "bg-success/10 text-success border-success/20",
  cancelled: "bg-destructive/10 text-destructive border-destructive/20",
};

const statusOptions: VendorOrderStatus[] = ["pending", "processing", "shipped", "delivered", "cancelled"];

export default function VendorOrdersPage() {
  const [orders, setOrders] = useState(initialOrders);

  function updateStatus(id: string, status: VendorOrderStatus) {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
    toast.success("Order status updated");
  }

  if (orders.length === 0) {
    return <EmptyState icon={ShoppingBag} title="No orders yet" description="Orders will appear here once customers buy your products." />;
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-heading text-2xl font-bold">Orders</h1>
        <p className="text-sm text-muted-foreground">Manage and fulfill your incoming orders.</p>
      </div>

      <div className="rounded-2xl border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>
                  <Link href={`/vendor/orders/${order.id}`} className="font-medium hover:text-brand-red">
                    {order.orderNumber}
                  </Link>
                </TableCell>
                <TableCell>{order.customerName}</TableCell>
                <TableCell className="text-muted-foreground">{formatDate(order.createdAt)}</TableCell>
                <TableCell className="text-muted-foreground">{order.items.length}</TableCell>
                <TableCell>
                  <Select value={order.status} onValueChange={(v) => updateStatus(order.id, v as VendorOrderStatus)}>
                    <SelectTrigger className={cn("h-8 w-36 capitalize", statusStyles[order.status])}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {statusOptions.map((status) => (
                        <SelectItem key={status} value={status} className="capitalize">
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell className="text-right font-medium">{formatCurrency(order.total)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
