import type { Metadata } from "next";
import Link from "next/link";
import { MailCheck } from "lucide-react";

import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Verify Your Email",
};

export default function VerifyEmailPage() {
  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <div className="bg-gradient-brand flex h-14 w-14 items-center justify-center rounded-2xl">
        <MailCheck className="h-6 w-6 text-white" />
      </div>
      <h1 className="font-heading text-2xl font-bold">Check your email</h1>
      <p className="text-sm text-muted-foreground">
        We&apos;ve sent a verification link to your email address. Click the link to activate
        your account.
      </p>
      <Button variant="outline" className="w-full">
        Resend verification email
      </Button>
      <Link href="/login" className="text-sm text-brand-red hover:underline">
        Back to sign in
      </Link>
    </div>
  );
}
