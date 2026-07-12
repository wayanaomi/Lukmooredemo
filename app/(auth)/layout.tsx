import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12">
      <Link href="/" className="mb-8 flex items-center gap-2">
        <Image src="/logo/lukmoore-mark.svg" alt="Lukmoore" width={36} height={36} />
        <span className="font-heading text-xl font-bold">Lukmoore</span>
      </Link>
      <div className="w-full max-w-md rounded-2xl border bg-card p-6 shadow-brand-sm sm:p-8">
        {children}
      </div>
    </div>
  );
}
