import Link from "next/link";
import { Bell, Package, Ticket } from "lucide-react";

import { StatCard } from "@/components/shared/stat-card";
import { WishlistStatCard } from "@/components/dashboard/wishlist-stat-card";
import { OrderStatusBadge } from "@/components/dashboard/order-status-badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { coupons, notifications, orders } from "@/lib/data/customer";
import { formatCurrency, formatDate } from "@/lib/utils/format";

export default function DashboardOverviewPage() {
  const recentOrders = orders.slice(0, 5);
  const activeCoupons = coupons.filter((c) => c.isActive).length;
  const unreadNotifications = notifications.filter((n) => !n.read).length;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-heading text-2xl font-bold">Welcome back</h1>
        <p className="text-sm text-muted-foreground">Here&apos;s what&apos;s happening with your account.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Orders" value={String(orders.length)} icon={Package} />
        <WishlistStatCard />
        <StatCard label="Active Coupons" value={String(activeCoupons)} icon={Ticket} />
        <StatCard label="Unread Notifications" value={String(unreadNotifications)} icon={Bell} />
      </div>

      <div className="rounded-2xl border bg-card">
        <div className="flex items-center justify-between border-b p-5">
          <h2 className="font-heading font-semibold">Recent Orders</h2>
          <Button asChild variant="ghost" size="sm">
            <Link href="/dashboard/orders">View all</Link>
          </Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>
                  <Link href={`/dashboard/orders/${order.id}`} className="font-medium hover:text-brand-red">
                    {order.orderNumber}
                  </Link>
                </TableCell>
                <TableCell className="text-muted-foreground">{formatDate(order.createdAt)}</TableCell>
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
