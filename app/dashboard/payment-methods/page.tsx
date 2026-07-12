"use client";

import { useState } from "react";
import { CreditCard, Plus, Star, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/shared/empty-state";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { savedPaymentMethods as initialMethods, type SavedPaymentMethod } from "@/lib/data/customer";
import { nanoid } from "nanoid";

export default function PaymentMethodsPage() {
  const [methods, setMethods] = useState<SavedPaymentMethod[]>(initialMethods);
  const [dialogOpen, setDialogOpen] = useState(false);

  function handleAdd() {
    const newMethod: SavedPaymentMethod = {
      id: nanoid(),
      brand: "Visa",
      last4: String(Math.floor(1000 + Math.random() * 9000)),
      expiryMonth: 12,
      expiryYear: new Date().getFullYear() + 3,
      isDefault: methods.length === 0,
      provider: "Stripe",
    };
    setMethods((prev) => [...prev, newMethod]);
    toast.success("Payment method added");
    setDialogOpen(false);
  }

  function handleRemove(id: string) {
    setMethods((prev) => prev.filter((m) => m.id !== id));
    toast.success("Payment method removed");
  }

  function handleSetDefault(id: string) {
    setMethods((prev) => prev.map((m) => ({ ...m, isDefault: m.id === id })));
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-heading text-2xl font-bold">Payment Methods</h1>
          <p className="text-sm text-muted-foreground">Manage your saved cards for faster checkout.</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-brand">
              <Plus className="h-4 w-4" />
              Add card
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add payment method</DialogTitle>
              <DialogDescription>
                Card details are securely tokenized by our payment partners (Paystack, Flutterwave, or
                Stripe) and never stored on our servers.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button onClick={handleAdd} className="bg-gradient-brand w-full">
                Continue to secure checkout
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {methods.length === 0 ? (
        <EmptyState icon={CreditCard} title="No payment methods saved" description="Add a card to check out faster." />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {methods.map((method) => (
            <div key={method.id} className="flex flex-col gap-3 rounded-2xl border bg-card p-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="bg-gradient-brand flex h-9 w-9 items-center justify-center rounded-lg">
                    <CreditCard className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">
                      {method.brand} •••• {method.last4}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Expires {String(method.expiryMonth).padStart(2, "0")}/{method.expiryYear}
                    </p>
                  </div>
                </div>
                {method.isDefault && (
                  <span className="flex items-center gap-1 text-xs font-medium text-brand-red">
                    <Star className="h-3 w-3 fill-brand-red" /> Default
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                {!method.isDefault && (
                  <Button size="sm" variant="outline" onClick={() => handleSetDefault(method.id)}>
                    Set default
                  </Button>
                )}
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-destructive"
                  onClick={() => handleRemove(method.id)}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  Remove
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
