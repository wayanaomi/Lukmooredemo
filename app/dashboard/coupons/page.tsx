"use client";

import { Copy, Ticket } from "lucide-react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/shared/empty-state";
import { coupons } from "@/lib/data/customer";
import { formatDate } from "@/lib/utils/format";
import { cn } from "@/lib/utils";

export default function CouponsPage() {
  function copyCode(code: string) {
    navigator.clipboard.writeText(code);
    toast.success(`Copied "${code}" to clipboard`);
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-heading text-2xl font-bold">My Coupons</h1>
        <p className="text-sm text-muted-foreground">Available discount codes for your account.</p>
      </div>

      {coupons.length === 0 ? (
        <EmptyState icon={Ticket} title="No coupons available" description="Check back during our next sale." />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {coupons.map((coupon) => {
            const expired = new Date(coupon.expiresAt) < new Date();
            const disabled = !coupon.isActive || expired;
            return (
              <div
                key={coupon.id}
                className={cn(
                  "flex items-center gap-4 rounded-2xl border p-5",
                  disabled ? "bg-muted/30 opacity-70" : "bg-card"
                )}
              >
                <div className="bg-gradient-brand flex h-12 w-12 shrink-0 items-center justify-center rounded-xl">
                  <Ticket className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-mono text-sm font-bold">{coupon.code}</p>
                    {disabled && (
                      <Badge variant="outline" className="text-xs">
                        {expired ? "Expired" : "Used up"}
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{coupon.description}</p>
                  <p className="text-xs text-muted-foreground">
                    {coupon.minSpend ? `Min spend $${coupon.minSpend} · ` : ""}Expires {formatDate(coupon.expiresAt)}
                  </p>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  disabled={disabled}
                  onClick={() => copyCode(coupon.code)}
                >
                  <Copy className="h-3.5 w-3.5" />
                  Copy
                </Button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
