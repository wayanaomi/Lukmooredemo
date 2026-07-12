import { vendors } from "@/lib/data/vendors";
import { avatarUrl } from "@/lib/utils/format";
import { createSeededRandom, seededFloat, seededInt, seededPick } from "@/lib/utils/seeded-random";
import type { AdminUser, AdminVendorSummary, AdvertisementItem, AuditLogEntry, RoleDefinition } from "@/types/admin";

const random = createSeededRandom(777);

const firstNames = ["Amara", "David", "Fatima", "Kwame", "Grace", "Tunde", "Naledi", "Samuel", "Aisha", "Chidi", "Zanele", "Emeka"];
const lastNames = ["Chukwu", "Mensah", "Bello", "Asante", "Wanjiru", "Adeyemi", "Dlamini", "Okoye", "Mohammed", "Eze", "Khumalo", "Obi"];

export const adminUsers: AdminUser[] = Array.from({ length: 24 }, (_, i) => {
  const name = `${seededPick(random, firstNames)} ${seededPick(random, lastNames)}`;
  const role = seededPick(random, ["customer", "customer", "customer", "vendor", "vendor", "admin"] as const);
  return {
    id: `user-${i + 1}`,
    name,
    email: `${name.toLowerCase().replace(/\s+/g, ".")}${i}@example.com`,
    avatar: avatarUrl(name),
    role,
    status: seededPick(random, ["active", "active", "active", "pending", "suspended"] as const),
    joinedAt: new Date(Date.now() - seededInt(random, 5, 700) * 86400000).toISOString(),
    ordersCount: seededInt(random, 0, 48),
    totalSpent: seededInt(random, 0, 4200),
  };
});

export const adminVendors: AdminVendorSummary[] = vendors.map((vendor, index) => ({
  id: vendor.id,
  name: vendor.name,
  logo: vendor.logo,
  email: `${vendor.slug.replace(/-/g, ".")}@lukmoore-vendors.com`,
  status: index === vendors.length - 1 ? "pending" : "active",
  kycStatus: vendor.verified ? "verified" : "pending",
  productCount: vendor.productCount,
  ordersCount: seededInt(random, 80, 3200),
  revenue: seededInt(random, 4200, 186000),
  joinedAt: vendor.joinedAt,
  commissionRate: seededFloat(random, 7, 15, 1),
}));

const auditActions = [
  { action: "Logged in", category: "auth" as const },
  { action: "Updated profile", category: "user" as const },
  { action: "Approved vendor application", category: "vendor" as const },
  { action: "Suspended user account", category: "user" as const },
  { action: "Published product", category: "product" as const },
  { action: "Issued refund", category: "payment" as const },
  { action: "Updated order status", category: "order" as const },
  { action: "Changed platform settings", category: "settings" as const },
];

export const auditLogs: AuditLogEntry[] = Array.from({ length: 30 }, (_, i) => {
  const entry = seededPick(random, auditActions);
  return {
    id: `audit-${i + 1}`,
    actor: seededPick(random, ["Admin — Chinelo Obi", "Admin — Tayo Fashola", "System"]),
    action: entry.action,
    target: seededPick(random, [...adminUsers.map((u) => u.name), ...vendors.map((v) => v.name)]),
    category: entry.category,
    createdAt: new Date(Date.now() - seededInt(random, 1, 500) * 3600000).toISOString(),
    ipAddress: `${seededInt(random, 10, 250)}.${seededInt(random, 0, 255)}.${seededInt(random, 0, 255)}.${seededInt(random, 1, 254)}`,
  };
});

export const roles: RoleDefinition[] = [
  {
    id: "role-super-admin",
    name: "Super Admin",
    description: "Full access to every module, including billing and platform settings.",
    userCount: 2,
    permissions: ["*"],
  },
  {
    id: "role-admin",
    name: "Admin",
    description: "Manage users, vendors, products, orders and content — no billing access.",
    userCount: 6,
    permissions: ["users.manage", "vendors.manage", "products.manage", "orders.manage", "cms.manage"],
  },
  {
    id: "role-support",
    name: "Support Agent",
    description: "Handle tickets, refunds and order disputes.",
    userCount: 11,
    permissions: ["orders.view", "refunds.manage", "support.manage"],
  },
  {
    id: "role-vendor",
    name: "Vendor",
    description: "Manage their own store, products, and orders.",
    userCount: vendors.length,
    permissions: ["own_store.manage", "own_products.manage", "own_orders.manage"],
  },
  {
    id: "role-customer",
    name: "Customer",
    description: "Shop, track orders, and manage their personal account.",
    userCount: adminUsers.filter((u) => u.role === "customer").length,
    permissions: ["orders.view_own", "profile.manage_own"],
  },
];

export const advertisements: AdvertisementItem[] = [
  {
    id: "ad-1",
    title: "Homepage Hero — Flash Sale Weekend",
    placement: "homepage_hero",
    status: "active",
    impressions: 482310,
    clicks: 18420,
    startsAt: new Date(Date.now() - 2 * 86400000).toISOString(),
    endsAt: new Date(Date.now() + 3 * 86400000).toISOString(),
    image: "https://picsum.photos/seed/lukmoore-ad-1/800/300",
  },
  {
    id: "ad-2",
    title: "Category Banner — Beauty Restock",
    placement: "category_banner",
    status: "scheduled",
    impressions: 0,
    clicks: 0,
    startsAt: new Date(Date.now() + 5 * 86400000).toISOString(),
    endsAt: new Date(Date.now() + 12 * 86400000).toISOString(),
    image: "https://picsum.photos/seed/lukmoore-ad-2/800/300",
  },
  {
    id: "ad-3",
    title: "Sidebar — Become a Vendor",
    placement: "sidebar",
    status: "active",
    impressions: 92100,
    clicks: 3140,
    startsAt: new Date(Date.now() - 20 * 86400000).toISOString(),
    endsAt: new Date(Date.now() + 40 * 86400000).toISOString(),
    image: "https://picsum.photos/seed/lukmoore-ad-3/800/300",
  },
];

export const revenueByMonth = [
  { month: "Feb", revenue: 128000, orders: 2140 },
  { month: "Mar", revenue: 142500, orders: 2390 },
  { month: "Apr", revenue: 138900, orders: 2310 },
  { month: "May", revenue: 165300, orders: 2680 },
  { month: "Jun", revenue: 178400, orders: 2920 },
  { month: "Jul", revenue: 196200, orders: 3150 },
];
