import { products } from "@/lib/data/products";
import { createSeededRandom, seededInt, seededPick } from "@/lib/utils/seeded-random";
import { avatarUrl } from "@/lib/utils/format";
import type {
  Address,
  ChatMessage,
  Conversation,
  Coupon,
  NotificationItem,
  Order,
  OrderStatus,
  SupportTicket,
} from "@/types/marketplace";

const random = createSeededRandom(42);

export const addresses: Address[] = [
  {
    id: "addr-1",
    label: "Home",
    fullName: "Amara Chukwu",
    phone: "+234 802 345 6789",
    line1: "14 Admiralty Way",
    line2: "Lekki Phase 1",
    city: "Lagos",
    state: "Lagos",
    country: "Nigeria",
    postalCode: "101245",
    isDefault: true,
  },
  {
    id: "addr-2",
    label: "Office",
    fullName: "Amara Chukwu",
    phone: "+234 802 345 6789",
    line1: "5 Adeola Odeku Street",
    city: "Victoria Island",
    state: "Lagos",
    country: "Nigeria",
    postalCode: "101241",
    isDefault: false,
  },
];

const statusFlow: OrderStatus[] = [
  "pending",
  "processing",
  "shipped",
  "out_for_delivery",
  "delivered",
];

function buildOrder(index: number): Order {
  const orderProducts = Array.from({ length: seededInt(random, 1, 3) }, () =>
    seededPick(random, products)
  );
  const items = orderProducts.map((product) => ({
    productId: product.id,
    title: product.title,
    image: product.images[0],
    price: product.price,
    quantity: seededInt(random, 1, 2),
    vendorName: product.vendorName,
  }));
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 50 ? 0 : 6.99;
  const tax = Math.round(subtotal * 0.03 * 100) / 100;
  const status = seededPick(
    random,
    ["delivered", "delivered", "shipped", "processing", "pending", "cancelled", "refunded"] as OrderStatus[]
  );
  const createdAt = new Date(Date.now() - seededInt(random, 1, 220) * 86400000);
  const statusHistory = statusFlow
    .slice(0, statusFlow.indexOf(status === "cancelled" || status === "refunded" ? "processing" : status) + 1)
    .map((s, i) => ({
      status: s,
      date: new Date(createdAt.getTime() + i * 86400000).toISOString(),
    }));

  return {
    id: `order-${index}`,
    orderNumber: `LKM-${(100000 + index).toString()}`,
    createdAt: createdAt.toISOString(),
    status,
    items,
    subtotal,
    shipping,
    tax,
    discount: 0,
    total: subtotal + shipping + tax,
    paymentMethod: seededPick(random, ["Paystack", "Flutterwave", "Stripe"]),
    shippingAddress: addresses[0],
    trackingNumber: status !== "pending" ? `LKMTRK${1000000 + index}` : undefined,
    estimatedDelivery: new Date(createdAt.getTime() + 5 * 86400000).toISOString(),
    statusHistory,
  };
}

export const orders: Order[] = Array.from({ length: 14 }, (_, i) => buildOrder(i + 1));

export function getOrderByNumber(orderNumber: string) {
  return orders.find((order) => order.orderNumber.toLowerCase() === orderNumber.toLowerCase());
}

export const coupons: Coupon[] = [
  {
    id: "coupon-1",
    code: "WELCOME10",
    description: "10% off your first order",
    type: "percentage",
    value: 10,
    minSpend: 20,
    expiresAt: new Date(Date.now() + 30 * 86400000).toISOString(),
    usageLimit: 1,
    usageCount: 0,
    isActive: true,
  },
  {
    id: "coupon-2",
    code: "FLASH15",
    description: "₦15,000 off orders over ₦80,000",
    type: "fixed",
    value: 15,
    minSpend: 80,
    expiresAt: new Date(Date.now() + 5 * 86400000).toISOString(),
    usageLimit: 500,
    usageCount: 214,
    isActive: true,
  },
  {
    id: "coupon-3",
    code: "SUMMER25",
    description: "25% off fashion & beauty",
    type: "percentage",
    value: 25,
    expiresAt: new Date(Date.now() - 2 * 86400000).toISOString(),
    usageLimit: 1000,
    usageCount: 1000,
    isActive: false,
  },
];

export const notifications: NotificationItem[] = [
  {
    id: "notif-1",
    title: "Your order has shipped",
    message: "Order LKM-100003 is on its way and should arrive within 3 days.",
    type: "order",
    read: false,
    createdAt: new Date(Date.now() - 2 * 3600000).toISOString(),
    href: "/dashboard/orders",
  },
  {
    id: "notif-2",
    title: "Flash Sale starts in 1 hour",
    message: "Up to 60% off electronics — set a reminder so you don't miss out.",
    type: "promo",
    read: false,
    createdAt: new Date(Date.now() - 5 * 3600000).toISOString(),
    href: "/flash-sales",
  },
  {
    id: "notif-3",
    title: "New message from Velora Fashion House",
    message: "Thanks for your order! Let us know if you have any sizing questions.",
    type: "message",
    read: true,
    createdAt: new Date(Date.now() - 26 * 3600000).toISOString(),
    href: "/dashboard/messages",
  },
  {
    id: "notif-4",
    title: "Password changed successfully",
    message: "Your account password was updated. If this wasn't you, contact support.",
    type: "system",
    read: true,
    createdAt: new Date(Date.now() - 96 * 3600000).toISOString(),
    href: "/dashboard/security",
  },
];

