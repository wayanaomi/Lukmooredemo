"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowDownToLine, Loader2, Wallet } from "lucide-react";
import { toast } from "sonner";

import { StatCard } from "@/components/shared/stat-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { financeSummary, withdrawalHistory as initialHistory, type WithdrawalRequest } from "@/lib/data/vendor-dashboard";
import { formatCurrency, formatDate } from "@/lib/utils/format";
import { cn } from "@/lib/utils";

const withdrawSchema = z.object({
  amount: z.coerce.number().min(50000, "Minimum withdrawal is ₦50,000"),
  method: z.string().min(1, "Select a withdrawal method"),
});
type WithdrawInput = z.infer<typeof withdrawSchema>;

const statusStyles: Record<WithdrawalRequest["status"], string> = {
  completed: "bg-success/10 text-success border-success/20",
  processing: "bg-info/10 text-info border-info/20",
  pending: "bg-warning/10 text-warning border-warning/20",
  rejected: "bg-destructive/10 text-destructive border-destructive/20",
};

export default function VendorWithdrawalsPage() {
  const [history, setHistory] = useState<WithdrawalRequest[]>(initialHistory);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const form = useForm<WithdrawInput>({
    resolver: zodResolver(withdrawSchema),
    defaultValues: { amount: 0, method: "Bank transfer — GTBank ****4521" },
  });

  async function onSubmit(values: WithdrawInput) {
    setSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    const request: WithdrawalRequest = {
      id: `wd-${Date.now()}`,
      amount: values.amount,
      method: values.method,
      status: "pending",
      requestedAt: new Date().toISOString(),
    };
    setHistory((prev) => [request, ...prev]);
    setSubmitting(false);
    setDialogOpen(false);
    form.reset();
    toast.success("Withdrawal request submitted");
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-heading text-2xl font-bold">Withdrawals</h1>
          <p className="text-sm text-muted-foreground">Request payouts and track withdrawal history.</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-brand">
              <ArrowDownToLine className="h-4 w-4" />
              Request withdrawal
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Request withdrawal</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Amount ($)</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.01" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="method"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Withdrawal method</FormLabel>
                      <Select value={field.value} onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Bank transfer — GTBank ****4521">Bank transfer — GTBank ****4521</SelectItem>
                          <SelectItem value="Paystack wallet">Paystack wallet</SelectItem>
                          <SelectItem value="Flutterwave wallet">Flutterwave wallet</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button type="submit" disabled={submitting} className="bg-gradient-brand w-full">
                    {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
                    Submit request
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <StatCard label="Available Balance" value={formatCurrency(financeSummary.availableBalance)} icon={Wallet} />
        <StatCard
          label="Last Payout"
          value={formatCurrency(financeSummary.lastPayoutAmount)}
          icon={ArrowDownToLine}
        />
      </div>

      <div className="rounded-2xl border bg-card">
        <div className="border-b p-5">
          <h2 className="font-heading font-semibold">Withdrawal History</h2>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Method</TableHead>
              <TableHead>Requested</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {history.map((wd) => (
              <TableRow key={wd.id}>
                <TableCell>{wd.method}</TableCell>
                <TableCell className="text-muted-foreground">{formatDate(wd.requestedAt)}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={cn("capitalize", statusStyles[wd.status])}>
                    {wd.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right font-medium">{formatCurrency(wd.amount)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
