"use client";

import { useState } from "react";
import { toast } from "sonner";
import { CheckCircle2, FileText, Loader2, ShieldAlert, Upload } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const documentTypes = [
  { value: "national-id", label: "National ID Card" },
  { value: "passport", label: "International Passport" },
  { value: "drivers-license", label: "Driver's License" },
];

export default function VendorKycPage() {
  const [docType, setDocType] = useState("national-id");
  const [fileName, setFileName] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<"not_submitted" | "pending" | "verified">("pending");

  async function handleSubmit() {
    setSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setSubmitting(false);
    setStatus("pending");
    toast.success("Identity document submitted for review");
  }

  const statusConfig = {
    not_submitted: { label: "Not submitted", className: "border-border bg-muted text-muted-foreground", icon: ShieldAlert },
    pending: { label: "Pending review", className: "border-warning/20 bg-warning/10 text-warning", icon: ShieldAlert },
    verified: { label: "Verified", className: "border-success/20 bg-success/10 text-success", icon: CheckCircle2 },
  } as const;
  const StatusIcon = statusConfig[status].icon;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-heading text-2xl font-bold">Identity Verification (KYC)</h1>
        <p className="text-sm text-muted-foreground">
          Verify your identity to comply with marketplace regulations and unlock withdrawals.
        </p>
      </div>

      <div className="rounded-2xl border bg-card p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-brand flex h-11 w-11 items-center justify-center rounded-xl">
              <StatusIcon className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="font-heading font-semibold">Identity document</p>
              <p className="text-xs text-muted-foreground">Required for withdrawal eligibility</p>
            </div>
          </div>
          <Badge variant="outline" className={statusConfig[status].className}>
            {statusConfig[status].label}
          </Badge>
        </div>

        <div className="mt-6 flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label>Document type</Label>
            <Select value={docType} onValueChange={(value) => setDocType(value ?? "national-id")}>
              <SelectTrigger className="w-full sm:w-64">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {documentTypes.map((doc) => (
                  <SelectItem key={doc.value} value={doc.value}>
                    {doc.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label>Upload document</Label>
            <label
              htmlFor="kyc-upload"
              className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed p-8 text-center hover:bg-muted"
            >
              {fileName ? (
                <>
                  <FileText className="h-6 w-6 text-muted-foreground" />
                  <p className="text-sm font-medium">{fileName}</p>
                </>
              ) : (
                <>
                  <Upload className="h-6 w-6 text-muted-foreground" />
                  <p className="text-sm font-medium">Click to upload or drag and drop</p>
                  <p className="text-xs text-muted-foreground">PNG, JPG, or PDF up to 10MB</p>
                </>
              )}
              <input
                id="kyc-upload"
                type="file"
                accept="image/*,.pdf"
                className="hidden"
                onChange={(e) => setFileName(e.target.files?.[0]?.name ?? null)}
              />
            </label>
          </div>

          <Button onClick={handleSubmit} disabled={!fileName || submitting} className="bg-gradient-brand w-fit">
            {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
            Submit for verification
          </Button>
        </div>
      </div>
    </div>
  );
}
