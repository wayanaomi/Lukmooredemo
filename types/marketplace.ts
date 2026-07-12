export type UserRole = "customer" | "vendor" | "admin";

export interface Money {
  amount: number;
  currency: string;
}

export interface ProductVariant {
  id: string;
  name: string;
  sku: string;
  price: number;
  compareAtPrice?: number;
  stock: number;
  attributes: Record<string, string>;
  imageUrl?: string;
}

export interface ProductReview {
  id: string;
  productId: string;
  customerName: string;
  customerAvatar?: string;
  rating: number;
  title: string;
  comment: string;
  createdAt: string;
  verifiedPurchase: boolean;
  helpfulCount: number;
  images?: string[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  image: string;
  productCount: number;
  parentId?: string | null;
  featured?: boolean;
}

export interface Vendor {
  id: string;
  slug: string;
  name: string;
  logo: string;
  banner: string;
  description: string;
  rating: number;
  reviewCount: number;
  followerCount: number;
  productCount: number;
  location: string;
  joinedAt: string;
  verified: boolean;
  responseRate: number;
  responseTime: string;
  categories: string[];
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  description: string;
  shortDescription: string;
  images: string[];
  price: number;
  compareAtPrice?: number;
  currency: string;
  rating: number;
  reviewCount: number;
  soldCount: number;
  stock: number;
  categoryId: string;
  categorySlug: string;
  vendorId: string;
  vendorName: string;
  vendorSlug: string;
  tags: string[];
  variants: ProductVariant[];
  isFlashSale?: boolean;
  flashSaleEndsAt?: string;
  isNew?: boolean;
  isFeatured?: boolean;
  freeShipping?: boolean;
  createdAt: string;
}

export interface CartItem {
  productId: string;
  variantId?: string;
  title: string;
  image: string;
  price: number;
  quantity: number;
  vendorName: string;
  slug: string;
  maxStock: number;
}

export interface Address {
  id: string;
  label: string;
  fullName: string;
  phone: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  isDefault: boolean;
}

export type OrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "out_for_delivery"
  | "delivered"
  | "cancelled"
  | "refunded";

export interface OrderItem {
  productId: string;
  title: string;
  image: string;
  price: number;
  quantity: number;
  variantName?: string;
  vendorName: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  status: OrderStatus;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  discount: number;
  total: number;
  paymentMethod: string;
  shippingAddress: Address;
  trackingNumber?: string;
  estimatedDelivery?: string;
  statusHistory: { status: OrderStatus; date: string; note?: string }[];
}

export interface Coupon {
  id: string;
  code: string;
  description: string;
  type: "percentage" | "fixed";
  value: number;
  minSpend?: number;
  expiresAt: string;
  usageLimit: number;
  usageCount: number;
  isActive: boolean;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: "order" | "promo" | "system" | "message";
  read: boolean;
  createdAt: string;
  href?: string;
}

export interface SupportTicket {
  id: string;
  subject: string;
  status: "open" | "pending" | "resolved" | "closed";
  priority: "low" | "medium" | "high";
  createdAt: string;
  updatedAt: string;
  category: string;
  messages: { author: string; message: string; createdAt: string }[];
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  message: string;
  createdAt: string;
  read: boolean;
}

export interface Conversation {
  id: string;
  participantName: string;
  participantAvatar?: string;
  participantRole: UserRole;
  lastMessage: string;
  lastMessageAt: string;
  unreadCount: number;
  messages: ChatMessage[];
}
