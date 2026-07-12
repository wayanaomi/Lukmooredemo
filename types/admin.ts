export interface AdminUser {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: "customer" | "vendor" | "admin";
  status: "active" | "suspended" | "pending";
  joinedAt: string;
  ordersCount: number;
  totalSpent: number;
}

export interface AdminVendorSummary {
  id: string;
  name: string;
  logo: string;
  email: string;
  status: "active" | "pending" | "suspended";
  kycStatus: "verified" | "pending" | "rejected";
  productCount: number;
  ordersCount: number;
  revenue: number;
  joinedAt: string;
  commissionRate: number;
}

export interface AuditLogEntry {
  id: string;
  actor: string;
  action: string;
  target: string;
  category: "auth" | "user" | "vendor" | "product" | "order" | "payment" | "settings";
  createdAt: string;
  ipAddress: string;
}

export interface RoleDefinition {
  id: string;
  name: string;
  description: string;
  userCount: number;
  permissions: string[];
}

export interface AdvertisementItem {
  id: string;
  title: string;
  placement: "homepage_hero" | "category_banner" | "sidebar" | "flash_sale";
  status: "active" | "scheduled" | "expired";
  impressions: number;
  clicks: number;
  startsAt: string;
  endsAt: string;
  image: string;
}
