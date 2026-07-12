export const siteConfig = {
  name: "Lukmoore",
  tagline: "Shop More. Live More.",
  description:
    "Lukmoore is a simple multi-vendor marketplace where trusted vendors sell everyday products with fast delivery and secure checkout.",
  url: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
  ogImage: "/og/lukmoore-og.png",
  keywords: [
    "Lukmoore",
    "marketplace",
    "online shopping",
    "multi-vendor",
    "ecommerce",
    "vendors",
    "online store",
  ],
  links: {
    twitter: "https://twitter.com/lukmoore",
    instagram: "https://instagram.com/lukmoore",
    facebook: "https://facebook.com/lukmoore",
    tiktok: "https://tiktok.com/@lukmoore",
  },
  contact: {
    supportEmail: "support@lukmoore.com",
    vendorEmail: "vendors@lukmoore.com",
    phone: "+234 800 000 0000",
    address: "1 Lukmoore Plaza, Victoria Island, Lagos, Nigeria",
  },
  currency: {
    code: "NGN",
    symbol: "₦",
  },
} as const;

export const mainNav = [
  { title: "Marketplace", href: "/marketplace" },
  { title: "Categories", href: "/categories" },
  { title: "Flash Sales", href: "/flash-sales" },
  { title: "Offers", href: "/offers" },
  { title: "Become a Vendor", href: "/become-vendor" },
  { title: "About", href: "/about" },
] as const;

export const footerNav = {
  shop: [
    { title: "Marketplace", href: "/marketplace" },
    { title: "Categories", href: "/categories" },
    { title: "Flash Sales", href: "/flash-sales" },
    { title: "Offers", href: "/offers" },
    { title: "Track Order", href: "/track-order" },
  ],
  company: [
    { title: "About Us", href: "/about" },
    { title: "Become a Vendor", href: "/become-vendor" },
    { title: "Blog", href: "/blog" },
    { title: "Contact", href: "/contact" },
    { title: "Careers", href: "/about#careers" },
  ],
  support: [
    { title: "Help Center", href: "/help-center" },
    { title: "FAQ", href: "/faq" },
    { title: "Support Tickets", href: "/dashboard/support" },
    { title: "Returns & Refunds", href: "/help-center#returns" },
  ],
  legal: [
    { title: "Privacy Policy", href: "/privacy" },
    { title: "Terms of Service", href: "/terms" },
  ],
} as const;

export const customerDashboardNav = [
  { title: "Dashboard", href: "/dashboard", icon: "LayoutDashboard" },
  { title: "Orders", href: "/dashboard/orders", icon: "Package" },
  { title: "Wishlist", href: "/dashboard/wishlist", icon: "Heart" },
  { title: "Addresses", href: "/dashboard/addresses", icon: "MapPin" },
  { title: "Payment Methods", href: "/dashboard/payment-methods", icon: "CreditCard" },
  { title: "Notifications", href: "/dashboard/notifications", icon: "Bell" },
  { title: "Messages", href: "/dashboard/messages", icon: "MessageSquare" },
  { title: "Reviews", href: "/dashboard/reviews", icon: "Star" },
  { title: "Recently Viewed", href: "/dashboard/recently-viewed", icon: "History" },
  { title: "Coupons", href: "/dashboard/coupons", icon: "Ticket" },
  { title: "Support Tickets", href: "/dashboard/support", icon: "LifeBuoy" },
  { title: "Security", href: "/dashboard/security", icon: "ShieldCheck" },
  { title: "Settings", href: "/dashboard/settings", icon: "Settings" },
  { title: "Profile", href: "/dashboard/profile", icon: "UserRound" },
] as const;

export const vendorDashboardNav = [
  { title: "Overview", href: "/vendor", icon: "LayoutDashboard" },
  { title: "Products", href: "/vendor/products", icon: "Package" },
  { title: "Orders", href: "/vendor/orders", icon: "ShoppingBag" },
  { title: "Customers", href: "/vendor/customers", icon: "Users" },
  { title: "Inventory", href: "/vendor/inventory", icon: "Boxes" },
  { title: "Analytics", href: "/vendor/analytics", icon: "LineChart" },
  { title: "Finance", href: "/vendor/finance", icon: "Wallet" },
  { title: "Withdrawals", href: "/vendor/withdrawals", icon: "Banknote" },
  { title: "Coupons", href: "/vendor/coupons", icon: "Ticket" },
  { title: "Reviews", href: "/vendor/reviews", icon: "Star" },
  { title: "Support", href: "/vendor/support", icon: "LifeBuoy" },
  { title: "Messages", href: "/vendor/messages", icon: "MessageSquare" },
  { title: "Marketing", href: "/vendor/marketing", icon: "Megaphone" },
  { title: "Store Customization", href: "/vendor/store-customization", icon: "Palette" },
  { title: "Store Verification", href: "/vendor/verification", icon: "BadgeCheck" },
  { title: "KYC", href: "/vendor/kyc", icon: "IdCard" },
  { title: "Settings", href: "/vendor/settings", icon: "Settings" },
] as const;

export const adminDashboardNav = [
  { title: "Dashboard", href: "/admin", icon: "LayoutDashboard" },
  { title: "Analytics", href: "/admin/analytics", icon: "LineChart" },
  { title: "Users", href: "/admin/users", icon: "Users" },
  { title: "Vendors", href: "/admin/vendors", icon: "Store" },
  { title: "Customers", href: "/admin/customers", icon: "UserRound" },
  { title: "Products", href: "/admin/products", icon: "Package" },
  { title: "Categories", href: "/admin/categories", icon: "LayoutGrid" },
  { title: "Orders", href: "/admin/orders", icon: "ShoppingBag" },
  { title: "Payments", href: "/admin/payments", icon: "CreditCard" },
  { title: "Refunds", href: "/admin/refunds", icon: "RotateCcw" },
  { title: "Coupons", href: "/admin/coupons", icon: "Ticket" },
  { title: "Reviews", href: "/admin/reviews", icon: "Star" },
  { title: "Reports", href: "/admin/reports", icon: "FileBarChart" },
  { title: "CMS", href: "/admin/cms", icon: "FileText" },
  { title: "Blog", href: "/admin/blog", icon: "Newspaper" },
  { title: "Notifications", href: "/admin/notifications", icon: "Bell" },
  { title: "Advertisements", href: "/admin/advertisements", icon: "Megaphone" },
  { title: "Support", href: "/admin/support", icon: "LifeBuoy" },
  { title: "Audit Logs", href: "/admin/audit-logs", icon: "History" },
  { title: "Roles", href: "/admin/roles", icon: "ShieldCheck" },
  { title: "Permissions", href: "/admin/permissions", icon: "KeyRound" },
  { title: "Security", href: "/admin/security", icon: "Lock" },
  { title: "Settings", href: "/admin/settings", icon: "Settings" },
] as const;
