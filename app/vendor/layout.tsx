import type { ReactNode } from "react";

import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { vendorDashboardNav } from "@/config/site";

export default function VendorLayout({ children }: { children: ReactNode }) {
  return (
    <DashboardShell navItems={vendorDashboardNav} roleLabel="Vendor" homeHref="/vendor">
      {children}
    </DashboardShell>
  );
}
