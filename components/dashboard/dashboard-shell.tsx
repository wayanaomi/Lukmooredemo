"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";
import { signOut, useSession } from "next-auth/react";
import { LogOut, Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { iconMap } from "@/lib/icon-map";
import { cn } from "@/lib/utils";

export interface DashboardNavItem {
  title: string;
  href: string;
  icon: string;
}

export function DashboardShell({
  navItems,
  roleLabel,
  homeHref,
  children,
}: {
  navItems: readonly DashboardNavItem[];
  roleLabel: string;
  homeHref: string;
  children: ReactNode;
}) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [mobileOpen, setMobileOpen] = useState(false);

  const initials = session?.user?.name?.slice(0, 2).toUpperCase() ?? "U";

  const navList = (
    <nav className="flex flex-col gap-1">
      {navItems.map((item) => {
        const Icon = iconMap[item.icon] ?? iconMap.Settings;
        const isActive =
          item.href === homeHref ? pathname === item.href : pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setMobileOpen(false)}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              isActive
                ? "bg-gradient-brand text-white shadow-brand-sm"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <Icon className="h-4 w-4 shrink-0" />
            {item.title}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <div className="mx-auto flex min-h-screen max-w-[1600px]">
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r bg-card/40 px-4 py-6 lg:flex">
        <Link href="/" className="mb-6 flex items-center gap-2 px-2">
          <Image src="/logo/lukmoore-mark.svg" alt="Lukmoore" width={28} height={28} />
          <span className="font-heading text-lg font-bold">Lukmoore</span>
        </Link>
        <div className="mb-4 px-2">
          <span className="text-gradient-brand text-xs font-bold tracking-[0.14em] uppercase">
            {roleLabel}
          </span>
        </div>
        <div className="flex-1 overflow-y-auto">{navList}</div>
        <Button
          variant="ghost"
          className="mt-4 justify-start text-muted-foreground"
          onClick={() => signOut({ callbackUrl: "/" })}
        >
          <LogOut className="h-4 w-4" />
          Sign out
        </Button>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="glass-panel sticky top-0 z-30 flex items-center justify-between gap-3 border-b px-4 py-3 sm:px-6">
          <div className="flex items-center gap-2">
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72">
                <SheetHeader>
                  <SheetTitle className="flex items-center gap-2">
                    <Image src="/logo/lukmoore-mark.svg" alt="Lukmoore" width={24} height={24} />
                    Lukmoore
                  </SheetTitle>
                </SheetHeader>
                <div className="px-4 pb-4">{navList}</div>
              </SheetContent>
            </Sheet>
            <span className="font-heading text-sm font-semibold sm:text-base">{roleLabel} Dashboard</span>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Avatar className="h-8 w-8">
              <AvatarImage src={session?.user?.image ?? undefined} alt={session?.user?.name ?? "Account"} />
              <AvatarFallback className="text-xs">{initials}</AvatarFallback>
            </Avatar>
          </div>
        </header>
        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
