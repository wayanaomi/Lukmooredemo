"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Laptop, Loader2, Shield, Smartphone } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, "Enter your current password"),
    newPassword: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(8, "Confirm your new password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
type PasswordInput = z.infer<typeof passwordSchema>;

const sessions = [
  { id: "1", device: "MacBook Pro · Chrome", location: "Lagos, Nigeria", current: true, icon: Laptop },
  { id: "2", device: "iPhone 15 · Safari", location: "Lagos, Nigeria", current: false, icon: Smartphone },
];

export default function SecurityPage() {
  const [submitting, setSubmitting] = useState(false);
  const [twoFactor, setTwoFactor] = useState(false);

  const form = useForm<PasswordInput>({
    resolver: zodResolver(passwordSchema),
    defaultValues: { currentPassword: "", newPassword: "", confirmPassword: "" },
  });

  async function onSubmit() {
    setSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 700));
    setSubmitting(false);
    toast.success("Password updated successfully");
    form.reset();
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-heading text-2xl font-bold">Security</h1>
        <p className="text-sm text-muted-foreground">Manage your password and account security.</p>
      </div>

      <div className="rounded-2xl border bg-card p-6">
        <h2 className="font-heading font-semibold">Change Password</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4 flex flex-col gap-4 sm:max-w-md">
            <FormField
              control={form.control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
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
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={submitting} className="bg-gradient-brand w-fit">
              {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
              Update password
            </Button>
          </form>
        </Form>
      </div>

      <div className="rounded-2xl border bg-card p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-brand flex h-10 w-10 items-center justify-center rounded-xl">
              <Shield className="h-4.5 w-4.5 text-white" />
            </div>
            <div>
              <h2 className="font-heading font-semibold">Two-Factor Authentication</h2>
              <p className="text-sm text-muted-foreground">Add an extra layer of security to your account.</p>
            </div>
          </div>
          <Switch
            checked={twoFactor}
            onCheckedChange={(checked) => {
              setTwoFactor(checked);
              toast.success(checked ? "Two-factor authentication enabled" : "Two-factor authentication disabled");
            }}
          />
        </div>
      </div>

      <div className="rounded-2xl border bg-card p-6">
        <h2 className="font-heading font-semibold">Active Sessions</h2>
        <div className="mt-4 flex flex-col gap-3">
          {sessions.map((session) => (
            <div key={session.id} className="flex items-center justify-between rounded-lg border p-3">
              <div className="flex items-center gap-3">
                <session.icon className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">{session.device}</p>
                  <p className="text-xs text-muted-foreground">{session.location}</p>
                </div>
              </div>
              {session.current ? (
                <span className="text-xs font-medium text-success">Current session</span>
              ) : (
                <Button size="sm" variant="ghost" className="text-destructive">
                  Revoke
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
