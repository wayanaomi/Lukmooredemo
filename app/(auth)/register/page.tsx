import type { Metadata } from "next";
import Link from "next/link";

import { RegisterForm } from "@/components/auth/register-form";

export const metadata: Metadata = {
  title: "Create Account",
};

export default function RegisterPage() {
  return (
    <div>
      <h1 className="font-heading text-2xl font-bold">Create your account</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Join Lukmoore to start shopping or selling.
      </p>

      <div className="mt-6">
        <RegisterForm />
      </div>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/login" className="text-brand-red font-medium hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
