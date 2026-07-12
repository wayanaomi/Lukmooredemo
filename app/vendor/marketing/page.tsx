"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Megaphone, Percent, Sparkles, Zap } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

const promoTools = [
  {
    key: "flashSale",
    icon: Zap,
    title: "Flash Sale Enrollment",
    description: "Join Lukmoore's site-wide flash sale events to boost visibility and sales velocity.",
  },
  {
    key: "featuredPlacement",
    icon: Sparkles,
    title: "Featured Store Placement",
    description: "Get your store featured on the homepage carousel and category pages.",
  },
  {
    key: "bundleDeals",
    icon: Percent,
    title: "Bundle Deals",
    description: "Offer discounts when customers purchase multiple items from your store.",
  },
];

export default function VendorMarketingPage() {
  const [enrolled, setEnrolled] = useState<Record<string, boolean>>({
    flashSale: true,
    featuredPlacement: false,
    bundleDeals: false,
  });

  function toggle(key: string, value: boolean) {
    setEnrolled((prev) => ({ ...prev, [key]: value }));
    toast.success(value ? "Enrolled successfully" : "Unenrolled");
  }

  function handleBannerRequest() {
    toast.success("Banner ad request submitted for review");
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-heading text-2xl font-bold">Marketing Tools</h1>
        <p className="text-sm text-muted-foreground">Promote your store and products to more shoppers.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {promoTools.map((tool) => (
          <div key={tool.key} className="flex flex-col gap-3 rounded-2xl border bg-card p-5">
            <div className="bg-gradient-brand flex h-11 w-11 items-center justify-center rounded-xl">
              <tool.icon className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="font-heading font-semibold">{tool.title}</p>
              <p className="mt-1 text-sm text-muted-foreground">{tool.description}</p>
            </div>
            <div className="mt-auto flex items-center justify-between pt-2">
              <Badge variant="outline" className={enrolled[tool.key] ? "border-success/20 bg-success/10 text-success" : ""}>
                {enrolled[tool.key] ? "Enrolled" : "Not enrolled"}
              </Badge>
              <Switch checked={enrolled[tool.key]} onCheckedChange={(checked) => toggle(tool.key, checked)} />
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border bg-card p-6">
        <div className="flex items-center gap-3">
          <Megaphone className="h-5 w-5 text-muted-foreground" />
          <h2 className="font-heading font-semibold">Request a Banner Ad</h2>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">
          Submit a request to feature a promotional banner on the marketplace homepage.
        </p>
        <div className="mt-4 flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label>Campaign title</Label>
            <Input placeholder="e.g. AuraLux Summer Sale" />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label>Details</Label>
            <Textarea rows={3} placeholder="Describe the promotion and target audience" />
          </div>
          <Button onClick={handleBannerRequest} className="bg-gradient-brand w-fit">
            Submit request
          </Button>
        </div>
      </div>
    </div>
  );
}
