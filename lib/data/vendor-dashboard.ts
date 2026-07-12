import { createSeededRandom, seededInt, seededPick } from "@/lib/utils/seeded-random";
import { avatarUrl } from "@/lib/utils/format";
import { getProductReviews, getProductsByVendor } from "@/lib/data/products";
import { getVendorBySlug } from "@/lib/data/vendors";
import type { ChatMessage, Conversation, SupportTicket } from "@/types/marketplace";

export const CURRENT_VENDOR_SLUG = "auralux-electronics";

export const currentVendor = getVendorBySlug(CURRENT_VENDOR_SLUG)!;
export const vendorProducts = getProductsByVendor(CURRENT_VENDOR_SLUG);

const random = createSeededRandom(777);

const customerNames = [
  "Amara Chukwu",
  "Tunde Bakare",
  "Ngozi Eze",
  "Kwame Mensah",
  "Fatima Bello",
  "Chidi Okafor",
  "Aisha Suleiman",
  "Emeka Nwosu",
  "Zainab Yusuf",
  "Oluwaseun Ade",
];

export type VendorOrderStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled";

export interface VendorOrderItem {
  productId: string;
  title: string;
  image: string;
  price: number;
  quantity: number;
}

export interface VendorOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  customerAvatar: string;
  createdAt: string;
  status: VendorOrderStatus;
  items: VendorOrderItem[];
  total: number;
}

function buildVendorOrder(index: number): VendorOrder {
  const items = Array.from({ length: seededInt(random, 1, 3) }, () => seededPick(random, vendorProducts)).map(
    (product) => ({
      productId: product.id,
      title: product.title,
      image: product.images[0],
      price: product.price,
      quantity: seededInt(random, 1, 3),
    })
  );
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const customerName = seededPick(random, customerNames);

  return {
    id: `vorder-${index}`,
    orderNumber: `LKM-${(200000 + index).toString()}`,
    customerName,
    customerAvatar: avatarUrl(customerName),
    createdAt: new Date(Date.now() - seededInt(random, 1, 60) * 86400000).toISOString(),
    status: seededPick(random, ["delivered", "delivered", "shipped", "processing", "pending", "cancelled"]),
    items,
    total,
  };
}

export const vendorOrders: VendorOrder[] = Array.from({ length: 18 }, (_, i) => buildVendorOrder(i + 1));

export interface VendorCustomer {
  name: string;
  avatar: string;
  ordersCount: number;
  totalSpent: number;
  lastOrderAt: string;
}

export const vendorCustomers: VendorCustomer[] = customerNames.map((name) => {
  const orders = vendorOrders.filter((o) => o.customerName === name);
  return {
    name,
    avatar: avatarUrl(name),
    ordersCount: orders.length,
    totalSpent: orders.reduce((sum, o) => sum + o.total, 0),
    lastOrderAt: orders[0]?.createdAt ?? new Date().toISOString(),
  };
}).filter((c) => c.ordersCount > 0).sort((a, b) => b.totalSpent - a.totalSpent);

export interface VendorReview {
  id: string;
  productId: string;
  productTitle: string;
  productImage: string;
  customerName: string;
  customerAvatar?: string;
  rating: number;
  title: string;
  comment: string;
  createdAt: string;
  vendorReply?: string;
}

export const vendorReviews: VendorReview[] = vendorProducts.slice(0, 8).flatMap((product) =>
  getProductReviews(product.id).slice(0, 2).map((review) => ({
    id: review.id,
    productId: product.id,
    productTitle: product.title,
    productImage: product.images[0],
    customerName: review.customerName,
    customerAvatar: review.customerAvatar,
    rating: review.rating,
    title: review.title,
    comment: review.comment,
    createdAt: review.createdAt,
    vendorReply: undefined,
  }))
);

export const revenueTrend = [
  { month: "Jul", revenue: 4200, orders: 62 },
  { month: "Aug", revenue: 5100, orders: 74 },
  { month: "Sep", revenue: 4800, orders: 69 },
  { month: "Oct", revenue: 6300, orders: 88 },
  { month: "Nov", revenue: 7900, orders: 104 },
  { month: "Dec", revenue: 9600, orders: 131 },
  { month: "Jan", revenue: 8100, orders: 112 },
];

export const topProducts = [...vendorProducts].sort((a, b) => b.soldCount - a.soldCount).slice(0, 5);

export const financeSummary = {
  availableBalance: 4820.5,
  pendingBalance: 1340.75,
  totalEarnings: 86420.9,
  lastPayoutAmount: 3200,
  lastPayoutDate: new Date(Date.now() - 12 * 86400000).toISOString(),
};

export interface Transaction {
  id: string;
  type: "sale" | "refund" | "payout" | "fee";
  description: string;
  amount: number;
  status: "completed" | "pending" | "failed";
  createdAt: string;
}

export const transactions: Transaction[] = Array.from({ length: 12 }, (_, i) => {
  const type = seededPick(random, ["sale", "sale", "sale", "refund", "fee", "payout"] as Transaction["type"][]);
  const amount =
    type === "sale"
      ? seededInt(random, 40, 400)
      : type === "payout"
        ? -seededInt(random, 500, 3200)
        : -seededInt(random, 5, 60);
  return {
    id: `txn-${i + 1}`,
    type,
    description:
      type === "sale"
        ? "Order payment received"
        : type === "refund"
          ? "Customer refund issued"
          : type === "payout"
            ? "Withdrawal to bank account"
            : "Platform commission fee",
    amount,
    status: seededPick(random, ["completed", "completed", "completed", "pending"]),
    createdAt: new Date(Date.now() - i * 3 * 86400000).toISOString(),
  };
});