export const supportTickets: SupportTicket[] = [
  {
    id: "ticket-1",
    subject: "Item arrived damaged",
    status: "open",
    priority: "high",
    createdAt: new Date(Date.now() - 2 * 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 3600000).toISOString(),
    category: "Returns & Refunds",
    messages: [
      {
        author: "You",
        message: "The ceramic vase set arrived with one piece cracked. Requesting a replacement.",
        createdAt: new Date(Date.now() - 2 * 86400000).toISOString(),
      },
      {
        author: "Lukmoore Support",
        message: "Sorry to hear that! We've flagged this with Haven Home & Living — a replacement ships today.",
        createdAt: new Date(Date.now() - 3600000).toISOString(),
      },
    ],
  },
  {
    id: "ticket-2",
    subject: "Question about vendor response time",
    status: "resolved",
    priority: "low",
    createdAt: new Date(Date.now() - 12 * 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 10 * 86400000).toISOString(),
    category: "General",
    messages: [
      {
        author: "You",
        message: "How long does AuraLux Electronics usually take to respond to messages?",
        createdAt: new Date(Date.now() - 12 * 86400000).toISOString(),
      },
      {
        author: "Lukmoore Support",
        message: "AuraLux has a 98% response rate and typically replies within an hour!",
        createdAt: new Date(Date.now() - 10 * 86400000).toISOString(),
      },
    ],
  },
];

function buildMessages(seed: string, count: number): ChatMessage[] {
  const r = createSeededRandom(seed.length * 7 + count);
  return Array.from({ length: count }, (_, i) => ({
    id: `${seed}-msg-${i}`,
    senderId: i % 2 === 0 ? "vendor" : "me",
    senderName: i % 2 === 0 ? seed : "You",
    message: seededPick(r, [
      "Thanks for reaching out — how can I help?",
      "Your order is being prepared for shipment.",
      "Yes, that size is currently in stock.",
      "We can offer a 10% discount on your next order for the inconvenience.",
      "Glad I could help! Let me know if anything else comes up.",
    ]),
    createdAt: new Date(Date.now() - (count - i) * 3600000).toISOString(),
    read: true,
  }));
}

export const conversations: Conversation[] = [
  {
    id: "conv-1",
    participantName: "Velora Fashion House",
    participantAvatar: avatarUrl("Velora Fashion House"),
    participantRole: "vendor",
    lastMessage: "Thanks for your order! Let us know if you have any sizing questions.",
    lastMessageAt: new Date(Date.now() - 26 * 3600000).toISOString(),
    unreadCount: 1,
    messages: buildMessages("Velora Fashion House", 5),
  },
  {
    id: "conv-2",
    participantName: "AuraLux Electronics",
    participantAvatar: avatarUrl("AuraLux Electronics"),
    participantRole: "vendor",
    lastMessage: "Your order is being prepared for shipment.",
    lastMessageAt: new Date(Date.now() - 50 * 3600000).toISOString(),
    unreadCount: 0,
    messages: buildMessages("AuraLux Electronics", 4),
  },
  {
    id: "conv-3",
    participantName: "Lukmoore Support",
    participantAvatar: avatarUrl("Lukmoore Support"),
    participantRole: "admin",
    lastMessage: "We've flagged this with Haven Home & Living — a replacement ships today.",
    lastMessageAt: new Date(Date.now() - 3600000).toISOString(),
    unreadCount: 0,
    messages: buildMessages("Lukmoore Support", 3),
  },
];

export const recentlyViewedProductIds = products.slice(2, 10).map((p) => p.id);

export interface SavedPaymentMethod {
  id: string;
  brand: "Visa" | "Mastercard" | "Verve";
  last4: string;
  expiryMonth: number;
  expiryYear: number;
  isDefault: boolean;
  provider: "Paystack" | "Flutterwave" | "Stripe";
}

export const savedPaymentMethods: SavedPaymentMethod[] = [
  {
    id: "pm-1",
    brand: "Visa",
    last4: "4242",
    expiryMonth: 8,
    expiryYear: 2027,
    isDefault: true,
    provider: "Stripe",
  },
  {
    id: "pm-2",
    brand: "Mastercard",
    last4: "5678",
    expiryMonth: 3,
    expiryYear: 2026,
    isDefault: false,
    provider: "Paystack",
  },
];

export interface CustomerReview {
  id: string;
  productId: string;
  productTitle: string;
  productImage: string;
  productSlug: string;
  rating: number;
  title: string;
  comment: string;
  createdAt: string;
  vendorReply?: string;
}

const reviewedProducts = products.slice(4, 10);

export const customerReviews: CustomerReview[] = reviewedProducts.map((product, index) => ({
  id: `my-review-${index}`,
  productId: product.id,
  productTitle: product.title,
  productImage: product.images[0],
  productSlug: product.slug,
  rating: seededPick(random, [5, 5, 4, 4, 3]),
  title: seededPick(random, [
    "Exceeded my expectations",
    "Great value for money",
    "Good, but shipping was slow",
    "Exactly as described",
    "Will buy again",
  ]),
  comment: seededPick(random, [
    "Quality is excellent and it arrived earlier than expected. Highly recommend this vendor.",
    "Does exactly what it says. Packaging was solid and customer service was responsive.",
    "Product is great but delivery took a bit longer than the estimate.",
    "Matches the photos and description perfectly. Very satisfied with this purchase.",
  ]),
  createdAt: new Date(Date.now() - seededInt(random, 5, 90) * 86400000).toISOString(),
  vendorReply:
    index % 2 === 0
      ? "Thank you so much for the kind review! We're thrilled you're happy with your purchase."
      : undefined,
}));
