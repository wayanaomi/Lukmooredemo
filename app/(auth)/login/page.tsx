import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

import { LoginForm } from "@/components/auth/login-form";

export const metadata: Metadata = {
  title: "Sign In",
};

export default function LoginPage() {
  return (
    <div>
      <h1 className="font-heading text-2xl font-bold">Welcome back</h1>
      <p className="mt-1 text-sm text-muted-foreground">Sign in to continue to Lukmoore.</p>

      <div className="mt-6">
        <Suspense>
          <LoginForm />
        </Suspense>
      </div>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="text-brand-red font-medium hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  );
}
