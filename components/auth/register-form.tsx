"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { registerSchema, type RegisterInput } from "@/app/(auth)/register/schema";
import { registerUser } from "@/app/(auth)/register/actions";

type RegisterFormInput = z.input<typeof registerSchema>;

export function RegisterForm() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  const form = useForm<RegisterFormInput, unknown, RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "CUSTOMER",
      acceptTerms: false,
    },
  });

  async function onSubmit(values: RegisterInput) {
    setSubmitting(true);
    const result = await registerUser(values);
    setSubmitting(false);

    if (!result.success) {
      toast.error(result.message);
      return;
    }

    toast.success(result.message);
    router.push("/login");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full name</FormLabel>
              <FormControl>
                <Input placeholder="Jane Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email address</FormLabel>
              <FormControl>
                <Input type="email" placeholder="you@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
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
                <FormLabel>Confirm password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="••••••••" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>I want to</FormLabel>
              <FormControl>
                <RadioGroup
                  value={field.value ?? "CUSTOMER"}
                  onValueChange={field.onChange}
                  className="grid grid-cols-2 gap-3"
                >
                  <label className="flex cursor-pointer items-center gap-2 rounded-lg border p-3 text-sm has-data-[state=checked]:border-brand-red">
                    <RadioGroupItem value="CUSTOMER" />
                    Shop
                  </label>
                  <label className="flex cursor-pointer items-center gap-2 rounded-lg border p-3 text-sm has-data-[state=checked]:border-brand-red">
                    <RadioGroupItem value="VENDOR" />
                    Sell
                  </label>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="acceptTerms"
          render={({ field }) => (
            <FormItem>
              <label className="flex items-start gap-2 text-sm">
                <Checkbox
                  checked={field.value}
                  onCheckedChange={(checked) => field.onChange(checked === true)}
                />
                <span className="text-muted-foreground">
                  I agree to the{" "}
                  <Link href="/terms" className="text-brand-red hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-brand-red hover:underline">
                    Privacy Policy
                  </Link>
                </span>
              </label>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={submitting} className="bg-gradient-brand w-full">
          {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
          Create account
        </Button>
      </form>
    </Form>
  );
}
