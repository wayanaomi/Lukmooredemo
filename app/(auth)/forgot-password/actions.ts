"use server";

import { forgotPasswordSchema, type ForgotPasswordInput } from "@/app/(auth)/forgot-password/schema";

export interface ForgotPasswordResult {
  success: boolean;
  message: string;
}

export async function requestPasswordReset(
  input: ForgotPasswordInput
): Promise<ForgotPasswordResult> {
  const parsed = forgotPasswordSchema.safeParse(input);

  if (!parsed.success) {
    return {
      success: false,
      message: parsed.error.issues[0]?.message ?? "Enter a valid email address.",
    };
  }

  // Email delivery (Resend) is not wired up in this environment. We simulate
  // success so the flow can be demoed end-to-end. See docs/ASSUMPTIONS.md.
  await new Promise((resolve) => setTimeout(resolve, 600));

  return {
    success: true,
    message: "If an account exists for that email, a password reset link has been sent.",
  };
}
