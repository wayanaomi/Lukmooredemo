"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { RevenueChart } from "@/components/dashboard/revenue-chart";
import { StatCard } from "@/components/shared/stat-card";
import { revenueTrend, topProducts, vendorProducts } from "@/lib/data/vendor-dashboard";
import { formatCompactNumber, formatCurrency } from "@/lib/utils/format";
import { Eye, ShoppingCart, TrendingUp, Users } from "lucide-react";

export default function VendorAnalyticsPage() {
  const totalRevenue = revenueTrend.reduce((sum, r) => sum + r.revenue, 0);
  const totalOrders = revenueTrend.reduce((sum, r) => sum + r.orders, 0);
  const conversionRate = 3.8;
  const totalViews = vendorProducts.reduce((sum, p) => sum + p.soldCount * 14, 0);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-heading text-2xl font-bold">Analytics</h1>
        <p className="text-sm text-muted-foreground">Insights into your store&apos;s performance.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Revenue (7mo)" value={formatCurrency(totalRevenue)} icon={TrendingUp} />
        <StatCard label="Total Orders" value={formatCompactNumber(totalOrders)} icon={ShoppingCart} />
        <StatCard label="Store Views" value={formatCompactNumber(totalViews)} icon={Eye} />
        <StatCard label="Conversion Rate" value={`${conversionRate}%`} icon={Users} />
      </div>

      <div className="rounded-2xl border bg-card p-6">
        <h2 className="font-heading font-semibold">Revenue Trend</h2>
        <RevenueChart />
      </div>

      <div className="rounded-2xl border bg-card p-6">
        <h2 className="font-heading font-semibold">Orders by Month</h2>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={revenueTrend} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid vertical={false} stroke="var(--border)" />
              <XAxis dataKey="month" tickLine={false} axisLine={false} fontSize={12} />
              <YAxis tickLine={false} axisLine={false} fontSize={12} />
              <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid var(--border)" }} />
              <Bar dataKey="orders" fill="var(--brand-orange)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rounded-2xl border bg-card p-6">
        <h2 className="font-heading font-semibold">Best Performing Products</h2>
        <div className="mt-4 flex flex-col gap-3">
          {topProducts.map((product) => (
            <div key={product.id} className="flex items-center justify-between text-sm">
              <span className="truncate">{product.title}</span>
              <span className="font-medium">{product.soldCount} sold</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
