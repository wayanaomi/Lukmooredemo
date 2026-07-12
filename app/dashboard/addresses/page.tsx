"use client";

import { useState } from "react";
import { MapPin, Pencil, Plus, Star, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { EmptyState } from "@/components/shared/empty-state";
import { addresses as initialAddresses } from "@/lib/data/customer";
import { nanoid } from "nanoid";
import type { Address } from "@/types/marketplace";

export default function AddressesPage() {
  const [addresses, setAddresses] = useState<Address[]>(initialAddresses);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Address | null>(null);

  function openNew() {
    setEditing(null);
    setDialogOpen(true);
  }

  function openEdit(address: Address) {
    setEditing(address);
    setDialogOpen(true);
  }

  function handleDelete(id: string) {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
    toast.success("Address removed");
  }

  function handleSetDefault(id: string) {
    setAddresses((prev) => prev.map((a) => ({ ...a, isDefault: a.id === id })));
  }

  function handleSave(formData: FormData) {
    const address: Address = {
      id: editing?.id ?? nanoid(),
      label: String(formData.get("label")),
      fullName: String(formData.get("fullName")),
      phone: String(formData.get("phone")),
      line1: String(formData.get("line1")),
      line2: String(formData.get("line2") || ""),
      city: String(formData.get("city")),
      state: String(formData.get("state")),
      country: String(formData.get("country")),
      postalCode: String(formData.get("postalCode")),
      isDefault: editing?.isDefault ?? addresses.length === 0,
    };

    setAddresses((prev) =>
      editing ? prev.map((a) => (a.id === editing.id ? address : a)) : [...prev, address]
    );
    toast.success(editing ? "Address updated" : "Address added");
    setDialogOpen(false);
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-heading text-2xl font-bold">Addresses</h1>
          <p className="text-sm text-muted-foreground">Manage your shipping addresses.</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-brand" onClick={openNew}>
              <Plus className="h-4 w-4" />
              Add address
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editing ? "Edit address" : "Add new address"}</DialogTitle>
            </DialogHeader>
            <form
              action={(formData) => handleSave(formData)}
              className="flex flex-col gap-4"
            >
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="label">Label</Label>
                  <Input id="label" name="label" defaultValue={editing?.label} placeholder="Home" required />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="fullName">Full name</Label>
                  <Input id="fullName" name="fullName" defaultValue={editing?.fullName} required />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" name="phone" defaultValue={editing?.phone} required />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="line1">Address line 1</Label>
                <Input id="line1" name="line1" defaultValue={editing?.line1} required />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="line2">Address line 2 (optional)</Label>
                <Input id="line2" name="line2" defaultValue={editing?.line2} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" name="city" defaultValue={editing?.city} required />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="state">State</Label>
                  <Input id="state" name="state" defaultValue={editing?.state} required />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="country">Country</Label>
                  <Input id="country" name="country" defaultValue={editing?.country} required />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="postalCode">Postal code</Label>
                  <Input id="postalCode" name="postalCode" defaultValue={editing?.postalCode} required />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" className="bg-gradient-brand">
                  Save address
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {addresses.length === 0 ? (
        <EmptyState icon={MapPin} title="No addresses saved" description="Add an address to speed up checkout." />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {addresses.map((address) => (
            <div key={address.id} className="flex flex-col gap-3 rounded-2xl border bg-card p-5">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold">{address.label}</span>
                {address.isDefault && (
                  <span className="flex items-center gap-1 text-xs font-medium text-brand-red">
                    <Star className="h-3 w-3 fill-brand-red" /> Default
                  </span>
                )}
              </div>
              <div className="text-sm text-muted-foreground">
                <p className="text-foreground">{address.fullName}</p>
                <p>
                  {address.line1}
                  {address.line2 ? `, ${address.line2}` : ""}
                </p>
                <p>
                  {address.city}, {address.state}, {address.country} {address.postalCode}
                </p>
                <p>{address.phone}</p>
              </div>
              <div className="mt-1 flex items-center gap-2">
                <Button size="sm" variant="outline" onClick={() => openEdit(address)}>
                  <Pencil className="h-3.5 w-3.5" />
                  Edit
                </Button>
                {!address.isDefault && (
                  <Button size="sm" variant="outline" onClick={() => handleSetDefault(address.id)}>
                    Set default
                  </Button>
                )}
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-destructive"
                  onClick={() => handleDelete(address.id)}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
