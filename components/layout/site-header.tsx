"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { useSession, signOut } from "next-auth/react";
import { Heart, Menu, Search, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { CartSheet } from "@/components/cart/cart-sheet";
import { mainNav, siteConfig } from "@/config/site";
import { useAppSelector } from "@/store/hooks";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const wishlistCount = useAppSelector((state) => state.wishlist.productIds.length);

  function handleSearch(event: FormEvent) {
    event.preventDefault();
    if (!query.trim()) return;
    router.push(`/search?q=${encodeURIComponent(query.trim())}`);
  }

  return (
    <header className="glass-panel sticky top-0 z-40 w-full border-b">
      <div className="bg-gradient-brand text-primary-foreground">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-2 px-4 py-1.5 text-center text-xs font-medium sm:text-sm">
          <span>Free shipping on orders over ₦50,000. Flash Sale ends soon.</span>
          <Link href="/flash-sales" className="underline underline-offset-2 hover:opacity-90">
            Shop now
          </Link>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px]">
            <SheetHeader>
              <SheetTitle>
                <Link href="/" onClick={() => setMobileOpen(false)} className="flex items-center gap-2">
                  <Image src="/logo/lukmoore-mark.svg" alt="" width={32} height={32} />
                  <span className="text-gradient-brand text-lg font-extrabold">Lukmoore</span>
                </Link>
              </SheetTitle>
            </SheetHeader>
            <nav className="mt-6 flex flex-col gap-1 px-4">
              {mainNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-foreground/80 transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  {item.title}
                </Link>
              ))}
              <div className="my-3 h-px bg-border" />
              <Link href="/login" onClick={() => setMobileOpen(false)} className="rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-accent">
                Sign in
              </Link>
              <Link href="/register" onClick={() => setMobileOpen(false)} className="rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-accent">
                Create account
              </Link>
            </nav>
          </SheetContent>
        </Sheet>

        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Image src="/logo/lukmoore-mark.svg" alt="Lukmoore" width={38} height={38} priority />
          <span className="hidden text-xl font-extrabold tracking-tight sm:inline">
            <span className="text-gradient-brand">Lukmoore</span>
          </span>
        </Link>

        <nav className="ml-4 hidden items-center gap-1 lg:flex">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-3.5 py-2 text-sm font-medium text-foreground/75 transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              {item.title}
            </Link>
          ))}
        </nav>

        <form onSubmit={handleSearch} className="mx-auto hidden max-w-md flex-1 md:flex">
          <div className="relative w-full">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search products, brands and vendors…"
              className="h-10 rounded-full pl-10"
              aria-label="Search products"
            />
          </div>
        </form>

        <div className="ml-auto flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label="Search"
            onClick={() => router.push("/search")}
          >
            <Search className="h-5 w-5" />
          </Button>
          <ThemeToggle />
          <Button variant="ghost" size="icon" className="relative" aria-label="Wishlist" asChild>
            <Link href="/dashboard/wishlist">
              <Heart className="h-5 w-5" />
              {wishlistCount > 0 && (
                <Badge className={cn("absolute -top-1 -right-1 h-5 min-w-5 justify-center rounded-full px-1 text-[10px]")}>
                  {wishlistCount}
                </Badge>
              )}
            </Link>
          </Button>
          <CartSheet />
          <AccountMenu />
          <Button asChild className="hidden shadow-brand-sm sm:inline-flex">
            <Link href="/become-vendor">Become a Vendor</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}

const ROLE_HOME: Record<string, string> = {
  CUSTOMER: "/dashboard",
  VENDOR: "/vendor",
  ADMIN: "/admin",
  SUPER_ADMIN: "/admin",
};

function AccountMenu() {
  const { data: session, status } = useSession();

  if (status !== "authenticated") {
    return (
      <Button variant="ghost" size="icon" aria-label="Account" asChild className="hidden sm:inline-flex">
        <Link href="/login">
          <User className="h-5 w-5" />
        </Link>
      </Button>
    );
  }

  const role = session.user.role;
  const initials = session.user.name?.slice(0, 2).toUpperCase() ?? "U";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Account menu" className="hidden sm:inline-flex">
          <Avatar className="h-7 w-7">
            <AvatarImage src={session.user.image ?? undefined} alt={session.user.name ?? "Account"} />
            <AvatarFallback className="text-xs">{initials}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <div className="px-2 py-1.5">
          <p className="truncate text-sm font-medium">{session.user.name}</p>
          <p className="truncate text-xs text-muted-foreground">{session.user.email}</p>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href={ROLE_HOME[role] ?? "/dashboard"}>Dashboard</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/dashboard/settings">Account settings</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/" })}>Sign out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
