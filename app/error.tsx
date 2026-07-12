"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Home, RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center gap-6 px-4 text-center">
      <p className="text-gradient-brand font-heading text-7xl font-extrabold sm:text-8xl">500</p>
      <h1 className="font-heading text-2xl font-bold sm:text-3xl">Something went wrong</h1>
      <p className="max-w-md text-muted-foreground">
        An unexpected error occurred while loading this page. Please try again, or head back
        home.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button onClick={() => reset()} className="bg-gradient-brand">
          <RotateCcw className="h-4 w-4" />
          Try again
        </Button>
        <Button asChild variant="outline">
          <Link href="/">
            <Home className="h-4 w-4" />
            Back home
          </Link>
        </Button>
      </div>
    </div>
  );
}