export interface WithdrawalRequest {
  id: string;
  amount: number;
  method: string;
  status: "pending" | "processing" | "completed" | "rejected";
  requestedAt: string;
  processedAt?: string;
}

export const withdrawalHistory: WithdrawalRequest[] = [
  {
    id: "wd-1",
    amount: 3200,
    method: "Bank transfer — GTBank ****4521",
    status: "completed",
    requestedAt: new Date(Date.now() - 12 * 86400000).toISOString(),
    processedAt: new Date(Date.now() - 10 * 86400000).toISOString(),
  },
  {
    id: "wd-2",
    amount: 2100,
    method: "Bank transfer — GTBank ****4521",
    status: "completed",
    requestedAt: new Date(Date.now() - 42 * 86400000).toISOString(),
    processedAt: new Date(Date.now() - 40 * 86400000).toISOString(),
  },
  {
    id: "wd-3",
    amount: 1800,
    method: "Paystack wallet",
    status: "processing",
    requestedAt: new Date(Date.now() - 2 * 86400000).toISOString(),
  },
];

export interface VendorCoupon {
  id: string;
  code: string;
  description: string;
  type: "percentage" | "fixed";
  value: number;
  usageLimit: number;
  usageCount: number;
  expiresAt: string;
  isActive: boolean;
}

export const vendorSupportTickets: SupportTicket[] = [
  {
    id: "vticket-1",
    subject: "Payout not received for last withdrawal",
    status: "pending",
    priority: "high",
    createdAt: new Date(Date.now() - 3 * 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 86400000).toISOString(),
    category: "Payments",
    messages: [
      {
        author: "You",
        message: "I requested a withdrawal 5 days ago but haven't received the funds yet.",
        createdAt: new Date(Date.now() - 3 * 86400000).toISOString(),
      },
      {
        author: "Lukmoore Support",
        message: "Thanks for reaching out — we're looking into this with our payments provider and will update you shortly.",
        createdAt: new Date(Date.now() - 1 * 86400000).toISOString(),
      },
    ],
  },
  {
    id: "vticket-2",
    subject: "How do I add product variants?",
    status: "resolved",
    priority: "low",
    createdAt: new Date(Date.now() - 14 * 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 13 * 86400000).toISOString(),
    category: "Products",
    messages: [
      {
        author: "You",
        message: "Is there a way to add size and color variants to a single product listing?",
        createdAt: new Date(Date.now() - 14 * 86400000).toISOString(),
      },
      {
        author: "Lukmoore Support",
        message: "Yes! Open the product editor, scroll to the Variants section, and add each option combination.",
        createdAt: new Date(Date.now() - 13 * 86400000).toISOString(),
      },
    ],
  },
  {
    id: "vticket-3",
    subject: "Request to increase monthly listing limit",
    status: "open",
    priority: "medium",
    createdAt: new Date(Date.now() - 6 * 3600000).toISOString(),
    updatedAt: new Date(Date.now() - 6 * 3600000).toISOString(),
    category: "Account",
    messages: [
      {
        author: "You",
        message: "We're scaling up our catalog and would like our listing limit increased. What's required?",
        createdAt: new Date(Date.now() - 6 * 3600000).toISOString(),
      },
    ],
  },
];

function buildVendorMessages(participant: string, count: number): ChatMessage[] {
  return Array.from({ length: count }, (_, i) => ({
    id: `vmsg-${participant}-${i}`,
    senderId: i % 2 === 0 ? "customer" : "vendor",
    senderName: i % 2 === 0 ? participant : currentVendor.name,
    senderAvatar: i % 2 === 0 ? avatarUrl(participant) : currentVendor.logo,
    message:
      i % 2 === 0
        ? "Hi, does this item come in other colors?"
        : "Yes, we currently offer black, silver, and midnight blue!",
    createdAt: new Date(Date.now() - (count - i) * 3600000).toISOString(),
    read: true,
  }));
}

export const vendorConversations: Conversation[] = customerNames.slice(0, 5).map((name, index) => ({
  id: `vconv-${index + 1}`,
  participantName: name,
  participantAvatar: avatarUrl(name),
  participantRole: "customer",
  lastMessage:
    index === 0
      ? "Great, thank you for the quick response!"
      : "Yes, we currently offer black, silver, and midnight blue!",
  lastMessageAt: new Date(Date.now() - (index + 1) * 5 * 3600000).toISOString(),
  unreadCount: index === 0 ? 2 : 0,
  messages: buildVendorMessages(name, 4),
}));

export const vendorCoupons: VendorCoupon[] = [
  {
    id: "vcoupon-1",
    code: "AURALUX10",
    description: "10% off all AuraLux products",
    type: "percentage",
    value: 10,
    usageLimit: 500,
    usageCount: 128,
    expiresAt: new Date(Date.now() + 20 * 86400000).toISOString(),
    isActive: true,
  },
  {
    id: "vcoupon-2",
    code: "NEWGEAR25",
    description: "₦25,000 off orders over ₦150,000",
    type: "fixed",
    value: 25,
    usageLimit: 200,
    usageCount: 200,
    expiresAt: new Date(Date.now() - 3 * 86400000).toISOString(),
    isActive: false,
  },
];
