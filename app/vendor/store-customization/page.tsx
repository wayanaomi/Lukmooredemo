"use client";

import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import { ImagePlus, Palette } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { currentVendor } from "@/lib/data/vendor-dashboard";

const swatches = ["#E11D48", "#EA580C", "#2563EB", "#16A34A", "#7C3AED", "#0891B2"];

export default function VendorStoreCustomizationPage() {
  const [storeName, setStoreName] = useState(currentVendor.name);
  const [description, setDescription] = useState(currentVendor.description);
  const [themeColor, setThemeColor] = useState(swatches[0]);

  function handleSave() {
    toast.success("Store appearance updated");
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-heading text-2xl font-bold">Store Customization</h1>
        <p className="text-sm text-muted-foreground">Personalize how your storefront appears to shoppers.</p>
      </div>

      <div className="rounded-2xl border bg-card p-6">
        <h2 className="font-heading font-semibold">Store Banner &amp; Logo</h2>
        <div className="mt-4 flex flex-col gap-4">
          <div className="relative h-32 w-full overflow-hidden rounded-xl bg-muted">
            <Image src={currentVendor.banner} alt="Store banner" fill className="object-cover" />
            <Button size="sm" variant="secondary" className="absolute right-3 bottom-3">
              <ImagePlus className="h-3.5 w-3.5" />
              Change banner
            </Button>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative h-16 w-16 overflow-hidden rounded-full bg-muted">
              <Image src={currentVendor.logo} alt="Store logo" fill className="object-cover" />
            </div>
            <Button size="sm" variant="outline">
              <ImagePlus className="h-3.5 w-3.5" />
              Change logo
            </Button>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border bg-card p-6">
        <h2 className="font-heading font-semibold">Store Details</h2>
        <div className="mt-4 flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label>Store name</Label>
            <Input value={storeName} onChange={(e) => setStoreName(e.target.value)} />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label>Store description</Label>
            <Textarea rows={4} value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
        </div>
      </div>

      <div className="rounded-2xl border bg-card p-6">
        <div className="flex items-center gap-2">
          <Palette className="h-4 w-4 text-muted-foreground" />
          <h2 className="font-heading font-semibold">Theme Color</h2>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">Choose an accent color for your storefront page.</p>
        <div className="mt-4 flex gap-3">
          {swatches.map((color) => (
            <button
              key={color}
              onClick={() => setThemeColor(color)}
              style={{ backgroundColor: color }}
              className={`h-10 w-10 rounded-full border-2 transition ${
                themeColor === color ? "border-foreground scale-110" : "border-transparent"
              }`}
              aria-label={color}
            />
          ))}
        </div>
      </div>

      <Button onClick={handleSave} className="bg-gradient-brand w-fit">
        Save changes
      </Button>
    </div>
  );
}
