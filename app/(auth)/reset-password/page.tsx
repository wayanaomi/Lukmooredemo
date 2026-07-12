import type { Metadata } from "next";

import { ResetPasswordForm } from "@/components/auth/reset-password-form";

export const metadata: Metadata = {
  title: "Reset Password",
};

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold">Reset your password</h1>
      <p className="mt-1 text-sm text-muted-foreground">Choose a new password below.</p>

      <div className="mt-6">
        <ResetPasswordForm token={token} />
      </div>
    </div>
  );
}
