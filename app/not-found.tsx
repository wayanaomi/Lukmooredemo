import Link from "next/link";
import { Home, Search } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center gap-6 px-4 text-center">
      <p className="text-gradient-brand font-heading text-7xl font-extrabold sm:text-8xl">404</p>
      <h1 className="font-heading text-2xl font-bold sm:text-3xl">Page not found</h1>
      <p className="max-w-md text-muted-foreground">
        The page you&apos;re looking for doesn&apos;t exist or may have been moved. Let&apos;s get you back on
track.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button asChild className="bg-gradient-brand">
          <Link href="/">
            <Home className="h-4 w-4" />
            Back home
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/marketplace">
            <Search className="h-4 w-4" />
            Browse marketplace
          </Link>
        </Button>
      </div>
    </div>
  );
}
