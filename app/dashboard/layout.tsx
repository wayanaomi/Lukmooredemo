import type { ReactNode } from "react";

import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { customerDashboardNav } from "@/config/site";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <DashboardShell navItems={customerDashboardNav} roleLabel="Customer" homeHref="/dashboard">
      {children}
    </DashboardShell>
  );
}
