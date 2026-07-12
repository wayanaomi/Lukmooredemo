import { ArrowDownRight, ArrowUpRight, DollarSign, Wallet } from "lucide-react";

import { StatCard } from "@/components/shared/stat-card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { financeSummary, transactions } from "@/lib/data/vendor-dashboard";
import { formatCurrency, formatDate } from "@/lib/utils/format";
import { cn } from "@/lib/utils";

const statusStyles: Record<string, string> = {
  completed: "bg-success/10 text-success border-success/20",
  pending: "bg-warning/10 text-warning border-warning/20",
  failed: "bg-destructive/10 text-destructive border-destructive/20",
};

export default function VendorFinancePage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-heading text-2xl font-bold">Finance</h1>
        <p className="text-sm text-muted-foreground">Track your earnings and transaction history.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label="Available Balance" value={formatCurrency(financeSummary.availableBalance)} icon={Wallet} />
        <StatCard label="Pending Balance" value={formatCurrency(financeSummary.pendingBalance)} icon={DollarSign} />
        <StatCard label="Total Earnings" value={formatCurrency(financeSummary.totalEarnings)} icon={DollarSign} />
      </div>

      <div className="rounded-2xl border bg-card">
        <div className="border-b p-5">
          <h2 className="font-heading font-semibold">Transaction History</h2>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Description</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((txn) => (
              <TableRow key={txn.id}>
                <TableCell>{txn.description}</TableCell>
                <TableCell className="capitalize text-muted-foreground">{txn.type}</TableCell>
                <TableCell className="text-muted-foreground">{formatDate(txn.createdAt)}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={cn("capitalize", statusStyles[txn.status])}>
                    {txn.status}
                  </Badge>
                </TableCell>
                <TableCell
                  className={cn(
                    "flex items-center justify-end gap-1 text-right font-medium",
                    txn.amount >= 0 ? "text-success" : "text-destructive"
                  )}
                >
                  {txn.amount >= 0 ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
                  {formatCurrency(Math.abs(txn.amount))}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
