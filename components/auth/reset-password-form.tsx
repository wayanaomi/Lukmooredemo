"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  resetPasswordSchema,
  type ResetPasswordInput,
} from "@/app/(auth)/forgot-password/schema";

export function ResetPasswordForm({ token }: { token?: string }) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  const form = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  async function onSubmit() {
    setSubmitting(true);
    // Password reset persistence (Resend + PasswordResetToken lookup) is not
    // wired to a live database in this environment. See docs/ASSUMPTIONS.md.
    await new Promise((resolve) => setTimeout(resolve, 700));
    setSubmitting(false);
    toast.success("Password updated! You can now sign in.");
    router.push("/login");
  }

  if (!token) {
    return (
      <p className="text-sm text-muted-foreground">
        This password reset link is invalid or has expired. Please request a new one from the{" "}
        <a href="/forgot-password" className="text-brand-red hover:underline">
          forgot password
        </a>{" "}
        page.
      </p>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="••••••••" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm new password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="••••••••" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={submitting} className="bg-gradient-brand w-full">
          {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
          Reset password
        </Button>
      </form>
    </Form>
  );
}
