"use client";

import { Building2, CheckCircle2, CircleDashed, ShieldCheck } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { currentVendor } from "@/lib/data/vendor-dashboard";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const steps = [
  { key: "account", label: "Account created", complete: true },
  { key: "business", label: "Business information submitted", complete: true },
  { key: "documents", label: "Verification documents reviewed", complete: true },
  { key: "approval", label: "Store approved", complete: currentVendor.verified },
];

export default function VendorVerificationPage() {
  function handleSubmit() {
    toast.success("Business information updated");
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-heading text-2xl font-bold">Store Verification</h1>
        <p className="text-sm text-muted-foreground">Complete verification to unlock full selling privileges.</p>
      </div>

      <div className="rounded-2xl border bg-card p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-brand flex h-11 w-11 items-center justify-center rounded-xl">
              <ShieldCheck className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="font-heading font-semibold">{currentVendor.name}</p>
              <p className="text-xs text-muted-foreground">Store verification status</p>
            </div>
          </div>
          <Badge
            variant="outline"
            className={
              currentVendor.verified
                ? "border-success/20 bg-success/10 text-success"
                : "border-warning/20 bg-warning/10 text-warning"
            }
          >
            {currentVendor.verified ? "Active" : "Pending Review"}
          </Badge>
        </div>

        <div className="mt-6 flex flex-col gap-4">
          {steps.map((step, index) => (
            <div key={step.key} className="flex items-center gap-3">
              {step.complete ? (
                <CheckCircle2 className="h-5 w-5 shrink-0 text-success" />
              ) : (
                <CircleDashed className="h-5 w-5 shrink-0 text-muted-foreground" />
              )}
              <span className={cn("text-sm", step.complete ? "font-medium" : "text-muted-foreground")}>
                {index + 1}. {step.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border bg-card p-6">
        <div className="flex items-center gap-2">
          <Building2 className="h-4 w-4 text-muted-foreground" />
          <h2 className="font-heading font-semibold">Business Information</h2>
        </div>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <Label>Legal business name</Label>
            <Input defaultValue={currentVendor.name} />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label>Registration number</Label>
            <Input defaultValue="RC-8827194" />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label>Business address</Label>
            <Input defaultValue={currentVendor.location} />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label>Tax ID</Label>
            <Input defaultValue="TIN-2039481-02" />
          </div>
        </div>
        <Button onClick={handleSubmit} className="bg-gradient-brand mt-4 w-fit">
          Save business information
        </Button>
      </div>
    </div>
  );
}
