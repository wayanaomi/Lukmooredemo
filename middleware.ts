import NextAuth from "next-auth";
import { NextResponse } from "next/server";

import { authConfig } from "@/auth.config";

const { auth } = NextAuth(authConfig);

const ALLOWED_DURING_MAINTENANCE = [
  "/maintenance",
  "/_next",
  "/favicon.ico",
  "/logo",
  "/site.webmanifest",
];

const AUTH_PAGES = ["/login", "/register", "/forgot-password", "/reset-password"];

const ROLE_HOME: Record<string, string> = {
  CUSTOMER: "/dashboard",
  VENDOR: "/vendor",
  ADMIN: "/admin",
  SUPER_ADMIN: "/admin",
};

export default auth((request) => {
  const { pathname } = request.nextUrl;

  const isMaintenanceMode = process.env.MAINTENANCE_MODE === "true";
  const isAllowedPath = ALLOWED_DURING_MAINTENANCE.some((path) => pathname.startsWith(path));

  if (isMaintenanceMode && !isAllowedPath) {
    return NextResponse.rewrite(new URL("/maintenance", request.url));
  }

  const role = request.auth?.user?.role;
  const isAuthPage = AUTH_PAGES.some((path) => pathname.startsWith(path));

  if (isAuthPage && role) {
    return NextResponse.redirect(new URL(ROLE_HOME[role] ?? "/", request.url));
  }

  const isDashboardRoute = pathname.startsWith("/dashboard");
  const isVendorRoute = pathname.startsWith("/vendor");
  const isAdminRoute = pathname.startsWith("/admin");

  if ((isDashboardRoute || isVendorRoute || isAdminRoute) && !role) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isVendorRoute && role && role !== "VENDOR" && role !== "ADMIN" && role !== "SUPER_ADMIN") {
    return NextResponse.redirect(new URL(ROLE_HOME[role] ?? "/", request.url));
  }

  if (isAdminRoute && role && role !== "ADMIN" && role !== "SUPER_ADMIN") {
    return NextResponse.redirect(new URL(ROLE_HOME[role] ?? "/", request.url));
  }

  if (isDashboardRoute && role === "VENDOR") {
    return NextResponse.redirect(new URL("/vendor", request.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image).*)"],
};
