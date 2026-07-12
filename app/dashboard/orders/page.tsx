import Link from "next/link";
import { Package } from "lucide-react";

import { OrderStatusBadge } from "@/components/dashboard/order-status-badge";
import { EmptyState } from "@/components/shared/empty-state";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { orders } from "@/lib/data/customer";
import { formatCurrency, formatDate } from "@/lib/utils/format";

export const metadata = { title: "My Orders" };

export default function OrdersPage() {
  if (orders.length === 0) {
    return (
      <EmptyState
        icon={Package}
        title="No orders yet"
        description="When you place an order, it will show up here."
      />
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-heading text-2xl font-bold">My Orders</h1>
        <p className="text-sm text-muted-foreground">Track and manage your order history.</p>
      </div>

      <div className="rounded-2xl border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order</TableHead>
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
                  <Link href={`/dashboard/orders/${order.id}`} className="font-medium hover:text-brand-red">
                    {order.orderNumber}
                  </Link>
                </TableCell>
                <TableCell className="text-muted-foreground">{formatDate(order.createdAt)}</TableCell>
                <TableCell className="text-muted-foreground">
                  {order.items.length} item{order.items.length > 1 ? "s" : ""}
                </TableCell>
                <TableCell>
                  <OrderStatusBadge status={order.status} />
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
