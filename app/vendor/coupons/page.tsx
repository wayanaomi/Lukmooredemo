"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Plus, Tag, Trash2 } from "lucide-react";
import { toast } from "sonner";

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
import { EmptyState } from "@/components/shared/empty-state";
import { vendorCoupons as initialCoupons, type VendorCoupon } from "@/lib/data/vendor-dashboard";
import { formatDate } from "@/lib/utils/format";

const couponSchema = z.object({
  code: z.string().min(3, "Enter a coupon code").toUpperCase(),
  description: z.string().min(3, "Enter a description"),
  type: z.enum(["percentage", "fixed"]),
  value: z.coerce.number().min(1, "Enter a value"),
  usageLimit: z.coerce.number().min(1, "Enter a usage limit"),
});
type CouponInput = z.infer<typeof couponSchema>;

export default function VendorCouponsPage() {
  const [coupons, setCoupons] = useState<VendorCoupon[]>(initialCoupons);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const form = useForm<CouponInput>({
    resolver: zodResolver(couponSchema),
    defaultValues: { code: "", description: "", type: "percentage", value: 10, usageLimit: 100 },
  });

  function handleDelete(id: string) {
    setCoupons((prev) => prev.filter((c) => c.id !== id));
    toast.success("Coupon deleted");
  }

  function handleToggle(id: string) {
    setCoupons((prev) => prev.map((c) => (c.id === id ? { ...c, isActive: !c.isActive } : c)));
  }

  async function onSubmit(values: CouponInput) {
    setSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    const coupon: VendorCoupon = {
      id: `vcoupon-${Date.now()}`,
      code: values.code,
      description: values.description,
      type: values.type,
      value: values.value,
      usageLimit: values.usageLimit,
      usageCount: 0,
      expiresAt: new Date(Date.now() + 30 * 86400000).toISOString(),
      isActive: true,
    };
    setCoupons((prev) => [coupon, ...prev]);
    setSubmitting(false);
    setDialogOpen(false);
    form.reset();
    toast.success("Coupon created");
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-heading text-2xl font-bold">Coupons</h1>
          <p className="text-sm text-muted-foreground">Create discount codes to boost sales.</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-brand">
              <Plus className="h-4 w-4" />
              Create coupon
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create new coupon</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Coupon code</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. SUMMER20" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. 20% off summer collection" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-3">
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Discount type</FormLabel>
                        <Select value={field.value} onValueChange={field.onChange}>
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="percentage">Percentage</SelectItem>
                            <SelectItem value="fixed">Fixed amount</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="value"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Value</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="usageLimit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Usage limit</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button type="submit" disabled={submitting} className="bg-gradient-brand w-full">
                    {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
                    Create coupon
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      {coupons.length === 0 ? (
        <EmptyState icon={Tag} title="No coupons yet" description="Create a coupon to attract more buyers." />
      ) : (
        <div className="rounded-2xl border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Code</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Discount</TableHead>
                <TableHead>Usage</TableHead>
                <TableHead>Expires</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {coupons.map((coupon) => (
                <TableRow key={coupon.id}>
                  <TableCell className="font-mono font-semibold">{coupon.code}</TableCell>
                  <TableCell className="max-w-55 truncate text-muted-foreground">{coupon.description}</TableCell>
                  <TableCell>{coupon.type === "percentage" ? `${coupon.value}%` : `$${coupon.value}`}</TableCell>
                  <TableCell>
                    {coupon.usageCount}/{coupon.usageLimit}
                  </TableCell>
                  <TableCell className="text-muted-foreground">{formatDate(coupon.expiresAt)}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        coupon.isActive
                          ? "border-success/20 bg-success/10 text-success cursor-pointer"
                          : "border-border bg-muted text-muted-foreground cursor-pointer"
                      }
                      onClick={() => handleToggle(coupon.id)}
                    >
                      {coupon.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button size="icon-sm" variant="ghost" className="text-destructive" onClick={() => handleDelete(coupon.id)}>
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
