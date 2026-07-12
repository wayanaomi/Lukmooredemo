import Image from "next/image";
import { Users } from "lucide-react";

import { EmptyState } from "@/components/shared/empty-state";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { vendorCustomers } from "@/lib/data/vendor-dashboard";
import { formatCurrency, formatDate } from "@/lib/utils/format";

export const metadata = { title: "Customers" };

export default function VendorCustomersPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-heading text-2xl font-bold">Customers</h1>
        <p className="text-sm text-muted-foreground">People who&apos;ve purchased from your store.</p>
      </div>

      {vendorCustomers.length === 0 ? (
        <EmptyState icon={Users} title="No customers yet" description="Your customers will appear here after their first purchase." />
      ) : (
        <div className="rounded-2xl border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Orders</TableHead>
                <TableHead>Total Spent</TableHead>
                <TableHead>Last Order</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {vendorCustomers.map((customer) => (
                <TableRow key={customer.name}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="relative h-8 w-8 overflow-hidden rounded-full bg-muted">
                        <Image src={customer.avatar} alt={customer.name} fill />
                      </div>
                      <span className="text-sm font-medium">{customer.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{customer.ordersCount}</TableCell>
                  <TableCell className="font-medium">{formatCurrency(customer.totalSpent)}</TableCell>
                  <TableCell className="text-muted-foreground">{formatDate(customer.lastOrderAt)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
