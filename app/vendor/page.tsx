import Image from "next/image";
import Link from "next/link";
import { DollarSign, Package, ShoppingBag, Star } from "lucide-react";

import { StatCard } from "@/components/shared/stat-card";
import { RevenueChart } from "@/components/dashboard/revenue-chart";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  currentVendor,
  financeSummary,
  topProducts,
  vendorOrders,
  vendorProducts,
} from "@/lib/data/vendor-dashboard";
import { formatCurrency, formatDate } from "@/lib/utils/format";
import { cn } from "@/lib/utils";

const statusStyles: Record<string, string> = {
  pending: "bg-warning/10 text-warning border-warning/20",
  processing: "bg-info/10 text-info border-info/20",
  shipped: "bg-info/10 text-info border-info/20",
  delivered: "bg-success/10 text-success border-success/20",
  cancelled: "bg-destructive/10 text-destructive border-destructive/20",
};

export default function VendorOverviewPage() {
  const recentOrders = vendorOrders.slice(0, 6);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-heading text-2xl font-bold">Welcome back, {currentVendor.name}</h1>
        <p className="text-sm text-muted-foreground">Here&apos;s how your store is performing.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Available Balance"
          value={formatCurrency(financeSummary.availableBalance)}
          icon={DollarSign}
        />
        <StatCard label="Total Products" value={String(vendorProducts.length)} icon={Package} />
        <StatCard label="Total Orders" value={String(vendorOrders.length)} icon={ShoppingBag} />
        <StatCard
          label="Store Rating"
          value={currentVendor.rating.toFixed(1)}
          icon={Star}
          trend={2.4}
          trendLabel="vs last month"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border bg-card p-6 lg:col-span-2">
          <h2 className="font-heading font-semibold">Revenue Overview</h2>
          <RevenueChart />
        </div>

        <div className="rounded-2xl border bg-card p-6">
          <h2 className="font-heading font-semibold">Top Products</h2>
          <div className="mt-4 flex flex-col gap-4">
            {topProducts.map((product) => (
              <div key={product.id} className="flex items-center gap-3">
                <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-muted">
                  <Image src={product.images[0]} alt={product.title} fill className="object-cover" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{product.title}</p>
                  <p className="text-xs text-muted-foreground">{product.soldCount} sold</p>
                </div>
                <p className="text-sm font-semibold">{formatCurrency(product.price)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-2xl border bg-card">
        <div className="flex items-center justify-between border-b p-5">
          <h2 className="font-heading font-semibold">Recent Orders</h2>
          <Button asChild variant="ghost" size="sm">
            <Link href="/vendor/orders">View all</Link>
          </Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>
                  <Link href={`/vendor/orders/${order.id}`} className="font-medium hover:text-brand-red">
                    {order.orderNumber}
                  </Link>
                </TableCell>
                <TableCell>{order.customerName}</TableCell>
                <TableCell className="text-muted-foreground">{formatDate(order.createdAt)}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={cn("capitalize", statusStyles[order.status])}>
                    {order.status}
                  </Badge>
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
