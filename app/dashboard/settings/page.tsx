"use client";

import { useState } from "react";
import { toast } from "sonner";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export default function SettingsPage() {
  const [preferences, setPreferences] = useState({
    orderUpdates: true,
    promotions: true,
    newsletter: false,
    smsAlerts: true,
  });
  const [language, setLanguage] = useState("en");
  const [currency, setCurrency] = useState("NGN");

  function updatePreference(key: keyof typeof preferences, value: boolean) {
    setPreferences((prev) => ({ ...prev, [key]: value }));
  }

  function handleSave() {
    toast.success("Settings saved");
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-heading text-2xl font-bold">Settings</h1>
        <p className="text-sm text-muted-foreground">Manage your notification and display preferences.</p>
      </div>

      <div className="rounded-2xl border bg-card p-6">
        <h2 className="font-heading font-semibold">Notifications</h2>
        <div className="mt-4 flex flex-col gap-4">
          {[
            { key: "orderUpdates" as const, label: "Order updates", description: "Shipping and delivery status changes" },
            { key: "promotions" as const, label: "Promotions & flash sales", description: "Deals and limited-time offers" },
            { key: "newsletter" as const, label: "Newsletter", description: "Monthly roundup of new arrivals" },
            { key: "smsAlerts" as const, label: "SMS alerts", description: "Text messages for critical order updates" },
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

      <div className="rounded-2xl border bg-card p-6">
        <h2 className="font-heading font-semibold">Display</h2>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <Label>Language</Label>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="fr">French</SelectItem>
                <SelectItem value="pt">Portuguese</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-1.5">
            <Label>Currency</Label>
            <Select value={currency} onValueChange={setCurrency}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="NGN">NGN (₦)</SelectItem>
                <SelectItem value="USD">USD ($)</SelectItem>
                <SelectItem value="GHS">GHS (₵)</SelectItem>
                <SelectItem value="KES">KES (KSh)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <Button onClick={handleSave} className="bg-gradient-brand w-fit">
        Save changes
      </Button>
    </div>
  );
}
