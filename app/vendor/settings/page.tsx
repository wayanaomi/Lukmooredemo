"use client";

import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { currentVendor } from "@/lib/data/vendor-dashboard";

export default function VendorSettingsPage() {
  const [preferences, setPreferences] = useState({
    orderNotifications: true,
    lowStockAlerts: true,
    reviewNotifications: true,
    marketingEmails: false,
  });
  const [shippingPolicy, setShippingPolicy] = useState(
    "Orders are processed within 1-2 business days and shipped via standard courier. Delivery typically takes 3-7 business days."
  );

  function updatePreference(key: keyof typeof preferences, value: boolean) {
    setPreferences((prev) => ({ ...prev, [key]: value }));
  }

  function handleSave() {
    toast.success("Store settings saved");
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-heading text-2xl font-bold">Store Settings</h1>
        <p className="text-sm text-muted-foreground">Manage your store configuration and preferences.</p>
      </div>

      <div className="rounded-2xl border bg-card p-6">
        <h2 className="font-heading font-semibold">Store Information</h2>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <Label>Store name</Label>
            <Input defaultValue={currentVendor.name} />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label>Contact email</Label>
            <Input defaultValue="support@auraluxelectronics.com" type="email" />
          </div>
        </div>
        <div className="mt-4 flex flex-col gap-1.5">
          <Label>Shipping policy</Label>
          <Textarea rows={4} value={shippingPolicy} onChange={(e) => setShippingPolicy(e.target.value)} />
        </div>
      </div>

      <div className="rounded-2xl border bg-card p-6">
        <h2 className="font-heading font-semibold">Notifications</h2>
        <div className="mt-4 flex flex-col gap-4">
          {[
            { key: "orderNotifications" as const, label: "New order notifications", description: "Get notified when a customer places an order" },
            { key: "lowStockAlerts" as const, label: "Low stock alerts", description: "Get notified when product inventory runs low" },
            { key: "reviewNotifications" as const, label: "Review notifications", description: "Get notified when customers leave a review" },
            { key: "marketingEmails" as const, label: "Marketing emails", description: "Tips, best practices, and platform updates" },
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.description}</p>
              </div>
              <Switch
                checked={preferences[item.key]}
                onCheckedChange={(checked) => updatePreference(item.key, checked)}
              />
            </div>
          ))}
        </div>
      </div>

      <Button onClick={handleSave} className="bg-gradient-brand w-fit">
        Save changes
      </Button>
    </div>
  );
}
